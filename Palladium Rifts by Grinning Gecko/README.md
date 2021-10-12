# Palladium Rifts by Grinning Gecko

## Build

This sheet makes use of the following:

- gulp
  - gulp-replace
  - gulp-inject
- sass
- [Roll20Async](https://github.com/onyxring/Roll20Async)

Use `npm i` to install required NPM packages.

Use `gulp watch` to automatically build the `dist/` folder when editing an HTML or JS file. Note that only [rifts.scss](./src/scss/rifts.scss) is monitored, so if you edit one of the other scss files you'll need to save that one too to trigger a build.
