# Hero System 6e Heroic
A Hero System 6th Edition character sheet for Roll20

This character sheet is designed for use in heroic-level Hero System games such as Fantasy Hero or Star Hero. Characters in these games tend to have many skills, few powers, and employ weapons that generally do killing damage and are purchased with in-game money rather than character points. The overall aim of this character sheet is to make playing Heroic-level games in Hero System as easy as possible. This sheet attempts to handle the basic bookkeeping math for characteristics, skills, powers, and complications. However, no skill names, power names, power descriptions, advantages, or limitations are included, except for the six skill enhancers, overall levels, and endurance-related choices, which are required for the internal math. Please refer to official Hero System rules publications or the official helper software Hero Designer for this information (https://www.herogames.com).

The number of skills (30 general skills, 7 combat skills, 9 maneuvers, and 9 languages) and powers (20) is hard-coded to handle the background math and for aesthetics, but should be sufficient for general use.

This sheet has support for either armor activation rolls or the optional hit location system (see Options). The choice to use one or the other system is a GM campaign-level decision.

If you would like more flexibility in creating macros and have a Pro-level subscription you might consider adding Hero Roller https://wiki.roll20.net/Script:HeroRoller to your game API settings. This is an optional addition and is not necessary to play the game. 

## Contents

&emsp; [Buttons and The Tally Bar](#buttons)

&emsp; [Page 1: Characteristics](#page-1)

&emsp; [Page 2: Gear and Maneuvers](#page-2)

&emsp; [Page 3: Skills](#page-3)

&emsp; [Page 4: Powers](#page-4)

&emsp; [Page 5: Talents and Complications](#page-5)

&emsp; [Page 6: Options](#page-6)

&emsp; [Token Settings](#tokens)

&emsp; [The Turn Tracker](#tracker)

&emsp; [Mod Support](#mods)

# <a id="buttons">Buttons and the Tally Bar</a>
Roll buttons are color-coded:

![Orange Button](/HeroSystem6eHeroic/images/OrangeButton.png) Orange buttons are for skill checks and characteristic rolls.

![Blue Button](/HeroSystem6eHeroic/images/BlueButton.png) Blue buttons are for armor activation rolls.

![Red Button](/HeroSystem6eHeroic/images/RedButton.png) Red buttons are for killing damage attacks.

![Green Button](/HeroSystem6eHeroic/images/GreenButton.png) Green buttons are for normal damage attacks.

![Light Blue Button](/HeroSystem6eHeroic/images/LightBlueButton.png) Light blue buttons are for blocks and shield attacks.

![Purple Button](/HeroSystem6eHeroic/images/PurpleButton.png) Purple buttons are for powers.

![Gray Button](/HeroSystem6eHeroic/images/GrayButton.png) Gray buttons send description text to chat.

## The Tally Bar

![Tally Bar](/HeroSystem6eHeroic/images/TallyBar.png)

At the bottom of the character sheet you will find the Tally Bar. The Total field represents points spent on characteristics, skills, and powers minus complications and bonus points. The latter represent free items in a campaign that shouldn't count against your starting point total, but nonetheless should be accounted for.

Note that the total points may not update immediately. You may force an update by clicking on any other item on the character sheet.

# <a id="page-1">Page 1: Characteristics</a>

![Page 1](/HeroSystem6eHeroic/images/screenshot-01-scaled.png)

The first page displays characteristics, combat abilities, and movement abilities. Use the "Value" column for purchased abilities and the "Mod" column for abilities granted by powers or other means. HS6eH uses the sum for characteristic, skill, ability, and damage rolls. Note that if your campaign does not use characteristic maximums (doubling points on abilities above these maximums) remember to uncheck this option on the Options Page.

The first page also includes a portrait section designed as a slideshow. The first shown is a "rule card" that is by default a welcome message. The second is the player's avatar image that can be assigned via the Character's "Bio and Info" tab (250 by 250 pixels). The third is a sticky note for text.

## Health Status Indicator

![Health Status Indicator](/HeroSystem6eHeroic/images/HealthStatus.png)

In the upper right corner of Page 1, Page 2, and Page 4 you will find a health status indicator. The STUN and END fields are linked to your maximum STUN and Endurance. Meaning the Reset button will set these two status fields to the character's maximum values. The Recover button will add one recovery step to STUN and END, up to the characteristic maximums. The Recover button will also prompt if you are taking a Post-Segment 12 Recovery, or action. In the case of a Post-Segment 12 Recovery, your END/Turn costs will be subtracted from the recovery.

## Turn Segments and Initiative

![Turn Segments](/HeroSystem6eHeroic/images/TurnSegments.png)

A combat turn in Hero is divided into twelve 1-second segments. A character's speed determines the segments or *phases* it may act. These are indicated in hot pink squares shown below the character portrait. The "Tracker" button sends the character's Dexterity value to the Turn Tracker for a selected token.

## Perception

![Perception Rolls](/HeroSystem6eHeroic/images/PerceptionRolls.png)

The default roll for Perception is equal to the character's Intelligence Roll. Perception can be improved via the power *Enhanced Senses*, which can come in the form of a spell, racial bonus, technical aid, magical item, and so forth. Perception might even be reduced via a physical complication. Furthermore, the perception of individual senses can vary. This character sheet provides space for four different perception values, starting with the base value, and adding vision, hearing, and smell. The individual senses are only labels and can be changed to radar, infra-red vision, sonar, or what have you. The modifier for the base level perception applies to all other perception rolls. Since perception roll modifiers can come form many sources you will need to account for character points spent on them elsewhere.

# <a id="page-2">Page 2: Gear and Maneuvers</a>

![Page 2](/HeroSystem6eHeroic/images/screenshot-02-scaled.png)

The Gear page provides space for most of a character's physical goods (weapons, armor, and equipment) as well as a section of common and marital combat maneuvers.

Along the top is an accounting of your carried weight and DCV and movement penalties. The Endurance cost is accounted for automatically when taking a Post-Segment 12 recovery. Each value is read-only except "DCV Modifier." Use this field to account for skill levels or items that might reduce or enhance your DCV (see the note on current DCV in the token section below).

![Encumbrance](/HeroSystem6eHeroic/images/encumbrance.png)

The sheet includes space for four suits or pieces of armor. If PD/ED are left at 0, then Total Defense will be automatically calculated when you click Roll. Although this sheet is designed for the simpler armor activation approach, there is a field for hit locations if your GM chooses to use that system. 

![Armor Table](/HeroSystem6eHeroic/images/armor.png)

Click the "Roll" button to roll armor activation. A message like the one shown below will be sent to the chat window. If ACT is set to NA, and locations are filled then the second message will appear.

![Armor Activation Chat Message](/HeroSystem6eHeroic/images/BlueButtonChat.png)![Armor Activation Alternate Chat Message](/HeroSystem6eHeroic/images/BlueButtonChat2.png)

The weapons section contains space for five weapons (or spells or abilities with weapon-like action). Most of these fields may simply be entered after referring to equipment tables. The weapon damage "field" is actually a button that brings up the Weapon Worksheet, which prepares a base weapon for a character's use.

![Weapons Table](/HeroSystem6eHeroic/images/weapons.png)

With the Weapon Worksheet open, begin by entering a weapon's base damage (the shield works the same way). HS6eH will attempt to translate entered damage to a valid HERO damage dice string, meaning some combination of xd6, +d3, +1, and -1 for killing damage and xd6 and +d3 for normal damage (if "Normal Damage" is checked). The resulting dice value appears on the right under "Results." Next, set the weapon's minimum strength value and the strength the character actually applies. If strength improves damage, check "DMG Enhanced by STR." Generally one only adds increments of +5 STR over the minimum since +5 STR = + 1 DC (damage class). Using less than a character's maximum strength may mean saving END costs. Note that typically a weapon's damage class can only be doubled via strength and skill enhancements, but this may be overridden with the option "Weapon Damage limited to 2x Base Damage." Combat Skill Levels can increase damage as well at a cost of +2 CSLs = + 1 DC. These may be entered either in the worksheet or, more conveniently for play, adjusted from the Weapons Table.

![Weapon Worksheet](/HeroSystem6eHeroic/images/weaponWorksheet.png)

HERO System 6th Edition considers certain power advantages when determining enhancements to damage (e.g., armor piercing, see 6E2 98-100). HS6eH uses an algorithm that duplicates the *Damage Classes Quick-Reference Tables* found on 6E2 101 plus a best attempt to expand them using the *Expanded Damage Class Tables* available for a small fee separately from Hero Games. The expanded tables were used only as guidance since they do not always agree with the rulebook (and are missing some important common values).

![Killing Attack Chat Message](/HeroSystem6eHeroic/images/RedButtonChat.png)

To use a weapon one may simply press the weapon's Roll button, in which case Roll20 will assume the default attack action "Strike." A dialog box will first ask for combat OCV bonuses or penalties, then a chat window will show the character's name, attack roll made, endurance cost, and a button to further roll damage if the GM determines the attack a success. The damage button will roll hit location (optional) and the BODY and STUN damage results. Shield are treated as weapons except that the DCV bonus for defense is an OCV penalty for attacks.

An attack doing normal damage appears in chat with a green heading. The weapon's damage dice determine STUN and BODY is calculated from the Hero formula: 1 pip is 0 BODY, 2-5 pips are 1 BODY, and 6 is 2 BODY damage. The weapon's STUNx modifier is ignored. Note that a d3 result of "3" does 1 BODY and a "2" has a 50% chance to contribute 1 BODY damage as well. In the example below, the 1d3 damage added to the bo staff (here 5d6+1d3), contributed 1 BODY and 2 STUN.

![Normal Attack Chat Message](/HeroSystem6eHeroic/images/GreenButtonChatRoll.png)![Normal Attack Chat Message Expanded](/HeroSystem6eHeroic/images/GreenButtonChatRoll2.png)

HERO combat provides a number of tactical options via maneuvers and is an important aspect of play. The Standard Maneuvers slide is accessible using the (S) button in the lower right pane that also includes targeting, martial maneuvers, and a text field. Click the name of a desired maneuver to show its action "card." Those that work with weapons will a change the color the weapon's "Roll" button (blue for Block, orange for Disarm, red or green for attacks, and gray when unavailable). Each card also provides a button when unarmed combat is an option.

![Standard Maneuvers](/HeroSystem6eHeroic/images/standardManeuvers.png)

The Martial and Custom Maneuvers slide (M) may be used to enter martial arts skills or create custom weapons or maneuvers that don't fit into the weapon plus Standard Maneuver framework. The damage field does not use the Damage Class system at present and therefore cares less about unusual dice strings if one is needed.

![Martial Manuevers](/HeroSystem6eHeroic/images/martialManeuvers.png)

The attack dialog options follow the choices checked for "N" (normal or killing) and "Block," which declares that the action is a blocking maneuver.

![Martial Manuevers](/HeroSystem6eHeroic/images/martialManeuversChat.png)

Basic information about a martial maneuver can be shared in the chat window via the 'show' buttons.

*Hit location system (Optional)*

To make a targeted attack select the radio button corresponding to desired focus of your attack. If the target is stunned or otherwise incapacitated check the "1/2 penalty" option. Characters who purchased penalty skill levels may also apply them using the "Apply PSL" input. Any of the attack buttons on the Gear sheet will automatically calculate the character's OCV, determine the hit location, and calculate stun for killing attacks. The attack message will also display post-defense STUN and BODY modifiers. An attack using a weapon marked as "AoE" will not use the hit location system (this allows the hit location system to be applied on a case by case basis).

![Hit Locations](/HeroSystem6eHeroic/images/HitLocationTable.png)

# <a id="page-3">Page 3: Skills</a>

![Page 3](/HeroSystem6eHeroic/images/screenshot-03-scaled.png)

Characters in Heroic campaigns can have a lot of skills. On the left side of this page is room for 30 skills. The base skill chance is determined from the type of skill selected and the number of points spent. Skills 1, 5, 11, 15, 21, and 25 also include an additional skill type "Group" in their selection menus (indicated by ![Salmon Triangle](/HeroSystem6eHeroic/images/selectionGroup.png) instead of ![Olive Triangle](/HeroSystem6eHeroic/images/selectionStandard.png)). When this skill type is selected, every three points spent will apply a group level to the next three skills listed below the group skill. For example, in the image below, the first skill, "Spacecraft Officer," is a regular skill of type "PS" or "Professional Skill." The fifth skill, "Pilot Skill Group," is a group skill level that applies +1 to the skill rolls of Combat Pilot, Systems Operation, and Sensors Operation.

![Group Skill Levels](/HeroSystem6eHeroic/images/GroupSkillLevels.png)

There is space for up to nine languages. Any language skill selected with "Native" fluency costs 0 CP, except for those campaigns where literacy costs points (an option on the Options Page).

Skill Enhancers, when purchased (checked), reduce the cost of relevant knowledge-type skills. The benefit is reflected in the calculated skill rolls as per the number of points spent on each skill. The enhancer does not subtract character points. Note that the Skill Enhancer "Well-Connected" is not considered in the automatic calculation of any skill roll field. Keep this skill enhancer's benefit in mind when you calculate points spent on Perks on Page 5.

# <a id="page-4">Page 4: Powers</a>

![Page 4](/HeroSystem6eHeroic/images/screenshot-04-scaled.png)

The Power page can accommodate twenty powers. The top and bottom sections have different color schemes for organizational purposes, but are otherwise the same. A health status bar occupies the upper right corner of the sheet along with a range table and limited selection of standard maneuvers (to be expanded in a future update). Each section displays one power in its fully expanded form, which is activated by clicking on the power's name. The up and down arrow widgets will move the power accordingly, swapping positions with the upper or lower power.

HS6eH calculates a power's character and endurance costs from the base cost provided and advantages and limitations entered. A power framework is treated as its own entry as shown in the figure below. The second power "Ice Bolts" belongs to the Multipower as a Variable Slot. The "AF" in "Reduced AF" refers to *autofire,* which is an advantage chosen for this particular power that increases the cost of Reduced Endurance.

![Multipower](/HeroSystem6eHeroic/images/Multipower.png)

The "Roll" button produces general output that may or may not apply to the power being used. When pressed, Roll20 will make a 3d6 success roll to compare against the given activation roll target, rolls a (potentially modified) attack roll of 3d6, displays the END cost, and optionally shows the power's description. If the power is an attack (as checked) a damage roll also appears. The attack and damage rolls are classified as "power," "killing," "normal," or "mental" as selected on the sheet. In addition to affecting the interpretation of the damage dice, "mental" assumes mental combat.

![Multipower](/HeroSystem6eHeroic/images/PurpleButtonChat.png)

The endurance cost shown can *optionally* be automatically deducted from the character's health status. However, some powers require additional endurance payments (such as Autofire powers) or endurance costs that must be satisfied every phase (constant powers). Use the "END" button to manually deducts a power's endurance cost.

# <a id="page-5">Page 5: Talents and Complications</a>

![Page 5](/HeroSystem6eHeroic/images/screenshot-05-scaled.png)

The "Perks & Talents" section on top can be used for Talents, Perks, or any other item that doesn't fit elsewhere. Points spent in this section are counted as Powers in the Tally Bar. The "Roll" button allows for an activation roll as needed. Press the "show" button to send the description text to chat.

![Show](/HeroSystem6eHeroic/images/GrayButtonChat.png)

The only trick to the Complications section is to remember that points gained from selecting Complications *subtract* from the total points calculated in the Tally Bar.

# <a id="page-6">Page 6: Options</a>

![Page 6](/HeroSystem6eHeroic/images/screenshot-06-scaled.png)

The last page of this sheet contains a number of options:

`Use Characteristic Maximums` 

If checked, character point costs are doubled above the standard Hero System maximums.

`Literacy Costs Character Points` 

If checked, literacy costs 1 CP per language selected in the Skills tab. Typical for Fantasy Hero settings but not Star Hero campaigns.

`Takes No Stun` 

This option is commonly used for automaton-type characters that cannot be stunned and do not use END.

`Untiring` 

Similarly, Untiring is a more limited form of *Takes No STUN* where the character does not pay END costs for strength.

`Attack and Power Buttons Apply END Costs` 

If checked, these buttons will subtract an attack or power's endurance cost once from a character's current END in addition to their normal effects.

`Super-heroic Campaign Endurance` 

If checked, Strength costs 1 END per 5 STR to use rather than 1 END per 10 STR.

`Use Hit Location System` 

Select this option if your GM uses this optional game mechanic. Hit Location Tables and support for attack options appear alongside the maneuvers and treasures panes.

`Weapon Damage Limited to 2x Base Damage` 

Most heroic-level campaigns cap enhanced weapon damages. Uncheck this to remove the cap.

`Choose d6-1 over d3 when Adjusted Damage is ambiguous` 

HERO damage tables often contain a choice between xd6+d3 or (x+1)d6-1. The latter is slightly better on paper, but some players prefer the former.

`Health Reset Buttons also reset Combat Choices` 

When checked a reset also returns maneuver and targeting selections to their default states.

`Show Power Descriptions in Chat` 

Uncheck if you would like to tidy up powers in the chat area.

`Display Degree of Success` 

By default this is checked, showing the amount a roll succeeded or failed by. In the case of attacks it will show the DCV that you are able to hit. Unchecking this will instead show a Base Chance for skills, and the total OCV bonus for attacks, followed by a Roll line that will show the results of 3d6 roll. This doesn't affect anything rules wise, just a preference on how players would want to see the details of their rolls.

`Name-Title Separator` 

Paste a single Unicode character in this text field if you would like a custom dingbat displayed between a character's name and title in Chat. For a list of possible characters, try [Unicode/List of useful symbols](https://en.wikibooks.org/wiki/Unicode/List_of_useful_symbols). Most of the monochrome symbols should work as well as a few of those with color.

`Whisper Rolls to GM` 

This dropdown offers three options: Never, Always, or Prompt. These give the option to send your rolls only to the GM, with prompt offering the option whenever you roll or show an ability.

# <a id="mods">Mod Support</a>

The utility mod HeroSystem6eHeroic_HDImporter (available in the quick install menu) imports characters created in or purchased for [HERO Designer](https://www.herogames.com/store/category/4-hero-system-software/). Please refer to the mod [README](https://github.com/Roll20/roll20-api-scripts/tree/master/HeroSystem6eHeroic_HDImporter) for further information and instructions for use.

# <a id="tokens">Tokens Settings</a>

![Token](/HeroSystem6eHeroic/images/SampleToken.png)

Roll20 tokens can display numeric values of three attributes as well as three status bars. Let me suggest the attributes *currentDCV,* *currentBODY,* and *currentEND* these should automatically be coupled with their maximum values. The hidden attribute *currentDCV* is presently equal to the character's DCV + Shield DCV Bonus - DCV Weight Penalty + DCV Modifier.

![Token Settings](/HeroSystem6eHeroic/images/TokenSettings.png)

# <a id="tracker">Turn Tracker</a>

We can make the Roll20 Turn Tracker a little more useful by creating a phase indicator using token actions. Make a new character called "Turn Token" or something similar. You can leave it as-is, but I'd suggest giving it a 12 Dexterity. Give it an appropriate avatar image such as the clock face below. Drag the avatar to the map to create a token. There I suggest giving the token a Nameplate name such as "Segment."

![Hero Clock Token](/HeroSystem6eHeroic/images/HeroClockToken.png)

Create the following four macros:

*Set-Segment-1*: [[ 1 &{tracker} ]]

*Set-Segment-12*: [[ 12 &{tracker} ]]

*Segment-Plus-1*: [[ 1 &{tracker:+} ]]

*Segment-Minus-1*: [[ 1 &{tracker:-} ]]

Follow the instructions in the wiki on *Linking Tokens To Journals* (https://wiki.roll20.net/Linking_Tokens_to_Journals) to create character abilities for each of these four macros and check them as token actions. You can spice the macros up so that they send flavor text to chat, but at the bare bones level, the new abilities need only look something like this:

![Turn Token Abilities](/HeroSystem6eHeroic/images/TurnTokenAbilities.png)

During play, add the Turn Token to the Turn Tracker using the "Tracker" button on the token's character sheet. The initiative shown for the Turn Token can be used to indicate the current segment, which you can change with the token actions. It might also be handy for other character tokens to have their phases listed in their Nameplate names so that they appear in the Turn Tracker.

![Turn Tracker](/HeroSystem6eHeroic/images/TurnTracker.png)

*First version by Villain In Glasses, August 1, 2021.*
*Last updated by Villain in Glasses on April 28, 2024 to represent the sheet as of version 2.91.*
