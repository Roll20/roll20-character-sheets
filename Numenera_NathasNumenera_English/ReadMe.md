Based on the "Numenera" character sheet already on Roll20 (thanks to the original author(s)), this one has slightly different attribues, and may be used with API scripts and macros (see below).
Scroll down to the end of this Readme for the Release Notes.

Note: there's a french version of the very same sheet/macros/scripts, for those interested.
See [Numenera_NathasNumenera_French](https://github.com/Roll20/roll20-character-sheets/tree/master/Numenera_NathasNumenera_French).

# Basic use:

## How to set up the character sheet
1. Go the _"Details"_ page of your campaign
2. Click on _"Campaign Settings"_
3. Scroll down to _"Character Sheet Template"_
4. Choose _"Custom"_
5. In the _"HTML Layout"_ tab, paste the contents of the _"NathasNumenera_Roll20_CharacterSheet_Layout_French.htm"_ file
6. In the _"CSS Styling"_ tab, paste the contents of the _"NathasNumenera_Roll20_CharacterSheet_CSS.css"_ file
7. Scroll down and click _"Save Changes"_

## How to set up a character and its token
1. Start your campaign
2. Create a new _"Character"_ in the _"Journal"_
3. Fill at least the character's name and the 3 Stats (current and max value) : Might, Speed and Intellect
4. Create/use a token for the character (see _"NathasNumenera_setup_the_character_token.jpg"_)
  1. Make sure it representents the character you've created
  2. Assign _"bar1"_ to the _"might"_ attribute
  3. Assign _"bar2"_ to the _"speed"_ attribute
  4. Assign _"bar3"_ to the _"intellect"_ attribute
5. Select the token
6. Edit the character and click _"Use Selected token"_ as _"Default Token"_
7. Click _"Save Changes"_
8. Repeat steps 2 to 7 for every other characters and you're set.

# Advanced use (API scripts and macros):
1. Set up the character sheet layout (HTML and CSS) as explained above
2. Set up the API scripts
  1. In the _"details"_ page of the campagn, click on _"API Scripts"_
  2. If you've already added scripts to this campaign, click on _"New Script"_
  3. Name the new script (ex : _"NathasNumenera"_)
  4. Copy the contents of the _"NathasNumenera_Roll20_API.js"_ file to the big black empty area
  5. Click on _"Save Script"_
3. Start the campaign and create the macros (see the _"NathasNumenera_Roll20_Macros.txt"_ file)
4. Create a character and its token (as explained above)
5. **FILL THE CHARACTER SHEET** (that's important) : at least Current and Max values of the 3 Stats, the Edges (even if it's zero), the Recovery roll bonus (even if it's zero), the Armor Speed Reduction (even if it's zero), the Recovery roll Track (click "1 Action") and Damage Track (click "Hale")
6. Select the token and try a macro. If nothing happens in the chat, check the character sheet (have you filled of the required fields ?), and try disabling and re-enabling the API script, then try the macro again. If it's still not working, check the API script console output message and send me the possible error message.
7. Repeat steps 4 to 6 for every other characters and you're set. 

# Release Notes

## Release 2.01 (07/29/2014)
1. Updated **NathasNumenera_Roll20_CharacterSheet_Layout.htm**
  1. More detailed "Advancement" section, with one field/attribute per advancement per tier
  2. After updating the layout in campaigns with existing characters, you can delete the prospective old advancement attributes like "xp-edge", "xp-stat"... (don't delete the "xp" attribute though !)
2. Updated **NathasNumenera_Roll20_API.js** : the numeneroll function had a residual french word or two in the resulting chat text (on an atuomatic success)
3. More detailed "Readme.md" with better layout 
4. New screenshot/image
5. Updated sheet.json with the new screenshot
