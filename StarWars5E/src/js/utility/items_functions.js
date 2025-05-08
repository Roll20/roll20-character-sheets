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

/* Return the attributes to load from the specified inventory when you need to check the item modifiers */
var get_attrs_from_inventory_for_change = function(inventory, idarray) {
    var attrs=[]
    if(inventory && idarray.length > 0) {
        _.each(idarray, function (currentID, i) {
            attrs.push(inventory + currentID + "_equipped");
            attrs.push(inventory + currentID + "_itemmodifiers");
        });
    }
    return attrs;
}
