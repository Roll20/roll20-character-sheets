# Stars Without Number Character Sheet

This sheet is created for use in Stars Without Number on Roll20. Originally based on the [character sheet design](http://www.onesevendesign.com/swn_charsheets_oneseven.pdf) by OneSevenDesign.

### Author/Maintainer

[Kevin Searle](https://app.roll20.net/users/565104/)

### Contributors

* [MankiGames](https://github.com/MankiGames)
* [Shadowriku](https://github.com/Shadowriku)
* [RonaldZ](https://github.com/RonaldZ)
* [jfredett](https://github.com/jfredett)
* [CoalPoweredPuppet](https://github.com/CoalPoweredPuppet)

### QA/Testing

* [tipsta](https://github.com/mistatipsta)

### Testing Help

If you wish to test new features, fixes, and changes use the [development campaign](https://app.roll20dev.net/join/39986/aOV4kg). Use the command !charsheet to create a new character sheet before each feature/bug to test in order to start with a clean character sheet.

### Feedback

Report any problems, suggestions, or features by [creating an issue](https://github.com/kevinsearle/roll20-character-sheets/issues) on Github.

### Changelog

#### 0.1.8

* Removed errant character

#### 0.1.7

* Revamped and made consistent all roll templates for:
 * Saves
 * Weapon Attacks
 * Basic Attacks
 * Skills
* Initiative now using roll templates
* Removed unused Morale roll template

#### 0.1.6

* Removed damage message from missed weapon attacks
* Added roll templates for basic attacks
* Swapped background image on roll templates
* Style tweaks to roll templates
* Fixed error with attacks/skills/init using old attr mod name
* Link to QA campaign
* Fixed issue with Combat/Unarmed not being applied to damage rolls
* Rearranged attributes to match order shown in character creation page

#### 0.1.5

* Added misc bonus to attributes
* Rearranged location of Hit Points and System Strain
* Removed sheet version variable
* Maximum strain auto-calculated on sheet open and when Con changes

#### 0.1.4

* Removed attribute auto-calculated values and replaced with sheet workers.
* Added sheet version variable.

#### 0.1.3

* Added Sheet Worker to enforce System Strain constraints against Maximum Strain and Permanent Strain
* Added Stowed and Other attribute to Gear in addition to Readied
* Changed Readied/Stowed/Other to radio from checkbox
* Added Sheet Worker to auto-calculate Current Readied and Current Stowed gear

#### 0.1.2

* Added ship weapon power field

#### 0.1.1

* Weapon auto-attack calculated by attribute modifier and skill level.
* Drop-down menu added for those fields.

#### 0.1.0

* Attribute modifiers are now auto-calculated
* Split Basic Attack button into Basic Melee Attack and Basic Ranged Attack buttons
* Basic Attacks use auto-calculated attribute modifier based on type of attack
* Attack roll template handle Basic Attacks and Weapon attacks
* Added character name to Weapon Attack and Basic Attack roll templates

#### 0.0.9

* Fix weapon repeatable field widths
* Fix attack roll failure due to null attack bonus
* Added Languages text area

#### 0.0.8

* Fix errant initiative die.
* Adds Roll Templates for all the roll buttons on the sheet.
* Sets a default of '0' for all attribute bonus fields.

#### 0.0.7

* Add support for multiple tabs
* Add ship character sheet tab

#### 0.0.6

* Roll buttons for all the listed skills
* Roll buttons for all saves
* Auto-sets the Max Strain to Unaltered CON
* Boxes to store each Attribute's bonus value
* A Box to store your current AC (to allow target-macros + for easy reference)
* A button for rolling initiative. If you have your token selected, it will automatically add it to the turn tracker.
* A section just below the Core Stats sheet for the above initiative macro/roll button (and any future buttons that might be useful)
* Buttons for rolling attacks based on weapons in the weapon section, as well as a generic attack roll button.

#### 0.0.5

* Fixed Skill rows not aligning.

#### 0.0.4

* Changed logo to image at http://i.imgur.com/3U3Ibb7.png.
* Fixed widths of weapon div columns and input elements.

#### 0.0.3

* Fixed bug with Artist and Combat Unarmed skill using the same value.
* Added alternating color to skills rows to differentiate them easier.

#### 0.0.2

* Fixed bug with repeating Psionics rows by hard-coding the number of fields available.
* Changed version naming scheme.

#### 201411011226

* First release, supporting basic features.
