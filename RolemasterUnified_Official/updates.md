# 2026-10-22a

- Add `attr_fix` to work around an issue in Roll20 characters.

# 2026-10-22

- Add Arcane spell failure
- Rearrange non-async code from rmuasync (moved to support)
- Fix test dependencies to be more explicit
- Spells:
  - Fetch trickery & grace when casting spells
  - Fix for total not being defined (again, rare error)
  - Add a basic test for spell casting.
  - More strictness in the spells page.
- Fix attacks with strict

# 2026-10-20

- Add Arcane average option to the options in game
- Stats
  - Add a "Realm Stat" on the character sheet.  Like Will it's a phantom
    stat, but having it clear is useful for Hybrids and Arcane users
  - Kill the stat cache.  Now stuff pulls directly
  - Stats automatically update from dependencies.
  - Add a stat refresh button
- Inventory Add Type (the toggle for the of item to add).  Fix handler so it toggles correctly.
- Test Harness
   - Handle multiple watchers on the same event.
   - Trigger handlers when an attribute is changed.
   - Handle triggering repeating section events.
   - Handle repeating sections.
   - Handle custom roll parsing.
- Add standard suffixes for things like misc or bonus.  Avoid typos.
- Skills update from dependencies.
- Make PP Dev a special skill
- Remove rmuSafe - seems like a failed idea.  Test better is the right solution.
- Handle having pp multipliers with no PP
- Handle invalid stats in skill updates
- Grace & Trickery handled specifically for spell updates
   - No longer rebuild everything for these.
- Add new version of updateSkills & updateCategories
   - Add test that every category updates.
- RRs
  - Can edit RRs miscbonus on sheet
  - Show hybrid "realms" RRs
  - RR & RR test now JS strict
  - Updated dynamically
  - Fix bug with hybrids
  - Complete tests of nearly all realms
  - Add refresh button
- Fix Mental Focus and Endurance functions
- Fix a couple of (rare?) bugs in async
- Fix for rare bug in injuries (race condition)
- Fix for rare bug in tracker (race condition)
- Fix for rare bug in talents (race condition)
- Show refresh counter for stats/skills
- Removed used hack to get messages
- Fix some race conditions in Edit.
- Streamline version update process.
- Fix build for RR changes.
- Fix Training Packages needing a "Summoning" skill.
- Levelup
  - Fix a case were level could be shown as undefinied
  - Remove pending on level/xp change.
  - Use Roll20 dice roller to roll stat gains
  - Report stat gains to chat (uses /whisper)
  - Fix clear uses to not use a global.
  - Show spent DP on the levelup summary page.
  - Stat gains now counts organic + purchased stat gains.
- Spell Mastery shown in info popup

# 2026-09-29

- Fix for options on the sheet


# 2026-09-17

- Add {Acid|Mana|Void} {Ball|Bolt} to weapon attacks.
    Probably not helpful unless you own Arcane
- Add bone & other as item materials

# 2026-08-??

Fix RR Popup @snowdragon

# 2026-08-21

Fix an issue causing creature DB to be trashed.  Simple fix while I rewrite all
the DBs.

# 2026-08-03

Post GenCon updates.

- Updates to some of the options.  

# 2026-07-30

- Another attempt to hide initiative tracker on PC sheets

# 2026-07-28

The pre-Gencon release.  Been a while with other things.  

- Add a button to hide the initiative tracker on PC sheets
- Partial secret support
- Add basic fighting style support
- Fix TP tests

# 2026-06-16

- Add edit notes to the creature sheet
- Fix burrow / tunnel
- Crawl pace is shown for the currant AP/phase

# 2026-06-11

- Add ability to edit initiative modifiers.

# 2026-06-09

- Fix issue with profession bonuses not saving correctly
    for newer professions.  Report an error if not found. (@aerius9432)
- Fix for specialized skills not having a mod popup. (@snowdragon)
- Fix magicAL ritual not working correctly in creation for some professions
  - Handles both correct and bad case
  - Got rid of a later check that did not work either.
  - Fix Seer & Astrologer costs for rituals
- Create: Kill an async for setting some initial properties.
- Create: Fix for many stat options (3 or more).
- Handle stride of 0 for races.

# 2026-06-04

- New spell loading system:
  - All pure Roll20 calls: Doesn't use the the RMU Async
  - Faster, lots, non-blocking
  - Use the save state structure instead of something unique
  - Handles Aspects from Arcane
- Arcane:
   - Aspects now display all fancy like.
   - Arcane users select aspects during creation
- Remove a spurious print
- Add more 'use strict';
    - Fix a spurious global write of prefix, nameid
    - Fix a lot of bad for loops that wrote to globals
- Make spell update fully async.
    - Should be faster
    - Removes some async/pending errors/warnings
- Training Package have purchase button (unlinked)
    - Toggles on/off based on completion
    - Fix some Training Package skill names

# 2026-06-02

- Spacer for popups in skills
- Header for Combat styles
- Unhide some skills:

# 2026-05-27

- Reset drop data after a drop.
- Alt XP

# 2026-05-26

- Update of build process to handle a new version of VNU.
- Expertise can now be special for a skill (instead of just true false).
   - Power development is now special.
- Add option for average realm stats.
- Signature Style edit box.
- Tracker:
  - Slightly improved error handling.
  - New combat button re-enabled.
  - Deleted old 'next init' which was 100% useless and wrong.
  - Attacks work for creatures.

# 2026-05-05

- Injury string fix missing ')'
- Training Packages:
  - Add 'grants' dropdown

# 2026-04-21

- Bugfix: When raising to average stat; set potential correctly (@snowdragon)
- Round weights of manually added items to 1/10 of a unit, not the whole unit (@snowdragon)
- Training Packages
  - Sheet can now validate all known Training Packages
  - Handle bad Training Packages
  - Sort Training Packages by %/fulfilled/name
  - Change button to "Show Progress".
  - Show description and toggle
- (Character Companion):
  - Data for all skills and Training Packages imported
  - Show human readable descriptions

# 2026-04-13

- Custom Cultures
- Directed Spell -> Directed Spells
- Creature movement changes:
  - Now use fixed fields
  - Update to version 20 brings it in
  - Hide useless fields.
- Update BMR: Don't touch creatures for now.
- Tracker: Fetch BMR for creatures (and PCs)
- Training Packages: Some refactoring; test smaller parts.

# 2026-04-09

- Add _Improved Parry_ and simplify it and restricted parry
- Remove some silly parry messages.
- Staggered only applies to skill rolls for single AP phases.
- Remove -300 penalty for staggered.
- Show a message when ignoring stun.
- In Charactermancer, fix baselist back to go realm (not profession).
- Full support for power levels:
  - Correct number of stat options.
  - Raise temp/pot to correct value.
  - Show temp/pot on the stats page in create.
- Add initiative_misc field (needs to be edited).
- (Partial work on custom cultures - disabled for now as it is not yet complete)

# 2026-04-07

- Fix error during creation on the knacks page.
- Add support for 0 ranks PP development (Arcane).
- Translation: Insert skills as themselves to avoid translation warnings.
- Logging to detect pending reentrancy bugs.
   - Confirmed it happens.
   - Fix to force correct character.

# 2026-03-19

- Fix some typos in skills
- Tracker
    - Add a d1000 tiebreaker to tracker initiative
    - Add new initiative sorting function (w/tests)
    - Add End of Phase marker
    - Little explosion when it's your turn.
    - Send a message on your turn
- Make the main page viewable in dark mode.
    - Happy to take improvements to the colours
- Sort names of creature weapon attacks (so they don't change every release)

# 2026-02-05

Lots of tracker updates
- Fix delete in the new tracker
    - Set icon to safe default
    - Put it at the bottom
- Add a toggle to hide/show created characters
- Fetch the inuse items when adding ones
- Add item for hte inuse item
- Hide unused tracker templates
- Correct message when adding to tracker
- Add tracker to PC sheet
- Add toggle to hide PC trackers
- Initiative button rolls initiative; and sends to pc sheet
- Add 'next' button to advance initiative.

# 2026-01-27

- Refactor the status boxes for grapple, staggered, stun
- Show grapple correctly
- Have a delete grapple button

# 2026-01-22

- Add BMR Crawl to front page.
- Tweak colors of the subbox on the tracker page

# 2026-01-20

- Show PP Mulitplier on front page
  - Attribute is pp_multiplier
- Show height in feet'inches, inches and cm.
- Updates display of height on change
- Sheet version -> 18; upgrade height on load
- Fix initialisation setting vesion instead of version
- Tracker:
  - Better layout
  - Read NPC attacks
  - Read parry/db etc from PCs and from tracker
  - Make attacks from tracker.
- Inventory: Fix appearance of accordian


# 2026-01-15

(went live on the 16th)

- Add tracker back
- Add general "asCharacter" helpers
- Tracker:
  - Can add data using new as character
  - Characters now remember their tracker
  - for All Characters methods to tracker
  - Tracker can set everyones AP/round message
  - Tracker can roll everyones initiative (not to turn tracker though)
  - Track base attributes
- Add option for non-tracker initiative.
- Clean up build so compiled/processed files go to build

# 2026-01-08

- Fix for creatures max PP
- Fix fetch for targetted creatures
- Partial fix for grapple

# 2026-01-06

First update of 2026.

- Expand rmuSafe to make errors harders to make
- Add Void & Mana Crit types (Arcane)
- Add Void and Mana balls and bolts
- Add Acid ball/bolts
- Sleep:
  - Show dialog for sleep
  - Heal hits based on hours
  - Restore PP based on hours
  - Lose PP if over limit
  - Send message to the chat
  - Do a little glow effect.
  - Check that all injuries are treated before sleep
- Injuries:
  - Calculate the dailyrecovery for injuries
  - Show daily recovery for injries
  - Heal injuries penalties on sleep
  - Remove injuries with no penatlies
  - Add a button to refresh injuries
- rmuSafe:
  - don't check repeating sections (for now)
- Sheet: Disable print button.  I've never got it to work
- Fancy new edit button on character sheet for attributes on the main list.
  - Points
  - Age
  - Appearance
  - etc...
- Can now edit varous creature properties:
  - Creature stats (visual change only)
  - Creature level (again, visual only)
  - Attack: OB, size and type (full updates)
  - Hits
  - AT
  - Base DB (others calculated normally)
- Make creatures use the same frame style as characters
- Fix an issue where using more than 1 AP per phase, staggered blocks attacks
    (@JC Farlan, this is for you).
- Hack to try and make loading a little faster.
