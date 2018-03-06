
# Rotted Capes Sheet

This is a character sheet for use on Roll20.net with Rotted Capes. The sheet is designed to be usable by all Roll20 users regardless of subscription level.

### Current Version
Version 1.5 (March 4th, 2018) Hidden Rolls, Master Table Lookup & Fixes

### Many Thanks	
This sheet came into being through my experimentation in adapting sheets for my various games.  A big influence was Nathas's Numenera multi-tabs character sheet!

### TODO

Short Term:
* Automation for Cast Member View

Long term:
* Automated Tick Management (may require an API)
* Secret Roll mechanism to send rolls to GM (Cast Members and Full Characters alike)
* Power Cards
* Additional Minor Automations
* New View: Data sheet for Enclaves and supporting cast
	
### Changelog
** March 4th 2018 **
* Added roll details are hidden so modifiers and ranks are not displayed when dice are rolled
  - When the "Hide roll details" is checked, the underlying modifiers and details will not show in the roll macro in chat
  - All modifiers are also removed
* Replaced All Purpase Action Roller (no longer needed due to automation) with a master table lookup (placed at bottom of each tab)
* Added capability to enhance attribute score (while retaining original score)
  - There is now a base value and score on attributes; score is readonly and is the score all data points are based off of 
  - Modify the base score via a fixed modifier on the Gear & Mods tab
  - Changes to score will cascade to skills, powers, and attacks that use the attribute
* Added Page load to auto set scores for existing character sheets
* Fixes: 
  - synchronized sheet name with hero name
  - Change all references to Passive Mod to P Mod and all references to Passive to P Value to better align with the wording in the rules
  - Headshot modifier was displaying 0 vs -6; corrected

** February 4th 2018 **
* Armor section added with automation so that Bulk is applied as a penalty to Action Rolls (Attribute, Skill, Power, Attacks) based on Qu & Mi
* Created a new tab (Gear & Mods) to centralize equipment
* Added Exploits section to Powers tab so players can track their Tricks and Powers
* Reworked Character roll messages (Cast Member Views next)
* Fixes: 
  - Corrected calculation of top mph (was based on Qu vs pace)
  - Fixed display of plot die in chat message (hide the ! sign)
  - set min window width for issue occuring with chrome users
  - when attribute on damage is set to blank the die roll threw an error.

** January 15th 2018 ** 
* Cast Member View Attributes auto-calculate (was broken with last fix)
* Update Damage dice drop downs to include the attribute die list (some powers use attribute dice for damage)
* Change Built Item Quick Reference to Primary Powers List
* Fixes: Fixed overlap of Gear Info tooltip into field, fixed offset of info icon on power, and Fixed xp calculation


** December 31, 2017: version 1.3 "The Automation Release" ** 
* Autoset Max Lift, Throw, and Max Drag/Push based on Might score
* Autoset MPH based on Quickness score
* Autoset Attribute Dice based on selected score; note maximum score is 51
* Add die bump to attribute dice with automatic adjustment of the dice based on the bump; note maximum die bump is 5d12
* Autoset the attribute dice and passive modifier on the skill table based on the selected primary attribute.
* Add die bump to attribute dice on the skill table with automatic adjustment of the dice based on the bump; a bump on the associated attribute carries down to the skill.
* When an attribute score is changed or dice are bumped, all skills that share the associated attribute are updated accordingly with the skill bump taken into account.
* Dice display in the attribute dice field, attribute rolls, skill dice field, and skill rolls no longer shows the bang sign (!)
* Maneuver Mod automatically set by by the selection of Maneuver
* Total XP Earned and Spent in the logs and then autocalculate the totals for a sum of what is available
* Finished Tagging fields
* Fixes: corrected damage scales (now 5d8 goes to 10d8 and up to 50d8 by increments of 5; previously was in increments of 1 up to 10d8)

** December 18, 2017: version 1.2 ** 
* updated icon for tooltips
* added hover ability for entered tooltips (hover over the field in front of the icon)
* Implemented auto-calculation of Pace, Avoidance, Fortitude, Discipline, BO Threshold, Wounds, and Stamina with modifier
* Added two new sections to Advancements: Fixed Modifications and XP Earned (serial log)
* Can now set fixed modifier values for Pace, Avoidance, Fortitude, Discipline, BO Threshold, Wounds, Stamina, and Horror Points
* Wound penalty is automatically added to all action rolls if apply is toggled; it becomes zero if the ignore option is toggled
* Added option to apply (default) or ignore wound penalty
* CSM inline rolls will not show the roll value (purposefully hidden)
* Added Impact to the Attack Details Damage Roll so it appears in the inline results for ease of reference
* Added text block for capturing Built Items
* Misc Fixes: die roll embeded in modifiers for skills, attack roll mods are now merged, layout to Gear table, layout to Advancements, layout tweaks to Cast member view

** December 11, 2017: version 1.1 ** 
* Multiple fixes to variable names
* Layout fixes
* Added information icon and minus icon for managing tooltips
* Added hover over field for managed tooltips

** December 2, 2017: version 1.0 submitted to Roll20** 

### Known Issues
1) When changing the value on a spin button it resets the value to its origin value on the first click.  Have not been able to duplicate this 100% of the time.