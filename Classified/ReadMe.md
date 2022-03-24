# Classified Character Sheet
Buttons are indicated by the text changes to read when the mouse cursor is hovered over them.  Other have a white border around them such Attack and Draw and the Pain rolls

On the PC sheet if alt is held while clicking the Sixth Sense roll button it will  whispher the roll to the GM

Skill and Weapons can be edited when the cog to the left are yellow.  When the cog is clicked it will tirn white and becomes a button.
Wound penalties area  automatically applied to Difficulty Factors when the Wound Track is changed.

# Configuration
The cog on the top right of each sheet opens the configuration. From here the sheet can be toggled between PC,Major NPC and Squad sheets.

In the configuration for the PC sheet there are toggles to remove the Photography ability and the Torture skill.

# Weapons
The performance modifiers for Single  Shot and Automatic fire are not automatically added 
Multi should be checked when single shots  are fired at multiple targets see  MULTIPLE TARGET FIRE on page 46 of the Classified rules 

Area is checked when the  weapon does area damage like mortars or missiles
DR Mod.  Is a modifier to the Damage Rating such as targets that are Close or Long range

DF Mod. Is a modifier to the Difficulty Factor such as targets that are Close or Long range
Shots is the number of shots being fired.     This will roll all the shots and once.

# Hand to Hand Weapons (including Grenades)
If the damage rating (DR) is entered as a number the weapon will treated as weapon such as a knife or unarmed.  If the damage is entered as a Letter from H–L the damage   will be treated as AREA WEAPON DAMAGE (i.e. a grenade) see page 41 of the rules 

There a switch in the configuration so instead of inputing a targets speed when a non area atack hand to hand attack is made a target token can be selected instead.
# Vehicles

The Performance Modifier for the vehicle is automatically added to Maneuver and  Control Rolls

The Performance Modifier for the vehicle weapon  is NOT  automatically added for weapon attacks

Vehicle damage penalties are automatically added to Maneuvers, Control rolls and Vehicle weapon attacks

# Squad sheet rolls

To have wound penalties applied to skill and weapon rolls the correct squad member should be selected  using the radio button beside the squad member number.

# Turn Order 
if "Speed" label is clicked when an attached token is selected an entry will be add to the turn order with  a value of SPEED+(1D100/100). Below is a macro if which to setup a token action

```
&{template:turnOrder} {{roll=[[(@{selected|speed})+(@{selected|drawTurn}/100) &{tracker}]]}}
```
## Initial Release 07.02.2022

Expect bugs

Expect things to be missing

Translations are spotty

