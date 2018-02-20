## Versioning

The sheet will always upgrade itself unless I specify otherwise, though some things like roll template fields changing will require users who have added custom macros to fix.

## 1.2.5
### Features
* Added Vulcan Nerve Pinch to attack options (using security, science, or medicine per p.110)
### Bug Fixes
* Fixed melee attack from attr_security to attr_daring

## 1.2.4
### Features
* Default sheet is missing milestone tracking, added this to the settings screen (attr_norm-mile, attr_spot-mile, attr_arc-mile, attr_rep).
* Default sheet is missing resistance tracking, added this to the settings screen (auto calculates for ships based on scale, players 0, bonus allows wearing armor or altering for NPCs - attr_resist, attr_resist_bonus)  

## 1.2.3
### Features
* Massive improvements to the inline sheet rolls
	** Critical Success now counts as 2 successes
	** Streamlined the rolls (none moved to bottom, cleaner queries
	** Damage Moved to a Roll Button - so the Challenge Dice can be shown for clearer results
* Expanded LCARS Roll Template
	** Added subhead, weapq (for weapon qualities), discp_dmgbtn (for Damage Roll Button)
	** Improved CSS formatting to cleanly show new fields
### Bug Fixes
* Removed ship rolls beyond 1d20 (ships can only ever assist a character) - this also speeds ship rolls.

## 1.2.2
### Features
* Added Complication Range (in sheet settings)
* Added {{focus=TEXT}} to RollTemplate
* Improved Identification of character in default Sheet Rolls
* Defaulted all Ship assist rolls to 1d20

## 1.2.1
### Bug Fixes
* Fixed Combat Rolls
	** Now rolls attack and damage
* Cleaned up Attribute Rolls
	** Asking Task Difficulty slows down rolls so removed
	** Fixed non focus calculation cs<1 not cs<2
* Cleaned up lcars rolltemplate
### Features
* Added Crew Bonus to settings

## 1.2
### Bug Fixes
* Cleaner calculation, removal of restrictions on fields (was interfering with NPCs), changed number fields to text fields to correct numbers not changing behavior.

## 1.1
### Features
* Added starship sheet, created new settings page to allow easy switch from Ship or Character.
### Bug Fixes
* Rewrote CSS with help of Randall, assuring more clean function of the sheet that matches vendor sheet.

## 1.0
### Features
* First version of the sheet, character only, basic functionality