# DnD Moldvay Basic Character Sheet

This is a re-creation of the "green-sheet" for the D&D Basic Moldvay Red box game.  It was created for the Roll20 Moldvay Basic Contest.

## Current Version
2.7

### Changelog

#### 2.7
* Adding in visible chance numbers to most "chance" rolls
* Rolls that are supposed to be rolled by the DM for players will be sent to GM (Find secret doors, traps, etc)
* Adding Monster spells (#2990)
* Adding field for number of Monster attacks (#2991)
* Changing fonts to use google fonts Patrick Hand and Shadows Into Light since Roll20 will not fix bug (#265) - this should fix issue (#2989)
* Adding in Settings tab (currently nonfunctional) which will hopefully be used to change the color of the background per (#2330)
* Gave Spell Range and Spell Duration their own boxes to handle overflow better

#### 2.6
* Fix for Halfling Initiative to be set to on by default giving all characters the halfling initiative bonus

#### 2.5
* Fix for Monster Tab Overlapping UI Error (#2565)
* Monster Alignment is no longer a drop down box (#2332)
* Cleaned up some no longer used code

#### 2.4
* Fix for Monster THAC0 being set to read-only (#2426)
* Added field for Monster Initiative Bonus vs it being inside the roll (#2427)
* Cleaned up some odd spacing issues on Monster sheet

#### 2.3
* Added Sheet Worker to automatically add in Halfing Missile Bonus if Halfling Class is selected (#2325)
* Halfling Quick Bonus is now actually optional - selected within the Halfling class
* Add Sheet Worker to automatically calculate all To Hit Rolls (for both player and monster sheets) that are not THAC0 with the lowest value being 2
* Added new art for AC, HP and HP Max Boxes (#2329)
* Default values for Ability Scores and Saving Throws are now present on new character sheets (#2333)
* Cleaned up Monster Sheet background so its not blurry
* Alignment and HP Die are no longer drop-down boxes (#2332)

#### 2.2
* Added the ability to use Bonus or Minus roll query to your open doors check (using a crowbar for instance)
* Formatted the Open Doors roll template so you see your chance out of 6 to open the door upon rolling
* Removed the Sheet Worker script for Open Doors because sheet workers do not work with roll queries
* [Request] Added information to the mouseover on Rolls for Attacks to indicate which rolls are THAC0, Dice Roll, Bonus'
* Centered Success and Failure text

#### 2.1
* Spells now have roll templates
* Fixed formatting issue with dropdown boxes

#### 2.0
* Monster Sheet Update
* Monster Initiative can now be rolled within sheet
* Monster HP can now be rolled within sheet - result sent to GM
* Monster Morale checks can now be rolled within sheet - result sent to GM
* Monster Surprise checks can now be rolled within sheet - result sent to GM
* Monsters now have saves (Moldvay: Add monster saves #1898)
* Monsters now can have multiple damage dice per attack (Moldvay: Monster multiple monster attack die #1897)
* Monsters now have abilities section for non-attack roll abilities (Moldvay: Add monster abilities #1896)
* Fumbles no longer show damage done

#### 1.16
* Fixing sheet worker to calculate chance to open door on sheet open and STR mod change

#### 1.15
* Fixed chances for finding secret doors, listening, and finding traps, all of which were too high by 1 (e.g. 1/6 chance for all of those for non-demihumans, was 2/6)
* Fixed roll templates for the above, removing the critical successes in favor of operating properly
* Moving calculation for chance to open doors to a Sheet Worker to enforce minimum and maximum values

#### 1.14
* Separated out the two sheets (Character Record and Monster) so that they are more noticeable to the GM/Players
* Added To Hit AC for Monsters which fixes a bug with the new Attack Roll Template on the Monster Side
* Beginnings of Monster Update 2.0 - Random Encounter and Distance rolls sent to GM

#### 1.13
* Added To Hit Armor Class in the attack rolls instead of showing the die roll - this will use the values listed in the To Hit Roll table
* Fixed misplaced movement categories - Switched Combat and Running to where they should have been (Thanks, Hilary!)
* Fixed success/failure issue with Surprise checks - low numbers are failures on Surprise
* Fixed critical success/failure die rolls with Class ability skills: Find Trap, Listen, Detect Secret Doors, Stonecraft, Hear Noise
* Fixed spacing issue with spell labels in Firefox
* Added bonus/minus for Surprise Checks
* Fixed Halflings not speaking their own language

#### 1.12
* Moved Morale Check button next to Charisma in Ability section
* Removed old Morale Check from Class Abilities and fixed line spacing
* Fixed a format issue with drop-down select boxes in Chrome
* Decreased font slightly for labels
* Increased size of Prime Requisite field for demi-humans with multiple prime-requisite's, moved around boxes to make it fit
* Placeholder for Prime Requisite is no longer 0
* Starting value for Level is 1!
* Fixed spacing issue with Saving Throw Bonus fields
* Fixed bug with value for +/- Bonus not saving
* Fixed odd spacing with Armor Class Text
* Fixed bug with Initiative calculation - DEX bonus was not a straight mod, but instead was 3:-2, 4-5:-1, 6-8:-1, 9-12:0, 13-15:+1, 16-17:+1, 18:+2
* Added Character Name to all Roll Template Rolls - Now you know who is doing what!
* Gussied up Roll Templates - centering the Title, Name and Line; adding a dash of color to the same categories; adding a black border around the Roll Template box
* Fixed "bug" with Ability Rolls - requirements stated Roll Under for success, but Moldvay rules actually states "the player should roll the ability score or less on 1d20"
* Added better Crit Success, Crit Failure looks to Roll Template including number highlights
* Now showing Backstab Bonus (+4) in the roll so player won't add it in themselves accidentally 

#### 1.11
* Fixed more formatting issues found in Chrome Version 45.0.2454.85 m and Firefox 40.0.3
* Added in missing text for Thief Pickpocket skill
* Fixed bug with Class text field and Class radio button using the same value
* Fixed issue with default checked radio buttons - Sheet should now default to having Melee and Fighter checked

#### 1.1
* Changed Player Attack to static fields of Melee and Missile, removed repeating fields
* Fixed random formatting issues
* Fixed roll template look and feel - Now with more graph-y goodness
* All rolls should now have a visible roll template
* Added Success Fail indicators to Saving Throws.
* Added Success Fail indicators to Ability Rolls.
* Added Success Fail indicators to Open Doors Check.
* Added Success Fail indicators to Class Abilitiy/Misc Action.
* Fixed bug with Detect Secret Doors roll

#### 1.0
* Sheet creation for Roll20 contest

### Credit Where Credit is Due
The CSS and the layout of this sheet is an amalgamation of the work done by myself, ([@Actoba](https://app.roll20.net/users/427494/actoba) on roll20) on the 5e D&D sheet and ([@Natha](https://app.roll20.net/users/75857/natha)) on the Portes, Monstres et Trésors sheet.
