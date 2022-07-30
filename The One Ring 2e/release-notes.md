# Release Notes

This is a rewrite based on the early 2e (basic) and 1e edition that also includes a 2e sheet for adversaries. It features correct handling of favoured rolls, weary/miserable state, bonus dice and stance related bonus changes to attack rating, parry, protection and damage.

# Release History

## 02.14.00 (Build 19)

### Features

- added "fellowship focus" to pc sheet

### Translation

- fixed some missing support for translations on the pc sheet (thanks to iosu Li for the spanish translation)

## 02.13.01 (Build 18)

### CSS

- fixed protection roll-button may be not available with minimal width

## 02.13.00 (Build 17)

### CSS

- enhanced contrast of roll buttons

## 02.12.01 (Build 16)

### Bugfixes

- Fixed stance damagebonus should be dependent on the stance damage active checkbox (error was introduced with the grievous selectbox)

## 02.12.00 (Build 15)

### Features

- changed keen, grievieous, fell weapon spec from checkbox into selectable valued options
- changed cunning make, close fit, reinforced armour spec from checkbox into selectable valued options
- added release log to archive data migration messages (button on the bottom of the sheet to toggle)

PLEASE NOTE: due to the changes a data migration will make changes to the values of weapon and armour values. As the new sheet will automatically incorporate all necessary bonus to Damage/Injury/Load/Parry etc. the data migration will automatically correct those values depending on the flags (keen, grievous, fell, cunning make, close fitting, reinforced). You can check everything that happened in the release log (click button to show it). Please inform the players about the new semantics of the sheet to avoid confusion.

## 02.11.00 (Build 14)

### Features

- added tabs for notes area

## 02.10.00 (Build 13)

### Features

- removed parsed rolls buttons from combat proficiencies to improve UI clarity

### CSS

- changed location of virtues und rewards to make it consistent with the heart and wits areas

## 02.09.00 (Build 12)

### Features

- added custom dice roller

### CSS

- added "msg-alt" label for the MSG-custom roll template that will remove the yellow background from inlined rolls. This is usefull when using custom roll tables for events (e.g. hazards)

## 02.08.00 (Build 11)

### Features

- add Close Fitting to other armour slot to allow for a selectable +2 protection bonus (e.g. due to a virtue)

### CSS

- minor layout improvements

## 02.07.00 (Build 10)

### Features

- Added weapons weapon checkboxes to equip/drop (e.g. to reduce load after throwing a spear)
- Armour checkboxes now also reduce load if unchecked
- Added two weapon slots

### CSS

- Rolltemplate layout optimization
- fixed darkmode

### Fixes

- Fixed: global illfavoured in combination with a favoured skill doesn't result in a "normal" roll

## 02.06.00 (Build 9)

### Features

- Parsed rolls: changed feat die rolls from 1d12-1 to 1d12. Implemented correct handling of (11,12) values for pc and lm rolls and for favoured and ill-favoured rolls
- Parsed rolls: reenabled feat die hover, as the semantics are now better to understand

### Attribute migrations (handle by automatic migration)

- endurance -> endurance_max
- currentendurace -> endurance
- hope -> hope_max
- currenthope -> hope

## 02.05.00 (Build 8)

### Sheet fixes

- Parsed rolls: fixed Eye of Sauron fails roll even if not miserable and roll >= TN
- Added missing sheet translation support (missing rolltemplate translation will follow in a later release)

### CSS fixes

- Removed 1d12-1 display for the feat die, because this was not easy to understand for players

## 02.04.00 (Build 7)

### New Features

- adversary sheet and rolls include weary modifier
- new roll-template to denote non-roll messages. Format &{template:msg} {{header=Generic Header}} {{sub1=Subheadline1}} {{sub2=Subheadline2}} {{msg=This is a test}}

### Sheet fixes

- fixed common bonus dice pick up stance bonus
- fixed targeted adversary attack rolls don't pickup target's stance in bonus dice query
- set default favourill to "normal" for new characters and adversaries

### CSS fixes

- fixed hover info word-wrapping

## 02.03.00 (Build 8)

### Features

- Roll-Template: Target rolls now show the targetname in the roll-template. This is especially helpfull for lm rolls, to assign rolls to the corresponding characters.
- Roll-Template: If the roll has failed the roll-template will not show the damage and weapon details to save space.

### CSS

- import fonts from fonts.google
- update to higher resolution borders

## 02.02.01 (Build 7)

### CSS fixes

- removed font imports and font-face declarations
- added two missing .sheet prefixes in roll-template html
- added two missing .charsheet prefixes in the pc css
- fixed a typo in the roll-template css

## 02.02.00 (Build 6)

- The macro bar is now available for parsed rolls (which is not easy to achieve as parsed roll buttons are action buttons and need special treatment to be available for the macro bar). You can drag / drop attack and protection rolls from the sheet into the macro bar and click those actions directly without opening the sheet. This is especially useful in conjunction with targeted attacks and will smooth and speed up battles.

### Bugfixes

- bugfix miserable
- bugfix favourill not initialized
- css cleanup
- fixing two issues that might have had an impact on the roll-template issue! (fingers crossed)

## 02.01.00 (Build 5)

### Features

- changed stance values from "Forward/Open/Defensive/Rearward" to "1/2/3/4" because this opens the way for players to easily toggle stance by using the token bar
- stance changes toggle the stance attack bonus automatically (forward:1/open:0/defensive:-1/rearward:0). The checkbox now only effects the attack damage bonus and is automatically activated when in forward stance (this can be used for Beorning with GREAT STRENGTH virtue to get +1 damage bonus in forward stance).
- adversary targeted attack will take the opponent's stance into account and modify the success dice with +1/0/-1 automatically.
- favoured protection rolls (e.g. due to dwarf virtue "stone hard")

### Bugfixes

- CM checkbox not clickable (armour with cunning make), <https://trello.com/c/lM1rrRA9>
- swapped position of Valour and Wisdom

## 02.00.01 (Build 4)

- rename Advancement Points -> Adventure Points

## 02.00.00 (Build 3)

- integrate roll parsing to get rid of custom roll tables.
- integration of armour qualities in the layout (cunning make and close fitting)
- favoured/ill-favoured rolls for adversaries
- integrate roll-templates
- numerous layout optimizations and UI improvments

## 01.01.00 (Build 2)

- added sheet worker to set the skill rolls on every update of the favoured skill state or global favoured state. This replaces the static switches in the rolls that were hard to read for players.

## 01.00.00 (Build 1)

- Technical rewrite (based on a css grid)

- UI design based on current 2e design elements

- Added adversary sheet (attack and protection rolls included)

- Added stance handling

- Added favoured rolls on skills, valour, wisdom

- Added total parry and protection calculation

- Added selected adversary parry bonus integration into attack rolls

**Data Migrations**

| Version | Old Attribute | New Attributename |
| ------- | ------------- | ----------------- |
| changed | treaure       | treasure          |

# Versioning

Versions have three numbers Major.Minor.Release

**Major**: Indicates that some form of compatibility has broken.  These versions should have notes indicating what broke and how to handle it.  May include major UI changes to sheet layout and design.

**Minor**: Indicates the addition of new features and/or bugfixes.

**Release**: Indicates bugfixes and minor UI changes only.
