/* === MODULE BEGINS === */

var modPf2 = (function () {

    /* === GLOBAL VARIABLES === */
    var global_sheet_init_done = 0;
    // Attribute names by category
    const global_attributes_by_category = {
        "abilities": ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
        , "ability_modifiers": ["strength_modifier", "strength_modifier_half", "dexterity_modifier", "constitution_modifier", "intelligence_modifier", "wisdom_modifier", "charisma_modifier"]
        , "setting_toggles": ["class_dc", "armor_class", "hitpoints", "saving_throws", "shield", "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma", "perception", "ancestry", "notes", "spell_attack", "spell_dc", "npcsettings", "npcspellcaster"]
        , "repeating_toggles": ["repeating_conditions", "repeating_resistances-immunities", "repeating_senses", "repeating_languages", "repeating_melee-strikes", "repeating_ranged-strikes","repeating_actions","repeating_actions-activities","repeating_free-actions-reactions","repeating_feat-ancestry","repeating_feat-class","repeating_feat-general","repeating_feat-bonus", "repeating_feat-skill", "repeating_lore", "repeating_items-worn", "repeating_items-readied", "repeating_items-other", "repeating_npc-items", "repeating_npc-melee-strikes", "repeating_npc-ranged-strikes","repeating_spellinnate","repeating_spellfocus","repeating_cantrip","repeating_normalspells", "repeating_interaction-abilities"]
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
        , "attacks_fields": ["weapon","weapon_ability_select","weapon_ability","weapon_proficiency","weapon_rank","weapon_item","weapon_temporary","weapon_traits","damage_dice","damage_dice_size","damage_ability_select","damage_ability","damage_b","damage_p","damage_s","damage_weapon_specialization","damage_temporary","damage_other","damage_effects","damage_additional"]
        , "perception": ["perception_ability_select","perception_ability","perception_rank","perception_proficiency","perception_item","perception_temporary"]
        , "class_dc": ["class_dc_key_ability_select","class_dc_key_ability","class_dc_proficiency","class_dc_rank","class_dc_item","class_dc_temporary"]
        , "spell_attack": ["spell_attack_key_ability_select","spell_attack_key_ability", "spell_attack_rank","spell_attack_proficiency","spell_attack_temporary"]
        , "spell_dc": ["spell_dc_key_ability_select","spell_dc_key_ability", "spell_dc_rank","spell_dc_proficiency","spell_dc_temporary"]
        , "magic_tradition": ["arcane","primal","occult","divine"]
        , "magic_tradition_fields": ["rank","proficiency"]
        , "repeating_spells": ["cantrip","spellinnate","spellfocus","normalspells"]
        , "spell_types": ["cantrips","innate","focus","normalspells"]
        , "spells_fields": ["area","attack_checkbox","cast","cast_actions","cast_detail_information","cast_detail_label","current_level","damage_ability","damage_additional","damage_checkbox","damage_dice","damage_misc","damage_type","description","domain","duration","frequency","heightened","magic_tradition","name","npc_attack_checkbox","npc_saving_throw_select","range","save_critical_failure","save_critical_success","save_failure","save_success","save_type","saving_throw_select","school","spell_dc","spellattack","spellattack_ability","spellattack_misc","spellattack_rank","spelldc","spelldc_ability","spelldc_misc","spelldc_rank","spelllevel","target","toggles","traits","uses","uses_max"]
        , "spells_fields_triggering": ["magic_tradition","damage_checkbox"]
        , "spells_calculation_attributes": ["sheet_type","level","magic_tradition_arcane_proficiency","magic_tradition_primal_proficiency","magic_tradition_occult_proficiency","magic_tradition_divine_proficiency","spell_dc","spell_dc_key_ability","spell_attack_key_ability_select","spell_dc_temporary","spell_attack","spell_attack_key_ability","spell_attack_temporary","roll_option_critical_damage"]
        , "repeating_bulks": ["worn","readied","other"]
        , "bulks_fields": ["quantity","bulk"]
        , "encumbrance_attributes": ["strength_modifier", "encumbered_modifier", "maximum_modifier"]
        , "translatables": ["modifier","ability_modifier","bonus","roll_bonus","roll_damage_bonus","#_damage_dice","use"]
    };
    // NPC attributes object for building NPC from Compendium
    const global_npc_attributes = {
        basics: ["npc_type","level","alignment","size","traits","perception","senses","languages","acrobatics","acrobatics_notes","arcana","arcana_notes","athletics","athletics_notes","crafting","crafting_notes","deception","deception_notes","diplomacy","diplomacy_notes","intimidation","intimidation_notes","medicine","medicine_notes","nature","nature_notes","occultism","occultism_notes","performance","performance_notes","religion","religion_notes","society","society_notes","stealth","stealth_notes","survival","survival_notes","thievery","thievery_notes","strength_modifier","dexterity_modifier","constitution_modifier","intelligence_modifier","wisdom_modifier","charisma_modifier","armor_class","armor_class_notes","saving_throws_fortitude","saving_throws_reflex","saving_throws_will","saving_throws_notes","hit_points_max","hit_points_notes","immunities","weaknesses","resistances","speed","speed_notes","spell_attack","spell_dc","focus_points_max"]
    };
    // Misc
    const global_magic_traditions = ["arcane","divine","primal","occult"];
    const global_spell_frequencies = ["constant","at-will","daily-limit"];
    const global_sizes = [
        {size:"tiny", squares: 1.0}
        , {size:"small", squares: 1.0}
        , {size:"medium", squares: 1.0}
        , {size:"large", squares: 2.0}
        , {size:"huge", squares: 3.0}
        , {size:"gargantuan", squares: 4.0}
    ];
    const global_rollregex = /(\d+d*\d*\+*\-*\d*)/gi; // Improvable Regex formula to parse damage dice rolls (like 1d6+2 or 2d4 or just ... 3)
    // Repeating sections and their attributes
    var global_repsecs = {
        "lore": {"section": "lore","attrs":global_attributes_by_category["skills_fields"].map(fld => `lore_${fld}`)}
    };

    // === UTILITIES
    const toTitleCase = function(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
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
    // == Collecting one repeating section and attributes in an array of objects
    const getRepSecObjectArray = function(section = "normalspell", attributesArray, callback) {
        // Gather all spells from a spell section and constitute a array of objets with [{id: ID, attribute: value}]
        let items = [];
        getSectionIDs(`repeating_${section}`, (ids) => {
            let fields = [];
            ids.forEach(id => {
                fields.push(...attributesArray.map(attribute => `repeating_${section}_${id}_${attribute}`));
            });
            getAttrs(fields, (values) => {
                ids.forEach(id => {
                    let item = {};
                    item["id"] = id;
                    attributesArray.forEach(attribute => {
                        item[attribute] = (values[`repeating_${section}_${id}_${attribute}`] || "");
                    });
                    items.push(item);
                });
                if(callback) {
                    callback(items);
                } else {
                    return items;
                }
            });
        });
    };
    // == Sorting (repeating section, objects ...)
    const defaultComparison = function(a, b) {
        // Standard sorting comparison
        if (a == b) return 0;
        return a < b ? -1 : 1;
    };
    const stringComparison = function(a, b) {
        // Sorting two strings ignoring casing and punctuation but not accents
        return String(a).localeCompare(String(b),getTranslationLanguage(),{"ignorePunctuation":true,"caseFirst":false,"sensitivity":"accent"});
    };
    const getComparisonFunction = function(primer = String, reverse = false) {
        // Sorting comparison
        let comparisonFunction;
        if(primer == String) {
            comparisonFunction = (a, b) => {
                return stringComparison(a, b);
            };
        } else {
            comparisonFunction = (a, b) => {
                return defaultComparison(primer(a), primer(b));
            };
        }
        if (reverse) {
            return function(a, b) {
                return -1 * comparisonFunction(a, b);
            };
        }
        return comparisonFunction;
    };
    const sortObjectArrayBy = function(sorting) {
        /* Sorting an array of objects.
            The `sorting` parameter is an array of sorting criteria(s), in the form of one or more attribute (key) names, or object(s) like {
                    name:"attribute name"
                    , primer: typing function name like parseInt. Defaults to String
                    , reverse: boolean. Ascending or descending order. Default to false.
                }
            Uses:
            * new array = arrayOfObjetcs.sort(sortObjectArrayBy(["name"]));
            * (same as) new array = arrayOfObjetcs.sort(sortObjectArrayBy([{name:"name", primer:String, reverse:false}]);
            * (multiple criterias : descending level and ascending name) new array = arrayOfObjetcs.sort(sortObjectArrayBy([{name:"current_level", primer:parseInt, reverse:true},"name"]);
        */
        let fields = [],
            n_fields = sorting.length, field, name, comparison;
        // preprocess sorting options
        for (let i = 0; i < n_fields; i++) {
            field = sorting[i];
            if (typeof field === "string") {
                name = field;
                comparison = stringComparison;
            } else {
                name = field.name;
                comparison = getComparisonFunction(field.primer, field.reverse);
            }
            fields.push({
                name: name,
                comparison: comparison
            });
        }
        // final comparison function
        return function(A, B) {
            let name, result;
            for (let i = 0; i < n_fields; i++) {
                result = 0;
                field = fields[i];
                name = field.name;
                result = field.comparison(A[name], B[name]);
                if (result !== 0) break;
            }
            return result;
        }
    };
    const sortRepeatingSection = function(section, attributes, sorting) {
        // sorting is an array of one or more attribute names, or object(s). See sortObjectArrayBy()
        getRepSecObjectArray(section, attributes, (items) => {
            let newItems = items.sort(sortObjectArrayBy(sorting));
            let sorted_attributes = newItems.map(item => `repeating_${section}_${item.id}`);
            setSectionOrder(section, sorted_attributes);
        });
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
                global_repsecs[category] = {"section": category, "attrs": ["magic_tradition"]};
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
    const calcProficiencyDisplay = function(rank) {
        switch(parseInt(rank) || 0) {
            case 2:
                return (getTranslationByKey("trained") || "trained").charAt(0).toUpperCase();
                break;
            case 4:
                return (getTranslationByKey("expert") || "expert").charAt(0).toUpperCase();
                break;
            case 6:
                return (getTranslationByKey("master") || "master").charAt(0).toUpperCase();
                break;
            case 8:
                return (getTranslationByKey("legendary") || "legendary").charAt(0).toUpperCase();
                break;
            default:
                return " ";
        }
    };
    // -- Returns the ability modifier of an ability select, based on the value of the select and the fact that it needs updating or not. values requires ability modifiers, plus the xxx_ability_select and xxx_ability attributes.
    const getSelectAbilityModifier = function(attr, values, update_ability = false) {
        let modifier = 0;
        if(update_ability) {
            if((values[`${attr}_ability_select`] === "custom") || (!values[`${attr}_ability_select`])) {
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
            let tmpfields = ["character_name","sheet_type","level","query_roll_damage_dice","cp","sp","gp","pp","spell_attack","spell_dc","roll_option_critical_damage"];
            // --- Ability modifiers, Perception, Class DC, Hit Points
            tmpfields.push(...global_attributes_by_category["ability_modifiers"],...global_attributes_by_category["perception"],...global_attributes_by_category["class_dc"],...global_attributes_by_category["hit_points"],...global_attributes_by_category["spell_attack"],...global_attributes_by_category["spell_dc"], ...global_attributes_by_category["encumbrance_attributes"]);
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
                // console.table(values);
                let big_update = {};
                let update = {}; // Will be used to collect intermediate updates and replace values in values, when necessary
                if((values["sheet_type"] || "").toLowerCase() === "npc") {
                    // NPCs : just update weapon strikes (for critical damage roll option) and spells for now
                    // == Attacks / Weapon strikes
                    global_attributes_by_category["repeating_attacks"].forEach(r_attack => {
                        repsec_agr.filter(current_section => current_section.section == r_attack)[0].ids.forEach(r_attack_id => {
                            _.extend(big_update, calcAttack(`repeating_${r_attack}_${r_attack_id}`,values,true));
                        });
                    });
                    // == Spells
                    global_attributes_by_category["repeating_spells"].forEach(r_spell => {
                        repsec_agr.filter(current_section => current_section.section == r_spell)[0].ids.forEach(r_spell_id => {
                            _.extend(big_update, calcSpell(`repeating_${r_spell}_${r_spell_id}_`,values));
                        });
                    });
                } else {
                    // == Starting re-calculation

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

                    // == Attacks / Weapon strikes
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
                            _.extend(big_update, calcSpell(`repeating_${r_spell}_${r_spell_id}_`,values));
                        });
                    });

                    // === Encumbrance / Bulk
                    update = calcEncumbrance(values);
                    _.extend(big_update, update);
                    _.extend(values, update);
                    _.extend(big_update, calcBulk(values,repsec_agr));
                };
                // == Updating (finally)
                // console.table(big_update);
                setAttrs(big_update, {silent: true}, ()=>{
                    console.log(`%c Pathfinder Second Edition by Roll20: ${(values["character_name"] || "Unnamed character")} updated (${new Date() - debug_start}ms)`, "color:purple;font-size:14px;");
                    if(callback) {
                        callback();
                    }
                });
            });
        });
    };

    // === VERSIONING ===
    const versioning = function(callback) {
        let fields = ["version","version_character","sheet_type","character_name"].concat(global_attributes_by_category["ability_modifiers"]);
        getAttrs(fields, (values) => {
            let version_sheet = parseFloat(values["version"]) || 0.0;
            let version_character = parseFloat(values["version_character"]) || 0.0;
            if (version_character === version_sheet) {
                console.log(`%c Pathfinder Second Edition by Roll20: ${(values["character_name"] || "Unnamed character")}, version ${version_character}`, "color:purple;font-size:14px;");
                if(callback) {
                    callback();
                }
            } else if (version_character === 0.0) {
                // Check if the character is pre-versioning
                let total_mods = 0;
                global_attributes_by_category["ability_modifiers"].forEach(modifier => {
                    total_mods += parseInt(values[modifier] || "0");
                });
                if(total_mods === 0) {
                    // new characteur, don"t update
                    setAttrs({"version_character": version_sheet}, {silent: true}, () => {
                        versioning(callback);
                    });
                } else {
                    // old character
                    setAttrs({"version_character": 1.0}, {silent: true}, () => {
                        versioning(callback);
                    });
                }
            } else if (version_character < 2.01) {
                versioningUpdateTo2_01(values, () => {
                    setAttrs({"version_character": 2.01}, {silent: true}, () => {
                        versioning(callback);
                    });
                });
            } else if (version_character < 2.05) {
                versioningUpdateTo2_05(values, () => {
                    setAttrs({"version_character": 2.05}, {silent: true}, () => {
                        versioning(callback);
                    });
                });
            } else if (version_character < 3.02) {
                versioningUpdateTo3_02(values, () => {
                    setAttrs({"version_character": 3.02}, {silent: true}, () => {
                        versioning(callback);
                    });
                });
            } else if (version_character < 3.03) {
                versioningUpdateTo3_03(values, () => {
                    setAttrs({"version_character": 3.03}, {silent: true}, () => {
                        versioning(callback);
                    });
                });
            } else if (version_character < 3.042) {
                versioningUpdateTo3_042(values, () => {
                    setAttrs({"version_character": 3.042}, {silent: true}, () => {
                        versioning(callback);
                    });
                });
            } else if (version_character < 3.06) {
                versioningUpdateTo3_06(values, () => {
                    setAttrs({"version_character": 3.06}, {silent: true}, () => {
                        versioning(callback);
                    });
                });
            } else if (version_character < 3.08) {
                versioningUpdateTo3_08(values, () => {
                    setAttrs({"version_character": 3.08}, {silent: true}, () => {
                        versioning(callback);
                    });
                });
            } else if (version_character < 3.09) {
                versioningUpdateTo3_09(values, () => {
                    setAttrs({"version_character": 3.09}, {silent: true}, () => {
                        versioning(callback);
                    });
                });
            } else {
                setAttrs({"version_character": version_sheet}, {silent: true}, () => {
                    versioning(callback);
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
    const versioningUpdateTo2_05 = function(versioning_values, versioningDoneUpdating) {
        console.log(`%c Pathfinder Second Edition by Roll20: ${(versioning_values["character_name"] || "Unnamed character")} updating to version 2.05`, "color:purple;font-size:13px;font-style:italic;");
        if((versioning_values["sheet_type"] || "").toLowerCase() === "npc") {
            // Update NPCs" npc_save_checkbox for innate and focule spells to handle new NPC spell DC handling
            getSectionIDs("spellinnate", (innate_ids) => {
                getSectionIDs("spellfocus", (focus_ids) => {
                    let fields = innate_ids.map(id => `repeating_spellinnate_${id}_npc_save_checkbox`).concat(focus_ids.map(id => `repeating_spellfocus_${id}_npc_save_checkbox`));
                    if(fields.length) {
                        getAttrs(fields, (values) => {
                            let update = {};
                            fields.forEach((attr) => {
                                if((values[attr] || "0") !== "0") { // the save checkbox was checked
                                    // update to new roll value with new savesepecialdc
                                    update[attr] = "{{savedc=[[@{spell_dc}[DC] + @{spelldc_misc}[MISC]]]}} {{savespecialdc=[[0 + @{spelldc}[DC] + @{spelldc_misc}[MISC]]]}} {{savedcmisc=[[0 + @{spelldc_misc}[MISC]]]}} {{savetype=^{@{save_type}}}} {{savecriticalsuccess=@{save_critical_success}}} {{savesuccess=@{save_success}}} {{savecriticalfailure=@{save_critical_failure}}} {{savefailure=@{save_failure}}}";
                                }
                            });
                            setAttrs(update, {silent: true}, ()  => {
                                // plus Global recalculation to update all spells DC
                                totalUpdate(versioningDoneUpdating);
                            });
                        });
                    } else {
                        // NPC without spells: nothing to do
                        versioningDoneUpdating();
                    }
                });
             });
        } else {
            // PC: nothing to do
            versioningDoneUpdating();
        }
    };
    const versioningUpdateTo3_02 = function(versioning_values, versioningDoneUpdating) {
        console.log(`%c Pathfinder Second Edition by Roll20: ${(versioning_values["character_name"] || "Unnamed character")} updating to version 3.02`, "color:purple;font-size:13px;font-style:italic;");
        /*
        Update spell damage checkbox to handle optional critical damage roll
        "{{roll02_name=^{damage}}} {{roll02=[[@{damage_dice} + (@{damage_ability}[ABI]) + @{damage_misc}[MISC] + @{query_roll_damage_bonus}[@{text_roll_damage_bonus}]]]}} {{roll02_type=damage}} {{roll02_info=@{damage_type}}} {{roll03_name=^{critical_damage}}} {{roll03=[[(@{damage_dice}+@{damage_ability}[ABI] + @{damage_misc}[MISC] + @{query_roll_damage_bonus}[@{text_roll_damage_bonus}])*2]]}} {{roll03_type=critical-damage}} {{roll03_info=@{damage_type}}}"
        =>
        "{{roll02_name=^{damage}}} {{roll02=[[@{damage_dice} + (@{damage_ability}[ABI]) + @{damage_misc}[MISC] + @{query_roll_damage_bonus}[@{text_roll_damage_bonus}]]]}} {{roll02_type=damage}} {{roll02_info=@{damage_type}}} @{roll_critical_damage}"
        */
        let spells_repsecs = {}, update = {};
        global_attributes_by_category["repeating_spells"].forEach(category => {
            spells_repsecs[category] = {"section": category, "attrs": ["damage_dice"]};
        });
        getRepSecIds(JSON.parse(JSON.stringify(Object.values(spells_repsecs))), (repsec_agr) => {
            getAttrs(getRepSecFields(repsec_agr), (values) => {
                repsec_agr.forEach(category => {
                    category.ids.forEach(id => {
                        if( (values[`repeating_${category.section}_${id}_damage_dice`] || "") !== "") {
                            update[`repeating_${category.section}_${id}_damage_checkbox`] = "{{roll02_name=^{damage}}} {{roll02=[[@{damage_dice} + (@{damage_ability}[ABI]) + @{damage_misc}[MISC] + @{query_roll_damage_bonus}[@{text_roll_damage_bonus}]]]}} {{roll02_type=damage}} {{roll02_info=@{damage_type}}} @{roll_critical_damage}";
                        }
                    });
                });
                setAttrs(update, {silent: true}, () => {
                    versioningDoneUpdating();
                });
            });
        });
    };
    const versioningUpdateTo3_03 = function(versioning_values, versioningDoneUpdating) {
        console.log(`%c Pathfinder Second Edition by Roll20: ${(versioning_values["character_name"] || "Unnamed character")} updating to version 3.03`, "color:purple;font-size:13px;font-style:italic;");
        /*
            This function is aimed at reducing repeating spell sections level 1 to 10 to one unique repeating section (version X of the sheet, alongside spell UI overhaul)
            And converting changed attributes (type => magic_tradition, save checkbox => save select and attack checkboxes)
        */
        let spells = ["spellinnate","spellfocus","cantrip","spell1","spell2","spell3","spell4","spell5","spell6","spell7","spell8","spell9","spell10"];
        let repsecs = {};
        let attributes = ["type","save_checkbox","npc_save_checkbox"].concat(global_attributes_by_category["spells_fields"]);
        spells.forEach(level => {
            repsecs[level] = {"section": level, "attrs": attributes};
        });
        getRepSecIds(JSON.parse(JSON.stringify(Object.values(repsecs))), (repsec_agr) => {
            let fields = ["sheet_type"].concat(getRepSecFields(repsec_agr));
            getAttrs(fields, (values) => {
                let update = {}, row = "", field = "";
                spells.forEach(level => {
                    repsec_agr.filter(current_section => current_section.section == level)[0].ids.forEach(id => { // for every ids of the spell section
                        if(["spellinnate","spellfocus","cantrip"].includes(level)){ // Updating other spell sections
                            row = `repeating_${level}_${id}_`;
                        } else { // Reducing spells lvl 1 to 10 to one section
                            row = `repeating_normalspells_${generateRowID()}_`;
                        }
                        attributes.forEach(attribute => { // for every possible attributee
                            if(["spellinnate","spellfocus","cantrip"].includes(level)){
                                field = `${row}${attribute}`;
                            } else {
                                field = `repeating_${level}_${id}_${attribute}`;
                            }
                            if(values[field]) {
                                switch(attribute) {
                                    case "type":
                                        update[`${row}magic_tradition`] = values[field];
                                        break;
                                    case "save_checkbox":
                                        if((values[field] || "0") !== "0") {
                                            update[`${row}saving_throw_select`] = "@{save_roll}";
                                        }
                                        break;
                                    case "npc_save_checkbox":
                                        if((values[field] || "0") !== "0") {
                                            update[`${row}npc_saving_throw_select`] = "@{npc_save_roll}";
                                        }
                                        break;
                                    case "attack_checkbox":
                                        if((values[field] || "0") !== "0") {
                                            if((values["sheet_type"] || "").toLowerCase() === "npc") {
                                                update[`${row}npc_attack_checkbox`] = "@{npc_attack_roll}";
                                            } else {
                                                update[`${row}attack_checkbox`] = "@{attack_roll}";
                                            }
                                        }
                                        break;
                                    case "npc_attack_checkbox":
                                        if((values[field] || "0") !== "0") {
                                            update[`${row}npc_attack_checkbox`] = "@{npc_attack_roll}";
                                        }
                                        break;
                                    case "damage_checkbox":
                                        if((values[field] || "0") !== "0") {
                                            update[`${row}damage_checkbox`] = "@{damage_roll}";
                                        }
                                        break;
                                    default:
                                        if(!["spellinnate","spellfocus","cantrip"].includes(level)){
                                            update[`${row}${attribute}`] = values[field];
                                        }
                                        break;
                                }
                            }
                        });
                        if(["spellinnate","spellfocus","cantrip"].includes(level)){ // Updating other spell sections
                            update[`${row}spelllevel`] = (values[`${row}spelllevel`] || "1");
                        } else { // Reducing spells lvl 1 to 10 to one section
                            update[`${row}spelllevel`] = level.replace(/[^\d]/gi,"");
                        }
                        update[`${row}current_level`] = update[`${row}spelllevel`];
                    });
                });
                // Saving new spell entries
                setAttrs(update, {silent: true}, () => {
                    // Removing old spells 1 to 10
                    repsec_agr.forEach(repsec => {
                        if(!["spellinnate","spellfocus","cantrip"].includes(repsec.section)){
                            repsec.ids.forEach(id => {
                                removeRepeatingRow(`repeating_${repsec.section}_${id}`);
                            });
                        }
                    });
                    if(versioningDoneUpdating) {
                        versioningDoneUpdating();
                    }
                });
            });
        });
    };
    const versioningUpdateTo3_042 = (versioning_values, versioningDoneUpdating) => {
        console.log(`%c Pathfinder Second Edition by Roll20: ${(versioning_values["character_name"] || "Unnamed character")} updating to version 3.042`, "color:purple;font-size:13px;font-style:italic;");
        // Re-synchronizing spell section toggles, and make sure color:default is in
        let toggles = "";
        let toggles_array = ["normalspells","cantrips","focus","innate"];
        let fields = ["toggles"].concat(toggles_array.map(toggle => `toggle_${toggle}`));
        getAttrs(fields, (values) => {
            toggles = (values["toggles"] || "");
            toggles_array.forEach(uniq => {
                if((values[`toggle_${uniq}`] || "0") === "0" && toggles.includes(uniq)) {
                    toggles = toggles.replace(uniq + ",","");
                } else if(!toggles.includes(uniq)){
                    toggles += `${uniq},`;
                }
            });
            if(!toggles.includes("color:default")) {
                toggles += "color:default,";
            }
            // Remove duplicates and empty strings, undefined, nulls and other "false" elements
            toggles = [...new Set(toggles.split(","))].filter(element => {return element != null && String(element).trim().length;}).join();
            setAttrs({"toggles": toggles}, {silent: true}, () => {
                if(versioningDoneUpdating) {
                    versioningDoneUpdating();
                }
            });
        });
    };
    const versioningUpdateTo3_06 = function(versioning_values, versioningDoneUpdating) {
        console.log(`%c Pathfinder Second Edition by Roll20: ${(versioning_values["character_name"] || "Unnamed character")} updating to version 3.06`, "color:purple;font-size:13px;font-style:italic;");
        // Fixing the actions & reactions repeating section items roll
        getSectionIDs("repeating_free-actions-reactions", (ids) => {
            let fields = [], update = {};
            ["free_action","reaction"].forEach(attr => {
                fields.push(...ids.map(id => `repeating_free-actions-reactions_${id}_${attr}`));
            });
            getAttrs(fields, (values) => {
                ids.forEach(id => {
                    update[`repeating_free-actions-reactions_${id}_action_type`] = (`${(values[`repeating_free-actions-reactions_${id}_free_action`] || "0") == "0" ? "" : toTitleCase(getTranslationByKey("free_action"))} `
                    + `${(values[`repeating_free-actions-reactions_${id}_reaction`] || "0") == "0" ? "" : toTitleCase(getTranslationByKey("reaction"))} `).trim();
                });
                setAttrs(update, {silent: true}, () => {
                    totalUpdate(versioningDoneUpdating);
                });
            });
        });
    };
    const versioningUpdateTo3_08 = function(versioning_values, versioningDoneUpdating) {
        console.log(`%c Pathfinder Second Edition by Roll20: ${(versioning_values["character_name"] || "Unnamed character")} updating to version 3.08`, "color:purple;font-size:13px;font-style:italic;");
        // Refreshing Character for TEML proficiency display improvements
        getAttrs(["sheet_type"], (values) => {
            if((values["sheet_type"] || "").toLowerCase() !== "npc"){
                totalUpdate(versioningDoneUpdating);
            }
        });
    };
    const versioningUpdateTo3_09 = function(versioning_values, versioningDoneUpdating) {
        console.log(`%c Pathfinder Second Edition by Roll20: ${(versioning_values["character_name"] || "Unnamed character")} updating to version 3.09`, "color:purple;font-size:13px;font-style:italic;");
        /*
            This function is aimed at reducing PC's Actions & Activities, and Reactions & Free Actions repeating sections into one new  Actions repeating section
        */
        getAttrs(["sheet_type"], (chartyp) => {
            if((chartyp["sheet_type"] || "").toLowerCase() !== "npc"){
                getSectionIDs("repeating_actions-activities", (ids_aa) => {
                    getSectionIDs("repeating_free-actions-reactions", (ids_ar) => {
                        // collecting attributes
                        let fields = [];
                        let fields_aa = ["name","actions","traits","source","description"];
                        let fields_ar = ["name","free_action","reaction","traits","source","trigger","description"];
                        ids_aa.forEach(id => {
                            fields_aa.forEach(attr => {
                                fields.push(`repeating_actions-activities_${id}_${attr}`);
                            });
                        });
                        ids_ar.forEach(id => {
                            fields_ar.forEach(attr => {
                                fields.push(`repeating_free-actions-reactions_${id}_${attr}`);
                            });
                        });
                        getAttrs(fields, (values) => {
                            let update = {};
                            // Adding new Actions rows
                            ids_aa.forEach(id => {
                                let row = `repeating_actions_${generateRowID()}_`;
                                update[`${row}toggles`] = "display,";
                                update[`${row}action`] = "1-action";
                                fields_aa.forEach(attr => {
                                    if(attr === "actions" && (values[`repeating_actions-activities_${id}_actions`] || "")) {
                                        update[`${row}action`] = "other";
                                        update[`${row}other`] = values[`repeating_actions-activities_${id}_actions`];
                                    } else {
                                        update[`${row}${attr}`] = (values[`repeating_actions-activities_${id}_${attr}`] || "");
                                    }
                                });
                                // action type string
                                update[`${row}action_type`] = toTitleCase(getTranslationByKey((update[`${row}action`] || "1-action")));
                            });
                            ids_ar.forEach(id => {
                                let row = `repeating_actions_${generateRowID()}_`;
                                update[`${row}toggles`] = "display,";
                                update[`${row}action`] = "free_action";
                                fields_ar.forEach(attr => {
                                    if(attr === "free_action" && (values[`repeating_free-actions-reactions_${id}_${attr}`] || "") === "free action") {
                                        update[`${row}action`] = "free_action";
                                    } else if(attr === "reaction" && (values[`repeating_free-actions-reactions_${id}_${attr}`] || "") === "reaction") {
                                        update[`${row}action`] = "reaction";
                                    } else {
                                        update[`${row}${attr}`] = (values[`repeating_free-actions-reactions_${id}_${attr}`] || "");
                                    }
                                });
                                // action type string
                                update[`${row}action_type`] = toTitleCase(getTranslationByKey((update[`${row}action`] || "free_action")));
                            });
                            update["color_scheme"] = "default";
                            setAttrs(update, {silent: true}, () => {
                                // Removing old ids
                                ids_aa.forEach(id => removeRepeatingRow(id));
                                ids_ar.forEach(id => removeRepeatingRow(id));
                                versioningDoneUpdating();
                            });
                        });
                    });
                });
            } else {
                // NPC: nothing to do
                versioningDoneUpdating();
            }
        });
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
    const updateSkill = function(id, attr, callback) {
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
            update[`${attr}_proficiency_display`] = calcProficiencyDisplay(values[`${attr}_rank`]);
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
            update[`${attr}_proficiency_display`] = calcProficiencyDisplay(values[`${attr}_rank`]);
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
            update[`${attr}_proficiency_display`] = calcProficiencyDisplay(values[`${attr}_dc_rank`]);
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
        let fields = ["sheet_type","level","query_roll_damage_dice","roll_option_critical_damage"];
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
        let critoption = (values["roll_option_critical_damage"] || "auto"); // critical damage roll option
        if((values["sheet_type"] || "").toLowerCase() === "npc") {
            // Critical damage roll option handling
            switch (critoption) {
                case "none":
                    update[`${id}_roll_critical_damage_npc`] = " "; // no critical damage roll
                    break
                case "button":
                    update[`${id}_roll_critical_damage_npc`] = "@{roll_critical_damage_button_npc}"; // chat button
                    break
                case "auto":
                    update[`${id}_roll_critical_damage_npc`] = "@{damage_critical_roll_npc}"; // auto roll critical damage
                    break
                default:
                    update[`${id}_roll_critical_damage_npc`] = "@{damage_critical_roll_npc}"; // auto roll critical damage
            }
        } else { // PC
            // Ability modifiers handling
            let weapon_ability = getSelectAbilityModifier(`${id}_weapon`, values, update_ability);
            update[`${id}_weapon_ability`] = weapon_ability;
            let damage_ability = getSelectAbilityModifier(`${id}_damage`, values, update_ability);
            update[`${id}_damage_ability`] = damage_ability;
            // Attack: calculating attack display value ("weapon_strike")
            update[`${id}_weapon_proficiency`] = calcProficiency(values[`${id}_weapon_rank`], values["level"]);
            update[`${id}_weapon_proficiency_display`] = calcProficiencyDisplay(values[`${id}_weapon_rank`]);
            let weapon_strike = weapon_ability
                + (parseInt(update[`${id}_weapon_proficiency`]) || 0)
                + (parseInt(values[`${id}_weapon_item`]) || 0)
                + (parseInt(values[`${id}_weapon_temporary`]) || 0);
            update[`${id}_weapon_strike`] = weapon_strike;
            // Damage: calculating dice and total fixed damage
            update[`${id}_damage_dice`] = (parseInt(values[`${id}_damage_dice`]) || 0);
            if((parseInt(values[`${id}_damage_dice_size`].replace(/[^\d]/gi,"")) || 0)) {
                update[`${id}_damage_dice_size`] = `D${parseInt(values[`${id}_damage_dice_size`].replace(/[^\d]/gi,""))}`;
            } else {
                update[`${id}_damage_dice_size`] = "D0";
            }
            let damage_dice = `${update[`${id}_damage_dice`]}${update[`${id}_damage_dice_size`]}`;
            let damage_bonus = damage_ability
                + (parseInt(values[`${id}_damage_weapon_specialization`]) || 0)
                + (parseInt(values[`${id}_damage_temporary`]) || 0)
                + (parseInt(values[`${id}_damage_other`]) || 0);
            // Attack display
            update[`${id}_weapon_display`] = `${update[`${id}_weapon_proficiency_display`] || ""} ${weapon_strike < 0 ? "" : "+"}${weapon_strike}${(values[`${id}_weapon_traits`] || "").length ? " ("+values[`${id}_weapon_traits`]+")" : ""}`.trim();
            // Damage display
            update[`${id}_damage_display`] = `${damage_dice == "0D0" ? "" : damage_dice}${damage_bonus < 0 ? "" : "+"}${damage_bonus}${values[`${id}_damage_b`] == "1" ? " "+getTranslationByKey("b").toUpperCase() : ""}${values[`${id}_damage_p`] == "1" ? " "+getTranslationByKey("p").toUpperCase() : ""}${values[`${id}_damage_s`] == "1" ? " "+getTranslationByKey("s").toUpperCase() : ""}${(values[`${id}_damage_effects`] || "").length ?  " "+getTranslationByKey("plus")+" "+values[`${id}_damage_effects`] : ""}${(values[`${id}_damage_additional`] || "").length ?  " "+getTranslationByKey("plus")+" "+values[`${id}_damage_additional`] : ""}`;
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
            update[`${id}_weapon_roll`] = "{{roll01_name=^{attack}}} {{roll01=[[1d20cs20cf1 + [@{weapon_proficiency_display}] @{weapon_strike}[@{text_modifier}] + (@{query_roll_bonus})[@{text_bonus}]]]}} {{roll01_type=attack}} {{roll01_info=@{weapon_traits}}} {{roll01_critical=1}}";
            update[`${id}_damage_roll`] = `{{roll02_name=^{damage}}} {{roll02=[[@{damage_dice_query}@{damage_dice_size} + @{damage_ability}[@{text_ability_modifier}] + @{damage_weapon_specialization}[${(getTranslationByKey("weapon specialization") || "").toUpperCase()}] + @{damage_temporary}[${(getTranslationByKey("temp") || "").toUpperCase()}] + @{damage_other}[${(getTranslationByKey("other") || "").toUpperCase()}] + @{query_roll_damage_bonus}[@{text_roll_damage_bonus}]]]}} {{roll02_type=damage}} {{roll02_info=@{damage_info}}}`;
            update[`${id}_damage_critical_roll`] = `{{roll03_name=^{critical_damage}}} {{roll03=[[(@{damage_dice_query}@{damage_dice_size} + @{damage_ability}[@{text_ability_modifier}] + @{damage_weapon_specialization}[${(getTranslationByKey("weapon specialization") || "").toUpperCase()}] + @{damage_temporary}[${(getTranslationByKey("temp") || "").toUpperCase()}] + @{damage_other}[${(getTranslationByKey("other") || "").toUpperCase()}] + @{query_roll_damage_bonus}[@{text_roll_damage_bonus}])*2]]}} {{roll03_type=critical-damage}} {{roll03_info=@{damage_info}}}`;
            // Critical damage roll option handling
            switch (critoption) {
                case "none":
                    update[`${id}_roll_critical_damage`] = " "; // no critical damage roll
                    break
                case "button":
                    update[`${id}_roll_critical_damage`] = "@{roll_critical_damage_button}"; // chat button
                    break
                case "auto":
                    update[`${id}_roll_critical_damage`] = "@{damage_critical_roll}"; // auto roll critical damage
                    break
                default:
                    update[`${id}_roll_critical_damage`] = "@{damage_critical_roll}"; // auto roll critical damage
            }
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
            update["perception_proficiency_display"] = calcProficiencyDisplay(values["perception_rank"]);
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
            update["class_dc_proficiency_display"] = calcProficiencyDisplay(values["class_dc_rank"]);
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
            update["spell_attack_proficiency_display"] = calcProficiencyDisplay(values["spell_attack_rank"]);
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
            update["spell_dc_proficiency_display"] = calcProficiencyDisplay(values["spell_dc_rank"]);
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
            // update[`magic_tradition_${tradition}_proficiency_display`] = calcProficiencyDisplay(values[`magic_tradition_${tradition}_rank`]);
        }
        return update;
    };

    // === SPELLS: SPELL
    const updateSpell = function(row, attr, callback) {
        console.log(`%c Update spell ${attr}`, "color:purple;font-size:14px;");
        let fields = global_attributes_by_category["spells_calculation_attributes"];
        fields.push(`${row}magic_tradition`);
        getAttrs(fields, (values) => {
            setAttrs(calcSpell(row,values), {silent: true}, () => {
                if(callback) {
                    callback();
                }
            });
        });
    };
    const calcSpell = function(row, values) {
        /*
            Calculating DC (dc) and Attack (spellattack) value based on chosen magic tradition:
            If no magic tradition has been chosen on the spell, then standard spell DC (spell_dc) and standard spell attack (spell_attack) are used.
            Otherwise (a magic tradition has been selected for the spell), a specifi spell base DC and attack are calcuted based on magic tradition proficiency and relative (DC or Attack) ability modifiers and temporary bonuses.
            In a future version, full magic tradition attack and DC should be calcultared with their own ability modifiers and temporary bonuses (ie a full setting section for each magic tradition, with notes and all)
        */
        let update = {};
        let tradition = (values[`${row}magic_tradition`] || "empty-string");
        if((values["sheet_type"] || "").toLowerCase() == "npc") { // NPC
            update[`${row}spellattack`] = values["spell_attack"];
            update[`${row}spell_dc`] = values["spell_dc"];
        } else { // PC
            if(tradition == "empty-string") {
                update[`${row}spellattack`] = values["spell_attack"];
                update[`${row}spelldc`] = values["spell_dc"];
            } else {
                update[`${row}spellattack`] = (parseInt(values[`magic_tradition_${tradition}_proficiency`]) || 0)
                + (parseInt(values[`spell_attack_key_ability`]) || 0)
                + (parseInt(values[`spell_attack_temporary`]) || 0);
                update[`${row}spelldc`] = 10
                + (parseInt(values[`magic_tradition_${tradition}_proficiency`]) || 0)
                + (parseInt(values[`spell_dc_key_ability`]) || 0)
                + (parseInt(values[`spell_dc_temporary`]) || 0);
            }
        }
        // critical damage roll option
        switch (values["roll_option_critical_damage"] || "auto") {
            case "none":
                update[`${row}roll_critical_damage`] = " "; // no critical damage roll
                break
            case "button":
                update[`${row}roll_critical_damage`] = "@{roll_critical_damage_button}"; // chat button
                break
            case "auto":
                update[`${row}roll_critical_damage`] = "@{damage_critical_roll}"; // auto roll critical damage
                break
            default:
                update[`${row}roll_critical_damage`] = "@{damage_critical_roll}"; // auto roll critical damage
        }
        return update;
    };

    // === SPELLS: DROP
    const updateSpellDrop = function(section, rawdata) {
        // Checking dropped data from comendium for spell building
        let cdata;
        try{
            cdata = JSON.parse(rawdata) || {};
        }
        catch(error){
            cdata = {};
            console.log(`%c Pathfinder Second Edition by Roll20: drop on ${section}: no valid data`, "color:red;font-size:14px;");
        }
        if(_.isEmpty(cdata)) {
            console.log(`%c Pathfinder Second Edition by Roll20: drop on ${section}: empty data`, "color:red;font-size:14px;");
        } else {
            // console.log(`%c PF2E Debug: Spell data: ${JSON.stringify(cdata,null,"  ")}`, "color:purple;font-size:12px;");
            if(cdata["Category"] && (cdata["Category"].trim().toLowerCase() === "spells")) {
                let fields = global_attributes_by_category["spells_calculation_attributes"];
                fields.push(`${section}_spelldrop_name`,`${section}_spelldrop_uniq`,`sort_${section}`);
                getAttrs(fields, (values) => {
                    if(values[`${section}_spelldrop_name`]) {
                        let row = `repeating_${section}_${generateRowID()}_`, spell_data = {}, update = {};
                        spell_data["name"] = values[`${section}_spelldrop_name`];
                        spell_data["data"] = cdata;
                        // Base properties
                        update[`${row}name`] = spell_data["name"];
                        update[`${row}toggles`] = "display,";
                        // Extended properties from Compendium
                        _.extend(update,calcDroppedSpell(row,spell_data,values,(values["sheet_type"] === "npc")));
                        // Calculate final spell details
                        _.extend(values,update); // add eventual calculated attributes necessary for calcSpell()
                        _.extend(update,calcSpell(row,values));
                        // Clean dropping attributes
                        update[`${section}_spelldrop_name`] = "";
                        update[`${section}_spelldrop_uniq`] = "";
                        update[`${section}_spelldrop_data`] = "";
                        // Record everything
                        setAttrs(update,{silent: true}, () => {
                            // Re-sorting the spell section
                            sortSpells(section, values[`sort_${section}`]);
                        });
                    }
                });
            }
        }
    };
    const calcDroppedSpell = function(row, spell_data, values = {}, is_npc = false) {
        /*
            Complete an existing spell with compendium data.
            Parameters:
            - row: `repeating_section_id_`
            - spell_data: object from compendium page (with blobs)
            - values: additional needed data
            - is_npc: NPC character or not
        */
        let update = {};
        let cast_actions = {
            "one-action": "1-action",
            "two-action": "2-action",
            "three-action": "3-action",
            "1-to-3 actions": "1-to-3-actions",
            "reaction": "reaction",
            "free-action": "free_action"
        };
        if(spell_data && spell_data.name && spell_data.data && spell_data.data.blobs) {
            let blob = spell_data.data.blobs[spell_data.name];
            if(blob) {
                // Using data from Compendium
                Object.keys(blob).forEach(key => {
                    switch(key) {
                        case "magic_traditions":
                            update[`${row}magic_tradition`] = (blob[key].split(",")[0] || "").trim();
                            break;
                        case "cast_actions":
                            update[`${row}cast_actions`] = (cast_actions[blob[key].trim().toLowerCase()] || "1-action");
                            break;
                        case "cast_detail_label":
                            update[`${row}cast_detail_label`] = blob[key].trim().toLowerCase();
                            break;
                        case "data-attack":
                            if(blob[key] && blob[key].trim().toLowerCase() == "true") {
                                update[`${row}${is_npc ? "npc_" : ""}attack_checkbox`] = `@{${is_npc ? "npc_" : ""}attack_roll}`;
                            }
                            break;
                        case "damage":
                            update[`${row}damage_dice`] = blob[key];
                            update[`${row}damage_checkbox`] = "@{damage_roll}";
                            break;
                        case "data-damage_add_ability":
                            if(!is_npc && String(blob[key]).toLowerCase().trim() === "true" ) {
                                update[`${row}damage_ability`] = (values["spell_attack_key_ability_select"] || "");
                            }
                            break;
                        case "damage_additional":
                            update[`${row}damage_additional`] = blob[key].replace(global_rollregex,"[[$1]]");
                            break;
                        case "saving_throw":
                            if(["basic","normal"].includes(blob[key].trim().toLowerCase())) {
                                update[`${row}${is_npc ? "npc_" : ""}saving_throw_select`] = `@{${is_npc ? "npc_" : ""}save_roll${blob[key].trim().toLowerCase() === "basic" ? "_basic" : ""}}`;
                            } else {
                                update[`${row}${is_npc ? "npc_" : ""}saving_throw_select`] = "";
                            }
                            break;
                        case "level":
                            if(!values[`${row}spelllevel`]) {
                                update[`${row}spelllevel`] = blob[key];
                                update[`${row}current_level`] = blob[key];
                            }
                        default:
                            if(global_attributes_by_category["spells_fields"].includes(key) && !values[`${row}${key}`]) {
                                update[`${row}${key}`] = blob[key];
                            }
                            break;
                    }
                });
                // Default empty values
                global_attributes_by_category["spells_fields"].forEach(attribute => {
                    if(!(values[`${row}${attribute}`] || update[`${row}${attribute}`])) {
                        if(!["toggles","name"].includes(attribute)){
                            if(attribute === "saving_throw_select") {
                                update[`${row}${attribute}`] = "none";
                            } else {
                                update[`${row}${attribute}`] = attribute.includes("check") ? "0" : "";
                            }
                        }
                    }
                });
            }
        }
        return update;
    };

    //== SPELLS: sorting
    const sortSpells = function(section, sorting) {
        if(sorting === "name") {
            sortRepeatingSection(section, global_attributes_by_category["spells_fields"], ["name"]);
        } else if (sorting === "name_desc") {
            sortRepeatingSection(section, global_attributes_by_category["spells_fields"], [{name:"name", reverse:true}]);
        } else if (sorting === "level") {
            sortRepeatingSection(section, global_attributes_by_category["spells_fields"], [{name:"current_level",primer: parseInt},"name"]);
        } else if (sorting === "level_desc") {
            sortRepeatingSection(section, global_attributes_by_category["spells_fields"], [{name:"current_level", primer:parseInt, reverse:true},"name"]);
        }
    };

    // === BULK
    const updateEncumbrance = function(attr) {
        console.log(`%c Update Encumbrance ${attr}`, "color:purple;font-size:14px;");
        getAttrs(global_attributes_by_category["encumbrance_attributes"], (values) => {
            setAttrs(calcEncumbrance(values), {silent: true});
        });
    };
    const calcEncumbrance = function(values) {
        let update = {};
        update["encumbered_base"] = 5
            + (parseInt(values["strength_modifier"]) || 0)
            + (parseInt(values["encumbered_modifier"]) || 0);
        update["maximum_base"] = 10
            + (parseInt(values["strength_modifier"]) || 0)
            + (parseInt(values["maximum_modifier"]) || 0);
        return update;
    };
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

    // == Character Compendium Drops
    const completeCharacterWithCompendium = function(character_object, callback) {
        /*
            Completes a character with data from the Compendium.
            Parameters:
                - character_object:
                    * base_character: an object (simple keys/values) with some usefull data from the character
                    * compendium_spells: array of objects. Each one being {row: `repeating_section_id_`, name: name of the spell}
                    * more to come ? (compendium_feats, compendium_items ... ?)
                - optional callback function
        */
        let update = {}, pages = [], fields = ["spell_attack_key_ability_select","sheet_type"];
        getAttrs(fields, (values) => {
            let is_npc = ((values["sheet_type"] || "pc") === "npc");
            _.extend(values,character_object.base_character); // merging character data and other usefull fields
            // Gather all necessary compendium pages names
            if(character_object["compendium_spells"] && character_object["compendium_spells"].length) {
                pages.push(...character_object.compendium_spells.map(spell => "Spells:" + toTitleCase((spell["name"] || "").trim())));
            }
            getCompendiumPage(pages, (compendium_data) => {
                let compendium_data_array = [];
                if(Array.isArray(compendium_data)) {
                    compendium_data_array = compendium_data;
                } else if(typeof compendium_data === "object" && compendium_data.id) { // Single page object loaded from the compendium
                    compendium_data_array.push(compendium_data);
                }
                if(character_object["compendium_spells"] && character_object["compendium_spells"].length) {
                    // Spells to be processed
                    character_object.compendium_spells.forEach(spell => {
                        // Find individual spell data in compendium data
                        let spell_data = {};
                        try {
                            spell_data = compendium_data_array.find(o => ((o.name) && (o.name.toLowerCase().trim() === spell.name.toLowerCase().trim()) && (o.data["Category"] === "Spells")));
                        }
                        catch(error) {
                            spell_data = {};
                            console.log(`%c Pathfinder Second Edition by Roll20: completeCharacterWithCompendium: no valid data in compendium data for this spell: ${(spell["name"] || "")}`, "color:red;font-size:14px;");
                        }
                        if(spell_data && spell_data.id && spell_data.data) {
                            _.extend(update,calcDroppedSpell(spell.row, spell_data, values, is_npc));
                        }
                    });
                }
                if(callback) {
                    callback(update);
                } else {
                    return update;
                }
            });
        });
    };
    // === NPC Compendium drops
    const updateNpcDrop = function(rawdata) {
        // Checking dropped data from comendium for NPC building
        let cdata;
        try{
            cdata = JSON.parse(rawdata) || {};
        }
        catch(error){
            cdata = {};
            console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: no valid data`, "color:red;font-size:14px;");
        }
        if(_.isEmpty(cdata)) {
            console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: empty data`, "color:red;font-size:14px;");
        } else {
            // console.log(`%c PF2E Debug: NPC data: ${JSON.stringify(cdata,null,"  ")}`, "color:purple;font-size:12px;");
            if(cdata["Category"] && (cdata["Category"].trim().toLowerCase() === "monsters")) {
                // Initialize NPC & show building splash
                setAttrs({"sheet_type": "npc","build_message": (getTranslationByKey("building_npc") || "BUILDING")},{silent: true}, ()=>{
                    getAttrs(["npcdrop_name","npcdrop_uniq","toggles"], (values) => {
                        // Do 2 setAttrs: one "quick", one "long" (after getCompendiumPages), to avoid setTokenAttrs timeout
                        let npc_object = calcNpcDrop(cdata,values);
                        setAttrs(npc_object.base_character,{silent: true}, () => {
                            updateDefaultToken(() => { // Setting token size, bars
                                // Dealing with Compendium Pages (completing spells ...)
                                completeCharacterWithCompendium(npc_object, (character_update) => {
                                    // -- Hide building splash
                                    character_update["build_message"] = "";
                                    setAttrs(character_update, {silent:true}, () => {
                                        toggleStringBuilder(npc_object["toggles"], () => {
                                            totalUpdate(); // Global NPC recalculation
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        }
    };
    const calcNpcDrop = function (cdata,values) {
        // Budiling / Updating an NPC character with dropped data from the compendium
        let update = {}, row = "", obj_array = [];
        // Base NPC information
        if(values["npcdrop_name"]) {
            update["character_name"] = values["npcdrop_name"];
        }
        if(values["npcdrop_uniq"]) {
            update["npc_fromcompendium"] = values["npcdrop_uniq"];
        } else {
            update["npc_fromcompendium"] = "Monsters:" + values["npcdrop_name"];
        }
        // === Basic non repeating informations
        global_npc_attributes.basics.forEach((attr) => {
            if(cdata[attr]) {
                update[`${attr}`] = cdata[attr];
            }
        });
        // === Repeating data
        // -- Lore skills
        if(cdata["data-lore"]) {
            try{
                obj_array = JSON.parse(cdata["data-lore"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid lore`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                obj_array.forEach((obj) => {
                    row = `repeating_lore_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}lore_name`] = (obj["lore_name"] || getTranslationByKey("lore").toUpperCase());
                    update[`${row}lore`] = (obj["lore"] || "0");
                    update[`${row}lore_notes`] = (obj["lore_notes"] || "");
                });
            }
        }
        // -- Items
        if(cdata["data-items"]) {
            try{
                obj_array = JSON.parse(cdata["data-items"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid items`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                obj_array.forEach((obj) => {
                    row = `repeating_items-worn_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}worn_item`] = (obj["item"] || getTranslationByKey("item").toUpperCase());
                    update[`${row}description`] = (obj["description"] || "");
                });
            }
        }
        // -- Interaction abilities
        if(cdata["data-interaction-abilities"]) {
            try{
                obj_array = JSON.parse(cdata["data-interaction-abilities"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid interaction abilities`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                obj_array.forEach((obj) => {
                    row = `repeating_interaction-abilities_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}name`] = (obj["name"] || getTranslationByKey("ability").toUpperCase());
                    update[`${row}traits`] = (obj["traits"] || "");
                    update[`${row}description`] = (obj["description"] || "");
                });
            }
        }
        // -- Free actions reactions (automatic and reactive abilities)
        if(cdata["data-free-actions-reactions"]) {
            try{
                obj_array = JSON.parse(cdata["data-free-actions-reactions"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid actions reactions`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                obj_array.forEach((obj) => {
                    row = `repeating_free-actions-reactions_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}name`] = (obj["name"] || getTranslationByKey("ability").toUpperCase());
                    update[`${row}action_type`] = "";
                    if((obj["free_action"] || "")) {
                        update[`${row}free_action`] = "free action";
                        update[`${row}action_type`] = update[`${row}action_type`] + toTitleCase(getTranslationByKey("free_action"));
                    }
                    if((obj["reaction"] || "")) {
                        update[`${row}reaction`] = "reaction";
                        update[`${row}action_type`] = update[`${row}action_type`] + " " + toTitleCase(getTranslationByKey("reaction"));
                    }
                    update[`${row}action_type`] = update[`${row}action_type`].trim();
                    update[`${row}traits`] = (obj["traits"] || "");
                    update[`${row}source`] = (obj["source"] || "");
                    update[`${row}trigger`] = (obj["trigger"] || "");
                    update[`${row}description`] = (obj["description"] || "");
                });
            }
        }
        // -- Melee strikes
        if(cdata["data-melee-strikes"]) {
            try{
                obj_array = JSON.parse(cdata["data-melee-strikes"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid melee strikes`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                obj_array.forEach((obj) => {
                    row = `repeating_melee-strikes_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}weapon`] = (obj["weapon"] || getTranslationByKey("weapon").toUpperCase());
                    update[`${row}weapon_strike`] = (obj["weapon_strike"] || "+0");
                    update[`${row}weapon_traits`] = (obj["weapon_traits"] || "");
                    update[`${row}weapon_strike_damage`] = (obj["weapon_strike_damage"] || "+0");
                    update[`${row}weapon_strike_damage_type`] = (obj["weapon_strike_damage_type"] || "");
                    update[`${row}weapon_strike_damage_additional`] = (obj["weapon_strike_damage_additional"] || "").replace(global_rollregex,"[[$1]]");
                    update[`${row}weapon_notes`] = (obj["weapon_notes"] || "");
                });
            }
        }
        // -- Ranged strikes
        if(cdata["data-ranged-strikes"]) {
            try{
                obj_array = JSON.parse(cdata["data-ranged-strikes"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid ranged strikes`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                obj_array.forEach((obj) => {
                    row = `repeating_ranged-strikes_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}weapon`] = (obj["weapon"] || getTranslationByKey("weapon").toUpperCase());
                    update[`${row}weapon_strike`] = (obj["weapon_strike"] || "+0");
                    update[`${row}weapon_traits`] = (obj["weapon_traits"] || "");
                    update[`${row}weapon_strike_damage`] = (obj["weapon_strike_damage"] || "+0");
                    update[`${row}weapon_strike_damage_type`] = (obj["weapon_strike_damage_type"] || "");
                    update[`${row}weapon_strike_damage_additional`] = (obj["weapon_strike_damage_additional"] || "").replace(global_rollregex,"[[$1]]");
                    update[`${row}weapon_range`] = (obj["weapon_range"] || "");
                    update[`${row}weapon_notes`] = (obj["weapon_notes"] || "");
                });
            }
        }
        // -- Actions activities (Offensive or Proactive abilities)
        if(cdata["data-actions-activities"]) {
            try{
                obj_array = JSON.parse(cdata["data-actions-activities"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid actions activities (offensive or proactive abilities)`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                obj_array.forEach((obj) => {
                    row = `repeating_actions-activities_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}name`] = (obj["name"] || getTranslationByKey("ability").toUpperCase());
                    update[`${row}actions`] = (obj["actions"] || "");
                    update[`${row}traits`] = (obj["traits"] || "");
                    update[`${row}source`] = (obj["source"] || "");
                    update[`${row}description`] = (obj["description"] || "");
                });
            }
        }
        // === Spell/spellcaster handling
        let is_spellcaster = false;
        let spells_array = [0,0,0,0,0,0,0,0,0,0]; // number of spells per level (1 to 10)
        let compendium_spells = [];
        let toggles = "";
        // -- Innate Spells
        if(cdata["data-spellinnate"]) {
            try{
                obj_array = JSON.parse(cdata["data-spellinnate"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid innate spells`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                is_spellcaster = true;
                obj_array.forEach((obj) => {
                    row = `repeating_spellinnate_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}name`] = (obj["name"] || getTranslationByKey("spell").toUpperCase()).trim();
                    update[`${row}spelllevel`] = (obj["spelllevel"] || "0");
                    update[`${row}current_level`] = update[`${row}spelllevel`];
                    update[`${row}spelldc`] = (obj["spelldc"] || "0");
                    update[`${row}domain`] = (obj["domain"] || "");
                    update[`${row}description`] = (obj["description"] || "");
                    if(obj["name"]) { // Collecting names for getCompendium page.
                        compendium_spells.push({
                            name: obj["name"].trim(),
                            row: row
                        });
                    }
                });
            }
        } else {
            update["toggle_innate"] = "0";
            toggles += "innate,";
        }
        // -- Focus spells
        if((cdata["casts_focus"] || "false").toLowerCase() == "true") {
            is_spellcaster = true;
        }
        if(cdata["data-spellfocus"]) {
            try{
                obj_array = JSON.parse(cdata["data-spellfocus"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid focus spells`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                is_spellcaster = true;
                obj_array.forEach((obj) => {
                    row = `repeating_spellfocus_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}name`] = (obj["name"] || getTranslationByKey("spell").toUpperCase()).trim();
                    update[`${row}spelllevel`] = (obj["spelllevel"] || "0");
                    update[`${row}current_level`] = update[`${row}spelllevel`];
                    update[`${row}spelldc`] = (obj["spelldc"] || "0");
                    update[`${row}domain`] = (obj["domain"] || "");
                    update[`${row}description`] = (obj["description"] || "");
                    if(obj["name"]) { // Collecting names for getCompendium page.
                        compendium_spells.push({
                            name: obj["name"].trim(),
                            row: row
                        });
                    }
                });
            }
        } else {
            update["toggle_focus"] = "0";
            toggles += "focus,";
        }
        // -- Cantrips
        if((cdata["casts_cantrips"] || "false").toLowerCase() == "true") {
            is_spellcaster = true;
        }
        if(cdata["data-cantrip"]) {
            try{
                obj_array = JSON.parse(cdata["data-cantrip"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid cantrips`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                is_spellcaster = true;
                update["cantrips_per_day"] = obj_array.length;
                obj_array.forEach((obj) => {
                    row = `repeating_cantrip_${generateRowID()}_`;
                    update[`${row}toggles`] = "display,";
                    update[`${row}name`] = (obj["name"] || getTranslationByKey("spell").toUpperCase()).trim();
                    update[`${row}spelllevel`] = (obj["spelllevel"] || "0");
                    update[`${row}current_level`] = update[`${row}spelllevel`];
                    update[`${row}spelldc`] = (obj["spelldc"] || "0");
                    if(obj["type"] && global_magic_traditions.includes(obj["type"].trim().toLowerCase())) {
                        update[`${row}magic_tradition`] = obj["type"];
                    } else if(obj["magic_tradition"] && global_magic_traditions.includes(obj["magic_tradition"].trim().toLowerCase())) {
                        update[`${row}magic_tradition`] = obj["magic_tradition"];
                    }
                    if(obj["frequency"] && global_spell_frequencies.includes(obj["frequency"].trim().toLowerCase())) {
                        update[`${row}frequency`] = obj["frequency"];
                    }
                    update[`${row}uses_max`] = (obj["uses_max"] || "0");
                    update[`${row}uses`] = update[`${row}uses_max`];
                    update[`${row}description`] = (obj["description"] || "");
                    if(obj["name"]) { // Collecting names for getCompendium page.
                        compendium_spells.push({
                            name: obj["name"].trim(),
                            row: row
                        });
                    }
                });
            }
        } else {
            update["toggle_cantrips"] = "0";
            toggles += "cantrips,";
        }
        // --- Prepared and Spontaneous Spells, level 1 to 10
        if(cdata["spellcaster_prepared"] && cdata["spellcaster_prepared"].trim().toLowerCase() !== "false") {
            is_spellcaster = true;
            update["spellcaster_prepared"] = "prepared";
        }
        if(cdata["spellcaster_spontaneous"] && cdata["spellcaster_spontaneous"].trim().toLowerCase() !== "false") {
            is_spellcaster = true;
            update["spellcaster_spontaneous"] = "spontaneous";
        }
        if(cdata["data-spell"]) {
            try{
                obj_array = JSON.parse(cdata["data-spell"]);
            }
            catch(error) {
                obj_array = [];
                console.log(`%c Pathfinder Second Edition by Roll20: npcdrop_data: invalid spell`, "color:red;font-size:14px;");
            }
            if(obj_array.length) {
                is_spellcaster = true;
                let spellvl = 1;
                obj_array.forEach((obj) => {
                    spellvl = parseInt((obj["spelllevel"] || "1"));
                    spells_array[spellvl-1]++;
                    row = `repeating_normalspells_${generateRowID()}_`;
                    // attributes
                    update[`${row}toggles`] = "display,";
                    update[`${row}name`] = (obj["name"] || getTranslationByKey("spell").toUpperCase()).trim();
                    update[`${row}spelllevel`] = spellvl;
                    update[`${row}current_level`] = spellvl;
                    update[`${row}spelldc`] = (obj["spelldc"] || "0");
                    if(obj["type"] && global_magic_traditions.includes(obj["type"].trim().toLowerCase())) {
                        update[`${row}magic_tradition`] = obj["type"];
                    } else if(obj["magic_tradition"] && global_magic_traditions.includes(obj["magic_tradition"].trim().toLowerCase())) {
                        update[`${row}magic_tradition`] = obj["magic_tradition"];
                    }
                    if(obj["frequency"] && global_spell_frequencies.includes(obj["frequency"].trim().toLowerCase())) {
                        update[`${row}frequency`] = obj["frequency"];
                    }
                    update[`${row}uses_max`] = (obj["uses_max"] || "0");
                    update[`${row}uses`] = update[`${row}uses_max`];
                    update[`${row}description`] = (obj["description"] || "");
                    if(obj["name"]) { // Collecting names for getCompendium page.
                        compendium_spells.push({
                            name: obj["name"].trim(),
                            row: row
                        });
                    }
                });
            }
        } else {
            update["toggle_normalspells"] = "0";
            toggles += "normalspells,";
        }
        // -- Spells per level (1 to 10)
        if(is_spellcaster) {
            // Activating (or not) spell sections, and spells per day
            for (let i = 0; i < 10; i++) {
                if(cdata[`level_${i+1}_per_day_max`] && (parseInt(cdata[`level_${i+1}_per_day_max`]) || 0) > 0) {
                    update[`casts_level_${i+1}`] = "1";
                    update[`level_${i+1}_per_day`] = parseInt(cdata[`level_${i+1}_per_day_max`]);
                    update[`level_${i+1}_per_day_max`] = parseInt(cdata[`level_${i+1}_per_day_max`]);
                } else {
                    update[`casts_level_${i+1}`] = (parseInt(spells_array[i]) || 0) > 0 ? "1" : "0";
                    update[`level_${i+1}_per_day`] = spells_array[i];
                    update[`level_${i+1}_per_day_max`] = spells_array[i];
                }
            }
        }
        // -- Rituals: TBC when sheet updated with rituals
        // === Final calculations
        if(is_spellcaster) { // make sure the spell/magic sections is visible
            update["toggles"] = (values["toggles"] || "") + "npcspellcaster,";
        }
        update["hit_points"] = (update["hit_points_max"] || 0);
        update["focus_points"] = (update["focus_points_max"] || 0);
        // -- End / return
        let obj_npc = {};
        obj_npc["base_character"] = update;
        obj_npc["compendium_spells"] = compendium_spells;
        obj_npc["toggles"] = toggles;
        return obj_npc;
    };
    const updateDefaultToken = function(callback) {
        // === Token default attributes handling
        getAttrs(["size","settings_bar1value","settings_bar1max","settings_bar1link","settings_bar2value","settings_bar2max","settings_bar2link","settings_bar3value","settings_bar3max","settings_bar3link"], (settings) => {
            let default_attr = {};
            // SIZE
            default_attr["width"] = 70;
            default_attr["height"] = 70;
            if(settings["size"]) {
                let squares = 1.0;
                let squarelength = 70;
                let obj_size = global_sizes.find((size_item) => size_item.size === settings["size"].toLowerCase());
                if(! _.isEmpty(obj_size)) {
                    squares = Math.max((parseFloat(obj_size.squares) || 1.0), 1.0);
                }
                let squaresize = parseInt(squarelength * squares);
                default_attr["width"] = squaresize;
                default_attr["height"] = squaresize;
            }
            // === BARS
            let getList = {}, keyword = "";
            for(let x = 1; x < 4; x++) {
                ["value","max"].forEach(word => {
                    keyword = `settings_bar${x}${word}`;
                    if(settings[keyword]) {
                        getList[keyword] = settings[keyword];
                    }
                });
            }
            let fields = [];
            fields = fields.concat(_.values(getList));
            getAttrs(fields, (values) =>  {
                // Bar 1
                if(settings["settings_bar1link"]) {
                    default_attr["bar1_link"] = settings["settings_bar1link"];
                } else if(settings["settings_bar1value"] || settings["settings_bar1max"]) {
                    if(settings["settings_bar1value"] && values[settings["settings_bar1value"]]) {
                        default_attr["bar1_value"] = values[settings["settings_bar1value"]];
                    }
                    if(settings["settings_bar1max"] && values[settings["settings_bar1max"]]) {
                        default_attr["bar1_max"] = values[settings["settings_bar1max"]];
                    }
                }
                // Bar 2
                if(settings["settings_bar2link"]) {
                    default_attr["bar2_link"] = settings["settings_bar2link"];
                } else if(settings["settings_bar2value"] || settings["settings_bar2max"]) {
                    if(settings["settings_bar2value"] && values[settings["settings_bar2value"]]) {
                        default_attr["bar2_value"] = values[settings["settings_bar2value"]];
                    }
                    if(settings["settings_bar2max"] && values[settings["settings_bar2max"]]) {
                        default_attr["bar2_max"] = values[settings["settings_bar2max"]];
                    }
                }
                // Bar 3
                if(settings["settings_bar3link"]) {
                    default_attr["bar3_link"] = settings["settings_bar3link"];
                } else if(settings["settings_bar3value"] || settings["settings_bar3max"]) {
                    if(settings["settings_bar3value"] && values[settings["settings_bar3value"]]) {
                        default_attr["bar3_value"] = values[settings["settings_bar3value"]];
                    }
                    if(settings["settings_bar3max"] && values[settings["settings_bar3max"]]) {
                        default_attr["bar3_max"] = values[settings["settings_bar3max"]];
                    }
                }
                setDefaultToken(default_attr);
                if(callback) {
                    callback();
                }
            });
        });
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
        , updateEncumbrance: updateEncumbrance
        , updateBulk: updateBulk
        , updateNpcDrop: updateNpcDrop
        , sortSpells: sortSpells
        , updateSpellDrop: updateSpellDrop
        , toTitleCase: toTitleCase
    }

})();
/* === MODULE ENDS === */
