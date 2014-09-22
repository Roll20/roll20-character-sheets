# NATHA'S NUMENERA ROLL20 MACROS
v2.7 (2014/09/22)

**READ THIS:**

To be used, these macros require:
- Natha's Numenera Roll20 API scripts (NathasNumenera_Roll20_API.js)
- Natha's Numenera Roll20 Character sheet added to your campaign setting (NathasNumenera_Roll20_CharacterSheet_Layout.htm + NathasNumenera_Roll20_CharacterSheet_CSS.css)
- A selected token representing a Character
- The Character must have values in all the basic attributes : stats (current and max), edges, recovery and damage tracks, Armor speed reduction, recovery bonus etc.

## +/-:MIGHT
_Adds or substracts points from the Might stat, and check states, damage tracks ..._
```
!nathanum-attrib @{selected|token_id}|might|?{Might +/-|0}
```

## +/-:SPEED
_Adds or substracts points from the Speed stat, and check states, damage tracks ..._
```
!nathanum-attrib @{selected|token_id}|speed|?{Speed +/-|0}
```

## +/-:INTEL
_Adds or substracts points from the Intellect stat, and check states, damage tracks ..._
```
!nathanum-attrib @{selected|token_id}|intellect|?{Mental +/-|0}
```

## Initiative
_Asks for prospective Speed effort, Bonus to roll and Speed point expenditure (beyond effort, for special ability use for example). It will substracts points from the stat, and check states, damage tracks ..._
_Then rolls an initiative rolls, adds the token to the turn tracker and outputs result to the chat._

**WARNING:** 
- Not the standard Numenera initiative roll : Add the effort and rollbonus to the roll and add it to the tracker.
- Meant to be sorted/compared to (Level*3) of the NPCs/Creatures
- Works only for characters, not for NPCs. Use a macro using the NCP/Creature level to add it to the tracker (level*3)
- If used twice without reseting the turn tracker, the character's added twice ...

```
!nathanum-initroll @{selected|token_id}|?{Speed Efforts|0}|?{Roll bonus|0}|?{Additional Speed cost|0}
```

## Roll:MIGHT
_Might roll, asking for Level/Difficulty (not the target!), prospective effort to roll, Bonus to roll, stat point expenditure (beyond effort, for special ability use for example) and prospective effort to damage. It will substracts points from the stat, and check states, damage tracks ..._
_Then rolls the dice, calculating success, special effects etc. and outputs result to the chat._
```
!nathanum-numeneroll @{selected|token_id}|might|?{Might roll: Difficulty|0}|?{Effort to roll|0}|?{Roll bonus|0}|?{Additional cost|0}|?{Effort to damage|0}}
```

## Roll:SPEED
_Speed roll: see Might Roll._
```
!nathanum-numeneroll @{selected|token_id}|speed|?{Speed Roll: Difficulty|0}|?{Effort to roll|0}|?{Roll bonus|0}|?{Additional cost|0}|?{Effort to damage|0}
```

## Roll:INTEL
_Intellect roll: see Might Roll._
```
!nathanum-numeneroll @{selected|token_id}|intellect|?{Intellect Roll: Difficulty|0}|?{Effort to roll|0}|?{Roll bonus|0}|?{Additional cost|0}|?{Effort to damage|0}
```

## RECOVERY
_Recovery roll. It will check if the character still can do recovery rolls, and if so, will advance the recovery tracks, roll a d6 + the character sheet recovery bonus._

**WARNING:** asks nothing before executing (can't be cancelled).
```
!nathanum-recoveryroll @{selected|token_id}
```

## LONG_REST
_Long rest. I suggest reserving this macro to the GM. It will "reset" the character : maxing all stats (minus Armor Speed reduction), resetting the recovery and damage tracks._

**WARNING:** asks nothing before executing (can't be cancelled).
```
!nathanum-restchar @{selected|token_id}
```

## Damage-NPC
_Damage to NPC : the token has to linked to a character (as a Mook or not) and the character must have Health (and be bar2) and Armor attributes . Asks if Armor must be ignored or not._
```
!nathanum-npcdmg @{selected|token_id}|?{Damage +/-|0}|?{Apply Armor (y/n)|y}
```
