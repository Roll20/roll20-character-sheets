# A new 13th Age Character Sheet for roll20.net

* [View Interactive Sheet Preview](http://neovatar.github.io/roll20-character-sheets/13th_Age-neovatar/testbed/)

* [Character sheets documentation in the Roll20 wiki](https://wiki.roll20.net/13th_Age_Character_Sheet_neovatar)

### Usage

This character sheet requires a modern web browser.

#### Escalation Die Macro

##### Default: Ask for Escalation Die value

You can define an escalation die macro in the sheets SETUP tab. The default value is:

```
?{Escalation die value|0}
```

This will ask the player to enter the escalation die value, before the roll is made. The basic melee and ranged attacks use this.

You can also use the escalation die macro in you own definitions via the ```@{escdie}``` attribute. The following sheet macro example will roll a d20 and add the escalation die value:

```
***Roll d20 and add escalation die***
[[1d20+@{escdie}]]
```

##### Advanced: Use Escalation Die Token

The basic idea is described in a [Youtube session with Roll20 devs Richard and Riley](https://www.youtube.com/watch?t=434&v=ODh7PN3DVcs).

###### Prepare the Escalation Die Token

 * create a character named "Escalation Die"
 * allow all players to view / edit this character (**This is important!!!**)
 * via "Edit" -> "Attributes & Abilities", add an attribute "die"
 * use a nifty die graphic as token image
 * connect the escalation die token with the character "Escalation Die"
 * set one of the bars to track the attribute "die"
 * click on the token and enter the correct escalation die value in the bar

###### Use the Escalation Die Token

Now update all character sheets to use the "Escalation Die" character’s "die" value as escalation die: Go to "SETUP" Tab on your character sheet and enter the following as "Escalation die macro":

```
@{Escalation Die|die}
```

Now the basic attacks and the use of ```@{escdie}``` will pull the escalation die value from the escalation die token.

Don't forget to update the escalation die value each round.

#### Bugs and Suggestions

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

