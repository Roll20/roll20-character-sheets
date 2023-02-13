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


## 25.10.2021

	Fixed Strike issues with DEX 19+.  DEX will have to be changed for this to be triggered.
	Added headers to Parry & Attack Rolls
	Added delimiters to clarigy the start and end of attacks and parries.

## 06.10.2021

	To account for damage reduction in the attack results tables
	Added display of special damage and normal damage to critical attack results
	Added display of normal damage to critical attack results

## 23.08.2021

	Added inputs for final attack and parry values
	
	Added input for magical damage bonus

	Added support for minimum chance of  success of 5%

	Increased the size of the modifier inputs in the weapons to allow for calculations instead of fixed value e.g. 10-25 as possible clarification for reducing skills to 100 for opposed rolls.  
	
	Added Other Notes section  



## 09.08.2021

	Added missing translation tags 

	Added missing weapon types for datalists

	Added spirit combat and spirit combat damage for npcs.

	Added magic tab with expanded areas for spells including a new area to include a description  of spell effects and turn order buttons

	Added self to range options for spells
	
	Added Spcl  (Special) to duration

	Added parry button and parry modifiers to cover different modifiers for attack and parry

	Added support for penalties for multiple parry and dodges. The modifier should be reset at the start of each turn.

	Added resistance button for characteristics.  POW resistance button is repeated in the magic tab

	Fixed Magic skills with base of 0 and 0 experience should have a skill total of 0 no matter the category bonus.

	Changed spell characteristic defaults for new spells.   


## 14.7.2021


	Added draggable button support
	
	Added roll template for spirit combat damage
	
	Added roll template for turn order
	
	Support for critical and special damage for Allies and Otherworld Creatures
	
	Added translation for labels in skill roll template
	
	Fixed issue with damage for Otherworld creature 1
	
	Fixed formatting issue with fumble  87-89 in English translation file.

	NPC Sheet
	
	Added support for critical and special damage
	
	Flipped current and maximum hp and mp
	
	Fixed hit location selection
	
	QUICKSTART Sheet
	Added deprecation message 
	
	Translation 
	Changed fumble8 and fumble to reomve references to previous fumble.  This will translators to strange translation. 


## 06.06.2021 
       Added translation tags for buff spells and hit point labels
       Fixed issues with a number of translation tags.

## 31.05.2021
	Changes to sheet so that layout does not break when legacy sheet toggle is switched off
	
	HTML datalists added to provide a dropdown for weapons. Note that datalist do not behave as comboboxes the list limited based on the content of the input.
	
	Fixed. Hit Locations table 1-4 should be the right leg but is the left, 5-8 should be the left leg but is the right
	
	Fixed Improvement rolls which roll exactly the threshold to increase. 
	
	Removed yellow box around roll results for improvement rolls
	
	The skill value for a weapon skill name that does not exist or is spelt incorrectly will be set to 0
	
	Added ability to translate rune affinity labels
	
	Fixed wrapping of attribute text labels on Firefox
	
	Fixed issues with buff spells
	
	Fixed fumble breakpoints for Honor, Passions and Spirit Combat
	
	Added Ritual to spell duration for Spirit Magic.
	
	Fixed 2nd Button under Spirit Magic to behave correctly.
	
	Added Cast label to clarify buttons under Spirit Magic.
	
	Fixed criticals < 10%
	
	Added input for bonuses to spirit combat damage
	
	Changed critical crush  damage from full weapon damage + max damage bonus + rolled damage bonus to weapon damage + max damage bonus + max damage bonus
	


## 14.12.2019
	Mobility and Coordination now reducing SR for Melee Weapons

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
