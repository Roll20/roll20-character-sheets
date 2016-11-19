# Open Legends RPG Basic Charactersheet by Great Moustache
## www.openlegendrpg.com

## Tell YOUR story

### Changelog

### 1.1.0
* Fixed CSS to look correctly in Mozilla Firefox
* Added fields under Hit Points
	- From Feats & From Others so you can increase your total Hit Points
* Added an example area (place holder) that can be shown/hidden beneath Prescience Attribute
	- For further development to include changes that feats may have to Attribute Scores/Dice and Other
		--Place holder for now, will be expanded upon for each Attribute

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
* Make Action rolls calculate their own string for Rolls
	+Have a spot for advantage/disadvantage that is permanent to that action roll
* Make a settings section for each Attribute
	+ For the physical: drop down menu for attribute subsitution
	+ For might, checkbox on whether attribute subsitution affects heavy carry
	+ For all, an option to increase or decrease dice size above/below what the attribute score would normally allow
	+ Option to Keep Highest/Lowest of d20 (based on certain feats)
[done 2016 Nov 19] * Have fields for adjusting the Hit Point total for feats and other
	[done 2016 Nov 19] + Have "Fortitude, Presence, & Will" listed below Hit Points so people know which attributes affect Hit Points
[done]* Make Inventory Section
[done]* Include more fields for Feats, Perks, & Flaws
	[done]+ Plus ability to click to roll them so all can see info about
[done]* Include Inventory into speed (how it affects)
[done]* Creation of a "fancy (advanced)" version of the sheet
	+ More optimization for web (and potentially mobile)
	+ Sections that disappear with a click
* A settings section where you could modify certain values
	+ For "homebrew" and if changes come up before final release of product
* A rolltemplete that isn't using the default
	+ Adding in a pop-up for target CR to caculate and do the math if you hit & damage
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