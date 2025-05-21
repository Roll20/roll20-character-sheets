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
        }
        if(!v["powercasting_ability"] || (v["powercasting_ability"] && v["powercasting_ability"] === "0*")) {
            update["power_attack_bonus"] = "0";
            update["power_save_dc"] = "0";
            var callback = function() {update_attacks("powers")};
            setAttrs(update, {silent: true}, callback);
            return
        }
        var attr = attr ? attr : "";
        console.log("UPDATING POWER INFO: " + attr);

        var ability = parseInt(v[v["powercasting_ability"].substring(2,v["powercasting_ability"].length-2)],10);
        var power_mod = v["globalpowermod"] && !isNaN(parseInt(v["globalpowermod"], 10)) ? parseInt(v["globalpowermod"], 10) : 0;
        var atk = v["globalpowermod"] && !isNaN(parseInt(v["globalpowermod"], 10)) ? ability + parseInt(v["globalpowermod"], 10) : ability;
        var dc = v["power_dc_mod"] && !isNaN(parseInt(v["power_dc_mod"], 10)) ? 8 + ability + parseInt(v["power_dc_mod"], 10) : 8 + ability;
        var itemfields = ["pb_type","pb"];

        getSectionIDs("repeating_inventory", function (idarray) {
            getSectionIDs("repeating_hiddeninventory", function (idarray2) {
                update_inventory_from_power_info_change("repeating_inventory_", idarray, "repeating_hiddeninventory_", idarray2, power_mod, atk, dc, itemfields, update);
            });
        });
    });
};

var update_inventory_from_power_info_change = function(inventory, idarray,hiddenInventory, hiddenIdArray, power_mod, atk, dc, itemfields, update) {
    itemfields.push(...get_attrs_from_inventory_for_change(inventory,idarray));
    itemfields.push(...get_attrs_from_inventory_for_change(hiddenInventory,hiddenIdArray));

    getAttrs(itemfields, function(v) {

        let inventory_values = check_inventory_from_power_info_change(inventory,idarray, v);
        let hiddenInventory_values = check_inventory_from_power_info_change(hiddenInventory,hiddenIdArray, v);

        if(v["pb_type"] && v["pb_type"] === "die") {
            atk = atk + "+" + v["pb"];
            dc = dc + parseInt(v["pb"].substring(1), 10) / 2;
        }
        else {
            atk = parseInt(atk, 10) + parseInt(v["pb"], 10);
            dc = parseInt(dc, 10) + parseInt(v["pb"], 10);
        }

        update["power_attack_mod"] = power_mod + inventory_values.power_mod + hiddenInventory_values.power_mod;
        update["power_attack_bonus"] = atk + inventory_values.atk + hiddenInventory_values.atk;
        update["power_save_dc"] = dc + inventory_values.dc + hiddenInventory_values.dc;
        var callback = function() {update_attacks("powers")};
        setAttrs(update, {silent: true}, callback);
    });
};

var check_inventory_from_power_info_change = function(inventory, idarray, v) {
    if(!inventory || !inventory.length || !idarray || !idarray.length) return {atk : 0, power_mod : 0,dc : 0};
    let atk = 0;
    let power_mod = 0;
    let dc = 0;

    _.each(idarray, function(currentID) {
        if((!v[inventory + currentID + "_equipped"] || v[inventory + currentID + "_equipped"] === "1") && v[inventory + currentID + "_itemmodifiers"] && v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf("power") > -1) {
            var mods = v[inventory + currentID + "_itemmodifiers"].toLowerCase().split(",");
            _.each(mods, function(mod) {
                if(mod.indexOf("power attack") > -1) {
                    var substr = mod.slice(mod.lastIndexOf("power attack") + "power attack".length);
                    atk = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? atk + parseInt(substr,10) : atk;
                    power_mod = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? power_mod + parseInt(substr,10) : power_mod;
                }
                if(mod.indexOf("power dc") > -1) {
                    var substr = mod.slice(mod.lastIndexOf("power dc") + "power dc".length);
                    dc = substr && substr.length > 0 && !isNaN(parseInt(substr,10)) ? dc + parseInt(substr,10) : dc;
                }
            });
        }
    });

    return {atk : atk, power_mod : power_mod, dc : dc};
}
