# Pokemon Tabletop Adventures 3

This is the Roll20 character sheet for the Pokemon Tabletop Adventures 3
system written by DrMrStark.

Much of the development discussion takes place on the PTA3 Discord:
https://discord.gg/F24Ka8E

## To-Do:

Things we want to add to the character sheet, presented in no particular order of priority:

- [ ] Allow a second ability score to apply to skill checks
- [ ] Allow formula calculations for the extra damage fields
- [ ] Refactor the sheet workers to remove the cascading change observation; each `setAttrs` call takes way too long, so we want to capitalise on making them as low as possible
- [ ] Add Struggle to the move lists automatically
- [X] ~~Somehow make it easier to get tokens into initiative. No idea how to accomplish this.~~
- [x] ~~Display the full bonus to skill checks~~
- [x] ~~Handle temporary stat changes somehow, this may be a lot of work~~
- [x] ~~Prevent critical range from going below 0 or above 20, maybe do similar to other fields~~
- [x] ~~Add a Settings page~~
- [X] ~~Display the adjusted stat score when temporary stat changes are provided~~
- [X] ~~Display the skills section for Pokémon characters~~
- [X] ~~Moves deserve a section for "bonuses that apply to all moves." Things that should go here include:~~
  - [X] ~~A spot for Attack and Special Attack bonuses, for things like Ace Trainer~~
  - [X] ~~The critical hit range for the moves, as this is used for passives, items, etc.~~
- [X] ~~Allow modifications to movement (maybe just an extra box)~~
- [X] ~~Add status effects that you can click~~
  - [X] ~~Burn, Poison/Toxified, and Paralyzed should modify stats automatically~~
- [X] ~~JSON import and export of sheet data, to support the Pokelicious Sheets and also migrating/copying characters~~

## Changelog

### Apr 11th, 2021
- Import/Export support
  - Supports either roll20 or Pokelicious Google Sheet data

### Mar 21st, 2021
- You can now set Afflictions in the character sheet, and they modify stats accordingly!
  - Not everyone will use these, so they can be mostly hidden with just a click
- Automatic initiative macro - if you have a token associated with a character sheet, you get a free token action
- Add bonus movement field
- Rename Attack Damage Bonus and Special Attack Damage Bonus for clarity
- Fix typo in config page
- Remove leftover debug logging

### Mar 7th, 2021

- The big stat calculation overhaul!
  - The stat balls are now read-only, except for HP.
  - Stats are summed from a stat grid that is listed underneath the stat balls
  - Grid is collapsible to show only one row for ease of use
  - Stat changes from natures are calculated automatically
  - Temporary stat changes work now!
  - Script to fill in data automatically for any existing character sheets
- Convert var to let
- Pokemon can use skills now
- Moved around some boxes and made skills two columns, mostly to support Pokemon getting them
- STAB is calculated automatically - the previous box for STAB has been removed
- New section for bonuses that apply to all moves:
  - Critical Threshold goes here, and has been removed from Pokemon skills.
  - Bonuses for Attack and Special Attack, to make the Ace Trainers happy
  - Accuracy bonus field, for things like Hone Claws

### Feb 23rd, 2021

- Unifies background colours for text areas and number inputs
- Added collapsing to the Origin Feature and all Class Features
- Added a send to chat button for the Origin Feature and Class Features to output the name and description in the chat log in a nice and easily readable format
  - Made the name of the features into the same button when collapsed to improve consistency of design vis-a-vis the moves section

### Feb 18th, 2021

- Expanded the Capture Pokémon skill, allowing modifiers such as Capture Point to be applied
- Improved the display of the Pokéball selection, and added a display of the effect that each has on the capture roll
- Added a display of the total modifier to capture rolls
- Added the option of configuring the default value for Custom Pokéballs

### Feb 11th, 2021

- Resolved a small issue with the move repeating section where the button to collapse the fields would show a `+` instead of a `-`

### Feb 10th, 2021

- Add a new type option to the sheet, intended to represent neutral or unknown types - "Typeless"
  - This uses the color scheme for the ??? type from the Pokémon video games

### Feb 6th, 2021

- Resolved CSS bug introduced in previous update

### Feb 5th, 2021

- Added a triple-hit roll template, and support for triple-hit scatter moves

### Jan 23rd, 2021

- Fixed January update dates to be the correct year
- Fixed the display of zero-damage attacks for all move templates

### Jan 8th, 2021

- Added the ability to change which ability applies to which skills to the Configuration page
  - Unfortunately you'll still need to add any second ability modifier applied to the manual bonus column - support for multiple abilities has been added to the to-do list

### Jan 7th, 2021

- Added support for scatter moves
- Added roll templates for dual hit and multi hit scatter attacks
- Added a quick roll button that rolls a move without any query boxes for temporary modifiers or effectiveness, rolling with +0/+0/Neutral values
- Streamlined move displays to show the configuration only when desired via a collapsible control

### Dec 12, 2020

- Migrated the character sheet style attributes to new fields
- Character type selection is now presented via a drop-down selector
- Added a Configuration page!
  - Moved the character type selection to the configuration page
  - Added a way to change the `initiative-tie-breaker` attribute
  - Copied the type selector to the config page
- Corrected some of the formatting issues with the linter, which means it doesn't make the code quite so ugly

### Dec 7, 2020

- Added a Capture Pokemon skill to make life easier for everyone.
- Added generic attribute checks - click on the modifier values to roll them.
- Added a hidden attribute for use in initiative checks: `initiative-tie-breaker` which rolls a d20 when accessed.
- Ran the code through the Prettifier linter to ensure we're not missing any gaps - this kind of messes up the formatting but it should at least standardise it from now on!

### Nov 28, 2020

- Added support for temporary bonuses!

### Nov 25, 2020

- Changed the header of the talent checkboxes to Talent to make it easier to identify their purpose
- Fixed a bug where the sheet would reacting to attribute score changes rather than modifiers, which meant attribute changes sometimes did not propagate through to any associated values
- Fixed a bug where the Bluff/Deception skill wasn't fetching the Special Defense modifier

### Nov 8, 2020

- Combined the skill roll button with the skill name
  - Added fancy colors for the new skill roll button so that it matches the stat field when hovered over to help highlight which stat it uses
- Repurposed the stat modifier display to show the total skill modifier
- Added sheet workers to update the total skill modifier when relevant values are changed

### Oct 28, 2020

- Extends the move roll template functionality to make it even easier for players and GMs to resolve attacks
  - Correctly handles critical hits for high critical hit rate moves such as Slash and Karate Chop being based on the total of the accuracy check, rather than just the raw dice roll
  - Indicates when moves such as Poison Sting and Thunder Punch should apply their secondary effects
- Adds fields to the move section of the character sheet to enable assignment of secondary effects of moves, and declaration of critical hit ranges based on the accuracy roll rather than the individual dice roll
- Resolves an issue with the total damage bonus not updating when the move fields are changed
- Resolves an issue with the special defense target text appearing on two lines with the default Roll20 spacing of the chat log
  - Advice for future incarnations of this is to extend the chat log a little bit; it's hopefully not an issue anymore but only the Sith deal in absolutes...
- Updates the total damage bonus field, and adds a similar accuracy field, to show the base roll information
  - The raw total bonus can still be accessed with the correct attributes names

### Oct 22, 2020

- Introduces roll templates to the character sheet
- The skill-roll template is used for skill rolls by Trainer-type characters
- The move-roll template is used for rolling attacks by all types of characters. This has variable fields, depending on how the move section of the character sheet is configured
  - The Accuracy Check and Damage fields will always be visible
  - The Accuracy Check field has a note concerning the relevant defense the attack is targeting when the move is configured correctly
  - A note concerning the attack's effectiveness appears when not neutral
  - A note indicating a critical hit has occurred appears beside the damage roll
  - Miscellaneous notes concerning the move can be added and are displayed after the damage field
- Each roll template varies its header colour based on either the base attribute for skills or the elemental type of the attack
- The buttons for rolling an attack have been removed, and a button for rolling an attack using the new roll template has been added to the character sheet
- Propagates color throughout most static fields of the character sheet
  - Placeholders, input labels, and static text are given a color matching the chosen type of the character or move depending on their location
  - User-entered text, such as character name, move effects, and the inventory, are given a dark gray color to ensure they're more easily readable.
- Adds a new attribute to each move section that indicates the total static damage bonus applied to a roll, and uses that within the roll template for moves. This is intended to make creating custom macros for rolling damage way easier than needing to calculate the correct bonus.

### Oct 14, 2020

- Added Readme with Changelog and other details
- Added 1/combat as an option for move frequencies
- Added Pokemon moves section to the Trainer sheet, since Trainers often use moves. Now this section is on all sheets.
- Revamped how move usage is tracked, to use buttons instead of checkboxes. Added this same tracker to Features.
- Changed Nature selection to a dropdown

### Oct 3, 2020

- Max HP now references the built in \_max that allows it to be used for token health bars.
- Pokemon moves have been completely reorganized, and now have buttons to roll for accuracy and damage.
- The background now changes to match the Pokemon's type.
- Moves now change color to match the move's type.
- Resized some text boxes to better fit actual play.

### Sept 22, 2020

- Incorrect logo image was used, causing elements to be blocked. (It had a bunch of extra transparent space.) Replaced with the correct image.
- Special Defense for Pokemon was missing a line break, so if you opened the window too wide, the display would show on the same line and would no longer be in the ball. Added this missing line break.

### Sept 16, 2020

- Initial Commit