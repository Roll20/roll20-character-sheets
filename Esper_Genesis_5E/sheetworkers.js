// Create a collective list of attributs to reduce redundancy
var abilityList = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
var abilityListEnabledOptionals = [];
const globalAttributesByCategory = {
    abilities: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    abilitiesWithAllOptionals: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'honor', 'sanity'],
    //classes: ['artificer','barbarian','bard','cleric','druid','fighter','monk','paladin','ranger','rogue','sorcerer','warlock','wizard'],
    classes: ['adept', 'cybermancer', 'engineer', 'hunter', 'melder', 'sentinel', 'specialist', 'warrior'],
    hitDieTypes: ['d4', 'd6', 'd8', 'd10', 'd12'],
    traitsTypes: ['Background', 'Feats', 'Racial', 'Class', 'Other'],
    proficiencyTypes: ['LANGUAGE', 'ARMOR', 'WEAPON', 'OTHER'],
    skills: {
        strength: [
            'athletics'
        ],
        constitution: [],
        dexterity: [
            'acrobatics',
            'sleight_of_hand',
            'stealth',
        ],
        intelligence: [
            'arcana',
            'history',
            'investigation',
            'nature',
            'religion',
        ],
        wisdom: [
            'animal_handling',
            'insight',
            'medicine',
            'perception',
            'survival'
        ],
        charisma: [
            'deception',
            'intimidation',
            'performance',
            'persuasion',
        ],
        honor: [],
        sanity: [],
        all: () => { return [...globalAttributesByCategory.skills.strength, ...globalAttributesByCategory.skills.dexterity, ...globalAttributesByCategory.skills.intelligence, ...globalAttributesByCategory.skills.wisdom, ...globalAttributesByCategory.skills.charisma]; },
        getParentAbility: skill => { 
            let parent = ''; 
            globalAttributesByCategory['abilities'].forEach(ability => {
                if(globalAttributesByCategory.skills[ability].indexOf(skill) > -1) {
                    parent = ability;
                    return;
                }
            });
            return parent; 
        }
    }
};

on("sheet:opened", function(eventinfo) {
    lastDropID = "";
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
        var spellSections = ["spell-prime"];
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
    getAttrs(["hp_max","npc_senses","ship_senses","token_size","cd_bar1_v","cd_bar1_m","cd_bar1_l","cd_bar2_v","cd_bar2_m","cd_bar2_l","cd_bar3_v","cd_bar3_m","cd_bar3_l"], function(v) {

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
                update_skills(["acrobatics", "sleight_of_hand", "stealth", "piloting"]);
                update_ac();
                update_initiative();
                break;
            case "intelligence":
                update_skills(["astrophysics", "lore", "investigation", "xenobiology", "computers"]);
                break;
            case "wisdom":
                update_skills(["mechanics", "insight", "medicine", "perception", "survival"]);
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

['acrobatics','astrophysics','athletics','computers','deception','insight','intimidation','investigation','lore',
'mechanics','medicine','perception','performance','persuasion','piloting','sleight_of_hand','stealth','survival','xenobiology'].forEach(attr => {
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

on("change:repeating_inventory:itemweight change:repeating_inventory:itemcount change:cp change:sp change:ep change:cu change:cn change:encumberance_setting change:size change:carrying_capacity_mod", function() {
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

['spell-prime','spell-1','spell-2','spell-3','spell-4','spell-5','spell-6','spell-7','spell-8','spell-9'].forEach(attr => {
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

['spell-prime','spell-1','spell-2','spell-3','spell-4','spell-5','spell-6','spell-7','spell-8','spell-9'].forEach(attr => {
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
            } else if (spelloutput && spelloutput === "POWERCARD" && attackid && attackid != "") {
                let lvl = parseInt(v[repeating_source + "_spelllevel"], 10);
                remove_attack(attackid);
                update_spelloutput(higherlevels, lvl, repeating_source, spelloutput, licensedsheet);
            }
        });
    });
});

['spell-prime','spell-1','spell-2','spell-3','spell-4','spell-5','spell-6','spell-7','spell-8','spell-9'].forEach(attr => {
    on(`change:repeating_${attr}:spellathigherlevels`, (eventinfo) => {
        if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {return;}

        const spellid = eventinfo.sourceAttribute.split("_")[2], repeating_source = `repeating_${attr}_${spellid}`;
        getAttrs([`${repeating_source}_spelllevel`, `${repeating_source}_spelloutput`], function(v) {
            const higherlevels = eventinfo.newValue;
            const lvl          = parseInt(v[repeating_source + "_spelllevel"], 10);
            const spelloutput  = v[repeating_source + "_spelloutput"];

            if (spelloutput && spelloutput === "POWERCARD") {
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
    update[repeating_source + "_rollcontent"] = `@{wtype}&{template:spell} {{level=@{spellschool} ${spelllevel}}} {{name=@{spellname}}} {{castingtime=@{spellcastingtime}}} {{range=@{spellrange}}} {{target=@{spelltarget}}} @{pointcost}}} {{duration=@{spellduration}}} {{description=@{spelldescription}}} {{athigherlevels=@{spellathigherlevels}}} @{spellritual} {{innate=@{innate}}} @{spellconcentration} @{charname_output} {{licensedsheet=@{licensedsheet}}}`;
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

on("change:npc_acrobatics_base change:npc_astrophysics_base change:npc_athletics_base change:npc_computers_base change:npc_deception_base change:npc_insight_base change:npc_intimidation_base change:npc_investigation_base change:npc_lore_base change:npc_mechanics_base change:npc_medicine_base change:npc_perception_base change:npc_performance_base change:npc_persuasion_base change:npc_piloting_base change:npc_sleight_of_hand_base change:npc_stealth_base change:npc_survival_base change:npc_xenobiology_base", function(eventinfo) {
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
                update["repeating_spell-" + spelllvl + "_" + spellid + "_spelloutput"] = "POWERCARD";
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

on("remove:repeating_spell-prime remove:repeating_spell-1 remove:repeating_spell-2 remove:repeating_spell-3 remove:repeating_spell-4 remove:repeating_spell-5 remove:repeating_spell-6 remove:repeating_spell-7 remove:repeating_spell-8 remove:repeating_spell-9", function(eventinfo) {
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
    update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "astrophysics", "lore", "investigation", "xenobiology", "computers", "mechanics", "insight", "medicine", "perception", "survival", "deception", "intimidation", "performance", "persuasion", "piloting"]);
};

var update_skills = function (skills_array) {
    var skill_parent = {athletics: "strength", acrobatics: "dexterity", sleight_of_hand: "dexterity", stealth: "dexterity", astrophysics: "intelligence", lore: "intelligence", investigation: "intelligence", xenobiology: "intelligence", computers: "intelligence", mechanics: "wisdom", insight: "wisdom", medicine: "wisdom", perception: "wisdom", survival: "wisdom", deception: "charisma", intimidation: "charisma", performance: "charisma", persuasion: "charisma", piloting: "dexterity"};
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
        {name: "spell-prime", list: ["spellname", "spellattackid", "spellsource", "spellattackid"]},
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
        if(mod.indexOf("astrophysics") > -1) {update_skills(["astrophysics"]);};
        if(mod.indexOf("athletics") > -1) {update_skills(["athletics"]);};
        if(mod.indexOf("computers") > -1) {update_skills(["computers"]);};
        if(mod.indexOf("deception") > -1) {update_skills(["deception"]);};
        if(mod.indexOf("insight") > -1) {update_skills(["insight"]);};
        if(mod.indexOf("intimidation") > -1) {update_skills(["intimidation"]);};
        if(mod.indexOf("investigation") > -1) {update_skills(["investigation"]);};
        if(mod.indexOf("lore") > -1) {update_skills(["lore"]);};
        if(mod.indexOf("mechanics") > -1) {update_skills(["mechanics"]);};
        if(mod.indexOf("medicine") > -1) {update_skills(["medicine"]);};
        if(mod.indexOf("perception") > -1) {update_skills(["perception"]);};
        if(mod.indexOf("performance") > -1) {update_skills(["performance"]);};
        if(mod.indexOf("persuasion") > -1) {update_skills(["persuasion"]);};
        if(mod.indexOf("piloting") > -1) {update_skills(["piloting"]);};
        if(mod.indexOf("sleight of hand") > -1) {update_skills(["sleight_of_hand"]);};
        if(mod.indexOf("stealth") > -1) {update_skills(["stealth"]);};
        if(mod.indexOf("survival") > -1) {update_skills(["survival"]);};
        if(mod.indexOf("xenobiology") > -1) {update_skills(["xenobiology"]);};
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
            description = description + v[`${repeating_spell}_spellattack`] + " Power Attack. ";
        };

        if (v[`${repeating_spell}_spelldamage`] && v[`${repeating_spell}_spelldamage`] != "") {
            update[`${repeating_attack}_dmgbase`] =
                (v[`${repeating_spell}_spell_damage_progression`] && v[`${repeating_spell}_spell_damage_progression`] === "Prime Dice") ? "[[round((@{level} + 1) / 6 + 0.5)]]" + v[`${repeating_spell}_spelldamage`].substring(1) :
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
                description = description + "\n\nAt Higher Ranks: " + v[`${repeating_spell}_spellathigherlevels`];
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

            //HIGHER LVL CAST DMG found in Powers for spells like Fireball
            const hldmgcrit = (v[`${repeating_attack}_hldmg`] && v[`${repeating_attack}_hldmg`] != "") ? v[`${repeating_attack}_hldmg`].slice(0, 7) + "crit" + v[`${repeating_attack}_hldmg`].slice(7) : "";

            if (v[`${repeating_attack}_spellid`] && v[`${repeating_attack}_spellid`] != "") {
                spellattack    = true;
                //GLOBAL POWER ATTACK MODIFIER in Settings
                magicattackmod = parseInt(v["spell_attack_mod"],10) || 0;
                //POWER SAVE DC MOD in Settings
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
    let weight_attrs = ["cp","sp","ep","cu","cn","encumberance_setting","strength","size","carrying_capacity_mod"];
    getSectionIDs("repeating_inventory", (idarray) => {
        _.each(idarray, (currentID, i) => {
            weight_attrs.push(`repeating_inventory_${currentID}_itemweight`);
            weight_attrs.push(`repeating_inventory_${currentID}_itemcount`);
        });
        getAttrs(weight_attrs, (v) => {
            let coinWeight = 0;
            ["cp", "sp", "ep", "cu", "cn"].forEach((type)=> {
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
                    //Update Spell info to change or remove casting attributes in Powers
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
    var full = ["adept","cybermancer","engineer","melder","full"];
    var half = ["hunter","sentinel","half"];
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
    var d10class = ["hunter","sentinel","warrior"];
    var d8class = ["adept","cybermancer","engineer","specialist"];
    var d6class = ["melder"];
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
        callbacks.push( function() {update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "astrophysics", "lore", "investigation", "xenobiology", "computers", "mechanics", "insight", "medicine", "perception", "survival", "deception", "intimidation", "performance", "persuasion", "piloting"]);} );

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
    const list = ["npc_acrobatics_base","npc_astrophysics_base","npc_athletics_base","npc_computers_base","npc_deception_base","npc_insight_base","npc_intimidation_base","npc_investigation_base","npc_lore_base","npc_mechanics_base","npc_medicine_base","npc_perception_base","npc_performance_base","npc_persuasion_base","npc_sleight_of_hand_base","npc_stealth_base","npc_survival_base","npc_xenobiology_base", "npc_piloting_base"];
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
    getAttrs(["npc","strength","dexterity","constitution","intelligence","wisdom","charisma","strength_base","dexterity_base","constitution_base","intelligence_base","wisdom_base","charisma_base","deathsavemod","death_save_mod","npc_str_save","npc_dex_save","npc_con_save","npc_int_save","npc_wis_save","npc_cha_save","npc_str_save_base","npc_dex_save_base","npc_con_save_base","npc_int_save_base","npc_wis_save_base","npc_cha_save_base","npc_acrobatics_base", "npc_astrophysics_base", "npc_athletics_base", "npc_computers_base", "npc_deception_base", "npc_insight_base", "npc_intimidation_base", "npc_investigation_base", "npc_lore_base", "npc_mechanics_base", "npc_medicine_base", "npc_perception_base", "npc_performance_base", "npc_persuasion_base", "npc_sleight_of_hand_base", "npc_stealth_base", "npc_survival_base", "npc_xenobiology_base", "npc_piloting_base", "npc_acrobatics", "npc_astrophysics", "npc_athletics", "npc_computers", "npc_deception", "npc_insight", "npc_intimidation", "npc_investigation", "npc_lore", "npc_mechanics", "npc_medicine", "npc_perception", "npc_performance", "npc_persuasion", "npc_sleight_of_hand", "npc_stealth", "npc_survival", "npc_xenobiology", "npc_piloting"], function(v) {
        var update = {};
        var stats = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];
        var npc_stats = ["npc_str_save","npc_dex_save","npc_con_save","npc_int_save","npc_wis_save","npc_cha_save","npc_acrobatics", "npc_astrophysics", "npc_athletics", "npc_computers", "npc_deception", "npc_insight", "npc_intimidation", "npc_investigation", "npc_lore", "npc_mechanics", "npc_medicine", "npc_perception", "npc_performance", "npc_persuasion", "npc_piloting", "npc_sleight_of_hand", "npc_stealth", "npc_survival", "npc_xenobiology"];
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
                update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "astrophysics", "lore", "investigation", "xenobiology", "computers", "mechanics", "insight", "medicine", "perception", "survival", "deception", "intimidation", "performance", "persuasion", "piloting"]);
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
                                            getSectionIDs("spell-prime", function(secIds0) {
                                                _.each(secIds0, function(x) {
                                                    spgetList.push("repeating_spell-prime_" + x + "_spell_ability");
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
            console.log(`Esper Genesis by Roll20 v${v["version"]}`);
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

const classRelatedAttrs = ['class', 'subclass', 'base_level', 'multiclass1_flag', 'multiclass1', 'multiclass1_subclass', 'multiclass1_lvl', 'multiclass2_flag','multiclass2', 'multiclass2_subclass', 'multiclass2_lvl', 'multiclass3_flag', 'multiclass3', 'multiclass3_subclass', 'multiclass3_lvl'];
const getTalentPointsAndMastery = callback => {
    getAttrs(classRelatedAttrs, values => {
        let level = 0;
        let mastery = 0;
        const talentPointPerClass = {
            'adept': 1,
            'cybermancer': 1,
            'melder': 1,
            'artifice': 1/3,
            'justicar': 1/3
        };
        const hasMastery = Object.keys(talentPointPerClass).filter(c => { return talentPointPerClass[c] === 1; });
        let characterClassAttributes = {
            mainclass: {
                class: 'class',
                subclass: 'subclass',
                level: 'base_level'
            }
        };
        for(let i=1; i<=3; i++) {
            characterClassAttributes[`multiclass_${i}`] = {
                enabled: `multiclass${i}_flag`,
                class: `multiclass${i}`,
                subclass: `multiclass${i}_subclass`,
                level: `multiclass${i}_lvl`
            }
        }
        const pointsPerLevel = ['',4,6,14,17,27,32,38,44,57,64,73,78,83,88,94,100,107,114,123,133];
        const getLevelInfo = (charClass, values) => {
            let charLevel = {
                level: 0,
                mastery: 0
            };
            if(!characterClassAttributes[charClass]) return charLevel;
            if(!characterClassAttributes[charClass]['enabled'] || (values[characterClassAttributes[charClass]['enabled']] && values[characterClassAttributes[charClass]['enabled']] == 1)) {
                const subclass = values[characterClassAttributes[charClass]['subclass']] || '';
                const level = (values[characterClassAttributes[charClass]['level']]) ? parseInt(values[characterClassAttributes[charClass]['level']]) : 0;
                charClass = (subclass.toLowerCase() == 'artifice' || subclass.toLowerCase() == 'justicar') ? subclass : values[characterClassAttributes[charClass]['class']];
                const classIndex = Object.keys(talentPointPerClass).indexOf(charClass.toLowerCase());
                if(classIndex > -1) {
                    charLevel.level = Math.floor(level * talentPointPerClass[Object.keys(talentPointPerClass)[classIndex]]);
                    charLevel.mastery = (hasMastery.indexOf(charClass.toLowerCase()) > -1) ? Math.ceil(Math.min(Math.max(level-10, 0), 7)/2) : 0;
                }
            }
            return charLevel;
        }
        Object.keys(characterClassAttributes).forEach(charClass => {
            const levelInfo = getLevelInfo(charClass, values);
            level += levelInfo.level;
            mastery = Math.max(mastery, levelInfo.mastery);
        });
        callback(pointsPerLevel[level], mastery);
    });
};

const setTalentPointsAndMastery = () => {
    getTalentPointsAndMastery((talentPoints, mastery) => {
        console.log('CALCULATING TALENT POINTS AND ESPER MASTERY');
        let update = {
            tp_max:talentPoints,
            mastery_6th: 0,
            mastery_7th: 0,
            mastery_8th: 0,
            mastery_9th: 0
        }
        for(let i=0; i<mastery; i++) {
            const masteryLevel = `mastery_${i+6}th`;
            update[masteryLevel] = 1;
        }
        setAttrs(update);
    });
}

classRelatedAttrs.forEach(attr => {
    on(`change:${attr}`, evenInfo => {
        setTalentPointsAndMastery();
    });
});

/*
@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[1d10]]}} {{dmg1type=}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globaldamage=[[0]]}} {{globaldamagetype=@{global_damage_mod_type}}} @{charname_output} {{licensedsheet=@{licensedsheet}}}
on("change:repeating_tool:toolname change:repeating_tool:toolbonus_base change:repeating_tool:toolattr_base
*/

var calcShipAtkdmgc = function(damage) {
    let damagec = damage.toLowerCase();
    for(let i=20; i>=1; i--) {
        damagec = damagec.replace(`${i}d`, `${i*2}d`);
    }
    damagec = damagec.replace(/\bd(?=[0-9])/g, '2d');
    return damagec;
};
var addShipDamageType = function(damage, type) {
    if(!damage || !type) return damage;
    return `${damage} [${type}]`;
}
on("change:repeating_weapon-systems", eventinfo => {
    if(!eventinfo.sourceType || eventinfo.sourceType != 'player' || eventinfo.sourceAttribute.includes('atkdmg')) return;
    const id = SheetUtils.getUID(eventinfo.triggerName);
    const pre = `repeating_weapon-systems_${id}`;
    const weaponAttributes = ['gunner', 'weapon', 'range', 'tohit', 'damage', 'dmgtype', 'special', 'ammo', 'recharge'].map(attr => { return `${pre}_${attr}`; });
    getAttrs(weaponAttributes, values => {
        if(values[`${pre}_damage`]) {
            const damage = addShipDamageType(values[`${pre}_damage`], values[`${pre}_dmgtype`]);
            const damagec = addShipDamageType(calcShipAtkdmgc(values[`${pre}_damage`]), values[`${pre}_dmgtype`]);
            const atkdmg = `@{wtype}&{template:dmg} {{rname=@{weapon}}} {{attack=1}} {{range=@{range}}} {{damage=1}} {{dmg1flag=1}} {{dmg1=[[${damage}]]}} {{dmg1type=${values[`${pre}_dmgtype`]}}} {{desc=@{special}}} @{pc_ship_name} {{licensedsheet=@{licensedsheet}}}`;
            const atkdmgc = `@{wtype}&{template:dmg} {{rname=@{weapon}}} {{attack=1}} {{range=@{range}}} {{damage=1}} {{dmg1flag=1}} {{dmg1=[[${damagec}]]}} {{dmg1type=${values[`${pre}_dmgtype`]}}} {{desc=@{special}}} @{pc_ship_name} {{licensedsheet=@{licensedsheet}}}`;
            const update = {
                [`${pre}_atkdmg`]: atkdmg,
                [`${pre}_atkdmgc`]: atkdmgc,
            }
            setAttrs(update, {silent: true});
        }
    });
});


//# sourceURL=espergenesis.js
