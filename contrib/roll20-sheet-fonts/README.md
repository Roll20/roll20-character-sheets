# Roll20 Sheet Fonts Processor

Processes Google Fonts from Roll20 character sheets and generates proxy-friendly CSS.

## Environment Variables

Required:
- `DISCORD_ACTIVITY_CLIENT_ID`: Discord client ID for font proxy URLs

Optional:
- `OUTPUT_DIR`: Directory for output files (default: ~/dist)
- `LOG_LEVEL`: Logging level (default: info)
- `SHEET_NAME`: Character sheet to process

## Setup
```bash
bun install
```

## Usage
```bash
# Set required environment variable
export DISCORD_ACTIVITY_CLIENT_ID="1199270539278164008"

# Process Alien RPG sheet
bun run alienyz

# Process any sheet
SHEET_NAME="Your Sheet Name" bun run process-sheet

# With custom output directory
SHEET_NAME="Your Sheet Name" OUTPUT_DIR=./output bun run process-sheet

# With debug logging
SHEET_NAME="Your Sheet Name" LOG_LEVEL=debug bun run process-sheet
```

## Development

Create a `.env` file in the project root:
```env
DISCORD_ACTIVITY_CLIENT_ID=1199270539278164008
```
