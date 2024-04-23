# Shadowrun 3rd Edition

## Release Notes 11/08/2021
1. movment pentaly is now shown in RangedTN modifiers
2. fixed calculation of ammo weight
3. fixed end turn - no longer refreshes pools unless there are no more combat phases for the icon.
4. fixed matrix target number, legit vs. intruder were reversed.
5. killjoy resistance is now willpower - not body.
6. vehicle gunnery updated to account for movement penalty re-write for showing it in the rangedTN
7. killjoy and blackhammer were not using deck armro - fixed
8. added stun damage options for spells when using "choose at cast time" option
9. drain calc for stun damage spells using "dmg + or dmg -" now correclty calculate

## Release Notes 10/8/2021

## changes/bug fixes
1. added import for characters, criters, matrix, vehicles and spirits 
2. added carring weight for Ammo, Armor, Weapons and Gear. 
3. added toggle for "carrying" or "in stash" to seperate gear that is brought on a run and counts towards encumberance vs. gear owned but not being carried.
4. added new ammo types: screamer, hammerhead, gyrojet plus, gyrojet seeker, gyrojet seeker plus, shock lock, incindiary, big d's temper, bola and flare. 

## Release Notes 9/28/2021

### changes/bug fixes
1. Tar Pit ad Tar baby: when using the "execute" button it will roll the Opposed test between the ic ratin and the utility as well as a sensor test.  The resutls of the three rolls will be whispered to the GM.
2. added chat buttons at the end of melee attack.  Defending character can click on either Defense or Full defense.  The results of the attack test will be passed to the new "defense" roll.  The defense roll will compare successes and determin winner.  Weapon damage and power will be stagged up as per the melee combat rules of srun3e.  If the attacker wins the contest, the defeder will get  Resist buton.
If "full defense" was chosen, the defender will also be presented with a "dodge" button.  Choosing dodge will roll a melee dodge test and present the player with a "resist" button.  The only differnce between the "Resist" button displayed afer the offense test and the dodge test is that the reults of the dodge are passed to the resist and count towards the resist successes.  If the defender wins the melee contest and they choose "full defence" the roll will result in "Attack Parried".  Else, a "resist" button will be displayed and the attacking character will be able to roll damage resistnace based on the staged up weapon damage and power for the melee weapon currently equipped by the defender.   The chat buttons do not have to be used, regular sheet rolls can still be used i.e. the defender can use the attack button for a melee weapon and then the player that looses the contest can roll a resistance test.  The benefit for the chat buttons is that they reduce the amount of roll queries presented to the players as the data is already sent to the roll. 
3. fixed bug on matrix wound penalty
4. added pool tracking for dispel tests
5. added foci to repeating spells
6. added button to select and add player to the "operator/rigger" section of the vehicle tab.  Will also update value of control pool and gunnery skill.  Vehicle skill still needs to be updated manually.
7. resist explosion now asks for distance in meters from explosion and calculates power reduction accordingly.
8. added chat button after AoE spells.  Any charcter in the range of the spell can click on the button and it will determine attack successes.
9. added chat button after magic attack ( regular and AoE ) for spell defense for an ally mage/shaman to click on.
10. added chat button after magic attack or spell defense to resist spell. Resistance is based on attribute if not an elemental spell, in which case resistance is 1/2 impact.
11. All chat buttons published after magic attack roll template pass the value of the original roll to prepopulate most of the roll questions. 
12. Resist and Dodge buttons presented after ranged attack roll template will pass value of original roll to dodge and resist rolls.
13. Added translation tags for all html elements and rolls 
14. removed the use of case statements
15. switched from show/hide buttons to tabs for sub tabs
16. fixed bugs and added opposed roll for Matrix Combat Manuevers


### Impact on existing characters.
none

### Todo
add knockdown test chat button after melee and ranged attacks.
add shotgun ammo to ammo type list on repeating ranged weapons.
add translation to sheet worker rolls.
add opposition tests with payload for banish rolls
add opposition tests with payload for spirit control rolls


## Release Notes 9/1/2021

### changes/bug fixes
1. enhanced resist and dodge roll buttons for rangedweapons
2. resist button added for matrix sheet-rolls
3. fixed calculation of deck attributes for host/grid/ic
4. fixed rolls for IC combat
5. added support for calculating damage for different ammo type
6. For tar pit and tar baby will now ask for "ic rating" instead of power of attack when using he built in resist button.  They are also now using the IC rating correclty for roll dice.
7. Probe IC now works correctly with "execute" button.
8. Added sheet workers to make the setup of IC easier.  It will set "Test Target" to Attack for most proactive IC ( except for Ripper and Crippler as those you need to choose an attribute to damage on the deck ).  Probe will set Test Target to "detection factor" and Tar Baby/Pit will set Test Target to "Utility TN". 
9. fixed calculation of "deck" attributes for the MATRIX sheet types.
10. fixed - removing all armor now correclty sets values to 0
11. Added info text to the bottom of ranged weapon rolls depending on ammo used.  Most weapon power and dmg calculation happen on the attack, but any power/dmg modifier that is based on armor is calculated on the resist roll if using the chat button.

### Impact on existing characters.
For Matrix sheets - please change the setting of the security value so that it calculates the deck attributes correctly.  You can set the value back to the previous value right away.

## Release Notes 8/30/2021

### changes/bug fixes
1. Fixed bug with Matrix rolls
2. Fixed bug with Ranged and Explosive rolls for vehicles
3. Added armor calculation with different slots for head, body, shield, gyro harness and cyber/bioware.
4. Armor calculation includes penalties for combat pool and quickness related tasks
5. Removes seperate "Dermal Armor" input.  Dermal Armor should be added to "Body" "Augmentation"
6. Added Dice Pool and Target number modifiers to Melee, Explosives and Ranged Weapons to allow for easier tracking of defaulting and specializing and edge modifiers.
7. Changed logic for offhand weapons. Removed "secondary" equip as the logic is now handled by the above change.
8. Added "pool" selector to repeating skills.
9. Added recoil penalty tracker
10. Added pool tracker for Task Pool
11. Added Karma Tab for keeping track of abilities/skills/spells purchased
12. Added credsticks with rolls
13. Added contacts
14. Added lifesytles
15. updated formatting for consistent look and feel
16. removed unused classes from style sheet
17. Added "Unknown" option for Host/Grid Rating on character/npc sheet. If set to "Unknown" the player will be prompted to select the current "node" token from the board in order to calculate cyber combat target number 
18. Fixed bug with reactive dice using system rating instead of their own rating for dice rolls
19. Added "Deck Name" innput to Cyberdeck tab.
20. Added gear rolls and the ability to specify a Dice Pool for items ( example. Task Pool )

### Impact on existing sheets
- It is recomended to "reselect" the "Test Target" on the "Intrusion Countermeasuers" tab of the Matrix sheet
- Add Dermal Armor to the "Mods" column for "Body"
- If using an "Offhand" melee weapon, create a new "Weapon" with both the Primary and OffHand weapon.  Use the +Dice and +TN fields to add the appropriate extra dice ( 1/2 offhand skill ) and penalty ( depends on ambidexterity edge )
