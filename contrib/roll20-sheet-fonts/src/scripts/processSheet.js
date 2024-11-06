import log from 'loglevel';
import { dirname } from 'path';
import { mkdir } from 'node:fs/promises';
import SheetFontsProcessor from '../lib/SheetFontsProcessor.js';
import { CONFIG } from '../config.js';

// Configure root logger
log.setLevel(CONFIG.LOG_LEVEL);

// Get command line arguments
const [,, sheetName, outputPath] = process.argv;

if (!sheetName || !outputPath) {
    log.error('Usage: bun run processSheet.js <sheetName> <outputPath>');
    process.exit(1);
}

class FileProcessor {
    static async ensureDir(filePath) {
        await mkdir(dirname(filePath), { recursive: true });
    }

    static async process(sheetName, outputPath) {
        try {
            // Ensure output directory exists
            await this.ensureDir(outputPath);

            const processor = new SheetFontsProcessor();
            
            // Fetch and transform the CSS
            const result = await processor.process(sheetName);
            
            if (result.error) {
                throw new Error(result.error);
            }

            // Write to specified path
            await Bun.write(outputPath, result.transformedCss);
            
            log.info('Processing complete.');
            log.info('Output written to:', outputPath);
            log.debug('Original Font URLs:', result.originalUrls);
            
        } catch (error) {
            log.error('Processing failed:', error);
            process.exit(1);
        }
    }
}

await FileProcessor.process(sheetName, outputPath);
