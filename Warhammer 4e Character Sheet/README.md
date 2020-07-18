# Warhammer 4e Character Sheet (Djjus)

This is a fork of https://github.com/vicberg/Roll20-Warhammer-4e-Character-Sheet, which itself is a port of a original WHFRP2e Template.

This Character Sheet has been updated to fix and enhance mostly in the original style. And uploaded to Roll20 for all to use. 
I'm a active WFRP player and I plan to further enhance this sheet at time goes on.


///// ============ Change Log ============ ///// 


July 13 2020 

- Endurance test in Combat Action no longer rolls a Heal test
- Impale mechanics tiedied up for Attack/Opposed/Shoot rools and made more obvious when it occurs.
- NPC pages 2/3/4 fixes which were only applied on page 1 before


July 13 2020 

- Major Art overhaul -  in style of the rule book, removed the black banners and reworked section titles, new background for all themes. Overall effect is less contrast and more white space. Easier on the Eyes.
- Weapons Tab overhaul - Weapons must now be selected to use them, and will fire of from the new Attack/Opposed/Shoot buttons. This should be fairly obvious when the Player next tries to use a weapon after this update. This feature is supported by new sheetworkers. This allows using weapons outside the Weapons reaping sections which is the main reason this was implemented.
- Combat Actions section overhaul - Added custom roll field, core rule based movement rolls for Athletics/Climbing/Falling/Leaping/Pursuit/Sprinting in drop-down menu, current active Attack/Opposed/Shoot display and buttons which are underpinend by the new Weapons mechanic.
- And a number of minor bug fixes


July 5 2020

- Add Armor value to NPC boxes
- Overburdened value now correctly increments when you go over the max encumbrance value, rather then at max encumbrance value.
- Sturdy value now is correctly adds x2 per level to encumbrance
- Character Armor Arm & Leg encumbrance is now linked to avoid confusion of adding too much enc. (right arm/leg enc attributes are now deprecated)


June 29 2020

- Buttons & Banners further improved look
- Combat Initiative roll now allows Modifier for the Init Char.
- Crit Roll fixed so it doesnt go negative.
- NPC tab reworked, look improved, added Condition tracker section and 2 custom skill rolls
- Condition Tracking integration into roll template, first pass. Option to choose between Advantage +xx showing only (new default) on all combat rolls and all non-situational roll modifying conditions (e.g. Broken, Fatigued Stuned, Prone..) to be add to appropriate rolls automatically. Includes NPC tab support too. It should be noted that some conditons can we highly situational, like Perception test could be impacted by Blinded/Deafened or not depending on what is being percived, such situational occasions will have to be handled by the GM and no attempt is made to add complication. 

Condition effects are currently bound as follows:

Broken/Fatigued/Poisoned/Stunned = Effects all Melee/Spellcast and skill rolls (only excludes roll tables like Misscast/Oops etc.)
Entangled/Prone = Effects Movement based rolls, so melee/spells, combat actions and any skill which would require movement like dodge/athletics/climb etc.
Blinded = Effects Weapon/Spells casts rolls
Deafened = Effects Spells casts rolls
Unconscious = Effects all rolls (Effectively blocks rolling with buttons)

Note conditions are not inteneded for out of combat situations, GM simply make the roll difficulty harder (-20 etc) if any condition is to apply to a situation.


June 22 2020

- Button color now added to themes.
- NPC repeating sections can now minimize, helps management for GMs.
- Other minor code fixes


June 15 2020

- New UI Themes - Empire, Dwarf & Elf
- Condition Tracker added! This has TokenMod integrated (TokenMod API needs to be install in the game!) buttons which can set/unset conditions, it also requires my custom WFRP4e Tokens  (download @ https://github.com/Djjus/Vault/blob/master/Warhammer%204e%20Character%20Sheet/markers/WFRP4eset1.0.zip)

- Button cleanup/overhaul
- Fixed NPC tab spacing issue with Advantage value field
- Fixed NPC tab Opposed Melee roll using wrong name on NPC page 1
- Fixed Advantage not adding on Ranged Weapon target number in rolls
- Fixed bug preventing Characteristic Bonus Modifier value from adding to the Characteristic Bonus Current value, due to javascript omission
- Removed an extra curly bracket (This should fix the problem behind issue Roll20#6152)


Feb 24 2020

- NPC tab added, this new tab allows simple contained NPC mini-cs creation with template integration, featured with up to 5 weapons & spells for each NPC. Good for GMs and players.
- All skill rolls now have Success/Fail msg
- Heal Adv-Skill: Added new Heal template which displays IntBonus
- Optional Advantage Rule selection (core book). See settings tab
- SL modifier for all simple and dramatic rolls, displays after the SL result {e.g. Success Level -3 | +Mod 0}. SL results now also in Bold.
- Removed Hit location from opposed rolls.
- Defensive Melee weapon tick now adds +1 SL when opposing as per rulebook, uses new SL modifier field (rather then +10 to the target roll as before)


Feb 17 2020

- init test not visable fixed
- Ranged Weapon SB? check box now useable



Feb 10 2020

- Banner rework, added light/dark mode to settings
- Roll test clean up and rules, Crit Success/Failure added
- Crit roll fixed
- Wounds updated, locked between 0 and max wounds
- Roll template rework
- Roll public/whisper chooser moved to settings
- Fields for Career level and Career Path added.
- Perception/Stealth rolls influence from armour fixed
- Critical Hit roll fixed



Jan 20 2020

- Asset and Color palate rework, light/dark mode
- Clean up of global rolls mechanic
- Xp spend log tab added, these field interact with Xp current/earned/spent fields.
- Bug fixes



Jan 13 2020

- Reworked Initiative Roll button, with 3 Core book rule options. See Settings cog.
- Moved Wounds/Advantage/Fate points out of the tabs to the top of the sheet for better access.
- Rework on the Skills tab, Mostly for Skills which require working Attrbutes for macros.
- Background Tab moved
- Rework of Weapons (formerly Combat) Tab. With Skill selector for Melee/Ranged specilizations.
- Rework of Spellbook Tab. Removed unused 2e spell sub tabs. Spells now work correctly and added Channelling Test button for Arcane spells.



Dec 24 2019

- Project Forked from https://github.com/vicberg/Roll20-Warhammer-4e-Character-Sheet




Usage Notes:


- SETTING: Check setting (cog) tab ever time when setting up a new Char sheet, and select correct options for your game
- Wounds: ensure correct Race and Hardy level are chosen. Wounds are subtracted by adding damage, and given back by subtracting it. Will not go our of 0-Max Wounds range.
- Advantage Field applied to Attacks and appropriate Combat Skills (Cool & Dodge) automatically, and shows i the roll result.
- For an advanced Skill you must select the taken checkbox in order for target to be above 0.
- On Weapons ensure you select the coresponding skill (e.g. Melee Basic, Melee Parrying, Ranged Bow, Ranged Blackpowder etc), and that the correct skill is learned and advance points in it.
- Themes, see setting tab for various theme which change the look of the char sheet overall. Inclung Emprie/Dwarf & Elf themes.
- Arcane Spells need to have a number in CN and Damage Field or they will not roll correctly, both fields will default to Zero.
- Extended Channelling Test (spellbook tab, Arcane Spells only), set Accu Ext SL to 0 before beginning a new Channelling action. Increment with Success level of roll until finished. Allows easy tracking of CN v Accu Ext SL for all players. (NPC tab has channelling on all spells for simplicity)
- NPC tab is intended of quick persistent and contained NPC creation without the need for full character sheets for each of them. With template integration, semi featured with conmtained Name / Characteristic / Condition / Advantage ingration and up to 5 weapons & spells for each NPC, and a colapisble notes section. Good for GMs and players. (I would still recommed seperate character sheet for actual NPC bosses/major characters). 
- Condition Tracking integration into roll template, first pass. Option to choose between Advantage +xx showing only (new default) on all combat rolls and all non-situational roll modifying conditions (e.g. Broken, Fatigued Stuned, Prone..) to be add to appropriate rolls automatically. Includes NPC tab support too. 

This has TokenMod integrated (TokenMod API needs to be install in the game!) buttons which can set/unset conditions, it also requires my custom WFRP4e Tokens  (download @ https://github.com/Djjus/Vault/blob/master/Warhammer%204e%20Character%20Sheet/markers/WFRP4eset1.0.zip) 

It should be noted that some conditons can we highly situational, like Perception test could be impacted by Blinded/Deafened or not depending on what is being perceived, such situational occasions will have to be handled by the GM and no attempt to add complication is made. 

Condition effects are currently bound as follows:

Broken/Fatigued/Poisoned/Stunned = Effects all Melee/Spellcast and skill rolls (only excludes roll tables like Misscast/Oops etc.)
Entangled/Prone = Effects Movement based rolls, so melee/spells, combat actions and any skill which would require movement like dodge/athletics/climb etc.
Blinded = Effects Weapon/Spells casts rolls
Deafened = Effects Spells casts rolls
Unconscious = Effects all rolls (Roll block)

Note conditions are not inteneded for out of combat situations, GM simply makes the roll difficulty harder with a custom roll modifier (-20 etc) if any particular condition is to apply to a situational roll.




Possible additons to come :

- Talents rework
- Map/Info Tab (maybe)
- More themes


Enjoy.