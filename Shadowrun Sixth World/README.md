# Shadowrun Sixth World

## Roll20 Character Sheet Guide

*Expanded and corrected for sheet version 0.93*

*Player, gamemaster, and sheet-maintainer reference*

## About this guide

This guide replaces the earlier v.51-era instructions with the behavior of the current v.93 sheet. It retains the original guide's basic operating instructions, corrects obsolete workflows, and documents major components that were previously missing. It is a usage guide rather than a rules replacement; when a sheet automation and a published rule appear to conflict, confirm the rule with the gamemaster and report the sheet behavior for review.

> **Important:** Screenshots in the older online guide may show retired controls such as Primary Weapon sections, older modifier fields, or earlier tab layouts. Follow the controls and workflows described here.

### Contents

- 1. Quick start and sheet-wide controls

- 2. Personal Data and Options

- 3. Attributes, Edge, movement, initiative, and condition monitors

- 4. Skills, Knowledge, training, and situational modifiers

- 5. Core Combat and Arms

- 6. Gear, ammunition, weapon mods, and armor mods

- 7. Augmentations and qualities

- 8. Magic, Matrix, Persona, Social, Vehicles, Notes, Rolls, and Help

- 9. NPC and GM sheets

- 10. Effects, Statuses, and modification syntax

- 11. Imports, migrations, chat output, and troubleshooting

- Appendices: modifier keys and workflow references

## 1. Quick start and sheet-wide controls

### Sheet type and character type

The sheet type selector changes the entire presentation between PC, Grunt, Spirit, Host, Sprite, Vehicle, and GM Helper layouts. On the PC sheet, Character Type in Options controls Mundane, Awakened, Technomancer, and AI behavior. These settings affect visible attributes, condition monitors, Persona calculations, and some automation; choose them before entering large amounts of data.

### Toggle bar and common icons

| Control | Purpose |
| --- | --- |
| Settings / cog | Shows or hides editable settings for the current section or repeating row. |
| Power toggle | Enables or disables an entry's Modifications. New power-controlled rows default to disabled. |
| Display / chat | Sends an item's selected descriptive fields to chat without making a test. |
| Info | Expands notes or description content without changing mechanics. |
| Repeating-row Add / Modify | Adds, reorders, or removes list entries using Roll20's repeating controls. |
| Macro Options | Controls roll prompts such as situational modifiers and other roll-time choices. |

The upper toggle bar controls common roll behavior such as public or GM output, Edge-related options, wound penalties, and modifier prompts. A control's exact effect is normally described by its mouseover tooltip.

### Navigation

The left side holds Personal Data and Attributes. The right pane uses high-level tabs for the character's detailed records. Several high-level tabs contain child tabs. The available tabs vary with sheet and character type.

| High-level area | Main contents |
| --- | --- |
| Core | Combat summary, displayed weapons, armor and condition information. |
| Arms | Ranged, Melee, Explosives, Armor, and weapon configuration. |
| Augs | Qualities, augmentations, grades, essence, and grade-specific controls. |
| Gear | Gear, Ammo, WPN MODS, and ARMOR MODS. |
| Magic | Spells, adept powers, conjuring, martial arts, metamagic, and related records. |
| Matrix / Persona | Complex forms, echoes/submersion, devices, programs, Persona ratings, and Matrix resources. |
| Social | Contacts, lifestyles, SINs, licenses, Social Rating, and notes. |
| Vehicle | Owned vehicles and drones; the dedicated Vehicle sheet handles their full statistics. |
| Notes / Update | Freeform notes and the current Most Recent Updates list. |
| Rolls | Actions, Matrix Actions, Edge options, and Miscellaneous rolls. |
| Help | Current guidance for Effects, Situational Modifiers, and Gear modifications. |

## 2. Personal Data and Options

### Personal Data

Personal Data contains the character name, primary alias, metatype, identity details, background fields, and descriptive information. The immutable Roll20 Character ID is displayed beneath Name / Primary Alias for macros and support work. It is read-only.

> **Important:** Names containing punctuation, parentheses, quotes, or other special characters are supported by the sheet's layered roll-callback handling. For robust external macros, use the displayed immutable Character ID instead of building callbacks from the character name.

### Options

- Choose Sheet Type and Character Type before configuring derived systems.

- Enable Unrestricted Modifiers only when you intentionally need a modification key outside the whitelist. Incorrect attribute names can create or overwrite unexpected Roll20 attributes.

- Rebuild Effects, located below the Genesis importer, clears dedicated stored Effects totals and reconstructs them from currently active modification rows. It also reruns derived-value synchronization. Use it to repair stranded or inaccurate modifier contributions, then review any legacy fields shared with manual input.

- Ignore Mod Cap allows attribute and skill enhancement bonuses to exceed the normal combined +4 cap. Uncheck it to restore the cap immediately.

- Bad Luck records the character's permanent Bad Luck state. Omega-grade augmentation handling is attributed only when the relevant augmentation participates in a test.

- Macro Options determines whether supported rolls offer situational modifier selection and other roll-time choices.

- Disable Ammo Tracking prevents ranged attacks from decrementing loaded ammunition while leaving weapon and ammunition fields available for reference.

- Cyberadept Gammaware enables the special Gammaware Essence multiplier for characters following that quality path.

## 3. Attributes, Edge, movement, initiative, and condition monitors

### Attribute rows

Each normal attribute shows Base, Mod, Effects Mod, and the calculated value. Mod is user-entered. Effects Mod is read-only and is calculated from active Effects, Statuses, gear, augmentations, programs, and other supported modification sources. Positive attribute and skill enhancements from Mod plus Effects Mod are capped at +4 unless Ignore Mod Cap is enabled; negative modifiers are not capped.

Magic is displayed for Awakened characters and Resonance for Technomancers. Mundane characters do not display that row. AI characters use distinct Matrix-equivalent attributes in place of physical attributes: Body corresponds to Firewall, Agility to Data Processing, Reaction to Sleaze, and Strength to Attack. Magic is unavailable to AI characters; an Emergent Intelligence uses Resonance.

#### AI conversion

When an existing character changes to AI, the sheet follows the Matrix Equivalent Attributes table: Body is copied to Firewall, Agility to Data Processing, Reaction to Sleaze, and Strength to Attack, then the original physical ratings are cleared. Changing away from AI restores those values in the opposite direction. Effect-derived modifiers are disabled for the conversion and are not transferred; manually entered Mod values are retained for review and correction.

### Derived tests and movement

Composure, Judge Intentions, Memory, Lift/Carry, Move, and Sprint update from their linked attributes and modifiers. Move and Sprint are buttons, while the right side shows the current modified distances. Sprint uses Athletics and applicable training or situational modifiers; its result reports total meters. Hobbled halves Move and halves the final Sprint distance after the Sprint roll.

### Edge

The Edge attribute is the maximum rating. The fillable Edge boxes below it are current Edge and are the resource spent by automated Edge functions. Post-roll controls may reroll misses, convert rolled 4s, or reroll hits. Automatic costs remain attached to the eligible friendly functions; hostile Reroll Hits is intentionally not auto-charged.

### Initiative and action economy

Physical, Astral, Matrix AR, Cold-Sim, and Hot-Sim initiative each use their appropriate value and dice. Initiative rolls update the displayed Major Actions and Minor Actions from the number of initiative dice used. AI initiative always uses Hot-Sim and hides inapplicable initiative modes.

### Condition monitors

Physical and Stun maximums are calculated from the appropriate attributes and separate manual and Effects modifier fields. Each condition box is one point; boxes are arranged three per row, with each completed row corresponding to a -1 wound penalty. Natural Healing rolls remove one point of damage per hit.

Pain Tolerance in Condition Monitor settings is the manual High/None/Low selection. Active modifications may separately use `pain_tolerance_effect:1` for High Pain Tolerance behavior or `pain_tolerance_effect:-1` for Low Pain Tolerance behavior. The sheet combines the two signed values: a positive total reduces the combined Physical and Stun wound penalty by 1, a negative total doubles it, and magnitudes beyond 1 have no additional effect.

AI characters hide Physical and Stun tracks and use a Matrix Track equal to 8 + half Firewall, rounded up. AI Matrix damage has no overflow limit. Changing into AI clears Physical and Stun damage; changing away clears Matrix damage. AI Natural Healing rolls Willpower x 2 once per hour of rest and removes one Matrix damage per hit. Improved Restoration heals one additional box when at least one hit is rolled. Cascading Failure causes the first wound penalty at one box of Matrix damage and increases subsequent wound penalties by one.

## 4. Skills, Knowledge, training, and situational modifiers

### Skills

Skill rows contain Rating, manual Mod, Effects Mod, specialization, expertise, notes, and descriptive roll behavior. Clicking a skill makes its linked attribute test. If a required skill is not learned, supported Actions and weapons use Unskilled Skill Use: linked attribute minus 1.

#### Specializations and Expertise

Each skill offers skill-specific standard choices plus Custom. Expertise grants +3 when the selected use exactly matches; a matching specialization grants +2. Legacy specialization and expertise text is migrated: recognized choices select the standard value and other text is retained as Custom.

### Knowledge and Language skills

Knowledge and Language entries have chat display buttons. The list button at the top reports the names of all known Knowledge and Language skills. These records are descriptive and are distinct from the core skill ratings used in normal tests.

### Situational Modifiers

Use the Modifiers child tab beside Skills and Knowledge to create any number of contextual bonuses, penalties, or situational Edge changes. Each row can trigger from either a Skill or an Attribute, gives the circumstance a name, stores a signed dice-pool value, and may add or remove current Edge when selected. Combination matching is not required: a row matches its selected Skill or its selected Attribute.

1. Add a modifier row and select either its triggering Skill or Attribute.

2. Enter a clear label, signed dice-pool value, and optional signed Edge-hex change.

3. When a matching Skill or Attribute is rolled, select every listed circumstance that applies.

4. Submit the modifier panel and then submit the final roll. Selected dice modifiers are totaled and named in chat; Edge changes occur only when the final roll is actually executed, so canceling an earlier prompt spends or grants nothing.

Direct skill and attribute rolls, weapons, Actions, Matrix Actions, defense rolls, and Athletics-based Sprint can use matching situational modifiers. The panel appears only when Macro Options permits modifiers and matching entries exist, except that Actions may still open their panel to offer skill, attribute, or training choices.

### Descriptions and tooltips

Attribute, skill, Action, Matrix Action, Edge, power, and similar buttons use structured mouseover text with separate lines or paragraphs. Direct skill rolls from the Skills tab include Display Description in chat. Rolls invoked through an Action use the Action's description instead of adding a second skill-description control.

## 5. Core Combat and Arms

### Core Combat

Core Combat is the play-facing attack area. The legacy Primary Ranged Weapon and Primary Melee Weapon sections are hidden. Any ranged or melee weapon with Show on Core enabled appears in the Core list and rolls its own repeating-row data; no primary designation is required.

#### Ranged attacks

A ranged weapon row shows the attack button, pool, damage, range-band Attack Ratings, mode, load, current/max ammunition, and reload. Fire modes include full names such as Single Shot, Semi-Auto, Burst Fire, Burst Fire Wide, and Full Auto. A shot decrements current ammunition only.

| Mode | Rounds used |
| --- | --- |
| Single Shot | 1 |
| Semi-Auto | 2 |
| Burst Fire | 4 |
| Burst Fire Wide | 4 |
| Full Auto | 10 |

If a four-round Burst Fire attack has too few rounds, the sheet applies Not Enough Rounds adjustments at resolution: three rounds reduce the normal AR penalty by 1; two rounds reduce it by 2 and reduce the Burst Fire DV bonus from +2 to +1; one round is treated as Single Shot by applying -2 DV and +4 AR relative to the selected Burst Fire values.

#### Reload and ammunition

Reload uses the weapon's Ammo Category, Load, and Caseless choice to withdraw matching rounds from the Gear tab Ammo inventory. Current Ammo is editable on Core but cannot exceed Maximum Ammo. Changing ammunition type with rounds still loaded preserves inventory accounting by returning or consuming the appropriate quantities.

#### Defense from chat

Weapon attacks include a centered Roll Defense button. The defending user selects the appropriate token before pressing it. Defense rolls can open an option panel for roll-specific defense modifiers such as Full Defense. If no valid represented token is selected, Roll20 reports the targeting requirement.

### Arms

#### Ranged

Configure the weapon name, linked skill, ammo category, pool modifier, damage, Attack Ratings, maximum ammo, firing modes, default firing mode, training type, and Show on Core. Calculated roll fields are read-only. The weapon name in Arms is no longer an attack button; attacks originate from Core.

#### Melee

Melee mirrors the ranged layout where useful but has no ammunition controls. Its attribute selector can use any attribute and defaults to Agility. Training Type is matched against the chosen skill's learned specialization or expertise.

#### Explosives

The former Grenades tab is now Explosives and supports thrown grenades, launchers, rockets, missiles, and other explosive weapons. The Skill dropdown determines the test. Selecting None makes the Core button display the weapon details to chat without rolling.

#### Armor

Armor records base DR, environmental resistances, Social value, capacity, and installed modifications. When a mod changes a value, the display shows base and modified values in the form 6 (7). Armor Mod capacity is consumed while installed, while its other bonuses require the mod's power toggle.

## 6. Gear, ammunition, weapon mods, and armor mods

### Gear

Gear rows record name, rating, quantity, carried state, source, notes, and Modifications. Carried displays True or blank in the list and is informational. The power toggle independently enables or disables the row's Modifications. The row Rating can be referenced with rating_num, including negative and multiplied forms.

### Ammo

Ammo inventory rows choose a standard category or Custom, an ammunition load type, Caseless status, and Amount. Include DMSO where applicable. Reload looks for an exact category, load, and caseless match, so keep weapon and inventory selections consistent.

### Weapon Mods

WPN MODS is one shared list for ranged and melee weapons. Install selects any weapon on the sheet. Installed On shows the assignment. A mod may add Pool, Damage, All AR, Close, Near, Medium, Far, and Extreme values. All AR combines with the selected range band. A firing-mode restriction can limit a mod to Any, Single Shot, Semi-Auto, Burst Fire, Burst Fire Wide, or Full Auto without changing its power-toggle state. Mods apply only to their installed weapon, whether or not it is shown on Core.

### Armor Mods

ARMOR MODS assigns each entry to a specific armor item. Dedicated values are Capacity, DR, Social, Chem, Cold, Electric, and Fire. Capacity is consumed while installed; other bonuses require the Active toggle. Both weapon and armor mod rows also provide Notes and a text Modifications field for supported key/value syntax.

## 7. Augmentations and qualities

### Power controls and Essence

Augmentations have a power toggle that enables or disables only their Modifications field. Essence cost remains applied because implantation is a persistent change. New rows default to disabled so newly entered modification text cannot change the sheet unexpectedly.

### Grades

- Exoware applies its Social Rating penalty and contributes its additional Physical Condition Monitor boxes.

- Omega-grade Bad Luck is attributed only to tests in which the Omega augmentation is involved; it is not a sheet-wide penalty merely because an Omega item exists.

- Cyberadept Gammaware uses its special Essence multiplier.

- Gammaware side-effect controls appear only for Gammaware and can apply configurable side-effect Modifications while active.

- Adapsin Therapy can be checked on eligible cyberware installed after treatment. It reduces the adjusted Essence cost by 10 percent after grade and other adjustments, rounded down. Do not use it for bioware.

### Qualities

Quality rows can use the same power-controlled Modifications syntax. AI qualities Improved Restoration and Cascading Failure are represented in the AI condition-monitor settings because they alter Matrix healing and wound penalties directly.

## 8. Magic, Matrix, Persona, Social, Vehicles, Notes, Rolls, and Help

### Magic

Magic records spells, adept powers, conjuring entries, martial arts techniques, metamagics, and related notes. Adept powers, metamagics, and other supported repeating rows have power toggles for their Modifications and chat-display controls where appropriate. Martial arts techniques use a comprehensive standard dropdown plus Custom; selecting a technique fills its book/page reference and rules description into Notes while preserving legacy entries as custom values.

### Matrix

Complex Forms and Submersion/Echo records have display-to-chat controls and power-controlled Modifications. Matrix Actions are launched from Rolls and use the same situational modifier framework as other skill tests.

### Persona: devices

A device can be marked Primary Device and separately marked Contributes to Persona. Primary defaults contribution on, but contribution is the controlling rule. When one or more devices contribute, the Persona takes the highest available Attack, Sleaze, Data Processing, and Firewall ratings from those devices. Technomancers and AIs use their innate derived ratings only when no device contributes. Matrix Reconfigure arrangements are preserved instead of being overwritten by contributor recalculation. For AI characters, AI Optimized Home Device appears only on Devices and may be selected on only one Device; it adds 4 to that Device's rating.

### Persona: programs and slots

Each Program is assigned to one Device. Assignment is the single source of truth for installation; Installed On and slot accounting derive from that assignment. A separate Running control determines whether an installed Program currently consumes capacity and applies its Modifications. Devices track Program Slots, Slot Modifier, Dedicated Slots, Virtual Machine, and GM Override. Program rules also account for RCC autosofts, living personas, AI exceptions, and Software Emulator. Slot overages are reported but can be retained with GM Override.

> **Important:** 'Not installed' means no device assignment exists. 'Running while not installed' identifies an invalid state in which Running is on but the program has no assigned device.

### Social

Social contains contacts, lifestyles, SINs, licenses, and notes. Social Rating has separate manual Mod and Effects Mod values. SIN chat display includes Fake ID, Rating, Related Lifestyles, Licenses, and Notes.

### Vehicle list

The PC Vehicle tab is an ownership/reference list. Use the dedicated Vehicle sheet type for full vehicle and drone statistics, autonomous initiative, defenses, programs, modifications, skills, weapons, actions, and condition monitors.

### Notes and Update

Notes stores character notes. Update displays Most Recent Updates from the sheet HTML; it is not loaded from a separate changelog file.

### Rolls

#### Actions

Actions are grouped into Major and Minor sections and labeled Initiative (I) or Anytime (A). Buttons open a choice panel when the action needs a skill, attribute, training type, or situational modifiers. Unlearned skills use linked attribute -1. Results include Display Description rather than printing long rules text automatically.

#### Matrix Actions

Matrix Actions show their skills, attributes, legality/opposition, and descriptions in mouseover text. Matrix Perception, Matrix Search, and Probe use the Extended Test workflow, and their resistance information is preserved through each interval. Results include Display Description.

#### Edge

The Edge tab groups Edge Boosts and Edge Actions by cost, from 1 Edge at the top to 5 Edge at the bottom. Mouseover text identifies type, cost, and rules description. Every Edge-option chat result includes Spend Edge: fixed-cost options default to their listed cost, while variable or unknown costs default to 0. The submitted value is deducted from current Edge hexes. Not every option automates its complete rules effect; descriptive controls remain available for manual resolution.

#### Misc

Misc holds general-purpose tests and older utility rolls not represented by a specific Action button.

### Help

Help contains Effects, Situational Modifiers, and Gear child tabs. It is the most current in-sheet reference for modifier syntax, whitelisted fields, power controls, specialization matching, and installed mod behavior.

## 9. NPC and GM sheets

### Grunt

The Grunt sheet provides attributes, skills, powers, actions, notes, condition monitors, initiative, defenses, and matched ranged/melee weapon layouts. Power and Action buttons have tooltips and chat results with Display Description. Weapon attacks use the same defense-chat workflow as PC attacks.

### Spirit

New Spirit sheets default Spirit Type to Select Type so the user must choose a type before population. Selecting Spirit Type and Force builds the appropriate default attributes, skills, powers, weapons, and source notes. Skill levels remain adjustable through modifiers. Optional powers are listed with a selection checkbox; unselected options remain dimmed and retain their tooltip but cannot roll. Changing Force clears selected optional powers because it represents a newly summoned spirit. Spirits with Astral skill receive Astral Combat. Power-derived weapons include relevant notes such as Elemental Attack details. The functional condition monitor is positioned immediately above Statuses and uses the same box-filling presentation as the PC sheet.

### Sprite

New Sprite sheets default Sprite Type to Select Type so the user must choose a type before population. Sprites use the same modernized skill, power, action, notes, tooltip, and description-button patterns as Spirits. Type and Level populate appropriate defaults while custom rows remain available. Modular sprites retain their rules-defined optional-power choices; this is distinct from Spirit optional powers. The functional Matrix condition monitor is positioned immediately above Statuses and uses the standard condition-box presentation.

### Host / IC and GM Helper

The GM Helper can load Host and Active IC data. IC initiative and power buttons use direct worker handling, tooltips, and Display Description. Active controls determine which IC entries participate. Load Selected Host copies the chosen stored host data into the helper's active working area. The status-button grid can apply a selected status to a represented token when companion API support is available; without that API component, the sheet provides the controls but cannot write to another character sheet.

### Vehicle / Drone

Vehicle statistics are arranged in two five-column groups: statistic, Base, Mod, Effects Mod, and Value. Edge is displayed below the main block with separate maximum and current Edge. Custom Attributes can be added from the normal PC attribute list and rolled with optional linked attributes. Pilot, Sensor, and custom attribute rolls offer the vehicle-appropriate attribute dropdown, including Armor, Pilot, and Sensor.

Autonomous initiative derives from Pilot plus initiative Mod and Effects Mod, with separate initiative-dice Mod and Effects Mod. Jumped-in vehicles use the controlling rigger's initiative instead. The action-economy display reads Major Actions and Minor Actions.

Defenses show calculated Defense Rating, Piloted Defense Rating with an entered driver Piloting skill, Defense Roll, Soak, Matrix Defense Rating, and Matrix Soak, each with the appropriate mod control. Physical and Matrix condition-monitor maximums have manual and Effects modifiers. Both functional monitors appear immediately above Statuses and dynamically collapse unused vertical space. Every three boxes of Physical damage increases vehicle or drone Handling by +1 until repaired; the Physical track displays this as +1 H, +2 H, and so on. Matrix damage applies its calculated penalty to vehicle and drone rolls and identifies that penalty as Wounds in roll results.

The modern vehicle panels combine Modifications, Programs, and Skills in a three-column layout. Programs have Rating and functional Modifications. Vehicle Modifications can change vehicle values through the NPC modifier engine. Actions appear below Programs. Legacy Programs and Legacy Modifications remain at the bottom, hidden by default for backward compatibility.

## 10. Effects, Statuses, and modification syntax

### Effects

Effects are user-defined timed or sourced entries with Name, Duration, Source, Notes, Modifications, and Active. Display to Chat includes Name, Duration, Source, and Notes but intentionally omits Modifications. Effects apply only while Active and reverse cleanly when deactivated or removed.

### Statuses

Statuses use their own repeating list rather than generating Effects. Hovering a preset before adding it previews the canonical name, source, and description. Choosing a preset creates a disabled row with the status value or damage code, duration, source, description, and automatic Modifications where supported. Status-specific automation includes initiative changes, condition-based roll attribution, cancellation behavior, and Hobbled movement/Sprint handling. NPC sheets use the same repeating Status workflow.

### Writing Modifications

Enter modifier_name:value and separate multiple entries with commas. Positive and negative integers are supported. On a repeating row with Rating, use rating_num, -rating_num, or rating_num*X. Example: body_modifier:rating_num, perception_modifier:-1.

Active sources write to Effects Mod or the matching calculated subsystem; they do not overwrite a user's manual Mod. Unknown keys are ignored unless Enable Unrestricted Modifiers is enabled.

Standard Initiative, Initiative Dice, Composure, Judge Intentions, Memory, and Lift & Carry keep sourced Effects modifiers separate from their user-entered Mod fields. Their accepted modification keys remain `initiative_mod`, `initiative_dice_mod`, `composure_modifier`, `judge_intentions_modifier`, `memory_modifier`, and `lift_carry_modifier`.

`minor_actions_modifier` permanently adjusts the initiative-derived base Minor Actions display while its source is active. The sheet keeps separate manual and Effects values and continues to enforce the five-Minor-Action maximum.

Use `pain_tolerance_effect` for temporary or sourced High/Low Pain Tolerance behavior; it is distinct from the manual dropdown. Rebuild Effects in Options reconstructs supported stored Effects totals from active rows. It can clear unrestricted keys still present in existing rows, but it cannot discover a modifier that existed only in a row already deleted.

## 11. Imports, migrations, chat output, and troubleshooting

### Genesis import

The Genesis importer converts supported Genesis JSON data into sheet fields and repeating rows. Import into a backup or duplicate character first, then verify attributes, skills, gear, augmentations, spells, and derived totals. Unsupported or differently named content may need manual cleanup. After a successful import, the source JSON is cleared while the success message remains visible. Invalid or failed input is retained for correction; any stored importer text is also cleared the next time the sheet opens.

### Automatic migrations

- Legacy specialization and expertise text is converted into standard or Custom selections.

- Legacy Weapon Mods List entries are migrated into the unified Gear-tab Weapon Mods list.

- Older program installation fields are normalized around the assigned device.

- Legacy vehicle Program and Modification text remains available in hidden compatibility sections.

### Chat output and character ownership

Roll templates show the character name and a small ID line containing the immutable roll-owner Character ID. Callback buttons use stable identifier data so names with special characters do not break rerolls or description buttons. When an external macro needs to target the character, prefer the displayed ID.

### Troubleshooting

| Symptom | Check |
| --- | --- |
| A modification does nothing | Confirm the row's power toggle is on, the key is spelled exactly, and unrestricted keys are not required. |
| Effects totals appear stranded or inaccurate | Press Rebuild Effects in Options, wait for the completion message, and review active rows plus any legacy shared/manual fields. |
| Situational panel does not appear | Enable Modifiers in Macro Options and confirm at least one row is assigned to the rolled Skill or Attribute. |
| Weapon is absent from Core | Turn on Show on Core in that weapon's Arms settings. |
| Reload finds no ammunition | Match category, custom category text, load, and Caseless between weapon and Ammo inventory. |
| Program says Not installed | Assign it to a device; assignment defines installation. |
| Persona ratings are unexpected | Review every device's Contributes to Persona checkbox and any Matrix Reconfigure arrangement. |
| A roll button asks for a target | Select a represented token when using target-dependent chat actions such as Roll Defense. |
| A value stops increasing at +4 | This is the attribute/skill enhancement cap; use Ignore Mod Cap only when the campaign intends to bypass it. |

## Appendix A. Sheet-wide modifier key reference

The following keys are accepted by the sheet-wide Effects processor. Skill and attribute keys update Effects Mod; Persona keys are distinct from the AI attribute keys that happen to share names.

| Group | Keys |
| --- | --- |
| Attributes and Social | body_modifier, agility_modifier, reaction_modifier, strength_modifier, willpower_modifier, logic_modifier, intuition_modifier, charisma_modifier, magic_modifier, resonance_modifier, social_modifier |
| AI attributes | firewall_attribute_modifier, sleaze_attribute_modifier, data_processing_attribute_modifier, attack_attribute_modifier |
| Condition monitors | overflow_modifier, physical_modifier, stun_modifier, ai_matrix_track_modifier, matrix_modifier, pain_tolerance_effect |
| Initiative | initiative_mod, initiative_dice_mod, astral_initiative_mod, astral_initiative_dice_mod, matrix_initiative_mod, matrix_initiative_dice_mod, cold_sim_initiative_mod, cold_sim_initiative_dice_mod, hot_sim_initiative_mod, hot_sim_initiative_dice_mod |
| Derived and movement | composure_modifier, judge_intentions_modifier, memory_modifier, lift_carry_modifier, move_speed, sprint_speed, sprint_modifier, defense_rating_modifier, physical_soak_modifier, stun_soak_modifier, minor_actions_modifier |
| Persona and Matrix | attack_modifier, sleaze_modifier, data_processing_modifier, firewall_modifier, matrix_defense_rating_modifier, combat_paralysis, fade_compiling_modifier, sprite_resist_dv_modifier |
| Skills | astral_modifier, athletics_modifier, biotech_modifier, closecombat_modifier, con_modifier, conjuring_modifier, cracking_modifier, electronics_modifier, enchanting_modifier, engineering_modifier, exoticweapons_modifier, firearms_modifier, influence_modifier, outdoors_modifier, patterncraft_modifier, perception_modifier, piloting_modifier, sorcery_modifier, stealth_modifier, tasking_modifier |

## Appendix B. Installed mod keys

| Mod type | Dedicated fields and text aliases |
| --- | --- |
| Weapon | Pool: pool, dicepool. Damage: damage, dv. All AR: ar, ar_all. Range: ar_close, ar_near, ar_medium, ar_far, ar_extreme. |
| Armor | Capacity: capacity, capacity_used. DR: dr, defense_rating. Chem: chem, chemical. Cold: cold. Electric: elec, electric, electrical. Fire: fire. Social: social. |

## Appendix C. Recommended setup order

1. Choose Sheet Type and Character Type.

2. Enter Personal Data and base attributes.

3. Enter skills, specializations, expertise, and Knowledge/Language skills.

4. Configure Options, condition-monitor qualities, and Macro Options.

5. Add armor, weapons, and Show on Core choices.

6. Add Gear-tab ammunition and test a reload.

7. Install weapon and armor mods on their specific items.

8. Add augmentations, qualities, powers, programs, Effects, and Statuses; enable only the intended power toggles.

9. Configure devices that Contribute to Persona and assign programs to devices.

10. Test initiative, one skill roll, one weapon attack, Roll Defense, and an applicable situational modifier before play.

> **Good practice:** Keep a duplicate character or exported campaign backup before importing large data sets or testing new sheet versions.
