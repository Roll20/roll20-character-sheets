Shadowrun 5th Edition Character Sheet
=======================

Version 1 of Shadowrun 5th Edition Character Sheet. This sheet includes an NPC sheet for Grunts, Hosts, Sprites, and Vehicles. Player character pet classes such as spirits, drones, and sprites should use this NPC sheet. 

## General Guidelines

This sheet will work with Firefox but its best suited for Chrome.

### Toggles

* **Public** or **To GM** toggle will determine if a roll is shown to everyone or only the GM.
* **Wounds** toggle will include any wound penalties tracked by the sheet in your roll. If you are under the influence of a condition that will let you ignore wounds such as a *Pain Editor* then make sure this is toggled off.
* **Modifiers** toggle will prompt you for modifiers when a roll is made. A positive number can be typed without a symbol for example "2". A negative modifier needs to include a - for example "-2".
* **Edge** toggle has two uses, *Blitz* and *Push The Limits*. When the Edge toggle is active Initiative rolls will use 5d6. All other rolls for living characters will add the @{edge} attribute to the roll and cause all 6s to explode. Non-living characters such Sprites & a host's intrusion countermeasures (IC) will not add @{edge} but the 6s will explode if the edge toggle is selected.
* **i icon** represents the display notes toggle which can often be found in repeating sections whose headers contain rollable buttons such as with armor. Clicking this will display notes if any are available.
* **tools icon** is a toggle that will switch between settings and display modes.

### Inputs

* **Base** inputs are used for the flat starting value of a stat.
* **Modifier/Modified** inputs should be used for semi-permanent modifiers for a rating or attribute such as adjustments made by *Muscle Replacements*, *Quickened Spells*...
* **Temp/Temporary** inputs are intended to be used for short term bonuses such as those that come *drugs*, *Increase Reflexes*, *Infusion of Firewall*...A list of Temporary inputs for stats can be found in the Options tab.
* **Pro Tip** is to hover over inputs to display the html's titles which will contain the names of the attributes or helpful info. This can be useful if you want to make Macros.

## PC

### AI Support

AI are not supported inherently but the sheet can be used for them. User the Cyberdeck in the Matrix tab to set your Matrix Attributes. Mental attributes can be entered as normal. Depth can be tracked in the Misc input in the Personal Data section. Weakness & Powers can be tracked in the Other Abilities under the Magic tab or entered in Qualities.

### Attributes

* Base is the first input for each of the nine attributes on the left column. The second input is used for Modifiers which will auto calculate with the base and display the total to the right.
* **Magic/Resonance** inputs will not display unless you have selected Magic or Emerged in the Options tab.

* **Initiative** will calculate your base stats using your attributes in the left column. Use the inputs to add any additional bonuses you may receive such as from the quality *Lightning Reflexes*.
* **Matrix Initiative** always assumes you are using Hot Sim. If you use Cold Sim consider inputting a -1 in the second input for matrix_dice_modifier.
* **Composure**, **Judge Intentions**, **Memory**, **Life & Carry**, and **Movement** will all be auto calculated based on your stats in the left hand column. These inputs are for adding additional semi-permanent modifiers.

* **Limits** will be auto calculated by the sheet based on your stats. These inputs are for adding additional bonuses.

* **Attribute buttons** can be found on their appropriate headers. Its worth noting if you click the Edge button or select Edge as the 2nd Attribute it will merely add your @{edge} attribute to the roll and will not use the *Rule of Six*.

### Skills

Skills are straight forward for entry. Select the skill from the drop down, input a rating, and select the attribute you wish to roll with this skill. Specializations can be added in the settings area which will add an additional button around the specializations name in the display view which can be rolled the expected +2.

* **Default Skill** is a generic roll for defaulting any skill. It will roll the selected attribute -1.
* **Language Skills** leaving the Skill rating input empty or entering a 0 will result in a “N” being displayed when you switch to the skill display mode.
* **Exotic Range/Melee** when selected can use the Specialization input to denote what weapon the skill is for. When rolling click the 'Exotic...' button instead of the weapon's name to avoid adding the typical +2 for a specialization.

*Note: If you select duplicate skills from the drop down menu the sheet workers are going to use the last skill selected. So if you enter the same skill twice it will use the last one you have made a change to. If you find yourself in this scenario the fix is easy, simply make a change to the skill entry you want to use. For example open the skill's settings and add text to Notes textfield like "Please fix me". This will trigger the sheet worker and it should update your hidden skill attributes.*

### Core

The Core tab houses most of your standard useful data.

#### Core Combat Info

* **Primary Armor** and **Primary Weapons** are set in the Arms tab. You can have one primary for each category: Primary Armor, Primary Range Weapon, Primary Melee Weapon.

*Note: If you have more than one Primary selected for the same category the sheet will use the last one updated. If the wrong one is showing up on the Core tab then uncheck Primary for all your entries for that category. After they are all unchecked go back and select the one you want to be your Primary.*

#### Primary Armor buttons

* **Name** button will roll a Soak test when a primary armor is selected.
* **Rating number** button will roll just the armor's rating. This can be helpful when seeing if your armor catches fire or can resist cold when elemental damage effects come into play. 
* **Shield** icon is for Defense rolls.
* **Elemental** buttons will roll your Soak + any additional elemental protection you added in the Arms tab. In order they are: Acid, Cold, Electrical, Fire, Radiation. 

#### Condition Monitor

This is where you track damage to your conditions tracks. These will be added to a @{wounds} attribute and if the Wounds toggle is selected then it will act as a negative modifier to your rolls. Clicking the tools icon will open the Condition Settings.
 
* **Condition Monitor Modifiers (P/S)** inputs can be used to add additional boxes to your physical and stun tracks respectively.
* **Overflow Modifier** input will add a bonus to your @{overflow} attribute.
* **Pain Tolerance** input can be used to account for *Low Pain Tolerance* and *High Pain Tolerance*. The default Pain Tolerance is a 0 with Low Pain Tolerance adding a -1 and High Pain Tolerance adding a +1 per rank. You will need to do the math for your qualities then enter the appropriate bonus. For example if you have Low Pain Tolerance and take a drug that gives you High Pain Tolerance (2), the math would be -1 + 2 resulting in a positive 1 being entered. 

* **Physical Damage Track** and **Stun Damage Track** headers both contain a hidden input which will reset their respective tracks to zero. This is an easy way to remove all damage. 

#### Qualities / Martial Arts

Qualities are straight forward text entry. After clicking the tools icon to close the settings area, you can click the qualities' name to expand the entry which will display your notes. Click the name again to collapse the area to save space. Martial Arts will work the same way.

### Arms

This tab is for your weapons & armor.

#### Weapons

This section has two tabs: Range and Melee. Most of the entry should be straightforward. Some notes are added below for guidance.

* **Mode** select is for noting on your sheet the weapon's current selected mode. 
* **Mode Options** input is where you can denote all the modes that your may may have such as *SS/SA/BF...*.
* **Primary** checkbox will add the weapon to the Core tab's Core Combat Info section. Only ONE primary range and ONE primary melee should be selected at a time. See Core Combat Info head for a note on how to fix this if needed.
* **Specializations** checkbox will add a +2 to all rolls with this weapon. Check it if you have an applicable specialization for your weapon.
* **Modifier Dice** input should be used to add additional dice to your rolls with this weapon. Use this to track a bonus such as a +2 from *Smarklink*.

* **Exotic Range/Melee** combat skills are special and will not use the skill ratings found in your Skills section. When selecting either of these skills for use with a weapon, you'll need to enter your skill rating + any modifiers into the **Modifier Dice** input. Agility will still automatically be added to the roll so do not add it as well into the input.
* **Gunnery** will always roll with Agility. Sorry, remote riggers who want to use Logic. :( You'll have to roll your Gunnery from the Skills section with Logic selected for the attribute.

#### Armor

This section is straight forward. There is not currently a way to stack your primary armor with armor pieces such as a *Ballistic Mask*, *Forearm Guards*, *Helmet*...The best way to handle this is to make separate entries for your base armor & your whole kit. For example one entry may be *Armor Vest* and another is *Armor Vest + Helmet*.

* **Primary** checkbox will add the armor to the Core tab's Core Combat Info section. Only ONE primary armor should be selected at a time. See Core Combat Info head for a note on how to fix this if needed.
* **Acid/Cold/Elec/Fire/Radi** inputs will be auto calculated with the Rating input. Be sure to only add your bonus for these such as an extra 5 for additional protection from acid.
* **Modifier Dice** input can be used for any additional soak bonus such as from *Forearm Guards*.

* **Armor buttons** are wrapped around the armor's name and the ratings when in display mode. These work similar to the buttons in the Core Combat Info tab for armor.

### Augs

This tab is used to record all of your augmentations. It works similar to the Qualities / Martial Arts section. 

*Note: Essence input here will not auto calculate your essence in the Attributes section.*

### Gear

This tab is used to track all your gear. It works similar to other sections like Qualities & Augmentations. When in display mode clicking the Item's name will expand and collapses the notes section.

### Magic

The magic section contains three tabs for Spells, Preparations, and Rituals.

#### Spells

Spells section will work very similar to the Weapons section. See that head for general guidelines.

* **Drain** input will be added to the Force of a spell and the roll template will calculate the drain you need to resist.
* **Spell Category** select when set to Combat will toggle on an additional select & input to track Combat Type and Combat Damage type for these spells.

#### Preparations

This section functions similar to spells above. 

#### Rituals

Do to the special nature of rituals this section has limited functionality and mostly serves as an informational area.

#### Adept Power or Other Abilities

This section is similar to Qualities and Augmentations.


### Matrix

Inputs here are mostly straight forward.

* **Model** and **Attribute Array** inputs are purely for recording information.
* **Device Rating** input is used to record your device rating. The Device Rating header has a button to roll Matrix Soak (Device Rating + Firewall).
* **Temp**, **Modifier**, and **Base** inputs can be used to calculate a total for your respective matrix attribute the base inputs share the same attribute name as the Base Slider so you should only use one of these at a time. The base input does not have a maximum in contract to the the slider which only has a capacity of ten.
* **Base Sliders** are stylized sets of radio buttons that can be used to easily change your respective base matrix attribute. The intent is to make switching attributes more fluid. Its your preference if you want to use the input or slider.

* **Attack**, **Sleaze**, **Data Proc.**, and **Firewall** buttons will prompt you for a mental attribute then roll that attribute + your attribute rating total. This makes matrix defense test easier.
* **Condition Monitor** header has a hidden input which can be used to reset the matrix condition monitor back to empty.

* **Programs** repeating section is used to track your programs. When in display mode a power button icon will appear that is a toggle to change the opacity of the program. This will help track which ones are currently loaded on your deck.

#### Living Persona

Sorry my fellow technomancers there is currently not a living persona to be had. For now, you can use the Cyberdeck to track your matrix array. I hope to making a living persona tab in the future.

#### Complex Forms

This section works similar to spells.

* **Fade** input will be added to the Level of a form and the roll template will calculate the fade you need to resist. Currently it does not ensure a minimum of 2, sorry.


### Social

This tab is purely informational at the moment. It work similar to the Qualities section and has no additional funcality.

### Vehicle

Vehicle section works similar to other sections covered above. It is purely informational at the moment and does not contain any rolls. It is meant as a quick reference for vehicle stats. GMs, I recommend Riggers with a lot of functional drones be given NPC Vehicle sheets to track each vehicles stats and weaponry individually.

### Options

Options tab is home to several features and more to come.

* **Character** select determines if the PC is Mundane, Awakened, or Emerged. Awakened or Emerged are required to unlock the related Magic/Resonance attribute.
* **Sheet Select** select is used to toggle between PC and the NPC sheets.

* **Temporary Modifiers** inputs are intended to be used for short term bonuses such as those that come *drugs*, *Increase Reflexes*, *Infusion of Firewall*...A list of Temporary inputs for stats can be found in the Options tab.

## NPC

NPCs are intended to be simplified stat blocks. If you are making an NPC that is stat'd out like a PC it is best to use the PC sheet.

*Note: Avoid toggling between PC and NPC on the same sheet. They share many of the same attribute names & sheet workers so you risk getting extra modifiers polluting the attributes.*

### General NPC Guidelines

### Grunt

New Grunts sheets should intiatilly open to the settings pages.

* **Attributes** inputs are similar to the PC sheet. The top input is your base and the second input is the modifier. NPCs do not have Temp inputs anywhere so use the modifier inputs.
* **Bonuses** inputs on the left hand side are all added to the auto calculated attributes. This works the same way as the PC sheet.
* **Pain Tolerance** input works just like the PC sheet. See the Condition Monitor entry above.

* **Armor Rating** input needs the Grunt's total armor rating.
* **Soak Bonus** input adds to the Body + Armor Rating. This is where you'll track a bonus like from *Toughness*.
* **...Protection** inputs adds to the Soak calculation (Body + Armor Rating + Soak Bonus).

* **Mundane/Awakened/Emerged** toggles will hide and reveal appropriate additional inputs, textfields, and repeating sections. Use Awakened for Spirits.
* **Matrix Device** toggle add a Cyberdeck like device to the bottom of the sheet. This has the same functionality as the Cyberdeck in the PC sheet making enemy deckers easier to manage. 

*Note: If you select Awakened, Emerged, or Matrix Device then change the sheet type some of those revealed sections may linger. This is how you can end up seeing the Spells section on a Host sheet. To fix this just switch back to the Grunt sheet and select Mundane and/or toggle off Matrix Device. This isn't a bug, IT'S A FEATURE!*

* **Display Mode** has buttons and reset toggles on their appropriate headers. These will all work similar to their counterparts on the PC sheet.

*Note: There is currently not a place on the NPC sheet to track damage and thereby accumulate wounds. The Wounds toggle and this feature can still be used. The easiest way to do this is associate the NPC sheet with a token. Set two of the token bubbles to Physical and Stun. You can then adjust these tracks via the bubbles and it will calculate wounds for you. If you do this you'll want to have a seperate sheet for each individual Grunt.*


### Hosts

These sheets are pretty basic. It has headers just like the Grunt sheet with rolls auto calculated to the matrix attribute + host rating.


* **Intrusion Countermeasures** repeating section works similar to other fields. The IC Limit, Defense Attribute, and Defense Matrix Attributes selects will let you pick appropriate info for you IC will will then be displayed in the roll template to assist with faster opposing rolls. They do not add additional functionality.

* **IC** name will roll Host Rating + Host Rating d6s to do its thing. Having Edge toggle selected will invoke the *Rule of Six* but will not add an edge pool. Wounds toggle does nothing as IC feel no pain.....

### Sprite

The sprite sheet functions much like the Host sheet. It has an additional Skills section and Powers section. The Skills section has all appropriate technical skills Sprites can have. The associated button will roll Level + Level. Powers is simply informational.

### Vehicle

This will work similar to the Grunt sheet. One difference is under Bonuses that Data Processing, Firewall, and Device Rating will need you to input their appropriate ratings. Currently the Vehicle sheet does not have a functioning button for Pilot, Device Rating, and Firewall rolls. These will be added in a future update.


## Helpful Macros

The built in sheet buttons do not cover all of the rolls in Shadowrun 5e by a long shot. Here are some of the more helpful macros. You will want to add these to the Attributes & Abilities tab on Roll20.

* **Drain**. This is a sample for a Drain macro. You'll want to replace Logic with your appropriate attribute such as @{intuition}, @{magic}, @{charisma} ...

```@{gm_toggle} &{template:rolls}{{header=Drain}}{{base=Base}}{{mod=[[@{modifier_toggle}]]}}{{wound=[[@{wound_toggle}]]}}@{modifier_toggle}{{edge=[[@{edge_toggle}]]}}{{dice=[[(@{willpower}+@{logic}+@{wound_toggle}+@{modifier_toggle}+@{edge_toggle})d6>5@{explode_toggle}]]}}```

* **Defense**

```@{gm_toggle} &{template:rolls}{{header=Defense}}{{base=Base}}{{mod=[[@{modifier_toggle}]]}}{{wound=[[@{wound_toggle}]]}}{{edge=[[@{edge_toggle}]]}}{{dice=[[(@{defense}+@{wound_toggle}+@{modifier_toggle}+@{edge_toggle})d6>5@{explode_toggle}]]}}```


* **Initiative**

```@{gm_toggle} &{template:rolls}{{header=Initiative}}{{base=Base}}{{mod=[[@{modifier_toggle}]]}}{{wound=[[@{wound_toggle}]]}}{{edge=[[@{edge_toggle}]]}}{{dice=[[(@{initiative_mod}+@{wound_toggle}+@{modifier_toggle})+(@{initiative_dice})d6cf0 &{tracker}]]}}```

* **Soak** 

```@{gm_toggle} &{template:rolls}{{header=Soak}}{{base=Base}}{{mod=[[@{modifier_toggle}]]}}{{edge=[[@{edge_toggle}]]}}{{dice=[[(@{soak}+@{modifier_toggle}+@{edge_toggle})d6>5@{explode_toggle}]]}}```

* **Primary Range**. This macro requires you to have selected a Primary weapon in your Arms tab.

```@{gm_toggle} &{template:rolls}{{header=@{primary_range_weapon}}}{{base=Base}}{{mod=[[@{modifier_toggle}]]}}{{wound=[[@{wound_toggle}]]}}{{edge=[[@{edge_toggle}]]}}{{dice=[[((@{primary_range_weapon_skill}+@{primary_range_weapon_dicepool})+@{agility}+@{wound_toggle}+@{modifier_toggle}+@{edge_toggle})d6>5@{explode_toggle}]]}}{{desc=Mode @{primary_range_weapon_mode}, ACC @{primary_range_weapon_acc}, DV @{primary_range_weapon_damage}, AP @{primary_range_weapon_ap}}}```
