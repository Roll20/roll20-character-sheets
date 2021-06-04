// ##### JSON Import #####
on("change:encounter_generator_json", function() {
    getAttrs(["encounter_generator_json", "simplified_combat_enabled"], function(values) {
        var simplified_combat_enabled = parseInt(values.simplified_combat_enabled);
        var jsonData = JSON.parse(values.encounter_generator_json);
        var characterData = jsonData[0];

        // Import Info
        var rank = 0;
        setAttrs({character_name: characterData["name"]});

        if (typeof characterData["cults"][0] !== []) {
            if (typeof characterData["cults"][0] !== 'undefined') {
                var cults = "";
                for (var i=0; i < characterData["cults"].length; i++) {
                    cults = cults + " * " + characterData["cults"][i] + "\r\n";
                }
                setAttrs({cults_notes: cults});
            }
        }
        if (typeof characterData["cult_rank"] !== 'undefined') {
            if (characterData["cult_rank"].toLowerCase() == "common" || characterData["cult_rank"].toLowerCase() == "lay member" || characterData["cult_rank"].toLowerCase() == "follower") {
                rank = 1;
            } else if (characterData["cult_rank"].toLowerCase() == "dedicated" || characterData["cult_rank"].toLowerCase().toLowerCase() == "initiate" || characterData["cult_rank"].toLowerCase() == "spirit worshipper") {
                rank = 2;
            } else if (characterData["cult_rank"].toLowerCase() == "proven" || characterData["cult_rank"].toLowerCase() == "acolyte" || characterData["cult_rank"].toLowerCase() == "shaman") {
                rank = 3;
            } else if (characterData["cult_rank"].toLowerCase() == "overseer" || characterData["cult_rank"].toLowerCase() == "priest" || characterData["cult_rank"].toLowerCase() == "high shaman") {
                rank = 4;
            } else if (characterData["cult_rank"].toLowerCase() == "leader" || characterData["cult_rank"].toLowerCase() == "high priest" || characterData["cult_rank"].toLowerCase() == "spirit lord") {
                rank = 5;
            } else {
                rank = 0;
            }
            setAttrs({rank: rank});

            if (rank == 2) {
                setAttrs({animism_cult_rank: "2"});
            } else if (rank == 3) {
                setAttrs({animism_cult_rank: "3"});
            } else if (rank == 4) {
                setAttrs({animism_cult_rank: "4"});
            } else if (rank == 5) {
                setAttrs({animism_cult_rank: "5"});
            } else {
                setAttrs({animism_cult_rank: "1"});
            }
        }
        if (typeof characterData["notes"] !== 'undefined') {
            setAttrs({notes: characterData["notes"]});
        }

        // Import Stats
        var str = 0;
        var dex = 0;
        var con = 0;
        var siz = 0;
        var int = 0;
        var pow = 0;
        var cha = 0;
        for (var i=0; i < characterData["stats"].length; i++) {
            var stat = characterData["stats"][i]
            var statKey = Object.keys(stat)[0];
            var statValue = stat[statKey];

            if ( statKey == "STR" ) {
                str = statValue;
            }
            if ( statKey == "DEX" ) {
                dex = statValue;
            }
            if ( statKey == "CON" ) {
                con = statValue;
            }
            if ( statKey == "SIZ" ) {
                siz = statValue;
            }
            if ( statKey == "INT" ) {
                int = statValue;
                setAttrs({int_type: "int-u"});
            }
            if ( statKey == "INS" ) {
                int = statValue;
                setAttrs({int_type: "ins-u"});
            }
            if ( statKey == "POW" ) {
                pow = statValue;
            }
            if ( statKey == "CHA" ) {
                cha = statValue;
            }
        }

        setAttrs({
            str_base: str,
            dex_base: dex,
            con_base: con,
            siz_base: siz,
            int_base: int,
            pow_base: pow,
            cha_base: cha
        })

        if (str == 0 && dex == 0 && con == 0 && siz == 0) {
            setAttrs({spirit: 1});
        }

        // Import Attributes
        if (typeof characterData["attributes"]["movement"] !== 'undefined') {
            setAttrs({
                movement_rate_species: characterData["attributes"]["movement"],
                movement_rate_species_swim: characterData["attributes"]["movement"]
            });
        }
        /*
        if (typeof characterData["attributes"]["action_points"] !== 'undefined') {
            setAttrs({
                action_points: characterData["attributes"]["action_points"],
                action_points_mook1: characterData["attributes"]["action_points"],
                action_points_mook2: characterData["attributes"]["action_points"],
                action_points_mook3: characterData["attributes"]["action_points"],
                action_points_mook4: characterData["attributes"]["action_points"],
                action_points_mook5: characterData["attributes"]["action_points"],
                action_points_mook6: characterData["attributes"]["action_points"],
                action_points_mook7: characterData["attributes"]["action_points"],
                action_points_mook8: characterData["attributes"]["action_points"],
                action_points_mook9: characterData["attributes"]["action_points"],
                action_points_mook10: characterData["attributes"]["action_points"]
            });
        }
        if (typeof characterData["attributes"]["magic_points"] !== 'undefined') {
            setAttrs({
                magic_points: characterData["attributes"]["magic_points"],
                magic_points_mook1: characterData["attributes"]["magic_points"],
                magic_points_mook2: characterData["attributes"]["magic_points"],
                magic_points_mook3: characterData["attributes"]["magic_points"],
                magic_points_mook4: characterData["attributes"]["magic_points"],
                magic_points_mook5: characterData["attributes"]["magic_points"],
                magic_points_mook6: characterData["attributes"]["magic_points"],
                magic_points_mook7: characterData["attributes"]["magic_points"],
                magic_points_mook8: characterData["attributes"]["magic_points"],
                magic_points_mook9: characterData["attributes"]["magic_points"],
                magic_points_mook10: characterData["attributes"]["magic_points"]
            });
        }
        if (typeof characterData["attributes"]["prana_points"] !== 'undefined') {
            setAttrs({
                prana_points: characterData["attributes"]["prana_points"],
                prana_points_mook1: characterData["attributes"]["prana_points"],
                prana_points_mook2: characterData["attributes"]["prana_points"],
                prana_points_mook3: characterData["attributes"]["prana_points"],
                prana_points_mook4: characterData["attributes"]["prana_points"],
                prana_points_mook5: characterData["attributes"]["prana_points"],
                prana_points_mook6: characterData["attributes"]["prana_points"],
                prana_points_mook7: characterData["attributes"]["prana_points"],
                prana_points_mook8: characterData["attributes"]["prana_points"],
                prana_points_mook9: characterData["attributes"]["prana_points"],
                prana_points_mook10: characterData["attributes"]["prana_points"]
            });
        }
        if (typeof characterData["attributes"]["power_points"] !== 'undefined') {
            setAttrs({
                power_points: characterData["attributes"]["power_points"],
                power_points_mook1: characterData["attributes"]["power_points"],
                power_points_mook2: characterData["attributes"]["power_points"],
                power_points_mook3: characterData["attributes"]["power_points"],
                power_points_mook4: characterData["attributes"]["power_points"],
                power_points_mook5: characterData["attributes"]["power_points"],
                power_points_mook6: characterData["attributes"]["power_points"],
                power_points_mook7: characterData["attributes"]["power_points"],
                power_points_mook8: characterData["attributes"]["power_points"],
                power_points_mook9: characterData["attributes"]["power_points"],
                power_points_mook10: characterData["attributes"]["power_points"]
            });
        }
        if (typeof characterData["attributes"]["tenacity"] !== 'undefined') {
            setAttrs({
                tenacity: characterData["attributes"]["tenacity"],
                tenacity_mook1: characterData["attributes"]["tenacity"],
                tenacity_mook2: characterData["attributes"]["tenacity"],
                tenacity_mook3: characterData["attributes"]["tenacity"],
                tenacity_mook4: characterData["attributes"]["tenacity"],
                tenacity_mook5: characterData["attributes"]["tenacity"],
                tenacity_mook6: characterData["attributes"]["tenacity"],
                tenacity_mook7: characterData["attributes"]["tenacity"],
                tenacity_mook8: characterData["attributes"]["tenacity"],
                tenacity_mook9: characterData["attributes"]["tenacity"],
                tenacity_mook10: characterData["attributes"]["tenacity"]
            });
        }
        */
        if (typeof characterData["attributes"]["strike_rank"] !== 'undefined') {
            if (characterData["attributes"]["strike_rank"].includes("-")) {
                var strike_rank_other = characterData["attributes"]["strike_rank"].split("-")[1].replace(')','');

                setAttrs({initiative_bonus_other: 0 - strike_rank_other});
            }
        }
        if (typeof characterData["attributes"]["initiative"] !== 'undefined') {
            if (characterData["attributes"]["initiative"].includes("-")) {
                var strike_rank_other = characterData["attributes"]["initiative"].split("-")[1].replace(')','');

                setAttrs({initiative_bonus_other: 0 - strike_rank_other});
            }
        }
        if (typeof characterData["attributes"]["initiative_bonus"] !== 'undefined') {
            if (characterData["attributes"]["initiative_bonus"].includes("-")) {
                var strike_rank_other = characterData["attributes"]["initiative_bonus"].split("-")[1].replace(')','');

                setAttrs({initiative_bonus_other: 0 - strike_rank_other});
            }
        }

        // Import Traits
        if (typeof characterData["features"] !== 'undefined') {
            var traitattrs = {};
            for (var i=0; i < characterData["features"].length; i++) {
                var traitid = generateRowID();
                traitattrs["repeating_trait_" + traitid + "_trait"] = characterData["features"][i];
            }
            setAttrs(traitattrs);
        }

        // Import Hit Locations
        if (simplified_combat_enabled === 1) {
            if (typeof characterData["hit_locations"][0]["ap"] !== 'undefined') {
                setAttrs({location1_armor_ap: characterData["hit_locations"][0]["ap"]});
            }
            /*var simplified_hp_val = Math.ceil((con+siz)/2);
            setAttrs({
                simplified_hp: simplified_hp_val,
                simplified_hp_mook1: simplified_hp_val,
                simplified_hp_mook2: simplified_hp_val,
                simplified_hp_mook3: simplified_hp_val,
                simplified_hp_mook4: simplified_hp_val,
                simplified_hp_mook5: simplified_hp_val,
                simplified_hp_mook6: simplified_hp_val,
                simplified_hp_mook7: simplified_hp_val,
                simplified_hp_mook8: simplified_hp_val,
                simplified_hp_mook9: simplified_hp_val,
                simplified_hp_mook10: simplified_hp_val
            });*/
        } else {
            var base_hp = Math.ceil((con+siz)/5);

            if (typeof characterData["hit_locations"][0] !== 'undefined') {
                var table = characterData["hit_locations"][0]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location1_table_start: table[0],
                    location1_table_end: table[1],
                    location1_name: characterData["hit_locations"][0]["name"],
                    location1_armor_ap: characterData["hit_locations"][0]["ap"],
                    location1_armor_ap_max: characterData["hit_locations"][0]["ap"],
                    location1_hp_max_base_mod: characterData["hit_locations"][0]["hp"] - base_hp,
                    location1_hp: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook1: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook2: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook3: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook4: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook5: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook6: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook7: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook8: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook9: characterData["hit_locations"][0]["hp"],
                    location1_hp_mook10: characterData["hit_locations"][0]["hp"]
                });
                */
                setAttrs({
                    location1_table_start: table[0],
                    location1_table_end: table[1],
                    location1_name: characterData["hit_locations"][0]["name"],
                    location1_armor_ap: characterData["hit_locations"][0]["ap"],
                    location1_armor_ap_max: characterData["hit_locations"][0]["ap"],
                    location1_hp_max_base_mod: characterData["hit_locations"][0]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location1_table_start: "0",
                    location1_table_end: "0",
                    location1_name: " ",
                    location1_armor_ap: "0",
                    location1_armor_ap_max: "0",
                    location1_hp_max_base_mod: 0 - base_hp,
                    location1_hp: "0",
                    location1_hp_mook1: "0",
                    location1_hp_mook2: "0",
                    location1_hp_mook3: "0",
                    location1_hp_mook4: "0",
                    location1_hp_mook5: "0",
                    location1_hp_mook6: "0",
                    location1_hp_mook7: "0",
                    location1_hp_mook8: "0",
                    location1_hp_mook9: "0",
                    location1_hp_mook10: "0"
                });
                */
                setAttrs({
                    location1_table_start: "0",
                    location1_table_end: "0",
                    location1_name: " ",
                    location1_armor_ap: "0",
                    location1_armor_ap_max: "0",
                    location1_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][1] !== 'undefined') {
                var table = characterData["hit_locations"][1]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location2_table_start: table[0],
                    location2_table_end: table[1],
                    location2_name: characterData["hit_locations"][1]["name"],
                    location2_armor_ap: characterData["hit_locations"][1]["ap"],
                    location2_armor_ap_max: characterData["hit_locations"][1]["ap"],
                    location2_hp_max_base_mod: characterData["hit_locations"][1]["hp"] - base_hp,
                    location2_hp: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook1: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook2: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook3: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook4: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook5: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook6: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook7: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook8: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook9: characterData["hit_locations"][1]["hp"],
                    location2_hp_mook10: characterData["hit_locations"][1]["hp"]
                });
                */
                setAttrs({
                    location2_table_start: table[0],
                    location2_table_end: table[1],
                    location2_name: characterData["hit_locations"][1]["name"],
                    location2_armor_ap: characterData["hit_locations"][1]["ap"],
                    location2_armor_ap_max: characterData["hit_locations"][1]["ap"],
                    location2_hp_max_base_mod: characterData["hit_locations"][1]["hp"] - base_hp,
                });
            } else {
                /*
                setAttrs({
                    location2_table_start: "0",
                    location2_table_end: "0",
                    location2_name: " ",
                    location2_armor_ap: "0",
                    location2_armor_ap_max: "0",
                    location2_hp_max_base_mod: 0 - base_hp,
                    location2_hp: "0",
                    location2_hp_mook1: "0",
                    location2_hp_mook2: "0",
                    location2_hp_mook3: "0",
                    location2_hp_mook4: "0",
                    location2_hp_mook5: "0",
                    location2_hp_mook6: "0",
                    location2_hp_mook7: "0",
                    location2_hp_mook8: "0",
                    location2_hp_mook9: "0",
                    location2_hp_mook10: "0"
                });
                */
                setAttrs({
                    location2_table_start: "0",
                    location2_table_end: "0",
                    location2_name: " ",
                    location2_armor_ap: "0",
                    location2_armor_ap_max: "0",
                    location2_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][2] !== 'undefined') {
                var table = characterData["hit_locations"][2]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location3_table_start: table[0],
                    location3_table_end: table[1],
                    location3_name: characterData["hit_locations"][2]["name"],
                    location3_armor_ap: characterData["hit_locations"][2]["ap"],
                    location3_armor_ap_max: characterData["hit_locations"][2]["ap"],
                    location3_hp_max_base_mod: characterData["hit_locations"][2]["hp"] - base_hp,
                    location3_hp: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook1: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook2: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook3: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook4: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook5: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook6: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook7: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook8: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook9: characterData["hit_locations"][2]["hp"],
                    location3_hp_mook10: characterData["hit_locations"][2]["hp"]
                });
                */
                setAttrs({
                    location3_table_start: table[0],
                    location3_table_end: table[1],
                    location3_name: characterData["hit_locations"][2]["name"],
                    location3_armor_ap: characterData["hit_locations"][2]["ap"],
                    location3_armor_ap_max: characterData["hit_locations"][2]["ap"],
                    location3_hp_max_base_mod: characterData["hit_locations"][2]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location3_table_start: "0",
                    location3_table_end: "0",
                    location3_name: " ",
                    location3_armor_ap: "0",
                    location3_armor_ap_max: "0",
                    location3_hp_max_base_mod: 0 - base_hp,
                    location3_hp_mook1: "0",
                    location3_hp_mook2: "0",
                    location3_hp_mook3: "0",
                    location3_hp_mook4: "0",
                    location3_hp_mook5: "0",
                    location3_hp_mook6: "0",
                    location3_hp_mook7: "0",
                    location3_hp_mook8: "0",
                    location3_hp_mook9: "0",
                    location3_hp_mook10: "0"
                });
                */
                setAttrs({
                    location3_table_start: "0",
                    location3_table_end: "0",
                    location3_name: " ",
                    location3_armor_ap: "0",
                    location3_armor_ap_max: "0",
                    location3_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][3] !== 'undefined') {
                var table = characterData["hit_locations"][3]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location4_table_start: table[0],
                    location4_table_end: table[1],
                    location4_name: characterData["hit_locations"][3]["name"],
                    location4_armor_ap: characterData["hit_locations"][3]["ap"],
                    location4_armor_ap_max: characterData["hit_locations"][3]["ap"],
                    location4_hp_max_base_mod: characterData["hit_locations"][3]["hp"] - base_hp,
                    location4_hp: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook1: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook2: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook3: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook4: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook5: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook6: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook7: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook8: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook9: characterData["hit_locations"][3]["hp"],
                    location4_hp_mook10: characterData["hit_locations"][3]["hp"]
                });
                */
                setAttrs({
                    location4_table_start: table[0],
                    location4_table_end: table[1],
                    location4_name: characterData["hit_locations"][3]["name"],
                    location4_armor_ap: characterData["hit_locations"][3]["ap"],
                    location4_armor_ap_max: characterData["hit_locations"][3]["ap"],
                    location4_hp_max_base_mod: characterData["hit_locations"][3]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location4_table_start: "0",
                    location4_table_end: "0",
                    location4_name: " ",
                    location4_armor_ap: "0",
                    location4_armor_ap_max: "0",
                    location4_hp_max_base_mod: 0 - base_hp,
                    location4_hp_mook1: "0",
                    location4_hp_mook2: "0",
                    location4_hp_mook3: "0",
                    location4_hp_mook4: "0",
                    location4_hp_mook5: "0",
                    location4_hp_mook6: "0",
                    location4_hp_mook7: "0",
                    location4_hp_mook8: "0",
                    location4_hp_mook9: "0",
                    location4_hp_mook10: "0"
                });
                */
                setAttrs({
                    location4_table_start: "0",
                    location4_table_end: "0",
                    location4_name: " ",
                    location4_armor_ap: "0",
                    location4_armor_ap_max: "0",
                    location4_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][4] !== 'undefined') {
                var table = characterData["hit_locations"][4]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location5_table_start: table[0],
                    location5_table_end: table[1],
                    location5_name: characterData["hit_locations"][4]["name"],
                    location5_armor_ap: characterData["hit_locations"][4]["ap"],
                    location5_armor_ap_max: characterData["hit_locations"][4]["ap"],
                    location5_hp_max_base_mod: characterData["hit_locations"][4]["hp"] - base_hp,
                    location5_hp: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook1: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook2: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook3: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook4: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook5: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook6: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook7: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook8: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook9: characterData["hit_locations"][4]["hp"],
                    location5_hp_mook10: characterData["hit_locations"][4]["hp"]
                });
                */
                setAttrs({
                    location5_table_start: table[0],
                    location5_table_end: table[1],
                    location5_name: characterData["hit_locations"][4]["name"],
                    location5_armor_ap: characterData["hit_locations"][4]["ap"],
                    location5_armor_ap_max: characterData["hit_locations"][4]["ap"],
                    location5_hp_max_base_mod: characterData["hit_locations"][4]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location5_table_start: "0",
                    location5_table_end: "0",
                    location5_name: " ",
                    location5_armor_ap: "0",
                    location5_armor_ap_max: "0",
                    location5_hp_max_base_mod: 0 - base_hp,
                    location5_hp_mook1: "0",
                    location5_hp_mook2: "0",
                    location5_hp_mook3: "0",
                    location5_hp_mook4: "0",
                    location5_hp_mook5: "0",
                    location5_hp_mook6: "0",
                    location5_hp_mook7: "0",
                    location5_hp_mook8: "0",
                    location5_hp_mook9: "0",
                    location5_hp_mook10: "0"
                });
                */
                setAttrs({
                    location5_table_start: "0",
                    location5_table_end: "0",
                    location5_name: " ",
                    location5_armor_ap: "0",
                    location5_armor_ap_max: "0",
                    location5_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][5] !== 'undefined') {
                var table = characterData["hit_locations"][5]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location6_table_start: table[0],
                    location6_table_end: table[1],
                    location6_name: characterData["hit_locations"][5]["name"],
                    location6_armor_ap: characterData["hit_locations"][5]["ap"],
                    location6_armor_ap_max: characterData["hit_locations"][5]["ap"],
                    location6_hp_max_base_mod: characterData["hit_locations"][5]["hp"] - base_hp,
                    location6_hp: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook1: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook2: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook3: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook4: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook5: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook6: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook7: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook8: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook9: characterData["hit_locations"][5]["hp"],
                    location6_hp_mook10: characterData["hit_locations"][5]["hp"]
                });
                */
                setAttrs({
                    location6_table_start: table[0],
                    location6_table_end: table[1],
                    location6_name: characterData["hit_locations"][5]["name"],
                    location6_armor_ap: characterData["hit_locations"][5]["ap"],
                    location6_armor_ap_max: characterData["hit_locations"][5]["ap"],
                    location6_hp_max_base_mod: characterData["hit_locations"][5]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location6_table_start: "0",
                    location6_table_end: "0",
                    location6_name: " ",
                    location6_armor_ap: "0",
                    location6_armor_ap_max: "0",
                    location6_hp_max_base_mod: 0 - base_hp,
                    location6_hp_mook1: "0",
                    location6_hp_mook2: "0",
                    location6_hp_mook3: "0",
                    location6_hp_mook4: "0",
                    location6_hp_mook5: "0",
                    location6_hp_mook6: "0",
                    location6_hp_mook7: "0",
                    location6_hp_mook8: "0",
                    location6_hp_mook9: "0",
                    location6_hp_mook10: "0"
                });
                */
                setAttrs({
                    location6_table_start: "0",
                    location6_table_end: "0",
                    location6_name: " ",
                    location6_armor_ap: "0",
                    location6_armor_ap_max: "0",
                    location6_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][6] !== 'undefined') {
                var table = characterData["hit_locations"][6]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location7_table_start: table[0],
                    location7_table_end: table[1],
                    location7_name: characterData["hit_locations"][6]["name"],
                    location7_armor_ap: characterData["hit_locations"][6]["ap"],
                    location7_armor_ap_max: characterData["hit_locations"][6]["ap"],
                    location7_hp_max_base_mod: characterData["hit_locations"][6]["hp"] - base_hp,
                    location7_hp: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook1: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook2: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook3: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook4: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook5: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook6: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook7: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook8: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook9: characterData["hit_locations"][6]["hp"],
                    location7_hp_mook10: characterData["hit_locations"][6]["hp"]
                });
                */
                setAttrs({
                    location7_table_start: table[0],
                    location7_table_end: table[1],
                    location7_name: characterData["hit_locations"][6]["name"],
                    location7_armor_ap: characterData["hit_locations"][6]["ap"],
                    location7_armor_ap_max: characterData["hit_locations"][6]["ap"],
                    location7_hp_max_base_mod: characterData["hit_locations"][6]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location7_table_start: "0",
                    location7_table_end: "0",
                    location7_name: " ",
                    location7_armor_ap: "0",
                    location7_armor_ap_max: "0",
                    location7_hp_max_base_mod: 0 - base_hp,
                    location7_hp_mook1: "0",
                    location7_hp_mook2: "0",
                    location7_hp_mook3: "0",
                    location7_hp_mook4: "0",
                    location7_hp_mook5: "0",
                    location7_hp_mook6: "0",
                    location7_hp_mook7: "0",
                    location7_hp_mook8: "0",
                    location7_hp_mook9: "0",
                    location7_hp_mook10: "0"
                });
                */
                setAttrs({
                    location7_table_start: "0",
                    location7_table_end: "0",
                    location7_name: " ",
                    location7_armor_ap: "0",
                    location7_armor_ap_max: "0",
                    location7_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][7] !== 'undefined') {
                var table = characterData["hit_locations"][7]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location8_table_start: table[0],
                    location8_table_end: table[1],
                    location8_name: characterData["hit_locations"][7]["name"],
                    location8_armor_ap: characterData["hit_locations"][7]["ap"],
                    location8_armor_ap_max: characterData["hit_locations"][7]["ap"],
                    location8_hp_max_base_mod: characterData["hit_locations"][7]["hp"] - base_hp,
                    location8_hp: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook1: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook2: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook3: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook4: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook5: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook6: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook7: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook8: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook9: characterData["hit_locations"][7]["hp"],
                    location8_hp_mook10: characterData["hit_locations"][7]["hp"]
                });
                */
                setAttrs({
                    location8_table_start: table[0],
                    location8_table_end: table[1],
                    location8_name: characterData["hit_locations"][7]["name"],
                    location8_armor_ap: characterData["hit_locations"][7]["ap"],
                    location8_armor_ap_max: characterData["hit_locations"][7]["ap"],
                    location8_hp_max_base_mod: characterData["hit_locations"][7]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location8_table_start: "0",
                    location8_table_end: "0",
                    location8_name: " ",
                    location8_armor_ap: "0",
                    location8_armor_ap_max: "0",
                    location8_hp_max_base_mod: 0 - base_hp,
                    location8_hp_mook1: "0",
                    location8_hp_mook2: "0",
                    location8_hp_mook3: "0",
                    location8_hp_mook4: "0",
                    location8_hp_mook5: "0",
                    location8_hp_mook6: "0",
                    location8_hp_mook7: "0",
                    location8_hp_mook8: "0",
                    location8_hp_mook9: "0",
                    location8_hp_mook10: "0"
                });
                */
                setAttrs({
                    location8_table_start: "0",
                    location8_table_end: "0",
                    location8_name: " ",
                    location8_armor_ap: "0",
                    location8_armor_ap_max: "0",
                    location8_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][8] !== 'undefined') {
                var table = characterData["hit_locations"][8]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location9_table_start: table[0],
                    location9_table_end: table[1],
                    location9_name: characterData["hit_locations"][8]["name"],
                    location9_armor_ap: characterData["hit_locations"][8]["ap"],
                    location9_armor_ap_max: characterData["hit_locations"][8]["ap"],
                    location9_hp_max_base_mod: characterData["hit_locations"][8]["hp"] - base_hp,
                    location9_hp: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook1: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook2: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook3: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook4: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook5: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook6: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook7: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook8: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook9: characterData["hit_locations"][8]["hp"],
                    location9_hp_mook10: characterData["hit_locations"][8]["hp"]
                });
                */
                setAttrs({
                    location9_table_start: table[0],
                    location9_table_end: table[1],
                    location9_name: characterData["hit_locations"][8]["name"],
                    location9_armor_ap: characterData["hit_locations"][8]["ap"],
                    location9_armor_ap_max: characterData["hit_locations"][8]["ap"],
                    location9_hp_max_base_mod: characterData["hit_locations"][8]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location9_table_start: "0",
                    location9_table_end: "0",
                    location9_name: " ",
                    location9_armor_ap: "0",
                    location9_armor_ap_max: "0",
                    location9_hp_max_base_mod: 0 - base_hp,
                    location9_hp_mook1: "0",
                    location9_hp_mook2: "0",
                    location9_hp_mook3: "0",
                    location9_hp_mook4: "0",
                    location9_hp_mook5: "0",
                    location9_hp_mook6: "0",
                    location9_hp_mook7: "0",
                    location9_hp_mook8: "0",
                    location9_hp_mook9: "0",
                    location9_hp_mook10: "0"
                });
                */
                setAttrs({
                    location9_table_start: "0",
                    location9_table_end: "0",
                    location9_name: " ",
                    location9_armor_ap: "0",
                    location9_armor_ap_max: "0",
                    location9_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][9] !== 'undefined') {
                var table = characterData["hit_locations"][9]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location10_table_start: table[0],
                    location10_table_end: table[1],
                    location10_name: characterData["hit_locations"][9]["name"],
                    location10_armor_ap: characterData["hit_locations"][9]["ap"],
                    location10_armor_ap_max: characterData["hit_locations"][9]["ap"],
                    location10_hp_max_base_mod: characterData["hit_locations"][9]["hp"] - base_hp,
                    location10_hp: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook1: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook2: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook3: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook4: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook5: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook6: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook7: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook8: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook9: characterData["hit_locations"][9]["hp"],
                    location10_hp_mook10: characterData["hit_locations"][9]["hp"]
                });
                */
                setAttrs({
                    location10_table_start: table[0],
                    location10_table_end: table[1],
                    location10_name: characterData["hit_locations"][9]["name"],
                    location10_armor_ap: characterData["hit_locations"][9]["ap"],
                    location10_armor_ap_max: characterData["hit_locations"][9]["ap"],
                    location10_hp_max_base_mod: characterData["hit_locations"][9]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location10_table_start: "0",
                    location10_table_end: "0",
                    location10_name: " ",
                    location10_armor_ap: "0",
                    location10_armor_ap_max: "0",
                    location10_hp_max_base_mod: 0 - base_hp,
                    location10_hp_mook1: "0",
                    location10_hp_mook2: "0",
                    location10_hp_mook3: "0",
                    location10_hp_mook4: "0",
                    location10_hp_mook5: "0",
                    location10_hp_mook6: "0",
                    location10_hp_mook7: "0",
                    location10_hp_mook8: "0",
                    location10_hp_mook9: "0",
                    location10_hp_mook10: "0"
                });
                */
                setAttrs({
                    location10_table_start: "0",
                    location10_table_end: "0",
                    location10_name: " ",
                    location10_armor_ap: "0",
                    location10_armor_ap_max: "0",
                    location10_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][10] !== 'undefined') {
                var table = characterData["hit_locations"][10]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location11_table_start: table[0],
                    location11_table_end: table[1],
                    location11_name: characterData["hit_locations"][10]["name"],
                    location11_armor_ap: characterData["hit_locations"][10]["ap"],
                    location11_armor_ap_max: characterData["hit_locations"][10]["ap"],
                    location11_hp_max_base_mod: characterData["hit_locations"][10]["hp"] - base_hp,
                    location11_hp: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook1: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook2: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook3: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook4: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook5: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook6: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook7: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook8: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook9: characterData["hit_locations"][10]["hp"],
                    location11_hp_mook10: characterData["hit_locations"][10]["hp"]
                });
                */
                setAttrs({
                    location11_table_start: table[0],
                    location11_table_end: table[1],
                    location11_name: characterData["hit_locations"][10]["name"],
                    location11_armor_ap: characterData["hit_locations"][10]["ap"],
                    location11_armor_ap_max: characterData["hit_locations"][10]["ap"],
                    location11_hp_max_base_mod: characterData["hit_locations"][10]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location11_table_start: "0",
                    location11_table_end: "0",
                    location11_name: " ",
                    location11_armor_ap: "0",
                    location11_armor_ap_max: "0",
                    location11_hp_max_base_mod: 0 - base_hp,
                    location11_hp_mook1: "0",
                    location11_hp_mook2: "0",
                    location11_hp_mook3: "0",
                    location11_hp_mook4: "0",
                    location11_hp_mook5: "0",
                    location11_hp_mook6: "0",
                    location11_hp_mook7: "0",
                    location11_hp_mook8: "0",
                    location11_hp_mook9: "0",
                    location11_hp_mook10: "0"
                });
                */
                setAttrs({
                    location11_table_start: "0",
                    location11_table_end: "0",
                    location11_name: " ",
                    location11_armor_ap: "0",
                    location11_armor_ap_max: "0",
                    location11_hp_max_base_mod: 0 - base_hp
                });
            }

            if (typeof characterData["hit_locations"][11] !== 'undefined') {
                var table = characterData["hit_locations"][11]["range"].split("-");
                table[0] = parseInt(table[0]);
                if (!table[1]) {
                    table[1] = table[0];
                } else {
                    table[1] = parseInt(table[1]);
                }
                /*
                setAttrs({
                    location12_table_start: table[0],
                    location12_table_end: table[1],
                    location12_name: characterData["hit_locations"][11]["name"],
                    location12_armor_ap: characterData["hit_locations"][11]["ap"],
                    location12_armor_ap_max: characterData["hit_locations"][11]["ap"],
                    location12_hp_max_base_mod: characterData["hit_locations"][11]["hp"] - base_hp,
                    location12_hp: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook1: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook2: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook3: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook4: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook5: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook6: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook7: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook8: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook9: characterData["hit_locations"][11]["hp"],
                    location12_hp_mook10: characterData["hit_locations"][11]["hp"]
                });
                */
                setAttrs({
                    location12_table_start: table[0],
                    location12_table_end: table[1],
                    location12_name: characterData["hit_locations"][11]["name"],
                    location12_armor_ap: characterData["hit_locations"][11]["ap"],
                    location12_armor_ap_max: characterData["hit_locations"][11]["ap"],
                    location12_hp_max_base_mod: characterData["hit_locations"][11]["hp"] - base_hp
                });
            } else {
                /*
                setAttrs({
                    location12_table_start: "0",
                    location12_table_end: "0",
                    location12_name: " ",
                    location12_armor_ap: "0",
                    location12_armor_ap_max: "0",
                    location12_hp_max_base_mod: 0 - base_hp,
                    location12_hp_mook1: "0",
                    location12_hp_mook2: "0",
                    location12_hp_mook3: "0",
                    location12_hp_mook4: "0",
                    location12_hp_mook5: "0",
                    location12_hp_mook6: "0",
                    location12_hp_mook7: "0",
                    location12_hp_mook8: "0",
                    location12_hp_mook9: "0",
                    location12_hp_mook10: "0"
                });
                */
                setAttrs({
                    location12_table_start: "0",
                    location12_table_end: "0",
                    location12_name: " ",
                    location12_armor_ap: "0",
                    location12_armor_ap_max: "0",
                    location12_hp_max_base_mod: 0 - base_hp
                });
            }
        }

        //Default weapon displays off
        var displayweapons = {};
        displayweapons["display_melee_weapons"] = 0;
        displayweapons["display_ranged_weapons"] = 0;

        // Import Combat Styles & Weapons
        if (typeof characterData["combat_styles"] !== 'undefined') {
            for (var i=0; i < characterData["combat_styles"].length; i++) {
                var combat_style = characterData["combat_styles"][i];
                var combatstyleid = generateRowID();
                var combatstyleattrs = {};
                var base_combatstyle = str + dex;
                combatstyleattrs["repeating_combatstyle_" + combatstyleid + "_name"] = combat_style["name"];
                combatstyleattrs["repeating_combatstyle_" + combatstyleid + "_experience"] = combat_style["value"] - base_combatstyle;
                combatstyleattrs["repeating_combatstyle_" + combatstyleid + "_details"] = 0;
                setAttrs(combatstyleattrs);
                for (var j=0; j < combat_style["weapons"].length; j++) {
                    var weapon = combat_style["weapons"][j];
                    var weaponid = generateRowID();
                    var weaponattrs = {};

                    if (weapon["type"] == "ranged") {
                        displayweapons["display_melee_weapons"] = 1;
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_name"] = weapon["name"];
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_force"] = weapon["size"];
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_impale_size"] = weapon["size"];
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_range"] = weapon["range"];
                        if (weapon["add_damage_modifier"] == true) {
                            weaponattrs["repeating_rangedweapon_" + weaponid + "_damage_mod_toggle"] = "@{damage_mod}";
                        } else {
                            weaponattrs["repeating_rangedweapon_" + weaponid + "_damage_mod_toggle"] = 0;
                        }
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_damage"] = weapon["damage"];
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_ap"] = weapon["ap"];
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_hp"] = weapon["hp"];
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_hp_max"] = weapon["hp"];
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_notes"] = weapon["effects"];
                        weaponattrs["repeating_rangedweapon_" + weaponid + "_details"] = 0;
                    } else {
                        displayweapons["display_melee_weapons"] = 1;
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_name"] = weapon["name"];
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_size"] = weapon["size"];
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_reach"] = weapon["reach"];
                        if (weapon["add_damage_modifier"] == true) {
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_damage_mod_toggle"] = "@{damage_mod}";
                        } else {
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_damage_mod_toggle"] = 0;
                        }
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_damage"] = weapon["damage"];
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_ap"] = weapon["ap"];
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_hp"] = weapon["hp"];
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_hp_max"] = weapon["hp"];
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_notes"] = weapon["effects"];
                        weaponattrs["repeating_meleeweapon_" + weaponid + "_details"] = 0;
                    }
                    setAttrs(weaponattrs);
                }
            }
        }

        //Set Weapon Display
        setAttrs(displayweapons);

        // Default to show no magic
        var displaymagic = {};
        displaymagic["display_theism"] = 0;
        displaymagic["display_sorcery"] = 0;
        displaymagic["display_mysticism"] = 0;
        displaymagic["display_alchemy"] = 0;
        displaymagic["display_animism"] = 0;
        displaymagic["display_artifice"] = 0;
        displaymagic["display_folk_magic"] = 0;
        displaymagic["display_arcane_magic"] = 0;
        displaymagic["display_divine_magic"] = 0;
        displaymagic["display_roman_magic"] = 0;
        displaymagic["display_fae_powers"] = 0;
        displaymagic["display_superpowers"] = 0;

        // Import Skills
        if (typeof characterData["skills"] !== 'undefined') {
            for (var i=0; i < characterData["skills"].length; i++) {
                var skill = characterData["skills"][i];
                var skillid = generateRowID();
                var skillattrs = {};
                var skillKey = Object.keys(skill)[0];
                var skillValue = skill[skillKey];

                if (skillKey.toLowerCase() == "spectral combat") {
                    skillattrs["repeating_combatstyle_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_combatstyle_" + skillid + "_char1"] = "@{pow}";
                    skillattrs["repeating_combatstyle_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_combatstyle_" + skillid + "_experience"] = skillValue - pow - cha;
                    skillattrs["repeating_combatstyle_" + skillid + "_details"] = 0;
                    skillattrs["binding_learned"] = 1;
                    skillattrs["binding_experience"] = skillValue - pow - cha;
                    displaymagic["display_animism"] = 1;
                } else if (skillKey.toLowerCase() == "fata") {
                    skillattrs["fata_learned"] = 1;
                    skillattrs["fata_experience"] = skillValue - pow - cha;
                    displaymagic["display_fae_powers"] = 1;
                } else if (skillKey.toLowerCase() == "folk magic") {
                    skillattrs["folk_magic_learned"] = 1;
                    skillattrs["folk_magic_experience"] = skillValue - pow - cha;
                    displaymagic["display_folk_magic"] = 1;
                } else if (skillKey.toLowerCase() == "craft (alchemy)") {
                    skillattrs["craft_alchemy_learned"] = 1;
                    skillattrs["craft_alchemy_experience"] = skillValue - dex - int;
                    displaymagic["display_alchemy"] = 1;
                } else if (skillKey.toLowerCase() == "trance") {
                    skillattrs["trance_learned"] = 1;
                    skillattrs["trance_experience"] = skillValue - pow - con;
                    displaymagic["display_animism"] = 1;
                } else if (skillKey.toLowerCase() == "binding") {
                    skillattrs["binding_learned"] = 1;
                    skillattrs["binding_experience"] = skillValue - pow - cha;
                    displaymagic["display_animism"] = 1;
                } else if (skillKey.toLowerCase() == "artifice") {
                    skillattrs["artifice_learned"] = 1;
                    skillattrs["artifice_experience"] = skillValue - int - dex;
                    displaymagic["display_artifice"] = 1;
                } else if (skillKey.toLowerCase() == "gnosis") {
                    skillattrs["gnosis_learned"] = 1;
                    skillattrs["gnosis_experience"] = skillValue - int - pow;
                    displaymagic["display_artifice"] = 1;
                } else if (skillKey.toLowerCase() == "meditation") {
                    skillattrs["meditation_learned"] = 1;
                    skillattrs["meditation_experience"] = skillValue - con - int;
                    displaymagic["display_mysticism"] = 1;
                } else if (skillKey.toLowerCase() == "mysticism") {
                    skillattrs["repeating_path_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_path_" + skillid + "_experience"] = skillValue - con - pow;
                    skillattrs["repeating_path_" + skillid + "_details"] = 0;
                    displaymagic["display_mysticism"] = 1;
                } else if (skillKey.toLowerCase() == "invocation") {
                    skillattrs["repeating_invocation_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_invocation_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_invocation_" + skillid + "_details"] = 0;
                    displaymagic["display_sorcery"] = 1;
                } else if (skillKey.toLowerCase() == "shaping") {
                    skillattrs["shaping_learned"] = 1;
                    skillattrs["shaping_experience"] = skillValue - int - pow;
                    displaymagic["display_sorcery"] = 1;
                } else if (skillKey.toLowerCase() == "arcane knowledge") {
                    skillattrs["arcane_knowledge_experience"] = skillValue - int - int;
                    skillattrs["arcane_knowledge_learned"] = 1;
                    displaymagic["display_arcane_magic"] = 1;
                } else if (skillKey.toLowerCase() == "arcane casting") {
                    skillattrs["arcane_casting_experience"] = skillValue - int - pow;
                    skillattrs["arcane_casting_learned"] = 1;
                    displaymagic["display_arcane_magic"] = 1;
                } else if (skillKey.toLowerCase() == "devotion") {
                    skillattrs["repeating_devotion_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_devotion_" + skillid + "_experience"] = skillValue - pow - cha;
                    skillattrs["repeating_devotion_" + skillid + "_details"] = 0;
                    displaymagic["display_theism"] = 1;
                    if (rank == 2) {
                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "ceil(@{pow}*.25)";
                    } else if (rank == 3) {
                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "ceil(@{pow}*.5)";
                    } else if (rank == 4) {
                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "ceil(@{pow}*.75)";
                    } else if (rank == 5) {
                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "@{pow}";
                    } else {
                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "0";
                    }
                } else if (skillKey.toLowerCase() == "exhort") {
                    skillattrs["exhort_learned"] = 1;
                    skillattrs["exhort_experience"] = skillValue - int - cha;
                    displaymagic["display_theism"] = 1;
                } else if (skillKey.toLowerCase() == "channel") {
                    skillattrs["channel_experience"] = skillValue - int - pow;
                    skillattrs["channel_learned"] = 1;
                    displaymagic["display_divine_magic"] = 1;
                } else if (skillKey.toLowerCase() == "piety") {
                    skillattrs["piety_experience"] = skillValue - cha - pow;
                    skillattrs["piety_learned"] = 1;
                    displaymagic["display_divine_magic"] = 1;
                } else if (skillKey.toLowerCase() == "cursing") {
                    skillattrs["cursing_experience"] = skillValue - cha - pow;
                    skillattrs["cursing_learned"] = 1;
                    displaymagic["display_roman_magic"] = 1;
                } else if (skillKey.toLowerCase() == "divination") {
                    skillattrs["divination_experience"] = skillValue - int - pow;
                    skillattrs["divination_learned"] = 1;
                    displaymagic["display_roman_magic"] = 1;
                } else if (skillKey.toLowerCase() == "necromancy") {
                    skillattrs["necromancy_experience"] = skillValue - int - cha;
                    skillattrs["necromancy_learned"] = 1;
                    displaymagic["display_roman_magic"] = 1;
                } else if (skillKey.toLowerCase() == "pharmacy") {
                    skillattrs["pharmacy_experience"] = skillValue - int - int;
                    skillattrs["pharmacy_learned"] = 1;
                    displaymagic["display_roman_magic"] = 1;
                } else if (skillKey.toLowerCase() == "shape shifting") {
                    skillattrs["shape_shifting_experience"] = skillValue - con - pow;
                    skillattrs["shape_shifting_learned"] = 1;
                    displaymagic["display_roman_magic"] = 1;
                } else if (skillKey.toLowerCase() == "theology") {
                    skillattrs["theology_experience"] = skillValue - pow - pow;
                    skillattrs["theology_learned"] = 1;
                    displaymagic["display_roman_magic"] = 1;
                } else if (skillKey.toLowerCase() == "athletics") {
                    skillattrs["athletics_experience"] = skillValue - str - dex;
                } else if (skillKey.toLowerCase() == "boating") {
                    skillattrs["boating_experience"] = skillValue - str - con;
                } else if (skillKey.toLowerCase() == "brawn") {
                    skillattrs["brawn_experience"] = skillValue - str - siz;
                } else if (skillKey.toLowerCase() == "conceal") {
                    skillattrs["conceal_experience"] = skillValue - dex - pow;
                } else if (skillKey.toLowerCase() == "customs") {
                    skillattrs["customs_experience"] = skillValue - int - int;
                } else if (skillKey.toLowerCase() == "dance") {
                    skillattrs["dance_experience"] = skillValue - cha - dex;
                } else if (skillKey.toLowerCase() == "deceit") {
                    skillattrs["deceit_experience"] = skillValue - int - cha;
                } else if (skillKey.toLowerCase() == "drive") {
                    skillattrs["drive_experience"] = skillValue - dex - pow;
                } else if (skillKey.toLowerCase() == "endurance") {
                    skillattrs["endurance_experience"] = skillValue - con - con;
                } else if (skillKey.toLowerCase() == "evade") {
                    skillattrs["evade_experience"] = skillValue - dex - dex;
                } else if (skillKey.toLowerCase() == "first aid") {
                    skillattrs["first_aid_experience"] = skillValue - int - dex;
                } else if (skillKey.toLowerCase() == "home parallel") {
                    skillattrs["home parallel_experience"] = skillValue - int - int;
                } else if (skillKey.toLowerCase() == "influence") {
                    skillattrs["influence_experience"] = skillValue - cha - cha;
                } else if (skillKey.toLowerCase() == "insight") {
                    skillattrs["insight_experience"] = skillValue - int - pow;
                } else if (skillKey.toLowerCase() == "locale") {
                    skillattrs["locale_experience"] = skillValue - int - int;
                } else if (skillKey.toLowerCase() == "perception") {
                    skillattrs["perception_experience"] = skillValue - int - pow;
                } else if (skillKey.toLowerCase() == "ride") {
                    skillattrs["ride_experience"] = skillValue - dex - pow;
                } else if (skillKey.toLowerCase() == "sing") {
                    skillattrs["sing_experience"] = skillValue - cha - pow;
                } else if (skillKey.toLowerCase() == "status") {
                    skillattrs["status_experience"] = skillValue;
                } else if (skillKey.toLowerCase() == "stealth") {
                    skillattrs["stealth_experience"] = skillValue - dex - int;
                } else if (skillKey.toLowerCase() == "strangeness") {
                    skillattrs["strangeness_experience"] = skillValue;
                } else if (skillKey.toLowerCase() == "superstition") {
                    skillattrs["superstition_experience"] = skillValue - ((21 - int) + pow);
                } else if (skillKey.toLowerCase() == "swim") {
                    skillattrs["swim_experience"] = skillValue - str - con;
                } else if (skillKey.toLowerCase() == "the soot") {
                    skillattrs["the_soot_experience"] = skillValue;
                } else if (skillKey.toLowerCase() == "unarmed") {
                    skillattrs["unarmed_experience"] = skillValue - str - dex;
                } else if (skillKey.toLowerCase() == "willpower") {
                    skillattrs["willpower_experience"] = skillValue - pow - pow;
                } else if (skillKey.toLowerCase() == "acting") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - cha - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "acrobatics") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - str - dex;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{str}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "astrogation") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "bureaucracy") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "command") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "commerce") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "comms") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "computers") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "courtesy") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "demolitions") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "disguise") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "electronics") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "engineering") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "forgery") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "gambling") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "healing") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "law") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "linguistics") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "lockpicking") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - dex;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "lycanthropy") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - con - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{con}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "mechanisms") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "medicine") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "navigation") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "oratory") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "pilot") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "probabilities") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "politics") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "research") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "rhetoric") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "seamanship") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - con;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{con}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "seduction") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "sensors") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "sleight") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "streetwise") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "survival") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - con;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{con}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "teach") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase() == "track") {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - con;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{con}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("art") !== -1) {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("craft") !== -1) {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("culture") !== -1) {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("knowledge") !== -1) {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("language") !== -1) {
                    skillattrs["repeating_language_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_language_" + skillid + "_experience"] = skillValue - int - cha;
                    skillattrs["repeating_language_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("literacy") !== -1) {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("lore") !== -1) {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("musicianship") !== -1) {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - cha;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("science") !== -1) {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("passion") !== -1) {
                    skillattrs["repeating_passion_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_passion_" + skillid + "_score"] = skillValue;
                    skillattrs["repeating_passion_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("dependency") !== -1) {
                    skillattrs["repeating_dependency_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_dependency_" + skillid + "_score"] = skillValue;
                    skillattrs["repeating_dependency_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("peculiarity") !== -1) {
                    skillattrs["repeating_peculiarity_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_peculiarity_" + skillid + "_score"] = skillValue;
                    skillattrs["repeating_peculiarity_" + skillid + "_details"] = 0;
                } else if (skillKey.toLowerCase().indexOf("affiliation") !== -1) {
                    skillattrs["repeating_affiliation_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_affiliation_" + skillid + "_experience"] = skillValue - 40;
                    skillattrs["repeating_affiliation_" + skillid + "_details"] = 0;
                } else {
                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue;
                }

                setAttrs(skillattrs);
            }
        }


        // Import Folk Magic Spells
        if (typeof characterData["folk_spells"] !== 'undefined') {
            var folk_spells = "";
            var spellattrs = {};
            for (var i=0; i < characterData["folk_spells"].length; i++) {
                displaymagic["display_folk_magic"] = 1;
                var folk_spell = characterData["folk_spells"][i];
                var spellid = generateRowID();

                folk_spells = folk_spells + folk_spell + ", ";
                spellattrs["repeating_folkspell_" + spellid + "_name"] = folk_spell;
            }
            setAttrs(spellattrs);
        }

        // Import Mysticism Talents
        if (typeof characterData["mysticism_spells"] !== 'undefined') {
            var mysticism_spells = "";
            var talentattrs = {};
            for (var i=0; i < characterData["mysticism_spells"].length; i++) {
                displaymagic["display_mysticism"] = 1;
                var mysticism_spell = characterData["mysticism_spells"][i];
                var talentid = generateRowID();

                mysticism_spells = mysticism_spells + mysticism_spell + ", ";
                talentattrs["repeating_practicedtalent_" + talentid + "_name"] = mysticism_spell;
            }
            setAttrs(talentattrs);
        }

        // Import Sorcery Spells
        if (typeof characterData["sorcery_spells"] !== 'undefined') {
            var sorcery_spells = "";
            var spellattrs = {};
            for (var i=0; i < characterData["sorcery_spells"].length; i++) {
                displaymagic["display_sorcery"] = 1;
                var sorcey_spell = characterData["sorcery_spells"][i];
                var spellid = generateRowID();

                sorcery_spells = sorcery_spells + sorcey_spell + ", ";
                spellattrs["repeating_sorceryspell_" + spellid + "_name"] = sorcey_spell;
            }
            setAttrs(spellattrs);
        }

        // Import Theism Miracles
        if (typeof characterData["theism_spells"] !== 'undefined') {
            var theism_spells = "";
            var miracleattrs = {};
            for (var i=0; i < characterData["theism_spells"].length; i++) {
                displaymagic["display_theism"] = 1;
                var theism_spell = characterData["theism_spells"][i];
                var miracleid = generateRowID();

                theism_spells = theism_spells + theism_spell + ", ";
                miracleattrs["repeating_miracle_" + miracleid + "_name"] = theism_spell;
            }
            setAttrs(miracleattrs);
        }

        //Import Spirits
        if (typeof characterData["spirits"] !== 'undefined') {
            for (var i=0; i < characterData["spirits"].length; i++) {
                displaymagic["display_animism"] = 1;
                var spirit = characterData["spirits"][i];
                var spiritid = generateRowID();
                var spiritattrs = {};

                // Set JSON string
                spiritattrs["repeating_fetish_" + spiritid + "_fetish_json"] = JSON.stringify([spirit]);

                // Import spirit name
                spiritattrs["repeating_fetish_" + spiritid + "_name"] = spirit["name"];

                // Hide details
                spiritattrs["repeating_fetish_" + spiritid + "_details"] = 0;

                //Import spirit Stats
                for (var j=0; j < spirit["stats"].length; j++) {
                    var spiritstat = spirit["stats"][j];
                    var spiritstatKey = Object.keys(spiritstat)[0];
                    var spiritstatValue = spiritstat[spiritstatKey];

                    if ( spiritstatKey == "INT" ) {
                        spiritattrs["repeating_fetish_" + spiritid + "_int_type"] = spiritstatKey;
                        spiritattrs["repeating_fetish_" + spiritid + "_fetish_int"] = spiritstatValue;
                    }
                    if ( spiritstatKey == "INS" ) {
                        spiritattrs["repeating_fetish_" + spiritid + "_int_type"] = spiritstatKey;
                        spiritattrs["repeating_fetish_" + spiritid + "_fetish_int"] = spiritstatValue;
                    }
                    if ( spiritstatKey == "POW" ) {
                        spiritattrs["repeating_fetish_" + spiritid + "_fetish_pow"] = spiritstatValue;
                    }
                    if ( spiritstatKey == "CHA" ) {
                        spiritattrs["repeating_fetish_" + spiritid + "_fetish_cha"] = spiritstatValue;
                    }
                }

                //Import spirit attributes
                if (typeof spirit["attributes"]["magic_points"] !== 'undefined') {
                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_magic_points"] = spirit["attributes"]["magic_points"];
                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_tenacity"] = spirit["attributes"]["magic_points"];
                }
                if (typeof spirit["attributes"]["spirit_intensity"] !== 'undefined') {
                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_intensity"] = spirit["attributes"]["spirit_intensity"];
                }

                //Import spirit abilities
                if (typeof spirit["features"] !== 'undefined') {
                    var spiritabilities = "";
                    for (var j=0; j < spirit["features"].length; j++) {
                        spiritabilities = spiritabilities + " * " + spirit["features"][j] + "\r\n";
                    }
                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_spirit_abilities"] = spiritabilities;
                }

                //Import spirit skills
                if (typeof spirit["skills"] !== 'undefined') {
                    var spirit_other_skills = "";
                    for (var j=0; j < spirit["skills"].length; j++) {
                        var spiritskill = spirit["skills"][j];
                        var spiritskillKey = Object.keys(spiritskill)[0];
                        var spiritskillValue = spiritskill[spiritskillKey];

                        if (spiritskillKey.toLowerCase() == "spectral combat") {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_spectral_combat"] = spiritskillValue;
                        } else  if (spiritskillKey.toLowerCase() == "willpower") {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_willpower"] = spiritskillValue;
                        } else  if (spiritskillKey.toLowerCase() == "folk magic") {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_folk_magic"] = spiritskillValue;
                        } else  if (spiritskillKey.toLowerCase() == "shaping") {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_shaping"] = spiritskillValue;
                        } else  if (spiritskillKey.toLowerCase() == "invocation") {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_invocation"] = spiritskillValue;
                        } else  if (spiritskillKey.toLowerCase() == "exhort") {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_exhort"] = spiritskillValue;
                        } else  if (spiritskillKey.toLowerCase() == "devotion") {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_devotion"] = spiritskillValue;
                        } else {
                            spirit_other_skills = spirit_other_skills + spiritskillKey + " " + spiritskillValue + "%, "
                        }
                    }
                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_other_skills"] = spirit_other_skills;
                }

                //Import spirit spells
                var spiritspells = "";
                if (typeof spirit["folk_spells"] !== 'undefined') {
                    var spirit_folk_spells = "";
                    for (var j=0; j < spirit["folk_spells"].length; j++) {
                        spirit_folk_spells = spirit_folk_spells + spirit["folk_spells"][j] + ", ";
                    }
                    if (spirit_folk_spells != "") {
                        spiritspells = spiritspells + "Folk Magic: " + spirit_folk_spells + "\r\n";
                    }
                }

                if (typeof spirit["sorcery_spells"] !== 'undefined') {
                    var spirit_sorcery_spells = "";
                    for (var j=0; j < spirit["sorcery_spells"].length; j++) {
                        spirit_sorcery_spells = spirit_sorcery_spells + spirit["sorcery_spells"][j] + ", ";
                    }
                    if (spirit_sorcery_spells != "") {
                        spiritspells = spiritspells + "Sorcery: " + spirit_sorcery_spells + "\r\n";
                    }
                }

                if (typeof spirit["theism_spells"] !== 'undefined') {
                    var spirit_theism_spells = "";
                    for (var j=0; j < spirit["theism_spells"].length; j++) {
                        spirit_theism_spells = spirit_theism_spells + spirit["theism_spells"][j] + ", ";
                    }
                    if (spirit_theism_spells != "") {
                        spiritspells = spiritspells + "Theism: " + spirit_theism_spells + "\r\n";
                    }
                }
                spiritattrs["repeating_fetish_" + spiritid + "_fetish_powers"] = spiritspells;

                //Set spirit values
                setAttrs(spiritattrs);
            }
        }

        //Set magic displays
        setAttrs(displaymagic);
    });
});
