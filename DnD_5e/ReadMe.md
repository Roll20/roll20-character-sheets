# D&D 5E Character Sheet

This is a character sheet for use on Roll20.net with the latest (5th) edition of Dungeons & Dragons.  This sheet is designed to be compatible with the full release of 5th edition and I will try to keep it as up to date as possible with the system as and when rules become publicly available.  The sheet is also designed to be usable by all Roll20 users regardless of subscription level.  An API enhanced version of the sheet is planned for the future.

### Changelog

# v1.1.5 - 10th March 2018
Partial 5e compendium support added for monsters by user:darmes

# v1.1.4 - 18th May 2017
Partial 5e compendium support added for spells by user:legendblade

# v1.1.3 - 3rd Apr 2016
Added default roll options pane (accessible through the gear at the top-right of the character sheet header) and a "Use Default" option to each roll configuration panel.

* v1.1 - 21st Feb 2016
Releases will now have a version numberto aid in building scripting to migrate data from one version to another with minimum user action.  This version primarily intoruces roll options to saving throws, skill/ability checks, and weapon attacks.  the roll options allow users to customise the output of the macro for a particualr action on an individual basis to suit their own preferences.  Other minor additions include :- defaults added to weapon section and core section for a few fields that would cause errors if not populated, made use of nested roll feature to tidy up output on all sections except spells (this needs a revamp and versioning to do).

* Roll templates update - 10th March
Large update to switch the sheet to use the new roll20 roll template system for all output.  This has enabled some additional features to be added to the sheet but has required some minor changes to a few fields that will require user action to update once the sheet goes live.  [Full details can be found on the Roll20 forum](https://app.roll20.net/forum/post/1690480/#post-1690480)

* Minor update - 15th November 2014
Tweaked the way the global bonus fields are used so the sheet wont break if people enter "+2" instead of just "2" in them.  Added support in the inventory section to allow players to indicate what pieces or inventory are actually carried so that it is included or excluded for the purposes of encumberance tracking.  Added support for the Draconic Resilience feature available in the Sorcerer Draconic Bloodline subclass.

* Minor update - 10th September 2014
FIxed bugs with the NPC animal handling and intimidation rolls.  Changed the labelling of Armoured AC value that is displayed above the armour table and in the core stats section following questions on the roll20 forum and the realisation that it was probably poorly labelled before.

* Minor update - 25th August 2014
Added Damage Vulnerability field and initiative button/fields on npc sheet.  Changed the way finesse mod was calculated behind the scenes to try and improve performance a little.  Updated the damage text accross the sheet to improve readability and added an option to suppress crit damage text on spells that can crit crit (such as magic missile, or spells that require a save throw)...find this in the damage line of a spells entry.  Removed built in help page and replaced it with a much more complete wiki page (linked in the footer of the sheet).  Moved armour table to it's own page

* PHB release - 20th August 2014
Added sorcerer and Warlock support throughout the sheet.  Added support for the bard's "Jack of all trades" feature to skills.  Added passive scores for all skills to the sheet and found space for a 4th custom slot for tools/skills as a result.  Reworked spell dashboard section to provide better support for the wider casting styles now that there are more classes.  Updated spellbook section for new spell casting (sub)classes.  Updated Armour section so unarmoured AC is now also auto calculated.  NPC sheet functionality added (very much designed for use by experienced GM/DM's who are comfortable using the roll20 system).

* Bugfix and PHB release prep - 3rd August 2014
Fixed some minor labelling/spelling issues. Fixed weapon wielded selection not being saved.  Added warlock and sorcerer classes to class and hit dice sections.  Updated bard to be a d8 hit die as per PHB previews.  Added functionality for NPC sheet.  Moved sheet last updated date to the sheet header.  Added support for a few custom skills/tools in the skills section.  Added option to allow the weights entered in the inventory to be treated as unit weights instead of total weight for that row

* Build 2 (bugfixes) - 19th July 2014
Updates to fix an order of operations bug that would cause things like skill expertise and some weapon attacks/damage rolls to be incorrectly calculated.  Completely reworked the tabs used across the sheet so they should now be cross browser compatible.  Re-added the class resource repeating section.  Some other minor layout tweaks to try and prevent wrapping/layout issues some have reported.

* Initial release - 10th July 2014
First release of the sheet.  It should support the majority of the Basic 5e rules (available as a free downloadable PDF).  Whilst the sheet cannot possibly cover every situation, and nor can it replace a basic understanding of the game rules/mechanics, it should be a helpful tool for new players whilst still providing more experienced players with some useful facilities too.  At this stage the sheet supports the D&D 5th edition basic and starter set rules...with some legacy support for the D&D Next playtest rules in the form of classes that are not yet released for 5th edition.  The sheet will be updated with the full 5th edition classes/rules as soon as time allows when the Player Handbook is available

### Other resources

* The scripts used to auto generate the sections flagged as auto generated by the comments in the html file can be found here - [DnD5e helper scripts](https://github.com/Actoba/DnD-5e-helper-scripts)

### Feedback

If you have any problems, suggestions or features you'd like to see added to the sheet then please let me know either by logging an issue on the github repo or by sending me a private message via roll20.  Please be patient when waiting for a reply, those locations are checked fairly often but, as is often the case, real life has a tendancy to get in the way!

Lastly, should anyone need it, you can find the old (and no longer updated) [DnD Next playtest version of the sheet here.](https://github.com/Actoba/roll20-character-sheets/tree/master/DnDNext_Actoba) It is based of the last publicly available playtest dated October 2013.

---

John Myles ([@Actoba](https://app.roll20.net/users/427494/actoba) on roll20)

