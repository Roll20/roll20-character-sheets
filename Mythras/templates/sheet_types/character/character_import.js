/* Character Import */
const cultRankMap = {
    'common': 1,
    'lay member': 1,
    'follower': 1,
    'dedicated': 2,
    'initiate': 2,
    'spirit worshipper': 2,
    'proven': 3,
    'acolyte': 3,
    'shaman': 3,
    'overseer': 4,
    'priest': 4,
    'high shaman': 4,
    'leader': 5,
    'high priest': 5,
    'spirit lord': 5
};
const megMagicSkillIds = ['binding', 'devotion', 'exhort', 'folk_magic', 'invocation', 'meditation', 'path', 'shaping', 'trance'];
/**
 * Imports JSON data from the Mythras Encounter Generator or other sources which use the same data format
 */
on("clicked:import", function() {
    getAttrs(['import_json_data', 'import_character', 'setting_option', 'simplified_combat_enabled', 'action_points_calc', 'shaping_traits'], function(v) {
        try {
            const jsonData = JSON.parse(v['import_json_data']);
            const import_character = parseInt(v['import_character']);
            /* Check if the requested import character is out of range */
            if (import_character > jsonData.length) {
                setAttrs({
                    import_errors: "Error: The import data contains " + jsonData.length + " character(s) but you requested number " + import_character + "."
                });
                return;
            }
            const characterData = jsonData[parseInt(v['import_character']) - 1];

            /* We assume defaults and fill in what the import doesn't provide */
            let newAttrs = {
                rank: 0,
                str_base: 0, str: 0,
                con_base: 0, con: 0,
                siz_base: 0, siz: 0,
                dex_base: 0, dex: 0,
                int_base: 0, int: 0,
                pow_base: 0, pow: 0,
                cha_base: 0, cha: 0,
                fatigue: 9,
                action_points_other: 0, action_points_temp: 0, action_points_calc: v['action_points_calc'],
                confidence_other: 0, confidence_temp: 0,
                damage_mod_other: 0, damage_mod_temp: 0, damage_mod_calc: "0",
                experience_mod_other: 0, experience_mod_temp: 0, experience_mod_calc: "0",
                healing_rate_calc: "0", healing_rate_other: 0, healing_rate_temp: 0, healing_rate_double: "0",
                initiative_bonus_other: 0, initiative_bonus_temp: 0, initiative_add_one_tenth_athletics: "0",
                luck_points_other: 0, luck_points_temp: 0, luck_points_calc: "0",
                magic_points_other: 0, magic_points_temp: 0,
                movement_rate_other: 0, movement_rate_temp: 0,
                composure_other: 0, composure: 4, composure_max: 4,
                integrity_other: 0, integrity: 4, integrity_max: 4,
                resolve_other: 0, resolve: 5, resolve_max: 5,
                simplified_combat_enabled: v['simplified_combat_enabled'], hp_calc: "1"
            };

            /* Import Info */
            if (debug) {console.log('Importing Info');}
            newAttrs['character_name'] = characterData['name'];

            if (characterData["cults"]) {
                if (characterData["cults"][0] !== []) {
                    if (characterData["cults"][0]) {
                        let cults = "";
                        for (let i=0; i < characterData["cults"].length; i++) {
                            cults = cults + " * " + characterData["cults"][i] + "\r\n";
                        }
                        newAttrs['cult_notes'] = cults;
                    }
                }
            }

            if (characterData["cult_rank"]) {
                if (characterData["cult_rank"].toLowerCase() in cultRankMap) {
                    newAttrs['rank'] = cultRankMap[characterData["cult_rank"].toLowerCase()];
                }
            }

            if (characterData["notes"]) {
                newAttrs['sheet_notes'] = characterData["notes"];
            }

            /* Import Characteristics */
            if (debug) {
                console.log("Importing Characteristics");
            }
            characterData["stats"].forEach(stat => {
                const charKey = Object.keys(stat)[0];
                const char = charKey.toLowerCase();
                newAttrs[`${char}_base`] = stat[charKey];
                newAttrs[`${char}`] = stat[charKey];
            });

            if (debug) {
                console.log("Determining Import Sheet type");
            }
            /* Detect Sheet Character Type, Species, and name */
            /* Elementals have str and dex but no siz and con, so we determine spirit by str and dex only */
            if (newAttrs['str_base'] === 0 && newAttrs['dex_base'] === 0) {
                newAttrs['sheet_type'] = 'spirit';
                newAttrs['attribute_mode'] = 'spiritual';
                newAttrs['hit_location_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_low_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_high_roll'] = '@{none_hit_location_roll}';
            } else {
                newAttrs['sheet_type'] = 'creature';
                newAttrs['attribute_mode'] = 'physical';
                newAttrs['hit_location_roll'] = '@{creature_hit_location_roll}';
                newAttrs['hit_location_low_roll'] = '@{creature_hit_location_roll}';
                newAttrs['hit_location_high_roll'] = '@{creature_hit_location_roll}';
            }

            /* Import Attributes, most are calculated at the end */
            if (debug) {console.log("Importing attributes");}

            if (characterData["attributes"]["movement"]) {
                const moveInt = parseInt(characterData["attributes"]["movement"]);
                if (Number.isInteger(moveInt) && moveInt > 0) {
                    newAttrs['movement_rate_species'] = moveInt;
                    newAttrs['movement_rate'] = moveInt;
                } else {
                    newAttrs['custom_movement_enabled'] = '1';
                    newAttrs['custom_movement'] = characterData["attributes"]["movement"];
                }
            }

            if (characterData["attributes"]["strike_rank"] && characterData["attributes"]["strike_rank"].includes("-")) {
                /* if a penalty is present set the modifier for initiative later */
                const armorPenalty = parseInt(characterData["attributes"]["strike_rank"].split("-")[1].replace(')','')) || 0;
                newAttrs['armor_penalty'] = -armorPenalty;
            }

            /* Import Hit Locations */
            console.log("Importing Hit Locations");
            /* Import Hit Locations */
            if (newAttrs['simplified_combat_enabled'] === '1') {
                newAttrs['hit_locations'] = "simplified";
                const simpleHp = Math.ceil((newAttrs['con'] + newAttrs['con']) / 2);
                newAttrs['location1_hp_max'] = simpleHp;
                newAttrs['location1_hp'] = simpleHp;
                newAttrs['location1_hp_max_base_mod'] = 0;
                newAttrs['location1_hp_max_other'] = 0;
                let apTotal = 0;
                characterData["hit_locations"].forEach(location => {
                    let locationAP = location['ap'];
                    apTotal = apTotal + locationAP;
                });
                /* Get the average ap value as a rough conversion to simplified combat */
                newAttrs['location1_ap'] = Math.round(apTotal / characterData["hit_locations"].length);
                newAttrs['location1_ap_max'] = Math.round(apTotal / characterData["hit_locations"].length);
            } else {
                /* Determine number of hit locations and set custom form to proper amount */
                if (characterData["hit_locations"].length === 12) {
                    newAttrs['hit_locations'] = "custom";
                } else {
                    newAttrs['hit_locations'] = "custom" + characterData["hit_locations"].length;
                }

                /* Calc rootHp for import */
                const rootHp = calcRootHP(newAttrs);

                for (let i=0; i < characterData["hit_locations"].length; i++) {
                    let location = i + 1;

                    let table = characterData["hit_locations"][i]["range"].split("-");
                    newAttrs[`location${location}_table_start`] = parseInt(table[0]);
                    if (!table[1]) {
                        newAttrs[`location${location}_table_end`] = parseInt(table[0]);
                    } else {
                        newAttrs[`location${location}_table_end`] = parseInt(table[1]);
                    }

                    newAttrs[`location${location}_name`] = characterData["hit_locations"][i]["name"];

                    const locationAP = characterData["hit_locations"][i]['ap'];
                    newAttrs[`location${location}_ap`] = locationAP;
                    newAttrs[`location${location}_ap_max`] = locationAP;
                    const newLocHP = parseInt(characterData["hit_locations"][i]["hp"]);
                    newAttrs[`location${location}_hp_max_base_mod`] = newLocHP - rootHp;
                    newAttrs[`location${location}_hp_max_other`] = 0;
                    newAttrs[`location${location}_hp_max`] = newLocHP;
                    newAttrs[`location${location}_hp`] = newLocHP;
                }
            }

            /* Import Combat Styles and Weapons */
            console.log("Importing Combat Styles and Weapons");
            if (characterData["combat_styles"]) {
                let weaponButtons = "";
                characterData["combat_styles"].forEach(combat_style => {
                    const combatstyleid = generateRowID();
                    const base_combatstyle = newAttrs['str'] + newAttrs['dex'];
                    newAttrs["repeating_combatstyle_" + combatstyleid + "_id"] = `repeating_combatstyle_${combatstyleid}`;
                    newAttrs["repeating_combatstyle_" + combatstyleid + "_name"] = combat_style["name"];
                    newAttrs["repeating_combatstyle_" + combatstyleid + "_other"] = combat_style["value"] - base_combatstyle;
                    newAttrs["repeating_combatstyle_" + combatstyleid + "_total"] = combat_style["value"]
                    newAttrs["repeating_combatstyle_" + combatstyleid + "_details"] = 0;

                    combat_style["weapons"].forEach(weapon => {
                        const weaponid = generateRowID();

                        if (weapon["type"] === "ranged") {
                            newAttrs["repeating_rangedweapon_" + weaponid + "_id"] = `repeating_rangedweapon_${weaponid}`;
                            newAttrs["repeating_rangedweapon_" + weaponid + "_name"] = weapon["name"];
                            newAttrs["repeating_rangedweapon_" + weaponid + "_force"] = weapon["size"];
                            newAttrs["repeating_rangedweapon_" + weaponid + "_impale_size"] = weapon["size"];
                            newAttrs["repeating_rangedweapon_" + weaponid + "_range"] = weapon["range"];
                            if (weapon["add_damage_modifier"] === true) {
                                newAttrs["repeating_rangedweapon_" + weaponid + "_damage_mod_toggle"] = "@{damage_mod}";
                            } else {
                                newAttrs["repeating_rangedweapon_" + weaponid + "_damage_mod_toggle"] = 0;
                            }
                            newAttrs["repeating_rangedweapon_" + weaponid + "_damage"] = weapon["damage"];
                            newAttrs["repeating_rangedweapon_" + weaponid + "_ap"] = weapon["ap"];
                            newAttrs["repeating_rangedweapon_" + weaponid + "_hp"] = weapon["hp"];
                            newAttrs["repeating_rangedweapon_" + weaponid + "_hp_max"] = weapon["hp"];
                            newAttrs["repeating_rangedweapon_" + weaponid + "_notes"] = weapon["effects"];
                            // Must set favored as string
                            newAttrs["repeating_rangedweapon_" + weaponid + "_favored"] = '1';
                            if(newAttrs['type'] !== 'character') {
                                newAttrs["repeating_rangedweapon_" + weaponid + "_details"] = 0;
                            }
                            weaponButtons = weaponButtons + ` [${weapon["name"]}](~@{character_id}|repeating_rangedweapon_${weaponid}_damage)`;
                        } else {
                            newAttrs["repeating_meleeweapon_" + weaponid + "_id"] = `repeating_meleeweapon_${weaponid}`;
                            newAttrs["repeating_meleeweapon_" + weaponid + "_name"] = weapon["name"];
                            newAttrs["repeating_meleeweapon_" + weaponid + "_size"] = weapon["size"];
                            newAttrs["repeating_meleeweapon_" + weaponid + "_reach"] = weapon["reach"];
                            if (weapon["add_damage_modifier"] === true) {
                                newAttrs["repeating_meleeweapon_" + weaponid + "_damage_mod_toggle"] = "@{damage_mod}";
                            } else {
                                newAttrs["repeating_meleeweapon_" + weaponid + "_damage_mod_toggle"] = 0;
                            }
                            newAttrs["repeating_meleeweapon_" + weaponid + "_damage"] = weapon["damage"];
                            newAttrs["repeating_meleeweapon_" + weaponid + "_ap"] = weapon["ap"];
                            newAttrs["repeating_meleeweapon_" + weaponid + "_hp"] = weapon["hp"];
                            newAttrs["repeating_meleeweapon_" + weaponid + "_hp_max"] = weapon["hp"];
                            newAttrs["repeating_meleeweapon_" + weaponid + "_notes"] = weapon["effects"];
                            // Must set favored as string
                            newAttrs["repeating_meleeweapon_" + weaponid + "_favored"] = '1';
                            if(newAttrs['type'] !== 'character') {
                                newAttrs["repeating_meleeweapon_" + weaponid + "_details"] = 0;
                            }
                            weaponButtons = weaponButtons + ` [${weapon["name"]}](~@{character_id}|repeating_meleeweapon_${weaponid}_damage)`;
                        }
                    });
                });
                newAttrs['weapon_buttons'] = weaponButtons;
            }

            console.log("Importing skills");
            /* Import Skills */

            /* Collect standard skills list for the setting */
            let settingStdSkills;
            if (campaginSettingDefaults[v['setting_option']] && campaginSettingDefaults[v['setting_option']]['standard_skills']) {
                settingStdSkills = campaginSettingDefaults[v['setting_option']]['standard_skills'];
            } else {
                settingStdSkills = campaginSettingDefaults['default']['standard_skills'];
            }
            /* Set all standard skills to not possessed by default */
            settingStdSkills.forEach(skillid => {
                newAttrs[`${skillid}_possessed`] = "0";
            });

            let magicSkillIds = {};
            if (characterData["skills"]) {
                characterData["skills"].forEach(skill => {
                    const skillKey = Object.keys(skill)[0];
                    const skillValue = skill[skillKey];
                    const skillSearchableKey = skillKey.replace(/ /g,"_").toLowerCase();

                    /* See if this is a standard skill per the setting */
                    if (settingStdSkills.includes(skillSearchableKey)) {
                        if (debug) {console.log(`Importing ${skillSearchableKey} as standard skill`)};
                        const char1 = newAttrs[stdSkillChars[skillSearchableKey][0]];
                        const char2 = newAttrs[stdSkillChars[skillSearchableKey][1]];
                        newAttrs[`${skillSearchableKey}_other`] = skillValue - char1 - char2;
                        newAttrs[`${skillSearchableKey}`] = skillValue;
                        newAttrs[`${skillSearchableKey}_possessed`] = "1";
                    } else if (allNonSpecialtyProSkillIds.includes(skillSearchableKey)) {
                        /* Import known professional skills as such */
                        const skillid = generateRowID();
                        const char1name = nonSpecialtyProSkillChars[skillSearchableKey][0];
                        const char1 = newAttrs[char1name];
                        const char2name = nonSpecialtyProSkillChars[skillSearchableKey][1];
                        const char2 = newAttrs[char2name];

                        if (megMagicSkillIds.includes(skillSearchableKey)) {
                            magicSkillIds[skillSearchableKey] = {
                                id: `repeating_professionalskill_${skillid}`,
                                name: skillKey,
                                value: skillValue
                            };
                        }

                        newAttrs[`repeating_professionalskill_${skillid}_id`] = `repeating_professionalskill_${skillid}`;
                        newAttrs[`repeating_professionalskill_${skillid}_name`] = skillKey;
                        newAttrs[`repeating_professionalskill_${skillid}_char1`] = `@{${char1name}}`;
                        newAttrs[`repeating_professionalskill_${skillid}_char2`] = `@{${char2name}}`;
                        newAttrs[`repeating_professionalskill_${skillid}_other`] = skillValue - char1 - char2;
                        newAttrs[`repeating_professionalskill_${skillid}_total`] = skillValue;
                    } else if (skillSearchableKey.startsWith('passion')) {
                        const skillid = generateRowID();
                        newAttrs[`repeating_passion_${skillid}_id`] =`repeating_passion_${skillid}`;
                        newAttrs[`repeating_passion_${skillid}_name`] = skillKey;
                        newAttrs[`repeating_passion_${skillid}_total`] = skillValue;
                    } else if (skillSearchableKey.startsWith('dependency')) {
                        const skillid = generateRowID();
                        newAttrs[`repeating_dependency_${skillid}_id`] = `repeating_dependency_${skillid}`;
                        newAttrs[`repeating_dependency_${skillid}_name`] = skillKey;
                        newAttrs[`repeating_dependency_${skillid}_total`] = skillValue;
                    } else if (skillSearchableKey.startsWith('peculiarity')) {
                        const skillid = generateRowID();
                        newAttrs[`repeating_peculiarity_${skillid}_id`] = `repeating_peculiarity_${skillid}`;
                        newAttrs[`repeating_peculiarity_${skillid}_name`] = skillKey;
                        newAttrs[`repeating_peculiarity_${skillid}_total`] = skillValue;
                    } else {
                        const skillid = generateRowID();

                        // Try to identify it as a known specialty skill, else treat as unknown skill
                        let knownSpecialtySkill = false;
                        allSpecialtyProSkillIds.find(specialtyId => {
                            if (skillSearchableKey.startsWith(specialtyId)) {
                                const char1name = specialtyProSkillChars[specialtyId][0];
                                const char1 = newAttrs[char1name];
                                const char2name = specialtyProSkillChars[specialtyId][1];
                                const char2 = newAttrs[char2name];

                                if (megMagicSkillIds.includes(skillSearchableKey)) {
                                    magicSkillIds[skillSearchableKey] = {
                                        id: `repeating_professionalskill_${skillid}`,
                                        name: skillKey,
                                        value: skillValue
                                    };
                                }

                                newAttrs[`repeating_professionalskill_${skillid}_id`] = `repeating_professionalskill_${skillid}`;
                                newAttrs[`repeating_professionalskill_${skillid}_name`] = skillKey;
                                newAttrs[`repeating_professionalskill_${skillid}_char1`] = `@{${char1name}}`;
                                newAttrs[`repeating_professionalskill_${skillid}_char2`] = `@{${char2name}}`;
                                newAttrs[`repeating_professionalskill_${skillid}_other`] = skillValue - char1 - char2;
                                newAttrs[`repeating_professionalskill_${skillid}_total`] = skillValue;

                                knownSpecialtySkill = true;
                                return true;
                            }
                            return false;
                        });

                        if(!knownSpecialtySkill) {
                            newAttrs[`repeating_passion_${skillid}_id`] = `repeating_passion_${skillid}`;
                            newAttrs[`repeating_passion_${skillid}_name`] = skillKey;
                            newAttrs[`repeating_passion_${skillid}_total`] = skillValue;
                        }
                    }
                });
            }

            /* Set default social skills */
            newAttrs['social_offense_name'] = getTranslationByKey('influence');
            newAttrs['social_offense_id'] = 'influence';
            newAttrs['social_offense_notes'] = '';
            if (newAttrs['influence']) {
                newAttrs['social_offense_total'] = newAttrs['influence'];
            } else {
                newAttrs['social_offense_total'] = newAttrs['cha'] * 2;
            }

            newAttrs['social_defense_name'] = getTranslationByKey('deceit');
            newAttrs['social_defense_id'] = 'deceit';
            newAttrs['social_defense_notes'] = '';
            if (newAttrs['deceit']) {
                newAttrs['social_defense_total'] = newAttrs['deceit'];
            } else {
                newAttrs['social_defense_total'] = newAttrs['cha'] + newAttrs['int'];
            }

            /* Set default spirit combat skill */
            if (newAttrs['sheet_type'] === 'spirit') {
                /* Make sure a willpower value exists for confidence calculations */
                if (!newAttrs['willpower']) {
                    newAttrs['willpower'] = newAttrs['pow'] + newAttrs['pow'] + 50;
                    newAttrs['willpower_other'] = 50;
                    newAttrs['willpower_possessed'] = "1";
                }
                /* Make sure a spectral_combat value exists */
                if (!newAttrs['spectral_combat']) {
                    newAttrs['spectral_combat'] = newAttrs['pow'] + newAttrs['cha'] + 50;
                    newAttrs['spectral_combat_possessed'] = "1";
                }
                /* If spirit has binding skill select higher of the two as spirit combat skill */
                if (magicSkillIds['binding'] && magicSkillIds['binding']['value'] >= newAttrs['spectral_combat']) {
                    newAttrs['spirit_combat_skill_id'] = magicSkillIds['binding']['id'];
                    newAttrs['spirit_combat_skill_name'] = magicSkillIds['binding']['name'];
                    newAttrs['spirit_combat_skill_total'] = magicSkillIds['binding']['value'];
                } else {
                    newAttrs['spirit_combat_skill_id'] = 'spectral_combat';
                    newAttrs['spirit_combat_skill_name'] = getTranslationByKey("spectral_combat");
                    newAttrs['spirit_combat_skill_total'] = newAttrs['spectral_combat'];
                }
                newAttrs['spirit_combat_skill_notes'] = '';
            } else {
                /* Make sure a willpower value exists */
                if (!newAttrs['willpower']) {
                    newAttrs['willpower'] = newAttrs['pow'] + newAttrs['pow'];
                    newAttrs['willpower_other'] = 0;
                    newAttrs['willpower_possessed'] = "1";
                }
                /* If spirit has binding skill select higher of the two as spirit combat skill */
                if (magicSkillIds['binding'] && magicSkillIds['binding']['value'] >= (Math.ceil(newAttrs['willpower']/2))) {
                    newAttrs['spirit_combat_skill_id'] = magicSkillIds['binding']['id'];
                    newAttrs['spirit_combat_skill_name'] = magicSkillIds['binding']['name'];
                    newAttrs['spirit_combat_skill_total'] = magicSkillIds['binding']['value'];
                } else {
                    newAttrs['spirit_combat_skill_id'] = 'willpower';
                    newAttrs['spirit_combat_skill_name'] = getTranslationByKey("willpower");
                    newAttrs['spirit_combat_skill_total'] = newAttrs['willpower'];
                }
                newAttrs['spirit_combat_skill_notes'] = '';
            }

            console.log("Importing Folk Magic");
            /* Import Folk Magic */
            const folkMagicTraditionId = 'repeating_tradition_' + generateRowID();
            if (magicSkillIds.hasOwnProperty('folk_magic')) {
                newAttrs[`${folkMagicTraditionId}_name`] = getTranslationByKey('folk_magic');
                if (characterData["cult_rank"].toLowerCase() in cultRankMap) {
                    newAttrs[`${folkMagicTraditionId}_tradition_rank`] = cultRankMap[characterData["cult_rank"].toLowerCase()];
                }
                newAttrs[`${folkMagicTraditionId}_id`] = folkMagicTraditionId;
                newAttrs[`${folkMagicTraditionId}_skill1_id`] = magicSkillIds['folk_magic']['id'];
                newAttrs[`${folkMagicTraditionId}_skill1_name`] = `@{${magicSkillIds['folk_magic']['id']}_name}`;
                newAttrs[`${folkMagicTraditionId}_skill1_total`] = `@{${magicSkillIds['folk_magic']['id']}_total}`;
                newAttrs[`${folkMagicTraditionId}_skill1_notes`] = `@{${magicSkillIds['folk_magic']['id']}_notes}`;
                newAttrs[`${folkMagicTraditionId}_details`] = 0;
            }

            if (typeof characterData["folk_spells"] !== 'undefined') {
                characterData["folk_spells"].forEach(spellName => {
                    const spellId = 'repeating_ability_' + generateRowID();
                    newAttrs[`${spellId}_id`] = spellId;
                    newAttrs[`${spellId}_name`] = spellName;
                    newAttrs[`${spellId}_type`] = 'folk_magic';
                    newAttrs[`${spellId}_tradition_id`] = folkMagicTraditionId;
                    newAttrs[`${spellId}_details`] = 0;
                });
            }

            console.log("Importing Animism");
            /* Import Animism */
            const animismTraditionId = 'repeating_tradition_' + generateRowID();
            if (magicSkillIds.hasOwnProperty('binding') && magicSkillIds.hasOwnProperty('trance')) {
                newAttrs[`${animismTraditionId}_name`] = getTranslationByKey('animism');
                if (characterData["cult_rank"].toLowerCase() in cultRankMap) {
                    newAttrs[`${animismTraditionId}_tradition_rank`] = cultRankMap[characterData["cult_rank"].toLowerCase()];
                }
                newAttrs[`${animismTraditionId}_id`] = animismTraditionId;

                newAttrs[`${animismTraditionId}_skill1_id`] = magicSkillIds['binding']['id'];
                newAttrs[`${animismTraditionId}_skill1_name`] = `@{${magicSkillIds['binding']['id']}_name}`;
                newAttrs[`${animismTraditionId}_skill1_total`] = `@{${magicSkillIds['binding']['id']}_total}`;
                newAttrs[`${animismTraditionId}_skill1_notes`] = `@{${magicSkillIds['binding']['id']}_notes}`;

                newAttrs[`${animismTraditionId}_skill2_id`] = magicSkillIds['trance']['id'];
                newAttrs[`${animismTraditionId}_skill2_name`] = `@{${magicSkillIds['trance']['id']}_name}`;
                newAttrs[`${animismTraditionId}_skill2_total`] =`@{${magicSkillIds['trance']['id']}_total}`;
                newAttrs[`${animismTraditionId}_skill2_notes`] = `@{${magicSkillIds['trance']['id']}_notes}`;
                newAttrs[`${animismTraditionId}_details`] = 0;

            }

            /* Import Spirits */
            if (characterData["spirits"]) {
                characterData["spirits"].forEach(spirit => {
                    const spiritid = generateRowID();

                    newAttrs[`repeating_fetish_${spiritid}_name`] = spirit['name'];
                    newAttrs[`repeating_fetish_${spiritid}_details`] = "0";

                    for (let j=0; j < spirit["stats"].length; j++) {
                        const spiritstat = spirit["stats"][j];
                        const spiritstatKey = Object.keys(spiritstat)[0];
                        const spiritstatValue = spiritstat[spiritstatKey];

                        if ( spiritstatKey === "INT" ) {
                            newAttrs["repeating_fetish_" + spiritid + "_fetish_int"] = spiritstatValue;
                        } else if ( spiritstatKey === "INS" ) {
                            newAttrs["repeating_fetish_" + spiritid + "_fetish_int"] = spiritstatValue;
                        } else if ( spiritstatKey === "POW" ) {
                            newAttrs["repeating_fetish_" + spiritid + "_fetish_pow"] = spiritstatValue;
                        } else if ( spiritstatKey === "CHA" ) {
                            newAttrs["repeating_fetish_" + spiritid + "_fetish_cha"] = spiritstatValue;
                        }
                    }

                    //Import spirit attributes
                    if (spirit["attributes"]["magic_points"]) {
                        newAttrs["repeating_fetish_" + spiritid + "_fetish_magic_points"] = spirit["attributes"]["magic_points"];
                        newAttrs["repeating_fetish_" + spiritid + "_fetish_tenacity"] = spirit["attributes"]["magic_points"];
                    }

                    //Import spirit abilities
                    if (spirit["features"]) {
                        let spiritabilities = "";
                        for (j=0; j < spirit["features"].length; j++) {
                            spiritabilities = spiritabilities + " * " + spirit["features"][j] + "\r\n";
                        }
                        newAttrs["repeating_fetish_" + spiritid + "_fetish_spirit_abilities"] = spiritabilities;
                    }

                    //Import spirit skills
                    if (spirit["skills"]) {
                        let spirit_other_skills = "";
                        for (let j=0; j < spirit["skills"].length; j++) {
                            const spiritskill = spirit["skills"][j];
                            const spiritskillKey = Object.keys(spiritskill)[0];
                            const spiritskillValue = spiritskill[spiritskillKey];

                            if (spiritskillKey.toLowerCase() === "spectral combat" || spiritskillKey.toLowerCase() === "willpower") {
                                // Do nothing these are auto calculated by the spirit characteristics
                            } else if (spiritskillKey.toLowerCase() === "folk magic") {
                                newAttrs["repeating_fetish_" + spiritid + "_fetish_folk_magic"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() === "shaping") {
                                newAttrs["repeating_fetish_" + spiritid + "_fetish_shaping"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() === "invocation") {
                                newAttrs["repeating_fetish_" + spiritid + "_fetish_invocation"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() === "exhort") {
                                newAttrs["repeating_fetish_" + spiritid + "_fetish_exhort"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() === "devotion") {
                                newAttrs["repeating_fetish_" + spiritid + "_fetish_devotion"] = spiritskillValue;
                            } else {
                                spirit_other_skills = spirit_other_skills + spiritskillKey + " " + spiritskillValue + "%, "
                            }
                        }
                        newAttrs["repeating_fetish_" + spiritid + "_fetish_other_skills"] = spirit_other_skills;
                    }

                    //Import spirit spells
                    let spiritspells = "";
                    if (spirit["folk_spells"]) {
                        let spirit_folk_spells = "";
                        for (let j=0; j < spirit["folk_spells"].length; j++) {
                            spirit_folk_spells = spirit_folk_spells + spirit["folk_spells"][j] + ", ";
                        }
                        if (spirit_folk_spells !== "") {
                            spiritspells = spiritspells + "Folk Magic: " + spirit_folk_spells + "\r\n";
                        }
                    }

                    if (spirit["sorcery_spells"]) {
                        let spirit_sorcery_spells = "";
                        for (let j=0; j < spirit["sorcery_spells"].length; j++) {
                            spirit_sorcery_spells = spirit_sorcery_spells + spirit["sorcery_spells"][j] + ", ";
                        }
                        if (spirit_sorcery_spells !== "") {
                            spiritspells = spiritspells + "Sorcery: " + spirit_sorcery_spells + "\r\n";
                        }
                    }

                    if (spirit["theism_spells"]) {
                        let spirit_theism_spells = "";
                        for (let j=0; j < spirit["theism_spells"].length; j++) {
                            spirit_theism_spells = spirit_theism_spells + spirit["theism_spells"][j] + ", ";
                        }
                        if (spirit_theism_spells !== "") {
                            spiritspells = spiritspells + "Theism: " + spirit_theism_spells + "\r\n";
                        }
                    }
                    newAttrs["repeating_fetish_" + spiritid + "_fetish_powers"] = spiritspells;
                });
            }

            console.log("Importing Mysticism");
            /* Import Mysticism */
            const mysticismTraditionId = 'repeating_tradition_' + generateRowID();
            if (magicSkillIds.hasOwnProperty('meditation') && magicSkillIds.hasOwnProperty('path')) {
                newAttrs[`${mysticismTraditionId}_name`] = getTranslationByKey('mysticism');
                if (characterData["cult_rank"].toLowerCase() in cultRankMap) {
                    newAttrs[`${mysticismTraditionId}_tradition_rank`] = cultRankMap[characterData["cult_rank"].toLowerCase()];
                }
                newAttrs[`${mysticismTraditionId}_id`] = mysticismTraditionId;
                newAttrs[`${mysticismTraditionId}_skill1_id`] = magicSkillIds['path']['id'];
                newAttrs[`${mysticismTraditionId}_skill1_name`] = `@{${magicSkillIds['path']['id']}_name}`;
                newAttrs[`${mysticismTraditionId}_skill1_total`] = `@{${magicSkillIds['path']['id']}_total}`;
                newAttrs[`${mysticismTraditionId}_skill1_notes`] = `@{${magicSkillIds['path']['id']}_notes}`;

                newAttrs[`${mysticismTraditionId}_skill2_id`] = magicSkillIds['meditation']['id'];
                newAttrs[`${mysticismTraditionId}_skill2_name`] = `@{${magicSkillIds['meditation']['id']}_name}`;
                newAttrs[`${mysticismTraditionId}_skill2_total`] =`@{${magicSkillIds['meditation']['id']}_total}`;
                newAttrs[`${mysticismTraditionId}_skill2_notes`] = `@{${magicSkillIds['meditation']['id']}_notes}`;

                newAttrs[`${mysticismTraditionId}_details`] = 0;
            }


            if (typeof characterData["mysticism_spells"] !== 'undefined') {
                characterData["mysticism_spells"].forEach(talentName => {
                    const talentId = 'repeating_ability_' + generateRowID();
                    newAttrs[`${talentId}_id`] = talentId;
                    newAttrs[`${talentId}_name`] = talentName;
                    newAttrs[`${talentId}_type`] = 'mysticism';
                    newAttrs[`${talentId}_tradition_id`] = mysticismTraditionId;
                    newAttrs[`${talentId}_details`] = 0;
                    newAttrs[`${talentId}_advanced_traits`] = '^{intensity}: @{dynamic_intensity}';
                });
            }

            console.log("Importing Sorcery");
            /* Import Sorcery */
            const sorceryTraditionId = 'repeating_tradition_' + generateRowID();
            if (magicSkillIds.hasOwnProperty('invocation') && magicSkillIds.hasOwnProperty('shaping')) {
                newAttrs[`${sorceryTraditionId}_name`] = getTranslationByKey('sorcery');
                newAttrs[`${sorceryTraditionId}_type`] = "sorcery";
                if (characterData["cult_rank"].toLowerCase() in cultRankMap) {
                    newAttrs[`${sorceryTraditionId}_tradition_rank`] = cultRankMap[characterData["cult_rank"].toLowerCase()];
                }
                newAttrs[`${sorceryTraditionId}_id`] = sorceryTraditionId;

                newAttrs[`${sorceryTraditionId}_skill1_id`] = magicSkillIds['invocation']['id'];
                newAttrs[`${sorceryTraditionId}_skill1_name`] = `@{${magicSkillIds['invocation']['id']}_name}`;
                newAttrs[`${sorceryTraditionId}_skill1_total`] = `@{${magicSkillIds['invocation']['id']}_total}`;
                newAttrs[`${sorceryTraditionId}_skill1_notes`] = `@{${magicSkillIds['invocation']['id']}_notes}`;

                newAttrs[`${sorceryTraditionId}_skill2_id`] = magicSkillIds['shaping']['id'];
                newAttrs[`${sorceryTraditionId}_skill2_name`] = `@{${magicSkillIds['shaping']['id']}_name}`;
                newAttrs[`${sorceryTraditionId}_skill2_total`] =`@{${magicSkillIds['shaping']['id']}_total}`;
                newAttrs[`${sorceryTraditionId}_skill2_notes`] = `@{${magicSkillIds['shaping']['id']}_notes}`;

                newAttrs[`${sorceryTraditionId}_details`] = 0;
            }

            if (typeof characterData["sorcery_spells"] !== 'undefined') {
                characterData["sorcery_spells"].forEach(spellName => {
                    const spellId = 'repeating_ability_' + generateRowID();
                    newAttrs[`${spellId}_id`] = spellId;
                    newAttrs[`${spellId}_name`] = spellName;
                    newAttrs[`${spellId}_type`] = 'sorcery';
                    newAttrs[`${spellId}_tradition_id`] = sorceryTraditionId;
                    newAttrs[`${spellId}_advanced_traits`] = v['shaping_traits'];
                    newAttrs[`${spellId}_details`] = 0;
                });
            }

            console.log("Importing Theism");
            /* Import Theism */
            const theismTraditionId = 'repeating_tradition_' + generateRowID();
            if (magicSkillIds.hasOwnProperty('exhort') && magicSkillIds.hasOwnProperty('devotion')) {
                newAttrs[`${theismTraditionId}_name`] = getTranslationByKey('theism');
                newAttrs[`${theismTraditionId}_type`] = "theism";
                if (characterData["cult_rank"].toLowerCase() in cultRankMap) {
                    newAttrs[`${theismTraditionId}_tradition_rank`] = cultRankMap[characterData["cult_rank"].toLowerCase()];
                }
                if (characterData['attributes']['devotional_pool']) {
                    newAttrs[`${theismTraditionId}_pool`] = characterData['attributes']['devotional_pool'];
                    if (characterData['attributes']['devotional_pool'] >= newAttrs['pow']) {
                        newAttrs[`${theismTraditionId}_pool_limit`] = '@{pow}';
                    } else if (characterData['attributes']['devotional_pool'] >= Math.ceil(newAttrs['pow']*.75)) {
                        newAttrs[`${theismTraditionId}_pool_limit`] = 'ceil(@{pow}*.75)';
                    } else if (characterData['attributes']['devotional_pool'] >= Math.ceil(newAttrs['pow']*.5)) {
                        newAttrs[`${theismTraditionId}_pool_limit`] = 'ceil(@{pow}*.5))';
                    } else if (characterData['attributes']['devotional_pool'] >= Math.ceil(newAttrs['pow']*.25)) {
                        newAttrs[`${theismTraditionId}_pool_limit`] = 'ceil(@{pow}*.25)';
                    }
                }
                newAttrs[`${theismTraditionId}_id`] = theismTraditionId;

                newAttrs[`${theismTraditionId}_skill1_id`] = magicSkillIds['exhort']['id'];
                newAttrs[`${theismTraditionId}_skill1_name`] = `@{${magicSkillIds['exhort']['id']}_name}`;
                newAttrs[`${theismTraditionId}_skill1_total`] = `@{${magicSkillIds['exhort']['id']}_total}`;
                newAttrs[`${theismTraditionId}_skill1_notes`] = `@{${magicSkillIds['exhort']['id']}_notes}`;

                newAttrs[`${theismTraditionId}_skill2_id`] = magicSkillIds['devotion']['id'];
                newAttrs[`${theismTraditionId}_skill2_name`] = `@{${magicSkillIds['devotion']['id']}_name}`;
                newAttrs[`${theismTraditionId}_skill2_total`] =`@{${magicSkillIds['devotion']['id']}_total}`;
                newAttrs[`${theismTraditionId}_skill2_notes`] = `@{${magicSkillIds['devotion']['id']}_notes}`;

                newAttrs[`${theismTraditionId}_details`] = 0;
            }

            if (typeof characterData["theism_spells"] !== 'undefined') {
                characterData["theism_spells"].forEach(miracleName => {
                    const miracleId = 'repeating_ability_' + generateRowID();
                    newAttrs[`${miracleId}_id`] = miracleId;
                    newAttrs[`${miracleId}_name`] = miracleName;
                    newAttrs[`${miracleId}_type`] = 'theism';
                    newAttrs[`${miracleId}_tradition_id`] = theismTraditionId;
                    newAttrs[`${miracleId}_details`] = 0;
                });
            }

            /* Import Features */
            /* Example template to work from https://mythras.skoll.xyz/generate_enemies_json/?id=6206&amount=1 */
            let notes = "";
            if (characterData['features']) {
                characterData['features'].forEach(feature => {
                    const featureArray = feature.split(/:(.*)/s);
                    const featureType = featureArray[0];
                    const featureTypeLower = featureType.toLowerCase();
                    if (featureTypeLower.includes("ability") || featureTypeLower.includes("abilities") || featureTypeLower.includes("spirit") ||
                        featureTypeLower.includes("poison") || featureTypeLower.includes("venom") || featureTypeLower.includes("breath weapon") ||
                        featureTypeLower.includes("chaotic feature") || featureTypeLower.includes("disease") || featureTypeLower.includes("curse")) {
                        const featureId = 'repeating_ability_' + generateRowID();
                        newAttrs[`${featureId}_id`] = featureId;
                        newAttrs[`${featureId}_type`] = "ability";
                        if (newAttrs["sheet_type"] === 'spirit') {
                            newAttrs[`${featureId}_advanced_traits`] = "^{spirit_intensity}: @{spirit_intensity}";
                        }
                        /* Try to find a name */
                        if (featureArray[1].includes('***')) {
                            const regex = /.*\*\*\*(.*)\*\*\*.*/;
                            let potentailName = regex.exec(featureArray[1]);
                            if (potentailName) {
                                newAttrs[`${featureId}_name`] = potentailName[1];
                            } else {
                                newAttrs[`${featureId}_name`] = featureType;
                            }
                        } else if (featureArray[1].includes(' - ')) {
                            newAttrs[`${featureId}_name`] = featureArray[1].split(' - ')[0];
                        } else if (featureArray[1].includes(':')) {
                            newAttrs[`${featureId}_name`] = featureArray[1].split(':')[0];
                        } else {
                            newAttrs[`${featureId}_name`] = featureType;
                        }
                        if (featureArray[1].length > 80) {
                            newAttrs[`${featureId}_summary`] = featureArray[1].slice(0, 79) + "...";
                        } else {
                            newAttrs[`${featureId}_summary`] = featureArray[1];
                        }
                        newAttrs[`${featureId}_description`] = featureArray[1];
                        newAttrs[`${featureId}_details`] = "0";
                    } else if (featureTypeLower.includes("gift")) {
                        const featureId = 'repeating_ability_' + generateRowID();
                        newAttrs[`${featureId}_id`] = featureId;
                        newAttrs[`${featureId}_type`] = "gift";

                        /* Try to find a name */
                        if (featureArray[1].includes('***')) {
                            const regex = /.*\*\*\*(.*)\*\*\*.*/;
                            let potentailName = regex.exec(featureArray[1]);
                            if (potentailName) {
                                newAttrs[`${featureId}_name`] = potentailName[1];
                            } else {
                                newAttrs[`${featureId}_name`] = featureType;
                            }
                        } else if (featureArray[1].includes(' - ')) {
                            newAttrs[`${featureId}_name`] = featureArray[1].split(' - ')[0];
                        } else if (featureArray[1].includes(':')) {
                            newAttrs[`${featureId}_name`] = featureArray[1].split(':')[0];
                        } else {
                            newAttrs[`${featureId}_name`] = featureType;
                        }
                        if (featureArray[1].length > 80) {
                            newAttrs[`${featureId}_summary`] = featureArray[1].slice(0, 79) + "...";
                        } else {
                            newAttrs[`${featureId}_summary`] = featureArray[1];
                        }
                        newAttrs[`${featureId}_description`] = featureArray[1];
                        newAttrs[`${featureId}_details`] = "0";
                    } else {
                        notes = notes + feature + "\r\n";
                    }
                });
            }

            /* Set notes */
            if (characterData['notes']) {
                newAttrs['sheet_notes'] = notes + characterData['notes'];
            } else {
                newAttrs['sheet_notes'] = notes;
            }


            /* Clear the import data */
            newAttrs['import_json_data'] = '';
            newAttrs['import_errors'] = '';

            if (debug) {console.log(newAttrs);}
            setAttrs({
                ...newAttrs,
                ...calcActionPoints(newAttrs),
                ...calcConfidence(newAttrs),
                ...calcDamageMod(newAttrs),
                ...calcExpMod(newAttrs),
                ...calcHealingRate(newAttrs),
                ...calcInitiativeBonus(newAttrs),
                ...calcLuckPoints(newAttrs),
                ...calcMagicPoints(newAttrs),
                ...calcSocialDamage(newAttrs),
                ...calcSpiritDamage(newAttrs),
                ...calcSpiritIntensity(newAttrs),
                ...calcTenacity(newAttrs),
                ...calcComposure(newAttrs),
                ...calcIntegrity(newAttrs),
                ...calcResolve(newAttrs)
            });
        } catch (error) {
            setAttrs({import_errors: error});
        }
    });
});