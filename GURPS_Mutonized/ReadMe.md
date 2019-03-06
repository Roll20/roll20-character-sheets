character sheet for the Generic Universal Roleplaying System.
More information at : https://app.roll20.net/forum/post/902845/gurp-sheet-gurps-style-number-2

There is no CP calculation and most values need to put put by hand, this sheet is purely for actual play and focuses on:
- Proper formatting for macros to keep chat clean.
- Made with lots of options to allow for a good experience via Text Only roll20.
- Clean and to the point design. Things are organized in Tabs to avoid scrolling up and down, etc
- Useful for GMs as well via a GM only NPC Stat Black layout.

Otherwise, sheet is pretty much done and as far as I could tell, works perfectly fine.

CHANGELOG
05/16/2015:
- Fixed Load calculation to x2, x3, x6 and x10 as per rule.
- Fixed Dodge under Full Load display. I now use a new field calledd FullLoad as well as the old CurrLoad (combat one), which hopefully will allow the calculation.
- Fixed Combat MOVE calculation. I was using a penalty based on encumberance level rather than proper values from rules. The formula now goes like this for now: floor(@{Move}+(@{Move}*(@{CurrLoad} * 0.2)))
- Note:
	- Remember that this sheet only calculates some values but otherwise is just meant to ease the use of the system during play and NOT be a character auto generator. It will not calculate CPs used, MOVE, and other derived values. Usually, when you can manually input values, that means no calculation is made.

06/07/2014: MAJOR UPDATE
- Added a GM only NPC STAT BLOCK layout. This tab will not work properly for players since it uses many /emas and /as
The GMs can use it to quickly make monsters/npcs, and it contains only the most relevant information as well as tighly packed commands and whatnot. 
The variables from the PC and NPC tabs are the same, so you can edit either, and switch whenever.
- Included the Parry Active Defense into the melee weapon field-set. You can now set up your parry skill for each of your melee weapons entry.
- Added Languages and Cultural familiarities in the Various panel (thanks for Devindra P's sheet, I had totally forgotten about that)
- Added Status and Other reaction modifier fields and TL value for skills.
- Tooltip revamp. Should now always be visible (bottom right corner).
- First pass of cleanup for macros and variable names.
- Known Issues:
	- None but code needs cleanup though I don't know how much of an impact it has on performance

06/05/2014:
- Fixed 1/2 and 1/3 HP calculation so that it's based off Max HP instead of Current HP.
- Split the Attack macro into an Attack (A) and a Damage (D) macros.
- Added an input text field below the Maneuver Declaration button. This is meant to be used to specify what you actually do when choosing Maneuvers like Ready, Concentrate, Wait and Change Posture. For other Maneuvers, just leave it blank.
- Changed "location" in inventory to a text field for wider compatibility.
- Changed TABINDEX across the board so that it'll ignore buttons and macros. You can now press TAB for quick data input usually.
- Fixed a couple Wounding Modifiers errors in the Damage Taken Calculator (below Armor DR panel)
- Changed weapon "type" to use a select list instead of text for ease of use and consistant formatting.
- Re-organised and Added entries for many select lists to offer more options and clarity.
- Added custom emote prompt for Active Defenses, Attacks, Consumables and Spell macros. For each of these, there will be an auto-filled in Default value as well (so you can just accept it and it stills looks ok).
- Slight improvement in layout in many places.
- Added and updated many tooltips (should appear at the top right corner of the sheet usually.)
- Known Issues: 
	- If you scroll down, tooltips can go off-screen.
