# WH40k Wrath & Glory (Advanced API) Character Sheet

This is a multi-purpose sheet for both characters (default view) and NPC's based on the quickstart rules (subject to change).  

This Wrath & Glory character sheet provides dice automation for inline dice rolls for any user and is integrated with the Wrath & Glory dice roller API for mentor level gamemasters. 

Please note that the inline dice roll macros do not fully enable the type of dice rolls made in the Wrath & Glory system.  Users will need to hover over the inline roll results to count the number of successes (4 or 5 = 1 success; a 6 = an exalted icon that may be shifted to 2 successes); the inline rolls do not allow for counting if a 6 is = to 2 successes.  At this point it does not add modifiers to the rolls for inline dice.

If you have any questions, comments, or feedback (all welcome) please contact Barry at btsnyder@gmail.com

### Current Version
Version 2.0 (August 20th, 2018) 

### Thanks	
Many thanks to my players (Dave, Brian, Charles, Matt, and Tyler) for their patience as I evolved the sheet and die roller (sometimes in the middle of play) over the past several weeks.

### Planned Releases

v3.0. Redo NPC Layout with an order close to the core rulebook stat block. [early September]

v4.0. Refine Inline rolls [late September]
    - Add modifiers to each roll
    - a 6 = two successes

v5.0. Automate all calculated fields for performance and speed of character creation. [October]
    - includes automated calculation of traits
    - validate impact on NPC where the same fields are not RO
    - when auto-calculating, need to allow the use of STR for Fel for influence for orks, and intellect in place of Fel for Mechanicus

	
### Changelog

** August 20th, 2018: version 2.0 - Base Rule Alignment Changes** 

Updates:
- Changed XP labels to BP and tweaked layout on the progression tab; still same effect.
- Updated NPC Type list (added Elite and renamed Monster to Monstrous Creature).
- Added Assets to Gear Label so now it is Gear & Assets.
- Changed NPC Size to a drop down populated with the size categories.
- Updated Tier to a dropdown and added a note section for ascension notes.
- Removed Rank Bonus (redundant) and added the rank description as a drop down.
- Added a custom field for Tier; the rules talk about GM's having tiers higher than 5.
- Removed dice rolling for Passive Awareness and Wealth; neither have dice rolls per core rules.
- Added Passive Awareness and Conviction to NPC's.
- Added empty checkbox to weapons on both PC and NPC tables to track when you use your last reload and you have not emptied the weapon yet.  On the next complication or other event the weapon is out of ammo.
- Added a seventh tab and reorganized content - Abilities, talents, and psychic power are on the 'Powers' tab; Gear & Assets, vehicles, and voidships will be on the 'Equipment' tab; objectives, background, malignancies, and alliances are on the 'Personal' tab.
- Moved ascension notes to the Abilities tab as an expanded note by Tier.
- Added section for entering psychic powers.
- Added a section for listing multiple vehicles and voidships under Equipment for PC/Adversary view.
- Added section in Powers for Psychic powers with the ability to roll a test, push the test, and roll damage.
- Added a new column to skills with an assist roll; assist rolls do not include wrath dice.
- Created a view for vehicles and voidships; these views include fields for entering a pool of dice for rolls. Players can also make the appropriate tests from their character sheet.

Note:  No existing attributes were changed or removed.  Existing functionality was expanded.

Fixes:
    1. Toggling of Use Inline Dice vs API.  When checked and then unchecked, everytime the sheet would be reopened it was defaulting to checked.  It should open to the value it closed on... checked or unchecked.

** July 26th, 2018: version 1.0 submitted to Roll20** 
- resubmitted on August 6th due to roll20 packaging error.

### Known Issues
1. Inline rolls do not show two successes on a 6 and die modifier is not added; this functionality is not core within the Roll20 capabilities and an expanded formula needs to be created.
