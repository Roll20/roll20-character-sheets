# Swords & Wizardry

Character sheet for Swords & Wizardry, in English and French.

## Authors

* [Natha](https://github.com/NathaTerrien/roll20-wip/blob/master/README.md) (technical overhaul)
* Jacob Vann (initial author)

## Current version

Screenshots:

* [English](SWSheet.png)
* [French](SWSheet_fr.png)

The sheet and its automated calculations (modifiers, etc.) are based on Swords & Wizardry Complete Rules.

Every calculation can be overridden by manual input, if house rules are used. Modifying certain fields will trigger the associated automated calculation. For example, modifying DEX will trigger the AC modifier to be calculated, the total AC, etc. Then any custom value previously entered has to be set again.

## Release notes

### v2.3 (2020-04-21)

* Fixed broken image link due to ampersand by moving this sheet to "swords-and-wizardry".
* Cleaned up documentation fixing typos and adding minor copy edits.

### v2.2 (2017-09-17)

* Technical optimisation

### v2.1 (2017-02-15)

* Layout bug fix: Min/Max spell label was too long, and the corresponding field was hidden
* New 'Total Weight' field (automatically calculated based on total treasure and gear weights, but can be overriden)
* Treasure and Gear total weights calculation optimisation
* Relocate logo from imgur to github

### v2.0 (2017-02-04)

Note : this new version of the sheet is compatible with previous versions and characters.

* New and more compact design
* Translation compatible
* Added missing derived attributes (Open doors, Spell level, min/max spells)
* Automated calculations (by sheet workers) of derived attributes, when an attribute is modified (ex: modifying Strength will calculate the melee To-Hit mod, Damage mod, Carry mod, Open Doors threshold)
* New "Other" AC modifier to note magic items effect on AC, like rings or curses, wounds, spell effects etc.
* Handling of Ascending and Descending AC (radio button). On change: 
  * Base AC is (re)set accordingly
  * DEX modifier to AC is calculated accordingly
  * Ascending AC is calculated by adding Base AC + DEX modifier + absolute value of Armor AC modifier + absolute value of Shield AC modifier + Other AC modifier
  * Descending AC is calculated by adding Base AC + DEX modifier - absolute value of Armor AC modifier - absolute value of Shield AC modifier + Other AC modifier
* Gear and Treasure weight are automatically tallied. 
  * Total gear weight sums every item weight, multiplied by quantity (unit weight assumed)
  * Total Treasure weight sums every item weight
  * Total wealth is NOT calculated
  * Move squares are NOT calculated (depending on house rules and/or local distance measuring units)
* New languages field
* New Hit Dice field (roll formula)
* New separate numeric field in the Saving Throwns bonuses repeating section
* New optional Roll field (dice formula) in the Abilities & Magic repeating section
* Roll buttons added, with chat roll template:
  * Hit points from Hit Dice formula
  * Standard Saving throw (with success or failure indicator)
  * Saving throw with Bonus (with success or failure indicator)
  * Open Door (with success or failure indicator)
  * Abilies or Magic custom roll
  * Attack, with To-Hit and Damage rolls at once
