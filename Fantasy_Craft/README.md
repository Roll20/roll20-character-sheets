## _FantasyCraft_ Character Sheet

Character sheet for _FantasyCraft_ by Crafty Games for use on roll20.net.  More updates with tabs and NPCs is planned for the future so this sheet is still **under construction** (See TODO below)
This is my fork of Suldae's initial sheet.

### ChangeLog

* Major Update - August 30 2014 thru October 
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

* Add roll button for Initiative
* Add roll button for Saving Throws
* Add mod for Knowledge checks
* Add roll button for Knowledge checks
* Compute Keen in conjunction with damage rolls
* Add Global Keen than just to individual weapons
* What to do if > 4 weapons?  Repeating field?
* Modify Skill checks for ACP
* Modify Skill checks for Fatigue
* Armor resistances are still number type.  Should be changed to text/number
* Consider adding individual conditions select element in order to create flexible macros
* Need to add Contacts, Holdings, Magic Items, Mounts, and Vehicles section to Gear & Prizes
* Add input field for Edge?
* Need to do comprehensive review of rolls and how they are computed
* Migrate more individual class definitions in css to general ones
* Move style definitions on elements in html to css
* Possibly create dedicated Tricks/Stance section to track which abilities are tricks/stances (or use T/S checkbox)
* Possibly create Feat Category select to help track how many feats of a tree a character has
* Character Disposition tracking for both Special and Standard (See pg 373)
* Standard Character sheet

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
