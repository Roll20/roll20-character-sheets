# Righteous Blood, Ruthless Blades — Custom Roll20 Character Sheet

A homebrew Roll20 character sheet built from the official character sheet
layout and rules in *Righteous Blood, Ruthless Blades* (Osprey Games,
Brendan Davis & Jeremy Bai).

## Files

- `sheet.html` — the sheet layout, including the roll-template markup and
  the sheet-worker script (in the `<script type="text/worker">` block at
  the bottom of the file — this is the standard place Roll20 looks for
  sheet-worker JS, so you don't paste it separately).
- `sheet.css` — all styling (parchment background, blood-red accents).

## How to install (as a Game Master)

Roll20 lets you use a one-off custom sheet per game without publishing it
to the official sheet repository:

1. Open your Roll20 game and go to the **Game Settings** page (from your
   Game Details / "My Games" dashboard, click the game, then "Edit Game
   Details" or "Game Settings" depending on your Roll20 plan).
2. Scroll to **"Custom Character Sheet Template"** (near the character
   sheet dropdown, which should be set to **"Custom"**).
3. You'll see two boxes: **HTML** and **CSS**.
   - Paste the entire contents of `sheet.html` into the HTML box
     (yes, including the `<script type="text/worker">…</script>` block
     at the end — Roll20 recognizes that tag and runs it as sheet-worker
     code even when pasted this way).
   - Paste the entire contents of `sheet.css` into the CSS box.
4. Save. Any character sheet in that game will now use this layout.

If your Roll20 plan/game doesn't expose a "Custom Character Sheet
Template" option, this same HTML/CSS pair is also exactly what you'd
submit as a pull request to the [Roll20 character sheets
repository](https://github.com/Roll20/roll20-character-sheets) to get it
listed in the official sheet dropdown (it would need a `sheet.json` and
a directory name — ask if you want me to generate that scaffolding too).

## What's implemented

**Overview tab** — Name, Level, XP, Killing Aura, Killing Aura Darkness,
Drinking Limit, Max Wounds, Current Wounds, Resist, Counters, Defences
(Evade/Hardiness/Wits), Eccentricity, Occupation, Backstory.

- Killing Aura, Drinking Limit, Max Wounds, Resist, and max Counters are
  **auto-calculated from Level** per the levelling table (p.12): e.g.
  Max Wounds 3→4 at level 4, →5 at level 7; Resist 0→1→2→3 at levels
  4/7/9. You can still hand-edit them afterward (e.g. to reflect a
  masked Killing Aura at level 6+).
- Defence totals auto-calculate as **base 5 + ranks spent**.

**Skills tab** — All 28 skills across the six categories (Martial Arts,
Mental, Specialist, Physical, Unorthodox, Knowledge), each with a
rank field (0–3) and a 🎲 roll button.

- Rolling automatically uses the correct dice notation: rank **d10, keep
  highest** at rank 1+ (e.g. `2d10kh1`), or **2d10, keep lowest** at rank
  0, matching the rules on p.9 and p.119. A natural 10 is a Total
  Success — the chat card just shows the raw roll, so call it out at
  the table.

**Abilities tab** — repeatable rows for Signature Abilities, Counters,
Eccentricities, and Fire Deviation Eccentricities. Signature Abilities
and Counters rows each include a damage-roll control (see below).

**Gear & Resources tab** — repeatable Weapons (name/type/damage/notes,
plus a damage-roll control) and Equipment rows, plus free-text Wealth &
Property and Social Resources fields.

## Damage rolls (Weapons, Signature Abilities, Counters)

Per the rules (p.19 / p.75), damage is usually **a skill's rank + bonus
dice**, e.g. "Muscle + 1d10" — you roll (rank + bonus) d10s and keep the
single highest, unless it's rare "Open Damage" (keep every success).

Each Weapon, Signature Ability, and Counter row now has its own damage
control:

- A **skill dropdown** (Muscle, Speed, External Arts, Internal Arts,
  Lightness Arts, or "No skill") — this pulls that skill's current rank
  automatically.
- A **bonus dice** field (the "X" in "skill + Xd10" — can be 0).
- An **Open Damage** checkbox for the rare cases that call for it.
- A **🩸 Roll Damage** button that rolls the resulting pool and posts it
  to chat, labeled with that row's Name. Compare the result to the
  target's Hardiness at the table as usual.

Leave the dice/skill at their defaults (0 bonus dice, no skill) on rows
where damage doesn't apply — the button just won't be useful there.

## Rulebook-aware autocomplete (Abilities, Counters, Eccentricities, Weapons)

Every name field on the sheet -- Signature Abilities, Counters,
Eccentricities, and Weapons -- now suggests canon options from the book
as you type, while still accepting anything you type that isn't on the
list (homebrew stays fully supported). This uses plain HTML
`<datalist>` autocomplete, so it works with no extra clicks: start
typing, matching official names show up, pick one or keep typing your
own.

**What's pulled from the book, and what isn't:** I extracted this
directly from the PDF using its font metadata (so I could reliably
tell a heading from a paragraph, rather than guessing from formatting
in plain text). Only short, factual data made it into the sheet:

- **Signature Abilities (148 total, incl. Hidden Abilities)** -- name,
  plus its "Characteristics" tag line and prerequisite where the book
  lists one. Picking a canon name shows that info in a small read-only
  line under the Ability name field. The actual mechanics/effect text
  is **not** included -- that's the book's creative writing, and
  copyright doesn't bend for a useful tool. You still open your book
  and type the effect into the Effect/Mechanics box yourself; the
  sheet just saves you from having to recall or misspell the name.
- **Counters (41 total)** -- name only, same reasoning.
- **Eccentricities (49 total)** -- Eccentricities and Deep
  Eccentricities merged into one list, since the sheet has a single
  field for both.
- **Weapons (83 total)** -- name, cost, and type, PLUS full damage
  auto-fill for the 68 of them whose book entry reduces to a plain
  "skill + Xd10" formula (that's short mechanical notation, not prose,
  so it's fine to reproduce exactly). Picking one of those fills Type,
  Cost, and the damage row's skill/dice fields, which immediately
  feeds the existing 🩸 Roll Damage button. The other 15 (mostly
  Rare/Unique items with bespoke one-off effects, like "roll damage
  twice and take the best pool") just get name + cost -- you fill in
  the rest by reading their entry.
- **Fire Deviation Eccentricities turned out not to be a list at
  all** -- in the book they're two random-roll tables (d10 -> effect),
  not named things you pick. So instead of a dropdown, that section
  got two roll buttons ("Roll Mental Affliction" / "Roll Physical
  Affliction") that roll a d10 for you to look up in your book, with a
  reminder that a 10 means rolling again on the Major table.

**Grudges was deliberately left out**, per how you framed the ask --
they're nebulous and GM/situation-dependent, not something with a
fixed catalog to choose from.

If a canon name and your homebrew entry happen to collide, the
datalist just won't offer a match for the homebrew one -- typing it in
fully still works exactly as before.

## Fixed: repeating-section fields resetting on blur

**Root cause, confirmed:** every repeating-section row template had its
fields wrapped in a hardcoded `<div class="repitem">`. Roll20 already
generates its own wrapper div with that exact class (`repcontainer >
repitem`) around each row's content when it renders a repeating
section -- our literal `.repitem` was nesting inside Roll20's own
`.repitem`, colliding with the class Roll20's engine uses internally
to track and save each row. That's why it hit every repeating section
uniformly (Weapons, Abilities, Counters, Equipment, Grudges,
Eccentricities, Fire Deviation) regardless of which ones had custom
JS attached, and why the Add/Modify controls still rendered correctly
even while typed values wouldn't stick.

**Fix:** renamed that wrapper to `.rbrb-row` (a name nothing in
Roll20's engine touches) in both the HTML row templates and the CSS.
Nothing else changed. Re-paste both files and repeating-section fields
should now save normally.

If anything still resets after this, the next most useful thing you
can tell me is exactly which field and section, plus whether the
browser console (F12) shows an error the moment it happens.
