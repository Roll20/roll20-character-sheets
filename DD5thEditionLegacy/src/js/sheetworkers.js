    on("sheet:opened", function(eventinfo) {
        versioning(function() {
            var getInfo = function(sections, callback, results) {
                results =  results || {};
                if(sections.length > 0) {
                    var section = sections.pop();
                    getSectionIDs(section, function(ids) {
                        results[section] = ids;
                        getInfo(sections, callback, results);
                    });
                } else {
                    callback(results);
                }
            }
            var spellSections = ["spell-cantrip"];
            for(var x=1; x<=9; x++) {
                spellSections.push("spell-" + x);
            }

            getInfo(spellSections, function(results) {
                var getList = ["character_id"];
                _.each(results, function(sectionids, sectionname) {
                    _.each(sectionids, function(spellid) {
                        getList.push("repeating_" + sectionname + "_" + spellid + "_rollcontent");
                    });
                });
                getAttrs(getList, function(attrs) {
                    var set = {};
                    _.each(attrs, function(data, name) {
                        if(data.length === 68 && data.split("|")[0].substr(2) !== attrs["character_id"]) {
                            set[name] = "%{" + attrs["character_id"] + data.substr(22);
                        }
                    });
                    setAttrs(set, function() {
                        if(eventinfo.sourceType === "sheetworker") {
                            setAttrs({l1mancer_status: "completed"})
                        }
                        else {
                            check_l1_mancer();
                            check_lp_mancer();
                        };
                    });
                });
            });
        });
    });
    //Start of Compendium Drops
    on("sheet:compendium-drop", function() {
        getAttrs(["hp_max","npc_senses","token_size","cd_bar1_v","cd_bar1_m","cd_bar1_l","cd_bar2_v","cd_bar2_m","cd_bar2_l","cd_bar3_v","cd_bar3_m","cd_bar3_l"], function(v) {

            var default_attr = {};
            default_attr["width"] = 70;
            default_attr["height"] = 70;
            if(v["npc_senses"].toLowerCase().match(/(darkvision|blindsight|tremorsense|truesight)/)) {
                default_attr["light_radius"] = Math.max.apply(Math, v["npc_senses"].match(/\d+/g));
            }
            if(v["token_size"]) {
                var squarelength = 70;
                if(v["token_size"].toString().indexOf(",") > -1) {
                    var setwidth = !isNaN(v["token_size"].split(",")[0]) ? v["token_size"].split(",")[0] : 1;
                    var setheight = !isNaN(v["token_size"].split(",")[1]) ? v["token_size"].split(",")[1] : 1;
                    default_attr["width"] = setwidth * squarelength;
                    default_attr["height"] = setheight * squarelength;
                }
                else {
                    default_attr["width"] = squarelength * v["token_size"]
                    default_attr["height"] = squarelength * v["token_size"]
                };
            }

            var getList = {};
            for(x = 1; x<=3; x++) {
                _.each(["v", "m"], function(letter) {
                    var keyname = "cd_bar" + x + "_" + letter;
                    if(v[keyname] != undefined && isNaN(v[keyname])) {
                        getList[keyname] = v[keyname];
                    }
                });
            }

            getAttrs(_.values(getList), function(values) {
                _.each(_.keys(getList), function(keyname) {
                    v[keyname] = values[getList[keyname]] == undefined ? "" : values[getList[keyname]];
                });

                if(v["cd_bar1_l"]) {
                    default_attr["bar1_link"] = v["cd_bar1_l"];
                }
                else if(v["cd_bar1_v"] || v["cd_bar1_m"]) {
                    if(v["cd_bar1_v"]) {
                        default_attr["bar1_value"] = v["cd_bar1_v"];
                    }
                    if(v["cd_bar1_m"]) {
                        default_attr["bar1_max"] = v["cd_bar1_m"];
                    }
                }
                else {
                    default_attr["bar1_value"] = v["hp_max"];
                    default_attr["bar1_max"] = v["hp_max"];
                }

                if(v["cd_bar2_l"]) {
                    default_attr["bar2_link"] = v["cd_bar2_l"];
                }
                else if(v["cd_bar2_v"] || v["cd_bar2_m"]) {
                    if(v["cd_bar2_v"]) {
                        default_attr["bar2_value"] = v["cd_bar2_v"];
                    }
                    if(v["cd_bar2_m"]) {
                        default_attr["bar2_max"] = v["cd_bar2_m"];
                    }
                }
                else {
                    default_attr["bar2_link"] = "npc_ac";
                }

                if(v["cd_bar3_l"]) {
                    default_attr["bar3_link"] = v["cd_bar3_l"];
                }
                else if(v["cd_bar3_v"] || v["cd_bar3_m"]) {
                    if(v["cd_bar3_v"]) {
                        default_attr["bar3_value"] = v["cd_bar3_v"];
                    }
                    if(v["cd_bar3_m"]) {
                        default_attr["bar3_max"] = v["cd_bar3_m"];
                    }
                }

                setDefaultToken(default_attr);
            });
        });
    });

    ['strength','dexterity','constitution','intelligence','wisdom','charisma'].forEach(attr => {
        on(`change:${attr}_base change:${attr}_bonus`, function() {
            update_attr(`${attr}`);

        });
    });

    ['strength','dexterity','constitution','intelligence','wisdom','charisma'].forEach(attr => {
        on(`change:${attr}`, function() {
            update_mod(`${attr}`);

            const cap = attr.charAt(0).toUpperCase() + attr.slice(1);
            check_customac(cap);

            (attr === "strength") ? update_weight() : false;
            (attr === "dexterity") ? update_initiative() : false;
        });
    });

    ['strength','dexterity','constitution','intelligence','wisdom','charisma'].forEach(attr => {
        on(`change:${attr}_mod`, function() {
            update_save(`${attr}`);
            update_attacks(`${attr}`);
            update_tool(`${attr}`);
            update_spell_info(`${attr}`);

            switch(`${attr}`) {
                case "strength":
                    update_skills(["athletics"]);
                    break;
                case "dexterity":
                    update_skills(["acrobatics", "sleight_of_hand", "stealth"]);
                    update_ac();
                    update_initiative();
                    break;
                case "intelligence":
                    update_skills(["arcana", "history", "investigation", "nature", "religion"]);
                    break;
                case "wisdom":
                    update_skills(["animal_handling", "insight", "medicine", "perception", "survival"]);
                    break;
                case "charisma":
                    update_skills(["deception", "intimidation", "performance", "persuasion"]);
                    break;
                default:
                    false;
            }
        });
    });

    ['strength','dexterity','constitution','intelligence','wisdom','charisma'].forEach(attr => {
        on(`change:${attr}_save_prof change:${attr}_save_mod`, function(eventinfo) {
            if(eventinfo.sourceType === "sheetworker") {return;};
            update_save(`${attr}`);
        });
    });

    on("change:globalsavemod", function(eventinfo) {
        if(eventinfo.sourceType === "sheetworker") {return;};
        update_all_saves();
    });

    on("change:death_save_mod", function(eventinfo) {
        if(eventinfo.sourceType === "sheetworker") {return;};
        update_save("death");
    });

    ['acrobatics','animal_handling','arcana','athletics','deception','history','insight','intimidation','investigation',
    'medicine','nature','perception','performance','persuasion','religion','sleight_of_hand','stealth','survival'].forEach(attr => {
        on(`change:${attr}_prof change:${attr}_type change:${attr}_flat`, function(eventinfo) {
            if(eventinfo.sourceType === "sheetworker") {return;};
            update_skills([`${attr}`]);
        });
    });

    on("change:repeating_tool:toolname change:repeating_tool:toolbonus_base change:repeating_tool:toolattr_base change:repeating_tool:tool_mod", function(eventinfo) {
        if(eventinfo.sourceType === "sheetworker") {
            return;
        }
        var tool_id = eventinfo.sourceAttribute.substring(15, 35);
        update_tool(tool_id);
    });

    on("change:repeating_attack:atkname change:repeating_attack:atkflag change:repeating_attack:atkattr_base change:repeating_attack:atkmod change:repeating_attack:atkmagic change:repeating_attack:atkprofflag change:repeating_attack:dmgflag change:repeating_attack:dmgbase change:repeating_attack:dmgattr change:repeating_attack:dmgmod change:repeating_attack:dmgtype change:repeating_attack:dmg2flag change:repeating_attack:dmg2base change:repeating_attack:dmg2attr change:repeating_attack:dmg2mod change:repeating_attack:dmg2type change:repeating_attack:saveflag change:repeating_attack:savedc change:repeating_attack:saveflat change:repeating_attack:dmgcustcrit change:repeating_attack:dmg2custcrit change:repeating_attack:ammo change:repeating_attack:saveattr change:repeating_attack:atkrange", function(eventinfo) {
        if(eventinfo.sourceType === "sheetworker") {
            return;
        }

        var source = eventinfo.sourceAttribute.substr(38);
        var attackid = eventinfo.sourceAttribute.substring(17, 37);
        if(source == "atkattr_base" || source == "savedc") {
            getAttrs(["repeating_attack_spellid", "repeating_attack_spelllevel"], function(v) {
                set = {};
                if(v.repeating_attack_spellid && v.repeating_attack_spellid != "" && v.repeating_attack_spelllevel && v.repeating_attack_spelllevel != "") {
                    var newVal = eventinfo.newValue == "spell" ? "spell" : _.last(eventinfo.newValue.split("_")[0].split("{"));
                    set["repeating_attack_atkattr_base"] = newVal == "spell" ? "spell" : "@{" + newVal + "_mod}";
                    set["repeating_attack_savedc"] = newVal == "spell" ? "spell" : "(@{" + newVal + "_mod}+8+@{pb})";
                    set["repeating_spell-" + v.repeating_attack_spelllevel + "_" + v.repeating_attack_spellid + "_spell_ability"] = newVal == "spell" ? "spell" : "@{" + newVal + "_mod}+";
                }
                setAttrs(set, function() {
                    update_attacks(attackid);
                });
            });
        } else {
            update_attacks(attackid);
        }
    });

    on("change:repeating_damagemod remove:repeating_damagemod", function(eventinfo) {
        update_globaldamage();
    });

    on("change:global_damage_mod_flag", function(eventinfo) {
        getSectionIDs("damagemod", function(ids) {
            var update = {};
            if(eventinfo.newValue === "1") {
                if(!ids || ids.length === 0) {
                    var rowid = generateRowID();
                    update[`repeating_damagemod_${rowid}_global_damage_active_flag`] = "1";
                }
            } else {
                _.each(ids, function(rowid) {
                    update[`repeating_damagemod_${rowid}_global_damage_active_flag`] = "0";
                });
            }
            setAttrs(update);
        });
    });

    on("change:exhaustion_toggle", function(eventinfo) {
        if(eventinfo.newValue !== "0") {
            getAttrs(["exhaustion_level"], function(attrs) {
                if(!attrs.exhaustion_level || attrs.exhaustion_level === "") {
                    var update = {};
                    update.exhaustion_level = "0";
                    setAttrs(update);
                }
            });
        }
    });

    on("change:exhaustion_level", function(eventinfo) {
        const newValue = parseInt(eventinfo.newValue) || 0, previousValue = parseInt(eventinfo.previousValue) || 0;
        let update = {};

       if (newValue === 0) {
            //If exhaustion is 0 the reset exhaustion_1 to "No Effect" and blank the other spans
            for(let i = 2; i <= 6; i++) { update[`exhaustion_${i}`] = ""}
            update[`exhaustion_1`] = "• " + getTranslationByKey(`exhaustion-0`)
        } else if (newValue > previousValue) {
            //If exhaustion increase then add text to the spans
            for(let i = previousValue; i <= newValue; i++)
            {update[`exhaustion_${i}`] = "• " + getTranslationByKey(`exhaustion-${i}`)}
        } else {
            //If exhaustion decrease remove text from spans
            for(let i = newValue + 1; i <= previousValue; i++) {update[`exhaustion_${i}`] = ""}
        };

        setAttrs(update, {silent: true});
    });

    on("change:race change:subrace", function(eventinfo) {
        update_race_display();
    });

    on("change:drop_category", function(eventinfo) {
        if(eventinfo.newValue === "Monsters") {
            getAttrs(["class","race","speed","hp"], function(v) {
                if(v["class"] != "" || v["race"] != "" || v["speed"] != "" || v["hp"] != "") {
                    setAttrs({monster_confirm_flag: 1});
                }
                else {
                    handle_drop(eventinfo.newValue);
                }
            });
        }
        else {
            handle_drop(eventinfo.newValue);
        }
    });

    on(`change:repeating_inventory:hasattack`, function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {return;};

        const itemid = eventinfo.sourceAttribute.substring(20, 40);
        getAttrs([`repeating_inventory_${itemid}_itemattackid`], function(v) {
            const hasattack = eventinfo.newValue, itemattackid = v[`repeating_inventory_${itemid}_itemattackid`];
            (hasattack == 1) ? create_attack_from_item(itemid) : remove_attack(itemattackid);
        });
    });

    on(`change:repeating_inventory:useasresource`, function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {return;};

        const itemid = eventinfo.sourceAttribute.substring(20, 40);
        getAttrs([`repeating_inventory_${itemid}_itemresourceid`], function(v) {
            const useasresource = eventinfo.newValue, itemresourceid = v[`repeating_inventory_${itemid}_itemresourceid`];
            (useasresource == 1) ? create_resource_from_item(itemid) : remove_resource(itemresourceid);
        });
    });

    on("change:repeating_inventory:itemname change:repeating_inventory:itemproperties change:repeating_inventory:itemmodifiers change:repeating_inventory:itemcount", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }

        var itemid = eventinfo.sourceAttribute.substring(20, 40);
        getAttrs(["repeating_inventory_" + itemid + "_itemattackid", "repeating_inventory_" + itemid + "_itemresourceid"], function(v) {
            var attackid = v["repeating_inventory_" + itemid + "_itemattackid"];
            var resourceid = v["repeating_inventory_" + itemid + "_itemresourceid"];
            if(attackid) {
                update_attack_from_item(itemid, attackid);
            }
            if(resourceid) {
                update_resource_from_item(itemid, resourceid);
            }
        });
    });

    ['other_resource','repeating_resource:resource_left','repeating_resource:resource_right'].forEach(attr => {
        on(`change:${attr} change:${attr}_name`, (eventinfo) => {
            if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {return;}
            const resourceid = (eventinfo.sourceAttribute.includes("_name")) ? eventinfo.sourceAttribute.slice(0, -5) : eventinfo.sourceAttribute;
            getAttrs([`${resourceid}_itemid`], (v) => {
                const value = eventinfo.newValue;
                //Update repeating_inventory if an itemid is associated with a resource
                if (v[`${resourceid}_itemid`] && v[`${resourceid}_itemid`] != "") {
                    const itemid = v[`${resourceid}_itemid`];
                    let update = {};
                    if (eventinfo.sourceAttribute.includes("_name")) {
                        update[`repeating_inventory_${itemid}_itemname`]  = eventinfo.newValue;
                    } else {
                        update[`repeating_inventory_${itemid}_itemcount`] = eventinfo.newValue;
                    };
                    setAttrs(update, {silent: true}, () => {update_weight()});
                };
            });
        });
    });

    on("change:repeating_inventory:itemweight change:repeating_inventory:itemcount change:cp change:sp change:ep change:gp change:pp change:encumberance_setting change:size change:carrying_capacity_mod", function() {
        update_weight();
    });

    on("change:repeating_inventory:itemmodifiers change:repeating_inventory:equipped", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        var itemid = eventinfo.sourceAttribute.substring(20, 40);
        getAttrs(["repeating_inventory_" + itemid + "_itemmodifiers"], function(v) {
            if(v["repeating_inventory_" + itemid + "_itemmodifiers"]) {
                check_itemmodifiers(v["repeating_inventory_" + itemid + "_itemmodifiers"], eventinfo.previousValue);
            };
        });
    });

    on("change:custom_ac_flag change:custom_ac_base change:custom_ac_part1 change:custom_ac_part2 change:custom_ac_shield", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        update_ac();
    });

   ['spell-cantrip','spell-1','spell-2','spell-3','spell-4','spell-5','spell-6','spell-7','spell-8','spell-9'].forEach(attr => {
        on(`change:repeating_${attr}:includedesc change:repeating_${attr}:innate change:repeating_${attr}:spell_ability change:repeating_${attr}:spell_updateflag change:repeating_${attr}:spellathigherlevels change:repeating_${attr}:spellattack change:repeating_${attr}:spelldamage change:repeating_${attr}:spelldamage2 change:repeating_${attr}:spelldamagetype change:repeating_${attr}:spelldamagetype2 change:repeating_${attr}:spelldescription change:repeating_${attr}:spelldmgmod change:repeating_${attr}:spellhealing change:repeating_${attr}:spellhlbonus change:repeating_${attr}:spellhldie change:repeating_${attr}:spellhldietype change:repeating_${attr}:spellname change:repeating_${attr}:spellprepared change:repeating_${attr}:spellrange change:repeating_${attr}:spellsave change:repeating_${attr}:spellsavesuccess change:repeating_${attr}:spelltarget change:repeating_${attr}:spell_damage_progression`, (eventinfo) => {
            if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") { return; }

            const spellid = eventinfo.sourceAttribute.split("_")[2], repeating_source = `repeating_${attr}_${spellid}`;
            getAttrs([`${repeating_source}_spellattackid`], (v) => {
                var attackid = v[`${repeating_source}_spellattackid`];
                var lvl      = attr.split("spell-")[1];
                if(attackid && lvl && spellid) {
                    update_attack_from_spell(lvl, spellid, attackid)
                }
            });
        });
    });

    ['spell-cantrip','spell-1','spell-2','spell-3','spell-4','spell-5','spell-6','spell-7','spell-8','spell-9'].forEach(attr => {
        on(`change:repeating_${attr}:spelloutput`, (eventinfo) => {
            if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {return;}

            const spellid = eventinfo.sourceAttribute.split("_")[2], repeating_source = `repeating_${attr}_${spellid}`;
            getAttrs([`${repeating_source}_spellattackid`, `${repeating_source}_spelllevel`, `${repeating_source}_spellathigherlevels`, "character_id"], function(v) {
                const attackid     = v[repeating_source + "_spellattackid"];
                const higherlevels = v[repeating_source + "_spellathigherlevels"];
                const spelloutput  = eventinfo.newValue;
                let lvl            = v[repeating_source + "_spelllevel"];

                if (spelloutput && spelloutput === "ATTACK") {
                    create_attack_from_spell(lvl, spellid, v["character_id"]);
                } else if (spelloutput && spelloutput === "SPELLCARD" && attackid && attackid != "") {
                    let lvl = parseInt(v[repeating_source + "_spelllevel"], 10);
                    remove_attack(attackid);
                    update_spelloutput(higherlevels, lvl, repeating_source, spelloutput, licensedsheet);
                }
            });
        });
    });

    ['spell-cantrip','spell-1','spell-2','spell-3','spell-4','spell-5','spell-6','spell-7','spell-8','spell-9'].forEach(attr => {
        on(`change:repeating_${attr}:spellathigherlevels`, (eventinfo) => {
            if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {return;}

            const spellid = eventinfo.sourceAttribute.split("_")[2], repeating_source = `repeating_${attr}_${spellid}`;
            getAttrs([`${repeating_source}_spelllevel`, `${repeating_source}_spelloutput`], function(v) {
                const higherlevels = eventinfo.newValue;
                const lvl          = parseInt(v[repeating_source + "_spelllevel"], 10);
                const spelloutput  = v[repeating_source + "_spelloutput"];

                if (spelloutput && spelloutput === "SPELLCARD") {
                    update_spelloutput(higherlevels, lvl, repeating_source, spelloutput, licensedsheet);
                }
            });
        });
    });

    const update_spelloutput = (higherlevels, lvl, repeating_source, spelloutput, licensedsheet)  => {
        let spelllevel = "@{spelllevel}";
        let update = {};

        if (higherlevels) {
            for(i = 0; i < 10-lvl; i++) {
                let tot = parseInt(i, 10) + parseInt(lvl, 10);
                spelllevel = spelllevel + "|Level " + tot + "," + tot;
            }
            spelllevel = `?{Cast at what level? ${spelllevel}}`;
        }
        update[repeating_source + "_rollcontent"] = `@{wtype}&{template:spell} {{level=@{spellschool} ${spelllevel}}} {{name=@{spellname}}} {{castingtime=@{spellcastingtime}}} {{range=@{spellrange}}} {{target=@{spelltarget}}} @{spellcomp_v} @{spellcomp_s} @{spellcomp_m} {{material=@{spellcomp_materials}}} {{duration=@{spellduration}}} {{description=@{spelldescription}}} {{athigherlevels=@{spellathigherlevels}}} @{spellritual} {{innate=@{innate}}} @{spellconcentration} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
        setAttrs(update, {silent: true});
    };

    on("change:class change:custom_class change:cust_classname change:cust_hitdietype change:cust_spellcasting_ability change:cust_spellslots change:cust_strength_save_prof change:cust_dexterity_save_prof change:cust_constitution_save_prof change:cust_intelligence_save_prof change:cust_wisdom_save_prof change:cust_charisma_save_prof change:subclass change:multiclass1 change:multiclass1_subclass change:multiclass2 change:multiclass2_subclass change:multiclass3 change:multiclass3_subclass" , function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        update_class();
    });

    on("change:base_level change:multiclass1_flag change:multiclass1 change:multiclass1_lvl change:multiclass2_flag change:multiclass2 change:multiclass2_lvl change:multiclass3_flag change:multiclass3 change:multiclass3_lvl change:arcane_fighter change:arcane_rogue", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        set_level();
    });

    on("change:level_calculations change:caster_level change:lvl1_slots_mod change:lvl2_slots_mod change:lvl3_slots_mod change:lvl4_slots_mod change:lvl5_slots_mod change:lvl6_slots_mod change:lvl7_slots_mod change:lvl8_slots_mod change:lvl9_slots_mod", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        getAttrs(["level_calculations"], function(v) {
            if(!v["level_calculations"] || v["level_calculations"] == "on") {
                update_spell_slots();
            };
        });
    });

    on("change:caster_level", function(eventinfo) {
        getAttrs(["caster_level","npc"], function(v) {
            var casterlvl = v["caster_level"] && !isNaN(parseInt(v["caster_level"], 10)) ? parseInt(v["caster_level"], 10) : 0;
            if(v["npc"] && v["npc"] == 1 && casterlvl > 0) {
                setAttrs({level: casterlvl})
            };
        });
    });

    on("change:pb_type change:pb_custom", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        update_pb();
    });

    on("change:dtype", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        update_attacks("all");
        update_npc_action("all");
    });

    on("change:jack_of_all_trades", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        update_jack_attr();
        update_all_ability_checks();
    });

    on("change:initmod change:init_tiebreaker", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        update_initiative();
    });

    on("change:spellcasting_ability change:spell_dc_mod change:globalmagicmod", function(eventinfo) {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
            return;
        }
        update_spell_info();
    });

    on("change:npc_challenge", function() {
        update_challenge();
    });

    on("change:npc_str_save_base change:npc_dex_save_base change:npc_con_save_base change:npc_int_save_base change:npc_wis_save_base change:npc_cha_save_base", function(eventinfo) {
        update_npc_saves();
    });

    on("change:npc_acrobatics_base change:npc_animal_handling_base change:npc_arcana_base change:npc_athletics_base change:npc_deception_base change:npc_history_base change:npc_insight_base change:npc_intimidation_base change:npc_investigation_base change:npc_medicine_base change:npc_nature_base change:npc_perception_base change:npc_performance_base change:npc_persuasion_base change:npc_religion_base change:npc_sleight_of_hand_base change:npc_stealth_base change:npc_survival_base", function(eventinfo) {
        update_npc_skills();
    });

    on("change:repeating_npcaction:attack_flag change:repeating_npcaction:attack_type change:repeating_npcaction:attack_range change:repeating_npcaction:attack_target change:repeating_npcaction:attack_tohit change:repeating_npcaction:attack_damage change:repeating_npcaction:attack_damagetype change:repeating_npcaction:attack_damage2 change:repeating_npcaction:attack_damagetype2 change:repeating_npcaction-l:attack_flag change:repeating_npcaction-l:attack_type change:repeating_npcaction-l:attack_range change:repeating_npcaction-l:attack_target change:repeating_npcaction-l:attack_tohit change:repeating_npcaction-l:attack_damage change:repeating_npcaction-l:attack_damagetype change:repeating_npcaction-l:attack_damage2 change:repeating_npcaction-l:attack_damagetype2 change:repeating_npcaction:show_desc change:repeating_npcaction-l:show_desc change:repeating_npcaction:description change:repeating_npcaction-l:description", function(eventinfo) {
        const actionid  = eventinfo.sourceAttribute.split("_")[2];
        const legendary = eventinfo.sourceAttribute.includes("npcaction-l") ? true : false;

        update_npc_action(actionid, legendary);
    });

    on("change:core_die change:halflingluck_flag", function() {
        getAttrs(["core_die","halflingluck_flag"], function(v) {
            core = v.core_die && v.core_die != "" ? v.core_die : "1d20";
            luck = v.halflingluck_flag && v.halflingluck_flag === "1" ? "ro<1" : "";
            update = {};
            update["d20"] = core + luck;
            if(!v.core_die || v.core_die === "") {
                update["core_die"] = "1d20";
            }
            setAttrs(update);
        });
    });

    [`ac`,`attack`,'save','skill',].forEach(attr => {
        on(`change:global_${attr}_mod_flag`, (eventinfo) => {
            const mod = (attr === "attack") ? "tohitmod" : `${attr}mod`;
            if(eventinfo.newValue === "1") {
                const firstAttr       = (attr === "ac")  ? "val" : "roll";
                const firstAttrValue  = (attr === "ac")  ? 1 : "1d4";
                const secondAttrValue = (attr === "ac")  ? "Defense" : (attr === "skill") ? "GUIDANCE" : "BLESS";

                getSectionIDs(mod, (ids) => {
                    if(!ids || ids.length === 0) {
                        var update = {};
                        var rowid = generateRowID();
                        update[`repeating_${mod}_${rowid}_global_${attr}_${firstAttr}`]= `${firstAttrValue}`;
                        update[`repeating_${mod}_${rowid}_global_${attr}_name`]        = `${secondAttrValue}`;
                        update[`repeating_${mod}_${rowid}_global_${attr}_active_flag`] = "1";
                        setAttrs(update);
                    }
                });
            } else {
                getSectionIDs(mod, function(ids) {
                    var update = {};
                    var rowid = generateRowID();
                    _.each(ids, function(rowid) {
                        update[`repeating_${mod}_${rowid}_global_${attr}_active_flag`] = "0";
                    });
                    setAttrs(update);
                });
            }
        });
    });

    on("change:repeating_skillmod remove:repeating_skillmod", function(eventinfo) {
        update_globalskills();
    });

    on("change:repeating_savemod remove:repeating_savemod", function(eventinfo) {
        update_globalsaves();
    });

    on("change:repeating_tohitmod remove:repeating_tohitmod", function(eventinfo) {
        update_globalattack();
    });

    on("change:repeating_acmod remove:repeating_acmod", function(eventinfo) {
        update_ac();
    });

    on("change:confirm", function(eventinfo) {
        setAttrs({monster_confirm_flag: ""});
        getAttrs(["drop_category"], function(v) {
            if(v["drop_category"]) {
                handle_drop(v["drop_category"]);
            }
        });
    });

    on("change:cancel", function(eventinfo) {
        setAttrs({monster_confirm_flag: ""});
        var update = {};
        update["drop_category"] = "";
        update["drop_name"] = "";
        update["drop_data"] = "";
        update["drop_content"] = "";
        setAttrs(update, {silent: true});
    });

    on("change:mancer_confirm", function(eventinfo) {
        setAttrs({mancer_confirm_flag: "", charactermancer_step: "l1-welcome"}, function() {
            check_l1_mancer();
        });
    });

    on("change:mancer_cancel", function(eventinfo) {
        setAttrs({mancer_confirm_flag: "", l1mancer_status: "completed"}, function() {
            check_l1_mancer();
        });
    });

    on("change:mancer_npc", function(eventinfo) {
        setAttrs({mancer_confirm_flag: "", l1mancer_status: "completed", npc: "1"}, function() {
            check_l1_mancer();
        });
    });

    on("change:passiveperceptionmod", function(eventinfo) {
        update_passive_perception();
    });

    on("remove:repeating_inventory", function(eventinfo) {
        var itemid = eventinfo.sourceAttribute.substring(20, 40);
        var attackids = eventinfo.removedInfo && eventinfo.removedInfo["repeating_inventory_" + itemid + "_itemattackid"] ? eventinfo.removedInfo["repeating_inventory_" + itemid + "_itemattackid"] : undefined;
        var resourceid = eventinfo.removedInfo && eventinfo.removedInfo["repeating_inventory_" + itemid + "_itemresourceid"] ? eventinfo.removedInfo["repeating_inventory_" + itemid + "_itemresourceid"] : undefined;

        if(attackids) {
            _.each(attackids.split(","), function(value) { remove_attack(value); });
        }
        if(resourceid) {
            remove_resource(resourceid);
        }

        if(eventinfo.removedInfo && eventinfo.removedInfo["repeating_inventory_" + itemid + "_itemmodifiers"]) {
            check_itemmodifiers(eventinfo.removedInfo["repeating_inventory_" + itemid + "_itemmodifiers"]);
        }

        update_weight();
    });

    on("remove:repeating_attack", function(eventinfo) {
        var attackid = eventinfo.sourceAttribute.substring(17, 37);
        var itemid = eventinfo.removedInfo["repeating_attack_" + attackid + "_itemid"];
        var spellid = eventinfo.removedInfo["repeating_attack_" + attackid + "_spellid"];
        var spelllvl = eventinfo.removedInfo["repeating_attack_" + attackid + "_spelllevel"];
        if(itemid) {
            getAttrs(["repeating_inventory_" + itemid + "_hasattack"], function(v) {
                if(v["repeating_inventory_" + itemid + "_hasattack"] && v["repeating_inventory_" + itemid + "_hasattack"] == 1) {
                    var update = {};
                    update["repeating_inventory_" + itemid + "_itemattackid"] = "";
                    update["repeating_inventory_" + itemid + "_hasattack"] = 0;
                    setAttrs(update, {silent: true});
                }
            });
        };
        if(spellid && spelllvl) {
            getAttrs(["repeating_spell-" + spelllvl + "_" + spellid + "_spelloutput"], function(v) {
                if(v["repeating_spell-" + spelllvl + "_" + spellid + "_spelloutput"] && v["repeating_spell-" + spelllvl + "_" + spellid + "_spelloutput"] == "ATTACK") {
                    var update = {};
                    update["repeating_spell-" + spelllvl + "_" + spellid + "_spellattackid"] = "";
                    update["repeating_spell-" + spelllvl + "_" + spellid + "_spelloutput"] = "SPELLCARD";
                    setAttrs(update, {silent: true});
                }
            });
        };
    });

    on("remove:repeating_resource", function(eventinfo) {
        const resourceid = eventinfo.sourceAttribute.substring(19, 39);
        let update       = {};

        _.each(['left','right'], (side) => {
            const itemid = eventinfo.removedInfo[`repeating_resource_${resourceid}_resource_${side}_itemid`];
            if (itemid) {
                update[`repeating_inventory_${itemid}_useasresource`] = 0;
                update[`repeating_inventory_${itemid}_itemresourceid`] = "";
            };
        });

        setAttrs(update, {silent: true});
    });

    on("remove:repeating_spell-cantrip remove:repeating_spell-1 remove:repeating_spell-2 remove:repeating_spell-3 remove:repeating_spell-4 remove:repeating_spell-5 remove:repeating_spell-6 remove:repeating_spell-7 remove:repeating_spell-8 remove:repeating_spell-9", function(eventinfo) {
        var attackid = eventinfo.removedInfo[eventinfo.sourceAttribute + "_spellattackid"];
        if(attackid) {
            remove_attack(attackid);
        }
    });

    on("clicked:relaunch_lvl1mancer", function(eventinfo) {
        getAttrs(["l1mancer_status"], function(v) {
            if(v["l1mancer_status"] === "completed") {
                setAttrs({l1mancer_status: "relaunch"});
            }
            check_l1_mancer();
        });
    });

    on("clicked:launch_lvl+mancer", function(eventinfo) {
        getAttrs(["class", "level", "hp_max", "custom_class","multiclass1_flag", "multiclass2_flag", "multiclass3_flag", "multiclass1", "multiclass2", "multiclass3"], function(v) {
            var throw_warning = false;
            var class_array = [v["class"]];
            if(!v["class"] || !v["hp_max"] || isNaN(parseInt(v["hp_max"], 10)) || !v["level"] || isNaN(parseInt(v["level"], 10)) || parseInt(v["level"], 10) < 1 || (v["multiclass2_flag"] == 1 && v["multiclass1_flag"] == 0) || (v["multiclass3_flag"] == 1 && v["multiclass2_flag"] == 0) ) {
                throw_warning = true;
            };

            if(v["multiclass1_flag"] == 1) {class_array.push(v["multiclass1"])};
            if(v["multiclass2_flag"] == 1) {class_array.push(v["multiclass2"])};
            if(v["multiclass3_flag"] == 1) {class_array.push(v["multiclass3"])};
            // Check to see if there are any duplicate multiclasses
            if((new Set(class_array)).size !== class_array.length) {
                throw_warning = true;
            };

            if(throw_warning === true) {
                setAttrs({leveler_warningflag: "show"});
                return;
            };

            setAttrs({lpmancer_status: "active"}, function() {
                startCharactermancer("lp-welcome");
            });
        });

    });

    on("change:experience", function(eventinfo) {
        update_leveler_display();
    });

    var update_attr = function(attr) {
        var update = {};
        var attr_fields = [attr + "_base",attr + "_bonus"];
        getSectionIDs("repeating_inventory", function(idarray) {
            _.each(idarray, function(currentID, i) {
                attr_fields.push("repeating_inventory_" + currentID + "_equipped");
                attr_fields.push("repeating_inventory_" + currentID + "_itemmodifiers");
            });
            getAttrs(attr_fields, function(v) {
                var base = v[attr + "_base"] && !isNaN(parseInt(v[attr + "_base"], 10)) ? parseInt(v[attr + "_base"], 10) : 10;
                var bonus = v[attr + "_bonus"] && !isNaN(parseInt(v[attr + "_bonus"], 10)) ? parseInt(v[attr + "_bonus"], 10) : 0;
                var item_base = 0;
                var item_bonus = 0;
                _.each(idarray, function(currentID) {
                    if((!v["repeating_inventory_" + currentID + "_equipped"] || v["repeating_inventory_" + currentID + "_equipped"] === "1") && v["repeating_inventory_" + currentID + "_itemmodifiers"] && v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().indexOf(attr > -1)) {
                        var mods = v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().split(",");
                        _.each(mods, function(mod) {
                            if(mod.indexOf(attr) > -1 && mod.indexOf("save") === -1) {
                                if(mod.indexOf(":") > -1) {
                                    var new_base = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                                    item_base = new_base && new_base > item_base ? new_base : item_base;
                                }
                                else if(mod.indexOf("-") > -1) {
                                    var new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                                    item_bonus = new_mod ? item_bonus - new_mod : item_bonus;
                                }
                                else {
                                    var new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                                    item_bonus = new_mod ? item_bonus + new_mod : item_bonus;
                                }
                            };
                        });
                    }
                });

                update[attr + "_flag"] = bonus > 0 || item_bonus > 0 || item_base > base ? 1 : 0;
                base = base > item_base ? base : item_base;
                update[attr] = base + bonus + item_bonus;
                setAttrs(update);
            });
        });
    };

    var update_mod = function (attr) {
        getAttrs([attr], function(v) {
            var attr_abr = attr.substring(0,3);
            var finalattr = v[attr] && isNaN(v[attr]) === false ? Math.floor((parseInt(v[attr], 10) - 10) / 2) : 0;
            var update = {};
            update[attr + "_mod"] = finalattr;
            update["npc_" + attr_abr + "_negative"] = v[attr] && !isNaN(v[attr]) && parseInt(v[attr], 10) < 10 ? 1 : 0;
            setAttrs(update);
        });
    };

    var update_save = function (attr) {
        var save_attrs = [attr + "_mod", attr + "_save_prof", attr + "_save_mod","pb","globalsavemod","pb_type"];
        getSectionIDs("repeating_inventory", function(idarray) {
            _.each(idarray, function(currentID, i) {
                save_attrs.push("repeating_inventory_" + currentID + "_equipped");
                save_attrs.push("repeating_inventory_" + currentID + "_itemmodifiers");
            });

            getAttrs(save_attrs, function(v) {
                var attr_mod = v[attr + "_mod"] ? parseInt(v[attr + "_mod"], 10) : 0;
                var prof = v[attr + "_save_prof"] && v[attr + "_save_prof"] != 0 && !isNaN(v["pb"]) ? parseInt(v["pb"], 10) : 0;
                var save_mod = v[attr + "_save_mod"] && !isNaN(parseInt(v[attr + "_save_mod"], 10)) ? parseInt(v[attr + "_save_mod"], 10) : 0;
                var global = v["globalsavemod"] && !isNaN(v["globalsavemod"]) ? parseInt(v["globalsavemod"], 10) : 0;
                var items = 0;
                _.each(idarray, function(currentID) {
                    if(v["repeating_inventory_" + currentID + "_equipped"] && v["repeating_inventory_" + currentID + "_equipped"] === "1" && v["repeating_inventory_" + currentID + "_itemmodifiers"] && (v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().indexOf("saving throws") > -1 || v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().indexOf(attr + " save") > -1)) {
                        var mods = v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().split(",");
                        _.each(mods, function(mod) {
                            if(mod.indexOf(attr + " save") > -1) {
                                var substr = mod.slice(mod.lastIndexOf(attr + " save") + attr.length + " save".length);
                                var bonus = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? parseInt(substr,10) : 0;
                            }
                            else if(mod.indexOf("saving throws") > -1) {
                                var substr = mod.slice(mod.lastIndexOf("saving throws") + "saving throws".length);
                                var bonus = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? parseInt(substr,10) : 0;
                            };
                            if(bonus && bonus != 0) {
                                items = items + bonus;
                            };
                        });
                    }
                });
                var total = attr_mod + prof + save_mod + global + items;
                if(v["pb_type"] && v["pb_type"] === "die" && v[attr + "_save_prof"] != 0 && attr != "death") {
                    total = total + "+" + v["pb"];
                };
                var update = {};
                update[attr + "_save_bonus"] = total;
                setAttrs(update, {silent: true});
            });
        });
    };

    var update_all_saves = function() {
        update_save("strength");
        update_save("dexterity");
        update_save("constitution");
        update_save("intelligence");
        update_save("wisdom");
        update_save("charisma");
        update_save("death");
    };

    var update_all_ability_checks = function(){
        update_initiative();
        update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion"]);
    };

    var update_skills = function (skills_array) {
        var skill_parent = {athletics: "strength", acrobatics: "dexterity", sleight_of_hand: "dexterity", stealth: "dexterity", arcana: "intelligence", history: "intelligence", investigation: "intelligence", nature: "intelligence", religion: "intelligence", animal_handling: "wisdom", insight: "wisdom", medicine: "wisdom", perception: "wisdom", survival: "wisdom", deception: "charisma", intimidation: "charisma", performance: "charisma", persuasion: "charisma"};
        var attrs_to_get = ["pb","pb_type","jack_of_all_trades","jack"];
        var update = {};
        var callbacks = [];

        if(skills_array.indexOf("perception") > -1) {
            callbacks.push( function() {update_passive_perception();} )
        };

        _.each(skills_array, function(s) {
            if(skill_parent[s] && attrs_to_get.indexOf(skill_parent[s]) === -1) {attrs_to_get.push(skill_parent[s] + "_mod")};
            attrs_to_get.push(s + "_prof");
            attrs_to_get.push(s + "_type");
            attrs_to_get.push(s + "_flat");
        });

        getSectionIDs("repeating_inventory", function(idarray) {
            _.each(idarray, function(currentID, i) {
                attrs_to_get.push("repeating_inventory_" + currentID + "_equipped");
                attrs_to_get.push("repeating_inventory_" + currentID + "_itemmodifiers");
            });

            getAttrs(attrs_to_get, function(v) {
                console.log("UPDATING SKILLS");
                _.each(skills_array, function(s) {
                    var attr_mod = v[skill_parent[s] + "_mod"] ? parseInt(v[skill_parent[s] + "_mod"], 10) : 0;
                    var prof = v[s + "_prof"] != 0 && !isNaN(v["pb"]) ? parseInt(v["pb"], 10) : 0;
                    var flat = v[s + "_flat"] && !isNaN(parseInt(v[s + "_flat"], 10)) ? parseInt(v[s + "_flat"], 10) : 0;
                    var type = v[s + "_type"] && !isNaN(parseInt(v[s + "_type"], 10)) ? parseInt(v[s + "_type"], 10) : 1;
                    var jack = v["jack_of_all_trades"] && v["jack_of_all_trades"] != 0 && v["jack"] ? v["jack"] : 0;
                    var item_bonus = 0;

                    _.each(idarray, function(currentID) {
                        if(v["repeating_inventory_" + currentID + "_equipped"] && v["repeating_inventory_" + currentID + "_equipped"] === "1" && v["repeating_inventory_" + currentID + "_itemmodifiers"] && (v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().replace(/ /g,"_").indexOf(s) > -1 || v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().indexOf("ability checks") > -1)) {
                            var mods = v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().split(",");
                            _.each(mods, function(mod) {
                                if(mod.replace(/ /g,"_").indexOf(s) > -1 || mod.indexOf("ability checks") > -1) {
                                    if(mod.indexOf("-") > -1) {
                                        var new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                                        item_bonus = new_mod ? item_bonus - new_mod : item_bonus;
                                    }
                                    else {
                                        var new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                                        item_bonus = new_mod ? item_bonus + new_mod : item_bonus;
                                    }
                                };
                            });
                        };
                    });

                    var total = attr_mod + flat + item_bonus;

                    if(v["pb_type"] && v["pb_type"] === "die") {
                        if(v[s + "_prof"] != 0) {
                            type === 1 ? "" : "2"
                            total = total + "+" + type + v["pb"];
                        }
                        else if(v[s + "_prof"] == 0 && jack != 0) {
                            total = total + "+" + jack;
                        };
                    }
                    else {
                        if(v[s + "_prof"] != 0) {
                            total = total + (prof * type);
                        }
                        else if(v[s + "_prof"] == 0 && jack != 0) {
                            total = total + parseInt(jack, 10);
                        };

                    };
                    update[s + "_bonus"] = total;
                });

                setAttrs(update, {silent: true}, function() {callbacks.forEach(function(callback) {callback(); })} );
            });
        });
    };

    var update_tool = function(tool_id) {
        //D&D 5e Mancer: Land Vehicles proficiency does not drop with Marine background (UC748)
        //Added a test to check for an undefined tool_id so to prevent similar errors.
        //By Miguel Peres
        if(typeof tool_id == "undefined") return;

        if(tool_id.substring(0,1) === "-" && tool_id.length === 20) {
            do_update_tool([tool_id]);
        }
        else if(tool_id === "all") {
            getSectionIDs("repeating_tool", function(idarray) {
                do_update_tool(idarray);
            });
        }
        else {
            getSectionIDs("repeating_tool", function(idarray) {
                var tool_attribs = [];
                _.each(idarray, function(id) {
                    tool_attribs.push("repeating_tool_" + id + "_toolattr_base");
                });
                getAttrs(tool_attribs, function(v) {
                    var attr_tool_ids = [];
                    _.each(idarray, function(id) {
                        if(v["repeating_tool_" + id + "_toolattr_base"] && v["repeating_tool_" + id + "_toolattr_base"].indexOf(tool_id) > -1) {
                            attr_tool_ids.push(id);
                        }
                    });
                    if(attr_tool_ids.length > 0) {
                        do_update_tool(attr_tool_ids);
                    }
                });
            });
        };
    };

    var do_update_tool = function(tool_array) {
        var tool_attribs = ["pb","pb_type","jack","strength_mod","dexterity_mod","constitution_mod","intelligence_mod","wisdom_mod","charisma_mod"];
        var update = {};
        _.each(tool_array, function(tool_id) {
            tool_attribs.push("repeating_tool_" + tool_id + "_toolbonus_base");
            tool_attribs.push("repeating_tool_" + tool_id + "_tool_mod");
            tool_attribs.push("repeating_tool_" + tool_id + "_toolattr_base");
        });

        getAttrs(tool_attribs, function(v) {
            _.each(tool_array, function(tool_id) {
                console.log("UPDATING TOOL: " + tool_id);
                var query = false;
                if(v["repeating_tool_" + tool_id + "_toolattr_base"] && v["repeating_tool_" + tool_id + "_toolattr_base"].substring(0,2) === "?{") {
                    update["repeating_tool_" + tool_id + "_toolattr"] = "QUERY";
                    var mod = "?{Attribute?|Strength,@{strength_mod}|Dexterity,@{dexterity_mod}|Constitution,@{constitution_mod}|Intelligence,@{intelligence_mod}|Wisdom,@{wisdom_mod}|Charisma,@{charisma_mod}}";
                    if(v["repeating_tool_" + tool_id + "_tool_mod"]) {
                        mod = mod + "+" + v["repeating_tool_" + tool_id + "_tool_mod"];
                    }
                    query = true;
                } else {
                    var attr = v["repeating_tool_" + tool_id + "_toolattr_base"].substring(0, v["repeating_tool_" + tool_id + "_toolattr_base"].length - 5).substr(2);
                    var attr_mod = v[attr + "_mod"] ? parseInt(v[attr + "_mod"], 10) : 0;
                    var tool_mod = v["repeating_tool_" + tool_id + "_tool_mod"] && !isNaN(parseInt(v["repeating_tool_" + tool_id + "_tool_mod"], 10)) ? parseInt(v["repeating_tool_" + tool_id + "_tool_mod"], 10) : 0;
                    var mod = attr_mod + tool_mod;
                    update["repeating_tool_" + tool_id + "_toolattr"] = attr.toUpperCase();
                    if(v["repeating_tool_" + tool_id + "_tool_mod"] && v["repeating_tool_" + tool_id + "_tool_mod"].indexOf("@{") > -1) {
                        update["repeating_tool_" + tool_id + "_toolbonus"] = update["repeating_tool_" + tool_id + "_toolbonus"] + "+" + v["repeating_tool_" + tool_id + "_tool_mod"];
                    }
                    if(!v["repeating_tool_" + tool_id + "_tool_mod"]) {
                        update["repeating_tool_" + tool_id + "_tool_mod"] = 0;
                    }
                };

                if(v["pb_type"] && v["pb_type"] === "die" ) {
                    if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb})") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + v.pb}
                    else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb}*2)") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+2" + v.pb}
                    else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(floor(@{pb}/2))") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + v.jack};
                }
                else if(v["repeating_tool_" + tool_id + "_toolattr_base"] && v["repeating_tool_" + tool_id + "_toolattr_base"].substring(0,2) === "?{") {
                    if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb})") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + parseInt(v.pb, 10)}
                    else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb}*2)") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + (parseInt(v.pb, 10)*2)}
                    else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(floor(@{pb}/2))") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + "+" + parseInt(v.jack, 10)};
                }
                else {
                    if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb})") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + parseInt(v.pb, 10)}
                    else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(@{pb}*2)") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + (parseInt(v.pb, 10)*2)}
                    else if(v["repeating_tool_" + tool_id + "_toolbonus_base"] === "(floor(@{pb}/2))") {update["repeating_tool_" + tool_id + "_toolbonus"] = mod + parseInt(v.jack, 10)};
                };

                if(query) {
                    update["repeating_tool_" + tool_id + "_toolbonus_display"] = "?";
                }
                else {
                    update["repeating_tool_" + tool_id + "_toolbonus_display"] = update["repeating_tool_" + tool_id + "_toolbonus"];
                };

            });

            setAttrs(update, {silent: true});
        });
    };

    var get_repeating_data = function(callback) {
        var getallrepeating = function(getobj, thiscallback, attrlist) {
            attrlist = attrlist || [];
            var thisget = getobj.pop();
            getSectionIDs(thisget.name, function(ids) {
                _.each(ids, function(sectionId) {
                    _.each(thisget.list, function(attr) {
                        attrlist.push("repeating_" + thisget.name + "_" + sectionId + "_" + attr);
                    });
                });
                if(getobj.length > 0) {
                    getallrepeating(getobj, thiscallback, attrlist);
                } else {
                    getAttrs(attrlist, function(vals) {
                        thiscallback(vals);
                    });
                };
            });
        };
        var getList = [
            {name: "proficiencies", list: ["name"]},
            {name: "tool", list: ["toolname", "toolattr_base"]},
            {name: "traits", list: ["name", "source", "source_type"]},
            {name: "resource", list: ["resource_left_name", "resource_right_name"]},
            {name: "spell-cantrip", list: ["spellname", "spellattackid", "spellsource", "spellattackid"]},
            {name: "savemod", list: ["global_save_name"]},
            {name: "tohitmod", list: ["global_attack_name"]},
            {name: "damagemod", list: ["global_damage_name"]},
            {name: "acmod", list: ["global_ac_name"]},
            {name: "skillmod", list: ["global_skill_name"]},
            {name: "attack", list: ["atkname", "spellid"]},
            {name: "hpmod", list: ["levels", "source", "mod"]}
        ];
        for(var x=1; x<=9; x++) {
            getList.push({ name: "spell-" + x, list: ["spellname", "spellattackid", "spellsource", "spellattackid"] });
        }
        var repeating = {prof_names: [], traits: []};
        _.each(getList, function(section) {
            if(!["proficiencies", "traits"].includes(section.name)) {
                repeating[section.name] = {};
            }
        });
        getallrepeating(getList, function(vals) {
            var traitstemp = {};
            _.each(vals, function(value, name) {
                if(name.split("_")[1] == "proficiencies") {
                    repeating.prof_names.push(value.toLowerCase());
                } else if(name.split("_")[1] == "tool") {
                    repeating.tool[name.split("_")[2]] = repeating.tool[name.split("_")[2]] || {};
                    let attr = _.last(name.split("_"));
                    repeating.tool[name.split("_")[2]][attr] = value.toLowerCase();
                    if(attr == "toolname") repeating.prof_names.push(value.toLowerCase());
                } else if (name.split("_")[1] == "traits") {
                    traitstemp[name.split("_")[2]] = traitstemp[name.split("_")[2]] ? traitstemp[name.split("_")[2]] : {};
                    traitstemp[name.split("_")[2]][_.last(name.split("_"))] = value;
                } else if (name.split("_")[1] == "resource") {
                    repeating.resource[name.split("_")[2]] = repeating.resource[name.split("_")[2]] || {};
                    repeating.resource[name.split("_")[2]][name.split("_")[4]] = value;
                } else if (name.split("_")[1] == "hpmod") {
                    repeating.hpmod[name.split("_")[2]] = repeating.hpmod[name.split("_")[2]] || {};
                    repeating.hpmod[name.split("_")[2]][name.split("_")[3]] = value;
                } else if (name.split("_")[1].split("-")[0] == "spell") {
                    repeating[name.split("_")[1]][name.split("_")[2]] = repeating[name.split("_")[1]][name.split("_")[2]] || {};
                    repeating[name.split("_")[1]][name.split("_")[2]][name.split("_")[3]] = value;
                } else if (name.split("_")[1] == "attack") {
                    repeating[name.split("_")[1]][name.split("_")[2]] = repeating[name.split("_")[1]][name.split("_")[2]] || {};
                    repeating[name.split("_")[1]][name.split("_")[2]][name.split("_")[3]] = value;
                } else {
                    repeating[name.split("_")[1]][name.split("_")[2]] = value;
                }
            });
            _.each(traitstemp, function(v, k) {
                var trait = _.clone(v);
                trait.id = k;
                repeating.traits.push(trait);
            });
            callback(repeating);
        });
    };

    var handle_drop = function(category, eventinfo) {

        getAttrs(["speed", "drop_name", "drop_data", "drop_content", "character_id", "npc_legendary_actions", "strength_mod", "dexterity_mod", "npc", "base_level", "strength_base", "dexterity_base", "constitution_base", "wisdom_base", "intelligence_base", "charisma_base", "class_resource_name", "other_resource_name", "multiclass1_lvl", "multiclass2_lvl", "multiclass3_lvl"], function(v) {
            var pagedata = {};
            try {
                pagedata = JSON.parse(v.drop_data);
            } catch(e) {
                pagedata = v.drop_data;
            }
            var page = {
                name: v.drop_name,
                data: pagedata,
                content: v.drop_content
            };
            var category = page.data["Category"];
            get_repeating_data(function(repeating) {
                var results = processDrop(page, v, repeating);
                setAttrs(results.update, {silent: true}, function() {results.callbacks.forEach(function(callback) {callback(); })} );
            });

        });

    };

    var processDrop = function(page, currentData, repeating, looped) {
        var jsonparse = function(data) {
            var result = {};
            try {
                result = JSON.parse(data);
            } catch(e) {
                result = data;
            }
            return result;
        };
        var modStringToAttrib = function(modString) {
            var finalAttrib = "";
            if (modString == "FIN") {
                if (parseInt(currentData.strength_base) > parseInt(currentData.dexterity_base)) {
                    finalAttrib = "@{strength_mod}";
                } else {
                    finalAttrib = "@{dexterity_mod}";
                }
            } else {
                switch(modString) {
                    case "STR":
                        finalAttrib = "@{strength_mod}";
                        break;
                    case "DEX":
                        finalAttrib = "@{dexterity_mod}";
                        break;
                    case "CON":
                        finalAttrib = "@{constitution_mod}";
                        break;
                    case "WIS":
                        finalAttrib = "@{wisdom_mod}";
                        break;
                    case "INT":
                        finalAttrib = "@{intelligence_mod}";
                        break;
                    case "CHA":
                        finalAttrib = "@{charisma_mod}";
                        break;
                }
            }
            return finalAttrib;
        };
        var numUses = function(uses_string) {
            uses_string = parseValues(uses_string);

            var terms = uses_string.split("+");
            var total = 0;
            _.each(terms, function(term) {
                total += parseInt(term);
            });
            return uses_string === "" || uses_string === "-" ? uses_string : total;
        };
        var parseValues = function(uses_string) {
            var attribs = ["strength", "dexterity", "constitution", "wisdom", "intelligence", "charisma"];
            uses_string = uses_string ? uses_string.toLowerCase() : "";
            _.each(attribs, function(attrib) {
                var attribMod = Math.floor((parseInt(currentData[attrib + "_base"]) - 10) / 2);
                if (attribMod < 0 || isNaN(attribMod)) attribMod = 0;
                uses_string = uses_string.replace(attrib, attribMod);
            });
            uses_string = uses_string.replace(/half_level/g, Math.floor(classlevel/2));
            return uses_string.replace(/level/g, classlevel);
        };//
        var category = page.data["Category"];
        var callbacks = [];
        var update = {};
        var id = generateRowID();
        var blobs = {};
        var classlevel = currentData.base_level ? parseInt(currentData.base_level) : 1;
        repeating.traits = repeating.traits ? repeating.traits : [];
        update["drop_category"] = "";
        update["drop_name"] = "";
        update["drop_data"] = "";
        update["drop_content"] = "";
        if(category === "Items") {
            console.log(`%c ITEM: ${page.name} dropped`, "color: purple; font-size: 14px;");
            if(currentData.npc === "0") {
                update["tab"] = "core";
                if(page.name) {update[`repeating_inventory_${id}_itemname`]               = page.name};
                if(page.data["itemcount"]) {update[`repeating_inventory_${id}_itemcount`] = page.data["itemcount"]};

                ["Properties", "Weight"].forEach((attr) => {
                    if (page.data[`${attr}`]) {
                        update[`repeating_inventory_${id}_item${attr.toLowerCase()}`] = page.data[`${attr}`]
                    };
                });

                if(page.content) {update[`repeating_inventory_${id}_itemcontent`] = page.content};
                if(!page.data["Item Type"] || page.data["Item Type"] == "") {page.data["Item Type"] = category};
                var mods = "Item Type: " + page.data["Item Type"];
                if(page.data["AC"] && page.data["AC"] != "") {
                    mods += ", AC: " + page.data["AC"];
                    if(!looped) {
                        callbacks.push(() => {update_ac();} )
                    }
                };

                ["Damage", "Damage Type", "Secondary Damage", "Secondary Damage Type", "Alternate Damage", "Alternate Damage Type", "Alternate Secondary Damage", "Alternate Secondary Damage Type", "Range"].forEach((attr) => {
                    if (page.data[`${attr}`] && page.data[`${attr}`] != "") {
                        mods += `, ${attr}: ${page.data[`${attr}`]}`
                    };
                });

                if(page.data["Modifiers"] && page.data["Modifiers"] != "") { mods += `, ${page.data["Modifiers"]}` };
                update[`repeating_inventory_${id}_itemmodifiers`] = mods;
                if(page.data["Item Type"].indexOf("Weapon") > -1) {
                    update[`repeating_inventory_${id}_hasattack`] = 1;
                    callbacks.push(() => {
                        (page.data["Alternate Damage"] && page.data["Alternate Damage"] !== "") ? create_attack_from_item(id, {versatile: true}) : create_attack_from_item(id);
                    });
                } else if(page.data["Item Type"].indexOf("Ammunition") > -1) {
                    update[`repeating_inventory_${id}_useasresource`] = 1;
                    callbacks.push(() => { create_resource_from_item(id); });
                };

                if(page.data["Modifiers"]) {
                    callbacks.push(() => { check_itemmodifiers(page.data["Modifiers"]); });
                };

                if(!looped) {
                    callbacks.push(() => { update_weight(); });
                }
            } else {
                if(page.data["Item Type"] && page.data["Item Type"].toLowerCase().includes("weapon")) {
                    const type       = (page.data["Item Type"]) ? page.data["Item Type"].toLowerCase().split(" ")[0] : " ";
                    const properties = (page.data["Properties"]) ? page.data["Properties"].toLowerCase() : undefined;

                    const make_npc_attack_from_item = (rowid, options) => {
                        update[`repeating_npcaction_${rowid}_npc_options-flag`] = "0";
                        update[`repeating_npcaction_${rowid}_attack_flag`]      = "on";
                        if(page.name) {
                            update[`repeating_npcaction_${rowid}_name`] = page.name;
                            if (options && options.versatile) {
                                update[`repeating_npcaction_${rowid}_name`] += " (" + (options.versatile === 1 ? "One-Handed" : "Two-Handed") + ")";
                            } else if (options && options.thrown) {
                                update[`repeating_npcaction_${rowid}_name`] += " (Thrown)";
                            };
                        };
                        if(page.content) { update[`repeating_npcaction_${rowid}_description`] = page.content; }

                        update[`repeating_npcaction_${rowid}_attack_display_flag`] = "{{attack=1}}";
                        update[`repeating_npcaction_${rowid}_attack_options`]      = "{{attack=1}}";
                        update[`repeating_npcaction_${rowid}_attack_type`]         = page.data["Item Type"];
                        update[`repeating_npcaction_${rowid}_attack_target`]       = "one target";


                        update[`repeating_npcaction_${rowid}_attack_range`] =
                            (page.data["Range"] && page.data["Range"] != "" && (!properties.includes("thrown") || (options && options.thrown))) ? page.data["Range"] :
                            (page.data["Properties"] && properties.includes("range")) ? "10 ft" :
                            "5 ft";

                        const weapon_attr_mod = (type.includes("ranged") || (properties && properties.includes("finesse") && currentData.dexterity_mod > currentData.strength_mod)) ? currentData.dexterity_mod : currentData.strength_mod;
                        update[`repeating_npcaction_${rowid}_attack_tohit`] = weapon_attr_mod;

                        const dmgArray = (options && options.versatile === 2) ?
                            ["Alternate Damage", "Alternate Damage Type", "Alternate Secondary Damage", "Alternate Secondary Damage Type"] :
                            ["Damage", "Damage Type", "Secondary Damage", "Secondary Damage Type"];

                        dmgArray.forEach((attr) => {
                            if (page.data[`${attr}`]) {
                                // _attack_damage adds the weapon mod
                                const ending = (dmgArray.indexOf(`${attr}`) === 0) ? `+${weapon_attr_mod}` : "";
                                //Remove Alternate for the attribute name. Then check for Secondary and remote it while adding 2.
                                let attrEdit = (attr.includes("Alternate") && attr.includes("Secondary")) ? attr.slice(20) + "2" : (attr.includes("Alternate") || attr.includes("Secondary")) ? attr.slice(10) : attr;
                                //Lower case everything and remove spaces
                                let name = attrEdit.toLowerCase().replace(" ", "");
                                //Set all the necessary attack attributes
                                update[`repeating_npcaction_${rowid}_attack_${name}`] = page.data[`${attr}`] + [`${ending}`];
                            };
                        });

                        if(page.data["Modifiers"]) {
                            if(type === "melee" || type === "ranged") {
                                //+1 Weapons should be in the format of "Melee Attacks +1, Melee Damage +1"
                                const split = (page.data["Modifiers"].includes(",")) ? page.data["Modifiers"].split(", ") : page.data["Modifiers"];
                                split.forEach((attr) => {
                                    const name = attr.toLowerCase();
                                    if (name.includes("attacks")) {
                                        update[`repeating_npcaction_${rowid}_attack_tohit`] = +update[`repeating_npcaction_${rowid}_attack_tohit`] + name.split("attacks ")[1];
                                    } else if (name.includes("damage")) {
                                        update[`repeating_npcaction_${rowid}_attack_damage`] += name.split("damage ")[1];
                                    } else {
                                        console.log(`%c ${page.name} modifiers format did not include damage or attacks`, "color:orange;");
                                    };
                                });
                            };
                        };
                    };

                    const versatile = (properties && properties.includes("versatile")) ? 1 : undefined;
                    make_npc_attack_from_item(id, {versatile: versatile});

                    if (properties && properties.includes("thrown")) {
                       make_npc_attack_from_item(generateRowID(), {thrown: true});
                    }
                    if (versatile && page.data["Alternate Damage"]) {
                        make_npc_attack_from_item(generateRowID(), {versatile: 2})
                    }

                    if (page.data["Modifiers"]) {
                        callbacks.push(() => { check_itemmodifiers(page.data["Modifiers"]);  }, () => { update_npc_action("all"); });
                    } else {
                        callbacks.push(() => { update_npc_action("all"); });
                    };
                }
            }
        };
        if(category === "Spells") {
            console.log(`%c SPELL: ${page.name} dropped`, "color: purple; font-weight:14px;");
            let existing = {};
            var lvl = page.data["Level"] && page.data["Level"] > 0 ? page.data["Level"] : "cantrip";
            if (repeating[`spell-${lvl}`]) {
                _.each(repeating[`spell-${lvl}`], (spell, spellid) => {
                    if (spell.spellname.toLowerCase() === page.name.toLowerCase()) {
                        id       = spellid;
                        existing = spell;
                    };
                });
            }

            update[`repeating_spell-${lvl}_${id}_spelllevel`] = lvl;
            update[`repeating_spell-${lvl}_${id}_spell_ability`] = (page.data["spellcasting_ability"]) ? `@{${page.data["spellcasting_ability"].toLowerCase()}_mod}+` : "spell";
            (page.name) ? update[`repeating_spell-${lvl}_${id}_spellname`] = page.name : false;

            ["spellclass", "spellsource", "data-description"].forEach((attr) => {
                const suffix = (attr.includes("description")) ? "spelldescription" : attr;
                (page.data[`${attr}`]) ? update[`repeating_spell-${lvl}_${id}_${suffix}`] = page.data[`${attr}`] : false;
            });

           ["Add Casting Modifier", "Casting Time", "Concentration", "Damage Type", "Damage", "Duration", "Healing", "Material", "Range", "Ritual", "Save", "Save Success", "School", "Secondary Damage", "Secondary Damage Type", "Target"].forEach((attr) => {
                if(page.data[`${attr}`]) {
                    //Adjust the array entry to match the attribute name in the HTML
                    const name           = (attr === "Add Casting Modifier") ? "dmgmod" : (attr === "Material") ? `comp_materials` : (attr.includes("Secondary Damage")) ? attr.split("Secondary ")[0] + "2" : attr;
                    const spellattribute = name.toLowerCase().replace(" ", "");
                    //Concentration, Ritual, and School are exceptions to norm
                    const updateValue = (attr === "Concentration" || attr === "Ritual") ? `{{${spellattribute}=1}}` : (attr === "School") ? page.data["School"].toLowerCase() : page.data[`${attr}`];
                    update[`repeating_spell-${lvl}_${id}_spell${spellattribute}`] = updateValue;
                };
            });

           ["Higher Spell Slot Bonus", "Higher Spell Slot Desc", "Higher Spell Slot Dice", "Higher Spell Slot Die"].forEach((attr) => {
                if (page.data[`${attr}`]) {
                    const spellattribute = (attr.includes("Bonus")) ? "hlbonus" : (attr.includes("Desc")) ? "athigherlevels" : (attr.includes("Dice")) ? "hldie" : "hldietype";
                    update[`repeating_spell-${lvl}_${id}_spell${spellattribute}`] = page.data[`${attr}`];
                };
            });

            if(page.data["Components"]) {
                ["v", "s", "m"].forEach((comp) => {
                    if(page.data["Components"].toLowerCase().indexOf(comp) === -1) {update[`repeating_spell-${lvl}_${id}_spellcomp_${comp}`] = "0"};
                });
            };

            if (page.data["Spell Attack"]) {
                update[`repeating_spell-${lvl}_${id}_spellattack`] = page.data[`Spell Attack`];
            };

            if(page.data["Damage"] || page.data["Healing"]) {
                update["repeating_spell-" + lvl + "_" + id + "_spelloutput"] = "ATTACK";
                if(!existing.spellattackid) callbacks.push( function() {create_attack_from_spell(lvl, id, currentData.character_id);});
            }
            else if(page.data["Higher Spell Slot Desc"] && page.data["Higher Spell Slot Desc"] != "") {
                var spelllevel = "?{Cast at what level?";
                for(i = 0; i < 10-lvl; i++) {
                    spelllevel = spelllevel + "|Level " + (parseInt(i, 10) + parseInt(lvl, 10)) + "," + (parseInt(i, 10) + parseInt(lvl, 10));
                };
                spelllevel = spelllevel + "}";
                update[`repeating_spell-${lvl}_${id}_rollcontent`] = `@{wtype}&{template:spell} {{level=@{spellschool} ${spelllevel}}} {{name=@{spellname}}} {{castingtime=@{spellcastingtime}}} {{range=@{spellrange}}} {{target=@{spelltarget}}} @{spellcomp_v} @{spellcomp_s} @{spellcomp_m} {{material=@{spellcomp_materials}}} {{duration=@{spellduration}}} {{description=@{spelldescription}}} {{athigherlevels=@{spellathigherlevels}}} @{spellritual} {{innate=@{innate}}} @{spellconcentration} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
            };

            if(page.data["data-Cantrip Scaling"] && lvl == "cantrip") {update[`repeating_spell-${lvl}_${id}_spell_damage_progression`] = "Cantrip " + page.data["data-Cantrip Scaling"].charAt(0).toUpperCase() + page.data["data-Cantrip Scaling"].slice(1);};
            update[`repeating_spell-${lvl}_${id}_options-flag`] = "0";
        };
        if(category === "Monsters") {
            console.log(`%c MONSTERS: ${page.name} dropped`, "color: purple; font-weight:14px;");
            update["npc"] = "1";
            update["npc_options-flag"] = "0";
            update["licensedsheet"] = "1";
            if(page.name && page.name != "") {update["npc_name"] = page.name};

            //ABILITY SCORES
            const npcAbilites = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
            npcAbilites.forEach((ability) => {
                const abbreviation = ability.slice(0, 3).toUpperCase();
                update[`${ability}_base`] = (page.data[`${abbreviation}`]) ? page.data[`${abbreviation}`] : "";
                callbacks.push(() => {
                    update_attr(`${ability}`);
                });
            });

            const npcExtras = ["Condition Immunities", "Immunities", "Languages", "Resistances", "Speed", "Token Size", "Vulnerabilities"];
            npcExtras.forEach((attr) => {
                //console.log(`%c MONSTERS Drop: ${attr}`, "color:cornflowerblue;");
                const prefixExtra = (attr === "Token Size") ? "" : "npc_";
                let nameExtra     = (attr.includes(" ")) ? attr.replace(" ", "_").toLowerCase() : attr.toLowerCase();
                update[`${prefixExtra}${nameExtra}`] = (page.data[`${attr}`]) ? page.data[`${attr}`] : "";
            });

            //CHALLENGE RATING
            if(page.data["Challenge Rating"] && page.data["Challenge Rating"] != "") {
                callbacks.push( function() {update_challenge();} );
                update["npc_challenge"] = page.data["Challenge Rating"];
            } else {
                update["npc_challenge"] = "";
            };

            //XP
            if(page.data["data-XP"]) { update["npc_xp"] = page.data["data-XP"].toString().replace(",","");  };

            //SIZE, TYPE, ALIGNMENT
            var type = "";
            if(page.data["Size"]) {      type = page.data["Size"] };
            if(page.data["Type"]) {      type = (type.length > 0) ? type + " " + page.data["Type"].toLowerCase() : page.data["Type"].toLowerCase(); };
            if(page.data["Alignment"]) { type = (type.length > 0) ? type + ", " + page.data["Alignment"] : page.data["Alignment"]; };
            update["npc_type"] = type;

            ["AC", "HP"].forEach((achp) => {
                //console.log(`%c MONSTERS Drop: AC & HP ${achp}`, "color:cornflowerblue;");
                const array = (achp === "AC") ? ["npc_ac", "npc_actype"] : ["hp_max", "npc_hpformula"];
                if (page.data[`${achp}`] && page.data[`${achp}`].toString().indexOf("(") > -1)  {
                    update[`${array[0]}`] = page.data[`${achp}`].toString().split(" (")[0];
                    update[`${array[1]}`] = page.data[`${achp}`].toString().split(" (")[1].slice(0, -1);
                } else {
                    update[`${array[0]}`] = (page.data[`${achp}`]) ? page.data[`${achp}`] : "";
                    update[`${array[1]}`] = "";
                };
            });

            var senses = page.data["Senses"] ? page.data["Senses"] : "";
            if(page.data["Passive Perception"]) {
                senses = (senses.length > 0) ? senses + ", passive Perception " + page.data["Passive Perception"] : "passive Perception " + page.data["Passive Perception"];
            }
            update["npc_senses"] = senses;

            //SAVES & SKILLS
            const npcSavesSkills = ["str_save", "dex_save", "con_save", "int_save", "wis_save", "cha_save",'acrobatics','animal_handling','arcana','athletics','deception','history','insight','intimidation','investigation','medicine','nature','perception','performance','persuasion','religion','sleight_of_hand','stealth','survival'];
            npcSavesSkills.forEach((attr) => {
                update[`npc_${attr}_base`] = "";
            });
            ["Saving Throws", "Skills"].forEach((attr) => {
                //console.log(`%c MONSTERS Drop: Saving Throws & Skills: ${attr}`, "color:cornflowerblue;");
                const array = (page.data[`${attr}`]) ? page.data[`${attr}`].split(", ") : [];
                _.each(array, (entry) => {
                    const kv        = (entry.indexOf("-") > -1) ? entry.split(" ") : entry.split(" +");
                    const attribute = (attr === "Saving Throws") ? kv[0].toLowerCase() + "_save" : kv[0].toLowerCase().split(' ').join('_');
                    update[`npc_${attribute}_base`] = parseInt(kv[1], 10);
                });
                (attr === "Saving Throws") ? callbacks.push(() => {update_npc_saves();} ) : callbacks.push(() => {update_npc_skills();} );
            });

            const npcRepeating = ['npcaction-l', 'npcreaction', 'npcaction', 'npctrait'];
            _.each(npcRepeating, (section) => {
                getSectionIDs(`repeating_${section}`, (idarray) => {
                    _.each(idarray, (currentID, i) => {
                        removeRepeatingRow(`repeating_${section}_${currentID}`);
                    });
                });
            });
            // ACTIONS, LEGENDARY ACTIONS, REACTIONS, TRAITS
            var contentarray = page.content;
            if (page.data["data-Legendary Actions"]) {
                const actionCount = (page.data["data-LANum"]) ? page.data["data-LANum"] : 3;
                update["npc_legendary_actions"] = (page.data["data-LANum"]) ? page.data["data-LANum"] : 3;
                if (page.data["Legendary Actions Desc"]) {
                    update["npc_legendary_actions_desc"] = page.data["Legendary Actions Desc"];
                } else {
                    update["npc_legendary_actions_desc"] = `The ${page.name} can take ${actionCount}, choosing from the options below. Only one legendary option can be used at a time and only at the end of another creature's turn. The ${page.name} regains spent legendary actions at the start of its turn.`;
                };
            };
            // ACTIONS & LEGENDARY ACTIONS
            ["Actions", "Legendary Actions"].forEach((attr) => {
                if (page.data[`data-${attr}`]) {
                    const npcaction = (attr === "Actions") ? "npcaction" : "npcaction-l";
                    let actionsobj = {};
                    jsonparse(page.data[`data-${attr}`]).forEach((val) => { actionsobj[val.Name] = val; });
                    _.each(actionsobj, (action, name) => {
                        newrowid = generateRowID();
                        update[`repeating_${npcaction}_${newrowid}_npc_options-flag`] = "0";
                        update[`repeating_${npcaction}_${newrowid}_name`]             = name;
                        (action["Desc"]) ? update[`repeating_${npcaction}_${newrowid}_description`] = action["Desc"] : false;
                        if(action["Type Attack"]) {
                            update[`repeating_${npcaction}_${newrowid}_attack_display_flag`] = "{{attack=1}}";
                            update[`repeating_${npcaction}_${newrowid}_attack_flag`]         = "on";
                            update[`repeating_${npcaction}_${newrowid}_attack_options`]      = "{{attack=1}}";

                            ["Damage Type", "Damage", "Hit Bonus", "Reach", "Target", "Type"].forEach((attr) => {
                                if(action[`${attr}`]) {
                                    const attributeName = (attr === "Hit Bonus") ? "tohit" : (attr === "Reach") ? "range" : attr.toLowerCase().replace(" ", "");
                                    update[`repeating_${npcaction}_${newrowid}_attack_${attributeName}`] = action[`${attr}`];
                                };
                            });

                            if(action["Damage 2"] && action["Damage 2 Type"]) {
                                update[`repeating_${npcaction}_${newrowid}_attack_damage2`]     = action["Damage 2"];
                                update[`repeating_${npcaction}_${newrowid}_attack_damagetype2`] = action["Damage 2 Type"];
                            }
                        }
                    });
                    (attr === "Actions") ? callbacks.push(() => {update_npc_action("all");} ) : false;
                } else if(contentarray && contentarray.indexOf(`${attr}`) > -1) {
                    console.log(`%c ${attr} was not found for ${page.name}`, "color: orange;");
                };
            });
            //REACTIONS
            if (page.data["data-Reactions"]) {
                update["npcreactionsflag"] = 1;
                let reactionsobj = {};
               jsonparse(page.data["data-Reactions"]).forEach((val) => { reactionsobj[val.Name] = val.Desc; });
                _.each(reactionsobj, (desc, name) => {
                    newrowid = generateRowID();
                    update[`repeating_npcreaction_${newrowid}_name`] = name + ".";
                    if(desc.substring(0,2) === ": " || encodeURI(desc.substring(0,2)) === ":%C2%A0") {
                        desc = desc.substring(2);
                    };
                    update[`repeating_npcreaction_${newrowid}_desc`] = desc.trim();
                });
            } else if(contentarray && contentarray.indexOf("Reactions") > -1) {
                console.log(`%c Reactions was not found for ${page.name}`, "color: orange;");
            };
            //TRAITS
            if (page.data["data-Traits"]) {
                //console.log(`%c MONSTERS Drop: NPC Traits`, "color:cornflowerblue;");
                let traitsobj     = {};
                jsonparse(page.data["data-Traits"]).forEach((val) => {
                    traitsobj[val.Name] = (val.Name && val.Desc) ? val.Desc : "";
                    if (val.Name && val.Desc) {
                        traitsobj[val.Name] = val.Desc;
                    } else if (val.Name) {
                        traitsobj[val.Name] = "";
                    } else {
                        console.log(`%c Traits JSON is lacking a Name key`, "color: orange;")
                    };
                });
                _.each(traitsobj, (desc, name) => {
                    newrowid = generateRowID();
                    update[`repeating_npctrait_${newrowid}_name`] = name + ".";
                    if(desc.substring(0,2) === ": " || encodeURI(desc.substring(0,2)) === ":%C2%A0") {
                        desc = desc.substring(2);
                    }
                    update[`repeating_npctrait_${newrowid}_desc`] = desc.trim();
                    // SPELLCASTING NPCS
                    if(name === "Spellcasting") {
                        var lvl = parseInt(desc.substring(desc.indexOf("-level")-4, desc.indexOf("-level")-2).trim(), 10);
                        lvl = !isNaN(lvl) ? lvl : 1;
                        var ability = desc.match(/casting ability is (.*?) /);
                            ability = ability && ability.length > 1 ? ability[1] : false;
                            ability = ability ? "@{" + ability.toLowerCase() + "_mod}+" : "0*";
                        update["base_level"]           = lvl;
                        update["caster_level"]         = lvl;
                        update["class"]                = "Wizard";
                        update["level"]                = lvl;
                        update["npcspellcastingflag"]  = 1;
                        update["spellcasting_ability"] = ability;
                        callbacks.push(() => {update_pb();} );
                        callbacks.push(() => {update_spell_slots();} );
                    }
                    //Githzerai in MToF have (Psionics)
                    if (name.includes("Innate Spellcasting")) {
                        const ability = (page.data["Spellcasting Ability"]) ? `@{${page.data["Spellcasting Ability"].toLowerCase()}_mod}+` : "0*";
                        update["npcspellcastingflag"]  = 1;
                        update["spellcasting_ability"] = ability;
                    };
                });
            } else if(contentarray && contentarray.indexOf("Traits") > -1) {
                console.log(`%c Traits was not found for ${page.name}`, "color: orange;");
            };
            //Spells
            if (page.data["data-Spells"]) {
                let spellsobj = [];
                //Put together a list of spells to get from the Comepndium
                ["spells", "innate"].forEach((type) => {
                    let spellList = jsonparse(page.data["data-Spells"])[`${type}`];
                    if (spellList) {
                        Object.keys(spellList).map((objectKey, index) => {
                            spellList[objectKey].forEach((spell) => {
                                spellsobj.push(spell);
                            });
                        });
                    };
                });
                getCompendiumPage(spellsobj, (compendiumPages) => {
                    compendiumPages = removeDuplicatedPageData(compendiumPages);
                    const spellData = (compendiumPages.length === undefined || compendiumPages.length === 1) ? [compendiumPages] : compendiumPages;
                    const innate = (jsonparse(page.data["data-Spells"])[`innate`]) ? jsonparse(page.data["data-Spells"])[`innate`] : false;
                    let existing = {};
                    let update   = [], callbacks = [];

                   spellData.forEach((page) => {
                        const spell        = page.data;
                        const lvl          = spell["Level"] && spell["Level"] > 0 ? spell["Level"] : "cantrip";
                        const newrowid     = generateRowID();
                        const repeatingRow = `repeating_spell-${lvl}_${newrowid}`;

                        update[`${repeatingRow}_spelllevel`]               = lvl;
                        update[`${repeatingRow}_spell_ability`]            = (update["spellcasting_ability"]) ? update["spellcasting_ability"] : "spell";
                        (spell.Name) ? update[`${repeatingRow}_spellname`] = spell.Name : console.log(`%c ${JSON.stringify(page.name)} is incorrect. Update compendium data.`, "color: orange;");
                        update[`${repeatingRow}_spelloutput`]              = (page.data["Damage"] || page.data["Healing"]) ? "ATTACK" : "SPELLCARD";

                        ["spellclass", "spellsource", "data-description"].forEach((attr) => {
                            const suffix = (attr.includes("description")) ? "spelldescription" : attr;
                            (spell[`${attr}`]) ? update[`${repeatingRow}_${suffix}`] = spell[`${attr}`] : false;
                        });

                        ["Add Casting Modifier", "Casting Time", "Concentration", "Damage Type", "Damage", "Duration", "Healing", "Material", "Range", "Ritual", "Save", "Save Success", "School", "Secondary Damage", "Secondary Damage Type", "Spell Attack", "Target"].forEach((attr) => {
                            if (spell[`${attr}`]) {
                                //Adjust the array entry to match the attribute name in the HTML
                                const name =
                                    (attr === "Add Casting Modifier") ? "dmgmod" :
                                    (attr === "Material") ? `comp_materials` :
                                    (attr === "Spell Attack") ? `attack` :
                                    (attr.includes("Secondary Damage")) ? attr.split("Secondary ")[0] + "2" :
                                    attr;
                                const spellattribute = name.toLowerCase().replace(" ", "");
                                //Concentration, Ritual, and School are exceptions to norm
                                const updateValue =
                                    (attr === "Concentration" || attr === "Ritual") ? `{{${spellattribute}=1}}` :
                                    (attr === "School") ? spell["School"].toLowerCase() :
                                    spell[`${attr}`];
                                update[`${repeatingRow}_spell${spellattribute}`] = updateValue;
                            };
                        });

                       ["Higher Spell Slot Bonus", "Higher Spell Slot Desc", "Higher Spell Slot Dice", "Higher Spell Slot Die"].forEach((attr) => {
                            if (spell[`${attr}`]) {
                                const spellattribute = (attr.includes("Bonus")) ? "hlbonus" : (attr.includes("Desc")) ? "athigherlevels" : (attr.includes("Dice")) ? "hldie" : "hldietype";
                                update[`${repeatingRow}_spell${spellattribute}`] = spell[`${attr}`];
                            };
                        });

                        if (spell["Components"]) {
                            ["v", "s", "m"].forEach((comp) => {
                                if (spell["Components"].toLowerCase().indexOf(comp) === -1) {update[`${repeatingRow}_spellcomp_${comp}`] = "0"};
                            });
                        };

                        if(page.data["Damage"] || page.data["Healing"]) {
                            //This needs to run the create_attack_from_spell
                            callbacks.push(() => { create_attack_from_spell(lvl, newrowid, currentData.character_id); });
                        } else if (page.data["Higher Spell Slot Desc"] && page.data["Higher Spell Slot Desc"] != "") {
                            //This needs to run the update_spelloutput
                        };

                        if (spell["data-Cantrip Scaling"] && lvl == "cantrip") {
                            update[`${repeatingRow}_spell_damage_progression`] = "Cantrip " + spell["data-Cantrip Scaling"].charAt(0).toUpperCase() + spell["data-Cantrip Scaling"].slice(1);
                        };

                        if (innate) {
                            const spellName = (spell.Name).toLowerCase();
                            //Search each keys in INNATE to see if spell name === one of the Values
                            Object.keys(innate).map((objectKey, index) => {
                                innate[objectKey].forEach((spell) => {
                                    (spell === spellName) ? update[`${repeatingRow}_innate`] = objectKey : false;
                                });
                            });
                        };

                        update[`${repeatingRow}_options-flag`] = "0";
                    });

                    setAttrs(update, {silent: true}, () => {
                        callbacks.forEach((callback) => {
                            callback();
                        })
                    });

                    return {
                        callbacks: callbacks
                    };
                });
            };
        };
        if(category === "Feats") {
            update["tab"] = "core";
            var match = {name: page.name};
            var existing = _.findWhere(repeating.traits, match);
            var newrowid = generateRowID();
            if(existing) {
                newrowid        = existing.id;
                existing.name   = page.name;
                existing.source = "Feat";
                existing.type   = page.data["Properties"] ? page.data["Properties"] : "";
            } else {
                var newtrait    = {};
                newtrait.id     = newrowid;
                newtrait.name   = page.name;
                newtrait.source = "Feat";
                newtrait.type   = page.data["Properties"] ? page.data["Properties"] : "";
                repeating.traits.push(newtrait);
            }
            if(page.name) {update[`repeating_traits_${newrowid}_name`]           = page.name};
            if(page.content) {update[`repeating_traits_${newrowid}_description`] = page.content};
            update[`repeating_traits_${newrowid}_source`]       = "Feat";
            update[`repeating_traits_${newrowid}_source_type`]  = page.data["Properties"] ? page.data["Properties"] : "";
            update[`repeating_traits_${newrowid}_options-flag`] = "0";
            update[`repeating_traits_${newrowid}_display_flag`] = "on";
        };
        if(category === "Proficiencies") {
            var newrowid = generateRowID();
            var type = page.data["Type"] || "";
            if (type.toLowerCase() === "language" || type.toLowerCase() === "armor" || type.toLowerCase() === "weapon" || type.toLowerCase() === "other") {
                if( repeating.prof_names.indexOf(page.name.toLowerCase()) == -1 ) {
                    update[`repeating_proficiencies_${newrowid}_prof_type`]    = type.replace("custom", "").toUpperCase();
                    update[`repeating_proficiencies_${newrowid}_name`]         = page.name;
                    update[`repeating_proficiencies_${newrowid}_options-flag`] = 0;
                    repeating.prof_names.push(page.name.toLowerCase());
                };
            } else if(type.toLowerCase() === "tool" || type.toLowerCase() === "skillcustom") {
                let existing = {};
                _.each(repeating.tool, (tool, id) => {
                    if(tool.toolname == page.name.toLowerCase()) {
                        newrowid = id;
                        existing = tool;
                    }
                });
                if(!existing.toolname) repeating.tool[newrowid] = {toolname: page.name.toLowerCase()}
                update[`repeating_tool_${newrowid}_toolname`] = page.name;
                if(!existing.base) update[`repeating_tool_${newrowid}_toolattr_base`] = "?{Attribute?|Strength,@{strength_mod}|Dexterity,@{dexterity_mod}|Constitution,@{constitution_mod}|Intelligence,@{intelligence_mod}|Wisdom,@{wisdom_mod}|Charisma,@{charisma_mod}}";
                update[`repeating_tool_${newrowid}_options-flag`] = 0;
                if(page.data["toolbonus_base"]) update[`repeating_tool_${newrowid}_toolbonus_base`] = "(@{pb}*2)";
                repeating.prof_names.push(page.name.toLowerCase());
                callbacks.push( function() {update_tool(newrowid);} );
            }
            if(type.toLowerCase() === "skill") {
                var skill_string = page.name.toLowerCase().replace(/ /g, '_');
                update[`${skill_string}_prof`] = `(@{pb}*@{${skill_string}_type})`;
            };
        };
        if(category === "Classes") {
            update["tab"] = "core";
            if(page.data.multiclass) {
                if(page.name && page.name !== "") { update[page.data.multiclass] = page.name; }
                update[page.data.multiclass + "_flag"] = "1";
                classlevel = parseInt(currentData[page.data.multiclass + "_lvl"]);
            } else {
                if(page.name && page.name !== "") { update["class"] = page.name; }
                if(page.data["Hit Die"] && page.data["Hit Die"] !== "") {
                    update["base_level"]   = currentData.base_level ? currentData.base_level : "1";
                    update["hit_dice_max"] = update["base_level"] + page.data["Hit Die"];
                    update["hit_dice"]     = update["base_level"];
                }
                if(page.data["Spellcasting Ability"] && page.data["Spellcasting Ability"] !== "") {
                    update["spellcasting_ability"] = "@{" + page.data["Spellcasting Ability"].toLowerCase() + "_mod}+";
                }
            }
            if(page.data["data-Saving Throws"] && !page.data.multiclass) {
                var saves = jsonparse(page.data["data-Saving Throws"]);
                _.each(saves, function(value) {
                    update[value.toLowerCase() + "_save_prof"] = "(@{pb})";
                });
            }

            if(!looped) {
                callbacks.push(update_class);
            }
        };
        if(category === "Subclasses") {
            if(page.data.multiclass) {
                if(page.name && page.name !== "") { update[page.data.multiclass + "_subclass"] = page.name; }
                classlevel = parseInt(currentData[page.data.multiclass + "_lvl"]);
            } else {
                if(page.name && page.name !== "") { update["subclass"] = page.name; };
            }
            if(page.data["Spellcasting Ability"]) {
                if(page.data.Class == "Fighter") {
                    update["arcane_fighter"] = "1";
                } else if(page.data.Class == "Rogue") {
                    update["arcane_rogue"] = "1";
                }
            }
            if(!looped) {
                callbacks.push(update_class);
            };
        };
        if(category === "Races" || category === "Subraces") {
            update["tab"] = "core";
            if(category === "Races") {
                update["race"] = page.name;
                if (page.name == "Halfling") {
                    update["halflingluck_flag"] = "1";
                }
            }
            else {
                update["subrace"] = page.name;
            };
            if(page.data["Speed"]) {update["speed"] = page.data["Speed"]};
            if(page.data["Size"]) {update["size"] = page.data["Size"]};
            if(!looped) {
                callbacks.push(update_race_display);
            }
        };
        if(category === "Backgrounds") {
            update["tab"] = "core";
            if(page.name && page.name !== "") { update["background"] = page.name; };
        };

        if(page.data.theseblobs) {
            _.each(page.data.theseblobs, function(blobname) {
                if(page.data.blobs[blobname]) blobs[blobname] = page.data.blobs[blobname];
            });
        } else {
            blobs = filterBlobs(page.data.blobs, {"Level": "1"});
        }
        _.each(blobs, function(blob, blobname) {
            if(blob["Traits"]) {
                var traitsource = "";
                switch (category) {
                    case "Races":
                    case "Subraces":
                        traitsource = "Racial";
                        break;
                    case "Classes":
                    case "Subclasses":
                        traitsource = "Class";
                        break;
                    default:
                        traitsource = "Background";
                }
                var trait_array = jsonparse(blob["Traits"]);
                if(trait_array && trait_array.length) {
                    _.each(trait_array, function(trait) {
                        if(!trait.Input) {
                            var match = {name: trait["Name"], type: page.name};
                            if(trait["Replace"]) {
                                match = {name: trait["Replace"]};
                            }
                            var existing = _.findWhere(repeating.traits, match);
                            if(existing) {
                                newrowid = existing.id;
                                existing.name = trait["Name"];
                                existing.source = traitsource;
                                existing.type = page.name;
                            } else {
                                var newtrait = {};
                                newrowid = generateRowID();
                                newtrait.id = newrowid;
                                newtrait.name = trait["Name"];
                                newtrait.source = traitsource;
                                newtrait.type = page.name;
                                repeating.traits.push(newtrait);
                            }
                            update["repeating_traits_" + newrowid + "_name"] = trait["Name"].replace(/{{Input}}/g, "");
                            update["repeating_traits_" + newrowid + "_description"] = trait["Desc"] ? trait["Desc"].replace(/{{Input}}/g, "") : "";
                            update["repeating_traits_" + newrowid + "_source"] = removeExpansionInfo(traitsource);
                            update["repeating_traits_" + newrowid + "_source_type"] = page.name ?  removeExpansionInfo(page.name) : "";
                            update["repeating_traits_" + newrowid + "_options-flag"] = 0;
                            update["repeating_traits_" + newrowid + "_display_flag"] = "on";
                        }
                    });
                };
            };
            if(blob["Language Proficiency"] || blob["Weapon Proficiency"] || blob["Armor Proficiency"] || blob["Tool Proficiency"]) {
                if(blob["Language Proficiency"]) {
                    var lang_array = jsonparse(blob["Language Proficiency"]);
                    if(lang_array["Proficiencies"] && lang_array["Proficiencies"].length) {
                        _.each(lang_array["Proficiencies"], function(prof) {
                            if( repeating.prof_names.indexOf(prof.toLowerCase()) == -1 ) {
                                newrowid = generateRowID();
                                update["repeating_proficiencies_" + newrowid + "_prof_type"] = "LANGUAGE";
                                update["repeating_proficiencies_" + newrowid + "_name"] = prof;
                                update["repeating_proficiencies_" + newrowid + "_options-flag"] = 0;
                                repeating.prof_names.push(prof.toLowerCase());
                            }
                        });
                    }
                };
                if(blob["Weapon Proficiency"]) {
                    var weap_array = jsonparse(blob["Weapon Proficiency"]);
                    if(weap_array["Proficiencies"] && weap_array["Proficiencies"].length) {
                        _.each(weap_array["Proficiencies"], function(prof) {
                            if( repeating.prof_names.indexOf(prof.toLowerCase()) == -1 ) {
                                newrowid = generateRowID();
                                update["repeating_proficiencies_" + newrowid + "_prof_type"] = "WEAPON";
                                update["repeating_proficiencies_" + newrowid + "_name"] = prof;
                                update["repeating_proficiencies_" + newrowid + "_options-flag"] = 0;
                                repeating.prof_names.push(prof.toLowerCase());
                            }
                        });
                    }
                };
                if(blob["Armor Proficiency"]) {
                    var armor_array = jsonparse(blob["Armor Proficiency"]);
                    if(armor_array["Proficiencies"] && armor_array["Proficiencies"].length) {
                        _.each(armor_array["Proficiencies"], function(prof) {
                            if( repeating.prof_names.indexOf(prof.toLowerCase()) == -1 ) {
                                newrowid = generateRowID();
                                update["repeating_proficiencies_" + newrowid + "_prof_type"] = "ARMOR";
                                update["repeating_proficiencies_" + newrowid + "_name"] = prof;
                                update["repeating_proficiencies_" + newrowid + "_options-flag"] = 0;
                                repeating.prof_names.push(prof.toLowerCase());
                            }
                        });
                    }
                };
                if(blob["Tool Proficiency"]) {
                    var tool_array = jsonparse(blob["Tool Proficiency"]);
                    if(tool_array["Proficiencies"] && tool_array["Proficiencies"].length) {
                        _.each(tool_array["Proficiencies"], function(prof) {
                            //D&D 5e Mancer: Land Vehicles proficiency does not drop with Marine background (UC748)
                            //Generating ID that was coming empty for not existing rows.
                            //By Miguel Peres
                            let newrowid = generateRowID();

                            let existing = {};
                            _.each(repeating.tool, function(tool, id) {
                                if(tool.toolname == prof.toLowerCase()) {
                                    newrowid = id;
                                    existing = tool;
                                }
                            });
                            if(!existing.toolname) repeating.tool[newrowid] = {toolname: prof.toLowerCase()}
                            update["repeating_tool_" + newrowid + "_toolname"] = prof;
                            if(!existing.base) update["repeating_tool_" + newrowid + "_toolattr_base"] = "?{Attribute?|Strength,@{strength_mod}|Dexterity,@{dexterity_mod}|Constitution,@{constitution_mod}|Intelligence,@{intelligence_mod}|Wisdom,@{wisdom_mod}|Charisma,@{charisma_mod}}";
                            update["repeating_tool_" + newrowid + "_options-flag"] = 0;
                            repeating.prof_names.push(page.name.toLowerCase());
                            callbacks.push( function() {update_tool(newrowid);} );
                        });
                    }
                };
            };
            if(blob["Skill Proficiency"]) {
                var skill_array = jsonparse(blob["Skill Proficiency"]);
                if(skill_array["Proficiencies"] && skill_array["Proficiencies"].length) {
                     _.each(skill_array["Proficiencies"], function(prof) {
                        var skill_string = prof.toLowerCase().replace(/ /g, '_');
                        update[skill_string + "_prof"] = "(@{pb}*@{" + skill_string + "_type})";
                    });
                };
            };
            if(blob["Actions"]) {
                var actionsobj = {};
                jsonparse(blob["Actions"]).forEach(function(val) { actionsobj[val.Name] = val; });
                _.each(actionsobj, function(action, name) {
                    newrowid = generateRowID();
                    _.each(repeating.attack, function(atk, atkid) {
                        if(atk.atkname === name) newrowid = atkid;
                    });
                    update["repeating_attack_" + newrowid + "_options-flag"] = "0";
                    update["repeating_attack_" + newrowid + "_atkname"] = name;
                    if(action["Desc"]) {
                        update["repeating_attack_" + newrowid + "_atk_desc"] = action["Desc"];
                    }

                    if(action["Type Attack"]) {
                        if (action["Type"] == "Spell") {
                            update["repeating_attack_" + newrowid + "_atkflag"] = "0";
                            update["repeating_attack_" + newrowid + "_attack_options"] = "";
                            update["repeating_attack_" + newrowid + "_saveflag"] = "{{save=1}} {{saveattr=@{saveattr}}} {{savedesc=@{saveeffect}}} {{savedc=[[[[@{savedc}]][SAVE]]]}}"
                        } else {
                            update["repeating_attack_" + newrowid + "_attack_flag"] = "on";
                            update["repeating_attack_" + newrowid + "_atkflag"] = "{{attack=1}}";
                            update["repeating_attack_" + newrowid + "_attack_options"] = "{{attack=1}}";
                        }
                        if(action["Reach"]) { update["repeating_attack_" + newrowid + "_atkrange"] = action["Reach"]; }

                        if(action["Damage"]) { update["repeating_attack_" + newrowid + "_dmgbase"] = action["Damage"]; }
                        if(action["Damage Type"]) { update["repeating_attack_" + newrowid + "_dmgtype"] = action["Damage Type"]; }
                        if (action["Modifier"]) {
                            update["repeating_attack_" + newrowid + "_dmgattr"] = modStringToAttrib(action["Modifier"]);
                            update["repeating_attack_" + newrowid + "_atkattr_base"] = modStringToAttrib(action["Modifier"]);
                        } else {
                            update["repeating_attack_" + newrowid + "_dmgattr"] = "0";
                        }
                        if (action["Save"]) { update["repeating_attack_" + newrowid + "_saveattr"] = action["Save"] }
                        if (action["Save DC"]) { update["repeating_attack_" + newrowid + "_savedc"] = "(" + modStringToAttrib(action["Save DC"]) + "+8+@{pb})" }
                        if (action["Save Effect"]) { update["repeating_attack_" + newrowid + "_saveeffect"] = action["Save Effect"] }

                        if(action["Damage 2"] && action["Damage 2 Type"]) {
                            update["repeating_attack_" + newrowid + "_dmg2flag"] = "{{damage=1}} {{dmg2flag=1}}";
                            update["repeating_attack_" + newrowid + "_atk_dmg2base"] = action["Damage 2"];
                            update["repeating_attack_" + newrowid + "_attack_damagetype2"] = action["Damage 2 Type"];
                            if (action["Modifier 2"]) {
                                update["repeating_attack_" + newrowid + "_dmg2attr"] = modStringToAttrib(action["Modifier 2"]);
                            } else {
                                update["repeating_attack_" + newrowid + "_dmgattr"] = "0";
                            }
                        }
                    }
                });
            };
            if(blob["Global Damage"]) {
                var dmgmod = jsonparse(blob["Global Damage"]);
                var id = generateRowID();
                _.each(repeating.damagemod, function(name, rowid) {
                    if(name.toLowerCase() === dmgmod["Name"].toLowerCase()) id = rowid;
                });
                update["repeating_damagemod_" + id + "_global_damage_name"] = `${dmgmod["Name"]}`;
                update["repeating_damagemod_" + id + "_global_damage_damage"] = `${parseValues(dmgmod["Damage"])}`;
                if(dmgmod["Active"] == "true") update["repeating_damagemod_" + id + "_global_damage_active_flag"] = "1";
                update["repeating_damagemod_" + id + "_options-flag"] = "0";
                update["repeating_damagemod_" + id + "_global_damage_type"] = dmgmod["Type"] ? dmgmod["Type"] : dmgmod["Name"];
                update["global_damage_mod_flag"] = "1";
                repeating.damagemod[id] = dmgmod["Name"];
            };
            if(blob["Resources"]) {
                var resources = jsonparse(blob["Resources"]);
                _.each(resources, function(value) {
                    var section = "";
                    if(currentData["class_resource_name"] == "" || currentData["class_resource_name"] == value["Name"]) {
                        section = "class_resource";
                    } else if (currentData["other_resource_name"] == "" || currentData["other_resource_name"] == value["Name"]) {
                        section = "other_resource";
                    } else {
                        _.each(repeating.resource, function(resource, id) {
                            if(resource.left == "" && section == "" || resource.left == value["Name"]) {
                                section = "repeating_resource_" + id + "_resource_left";
                            }
                            if(resource.right == "" && section == "" || resource.right == value["Name"]) {
                                section = "repeating_resource_" + id + "_resource_right";
                            }
                        })
                    }
                    if(section === "") {
                        var id = generateRowID();
                        section = "repeating_resource_" + id + "_resource_left";
                        repeating.resource[id] = {left: value["Name"], right: ""};
                    }
                    update[section + "_name"] = value["Name"];
                    if(value["Uses"]) update[section] = numUses(value["Uses"]);
                    update[section + "_max"] = value["Max"] ? numUses(value["Max"]) : numUses(value["Uses"]);
                });
            };
            if(blob["Custom AC"]) {
                var customac = jsonparse(blob["Custom AC"]);
                update["custom_ac_flag"] = "1";
                update["custom_ac_base"] = customac.Base;
                update["custom_ac_part1"] = customac["Attribute 1"];
                update["custom_ac_part2"] = customac["Attribute 2"] ? customac["Attribute 2"] : "";
                update["custom_ac_shield"] = customac.Shields;
                if(!looped) {
                    callbacks.push( function() {update_ac();} )
                }
            };
            if(blob["Hit Points Per Level"]) {
                var id = generateRowID();
                update["repeating_hpmod_" + id + "_mod"] = blob["Hit Points Per Level"];
                update["repeating_hpmod_" + id + "_source"] = page.name ? page.name : "Subclass";
                if(category === "Races" || category === "Subraces") {
                    update["repeating_hpmod_" + id + "_levels"] = "total";
                } else {
                    update["repeating_hpmod_" + id + "_levels"] = "base";
                }
            };
            if(blob["Global AC Mod"]) {
                var globalac = jsonparse(blob["Global AC Mod"]);
                var id = generateRowID();
                _.each(repeating.acmod, function(name, rowid) {
                    if(name.toLowerCase() === globalac["Name"].toLowerCase()) id = rowid;
                });
                update["repeating_acmod_" + id + "_global_ac_val"] = globalac.Bonus;
                if(globalac["Active"] !== "false") update["repeating_acmod_" + id + "_global_ac_active_flag"] = "1";
                update["repeating_acmod_" + id + "_options-flag"] = "0";
                update["repeating_acmod_" + id + "_global_ac_name"] = globalac.Name;
                update["global_ac_mod_flag"] = "1";
            };
            if(blob["Global Save"]) {
                var globalsave = jsonparse(blob["Global Save Mod"]);
                var id = generateRowID();
                _.each(repeating.savemod, function(name, rowid) {
                    if(name.toLowerCase() === globalsave["Name"].toLowerCase()) id = rowid;
                });
                update["repeating_savemod_" + id + "_global_save_roll"] = globalsave.Bonus;
                if(globalsave["Active"] !== "false") update["repeating_savemod_" + id + "_global_save_active_flag"] = "1";
                update["repeating_savemod_" + id + "_options-flag"] = "0";
                update["repeating_savemod_" + id + "_global_save_name"] = globalsave.Name;
                update["global_save_mod_flag"] = "1";
            }
            if(blob["Global Attack"]) {
                var globalattack = jsonparse(blob["Global Attack"]);
                var id = generateRowID();
                _.each(repeating.tohitmod, function(name, rowid) {
                    if(name.toLowerCase() === globalattack["Name"].toLowerCase()) id = rowid;
                });
                update["repeating_tohitmod_" + id + "_global_attack_rollstring"] = `${globalattack["Bonus"]}[${globalattack["Name"]}]`;
                if(globalattack["Active"] !== "false") update["repeating_tohitmod_" + id + "_global_attack_active_flag"] = "1";
                update["repeating_tohitmod_" + id + "_options-flag"] = "0";
                update["global_attack_mod_flag"] = "1";
            };
            if(blob["Initiative"]) {
                if(blob["Initiative"].toLowerCase() === "advantage") {
                    update["initiative_style"] = "{@{d20},@{d20}}kh1";
                } else if (blob["Initiative"].toLowerCase() === "disadvantage") {
                    update["initiative_style"] = "{@{d20},@{d20}}kl1";
                } else {
                    update.initmod = numUses(blob["Initiative"]);
                }
            };
            if(blob["Carry Multiplier"]) {
                update["carrying_capacity_mod"] = "*" + blob["Carry Multiplier"];
            };
            if(blob["Speed"]) {
                if(blob["Speed"][0] === "+") {
                    let prevspeed = update["speed"] || currentData["speed"];
                    prevspeed = prevspeed && !isNaN(parseInt(prevspeed)) ? parseInt(prevspeed) : 0;
                    update["speed"] = prevspeed + parseInt(blob["Speed"]);
                } else {
                    update["speed"] = parseInt(blob["Speed"]);
                }
            };
            if(blob["Jack of All Trades"]) {
                update["jack_of_all_trades"] = "@{jack}";
            };
            if(blob["Saving Throws"]) {
                var saves = jsonparse(blob["Saving Throws"]);
                _.each(saves, function(value) {
                    update[value.toLowerCase() + "_save_prof"] = "(@{pb})";
                });
            };
            if(blob["Custom Spells"]) {
                let spells = jsonparse(blob["Custom Spells"]);
                _.each(spells, function(spell) {
                    var lvl = spell["Level"] && spell["Level"] > 0 ? spell["Level"] : "cantrip";
                    let id = generateRowID();
                    if(repeating["spell-" + lvl]) {
                        _.each(repeating["spell-" + lvl], function(spell, spellid) {
                            if(spell.spellname.toLowerCase() === page.name.toLowerCase()) {
                                id = spellid;
                            }
                        });
                    }
                    update["repeating_spell-" + lvl + "_" + id + "_spelllevel"] = lvl;
                    if(spell["spellcasting_ability"]) {
                        update["repeating_spell-" + lvl + "_" + id + "_spell_ability"] = "@{" + spell["spellcasting_ability"].toLowerCase() + "_mod}+";;
                    } else {
                        update["repeating_spell-" + lvl + "_" + id + "_spell_ability"] = "spell";
                    }
                    if(spell["spellclass"]) {
                        update["repeating_spell-" + lvl + "_" + id + "_spellclass"] = spell["spellclass"];
                    }
                    if(spell["spellsource"]) {
                        update["repeating_spell-" + lvl + "_" + id + "_spellsource"] = spell["spellsource"];
                    }
                    update["repeating_spell-" + lvl + "_" + id + "_spellname"] = spell.Name;
                    if(spell["Ritual"]) {update["repeating_spell-" + lvl + "_" + id + "_spellritual"] = "{{ritual=1}}"};
                    if(spell["School"]) {update["repeating_spell-" + lvl + "_" + id + "_spellschool"] = spell["School"].toLowerCase()};
                    if(spell["Casting Time"]) {update["repeating_spell-" + lvl + "_" + id + "_spellcastingtime"] = spell["Casting Time"]};
                    if(spell["Range"]) {update["repeating_spell-" + lvl + "_" + id + "_spellrange"] = spell["Range"]};
                    if(spell["Target"]) {update["repeating_spell-" + lvl + "_" + id + "_spelltarget"] = spell["Target"]};
                    if(spell["Components"]) {
                        if(spell["Components"].toLowerCase().indexOf("v") === -1) {update["repeating_spell-" + lvl + "_" + id + "_spellcomp_v"] = "0"};
                        if(spell["Components"].toLowerCase().indexOf("s") === -1) {update["repeating_spell-" + lvl + "_" + id + "_spellcomp_s"] = "0"};
                        if(spell["Components"].toLowerCase().indexOf("m") === -1) {update["repeating_spell-" + lvl + "_" + id + "_spellcomp_m"] = "0"};
                    };
                    if(spell["Material"]) {update["repeating_spell-" + lvl + "_" + id + "_spellcomp_materials"] = spell["Material"]};
                    if(spell["Concentration"]) {update["repeating_spell-" + lvl + "_" + id + "_spellconcentration"] = "{{concentration=1}}"};
                    if(spell["Duration"]) {update["repeating_spell-" + lvl + "_" + id + "_spellduration"] = spell["Duration"]};
                    if(spell["Damage"] || spell["Healing"]) {
                        update["repeating_spell-" + lvl + "_" + id + "_spelloutput"] = "ATTACK";
                        callbacks.push( function() {create_attack_from_spell(lvl, id, currentData.character_id);} );
                    }
                    else if(spell["Higher Spell Slot Desc"] && spell["Higher Spell Slot Desc"] != "") {
                        var spelllevel = "?{Cast at what level?";
                        for(i = 0; i < 10-lvl; i++) {
                            spelllevel = spelllevel + "|Level " + (parseInt(i, 10) + parseInt(lvl, 10)) + "," + (parseInt(i, 10) + parseInt(lvl, 10));
                        }
                        spelllevel = spelllevel + "}";
                        update["repeating_spell-" + lvl + "_" + id + "_rollcontent"] = `@{wtype}&{template:spell} {{level=@{spellschool} ${spelllevel}}} {{name=@{spellname}}} {{castingtime=@{spellcastingtime}}} {{range=@{spellrange}}} {{target=@{spelltarget}}} @{spellcomp_v} @{spellcomp_s} @{spellcomp_m} {{material=@{spellcomp_materials}}} {{duration=@{spellduration}}} {{description=@{spelldescription}}} {{athigherlevels=@{spellathigherlevels}}} @{spellritual} {{innate=@{innate}}} @{spellconcentration} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                    };
                    if(spell["Spell Attack"]) {update["repeating_spell-" + lvl + "_" + id + "_spellattack"] = spell["Spell Attack"]};
                    if(spell["Damage"]) {update["repeating_spell-" + lvl + "_" + id + "_spelldamage"] = spell["Damage"]};
                    if(spell["Damage Type"]) {update["repeating_spell-" + lvl + "_" + id + "_spelldamagetype"] = spell["Damage Type"]};
                    if(spell["Secondary Damage"]) {update["repeating_spell-" + lvl + "_" + id + "_spelldamage2"] = spell["Secondary Damage"]};
                    if(spell["Secondary Damage Type"]) {update["repeating_spell-" + lvl + "_" + id + "_spelldamagetype2"] = spell["Secondary Damage Type"]};
                    if(spell["Healing"]) {update["repeating_spell-" + lvl + "_" + id + "_spellhealing"] = spell["Healing"];};
                    if(spell["Add Casting Modifier"]) {update["repeating_spell-" + lvl + "_" + id + "_spelldmgmod"] = spell["Add Casting Modifier"]};
                    if(spell["Save"]) {update["repeating_spell-" + lvl + "_" + id + "_spellsave"] = spell["Save"]};
                    if(spell["Save Success"]) {update["repeating_spell-" + lvl + "_" + id + "_spellsavesuccess"] = spell["Save Success"]};
                    if(spell["Higher Spell Slot Dice"]) {update["repeating_spell-" + lvl + "_" + id + "_spellhldie"] = spell["Higher Spell Slot Dice"]};
                    if(spell["Higher Spell Slot Die"]) {update["repeating_spell-" + lvl + "_" + id + "_spellhldietype"] = spell["Higher Spell Slot Die"]};
                    if(spell["Higher Spell Slot Bonus"]) {update["repeating_spell-" + lvl + "_" + id + "_spellhlbonus"] = spell["Higher Spell Slot Bonus"]};
                    if(spell["Higher Spell Slot Desc"]) {update["repeating_spell-" + lvl + "_" + id + "_spellathigherlevels"] = spell["Higher Spell Slot Desc"]};
                    if(spell["data-Cantrip Scaling"] && lvl == "cantrip") {update["repeating_spell-" + lvl + "_" + id + "_spell_damage_progression"] = "Cantrip " + spell["data-Cantrip Scaling"].charAt(0).toUpperCase() + spell["data-Cantrip Scaling"].slice(1);};
                    if(spell["data-description"]) { update["repeating_spell-" + lvl + "_" + id + "_spelldescription"] = spell["data-description"]};
                    update["repeating_spell-" + lvl + "_" + id + "_options-flag"] = "0";
                })
            };
            if(blob["Global Save Mod"]) {
                update["globalsavemod"] = numUses(blob["Global Save Mod"]);
            };
            if(blob["Proficiency Bonus"]) {
                var bonus = jsonparse(blob["Proficiency Bonus"]);
                _.each(bonus, function(value, prof) {
                    update[prof.replace(/ /g, "_").toLowerCase() + "_flat"] = numUses(value);
                });
            };
            /**/
        });

        return {
            update: update,
            repeating: repeating,
            callbacks: callbacks
        };
    };

    var check_itemmodifiers = function(modifiers, previousValue) {
        var mods = modifiers.toLowerCase().split(",");
        if(previousValue) {
            prevmods = previousValue.toLowerCase().split(",");
            mods = _.union(mods, prevmods);
        };
        _.each(mods, function(mod) {
            if(mod.indexOf("ac:") > -1 || mod.indexOf("ac +") > -1 || mod.indexOf("ac -") > -1) {update_ac();};
            if(mod.indexOf("spell") > -1) {update_spell_info();};
            if(mod.indexOf("saving throws") > -1) {update_all_saves();};
            if(mod.indexOf("strength save") > -1) {update_save("strength");} else if(mod.indexOf("strength") > -1) {update_attr("strength");};
            if(mod.indexOf("dexterity save") > -1) {update_save("dexterity");} else if(mod.indexOf("dexterity") > -1) {update_attr("dexterity");};
            if(mod.indexOf("constitution save") > -1) {update_save("constitution");} else if(mod.indexOf("constitution") > -1) {update_attr("constitution");};
            if(mod.indexOf("intelligence save") > -1) {update_save("intelligence");} else if(mod.indexOf("intelligence") > -1) {update_attr("intelligence");};
            if(mod.indexOf("wisdom save") > -1) {update_save("wisdom");} else if(mod.indexOf("wisdom") > -1) {update_attr("wisdom");};
            if(mod.indexOf("charisma save") > -1) {update_save("charisma");} else if(mod.indexOf("charisma") > -1) {update_attr("charisma");};
            if(mod.indexOf("ability checks") > -1) {update_all_ability_checks();};
            if(mod.indexOf("acrobatics") > -1) {update_skills(["acrobatics"]);};
            if(mod.indexOf("animal handling") > -1) {update_skills(["animal_handling"]);};
            if(mod.indexOf("arcana") > -1) {update_skills(["arcana"]);};
            if(mod.indexOf("athletics") > -1) {update_skills(["athletics"]);};
            if(mod.indexOf("deception") > -1) {update_skills(["deception"]);};
            if(mod.indexOf("history") > -1) {update_skills(["history"]);};
            if(mod.indexOf("insight") > -1) {update_skills(["insight"]);};
            if(mod.indexOf("intimidation") > -1) {update_skills(["intimidation"]);};
            if(mod.indexOf("investigation") > -1) {update_skills(["investigation"]);};
            if(mod.indexOf("medicine") > -1) {update_skills(["medicine"]);};
            if(mod.indexOf("nature") > -1) {update_skills(["nature"]);};
            if(mod.indexOf("perception") > -1) {update_skills(["perception"]);};
            if(mod.indexOf("performance") > -1) {update_skills(["performance"]);};
            if(mod.indexOf("persuasion") > -1) {update_skills(["persuasion"]);};
            if(mod.indexOf("religion") > -1) {update_skills(["religion"]);};
            if(mod.indexOf("sleight of hand") > -1) {update_skills(["sleight_of_hand"]);};
            if(mod.indexOf("stealth") > -1) {update_skills(["stealth"]);};
            if(mod.indexOf("survival") > -1) {update_skills(["survival"]);};
        });
    };

    var create_attack_from_item = function(itemid, options) {
        var update = {};
        var newrowid = generateRowID();
        update["repeating_inventory_" + itemid + "_itemattackid"] = newrowid;
        if(options && options.versatile) {
            var newrowid2 = generateRowID();
            update["repeating_inventory_" + itemid + "_itemattackid"] += "," + newrowid2;
            setAttrs(update, {}, function() {
                update_attack_from_item(itemid, newrowid, {newattack: true, versatile: "primary"});
                update_attack_from_item(itemid, newrowid2, {newattack: true, versatile: "secondary"});
            });
        }
        else {
            setAttrs(update, {}, update_attack_from_item(itemid, newrowid, {newattack: true}));
        }
    };

    var update_attack_from_item = function(itemid, attackid, options) {
        getAttrs(["repeating_inventory_" + itemid + "_itemname","repeating_inventory_" + itemid + "_itemproperties","repeating_inventory_" + itemid + "_itemmodifiers", "strength", "dexterity"], function(v) {
            var update = {}; var itemtype; var damage; var damagetype; var damage2; var damagetype2; var attackmod; var damagemod; var range;
            var alt = {};

            if(options && options.newattack) {
                update["repeating_attack_" + attackid + "_options-flag"] = "0";
                update["repeating_attack_" + attackid + "_itemid"] = itemid;
            }

            if(v["repeating_inventory_" + itemid + "_itemmodifiers"] && v["repeating_inventory_" + itemid + "_itemmodifiers"] != "") {
                var mods = v["repeating_inventory_" + itemid + "_itemmodifiers"].split(",");
                _.each(mods, function(mod) {
                    if(mod.indexOf("Item Type:") > -1) {itemtype = mod.split(":")[1].trim()}
                    else if(mod.indexOf("Alternate Secondary Damage Type:") > -1) {alt.damagetype2 = mod.split(":")[1].trim();}
                    else if(mod.indexOf("Alternate Secondary Damage:") > -1) {alt.damage2 = mod.split(":")[1].trim();}
                    else if(mod.indexOf("Alternate Damage Type:") > -1) {alt.damagetype = mod.split(":")[1].trim();}
                    else if(mod.indexOf("Alternate Damage:") > -1) {alt.damage = mod.split(":")[1].trim();}
                    else if(mod.indexOf("Secondary Damage Type:") > -1) {damagetype2 = mod.split(":")[1].trim()}
                    else if(mod.indexOf("Secondary Damage:") > -1) {damage2 = mod.split(":")[1].trim()}
                    else if(mod.indexOf("Damage Type:") > -1) {damagetype = mod.split(":")[1].trim()}
                    else if(mod.indexOf("Damage:") > -1) {damage = mod.split(":")[1].trim()}
                    else if(mod.indexOf("Range:") > -1) {range = mod.split(":")[1].trim()}
                    else if(mod.indexOf(" Attacks ") > -1) {attackmod = mod.split(" Attacks ")[1].trim()}
                    else if(mod.indexOf(" Damage ") > -1) {damagemod = mod.split(" Damage ")[1].trim()}
                });
            }

            if(v["repeating_inventory_" + itemid + "_itemname"] && v["repeating_inventory_" + itemid + "_itemname"] != "") {
                update["repeating_attack_" + attackid + "_atkname"] = v["repeating_inventory_" + itemid + "_itemname"];
                if(options && options.versatile === "primary") {
                    update["repeating_attack_" + attackid + "_atkname"] += " (One-Handed)";
                } else if(options && options.versatile === "secondary") {
                    update["repeating_attack_" + attackid + "_atkname"] += " (Two-Handed)";
                }
            }
            if(options && options.versatile === "secondary") {
                if(alt.damage) {
                    update["repeating_attack_" + attackid + "_dmgbase"] = alt.damage;
                }
                if(alt.damagetype) {
                    update["repeating_attack_" + attackid + "_dmgtype"] = alt.damagetype;
                }
                if(alt.damage2) {
                    update["repeating_attack_" + attackid + "_dmg2base"] = alt.damage2;
                    update["repeating_attack_" + attackid + "_dmg2attr"] = 0;
                    update["repeating_attack_" + attackid + "_dmg2flag"] = "{{damage=1}} {{dmg2flag=1}}";
                }
                if(alt.damagetype2) {
                    update["repeating_attack_" + attackid + "_dmg2type"] = alt.damagetype2;
                }
                update["repeating_attack_" + attackid + "_versatile_alt"] = "1";
            }
            else {
                if(damage) {
                    update["repeating_attack_" + attackid + "_dmgbase"] = damage;
                }
                if(damagetype) {
                    update["repeating_attack_" + attackid + "_dmgtype"] = damagetype;
                }
                if(damage2) {
                    update["repeating_attack_" + attackid + "_dmg2base"] = damage2;
                    update["repeating_attack_" + attackid + "_dmg2attr"] = 0;
                    update["repeating_attack_" + attackid + "_dmg2flag"] = "{{damage=1}} {{dmg2flag=1}}";
                }
                if(damagetype2) {
                    update["repeating_attack_" + attackid + "_dmg2type"] = damagetype2;
                }
            }
            if(range) {
                update["repeating_attack_" + attackid + "_atkrange"] = range;
            }
            var finesse = v["repeating_inventory_" + itemid + "_itemproperties"] && /finesse/i.test(v["repeating_inventory_" + itemid + "_itemproperties"]);
            if( (itemtype && itemtype.indexOf("Ranged") > -1) || (finesse && +v.dexterity > +v.strength)) {
                update["repeating_attack_" + attackid + "_atkattr_base"] = "@{dexterity_mod}";
                update["repeating_attack_" + attackid + "_dmgattr"] = "@{dexterity_mod}";
            }
            else {
                update["repeating_attack_" + attackid + "_atkattr_base"] = "@{strength_mod}";
                update["repeating_attack_" + attackid + "_dmgattr"] = "@{strength_mod}";
            }
            if(attackmod && damagemod && attackmod == damagemod) {
                update["repeating_attack_" + attackid + "_atkmagic"] = parseInt(attackmod, 10);
                update["repeating_attack_" + attackid + "_atkmod"] = "";
                update["repeating_attack_" + attackid + "_dmgmod"] = "";
            }
            else {
                if(attackmod) {
                    update["repeating_attack_" + attackid + "_atkmod"] = parseInt(attackmod, 10);
                }
                if(damagemod) {
                    update["repeating_attack_" + attackid + "_dmgmod"] = parseInt(damagemod, 10);
                }
                update["repeating_attack_" + attackid + "_atkmagic"] = "";
            }
            var callback = function() {update_attacks(attackid, "item")};
            setAttrs(update, {silent: true}, callback);
        });
    };

    const create_resource_from_item = (itemid) => {
        const newrowid = generateRowID();
        let update     = {};

        getAttrs(["other_resource_name"], (v) => {
            //Use other_resource if it is empty
            if (!v.other_resource_name || v.other_resource_name == "") {
                update[`repeating_inventory_${itemid}_itemresourceid`] = "other_resource";
                setAttrs(update, {}, update_resource_from_item(itemid, "other_resource", true));
            //If other_resource is populated look through the repeating sections for an empty spot
            } else {
                getSectionIDs(`repeating_resource`, (idarray) => {
                    if (idarray.length == 0) {
                        update[`repeating_inventory_${itemid}_itemresourceid`] = `${newrowid}_resource_left`;
                        setAttrs(update, {}, update_resource_from_item(itemid, `${newrowid}_resource_left`, true));
                    } else {
                        let array = [];
                        _.each(idarray, (currentID, i) => {
                            ["left", "right"].forEach(side => {
                                array.push(`repeating_resource_${currentID}_resource_${side}`);
                                array.push(`repeating_resource_${currentID}_resource_${side}_name`);
                                array.push(`repeating_resource_${currentID}_resource_${side}_max`);
                            });
                        });
                        getAttrs(array, (y) => {
                            let existing = false;
                           _.each(idarray, (currentID, i) => {
                                ["left", "right"].forEach(side => {
                                    const Name  = y[`repeating_resource_${currentID}_resource_${side}_name`] || false;
                                    const Value = y[`repeating_resource_${currentID}_resource_${side}`] || false;
                                    const Max   = y[`repeating_resource_${currentID}_resource_${side}_max`] || false;

                                    //If Name, Value, & Max are empty and existing === false then populate a resource there
                                    if ((!Name && !Value && !Max) && existing === false) {
                                        update[`repeating_inventory_${itemid}_itemresourceid`] = `${currentID}_resource_${side}`;
                                        setAttrs(update, {}, update_resource_from_item(itemid, `${currentID}_resource_${side}`, true));
                                        existing = true;
                                    };
                                });
                            });
                           //If nothing is empty then generatae a new row
                            if(!existing) {
                                update[`repeating_inventory_${itemid}_itemresourceid`] = `${newrowid}_resource_left`;
                                setAttrs(update, {}, update_resource_from_item(itemid, `${newrowid}_resource_left`, true));
                            };
                        });
                    };
                });
            };
        });
    };

    var update_resource_from_item = function(itemid, resourceid, newresource) {
        getAttrs(["repeating_inventory_" + itemid + "_itemname","repeating_inventory_" + itemid + "_itemcount"], function(v) {
            var update = {}; var id;

            if(resourceid && resourceid == "other_resource") {
                id = resourceid;
            }
            else {
                id = "repeating_resource_" + resourceid;
            };

            if(newresource) {
                update[id + "_itemid"] = itemid;
            } ;

            if(!v["repeating_inventory_" + itemid + "_itemname"]) {
                update["repeating_inventory_" + itemid + "_useasresource"] = 0;
                update["repeating_inventory_" + itemid + "_itemresourceid"] = "";
                remove_resource(resourceid);
            };
            if(v["repeating_inventory_" + itemid + "_itemname"] && v["repeating_inventory_" + itemid + "_itemname"] != "") {
                update[id + "_name"] = v["repeating_inventory_" + itemid + "_itemname"];
            };
            if(v["repeating_inventory_" + itemid + "_itemcount"] && v["repeating_inventory_" + itemid + "_itemcount"] != "") {
                update[id] = v["repeating_inventory_" + itemid + "_itemcount"];
            };

            setAttrs(update, {silent: true});

        });
    };


    const create_attack_from_spell = function(lvl, spellid, character_id) {
        let update   = {};
        const newrowid = generateRowID();
        update[`repeating_spell-${lvl}_${spellid}_spellattackid`] = newrowid;
        update[`repeating_spell-${lvl}_${spellid}_rollcontent`] = `%{${character_id}|repeating_attack_${newrowid}_attack}`;
        setAttrs(update, {}, update_attack_from_spell(lvl, spellid, newrowid, true));
    }

    const update_attack_from_spell = (lvl, spellid, attackid, newattack) => {
        const repeating_spell  = `repeating_spell-${lvl}_${spellid}`;
        const repeating_attack = `repeating_attack_${attackid}`;
        getAttrs([`${repeating_spell}_spellname`, `${repeating_spell}_spellrange`, `${repeating_spell}_spelltarget`, `${repeating_spell}_spellattack`, `${repeating_spell}_spelldamage`, `${repeating_spell}_spelldamage2`,`${repeating_spell}_spelldamagetype`,`${repeating_spell}_spelldamagetype2`,`${repeating_spell}_spellhealing`,`${repeating_spell}_spelldmgmod`,`${repeating_spell}_spellsave`,`${repeating_spell}_spellsavesuccess`,`${repeating_spell}_spellhldie`,`${repeating_spell}_spellhldietype`,`${repeating_spell}_spellhlbonus`,`${repeating_spell}_spelllevel`,`${repeating_spell}_includedesc`,`${repeating_spell}_spelldescription`,`${repeating_spell}_spellathigherlevels`,`${repeating_spell}_spell_damage_progression`,`${repeating_spell}_innate`,`${repeating_spell}_spell_ability`,"spellcasting_ability"], (v) => {
            let update = {};
            let description = "";
            const spellAbility = (v[`${repeating_spell}_spell_ability`] != "spell") ? v[`${repeating_spell}_spell_ability`].slice(0, -1) : "spell";
            update[`${repeating_attack}_atkattr_base`] = spellAbility;

            if (newattack) {
                update[`${repeating_attack}_options-flag`] = "0";
                update[`${repeating_attack}_spellid`]      = spellid;
                update[`${repeating_attack}_spelllevel`]   = lvl;
            }

            if (v[`${repeating_spell}_spell_ability`] == "spell") {
                update[`${repeating_attack}_savedc`] = "(@{spell_save_dc})";
            } else if (v[`${repeating_spell}_spell_ability`]) {
                update[`${repeating_attack}_savedc`] = `(${spellAbility}+8+@{spell_dc_mod}+@{pb})`;
            }

            if (v[`${repeating_spell}_spellname`] && v[`${repeating_spell}_spellname`] != "") {
                update[`${repeating_attack}_atkname`] = v[`${repeating_spell}_spellname`];
            }

            update[`${repeating_attack}_atkflag`] = (!v[`${repeating_spell}_spellattack`] || v[`${repeating_spell}_spellattack`] === "None") ? "0" : "{{attack=1}}";

            if (v[`${repeating_spell}_spellattack`] || !v[`${repeating_spell}_spellattack`] === "None") {
                description = description + v[`${repeating_spell}_spellattack`] + " Spell Attack. ";
            };

            if (v[`${repeating_spell}_spelldamage`] && v[`${repeating_spell}_spelldamage`] != "") {
                update[`${repeating_attack}_dmgbase`] =
                    (v[`${repeating_spell}_spell_damage_progression`] && v[`${repeating_spell}_spell_damage_progression`] === "Cantrip Dice") ? "[[round((@{level} + 1) / 6 + 0.5)]]" + v[`${repeating_spell}_spelldamage`].substring(1) :
                    v[`${repeating_spell}_spelldamage`];
            };

            update[`${repeating_attack}_dmgflag`] = (v[`${repeating_spell}_spelldamage`] && v[`${repeating_spell}_spelldamage`] != "") ? "{{damage=1}} {{dmg1flag=1}}" : "0";
            update[`${repeating_attack}_dmgattr`] = (v[`${repeating_spell}_spelldmgmod`] && v[`${repeating_spell}_spelldmgmod`] === "Yes") ? spellAbility : "0";
            update[`${repeating_attack}_dmgtype`] = (v[`${repeating_spell}_spelldamagetype`]) ? v[`${repeating_spell}_spelldamagetype`] : "";
            update[`${repeating_attack}_dmg2base`] = (v[`${repeating_spell}_spelldamage2`]) ? v[`${repeating_spell}_spelldamage2`] : "";
            update[`${repeating_attack}_dmg2attr`] = "0";
            update[`${repeating_attack}_dmg2flag`] = (v[`${repeating_spell}_spelldamage2`]) ? "{{damage=1}} {{dmg2flag=1}}" : 0;
            update[`${repeating_attack}_dmg2type`] = (v[`${repeating_spell}_spelldamagetype2`]) ? v[`${repeating_spell}_spelldamagetype2`] : "";
            update[`${repeating_attack}_atkrange`] = (v[`${repeating_spell}_spellrange`]) ? v[`${repeating_spell}_spellrange`] : "";
            update[`${repeating_attack}_saveflag`] = (v[`${repeating_spell}_spellsave`]) ? "{{save=1}} {{saveattr=@{saveattr}}} {{savedesc=@{saveeffect}}} {{savedc=[[[[@{savedc}]][SAVE]]]}}" : "0";
            update[`${repeating_attack}_saveeffect`] = (v[`${repeating_spell}_spellsavesuccess`]) ? v[`${repeating_spell}_spellsavesuccess`] : "";

            if(v[`${repeating_spell}_spellsave`]) {
                update[`${repeating_attack}_saveattr`] = v[`${repeating_spell}_spellsave`];
            };

            if(v[`${repeating_spell}_spellhldie`] && v[`${repeating_spell}_spellhldie`] != "" && v[`${repeating_spell}_spellhldietype`] && v[`${repeating_spell}_spellhldietype`] != "") {
                let bonus = "";
                const spelllevel = v[`${repeating_spell}_spelllevel`];
                let query = "?{Cast at what level?";
                for(i = 0; i < 10-spelllevel; i++) {
                    query = query + "|Level " + (parseInt(i, 10) + parseInt(spelllevel, 10)) + "," + i;
                }
                query = query + "}";
                if(v[`${repeating_spell}_spellhlbonus`] && v[`${repeating_spell}_spellhlbonus`] != "") {
                    bonus = "+(" + v[`${repeating_spell}_spellhlbonus`] + "*" + query + ")";
                }
                update[`${repeating_attack}_hldmg`] = `{{hldmg=[[(${v[`${repeating_spell}_spellhldie`]}*${query})${v[`${repeating_spell}_spellhldietype`]}${bonus}]]}}`;
            } else {
                update[`${repeating_attack}_hldmg`] = "";
            }

            if (v[`${repeating_spell}_spellhealing`] && v[`${repeating_spell}_spellhealing`] != "") {
                if(!v[`${repeating_spell}_spelldamage`] || v[`${repeating_spell}_spelldamage`] === "") {
                    update[`${repeating_attack}_dmgbase`] = v[`${repeating_spell}_spellhealing`];
                    update[`${repeating_attack}_dmgflag`] = "{{damage=1}} {{dmg1flag=1}}";
                    update[`${repeating_attack}_dmgtype`] = "Healing";
                } else if (!v[`${repeating_spell}_spelldamage2`] || v[`${repeating_spell}_spelldamage2`] === "") {
                    update[`${repeating_attack}_dmg2base`] = v[`${repeating_spell}_spellhealing`];
                    update[`${repeating_attack}_dmg2flag`] = "{{damage=1}} {{dmg2flag=1}}";
                    update[`${repeating_attack}_dmg2type`] = "Healing";
                }
            }

            update[`${repeating_attack}_spell_innate`] = (v[`${repeating_spell}_innate`]) ? v[`${repeating_spell}_innate`] : "";

            if(v[`${repeating_spell}_spelltarget`]) {
                description = description + v[`${repeating_spell}_spelltarget`] + ". ";
            }
            if(v[`${repeating_spell}_includedesc`] && v[`${repeating_spell}_includedesc`] === "on") {
                description = v[`${repeating_spell}_spelldescription`];
                if(v[`${repeating_spell}_spellathigherlevels`] && v[`${repeating_spell}_spellathigherlevels`] != "") {
                    description = description + "\n\nAt Higher Levels: " + v[`${repeating_spell}_spellathigherlevels`];
                }
            } else if(v[`${repeating_spell}_includedesc`] && v[`${repeating_spell}_includedesc`] === "off") {
                description = "";
            };
            update[`${repeating_attack}_atk_desc`] = description;

            var callback = () => {update_attacks(attackid, "spell")};
            setAttrs(update, {silent: true}, callback);
        });
    };

    const update_attacks = (update_id, source) => {
        if (update_id.substring(0,1) === "-" && update_id.length === 20) {
            do_update_attack([update_id], source);
        } else if (["strength","dexterity","constitution","intelligence","wisdom","charisma","spells","all"].indexOf(update_id) > -1) {
            getSectionIDs("repeating_attack", (idarray) => {
                if (update_id === "all") {
                    do_update_attack(idarray);
                } else if (update_id === "spells") {
                    let attack_attribs = [];
                    _.each(idarray, (id) => {
                        attack_attribs.push(`repeating_attack_${id}_spellid`, `repeating_attack_${id}_spelllevel`);
                    });
                    getAttrs(attack_attribs, (v) => {
                        const filteredIds = _.filter(idarray, (id) => {
                            return v[`repeating_attack_${id}_spellid`] && v[`repeating_attack_${id}_spellid`] != "";
                        });
                        let spell_attacks = {};
                        _.each(filteredIds, (attack_id) => {
                            spell_attacks[attack_id] = {
                                spell_id: v[`repeating_attack_${attack_id}_spellid`],
                                spell_lvl: v[`repeating_attack_${attack_id}_spelllevel`]
                            };
                        });
                        _.each(spell_attacks, (data, attack_id) => { update_attack_from_spell(data.spell_lvl, data.spell_id, attack_id); });
                    });
                } else {
                    let attack_attribs = ["spellcasting_ability"];
                    _.each(idarray, (id) => {
                        attack_attribs.push(`repeating_attack_${id}_atkattr_base`);
                        attack_attribs.push(`repeating_attack_${id}_dmgattr`);
                        attack_attribs.push(`repeating_attack_${id}_dmg2attr`);
                        attack_attribs.push(`repeating_attack_${id}_savedc`);
                    });
                    getAttrs(attack_attribs, (v) => {
                        let attr_attack_ids = [];
                        _.each(idarray, (id) => {
                            if ((v[`repeating_attack_${id}_atkattr_base`] && v[`repeating_attack_${id}_atkattr_base`].indexOf(update_id) > -1) || (v[`repeating_attack_${id}_dmgattr`] && v[`repeating_attack_${id}_dmgattr`].indexOf(update_id) > -1) || (v[`repeating_attack_${id}_dmg2attr`] && v[`repeating_attack_${id}_dmg2attr`].indexOf(update_id) > -1) || (v[`repeating_attack_${id}_savedc`] && v[`repeating_attack_${id}_savedc`].indexOf(update_id) > -1) || (v[`repeating_attack_${id}_savedc`] && v[`repeating_attack_${id}_savedc`] === "(@{spell_save_dc})" && v["spellcasting_ability"] && v["spellcasting_ability"].indexOf(update_id) > -1)) {
                                attr_attack_ids.push(id);
                            }
                        });
                        if (attr_attack_ids.length > 0) {
                            do_update_attack(attr_attack_ids);
                        }
                    });
                };
            });
        };
    };

    const do_update_attack = (attack_array, source) => {
        let attack_attribs = ["level","d20","pb","pb_type","pbd_safe","dtype","globalmagicmod","strength_mod","dexterity_mod","constitution_mod","intelligence_mod","wisdom_mod","charisma_mod","spellcasting_ability","spell_save_dc","spell_attack_mod", "spell_dc_mod", "global_damage_mod_roll", "global_damage_mod_crit"];
        _.each(attack_array, (attackid) => {
            ["atkflag","atkname","atkattr_base","atkmod","atkprofflag","atkmagic","dmgflag","dmgbase","dmgattr","dmgmod","dmgtype","dmg2flag","dmg2base","dmg2attr","dmg2mod","dmg2type","dmgcustcrit","dmg2custcrit","saveflag","savedc","saveeffect","saveflat","hldmg","spellid","spelllevel","atkrange","itemid","ammo",].forEach((attr) => {
                attack_attribs.push(`repeating_attack_${attackid}_${attr}`)
            });
        });

        getAttrs(attack_attribs, (v) => {
            _.each(attack_array, (attackid) => {
                const repeating_attack = `repeating_attack_${attackid}`;
                let callbacks          = [];
                let update             = {};
                let hbonus             = "";
                let hdmg1              = "";
                let hdmg2              = "";
                let dmg                = "";
                let dmg2               = "";
                let rollbase           = "";
                let spellattack        = false;
                let magicattackmod     = 0;
                let magicsavemod       = 0;
                let atkattr_abrev      = "";
                let dmgattr_abrev      = "";
                let dmg2attr_abrev     = "";
                //PROFICIENCY BONUS select in Settings.
                const pbd_safe = v["pbd_safe"] || "";

                //HIGHER LVL CAST DMG found in Spells for spells like Fireball
                const hldmgcrit = (v[`${repeating_attack}_hldmg`] && v[`${repeating_attack}_hldmg`] != "") ? v[`${repeating_attack}_hldmg`].slice(0, 7) + "crit" + v[`${repeating_attack}_hldmg`].slice(7) : "";

                if (v[`${repeating_attack}_spellid`] && v[`${repeating_attack}_spellid`] != "") {
                    spellattack    = true;
                    //GLOBAL MAGIC ATTACK MODIFIER in Settings
                    magicattackmod = parseInt(v["spell_attack_mod"],10) || 0;
                    //SPELL SAVE DC MOD in Settings
                    magicsavemod   = parseInt(v["spell_dc_mod"],10) || 0;
                };

                //ATTACK select inside settings for the repeating attack
                if (!v[`${repeating_attack}_atkattr_base`] || v[`${repeating_attack}_atkattr_base`] === "0") {
                    atkattr_base = 0
                } else if (v[`${repeating_attack}_atkattr_base`] && v[`${repeating_attack}_atkattr_base`] === "spell") {
                    atkattr_base  = parseInt(v[v["spellcasting_ability"].substring(2, v["spellcasting_ability"].length - 2)], 10);
                    atkattr_abrev = v["spellcasting_ability"].substring(2, 5).toUpperCase();
                } else {
                    atkattr_base = parseInt(v[v[`${repeating_attack}_atkattr_base`].substring(2, v[`${repeating_attack}_atkattr_base`].length - 1)], 10);
                    atkattr_abrev = v[`${repeating_attack}_atkattr_base`].substring(2, 5).toUpperCase();
                };

                //DAMAGE 1 ability select inside settings for the repeating attack
                if (!v[`${repeating_attack}_dmgattr`] || v[`${repeating_attack}_dmgattr`] === "0") {
                    dmgattr = 0;
                } else if (v[`${repeating_attack}_dmgattr`] && v[`${repeating_attack}_dmgattr`] === "spell") {
                    dmgattr = parseInt(v[v["spellcasting_ability"].substring(2, v["spellcasting_ability"].length - 2)], 10);
                    dmgattr_abrev = v["spellcasting_ability"].substring(2, 5).toUpperCase();
                } else {
                    dmgattr = parseInt(v[v[`${repeating_attack}_dmgattr`].substring(2, v[`${repeating_attack}_dmgattr`].length - 1)], 10);
                    dmgattr_abrev = v[`${repeating_attack}_dmgattr`].substring(2, 5).toUpperCase();
                };

                //DAMAGE 2 ability select inside settings for the repeating attack
                if (!v[`${repeating_attack}_dmg2attr`] || v[`${repeating_attack}_dmg2attr`] === "0") {
                    dmg2attr = 0;
                } else if (v[`${repeating_attack}_dmg2attr`] && v[`${repeating_attack}_dmg2attr`] === "spell") {
                    dmg2attr = parseInt(v[v["spellcasting_ability"].substring(2, v["spellcasting_ability"].length - 2)], 10);
                    dmg2attr_abrev = v["spellcasting_ability"].substring(2, 5).toUpperCase();
                } else {
                    dmg2attr = parseInt(v[v[`${repeating_attack}_dmg2attr`].substring(2, v[`${repeating_attack}_dmg2attr`].length - 1)], 10);
                    dmg2attr_abrev =v[`${repeating_attack}_dmg2attr`].substring(2, 5).toUpperCase();
                };

                //DAMAGE first input inside settings for the repeating attack
                const dmgbase  = v[`${repeating_attack}_dmgbase`] || 0;
                const dmg2base = v[`${repeating_attack}_dmg2base`] || 0;
                //DAMAGE 1 second input inside settings for the repeating attack
                const dmgmod  = parseInt(v[`${repeating_attack}_dmgmod`],10) || 0;
                //DAMAGE 2 second input inside settings for the repeating attack
                const dmg2mod = parseInt(v[`${repeating_attack}_dmg2mod`],10) || 0;
                //DAMAGE 1 TYPE input inside settings for the repeating attack
                const dmgtype  = v[`${repeating_attack}_dmgtype`] || "";
                //DAMAGE 2 TYPE input inside settings for the repeating attack
                const dmg2type = v[`${repeating_attack}_dmg2type`] || "";

                //PROFICIENT flag inside settings for the repeating attack && PROFICIENCY BONUS from Settings
                const atkprofflag = v[`${repeating_attack}_atkprofflag`] || 0;
                const pb          = (atkprofflag != 0 && v.pb) ? v.pb : 0;

                //ATTACK input inside settings for the repeating attack
                const atkmod = parseInt(v[`${repeating_attack}_atkmod`],10) || 0;
                //MAGIC BONUS input inside settings for the repeating attack
                const atkmag = parseInt(v[`${repeating_attack}_atkmagic`],10) || 0;

                //used in _atkdmgtype display
                const dmgmag = (isNaN(atkmag) === false && atkmag != 0 && ((v[`${repeating_attack}_dmgflag`] && v[`${repeating_attack}_dmgflag`] != 0) || (v[`${repeating_attack}_dmg2flag`] && v[`${repeating_attack}_dmg2flag`] != 0))) ? `+ ${atkmag} Magic Bonus` : "";

               //ATTACK checkbox inside settings for the repeating attack
                const atkflag = v[`${repeating_attack}_atkflag`] || 0;
                if (atkflag != 0) {
                    bonus_mod  = atkattr_base + atkmod + atkmag + magicattackmod;
                    plus_minus = (bonus_mod > -1) ? "+" : "";
                    //pb_type is PROFICIENCY BONUS select in Settings
                    if (v["pb_type"] && v["pb_type"] === "die") {
                        bonus  = `${bonus_mod}+${pb}`;
                    } else {
                        bonus_mod  = bonus_mod + parseInt(pb, 10);
                        bonus      = plus_minus + bonus_mod;
                    };
                //SAVING THROW checkbox inside settings for the repeating attack
                } else if (v[`${repeating_attack}_saveflag`] && v[`${repeating_attack}_saveflag`] != 0) {
                    const saveDC = v[`${repeating_attack}_savedc`] || "";
                    //SAVING THROW VS DC select "Spell" inside settings for the repeating attack
                    if (!saveDC || saveDC === "(@{spell_save_dc})") {
                        const tempdc = v["spell_save_dc"];
                        bonus = "DC" + tempdc;
                    //SAVING THROW VS DC select "FLAT" inside settings for the repeating attack
                    } else if (saveDC === "(@{saveflat})") {
                        const tempdc = parseInt(v[`${repeating_attack}_saveflat`]) || 0;
                        bonus = "DC" + tempdc;
                    //SAVING THROW VS DC select ability score inside settings for the repeating attack
                    } else {
                        const savedcattr = v[`${repeating_attack}_savedc`].split("_mod")[0].slice(3);
                        const safe_pb    = v["pb_type"] && v["pb_type"] === "die" ? parseInt(pb.substring(1), 10) / 2 : parseInt(pb,10);
                        const safe_attr  = v[`${savedcattr}_mod`] ? parseInt(v[`${savedcattr}_mod`],10) : 0;
                        const tempdc     = 8 + safe_attr + safe_pb + magicsavemod;
                        bonus = "DC" + tempdc;
                    };
                } else {
                    bonus = "-";
                }

                //DAMAGE checkbox inside settings for the repeating attack
                const dmgflag1 = v[`${repeating_attack}_dmgflag`] || 0;
                const dmgflag2 = v[`${repeating_attack}_dmg2flag`] || 0;
                if (dmgflag1 != 0) {
                    if (spellattack === true && dmgbase.indexOf("[[round((@{level} + 1) / 6 + 0.5)]]") > -1) {
                        // SPECIAL CANTRIP DAMAGE
                        dmgdiestring = Math.round(((parseInt(v["level"], 10) + 1) / 6) + 0.5).toString();
                        dmg = dmgdiestring + dmgbase.substring(dmgbase.lastIndexOf("d"));
                        //select & input to the right of damage
                        if (dmgattr + dmgmod != 0) {
                            dmg += `+${(dmgattr + dmgmod)}`;
                        }
                        dmg += ` ${dmgtype}`;
                    } else {
                        if (dmgbase === 0 && (dmgattr + dmgmod === 0)) {
                            dmg = 0;
                        }
                        if (dmgbase != 0) {
                            dmg = dmgbase;
                        }
                        if (dmgbase != 0 && (dmgattr + dmgmod != 0)) {
                            dmg = (dmgattr + dmgmod > 0) ? dmg + "+" : dmg;
                        }
                        if (dmgattr + dmgmod != 0) {
                            dmg = dmg + (dmgattr + dmgmod);
                        }
                        dmg = dmg + " " + dmgtype;
                    }
                };
                if (dmgflag2 != 0) {
                    if (dmg2base === 0 && (dmg2attr + dmg2mod === 0)) {
                        dmg2 = 0;
                    }
                    if (dmg2base != 0) {
                        dmg2 = dmg2base;
                    }
                    if (dmg2base != 0 && (dmg2attr + dmg2mod != 0)) {
                        dmg2 = (dmg2attr + dmg2mod > 0) ? dmg2 + "+" : dmg2;
                    }
                    if (dmg2attr + dmg2mod != 0) {
                        dmg2 = dmg2 + (dmg2attr + dmg2mod);
                    }
                    dmg2 = dmg2 + " " + dmg2type;
                };
                update[`${repeating_attack}_atkdmgtype`] = (dmgflag1 != 0 && dmgflag2 != 0) ? `${dmg} + ${dmg2}${dmgmag} `:`${dmg}${dmg2}${dmgmag} `;

                //Build ROLL TEMPLATE with below variables
                //ATTACK checkbox inside settings for the repeating attack
                if (atkflag != 0) {
                    if (atkattr_base   != 0) {hbonus += ` + ${atkattr_base}[${atkattr_abrev}]`};
                    if (atkmod         != 0) {hbonus += ` + ${atkmod}[MOD]`};
                    if (pb             != 0) {hbonus += ` + ${pb}${pbd_safe}[PROF]`};
                    if (atkmag         != 0) {hbonus += ` + ${atkmag}[MAGIC]`};
                    if (magicattackmod != 0) {hbonus += ` + ${magicattackmod}[SPELLATK]`};
                }
                //DAMAGE 1 checkbox inside settings for the repeating attack
                if (dmgflag1 != 0) {
                    hdmg1 += dmgbase;
                    if (dmgattr != 0) {hdmg1 += ` + ${dmgattr}[${dmgattr_abrev}]`};
                    if (dmgmod  != 0) {hdmg1 += ` + ${dmgmod}[MOD]`};
                    if (atkmag  != 0) {hdmg1 += ` + ${atkmag}[MAGIC]`};
                } else {
                    hdmg1 += "0";
                }
                //DAMAGE 2 checkbox inside settings for the repeating attack
                if (dmgflag2 != 0) {
                    hdmg2 += dmg2base
                    if (dmg2attr != 0) {hdmg2 += ` + ${dmg2attr}[${dmg2attr_abrev}]`};
                    if (dmg2mod  != 0) {hdmg2 += ` + ${dmg2mod}[MOD]`};
                } else {
                    hdmg2 += "0";
                }
                //CRIT input inside settings for the repeating attack
                let crit1 = v[`${repeating_attack}_dmgcustcrit`] || 0;
                let crit2 = v[`${repeating_attack}_dmg2custcrit`] || 0;
                crit1 = (crit1 != 0) ? v[`${repeating_attack}_dmgcustcrit`] : dmgbase;
                crit2 = (crit2 != 0) ? v[`${repeating_attack}_dmg2custcrit`] : dmg2base;
                r1    = (atkflag != 0) ? "@{d20}" : "0d20";
                r2    = (atkflag != 0) ? "@{rtype}" : "{{r2=[[0d20";
                //set in the GLOBAL DAMAGE MODIFIER section
                let globaldamage = `[[${v.global_damage_mod_roll || 0}]]`;
                let globaldamagecrit = `[[${v.global_damage_mod_crit || 0}]]`;

                //Assamble Roll Templates
                if (v.dtype === "full") {
                    rollbase = `@{wtype}&{template:atkdmg} {{mod=@{atkbonus}}} {{rname=@{atkname}}} {{r1=[[${r1}cs>@{atkcritrange}${hbonus}]]}} ${r2}cs>@{atkcritrange}${hbonus}]]}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[${hdmg1}]]}} {{dmg1type=${dmgtype}}} @{dmg2flag} {{dmg2=[[${hdmg2}]]}} {{dmg2type=${dmg2type}}} {{crit1=[[${crit1}[CRIT]]]}} {{crit2=[[${crit2}[CRIT]]]}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} ${hldmgcrit} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globalattack=@{global_attack_mod}}} {{globaldamage=${globaldamage}}} {{globaldamagecrit=${globaldamagecrit}}} {{globaldamagetype=@{global_damage_mod_type}}} ammo=@{ammo} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                } else if (atkflag != 0) {
                    rollbase = `@{wtype}&{template:atk} {{mod=@{atkbonus}}} {{rname=[@{atkname}](~repeating_attack_attack_dmg)}} {{rnamec=[@{atkname}](~repeating_attack_attack_crit)}} {{r1=[[${r1}cs>@{atkcritrange}${hbonus}]]}} ${r2}cs>@{atkcritrange}${hbonus}]]}} {{range=@{atkrange}}} {{desc=@{atk_desc}}} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globalattack=@{global_attack_mod}}} ammo=@{ammo} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                } else if (dmgflag1 != 0) {
                    rollbase = `@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[${hdmg1}]]}} {{dmg1type=${dmgtype}}} @{dmg2flag} {{dmg2=[[${hdmg2}]]}} {{dmg2type=${dmg2type}}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globaldamage=${globaldamage}}} {{globaldamagetype=@{global_damage_mod_type}}} ammo=@{ammo} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                } else {
                    rollbase = `@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{saveflag} {{desc=@{atk_desc}}} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} ammo=@{ammo} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                }

                update[`${repeating_attack}_rollbase_dmg`]  = `@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[${hdmg1}]]}} {{dmg1type=${dmgtype}}} @{dmg2flag} {{dmg2=[[${hdmg2}]]}} {{dmg2type=${dmg2type}}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globaldamage=${globaldamage}}} {{globaldamagetype=@{global_damage_mod_type}}} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                update[`${repeating_attack}_rollbase_crit`] = `@{wtype}&{template:dmg} {{crit=1}} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[${hdmg1}]]}} {{dmg1type=${dmgtype}}} @{dmg2flag} {{dmg2=[[${hdmg2}]]}} {{dmg2type=${dmg2type}}} {{crit1=[[${crit1}]]}} {{crit2=[[${crit2}]]}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} ${hldmgcrit} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globaldamage=${globaldamage}}} {{globaldamagecrit=${globaldamagecrit}}} {{globaldamagetype=@{global_damage_mod_type}}} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                update[`${repeating_attack}_atkbonus`]      = bonus;
                update[`${repeating_attack}_rollbase`]      = rollbase;

                if (v[`${repeating_attack}_spellid`] && v[`${repeating_attack}_spellid`] != "" && (!source || source && source != "spell") && v[`${repeating_attack}_spellid`].length == 20) {
                    const spellid = v[`${repeating_attack}_spellid`];
                    const lvl     = v[`${repeating_attack}_spelllevel`];
                    callbacks.push(() => {
                        update_spell_from_attack(lvl, spellid, attackid);
                    });
                }
                if (v[`${repeating_attack}_itemid`] && v[`${repeating_attack}_itemid`] != "" && (!source || source && source != "item")) {
                    const itemid = v[`${repeating_attack}_itemid`];
                    callbacks.push(() => {
                        update_item_from_attack(itemid, attackid);
                    });
                }
                setAttrs(update, {silent: true}, () => {
                    callbacks.forEach((callback) => {
                        callback();
                    });
                });
            });
        });
    };

    //Update spells in the attack section
    const update_spell_from_attack = (lvl, spellid, attackid) => {
        const repeating_attack = `repeating_attack_${attackid}`;
        const repeating_spell = `repeating_spell-${lvl}_${spellid}`;
        let update = {};
        getAttrs([`${repeating_attack}_atkname`, `${repeating_attack}_atkrange`, `${repeating_attack}_atkflag`, `${repeating_attack}_atkattr_base`, `${repeating_attack}_dmgbase`, `${repeating_attack}_dmgtype`, `${repeating_attack}_dmg2base`, `${repeating_attack}_dmg2type`, `${repeating_attack}_saveflag`, `${repeating_attack}_saveattr`, `${repeating_attack}_saveeffect`], (v) => {
            update[`${repeating_spell}_spellname`]        = v[`${repeating_attack}_atkname`];
            update[`${repeating_spell}_spellrange`]       = v[`${repeating_attack}_atkrange`] || "";
            update[`${repeating_spell}_spellsavesuccess`] = v[`${repeating_attack}_saveeffect`] || "";

            if (v[`${repeating_attack}_dmgtype`] && v[`${repeating_attack}_dmgtype`].toLowerCase() == "healing") {
                if (v[`${repeating_attack}_dmgbase`] && v[`${repeating_attack}_dmgbase`] != "") {
                    update[`${repeating_spell}_spellhealing`] = v[`${repeating_attack}_dmgbase`];
                }
            } else {
                if (v[`${repeating_attack}_dmgbase`] && v[`${repeating_attack}_dmgbase`] != "" && v[`${repeating_attack}_dmgbase`].indexOf("[[round((@{level} + 1) / 6 + 0.5)]]") === -1) {
                    update[`${repeating_spell}_spelldamage`] = v[`${repeating_attack}_dmgbase`];
                } else if (!v[`${repeating_attack}_dmgbase`] || v[`${repeating_attack}_dmgbase`] === "") {
                    update[`${repeating_spell}_spelldamage`] = "";
                }

                update[`${repeating_spell}_spelldamagetype`] = v[`${repeating_attack}_dmgtype`] || "";
            };
            if (v[`${repeating_attack}_dmg2type`] && v[`${repeating_attack}_dmg2type`].toLowerCase() === "healing") {
                if (v[`${repeating_attack}_dmgbase`] && v[`${repeating_attack}_dmgbase`] != "") {
                    update[`${repeating_spell}_spellhealing`] = v[`${repeating_attack}_dmgbase`];
                }
            } else {
                update[`${repeating_spell}_spelldamage2`] = v[`${repeating_attack}_dmg2base`] || "";
                update[`${repeating_spell}_spelldamagetype2`] = v[`${repeating_attack}_dmg2type`] || "";
            };

            //SAVING THROW checkbox inside settings for the repeating attack
            update[`${repeating_spell}_spellsave`] =  (v[`${repeating_attack}_saveflag`] && v[`${repeating_attack}_saveflag`] != "0") ? v[`${repeating_attack}_saveattr`] : "";
            setAttrs(update, {silent: true});
        });
    };

    var update_item_from_attack = function(itemid, attackid) {
        getAttrs(["repeating_attack_" + attackid + "_atkname", "repeating_attack_" + attackid + "_dmgbase", "repeating_attack_" + attackid + "_dmg2base", "repeating_attack_" + attackid + "_dmgtype", "repeating_attack_" + attackid + "_dmg2type", "repeating_attack_" + attackid + "_atkrange", "repeating_attack_" + attackid + "_atkmod", "repeating_attack_" + attackid + "_dmgmod", "repeating_inventory_" + itemid + "_itemmodifiers", "repeating_attack_" + attackid + "_versatile_alt", "repeating_inventory_" + itemid + "_itemproperties", "repeating_attack_" + attackid + "_atkmagic"], function(v) {
            var update = {};
            var mods = v["repeating_inventory_" + itemid + "_itemmodifiers"];
            var damage = v["repeating_attack_" + attackid + "_dmgbase"] ? v["repeating_attack_" + attackid + "_dmgbase"] : 0;
            var damage2 = v["repeating_attack_" + attackid + "_dmg2base"] ? v["repeating_attack_" + attackid + "_dmg2base"] : 0;
            var damagetype = v["repeating_attack_" + attackid + "_dmgtype"] ? v["repeating_attack_" + attackid + "_dmgtype"] : 0;
            var damagetype2 = v["repeating_attack_" + attackid + "_dmg2type"] ? v["repeating_attack_" + attackid + "_dmg2type"] : 0;
            var range = v["repeating_attack_" + attackid + "_atkrange"] ? v["repeating_attack_" + attackid + "_atkrange"] : 0;
            var attackmod = v["repeating_attack_" + attackid + "_atkmod"] ? v["repeating_attack_" + attackid + "_atkmod"] : 0;
            var damagemod = v["repeating_attack_" + attackid + "_dmgmod"] ? v["repeating_attack_" + attackid + "_dmgmod"] : 0;
            var magicmod = v["repeating_attack_" + attackid + "_atkmagic"] ? v["repeating_attack_" + attackid + "_atkmagic"] : 0;
            var atktype = "";
            var altprefix = v["repeating_attack_" + attackid + "_versatile_alt"] === "1" ? "Alternate " : "";

            if(/Alternate Damage:/i.test(v["repeating_inventory_" + itemid + "_itemmodifiers"])) {
                update["repeating_inventory_" + itemid + "_itemname"] = v["repeating_attack_" + attackid + "_atkname"].replace(/\s*(?:\(One-Handed\)|\(Two-Handed\))/, "");
            } else {
                update["repeating_inventory_" + itemid + "_itemname"] = v["repeating_attack_" + attackid + "_atkname"];
            }

            var attack_type_regex = /(?:^|,)\s*Item Type: (Melee|Ranged) Weapon(?:,|$)/i;
            var attack_type_results = attack_type_regex.exec(v["repeating_inventory_" + itemid + "_itemmodifiers"]);
            atktype = attack_type_results ? attack_type_results[1] : "";
            if(mods) {
                mods = mods.split(",");
            } else {
                mods = [];
            }

            var damage_regex = new RegExp("^\\s*" + altprefix + "Damage:\\s*(.+)$", "i");
            var damage_found = false;
            for(var i = 0; i < mods.length; i++) {
                if(damage_found = damage_regex.exec(mods[i])) {
                    if(damage !== 0) {
                        mods[i] = mods[i].replace(damage_found[1], damage);
                    } else {
                        mods.splice(i, 1);
                    }
                    break;
                }
            }
            if(!damage_found && damage !== 0) {
                mods.push(altprefix + "Damage: " + damage);
            }

            var damage2_regex = new RegExp("^\\s*" + altprefix + "Secondary Damage:\\s*(.+)$", "i");
            var damage2_found = false;
            for(var i = 0; i < mods.length; i++) {
                if(damage2_found = damage2_regex.exec(mods[i])) {
                    if(damage2 !== 0) {
                        mods[i] = mods[i].replace(damage2_found[1], damage2);
                    } else {
                        mods.splice(i, 1);
                    }
                    break;
                }
            }
            if(!damage2_found && damage2 !== 0) {
                mods.push(altprefix + "Secondary Damage: " + damage2);
            }

            var dmgtype_regex = new RegExp("^\\s*" + altprefix + "Damage Type:\\s*(.+)$", "i");
            var dmgtype_found = false;
            for(var i = 0; i < mods.length; i++) {
                if(dmgtype_found = dmgtype_regex.exec(mods[i])) {
                    if(damagetype !== 0) {
                        mods[i] = mods[i].replace(dmgtype_found[1], damagetype);
                    } else {
                        mods.splice(i, 1);
                    }
                    break;
                }
            }
            if(!dmgtype_found && damagetype !== 0) {
                mods.push(altprefix + "Damage Type: " + damagetype);
            }

            var dmgtype2_regex = new RegExp("^\\s*" + altprefix + "Secondary Damage Type:\\s*(.+)$", "i");
            var dmgtype2_found = false;
            for(var i = 0; i < mods.length; i++) {
                if(dmgtype2_found = dmgtype2_regex.exec(mods[i])) {
                    if(damagetype2 !== 0) {
                        mods[i] = mods[i].replace(dmgtype_found[1], damagetype);
                    } else {
                        mods.splice(i, 1);
                    }
                    break;
                }
            }
            if(!dmgtype2_found && damagetype2 !== 0) {
                mods.push(altprefix + "Secondary Damage Type: " + damagetype2);
            }

            var range_found = false;
            for(var i = 0; i < mods.length; i++) {
                if(range_found = /^\s*Range:\s*(.+)$/i.exec(mods[i])) {
                    if(range !== 0) {
                        mods[i] = mods[i].replace(range_found[1], range);
                    } else {
                        mods.splice(i, 1);
                    }
                    break;
                }
            }
            if(!range_found && range !== 0) {
                mods.push("Range: " + range);
            }

            var attackmod_regex = new RegExp("^\\s*(?:" + (atktype !== "" ? atktype + "|" : "") + "Weapon) Attacks \\+?(.+)$", "i");
            var attackmod_found = false;
            for(var i = 0; i < mods.length; i++) {
                if(attackmod_found = attackmod_regex.exec(mods[i])) {
                    if(magicmod !== 0 || attackmod !== 0) {
                        mods[i] = mods[i].replace(attackmod_found[1], magicmod !== 0 ? magicmod : attackmod);
                    } else {
                        mods.splice(i, 1);
                    }
                    break;
                }
            }
            if(!attackmod_found && (magicmod !== 0 || attackmod !== 0)) {
                var properties = v["repeating_inventory_" + itemid + "_itemproperties"];
                if(properties && /Thrown/i.test(properties)) {
                    mods.push("Weapon Attacks: " + (magicmod !== 0 ? magicmod : attackmod));
                }
                else {
                    mods.push(atktype + " Attacks: " + (magicmod !== 0 ? magicmod : attackmod));
                }
            }

            var damagemod_regex = new RegExp("^\\s*(?:" + (atktype !== "" ? atktype + "|" : "") + "Weapon) Damage \\+?(.+)$", "i");
            var damagemod_found = false;
            for(var i = 0; i < mods.length; i++) {
                if(damagemod_found = damagemod_regex.exec(mods[i])) {
                    if(magicmod !== 0 || damagemod !== 0) {
                        mods[i] = mods[i].replace(damagemod_found[1], magicmod !== 0 ? magicmod : attackmod);
                    } else {
                        mods.splice(i, 1);
                    }
                    break;
                }
            }
            if(!damagemod_found && (magicmod !== 0 || damagemod !== 0)) {
                var properties = v["repeating_inventory_" + itemid + "_itemproperties"];
                if(properties && /Thrown/i.test(properties)) {
                    mods.push("Weapon Damage: " + (magicmod !== 0 ? magicmod : damagemod));
                }
                else {
                    mods.push(atktype + " Damage: " + (magicmod !== 0 ? magicmod : damagemod));
                }
            }

            update["repeating_inventory_" + itemid + "_itemmodifiers"] = mods.join(",");

            setAttrs(update, {silent: true});
        });
    };

    var remove_attack = function(attackid) {
        removeRepeatingRow("repeating_attack_" + attackid);
    };

    const remove_resource = (id) => {
        const attr = (id === "other_resource") ? id : `repeating_resource_${id}_itemid`;
        let update = {};
        getAttrs([`${attr}`], (v) => {
            const itemid = v[`${attr}`];
            //Uncheck Use As A Resource in inventory for an item if its resource row is deleted
            if (itemid) {
                update[`repeating_inventory_${itemid}_useasresource`]  = 0;
                update[`repeating_inventory_${itemid}_itemresourceid`] = "";
            };
            if (id == "other_resource") {
                update["other_resource"]        = "";
                update["other_resource_name"]   = "";
                update["other_resource_itemid"] = "";
                setAttrs(update, {silent: true});
            } else {
                const currentID = id.replace("repeating_resource_", "").substring(0,20);
                const side  = (id.includes("left")) ? `right` : `left`;
                //Get the inputs for the opposite side to see if they are empty.
                //If they are empty delete the entire row. Otherwise set the side that was the source of this event to empty strings
                getAttrs([`repeating_resource_${currentID}_resource_${side}`, `repeating_resource_${currentID}_resource_${side}_name`, `repeating_resource_${currentID}_resource_${side}_max`], (v) => {
                    const Name  = v[`repeating_resource_${currentID}_resource_${side}_name`] || false;
                    const Value = v[`repeating_resource_${currentID}_resource_${side}`] || false;
                    const Max   = v[`repeating_resource_${currentID}_resource_${side}_max`] || false;
                    if (!Name && !Value && !Max) {
                        removeRepeatingRow(`repeating_resource_${currentID}`);
                    } else {
                        update[`repeating_resource_${id}`]        = "";
                        update[`repeating_resource_${id}_name`]   = "";
                        update[`repeating_resource_${id}_max`]    = "";
                        update[`repeating_resource_${id}_itemid`] = "";
                    };
                    setAttrs(update, {silent: true});
                });
            };
        });
    };

    const update_weight = function() {
        let update = {};
        let wtotal = 0;
        let weight_attrs = ["cp","sp","ep","gp","pp","encumberance_setting","strength","size","carrying_capacity_mod"];
        getSectionIDs("repeating_inventory", (idarray) => {
            _.each(idarray, (currentID, i) => {
                weight_attrs.push(`repeating_inventory_${currentID}_itemweight`);
                weight_attrs.push(`repeating_inventory_${currentID}_itemcount`);
            });
            getAttrs(weight_attrs, (v) => {
                let coinWeight = 0;
                ["cp", "sp", "ep", "gp", "pp"].forEach((type)=> {
                    coinWeight += (isNaN(parseInt(v[`${type}`], 10)) === false) ? parseInt(v[`${type}`], 10) : 0;
                });
                wtotal = wtotal + ((coinWeight) / 50);

                _.each(idarray, (currentID, i) => {
                    if (v[`repeating_inventory_${currentID}_itemweight`] && isNaN(parseInt(v[`repeating_inventory_${currentID}_itemweight`], 10)) === false) {
                        count = v[`repeating_inventory_${currentID}_itemcount`] && isNaN(parseFloat(v[`repeating_inventory_${currentID}_itemcount`])) === false ? parseFloat(v[`repeating_inventory_${currentID}_itemcount`]) : 1;
                        wtotal = wtotal + (parseFloat(v[`repeating_inventory_${currentID}_itemweight`]) * count);
                    }
                });

                update["weighttotal"] = wtotal;

                const str_base = parseInt(v.strength, 10);
                let size_multiplier = 1;
                if (v["size"] && v["size"] != "") {
                    const size = v["size"].toLowerCase().trim();
                    size_multiplier =
                        (size === "tiny") ? .5 : (size === "large") ? 2 : (size === "huge") ? 4 : (size === "gargantuan") ? 8 : size_multiplier;
                };
                let str = str_base*size_multiplier;
                // Parse the carrying capacitiy modificator if any
                if (v.carrying_capacity_mod) {
                    const operator = v.carrying_capacity_mod.substring(0,1);
                    const value    = v.carrying_capacity_mod.substring(1);
                    if(["*","x","+","-"].indexOf(operator) > -1 && isNaN(parseFloat(value,10)) === false) {
                        str =
                            (operator === "*" || operator == "x") ? str*parseFloat(value,10) :
                            (operator === "+") ? str+parseFloat(value,10) :
                            (operator === "-") ? str-parseFloat(value,10) :
                            str;
                    }
                }

                if (!v.encumberance_setting || v.encumberance_setting === "off") {
                    update["encumberance"] = (wtotal > str*15) ? "OVER CARRYING CAPACITY" : " ";
                } else if (v.encumberance_setting === "on") {
                    update["encumberance"] =
                        (wtotal > str*15) ? "IMMOBILE" :
                        (wtotal > str*10) ? "HEAVILY ENCUMBERED" :
                        (wtotal > str*5)  ? "ENCUMBERED" :
                        " ";
                } else {
                    update["encumberance"] = " ";
                }

                setAttrs(update, {silent: true});

            });
        });
    };

    var update_ac = function() {
        getAttrs(["custom_ac_flag"], function(v) {
            if(v.custom_ac_flag === "2") {
                return;
            }
            else {
                var update = {};
                var ac_attrs = ["simpleinventory","custom_ac_base","custom_ac_part1","custom_ac_part2","strength_mod","dexterity_mod","constitution_mod","intelligence_mod","wisdom_mod","charisma_mod", "custom_ac_shield"];
                getSectionIDs("repeating_acmod", function(acidarray) {
                    _.each(acidarray, function(currentID, i) {
                        ac_attrs.push("repeating_acmod_" + currentID + "_global_ac_val");
                        ac_attrs.push("repeating_acmod_" + currentID + "_global_ac_active_flag");
                    });
                    getSectionIDs("repeating_inventory", function(idarray) {
                        _.each(idarray, function(currentID, i) {
                            ac_attrs.push("repeating_inventory_" + currentID + "_equipped");
                            ac_attrs.push("repeating_inventory_" + currentID + "_itemmodifiers");
                        });
                        getAttrs(ac_attrs, function(b) {
                            var custom_total = 0;
                            if(v.custom_ac_flag === "1") {
                                var base = isNaN(parseInt(b.custom_ac_base, 10)) === false ? parseInt(b.custom_ac_base, 10) : 10;
                                var part1attr = b.custom_ac_part1.toLowerCase();
                                var part2attr = b.custom_ac_part2.toLowerCase();
                                var part1 = part1attr === "none" ? 0 : parseInt(b[part1attr + "_mod"], 10);
                                var part2 = part2attr === "none" ? 0 : parseInt(b[part2attr + "_mod"], 10);
                                custom_total = base + part1 + part2;
                            }
                            var globalacmod = 0;
                            _.each(acidarray, function(currentID, i) {
                                if(b["repeating_acmod_" + currentID + "_global_ac_active_flag"] == "1") {
                                    globalacmod += parseInt(b["repeating_acmod_" + currentID + "_global_ac_val"], 10);
                                }
                            });
                            var dexmod = +b["dexterity_mod"];
                            var total = 10 + dexmod;
                            var armorcount = 0;
                            var shieldcount = 0;
                            var armoritems = [];
                            if(b.simpleinventory === "complex") {
                                _.each(idarray, function(currentID, i) {
                                    if(b["repeating_inventory_" + currentID + "_equipped"] && b["repeating_inventory_" + currentID + "_equipped"] === "1" && b["repeating_inventory_" + currentID + "_itemmodifiers"] && b["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().indexOf("ac") > -1) {
                                        var mods = b["repeating_inventory_" + currentID + "_itemmodifiers"].split(",");
                                        var ac = 0;
                                        var type = "mod";
                                        _.each(mods, function(mod) {
                                            if(mod.substring(0,10) === "Item Type:") {
                                                type = mod.substring(11, mod.length).trim().toLowerCase();
                                            }
                                            if(mod.toLowerCase().indexOf("ac:") > -1 || mod.toLowerCase().indexOf("ac +") > -1 || mod.toLowerCase().indexOf("ac+") > -1) {
                                                var regex = mod.replace(/[^0-9]/g, "");
                                                var bonus = regex && regex.length > 0 && isNaN(parseInt(regex,10)) === false ? parseInt(regex,10) : 0;
                                                ac = ac + bonus;
                                            }
                                            if(mod.toLowerCase().indexOf("ac -") > -1 || mod.toLowerCase().indexOf("ac-") > -1) {
                                                var regex = mod.replace(/[^0-9]/g, "");
                                                var bonus = regex && regex.length > 0 && isNaN(parseInt(regex,10)) === false ? parseInt(regex,10) : 0;
                                                ac = ac - bonus;
                                            }
                                        });
                                        armoritems.push({type: type, ac: ac});
                                    }
                                });
                                armorcount = armoritems.filter(function(item){ return item["type"].indexOf("armor") > -1 }).length;
                                shieldcount = armoritems.filter(function(item){ return item["type"].indexOf("shield") > -1 }).length;
                                var base = dexmod;
                                var armorac = 10;
                                var shieldac = 0;
                                var modac = 0;

                                _.each(armoritems, function(item) {
                                    if(item["type"].indexOf("light armor") > -1) {
                                        armorac = item["ac"];
                                        base = dexmod;
                                    }
                                    else if(item["type"].indexOf("medium armor") > -1) {
                                        armorac = item["ac"];
                                        base = Math.min(dexmod, 2);
                                    }
                                    else if(item["type"].indexOf("heavy armor") > -1) {
                                        armorac = item["ac"];
                                        base = 0;
                                    }
                                    else if(item["type"].indexOf("shield") > -1) {
                                        shieldac = item["ac"];
                                    }
                                    else {
                                        modac = modac + item["ac"]
                                    }
                                });

                                total = base + armorac + shieldac + modac;

                            };
                            update["armorwarningflag"] = "hide";
                            update["customacwarningflag"] = "hide";
                            if(armorcount > 1 || shieldcount > 1) {
                                update["armorwarningflag"] = "show";
                            }
                            update["ac"] = total + globalacmod;
                            if(custom_total > 0) {
                                if(armorcount > 0 || (shieldcount > 0 && b.custom_ac_shield != "yes")) {
                                    update["customacwarningflag"] = "show";
                                }
                                else {
                                    update["ac"] = b.custom_ac_shield == "yes" ? custom_total + shieldac + globalacmod + modac : custom_total + globalacmod + modac;
                                }
                            }
                            setAttrs(update, {silent: true});
                        });
                    });
                });
            };
        });
    };

    var check_customac = function(attr) {
        getAttrs(["custom_ac_flag","custom_ac_part1","custom_ac_part2"], function(v) {
            if(v["custom_ac_flag"] && v["custom_ac_flag"] === "1" && ((v["custom_ac_part1"] && v["custom_ac_part1"] === attr) || (v["custom_ac_part2"] && v["custom_ac_part2"] === attr))) {
                update_ac();
            }
        });
    };

    const update_initiative = () => {
        const attrs_to_get = ["dexterity","dexterity_mod","initmod","jack_of_all_trades","jack","init_tiebreaker","pb_type"];
        getSectionIDs("repeating_inventory", (idarray) => {
            _.each(idarray, (currentID) => {
                attrs_to_get.push(`repeating_inventory_${currentID}_equipped`);
                attrs_to_get.push(`repeating_inventory_${currentID}_itemmodifiers`);
            });
            getAttrs(attrs_to_get, (v) => {
                let update = {};
                let final_init = parseInt(v["dexterity_mod"], 10);
                if (v["initmod"] && !isNaN(parseInt(v["initmod"], 10))) {
                    final_init = final_init + parseInt(v["initmod"], 10);
                }
                if (v["init_tiebreaker"] && v["init_tiebreaker"] != 0) {
                    final_init = final_init + (parseInt(v["dexterity"], 10)/100);
                }
                if (v["jack_of_all_trades"] && v["jack_of_all_trades"] != 0) {
                    if (v["pb_type"] && v["pb_type"] === "die" && v["jack"]) {
                        final_init = final_init + "+" + v["jack"];
                    } else if (v["jack"] && !isNaN(parseInt(v["jack"], 10))) {
                        final_init = final_init + parseInt(v["jack"], 10);
                    }
                }
                _.each(idarray, (currentID) => {
                    if (v[`repeating_inventory_${currentID}_equipped`] && v[`repeating_inventory_${currentID}_equipped`] === "1" && v[`repeating_inventory_${currentID}_itemmodifiers`] && v[`repeating_inventory_${currentID}_itemmodifiers`].toLowerCase().indexOf("ability checks") > -1) {
                        const mods = v[`repeating_inventory_${currentID}_itemmodifiers`].toLowerCase().split(",");
                        _.each(mods, (mod) => {
                            if (mod.indexOf("ability checks") > -1) {
                                const new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                                final_init = (mod.indexOf("-") > -1 && new_mod) ? final_init - new_mod : (new_mod) ? final_init + new_mod  : final_init;
                            }
                        });
                    }
                });
                if (final_init % 1 != 0) {
                    final_init = parseFloat(final_init.toPrecision(12)); // ROUNDING ERROR BUGFIX
                }
                update["initiative_bonus"] = final_init;
                setAttrs(update, {silent: true});
            });
        });
    };

    const update_class = () => {
        getAttrs(["class", "base_level","custom_class","cust_hitdietype","cust_spellcasting_ability","cust_strength_save_prof","cust_dexterity_save_prof","cust_constitution_save_prof","cust_intelligence_save_prof","cust_wisdom_save_prof","cust_charisma_save_prof", "npc"], (v) => {
            if (v.npc && v.npc == "1") { return; }
            const abilites = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
            //Custom Classes
            if (v.custom_class && v.custom_class != "0") {
                update = {};
                update["hitdietype"] = v.cust_hitdietype;
                update["spellcasting_ability"] = v.cust_spellcasting_ability;
                abilites.forEach((save) => {
                    const ability = save.toLowerCase();
                    update[`${ability}_save_prof`] = v[`cust_${ability}_save_prof`];
                });
                setAttrs(update, {silent: true});
            //If "Choose" has been selected in the select
            } else if (v.class === "") {
                update = {};
                update["hitdietype"] = 6;
                update["spellcasting_ability"] = "0*";
                abilites.forEach((save) => {
                    const ability = save.toLowerCase();
                    update[`${ability}_save_prof`] = 0;
                });
                setAttrs(update, {silent: true});
            //Standard classes can pull their data from the Comependium
            } else {
                getCompendiumPage(v.class, (pages) => {
                    pages = removeDuplicatedPageData(pages);
                    update = {};
                    const classPages = (Array.isArray(pages)) ? pages : [pages];
                    classPages.forEach((classData) => {
                        if (classData.data && 'Category' in classData.data && classData.data[`Category`] === "Classes") {
                            update["hitdietype"]           = classData.data["Hit Die"].slice(1);
                            update["spellcasting_ability"] = (classData.data["Spellcasting Ability"]) ? `@{${classData.data["Spellcasting Ability"].toLowerCase()}_mod}+` : "0*";
                            abilites.forEach((save) => {
                                const ability = save.toLowerCase();
                                update[`${ability}_save_prof`] = (classData.data["data-Saving Throws"].indexOf(`${save}`) > -1) ? "(@{pb})" : 0;
                                update_save(ability);;
                            });
                        };

                        setAttrs(update, {silent: true});
                        //Update Spell info to change or remove casting attributes in Spells
                        update_spell_info();
                    });
                });
            };
        });
        set_level();
    };

    const set_level = function() {
        getAttrs(["base_level","multiclass1_flag","multiclass2_flag","multiclass3_flag","multiclass1_lvl","multiclass2_lvl","multiclass3_lvl","class","multiclass1","multiclass2","multiclass3", "arcane_fighter", "arcane_rogue", "custom_class", "cust_spellslots", "cust_classname", "level_calculations", "class", "subclass", "multiclass1_subclass","multiclass2_subclass","multiclass3_subclass"], (v) => {
            let update        = {};
            let callbacks     = [];
            const multiclass  = (v[`multiclass1_flag`] && v[`multiclass1_flag`] === "1") || (v.multiclass2_flag && v.multiclass2_flag === "1") || (v.multiclass3_flag && v.multiclass3_flag === "1") ? true : false;
            const finalclass  = (v[`custom_class`] && v[`custom_class`] != "0") ? v[`cust_spellslots`] : v[`class`];
            let finallevel    = (v[`base_level`] && v[`base_level`] > 0) ? parseInt(v.base_level,10) : 1;
            const charclass   = (v[`custom_class`] && v[`custom_class`] != "0") ? v[`cust_classname`] : v[`class`];
            let hitdie_final  = (multiclass) ? `?{Hit Die Class|${charclass},@{hitdietype}` : "@{hitdietype}";
            const subclass    = (v[`subclass`]) ? v[`subclass`] + " " : "";
            let class_display = `${subclass}${charclass} ${finallevel}`;

            // This nested array is used to determine the overall spellcasting level for the character.
            var classes = [ [finalclass.toLowerCase(), v[`base_level`]] ];

            ["multiclass1", "multiclass2", "multiclass3"].forEach((multiclass) => {
                 if (v[`${multiclass}_flag`] && v[`${multiclass}_flag`] === "1") {
                    const multiclasslevel = (v[`${multiclass}_lvl`] && v[`${multiclass}_lvl`] > 0) ? parseInt(v[`${multiclass}_lvl`], 10) : 1;
                    const subclass = (v[`${multiclass}_subclass`]) ? v[`${multiclass}_subclass`] + " " : "";
                    finallevel = finallevel + multiclasslevel;
                    hitdie_final = `${hitdie_final}|` + v[`${multiclass}`].charAt(0).toUpperCase() + v[`${multiclass}`].slice(1) + "," + checkHitDie(v[`${multiclass}`]);
                    classes.push([ v[`${multiclass}`], multiclasslevel ]);
                    class_display = `${class_display}, ${subclass}` + v[`${multiclass}`] + ` ${multiclasslevel}`;
                };
            });

            const casterlevel = checkCasterLevel(classes, v[`arcane_fighter`], v[`arcane_rogue`]);

            update["hitdie_final"]  = (multiclass) ? `${hitdie_final}}` : hitdie_final;
            update["level"]         = finallevel;
            update["caster_level"]  = casterlevel;
            update["class_display"] = class_display;

            if(!v["level_calculations"] || v["level_calculations"] === "on") {
                update["hit_dice_max"] = finallevel;
                callbacks.push(() => {update_spell_slots();} );
            }
            callbacks.push(() => {update_pb();} );
            callbacks.push(() => {update_leveler_display();} );
            setAttrs(update, {silent: true},() => {callbacks.forEach((callback) => {callback(); })} );
        });
    };

    var isMultiCaster = function(classes, arcane_fighter, arcane_rogue) {
        var singlecaster = false;
        var multicaster = false;
        _.each(classes, function(multiclass) {
            var caster = getCasterType(multiclass[0], multiclass[1], arcane_fighter, arcane_rogue) > 0;
            if(caster && singlecaster) {
                multicaster = true;
            } else if(caster) {
                singlecaster = true;
            }
        });
        return multicaster;
    };

    var getCasterType = function(class_string, levels, arcane_fighter, arcane_rogue) {
        var full = ["bard","cleric","druid","sorcerer","wizard","full"];
        var half = ["artificer","paladin","ranger","half"];
        class_string = class_string.toLowerCase();
        if(full.indexOf(class_string) != -1) {
            return 1;
        } else if(half.indexOf(class_string) != -1) {
            if(class_string === "artificer" && levels == 1) return 1;
            return (levels == 1) ? 0 : (1/2);
        } else if(class_string === "third" || (class_string === "fighter" && arcane_fighter === "1") || (class_string === "rogue" && arcane_rogue === "1")) {
            return (levels == 1 || levels == 2) ? 0 : (1/3);
        } else {
            return 0;
        }
    };

    var checkCasterLevel = function(classes, arcane_fighter, arcane_rogue) {
        console.log("CHECKING CASTER LEVEL");
        var multicaster = isMultiCaster(classes, arcane_fighter, arcane_rogue);
        var totalcasterlevel = 0;
        _.each(classes, function(multiclass) {
            var casterlevel = parseInt(multiclass[1], 10) * getCasterType(multiclass[0], multiclass[1], arcane_fighter, arcane_rogue);
            // Characters with multiple spellcasting classes round down the casting level for that class
            // Character with a single spellcasting class round up the casting level
            totalcasterlevel = totalcasterlevel + (multicaster ? Math.floor(casterlevel) : Math.ceil(casterlevel));
        });
        return totalcasterlevel;
    };

    var checkHitDie = function(class_string) {
        var d10class = ["fighter","paladin","ranger"];
        var d8class = ["artificer","bard","cleric","druid","monk","rogue","warlock"];
        var d6class = ["sorcerer","wizard"];
        class_string = class_string.toLowerCase();
        if(class_string === "barbarian") {return "12"}
        else if (d10class.indexOf(class_string) != -1) {return "10"}
        else if (d8class.indexOf(class_string) != -1) {return "8"}
        else if (d6class.indexOf(class_string) != -1) {return "6"}
        else {return "0"};
    };

    var update_leveler_display = function () {
        getAttrs(["experience","level"], function(v) {
            let lvl = 0;
            let exp = 0;
            let update = {};
            update["showleveler"] = 0;
            if(v["level"] && !isNaN(parseInt(v["level"], 10)) && parseInt(v["level"], 10) > 0) {
                lvl = parseInt(v["level"], 10);
            }
            if(v["experience"] && !isNaN(parseInt(v["experience"], 10)) && parseInt(v["experience"], 10) > 0) {
                exp = parseInt(v["experience"], 10);
            }
            if(lvl > 0 && exp > 0) {
                if((lvl === 1 && exp >= 300) || (lvl === 2 && exp >= 900) || (lvl === 3 && exp >= 2700) || (lvl === 4 && exp >= 6500) || (lvl === 5 && exp >= 14000) || (lvl === 6 && exp >= 23000) || (lvl === 7 && exp >= 34000) || (lvl === 8 && exp >= 48000) || (lvl === 9 && exp >= 64000) || (lvl === 10 && exp >= 85000) || (lvl === 11 && exp >= 100000) || (lvl === 12 && exp >= 120000) || (lvl === 13 && exp >= 140000) || (lvl === 14 && exp >= 165000) || (lvl === 15 && exp >= 195000) || (lvl === 16 && exp >= 225000) || (lvl === 17 && exp >= 265000) || (lvl === 18 && exp >= 305000) || (lvl === 19 && exp >= 355000)) {
                    update["showleveler"] = 1;
                };
            };
            setAttrs(update, {silent: true});
        });
    };

    var update_spell_slots = function() {
        getAttrs(["lvl1_slots_mod","lvl2_slots_mod","lvl3_slots_mod","lvl4_slots_mod","lvl5_slots_mod","lvl6_slots_mod","lvl7_slots_mod","lvl8_slots_mod","lvl9_slots_mod","caster_level"], function(v) {
            var update = {};
            var lvl = v["caster_level"] && !isNaN(parseInt(v["caster_level"], 10)) ? parseInt(v["caster_level"], 10) : 0;
            var l1 = v["lvl1_slots_mod"] && !isNaN(parseInt(v["lvl1_slots_mod"], 10)) ? parseInt(v["lvl1_slots_mod"], 10) : 0;
            var l2 = v["lvl2_slots_mod"] && !isNaN(parseInt(v["lvl2_slots_mod"], 10)) ? parseInt(v["lvl2_slots_mod"], 10) : 0;
            var l3 = v["lvl3_slots_mod"] && !isNaN(parseInt(v["lvl3_slots_mod"], 10)) ? parseInt(v["lvl3_slots_mod"], 10) : 0;
            var l4 = v["lvl4_slots_mod"] && !isNaN(parseInt(v["lvl4_slots_mod"], 10)) ? parseInt(v["lvl4_slots_mod"], 10) : 0;
            var l5 = v["lvl5_slots_mod"] && !isNaN(parseInt(v["lvl5_slots_mod"], 10)) ? parseInt(v["lvl5_slots_mod"], 10) : 0;
            var l6 = v["lvl6_slots_mod"] && !isNaN(parseInt(v["lvl6_slots_mod"], 10)) ? parseInt(v["lvl6_slots_mod"], 10) : 0;
            var l7 = v["lvl7_slots_mod"] && !isNaN(parseInt(v["lvl7_slots_mod"], 10)) ? parseInt(v["lvl7_slots_mod"], 10) : 0;
            var l8 = v["lvl8_slots_mod"] && !isNaN(parseInt(v["lvl8_slots_mod"], 10)) ? parseInt(v["lvl8_slots_mod"], 10) : 0;
            var l9 = v["lvl9_slots_mod"] && !isNaN(parseInt(v["lvl9_slots_mod"], 10)) ? parseInt(v["lvl9_slots_mod"], 10) : 0;
            if(lvl > 0) {
                l1 = l1 + Math.min((lvl + 1),4);
                if(lvl < 3) {l2 = l2 + 0;} else if(lvl === 3) {l2 = l2 + 2;} else {l2 = l2 + 3;};
                if(lvl < 5) {l3 = l3 + 0;} else if(lvl === 5) {l3 = l3 + 2;} else {l3 = l3 + 3;};
                if(lvl < 7) {l4 = l4 + 0;} else if(lvl === 7) {l4 = l4 + 1;} else if(lvl === 8) {l4 = l4 + 2;} else {l4 = l4 + 3;};
                if(lvl < 9) {l5 = l5 + 0;} else if(lvl === 9) {l5 = l5 + 1;} else if(lvl < 18) {l5 = l5 + 2;} else {l5 = l5 + 3;};
                if(lvl < 11) {l6 = l6 + 0;} else if(lvl < 19) {l6 = l6 + 1;} else {l6 = l6 + 2;};
                if(lvl < 13) {l7 = l7 + 0;} else if(lvl < 20) {l7 = l7 + 1;} else {l7 = l7 + 2;};
                if(lvl < 15) {l8 = l8 + 0;} else {l8 = l8 + 1;};
                if(lvl < 17) {l9 = l9 + 0;} else {l9 = l9 + 1;};
            };

            update["lvl1_slots_total"] = l1;
            update["lvl2_slots_total"] = l2;
            update["lvl3_slots_total"] = l3;
            update["lvl4_slots_total"] = l4;
            update["lvl5_slots_total"] = l5;
            update["lvl6_slots_total"] = l6;
            update["lvl7_slots_total"] = l7;
            update["lvl8_slots_total"] = l8;
            update["lvl9_slots_total"] = l9;
            setAttrs(update, {silent: true});
        });
    };

    var update_pb = function() {
        callbacks = [];
        getAttrs(["level","pb_type","pb_custom"], function(v) {
            var update = {};
            var pb = 2;
            var lvl = parseInt(v["level"],10);
            if(lvl < 5) {pb = "2"} else if(lvl < 9) {pb = "3"} else if(lvl < 13) {pb = "4"} else if(lvl < 17) {pb = "5"} else {pb = "6"}
            var jack = Math.floor(pb/2);
            if(v["pb_type"] === "die") {
                update["jack"] = "d" + pb;
                update["pb"] = "d" + pb*2;
                update["pbd_safe"] = "cs0cf0";
            }
            else if(v["pb_type"] === "custom" && v["pb_custom"] && v["pb_custom"] != "") {
                update["pb"] = v["pb_custom"]
                update["jack"] = !isNaN(parseInt(v["pb_custom"],10)) ? Math.floor(parseInt(v["pb_custom"],10)/2) : jack;
                update["pbd_safe"] = "";
            }
            else {
                update["pb"] = pb;
                update["jack"] = jack;
                update["pbd_safe"] = "";
            };
            callbacks.push( function() {update_attacks("all");} );
            callbacks.push( function() {update_spell_info();} );
            callbacks.push( function() {update_jack_attr();} );
            callbacks.push( function() {update_initiative();} );
            callbacks.push( function() {update_tool("all");} );
            callbacks.push( function() {update_all_saves();} );
            callbacks.push( function() {update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion"]);} );

            setAttrs(update, {silent: true}, function() {callbacks.forEach(function(callback) {callback(); })} );
        });
    };

    var update_jack_attr = function() {
        var update = {};
        getAttrs(["jack_of_all_trades","jack"], function(v) {
            if(v["jack_of_all_trades"] && v["jack_of_all_trades"] != 0) {
                update["jack_bonus"] = "+" + v["jack"];
                update["jack_attr"] = "+" + v["jack"] + "@{pbd_safe}";
            }
            else {
                update["jack_bonus"] = "";
                update["jack_attr"] = "";
            }
            setAttrs(update, {silent: true});
        });
    };

    var update_spell_info = function(attr) {
        var update = {};
        getAttrs(["spellcasting_ability","spell_dc_mod","globalmagicmod","strength_mod","dexterity_mod","constitution_mod","intelligence_mod","wisdom_mod","charisma_mod"], function(v) {
            if(attr && v["spellcasting_ability"] && v["spellcasting_ability"].indexOf(attr) === -1) {
                return
            };
            if(!v["spellcasting_ability"] || (v["spellcasting_ability"] && v["spellcasting_ability"] === "0*")) {
                update["spell_attack_bonus"] = "0";
                update["spell_save_dc"] = "0";
                var callback = function() {update_attacks("spells")};
                setAttrs(update, {silent: true}, callback);
                return
            };
            var attr = attr ? attr : "";
            console.log("UPDATING SPELL INFO: " + attr);

            var ability = parseInt(v[v["spellcasting_ability"].substring(2,v["spellcasting_ability"].length-2)],10);
            var spell_mod = v["globalmagicmod"] && !isNaN(parseInt(v["globalmagicmod"], 10)) ? parseInt(v["globalmagicmod"], 10) : 0;
            var atk = v["globalmagicmod"] && !isNaN(parseInt(v["globalmagicmod"], 10)) ? ability + parseInt(v["globalmagicmod"], 10) : ability;
            var dc = v["spell_dc_mod"] && !isNaN(parseInt(v["spell_dc_mod"], 10)) ? 8 + ability + parseInt(v["spell_dc_mod"], 10) : 8 + ability;
            var itemfields = ["pb_type","pb"];

            getSectionIDs("repeating_inventory", function(idarray) {
                _.each(idarray, function(currentID, i) {
                    itemfields.push("repeating_inventory_" + currentID + "_equipped");
                    itemfields.push("repeating_inventory_" + currentID + "_itemmodifiers");
                });
                getAttrs(itemfields, function(v) {
                    _.each(idarray, function(currentID) {
                        if((!v["repeating_inventory_" + currentID + "_equipped"] || v["repeating_inventory_" + currentID + "_equipped"] === "1") && v["repeating_inventory_" + currentID + "_itemmodifiers"] && v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().indexOf("spell" > -1)) {
                            var mods = v["repeating_inventory_" + currentID + "_itemmodifiers"].toLowerCase().split(",");
                            _.each(mods, function(mod) {
                                if(mod.indexOf("spell attack") > -1) {
                                    var substr = mod.slice(mod.lastIndexOf("spell attack") + "spell attack".length);
                                    atk = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? atk + parseInt(substr,10) : atk;
                                    spell_mod = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? spell_mod + parseInt(substr,10) : spell_mod;
                                };
                                if(mod.indexOf("spell dc") > -1) {
                                    var substr = mod.slice(mod.lastIndexOf("spell dc") + "spell dc".length);
                                    dc = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? dc + parseInt(substr,10) : dc;
                                };
                            });
                        };
                    });

                    if(v["pb_type"] && v["pb_type"] === "die") {
                        atk = atk + "+" + v["pb"];
                        //Fixing Spell DC when using type Die
                        //By Miguel
                        //Used to be equals to: dc + parseInt(v["pb"].substring(1), 10) / 2
                        dc = dc + "+" + v["pb"];
                    }
                    else {
                        atk = parseInt(atk, 10) + parseInt(v["pb"], 10);
                        dc = parseInt(dc, 10) + parseInt(v["pb"], 10);
                    };
                    update["spell_attack_mod"] = spell_mod;
                    update["spell_attack_bonus"] = atk;
                    update["spell_save_dc"] = dc;
                    var callback = function() {update_attacks("spells")};
                    setAttrs(update, {silent: true}, callback);
                });
            });
        });
    };

    var update_passive_perception = function() {
        getAttrs(["pb_type","passiveperceptionmod","perception_bonus"], function(v) {
            var passive_perception = 10;
            var mod = !isNaN(parseInt(v["passiveperceptionmod"],10)) ? parseInt(v["passiveperceptionmod"],10) : 0;
            var bonus = !isNaN(parseInt(v["perception_bonus"],10)) ? parseInt(v["perception_bonus"],10) : 0;
            if(v["pb_type"] && v["pb_type"] === "die" && v["perception_bonus"] && isNaN(v["perception_bonus"]) && v["perception_bonus"].indexOf("+") > -1) {
                var pieces = v["perception_bonus"].split(/\+|d/);
                var base = !isNaN(parseInt(pieces[0],10)) ? parseInt(pieces[0],10) : 0;
                var num_dice = !isNaN(parseInt(pieces[1],10)) ? parseInt(pieces[1],10) : 1;
                var half_pb_die = !isNaN(parseInt(pieces[2],10)) ? parseInt(pieces[2],10)/2 : 2;
                bonus = base + (num_dice * half_pb_die);
            }
            passive_perception = passive_perception + bonus + mod;
            setAttrs({passive_wisdom: passive_perception})
        });
    };

    var update_race_display = function() {
        getAttrs(["race", "subrace"], function(v) {
            var final_race = "";
            final_race = v.subrace ? v.subrace : v.race;
            if(v.race.toLowerCase() === "dragonborn") { final_race = v.race; };
            setAttrs({race_display: final_race});
        });
    };

    var organize_section_proficiencies = function() {
        getSectionIDs("proficiencies", function(ids) {
            var attribs = ["_reporder_repeating_proficiencies"];
            _.each(ids, function(id) {
                attribs.push("repeating_proficiencies_" + id + "_prof_type");
                attribs.push("repeating_proficiencies_" + id + "_name");
            });

            getAttrs(attribs, function(v) {
                var final_array = _(ids).chain().sortBy(function(id) {
                    return v["repeating_proficiencies_" + id + "_name"];
                }).sortBy(function(id) {
                    return v["repeating_proficiencies_" + id + "_prof_type"];
                }).value();
                _.each(final_array, function(id) {
                });
                if(final_array && final_array.length > 0) {
                    setSectionOrder("proficiencies", final_array);
                };
            });
        });
    };

    const update_challenge = () => {
        getAttrs(["npc_challenge"], (v) => {
            let update = {};
            const challengeRatingsXP = { '0':'10', '1/8':'25', '1/4':'50', '1/2':'100', '1':'200', '2':'450', '3':'700', '4':'1100', '5':'1800', '6':'2300', '7':'2900', '8':'3900', '9':'5000', '10':'5900', '11':'7200', '12':'8400', '13':'10000', '14':'11500', '15':'13000', '16':'15000', '17':'18000', '18':'20000', '19':'22000', '20':'25000', '21':'33000', '22':'41000', '23':'50000', '24':'62000', '25':'75000', '26':'90000', '27':'105000', '28':'120000', '29':'135000', '30':'155000'
            };

            const xp = parseInt(challengeRatingsXP[v.npc_challenge]) || 0;
            const pb = xp <= 1100 ? 2 : xp <= 3900 ? 3 : xp <= 8400 ? 4 : xp <= 15000 ? 5 : xp <= 25000 ? 6 : xp <= 62000 ? 7 : xp <= 120000 ? 8 : xp <= 155000 ? 9 : 0;

            update["npc_xp"] = xp;
            update["pb_custom"] = pb;
            update["pb_type"] = "custom";
            setAttrs(update, {silent: true}, function() {update_pb()});
        });
    };
    
    const update_npc_saves = () => {
        const list = ["npc_str_save_base","npc_dex_save_base","npc_con_save_base","npc_int_save_base","npc_wis_save_base","npc_cha_save_base"];
        const type = "save";
        update_npc_lists(list, type);
    };

    const update_npc_skills = () => {
        const list = ["npc_acrobatics_base","npc_animal_handling_base","npc_arcana_base","npc_athletics_base","npc_deception_base","npc_history_base","npc_insight_base","npc_intimidation_base","npc_investigation_base","npc_medicine_base","npc_nature_base","npc_perception_base","npc_performance_base","npc_persuasion_base","npc_religion_base","npc_sleight_of_hand_base","npc_stealth_base","npc_survival_base"];
        const type = "skills";
        update_npc_lists(list, type);
    };

    const update_npc_lists = (list, type) => {
        getAttrs(list, function(v) {
            let update    = {};
            let last_save = 0;
            let npc_flag  = 0;

            _.each(list.reverse(), (base) => {
                const attr   = base.slice(4, -5); //Remove npc_ and _base
                let item     = parseInt(v[`${base}`], 10);

                // CSS will add comma :after 2 & 4 and +/- :before
                // 1 = Positive Number, 2 = Last Number, 3 = Negative Number, 4 = Last Negative Number
                if (v[`${base}`] && !isNaN(item) || v[`${base}`] === 0) {
                    if (last_save === 0) {
                        last_save = 1;
                        item_flag = item < 0 ? 4 : 2;
                    } else {
                        item_flag = item < 0 ? 3 : 1;
                    }
                } else {
                    item_flag = 0;
                    item      = "";
                };

                update[`npc_${attr}_flag`] = item_flag;
                update[`npc_${attr}`]      = item;

                npc_flag += item_flag;
            });

            const flagAttr = (type === "save") ? "saving" : type;
            update[`npc_${flagAttr}_flag`] = (npc_flag === 0) ? "" : npc_flag;

            setAttrs(update, {silent: true});
        });
    };

    var update_npc_action = function(update_id, legendary) {
        if(update_id.substring(0,1) === "-" && update_id.length === 20) {
            do_update_npc_action([update_id], legendary);
        }
        else if(update_id === "all") {
            var legendary_array = [];
            var actions_array = [];
            getSectionIDs("repeating_npcaction-l", function(idarray) {
                legendary_array = idarray;
                if(legendary_array.length > 0) {
                    do_update_npc_action(legendary_array, true);
                }
                getSectionIDs("repeating_npcaction", function(idarray) {
                    actions_array = idarray.filter(function(i) {return legendary_array.indexOf(i) < 0;});
                    if(actions_array.length > 0) {
                        do_update_npc_action(actions_array, false);
                    };
                });
            });
        };
    };

    var do_update_npc_action = function(action_array, legendary) {
        var repvar = legendary ? "repeating_npcaction-l_" : "repeating_npcaction_";
        var action_attribs = ["dtype"];
        _.each(action_array, function(actionid) {
            action_attribs.push(repvar + actionid + "_attack_flag");
            action_attribs.push(repvar + actionid + "_attack_type");
            action_attribs.push(repvar + actionid + "_attack_range");
            action_attribs.push(repvar + actionid + "_attack_target");
            action_attribs.push(repvar + actionid + "_attack_tohit");
            action_attribs.push(repvar + actionid + "_attack_damage");
            action_attribs.push(repvar + actionid + "_attack_damagetype");
            action_attribs.push(repvar + actionid + "_attack_damage2");
            action_attribs.push(repvar + actionid + "_attack_damagetype2");
        });

        getAttrs(action_attribs, function(v) {
            _.each(action_array, function(actionid) {
                console.log("UPDATING NPC ACTION: " + actionid);
                var callbacks = [];
                var update = {};
                var onhit = "";
                var damage_flag = "";
                var range = "";
                var attack_flag = v[repvar + actionid + "_attack_flag"] && v[repvar + actionid + "_attack_flag"] != "0" ? "{{attack=1}}" : "";
                var tohit = v[repvar + actionid + "_attack_tohit"] && isNaN(parseInt(v[repvar + actionid + "_attack_tohit"], 10)) === false ? parseInt(v[repvar + actionid + "_attack_tohit"], 10) : 0;
                if(v[repvar + actionid + "_attack_type"] && v[repvar + actionid + "_attack_range"]) {
                    if(v[repvar + actionid + "_attack_type"] === "Melee") {var rangetype = "Reach";} else {var rangetype = "Range";};
                    range = ", " + rangetype + " " + v[repvar + actionid + "_attack_range"];
                }
                var target = v[repvar + actionid + "_attack_target"] && v[repvar + actionid + "_attack_target"] != "" ? ", " + v[repvar + actionid + "_attack_target"] : ""
                var attack_tohitrange = "+" + tohit + range + target;
                var dmg1 = v[repvar + actionid + "_attack_damage"] && v[repvar + actionid + "_attack_damage"] != "" ? v[repvar + actionid + "_attack_damage"] : "";
                var dmg1type = v[repvar + actionid + "_attack_damagetype"] && v[repvar + actionid + "_attack_damagetype"] != "" ? " " + v[repvar + actionid + "_attack_damagetype"] : "";
                var dmg2 = v[repvar + actionid + "_attack_damage2"] && v[repvar + actionid + "_attack_damage2"] != "" ? v[repvar + actionid + "_attack_damage2"] : "";
                var dmg2type = v[repvar + actionid + "_attack_damagetype2"] && v[repvar + actionid + "_attack_damagetype2"] != "" ? " " + v[repvar + actionid + "_attack_damagetype2"] : "";
                var dmgspacer = dmg1 != "" && dmg2 != "" ? " plus " : "";

                var parsed_dmg1 = parse_roll_string(dmg1);
                var parsed_dmg2 = parse_roll_string(dmg2);

                if(dmg1 != "") {
                    onhit = onhit + parsed_dmg1.avg + " (" + dmg1 + ")" + dmg1type + " damage";
                };
                dmgspacer = dmg1 != "" && dmg2 != "" ? " plus " : "";
                onhit = onhit + dmgspacer;
                if(dmg2 != "") {
                    onhit = onhit + parsed_dmg2.avg + " (" + dmg2 + ")" + dmg2type + " damage";
                };
                if(dmg1 != "" || dmg2 != "") {damage_flag = damage_flag + "{{damage=1}} "};
                if(dmg1 != "") {damage_flag = damage_flag + "{{dmg1flag=1}} "};
                if(dmg2 != "") {damage_flag = damage_flag + "{{dmg2flag=1}} "};

                var crit1 = "";
                if(parsed_dmg1.rolls.length > 0){
                    parsed_dmg1.rolls.forEach(function(value) {
                        crit1 += parsed_dmg1.array[value] + "+";
                    });
                    crit1 = crit1.substring(0, crit1.length - 1);
                }

                var crit2 = "";
                if(parsed_dmg2.rolls.length > 0){
                    parsed_dmg2.rolls.forEach(function(value) {
                        crit2 += parsed_dmg2.array[value] + "+";
                    });
                    crit2 = crit2.substring(0, crit2.length - 1);
                }

                var rollbase = "";
                if(v.dtype === "full") {
                    rollbase = `@{wtype}&{template:npcaction} ${attack_flag} @{damage_flag} @{npc_name_flag} {{rname=@{name}}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{dmg1=[[@{attack_damage}+0]]}} {{dmg1type=@{attack_damagetype}}} {{dmg2=[[@{attack_damage2}+0]]}} {{dmg2type=@{attack_damagetype2}}} {{crit1=[[@{attack_crit}+0]]}} {{crit2=[[@{attack_crit2}+0]]}} {{description=@{show_desc}}} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                }
                else if(v[repvar + actionid + "_attack_flag"] && v[repvar + actionid + "_attack_flag"] != "0") {
                    if(legendary) {
                        rollbase = `@{wtype}&{template:npcatk} ${attack_flag} @{damage_flag} @{npc_name_flag} {{rname=[@{name}](~repeating_npcaction-l_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction-l_npc_crit)}} {{type=[Attack](~repeating_npcaction-l_npc_dmg)}} {{typec=[Attack](~repeating_npcaction-l_npc_crit)}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{show_desc}}} @{charname_output} {{licensedsheet=@{licensedsheet}}}`
                    }
                    else {
                        rollbase = `@{wtype}&{template:npcatk} ${attack_flag} @{damage_flag} @{npc_name_flag} {{rname=[@{name}](~repeating_npcaction_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction_npc_crit)}} {{type=[Attack](~repeating_npcaction_npc_dmg)}} {{typec=[Attack](~repeating_npcaction_npc_crit)}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{show_desc}}} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
                    }
                }
                else if(dmg1 || dmg2) {
                    rollbase = `@{wtype}&{template:npcdmg} @{damage_flag} {{dmg1=[[@{attack_damage}+0]]}} {{dmg1type=@{attack_damagetype}}} {{dmg2=[[@{attack_damage2}+0]]}} {{dmg2type=@{attack_damagetype2}}} {{crit1=[[@{attack_crit}+0]]}} {{crit2=[[@{attack_crit2}+0]]}} @{charname_output} {{licensedsheet=@{licensedsheet}}}`
                }
                else {
                    rollbase = `@{wtype}&{template:npcaction} @{npc_name_flag} {{rname=@{name}}} {{description=@{show_desc}}} @{charname_output} {{licensedsheet=@{licensedsheet}}}`
                }

                update[repvar + actionid + "_attack_tohitrange"] = attack_tohitrange;
                update[repvar + actionid + "_attack_onhit"] = onhit;
                update[repvar + actionid + "_damage_flag"] = damage_flag;
                update[repvar + actionid + "_attack_crit"] = crit1;
                update[repvar + actionid + "_attack_crit2"] = crit2;
                update[repvar + actionid + "_rollbase"] = rollbase;
                setAttrs(update, {silent: true});
            });
        });
    };

    var parse_roll_string = function(rollstring) {
        var out = {array: [], avg: 0, rolls: []};

        if(!rollstring || rollstring === "") {
            return out;
        }

        var rs_regex_initial = /(\-?\d+(?:d\d+)?)/ig;
        var rs_regex_repeating = /([\+\-])(\-?\d+(?:d\d+)?)/ig;
        var rs_nospace = rollstring.replace(/\s/g, '');
        var rs_initial = rs_regex_initial.exec(rs_nospace);

        if(rs_initial) {
            out.array.push(rs_initial[1]);
            rs_regex_repeating.lastIndex = rs_regex_initial.lastIndex;
            var rs_repeating;
            while(rs_repeating = rs_regex_repeating.exec(rs_nospace)) {
                out.array.push(rs_repeating[1], rs_repeating[2]);
            }
        }

        var add = true;
        var dice_regex = /(\d+)d(\d+)/i;
        var dice;

        out.array.forEach(function(value, index, array) {
            if(value === "+") {
                add = true;
            } else if(value === "-") {
                add = false;
            } else if(dice = dice_regex.exec(value)){
                // this value is a die roll
                var dice_avg = Math.floor(+dice[1] * (+dice[2] / 2 + 0.5));
                out.avg += add ? dice_avg : -dice_avg;
                out.rolls.push(index);
            } else {
                // this value is a number
                out.avg += add ? +value : -+value;
            }
        })

        return out;
    };

    var get_class_level = function(class_name, callback) {
        getAttrs(["class", "base_level", "multiclass1_flag", "multiclass1", "multiclass1_lvl", "multiclass2_flag", "multiclass2", "multiclass2_lvl", "multiclass3_flag", "multiclass3", "multiclass3_lvl"], function(attrs) {
            var regex = new RegExp(class_name, "i");
            if(regex.test(attrs["class"])) {
                callback(attrs.base_level);
            } else if(attrs.multiclass1_flag && attrs.multiclass1_flag !== "0" && regex.test(attrs.multiclass1)) {
                callback(attrs.multiclass1_lvl);
            } else if(attrs.multiclass2_flag && attrs.multiclass2_flag !== "0" && regex.test(attrs.multiclass2)) {
                callback(attrs.multiclass2_lvl);
            } else if(attrs.multiclass3_flag && attrs.multiclass3_flag !== "0" && regex.test(attrs.multiclass3)) {
                callback(attrs.multiclass3_lvl);
            } else {
                callback("0");
            }
        });
    };

    var update_globaldamage = function(callback) {
        getSectionIDs("damagemod", function(ids) {
            if(ids) {
                var fields = {};
                var attr_name_list = [];
                ids.forEach(function(id) {
                    fields[id] = {};
                    attr_name_list.push(`repeating_damagemod_${id}_global_damage_active_flag`, `repeating_damagemod_${id}_global_damage_name`, `repeating_damagemod_${id}_global_damage_damage`, `repeating_damagemod_${id}_global_damage_type`);
                });

                getAttrs(attr_name_list, function(attrs) {
                    var regex = /^repeating_damagemod_(.+)_global_damage_(active_flag|name|damage|type)$/;
                    _.each(attrs, function(obj, name) {
                        var r = regex.exec(name);
                        if(r) {
                            fields[r[1]][r[2]] = obj;
                        };
                    });

                    var update = {global_damage_mod_roll: "", global_damage_mod_crit: "", global_damage_mod_type: ""};

                    console.log("GLOBALDAMAGE");
                    _.each(fields, function(element) {
                        if(element.active_flag != "0") {
                            if(element.name && element.name !== "") { update["global_damage_mod_roll"] += element.damage + '[' + element.name + ']' + "+"; }
                            if(element.type && element.type !== "") { update["global_damage_mod_type"] += element.type + "/"; }
                        }
                    });

                    update["global_damage_mod_roll"] = update["global_damage_mod_roll"].replace(/\+(?=$)/, '');
                    update["global_damage_mod_type"] = update["global_damage_mod_type"].replace(/\/(?=$)/, '');

                    // Remove any non-roll damage modifiers from the global damage modifier for the crit rolls
                    // Will also remove any labels attached to these non-roll damage modifiers
                    update["global_damage_mod_crit"] = update["global_damage_mod_roll"].replace(/(?:[+\-*\/%]|\*\*|^)\s*\d+(?:\[.*?])?(?!d\d+)/gi, '')
                        // If what was just replace removed the first damage modifier, remove any now precending plus signs
                        .replace(/(?:^\+)/i, '');

                    setAttrs(update, {silent:true}, function() {
                        update_attacks("all");
                        if(typeof callback == "function") callback();
                    });
                });
            }
        });
    };

    var update_globalattack = function(callback) {
        getSectionIDs("tohitmod", function(ids) {
            if(ids) {
                var fields = {};
                var attr_name_list = [];
                ids.forEach(function(id) {
                    fields[id] = {};
                    attr_name_list.push(`repeating_tohitmod_${id}_global_attack_active_flag`, `repeating_tohitmod_${id}_global_attack_roll`, `repeating_tohitmod_${id}_global_attack_name`);
                });
                getAttrs(attr_name_list, function(attrs) {
                    var regex = /^repeating_tohitmod_(.+)_global_attack_(active_flag|roll|name)$/;
                    _.each(attrs, function(obj, name) {
                        var r = regex.exec(name);
                        if(r) {
                            fields[r[1]][r[2]] = obj;
                        }
                    });

                    var update = {global_attack_mod: ""};
                    console.log("GLOBALATTACK");
                    _.each(fields, function(element) {
                        if(element.active_flag != "0") {
                            if(element.roll && element.roll !== "") { update["global_attack_mod"] += element.roll + "[" + element.name + "]" + "+"; }
                        }
                    });
                    if(update["global_attack_mod"] !== "") {
                        update["global_attack_mod"] = "[[" + update["global_attack_mod"].replace(/\+(?=$)/, '') + "]]";
                    }
                    setAttrs(update, {silent:true}, function() {
                        if(typeof callback == "function") callback();
                    });
                });
            }
        });
    };

    var update_globalsaves = function(callback) {
        getSectionIDs("savemod", function(ids) {
            if(ids) {
                var fields = {};
                var attr_name_list = [];
                ids.forEach(function(id) {
                    fields[id] = {};
                    attr_name_list.push(`repeating_savemod_${id}_global_save_active_flag`, `repeating_savemod_${id}_global_save_roll`, `repeating_savemod_${id}_global_save_name`);
                });
                getAttrs(attr_name_list, function(attrs) {
                    var regex = /^repeating_savemod_(.+)_global_save_(active_flag|roll|name)$/;
                    _.each(attrs, function(obj, name) {
                        var r = regex.exec(name);
                        if(r) {
                            fields[r[1]][r[2]] = obj;
                        }
                    });

                    var update = {global_save_mod: ""};
                    console.log("GLOBAL SAVES");
                    _.each(fields, function(element) {
                        if(element.active_flag != "0") {
                            if(element.roll && element.roll !== "") { update["global_save_mod"] += element.roll + "[" + element.name + "]" + "+"; }
                        }
                    });
                    if(update["global_save_mod"] !== "") {
                        update["global_save_mod"] = "[[" + update["global_save_mod"].replace(/\+(?=$)/, '') + "]]";
                    }
                    setAttrs(update, {silent:true}, function() {
                        if(typeof callback == "function") callback();
                    });
                });
            }
        });
    };

    var update_globalskills = function(callback) {
        getSectionIDs("skillmod", function(ids) {
            if(ids) {
                var fields = {};
                var attr_name_list = [];
                ids.forEach(function(id) {
                    fields[id] = {};
                    attr_name_list.push(`repeating_skillmod_${id}_global_skill_active_flag`, `repeating_skillmod_${id}_global_skill_roll`, `repeating_skillmod_${id}_global_skill_name`);
                });
                getAttrs(attr_name_list, function(attrs) {
                    var regex = /^repeating_skillmod_(.+)_global_skill_(active_flag|roll|name)$/;
                    _.each(attrs, function(obj, name) {
                        var r = regex.exec(name);
                        if(r) {
                            fields[r[1]][r[2]] = obj;
                        }
                    });

                    var update = {global_skill_mod: ""};
                    console.log("GLOBAL SKILLS");
                    _.each(fields, function(element) {
                        if(element.active_flag != "0") {
                            if(element.roll && element.roll !== "") { update["global_skill_mod"] += element.roll + "[" + element.name + "]" + "+"; }
                        }
                    });
                    if(update["global_skill_mod"] !== "") {
                        update["global_skill_mod"] = "[[" + update["global_skill_mod"].replace(/\+(?=$)/, '') + "]]";
                    }
                    setAttrs(update, {silent:true}, function() {
                        if(typeof callback == "function") callback();
                    });
                });
            }
        });
    };

    var check_l1_mancer = function() {
        getAttrs(["class", "base_level", "strength_base","dexterity_base","constitution_base","intelligence_base","wisdom_base","charisma_base","l1mancer_status","version","charactermancer_step"], function(v) {
            if(!v["version"] || parseFloat(v["version"]) < 2.2) {
                return;
            }
            if(v["l1mancer_status"] && v["l1mancer_status"] === "completed") {
                return;
            }

            if(v["charactermancer_step"] && v["charactermancer_step"].split("-")[0] == "l1") {
                startCharactermancer(v["charactermancer_step"]);
            }
            else {
                if(v["l1mancer_status"] && v["l1mancer_status"] === "relaunch") {
                    startCharactermancer("l1-welcome");
                } else {
                    setAttrs({mancer_confirm_flag: 1});
                }
            }
        });
    };

    var check_lp_mancer = function() {
        getAttrs(["class", "base_level", "strength_base","dexterity_base","constitution_base","intelligence_base","wisdom_base","charisma_base","l1mancer_status", "lpmancer_status","version","charactermancer_step"], function(v) {
            if(v["lpmancer_status"] === "active" && v["charactermancer_step"] && v["charactermancer_step"].split("-")[0] == "lp") {
                startCharactermancer(v["charactermancer_step"]);
            }
        });
    };

    on("mancer:cancel", function(eventinfo) {
        if(!eventinfo["value"]) {return;};
        var update = {};

        if(eventinfo["value"] === "l1-welcome" || eventinfo["value"] === "l1-cancel") {
            update["l1mancer_status"] = "completed";
            update["charactermancer_step"] = "l1-welcome";
            deleteCharmancerData(["l1-welcome","l1-race","l1-class","l1-abilities","l1-background","l1-equipment","l1-spells","l1-summary"]);
        }
        else if(eventinfo["value"].substring(0,3) === "l1-") {
            update["l1mancer_status"] = eventinfo["value"];
        }
        else if(eventinfo["value"] === "lp-welcome" || eventinfo["value"] === "lp-cancel") {
            update["lpmancer_status"] = "";
            update["charactermancer_step"] = "";
            deleteCharmancerData(["lp-welcome", "lp-levels", "lp-choices", "lp-asi", "lp-spells","lp-summary"]);
        }
        else if(eventinfo["value"].substring(0,3) === "lp-") {
            update["charactermancer_step"] = "";
            update["lpmancer_status"] = "";
        };
        setAttrs(update);
    });

    on("change:licensedsheet", function(eventinfo) {
        //debugger
    });

    /* on("sheet:opened", function(eventinfo) {
        getAttrs([licensedsheet], function(v) {
            debugger
        });
    }); */
