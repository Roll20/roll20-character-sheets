# Ironcrunch - Character Sheet
## Building Sheet
This sheet uses [pugjs](https://www.google.com) for HTML templating, along with [Stylus](https://www.google.com) from CSS templating.
To build finished sheet run the following commands from command line or terminal:
```bash
cd src
npm install

// Mac or Linux
npm run build:pug 
// Windows
npm run build:pug:win

npm run build:css
```
These will then generate a dist folder that will have the finished code. From their you can upload them into the custom sheet sandbox for testing.

## Compatibility
The sheet has been tested across multiple browsers and devices, show below in the compatibility matrix:
|Browser|Windows|MacOs|Android|iOS|
|---|---|---|---|---|
|Chrome|[x]|[x]|[x]|[x]|
|Firefox|[x]|[x]|[x]|[x]|
|Safari|N/A|[x]|N/A|[x]|