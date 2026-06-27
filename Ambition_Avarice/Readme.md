## Changelog

### V.1.4 (2026-06)
* All sheet rolls now use matching custom roll templates (attacks, attribute tests, initiative, surprise, rest, damage)
* Attribute tests prompt for DC and show SUCCESS / FAILURE
* Surprise roll shows SURPRISED / NOT SURPRISED

### V.1.3.3 (2026-06)
* Throw and In Sixes roll templates restyled to match Roll20's default purple table layout

### V.1.3.2 (2026-06)
* Initiative roll now updates the Turn Order tracker (`&{tracker}` inside the inline roll)

### V.1.3.1 (2026-06)
* Saving throws and dungeon throws use custom roll templates with clear SUCCESS / FAILURE results
* In Sixes rolls also show SUCCESS / FAILURE instead of opaque dice counts

### V.1.3 (2026-06)
* Fixed attribute modifier table to match Ambition & Avarice 1E rules
* Attribute modifiers are now stored as numbers (roll math works correctly)
* Fixed attack, initiative, and surprise roll dice syntax (`1d20` / `1d10`)
* Fixed saving throws and dungeon throws to succeed on equal-or-greater (was off by one)
* Fixed In Sixes rolls for 2-in-6 and 4-in-6 chances
* Rest Die auto-calculates from Constitution
* Removed duplicate `attr_rest` field
* Weapon damage fields accept dice expressions; added damage roll buttons
* Surprise roll notes when a result of 4 or less is surprised

### V.1.2 (2019-11)
* fixed image links to Roll20/master

**First page**
* change "In Sixes" to repeation section

**Equipment page**
* add repeationg weapons & armor sections
* add trackers for the four types of AC

**Misc Page**
* add a fourth tab,"Misc, for further development
* add tracker for spell failure


### V.1.0 (2019-10)
* Initial release