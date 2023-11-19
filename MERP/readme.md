# MERP Roll20 Character Sheet

Middle Earth Role Playing (MERP) has often been described as a simplified version of **Rolemaster**, the flagship game of Iron Crown Enterprises. It condenses the wealth of options of Rolemaster down to a few professions and spell lists. In similar vein, the massive volume of charts have been truncated in variety and size. 

Despite the simplification, this Roll20 character sheet for MERP contains quite a few automatic calculations and cascading effects. This brief documents is an attempt to shed some light on those. For further details, please consult the rule book and the source code of the sheet.  

This sheet in its organization and content is mostly based on the second U.S. edition from 1986. Currently, the only inclusion of house rules is placeholder for stride modifier as the movement rate would have been difficult to modify without side effects.

### Contributing to the project

This open-source project welcomes contributions. Bear in mind, however, there may be more to MERP than Third Age Eriador. Before making a pull-request to Roll20 master, make sure to leave room for custom choices. 

If you want a completely automatized character sheet with all options integrated as drop-down menus and built-in tables, you could perhaps publish it as its own character sheet. 


## Personal Sheet

The personal information of the character is subdivided into seven subsections.

### Personal 

While all of the fields matter greatly in defining the character, in personal information the fields **profession** and **level** have an impact on automatically calculated skill bonuses: each of the six professions endows special bonuses to skills that are multiplied by the level. As the levels increase (or decrease, if you like) professional bonuses are modified accordingly (the column 'prof.' on the skills sheet). 

In MERP, different **cultures** and/or **races** provide slightly different set of bonuses to stats and resistances, sets of languages, special abilities, as well as adolescent skill points and background options. Due to this variety, the character sheet has not fixed the choices, but rather the racial/cultural abilities have be to filled in by hand.

### Resistances and defenses

The choice of **realm** the character is attuned to determines what kinds of magical spells he or she is able to learn. Bards and mages are essence users while animists and rangers are attuned to channelling. However, the selection of profession does not automatically change the realm. 

There are five different armor types, if no armor at all is considered one. The field **armor worn** affects the movement rate: the corresponding moving maneuver skill is either added or subtracted from movement base rate (i.e., 50 feet/rnd). In addition, the character can protect him/herself with a helmet, arm greaves, and leg greaves that lower slightly perception, offensive bonuses and moving maneuver bonuses, respectively. The perception penalty is shown on skill sheet in column 'spec'. The penalties from greaves are added to the OB and MM penalties in Status section. The use of a shield will improve the defensive bonus by 25.

**Resistance rolls** are similar to saving throws in some other systems. The degrees of resilience against various threats combine stats, racial and miscellaneous bonuses that are automatically added into the rolls made by pressing the corresponding roll-button. 

Finally, there are four buttons generic die rolls: 
* **1d100** is simply 1d100 (plus given modifier). 
* **Open-ended** yields 1d100 roll (plus given modifier) where the dice explode "upwards" with rolls at or above 95 and "downwards" with rolls at or below 5. However, Roll20 does not easily lend itself to downward open-ended rolls. Thus, in case of negative or downward explosion, a separate (open-ended) die roll is shown as "additional underflow" and should be subtracted from the outcome. 
* **Orientation** roll is a sort of perception static maneuver, but checked against moving maneuver table, where the outcome indicates the degree of awareness (due to disorienting action, being knocked down, etc.).
* **Fumble** is a simple 1d100 that may be modified by the difficulty level of the maneuver or type of the critical strike, for instance.

### Appearance

In the appearance section, the only field with a further effect is **weight** (in lbs). It is used to determine the encumbrance penalties. Generally, a heavier person can carry more weight without difficulties than a light person. So, in order to have encumbrance calculation working properly, the character's weight needs to be filled in.

In the future, the **height** (in feet and inches) could be used to determine the stride modifier such that with all other thing being equal a tall person (e.g., a high elf) would have a higher movement rate that a short one (e.g., a hobbit). Though not present in the rule-book, this has been presented as a house rule.

### Status

The status of the character is governed by hit points and various penalties from being disadvantaged, hurt, or encumbered. 
* **Stunned** means the character is unable to attack and can either parry at 50% of the weapons skill or maneuver at -50.
* **Down** means the character cannot attack or parry and suffers an activity penalty of -70. 
* Being **unable to use an arm or a leg** as a result of critical hit, for instance, adds another -30 penalty. 

In addition, critical hits result in more or less temporary **activity penalties** that affect maneuvers and attacks. Losing more than half of one's hit points results in **hit loss penalty** of -20 to offensive bonuses. The **encumbrance penalty** resulting from carried (not worn) burden is automatically countered by the character's strength bonus. The rate of bleeding is merely for book-keeping; no automatic mechanism has been attached to it. 

The three types of actions are affected by various penalties as follows:
1. **Static maneuvers** are modified by **activity penalty**.
1. **Moving maneuvers** are modified by **MM penalty** that equals to the sum of activity penalty, encumbrance penalty and possible leg greaves.
1. **Attacks** are movidified by **OB penalty** that is the sum of activity penalty, hit loss penalty and possible arm greaves penalty.

### Stats

All the stats default to value 50 for a new character. This is only for convenience as empty values would result in unnecessary penalties for NPC:s, creatures and monsters that can use the same underlying sheet attributes (though usually not the actual sheet). 

The upper limit for a stat is 102 and lower limit is 0. The changes in stat values or bonuses cascade automatically through-out the sheet.

### Injuries, Special abilities and languages

These are merely for book-keeping without any automatic mechanisms attached.

## Skills Sheet

The skills section represents the quintessential element of Iron Crown Enterprises' character sheets: a list of skills with arrays of check-boxes and input fields. The check-boxes represent character's advancement in training and expertise of that particular skill. The total skill bonus depends, of course, on a host of other factors, all of which are calculated automatically by the sheet.

The checkboxes need to be checked in order from left to right. Although the first ten boxes each count for a bonus of 5, the first box also negates the default penalty of -25 for being untrained in a skill. The checked boxes are totaled in the field rank bonus that is then added to the total skill bonus. 

Each skill is either an attack (OB), static maneuver (SM), moving maneuver (MM), or special maneuver (SP). There are three special primary skills: body development, ambush and stalk/hide. The first is not really a skill, but a total of hit points. The second is a bonus to critical rolls. The third is special because stalking is a moving maneuver and hiding is a static maneuver. As such, although they have the same skill bonus, different penalties apply to them. The roll template shows results for both. There seems to be no way to refer to the dice roll after it is made, so the two skills are rolled separately, i.e., there is a  roll for stalking maneuver and another for hiding maneuver. 

Similarly to primary skills, a secondary skill can be either static, moving or special maneuver (which means it is both a static and moving maneuver). 

Skill rolls with all the relevant bonuses and penalties baked in can be made by pressing the button in the skill sheet. All rolls show a total outcome with the skill roll modified by all the relevant bonuses. If the initial die roll yields an upward open-ended result, the skill roll shows a green frame. Similarly, if the skill is open-ended downward, the frame is red. Due to technical difficulties, however, the underflow is not automatically added to the roll, but indicated as a separate roll instead. All rolls show applied the total penalty and the total skill bonus at the bottom of the skill roll dialogue box.

In addition to these, attack rolls include two critical rolls just in case should the outcome result in a critical hit. Some weapons yield a secondary critical in addition to the first. Also, the critical failure range is between 1 and 8: depending on the weapon a die roll in this range is a potential fumble. Then, the downward explosion is triggered by initial rolls of 5 or less. To figure out if one, both or neither applies, one needs to check the actual roll by hovering the mouse on top of the roll result.


## Spells Sheet

The power points are a product of base points (a table lookup given the realm and the relevant stat) and possible power point multiplier. 

The spell lists are for book-keeping. The little arrow or triangle can be used to hide the details of a given list, because at a higher level the full list could become unwieldy.

## Equipment Sheet

The items carried by the character add to his or her encumbrance if they are not worn (e.g., an armor). The checking "worn" checkbox excludes the corresponding item from encumbrance. The sheet keeps track of total weight of the equipment as well as total encumbrance which then turns into encumbrance penalty (modified by strength bonus and the weight of the character). 

A character might want to drop his or her backpack before a battle to lower or to eliminate the encumbrance penalty. To this sort of temporary encumbrance change, an item can be dropped by checking the "dropped" checkbox. It is thus excluded from total weight and total encumbrance.

## NPC/Creature

The elaborate character sheet is a poor fit for many of the NPCs and creatures. As a remedy, NPC/Creature tab represents a sheet for the basic information for a non-player character, an animal or a monster. 

## Settings

Currently, there is only the setting for whispering die rolls. You can choose to never whisper your rolls and thus make them always public. Alternatively, you can have the system prompt you for a decision for each roll. There is also the option for always whispering the rolls thus sharing die rolls with only the GM.
