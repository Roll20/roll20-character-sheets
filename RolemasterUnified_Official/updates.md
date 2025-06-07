# 2025-6-3

- Attacks Edit
   - Restore the attack table correctly
   - Option for attack crit scaling
   - Be more liberal in letting attack edits.
- Encumberance:
   - Move to single % encumberance, not 5 increments
   - Fix problem with negative weight allowance.
   - Update weight when items are deleted always
- DB
   - Fix issue with partial block - hopefully for real this time
   - Include parry in DB
   - Add enhanced and restricted parry
   - Placeholders for Flatfoot and Surprised
   - Update when encumberance penalty changes.
- Add support for manually adding description only talents
- Add a space for unusual events
- Fix a typo arkness -> darkness
- Fix for creatures display for level, level variance and size
- Internal
  - Ignore more stuff
- Add placeholder for called shots and parry mods.
- Show last 3 errors
- Add ability for attacks to adjust criticals up and down
- Creature Law:
  - Fix layout of inline creatures in Creature Law
- Attacks/Targetting
  - Don't fetch tokenid, it's not useful
  - Refresh based on name
- Creatures
  - Publish perception as a special skill for creatures
  - Placeholder for power level scaling.

# 2025-5-27

- Update weapons to match current Creature Law
- Gracefully ignore invalid weapons
- Update Spell Law spells to use JSON - ready for new uploads

# 2025-5-20

- Creatures now go down at 0, not -1
- Save Item strength correctly (I hope)
- Fix encoding of Essence's Perceptions
- Fix some partial block errors.
- Dropping a Creature on a character won't turn you into a character (Major__havoc)
- Fix some attack messages.


# 2025-5-13

- Fix specialiszation and favourites
- No stun is now a single round of stun 25.
  - Add test for it
- Fatigue penalties are ignored for '*' crit resist ($#*)
  - Add test for it
- If your fatigue injury passes 50, apply as a general penalty
  - Update tests for it
- Creature Law:
  - Added '\*' to creatures not impacted by fatigue penalties
  - Added a new index for Type/Class I/II/III/ETC
 
# 2025-5-8

Midweek release for something different.

- Inventory
  - Allow saving of Armor again
  - Show notes when editing
- Attacks
  - Toggle appearance of additional crits correctly
  - Persist extra crit, and allow it to be edited

# 2025-5-6

- Inventory
  - Fix for items not saving strength (thanks @nlbsanarak)
  - Persist and restore materials correctly
  - Start saving DB bonus for Armor and OB for Weapons
  - Style all the drop downs
  - Weapons
    - Add attack table
    - Add attack size
    - Add attack skill
  - Manually aded weapons now populate attack table
  - Materials no longer joined by ','
- Fix for null pointer error during version update.
  - Force a version bump to 9 to run it again.
- Attacks
  - Make layout a little clearer - bold ftw
  - Add materials interface
  - Edit materials
  - Add additional crit field
  - Use fancy selects in the drop downs for add attack
  - Show weapon mateiral
  - Remove some dead code
  - Materials now in Injury string and are sent to the defender
- Fix non-1 pbonus for specialised skills
- PBonus message improvement

# 2025-4-29

- Hide the inventory add/edit box on sheet open
- Inventory add/edit:
  - Enable editing
  - Fix saving data
  - Save Armor and shield properties
  - Add OB Bonus for weapons
  - Add item strength
- Can now delete skill specialisations (Many, but most recently Osaran / @nlbsanarak)
- Spells:
  - Generate the correct RR targets for spells (@rdanhenry & @twistor - thanks!)
  - Armor Enc% fix for Channelers.  Sorry Channelers  (@major__havoc)
  - Allow overcasting instant spells with no prep (@coreylpierce & @jdale)
- Stat gain: Fix the message.
- Skills
  - Allow Pbonus != 1. (@ixs)
  - Fix the calculation for 27 (and only 27) ranks being wrong (@nlbsanarak thanks)
  - Add tests for skills bonuses;
    - Check 0,1,2,11,21,27,31,41 & 101 are correct
    - Check each rank is strictly greater than the previous
- Fix concentration tracker with a new dot
- SWRaces Coversion Guide
  - Fix for heights and weights
- Races: Update template to be a bit mroe verbose on heights/weights
- Tracker:
  - Update the way movements are displayed.
  - Show 'Okay' if no status messages

# 2025-4-22

- Typo updates
- Display current status as the current impacting status
- Update stun/stagger/etc status immediately
- Separate updating status end ending turn.
- Update status after injuries are applied immediately
- Fix a bug where you could only bleed once per turn.
- Creature
  - Default tokens for all Creature Law 1 Creatures
        Thanks to Grim!
  - Display and Implemente Crit Immunities.
    - Sorry to players
- Inventory
  - Add placeholders for weapon materials
  - Work on item edit (not complete)

# 2025-4-15

- Fix some typos in the skill roll messages.
- Fix crit roll lookups.
- Fix subtle penalty Channeling/Mentalism.
- Status and Injury penalty names were sometimes inconsistent.
    - Move to statuspenalty and injurypenalty everywhere.
    - Transitory data, so should not impact anyone.
    - Fixes issue where penalties were not applying to attacks.
- Treasure Law:
    - Fix sizes on some weapons.
    - Correctly specify attack tables on weapons.
- Attacks:
    - Add a button to remove target.
    - Fix styling of the target drop downs.
- Staus
    - Add a button (three actually) to remove stuns
- Creature
    - Content complete
    - Unscale creature hits.

# 2025-4-1

- Fix for the stat abbrievations used in skill summaries
  - Add test too
- Spell message nits:
  - Remove the trailing . in the PP message
  - Fix unbalanced brace in message for grace
- Uses; clear per level count on level up
- Remove purchase module.
- Skills:
  - forEachSkill has a completion callback

# 2025-3-25

- Tracker now shows skills correctly.
- Creature Law: Template for Encounter Tables
- Creature Law: Finish template for creatures
- Treasure Law: Add will stat bonus
- RRs: Swap the two RR rolls to be consistent with other stuff
- RRs: Fix use of sub attributes
- Skills; Fix uses for skills with specialisations in level up
- Uses:
  - Taking injuries tickles a use of 'bodydevelopment'
  - Casting a spell tickles a use of 'powerdevelopment'
  - Total uses >= Current uses (for new ones)t
  - Display correct global counter for uses.
- Roll/Lookup crit: Handle scaled crits a lot better.

# 2025-3-18

- Add whisper toggle - GM or Public
- Add whisper toggle to basically every roll in the game
- Tracker:
  - Add a return to charactersheet
  - Send skill data (not shown yet).

# 2025-3-11

- Lots of tracker updates.  Still not ready for primetime (but should not break anything)
  - Basic layout
  - Notes field
  - Refresh
- Othermod/parrymod now on the creature sheet
- Sync othermod/parrymod 
- New combat clears othermod and parrymod.

# 2025-3-4

- Defenses for creatures on Land, Sea and the Air (and climbing)
- More spells formats for creatures
- Creatures talens now line break.
- Show defense bonus for the dfense dropdown
- Creatures can have shields (with passive dodge too)
- Can now 'refresh' data for creatures.
- Tweak layout of the fancybox so it has less margins on the sides.
- Uses now works with specialised skills - not implemented all over yet
  - Track Grace & Spell Trcikery
- Start of Level Up review:  Show stat gains for now.
- Fix use of Total/Ranks/Uses in charactermancer.  Cleans up Dark mode a bit
- Add a usecounttotal; so total number of rolls for a character total
- Show usecount for normal skills

# 2025-2-25

- Edit attacks
- Remove pre-compendium culture support
- Support better DB and targets for creatures
- Support better DB for characters
- Use count for transcendance (had armor and casted a spell);
- Creatures:
  - Parse ranks for movement skills correctly
  - Use specialisation for specialised skills

# 2025-2-18

- Add all the specific static manuever tables from Core Law. 
    Thanks to @grim5352 for the tables.
- Add shield bash to known attacks
- Start of Uses counting: Count use of normal skills.
- Fix specialisation bonus - Use 0 ranks or highest - 25.
- Reneable initiative buttons.  Actions buttons need to have type
    'action'.
- Fix specified crits
- Add F->J & X,Y specified crits too
- Add Fate Points - Just a simple text box (@coreylpierce)
- Fix for creating specialised skills during levelup.
- (Creature Law) Update parsing of crit reduction and other resistances.

# 2025-2-11

- Fix the stupid problem where buying Specialised skills
    caused them to be duplicated.  Was only with culture ranks!
    Big thanks for @rdanhenry for helping me nail it down, along with
    (in no particular order) @adsmalley, @dudimous, @ixs, @grim, @nefrekin,
    @bambo and probably some others I've forgottem
- Handle multiple criticals from the same attack.
    - F-J crits now handled.
    - This is a big set of changes through this parsing code
    - Designed to also support "addional crits"
- Injury
    - Now has tests.
    - Support for multiple H (hits) in the same string.
    - Adds a 'Z' on hits only attacks
    - Handle duplicate any attribute.
- Make the initiative button big and green (@everyone apparently)
- Added 'Class' to creatures;  can search for Class:III creatures now
- Don't set 'workpending' attribute - stops a lot of warnings
    and it did not work anyway
- Tests for fetching Criticals.
- Start on Training Packages
- Template for custom currencies.
- Remove some old cruft from the todo.

# 2025-2-4

- Creatures: Validate attacks for all listed attacks.
- Correctly adjust attack size
- Change display of attack size for creatures.
- Add meditation to attack skills.

# 2025-1-21

- Creature: Handle Level correctly on dropped creatures.
- Dark Mode updates - closer to useful
- Creature layout updates.

# 2025-1-14

The wait... it's already halfway through January update!

- Knack selection now respects power levels.
    - Stil don't support 'set to average' and # stat boosts
    - Coming soon
- Knack and Profession Bonus won't continue until you select all items in
    charactermancer.
- Subtle now works for 'A' spells (0; it's not really a thing that happens)
- Always apply armor casting penalty - even if you don't have transcendance
- Update treasure law armor to include material
- Armor: Make sure we use the material if supplied
- Fix armor metal vs other materials
- Make sure ranged penalty is always a penalty
- Creatures now roll $Realm RRs, not 'undefined RR'
- Partial Dark Mode; not quite usuable, but you can look.
- Custom professions
  - Save weapon costs correctly.
  - Save the correct Knacks/profession bonuses
  - Fix level up spell lists (improves Roll20 Characters too)

# 2025-1-7

- Custom profession support.
  - Documented: https://github.com/nashidau/RMU-Interchange/blob/main/Profession.md
- Improve the styling of buttons & selected
- Update to creatures.  Not so visible to most users as of yet.
- Can now select 'no swap' for stat swaps at creation (@rdanhenry)
- Sort spell lists in charactermancer (@rdanhenry)
- Add 'C' to Urban survival.  C is City/Civilisations.
- Force reset of any background jobs at the start of the charactermancer finish.
- Save powerlevel (@rdanhenry)
- cleanups:
  - remove old dead rollstats2 call
  - Pending info now returns count

Also all the items in the 24th update:

