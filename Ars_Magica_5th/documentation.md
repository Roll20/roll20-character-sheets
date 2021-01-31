## Sheet Documentation

Welcome the th Ars Magica 5th Edition character sheet. This page contains the documentation for the sheet.

### Experience
The fileds for experience works as folows:
+ the first number is your xp towards the next level. You can edit it
+ the second number is the xp needed to reach the next level
+ the third number is the total xp needed to reach your current level


### Rolls and roll buttons

The sheet contains a number of button that roll dice, known as roll button. There are the three button right to the tabs: <span style="color:#169E9C">Roll</span>, <span style="color:#ee3f2f">Botch</span> and <span style="color:#DAA520">Critical</span> (in english, they might be translated to your language):
+ <span style="color:#169E9C">Roll</span> rolls a 10-sided dice, with no particular results (roll20's default formattion of 1s and 10s is disabled)
+ <span style="color:#ee3f2f">Botch</span> handles rolling botch dice, see below
+ <span style="color:#DAA520">Critical</span> handles critical rolls, see below

There are also die-shaped roll buttons in the sheet near interesting totals (characteristics, abilities, spells etc.) for easy rolling. This sheet supports both simple die and stress die, for all of them.


#### Roll configuration
In the configuration section (above this documentation), you will find a setting for how you want to handle simple vs. stress rolls:
+ on "both", you will have two roll buttons, the plain one rolling a simple die, the <span style="color:#ee3f2f">red</span> & <span style="color:#DAA520">gold</span> one rolling a stress die
+ on "toggle", a new button will appear left to the "Roll" button. It display the current type of roll, and you can click on it to toggle between simple and stress die

#### Simple die
The icon for simple dice is a plain dice, without particular colouring. When you roll a simple die from the sheet, the result in chat will be coloured <span style="color:#424141">grey</span> or <span style="color:white; text-shadow: 1px 0px 3px #666666">white</span> (note it is always colorless).

A simple die has no special results, so no further formatting can happen.

#### Stress die
The icon for stress dice is a dice with a <span style="color:#ee3f2f">red</span> side, and a <span style="color:#DAA520">gold</span> side, reflecting the possibility of a botch or a critical roll. When you roll a stress die from the sheet, the result will be coloured:
+ <span style="color:#c2a973">brown</span> or <span style="color:#a55a24">khaki</span> if the result is nothing special
+ <span style="color:#ee3f2f">red</span> on a botch
+ <span style="color:#DAA520">gold</span> on a critical (natural 1)

The formula for a stress die (you can see it by hovering over a result, see also "Labels" below) is quite complex, but does something simple:
+ on a botch, the value will be 0
+ on a critical, the value will also be 0. You will use the <span style="color:#DAA520">Critical</span> button to roll a critical die
+ Otherwise, the result is just whatever was rolled

#### Botch
When you botch, the formula for a stress dice yields a value of 0 (though other modifiers will apply). This can be easily seen, as the result will be bright red, and you must then roll botch dice. Click on <span style="color:#ee3f2f">Botch</span> right to the tabs on top of the sheet, to roll your botch dice.

In the configuration section (above this documentation), you will find a setting for how you want to roll you botch die:
+ on "separated", all botch die will be displayed separatly in the chat, and you choose the number of botch dice with a dropdown menu (limited to 12 botch dice)
+ on "grouped", only the total number of botch will be displayed (i.e. the number of 1s rolled). You enter the number of botch dice as a number. You can still see the individual rolls by hovering on the result

When you do botch, the output will be coloured bright red. Note that there is no ambiguity between the settings:
+ if you see multiple number, the rolls were separated. Botch (natural 1s) will be highlitghed in red
+ if you see a single red number, it is the number of botch dice you rolled. This is true whatever your setting:
    + on "separated", you rolled a single die and got a 1
    + on "grouped", you rolled multiple dice and got a single 1
+ if you see a single number but it is not red, then you have not botched
    + if you have a 0, you are on grouped mode
    + if you have anything else, you are on separated mode, and rolled a single die

#### Critical
When you roll a natural 1 on a stress die, this is a critical roll. The result will be displayed in bright <span style="color:#DAA520">gold</span> colour. In that case, click on the <span style="color:#DAA520">Critical</span> button right to the tabs, and input the total that was displayed (there is no need to substract 1, the stress die formula is already correct). The button will then roll a dice that explodes on 1s, and output the final result in chat. It correclty takes into account that you already rolled a 1.

As the exploding rolls of Ars Magica are quite hard to handle too, there is a few caveat in this formula, if you use 3D dice in roll20: the last rolled die is rerolled, so *the last result you see on screen is wrong*.

The formula has to split the roll in two parts:
+ the first computes the number of 1s you rolled (and for each 1, multiplies the final roll by 2, as in the Ars Magica rules) but then "forgets" (cannot access) the last result (which is not 1).
+ it then rerolls the last result: a weird dice that takes values from 2 to 10, since the last result can't be 1 (or it wouldn't be the last)

This might sound weird, but this yields exactly the same results (that is, you have the exact same chance to roll a given number) than what the Ars Magica 5 rules say. The problem is only visual.

Other than that display problem, the formula is correct: it does takes into account that you already rolled a 1 before clicking on the "Critical" button, and the previous total is also correct. No need to substract 1, or multiply by two, just copy-paste your previous result and read the final total in the chat.


#### Inline Labels
When you roll from the sheet, the rolltemplate displayed in the chat will provide some values that went into the roll. You can also hover on the final result to see all the values that were added. The values are labelled so that you know where that 5 comes from.

### Roll Template
This is the list of available roll template and what value they support

To complete