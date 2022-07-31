# Warlock! OSR Roll20 Character Sheet
Warlock! by [Fire Ruby Designs](https://firerubydesigns.co.uk/home)  
Credit to [RPG-Awesome](https://nagoshiashumari.github.io/Rpg-Awesome/) for the SVG icons

# Documentation

## 1. Settings
### Reactive Roll System:
This leverages some new Roll20 functionality to attempt to resolve combat without characters needing to dig through their sheet.  
When a player using Reactive Rolls clicks an attack, the roll template will display a button to defend the currently selected token. The defending player (or GM) will need to select the Token receiving the attack, then click on the "Defend Selected Token" button on the bottom of the roll template.  
The defending player must have a weapon "Readied" in their Weapon section on the sheet, by selected one via the checkbox to the left of the Attack button. These checkboxes will only be visible on sheets with Reactive Rolls switched on, and only one weapon may be Readied at a time.  
The defending character will then roll their defence. The roll will either use the Skill dictated by the Readied weapon, or Dodge if the attack was ranged or if the character has no Readied weapon.  

The roll system will caclculate the winner & further required steps from the defence roll - who wins the exchange, whether anyone takes damage, and whether further actions are required.  
The Spellcasting system also benefits from Reactive Rolls - after the Incantation check to cast the spell, the system will determine whether the spell has passed or failed, and whether a Wrath of the Otherworld check is required.  
A successful spellcast will also prompt to apply any Spell Effects to a target. This will apply any valid Effects listed in the spell details to the Active Effects section of character sheet for the _currently selected token_.  
_The Reactive system can be turned off in the Settings tab_ - this will remove the extra buttons on the roll templates.  
                    
### Unlocked Sheet:
Unlocking the sheet via the Settings tab will allow the community, career, skills & stamina to be manually entered. This will disable the automated tracking of skill maxima, career skill value and stamina increases from career skill increases. This allows a custom Career/Community to be entered.  
Item & Effect bonuses will still work, but most Skill-related functionality is disabled.


## 2. The Sheet
### Careers:
The sheet will automatically assign Skill Proficiencies & Maxima from the selected Career. Racial Careers are limited to their respective Communities. For a custom Career, the sheet will need to be Unlocked via settings, which will disable most of the functionality which follows.  
  **Retiring a Career:**
  Click the down arrow icon to retire the current Career. This will snapshot the current Active Career Skill and add it to your Career Skills section, along with adding the Career name to the Past Careers field.  
  Upon selecting a new Career, your Skill Proficiencies & Maxima will recalculate. Any increased skill which is no longer an active Career skill will have its Maximum recalculated to its current value (if that value is legal!). A small "Boosted" icon will appear on the Skill to indicate that it was raised by a Past Career - it can no longer be increased without triggering the angry red colour which indicates an illegal value, unless it later becomes an Active Skill again through a Career change. Although the official rules do not express the Skill Maxima in the same way (the Maximum for a skill is "0" if it is not an Active Career Skill), this doesn't translate so well to the calculations on the sheet.  
  Thus, on a Career change, the Maximum for a skill is calculated as (in order of priority):  
  	1. The Career Max - if this skill is a Proficiency for the newly selected Career  
	2. The current value of the skill - if the value is legal (i.e. equal to or below the current max)  
	3. The current maximum of the skill - if the current value is illegal  
	4. The value "4" as a baseline.  

### Undo Retire:
There is an undo button next to the Retire button if a mistake was made - however, if this is clicked at a later date after progressing through another career, it could lead to errors in Skill Maxima. The undo button is intended to be used immediately to correct a mistake - the Sheet does not track every progression change.  

### Advanced Career:
This button toggles the Career selection dropdowns to display Advanced (and only Advanced) Careers. To switch back to a Basic Career, just toggle the button again.  
                    
### Stamina & Luck:
Both base Stats have a D6 icon to the right when their max values are "0". These will roll a value to chat - click accept in the Roll Template to apply the value to the sheet. The buttons should then disappear.                          

### Stamina:
This is a slight departure from the official sheet, to account for the Item/Effect system. The Max value of Stamina is locked - to increase or decrease your base Stamina maximum, click the Unfold button in the top right of the section. This provides a second row which show how your Stamina Max is calculated.  
	- _Base_ (editable) - this is the value entered when you roll a Character and is the only source of Stamina for a new character. This is the value to change for a permanent increase (or decrease) in Stamina Maximum.  
	- _Career Leveling_ (locked) - this is calculated from your Career advancement - one Stamina point per increase of a Career Skill.  
	- _Item/Effect bonus_ (locked) - the total +Stamina you are receiving from Items, Spells or other Effects.  
	- **Rest**: the heart icon is a shortcut for a short rest or full rest, recovering 50% / 100% Stamina respectively.  
	
### Luck:
Luck functions similarly to Stamina above, except it does not have a Career Leveling increase. The value can be manually changed via the Base, or calculated changes via the Item/Effect system.  
	**Luck Roll**: the four-leaved clover icon will roll your luck, and subtract a luck point.  

### Background/Traits:
A short section to add some flavour to your character. Bear in mind that Roll20 does not allow other players to view sheets they don't have control of - if you want other characters to be able to see your Bio, use the Bio tab in the top-left of the frame.  
This section is best used as a quick summary for the benefit of the controlling player or GM.  

### Adventuring Skills:
This section is largely automated unless the sheet is Unlocked. Use the number input to level your Skills, and click the Skill name to roll.  
A _green flag on the left _indicates a current Career Skill proficiency.  
A _blue number to the right_ of the input indicates that an Item or Effect is currently modifying the Skill. If your Item Mods include dice rolls, the number quoted here is an average representation. For example, if you have two items boosting your Dodge skill by (+1d6) and (+5), the bonus displayed will be the average of 1d6 plus 5, or (+8.5). This is only for display purposes - the dice will be rolled as normal when a skill check is made.  
A _red input box & red Max value_ indicates you have exceeded the Max value for the Skill.  
A _green up arrow on the far right _indicates that a Skill was increased via a Past Career - this mostly provides feedback for the player or GM as to why a Skill Max might be higher for a Skill which is not active under the current Active Career.   

### Possessions:                  
Items can be added, removed & edited here. It's largely self-explanatory, except for the Item Mods system. This system can be used to create Items which provide actual Effects on a character and will be automatically applied to rolls.  
The following is a big section! It covers functionality which applies to Possessions, Weapons, Spells and Active Effects - all of these sections can apply bonuses to a character's other stats.  
    
## Item Mods System:
Item Mods are divided into four Categories. You can supply one or more Categories on an item, but the syntax is quite precise and must be followed for the mods to be picked up     by the sheet.  
A Mod Category *must* be supplied in the following format - do not forget the colon! If supplying more than one Category, they *must* be separated by a semi-colon.  

`category1: mod1, mod2, mod3; category2: mod4`  

The following four Categories are supported:  

### Weapon:
The weapon Category, if entered correctly, will create an entry in the Weapons section corresponding to the item. You can supply a base weapon type here (e.g. dagger) to have     the Weapon entry auto-populate with the base stats for that weapon.  
These can be modified in the Attack section later, but be aware that if you change the Item Mods field again, it may overwrite your changes in the Attack section!
Weapons can be entered directly into the Weapon section (this is simpler), but using the Possessions Item Mods section has a couple of advantages:  
1. The entries are linked - if you change the name of the Item, the Weapon Attack name will change. Deleting the Item from the Possessions section will remove the Weapon             Attack entry.  
2. The GM can create complicated items ahead of time - as no Compendium is available, this provides an easy way for the GM to quickly award a premade Weapon by pasting the           Item Mods text string into a new Item entry.  

The following mods are supported in the Weapon Category:  
- **base** - this will set the Weapon to one of the core damage bases in the game. See the "Damage Base" dropdown in the Weapon section (or the rules book!) for valid types. Providing a Base type will pre-fill the Attack Skill, Damage, Damage Type, Ranged and Threat categories. If a 'base' is provided, it will be processed *first*, so any other mods provided (like skill or damage) will overwrite the base values. For example: 'weapon: ranged 0, base bow' would create a weapon with all of the base stats of a Bow, but without the 'ranged' property.  
- **damage** - this provides a damage expression for the weapon. You can provide a core weapon type (e.g. 'dagger') or you can provide 'custom' followed by a roll expression e.g. 'custom 4d6 + 5'. The shorthand 'dmg' can be use instead of 'damage'.  
- **skill** - supply either an Adventure Skill (e.g. 'large blade') or 'custom' followed by a modifier.  
- **threat** - supply either 'casual' or 'martial' to change the Weapon's threat level. This is for RP purposes and doesn't affect any rolls. See the Rules for details on Casual vs. Martial types.  
- **ranged** - this setting flags whether the weapon is ranged or not. If 'ranged' is supplied as a mod, it will be processed as 'true', unless either '0' or 'false' are included. This affects Reactive Rolls - a ranged weapon will force a Dodge roll from the defender, while a non-ranged weapon will allow the defender to use a weapon to defend themselves.  
- **damagetype** - the damage type this weapon inflicts. Can be slashing/piercing/crushing/blast. This dictates the roll table used for Critcial Strike effects.  

#### Examples:
A giant, blunt, wooden sword which fires bullets from the end -  
`weapon: base 2h sword, skill blunt, ranged;`  
Knuckledusters which use the damage of a Pole Arm:  
`weapon: base pole arm, skill unarmed;`  

### Armour:
This Category covers Damage Reduction items, but not blocking items (e.g. Shield). There are only a few preset values: light, medium/modest and heavy. The Official designation for medium armour is 'modest', but I've included 'medium' as an alternative, as modest is less commonly used. These correspond to the Damage Reduction values in the core rules. You can also define your own roll expression instead: '2d4 + 5' or '5' or '-10' (cursed armour???).  
Also note the English spelling of 'armour' - I've used this for the sake of consistency with the Official rules. However, 'armor' will work in all cases on the character sheet, so don't stress about remembering the spelling if you're used to the US version.  	

### Examples:                               
Plate armour -  
`armour: heavy;`  
American leather armor with the codpiece missing -  
`armor: 1d3 - 1;`  

### Shield:
Shield items provide a bonus to defence for a defending character. They *do not* provide damage reduction - use the Armour Category for that. Shield items will always be included in the defence roll, unless they are unequipped - so, if your character is suprised, you will need to unequip the shield before you make your defence roll to stop the sheet from including it in the defence roll.  
Valid modifiers for a Shield item are: small, large, or a custom expression. A custom expression can be a number, or a die roll.  

#### Examples:
Large Shield -  
`shield: large;`  
Medium Shield -  
`shield: +4;`  

### Stats:
This Category covers almost everything else - you can boost skills, stamina, luck, luck rolls or provide global attack/damage modifiers. Legal values are: any skill in the Adventuring Skills (e.g. crossbow, dodge, appraise), stamina, luck (modifies luck_max), luckroll (provies a bonus to luck rolls without modifying luck points), attack, damage (these two are global - they will add a bonus to *all* attack and damage rolls).  

#### Examples:
Ring of Brute Force:  
`stats: brawling +5, athletics +3, diplomacy -3, intimidate +2;`  
Warm Cloak of True North:  
`stats: stamina +2, navigation +10, survivial +2;`			

**These Categories can all be combined on an item!**			

#### Examples:
Giant Sword of Concrete -  
`weapon: base 2h sword, skill club, damage custom 5d6; stats: dodge -10;`  
Blessed Mail -  
`armour: 1d3+2; shield: +1; stats: dodge +3, incantation +3;`  
        
        
### Current Effects:
The top half of the effects section lists the current offensive and defensive bonuses present on the player. Clicking the name will post the active buffs to chat.
The bottom half is for adding temporary effects from non-items - Spells or Injuries for example. Again, clicking the Name will post the buff to chat.
The Effects mods function almost identically to the Possessions Item Mods, except that the Weapons Category does not function in the Effects section.

### Career Skills:
Unless the sheet is Unlocked for custom use, this section is automated. The top entry is your Active Career Skill, and is the average (rounded up) of your Proficient Skills. When a Career is retired, it will snapshot the current value, and add it to the following rows as a Past Career Skill.  

### Weapons:
This section is fairly straight-forward. An attack bonus can be added for a Weapon in the Attack Skill row - this would allow you to use, for example, a Bow which provides +5 to hit without modifying the actual Bow skill.  
The Custom Damage field is only active when the Damage Base is set to "Custom".  
Currently there's no way to post the Item Description to chat - this will be added.  

### Spells:
Spells are divided into two types - Attack and Spellcard. In either case, clicking the spell will initiate an Incantation skill check, to see if the Spell was cast successfully.
If Reactive Rolls are active, the rest of the process just involves following the prompt buttons on the roll templates. An Attack Spell will resolve to a ranged combat Attack, while a Spellcard spell will give an option to apply the listed Spell Effects to a selected token.  
Spell Effects function exactly like Item Mods & Active Effects - see the Item Mods section for the required syntax. By filling in the Spell Effects section and using Reactive Rolls, temporary effects can quickly be applied in combat.  
	
  #### Examples:
  Fix (spell) -  
  `stats: attack -5;`  
  Enchant (spell) -  
  `stats: damage +1d6;`  
