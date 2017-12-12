# Barbarians of Lemuria - Mythic Edition

Character sheet for Barbarians of Lemuria - Mythic Edition, in [english](http://barbariansoflemuria.webs.com/) and [french](http://www.ludospherik.fr/content/14-barbarians-of-lemuria), by [Natha](https://github.com/NathaTerrien/roll20-wip/blob/master/README.md).

Graphic design is based on the french edition.
Background image courtesy of [Emmanuel Roudier](http://roudier-neandertal.blogspot.fr/), lead artist on BoL:Mythic, french edition.

# Current version
1.4 [Screenshot](bolm.jpg)

The sheet has integrated rolls (with chat roll templates).
Every roll as a PC or NPC asks for, at least, a modifier (default 0).
  * Attributes. 3 roll buttons per Attribute: standard (2d6), with Bonus Die (3d6kh2) and with Penalty Die (3d6kl2). Checks against 9.
    * Agility: accounts for Armour and Shield penalty.
  * Combat Abilities. 3 roll buttons per Ability: standard (2d6), with Bonus Die (3d6kh2) and with Penalty Die (3d6kl2).
    * Initiative (Priority roll): accounts for Helmet penalty. Checks against 9.
    * Melee attack: asks for attribute choice (default is Agility, or Strength) and Target's defence. Checks against 9.
    * Ranged attack: asks for Range (with dropdown list) and Target's defence. Checks against 9.
  * Armour (Damage reduction): accounts for choosen Armour and worn Helmet.
  * Weapon damage: accounts for dice and Strength or Half-Strength bonus, as choosen in the dropdown list.

Due to some temporary technical translation limitations of Roll20, the french version asks for roll variable (range, modifier etc.) in english, for now.

# Release notes

## v1.4 (2017-06-06)

* Updated (official) German translation, by Marc M. (Roll20 Id 4134)

## v1.3 (2017-01-13)

* Added (unofficial) German translation, by Marc M. (Roll20 Id 4134)

## v1.2 (2017-01-02)

* Added an NPC mode and a Beast mode (NPC) to the sheet :
  * in NPC mode, the sheet is identical to the PC sheet but all rolls are whispered to the gm.
  * in Beast mode, sheet is simplified and all rolls are whispered to the gm.
* Added d3,d6 and d6H with Bonus die weapons damage
* Handle Masterwork, Uncommon and Legendary Weapons and Armour
* Added a current / max Advance points
* Added Craft Points handling
* Fix design overlays
* Correct french translation in the weapons damage list

## v1.1 (2016-12-20)

* Bug fix: Agility penalty due to Armour and/or Shield was not applied to attack rolls using Agility (Melee or Ranged)
* Bug fix: Damage rolls using Half Strength were not properly calculated with negative Strength

## v1.0 (2016-12-08)

Creation of the sheet.
