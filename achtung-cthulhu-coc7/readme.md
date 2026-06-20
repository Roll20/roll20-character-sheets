# Achtung! Cthulhu (CoC 7th)
![version](https://img.shields.io/badge/version-1.03-green.svg)

This is a [**Roll20**](https://roll20.net/) character sheet for **Achtung! Cthulhu** role-playing game published by [*Modiphius*](https://www.modiphius.net/) based upon **Call of Cthulhu 7th Edition** rules published by [*Chaosium*](https://www.chaosium.com/). It is not designed for *Call of Cthulhu 6th Edition*, nor *Savage Worlds*.

This sheet supports the [**Roll20 Compendium**](https://roll20.net/compendium/coc/) for *Call of Cthulhu*, and entries from *Monsters*, *Occupations*, *Items*, *Spells*, and *Talents* sections can be imported.

However, it is not compatible with **Roll20 Official Character Sheet** for *Call of Cthulhu 7th Edition*. This means that a character created with a game using the official sheet cannot be imported in a game using this character sheet, and so is the revert.

# Table of contents
* [Features](#features)
* [Tricks](#tricks)
* [Changelog](#changelog)
* [License](#license)

# Features
* Bonus and Penalty dice
* Quick Rolls bar
* Whisper to GM toggle
* Edit and View modes
* Sheet types (PC/NPC/Creature)
* Themes (Achtung! Cthulhu/Call of Cthulhu)
* Customizable Skills list
* Skills ordering based on user language
* Pulp Cthulhu Skills and Talents
* Repeating Weapons, Items, Assets and Spells
* Roll20 Compendium integration (Drag'n'Drop)
* Printable sheet

# Tricks
* **Luck**, **HP**, **MP**, **SAN** and **Cash** : either raw number or sum like `10+4` or `6-3` can be entered.
* **Skill Points** (Edit Mode) : switch between *Base*, *Occupation*, *Interests* or *Advancement* for appropriate counting.
* **Weapon Damage** : formula like `4d6/3y` can be entered for damage radius.
* **Weapon Range** : formula like `str/5` or `str*2` can be entered.

# Changelog

## v1.03 (2025-01-11)
- Fix extreme damage formula (maximum weapon damage + maximum damage bonus + impalement)
- Fix chatlog action button call based upon character name instead of character id
- Fix occupation and interest skill points totals update on skill points reset
- Fix monster attacks extreme damages and damage bonus
- Fix Show Scores parameter not checked by default
- Replace attribute "imp" by "dmg-max"
- Add Call of Cthulhu dark visual theme
- Add printable sheet option with print friendly styles
- Add persistant insanity cap number bubble box and recalc button
- Add major wound cap number bubble box
- Add description roll template (for out of sheet macros)
- Add empty rows sheet option for repeating sections on sheet creation
- Add no damage chatlog text (instead of nothing displayed)
- Add limits to minimal and maximal Credit Rating
- Merge Investigator and Achtung! PC sheet types into PC sheet type
- Remove advancement checkbox for Credit Rating and Cthulhu Mythos
- Reset inline rolls default styles (e.g. use roll result in roll name)
- Show fighting skill score next to weapon name
- Show options blocks expanded by default
- Make Cash field editable in view mode and auto-computed (i.e. calculate sums like 1+2+3 up to four operands)
- Set maximum characteristic score for players to 99 (including Luck, saving Size [200 max] and Power [150 max])
- Set maximum skill score for players to 109 (99 + 1D10 due to advancement ; except for Credit Rating and Cthulhu Mythos)

## v1.02 (2024-02-09)
- Fix weapon damage bug (wrong value in macro)
- Fix unnamed weapon damage attribute missing
- CSS minor consistency changes

## v1.01 (2024-01-30)
- Fix initial weapon damage attribute missing

## v1.00 (2024-01-18)
- Initial release

## Draft (2023-12-18)
- Project start

# License
[Roll20](https://roll20.net/) is a Registered Trademark of The Orr Group, LLC.
[Call of Cthulhu](https://www.chaosium.com/call-of-cthulhu-rpg/) is a Registered Trademark of Chaosium Inc.
[Achtung! Cthulhu](https://www.modiphius.net/collections/achtung-cthulhu) is Copyrighted by Modiphius Entertainment Ltd.
