## Versioning
I use [Semantic Versioning](http://semver.org/) which has 3 numbers separated by a dot: Major.Minor.Patch

I use Major versions a bit liberally - I consider the following to be major changes:
* Any changes to existing roll template fields
* Any change to a repeating section which makes existing macro references break

New features are a minor version.

Bugs fall into the patch category.

The sheet will always upgrade itself unless I specify otherwise, though some things like roll template fields changing will require users who have added custom macros to fix.

## 19.3.0

### Features
- Update French translations

## 19.2.0

### Features
- [#778: Suggestion: Luck Statistic](https://bitbucket.org/mlenser/5eshaped/issues/778/suggestion-luck-statistic)

## 19.1.5

### Bug fixes
- [#775: Spell data not converting for NPCs and Monster spellcasters on premade campaign](https://bitbucket.org/mlenser/5eshaped/issues/775/spell-data-not-converting-for-npcs-and)

## 19.1.4

### Bug fixes
- [#772: Drag and Drop of spells ceases to function after attempting the "Heal" spell](https://bitbucket.org/mlenser/5eshaped/issues/772/drag-and-drop-of-spells-ceases-to-function) and add a test

## 19.1.3

### Bug fixes
- [#766: Warlock spell slots not updating when level changed](https://bitbucket.org/mlenser/5eshaped/issues/766/warlock-spell-slots-not-updating-when)
- [#767: Higher level spell queries are not updated as spells are expended](https://bitbucket.org/mlenser/5eshaped/issues/767/higher-level-spell-queries-are-not-updated)

## 19.1.2

### Bug fixes
- [#758: New SRD Content cleanup code breaks lair actions and regional effects import from script](https://bitbucket.org/mlenser/5eshaped/issues/758/new-srd-content-cleanup-code-breaks-lair)
- [#759: Race condition with updating actions on import](https://bitbucket.org/mlenser/5eshaped/issues/759/race-condition-with-updating-actions-on)
- Fixed Goblin Spider parsing
- [#761: Spellcasting trait parse has invalid destructuring usage](https://bitbucket.org/mlenser/5eshaped/issues/761/spellcasting-trait-parse-has-invalid)
- [#765: Fix for #759 broke more stuff](https://bitbucket.org/mlenser/5eshaped/issues/765/fix-for-759-broke-more-stuff)

## 19.1.1

### Bug fixes
- [#754: Incorrect assumption that all innate spellcasting groups will end with "each"](https://bitbucket.org/mlenser/5eshaped/issues/757/incorrect-assumption-that-all-innate)

## 19.1.0

### Features
- The sheet now supports some newer script edge-case features such as Anubian’s stealth being higher in sand.

### Bug fixes
- [#752: NPC Average HP's not calculating properly](https://bitbucket.org/mlenser/5eshaped/issues/752/npc-average-hps-not-calculating-properly)

## 19.0.0

### Breaking Changes
- Removed my custom classes (only one, called `Summoner`) and my psionic classes (`Psion` and `Soulknife`) from the sheet. If you have custom classes then use the custom name field for the class.

### Features
- Settings page cleaned up after latest Roll20 changes. It has also been reorganized to match the PC sheet sections (skills, saving throws, etc).
- [#750: Always show NPC saving throws](https://bitbucket.org/mlenser/5eshaped/issues/750/always-show-npc-saving-throws)

### Bug fixes
- [#729: NPC skill proficiencies are lost during conversion from OGL sheet](https://bitbucket.org/mlenser/5eshaped/issues/729/npc-skill-proficiencies-are-lost-during)
- NPC skills should never expand in to the right column now

## 18.1.13

### Bug fixes
- [#738: Overlapping UI in NPC sheet](https://bitbucket.org/mlenser/5eshaped/issues/738/overlapping-ui-in-npc-sheet)

## 18.1.12

### Bug fixes
- [#733: Class traits with damage do not check damage option by default](https://bitbucket.org/mlenser/5eshaped/issues/733/class-traits-with-damage-do-not-check)
- [#743: Incorrect assumption about OGL HP format breaks some imports](https://bitbucket.org/mlenser/5eshaped/issues/743/incorrect-assumption-about-ogl-hp-format)
- [#744: TypeError on OGL conversion](https://bitbucket.org/mlenser/5eshaped/issues/744/typeerror-on-ogl-conversion)
- [#745: Consider not using npc_name from OGL to set character name](https://bitbucket.org/mlenser/5eshaped/issues/745/consider-not-using-npc_name-from-ogl-to)

## 18.1.11

### Bug fixes
- [#728: Error message when using NPC actions](https://bitbucket.org/mlenser/5eshaped/issues/728/error-message-when-using-npc-actions)

## 18.1.10

### Bug fixes
- Fix attachers for NPC actions and reactions. Closes [#726: NPC attachers do not trigger for Actions](https://bitbucket.org/mlenser/5eshaped/issues/726/npc-attachers-do-not-trigger-for-actions)

## 18.1.9

### Bug fixes
- [#723: NPC skill parsing broken for skills with spaces in them](https://bitbucket.org/mlenser/5eshaped/issues/723/npc-skill-parsing-broken-for-skills-with)
- [#724: Drag-and-drop for crossbow bolts freezes sheet, breaks future imports](https://bitbucket.org/mlenser/5eshaped/issues/724/drag-and-drop-for-crossbow-bolts-freezes)

## 18.1.8

### Bug fixes
- [#717: Custom Coin Text Alignment](https://bitbucket.org/mlenser/5eshaped/issues/717/custom-coin-text-alignment)

## 18.1.7

### Bug fixes
- Fixed all the new cases raised in [#714: Mordenkainen's Tome of Foes, seems like monster imports fail to get actions](https://bitbucket.org/mlenser/5eshaped/issues/714/mordenkainens-tome-of-foes-seems-like). With Vanakoji's testing this should handle every case it seems (besides some formatting issues that roll20 needs to fix).

## 18.1.6

### Bug fixes
- Fixed error when modifying anything with a melee weapon caused by refactoring from yesterday.

## 18.1.5

### Bug fixes
- Fixed all the new cases raised in [#714: Mordenkainen's Tome of Foes, seems like monster imports fail to get actions](https://bitbucket.org/mlenser/5eshaped/issues/714/mordenkainens-tome-of-foes-seems-like). This should fix the vast majority of Mordenkainen.

## 18.1.4

### Bug fixes
- [#711: Modifiers section not changing attack bonus on display](https://bitbucket.org/mlenser/5eshaped/issues/711/modifiers-section-not-changing-attack)
- Improved the method to only show NPC skills and saving throws. They show on the sheet and chat macros if they are proficient or if there are modifiers for that specific skill/saving throw.

## 18.1.3

### Bug fixes
- [#714: Mordenkainen's Tome of Foes, seems like monster imports fail to get actions](https://bitbucket.org/mlenser/5eshaped/issues/714/mordenkainens-tome-of-foes-seems-like)

## 18.1.2

### Bug fixes
- The spell macro now shows spells from spell level 1 and above.

## 18.1.1

### Bug fixes
- `Currency` is now generated on upgrade for existing characters and current quantities, weight per coin, and gold equivalent values are upgraded.

## 18.1.0

### Features
- `Currency` (previously `coins` or `coinage`) is now a repeating section. It defaults to having the 5 currencies of 5e, but their name, acronym, weight, value, and border style can be changed as desired. Additionally more currencies (gems, rocks, or any other currency) can be added as desired. The currency macro now outputs how much of each currency and a total value. Gold is the standard currency as it is in 5e, but that can be changed by changing the values of each currency. So for example the Silver Standard can be used by making Silver's value 1 and the other values as desired. Closes [#689: Silver Standard support](https://bitbucket.org/mlenser/5eshaped/issues/689/silver-standard-support)

## 18.0.0

### Breaking Changes
This breaking change should be fully handled with the upgrade, but custom scripts may break as the roll template has changed. This will only impact existing roll template outputs and should only matter for those who want a well preserved chat record and for those who make custom macros (not recommended as the sheet should provide all that are needed).

### Features
- Added support for `spell points` to be called `sorcery`, `psi`, and `ki`. `mana` is already supported. Closes [#295](https://bitbucket.org/mlenser/5eshaped/issues/295/psi-points)
- Spell points can be customized for each spell level. This will allow each player to set the cost of each level. This supports the UA mystic, allowing them to set level 1 spells to 1 psi, level 2 spells to 2 psi, and so forth.

## 17.1.1

### Bug Fixes
* Added parsing to fix poor formatting of some Tome of Beasts creatures. Closes [#709: Tome of Beasts Monster imports not importing correctly](https://bitbucket.org/mlenser/5eshaped/issues/709/tome-of-beasts-monster-imports-not)

## 17.1.0

### Features
* Added a myriad of attachers. Closes [#708: Add attacher functionality to NPC Actions](https://bitbucket.org/mlenser/5eshaped/issues/708/add-attacher-functionality-to-npc-actions)

### Bug Fixes
* [#707: D&D 5e (5eShaped) Brutal Critical error](https://bitbucket.org/mlenser/5eshaped/issues/707/d-d-5e-5eshaped-brutal-critical-error)

## 17.0.6

### Bug Fixes
* [#697: NPC right column overlaps left column in edit mode](https://bitbucket.org/mlenser/5eshaped/issues/697/npc-right-column-overlaps-left-column-in)
* [#704: Princes of the Apocalypse Module fails to convert creature attacks actions](https://bitbucket.org/mlenser/5eshaped/issues/704/princes-of-the-apocalypse-module-fails-to)

## 17.0.5

### Bug Fixes
* [#693: Tooltips for carry capacity and push/drag cut off at default sheet size](https://bitbucket.org/mlenser/5eshaped/issues/693/tooltips-for-carry-capacity-and-push-drag)
* [#691: Feature uses tied to modifiers aren't being read](https://bitbucket.org/mlenser/5eshaped/issues/691/feature-uses-tied-to-modifiers-arent-being)
* [#692: Repeat attack / damage needs some point of reference](https://bitbucket.org/mlenser/5eshaped/issues/692/repeat-attack-damage-needs-some-point-of)

## 17.0.4

### Bug Fixes
* [#686: Spell tooltips do not respect newlines in the spell's description](https://bitbucket.org/mlenser/5eshaped/issues/686/spell-tooltips-do-not-respect-newlines-in)
* [#687: Attacks and Traits are blank when](https://bitbucket.org/mlenser/5eshaped/issues/687/attacks-and-traits-are-blank-when)

## 17.0.3

### Bug Fixes
* Monsters imported from the script now correctly output their content. Closes [#682: Imported Actions/Traits don't send content to chat](https://bitbucket.org/mlenser/5eshaped/issues/682/imported-actions-traits-dont-send-content)
* Skill rows that run out of room now cause the name to shrink better, primarily on firefox. Closes [#684: Formatting Skills error](https://bitbucket.org/mlenser/5eshaped/issues/684/formatting-skills-error)

## 17.0.2

### Bug Fixes
* [#675: Warlock slots not generating](https://bitbucket.org/mlenser/5eshaped/issues/675/warlock-slots-not-generating-v-1701)
* Spells known and spells chat macro now update when dragging a spell from the SRD. Closes [#677: Spells Macro Not Updating](https://bitbucket.org/mlenser/5eshaped/issues/677/spells-macro-not-updating)

## 17.0.1

### Bug Fixes
* `Roll 2` now indicates to the user that it is a legacy feature that does not work with all sheet features.
* [#672: coin weight calculation resulting in high decimal values](https://bitbucket.org/mlenser/5eshaped/issues/672/coin-weight-calculation-resulting-in-high)
* Spells manually changed in any way resulted in an error which prevented the scripts from running properly. This has been fixed. Closes [#674: Adding custom spells does not output description to chat or use spell slot](https://bitbucket.org/mlenser/5eshaped/issues/674/adding-custom-spells-does-not-output)

## 17.0.0

### Breaking Changes
* Spells now track the number of slots expended instead of the remaining slots. This aligns with the paper and OGL sheets. Upgrades should handle this change for you.
* NPC saving throws and skills will only show proficient/expertise items while in presentation mode. Closes [#669: Don't generate skills by default that have no proficiency or expertise on NPC sheets](https://bitbucket.org/mlenser/5eshaped/issues/669/dont-generate-skills-by-default-that-have)

### Features
* Spell UI has been updated with bubbles for spell slots and new UI wrappers.
* Spells now have tooltips to display the full contents of the spell. Closes [#374: Enable 'condense' toggling for spells on a more granular basis](https://bitbucket.org/mlenser/5eshaped/issues/374/enable-condense-toggling-for-spells-on-a)
* NPC skills will now show in a grid layout in edit mode.
* Falling to 0 hp now sets the unconscious condition. Gaining HP removes it. Closes [#3: Conditions](https://bitbucket.org/mlenser/5eshaped/issues/3/conditions)
* Cleaned up the Stablock macro to translate the size of PCs/NPCs. Race will now show instead of type for PCs. Offense and utility added for PCs as well.
* Settings page reorganized.

### Bug Fixes
* [#670: Not assigning a weight value to equipment completely breaks weight calculations](https://bitbucket.org/mlenser/5eshaped/issues/670/not-assigning-a-weight-value-to-equipment)

## 16.1.2

### Bug Fixes
* [#572: Modifiers adding a second time on critical damage](https://bitbucket.org/mlenser/5eshaped/issues/572/modifiers-adding-a-second-time-on-critical)

## 16.1.1

### Bug Fixes
* [#664: Spelling errors in translation.json](https://bitbucket.org/mlenser/5eshaped/issues/664/spelling-errors-in-translationjson)
* [#663: Saving Throw Bonus Formatting Error](https://bitbucket.org/mlenser/5eshaped/issues/663/saving-throw-bonus-formatting-error)
* Crit range is shown by default as turning it on wasn’t intuitive enough.

## 16.1.0

### Features
* Shaped sheet can now process OGL spells from PC sheets or NPC sheets (only NPC sheets from the Curse of Strahd module and newer use this format for spells). Closes [#659: NPC Spells not converting from OGL to Shaped](https://bitbucket.org/mlenser/5eshaped/issues/659/npc-spells-not-converting-from-ogl-to)

### UI Adjustments
* The sheet is a bit wider now and no longer assumes my stylish CSS so it should fit on the default width (~888px depending on browser) without a horizontal scrollbar.
* Firefox UI cleaned up. Closes [#661: Tie bar behind exhastion states not centered](https://bitbucket.org/mlenser/5eshaped/issues/661/tie-bar-behind-exhastion-states-not)

## 16.0.0

### Breaking Changes
* Importing data from the compendium, script, or OGL content has been completely revamped to use the same system for as much as possible.

### Features
* [#656: Missing comma in Modifiers -> Saving throw](https://bitbucket.org/mlenser/5eshaped/issues/656/missing-comma-in-modifiers-saving-throw)
* Conditions have been added.

### Bug Fixes
* [#654: Magic Missile](https://bitbucket.org/mlenser/5eshaped/issues/654/magic-missile)
* New characters sheets will be created with edit mode enabled
* [#655: OGL skills do not convert](https://bitbucket.org/mlenser/5eshaped/issues/655/ogl-skills-do-not-convert)
* OGL conversion, Compendium drop, and Script import of monsters, spells, and items should be fully working (update the script to 12.0.0)
  * A processing notification now shows while these items are processing, regardless of origin
* [#38: Spell Save DC Not calculating properly in !shaped-spells](https://bitbucket.org/mlenser/5eshapedscript/issues/38/spell-save-dc-not-calculating-properly-in)
* Weapons dropped on a NPC sheet are added as actions

### UI Adjustments
* Styled boxes have been added
* Tabs renamed to "Character"/"NPC", "Spells", and the cog.
* "Character" tab for PCs will now show the appearance and backstory details below the normal sheet
* "All" option removed as it is now only useful for showing settings below other sheets which doesn't have much value
* Repeating buttons restyled a bit
* PC Core page column widths adjusted a bit
* Font sizes adjusted to match the new UI
* Passive skills moved to the core page and restyled

## 15.7.4

### Bug Fixes
* Fix parsing of single quotes that I broke as part of 15.7.3

## 15.7.3

### Bug Fixes
* [#652: Tome of Beasts characters have errors on import](https://bitbucket.org/mlenser/5eshaped/issues/652/tome-of-beasts-characters-have-errors-on). Tome of Beast format variations parsed away to the expected format.

## 15.7.2

### Bug Fixes
* Fix attack and damage components caused by a rename of `attackTypeChanged`

## 15.7.1

### Bug Fixes
* [#640: Carrying Capacity Not displayed](https://bitbucket.org/mlenser/5eshaped/issues/640/carrying-capacity-not-displayed). Also fixes carrying capacity not being updated when Strength changes and hit dice not updating on Constitution changes.
* [#648: Spell Macro not showing Cantrips in chat](https://bitbucket.org/mlenser/5eshaped/issues/648/spell-macro-not-showing-cantrips-in-chat)
* [#645: Modify state should revert when character sheet editing is turned off](https://bitbucket.org/mlenser/5eshaped/issues/645/modify-state-should-revert-when-character)
* [#646: Unable to change Casting Stat for Compendium Imported Spells](https://bitbucket.org/mlenser/5eshaped/issues/646/unable-to-change-casting-stat-for)
* Attacks will default to having the correct attack and damage ability modifier selected based on the section they are created from (Offense, Spell, etc).
* A spell’s saving throw ability modifier can now be set to use no ability modifier.

## 15.7.0

### Features

* `Mana` setting now replaces `Spell points` wording with `Mana`
* `Advantage+` and `Disadvantage-` have been added to handle cases of rolling an extra dice for all the possible dice systems. With d20 for example `Advantage+` would be `3d20kh1`

## 15.6.0

### Features

* Death saving throw output now supports `death_saving_throw_chances` by outputting X / 3 or X / 5. All custom death saving throw macros must include `{{death_saving_throw_chances=@{death_saving_throw_chances}}}`.

## 15.5.9

### Bug Fixes

* [#633: Hit dice and level field not displaying properly for sheets from versions before 15.5.5](https://bitbucket.org/mlenser/5eshaped/issues/633/hit-dice-and-level-field-not-displaying)
* [#631: Delay/No Response to using Short and Long Rest buttons](https://bitbucket.org/mlenser/5eshaped/issues/631/delay-no-response-to-using-short-and-long)

## 15.5.8

### Bug Fixes

* [#621: Suggestion to add a blank magic school.](https://bitbucket.org/mlenser/5eshaped/issues/621/suggestion-to-add-a-blank-magic-school)
* [#625: Changing caster type (full/half, etc) has no effect.](https://bitbucket.org/mlenser/5eshaped/issues/625/changing-caster-type-full-half-etc-has-no)
* [#624: Spell Save DC Not Calculating Properly](https://bitbucket.org/mlenser/5eshaped/issues/624/spell-save-dc-not-calculating-properly)
* Adjusted Hit dice to use the current amount for the query instead of the maximum. Along with solving the `base_dc` issues elsewhere it seems [#626: Monk HD not updating correctly](https://bitbucket.org/mlenser/5eshaped/issues/626/monk-hd-not-updating-correctly) is solved, but I'm unsure.

## 15.5.7

### Bug Fixes

* [#27: Armor class does not import](https://bitbucket.org/mlenser/5eshapedscript/issues/27/armor-class-does-not-import)
* Import of spells without an attack or save (Magic Missile) now properly sets the damage on by default. Closes [#618: Multiple NPC Spellcasting Issues](https://bitbucket.org/mlenser/5eshaped/issues/618/multiple-npc-spellcasting-issues)

## 15.5.6

### Bug Fixes

* Large testing and fixing process which resolves many script issues when using version 11.3.2 of the script: [#15: Issues with actions on character import](https://bitbucket.org/mlenser/5eshapedscript/issues/15/issues-with-actions-on-character-import), [#16: NPC - API Import](https://bitbucket.org/mlenser/5eshapedscript/issues/16/npc-api-import), [#17: !shaped-expand-spells --all not working](https://bitbucket.org/mlenser/5eshapedscript/issues/17/shaped-expand-spells-all-not-working), and [#20: OGL Conversion: !shaped-update-character](https://bitbucket.org/mlenser/5eshapedscript/issues/20/ogl-conversion-shaped-update-character).

## 15.5.5

### Bug Fixes

* [#611: Ammo weight not being tracked](https://bitbucket.org/mlenser/5eshaped/issues/611/ammo-weight-not-being-tracked)

## 15.5.4

### Bug Fixes

* [#606: SRD Weapon drag incorrect](https://bitbucket.org/mlenser/5eshaped/issues/606/srd-weapon-drag-incorrect)
* [#604: Actions issue upon monster import](https://bitbucket.org/mlenser/5eshaped/issues/604/actions-issue-upon-monster-import)
* [#601: Racial Traits (Description and Slots Police)](https://bitbucket.org/mlenser/5eshaped/issues/601/racial-traits-description-and-slots-police)
* [#602: When picking he psion spell components (Mental, Auditory, Visual etc.) the choice resets.](https://bitbucket.org/mlenser/5eshaped/issues/602/when-picking-he-psion-spell-components)
* [#574: Every Monster Compendium Spear Multiplying](https://bitbucket.org/mlenser/5eshaped/issues/574/every-monster-compendium-spear-multiplying) NPC parsing of these has been turned off for now unless they come from the SRD. I'd like to have them work, but this is better than the sheet being overloaded. It looks like another change that roll20 made that steve mentioned. Blah.

## 15.5.3

### Bug Fixes

* Actions should now work, mostly. I've checked the following types:
  * Actions with an attack (Guiding Bolt)
  * Actions with a saving throw (Fireball)
  * Actions without an attack or saving throw(Magic Missile)
  * Actions with a heal (Cure Wounds)

## 15.5.2

### Bug Fixes

* [#598: HP display is broken](https://bitbucket.org/mlenser/5eshaped/issues/598/hp-display-is-broken)
* Some of [#597: Actions issues](https://bitbucket.org/mlenser/5eshaped/issues/597/actions-issues)

## 15.5.1

### Bug Fixes

* [#594: Ability Scores not updating and crashing the page.](https://bitbucket.org/mlenser/5eshaped/issues/594/ability-scores-not-updating-and-crashing)
* A myriad of other bugs involved in the [Roll20 breaking change](https://app.roll20.net/forum/permalink/5498180/) in their API. The sheet is still very laggy and I could use significant help identifying issues.

## 15.5.0

### Features

* [#578: Provide skill totals](https://bitbucket.org/mlenser/5eshaped/issues/578/provide-skill-totals) will now make the total of each skill available for other resources like scripts. The attribute will be named as the skill is, so `Perception`, `Athletics`, etc. It will be the total modifier (without any + or - sign).

### Bug Fixes

* [#579: Multiple erroring classes are added and cannot be deleted](https://bitbucket.org/mlenser/5eshaped/issues/579/multiple-erroring-classes-are-added-and). It should automatically populate spellcasting now as well. I remember reading something about a change to repeating sections from roll20. Perhaps that was the cause of this as this area hasn't been touched in a while - hard to say.

## 15.4.0

### Features

* Cleaned up the styling around the heart as users were often confused what it meant:

![alt text](http://i.imgur.com/0f8z8k1.jpg "Heart")

### Bug Fixes

* [#566: Automatically roll damage should still show the "Hit" and "Saving throw failure" buttons](https://bitbucket.org/mlenser/5eshaped/issues/566/automatically-roll-damage-should-still)

## 15.3.0

### Features

* All repeating section rolling buttons should now use `roll` instead of words like `action`. For example: `%{repeating_action_ID_action}` is now `%{repeating_action_ID_roll}`. All old names will still work, but all documentaton will be updated to these new names so it is easier for users to understand.

## 15.2.0

### Features

* Added some fields to the roll template to better support `!shaped-spells` and `!shaped-monsters` so that it sends less data.

## 15.1.1

### Bug Fixes

* [#550: Modifier dice damage bugs critical damage](https://bitbucket.org/mlenser/5eshaped/issues/550/modifier-dice-damage-bugs-critical-damage)
* [#549: Offense attacher displays on utility items](https://bitbucket.org/mlenser/5eshaped/issues/549/offense-attacher-displays-on-utility-items)
* [#558: Stealth Disadvantage on Armour doesn't go away when not equipped](https://bitbucket.org/mlenser/5eshaped/issues/558/stealth-disadvantage-on-armour-doesnt-go)
* [#555: Uses parsing of equipment has some bugs](https://bitbucket.org/mlenser/5eshaped/issues/555/uses-parsing-of-equipment-has-some-bugs)
* Updated documentation link to the new wiki and added a link on the version (goes to changelog)

## 15.1.0

### Features

* Alternate dice system of 2d10 and 3d6 can be used in place of a d20 now
* Saving throws can now have either 3 or 5 chances
* Added styling necessary for the script's new `!shaped` command

## 15.0.2

### Bug Fixes

* [#539: "extra on crit" doesn't work on secondary damage](https://bitbucket.org/mlenser/5eshaped/issues/539/extra-on-crit-doesnt-work-on-secondary)
* [#541: Spell uses are not recharged on a rest](https://bitbucket.org/mlenser/5eshaped/issues/541/spell-uses-are-not-recharged-on-a-rest)
* [#540: Inventory quantities do not convert when upgrading from 11.3.3 to 15.0.1](https://bitbucket.org/mlenser/5eshaped/issues/540/inventory-quantities-do-not-convert-when) fixed as part of the 14.0.0 upgrade

## 15.0.1

### Bug Fixes

* [#519: Ammo added to multiple items when trying to add it to 1 item](https://bitbucket.org/mlenser/5eshaped/issues/519/ammo-added-to-multiple-items-when-trying)

## 15.0.0

### Breaking Changes

* `MELEE_OR_RANGED_WEAPON_ATTACK`s will now be treated as either melee or ranged and the parses will split them out to different weapons as I do for versatile. This is to ensure that the right damage bonuses are being used and ammo is being used properly. All existing items will remain working, but it'll parse all new items. Closes [#533: savage attacks half-orc](https://bitbucket.org/mlenser/5eshaped/issues/533/savage-attacks-half-orc)

### Bug Fixes

* Fixed Versatile parsing.
* [#524: Modifiers not reading attribute macros 14.2.4](https://bitbucket.org/mlenser/5eshaped/issues/524/modifiers-not-reading-attribute-macros)
* [#526: On the equipment tab the carrying capacity / weight area is justified oddly](https://bitbucket.org/mlenser/5eshaped/issues/526/on-the-equipment-tab-the-carrying-capacity)
* [#520: Empty utility/offence macro shows last deleted entry](https://bitbucket.org/mlenser/5eshaped/issues/520/empty-utility-offence-macro-shows-last)
* [#531: Formatting of spell title line gets distorted with recharge](https://bitbucket.org/mlenser/5eshaped/issues/531/formatting-of-spell-title-line-gets)

## 14.3.0

### Features

* Added setting to recover hit dice on a short rest. It includes all, half, fourth, and none. Fourth is there to work with the DMG healing surge rule that allows 1/4th of hit dice to be recovered on a short rest.

### Bug Fixes

* All sections that use freeform have changed the way that they do in order to always ensure that freeform comes last even when there are asynchronous calls like finding ammo. Closes [#515: fx with target no longer works](https://bitbucket.org/mlenser/5eshaped/issues/515/fx-with-target-no-longer-works)

## 14.2.4

### Bug Fixes

* Fixed a bug where prepared_matters_var was not set on new character. Old characters can re-toggle that value on the spells section to have the chat output correct. Closes. [#513: Spell preparation still bugged?](https://bitbucket.org/mlenser/5eshaped/issues/513/spell-preparation-still-bugged)
* Rests will now output a message even if they have not recharged anything: "Nothing recharged". Closes [#514: Short rest doesn't output anything if there's nothing to recharge](https://bitbucket.org/mlenser/5eshaped/issues/514/short-rest-doesnt-output-anything-if)
* [#512: Script-imported spell issues](https://bitbucket.org/mlenser/5eshaped/issues/512/companion-script-imported-spell-issues)

## 14.2.3

### Bug Fixes

* The way that proficiency bonus updates all its dependencies has been changed. This should make it so that all of its dependencies only update when the proficiency bonus actually updates instead of it always updating when it could've possibly updated. Closes [#509: NPC prof bonus not updated when decreasing CR](https://bitbucket.org/mlenser/5eshaped/issues/509/npc-prof-bonus-not-updated-when-decreasing)
* [#510: NPC caster level not being taken into account as appropriate without updates](https://bitbucket.org/mlenser/5eshaped/issues/510/npc-caster-level-not-being-taken-into)
* [#508: Prepared spell highlighting on the sheet](https://bitbucket.org/mlenser/5eshaped/issues/508/prepared-spell-highlighting-on-the-sheet)

## 14.2.2

### Bug Fixes

* [#506: Spells still broken and items in 14.2.1](https://bitbucket.org/mlenser/5eshaped/issues/506/spells-still-broken-and-items-in-1421)
* [#507: Magical armor not adding the bonus to AC](https://bitbucket.org/mlenser/5eshaped/issues/507/magical-armor-not-adding-the-bonus-to-ac)

## 14.2.1

### Bug Fixes

* [#504: New spells are broken due to a Javascript error](https://bitbucket.org/mlenser/5eshaped/issues/504/new-spells-are-broken-due-to-a-javascript)
* Cleaned up my release cycle so that the process is streamlined and another developer could pick it up if that ever happens

## 14.2.0

### Features

* Added a macro to output all resistances and immunities
* Changing an attack type from melee to ranged or vice versa will now update the attack and damage abilities as appropriate. It can be changed afterwards if houserules are desired.
* Changing an armor type will now update the dexterity as appropriate. It can be changed afterwards if houserules are desired. Closes [#468: Dex mod retained when upgrading armor to Plate Armor from Leather Armor](https://bitbucket.org/mlenser/5eshaped/issues/468/dex-mod-retained-when-upgrading-armor-to)
* Acid, Alchemist's Fire, Antitoxin, Ball Bearings, Caltrops, Chalk, Healer's Kit, Holy Water, Ink, Oil, Perfume, Basic Poison, Rations, Iron Spikes, and Waterskin will be parsed to have uses when dragged from the SRD or typed in.
* Items with charges (such as Wand of Magic Missiles) will be parsed to have uses and recharge manually
* Added a "add common items" button to the equipment section to automatically add Backpack, Bedroll, Traveler's Clothes, Rations, Waterskin, Mess Kit, Tinderbox, and a Healer's Kit

### Bug Fixes

* Armor is never calculated on a per repeating item basis to avoid any AC calculation issues. Closes [#502: Armor not adding in 14.1.1](https://bitbucket.org/mlenser/5eshaped/issues/502/armor-not-adding-in-1411)

## 14.1.1

### Bug Fixes

* `Offense` is included in the equipment tab again
* [#499: Equipment weight does not recalculate](https://bitbucket.org/mlenser/5eshaped/issues/499/equipment-weight-does-not-recalculate)

## 14.1.0

### Features

* `uses_max` will now only show if there is a recharge value. This makes items like potions and other consumables or even non-consumables much more logical sense. I have removed `uses_max` from all sections unless the recharge is set. This will capture the most common case of the `uses_max` being automatically added by me. The other case of an item being manually recharged will have its `uses_max` removed as well and that will need to be manually turned back on.
* `weight_per_use` is a toggle, not a separate field. It has been upgraded.
* Parsed ammo from SRD for all PHB weapons like Longbow, Dart, Net, Crossbow, Handaxe, Dagger, Javelin, etc. Weight is set appropriately. Closes [#8: Auto populate ammo when dragging ranged weapons from the SRD](https://bitbucket.org/mlenser/5eshaped/issues/8/auto-populate-ammo-when-dragging-ranged)

### Bug Fixes

* Weight for `Offense`, `Utility`, `Equipment`, and `Armor` will now update the total properly when an individual item is adjusted. Closes [#493: Weight Totals Incorrect](https://bitbucket.org/mlenser/5eshaped/issues/493/weight-totals-incorrect). An upgrade should force calculate the weight of each of these sections.
* Any item with qty upgraded as part of 14.0.0 will no longer have its `weight` transferred to `weight_per_use`. Existing characters will need to manually adjust the values (and remove `uses_max`). Closes [#495: Item quantity/weight after upgrade to 14.0.x](https://bitbucket.org/mlenser/5eshaped/issues/495/item-quantity-weight-after-upgrade-to-140x).

## 14.0.2

### Bug Fixes

* Healing now works for `Utility` items and Other Damage now works for `Offense`.
* Potion of Healing and other items with a specific wording will now be parsed to heal.

## 14.0.1

### Bug Fixes

* [#491: Ammo missing from Offense items](https://bitbucket.org/mlenser/5eshaped/issues/491/ammo-missing-from-offense-items)
* Completely revamped hit dice to handle an edge case of 3 or more classes including 7 different hit dice in one character while using the "Half" recovery default rule. Closes [#489: Long Rest button doesn't recover hit dice properly](https://bitbucket.org/mlenser/5eshaped/issues/489/long-rest-button-doesnt-recover-hit-dice)

## 14.0.0

### Breaking Changes

*There are several breaking changes with regards to the script in this version. See [Ammo qty renamed to "uses"](https://github.com/symposion/roll20-shaped-scripts/issues/489) and [Attacks have been renamed "Offense"](https://github.com/symposion/roll20-shaped-scripts/issues/491). Meaning ammo will likely not auto subtract until it is fixed as well as the attacks token action needing to be updated to offense.*

* qty has been removed everywhere on the sheet including ammo which may break ammo reduction. I have upgraded qty for ammo and equipment, but not attacks.
* Attacks have been renamed `Offense` and they no longer require an attack. `Utility` has been added below `Offense` and it contains healing and content. In some upcoming versions I will add some SRD importing data to utility. Closes [#168: Expand Equipment](https://bitbucket.org/mlenser/5eshaped/issues/168/expand-equipment)
* Quick removed from equipment and armor. Armor never needed it and equipment only needed it because the utility section didn't exist.
* passive skills are now named `passive_SKILLNAME`. For example: `passive_perception`.

### Features

* Potions will now automatically add uses and base their weight on uses
* [#375: Spell uses](https://bitbucket.org/mlenser/5eshaped/issues/375/spell-uses), though they are not editable in presentation mode and the script needs to add functionality to support them
* [#483: Skill list sorting for different languages](https://bitbucket.org/mlenser/5eshaped/issues/483/skill-list-sorting-for-different-languages)

## 13.0.1

### Bug Fixes

* Fixed javascript errors that occur on new characters
* [#488: Initiative modifier transferred incompletely on upgrade](https://bitbucket.org/mlenser/5eshaped/issues/488/initiative-modifier-transferred)
* [#487: Upon upgrade, Light Armor loses its type](https://bitbucket.org/mlenser/5eshaped/issues/487/upon-upgrade-light-armor-loses-its-type)
* [#486: Modifiers: Ability checks double bonus from ability for passive](https://bitbucket.org/mlenser/5eshaped/issues/486/modifiers-ability-checks-double-bonus-from)
* Initiative second ability moved to Modifiers and upgraded
* [#485: Skill modifier and initiative modifier dice does not apply](https://bitbucket.org/mlenser/5eshaped/issues/485/skill-modifier-and-initiative-modifier)

## 13.0.0

### Breaking Changes

* Bonuses for ability scores, ability checks, initiative, saving throws, and ***skills*** have been moved to the `Modifiers` section. Closes [#478: Ability modifier for specific skills?](https://bitbucket.org/mlenser/5eshaped/issues/478/ability-modifier-for-specific-skills) and opens the door to doing [#59: Make attachers work for skills](https://bitbucket.org/mlenser/5eshaped/issues/59/make-attachers-work-for-skills) in the same way.
* All repeating section macros will now be ordered based on the order that is shown on the sheet. Closes [#185: Regenerate Repeating Section macros when order being changed](https://bitbucket.org/mlenser/5eshaped/issues/185/regenerate-repeating-section-macros-when)

### Bug Fixes

* [#482: "Attack:" should be "Roll:"](https://bitbucket.org/mlenser/5eshaped/issues/482/attack-should-be-roll)
* [#480: Attack and damage modifiers don't apply to spells](https://bitbucket.org/mlenser/5eshaped/issues/480/attack-and-damage-modifiers-dont-apply-to)
* Hit points heart is refactored to no longer use Roll20's font to create the heart as it didn't render correctly on iOS.
* [#477: Ability modifier does not reliably toggle](https://bitbucket.org/mlenser/5eshaped/issues/477/ability-modifier-does-not-reliably-toggle)

## 12.0.4

### Bug Fixes

* Styling cleanups
* Modifiers now toggle the section on upgrade from the old "Bonuses & Penalties".

## 12.0.3

### Bug Fixes

* [#472: Ability check addition in modifiers doesn't seem to add to anything](https://bitbucket.org/mlenser/5eshaped/issues/472/ability-check-addition-in-modifiers-doesnt)
* [#471: Extra 0 (or number) on ability scores](https://bitbucket.org/mlenser/5eshaped/issues/471/extra-0-or-number-on-ability-scores)
* [#475: Statblock macro displays unmodified Ability scores](https://bitbucket.org/mlenser/5eshaped/issues/475/statblock-macro-displays-unmodified)
* [#476: Modifiers: check boxes inside the modifier not honored](https://bitbucket.org/mlenser/5eshaped/issues/476/modifiers-check-boxes-inside-the-modifier)
* [#461: Long Rest does not do Multiclass Hit Dice correctly](https://bitbucket.org/mlenser/5eshaped/issues/461/long-rest-does-not-do-multiclass-hit-dice)
* [#473: Spell Repeat does not work unless the spell can be cast at a higher level](https://bitbucket.org/mlenser/5eshaped/issues/473/spell-repeat-does-not-work-unless-the)

## 12.0.2

### Bug Fixes

* [#469: Modifiers: AC not being added](https://bitbucket.org/mlenser/5eshaped/issues/469/modifiers-ac-not-being-added)
* Parse attack type from SRD after changing the way they are stored to translations.
* Parsed Melee or Ranged Weapon attack for weapons like dagger.
* [#470: Modifiers: Ability Score does nothing](https://bitbucket.org/mlenser/5eshaped/issues/470/modifiers-ability-score-does-nothing)
* [#467: Multiple modifiers of the same type cause "double plus" on rolls, making the rolls 0](https://bitbucket.org/mlenser/5eshaped/issues/467/multiple-modifiers-of-the-same-type-cause)
* [#462: Spell repeat button with no slots remaining](https://bitbucket.org/mlenser/5eshaped/issues/462/spell-repeat-button-with-no-slots)

## 12.0.1

### Bug Fixes

* [#466: AC values wrong](https://bitbucket.org/mlenser/5eshaped/issues/466/ac-values-wrong)

## 12.0.0

### Breaking Changes

* Modifiers have replaced global bonuses. Modifiers are much more expressive:

![alt text](http://i.imgur.com/16kXDWe.png "Modifiers")

### Features

* The defense and equipment section's styling has been revamped to more closely match the system used by Attacks, Actions, Class Features, etc.
* Items in the defense section can now handle unarmored defense. This and the modifiers expansion closes [#367: Add back "other" armor type that doesn't do any calculations](https://bitbucket.org/mlenser/5eshaped/issues/367/add-back-other-armor-type-that-doesnt-do)

![alt text](http://i.imgur.com/7cZdsjt.png "New armor")

* Removed Expand/Contract in favor of a tab for "Spells", "Equipment", and "Features". In technical implementation these are showing the sections on the core page in an expanded way.
* Added an output toggle to the navigation which allows for quick whispering of abilities, spells, attacks, etc. Closes [#446: Easier method to output a roll to GM](https://bitbucket.org/mlenser/5eshaped/issues/446/easier-method-to-output-a-roll-to-gm)

![alt text](http://i.imgur.com/HjDx2Jf.png "New nav")

### Bug Fixes

* Refactored edit mode detection to use the similar value="1" that I use elsewhere. We'll see if this has any impact on the issue that some people have with it.
* Repeat for spells now correctly hides the content (seems there may have been a change on roll20's end that broke this).
* [#457: Hitpoint output adding 0 to end of current HP](https://bitbucket.org/mlenser/5eshaped/issues/457/hitpoint-output-adding-0-to-end-of-current)
* [#458: Issue with Spiritual Weapon Higher Level Dice](https://bitbucket.org/mlenser/5eshaped/issues/458/issue-with-spiritual-weapon-higher-level)
* [#355: Reduced number of skills causes overlap between stats and damage resistances section](https://bitbucket.org/mlenser/5eshaped/issues/355/reduced-number-of-skills-causes-overlap)

## 11.6.0

### UI Changes

* Senses are now in the first row like speeds.
* Both speeds and senses have a toggle to show the "other" speeds/senses. The defaults shown are "Speed" and "Darkvision".
* Temp hp and hit point maximum reduced now default to 0.
* Hit point divider is now a straight line.

### Bug Fixes

* [#450: Missing space between Spell Level and Spell School](https://bitbucket.org/mlenser/5eshaped/issues/450/missing-space-between-spell-level-and)

## 11.5.0

### UI Changes

* Conditions have been hidden from the sheet as their current setup has never really been fully supported.
* Hit points have been moved to after speed to better match the paper sheet. Temporary hit points and hit point maximum reduced have been moved inside the heart.
* Burrow, Climb, Fly, and Swim have been moved to the first line of the core page for better visibility. They only show in presentation mode when they have content.

![alt text](http://i.imgur.com/AXgeFlr.png "new core")
![alt text](http://i.imgur.com/JBBdhdo.png "new core fly")
![alt text](http://i.imgur.com/q2iCzCX.png "new core edit")


### Bug Fixes

* Fixed a config for the script. See the first item at [the script's 9.1.0 release](https://app.roll20.net/forum/permalink/4912230/)

## 11.4.1

### Bug Fixes

* [#442: Hit Dice should restore a minimum of 1 when using "half" recovery](#442: Hit Dice should restore a minimum of 1 when using "half" recovery)

## 11.4.0

### Features

* Added a second ability to initiative for archetypes that allow you to add a second ability modifier to initiative.
* Attack type "Ranged Spell Attack" or "Melee Weapon Attack" is now a link to an attack/action/etc's attack so it can be repeated.

### UI Changes

* "Save failure" now reads as "Saving throw failure". Same for success.

### Bug Fixes

* [#441: global damage bonus not being applied](https://bitbucket.org/mlenser/5eshaped/issues/441/global-damage-bonus-not-being-applied)
* [#437: Settings > House Rules > HPs recovered on long rest value doesn't stick](https://bitbucket.org/mlenser/5eshaped/issues/437/settings-house-rules-hps-recovered-on-long)
* [#444: Elder Brain Lair Actions don't import](https://bitbucket.org/mlenser/5eshaped/issues/444/elder-brain-lair-actions-dont-import)

## 11.3.3

### Bug Fixes

* [#431: Cantrip damage scaling wrong for NPCs](https://bitbucket.org/mlenser/5eshaped/issues/431/cantrip-damage-scaling-wrong-for-npcs) wasn't converted to the new damage system.
* [#432: level attribute not set for npcs imported via script](https://bitbucket.org/mlenser/5eshaped/issues/432/level-attribute-not-set-for-npcs-imported)

## 11.3.2

### Bug Fixes

* [#427: Saving throw proficiencies lost on update](https://bitbucket.org/mlenser/5eshaped/issues/427/saving-throw-proficiencies-lost-on-update)
* Parsing of a range with only one number ("120 ft.") now works as well as the normal two number range ("20/120 ft."). I've added a test to ensure all other parsing succeeds.

## 11.3.1

### Bug Fixes

* [#423: Crit damage not rolling](https://bitbucket.org/mlenser/5eshaped/issues/423/crit-damage-not-rolling)
* [#424: Click to Roll is missing damage macro](https://bitbucket.org/mlenser/5eshaped/issues/424/click-to-roll-is-missing-damage-macro)

## 11.3.0

### Features

* Implemented a flag to detect when a monster is complete from being dragged from SRD mostly from a PR from Lucian. This will help his script attach on at the appropriate times.

### Bug Fixes

* Resting has had a few minor bugs fixed: long rests now recharge short rests as well as turn recharges and "Recharge X". Same for short rests.
* Saving throw capitalization is now consistent with the rest of the sheet. For example the title of a strength saving throw will now be "Strength saving throw" instead of "Strength Saving throw".
* save_prof has been renamed to saving_throw_prof for all the saving throws (str, dex, con, death..) The upgrade handles the change.
* [#419: OGL Conversion - Saving Throws](https://bitbucket.org/mlenser/5eshaped/issues/419/ogl-conversion-saving-throws)
* [#420: OGL Conversion - Reactions](https://bitbucket.org/mlenser/5eshaped/issues/420/ogl-conversion-reactions)
* [#421: OGL Conversion - Legendary Actions](https://bitbucket.org/mlenser/5eshaped/issues/421/ogl-conversion-legendary-actions)

## 11.2.0

### Features

* Short and Long Rest are now on the sheet for all users. They no longer require a Pro subscription. Lucian's next version of the script will support the chat messages that accompany this feature.
* If hit points are adjusted to be above 0 then death saving throws will reset in accordance with the rules: "The number of both is reset to zero when you regain any hit points or become stable"
* Divine Smite's formula changed to allow automatic spell reduction - will require the script to set this all up. You can untoggle and retoggle divine smite to get the new formula.

### Bug Fixes

* Spell saving throw DC and spell attack will no longer use an ability modifier of -5 if there is no spell_ability selected.
* Sheet based rests recharge short rests on a long rest now

## 11.1.0

### Features

* PCs hit points will be calculated automatically if "Automatic hit points" is turned on on the settings page. Closes [#402: PCs should have the option of displaying default hit points](https://bitbucket.org/mlenser/5eshaped/issues/402/pcs-should-have-the-option-of-displaying)
* OGL conversion now happens as one server call. The process should be quicker and notification window will now go away at the end.
* OGL conversion will now remove all repeating sections from the OGL sheet to reduce the number of fields on the sheet. Less fields = less lag.

### Bug Fixes

* [#414: OGL Conversion - Statblock Macro](https://bitbucket.org/mlenser/5eshaped/issues/414/ogl-conversion-statblock-macro)
* [#411: OGL Conversion - Spells are not sorted by level](https://bitbucket.org/mlenser/5eshaped/issues/411/ogl-conversion-spells-are-not-sorted-by)

## 11.0.4

### Bug Fixes

* OGL conversion changes based on the silent updates. Solves [#408: Yawning Portal Conversion - Senses are missing](https://bitbucket.org/mlenser/5eshaped/issues/408/yawning-portal-conversion-senses-are), [#407: Yawning Portal Conversion - Speed Attribute](https://bitbucket.org/mlenser/5eshaped/issues/407/yawning-portal-conversion-speed-attribute), [#410: Yawning Portal Conversion - Proficiency Bonus](https://bitbucket.org/mlenser/5eshaped/issues/410/yawning-portal-conversion-proficiency), [#409: Yawning Portal Conversion - Ability Check Proficiency and Expertise](https://bitbucket.org/mlenser/5eshaped/issues/409/yawning-portal-conversion-ability-check)

## 11.0.3

### Bug Fixes

* [#392: Spells macro empty after update](https://bitbucket.org/mlenser/5eshaped/issues/392/spells-macro-empty-after-update)
* Change the name of the concentration filter so that it matches its new behavior. Also solves [#396: Setting a spell's duration to "Concentration" will delete the spell](https://bitbucket.org/mlenser/5eshaped/issues/396/setting-a-spells-duration-to-concentration)
* [#395: Saving throws and Ability checks Query Macros are broken](https://bitbucket.org/mlenser/5eshaped/issues/395/saving-throws-and-ability-checks-query)
* [#398: Hide AC does not work](https://bitbucket.org/mlenser/5eshaped/issues/398/hide-ac-does-not-work)

## 11.0.2

### Bug Fixes

* [#391: Other second damage not in the blue damage area of the template](https://bitbucket.org/mlenser/5eshaped/issues/391/other-second-damage-not-in-the-blue-damage)

### UI Changes

* Styling for the import message
* Styling for !shaped-config

## 11.0.1

### Bug Fixes

### UI Changes

* [#207: second damage roll template](https://bitbucket.org/mlenser/5eshaped/issues/207/second-damage-roll-template)

* Added default higher level queries
* A spell changing to another level now ensures that the filter for that level is turned on.
* Freeform is now at the end of repeats as well. Referencing [#379: Spell repeat does not work with freeform if there is a new line in freeform](https://bitbucket.org/mlenser/5eshaped/issues/379/spell-repeat-does-not-work-with-freeform)
* [#388: Click to roll damage does not work if the output is from the shaped chat macros](https://bitbucket.org/mlenser/5eshaped/issues/388/click-to-roll-damage-does-not-work-if-the)
* [#389: Click to roll damage cannot determine a crit on attack](https://bitbucket.org/mlenser/5eshaped/issues/389/click-to-roll-damage-cannot-determine-a)

## 11.0.0

### Breaking Changes

* Some unused fields related to abilities and saving throws have been removed
* [#338: Click to roll damage](https://bitbucket.org/mlenser/5eshaped/issues/338/click-to-roll-damage) has been completed for both attacks and saving throws.
* Spell filters have been revamped. Levels and casting time are toggled individually now. Concentration's behavior is now more clear. The filters are now consistent between PCs and NPCs. Adding spells on a new pc that doesn't have spellcasting should be much more clear. The macro output matches the levels that are toggled on.
* Rests are always showing now. In 11.1.0 or 12.0.0 rests will be fully moved to the sheet so non-Pro members can use them to recharge things like hit points, hit dice, exhaustion, class features, etc.
* Ability checks, Saving throws, and Spells chat macros now use the normal size of text used by attacks, actions, etc. It is no longer possible to configure them to be smaller.

### Features

* [#178: 3D dice should roll the appropriate amount of dice](https://bitbucket.org/mlenser/5eshaped/issues/178/3d-dice-should-roll-the-appropriate-amount)
* [#359: Option to hide AC using stylish](https://bitbucket.org/mlenser/5eshaped/issues/359/option-to-hide-ac-using-stylish)
* Distances entered into places like senses or speed will now convert the distance if the entered distance type (meters) doesn't match the text (feet).
* [#204: Nowhere to store usage of lair and regional actions](https://bitbucket.org/mlenser/5eshaped/issues/204/nowhere-to-store-usage-of-lair-and)
* Added configurable recharges to warlock slots and spell points (defaulting to short rest and long rest respectively)
* [#244: Extra Attack Class Feature missing from togglable lists.](https://bitbucket.org/mlenser/5eshaped/issues/244/extra-attack-class-feature-missing-from)
* Added styling for an upcoming API feature (Spells and Monster import revamp)

### Bug Fixes

* [#369: NPC Hit dice not able to be changed](https://bitbucket.org/mlenser/5eshaped/issues/369/npc-hit-dice-not-able-to-be-changed)
* [#378: Hit dice formula error](https://bitbucket.org/mlenser/5eshaped/issues/378/hit-dice-formula-error). You may need to clear your chat archive for this one (I did, but I'm unsure if it is required)
* [#379: Spell repeat does not work with freeform if there is a new line in freeform](https://bitbucket.org/mlenser/5eshaped/issues/379/spell-repeat-does-not-work-with-freeform)

## 10.1.5

### Bug Fixes

* [#372: Skill proficiency doesn't import from SRD properly](https://bitbucket.org/mlenser/5eshaped/issues/372/skill-proficiency-doesnt-import-from-srd)
* [#365: Macro buttons in the settings throw errors if there's "" in the character name](https://bitbucket.org/mlenser/5eshaped/issues/365/macro-buttons-in-the-settings-throw-errors)

### UI Adjustments

* Added some left margin to passive skills. [#340: Passive Skill display enhancement](https://bitbucket.org/mlenser/5eshaped/issues/340/passive-skill-display-enhancement)
* Reworded Advantage query to "Query (Advantage default). [#255: Advantage and Disadvantage Roll Query are reversed.](https://bitbucket.org/mlenser/5eshaped/issues/255/advantage-and-disadvantage-roll-query-are)

## 10.1.4

### Bug Fixes

* Health from OGL conversion now converts properly for the (seemingly) few cases it wasn't working before. Closes [#261: ConvertFromOGL SKT -> 9.1 issues](https://bitbucket.org/mlenser/5eshaped/issues/261/convertfromogl-skt-91-issues)
* [#361: Paladin class data typos/issues](https://bitbucket.org/mlenser/5eshaped/issues/361/paladin-class-data-typos-issues)
* Removed 99% of logging from my sheet. There will be some cases, but they should be rare. Closes [#289: More controllable logging](https://bitbucket.org/mlenser/5eshaped/issues/289/more-controllable-logging)
* Added some callbacks to OGL conversion which was causing it to not update traits, actions, etc when converting. Addresses part of [#362: ConvertFromOGL Lost Halls of Everforge](https://bitbucket.org/mlenser/5eshaped/issues/362/convertfromogl-lost-halls-of-everforge)

## 10.1.3

### Bug Fixes

* [#345: Default Sheet Settings sets wrong values for integer fields](https://bitbucket.org/mlenser/5eshaped/issues/345/default-sheet-settings-sets-wrong-values)
* [#348: Critical Damage on Cantrips using the cantrip formula when crit dmg maximized](https://bitbucket.org/mlenser/5eshaped/issues/348/critical-damage-on-cantrips-using-the)
* [#350: Eldritch blast issues](https://bitbucket.org/mlenser/5eshaped/issues/350/eldritch-blast-issues)
* Ensured that when a spell is dragged from the SRD to a level that does not match its level that it maintains all data passed from the SRD when it is moved to the proper level. This solves higher level damage issues and closes [#351: Shatter spell issue](https://bitbucket.org/mlenser/5eshaped/issues/351/shatter-spell-issue)
* Magic Missile now imports without a higher level damage_dice. Closes part of [#349: Magic missiles issues](https://bitbucket.org/mlenser/5eshaped/issues/349/magic-missiles-issues)
* [#354: Extra crit damage for saving throw shows for secondary damage](https://bitbucket.org/mlenser/5eshaped/issues/354/extra-crit-damage-for-saving-throw-shows)
* [#353: Slight vertical misalignment on traits section usages in condensed mode](https://bitbucket.org/mlenser/5eshaped/issues/353/slight-vertical-misalignment-on-traits)
* Adding/Changing a class or updating levels does not change the spell_ability, therefore resetting all spells. Closes the bug from [#352: Changing spellcasting ability changes it for all spells](https://bitbucket.org/mlenser/5eshaped/issues/352/changing-spellcasting-ability-changes-it)

## 10.1.2

### Bug Fixes

* [#342: Top hit dice not clickable](https://bitbucket.org/mlenser/5eshaped/issues/342/top-hit-dice-not-clickable)
* Class Level is now a select
* [#337: Spellcasting parsing doesn't always detect class](https://bitbucket.org/mlenser/5eshaped/issues/337/spellcasting-parsing-doesnt-always-detect)
* [#328: NPC Multiattack gains "Ranged Spell Attack" on upgrade to 10.0.1](https://bitbucket.org/mlenser/5eshaped/issues/328/npc-multiattack-gains-ranged-spell-attack)

### Code Cleanup

* Removed import_data is it's now done via API directly

## 10.1.1

### Bug Fixes

* Show arithmetic sign for initiatives of "0". "+0" is the result for 0 now.
* Added "character_sheet" field which will help API authors identify the sheet. It'll follow the format Aaron and I agreed on: "Shaped v10.1.1". Version will still exist. See [Aaron's post on the topic](https://app.roll20.net/forum/post/4714038/character-sheet-authors-a-request-from-api-authors/#post-4714038).
* Changed how "initiative_formula" is stored so it can be used for scripts like Group Initiative. See the [documentation](https://docs.google.com/document/d/1yPcIZ_bIc3JlnWsKZt2tAB0EQSIVEfeMtT0GifbpJIg/edit#heading=h.2sgngharia1b) for how to set this up properly.

## 10.1.0

### Features

* Added "Powerful Build" as a racial trait. Closes [#331: Change to encumbrance multiplier](https://bitbucket.org/mlenser/5eshaped/issues/331/change-to-encumbrance-multiplier)

### Bug Fixes

* [#333: NPC actions with "plus" damage do not set plus toggle](https://bitbucket.org/mlenser/5eshaped/issues/333/npc-actions-with-plus-damage-do-not-set)
* [#290: Adding bonus damage to hit updates saving throw average damage](https://bitbucket.org/mlenser/5eshaped/issues/290/adding-bonus-damage-to-hit-updates-saving)
* [#329: Racial Features -> Racial Traits upgrade fails](https://bitbucket.org/mlenser/5eshaped/issues/329/racial-features-racial-traits-upgrade)
* [#327: NPC spellcasting Upgrade](https://bitbucket.org/mlenser/5eshaped/issues/327/npc-spellcasting-upgrade)

## 10.0.1

### Bug Fixes

* Minor spacing fixes based on how the html is compiled as part of 10.0.0
* Converting from ft. to m. no longer adds two periods at the end.

## 10.0.0

### Breaking Changes

* [#326: Rename "Racial Features" to "Racial Traits"](https://bitbucket.org/mlenser/5eshaped/issues/326/rename-racial-features-to-racial-traits). An upgrade is included so all items should be moved over to the new section if any were created after 9.1.0
* Removed "weight_multiplier" and "encumbrance_multiplier" in favor of just using the 4 multipliers: "carrying_capacity_multiplier", "max_push_drag_lift_multiplier", "encumbered_multiplier", "heavily_encumbered_multiplier".

### Bug Fixes

* [#243: Long trait name use count is outside brackets](https://bitbucket.org/mlenser/5eshaped/issues/243/long-trait-name-use-count-is-outside). This required a change to how white spaces are compiled. They are now manually added so please let me know if I've missed any areas.
* [#317: HP posted in chat has the wrong font-size](https://bitbucket.org/mlenser/5eshaped/issues/317/hp-posted-in-chat-has-the-wrong-font-size)
* [#323: Class Features not showing in presentation mode after an upgrades](https://bitbucket.org/mlenser/5eshaped/issues/323/class-features-not-showing-in-presentation)

## 9.2.3

### Bug Fixes

* [#303: 9.2.2 - Unarmored AC not calculating correctly](https://bitbucket.org/mlenser/5eshaped/issues/303/922-unarmored-ac-not-calculating-correctly). I believe this also closes [#300: DC displayed incorrectly for some monster actions](https://bitbucket.org/mlenser/5eshaped/issues/300/dc-displayed-incorrectly-for-some-monster), but will need Miodziek to verify when I release.
* [#304: Jack of all Trades and Remarkable Athlete not applying correctly](https://bitbucket.org/mlenser/5eshaped/issues/304/jack-of-all-trades-and-remarkable-athlete)
* [#307: Hit die roll should have a minimum of zero](https://bitbucket.org/mlenser/5eshaped/issues/307/hit-die-roll-should-have-a-minimum-of-zero)
* [#308: Roll template is omitting uses when it's zero](https://bitbucket.org/mlenser/5eshaped/issues/308/roll-template-is-omitting-uses-when-its)
* [#305: Characters with custom classes lose hit dice 9.0.1 -> 9.2.3](https://bitbucket.org/mlenser/5eshaped/issues/305/characters-with-custom-classes-lose-hit)
* [#306: Add "process spell slots automatically" option](https://bitbucket.org/mlenser/5eshaped/issues/306/add-process-spell-slots-automatically)
* [#284: Warlock spells require casting level choice](https://bitbucket.org/mlenser/5eshaped/issues/284/warlock-spells-require-casting-level)

## 9.2.2

### Bug Fixes

* [#298: higher_level_query_1ST_LEVEL attribute not being created](https://bitbucket.org/mlenser/5eshaped/issues/298/higher_level_query_1st_level-attribute-not)
* [#292: Ankheg drag from SRD has no actions](https://bitbucket.org/mlenser/5eshaped/issues/292/ankheg-drag-from-srd-has-no-actions)
* [#296: Include identifier in roll template for repeated spells](https://bitbucket.org/mlenser/5eshaped/issues/296/include-identifier-in-roll-template-for)
* [#293: Adding Armor does not update AC properly on PC](https://bitbucket.org/mlenser/5eshaped/issues/293/adding-armor-does-not-update-ac-properly)

## 9.2.1

### Bug Fixes

* [#287: Ranger UA (2016) Natural Explorer](https://bitbucket.org/mlenser/5eshaped/issues/287/ranger-ua-2016-natural-explorer)
* [#279: Add a way for legendary actions to be identified](https://bitbucket.org/mlenser/5eshaped/issues/279/add-a-way-for-legendary-actions-to-be)
* [#176: Spell Macro always shows Spell Points](https://bitbucket.org/mlenser/5eshaped/issues/176/spell-macro-always-shows-spell-points)
* [#288: Ammo Field Replicating](https://bitbucket.org/mlenser/5eshaped/issues/288/ammo-field-replicating)
* [#281: Manually entered spells are moved to cantrips and sometimes duplicated on upgrade from 9.0.1](https://bitbucket.org/mlenser/5eshaped/issues/281/manually-entered-spells-are-moved-to)
* [#214: Spells macro shows non-existing warlock slots](https://bitbucket.org/mlenser/5eshaped/issues/214/spells-macro-shows-non-existing-warlock)
* [#285: Firefox: Checkboxes for attacks, saving throws, heal, etc become centered when toggled](https://bitbucket.org/mlenser/5eshaped/issues/285/firefox-checkboxes-for-attacks-saving)

## 9.2.0

### Features

* The way that data is retrieved from the server when referencing a repeating section has been altered to minimize the number of http requests I make to the server. The result is incredibly fast upgrades (20 seconds from the moment the sheet is clicked for a 6.5.1 PC loaded with spells). The new architecture allows me to retrieve multiple repeating sections and vary the id I get from each section or vary the fields I get from each section - it significantly improves the process. This will also allow me to run more functions in parallel.

### Bug Fixes

* Removed damage_crit from saving throw damage
* [#276: Race condition with spell slot parsing](https://bitbucket.org/mlenser/5eshaped/issues/276/race-condition-with-spell-slot-parsing)
* [#256: Saving throws and Ability Check macros always include "Honor" and "Sanity"](https://bitbucket.org/mlenser/5eshaped/issues/256/saving-throws-and-ability-check-macros)
* [#267: Inspiration chat post initially shows 1](https://bitbucket.org/mlenser/5eshaped/issues/267/inspiration-chat-post-initially-shows-1)
* [#269: Proficiency text is replaced on upgrade and level up.](https://bitbucket.org/mlenser/5eshaped/issues/269/proficiency-text-is-replaced-on-upgrade)
* [#258: Death saving throw bonus isn't displayed in macros](https://bitbucket.org/mlenser/5eshaped/issues/258/death-saving-throw-bonus-isnt-displayed-in)
* [#262: "Auto" spell list does not show when there are no slots or points](https://bitbucket.org/mlenser/5eshaped/issues/262/auto-spell-list-does-not-show-when-there)
* "per_use" for things like ammo, armor, equipment, traits, attacks, actions, etc is now a "text" field so that it can allow things like custom queries.
* Attributes are now generated on sheet initialize. Closes [#237: Deflect Missile Monk Feature has issues with calculating the absorbed damage - Attributes not defined](https://bitbucket.org/mlenser/5eshaped/issues/237/deflect-missile-monk-feature-has-issues)
* [#245: Hitdice dont get retracted from a character after levels in a class are deleted.](https://bitbucket.org/mlenser/5eshaped/issues/245/hitdice-dont-get-retracted-from-a)
* [#275: The four new features and traits sections are not hidden in presentation mode](https://bitbucket.org/mlenser/5eshaped/issues/275/the-four-new-features-and-traits-sections)
* [#273: Spells don't prompt for level when they should](https://bitbucket.org/mlenser/5eshaped/issues/273/spells-dont-prompt-for-level-when-they). Additionally, spells will prompt for a level if you have no slots of that level or higher.
* [#218: Spell level change not running](https://bitbucket.org/mlenser/5eshaped/issues/218/spell-level-change-not-running)
* [#211: Total weight not calculating](https://bitbucket.org/mlenser/5eshaped/issues/211/total-weight-not-calculating)
* [#276: Race condition with spell slot parsing](https://bitbucket.org/mlenser/5eshaped/issues/276/race-condition-with-spell-slot-parsing)

## 9.1.1

### Bug Fixes

* [#223: Initiative rolls don't send to tracker](https://bitbucket.org/mlenser/5eshaped/issues/223/initiative-rolls-dont-send-to-tracker)
* [#209: Ammo field is generated every time a weapon is edited](https://bitbucket.org/mlenser/5eshaped/issues/209/ammo-field-is-generated-every-time-a)
* [#230: Upgrade from 7.12.2, Fire Bolt becomes melee](https://bitbucket.org/mlenser/5eshaped/issues/230/upgrade-from-7122-fire-bolt-becomes-melee)
* [#229: Spell with custom (maximized) damage loses damage on upgrade](https://bitbucket.org/mlenser/5eshaped/issues/229/spell-with-custom-maximized-damage-loses)
* [#233: Sorcerer metamagic not adding](https://bitbucket.org/mlenser/5eshaped/issues/233/sorcerer-metamagic-not-adding)
* [#235: Condense Buttons for Feature Section only have one toggle state between them.](https://bitbucket.org/mlenser/5eshaped/issues/235/condense-buttons-for-feature-section-only)
* [#238: Experience Points macro](https://bitbucket.org/mlenser/5eshaped/issues/238/experience-points-macro)
* [#239: Lair actions and Regional effects](https://bitbucket.org/mlenser/5eshaped/issues/239/lair-actions-and-regional-effects)
* [#241: Clicking GP for total gold results in error on new characters sheet without any gold.](https://bitbucket.org/mlenser/5eshaped/issues/241/clicking-gp-for-total-gold-results-in)
* [#240: Swarm import](https://bitbucket.org/mlenser/5eshaped/issues/240/swarm-import)
* [#205: Spellcasting parsing doesn't work](https://bitbucket.org/mlenser/5eshaped/issues/205/spellcasting-parsing-doesnt-work)
* [#217: NPC Spell from SRD Error](https://bitbucket.org/mlenser/5eshaped/issues/217/npc-spell-from-srd-error)
* [#236: Class Features Macro is empty](https://bitbucket.org/mlenser/5eshaped/issues/236/class-features-macro-is-empty)
* [#242: Conversion from Storm King's Thunder incomplete](https://bitbucket.org/mlenser/5eshaped/issues/242/conversion-from-storm-kings-thunder)

#### Silent update bugs

* [#206: Class Features don't generate output](https://bitbucket.org/mlenser/5eshaped/issues/206/class-features-dont-generate-output)
* [#212: Proficiency Bonus calculation/update](https://bitbucket.org/mlenser/5eshaped/issues/212/proficiency-bonus-calculation-update)
* [#221: Characters upgraded from 9.0.1 have “send to tracker” turned off by default](https://bitbucket.org/mlenser/5eshaped/issues/221/characters-upgraded-from-901-have-send-to)
* Initialized new sheets for [#222: New character’s initiative rolls are blank](https://bitbucket.org/mlenser/5eshaped/issues/222/new-character-s-initiative-rolls-are-blank), [#224: The saving throw chat dump macro is blank for new character without any save proficiencies](https://bitbucket.org/mlenser/5eshaped/issues/224/the-saving-throw-chat-dump-macro-is-blank)
* [#219: No proficiency bonus being added to skills](https://bitbucket.org/mlenser/5eshaped/issues/219/no-proficiency-bonus-being-added-to-skills)

### UI Adjustments

* Condensed attacks, traits, etc look as they do in 9.0.0

## 9.1.0

### Features

* Unit tests are being added progressively as issues come up. There is little coverage so far, but I will be expanding these as more work is done. This should increase the stability of the sheet where a function might not be doing as I expect.
* [#166: Change all data saving to run silently](https://bitbucket.org/mlenser/5eshaped/issues/166/change-all-data-saving-to-run-silently) should give a great boost to performance and along with the upgrade changes this should reduce a fair number of bugs caused by incompatible updates occurring simultaneously.
* Upgrades have been entirely revamped to run in one server call as much as possible. This prevents strange errors where multiple conflicting upgrades are occurring at the same time. It also allows me to close the processing message after the upgrade is complete. Therefore that now spans the whole sheet. There is a slight delay of processing after the message closes for cases where all actions are updated (9.1.0), but that willworked on in the future.
* [#172: Parse Actions, Reactions, Legendary Actions, Lair Actions from the new Monster Manual format](https://bitbucket.org/mlenser/5eshaped/issues/172/parse-actions-reactions-legendary-actions)
* [#9: Handle Repeatable attacks, saves, and damage for cases like Call Lightning, Scorching Ray, Hunter's Mark](https://bitbucket.org/mlenser/5eshaped/issues/9/handle-repeatable-attacks-saves-and-damage)

![alt text](http://i.imgur.com/O7mDQiS.png "9.1.0 spell repeat")
* [#2: Meters instead of feet](https://bitbucket.org/mlenser/5eshaped/issues/2/meters-instead-of-feet)
* [#145: Handle "if used with two hands" when parsing monsters](https://bitbucket.org/mlenser/5eshaped/issues/145/handle-if-used-with-two-hands-when-parsing)
* [#146: Have Armor items output the content field to the chat, as per other equipment items](https://bitbucket.org/mlenser/5eshaped/issues/146/have-armor-items-output-the-content-field)
* If custom saving throws are used normal saving throws will be converted to that system for "saving_throw_vs_ability" as well as content fields of attacks, actions, spells, etc. For example "Dexterity" would be replaced by "Reflex".
* Traits are now split to "Racial Features", "Class Features", "Feats", and "Traits". Closes [#140: Add Feats repeating section](https://bitbucket.org/mlenser/5eshaped/issues/140/add-feats-repeating-section)
* When a Class Feature is toggled off it is removed from the list of class features (toggling the class does not remove all class features, they must be done individually).
  * "Create Class Features" has been removed from the settings as it can now be toggled directly. Once a class feature has been toggled off it will not be generated again.
* [#171: Incorporating Proficiency Die option to Spell Save DC](https://bitbucket.org/mlenser/5eshaped/issues/171/incorporating-proficiency-die-option-to)
* Spells displaying no longer require Slots or Points to be toggled. So the user must select "Spells" and then from there they can either turn off filters (which now shows all levels) or click "All" for spell level with filters on. The vast majority of cases will have a class which will add the necessary toggles, but this should help cases without a class figure out how to input spells. I'd like to improve it further potentially, but it's difficult to default to "auto" while showing some levels to start. Closes [#160: Spells gained via trait on non-casters](https://bitbucket.org/mlenser/5eshaped/issues/160/spells-gained-via-trait-on-non-casters)
* Initiative now has more of its calculations done via sheet workers. I has cleaned up its code which should make it more reliable with all the bonuses that can add on. I've also changed the value of "initiative_to_tracker" and "initiative_tie_breaker" on the settings page to both be 1.
* Critical damage from the default damage can be turned off, allowing for no crits at all or custom critical damage when combined with "extra on a crit". Closes [#167: Custom critical damage no longer supported](https://bitbucket.org/mlenser/5eshaped/issues/167/custom-critical-damage-no-longer-supported)
* [#179: Add repeating section identifier to roll templates](https://bitbucket.org/mlenser/5eshaped/issues/179/add-repeating-section-identifier-to-roll)
* Skill generation has been optimized for new characters so it creates 3 server calls instead of 20.
* Hit Dice have been revamped to work entirely on sheetworkers.

### UI Adjustments

* The roll template is formatted differently to have the type on the line above.

![alt text](http://i.imgur.com/86r2M6P.png "9.1.0 roll template")
* [#103: When Actions, Attacks, Traits, etc are condensed show them in a list like spells](https://bitbucket.org/mlenser/5eshaped/issues/103/when-actions-attacks-traits-etc-are)
* [#156: Core Page Expanded Spellbook Improvement](https://bitbucket.org/mlenser/5eshaped/issues/156/core-page-expanded-spellbook-improvement)

### Bug Fixes

Many of these are discovered as part of the 9.1.0 changes and did not exist previously. I have included them anyways.

* [#198: Conversion to 9.0.1 mangles many SRD imported Actions/Attacks](https://bitbucket.org/mlenser/5eshaped/issues/198/conversion-to-901-mangles-many-srd)
* [#181: Monster Manual - Tokens droped from journal are not scaling or are not visable](https://bitbucket.org/mlenser/5eshaped/issues/181/monster-manual-tokens-droped-from-journal)
* [#82: Import of Orc War Chief doesn't apply Gruumsh's Fury correctly to attacks.](https://bitbucket.org/mlenser/5eshaped/issues/82/import-of-orc-war-chief-doesnt-apply)
* [#148: Bat Bite attack imports wrongly.](https://bitbucket.org/mlenser/5eshaped/issues/148/bat-bite-attack-imports-wrongly)
* [#173: Saving throw second damage crit showing](https://bitbucket.org/mlenser/5eshaped/issues/173/saving-throw-second-damage-crit-showing)
* [#174: Equal padding for roll and attack rolls for roll2](https://bitbucket.org/mlenser/5eshaped/issues/174/equal-padding-for-roll-and-attack-rolls)
* [#176: Spell Macro always shows Spell Points](https://bitbucket.org/mlenser/5eshaped/issues/176/spell-macro-always-shows-spell-points)
* [#187: Global Spellcasting Attack Modifier](https://bitbucket.org/mlenser/5eshaped/issues/187/global-spellcasting-attack-modifier)
* [#200: Brutal Critical](https://bitbucket.org/mlenser/5eshaped/issues/200/brutal-critical)
* [#195: Skill Rolls for Non-Proficient Skill broken](https://bitbucket.org/mlenser/5eshaped/issues/195/skill-rolls-for-non-proficient-skill)
* [#197: Saving Throw Rolls - Proficient](https://bitbucket.org/mlenser/5eshaped/issues/197/saving-throw-rolls-proficient)
* [#193: Monster Manual - Strenght modifier applied to 1d1 attacks](https://bitbucket.org/mlenser/5eshaped/issues/193/monster-manual-strenght-modifier-applied)
* [#199: Different rounding on mean damage](https://bitbucket.org/mlenser/5eshaped/issues/199/different-rounding-on-mean-damage)

## 9.0.1

The following issues should have no impact on the stability of the sheet. All are minor issues. I purposefully avoided anything that may cause other issues.

### Bug Fixes

* freetext and display_text were only being cleared if content was empty and that wasn't always true. Now it correctly determines if it should be set to content or added to content. Either way both are cleared in all cases it seems. Closes [#150: Upgrade 7.12.2 to 9.0.0](https://bitbucket.org/mlenser/5eshaped/issues/150/upgrade-7122-to-900) and [#159: Automatically-created class features fail to clear freetext on conversion](https://bitbucket.org/mlenser/5eshaped/issues/159/automatically-created-class-features-fail)
* Spells with ranged attacks were being upgraded as melee spell attacks. This is solved as part of the upgrade to 9.0.0. The upgrade will not rerun for 9.0.1. Closes [#154: Wizard Spell Upgrade 7.12.2 to 9.0.0](https://bitbucket.org/mlenser/5eshaped/issues/154/wizard-spell-upgrade-7122-to-900)
* New attacks will not show "undefined" as part of the damage string. Closes [#153: Attacks created default to bad damage string](https://bitbucket.org/mlenser/5eshaped/issues/153/attacks-created-default-to-bad-damage)
* [#155: Condense on Equipment not functioning](https://bitbucket.org/mlenser/5eshaped/issues/155/condense-on-equipment-not-functioning)
* Any ability with freeform will now toggle "show_freeform" to be on for the whole sheet.
* [#161: Removing character levels does not remove character_level attribute](https://bitbucket.org/mlenser/5eshaped/issues/161/removing-character-levels-does-not-remove)
* [#162: NPC Action free text sometimes remains behind](https://bitbucket.org/mlenser/5eshaped/issues/162/npc-action-free-text-sometimes-remains)

### Known Issues

* **Duplicate repeating Item:** Versatile Weapons. It is possible for some duplication of versatile weapons during the upgrade. This is a race condition that I had squashed on another character. This likely won't appear on a character without spellcasting. It's a difficult bug to stop - like all race conditions are. The real fix is revamping my updates to use silent, but that's a later version. I think this is an issue we'll have to accept. See [#158: Quarterstaff (Versatile) created 3 times on upgrade](https://bitbucket.org/mlenser/5eshaped/issues/158/quarterstaff-versatile-created-3-times-on)
* **Duplicate repeating Item:** Fighting Styles will have a duplicate one based on the class. Fighting Styles are split to class specific traits now. The user will have to determine to delete the old fighting style. This was done to prevent data loss. See [#151: Fighting Style Upgrades](https://bitbucket.org/mlenser/5eshaped/issues/151/fighting-style-upgrades)
* **Attack/Damage/Saving Throw toggled:** While upgrading a toggle may be selected. The fix is to unselect it. This should be very uncommon, but will occur if a user entered data and then untoggled a section. I had to be more liberal with how I determine if one of the toggles is selected for various reasons. The toggles will be selected if there is anything in "damage", "damage_ability", "damage_bonus", "damage_type", "heal", etc. You can simply untoggle them. See [#152: Abilities with Superiority Die in Description](https://bitbucket.org/mlenser/5eshaped/issues/152/abilities-with-superiority-die-in)
* **Handled for new imports and a workaround** [#147: NPC action: changing ability bonus for attack to "nothing" is reset to Str](https://bitbucket.org/mlenser/5eshaped/issues/147/npc-action-changing-ability-bonus-for) This is an edge case that only applies to things like Bat. It needs to be solved, but it requires a change that alters how I get and save data from the server. That is too risky for 9.0.x. In the mean time importing from SRD or JSON will parse the correct attack or damage by adding positive or negative bonuses. It can be manually adjusted as well. I will solve this for 9.1.0 or later.

## 9.0.0

### Breaking Changes

* Completely revamped how attacks, saving throws, and damage is entered into the sheet. The new model is that attack has damage and secondary damage, saving throw has damage and secondary damage, and there is damage that is not tied to either.
  * Editing uses of Attacks, Actions, and Traits can be done in presentation mode.
  * Damage of all types is now split between the die size and the amount of dice for critical damage changes and for ease of higher level for spells.
  * Saving Throw damage will not multiply on a crit, but the others will.
  * Ability selects are now stored as 3 characters instead of the full name. (some areas had breaking changes as a result).
  * Content is the new freetext field for all attacks, spells, etc. Freetext still exists, but content is where the main content goes. Freetext will be purely for users to edit.
  * Saving throw condition and saving throw failure are no longer fields. Saving throws are rather diverse in their wording and subscribing a setup for them is too difficult at this time. It's best to leave the conditions and saving throw failure in the text. Save success is extracted as it is commonly used for half damage.
  * Attacks always have an attack roll. This has always been implied by name and and written about on the forums. If you previously had things without attacks in this section they likely belong in another section (spells, features & traits).
* Saving throws from things like spells, attacks, traits, actions, etc in the chat output now use @{selected} instead of @{target}. This should be much easier for PCs and slightly easier for NPCs.
* The roll template has had many fields added and removed. The styling is also adjusted to be left aligned.
* Upgrade scripts for sheets older than 3.0.0 have been removed. 3.0.0+ upgrades will still be run on those sheets, but no older upgrades than that. 3.0.0 was released April 30th 2016 so that should've allowed plenty of time for people to upgrade.

### Features

* Colors have been adjusted to increase contrast (readability)
* Adding a class automatically adds proficiencies (armor, weapon, tools, and saving throws) as well as the spell_ability and it toggles the appropriate spell toggles such as spells, cantrips, spell slots, prepared matters.
* NPC actions that have an attack now recalculate everything when a relevant field is changed. Generating nice texts like "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 2) piercing damage."
* Critical damage is automatically calculated with the option to use the maximum damage as a houserule. Additionally you can select the half-orc savage attacks to be added automatically as well as manually enter an amount to be added on a critical (after toggling on "extra on a crit" on the settings page).
* Crit Range and Extra damage on a crit are not shown by default, but can be turned on 1 by 1 on the settings page.
* The UI of attacks, saving throws, etc is created is now all based on inline editing with auto expanding input widths.
* Auto-expand inputs are used for nearly every input on the sheet. This really improves the styling in some areas. Some noticeable areas: Skill ability selects, attack/damage sections.
* Versatile weapons are now split into two different weapons when they are dragged from SRD.
* [#98: Add Artificer](https://bitbucket.org/mlenser/5eshaped/issues/98/add-artificer)
* Added Ranger UA to the class options list. Closes part of [#102: Increasing character class level reverts changes made to traits](https://bitbucket.org/mlenser/5eshaped/issues/102/increasing-character-class-level-reverts).
* [#96: Add the ability to change the unarmored formula](https://bitbucket.org/mlenser/5eshaped/issues/96/add-the-ability-to-change-the-unarmored)
* [#104: Allow higher level to query for all levels, not just available spell slot levels](https://bitbucket.org/mlenser/5eshaped/issues/104/allow-higher-level-to-query-for-all-levels)
* Condense buttons added to attacks, actions, reactions, and legendary actions. It remains on traits for both PCs and NPCs.
* Added distance "ft." to senses and speed and several other areas. This updates when you change your distance in the setting page.
* Resistances are hidden for PCs if they are empty.
* Section titles on the NPC core page are now clickable (actions, reactions, legendary actions, etc). They output the chat macro.
* NPC names are now clickable. They output the statblock.
* Added a spells toggle on core for PCs which is viewable in edit mode.
* Added a link to report an issue to the sheet (next to documentation)
* Emote, Freetext, and Freeform are not shown by default, but can be turned on 1 by 1 on the settings page.

### Bug Fixes

* NPC tokens show the correct radius when dragging a token on the map. Closes [#92: Check Valid data entry of "senses"](https://bitbucket..org/mlenser/5eshaped/issues/92/check-valid-data-entry-of-senses)
* Many other 9.0.0 bugs. See the recent activity on my [issue tracker](https://bitbucket.org/mlenser/5eshaped/issues).

## 8.5.1

### Bug Fixes

* Speed and Senses now round to 1 decimal place when converting to meters.
* [#94: Weapon damage ability modifier reseting](https://bitbucket.org/mlenser/5eshaped/issues/94/weapon-damage-ability-modifier-reseting). Also fixed the attack ability and use the meters/feet toggle to read the distance for reach parsing.
* Spell widths adjusted to be more consistent. [#91: Low width for spells outside condensed mode](https://bitbucket.org/mlenser/5eshaped/issues/91/low-width-for-spells-outside-condensed)
* Possibly fixed [#92: Check Valid data entry of "senses"](https://bitbucket.org/mlenser/5eshaped/issues/92/check-valid-data-entry-of-senses), but it's impossible to tell as I don't have Volo.

## 8.5.0

### Features

* [#1: Track spells Prepared/Known](https://bitbucket.org/mlenser/5eshaped/issues/1/track-spells-prepared-known). Cantrips are not included as part of the known or prepared calculations.

## 8.4.0

### Features

* Psionics have been removed as I plan to use [psionics as spells](http://homebrewery.naturalcrit.com/share/r1bPpZOb8e)

### Bug Fixes

* The toggle upgrade was not toggling content for spells and was always toggling saving throw and extras for everything. This has been fixed now. As part of this toggle detection has been redone.
* Size, Speed, and Senses in the NPC statblock macro are now fixed.
* Recharge and cost now shows as part of action names in chat macros

## 8.3.0

### Features

* Attack, Saving Throw, Damage, Extras, Content, Ammo, etc toggles have all been revamped. I should no longer need to force the whole sheets to update when I change some variables here. These toggles are now stored in "roll_formula" which the sheet generates. This also allows me to improve the way that crit damage is added to the roll, closing [#88: [3D Dice] Crit damage dice should only show for attacks](https://bitbucket.org/mlenser/5eshaped/issues/88/3d-dice-crit-damage-dice-should-only-show)
* Recharge has been revamped for translation again. Recharge can now be "Short or Long Rest", "Long Rest", "Turn", "Recharge 5-6", "Recharge 6". In the display it'll show as "1/Long Rest". All of this should be upgraded and parse from SRD properly
* [#89: Magic Missile should drag from SRD as per RAW](https://bitbucket.org/mlenser/5eshaped/issues/89/magic-missile-should-drag-from-srd-as-per)
* Added "per_use" for Attacks, Armor, and Equipment

## 8.2.1

### Bug Fixes

* [#86: NPC action type changes after editing of freetext](https://bitbucket.org/mlenser/5eshaped/issues/86/npc-action-type-changes-after-editing-of). Also did some other refactoring to clean this area up. The toggle button is no longer cleared after each update (only on the initial one).

## 8.2.0

### Features

* Reliable talent added for rogue. This will work for rolling normally, with advantage, disadvantage, roll2, etc. This required a fair bit of refactoring around how "roll_setting" was set. The new version is much cleaner and easier to work with. Everything should be upgraded and working as intended. Closes [#84: Add Reliable Talent for rogues](https://bitbucket.org/mlenser/5eshaped/issues/84/add-reliable-talent-for-rogues)
* Many tooltips are now translated (no forced upgrade, but any new sheet or any change to force it to recalc will update it)

## 8.1.1

### Bug Fixes

* AC bonus for armor items is now correctly being added.
* +X magic items of the versatile property now add the bonus damage to the secondary damage section. As a subset to this I now parse finesse and versatile at the start of the weapon parse so this should help clean up some code.
* Ability checks macro now correctly adds the total value of each skill.

### User Interface Changes

* The top 2 rows of the center column for PCs have each had their width changed and other small styling tweaks

## 8.1.0

### Features

* Armor calculations have been refactored to be much easier to understand. Each armor type can now be "Light Armor", "Medium Armor", "Heavy Armor", or "Shield". Light, Medium, and Heavy add to Armored AC. Shield adds to both Armored and Unarmored AC. Unarmored AC is set more intuitively (see screenshot)

![alt text](http://i.imgur.com/qwBZx8G.png "New Unarmored AC")

### Bug Fixes

* Movement and senses no longer have line breaks between the label and the input while in edit mode.
* Every Armor type was adding dex as a result of some refactoring quite a while ago. This was most noticable on "Shield" ACs. This is fixed as per the new Armor calculations.

### User Interface Changes

* Inputs no longer have bottom borders by default. A few places have it manually.

## 8.0.0

### Breaking Changes

* Spells tab removed. The behavior on the core page with the expand option covers this need. This will save sheets with lots of spells between 10-30% of loading time, processing time, etc
* Vision, movement, and class features moved to the core page from the character page

### Features

* [#65: Honor and Sanity Attributes](https://bitbucket.org/mlenser/5eshaped/issues/65/honor-and-sanity-attributes). See screenshot below.
* The way Normal/Advantage/Disadvantage set is now changed to be more direct and require no sheet processing. There is no longer the possibility of the roll template outputting incorrect advantage state as a result of a slow script run. "Automatically revert (dis)advantage" will not work until Lucian upgrades his script. See [Automatically revert advantage needs to be updated for 8.0.0](https://github.com/symposion/roll20-shaped-scripts/issues/263)
* Normal/Advantage/Disadvantage now has 3 additional options: Query, Advantage query, and Disadvantage query. All will ask you which state to use when executing the macro. The Advantage/Disadvantage query options will default to that option.
* Initiative has the same options as above in addition to using the sheet's setting (Normal/Advantage/Disadvantage). Closes [#77: Add a CHOOSE_WHEN_ROLLING Initiative Roll Option](https://bitbucket.org/mlenser/5eshaped/issues/77/add-a-choose_when_rolling-initiative-roll)
* Skills have the same options as initiative.
* Movement is now split out into 4 different fields for PCs and NPCs. It automatically parses from the SRD and upgrades appropriately.
* Senses is now split out into 4 different fields for PCs and NPCs. It automatically parses from the SRD and upgrades appropriately.
* You can now choose a distance measurement system in the settings tag. Adjusting it will convert the numbers and labels for distances in movement and senses.
* Added class features to the Features & Traits area of the Core tab for PCs
* Features are now removed from the list of features if they are unchecked in the list of features (for example Careful spell). Closes [#76: Deactivating a feature should remove it from the list of features & traits](https://bitbucket.org/mlenser/5eshaped/issues/76/deactivating-a-feature-should-remove-it)
* Recharges have now been translated for traits, actions, reactions, etc. Old recharges have been converted for PC and NPCs. New NPCs will parse the recharge to translation. Closes [#40: Traits: short/long rest not translated](https://bitbucket.org/mlenser/5eshaped/issues/40/traits-short-long-rest-not-translated).
* Traits can now specify how many uses are used each time. Legendary Actions now specify their cost. The script will handle this via [Traits amount decremented should be based on new "used" field as of 8.0.0](https://github.com/symposion/roll20-shaped-scripts/issues/265). Closes [#7: Trait and Legendary cost support](https://bitbucket.org/mlenser/5eshaped/issues/7/trait-and-legendary-cost-support)
* Size for PCs moved to the header next to race.

![alt text](http://i.imgur.com/7u7sJDI.png "Honor and Sanity")

### Bug Fixes

* Structural change to how I access multiple repeating sections that should make them much quicker (I get all the values and then set them all at once instead of setting them individually)
* Large cleanup around spells as a result of the above and other minor changes that should speed up their processing. Same with psionics.
* Structural change to how I verify that the data I'm sending isn't already on the server (if it was blank and is being sent as blank it won't be sent now)
* Cleanup around other areas like abilities, ability checks, skills, saving throws, etc to speed them up a little bit.
* Ability checks and Saving throws macros are now generated in a more maintainable way. Both the chat macro and the query macro are visible on the page now.
* [#68: Spell duplication on script import of spellcasting monsters](https://bitbucket.org/mlenser/5eshaped/issues/68/spell-duplication-on-script-import-of). When parsing spells from the traits section it will check to see if each spell exists. If a spell by that name exists then it will not create a new one.
* [#74: Coin weight](https://bitbucket.org/mlenser/5eshaped/issues/74/coin-weight)
