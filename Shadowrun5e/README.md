* Values are inserted like they show in the book - so negative numbers should be written with a '-' in front, positive numbers just as the number (DON'T write '+', it will break the rolls)
* In most Rolls there will be an option to include modifiers - the negative/positive value also applies here
* 'Quick Roll Collection' is everything you need if you don't want to use anything else
* A lot of buttons throughout the sheet to make your life easier

## Useful Attributes

### Attribute Scores:
* Body - @{body}
* Agility - @{agility}
* Reaction - @{reaction}
* Strength - @{strength}
* Willpower - @{willpower}
* Logic - @{logic}
* Intuition - @{intuition}
* Charisma - @{charisma}
* Magic / Resonance - @{magicresonance}
* Edge - @{edge}
    
### Combat Info

#### Wounds
* @{physical} - physical condition monitor / wounds
* @{stun} - stun condition monitor / wounds
* @{paintolerance} - higher or lower pain tolerance (standard value 3)
* @{woundmod} - calculated wound modifier (see below for macro)

#### Offensive
* @{primaryweapon-} - and @{secondaryweapon-} are the two fixed Ranged Weapon slots, you can access all Attributes from these weapons directly with useing this as a prefix and then:
	* @{-acc} - Accuracy
	* @{-dam} - Damage Value
	* @{-ap} - Armor Penetration
	* @{-mode} - Weapon Modes
	* @{-rc} - Recoil Compensation
	* @{-ammo} - Max Ammo
	* @{-skill} - Skill Value used for the Weapon Type
	
* Same goes for Melee weapons with the prefix @{primarymeleeweapon-} and @{secondarymeleeweapon-} (Of course without Weapon Mode, Recoil and Ammo)

#### Defensive
* @{avoid} - [[@reaction+@intuition]]
* @{avoidmisc} - number to in- or decrease the avoid - Accessable through the 'Core Combat Info' Section
* @{armor} - First armor in the Armor Sub-Section - the amount in the 'Core Combat Info' block
* @{armormisc} - First armor in the Armor Sub-Section - number to increase or decrese damage resistance rolls

#### Skills
There is no option to access the Skills directly at this point - sorry!
