Harn Master Character Sheet
===========================

This sheet is for use with the [Harn Master](http://columbiagames.com/cgi-bin/query/cfg/zoom.cfg?product_id=4001) roleplaying game version 3, by [Columbia Games](http://columbiagames.com/).

Use of the sheet is pretty straight forward.  The sheet includes a number of features and helper scripts including:


Features:
* 3 Tabs for Character, Inventory and Settings (new in V2)
  * Character Tab shows all information relevant during play, including an optional Horse section 
  * Inventory tab has space for weapons, inventory, money, general notes and more. Denote on any item if it's actively carried or not (stored on horse or other location for example) 
  * Settings tab provides options to show the Horse section, split out Piety tracking per god, and toggle some houserules. 
* Roll buttons for each skill that includes appropriate physical/universal penalty.
* Development roll buttons for each skill (new in V2)
* Roll buttons to do Attribute checks (with a prompt to select DM determined multiplier) (new in V2)
* Shock/Fumble/Stumble checks.
* Healing Rolls
* Weapon Quality Checks
* Attack/Defense rolls with adjustments.
* Separate missile weapon section with ranges and their penalties & damage (new in V2)
* Dedicated roll button to roll attacks with HM penalty (new in V2)
* Spell/Ritual/Psionic checks.
* EMLs for in sheet rolls are capped at 5/95 respectively as per rules.
* Checkbox under load toggles correct Fatigue and Encumberance for Mounted players. It also updates initiative and movement for the character based on horse information from the Horse section (if enabled)
* An included horse section to facilitate HarnMaster horse combat rules where character and horse skills are averaged. (this section can be shown/hidden via the Settings tab) (new in V2)
* Items on the Inventory tab can be marked as "Carried", which affects the Character tab: weight will be added to load carried, armor values will be added to armor protection and weapons will show up on the Character tab to roll attack, defense and WQ checks. (new in V2)


Auto-Calculations:
* Armor Load
* Weapon Load
* Inventory Load
* Encumbrance
* Endurance
* Injury Totals
* Physical Penalty
* Universal Penalty
* Show move, minimum move and turning hexes based on current Horse Speed.  (new in V2)
* Armor values: add armour pieces (find values in the HM3 Rulebook) in the inventory tab, fill in armor values for B/E/P/F and check locations covered. Check them as "worn/carried (C)" and total armor values are shown on the character tab. (new in V2)
* Easily drop weapons and reduce inventory load (and encumbrance) on the fly (new in V2)
* Auto calculate initiave and effective horse riding skill automatically for the horse included in the (optional) horse section, when "Mounted" (checkbox) (new in V2)

V2 changes & migration from older sheets
=======
In addition to the features above marked with "New in V2" the styling has been adjusted to be more in line with the Harn paper sheet. The layout is now done via CSS grid for easier and better alignment. 

A migration script is included to perform the necessary changes when coming from an old sheet. Old armor cannot be migrated automatically, as previously all armor layers were stored in field per location. Old armor information can be found in the Inventory tab. Please:
- move this information to the need armor section in the inventory tab, per armor item. 
- Mark which items are carried/worn ("c" column)
- Total weight and armor protection values for all layers per location is then calculated automatically.
- Note down your armor before switching sheets, it will need to be input again on the new sheet (you'll also need the armor locations from the rulebook)
- This is a one-time excercise for each character.

Also please verify the settings on the Settings tab 

Your weapons will be on the Inventory Tab after migration. Mark the "C" checkbox to select which weapons you're carrying and thus show up on the Character Tab .

NOTE
====

This is **NOT** a character generator.  Due to limits in logic it does not calculate SBs.


CREDITS
===========

This sheet based of the original HarnMaster3 sheet by wing-it (https://github.com/wing-it) . In addition to adding new features I've also included our houserules that can be opted in to via the settings tab.



