Based on the "Numenera" character sheet already on Roll20 (thanks to the original author(s)), this one has different layout and attributes, and it may be used with API scripts (see below).
Scroll down to the end of this Readme for the Release Notes.

Note: there's a french version of the very same sheet/macros/scripts, for those interested.
Follow [this link](https://github.com/Roll20/roll20-character-sheets/tree/master/Numenera_NathasNumenera_French).

# Current version:
Version 4.8 (October 10th, 2015) : [Screenshot](NathasNumenera_tabs_v4-5.jpg).

# Basic use:

## How to set up the character sheet
1. Go the _"Details"_ page of your campaign
2. Click on _"Campaign Settings"_
3. Scroll down to _"Character Sheet Template"_
4. Choose _"Numenera (tabbed)"_ under _"Cypher System"_
5. Scroll down and click _"Save Changes"_

## How to set up a character and its token
1. Create a new _"Character"_ in the _"Journal"_
2. Create/use a token for the character as in this [screenshot](NathasNumenera_setup_the_character_token.jpg):
  1. Make sure it representents the character you've created
  2. Assign _"bar1"_ to the _"might"_ attribute
  3. Assign _"bar2"_ to the _"speed"_ attribute
  4. Assign _"bar3"_ to the _"intellect"_ attribute
4. Select the token
5. Edit the character and click _"Use Selected token"_ as _"Default Token"_
6. Click _"Save Changes"_
7. Repeat steps 2 to 7 for every other characters and you're set.

# Advanced use (API scripts and macros):
1. Set up the API scripts:
  1. In the _"details"_ page of the campaign, click on _"API Scripts"_
  2. If you've already added scripts to this campaign, click on _"New Script"_
  3. Name the new script (ex : _"NathasNumenera"_)
  4. Copy the contents of this [Javascript file](https://github.com/Roll20/roll20-api-scripts/blob/master/Numenera_Natha/Numenera_Natha.js) to the big black empty area
  5. Click on _"Save Script"_
2. No need to create macros, all the red buttons on the sheet use the API functions.
3. If needed, to create you own macros or buttons, read the [Wiki page](https://wiki.roll20.net/Script:Numenera_Natha).

# Release Notes

## Release 4.8 (October 10th, 2015)
The API script must be updated in version 4.8.

* By popular demand, the basic (non API) stat/skill roll template has been unified and only rolls one d20 dice (for the 3D dice users out there), whatever is the "Difficulty" roll parameter from the "Action" section. If the difficulty parameter has been set to 0, the beaten difficulty is no longer calculated (due to Roll20 limitations), but the raw d20 dice is shown, as the special natural rolls (1 or 17+), and the steps modifiying the difficulty are displayed (and summed).
* New (small) API button to reset Action parameters

## Release 4.7 (September 2015)
Note that the [API script](https://github.com/Roll20/roll20-api-scripts/blob/master/Numenera_Natha/Numenera_Natha.js) needs to be updated to use the red buttons!

Default values are now correctly set through the sheet or API so that every roll (with or without API/red or green buttons) can be used immediately after character creation.

Roll templates have been clarified a bit and should look almost the same between basic and API rolls/buttons (+ API button for stat costs updates in the basic roll template).

## Release 4.6 (August 2015)
Enhanced basic roll templates (without using the API) to show Success of Failure.

## Release 4.5 (June 2015)
Special Damage added. API script updated accordingly.

## Release 4.4 (June 2015)
Skill level and Assets added to the Initiative roll parameters. API script updated accordingly.

## Release 4.3 (May 2015)
Skill level added to the roll parameters. API script updated accordingly.
"Tiers" corrected to "Tier".

## Release 4.2 (April 2015)
Bug correction on NPC base difficulty display.

Slight layout corrections.

## Release 4.1 (April 2015)
New "Asset" attribute as stat roll parameter, used by both the API rolls (v4.2+) and the integrated standard rolls.

NOTE: by popular demand (of one user, Hi marturin!) the version 4.2+ of the API functions now integrates a new chat command to make stat roll with macros, a selected token and asking all the necessary parameters: !nathanum-macroroll.

## Release 4.0 (March 2015)
*No more need for macros! But templates added! And a new NPC tab on the sheet!*

The sheet now integrate all the buttons for most of the necessary rolls, and display results in the chat using the new Roll20 _templates_.

The rolls necessary adjustments are included as new attributes on the sheet (no need for macros asking questions).

Green buttons : free rolls with no API calls, usable by every Roll20 account types (mentors or not).

Red buttons : rolls using the API functions, automatically updating the stat Pools current value, damage track and token markers.

The other (and main) attributes are the same as in the previous version of the sheet, so your campaign can be updated without intervention on existing characters (backward compatibility).

## Release 3.0 (11/04/2014)
*New tabbed character sheet*, with improved readability, over three tabs : Main (stats, attacks, skills, special abilities), Numen&eacute;ra & Equipment, Advancements & Background.
The attributes are the same (so are the macros and API functions), so you can update your campaign with the new sheet (HTML and CSS) and existing character(s).

## Release 2.7 (09/22/2014)
No change to the character sheet.
Enhanced Readme.md.
Updates to the API functions and macros  :
1. New function/macro to apply damage to NPC (the Character must have these attributes: "Health" and "Armor")
2. Update to the stats rolls (function and macros) : now they handle damage effort and the chat output has been corrected.

## Release 2.1 (07/29/2014)
1. Updated **NathasNumenera_Roll20_CharacterSheet_Layout.htm**
  1. More detailed "Advancement" section, with one field/attribute per advancement per tier
  2. After updating the layout in campaigns with existing characters, you can delete the prospective old advancement attributes like "xp-edge", "xp-stat"... (don't delete the "xp" attribute though!)
2. Updated **NathasNumenera_Roll20_API.js** : the numeneroll function had a residual french word or two in the resulting chat text (on an automatic success)
3. More detailed "Readme.md" with better layout
4. New screenshot/image
5. Updated sheet.json with the new screenshot
6. Replaced the txt macros file for a better layout ("NathasNumenera_Roll20_Macros.md")
