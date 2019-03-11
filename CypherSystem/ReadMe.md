Character sheet, with integrated rolls and optional API script, for the Cypher System, from [Monte Cook Games](http://www.montecookgames.com/games/).

It can look like and be used as a sheet for _Numen&eacute;ra_ (except the armor stat cost, as per the CSR rule) or _The Strange_ (except the armor stat cost thing also, and the recursion management which requires several characters/sheets, one per recursion).

# Current version:
Version 1.7 (September 17th, 2017).

* Screenshot [Generic Cypher System style](CypherSystem.png)
* Screenshot [Numenera style](CypherSystem_style_Numenera.png)
* Screenshot [The Strange style](CypherSystem_style_TheStrange.png)

# Basic use:

## How to set up the character sheet
1. Go the _"Details"_ page of your campaign
2. Click on _"Campaign Settings"_
3. Scroll down to _"Character Sheet Template"_
4. Choose _"Cypher System"_ under _"Cypher System"_
5. Scroll down and click _"Save Changes"_

## How to set up a character and its token
1. Create a new _"Character"_ in the _"Journal"_
2. Create/use a token for the character as in this [screenshot](CypherSystem_setup_the_character_token.jpg):
  1. Make sure it representents the character you've created
  2. Assign _"bar1"_ to the _"might"_ attribute
  3. Assign _"bar2"_ to the _"speed"_ attribute
  4. Assign _"bar3"_ to the _"intellect"_ attribute
3. Select the token
4. Edit the character and click _"Use Selected token"_ as _"Default Token"_
5. Click _"Save Changes"_
6. Repeat steps 1 to 7 for every other characters and you're set.

# Advanced use (API scripts and macros):
Set up the API script:

1. In the _"details"_ page of the campaign, click on _"API Scripts"_
2. If you've already added scripts to this campaign, click on _"New Script"_
3. Name the new script (ex : _"CypherSystem"_)
4. Copy the contents of this [Javascript file](https://github.com/Roll20/roll20-api-scripts/blob/master/CypherSystemSheet/cyphersystemsheet.js) to the big black empty area
5. Click on _"Save Script"_


# Release Notes

## Release 1.7 (September 17th, 2017)
Technical optimisation.

## Release 1.6 (February 21st, 2016)
Cosmetic changes, to ease access to the delete button on repeatable sections, and diminish repeatable sections line height.

## Release 1.5 (December 21st, 2015)

* New "Attacks" section (one per stat), with integrated rolls, taking in account skill level, costs, damage etc.
* Stat and skill rolls don't ask/use damage effort anymore (use the new attack sections/rolls instead)
* New options to simplify rolls: choose if rolls ask for/use assets, bonus and cost. Default is now not askink/using them.
* "Name" button to logo/info button
* Info button can be dragged to the macro bar
* Added info button to equipment and consummables
* Damage track taken in account for effort cost calculation

## Release 1.4 (November 21st, 2015)
[See detailed post on the Roll20 forum](https://app.roll20.net/forum/post/2357046/cypher-system-core-rule-book-sheet/?pageforid=2645489#post-2645489)

* New setting to choose the roll parameters type: via the Action section or Roll Queries
* New button to show Special Abilitie, Cyphers, or Artefacts details in the chat

## Release 1.3 (October 25th, 2015)

* Corrected roll with difficulty and inability: now compute the total difficulty
* Replace "Action" parameter inputs by drop-down lists, to ensure that Roll20 updates correctly the attributes
* Negative edge allowed (handicaps)
* Removed the word "target" from the HTML and template roll code to avoid confusion with the Roll20 keyword "Target", allowing to create custom macros

## Release 1.2 (October 4th, 2015)
The optional [API script](https://github.com/Roll20/roll20-api-scripts/blob/master/CypherSystemSheet/cyphersystemsheet.js) must be updated in version 1.2.

* It's now possible to change the style/look of the PC sheet (to the ones of the generic Cypher System,  Numen&eacute;ra or The Strange), or turn it into an NPC sheet.
* By popular demand, the stat/skill roll template has been unified and only rolls one d20 dice (for the 3D dice users out there), whatever is the "Difficulty" roll parameter from the "Action" section. If the difficulty parameter has been set to 0, the beaten difficulty is no longer calculated (due to Roll20 limitations), but the raw d20 dice is shown, as the special natural rolls (1 or 17+), and the steps modifiying the difficulty are displayed (and summed).
* New "Artifact" repeating section with integrated Depletion roll.
* Recovery roll template now shows a API button to update the sheet to the next recovery step

## Release 1.1 (September 2015)
Layout changes: larger stat pools and slightly smaller buttons.

Addition of 2 API buttons: reset Action parameters, and reset/complete rest of the character.
The optional [API script](https://github.com/Roll20/roll20-api-scripts/blob/master/CypherSystemSheet/1.2/cyphersystemsheet.js) must be updated.

## Release 1.0 (September 2015)
Creation of the sheet.
Big thanks to the beta testers: llothos, Darcy R., Clay and The Ghost DM!
