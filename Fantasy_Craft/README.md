## _FantasyCraft_ Character Sheet

Character sheet for _FantasyCraft_ by Crafty Games for use on roll20.net.  More updates with tabs and NPCs is planned for the future so this sheet is still **under construction** (See TODO below)
This is my fork of Suldae's initial sheet.

### ChangeLog

#### Bug Fix Update - December 2018
* Fixed width issues with Combat and Non-Combat areas for both static and repeated elements (I hope - works for me)
* Fixed shadowing of Charisma modifier in Spell area so formula should calculate correctly now
* Fixed typo on Weapons 2, 3, and 4 areas preventing attributes from being used in calculation.

#### Bug Fix Update - March 2016
* Changed Armor Qualitiese and Upgrades fields from number type to text type and widened them

#### Bug Fix Update - February 2016
* Added attribute names (or used unique names) to various attributes so they would work properly, such as drag-n-drop of initiative onto desktop

#### Major update - May 2015
* Added sheet config controls to remove background image and control Logos (thanks to Rich Finder)
* Added Initiative roll button which auto-populates Turn Tracker
* Added attribute name to spell hide/reveal so it will remember previous state
* Adjusted width of Combat/Non-combat abilities and made description fields variable height and scrollable text box, so text will always fit.
* Adjusted width of Gear fields to occupy full 100% of width and added location field
* Added Holdings section
* Finally(!) fixed width control of spell section's repitems.  Now they always occupy 100% width
* Added sheet version/date
* Adjusted Path text input to be wider and changed to textarea

#### Minor update - Mar 2015
* Darkened background as temporary 'fix' for larger UI changes
* Removed/consolidated the last of dead css classes

#### Bug Fix Update and Improvements - Feb 2015
* Migrated single class definitions to general ones
* Removed superfluous selector classes
* Darkened background

#### Bug Fix Update and Improvements - Feb 2015
* Fixed up this README...
* Added attribute name to coin-in-hand, stake, and Weapon placeholder names for weapon 2-4
* Made 'Knowledge Check' text part of button like with 'Effect' under spells
* Changed Weapons layout so that Damage roll button's purpose is more obvious
* Add Comp field and Effect field to Gear section
* Allow 0.5 increment to weight tracker
* Changed look & feel of gear, combat, and non-combat abilities slightly
* Put bounds on Threat value of weapons in weapon section
* Added missing weapon proficiency mods to weapons 2-4
* Added checkbox to add strength modification to damage roll
* Corrected look & feel of weapon section slightly
* Added min/max bounds on weapon threat value
* Change armor 'speed' value to 'speed penalty'
* Added tool tips to explain 'DP' and 'DR'


#### Bug Fix Update - Jan 2015
* Fixed typo in name affecting fortitude save roll

#### Update - Dec 2014
* Minor changes to Standard Character tab to fix shifting around and removal of out-of-date comments
* Changed Spellcasting skill to work like all the other skills (no longer need for checkbox at top of skill list)
* Cleaned up css elements no longer needed with Spellcasting skill changes
* Added Prep Cost to all Arcane spell levels
* Added Rolls for Saving Throws
* Added Bonus and Roll for Knowledge Checks

#### Bug Fix Update - Nov 2014
* Fixed typos in Threat Range title attribute and Bull Rush, Disarm, Grapple, and Trip basic actions.
* Fixed confusing text fluff when rolling for attacks from weapons section
* Fixed Bull Rush roll when using a weapon
* Fixed Bull Rush and Trip size difference calculations when using weapons
* Fixed spellcraft attribute name in Arcane magic session causing error when rolling to attack

#### Major Update - August 30 2014 thru October 
* Changed default values for skills and attributes to help reduce data entry requirements.
* New fonts!  But they don't work.  Boo, roll20! :-(
* Added missing Proficiency and Saving Throw data
* Added min 0 to various number values that cannot go below 0
* Added step of 1 to various number values
* Added section for additional action dice that some characters can receive
* Added Class/Origin checkbox to skills.
* Added Max Skill ranks
* Added automatic adjustment of Error range based on ranks added to the skill
* Added Spellcasting skill to list of skills, access controlled by class skill checkbox
* Added an attribute select element for each skill with appropriate default
* Changed Defense calculation to include other bonuses
* Added flat-footed Defense calculation
* Added Spell Defense
* Changed all type names to lower case.  Upper case appears to be breaking repeating sections.
* Fixed repeating sections which previously resulted in data loss (see previous)
* Changed Weapon titles to input fields with placeholders
* Added Keen field to weapons (but not incorporated into rolls)
* Added Subdual and Stress damage sections as well as Fatigue and Shaken conditions with grades, respectively.
* Added conditions tracking
* Added fittings repeating section to Armor
* Corrected size-related footnote in Actions section to include other actions (and added the footnote :-) )
* Added collapsible Spells section for Arcane and Divine magic
* Added Tabbed per-level Spell sections within collapsible section.
* Added FantasyCraft logo after receiving publishers permission.
* Added Ground, Fly, and Travel speeds Character section (used Fly vice 'Other' as Drake is a standard character in FC which can fly)
* Added Alignment details to Character section
* Lifestyle section with Panache, Prudence, and Income
* Made Attribute modifiers number type vice text
* Cleaned up initial sheets CSS indenting
* Began the process of removing singleton css class names, but more work needs to be done including removing unused css class names
* Reworked location of various fields to reduce the amount of blank space and lateral scrolling required.
* Added separate Special and Standard character sheet radio buttons
* Prettified background images using style/colors evocative of published material. 
* Renamed 'Gear, etc.' to 'Gear and Prizes' in keeping with official character sheet
* Add Overloaded, Lift, Push/Drag weight limit calculations to Gear
* Added Reputation and Renown to Gear and Prizes
* Tweaked Encumbrance calculations, allowing size to be used for both effective str in encumbrance calculations and dodge.  
  (Still a known issue with Vast size being off-by-one for encumbrance calculations, but probably not correctable.)
* Fixed bug in size usage when calculating to-hit with a weapon for Bull Rush and Trip where absolute size was being used and not relative size difference (this doesn't matter if everyone uses absolute size difference, but not everyone does)
* Added size difference Select to modify rolls
* Added 2H mod when calculate Disarm bonus

### TODO

* Compute Keen in conjunction with damage rolls
* Add Global Keen than just to individual weapons
* What to do if > 4 weapons?  Repeating field?
* Modify Skill checks for ACP using default checkbox
* Modify Skill checks for Fatigue
* Add 'const' and 'comp' fields to armor
* Simplify fittings by: Number or Quantity, Light/Heavy drop down, remove location, Change 'Fitting' to 'Fitting description' 
						Add tooltip explaining 2-3 fitting gain light modification while 4-5 gain heavy, 
						Change 'weight' to 'weight increase' or '+ weight'
* Armor resistances are still number type.  Should be changed to text/number
* Add sneak attack damage dice to weapons section
* Consider adding individual conditions select element in order to create flexible macros
* Need to add Contacts, Magic Items, Mounts, and Vehicles section to Gear & Prizes
* Add input field for Edge?
* Need to do comprehensive review of rolls and how they are computed
* Possibly create dedicated Tricks/Stance section to track which abilities are tricks/stances (or use T/S checkbox)
* Possibly create Feat Category select to help track how many feats of a tree a character has
* Character Disposition tracking for both Special and Standard (See pg 373)
* Standard Character sheet
* Merge 'Focus' into 'Skills' section?
* Add Critical Injuries and heal time in addition to conditions tracker?
* Update json file to provide more detail what is tracked and what is not
* Update json file to explain tooltip usage to provide table 'hints', special/standard sheet, Spellcasting incorporated into skills, what rolls auto-calculate, and where to find attribute names for creating macros


### NOTE

 This sheet was created to make basic data entry a bit easier for quickly getting started and fill in some missing stuff.  
 The error range of skills will be automatically set for those skills that have at least 1 rank in them, but if the user entered a value in the previous sheet, that might be adjusted after loading this one.
 
### Feedback

Problems, suggestions, or features are best handled by sending a PM on roll20.  If you comment on github, it **might** be seen, but don't count on it.  Please exercise patience as I may not have time to immediately address the issue.
([@DanW](https://app.roll20.net/users/256724/danw) on roll20)

### Contributors

If you feel you've contributed to the development of this character sheet, don't forget to add your name here!

* Jason Miller
* Dan W

### Honorary Credit
#### Credit to those that have influenced the design of the sheet with input, feedback, or just good style:
* Delal of crafty-games forums' custom character sheet
* Actoba's spell section and tabs from DnD 5e sheet
* Rich Finder's UI controls from SW sheet
