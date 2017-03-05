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
