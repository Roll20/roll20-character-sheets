# Help

## Weapon: Required rollable table
The GM need to create a rollable table called "Symmetry-Dice" with the folowing values :

- 1
- 2
- &ndash;
- &ndash;
- &ndash;
- DSI (which stand for "Dark Simetry Icon")

Carefully look at any damage check to locate any DSI rolled.

Alternatively, you could replace this last value with "100 + DSI". In this case, when you look at the result every hundreds indicates an DSI was rolled.

## Talent: Backward compatibility
The two legacy talent sections have been merged into one. For backward compatibility reasons, there are 8 fixed talent entries before the repeatable entries

## Skill rolls
### Understanding skill rolls result
Rolls equal to or less than the target number generates one success. One additional success is generated if the rolls equal to or less than the focus in the tested skill.

When you look a skill check result:

- Green numbers are equal to or less than the focus.
- Red numbers are over the Dread setting and represents Repercussions.
- White numbers represents successes and failures. They are already included in the successes total but you can compare them to the target numbers if needed.

N.B. In Roll20, there are only three colors availaible to represents various dice values. I just hope the color scheme choosen won't confuse anyone.

### Unskilled skill tests
Note that skill roll's Repercussion range do not include the unskilled modifier.

### How skill rolls works
This section will try to answers any questions you have about how skill rolls works in Roll20. The math behind it is counterintuitive. Read this only if you want to understand why the rolls are so peculiar.

Here is how one would assume the formula would be :

*[nb critical successes] x 2 + [nb successes]*

Since a dice can't generate two successes in Roll20, the formula is :

*[nb dice] + [nb critical successes] - [nb failures]*

where:

- [nb dice] is the total number of dice rolled.
- [nb critical successes] is the number of rolls equal to or less than the focus.
- [nb failures] is the number of rolls over the target number.