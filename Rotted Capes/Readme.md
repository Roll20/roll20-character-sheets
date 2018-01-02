# Rotted Capes Sheet

This is a character sheet for use on Roll20.net with Rotted Capes. The sheet is designed to be usable by all Roll20 users regardless of subscription level.

### Current Version
Version 1.3 (December 31st, 2017) "The Automation Release"

### Many Thanks	
This sheet came into being through my experimentation in adapting sheets for my various games.  A big influence was Nathas's Numenera multi-tabs character sheet!

### TODO

Short Term:

* Shake-out sheet in play (target stable state by mid to end of January)
* Further refinement of layout and coloration of the sheet and inline messages
* Automation for Cast Member View

Long term:
* Automated Tick Management (may require an API)
* Secret Roll mechanism to send rolls to GM (Cast Members and Full Characters alike)
* Power Cards
* Additional Minor Automations
* New View: Data sheet for Enclaves and supporting cast
	
### Changelog
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
