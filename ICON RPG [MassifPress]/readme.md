# ICON RPG Character Sheet for Roll20

Welcome to the full documentation for this unoffocial ICON character sheet.

This sheet is designed for use with the [ICON](https://massif-press.itch.io/icon) system by Massif Press. This is an unofficial sheet made with the aid of Scott C's [K-scaffold](https://kurohyou.github.io/Roll20-Snippets/index.html?v=1.1). Almost all of the core functionality of the game, as of version 1.45, is accessible via this sheet.
Rules reminders are built in and can be hidden or show by clicking orange 'i' in the top right of each section.
The sheet is also flexible enough to hopefully allow for homebrew rules and custom features.
I hope you enjoy!

![preview](https://raw.githubusercontent.com/Seraaron/roll20-character-sheets/master/ICON%20RPG%20%5BMassifPress%5D/preview.jpg)

[report a bug](https://github.com/Seraaron/roll20-character-sheets/issues)

### Fonts
Note that this sheet makes use of GOOGLE fonts via
```
@import url("https://fonts.googleapis.com/css?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700|Jost:ital,wght@0,400;0,700;1,400;1,700|PT+Mono|PT+Sans+Caption:wght@400;700|PT+Serif+Caption&display=swap");
```
These should be imported automatically by your browser, but in the event that they aren't you can download and install them yourself here:
- [Jost](https://fonts.google.com/specimen/Jost)
- [Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible)
- [PT Mono](https://fonts.google.com/specimen/PT+Mono), [PT Sans Caption](https://fonts.google.com/specimen/PT+Sans+Caption), & [PT Serif Caption](https://fonts.google.com/specimen/PT+Serif+Caption)

## Changelog

#### v0.4.3 (23-01-21)
- Made class resources into a repeating segment
- Added light and heavy attacks separately
- Added bonus damage prompt and fixed critical damage not displaying separately
- Moved save target to tactics tab
- Added a 'whack' button

### v0.4 LIVE (23-01-14)
- Wrote this readme, and the json file, made a [tipee](https://en.tipeee.com/seraaron/), and generally got the sheet ready for live use on roll20
- Added lots of new CSS stylization to make it all look pretty
- Fixed fill left bug by reverting to older style involving spans
- Added action roll macro
- Stylized the roll templates
- Added all json translations in english
- Changed appearance of roll buttons
- Added action rolls using conditionals in roll template

### v0.3 BETA (23-01-14)
- Added preliminary darkmode functionality
- Added preliminary roll template / macro functionality
- Partially fixed tab impersistence
- Fixed burden column scale
- Added 'roster' tab for foes & allies
- Added camp fixtures
- Fixed collapse checkbox global
- Fixed custom action names resetting
- Added ability info boxes

### v0.2 ALPHA (22-12-14)
- Filled in the tactics, roster, and journal sections
- Fixed burden column scale (bug) and made them a rep. segment
- Begun work on sheetworkers
- Too many other changes to mention
- (suffice to say the sheet is basically whole at this point, if unfinished)

### v0.1 PRE (22-12-05)
- Initial commit
- Mostly functional narrative and journal tabs (sans roll macros and sheetworkers)
- Tactics, Roster, and Settings tabs have headers as scaffolding but no major functionality
- Very likely to change destructively soon, this is just a 'save point' commit