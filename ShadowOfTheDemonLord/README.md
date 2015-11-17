### Shadow of the Demon Lord Character Sheet
This sheet supports the game [**Shadow of the Demon Lord**][sotdl].

Most rolls can be dragged to the quick bar as macros for a character. The only place this is not true are the weapon and magic spell rolls.

For weapons, the Damage fields are in the form of [# of dice to roll] [die type to roll] + [any modifiers]. The any modifiers allows both dice (3d6) and numbers (-2), so damage for a weapon could look something like "3d3 + 26d -1".

For all dice rolls within the sheet, a prompt will appear to enter boons or banes associated with the roll. At the prompt, enter a positive number for boons (e.g., 3) and a negative number for banes (-2). The rolls will correctly keep only the highest number rolled and add or subtract it appropriately.

#### Character Attributes to Reference
##### NOTE: All of the {} entries should be prefixed with a name, so to get the character Bob's Ancestery, the syntax would be @{Bob|Race}. To roll Bob's Intellect roll, the syntax is %{Bob|IntellectCheck}.
* @{CharacterName} - Character name
* @{Race} - Ancestery
* @{Level} - Level
* @{Novice} - Novice path
* @{Expert} - Expert path
* @{Master} - Master path
* @{Strength} - Strength score
* @{StrengthMod} - Strength modifier
 * All modifiers are calculated as @{Score}-10
* %{StrengthCheck} - Strength roll
* @{Agility} - Agility score
* @{AgilityMod} - Agility modifier
* %{AgilityCheck} - Agility roll
* @{Intellect} - Intellect score
* @{IntellectMod} - Intellect modifier
* %{IntellectCheck} - Intellect roll
* @{Perception} - Perception score (abbreviated Percept on screen for space)
* @{PerceptionMod} - Perception modifier
* %{PerceptionCheck} - Perception roll
* @{Will} - Will score
* @{WillMod} - Will modifier
* %{WillCheck} - Will roll
* @{Damage} - Current damage
* @{DamageMax} - Maximum damage character can sustain (equal to Health)
* @{Health} - Maximum health (editable, unlike DamageMax)
* @{HealingRate} - Health character regains on a rest or during healing
* @{Defense} - Defense (similar to AC in D&D)
* @{Speed} - Speed (in yards)
* @{Insanity} - Current insanity score
* @{InsanityMax} - Maximum insanity character can gain before going mad (equal to Will)
* @{Corruption} - Current corruption score
* @{Power} - Current power score
* @{Size} - Size of character. Note that 1/2 is not supported, so use 0 instead (there are no rolls in the sheet that take size into account)
* @{Fortune} - Checkbox to indicate if the character has Fortune or not. 1 if it does, 0 if it does not.
* @{Equipment} - The equipment text box
* @{Description} - The description text box

Professions, Talents, Weapons, and Magic cannot be referenced directly like the above attributes can be. If you want to reference these directly, making an Ability. Hopefully, I will expose these properly one day for use.

[sotdl]: http://schwalbentertainment.com/shadow-of-the-demon-lord/