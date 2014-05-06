* If you want to use an (all) attribute(s) from the sheet (you HAVE TO do this for woundmod and paintolerance or no roll will work), you have to *select* them in the sheet at least once
* Values are inserted like they show in the book - so negative numbers should be written with a '-' in front
* In most Rolls there will be an option to include modifiers - the negative/positive value also applies here
* The Drain/Fade Attribute and Software/Spellcasting fields in the upper part of the sheet are needed if you want to use the integrated roll for the Spells you entered

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
* @{physical} - physical condition monitor / wounds
* @{stun} - stun condition monitor / wounds
* @{paintolerance} - higher or lower pain tolerance (standard value 3)
* @{woundmod} - calculated wound modifier (see below for macro)
  
#####Every Attribute that starts with 'primary-' also has 'secondary-' and 'tertiary-' versions of it  
####Defensive
* @{avoid} - @reaction+@intuition
* @{avoidmisc} - number to in- or decrease the avoid 
* @{armor} - current worn armor - the amount in the 'Core Combat Info' block
* @{armormisc} - number to increase or decrese damage resistance rolls

####Skills
There is no option to access the Skills directly at this point - sorry!

##Known Problems / Bugs / ToDo

* Text input fields can't be referenced into another field - Core Combat Info needs double entries
