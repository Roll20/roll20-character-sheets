**Basic Fantasy Roleplaying Game Sheet**
This is a character sheet for use on Roll20.net with the Basic Fantasy Roleplaying Game core and some optional supplements.

**Features**
This version of the sheet incorporates roll templates, autocalculation of AC, and most other derived values. It does not require access to features of the Dev server or the API. It includes support for play with most of the optional supplements. This sheet is not compatible with the original Basic Fantasy sheet due to additional fields and naming convention. 

**Changelog**
**2016**
October 15 – Felt it was finished enough to post in the github for it's initial pull

November 12 - Fixed attack bonus calculations and armor class calculations. Redesigned the Armor class section in the combat tab.

November 13 - Added no to the turn undead / befriend animal drop down to represent no ability.

November 16 - Fixed a misname on a fieldset.

November 18 - Fixed field calulation in spell damage, Fixed field display in range attack, Changed Dexterity bonus in range attack to a drop down menu for ability modifier selection. This will allow strength based range attack, Int based magical attack, and standard Dexterity based attacks.

November 19 - Fixed Basic ability formula, range modifiers. Was backwards.

November 21 - Fixed the coin weight formula.

**2017**
Jan 11 - Shifted weapon specialization down to combat section, editted wording on dice rolls, editted attribute modifiers so they do not show all the math but just results, editted secondary skills to include a modifier input, editted class skills to apply attribute mods to skill score instead of roll. Working on autocalculation for the encumbrance (code not included in this revision due to not working).

Feb 14 - Added racial modifier field to saving throws, a racial note field to the basic ability tab. Still working on the autocalculation but it is more on the back burner as real life takes the forefront.

Feb 19 - Fixed duplicated attr names.

Feb 22 - Fixed missing attr name in a roller.

March 2 - Removed unneeded sheetworker script.

March 10 - Removed all sheetworkers and add some additional UI.

April 9 - Added additional modifier fields and tweaked the UI some.

April 18 - updated the preview image and the jason file to reflect it.

August - various updates listed below
          Added Game note field
          Combined inventory tabs Worn and Carried into one tab
          Modified the Ranged combat section to include the option to add the ability hit modifier. This is to allowed the use of dex modifiers instead of str mods on range attacks.
          Modified the melee weapon section to support the use of the optional Light weapon rule which allows the dex mod to be used to hit instead of the str modifier.
          Added sheet workers to enable the inventory to add up the weight of items listed and display them in the encumbrance section.
          Separated the Saving throw "Spells" into it's own field due to some races have a specific racial modifier along with some supplements allow a specific modifier to be applied to it for being a magic-user.
          Hardcoded thieves skills into the sheet for beginning players but left those fields open to being edited (fields are not removable but locked in place).
          Moved the optional tab to the right of the Equipment tab.
          Moved the Saving throw section to combat tab (adjustments are a work in progress)
          Moved the class/race notes to the main tab
          
September - Updates to the sheet listed below
          Trimmed Spell section down: Remove the Cast time, damage type, and Description fields from the all spell books
          Drop down fields have been altered. Any non or none text has been changed to "--" to fit the field better.
          Combat section: Damage fields for melee and ranged attacks have be reverted back to text fields to allow customized dice amounts.
          Initiative field: Drop down menu has be removed and text field has been added. This is to allow customized dice amounts.
          Basic Abilities: Combed the rulebook and added some additional fields and changed some text output to reflect the rolls.
          Went from opening doors to Opening stuck doors, Opening locked doors, and bending bars. Each have their specific dice as per core rules.
          Adding more popup info on fields if hovered over. More will be added over time.
          Saving throws: Split Saving throw "Spells" off to it's own field due to some races and class options having a specific modifier for that save.
          
October - Fixed various errors in the spellbook code and removed non-bfrpg fields in the saving throw section.

-2018-

July - Uploaded the Basic Fantasy logo and will be changing the code to reflect it.

Sept - Added light and heavy load limit fields, changed the layout of the encumbrance section, changed armor drop down text due to an issue of it not saving properly, changed the logo code to display image again.
          
**Credit Where Credit is Due**
The CSS and much of the layout is lifted from the work of allenmaher's BECMI sheet who lifted the excellent work of John Myles (@Actoba on roll20) and the 5e Dungeons and Dragons sheet.
