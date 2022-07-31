# Star Wars 5e

This is a character sheet for Star Wars 5E (SW5E), a D&D5E conversion.
More Information
- [Full SW5e Site and Rules](https://sw5e.com/)
- [Star Wars 5E Subreddit](https://www.reddit.com/r/sw5e)
- [Star Wars 5E Sheet Wiki article](https://wiki.roll20.net/StarWars5E-Sheet)
- [Star Wars 5e Discord](https://discord.gg/zYcPYTu)

# Changelog
## 2022-03-19
* Bug Fix - It was identified that because the default to-hit modifier had been changed from DEX to WIS on the Ship Sheet, sheets upgrading from 2.4 were over-riding any PC weapons to WIS that had not been EXPLICITLY set to DEX, because the weapon attacks on PC and Ship share the same repeating fieldset.  This is a documented Roll20 *feature*.  We have set the default back to DEX on the Ship Weapons for now as a fix for anyone else that still needs to upgrade.  In addition, the defaults between the SHIP and PC defaults have been aligned.  In version 2.4 the PC sheet set the defaults to STR, the SHIP to DEX and we have confirmed that once a name was placed in the 2.4 attack section the defaults would change to DEX.  This should now keep both attack sections in line and avoid a potential future upgrade where one set of defaults writes back over the other. *Ideally in the future the ship weapons will be separated into their own repeating fieldset.*
* Copied the Save modifiers from the PC sheet to the Ship sheet 
## 2022-03-17
* Put in a check against a new behavior that began today sheet attributes are not being set on sheet open even when defined with a value in hidden attributes.  This caused HP and Shield calcs to fail until the related modifiers were not changed at least once.  Added a NaN check against this at least for the ship portion of the sheet.
## 2022-03-14
* Fix for CSS for issue where new sheet tab selectors were covered when Advantage Toggle was on
* Fix for Hull and Shield Dice calculation that was not including the con or str mod with the first die
* Changed Hit Points on Ship Sheet to read Hull Points, added Damage Reduction field (this is not tied to any automation, but will allow a place for it for those that use errata)
## 2022-03-11
### GLOBAL SHEET CHANGES
* Temporary Fix for CSS for subcontainers that were having contents extend over themselves vertically in other languages changed height to min-height.
* Changed color on HP and other sub container boxes total bottom border to make it clearer on the page where the differentiation is especially when extending in other languages
* Cleaned up some formatting
### MAJOR SHIP SHEET OVERHAUL
##### CORE SHIP SHEET CHANGES
* Added Intelligence, Wisdom, and Charisma modifiers and relevant saves
* Added all ship skills
* Changed hit dice to Hull Dice and added Shield Dice, now will update the maximum number of HD and SD based on ship size and tier changes
* Fixed issue with Ship Sheet Hit Dice (now Hull Dice) not updating the correct hit dice based on ship size
* Added role input field to ship sheet header
* Added Power Couplings and Reactors with translation labels
* Added Power Die rollable storage section that will calculate capacity based on selected power coupling with appropriate recovery rolls based on selected reactor
* Added Power Die system specific roll callout names
* Moved the Attack box to bottom of the core sheet and added ship weapon category, ship facing, and range
* Added calculation that will generate starting hull points based on ship size, tier, and armor choice
* Added calculation that will generate starting shield points based on ship size, tier
* Added recalculation of shield dice based on change on STR mod
* Added recalculation of hull dice based on change in CON mod
* Added Calculation to determine number of credits needed to upgrade to next tier and will populate the field
* Removed Credits Invested Field
* Added Passive Wisdom manual entry box
##### ADDED SHEETS CARGO, MODS, SUITES
###### CARGO TAB
* Added Cargo Tab to ship sheet and moved current cargo sections there
* Added Fuel Tracking and placed on the cargo tab
* Added Food Tracking and placed on the cargo tab
* Added Capacity Tracking for both hidden and non-hidden cargo on the new tab
* Fixed Hidden inventory calculation so that total cargo on Ship sheet updates when items are added to the hidden cargo section on the cargo tab
* Added Notes text box to Cargo tab
###### MODS TAB
* Added Mods Tab to ship sheet and moved current modifications box there
* Added tracker for Modification Capacity, Fixed Hardpoints, Turret Hardpoints to the mods tab.
* Added calculation that will generate starting modification capacity based on ship size to the mods tab
* Added tracker for Modification Capacity, Fixed Hardpoints, Turret Hardpoints to the mods tab.
* Added cost and grade to the modifications repeating list
###### SUITES TAB
* Added Suite tab and added an additional suite modifications box to that tab
* Added tracker for Suite Capacity to the suites tab.
* Added calculation that will generate starting suite capacity based on ship size on the the suite tab
* Added cost and grade to the suites modifications repeating list
##### SHIP OPTIONS TAB
* Added options panel on ship sheet that allows for choosing Proficiently or Expertly Equipped to allow overriding skills rolls
* Moved existing armor and shield repeating list here to try to ensure legacy sheets using it do not break, it can now be used for custom armor

## 2019-08-20

* re-arranged skills in alphabetic order, PC/NPC
* made NPC sheet slightly wider
* added back some Default Settings