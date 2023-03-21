Change Log
==============================================
**2023-02-07 ** v.20 Paul V
	Fixed Stat rolls and NPC Stat rolls and saves
	Added Features and traits list
**2023-01-24 ** v.19 Paul V
	Fixed Initiative (Vehicles and Dex)
**2022-12-12 ** v.18 Paul V
	Added Hit Dice Roller - maxes out the number of dice to roll as the current hit dice and reduces the HD by the number of dice rolled - also adds the result to current HP with a maximum of the HP max
	Added Generic Initiative Bonus
	Fixed Hit Point Maximum's attribute label it should have been HP_Max
	Added Death Save roll button that Automatically checks the Success or Failure boxes.
	Added Str, Dex, Int, Wis, Con, Cha settings windows to store save prof, indivudial save bonus and global save bonus
	Recoded the Save buttons to use the new tech and the new global and individual bonuses
	Added the Ability to whispher the GM rolls
	Added Maneuver settings to add in Maneuver DC Bonus and Exertion point bonus, also added in current exertion points freely edited field
**2022-12-05 ** v.17 Paul V
	Fixed issue with NPC Skill and Attack rolls - converted the rolls to use the new Action button tech
	Added Initative roll to NPC Sheet
	Fixed issue with Tool rolls
**2022-11-22 ** v.16 Paul V
	Fixed all the Passive Checks to be 10+modifiers+stat modifier and not +stat
	Fixed issue where the Skill speciality couldn't be edited on the main screen, it can now be edited on both main screen and popup
**2022-11-15 ** v.15 Paul V
	Added new Dice rolling logic, that gathers the components of the dice roll when the button is press this means that the every roll on the sheet doesn't need to be updated everytime standard/Advantage/Disdadvantage is pressed
	Fixed Wisdom (perception) initiative to use Wisdom
	Fixed all the Passive Checks to be 10+modifiers	
**2022-09-28 ** v.14 Paul V
	Added D10 and D12 in to the Expertise dice list for high level Rogues - but this is a static Expertise dice uneffected by Specialty (as that caps at d8)
	Changed the Expertise to be a dropdown list no data entry allowed
	Added logic to exclude the expertise dice from the crit colour logic of roll20
**2022-08-14 ** v.13 Paul V
	Added new Dex(Basic) initiative option
	Added Bloodied HP on to the NPC sheet 
	Added all the missing words into the translate
	Added Standard / Advantage / Disadvantage logic for initiative, saves, stat rolls
**2022-05-04 ** v.12 Paul V
	Major changes to the Skills rolls added a skill settings window for each skill. moved Expertise dice on to that window
	Added a whole swave of modifiers to the rolls 
	Moved Jack of all trades into the Global skill settings window
	Moves all Expertise Dice and Proficient into the skill specific setting windows
	Added Standard / Advantage / Disadvantage buttons on to the sheet allowing to rolls with advantage or disadvantage
**2022-03-07 ** v.11 Paul V
	Split the Archtypes so only the selected class's archtypes will appear in the list 
	Fixed bug in NPC Sheet
**2022-02-31 ** v.10 Paul V
	---Split the Archtypes so only the selected class's archtypes will appear in the list -- can't get this working at the moment
	Improved the readability of TextBoxes, increase the text size and darkened the colour a little
	Added Vehicle skill for the initiative
	Got Vehicle Initiative working
	Improved coding of the CSS 
**2022-02-15 ** v.9 Paul V
	Added Marshal into the Class list, removed the no longer used Warlord
	Added a check box to each spell list allowing spell notes to be added to each spell
	Added Notes Tab to Character sheet
	Added a check box to equipment allowing notes to be added to each equipment item
	Added a check box to maneuver allowing notes to be added to each maneuver item
**2021-12-16 ** v.8 Paul V
	Increased size of HitDice and Speed on the NPC Sheet
	Increased size of the Challenge rating section
	Fixed the formatting of the Damage Vulnerabilities/Resistances/Immunities/Conditional sections so they are left formatted and fit on the same line
	Left Align Senses and languages on NPC Sheet
**2021-12-15 ** v.7 Paul V
	Fixed NPC CR current using the incorrect attribute --Reset to using attr_CR
**2021-12-15 ** v.6 Paul V
	Fixed formatting on Reaction Names and Notes on the NPC Sheet
**2021-12-05 ** v.5 Paul V
	Attribute changes to enable importing of characters
	attr_strengthmod to attr_strength_mod
	attr_strengthsaveroll to attr_strength_save_roll
	attr_strengthsave to attr_strength_save_mod
	attr_strengthsaveprof to attr_strength_save_prof
	attr_dexteritymod to attr_dexterity_mod
	attr_dexteritysaveroll to attr_dexterity_save_roll
	attr_dexteritysave to attr_dexterity_save_mod
	attr_dexteritysaveprof to attr_dexterity_save_prof
	attr_constitutionmod to attr_constitution_mod
	attr_constitutionsaveroll to attr_constitution_save_roll
	attr_constitutionsave to attr_constitution_save_mod
	attr_constitutionsaveprof to attr_constitution_save_prof
	attr_intelligencemod to attr_intelligence_mod
	attr_intelligencesaveroll to attr_intelligence_save_roll
	attr_intelligencesave to attr_intelligence_save_mod
	attr_intelligencesaveprof to attr_intelligence_save_prof
	attr_wisdommod to attr_wisdom_mod
	attr_wisdomsaveroll to attr_wisdom_save_roll
	attr_wisdomsave to attr_wisdom_save_mod
	attr_wisdomsaveprof to attr_wisdom_save_prof
	attr_charismamod to attr_charisma_mod
	attr_charismasaveroll to attr_charisma_save_roll
	attr_charismasave to attr_charisma_save_mod
	attr_charismasaveprof to attr_charisma_save_prof
	attr_proficiencybonus to attr_PB
	attr_armor_class to attr_AC
	attr_hit_points_current to attr_HP
	attr_hit_points_maximum to attr_HP_max
	attr_hit_points_temp to attr_temp_HP
	fixed attr_speed to be text in the PC sheet
	Fixed the autoupdate when sheets open
	Added saving throws on the NPC Sheet, and roll button for all attributes and saves
	Added Actions list to NPC Sheet
	Added Reactions list to NPC Sheet
	Added Legendary Actions to the NPC Sheet
	Changed Challenge Rating to text to allow for fractions
	Shrinked PC/NPC Buttons
	Shrinked Stats/Info buttons on the NPC sheet
	Increase size of Attack Damage type field
	Increase size of AC, Damage Vulnerabilities, Damage Resistances, Damage Immunities, Condition Immunities, Languages and Senses on the NPC Sheet
	Added Beast into Creature types, removed Animal
	Added migration code to migrated the Attribute changes
**2021-11-21 ** v.4 Paul V
	Fixed positioning of Total Hit Dice
	Enhanced Strife, Fatigue, Death Save Failure and Dave Save Success to use fill left check boxes
	Added Roll Button for all Abilities and moved the save button
	Changed Skill rolls so the 'normal' ability for a skill is the default for rolls, so changed it so the default is No for Specialty
	Fixed attack rolls - putting +3 in the Atk Bonus no longer breaks the rolls
	Fixed Size so you can type in and also has a drop down with standard DnD sizes
	Fixed tools so that the Roll button actually works
	Added initiative drop down to change initiative type (vehicle not working atm)
**2021-11-03 ** v.3 Paul V
	ensured the PC tab is first
	put Heritage and Culture into strict alphabetic order
	Corrected spelling
	Fixed some lists formatting
**2021-10-21 ** v.2 Paul V
	Minor changes.. starting to create an NPC sheet, code included but not correct as yet
	Added correct links for images
**2021-10-08 ** v.1 Paul V
	New Sheet
