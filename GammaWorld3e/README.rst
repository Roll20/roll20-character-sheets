# Overview

GammaWorld 3rd edition had a unique system, quite different to d20-based systems. The 3rd edition rules were infamous for reasons of editorial difficulties. The result is that there are numerous contradictions, errors and incomplete bits. Despite that it won game of the year award in its time and, for me at least, is still the version of GammaWorld that feels the most exciting to play. However, while the system's core mechanism seems simple, it's actually quite hard to keep track of with pen & paper play. Roll20 is the perfect platform for somethig like this.

# Licensing

I created a GammaWorld 3rd edition compendium – updated, edited and (I dare say) improved to be more consistent, realistic (some of the item weights for example were ludicrous). When compiled along with the companion it's possible to add items / mutations etc. directly to your character sheet from the compendium and then use these with a single click from the sheet. However I'm unable to include that in a public repository for licensing reasons.

# Instructions

## Using the sheet

### Overview

This sheet is for use with the GammaWorld 3rd edition rules.

### Abilities

3e required that character abilities be rolled randomly. This is currently a requirement on the sheet - you can't edit your attributes directly. To roll your character's abilities, click on the `Roll-up` tab, here you can roll attributes and hitpoints. If you wish to re-roll you need to first click `Reset`.

- Adv. - This represents your character's advancement through XP. If you take your ability scores up with XP add the amount in this field.
- Tmp. - Any temporary modifiers to an ability score should be entered in this field
- Mod. - The ability modifier is calculated automatically

### Combat Stats

#### Defence

Note that this is a slight departure from the original character sheets included with the rules in that it splits defence ratings across `energy`, `physical` and `mental`. These were implied in the rules but not fully represented on the PnP character sheet. These are calculated values based on Gear, Armour and Mutation entries.

- _CS_: Column Shift
- _RF_: Result Factor
- _DR_: Damage Reduction

## Installation

Install the node libraries using `npm install`

## Compilation

1. To compile the compendium from src (removed for licensing reasons) and / or the companion:
   `npx webpack --config webpack.config.js`
1. To build html from src use `npm run pug`
1. To build css from src use `npm run scss`

## Watch

There are also watch scripts included for `scss` and `pug`:

1. `npm run pug-watch`
1. `npm run scss-watch`
