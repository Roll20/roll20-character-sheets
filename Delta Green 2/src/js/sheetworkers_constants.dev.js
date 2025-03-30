"use strict";

// check initialization so it updates only once per game at most
var _isInitialized = false; // === ATTRIBUTE ARRAYS

var arrays = {
  _stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
  _derived_stats: ['hit_points', 'sanity_points', 'willpower_points', 'breaking_point'],
  _derived_stats_max: ['sanity_points_max', 'hit_points_max', 'willpower_points_max', 'breaking_point_max'],
  _hit_points: ['strength_score', 'constitution_score'],
  _willpower_points: ['power_score'],
  _toggles: ['settings'],
  _sanity_loss: ['sanity_loss_success', 'sanity_loss_failure'],
  _skills: ['accounting', 'alertness', 'anthropology', 'archeology', 'art_1', 'art_2', 'artillery', 'athletics', 'bureaucracy', 'computer_science', 'craft_1', 'craft_2', 'criminology', 'demolitions', 'disguise', 'dodge', 'drive', 'firearms', 'first_aid', 'forensics', 'heavy_machinery', 'heavy_weapons', 'history', 'humint', 'law', 'medicine', 'melee_weapons', 'military_science_1', 'military_science_2', 'navigate', 'occult', 'persuade', 'pharmacy', 'pilot_1', 'pilot_2', 'psychotherapy', 'ride', 'science_1', 'science_2', 'search', 'sigint', 'stealth', 'surgery', 'survival', 'swim', 'unarmed_combat'],
  _colored_derivative: ['willpower', 'hit'],
  _derived_rolls: ['sanity_points', 'luck'],
  _disorder_related: ['sanity_points', 'breaking_point'],
  _derived_modifiers: ['willpower_points', 'low_willpower', 'zero_willpower'],
  _settings_wp: ["mod_willpower_check"],
  _adaptation: ['violence', 'helplessness'],
  _editable_skills: ['art_1', 'art_2', 'craft_1', 'craft_2', 'military_science_1', 'military_science_2', 'pilot_1', 'pilot_2', 'science_1', 'science_2'],
  _weapon: ["name", "skill_percent", "base_range", "damage", "armor_piercing", "lethality_percent", "ammo"],
  _rituals: ['name', 'skill_span', 'unnatural_gain', 'study_time', 'sanity_loss_for_learning', 'activation_time', 'description', 'complexity'],
  _personal_data: ['profession', 'employer', 'occupation', 'nationality_and_residence', 'sex', 'age', 'education', 'personal_details_and_notes', 'developments_which_affect_home_and_family', 'description', 'physical_description', 'npc_sources', 'npc_remarks'],
  _advanced_weapons_featurs: ["shotgun", "blast_radius", "hasDoubleBarrel", "selfire", 'accessories'],
  _weapon_hidden_buttons: ['damage', 'lethality_percent', 'double_barrel', 'selective_fire'],
  _ritual_hidden_buttons: ['pay_cost', 'force_connection', 'accept_failure', 'attack', 'heal', 'power']
};
var _skill_percent = [{
  section: 'skills',
  field: 'rank'
}, {
  section: 'special',
  field: 'skill_or_stat_used'
}, {
  section: 'weapons',
  field: 'skill_percent'
}, {
  section: 'rituals',
  field: 'skill_percent'
}];
var _initial_skills = {
  'accounting': 10,
  'alertness': 20,
  'anthropology': 0,
  'archeology': 0,
  'art_1': 0,
  'art_2': '0',
  'artillery': 0,
  'athletics': 30,
  'bureaucracy': 10,
  'computer_science': 0,
  'craft_1': 0,
  'craft_2': 0,
  'criminology': 10,
  'demolitions': 0,
  'disguise': 10,
  'dodge': 30,
  'drive': 20,
  'firearms': 20,
  'first_aid': 10,
  'forensics': 0,
  'heavy_machinery': 10,
  'heavy_weapons': 0,
  'history': 10,
  'humint': 10,
  'law': 0,
  'medicine': 0,
  'melee_weapons': 30,
  'military_science_1': 0,
  'military_science_2': 0,
  'navigate': 10,
  'occult': 10,
  'persuade': 20,
  'pharmacy': 0,
  'pilot_1': 0,
  'pilot_2': 0,
  'psychotherapy': 10,
  'ride': 10,
  'science_1': 0,
  'science_2': 0,
  'search': 20,
  'sigint': 0,
  'stealth': '10',
  'surgery': 0,
  'survival': 10,
  'swim': 20,
  'unarmed_combat': 40,
  'unnatural': 0
};
var _repeating_sections = {
  'skill': 'skills',
  'bond': 'bonds',
  'special': 'special',
  'weapons': 'weapons',
  'ritual': 'rituals'
};
var _score_info = ["willpower_points_max", "charisma_score", "character_creation_bonds", "repeating_bonds_setScore", "repeating_bonds_score", "repeating_bonds_score_old", "repeating_bonds_color"];
var _bond_attributes = ["name", "test", "score", "hurt"];
var _repeating_damages = ['damage', 'damage_critical', 'lethality_percent', 'lethality_percent_critical', 'double_barrel', 'double_barrel_critical', 'selective_fire', 'selective_fire_critical'];
var _repeating_ammo = ['hasammo', 'ammo', 'ammo_total'];
var _rd100 = "[[1d100]]";
var _rd4 = "[[1d4]]";
var _rd6 = "[[1d6]]";
var _rd8 = "[[1d8]]";
var _rd10 = "[[1d10]]";
var _rd12 = "[[1d12]]";
var _rd20 = "[[1d20]]";
var _INHUMAN_STAT_ = 100;
var _criticals = [1, 11, 22, 33, 44, 55, 66, 77, 88, 99, 100];
var _queryModifier = "?{Modifier|0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}";
var prefix_skill_roll = "@{gm_toggle} &{template:fancy-rolls} {{name=@{character_name}}} {{dice=[[".concat(_rd100, "]]}}");
var prefix_sanity_roll = "@{gm_toggle} &{template:fancy-sanloss} "; // roll to use in rituals
// isHealing -> -1 for attack, 1 for heal, 0 for normal damages

var prefix_attack_roll = "@{gm_toggle} &{template:fancy-damages} {{name=@{character_name}}} {{isHealing=[[-1]]}} {{trackbullets=[[0]]}} {{header=^{attack}}}";
var prefix_health_roll = "@{gm_toggle} &{template:fancy-damages} {{name=@{character_name}}} {{isHealing=[[1]]}} {{trackbullets=[[0]]}} {{header=^{heal} }}"; // roll to use in weapons

var prefix_damage_roll = "@{gm_toggle} &{template:fancy-damages} {{name=@{character_name}}} {{isHealing=[[0]]}} {{usAiming=[[0]]}}";
var prefix_bond_roll = "@{gm_toggle} &{template:fancy-bonds} {{character_id=@{character_id}}}{{name=@{character_name}}} {{dice=[[".concat(_rd4, "]]}}");
var prefix_ritual_roll = "@{gm_toggle} &{template:fancy-rituals} {{name=@{character_name}}} {{dice=[[".concat(_rd100, "]]}}");
var prefix_ritualloss_roll = "@{gm_toggle} &{template:fancy-ritualloss} {{name=@{character_name}}} {{header=^{ritual cost}}}";
var _shotgun_or_blast_radius = ["shotgun", "blast_radius"];
var _alldamages = ['damage', 'damage_critical', 'double_barrel', 'double_barrel_critical', 'lethality_percent', 'lethality_percent_critical', 'selective_fire', 'selective_fire_critical'];
var _ritual_damages = ['attack', 'heal', 'power'];
var _type_damages = ['damage', 'lethality_percent'];
var _ritual_losses = ['pay_cost', 'force_connection', 'accept_failure'];

var _allrolls = arrays['_derived_rolls'].concat(arrays["_stats"], arrays["_skills"], ['unnatural', 'sanity_loss']);

var RitualCosts = ['sanity_loss_success', 'sanity_loss_failure', 'willpower_points_cost', 'power_score_cost', 'hit_points_cost', 'strength_score_cost', 'constitution_score_cost', 'dexterity_score_cost', 'intelligence_score_cost', 'charisma_score_cost'];
var CurrentValues = ['sanity_points', 'willpower_points', 'power_score', 'hit_points', 'strength_score', 'constitution_score', 'dexterity_score', 'intelligence_score', 'charisma_score'];
var RitualRolls = ['name', 'skill_span', 'unnatural_gain', 'study_time', 'sanity_loss_for_learning', 'activation_time', 'description', 'complexity', 'flawed_ritual', 'power_reaction'];
var RitualDamages = ['attack_target_stat', 'attack_damage_amount', 'attack_lethality_percent_amount', 'attack_isLethal'];
var RitualHeals = ['heal_target_stat', 'heal_damage_amount', 'heal_lethality_percent_amount', 'heal_isLethal'];
var _ritualInfo = ['complexity', 'activation_time', 'activation_time_unit', 'study_time', 'study_time_unit', 'unnatural_gain', 'sanity_loss_for_learning', 'willpower_points_cost', 'power_score_cost', 'hit_points_cost', 'strength_score_cost', 'constitution_score_cost', 'dexterity_score_cost', 'intelligence_score_cost', 'charisma_score_cost', 'sanity_loss_success', 'sanity_loss_failure'];
var selector = 'button.roll';
var sanity_selector = 'button.sanroll';
var _globalModifier = 0;
var _number_or_roll = [{
  section: 'weapons',
  fields: ['damage', 'double_barrel']
}, {
  section: 'rituals',
  fields: ['sanity_loss_low', 'sanity_loss_high', 'attr_sanity_loss_for_learning', 'attr_unnatural_gain', 'heal_damage_amount', 'attack_damage_amount', 'willpower_points_cost', 'healpoints_cost', 'strength_score_cost', 'constitution_score_cost', 'dexterity_score_cost', 'intelligence_score_cost', 'charisma_score_cost', 'power_score_cost']
}];
var _only_number = [{
  section: 'weapons',
  fields: ['lethality_percent', 'selfire_lethality_percent', 'accessory_modifier']
}, {
  section: 'rituals',
  fields: ['attack_lethality_percent_amount', 'heallethality_percent_amount']
}];