# Shadowrun 3rd Edition

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
