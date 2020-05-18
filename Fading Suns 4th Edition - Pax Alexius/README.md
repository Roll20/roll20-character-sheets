# Release notes

## 1.2.0
- Now differentiating current + max values for Revivals Number and Surge Number
- Improved repeating sections editing behaviour

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

- Character advancement
  - auto-compute Vitality Rating, Revivals Rating, Revivals Number (max), VP Bank capacity, Surge Rating, Surge Number (max), so long as partial advancements are allowed
  - show how many skill points and characteristics points have been spent

- Blessing/Curse: add more space for their descriptions

- modifiers to affect auto-computed Vitality Rating, Revivals Rating, Revivals Number (max), VP Bank capacity, Surge Rating, Surge Number (max)

- make Class and Callings lists into repeating sections

- Characteristics
  - [ TBC ] Box next to them to log a temporary buff/debuff?

- Skills
  - [ TBC ] Box next to them to log a temporary buff/debuff?
  - auto-fail or add warning when rolling a |R|equired skill (Alchemy, Interface, Pilot) which has a score of 0

- E-Shield
  - add "Burn-Out", "Distorsion", "Features"

- States
  - implement "shake it off" rolls
  - add their descriptions

# Nice-to-have

- Add description of each state

- for Roll20 pro users, API for:
  - troupe coffer management
  - PC bank / cache management
  - GM(/NPC) bank / cache management
