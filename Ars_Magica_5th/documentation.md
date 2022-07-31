## Sheet Documentation

Welcome the Ars Magica 5th Edition character sheet. This page contains the documentation for the sheet.

### Experience
The fields for experience work as follows:

+ the first number is your xp towards the next level. You can edit it.
+ the second number is the xp needed to reach the next level. It is readonly.
+ the third number is the total xp needed to reach your current level. It is readonly.


### Rolls and roll buttons

The sheet contains a number of button that roll dice, known as roll button. There are the three button right to the tabs: <span style="color:#169E9C">Roll</span>, <span style="color:#ee3f2f">Botch</span> and <span style="color:#DAA520">Critical</span> (in english, they might be translated to your language):

+ <span style="color:#169E9C">Roll</span> rolls a 10-sided die, with no particular results (roll20's default formatting for 1s and 10s is disabled)
+ <span style="color:#ee3f2f">Botch</span> handles rolling botch dice, see below
+ <span style="color:#daa520">Critical</span> handles critical rolls, see below

There are also die-shaped roll buttons in the sheet near interesting totals (characteristics, abilities, spells etc.) for easy rolling. This sheet supports both simple dice and stress dice, for all of them.


#### Roll configuration
In the configuration section (above this documentation), you will find a setting for how you want to handle simple vs. stress rolls:

+ on "both", you will have two roll buttons, the plain one rolling a simple die, the <span style="color:#ee3f2f">red</span> & <span style="color:#daa520">gold</span> one rolling a stress die
+ on "toggle", a new button will appear left to the "Roll" button. It display the current type of roll, and you can click on it to toggle between simple and stress dice

#### Simple die
The icon for simple dice is a plain die, without particular colouring. When you roll a simple die from the sheet, the result in chat will be coloured <span style="color:#5e5e5e">grey</span> or <span style="color:white; text-shadow: 1px 0px 3px #666666">white</span> (note it is colorless).

A simple die has no special results, so no further formatting is needed.

#### Stress die
The icon for stress dice is a die with a <span style="color:#ee3f2f">red</span> side, and a <span style="color:#daa520">gold</span> side, reflecting the possibility of a botch or a critical roll. When you roll a stress die from the sheet, the result will be coloured:

+ <span style="color:#8d4f23">brown</span> or <span style="color:#c2a973">khaki</span> if the result is nothing special
+ <span style="color:#ee3f2f">red</span> on a botch
+ <span style="color:#daa520">gold</span> on a critical (natural 1)

The formula for a stress die (you can see it by hovering over a result, see also "Labels" below) is quite complex, but does something simple:

+ on a 0 (or 10 on the standard d10), the value will be 0. You then roll botch dice to see if you botch
+ on a critical (natural 1), the value will also be 0
+ Otherwise, the result is whatever was rolled

#### Botch
When you roll a 0, the formula for a stress die yields a value of 0 (though other modifiers will apply). A roll of 0 can be easily seen, as the result will be bright red. You must then roll botch dice. To roll botch dice, you have to equivalent options:

+ click on <span style="color:#ee3f2f">Botch</span> right to the tabs on top of the sheet
+ click the "botch!" button n direclty in the chat near the result

In the configuration section (above this documentation), you will find a setting for how you want to roll botch dice:

+ on "separate", all botch die will be displayed individually in the chat, and you choose the number of botch dice with a dropdown menu (limited to 8 botch dice)
+ on "grouped", only the total number of botch will be displayed (i.e. the number of 0s rolled). You enter the number of botch dice as a number. You can still see the individual rolls by hovering on the result in chat

When you do botch (i.e roll 10s), the output will be coloured bright red.

#### Critical
When you roll a natural 1 on a stress die, you rolled a critical. The result will be displayed in bright <span style="color:#daa520">gold</span> colour. In that case, the formula for a stress die has value 0, so that you can add the result of the dice to your modifiers and bonuses. To roll the critical dice, you have two nearly equivalent options:

+ click on the <span style="color:#DAA520">Critical</span> button right to the tabs
+ click the "critical!" golden text next to the result in chat

In both case, you will be asked for the previous total (just copy-paste the value), and the die special Ars Magica 5th doubling die will be rolled and added (the formula does now you already rolled at least a 1s, and so must multiply by at least 2). The displayed result is the sum, i.e. the final result.

> **Warning**
>
> When you crit on a *spontaneous casting roll* or *initiative roll*, always use the "critical!" golden text next to the result in chat. Those button do not call the standard critical roll, but specific ones:
> + For spontaneous rolls, it takes into account the divide by 2
> + For initiative rolls, it will set your token's initiative in the turn tracker

As the exploding rolls of Ars Magica are quite hard to handle, there's a caveat in the formula if you use 3D dice in roll20: *the last result you see on screen is wrong* as the last rolled die is rerolled. This is because the formula splits the roll in two parts:

+ the first computes the number of 1s you rolled (for each 1, it will multiplie the final roll by 2, as in the Ars Magica rules). But in doing that, the last (non-1) roll is lost. This is a limitation of the roll20 dice engine
+ the second part rerolls the last result as [[1d9+1]],  a weird dice that takes values from 2 to 10 (because the last roll cannot be 1, otherwise it is not the last)

This might be a bit weird, but this yields exactly the same results (that is, you have the exact same chance to roll a given number) than what the Ars Magica 5 rules describe. The problem is only visual.

Other than that, the formula is correct: it does takes into account that you already rolled a 1 before clicking on the "Critical" button, and the previous total is also correct. No need to substract 1, or multiply by two, just copy-paste your previous result and read the final total in the chat.


#### Inline Labels
When you roll from the sheet, the rolltemplates displayed in the chat will show some values that went into the roll. You can hover on the final result with your mouse to see all the values that were used in the roll. The values are labelled so that you know where that +5 comes from.

### Roll buttons
The following roll buttons are defined in the sheet and may be called using ability command buttons:

+ `reroll`
+ `botch`
+ `critical`
+ `critical-spontaneous`
+ `critical-init`
+ `personality1_simple` / `personality1_stress` through `personality6_simple` / `personality6_stress`
+ `reputation1_simple` / `reputation1_stress` through `reputation6_simple` / `reputation6_stress`
+ `Intelligence_simple` / `Intelligence_stress`
+ `Perception_simple` / `Perception_stress`
+ `Strength_simple` / `Strength_stress`
+ `Stamina_simple` / `Stamina_stress`
+ `Presence_simple` / `Presence_stress`
+ `Communication_simple` / `Communication_stress`
+ `Dexterity_simple` / `Dexterity_stress`
+ `Quickness_simple` / `Quickness_stress`
+ `ability_simple` / `ability_stress` (inside a repeating section, needs special handling)
+ `Formulaic_simple` / `Formulaic_stress`
+ `Ritual_simple` / `Ritual_stress`
+ `soak`
+ `weapon_Init`
+ `weapon_Atk`
+ `weapon_Dfn`
+ `spell_simple` / `spell_stress` (inside a repeating section, needs special handling)


### Roll Template
This is the list of available roll template and what value they support.

All rolltemplate support the following values:

+ `stress`: If any value is supplied, indicate that the roll is a stress rolls. Changes the colors of the main roll, and displays the following buttons if appropriate
+ `botch-button`: ability button to roll the botch dice if the roll is a botch. Usually `[@{botch_i18n}!](~@{character_name}|botch)`
+ `crit-button`: ability button to roll the critical dice if the roll is a critical. Usually `[@{critical_i18n}!](~@{character_name}|critical)`, but not always (e.g. spontaneous and initiative rolls are special-cases)

Those are omitted in the following list of rolltemplate names and supported values:

+ **`custom`**:
    + This is the improved default template created by Jakob. See `https://wiki.roll20.net/Building_Character_Sheets/Roll_Templates#Jakob.27s_Better_Default_Rolltemplate` for details. All CSS v3 colors are supported by the `color` key (names must be all lowercase)
    + In addition, the rolltemplate supports the `roll-color` and `button-color` to change the background color of inline rolls and ability buttons, respectively, within the template. Both values support all CSS v3 colors, as `color` does. Those also support the `transparent` color.
    + The keys `left-align` and `right-align` can be used to control the text alignement of the left and right column, respectively. Values can be "left", "center" or "right". 
+ **`spell`**:
    + `character`
    + `duration`
    + `effect`
    + `Form`
    + `Level`
    + `mastery`
    + `range`
    + `roll`
    + `sigil`
    + `spell`
    + `target`
    + `Technique`
+ **`botch`**:
    + `roll`
    + `type`
+ **`reroll`**:
    + `roll`
+ **`critical`**:
    + `roll`
    + `type`
+ **`attack`**:
    + `attack`
    + `damage`
    + `name`
+ **`defend`**:
    + `defend`
    + `name`
+ **`soak`**:
    + `armorsoak`
    + `name`
    + `rollsoak`
    + `soakbonus`
    + `formlabel`
    + `formbonus`
+ **`initiative`**:
    + `name`
    + `roll`
    + `weapon`
+ **`ability`**:
    + `banner`
    + `label0` through `label4`
    + `name`
    + `result0` through `result4`
+ **`generic`**:
    + `Banner`
    + `Label`
    + `Result`
+ **`arcane`**:
    + `label0` through `label6`
    + `result0` through`result6`
    + `textlabel`
    + `textsublabel`
    + `textfield`



