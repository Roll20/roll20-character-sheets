# Changelog

[GitHub Project Status board](https://github.com/wesbaker/roll20-character-sheets/projects/1)

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
