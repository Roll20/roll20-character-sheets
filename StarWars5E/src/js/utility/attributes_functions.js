var update_attr = function(attr) {
    //Load the two one after another and then do the update to avoid one overwriting the other
    getSectionIDs("repeating_inventory", function(idarray) {
        getSectionIDs("repeating_hiddeninventory", function(idarray2) {
            update_inventory_from_attr_change("repeating_inventory_", idarray, attr,"repeating_hiddeninventory_",idarray2);
        });
    });
};

var update_inventory_from_attr_change = function(inventory, idarray, attr, hiddenInventory, hiddenIdArray) {
    var update = {};
    var attr_fields = [attr + "_base",attr + "_bonus"];
    //Load Both Inventory
    attr_fields.push(...get_attrs_from_inventory_for_change(inventory, idarray) );
    attr_fields.push(...get_attrs_from_inventory_for_change(hiddenInventory, hiddenIdArray) );

    getAttrs(attr_fields, function(v) {
        var base = v[attr + "_base"] && !isNaN(parseInt(v[attr + "_base"], 10)) ? parseInt(v[attr + "_base"], 10) : 10;
        var bonus = v[attr + "_bonus"] && !isNaN(parseInt(v[attr + "_bonus"], 10)) ? parseInt(v[attr + "_bonus"], 10) : 0;
        var inventory_item_values = check_inventory_from_attr_change(inventory, idarray, v,attr);
        var hidden_inventory_item_values = check_inventory_from_attr_change(hiddenInventory, hiddenIdArray, v,attr);
        var item_base = inventory_item_values.item_base + hidden_inventory_item_values.item_base;
        var item_bonus = inventory_item_values.item_bonus + hidden_inventory_item_values.item_bonus;

        update[attr + "_flag"] = bonus > 0 || item_bonus > 0 || item_base > base ? 1 : 0;
        base = base > item_base ? base : item_base;
        update[attr] = base + bonus + item_bonus;
        setAttrs(update);
    });
};

/*Do the check and return the modifier from the selected inventory*/
var check_inventory_from_attr_change = function (inventory, idarray,v,attr) {
    if(!inventory || inventory.length === 0) return {item_base: 0, item_bonus: 0};
    let item_base = 0;
    let item_bonus = 0;
    _.each(idarray, function(currentID) {
        if( (!v[inventory + currentID + "_equipped"] || v[inventory + currentID + "_equipped"] === "1") && v[inventory + currentID + "_itemmodifiers"] && v[inventory + currentID + "_itemmodifiers"].toLowerCase().indexOf(attr) > -1) {
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
    return {item_base: item_base, item_bonus: item_bonus };
}
