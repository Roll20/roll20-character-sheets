This sheet was inspired by the Palladium Megaverse sheet, but has had several changes for those familiar with that sheet.

### Roll Template
- The roll template is based on one written by Jakob and referenced here:  [A Better Default Template](https://app.roll20.net/forum/permalink/6792597/)
- This sheet has a roll template that is called by &{template:custom}.
- You specify a color with {{color=black}}.  Available colors are black, brown, blue, red, grey, yellow, green, teal, orange, pine, ice, violet, sun, and wine.  The reason for that many color options is to be able to use different colors for different types of magic.
- The sheet uses black, brown, yellow, red, blue, green, and grey for various rolls.
- You can specify both a title and subtitle as {{title=Desired Title}} and {{subtitle=Desired Subtitle}}
- Any rolls or inline macros can be assigned the same as the default Roll20 template.
- There is a description section that is called as {{desc=Desired Description}}.  This section will honor line breaks making larger descriptions or even simple table options possible.
- If a description is used, it must always be the last section displayed.
- The roll template is built to change the pink "chat menu" buttons into blue text with no box.
- Because I like to apply circumstantial bonuses and penalties to skills, I do not have skill or stat rolls set up to show success or failure.  Instead it will show the roll and the target number.

### Menu Roll Template
- You can also call the template as &{template:menu}.
- The main difference is that the description section will display all text centered, bold, and in italics.  I use this for all chat menus.

### Roll Template Example
This example is the macro I use for the healer ability Healing Touch.
```
&{template:custom} {{color=sun}} {{title=**@{character_name}**}} {{subtitle=Healing Touch}} {{ISP=[[8]]}} {{Healing=[[2d6+2]]}} {{desc=By the laying of hands and force of will, the healer can heal the pain and effects of burns, cuts, bruises, broken bones, etc. The healing touch works only on others (not self) and can be done as often as once every other melee until I.S. P. are used up.}}
```

### Auto Calculated Stat Bonuses
- I.Q. bonuses are auto calculated and displayed at the top of the Skills tab.  Any bonus is subtracted from the percentile roll in the OCC, Elective, and Secondary skill sections.
- M.A. bonus to trust and intimidate is autocalculated and displayed in the light blue section.
- P.S. bonus to damage is autocalulated and displayed on the Combat Tab under Hand to Hand Combat skill.  This will be included in any damage roll from the melee attack section of the Statistics tab.
- P.P. bonuses to parry and dodge are autocalculated and displayed on the Combat Tab under Hand to Hand Combat skill.  This will be included in rolling Dodge in the light blue section of the Statistics tab, or rolling parry in the Melee Attacks section of the Statistics tab.
- P.B. bonuses to charm and impress are autocalculated and displayed in the light blue section.
- Spd. is autocalculated to rough miles per hour and displayed in the gold section.  It also calculates movement per action in case people are using that 2E mechanic.
- Saving throw bonuses from M.E. and P.E. are autocalculated and displayed below the rolls in the Saving Throw section of the combat tab.  They are included in the calculation of the rolls.

### Stat Rolls
- The stat rolls are set up to roll 2 numbers.  The first is a d20, and the second is d100.
- The "Perception" roll in the light blue section of the Basic tab is basically a d20 stat check.  It takes the average (rounded down) of the I.Q. and M.E. for a target number. Since perception doesn't exist in 1E, this was my personal solution.  Use it or ignore it as you wish.

### Extra Attributes
- The right hand column of the Basic tab has quite a list of things there.  This is all to facilitate the creation of macros and being able to link tokens easily to different resources.
- Hit Points = @{character_hp}
- A.R. = @{character_ar}
- S.D.C. = @{character_sdc}
- Psion Level = @{psi_level}
- Psion I.S.P. = @{character_pisp}
- Heal I.S.P. = @{character_hisp}
- Caster Level = @{caster_level}
- Daily Casts = @{character_casts}
- Spell Str = @{spell_strength}
- Ward Level = @{ward_level}
- Daily Wards = @{ward_casts}
- Ward Str = @{ward_strength}
- Circle Level = @{circle_level}
- Circle Str = @{circle_strength}

### Extra Movement
- I included this to be used in case of a character having a common secondary mode of travel such as a mount, spell, or magic item.
- This repeating section does not autocalculate values.  You can temporarily change the Spd attribute to get all the different calculated values to enter manually.

### Melee Attacks
- This repeating section will pull in any bonuses found under the Hand to Hand Combat skill, including P.S. or P.P. bonuses.  This also includes changing the critical strike threshold if it is changed there.  Weapon proficiency bonuses will need to be added manually.
- Any info entered into notes will be displayed using the description part of the roll template, but will not appear at all if left blank.

### Ranged and Spell Attacks
- This repeating section pulls nothing from anywhere, except for the Ranged Critical Strike which can change in the case of Longbowmen.
- All other info is entered manually and makes for a good place to place some magic and psionic abilities in addition to ranged weapon attacks, such as Mental Bolt of Force or Ball Lightning.

### Initiative
- The built in Initiative macro adds 80 to the d20 dice roll.  This is to facilitate use of an API script that can add multiple instances of a token on the tracker, reducing the initiative value by 20 for each additional entry.  Since multiple actions are not clumped all together as with D&D, the extra room for spreading out multiple attacks I have found useful.

### Skill Rolls
- As mentioned earlier, any bonus for an exceptional I.Q. will be subtracted from rolls in the OCC, Elective, and Secondary Skills sections.
- The rolls will roll the percentage and display the target number of your skill.
- Any notes about the skills will be displayed in the description part of the template.
- The mystic skills section is intended for druid class rolls, deducing circle invocations, detecting illusions, and other magical type class skills that have a percentile roll.
- Since I am not sure the I.Q. bonus should apply for some of these types of skills, that bonus is not automatically applied in the Mystic skills section.

### Recommended API
- If you have access to the API, I highly recommend the use of 2 API scripts.
- [Universal Chat Menus on Roll20 Forums](https://app.roll20.net/forum/permalink/7474530/)  
- [Initiative Duplicator on Roll20 Forums](https://app.roll20.net/forum/permalink/6817748/)

### Universal Chat Menu Macro Example for Skills
```
!chatmenu @{selected|character_id} {template:menu} {{color=green}} {{title=**@{selected|character_name}**}}{{subtitle=**Complete Skill List**}} {{desc=CHATMENU}} --title:OCC Skills --separator:~ --repeating_skillocc|skill_name|occskill --title:Elective Skills --separator:~ --repeating_skillelective|skill_name|electiveskill --title:Secondary Skills --separator:~ --repeating_skillsecondary|skill_name|secondaryskill --title:Mystic Skills --separator:~ --repeating_skillmystic|skill_name|mysticskill
```

### Initiative Duplicator Macro Example
```
!dup-turn ?{How many attacks?|}
```

### Disclaimer
Palladium Fantasy 1E has been around a long while.  It is from an era where house rules were not frowned upon, but encouraged.  As such, I have tried to put enough options in this sheet to allow for creativity.  I am a definite novice at html, css, or anything else that has gone into this sheet, so any major revisions for automation may be beyond me.  It is in the current state due to the generous help of the Roll20 forum community.  As K.S. would say, Game On!
