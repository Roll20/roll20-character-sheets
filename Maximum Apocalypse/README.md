# Maximum Apocalypse

Building the sheet from scratch, while learning Roll20 custom sheet conventions & CCS grids along the way.

Haven't actually played a game of Maximum Apocalypse yet, but it looks like a really fun setting with interesting character, roll & inventory mechanics.

I'm using this project as a way to become familiar with the mechanics.

Also see the API script which implements the logic to handle initiative tracking (4 action phases, each reducing value by 5) & the "enemy attraction gauge" as a token.

## Usage Notes

- Automatically calculates all derived stats: half/quarter stats, special stats, build/repair table & encumbrance
- Automatic calculations incorporate effects from following abilities: Collar, Faith, Giant Genetics, Instinctive, Luck Stars, Moving Target, Reflex, Tightening the Belt, Unreliable
- Hunger conditions will highlight in red when active
- Roll buttons for stats, skills, special stats, defenses, attacks & damage
- Roll buttons query for 0-3 advantages/disadvantages & implement advantage/disadvantage effects
- Roll template indicates level & degree of success
- Sheet also has roll buttons for base stat actions & shows required food units
- Tick the "Threshold modifier prompt on every roll" checkbox to specify misc. threshold modifer for subsequent rolls
- Tick the "Damage code prompt on every attack" checkbox to specify damage code for subsequent attack rolls
- Tick the "Manually set Armor, Special Stats and Dodge" checkbox to disable automatic calculations for named fields
- Drop down selections for archetypes, apocalypse & skill proficiencies
- Initiative includes modifiers from being encumbered, shaken, acute, starving & emaciated
- "Next Combat Phase" button to reduce initiative tracker value by 5 (See API script to do this automatically, track phase number & reset for new round)
- Temporary initiative modifier field for situational special ability effects 
- Special Ability and Gear descriptions can be expanded/contracted to see the full text when needed
- Starving condition will apply -10 modifier to base stats (modifier indicator will appear next to base stats)
- Structure very close to to core rulebook
- Structure deviations from core rulebook implemented to provide enough room for Special Ability and Gear descriptions
- Fully enabled for language translations
- If sheet is too wide/large setting browser zoom to 80% is a good alternate size
- Install Maximum Apocalypse API & tick the "Use API for rolls (Requires Pro Account)" checkbox to use "Re-Roll" button to re-roll & reduce luck uses

## Aspirational enhancements
- Distinguish between current & max ammo
- Add range to weapons
- Distinguish between current & max ammo
- Add radiation infection table
- Add food poisoning table
- Slowed condition should indicate penalties
- Default proficiency roll prompt to disadvantage for non-proficient skills
- Implement Disadvantage to all rolls when Emaciated
- Implement special ability conditional modifier roll queries (e.g. Bravery, Hollow Points ...)

## Change Log

### April 8th 2021 v11.0
- Correct attack skill column label
- Ensure Throw attack thresholds get updated when Agility value is updated

### April 5th 2021 v10.0
- Correct weapon attacks' half and quarter threshold field value order

### February 7th 2021 v9.0
- Add checkbox for special ability & gear textareas to toggle height between 1 & 6

### January 21st 2021 v8.0
- Make damage roll query optional
- Fix Resilience calculation missing Fort value
- Add damage dice to DC option tooltip
- Fix bug where threshold modifier was enabled by default
- Implement option to disable armor, dodge & special stat calculations
- Unarmed/Brawl attack text should be translated

### January 7th 2021 v7.0
- Add Luck button!
- Add button to add initiative to tracker
- Use tracker macro to reduce initiative for "Full Dodge" and Riposte
- Add button to adjust initiative for next combat phase
- Add Parry & Riposte buttons for each weapon
- Add Luck Re-Roll button when using the API
- Optimise grid spacings for FireFox
- Add translation to roll template
- Add translation order for selects options
- Add translations for roll queries

### December 27th 2020 v6.0
- Added support to field calculations for specific special abilities:
  - Collar
  - Instinctive
- Added base stat action roll button below skills. Contort roll incorporates build modifier.
- For weapons with Unreliable trait, the roll template will show if weapon becomes jammed
- Added required food units below build
- Ensure all read-only fields have a grey background

### December 14th 2020 v5.0
- Added support to field calculations for specific special abilities:
  - Tightening the Belt
  - Moving Target
  - Giant Genetics
  - Luck Stars

### December 13th 2020 v4.0

- Changed attack DC field to dropdown
- Change weapon trait field font to match abilities & gear (more room for text)
- Re-arranged structure to make room in attacks section for skill field & roll buttons
- Added skill selection for attacks
- Added attack & damage roll buttons for attacks
- Added roll buttons for defenses
- Attack thresholds automatically calculated based on chosen skill
- Attack thresholds automatically re-calculated if chosen skill prociency changes
- Changed section widths to percentages so it adjusts with sheet window

### December 7th 2020 v3.0

- Added roll buttons for stats, skills & special stats
- Roll formulas include query for 0-3 advantages/disadvantages
- Dice rolled will take into account advantages/disadvantages (roll 'tens' dice twice & keep/lose the lowest)
- More than one advantage will adjust success threshold targets
- More than one disadvantage will raise the number degrees of success required
- Roll template showing:
  - Proficiency (for skill rolls)
  - Advantage/Disadvantage modifier
  - Normal, Great & Amazing success threshold targets
  - The dice roll with calculated outcome
  - Degrees of success (where not failure)
- Player can activate an additional roll query to specify other threshold modifiers
- Temporary modifier field for Initiative
- Character with the "Faith" special ability will gain 3 luck uses
- Character with the "Reflex" special ability will gain 10 to their Dodge threshold
- Starving condition will apply -10 modifier to base stats (modifier indicator will appear next to base stats)

### November 26th 2020 v2.0

- Changed structure so repeating groups have enough room to show text & many entries won't stretch the sheet 
- Used textareas for special ability and gear descriptions; user can then expand/contract these to see the full text when needed.
- Changed font for numbers from Bangers (since 1 & 7 look too similar) to Candal (one of Roll20's default fonts)
- Added sheet workers for all derived stats: half/quarter stats, special stats, build/repair table & encumbrance
- Initiative sheet worker includes modifiers from being encumbered, shaken, acute, starving & emaciated.
- Hunger conditions will highlight in red when active

### November 17th 2020 v1.0

- First version
- Full layout to match core rulebook, using Blinker & Bangers Google fonts
- Drop down selections for archetypes, apocalypse & skill proficiencies
- Repeating sections for armor, attacks, special abilities and gear
- All input fields are manual values
