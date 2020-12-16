# Maximum Apocalypse

Building the sheet from scratch, while learning Roll20 custom sheet conventions & CCS grids along the way.

Haven't actually played a game of Maximum Apocalypse yet, but it looks like a really fun setting with interesting character, roll & inventory mechanics.

I'm using this project as a way to become familiar with the mechanics.

## Usage Notes

- Structure very close to to core rulebook
- Automatically calculates all derived stats: half/quarter stats, special stats, build/repair table & encumbrance
- Roll buttons for stats, skills, special stats, defenses, attacks & damage
- Roll buttons query for 0-3 advantages/disadvantages & implement advantage/disadvantage effects
- Roll template indicates level & degree of success
- Tick the "Threshold modifier prompt on every roll" checkbox to specify misc. threshold modifer for subsequent rolls
- Drop down selections for archetypes, apocalypse & skill proficiencies
- Initiative includes modifiers from being encumbered, shaken, acute, starving & emaciated
- Temporary initiative modifier field for situational special ability effects 
- Faith & Reflex ability benefits automatically calculated
- Special Ability and Gear descriptions can be expanded/contracted to see the full text when needed
- Hunger conditions will highlight in red when active
- Starving condition will apply -10 modifier to base stats (modifier indicator will appear next to base stats)
- Structure deviations from core rulebook implemented to provide enough room for Special Ability and Gear descriptions

## Aspirational enhancements
- Default proficiency roll prompt to disadvantage for non-proficient skills
- Implement Disadvantage to all rolls when Emaciated
- Implement special ability conditional modifier roll queries

## Change Log

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
