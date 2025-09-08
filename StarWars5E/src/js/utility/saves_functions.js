var update_save = function (attr) {
    //Load the two one after another and then do the update to avoid one overwriting the other
    getSectionIDs("repeating_inventory", function(idarray) {
        getSectionIDs("repeating_hiddeninventory", function(idarray2) {
            update_inventory_from_save_change("repeating_inventory_", idarray, attr,"repeating_hiddeninventory_",idarray2);
        });
    });
};

var update_inventory_from_save_change = function(inventory, idarray, attr,hiddenInventory,hiddenIdArray) {
    var save_attrs = [attr + "_mod", attr + "_save_prof", attr + "_save_mod","pb","globalsavemod","pb_type"];
    save_attrs.push(...get_attrs_from_inventory_for_change(inventory, idarray) );
    save_attrs.push(...get_attrs_from_inventory_for_change(hiddenInventory, hiddenIdArray) );

    getAttrs(save_attrs, function(v) {
        var attr_mod = v[attr + "_mod"] ? parseInt(v[attr + "_mod"], 10) : 0;
        var prof = v[attr + "_save_prof"] && v[attr + "_save_prof"] != 0 && !isNaN(v["pb"]) ? parseInt(v["pb"], 10) : 0;
        var save_mod = v[attr + "_save_mod"] && !isNaN(parseInt(v[attr + "_save_mod"], 10)) ? parseInt(v[attr + "_save_mod"], 10) : 0;
        var global = v["globalsavemod"] && !isNaN(v["globalsavemod"]) ? parseInt(v["globalsavemod"], 10) : 0;
        var items = check_inventory_from_save_change(inventory, idarray, v,attr);
        items += check_inventory_from_save_change(hiddenInventory, hiddenIdArray, v,attr);

        var total = attr_mod + prof + save_mod + global + items;
        if(v["pb_type"] && v["pb_type"] === "die" && v[attr + "_save_prof"] != 0 && attr != "death") {
            total = total + "+" + v["pb"];
        };
        var update = {};
        update[attr + "_save_bonus"] = total;
        setAttrs(update, {silent: true});
    });
};

/*Do the check and return the modifier from the selected inventory*/
var check_inventory_from_save_change = function (inventory, idarray,v,attr) {
    if(!inventory || !inventory.length | !idarray || !idarray.length) return 0;

    let items = 0;;
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

    return items;
}

var update_all_saves = function() {
    update_save("strength");
    update_save("dexterity");
    update_save("constitution");
    update_save("intelligence");
    update_save("wisdom");
    update_save("charisma");
    update_save("death");
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
