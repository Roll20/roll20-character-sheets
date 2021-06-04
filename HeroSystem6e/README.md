# HeroSystem 6e
Character sheet for the HeroSystem 6th edition (also known as Champions years ago).

*	[Overview](#overview)
	*	[What this Character Sheet is Not](#whatitsnot)
	*	[API Scripts](#apiscripts)
*	[Usage](#usage)
	*	[Edit Mode](#editmode)
*	[Pages](#pages)
	*	[Core](#core)
	*	[Combat](#combat)
	*	[Powers](#powers)
	*	[Skills](#skills)
*	[Adding Powers](#addingpowers)
	*	[Special Cases](#specialcases)
*	[Buttons](#buttons)
*	[Sample Usage](#sample)



## <a id="overview">Overview</a>

This character sheet attempts to automate the complexity of the HeroSystem 6e.  Creating characters in HeroSystem takes a lot of time, and playing the game can also include tedious calculations and dice counting.  As with any Roll20 character sheet, this sheet attempts to make playing the game easier by handling those cumbersome tasks and allowing the player to focus on just playing the game.

### <a id="whatitsnot">What this Character Sheet is Not</a>

This character sheet is *not* for use in designing a character--it is only for playing the game.  As such, power costs are only used when they are pertinent to calculating an effect.  You should design your character outside of this sheet.  Use paper and pencil, or one of many downloadable Excel spreadsheet, or the best option I would recommend is the official HeroDesigner application available from the game manufacturer.

### <a id="apiscripts">API Scripts</a>

	Quick note: you do NOT need the api scripts to use this sheet,
    but I would recommend them because they add two very useful features.

I would recommend using both the [HeroSystem6e](https://github.com/Roll20/roll20-api-scripts/tree/master/HeroSystem6e) and [Hero6Tracker](https://github.com/Roll20/roll20-api-scripts/tree/master/HeroTracker) api scripts.  The former, HeroGames6e api, was written to work with this character sheet.  The main functions it provides are to count the amount of BODY done with a normal attack, and to compute the DCV you would hit with an attack roll.  While this script is not absolutely necessary to use this character sheet, you would be losing two features that minimize the cumbersome task of dice counting and adding up of bonuses.

The second script, HeroTracker, is not directly integrated with this character sheet.  However, it is very useful in managing the Roll20 initiative tracker.

You can add the two api's within a game's settings by selecting Settings / API Scripts.  Alternately, you can download and add them as custom scripts.  If you choose to do the latter, the scripts can be found here:

##### [HeroSystem6e](https://github.com/Roll20/roll20-api-scripts/tree/master/HeroSystem6e)
##### [Hero6Tracker](https://github.com/Roll20/roll20-api-scripts/tree/master/HeroTracker)

## <a id="usage">Usage</a>

The character is divided into six pages: Core, Combat, Powers, Skills, Background, and Configuration.  Switching between pages is accomplished via tabs located between the header and the page content.  The configuration tab uses a gear as an icon instead of a text label.  In this Usage section, I will not describe obvious features of the character sheet, such as the hit location chart.  That section just displays information that you should already know if you play HeroSystem games.  Instead, I will concentrate on describing those section that contain die rolls or other interactive features of the character sheet.

#### <a id="editmode">Edit Mode</a>

The character sheet has two modes:  Play Mode and Edit Mode.  You can switch between modes by clicking the "edit" button located in line with the page tab buttons.

In Play Mode, most fields are display only and roll buttons are active.  The status fields (STUN/BODY/END) display the character's current values and can be used to modify the current values.

In Edit Mode, user-modifiable fields are unlocked and most roll buttons are deactivated.  The status fields (STUN/BODY/END) are also locked and change to display the max values.

## <a id="pages">Pages</a>

### <a id="core">Core</a>
The Core page contains sections relating to a character's status, defenses, movement, senses, and more.  The general idea is that these are the most common abilities used that are not related to offense.

>#### Characteristics
Element | Description
-|-
STR, DEX, etc. | Very simple.  Enter the character's base characteristics.  Any additional points from the Powers section will automatically be added to the final displayed value.
STR Roll, DEX Roll, etc. | Characteristic die rolls are provided and will be computed based on the computed final values + any levels from Powers. 

>#### Vital Information
Element | Description
-|-
STR END Cost | Pressing this button that expend the indicated amount of endurance. A player should use this button anytime the character uses his/her strength during a phase.
Reduced END on STR | Use this control to set any reduced endurance the character has purchased for STR

>#### Info
Element | Description
-|-
STUN, BODY and END | These fields display the stats' current values.  A player can update the value in one of these fields by overwriting the current value, or by entering an amount to be added or subtracting by prefixing a number with +/-.  So, for example, if you enter -5 into the STUN field, it will lower the current value by 5.
OCV and OMCV | These two fields are buttons that can be clicked to roll a generic attack roll.  Their value is the computed, final value taking into account base characteristic and all combat adjustments from the Combat page.  If you want to know the original OCV or OMCV, refer to the value displayed in the Characteristics section.
Pay END | This button should be pressed at the beginning of each of the character's phases.  It expends END and charges for all active (checked) powers in the Powers & Equipment section.
Recover | This button will add the character's REC to his/her current STUN and END, up to those stat's maximum value.

>#### Charges / Reserves
Element | Description
-|-
Name | Spelling is important!  When a power is flagged as using a reserve, the identified spelling of the name must match.  The comparison is case insensitive.
Refill | When recharging a reserve, this is the amount that will be added.  For example: a reserve has a max of 30, is currently at 12.  If this field is set to 10, the reserve's current level will be set to 22 on a recharge.  If this field is blank, the reserve's current level will be set to 30 on a recharge.  In most cases, this field will be left blank.
Current | In edit mode, a player can manually set the current level.  In play mode, this field is a button that will expend 1 charge from the reserve.
Max | In edit mode, a player can change the maximum level for the reserve.  In play mode, this field is a button that will refill/recharge the reserve by the amount given in the Refill field.  If the Refill field is blank, the reserve will be set the its maximum level.

>#### Senses
Element | Description
-|-
Inc. | This field will be added to the base roll.  This is essentially the Enhanced Perception power.
Roll | This button will make a Perception roll.

### <a id="combat">Combat</a>
The Combat page attempts to put every modifier to both OCV and DCV in one place.  The idea was to avoid having to switch between pages.  On the paper and pencil HeroSystem character sheet, Combat Skill Levels and Penalty Skill Levels are listed under Skill, Perks, & Talents.  This character sheet gives these two categories of skill levels their own sections.

>#### Attacks & Maneuvers
Element | Description
-|-
[checkbox] | If checked, the modifiers for this maneuver will be applied to the OCV, DCV and Damage Classes of the attack.  This is more useful for character that engage in hand-to-hand combat (bricks, martial artists, etc) than characters whose primary offense is a super power (Blast, Entangle, etc.).  For characters in the latter group, they will probably leave the attack maneuver set to "none".
Phs | Indicates if the maneuver is a zero phase, half phase, or full phase action.  This is informational only--it has no effect on any other fields.
OCV | Sets the modifier to the character's OCV.
DCV | Sets the modifier to the character's DCV.
Dmg | Sets the additional DC's that will be added to the attack's damage.
Effects | Any additional notes for the maneuver.  This is informational only.

>#### Combat Skill Levels
Element | Description
-|-
[checkbox] | If checked, this CSL will be applied to the attack.  There is no mechanism that verifies that a CSL is only applied to a valid attack.  Example: if a character buys +1 OCV with Atomic Blast, he should only check this box when using that attack.  When the character attempt to punch someone, the player would need to uncheck this box.
OCV, DCV, OMCV, DMCV, ½DC | Set what ability the CSL will increase.  If a character has more than one level, he/she will need to add a separate row for each.  Example: if the character has +3 OCV with Atomic Blast, he/she should add three rows, each named +1 OCV with Atomic Blast.  **There is no mechanism that verifies that a CSL is only applied to an ability that is legal for the CSL.  Example: a "Specific" CSL can only be applied to OCV; never DCV or damage.  It is on the player to only ever check the OCV box for a "Specific" CSL**.

>#### Other Modifiers
Element | Description
-|-
OCV, ½OCV, DCV, ½DCV | These fields are used to apply adhoc modifiers that are not otherwise accounted for on the character sheet.  Example:  The GM says that the floor is very slippery and the character is at half DCV.
Velocity | This field is used to compute the modifiers for maneuvers that are based on the character's velocity (Move Through, Move By, etc.).  If the character is not performing a maneuver based on velocity, this field can be left empty.

>#### Combat Modifiers
Element | Description
-|-
Range | This radio button group sets the OCV penalty due to range.  The chart mimics the paper and pencil character sheet and only goes up to 250m.  If your target is beyond this range, you will need to add any additional penalty using the OCV field in the "Other Modifiers" section.
Target | This radio button group is used when the character targets a specific hit location or focus.  It applies the OCV penalty and also set the die roll for hit location.  If your campaign does not use hit locations, just check the "No Hit Location" radio button.

>#### Penalty Skill Levels
Element | Description
-|-
[checkbox] | If checked, this PSL will be applied to reduce OCV penalties.  There is no mechanism that verifies that a PSL is only applied to a valid attack.  Example: if a character buys +1 RMOD with Atomic Blast, he should only check this box when using that attack.  When the character attempts to use his Cosmic Web entangle attack, the player would need to uncheck this box.
RMOD, OCV, DCV | Set what ability to which the PSL will apply.  If a character has more than one level, he/she will need to add a separate row for each.  Example: if the character has +3 RMOD with Atomic Blast, he/she should add three rows, each named +1 RMOD with Atomic Blast.  **There is no mechanism that verifies that a PSL is only applied to an ability that is legal for the PSL.  Example: a PSL bought to reduce ranged penalty (RMOD).  It is on the player to only ever check the RMOD box for a PSL of this type**.

### <a id="powers">Powers</a>
This page details the character's super powers.  Unlike other pages, there is only one section on this page, Powers & Equipment.  This part of the documentation will describe the various fields in this section.  Later in this documentation, I will give instructions on how to set these fields to depict specific powers.

>#### Powers & Equipment
##### Main Row
Element | Description
-|-
[checkbox] | If checked, the power is considered "on".  There are two reasons to check this box.  First is to charge endurance when the Pay END button is pressed.  The second is that any power enhancements will only be applied when the power is on.  So if a power adds +20 PD, that modification will only be applied if the power is checked as on.  An example of typical use would be a Force Field that has to be turned on/off.  Checking this box will turn the Force Field on, charge endurance when the Pay END button is pressed, and add the appropriate defenses.  If a power is persistent and costs no END to use, such as Mental Defense, you can probably just leave this box checked.
Cost | This field is for informational purposes only.  Specifically, it can be useful for characters that have Power Frameworks as it assists in ensuring that the character has the pool's points allocated correctly.
Name | In play mode, this field is a roll button that will "use" the power.  This is almost exclusively used for powers that are attacks.  This will roll an attack and display appropriate damage. It does **NOT** charge END--the player must press this power's END button to expend the endurance for the power.
Description | This is identical to the "Name" button above, except that it will include the entire descriptive text in the generated output.
END | This button deducts END and charges from the character's END and reserves.  This field has some special formatting to identify from where points are deducted.  Normal numbers represent the amount of END that will come off the character's END attribute.  A number in parenthesis represent the amount of END used by STR that will also be deducted from the character's END attribute.  A number in brackets [] is the number of "charges" that will be deducted from a reserve.  It is possible to have all three numbers.  Example, if a character has a power sword that costs the character 2 END to use, +3 END from STR, and also expends a charge from a battery, the END field will display "2(3)[1]".
[gear] | This button opens the power detail section, granting access to additional fields that define and describe the power, detailed here in the rows that follow.

##### Points
Element | Description
-|-
Base |The base points for the power.  This number is used to compute damage and the real cost of a power.
Adv. | The advantage modifier for this power.  Example: If you have an attack with the advantages Armor Piercing (+½) and Reduced END (+¼), you would enter .75 into this field.  This field supports using the up/down arrows to change its value.
Active | The active points for the power.  This field is computed.
Lim. | The limitations for the power.  This number is used to compute the real cost of the power.  This field supports using the up/down arrows to change its value.  Note that limitations are normally described as negative (-½, -1¼, etc), but in testing, a lot of my players forgot to add the minus sign.  So for ease of use the character sheet now allows you to enter the limitations as either positive or negative.  Internally, the sheet will convert positive values to negative.

##### Framework
Element | Description
-|-
Type | Sets the power as either a Power Framework or a Slot of a Power Framework.  This is primarily informational only.  It affects the computation for Real Cost.  If this field is set to be a framework slot, the Real Cost will be formatted using a suffix of "f" or "v" for a Multipower Slot, or enclosed within parenthesis for a VPP Slot.  **Note that a VPP Framework cannot have advantages or disadvantages.  If you have a value other than zero in either the Adv. or Lim. fields for a VPP Framework, the Real Cost will be displayed as "???" to indicate the error**.
Name | This field is for information purposes only.  At some future date, it will be used to validate that a character has not assigned more active points to a framework than are allowed.

##### Endurance
	A quick note about how endurance cost is calculated.  Normal endurance cost is 1 per 10 active points of the
    power.  If a power has 40 base points and a .5 advantage modifier, the active points will be 60 and the
    endurance cost 6.  However, by rule, the advantage "Reduced Endurance" is not factored in to the active
    points.  So if you had a power with 40 active points and a .5 advantage modifier that consisted of Invisible
    Power Effects (+¼) and Reduced Endurance (+¼), the active points would be displayed as 60, however the
    endurance cost would only be based on 50 (40 base points +¼ for the IPE).  This adjustment is taken into
    account if you select "0 END" or "½ END" from the Cost X field.  Also note that since choosing "½ END"
    requires at least a .25 advantage, and "0 END" requires at least a .5 advantage, if your advantage modifier
    is set below the required level the real cost of the power will be set to "???" to indicate the error.
    
Element | Description
-|-
Cost X | Select END multiplier to be used to calculate the endurance cost for the power.  If you choose "½ END" or "0 END", you must have at least .25 or .5, respectively, in advantages.
Fixed | Defines a fixed amount of END that will be expended when this power is used.  You can have both Cost X and Fixed--the two will be added together.  More likely, though, a power with fixed costs will have "no cost" selected for Cost X.  This will result in a simple fixed number of END points being expended.  This is most commonly used when a power uses charges and is attached to a reserve.
From | Sets from where the points will be expended.  Selecting "End" will deduct endurance points from the END characteristic.  Selecting "Reserve" will deduct the points from the named reserve.  Selecting "Both" will result in special handling--the Cost X calculation will be deducted from the END characteristic, while the Fixed cost amount will be deducted from the named reserve.  If you select "none", the power will not expend any endurance--all the other fields in this section will be ignored.

##### Enhancements
These four fields allow you to make a power raise other abilities.  For instance, if the character wears chainmail armor that add 10 to both PD and Resistant PD, you would add an Enhancement for the abilities PD and rPD and give each a bonus of 10.  Enhancements only add to their designated ability when the power is "On" (see [checkbox] under Main Row above).
Element | Description
-|-
Ability | The ability that will be increased.
Bonus | The amount the ability will be increased.

##### Attack
	A quick note about the displayed effect dice.  There can be a discrepancy between the Total Dice and if
    you add up the dice yourself because of the way half dice are calculated.  For example, a Hand Killing
    Attack costs 15pts per full 1d6.  A half die costs 10pts, and +1 pip costs 5pts.  Now consider that you
    have bought a ½d6 HKA for 10pts.  The attack gets to add STR for +½d6 (10 STR).  And the character gets
    another +½d6 because he has 2 HTH levels (10 active points).  You will see three fields, each displaying
    ½d6, which would appear to total 1½d6, but this is not accurate.  The active points total is 30 (10 for
    the HKA, +10 for STR, +10 for the HTH levels).  30 active points yields 2d6 of damage dice, not 1½d6.
    If you want to accurately check the calculation, convert the dice to active points, total that, and then
    convert back to dice.  You should end up with the same as the Total Dice field.

Element | Description
-|-
[checkbox] | If this box is checked, the Attack fields will be enabled, and the power will generate an "Attack" when used.  An "Attack" in this context means the power will roll dice to determine its effects.  For a true attack, the effect is damage.  For other abilities, such as Healing, the effect is not damage.  At least one power, Luck, does not generate an attack roll... it only generates effect dice.
Base |This display-only field shows how many dice of effect are derived from the power's base points.
Str | This display-only field shows how many dice of effect are derived from the amount of STR used along with the power.
Man. | This display-only field shows how many dice of effect are derived from the maneuver the character is using.
CSL | This display-only field shows how many dice of effect are derived from any DC's added from CSL's.
Extra | This display-only field shows how many dice of effect are derived from the "Extra Pts/Dice" field.
Total Dice | This display-only field shows the total dice for the attack--the sum of the previous 5 fields.
Wizard | The wizard is a drop down that will set the various fields within the Attack section for preset powers. For example, if you select Blast from the Wizard drop down, the CV will be set to "OCV", Type will be set to "STUN & BODY", Cost/Die will be set to 5, and the Hit Loc. checkbox will be "checked".  This field makes it easier to set up an attack rather than filling in all the fields manually.  Using the wizard does not prevent you from changing individual fields to match a particular attack.  Example, for a typical NND attack, select Blast from the wizard and then change the "Type" to STUN.
CV | Select the Combat Value that is used for this attack.  Most powers use OCV.  Mental powers use OMCV.  Luck uses "none".  Be aware that most powers, even beneficial ones such as Healing, use an attack roll.
Type | This field defines the damage type for the attack.  Most attacks do "STUN & BODY".  Some attack types such as NND attacks only do "STUN" only damage.  If the Type is set to "BODY", the full dice will be counted as body damage (such as Killing Attacks).  If the Type is set to "BODY only" then damage is rolled normally and BODY Effect" is used as a catch all for many powers that do not do direct damage, such as Mind Control.  This is essentially just re-labeled STUN damage. The Type "Luck" follows the rules for the Luck power, counting 1 luck point for every "6" rolled on the effect dice.
Cost/Die | This field defines how much 1d6 of effect costs.  Example, if the power has 40 base points, and the Cost/Die is set to 5, the result will be 8d6 of effect.  There are two formats for effect dice when the Cost/Die is 15.  By rule, 15pts would result in a full 1d6.  10pts can either be ½d6 or 1d6-1, player's choice.  As such, there are two entries for 15 points:  15 (½d6) and 15 (1d6-1).
STR | If this box is checked, the character's STR will be added as base points to the attack.  This is normally used for melee weapons.
Min. | This field sets a minimum STR that is needed to wield a weapon.  Only STR above the minimum will be added to the base points of an attack.  **By rule, if a character does not have enough STR to wield a weapon, he/she is supposed to suffer a penalty to their OCV.  This character sheet does not implement that rule.  You will need to add any OCV penalty using the OCV field of the "Other Modifiers" section**.
Killing | If this box is checked, the attack is flagged as a killing attack.  This changes the STUN and BODY multipliers displayed for hit locations.  It has no other effect.
Hit Loc. | If this box is checked, the attack will also roll for the hit location struck.
Extra Dice | This field is added to the effect without adjustment from Advantages.  This field can be entered as either a whole number, representing base points, or as a dice representation (1d6, 2d6, etc).  The former will be added to the calculation that generates the Total Dice, while the later will just be appended to the Total Dice as static text.  Example, if you have a simple 30pt attack that generates Total Dice of 6d6, and you enter "10" into this field, the Total Dice will increase to 8d6.  Alternately, you could enter "2d6" into this field and the total Dice will change to 6d6+(2d6).
Custom Dice | If you enter anything into this field, the entire damage calculation will be discarded and replaced with the contents of this field.

##### Other
Element | Description
-|-
Activation | If a value is selected for this field, a 3d6 "activation" roll will be added when the power is used.
Additional Actions | The contents of this field will be added to the attack roll as a separate chat command.  A typical use of this field would be to add a call to another api.  Example "!setattr --name John --HP\|17"
Custom Action | If you enter anything into this field, the entire roll for the power will be discarded and replaced with the contents of this field.  This is pretty advanced and you better know what you're doing.

### <a id="skills">Skills</a>
This page details the character's skills, perks and talents.

>#### Skills
Element | Description
-|-
Char | The base characteristic for the skill.  Not all skills are based on a characteristic.  Examples include Languages and Everyman Skills.
Inc. | This field will be added to the base roll.
Roll | This button will make the skill roll.

>#### Skill Levels
[checkbox] | If checked, this Skill Level will be applied to all skill rolls.  There is no mechanism that verifies that a Skill Level is only applied to the skills for which it was purchased.  Example: if a character buys +1 with communication skills, he should only check this box when using skills such as Persuasion, Intimidation, Deception, etc.  When the character attempts to use his Stealth skill, the player would need to uncheck this box.

## <a id="addingpowers">Adding Powers</a>

This section of the documentation gives directions for adding basic powers.  The section after this one will give directions for special cases.

1) Enter the base cost of the power in the Base field.
2) If the power has Advantages, enter the total modifier into the Adv. field.  So if a power has Reduced Endurance (+¼) and Armor Piercing (+½), enter .75 into the field.
3) If the power has Limitations, enter the total modifier into the Lim. field.
4) Is the power part of a framework?
	* If YES, set the type (Multipower/VPP, pool or slot) and provide the pool's name.
5) Set the endurance cost for the power
	* If the power does not cost END, set Cost X to "no cost" or just leave it blank.
	* If the power costs normal endurance, set the Cost X to "1x END".
	* If the character has purchased the ½ or 0 Reduced Endurance advantage, set the Cost X to"½ END" or "0 END" respectively.
	* If the character has purchased the Costs Endurance limitation, set the Cost X to either "Costs ½" or "Costs 1x" depending on which limitation was purchased.
	* If the character has purchased the Increased Endurance limitation, set the Cost X to the appropriate multiplier ("Costs 2x", "Costs 3x", etc.).
7) If the power has a fixed END cost (typically for a power that uses charges or a reserve), enter the amount into the Fixed field.
8) Set from where the END cost will come.
	* If the endurance will come from the character's END attribute, set the From field to "END".
    * If the endurance will come from a reserve, set the From field to "Reserve".
    * In some special cases, a power will expend regular endurance from the character's END attribute and will expend charges from a reserve.  For these special cases, set the From field to "Both".
9) If the power expends endurance from a reserve, enter the reserve name into the "Reserve Name" field.  Note that name must exactly match (case insensitive) the reserve name on the Core page, Charges & Reserves section to properly work.
10) If you want the power to expend charges when the Pay END button is pressed, check the Auto checkbox.  If you want the expending of endurance to always be manual, uncheck the Auto checkbox.
11) Select and set any bonuses this power will provide to other abilities.  For example, if the power is +10 Resistant PD, you would set two Abilities.  Set one Ability to PD with a Bonus of 10, and another Ability to rPD also with a Bonus of 10.
12) If this power is an attack (rolls damage or effect dice), check the box to enable the Attack section and then do the following steps:
	* Use the dropdown Wizard to select the power.  This should set all or at least most of the other fields needed for the attack.  The next few steps may be unnecessary if the wizard defaults properly define the power.
	* Set the combat value the attack with use, either OCV or OMCV.
	* Set the damage type for the power (Blast = STUN & BODY, killing attacks = BODY, etc.)
	* Enter the cp cost per die of the attack (Blast = 5pts/d6, killing attacks = 15pts/d6, etc.)
	* If the character's STR adds to the attack damage, check the STR checkbox.
	* If the attack requires a minimum STR (common for weapons that also have the Real Weapon limitation), enter the minimum required STR into the Min. field.
	* If the attack is a killing attack, check the Killing checkbox.
	* If your campaign is using hit locations and the attack will hit specific locations, check the Hit Loc. checkbox.
	* If the attack benefits from any additional adhoc damage (such as HTH levels), enter either the dice (2d6) or the necessary base points (30) that will be added to the damage calculation.
	* If you want to completely replace the damage dice calculation with your own dice, enter that into the Custom Dice field.
13) If the power requires an activation roll, select the appropriate value from the Activation dropdown.
14) If you have any additional actions (this is rare) that you want to add to the power, enter them into the Additional Action field.  This will be sent as a separate chat command when you use the power.
15) If you want to completely replace the entire roll action, enter your own chat command into the Custom Action field.  This will discard everything else.  No automatic attack roll, damage roll, etc.

### <a id="specialcases">Special Cases</a>

Not all powers are straightforward.  The following are instructions on how to create certain powers using the available fields present on the character sheet.

> HTH combat / Martial Arts

* Set the Base points to 0.
* Use the Attack Wizard and select "HTH Attack".  This should automatically do the following:
	* Set the CV to "OCV"
	* Set the type to "STUN & BODY"
	* Set the Cost/Die to "5"
	* Check the STR checkbox
	* Check the Hit Loc. checkbox

This will create a "power" that has 0d6 base damage, but uses the character's full STR for damage; i.e. a standard HTH attack.  	Remember that buying Reduced Endurance on STR is done in the Vital Information section, not on the power.  Add any purchased Martial Arts maneuvers to the Attacks & Maneuvers section on the Combat page.

> HTH or Ranged Damage Classes

* Purchase the Damage Classes by adding the active points to the Extra field of the power's Attack section.  1DC = 5 active points.  So if a character bought 4 HTH DC's, then add 20 into the Extra field of every power that benefits from the HTH DC's.

> Characteristics

* Purchase like a standard power, setting base cost, advantages and limitations.
* Set a Power Enhancement, setting the Ability to the characteristic purchased (ex: STR) and the Bonus to the amount of the increase.

> Density Increase

* Purchase like a standard power, setting base cost, advantages and limitations.
* Add three Power Enhancements.
	* Ability = STR, Bonus = 5 x levels of Density
	* Ability = PD, Bonus = 1 x levels of Density
	* Ability = ED, Bonus = 1 x levels of Density

The -2m knockback and 2x mass are not represented on the character sheet.

> Endurance Reserve or Charges

* Add the reserve in the Charges / Reserves section of the Core page.

> Enhanced Senses

* Purchase like a standard power, setting base cost, advantages and limitations.
* If the sense has a perception roll (most do), add the sense to the Senses section of the Core page.

> Special Defenses (Flash Defense, Mental Defense, Power Defense)

* Purchase like a standard power, setting base cost, advantages and limitations.
* Add a Power Enhancement, setting the Ability to "Flash Defense", "Mental Defense" or "Power Defense" as appropriate, and the Bonus to the amount of defense that was purchased.

> Movement Powers (Flight, Running, Jumping, etc)

* Purchase like a standard power, setting base cost, advantages and limitations.
* Add the movement to the Movement section of the Core page.

> Shrinking

* Purchase like a standard power, setting base cost, advantages and limitations.
* Add a Power Enhancement, setting the Ability to "DCV" and the Bonus to 2 x the levels in Shrinking.

The other effects of shrinking, x½ height, x⅛ mass, +6m knockback and -2 to PER rolls against the character, are not represented on the character sheet.

> NND Attack

* Purchase like a normal attack (Blast, Ranged Killing Attack, etc.).
* For attacks that do STUN & BODY damage, change the Type to STUN.

Attacks that do BODY or BODY only damage cannot be represented with this character sheet.  Leave the damage type as is and just ignore the BODY of any damage roll.

> Requires a Roll

* If the required roll is an Unmodified Roll, then depict the required roll using the Activation field of the power.
* If the required roll is a Skill Roll, then just use the appropriate skill roll in the Skills section whenever you use this power.

> Variable Advantage

There is no native way to depict a variable advantage.  Instead, you will need to duplicate the power as separate entries on the Powers page but with different advantages.  So for example, if the character has Blast with Variable Advantage, add the power as a plain Blast on the Powers page; create another Blast but with Armor Piercing; create another Blast with Affects Desolidified; etc.  It would be best to predefine your most common versions as to not slow play during a game.

> Growth and other powers that have more than 4 ability bonuses

If you have a single power that has more than 4 ability bonuses (such as Growth), you will need to add multiple powers to properly depict it.  Here are two examples

**Growth (size Large)**

    Add one power with the following Ability/Bonuses:
    * STR +15
    * CON +5
    * PRE +5

    Add a second power with the following Ability/Bonuses:
    * PD +3
    * ED +3
    * BODY +3
    * STUN +6

    Add the increased running (+12m) in the Movement section of the Core page.

**Bullet Proof Vest**

A bullet proof vest adds PD, rPD, ED and rED but only to specific locations.  Since each power can only have four Ability increases, you have to make multiple powers to properly depict a bullet proof vest.

    Add one power with the following Ability/Bonuses:
    * PD Chest +6
    * rPD Chest +6
    * ED Chest +6
    * rED Chest +6

    Add a second power with the following Ability/Bonuses:
    * PD Stomach +6
    * rPD Stomach +6
    * ED Stomach +6
    * rED Stomach +6

    Add a third power with the following Ability/Bonuses:
    * PD Vitals +6
    * rPD Vitals +6
    * ED Vitals +6
    * rED Vitals +6

> Linked Attack

An attack that links two different power types cannot be depicted as a single power.  Instead, create the two powers separately.  The first power will be created normally.  Any additional powers should have their CV set to "none" and uncheck the Hit Loc. checkbox.  The following is an example.

**Pepper Spray**

Pepper spray combines two different attacks, a 5d6 NND Flash and a 3d6 NND Blast.  Create it as follows:

		Add one power with the Pepper Spray's 5d6 NND Sight Group Flash.  As per any other attack, give this
        power an attack roll (CV=OCV).  This particular attack does not use hit locations, so uncheck the
        Hit Loc. checkbox.  Set up a reserve with 12 charges.  This power will use 1 charge when used.
        
        Create a second power for the Pepper Spray's 3d6 NND Blast.  Set the CV to "none" so that it doesn't
        generate an attack roll.  Again, uncheck the Hit Loc. checkbox.  Do not set a reserve.
        
To use this attack, "use" both powers.  The first power will generate the attack roll and expend the charge.  The second power only needs to be used if the first power succeeds in hitting the target.

## <a id="buttons">Buttons</a>

The following buttons are available to make game playing easier

Page | Section | Button | Description
-|-|-|-
(Info) | | Pay END | Pressing this button will expend END and reserves for every power that is "on" and also has the "Auto" button checked within the power's detail.  It is intended that at the beginning of a character's phase, the player will set all powers that will be on or off (zero phase action) and then press this button to expend the resources.
(Info) | |Recover | Pressing this button will increase the character's current STUN and END by the character's REC value.
(info) | | OCV, OMCV | Pressing these buttons will roll a simple attack roll.
Core | Characteristics | Roll | These buttons make an attribute roll for the associated attribute (STR, DEX, etc).
Core | Vital Information | STR END Cost | Pressing this button will expend END for STR.  This button is used when the character uses his STR for something other than an attack.
Core | Charges / Reserves | Current | Pressing this button will expend 1 charge.
Core | Charges / Reserves | Max | Pressing this button will refill the reserve.
Core | Senses | Perception Roll | Pressing this button makes a generic Perception roll.
Core | Senses | Enhanced Senses Roll | Pressing this button makes a roll with the indicated sense.
Combat | Combat Modifiers | Hit Location | Pressing on a hit location die roll will roll the indicated dice and determine the location hit.
Powers | Powers & Equipment | Name | Pressing a power's name will "use" that power.  If the power is not an attack, it will just display the power's name.  If the power is an attack, it will do a full attack roll including damage dice, hit location, etc. as determine by the power's design.
Powers | Powers & Equipment | Description | Same as "Name" above except that the power's description text will be included in the die roll.
Powers | Powers & Equipment | END | Expends the resources for the power.
Skills | Skills | Roll | Pressing this button makes the indicated skill roll.

## <a id="sample">Sample Usage</a>

I would recommend that when setting up your powers, check the "Auto" box for powers that will be "on" during combat.  Powers such as Force Fields, Movement, etc.  Basically, anything that will cost END except attacks.  For most attacks, I would NOT recommend checking that box.  I would manually expend END when I use the attack (see below).  An exception to that is if the power is a constant, such as a character that has a fire shield.  In that case, check the "Auto" box.  You will NOT expend END manually whenever the power is triggered by someone touching the character.

* At the beginning of the character's phase, set all powers that will on or off (these are normally zero phase actions).
* Press the Pay END button.  This will expend the resources for all powers that are "on".
* Do the character's movement.
* If the character is going to perform an attack, select any appropriate maneuver, set the range, and choose a target if appropriate.  If there are any adhoc combat modifiers, add those in the "Other Modifiers" section.
* Press the END button for the power you're about to use (if the power is constant and you already paid the END at the start of these steps, do not manually expend the END again).
* Use the power by pressing the power's name.  The output should appear in the chat windows.

I'll repeat this in the briefest of words:  Set powers on/off, Pay END, move, make your combat choices, use the power.
