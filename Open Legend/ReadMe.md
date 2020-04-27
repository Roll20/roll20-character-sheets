# Open Legends RPG Basic Charactersheet by Great Moustache
## www.openlegendrpg.com

## Tell YOUR story

### Changelog
### 1.9.9 on 2019 August 19th
* Worker Scripts for Boon Actions
	- Rare error when certain fields updated, did not reflect correctly for Roll Output to chat for boons
	- Added commands to run Function that assigns Boon values to output
* Target Selection for Attack added
	- Drop down menu added "Attack (Defend Interrupt)" as an option for a targeted Defense
### 1.9.8c on 2019 April 12th
* Folder Rename
	- Changing folder name in Roll20 github from "Open Legend Basic by Great Moustache" to "Open Legend"
	- When I was a young pup in the game, didn't realize should have named folders better
* Image Updates 2
	- Updated all remaining links in preperation for Folder rename
### 1.9.8b on 2019 April 6th
* Image Updates
	- Updated all link references to Roll20 Github
	- Uploaded Open Legend Logo and background images for v2 of the sheet
	
### 1.9.8a on 2018 July 6th
* Quick Fix of layout due to Roll20 Char-o-mancer update changing default padding/spacing for all charactersheets across the site
	- Next update should be v2.0 of sheet with improved layout and borders (might be awhile)

### 1.9.8 on 2018 May 31st
* Default Advantage for NPCs on Primary attribute 1 & 3 fixed
	- Was the same attribute name, fixed so each seperate
* Legendary Item display on a new sheet creation by default fixed
	- Toggled it to "hide" instead of "show"

### 1.9.7 on 2018 May 27th
* Made NPC initiative rolls go to the tracker
	- Oops, not sure how I let that slip through

### 1.9.6 on 2018 May 14th
* Resist Rolls Updated
	- Made Resist Roll buttons next to Speed (to match what was on NPC section)
	- Updated look of Speed section on character sheet

### 1.9.5 on 2018 May 13th
* Sheet Type Selection added (and lots of backend coding)
	- Pick between: Primary Character, NPC/Summons, Alternate Form Tier 1 or 2, Companion Tier 1, 2, or 3
	- Changes the calculations for Attribute Points & Feat points based on what is selected
	- Adds some entry fields were applicable (Companion Tier 3 Feat Points Granted)
	- For NPC, shows a completely different sheet for "Quick" build (useful for summons as well)

### 1.9.3 on 2018 May 10th
* Fix for "Other Actions" section & Effects
	- On Load function for Other Actions wasn't doing the Power Levels Correctly
	- Forgot to make Effects dice explode (all dice in OL explode!!)

### 1.9.2 on 2018 May 8th
* Added Whisper to GM option
	- Global button to make any roll on the sheet go to the GM only
	- Public to send to public

### 1.9.1 on 2018 May 8th
* Made Background Tab for the sheet
	- Moved Character Info & Beliefs, Goals, Instincts Sections
	- Added more data fields for the Character Info section
* GUI Display at Top
	- Added what type of sheet it is for future updates
	- Moved OL logo up and smaller along with version
	- Hidden groundwork for a tab button for whispering rolls to the GM

### 1.9.0 on 2018 May 7th
* Massive update to Favored & Other Actions sections
	- Select if action is an Attack (Damaging or Bane), Boon, or Effect
	- Effect isn't quite fully functional yet in that there is a pop-up that doesn't do anything, but will still roll the dice you choose
* Backgrounds for the borders updated
	- Also white background for things sent to chat
* Prep work for NPC/Alt Form/Companion tabs
	- Nothing functioning on the user side yet
* Options Tab added
	- Just information for now, functionality added in next update
* Note added to Effects in Actions to clarify what it is and about the pop-up

### 1.8.9.99 on 2018 April 8th
* Preview and testing of alternate borders
	- Will be implemented further in the next release

### 1.8.9.98a on 2018 March 10th
* Fixed Speed Calculations if Mighty is 0
    - Was halving speed even if no heavy items

### 1.8.9.98 on 2018 March 4th
* Fixed a new character sheet not auto calculating Feat & Attribute Point Totals
* Fixed Speed changes based on Max Heavy amount
	- Based on Might Score
* Fixed Speed not calculating when you entered amounts from Feats
* Changed GUI for Actions, Inventory, etc to be Gray lines instead of Teal

### 1.8.9.97a on 2018 January 28th
* Finished improvements to GUI with the Non-essential Notes section.

### 1.8.9.97 on 2018 January 28th
* GUI improvements on layout
	- Inventory made into nicer section that can be expanded
	- Legendary Items through Inventory will expand across
	- Different symbol for Feats/Perks/Flaws/Inventory to expand
	- Output to Chat made to take up slightly less space w/ different background
* Other Inventory/Notes section not finished
	- Will be made to be like the inventory section
	- Might be updated before merge, maybe not

### 1.8.9.96 on 2018 January 21st
* XP Feat & Attribute Points calculate for 0
* Default (Dis)Adv updates for straight Attributes

### 1.8.9.95 on 2017 December 31st
* Removed the temporary warning that old inventory not moved over would be lost
* Completely removed the old inventory section

### 1.8.9.92 on 2017 December 4th
* 3 Inventory sections outputing wrong "name" to chat.

### 1.8.9.91 on 2017 November 27th
* Inventory, Notes, Goals, Beliefs, & Instincts can now be sent to chat
* Inventory Area Re-worked


### 1.8.9.9 on 2017 November 18th
* Fixed Default (Dis)Advantage not always popping up correctly
* Updated Attribute description text
* GUI update to chat window rolls
	- Rolled Value much larger
	- Power Level display changed
		- No shows you the Achieved Power Level based on your roll
		- Shows the Min Needed to Succeed as well as the Max Allowed (based on what is entered in Actions)
	- Increased the Description areas to display a max of 7 lines (mouse scroll wheels jump 6-7 lines at a time)

### 1.8.9.6 on 2017 October 16th
* Fixed HP/Lethal Damage having odd error that locks up HP calculations on sheet
* Outputs to chat show Attribute Score next to the Attribute now
* Attributes can have a max value of 10
	- Before only 9 has that is the highest a PC can have (changable through "dice modifer")
	- Changed it to 10 so NPC charactersheets can have this value and to make it possibly easier for players

### 1.8.9.5 on 2017 September 12th
* Default (dis)advantage number for Actions & Attributes
	- Can now enter a default (dis)advantage amount for all action & attributes
	- The pop-up to ask you the number of (dis)advantage will be populated with this number now
		- This allows you to still modify it if you have additional above or below your default

### 1.8.9.3 on 2017 September 11th
* GUI update to HP & Speed
	- Lethal Damage combined with Current & Max HP lines
	- Speed made with ribbon, and taking up less space
	- Initiative made a seperate button
* Initiative Advanced Options
	- Drop down to pick which Attribute to use (from attribute Sub, etc)
	- Ability to enter a default (dis)advantage number
	
### 1.8.9.1 on 2017 September 11th
* Made Destructive Trance Checkbox for Actions, Other Actiosn, and Legendary Items
	- Allows explosions on 1 less than max die size

### 1.8.9 on 2017 August 14th
* Made the 2 columns into just 1 column for Feats, Perks, & Flaws
	- Code that auto combines the two columns into 1 new so no data lost
* Added captialization to certain attribute names
	- Causes them to show at the top of the list for selecting the bubbles for tokens
	- Built in redundency, so new Characters will see a few doubles that have "4Token" on the end, as old sheets will still be lower case

### 1.8.8 on 2017 July 2nd
* Fixed a typo in the Initiative output to chat (when clicking on Speed)
* Made any Description output to the chat window from Actions be limited to 5 lines
	- If over 5 lines, adds a scroll bar, so now it won't take up so much space when someone has lots of description/info
* Added in text below "Guard", "Toughness", and "Resolve" that indicates you can click them to do resist rolls
* Also renamed "power level" variable that was causing error if you dragged an action to the quick bar that wouldn't display the "Max" power level info.

### 1.8.6 on 2017 May 14th
* Fixed an error with other actions variable not being updated on its name
	- Caused it to not calculate roll syntax correctly when a value was updated in other actions

### 1.8.5 on 2017 May 6th
* Fixed an error that caused actions to not roll because of 'undefined'
	- Caused by previous fix to Advantage/Disadvantage to the d20 in 1.8.0
* Added support for modifying the "Level" to calculate XP, Feat Points, and Attribute Points
	- Previously it was only if you modified XP, now works for both
* If value higher than 9 or lower than 0 is entered for Attribute, changes it to 0 or 9 as needed
	- Shouldn't be able to have values higher or lower than these
	- If value of 10 needed for dice size, can be done via input field within attribute settings "Attribute Dice Bonus/Penalty

### 1.8.0 on 2017 April 24th
* Added in Extraordinary/Legendary Item section
* Fixed an issue where Advantage/Disadvantage to the d20 wasn't working

### 1.7.91 on 2017 March 25th
* Re-arranged the attributes to match the website order

### 1.7.9 on 2017 March 10th
* Added Goals, Beliefs, and Instincts section for characters to record each that might help them in roleplaying their characters better.
* Added a "non-essential" inventory and notes section.
	- Players could potentially use this to add homebrew material for record keeping.

### 1.7.8.5 on 2017 February 27th
* Took out Sanity Points as this was not Core Rules.
	- Just committed out, so can access it via custom sheets
* Took out Attribute dice calculation for Attribute 11, highest meant to be 10.

### 1.7.8 on 2017 February 20th
* Added for future compatibility: Attributes able to go to level 11 with new dice
	- This is mainly for Artifacts to be released soon
* Added more sections to the sheet that can be soon or hidden:
	- Goals & Beliefs [in progress]
	- Sanity Points [complete]
	- Other Inventory & Notes [in progress]
	- Currently all three can be displayed, but nothing for the "in progress" ones but a place holder

### 1.7.7.9 on 2017 February 19th
* Fixed a missing call to output the Max power level for Other Actions

### 1.7.7.5 on 2017 February 6th
* Added "Size" field to character information.

### 1.7.7 on 2017 January 27th
* Added Attribute Substitution for all Attributes
	- Fixed drop downs to have ALL attributes except for the current attribute being looked at
* Updated all function calls to account for 1.7.6
	- Including calculations to display prorperly if attribute subsitution was being used

### 1.7.6 on 2017 January 24th
* Added new universal function for determining attribute substitution values
	- Reusable code so less lines of code
* Updated drop down menus to reflect change of Evasion > Guard
* Renames lines "Increase/Decrease Dice Size" to be "Attribute Dice Bonus/Penalty"

### 1.7.5 on 2017 January 4th
* Updated for new calculation of evasion, and evasion's name changed to Guard
	- Guard = 10 + Agility + Might + Armor + Other

### 1.7.4 on 2016 December 29th
* Fixed an error in Workerscripts where it was unable to calculate b/c of a void value.
	- Only happened on pre-existing Actions, newly created ones would work fine.
* Added Power Level Min & Max to Other actions.

### 1.7.3 on 2016 December 23rd
* Added an option under "Favored Actions" and "Other Actions" to allow modification of dice size for rolling
	- This is mainly for the "Martial Focus" feat, or anyothers that may come along (maybe even items).

### 1.7.2 ON 2016 December 23rd
* Changed refrences from Supernatural to Extraordinary where applicable

### 1.7.1 on 2016 December 15th
* Modified power level to have a min and max value to input
	- Success message in chat output based on min value, but tells you for both.
* Mozilla Firefox UI issues should now be resolved.

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