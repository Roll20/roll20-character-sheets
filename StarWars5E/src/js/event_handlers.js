on("change:strength_base change:strength_bonus", function() {
    update_attr("strength");
});

on("change:strength", function() {
    update_mod("strength");
    check_customac("Strength");
    update_weight();
});

on("change:dexterity_base change:dexterity_bonus", function() {
    update_attr("dexterity");
    update_initiative();
});

on("change:dexterity", function() {
    update_mod("dexterity");
    check_customac("Dexterity");
});

on("change:constitution_base change:constitution_bonus", function() {
    update_attr("constitution");
});

on("change:constitution", function() {
    update_mod("constitution");
    check_customac("Constitution");
});

on("change:intelligence_base change:intelligence_bonus", function() {
    update_attr("intelligence");
});

on("change:intelligence", function() {
    update_mod("intelligence");
    check_customac("Intelligence");
});

on("change:wisdom_base change:wisdom_bonus", function() {
    update_attr("wisdom");
});

on("change:wisdom", function() {
    update_mod("wisdom");
    check_customac("Wisdom");
});

on("change:charisma_base change:charisma_bonus", function() {
    update_attr("charisma");
});

on("change:charisma", function() {
    update_mod("charisma");
    check_customac("Charisma");
});

on("change:strength_mod", function() {
    update_save("strength");
    update_skills(["athletics"]);
    update_attacks("strength");
    update_tool("strength");
    update_power_info("strength");
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_boost", "ship_ram"]);
            update_ship_dice();
        }
        else {
            return;
        }
    });
});

on("change:dexterity_mod", function() {
    update_save("dexterity");
    update_skills(["acrobatics", "sleight_of_hand", "stealth",  "ship_hide", "ship_maneuvering"]);
    update_attacks("dexterity");
    update_tool("dexterity");
    update_power_info("dexterity");
    update_ac();
    update_initiative();
});

on("change:constitution_mod", function() {
    update_save("constitution");
    update_attacks("constitution");
    update_tool("constitution");
    update_power_info("constitution");
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_patch", "ship_regulation"]);
            update_ship_suite_capacity();
            update_ship_dice();
        }
        else {
            return;
        }
    });
});

on("change:intelligence_mod", function() {
    update_save("intelligence");
    update_skills(["technology", "lore", "investigation", "nature", "piloting", "ship_astrogation", "ship_data", "ship_probe"]);
    update_attacks("intelligence");
    update_tool("intelligence");
    update_power_info("intelligence");
});

on("change:wisdom_mod", function() {
    update_save("wisdom");
    update_skills(["animal_handling", "insight", "medicine", "perception", "survival", "ship_scan"]);
    update_attacks("wisdom");
    update_tool("wisdom");
    update_power_info("wisdom");
});

on("change:charisma_mod", function() {
    update_save("charisma");
    update_skills(["deception", "intimidation", "performance", "persuasion", "ship_impress", "ship_interfere", "ship_menace", "ship_swindle"]);
    update_attacks("charisma");
    update_tool("charisma");
    update_power_info("charisma");
});

on("change:strength_save_prof change:strength_save_mod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    update_save("strength");
});

on("change:dexterity_save_prof change:dexterity_save_mod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    update_save("dexterity");
});

on("change:constitution_save_prof change:constitution_save_mod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    update_save("constitution");
});

on("change:intelligence_save_prof change:intelligence_save_mod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    update_save("intelligence");
});

on("change:wisdom_save_prof change:wisdom_save_mod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    update_save("wisdom");
});

on("change:charisma_save_prof change:charisma_save_mod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    update_save("charisma");
});

on("change:globalsavemod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    update_all_saves();
});

on("change:death_save_mod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    update_save("death");
});

on("change:acrobatics_prof change:acrobatics_type change:acrobatics_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["acrobatics"]);
        }
    });
});

on("change:animal_handling_prof change:animal_handling_type change:animal_handling_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["animal_handling"]);
        }
    });
});

on("change:technology_prof change:technology_type change:technology_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["technology"]);
        }
    });
});

on("change:athletics_prof change:athletics_type change:athletics_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["athletics"]);
        }
    });
});

on("change:deception_prof change:deception_type change:deception_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["deception"]);
        }
    });
});

on("change:lore_prof change:lore_type change:lore_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["lore"]);
        }
    });
});

on("change:insight_prof change:insight_type change:insight_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["insight"]);
        }
    });
});

on("change:intimidation_prof change:intimidation_type change:intimidation_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["intimidation"]);
        }
    });
});

on("change:investigation_prof change:investigation_type change:investigation_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["investigation"]);
        }
    });
});

on("change:medicine_prof change:medicine_type change:medicine_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["medicine"]);
        }
    });
});

on("change:nature_prof change:nature_type change:nature_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["nature"]);
        }
    });
});

on("change:perception_prof change:perception_type change:perception_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["perception"]);
        }
    });
});

on("change:performance_prof change:performance_type change:performance_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["performance"]);
        }
    });
});

on("change:persuasion_prof change:persuasion_type change:persuasion_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["persuasion"]);
        }
    });
});

on("change:piloting_prof change:piloting_type change:piloting_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["piloting"]);
        }
    });
});

on("change:sleight_of_hand_prof change:sleight_of_hand_type change:sleight_of_hand_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["sleight_of_hand"]);
        }
    });
});

on("change:stealth_prof change:stealth_type change:stealth_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["stealth"]);
        }
    });
});

on("change:survival_prof change:survival_type change:survival_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_skills(["survival"]);
        }
    });
});

//Begin ship based skill proficency change CATCHERS

on("change:ship_boost_prof change:ship_boost_type change:ship_boost_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_boost"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_ram_prof change:ship_ram_type change:ship_ram_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_ram"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_maneuvering_prof change:ship_maneuvering_type change:ship_maneuvering_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_maneuvering"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_patch_prof change:ship_patch_type change:ship_patch_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_patch"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_hide_prof change:ship_hide_type change:ship_hide_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_hide"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_regulation_prof change:ship_regulation_type change:ship_regulation_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_regulation"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_astrogation_prof change:ship_astrogation_type change:ship_astrogation_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_astrogation"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_data_prof change:ship_data_type change:ship_data_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_data"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_probe_prof change:ship_probe_type change:ship_probe_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_probe"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_scan_prof change:ship_scan_type change:ship_scan_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_scan"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_impress_prof change:ship_impress_type change:ship_impress_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_impress"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_interfere_prof change:ship_interfere_type change:ship_interfere_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_interfere"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_menace_prof change:ship_menace_type change:ship_menace_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_menace"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_swindle_prof change:ship_swindle_type change:ship_swindle_flat", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_skills(["ship_swindle"]);
        }
        else {
            return;
        }
    });
});

on("change:ship_reactor", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_pwr_die_recovery();
            update_ship_capacity();
        }
        else {
            return;
        }
    });
});

on("change:ship_pwr_coupling", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {return;};
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            update_pwr_die_capacity();
        }
        else {
            return;
        }
    });
});

on("change:repeating_tool:toolname change:repeating_tool:toolbonus_base change:repeating_tool:toolattr_base change:repeating_tool:tool_mod", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {
        return;
    }
    var tool_id = eventinfo.sourceAttribute.substring(15, 35);
    update_tool(tool_id);
});

on("change:repeating_attack:atkname change:repeating_attack:atkflag change:repeating_attack:atkattr_base change:repeating_attack:atkmod change:repeating_attack:atkpower change:repeating_attack:atkprofflag change:repeating_attack:dmgflag change:repeating_attack:dmgbase change:repeating_attack:dmgattr change:repeating_attack:dmgmod change:repeating_attack:dmgtype change:repeating_attack:dmg2flag change:repeating_attack:dmg2base change:repeating_attack:dmg2attr change:repeating_attack:dmg2mod change:repeating_attack:dmg2type change:repeating_attack:saveflag change:repeating_attack:savedc change:repeating_attack:saveflat change:repeating_attack:dmgcustcrit change:repeating_attack:dmg2custcrit change:repeating_attack:ammo change:repeating_attack:saveattr change:repeating_attack:atkrange", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {
        return;
    }

    var source = eventinfo.sourceAttribute.substr(38);
    var attackid = eventinfo.sourceAttribute.substring(17, 37);
    if(source == "atkattr_base" || source == "savedc") {
        getAttrs(["repeating_attack_powerid", "repeating_attack_powerlevel"], function(v) {
            set = {};
            if(v.repeating_attack_powerid && v.repeating_attack_powerid != "" && v.repeating_attack_powerlevel && v.repeating_attack_powerlevel != "") {
                var newVal = eventinfo.newValue == "power" ? "power" : _.last(eventinfo.newValue.split("_")[0].split("{"));
                set["repeating_attack_atkattr_base"] = newVal == "power" ? "power" : "@{" + newVal + "_mod}";
                set["repeating_attack_savedc"] = newVal == "power" ? "power" : "(@{" + newVal + "_mod}+8+@{pb})";
                set["repeating_power-" + v.repeating_attack_powerlevel + "_" + v.repeating_attack_powerid + "_power_ability"] = newVal == "power" ? "power" : "@{" + newVal + "_mod}+";
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
    if(eventinfo.newValue === "1") {
        getSectionIDs("damagemod", function(ids) {
            if(!ids || ids.length === 0) {
                var update = {};
                var rowid = generateRowID();
                update[`repeating_damagemod_${rowid}_global_damage_active_flag`] = "1";
                update[`repeating_damagemod_${rowid}_global_damage_rollstring`] = "1d6[SNEAK ATTACK]";
                update[`repeating_damagemod_${rowid}_global_damage_type`] = "Sneak";
                setAttrs(update);
            }
        });
    }
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

on("change:exhaustion_level", function() {
    var update = {
        "exhaustion_1": "",
        "exhaustion_2": "",
        "exhaustion_3": "",
        "exhaustion_4": "",
        "exhaustion_5": "",
        "exhaustion_6": ""
    };

    getAttrs(["exhaustion_level"], function(attrs) {
        switch(attrs["exhaustion_level"]) {
            case "6":
                update["exhaustion_6"] = "• " + getTranslationByKey("exhaustion-6");
            case "5":
                update["exhaustion_5"] = "• " + getTranslationByKey("exhaustion-5");
            case "4":
                update["exhaustion_4"] = "• " + getTranslationByKey("exhaustion-4");
            case "3":
                update["exhaustion_3"] = "• " + getTranslationByKey("exhaustion-3");
            case "2":
                update["exhaustion_2"] = "• " + getTranslationByKey("exhaustion-2");
            case "1":
                update["exhaustion_1"] = "• " + getTranslationByKey("exhaustion-1");
                break;
            default:
                update["exhaustion_1"] = "• " + getTranslationByKey("exhaustion-0");
                break;
        }

        setAttrs(update, {silent: true});
    });
});

on("change:race change:subrace", function(eventinfo) {
    update_race_display();
});


on("change:repeating_inventory:hasattack", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {
        return;
    }

    var itemid = eventinfo.sourceAttribute.substring(20, 40);
    getAttrs(["repeating_inventory_" + itemid + "_hasattack", "repeating_inventory_" + itemid + "_itemattackid"], function(v) {
        var attackid = v["repeating_inventory_" + itemid + "_itemattackid"];
        var hasattack = v["repeating_inventory_" + itemid + "_hasattack"];
        if(attackid && attackid != "" && hasattack == 0) {
            remove_attack(attackid);
        }
        else if(hasattack == 1) {
            create_attack_from_item(itemid);
        };
    });
})

on("change:repeating_hiddeninventory:hasattack", function(eventinfo) {
    if(eventinfo.sourceType === "sheetworker") {
        return;
    }

    var itemid = eventinfo.sourceAttribute.substring(20, 40);
    getAttrs(["repeating_hiddeninventory_" + itemid + "_hasattack", "repeating_hiddeninventory_" + itemid + "_itemattackid"], function(v) {
        var attackid = v["repeating_hiddeninventory_" + itemid + "_itemattackid"];
        var hasattack = v["repeating_hiddeninventory_" + itemid + "_hasattack"];
        if(attackid && attackid != "" && hasattack == 0) {
            remove_attack(attackid);
        }
        else if(hasattack == 1) {
            create_attack_from_item(itemid, {hidden: true});
        };
    });
})

on("change:repeating_hiddeninventory:itemname change:repeating_hiddeninventory:itemproperties change:repeating_hiddeninventory:itemmodifiers change:repeating_hiddeninventory:itemcount", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }

    var itemid = eventinfo.sourceAttribute.substring(20, 40);
    getAttrs(["repeating_hiddeninventory_" + itemid + "_itemattackid", "repeating_hiddeninventory_" + itemid + "_itemresourceid"], function(v) {
        var attackid = v["repeating_hiddeninventory_" + itemid + "_itemattackid"];
        var resourceid = v["repeating_hiddeninventory_" + itemid + "_itemresourceid"];
        if(attackid) {
            update_attack_from_item(itemid, attackid, {hidden: true});
        }
        if(resourceid) {
            update_resource_from_item(itemid, resourceid, false, {hidden: true});
        }
    });
});

on("change:repeating_hiddeninventory:useasresource", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }

    var itemid = eventinfo.sourceAttribute.substring(20, 40);
    getAttrs(["repeating_hiddeninventory_" + itemid + "_useasresource", "repeating_hiddeninventory_" + itemid + "_itemresourceid"], function(v) {
        var useasresource = v["repeating_hiddeninventory_" + itemid + "_useasresource"];
        var resourceid = v["repeating_hiddeninventory_" + itemid + "_itemresourceid"];
        if(useasresource == 1) {
            create_resource_from_item(itemid, {hidden: true});
        }
        else {
            remove_resource(resourceid);
        };
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

on("change:repeating_inventory:useasresource", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }

    var itemid = eventinfo.sourceAttribute.substring(20, 40);
    getAttrs(["repeating_inventory_" + itemid + "_useasresource", "repeating_inventory_" + itemid + "_itemresourceid"], function(v) {
        var useasresource = v["repeating_inventory_" + itemid + "_useasresource"];
        var resourceid = v["repeating_inventory_" + itemid + "_itemresourceid"];
        if(useasresource == 1) {
            create_resource_from_item(itemid);
        }
        else {
            remove_resource(resourceid);
        };
    });
});

on("change:other_resource change:other_resource_name change:repeating_resource:resource_left change:repeating_resource:resource_left_name change:repeating_resource:resource_right change:repeating_resource:resource_right_name", function(eventinfo) {

    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }

    var resourceid = eventinfo.sourceAttribute;
    if(eventinfo.sourceAttribute.indexOf("other") > -1) {
        resourceid = "other_resource";
    }
    else if(eventinfo.sourceAttribute.substring(eventinfo.sourceAttribute.length - 5) == "_name") {
        resourceid = eventinfo.sourceAttribute.substring(0, eventinfo.sourceAttribute.length - 5);
    };

    getAttrs([resourceid, resourceid + "_name", resourceid + "_itemid"], function(v) {
        if(!v[resourceid + "_name"]) {
            remove_resource(resourceid);
        }
        else if(v[resourceid + "_itemid"] && v[resourceid + "_itemid"] != ""){
            update_item_from_resource(resourceid, v[resourceid + "_itemid"]);
        };
    });

});

on("change:repeating_inventory:itemweight change:repeating_inventory:itemcount change:cp change:sp change:ep change:gp change:pp change:encumberance_setting change:size change:carrying_capacity_mod change:repeating_hiddeninventory:itemweight change:repeating_hiddeninventory:itemcount", function() {
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

on("change:repeating_hiddeninventory:itemmodifiers change:repeating_hiddeninventory:equipped", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    var itemid = eventinfo.sourceAttribute.substring(20, 40);
    getAttrs(["repeating_hiddeninventory_" + itemid + "_itemmodifiers"], function(v) {
        if(v["repeating_hiddeninventory_" + itemid + "_itemmodifiers"]) {
            check_itemmodifiers(v["repeating_hiddeninventory_" + itemid + "_itemmodifiers"], eventinfo.previousValue);
        };
    });
});

on("change:globalacmod change:custom_ac_flag change:custom_ac_base change:custom_ac_part1 change:custom_ac_part2", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    update_ac();
});

on("change:repeating_power-cantrip:powername change:repeating_power-1:powername change:repeating_power-1:powerprepared change:repeating_power-2:powername change:repeating_power-2:powerprepared change:repeating_power-3:powername change:repeating_power-3:powerprepared change:repeating_power-4:powername change:repeating_power-4:powerprepared change:repeating_power-5:powername change:repeating_power-5:powerprepared change:repeating_power-6:powername change:repeating_power-6:powerprepared change:repeating_power-7:powername change:repeating_power-7:powerprepared change:repeating_power-8:powername change:repeating_power-8:powerprepared change:repeating_power-9:powername change:repeating_power-9:powerprepared change:repeating_power-cantrip:powerrange change:repeating_power-1:powerrange change:repeating_power-2:powerrange change:repeating_power-3:powerrange change:repeating_power-4:powerrange change:repeating_power-5:powerrange change:repeating_power-6:powerrange change:repeating_power-7:powerrange change:repeating_power-8:powerrange change:repeating_power-9:powerrange change:repeating_power-cantrip:powertarget change:repeating_power-1:powertarget change:repeating_power-2:powertarget change:repeating_power-3:powertarget change:repeating_power-4:powertarget change:repeating_power-5:powertarget change:repeating_power-6:powertarget change:repeating_power-7:powertarget change:repeating_power-8:powertarget change:repeating_power-9:powertarget change:repeating_power-cantrip:powerdamage change:repeating_power-1:powerdamage change:repeating_power-2:powerdamage change:repeating_power-3:powerdamage change:repeating_power-4:powerdamage change:repeating_power-5:powerdamage change:repeating_power-6:powerdamage change:repeating_power-7:powerdamage change:repeating_power-8:powerdamage change:repeating_power-9:powerdamage change:repeating_power-cantrip:powerdamagetype change:repeating_power-1:powerdamagetype change:repeating_power-2:powerdamagetype change:repeating_power-3:powerdamagetype change:repeating_power-4:powerdamagetype change:repeating_power-5:powerdamagetype change:repeating_power-6:powerdamagetype change:repeating_power-7:powerdamagetype change:repeating_power-8:powerdamagetype change:repeating_power-9:powerdamagetype change:repeating_power-cantrip:powerdamage2 change:repeating_power-1:powerdamage2 change:repeating_power-2:powerdamage2 change:repeating_power-3:powerdamage2 change:repeating_power-4:powerdamage2 change:repeating_power-5:powerdamage2 change:repeating_power-6:powerdamage2 change:repeating_power-7:powerdamage2 change:repeating_power-8:powerdamage2 change:repeating_power-9:powerdamage2 change:repeating_power-cantrip:powerdamagetype2 change:repeating_power-1:powerdamagetype2 change:repeating_power-2:powerdamagetype2 change:repeating_power-3:powerdamagetype2 change:repeating_power-4:powerdamagetype2 change:repeating_power-5:powerdamagetype2 change:repeating_power-6:powerdamagetype2 change:repeating_power-7:powerdamagetype2 change:repeating_power-8:powerdamagetype2 change:repeating_power-9:powerdamagetype2 change:repeating_power-cantrip:powerhealing change:repeating_power-1:powerhealing change:repeating_power-2:powerhealing change:repeating_power-3:powerhealing change:repeating_power-4:powerhealing change:repeating_power-5:powerhealing change:repeating_power-6:powerhealing change:repeating_power-7:powerhealing change:repeating_power-8:powerhealing change:repeating_power-9:powerhealing change:repeating_power-cantrip:powerdmgmod change:repeating_power-1:powerdmgmod change:repeating_power-2:powerdmgmod change:repeating_power-3:powerdmgmod change:repeating_power-4:powerdmgmod change:repeating_power-5:powerdmgmod change:repeating_power-6:powerdmgmod change:repeating_power-7:powerdmgmod change:repeating_power-8:powerdmgmod change:repeating_power-9:powerdmgmod change:repeating_power-cantrip:powersave change:repeating_power-1:powersave change:repeating_power-2:powersave change:repeating_power-3:powersave change:repeating_power-4:powersave change:repeating_power-5:powersave change:repeating_power-6:powersave change:repeating_power-7:powersave change:repeating_power-8:powersave change:repeating_power-9:powersave change:repeating_power-cantrip:powersavesuccess change:repeating_power-1:powersavesuccess change:repeating_power-2:powersavesuccess change:repeating_power-3:powersavesuccess change:repeating_power-4:powersavesuccess change:repeating_power-5:powersavesuccess change:repeating_power-6:powersavesuccess change:repeating_power-7:powersavesuccess change:repeating_power-8:powersavesuccess change:repeating_power-9:powersavesuccess change:repeating_power-cantrip:powerhldie change:repeating_power-1:powerhldie change:repeating_power-2:powerhldie change:repeating_power-3:powerhldie change:repeating_power-4:powerhldie change:repeating_power-5:powerhldie change:repeating_power-6:powerhldie change:repeating_power-7:powerhldie change:repeating_power-8:powerhldie change:repeating_power-9:powerhldie change:repeating_power-cantrip:powerhldietype change:repeating_power-1:powerhldietype change:repeating_power-2:powerhldietype change:repeating_power-3:powerhldietype change:repeating_power-4:powerhldietype change:repeating_power-5:powerhldietype change:repeating_power-6:powerhldietype change:repeating_power-7:powerhldietype change:repeating_power-8:powerhldietype change:repeating_power-9:powerhldietype change:repeating_power-cantrip:power_updateflag change:repeating_power-1:power_updateflag change:repeating_power-2:power_updateflag change:repeating_power-3:power_updateflag change:repeating_power-4:power_updateflag change:repeating_power-5:power_updateflag change:repeating_power-6:power_updateflag change:repeating_power-7:power_updateflag change:repeating_power-8:power_updateflag change:repeating_power-9:power_updateflag change:repeating_power-cantrip:powerattack change:repeating_power-1:powerattack change:repeating_power-2:powerattack change:repeating_power-3:powerattack change:repeating_power-4:powerattack change:repeating_power-5:powerattack change:repeating_power-6:powerattack change:repeating_power-7:powerattack change:repeating_power-8:powerattack change:repeating_power-9:powerattack change:repeating_power-cantrip:powerhlbonus change:repeating_power-1:powerhlbonus change:repeating_power-2:powerhlbonus change:repeating_power-3:powerhlbonus change:repeating_power-4:powerhlbonus change:repeating_power-5:powerhlbonus change:repeating_power-6:powerhlbonus change:repeating_power-7:powerhlbonus change:repeating_power-8:powerhlbonus change:repeating_power-9:powerhlbonus change:repeating_power-cantrip:includedesc change:repeating_power-1:includedesc change:repeating_power-2:includedesc change:repeating_power-3:includedesc change:repeating_power-4:includedesc change:repeating_power-5:includedesc change:repeating_power-6:includedesc change:repeating_power-7:includedesc change:repeating_power-8:includedesc change:repeating_power-9:includedesc change:repeating_power-cantrip:powerathigherlevels change:repeating_power-1:powerathigherlevels change:repeating_power-2:powerathigherlevels change:repeating_power-3:powerathigherlevels change:repeating_power-4:powerathigherlevels change:repeating_power-5:powerathigherlevels change:repeating_power-6:powerathigherlevels change:repeating_power-7:powerathigherlevels change:repeating_power-8:powerathigherlevels change:repeating_power-9:powerathigherlevels change:repeating_power-cantrip:powerdescription change:repeating_power-1:powerdescription change:repeating_power-2:powerdescription change:repeating_power-3:powerdescription change:repeating_power-4:powerdescription change:repeating_power-5:powerdescription change:repeating_power-6:powerdescription change:repeating_power-7:powerdescription change:repeating_power-8:powerdescription change:repeating_power-9:powerdescription change:repeating_power-cantrip:innate change:repeating_power-1:innate change:repeating_power-2:innate change:repeating_power-3:innate change:repeating_power-4:innate change:repeating_power-5:innate change:repeating_power-6:innate change:repeating_power-7:innate change:repeating_power-8:innate change:repeating_power-9:innate change:repeating_power-cantrip:power_ability change:repeating_power-1:power_ability change:repeating_power-2:power_ability change:repeating_power-3:power_ability change:repeating_power-4:power_ability change:repeating_power-5:power_ability change:repeating_power-6:power_ability change:repeating_power-7:power_ability change:repeating_power-8:power_ability change:repeating_power-9:power_ability", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    var regex_result = /^(repeating_power-(?:cantrip|\d)_[^_]+)_.+$/.exec(eventinfo.sourceAttribute);
    if(regex_result) {
        var repeating_source = regex_result[1];
        getAttrs([repeating_source + "_powerattackid", repeating_source + "_powerlevel"], function(v) {
            var powerid = repeating_source.slice(-20);
            var attackid = v[repeating_source + "_powerattackid"];
            var lvl = v[repeating_source + "_powerlevel"];
            if(attackid && lvl && powerid) {
                update_attack_from_power(lvl, powerid, attackid)
            }
        });
    }
});

on("change:repeating_power-cantrip:poweroutput change:repeating_power-1:poweroutput change:repeating_power-2:poweroutput change:repeating_power-3:poweroutput change:repeating_power-4:poweroutput change:repeating_power-5:poweroutput change:repeating_power-6:poweroutput change:repeating_power-7:poweroutput change:repeating_power-8:poweroutput change:repeating_power-9:poweroutput", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    var repeating_source = eventinfo.sourceAttribute.substring(0, eventinfo.sourceAttribute.lastIndexOf('_'));
    getAttrs([repeating_source + "_powerattackid", repeating_source + "_powerlevel", repeating_source + "_poweroutput", repeating_source + "_powerattackid", repeating_source + "_powerathigherlevels","character_id"], function(v) {
        var update = {};
        var poweroutput = v[repeating_source + "_poweroutput"];
        var powerid = repeating_source.slice(-20);
        var attackid = v[repeating_source + "_powerattackid"];
        var lvl = v[repeating_source + "_powerlevel"];
        if(poweroutput && poweroutput === "ATTACK") {
            create_attack_from_power(lvl, powerid, v["character_id"]);
        }
        else if(poweroutput && poweroutput === "POWERCARD" && attackid && attackid != "") {
            remove_attack(attackid);
            var powerlevel = "@{powerlevel}";
            if(v[repeating_source + "_powerathigherlevels"]) {
                var lvl = parseInt(v[repeating_source + "_powerlevel"],10);
                powerlevel = "?{Cast at what level?";
                for(i = 0; i < 10-lvl; i++) {
                    powerlevel = powerlevel + "|Level " + (parseInt(i, 10) + parseInt(lvl, 10)) + "," + (parseInt(i, 10) + parseInt(lvl, 10));
                }
                powerlevel = powerlevel + "}";
            }
            update[repeating_source + "_rollcontent"] = "@{wtype}&{template:power} {{level=@{powerschool} " + powerlevel + "}} {{name=@{powername}}} {{castingtime=@{powercastingtime}}} {{range=@{powerrange}}} {{target=@{powertarget}}} {{duration=@{powerduration}}} {{description=@{powerdescription}}} {{athigherlevels=@{powerathigherlevels}}}  {{innate=@{innate}}} @{powerconcentration} @{charname_output}";
        }
        setAttrs(update, {silent: true});
    });
});

on("change:repeating_power-cantrip:powerathigherlevels change:repeating_power-1:powerathigherlevels change:repeating_power-2:powerathigherlevels change:repeating_power-3:powerathigherlevels change:repeating_power-4:powerathigherlevels change:repeating_power-5:powerathigherlevels change:repeating_power-6:powerathigherlevels change:repeating_power-7:powerathigherlevels change:repeating_power-8:powerathigherlevels change:repeating_power-9:powerathigherlevels", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    var repeating_source = eventinfo.sourceAttribute.substring(0, eventinfo.sourceAttribute.lastIndexOf('_'));
    getAttrs([repeating_source + "_powerlevel", repeating_source + "_poweroutput", repeating_source + "_powerathigherlevels"], function(v) {
        var update = {};
        var poweroutput = v[repeating_source + "_poweroutput"];
        var lvl = v[repeating_source + "_powerlevel"];
        if(poweroutput && poweroutput === "POWERCARD") {
            var powerlevel = "@{powerlevel}";
            if(v[repeating_source + "_powerathigherlevels"]) {
                var lvl = parseInt(v[repeating_source + "_powerlevel"],10);
                powerlevel = "?{Cast at what level?";
                for(i = 0; i < 10-lvl; i++) {
                    powerlevel = powerlevel + "|Level " + (parseInt(i, 10) + parseInt(lvl, 10)) + "," + (parseInt(i, 10) + parseInt(lvl, 10));
                }
                powerlevel = powerlevel + "}";
            }
            update[repeating_source + "_rollcontent"] = "@{wtype}&{template:power} {{level=@{powerschool} " + powerlevel + "}} {{name=@{powername}}} {{castingtime=@{powercastingtime}}} {{range=@{powerrange}}} {{target=@{powertarget}}} {{duration=@{powerduration}}} {{description=@{powerdescription}}} {{athigherlevels=@{powerathigherlevels}}}  {{innate=@{innate}}} @{powerconcentration} @{charname_output}";
        }
        setAttrs(update, {silent: true});
    });
});

on("change:class change:custom_class change:cust_classname change:cust_hitdietype change:cust_powercasting_ability change:cust_powerslots change:cust_strength_save_prof change:cust_dexterity_save_prof change:cust_constitution_save_prof change:cust_intelligence_save_prof change:cust_wisdom_save_prof change:cust_charisma_save_prof change:subclass change:multiclass1 change:multiclass1_subclass change:multiclass2 change:multiclass2_subclass change:multiclass3 change:multiclass3_subclass" , function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    getAttrs(["npc"], function(v) {
        if(v.npc === "2") {
            return;
        }
        else {
            update_class();
        }
    });
});

on("change:base_level change:multiclass1_flag change:multiclass1 change:multiclass1_lvl change:multiclass2_flag change:multiclass2 change:multiclass2_lvl change:multiclass3_flag change:multiclass3 change:multiclass3_lvl change:tech_fighter change:tech_operative", function(eventinfo) {
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
            update_power_slots();
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

on("change:pb", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    getAttrs(["npc"], function(v) {
        if(v.npc === "2"){
            update_pb();
        }
    });
});

on("change:pb_type change:pb_custom", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    getAttrs(["npc"], function(v) {
        if(v.npc !== "2"){
            update_pb();
        }
    });
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

on("change:powercasting_ability change:power_dc_mod change:globalpowermod", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    update_power_info();
});

on("change:npc_challenge", function() {
    update_challenge();
});

on("change:npc_str_save_base change:npc_dex_save_base change:npc_con_save_base change:npc_int_save_base change:npc_wis_save_base change:npc_cha_save_base", function(eventinfo) {
    update_npc_saves();
});

on("change:npc_acrobatics_base change:npc_animal_handling_base change:npc_technology_base change:npc_athletics_base change:npc_deception_base change:npc_lore_base change:npc_insight_base change:npc_intimidation_base change:npc_investigation_base change:npc_medicine_base change:npc_nature_base change:npc_perception_base change:npc_performance_base change:npc_persuasion_base change:npc_piloting_base change:npc_sleight_of_hand_base change:npc_stealth_base change:npc_survival_base", function(eventinfo) {
    update_npc_skills();
});

on("change:repeating_npcaction:attack_flag change:repeating_npcaction:attack_type change:repeating_npcaction:attack_range change:repeating_npcaction:attack_target change:repeating_npcaction:attack_tohit change:repeating_npcaction:attack_damage change:repeating_npcaction:attack_damagetype change:repeating_npcaction:attack_damage2 change:repeating_npcaction:attack_damagetype2 change:repeating_npcaction-l:attack_flag change:repeating_npcaction-l:attack_type change:repeating_npcaction-l:attack_range change:repeating_npcaction-l:attack_target change:repeating_npcaction-l:attack_tohit change:repeating_npcaction-l:attack_damage change:repeating_npcaction-l:attack_damagetype change:repeating_npcaction-l:attack_damage2 change:repeating_npcaction-l:attack_damagetype2 change:repeating_npcaction:show_desc change:repeating_npcaction-l:show_desc change:repeating_npcaction:description change:repeating_npcaction-l:description", function(eventinfo) {
    var actionid = eventinfo.sourceAttribute.substring(20, 40);
    var legendary = eventinfo.sourceAttribute.indexOf("npcaction-l") > -1 ? true : false;
    if(legendary) {
        actionid = eventinfo.sourceAttribute.substring(22, 42);
    }
    update_npc_action(actionid, legendary);
});

on("change:core_die change:precognition_flag", function() {
    getAttrs(["core_die","precognition_flag"], function(v) {
        core = v.core_die && v.core_die != "" ? v.core_die : "1d20";
        luck = v.precognition_flag && v.precognition_flag === "1" ? "ro<1" : "";
        update = {};
        update["d20"] = core + luck;
        if(!v.core_die || v.core_die === "") {
            update["core_die"] = "1d20";
        }
        setAttrs(update);
    });
});

on("change:repeating_skillmod", function(eventinfo) {
    update_globalskills();
});

on("change:global_skill_mod_flag", function(eventinfo) {
    if(eventinfo.newValue === "1") {
        getSectionIDs("skillmod", function(ids) {
            if(!ids || ids.length === 0) {
                var update = {};
                var rowid = generateRowID();
                update[`repeating_skillmod_${rowid}_global_skill_rollstring`] = "1d4[GUIDANCE]";
                update[`repeating_skillmod_${rowid}_global_skill_active_flag`] = "1";
                setAttrs(update);
            }
        });
    }
});

on("change:repeating_savemod", function(eventinfo) {
    update_globalsaves();
});

on("change:global_save_mod_flag", function(eventinfo) {
    if(eventinfo.newValue === "1") {
        getSectionIDs("savemod", function(ids) {
            if(!ids || ids.length === 0) {
                var update = {};
                var rowid = generateRowID();
                update[`repeating_savemod_${rowid}_global_save_rollstring`] = "1d4[BLESS]";
                update[`repeating_savemod_${rowid}_global_save_active_flag`] = "1";
                setAttrs(update);
            }
        });
    }
});

on("change:repeating_tohitmod", function(eventinfo) {
    update_globalattack();
});

on("change:global_attack_mod_flag", function(eventinfo) {
    if(eventinfo.newValue === "1") {
        getSectionIDs("tohitmod", function(ids) {
            if(!ids || ids.length === 0) {
                var update = {};
                var rowid = generateRowID();
                update[`repeating_tohitmod_${rowid}_global_attack_rollstring`] = "1d4[BLESS]";
                update[`repeating_tohitmod_${rowid}_global_attack_active_flag`] = "1";
                setAttrs(update);
            }
        });
    }
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

on("remove:repeating_hiddeninventory", function(eventinfo) {
    var itemid = eventinfo.sourceAttribute.substring(20, 40);
    var attackids = eventinfo.removedInfo && eventinfo.removedInfo["repeating_hiddeninventory_" + itemid + "_itemattackid"] ? eventinfo.removedInfo["repeating_hiddeninventory_" + itemid + "_itemattackid"] : undefined;
    var resourceid = eventinfo.removedInfo && eventinfo.removedInfo["repeating_hiddeninventory_" + itemid + "_itemresourceid"] ? eventinfo.removedInfo["repeating_hiddeninventory_" + itemid + "_itemresourceid"] : undefined;

    if(attackids) {
        _.each(attackids.split(","), function(value) { remove_attack(value); });
    }
    if(resourceid) {
        remove_resource(resourceid);
    }

    if(eventinfo.removedInfo && eventinfo.removedInfo["repeating_hiddeninventory_" + itemid + "_itemmodifiers"]) {
        check_itemmodifiers(eventinfo.removedInfo["repeating_hiddeninventory_" + itemid + "_itemmodifiers"]);
    }

    update_weight();
});

on("remove:repeating_attack", function(eventinfo) {
    var attackid = eventinfo.sourceAttribute.substring(17, 37);
    var itemid = eventinfo.removedInfo["repeating_attack_" + attackid + "_itemid"];
    var powerid = eventinfo.removedInfo["repeating_attack_" + attackid + "_powerid"];
    var powerlvl = eventinfo.removedInfo["repeating_attack_" + attackid + "_powerlevel"];
    if(itemid) {
        getAttrs(["repeating_inventory_" + itemid + "_hasattack"], function(v) {
            if(v["repeating_inventory_" + itemid + "_hasattack"] && v["repeating_inventory_" + itemid + "_hasattack"] == 1) {
                var update = {};
                update["repeating_inventory_" + itemid + "_itemattackid"] = "";
                update["repeating_inventory_" + itemid + "_hasattack"] = 0;
                setAttrs(update, {silent: true});
            }
        });

        getAttrs(["repeating_hiddeninventory_" + itemid + "_hasattack"], function(v) {
            if(v["repeating_hiddeninventory_" + itemid + "_hasattack"] && v["repeating_hiddeninventory_" + itemid + "_hasattack"] == 1) {
                var update = {};
                update["repeating_hiddeninventory_" + itemid + "_itemattackid"] = "";
                update["repeating_hiddeninventory_" + itemid + "_hasattack"] = 0;
                setAttrs(update, {silent: true});
            }
        });
    };
    if(powerid && powerlvl) {
        getAttrs(["repeating_power-" + powerlvl + "_" + powerid + "_poweroutput"], function(v) {
            if(v["repeating_power-" + powerlvl + "_" + powerid + "_poweroutput"] && v["repeating_power-" + powerlvl + "_" + powerid + "_poweroutput"] == "ATTACK") {
                var update = {};
                update["repeating_power-" + powerlvl + "_" + powerid + "_powerattackid"] = "";
                update["repeating_power-" + powerlvl + "_" + powerid + "_poweroutput"] = "POWERCARD";
                setAttrs(update, {silent: true});
            }
        });
    };

});

on("remove:repeating_resource", function(eventinfo) {
    var resourceid = eventinfo.sourceAttribute.substring(19, 39);
    var inventory = "repeating_inventory_";
    var update = {};

    var left_itemid = eventinfo.removedInfo["repeating_resource_" + resourceid + "_resource_left_itemid"];
    getAttrs(["repeating_hiddeninventory_" + left_itemid + "_itemname"], function(x) {
        if(x["repeating_hiddeninventory_" + left_itemid + "_itemname"]) {
            inventory = "repeating_hiddeninventory_";
        }
    });
    if(left_itemid) {
        update[inventory + left_itemid + "_useasresource"] = 0;
        update[inventory + left_itemid + "_itemresourceid"] = "";
    }

    inventory = "repeating_inventory_";
    var right_itemid = eventinfo.removedInfo["repeating_resource_" + resourceid + "_resource_right_itemid"];
    getAttrs(["repeating_hiddeninventory_" + right_itemid + "_itemname"], function(y) {
        if(y["repeating_hiddeninventory_" + right_itemid + "_itemname"]) {
            inventory = "repeating_hiddeninventory_";
        }
    });
    if(right_itemid) {
        update[inventory + right_itemid + "_useasresource"] = 0;
        update[inventory + right_itemid + "_itemresourceid"] = "";
    }

    setAttrs(update, {silent: true});
});

on("remove:repeating_power-cantrip remove:repeating_power-1 remove:repeating_power-2 remove:repeating_power-3 remove:repeating_power-4 remove:repeating_power-5 remove:repeating_power-6 remove:repeating_power-7 remove:repeating_power-8 remove:repeating_power-9", function(eventinfo) {
    var attackid = eventinfo.removedInfo[eventinfo.sourceAttribute + "_powerattackid"];
    if(attackid) {
        remove_attack(attackid);
    }
});


on("change:ship_size", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    update_ac();
    update_ship_speeds();
    update_ship_dice();
    update_ship_capacity();
    update_ship_suite_capacity();
    update_ship_tier_cost();
});

on("change:base_ship_tier", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    update_ship_dice();
    update_ship_tier_cost();
});

on("change:pilot_skill", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    update_ac();
});

on("change:system_dmg_lvl", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }

    switch(eventinfo.newValue) {
        case "0":
            setAttrs({system_dmg: "None"});
            break;
        case "1":
            setAttrs({system_dmg: "Disadvantage on ability checks."});
            break;
        case "2":
            setAttrs({system_dmg: "Flying speed halved and turning speed doubled."});
            break;
        case "3":
            setAttrs({system_dmg: "Disadvantage on attack rolls and saving throws."});
            break;
        case "4":
            setAttrs({system_dmg: "Hit point maximum, shield point maximum, and shield regeneration rate halved."});
            break;
        case "5":
            setAttrs({system_dmg: "Ship becomes permanently \"used\"."});
            break;
        case "6":
            setAttrs({system_dmg: "Ship suffers catastrophic power failure. All primary systems fail."});
            break;
        default:
            setAttrs({system_dmg: "None"});
            break;
    }
});

on("change:ship_armor_active_flag change:ship_armor_ac_bonus", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }

    update_ac();
});

on("change:ship_shield_active_flag change:ship_shield_capacity change:hp_max", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }

    update_shield_points();
});

on("change:ship_shield_active_flag change:ship_shield_regen_rate_coefficient change:ship_size", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }

    update_shield_regen();
});

on("change:ship_armor change:ship_size", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    update_ac();
    update_ship_dice();
});

on("change:ship_shield change:ship_size", function(eventinfo) {
    if(eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
        return;
    }
    update_ship_dice();
});