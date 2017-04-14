# Leverage RPG Character Sheet

This is an early attempt, any advice or comments welcome.

### Usage

This character sheet requires a modern web browser. You must be the latest
version of Chrome, Firefox or Internet Explorer to get the full experience.

Editing attributes, skills, distinctions, etc is straightforward, simply fill
out the text fields and mouseover the dice image to change its value.

#### Bugs and Suggestions

Report bugs or suggestions to the project’s [issue
tracker](https://github.com/tapiochre/roll20-character-sheets/issues).

### Dice Pool Rolling

I have a macro that allows you to pool dice - 

/r {?{Attribute|Agility,1@{Agility}|Alertness,1@{Alertness}|Intelligence, 1@{Intelligence}|Strength,1@{Strength}|Vitality,1@{Vitality}|Willpower,1@{Willpower}}+?{Role|Grifter,1@{Grifter}|Hacker,1@{Hacker}|Hitter,1@{Hitter}|Mastermind,1@{Mastermind}|Thief,1@{Thief}}+?{Speciality|No,0d6|Yes,1d6}+?{Distinction|No,0d4|Good,1d8|Bad +1pp,1d4}+?{Signature Asset|No,0d8 |Yes,1d8}+?{Assets|0}d6}kh2

