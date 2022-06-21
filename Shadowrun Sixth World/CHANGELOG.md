Change Log
==============================================
**2022-06-08 ** v.52 Chuz (James Culp)
	Bugfix - The query for the reason the D6 is being rollw wasn't showing in the roll template.
	New Feature - Added an Effects tab in the Attributes Pane.  This is where a runner can track what effects they commonly have, handy for mages that always cast Increase Attribute, or drug using street sams for example.  This also includes the Modifications advanced feature (**USE AT YOUR OWN RISK**) that turns on and off with the toggles.
**2022-03-15 ** v.51 Chuz (James Culp)
	Bugfix - Sprites -> update power/skills now updated when sprite type or level are changed.
	Bugfix - NPCs had a maximum essence of 6, HMHVV victims can have >6 essence.
	New Feature - actually got in in v.50 - Damage Compensators are now supported as advanced modifications using 'damage_compensator: x' where 'x' is the level of damage compensators.
	New Feature - actually got in in v.50 - Resist Pain (per the spell) can be applied to wounds if advanced modifications are on, currently you can add it as a quality -> Modification 'resist_pain: x' where 'x' is the number of hits (wound penalties ignored)
	Bugfix - Fixed text color for some text on the NPC sheets in darkmode.
	Bugfix - Fixed maximum of 4 on npc initiative dice (should be 5)
	Updated Matrix Roll buttons in the Rolls tab to "Training Level?" because it now also includes an option for Untrained (-1 dicepool)
	Bugfix/New Feature - NPC->Host Sheet now prompts for alternate attributes when rolling the Attack, Sleaze, Data Processing and Firewall attribute buttons at the top of the sheet.
	Bugfix - NPC sheets made a few dark mode fixes.
**2022-03-08 ** v.50 Chuz (James Culp)
	Bugfix - updated spirit sheet to default to having the "Reset" toggle on since the majority of the time having it on is the right choice.
	Bugfix - updated spirits with Engulf and Elemental Attack close/ranged attacks listed even though they are optional power to now state the optional power is required in the notes.  This is a gentle reminder to players/GMs since the alternative is the player/GM having to add the attacks every time a spirit is summoned.
	Added resist_pain modification attribute.  This attribute when set to a positive value will modify wound penalties per the spell in the CRB pg.137.
	Added damage_compensator attribute to affect optimal reduction in wound penalties based on the rating of the damage compensators
	Added a prompt to the D6 roller to query the reason for the roll, if the user just hits ENTER it defaults to D6
	Updated styles a little to make dark mode not quite so broken.
	Enabled Rerolls and Bump 4's functionality on the d6 roll button to see if anyone hates it.
	Added custom description imports from Genesis, if the player has spent the time to manually add the custom descriptions in Genesis, now they don't have to do it again for the character sheet.
	Added handling of Genesis exports of primary armor.
**2022-02-22 ** v.49 Chuz (James Culp)
	Added the ability to import character data from the RPG Framework Genesis character generator. (see official Roll20 thread notes)
**2021-11-23 ** v.48 Chuz (James Culp)
	Bugfix - Removing Technomancer echos with modifications didn't update things correctly.
	Bugfix - Replaced translation "Rotarcraft" with correct "Rotorcraft"
	Added Modifications functionality to Magic->Adept->Powers
	Added Modifications functionality to Magic->Meta->Metamagics
	Added Modifications functionality to Technomancer->Complex Forms
**2021-11-09 ** v.47 Chuz (James Culp)
	Bugfix - Technomancer Complex Forms with no roll were displaying oddly.  This has been fixed, now the roll button that shows up will show the fade and notes section.
**2021-11-04 ** v.46 Chuz (James Culp)
	Fix for spells not displaying hits
**2021-11-02 ** v.45 Chuz (James Culp)
	Update to the roll-template preparing for future features
	Updated rolls so mouseover showing the actual dice rolled are red for 1's (2's for bad luck) and green for 5's and 6's instead of the previous only 1's and 6's being colored.
	Add SR Title to "Character Sheet" tab
	Make Bio & Info, Character Sheet and Attributes & Abilities tabs stay in view as the sheet is scrolled.	Modified Notes tab to have an automatic scrollbar and removed the expand widget since it did nothing.
	Modified Notes tab to have an automatic scrollbar and removed the expand widget since it did nothing.
	Added matrix_overclock attribute which can be put in the Modifications box for a program which will cause the Matrix Rolls on the Rolls tab automatically add 2 dice, one of which is the wild die to rolls.  If added via the Matrix->Programs->Modifications when the Program is toggled off/on it will turn the effect off/on.  Valid values 1|0.  This will also indicate in the header of the rolls-computed roll template the +2 dicepool bonus.
**2021-10-26 ** v.44 Chuz (James Culp)
	Bugfix returned notes to the roll template outputs for PC roll buttons in repeating sections.
**2021-10-11 ** v.43 Chuz (James Culp)
	Added roll post-processing to PC sheet buttons.  This includes a new way to handle Wild Dice and glitch/crit glitch detection.
**2021-09-21 ** v.42 Chuz (James Culp)
	Removed Firing Modes from Arms->Ranged because it did nothing in that section.
	Moved "Primary" selector outside the settings area so it's easier to select a primary weapon.
	Added Ranged and Melee weapons (PC->Arms and Grunt) to pastable raw data
	Bugfix: Fixed a minor but annoying issue where if you added a skill and it was Astral the default attribute was Agility not Intuition
	Updated skill roll button outputs to display the associated attribute for the roll.
	Grunt sheet Added tooltips for Direct/Indirect Magic Defense, Defense, Soak, Soak Matrix and Soak Biofeedback.
	Bugfix: PC Sheet Changes to Charisma now trigger the Social Rating to update.
	Added Matrix Action buttons to the bottom of Grunt sheets IF "Has Matrix Device" is checked.
	Bugfix: Grunt Group checkbox and count are no longer hidden when settings mode is not active.
	Bugfix: Found some Soak rollbuttons were including wound modifiers, that was incorrect, fixed now.
	Grunt/Spirit sheet Added Magic AR beside Drain roll button
	Grunt sheet added Direct Magic and Indirect Magic defense roll buttons and rearranged things a little.
**2021-09-08 ** v.41 Chuz (James Culp)
	Bugfix - Drone/Vehicle Initiative should have been normal Initiative but Pilot * 2 + 4d6.
	Bugfix - Grunt template was applying wounds to Soak rolls.
	Added IC to the list of pastable raw data
	Host->IC now display notes in the roll template	
**2021-08-31 ** v.40 Chuz (James Culp)
	Added Social Rating to derived tests (even though it's not a test) just to the right of the Edge Attribute.  This is a total of Charisma + any cumulative + primary armor social adjustments.
	Added mouseovers for Composure, Judge Intentions, Memory and Lift & Carry buttons detailing where the values come from for those of us that forget.
	Added the ability to add Spells, NPC Spells, Qualities and Augmentations by pasting raw data into the Notes textarea for a new repeating row.
**2021-07-19 ** v.39 Chuz (James Culp)
	Added Grunt Groups and Autocalculations based on the # of grunts
	Bugfix - PC->Rolls tab was showing conversions on the Matrix Actions Tab
**2021-07-12 ** v.38 Chuz (James Culp)
	Bugfix - NPC->Grunt fixed a bug or oversight on grunt repeating skills.   They were all showing Agility on the roll template as their ability.  Upon first opening a grunt sheet all repeating skills for the grunt will be re-set to use their default associated attribute and the display attribute will also be fixed.
	Bugfix - NPC->Host IC dice roll buttons weren't working.
	Bugfix - PC->Rolls->Misc fixed width on conversions
**2021-07-05 ** v.37 Chuz (James Culp)
	Rolls->Misc tab added and now contains a way to do quick and dirty conversions for Standard to Metric and vice versa.  Feet <=> Meters, Pounds <=> Kilograms, and Miles <=> Kilometers.
	PC->Arms->Range/Melee Added "Engineering" option to the skill dropdown.
	Bugfix - PC->Arms->Range/Melee fixed the dicepool display to now reflect the actual dicepool.  To make sure this is up to date when viewing a character sheet for the first time after this version goes live just toggle settings mode off/on or on/off for each weapon, that should trigger the update and update your primary displays as well.
	Added some behind the scenes code to try and update the weapons to have the Attribute, Attribute Rating and Dicepool Modifier attributes set correctly after loading.  Also added versioning for the character sheet data.
	NPC Astral Initiative now auto-calculates for spirits and awakened grunts	NPC->Vehicle/Drone fixed hot sim initiative auto-calculation (now pilot * 2 + 4d6)
	NPC->Grunt fixed sprint speed being 0 by default
	PC Sheet -> Condition Modifiers box - added Natural Healing Physical and Stun buttons.  Currently do not update player's CM.
**2021-06-21 ** v.36 Chuz (James Culp)
	PC Sheet Modifiers text boxes in various places in the sheet (Qualities, Augs, Gear, Matrix Devices, Programs, and Echos) now allow the player to add/subtract from attributes on the sheet.  See roll20 forum thread for further details.
	PC Sheet Removed Modifications from sprites.
	PC Sheets Added functionality so when firing mode is changed on the Core tab, the DV and AR are updated appropriately.  Still doesn't split dice pools.
	Added combat_paralysis flag that will automatically divide the PC's initiative roll in half, rounded up until there is further guidance from Catalyst.  It does not move them to the last  slot for the first round of combat however.
**2021-06-03 ** v.35 Chuz (James Culp)
	PC->Magic->Meta tab, added alternative Tradition attributes to the drop down.
	Added Matrix AR and Matrix DR to Host sheet
**2021-05-25 ** v.34 Chuz (James Culp)
	Bugfix - Changed HTML top display the nuyen symbol instead of translations as the character was breaking the translation stuff
**2021-05-17 ** v.33 Chuz (James Culp)
	Bugfix - PC->Grenades launched grenades didn't work properly
	Bugfix - Nuyen symbol keeps disappearing, another attempt to lock it in
	Added mouseover text to Rolls->Matrix Actions to identify skill and attribute for each.
	Updated NPC-Spells to follow the same format as PC-Spells, to include using the same roll button format.
**2021-05-10 ** v.32 Chuz (James Culp)
	Bugfix - Added sheetworker call on sheet load to fix incorrectly calculated soak value for the Core->Soak Damage button
	Changed Rolls->Jack Out from text to a roll button so unfortunate deckers can escape link-lock.
	Added Core->Direct Magic Defense button and Core->Indirect Magic Defense buttons
	Added Arms->Grenade section to handle Grenades, also added a GM Button to roll Scatter and Distance
	Added disclaimer to Rolls section, specialization/expertise and mods from augs/magic/etc are not included in those rolls, the way to add those dice to the pools is to use the [Modifiers] toggle at the top of the sheet.
	Bugfix - Long weapon names threw off the display in Core->Weapons and Arms.
	Bugfix - Delete icons were showing up on the left for Social and Vehicles covering the move icon preventing rearranging.
**2021-05-03 ** v.31 Chuz (James Culp)
	Bugfix - NPC->Vehicle sheet was resetting Body to 1 when the sheet was closed
	Added Birth Name to Social Tab
	Added New Roll Template {template:multirow} with available fields header, base, desc, desc2,...desc6, bigdesc, bigdesc2...bigdesc6 for your macro display joy
	Added Augmentation Grades drop down to PC->Augs section
	Updated NPC->Host->IC section to make them more useful during encounters.  Separate AR/CM/Initiative Roll Button/etc
	Added a Notes field to all NPC sheets
	Added Name field to all NPC sheets, tied to the actual character_name attribute
	Added Metatype field for NPC->Grunt sheet.
	Added Matrix Action roll buttons to the new Rolls tab.
	Styled Rolls->Matrix Action roll buttons to indicate legal/illegal
**2021-04-28** v.30 Chuz (James Culp)
	Bugfix - Separated NPC->Vehicles targeting autosofts so you can activate them one at a time.
	Bugfix - Options->Soak Modifier and Options->Defense modifiers were not working properly.
	Bugfix - Core->DR roll button wasn't updating all of the time as it should.
	Added mouseover titles for weapon ranges C, N, M, F, E to define their ranges in meters.
**2021-04-26** v.29 Chuz (James Culp)
	Minor bugfixes and typo fixes
	Minor NPC sheet layout tweaks
	Bugfix - Removed mention of "Force" in npc->grunt spell roll button
	Bugfix - PC->Magic->Spells->Dicepool Modifier lost it's value constantly
	Bugfix - Sheets were losing Attributes, Initiative values, Matrix values (ASDF, AR, DR) resulting in many roll buttons not firing correctly, this seemed to be triggered only when importing a character to another lobby and was fixable by re-entering the base attribute values.
	Bugfix - roll20 can't make up their mind whether rolltemplate classes need to have sheet- or not.  Have templates now with and without, because, why not?
	Bugfix - Fixed a bug causing weapon dicepool to be displayed incorrectly (example: 2+0 was showing up as 20)  Rolls were correct.
	Bugfix - Display of essence cost was incorrect, fixed this.
	Bugfix - Added indication that the rating for a skill has not been entered.  Some users were entering the Skill Rating in the Mod box, causing all sorts of mayhem with roll buttons and such.
	Bugfix - Fixed a display issue with Social -> Contacts that had creeped in.
	Bugfix - Exotic Weapons for melee weapons wasn't adding the Exotic Weapons skill rating to the roll.
	NPC->Sprite sheet Added Attribute selector to Sprite skill roll button Intuition, Logic, Willpower, Charisma replaced with their ASDF equivelents.
	NPC->Spirit sheet now exists, doesn't have sheet-worker magic like the sprite sheet...yet.
	NPC->Spirit sheet now has the automation added.  attributes, DR, Initiatives, Condition Monitor, Move, Skills, Powers and Attacks will populate when spirit type or Force are first entered.  On subsequent changes to Spirit Type or Force skills, powers and attacks will be left alone UNLESS the "Reset?" toggle is turned on, in which case all will be set to the defaults for the new Spirit Type at the new Force.
	NPC->Vehicles sheet now has the autosoft toggles including 3 Targeting autosofts with weapon input box.
**2021-04-19** v.28 Chuz (James Culp)
	Removed "Astral Combat" from skills dropdown.
	Changed "Influence" to "Connection" in Social->Contacts
	Updated Social->Contacts layout
	Added send to chat button (chat bubble) to share contact information in chat and provide a connections and loyalty roll button to the GM (they whisper to GM)
	Added Social and Capacity to Arms->Armor section
	Added Summon Sprite button to Matrix->Technomancer->Submersion tab that links to Sprite Resist which in turn offers a Resist Fade button (similar functionality to Spirits)
	Bugfix - Fixed an issue with dicepools on non-pc sheets making it so you couldn't manually set the dicepools for weapons.
	Turned off auto-calculations for npc weapons and removed skill/spec/expert section since npcs are usually just assigned a dicepool
	Bugfix - fixed a bug with Core->Weapons roll button not updating when the weapon was updated in Arms->Weapon (things like Spec/Expert and Dice Mod changes weren't carrying over)
	Updated Qualities roll template to include Rating if there is one
	Added a send to chat button (chat bubble) to the Gear section, now you can show your GM the descriptions of your gear.
	Added Melee weapons to the NPC->Grunts and Vehicles sheets
	Updated a bunch of roll buttons across all sheets, at this point all buttons should print the character name in big text at the top, then what the roll is for below that.  If anybody finds some I missed let me know.
	Added the Sprint Modifier (normally +1 for PCs) to the PC sheet
	Added a Sprint roll button to the NPC sheets.
	Added Notes tab and section so the player can keep any notes they want.
	Added Rolls tab and (empty) section, this will be used for a future feature to give many commonly used rolls all together in one tab, currently it is just blank space.
**2021-04-12** v.27 Chuz (James Culp)
	PC - Magic - Conjuration  - Finished spirit roster section
	Added Resist Drain button to Spirit Summoning Resist roll output
	Fixed initiatives (meatspace and astral) on npc sheets being overwritten by automatic calculations
	Fixed Condition Monitor for Drones/Vehicles being overwritten and with wrong values.  Now they'll auto calculate when body changes but otherwise can be overwritten by the player.
	Added "legacy": false to sheet.json
	Added "Summon Spirit" button to Magic->Conjuring.  Using this button prompts for Type and Force of the spirit, does the roll then offers a "Spirit Resist" button in the output that the player or GM can click to roll the spirit's restist roll (Force x 2) which then outputs the hits from that so the player can roll drain.
	NPC - Made magic, resonance, force inputs disappear correctly when not needed or settings aren't being adjusted
	NPC - Made resists display when not in settings mode
	NPC - Grunt/Vehicle - Weapon section now uses same attributes as PC Ranged section so a previously created PC can be relatively seamlessly made into a grunt.
	Added Autosofts to PC Vehicles tab
	Added an indicator to PC-Matrix-Programs and NPC-Matrix-Programs to indicate which programs are running.
**2021-04-05** v.26 Chuz (James Culp)
	Fixed NPC defense roll buttons
	Added attr_speed for npc-vehicle sheet so it can be tracked on tokens
	Fixed NPC soak roll buttons
	Added cold sim and hot sim initiative modifiers and dice modifiers for all sheets
	Hid unnecessary Matrix AR and Cold Sim VR initiative for Vehicles, Sprites and Hosts
	NPC-Sprite - populate ASDF, Resonance and Initiative when sprite level or type is changed.
	NPC-Sprite when changing level or sprite type, if powers or skills are empty the sheet will auto populate them with the values from the CRB
	Added a bit of color to differentiate Skill vs. Speciallized vs. Expertise roll buttons.
	PC-Matrix-Technomancer (formerly PC-Matrix-Complex Forms) created
	New section now holds Complex Forms tab and submersion tab
	Added Submersion tab with Resist Fade button (for compiling), submersion level, echoes and sprites

**2021-03-29** v.25 Chuz (James Culp)
	Fixed Matrix ASDF indicator bubbles so 0 doesn't light up all 10 indicators
	Started changes for NPC sheets.
	Updated npc sheets image, settings and toggle headers.
	Styled npc toggles and attribute buttons
	Updated attribute roll buttons to be consistent with PC sheet buttons.
	Made Magic now visible if Awakened OR Spirit are selected
	Made Force only visible if Spirit is selected
	Updated styles and html to make settings hide/reveal correctly for non-pc sheets
	Updated matrix grid to work properly with 0 for a stat
	Changed npc pain tolerance to be in options
	Updated npc options -> grunt type (mundane, awakened, emergent, spirit) to be a select labeled Archetype
	Updated "Bonuses" and "Modifier" column variables for non-PC sheets.  They now have the proper name='' fields.
	DR, I/ID, AC, CM and Move (from npc stat blocks) are now represented along with common rolls (DR, Defense and Soak)	
	Some more style updates to npc sheets
	Updated some of the variables and layouts of the areas below Bonuses, Modifier and Options (still not ready for use really)

**2021-03-22** v.24 Chuz (James Culp)
	Beginning v.24
	Rearranged player/character names, toggles and navigation buttons in header - still tweaking layout
	Fix to patreon and roll20userid fields in sheet.json, maybe I'll be listed as a sheet author now.
	Finished adding Wild Die option to all dice rollers (I think) on PC sheet.
	Matrix Tab layout more or less complete and ready for script magic
	Settled on layout changes
	Completed Sheetworker to tie ASDF device buttons together (only one selected at a time)
	Completed Sheetworker to tie device primary checkboxes together (only one selected at a time)
	Completed Sheetworker to update Matrix Attack Rating and Matrix Defense Rating when A/S/D/F are updated
	Completed Sheetworker to update A/S/D/F to W/I/L/C when emergent checkbox is selected in options (making the character a technomancer)
	Matrix Device Essence Cost is now included in Essence automatic calculations
	Matrix Device Initiative Bonus is now included in Initiative automatic calculations
	Made Technomancer attributes and Complex Forms sections hide for non-technomancers
	Made device A/S/D/F assignment buttons and matrix condition monitor hide for technomancers
	Removed empty buttons in skills when no specialization or expertise was set.
	Linked primary device condition monitor to the condition monitor hexes in the Persona section
	Fixed a bug related to sheet_type being misread and making some automatic calculations not fire right (initiative bugs anyone?)
	Started in on Complex Forms
	Updated Matrix -> Complex Forms section
	When selecting a skill, have the correct default attribute auto-selected

**2021-03-15** v.23 Chuz (James Culp)
	Made sheet work with current roll20 "enhanced" code that has been partially rolled back Changed 
	Condition Monitors -> Settings -> Pain Tolerance to a select so it's obvious whether pc is selecting Low, High or none 
	Added functionality to the ammo counter, now when primary ranged weapon firing mode is changed the number of rounds updates the the correct amount (1, 2, 4, 10) 
	Added Mod field for skills to allow skill rolls to have bonuses added. Does not add to the actual skill dicepool just affects the skill roller. 
	Fixed Initiatives (Meat, Astral, Matrix x3) to now apply mods, dice mods and Config->Temp mods correctly. 
	Added Magic AR that auto calculates when logic/charisma, tradition or magic change to the Magic -> Meta box

**2021-03-08** v.22 Chuz (James Culp)
	Add Defense roll-button and DR roll-button to Core->Combat Info tab
	Updated Skills to split Skills and Knowledge/Languages into separate tabs
	Finished Magic->Spells, Preparations, Rituals, Adept Powers, Conjuring and Metamagic sections
	Minor formatting changes to css and html
	Bugfix DR not adding Body in
	Bugfix calculations for Cold and Hot Sim initiative roll buttons
	Bugfix Essence Mod not allowing a zero value
	Bugfix Removed roll query from flat attribute rolls
	Bugfix Added Athletics skill to ranged weapons
	
**2021-03-03** Chuz (James Culp)
	Included in roll20 repository for one-click access

**2021-02-28** Chuz (James Culp)
	Updated Social Tab, Contacts and SINs
	Changed the header Shadowrun logo to a smaller version, this may change again depending on feedback.

**2021-02-27** Chuz (James Culp)
	Updated Vehicle tab, players can document the basic stats for their vehicles here, no roll buttons included yet.

**2021-02-24** Chuz (James Culp)
	Tuned Magic->Spells display and dice roller

**2021-02-21** Chuz (James Culp)
	Added automated DR and resistance updates to Core Combat Info from Arms->Armor tab

**2021-02-15** Chuz (James Culp)
	Updated Core Combat Info->Primary Ranged Weapon section to display the new weapon data better
	Updated Core Combat Info->Armor section, now it's a soak damage button (body), Defense Rating box and Resists.  Still need to make the info update as armor is added in Arms->Armor

**2021-02-08 - 2021-02-14** Chuz (James Culp)
	Updated Arms->Armor
	Added "Modifications" text area to Augs and Gear for future functionality.
	Updated Core Combat Info->Primary Melee Weapon section to display the new data

**2021-01-16 - 2021-02-07** Chuz (James Culp)
	Revamped Weapons->Melee to remove unused fields (Reach, AP, etc) and add range blocks and Specialization and Expertise checkboxes.
	Added functionality so if Close Combat skill rating is changed it updates the dice roller for melee weapons that use that skill.
	Added dicepool to Weapons->Melee display
	Revamped Weapons->Range to remove unused fields
	Added functionality so if Firearms skill rating is changed it updates the dice roller for ranged weapons that use that skill.
	Added dicepool to Weapons->Range display

**2021-01-11 - 2021-01-15** Chuz (James Culp)
	Updated repeating items formatting
	Updated repeating items to make specialization and expertise buttons 15 characters if the actual display name is greater than 15

**2021-01-09 - 2021-01-10** Chuz (James Culp)
	Updated how Essence is displayed (breaks down aug cost and allows for manual modifications (critter effects that drain essence for example))
	Updated how movement was being displayed, rules are now 10m base and sprint is 15m + results of an Athletics+Agility check)
	Added Expertise to the skills section, having problems figuring out how to make the specialization and expertise roll buttons hide when there isn't a value for them.

**2021-01-07** Chuz (James Culp)
	Fixed Augmentations section and made it automatically update essence when augs are added/removed
	Removed some (but not all) mentions of limits since they don't exist in 6th world.

**2021-01-06** Chuz (James Culp)
	Fixed Skills section to work properly now

**2020-11-11** Chuz (James Culp)
    Pulled the branch sr6v2 previously worked on by clevett
	Created this CHANGELOG
	Fixed lift & carry to be body + willpower
	Fixed judge intentions to be willpower + intuition
	Fixed memory to be logic + intuition
	Fixed some minor typos found throughout the .html in comments
	Fixed update_wounds to handle High/Low Pain Tolerance correctly (this will probably need to be updated at some point)
	
	


