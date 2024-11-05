#  Conan: Adventures in an Age Undreamed Of
Character sheet for the 2D20 version of the game by Modiphius.  

[Modiphius](https://www.modiphius.net/collections/conan)

Sheet construction and coding by Eric Carmody (https://app.roll20.net/users/110971/eric). Original art work by Robert Waker (https://app.roll20.net/users/109877/rob-w).

## Features
- Primary attack weapons list with damage roll
- Skills target number auto determination
- Skills rolls against target number
- Bonus damage auto calculated
- Automatic calc of Vigor & Resolve maximums
- Fatigue & Despair auto-adjustments to Vigor and Resolve
- Expanding text fields
- Belongings trackers with gold & upkeep calculations
- Encumbrance alert
- NPC list with skills and damage rolls
- Experience points tracker with auto-calc for spents/remaining
- Log entries auto date stamped and expanding text area
- Log features to auto add item to Belongings and Gold
- Log search by keyword
- Reusable template
- Key-combo shortcuts for Log Entries, XP tracker, & Help/Info screen

## To-Do's
- Version tracking.

## Roll Tables
In order for the Skills rolls and weapon damage rolls to work properly there are two required roll tables that the GM needs to make.
### Hit-Location
The GM needs to create a table named Hit-Location.  This table will need to have the following six entries:

- Head
- Right Arm
- Left Arm
- Torso
- Right Leg
- Left Leg

### Combat-Dice
The GM will also need to create a second table named Combat-Dice.  This table will need to have the following six entries:

- 1
- 2
- 0
- 0
- 1+Effect
- 1+Effect

# Release Notes

### v1.0 (2020-11-08)
First release.
### 1.3 (2021-03-28)
- Added Threaten as a weapon type, and Display as a Size option.
- Changed the Talent button icon to a chat bubble to better represent its purpose. Conditionally shows only fields with values.
- Sorted Talents dropdown lists.
- Added chat icon button to Belongings.
- Added **Equipped** checkbox to Belongings.
- New **Treated** counter for Wounds and Trauma.
- Number of wounds and treated displayed on physical skill rolls.
- Number of traumas and treated displayed on mental skill rolls.
- A new **Status** button will whisper the characters status to the GM.
- Add a new armor damaged display indicator.  Click on the gold banner atop each armor piece to toggle its damaged indicator.
- Upkeep spends reset damaged armor.
- Fixed Warfare skill role to function properly.
- Fixed some typos.
- Updated the armor list; also expanded font size on armor dropdown.
- Reduced Belongings Description field height.
- Removed Attribute roll button.
- Added complication roll of 19 & 20 when skill expertise is zero.
### 1.4 (2022-04-03)
- Added translation support to the character sheet.
- Added translation sorting for the Skills.
- Added translation sorting for the Talents Base dropdown and the Talents Skill dropdown.
- Added alternate Skill roll chat output format with extended information when using the ConanAPI.js api script.
- Added support for macro roll features; see the Info option on the sheet for more details.
- Added new chat template background colors to use with macros.