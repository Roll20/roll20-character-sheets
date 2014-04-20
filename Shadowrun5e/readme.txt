-Useful Attributes:

--Attribute Scores:
    body, agility, reaction, strength, willpower, logic, intuition, charisma, magiresonance, edge - all attributes are in the sheet by the name from the game, lower-case and with no spaces
    
--Combat Info

---Wounds
    physical - physical condition monitor / wounds || stun - stun condition monitor / wounds || paintolerance - higher or lower pain tolerance (standard value 3) || woundmod - calculated wound modifier (see below for macro)
    
---Defensive
    avoid - @reaction+@intuition || avoidmisc - number to in- or decrease the avoid 
    armor - current worn armor, the amount in the "Core Combat Info" block (secondaryarmor | tertiaryarmor - also available for use, the second / third armor slot in the armor block) || armormisc - number to increase or decrese damage resistance rolls (also in secondary / tertiary versions)

---Offensive    
    primaryweapondam - damage value of the primary ranged weapon || primaryweaponskill - skill for the primary ranged weapon || also there are values for Recoil Compensation (-rc), Accuracy (-acc), Armor Penetration (-ap) and Ammo (-ammo) -- everything available in secondary and tertiary versions
    primarymeleedam - damage value of the primary melee weapon || same as ranged just with "primarymelee" in front

--Skills
    Because hardcoding 73 skills kills the usability of the sheet, at this point (let's wait for the option to include tabs in our sheets). There is no viable option to access the Skills at this point in time - sorry!
    
-Useful Abilities / Macro Options:

--AllInOneRoll
  %skillroll - /r ([[?{Amount of Dice|6}+?{Modifiers?|0}]]-@{woundmod})d6>5s
  %edgeroll - /r ([[?{Amount of Dice|6}++@{edge}?{Modifiers?|0}]]-@{woundmod})d6!>5s
  
--Combat
  %woundmod - [[floor(@{physical}/@{paintolerance}) + floor(@{stun}/@{paintolerance})]]
  %initiative/%matrixinitiative/%astralinitiative - /r ([[@{initiativestat}]]-@{woundmod})+@{initiativedice}d6 &{tracker} - also adds the selected token to the tracker automatically
  %attackprimary - primary ranged weapon attack (again, use secondary / tertiary for the other two)
  %attackmeleeprimary - see above only for melee
  
  %primarydefense - defense roll (avoid and resist in one) - you know the secondary/tertiary thing by now...


-Known Problems / Bugs / Missing features

--Skills - see above

--Text input fields can't be referenced into another field

--Might want a complete css rework / too many hard coded css styles



Design input for the borders around the Statblocks would be appreciated (for something closer to the original)

20.April.2014 - 15:18 - Neirin D.
