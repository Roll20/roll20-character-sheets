# Release notes

## 1.2.1
- Fixed auto-height of description boxes of perks/capabilities/items/etc, which were sometimes not high enough thus requiring a vertical scroll.

## 1.2.0
- Now differentiating current + max values for Revivals Number, Surge Number, e-Shield charges
- Improved behavior when editing repeating sections

## 1.1.0
- Species size box converted to numeric input from text input
- Armor resistances against specific damage types (blaster, flame, ..) now automatically deduced from the armor general resistance level
- New "States" section to log physical/mental/social states and tech compulsions
- Textareas not scale properly with their contents
- Textareas no longer interfere with edit buttons in repeating sections
- Actions roll query "Goal +/-" now says "Additional Goal +/-" so as to indicate that this bonus/penalty applies on top of the one arleady listed in the table
- Internationalization of infoboxes
- Internationalization for alphabetic ordering of skills (as well as states introduced in this version)
- Removed unused internationalization keys
- Fixed broken README link on the Game Settings page

## 1.0.0
- First publicly available version of the sheet

# TODO list

## Potential improvements

- Blessing/Curse: add more space for their descriptions

- Character advancement helpers
  - Partial advancement checkboxes (as reminder + input if some derived stats become auto-computed)
  - show how many skill points and characteristics points have been spent

- Auto-compute Vitality Rating, Revivals Rating, Revivals Number (max), VP Bank capacity, Surge Rating, Surge Number (max)
  - precondition: must support partial advancements
  - support custom modifiers from perks, GM ruling, ..

- Techgnosis
  - Auto-compute level based on carried equipment + carried weapons
  - Add warning when techgnosis level is above character level

- Turn class and callings lists into repeating sections

- Characteristics
  - [ TBC ] Box to log a modifier 

- Skills
  - [ TBC ] Box to log a modifier
  - auto-fail or add warning when rolling a |R|equired skill (Alchemy, Interface, Pilot) which has a score of 0

- E-Shield
  - add "Burn-Out", "Distorsion", "Features"

- States
  - Implement "shake it off" rolls
  - add state descriptions

# Nice-to-have

- Add description of each state

- for Roll20 pro users, API for:
  - troupe coffer management
  - PC bank / cache management
  - GM(/NPC) bank / cache management
