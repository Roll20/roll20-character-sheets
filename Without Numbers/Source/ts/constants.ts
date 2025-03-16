/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */

/* Data constants */
const sheetName = "Without Number";
const sheetVersion = "1.0.0";
const translate = getTranslationByKey;
const attributes = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];
const effortAttributes = [
  "wisdom_mod",
  "constitution_mod",
  "psionics_extra_effort",
  "skill_biopsionics",
  "skill_precognition",
  "skill_telepathy",
  "skill_teleportation",
  "skill_telekinesis",
  "skill_metapsionics",
  "psionics_committed_effort_current",
  "psionics_committed_effort_scene",
  "psionics_committed_effort_day",
];
const shipStatEvent = [
  ...["hardpoints", "power", "mass"].map(
    (x) => `change:repeating_ship-weapons:weapon_${x}`
  ),
  ...["power", "mass"].map(
    (x) => `change:repeating_ship-defenses:defense_${x}`
  ),
  ...["power", "mass"].map(
    (x) => `change:repeating_ship-fittings:fitting_${x}`
  ),
  "change:ship_power",
  "change:ship_mass",
  "change:ship_hardpoints",
  "remove:repeating_ship-weapons",
  "remove:repeating_ship-defenses",
  "remove:repeating_ship-fittings",
].join(" ");
const weaponSkills = [
  "skill_exert",
  "skill_punch",
  "skill_shoot",
  "skill_stab",
  "skill_telekinesis",
];
const weaponDisplayEvent = [
  ...[
    "attack",
    "name",
    "skill_bonus",
    "attribute_mod",
    "damage",
    "shock",
    "shock_damage",
    "shock_ac",
    "skill_to_damage",
  ].map((x) => `change:repeating_weapons:weapon_${x}`),
  "remove:repeating_weapons",
  "change:attack_bonus",
  ...weaponSkills.map((name) => `change:${name}`),
].join(" ");
const skills: { [key: string]: string[] } = {
  revised: [
    "administer",
    "connect",
    "exert",
    "fix",
    "heal",
    "know",
    "lead",
    "notice",
    "perform",
    "pilot",
    "program",
    "punch",
    "shoot",
    "sneak",
    "stab",
    "survive",
    "talk",
    "trade",
    "work",
  ],
  cwn: [
    "administer",
    "connect",
    "drive",
    "exert",
    "fix",
    "heal",
    "know",
    "lead",
    "notice",
    "perform",
    "program",
    "punch",
    "shoot",
    "sneak",
    "stab",
    "survive",
    "talk",
    "trade",
    "work",
  ],
  psionic: [
    "biopsionics",
    "metapsionics",
    "precognition",
    "telekinesis",
    "telepathy",
    "teleportation",
  ],
  magic: ["cast", "summon"],
  spaceMagic: ["magic"],
  wwn: [
    "administer",
    "connect",
    "convince",
    "craft",
    "exert",
    "heal",
    "know",
    "lead",
    "magic",
    "notice",
    "perform",
    "pray",
    "punch",
    "ride",
    "sail",
    "shoot",
    "sneak",
    "stab",
    "survive",
    "trade",
    "work",
  ],
};
const shipStats = [
  "ship_ac",
  "ship_armor",
  "ship_class",
  "ship_crew_max",
  "ship_crew_min",
  "ship_hardpoints_max",
  "ship_hp",
  "ship_hp_max",
  "ship_mass_max",
  "ship_power_max",
  "ship_speed",
  "ship_hull_price",
];
