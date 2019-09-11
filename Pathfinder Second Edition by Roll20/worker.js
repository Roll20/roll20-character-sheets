
    /* === MODULE BEGINS === */

    var modPf2 = (function () {

        /* === GLOBAL VARIABLES === */
        var global_sheet_init_done = 0;
        // Attribute names by category
        const global_attributes_by_category = {
            "abilities": ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
            , "ability_modifiers": ['strength_modifier', 'strength_modifier_half', 'dexterity_modifier', 'constitution_modifier', 'intelligence_modifier', 'wisdom_modifier', 'charisma_modifier']
            , "setting_toggles": ['class_dc', 'armor_class', 'hitpoints', 'saving_throws', 'shield', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'perception', 'ancestry', 'notes', 'spell_attack', 'spell_dc', 'npc']
            , "repeating_toggles": ['repeating_conditions', 'repeating_resistances-immunities', 'repeating_senses', 'repeating_languages', 'repeating_melee-strikes', 'repeating_ranged-strikes','repeating_actions-activities','repeating_free-actions-reactions','repeating_feat-ancestry','repeating_feat-class','repeating_feat-general','repeating_feat-bonus', 'repeating_feat-skill', 'repeating_lore', 'repeating_cantrips', 'repeating_items-worn', 'repeating_items-readied', 'repeating_items-other', 'repeating_npc-items', 'repeating_npc-melee-strikes', 'repeating_npc-ranged-strikes',"repeating_spellinnate","repeating_spellfocus","repeating_cantrip","repeating_spell1","repeating_spell2","repeating_spell3","repeating_spell4","repeating_spell5","repeating_spell6","repeating_spell7","repeating_spell8","repeating_spell9","repeating_spell10", 'repeating_interaction-abilities']
            , "select_attributes": ["armor_class","saving_throws_fortitude","saving_throws_reflex","saving_throws_will","class_dc_key","perception","repeating_melee-strikes:weapon", "repeating_melee-strikes:damage","repeating_ranged-strikes:weapon","repeating_ranged-strikes:damage","acrobatics","arcana","athletics","crafting","deception","diplomacy","intimidation","repeating_lore:lore","medicine","nature","occultism","performance","religion","society","survival","thievery","spell_attack_key","spell_dc_key"]
            , "skills": ["acrobatics","arcana","athletics","crafting","deception","diplomacy","intimidation","medicine","nature","occultism","performance","religion","society","stealth","survival","thievery"]
            , "skills_fields": ["ability","ability_select","rank","proficiency","item","armor","temporary","name"]
            , "repeating_skills": ["lore"]
            , "saves": ["saving_throws_fortitude","saving_throws_reflex","saving_throws_will"]
            , "saves_fields": ["ability","ability_select","rank","proficiency","item","temporary"]
            , "ac": ["armor_class"]
            , "ac_fields": ["ability","ability_select","dc_rank","proficiency","item","temporary","dc_base","cap","shield_ac_bonus","shield_temporary"]
            , "hit_points": ["hit_points_ancestry","hit_points_class","hit_points_other","hit_points_item"]
            , "repeating_attacks": ["melee-strikes","ranged-strikes"]
            , "attacks_fields": ["weapon","weapon_ability_select","weapon_ability","weapon_proficiency","weapon_rank","weapon_item","weapon_temporary","weapon_traits","damage_dice","damage_dice_size","damage_ability_select","damage_ability","damage_b","damage_p","damage_s","damage_weapon_specialization","damage_temporary","damage_other","damage_effects"]
            , "perception": ["perception_ability_select","perception_ability","perception_rank","perception_proficiency","perception_item","perception_temporary"]
            , "class_dc": ["class_dc_key_ability_select","class_dc_key_ability","class_dc_proficiency","class_dc_rank","class_dc_item","class_dc_temporary"]
            , "spell_attack": ["spell_attack_key_ability_select","spell_attack_key_ability", "spell_attack_rank","spell_attack_proficiency","spell_attack_temporary"]
            , "spell_dc": ["spell_dc_key_ability_select","spell_dc_key_ability", "spell_dc_rank","spell_dc_proficiency","spell_dc_temporary"]
            , "magic_tradition": ["arcane","primal","occult","divine"]
            , "magic_tradition_fields": ["rank","proficiency"]
            , "repeating_spells": ["cantrip","spell1","spell2","spell3","spell4","spell5","spell6","spell7","spell8","spell9","spell10"]
            , "spells_fields": ["name","school","cast","traits","spelllevel","type","range","target","area","duration","frequency","uses","uses_max","attack_ability","attack_misc","damage_dice","damage_ability","damage_misc","damage_type","save_type","dc_misc","effect","description","attack_checkbox","damage_checkbox","save_checkbox","save_critical_success","save_success","save_failure","save_critical_failure"]
            , "repeating_bulks": ["worn","readied","other"]
            , "bulks_fields": ["quantity","bulk"]
            , "translatables": ["modifier","ability_modifier","bonus","roll_bonus","roll_damage_bonus","#_damage_dice","use"]
        };

        // Repeating sections and their attributes
        var global_repsecs = {
            "lore": {"section": "lore","attrs":global_attributes_by_category["skills_fields"].map(fld => `lore_${fld}`)}
        };

        // === UTILITIES
        // -- Constant attribute names
        const getAttrNames = function(categories) {
            let names = [];
            categories.forEach((category) => {
                if(category in global_attributes_by_category) {
                    names = names.concat(global_attributes_by_category[category]);
                }
            });
            return names;
        };
        // == Collecting repeating sections IDs
        const getRepSecIds = function(repsec_array,callback,repsec_agr) {
            // Returns an array of objects, aggregating ids and attributes for various repeating sections items
            // Parameters: Source (like global_repsecs["lore"]), callback function, Aggregate ([{section:string, ids:[ids], attrs:[attribute]}])
            // Courtesy of Scott C. :)
            let currsection = repsec_array.shift();
            if(currsection.section) {
                repsec_agr = repsec_agr || [];
                getSectionIDs(`repeating_${currsection.section}`, (itemsids)=>{
                    repsec_agr.push({
                        section:currsection.section,
                        ids:itemsids,
                        attrs:currsection.attrs
                    });
                    if (_.isEmpty(repsec_array)) {
                        callback(repsec_agr);
                    } else {
                        getRepSecIds(repsec_array,callback,repsec_agr);
                    }
                });
            } else {
                if (_.isEmpty(repsec_array)) {
                    callback(repsec_agr);
                } else {
                    getRepSecIds(repsec_array,callback,repsec_agr);
                }
            }
        };
        // == Collecting repeating sections attributes
        const getRepSecFields = function(repsec_agr, other_attrs = []) {
            // Returns an array of attribute names from several repeating sections and optional other standard attributes
            // Parameters: Repeating section Aggregate ([{section:string, ids:[ids], attrs:[attributes]}]), [other attributes names]
            let repsecfields = [];
            _.each(repsec_agr, (current_section)=>{
                // console.log("*** DEBUG getRepsecFields section: " + current_section.section);
                _.each(current_section.ids, (id)=>{
                    // console.log("*** DEBUG getRepsecFields ids: " + id);
                    _.each(current_section.attrs, (attr)=>{
                        // console.log("*** DEBUG getRepsecFields attrs: " + attr);
                        repsecfields.push(`repeating_${current_section.section}_${id}_${attr}`);
                    });
                });
            });
            return repsecfields.concat(other_attrs);
        };

        // === GENERAL CALCULATIONS
        // -- Sheet opening (completing global variables, versioning etc.)
        const sheetOpen = function(eventinfo) {
            // Initialization at first opening of sheet per the user game session
            if (global_sheet_init_done === 0) {
                let update = {};
                // completing global variables
                    // Attacks
                global_attributes_by_category["repeating_attacks"].forEach(category => {
                    global_repsecs[category] = {"section": category, "attrs": global_attributes_by_category["attacks_fields"]};
                });
                    // Spells
                global_attributes_by_category["repeating_spells"].forEach(category => {
                    global_repsecs[category] = {"section": category, "attrs": ["type"]};
                });
                    // Bulk
                global_attributes_by_category["repeating_bulks"].forEach(category => {
                    global_repsecs[category] = {"section": `items-${category}`, "attrs": global_attributes_by_category["bulks_fields"].map(attr => `${category}_${attr}`)};
                });
                // translatable texts for roll queries etc.
                global_attributes_by_category["translatables"].forEach(attr => {
                    update[`text_${attr}`] = (getTranslationByKey(attr) || "").toUpperCase();
                });
                // ending initialization
                setAttrs(update, {silent: true}, () => {
                    global_sheet_init_done = 1;
                    versioning();
                });
            } else {
                versioning();
            }
        };
        // -- Calculates proficiency according to rank, level and misc bonus
        const calcProficiency = function(rank, level, misc) {
            let trng = (parseInt(rank) || 0);
            if(trng > 0) {
                return (trng + (parseInt(level) || 0) + (parseInt(misc) || 0));
            } else {
                return (parseInt(misc) || 0);
            }
        };
        // -- Returns the ability modifier of an ability select, based on the value of the select and the fact that it needs updating or not. values requires ability modifiers, plus the xxx_ability_select and xxx_ability attributes.
        const getSelectAbilityModifier = function(attr, values, update_ability = false) {
            let modifier = 0;
            if(update_ability) {
                if(values[`${attr}_ability_select`] === "custom") {
                    modifier = (parseInt(values[`${attr}_ability`]) || 0);
                } else {
                    modifier = (parseInt(values[values[`${attr}_ability_select`].slice(2,-1)]) || 0);
                }
            } else {
                modifier = (parseInt(values[`${attr}_ability`]) || 0);
            }
            // console.log(`%c getSelectAbilityModifier ${attr} ${update_ability} ${modifier}`, "color:purple;font-size:14px;");
            return modifier;
        };
        // --- General update (to cascade ability or level/proficiency updates)
        const totalUpdate = function(callback = null) {
            let debug_start = new Date(); // Performance measurement
            // == Gathering all necessary repeating section IDs
            getRepSecIds(JSON.parse(JSON.stringify(Object.values(global_repsecs))), (repsec_agr) => {
                // == Gathering all necessary attributes
                let tmpfields = ["character_name","sheet_type","level","query_roll_damage_dice","cp","sp","gp","pp"];
                // --- Ability modifiers, Perception, Class DC, Hit Points
                tmpfields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["perception"],...global_attributes_by_category["class_dc"],...global_attributes_by_category["hit_points"],...global_attributes_by_category["spell_attack"],...global_attributes_by_category["spell_dc"]);
                // --- Skills, Saves, AC etc.
                ["skills","saves","ac"].forEach(category => {
                    global_attributes_by_category[category].forEach(attr => {
                        tmpfields.push(...global_attributes_by_category[`${category}_fields`].map(field => `${attr}_${field}`));
                    });
                });
                // --- Magic_traditions
                global_attributes_by_category["magic_tradition"].forEach(tradition => {
                    tmpfields.push(...global_attributes_by_category[`magic_tradition_fields`].map(field => `magic_tradition_${tradition}_${field}`));
                });
                // -- Add repeating section fields & remove duplicates
                let all_fields = getRepSecFields(repsec_agr,Array.from(new Set(tmpfields)));
                // == Gathering values
                getAttrs(all_fields, (values) => {
                    if((values["sheet_type"] || "").toLowerCase() === "npc") {
                        // Stop NPCs autocalculating
                        console.log(`%c Pathfinder Second Edition by Roll20: ${(values["character_name"] || "Unnamed character")} is an NPC. TotalUpdate was not fired.`, "color:purple;font-size:14px;");
                    } else {
                        // == Starting re-calculation
                        // console.table(values);
                        let big_update = {};
                        let update = {}; // Will be used to collect intermediate updates and replace values in values, when necessary

                        // == Skills
                        // Fixed skills
                        global_attributes_by_category["skills"].forEach(skill => {
                            _.extend(big_update, calcSkill(skill,values,true));
                        });
                        // Repeating skills
                        global_attributes_by_category["repeating_skills"].forEach(r_skill => {
                            repsec_agr.filter(current_section => current_section.section == r_skill)[0].ids.forEach(r_skill_id => {
                                _.extend(big_update, calcSkill(`repeating_${r_skill}_${r_skill_id}_${r_skill}`,values,true));
                            });
                        });

                        // == Saves
                        global_attributes_by_category["saves"].forEach(save => {
                            _.extend(big_update, calcSave(save,values,true));
                        });

                        // == Armor Class (AC)
                        global_attributes_by_category["ac"].forEach(ac => {
                            _.extend(big_update, calcArmorClass(ac,values,true));
                        });

                        // == Hit Points
                        _.extend(big_update, calcHitPoints(values,true));

                        // == Perception
                        _.extend(big_update, calcPerception(values,true));

                        // == Class DC
                        _.extend(big_update, calcClassDc(values,true));

                        // == Attacks
                        global_attributes_by_category["repeating_attacks"].forEach(r_attack => {
                            repsec_agr.filter(current_section => current_section.section == r_attack)[0].ids.forEach(r_attack_id => {
                                _.extend(big_update, calcAttack(`repeating_${r_attack}_${r_attack_id}`,values,true));
                            });
                        });

                        // == Spell Attack
                        update = calcSpellAttack(values,true);
                        _.extend(big_update, update);
                        _.extend(values, update);

                        // == Spell DC
                        update = calcSpellDc(values,true);
                        _.extend(big_update, update);
                        _.extend(values, update);

                        // === Spells: Magic Tradition
                        global_attributes_by_category["magic_tradition"].forEach(tradition => {
                            update = calcMagicTradition(values,tradition);
                            _.extend(big_update, update);
                            _.extend(values, update);
                        });

                        // == Spells
                        global_attributes_by_category["repeating_spells"].forEach(r_spell => {
                            repsec_agr.filter(current_section => current_section.section == r_spell)[0].ids.forEach(r_spell_id => {
                                _.extend(big_update, calcSpell(`repeating_${r_spell}_${r_spell_id}`,values));
                            });
                        });

                        // === Encumbrance / Bulk
                        update = {};
                        update["encumbered_base"] = 5 + (parseInt(values["strength_modifier"]) || 0);
                        update["maximum_base"] = 10 + (parseInt(values["strength_modifier"]) || 0);
                        _.extend(big_update, update);
                        _.extend(values, update);
                        _.extend(big_update, calcBulk(values,repsec_agr));

                        // == Updating (finally)
                        // console.table(big_update);
                        setAttrs(big_update, {silent: true}, ()=>{
                            console.log(`%c Pathfinder Second Edition by Roll20: ${(values["character_name"] || "Unnamed character")} updated (${new Date() - debug_start}ms)`, "color:purple;font-size:14px;");
                            if(callback) {
                                callback();
                            }
                        });
                    };
                });
            });
        };

        // === VERSIONING ===
        const versioning = function() {
            getAttrs(["version","version_character","sheet_type","character_name"], (values) => {
                let version_sheet = parseFloat(values["version"]) || 0.0;
                let version_character = parseFloat(values["version_character"]) || 0.0;
                if (version_character === version_sheet) {
                    console.log(`%c Pathfinder Second Edition by Roll20: ${(values["character_name"] || "Unnamed character")}, version ${version_character}`, "color:purple;font-size:14px;");
                } else if (version_character < 2.01) {
                    versioningUpdateTo2_01(values, () => {
                        setAttrs({"version_character": 2.01}, {silent: true}, () => {
                            versioning();
                        });
                    });
                } else {
                    setAttrs({"version_character": version_sheet}, {silent: true}, () => {
                        versioning();
                    });
                }
            });
        };
        const versioningUpdateTo2_01 = function(versioning_values, versioningDoneUpdating) {
            console.log(`%c Pathfinder Second Edition by Roll20: ${(versioning_values["character_name"] || "Unnamed character")} updating to version 2.01`, "color:purple;font-size:13px;font-style:italic;");
            if((versioning_values["sheet_type"] || "").toLowerCase() !== "npc") {
                // Global recalculation to update all spells DC
                totalUpdate(versioningDoneUpdating);
            } else {
                versioningDoneUpdating();
            }
        };

        // === ABILITIES
        const updateAbility = function(attr) {
            console.log(`%c Update ability ${attr}`, "color:purple;font-size:14px;");
            let fields = [`${attr}_score`,`${attr}_score_temporary`,`${attr}_modifier_temporary`];
            getAttrs(fields, (values) => {
                setAttrs(calcAbility(attr,values), {silent: true}, () => {
                    totalUpdate();
                });
            });
        };
        const calcAbility = function (attr, values) {
            let update = {}, mod = 0;
            update[`${attr}`] = (parseInt(values[`${attr}_score`]) || 0) + (parseInt(values[`${attr}_score_temporary`]) || 0);
            mod = (Math.floor((parseInt(update[`${attr}`], 10) - 10) / 2) || 0) + (parseInt(values[`${attr}_modifier_temporary`]) || 0);
            update[`${attr}_modifier`] = mod;
            if(attr === "strength") {
                if(mod < 0) {
                    update[`${attr}_modifier_half`] = mod;
                } else {
                    update[`${attr}_modifier_half`] = Math.floor(mod/2);
                }
            }
            return update;
        };

        // === SKILLS
        const updateSkill = function(id,attr,callback) {
            console.log(`%c Update skill ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["skills_fields"].map(field => `${id}_${field}`));
            getAttrs(fields, (values) => {
                let update_ability = true;
                if(attr.includes("ability")) {
                    update_ability = false;
                }
                setAttrs(calcSkill(id,values,update_ability), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcSkill = function(attr, values, update_ability = false) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                update[`${attr}_ability`] = getSelectAbilityModifier(attr, values, update_ability);
                update[`${attr}_proficiency`] = calcProficiency(values[`${attr}_rank`], values["level"]);
                update[attr] = (parseInt(update[`${attr}_ability`]) || 0)
                    + (parseInt(update[`${attr}_proficiency`]) || 0)
                    + (parseInt(values[`${attr}_item`]) || 0)
                    + (parseInt(values[`${attr}_armor`]) || 0)
                    + (parseInt(values[`${attr}_temporary`]) || 0);
            }
            return update;
        };

        // === SAVES
        const updateSave = function(id, attr, callback) {
            console.log(`%c Update save ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["saves_fields"].map(field => `${id}_${field}`));
            getAttrs(fields, (values) => {
                let update_ability = true;
                if(attr.includes("ability")) {
                    update_ability = false;
                }
                setAttrs(calcSave(id,values,update_ability), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcSave = function(attr, values, update_ability = false) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                update[`${attr}_ability`] = getSelectAbilityModifier(attr, values, update_ability);
                update[`${attr}_proficiency`] = calcProficiency(values[`${attr}_rank`], values["level"]);
                update[attr] = (parseInt(update[`${attr}_ability`]) || 0)
                    + (parseInt(update[`${attr}_proficiency`]) || 0)
                    + (parseInt(values[`${attr}_item`]) || 0)
                    + (parseInt(values[`${attr}_temporary`]) || 0);
            }
            return update;
        };

        // === ARMOR CLASS (AC)
        const updateArmorClass = function(id, attr, callback) {
            console.log(`%c Update AC ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["ac_fields"].map(field => `${id}_${field}`));
            getAttrs(fields, (values) => {
                let update_ability = true;
                if(attr.includes("ability")) {
                    update_ability = false;
                }
                setAttrs(calcArmorClass(id,values,update_ability), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcArmorClass = function(attr, values, update_ability = false) {
            let update = {}, ability = 0;
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                // Ability modifier
                ability = getSelectAbilityModifier(attr, values, update_ability);
                update[`${attr}_ability`] = ability;
                // Managing armor cap
                ability = Math.min(ability,parseInt((values[`${attr}_cap`] || "99")));
                // Proficieny
                update[`${attr}_proficiency`] = calcProficiency(values[`${attr}_dc_rank`], values["level"]);
                // AC
                update[attr] = (parseInt(values[`${attr}_dc_base`]) || 10)
                    + ability
                    + (parseInt(update[`${attr}_proficiency`]) || 0)
                    + (parseInt(values[`${attr}_item`]) || 0)
                    + (parseInt(values[`${attr}_temporary`]) || 0);
                // Shield
                update[`${attr}_shield`] = (parseInt(update[attr]) || 10)
                    + (parseInt(values[`${attr}_shield_ac_bonus`]) || 0)
                    + (parseInt(values[`${attr}_shield_temporary`]) || 0);
            }
            return update;
        };

        // === HIT POINTS (HP)
        const updateHitPoints = function(attr, callback) {
            console.log(`%c Update HP ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["hit_points"]);
            getAttrs(fields, (values) => {
                setAttrs(calcHitPoints(values), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcHitPoints = function(values) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                update["hit_points_max"] = (parseInt(values[`hit_points_ancestry`]) || 0)
                    + ((
                        (parseInt(values[`hit_points_class`]) || 0)
                        +
                        (parseInt(values[`constitution_modifier`]) || 0)
                    ) * (parseInt(values[`level`]) || 1))
                    + (parseInt(values[`hit_points_other`]) || 0)
                    + (parseInt(values[`hit_points_item`]) || 0);
            }
            return update;
        };

        // === ATTACKS
        const updateAttack = function(id, attr, callback) {
            console.log(`%c Update attack ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level","query_roll_damage_dice"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["attacks_fields"].map(field => `${id}_${field}`));
            getAttrs(fields, (values) => {
                let update_ability = true;
                if(attr.includes("ability")) {
                    update_ability = false;
                }
                setAttrs(calcAttack(id,values,update_ability), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcAttack = function(id, values, update_ability = false) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                // Ability modifiers handling
                let weapon_ability = getSelectAbilityModifier(`${id}_weapon`, values, update_ability);
                update[`${id}_weapon_ability`] = weapon_ability;
                let damage_ability = getSelectAbilityModifier(`${id}_damage`, values, update_ability);
                update[`${id}_damage_ability`] = damage_ability;
                // Attack: calculating attack display value ("weapon_strike")
                update[`${id}_weapon_proficiency`] = calcProficiency(values[`${id}_weapon_rank`], values["level"]);
                let weapon_strike = weapon_ability
                    + (parseInt(update[`${id}_weapon_proficiency`]) || 0)
                    + (parseInt(values[`${id}_weapon_item`]) || 0)
                    + (parseInt(values[`${id}_weapon_temporary`]) || 0);
                // -- UC-666 Temporary fix to stop NPCs autocalculating
                update[`${id}_weapon_strike`] = weapon_strike;
                // Damage: calculating dice and total fixed damage
                update[`${id}_damage_dice`] = (parseInt(values[`${id}_damage_dice`]) || 0);
                if((parseInt(values[`${id}_damage_dice_size`].replace(/[^\d]/gi,'')) || 0)) {
                    update[`${id}_damage_dice_size`] = `D${parseInt(values[`${id}_damage_dice_size`].replace(/[^\d]/gi,''))}`;
                } else {
                    update[`${id}_damage_dice_size`] = 'D0';
                }
                let damage_dice = `${update[`${id}_damage_dice`]}${update[`${id}_damage_dice_size`]}`;
                let damage_bonus = damage_ability
                    + (parseInt(values[`${id}_damage_weapon_specialization`]) || 0)
                    + (parseInt(values[`${id}_damage_temporary`]) || 0)
                    + (parseInt(values[`${id}_damage_other`]) || 0);
                // Attack display
                update[`${id}_weapon_display`] = `${weapon_strike < 0 ? "" : "+"}${weapon_strike}${(values[`${id}_weapon_traits`] || "").length ? " ("+values[`${id}_weapon_traits`]+")" : ""}`;
                // Damage display
                update[`${id}_damage_display`] = `${damage_dice == '0D0' ? "" : damage_dice}${damage_bonus < 0 ? "" : "+"}${damage_bonus}${values[`${id}_damage_b`] == "1" ? " "+getTranslationByKey("b").toUpperCase() : ""}${values[`${id}_damage_p`] == "1" ? " "+getTranslationByKey("p").toUpperCase() : ""}${values[`${id}_damage_s`] == "1" ? " "+getTranslationByKey("s").toUpperCase() : ""}${(values[`${id}_damage_effects`] || "").length ?  " "+getTranslationByKey("plus")+" "+values[`${id}_damage_effects`] : ""}`;
                // Damage Roll: calculating info to include translated damage type
                let damage_info = "";
                if(values[`${id}_damage_b`] == "1") {
                    damage_info += ` ${getTranslationByKey("bludgeoning")}`;
                }
                if(values[`${id}_damage_p`] == "1") {
                    damage_info += ` ${getTranslationByKey("piercing")}`;
                }
                if(values[`${id}_damage_s`] == "1") {
                    damage_info += ` ${getTranslationByKey("slashing")}`;
                }
                if((values[`${id}_damage_effects`] || "").length) {
                    damage_info += ` ${getTranslationByKey("plus")} @{damage_effects}`;
                }
                update[`${id}_damage_info`] = damage_info.trim();
                // Damage roll : query damage dice # or not
                if((values[`query_roll_damage_dice`] || "0") == "0") {
                    update[`${id}_damage_dice_query`] = "@{damage_dice}";
                } else {
                    update[`${id}_damage_dice_query`] = values[`query_roll_damage_dice`];
                }
                // Forced update to attack and damage rolls (in case of logic change)
                update[`${id}_weapon_roll`] = "{{roll01_name=^{attack}}} {{roll01=[[1d20cs20cf1 + @{weapon_strike}[@{text_modifier}] + @{query_roll_bonus}[@{text_bonus}]]]}} {{roll01_type=attack}} {{roll01_info=@{weapon_traits}}} {{roll01_critical=1}}";
                update[`${id}_damage_roll`] = "{{roll02_name=^{damage}}} {{roll02=[[@{damage_dice_query}@{damage_dice_size} + @{damage_ability}[@{text_ability_modifier}] + @{damage_weapon_specialization}[WEAPON SPECIALIZATION] + @{damage_temporary}[TEMP] + @{damage_other}[OTHER] + @{query_roll_damage_bonus}[@{text_roll_damage_bonus}]]]}} {{roll02_type=damage}} {{roll02_info=@{damage_info}}}";
                update[`${id}_damage_critical_roll`] = "{{roll03_name=^{critical_damage}}} {{roll03=[[(@{damage_dice_query}@{damage_dice_size} + @{damage_ability}[@{text_ability_modifier}] + @{damage_weapon_specialization}[WEAPON SPECIALIZATION] + @{damage_temporary}[TEMP] + @{damage_other}[OTHER] + @{query_roll_damage_bonus}[@{text_roll_damage_bonus}])*2]]}} {{roll03_type=critical-damage}} {{roll03_info=@{damage_info}}}";
                // End
            }
            return update;
        };

        // === PERCEPTION
        const updatePerception = function(attr, callback) {
            console.log(`%c Update perception ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["perception"]);
            getAttrs(fields, (values) => {
                let update_ability = true;
                if(attr.includes("ability")) {
                    update_ability = false;
                }
                setAttrs(calcPerception(values, update_ability), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcPerception = function(values, update_ability = false) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                update["perception_ability"] = getSelectAbilityModifier("perception", values, update_ability);
                update["perception_proficiency"] = calcProficiency(values["perception_rank"], values["level"]);
                update["perception"] = (parseInt(update["perception_ability"]) || 0)
                    + (parseInt(update["perception_proficiency"]) || 0)
                    + (parseInt(values["perception_item"]) || 0)
                    + (parseInt(values["perception_temporary"]) || 0);
            }
            return update;
        };

        // === CLASS DC
        const updateClassDc = function(attr, callback) {
            console.log(`%c Update Class DC ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["class_dc"]);
            getAttrs(fields, (values) => {
                let update_ability = true;
                if(attr.includes("ability")) {
                    update_ability = false;
                }
                setAttrs(calcClassDc(values, update_ability), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcClassDc = function(values, update_ability = false) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                update["class_dc_key_ability"] = getSelectAbilityModifier("class_dc_key", values, update_ability);
                update["class_dc_proficiency"] = calcProficiency(values["class_dc_rank"], values["level"]);
                update["class_dc"] = 10
                    + (parseInt(update["class_dc_key_ability"]) || 0)
                    + (parseInt(update["class_dc_proficiency"]) || 0)
                    + (parseInt(values["class_dc_item"]) || 0)
                    + (parseInt(values["class_dc_temporary"]) || 0);
            }
            return update;
        };

        // === SPELL ATTACKS
        const updateSpellAttack = function(attr, callback) {
            console.log(`%c Update spell attack ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["spell_attack"]);
            getAttrs(fields, (values) => {
                let update_ability = true;
                if(attr.includes("ability")) {
                    update_ability = false;
                }
                setAttrs(calcSpellAttack(values, update_ability), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });

        };
        const calcSpellAttack = function(values, update_ability = false) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                update["spell_attack_key_ability"] = getSelectAbilityModifier("spell_attack_key", values, update_ability);
                update["spell_attack_proficiency"] = calcProficiency(values["spell_attack_rank"], values["level"]);
                update["spell_attack"] = (parseInt(update["spell_attack_key_ability"]) || 0)
                    + (parseInt(update["spell_attack_proficiency"]) || 0)
                    + (parseInt(values["spell_attack_temporary"]) || 0);
            }
            return update;
        };

        // === SPELL DC
        const updateSpellDc = function(attr, callback) {
            console.log(`%c Update spell DC ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            fields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["spell_dc"]);
            getAttrs(fields, (values) => {
                let update_ability = true;
                if(attr.includes("ability")) {
                    update_ability = false;
                }
                setAttrs(calcSpellDc(values, update_ability), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcSpellDc = function(values, update_ability = false) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                update["spell_dc_key_ability"] = getSelectAbilityModifier("spell_dc_key", values, update_ability);
                update["spell_dc_proficiency"] = calcProficiency(values["spell_dc_rank"], values["level"]);
                update["spell_dc"] = 10
                    + (parseInt(update["spell_dc_key_ability"]) || 0)
                    + (parseInt(update["spell_dc_proficiency"]) || 0)
                    + (parseInt(values["spell_dc_temporary"]) || 0)
                    // + (parseInt(values["spell_dc_item"]) || 0)
                    ;
            }
            return update;
        };

        // === SPELLS: MAGIC TRADITIONS
        const updateMagicTradition = function(attr, tradition, callback) {
            console.log(`%c Update Magic Tradition ${tradition} with ${attr}`, "color:purple;font-size:14px;");
            let fields = ["sheet_type","level"];
            global_attributes_by_category["magic_tradition_fields"].forEach(field => {
                fields.push(`magic_tradition_${tradition}_${field}`);
            });
            getAttrs(fields, (values) => {
                setAttrs(calcMagicTradition(values, tradition), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcMagicTradition = function(values, tradition) {
            let update = {};
            if((values["sheet_type"] || "").toLowerCase() != "npc") {
                update[`magic_tradition_${tradition}_proficiency`] = calcProficiency(values[`magic_tradition_${tradition}_rank`], values["level"]);
            }
            return update;
        };

        // === SPELLS: SPELL (note : NOT powers)
        const updateSpell = function(id, attr, callback) {
            console.log(`%c Update spell ${attr}`, "color:purple;font-size:14px;");
            let fields = ["level","magic_tradition_arcane_proficiency","magic_tradition_primal_proficiency","magic_tradition_occult_proficiency","magic_tradition_divine_proficiency","spell_dc","spell_dc_key_ability","spell_dc_temporary","spell_attack","spell_attack_key_ability","spell_attack_temporary"];
            fields.push(`${id}_type`);
            getAttrs(fields, (values) => {
                setAttrs(calcSpell(id,values), {silent: true}, () => {
                    if(callback) {
                        callback();
                    }
                });
            });
        };
        const calcSpell = function(id, values) {
            /*
                Calculating DC (dc) and Attack (spellattack) value based on chosen magic tradition:
                If no magic tradition has been chosen on the spell, then standard spell DC (spell_dc) and standard spell attack (spell_attack) are used.
                Otherwise (a magic tradition has been selected for the spell), a specifi spell base DC and attack are calcuted based on magic tradition proficiency and relative (DC or Attack) ability modifiers and temporary bonuses.
                In a future version, full magic tradition attack and DC should be calcultared with their own ability modifiers and temporary bonuses (ie a full setting section for each magic tradition, with notes and all)
            */
           let update = {};
           let tradition = (values[`${id}_type`] || "empty-string");
            // Attack
            if(tradition == "empty-string") {
                update[`${id}_spellattack`] = values["spell_attack"];
                update[`${id}_spelldc`] = values["spell_dc"];
            } else {
                update[`${id}_spellattack`] = (parseInt(values[`magic_tradition_${tradition}_proficiency`]) || 0)
                    + (parseInt(values[`spell_attack_key_ability`]) || 0)
                    + (parseInt(values[`spell_attack_temporary`]) || 0);
                update[`${id}_spelldc`] = 10
                    + (parseInt(values[`magic_tradition_${tradition}_proficiency`]) || 0)
                    + (parseInt(values[`spell_dc_key_ability`]) || 0)
                    + (parseInt(values[`spell_dc_temporary`]) || 0);
            }
            return update;
        };

        // === BULK
        const updateBulk = function(attr, callback) {
            console.log(`%c Update Bulk ${attr}`, "color:purple;font-size:14px;");
            let repsecs = {};
            global_attributes_by_category["repeating_bulks"].forEach(category => {
                repsecs[category] = {"section": `items-${category}`, "attrs": global_attributes_by_category["bulks_fields"].map(attr => `${category}_${attr}`)};
            });
            getRepSecIds(JSON.parse(JSON.stringify(Object.values(repsecs))), (repsec_agr) => {
                let fields = getRepSecFields(repsec_agr, Array.from(new Set(["cp","sp","gp","pp"])));
                getAttrs(fields, (values) => {
                    setAttrs(calcBulk(values,repsec_agr), {silent: true}, () => {
                        if(callback) {
                            callback();
                        }
                    });
                });
            });
        };
        const calcBulk = function(values,repsec_agr) {
            let update = {};
            let total = 0, light = 0, coins = 0, other = 0;
            // Tallying bulk values from various items
            global_attributes_by_category["repeating_bulks"].forEach(category => {
                repsec_agr.filter(current_section => current_section.section == `items-${category}`)[0].ids.forEach(category_id => {
                    if((values[`repeating_items-${category}_${category_id}_${category}_bulk`] || "").toUpperCase() === "L") {
                        // Light item
                        light += (parseInt(values[`repeating_items-${category}_${category_id}_${category}_quantity`]) || 0);
                    } else {
                        // Other / normal bulk
                        other += ((parseInt(values[`repeating_items-${category}_${category_id}_${category}_bulk`]) || 0) * (parseInt(values[`repeating_items-${category}_${category_id}_${category}_quantity`]) || 0));
                    }
                });
            });
            // Coins
            coins = 0
                + (parseInt(values["cp"]) || 0)
                + (parseInt(values["sp"]) || 0)
                + (parseInt(values["gp"]) || 0)
                + (parseInt(values["pp"]) || 0);
            total = other + Math.floor(light / 10) + Math.floor(coins / 1000);
            update["bulk"] = total;
            return update;
        };

        // === Module Interface
        return {
            sheetOpen: sheetOpen
            , getAttrNames: getAttrNames
            , totalUpdate: totalUpdate
            , updateAbility: updateAbility
            , updateSkill: updateSkill
            , updateSave: updateSave
            , updateArmorClass: updateArmorClass
            , updateHitPoints: updateHitPoints
            , updateAttack: updateAttack
            , updatePerception: updatePerception
            , updateClassDc: updateClassDc
            , updateSpellAttack: updateSpellAttack
            , updateSpellDc: updateSpellDc
            , updateMagicTradition: updateMagicTradition
            , updateSpell: updateSpell
            , updateBulk: updateBulk
        }

    })();
    /* === MODULE ENDS === */

    /* === EVENTS HANDLING BEGINS === */

    // == Generalities
    // Sheet opening
    on("sheet:opened", (eventinfo) => {
        modPf2.sheetOpen(eventinfo);
    });

    //Changes sheet type
    ['character','details','feat','inventory','spells','options','npc'].forEach(attr => {
        on(`clicked:toggle_${attr}`, (eventinfo) => {
            const trigger = eventinfo.triggerName.split("clicked:toggle_")[1];
            getAttrs(["sheet_type"], (values) => {
                setAttrs({
                    sheet_type : attr
                });
            });
        });
    });
   // === SETTINGS TOGGLES
    modPf2.getAttrNames(['setting_toggles', "skills"]).forEach(attr => {
        on(`clicked:toggle_${attr}`, (eventinfo) => {
            const trigger = eventinfo.triggerName.split("clicked:toggle_")[1];
            getAttrs(["toggles"], (values) => {
                let string = values[`toggles`];
                (string.includes(`${attr}`)) ? string = string.replace(`${attr},`, "") : string += `${attr},`;
                setAttrs({
                	toggles : string
                });
            });
        });
    });
    // === REPEATING SETTINGS TOGGLES
  	modPf2.getAttrNames(['repeating_toggles']).forEach(attr => {
        on(`clicked:${attr}:settings clicked:${attr}:collapse`, (eventinfo) => {
			const trigger = eventinfo.triggerName.split("clicked:")[1];
			const id      = trigger.split("_")[2];
			const keyword = trigger.split("_")[3];
           	getAttrs([`${attr}_${id}_toggles`], (values) => {
                let string = values[`${attr}_${id}_toggles`];
                (string.includes(`${keyword}`)) ? string = string.replace(`${keyword},`, "") : string += `${keyword},`;
                setAttrs({
                	[`${attr}_${id}_toggles`] : string
                });
            });
        });
    });

    // === Options - settings
    on("clicked:whisper", function(eventinfo) {
        getAttrs(["whispertype"], function (values) {
            setAttrs({
                "whispertype": ((values["whispertype"] || "").includes("gm")) ?  " " : "/w gm "
            });
        });
    });

    // === LEVEL
    on("change:level", (eventinfo) => {
        modPf2.totalUpdate();
    });

    // === ABILITIES
    //Modifier calculators
    modPf2.getAttrNames(['abilities']).forEach(attr => {
        on(`change:${attr}_score change:${attr}_score_temporary change:${attr}_modifier_temporary`, (eventinfo) => {
            // console.table(eventinfo);
            modPf2.updateAbility(attr);
        });
    });
    //Update ability inputs with the appropriate selectable modifier
    modPf2.getAttrNames(['select_attributes']).forEach(attr => {
        on(`change:${attr}_ability_select`, (eventinfo) => {
            // console.table(eventinfo);
            if((eventinfo.newValue || "").includes("modifier")) {
                const ability = eventinfo.newValue.slice(2,-1);
                getAttrs([ability], (values) => {
                    let update = {};
                    update[`${eventinfo.sourceAttribute.replace(/_select$/,"")}`] = values[ability];
                    setAttrs(update);
                });
            }
        });
    });
    //Update ability selects to custom if the user inputs their own modifer
    modPf2.getAttrNames(['select_attributes']).forEach(attr => {
        on(`change:${attr}_ability`, (eventinfo) => {
            // console.table(eventinfo);
            if (eventinfo.sourceType === "player") {
                getAttrs([`${eventinfo.sourceAttribute}_select`], (values) => {
                    if (values[`${eventinfo.sourceAttribute}_select`].includes("modifier")) {
                        setAttrs({
                            [`${eventinfo.sourceAttribute}_select`] : "custom"
                        },{silent: true});
                    } else {
                        console.log(`%c Ability value was ${values[`${eventinfo.sourceAttribute}_select`]}`, "color:orange;");
                    };
                });
            };
        });
    });

    // === SKILLS
    // Fixed skills
    modPf2.getAttrNames(["skills"]).forEach(attr => {
        on(modPf2.getAttrNames(["skills_fields"]).map(field => `change:${attr}_${field}`).join(' '), (eventinfo) => {
            // console.table(eventinfo);
            if(!eventinfo.sourceAttribute.includes("ability_select")) {
                modPf2.updateSkill(attr,eventinfo.sourceAttribute);
            }
        });
    });
    // Repeating skills
    modPf2.getAttrNames(['repeating_skills']).forEach(attr => {
        on(modPf2.getAttrNames(["skills_fields"]).map(field => `change:repeating_${attr}:${attr}_${field}`).join(' '), (eventinfo) => {
            // console.table(eventinfo);
            if(!eventinfo.sourceAttribute.includes("ability_select")) {
                modPf2.updateSkill(`repeating_${attr}_${eventinfo.sourceAttribute.split(`${attr}_`)[1]}${attr}`,eventinfo.sourceAttribute);
            }
        });
    });

    // === SAVES
    modPf2.getAttrNames(["saves"]).forEach(attr => {
        on(modPf2.getAttrNames(["saves_fields"]).map(field => `change:${attr}_${field}`).join(' '), (eventinfo) => {
            // console.table(eventinfo);
            if(!eventinfo.sourceAttribute.includes("ability_select")) {
                modPf2.updateSave(attr,eventinfo.sourceAttribute);
            }
        });
    });

    // === ARMOR CLASS (AC)
    modPf2.getAttrNames(["ac"]).forEach(attr => {
        on(modPf2.getAttrNames(["ac_fields"]).map(field => `change:${attr}_${field}`).join(' '), (eventinfo) => {
            // console.table(eventinfo);
            if(!eventinfo.sourceAttribute.includes("ability_select")) {
                modPf2.updateArmorClass(attr,eventinfo.sourceAttribute);
            }
        });
    });

    // === HIT POINTS
    on(modPf2.getAttrNames(["hit_points"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        modPf2.updateHitPoints(eventinfo.sourceAttribute);
    });

    // === ATTACKS
    modPf2.getAttrNames(["repeating_attacks"]).forEach(attr => {
        on(modPf2.getAttrNames(["attacks_fields"]).map(field => `change:repeating_${attr}:${field}`).join(' '), (eventinfo) => {
            // console.table(eventinfo);
            if(!eventinfo.sourceAttribute.includes("ability_select")) {
                modPf2.updateAttack(`repeating_${attr}_${eventinfo.sourceAttribute.split('_')[2]}`,eventinfo.sourceAttribute);
            }
        });
    });
    on("change:query_roll_damage_dice", (eventinfo) => {
        modPf2.totalUpdate();
    });

    // === PERCEPTION
    on(modPf2.getAttrNames(["perception"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updatePerception(eventinfo.sourceAttribute);
        }
    });

    // === INITIATIVE
    on("change:initiative_skill", (eventinfo) => {
        setAttrs({"initiative": `@{${eventinfo.newValue}}[${getTranslationByKey(eventinfo.newValue).toUpperCase()}]`},{silent:true});
    });

    // === CLASS DC
    on(modPf2.getAttrNames(["class_dc"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updateClassDc(eventinfo.sourceAttribute);
        }
    });

    // === SPELL ATTACK
    on(modPf2.getAttrNames(["spell_attack"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updateSpellAttack(eventinfo.sourceAttribute,() => {modPf2.totalUpdate()});
        }
    });

    // === SPELL DC
    on(modPf2.getAttrNames(["spell_dc"]).map(attr => `change:${attr}`).join(' '), (eventinfo) => {
        // console.table(eventinfo);
        if(!eventinfo.sourceAttribute.includes("ability_select")) {
            modPf2.updateSpellDc(eventinfo.sourceAttribute,() => {modPf2.totalUpdate()});
        }
    });

    // === SPELLS: MAGIC TRADITIONS
    modPf2.getAttrNames(["magic_tradition"]).forEach(tradition => {
        on(modPf2.getAttrNames(["magic_tradition_fields"]).map(field => `change:magic_tradition_${tradition}_${field}`).join(' '), (eventinfo) => {
            // console.table(eventinfo);
            modPf2.updateMagicTradition(eventinfo.sourceAttribute,tradition,() => {modPf2.totalUpdate()});
        });
    });

    // === SPELLS: SPELLS
    modPf2.getAttrNames(["repeating_spells"]).forEach(attr => {
        on(modPf2.getAttrNames(["spells_fields"]).map(field => `change:repeating_${attr}:${field}`).join(' '), (eventinfo) => {
            // console.table(eventinfo);
            modPf2.updateSpell(`repeating_${attr}_${eventinfo.sourceAttribute.split('_')[2]}`,eventinfo.sourceAttribute);
        });
    });

    // === BULK
    modPf2.getAttrNames(["repeating_bulks"]).forEach(attr => {
        on(modPf2.getAttrNames(["bulks_fields"]).map(field => `change:repeating_items-${attr}:${attr}_${field}`).join(' '), (eventinfo) => {
            // console.table(eventinfo);
            modPf2.updateBulk(eventinfo.sourceAttribute);
        });
        on(`remove:repeating_items-${attr}`, (eventinfo) => {
            // console.table(eventinfo);
            modPf2.updateBulk(eventinfo.sourceAttribute);
        });
    });
    on("change:cp change:sp change:gp change:pp", (eventinfo) => {
            // console.table(eventinfo);
            modPf2.updateBulk(eventinfo.sourceAttribute);
    });

    /* === EVENTS HANDLING ENDS === */
