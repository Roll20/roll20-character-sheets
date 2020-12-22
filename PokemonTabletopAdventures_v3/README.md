# Pokemon Tabletop Adventures 3

This is the Roll20 character sheet for the Pokemon Tabletop Adventures 3
system written by DrMrStark.

Much of the development discussion takes place on the PTA3 Discord:
https://discord.gg/F24Ka8E

## Changelog

### Dec 12, 2020

- Migrated the character sheet style attributes to new fields
- Character type selection is now presented via a drop-down selector
- Added a Configuration page!
  - Moved the character type selection to the configuration page
  - Added a way to change the `initiative-tie-breake` attribute
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

## To-Do:

Things we want to add to the character sheet, presented in no particular order of priority:

- [x] ~~Display the full bonus to skill checks~~
- [x] ~~Handle temporary stat changes somehow, this may be a lot of work~~
- [x] ~~Prevent critical range from going below 0 or above 20, maybe do similar to other fields~~
- [x] ~~Add a Settings page~~
- [ ] Allow formula calculations for the extra damage fields
- [ ] Allow modifications to movement (maybe just an extra box)
- [ ] Display the adjusted stat score when temporary stat changes are provided
- [ ] Refactor the sheet workers to remove the cascading change observation; each `setAttrs` call takes way too long, so we want to capitalise on making them as low as possible
