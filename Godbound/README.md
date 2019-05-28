# Godbound Character Sheet

This sheet is created for use in Godbound games on Roll20, based on the Character sheet design included with the game. Some reorganization has been done to make it easy to use on Roll20.

## Features / Changelog

- v2.2.0
  - Minor
    - Renamed Project Opposition to Resistance
    - Corrected calculation for Project Cost
    - Small teaks and spelling corrections
- v2.1.0
  - Minor
    - Renamed Headings for Clarity
      * Auto-Hit Attacks and Multi-Damage Rolls
    - New Options for Damage Rolls
      * Repeatable fields for Auto-Hit Attacks and Multi-Die Damage Rolls
      * All damage die inputs now have dropdown selections for clarity of function (inputs reset)
    - New Armor Type
      * Divine Gift, Granted AC of 3
- v2.0.0
  - Major
    - General
      * New Author Axel Mellgren (@Axel), userid 88344
      * A complete overhaul of the sheet with a new design
      * A layout and appearance insipired by the core book
      * Roll Templates for all rolls and displays for gifts
    - Godbound
      * An input for Languages
      * Hide-able 'description' field for Gifts, click to print to chat
      * An Artifacts section with integrated resource tracking
      * A Wealth and Treasures section
    - NPCs
      * Extended attack options
    - Factions
      * Faction Goal section, distinct from dominion projects
  - Minor
    * External font (NearMythLegends) viewable if user allows scripts
    * Styled buttons, checkboxes, and inputs
    * Notes sections for all tabs
    * Difficulty for projects
    * Other tweaks to fit the new design overhaul
- v1.1.0
  - Major
    - General
      * Add tabs for Character, Faction, and NPC sheets
    - Factions
      * Automatic Resource Tracking
      * Fields for all relevant stats
      * Automatic Roll buttons
    - NPCs
      * Simplified Statblocks based on what's in the manual
      * Automatic Rolls
    - Godbound
      * Add a section for tracking Dominion projects
      * Automatically track influence and dominion spent on projects
      * Includes "Completed" checkbox for hiding completed projects later on.
  - Minor
    * Tweak spacing on Attributes, Saves tables.
    * Add upper border line for consistency
    * Use small-caps instead of all-caps for area titles
    * Use `attr_character_name` instead of `attr_name` (syncs journal entry name
      with name in sheet.
    * Fix bug in rolling saves (missing `}`)
    * All relevant rolls support a 'Modifier' prompt
- v1.0.0
  * Automatic Save and Modifier calculation
  * Automatic HP calculation (including CON modifier adjustment)
  * Automatic Resource Tracking
  * Automatic AC calculation and save penalty tracking
  * Weapon tracking and automatic to-hit rolls
    - Damage must be rolled separately, because of the unique combat system in Godbound.
  * Word/Gift cost tracking
  * Gift/Miracle effort tracking
    - Supports, like the manual-provided character sheet, a space for Word effort tracking as well.
  * Expanding Fact section.
  * Fancy Background Image

## Future Plans

### Planned
* API script to optionally automate damage rolls
* Counter section for tracking divine fury, other game clocks

### Blocked

* Get google-fonts integrated
  - this is broken on current chrome and firefox browsers due to some issues with the R20 proxy
    (see the [R20 forums](https://app.roll20.net/forum/post/1534665/slug%7D) for details, this
    is a long-standing issue, upvote [this](https://app.roll20.net/forum/post/2593284/character-sheets-make-google-webfonts-available-for-use) 
    suggestion to see them implemented.

### Known Bugs


## Contributing and Feedback

Report any problems, suggestions, or features by sending a private message on Roll20 to [Axel](https://app.roll20.net/users/88344), *and* open a ticket for it on this Github repo (be sure to send me a link to the issue)!

If you'd like to contribute, I'd be happy to help answer questions about how the sheet works, and would love to coordinate with you. Please contact me as above if you are looking to help.

Happy Godbounding!
