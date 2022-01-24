# Release Notes
This is a rewrite based on the early 2e (basic) and 1e edition that also includes a 2e sheet for adversaries. It features correct handling of favoured rolls, weary/miserable state, bonus dice and stance related bonus changes to attack rating, parry, protection and damage.

# Release History
## 02.01.00 (Build 5)
### Features
- changed stance values from "Forward/Open/Defensive/Rearward" to "1/2/3/4" because this opens the way for players to easily toggle stance by using the token bar
- stance changes toggle the stance attack bonus automatically (forward:1/open:0/defensive:-1/rearward:0). The checkbox now only effects the attack damage bonus and is automatically activated when in forward stance (this can be used for Beorning with GREAT STRENGTH virtue to get +1 damage bonus in forward stance). 
- adversary targeted attack will take the opponent's stance into account and modify the success dice with +1/0/-1 automatically.
- favoured protection rolls (e.g. due to dwarf virtue "stone hard")
### Bugfixes
- CM checkbox not clickable (armour with cunning make), https://trello.com/c/lM1rrRA9
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
