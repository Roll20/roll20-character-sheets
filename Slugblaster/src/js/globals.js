const G_SHEET_MODES = ['character', 'crew', 'options'];

const G_EDITORS = [
  'angst-arc',
  'authority-factions',
  'crew-beats',
  'crew-factions',
  'header-crew',
  'crowd-factions',
  'dicetray',
  'doom',
  'family-arc',
  'gear',
  'header',
  'fame',
  'legacy',
  'mods',
  'notes',
  'other-beats',
  'personality-arc',
  'signature',
  'sponsor-factions',
  'tracks',
  'trait-beats',
  'traits',
];

const G_BLADES = ['downtimes', 'epilogue', 'factions', 'diary', 'multiverse'];

const G_REPEATING_FIELDSETS = [
  // character
  'doom',
  'gear',
  'legacy',
  'mods',
  'traits',

  // common
  'tracks',
  'notes',

  // downtime
  'trait-beats',
  'personality-arc',
  'family-arc',
  'angst-arc',
  'crew-beats',
  'other-beats',

  // crew sheet
  'crew-factions',
  'authority-factions',
  'sponsor-factions',
  'crowd-factions',
];

const G_OPTIONS = ['attitude_override'];

const G_CONSTANTS = {
  trouble_max: 8,
  progress_track_max: 12,
};

const G_PLAYBOOKS = {
  grit: {
    attitude: { boost: 3, kick: 1 },
    traits: ['patient', 'sacrifice_your_body', 'diligent', 'walk_it_off', 'skill', 'personal_growth'],
    gear: ['something_everyone_else_forgot', 'backup_portaling_device'],
    vibes: [
      'one_song_on_repeat',
      'never_smile',
      'your_drink_matches_your_shoes',
      'sleep_when_youre_dead',
      'adult_in_residence',
      'overachiever',
    ],
  },
  guts: {
    attitude: { boost: 1, kick: 3 },
    traits: ['show_off', 'snake', 'double_dare', 'walking_disaster', 'raw_talent', 'personal_growth'],
    gear: ['something_youre_not_supposed_to_have', 'a_portable_speaker'],
  },
  smarts: {
    attitude: { boost: 2, kick: 2 },
    traits: [
      'lateral_thinking',
      'technobabble',
      'power_user',
      'actually_reads_the_manual',
      'know_how',
      'personal_growth',
    ],
    gear: ['a_work_in_progress', 'a_vital_screenshot_or_image_file'],
  },
  heart: {
    attitude: { boost: 1, kick: 2 },
    traits: ['team_player', 'pep_talk', 'middle_finger', 'intuition', 'passion', 'personal_growth'],
    gear: ['something_from_someone_special', 'an_important_pamphlet'],
  },
  chill: {
    attitude: { boost: 1, kick: 0 },
    traits: ['steezey', 'umm_guys', 'button_masher', 'lucky', 'quirk', 'personal_growth'],
    gear: ['something_you_found_on_your_way_here', 'a_pet'],
  },
  custom: {
    attitude: { boost: 2, kick: 2 },
    traits: ['personal_growth'],
  },
};

const G_SIGNATURES = {
  gravity_blaster: {
    mods: [
      'endurance_engine',
      'agility_pin',
      'impulse_rig',
      'gravity_spasm',
      'field_inverter',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  hardlight_board: {
    mods: [
      'photon_vent',
      'energy_lattice',
      'photon_exciter',
      'flicker_switch',
      'matter_photonizer',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  hyperoptic_visor: {
    mods: [
      'realmware_lens',
      'omniscience_aperture',
      'spacetime_periscope',
      'powered_crunk_filter',
      'adv._neural_imaging',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  kinetic_deck: {
    mods: [
      'proximity_lock',
      'stasis_anchor',
      'density_pedal',
      'inertial_vortex',
      'dimensional_ballast',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  negafriction_sword: {
    mods: [
      'slip_rattle',
      'field_projector',
      'ref_coating',
      'negafriction_wake',
      'subdimensional_edge',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  photonic_jacket: {
    mods: [
      'flash_patterns',
      'ambiance_panel',
      'photo_bypass',
      'hardlight_upscaling',
      'concept_prism',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  powered_armour: {
    mods: [
      'heavy_duty_servos',
      'weapons_system',
      'mobility_booster',
      'ablatine_plates',
      'omega_engine',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  reality_cannon: {
    mods: [
      'parameter_dial',
      'exponent_coil',
      'subjectivity_diode',
      'matter_lens',
      'concept_inverter',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  riftninja_sneakers: {
    mods: [
      'hyperphaser',
      'anti_negafriction_outsoles',
      'powered_midsoles',
      'reaction_switch',
      'plane_haunt',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  robotic_companion: {
    mods: [
      'weapons',
      'mobility_boosters',
      'heavy_duty_servos',
      'guardian_mode',
      'neural_network',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  skipmode_runners: {
    mods: [
      'anti_negafriction_outsoles',
      'energy_tenser',
      'temporal_scrubber',
      'chrono_clip',
      'causality_hoop',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  voidwear_backpack: {
    mods: [
      'astral_intake',
      'omni_siphon',
      'chaos_vent',
      'collapsible_panels',
      'reversible_zipper',
      'power_cell',
      'stabilizer',
      'kitbashed',
    ],
  },
  custom: {
    mods: ['power_cell', 'stabilizer', 'kitbashed'],
  },
};

const G_EXTRA_GEAR = [
  'your_phone',
  'personal_gear_1',
  'personal_gear_2',
  'grappling_hook',
  'spacetime_ampimeter',
  'hacking_tools',
  'multiversal_maps',
  'repair_tools',
  'small_drone',
  'pro_camera_gear',
  'peel_back_kit',
  'hazwear',
  'backup_portaling_device',
  'logic_binder',
  'advanced_portal_tech',
  'hardecker_sludge_flares',
  'hardlight_marker',
  'maser_grenades',
  'smartcord',
  'the_fust_mix',
  'beam_filter',
  'wilkies_gravity_stickers',
  'panic_energy_fuel_line',
  'fust_stasis_stickers',
  'aug_band',
  'particle_bond_tights',
  '3d_printed_ablatine',
  'knock_off_scram_cat_tee',
  'miper_escape_bag',
  'awf_bracelet',
  'duraweave_jacket',
  'link_patch_duo',
  'slam_patch',
];

const G_FACTIONS = {
  crew: ['brb', 'jet_collective', 'null_range', 'lazy_bunny', 'the_wicks'],
  sponsor: ['miper', 'hardecker', 'wilkies', 'scram_cat', 'fust'],
  authority: ['dara', 'the_arborists', 'shimmer', 'doorways', 'the_old_guard'],
  crowd: ['the_thrashers', 'the_heads', 'the_mavens', 'the_freaks', 'the_normies'],
};

const G_FACTION_FIELDSET = [
  {
    section: 'repeating_crew-factions',
    fields: ['faction_name', 'faction_description', 'faction_autogen'],
  },
];

const G_AUTOGEN_FIELDSET = {
  traits: [
    {
      section: 'repeating_traits',
      fields: ['trait_autogen', 'trait_check', 'trait_name', 'trait_description'],
    },
  ],
  gear: [
    {
      section: 'repeating_gear',
      fields: ['gear_autogen', 'gear_check', 'gear_name', 'gear_cost', 'gear_description'],
    },
  ],
  factions: [
    {
      section: 'repeating_crew-factions',
      fields: ['faction_autogen', 'faction_name', 'faction_relationship', 'faction_description'],
    },
    {
      section: 'repeating_sponsor-factions',
      fields: ['faction_autogen', 'faction_name', 'faction_relationship', 'faction_description'],
    },
    {
      section: 'repeating_authority-factions',
      fields: ['faction_autogen', 'faction_name', 'faction_relationship', 'faction_description'],
    },
    {
      section: 'repeating_crowd-factions',
      fields: ['faction_autogen', 'faction_name', 'faction_relationship', 'faction_description'],
    },
  ],
  mods: [
    {
      section: 'repeating_mods',
      fields: ['mod_autogen', 'mod_check', 'mod_name', 'mod_cost', 'mod_description'],
    },
  ],
};

const G_ATTITUDE_TURBO = {
  boosts: [
    ...Array.from(Array(4).keys(), (key) => `attitude_boost_${key + 1}`),
    ...Array.from(Array(4).keys(), (key) => `turbo_boost_${key + 1}`),
    ...Array.from(Array(4).keys(), (key) => `hype_boost_${key + 1}`),
  ],
  kicks: [
    ...Array.from(Array(4).keys(), (key) => `attitude_kick_${key + 1}`),
    ...Array.from(Array(4).keys(), (key) => `turbo_kick_${key + 1}`),
    ...Array.from(Array(4).keys(), (key) => `hype_kick_${key + 1}`),
  ],
};
