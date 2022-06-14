# Hook Flow when sheet opens and Syncing Skills and Spells

This document attempts explain how cascading hooks are triggered when an action occurs. This one covers syncing skill and spell levesl when a character sheet opens and there is a new GURPS version.

Primarily, on('sheet:opened') attempts to update outdated character sheets to the most recent version.

## Hook sheet:open Repeating Skills

- `on('sheet:opened')` and new GURPS version start syncing the sheet
- call `updateRepeatingSkillSpellLevels("repeating_skills")`
  - NOTE: this is just one line associated with opening a new sheet

### Function updateRepeatingSkillSpellLevels(sectionName) {#updateRepeatingSkillSpellLevels}

- get the row ids for `sectionName`
- call `updateSkillLevel(sectionName, ids)`

### Function updateSkillLevel(sectionName, ids)

- set the sync field for each row to 1 (true)
- if sectionName = "repeating_skills"
  - For each row, this will fire the hook for `change:repeating_skills:sync`
- if sectionName = "repeating_spells"
  - For each row, this will fire the hook for `change:repeating_spells:sync`

### Hook change:repeating_skills:sync

- Triggered by `updateRepeatingSkillSpellLevels()`
- if (sync === 0) then exit
- if (sync === 1) then run the code below
- Get information to calculate the skill level for the row.
- Calculate the level for the skill
- update the skill level and change the sync value to 0
- For this row, this will fire the hook for `change:repeating_skills:level`
- callback = `sumRepeating()`
  - After updating the skill level, call this function to update point total for skills

### Hook change:repeating_skills:level

- Triggered by hook `change:repeating_skills:sync`
- Get the rowid that was updated
- call `updateSectionSkillsLinkedToUpdatedRow(rowId)`

### Function updateSectionSkillsLinkedToUpdatedRow(rowId) {#updateSectionSkillsLinkedToUpdatedRow}

- for each melee, ranged, techniques, and defense table call this function
  - `toggleRepeatingSectionLinkedToRow(rowId, section.sectionName, section.prefix);`
- call `updateKnockbackLinkedToRow(rowId)`

### Function updateKnockbackLinkedToRow(rowId)

- checks to see if the knock back item is linked to the skill
- if knockback is linked, call `updateLinkedKnockbackSkill()`

### Function updateLinkedKnockbackSkill()

- get the defense type and linked skill roll id
- if defense type is not a repeating table and there's no row id
  - clear fields
  - NOTE: There are no hooks related to these updated fields
- if defense type is an attribute
  - call `updateLinkedKnockbackSkillByAttribute(rowType, callback)`
- if defense type is a repeating table
  - call `updateLinkedKnockbackSkillByTable()`

### Function updateLinkedKnockbackSkillByAttribute(rowType, callback)

- get the skill level based on attribute stat
- set the linked field values
- update the fields, this is run silently, no hooks are triggered
  - `setAttrs(updateFields, {silent: true}, callback);`

### Function updateLinkedKnockbackSkillByTable(repeatingTableToUse, skillRowId, rowType, callback)

- get the skill level for the linked item
- if skill level has a value
  - set the values and knockback skill level, there are no related hooks for this update
  - `setAttrs(updateFields, null, callback);`
- if no skill level was found
  - set error message
  - call update silently to prevent hooks
    - `setAttrs(updateFields, {silent: true}, callback);`

### Function toggleRepeatingSectionLinkedToRow(rowId, section.sectionName, section.prefix)

- Find rows from the table (melee, ranged, techniques, defense) that are linked to the skill
- For those rows, set the skill_row_id_toggle to true
- For each row, this will fire the hook `change:repeating_[tablename]:[prefix]_skill_row_id_toggle`
  - example: `change:repeating_ranged:ranged_skill_row_id_toggle`

### Hook change:repeating_ranged:ranged_skill_row_id_toggle

- Triggered by `updateSectionSkillsLinkedToUpdatedRow()`
- get row type for ranged
- call `updateLinkedWeaponSkill()`

### Hook change:repeating_melee:melee_skill_row_id_toggle

- Triggered by `updateSectionSkillsLinkedToUpdatedRow()`
- get row type for melee
- call `updateLinkedWeaponSkill()`

### Hook change:repeating_techniquesrevised:technique_skill_row_id_toggle

- Triggered by `updateSectionSkillsLinkedToUpdatedRow()`
- get row type for technique
- call `updateLinkedWeaponSkill()`

### Hook change:repeating_defense:defense_skill_row_id_toggle

- Triggered by `updateSectionSkillsLinkedToUpdatedRow()`
- get row type for defense
- call `updateLinkedWeaponSkill()`

### Function updateLinkedWeaponSkill(sectionName, prefix, rowType, defenseType, talentLevel, callback)

- get the row id and type of updateMethod that is linked to this item
- if updateMethod is repeating AND rowId is empty
  - clear the fields and set `skill_row_id_toggle` to 0.
  - Run `setAttrs(data, {silent: true})` using silent
    - this will prevent hook for `skill_row_id_toggle` from triggering.
- if updateMethod is a an attribute, row id isn't needed, call `updateLinkWeaponSkillByAttribute()`
- if updateMethod is a repeating row and there is a linked row id, then call `updateLinkedWeaponSkillByRepeatingRow()`

### function updateLinkWeaponSkillByAttribute(sectionName, skillRowIdFieldName, weaponSkillFieldName, skillMessageFieldName, skillMessageFieldLevel, skillRowIdToggleFieldName, parentFieldName, baseSkillFieldName, rowType, skillMod, defenseType, talentLevel, callback)

- get the skill level based on the attribute
- if we're updating the skill for a defense, calculate the defense skill level
- be sure to set `skill_row_id_toggle` to 0
- update this row to the linked field values and make sure to run silently, to prevent other hooks from firing.
  - Example: `setAttrs(data, {silent: true})`

### function updateLinkedWeaponSkillByRepeatingRow(sectionName, weaponSkillFieldName, skillMessageFieldName, skillMessageFieldLevel, skillRowIdToggleFieldName, parentFieldName, baseSkillFieldName, repeatingTableToUse, skillRowId, skillMod, defenseType, talentLevel, callback)

- be sure to set `skill_row_id_toggle` to 0
- get the skill level based on the linked skill
- if the skill level is greater than 0
  - if we're updating the skill for a defense, calculate the defense skill level
  - update this row to the linked field values and make sure to run silently, to prevent other hooks from firing.
    - Example: `setAttrs(data, {silent: true})`
- if the skill level has no value
  - set a message in the linked message field name that something went wrong.
  - update this row and be sure to run silently.
    - Example: `setAttrs(data, {silent: true})`

---

## Hook sheet:open Repeating Spells

- `on('sheet:opened')` and new GURPS version, start syncing the sheet
- call `syncModsToRepeatingSpells(true, updateRepeatingSkillSpellLevels("repeating_spells"));`
  - First function updates the spells with the global spell modifiers
  - Then second function makes sure the spell levels are correct.
  - NOTE: this is just one line associated with opening a new sheet

### Function syncModsToRepeatingSpells(silent, callback)

- this function makes sure the global spell settings are applied to each spell in `repeating_spells`.
  - base = the attribute being used
  - bonus = the spell bonus from magery, power investiture or similar advantage
- if silent = true, use `setAttrs(data, {silent: true}, callback)`
  - No hooks will fire
  - this is needed when syncing the character sheet
- if silent = false, use `setAttrs(data, null, callback)`
  - This will fire Hooks `change:repeating_spells:base` and `change:repeating_spells:bonus`
  - NOTE: This  hook is for updating skills, see [updating-skill-level-hooks.md](./updating-skill-level-hooks.md)
- Callback function. For sheet syncing, this will call `updateRepeatingSkillSpellLevels("repeating_spells")`
  - see [Function updateRepeatingSkillSpellLevels(sectionName)](#updateRepeatingSkillSpellLevels)

### Hook change:repeating_spells:sync

- Triggered by `updateSkillLevel(sectionName, ids)`
- if (sync === 0) then exit
- if (sync === 1) then continue
  - Get information to calculate the skill level for the row.
  - Calculate the level for the skill
  - update the skill level and change the `sync` value to 0
  - For this row, this will fire the hook for `change:repeating_spells:level`
  - callback `sumRepeating()`
    - After updating the skill level, call this function to update point total for spells

### Hook change:repeating_spells:level

- Triggered by hook `change:repeating_spells:sync`
- Get the rowid that was updated
- call `updateSectionSkillsLinkedToUpdatedRow(rowId)`
  - see [Function updateSectionSkillsLinkedToUpdatedRow(rowId)](#updateSectionSkillsLinkedToUpdatedRow)
