const GLOBAL__HEALTH = [ "blood", "guts" ];

const GLOBAL__APPROACHES = [ "creative", "careful", "concerted" ];

const GLOBAL__SKILLS = [
  "academic",   "culture",      "observe",  "tactics",
  "charisma",   "guile",        "impose",   "insight",
  "acrobatics", "coordination", "physique", "weaponry",
  "artistry",   "survival",     "tinker",   "trade",
  "arcana",     "focus"
];

const GLOBAL__DIFFICULTIES = [ "tn_modifier+0", "tn_modifier-1", "tn_modifier-2", "tn_modifier-3", "tn_modifier+1", "tn_modifier+2", "tn_modifier+3" ];

const GLOBAL__APPROACH_QUERY = `[[?{Approach|${GLOBAL__APPROACHES.map((app, i) => `${getTranslationByKey(app)}, ${i}`).join("|")}}]]`;

const GLOBAL__DIFFICULTY_QUERY = `[[?{Modifiers|${GLOBAL__DIFFICULTIES.map((dif, i) => `${getTranslationByKey(dif)}, ${i}`).join("|")}}]]`;

const GLOBAL__DIFFICULTY_EFFECTS = {
  "tn_modifier+0": +0,
  "tn_modifier-1": -1,
  "tn_modifier-2": -2,
  "tn_modifier-3": -3,
  "tn_modifier+1": +1,
  "tn_modifier+2": +2,
  "tn_modifier+3": +3,
};

const GLOBAL__INVENTORY_INPUTS = [
  "name",
  "type",
  "description",
  "first_boon",
  "second_boon",
  "complexity",
  "base_effect",
  "enhanced",
  "ritual"
];

const GLOBAL__INVENTORY = {
  combat_scowling_face: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_pitchfork: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_memories_of_hardship: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_iron_briefs: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_booming_voice: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_well_rounded_education: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_darts: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_dagger: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_self_esteem: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_studden_leather_armor: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_devastating_vocabulary: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_critical_thinking: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_sturdy_sword: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_crossbow: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_plate_armor: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_love_letter: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_cunning_wit: {
    type: "damage_and_defense",
    complexity: 0,
  },
  combat_flaming_sword: {
    type: "damage_and_defense",
    complexity: 0,
  },
  supplies_rations: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_artisans_tools: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_crowbar_and_lantern: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_rope_and_carpet: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_bedroll: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_backpack: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_thieves_tools: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_fine_clothes: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_traps: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_tent: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_fishing_pole: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_live_hen: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_board_games: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_alchemists_tools: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_encyclopeida: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_spyglass: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_coded_letters: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  supplies_horse: {
    type: "supplies_and_sundries",
    complexity: 0,
  },
  oddities_seashell_horn: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_dead_donkey: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_ancient_ring: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_songbird: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_human_teeth: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_hat: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_monkey_head: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_heavy_crown: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_giant_serpent_scales: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_silk_dress: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_tyrant_pants: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_shadow_mirror: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_darkvision_glasses: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_divine_blood: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_seeds: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_potion_brawn: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_troll_flesh: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  oddities_telepathic_yak: {
    type: "oddities_and_valuables",
    complexity: 0,
  },
  spells_trinket: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_trick_of_the_light: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_soundshift: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_lifebringer: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_whisper: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_bind_weapon: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_unmask_the_self: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_secret_door: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_burn_the_past: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_master_of_elements: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_little_escapologist: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_pierce_the_veil: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_manic_hands: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_shadowbind: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_compel: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_windstep: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_blackout: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_spirit_pact: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_from_dust_to_dust: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  spells_true_miracle: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_only_ones_who_know: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_uncanny_alarm: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_weave_through_water: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_memory_seed: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_flowmotion: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_saving_grace: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_inspiration: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_bind_magic: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_stonewall: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_heartpiercer: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_deadly_focus: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_redo: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_turn_the_tide: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_dispel: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_interdiction: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_fluorescent_transcendence: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_netherwave: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_become_one: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_defy_the_fates: {
    type: "spells_and_techniques",
    complexity: 0,
  },
  techniques_doompause: {
    type: "spells_and_techniques",
    complexity: 0,
  },
};
