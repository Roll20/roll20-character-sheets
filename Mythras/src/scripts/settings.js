// ##### Settings #####
// Campaign Options
var campaign_options = function() {
    getAttrs(["setting_option", "luck_points_rank_option", "herculean_mod_option", "battle_units_enabled_option", "vehicle_type_option", "extended_conflict_enabled_option", "simplified_combat_enabled_option", "action_points_calc_option", "magic_points_enabled_option", "power_points_enabled_option", "prana_points_enabled_option", "tenacity_enabled_option", "spirits_enabled_option", "luther_arkwright_style_option", "m_space_style_option", "odd_soot_style_option", "boating_standard_option", "status_standard_option", "strangeness_standard_option", "superstition_standard_option", "the_soot_standard_option", "linguistics_enabled_option", "dependencies_enabled_option", "peculiarities_enabled_option", "firearms_enabled_option", "reach_enabled_option", "social_conflict_enabled_option", "affiliations_enabled_option", "ms_psionics_enabled_option", "os_magic_enabled_option", "roman_magic_enabled_option", "arcane_magic_enabled_option", "divine_magic_enabled_option", "folk_magic_enabled_option", "work_songs_enabled_option", "superpowers_enabled_option", "fae_powers_enabled_option", "folk_magic_range_multiplier_option", "alchemy_enabled_option", "animism_enabled_option", "artifice_enabled_option", "mysticism_enabled_option", "mythras_psionics_enabled_option", "sorcery_enabled_option", "theism_enabled_option", "max_devotional_pool_based_on_option"], function(v) {
        var newoptions = {};
        // Default Setting Configs
        var setting_configs = {
            sheet_style: "default",
            battle_units_enabled: "0",
            extended_conflict_enabled: "0",
            simplified_combat_enabled: "0",
            spirits_enabled: "1",
            action_points_calc: "calculate",
            herculean_mod: ".1",
            luck_points_rank: "0",
            magic_points_enabled: "1",
            power_points_enabled: "0",
            prana_points_enabled: "0",
            tenacity_enabled: "0",
            boating_standard: "1",
            status_standard: "0",
            strangeness_standard: "0",
            superstition_standard: "0",
            the_soot_standard: "0",
            linguistics_enabled: "0",
            dependencies_enabled: "0",
            peculiarities_enabled: "0",
            firearms_enabled: "0",
            reach_enabled: "1",
            ms_psionics_enabled: "0",
            os_magic_enabled: "0",
            roman_magic_enabled: "0",
            arcane_magic_enabled: "0",
            divine_magic_enabled: "0",
            superpowers_enabled: "0",
            fae_powers_enabled: "0",
            folk_magic_enabled: "1",
            work_songs_enabled: "0",
            folk_magic_range_multiplier: "1",
            alchemy_enabled: "0",
            animism_enabled: "1",
            artifice_enabled: "0",
            mysticism_enabled: "1",
            mythras_psionics_enabled: "0",
            sorcery_enabled: "1",
            theism_enabled: "1",
            affiliations_enabled: "0",
            social_conflict_enabled: "0",
            vehicle_type: "disabled",
            max_devotional_pool_based_on: "@{rank_devotion_pool_limit}",
        };
        // Setting Overrides
        if(v["setting_option"] === "luther_arkwright") {
            setting_configs["sheet_style"] = "luther_arkwright";
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["prana_points_enabled"] = "1";
            setting_configs["spirits_enabled"] = "0";
            setting_configs["tenacity_enabled"] = "1";
            setting_configs["boating_standard"] = "0";
            setting_configs["linguistics_enabled"] = "1";
            setting_configs["dependencies_enabled"] = "1";
            setting_configs["firearms_enabled"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["animism_enabled"] = "0";
            setting_configs["sorcery_enabled"] = "0";
            setting_configs["theism_enabled"] = "0";
            setting_configs["mythras_psionics_enabled"] = "1";
            setting_configs["vehicle_type"] = "mythras";
        } else if(v["setting_option"] === "agony_and_ecstasy") {
            setting_configs["spirits_enabled"] = "0";
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["power_points_enabled"] = "1";
            setting_configs["linguistics_enabled"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["animism_enabled"] = "0";
            setting_configs["mysticism_enabled"] = "0";
            setting_configs["sorcery_enabled"] = "0";
            setting_configs["theism_enabled"] = "0";
            setting_configs["superpowers_enabled"] = "1";
            setting_configs["firearms_enabled"] = "1";
            setting_configs["vehicle_type"] = "mythras";
        } else if(v["setting_option"] === "worlds_united") {
            setting_configs["spirits_enabled"] = "0";
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["tenacity_enabled"] = "1";
            setting_configs["linguistics_enabled"] = "1";
            setting_configs["firearms_enabled"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["animism_enabled"] = "0";
            setting_configs["sorcery_enabled"] = "0";
            setting_configs["theism_enabled"] = "0";
            setting_configs["mythras_psionics_enabled"] = "1";
            setting_configs["vehicle_type"] = "mythras";
        } else if(v["setting_option"] === "classic_fantasy") {
            setting_configs["sheet_style"] = "classic_fantasy";
            setting_configs["spirits_enabled"] = "0";
            setting_configs["luck_points_rank"] = "1";
            setting_configs["arcane_magic_enabled"] = "1";
            setting_configs["divine_magic_enabled"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["animism_enabled"] = "0";
            setting_configs["sorcery_enabled"] = "0";
            setting_configs["theism_enabled"] = "0";
        } else if(v["setting_option"] === "m-space") {
            setting_configs["herculean_mod"] = ".2";
            setting_configs["spirits_enabled"] = "0";
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["power_points_enabled"] = "1";
            setting_configs["sheet_style"] = "m-space";
            setting_configs["extended_conflict_enabled"] = "1",
            setting_configs["action_points_calc"] = "set_2";
            setting_configs["firearms_enabled"] = "1";
            setting_configs["reach_enabled"] = "0";
            setting_configs["ms_psionics_enabled"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["animism_enabled"] = "0";
            setting_configs["mysticism_enabled"] = "0";
            setting_configs["sorcery_enabled"] = "0";
            setting_configs["theism_enabled"] = "0";
            setting_configs["vehicle_type"] = "mspace";
        } else if(v["setting_option"] === "odd_soot") {
            setting_configs["herculean_mod"] = ".2";
            setting_configs["spirits_enabled"] = "0";
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["power_points_enabled"] = "1";
            setting_configs["sheet_style"] = "odd_soot";
            setting_configs["extended_conflict_enabled"] = "1",
            setting_configs["action_points_calc"] = "set_2";
            setting_configs["firearms_enabled"] = "1";
            setting_configs["reach_enabled"] = "0";
            setting_configs["os_magic_enabled"] = "1";
            setting_configs["peculiarities_enabled"] = "1";
            setting_configs["the_soot_standard"] = "1";
            setting_configs["strangeness_standard"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["animism_enabled"] = "0";
            setting_configs["mysticism_enabled"] = "0";
            setting_configs["sorcery_enabled"] = "0";
            setting_configs["theism_enabled"] = "0";
            setting_configs["vehicle_type"] = "mspace";
        } else if(v["setting_option"] === "monster_island") {
            setting_configs["status_standard"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["mysticism_enabled"] = "0";
        } else if(v["setting_option"] === "mythic_britain") {
            setting_configs["battle_units_enabled"] = "1";
            setting_configs["superstition_standard"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["mysticism_enabled"] = "0";
            setting_configs["sorcery_enabled"] = "0";
        } else if(v["setting_option"] === "thennla") {
            setting_configs["sheet_style"] = "thennla";
            setting_configs["work_songs_enabled"] = "1";
            setting_configs["alchemy_enabled"] = "1";
            setting_configs["artifice_enabled"] = "1";
        } else if(v["setting_option"] === "mythic_constantinople") {
            setting_configs["affiliations_enabled"] = "1";
            setting_configs["max_devotional_pool_based_on"] = "@{pow}";
        } else if(v["setting_option"] === "mythic_rome") {
            setting_configs["status_standard"] = "1";
            setting_configs["roman_magic_enabled"] = "1";
            setting_configs["folk_magic_enabled"] = "0";
            setting_configs["animism_enabled"] = "0";
            setting_configs["mysticism_enabled"] = "0";
            setting_configs["sorcery_enabled"] = "0";
            setting_configs["theism_enabled"] = "0";
        } else if(v["setting_option"] === "after_the_vampire_wars") {
            setting_configs["linguistics_enabled"] = "1";
            setting_configs["tenacity_enabled"] = "1";
            setting_configs["animism_enabled"] = "0";
            setting_configs["theism_enabled"] = "0";
            setting_configs["fae_powers_enabled"] = "1";
            setting_configs["mythras_psionics_enabled"] = "1";
            setting_configs["vehicle_type"] = "mythras";
            setting_configs["firearms_enabled"] = "1";
            setting_configs["folk_magic_range_multiplier"] = ".2";
        } else if(v["setting_option"] === "mythras_imperative") {
            setting_configs["action_points_calc"] = "set_2";
            setting_configs["spirits_enabled"] = "0";
            setting_configs["reach_enabled"] = "0";
            setting_configs["herculean_mod"] = ".2";
        } else {}

        // Sheet Style
        newoptions["sheet_style"] = setting_configs["sheet_style"];

        // Extended Conflict Resolution Enabled
        if(v["extended_conflict_enabled_option"] === "default") {
            newoptions["extended_conflict_enabled"] = setting_configs["extended_conflict_enabled"];
        } else {
            newoptions["extended_conflict_enabled"] = v["extended_conflict_enabled_option"];
        }

        // Battle Units Enabled
        if(v["battle_units_enabled_option"] === "default") {
            newoptions["battle_units_enabled"] = setting_configs["battle_units_enabled"];
        } else {
            newoptions["battle_units_enabled"] = v["battle_units_enabled_option"];
        }

        // Vehicle Type
        if(v["vehicle_type_option"] === "default") {
            newoptions["vehicle_type"] = setting_configs["vehicle_type"];
        } else {
            newoptions["vehicle_type"] = v["vehicle_type_option"];
        }

        // Simplified Combat Enabled
        if(v["simplified_combat_enabled_option"] === "default") {
            newoptions["simplified_combat_enabled"] = setting_configs["simplified_combat_enabled"];
        } else {
            newoptions["simplified_combat_enabled"] = v["simplified_combat_enabled_option"];
        }

        // Action Points Calculation Option
        if(v["action_points_calc_option"] === "default") {
            newoptions["action_points_calc"] = setting_configs["action_points_calc"];
        } else {
            newoptions["action_points_calc"] = v["action_points_calc_option"];
        }

        // Add Rank to Luck
        if(v["luck_points_rank_option"] === "default") {
            newoptions["luck_points_rank"] = setting_configs["luck_points_rank"];
        } else {
            newoptions["luck_points_rank"] = v["luck_points_rank_option"];
        }

        // Magic Points Enabled
        if(v["magic_points_enabled_option"] === "default") {
            newoptions["magic_points_enabled"] = setting_configs["magic_points_enabled"];
        } else {
            newoptions["magic_points_enabled"] = v["magic_points_enabled_option"];
        }

        // Power Points Enabled
        if(v["power_points_enabled_option"] === "default") {
            newoptions["power_points_enabled"] = setting_configs["power_points_enabled"];
        } else {
            newoptions["power_points_enabled"] = v["power_points_enabled_option"];
        }

        // Prana Enabled
        if(v["prana_points_enabled_option"] === "default") {
            newoptions["prana_points_enabled"] = setting_configs["prana_points_enabled"];
        } else {
            newoptions["prana_points_enabled"] = v["prana_points_enabled_option"];
        }

        // Spirits Enabled
        if(v["spirits_enabled_option"] === "default") {
            newoptions["spirits_enabled"] = setting_configs["spirits_enabled"];
        } else {
            newoptions["spirits_enabled"] = v["spirits_enabled_option"];
        }

        // Tenacity Enabled
        if(v["tenacity_enabled_option"] === "default") {
            newoptions["tenacity_enabled"] = setting_configs["tenacity_enabled"];
        } else {
            newoptions["tenacity_enabled"] = v["tenacity_enabled_option"];
        }

        // Herculean Modifier
        if(v["herculean_mod_option"] === "default") {
            newoptions["herculean_mod"] = setting_configs["herculean_mod"];
        } else {
            newoptions["herculean_mod"] = v["herculean_mod_option"];
        }

        // Boating Standard
        if(v["boating_standard_option"] === "default") {
            newoptions["boating_standard"] = setting_configs["boating_standard"];
        } else {
            newoptions["boating_standard"] = v["boating_standard_option"];
        }

        // Status Standard
        if(v["status_standard_option"] === "default") {
            newoptions["status_standard"] = setting_configs["status_standard"];
        } else {
            newoptions["status_standard"] = v["status_standard_option"];
        }

        // Strangeness Standard
        if(v["strangeness_standard_option"] === "default") {
            newoptions["strangeness_standard"] = setting_configs["strangeness_standard"];
        } else {
            newoptions["strangeness_standard"] = v["strangeness_standard_option"];
        }

        // Superstition Standard
        if(v["superstition_standard_option"] === "default") {
            newoptions["superstition_standard"] = setting_configs["superstition_standard"];
        } else {
            newoptions["superstition_standard"] = v["superstition_standard_option"];
        }

        // The Soot Standard
        if(v["the_soot_standard_option"] === "default") {
            newoptions["the_soot_standard"] = setting_configs["the_soot_standard"];
        } else {
            newoptions["the_soot_standard"] = v["the_soot_standard_option"];
        }

        // Linguistics Enabled
        if(v["linguistics_enabled_option"] === "default") {
            newoptions["linguistics_enabled"] = setting_configs["linguistics_enabled"];
        } else {
            newoptions["linguistics_enabled"] = v["linguistics_enabled_option"];
        }

        // Dependencies Enabled
        if(v["dependencies_enabled_option"] === "default") {
            newoptions["dependencies_enabled"] = setting_configs["dependencies_enabled"];
        } else {
            newoptions["dependencies_enabled"] = v["dependencies_enabled_option"];
        }

        // Peculiarities Enabled
        if(v["peculiarities_enabled_option"] === "default") {
            newoptions["peculiarities_enabled"] = setting_configs["peculiarities_enabled"];
        } else {
            newoptions["peculiarities_enabled"] = v["peculiarities_enabled_option"];
        }

        // Firearms Enabled
        if(v["firearms_enabled_option"] === "default") {
            newoptions["firearms_enabled"] = setting_configs["firearms_enabled"];
        } else {
            newoptions["firearms_enabled"] = v["firearms_enabled_option"];
        }

        // Reach Enabled
        if(v["reach_enabled_option"] === "default") {
            newoptions["reach_enabled"] = setting_configs["reach_enabled"];
        } else {
            newoptions["reach_enabled"] = v["reach_enabled_option"];
        }

        // M-Space Psionics Enabled
        if(v["ms_psionics_enabled_option"] === "default") {
            newoptions["ms_psionics_enabled"] = setting_configs["ms_psionics_enabled"];
        } else {
            newoptions["ms_psionics_enabled"] = v["ms_psionics_enabled_option"];
        }

        // Odd Soot Magic Enabled
        if(v["os_magic_enabled_option"] === "default") {
            newoptions["os_magic_enabled"] = setting_configs["os_magic_enabled"];
        } else {
            newoptions["os_magic_enabled"] = v["os_magic_enabled_option"];
        }

        // Roman Magic Enabled
        if(v["roman_magic_enabled_option"] === "default") {
            newoptions["roman_magic_enabled"] = setting_configs["roman_magic_enabled"];
        } else {
            newoptions["roman_magic_enabled"] = v["roman_magic_enabled_option"];
        }

        // Arcane Magic Enabled
        if(v["arcane_magic_enabled_option"] === "default") {
            newoptions["arcane_magic_enabled"] = setting_configs["arcane_magic_enabled"];
        } else {
            newoptions["arcane_magic_enabled"] = v["arcane_magic_enabled_option"];
        }

        // Divine Magic Enabled
        if(v["divine_magic_enabled_option"] === "default") {
            newoptions["divine_magic_enabled"] = setting_configs["divine_magic_enabled"];
        } else {
            newoptions["divine_magic_enabled"] = v["divine_magic_enabled_option"];
        }

         // Superpowers Enabled
        if(v["superpowers_enabled_option"] === "default") {
            newoptions["superpowers_enabled"] = setting_configs["superpowers_enabled"];
        } else {
            newoptions["superpowers_enabled"] = v["superpowers_enabled_option"];
        }

         // Fae Powers Enabled
        if(v["fae_powers_enabled_option"] === "default") {
            newoptions["fae_powers_enabled"] = setting_configs["fae_powers_enabled"];
        } else {
            newoptions["fae_powers_enabled"] = v["fae_powers_enabled_option"];
        }

        // Folk Magic Enabled
        if(v["folk_magic_enabled_option"] === "default") {
            newoptions["folk_magic_enabled"] = setting_configs["folk_magic_enabled"];
        } else {
            newoptions["folk_magic_enabled"] = v["folk_magic_enabled_option"];
        }

        // Work Songs Enabled
        if(v["work_songs_enabled_option"] === "default") {
            newoptions["work_songs_enabled"] = setting_configs["work_songs_enabled"];
        } else {
            newoptions["work_songs_enabled"] = v["work_songs_enabled_option"];
        }

        // Folk Magic Range Multiplier
        if(v["folk_magic_range_multiplier_option"] === "default") {
            newoptions["folk_magic_range_multiplier"] = setting_configs["folk_magic_range_multiplier"];
        } else {
            newoptions["folk_magic_range_multiplier"] = v["folk_magic_range_multiplier_option"];
        }

        // Alchemy Enabled
        if(v["alchemy_enabled_option"] === "default") {
            newoptions["alchemy_enabled"] = setting_configs["alchemy_enabled"];
        } else {
            newoptions["alchemy_enabled"] = v["alchemy_enabled_option"];
        }

        // Animism Enabled
        if(v["animism_enabled_option"] === "default") {
            newoptions["animism_enabled"] = setting_configs["animism_enabled"];
        } else {
            newoptions["animism_enabled"] = v["animism_enabled_option"];
        }

        // Artifice Enabled
        if(v["artifice_enabled_option"] === "default") {
            newoptions["artifice_enabled"] = setting_configs["artifice_enabled"];
        } else {
            newoptions["artifice_enabled"] = v["artifice_enabled_option"];
        }

        // Mysticism Enabled
        if(v["mysticism_enabled_option"] === "default") {
            newoptions["mysticism_enabled"] = setting_configs["mysticism_enabled"];
        } else {
            newoptions["mysticism_enabled"] = v["mysticism_enabled_option"];
        }

        // Mythras Psionics Enabled
        if(v["mythras_psionics_enabled_option"] === "default") {
            newoptions["mythras_psionics_enabled"] = setting_configs["mythras_psionics_enabled"];
        } else {
            newoptions["mythras_psionics_enabled"] = v["mythras_psionics_enabled_option"];
        }

        // Sorcery Enabled
        if(v["sorcery_enabled_option"] === "default") {
            newoptions["sorcery_enabled"] = setting_configs["sorcery_enabled"];
        } else {
            newoptions["sorcery_enabled"] = v["sorcery_enabled_option"];
        }

        // Theism Enabled
        if(v["theism_enabled_option"] === "default") {
            newoptions["theism_enabled"] = setting_configs["theism_enabled"];
        } else {
            newoptions["theism_enabled"] = v["theism_enabled_option"];
        }

         // Max Devotional Pool Based On
        if(v["max_devotional_pool_based_on_option"] === "default") {
            newoptions["max_devotional_pool_based_on"] = setting_configs["max_devotional_pool_based_on"];
        } else {
            newoptions["max_devotional_pool_based_on"] = v["max_devotional_pool_based_on_option"];
        }

        // Affiliations Enabled
        if(v["affiliations_enabled_option"] === "default") {
            newoptions["affiliations_enabled"] = setting_configs["affiliations_enabled"];
        } else {
            newoptions["affiliations_enabled"] = v["affiliations_enabled_option"];
        }

        // Social Conflict Enabled
        if(v["social_conflict_enabled_option"] === "default") {
            newoptions["social_conflict_enabled"] = setting_configs["social_conflict_enabled"];
        } else {
            newoptions["social_conflict_enabled"] = v["social_conflict_enabled_option"];
        }

        setAttrs(newoptions);
    });
}

//Set campaign options if any change
on("change:setting_option change:vehicle_type_option change:battle_units_enabled_option change:extended_conflict_enabled_option change:simplified_combat_enabled_option change:luck_points_rank_option change:herculean_mod_option change:action_points_calc_option change:magic_points_enabled_option change:power_points_enabled_option change:prana_points_enabled_option change:spirits_enabled_option change:tenacity_enabled_option change:status_standard_option change:strangeness_standard_option change:superstition_standard_option change:the_soot_standard_option change:boating_standard_option change:linguistics_enabled_option change:dependencies_enabled_option change:peculiarities_enabled_option change:firearms_enabled_option change:reach_enabled_option change:social_conflict_enabled_option change:affiliations_enabled_option change:roman_magic_enabled_option change:arcane_magic_enabled_option change:divine_magic_enabled_option change:superpowers_enabled_option change:fae_powers_enabled_option change:folk_magic_enabled_option change:work_songs_enabled_option change:folk_magic_range_multiplier_option change:alchemy_enabled_option change:animism_enabled_option change:artifice_enabled_option change:mysticism_enabled_option change:mythras_psionics_enabled_option change:ms_psionics_enabled_option change:os_magic_enabled_option change:sorcery_enabled_option change:theism_enabled_option change:max_devotional_pool_based_on_option", function() {
    console.log("Setting campaign options")
    campaign_options();
});
