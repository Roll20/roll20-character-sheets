    var v2_old_values_check = function() {
        // update_attacks("all");
        var update = {};
        var attrs = ["simpletraits","features_and_traits","initiative_bonus","npc","character_id"];
        getSectionIDs("repeating_spell-npc", function(idarray) {
            _.each(idarray, function(id) {
                attrs.push("repeating_spell-npc_" + id + "_rollcontent");
            });
            getAttrs(attrs, function(v) {
                if(v["npc"] && v["npc"] == 1 && (!v["initiative_bonus"] || v["initiative_bonus"] == 0)) {
                    update_initiative();
                }
                var spellflag = idarray && idarray.length > 0 ? 1 : 0;
                var missing = v["features_and_traits"] && v["simpletraits"] === "complex" ? 1 : 0;
                update["npcspell_flag"] = spellflag;
                update["missing_info"] = missing;
                _.each(idarray, function(id) {
                    var content = v["repeating_spell-npc_" + id + "_rollcontent"];
                    if(content.substring(0,3) === "%{-" && content.substring(22,41) === "|repeating_attack_-" && content.substring(60,68) === "_attack}") {
                        var thisid = content.substring(2,21);
                        if(thisid != v["character_id"]) {
                            update["repeating_spell-npc_" + id + "_rollcontent"] = content.substring(0,2) + v["character_id"] + content.substring(22,68);
                        }
                    }
                });
                setAttrs(update);
            });

        });

    };

    var clear_npc_spell_attacks = function(complete) {
        getSectionIDs("repeating_attack", function(attack_ids) {
            var getList = [];
            var done = false;
            _.each(attack_ids, function(id) {
                getList.push(`repeating_attack_${id}_spellid`);
            });
            getAttrs(getList, function(v) {
                _.each(attack_ids, function(id) {
                    if (v[`repeating_attack_${id}_spellid`] && v[`repeating_attack_${id}_spellid`].indexOf("npc_") != -1) {
                        removeRepeatingRow(`repeating_attack_${id}`);
                    }
                });
                complete();
            });
        });
    }

    var upgrade_to_2_0 = function(doneupdating) {
        getAttrs(["npc","strength","dexterity","constitution","intelligence","wisdom","charisma","strength_base","dexterity_base","constitution_base","intelligence_base","wisdom_base","charisma_base","deathsavemod","death_save_mod","npc_str_save","npc_dex_save","npc_con_save","npc_int_save","npc_wis_save","npc_cha_save","npc_str_save_base","npc_dex_save_base","npc_con_save_base","npc_int_save_base","npc_wis_save_base","npc_cha_save_base","npc_acrobatics_base", "npc_animal_handling_base", "npc_arcana_base", "npc_athletics_base", "npc_deception_base", "npc_history_base", "npc_insight_base", "npc_intimidation_base", "npc_investigation_base", "npc_medicine_base", "npc_nature_base", "npc_perception_base", "npc_performance_base", "npc_persuasion_base", "npc_religion_base", "npc_sleight_of_hand_base", "npc_stealth_base", "npc_survival_base", "npc_acrobatics", "npc_animal_handling", "npc_arcana", "npc_athletics", "npc_deception", "npc_history", "npc_insight", "npc_intimidation", "npc_investigation", "npc_medicine", "npc_nature", "npc_perception", "npc_performance", "npc_persuasion", "npc_religion", "npc_sleight_of_hand", "npc_stealth", "npc_survival"], function(v) {
            var update = {};
            var stats = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];
            var npc_stats = ["npc_str_save","npc_dex_save","npc_con_save","npc_int_save","npc_wis_save","npc_cha_save","npc_acrobatics", "npc_animal_handling", "npc_arcana", "npc_athletics", "npc_deception", "npc_history", "npc_insight", "npc_intimidation", "npc_investigation", "npc_medicine", "npc_nature", "npc_perception", "npc_performance", "npc_persuasion", "npc_religion", "npc_sleight_of_hand", "npc_stealth", "npc_survival"];
            _.each(stats, function(attr) {
                if(v[attr] && v[attr] != "10" && v[attr + "_base"] == "10") {
                    update[attr + "_base"] = v[attr];
                }

            });
            _.each(npc_stats, function(attr) {
                if(v[attr] && !isNaN(v[attr]) && v[attr + "_base"] == "") {
                    update[attr + "_base"] = v[attr];
                }

            });
            if(v["deathsavemod"] && v["deathsavemod"] != "0" && v["death_save_mod"] === "0") {v["death_save_mod"] = v["deathsavemod"];};

            if(v["npc"] && v["npc"] == "1") {
                var callback = function() {
                    update_attr("all");
                    update_mod("strength");
                    update_mod("dexterity");
                    update_mod("constitution");
                    update_mod("intelligence");
                    update_mod("wisdom");
                    update_mod("charisma");
                    update_npc_action("all");
                    update_npc_saves();
                    update_npc_skills();
                    update_initiative();
                }
            }
            else {
                var callback = function() {
                    update_attr("all");
                    update_mod("strength");
                    update_mod("dexterity");
                    update_mod("constitution");
                    update_mod("intelligence");
                    update_mod("wisdom");
                    update_mod("charisma");
                    update_all_saves();
                    update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion"]);
                    update_tool("all")
                    update_attacks("all");
                    update_pb();
                    update_jack_attr();
                    update_initiative();
                    update_weight();
                    update_spell_info();
                    update_ac();
                }
            }

            setAttrs(update, {silent: true}, callback);
            doneupdating();
        });
    };

    var upgrade_to_2_1 = function(doneupdating) {
        v2_old_values_check();
        doneupdating();
    };

    var upgrade_to_2_2 = function(doneupdating) {
        setAttrs({l1mancer_status: "completed"}, function(eventinfo) {
            setAttrs({"options-class-selection":"0"});
            console.log("Preprocessed v2.2 upgrade");
            update_tool("all");
            update_attacks("all");
            update_class();
            update_race_display();
            doneupdating();
        });
    };

    var upgrade_to_2_3 = function(doneupdating) {
        getSectionIDs("damagemod", function(ids) {
            var update = {};
            _.each(ids, function(rowid) {
                update[`repeating_damagemod_${rowid}_options-flag`] = "0";
            });
            getSectionIDs("tohitmod", function(ids) {
                _.each(ids, function(rowid) {
                    update[`repeating_tohitmod_${rowid}_options-flag`] = "0";
                });
                setAttrs(update);
                doneupdating();
            });
        });
    };

    var upgrade_to_2_4 = function(doneupdating) {
        clear_npc_spell_attacks(function() {
            update_globalskills(function() {
                update_globalsaves(function() {
                    update_globalattack(function() {
                        update_globaldamage(function() {
                            getAttrs(["npc", "npcspellcastingflag", "spellcasting_ability", "caster_level", "level_calculations"], function(v) {
                                if(v.npc == "1" && v.npcspellcastingflag == "1") {
                                    getSectionIDs("npctrait", function(secIds) {
                                        var getList = [];
                                        _.each(secIds, function(x) {
                                            getList.push("repeating_npctrait_" + x + "_name");
                                            getList.push("repeating_npctrait_" + x + "_desc");
                                        });
                                        getAttrs(getList, function(traits) {
                                            var update = {};
                                            if(v.spellcasting_ability == "0*" || v.caster_level == "0") {
                                                var spellSec = "";
                                                if (v.spellcasting_ability == "0*") {
                                                    update.spellcasting_ability = "@{intelligence_mod}+";
                                                }
                                                _.each(secIds, function(traitId) {
                                                    if(traits["repeating_npctrait_" + traitId + "_name"].toLowerCase().includes("spellcasting.")) spellSec = traitId;
                                                });
                                                if(spellSec  != "") {
                                                    var spellcasting = traits["repeating_npctrait_" + spellSec + "_desc"].toLowerCase();
                                                    if (v.spellcasting_ability == "0*") {
                                                        var lastIndex = 9999;
                                                        _.each(["intelligence", "wisdom", "charisma"], function(ability) {
                                                            var found = spellcasting.indexOf(ability);
                                                            if(found > -1 && found < lastIndex) {
                                                                lastIndex = found;
                                                                update.spellcasting_ability = "@{" + ability + "_mod}+";
                                                            }
                                                        });
                                                    }
                                                    if (v.caster_level == "0") {
                                                        var foundLevelidx = spellcasting.search(/(\d|\d\d)(st|nd|rd|th)/);
                                                        if (foundLevelidx) {
                                                            var level = parseInt(spellcasting.substring(foundLevelidx, foundLevelidx+4));
                                                            console.log(`Found spellcasting level ${level} in trait, setting caster_level...`);
                                                            update.caster_level = level;
                                                        }
                                                    }
                                                }
                                            }
                                            setAttrs(update, function() {
                                                // Recalculate spell slots in case NPC level was restored
                                                if(!v["level_calculations"] || v["level_calculations"] == "on") {
                                                    update_spell_slots();
                                                };
                                                // Set all spells without a given modifier to 'spell'
                                                var spgetList = [];
                                                getSectionIDs("spell-cantrip", function(secIds0) {
                                                    _.each(secIds0, function(x) {
                                                        spgetList.push("repeating_spell-cantrip_" + x + "_spell_ability");
                                                    });
                                                    getSectionIDs("spell-1", function(secIds1) {
                                                        _.each(secIds1, function(x) {
                                                            spgetList.push("repeating_spell-1_" + x + "_spell_ability");
                                                        });
                                                        getSectionIDs("spell-2", function(secIds2) {
                                                            _.each(secIds2, function(x) {
                                                                spgetList.push("repeating_spell-2_" + x + "_spell_ability");
                                                            });
                                                            getSectionIDs("spell-3", function(secIds3) {
                                                                _.each(secIds3, function(x) {
                                                                    spgetList.push("repeating_spell-3_" + x + "_spell_ability");
                                                                });
                                                                getSectionIDs("spell-4", function(secIds4) {
                                                                    _.each(secIds4, function(x) {
                                                                        spgetList.push("repeating_spell-4_" + x + "_spell_ability");
                                                                    });
                                                                    getSectionIDs("spell-5", function(secIds5) {
                                                                        _.each(secIds5, function(x) {
                                                                            spgetList.push("repeating_spell-5_" + x + "_spell_ability");
                                                                        });
                                                                        getSectionIDs("spell-6", function(secIds6) {
                                                                            _.each(secIds6, function(x) {
                                                                                spgetList.push("repeating_spell-6_" + x + "_spell_ability");
                                                                            });
                                                                            getSectionIDs("spell-7", function(secIds7) {
                                                                                _.each(secIds7, function(x) {
                                                                                    spgetList.push("repeating_spell-7_" + x + "_spell_ability");
                                                                                });
                                                                                getSectionIDs("spell-8", function(secIds8) {
                                                                                    _.each(secIds8, function(x) {
                                                                                        spgetList.push("repeating_spell-8_" + x + "_spell_ability");
                                                                                    });
                                                                                    getSectionIDs("spell-9", function(secIds9) {
                                                                                        _.each(secIds9, function(x) {
                                                                                            spgetList.push("repeating_spell-9_" + x + "_spell_ability");
                                                                                        });
                                                                                        getAttrs(spgetList, function(spellAbilities) {
                                                                                            spupdate = {};
                                                                                            _.each(spellAbilities, function(ability, attributeName) {
                                                                                                if (ability == "0*") {
                                                                                                    console.log("UPDATING SPELL: " + attributeName);
                                                                                                    spupdate[attributeName] = "spell";
                                                                                                }
                                                                                            });
                                                                                            setAttrs(spupdate, function() {
                                                                                                update_attacks("spells");
                                                                                                update_challenge();
                                                                                                doneupdating();
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                } else if(v.npc != "1") {
                                    doneupdating();
                                } else {
                                    doneupdating();
                                }
                            });
                        });
                    });
                });
            });
        });
    };

    var upgrade_to_2_5 = function(doneupdating) {
        getAttrs(["globalacmod"], function(v) {
            var update = {};
            if(v.globalacmod && v.globalacmod != "0") {
                var rowid = generateRowID();
                update[`repeating_acmod_${rowid}_global_ac_val`] = parseInt(v.globalacmod);
                update[`repeating_acmod_${rowid}_global_ac_name`] = "GLOBAL ARMOR CLASS MODIFIER";
                update[`repeating_acmod_${rowid}_global_ac_active_flag`] = "1";
                update[`repeating_acmod_${rowid}_options-flag`] = "0";
                update["global_ac_mod_flag"] = "1";
            }
            setAttrs(update, {silent: true}, function() {
                update_ac();
                doneupdating();
            });
        });
    };

    var upgrade_to_2_6 = function(doneupdating) {
        getSectionIDs("hpmod", function(ids) {
            var getArray = [];
            _.each(ids, function(sectionid) {
                getArray.push("repeating_hpmod_" + sectionid + "_source");
            });
            getAttrs(getArray, function(v) {
                _.each(v, function(val, key) {
                    if(val === "CON") removeRepeatingRow("repeating_hpmod_" + key.split("_")[2]);
                });
                doneupdating();
            });
        });
    };

    var upgrade_to_2_7 = function(doneupdating) {
        getSectionIDs("damagemod", function(ids) {
            console.log("Version 2.7 UPGRADE");
            let getArray = [];
            ids.forEach(sectionid => {
                getArray.push(`repeating_damagemod_${sectionid}_global_damage_rollstring`);
                getArray.push(`repeating_damagemod_${sectionid}_global_damage_type`);
            });
            getSectionIDs("savemod", function(ids) {
                _.each(ids, (sectionid) => {
                    getArray.push(`repeating_savemod_${sectionid}_global_save_rollstring`);
                });
                getSectionIDs("tohitmod", function(ids) {
                    _.each(ids, (sectionid) => {
                        getArray.push(`repeating_tohitmod_${sectionid}_global_attack_rollstring`);
                    });
                    getSectionIDs("skillmod", function(ids) {
                        _.each(ids, (sectionid) => {
                            getArray.push(`repeating_skillmod_${sectionid}_global_skill_rollstring`);
                        });
                        getAttrs(getArray, function(v) {
                            let set = {};
                            _.each(v, (value, attr) => {
                                if(_.last(attr.split("_")) === "rollstring") {
                                    const section = attr.slice(0, -10);
                                    const brackets = value.split('['), roll = brackets[0];
                                    let name = brackets[1] ? brackets[1].slice(0, -1) : "";
                                    if(attr.split("_")[1] == "damagemod") {
                                        name = name ? name : v[`${section}type`];
                                        set[`${section}damage`] = roll;
                                    } else {
                                        set[`${section}roll`] = roll;
                                    }
                                    set[`${section}name`] = name;
                                }
                            });
                            setAttrs(set);

                            doneupdating();
                        });
                    });
                });
            });
        });
    };

    var no_version_bugfix = function(doneupdating) {
        getAttrs(["npc","class"], function(v) {
            if(v["npc"] && v["npc"] != "0" || v["class"] && v["class"] != "") {
                setAttrs({version: "2.1"});
            }
            else {
                setAttrs({version: "2.3"}, {silent: true});
            }
        });
        doneupdating();
    };

    var versioning = function(finished) {
        getAttrs(["version"], function(v) {
            const version = parseFloat(v["version"]) || 0.0;
            if(version >=  "2.7") {
                setAttrs({version: "2.7"}, function(){
                    finished();
                });
                console.log("5th Edition OGL by Roll20 v" + v["version"]);
                return;
            }
            else if(!version || version === "") {
                console.log("NO VERSION FOUND");
                no_version_bugfix(function() {
                    versioning(finished);
                });
            }
            else if(version >= "2.6") {
                console.log("UPGRADING TO v2.7");
                upgrade_to_2_7(function() {
                    setAttrs({version: "2.7"}, function() {
                        versioning(finished);
                    });
                });
            }
            else if(version >= "2.5") {
                console.log("UPGRADING TO v2.6");
                upgrade_to_2_6(function() {
                    setAttrs({version: "2.6"}, function() {
                        versioning(finished);
                    });
                });
            }
            else if(version >= "2.4") {
                console.log("UPGRADING TO v2.5");
                upgrade_to_2_5(function() {
                    setAttrs({version: "2.5"}, function() {
                        versioning(finished);
                    });
                });
            }
            else if(version >= "2.3") {
                console.log("UPGRADING TO v2.4");
                upgrade_to_2_4(function() {
                    setAttrs({version: "2.4"}, function() {
                        versioning(finished);
                    });
                });
            }
            else if(version >= "2.2") {
                console.log("UPGRADING TO v2.3");
                upgrade_to_2_3(function() {
                    setAttrs({version: "2.3"}, function() {
                        versioning(finished);
                    });
                });
            }
            else if(version >= "2.1") {
                console.log("UPGRADING TO v2.2");
                upgrade_to_2_2(function() {
                    setAttrs({version: "2.2"}, function() {
                        versioning(finished);
                    });
                });
            }
            else if(version >= "2.0") {
                console.log("UPGRADING TO v2.1");
                upgrade_to_2_1(function() {
                    setAttrs({version: "2.1"}, function() {
                        versioning(finished);
                    });
                });
            }
            else {
                console.log("UPGRADING TO v2.0");
                upgrade_to_2_0(function() {
                    setAttrs({version: "2.0"}, function() {
                        versioning(finished);
                    });
                });
            };
        });
    };