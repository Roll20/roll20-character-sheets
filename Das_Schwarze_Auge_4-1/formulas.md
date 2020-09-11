# DSA 4.1 Character Sheet Formulas Documentation

## Purpose
DSA 4.1 rules can be quite convoluted at times and as a consequence so are the formulas used. Roll20's inline roll maths abilities are quite limited and combining DSA 4.1 rules with Roll20 maths can cause some headaches and, of course, bugs.

Since most formulas have been touched by several parties, many bugs have already been fixed. In order to prevent newcomers to fall into the same traps as their predecessors and to make the formulas less difficult to understand, this document contains background information on some of them.

NB: The English terms used for this largely German system may not match any official ones due to the author's laziness. Feel free to submit a pull request for fixing these things.

## Common Techniques
### Number-to-Roll Conversion
In order to use drop/keep highest/lowest the input needs to consist of dice rolls such as `{1d20, 2d10}kh1`. Using raw numbers such as `{10, 2d10}kh1` does not work: `Cannot mix M and sum rolls in a roll group`. But, one can add numbers to dice rolls and the result is a roll: `{10 + 1d20, 2d10}kh1` works.

In order to use plain numbers, one just has to add zero 1-sided dice: `{10 + 0d1, 2d10}kh1`.

## Stat Checks (Eigenschaftsproben)
`{@{MU} - (?{Erleichterung (−) oder Erschwernis (+)|0}) - 1d20cs1cf20, @{MU} + 0d1}dh1`

The stat value (`@{MU}`) is increased (easy) or decreased (difficult) by the modifier (`(?{Erleichterung (−) oder Erschwernis (+)|0})`). Then, the roll result (`1d20cs1cf20`) is subtracted. This would suffice for getting the correct result (automatic) success/failure, but the magnitude could be off in the case of negative modifiers (easy). One example: Modifier -7, MU stat 12, roll result 5. The check result would be +14, although the result is capped at the stat value, i.e. 12.

Therefore, the first part is grouped with the roll `@{MU} + 0d1` and the highest value of both is dropped. In the above example, 14 would be higher than 12 and dropped, so that the result would be 12. When the check result is less than the stat value, the second part would be higher and dropped. The same is true for negative results (failures). Automatic successes (1) and failures (20) are handled by the roll template. Since stat values of 20 and higher are possible (and negative modifiers as well), the roll template currently does not show the resulting points in the case of automatic failures. The reasoning behind this is that the result would be non-negative, suggest success to the player and might confuse newbies. It should be noted that automatic success/failures in stat checks are an optional rule according to WdS, p. 7.

## Life Energy (Lebensenergie/LE), Stamina (Ausdauer/AU) and Astral Energy (Astralenergie/AE)
It is important to note that the base values of the stats are used here (`_Basis`). This prevents these base values to change upon temporary effects such as wounds, spells or disease. A side effect of this is that the "Mod" column on the "Grundwerte" tab must not be mistaken for the "Mod" column on the official PDF character sheet which takes boni/mali from the character generation. In its current form, this character sheet assumes that the value entered under `Basis` is the value of the current stat with all permanent modifications already factored in.

## Magic Resistance (Magieresistenz/MR)
No temporary stat modifiers or wounds are applied.

## Initiative/Attack/Parry/Long Range Base Values (INI/AT/PA/FK-Basiswert)
Wound effects are honoured for Attack/Parry/Long Range base values. No temporary stat modifiers are applied.

## 3d20 Checks
Four cases have to be distinguished in order to determine the result of a roll:

* Automatic Success: At least two dice show a 1.
* Success: The sum of the points available for all checks is greater than or equal to the sum of the points needed to succeed all three 1d20 checks.
* Failure: The sum of the points available for all checks is less than the sum of the points needed to succeed all three 1d20 checks.
* Automatic Failure: At least two dice show a 20.

Three 1s or three 20s do not per se have any further influence on the roll, it is up to the GM to decide the effects in such cases.

The complete algorithm to determine the exact result of a roll cannot be adequately implemented using Roll20 rolls. Also, certain special skills affect the outcome as well such as Misfortune Magnet (Pechmagnet) or Fixed Matrix (Feste Matrix). Therefore, the currently used formula has some limitations.

`[[ { [[{0d1 + @{skill} - (?{mod|0}), 0d1}kh1]] - {1d20cs1cf20 + [[{0d1 + (?{mod|0}) - @{skill}, 0d1}kh1]] - @{stat1}, 0d1}kh1 - {1d20cs1cf20 + [[{0d1 + (?{mod|0}) - @{skill}, 0d1}kh1]] - @{stat2}, 0d1}kh1 - {1d20cs1cf20 + [[{0d1 + (?{mod|0}) - @{skill}, 0d1}kh1]] - @{stat3}, 0d1}kh1, 0d1 + @{skill}}dh1]]`

To break down the overall structure a bit, let's look at this in a very abstract way:

`[[ {points after all rolls, max. points left}dh1 ]]`

At the highest level, the points after all rolls are compared to the maximum points left after the rolls (usually the skill value). If the `max. points left` are higher than the `points after all rolls`, the former is discarded and the latter used as the roll result. Example: Skill value (= `max. points left`) is 7 and 3 points were consumed by high rolls, so that `points after all rolls` is 4. `{4, 7}dh1` yields 4. If the check was modified by -7, i.e. 7 more points were available for countering high dice rolls, the `points after all rolls` would be 11. `{11, 7}dh1` yields 7. This is the desired and correct way to calculate the `points after all rolls` as the `points after all rolls` cannot exceed the skill value.

In a less abstract way, the roll looks like this:

`[[ { [[points to counter high rolls]] - {points needed by roll 1, 0d1}kh1 - {points needed by roll 2, 0d1}kh1 - {points needed by roll 3, 0d1}kh1, max. points left}dh1]]`

### Points to Counter High Rolls
`{0d1 + @{skill} - (?{mod|0}), 0d1}kh1`

Without any modifier (mod = 0), exactly `@{skill}` points can be used to counter high dice rolls. Negative modifiers increase these points, positive modifiers decrease these points. There are always at least 0 points left due to the `kh1` against `0d1`.


### Points Needed by Roll n
`{1d20cs1cf20 + [[{0d1 + (?{mod|0}) - @{skill}, 0d1}kh1]] - @{statn}, 0d1}kh1`

The result of each roll is the amount of points needed by the roll. Each roll consumes at least 0 points as ensured by the `kh1` against `0d1`. The points consumed are calculated as the roll `1d20cs1cf20` plus the effective skill value and at least 0. This ensures that in the case of difficult checks with the modifier exceeding the skill value, the now effectively negative skill value is making each roll more difficult by its absolute value. Example: Skill value is 7, but the modifier is +9 (very difficult), so that the effective skill value becomes -2. Now, each roll has to be modified by +(abs(-2)) = +2. Another `kh1` against `0d1` guarantees that positive effective skill values do not give another bonus; they already benefit the check by providing more points to be consumed by high rolls. Finally, the corresponding stat value is subtracted. If the result is negative or zero, the outer `kh1` already mentioned will set this roll to 0, otherwise the result of this term is the required points.

### Max. Points Left
`0d1 + @{skill}`

Number-to-roll conversion to cap the check result at the skill level.

### Specializations
For specializations, whenever `@{skill}` is mentioned, a ` + 2` was added, because the effective skill value is higher when using the specialization.

### Automatic Failure and Automatic Success
These two conditions cannot be caught with Roll20 rolls at present. Roll templates check for `WasCrit` and `WasFumble`, but this is just a boolean and does not give the number of 1s and 20s. Therefore, an info is printed in rolls with at least one 1 or one 20.

## Bonus Damage from High Strength (TP/KK)
Weapons come with a pair of values for the calculation of increased/decreased damage based on your strength. The first value is the threshold, which describes the strength needed to use the weapon in a balanced way. The second is the strength step needed to determine at which strength values more/less damage can be dealt.

The calculation is not simple, therefore I want to start with pre-calculated values from WdS, p. 82:

* TP/KK = 12/2 (threshold: 12, step: 2)
* Strength 12 - 2 * 2 = 8: Damage - 2
* Strength 12 - 1 * 2 = 10: Damage - 1
* Strength 12 ± 0 * 2 = 12: Damage ± 0 
* Strength 12 + 1 * 2 = 14: Damage + 1
* Strength 12 + 2 * 2 = 16: Damage + 2
* Strength 12 + 3 * 2 = 18: Damage + 3

While this may look pretty straightforward at first sight, the problem lies within the interval sizes:

* Damage - 2: 7 and 8
* Damage - 1: 9 and 10
* Damage ± 0: 11, 12 and 13
* Damage + 1: 14 and 15
* Damage + 2: 16 and 17
* Damage + 3: 18 and 19

The ± 0 interval has `2 * step - 1` values, while all others have `step` values. Therefore, the formula looks like this:

`floor((abs(@{STR} - @{threshold}))/@{step})*((@{KK} - @{threshold} + 0.01)/abs(@{STR} - @{threshold} + 0.01))`

The first part `floor((abs(@{STR} - @{threshold}))/@{step})` is necessary to get the magnitude of the damage increase/decrease:

* Strength 8: floor(abs(8 - 12)/2) = 2
* Strength 9: floor(abs(9 - 12)/2) = 1
* Strength 10: floor(abs(10 - 12)/2) = 1
* Strength 11: floor(abs(11 - 12)/2) = 0
* Strength 12: floor(abs(12 - 12)/2) = 0
* Strength 13: floor(abs(13 - 12)/2) = 0
* Strength 14: floor(abs(14 - 12)/2) = 1
* Strength 15: floor(abs(15 - 12)/2) = 1
* Strength 16: floor(abs(16 - 12)/2) = 2

The second part `((@{KK} - @{threshold} + 0.01)/abs(@{STR} - @{threshold} + 0.01))` has the task to give the correct sign which is the reason why the same terms are in the numerator and denominator, just once without `abs(...)` and once with. The results are:

* Strength 8: (8 - 12 + 0.01) / abs(8 - 12 + 0.01) = -1
* Strength 9: (9 - 12 + 0.01) / abs(9 - 12 + 0.01) = -1
* Strength 10: (10 - 12 + 0.01) / abs(10 - 12 + 0.01) = -1
* Strength 11: (11 - 12 + 0.01) / abs(11 - 12 + 0.01) = -1
* Strength 12: (12 - 12 + 0.01) / abs(12 - 12 + 0.01) = 1
* Strength 13: (13 - 12 + 0.01) / abs(13 - 12 + 0.01) = 1
* Strength 14: (14 - 12 + 0.01) / abs(14 - 12 + 0.01) = 1
* Strength 15: (15 - 12 + 0.01) / abs(15 - 12 + 0.01) = 1
* Strength 16: (16 - 12 + 0.01) / abs(16 - 12 + 0.01) = 1

As can be seen for Strength 12, without the `+ 0.01` the denominator would become 0 causing a division by 0 error. Therefore, it's important to keep this.

NB: In the term "TP/KK", "TP" does not stand for "Threshold" (or anything close) and "KK" does not stand for "Step" (or anything close). "TP" stands for "Trefferpunkte" and roughly means "Damage points before armour". "KK" stands for "Körperkraft" and is the complete German name of for the strength stat.

## Sources
WdS: Wege des Schwerts

