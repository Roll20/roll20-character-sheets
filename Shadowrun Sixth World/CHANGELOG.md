Change Log
==============================================
**2026-08-04** v.93 Caith (Rob Fouts)
	Modifiers and Effects
	Added separate manual Mod and Effects Mod values for attributes, skills, Social Rating and condition monitors.
	Added skill modifiers to the Effects modification system and ensured Effects change only Effects Mod values rather than manually entered modifiers.
	Added support for using a repeating item's rating in its Modifications field with values such as "body_modifier: rating_num".
	Added the +4 augmented modifier cap to attributes and skills. Situational roll modifiers remain exempt.
	Added an Ignore Mod Cap option for campaigns that do not use the +4 limit.
	Added ai_matrix_track_modifier and matrix_modifier to the Effects modification whitelist.
	Added pain_tolerance_effect as a supported Effect modifier for High and Low Pain Tolerance behavior without enabling unrestricted modifiers, kept separate from the manual Pain Tolerance selection.
	Added a Rebuild Effects control that reconstructs stored modifier totals from active modification rows and reruns derived-value synchronization.
	Updated the Genesis importer to clear successfully imported JSON and remove any stored importer text when the sheet opens, while preserving failed input for correction.
	Effects now default to disabled and display their calculated modifications on the sheet.
	Added a Statuses tab with repeating status presets, activation controls and automatic status-specific modifications.
	Added automatic initiative modifiers for Dazed, Hobbled and Nauseated, along with status-specific roll and movement effects.
	Active statuses are identified in affected roll results, including Hobbled movement and post-roll Sprint calculations.
	Added power-style activation controls to Gear, Augmentations, Adept Powers, Metamagics, Qualities, Devices, Programs, Complex Forms and Echoes.
	Power-controlled modifications now apply only while their row is enabled. Augmentation Essence costs remain active when an augmentation's modifications are disabled.
	Added a data migration that preserves the enabled state of existing rows whose modifications were already applied.

	Skills and Situational Modifiers
	Added separate Mod and Effects Mod columns to skills.
	Added the Skill Roll Modifiers tab for an open-ended list of situational modifiers assigned to specific skills.
	Skill rolls can select all applicable situational modifiers before rolling.
	Situational modifier dialogs open only when the Modifiers option is enabled and matching modifiers exist.
	Action rolls retain their trained, specialization and expertise choices even when situational modifiers are disabled.
	Added a Knowledge Skills list button and display-to-chat buttons for individual Knowledge and Language skills.
	Untrained skill rolls now use the linked attribute minus 1.
	Added skill-specific Specialization and Expertise selections with standard choices, custom entries and automatic conversion of legacy values.
	Added an Allow Additional Skill Training option that exposes one additional Specialization and Expertise per Skill after the primary entry is filled. Secondary choices are filtered to the linked skill, support direct rolls and training matching without stacking, and imports preserve all source training for a possible future open-ended Training tab.
	Added the optional High Strength Reduces Recoil house rule, reducing firing-mode Attack Rating penalties by 1 at Strength 7+ or by 2 at Strength 10+.
	Weapon Training Type selections now derive from the linked skill's Specializations and Expertise, automatically applying +2 or +3 when the selected training is learned.

	Rolls, Actions and Edge
	Added an Actions tab with Major and Minor Action sections, action-economy descriptions and Initiative (I) or Anytime (A) indicators.
	Added action buttons with descriptions, linked skills and attributes, skill notes, specialization or expertise choices and applicable situational modifiers.
	Added support for actions that offer a choice of skill or attribute, including Trip using Close Combat or Exotic Weapons and Agility or Strength.
	Updated Sprint action output to report "Sprint: [15 + hits] Meters".
	Added dynamic Major Actions and Minor Actions displays to the Attributes tab based on the initiative dice used by the latest initiative roll.
	Action economy updates for physical, astral, Matrix AR, Cold Sim and Hot Sim initiative rolls.
	Added an Edge tab containing Edge Boosts and Edge Actions grouped by Edge cost.
	Added descriptive mouseover text to Actions, Matrix Actions and Edge buttons.
	Expanded Matrix Actions with complete descriptions, situational skill modifiers and extended-test handling for Matrix Perception, Matrix Search and Probe.
	Added structured descriptive tooltips to Actions, Matrix Actions, Edge options, attributes and skills.
	Added Display Description controls to direct skill, Action and Matrix Action roll results.
	Edge reroll and conversion functions now prompt for their Edge cost and decrement the character's current Edge points rather than the Edge attribute maximum.
	Reroll misses costs 1 Edge per die, to a maximum of 4; converting rolled 4s costs 2 Edge each; rerolling hits costs 1 Edge per hit with no maximum.
	Updated internal chat action, reroll and extended-test links to target the immutable Roll20 Character ID, allowing character names containing special characters without changing the name displayed in chat.
	Added the immutable Roll20 Character ID to Personal Data and roll results for identifying the character that owns a roll.

	Combat and Weapons
	Weapon attacks now open applicable situational skill modifier dialogs from Core Combat and individual Arms weapon buttons.
	Added a Use Str option to melee weapons, allowing them to roll with Strength instead of Agility.
	Improved ranged weapon fire-mode initialization so Single Shot remains available when supported.
	Ranged attacks now decrement current ammunition without changing maximum ammunition.
	Single Shot uses 1 round, Semi-Auto 2, Burst Fire and Burst Fire Wide 4, and Full Auto 10.
	Added Not Enough Rounds handling for Burst Fire, including the reduced Damage Value and adjusted Attack Rating for partial bursts and Single Shot behavior when only one round remains.
	Added primary weapon selectors for ranged and melee weapons on Core Combat.
	Added per-weapon installed modifications for dice pool, Damage Value and Attack Rating, including range-specific Attack Rating modifiers.

	Gear, Weapon Mods and Armor Mods
	Reorganized the Gear pane into Gear, Weapon Mods and Armor Mods child tabs.
	Combined ranged and melee weapon modifications into one Weapon Mods list that can install a mod on any ranged or melee weapon.
	Weapon and armor mod lists display all mods, their installed item and Install or Uninstall controls.
	Added Modifications text fields to weapon and armor mods.
	Armor mods can be installed on a specific armor item and can modify DR, Chemical, Cold, Electric, Fire and Social ratings while consuming capacity.
	Modified armor ratings display both their base and adjusted values, such as "6 (7)".
	Added a Carried option to Gear and a Carried column in the Gear list.
	Removed the obsolete Has Mods option from ranged weapons.
	Added direct Mods buttons to the Arms Ranged, Melee and Armor sections.
	Added device-specific Program installation, separate Installed and Running states, and per-device running-slot accounting.
	Added support for added and dedicated program slots, Virtual Machine, RCC program and autosoft capacity, living personas, AI program exceptions and GM-approved slot overages.

	AI Characters and Matrix
	Added AI as a Character Type.
	Added distinct Firewall, Sleaze, Data Processing and Attack attributes for AI characters, with separate manual and Effects modifiers.
	Switching to AI copies Body, Agility, Reaction and Strength into the corresponding AI attributes, clears the living attributes and excludes their Effects modifiers from the conversion.
	Switching away from AI copies the AI attributes back and clears the AI attributes.
	AI Attack Rating is Attack + Sleaze and AI Defense Rating is Data Processing + Firewall.
	AI personas derive their Matrix ratings from the corresponding AI attributes when no device is marked as contributing to the Persona.
	Technomancer personas derive their Matrix ratings from their living persona rules when no device is marked as contributing to the Persona.
	Devices can be marked as contributing to Persona Matrix attributes; the highest contributed Attack, Sleaze, Data Processing and Firewall ratings are used, and selecting a Primary Device enables contribution by default.
	AI characters use Hot Sim initiative and hide physical, Matrix AR and Cold Sim initiative displays.

	Augmentation Grades
	Added a permanent Bad Luck control and Omega-grade Bad Luck handling for tests actually affected by an Omega-grade augmentation.
	Added Exoware Social Rating penalties and Physical Condition Monitor boxes.
	Added Cyberadept Gammaware Essence handling and configurable Gammaware side effects with functional Modifications fields.
	Gammaware side-effect controls display only on Gammaware augmentations.
	Added a per-augmentation Adapsin Therapy option that reduces eligible cyberware Essence costs by ten percent after grade and other adjustments, rounded down.

	Condition Monitors and Healing
	Added the AI Matrix Condition Monitor, calculated as 8 + half Firewall rounded up.
	AI characters hide and reset the Physical and Stun monitors; switching away from AI resets the AI Matrix Track.
	The AI Matrix Track has no damage-overflow limit.
	Added AI Natural Healing using Willpower x 2, with each hit removing one point of Matrix damage after an hour of rest.
	All Natural Healing rolls now remove one point of damage per hit rolled.
	Added Improved Restoration and Cascading Failure AI qualities to the Matrix Track settings.
	Improved Restoration heals one additional box when a healing interval rolls at least one hit.
	Cascading Failure increases an injured AI's wound penalty by 1 and causes the first wound to apply a penalty.
	AI characters ignore hidden High Pain Tolerance and Low Pain Tolerance settings.
	Corrected the three-box-per-row condition monitor layout and wound-penalty label positioning.

	Display Buttons and Help
	Added display-to-chat buttons to Adept Powers, Conjuring, Metamagics, Complex Forms, Submersion, Devices, Programs, Knowledge Skills, Effects and SINs.
	Effects chat output includes Name, Duration, Source and Notes but omits the Modifications field.
	SIN chat output includes Fake ID, Rating, Related Lifestyles, Licenses and Notes.
	Added a Help pane with Effects, Situational Modifiers and Gear help tabs.
	Documented supported Effects modifiers, situational skill modifiers, Gear modifications, Weapon Mods and Armor Mods.

	Attributes, Vehicles and Layout
	Added Edge to vehicle and drone sheets.
	Magic or Resonance is shown only for applicable character types and uses the correct displayed label.
	Expanded the Attributes pane to accommodate the added modifier columns.
	The "Base + Mod + Effects Mod = Total" heading now aligns with the value columns and hides with the modifier boxes.
	Standardized the Arms, Rolls, Gear and Help tab navigation.
	Updated sheet image references to use the Shadowrun Sixth World repository image paths.

	Weapons, Ammunition and Explosives
	Replaced the single primary ranged and melee weapon displays on Core Combat with multi-weapon lists controlled by a Show on Core toggle on each weapon.
	Core Combat weapon buttons now roll their corresponding repeating-row weapon directly, without requiring a primary weapon.
	Weapon modifications now apply to the weapon on which they are installed whether or not that weapon is displayed on Core Combat.
	Added editable current ammunition, maximum-ammunition limits and a Reload control to each displayed ranged weapon.
	Added an Ammo inventory tab with standard or custom ammunition categories, load types, caseless ammunition and quantities.
	Reloading now draws matching ammunition from inventory by category, load type and caseless state, and returns remaining loaded ammunition when changing load types.
	Expanded firing-mode names and reorganized Core Combat and Arms weapon fields for clearer Pool, Mod, Damage, Attack Rating, Mode and Ammo displays.
	Removed attack buttons from the Arms weapon lists so weapon attacks are initiated consistently from Core Combat.
	Replaced the Grenades section with Explosives supporting grenades, launchers and other explosive weapons with their appropriate skills and attributes.
	Explosives with no selected skill display their details to chat without making a roll.
	Melee weapons can now select any attribute for their attack roll and default to Agility.

	Martial Arts
	Added a comprehensive Martial Arts technique dropdown covering Firing Squad, Body Shop and Deadly Arts, with a Custom option.
	Existing free-text technique entries are preserved as Custom selections during conversion.
	Selecting a standard technique automatically fills Notes with its book and page reference and verbatim rules description.
	Existing generated technique summaries are upgraded to the verbatim text while manually written Notes remain unchanged.

	Spirit, Sprite and Grunt NPCs
	Modernized Spirit skills with editable ratings, manual modifiers and Effects modifiers.
	Spirit type and Force populate the appropriate inherent and optional powers; optional powers require selection and reset when Force changes.
	Added complete power and action descriptions, tooltips and Display Description controls to Spirit, Sprite and Grunt NPC sheets.
	Added spirit-specific weapon notes, Astral Combat attacks and source-book references.
	Standardized Spirit, Sprite and Grunt skill, power, action and weapon layouts for readable multi-column displays.
	Added functional initiative and power controls to Host IC and expanded the Host IC GM Helper.
	Weapon attack results now include a centered Roll Defense button that rolls for the selected target token and offers applicable defense modifiers.

	Vehicle and Drone NPCs
	Rebuilt the vehicle statistic block with Base, Mod, Effects Mod and calculated Value columns.
	Added full Edge and current Edge tracking, rollable Body, Pilot, Sensor and custom PC-style attributes.
	Added calculated autonomous initiative based on Pilot, with separate value and dice modifiers and action-economy displays.
	Reorganized Defense Rating, Piloted Defense Rating, Defense Roll, Soak, Matrix Defense Rating and Matrix Soak with calculated values and modifiers.
	Added editable Physical and Matrix Condition Monitor modifiers across NPC sheets.
	Added repeating Modifications, Programs and Skills columns with ratings, notes, expandable details and functional Modifications fields.
	Added vehicle and drone Actions with rules descriptions and tests, while retaining hideable legacy Modifications and Programs fields for compatibility.
	Standardized Spirit and Vehicle weapon layouts and revealed their dice-pool modifier controls.

	Rules and Roll Workflow
	Expanded the PC Actions, Matrix Actions and Edge tabs with options from the available rulebooks and descriptive tooltips.
	Matrix extended tests preserve their resistance test through every interval, and the unnecessary roll-reason prompt was removed.
	Updated the Attributes Movement display with separate Move and Sprint buttons and their calculated values.
	Situational modifiers can now trigger from either a linked Skill or Attribute and can optionally add or remove current Edge when the submitted roll occurs.
	Added a Spend Edge control to every Edge-option result, defaulting fixed costs to the listed value and variable costs to zero while deducting only from current Edge.
	Added canonical pre-application description previews to PC and NPC Status selectors.
	Deployed repeating Status rows, activation controls and automatic status modifications across the NPC sheets.
	Added firing-mode restrictions to Weapon Mods and an option to disable automatic ammunition tracking.

	Performance and Layout
	Canonicalized the shared Actions, Matrix Actions, Edge options and Status definitions so buttons, tooltips and rolls draw from one rules-data source.
	Scoped Program, weapon and vehicle synchronization to affected owners or rows while retaining authoritative full passes for structural changes.
	Isolated roll-processing state so overlapping rolls cannot leak weapon, action, Status or augmentation context into one another.
	Restored the compact sheet widths across PC and NPC layouts and consolidated safe legacy CSS conflicts affecting dark mode, Sprites, vehicle Autosofts and repeating controls.

	Bug Fix
	Fixed asynchronous Essence calculations by calculating all augmentation and Matrix-device Essence costs in one guarded update.
	Fixed overlapping Modifications changes losing updates by serializing modifier events and applying each event in one batched write.
	Corrected malformed Roll20 attribute references in field tooltips.
	Corrected the GM Helper settings selector so repeating-row settings display properly.
	Completed translation-key coverage across the source catalog and all locale files.
	Reduced worker console noise by gating development diagnostics behind a disabled debug logger while retaining actionable warnings and errors.
**2025-11-13 ** v.92 Chuz (James Culp)
	Added Patterncraft to skills
**2025-07-15 ** v.91 Chuz (James Culp)
	Bugfix - Minor bugfixes
**2025-07-11 ** v.91 Karovex
	Added 'fade_compiling_modifier' to support the Sprite Conduit echo bonus
	Added 'sprite_resist_dv_modifier' to suppor the Technoshaman compiling DV reduction
	Added Sprite levels 11-15
	Added New Sprite Types (Assassin, Defender, Modular, Music, Primal)
	Added CM and OS trackers per sprite
	Added Register Sprite macro chain
	Bugfix - While Compiling a Sprite, the 'Resist Fade' macro will now roll the proper stats (Willpower+Charisma instead of Willpower+Logic)
**2025-03-16 ** v.90 Chuz (James Culp)
	Added i18n values for translating many placeholders and some other labels throughout the Player facing sheet.  Thanks to Talon_Zorch for his hard work translating the sheet on Crowdin and compiling the list for me to add.
**2024-10-11 ** v.88 Chuz (James Culp)
	Added lwa spirits from Shadows In Focus: That Old Voodoo to the Spirit NPC sheet.  (Agwe, Azaca, Damballah, Erzulie, Ghede, Legba, Obatala, Ogoun and Shango)
**2024-06-05 ** v.87 Chuz (James Culp)
	Bugfix - Found an issue with imports where items would be dropped mysteriously.  This affected anything that was in a repeating list and was tied to unique ids within Roll20.  Added another check to prevent duplicate ids.
**2024-03-03 ** v.86 Chuz (James Culp)
	Bugfix - Essence Mod works again
	Added Omega, Exoware and Gammaware to Augmentation grade drop downs and essence calculations.  They do not however add the bad luck quality or extra condition monitor boxes when selected.
**2023-09-04 ** v.85 Chuz (James Culp)
	New Feature - GM Helper sheet, added extended test and d6 roll buttons so GMs can roll from the sheet if needed.
	Bugfix - PC Vehicles tab, handling mod was only reflected on the onroad handling value not the offroad value when settings mode was turned off.
	Bugfix - GM Helper sheet, incrementing OS using the + button was doing strange things, this has been fixed.
**2023-07-10 ** v.84 Chuz (James Culp)
	Bugfix - AoE Spells weren't adding the right amount of drain for 12m and 14m
	Bugfix - Attribute+Attribute selections were missing Strength
	New Feature - skill mods in the repeating skill list now should update those skills everywhere in the sheet.
	Bugfix - Sprint rolls now include -1 skill modifier if the PC doesn't have an Athletics skill.  Also added a function to resynch the hidden skill attributes any time a skill name is changed (via the drop down changing) or a skill is deleted.
	Bugfix - Fixed the increment button on the OS Tracker it now adds 1 instead of concatenating a 1 after the other digits sometimes.
**2023-06-15 ** v.83 Chuz (James Culp)
	New Feature - Beginning work on the GM Helper sheet, step 1 add an OS Tracker.  I'm open to suggestions for other helpful GM tools to include in this sheet in the usual venues (Discord, Patreon, Roll20 DMs)
	New Feature - GMs rejoice, select a token on the board and click the "Track Selected" button on the GM Helper character sheet to add the selected character's name and A/S/D/F to the tracker.
**2023-05-30 ** v.82 Chuz (James Culp)
	Update - Added Hack & Slash Matrix Actions to the Rolls Pane -> Matrix Roll Buttons
	New Feature - Added Matrix Roll Buttons Legality Filter, this allows you to hide illegal actions.  For pcs without a matrix persona or that are worried about OS
	New Feature - Added Matrix Roll Buttons Access Level Filter, this allows you to hide actions that are not usable at a particular Matrix Access Level (outsider/user/admin)
**2023-05-22 ** v.81 Chuz (James Culp)
	Bugfix - More weapon dicepool tweaks
	New Feature - NPC->Spirits made spirits awakened and now display the spells section for them.  Dicepool does not auto-update when spirit force changes, that is an exercise for the user.
	New Feature - Added Critter Powers drag and drop from the compendium for spirits and grunts.
**2023-05-18 ** v.80 Chuz (James Culp)
	Bugfix - PC Qualities were always showing up as Negative regardless of the actual type.
	Bugfix - PC->Spells Ranges of Touch were showing up as LOS.
	Bugfix - PC/NPC Defense rolls throwing an error for the armor_rating, updated PC sheets to use defense_rating so they match NPC sheets.
**2023-05-01 ** v.79 Chuz (James Culp)
	New Feature - Added Resonance and Level to the sprite skill rolls attribute options
	New Feature - Added Magic and Force to the spirit skill rolls attribute options
	New Feature - Added Magic AR to combat spell roll templates
	New Feature - PC Added DR to Defense rolls template
	New Feature - NPC Added Universal Dicepool Adjustment (@{uda}) for GMs that with to add a dicepool penalty/bonus to all rolls the NPC makes.
	Bugfix - Fix to Grunts dicepool bug.
**2023-03-20 ** v.77 Chuz (James Culp)
	Bugfix - (?) Trying to fix some dicepool bugs on NPC and Vehicle sheets tied to grunt groups.
	Bugfix - Vehicle physical and matrix condition monitors weren't updating right on drag and drop
**2023-03-13 ** v.76 Chuz (James Culp)
	Bugfix</b> - Fixed Spirit Astral initiative dice had been reduced to mere metahumanity levels, they've been returned to their previous exceptionalism.
**2023-03-06 ** v.75 Chuz (James Culp)
	New Feature - PC-Magic-Conjuring Added Astral Reputation and added AsRep to Summon Spirit button output
	New Feature - Added Heat, Reputation and AsRep to the Social Pane
	Added Drag and Drop support for Gear-Ammunition-Grenades Gear-Ammunition-Rockets to place them in the Arms-Grenades section instead of Gear
	Added Grenade dicepool calculations
**2023-02-27 ** v.74 Chuz (James Culp)
	Fix for matrix device stats on drag and drop for NPCs
	Fix for Sprite drag and drop issue
	NPCs->Grunts added a stun monitor and flag to display it (it is hidden by default)
**2023-02-23 ** v.73 Chuz (James Culp)
	Bugfix - PC Initiatives - Fixed a condition where if a dice mod is set and then the initiative base is changed it keeps adding the dice mod repeatedly.
**2023-02-20 ** v.72 Chuz (James Culp)
	Added Magic and Resonance to attribute roll buttons as additional options in the drop down
	Updated NPC Technomancer Complex Forms
	Updated NPC Drag&Drop for Spells to attempt to auto-populate the dicepool
	NPC Complex forms display changes
	NPC Complex forms roll buttons for no dicepool defined (uses attr_skill + resonance), dicepool defined (uses the dicepool) or description only (skill empty)
	Update - The old NPCspells repeating data should be retained just in case, for now.
	Bugfix - Updated calls to geneerateRowID to use a work around to prevent them (hopefully) from duplicating an already existing ID which caused drag and drop items to sometimes not apply properly, causing symptoms like drag and drop NPCs without all of their skills, attacks, or some other repeating item. Or even weirder once a Skill that got overwritten so it had a Specialization from another skill that wasn't there.
**2023-02-13 ** v.71 Chuz (James Culp)
	Added essence calculations for drag and drop (and others) allowing for Essence Base to be "Rating x #.##", also Grade calculations now.
	Added drag and drop for Augmentations
	Converted NPC Spell roll buttons to use the newer PC style
	Converted NPC Attack (ranged and melee) buttons to use the new roll buttons
	Converted NPC Attack (ranged and melee) buttons to use the new roll template weapon info block
	Updated Matrix Roll buttons to include inline opposed roll buttons.  To use these the target's token must be selected.
	Converted Grunt skill buttons to new style
	Converted Vehicle Autosoft roll buttons to the newer PC style
	Converted NPC attribute roll buttons to the newer PC style
	Converted NPC Initiative and Defense button blocks to the newer PC style
	Began adding weapon information as it's own section in the attack Roll Templates
	Added weapon info to Ranged attack Roll Templates
	Added weapon info to Ranged (Burst Fire Wide) attack Roll Templates
	Added weapon info to Melee attack Roll Templates
	Began adding tooltips at the bottom of Roll Templates.
**2023-02-06 ** v.70 Chuz (James Culp)
	Bugfix - PC Condition Monitor boxes broke if the maximum value was below 8.  Changed the minimum to 6 which is 0 body with Neoteny so should be unattainable.
**2023-01-17 ** v.69 Chuz (James Culp)
	Add Contacts drag and drop capability, you can now drag ANY NPC from the compendium and their name and description will be added to your contacts, also loyalty, connections and favors if the NPC has those attributes (currently none do)
	NPCs->Powers text added for all NPCs not just Awakened
	NPCs->Weaknesses text added for all NPCs
	NPCs->Spirits added Weaknesses to the Spirts sheet auto-generation code.
	Bugfix PCs->Armor didn't update DR when deleting armor entries
**2023-01-05 ** v.68 Chuz (James Culp)
	BugFix - drag and drop QSR Combat spells
	New Feature - Sprite drag and drop
	Bugfix - Sprite sheet matrix_max
	New Feature - Complex Forms drag and drop
	Bugfix - PC -> Modifications - changing astral_initiative_dice_mod was doing strange things to the astral initiative dice.  This has been fixed but if your character ended up with a messed up astral_initiative_dice amount look in "Attributes & Abilities" for "astral_initiative_dice" and change it to the correct ammount.
**2022-12-12 ** v.67 Chuz (James Culp)
	Update PC -> Magic -> Meta Tradition Hermeticism now displays as "Hermeticism (Logic)" and Shamanism now displays as "Shamanism (Charisma)" for clarity
	Bugfix NPC -> Vehicles - fixed vehicle/drone default actions
	New Feature - added alternate melee/ranged roll buttons on npc sheets.  If there's no dicepool set the alternate button prompts for skill and attribute values.
	New Feature - PC sheet Weapon Mods now allows JSON imports via Notes field.
**2022-12-05 ** v.66 Chuz (James Culp)
	New Feature - Added modifiers for primary_range_weapon_close_mod, primary_range_weapon_near_mod, primary_range_weapon_medium_mod, primary_range_weapon_far_mod, primary_range_weapon_extreme_mod, primary_range_weapon_damage_mod, primary_range_weapon_dicepool_mod for changing the ARs at various ranges and the damage for the primary weapon.
	New Feature - Added modifiers for single_shot_penalty_mod, semi_auto_penalty_mod, burst_fire_penalty_mod, burst_wide_penalty_mod, full_auto_penalty_mod for changing the AR penalties for firing modes.
	New Feature - Primary Weapon Mods section that allows a list of mods to be added and turned on/off to apply bonuses/penalties to ARs, DV, dicepool (not reflected in listed dicepool) and firing mode penalties. Upon changing primary ranged weapon, mods will be disabled, if the weapon has the "Has Mods" checkbox checked the screen will switch to the Mod selection screen.
	New Feature - Added Blood and the various Insect spirits from Street Wyrd
	New Feature - Updated spirits to allow my templates to have more than one melee or ranged attack.
	Update - There are now a maximum of 30 physical and 21 stun condition monitor boxes for PCs, these numbers should exceed the current theoretical maximums.
	Bugfix - Skill name for multi-word skills wasn't being formatted properly.
	Bugfix - At some point NPC -> Vehicle DR input and button disappeared, they've been found and replaced
**2022-11-21 ** v.65 Chuz (James Culp)
	Bugfix - PC Weapon skills weren't applying the -1 unskilled penalty to some skills, this has been updated however users will need to update the skill to something else and back to trigger the data change.
	Bugfix - PC Sheet imported from Genesis in a non-English language had many problems mostly related to skills.  I believe I've fixed these issues please report any new ones
	Bugfix - NPC Spell roll template issue where if drain was under 2 it added "Drain: 2" at the bottom of the description.
**2022-11-14 ** v.64 Chuz (James Culp)
	Bugfix - PC Judge Intentions wasn't updating on Willpower changes.
**2022-11-06 ** v.63 Chuz (James Culp)
	New Feature - PC Attribute roll buttons now prompt for a second attribute or custom dice modifier for those occasions when the DM says Roll Reaction+Intuition instead of Roll Defense
	Bugfix - PC Defense, Direct Magic Defense and Indirect Magic Defense roll buttons didn't include Wound Penalties (defense pretended to but didn't apply the penalty)
**2022-10-24 ** v.62 Chuz (James Culp)
	New Feature - PC->Matrix->ASDF Roll buttons now include more options to combine them with.  None, Custom, mind attributes and ASDF.
	New Feature - NPCs now have updated ASDF roll buttons as well!
	New Feature - NPCs now have the newer version of the d6's roll button and the new Extended Tests capability.
	New Feature - Added Extended Tests capabilities.
**2022-09-20 ** v.61 Chuz (James Culp)
	Bugfix - NPC->Spells were missing the Limited duration, added it.
	Bugfix - Charactersheet Tab - removed the underline.
	Bugfix - Updated Matrix Rolls trained prompt to say "Trained" instead of "No" (which made no sense)
**2022-09-13 ** v.60 Chuz (James Culp)
	Bugfix - PC->Rolls->Matrix actions including cracking were not using the Cracking skill rating but whatever the rating of the last updated skill was.  Fixed the bug causing this and loading the sheet the first time should update the attr_cracking value to be correct again.
**2022-08-30 ** v.59 Chuz (James Culp)
	Bugfix - Non-PC sheets were broken anywhere that a textarea (notes style) entry existed you couldn't display it to add or edit the values.
	New Feature - character_name sanitization.  Sometimes we want to use names with characters that will break roll buttons and other parts of the sheet.  This replaces the bad characters with an asterisk *
**2022-08-16 ** v.58 Chuz (James Culp)
	New Feature - Added the ability to change the ammo type in use on Core->Primary Ranged with the AR and DV changes applied.  Default will be Standard.
	New Feature - Added split rolls for Burst Fire Wide firing mode on the Core->Primary Ranged weapons.  This splits the dicepool (on odd pools the left roll Atk 1 gets the extra die).  If Wild Dice are toggled on a prompt will appear for each attack.  Glitches are calculated for each attack separately.
**2022-08-08 ** v.57 Chuz (James Culp)
	Bugfix - Updated mouseover text for Metamagics to indicate they are repeating metamagic not repeating powers
	Bugfix - Updated Non-PC sheets to have Matrix AR, Matrix DR, Matrix Soak and Biofeedback Soak buttons as appropriate in the Defenses Pane
	New Feature - Some updates to the Magic->Meta tab to clean up the layout and put a Magic AR button there as well.
	Bugfix - Fixed some weirdness with Social->Sins and Social->Contacts pane styles.
	Bugfix - (not really a bug) updated the color for the Edge and Matrix Condition Monitor hexes to be the purple everything else is.	
	New Feature - Added Matrix Soak and Biofeedback Soak buttons to Core Pane and Matrix Pane
	New Feature - Added Damage Type to Combat spells in Magic->Spells pane, the Damage Type selector will disappear for non-combat spells.
	New Feature - Updated Effect Type to hide values that make no sense (i.e. Single Sense / Multi Sense for anything but Illusion spells and The 4 combat options for any non-combat spells)
	New Feature - Updated Spells to make it so the pop-up prompts for Amp-Up and Increase Area ONLY pop up when the spell is of the right type.  Only Combat spells get "Amp Up" prompts, Only "LOS (A)" spells get "Increase Area" prompts.  The "Agony" spell is by definition LOS but acts like LOS (A) in that it can be extended to multiple targets, you will want to enter it as LOS (A) there may be other similar spells.
	New Feature - Added Notes->Updates Pane to display most recent changes.  The sheet will automatically open to this page if changes are made to functionality that need to be highlighted.
	New Feature - Added the Primary button to Arms->Melee weapons with the same functionality as the Arms->Ranged weapons have.
	New Feature - Arms->Ranged now have a Default Firing mode selection.  This will be the selected firing mode when you initially set this weapon to primary, or if you change this while it's the primary weapon it will set the firing mode on the primary weapon as well.
**2022-08-04 ** v.56 Chuz (James Culp)
	Bugfix - There were 10 repeating sections that didn't use "name" for the name field.  Fixed this to make other automated tasks easier to achieve in the future.
	New Feature - added Composure roll button to Grunts
	Bugfix - Cleaned up non-PC sheets to show condition monitors better (including the max)
	Bugfix - Fixed how display of matrix device and matrix roll buttons work.
	New Feature - normalized the styling on non-PC sheets a little bit to help mark separate sections better.
	New Feature - Added Logs section under the Notes Pane for keeping track of missions and rewards.  This is purely for note taking purposes and isn't automated anywhere.
**2022-07-26 ** v.55 Chuz (James Culp)
	Bugfix - Imports choked if the character in Genesis has a lifestyle that is not associated with a specific SIN, the code is more forgiving for this now.
	New Feature - Added Edge Roll buttons to most PC sheet roll buttons on the sheet.  These can be toggled on/off via the check box in the Options Pane if you don't want them for your character/campaign.
	Bugfix - There was an extraneous } character on the D6 roll button, it has been nullified.
	Bugfix - Minor style changes to Options Pane and main rolls-computed roll template.
	Bugfix - fixed css on PC matrix devices so the notes expand the full width when displayed.
	Update - Due to changes in the latest CRB printing, matrix device initiative bonuses have been verified to be a dice bonus, updated initiatives to reflect that.
	Bugfix - Found an error condition where an item (program for example) with an on/off switch that was using modifications when deleted, even when turned off reversed the modifications causing data issues.
	Bugfix - Fixed mistyped attribute names in the modifications whitelist astral_initiative_dice_mod, matrix_initiative_dice_mod, cold_sim_initiative_dice_mod and hot_sim_initiative_dice_mod modifiers should now work in modifications boxes.  The mouseover titles have been fixed as well.
	Bugfix - NPC Wound modifiers are now correctly applying per TWO boxes of damage, per CRB pg.203.
**2022-07-22 ** v.54 Chuz (James Culp)
	New Feature - Added Notes imports to all repeating sections with a notes field except Sprites and Spirits (players should really be using separate character sheets for these)
**2022-07-20 ** v.53 Chuz (James Culp)
	New Feature - Quality of life addition, newlines and spacing put in notes fields should be preserved when displaying the notes.
	New Feature - Added Resist Toxin button to the Core Combat Info Pane
	Bugfix - Fixed the annoying bug that caused the Initiative roll button to not display properly
	New Feature - Added Matrix Noise field on the PC Rolls Pane that is included as a negative modifier in the roll buttons found there
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
	
	
