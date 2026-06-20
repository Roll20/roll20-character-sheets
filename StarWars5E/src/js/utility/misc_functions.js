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

var update_all_ability_checks = function(){
    update_initiative();
    update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "technology", "lore", "investigation", "nature", "piloting", "animal_handling", "insight", "medicine", "perception", "survival", "deception", "intimidation", "performance", "persuasion", "ship_boost", "ship_ram", "ship_hide", "ship_maneuvering", "ship_patch", "ship_regulation", "ship_astrogation", "ship_data", "ship_probe", "ship_scan", "ship_impress", "ship_interfere", "ship_menace", "ship_swindle"]);
};

var remove_resource = function(id) {
    var update = {};
    getAttrs([id + "_itemid"], function(v) {
        var itemid = v[id + "_itemid"];
        if(itemid) {
            var inventory = "repeating_inventory_";
            getAttrs(["repeating_hiddeninventory_" + itemid + "_itemname"], function(x){
                if(x["repeating_hiddeninventory_" + itemid + "_itemname"]) {
                    inventory = "repeating_hiddeninventory_";
                }
            });
            update[inventory + itemid + "_useasresource"] = 0;
            update[inventory + itemid + "_itemresourceid"] = "";
        };
        if(id == "other_resource") {
            update["other_resource"] = "";
            update["other_resource_name"] = "";
            update["other_resource_itemid"] = "";
            setAttrs(update, {silent: true});
        }
        else {
            var baseid = id.replace("repeating_resource_", "").substring(0,20);
            var resource_names = ["repeating_resource_" + baseid + "_resource_left_name", "repeating_resource_" + baseid + "_resource_right_name"];
            getAttrs(resource_names, function(v) {
                if((id.indexOf("left") > -1 && !v["repeating_resource_" + baseid + "_resource_right_name"]) || (id.indexOf("right") > -1 && !v["repeating_resource_" + baseid + "_resource_left_name"])) {
                    removeRepeatingRow("repeating_resource_" + baseid);
                }
                else {
                    update["repeating_resource_" + id.replace("repeating_resource_", "")] = "";
                    update["repeating_resource_" + id.replace("repeating_resource_", "") + "_name"] = "";
                };
                setAttrs(update, {silent: true});
            });

        };
    });
};

var update_weight = function() {
    getSectionIDs("repeating_inventory", function(idarray) {
        update_inventory_from_weight_change("repeating_inventory_", idarray, "weighttotal");
    });
    getSectionIDs("repeating_hiddeninventory", function(idarray) {
        update_inventory_from_weight_change("repeating_hiddeninventory_", idarray, "hiddenweighttotal");
    });
};

var update_inventory_from_weight_change = function (inventory, idarray, weightAttrToUpdate){
    var update = {};
    var wtotal = 0;
    var weight_attrs = ["cp","sp","ep","gp","pp","encumberance_setting","strength","size","carrying_capacity_mod"];
    _.each(idarray, function(currentID, i) {
        weight_attrs.push(inventory + currentID + "_itemweight");
        weight_attrs.push(inventory + currentID + "_itemcount");
    });
    getAttrs(weight_attrs, function(v) {
        cp = isNaN(parseInt(v.cp, 10)) === false ? parseInt(v.cp, 10) : 0;
        sp = isNaN(parseInt(v.sp, 10)) === false ? parseInt(v.sp, 10) : 0;
        ep = isNaN(parseInt(v.ep, 10)) === false ? parseInt(v.ep, 10) : 0;
        gp = isNaN(parseInt(v.gp, 10)) === false ? parseInt(v.gp, 10) : 0;
        pp = isNaN(parseInt(v.pp, 10)) === false ? parseInt(v.pp, 10) : 0;
        wtotal = wtotal + ((cp + sp + ep + gp + pp) / 50);

        _.each(idarray, function(currentID, i) {
            if(v[inventory + currentID + "_itemweight"] && isNaN(parseInt(v[inventory + currentID + "_itemweight"], 10)) === false) {
                count = v[inventory + currentID + "_itemcount"] && isNaN(parseFloat(v[inventory + currentID + "_itemcount"])) === false ? parseFloat(v[inventory + currentID + "_itemcount"]) : 1;
                wtotal = wtotal + (parseFloat(v[inventory + currentID + "_itemweight"]) * count);
            }
        });

        update[weightAttrToUpdate] = wtotal;

        var str_base = parseInt(v.strength, 10);
        var size_multiplier = 1;
        if(v["size"] && v["size"] != "") {
            if(v["size"].toLowerCase().trim() == "tiny") {size_multiplier = .5}
            else if(v["size"].toLowerCase().trim() == "large") {size_multiplier = 2}
            else if(v["size"].toLowerCase().trim() == "huge") {size_multiplier = 4}
            else if(v["size"].toLowerCase().trim() == "gargantuan") {size_multiplier = 8}
        }
        var str = str_base*size_multiplier;
        if(v.carrying_capacity_mod) {
            var operator = v.carrying_capacity_mod.substring(0,1);
            var value = v.carrying_capacity_mod.substring(1);
            if(["*","x","+","-"].indexOf(operator) > -1 && isNaN(parseInt(value,10)) === false) {
                if(operator == "*" || operator == "x") {str = str*parseInt(value,10);}
                else if(operator == "+") {str = str+parseInt(value,10);}
                else if(operator == "-") {str = str-parseInt(value,10);}
            }
        }

        if(!v.encumberance_setting || v.encumberance_setting === "off") {
            if(wtotal > str*15) {
                update["encumberance"] = "OVER CARRYING CAPACITY";
            }
            else {
                update["encumberance"] = " ";
            }
        }
        else if(v.encumberance_setting === "on") {
            if(wtotal > str*15) {
                update["encumberance"] = "IMMOBILE";
            }
            else if(wtotal > str*10) {
                update["encumberance"] = "HEAVILY ENCUMBERED";
            }
            else if(wtotal > str*5) {
                update["encumberance"] = "ENCUMBERED";
            }
            else {
                update["encumberance"] = " ";
            }
        }
        else {
            update["encumberance"] = " ";
        }

        setAttrs(update, {silent: true});

    });
};

var update_ac = function() {
    getAttrs(["custom_ac_flag","npc"], function(v) {
        if(v.custom_ac_flag === "2") {
            return;
        }
        else if(v.custom_ac_flag === "1" && v.npc !== "2") {
            getAttrs(["custom_ac_base","custom_ac_part1","custom_ac_part2","strength_mod","dexterity_mod","constitution_mod","intelligence_mod","wisdom_mod","charisma_mod"], function(b) {
                var base = isNaN(parseInt(b.custom_ac_base, 10)) === false ? parseInt(b.custom_ac_base, 10) : 10;
                var part1attr = b.custom_ac_part1.toLowerCase();
                var part2attr = b.custom_ac_part2.toLowerCase();
                var part1 = part1attr === "none" ? 0 : b[part1attr + "_mod"];
                var part2 = part2attr === "none" ? 0 : b[part2attr + "_mod"];
                var total = base + part1 + part2;
                setAttrs({ac: total});
            });
        }
        else {
            var ac_attrs = ["simpleinventory","dexterity_mod","globalacmod","npc","ship_size","pilot_skill", "ship_armor_ac_bonus", "ship_armor_active_flag", "ship_armor"];
            getSectionIDs("repeating_inventory", function(idarray) {
                update_inventory_from_ac_change("repeating_inventory_", idarray, ac_attrs);
            });
            if(v.npc === "2") {
                getSectionIDs("repeating_hiddeninventory", function(idarray) {
                    update_inventory_from_ac_change("repeating_hiddeninventory_", idarray, ac_attrs);
                });
            }
        };
    });
};

var update_inventory_from_ac_change = function(inventory, idarray, ac_attrs) {
    var update = {};
    _.each(idarray, function(currentID, i) {
        ac_attrs.push(inventory + currentID + "_equipped");
        ac_attrs.push(inventory + currentID + "_itemmodifiers");
    });

    getAttrs(ac_attrs, function(b) {
        var globalacmod = isNaN(parseInt(b.globalacmod, 10)) === false ? parseInt(b.globalacmod, 10) : 0;
        var dexmod = +b["dexterity_mod"];
        var total = 10 + dexmod;
        var armorcount = 0;
        var shieldcount = 0;
        var armoritems = [];
        if(b.simpleinventory === "complex") {
            _.each(idarray, function(currentID, i) {
                if(b[inventory + currentID + "_equipped"] && b[inventory + currentID + "_equipped"] === "1" && b[inventory + currentID + "_itemmodifiers"] && b[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf("ac") > -1) {
                    var mods = b[inventory + currentID + "_itemmodifiers"].split(",");
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

            if(b.npc === "2") {
                var modac = 0;

                _.each(armoritems, function(item) {
                    modac = modac + item["ac"];
                })

                switch(b.ship_armor){
                    case "none":
                        break;
                    case "deflection":
                        break;
                    case "lightweight":
                        modac += 2
                        break;
                    case "reinforced":
                        modac += -2
                        break;
                    case "customshiparmor":
                        if(b.ship_armor_active_flag == "1") {
                            var acArmor = b["ship_armor_ac_bonus"]
                            var tryParseAcBonus = parseInt(acArmor, 10);
                            if(!isNaN(tryParseAcBonus)) {
                                modac += tryParseAcBonus;
                            }
                        }
                        break;
                }

                var pilotSkill = isNaN(parseInt(b.pilot_skill, 10)) === false ? parseInt(b.pilot_skill, 10) : 0;
                var shipSizeACBase = 0;
                switch(b.ship_size) {
                    case "Tiny":
                        shipSizeACBase = 10;
                        break;
                    case "Small":
                        shipSizeACBase = 9;
                        break;
                    case "Medium":
                        shipSizeACBase = 8;
                        break;
                    case "Large":
                        shipSizeACBase = 7;
                        break;
                    case "Huge":
                        shipSizeACBase = 6;
                        break;
                    case "Gargantuan":
                        shipSizeACBase = 5;
                        break;
                    default:
                        shipSizeACBase = 0;
                        break;
                }
                total = shipSizeACBase + pilotSkill + modac;
            }
            else {
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
                        modac = modac + item["ac"];
                    }
                })

                total = base + armorac + shieldac + modac;
            }
        };
        if(armorcount > 1 || shieldcount > 1) {
            update["armorwarningflag"] = "show";
            update["armorwarning"] = "0";
        }
        else {
            update["armorwarningflag"] = "hide";
            update["armorwarning"] = "0";
        }
        console.log("total: " + total);
        update["ac"] = total + globalacmod;
        setAttrs(update, {silent: true});
    });
};

var check_customac = function(attr) {
    getAttrs(["custom_ac_flag","custom_ac_part1","custom_ac_part2"], function(v) {
        if(v["custom_ac_flag"] && v["custom_ac_flag"] === "1" && ((v["custom_ac_part1"] && v["custom_ac_part1"] === attr) || (v["custom_ac_part2"] && v["custom_ac_part2"] === attr))) {
            update_ac();
        }
    });
};

var update_initiative = function() {
    getSectionIDs("repeating_inventory", function (idarray) {
        getSectionIDs("repeating_hiddeninventory", function (idarray2) {
            update_inventory_from_initiative_change("repeating_inventory_", idarray,"repeating_hiddeninventory_", idarray2);
        });
    });
};

var update_inventory_from_initiative_change = function(inventory, idarray,hiddenInventory, hiddenIdArray) {
    var attrs_to_get = ["dexterity","dexterity_mod","initmod","jack_of_all_trades","jack","init_tiebreaker","pb_type"];
    attrs_to_get.push(...get_attrs_from_inventory_for_change(inventory,idarray));
    attrs_to_get.push(...get_attrs_from_inventory_for_change(hiddenInventory,hiddenIdArray));

    getAttrs(attrs_to_get, function(v) {
        var update = {};
        var final_init = parseInt(v["dexterity_mod"], 10);
        if(v["initmod"] && !isNaN(parseInt(v["initmod"], 10))) {
            final_init = final_init + parseInt(v["initmod"], 10);
        }
        if(v["init_tiebreaker"] && v["init_tiebreaker"] != 0) {
            final_init = final_init + (parseInt(v["dexterity"], 10)/100);
        }
        if(v["jack_of_all_trades"] && v["jack_of_all_trades"] != 0) {
            if(v["pb_type"] && v["pb_type"] === "die" && v["jack"]) {
                // final_init = final_init + Math.floor(parseInt(v["jack"].substring(1),10)/2);
                final_init = final_init + "+" + v["jack"];
            }
            else if(v["jack"] && !isNaN(parseInt(v["jack"], 10))) {
                final_init = final_init + parseInt(v["jack"], 10);
            }
        }

        final_init += check_inventory_from_initiative_change(inventory, idarray, v);
        final_init += check_inventory_from_initiative_change(hiddenInventory, hiddenIdArray, v);


        if(final_init % 1 != 0) {
            final_init = parseFloat(final_init.toPrecision(12)); // ROUNDING ERROR BUGFIX
        }
        update["initiative_bonus"] = final_init;
        setAttrs(update, {silent: true});
    });
};

var check_inventory_from_initiative_change = function(inventory, idarray,v) {
    if(!inventory || !inventory.length | !idarray || !idarray.length) return 0;

    let init_bonus = 0;
    _.each(idarray, function(currentID){
        if(v[inventory + currentID + "_equipped"] && v[inventory + currentID + "_equipped"] === "1" && v[inventory + currentID + "_itemmodifiers"] && (v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf("ability checks") > -1 || v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf("initiative") > -1)) {
            var mods = v[inventory + currentID + "_itemmodifiers"].toLowerCase().split(",");
            _.each(mods, function(mod) {
                if(mod.indexOf("ability checks") > -1 || mod.indexOf("initiative") > -1) {
                    if(mod.indexOf("-") > -1) {
                        var new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                        init_bonus = new_mod ? init_bonus - new_mod : init_bonus;
                    }
                    else {
                        var new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                        init_bonus = new_mod ? init_bonus + new_mod : init_bonus;
                    }
                }
            });
        }
    });

    return init_bonus;
}

var update_class = function() {
    getAttrs(["class","base_level","custom_class","cust_classname","cust_hitdietype","cust_powercasting_ability","cust_strength_save_prof","cust_dexterity_save_prof","cust_constitution_save_prof","cust_intelligence_save_prof","cust_wisdom_save_prof","cust_charisma_save_prof","strength_save_prof","dexterity_save_prof","constitution_save_prof","intelligence_save_prof","wisdom_save_prof","charisma_save_prof","subclass","multiclass1","multiclass1_subclass","multiclass2","multiclass2_subclass","multiclass3","multiclass3_subclass","npc"], function(v) {
        if(v.npc && v.npc == "1") {
            return;
        }
        if(v.custom_class && v.custom_class != "0") {
            setAttrs({
                hitdietype: v.cust_hitdietype,
                powercasting_ability: v.cust_powercasting_ability,
                strength_save_prof: v.cust_strength_save_prof,
                dexterity_save_prof: v.cust_dexterity_save_prof,
                constitution_save_prof: v.cust_constitution_save_prof,
                intelligence_save_prof: v.cust_intelligence_save_prof,
                wisdom_save_prof: v.cust_wisdom_save_prof,
                charisma_save_prof: v.cust_charisma_save_prof
            });
        }
        else {
            update = {};
            switch(v.class) {
                case "":
                    update["hitdietype"] = 6;
                    update["powercasting_ability"] = "0*";
                    update["strength_save_prof"] = 0;
                    update["dexterity_save_prof"] = 0;
                    update["constitution_save_prof"] = 0;
                    update["intelligence_save_prof"] = 0;
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = 0;
                    update["class_resource_name"] = "";
                    break;
                case "Berserker":
                    update["hitdietype"] = 12;
                    update["powercasting_ability"] = "0*";
                    update["strength_save_prof"] = "(@{pb})";
                    update["dexterity_save_prof"] = 0;
                    update["constitution_save_prof"] = "(@{pb})";
                    update["intelligence_save_prof"] = 0;
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = 0;
                    update["class_resource_name"] = "Rage";
                    break;
                case "Scholar":
                    update["hitdietype"] = 8;
                    update["powercasting_ability"] = "@{intelligence_mod}+";
                    update["strength_save_prof"] = 0;
                    update["dexterity_save_prof"] = 0;
                    update["constitution_save_prof"] = 0;
                    update["intelligence_save_prof"] = "(@{pb})";
                    update["wisdom_save_prof"] = "(@{pb})";
                    update["charisma_save_prof"] = 0;
                    update["class_resource_name"] = "Superiority Dice";
                    break;
                case "Engineer":
                    update["hitdietype"] = 8;
                    update["powercasting_ability"] = "@{intelligence_mod}+";
                    update["strength_save_prof"] = 0;
                    update["dexterity_save_prof"] = 0;
                    update["constitution_save_prof"] = "(@{pb})";
                    update["intelligence_save_prof"] = "(@{pb})";
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = 0;
                    update["class_resource_name"] = "Potent Aptitude";
                    break;
                case "Fighter":
                    update["hitdietype"] = 10;
                    update["powercasting_ability"] = "0*";
                    update["strength_save_prof"] = "(@{pb})";
                    update["dexterity_save_prof"] = 0;
                    update["constitution_save_prof"] = "(@{pb})";
                    update["intelligence_save_prof"] = 0;
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = 0;
                    update["class_resource_name"] = "Second Wind";
                    break;
                case "Monk":
                    update["hitdietype"] = 8;
                    update["powercasting_ability"] = "0*";
                    update["strength_save_prof"] = "(@{pb})";
                    update["dexterity_save_prof"] = "(@{pb})";
                    update["constitution_save_prof"] = 0;
                    update["intelligence_save_prof"] = 0;
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = 0;
                    update["class_resource_name"] = "Ki";
                    break;
                case "Guardian":
                    update["hitdietype"] = 10;
                    update["powercasting_ability"] = "@{wisdom_mod}+";
                    update["strength_save_prof"] = 0;
                    update["dexterity_save_prof"] = 0;
                    update["constitution_save_prof"] = "(@{pb})";
                    update["intelligence_save_prof"] = 0;
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = "(@{pb})";
                    update["class_resource_name"] = "Channel The Force";
                    break;
                case "Scout":
                    update["hitdietype"] = 10;
                    update["powercasting_ability"] = "@{intelligence_mod}+";
                    update["strength_save_prof"] = "(@{pb})";
                    update["dexterity_save_prof"] = "(@{pb})";
                    update["constitution_save_prof"] = 0;
                    update["intelligence_save_prof"] = 0;
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = 0;
                    update["class_resource_name"] = "";
                    break;
                case "Operative":
                    update["hitdietype"] = 8;
                    update["powercasting_ability"] = "0*";
                    update["strength_save_prof"] = 0;
                    update["dexterity_save_prof"] = "(@{pb})";
                    update["constitution_save_prof"] = 0;
                    update["intelligence_save_prof"] = "(@{pb})";
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = 0;
                    update["class_resource_name"] = "";
                    break;
                case "Sentinel":
                    update["hitdietype"] = 8;
                    update["powercasting_ability"] = "@{wisdom_mod}+";
                    update["strength_save_prof"] = 0;
                    update["dexterity_save_prof"] = "(@{pb})";
                    update["constitution_save_prof"] = 0;
                    update["intelligence_save_prof"] = 0;
                    update["wisdom_save_prof"] = 0;
                    update["charisma_save_prof"] = "(@{pb})";
                    update["class_resource_name"] = "Force Points";
                    break;
                case "Consular":
                    update["hitdietype"] = 6;
                    update["powercasting_ability"] = "@{wisdom_mod}+";
                    update["strength_save_prof"] = 0;
                    update["dexterity_save_prof"] = 0;
                    update["constitution_save_prof"] = 0;
                    update["intelligence_save_prof"] = 0;
                    update["wisdom_save_prof"] = "(@{pb})";
                    update["charisma_save_prof"] = "(@{pb})";
                    update["class_resource_name"] = "";
                    break;
            }
            setAttrs(update, {silent: true});
        };
    });
    set_level();
};

var set_level = function() {
    getAttrs(["base_level","multiclass1_flag","multiclass2_flag","multiclass3_flag","multiclass1_lvl","multiclass2_lvl","multiclass3_lvl","class","multiclass1","multiclass2","multiclass3", "tech_fighter", "tech_operative", "custom_class", "cust_powerslots", "cust_classname", "level_calculations", "class", "subclass", "multiclass1_subclass","multiclass2_subclass","multiclass3_subclass"], function(v) {
        var update = {};
        var callbacks = [];
        var multiclass = (v.multiclass1_flag && v.multiclass1_flag === "1") || (v.multiclass2_flag && v.multiclass2_flag === "1") || (v.multiclass3_flag && v.multiclass3_flag === "1") ? true : false;
        var finalclass = v["custom_class"] && v["custom_class"] != "0" ? v["cust_powerslots"] : v["class"];
        var finallevel = (v.base_level && v.base_level > 0) ? parseInt(v.base_level,10) : 1;
        var charclass = v.custom_class && v.custom_class != "0" ? v["cust_classname"] : v["class"];
        var hitdie_final = multiclass ? "?{Hit Die Class|" + charclass + ",@{hitdietype}" : "@{hitdietype}";
        var subclass = v.subclass ? v.subclass + " " : "";
        var class_display = subclass + charclass + " " + finallevel;

        // This nested array is used to determine the overall powercasting level for the character.
        var classes = [ [finalclass.toLowerCase(), v["base_level"]] ];

        if(v.multiclass1_flag && v.multiclass1_flag === "1") {
            var multiclasslevel = (v["multiclass1_lvl"] && v["multiclass1_lvl"] > 0) ? parseInt(v["multiclass1_lvl"], 10) : 1;
            finallevel = finallevel + multiclasslevel;
            hitdie_final = hitdie_final + "|" + v["multiclass1"].charAt(0).toUpperCase() + v["multiclass1"].slice(1) + "," + checkHitDie(v["multiclass1"]);
            classes.push([ v["multiclass1"], multiclasslevel ]);
            var subclass = v.multiclass1_subclass ? v.multiclass1_subclass + " " : "";
            class_display = class_display + ", " + subclass + v.multiclass1 + " " + multiclasslevel;
        };
        if(v.multiclass2_flag && v.multiclass2_flag === "1") {
            var multiclasslevel = (v["multiclass2_lvl"] && v["multiclass2_lvl"] > 0) ? parseInt(v["multiclass2_lvl"], 10) : 1;
            finallevel = finallevel + multiclasslevel;
            hitdie_final = hitdie_final + "|" + v["multiclass2"].charAt(0).toUpperCase() + v["multiclass2"].slice(1) + "," + checkHitDie(v["multiclass2"]);
            classes.push([ v["multiclass2"], multiclasslevel ]);
            var subclass = v.multiclass2_subclass ? v.multiclass2_subclass + " " : "";
            class_display = class_display + ", " + subclass + v.multiclass2 + " " + multiclasslevel;
        };
        if(v.multiclass3_flag && v.multiclass3_flag === "1") {
            var multiclasslevel = (v["multiclass3_lvl"] && v["multiclass3_lvl"] > 0) ? parseInt(v["multiclass3_lvl"], 10) : 1;
            finallevel = finallevel + multiclasslevel;
            hitdie_final = hitdie_final + "|" + v["multiclass3"].charAt(0).toUpperCase() + v["multiclass3"].slice(1) + "," + checkHitDie(v["multiclass3"]);
            classes.push([ v["multiclass3"], multiclasslevel ]);
            var subclass = v.multiclass3_subclass ? v.multiclass3_subclass + " " : "";
            class_display = class_display + ", " + subclass + v.multiclass3 + " " + multiclasslevel;
        };

        var casterlevel = checkCasterLevel(classes, v["tech_fighter"], v["tech_operative"]);

        update["hitdie_final"] = multiclass ? hitdie_final + "}" : hitdie_final;
        update["level"] = finallevel;
        update["caster_level"] = casterlevel;
        update["class_display"] = class_display;

        if(!v["level_calculations"] || v["level_calculations"] == "on") {
            update["hit_dice_max"] = finallevel;
            callbacks.push( function() {update_power_slots();} );
        }
        callbacks.push( function() {update_pb();} );
        setAttrs(update, {silent: true}, function() {callbacks.forEach(function(callback) {callback(); })} );
    });
};

var isMultiCaster = function(classes, tech_fighter, tech_operative) {
    var singlecaster = false;
    var multicaster = false;
    _.each(classes, function(multiclass) {
        var caster = getCasterType(multiclass[0], multiclass[1], tech_fighter, tech_operative) > 0;
        if(caster && singlecaster) {
            multicaster = true;
        } else if(caster) {
            singlecaster = true;
        }
    });
    return multicaster;
};

var getCasterType = function(class_string, levels, tech_fighter, tech_operative) {
    var full = ["scholar","engineer","druid","sorcerer","consular","full"];
    var half = ["guardian","scout","half"];
    if(full.indexOf(class_string) != -1) {
        return 1;
    } else if(half.indexOf(class_string) != -1) {
        return (levels == 1) ? 0 : (1/2);
    } else if(class_string === "third" || (class_string === "fighter" && tech_fighter === "1") || (class_string === "operative" && tech_operative === "1")) {
        return (levels == 1 || levels == 2) ? 0 : (1/3);
    } else {
        return 0;
    }
};

var checkCasterLevel = function(classes, tech_fighter, tech_operative) {
    console.log("CHECKING CASTER LEVEL");
    var multicaster = isMultiCaster(classes, tech_fighter, tech_operative);
    var totalcasterlevel = 0;
    _.each(classes, function(multiclass) {
        var casterlevel = parseInt(multiclass[1], 10) * getCasterType(multiclass[0], multiclass[1], tech_fighter, tech_operative);
        // Characters with multiple powercasting classes round down the casting level for that class
        // Character with a single powercasting class round up the casting level
        totalcasterlevel = totalcasterlevel + (multicaster ? Math.floor(casterlevel) : Math.ceil(casterlevel));
    });
    return totalcasterlevel;
};

var checkHitDie = function(class_string) {
    var d10class = ["fighter","guardian","scout"];
    var d8class = ["scholar","engineer","druid","monk","operative","sentinel"];
    var d6class = ["sorcerer","consular"];
    if(class_string === "berserker") {return "12"}
    else if (d10class.indexOf(class_string) != -1) {return "10"}
    else if (d8class.indexOf(class_string) != -1) {return "8"}
    else if (d6class.indexOf(class_string) != -1) {return "6"}
    else {return "0"};
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

