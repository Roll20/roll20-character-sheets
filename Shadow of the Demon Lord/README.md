# Roll20 Character sheet for 'Shadow of the Demon Lord' by [Robert Schwalb](http://schwalbentertainment.com)

## Change log

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

* Background tab: background info, path info
* More automation for afflictions
* Defense section?
* Boons/banes for all types of rolls separately?
* Chat macros for spells/weapons/talents?
* Settings page (adjust background, layout etc.)
* Add Madness, Injured conditions
* Responsive Sheet for mobile play (unrealistic)


### Path features support
* Attack rolls for talents
* damage for talents
* Attack roll 20+ for weapons
* Master Fighter: re-roll 9 or less on weapon attacks
* Spell expertise: +1 rank 0 or rank 1 castings
