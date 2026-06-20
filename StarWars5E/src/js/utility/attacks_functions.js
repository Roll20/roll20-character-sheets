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

