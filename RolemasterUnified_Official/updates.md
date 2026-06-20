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
