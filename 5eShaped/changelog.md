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
