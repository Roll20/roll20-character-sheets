# Swords & Wizardry

Character sheet for Swords & Wizardry, in english and french.
Initially created by Jacob Vann and overhauled by [Natha](https://github.com/NathaTerrien/roll20-wip/blob/master/README.md) (design, translation data, automated calcultations and rolls/roll template).

# Current version
2.2, Screenshots: [english](SWSheet.png), [french](SWSheet_fr.png)

The sheet and its automated calculations (modifiers etc.) are based on the Complete version of the rules.
Every calculation can be overriden by manual input, if house rules are used. But modifying certain fields will fire again the associated automated calcultion. For example, modifying DEX will compute again the AC modifier, Total AC etc. and any custom value previously entered has to be set again.

# Release notes

## v2.2 (2017-09-17)

* Technical optimisation

## v2.1 (2017-02-15)

* Layout bug fix: Min/Max spell label was too long, and the corresponding field was hidden
* New 'Total Weight' field (automatically calculated based on total treasure and gear weights, but can be overriden)
* Treasure and Gear total weights calculation optimisation
* Relocate logo from imgur to github

## v2.0 (2017-02-04)

Note : this new version of the sheet is compatible with previous versions and characters.

* New and more compact design
* Translation compatible
* Added missing derived attributes (Open doors, Spell level, min/max spells)
* Automated calculations (by sheet workers) of derived attributes, when an attribute is modified (ex: modifying Strength will calculate the melee To-Hit mod, Damage mod, Carry mod, Open Doors threshold)
* New "Other" AC modifier to note magic items effect on AC, like rings or curses, wounds, spell effects etc.
* Handling of Ascending and Descending AC (radio button). On change: 
  * Base AC is (re)set accordingly
  * DEX modifier to AC is calculted accordingly
  * Ascending AC is calculated by adding Base AC + DEX modifier + absolute value of Armor AC modifier + absolute value of Shield AC modifier + Other AC modifier
  * Descending AC is calculted by adding Base AC + DEX modifier - absolute value of Armor AC modifier - absolute value of Shield AC modifier + Other AC modifier
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
