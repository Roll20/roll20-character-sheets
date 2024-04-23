# Gamma World 1e Character Sheet

This is a character sheet for the 1st Edition of Gamma World.  It features 3 separate tabs for Humans, Mutants, and Monsters.


### Changelog

#### 1.02 (Oct. 2021)
* Roll updates
  * Update initiative roll to be `1d6+@{dex}`, (from previous `@{selected|dex}`). Init rolls now work without selecting token.
  * Init rolls can be called with `%{selected|INIT}`/`%{selected|INIT-mutant}`
  * artifact rolls can be called with `%{selected|ARTIFACT}`/`%{selected|ARTIFACT-mutant}`
* Armor Class input looks better

#### 1.01 (2018)
* Incorporated changes to Human and Mutant sheet to include "Artifact Use" roll button and calculation, with roll 1d10 modified by Artiface Use bonus (intMod) (-1 to Artifact Use for every Intelligence point above 15 and +1 for every point below 7), and limited to range 1 to 10, with negative numbers returned as 1 and numbers larger than 10 returned as 10 per this equation: [[ {{1d10 + @{intMod}, {1}}kh1, {10}}kl1 [Die Roll] ]].

#### 1.0
* Sheet creation per Character Sheet Request Thread.
* Incorporated updates to Attributes, including Intelligence modifier for artifact use, Dexterity To Hit modifier, and Charisma Table for Followers, morale and reaction adjustment.
* Incorporated updates to attack rolls, including the Armor Class Table (AC 10 to AC 1), the Weapon Class Table (Class 1 to 16), Physical Attack Table I: Attacks by Weapons, Physical Attack Table II: Attacks by Plants or Animals (HD 1 to HD 15+), and Mental Attack Matrix.
* Incorporated updates to weapons used table, including Weapon Class Table (Class 1 to 16) in Human, Mutant and Monster sheets.
* Incorporated updates to weapons used table, incluidng Physical Attack Table II HD 1 to HD 15+ (listed as HD in drop-down menu but numerically as Weapon Classes 51 (HD 1) to 57 (HD 15+) in Monster sheet.
* Incorporated updates to weapons used table, including Small, Man-Sized and Large opponents damage dice.
* Incorporated changes to Monster sheet, including modifications to the mutant generation section.


### Credits
The CSS of this sheet is from the Metamorphosis Alpha 1e character sheet.
