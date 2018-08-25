# Character sheet for Vampire The Maquerade, 5th Edition (v1.0)

## User Guide (Please read)

While this sheet is designed to be as intuitive as possible and to aid in stream lining your game there are several key features which are worth being aware of.

1. Custom fonts. While the sheet as default fonts it is also programmed to use custom fonts. If you want access to them, when in your game click the shield icon in the right of your address bar and select to allow the script.
2. Inline vs API rolling. If your ST is a Roll20 Pro-account holder they should have access to the API script, in this case we highly recommend you ensure the check box at the top of each character sheet (just below the tabs) is checked. This will unlock a number of different features including banners, re-rolls, custom dice displayed that will make you gaming experience a lot more streamlined. Unfortunately this functionality cannot be ported to Inline rolling due to programmatic restraints.

Notes on Inline rolls.
1. Many of the buttons on the sheet will do much of the rolling for you, either calculating how many dice you need or aiding you with selection. In cases where Hunger dice are used (Attribute, Ability, Discipline rolls). If you dice pool is 3, but your hunger is 4, then 4 hunger dice will be rolled and the number of successes may be misleading. By hovering your mouse over the number of successes you can determine what dice rolls were made and you can take the first 3. This is not an issue for the API rolls.
2. To find out exactly what dice have been rolled, hover the mouse over the number of successes. In rolls where the Hunger dice are used (Attribute, Ability, Discipline rolls) if you fail, check to see if you rolled a 1 on the Hunger dice. If this is the case then consult the rules to determine how to proceed (Page 207, 208). Further, in this case the number of vampire dice will be negative, please ignore this.
3. If the number on number of successes is green, you may have rolled a critical success. Hover the mouse over and count how many 10's a rolled to determine if you rolled a critical (Page 120) or a messy critical success (Page 206, 207). Please note, the extra 2 successes for a Crit are not automatically added.


Notes on API rolls
1. The number of hunger dice is correctly calculated. Thus a  dice pool of 3 while you have 4 hunger will only roll 3 dice.
2. The dice rolled are already displayed. For standard rolls banners will display if your roll is a Crit (Page 120), Messy Crit (Page 206, 207), Zero successes (This is the Miss/Fail banner) (Page 122).
3. In the event you roll a 1 on a Hunger dice The Beast Banner will appear. This is a warning. If the ST says you did not make the required number of successes then consult the rules to determine what happens (Page 207, 208).
4. In the event your dicepool should be zero you will be given one dice to roll. A banner stating "Last Resort" will occur, while this has no offical rules ST's may like to implement custom rules if players decide to try their luck.
5. Willpower rolls are determined by the number of full checkboxes (damaged ones do not count) 
6. Remorse is calculated automatically based on rules stated on Page 239.
7. Under each roll is a Reroll button, this will reroll the same roll.

Extra notes:
1. Discipline rolls already account for the bonus due to Blood Potency
2. Currently Frenzy is the only roll that requests a DC, this is because in API mode banner displayed changes depending on if you meet the DC or not. If enough people want it, the request for a DC can be moved to every roll (For API Mode), this has currently been left off as it enables the ST to be more flexible when deciding on difficulty. (Page 219, 240)
3. The Willpower Re-roll button is there to aid you if you want to spend a point of willpower. Please declare how many dice you wish to re-roll before rolling as the API version current rolls 3 dice automatically (the Inline version will ask you how many dice to roll).
4. Mouse over text has been added in some locations and should help clear up some confusions.

### Rolls Section

There are two sections in the Custom Rolls section currently. The top section is for people with access to the API, the bottom is for those with Inline rolling.  This is a great section to store all your individual discipline rolls or any rolls you make often.
There are a couple points to note about this section.  
1. Disciplines can't be referred to in the drop down, so please use the section below where you can enter a value. (This is a coding restraint, I've yet to overcome).
2. Clicking the Hunger checkbox will apply Hunger to your roll
3. Clicking the Blood Potency checkbox will apply Blood Potency according to discipline rules (Page 216)

### Coterie Section

The final button is where you can store all your Coterie information. I highly recommend your ST creates a single character sheet for your Coterie alone and shares it with all players. Here you can note shared backgrounds, merits and flaws, your haven and domain.


## About Us and Thanks

Author: Momtahan K. | UserID: 117780  
Design: Martinez A. | UserID: 143652  
Design Contributor: Obi | UserID: 95940  
Kudos to: Andreas J. (UserID: 1223200), Matt Zaldivar, Brian Shields, Benjamin Bandelow, for their stirling work which provided a basis for this sheet, and espcially to Konrad J. (UserID: 77736), who's Hero Quest Dice Roller has been invaluable. Special thanks to Beta testers Chros G.(326614) and Jordan L.(46186). Many thanks to BigWhoop (UserID: 2124413) for his work on the first version of Obi's sheet. Massive thanks to Barry Snyder (UserID: 399162) for helping us with API-to-Non-API Toggling through explication and use of his code examples.

A very special thank to https://game-icons.net The below icons were used and are licensed under a Creative Commons Attribution 3.0 Unported License. Water fountain icon - by Delapouite under CC BY 3.0 Oppression icon - by Lorc under CC BY 3.0 Prayer icon - by Lorc under CC BY 3.0 Ent Mouth icon - by Lorc under CC BY 3.0 Spattericon - by Lorc under CC BY 3.0 Wolverine claws icon - by Lorc under CC BY 3.0 Half heart icon - by Lorc under CC BY 3.0 Embraced energy iconby Lorc under CC BY 3.0


## Installation instructions.
In the event you only have access to these files and need to do so manually.  

1. Create your new Roll20.
2. Go to Settings -> Game Settings
3. Copy the HTML file in the HTML Layout, the CSS file in the CSS Stlying and the translation.json into the Translation section. Press Save.
4. Go to Settings -> API Settings
5. Click New Script and call it hq.js (any name will do, but its a nice nod to Konrad's work)
6. Copy the contents VTM Dice Mechanics.js in the hq.js window and press save.
7. You are now good to go ^_^!

Notes: 
The Banners folder contains many of the images made (in part) by Martinez A. with use of the sterling work available at https://game-icons.net  (See Kudos)

Please note this is version 1.0, a set of updates are in progress.

## Bugs and Updates

If you think anything is missing or you see any bugs, please message me via my [Roll20 Account](https://app.roll20.net/users/117780/ Roll20 Account)