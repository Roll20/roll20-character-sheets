# Roll20 Character sheet for 'Shadow of the Demon Lord' by [Robert Schwalb](http://schwalbentertainment.com)

## Change log
### 2017-11-04: Version 2
* Added option to whisper rolls to GM or query for output
* Added up/down arrows for talent uses and spell castings
* Added query for sacrificing spells that can be sacrificed
* Added support for wizard's spell expertise in #castings calculation
* Added attack rolls and damage for talents; added collapser for talents
* Added option to show a freeform text field instead of a select in "Against" fields
* Added more fields and display mode to weapons
* Added vs field for NPC attacks
* Added background tab for adding rudimentary info about background and story developments
* Added a button to restore talent uses, as with spells
* Added house rule friendly option to change the dice used
* Several small style tweaks and bugfixes

### 2017-10-30: Version 1
* General cleanup of sheet CSS and layout improvements
* Added NPCs with display mode
* Afflictions (with mouse-over description) added to main page
* Ammo repeating section added next to weapons
* Attributes renamed to more sensible standards
* Added sheet workers to calculate derived values where it makes sense
* Equipment moved to talent page, with a repeating section, total counter for carried items, and dedicated space for coins
* Talents redesigned with display mode for more readability
* Spell page redesigned: traditions added; more fields added to fit those present in the rules; to make the spell page more usable, a display mode was added that makes spells more compact and a lot more readable, without edit capability
* Roll templates added for all rolls on the sheet
* Added translation capabilities to the sheet (except for the static text on the background of the first page)

## Developing this sheet
This sheet uses a preprocessor for its CSS called SASS. When editing, make sure to edit the SCSS file, and compile to the style.css file.

## Roadmap / Wishlist
* Spell filtering
* More automation for afflictions
* Defense section
* Defense roll button
* Boons/banes for all types of rolls separately
* Settings page (adjust background, layout, etc.)
* Add Madness, Injured conditions
* Responsive Sheet for mobile play (unrealistic)
