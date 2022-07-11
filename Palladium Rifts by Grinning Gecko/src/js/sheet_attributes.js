function getKeysFromKeysDefaults(keysDefaultsArray) {
  return keysDefaultsArray.map((keyDefault) => keyDefault.key);
}

// if (Array.isArray(keysDefaultsProp)) {
//     return keysDefaultsProp.map((keyDefault) => keyDefault.key);
//   } else {
//     return Object.entries(keysDefaultsProp).reduce((acc, [subProp, subVal]) => {
//         acc[subProp] =
//     }, {})

//     return Object.keys(KEYS_DEFAULTS[prop]).map((subKey) => ({
//       [subKey]: KEYS_DEFAULTS[prop][subKey].map((keyDefault) => keyDefault.key),
//     }));
//   }
// }

function keysToKeysDefaults(keys) {
  return keys.map((key) => ({ key: key, default: 0 }));
}

function keysDefaultsToKeynamesDefaults(keysDefaultsArray) {
  return keysDefaultsArray.map((keyDefault) => ({
    [keyDefault.key]: keyDefault.default,
  }));
}

const KEYS_DEFAULTS = {
  H2H: [
    { key: "name", default: "" },
    { key: "levelacquired", default: 1 },
    { key: "level", default: 1 },
    { key: "attacks", default: 2 },
    { key: "pull", default: 0 },
    { key: "roll", default: 0 },
    { key: "breakfall", default: 0 },
    { key: "parry", default: 0 },
    { key: "dodge", default: 0 },
    { key: "description", default: "" },
    { key: "strike", default: 0 },
    { key: "disarm", default: 0 },
    { key: "critical", default: 0 },
    { key: "damage", default: "" },
    { key: "knockout", default: 0 },
    { key: "deathblow", default: 0 },
    { key: "initiative", default: 0 },
    { key: "entangle", default: 0 },
    { key: "throw", default: 0 },
    { key: "strike_range", default: 0 },
    { key: "horrorfactor", default: 0 },
    { key: "dodge_auto", default: 0 },
    { key: "flipthrow", default: 0 },
    { key: "tackle", default: 0 },
    { key: "leghook", default: 0 },
    { key: "backwardsweepkick", default: 0 },
    { key: "maintainbalance", default: 0 },
    { key: "dodge_flight", default: 0 },
    { key: "dodge_teleport", default: 0 },
    { key: "dodge_motion", default: 0 },
    { key: "mod_spellstrength", default: 0 },
    { key: "mod_me", default: 0 },
    { key: "mod_ma", default: 0 },
    { key: "mod_ps", default: 0 },
    { key: "mod_pp", default: 0 },
    { key: "mod_pe", default: 0 },
    { key: "mod_spd", default: 0 },
  ],
  WP: {
    wp: [
      { key: "name", default: "" },
      { key: "levelacquired", default: 1 },
      { key: "level", default: 1 },
      { key: "strike", default: 0 },
      { key: "parry", default: 0 },
      { key: "disarm", default: 0 },
      { key: "rof", default: 0 },
      { key: "throw", default: 0 },
      { key: "entangle", default: 0 },
    ],
    wpmodern: [
      { key: "name", default: "" },
      { key: "levelacquired", default: 1 },
      { key: "level", default: 1 },
      { key: "strike_range_single", default: 0 },
      { key: "disarm", default: 0 },
      { key: "strike_range_burst", default: 0 },
    ],
  },
  ATTRIBUTE: [
    { key: "mod_iq", default: 0 },
    { key: "iq_abs", default: 0 },
    { key: "mod_iq_bonus", default: 0 },
    { key: "mod_perception_bonus", default: 0 },
    { key: "mod_me", default: 0 },
    { key: "mod_me_bonus", default: 0 },
    { key: "me_abs", default: 0 },
    { key: "mod_ma", default: 0 },
    { key: "mod_ma_bonus", default: 0 },
    { key: "ma_abs", default: 0 },
    { key: "mod_ps", default: 0 },
    { key: "mod_ps_bonus", default: 0 },
    { key: "ps_abs", default: 0 },
    { key: "mod_pp", default: 0 },
    { key: "mod_pp_bonus", default: 0 },
    { key: "pp_abs", default: 0 },
    { key: "mod_pe", default: 0 },
    { key: "mod_pe_bonus", default: 0 },
    { key: "mod_pe_coma_bonus", default: 0 },
    { key: "pe_abs", default: 0 },
    { key: "mod_pb", default: 0 },
    { key: "mod_pb_bonus", default: 0 },
    { key: "pb_abs", default: 0 },
    { key: "mod_spd", default: 0 },
    { key: "spd_abs", default: 0 },
    { key: "mod_spdfly", default: 0 },
    { key: "spdfly_abs", default: 0 },
    { key: "mod_character_ps_type", default: 1 },
    { key: "mod_character_ps_type_name", default: "Normal" },
    { key: "mod_restrained_punch", default: 0 },
    { key: "mod_restrained_punch_unit", default: "sdc" },
    { key: "mod_punch", default: 0 },
    { key: "mod_punch_unit", default: "sdc" },
    { key: "mod_power_punch", default: 0 },
    { key: "mod_power_punch_unit", default: "sdc" },
    { key: "mod_kick", default: 0 },
    { key: "mod_kick_unit", default: "sdc" },
    { key: "mod_leap_kick", default: 0 },
    { key: "mod_leap_kick_unit", default: "sdc" },
    { key: "mod_liftcarry_weight_multiplier", default: 0 },
    { key: "mod_liftcarry_duration_multiplier", default: 0 },
    { key: "mod_lift", default: 0 },
    { key: "mod_carry", default: 0 },
    { key: "mod_throw_distance", default: 0 },
    { key: "mod_carry_max", default: 0 },
    { key: "mod_carry_running", default: 0 },
    { key: "mod_hold_max", default: 0 },
    { key: "hp", default: 0 },
    { key: "sdc", default: 0 },
    { key: "ar", default: 0 },
    { key: "mdc", default: 0 },
    { key: "ps_type", default: 1 },
    { key: "ppe", default: 0 },
    { key: "isp", default: 0 },
    { key: "mod_hf", default: 0 },
    { key: "hf_abs", default: 0 },
    { key: "mod_spellstrength", default: 0 },
    { key: "spellstrength_abs", default: 0 },
    { key: "mod_trust", default: 0 },
    { key: "trust_abs", default: 0 },
    { key: "mod_intimidate", default: 0 },
    { key: "intimidate_abs", default: 0 },
    { key: "mod_charmimpress", default: 0 },
    { key: "charmimpress_abs", default: 0 },
    { key: "mod_skillbonus", default: 0 },
  ],
  COMBAT: [
    { key: "name", default: "" },
    { key: "level", default: 0 },
    { key: "attacks", default: 0 },
    { key: "sdc", default: 0 },
    { key: "mdc", default: 0 },
    { key: "initiative", default: 0 },
    { key: "strike", default: 0 },
    { key: "parry", default: 0 },
    { key: "dodge", default: 0 },
    { key: "throw", default: 0 },
    { key: "disarm", default: 0 },
    { key: "entangle", default: 0 },
    { key: "pull", default: 0 },
    { key: "roll", default: 0 },
    { key: "breakfall", default: 0 },
    { key: "damage", default: "" },
    { key: "damage_paired", default: "" },
    { key: "damage_mainhand", default: "" },
    { key: "damage_offhand", default: "" },
    { key: "dodge_flight", default: 0 },
    { key: "dodge_auto", default: 0 },
    { key: "dodge_teleport", default: 0 },
    { key: "dodge_motion", default: 0 },
    { key: "dodge_underwater", default: 0 },
    { key: "strike_range", default: 0 },
    { key: "strike_range_single", default: 0 },
    { key: "strike_range_burst", default: 0 },
    { key: "strike_range_aimed", default: 0 },
    { key: "strike_range_aimed_single", default: 0 },
    { key: "strike_range_aimed_pulse", default: 0 },
    { key: "strike_range_called", default: 0 },
    { key: "strike_range_called_single", default: 0 },
    { key: "strike_range_called_pulse", default: 0 },
    { key: "strike_range_aimed_called_single", default: 0 },
    { key: "strike_range_aimed_called_pulse", default: 0 },
    { key: "disarm_range", default: 0 },
    { key: "damage_range", default: "" },
    { key: "damage_range_single", default: "" },
    { key: "damage_range_burst", default: "" },
    { key: "critical", default: 0 },
    { key: "knockout", default: 0 },
    { key: "deathblow", default: 0 },
    { key: "flipthrow", default: 0 },
    { key: "tackle", default: 0 },
    { key: "leghook", default: 0 },
    { key: "backwardsweepkick", default: 0 },
    { key: "description", default: "" },
  ],
  SAVE: [
    { key: "psionics", default: 0 },
    { key: "insanity", default: 0 },
    { key: "magic", default: 0 },
    { key: "lethalpoison", default: 0 },
    { key: "nonlethalpoison", default: 0 },
    { key: "disease", default: 0 },
    { key: "drugs", default: 0 },
    { key: "comadeath", default: 0 },
    { key: "perceptioncheck", default: 0 },
    { key: "pain", default: 0 },
    { key: "horrorfactor", default: 0 },
    { key: "mindcontrol", default: 0 },
    { key: "illusions", default: 0 },
    { key: "possession", default: 0 },
    { key: "curses", default: 0 },
    { key: "maintainbalance", default: 0 },
    { key: "fatigue", default: 0 },
    { key: "despair", default: 0 },
    { key: "telepathicprobes", default: 0 },
  ],
  REPEATING_MOVEMENT: [
    { key: "run_mph", default: 0 },
    { key: "run_kmh", default: 0 },
    { key: "fly_mph", default: 0 },
    { key: "fly_kmh", default: 0 },
    { key: "run_ft_melee", default: 0 },
    { key: "run_m_melee", default: 0 },
    { key: "fly_ft_melee", default: 0 },
    { key: "fly_m_melee", default: 0 },
    { key: "run_ft_action", default: 0 },
    { key: "run_m_action", default: 0 },
    { key: "fly_ft_action", default: 0 },
    { key: "fly_m_action", default: 0 },
  ],
  SKILL: [
    { key: "name", default: "" },
    { key: "category", default: "occ" },
    { key: "base", default: 0 },
    { key: "bonus", default: 0 },
    { key: "perlevel", default: 0 },
    { key: "levelacquired", default: 1 },
    { key: "level", default: 1 },
    { key: "total", default: 0 },
    { key: "description", default: "" },
  ],
  MAGIC_BASE: [
    { key: "name", default: "" },
    { key: "school", default: "" },
    { key: "spell_level", default: 1 },
    { key: "range", default: "" },
    { key: "damage", default: "" },
    { key: "duration", default: 0 },
    { key: "percentage", default: 0 },
    { key: "ppecost", default: 0 },
    { key: "range_starting", default: 0 },
    { key: "range_per_level", default: 0 },
    { key: "range_unit", default: "" },
    { key: "damage_starting", default: "" },
    { key: "damage_per_level", default: "" },
    { key: "damage_unit", default: "" },
    { key: "dc_starting", default: 0 },
    { key: "dc_per_level", default: 0 },
    { key: "dc_unit", default: "" },
    { key: "duration_starting", default: 0 },
    { key: "duration_per_level", default: 0 },
    { key: "duration_unit", default: "" },
    { key: "percentage_starting", default: 0 },
    { key: "percentage_per_level", default: 0 },
    { key: "addtobonuses", default: 1 },
    { key: "description", default: "" },
  ],
  PSIONICS_BASE: [
    { key: "name", default: "" },
    { key: "range", default: "" },
    { key: "damage", default: "" },
    { key: "duration", default: 0 },
    { key: "percentage", default: 0 },
    { key: "ispcost", default: 0 },
    { key: "range_starting", default: 0 },
    { key: "range_per_level", default: 0 },
    { key: "range_unit", default: "" },
    { key: "damage_starting", default: "" },
    { key: "damage_per_level", default: "" },
    { key: "damage_unit", default: "" },
    { key: "dc_starting", default: 0 },
    { key: "dc_per_level", default: 0 },
    { key: "dc_unit", default: "" },
    { key: "duration_starting", default: 0 },
    { key: "duration_per_level", default: 0 },
    { key: "duration_unit", default: "" },
    { key: "percentage_starting", default: 0 },
    { key: "percentage_per_level", default: 0 },
    { key: "addtobonuses", default: 1 },
    { key: "description", default: "" },
  ],
  ABILITIES_BASE: [
    { key: "name", default: "" },
    { key: "range", default: "" },
    { key: "damage", default: "" },
    { key: "duration", default: 0 },
    { key: "percentage", default: 0 },
    { key: "range_starting", default: 0 },
    { key: "range_per_level", default: 0 },
    { key: "range_unit", default: "" },
    { key: "damage_starting", default: "" },
    { key: "damage_per_level", default: "" },
    { key: "damage_unit", default: "" },
    { key: "dc_starting", default: 0 },
    { key: "dc_per_level", default: 0 },
    { key: "dc_unit", default: "" },
    { key: "duration_starting", default: 0 },
    { key: "duration_per_level", default: 0 },
    { key: "duration_unit", default: "" },
    { key: "frequency_starting", default: 0 },
    { key: "frequency_per_level", default: 0 },
    { key: "frequency_unit", default: "" },
    { key: "percentage_starting", default: 0 },
    { key: "percentage_per_level", default: 0 },
    { key: "addtobonuses", default: 1 },
    { key: "description", default: "" },
  ],
  PROFILES_BASE: [
    { key: "bonus_ids", default: "" },
    { key: "bonus_names", default: "" },
  ],
  CORE: [
    { key: "character_name", default: "" },
    { key: "truename_name", default: "" },
    { key: "character_race", default: "" },
    { key: "occ", default: "" },
    { key: "character_ps_type", default: 1 },
    { key: "character_level", default: 1 },
    { key: "experience", default: 0 },
    { key: "alignment", default: "" },
    { key: "character_age", default: "" },
    { key: "character_gender", default: "" },
    { key: "character_height", default: "" },
    { key: "character_weight", default: "" },
    { key: "character_familyorigin", default: "" },
    { key: "character_environment", default: "" },
    { key: "character_languages", default: "" },
    { key: "character_insanity", default: "" },
    { key: "character_disposition", default: "" },
    { key: "iq", default: 0 },
    { key: "iq_bonus", default: 0 },
    { key: "perception_bonus", default: 0 },
    { key: "me", default: 0 },
    { key: "me_bonus", default: 0 },
    { key: "ma", default: 0 },
    { key: "ma_bonus", default: 0 },
    { key: "ps", default: 0 },
    { key: "ps_bonus", default: 0 },
    { key: "pp", default: 0 },
    { key: "pp_bonus", default: 0 },
    { key: "pe", default: 0 },
    { key: "pe_bonus", default: 0 },
    { key: "pe_coma_bonus", default: 0 },
    { key: "pb", default: 0 },
    { key: "pb_bonus", default: 0 },
    { key: "spd", default: 0 },
    { key: "spdfly", default: 0 },
    { key: "charmimpress", default: 0 },
    { key: "character_hp", default: 0 },
    { key: "character_sdc", default: 0 },
    { key: "character_ar", default: 0 },
    { key: "character_mdc", default: 0 },
    { key: "character_ppe", default: 0 },
    { key: "character_isp", default: 0 },
    { key: "hf", default: 0 },
    { key: "spellstrength", default: 0 },
    { key: "perception", default: 0 },
    { key: "run_mph", default: 0 },
    { key: "run_ft_melee", default: 0 },
    { key: "run_ft_attack", default: 0 },
    { key: "run_cruising", default: 0 },
    { key: "run_at_max", default: 0 },
    { key: "leapup", default: 0 },
    { key: "leapout", default: 0 },
    { key: "equipment", default: "" },
    { key: "psionic_ability", default: 15 },
    { key: "credits_universal_bearer", default: "" },
    { key: "credits_universal_marked", default: "" },
    { key: "credits_blackmarket", default: "" },
    { key: "credits_ngmi", default: "" },
    { key: "credits_phaseworld", default: "" },
    { key: "credits_splugorth", default: "" },
    { key: "credits_gems", default: "" },
    { key: "credits_blackmarketmerchandise", default: "" },
  ],
  ARMOR: [
    { key: "is_active", default: 1 },
    { key: "name", default: "" },
    { key: "movementpenalty", default: 0 },
    { key: "mdc", default: 0 },
    { key: "mdc_max", default: 0 },
  ],
  MOVEMENT: [
    { key: "name", default: "" },
    { key: "mph", default: 0 },
    { key: "ft_melee", default: 0 },
    { key: "cruising", default: 0 },
    { key: "dur_at_max", default: 0 },
  ],
  EQUIPMENT: [{ key: "equipment", default: "" }],
};

KEYS_DEFAULTS.MODIFIERS = KEYS_DEFAULTS.COMBAT.concat(
  KEYS_DEFAULTS.SAVE,
  KEYS_DEFAULTS.ATTRIBUTE,
  KEYS_DEFAULTS.REPEATING_MOVEMENT
);

KEYS_DEFAULTS.MAGIC = KEYS_DEFAULTS.MAGIC_BASE.concat(KEYS_DEFAULTS.MODIFIERS);
KEYS_DEFAULTS.PSIONICS = KEYS_DEFAULTS.PSIONICS_BASE.concat(
  KEYS_DEFAULTS.MODIFIERS
);
KEYS_DEFAULTS.ABILITIES = KEYS_DEFAULTS.ABILITIES_BASE.concat(
  KEYS_DEFAULTS.MODIFIERS
);
KEYS_DEFAULTS.PROFILES = KEYS_DEFAULTS.PROFILES_BASE.concat(
  KEYS_DEFAULTS.MODIFIERS
);

const H2H_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.H2H);
const WP_KEYS = {
  wp: getKeysFromKeysDefaults(KEYS_DEFAULTS.WP.wp),
  wpmodern: getKeysFromKeysDefaults(KEYS_DEFAULTS.WP.wpmodern),
};
console.log(WP_KEYS);
const ATTRIBUTE_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.ATTRIBUTE);
const COMBAT_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.COMBAT);
const SAVE_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.SAVE);
const REPEATING_MOVEMENT_KEYS = getKeysFromKeysDefaults(
  KEYS_DEFAULTS.REPEATING_MOVEMENT
);
const SKILL_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.SKILL);
const CORE_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.CORE);
const ARMOR_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.ARMOR);
const MOVEMENT_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.MOVEMENT);
const EQUIPMENT_KEYS = getKeysFromKeysDefaults(KEYS_DEFAULTS.EQUIPMENT);

const SAVE_KEYS_ATTRIBUTE_BONUSES = {
  me_bonus: ["psionics", "insanity"],
  pe_bonus: ["magic", "lethalpoison", "nonlethalpoison", "disease", "drugs"],
  pe_coma_bonus: ["comadeath"],
  perception_bonus: ["perceptioncheck"],
  none: [
    "pain",
    "horrorfactor",
    "mindcontrol",
    "illusions",
    "possession",
    "curses",
    "maintainbalance",
    "fatigue",
    "despair",
    "telepathicprobes",
  ],
};

const REPEATING_BONUS_KEYS = COMBAT_KEYS.concat(
  SAVE_KEYS,
  ATTRIBUTE_KEYS,
  REPEATING_MOVEMENT_KEYS
);

const ABILITIES_REPEATERS = ["magic", "psionics", "powersabilities"];

/**
 * @todo
 * `name` is duplicated between MAGIC_BASE_KEYS and COMBAT_KEYS.
 * Do a unique array somehow.
 */
const MAGIC_KEYS = REPEATING_BONUS_KEYS.concat(
  getKeysFromKeysDefaults(KEYS_DEFAULTS.MAGIC_BASE)
);
const PSIONICS_KEYS = REPEATING_BONUS_KEYS.concat(
  getKeysFromKeysDefaults(KEYS_DEFAULTS.PSIONICS_BASE)
);
const ABILITIES_KEYS = REPEATING_BONUS_KEYS.concat(
  getKeysFromKeysDefaults(KEYS_DEFAULTS.ABILITIES_BASE)
);
const PROFILES_KEYS = REPEATING_BONUS_KEYS.concat(
  getKeysFromKeysDefaults(KEYS_DEFAULTS.PROFILES_BASE)
);

const SECTIONS = {
  h2h: H2H_KEYS,
  wp: WP_KEYS.wp,
  wpmodern: WP_KEYS.wpmodern,
  skills: SKILL_KEYS,
  modifiers: REPEATING_BONUS_KEYS,
  magic: MAGIC_KEYS,
  psionics: PSIONICS_KEYS,
  movement: MOVEMENT_KEYS,
  powersabilities: ABILITIES_KEYS,
  armor: ARMOR_KEYS,
  // profiles: PROFILES_KEYS, // Tricky to export because IDs that they refer to won't line up
  equipment: EQUIPMENT_KEYS,
};

// console.log(keysToKeysDefaults(CORE_KEYS));
