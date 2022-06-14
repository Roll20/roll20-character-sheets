// ##### Versioning #####
// Upgrade Functions
function upgrade_1_0_to_1_1() {
    console.log("converting strike_rank to initiative_bonus");
    var newattrs = {};
    getAttrs(["strike_rank_temp", "strike_rank_details", "strike_rank_armor", "strike_rank_fatigue", "strike_rank_other"], function(v) {
        if(v["strike_rank_temp"]) {
            newattrs["initiative_bonus_temp"] = v.strike_rank_temp;
        }
        if(v["strike_rank_details"]) {
            newattrs["initiative_bonus_details"] = v.strike_rank_details;
        }
        if(v["strike_rank_armor"]) {
            newattrs["initiative_bonus_armor"] = v.strike_rank_armor;
        }
        if(v["strike_rank_fatigue"]) {
            newattrs["initiative_bonus_fatigue"] = v.strike_rank_fatigue;
        }
        if(v["strike_rank_other"]) {
            newattrs["initiative_bonus_other"] = v.strike_rank_other;
        }
        console.log("Setting init bonus values copied from strike rank");
        setAttrs(newattrs);
    });
}

function upgrade_1_1_to_1_2_0() {
    console.log("fixing misspelled missile attrs");
    var newattrs = {};
    getAttrs(["missle_weapons_enc"], function(v) {
        if(v["missle_weapons_enc"]) {
            newattrs["missile_weapons_enc"] = v.missle_weapons_enc;
        }
        console.log("Setting missile_weapons_enc value copied from missle_weapons_enc");
        setAttrs(newattrs);
    });
}

function upgrade_1_2_0_to_1_3_0() {
    console.log("convert to configable hit locations");
    var location1_newattrs = {};
    getAttrs(["right_leg_armor_ap", "right_leg_armor_equipped", "right_leg_other_ap", "right_leg_hp", "right_leg_hp_max_base", "right_leg_hp_max_other", "right_leg_details", "right_leg_armor_type", "right_leg_armor_enc", "location1_armor_ap", "location1_armor_equipped", "location1_other_ap", "location1_hp", "location1_hp_max_base", "location1_hp_max_other", "location1_details", "location1_armor_type", "location1_armor_enc"], function(v) {
        if((v["right_leg_armor_ap"]) && ((v["location1_armor_ap"] === undefined) || (v["location1_armor_ap"] === ""))) {
            location1_newattrs["location1_armor_ap"] = v.right_leg_armor_ap;
        }
        if((v["right_leg_armor_equipped"]) && ((v["location1_armor_equipped"] === undefined) || (v["location1_armor_equipped"] === ""))) {
            location1_newattrs["location1_armor_equipped"] = v.right_leg_armor_equipped;
        }
        if((v["right_leg_other_ap"]) && ((v["location1_other_ap"] === undefined) || (v["location1_other_ap"] === ""))) {
            location1_newattrs["location1_other_ap"] = v.right_leg_other_ap;
        }
        if((v["right_leg_hp"]) && ((v["location1_hp"] === undefined) || (v["location1_hp"] === ""))) {
            location1_newattrs["location1_hp"] = v.right_leg_hp;
        }
        if((v["right_leg_hp_max_base"]) && ((v["location1_hp_max_base"] === undefined) || (v["location1_hp_max_base"] === ""))) {
            location1_newattrs["location1_hp_max_base"] = v.right_leg_hp_max_base;
        }
        if((v["right_leg_hp_max_other"]) && ((v["location1_hp_max_other"] === undefined) || (v["location1_hp_max_other"] === ""))) {
            location1_newattrs["location1_hp_max_other"] = v.right_leg_hp_max_other;
        }
        if((v["right_leg_details"]) && ((v["location1_details"] === undefined) || (v["location1_details"] === ""))) {
            location1_newattrs["location1_details"] = v.right_leg_details;
        }
        if((v["right_leg_armor_type"]) && ((v["location1_armor_type"] === undefined) || (v["location1_armor_type"] === ""))) {
            location1_newattrs["location1_armor_type"] = v.right_leg_armor_type;
        }
        if((v["right_leg_armor_enc"]) && ((v["location1_armor_enc"] === undefined) || (v["location1_armor_enc"] === ""))) {
            location1_newattrs["location1_armor_enc"] = v.right_leg_armor_enc;
        }
        console.log("Setting hit location1 values copied from right_leg");
        setAttrs(location1_newattrs);
    });

    var location2_newattrs = {};
    getAttrs(["left_leg_armor_ap", "left_leg_armor_equipped", "left_leg_other_ap", "left_leg_hp", "left_leg_hp_max_base", "left_leg_hp_max_other", "left_leg_details", "left_leg_armor_type", "left_leg_armor_enc", "location2_armor_ap", "location2_armor_equipped", "location2_other_ap", "location2_hp", "location2_hp_max_base", "location2_hp_max_other", "location2_details", "location2_armor_type", "location2_armor_enc"], function(v) {
        if((v["left_leg_armor_ap"]) && ((v["location2_armor_ap"] === undefined) || (v["location2_armor_ap"] === ""))) {
            location2_newattrs["location2_armor_ap"] = v.left_leg_armor_ap;
        }
        if((v["left_leg_armor_equipped"]) && ((v["location2_armor_equipped"] === undefined) || (v["location2_armor_equipped"] === ""))) {
            location2_newattrs["location2_armor_equipped"] = v.left_leg_armor_equipped;
        }
        if((v["left_leg_other_ap"]) && ((v["location2_other_ap"] === undefined) || (v["location2_other_ap"] === ""))) {
            location2_newattrs["location2_other_ap"] = v.left_leg_other_ap;
        }
        if((v["left_leg_hp"]) && ((v["location2_hp"] === undefined) || (v["location2_hp"] === ""))) {
            location2_newattrs["location2_hp"] = v.left_leg_hp;
        }
        if((v["left_leg_hp_max_base"]) && ((v["location2_hp_max_base"] === undefined) || (v["location2_hp_max_base"] === ""))) {
            location2_newattrs["location2_hp_max_base"] = v.left_leg_hp_max_base;
        }
        if((v["left_leg_hp_max_other"]) && ((v["location2_hp_max_other"] === undefined) || (v["location2_hp_max_other"] === ""))) {
            location2_newattrs["location2_hp_max_other"] = v.left_leg_hp_max_other;
        }
        if((v["left_leg_details"]) && ((v["location2_details"] === undefined) || (v["location2_details"] === ""))) {
            location2_newattrs["location2_details"] = v.left_leg_details;
        }
        if((v["left_leg_armor_type"]) && ((v["location2_armor_type"] === undefined) || (v["location2_armor_type"] === ""))) {
            location2_newattrs["location2_armor_type"] = v.left_leg_armor_type;
        }
        if((v["left_leg_armor_enc"]) && ((v["location2_armor_enc"] === undefined) || (v["location2_armor_enc"] === ""))) {
            location2_newattrs["location2_armor_enc"] = v.left_leg_armor_enc;
        }
        console.log("Setting hit location2 values copied from left_leg");
        setAttrs(location2_newattrs);
    });

    var location3_newattrs = {};
    getAttrs(["abdomen_armor_ap", "abdomen_armor_equipped", "abdomen_other_ap", "abdomen_hp", "abdomen_hp_max_base", "abdomen_hp_max_other", "abdomen_details", "abdomen_armor_type", "abdomen_armor_enc", "location3_armor_ap", "location3_armor_equipped", "location3_other_ap", "location3_hp", "location3_hp_max_base", "location3_hp_max_other", "location3_details", "location3_armor_type", "location3_armor_enc"], function(v) {
        if((v["abdomen_armor_ap"]) && ((v["location3_armor_ap"] === undefined) || (v["location3_armor_ap"] === ""))) {
            location3_newattrs["location3_armor_ap"] = v.abdomen_armor_ap;
        }
        if((v["abdomen_armor_equipped"]) && ((v["location3_armor_equipped"] === undefined) || (v["location3_armor_equipped"] === ""))) {
            location3_newattrs["location3_armor_equipped"] = v.abdomen_armor_equipped;
        }
        if((v["abdomen_other_ap"]) && ((v["location3_other_ap"] === undefined) || (v["location3_other_ap"] === ""))) {
            location3_newattrs["location3_other_ap"] = v.abdomen_other_ap;
        }
        if((v["abdomen_hp"]) && ((v["location3_hp"] === undefined) || (v["location3_hp"] === ""))) {
            location3_newattrs["location3_hp"] = v.abdomen_hp;
        }
        if((v["abdomen_hp_max_base"]) && ((v["location3_hp_max_base"] === undefined) || (v["location3_hp_max_base"] === ""))) {
            location3_newattrs["location3_hp_max_base"] = v.abdomen_hp_max_base;
        }
        if((v["abdomen_hp_max_other"]) && ((v["location3_hp_max_other"] === undefined) || (v["location3_hp_max_other"] === ""))) {
            location3_newattrs["location3_hp_max_other"] = v.abdomen_hp_max_other;
        }
        if((v["abdomen_details"]) && ((v["location3_details"] === undefined) || (v["location3_details"] === ""))) {
            location3_newattrs["location3_details"] = v.abdomen_details;
        }
        if((v["abdomen_armor_type"]) && ((v["location3_armor_type"] === undefined) || (v["location3_armor_type"] === ""))) {
            location3_newattrs["location3_armor_type"] = v.abdomen_armor_type;
        }
        if((v["abdomen_armor_enc"]) && ((v["location3_armor_enc"] === undefined) || (v["location3_armor_enc"] === ""))) {
            location3_newattrs["location3_armor_enc"] = v.abdomen_armor_enc;
        }
        console.log("Setting hit location3 values copied from abdomen");
        setAttrs(location3_newattrs);
    });

    var location4_newattrs = {};
    getAttrs(["chest_armor_ap", "chest_armor_equipped", "chest_other_ap", "chest_hp", "chest_hp_max_base", "chest_hp_max_other", "chest_details", "chest_armor_type", "chest_armor_enc", "location4_armor_ap", "location4_armor_equipped", "location4_other_ap", "location4_hp", "location4_hp_max_base", "location4_hp_max_other", "location4_details", "location4_armor_type", "location4_armor_enc"], function(v) {
        if((v["chest_armor_ap"]) && ((v["location4_armor_ap"] === undefined) || (v["location4_armor_ap"] === ""))) {
            location4_newattrs["location4_armor_ap"] = v.chest_armor_ap;
        }
        if((v["chest_armor_equipped"]) && ((v["location4_armor_equipped"] === undefined) || (v["location4_armor_equipped"] === ""))) {
            location4_newattrs["location4_armor_equipped"] = v.chest_armor_equipped;
        }
        if((v["chest_other_ap"]) && ((v["location4_other_ap"] === undefined) || (v["location4_other_ap"] === ""))) {
            location4_newattrs["location4_other_ap"] = v.chest_other_ap;
        }
        if((v["chest_hp"]) && ((v["location4_hp"] === undefined) || (v["location4_hp"] === ""))) {
            location4_newattrs["location4_hp"] = v.chest_hp;
        }
        if((v["chest_hp_max_base"]) && ((v["location4_hp_max_base"] === undefined) || (v["location4_hp_max_base"] === ""))) {
            location4_newattrs["location4_hp_max_base"] = v.chest_hp_max_base;
        }
        if((v["chest_hp_max_other"]) && ((v["location4_hp_max_other"] === undefined) || (v["location4_hp_max_other"] === ""))) {
            location4_newattrs["location4_hp_max_other"] = v.chest_hp_max_other;
        }
        if((v["chest_details"]) && ((v["location4_details"] === undefined) || (v["location4_details"] === ""))) {
            location4_newattrs["location4_details"] = v.chest_details;
        }
        if((v["chest_armor_type"]) && ((v["location4_armor_type"] === undefined) || (v["location4_armor_type"] === ""))) {
            location4_newattrs["location4_armor_type"] = v.chest_armor_type;
        }
        if((v["chest_armor_enc"]) && ((v["location4_armor_enc"] === undefined) || (v["location4_armor_enc"] === ""))) {
            location4_newattrs["location4_armor_enc"] = v.chest_armor_enc;
        }
        console.log("Setting hit location4 values copied from chest");
        setAttrs(location4_newattrs);
    });

    var location5_newattrs = {};
    getAttrs(["right_arm_armor_ap", "right_arm_armor_equipped", "right_arm_other_ap", "right_arm_hp", "right_arm_hp_max_base", "right_arm_hp_max_other", "right_arm_details", "right_arm_armor_type", "right_arm_armor_enc", "location5_armor_ap", "location5_armor_equipped", "location5_other_ap", "location5_hp", "location5_hp_max_base", "location5_hp_max_other", "location5_details", "location5_armor_type", "location5_armor_enc"], function(v) {
        if((v["right_arm_armor_ap"]) && ((v["location5_armor_ap"] === undefined) || (v["location5_armor_ap"] === ""))) {
            location5_newattrs["location5_armor_ap"] = v.right_arm_armor_ap;
        }
        if((v["right_arm_armor_equipped"]) && ((v["location5_armor_equipped"] === undefined) || (v["location5_armor_equipped"] === ""))) {
            location5_newattrs["location5_armor_equipped"] = v.right_arm_armor_equipped;
        }
        if((v["right_arm_other_ap"]) && ((v["location5_other_ap"] === undefined) || (v["location5_other_ap"] === ""))) {
            location5_newattrs["location5_other_ap"] = v.right_arm_other_ap;
        }
        if((v["right_arm_hp"]) && ((v["location5_hp"] === undefined) || (v["location5_hp"] === ""))) {
            location5_newattrs["location5_hp"] = v.right_arm_hp;
        }
        if((v["right_arm_hp_max_base"]) && ((v["location5_hp_max_base"] === undefined) || (v["location5_hp_max_base"] === ""))) {
            location5_newattrs["location5_hp_max_base"] = v.right_arm_hp_max_base;
        }
        if((v["right_arm_hp_max_other"]) && ((v["location5_hp_max_other"] === undefined) || (v["location5_hp_max_other"] === ""))) {
            location5_newattrs["location5_hp_max_other"] = v.right_arm_hp_max_other;
        }
        if((v["right_arm_details"]) && ((v["location5_details"] === undefined) || (v["location5_details"] === ""))) {
            location5_newattrs["location5_details"] = v.right_arm_details;
        }
        if((v["right_arm_armor_type"]) && ((v["location5_armor_type"] === undefined) || (v["location5_armor_type"] === ""))) {
            location5_newattrs["location5_armor_type"] = v.right_arm_armor_type;
        }
        if((v["right_arm_armor_enc"]) && ((v["location5_armor_enc"] === undefined) || (v["location5_armor_enc"] === ""))) {
            location5_newattrs["location5_armor_enc"] = v.right_arm_armor_enc;
        }
        console.log("Setting hit location5 values copied from right_arm");
        setAttrs(location5_newattrs);
    });

    var location6_newattrs = {};
    getAttrs(["left_arm_armor_ap", "left_arm_armor_equipped", "left_arm_other_ap", "left_arm_hp", "left_arm_hp_max_base", "left_arm_hp_max_other", "left_arm_details", "left_arm_armor_type", "left_arm_armor_enc", "location6_armor_ap", "location6_armor_equipped", "location6_other_ap", "location6_hp", "location6_hp_max_base", "location6_hp_max_other", "location6_details", "location6_armor_type", "location6_armor_enc"], function(v) {
        if((v["left_arm_armor_ap"]) && ((v["location6_armor_ap"] === undefined) || (v["location6_armor_ap"] === ""))) {
            location6_newattrs["location6_armor_ap"] = v.left_arm_armor_ap;
        }
        if((v["left_arm_armor_equipped"]) && ((v["location6_armor_equipped"] === undefined) || (v["location6_armor_equipped"] === ""))) {
            location6_newattrs["location6_armor_equipped"] = v.left_arm_armor_equipped;
        }
        if((v["left_arm_other_ap"]) && ((v["location6_other_ap"] === undefined) || (v["location6_other_ap"] === ""))) {
            location6_newattrs["location6_other_ap"] = v.left_arm_other_ap;
        }
        if((v["left_arm_hp"]) && ((v["location6_hp"] === undefined) || (v["location6_hp"] === ""))) {
            location6_newattrs["location6_hp"] = v.left_arm_hp;
        }
        if((v["left_arm_hp_max_base"]) && ((v["location6_hp_max_base"] === undefined) || (v["location6_hp_max_base"] === ""))) {
            location6_newattrs["location6_hp_max_base"] = v.left_arm_hp_max_base;
        }
        if((v["left_arm_hp_max_other"]) && ((v["location6_hp_max_other"] === undefined) || (v["location6_hp_max_other"] === ""))) {
            location6_newattrs["location6_hp_max_other"] = v.left_arm_hp_max_other;
        }
        if((v["left_arm_details"]) && ((v["location6_details"] === undefined) || (v["location6_details"] === ""))) {
            location6_newattrs["location6_details"] = v.left_arm_details;
        }
        if((v["left_arm_armor_type"]) && ((v["location6_armor_type"] === undefined) || (v["location6_armor_type"] === ""))) {
            location6_newattrs["location6_armor_type"] = v.left_arm_armor_type;
        }
        if((v["left_arm_armor_enc"]) && ((v["location6_armor_enc"] === undefined) || (v["location6_armor_enc"] === ""))) {
            location6_newattrs["location6_armor_enc"] = v.left_arm_armor_enc;
        }
        console.log("Setting hit location6 values copied from left_arm");
        setAttrs(location6_newattrs);
    });

    var location7_newattrs = {};
    getAttrs(["head_armor_ap", "head_armor_equipped", "head_other_ap", "head_hp", "head_hp_max_base", "head_hp_max_other", "head_details", "head_armor_type", "head_armor_enc", "location7_armor_ap", "location7_armor_equipped", "location7_other_ap", "location7_hp", "location7_hp_max_base", "location7_hp_max_other", "location7_details", "location7_armor_type", "location7_armor_enc"], function(v) {
        if((v["head_armor_ap"]) && ((v["location7_armor_ap"] === undefined) || (v["location7_armor_ap"] === ""))) {
            location7_newattrs["location7_armor_ap"] = v.head_armor_ap;
        }
        if((v["head_armor_equipped"]) && ((v["location7_armor_equipped"] === undefined) || (v["location7_armor_equipped"] === ""))) {
            location7_newattrs["location7_armor_equipped"] = v.head_armor_equipped;
        }
        if((v["head_other_ap"]) && ((v["location7_other_ap"] === undefined) || (v["location7_other_ap"] === ""))) {
            location7_newattrs["location7_other_ap"] = v.head_other_ap;
        }
        if((v["head_hp"]) && ((v["location7_hp"] === undefined) || (v["location7_hp"] === ""))) {
            location7_newattrs["location7_hp"] = v.head_hp;
        }
        if((v["head_hp_max_base"]) && ((v["location7_hp_max_base"] === undefined) || (v["location7_hp_max_base"] === ""))) {
            location7_newattrs["location7_hp_max_base"] = v.head_hp_max_base;
        }
        if((v["head_hp_max_other"]) && ((v["location7_hp_max_other"] === undefined) || (v["location7_hp_max_other"] === ""))) {
            location7_newattrs["location7_hp_max_other"] = v.head_hp_max_other;
        }
        if((v["head_details"]) && ((v["location7_details"] === undefined) || (v["location7_details"] === ""))) {
            location7_newattrs["location7_details"] = v.head_details;
        }
        if((v["head_armor_type"]) && ((v["location7_armor_type"] === undefined) || (v["location7_armor_type"] === ""))) {
            location7_newattrs["location7_armor_type"] = v.head_armor_type;
        }
        if((v["head_armor_enc"]) && ((v["location7_armor_enc"] === undefined) || (v["location7_armor_enc"] === ""))) {
            location7_newattrs["location7_armor_enc"] = v.head_armor_enc;
        }
        console.log("Setting hit location7 values copied from head");
        setAttrs(location7_newattrs);
    });
}

function upgrade_1_5_2_to_1_6_0() {
    console.log("convert traits into repeating fieldset");
    getAttrs(["traits", "npc_traits"], function(v) {
        var traitid = generateRowID();
        var npctraitattrs = {};
        var traitattrs = {};
        npctraitattrs["repeating_npctrait_" + traitid + "_trait"] = v["npc_traits"];
        setAttrs(npctraitattrs);
        traitattrs["repeating_trait_" + traitid + "_trait"] = v["traits"];
        setAttrs(traitattrs);
    });

    console.log("merge weapon effects and traits");
    getSectionIDs("shield", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];
            getAttrs(["repeating_shield_" + id + "_effects", "repeating_shield_" + id + "_traits"], function(v) {
                var effects = v["repeating_shield_" + id + "_effects"];
                var traits = v["repeating_shield_" + id + "_traits"];
                shieldattrs = {};
                if (effects == "") {
                    shieldattrs["repeating_shield_" + id + "_notes"] =  traits;
                } else if (traits == "") {
                    shieldattrs["repeating_shield_" + id + "_notes"] = effects;
                } else {
                    shieldattrs["repeating_shield_" + id + "_notes"] = effects + "/" + traits;
                }
                setAttrs(shieldattrs);
            });
        }
    });

    getSectionIDs("meleeweapon", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];
            getAttrs(["repeating_meleeweapon_" + id + "_effects", "repeating_meleeweapon_" + id + "_traits"], function(v) {
                var effects = v["repeating_meleeweapon_" + id + "_effects"];
                var traits = v["repeating_meleeweapon_" + id + "_traits"];
                meleeweaponattrs = {};
                if (effects == "") {
                    meleeweaponattrs["repeating_meleeweapon_" + id + "_notes"] =  traits;
                } else if (traits == "") {
                    meleeweaponattrs["repeating_meleeweapon_" + id + "_notes"] = effects;
                } else {
                    meleeweaponattrs["repeating_meleeweapon_" + id + "_notes"] = effects + "/" + traits;
                }
                setAttrs(meleeweaponattrs);
            });
        }
    });

    getSectionIDs("missileweapon", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];
            getAttrs(["repeating_missileweapon_" + id + "_effects", "repeating_missileweapon_" + id + "_traits"], function(v) {
                var effects = v["repeating_missileweapon_" + id + "_effects"];
                var traits = v["repeating_missileweapon_" + id + "_traits"];
                missileweaponattrs = {};
                if (effects == "") {
                    missileweaponattrs["repeating_missileweapon_" + id + "_notes"] =  traits;
                } else if (traits == "") {
                    missileweaponattrs["repeating_missileweapon_" + id + "_notes"] = effects;
                } else {
                    missileweaponattrs["repeating_missileweapon_" + id + "_notes"] = effects + "/" + traits;
                }
                setAttrs(missileweaponattrs);
            });
        }
    });

    getSectionIDs("firearm", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];
            getAttrs(["repeating_firearm_" + id + "_traits"], function(v) {
                var traits = v["repeating_firearm_" + id + "_traits"];
                firearmattrs = {};
                firearmattrs["repeating_firearm_" + id + "_notes"] =  traits;
                setAttrs(firearmattrs);
            });
        }
    });
}

function upgrade_1_7_0_to_1_8_0() {
    console.log("copy gear_enc to loadout_enc");
    var newattrs = {};
    getAttrs(["gear_enc", "la_psionics_enabled_option", "display_la_psionics"], function(v) {
        if(v["gear_enc"]) {
            newattrs["loadout_enc"] = v.gear_enc;
        }
        console.log("Setting loadout_enc value copied from gear_enc");
        if(v["la_psionics_enabled_option"]) {
            newattrs["mythras_psionics_enabled_option"] = v.la_psionics_enabled_option;
        }
        console.log("Setting mythras_psionics_enabled_option value copied from la_psionics_enabled_option");
        if(v["display_la_psionics"]) {
            newattrs["display_mythras_psionics"] = v.display_la_psionics;
        }
        console.log("Setting display_mythras_psionics value copied from display_la_psionics");
        setAttrs(newattrs);
    });
}

function upgrade_1_9_1_to_2_0() {
    getAttrs(["fatigue", "action_points_swiftness", "damage_mod_mighty", "healing_rate_healthy", "hit_locations_robust", "cult_spirit_limit", "notes"], function(v) {
        var newattrs = {};

        // Copy notes to system notes
        if (v.notes) {
            newattrs["system_notes"] = v.notes;
        }

        // Convert cult Spirit Limit to number base and rename
        if (v.cult_spirit_limit == "ceil(@{cha}*.25)") {
            newattrs["animism_cult_rank"] = 1;
        } else if (v.cult_spirit_limit = "ceil(@{cha}*.5)") {
            newattrs["animism_cult_rank"] = 2;
        } else if (v.cult_spirit_limit = "ceil(@{cha}*.75)") {
            newattrs["animism_cult_rank"] = 3;
        } else if (v.cult_spirit_limit = "@{cha}") {
            newattrs["animism_cult_rank"] = 4;
        } else if (v.cult_spirit_limit = "@{cha}+0") {
            newattrs["animism_cult_rank"] = 5;
        } else {
            newattrs["animism_cult_rank"] = 1;
        }

        // Convert Fatigue to Number Base
        if(v["fatigue"] === "Fresh") {
            newattrs["fatigue"] = 9;
        }
        else if(v["fatigue"] === "Winded") {
            newattrs["fatigue"] = 8;
        }
        else if(v["fatigue"] === "Tired") {
            newattrs["fatigue"] = 7;
        }
        else if(v["fatigue"] === "Wearied") {
            newattrs["fatigue"] = 6;
        }
        else if(v["fatigue"] === "Exhausted") {
            newattrs["fatigue"] = 5;
        }
        else if(v["fatigue"] === "Debilitated") {
            newattrs["fatigue"] = 4;
        }
        else if(v["fatigue"] === "Incapacitated") {
            newattrs["fatigue"] = 3;
        }
        else if(v["fatigue"] === "Semi-Conscious") {
            newattrs["fatigue"] = 2;
        }
        else if(v["fatigue"] === "Comatose") {
            newattrs["fatigue"] = 1;
        }
        else if(v["fatigue"] === "Dead") {
            newattrs["fatigue"] = 0;
        }
        else {
            newattrs["fatigue"] = 9;
        }

        if (v.action_points_swiftness) {
            newattrs["action_points_add_one"] = v.action_points_swiftness;
        }
        if (v.damage_mod_mighty) {
            newattrs["damage_mod_add_pow"] = v.damage_mod_mighty;
        }
        if (v.healing_rate_healthy) {
            newattrs["healing_rate_double"] = v.healing_rate_healthy;
        }
        if (v.hit_locations_robust) {
            newattrs["hp_use_pow"] = v.hit_locations_robust;
        }

        setAttrs(newattrs);
    });

    getSectionIDs("repeating_mspower", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_mspower_" + id + "_name";
            var old_fumbled = "repeating_mspower_" + id + "_fumbled";
            var old_trained = "repeating_mspower_" + id + "_trained";
            var old_augment = "repeating_mspower_" + id + "_augment";
            var old_penalty = "repeating_mspower_" + id + "_penalty";
            var old_sphere = "repeating_mspower_" + id + "_sphere";
            var old_arc = "repeating_mspower_" + id + "_arc";
            var old_details = "repeating_mspower_" + id + "_details";
            var old_experience = "repeating_mspower_" + id + "_experience";
            var old_other = "repeating_mspower_" + id + "_other";
            var old_cost = "repeating_mspower_" + id + "_cost";
            var old_description = "repeating_mspower_" + id + "_description";
            getAttrs([old_name, old_fumbled, old_trained, old_augment, old_penalty, old_sphere, old_arc, old_details, old_experience, old_other, old_cost, old_description], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};

                if (v[old_name]) { newrowattrs["repeating_psionicpower_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_fumbled]) { newrowattrs["repeating_psionicpower_" + newrowid + "_fumbled"] = v[old_fumbled]; }
                if (v[old_trained]) { newrowattrs["repeating_psionicpower_" + newrowid + "_trained"] = v[old_trained]; }
                if (v[old_augment]) { newrowattrs["repeating_psionicpower_" + newrowid + "_temp"] = v[old_augment]; }
                if (v[old_penalty]) { newrowattrs["repeating_psionicpower_" + newrowid + "_penalty"] = v[old_penalty]; }
                if (v[old_sphere]) { newrowattrs["repeating_psionicpower_" + newrowid + "_sphere"] = v[old_sphere]; }
                if (v[old_arc]) { newrowattrs["repeating_psionicpower_" + newrowid + "_arc"] = v[old_arc]; }
                if (v[old_details]) { newrowattrs["repeating_psionicpower_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_experience]) { newrowattrs["repeating_psionicpower_" + newrowid + "_experience"] = v[old_experience]; }
                if (v[old_other]) { newrowattrs["repeating_psionicpower_" + newrowid + "_other"] = v[old_other]; }
                if (v[old_cost]) { newrowattrs["repeating_psionicpower_" + newrowid + "_cost"] = v[old_cost]; }
                if (v[old_description]) { newrowattrs["repeating_psionicpower_" + newrowid + "_description"] = v[old_description]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_ladiscipline", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_ladiscipline_" + id + "_name";
            var old_fumbled = "repeating_ladiscipline_" + id + "_fumbled";
            var old_trained = "repeating_ladiscipline_" + id + "_trained";
            var old_augment = "repeating_ladiscipline_" + id + "_augment";
            var old_penalty = "repeating_ladiscipline_" + id + "_penalty";
            var old_details = "repeating_ladiscipline_" + id + "_details";
            var old_experience = "repeating_ladiscipline_" + id + "_experience";
            var old_other = "repeating_ladiscipline_" + id + "_other";
            var old_discipline_talents = "repeating_ladiscipline_" + id + "_discipline_talents";
            getAttrs([old_name, old_fumbled, old_trained, old_augment, old_penalty, old_details, old_experience, old_other, old_discipline_talents], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};
                if (v[old_name]) { newrowattrs["repeating_discipline_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_fumbled]) { newrowattrs["repeating_discipline_" + newrowid + "_fumbled"] = v[old_fumbled]; }
                if (v[old_trained]) { newrowattrs["repeating_discipline_" + newrowid + "_trained"] = v[old_trained]; }
                if (v[old_augment]) { newrowattrs["repeating_discipline_" + newrowid + "_temp"] = v[old_augment]; }
                if (v[old_penalty]) { newrowattrs["repeating_discipline_" + newrowid + "_penalty"] = v[old_penalty]; }
                if (v[old_details]) { newrowattrs["repeating_discipline_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_experience]) { newrowattrs["repeating_discipline_" + newrowid + "_experience"] = v[old_experience]; }
                if (v[old_other]) { newrowattrs["repeating_discipline_" + newrowid + "_other"] = v[old_other]; }
                if (v[old_discipline_talents]) { newrowattrs["repeating_discipline_" + newrowid + "_discipline_talents"] = v[old_discipline_talents]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_latalent", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_latalent_" + id + "_name";
            var old_description = "repeating_latalent_" + id + "_description";
            var old_intensity = "repeating_latalent_" + id + "_intensity";
            var old_range = "repeating_latalent_" + id + "_range";
            var old_duration = "repeating_latalent_" + id + "_duration";
            var old_area = "repeating_latalent_" + id + "_area";
            var old_cost = "repeating_latalent_" + id + "_cost";
            var old_resist = "repeating_latalent_" + id + "_resist";
            var old_damage = "repeating_latalent_" + id + "_damage";
            var old_macro = "repeating_latalent_" + id + "_macro";
            var old_details = "repeating_latalent_" + id + "_details";
            getAttrs([old_name, old_description, old_intensity, old_range, old_duration, old_area, old_cost, old_resist, old_damage, old_macro, old_details], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};
                if (v[old_name]) { newrowattrs["repeating_psionictalent_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_description]) { newrowattrs["repeating_psionictalent_" + newrowid + "_description"] = v[old_description]; }
                if (v[old_intensity]) {
                    newrowattrs["repeating_psionictalent_" + newrowid + "_intensity"] = v[old_intensity].replace("_ladiscipline_", "_discipline_");
                }
                if (v[old_range]) { newrowattrs["repeating_psionictalent_" + newrowid + "_range"] = v[old_range]; }
                if (v[old_duration]) { newrowattrs["repeating_psionictalent_" + newrowid + "_duration"] = v[old_duration]; }
                if (v[old_area]) { newrowattrs["repeating_psionictalent_" + newrowid + "_area"] = v[old_area]; }
                if (v[old_cost]) { newrowattrs["repeating_psionictalent_" + newrowid + "_cost"] = v[old_cost]; }
                if (v[old_resist]) { newrowattrs["repeating_psionictalent_" + newrowid + "_resist"] = v[old_resist]; }
                if (v[old_damage]) { newrowattrs["repeating_psionictalent_" + newrowid + "_damage"] = v[old_damage]; }
                if (v[old_macro]) { newrowattrs["repeating_psionictalent_" + newrowid + "_macro"] = v[old_macro]; }
                if (v[old_details]) { newrowattrs["repeating_psionictalent_" + newrowid + "_details"] = v[old_details]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_shield", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_shield_" + id + "_name";
            var old_damage_mod_toggle = "repeating_shield_" + id + "_damage_mod_toggle";
            var old_damage = "repeating_shield_" + id + "_damage";
            var old_size = "repeating_shield_" + id + "_size";
            var old_reach = "repeating_shield_" + id + "_reach";
            var old_ap = "repeating_shield_" + id + "_ap";
            var old_hp = "repeating_shield_" + id + "_hp";
            var old_hp_max = "repeating_shield_" + id + "_hp_max";
            var old_notes = "repeating_shield_" + id + "_notes";
            var old_details = "repeating_shield_" + id + "_details";
            var old_enc = "repeating_shield_" + id + "_enc";
            getAttrs([old_name, old_damage_mod_toggle, old_damage, old_size, old_reach, old_ap, old_hp, old_details, old_hp_max, old_notes, old_enc], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};

                if (v[old_name]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_damage_mod_toggle]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_damage_mod_toggle"] = v[old_damage_mod_toggle]; }
                if (v[old_damage]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_damage"] = v[old_damage]; }
                if (v[old_size]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_size"] = v[old_size]; }
                if (v[old_reach]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_reach"] = v[old_reach]; }
                if (v[old_ap]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_ap"] = v[old_ap]; }
                if (v[old_hp]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_hp"] = v[old_hp]; }
                if (v[old_hp_max]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_hp_max"] = v[old_hp_max]; }
                if (v[old_details]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_notes]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_notes"] = v[old_notes]; }
                if (v[old_enc]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_enc"] = v[old_enc]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_firearm", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_firearm_" + id + "_name";
            var old_damage = "repeating_firearm_" + id + "_damage";
            var old_fire_rate = "repeating_firearm_" + id + "_fire-rate";
            var old_range = "repeating_firearm_" + id + "_range";
            var old_ammo = "repeating_firearm_" + id + "_ammo";
            var old_ammo_max = "repeating_firearm_" + id + "_ammo_max";
            var old_load = "repeating_firearm_" + id + "_load";
            var old_notes = "repeating_firearm_" + id + "_notes";
            var old_details = "repeating_firearm_" + id + "_details";
            var old_enc = "repeating_firearm_" + id + "_enc";
            getAttrs([old_name, old_damage, old_fire_rate, old_range, old_ammo, old_ammo_max, old_details, old_load, old_notes, old_enc], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};

                if (v[old_name]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_damage]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_damage"] = v[old_damage]; }
                if (v[old_fire_rate]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_rate"] = v[old_fire_rate]; }
                if (v[old_range]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_range"] = v[old_range]; }
                if (v[old_ammo]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_ammo"] = v[old_ammo]; }
                if (v[old_ammo_max]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_ammo_max"] = v[old_ammo_max]; }
                if (v[old_load]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_load"] = v[old_load]; }
                if (v[old_details]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_notes]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_notes"] = v[old_notes]; }
                if (v[old_enc]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_enc"] = v[old_enc]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_missileweapon", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_missileweapon_" + id + "_name";
            var old_damage_mod_toggle = "repeating_shield_" + id + "_damage_mod_toggle";
            var old_damage = "repeating_missileweapon_" + id + "_damage";
            var old_force = "repeating_missileweapon_" + id + "_force";
            var old_range = "repeating_missileweapon_" + id + "_range";
            var old_impale_size = "repeating_missileweapon_" + id + "_impale_size";
            var old_ap = "repeating_missileweapon_" + id + "_ap";
            var old_load = "repeating_missileweapon_" + id + "_load";
            var old_notes = "repeating_missileweapon_" + id + "_notes";
            var old_details = "repeating_missileweapon_" + id + "_details";
            var old_enc = "repeating_missileweapon_" + id + "_enc";
            var old_hp = "repeating_missileweapon_" + id + "_hp";
            var old_hp_max = "repeating_missileweapon_" + id + "_hp_max";
            getAttrs([old_name, old_damage_mod_toggle, old_damage, old_force, old_range, old_impale_size, old_ap, old_details, old_load, old_notes, old_enc, old_hp, old_hp_max], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};

                if (v[old_name]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_damage_mod_toggle]) {
                    if (v[old_damage_mod_toggle] == "@{damage_mod}") {
                        newrowattrs["repeating_rangedweapon_" + newrowid + "_damage_mod_toggle"] = 1;
                    } else {
                        newrowattrs["repeating_rangedweapon_" + newrowid + "_damage_mod_toggle"] = v[old_damage_mod_toggle];
                    }
                }
                if (v[old_damage]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_damage"] = v[old_damage]; }
                if (v[old_force]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_force"] = v[old_force]; }
                if (v[old_range]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_range"] = v[old_range]; }
                if (v[old_impale_size]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_impale_size"] = v[old_impale_size]; }
                if (v[old_ap]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_ap"] = v[old_ap]; }
                if (v[old_load]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_load"] = v[old_load]; }
                if (v[old_details]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_notes]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_notes"] = v[old_notes]; }
                if (v[old_enc]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_enc"] = v[old_enc]; }
                if (v[old_hp]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_hp"] = v[old_hp]; }
                if (v[old_hp_max]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_hp_max"] = v[old_hp_max]; }
                setAttrs(newrowattrs);
            });
        }
    });

    // Convert Learned to Sheet workers
    getAttrs(["arcane_casting_learned", "channel_learned", "fata_learned", "folk_magic_learned", "trance_learned", "exhort_learned", "type"], function(v) {
        var newvattrs = {};

        if (v.arcane_casting_learned) {
            if (v.arcane_casting_learned == "@{arcane_casting_base}") {
                newattrs["arcane_casting_learned"] = 1;
            }
        }

        if (v.channel_learned) {
            if (v.channel_learned == "@{channel_base}") {
                newattrs["channel_learned"] = 1;
            }
        }

        if (v.fata_learned) {
            if (v.fata_learned == "@{fata_base}") {
                newattrs["fata_learned"] = 1;
            }
        }

        if (v.folk_magic_learned) {
            if (v.folk_magic_learned == "@{folk_magic_base}") {
                newattrs["folk_magic_learned"] = 1;
            }
        }

        if (v.trance_learned) {
            if (v.trance_learned == "@{trance_base}") {
                newattrs["trance_learned"] = 1;
            }
        }

        if (v.exhort_learned) {
            if (v.exhort_learned == "@{exhort_base}") {
                newattrs["exhort_learned"] = 1;
            }
        }

        if (v.type) {
            if (v.type == "npc") {
                newattrs["type"] = "pc";
            }
        }

        setAttrs(newvattrs);
    });

    // Recalc Chars
    console.log("recalc fatigue");
    calc_fatigue();

    console.log("recalc str");
    calc_str();

    console.log("recalc deps");
    getSectionIDs("repeating_dependency", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_passion("repeating_dependency_" + currentID);
            });
        }
    });

    console.log("recalc dex");
    calc_con();

    // Run calc for skills there really need it first
    console.log("recalc status");
    calc_skill("status", "0", "0", 1);

    console.log("recalc con");
    calc_siz();

    console.log("recalc passions");
    getSectionIDs("repeating_passion", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_passion("repeating_passion_" + currentID);
            });
        }
    });

    console.log("recalc siz");
    calc_dex();

    console.log("recalc affiliations");
    getSectionIDs("repeating_affiliation", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_affiliation_" + currentID, "0", "0", 1);
            });
        }
    });

    console.log("recalc int");
    calc_int();

    console.log("recalc melee enc");
    calc_melee_enc();

    console.log("recalc pow");
    calc_pow();

    console.log("recalc ranged enc")
    calc_ranged_enc();

    console.log("recalc cha");
    calc_cha();

}

function upgrade_2_1_to_2_2() {
    var newattrs = {};
    getAttrs(["hp_use_pow", "damage_mod_add_pow"], function(v) {
        console.log("Convert hp_use_pow to hp_calc");
        if(v["hp_use_pow"]) {
            newattrs["hp_calc"] = v["hp_use_pow"];
        } else {
            newattrs["hp_calc"] = "0";
        }

        console.log("Convert damage_mod_add_pow to damage_mod_calc");
        if(v["damage_mod_add_pow"]) {
            newattrs["damage_mod_calc"] = v["damage_mod_add_pow"];
        } else {
            newattrs["damage_mod_calc"] = "0";
        }

        setAttrs(newattrs);
    });

    calc_hp_max_base();
    calc_simplified_hp();
    calc_damage_mod();
    calc_initiative();
}

var versioning = function() {
    getAttrs(["version"], function(v) {
        console.log("Current Sheet Version = " + v["version"]);
        if(!v["version"] || v["version"] === "") {
            console.log("setting initial version at 1.0");
            setAttrs({version: "1.0"});
            versioning();
        }
        else if(v["version"] === "1.0") {
            console.log("upgrading to v1.1");
            upgrade_1_0_to_1_1();
            setAttrs({version: "1.1"});
            versioning();
        }
        else if(v["version"] === "1.1") {
            console.log("upgrading to v1.2.0");
            upgrade_1_1_to_1_2_0();
            setAttrs({version: "1.2.0"});
            versioning();
        }
        else if(v["version"] === "1.2.0") {
            console.log("upgrading to v1.3.2");
            upgrade_1_2_0_to_1_3_0();
            setAttrs({version: "1.3.2"});
            versioning();
        }
        else if(v["version"] === "1.3.0") {
            console.log("upgrading to v1.3.1");
            // upgrade_1_2_0_to_1_3_0();
            setAttrs({version: "1.3.1"});
            versioning();
        }
        else if(v["version"] === "1.3.1") {
            console.log("upgrading to v1.3.2");
            upgrade_1_2_0_to_1_3_0();
            setAttrs({version: "1.3.2"});
            versioning();
        }
        else if(v["version"] === "1.3.2") {
            console.log("upgrading to v1.3.3");
            setAttrs({version: "1.3.3"});
            versioning();
        }
        else if(v["version"] === "1.3.3") {
            console.log("upgrading to v1.4.0");
            setAttrs({version: "1.4.0"});
            versioning();
        }
        else if(v["version"] === "1.4.0") {
            console.log("upgrading to v1.4.1");
            setAttrs({version: "1.4.1"});
            versioning();
        }
        else if(v["version"] === "1.4.1") {
            console.log("upgrading to v1.5.0");
            setAttrs({version: "1.5.0"});
            versioning();
        }
        else if(v["version"] === "1.5.0") {
            console.log("upgrading to v1.5.1");
            setAttrs({version: "1.5.1"});
            versioning();
        }
        else if(v["version"] === "1.5.1") {
            console.log("upgrading to v1.5.2");
            setAttrs({version: "1.5.2"});
            versioning();
        }
        else if(v["version"] === "1.5.2") {
            console.log("upgrading to v1.6.0");
            upgrade_1_5_2_to_1_6_0();
            setAttrs({version: "1.6.0"});
            versioning();
        }
        else if(v["version"] === "1.6.0") {
            console.log("upgrading to v1.7.0");
            setAttrs({version: "1.7.0"});
            versioning();
        }
        else if(v["version"] === "1.7.0") {
            console.log("upgrading to v1.8.0");
            upgrade_1_7_0_to_1_8_0();
            setAttrs({version: "1.8.0"});
            versioning();
        }
        else if(v["version"] === "1.8.0") {
            console.log("upgrading to v1.8.1");
            setAttrs({version: "1.8.1"});
            versioning();
        }
        else if(v["version"] === "1.8.1") {
            console.log("upgrading to v1.9.0");
            setAttrs({version: "1.9.0"});
            versioning();
        }
        else if(v["version"] === "1.9.0") {
            console.log("upgrading to v1.9.1");
            setAttrs({version: "1.9.1"});
            versioning();
        }
        else if(v["version"] === "1.9.1") {
            console.log("upgrading to v2.0");
            upgrade_1_9_1_to_2_0();
            setAttrs({version: "2.0"});
            versioning();
        }
        else if(v["version"] === "2.0.0") {
            setAttrs({version: "2.0"});
            versioning();
        }
        else if(v["version"] === "2") {
            setAttrs({version: "2.0"});
            versioning();
        }
        else if(v["version"] === "2.0") {
            console.log("upgrading to v2.1");
            setAttrs({version: "2.1"});
            versioning();
        }
        else if(v["version"] === "2.1") {
            console.log("upgrading to v2.2");
            upgrade_2_1_to_2_2();
            setAttrs({version: "2.2"});
            versioning();
        }
        else if(v["version"] === "2.2") {
            console.log("upgrading to v2.3");
            setAttrs({version: "2.3"});
            versioning();
        }
        else if(v["version"] === "2.3") {
            console.log("upgrading to v2.4");
            setAttrs({version: "2.4"});
            versioning();
        }
        else if(v["version"] === "2.4") {
            console.log("upgrading to v2.5");
            setAttrs({version: "2.5"});
            versioning();
        }
        else if(v["version"] === "2.5") {
            console.log("upgrading to v2.6");
            calc_confidence();
            calc_social_initiative();
            calc_composure();
            calc_integrity();
            calc_resolve();
            setAttrs({version: "2.6"});
            versioning();
        }
        else if(v["version"] === "2.6") {
            console.log("upgrading to v2.7");
            setAttrs({version: "2.7"});
            versioning();
        }
        else {
            console.log("Sheet fully updated");
        }
    });
}

//Check for sheet version updates
on("sheet:opened", function() {
    console.log("Checking sheet versions")
    versioning();
    console.log("Setting campaign options")
    campaign_options();
});