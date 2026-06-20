
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
