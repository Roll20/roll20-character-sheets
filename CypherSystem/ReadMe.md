Character sheet, with integrated rolls and optional API script, for the Cypher System, from [Monte Cook Games](http://www.montecookgames.com/games/).

# Current version:
Version 1.0 (September 2015) : [Screenshot](CypherSystem.png).

# Basic use:

## How to set up the character sheet
1. Go the _"Details"_ page of your campaign
2. Click on _"Campaign Settings"_
3. Scroll down to _"Character Sheet Template"_
4. Choose _"Cypher System"_ under _"Cypher System"_
5. Scroll down and click _"Save Changes"_

## How to set up a character and its token
1. Create a new _"Character"_ in the _"Journal"_
2. Fill at least (even if it's zero):
  1. Might, Speed and Intellect (current, max and edge) and Effort.
  2. Before using the Roll buttons: Difficulty, Cost, Effort (both) and Bonus.
  3. Before using the Recovery button: Recovery bonus.
3. (Optionally) Create/use a token for the character as in this [screenshot](CypherSystem_setup_the_character_token.jpg):
  1. Make sure it representents the character you've created
  2. Assign _"bar1"_ to the _"might"_ attribute
  3. Assign _"bar2"_ to the _"speed"_ attribute
  4. Assign _"bar3"_ to the _"intellect"_ attribute
4. Select the token
5. Edit the character and click _"Use Selected token"_ as _"Default Token"_
6. Click _"Save Changes"_
7. Repeat steps 2 to 7 for every other characters and you're set.

# Advanced use (API scripts and macros):
Set up the API scripts:
1. In the _"details"_ page of the campaign, click on _"API Scripts"_
2. If you've already added scripts to this campaign, click on _"New Script"_
3. Name the new script (ex : _"CypherSystem"_)
4. Copy the contents of this [Javascript file](https://github.com/Roll20/roll20-api-scripts/blob/master/CypherSystemSheet/cyphersystemsheet.js) to the big black empty area
5. Click on _"Save Script"_


# Release Notes

##Release 1.0 (September 2015)
Creation of the sheet.
Big thanks to the beta testers: llothos, Darcy R., Clay and The Ghost DM!