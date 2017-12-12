## Versioning
Versions have three numbers Major.Minor.Release

**Major**: Indicates that some form of compatibility has broken.  These versions should have notes indicating what broke and how to handle it.  May include major UI changes to sheet layout and design.

**Minor**: Indicates the addition of new features and/or bugfixes.

**Release**: Indicates bugfixes and minor UI changes only.

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
