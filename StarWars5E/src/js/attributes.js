const pc_attrs = [
    //BIO
    "character_appearance","character_backstory","miscellaneous","allies_and_organizations",
    "additional_feature_and_traits","treasure","storage",
    //BIO HEADER
    "character_name","age","size","height","weight","eyes","skin","hair",
    //CORE CHARACTERISTICS
    "strength_mod","strength_base","strength","strength_flag",
    "dexterity_mod","dexterity_base","dexterity","dexterity_flag",
    "constitution_mod","constitution_base","constitution","constitution_flag",
    "intelligence_mod","intelligence_base","intelligence","intelligence_flag",
    "wisdom_mod","wisdom_base","wisdom",
    "charisma_mod","charisma_base","charisma","charisma_flag",
    //CORE MISC
    "inspiration","pb",
    "global_save_mod_flag",
    "missing_info",
    //CORE SAVES PROF
    "strength_save_prof","strength_save_bonus",
    "dexterity_save_prof","dexterity_save_bonus",
    "constitution_save_prof","constitution_save_bonus",
    "intelligence_save_prof","intelligence_save_bonus",
    "wisdom_save_prof","wisdom_save_bonus",
    "charisma_save_prof","charisma_save_bonus",
    //CORE SKILLS
    "acrobatics_prof","acrobatics_bonus",
    "animal_handling_prof","animal_handling_bonus",
    "athletics_prof","athletics_bonus",
    "deception_prof","deception_bonus",
    "insight_prof","insight_bonus",
    "intimidation_prof","intimidation_bonus",
    "investigation_prof","investigation_bonus",
    "lore_prof","lore_bonus",
    "medicine_prof","medicine_bonus",
    "nature_prof","nature_bonus",
    "perception_prof","perception_bonus",
    "performance_prof","performance_bonus",
    "persuasion_prof","persuasion_bonus",
    "piloting_prof","piloting_bonus",
    "sleight_of_hand_prof","sleight_of_hand_bonus",
    "stealth_prof","stealth_bonus",
    "survival_prof","survival_bonus",
    "technology_prof","technology_bonus",
    "passive_wisdom",
    "global_skill_mod_flag",
    //CORE TOOLS & DEPLOYMENTS
    "simpleproficencies","other_proficiencies_and_languages","deployments",
    //CORE DERIVATED
    "ac","initiative_bonus","speed",
    "hp_max","hp","hp_temp","hit_dice_max","hit_dice",
    "deathsave_succ1","deathsave_succ2","deathsave_succ3",
    "deathsave_fail1","deathsave_fail2","deathsave_fail3",
    "exhaustion_toggle","exhaustion_level","exhaustion_1"
    ,"exhaustion_2","exhaustion_3","exhaustion_4","exhaustion_5"
    ,"exhaustion_6",
    //CORE ATTACKS
    "ammotracking","global_attack_mod_flag",
    //CORE INVENTORY
    "cr","simpleinventory","equipment",
    "armorwarningflag","armorwarning",
    "weighttotal","encumberance",
    //CORE PERSONALITY
    "options-flag-personality","personality_traits",
    "options-flag-ideals","ideals",
    "options-flag-bonds","bonds",
    "options-flag-flaws","flaws",
    //CORE RESSOURCES
    "class_resource_max","class_resource","class_resource_name",
    "other_resource_max","other_resource","other_resource_name",
    //CORE FEATURES
    "simpletraits","features_and_traits",
    //CORE HEADER
    "character_name","options-class-selection","custom_class","class",
    "cust_classname","subclass","base_level","race","subrace",
    "class_display","background","race_display","alignment","experience",
    //POWER HEADER
    "character_name","powercasting_ability","power_save_dc","power_attack_bonus",
    //CONFIG
    "hitdietype","carrying_capacity_mod","globalpowermod","caster_level","power_dc_mod",
    "powericon_flag","precognition_flag","tech_fighter","tech_operative",
    "multiclass1_flag","multiclass1","multiclass1_lvl","multiclass1_subclass",
    "multiclass2_flag","multiclass2","multiclass2_lvl","multiclass2_subclass",
    "multiclass3_flag","multiclass3","multiclass3_lvl","multiclass3_subclass",
    "custom_class","cust_classname","cust_hitdietype","cust_powercasting_ability",
    "cust_powerslots","cust_strength_save_prof","cust_dexterity_save_prof","cust_constitution_save_prof",
    "cust_intelligence_save_prof","cust_wisdom_save_prof","cust_charisma_save_prof",
    "strength_bonus","dexterity_bonus","constitution_bonus",
    "intelligence_bonus","wisdom_bonus","charisma_bonus",
    "initmod","initiative_style","init_tiebreaker","globalacmod","custom_ac_flag","custom_ac_flag",
    "custom_ac_base","custom_ac_part1","custom_ac_part2","strength_save_mod","dexterity_save_mod",
    "constitution_save_mod","intelligence_save_mod","wisdom_save_mod","charisma_save_mod","death_save_mod",
    "globalsavemod","acrobatics_type","acrobatics_flat","animal_handling_type","animal_handling_flat",
    "technology_type","technology_flat","athletics_type","athletics_flat","deception_type",
    "deception_flat","lore_type","lore_flat","insight_type","insight_flat","intimidation_type",
    "intimidation_flat","investigation_type","investigation_flat","medicine_type","medicine_flat",
    "nature_type","nature_flat","perception_type","perception_flat","performance_type",
    "performance_flat","persuasion_type","persuasion_flat","piloting_type","piloting_flat",
    "sleight_of_hand_type","sleight_of_hand_flat","stealth_type","stealth_flat","survival_type",
    "survival_flat","jack_of_all_trades","passiveperceptionmod","version","npc","rtype","wtype",
    "dtype","core_die","pb_type","pb_type","pb_custom","global_save_mod_flag",
    "global_skill_mod_flag","global_attack_mod_flag","global_damage_mod_flag","charname_output",
    "level_calculations","encumberance_setting",
    "ammotracking","exhaustion_toggle"
];

const pc_repeating = [
    {
        section_name:"repeating_savemod",
        attributes:["options-flag","global_save_active_flag","global_save_rollstring"]
    },
    {
        section_name:"repeating_tool",
        attributes:["options-flag","toolname","toolbonus_base","toolbase",
            "tool_mod","toolname","toolbonus_display","toolbonus","toolattr"]
    },
    {
        section_name:"repeating_skillmod",
        attributes:["options-flag","global_skill_active_flag","global_skill_rollstring"]
    },
    {
        section_name:"repeating_proficiencies",
        attributes:["options-flag","prof_type","name"]
    },
    {
        section_name:"repeating_deployments",
        attributes:["options-flag","deployment_type","deployment_rank","deployment_rank","deployment_type"]
    },
    {
        section_name:"repeating_attack",
        attributes:["options-flag","atkname","atkflag","atkbase",
            "atkmod","atkprofflag","atkrange","atkpower","atkcritrange",
            "dmgflag","dmgbase","dmgattr","dmgmod","dmgtype","dmgcustcrit",
            "dmg2flag","dmg2base","dmg2attr","dmg2mod","dmg2type","dmg2custcrit",
            "saveflag","saveattr","savedc","savedc","saveflat","saveeffect","ammo",
            "atk_desc","atkname","atkbonus","atkdmgtype",
            "rollbase","rollbase_dmg","rollbase_crit","hldmg",
            "powerlevel","power_innate","versatile_alt"]
    },
    {
        section_name:"repeating_tohitmod",
        attributes:["options-flag","global_attack_active_flag","global_attack_rollstring",
            "global_attack_rollstring","global_damage_mod_flag"]
    },
    {
        section_name:"repeating_damagemod",
        attributes:["options-flag","global_damage_active_flag","global_damage_rollstring",
            "global_damage_type","global_damage_rollstring","global_damage_type"]
    },
    {
        section_name:"repeating_inventory",
        attributes:["equipped","itemcount","itemname","itemweight",
            "inventorysubflag","equipped","useasresource","hasattack",
            "itemproperties","itemmodifiers","itemcontent"]
    },
    {
        section_name:"repeating_resource",
        attributes:["resource_left_max","resource_left","resource_left_name",
            "resource_right_max","resource_right","resource_right_name"]
    },
    {
        section_name:"repeating_traits",
        attributes:["options-flag","display_flag","name","source","source_type","description"]
    },
];
    
const npc_attrs = [
    "npc_name","npc_type","npc_ac", "npc_actype", "hp_max", "npc_hpformula", "npc_speed",
    "strength_base", "dexterity_base", "constitution_base", "intelligence_base", "wisdom_base", "charisma_base",
    "npc_str_save_base", "npc_dex_save_base", "npc_con_save_base",
    "npc_int_save_base", "npc_wis_save_base", "npc_cha_save_base",
    "npc_str_save", "npc_dex_save", "npc_con_save", "npc_int_save",
    "npc_wis_save", "npc_cha_save",
    "npc_acrobatics_base", "npc_animal_handling_base", "npc_athletics_base", "npc_deception_base",
    "npc_insight_base", "npc_intimidation_base", "npc_investigation_base", "npc_lore_base", "npc_medicine_base",
    "npc_nature_base", "npc_perception_base", "npc_performance_base", "npc_persuasion_base", "npc_piloting_base",
    "npc_sleight_of_hand_base", "npc_stealth_base", "npc_survival_base", "npc_technology_base",
    "npc_acrobatics", "npc_animal_handling", "npc_athletics", "npc_deception", "npc_insight", "npc_intimidation",
    "npc_investigation", "npc_lore", "npc_medicine", "npc_nature", "npc_perception", "npc_performance",
    "npc_persuasion", "npc_piloting", "npc_sleight_of_hand", "npc_stealth", "npc_survival", "npc_technology",
    "npc_vulnerabilities", "npc_resistances", "npc_immunities", "npc_condition_immunities", "npc_senses",
    "npc_languages", "npc_challenge", "npc_xp", "token_size",
    "npcpowercastingflag", "powercasting_ability", "globalpowermod", "caster_level", "power_dc_mod",
    "npcreactionsflag", "npc_legendary_actions", "rtype", "wtype", "dtype", "npc_name_flag", "init_tiebreaker"
];

const npc_repeating = [
    {
        section_name:"repeating_npctrait",
        attributes:["npc_options-flag","name","desc"]
    },
    {
        section_name:"repeating_npcaction",
        attributes:["npc_options-flag","name",
            "attack_flag","attack_type","attack_range","attack_tohit","attack_target","damage_flag","attack_damage",
            "attack_damagetype","attack_crit","attack_damage2","attack_damagetype2","attack_crit2","show_desc",
            "description","attack_tohitrange","attack_onhit"]
    },
    {
        section_name:"repeating_npcreaction",
        attributes:["npc_options-flag","name","desc"]
    },
    {
        section_name:"repeating_legendary",
        attributes:["npc_options-flag","name",
            "attack_flag","attack_type","attack_range", "attack_tohit", "attack_target", "damage_flag", "attack_damage",
            "attack_damagetype", "attack_crit", "attack_damage2", "attack_damagetype2", "attack_crit2", "show_desc",
            "description", "attack_tohitrange", "attack_onhit"]
    }
];

const power_levels = ["cantrip",1,2,3,4,5,6,7,8,9];
const power_repeating_attr = ["options-flag","detail-flag","powername","powerschool","powercastingtime",
    "powerrange","powertarget","powerconcentration","powerduration","power_ability","innate","poweroutput",
    "poweroutput","powerattack","powerdamage","powerdamagetype","powerdamage2","powerdamagetype2","powerhealing",
    "powerdmgmod","power_damage_progression","powersave","powersavesuccess","powerhldie","powerhldietype",
    "powerhlbonus","includedesc","powerdescription","powerathigherlevels","powerlevel"
];
const power_attrs = [
    "force_power_points_total","force_power_points_expended","tech_power_points_total","tech_power_points_expended"
];

const powerSections = [];
for(let power_level of power_levels){
    powerSections.push({
        "section_name": `repeating_power-${power_level}`,
        "attributes": power_repeating_attr
    });
}

const ship_attrs = [
    //SHIP CARGO
    "cr","simpleinventory","equipment","armorwarningflag","armorwarning",    
    "weighttotal","hiddencr","hiddenweighttotal","ship_notes","ship_fuel_max",
    "ship_fuel_current","ship_fuel_cost","ship_food_max","ship_food_current",
    "ship_reg_cargo_max","ship_hidden_cargo_max","hiddenweighttotal",
    //SHIP CONFIG
    "version","npc","rtype","wtype","dtype","core_die","global_attack_mod_flag",
    "global_damage_mod_flag","charname_output","simpletraits","ammotracking","custom_ac_flag",
    "strength_save_mod","dexterity_save_mod","constitution_save_mod","intelligence_save_mod",
    "wisdom_save_mod","charisma_save_mod","death_save_mod","globalsavemod","ship_boost_type",
    "ship_boost_flat","ship_ram_type","ship_ram_flat","ship_hide_type","ship_hide_flat",
    "ship_maneuvering_type","ship_maneuvering_flat","ship_patch_type","ship_patch_flat",
    "ship_regulation_type","ship_regulation_flat","ship_astrogation_type","ship_astrogation_flat",
    "ship_data_type","ship_data_flat","ship_probe_type","ship_probe_flat","ship_scan_type",
    "ship_scan_flat","ship_impress_type","ship_impress_flat","ship_interfere_type","ship_interfere_flat",
    "ship_menace_type","ship_menace_flat","ship_swindle_type","ship_swindle_flat","jack_of_all_trades",
    "passiveperceptionmod","options-flag","ship_armor_active_flag","ship_armor_name",
    "ship_armor_ac_bonus","ship_armor_hp_per_hit_die","ship_armor_name","ship_armor_ac_bonus",
    "ship_armor_hp_per_hit_die","ship_shield_active_flag","ship_shield_name","ship_shield_capacity",
    "ship_shield_regen_rate_coefficient","ship_shield_name","ship_shield_capacity",
    "ship_shield_regen_rate_coefficient",
    //SHIP CORE
    "strength_mod","strength_base","strength","strength_flag","strength",
    "dexterity_mod","dexterity_base","dexterity","dexterity_flag","dexterity",
    "constitution_mod","constitution_base","constitution","constitution_flag","constitution",
    "intelligence_mod","intelligence_base","intelligence","intelligence_flag","intelligence",
    "wisdom_mod","wisdom_base","wisdom","wisdom_flag","wisdom",
    "charisma_mod","charisma_base","charisma","charisma_flag",,"charisma",
    "hyperdrive_class","navcomputer_bonus","pb","pilot_skill","strength_save_prof",
    "strength_save_bonus","dexterity_save_prof","dexterity_save_bonus","constitution_save_prof",
    "constitution_save_bonus","intelligence_save_prof","intelligence_save_bonus","wisdom_save_prof",
    "wisdom_save_bonus","charisma_save_prof","charisma_save_bonus","global_save_mod_flag",
    "global_save_active_flag","global_save_rollstring","global_save_rollstring","ship_boost_prof",
    "ship_boost_bonus","ship_ram_prof","ship_ram_bonus","ship_hide_prof","ship_hide_bonus",
    "ship_maneuvering_prof","ship_maneuvering_bonus","ship_patch_prof","ship_patch_bonus",
    "ship_regulation_prof","ship_regulation_bonus","ship_astrogation_prof","ship_astrogation_bonus",
    "ship_data_prof","ship_data_bonus","ship_probe_prof","ship_probe_bonus","ship_scan_prof",
    "ship_scan_bonus","ship_impress_prof","ship_impress_bonus","ship_interfere_prof",
    "ship_interfere_bonus","ship_menace_prof","ship_menace_bonus","ship_swindle_prof",
    "ship_swindle_bonus","ac","ship_turnspeed","ship_flyspeed","hp_max",
    "ship_dmg_reduction","hp","ship_shield_max","ship_shield_regen_rate","ship_shield_points",
    "ship_armor","ship_shield","hull_dice_max","hull_dice","shield_dice_max",
    "shield_dice","deathsave_succ1","deathsave_succ2","deathsave_succ3","system_dmg_lvl",
    "ship_reactor","ship_pwr_coupling","passive_wisdom","passive_ship_scan","ammotracking",
    "global_attack_mod_flag",
    "pwr_c_storage","pwr_c_storage_actual","pwr_s_storage","pwr_comm_storage_actual","pwr_s_storage",
    "pwr_engine_storage_actual","pwr_s_storage","pwr_shields_storage_actual","pwr_s_storage",
    "pwr_sensors_storage_actual","pwr_s_storage","pwr_weapons_storage_actual","class_resource_max",
    "class_resource","class_resource_name","other_resource_max","other_resource","other_resource_name",
    "simpletraits","features_and_traits",
    //SHIP MODS
    "ship_mod_max","ship_mod_current","ship_hardpoints_max","ship_hardpoints_current",
    "ship_t_hardpoints_max","ship_t_hardpoints_current",
    //SHIP SUITES
    "ship_mod_max","ship_mod_current","ship_suites_max","ship_suites_current"
];

const ship_repeating = [
    {
        section_name:"repeating_inventory",
        attributes:["equipped","itemcount","itemname","itemweight","inventorysubflag","equipped",
            "useasresource","hasattack","itemproperties","itemmodifiers",
            "itemcontent"]
    },
    {
        section_name:"repeating_hiddeninventory",
        attributes:["equipped","itemcount","itemname","itemweight","inventorysubflag","equipped",
            "useasresource","hasattack","itemproperties","itemmodifiers",
            "itemcontent"]
    },
    {
        section_name:"repeating_attack",
        attributes:["option_flag","ship_weapon_category","ship_weapon_facing","atkname","atkflag",
            "atkbase","atkmod","atkprofflag","atkrange","atkcritrange","dmgflag",
            "dmgbase","dmgattr","dmgmod","dmgtype","dmgcustcrit","dmg²2flag",
            "dmg2base","dmg2attr","dmg2mod","dmg2type","dmg2custcrit","saveflag",
            "saveattr","savedc","savedc","saveflat","saveeffect","ammo","atk_per_round",
            "atk_desc","ship_weapon_category","ship_weapon_facing","atkname","atkrange",
            "atkbonus","atkdmgtype","atk_per_round","rollbase","rollbase_dmg",
            "rollbase_crit","hldmg","powerlevel","power_innate","versatile_alt"]
    },
    {
        section_name:"repeating_tohitmod",
        attributes:["options-flag","global_attack_active_flag","global_attack_rollstring",
            "global_attack_rollstring","global_damage_mod_flag"]
    },
    {
        section_name:"repeating_damagemod",
        attributes:["options-flag","global_damage_active_flag","global_damage_rollstring",
            "global_damage_type","global_damage_rollstring","global_damage_type"]
    },
    {
        section_name:"repeating_resource",
        attributes:["resource_left_max","resource_left","resource_left_name",
            "resource_right_max","resource_right","resource_right_name"]
    },
    {
        section_name:"repeating_shiptraits",
        attributes:["options-flag","display_flag","name","source","source_type","description"]
    },
    {
        section_name:"repeating_modifications",
        attributes:["options-flag","display_flag","name","source","source_type",
            "mod_grade","mod_cost","description"]
    },
    {
        section_name:"repeating_suites",
        attributes:["options-flag","display_flag","suite_name","suite_source",
            "suite_source_type","suite_grade","suite_mod_cost","suite_description"]
    }
];



