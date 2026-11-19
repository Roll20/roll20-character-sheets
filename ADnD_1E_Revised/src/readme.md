# AD&D1e Revised

This is the community character sheet for AD&D1e Revised.

## Development

You need to have `nodejs` and `npm` installed.

Then, run `npm install` from the './src/' folder to install the package.json dependencies.

Edit the sheet's HTML, CSS and JS/sheetworker files found in the './src/' folder. (ie `index.html`, `index.js`, `1ESheet.css`)

With dependencies installed you can run `npm run dev` from within './src/' to render an un-minified version for development. `npm run dev` will also watch for any changes in the src files and automatically update copies in '.src/dev/'.

This is the version that should be used while developing and testing via the Roll20 Developer Sandbox or Custom game.

## Production

With dependencies installed you can run `npm run prod` from within './src/' to build a finalized project (minified) for Roll20's live servers.

Output will be rendered to `./src/prod/1ESheet.html`.

This is the version that should be used for Roll20's live servers. Copy `./src/prod/1ESheet.html` and `./src/prod/1ESheet.css` to the project root, overwriting the old files, before committing to your fork and ultimately submitting a pull request to Roll20 for approval.

## Custom Games

If you want to use this code for a Roll20 Custom game; copy the raw text from '1ESheet.html' and '1ESheet.css' from the root directory and paste into the appropriate Game Settings editor tab.
<br>