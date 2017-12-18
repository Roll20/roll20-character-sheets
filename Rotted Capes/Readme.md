# Rotted Capes Sheet

This is a character sheet for use on Roll20.net with Rotted Capes. The sheet is designed to be usable by all Roll20 users regardless of subscription level.

### Current Version
Version 1.01 (December 11th, 2017) 

### Many Thanks	
This sheet came into being through my experimentation in adapting sheets for my various games.  A big influence was Nathas's Numenera multi-tabs character sheet!

### TODO

Short Term:

* Shake-out sheet in play (target stable state by mid to end of January)
* Expand Tagging
* Further refinement of layout and coloration of the sheet and inline messages

Long term:

* Move calculations to script workers for efficiency
* Automate generation of various manual fields such as Defenses, Initiative, total XP Spent (from advancements), and maneuver mod based on selection
* Hover tool-tips to display entered tooltips without checking the Notes\Details box
* Add an image overlaying the checkbox (emulate a button that is clicked to open and close tooltip)
* Add a tab for managing global settings for further automation (such as reducing avoidance based on being larger)
	
### Changelog
** December 18, 2017: version 1.02 ** 
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

** December 11, 2017: version 1.01 ** 
* Multiple fixes to variable names
* Layout fixes
* Added information icon and minus icon for managing tooltips
* Added hover over field for managed tooltips

** December 2, 2017: version 1.0 submitted to Roll20** 

### Known Issues
1) When changing the value on a spin button it resets the value to its origin value on the first click.  Have not been able to duplicate this 100% of the time.
