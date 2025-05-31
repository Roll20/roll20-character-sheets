# Changelog

[GitHub Project Status board](https://github.com/wesbaker/roll20-character-sheets/projects/1)

## 1.9.3

### Fixed

- Fix a bug where "AttackMatrix6:#" appears when rolling dice with DAC

## 1.9.2

### Fixed

- Fix a bug where the modifier inputs would throw validation errors when less than 0
- Fix a bug where the modifiers could be changed

## 1.9.1

### Fixed

- Fix a bug where the Death/Poison save incorrectly added the modifier

## 1.9.0

### Added

- Add modifiers to attribute scores
- Add roll button for NPC Reaction
- Add spells tab
- Add default sheet setting for default character type

### Changed

- Change rolltemplates to show character name
- Change button hover color to orange for better contrast

## 1.8.0

### Changed

- Change damage die to a text field to provide more flexibility

## 1.7.1

### Fixed

- Fix a bug where newly created monsters did not have a die button

## 1.7.0

### Added

- Add retainers tab for charisma based retainer modifiers
- Add prompt for Wisdom bonus on saving throws

### Fixed

- Fix a bug where the spell level input was wider than the space in the grid
- Fix a bug where setting the default sheet to DAC wouldn't create DAC characters

## 1.6.2

### Fixed

- Fix a bug where the strength bonus was not added to new melee weapons
- Fix a bug where strength and dexterity weapon modifiers didn't change when the attributes changed
- Fix colored borders shown for skill rolls

## 1.6.1

### Fixed

- Fix a bug where the roll templates were showing nothing

## 1.6.0

### Added

- Add spells per level
- Add memorized spell number input
- Add attack value matrix to DAC sheet
- Add option for individual initiative which accounts for both arbitrary bonus/penalty and dex bonus on players and arbitrary bonus/penalty for monsters

### Changed

- Update OSE Logo
- Rename Critical Miss / Hit to Natural 1 / 20
- Change default attributes to 10
- Change encumbrance calculation to multiply quantity of items by their weight
- Changed the contents of some placeholders and switched some placeholders to values to reduce confusion

### Fixed

- Fix incorrect or missing attack buttons for DAC sheet
- Fix buttons not being draggable onto macro bar
- Fix a bug where the worn checkbox didn't reduce the amount of armor worn when unchecked

## 1.5.1

### Fixed

- Fix a bug where the strength bonus was not added to attack rolls
- Fix a bug where new characters would have AC of 0
- Fix armor calculation code to account for worn armor

## 1.5.0

### Added

- Add critical hit and miss results to attack rolls
- Add Dolmenwood classes

### Changed

- Change "AC Benefit" to just AC
- Change "Threshold Modifier" to "Situational Bonus"
- Change damage roll to show roll formula, but also no longer enforce minimum of 1 damage
- Change weapons table to only have attack type and not attribute

### Fixed

- Fix a bug where colors were not appearing for max and min rolls on dice

## 1.4.0

### Changed

- Add optgroups to class dropdown to categorize classes
- Add automatic XP calculation for monsters based on hit dice

### Fixed

- Fix a missing translation for "Find secret door"
- Fix automatic hit dice for character classes

## 1.3.0

### Added

- Add a reaction roll button to monster sheet
- Add a Wisdom modifier next to saving throws on the character sheet
- Add modifier queries to all saving throw rolls
- Add a Patreon link to the sheet.json in case folks want to donate
- Add French translation, courtesy of @elbj

### Fixed

- Fix a bug where saving throws were being reverted to zero due to transition code for old saving throw attributes

### Removed

- Remove (hidden) deprecated saving throw values that aren't necessary given the automatic saving throw values

## 1.2.0

### Added

- Add an option to disable threshold modifier
- Add monster, normal human, and custom classes as options
- Add auto-calculating saves and BAB/THAC0 for monsters either as monster HD or as class and level
- Add monsters in wilderness number appearing values

### Changed

- Change class input to a dropdown
- Change monster attacks so there is no minimum damage
- Change monster HD label and title to Number of Hit Dice for clarification

### Fixed

- Fix movementEncounter and movementOverland not being available to tokens (needed to be readonly versus disabled, which means it needed to be calculated via sheet workers and not in the value itself)
- Fix a bug where monster attack descriptions were not shown

## 1.1.0

### Added

- Add a toggleable description for weapons
- Add the ability for spells to just show descriptions when no effect roll exists (e.g. Read Languages)

### Fixed

- Fix a bug where armor class types that were uppercased didn't display BAB or THAC0
- Fix a bug where the attack macros were saved between character and monster tabs
- Fix a bug where the monster name wouldn't be used in the journal or on tokens (it was formerly separate from character name, now they're linked)
- Fix a bug where the dex modifier was incorrect for Dexterity values of 16-17

## 1.0.0

### Added

- Automatically set next experience, HD, BAB, THAC0, and saving throws when setting level and class for cleric, dwarf, elf, fighter, halfling, magic-user, and thief
- Add notes sheet
- Add notes section to character sheet
- Add settings sheet
  - Add armor class type to settings
- Add default sheet setting for armor class type (AAC versus DAC)
- Add descending armor support and calculation
- Add dexterity calculations on sheet load (calculates unarmored AC, AC mod, and initiative mod)
- Add missing BAB for AAC characters
- Add thac0 for characters and monsters

### Fixed

- Fix bug where armor values where concatenated, not added

### Deprecated

- Renamed and deprecated both `attr_ac` and `attr_acUnarmored` in lieu of `attr_aacAc`, `attr_dacAc`, `attr_aacAcUnarmored`, and `attr_dacAcUnarmored`

## 0.9.1

### Added

- Add type of attack to character weapon table to prevent DEX bonus from being added to damage
- Make hit point and HD fields rollable for character tab

### Fixed

- Fix calculated encounter movement rate to 1/3 of exploration
- Fix missing `weaponDescription` value for character tab

## 0.9.0

- Initial release
- Duplicated from the Sheershym's Old School Essentials sheet
- Switched from DAC to AAC
  - Removed the Attack Matrix
- Added a monster tab
- Changed the skills, attacks, and weapons repeating section to just skills
- Added weapons, armor, and spells repeating sections
- Added encumbrance calculation
- Added numerous autocalculating fields (e.g. movement based on exploration speed)
- Added roll buttons for HD/HP
