# Hero System 6e Heroic
A Hero System 6th Edition character sheet for Roll20

This character sheet is designed for use in heroic-level Hero System games such as Fantasy Hero or Star Hero. Characters in these games tend to have many skills, few powers, and employ weapons that generally do killing damage and are purchased with in-game money rather than character points. The overall aim of this character sheet is to make playing Heroic-level games in Hero System as easy as possible. This sheet attempts to handle the basic bookkeeping math for characteristics, skills, powers, and complications. However, no skill names, power names, power descriptions, advantages, or limitations are included, except for the six skill enhancers, overall levels, and endurance-related choices, which are required for the internal math. Please refer to official Hero System rules publications or the official helper software Hero Designer for this information (https://www.herogames.com).

The number of skills (30 general, 7 combat, 6 maneuvers, and 9 languages) and powers (10) is hard-coded to handle the background math and for aesthetics, but should be sufficient for general use.

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

# <a id="buttons">Buttons and the Tally Bar</a>
Roll buttons are color-coded:

![Orange Button](/HeroSystem6eHeroic/images/OrangeButton.png) Orange buttons are for skill checks and characteristic rolls.

![Blue Button](/HeroSystem6eHeroic/images/BlueButton.png) Blue buttons are for armor activation rolls.

![Red Button](/HeroSystem6eHeroic/images/RedButton.png) Red buttons are weapon attacks. They can do killing or normal damage.

![Brown Button](/HeroSystem6eHeroic/images/BrownButton.png) The brown button is for shield attacks. They can do killing or normal damage.

![Green Button](/HeroSystem6eHeroic/images/GreenButton.png) Green buttons are for normal damage attacks.

![Purple Button](/HeroSystem6eHeroic/images/PurpleButton.png) Purple buttons are for powers.

![Gray Button](/HeroSystem6eHeroic/images/GrayButton.png) Gray buttons send description text to chat.

## The Tally Bar

![Tally Bar](/HeroSystem6eHeroic/images/TallyBar.png)

At the bottom of the character sheet you will find the Tally Bar. The Total field represents points spent on characteristics, skills, and powers minus complications and bonus points. The latter represent free items in a campaign that shouldn't count against your starting point total, but nonetheless should be accounted for.

Note that the total points may not update immediately. You may force an update by clicking on any other item on the character sheet.

# <a id="page-1">Page 1: Characteristics</a>

![Page 1](/HeroSystem6eHeroic/images/screenshot-01-scaled.png)

The first page displays characteristics, combat abilities, and movement abilities. Note that if your campaign does not use characteristic maximums (doubling points on abilities above these maximums) remember to uncheck this option on the Options Page.

The first page also includes a portrait section designed as a slideshow. The first shown is a "rule card" that is by default a welcome message. The second is the player's avatar image that can be assigned via the Character's "Bio and Info" tab (250 by 250 pixels). The third is a sticky note for text.

## Health Status Indicator

![Health Status Indicator](/HeroSystem6eHeroic/images/HealthStatus.png)

In the upper right corner of Page 1 and Page 2 is a health status indicator. The BODY field is an independent field and not linked to your character's maximum BODY value. The STUN and END fields are linked to your maximum STUN and Endurance. The Reset button will set these two status fields to your maximum values. The Recover button will add one recovery step to STUN and END, up to your characteristic values.

## Turn Segments and Initiative

![Turn Segments](/HeroSystem6eHeroic/images/TurnSegments.png)

A combat turn in Hero is divided into twelve 1-second segments. A character's speed determines the segments or *phases* it may act. These are inicated in hot pink squares shown below the character portrait. The "Tracker" button sends the character's Dexterity value to the Turn Tracker for a selected token.

## Perception

![Perception Rolls](/HeroSystem6eHeroic/images/PerceptionRolls.png)

The default roll for Perception is equal to the character's Intelligence Roll. Perception can be improved via the power *Enhanced Senses*, which can come in the form of a spell, racial bonus, technical aid, magical item, and so forth. Perception might even be reduced via a physical complication. Furthermore, the perception of individual senses can vary. This character sheet provides space for four different perception values, starting with the base value, and adding vision, hearing, and smell. The individual senses are only labels and can be changed to radar, infra-red vision, sonar, or what have you. The modifier for the base level perception applies to all other perception rolls. Since perception roll modifiers can come form many sources you will need to account for character points spent on them elsewhere.

# <a id="page-2">Page 2: Gear and Maneuvers</a>

![Page 2](/HeroSystem6eHeroic/images/screenshot-02-scaled.png)

The Gear page provides space for most of a character's physical goods (weapons, armor, and equipment) as well as a list of common and marital combat maneuvers.

Along the top is an accounting of your carried weight and DCV and movement penalties. The Endurance cost should be accounted for manually by deducting points from the character's health status at the end of each turn. Each value is read-only except "DCV Modifier." Use this field to account for skill levels or items that might reduce or enhance your DCV (see the note on current DCV in the token section below).

![Encumbrance](/HeroSystem6eHeroic/images/encumbrance.png)

The sheet includes space for four suits or pieces of armor. Although this sheet is designed for the simpler armor activation system, there is a field for hit locations if your GM chooses to use that system. 

![Armor Table](/HeroSystem6eHeroic/images/armor.png)

Click the "Roll" button to roll armor activation. The message like the one shown below will be sent to the chat window. 

![Armor Activation Chat Message](/HeroSystem6eHeroic/images/BlueButtonChat.png)

Hero System weapons generally do killing damage or normal damage (e.g., a club or staff). Check the "N" box next to a weapon's damage dice to mark it as doing normal damage. In order to calculate the correct endurance expended, the STR field refers to the strength used, not the minimum strength required for the weapon. The "AoE" checkbox indicates an Area of Effect weapon.

![Weapons Table](/HeroSystem6eHeroic/images/weapons.png)

When a weapon attack roll button is pressed, a dialog box will first ask for combat bonuses or penalties, then a chat window will show the character's name, attack roll made, hit location (optional), and the BODY and STUN damage results. Attacking with a shield is similar to attacking with a weapon except that the DCV bonus for defense is an OCV penalty for attacks. Shields usually do normal damage, but in some cases can do killing damage (e.g., spiked shields). The shield attack button is brown to set it apart from other weapon attacks.

An attack doing killing damage appears in chat with a red heading. The damage dice determine the BODY damage done. The STUN damage is determined from BODY damage times the total STUN multiple. 

![Killing Attack Chat Message](/HeroSystem6eHeroic/images/RedButtonChat.png)

An attack doing normal damage appears in chat with a green heading. The weapon's damage dice determine STUN and BODY is calculated from the Hero formula: 1 pip is 0 BODY, 2-5 pips are 1 BODY, and 6 is 2 BODY damage. The weapon's STUNx modifier is ignored. Note that a d3 result of "3" does 1 BODY and a "2" has a 50% chance to contribute 1 BODY damage as well. In the example below, the 1d3 damage added to the bo staff (here 5d6+1d3), contributed 1 BODY and 2 STUN.

![Normal Attack Chat Message](/HeroSystem6eHeroic/images/GreenButtonChatRoll.png)

The basic maneuvers list is contained in a slideshow so that it can be hidden by players familiar with these rules. A second pane allows for the addition of purchased martial maneuvers (shown below). The third pane contains hit location tables and targeting options. A fourth pane can be used for notes and treasures.

![Martial Manuevers](/HeroSystem6eHeroic/images/martialManeuvers.png)

Basic information about a martial maneuver can be shared in the chat window via the 'show' buttons.

![Martial Manuevers](/HeroSystem6eHeroic/images/martialManeuversChat.png)

*Hit location system (Optional)*

To make a targeted attack select the radio button corresponding to desired focus of your attack. If the target is stunned or otherwise incapacitated check the "1/2 penalty" option. Characters who purchased penalty skill levels may also apply them using the "Apply PSL" input. Any of the attack buttons on the Gear sheet will automatically calculate the character's OCV, determine the hit location, and caculate stun for killing attacks. The attack message will also display post-defense STUN and BODY modifiers. An attack using a weapon marked as "AoE" will not use the hit location system (this allows the hit location system to be applied on a case by case basis).

![Hit Locations](/HeroSystem6eHeroic/images/HitLocationTable.png)

# <a id="page-3">Page 3: Skills</a>

![Page 3](/HeroSystem6eHeroic/images/screenshot-03-scaled.png)

Characters in Heroic campaigns can have a lot of skills. On the left side of this page is room for 30 skills. The base skill chance is determined from the type of skill selected and the number of points spent. Skills 1, 5, 11, 15, 21, and 25 also include an additional skill type "Group" in their selection menus (indicated by ![Salmon Triangle](/HeroSystem6eHeroic/images/selectionGroup.png) instead of ![Olive Triangle](/HeroSystem6eHeroic/images/selectionStandard.png)). When this skill type is selected, every three points spent will apply a group level to the next three skills listed below the group skill. For example, in the image below, the first skill, "Spacecraft Officer," is a regular skill of type "PS" or "Professional Skill." The fifth skill, "Pilot Skill Group," is a group skill level that applies +1 to the skill rolls of Combat Pilot, Systems Operation, and Sensors Operation.

![Group Skill Levels](/HeroSystem6eHeroic/images/GroupSkillLevels.png)

There is space for up to nine languages. Any language skill selected with "Native" fluency costs 0 CP, except for those campaigns where literacy costs points (an option on the Options Page).

Skill Enhancers, when purchased (checked), reduce the cost of relevant knowledge-type skills. The benefit is reflected in the calculated skill rolls as per the number of points spent on each skill. The enhancer does not subtract character points. Note that the Skill Enhancer "Well-Connected" is not considered in the automatic calculation of any skill roll field. Keep this skill enhancer's benefit in mind when you calculate points spent on Perks on Page 5.

# <a id="page-4">Page 4: Powers</a>

![Page 4](/HeroSystem6eHeroic/images/screenshot-04-scaled.png)

The Power page can accommodate ten powers. The left and right sides have different color schemes for organizational purposes, but are otherwise the same. Each power's points and endurance costs are calculated from the base cost provided and advantages and limitations entered. A power framework is treated as its own entry as shown in the figure below. The second power "Ice Bolts" belongs to the Multipower as a Variable Slot. The "AF" in "Reduced AF" refers to *autofire,* which is an advantage chosen for this particular power that increases the cost of Reduced Endurance.

![Multipower](/HeroSystem6eHeroic/images/Multipower.png)

The "Roll" button produces general output that may or may not apply to the power being used. When pressed, Roll20 will make a 3d6 success roll to compare against the given activation roll target, roll an unmodified attack roll of 3d6, roll the dice provided as an effect (which may need to be translated as normal damage), displays the endurance cost, and shows the text box contents as a description. 

![Multipower](/HeroSystem6eHeroic/images/PurpleButtonChat.png)

The endurance cost shown can *optionally* be automatically deducted from the character's health status. However, some powers require additional endurance payments (such as Autofire powers) or endurance costs that must be satisfied every phase (constant powers). Use the "END" button to manually deducts a power's endurance cost.

# <a id="page-5">Page 5: Talents and Complications</a>

![Page 5](/HeroSystem6eHeroic/images/screenshot-05-scaled.png)

The "Perks & Talents" column can be used for Talents, Perks, or any other item that doesn't fit elsewhere. Points spent in this section are counted as Powers in the Tally Bar. Press the "show" button to send the description text to chat.

![Show](/HeroSystem6eHeroic/images/GrayButtonChat.png)

The only trick to the Complications column is to remember that points gained from selecting Complications *subtract* from the total points calculated in the Tally Bar. 

# <a id="page-6">Page 6: Options</a>

![Page 6](/HeroSystem6eHeroic/images/screenshot-06-scaled.png)

The last page of this sheet contains a number of options:

(1) Use Characteristic Maximums. If checked, character point costs are doubled above the standard Hero System maximums.

(2) Literacy Costs Character Points. If checked, literacy costs 1 CP per language selected in the Skills tab. Typical for Fantasy Hero settings but not Star Hero campaigns.

(3) Attack and Power Buttons Apply END Costs. If checked, these buttons will subtract an attack or power's endurance cost once from a character's current END in addition to their normal effects.

(4) Super-heroic Campaign Endurance. If checked, Strength costs 1 END per 5 STR to use rather than 1 END per 10 STR.

(5) Use Hit Location System. Select this option if your GM uses this optional game mechanic. Hit Location Tables and support for attack options appear alongside the maneuvers and treasures panes.

# <a id="tokens">Tokens Settings</a>

![Token](/HeroSystem6eHeroic/images/SampleToken.png)

Roll20 tokens can display numeric values of three attributes as well as three status bars. Let me suggest the attributes *currentDCV,* *currentBODY,* and *currentEND* coupled with their maximum values as shown in the example settings dialog below. The hidden attribute *currentDCV* is presently equal to the character's DCV + Shield DCV Bonus - DCV Weight Penalty + DCV Modifier.

![Token Settings](/HeroSystem6eHeroic/images/TokenSettings.png)

# <a id="tracker">Turn Tracker</a>

We can make the Roll20 Turn Tracker a little more useful by creating a phase indicator using token actions. Make a new character called "Turn Token" or something similar. You can leave it as-is, but I'd suggest giving it a 12 Dexterity. Give it an approprate avatar image such as the clock face below. Drag the avatar to the map to create a token. There I suggest giving the token a Nameplate name such as "Segment."

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

*Villain In Glasses, August 1, 2021. Last updated on September 26, 2021 to reflect changes to weapon attacks being damage-type selectable as well as the option to automatically apply END costs.*
