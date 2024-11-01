import log from 'loglevel';
import SheetFontsProcessor from '../lib/SheetFontsProcessor.js';
import { CONFIG } from '../config.js';

// Configure root logger
log.setLevel(CONFIG.LOG_LEVEL);

const sheetName = process.env.SHEET_NAME;

if (!sheetName) {
    log.error('No sheet name provided. Set SHEET_NAME environment variable.');
    process.exit(1);
}

const processor = new SheetFontsProcessor({
    outputDir: CONFIG.OUTPUT_DIR,
    logLevel: CONFIG.LOG_LEVEL
});

const result = await processor.process(sheetName);

if (result.error) {
    log.error('Processing failed:', result.error);
    process.exit(1);
} else {
    log.info('Processing complete.');
    log.info('Output written to:', result.outputPath);
    log.debug('Original Font URLs:', result.originalUrls);
}
