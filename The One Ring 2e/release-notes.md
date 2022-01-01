# Release Notes
This is a rewrite based on the early 2e (basic) and 1e edition that also includes a 2e sheet for adversaries. It features correct handling of favoured rolls and stance related bonus changes to attack rating, parry, protection and damage.

**Important:** For the rolls to work properly, follow the instructions on [The One Ring wiki page](https://wiki.roll20.net/The_One_Ring#Rollable_Tables) to set up custom rollable tables for your game.

More info: [Readme](https://github.com/Roll20/roll20-character-sheets/blob/master/The%20One%20Ring/README.md) and [wiki page](https://wiki.roll20.net/The_One_Ring).

# Release History

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
