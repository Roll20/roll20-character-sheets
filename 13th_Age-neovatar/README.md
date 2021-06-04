# A 13th Age Character Sheet for roll20.net

### Usage

Please check the [character sheets documentation](https://wiki.roll20.net/13th_Age_Character_Sheet_neovatar) in the roll20 wiki.

### Preview

[View Interactive Sheet Preview](http://neovatar.github.io/roll20-character-sheets/13th_Age-neovatar/testbed/)

### Bugs and Suggestions

Report bugs or suggestions to the project’s [issue tracker](https://github.com/neovatar/roll20-character-sheets/issues).

### Development Tools

This sheet uses Grunt to make development more easy.

If you haven’t used Grunt before, be sure to check out the [Getting Started guide](http://gruntjs.com/getting-started).

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

**1.8.1:**
* CSS fixes for upstream Roll20 changes

**1.8.0:**
* Added @tier_dmg_mult attribute, calculated by helper
* Use tier ability damage bonus multiplier in basic attacks

**1.7.0:**

* Repeating section items now can be dragged to macro quick bar
* Removed HP-lvlmod from sheet and autocalc hp_max with worker (fixes issues with HP recalc and tokens)
* Additional to STR and DEX also INT, WIS and CHA may be used as ability mods for basic attacks

**1.5.0:**

* Sheet workers are used to calculate HP per level and removed HP lvlmod field

**1.4.2:**

* Pop-up asks for situational attack modifier on a basic attack roll

**1.4.1:**

* Inline formulas in roll results are now easier to read

**1.4.0:**

***Breaking changes:***

* Added select boxes for basic attacks. You can select DEX or STR.
  On existing character sheets if the macro does not work correctly, please re-select the ability you use (switch to the other value and switch back to the one you want to use)
* Added select boxes to icon rolls
  You need to re-select the number of points that you have with each icons

***Non-breaking changes:***

* Added popup for background checks and removed ability column. When you do a background check, you get a popup and can select the ability that you want to use for the check roll
* New style for roll buttons
* New style for section headers
* Added at-will check box to power repeating section

**1.3.1:**

  * fixed minor spelling typo

**1.3.0:**

  * modified power template text style (justify instead of center)
  * added SETUP tab to sheet
  * added user configurable escalation die macro
  * fixed build and preview environment

**1.2.1:**

  * character default macro references description
  * npc power default macro uses roll template


**1.2.0:**

  * added roll templates
  * default macros now use roll templates

