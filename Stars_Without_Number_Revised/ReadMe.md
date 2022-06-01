# Stars Without Number Revised Edition Character Sheet

This sheet is created for use in Stars Without Number Revised Edition on Roll20.

## Authors/Maintainers

* [Karlinator](https://github.com/Karlinator)
* [Jakob](https://github.com/joesinghaus)
* [Panzer](https://app.roll20.net/users/2223776/panzer)

## Contributors

* [Victor M. Suarez](https://github.com/svmnotn)
* [MankiGames](https://github.com/MankiGames)
* [Shadowriku](https://github.com/Shadowriku)
* [RonaldZ](https://github.com/RonaldZ)
* [jfredett](https://github.com/jfredett)
* [CoalPoweredPuppet](https://github.com/CoalPoweredPuppet)
* Original First Edition sheet by [Kevin Searle](https://github.com/kevinsearle)

## QA/Testing

* [tipsta](https://github.com/mistatipsta)

## Feedback

Report any problems, suggestions, or features by
[creating an issue](https://github.com/Karlinator/roll20-character-sheets/issues)
on Github.

## Contributing

* Contributions are welcome at
  [the GitHub](https://github.com/Karlinator/roll20-character-sheets). Just open
  a pull request.
* You will need to install [Node.js](https://nodejs.org), then go to the Stars_without_Number_Revised folder and run the following
  commands in bash/cmd:
  * `npm install`
  * `npm run dev`
  
Npm is now watching all the files for changes and compiling as you go.
If you want to compile everything just once, use `npm run build` instead.

## Changelog

## 2.6.5

* Fix icon link broken by external service.

## 2.6.4

* Fix weapon AB not displaying correctly with the Sunblade skill.

### 2.6.3

* Fix quick menus giving "unrecognised command /w".

### 2.6.2

* Fix rolltemplates not being migrated properly to CSE.

### 2.6.1

* Add datalists to most free-fill fields with autofilling
  * Drones, drone fittings, ship hulltypes, class
* Update sheet to use the new Character Sheet Enhancement sanitiser.
* Some TypeScript refactoring.

### 2.6.0

* Migrate worker codebase to TypeScript. Should hopefully reduce future bugs.
* Usability pass:
  * Add a yellow border while in edit mode, which also highlights the edit mode button. Should help new users find the button.
  * Some clickable labels (one so far) get a dice icon next to them to signify that there's a roll if you click it.
  * Clarify how Strain works. Now visually clear how it is calculated and what the different numbers are.
  * Add a few extra fields to track useful things on the ship sheet.
  * Some text clarification.

### 2.5.4

* Fix incorrect encumbrance value for shields.
* Fix (un)checking Shell Affinity deactivating all active Shells.
* Add WWN to skill lists selectable in sheet default settings.

### 2.5.3

* Fix a bug causing the Magic "Quick Menu" to just completely not work.

### 2.5.2

* Fix a bug preventing ship price from ever being calculated.
* First support for Worlds Without Number in the form of an alternate skill list.
* Fix a bug causing some calculations to not update when a repeating row was removed.
* Fix some items displaying as "NaN" price because their price was dependent on tech level or similar.

### 2.5.1

* Fix a bug causing new sheets to incorrectly initialise as AI and Transhuman.
* Fix a missing translation key for "Price".
* Fix a bug to effort making some fields concatenate instead of add.
* Fix a bug causing str/dex mod to come out as 10 sometimes.
* Add a description field to weapons/attacks, which shows up in the roll template.
* Add toggle (default to off) to ship price autocalculation. Lots of existing ships don't have price info updated, and there's no place to write in price for new items.
* Drones support for NPCs.
* Add NPC Shock damage.

### 2.5.0

* Support for Transhuman PCs with Shells and body-swapping.
* Support for True AI PCs, with Processing and Routines, as well as Shells shared with Transhumans.
* Ship price autocalculation during building (does not update with subsequent Hull Type changes)
* Price information displayed for everything that currently supports autofilling.

### 2.4.12

* Fix a bug causing Int to be added twice to drone attacks.

### 2.4.11

* Fix a bug causing cyberware strain to not be updated when a cyberware was deleted.

### 2.4.10

* Fix a bug disallowing decimal encumbrance values.
* Introduce a "bundled" toggle for equipment, which will bundle the items in packs of 3. This can be used instead of decimal encumbrance values.

### 2.4.9

* Fix a bug causing section headers and some fields to render incorrectly.

### 2.4.8

* Add range to NPC attacks.
* Move bonus effort to psionics section for easier finding.
* Change encumbrance step size from 0.01 to 1.

### 2.4.7

* Fix attribute boosts not being counted correctly for encumbrance and system strain.
* Collapse attribute base and boosts fields into a single field in display mode.

### 2.4.6

* Add a box to keep track of attribute boosts.
* Fix travel cost macro not calculating travel cost correctly.

### 2.4.5

* Fixed an issue with the travel cost formula when the crew field was empty
* Fixed an issue with roll buttons referencing the old "name" attribute instead
  of character_name
* Fixed the translation for Initiative

### 2.4.4

* Fix inconsistent field name HP_MAX on the NPC sheet - the correct way to write
  this is HP_max.
* Link the name input on the PC sheet to the character_name attribute.
* Fix misspelling of "Initiative" in translations, which was not propagated from
  translation.json

### 2.4.3

* Fix the summation of cyberware strain not actually doing that even remotely.
* Fix magic effort update not triggering on changing the committed effor for the
  day.

### 2.4.2

* Remove incorrect title text from uncommitted Magic Effort
* Fix HP rolls for Heroic Characters looking at the wrong attribute
* Fix the version upgrade code stopping early and thus not change the version
  number on the sheet.

### 2.4.1

* Fix Innate AC missing translation key.

### 2.4.0

* Add tracking of permanent System Strain.
* Fix HP roll for Heroic characters.
* Added a macro to calculate travel costs.
* Codex of the Black Sun support!
  * Magic changed to Know Magic and Use Magic.
  * Sunblade skill and Fight skill added.
  * Toggle between Adept, Arcanist, and Magister.
  * Magic Effort for Adepts.
  * Spell Slots for Magisters and Arcanists.
  * Arcanists track if spells are prepared.
  * Adepts have abilities.

### 2.3.1

* Fixed a bug causing the sheet to sometimes display an incorrect attack bonus
  for weapons.
* Fixed missing base attack bonus for drone attacks.

### 2.3.0

* Added drone tab
* Added weapon description data as well as armor descriptions
* Added quantity for inventory, as well as proper support for Enc-1/3 gear
* Added artifact armor and gear
* Mech weapons now have range instead of ammo

### 2.2.0

* Added autofill functionality for ship hulls and class ability.
* Added autofill buttons for armor, cyberware, foci, gear, ship modules,
  techniques, and weapons.
* Weapon encumbrance can now be modified in the weapon section. Weapons with 0
  encumbrance will no longer be shown in the gear section.
* Added an extra field to put effort that is only committed as long as a power
  is active.
* Changed "Total" effort to "Uncommitted", and added auto-calculating. The
  formula for effort is now more accurate.
* Added the option to enable ammo tracking with ChatSetAttr to the sheet default
  settings.
* Added a place to track skill points that can only be spent on psionics.
* Added Discipline field to psychic techniques.
* Added switch Ship/Mech/Custom for the ship tab.
* Changed armor to be a repeating section.
* The gear section now has a header.
* Exert can now be used as a weapon's attack skill.
* The chat macro for skills is now sorted into trained/untrained ones, the
  latter of which can be disabled.

### 2.1.0

* Additions
  * Added option to disable modifier queries globally.
  * Added button to roll hit points.
  * Added weapon encumbrance tracking.
  * Added ammo maximum for weapons.
  * Weapon shock damage can now be toggled independent of base being 0 (for
    Unarmed Combatant).
  * Added option for automatic ammo reduction (requires ChatSetAttr).
* Bugfixes
  * Attribute modifiers are now recalculated upon conversion from v1.6.2.
  * Roll templates are no longer cut off when chat avatars are disabled.
  * New NPC attacks should now receive the correct attack bonus.
  * Line breaks in foci/technique/spell/cyberware descriptions now render
    correctly.

### 2.0.1

* Fixed a bug preventing successful conversion of NPC sheets.
* Fixed a bug preventing extra effort from taking effect.

### 2.0.0

* New, overhauled version of the sheet (rewritten in pug and sass)
  * Complete sheet HTML/CSS has been re-done for a more compact look
  * Edit/Display mode toggle at the top of the sheet
  * Roll template overhauled
  * Many attributes were renamed or otherwise reorganized (seamless conversion)
  * Chat menus for easy access to all sheet macros
  * Ship sheet now has tracking for power/mass/hardpoints, as well as weapon
    attacks
  * NPC sheet now has repeating sections for attacks and special abilities
  * Added i18n support

### 1.6.2

* Fixed weapons rolling with Shoot when First Edition skills was selected.
* Add attribute to Shock damage.

### 1.6.1

* Fix the sheet default settings to actually work.
* Spelling and text fixes.
* Added field for number of attacks to NPCs.

### 1.6.0

* Added new tab "Settings", for now primarily for toggling homebrew options.
* Sheet default settings for everything in the settings page.
* Luck save can now be added in settings.
* Option to play with 1st Edition skills if you prefer those.
* Also option to add your own skills in addition/instead.
* Autofilling the "Next level xp" (with options).
* Toggleable custom counters for whatever you heart desires.
* Option to remove psionics completely.
* New section for Space Magic, a Deluxe edition set of rules for importing magic
  into SWN.
* Fixed formatting of an NPC stat block.
* Changed the header toggles to work slightly better/faster.
* You can now enter arbitrary dice rolls for shock damage!
* Toggling to add skill to damage will now also add it to shock damage.
* Added field for shock AC

### 1.5.1

* Fixed bug where the AC and AB on NPC sheets was reset to the PC sheet value
  when the sheet was opened.
* Updated image.
* Spelling corrections.
* Added shock damage to weapons, only shows if a stat is entered.
* Removed field for magazines in weapons.

### 1.5.0

* Fixed Sneak skill showing as Program.
* Added Beasts and Bots to NPC autofill.
* Added Saving Throw to NPC sheet.
* Added klicking headers to show/hide sections.

### 1.4.0

* Added NPC tab which holds standard NPC stats, notes, and rolls such as Morale
  and Reaction.
* Fixed bug where modifiers weren't applied to skill rolls if the "assist" popup
  was submitted empty.
* Added explanation of skill roll modifiers
* Added description fields to cyberware as well.
* Added ability to print description fields to chat as a macro.
* Made the skill list a little smaller by decreasing font size.
* Clean up code intentation and formatting. It is now consistent (and also in
  tabs).
* Added ability to hide Psychic section since not all characters need it.

### 1.3.1

* Added "Weapons" subheader to combat section.

### 1.3.0

* Duplicated weapon rolls to new Combat section where Common Rolls used to be.
* Added ability to add the skill bonus to the damage (Gunslinger etc).
* Added field for remaining magazines next to ammo.
* Added dropdown to chose No/ask/always on bursting when shooting.
* Separated Committed Effort Day and Committed Effort Scene.
* Added show/hide fields to add desciptions to class ability, psionic
  techniques, and foci.
* Changed Attack Bonus to Base Attack Bonus.
* style and text changes.

### 1.2.0

* Changed attack roll template to correctly apply a -2 unfamiliaruty malus when
  a skill is at -1, instead of a -1 malus.
* Added Burst as Yes/No option on attack rolls that adds damage too.
* Changed Psychic Techniques and Cyberware to a repeating section, so people
  won't run out of fields.

### 1.1.1

* Completely removed target AC (1.1.0 had 20 for AC) from attack calculation
* Slight layout tweaks

### 1.1.0

* Reworked attack rolls to no longer ask for AC and to also have the roll number
  make sense.
* Reworked the skill list. There are now options for rolling 2d6, 3d6kh2, and
  4d6kh2 for the Specialist focus among others.
* Reordered the skill list to be alphabetical by coloumn instead of by row.
* Reordered the attributes to be in the usual order (STR, DEX, CON, INT, WIS,
  CHA)

### 1.0.0

* Initial Release (cloned from Stars Without Number 1st Ed. sheet v0.1.7).
* All skills and features renamed and reworked to Revised Edition rules.
* Auto-calculating AC, Saving Throws, and Effort through Sheet Worker.
