# Blades in the Dark Character Sheet

This sheet was created for use in Blades in the Dark on Roll20.

## Feedback

Report any problems, suggestions or features by sending a private message on Roll20 or submitting an issue on Github.

[Stephen Malone](https://app.roll20.net/users/552705/) or [Phalanks](https://app.roll20.net/users/843545/) on Roll20

## Todo
* Change to only show crit value if there are more than one 6 in the roll.
* Convert Coin, Bandolier, and Recovery checkboxes in the character tab to left-fillable radio buttons for consistency.
* Convert Load on the playbook tab to a radio button - can't have multiple loads simultaneously.
* Add a repeatable Item field for items that have no load?
* Add a button to the Crew sheet to roll Heat for Entanglements - display with a roll template to make it easy for the GM to look up the results?
* Change Shady Friends checkboxes to radio buttons. A rival can't also be a best friend.
* Format claims checkboxes to match the rest of the sheet

## Changelog

### 0.0.9
* Added Cohort Name and Type dropdown
* Wrapped 8 clicks on 4 ticks
* Moved claims checkbox to left side of the text area to mirror what's provided by the book
* Bugfixes
    - Fixed Claims map wrapping issue
    - Fixed blank vice roll if Vice text box is blank

### 0.0.8
* Added a button to Indulge in Vice 
    - selects the lowest of Insight/Resolve/Prowess
    - uses the roll template to show how much stress is cleared
* Bugfixes
    - Firefox now displays labels for Crew/Character sheet type selector, Character/Playbook/Clocks tabs, Crew/Faction tabs, Trauma, and all the formatting for radio and checkboxes
    - Lots of formatting and alignment cleanup - no more resizing claim map textareas and getting the map out of whack
    - Cleaned out some leftover junk that was accidentally left in the roll template example comments

### 0.0.7
* Added Clocks Tab To Player Sheets
   - Clocks tab can track 4,6,8, and 12 segment clocks
* Bugfixes
   - Fixed issues with the crew sheet where certain rows of boxes would populate fully instead of only up to what was clicked

### 0.0.6
* Reformatted header
    * Added Blades in the Dark logo image (hosted on imgur).
    * Added toggle for Crew/Character sheet
* Added Crew sheet
    - Crew tab with complete blank crew sheet including claims map with toggleable connectors.
    - Faction tab with blank sections for each faction type and the War effects.
* Added a roll template (background hosted on imgur).
* Updated roll macros for actions to prompt for position and effect.
* Updated roll macros to use the roll template.
* Changed Misc roll to Fortune with prompts for several common uses (Vice, Engagement, etc).
* Relocated character sheet XP condition reminders.
* Reformatted the character Veteran special ability to remove extra checkboxes and added placeholder to clarify that Veteran abilities may be taken up to three times (per https://plus.google.com/117439479714858586537/posts/MYms9jVjoo4)
* Miscellaneous formatting alignment adjustments

### 0.0.5
* 0.0.3 roll macros are now working properly! Updated all roll macros.
* Removed "Zero or Neg. Dice" roll macro.
* Rolls now show a critical failure on 3 or less, except in the case of stress tests.
* Brought back Attribute XP.

### 0.0.4
* Updated macros were breaking, replaced with old macros, but added a separate roll for the 2d6skl1 case.
* Attributes ratings are now auto calculated.
* Updated resistance rolls to take the highest roll and subtract it from 6.

### 0.0.3
* Updated macros to check for number of available dice. If less than one (1) reverts to 2d6skl.
* Added macro for resistance rolls.

### 0.0.2
* Fixed bug with Friend/Rival and Harm boxes that would cause the starting boxes to have the same value.

### 0.0.1

* First release, has the complete blank character sheet.
* Roll macros display the single highest roll.
