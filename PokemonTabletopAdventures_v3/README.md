# Pokemon Tabletop Adventures 3
This is the Roll20 character sheet for the Pokemon Tabletop Adventures 3
system written by DrMrStark.

Much of the development discussion takes place on the PTA3 Discord:
https://discord.gg/F24Ka8E

## Changelog

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
- Max HP now references the built in _max that allows it to be used for token health bars.
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
Things we want to add to the character sheet, presented in no particular order of priority.
- [x] ~~Prevent critical range from going below 0 or above 20, maybe do similar to other fields~~
- [x] ~~Display the full bonus to skill checks~~
- [ ] Add a Settings page
- [ ] Allow formula calculations for the extra damage fields
- [ ] Allow modifications to movement (maybe just an extra box)
- [ ] Handle temporary stat changes somehow, this may be a lot of work
