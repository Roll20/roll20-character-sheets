# Changelog All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## 1.3.0 (2022-06-08)

### Added

* added add active or passive ability for class or race via dropdown
* added advanced settings to display all attributes on abilities
* added new ability attributes (isAttackRoll, attackRollBonus, attackDamageBonus, isDefenseRoll, defenseRollType, defenseRollBonus, additionalManaNum, additionalDifficulty, castingAttribute, secondaryRoll, secondaryCastingAttribute, secondaryRollAgainst, damage, damageType, isMulticast, obtainedLevel, customMacro)
* added dice roll buttons to active abilities

### Changed

* changed ability macros are not hardcoded but generated from attributes
* changed roll template to support new macro structure

## 1.2.0 (2021-10-13)

### Changed

* changed modifiers are counted to attributes

### Added

* added custom roll templates
* added npc/monster sheet

### Fixed

* fixed skill level ups
* fixed max and zo modifiers
* fixed printexts for skills and abilities
* fixed titles for macro support
* fixed merging settings

## 1.1.0 (2021-09-22)

### Changed

* styles of inputs and roll buttons

### Added

* added additional properties to active abilities, fixed rename additionalMana

### Fixed

* fixed combat equip button, fixed modal
* fixed order of active abilities attributes
* fixed titles and input validations of skills

## 1.0.2 (2021-09-15)

### Added

* added pergamen, fixed sections gap, feat added settings, added alternative icons, added authors

### Fixed

* fixed sections gap, fixed moved roll advange, fixed labels, fixed build comment styles, fixed build span white spaces, fixed rolltemplates, fixed roll skills with modifiers

## 1.0.1 (2021-09-06)

### Fixed

* update eqquiped weapons and amors values
* recalculate attack and defense on weapon attribute change
* eqquip first weapon

## 1.0.0 (2021-08-31)

### Added

* player character sheet
* roll buttons for ability, skill or fight action
* inventory weapons equipped are synchronized to fight section
