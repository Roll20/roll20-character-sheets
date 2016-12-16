# Open Legends RPG Basic Charactersheet by Great Moustache
## www.openlegendrpg.com

## Tell YOUR story

### Changelog

### 1.7.1 on 2016 December 15th
* Modified power level to have a min and max value to input
	- Success message in chat output based on min value, but tells you for both.

### 1.7.0 on 2016 December 13th
* Added another actions section
	- Renamed Actions to "Favored Actions"
	- Created "Other Actions"
	- Allows players to better organize their actions, and with 1.6.8, hide so less cluttered
* Added checkbox within actions if you need to specify a power level to roll at (for boons)
	- Roll templete now will tell if you were Successful, or Failed to reach the power level

### 1.6.9 on 2016 December 12th
* Added a graphical change (blue highlight) to show which Physical Attribute is using substitution

### 1.6.8 on 2016 December 11th
* Added "check boxes" to show/hide different areas of the sheet
	- Allows players to only see the information they want at a given time

### 1.6.7 on 2016 December 10th
* Fixed a strange error where Presence would add 20 at a time to HP
	- Caused by fortitude substitution not be forced into an integer type
* Fixed Attribute Substitution not updating if the Primary Attribute is changed
	- Modified On Change to be function, and calling from calcAgility function as well
* Added an indicator at top left of sheet to display current version of the sheet
	- More functionality later with the gear to add changing of default values for the sheet

### 1.6.5 on 2016 December 1st
* Fixed Actions to recalculate the roll string when any attribute is changed
	- Prior, you had to make a change to the action for the roll string to update if an attribute had been changed.

### 1.6.2 on 2016 November 30th
* Quick Patch to fix a random mess up in Prescience Worker Script
	- Was not executing the call to update values.

### 1.6.1 on 2016 November 29th
* Added the ability to add roll buttons to macro quick bar
	- Actions can be dragged to the marcro quick bar
	- "Speed" aka Initiative can be dragged to macro quick bar
	- "Evasion", "Toughness", and/or "Resolve" aka Resist Bane can be dragged to macro quick bar (all are the same as each other)
	- Currently Attributes, Feats, Flaws, and Perks can NOT be added to the macro quick bar (nor are plans to implement at this time)

### 1.6.0 on 2016 November 28th
* Added graphics for the roll/chat window
	- Updated buttons for rolling to use the new template "openLegend"

### 1.5.1 on 2016 November 25th
* Changed the code for Toughness
	- Uncommented the relvent code, and deleted the old
	- Toughness = 10 + Forititude + Will (used to be presence)

### 1.5.0 on 2016 November 21st
* Added the character's name to be displayed on chat window on rolls
* Updated the Actions section to calculate the roll string like the attributes
	- Needed to seperate it from just reading Attribute roll, as Advantage/Disadvantage for d20 in non-combat situations
* Added additional calculations for the extra sections on Physical attributes
	- For all 3, drop down to select Attribute Substitution (Agility for Evasion, Fortitude for Toughness & Hit Points)
	- For might, a checkbox, checked means the Attribute Substitution applies to max heavy carry
* Updated Javascript to reflect attribute substitution possibilities
* Updated calculations to Speed to change to 0 for certain cases
	- If over max heavy carry
	- If over 2 bulky items
* NOTE: Players will have to reselect attributes to use for Actions do to the drop down menu being updated with different values.

### 1.4.0 on 2016 November 21st
* Added gear/settings tab next to all 18 attributes
	- Click expands further information about each attribute
	- Options to Increase/Decrease both the dice size and cost of the attribute due to feats
	- Option to give Advantage/Disadvantage to the d20 part of the attribute roll due to feats and possibly boons/banes
	- Further development needed for Physical Attributes to include an "Attribute Substitution" drop down menu, to be implimented next.
	
### 1.1.5 on 2016 November 20th
* Made "Evasion", "Toughness", & "Resolve" clickable buttons that roll d20 for resisting banes (after watching HyperRPG mini-series)
* Put in commented out code for possible change to Toughness calculation
	- Presence might bet switching to Will for Toughness

### 1.1.0 on 2016 November 19th
* Fixed CSS to look correctly in Mozilla Firefox
* Added fields under Hit Points
	- From Feats & From Others so you can increase your total Hit Points
* Added an example area (place holder) that can be shown/hidden beneath Prescience Attribute
	- For further development to include changes that feats may have to Attribute Scores/Dice and Other
		-Place holder for now, will be expanded upon for each Attribute

### 1.0.0
* SHEET READY for mass consumption
* Equipment section graphically fixed
* Small tweaks to size (pixel) of a few other areas
* Repositioning of Armor Penalty and Armor Training (changed to Feat) to be with Speed section
* Hid the values for Heavy & Bulky in relation to speed

### 0.9.0
* GUI update
	- Background images for all but inventory
	- Gear for settings to expand for more information in Actions, Feats, Perks, Flaws
	- Optional variations for inventory shown (options 2 & 3 do not calc for heavy/bulky, just for show)
	- pixel widths for 1/3 set to 275 (3 columns on sheet, total 825 pixel across design)
		+ Still needs minor fixes for full flowing when width adjusted down, but 1 step closer
* Auto calculation for Feat points spent

### 0.8.1
* Fixed reaching max Heavy items carried = 1/2 speed
	- Was suppose to be Might + 1, was only at Might that this triggered

### 0.8.0
* Rule update: Toughness changed to be Fortitude + Presence + 10 + Other
	- No longer uses armor or shield, added in Presence.
	- forceful attacks used to go after toughness, now all weapon attacks go after evasion.
* Made all cost fields for Attributes disabled to user changes
* Moved "legend points" to be next to "level" and "xp" at the top of the sheet
* Added "Lethal Damage" section where "legend points" used to be
	- Any changes to lethal damage auto subtract from "hit points" maximum
* Took away selection menu for "speed" and replaced with a "base speed" option
	- Speed is calculated using base speed, armor penalties and/or training, and the amount of heavy and bulky gear
* Made Armor and Shield slots next to Evasion and Toughness disabled to user changes, and read from armor and shield in equipment section
* Added "Equipment" section to sheet
	- 20 items used in Open Legend with checkmarks next to each if the item is bulky or heavy
	- Heavy Result & Bulky Result, showing new max speeds
		- base speed halved if # of heavy items = might score
		- base speed changed to 5' if 2 bulky items
* Added "Armor & Expanded Equipment" section to sheet
	- Armor and Shield section moved to here
		- Armor penalty in feet based on armor type
		- Armor training for feats that may reduce armor penalty
	- Repeating field section for any special items that may be gear packs, or ____ of holdings

### 0.5.6
* Updated calls to Attributes for updating the total Cost Spent
    - Found error in updating before the cost value was set, so it was displaying the previous Total instead of the current.

### 0.5.5
* Updated worker scripts to be more function based, and "onload" to run all calculations
    - To help with future changes, so sheets will update values
* Changed Roll buttons so the "value" field is figured out in Javascript
    - To help with the strange case of Attribute 0 with Advantage & Disadvantage

### 0.5.0
* Initial Release

### Plans & Info

## Plans
* Fix Top info section of sheet to compress when page is shrunk
* [done] Make Action rolls calculate their own string for Rolls
	+[no longer planned due to complexity of roll string] Have a spot for advantage/disadvantage that is permanent to that action roll
* [done] Make a settings section for each Attribute
	+ [done] For the physical: drop down menu for attribute subsitution
	+ [done] For might, checkbox on whether attribute subsitution affects heavy carry
	+ [done] For all, an option to increase or decrease dice size above/below what the attribute score would normally allow
	+ [done] Option to Keep Highest/Lowest of d20 (based on certain feats)
* [done 2016 Nov 19] Have fields for adjusting the Hit Point total for feats and other
	[done 2016 Nov 19] + Have "Fortitude, Presence, & Will" listed below Hit Points so people know which attributes affect Hit Points
* [done] Make Inventory Section
* [done] Include more fields for Feats, Perks, & Flaws
	+[done] Plus ability to click to roll them so all can see info about
* [done] Include Inventory into speed (how it affects)
* [done] Creation of a "fancy (advanced)" version of the sheet
	+ [done] More optimization for web (and potentially mobile)
	+ [done] Sections that disappear with a click
* A settings section where you could modify certain values
	+ For "homebrew" and if changes come up before final release of product
* [done] A rolltemplete that isn't using the default
	+ [in progress] Adding in a pop-up for target CR to caculate and do the math if you hit & damage
* Clean up the CSS code
	- Currently includes a lot from a previous sheet I was using, some code doesn't apply

## Info
* Javascript is employed to auto calculate nearly every field
	+ Dice are determined based on Attribute values
		- Needs to be fixed if values higher than 9 are entered
	+ Hit Points are auto calculated
	+ Total points spent on Attributes calculate
	+ Evasion, Toughness, & Resolve auot calculated
	+ Feat & Attribute points auto calculated based on XP
	+ Level determined based on XP
		- Needs to have something to indicate max value for Attributes based on level

* This basic version was designed to aesthetically look like the Charactersheet provided by Open Legends
	+ Certain design designed are done based on this, only planning to add a few things like inventory
	+ The Advanced version (in developement) will have more robust use to it
	+ Created this because notes indicate the Roll20 Charactersheet is in the "icebox" by developers at the moment.
		- If they put out one, may stop working on this and use theirs, or just focus on advanced version.