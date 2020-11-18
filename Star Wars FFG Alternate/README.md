# Roll20_FFG_StarWars_CharacterSheet
Roll20 character sheet for FFG Star Wars; compatible with FFG-SWRPG-Dice-Roller

**Developers**:  Timothy Yuen, Aaron Lambers, Gene Eilebrecht

**Playtesters**:  Gene Eilebrecht, Ben Hamill, Aaron Lambers, Zack Morris, Brett Wilson, Timothy Yuen

## Version 1.0.1

* Requires manual initialization of fields. Make sure to set all number fields you want to use to a value with a manual keyboard input the first time you use that field. Not doing so may cause some odd behavior with calculations dependent on those fields receiving an "undefined" value. This includes all Characteristics, Vital Stats, Weapon and Armor stats, and Item encumbrance. There is code to auto-init fields, but it currently won't trigger until Roll20 fixes a bug with the sheet:opened event.

---------

This sheet is inspired by and an alternative to the [Star Wars FFG API-Compatible sheet](https://github.com/Roll20/roll20-character-sheets/tree/master/Star%20Wars%20FFG%20API-Compatible).  When our small local tabletop FFG Star Wars gaming group moved online to Roll20 during the COVID-19 situation, we started with that sheet.  As a GM, I saw an opportunity to taylor the sheet to my group's needs.  As a web app interface designer by trade, I found it to be a compelling project during my downtime at home.  Rather than branching the original project, I started fresh so I could really learn how the Roll20 sheets work from the ground up.  I also saw the chance to utilize some CSS Grid techniques for layout (rather than tables) and take advantage of Roll20 Sheet Workers to power most of the calcs.  Plus, there were many things we didn't really need in the short-term -- GM info, Vehicles, Companions, etc.  This sheet is focused entirely on a single PC.

Our group has only playtested this a handful of times so far and there are plenty bugs we haven't caught yet, I'm sure.  But it seems to have it's legs underneath it after a couple hundred hours of development and is learning to walk.

We also worked a custom branch of the [FFG-SWRPG-Dice-Roller](https://github.com/Roll20/roll20-api-scripts/tree/master/FFG-SWRPG-Dice-Roller) to integrate with the new sheet.  Since it has references objects in this sheet in particular and may not be compatible with other sheets, we have kept our own version for now and haven't tried a PR to the main branch of the dice roller.
