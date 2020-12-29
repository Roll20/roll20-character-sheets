# 13th Age Glorantha (Unofficial) Character Folio for roll20.net

Welcome to the 13G Character Folio, created and currently maintained by user [Seraaron](https://app.roll20.net/users/147454/seraaron). This sheet is an off-shoot and overhaul of the 13th Age 'Legacy' sheet. It aims to be more comprehensive and customizable, with a clean and attractive layout that is still thematically consistent with it's Gloranthan inspiration.

## Usage

When you open a new character sheet you will be presented with the Options tab. There are four other tabs: Hero, Powers, Lifestyle, and Bestiary.

In the options tab you can make decisions about the appearance and functionality of the sheet.

In **Ability Setup** you can choose the layout of abilities. Do you want the standard array of STR, CON, DEX, INT, WIS, and CHA? Or would you like to add a common additional ability such as Sanity or Honor, or make up your own? There's also a button that will generate six ability scores for you, with four common number generation options.

Along-side **Incremental Advances** is a subheader called Meta-currency, when you can keep track of Fate or Inspiration, or EXP if you want to use a more traditional levelling system.

The **Custom Info. Fields** are used to change the character summary labels at the top of the character sheet. And the Extra Subsections buttons will reveal three more fields on the main sheet for unusual class options, additional customizability, and meta-game interactions.

The options available in **Rules & Macros** are more advanced, and best summarised by the statement about the sheet's design philosophy, below. The option that an average player will most likely need to tweak is the Tier Multiplier, which increases damage and recoveries, when they reach level 5 (x2) and level 8 (x3).


### Hero Tab

Here is the main sheet, where the majority of your basic character information is kept. The first thing to notice are the white switches next to **Adventure**, **Runes**, and **Equipment**. These will toggle to the **Combat**, **Icons**, and **Wealth** blocks respectively. The heavy asterisk symbols '✱' pull double-duty as buttons and bullet points, you can click them to send the corresponding roll macro to the chat. Buttons that do not repeat, or are not part of a larger list, are their own text buttons which have a bold font and highlight in orange when you hover over them. Examples include the Recovery and Save buttons.

Almost all of the dice rolled by the macros in this sheet use the newly discovered [psuedo-reuse](https://wiki.roll20.net/Reusing_Rolls), which is especially useful in 13th Age, since so many powers rely on knowing what was naturally rolled before applying any modifiers. Gone are the days of *the hover*!

The triangular symbol next to Wounds & Conditions is a dropdown menu, revealing death save and condition checkboxes, and a repeating segment for adding custom injuries. The dazed, stunned, and weakened conditions are automated. And all checkboxes have a summary of the rules if you mouse over them.

In the Adventure section you can switch between showing Mod.+Level or just your ability Modifiers. This affects the 'basic check' macro for each ability, but not anything else.

In the Combat tab, the default settings assume your character is unarmed and throwing stones. This is partly to show you that non-standard hit dice are possible on this sheet (such as 1D2), and partly to remind you that even if you're disarmed you can still fight. To actually equip a weapon of choice you should rename your primary melee and ranged weapon names under the Equipment header. Secondary weapons can also be created as repeating segments, but they are less automated, so you may wish to use the primary section as a calculator and then transfer the numbers to the secondary attacks subsection.

The switch for Icons and Runes is there for players who want to ignore all the Gloranthan features and use this sheet just to play a normal game of 13th Age. But for those that like to use *both* Runes and Icons, the Icons list is also repeated in the Lifestyle tab. As is Wealth, which comes with a handy-dandy calculator macro, and the ability to quote your money to the chat (which can also double as a resources system if you prefer to roll dice instead of track individual coins).

### Powers Tab

This tab houses all of your character's **Features**, **Talents**, **Spells / Powers**, and **Gifts / Items**, with spell-slot and gift trackers to boot. The layout of these repeating sections is similar to the way it will display in the chat template, and each is color-coded (Features are green, Talents are orange, Spells are purple, and Gifts are teal). The Feats checkboxes are for tracking which powers you've upgraded. And the drop-down description box can be used to copy over from the SRD or your rules .pdf.

Additional customizations can be made in the Macro drop-down, such as changing the color, or adding extra rows to the template display. For example, you can add roll to hit, damage on hit, and damage on miss rows using additional double curly braces `{{}}` as follows:
```
&{template:13G_red} {{name=@{name}}} {{type=@{type}}} {{usage=@{usage}}} {{text=@{description}}} {{Result=[[[[1D20]]+[[5]]]]=$[[0]]+$[[1]]}} {{Hit=[[1D6+5]]}} {{Miss=[[@{level}]]}}
```

Only `name`, `type`, `usage`, and `text` have specific functions assigned to them within the template. You can title any other row with anything you like. And you can change the color to any of the following: `_red`, `_green`, `_blue`, `_orange`, `_teal`, `_purple`, `_black`, `_gray`, or `_white`.

If you selected the 'Specials' and/or 'Minions' buttons in the Options tab, then they appear in the Powers tab. If you accidentally press 'X' on either one, fear not, your data is not lost: simply re-click to reveal the hidden section.

The Minions block is slightly different from the rest of the sheet powers, as it gives options for the creatures statblock and one basic attack. There are also feats checkboxes and a description box, since most summoned creatures are technically class powers.

### Lifestyle Tab

This Tab gives you lots of space to write about your character, their appearance, backstory, or their adventures and the people they've met. As mentioned, the Icons and Wealth blocks are also repeated here for your convenience, since this tab will probably most frequently be used during downtime. The **Additional Notes** block is a large repeating segment with even more space, and the option to color code all your notes and quote them to chat, for those particularly meticulous players.

If you selected the 'Factions' buttons in the Options tab, then it will appear in the Lifestyle tab. The Factions section is for interacting with a meta-game layer, typically during downtime, and tracking those interactions. Examples of it's use would include: constructing a fortress, running a cult, keeping up with a noble court, or tinkering with a powerful magic item. All the boxes are left open on this repeating segment so you can use it for whatever you wish.

### Bestiary Tab

This Tab is mostly for use by gamemasters. It let's you write information and describe statblocks for your non-player characters, monsters, and other beasties. Most of the sections here are repeats of earlier ones. The **Mooks** repeating segment, for example, is a reprint of Minions, without the feats: so that you can have a main villain and all their cronies listed in one place. The conditions checkboxes in this instance only apply to the main NPC's basic attacks though, conditions on mooks must be tracked manually.

By default, all of the macros on this tab will be whispered to the GM. But for those that prefer to roll in the open you can change this with the *'Whisper NPC macros to GM?'* drop-down menu in the Options tab. The main header in the Bestiary tab, **NPC Name**, is also renamable so that you can hide the creature's true name from the automated macros, if you wish to.

## Design Philosophy

This sheet has been built with *rules representation* first in mind, rather than *rules implementation*. This key distinction means that many of the macros and calculations that are normally hard-coded and noninteractable in other character sheets have been brought up to a safely editable 'soft-layer'. The sheet opens by default on the Options tab, for this reason, so that all new users can see and realize for themselves exactly what the sheet is capable of. (Depending on your preferences, this may even allow you play games that are entirely different from 13th Age, but still use a familiar sheet).

Similarly though, these features have also been designed to be unintrusive for users who only care to play the game as written, so you never have to look at them again if you don't want to — except when making a new character.

### Secret Feature
If you hover over almost any element on the sheet you'll be shown a tooltip which tells you it's name and how to reference it. Usually with an at sign `@` and curly braces `{}`. Elements that end with `-label` or `-header` can be edited from their default value by creating an Attribute of the same name in the Roll 20 'Attributes & Abilities' tab and giving it a new value.

For example, maybe you would prefer to use a standard skills list, instead of 13th Age's Backgrounds system. You can change the `@{backgrounds-label}` by creating the Attribute 'backgrounds-label' and then entering 'Skills' as it's value. The change is only superficial, internal references will still be named `backgrounds`, but a different name can mean a lot.

To reset to default, simple delete the custom Attribute and close and re-open the sheet.

## [Changelog](https://github.com/Seraaron/roll20-character-sheets/blob/master/13th%20Age%20Glorantha/ChangeLog.md)

## Bugs and Suggestions

Report bugs or suggestions to the project’s [issue tracker](https://github.com/Seraaron/roll20-character-sheets/issues).

# Development Tools

If you'd like to get involved with the development of this sheet, then these steps will guide you:

This sheet uses [Grunt](https://gruntjs.com/) to make development and early testing easier. (Final testing **must** still be performed in the Roll20 'custom sheet sandbox' before making a pull request).

If you haven’t used Grunt before, be sure to check out the [Getting Started guide](http://gruntjs.com/getting-started).

You will also need [Git BASH](https://gitforwindows.org/) or one of it's alternatives.

And a good text editor like [Atom](https://atom.io/) always helps.

## Developing the Sheet

To make changes to the sheet and test things out:

1. First make a fork of this repo (in the top-right) and read the [beginner's guide to Github](https://wiki.roll20.net/Beginner%27s_Guide_to_GitHub) if you haven't already.
1. Run `grunt serve` in the */roll20-character-sheets/13th Age Glorantha/* folder
1. Open [http://localhost:9001/testbed/](http://localhost:9001/testbed/) in your browser to preview the sheet. (With LiveReload integration, the view in your browser is updated whenever you save the .html or .css files in */13th Age Glorantha/src/*).
1. Make any changes you like, but remember that [sheetworkers](https://wiki.roll20.net/Sheet_Worker_Scripts) will not function until you copy the code into roll20. And I'd also recommend reading [Andrea's Guide to Sheet Development](https://wiki.roll20.net/Andreas_Guide_to_Sheet_Development) if you plan on making a pull request.

## Releasing the Sheet

1. Run `grunt build` to prepare the .html and .css code for a pull request. This check and throw errors if your code contains any illegal characters or scripts, for example, and then replace the files in the main folder if it passes all the checks.
1. Push the changes to your fork.
1. *Please* make a pull request to this repo so it can be independently checked before being pulled into the live roll20 repo (technically not required, but certainly polite — I learned this the hard way)!

# MIT License

Copyright (c) 2020 Seraaron.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
