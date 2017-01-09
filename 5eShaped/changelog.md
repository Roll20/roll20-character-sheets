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
