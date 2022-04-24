# Final Fantasy d20 Character Sheet

### Usage

This character sheet requires a modern web browser. It is highly recommended to have the latest
version of Chrome, Firefox or Edge for the best user experience.

There are two distinct sheet types that come bundled with this character sheet: the Character and the Monster sheet type. The user can toggle between these modes from the dropdown box at the top center of the sheet aptly labeled "Sheet Type."

#### Character Sheet Type

The Character sheet type is meant for player characters and non player characters that call for a more details-oriented approach to management. This entails your typical Roll20 sheet features: a multi-tab interface, automated calculations, sheet rolling macros, repeating sections, etc.

#### Monster Sheet Type

The Monster sheet type is meant for monsters, to be used exclusively by the DM. It condenses everything down to one page (no tab interface), and removes autocalculations entirely in favor of giving more control to the DM with editing values. Utilizing this sheet type effectively will enable the DM to drag and drop monster tokens and keep track of their respective stats without having to wade through the tabular interface meant for more complex character types.

### Changelog

__Version 1.6 (pushed 7/4/2021)__

A couple changes here and there; expect a bigger update in a little while!

Character Sheet

* Miscellaneous aesthetic changes.
* Fixed a bug with user created macros not showing notes for certain skills.
* Fixed a bug with CMD not adding dodge or deflection bonuses.
* Fixed the "Extra MP" feature to be in line with the site changes to the feat.
* Added Inherent column for Ability Scores section.

__Version 1.5 (pushed 10/26/2020)__

Special thanks to TamedFlame for accomplishing most of this update!

Iterative attacks will be on the next update scheduled before New Years!

Character Sheet

* Spell failure roll on all spells if you have greater than 0% spell failure chance from equipment.
* Size modifiers are now factored in for Fly and Stealth skills.
* Added "Racial" trait option.
* Added spell DC field for spell levels and a modifier for individual spells.
* Chat display buttons for character traits/feats/class features.
* Modifiable ability scores for character skills.

Monster Sheet

* Aesthetic changes.

Universal

* Added GM roll toggle under the Sheet Options.

__Version 1.4 (pushed 6/21/2020)__

##### This update was realized by TamedFlame

Universal

* The background color gradient is now customisable from the Options section. You can select a color for each corner, and the sheet shall use those to generate a new background gradient. These options are set per character, and as such each PC, Monster, or NPC can have a style of their own. These settings also affect the backgrounds for the rolls in the chat, and as such you can use them to identify characters. 

>  #### User discretion is advised when selcting colors, consider talking to your fellow players if any of them has difficulties with certain combinations.

__Version 1.3 (pushed 2/23/2019)__

Character Sheet

*   New "Options" sections in which may be opened by clicking the various cog icons on the sheet. Allows for the user to hide any other section tab (core, combat, class, skills, etc), hide MP and/or specify additional custom energy fields to show up within the "Status" section (up to 3 types), and specify the HP threshold for limit break activation. There are also options to include the Toughness, Extra MP, and Extra Limit Break feats, as well as the Hume trait "Skilled", into their respective calculations.
*   New "Combat" tab and section. "Status", "Combat", "Saving Throws", "Defenses", and "Weapons" subsections were moved here, while "Ability Scores" and "Miscellany" were placed into the "Core" tab. New "Traits" subsection was placed under the "Core" sheet section.
*   Reformatted Spells section. Each spell entry now has an associated dice roll macro, along with the ability to hide non-pertinent spell information.
*   Limit break max usage/day field is now an auto-calculating field.
*   General aesthetic changes. FFd20 logo is smaller, some fields are larger while others are smaller, section tabs are closer together, among other things.
*   Only one materia entry can be attuned at a time (as per the normal ruleset). Checking "Attuned?" on a materia entry will then automatically uncheck other entries if they are attuned. There is an option to turn this feature off and be able to attune to one materia, a checkbox under the Materia Options dubbed "Multiple Materia Attunement".
*   Added a text field for Dodge and added a new AC entry for "Misc" under the AC Features section.
*   All class features/traits/feats now have expander buttons to hide/expand information.
*   All repeated section (ie: Traits, Feats, Spells, etc) textarea fields are now expandable.
*   All input areas (including disabled input areas) now have tooltips in which display their associated macro reference.
*   Fixed a bug with a negative DEX modifier not affecting flat-footed AC.
*   Added "vs. Touch" checkbox to Weapons entries. The weapons roll template will now specify if that attack is vs AC or Touch, depending on this checkbox value.

Monster Sheet

*   General aesthetic changes. Some fields are larger while others are smaller.
*   Added "Gear" textarea.
*   Added "MP" number field.
*   Added "Burrow Speed" number field.
*   Specifying a CR now auto-calculates the amount of XP that creature will give.
*   Special Abilities section now has associated dice roll macros for each entry, along with additional inputs for attack type (none, ranged touch, or touch), an attack modifier number field, and damage formula field. Expander button expands/hides ability description.
*   Fixed a bug with craft, profession, and perform skills calculating incorrectly.

__Version 1.2.1 (pushed 11/17/2018)__

*	Undead characters now are supported. Use toggle at the top of the page to change Fortitude and hit point calculations from using Con to Cha

__Version 1.2 (pushed 5/22/2018)__

Even smaller update. Had to make some necessary changes -- hopefully I can get around to beefing up this sheet soon!
*	Bonus MP is now calculated from your casting modifier + your spell level, as opposed to casting modifier + caster level. Please update/refresh your values to reflect these changes.
*   Fixed a bug where skill points from your Favored Class Bonus would not factor into the total skill points of the "Totals" row within the Class page.

__Version 1.1 (pushed 11/06/2017)__

Small update. Changes were:
*	Fixed CMB and CMD autocalculations
*	Added a d4 option for class HD
*	Added a quantity/charges (wands) field for inventory items
*	Changed gil, monster XP and CR, to text fields to accomodate for commas
*	Added craft, perform, and profession skills to the monster skills section
*	Fixed the formatting for the monster skills section -- should look better for Firefox users

### Bugs and Feedback

Report bugs or feedback to the project’s [issue
tracker](https://github.com/Azurift/roll20-character-sheets/issues).