// src/lib/SheetFontsProcessor.js
import log from 'loglevel';
import { mkdir } from 'node:fs/promises';
import { join } from 'path';
import { CONFIG } from '../config.js';

export default class SheetFontsProcessor {
    constructor(options = {}) {
        this.clientId = CONFIG.DISCORD_ACTIVITY_CLIENT_ID;
        this.baseGithubUrl = CONFIG.GITHUB_BASE_URL;
        this.userAgent = CONFIG.USER_AGENT;
        this.outputDir = options.outputDir || CONFIG.OUTPUT_DIR;
        
        // Initialize logger
        this.log = log.getLogger('SheetFontsProcessor');
        this.log.setLevel(options.logLevel || CONFIG.LOG_LEVEL);
    }

    getSheetJsonUrl(sheetName) {
        return `${this.baseGithubUrl}/${encodeURIComponent(sheetName)}/sheet.json`;
    }

    getSheetCssUrl(sheetName, cssFilename) {
        return `${this.baseGithubUrl}/${encodeURIComponent(sheetName)}/${cssFilename}`;
    }

    extractGoogleFontsUrls(cssContent) {
        const urls = [];
        const lines = cssContent.split('\n');
        
        for (const line of lines) {
            if (line.trim().startsWith('/*')) continue;
            
            const match = line.match(/url\(['"]?(https:\/\/fonts\.googleapis\.com[^'")\s]+)['"]?\)/);
            if (match) {
                urls.push(match[1]);
            }
        }
        
        return urls;
    }

    async ensureOutputDir() {
        try {
            await mkdir(this.outputDir, { recursive: true });
        } catch (error) {
            this.log.error('Error creating output directory:', error);
            throw error;
        }
    }

    async writeOutput(sheetName, content) {
        try {
            const sanitizedName = sheetName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
            const outputPath = join(this.outputDir, `${sanitizedName}-fonts.css`);
            
            await this.ensureOutputDir();
            await Bun.write(outputPath, content);
            
            this.log.info(`Output written to: ${outputPath}`);
            return outputPath;
        } catch (error) {
            this.log.error('Error writing output file:', error);
            throw error;
        }
    }

    async fetchWithHeaders(url) {
        try {
            this.log.debug(`Fetching URL: ${url}`);
            const response = await fetch(url, {
                headers: {
                    'User-Agent': this.userAgent
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.text();
        } catch (error) {
            this.log.error(`Error fetching ${url}:`, error);
            throw error;
        }
    }

    async transformGoogleFontsCss(fontsUrl) {
        try {
            this.log.debug(`Transforming fonts from: ${fontsUrl}`);
            const cssContent = await this.fetchWithHeaders(fontsUrl);
            return cssContent.replace(
                /fonts\.gstatic\.com/g,
                `${this.clientId}.discordsays.com/.proxy/gstatic/fonts`
            );
        } catch (error) {
            this.log.error(`Error transforming Google Fonts CSS from ${fontsUrl}:`, error);
            return '';
        }
    }

    async process(sheetName) {
        try {
            this.log.info(`Processing sheet: ${sheetName}`);

            // Fetch sheet.json
            const sheetJsonUrl = this.getSheetJsonUrl(sheetName);
            const sheetDataText = await this.fetchWithHeaders(sheetJsonUrl);
            const sheetData = JSON.parse(sheetDataText);

            // Fetch CSS content
            const cssUrl = this.getSheetCssUrl(sheetName, sheetData.css);
            const cssContent = await this.fetchWithHeaders(cssUrl);

            // Extract and process Google Fonts URLs
            const fontUrls = this.extractGoogleFontsUrls(cssContent);
            this.log.debug(`Found ${fontUrls.length} font URLs`);
            
            // Transform each Google Fonts CSS
            const transformedFontsCss = await Promise.all(
                fontUrls.map(url => this.transformGoogleFontsCss(url))
            );

            const combinedCss = transformedFontsCss.join('\n\n');
            
            // Write to file
            const outputPath = await this.writeOutput(sheetName, combinedCss);

            return {
                originalUrls: fontUrls,
                transformedCss: combinedCss,
                sheetData,
                outputPath
            };

        } catch (error) {
            this.log.error(`Error processing sheet ${sheetName}:`, error);
            return {
                originalUrls: [],
                transformedCss: '',
                sheetData: null,
                error: error.message
            };
        }
    }
}
