# Release notes

## 1.2.1
- Fixed roll buttons not triggering for newly created combat actions, psi powers and theurgy rites.
- Added ability to increase the number of damage dice rolled (from VPs).

## 1.2.0
- Renamed sheet to `Fading Suns 2nd Edition Revised` from `Fading Suns v2.75`
- Added ability to select the characteristic for the roll of a skill on the fly (as opposed to having to select a characteristic beforehand)
- Fixed error on Critical Success rerolls or Critical Failure confirms of custom Lore and Creative skills (bug introduced in 1.1.0)
- Fixed typo in Initiative stance roll query. Aggressive stances give -2 Defense, not +2  (bug introduced in 1.1.0)
- Cosmetic fixes

## 1.1.0
- Vitality, Wyrd & Energy shield:
  - Current level can no longer be increased past the max value
  - Clicking on the last bullet now decreases the current level by 1 (as one would naturally expect)
- Weapons, Psi powers & Theurgy rites:
  - Added goal roll buttons (based on characteristic + skill drop-down lists)
  - Added ability to vertically resize notes
- Added section for Body Modifications (a.k.a. Cyberware)
- Roll queries (stance selection in initiative roll & goal bonus/penalty) can now be translated from English
- Reverted to regular d20 symbol on roll buttons
- Ensured a natural 1 still is a success even when the goal is lower than 0 due to a high-enough goal penalty
- Minor cosmetic updates

## 1.0.1
- Fixed game load for players who have selected another language than English or French in their profiles
- New, stylized d20 for roll buttons

## 1.0.0
- first release of the Fading Suns v2.75 (a.k.a. 2nd Edition Revised by FASA).

# TODO list

- Make the "+/- #d" roll query more comprehensible and add to i18n.

- General improvements to goal rolls
  - Ability to switch b/w public vs GM roll
  - Vitality critical levels (-2 to -10) to affect goal numbers

- Increase similarity to the official character sheet
  - add a section for Movement (default: 5)
  - add a section for Languages

- [TBC] use short names for characteristics in weapon/psi/theurgy tables to save up on space

- Weapons & armors property checkboxes (Shock, Laser, Plasma, etc..) & replace d6rolls with proper damage/armor rolls showing shield-piercing vs normal damage, etc.

- Support for Symbiot characters

# Nice-to-have
- Infoboxes, e.g. how to compute init, wyrd, vita...

- xp changes lead to traits updates or vice versa (characs, skills, derived ones like vita, wyrd, init)

- Fading Suns Logo

- Sheet for spaceships
