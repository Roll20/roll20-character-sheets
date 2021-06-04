# Alternative Degenesis character sheet

Tries to emulate the [official character sheet] without sacrificing usability.


## Feedback

Please report any bugs or suggestions on the projects [issue tracker](https://github.com/henry4k/roll20-character-sheets/issues).
If you don't have a GitHub account you may also send [me][henry4k] a message on Roll20.


## Development

### Setup

1. Install [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/).
2. Use NPM to install further dependencies. (Run `npm install` in the `src` directory.)


### Building

[Gulp](http://gulpjs.com/) is used as build system / task runner.
Its executable should be located at `src/node_modules/.bin/gulp`.

By default Gulp builds in preview mode.  This means that the resulting `sheet.html`
can be displayed in your web browser.

Important Gulp tasks:

- *default task*: Build a preview of the sheet and put it in the preview directory
- `auto`: Watch the source files and rebuild when any of them change (also in preview mode)
- **`release`: Build files that are ready for Roll20 and put them in the main directory (here)**


Example:

```sh
cd src
npm install
node_modules/.bin/gulp release
```


## Contributors

- [henry4k]

If you feel you've contributed to the development of this character sheet, don't forget to add your name here!


[official character sheet]: http://sixmorevodka.com/degenesis/character-en/
[henry4k]: https://app.roll20.net/users/3700129
