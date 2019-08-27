# Runequest Glorantha Character Sheet

At the top of each version of the sheet is a settings cog if this is clicked there are check  boxes to select which version of the sheet to display.  This will allow for selection of the sheet displayed if for some reason this settings in the Game Details fails.

## If you have a pre-existing Quick Start character from before the full sheet was added the only things that will transfer are characterisitcs.
~~## If you open the full release version of the sheet you must allow it to finish adding skills before you close it.  If you do not the skills will be added again.~~

## If the default in game settings is set to a QS sheet and  you then change it to a full sheet in the configuration you will have to close the sheet and open it again for the skills to be added.


## Quick Start

This is for the Qucik Start only the category modifiers are not calculated and is intended only for one shots to demo the new system

One thing to note is the way the damage per location works.  Instead of just knocking  points down as damage is taken there is a damage box so you can put in wounds as they are taken so that you can apply first aid separately.  So if you take a 2 wound and then a 4 point the damage box  should look like 2+4. Make sure there is no trailing + signs, so don't have it look like 3+5+ .  There is a separate box in the hit point section for damage to total hit points such as bleeding and poison. 

Make sure the STR and DEX minimums are entered for weapons as you could end up with large penalties to attack if you do not.

In the animals section make sure you include the damage bonus for the animals 1d6+3d6.  A default bonus is calculated in the stats section but the damage bonus can vary depening on the weapon.  It could be full no damage bonus/full damage bonus/half damge or even just damage bonus.

Make sure you put the full mp cost for a variable spell in the mp column so that Free INT can be calculated.
 
## Full Release

One thing to note is the way the damage per location works.  Instead of just knocking  points down as damage is taken there is a damage box so you can put in wounds as they are taken so that you can apply first aid separately.  So if you take a 2 wound and then a 4 point the damage box  should look like 2+4. Make sure there is no trailing + signs, so don't have it look like 3+5+ .  There is a separate box in the hit point section for damage to total hit points such as bleeding and poison. 

Click on a rune to make a roll for that rune.

In the weapon section * indicates to use the mounts damage bonus and not the players

Default in the weapon section indicates that you are using a skill from the same category e.g. using Broadsword skill with a short sword.  It will halve the skill as per the rules.

To remove the experience checkbox from a skill add a - at the start of the name e.g. -Animal Lore. To add the experience checkbox  add a + to the start of a skill name e.g. +Animal Lore

STR and DEX minimums are not currently supported this maybe added in a future release.




## 17.07.2019
	fixed bug adding more than 1 magic point storag item. Another mp storage section was added. New characters created will only show the new section.  Existing characters will have red notice for the user to copy item and direct them to a configuration section to hide the old section.
	
	fixed bug in Coordination spell
	
	Added support for Mobilty spell
	
	fix.  2nd mount/alley displaying 1st mount/ally name in roll templates
	

## 22.04.2019
	Fix Move Quietly modifiers were being totalled now takes the highest.
	
	Tided up the Experience Roll button beside the category modifier, it now uses a Roll template and asks for a skill value to compare it against.

	

## 08.04.2019 Version 

	fix SR for default natural weapons should be 4 not 3
	
	fix some users reporting  issues with power rune labels. Replaced graphics for power runes
	
	fix enc modifier not applied to stealth
	
	Added Move Quietly modifiers to equipment 
	
	Added macro code to roll with modifiers on Honor button.
	
	Added support for Coordination spell
	
	Added support to add turn order entries based on missile weapon strike ranks.
	
	Added support for Coordination spell
	
	
	
	

## Version 04.03.2019

Tweaked CSS so skill names can be read when modifying repeating sections

Added fields for coinage on the 2nd tab.  Currently this does not effect encumbrance.

I added a bunch of new hit locations including all the location tables  at the start of the bestiary. 

Added fields for individual weapons skill modifiers or occasions such as Bladesharp cast.



I also added checkboxes with the heading Spells Cast for Vigor, Strength  and Glamour they handle all the fudges listed under the spells,such as skill category  increases, damage die steps and max enc.So don't add the stat bonuses in the mod fields of the characteristics.The bonuses are automatically added to stat rolls. A message appears under the stats  reminding you to add the bonus when doing resistance table rolls.  There is probably better way of doing this but it would mean changing a lot of sheetworkers and/or adding a whole new column of mod fields


## Version 17.03.2019
Fix for issue of browser cursor not detecting add control for equipment.  Reduced the width of the repeating section in case columns where overlapping.

Changed the way version number was displayed .A attribute was removed but it will not effect the end user. 

Changed the path for button images and roll templates images to point to images in Roll20 repository.	



## Version 19.11.2018

Disguise starting skill changed to 05

The Spirit Lore starting skill changed to 00

Peacefull Cut changed to Peaceful Cut

Customs (local)  tickbox removed 


Added the ability to add more weapons to the npc sheet


## Version 15.10.2018
 Fixed issues with NPC sheet
 
 Added Sprul-Pa Hit locations



## Version 02.10.2018

Fixed experience boxes removed for sheets added before 18.09.2018 update.
     
## Version 18.09.2018

Add the ability to add or remove the experience checkbox

Added an NPC sheet  accessible from the configuration on the first tab of each sheet version. 

## Version 06.09.2018
 Fixed issues with category modifiers over 20.

## Version 24.07.2018

Fixed typos

Added Charisma to Otherworld creatures.

## Version 10.07.2018

Prevented skill duplication on the full sheet

Added buttonto add strike rankto turn order

Completed fumble calculation fixes

Add Tab for family and holding information


## Version 02.07.2018
Fixes to  skill roll and melee templates because of site changes to css

Fixed no damage shown if exact skill is rolled.

Fixed crush damage on special

Removed border highlighting on damage

Fixed some of the fumble calculations (characteristc rolls and weapons).

