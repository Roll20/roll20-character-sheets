# 2025-12-18

- Make spells on Other Realm & Arcane clickable
- Add restricted parry option.

# 2025-12-11

- Add option to allow overcasting anytime. (Sheet version 17)

# 2025-12-04

- Add XP on journal item add with XP
- Fix for spells target numbers using traditional target numbers.

# 2025-12-02

The post thanksgiving feast release

- Add Journal version 1.  Track events in the game
- Add support for Journal calculated XP
  - new option to enable at character creation
- Add support for xp variations (Game option)
  - RMU
  - Milestone (1 xp -> 1 level)
  - RMSS / RM2
  - OSE 1k/2k variants; great for people wanting to do quick conversions
- Add support for fixed RR bonuses: 50 + 2 * level (Game Option)
- Spell casting for creatures (just the list click)
- CSS fixes:
   - Fix some missing ; in rules
   - Work with newer VNU
   - Filter out oklab errors

# 2025-11-07

- Add more details on Initiative rolls
- Add table roller to creature sheets
- More details for modified quickness bonuses

# 2025-11-04

The where-did-november-come-from release.

- Show DB info for calculation
- New game options
  - Reduce DB bonus to 1x Qu instead of 3x
  - Only use running Ranks for partial/full dodge
- Display options on status pages
- Add stat roll counter (from $redacted)

# 2025-10-30

- Fix issue where items were not being filtered out correctly on updating inventory.
  - Filter pattern was reversed.  Thanks to @alpinecowboy2.

# 2025-10-28

- Add target to token actions
- Races.js -> Galvinise it first.
- Add a HP Info box
- Sheet version updated to 15
  - Move Racial Hits bonus to hp_misc
  - Fixes issue where characters got Racial Hits as a bonus to Endurance.
    - Thanks @frewfrux for the report!
  - Force update to udpate Endurance, body dev and hp
- Add hp_info & display it
- Creation: Save HP in base hits
- Fix display of current phase when ending a turn
  - Thanks @saramund for the report!

## Compendium:

- Banecroft:  Add descriptions to the heros and BBEG
- Arcane:
  - Knacks for Arcanist & Archmage: All professions have knacks & costs now
  - Fix Witchblade base lists to remove warnings
  - Arcane: Places of power nearly done

# 2025-10-21

- Injuries:
  - Ignore spaces in the injury string
- Misc: Add support for prefix search
- Skills:
  - Add backend support for Character Companion Specialised skills
- Banecroft:
  - Fix an NPC weapon
  - Fix an NPC spell list
  - Update creatures on maps
- Arcane: Spirits update

# 2025-10-14

- Remove spurious ` in the sheet
- Fix some dependances hiding some old updates
- Fix "agibberish" -> gibberish
- Allow attacks to not have the numeric size
- Add table roller support for Spell failures

# 2025-10-04

- Fix display of scaled hits.
- Reenable base spells during levelup
- Get rid of spell lists errors
- Banecroft:
  - Fix creatures defenses
  - Fix Giant A<redacted> attacks
- Fix template for spell lists to display notes
- Arcane:
 - Start on Arcanist list
 - Costs for Arcanist & Evoker
- Add Tap Addiction to sheet

# 2025-09-23

- Creature Law (new upload)
  - Fix level variance in listing
  - Fix Variance in listings
  - Fix variance in display
- Banecroft (new upload)
  - Adventure text uploaded
  - Creatures updated to new standard
  - First Tokens created
- Validation
  - Support Body,Head,Arms,Legs format for AT
  - Validate attack sizes for creatures
- Stuff: Fix error in itemmaterial not saving
- Levelup: 
  - Don't try and levelup current_level/new_level
  - Spell lists show the group
  - Recreate previous skill ranks correctly
- Misc: Make one of the errors more verbose
- Spells: Fix display of mixed armor penalties
  - calculation was correct, display showed culmulative error
- Create: fix highest message (@ixs)

# 2025-09-18

- Fix stacking of the overlays
- Show token marker otpsions corrently
- Fix edit stats
- Updated preview image.

# 2025-09-16

- First version of token markers
  - Sheet options
  - Random colours
  - Trigger on status change.
- Fix stacking of popups on main page
- Add helper to get total number of bleeds
- Add options for token makers
- Add options for FX (doesn't do much)
- Export to NPC now grabs spell lists.
- Inventory (Stuff)
  - Fix Helmet perception penalty trashing other modifiers
  - Apply Armor DB
  - Removed Armor DB & Perception penalties when you remove items
  - Fix for armor losing it's encumberance.
  - Add support for "Sets" Armor without a helmet
  - Add armor material to edit window
  - Correctly support mixed material encumberances (metal != non-metal)

# 2025-09-11

- Try and get the info popups working again.
- fix spurious --> from the rolltemplates page

# 2025-09-09

- Can now roll weapon fumbles direct from the sheet.
- Remove the old Roll Crit buttons
- Add `statuspercent200`; which ranges from 200 -> 0 as your penalties go down
- Set sheet version to 14
- Fix the light crossboX.
- Fix rolling Y/Z criticals.
- Layout improvements on the front tab - little boxes around all the things.
- Dice icons:
  - Fix layout to be consistent everywhere (finally)
  - Use single style for all the dice icons
  - Fix alignment of the dice on the skills page
  - Little animation when you hover... because you can do that when sort
    the other stuff.
- Attacks:
  - Move overlay to own file
- Fix missing line break in rolltemplate.

# 2025-09-04

- Force statuspercent_max to be 100.

# 2025-09-02

- Allow Injury strings to start with "Injury: " to make pasting easier
- Status:
  - Add 'statuspercent'; Equal to (100 - statuspenalty).   Used so you
    can have a penalty bar that goes down as PCs/NPCs get injured
  - Add allpenalties; status effect + status penalty
  - Add a little bar to show it.
- Tokenbar: Bar3 now follows 'allpenalties'
- Bump sheet version
  - Force an update of penalties on load.
- Support Arcane spell casting modifier

# 2025-08-28

- Fix attacks missing othermod/parrymod

# 2025-08-26

- Creatures
  - Take AP penalties on attacks
  - Arcane RRs for new creatures
- Force RR update to get Arcane RRs for PCs
- Sheet Load / Init
  - On version check, pass in sheet version
  - Make sure we check pending functions
  - Version 11
  - Old creatures, force arcane update
- Levelup
  - Save the current and new level.   Avoids lots of async code to fetch it many times
  - Display as a hidden text entry.  So works with jumpgate and traditional.
  - Skills are now resiliant to unexpected fields
  - Add some space on the left of items.  So much prettier.
  - Re-enable the levelup summary.
    - ~700 lines of tests on this thing
  - Summary now has:
    - Skills
    - Stat gains
    - Talents
    - Spell lists
- Tests
  - setCharmancerText is now emulated
  - addRepeatingSection is now emulated
  - Fix second countrStatGains test being ignored.

# 2025-08-22

- Emergency release to fix level up.
- Disable the levelup summary which was most... broken.

# 2025-08-21

- Fix parrymod and other(ob)mod for creatures
- Show aptrack (the AP box) in the 4th box

# 2025-08-19

- Display bonus when using 2 handed weapons
- Add RRs for Arcane
- Creature Skill roll updates
  - Use the specific table when we can
- New UI for critical rolls.

# 2025-08-12

So after a short vacation... updates again!

- DB:
  - Add a DB Modifier - straight DB addtion (about 20 people have asked for
        this, sorry it was so slow).
  - Automatically update the DB Defense mode when it updates
  - Autoamtically update DB when other fields change too
- Update some specialisations for new books
- Directed Spells use AP correctly when attacking
- AP tracker displays (mirrors on Spell page)
- New combat clears the 'free used' button
- Automatically load missiles when using AP track.
- Option for 2 handed weapons - add +10 bonus for them
- After attack options - do things automatically after you attack
  - Do nothing
  - Clear AP
  - Clear AP & End turn

Known issues:
- Specialised skills are not showing correctly in levelup
- Refresh target isn't working correctly

# 2025-07-22

- Fix potential bug creating characters not using custom races.
- Optmise race creation; so it's like 400 times faster.
    - Single get and set
    - Don't call multiple requests
    - Correctly nest pending calls
- First version of PC -> NPC generation.
- PC token setting attempt #863.
- Reorg some of the code to make it easier to find things.
- Dont' trigger potential race conditions updating proficiency bonuses.

# 2025-07-17

Thursday updates?  A very weird Tuesday

- Remove the old Race name translations.  Unused.
- Custom Race support.

# 2025-07-10

The Thursday little bug edition

- Fix old 'condole.log' problem with ranged weapons (alpinecowboy)
- Fix ranged weapon penalties applying to everything (!)
- Fix partial block not being set (Major Havoc & others)
- Enable Primary/Secondary attack token actions
- Enable End Turn token action

# 2025-07-08

- Use ISO 8601 for dates.
- Action tracking improvements
   - Use a drop down instead of multiple actions
   - Use a single AP track
   - Many more actions
   - Up to 20(!) phasee support
- Add token actions for AP tracking
- Creature data update
- Investigate Beacon -> no go

# 2025-7-1

Pre-Birthday release!

- Fix versioning past version 7
- Fucus -> Focus
- Mental Fatigue/Endurance:
  - Calculate the value
  - Add a die roll button
- Update feats of strength
- Async (Internal)
  - Add a warning if code double calls the async procedures.
  - Discover there are literally hundreds of places it's called.. *sigh*
- Inventory:
  - More async of methods to make sure we don't double call
- Attacks:
  - Make one attacks update async
- Skill updates all linear now (no double calls, should be faster)
- Update DB is now async
- Errors
  - Keep an error count, and fix formating of last errors.
- Arcane realm stat
- Basic TP support
- Creatures now set fields bars correctly:
 - Green: HP
 - Blue: PP
 - Red: Status (total penalty)
- Tracker can now target creatures (not super useful yet)

# 2025-6-24

- Fix Training Packages title
- Make training package tab actually clickable
- Generate correct list of levelup skills for levelup summary.

# 2025-6-17

- Fix a bug with Critscaling sometimes corrupting the critical
- Move pack carried up a bit
- Powerlevel change selector: Fix the event handler to work
- Make onCheck more specific about changed values
- Fix DB not updating after encumberance or shield change
- Charactermancer: Fix some cultures not toggling the specialisation
- Kill the old purchase.js which was still being loaded!?
  - Removes a whole pile of the load time errors.

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

