# NPC interchange format

This is the data format for getting an NPC into the Cohors Cthulhu Roll20
game: write it, then import it with the optional companion API script, the
Cohors Cthulhu Companion (see "Importing NPCs" in
[its README](https://github.com/Roll20/roll20-api-scripts/tree/master/Cohors_Cthulhu_Companion/README.md) for that last
step). The machine-checkable version of everything below lives in
[`schema/npc.schema.json`](./schema/npc.schema.json); this file is the
walkthrough.

A file holds either **one NPC object**, or a **JSON array of several** for a
batch (e.g. every NPC in one encounter).

## Minimal example

```json
{
  "name": "Cultist Thug",
  "attributes": {"agility": 8, "brawn": 10, "coordination": 8, "gravitas": 8, "insight": 7, "reason": 7, "will": 9},
  "skills": {
    "fighting": {"ranks": 2, "focuses": ["Melee Weapons"]}
  },
  "weapons": [
    {"name": "Dagger"}
  ]
}
```

`name` and `attributes` (all seven) are the only required fields - everything
else defaults to empty/zero. See `examples/subura_street_thug.json` for a
fuller NPC.

## Fields

### NPC type and allegiance (optional)

```json
"npc_type": "toughened",
"allegiance": "adversary"
```

`npc_type` is the profile's NPC type, the line under its
name: `"trooper"`, `"toughened"` or `"nemesis"` (default `"toughened"`).
Trooper and Toughened NPCs get the sheet's compact combat layout; Nemesis
NPCs get the full sheet. The type also sets the fallback Max Stress
(Troopers halve it) and injury limit (1/2/3) when `profile` doesn't give
them. Older files with `character_type` `"cannon_fodder"`/`"npc"` still
import, as Trooper/Nemesis.

`allegiance` is `"adversary"` (default: buys d20s with Threat, extra
successes become Threat) or `"ally"` (uses the party's Momentum like a PC).
It can be switched on the sheet at any time.

### Token (optional)

```json
"token": "Deep One Shaman"
"token": {"name": "Deep One Shaman", "variant": "light", "size": 2}
```

The import gives the NPC a default token and avatar when it finds an image
with this name (then the NPC's own name) in the game, looking in four
places, in this order:

1. **The Companion script's token map**: a JSON object of stat block names
   and Roll20 image URLs, in the script's CONFIG (`tokenMap`) or a handout
   named `Token Map` (see the script's README). Case, accents and extra
   spaces are ignored, an underscore matches a space, and a name ending in a
   note in brackets is also tried without it.
2. **ModifyTokenImage's Journal folders**, if you use that Mod: a Journal
   folder named `Token Images`, with a folder per token (named like the
   token) holding handouts whose avatar is the image. A handout whose name
   ends in `light` (or `standard`) is that variant; `size: 2` (or
   `width:`/`height:`) in a handout's GM Notes sets the token size, as for
   ModifyTokenImage. The import doesn't need ModifyTokenImage installed, but
   its `--next`/`--set` commands work on tokens named like their folder.
3. **Named tokens on a page called "Token Library".** Drag each image there
   and give the token its name (token settings).
4. **A custom token marker set** (Game Settings > Token Marker Library >
   Create Set > Add Images). Marker names come from the file names, so
   uploading the whole token folder names every image at once.

In places 2-4, names match ignoring case, accents, punctuation, the file extension and a
trailing `standard`/`light`, so `Deep_One_Shaman_light.png` matches
`"Deep One Shaman"` with `"variant": "light"`. Without `token`, the NPC's
own name is looked up. If nothing matches, the import card lists the names
it looked for. `size` is in
grid squares (default 1, or the folder handout's size). `image` takes a Roll20 image URL directly instead
of a lookup, and `"token": false` skips the token.

The token's bar 1 is Stress and bar 2 Injuries, hidden from players for
adversaries. A Nemesis's Stress bar is linked to its sheet; Trooper and
Toughened tokens keep their own, one per copy on the map. In chat,
`!ccimport tokens` lists the token names the import can find, and
`!ccimport token|<Character Name>` gives an already-imported NPC its token
(add `|<Token Name>` if the names differ).

### Truths (optional)

```json
"truths": ["Hired muscle from the Subura", "Owes money to the wrong people"]
```

The profile's TRUTHS, one per entry (up to five).

### Profile totals (optional)

```json
"profile": {"stress": 16, "injuries": 3, "armor": 3, "courage": 6, "power": 5}
```

The stat block's STRESS, INJURIES, ARMOR, COURAGE and Power (plus
`morale` if given). These already include every special rule's bonus
(Tough, Natural Armor, Extraordinary Brawn...), so they are written to the
sheet as-is and win over its own formulas. Omit any the stat block doesn't
give and the tier formula applies instead. Not to be confused with the
top-level `stress` (stress already marked) and `injuries` (injuries
already sustained).

### Identity

`archetype`, `culture`, `caste`, `wealth`, `specialization`, `background`,
`characteristic` - text matching the PC sheet's identity fields
(`source/views/_character.pug`). Five of them are dropdowns on the sheet:

| Field | Values |
| --- | --- |
| archetype | Mystic, Sage, Schemer, Scoundrel, Scout, Soldier |
| specialization | Mystic: Lupercus, Staff Bearer; Sage: Engineer, Medicus; Schemer: Frumentarius, Magistrate; Scoundrel: Robber, Sicarius; Scout: Hunter, Veles; Soldier: Berserker, Legionary |
| culture | Roman citizen, Germanic tribe, Ægyptus, Briton, Gaul, Greek, Foederati, Other |
| caste | Outcast, Servant, Plebeian, Freedman, Noble |
| characteristic | Atlantean Ancestry, Beloved of Valusia, Born of the Waters, Child of Greatness, Dreamwalker, Ghoulish Lineage, Glimpse Behind the Curtain, Sole Survivor, Touched by Shadow |

The sheet matches these when it is first opened, ignoring case (and
"Roman" matches "Roman citizen"); a specialization with no archetype also
sets the archetype. Any other value is stored but doesn't show in the
dropdown. An imported characteristic starts out Secret. Troopers and
Toughened NPCs don't show these fields at all.

### Attributes (required)

```json
"attributes": {"agility": 8, "brawn": 10, "coordination": 8, "gravitas": 8, "insight": 7, "reason": 7, "will": 9}
```

All seven ratings, on the game's usual scale (typically 6-16). Required even for a
Trooper that will only ever use one or two of them - this sheet's own derived
fields (Base Armour, Total Armor, Courage, Max Stress) are computed from
attributes/skills/armor during import, the same way the PC sheet's own
`calcBaseArmour`/`calcCourage`/`calcTotalArmor`/`calcStressMaxBase`/
`calcStressMax` do (`source/views/panels/_vitals_panel.pug`) - you never set
those directly.

### Skills (optional)

```json
"skills": {
  "fighting": {"ranks": 2, "focuses": ["Melee Weapons"]},
  "observation": {"ranks": 1}
}
```

Only list skills this NPC actually has ranks in. Keys must be one of this
game's twelve skills (`academia`, `athletics`, `crafting`, `engineering`,
`fighting`, `medicine`, `observation`, `persuasion`, `resilience`,
`stealth`, `survival`, `tactics`). `focuses` names must match that skill's
own Focus list exactly - see the table in `source/views/panels/
_skills_panel.pug`, reproduced here:

| Skill | Focuses |
| --- | --- |
| academia | Finance, History, Linguistics, Philosophy, Religion |
| athletics | Climbing, Lifting, Physical Training, Running, Swimming |
| crafting | Armorsmithing, Cooking, Tailoring, Weaponsmithing |
| engineering | Architecture, Defenses, Demolition, Infrastructure, Siege Engines |
| fighting | Archery, Melee Weapons, Thrown Weapons, Unarmed, War Magic |
| medicine | Contagion, Faith Healing, Field Treatment, Pharmacia, Surgery |
| observation | Hearing, Instincts, Sight, Smell and Taste |
| persuasion | Charm, Deception, Innuendo, Intimidation, Invocation, Negotiation, Rhetoric |
| resilience | Discipline, Fortitude, Immunity |
| stealth | Concealment, Disguise, Escape Artistry, Lock Picking, Sleight of Hand, Sneak |
| survival | Animal Handling, Boating, Foraging, Hunting, Mysticism, Navigation, Tracking, Woodcraft |
| tactics | Cavalry, Infantry, Leadership, Navy, Omen Reading, Scouting |

### Talents (optional)

```json
"talents": [
  {"name": "Unyielding"},
  {"name": "Carapace of Chitin", "description": "Once per scene, halve damage from a single hit."}
]
```

A `{name}` is resolved against this game's talent list
(`source/data/talents.json`, ~159 entries) exactly like picking it from the
dropdown on a PC sheet: Keywords and Requirements fill in automatically.
Add `description` for any text you want on the sheet, such as an NPC-only
ability that isn't in that list (common for Nemesis-tier antagonists with a
unique signature power).

### Weapons / Armor (optional)

```json
"weapons": [{"name": "Dagger"}, {"name": "Rusted Cleaver", "damage_effects": "3, Vicious"}],
"armor": [{"name": "Leather Armor"}]
```

A `name` matching this sheet's own Weapons/Armor Name fields
(`source/views/panels/_weapons_panel.pug`, `_armor_panel.pug` - a free-text
field with a known-names suggestion list, not a fixed dropdown) auto-fills
the rest of that row, same as picking it from the suggestion list on a PC
sheet - override any field alongside `name` for a house-ruled variant. Any
other `name` (Claws, Horns, Improvised Club) is just a label on a fully
custom weapon or armor - fill in every other field by hand. This is the
normal way to give an NPC an innate attack or natural armor that isn't
really a named "weapon" from the standard weapon list, for example
`{"name": "Claws", "focus": "Unarmed", "reach_range": "1", "damage_effects": "3, Vicious"}`
or `{"name": "Thick Hide", "resistance": 2}`. Known names:

- **Weapons (melee)**: Axe (Melee), Club, Cudgel, Dagger, Dolabra,
  Javelin (Melee), Spear, Staff, Sword, Falx, Gladius,
  Longsword, Spatha, Unarmed, War Axe,
  Small Shield, Large Shield
- **Weapons (ranged)**: Arcuballista, Axe (Thrown), Bow, "Bow, Recurve",
  Javelin (Thrown), Pilum, Plumbata, Sling
- **Armor**: Chainmail / Lorica Hamata, Leather Armor, Lorica Segmentata,
  Lorica Squamata

### Attacks and mental attacks

Every entry in `weapons` can carry `"type"`: `"melee"`, `"ranged"` or
`"mental"`. Use `"mental"` for the profile's (Mental Attack) entries:

```json
{"name": "Unnerving Stare", "type": "mental", "reach_range": "Medium", "damage_effects": "4, Stun"}
```

For NPCs, use the stat block's damage as is. It already includes the
attribute's bonus damage, Brutal and Fearsome, so the sheet adds nothing on
top (a PC's weapon row adds bonus damage; an NPC's doesn't). Mental attacks
roll Will + Persuasion or Survival at difficulty 1.

### Special rules (optional)

```json
"special_rules": [
  {"name": "Fearsome 2"},
  {"name": "Dirty Fighter", "description": "Once per scene, a melee hit also gains the Stun effect."}
]
```

Name each rule as in the stat block, and add `description` for any text you
want on the sheet. `x` is optional when the name ends with the number. On the sheet,
Extraordinary [Attribute] X adds X automatic successes to rolls with that
attribute, and Brutal makes melee attacks roll Brawn; every other rule is
reference text, because its effect is already in the stat block's totals.

### Spells, rituals and escalation options (optional)

```json
"spellcasting": {"attribute": "will", "tradition": "cthulhu"},
"spells": ["Call of the Deep", "Curse of Cthulhu"],
"rituals": ["Rite of the Drowned Bell"],
"escalation_options": ["Weighted Net: (Ranged), Close, 2, Stun"]
```

`spellcasting.attribute` is the attribute the NPC casts with (insight,
reason or will): base Power 2 plus that attribute's bonus, unless
`profile.power` gives a total. `tradition` is the spellbook the `spells`
come from: `runic`, `oracular`, `celtic`, or the NPC-only Mythos tomes
`cthulhu`, `mormo`, `nyarlathotep` and `yog_sothoth`. Spell names must
match `source/data/spells.json`; their skill, difficulty, cost, duration,
category and (for attack spells) damage and effects fill in on first sheet
open.
Rituals aren't battlefield spells, so they're recorded in the NPC's notes.
Escalation options go into the NPC Profile panel, one per line. An
escalation weapon should also be listed in `weapons`, named with
" (Escalation)" (e.g. `"Weighted Net (Escalation)"`), so it's a rollable
attack row once the GM pays the Threat for it.

### Fatigue / Stress (optional, default 0)

`fatigue` and `stress` let an NPC start partway hurt (e.g. a survivor found
mid-encounter). Max Stress is always computed, never set directly.

### Free text (optional)

`injuries`, `traits`, `notes` - plain text, mapped straight onto the
matching fields on the sheet.
