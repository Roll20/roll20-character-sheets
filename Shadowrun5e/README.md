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
    
####Defensive
* avoid - @reaction+@intuition
* avoidmisc - number to in- or decrease the avoid 
* armor - current worn armor, the amount in the "Core Combat Info" block (secondaryarmor | tertiaryarmor - also available for use, the second / third armor slot in the armor block)
* armormisc - number to increase or decrese damage resistance rolls (also in secondary / tertiary versions)

####Offensive    
* primaryweapondam - damage value of the primary ranged weapon
* primaryweaponskill - skill for the primary ranged weapon 
* Also there are values for Recoil Compensation (**-rc**), Accuracy (**-acc**), Armor Penetration (**-ap**) and Ammo (**-ammo**) -- everything available in secondary and tertiary versions
* primarymeleedam - damage value of the primary melee weapon || same as ranged just with "primarymelee" in front

###Skills
Because hardcoding 73 skills kills the usability of the sheet, (at this point - let's wait for the option to include tabs in our sheets); there is no viable option to access the Skills at this point in time - sorry!
    
##Useful Abilities / Macro Options:

###AllInOneRoll
* %{charName|skillroll} -  /r ([[?{Amount of Dice|6}+?{Modifiers?|0}]]-@{woundmod})d6>5s
* %{charName|edgeroll} -   /r ([[?{Amount of Dice|6}++@{edge}?{Modifiers?|0}]]-@{woundmod})d6!>5s
  
###Combat
* %{charName|%woundmod} - >[[floor(@{physical}/@{paintolerance}) + floor(@{stun}/@{paintolerance})]]
* %{charName|%initiative}/%matrixinitiative/%astralinitiative - >/r ([[@{initiativestat}]]-@{woundmod})+@{initiativedice}d6 &{tracker} - also adds the selected token to the tracker automatically
* %{charName|%attackprimary} - primary ranged weapon attack (again, use secondary / tertiary for the other two)
* %{charName|%attackmeleeprimary} - see above only for melee
  
* %primarydefense - defense roll (avoid and resist in one) - you know the secondary/tertiary thing by now...
  
###Tokens / GM Suggestions
As a suggestions:
* set **bar1** as @{physical}
* set **bar2** as @{stun}
* set **bar3** as @{armor}

With this you can make one character sheet for a whole group of NPCs (like one sheet for all Grunts with the Professional Rating 1) - and while still being able to access their weapons and stuff you can make a Wound-Modifier macro that circumvents the fact that their stats (Wounds) are linked together:
* woundmod - [[floor(@{target|bar1}/@{target|paintolerance})+floor(@{target|bar2})/@{target|paintolerance})]]
* attackprimary - as an example
    /emas @{target|token_name} attacks @{target|Victim|token_name}!
    /roll ([[@{target|primaryweaponskill}+@{target|agility}+?{Modifier|0}]] - #woundmod )d6>5s
    /desc AP: [[ @{target|primaryweaponap} ]] || Damage Value:[[ @{target|primaryweapondam} ]] || Acc: [[ @{target|primaryweaponacc} ]]
    

##Known Problems / Bugs / ToDo

* Skills - see above
* Text input fields can't be referenced into another field
* Might want a complete css rework / too many hard coded css styles
