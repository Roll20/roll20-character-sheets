# D&D 5e Shaped character sheet

## [Issue tracker](https://bitbucket.org/mlenser/5eshaped/issues?sort=-updated_on)
Please report any issues on the issue tracker.

*If you're experiencing extreme lag please disable LastPass as it is known to cause problems with Roll20. This has nothing to do with the Shaped sheet.*

## [Shaped Script](https://github.com/mlenser/roll20-api-scripts/tree/master/5eShapedScript)

## [Changelog](https://github.com/mlenser/roll20-character-sheets/blob/master/5eShaped/changelog.md)

## [Documentation](https://bitbucket.org/mlenser/5eshaped/wiki/Home)

## Features

* **High performance** sheet without the lag of old versions (100% sheet workers)
* Styling that matches the [5e paper sheet](http://i.imgur.com/87GaRhL.jpg)
* **Compendium Integration** for NPCs, Spells, Weapons, Armor, Equipment
* **OGL Module conversion** Modules like LMoP, Volo's Guide, and the Monster Manual are converted from the OGL format to the Shaped format.
* **NPC actions and traits** are parsed and clickable. The text on the sheet and in the output macro will adjust if you adjust an ability score.
* **Customizable skills** with the option to change the ability on the fly
* **Spells** with the option to cast at a higher level
  * Filters to limit which spells are displayed
* **Chat macros** that are kept in sync with the contents of the sheet. Ability Checks, Saving Throws, Attacks, Actions, Stablock, etc.
* Critical damage is automatically calculated with the possibility of selecting features like brutal critical or houserules that critical hits do maximum dice damage plus the normal damage.
* Classes automatically select proficiencies (Weapon, Armor, Tools, Saving Throws) and class features.
  * Customizable Classes - Change Name, HD, or spellcasting level of the classes
* Translations
* **Armor** Covers normal armor as well as unarmored ability cases like monk, barbarian, etc.
* **Equipment** with gold and weight automatically calculated. Equipment Items are clickable from the core page for items like Potion of Healing
* **Settings** for how to output all rolls, death saves, initiative, etc
  * Roll settings to choose to always roll with advantage, disadvantage, or query for both
  * Optional bonuses to all skills, abilities, saving throws, etc.
* Attachers can be used to remind yourself to add to saving throws while within 10 feet of your paladin

[![Sheet](http://i.cubeupload.com/peLpOm.jpg "5e Shaped Sheet")](http://i.cubeupload.com/RwfoVZ.jpg)

## Sheet Releases
When I release a new version it takes time to reach the public. Roll20 must merge my cost (typically Mondays/Tuesdays) and then release my code to the public (typically Tuesdays/Wednesdays). You can track [Roll20's pull requests on their github](https://github.com/Roll20/roll20-character-sheets/pulls). I have no control over when they release.

## How to Update the sheet yourself (as Pro):

1. Copy the [html](https://raw.githubusercontent.com/mlenser/roll20-character-sheets/master/5eShaped/5eShaped.html) from github
2. In Roll20 go to campaign settings and choose a custom character sheet.
3. Choose D&D 5e as the SRD
4. In the HTML tab paste the HTML code
5. Copy the [css](https://raw.githubusercontent.com/mlenser/roll20-character-sheets/master/5eShaped/5eShaped.css) from github
6. On Roll20 in the CSS tab paste the CSS code.
7. Copy the [translation](https://github.com/mlenser/roll20-character-sheets/tree/master/5eShaped/translations) from the appropriate file on github (en is English, fr is French, de is German, it is Italian, etc)
8. On Roll20 in the Translation tab paste the JSON from the appropriate file.
9. Hit save.

*If you are ever concerned about data loss I recommend you duplicate your campaign and use that to copy to see how it'll work.*

## Testing new versions
I regularly release new versions. If you'd like to be involved in the testing period follow this thread. You can also see the latest code on [my develop campaign](https://app.roll20.net/join/1206379/qP-T_Q)

## Supported Versions
I support the currently released version on Roll20 and on Github (they often differ as Pros can use a newer version). For upgrades I support a smooth upgrade for any version within the last 6 months.

## Contribute
Since many have asked for it: If you appreciate what I do and want to compensate me for the countless hours that I have spent building this character sheet feel free to support me on [Patreon](https://www.patreon.com/mlenser) or Paypal (mlenser@gmail.com).