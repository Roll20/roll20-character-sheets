# 2026-01-08

- Fix for creatures max PP

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
