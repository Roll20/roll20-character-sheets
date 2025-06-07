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

    //Load the two one after another and then do the update to avoid one overwriting the other
    getSectionIDs("repeating_inventory", function(idarray) {
        getSectionIDs("repeating_hiddeninventory", function (idarray2) {
            update_inventory_from_skill_change("repeating_inventory_", idarray, "repeating_hiddeninventory_", idarray2, callbacks, attrs_to_get, skill_parent, skills_array);
        });
    });
};

var update_inventory_from_skill_change = function(inventory, idarray,hiddenInventory, hiddenIdArray, callbacks, attrs_to_get, skill_parent, skills_array) {
    var update = {};
    attrs_to_get.push(...get_attrs_from_inventory_for_change(inventory, idarray));
    attrs_to_get.push(...get_attrs_from_inventory_for_change(hiddenInventory, hiddenIdArray));

    getAttrs(attrs_to_get, function(v) {
        _.each(skills_array, function(s) {
            var attr_mod = v[skill_parent[s] + "_mod"] ? parseInt(v[skill_parent[s] + "_mod"], 10) : 0;
            var prof = v[s + "_prof"] != 0 && !isNaN(v["pb"]) ? parseInt(v["pb"], 10) : 0;
            var flat = v[s + "_flat"] && !isNaN(parseInt(v[s + "_flat"], 10)) ? parseInt(v[s + "_flat"], 10) : 0;
            var type = v[s + "_type"] && !isNaN(parseInt(v[s + "_type"], 10)) ? parseInt(v[s + "_type"], 10) : 1;
            var jack = v["jack_of_all_trades"] && v["jack_of_all_trades"] != 0 && v["jack"] ? v["jack"] : 0;
            var item_bonus = check_inventory_from_skill_change(inventory, idarray, v, s);
            item_bonus += check_inventory_from_skill_change(hiddenInventory, hiddenIdArray, v, s);

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

/*Do the check and return the modifier from the selected inventory*/
var check_inventory_from_skill_change = function(inventory, idarray,v,s){
    if(!inventory || !inventory.length | !idarray || !idarray.length) return 0;

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
                }
            });
        }
    });

    return item_bonus;
}

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
