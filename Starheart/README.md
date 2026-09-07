# StarHeart Roll20 Character Sheet

StarHeart is a science-fantasy tabletop RPG built as a Campaign Scaffold supplement for Daggerheart. It is published under the [Darrington Press Community Gaming License (DPCGL)](https://darringtonpress.com/license/).

The full StarHeart rules are available on [DriveThruRPG](https://www.drivethrurpg.com).

---

## Overview

This sheet supports all five StarHeart entity types via a tab strip at the top:

| Tab | Used for |
|-----|----------|
| **Character** | Player characters |
| **Adversary** | NPCs, monsters, and enemy soldiers |
| **Environment** | Encounter environments (Daggerheart Environment type) |
| **Companion** | The Bonded subclass companion character |
| **Vehicle** | PC ships; enemy vehicles use the Adversary tab |

All tabs use the same `sh-roll` custom roll template, which outputs the Hope die, Fear die, total, damage, and the target's damage thresholds in a single roll card.

**No API required.** The sheet is fully functional on Roll20 free tier. The optional API scripts (see below) automate setup and add token action buttons but are not needed for play.

---

## PC Sheet

### Traits and Combat Stats
Enter trait scores (Agility, Strength, Finesse, Instinct, Presence, Knowledge) manually. Evasion, Proficiency, and damage thresholds calculate automatically based on class, level, and any bonus fields.

Each trait has a roll button that outputs a Hope/Fear roll with the trait modifier applied.

### Domain Cards

Domain cards represent your character's special abilities. To add a card:

1. Click **+ Add** in the Domain Cards section.
2. Select the card name from the dropdown. Level, recall cost, and full card text populate automatically.
3. To use a custom or homebrew card, type the name directly in the name field instead of using the dropdown.

**Vaulting a card:** Each domain card has a **Vault** toggle. When a card is vaulted (e.g. spent as part of a Reaction), click the toggle — the card collapses to show only its name with a `[VAULT]` label. This is a visual reminder that the card is unavailable until recovered. Click the toggle again to unvault it.

### Attack Rolls

The attack roll button on the PC sheet rolls 1d20 + attack modifier against a targeted token. **You must have a target selected** (click the target reticle or hold Shift and click a token) before rolling — the roll card pulls the target's Difficulty and damage thresholds directly from their character sheet.

The roll card shows:
- Hope die and Fear die results
- Total (with modifier)
- Your damage roll
- Target's Major and Severe thresholds

The GM compares the total to the target's **Difficulty** to determine hit/miss, then compares damage to thresholds.

---

## Adversary Sheet

Fill in the adversary's stat block fields (Tier, Type, Difficulty, Thresholds, HP, Stress, Experiences, Motives & Tactics, attack name, range, modifier, damage, damage type, and up to 10 feature slots).

Feature slots each have a name, type (Action/Reaction/Passive), and text field. The token action macros reference these slots by number (F1–F10), so consistent slot usage across similar adversaries makes macro reuse easier.

### Adversary Attack Macros

Adversary attacks use `@{target|...}` to pull the PC's Evasion and thresholds. **You must click a target token** before firing an attack macro — the macro will prompt for a target if none is selected.

The standard attack macro outputs:
- Attacker name and target name
- Target's current Evasion
- d20 roll + attack modifier (with Normal / Advantage / Disadvantage prompt)
- Damage roll and type
- Target's Major and Severe thresholds

**Note on minion adversaries:** Minions have no damage thresholds. Leave the threshold fields blank on their sheet — the roll card will display empty threshold fields, which is correct.

---

## Vehicle Sheet (PC Ships)

The Vehicle tab is used for the **player characters' ship**. Enemy vehicles (Sovereignty fighters, fleet components, etc.) use the Adversary tab.

### Vehicle Attack Workflow

Vehicle attack macros read the **gunner PC's** trait score to calculate the attack modifier. The macro will first prompt you to select the gunner (the PC crewing that weapon station), then prompt for the enemy target.

1. Trigger the vehicle attack macro.
2. When prompted, select the **gunner PC's token** — the macro reads their trait/attack value from their sheet.
3. When prompted, select the **enemy ship's token** as the target.

### Targeting Enemy Ships

When a PC ship attacks an enemy ship, **the enemy ship must have its own Roll20 character sheet** (using the Adversary tab) with Difficulty set. The roll card pulls the target's Difficulty and thresholds.

If an enemy fleet has multiple system components (Bridge, Shield Generator, Reactor, etc.), each system should be set up as a separate character entry so it can be targeted independently and have its own HP tracked on its token.

---

## Companion Sheet (Bonded Subclass)

The Bonded Scout subclass uses a companion character. The companion has its own character sheet using the **Companion tab** and its own token on the map.

### Companion Attack Workflow

Companion attack macros read the **bonded PC's** trait score (Instinct, Presence, etc.) to calculate the attack modifier. The macro will first prompt you to select the bonded PC, then prompt for the enemy target.

1. Trigger the companion attack macro.
2. When prompted, select the **bonded PC's token** — the macro reads the relevant trait value from the PC's sheet.
3. When prompted, select the **enemy token** as the target.

The companion's attack stat block and the bonded PC's trait are both required to produce the correct roll.

---

## Attribution

This product includes materials from the Daggerheart System Reference Document 1.0, © Critical Role, LLC, under the terms of the Darrington Press Community Gaming License (DPCGL). More information can be found at [daggerheart.com](https://www.daggerheart.com). There are no previous modifications by others.

**Author:** Richard McNutt
