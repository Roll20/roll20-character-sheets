# Microlite20 Character Sheet

This is a Microlite20 character sheet.  It is designed for
use with Roll20.net and released open source under the MIT License.

### Changelog ###

**Release 5.3 - October 4, 2015**
- Added Max HP
- Fixed a bug with rangers having modifiers that shouldn't have been negative.

**Release 5.2 - September 14, 2015**
- Initiative is based on d20 + dexterity bonus, and I had it set to dexterity MODIFIER (a miscellaneous modifier for dex... not the same thing as the bonus).  This is now corrected.

**Release 5.1 - July 13, 2015**
- Bugfix: Armor Class now accounts for the miscellaneous modifiers.

**Release 5.0 - May 12, 2015**
- New layout with a tab-controlled interface
- Added miscellaneous modifiers to stats, skills, weapons, and armor.
- Moved all attack rolls to exist on a per-weapon basis.  
- Reintroduced a spells section, now on a new tab.  Contains the full breakdown of the spell rolls.
- Implemented inline rolls so hovering over results won't splash a big wall of math at you.

**Release 4.5 - March 16, 2015**
- Added note to initiative roll to explain initiative roll calculation.
- Moved all roll calculation explanations to title attributes.  Now the explanations display when you hover over the buttons.  You are all now delivered from the cursed wall of text.
- Rearranged the sheet to make more use of real estate.  
- Added css for tables in order to better separate fields
- Standardized roll template output
- Changed "racial bonus" to "human racial bonus"
- Removed "Dice Type" and "Dice Number" in favor of 1 field that'll do both: "Damage Dice"
- Retitled some things for better display
- Changed Height and Weight to text boxes... 

**Release 4.1 - March 12, 2015**
- Fixed logic on attack rolls.  M20's rulebook was worded in a confusing way, which resulted in an additional +1 roll per level on every attack roll.  So this fix removes that additional +1 per level.
- Fixed Ranger bonus calculation.  Was missing an ending parenthesis, so it wasn't getting calculated.
- Rearranged the sheet for easier readability
- Added Shield section to add to AC
- Added Stat rolls
- Changed Equipment section to a single textarea... (nobody wants to painstakingly add every single inventory item to their sheet... much easier to just type it all out).
- Changed title of Equipment Section to "Inventory"
- Added Initiative roll (will automatically add to tracker)
- Changed all roll buttons to use roll templates

**Release 4 - March 10, 2015**
- Cut down on the verbosity of rolls (took up too much of the chat box)
- Removed Light Weapons from Missile Attack Roll
- Added a new section for special attack rolls: Light Weapons, and Dual Wield
- Added in Microlite20 "Expert Rules"
  - Added 4 new races: Gnomes, Half-orcs, Half-elves, and Lizardmen
  - Added 5 new classes: Paladin, Ranger, Illusionist, Druid, Bard
  - Added Paladin modifier to all save rolls (+1 at level 1, and +1 per every 5 levels)
  - Added Ranger modifier to ranged attack rolls, ranged damage rolls, and dual-wield rolls
  - Added an additional skill: Survival


**Release 3.5 - February 26, 2015**
- Changed the layout for more easier readability.

**Release 3 - February 19, 2015**

- Flipped the order of female and male sexes... Not making a sexist
statement here, but the default option should be the more common option.
- Removed Spells functionality.  Microlite's rule is you can cast any
spell your level allows, and no player wants to painstakingly add every
single spell to their character sheet.  
- Added buttons for attack rolls.  These rolls also incorporate the
fighter class's additional +1 (per 5 levels) paradigm.  These new
buttons appear beside the attack bonus section.
- Modified skill check buttons.  They now incorporate the human class
logic of an automatic +1 when human is selected as the race.
- Added descriptions to the rolls to explain, in chat, what they are, and
how they were calculated.
- Added an Armor section to define your armor and the armor class bonus
- Removed old Armor Bonus section in favor of new Armor section
- Modified Weapons section to include the fighter bonus to the damage
rolls, if fighter is selected.
- Added Save Rolls
- Added weapon range type to weapon section
- Added Strength Bonus to damage rolls
- Added level modifier to attack rolls
- Modified Missile Attack Rolls to include light weapons.


**Release 2 - February 13, 2015**
- Fixed a bug with Armor Class, and added buttons for skill rolls.

**Initial release - August 12, 2014**
- First release.  As we playtest with a campaign I expect all the kinks will get
worked out. Look for updates within the next two months.