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

var hasTrait = function(traits, value) {
    let found = Object.keys(traits).filter(function(row) {
        return traits[row] === value;
    });
    return found.length > 0;
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

const dndUpdates = [
    new SheetUpgrade(
        'upgrade_to_2_0',
        (resolve, reject) => {
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
                setAttrs(update, {silent: true}, () => {
                    resolve();
                });
            });
        },
        2.0
    ),

    new SheetUpgrade(
        'upgrade_to_2_1',
        (resolve, reject) => {
            v2_old_values_check();
            resolve();
        },
        2.1,
        2.0
    ),

    new SheetUpgrade(
        'upgrade_to_2_3',
        (resolve, reject) => {
            getSectionIDs("damagemod", function(ids) {
                var update = {};
                _.each(ids, function(rowid) {
                    update[`repeating_damagemod_${rowid}_options-flag`] = "0";
                });
                getSectionIDs("tohitmod", function(ids) {
                    _.each(ids, function(rowid) {
                        update[`repeating_tohitmod_${rowid}_options-flag`] = "0";
                    });
                    setAttrs(update, () => {
                        resolve();
                    });
                });
            });
        },
        2.3,
        2.1
    ),

    new SheetUpgrade(
        'upgrade_to_2_4',
        (resolve, reject) => {
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
                                                                                                    resolve()
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
                                        resolve();
                                    } else {
                                        resolve();
                                    }
                                });
                            });
                        });
                    });
                });
            });
        },
        2.4,
        2.3
    ),

    new SheetUpgrade(
        'upgrade_to_2_5',
        (resolve, reject) => {
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
                    resolve();
                });
            });
        },
        2.5,
        2.4
    ),

    new SheetUpgrade(
        'upgrade_to_2_6',
        (resolve, reject) => {
            getSectionIDs("hpmod", function(ids) {
                var getArray = [];
                _.each(ids, function(sectionid) {
                    getArray.push("repeating_hpmod_" + sectionid + "_source");
                });
                getAttrs(getArray, function(v) {
                    _.each(v, function(val, key) {
                        if(val === "CON") removeRepeatingRow("repeating_hpmod_" + key.split("_")[2]);
                    });
                    resolve();
                });
            });
        },
        2.6,
        2.5
    ),

    new SheetUpgrade(
        'upgrade_to_2_7',
        (resolve, reject) => {
            getSectionIDs("damagemod", function(ids) {
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
                                setAttrs(set, () => {
                                    resolve();
                                });
                            });
                        });
                    });
                });
            });
        },
        2.7,
        2.6
    ),

    new SheetUpgrade(
        'upgrade_to_2_8',
        (resolve, reject) => {
            getAttrs(["npc"], function(v) {
                const levels = ["cantrip", "1", "2", "3", "4", "5", "6", "6", "8", "9"];
                let currentLevel = 0;
                let spells = {};
                const updateSpellLevels = function() {
                  getSectionIDs("spell-"+ levels[currentLevel], function(spellID) {
                    _.each(spellID, function(x) {
                        spells["repeating_spell-"+ levels[currentLevel] +"_" + x + "_details-flag"] = "0";
                    });
                    currentLevel++;
                    if(currentLevel <= levels.length) {
                      updateSpellLevels();
                    } else {
                      setAttrs(spells, function() {
                        if(v["npc"] && v["npc"] == "1") {
                          let traits = {};
                          getSectionIDs("npctrait", function(traitID) {
                            _.each(traitID, function(x) {
                                traits["repeating_npctrait_" + x + "_npc_options-flag"] = "0";
                            });
                            getSectionIDs("npcreaction", function(reactionID) {
                              _.each(reactionID, function(x) {
                                  traits["repeating_npcreaction_" + x + "_npc_options-flag"] = "0";
                              });
                              setAttrs(traits, function() {
                                resolve();
                              });
                            });
                          });
                        } else {
                            resolve();
                        }
                      });
                    }
                  });
                };
                updateSpellLevels();
            });
        },
        2.8,
        2.7
    ),

    new SheetUpgrade(
        'upgrade_to_2_9',
        (resolve, reject) => {
            getAttrs(["npc"], function(v) {
                if(v["npc"] && v["npc"] == "1") {
                    resolve();
                } else {
                    getSectionIDs("repeating_traits", (traits) => {
                        let traitNames = [];
                        _.each(traits, (traitID, i) => {
                            traitNames.push("repeating_traits_" + traitID + "_name");
                        });
                        getAttrs(traitNames, function(v) {
                            if(hasTrait(v, "Reliable Talent")) {
                                setAttrs({reliable_talent: 10}, function() {
                                    resolve();
                                });
                            } else {
                                resolve();
                            }
                        });
                    });
                }
            });
        },
        2.9,
        2.8
    ),

    new SheetUpgrade(
        'upgrade_to_4_2_1',
        (resolve, reject) => {
            let sectionsDone = 0;
            ['npctrait', 'npcreaction'].forEach(repeatingSection => {
                getSectionIDs(repeatingSection, idarray => {
                    let attributes = [];
                    let update = {};

                    idarray.forEach(id => {
                        attributes.push(`repeating_${repeatingSection}_${id}_desc`);
                    });

                    getAttrs(attributes, value => {
                        idarray.forEach(id => {
                            update[`repeating_${repeatingSection}_${id}_description`] = value[`repeating_${repeatingSection}_${id}_desc`]
                        });

                        setAttrs(update, () => {
                            sectionsDone++;
                            if(sectionsDone === 2) resolve();
                        });
                    });
                });
            });
        },
        4.21,
        2.9
    ),

    new SheetUpdate(
        'fix_npc_missing_attack_display_flag_attribute',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    getSectionIDs('repeating_npcaction', idarray => {
                        const rollbases = idarray.map(id => { return `repeating_npcaction_${id}_rollbase`; });
                        let update = {}
                        getAttrs(rollbases, function(rolls) {
                            Object.keys(rolls).forEach(roll => {
                                update[roll] = rolls[roll].replace('@{attack_display_flag}', '{{attack=1}}')
                            });
                            setAttrs(update, () => {
                                resolve();
                            });
                        });
                    });
                } else {
                    reject('This update is only valid for npcs sheets');
                }
            });
        },
        2.0
    ),

    new SheetUpdate(
        'fix_npc_version_number',
        (resolve, reject) => {
            getAttrs(["appliedUpdates", "npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    if(!values.appliedUpdates) { resolve(); }
                    else if(values.appliedUpdates.indexOf('upgrade_to_') === -1) { resolve(); }
                    else {
                        const regex = /upgrade_to_[0-9]_[0-9]_[0-9]|upgrade_to_[0-9]_[0-9]|upgrade_to_[0-9]/g;
                        const matches = values.appliedUpdates.match(regex);
                        const lastUpdate = matches[matches.length-1].replace('upgrade_to_', '').replace('_', '.').replace(/_/g, '');
                        const lastUpdateversion = parseFloat(lastUpdate)
                        setAttrs({version: lastUpdateversion}, () => {
                            resolve();
                        });
                    }
                } else {
                    reject('This update is only valid for npcs sheets');
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_npcs_in_modules_saves_and_ability_mods',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    const bases = globalAttributesByCategory.abilities.map(ability => { return `${ability}_base`});
                    const mods = globalAttributesByCategory.abilities.map(ability => { return `${ability}_mod`});
                    getAttrs([...bases, ...mods], values => {
                        let update = {};
                        globalAttributesByCategory.abilities.forEach(ability => {
                            if(values[`${ability}_base`] && values[`${ability}_mod`]) {
                                const base = !isNaN(parseInt(values[`${ability}_base`], 10)) ? parseInt(values[`${ability}_base`], 10) : 0;
                                const mod = !isNaN(parseInt(values[`${ability}_mod`], 10)) ? parseInt(values[`${ability}_mod`], 10) : 0;
                                if(mod === 0) {
                                    const newMod = Math.floor((base - 10) / 2);
                                    update[`${ability}_mod`] = newMod;
                                }
                            }
                        });
                        setAttrs(update, () => { resolve(); });
                    });
                } else {
                    reject('This update is only valid for npcs sheets');
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_spell_attacks',
        (resolve, reject) => {
            getAllSpellsIDS(spells => {
                let spellAttributes = [];
                spells.forEach(entry => {
                    spellAttributes.push(`${entry}_spelloutput`);
                    spellAttributes.push(`${entry}_spellattackid`);
                    spellAttributes.push(`${entry}_spelllevel`);
                });
                getAttrs(spellAttributes.concat(['character_id']), values => {
                    const attackSpells = Object.keys(values).filter(entry => { return (entry.indexOf('_spelloutput') > -1 && values[entry] === 'ATTACK'); });
                    attackSpells.forEach(entry => {
                        const spellID = SheetUtils.getUID(entry);
                        const lvl = values[entry.replace('_spelloutput', '_spelllevel')];
                        const attackID = values[entry.replace('_spelloutput', '_spellattackid')];
                        const characterID = values["character_id"];
                        create_attack_from_spell(lvl, spellID, characterID, attackID);
                    });
                    resolve();
                });
            });
        }
    ),

    new SheetUpdate(
        'fix_npc_in_modules_triggering_popup',
        (resolve, reject) => {
            getAttrs(["npc", "npc_name"], function(values) {
                if(values["npc"] && values["npc"] == "1" && values["npc_name"] && values["npc_name"].trim().length > 0) {
                    setAttrs({l1mancer_status: "completed"}, () => { resolve(); });
                } else {
                    reject('This update is only valid for npcs sheets');
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_npc_actions_to_support_translation',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    update_npc_action("all");
                    resolve();
                } else {
                    reject('This update is only valid for npcs sheets');
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_pc_skill_and_saving_rolls',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    getSectionIDs("repeating_tool", idarray => {
                        updateSavingRolls(globalAttributesByCategory.abilitiesWithAllOptionals);
                        updateSkillRolls(globalAttributesByCategory.skills.all());
                        do_update_tool(idarray);
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_pc_saving_rolls',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    getSectionIDs("repeating_tool", idarray => {
                        updateSavingRolls(globalAttributesByCategory.abilitiesWithAllOptionals);
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_pc_skill_and_saving_rolls_with_expertise',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    getSectionIDs("repeating_tool", idarray => {
                        updateSavingRolls(globalAttributesByCategory.abilitiesWithAllOptionals);
                        updateSkillRolls(globalAttributesByCategory.skills.all());
                        do_update_tool(idarray);
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_pc_skill_and_saving_rolls_with_reliable_talent',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    getSectionIDs("repeating_tool", idarray => {
                        updateSavingRolls(globalAttributesByCategory.abilitiesWithAllOptionals);
                        updateSkillRolls(globalAttributesByCategory.skills.all());
                        do_update_tool(idarray);
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_npc_attacks',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    getSectionIDs("repeating_npcaction", idarray => {
                        const rollbases = idarray.map(entry => { return `repeating_npcaction_${entry}_rollbase`;});
                        getAttrs(rollbases, values => {
                            let update = {};
                            Object.keys(values).forEach(rollbase => {
                                if(values[rollbase].indexOf('{{attack=1}}') > -1) {
                                    if(values[rollbase].indexOf('{template:npcatk}') > -1) {
                                        update[rollbase] = values[rollbase].replace(' {{description=@{show_desc}}} ', '');
                                    } else if(values[rollbase].indexOf('{template:npcaction}') > -1) {
                                        update[rollbase] = values[rollbase].replace('{template:npcaction}', '{template:npcfullatk}');
                                    }
                                }
                            });
                            if(Object.keys(update).length > 0) {
                                setAttrs(update, () => {
                                    resolve();
                                });
                            } else {
                                resolve();
                            }
                        });
                    });
                } else {
                    reject('This update is only valid for npcs sheets');
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_npc_attacks_with_auto_damage_roll',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    update_npc_action("all");
                    resolve();
                } else {
                    reject('This update is only valid for npcs sheets');
                }
            });
        }
    ),

    new SheetUpdate(
        'enable_powerful_build_on_existing_characters',
        (resolve, reject) => {
            getAttrs(["npc"], function(v) {
                if(v["npc"] && v["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    getSectionIDs("repeating_traits", (traits) => {
                        let traitNames = [];
                        _.each(traits, (traitID, i) => {
                            traitNames.push("repeating_traits_" + traitID + "_name");
                        });
                        if(traitNames.length > 0) {
                            getAttrs(traitNames, function(v) {
                                if(hasTrait(v, "Powerful Build")) {
                                    setAttrs({powerful_build: 1}, function() {
                                        resolve();
                                    });
                                } else {
                                    resolve();
                                }
                            });
                        } else {
                            resolve();
                        }
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_pc_global_critical_damage_rolls',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    update_globaldamage(() => {
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_npc_actions_with_damage',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    update_npc_action("all");
                    resolve();
                } else {
                    reject('This update is only valid for npcs sheets');
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_pc_global_critical_stacked_damage_rolls',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    update_globaldamage(() => {
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_npc_charname_output',
        (resolve, reject) => {
            const myreject = function() { reject('This update is only valid for npcs sheets'); };
            updateCharnameOutput(resolve, myreject);
        }
    ),
    
    new SheetUpdate(
        'fix_pc_skill_rolls_tooltips',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    getSectionIDs("repeating_tool", idarray => {
                        updateSkillRolls(globalAttributesByCategory.skills.all());
                        do_update_tool(idarray);
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_pc_global_statical_critical_damage',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    update_globaldamage(() => {
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_spell_school_ouput',
        (resolve, reject) => {
            getAllSpellsIDS(spells => {
                if(spells.length > 0) {
                    let spellAttributes = [];
                    spells.forEach(entry => {
                        spellAttributes.push(`${entry}_spellschool`);
                    });
                    getAttrs(spellAttributes, values => {
                        let update = {};
                        Object.keys(values).forEach(entry => {
                            update[entry] = values[entry].toLowerCase();
                        });
                        setAttrs(update, () => {
                            resolve();
                        });
                    });
                } else {
                    resolve();
                }   
            });
        }
    ),

    new SheetUpdate(
        'fix_pc_global_multiple_statical_critical_damage',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    update_globaldamage(() => {
                        resolve();
                    });
                }
            });
        }
    ),

    new SheetUpdate(
        'fix_spell_savedc_output',
        (resolve, reject) => {
            getAttrs(["npc"], function(values) {
                if(values["npc"] && values["npc"] == "1") {
                    reject('This update is only valid for pcs sheets');
                } else {
                    getAllSpellsIDS(spells => {
                        if(spells.length > 0) {
                            let spellAttributes = [];
                            spells.forEach(entry => {
                                spellAttributes.push(`${entry}_rollcontent`);
                            });
                            getAttrs(spellAttributes, values => {
                                let update = {};
                                Object.keys(values).forEach(entry => {
                                    if(values[entry].includes('@{wtype}&{template:spell}') && !values[entry].includes('{{savedc=@{spell_save_dc}}}')) {
                                        const newValue = values[entry].replace('{{innate=@{innate}}}','{{innate=@{innate}}} {{savedc=@{spell_save_dc}}}');
                                        update[entry] = newValue;
                                    }
                                });
                                setAttrs(update, () => {
                                    resolve();
                                });
                            });
                        } else {
                            resolve();
                        }   
                    });
                }
            });
        }
    ),

];
