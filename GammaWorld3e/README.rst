# Overview

GammaWorld 3rd edition had a unique system, quite different to d20-based systems. The 3rd edition rules were infamous for reasons of editorial difficulties. The result is that there are numerous contradictions, errors and incomplete bits. Despite that it won game of the year award in its time and, for me at least, is still the version of GammaWorld that feels the most exciting to play. However, while the system's core mechanism seems simple, it's actually quite hard to keep track of with pen & paper play. Roll20 is the perfect platform for somethig like this.

# Licensing

I created a GammaWorld 3rd edition compendium – updated, edited and (I dare say) improved to be more consistent, realistic (some of the item weights for example were ludicrous). When compiled along with the companion it's possible to add items / mutations etc. directly to your character sheet from the compendium and then use these with a single click from the sheet. However I'm unable to include that in a public repository for licensing reasons.

# Instructions

## Installation

Install the node libraries using `npm install`

## Compilation

1. To compile the compendium (removed for licensing reasons) and / or the companion:
   `npx webpack --config webpack.config.js`
1. To build html use `npm run pug`
1. To build css use `npm run scss`
1. Then look in `dist` folder

## Watch

There are also watch scripts included for `scss` and `pug`:

1. `npm run pug-watch`
1. `npm run scss-watch`
