# Warhammer 2nd Edition Character Sheet

This sheet is created for use in Warhammer 2nd Edition games, based on the character sheet design included with the core book, but modified for ease of use in Roll20.

## Features / Changelog

- v2.1.2
  - Minor
    * Now rounds up instead of down when using half your Characteristic for untrained Basic Skill Tests.
- v2.1.1
  - Minor
    * Fixed career advancements to only update for careers marked as "entered".
- v2.1.0
  - Major
    - Weapons
      * Ulric's Fury moved to a separate button to more easily conform with core rules
      * Column that shows Strength Bonus added to melee weapons for clarity
    - Spellbook
      * New tab for rituals
    - Settings
      * Added option for initiative houserule (Agility Bonus instead of Agility Characteristic)
  - Minor
    * Fixed bug that applied Agility Bonus instead of Agility Characteristic
- v2.0.0
  - Major
    - General
      * Whisper to GM moved from each individual skill to a global modifier
      * Roll Templates for all Critical Hits and Blood Loss
    - Core Stats
      * New input for temporary modifiers to Character Profile
      * New checkbox for each Skill and Talent to mark advancements taken
    - Career
      * Each Career after the first has an advancement checkbox to mark that the Career has been bought
    - Weapons
      * Encumbrance for individual weapons
      * New button for rolling Critical Hits
    - Armor
      * Encumbrance for individual armor
    - Spellbook
      * New buttons for rolling Tzeentch's Curse and Wrath of the Gods
      * Selection for which Lore affects Chaos Manifestations
      * New buttons for Arcane Marks and Marks of the Gods optional rules
    - Inventory
      * Encumbrance for weapons and armor tracked separately
	  * New Trapping layout with repeatable inputs for unlimited inventory
	  * Calculate encumbrance from the old layout and the new repeatable field separately
  - Minor
    * CSS tweaks to fix various layout problems
    * Fixed bug that applied armor penalties multiple times
- v1.0.0
  - Major
    - General
      * Tabs for Core Stats, Background, Career, Weapons, Armor, Spellbook, and Inventory
      * Whisper to GM option for all skills
      * Roll Templates for all basic rolls
    - Core Stats
      * Fieldsets for repeatable Knowledge Skills and Talents
      * Fields for all relevant stats
      * Automatic Roll buttons
    - Background
      * Fields for various character descriptions
    - Career
      * Tracking for up to five Careers
    - Weapons
      * Fields for up to seven melee weapons and seven ranged weapons
    - Armor
      * Fields to track three pieces of armor for each body location
      * Checkboxes for armor penalties
      * Button for rolling Blood Loss
    - Spellbook
      * Tabs for Petty, Lesser, Arcane, Divine spells, and Runes
      * Separate button to roll Channelling
      * Up to ten damage dice for each spell
    - Inventory
      * Fields for coin and exchange rate
      * Tracking for encumbrance with checkbox for Dwarves
      * Fields for up to fourtyfive items
  - Minor
    * All relevant rolls support a 'Modifier' prompt

## Future Plans

### Planned
* Repeating inputs for unlimited trappings with script to calculate encumbrance
* Automatically modify encumbrance by craftsmanship of individual weapons and armor

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

Happy gaming!
