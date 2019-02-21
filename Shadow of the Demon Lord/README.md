# Roll20 Character sheet for 'Shadow of the Demon Lord' by [Robert Schwalb](http://schwalbentertainment.com)

## Change log

### Version 7
* Fixed a bug preventing creation of new NPC attacks

### Version 6 
* Styling cleanup, using CSS grid instead of Flexbox in some key places
* Added a rest button
* Added insanity and corruption on the NPC sheet
* Made rolling weapon damage optional (or available on extra click)
* Removed legacy conversion code
* Sheet worker refactored and cleaned up
* Made some adjustments to adapt to changed Roll20 base CSS

### Version 5
* Align everything left on main tab
* Alleviate some display issues with odd number of spells
* Added spellbook macro
* Moved description field in roll template to the end

### Version 4
* Added Finesse and Perception as attack stats
* Weapons and attacks now correctly display "boon"/"bane"/"banes" instead of always displaying "boons"
* Added NPC afflictions
* Fix display of attack roll 20+

### 2017-11-09: Version 3
* Improved technique for hiding sections in display mode, leading to attribute savings and less sheet worker code
* Added defense section, automatically calculating defense; takes into account defenseless and unconscious afflictions
* Added option not to count an item in the total
* Added affliction handling for speed
* Added option for a defense roll button
* Added a button for fate rolls
* Added option not to display character name on roll template
* Added display of number of boons/banes on the roll template
* Minified the sheet

### 2017-11-07: Version 2
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
* Made all tabs except the main tab somewhat responsive
* Added spell filtering by tradition
* Replaced roll buttons on the core pages by clickable stat modifiers
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
This sheet uses a preprocessor for its CSS called SASS. When editing, make sure to edit the SCSS file, and compile to the style.css file. The style.css file present in the main folder has also been minified. All line breaks and tabs must be removed from the HTML for it to work properly - the regular expression

    \n|\t|<!--.*?-->

will do the trick. The sheet worker code has been minified as well, although this is not necessary for the functioning of the sheet.

## Wishlist
* Buff/Debuff section
* Responsive version of main tab
