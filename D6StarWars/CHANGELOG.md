### Version 2.43 (2022-04):
- **PC sheet**
	- added Action selector for number of actions per round which automatically applies appropriate modifiers for MAP
	- added alternate character points field for character point tracker option
	- **Weapon & Armor**
		- Added field for parry skill and dice rolls to weapons
		- Added field for dexterity penalty to armor 
	- **Attributes & Skills:**
  	- Edited rolls to account for MAP
- **Force:** lightsaber combat added parry fields similar to weapons
- **Starship:**
	- Added Skill Dice locations and Dice buttons for: Pilot, Maneuverability, Sensors, Shields, Hull
	-	Ship weapons added: ammo field and notes field, field for gunnery skill, buttons for skill roll, fire control roll, combined gunnery and fire control
- **Settings**
  - added sheet for vehicles which is a reduced version of the starship sheet


### Version 2.42 (2021-08):
- **Attributes & Skills:**
  - added names to roll buttons (so they can be dragged to macro bar or called in chat)
  - skill name selection now have "(A)" on Advanced Skills
- **Force:** "Burst of Speed" added to control powers, lightsaber combat name shorter
- **Starship:**
  - make main info block more compact
  - weapons now have "location"-field, and the weapon's text-fields are more compact.
  - "Other Ship Stats" is more compact
- **Settings**
  - added button/link to sheet instructions/Changelog
  - clarify & cleanup settings options
- updated "Instructions" on sheet.json 
- minor visual fixes (Sheet-logo/title, wound level, init-bonus tracker, Background-section, footer)

### Version 2.41 (2021-05):
- fix broken styles

### Version 2.40 (2021-05):
- refactor sheet to be able to use the new Roll20 Sheet framework
- Feature: Skills, Species, Force Powers auto-suggestions, suggest relevant names as you start typing
- more code cleanup

### Version 2.34 (2021-05):
- Enhance Player Core info section's layout
- Reformats Player Secondary Info section
- Enhance Attributes & Skills section's layout
- Enhance Weapons & Armors section's layout
- Enhance Force section's layout
- FIX: cleaning up HTML code
- FIX: removes invalid CSS code
- FIX: Resist Pain effect works as expected

### Version 2.33 (2021-04-06):
- remove duplicated control force power name field
- fix force power section width

### Version 2.32 (2021-02-09):
- add missing lightsaber damage roll button

### Version 2.31 (2020-10-03):
- removed broken logo at top
- revamp of starship section
- add new roll templates, used in ship weapon damage rolls

### Version 2.16 (2020-05-13):

- add roll button names to attrs/skills
- fix roll button names for rest
- remove broken images


### Version 2.15 (2020-01-07):

- Fix the Ship's weapons

### Version 2.14 (2019-10-08):

- Adjust rolltemplates so title-text is centered, and bold 

### Version 2.13 (2019-07-23):
**Fix:**

- Added back strength pip to Soak rolls in the armor section
- remove duplicate DM roll button from Tech skills

**Features:**

- New sheet section: Character Point summary; meant for tracking how points are used. Includes option to hide section
- New sheet section: Credit Spenditure summary; meant for tracking how credits are spent. Includes option to hide section

- New sheet modes: **Ship** and **Shop/Container** as new options alongside existing **PC** and **NPC** sheet modes

- Default Settings: All Settings defaults can now be adjusted by GMs in the [Game Settings Menu](https://wiki.roll20.net/Game_Settings_Page#Character_Sheet_Default_Settings) outside the game. Additional settings that can be changed are `Character Points`, `Credits`, `Force Points` 

### Version 2.00 (2019-07-09):
**Fixes:**

- fixed on/off toggle for gmroll, isn't any longer entangled with other options
- Attribute section layout fix, shifted it to display 2 attributes per row from previous 3 per row

**Layout:**

- change Energy/Physical armor soak rolls to display icon instead of text to reduce clutter in button name; Energy Bolt for Energy and Star for Physical 

**Features:**

- New option: Now possible to disable the Wild Die from rolls, making the sheet easier to for playing 1E
- New option: Now possible to disable roll queries from sheet rolls, so button presses rolls dice instantly without asking for roll modifiers

### Version 1.83 (2019-05-28):

- Removed wound penalties from affecting soak rolls (reported by **Wolf**)

### Version 1.82 (2019-01-08):

- Add names to all roll button, so they can be dragged to user's macro bar


### Version 1.81 (2018-09-25):

- Change roll templates of different kind of rolls to have matching colors: Blue for attributes/skills, red for weapon/armor, black for custom and initiative rolls, and keep force rolls purple

- Readme link fix

### Version 1.80 (2018-09-17):

- Roll Templates added (Blue, red, green, black versions of the default)

- Force Emptiness sheet worker simplified (courtesy to **G G**)

- simplified npc/ pc toggle (code cleanup)

- remove redundant "sheet-" from all classes in html

- separate Changelog from Readme

### Version 1.72 (2018-08-22)

- Readme formatting
		
### Version 1.71 (2018-07-31)
**Fix:**

- Corrected Force Emptiness to scale properly with DarkSidePoints	
		
### Version 1.70 (2018-07-24)
**Layout:**

- Made wound tracker wider
	
- Force section
	
**New Feature:**

- Under Force skills, space for powers and their roll buttons added
		
### Version 1.68 (2018-07-17)
**Layout:**

- remove empty gap on top of sheet
	
- improved layout in most sections
	
- added some tooltip info to menu settings
	
- Moved Backgorund section under Equipment Section
	
- Sheet version number & sheet type is now shown in corner
	
**Fixes:**

- corrected Lightsaber Combat dmg roll
	
- Force Emptiness bonus is now properly reduced by number of DSP
	
**New Feature:**

- added Resist Pain Force power(with sheet worker)
	
**Other:**

- code cleanup of some rolls
	
- removed all sheetworkers that where Gumshoe inmort and unnecessary
	
- updated preview
		
### Version 1.6 (2018-07-10)

- sheet customization menu added with these options:
	
  - pc/npc sheet switch 							(condenced basic info block & equipment sections)
		
  - hide/show gmroll buttons option 				(these rolls are whispered to GM)
		
  - show/hide options for Force, Background & Equipment section
		
- Fixed Force Emptiness tracker						(now able to change it's strength according to DSP)
	
- minor formatting
	
- some code cleanup

### Prior v1.6

- Weapon section roll fixed (2018-02)
	
- Vehicle/Ship text blocks have been added to the bottom of the sheet(2018-02)
	
- "Lightsaber Combat" option added to the Force section so you can have your attack and damage rolls preset for "Lightsaber Combat" (2018-02)
	
- Unused Resist Pain attribute removed (2018-02)
	
- Added a Skill Section and Attack Button (weapon section) (2018-01-15)
	
- Increased the Size of the Medium Range to take triple digit numbers (weapon section) (2018-01-15)
	
- Weapon name is properly showed when damage is rolled from the sheet (2017-11)
	
- Perception skills and old weapons are back! (2017-11)
	
- All skills and attributes now rolls with a template and dice/pip mod can be given (2017-11)
	
- Armor section is working, rolls and all (2017-11)
	
- added tracker for permanent initiative bonus(some races have that) (2017-11)
	
- A initiative skill have been added to second section next to char points, with a roll that sends to tracker (2017-11)
	
- Custom rollers, with and without wild die have been added to same section (2017-11)
	
- Roller for char points have been added next to char point attribute (2017-11)
	
- Force and Background section can now be hidden with a checkbox each (2017-11)
	
- Resist pain in force section have been disabled for not working properly (2017-11)
	
- Duplicating text fields "character connections" <-> "other notes" is fixed (2017-11)
	
- Added attributes for wound levels, and trackers for force emptiness, number of force powers active and Resist Pain (2017-11-15)
	
- Added repeating armor section with soak rolls (2017-11)
	
- All attributes & skill roll using a template, taking wounds  in considerations, and the player can additionally choose to include Dice/pip mods for the rolls (2017-11-15)
	
- Added missing Star Wars logo & black space background (2017-11-15)
	
- Checkbox to hide force section (2017-11-15)
	
- Change dice icon to d6	(2017-11-15)
