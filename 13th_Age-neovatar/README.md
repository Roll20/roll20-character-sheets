# A new 13th Age Character Sheet for roll20.net

*This character sheet has a website with an interactive preview!*

[View Interactive Sheet Preview](http://neovatar.github.io/roll20-character-sheets/13th_Age-neovatar/testbed/)

### Usage

This character sheet requires a modern web browser.

#### Bugs and Suggestions

Report bugs or suggestions to the project’s [issue
tracker](https://github.com/neovatar/roll20-character-sheets/issues).

### Development Tools

This sheet uses Grunt to make development more easy.

If you haven’t used Grunt before, be sure to check out the [Getting Started
guide](http://gruntjs.com/getting-started).

#### Developing the Sheet

To make changes to the sheet and test things out use

```bash
grunt
```

Then open [`testbed/index.html`](testbed/index.html) in your browser to preview the sheet.

You can also use

```bash
grunt serve
```

Then open [http://localhost:9001/testbed/](http://localhost:9001/testbed/) in your browser to preview the sheet. With LiveReload integration, the view in your browser is updated, whenever you save the html or css file.


#### Releasing the Sheet

When you’re ready to use the sheet in Roll20 then use

```bash
grunt build
```

This will create `13th_Age-neovatar.[css|html]` that you can copy and paste into Roll 20 directly.

### Changelog

**1.2.0:**

  * added roll templates
  * default macros now use roll templates

