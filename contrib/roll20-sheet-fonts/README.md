# Roll20 Sheet Fonts Processor

Processes Google Fonts from Roll20 character sheets and generates proxy-friendly CSS.

## Environment Variables

Required:
- `DISCORD_ACTIVITY_CLIENT_ID`: Discord client ID for font proxy URLs

Optional:
- `LOG_LEVEL`: Logging level (default: info)

## Setup
```bash
bun install
```

## Usage

The script requires two arguments:
1. Sheet name: The name of the Roll20 character sheet
2. Output path: Where to save the processed CSS file

```bash
# Basic usage
bun run src/scripts/processSheet.js "Sheet Name" ./path/to/output.css

# Example with actual sheet
bun run src/scripts/processSheet.js "Alien Roleplaying Game" 

# Using the Alien RPG sheet shortcut
bun run alienyz
```

## Development

Create a `.env` file in the project root:

```env
DISCORD_ACTIVITY_CLIENT_ID=1199271093882589195
```

## Examples

Process different sheets:
```bash
# Bladerunner
bun run src/scripts/processSheet.js "blade_runner_rpg" ./dist/bladerunner.css

# Warhammer 4e
bun run src/scripts/processSheet.js "Warhammer Fantasy Roleplay 4e Official" ../../Warhammer\ Fantasy\ Roleplay\ 4e\ Official/discord/production.css
```

## Opening Pull Requests for Discord

There are times you'll want to make sure that fonts for a certain sheet load as expected in Discord. The following steps outline the process for adding support for certain Fonts in a semi-automated manner.

### 1. Generate CSS for proxied font URLs

For each sheet, note that a `discord` directory will be auto-generated and auto-managed as a result of the commands below but you'll still need manually commit and push the directory changes to GitHub. Run the font processor script to generate proxied font URLs for the following environments:

- Staging. Example: `DISCORD_ACTIVITY_CLIENT_ID=1199270539278164008 bun run src/scripts/processSheet.js "Alien Roleplaying Game" ../../Alien\ Roleplaying\ Game/discord/staging.css`
- Production. Example: `DISCORD_ACTIVITY_CLIENT_ID=1199271093882589195 bun run src/scripts/processSheet.js "Alien Roleplaying Game" ../../Alien\ Roleplaying\ Game/discord/production.css`

### 2. Update sheet.json to indicate that this sheet has been updated for Discord

Ensure that the following exists in the corresponding sheet.json for your sheet at the root level of the object:

```json
  "discord": { "fonts": true }
```

This is what will let those working on Discord know that a sheet has already had font proxying support added upstream per the working process documented here. So make sure that you commit and push this change to GitHub.

### 3. Create and merge a pull request with your changes

You'll now need to get these changes merged into the master branch: https://github.com/Roll20/roll20-character-sheets/pulls

## Debug Logging

Enable debug logging:
```bash
LOG_LEVEL=debug bun run src/scripts/processSheet.js "Sheet Name" ./output.css
```