var update_attr = function(attr) {
    getSectionIDs("repeating_inventory", function(idarray) {
        update_inventory_from_attr_change("repeating_inventory_", idarray, attr);
    });
    getSectionIDs("repeating_hiddeninventory", function(idarray) {
        update_inventory_from_attr_change("repeating_hiddeninventory_", idarray, attr);
    });
};

var update_inventory_from_attr_change = function(inventory, idarray, attr) {
    var update = {};
    var attr_fields = [attr + "_base",attr + "_bonus"];
    _.each(idarray, function(currentID, i) {
        attr_fields.push(inventory + currentID + "_equipped");
        attr_fields.push(inventory + currentID + "_itemmodifiers");
    });
    getAttrs(attr_fields, function(v) {
        var base = v[attr + "_base"] && !isNaN(parseInt(v[attr + "_base"], 10)) ? parseInt(v[attr + "_base"], 10) : 10;
        var bonus = v[attr + "_bonus"] && !isNaN(parseInt(v[attr + "_bonus"], 10)) ? parseInt(v[attr + "_bonus"], 10) : 0;
        var item_base = 0;
        var item_bonus = 0;
        _.each(idarray, function(currentID) {
            if((!v[inventory + currentID + "_equipped"] || v[inventory + currentID + "_equipped"] === "1") && v[inventory + currentID + "_itemmodifiers"] && v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf(attr > -1)) {
                var mods = v[inventory + currentID + "_itemmodifiers"].toLowerCase().split(",");
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
    getSectionIDs("repeating_inventory", function(idarray) {
        update_inventory_from_save_change("repeating_inventory_", idarray, attr);
    });

    getSectionIDs("repeating_hiddeninventory", function(idarray) {
        update_inventory_from_save_change("repeating_hiddeninventory_", idarray, attr);
    });
};

var update_inventory_from_save_change = function(inventory, idarray, attr) {
    var save_attrs = [attr + "_mod", attr + "_save_prof", attr + "_save_mod","pb","globalsavemod","pb_type"];
    _.each(idarray, function(currentID, i) {
        save_attrs.push(inventory + currentID + "_equipped");
        save_attrs.push(inventory + currentID + "_itemmodifiers");
    });

    getAttrs(save_attrs, function(v) {
        var attr_mod = v[attr + "_mod"] ? parseInt(v[attr + "_mod"], 10) : 0;
        var prof = v[attr + "_save_prof"] && v[attr + "_save_prof"] != 0 && !isNaN(v["pb"]) ? parseInt(v["pb"], 10) : 0;
        var save_mod = v[attr + "_save_mod"] && !isNaN(parseInt(v[attr + "_save_mod"], 10)) ? parseInt(v[attr + "_save_mod"], 10) : 0;
        var global = v["globalsavemod"] && !isNaN(v["globalsavemod"]) ? parseInt(v["globalsavemod"], 10) : 0;
        var items = 0;
        _.each(idarray, function(currentID) {
            if(v[inventory + currentID + "_equipped"] && v[inventory + currentID + "_equipped"] === "1" && v[inventory + currentID + "_itemmodifiers"] && (v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf("saving throws") > -1 || v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf(attr + " save") > -1)) {
                var mods = v[inventory + currentID + "_itemmodifiers"].toLowerCase().split(",");
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
    update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "technology", "lore", "investigation", "nature", "piloting", "animal_handling", "insight", "medicine", "perception", "survival", "deception", "intimidation", "performance", "persuasion", "ship_boost", "ship_ram", "ship_hide", "ship_maneuvering", "ship_patch", "ship_regulation", "ship_astrogation", "ship_data", "ship_probe", "ship_scan", "ship_impress", "ship_interfere", "ship_menace", "ship_swindle"]);
};

var update_skills = function (skills_array) {
    var skill_parent = {
        athletics: "strength",
        acrobatics: "dexterity",
        sleight_of_hand: "dexterity",
        stealth: "dexterity",
        ship_hide: "dexterity",
        technology: "intelligence",
        lore: "intelligence",
        investigation: "intelligence",
        nature: "intelligence",
        piloting: "intelligence",
        animal_handling: "wisdom",
        insight: "wisdom",
        medicine: "wisdom",
        perception: "wisdom",
        survival: "wisdom",
        deception: "charisma",
        intimidation: "charisma",
        performance: "charisma",
        persuasion: "charisma",
        ship_boost: "strength",
        ship_ram: "strength",
        ship_maneuvering: "dexterity",
        ship_patch: "constitution",
        ship_regulation: "constitution",
        ship_astrogation: "intelligence",
        ship_data: "intelligence",
        ship_probe: "intelligence",
        ship_scan: "wisdom",
        ship_impress: "charisma",
        ship_interfere: "charisma",
        ship_menace: "charisma",
        ship_swindle: "charisma"};
    var attrs_to_get = ["pb","pb_type","jack_of_all_trades","jack"];
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
        update_inventory_from_skill_change("repeating_inventory_", idarray, callbacks, attrs_to_get, skill_parent, skills_array);
    });

    getSectionIDs("repeating_hiddeninventory", function(idarray) {
        update_inventory_from_skill_change("repeating_hiddeninventory_", idarray, callbacks, attrs_to_get, skill_parent, skills_array);
    });
};

var update_inventory_from_skill_change = function(inventory, idarray, callbacks, attrs_to_get, skill_parent, skills_array) {
    var update = {};

    _.each(idarray, function(currentID, i) {
        attrs_to_get.push(inventory + currentID + "_equipped");
        attrs_to_get.push(inventory + currentID + "_itemmodifiers");
    });

    getAttrs(attrs_to_get, function(v) {
        _.each(skills_array, function(s) {
            console.log("UPDATING SKILL: " + s);
            var attr_mod = v[skill_parent[s] + "_mod"] ? parseInt(v[skill_parent[s] + "_mod"], 10) : 0;
            var prof = v[s + "_prof"] != 0 && !isNaN(v["pb"]) ? parseInt(v["pb"], 10) : 0;
            var flat = v[s + "_flat"] && !isNaN(parseInt(v[s + "_flat"], 10)) ? parseInt(v[s + "_flat"], 10) : 0;
            var type = v[s + "_type"] && !isNaN(parseInt(v[s + "_type"], 10)) ? parseInt(v[s + "_type"], 10) : 1;
            var jack = v["jack_of_all_trades"] && v["jack_of_all_trades"] != 0 && v["jack"] ? v["jack"] : 0;
            var item_bonus = 0;

            _.each(idarray, function(currentID) {
                if(v[inventory + currentID + "_equipped"] && v[inventory + currentID + "_equipped"] === "1" && v[inventory + currentID + "_itemmodifiers"] && (v[inventory + currentID + "_itemmodifiers"].toLowerCase().replace(/ /g,"_").indexOf(s) > -1 || v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf("ability checks") > -1)) {
                    var mods = v[inventory + currentID + "_itemmodifiers"].toLowerCase().split(",");
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
};

var update_tool = function(tool_id) {
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
            }
            else {
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


var check_itemmodifiers = function(modifiers, previousValue) {
    var mods = modifiers.toLowerCase().split(",");
    if(previousValue) {
        prevmods = previousValue.toLowerCase().split(",");
        mods = _.union(mods, prevmods);
    };
    _.each(mods, function(mod) {
        if(mod.indexOf("ac:") > -1 || mod.indexOf("ac +") > -1 || mod.indexOf("ac -") > -1) {update_ac();};
        if(mod.indexOf("power") > -1) {update_power_info();};
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
        if(mod.indexOf("technology") > -1) {update_skills(["technology"]);};
        if(mod.indexOf("athletics") > -1) {update_skills(["athletics"]);};
        if(mod.indexOf("deception") > -1) {update_skills(["deception"]);};
        if(mod.indexOf("lore") > -1) {update_skills(["lore"]);};
        if(mod.indexOf("insight") > -1) {update_skills(["insight"]);};
        if(mod.indexOf("intimidation") > -1) {update_skills(["intimidation"]);};
        if(mod.indexOf("investigation") > -1) {update_skills(["investigation"]);};
        if(mod.indexOf("medicine") > -1) {update_skills(["medicine"]);};
        if(mod.indexOf("nature") > -1) {update_skills(["nature"]);};
        if(mod.indexOf("perception") > -1) {update_skills(["perception"]);};
        if(mod.indexOf("performance") > -1) {update_skills(["performance"]);};
        if(mod.indexOf("persuasion") > -1) {update_skills(["persuasion"]);};
        if(mod.indexOf("piloting") > -1) {update_skills(["piloting"]);};
        if(mod.indexOf("sleight of hand") > -1) {update_skills(["sleight_of_hand"]);};
        if(mod.indexOf("stealth") > -1) {update_skills(["stealth"]);};
        if(mod.indexOf("survival") > -1) {update_skills(["survival"]);};
        if(mod.indexOf("ship boost") > -1) {update_skills(["ship_boost"]);};
        if(mod.indexOf("ship ram") > -1) {update_skills(["ship_ram"]);};
        if(mod.indexOf("ship hide") > -1) {update_skills(["ship_hide"]);};
        if(mod.indexOf("ship maneuvering") > -1) {update_skills(["ship_maneuvering"]);};
        if(mod.indexOf("ship patch") > -1) {update_skills(["ship_patch"]);};
        if(mod.indexOf("ship regulation") > -1) {update_skills(["ship_regulation"]);};
        if(mod.indexOf("ship astrogation") > -1) {update_skills(["ship_astrogation"]);};
        if(mod.indexOf("ship data") > -1) {update_skills(["ship_data"]);};
        if(mod.indexOf("ship probe") > -1) {update_skills(["ship_probe"]);};
        if(mod.indexOf("ship scan") > -1) {update_skills(["ship_scan"]);};
        if(mod.indexOf("ship impress") > -1) {update_skills(["ship_impress"]);};
        if(mod.indexOf("ship interfere") > -1) {update_skills(["ship_interfere"]);};
        if(mod.indexOf("ship menace") > -1) {update_skills(["ship_menace"]);};
        if(mod.indexOf("ship swindle") > -1) {update_skills(["ship_swindle"]);};
    });
};

var create_attack_from_item = function(itemid, options) {
    var inventory = "repeating_inventory_";
    var isHidden = false;
    if(options && options.hidden) {
        inventory = "repeating_hiddeninventory_";
        isHidden = true;
    }
    var update = {};
    var newrowid = generateRowID();
    update[inventory + itemid + "_itemattackid"] = newrowid;
    if(options && options.versatile) {
        var newrowid2 = generateRowID();
        update[inventory + itemid + "_itemattackid"] += "," + newrowid2;

        setAttrs(update, {}, function() {
            update_attack_from_item(itemid, newrowid, {newattack: true, versatile: "primary", hidden: isHidden});
            update_attack_from_item(itemid, newrowid2, {newattack: true, versatile: "secondary", hidden: isHidden});
        });
    }
    else {
        setAttrs(update, {}, update_attack_from_item(itemid, newrowid, {newattack: true, hidden: isHidden}));
    }
};

var update_attack_from_item = function(itemid, attackid, options) {
    var inventory = "repeating_inventory_";
    var isHidden = false;
    if(options && options.hidden) {
        inventory = "repeating_hiddeninventory_";
        isHidden = true;
    }

    getAttrs([inventory + itemid + "_itemname",inventory + itemid + "_itemproperties",inventory + itemid + "_itemmodifiers", "strength", "dexterity"], function(v) {
        var update = {}; var itemtype; var damage; var damagetype; var damage2; var damagetype2; var attackmod; var damagemod; var range;
        var alt = {};

        if(options && options.newattack) {
            update["repeating_attack_" + attackid + "_options-flag"] = "0";
            update["repeating_attack_" + attackid + "_itemid"] = itemid;
        }

        if(v[inventory + itemid + "_itemmodifiers"] && v[inventory + itemid + "_itemmodifiers"] != "") {
            var mods = v[inventory + itemid + "_itemmodifiers"].split(",");
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

        if(v[inventory + itemid + "_itemname"] && v[inventory + itemid + "_itemname"] != "") {
            update["repeating_attack_" + attackid + "_atkname"] = v[inventory + itemid + "_itemname"];
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
        var finesse = v[inventory + itemid + "_itemproperties"] && /finesse/i.test(v[inventory + itemid + "_itemproperties"]);
        if( (itemtype && itemtype.indexOf("Ranged") > -1) || (finesse && +v.dexterity > +v.strength)) {
            update["repeating_attack_" + attackid + "_atkattr_base"] = "@{dexterity_mod}";
            update["repeating_attack_" + attackid + "_dmgattr"] = "@{dexterity_mod}";
        }
        else {
            update["repeating_attack_" + attackid + "_atkattr_base"] = "@{strength_mod}";
            update["repeating_attack_" + attackid + "_dmgattr"] = "@{strength_mod}";
        }
        if(attackmod && damagemod && attackmod == damagemod) {
            update["repeating_attack_" + attackid + "_atkpower"] = parseInt(attackmod, 10);
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
            update["repeating_attack_" + attackid + "_atkpower"] = "";
        }
        var callback = function() {update_attacks(attackid, "item")};
        setAttrs(update, {silent: true}, callback);
    });
};

var create_resource_from_item = function(itemid, options) {
    var update = {};
    var newrowid = generateRowID();
    var inventory = "repeating_inventory_";
    var isHidden = false;
    if(options && options.hidden){
        inventory = "repeating_hiddeninventory_";
        isHidden = true;
    }

    getAttrs(["other_resource_name"], function(x) {
        if(!x.other_resource_name || x.other_resource_name == "") {
            update[inventory + itemid + "_itemresourceid"] = "other_resource";
            setAttrs(update, {}, update_resource_from_item(itemid, "other_resource", true, {hidden: isHidden}));
        }
        else {
            getSectionIDs("repeating_resource", function(idarray) {
                if(idarray.length == 0) {
                    update[inventory + itemid + "_itemresourceid"] = newrowid + "_resource_left";
                    setAttrs(update, {}, update_resource_from_item(itemid, newrowid + "_resource_left", true, {hidden: isHidden}));
                }
                else {
                    var resource_names = [];
                    _.each(idarray, function(currentID, i) {
                        resource_names.push("repeating_resource_" + currentID + "_resource_left_name");
                        resource_names.push("repeating_resource_" + currentID + "_resource_right_name");
                    });

                    getAttrs(resource_names, function(y) {
                        var existing = false;
                        _.each(idarray, function(currentID, i) {
                            if((!y["repeating_resource_" + currentID + "_resource_left_name"] || y["repeating_resource_" + currentID + "_resource_left_name"] === "") && existing == false) {
                                update[inventory + itemid + "_itemresourceid"] = currentID + "_resource_left";
                                setAttrs(update, {}, update_resource_from_item(itemid, currentID + "_resource_left", true, {hidden:isHidden}));
                                existing = true;
                            }
                            else if((!y["repeating_resource_" + currentID + "_resource_right_name"] || y["repeating_resource_" + currentID + "_resource_right_name"] === "") && existing == false) {
                                update[inventory + itemid + "_itemresourceid"] = currentID + "_resource_right";
                                setAttrs(update, {}, update_resource_from_item(itemid, currentID + "_resource_right", true, {hidden:isHidden}));
                                existing = true;
                            };
                        });
                        if(!existing) {
                            update[inventory + itemid + "_itemresourceid"] = newrowid + "_resource_left";
                            setAttrs(update, {}, update_resource_from_item(itemid, newrowid + "_resource_left", true, {hidden:isHidden}));
                        }
                    });

                };
            });
        };
    });

};

var update_resource_from_item = function(itemid, resourceid, newresource, options) {
    var inventory = "repeating_inventory_";
    if(options && options.hidden) {
        inventory = "repeating_hiddeninventory_";
    }

    getAttrs([inventory + itemid + "_itemname",inventory + itemid + "_itemcount"], function(v) {
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

        if(!v[inventory + itemid + "_itemname"]) {
            update[inventory + itemid + "_useasresource"] = 0;
            update[inventory + itemid + "_itemresourceid"] = "";
            remove_resource(resourceid);
        };
        if(v[inventory + itemid + "_itemname"] && v[inventory + itemid + "_itemname"] != "") {
            update[id + "_name"] = v[inventory + itemid + "_itemname"];
        };
        if(v[inventory + itemid + "_itemcount"] && v[inventory + itemid + "_itemcount"] != "") {
            update[id] = v[inventory + itemid + "_itemcount"];
        };

        setAttrs(update, {silent: true});

    });
};

var update_item_from_resource = function(resourceid, itemid) {
    var update = {};
    var inventory = "repeating_inventory_";

    getAttrs(["repeating_hiddeninventory_" + itemid + "_itemname"], function(x) {
        if(x["repeating_hiddeninventory_" + itemid + "_itemname"]) {
            inventory = "repeating_hiddeninventory_";
        }
    });
    getAttrs([resourceid, resourceid + "_name"], function(v) {
        update[inventory + itemid + "_itemcount"] = v[resourceid];
        update[inventory + itemid + "_itemname"] = v[resourceid + "_name"];
        setAttrs(update, {silent: true}, function() {update_weight()});
    });
};

var create_attack_from_power = function(lvl, powerid, character_id) {
    var update = {};
    var newrowid = generateRowID();
    update["repeating_power-" + lvl + "_" + powerid + "_powerattackid"] = newrowid;
    update["repeating_power-" + lvl + "_" + powerid + "_rollcontent"] = "%{" + character_id + "|repeating_attack_" + newrowid + "_attack}";
    setAttrs(update, {}, update_attack_from_power(lvl, powerid, newrowid, true));
}

var update_attack_from_power = function(lvl, powerid, attackid, newattack) {
    getAttrs(["repeating_power-" + lvl + "_" + powerid + "_powername",
        "repeating_power-" + lvl + "_" + powerid + "_powerrange",
        "repeating_power-" + lvl + "_" + powerid + "_powertarget",
        "repeating_power-" + lvl + "_" + powerid + "_powerattack",
        "repeating_power-" + lvl + "_" + powerid + "_powerdamage",
        "repeating_power-" + lvl + "_" + powerid + "_powerdamage2",
        "repeating_power-" + lvl + "_" + powerid + "_powerdamagetype",
        "repeating_power-" + lvl + "_" + powerid + "_powerdamagetype2",
        "repeating_power-" + lvl + "_" + powerid + "_powerhealing",
        "repeating_power-" + lvl + "_" + powerid + "_powerdmgmod",
        "repeating_power-" + lvl + "_" + powerid + "_powersave",
        "repeating_power-" + lvl + "_" + powerid + "_powersavesuccess",
        "repeating_power-" + lvl + "_" + powerid + "_powerhldie",
        "repeating_power-" + lvl + "_" + powerid + "_powerhldietype",
        "repeating_power-" + lvl + "_" + powerid + "_powerhlbonus",
        "repeating_power-" + lvl + "_" + powerid + "_powerlevel",
        "repeating_power-" + lvl + "_" + powerid + "_includedesc",
        "repeating_power-" + lvl + "_" + powerid + "_powerdescription",
        "repeating_power-" + lvl + "_" + powerid + "_powerathigherlevels",
        "repeating_power-" + lvl + "_" + powerid + "_power_damage_progression",
        "repeating_power-" + lvl + "_" + powerid + "_innate",
        "repeating_power-" + lvl + "_" + powerid + "_power_ability",
        "powercasting_ability",
        "character_id"], function(v) {
        var update = {};
        var description = "";
        var powerAbility = v["repeating_power-" + lvl + "_" + powerid + "_power_ability"] != "power" ? v["repeating_power-" + lvl + "_" + powerid + "_power_ability"].slice(0, -1) : "power";
        update["repeating_attack_" + attackid + "_atkattr_base"] = powerAbility;

        if(newattack) {
            update["repeating_attack_" + attackid + "_options-flag"] = "0";
            update["repeating_attack_" + attackid + "_powerid"] = powerid;
            update["repeating_attack_" + attackid + "_powerlevel"] = lvl;
        } else {
            update["repeating_power-" + lvl + "_" + powerid + "_rollcontent"] = "%{" + v["character_id"] + "|repeating_attack_" + attackid + "_attack}";
        }

        if(v["repeating_power-" + lvl + "_" + powerid + "_power_ability"] == "power") {
            update["repeating_attack_" + attackid + "_savedc"] = "(@{power_save_dc})";
        } else if (v["repeating_power-" + lvl + "_" + powerid + "_power_ability"]) {
            update["repeating_attack_" + attackid + "_savedc"] = "(" + powerAbility + "+8+@{power_dc_mod}+@{pb})";
        }

        if(v["repeating_power-" + lvl + "_" + powerid + "_powername"] && v["repeating_power-" + lvl + "_" + powerid + "_powername"] != "") {
            update["repeating_attack_" + attackid + "_atkname"] = v["repeating_power-" + lvl + "_" + powerid + "_powername"];
        }
        if(!v["repeating_power-" + lvl + "_" + powerid + "_powerattack"] || v["repeating_power-" + lvl + "_" + powerid + "_powerattack"] === "None") {
            update["repeating_attack_" + attackid + "_atkflag"] = "0";
        }
        else {
            update["repeating_attack_" + attackid + "_atkflag"] = "{{attack=1}}";
            description = description + v["repeating_power-" + lvl + "_" + powerid + "_powerattack"] + " Power Attack. ";
        }

        if(v["repeating_power-" + lvl + "_" + powerid + "_powerdamage"] && v["repeating_power-" + lvl + "_" + powerid + "_powerdamage"] != "") {
            update["repeating_attack_" + attackid + "_dmgflag"] = "{{damage=1}} {{dmg1flag=1}}";
            if(v["repeating_power-" + lvl + "_" + powerid + "_power_damage_progression"] && v["repeating_power-" + lvl + "_" + powerid + "_power_damage_progression"] === "Cantrip Dice") {
                update["repeating_attack_" + attackid + "_dmgbase"] = "[[round((@{level} + 1) / 6 + 0.5)]]" + v["repeating_power-" + lvl + "_" + powerid + "_powerdamage"].substring(1);
            }
            else {
                update["repeating_attack_" + attackid + "_dmgbase"] = v["repeating_power-" + lvl + "_" + powerid + "_powerdamage"];
            }
        }
        else {
            update["repeating_attack_" + attackid + "_dmgflag"] = "0"
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powerdmgmod"] && v["repeating_power-" + lvl + "_" + powerid + "_powerdmgmod"] === "Yes") {
            update["repeating_attack_" + attackid + "_dmgattr"] = powerAbility;
        }
        else {
            update["repeating_attack_" + attackid + "_dmgattr"] = "0";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powerdamagetype"]) {
            update["repeating_attack_" + attackid + "_dmgtype"] = v["repeating_power-" + lvl + "_" + powerid + "_powerdamagetype"];
        }
        else {
            update["repeating_attack_" + attackid + "_dmgtype"] = "";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powerdamage2"]) {
            update["repeating_attack_" + attackid + "_dmg2base"] = v["repeating_power-" + lvl + "_" + powerid + "_powerdamage2"];
            update["repeating_attack_" + attackid + "_dmg2attr"] = 0;
            update["repeating_attack_" + attackid + "_dmg2flag"] = "{{damage=1}} {{dmg2flag=1}}";
        }
        else {
            update["repeating_attack_" + attackid + "_dmg2base"] = "";
            update["repeating_attack_" + attackid + "_dmg2attr"] = 0;
            update["repeating_attack_" + attackid + "_dmg2flag"] = "0";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powerdamagetype2"]) {
            update["repeating_attack_" + attackid + "_dmg2type"] = v["repeating_power-" + lvl + "_" + powerid + "_powerdamagetype2"];
        }
        else {
            update["repeating_attack_" + attackid + "_dmg2type"] = "";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powerrange"]) {
            update["repeating_attack_" + attackid + "_atkrange"] = v["repeating_power-" + lvl + "_" + powerid + "_powerrange"];
        }
        else {
            update["repeating_attack_" + attackid + "_atkrange"] = "";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powerrange"]) {
            update["repeating_attack_" + attackid + "_atkrange"] = v["repeating_power-" + lvl + "_" + powerid + "_powerrange"];
        }
        else {
            update["repeating_attack_" + attackid + "_atkrange"] = "";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powersave"]) {
            update["repeating_attack_" + attackid + "_saveflag"] = "{{save=1}} {{saveattr=@{saveattr}}} {{savedesc=@{saveeffect}}} {{savedc=[[[[@{savedc}]][SAVE]]]}}";
            update["repeating_attack_" + attackid + "_saveattr"] = v["repeating_power-" + lvl + "_" + powerid + "_powersave"];
        }
        else {
            update["repeating_attack_" + attackid + "_saveflag"] = "0";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powersavesuccess"]) {
            update["repeating_attack_" + attackid + "_saveeffect"] = v["repeating_power-" + lvl + "_" + powerid + "_powersavesuccess"];
        }
        else {
            update["repeating_attack_" + attackid + "_saveeffect"] = "";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powerhldie"] && v["repeating_power-" + lvl + "_" + powerid + "_powerhldie"] != "" && v["repeating_power-" + lvl + "_" + powerid + "_powerhldietype"] && v["repeating_power-" + lvl + "_" + powerid + "_powerhldietype"] != "") {
            var bonus = "";
            var powerlevel = v["repeating_power-" + lvl + "_" + powerid + "_powerlevel"];
            var query = "?{Cast at what level?";
            for(i = 0; i < 10-powerlevel; i++) {
                query = query + "|Level " + (parseInt(i, 10) + parseInt(powerlevel, 10)) + "," + i;
            }
            query = query + "}";
            if(v["repeating_power-" + lvl + "_" + powerid + "_powerhlbonus"] && v["repeating_power-" + lvl + "_" + powerid + "_powerhlbonus"] != "") {
                bonus = "+(" + v["repeating_power-" + lvl + "_" + powerid + "_powerhlbonus"] + "*" + query + ")";
            }
            update["repeating_attack_" + attackid + "_hldmg"] = "{{hldmg=[[(" + v["repeating_power-" + lvl + "_" + powerid + "_powerhldie"] + "*" + query + ")" + v["repeating_power-" + lvl + "_" + powerid + "_powerhldietype"] + bonus + "]]}}";
        }
        else {
            update["repeating_attack_" + attackid + "_hldmg"] = "";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powerhealing"] && v["repeating_power-" + lvl + "_" + powerid + "_powerhealing"] != "") {
            if(!v["repeating_power-" + lvl + "_" + powerid + "_powerdamage"] || v["repeating_power-" + lvl + "_" + powerid + "_powerdamage"] === "") {
                update["repeating_attack_" + attackid + "_dmgbase"] = v["repeating_power-" + lvl + "_" + powerid + "_powerhealing"];
                update["repeating_attack_" + attackid + "_dmgflag"] = "{{damage=1}} {{dmg1flag=1}}";
                update["repeating_attack_" + attackid + "_dmgtype"] = "Healing";
            }
            else if(!v["repeating_power-" + lvl + "_" + powerid + "_powerdamage2"] || v["repeating_power-" + lvl + "_" + powerid + "_powerdamage2"] === "") {
                update["repeating_attack_" + attackid + "_dmg2base"] = v["repeating_power-" + lvl + "_" + powerid + "_powerhealing"];
                update["repeating_attack_" + attackid + "_dmg2flag"] = "{{damage=1}} {{dmg2flag=1}}";
                update["repeating_attack_" + attackid + "_dmg2type"] = "Healing";
            }
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_innate"]) {
            update["repeating_attack_" + attackid + "_power_innate"] = v["repeating_power-" + lvl + "_" + powerid + "_innate"];
        }
        else {
            update["repeating_attack_" + attackid + "_power_innate"] = "";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_powertarget"]) {
            description = description + v["repeating_power-" + lvl + "_" + powerid + "_powertarget"] + ". ";
        }
        if(v["repeating_power-" + lvl + "_" + powerid + "_includedesc"] && v["repeating_power-" + lvl + "_" + powerid + "_includedesc"] === "on") {
            description = v["repeating_power-" + lvl + "_" + powerid + "_powerdescription"];
            if(v["repeating_power-" + lvl + "_" + powerid + "_powerathigherlevels"] && v["repeating_power-" + lvl + "_" + powerid + "_powerathigherlevels"] != "") {
                description = description + "\n\nAt Higher Levels: " + v["repeating_power-" + lvl + "_" + powerid + "_powerathigherlevels"];
            }
        }
        else if(v["repeating_power-" + lvl + "_" + powerid + "_includedesc"] && v["repeating_power-" + lvl + "_" + powerid + "_includedesc"] === "off") {
            description = "";
        };
        update["repeating_attack_" + attackid + "_atk_desc"] = description;

        var callback = function() {update_attacks(attackid, "power")};
        setAttrs(update, {silent: true}, callback);
    });
};

var update_attacks = function(update_id, source) {
    console.log("DOING UPDATE_ATTACKS: " + update_id);
    if(update_id.substring(0,1) === "-" && update_id.length === 20) {
        do_update_attack([update_id], source);
    }
    else if(["strength","dexterity","constitution","intelligence","wisdom","charisma","powers","all"].indexOf(update_id) > -1) {
        getSectionIDs("repeating_attack", function(idarray) {
            if(update_id === "all") {
                do_update_attack(idarray);
            }
            else if(update_id === "powers") {
                var attack_attribs = [];
                _.each(idarray, function(id) {
                    attack_attribs.push("repeating_attack_" + id + "_powerid", "repeating_attack_" + id + "_powerlevel");
                });
                getAttrs(attack_attribs, function(v) {
                    var filteredIds = _.filter(idarray, function(id) {
                        return v["repeating_attack_" + id + "_powerid"] && v["repeating_attack_" + id + "_powerid"] != "";
                    });
                    var power_attacks = {};
                    _.each(filteredIds, function(attack_id) {
                        power_attacks[attack_id] = {
                            power_id: v["repeating_attack_" + attack_id + "_powerid"],
                            power_lvl: v["repeating_attack_" + attack_id + "_powerlevel"]
                        };
                    });
                    _.each(power_attacks, function(data, attack_id) { update_attack_from_power(data.power_lvl, data.power_id, attack_id); });
                });

            }
            else {
                var attack_attribs = ["powercasting_ability"];
                _.each(idarray, function(id) {
                    attack_attribs.push("repeating_attack_" + id + "_atkattr_base");
                    attack_attribs.push("repeating_attack_" + id + "_dmgattr");
                    attack_attribs.push("repeating_attack_" + id + "_dmg2attr");
                    attack_attribs.push("repeating_attack_" + id + "_savedc");
                });
                getAttrs(attack_attribs, function(v) {
                    var attr_attack_ids = [];
                    _.each(idarray, function(id) {
                        if((v["repeating_attack_" + id + "_atkattr_base"] && v["repeating_attack_" + id + "_atkattr_base"].indexOf(update_id) > -1) || (v["repeating_attack_" + id + "_dmgattr"] && v["repeating_attack_" + id + "_dmgattr"].indexOf(update_id) > -1) || (v["repeating_attack_" + id + "_dmg2attr"] && v["repeating_attack_" + id + "_dmg2attr"].indexOf(update_id) > -1) || (v["repeating_attack_" + id + "_savedc"] && v["repeating_attack_" + id + "_savedc"].indexOf(update_id) > -1) || (v["repeating_attack_" + id + "_savedc"] && v["repeating_attack_" + id + "_savedc"] === "(@{power_save_dc})" && v["powercasting_ability"] && v["powercasting_ability"].indexOf(update_id) > -1)) {
                            attr_attack_ids.push(id);
                        }
                    });
                    if(attr_attack_ids.length > 0) {
                        do_update_attack(attr_attack_ids);
                    }
                });
            };
        });
    };
};

var do_update_attack = function(attack_array, source) {
    var attack_attribs = ["level","d20","pb","pb_type","pbd_safe","dtype","globalpowermod","strength_mod","dexterity_mod","constitution_mod","intelligence_mod","wisdom_mod","charisma_mod","powercasting_ability","power_save_dc","power_attack_mod", "power_dc_mod", "global_damage_mod_roll", "global_damage_mod_crit"];
    _.each(attack_array, function(attackid) {
        attack_attribs.push("repeating_attack_" + attackid + "_atkflag");
        attack_attribs.push("repeating_attack_" + attackid + "_atkname");
        attack_attribs.push("repeating_attack_" + attackid + "_atkattr_base");
        attack_attribs.push("repeating_attack_" + attackid + "_atkmod");
        attack_attribs.push("repeating_attack_" + attackid + "_atkprofflag");
        attack_attribs.push("repeating_attack_" + attackid + "_atkpower");
        attack_attribs.push("repeating_attack_" + attackid + "_dmgflag");
        attack_attribs.push("repeating_attack_" + attackid + "_dmgbase");
        attack_attribs.push("repeating_attack_" + attackid + "_dmgattr");
        attack_attribs.push("repeating_attack_" + attackid + "_dmgmod");
        attack_attribs.push("repeating_attack_" + attackid + "_dmgtype");
        attack_attribs.push("repeating_attack_" + attackid + "_dmg2flag");
        attack_attribs.push("repeating_attack_" + attackid + "_dmg2base");
        attack_attribs.push("repeating_attack_" + attackid + "_dmg2attr");
        attack_attribs.push("repeating_attack_" + attackid + "_dmg2mod");
        attack_attribs.push("repeating_attack_" + attackid + "_dmg2type");
        attack_attribs.push("repeating_attack_" + attackid + "_dmgcustcrit");
        attack_attribs.push("repeating_attack_" + attackid + "_dmg2custcrit");
        attack_attribs.push("repeating_attack_" + attackid + "_saveflag");
        attack_attribs.push("repeating_attack_" + attackid + "_savedc");
        attack_attribs.push("repeating_attack_" + attackid + "_saveeffect");
        attack_attribs.push("repeating_attack_" + attackid + "_saveflat");
        attack_attribs.push("repeating_attack_" + attackid + "_hldmg");
        attack_attribs.push("repeating_attack_" + attackid + "_powerid");
        attack_attribs.push("repeating_attack_" + attackid + "_powerlevel");
        attack_attribs.push("repeating_attack_" + attackid + "_atkrange");
        attack_attribs.push("repeating_attack_" + attackid + "_itemid");
        attack_attribs.push("repeating_attack_" + attackid + "_ammo");
        attack_attribs.push("repeating_attack_" + attackid + "_global_damage_mod_field");
        attack_attribs.push("npc");
    });

    getAttrs(attack_attribs, function(v) {
        var isShipAttack = v.npc === "2";
        _.each(attack_array, function(attackid) {
            console.log("UPDATING ATTACK: " + attackid);
            var callbacks = [];
            var update = {};
            var hbonus = "";
            var hdmg1 = "";
            var hdmg2 = "";
            var dmg = "";
            var dmg2 = "";
            var rollbase = "";
            var powerattack = false;
            var powerattackmod = 0;
            var powersavemod = 0;
            var atkattr_abrev = "";
            var dmgattr_abrev = "";
            var dmg2attr_abrev = "";
            var pbd_safe = v["pbd_safe"] ? v["pbd_safe"] : "";
            var global_crit = v["repeating_attack_" + attackid + "_global_damage_mod_field"] && v["repeating_attack_" + attackid + "_global_damage_mod_field"] != "" ? "@{global_damage_mod_crit}" : "";
            var hldmgcrit = v["repeating_attack_" + attackid + "_hldmg"] && v["repeating_attack_" + attackid + "_hldmg"] != "" ? v["repeating_attack_" + attackid + "_hldmg"].slice(0, 7) + "crit" + v["repeating_attack_" + attackid + "_hldmg"].slice(7) : "";
            if(v["repeating_attack_" + attackid + "_powerid"] && v["repeating_attack_" + attackid + "_powerid"] != "") {
                powerattack = true;
                powerattackmod = v["power_attack_mod"] && !isNaN(parseInt(v["power_attack_mod"],10)) ? parseInt(v["power_attack_mod"],10) : 0;
                powersavemod = v["power_dc_mod"] && !isNaN(parseInt(v["power_dc_mod"],10)) ? parseInt(v["power_dc_mod"],10) : 0;
            };

            if(!v["repeating_attack_" + attackid + "_atkattr_base"] || v["repeating_attack_" + attackid + "_atkattr_base"] === "0") {
                atkattr_base = 0
            } else if(v["repeating_attack_" + attackid + "_atkattr_base"] && v["repeating_attack_" + attackid + "_atkattr_base"] === "power") {
                atkattr_base = parseInt(v[v["powercasting_ability"].substring(2, v["powercasting_ability"].length - 2)], 10);
                atkattr_abrev = v["powercasting_ability"].substring(2, 5).toUpperCase();
            } else {
                atkattr_base = parseInt(v[v["repeating_attack_" + attackid + "_atkattr_base"].substring(2, v["repeating_attack_" + attackid + "_atkattr_base"].length - 1)], 10);
                atkattr_abrev = v["repeating_attack_" + attackid + "_atkattr_base"].substring(2, 5).toUpperCase();
            };

            if(!v["repeating_attack_" + attackid + "_dmgattr"] || v["repeating_attack_" + attackid + "_dmgattr"] === "0") {
                dmgattr = 0;
            } else if(v["repeating_attack_" + attackid + "_dmgattr"] && v["repeating_attack_" + attackid + "_dmgattr"] === "power") {
                dmgattr = parseInt(v[v["powercasting_ability"].substring(2, v["powercasting_ability"].length - 2)], 10);
                dmgattr_abrev = v["powercasting_ability"].substring(2, 5).toUpperCase();
            } else {
                dmgattr = parseInt(v[v["repeating_attack_" + attackid + "_dmgattr"].substring(2, v["repeating_attack_" + attackid + "_dmgattr"].length - 1)], 10);
                dmgattr_abrev =v["repeating_attack_" + attackid + "_dmgattr"].substring(2, 5).toUpperCase();
            };

            if(!v["repeating_attack_" + attackid + "_dmg2attr"] || v["repeating_attack_" + attackid + "_dmg2attr"] === "0") {
                dmg2attr = 0;
            } else if(v["repeating_attack_" + attackid + "_dmg2attr"] && v["repeating_attack_" + attackid + "_dmg2attr"] === "power") {
                dmg2attr = parseInt(v[v["powercasting_ability"].substring(2, v["powercasting_ability"].length - 2)], 10);
                dmg2attr_abrev = v["powercasting_ability"].substring(2, 5).toUpperCase();
            } else {
                dmg2attr = parseInt(v[v["repeating_attack_" + attackid + "_dmg2attr"].substring(2, v["repeating_attack_" + attackid + "_dmg2attr"].length - 1)], 10);
                dmg2attr_abrev =v["repeating_attack_" + attackid + "_dmg2attr"].substring(2, 5).toUpperCase();
            };

            var dmgbase = v["repeating_attack_" + attackid + "_dmgbase"] && v["repeating_attack_" + attackid + "_dmgbase"] != "" ? v["repeating_attack_" + attackid + "_dmgbase"] : 0;
            var dmg2base = v["repeating_attack_" + attackid + "_dmg2base"] && v["repeating_attack_" + attackid + "_dmg2base"] != "" ? v["repeating_attack_" + attackid + "_dmg2base"] : 0;
            var dmgmod = v["repeating_attack_" + attackid + "_dmgmod"] && isNaN(parseInt(v["repeating_attack_" + attackid + "_dmgmod"],10)) === false ? parseInt(v["repeating_attack_" + attackid + "_dmgmod"],10) : 0;
            var dmg2mod = v["repeating_attack_" + attackid + "_dmg2mod"] && isNaN(parseInt(v["repeating_attack_" + attackid + "_dmg2mod"],10)) === false ? parseInt(v["repeating_attack_" + attackid + "_dmg2mod"],10) : 0;
            var dmgtype = v["repeating_attack_" + attackid + "_dmgtype"] ? v["repeating_attack_" + attackid + "_dmgtype"] + " " : "";
            var dmg2type = v["repeating_attack_" + attackid + "_dmg2type"] ? v["repeating_attack_" + attackid + "_dmg2type"] + " " : "";
            var pb = v["repeating_attack_" + attackid + "_atkprofflag"] && v["repeating_attack_" + attackid + "_atkprofflag"] != 0 && v.pb ? v.pb : 0;
            /* if(isShipAttack) {
                    pb = 0;
                } */
            var atkmod = v["repeating_attack_" + attackid + "_atkmod"] && v["repeating_attack_" + attackid + "_atkmod"] != "" ? parseInt(v["repeating_attack_" + attackid + "_atkmod"],10) : 0;
            var atkmag = v["repeating_attack_" + attackid + "_atkpower"] && v["repeating_attack_" + attackid + "_atkpower"] != "" ? parseInt(v["repeating_attack_" + attackid + "_atkpower"],10) : 0;
            var dmgmag = isNaN(atkmag) === false && atkmag != 0 && ((v["repeating_attack_" + attackid + "_dmgflag"] && v["repeating_attack_" + attackid + "_dmgflag"] != 0) || (v["repeating_attack_" + attackid + "_dmg2flag"] && v["repeating_attack_" + attackid + "_dmg2flag"] != 0)) ? "+ " + atkmag + " Power Bonus" : "";
            if(v["repeating_attack_" + attackid + "_atkflag"] && v["repeating_attack_" + attackid + "_atkflag"] != 0) {
                bonus_mod = atkattr_base + atkmod + atkmag + powerattackmod;
                if(v["pb_type"] && v["pb_type"] === "die") {
                    plus_minus = bonus_mod > -1 ? "+" : "";
                    bonus = bonus_mod + "+" + pb;
                }
                else {
                    bonus_mod = bonus_mod + parseInt(pb, 10);
                    plus_minus = bonus_mod > -1 ? "+" : "";
                    bonus = plus_minus + bonus_mod;
                };
            }
            else if(v["repeating_attack_" + attackid + "_saveflag"] && v["repeating_attack_" + attackid + "_saveflag"] != 0) {
                if(!v["repeating_attack_" + attackid + "_savedc"] || (v["repeating_attack_" + attackid + "_savedc"] && v["repeating_attack_" + attackid + "_savedc"] === "(@{power_save_dc})")) {
                    var tempdc = v["power_save_dc"];
                }
                else if(v["repeating_attack_" + attackid + "_savedc"] && v["repeating_attack_" + attackid + "_savedc"] === "(@{saveflat})") {
                    var tempdc = isNaN(parseInt(v["repeating_attack_" + attackid + "_saveflat"])) === false ? parseInt(v["repeating_attack_" + attackid + "_saveflat"]) : "0";
                }
                else {
                    var savedcattr = v["repeating_attack_" + attackid + "_savedc"].replace(/^[^{]*{/,"").replace(/\_.*$/,"");
                    var safe_pb = v["pb_type"] && v["pb_type"] === "die" ? parseInt(pb.substring(1), 10) / 2 : parseInt(pb,10);
                    var safe_attr = v[savedcattr + "_mod"] ? parseInt(v[savedcattr + "_mod"],10) : 0;
                    var tempdc = 8 + safe_attr + safe_pb + powersavemod;
                };
                bonus = "DC" + tempdc;
            }
            else {
                bonus = "-";
            }
            if(v["repeating_attack_" + attackid + "_dmgflag"] && v["repeating_attack_" + attackid + "_dmgflag"] != 0) {
                if(powerattack === true && dmgbase.indexOf("[[round((@{level} + 1) / 6 + 0.5)]]") > -1) {
                    // SPECIAL CANTRIP DAMAGE
                    dmgdiestring = Math.round(((parseInt(v["level"], 10) + 1) / 6) + 0.5).toString()
                    dmg = dmgdiestring + dmgbase.substring(dmgbase.lastIndexOf("d"));
                    if(dmgattr + dmgmod != 0) {
                        dmg = dmg + "+" + (dmgattr + dmgmod);
                    }
                    dmg = dmg + " " + dmgtype;
                }
                else {
                    if(dmgbase === 0 && (dmgattr + dmgmod === 0)){
                        dmg = 0;
                    }
                    if(dmgbase != 0) {
                        dmg = dmgbase;
                    }
                    if(dmgbase != 0 && (dmgattr + dmgmod != 0)){
                        dmg = dmgattr + dmgmod > 0 ? dmg + "+" : dmg;
                    }
                    if(dmgattr + dmgmod != 0) {
                        dmg = dmg + (dmgattr + dmgmod);
                    }
                    dmg = dmg + " " + dmgtype;
                }
            }
            else {
                dmg = "";
            };
            if(v["repeating_attack_" + attackid + "_dmg2flag"] && v["repeating_attack_" + attackid + "_dmg2flag"] != 0) {
                if(dmg2base === 0 && (dmg2attr + dmg2mod === 0)){
                    dmg2 = 0;
                }
                if(dmg2base != 0) {
                    dmg2 = dmg2base;
                }
                if(dmg2base != 0 && (dmg2attr + dmg2mod != 0)){
                    dmg2 = dmg2attr + dmg2mod > 0 ? dmg2 + "+" : dmg2;
                }
                if(dmg2attr + dmg2mod != 0) {
                    dmg2 = dmg2 + (dmg2attr + dmg2mod);
                }
                dmg2 = dmg2 + " " + dmg2type;
            }
            else {
                dmg2 = "";
            };
            dmgspacer = v["repeating_attack_" + attackid + "_dmgflag"] && v["repeating_attack_" + attackid + "_dmgflag"] != 0 && v["repeating_attack_" + attackid + "_dmg2flag"] && v["repeating_attack_" + attackid + "_dmg2flag"] != 0 ? "+ " : "";
            crit1 = v["repeating_attack_" + attackid + "_dmgcustcrit"] && v["repeating_attack_" + attackid + "_dmgcustcrit"] != "" ? v["repeating_attack_" + attackid + "_dmgcustcrit"] : dmgbase;
            crit2 = v["repeating_attack_" + attackid + "_dmg2custcrit"] && v["repeating_attack_" + attackid + "_dmg2custcrit"] != "" ? v["repeating_attack_" + attackid + "_dmg2custcrit"] : dmg2base;
            r1 = v["repeating_attack_" + attackid + "_atkflag"] && v["repeating_attack_" + attackid + "_atkflag"] != 0 ? "@{d20}" : "0d20";
            r2 = v["repeating_attack_" + attackid + "_atkflag"] && v["repeating_attack_" + attackid + "_atkflag"] != 0 ? "@{rtype}" : "{{r2=[[0d20";
            if(v["repeating_attack_" + attackid + "_atkflag"] && v["repeating_attack_" + attackid + "_atkflag"] != 0) {
                if(powerattackmod != 0) {hbonus = " + " + powerattackmod + "[POWERATK]" + hbonus};
                if(atkmag != 0) {hbonus = " + " + atkmag + "[POWER]" + hbonus};
                if(pb != 0) {hbonus = " + " + pb + pbd_safe + "[PROF]" + hbonus};
                if(atkmod != 0) {hbonus = " + " + atkmod + "[MOD]" + hbonus};
                if(atkattr_base != 0) {hbonus = " + " + atkattr_base + "[" + atkattr_abrev + "]" + hbonus};
            }
            else {
                hbonus = "";
            }
            if(v["repeating_attack_" + attackid + "_dmgflag"] && v["repeating_attack_" + attackid + "_dmgflag"] != 0) {
                if(atkmag != 0) {hdmg1 = " + " + atkmag + "[POWER]" + hdmg1};
                if(dmgmod != 0) {hdmg1 = " + " + dmgmod + "[MOD]" + hdmg1};
                if(dmgattr != 0) {hdmg1 = " + " + dmgattr + "[" + dmgattr_abrev + "]" + hdmg1};
                hdmg1 = dmgbase + hdmg1;
            }
            else {
                hdmg1 = "0";
            }
            if(v["repeating_attack_" + attackid + "_dmg2flag"] && v["repeating_attack_" + attackid + "_dmg2flag"] != 0) {
                if(dmg2mod != 0) {hdmg2 = " + " + dmg2mod + "[MOD]" + hdmg2};
                if(dmg2attr != 0) {hdmg2 = " + " + dmg2attr + "[" + dmg2attr_abrev + "]" + hdmg2};
                hdmg2 = dmg2base + hdmg2;
            }
            else {
                hdmg2 = "0";
            }
            var globaldamage = `[[${v.global_damage_mod_roll && v.global_damage_mod_roll !== "" ? v.global_damage_mod_roll : "0"}]]`;
            var globaldamagecrit = `[[${v.global_damage_mod_crit && v.global_damage_mod_crit !== "" ? v.global_damage_mod_crit : "0"}]]`;
            if(v.dtype === "full") {
                pickbase = "full";
                rollbase = "@{wtype}&{template:atkdmg} {{mod=@{atkbonus}}} {{rname=@{atkname}}} {{r1=[[" + r1 + "cs>@{atkcritrange}" + hbonus + "]]}} " + r2 + "cs>@{atkcritrange}" + hbonus + "]]}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + hdmg1 + "]]}} {{dmg1type=" + dmgtype + "}} @{dmg2flag} {{dmg2=[[" + hdmg2 + "]]}} {{dmg2type=" + dmg2type + "}} {{crit1=[[" + crit1 + "[CRIT]]]}} {{crit2=[[" + crit2 + "[CRIT]]]}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} " + hldmgcrit + " {{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}} {{globalattack=@{global_attack_mod}}} {{globaldamage=" + globaldamage + "}} {{globaldamagecrit=" + globaldamagecrit + "}} {{globaldamagetype=@{global_damage_mod_type}}} ammo=@{ammo} @{charname_output}";
            }
            else if(v["repeating_attack_" + attackid + "_atkflag"] && v["repeating_attack_" + attackid + "_atkflag"] != 0) {
                pickbase = "pick";
                rollbase = "@{wtype}&{template:atk} {{mod=@{atkbonus}}} {{rname=[@{atkname}](~repeating_attack_attack_dmg)}} {{rnamec=[@{atkname}](~repeating_attack_attack_crit)}} {{r1=[[" + r1 + "cs>@{atkcritrange}" + hbonus + "]]}} " + r2 + "cs>@{atkcritrange}" + hbonus + "]]}} {{range=@{atkrange}}} {{desc=@{atk_desc}}} {{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}} {{globalattack=@{global_attack_mod}}} ammo=@{ammo} @{charname_output}";
            }
            else if(v["repeating_attack_" + attackid + "_dmgflag"] && v["repeating_attack_" + attackid + "_dmgflag"] != 0) {
                pickbase = "dmg";
                rollbase = "@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + hdmg1 + "]]}} {{dmg1type=" + dmgtype + "}} @{dmg2flag} {{dmg2=[[" + hdmg2 + "]]}} {{dmg2type=" + dmg2type + "}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} {{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}} {{globaldamage=" + globaldamage + "}} {{globaldamagetype=@{global_damage_mod_type}}} ammo=@{ammo} @{charname_output}"
            }
            else {
                pickbase = "empty";
                rollbase = "@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{saveflag} {{desc=@{atk_desc}}} {{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}} ammo=@{ammo} @{charname_output}"
            }
            update["repeating_attack_" + attackid + "_rollbase_dmg"] = "@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + hdmg1 + "]]}} {{dmg1type=" + dmgtype + "}} @{dmg2flag} {{dmg2=[[" + hdmg2 + "]]}} {{dmg2type=" + dmg2type + "}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} {{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}} {{globaldamage=" + globaldamage + "}} {{globaldamagetype=@{global_damage_mod_type}}} @{charname_output}";
            update["repeating_attack_" + attackid + "_rollbase_crit"] = "@{wtype}&{template:dmg} {{crit=1}} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + hdmg1 + "]]}} {{dmg1type=" + dmgtype + "}} @{dmg2flag} {{dmg2=[[" + hdmg2 + "]]}} {{dmg2type=" + dmg2type + "}} {{crit1=[[" + crit1 + "]]}} {{crit2=[[" + crit2 + "]]}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} " + hldmgcrit + " {{powerlevel=@{powerlevel}}} {{innate=@{power_innate}}} {{globaldamage=" + globaldamage + "}} {{globaldamagecrit=" + globaldamagecrit + "}} {{globaldamagetype=@{global_damage_mod_type}}} @{charname_output}"
            update["repeating_attack_" + attackid + "_atkbonus"] = bonus;
            update["repeating_attack_" + attackid + "_atkdmgtype"] = dmg + dmgspacer + dmg2 + dmgmag + " ";
            update["repeating_attack_" + attackid + "_rollbase"] = rollbase;
            if(v["repeating_attack_" + attackid + "_powerid"] && v["repeating_attack_" + attackid + "_powerid"] != "" && (!source || source && source != "power") && v["repeating_attack_" + attackid + "_powerid"].length == 20) {
                var powerid = v["repeating_attack_" + attackid + "_powerid"];
                var lvl = v["repeating_attack_" + attackid + "_powerlevel"];
                callbacks.push( function() {update_power_from_attack(lvl, powerid, attackid);} );
            }
            if(v["repeating_attack_" + attackid + "_itemid"] && v["repeating_attack_" + attackid + "_itemid"] != "" && (!source || source && source != "item")) {
                var itemid = v["repeating_attack_" + attackid + "_itemid"];
                callbacks.push( function() {update_item_from_attack(itemid, attackid);} );
            }
            setAttrs(update, {silent: true}, function() {callbacks.forEach(function(callback) {callback(); })} );
        });
    });
};

var update_power_from_attack = function(lvl, powerid, attackid) {
    var update = {};
    getAttrs(["repeating_attack_" + attackid + "_atkname", "repeating_attack_" + attackid + "_atkrange", "repeating_attack_" + attackid + "_atkflag", "repeating_attack_" + attackid + "_atkattr_base", "repeating_attack_" + attackid + "_dmgbase", "repeating_attack_" + attackid + "_dmgtype", "repeating_attack_" + attackid + "_dmg2base", "repeating_attack_" + attackid + "_dmg2type", "repeating_attack_" + attackid + "_saveflag", "repeating_attack_" + attackid + "_saveattr", "repeating_attack_" + attackid + "_saveeffect"], function(v) {
        update["repeating_power-" + lvl + "_" + powerid + "_powername"] = v["repeating_attack_" + attackid + "_atkname"];
        if(v["repeating_attack_" + attackid + "_atkrange"] && v["repeating_attack_" + attackid + "_atkrange"] != "") {
            update["repeating_power-" + lvl + "_" + powerid + "_powerrange"] = v["repeating_attack_" + attackid + "_atkrange"];
        }
        else {
            update["repeating_power-" + lvl + "_" + powerid + "_powerrange"] = "";
        };

        if(v["repeating_attack_" + attackid + "_dmgtype"] && v["repeating_attack_" + attackid + "_dmgtype"].toLowerCase() == "healing") {
            if(v["repeating_attack_" + attackid + "_dmgbase"] && v["repeating_attack_" + attackid + "_dmgbase"] != "") {
                update["repeating_power-" + lvl + "_" + powerid + "_powerhealing"] = v["repeating_attack_" + attackid + "_dmgbase"];
            }
        }
        else {
            if(v["repeating_attack_" + attackid + "_dmgbase"] && v["repeating_attack_" + attackid + "_dmgbase"] != "" && v["repeating_attack_" + attackid + "_dmgbase"].indexOf("[[round((@{level} + 1) / 6 + 0.5)]]") === -1) {
                update["repeating_power-" + lvl + "_" + powerid + "_powerdamage"] = v["repeating_attack_" + attackid + "_dmgbase"];
            }
            else if(!v["repeating_attack_" + attackid + "_dmgbase"] || v["repeating_attack_" + attackid + "_dmgbase"] === "") {
                update["repeating_power-" + lvl + "_" + powerid + "_powerdamage"] = "";
            }
            if(v["repeating_attack_" + attackid + "_dmgtype"] && v["repeating_attack_" + attackid + "_dmgtype"] != "") {
                update["repeating_power-" + lvl + "_" + powerid + "_powerdamagetype"] = v["repeating_attack_" + attackid + "_dmgtype"];
            }
            else {
                update["repeating_power-" + lvl + "_" + powerid + "_powerdamagetype"] = "";
            }
        };
        if(v["repeating_attack_" + attackid + "_dmg2type"] && v["repeating_attack_" + attackid + "_dmg2type"].toLowerCase() == "healing") {
            if(v["repeating_attack_" + attackid + "_dmgbase"] && v["repeating_attack_" + attackid + "_dmgbase"] != "") {
                update["repeating_power-" + lvl + "_" + powerid + "_powerhealing"] = v["repeating_attack_" + attackid + "_dmgbase"];
            }
        }
        else {
            if(v["repeating_attack_" + attackid + "_dmg2base"] && v["repeating_attack_" + attackid + "_dmg2base"] != "") {
                update["repeating_power-" + lvl + "_" + powerid + "_powerdamage2"] = v["repeating_attack_" + attackid + "_dmg2base"];
            }
            else {
                update["repeating_power-" + lvl + "_" + powerid + "_powerdamage2"] = "";
            }
            if(v["repeating_attack_" + attackid + "_dmg2type"] && v["repeating_attack_" + attackid + "_dmg2type"] != "") {
                update["repeating_power-" + lvl + "_" + powerid + "_powerdamagetype2"] = v["repeating_attack_" + attackid + "_dmg2type"];
            }
            else {
                update["repeating_power-" + lvl + "_" + powerid + "_powerdamagetype2"] = "";
            }
        };

        if(v["repeating_attack_" + attackid + "_saveflag"] && v["repeating_attack_" + attackid + "_saveflag"] != "0") {
            update["repeating_power-" + lvl + "_" + powerid + "_powersave"] = v["repeating_attack_" + attackid + "_saveattr"];
        }
        else {
            update["repeating_power-" + lvl + "_" + powerid + "_powersave"] = "";
        };
        if(v["repeating_attack_" + attackid + "_saveeffect"] && v["repeating_attack_" + attackid + "_saveeffect"] != "") {
            update["repeating_power-" + lvl + "_" + powerid + "_powersavesuccess"] = v["repeating_attack_" + attackid + "_saveeffect"];
        }
        else {
            update["repeating_power-" + lvl + "_" + powerid + "_powersavesuccess"] = "";
        };
        setAttrs(update, {silent: true});
    });
};

var update_item_from_attack = function(itemid, attackid) {
    var inventory = "repeating_inventory_";
    getAttrs(["repeating_hiddeninventory_" + itemid + "_itemname"], function(x){
        if(x["repeating_hiddeninventory_" + itemid + "_itemname"]) {
            inventory = "repeating_hiddeninventory_";
        }
    });

    getAttrs(["repeating_attack_" + attackid + "_atkname", "repeating_attack_" + attackid + "_dmgbase", "repeating_attack_" + attackid + "_dmg2base", "repeating_attack_" + attackid + "_dmgtype", "repeating_attack_" + attackid + "_dmg2type", "repeating_attack_" + attackid + "_atkrange", "repeating_attack_" + attackid + "_atkmod", "repeating_attack_" + attackid + "_dmgmod", inventory + itemid + "_itemmodifiers", "repeating_attack_" + attackid + "_versatile_alt", inventory + itemid + "_itemproperties", "repeating_attack_" + attackid + "_atkpower"], function(v) {
        var update = {};
        var mods = v[inventory + itemid + "_itemmodifiers"];
        var damage = v["repeating_attack_" + attackid + "_dmgbase"] ? v["repeating_attack_" + attackid + "_dmgbase"] : 0;
        var damage2 = v["repeating_attack_" + attackid + "_dmg2base"] ? v["repeating_attack_" + attackid + "_dmg2base"] : 0;
        var damagetype = v["repeating_attack_" + attackid + "_dmgtype"] ? v["repeating_attack_" + attackid + "_dmgtype"] : 0;
        var damagetype2 = v["repeating_attack_" + attackid + "_dmg2type"] ? v["repeating_attack_" + attackid + "_dmg2type"] : 0;
        var range = v["repeating_attack_" + attackid + "_atkrange"] ? v["repeating_attack_" + attackid + "_atkrange"] : 0;
        var attackmod = v["repeating_attack_" + attackid + "_atkmod"] ? v["repeating_attack_" + attackid + "_atkmod"] : 0;
        var damagemod = v["repeating_attack_" + attackid + "_dmgmod"] ? v["repeating_attack_" + attackid + "_dmgmod"] : 0;
        var powermod = v["repeating_attack_" + attackid + "_atkpower"] ? v["repeating_attack_" + attackid + "_atkpower"] : 0;
        var atktype = "";
        var altprefix = v["repeating_attack_" + attackid + "_versatile_alt"] === "1" ? "Alternate " : "";

        if(/Alternate Damage:/i.test(v[inventory + itemid + "_itemmodifiers"])) {
            update[inventory + itemid + "_itemname"] = v["repeating_attack_" + attackid + "_atkname"].replace(/\s*(?:\(One-Handed\)|\(Two-Handed\))/, "");
        } else {
            update[inventory + itemid + "_itemname"] = v["repeating_attack_" + attackid + "_atkname"];
        }

        var attack_type_regex = /(?:^|,)\s*Item Type: (Melee|Ranged) Weapon(?:,|$)/i;
        var attack_type_results = attack_type_regex.exec(v[inventory + itemid + "_itemmodifiers"]);
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
                if(powermod !== 0 || attackmod !== 0) {
                    mods[i] = mods[i].replace(attackmod_found[1], powermod !== 0 ? powermod : attackmod);
                } else {
                    mods.splice(i, 1);
                }
                break;
            }
        }
        if(!attackmod_found && (powermod !== 0 || attackmod !== 0)) {
            var properties = v[inventory + itemid + "_itemproperties"];
            if(properties && /Thrown/i.test(properties)) {
                mods.push("Weapon Attacks: " + (powermod !== 0 ? powermod : attackmod));
            }
            else {
                mods.push(atktype + " Attacks: " + (powermod !== 0 ? powermod : attackmod));
            }
        }

        var damagemod_regex = new RegExp("^\\s*(?:" + (atktype !== "" ? atktype + "|" : "") + "Weapon) Damage \\+?(.+)$", "i");
        var damagemod_found = false;
        for(var i = 0; i < mods.length; i++) {
            if(damagemod_found = damagemod_regex.exec(mods[i])) {
                if(powermod !== 0 || damagemod !== 0) {
                    mods[i] = mods[i].replace(damagemod_found[1], powermod !== 0 ? powermod : attackmod);
                } else {
                    mods.splice(i, 1);
                }
                break;
            }
        }
        if(!damagemod_found && (powermod !== 0 || damagemod !== 0)) {
            var properties = v[inventory + itemid + "_itemproperties"];
            if(properties && /Thrown/i.test(properties)) {
                mods.push("Weapon Damage: " + (powermod !== 0 ? powermod : damagemod));
            }
            else {
                mods.push(atktype + " Damage: " + (powermod !== 0 ? powermod : damagemod));
            }
        }

        update[inventory + itemid + "_itemmodifiers"] = mods.join(",");

        setAttrs(update, {silent: true});
    });
};

var remove_attack = function(attackid) {
    removeRepeatingRow("repeating_attack_" + attackid);
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

var update_shield_points = function() {
    getAttrs(["hp_max", "ship_shield_capacity", "ship_shield_max", "ship_shield_active_flag"], function(attrs) {
        if(attrs.ship_shield_active_flag == "1") {
            var tryParseShieldCapacity = parseFloat(attrs.ship_shield_capacity);
            if(!isNaN(tryParseShieldCapacity)) {
                var update = {};
                update.ship_shield_max = Math.ceil(tryParseShieldCapacity * attrs.hp_max);
                setAttrs(update, {silent: true});
            }
        }
    });
}

var update_shield_regen = function() {
    getAttrs(["ship_size", "ship_shield_regen_rate_coefficient", "ship_shield_active_flag"], function(attrs) {
        if(attrs.ship_shield_active_flag == "1") {
            var tryParseShieldCoefficient = isNaN(parseFloat(attrs.ship_shield_regen_rate_coefficient)) == false ? parseFloat(attrs.ship_shield_regen_rate_coefficient) : 0;

            var shipSizeHitDie = 0;
            switch(attrs.ship_size) {
                case "Tiny":
                    shipSizeHitDie = 4;
                    break;
                case "Small":
                    shipSizeHitDie = 6;
                    break;
                case "Medium":
                    shipSizeHitDie = 8;
                    break;
                case "Large":
                    shipSizeHitDie = 10;
                    break;
                case "Huge":
                    shipSizeHitDie = 12;
                    break;
                case "Gargantuan":
                    shipSizeHitDie = 20;
                    break;
            }

            setAttrs({
                ship_shield_regen_rate: Math.ceil(tryParseShieldCoefficient * shipSizeHitDie)
            }, {silent: true});
        }
    })
}

var update_ship_dice = function() {
    getAttrs(["ship_size", "hulldie_final", "hull_dice_max", "shielddie_final", "shield_dice_max", "base_ship_tier", "pwrdie_final", "hp_max", "hp", "constitution_mod", "strength_mod", "ship_shield", "ship_shield_points", "ship_shield_max", "ship_armor", "ship_armor_active_flag", "ship_armor_hp_per_hit_die", "ship_shield_capacity", "ship_shield_regen_rate_coefficient", "ship_shield_active_flag", "ship_shield_regen_rate"], function(attrs) {
        if(true) {
            var shipSizeDie = 0;
            var shipSizeDiceMax = 0;
            var shipSizeHullPoints = 0;
            var shipSizeShieldPoints = 0;
            var shipHullPointsAfterFirst = 0;
            var armorHpPerHitDieMod = 0;
            var shieldCapacity = 0;
            var shieldRegenRate = 0;
            var tierDieMultiplier = 0;
            var shipPwrDie = 0;
            var sTier = isNaN(parseInt(attrs.base_ship_tier)) == false ? parseInt(attrs.base_ship_tier) : 0;
            var localCon = isNaN(parseInt(attrs.constitution_mod)) == false ? parseInt(attrs.constitution_mod) : 0;
            var localStr = isNaN(parseInt(attrs.strength_mod)) == false ? parseInt(attrs.strength_mod) : 0;

            switch(attrs.ship_size) {
                case "Tiny":
                    shipSizeDie = 4;
                    shipSizeDiceMax = 1;
                    tierDieMultiplier = 1;
                    shipHullPointsAfterFirst = 3;
                    break;
                case "Small":
                    shipSizeDie = 6;
                    shipSizeDiceMax = 3;
                    tierDieMultiplier = 1;
                    shipHullPointsAfterFirst = 4;
                    break;
                case "Medium":
                    shipSizeDie = 8;
                    shipSizeDiceMax = 5;
                    tierDieMultiplier = 1;
                    shipHullPointsAfterFirst = 5;
                    break;
                case "Large":
                    shipSizeDie = 10;
                    shipSizeDiceMax = 7;
                    tierDieMultiplier = 1;
                    shipHullPointsAfterFirst = 6;
                    break;
                case "Huge":
                    shipSizeDie = 12;
                    shipSizeDiceMax = 9;
                    tierDieMultiplier = 2;
                    shipHullPointsAfterFirst = 7;
                    break;
                case "Gargantuan":
                    shipSizeDie = 20;
                    shipSizeDiceMax = 11;
                    tierDieMultiplier = 2;
                    shipHullPointsAfterFirst = 11;
                    break;
            }

            switch(sTier){
                case 0:
                    shipPwrDie = 1;
                    break;
                case 1:
                    shipPwrDie = 4;
                    break;
                case 2:
                    shipPwrDie = 6;
                    break;
                case 3:
                    shipPwrDie = 8;
                    break;
                case 4:
                    shipPwrDie = 10;
                    break;
                case 5:
                    shipPwrDie = 12;
                    break;
            }


            switch(attrs.ship_armor){
                case "none":
                    break;
                case "deflection":
                    break;
                case "lightweight":
                    armorHpPerHitDieMod = -1
                    break;
                case "reinforced":
                    armorHpPerHitDieMod = 1
                    break;
                case "customshiparmor":
                    if(attrs.ship_armor_active_flag == "1") {
                        var tempHpAttrBonus = attrs["ship_armor_hp_per_hit_die"]
                        var tryParseHpBonus = parseInt(tempHpAttrBonus);
                        if(!isNaN(tryParseHpBonus)) {
                            armorHpPerHitDieMod = tryParseHpBonus;
                        }
                    }
                    break;
            }

            switch(attrs.ship_shield){
                case "none":
                    break;
                case "directional":
                    shieldCapacity = 1;
                    shieldRegenRate = 1;
                    break;
                case "fortress":
                    shieldCapacity = 3/2;
                    shieldRegenRate = 2/3;
                    break;
                case "quickcharge":
                    shieldCapacity = 2/3;
                    shieldRegenRate = 3/2;
                    break;
                case "customshipshield":
                    if(attrs.ship_shield_active_flag == "1") {
                        shieldCapacity = isNaN(parseFloat(attrs.ship_shield_capacity)) == false ? parseFloat(attrs.ship_shield_capacity) : 0;
                        shieldRegenRate = isNaN(parseFloat(attrs.ship_shield_regen_rate_coefficient)) == false ? parseFloat(attrs.ship_shield_regen_rate_coefficient) : 0;
                    }
                    break;
            }



            var adjustedTierDies = shipSizeDiceMax + (sTier * tierDieMultiplier);
            shipSizeHullPoints = shipSizeDie + localCon + ((adjustedTierDies-1) * shipHullPointsAfterFirst) + ((adjustedTierDies-1) * localCon) + (adjustedTierDies * armorHpPerHitDieMod);
            shipSizeShieldPoints = Math.floor(((shipSizeDie + localStr) + ((adjustedTierDies-1) * shipHullPointsAfterFirst) + ((adjustedTierDies-1) * localStr)) * shieldCapacity);
            var shipSizeShieldRegen = Math.floor(shipSizeDie * shieldRegenRate);

            setAttrs({hulldie_final: shipSizeDie}, {silent: true});
            setAttrs({hull_dice_max: adjustedTierDies}, {silent: true});
            setAttrs({shielddie_final: shipSizeDie}, {silent: true});
            setAttrs({shield_dice_max: adjustedTierDies}, {silent: true});
            setAttrs({pwrdie_final: shipPwrDie}, {silent: true});
            setAttrs({hp_max: shipSizeHullPoints}, {silent: true});
            setAttrs({hp: shipSizeHullPoints}, {silent: true});
            setAttrs({ship_shield_max: shipSizeShieldPoints}, {silent: true});
            setAttrs({ship_shield_points: shipSizeShieldPoints}, {silent: true});
            setAttrs({ship_shield_regen_rate: shipSizeShieldRegen}, {silent: true});
        }
        else {
            setAttrs({hull_dice_max: 0}, {silent: true});
        }
    })
};

var update_pwr_die_recovery = function() {
    getAttrs(["pwrdie_recovery", "ship_reactor", "pwrdie_mod"], function(attrs) {
        if(true) {
            var pwrDieRecov = 0;
            var pwrDieMod = 0;

            switch(attrs.ship_reactor) {
                case "none":
                    pwrDieRecov = 0;
                    break;
                case "fuelcell":
                    pwrDieRecov = 1;
                    break;
                case "ionization":
                    pwrDieRecov = 2;
                    pwrDieMod = 1;
                    break;
                case "powercore":
                    pwrDieRecov = 2;
                    break;
            }

            setAttrs({pwrdie_recovery: pwrDieRecov}, {silent: true});
            setAttrs({pwrdie_mod: pwrDieMod}, {silent: true});

        }
        else {
            setAttrs({pwrdie_recovery: 0}, {silent: true});
            setAttrs({pwrdie_mod: 0}, {silent: true});
        }
    })
};

var update_pwr_die_capacity = function() {
    getAttrs(["ship_pwr_coupling", "pwr_s_storage", "pwr_c_storage"], function(attrs) {
        if(true) {
            var pwrCentralStore = 0;
            var pwrSystemStore = 0;

            switch(attrs.ship_pwr_coupling) {
                case "none":
                    pwrCentralStore = 0;
                    pwrSystemStore = 0;
                    break;
                case "direct":
                    pwrCentralStore = 4;
                    pwrSystemStore = 0;
                    break;
                case "distributed":
                    pwrCentralStore = 0;
                    pwrSystemStore = 2;
                    break;
                case "hubspoke":
                    pwrCentralStore = 2;
                    pwrSystemStore = 1;
                    break;
            }

            setAttrs({pwr_s_storage: pwrSystemStore}, {silent: true});
            setAttrs({pwr_c_storage: pwrCentralStore}, {silent: true});

        }
        else {
            setAttrs({pwr_s_storage: 0}, {silent: true});
            setAttrs({pwr_c_storage: 0}, {silent: true});
        }
    })
};

var update_ship_capacity = function() {
    getAttrs(["ship_size", "ship_fuel_max", "ship_food_max", "ship_reg_cargo_max", "ship_fuel_cost", "ship_reactor"], function(attrs) {
        if(true) {
            var shipCargoCap = 0;
            var shipFuelCap = 0;
            var shipFoodCap = 0;
            var shipFuelCost = 0;
            var shipFuelMod = 0;

            switch(attrs.ship_reactor) {
                case "none":
                    shipFuelMod = 1;
                    break;
                case "fuelcell":
                    shipFuelMod = 1;
                    break;
                case "ionization":
                    shipFuelMod = 2/3;
                    break;
                case "powercore":
                    shipFuelMod = 3/2;
                    break;
            }

            switch(attrs.ship_size) {
                case "Tiny":
                    shipCargoCap = 0;
                    shipFoodCap = 0;
                    shipFuelCap = 5;
                    shipFuelCost = 25;
                    break;
                case "Small":
                    shipCargoCap = 2;
                    shipFoodCap = 10;
                    shipFuelCap = 10;
                    shipFuelCost = 50;
                    break;
                case "Medium":
                    shipCargoCap = 25;
                    shipFoodCap = 120;
                    shipFuelCap = 30;
                    shipFuelCost = 100;
                    break;
                case "Large":
                    shipCargoCap = 500;
                    shipFoodCap = 240000;
                    shipFuelCap = 300;
                    shipFuelCost = 1000;
                    break;
                case "Huge":
                    shipCargoCap = 10000;
                    shipFoodCap = 9600000;
                    shipFuelCap = 600;
                    shipFuelCost = 10000;
                    break;
                case "Gargantuan":
                    shipCargoCap = 200000;
                    shipFoodCap = 576000000;
                    shipFuelCap = 1800;
                    shipFuelCost = 100000;
                    break;
            }

            setAttrs({ship_fuel_max: shipFuelCap}, {silent: true});
            setAttrs({ship_food_max: shipFoodCap}, {silent: true});
            setAttrs({ship_reg_cargo_max: shipCargoCap}, {silent: true});
            setAttrs({ship_fuel_cost: Math.ceil(shipFuelCost * shipFuelMod)}, {silent: true})
        }
        else {
            setAttrs({ship_fuel_max: 0}, {silent: true});
            setAttrs({ship_food_max: 0}, {silent: true});
            setAttrs({ship_reg_cargo_max: 0}, {silent: true});
            setAttrs({ship_fuel_cost: 0}, {silent: true})
        }
    })
};

var update_ship_suite_capacity = function() {
    getAttrs(["ship_size", "attr_ship_suites_max", "attr_ship_mod_max", "constitution_mod"], function(attrs) {
        if(true) {
            var shipModCap = 0;
            var shipSuiteCap = 0;
            var cons_mod = attrs.constitution_mod

            switch(attrs.ship_size) {
                case "Tiny":
                    shipModCap = 10;
                    shipSuiteCap = 0;
                    break;
                case "Small":
                    shipModCap = 20;
                    shipSuiteCap = -1 + cons_mod;
                    break;
                case "Medium":
                    shipModCap = 30;
                    shipSuiteCap = 3 + cons_mod;
                    break;
                case "Large":
                    shipModCap = 50;
                    shipSuiteCap = 3 + (2*cons_mod);
                    break;
                case "Huge":
                    shipModCap = 60;
                    shipSuiteCap = 6 + (3*cons_mod);
                    break;
                case "Gargantuan":
                    shipModCap = 70;
                    shipSuiteCap = 10 + (4*cons_mod);
                    break;
            }

            setAttrs({ship_suites_max: shipSuiteCap}, {silent: true});
            setAttrs({ship_mod_max: shipModCap}, {silent: true});
        }
        else {
            setAttrs({ship_suites_max: 0}, {silent: true});
            setAttrs({ship_mod_max: 0}, {silent: true});
        }
    })
};

var update_ship_tier_cost = function() {
    getAttrs(["ship_size", "base_ship_tier", "ship_cr_next"], function(attrs) {
        if(true) {
            var sTier = isNaN(parseInt(attrs.base_ship_tier)) == false ? parseInt(attrs.base_ship_tier) : 0;
            var shipTierCostMod = 0;
            var shipTierCostFinal = 0;

            switch(attrs.ship_size) {
                case "Tiny":
                    shipTierCostMod = 1/2;
                    break;
                case "Small":
                    shipTierCostMod = 1;
                    break;
                case "Medium":
                    shipTierCostMod = 2;
                    break;
                case "Large":
                    shipTierCostMod = 10;
                    break;
                case "Huge":
                    shipTierCostMod = 100;
                    break;
                case "Gargantuan":
                    shipTierCostMod = 1000;
                    break;
            }

            switch(sTier) {
                case 0:
                    shipTierCostFinal = 3900*shipTierCostMod;
                    break;
                case 1:
                    shipTierCostFinal = 77500*shipTierCostMod;
                    break;
                case 2:
                    shipTierCostFinal = 297000*shipTierCostMod;
                    break;
                case 3:
                    shipTierCostFinal = 620000*shipTierCostMod;
                    break;
                case 4:
                    shipTierCostFinal = 1150000*shipTierCostMod;
                    break;
                case 5:
                    shipTierCostFinal = "N/A";
            }

            setAttrs({ship_cr_next: shipTierCostFinal}, {silent: true});
        }
        else {
            setAttrs({ship_cr_next: 0}, {silent: true});
        }
    })
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

/* Todo, there is a bug here... for a pc, hiddeninventory does not exist and overwrite the correct value of inventory...
*   Do player really uses the mod field?*/
var update_initiative = function() {
    getSectionIDs("repeating_inventory", function(idarray) {
        update_inventory_from_initiative_change("repeating_inventory_", idarray);
    });
    getSectionIDs("repeating_hiddeninventory", function(idarray) {
        update_inventory_from_initiative_change("repeating_hiddeninventory_", idarray);
    });
};

var update_inventory_from_initiative_change = function(inventory, idarray) {
    var attrs_to_get = ["dexterity","dexterity_mod","initmod","jack_of_all_trades","jack","init_tiebreaker","pb_type"];
    _.each(idarray, function(currentID, i) {
        attrs_to_get.push(inventory + currentID + "_equipped");
        attrs_to_get.push(inventory + currentID + "_itemmodifiers");
    });
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
        _.each(idarray, function(currentID){
            if(v[inventory + currentID + "_equipped"] && v[inventory + currentID + "_equipped"] === "1" && v[inventory + currentID + "_itemmodifiers"] && v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf("ability checks") > -1) {
                var mods = v[inventory + currentID + "_itemmodifiers"].toLowerCase().split(",");
                _.each(mods, function(mod) {
                    if(mod.indexOf("ability checks") > -1) {
                        if(mod.indexOf("-") > -1) {
                            var new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                            final_init = new_mod ? final_init - new_mod : final_init;
                        }
                        else {
                            var new_mod = !isNaN(parseInt(mod.replace(/[^0-9]/g, ""), 10)) ? parseInt(mod.replace(/[^0-9]/g, ""), 10) : false;
                            final_init = new_mod ? final_init + new_mod : final_init;
                        }
                    }
                });
            }
        });
        if(final_init % 1 != 0) {
            final_init = parseFloat(final_init.toPrecision(12)); // ROUNDING ERROR BUGFIX
        }
        update["initiative_bonus"] = final_init;
        setAttrs(update, {silent: true});
    });
};

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

var update_power_slots = function() {
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
    getAttrs(["level","pb_type","pb_custom","npc"], function(v) {
        if(v.npc !== "2") {
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
        }
        callbacks.push( function() {update_attacks("all");} );
        callbacks.push( function() {update_power_info();} );
        callbacks.push( function() {update_jack_attr();} );
        callbacks.push( function() {update_initiative();} );
        callbacks.push( function() {update_tool("all");} );
        callbacks.push( function() {update_all_saves();} );
        callbacks.push( function() {update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "technology", "lore", "investigation", "nature", "piloting", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion", "ship_boost", "ship_ram", "ship_hide", "ship_maneuvering", "ship_patch", "ship_regulation", "ship_astrogation", "ship_data", "ship_probe", "ship_scan", "ship_impress", "ship_interfere", "ship_menace", "ship_swindle"]);} );

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

var update_power_info = function(attr) {
    var update = {};
    getAttrs(["powercasting_ability","power_dc_mod","globalpowermod","strength_mod","dexterity_mod","constitution_mod","intelligence_mod","wisdom_mod","charisma_mod"], function(v) {
        if(attr && v["powercasting_ability"] && v["powercasting_ability"].indexOf(attr) === -1) {
            return
        };
        if(!v["powercasting_ability"] || (v["powercasting_ability"] && v["powercasting_ability"] === "0*")) {
            update["power_attack_bonus"] = "0";
            update["power_save_dc"] = "0";
            var callback = function() {update_attacks("powers")};
            setAttrs(update, {silent: true}, callback);
            return
        };
        var attr = attr ? attr : "";
        console.log("UPDATING POWER INFO: " + attr);

        var ability = parseInt(v[v["powercasting_ability"].substring(2,v["powercasting_ability"].length-2)],10);
        var power_mod = v["globalpowermod"] && !isNaN(parseInt(v["globalpowermod"], 10)) ? parseInt(v["globalpowermod"], 10) : 0;
        var atk = v["globalpowermod"] && !isNaN(parseInt(v["globalpowermod"], 10)) ? ability + parseInt(v["globalpowermod"], 10) : ability;
        var dc = v["power_dc_mod"] && !isNaN(parseInt(v["power_dc_mod"], 10)) ? 8 + ability + parseInt(v["power_dc_mod"], 10) : 8 + ability;
        var itemfields = ["pb_type","pb"];

        getSectionIDs("repeating_inventory", function(idarray) {
            update_inventory_from_power_info_change("repeating_inventory_", idarray, power_mod, atk, dc, itemfields, update);
        });
        getSectionIDs("repeating_hiddeninventory", function(idarray) {
            update_inventory_from_power_info_change("repeating_hiddeninventory_", idarray, power_mod, atk, dc, itemfields, update);
        });
    });
};

var update_inventory_from_power_info_change = function(inventory, idarray, power_mod, atk, dc, itemfields, update) {
    _.each(idarray, function(currentID, i) {
        itemfields.push(inventory + currentID + "_equipped");
        itemfields.push(inventory + currentID + "_itemmodifiers");
    });
    getAttrs(itemfields, function(v) {
        _.each(idarray, function(currentID) {
            if((!v[inventory + currentID + "_equipped"] || v[inventory + currentID + "_equipped"] === "1") && v[inventory + currentID + "_itemmodifiers"] && v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf("power" > -1)) {
                var mods = v[inventory + currentID + "_itemmodifiers"].toLowerCase().split(",");
                _.each(mods, function(mod) {
                    if(mod.indexOf("power attack") > -1) {
                        var substr = mod.slice(mod.lastIndexOf("power attack") + "power attack".length);
                        atk = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? atk + parseInt(substr,10) : atk;
                        power_mod = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? power_mod + parseInt(substr,10) : power_mod;
                    };
                    if(mod.indexOf("power dc") > -1) {
                        var substr = mod.slice(mod.lastIndexOf("power dc") + "power dc".length);
                        dc = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? dc + parseInt(substr,10) : dc;
                    };
                });
            };
        });

        if(v["pb_type"] && v["pb_type"] === "die") {
            atk = atk + "+" + v["pb"];
            dc = dc + parseInt(v["pb"].substring(1), 10) / 2;
        }
        else {
            atk = parseInt(atk, 10) + parseInt(v["pb"], 10);
            dc = parseInt(dc, 10) + parseInt(v["pb"], 10);
        };
        update["power_attack_mod"] = power_mod;
        update["power_attack_bonus"] = atk;
        update["power_save_dc"] = dc;
        var callback = function() {update_attacks("powers")};
        setAttrs(update, {silent: true}, callback);
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

var update_challenge = function() {
    getAttrs(["npc_challenge"], function(v) {
        var update = {};
        var xp = 0;
        var pb = 0;
        switch(v.npc_challenge) {
            case "0":
                xp = "10";
                pb = 2;
                break;
            case "1/8":
                xp = "25";
                pb = 2;
                break;
            case "1/4":
                xp = "50";
                pb = 2;
                break;
            case "1/2":
                xp = "100";
                pb = 2;
                break;
            case "1":
                xp = "200";
                pb = 2;
                break;
            case "2":
                xp = "450";
                pb = 2;
                break;
            case "3":
                xp = "700";
                pb = 2;
                break;
            case "4":
                xp = "1100";
                pb = 2;
                break;
            case "5":
                xp = "1800";
                pb = 3;
                break;
            case "6":
                xp = "2300";
                pb = 3;
                break;
            case "7":
                xp = "2900";
                pb = 3;
                break;
            case "8":
                xp = "3900";
                pb = 3;
                break;
            case "9":
                xp = "5000";
                pb = 4;
                break;
            case "10":
                xp = "5900";
                pb = 4;
                break;
            case "11":
                xp = "7200";
                pb = 4;
                break;
            case "12":
                xp = "8400";
                pb = 4;
                break;
            case "13":
                xp = "10000";
                pb = 5;
                break;
            case "14":
                xp = "11500";
                pb = 5;
                break;
            case "15":
                xp = "13000";
                pb = 5;
                break;
            case "16":
                xp = "15000";
                pb = 5;
                break;
            case "17":
                xp = "18000";
                pb = 6;
                break;
            case "18":
                xp = "20000";
                pb = 6;
                break;
            case "19":
                xp = "22000";
                pb = 6;
                break;
            case "20":
                xp = "25000";
                pb = 6;
                break;
            case "21":
                xp = "33000";
                pb = 7;
                break;
            case "22":
                xp = "41000";
                pb = 7;
                break;
            case "23":
                xp = "50000";
                pb = 7;
                break;
            case "24":
                xp = "62000";
                pb = 7;
                break;
            case "25":
                xp = "75000";
                pb = 8;
                break;
            case "26":
                xp = "90000";
                pb = 8;
                break;
            case "27":
                xp = "105000";
                pb = 8;
                break;
            case "28":
                xp = "120000";
                pb = 8;
                break;
            case "29":
                xp = "";
                pb = 9;
                break;
            case "30":
                xp = "155000";
                pb = 9;
                break;
        }
        update["npc_xp"] = xp;
        update["pb_custom"] = pb;
        update["pb_type"] = "custom";
        setAttrs(update, {silent: true}, function() {update_pb()});
    });
};

var update_npc_saves = function() {
    getAttrs(["npc_str_save_base","npc_dex_save_base","npc_con_save_base","npc_int_save_base","npc_wis_save_base","npc_cha_save_base"], function(v) {
        var update = {};
        var last_save = 0; var cha_save_flag = 0; var cha_save = ""; var wis_save_flag = 0; var wis_save = ""; var int_save_flag = 0; var int_save = ""; var con_save_flag = 0; var con_save = ""; var dex_save_flag = 0; var dex_save = ""; var str_save_flag = 0; var str_save = "";
        // 1 = Positive, 2 = Last, 3 = Negative, 4 = Last Negative
        if(v.npc_cha_save_base && v.npc_cha_save_base != "@{charisma_mod}") {cha_save = parseInt(v.npc_cha_save_base, 10); if(last_save === 0) {last_save = 1; cha_save_flag = cha_save < 0 ? 4 : 2;} else {cha_save_flag = cha_save < 0 ? 3 : 1;} } else {cha_save_flag = 0; cha_save = "";};
        if(v.npc_wis_save_base && v.npc_wis_save_base != "@{wisdom_mod}") {wis_save = parseInt(v.npc_wis_save_base, 10); if(last_save === 0) {last_save = 1; wis_save_flag = wis_save < 0 ? 4 : 2;} else {wis_save_flag = wis_save < 0 ? 3 : 1;} } else {wis_save_flag = 0; wis_save = "";};
        if(v.npc_int_save_base && v.npc_int_save_base != "@{intelligence_mod}") {int_save = parseInt(v.npc_int_save_base, 10); if(last_save === 0) {last_save = 1; int_save_flag = int_save < 0 ? 4 : 2;} else {int_save_flag = int_save < 0 ? 3 : 1;} } else {int_save_flag = 0; int_save = "";};
        if(v.npc_con_save_base && v.npc_con_save_base != "@{constitution_mod}") {con_save = parseInt(v.npc_con_save_base, 10); if(last_save === 0) {last_save = 1; con_save_flag = con_save < 0 ? 4 : 2;} else {con_save_flag = con_save < 0 ? 3 : 1;} } else {con_save_flag = 0; con_save = "";};
        if(v.npc_dex_save_base && v.npc_dex_save_base != "@{dexterity_mod}") {dex_save = parseInt(v.npc_dex_save_base, 10); if(last_save === 0) {last_save = 1; dex_save_flag = dex_save < 0 ? 4 : 2;} else {dex_save_flag = dex_save < 0 ? 3 : 1;} } else {dex_save_flag = 0; dex_save = "";};
        if(v.npc_str_save_base && v.npc_str_save_base != "@{strength_mod}") {str_save = parseInt(v.npc_str_save_base, 10); if(last_save === 0) {last_save = 1; str_save_flag = str_save < 0 ? 4 : 2;} else {str_save_flag = str_save < 0 ? 3 : 1;} } else {str_save_flag = 0; str_save = "";};

        update["npc_saving_flag"] = "" + cha_save + wis_save + int_save + con_save + dex_save + str_save;
        update["npc_str_save"] = str_save;
        update["npc_str_save_flag"] = str_save_flag;
        update["npc_dex_save"] = dex_save;
        update["npc_dex_save_flag"] = dex_save_flag;
        update["npc_con_save"] = con_save;
        update["npc_con_save_flag"] = con_save_flag;
        update["npc_int_save"] = int_save;
        update["npc_int_save_flag"] = int_save_flag;
        update["npc_wis_save"] = wis_save;
        update["npc_wis_save_flag"] = wis_save_flag;
        update["npc_cha_save"] = cha_save;
        update["npc_cha_save_flag"] = cha_save_flag;
        setAttrs(update, {silent: true});
    });
};

var update_npc_skills = function() {
    getAttrs(["npc_acrobatics_base","npc_animal_handling_base","npc_technology_base","npc_athletics_base","npc_deception_base","npc_lore_base","npc_insight_base","npc_intimidation_base","npc_investigation_base","npc_medicine_base","npc_nature_base","npc_perception_base","npc_performance_base","npc_persuasion_base","npc_piloting_base","npc_sleight_of_hand_base","npc_stealth_base","npc_survival_base"], function(v) {
        var update = {};
        var last_skill = 0;
        var survival_flag = 0; var survival = ""; var stealth_flag = 0; var stealth = ""; var sleight_of_hand_flag = 0; var sleight_of_hand = ""; var piloting_flag = 0; var piloting = ""; var persuasion_flag = 0; var persuasion = ""; var performance_flag = 0; var sperformance = ""; var perception_flag = 0; var perception = ""; var perception_flag = 0; var perception = ""; var nature_flag = 0; var nature = ""; var medicine_flag = 0; var medicine = ""; var investigation_flag = 0; var investigation = ""; var intimidation_flag = 0; var intimidation = ""; var insight_flag = 0; var insight = ""; var lore_flag = 0; var lore = ""; var deception_flag = 0; var deception = ""; var athletics_flag = 0; var athletics = ""; var technology_flag = 0; var technology = ""; var animal_handling_flag = 0; var animal_handling = ""; var acrobatics_flag = 0; var acrobatics = "";

        // 1 = Positive, 2 = Last, 3 = Negative, 4 = Last Negative
        if(v.npc_survival_base && v.npc_survival_base != "@{wisdom_mod}") {survival = parseInt(v.npc_survival_base, 10); if(last_skill === 0) {last_skill = 1; survival_flag = survival < 0 ? 4 : 2;} else {survival_flag = survival < 0 ? 3 : 1;} } else {survival_flag = 0; survival = "";};
        if(v.npc_stealth_base && v.npc_stealth_base != "@{dexterity_mod}") {stealth = parseInt(v.npc_stealth_base, 10); if(last_skill === 0) {last_skill = 1; stealth_flag = stealth < 0 ? 4 : 2;} else {stealth_flag = stealth < 0 ? 3 : 1;} } else {stealth_flag = 0; stealth = "";};
        if(v.npc_sleight_of_hand_base && v.npc_sleight_of_hand_base != "@{dexterity_mod}") {sleight_of_hand = parseInt(v.npc_sleight_of_hand_base, 10); if(last_skill === 0) {last_skill = 1; sleight_of_hand_flag = sleight_of_hand < 0 ? 4 : 2;} else {sleight_of_hand_flag = sleight_of_hand < 0 ? 3 : 1;} } else {sleight_of_hand_flag = 0; sleight_of_hand = "";};
        if(v.npc_piloting_base && v.npc_piloting_base != "@{intelligence_mod}") {piloting = parseInt(v.npc_piloting_base, 10); if(last_skill === 0) {last_skill = 1; piloting_flag = piloting < 0 ? 4 : 2;} else {piloting_flag = piloting < 0 ? 3 : 1;} } else {piloting_flag = 0; piloting = "";};
        if(v.npc_persuasion_base && v.npc_persuasion_base != "@{charisma_mod}") {persuasion = parseInt(v.npc_persuasion_base, 10); if(last_skill === 0) {last_skill = 1; persuasion_flag = persuasion < 0 ? 4 : 2;} else {persuasion_flag = persuasion < 0 ? 3 : 1;} } else {persuasion_flag = 0; persuasion = "";};
        if(v.npc_performance_base && v.npc_performance_base != "@{charisma_mod}") {sperformance = parseInt(v.npc_performance_base, 10); if(last_skill === 0) {last_skill = 1; performance_flag = sperformance < 0 ? 4 : 2;} else {performance_flag = sperformance < 0 ? 3 : 1;} } else {performance_flag = 0; sperformance = "";};
        if(v.npc_perception_base && v.npc_perception_base != "@{wisdom_mod}") {perception = parseInt(v.npc_perception_base, 10); if(last_skill === 0) {last_skill = 1; perception_flag = perception < 0 ? 4 : 2;} else {perception_flag = perception < 0 ? 3 : 1;} } else {perception_flag = 0; perception = "";};
        if(v.npc_nature_base && v.npc_nature_base != "@{intelligence_mod}") {nature = parseInt(v.npc_nature_base, 10); if(last_skill === 0) {last_skill = 1; nature_flag = nature < 0 ? 4 : 2;} else {nature_flag = nature < 0 ? 3 : 1;} } else {nature_flag = 0; nature = "";};
        if(v.npc_medicine_base && v.npc_medicine_base != "@{wisdom_mod}") {medicine = parseInt(v.npc_medicine_base, 10); if(last_skill === 0) {last_skill = 1; medicine_flag = medicine < 0 ? 4 : 2;} else {medicine_flag = medicine < 0 ? 3 : 1;} } else {medicine_flag = 0; medicine = "";};
        if(v.npc_investigation_base && v.npc_investigation_base != "@{intelligence_mod}") {investigation = parseInt(v.npc_investigation_base, 10); if(last_skill === 0) {last_skill = 1; investigation_flag = investigation < 0 ? 4 : 2;} else {investigation_flag = investigation < 0 ? 3 : 1;} } else {investigation_flag = 0; investigation = "";};
        if(v.npc_intimidation_base && v.npc_intimidation_base != "@{charisma_mod}") {intimidation = parseInt(v.npc_intimidation_base, 10); if(last_skill === 0) {last_skill = 1; intimidation_flag = intimidation < 0 ? 4 : 2;} else {intimidation_flag = intimidation < 0 ? 3 : 1;} } else {intimidation_flag = 0; intimidation = "";};
        if(v.npc_insight_base && v.npc_insight_base != "@{wisdom_mod}") {insight = parseInt(v.npc_insight_base, 10); if(last_skill === 0) {last_skill = 1; insight_flag = insight < 0 ? 4 : 2;} else {insight_flag = insight < 0 ? 3 : 1;} } else {insight_flag = 0; insight = "";};
        if(v.npc_lore_base && v.npc_lore_base != "@{intelligence_mod}") {lore = parseInt(v.npc_lore_base, 10); if(last_skill === 0) {last_skill = 1; lore_flag = lore < 0 ? 4 : 2;} else {lore_flag = lore < 0 ? 3 : 1;} } else {lore_flag = 0; lore = "";};
        if(v.npc_deception_base && v.npc_deception_base != "@{charisma_mod}") {deception = parseInt(v.npc_deception_base, 10); if(last_skill === 0) {last_skill = 1; deception_flag = deception < 0 ? 4 : 2;} else {deception_flag = deception < 0 ? 3 : 1;} } else {deception_flag = 0; deception = "";};
        if(v.npc_athletics_base && v.npc_athletics_base != "@{strength_mod}") {athletics = parseInt(v.npc_athletics_base, 10); if(last_skill === 0) {last_skill = 1; athletics_flag = athletics < 0 ? 4 : 2;} else {athletics_flag = athletics < 0 ? 3 : 1;} } else {athletics_flag = 0; athletics = "";};
        if(v.npc_technology_base && v.npc_technology_base != "@{intelligence_mod}") {technology = parseInt(v.npc_technology_base, 10); if(last_skill === 0) {last_skill = 1; technology_flag = technology < 0 ? 4 : 2;} else {technology_flag = technology < 0 ? 3 : 1;} } else {technology_flag = 0; technology = "";};
        if(v.npc_animal_handling_base && v.npc_animal_handling_base != "@{wisdom_mod}") {animal_handling = parseInt(v.npc_animal_handling_base, 10); if(last_skill === 0) {last_skill = 1; animal_handling_flag = animal_handling < 0 ? 4 : 2;} else {animal_handling_flag = animal_handling < 0 ? 3 : 1;} } else {animal_handling_flag = 0; animal_handling = "";};
        if(v.npc_acrobatics_base && v.npc_acrobatics_base != "@{dexterity_mod}") {acrobatics = parseInt(v.npc_acrobatics_base, 10); if(last_skill === 0) {last_skill = 1; acrobatics_flag = acrobatics < 0 ? 4 : 2;} else {acrobatics_flag = acrobatics < 0 ? 3 : 1;} } else {acrobatics_flag = 0; acrobatics = "";};

        update["npc_skills_flag"] = "" + acrobatics + animal_handling + technology + athletics + deception + lore + insight + intimidation + investigation + medicine + nature + perception + sperformance + persuasion + piloting + sleight_of_hand + stealth + survival;
        update["npc_stealth_flag"] = stealth_flag;
        update["npc_survival"] = survival;;
        update["npc_acrobatics"] = acrobatics;
        update["npc_acrobatics_flag"] = acrobatics_flag;
        update["npc_animal_handling"] = animal_handling;
        update["npc_animal_handling_flag"] = animal_handling_flag;
        update["npc_technology"] = technology;
        update["npc_technology_flag"] = technology_flag;
        update["npc_athletics"] = athletics;
        update["npc_athletics_flag"] = athletics_flag;
        update["npc_deception"] = deception;
        update["npc_deception_flag"] = deception_flag;
        update["npc_lore"] = lore;
        update["npc_lore_flag"] = lore_flag;
        update["npc_insight"] = insight;
        update["npc_insight_flag"] = insight_flag;
        update["npc_intimidation"] = intimidation;
        update["npc_intimidation_flag"] = intimidation_flag;
        update["npc_investigation"] = investigation;
        update["npc_investigation_flag"] = investigation_flag;
        update["npc_medicine"] = medicine;
        update["npc_medicine_flag"] = medicine_flag;
        update["npc_nature"] = nature;
        update["npc_nature_flag"] = nature_flag;
        update["npc_perception"] = perception;
        update["npc_perception_flag"] = perception_flag;
        update["npc_performance"] = sperformance;
        update["npc_performance_flag"] = performance_flag;
        update["npc_persuasion"] = persuasion;
        update["npc_persuasion_flag"] = persuasion_flag;
        update["npc_piloting"] = piloting;
        update["npc_piloting_flag"] = piloting_flag;
        update["npc_sleight_of_hand"] = sleight_of_hand;
        update["npc_sleight_of_hand_flag"] = sleight_of_hand_flag;
        update["npc_stealth"] = stealth;
        update["npc_stealth_flag"] = stealth_flag;
        update["npc_survival"] = survival;
        update["npc_survival_flag"] = survival_flag;
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
                rollbase = "@{wtype}&{template:npcaction} " + attack_flag + " @{damage_flag} @{npc_name_flag} {{rname=@{name}}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{dmg1=[[@{attack_damage}+0]]}} {{dmg1type=@{attack_damagetype}}} {{dmg2=[[@{attack_damage2}+0]]}} {{dmg2type=@{attack_damagetype2}}} {{crit1=[[@{attack_crit}+0]]}} {{crit2=[[@{attack_crit2}+0]]}} {{description=@{show_desc}}} @{charname_output}";
            }
            else if(v[repvar + actionid + "_attack_flag"] && v[repvar + actionid + "_attack_flag"] != "0") {
                if(legendary) {
                    rollbase = "@{wtype}&{template:npcatk} " + attack_flag + " @{damage_flag} @{npc_name_flag} {{rname=[@{name}](~repeating_npcaction-l_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction-l_npc_crit)}} {{type=[Attack](~repeating_npcaction-l_npc_dmg)}} {{typec=[Attack](~repeating_npcaction-l_npc_crit)}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{show_desc}}} @{charname_output}"
                }
                else {
                    rollbase = "@{wtype}&{template:npcatk} " + attack_flag + " @{damage_flag} @{npc_name_flag} {{rname=[@{name}](~repeating_npcaction_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction_npc_crit)}} {{type=[Attack](~repeating_npcaction_npc_dmg)}} {{typec=[Attack](~repeating_npcaction_npc_crit)}} {{r1=[[@{d20}+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{show_desc}}} @{charname_output}";
                }
            }
            else if(dmg1 || dmg2) {
                rollbase = "@{wtype}&{template:npcdmg} @{damage_flag} {{dmg1=[[@{attack_damage}+0]]}} {{dmg1type=@{attack_damagetype}}} {{dmg2=[[@{attack_damage2}+0]]}} {{dmg2type=@{attack_damagetype2}}} {{crit1=[[@{attack_crit}+0]]}} {{crit2=[[@{attack_crit2}+0]]}} @{charname_output}"
            }
            else {
                rollbase = "@{wtype}&{template:npcaction} @{npc_name_flag} {{rname=@{name}}} {{description=@{show_desc}}} @{charname_output}"
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
                attr_name_list.push(`repeating_damagemod_${id}_global_damage_active_flag`, `repeating_damagemod_${id}_global_damage_rollstring`, `repeating_damagemod_${id}_global_damage_type`);
            });
            getAttrs(attr_name_list, function(attrs) {
                var regex = /^repeating_damagemod_(.+)_global_damage_(active_flag|rollstring|type)$/;
                _.each(attrs, function(obj, name) {
                    var r = regex.exec(name);
                    if(r) {
                        fields[r[1]][r[2]] = obj;
                    }
                });

                var update = {global_damage_mod_roll: "", global_damage_mod_crit: "", global_damage_mod_type: ""};
                _.each(fields, function(element) {
                    if(element.active_flag != "0") {
                        if(element.rollstring && element.rollstring !== "") { update["global_damage_mod_roll"] += element.rollstring + "+"; }
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
                attr_name_list.push(`repeating_tohitmod_${id}_global_attack_active_flag`, `repeating_tohitmod_${id}_global_attack_rollstring`);
            });
            getAttrs(attr_name_list, function(attrs) {
                var regex = /^repeating_tohitmod_(.+)_global_attack_(active_flag|rollstring)$/;
                _.each(attrs, function(obj, name) {
                    var r = regex.exec(name);
                    if(r) {
                        fields[r[1]][r[2]] = obj;
                    }
                });

                var update = {global_attack_mod: ""};
                _.each(fields, function(element) {
                    if(element.active_flag != "0") {
                        if(element.rollstring && element.rollstring !== "") { update["global_attack_mod"] += element.rollstring + "+"; }
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
                attr_name_list.push(`repeating_savemod_${id}_global_save_active_flag`, `repeating_savemod_${id}_global_save_rollstring`);
            });
            getAttrs(attr_name_list, function(attrs) {
                var regex = /^repeating_savemod_(.+)_global_save_(active_flag|rollstring)$/;
                _.each(attrs, function(obj, name) {
                    var r = regex.exec(name);
                    if(r) {
                        fields[r[1]][r[2]] = obj;
                    }
                });

                var update = {global_save_mod: ""};
                _.each(fields, function(element) {
                    if(element.active_flag != "0") {
                        if(element.rollstring && element.rollstring !== "") { update["global_save_mod"] += element.rollstring + "+"; }
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
                attr_name_list.push(`repeating_skillmod_${id}_global_skill_active_flag`, `repeating_skillmod_${id}_global_skill_rollstring`);
            });
            getAttrs(attr_name_list, function(attrs) {
                var regex = /^repeating_skillmod_(.+)_global_skill_(active_flag|rollstring)$/;
                _.each(attrs, function(obj, name) {
                    var r = regex.exec(name);
                    if(r) {
                        fields[r[1]][r[2]] = obj;
                    }
                });

                var update = {global_skill_mod: ""};
                _.each(fields, function(element) {
                    if(element.active_flag != "0") {
                        if(element.rollstring && element.rollstring !== "") { update["global_skill_mod"] += element.rollstring + "+"; }
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


