# AD&D1e Revised

This is the character sheet for AD&D1e Revised.

## Development

You need to have `nodejs` and `npm` installed.

Then, run `npm install` in this folder to install the package.json dependencies.

Edit the html and js source files; `src/index.html`, `src/index.js`. CSS can be edited directly using `1ESheet.css`.

With dependencies installed you can run `npm run dev` to render an un-minified version for development. `npm run dev` will also watch for any changes in the src files and automatically update `1ESheet.html` when detected.

Output will be rendered as `1ESheet.html`.

## Production

With dependencies installed you can run `npm run prod` to build a finalized project for Roll20's live servers.
Output will be rendered as `1ESheet.html`.