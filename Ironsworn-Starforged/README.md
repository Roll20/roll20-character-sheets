# Ironsworn: Starforged - Character Sheet
## Building Sheet
This sheet uses [pugjs](https://pugjs.org) for HTML templating, along with [Stylus](https://stylus-lang.com) from CSS templating.
To build finished sheet run the following commands from command line or terminal:
```bash
cd src
npm install

# Build the sheet
npm run gulp:build

# Watch for changes made and build the sheet
npm run gulp:watch

```
These will then generate a dist folder that will have the finished code. From their you can upload them into the custom sheet sandbox for testing.
## Pushing Changes
Roll20 does not build our pug/stylus code for when we merge. This needs to be done locally by running `npm run gulp:build` in the Ironsworn-Starforged/src directory.
## Translations
To keep our translation and fallback html content consistent. We are loading the translations into pug under the `translations` global variable. This allows us to call `translations[<translation-key>]` to get our content. This way we can propagate changes and avoid hardcoding content.
## Compatibility
The sheet has been tested across multiple browsers and devices, show below in the compatibility matrix:
|Browser|Windows|MacOs|Android|iOS|
|---|---|---|---|---|
|Chrome|yes|yes|yes|yes|
|Firefox|yes|yes|yes|yes|
|Safari|no|yes|no|yes|