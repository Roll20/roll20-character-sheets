Narratives Unlimited D10 is a universal story focussed RPG published under a Creative Commons licence at http://www.narrativesunlimited.com. 
##Changelog
### May 2015 Update
* Autocalculation for many fields
* Improved tabbed interface
* Roll templates
* Inline roll and hidden math support (no wall of numbers on mouse over)
* Various visual improvements
###June 2015 Update
* Corrected offhand penalty
* Added Ammo tracking
* Added Quality and Magical bonuses to indiviual weapons and attacks
* Magic and Psi Page with foci, components, and matrix storage

##Useful Attributes
###Attribute Scores:
* Inetlligence @{In}
* Willpower @{Wl}
* Affability @{Af}
* Perception @{Pn}
* Agitily @{Ag}
* Hand/Eye @{He}
* Strength @{St}
* Stamina @{Sm}

###Modifiers
* Movement Penalties @{movepen}
* Attack Penalties @{attackpen}
* Mental Penalties @{mentalpen}
* Encumbrance/Armour Penalties @{encpen}

##Important Info
###Autocalculation
When wounds are entered in locations, they are applied to the skill and attack rolls and adjusted for size and hit location type.

Stats, skills, and derived rolls are auto calculated now, no longer do you have to add them up by hand, additionally the Stat bonus is autocalculated and the stat portion of the skill score is selected from a list and dynamically linked to the stats.  Attacks and rituals are  dynamically linked to a skill (just tell it the number of the skill you are using)

One handed weapon uses need to specify which hand is being used as well as whether they are left or right handed, ambidextrous, or lack hands (yes that is an option).  This will ensure that the right penalties are applied when your character is wounded, and auto applies the offhand penalty.

When inventory locations are used, the encumbrence is auto calculated, as is the encumbrance penalties.  If a character has ranks in UA portage they can add it to the settings page to ensure proper encumbrance calculation.

Temporary modifiers are available on the settings page, these can be used to create effects like magical boosts, stuns, and other conditions which are ephemeral.

Armour penalties calculation requires the user to sum up the penalties from the list of armour pieces worn (max and min) and input the Armour UA, the calculation is automatically made and applied after this is done.
####Autocalc Settings
The settings page contains a number of fields to set most of which are preset for human(oid) characters who are right handed. Ambidextrous characters, fish, birds, gigantic psycic mule deer and the like will have to modify hit location types, size settings and so forth here in order for things to calculate correctly.  Simply select the options from the lists that apply to your character.

Since not all abilities have unconditional bonuses, those that consistantly modify rolls have been added to the settings tab (UA:Armour is in the armour section on the combat tab), either check them or enter the bonus.  An api script will later automate this for mentor level users.
###Open Ended Rolls
NUD10 open ended rolls are not supported in the basic Roll 20 die roller, however they can still be made manually.  The roll templates notify you when a roll is open ended and you can roll a d10 as many times as needed to complete the open ended roll.  An API script is avialable but at this time it does not yet support inline rolls.  I perfer to play without the automated roll since the schrodinger's cat like experience of open ended rolls is more fun that way.
###Migrating older character sheets
A considerable amount of time was taken to ensure that most fields coppy across directly. including large lists.  Variable names are left the same.

A number of fields have been changed to autocalculating ones and as a result the saved variables for these fields can cause some conflicts.  There is a simple remedy however, you can use the Attributes and Abilites tab to delete any conflicting fields without harming your character.
##Limitations
Situational bonuses (most UAs for example) are not applied automatically though UA:Armour and UA:portage have fields that can be filled in.

Repeating sections can not currently be autocalculated or linked (without considerable difficulty) to other parts of the sheet.  The adding up of inventory and armour pieces can be accomplished with an api script (in the works) but this will be a mentor option only.

##Known bugs
The move hit locations for some new characters can sometimes stick (though I can find no explanation for it in the code) and will need to be set away from the default before being set to the correct value.  This need only be done once and appears to remember the choice afterwards.

Be sure to fill in all fields on skills including "other" even if it is a 0 (as it often is).  When rolling skills you won't notice, but when linking that skill to an attack or ritual it may burp out an error if you don't (the error message will have an increment number one less than the skill number displayed in the list since internally it counts from 0 rather than 1). To fix that error message simply add a value to the field of the skill that burpped out the error and you are back in buisness.  The field has a default value but it is not always stored internally unless you enter it at least once, it will remember it afterwards even after you log out and in.  This may be related to the bug above.
