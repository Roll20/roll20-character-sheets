# WH40k Wrath & Glory (Advanced API) Character Sheet

This is a multi-purpose sheet for both characters (default view) and NPC's based on the quickstart rules (subject to change).  

This Wrath & Glory character sheet provides dice automation for inline dice rolls for any user and is integrated with the Wrath & Glory dice roller API for mentor level gamemasters. 

Please note that the inline dice roll macros do not fully enable the type of dice rolls made in the Wrath & Glory system.  Users will need to hover over the inline roll results to count the number of successes (4 or 5 = 1 success; a 6 = an exalted icon that may be shifted to 2 successes); the inline rolls do not allow for counting if a 6 is = to 2 successes.  At this point it does not add modifiers to the rolls for inline dice.

If you have any questions, comments, or feedback (all welcome) please contact Barry at btsnyder@gmail.com

### Current Version
Version 2.7 (July 28th, 2019) 

### Thanks	
Many thanks to my players (Dave, Brian, Charles, Matt, and Tyler) for their patience as I evolved the sheet and die roller (sometimes in the middle of play).

Many thanks to the following individuals who reported defects and provided improvements: 
1. Morback: extra die on rolls + implement force to add 1/2 willpower to weapon DR + corruption level and roll changes
2. Zoraste: update wounds to include wounds_max for token bar linking + notes field for Gear + minor spelling errors + request for private rolls + contributed code for automating trait calculations
3. Fenrir: new layout was his work; full contributions in the API.

### Planned Releases

Next: Overhaul of inline dice rolls!

v2.0. Automate all calculated fields for performance and speed of character creation. 
    - includes automated calculation of traits
		DONE: conviction, corruption, resist corruption, passive awareness, resolve, defense, resilience, and soak
		TO DO: Influence and Attribute adjusted rating & Skill Total for performance (no new functionality)
				- when auto-calculating influence, need to allow the use of STR for Fel for influence for orks, and intellect in place of Fel for Mechanicus
	
v3.0. Redo NPC Layout with an order close to the core rulebook stat block. 
	- Create capability to enter values in place of auto-calculating (this will be a variant capability)

v4.0. Refine Inline rolls 
    - Add modifiers to each roll
    - a 6 = two successes

### Changelog

** July 28th, 2019: version 2.7 - Dice overhaul + fixes, updates, and enhancements** 

Updates:
1. Cosmetic change: changed all dice to D6; teal buttons roll wrath, black/gold/red buttons have no wrath die.
2. Cosmetic change: added spacing and thick dark teal line between psychic powers (PC and NPC)
3. Cosmetic change: changed all references to Combat Rolls to Rolls (PC, NPC, Vehicle, Voidship)
4. Cosmetic change: On PC Equipment sheet added thick dark teal line between vehicles and voidships.
5. Cosmetic change: made all areas for lengthy text entry two lines in height.
6. Cosmetic change: changed DN field for powers to text so values other than numbers can be entered - example is Defense.
7. Fix: corrected layout of Heavily Wounded at label and field for Vehicles and Voidships.
8. Update: Refined the inline dice rolls to now show critical on rolling standard pool and to show a critical when rolling a 1 on wrath die.
9. Update: Added option for Weapon Skill + Agility in weapons; this accounts for use of a Pistol in Melee where an attack roll is Agility + Weapon Skill.
10. New: Psychic powers now have an additional option to roll an alternative dice roll for shock, wounds, and mortal damage.
11. New: Added d66 to psychic powers.  Future enhancement will convert this into a Peril of the Warp result.
12. New: Added d3, d6, and d66 die roller on combat rolls for PC's and NPC's.
13. New: Added Memorable Injuries as a repeating framework - can capture multiple memorable injuries - to Personal tab.
14. New: Auto set rank title based on the selected rank; also automated to update existing character sheets.

** June 30th, 2019: version 2.6 - Fixes** 

Updates:
1. Fixed NaN error when rolling psyker damage.
2. Added Psychic Mastery as a hard skill on NPC's so Psychic power rolls are auto-calculated.
3. Added to all tests a wrath outcome when using the API die roller so that a new ability in the API is included - it lists outcome of the die roll.

** December 17th, 2018: version 2.5 - Fixes** 

Updates:
1. Fixed update to Conviction for older sheets.
2. Fixed voidship wounds current; which was pointing to vehicle wounds current.
3. Updated vehicle and voidship wounds to Roll20 standard of wound/wound_max.
4. Calculated Heavily wounded for Vehicle and Voidships.
5. Autoupdate old versions of charactersheets for vehicle wounds, voidship wounds, calculating heavily wounded for vehicles, and heavily wounded for voidships.

** November 4th, 2018: version 2.4 - API Message Layout Changes** 

Updates:
1. API calls to the Wrath & Glory die roller will now use a different layout; the labels are inversed and a slight tweak made to font settings.
2. API calls will now calculate damage.  The previous DR is replaced with a Damage label and it will show Total Damage and in Parenthesis DR & Successes.
3. Fixed a labeling issue in the inline dice rolls.

** October 28th, 2018: version 2.3 - Private Rolls & Background** 

Updates:
1. Added the ability to whisper rolls to the GM.  A checkbox at the top of the page allows all rolls on the page to be sent only to the GM. [Thanks to Zoraste for the suggestion]
2. Expanded background field to match RAW.  Background now includes defining trait (which can be custom) and a field for the benefit of the defining trait.
3. Automated calculation of traits: conviction, resist corruption, passive awareness, resolve, defense, resilience, and soak.  Note Mod fields were added for defense, resilience, and soak.  On the NPC sheet Awarness was added as a permanent skill.[Thanks to Zoraste for code provided for this capability]
4. Made Malignancies a repeating section to capture each malignancy seperate of each other.
5. Onload - first time loaders of this functionality will have their traits updated as previous formulas were changed.

** October 14th, 2018: version 2.2 - Enhancements & Fixes** 

Updates:
1. Fixed minor types [Thanks to Zoraste for the catch]
2. Fixed label on Persuasion roll - when rolled it said Persuasion Assist when it should have been persuasion.
3. Roll Glory now uses API or inline dice rolling.
4. Added hover text to skills for quick reference on use.
5. Removed woundscurrent and shockcurrent and added wounds_max and shock_max so token bars operate properly [Thanks to Zoraste for the suggestion]
6. Created script to update wounds and shock based on existing scores in woundscurrent and shockcurrent
7. Added a gear tooltip to the gear and assets for PC's [Thanks to Zoraste for the suggestion]
8. added a quantity field to gear [Thanks to Zoraste for the suggestion]
9. Auto calculate wounds_max and shock_max; wounds = modified toughness + tier + mod; shock = modified willpower + tier + mod.  Both shock and wounds will also calculate off of custom tier.
10. Added a Mod field to shock and wounds to update values from abilities, powers, etc.
11. Added check on tier; when not set to custom the value is changed to 0.
12. Added Lightly wounded value.
13. Auto Generate light and heavy wounded values.
14. Salvo needs to be a text field to allow for --; -- has specific rules implementations.  Field originally allowed only numeric characters.
15. If a psyker (added as a checkbox under keywords) and a weapon is a force weapon add 1/2 Base Willpower to DR.  If the character is not a psyker and the weapon is a force weapon -2 to DR. [Thanks to Morback for the suggestion]
16. For PC & NPC sheets: Onload of a character sheet with current version, automatically update all weapon DR's, corruption levels, wound, shock, light wounded, heavy wounded.

** September 23rd, 2018: version 2.1 - Fixes** 

Updates:
1. Fixed all attack rolls using the API (character, NPC, Vehicle, Voidship); the feed to the API was not subtracting a die for Wrath from the pool being rolled.
2. Modified Corruption line under mental/social traits to list level of corruption and DN per page 367 of core rulebook.
3. Added Resist Corruption line under mental/social traits after the Corruption Rating
4. Fixed Mission BP not being added to totals.

** August 20th, 2018: version 2.0 - Base Rule Alignment Changes** 

Updates:
1. Changed XP labels to BP and tweaked layout on the progression tab; still same effect.
2. Updated NPC Type list (added Elite and renamed Monster to Monstrous Creature).
3. Added Assets to Gear Label so now it is Gear & Assets.
4. Changed NPC Size to a drop down populated with the size categories.
5. Updated Tier to a dropdown and added a note section for ascension notes.
6. Removed Rank Bonus (redundant) and added the rank description as a drop down.
7. Added a custom field for Tier; the rules talk about GM's having tiers higher than 5.
8. Removed dice rolling for Passive Awareness and Wealth; neither have dice rolls per core rules.
9. Added Passive Awareness and Conviction to NPC's.
10. Added empty checkbox to weapons on both PC and NPC tables to track when you use your last reload and you have not emptied the weapon yet.  On the next complication or other event the weapon is out of ammo.
11. Added a seventh tab and reorganized content - Abilities, talents, and psychic power are on the 'Powers' tab; Gear & Assets, vehicles, and voidships will be on the 'Equipment' tab; objectives, background, malignancies, and alliances are on the 'Personal' tab.
12. Moved ascension notes to the Abilities tab as an expanded note by Tier.
13. Added section for entering psychic powers.
14. Added a section for listing multiple vehicles and voidships under Equipment for PC/Adversary view.
15. Added section in Powers for Psychic powers with the ability to roll a test, push the test, and roll damage.
16. Added a new column to skills with an assist roll; assist rolls do not include wrath dice.
17. Created a view for vehicles and voidships; these views include fields for entering a pool of dice for rolls. Players can also make the appropriate tests from their character sheet.

Note:  No existing attributes were changed or removed.  Existing functionality was expanded.

Fixes:
    1. Toggling of Use Inline Dice vs API.  When checked and then unchecked, every time the sheet would be reopened it was defaulting to checked.  It should open to the value it closed on... checked or unchecked.

** July 26th, 2018: version 1.0 submitted to Roll20** 
- resubmitted on August 6th due to roll20 packaging error.

### Known Issues
1. Inline rolls do not show two successes on a 6 and die modifier is not added; this functionality is not core within the Roll20 capabilities and an expanded formula needs to be created.
