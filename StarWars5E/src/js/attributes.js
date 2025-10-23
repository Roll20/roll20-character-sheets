const pc_attrs = [

];

const pc_repeating = [
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
            "description","attack_tohitrange","attack_onhit"

        ]
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
            "description", "attack_tohitrange", "attack_onhit"        ]
    }
];

const power_levels = ['cantrip',1,2,3,4,5,6,7,8,9];
const power_repeating_attr = ["options-flag","detail-flag","powername","powerschool","powercastingtime",
    "powerrange","powertarget","powerconcentration","powerduration","power_ability","innate","poweroutput",
    "poweroutput","powerattack","powerdamage","powerdamagetype","powerdamage2","powerdamagetype2","powerhealing",
    "powerdmgmod","power_damage_progression","powersave","powersavesuccess","powerhldie","powerhldietype",
    "powerhlbonus","includedesc","powerdescription","powerathigherlevels","powerattackid","powerlevel"
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

];

const ship_repeating = [

];
