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
