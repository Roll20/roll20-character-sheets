# AD&D1e Revised

This is the community character sheet for AD&D1e Revised.

## Development

You need to have `nodejs` and `npm` installed.

Then, run `npm install` from the 'src/' folder to install the package.json dependencies.

Edit the sheet's HTML and JS/sheetworker files found in the 'src/' folder. (ie `src/index.html`, `src/index.js`)
Sheet CSS can be edited directly using `1ESheet.css` located at root.

With dependencies installed you can run `npm run dev` from within '/src' to render an un-minified version for development. `npm run dev` will also watch for any changes in the src files and automatically update.

Output will be rendered as `1ESheet.html` located at root.

This is the version that should be used while developing and testing via the Roll20 Developer Sandbox or Custom game.

## Production

With dependencies installed you can run `npm run prod` from within '/src' to build a finalized project (minified) for Roll20's live servers.

Output will be rendered as `1ESheet.html` located at root.

This is the version that should be used for Roll20's live servers.

## Custom Games

If you want to use this code for a Roll20 Custom game; copy the raw text from `1ESheet.html` and `1ESheet.css` located at root and paste into the appropriate Game Settings editor tab.
<br>