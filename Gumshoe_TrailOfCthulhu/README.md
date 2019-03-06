# Trail of Cthulhu Character Sheet

### Usage

This character sheet requires a modern web browser. You must be the latest
version of Chrome, Firefox or Internet Explorer to get the full experience.

#### Bugs and Suggestions

Report bugs or suggestions to the project’s [issue
tracker](https://github.com/Ramblurr/roll20-character-sheets/issues).

### Dice Rolling

*This is Mentor feature only.*

This sheet integrates with the `GUMSHOE-Roll20.js` API script to handle
dice rolling and point spending.

The script must be added to your campaign in order to work. If it is not added,
then the buttons will not do anything.

### Compiling

This sheet uses Grunt to build CSS assets.

If you haven’t used Grunt before, be sure to check out the [Getting Started
guide](http://gruntjs.com/getting-started).

This sheet uses the [Less](http://lesscss.org/) CSS pre-processor to make CSS
development easier.

#### Developing the Sheet

To make changes to the sheet and test things out use

```bash
grunt
```

Then open [`testbed/index.html`](testbed/index.html) in your browser to preview
the sheet.

#### Releasing the Sheet

When you’re ready to use the sheet in Roll20 then use

```bash
grunt build
```

This will create `Gumshoe_TrailOfCthulhu.[css|html]` that you can copy and
paste into Roll 20 directly.

