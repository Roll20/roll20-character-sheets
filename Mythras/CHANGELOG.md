# Changelog

All notable changes to the Mythras sheet will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 3.8
### Fixed
- Corrected damage modifier calculations for table values above 50
- Corrected movement modifier for fatigue level of winded
- Corrected an issue preventing moveRate calculations when old encumbrance values were in place

## 3.7
### Fixed
- Deleting a weapon will now actually remove the row instead of just clearing the data

## 3.6
### Fixed
- Combat Styles did not default to applying Encumbrance penalties
- Professional Skills and Combat Style did not proper evaluate which encumbrance penalties should apply when STR or DEX was part of the base score.

## 3.5
### Fixed
- [Various reapeating fields can not be added to the macro bar #77](https://github.com/DigitalPagan/Mythras-Roll20-Sheet/issues/77)
- Weapons added via the meg import were not getting their rollval set to make the buttons work

## 3.4
### Fixed
- [Damage modifier and other fields may not appear when weapon button used from roll template #73](https://github.com/DigitalPagan/Mythras-Roll20-Sheet/issues/73)
- [Favoriting Weapons & Clicking them from the Combat Style prompts all notes #68](https://github.com/DigitalPagan/Mythras-Roll20-Sheet/issues/68)

### Changed
- Weapon rolls were renamed from `%{$ID_damage}` to `%{$ID_roll}`.  They now use custom roll parsing and the roll button itself is a reference to the ability

## 3.3
### Fixed
- [Issue #70: Using hidden HP configs is not working right](https://github.com/DigitalPagan/Mythras-Roll20-Sheet/issues/70)
- [Issue #72: Text is too light when weapon is not favored](https://github.com/DigitalPagan/Mythras-Roll20-Sheet/issues/72) - Removed text transparency
- Added some missing translation keys

### Changed
- Removed v3 conversion problems notice from the options bar
- Removed the redo v3 conversions button from help pop-up
- Reduced transparency on greyed out items

## 3.2
### Fixed
- Issue causing default setting of Mythic Britain to actually be Mythic Babylon and visa-versa.
- Fixed issue with default "whisper rolls to GM" being set incorrectly.

## 3.1
### Added
- Added a button in the help section that will re-attempt the upgrade to v3 if someone ran into issues the first time around.
- Reintroduced the repeating custom standard skills, should convert any old v2.7 data that was present.

### Fixed
- If sheet version was undefined it would the versioning scripts would skip upgrading which caused a number of people to miss any conversion logic.  Added checks and changed default behavior to handle this situation better.
- Resolution Pool fixed

### Changed
- Moved @{sheet_notes} to @{sheetnotes} because a number of repeating fields with a _notes attr apparent to hit conflicts with this when using ability buttons.

## 3.0

v3.0 is a complete re-write of the character sheet from the ground up.  Primary goals of the re-write were simplifying the sheet, fixing performance issues, and making it easier to maintain as future publications are released.  The changes are too numerous to itemize in the Changelog but some key highlights are listed below.  Conversion code should run and ensure all data in maintained but put into the new sheet forms.

### Added
- Support for the Mythic Babylon, Destined, Lyonesse, Fioracitta, and Perceforest settings.
- Dark mode support
- i18n translation for dynamic prompts like those used for sorcery.

### Changes
- Switched to a generic abilities system rather than trying to support all the different magic/power systems throughout various settings and publications.
- Removed and consolidated a lot of inputs fields to reduce sheet complexity and clean up the visual presentation.
- A complete overhaul of the sheet styling, should be no more formatting problems with certain setups.
- Now have a different sheet type for spirits and creatures which are more optimized for NPCs
- Can now switch between Physical, Social, and Spiritual modes to alter the sheet for specific types of conflicts.
- Roll Templates have been updated and now may have buttons to roll followup actions such as rolling hit location or weapon damage, pending on the specific roll made.
- Added a floating options bar at the top to quickly set common changes which will always be in view no matter where in the sheet you are.
- Sheet tabs have been replaced with anchor links so you will jump to that section of the sheet but still have the ability to scroll to other section manually.
- Augmenting and 101+ penalties are now handled as a generic setting rather than per skill.
- Added the ability to select the specific difficult you wish to roll for.
- Weapons can now be favored for inclusion in combat style rolls.
- Added storage location to weapons so they can be moved to various locations or a pack for proper ENC calculation.
- Can now set skill augmentation from a skill and reset it back to zero by clicking a button.
- Now favor changing a skill's total directly and reverse calculating the points added on top of base values.
- Frostbye Books style vehicles no longer have a static module list.  Instead, you may add a module dynamically and define its type to ensure auto calculations are done correctly.  This allows for defining multiple modules of the same type, splitting them into multiple hit locations.
- Cleaned up the translation keys to correct a mis-understanding about their naming patterns.  Attempts have been made to retain translation data as much as possible but some minimal amount of re-translation may be required.
- Updated to support new Roll20 character sheet syntax.
- Added links to Roll20 wiki documentation to various parts of the sheet so user's can quickly find and access relevant documentation and instructions.
- Now has a common hidden hit table button which will indirectly call the right hit table per the sheet type.  This means you can use a hit location macro and target any token and the right table will be used regardless of sheet type.
- Made a number of options part of the setting option to reduce the number of options a GM has to consider.

### Removed
- The Mooks fields which would allow you to track multiple identical characters on a single sheet.  The extra fields were a drain on performance.  Instead, you should use the Conditions notes to mark any changes to individual mooks.

## 2.7
### Bug Fixes
* Fixed formatting for Social Conflicts in Firefox
### New Features
* Added rollable hit tables

## 2.6
### New Features
* Added Social Conflict Support

## 2.5
### Big Fixes
* Fixed unarmed in Combat section

### New Features
* Added sheet option to enable Work Songs
* Added sheet option to enable Artifice
* Added sheet option to enable Alchemy
* Added effect template
* Added effect rolls to equipment
* Added equipement and money to compact/mook sheets

## 2.4
### Bug Fixes
* Fixed overflow in Firefox with Passions
* Fixed current/max fields which would be mis-synced after JSON imports

### New Features
* Added toggle to base Exp Mod on INT
* Added option to make Strangeness a Standard Skill
* Added option to make The Soot a Standard Skill
* Added Peculiarities
* Added Odd Soot Magic Support
* Added Odd Soot to Settings

## 2.3
### New Features
* Added Support for Superpowers
* Toggle to calculate Healing Rate with CON + half POW
* Toggle to calculate Luck Points with CHA + half POW
* Added Agony & Ecstasy to Settings
* Cleaned up skill rolltemplate so it doesn't use bold font for everything

## 2.2
### New Features
* Added toggle to base HP on CON+SIZ or CON+SIZ+POW or CON+SIZ+STR
* Added toggle to base damage mod on STR+SIZ or STR+SIZ+POW or STR+SIZ+CON
* Added toggle to add 1/10 Athletics to Initiative rolls
* Added notes field to all skills which will display at the bottom of skill rolls
* Added Worlds United to Settings

## 2.1
### New Features
* Added options to enable/disable magic point/power points/prana points
* Can now disable vehicles entirely, this is the default.  Ships and shield walls ships will need enabled unless mechanics are supplied in the setting.
* New option to enable/disable battle units.
* New option to enable/disable spirit type creatures and the form toggle.
* Removed sheet variants which was a hidden feature utilized to help support the M-Space sheet on the same code base.  Now simply selecting M-Space setting will do all that work.  This includes altering the logo in the upper-right.
*

## 2.0
With this version I am switching back to a two number version format.  The description above has been adjusted.  The intent is to release versions in smaller chunks.  As soon as a new feature or adjustment is made it will be released as a version.  This will hopefully quicken the pace of sheet development and make sheet adjustments a bit more manageable.  Expect that 2nd number to increase rather fast.

### Known Issues
* Due to the large number of variables converting to sheet workers and the inter-related effects of values in the Mythras system, the upgrade process will sometimes not go as expected.  It is highly dependent on the order in which other value calculations are triggers when we start converting fields for sheet workers.  If the update of one value triggers a reclac for a field which is also dependent on a value which has not yet converted the process breaks down.  If this happens simply click the recalculate button.  Enough of the conversions will be complete the 2nd time around to allow the sheet calculations to complete successfully.

### Compatibility Issues
* This version removes the NPC sheet in favor of a generic Character type which can be used for NPCs or PCs.  A new Compact and Mook sheet have been added to provide the smaller sheet layout and some other features useful to NPCs.  Data from the NPC sheet will be lost due to an inability to discern which of the npc or pc values one may wish to have in the upgraded sheet.  A warning has been displayed in the NPC sheet for a number of months to copy data over to the PC sheet in preparation for this.
* In addition a large amount of the sheet has converted over to using sheet worker for auto calculations.  As a result many variable value formats have changed.
* A number of variables have been renamed to reflect a more generic approach to setting support.

### New Features
* Added the Compact view.  This uses the same values as the primary sheet but displays them in a simplified and compact form.  This allows a user to maintain basic easy to navigate sheets for NPCs without loosing the advanced features of the PC sheet.  If you need to access modifiers or other values not displayed in this view simply switch over to the more advanced views, edit and return to the compact view.
* Added the Mook view.  This is nearly identical to the Compact view but provides multiple entries for current values.  This allows GMs to have one sheet representing multiple instances of like characters.  Useful when you need to have like NPCs but wish to track the full assortment of values which won't fit into the three token bars.
* Rank is now an optional field
* Movement values are now rounded to make them more readable
* A number of sections can now be collapsed hiding them away when unneeded.
* Fatigue now uses a number based value under the hood which allows it to be set up as a token bar more easily.
* Added a toggle which switches the character between spirit and material forms.  Useful for defining spirit type characters and for shamans who often enter the spirit realm.
* Removed the tenacity for spirits option.  Now it is simply enabled when Tenacity is.
* Added a method to define separate swim and fly movement species values.  Useful for defining non-human characters.
* Added Mythra Imperative as a setting which makes the sheet fall inline with the simplified rulesets better.
* Added a sheet option to set AP to a particular value instead of being based on Characteristics.
* Added a sheet option to enable/disable weapon reach
* The encumbered toggle for skills is automatically checked/unchecked based on the base characteristics selected
* Added buttons at the sheet footer which will show a link in the chat window which serve various purposes: Report a bug in the sheet, contact the sheet author, and visit the Mythras Roll20 Forum on The Design Mechanism's forum board where we discuss beta testing, plan feature enhancements, and other development tasks.
* Firearms and Missile Weapons were merged together into Ranged Weapons
* Shields were merged into Melee Weapons
* Weapons and Armor and now primarily listed in the Equipment tab.  They still display for utility in other locations but they may only be added/removed in Equipment.
* Added a sheet option to calculate Herculean difficulty at 1/10th or 1/5th standard value.
* Added a new sheet option for the use of Linguistics instead of Language/Literacy which slightly modifies the language section to better represent how linguistics applies to multiple languages.

### Bug Fixes
* After the Vampire Wars was set as the default campaign value, it is now Default again.  Most probably never noticed because the default was reset by campaign options.
* A few bugs in the new hit location presets were resolved
* Resolved an issue which was preventing sheet upgrade functions from running when sheets were upgraded.

### Other Changes
* Quick Stats renamed to Build (Doesn't not take you through the build process, still just provides a quick way to input the fields you need when first defining a character).
* Traits were broken out of Info and into it's own section
* The Penalty field has been renamed to 101+ which will hopefully make it's purpose clearer.
* The All tab has been removed, partially because I needed to free up the space for new tabs and also because the new Compact tab can be an effective replacement for the purpose the All tab filled.
* Combat Styles is now just Combat and holds a number of things useful for combat like a handful of standard skills.  Weapons were also merged into this section.
* Roll buttons which use d100 based rolls have a hundreds d10 icon instead of a d20.

## 1.9.0
### New Features
* Added the Quick Stats tab to allow for the rapid setting of base sheet values without a lot of opening/collapsing of detail sections.
* Added Fae Magic support for After the Vampire Wars
* Added needed Folk Magic adjustment options for After the Vampire Wars

## 1.8.0
### Bug Fixes
* Fixed JSON Import when importing hit tables with a range of 1 on one of the locations.  Will now also remove leading 0's from imported hit tables.

### New Features
* Added support for After the Vampire Wars.  No new mechanics for this setting just a selection of existing rules.
* Renamed Luther Arkwright Psionics to Mythras Psionics
* Added Vehicle Sheets for both Mythras and M-Space.  New campaign option allows you to select betweeh Mythras, M-Space and Ships & Shield Walls mechanics.
* Added locations to the equipment list.  Also added a checkbox to equip or unequip a pack allowing a character to drop all ENC in a pack.
* Added description field to the equipment list.

## 1.7.0
### New Features
* Added support for Mythic Constantinople.  This adds Affiliations and option to base max devotional pool on POW instead of Cult Rank.

## 1.6.0
### New Features
* Made Unarmed and Native Tongue static objects, Unarmed co-exists as a Combat Style and Skill.
* Merged Weapon Combat Effects and Traits into a single Notes field for cleaner JSON Importing and to provide a larger space for weapons with more effects and/or traits.
* Professional Skills and custom skills can now set no characteristic for base value.
* Re-arranged extended conflict fields, conflict pool moved to attributes and details toggle will show current pools for characterists there.  NPC pools removed as they aren't needed for temporary characters anyway.
* Moved Conditions into its own textarea.
* Merged the Initiative roll and Initiative bonus attribute.
* Expanded Traits into a repeating field and moved it inside the character info details.
* Moved robust gift inside a Health & Armor detail section which also contains a new temp armor and hp mod which applies to all locations.
* Added Quick Stats tab to the PC sheet with JSON Importer.
* JSON Import for PC sheets will automatically hide unused weapon and magic types.
* Spirit Damage will now consider half willpower when calculating its value.
* Toggle provided to switch between spirit attributes and normal attributes.  This re-calculats ap and init so the same macros can be used regardless of current spirit state.
* Added toggle to switch INT to INS.

## 1.5.2
### Bugfixes
* Delete button will now be easier to click on repeating sections.
* Magic show/hide toggles now work again.
* Fixed Battle Unit Formation field from reverting back to Broken.

## 1.5.1
### Bugfixes
* Minor re-arrangement of fields
* Fixed rounding error in NPC rolls

## 1.5.0
### New Features
* Added NPC sheet with JSON importer
* Added Battle Unit sheet
* Added Ship sheet
* Added penalty fields to the spirit repeating section in Animism

### Bugfixes
* Fixed issue with Background tab which caused it not highlight when selected.

## 1.4.1
### Bugfixes
* Fixed missing translation key for the option to not show 101+ reductions

## 1.4 0
### New Features
* Added M-Space support.  New sheet options include extended conflict resolution, simplified combat(M-Space optional rule) and M-Space style Psionics
* Added Mythic Rome suppor.  New sheet options include Roman Magic
* Added one more hit location for crab styled creatures
* Added option to not display the 101+ reduced result in roll templates

## 1.3.3
### Bugfixes
* Moved checkbox to left of labels/descriptors to more closely match most style guidelines
* Added missing features needed for Luther Arkwright support; Conditions, and Psionics magic
* Added hit location setting which will set the hit location table to the correct values.  Currently only supports Humanoid and Custom.  Can set default in Campaign options.
* Some UI re-arranged for the addition of missing features

## 1.3.2
### Bugfixes
* Patch to finish hit location data migrations for those who upgraded before the v1.3.1 patches were in.  Will copy old location data into new but only if the new fields are still undefined or empty.

## 1.3.1
### Bugfixes
* Fixed a hit location data migration issue from v1.2.0 to v1.3.0

## 1.3.0
### Compatibility Issues
* Not a real compatibility issue but if you find a section of the sheet missing you may need to enable it in the new campaign options section.

### New Features
* Campaign Options:
    * You can now enable/disable various components of the sheet like dependencies, firearms & magic systems(entirely remove them including the show/hide check-boxes).
    * That's all tied to the setting option, select Luther Arkwright and it will automatically set the various individual sheet options to match Luther Arkwright RAW.  For example, it will enable dependencies, disable magic systems other than mysticism, enable firearms and change some of the terminology to be setting specific.
    * Each of those options can be over-ridden.  So to take Luther Arkwright for example, you can set Folk Magic to "enabled" instead of "per setting".  In that case Folk Magic will show even if setting is configured for Luther Arkwright.  This will allow you to use systems from other settings in custom settings or as optional rules.
    * These sheet options can be set by the GM in the campaign settings so the sheet/character comes pre-configured on creation, avoiding the need to switch each sheet/character to the appropriate settings.
* Added setting support for: Classic Fantasy, Monster Island and Thennla
    * Classic Fantasy: Some terminology changes, adds an Arcane and Divine magic section, and enables adding rank to luck points.
    * Monster Island: Adds a Status skill under standard skills, disables Folk Magic and Mysticism
    * Thennla: Relabels Folk Magic as Rites
* Added a new tab with General Notes and renamed the existing Notes tab to Background
* Added notes to the equipment section
* Expanded hit locations to 11 fillable fields(most any creature in the rulebooks has).  The hit ranges are also broken into low and high values instead of one field(preparation for rollable hit tables).  You can also re-label the hit location names.
* Can now change the base characteristics of sorcery invocations.  Still defaults to INT+INT
* Changed Magic sections to be a little more distinct from each other
* Removed the spinners from the number fields
* Can now adjust the roll used for initiative to anything you wish.  If you had the alacrity gift checked the roll is already updated for you.
* Re-arranged the Movement section to be more readable and to make room for expanded hit locations.
* Can enable/disable display of weapon sections like you can with magic sections now.

### Bugfixes
* Fixed Concentration for spell roll templates
* Fixed base value of Dance skill
* Fixed the translation key for Stealth Base value
* Set columns in the Background section to be equal width
* Fixed rolling for Shaping giving a standard value of 0
* Replace some terminology missed for Luther Arkwright support
* Renamed Strike Rank to Initiative Bonus

## 1.2.0
### New Features
* Switched to three number versioning.
* Added detailed fields for spirits/fetishes.
* Added options to whisper dice to the GM only and to exclude the character name from rolls .
* Added the other optional Shaping components and you can now individually enable/disable each.
* Adjusted the symbols used to indicate Critical and Fumble in the skill roll tmeplate to make them stand out from standard success and failure.
* Allow user to select more invocations and devotions when configuring spells and miracles

### Bugfixes
* Fixed typo Missle -> Missile
* Fixed encumbered value in roll tmeplates of professional skills and custom standard skills

## 1.1
### Bugfixes
* Strike rank has migrated to Initiative bonus per updated rules.  The built in sheet versioning should copy any existing values over to the new fields.

## 1.0

* Initial Release