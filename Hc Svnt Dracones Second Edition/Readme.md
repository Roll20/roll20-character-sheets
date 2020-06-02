# Hc Svnt Dracones Second Edition 
Official Character Sheet

# Changelog

## V.1.70 (2020-05-27)
* add Default sheet settings for `EXP`, `credits` and number of `techniques`
* updated `sheet.json`'s "instructions"

## V.1.61 (2019-11-26)
* Small bugfix for a unresponsive checkbox(Mind Stat "2 Profs") in Exp Table
* change Battlescore default to zero from previous arbitrary "20"

## V.1.60 (2019-11)
* "XP purchase"-section(Page 3) now automatically adjusts "XP Spent" and "Remaining Exp" when checking/unchecking new entires in the section(it does not prevent from selecting both options in places where ther are choices, nor does it prevent selecting things out of order).
* Editing "Total Exp" also updates "Remaining Exp" accordingly
* "Xp purchase"-section updates the numbers in the "Progression Purchase Tracking"-section, as well as increase credits amounts accordingly if credits have been gained through it. Adds a hidden "attr_progression_credits_track" attribute for tracking how many times credits have been gained through XP purchase
* "XP Purchase"-section choices now updates the Six Main Stats, Focus_max, Readiness_max, Base_move, Initiative_max and max number of known Techniques  on the first page.
* If any checkboxes are unchecked, it also reverts the corresponding stat increase. The sheet only increments the stats based on checkbox actions, so the stats can be edited before/after using the "XP Purcase"-section.  


## V.1.20 (2019-10)

* add "Quantity" field to Inventory section, and instructions that appears when hovering over "Cost" or "Gear Score"
* add "source" field to techniques
* change "Cargo Points" total to directly use `attr_mass_base` and `attr_body_exert`
* removed default `cargo point`, `gear score` and `cost` values from equipment at request
* Change all "Progression Purchase Tracking" attributes to start as "0"(was "1")
* Change all "Notoriety Purchase Tracking" checkboxes to start unchecked on new sheets(was all checked previously) 
* minor visual adjustments

## V.1.06 (2019-06)

* typo fix & update preview img
* few fields accept decimal inputs now and bug with body/community tracker on pg3 is fixed
* HSD2:fixed version number
* fixed exp tracker and mistakes on progression chart
* Adjusted Techniques & Quirks sections to fit 9 rows each
* fixed Notoriety tracker rendering for Chrome

## V.1.00 (2019-06)

* Initial release