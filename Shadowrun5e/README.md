#### If you want to use an (all) attribute(s) from the sheet with macros (you HAVE TO do this for woundmod and paintolerance or no roll will work), you have to *select* them in the sheet at least once
#### Values are inserted like they show in the book - so negative numbers should be written with a "-" in front
#### In most Rolls there will be an option to include modifiers - the negative/positive value also counts here
#####

##Useful Attributes

###Attribute Scores:
* Body @{body}
* Agility @{agility}
* Reaction @{reaction}
* Strength @{strength}
* Willpower @{willpower}
* Logic @{logic}
* Intuition @{intuition}
* Charisma @{charisma}
* Magic Resonance @{magicresonance}
* Edge @{edge}
    
###Combat Info

####Wounds
* physical - physical condition monitor / wounds
* stun - stun condition monitor / wounds
* paintolerance - higher or lower pain tolerance (standard value 3)
* woundmod - calculated wound modifier (see below for macro)
  
#####Every Attribute that starts with "primary-" also has "secondary-" and "tertiary-" versions of it  
####Defensive
* avoid - @reaction+@intuition
* avoidmisc - number to in- or decrease the avoid 
* armor - current worn armor - the amount in the "Core Combat Info" block
* armormisc - number to increase or decrese damage resistance rolls

####Offensive    
* primaryweapondam - damage value of the primary ranged weapon
* primaryweaponskill - skill for the primary ranged weapon 
* Also there are values for Recoil Compensation (**-rc**), Accuracy (**-acc**), Armor Penetration (**-ap**) and Ammo (**-ammo**)
* primarymeleedam - damage value of the primary melee weapon

###Skills
Because hardcoding 73 skills kills the usability of the sheet, there is no viable option to simply access the Skills at this point in time - sorry!

##Other things / Macros / Useful Abilities
I will at some point flesh out the Shadowrun Entry in the roll20 wiki and will write more information about the sheet there.

#####But really the only two macros you want to have to be able to play smoothly:
####Skillcheck (Rolls [Number]d6 and compares every roll to equal/greater-5 and shows your successes)
	> %{CharacterName|skillroll}
	>>Or simply without the Wound Modifiers
	>>> /r ([[?{Amount of Dice|6}+?{Modifiers?|0}]])d6>5s
	
	And the same with Edge!
	> %{CharacterName|edgeroll}
	>>Without Wounds:
	>>> /r ([[?{Amount of Dice|6}+@{CharacterName|edge}+?{Modifiers?|0}]])d6!s>5

##Known Problems / Bugs / ToDo

* Text input fields can't be referenced into another field - Core Combat Info need double entries :(
* Missing attribute dropdown (already in the code, just commented)
* Maybe the possibility to reference attributes outside of a repeat
* Might want a complete css rework / too many hard coded css styles
