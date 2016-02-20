# D&D 5e Character Sheet

This is a character sheet for use on Roll20.net with the latest (5th) edition of Dungeons & Dragons. The sheet is designed to be usable by all Roll20 users regardless of subscription level. It is not fully compatible with the default 5e sheet.

### TODO

Short Term:
* Spell Crit damage should use higher level
* Spell Crit damage should not roll 3D dice for secondary and other stuff that is toggled off.
* Revamp Traits. Keep fluff traits on the first page and for action like traits write "see Actions". Also include fluff traits on "Actions".
* Refactor Actions to use damage die and bonus like weapons do

Long term:
* Explore icons for damage types/resistances/etc https://app.roll20.net/forum/post/2110339/icons-for-damage-types-5e
* Add saves and other stuff to class actions.
* Make spells automatically reduce the amount left
* Add "Conditions" that make sheet-wide changes when a condition is toggled.
* Use the new roll templates greater than to enhance ac targeting. https://app.roll20.net/forum/post/1977290/update-5-slash-20-improved-player-directory-and-new-roll-template-features
* Vitality Points
* Look into proficiency dice
* Add support for crit fails/successes to weapons/spells/actions


### Changelog

**November 19th 2015**

* Bind to without chat avatars

**November 16th 2015**

* Add Halfling to NPC Actions

**November 15th 2015**

* Russian Indentation fixes

**October 30th 2015**

* Added Russian

**October 24th 2015**

* Added a setting for changing the passive skill base (instead of 10)
* Removed skill macro as it's in the check macro
* Fixed Lucian's spell thing after I changed spell higher level stuff to a select input
* Move Jack of All Trades to the class page

**October 16th 2015**

* Spell higher levels are now a select. No data should be lost unless you used something other than d2,d4,d6,d8,d10,d12,d20

**October 2nd 2015**

* More French Translations

**October 1st 2015**

* Setup some variables for Lucian

**September 28th 2015**

* Prevent "freetextname" from showing on roll templates

**September 20th 2015**

* Removed spellcastingtime from rolltemplate stuff

**September 19th 2015**

* Updated Save Macro
* Updated Check Macro (Depreciate Skill macro)

**September 17th 2015**

* French translations

**September 13th 2015**

* Removed old spell syntax

**September 5th 2015**

* Reduce number of attributes for spells.

**August 30th 2015**

* Fixed roll template header colors.

**August 29th 2015**

* Adjusted inline roll spacing for roll templates.

**August 26th 2015**

* Fixed class action page tabs

**August 22nd 2015**

* Added global bonus for spell healing

**August 19th 2015**

* Added casting time toggle. You can now toggle spells based on their casting time. Spells default to "1 action", but can be changed to "1 reaction", "1 bonus action", "1 minute" or "longer" which allows for any input. The roll template will always show the new value. The old value will be shown for a time (with a red error to tell you to fix it), but it will be removed soon.

**August 18th 2015**

* Altered query macros to remove "selected"
* Fixed multiattack macro to not display all the data
* Add Range to melee weapons for thrown weapons

**August 17th 2015**

* Moved speed up to the header.
* Styled jack of all trades to be a button
* Fixed ammo in roll template for new weapons

**August 16th 2015**

* CSS Cleanup

**August 15th 2015**

* Massive refactoring to all the toggle/tab buttons. They are all setup the same way now and have consistent padding. I have verified all the pages and I believe everything is still working
* Massive refactoring of the HTML structure for sheet-row stuff. Lots of changes. I've checked the whole UI and it all looks good, but I may have missed some things
* Removed separate damage for the second crit. Both crits (normal and adv/dis) now show the same damage if both show.

**August 14th 2015**

* output higher level query level to the roll template

**August 13th 2015**

* hide GM info settings and styling

**August 12th 2015**

* Renamed spell macro options to force it to update for some users which it wasn't updating for.
* Added alt damage to weapons

**August 11th 2015**

* fixed global spell bonus damage - higher level stuff broke it.

**August 10th 2015**

* Spell filters
* Removed HD note

**26th July - August 5th 2015**

* Revamp of spells:
  * Toggles are all redone and can be changed in the future
  * Added Emote
  * Added higher level for damage and heal
  * Split damage to attack damage and save damage
  * Aoe split from target
  * Save condition
  * Save failure
  * Revamped roll template to match these new changes. For the most part spells now use action stuff
* Added Query macros for Saves, Checks, and Skills

**25th July 2015**

* Changed Custom Skills to the slider.
* Removed Macro from weapons and actions.

**24th July 2015**

* Changed spell slots/points toggle to the same slider used on PC/NPC. Still unsure about the colors

**23rd July 2015**

* Initiative bonus can now text instead of just a number
* Removed warning about settings changes
* Made a new toggle for PC/NPC. The animation is super smooth outside of roll20, but in roll20 it is super laggy. I'll try to massage it more later.

**22nd July 2015**

* Weapon & Action Macro no longer outputs a blank line. (It cannot be toggled off - though it never could be)

**14th July 2015**

* Spell points are now a different field. Was a bug.

**13th July 2015**

* Bonus crit damage is now added via the bonus crit toggle instead of the bonuses toggle.

**12th July 2015**

* Added back a blank variable because repeating sections are bad.

**11th July 2015**

Most of the changes are to allow for a spell importer that is in the works on my API script. Components is for the API and for cosmetic purposes.
* Spells now have V,S,M toggles. The old syntax will still work as well (it appears in the materials field, but it is still named the same for compatability)
* Added Spell Source so you can show where it's from (Example: "phb 241", "ee pc 20"). Also has a toggle. It appears in the header of the roll template.
* Moved "Gained from" under a toggle

**3rd July 2015**

* Updated target name to show the token's name, not the character name
* Small UI adjustments (Quick Resources, header padding, quick spell stuff)

**2nd July 2015**

* Fixed the HTML of spells so they no longer break any pages after it
* (Dev) cleaned the tabs to use more consistent css
* (Dev) small cleanup based on html vaidation (value on textareas removed, step on input type text removed)
* Added a toggle to show HD rows
* Slightly decreased the height of the speed wrap box (5px)
* Added a notation so spell slots are current/max. Also changed color of the tab.
* Added attacks and saves vs target's name with a setting and API support.  Removed from TODO

**1st July 2015**

* Weapons and Actions will automatically have crit turned on by default.
* Fixed several bugs - quick melee has "button" printed. Melee attacks had an error where no bonuses were being added.
* Refactored spells' buttons to match the styling of weapons and actions.

**30th June 2015**

* Change of how the line break for macro works for weapons and actions. Tried to set it up 
* Added custom gold values. See https://app.roll20.net/forum/post/2016392/#post-2126410  Removed from my TODO.
* Added Multiattack to the roll template. See See https://app.roll20.net/forum/post/2016392/#post-2128439  Removed from my TODO.
* Second damage bonus for weapons was not being calculated. Fixed that.
* Weapon bonuses do not apply unless bonuses is checked. Applied to to hit bonus, dmg bonus, secondary dmg bonus, bonus crit dmg.  Removed from my TODO.

**29th June 2015**

* Added a setting to always hide initiative
* Refactored the settings page completely. See https://app.roll20.net/forum/post/2016392/#post-2128397 Removed from my TODO.

**26th June 2015**

* Macro was added to Actions by Lucian.

**25th June 2015**

* Fixed delete buttons so they show on spellbook and quick class resources.
* Added Class Actions to the Core page for PC sheets

**24th June 2015**

* Added Class Resources to the Core page for PC sheets
* Added "Loot" to the Core page for NPC sheets

**23rd June 2015**

* Added output all to the roll template

**22nd June 2015**

* Added a bonus field for AC that works on PC pages.

**21st June 2015**

* Death saves & failures now fill from left to right (with a "X" to reset)

**19th-20th June 2015**

* (Dev) Lots more cleanup
* Monk DC added to spells
* Added targetAC to Spells & Cantrips
* Added a toggle for "Quick Weapons" on the weapons page
* Halfling Luck (works on everything but spell attacks)
* Improved heart on tablets (still not great, but doesn't cut off at least)

**18th June 2015**

* (Dev) Refactored the grid system and cleaned up a lot of CSS - using scss now
* (Dev) HTML is compiled to be smaller now
* Removed the old NPC sheet
* Moved bonuses for Abilities/Saves/Checks/Skills to the Settings tab.

**9th June 2015**

* Resize quick fields to allow more room for hit and +dmg
* Shrink saves and checks to match skills' height
* Reorder pages to put Weapons, Actions, and Spellbook much earlier

**8th June 2015**

* Hide fields that shouldn't be displayed from weapons output now that class actions are added to the new weapons
* Remove name from the emote
* Shrunk some elements on the core page - mainly skills

**7th June 2015**

* Passive Perception in the header now corectly adds the bonus
* Class Actions added to new weapons

**29th May 2015**

* Class actions work on new weapons
* Character name is on its own line on the roll template now

**24th May 2015**

* Weapons can now run chat commands on each roll. Courtesy of Jeff S.(jjsheets on github).

**23rd May 2015**

* Spell points work on the core page as well now

**22nd May 2015**

* Ammo is now toggleable to show in the output.
* Added an optional button to ranged weapons that will auto increment ammo if you also have my script installed. https://app.roll20.net/forum/post/1734923/new-d-and-d-5e-shaped-character-sheet

**21st May 2015**

* Roll template's width is shrunk a bit to work with hidden chat avatars. Still larger than normal, but only by 6 pixels.
* (dev) used gulp to compile many pages to reduce duplicate code while making changes (doesn't change length for the final ouput)

**17-20th May 2015**

* Quick Actions example done - need to think about this before duplicating it
* Thrown weapons removed
* Some NPC elements now show on the PC sheet (Blindsight, other speeds)
* Expanded weapons out to 7 each
* Resized all of the core page to allow for quick weapons
* Weapons tab now has quick weapons as well

**16th May 2015**

* Added spell components to the spell header
* Made inputs smaller by default all over the sheet
* Added toggle for Old weapons
* Action name inputs are now big like spells and weapons

**14th May 2015**

* Fixed initiative
* Removed name from the other roll templates as well as cleaned more up
* Added an option setting to show the character name on all rolls. It is off by default.

**13th May 2015**

* Cleaned up CSS and expanded the roll template 20 px to the left
* Moved Ritual and Concentration icon to the top right of the roll template header
* Put Range, Reach, target, and spell details in the roll template header.

**12th May 2015**

* Spell Effects on a new line instead of a column
* Fix bug around printing out hd max values for players
* Shrunk the "Higher Level" textarea for spells and increased the description textarea.
* Allowed for the "Effects" textarea to be resized
* Revamped the spell roll template
* Added icons for Ritual and Concentration on the spell roll template

**9th May 2015**

* Added more German translations from Rouby. Core, Background, and Spells
* Split all the pages into their own html file which is all combined via GULP - this change only matters for contributors. It helps manage the pages to split the 20,000 lines to different files.

**8th May 2015**

* Added skill passive bonus
* Cleaned up skills on core sheet
* Shrunk Prof bonus and Exhaustion level inputs.

**4th May 2015**

* Added Spell Points

**2nd May 2015**

* Weapons revamp v2.

**1st May 2015**

* Attacks: First revision of new weapons has been completed.
* Show Bonuses / Penalties on the weapon and spell page as well.


**30th April 2015**

* Prevented weapons from erroring if the crit damage field did not have a value.
* Made targetAC work on Actions and Spells
* Spells can be removed again
* Spells no longer have a (dis)advantage toggle. All attacks roll the second die.
* Cleaned up how Actions send data to the roll templates
* Cleaned up spellbook to show "-" when a class doesn't have cantrips, spells known, or spells prepared
* Cleaned up roll templates

**29th April 2015**

* Actions: Effects now print out

**28th April 2015**

* Actions now have "Details" tab split out to "Reach", "Range", and "Target". Old creature who still had "Details" will still work even if the fields do not show.
* Added Multilingual support for other users to translate the sheet.
* Adjusted tooltips so that they can work on plain text. Put them in for Strength and Athletics. I expect many more to be added soon.
* Added tooltips for basic ability and skill checks.

**24th April 2015**

* Added spell slots to the Core page
* Cleaned up a few pages by adding tooltips for the text that was there.
* Changed colors on a lot of buttons and tabs

**21st-23rd April 2015**

* Bars now clear before importing. They currently do not work with formula attributes (passive_perception).
* Removed multiattack from each action
* Added a button on the sheet for multiattack. Text and script are there and the token action just references that button. The import script will auto populate this.
* BREAKING CHANGE: All actions have been renamed to follow the repeating syntax. I was really hoping to make repeating work, but it needs to be supported by roll20. This will make it easier to transition to repeating syntax if/when they do support it.

**20th April 2015**

* NPC Actions fixed details tabs so they show at the right times.
* Restyled spellbook page a bit to match the Shaped style.
* Filtered spells based on "Prepared", "Ritual", or "Concentration"

**19th April 2015**

* Added Save Damage and Save Damage Type
* Reorganized the tabs for npc Attacks to have Alt Dmg, Secondary Dmg, and Crit to be "under" Dmg for instance

**13th April 2015**

* Fixed typo: "legendary_action_notess" to "legendary_action_notes"
* Increased size on damage field for NPC Actions
* Added an additional attack type to NPC Actions: "Line". I will add more in the future

**12th April 2015**

* Background attribute updated so that the textarea matches the default sheet and the background in the header is a new attribute.
* Set the inventory to default to multiply

**10th April 2015**

* All sheets use "AC" again. It is calculated correctly for everyone. "Target" under settings now uses this and will work to target NPC and PC sheets.

**9th April 2015**

* Jack of All Trades now applies to Basic ability checks (Strength, Dex, Con, Int, Wis, Cha)

**8th April 2015**

* Added a setting to allow initiative to work on mobile.
* Cut the heart's top off on mobile as there is no other fix currently.

**7th April 2015**

* Previously hidden items are now shown by default: ability check bonuses, skill bonuses, initiative bonus.
* Added Save Bonus
* Renamed "Attacks" to "Actions" for NPC Attacks (now NPC Actions)
* Added "Alt Dmg" to all NPC Actions to allow for cases like swarms or creatures holding versatile weapons.

**6th April 2015**

* Wrote import script (Still a work in Progress)
* Fixed NPC attacks to work even if the values are blank (See https://app.roll20.net/forum/post/1806911/empty-input-type-number-breaks-calculation)

**5th April 2015**

* Added Custom Classes
* Fixed custom classes to add their level to the hit dice pool for the appropriately selected hit dice
* Added Real Lair Actions (3)
* Added Real Legendary Actions (3)
* Added more NPC Attacks (total 11)
* Cleaned up HD
* Added Custom Skills toggle
* Added Tooltips

**4th April 2015**

* Quick attacks' range bug fixed
* NPC Attacks Duplicated out to 2 until I add action types
* "Hidden Info" not possible as you can't send 2 rolls with 1 roll. see https://app.roll20.net/forum/post/1793729/show-certain-parts-of-a-roll-template-to-gm
* Added Passive Perception to the header info
* Split out senses to multiple fields in the header info
* Added Background to the header info for PCs
* Redid alignment the 2nd row of header info items with the addition of the new items.
* Set Proficiency for monsters (See MM 8)
* Removed save bonus to NPCs as they should simply use Proficiency. They should use Expertise if needed for skills
* Renamed some titles of sections such as
    * "Appearance"
    * "Background and Race Info"
    * "Class Levels and Resources"
    * "Class Features and Feats"
    * "Miscellaneous Notes"
* Added "Recharge" to the NPC attacks
* Added Lair Actions, Legendary Actions, and Reactions (need to turn Lair Actions into actual attacks)

**3rd April 2015**

* Added a testable version of NPC Attacks

**2nd April 2015**

* Fix initiative/ac row breaking line
* Prevent jumping on new death saves and other small adjustments
* Added save bonus to NPCs
* Moved AC note down for NPC sheets
* Fixed which pages are shown on "Show All"
* New Parenthesis for skills
* Style resistances better
* Style other textareas to match
* Used -> Current to have consistency across the board. 4/5 slots instead of 4/5 slots used. It is more consistent with HP and makes sense.

**1st April 2015**

* AC is now for PCs and npc_ac is for NPCs. AC still calculates the highest between armored and unarmored AC. See https://app.roll20.net/forum/post/1759669/target-and-ac-on-5e-character-sheet#post-1784957
* Cleaned up the sheet so it works better on firefox and iPad. The heart still needs to be fixed on iPad. see https://app.roll20.net/forum/post/1788374/targeting-tablet-devices-with-css
* Added "Skin" to determine skin color.
* Reduced the size of the shield
* Redid the buttons for Inspiration and Death saves
* Added Exhaustion
* Added number spinners to hp, hd, exhaustion

**31st March 2015**

* NPC sheet now hides all the PC tabs except spellbook and the new "NPC Attacks".  The old NPC sheet can be shown via a toggle.
* Started work on "NPC Attacks"

**30th March 2015**

* Fixed text scrunching on the spellbook

**29th March 2015**

* Merged Actoba's work

**29th March 2015**

* Merged Actoba's work

**27th March 2015**

* Attacks can now use target to display the target's AC. It's under the settings.

**24th March 2015**

* Quick Attacks are added for melee and ranged weapons
* Merged Actoba's subheaderright2 issue: https://github.com/Actoba/roll20-character-sheets/commit/36d300e4432ac61f83625675fc765d9e01f7feb6

**23rd March 2015**

* Resized shield and heart to make them smaller. See https://app.roll20.net/forum/post/1734923/new-d-and-d-5e-shaped-character-sheet#post-1748932
* Resized all of core to make it even more compact.
* Core now have 5 columns - 2/5, 1/5, 1/5, and 1/5.


**22nd March 2015**

* Merged changes from Actoba. See https://app.roll20.net/forum/post/1744887/dnd-5e-sheet-uoh-user-feedback-mini-update.
* Added back class actions as per above.
* Fixed alignment on ranged attacks' ranges.
* AC takes the highest of either the normal AC_Calc or NPC_AC
* Added Medicine back.
* Added a setting to determine who the sheet rolls to - public or DM. Applies to both PCs and NPCs.


**21st March 2015**

* Ranged Weapons now have Ranges
* NPC sheet is being depreciated. All of the items are put into the main sheet besides the attacks as of 22nd March version. For instance some items in the top header info switch, the AC field is editable, and the different forms of movement are shown for NPCs. I plan to disable Background, Class, Weapons, Armor, and Inventory for the NPC sheet. I'll make a NPC version of the Weapons tab for "standard attacks" which is a mix of standardized attacks and open ended attacks.
* Inventory expanded to 3 pages of 15 for a total of 45 (old was 40)
* Gray background added
* Updated the header info area to contain important info. Works for PCs and NPCs
* Resistances and Immunities are now viewable by PCs

**Initial release - 19th March 2015**
First release of the redesigned sheet.

**Notable changes:**

* Core page has been revamped based on the design of the official paper sheet (http://1.bp.blogspot.com/-SIz9DByDeZw/U6M51aKP-OI/AAAAAAAAAzM/OZ72wWzJMTA/s1600/sheet1.jpg). The core sheet is meant to present the information in a more concise, readable way so that users can find information quickly. I'm not fully satisfied with everything (The initiative box is funky, skills are too tall, etc), but it leaves plenty of room to expand if anyone has suggestions for things to put in the holes.
* Header part of the sheet now includes information such as Character Name, Race, Class, Background, Level, Alignment, Vision, XP
* Heart contains HP info.
* Shield Contains AC info.
* Skills
  * Skills have moved to the core sheet. The skill page has been removed.
  * Skill proficiency automatically adds "Jack of All Trades" if you are unproficient and it is checked. There are 3 states now (Unproficient, Proficient, and Expertise) which are displayed with a more visible token (—, +, or ++). The full description can be seen when clicking the select box.
  * Skill modifiers can be seen on hover.
* Initiative's modifier is hidden - it can be seen on hover. (Not satisfied with the positioning of this.
* Armor Class (AC) now calculates based on the greater of Unarmored AC and Armored AC.
* Removed old class features as it will be removed in the main version soon anyways.
* Realigned classes on the class page
* Optional Settings tab has been added with the following options:
  * Death saves can be whispered to the DM
  * Initiative can have a tiebreaker. This adds a modifier based on your initiative bonus. For instance rolling a 14 on a d20 with a initiative bonus of 3 would be 17.03.

### Future Changes

* Custom settings: I'm willing to add custom options/variants as long as they are technically feasible and can be hidden away without effecting users who do not want it.

### Requests and issues

Please include the "Shaped" term when posting about this sheet. I will do my best to respond to posts here. You can also open issues on github or contact me by PM, Twitter (@mlenser), gchat, or skype. If you have ideas/suggestions or want to work together I'm quite open.

### ​Differences between this version and the current version

PCs remain mostly the same. Things that have changed:

* Armor
* Vision
* Spell Prepared, Ritual, Concentration
* Class specific
* * Expertise
* * Jack of All Trades (retoggle it in 1 place)
* * NPCs lose most everything, but the old NPC sheet is still included and you can use conversion/import scripts.


---

Mark Lenser ([@mlenser](https://app.roll20.net/users/277007/mark) on roll20)