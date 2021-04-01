Change Log
==============================================

**2021-03-29** v.25 Chuz (James Culp)
	Fixed Matrix ASDF indicator bubbles so 0 doesn't light up all 10 indicators
	Started changes for NPC sheets.
	Updated npc sheets image, settings and toggle headers.
	Styled npc toggles and attribute buttons
	Updated attribute roll buttons to be consistent with PC sheet buttons.
	Made Magic now visible if Awakened OR Spirit are selected
	Made Force only visible if Spirit is selected
	Updated styles and html to make settings hide/reveal correctly for non-pc sheets
	Updated matrix grid to work properly with 0 for a stat
	Changed npc pain tolerance to be in options
	Updated npc options -> grunt type (mundane, awakened, emergent, spirit) to be a select labeled Archetype
	Updated "Bonuses" and "Modifier" column variables for non-PC sheets.  They now have the proper name='' fields.
	DR, I/ID, AC, CM and Move (from npc stat blocks) are now represented along with common rolls (DR, Defense and Soak)	
	Some more style updates to npc sheets
	Updated some of the variables and layouts of the areas below Bonuses, Modifier and Options (still not ready for use really)

**2021-03-22** v.24 Chuz (James Culp)
	Beginning v.24
	Rearranged player/character names, toggles and navigation buttons in header - still tweaking layout
	Fix to patreon and roll20userid fields in sheet.json, maybe I'll be listed as a sheet author now.
	Finished adding Wild Die option to all dice rollers (I think) on PC sheet.
	Matrix Tab layout more or less complete and ready for script magic
	Settled on layout changes
	Completed Sheetworker to tie ASDF device buttons together (only one selected at a time)
	Completed Sheetworker to tie device primary checkboxes together (only one selected at a time)
	Completed Sheetworker to update Matrix Attack Rating and Matrix Defense Rating when A/S/D/F are updated
	Completed Sheetworker to update A/S/D/F to W/I/L/C when emergent checkbox is selected in options (making the character a technomancer)
	Matrix Device Essence Cost is now included in Essence automatic calculations
	Matrix Device Initiative Bonus is now included in Initiative automatic calculations
	Made Technomancer attributes and Complex Forms sections hide for non-technomancers
	Made device A/S/D/F assignment buttons and matrix condition monitor hide for technomancers
	Removed empty buttons in skills when no specialization or expertise was set.
	Linked primary device condition monitor to the condition monitor hexes in the Persona section
	Fixed a bug related to sheet_type being misread and making some automatic calculations not fire right (initiative bugs anyone?)
	Started in on Complex Forms
	Updated Matrix -> Complex Forms section
	When selecting a skill, have the correct default attribute auto-selected

**2021-03-15** v.23 Chuz (James Culp)
	Made sheet work with current roll20 "enhanced" code that has been partially rolled back Changed 
	Condition Monitors -> Settings -> Pain Tolerance to a select so it's obvious whether pc is selecting Low, High or none 
	Added functionality to the ammo counter, now when primary ranged weapon firing mode is changed the number of rounds updates the the correct amount (1, 2, 4, 10) 
	Added Mod field for skills to allow skill rolls to have bonuses added. Does not add to the actual skill dicepool just affects the skill roller. 
	Fixed Initiatives (Meat, Astral, Matrix x3) to now apply mods, dice mods and Config->Temp mods correctly. 
	Added Magic AR that auto calculates when logic/charisma, tradition or magic change to the Magic -> Meta box

**2021-03-08** v.22 Chuz (James Culp)
	Add Defense roll-button and DR roll-button to Core->Combat Info tab
	Updated Skills to split Skills and Knowledge/Languages into separate tabs
	Finished Magic->Spells, Preparations, Rituals, Adept Powers, Conjuring and Metamagic sections
	Minor formatting changes to css and html
	Bugfix DR not adding Body in
	Bugfix calculations for Cold and Hot Sim initiative roll buttons
	Bugfix Essence Mod not allowing a zero value
	Bugfix Removed roll query from flat attribute rolls
	Bugfix Added Athletics skill to ranged weapons
	
**2021-03-03** Chuz (James Culp)
	Included in roll20 repository for one-click access

**2021-02-28** Chuz (James Culp)
	Updated Social Tab, Contacts and SINs
	Changed the header Shadowrun logo to a smaller version, this may change again depending on feedback.

**2021-02-27** Chuz (James Culp)
	Updated Vehicle tab, players can document the basic stats for their vehicles here, no roll buttons included yet.

**2021-02-24** Chuz (James Culp)
	Tuned Magic->Spells display and dice roller

**2021-02-21** Chuz (James Culp)
	Added automated DR and resistance updates to Core Combat Info from Arms->Armor tab

**2021-02-15** Chuz (James Culp)
	Updated Core Combat Info->Primary Ranged Weapon section to display the new weapon data better
	Updated Core Combat Info->Armor section, now it's a soak damage button (body), Defense Rating box and Resists.  Still need to make the info update as armor is added in Arms->Armor

**2021-02-08 - 2021-02-14** Chuz (James Culp)
	Updated Arms->Armor
	Added "Modifications" text area to Augs and Gear for future functionality.
	Updated Core Combat Info->Primary Melee Weapon section to display the new data

**2021-01-16 - 2021-02-07** Chuz (James Culp)
	Revamped Weapons->Melee to remove unused fields (Reach, AP, etc) and add range blocks and Specialization and Expertise checkboxes.
	Added functionality so if Close Combat skill rating is changed it updates the dice roller for melee weapons that use that skill.
	Added dicepool to Weapons->Melee display
	Revamped Weapons->Range to remove unused fields
	Added functionality so if Firearms skill rating is changed it updates the dice roller for ranged weapons that use that skill.
	Added dicepool to Weapons->Range display

**2021-01-11 - 2021-01-15** Chuz (James Culp)
	Updated repeating items formatting
	Updated repeating items to make specialization and expertise buttons 15 characters if the actual display name is greater than 15

**2021-01-09 - 2021-01-10** Chuz (James Culp)
	Updated how Essence is displayed (breaks down aug cost and allows for manual modifications (critter effects that drain essence for example))
	Updated how movement was being displayed, rules are now 10m base and sprint is 15m + results of an Athletics+Agility check)
	Added Expertise to the skills section, having problems figuring out how to make the specialization and expertise roll buttons hide when there isn't a value for them.

**2021-01-07** Chuz (James Culp)
	Fixed Augmentations section and made it automatically update essence when augs are added/removed
	Removed some (but not all) mentions of limits since they don't exist in 6th world.

**2021-01-06** Chuz (James Culp)
	Fixed Skills section to work properly now

**2020-11-11** Chuz (James Culp)
    Pulled the branch sr6v2 previously worked on by clevett
	Created this CHANGELOG
	Fixed lift & carry to be body + willpower
	Fixed judge intentions to be willpower + intuition
	Fixed memory to be logic + intuition
	Fixed some minor typos found throughout the .html in comments
	Fixed update_wounds to handle High/Low Pain Tolerance correctly (this will probably need to be updated at some point)
	
	


