# Dresden Files Accelerated — Roll20 Custom Sheet

## Files

| File | Needed for your own game? | What it is |
|---|---|---|
| `sheet.html` | **Yes — required** | Sheet markup, roll template, and sheet workers |
| `sheet.css` | **Yes — required** | All styling, scoped under `.charsheet` |
| `sheet.json` | No | Metadata, only for publishing to the Roll20 sheet repo |
| `translation.json` | No | i18n labels, only for publishing to the repo |
| `STUNT_COST_REFERENCE.md` | No | Pricing guidance for homebrew Stunts (reference reading) |

For a private game you only need **`sheet.html`** and **`sheet.css`**.

## Install (existing game, switching to this version)

1. **Back up first.** Open **Game Settings → Custom Character Sheet Layout**.
   Copy the entire contents of the existing **HTML Layout** box into a text
   file, and the **CSS Style** box into a second file. Roll20 keeps no version
   history on these boxes — this is your only way back.
2. Make sure **Use Custom** is selected.
3. Open `sheet.html`, select all, copy, and paste into the **HTML Layout**
   box, replacing what's there. Paste the *whole* file — it contains the
   markup, the `<rolltemplate>`, and the `<script type="text/worker">`
   block, and all three are required.
4. Open `sheet.css`, select all, copy, and paste into the **CSS Style** box,
   replacing what's there.
5. Click **Save Changes**.
6. Fully reload the Roll20 tab (Ctrl/Cmd-R). Sheet workers only re-register
   on a fresh page load.

The sheet template is **game-wide** — it applies to every character in the
game at once. You cannot run this sheet for one character and a different
sheet for another in the same game.

## Your existing character data is safe

Attribute values live on each character object, not in the sheet template.
Roll20 re-renders each character against the new template using the
attributes they already have, matched by attribute name.

Every `attr_` name in this version matches the previous version, so all
existing characters repopulate automatically. The only addition is
`stress_6`.

## Verifying it rendered correctly

Open a character that already has data and check, in order:

1. **Tabs** — five tabs run horizontally across the top: Worksheet,
   Character, Spells, Equipment, Notes. Clicking each switches panels.
   If the tabs are stacked vertically down the right side, the old CSS is
   still in the box.
2. **Character tab** — Name, Player, Mantles, Aspects, and Approaches are
   populated. Approaches show their alt-name and covered skills.
3. **Stress & Conditions** — Stress has **6** circles. Every Value field
   accepts a typed number, and typing in one does not change the circles.
4. **Extra Conditions** — existing named rows appear. See the migration
   note below if they open in edit mode.
5. **Stunts / Spells** — the Character tab shows Name + Cost; the Spells
   tab shows the same rows with full effect text.
6. **Equipment tab** — Enchanted & Focus Items, Mundane Gear, Armor.
7. **Worksheet tab** — all five Phase panels with events, story title,
   guest starring, and phase aspect.
8. **Roll buttons** — click a dice button next to any Approach. It should
   post a gold-bordered card to chat with the approach name, the 4dF
   result, and the rating. An unstyled plain-text result means the CSS
   didn't take.

## Known migration note — Equipment

Enchanted & Focus Items and Mundane Gear were previously single free-text
boxes; they are now repeating lists so each item gets its own row and the
sections get **+Add** / **Modify** buttons.

To migrate existing text, expand the **"Older free-text notes"** toggle at
the bottom of each section and click **Split into rows above**. This reads
the full text stored on the character and creates one row per item.

It expects each item in this shape:

    Item Name
    Description: what it looks like...
    DFA Mechanics: what it does...

Items separated by blank lines. If the `Description:` / `DFA Mechanics:`
labels are missing, the whole chunk goes into the Description field and you
can move text by hand.

Notes:
- The original text box is **not** cleared, so this is non-destructive. If
  the split comes out wrong, delete the created rows and try again.
- Clicking the button twice creates duplicate rows. Click once per section.
- Once you're happy with the rows, you can clear the old box; leaving it
  filled is harmless.

## Known migration note — Extra Conditions

Extra Condition rows now lock after naming: once a row has a name, the
text box and Boxes dropdown are replaced by a static gold label plus an
**Edit** button.

Rows created *before* this version have no `extracond_lock` value set, so
they may open showing the edit fields instead of the locked label. Click
into the name field and then click away to set the lock. This is a
one-time fix per row.

## What's on each tab

- **1 - Worksheet** — the five-Phase background (events, story title,
  guest starring, phase aspect per phase) plus Basics and Core Aspect
  descriptions.
- **2 - Character** — quick-reference grid: Name/Player, Mantles, Power
  Level, Aspects, Approaches, Ladder, Scale, Stress & Conditions, Stunts,
  Fate Points, Consequences, Bonus Aspects.
- **3 - Spells** — full Spells/Rotes/Powers detail (Name, Linked Skill,
  Refresh Cost, Effect). Same underlying rows as the Character tab's
  Stunts box.
- **4 - Equipment** — Enchanted/Focus items and Mundane gear, each a
  repeating list with Item / Description / DFA Mechanics per row and its
  own **+Add** and **Modify** buttons. Armor sits below with its own
  item list.
- **5 - Notes** — free-form notes.

## Notes on behavior

- **Condition values are typed, not computed.** Stress, Indebted, In
  Peril, Doomed, and Extra Conditions each have independent circles and a
  typed number. Checking circles never overwrites the number.
- **Power Level** drives Base Refresh, Skill Cap, and the suggested Bonus
  Aspect count. In DFA proper, power comes from Scale and Mantle — the
  Power Level box is there for the optional DFRPG Skills track.
- **Aspects mirror** between the Worksheet tab and the Character tab.
- **Character Name / Player / Template** are shared fields between the
  Worksheet Basics panel and the Character tab. The first Mantle field
  *is* the Template field.

Everything is a plain Roll20 `attr_` field, so it works with the Roll20
API/Mods and with `@{charname|skillcap}` style inline rolls elsewhere in
your game.

## Option B — Publishing to the official Roll20 sheet repository

Roll20's community sheets live in the public GitHub repo
`roll20/roll20-character-sheets`.

1. Fork that repo on GitHub.
2. Create a folder, e.g. `Dresden Files Accelerated/`.
3. Add `sheet.html`, `sheet.css`, `sheet.json`, and `translation.json`.
4. Add a `screenshot.png` (Roll20 requires one for the listing).
5. Fill in your name/URL in `sheet.json`.
6. Open a Pull Request. Roll20 staff review and merge before it appears
   as a selectable sheet for all users.
