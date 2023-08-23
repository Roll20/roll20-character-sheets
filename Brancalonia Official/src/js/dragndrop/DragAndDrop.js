const filterBlobs = function(blobs, filters) {
    var remove = filters.multiclass ? "no" : "yes";
    var results = {};
    delete filters.multiclass;
    delete filters.slide;
    _.each(blobs, function(blob, name) {
        var match = true;
        if(blob.Group && !filters.Group && !filters.name) match = false;
        _.each(filters, function(v, k) {
            if(k == "name") {
                if(name != v) match = false;
            } else if(v[0] === "<" && !isNaN(parseInt(v.substring(1)))) {
                let blobval = isNaN(parseInt(blob[k])) ? 0 : parseInt(blob[k]);
                if(blobval > parseInt(v.substring(1))) match = false;
            } else {
                if(blob[k] != v) match = false;
            }
        });
        if(match && name.split("(")[0].toLowerCase() != "spell slots") results[name] = blob;
    });
    _.each(results, function(blob, name) {
        if(blob.Multiclass == remove) {
            delete results[name];
        }
    });
    return results;
};

on("change:drop_name", function(eventinfo) {
    if(eventinfo.newValue === "Monsters") {
        getAttrs(["class","race","speed","hp"], function(v) {
            if(v["class"] != "" || v["race"] != "" || v["speed"] != "" || v["hp"] != "") {
                setAttrs({monster_confirm_flag: 1});
            }
            else {
                handle_drop(eventinfo.newValue);
            }
        });
    }
    else {
        handle_drop(eventinfo.newValue);
    }
});

var handle_drop = function(category, eventinfo) {
    getAttrs(["speed", "hp_max", "hp", "drop_name", "drop_data", "drop_content", "character_id", "npc_legendary_actions", "strength_mod", "dexterity_mod", "npc", "base_level", "strength_base", "dexterity_base", "constitution_base", "wisdom_base", "intelligence_base", "charisma_base", "class_resource_name", "other_resource_name", "multiclass1_lvl", "multiclass2_lvl", "multiclass3_lvl"], function(v) {
        var pagedata = {};
        try {
            pagedata = JSON.parse(v.drop_data);
        } catch(e) {
            pagedata = v.drop_data;
        }
        var page = {
            name: v.drop_name,
            data: pagedata,
            content: v.drop_content
        };
        var category = page.data["Category"];
        get_repeating_data(function(repeating) {
            var results = processDrop(page, v, repeating);
            setAttrs(results.update, {silent: true}, function() {results.callbacks.forEach(function(callback) {callback(); })} );
        });

    });

};

var processDrop = function(page, currentData, repeating, looped) {
    var numUses = function(uses_string) {
        uses_string = parseValues(uses_string);

        var terms = uses_string.split("+");
        var total = 0;
        _.each(terms, function(term) {
            total += parseInt(term);
        });
        return uses_string === "" || uses_string === "-" ? uses_string : total;
    };
    var parseValues = function(uses_string) {
        var attribs = ["strength", "dexterity", "constitution", "wisdom", "intelligence", "charisma"];
        uses_string = uses_string ? uses_string.toLowerCase() : "";
        _.each(attribs, function(attrib) {
            var attribMod = Math.floor((parseInt(currentData[attrib + "_base"]) - 10) / 2);
            if (attribMod < 0 || isNaN(attribMod)) attribMod = 0;
            uses_string = uses_string.replace(attrib, attribMod);
        });
        uses_string = uses_string.replace(/half_level/g, Math.floor(classlevel/2));
        return uses_string.replace(/level/g, classlevel);
    };
    const category = page.data["Category"];
    let callbacks = [];
    let update = {};
    let blobs = {};
    let classlevel = currentData.base_level ? parseInt(currentData.base_level) : 1;
    repeating.traits = repeating.traits ? repeating.traits : [];
    ["drop_category", "drop_name", "drop_data", "drop_content"].forEach(attr => update[attr] = "");

    const coreDrops = ['Classes', 'Backgrounds', 'Feats', 'Items', 'Proficiencies', 'Races', 'Subraces', 'Other Options and Features'];
    if (coreDrops.includes(category)) {
        update["tab"] = "core";
    }

    const assignUpdate = newData => Object.assign(update, newData);

    const processItems = () => {
        try {
            const itemType = page.data["Item Type"] ? page.data["Item Type"] : category;
            const npc = currentData.npc === "0" ? false : true;

            if (!npc) {
                let newObject = new Item(page.name)

                page.data["itemcount"] ? newObject.attributes.itemcount = page.data["itemcount"] : false;

                ["Properties", "Weight"].forEach(attribute => {
                    const attributeLowercase = attribute.toLowerCase();
                    page.data[`${attribute}`] ? newObject.attributes[`item${attributeLowercase}`] = page.data[`${attribute}`] : false
                });

                page.content ? newObject.attributes.itemcontent = page.content : false;

                newObject.attributes.itemmodifiers = dropFunctions.buildItemModString(page)

                //ATTACK items such as Weapons
                itemType.toLowerCase().includes('weapon') ? newObject.attributes.hasattack = 1 : false;

                if (page.data.AC && !looped) {
                    callbacks.push(() => update_ac() );
                }

                if (page.data.Modifiers && page.data.Modifiers != "") { 
                    callbacks.push(() => { 
                        check_itemmodifiers(page.data.Modifiers); 
                    });
                };

                //Create attacks for weapons. Create two attacks for versatile weapons such as Longsword.
                if (newObject.attributes.hasattack === 1) {
                    callbacks.push(() => {
                        page.data["Alternate Damage"] && page.data["Alternate Damage"] !== "" ? create_attack_from_item(newObject.reprowid, {versatile: true}) : create_attack_from_item(newObject.reprowid);
                    });
                }

                if (itemType.toLowerCase() === "ammunition") {
                    newObject.attributes.useasresource = 1
                    callbacks.push(() => { 
                        create_resource_from_item(newObject.reprowid); 
                    });
                }

                if (!looped) {
                    callbacks.push(() => { 
                        update_weight(); 
                    });
                }

                assignUpdate(dropFunctions.updateSheetAttributes(newObject));
            } else if (npc && itemType.toLowerCase().includes("weapon")) {
                const properties = page.data["Properties"] ? page.data["Properties"].toLowerCase() : "none";
                let newObject = new NpcAction(page.name, 'npcaction')
                newObject.addAttack()

                page.data['Item Type'] ? newObject.attributes.attack_type = page.data['Item Type'] : false;
                page.content ? newObject.attributes.description = page.content :  false;

                newObject.attributes.attack_tohit = dropFunctions.buildToHit(page, currentData)

                const damageModifiers = dropFunctions.inferAbilityModifier(page.data["Item Type"], page.data["Properties"], currentData)
                newObject.attributes.attack_damage = dropFunctions.buildDamage(page, damageModifiers)
                page.data["Damage Type"] ? newObject.attributes.attack_damagetype = page.data["Damage Type"] : false;
                page.data["Secondary Damage"] && !page.name.includes('+') ? newObject.attributes.attack_damage2 = page.data["Secondary Damage"] : false;
                page.data["Secondary Damage Type"] && !page.name.includes('+') ? newObject.attributes.attack_damagetype2 = page.data["Secondary Damage Type"] : false;

                properties.includes("versatile") ? newObject.attributes.name = `${newObject.attributes.name} (One-Handed)` : false

                assignUpdate(dropFunctions.updateSheetAttributes(newObject));

                //Versatile creates two attacks
                if (properties.includes("versatile") && (page.data["Alternate Damage"] || page.data["Secondary Damage"])) {
                    let alternateAttack = new NpcAction(`${page.name} (Two-Handed)`, 'npcaction');
                    alternateAttack.addAttack()
                    alternateAttack.attributes.attack_type = newObject.attributes.attack_type;
                    alternateAttack.attributes.description = newObject.attributes.description;

                    if (page.data["Alternate Damage"]) {
                        alternateAttack.attributes.attack_damage = dropFunctions.buildDamage(page, damageModifiers, page.data["Alternate Damage"])
                        page.data["Alternate Damage Type"] ? alternateAttack.attributes.attack_damagetype = page.data["Alternate Damage Type"] : false;
                        page.data["Alternate Secondary Damage"] ? alternateAttack.attributes.attack_damage2 = page.data["Alternate Secondary Damage"] : false;
                        page.data["Alternate Secondary Damage Type"] ? alternateAttack.attributes.attack_damagetype2 = page.data["Alternate Secondary Damage Type"] : false;
                    } else {
                         alternateAttack.attributes.attack_damage = dropFunctions.buildDamage(page, damageModifiers, page.data["Secondary Damage"])
                    }
                
                    assignUpdate(dropFunctions.updateSheetAttributes(alternateAttack));
                }

                if (properties.includes("thrown")) { 
                    let thrownAttack = new NpcAction(`${page.name} (Thrown)`, 'npcaction');
                    thrownAttack.addAttack()
                    page.data["Range"] ? thrownAttack.attributes.attack_range = page.data["Range"] : false;
                    thrownAttack.attributes.attack_type = "Range Weapon";

                    ['description', 'attack_tohit', 'attack_damage', 'attack_damagetype', 'attack_damage2', 'attack_damagetype2'].forEach(attr => {
                        thrownAttack.attributes[`${attr}`] = newObject.attributes[`${attr}`]
                    })

                    assignUpdate(dropFunctions.updateSheetAttributes(thrownAttack));
                }

                if (page.data.Modifiers) {
                    callbacks.push(() => { check_itemmodifiers(page.data.Modifiers);  }, () => { update_npc_action("all"); });
                } else {
                    callbacks.push(() => { update_npc_action("all"); });
                };
            } else {
                warningMessage('processItems', `Only weapon drops are supported for npcs. For npcs, "Item Type" in the Compendium must include the word "weapon".`);
            }
        } catch (error) {
            errorMessage(page.name, error);
        }
    }

    const processSpells = () => {
        try {
            if(page.name) {
                const spellLevel = page.data["Level"] && page.data["Level"] > 0 ? page.data["Level"] : "cantrip";
                const section = `spell-${spellLevel}`
                let existing = {id: false}; 

                for (let [key, value] of Object.entries(repeating[`${section}`])) {
                    value.spellname === page.name ? existing.spellattackid = value.spellattackid : false;
                    value.spellname === page.name ? existing.id = key: false;
                    if(value.spellname === page.name) {
                        ['spellsource', 'innate'].forEach(attributeToKeep => {
                            if(repeating[`${section}`][key][attributeToKeep]) existing[attributeToKeep] = repeating[`${section}`][key][attributeToKeep];
                        });
                    }
                }
    
    
                let newObject = new Spell(page.name, section, existing.id);
                newObject.attributes.spelllevel = spellLevel;
    
                const dropSheetAssocitation = {
                    spelldescription: page.data['data-description'],
                    spellschool: page.data['School'].toLowerCase(),
                    spellclass: page.data['spellclass'],
                    spellsource: (existing.spellsource) ? existing.spellsource : page.data['spellsource'],
                    spellritual: page.data['Ritual'],
                    spelldmgmod: page.data['Add Casting Modifier'],
                    spellcomp_materials: page.data['Material'],
                    spelldamage2: page.data['Secondary Damage'],
                    spellcastingtime: page.data['Casting Time'],
                    spelldamagetype: page.data['Damage Type'],
                    spelldamage: page.data['Damage'],
                    spellduration: page.data['Duration'],
                    spellhealing: page.data['Healing'],
                    spellrange: page.data['Range'],
                    spellsave: page.data['Save'],
                    spellsavesuccess: page.data['Save Success'],
                    spelldamagetype2: page.data['Secondary Damage Type'],
                    spelltarget: page.data['Target'],
                    spellhlbonus: page.data['Higher Spell Slot Bonus'],
                    spellathigherlevels: page.data['Higher Spell Slot Desc'],
                    spellhldie: page.data['Higher Spell Slot Dice'],
                    spellhldietype: page.data['Higher Spell Slot Die'],
                    spellattack: page.data['Spell Attack']
                }
    
                for (let [key, value] of Object.entries(dropSheetAssocitation)) {
                    value ? newObject.attributes[`${key}`] = value : false;
                }
    
                page.data['Spellcasting Ability'] ? newObject.attributes.spell_ability = `@{${page.data['Spellcasting Ability'].toLowerCase()}_mod}+` : false;
                page.data['Concentration'] ? newObject.attributes.spellconcentration  = '{{concentration=1}}' : false;
                if(existing.innate) {
                    newObject.attributes.innate  = existing.innate;
                } else {
                    page.data['Innate'] ? newObject.attributes.innate  = page.data['Innate'] : false;
                }
    
                if (page.data['Components']) {
                    ['v', 's', 'm'].forEach(component => {
                        const componentCheck = dropFunctions.determineComponent(page.data['Components'], component)
                        newObject.attributes[`spellcomp_${component}`] = componentCheck ? componentCheck : 0;
                    })
                }
    
                if (page.data['Damage'] || page.data['Healing']) {
                    newObject.attributes.spelloutput = 'ATTACK'
    
                    callbacks.push(() => {
                        create_attack_from_spell(spellLevel, newObject.reprowid, currentData.character_id, existing.spellattackid);
                    });
                }
    
    
                if (newObject.attributes.spelloutput != 'ATTACK' && page.data['Higher Spell Slot Desc']) {
                    newObject.attributes.rollcontent = dropFunctions.buildSpellQuery(page.data['Level']);
                }
    
                //Character sheet accepts 'dice', 'beam', or none
                if (page.data['data-Cantrip Scaling']) {
                    const validateCantripScaling = dropFunctions.validateCantripScaling(page.data['data-Cantrip Scaling'])
                    if (validateCantripScaling) {
                        newObject.attributes.spell_damage_progression = dropFunctions.buildCantripScaling(page.data['data-Cantrip Scaling'])
                    } else {
                        newObject.attributes.spell_damage_progression = ''
                    }
                }
                const assignedRowID = (newObject.reprowid) ? newObject.reprowid : generateRowID();
                repeating[`${section}`][assignedRowID] = { spellname: page.name };
                assignUpdate(dropFunctions.updateSheetAttributes(newObject));
            }
        } catch (error) {
            errorMessage(page.name, error);
        }
    }

    const processMonsters = () => {
        try {
            let newObject = new Npc(page.name);
            newObject.addSkills(globalAttributesByCategory.skills.all())
            newObject.addSaves(globalAttributesByCategory.abilities)

            globalAttributesByCategory.abilities.forEach(ability => {
                const abbreviation = ability.slice(0, 3).toUpperCase();
                page.data[`${abbreviation}`] ? newObject.attributes[`${ability}_base`] = page.data[`${abbreviation}`] : false;
                callbacks.push(() => {
                    update_attr(`${ability}`);
                });
            });

            const dropSheetAssocitation = {
                token_size: page.data["Token Size"],
                npc_condition_immunities: page.data["Condition Immunities"],
                npc_immunities: page.data["Immunities"],
                npc_languages: page.data["Languages"],
                npc_vulnerabilities: page.data["Vulnerabilities"],
                npc_resistances: page.data["Resistances"],
                npc_speed: page.data["Speed"],
                npc_challenge: page.data["Challenge Rating"],
            }

            for (let [key, value] of Object.entries(dropSheetAssocitation)) {
                value ? newObject.attributes[`${key}`] = value : false;
            }

            page.data["data-XP"] ? newObject.attributes.npc_xp = page.data["data-XP"].toString().replace(",","") : false

            Object.assign(newObject.attributes, dropFunctions.inferSavingThrows(page.data['Saving Throws']))
            Object.assign(newObject.attributes, dropFunctions.inferSkills(page.data['Skills']))            

            newObject.attributes.npc_type = dropFunctions.buildType(page.data["Size"], page.data["Type"], page.data["Alignment"])

            newObject.attributes.npc_senses = dropFunctions.buildSenses(page.data['Senses'], page.data['Passive Perception'])

            page.data['AC'] ? newObject.attributes.npc_ac = dropFunctions.inferBaseAttribute(page.data['AC']) : false;
            page.data['AC'] ? newObject.attributes.npc_actype = dropFunctions.inferFormulaAttribute(page.data['AC']) : false;

            page.data['HP'] ? newObject.attributes.hp_max = dropFunctions.inferBaseAttribute(page.data['HP']) : false;
            page.data['HP'] ? newObject.attributes.npc_hpformula = dropFunctions.inferFormulaAttribute(page.data['HP']) : false;

            const npcRepeating = ['npcaction-l', 'npcreaction', 'npcaction', 'npctrait'];
            _.each(npcRepeating, section => {
                getSectionIDs(`repeating_${section}`, idarray => {
                    _.each(idarray, (currentID, i) => {
                        removeRepeatingRow(`repeating_${section}_${currentID}`);
                    });
                });
            });

            if (page.data["data-Legendary Actions"]) {
                const actionCount = page.data["data-LANum"] ? page.data["data-LANum"] : 3;
                newObject.attributes.npc_legendary_actions = actionCount

                if (page.data["Legendary Actions Desc"]) {
                     newObject.attributes.npc_legendary_actions_desc = page.data["Legendary Actions Desc"];
                } else {
                    newObject.attributes.npc_legendary_actions_desc = `The ${page.name} can take ${actionCount}, choosing from the options below. Only one legendary option can be used at a time and only at the end of another creature's turn. The ${page.name} regains spent legendary actions at the start of its turn.`
                }
            }

            if (page.data["data-Mythic Actions"]) {
                newObject.attributes.npc_mythic_actions = 1

                if (page.data["data-MAdesc"]) {
                     newObject.attributes.npc_mythic_actions_desc = page.data["data-MAdesc"];
                } else {
                    //TODO UC1098
                    newObject.attributes.npc_legendary_actions_desc = ``;
                }
            }

            ["Actions", "Legendary Actions", "Mythic Actions"].forEach(attr => {
                if (page.data[`data-${attr}`]) {
                    const fieldsetLookup = {
                        "Actions": "npcaction",
                        "Legendary Actions": "npcaction-l",
                        "Mythic Actions": "npcaction-m"
                    }
                    const repeatingFieldset = fieldsetLookup[attr];
                    const actions = dropFunctions.jsonParse(page.data[`data-${attr}`])
                    actions.forEach(action => {
                        let newAction = new NpcAction(action['Name'], repeatingFieldset);

                        action["Desc"] ? newAction.attributes.description = action["Desc"] : false;

                        if (action["Type Attack"]) {
                            newAction.addAttack()
                            const dropSheetAttackAssocitation = {
                                attack_damagetype: action['Damage Type'],
                                attack_damage: action['Damage'],
                                attack_tohit: action['Hit Bonus'],
                                attack_range: action['Reach'],
                                attack_target: action['Target'],
                                attack_type: action['Type'],
                                attack_damage2: action['Damage 2'],
                                attack_damagetype2: action['Damage 2 Type']
                            }

                            for (let [key, value] of Object.entries(dropSheetAttackAssocitation)) {
                                value ? newAction.attributes[`${key}`] = value : false;
                            }
                        }

                        assignUpdate(dropFunctions.updateSheetAttributes(newAction));
                    });
                }
            });


            if (page.data["data-Reactions"]) {
                newObject.attributes.npcreactionsflag = 1
                const reactions = dropFunctions.jsonParse(page.data[`data-Reactions`])
                reactions.forEach(reaction => {
                    let newReaction = new NpcReaction(reaction['Name']);
                    reaction["Desc"] ? newReaction.attributes.description = reaction["Desc"] : false;
                    assignUpdate(dropFunctions.updateSheetAttributes(newReaction));
                })
            }

            if (page.data["data-Traits"]) {
                 const traits = dropFunctions.jsonParse(page.data[`data-Traits`])

                 traits.forEach(trait => {
                    let newTrait = new NpcTraits(trait['Name']);
                    trait["Desc"] ? newTrait.attributes.description = trait["Desc"] : false;

                    if (trait.Name.match(/(?!innate )(?:^.{0,6}|.{7})(spellcasting)/i)) {
                        let spellCastingAbility = page.data["Spellcasting Ability"];

                        if (spellCastingAbility) {
                            spellCastingAbility = `@{${spellCastingAbility.toLowerCase()}_mod}+`
                        } else {
                            spellCastingAbility = dropFunctions.inferSpellcastingAbility(newTrait.attributes.description)
                        }

                        const casterLevels = dropFunctions.inferCasterLevel(trait['Desc']);
                        newObject.addSpellcaster(spellCastingAbility, casterLevels)

                        callbacks.push(() => update_pb());
                        callbacks.push(() => update_spell_slots());
                    } else if (trait.Name.match(/innate spellcasting/i)) {
                        let spellCastingAbility = page.data["Spellcasting Ability"];
                        newObject.addInnateCaster()

                        spellCastingAbility ? newObject.attributes.spellcasting_ability = `@{${spellCastingAbility.toLowerCase()}_mod}+` : false;
                    }

                    assignUpdate(dropFunctions.updateSheetAttributes(newTrait));
                 })
            }

            if (page.data["data-Spells"]) {
                const spellList = dropFunctions.buildSpellList(page.data["data-Spells"]);
                getCompendiumPage(spellList, compendiumPages => {
                    compendiumPages = removeDuplicatedPageData(compendiumPages);
                    compendiumPages = Array.isArray(compendiumPages) ? compendiumPages : [compendiumPages];
                    const innateSpellLists = dropFunctions.jsonParse(page.data["data-Spells"])[`innate`] || false;
                    let spellUpdate = {}, spellCallbacks = [];

                    compendiumPages.forEach(spellPage => {
                       const processedSpell = processDrop(spellPage, currentData, repeating);
                       Object.assign(spellUpdate, processedSpell.update);
                       processedSpell.callbacks.forEach(callback => spellCallbacks.push(callback));
                    });

                    if (innateSpellLists) {
                        //Search each keys in INNATE to see if spell name === one of the Values
                        for (let [innateKey, innateValue] of Object.entries(innateSpellLists)) {
                            innateValue.forEach(spellName => {
                                for (let [key, value] of Object.entries(spellUpdate)) {
                                    if (key.includes('_spellname') && (value === spellName || value.toLowerCase() === spellName)) {
                                        const repeatingRow = key.split('_spellname')[0];
                                        spellUpdate[`${repeatingRow}_innate`] = innateKey
                                    }
                                }
                            });
                        };
                    };

                    setAttrs(spellUpdate, {silent: true}, () => {
                        spellCallbacks.forEach(callback => {
                            callback();
                        });
                    });
                });
            }

            //Call backs
            if (page.data["Saving Throws"]) {
                callbacks.push(() => update_npc_saves() );
            };

            if (page.data["Skills"]) {
                callbacks.push(() => update_npc_skills() );
            };

            if (page.data[`data-Actions`]) {
                callbacks.push(() =>  update_npc_action("all"))
            }

            if (update["npc_challenge"]) {
                callbacks.push(() => update_challenge() );
            };

            globalAttributesByCategory.abilities.forEach(ability => {
                callbacks.push(() => update_attr(`${ability}`) );
            });

            assignUpdate(dropFunctions.updateSheetAttributes(newObject));
        } catch (error) {
            errorMessage(page.name, error);
        }
    }

    const processFeats = () => {
        try {
            const match = {name: page.name};
            let existing = _.findWhere(repeating.traits, match);
            existing = existing ? existing : {}; 

            let newObject = new Trait(page.name, existing.id || false);
            newObject.attributes.description = page.data['data-Description'] || page.content
            newObject.attributes.source = newObject.determineSource(category)
            newObject.attributes.source_type = page.data["Properties"] || ""
            assignUpdate(dropFunctions.updateSheetAttributes(newObject));

            existing = dropHelpers.updateRepeatingTraits(newObject, existing)
            existing ? false : repeating.traits.push(existing);
        } catch (error) {
            errorMessage(page.name, error);
        }
    }

    const processProficiencies = () => {
        try {
            const proficiencies = globalAttributesByCategory.proficiencyTypes;
            const tools = ["tool", "skillcustom"];
            let type = page.data["Type"] || "";
            type = proficiencies.includes(type.toUpperCase()) ? 'proficiencies' : tools.includes(type.toLowerCase()) ? 'tool' : type.toLowerCase() === 'skill' ? 'skill' : false;

            if (type === 'proficiencies') {
                if (repeating.prof_names.indexOf(page.name.toLowerCase()) == -1) {
                    let newObject = new Proficiency(page.name)
                    proficiencies.includes(page.data["Type"].toUpperCase()) ? newObject.attributes.prof_type = page.data["Type"].toUpperCase() : false;
                    repeating.prof_names.push(page.name.toLowerCase());
                    assignUpdate(dropFunctions.updateSheetAttributes(newObject));
                }
            } else if (type === 'tool') {
                let existing = {id: false};
                existing.id = dropHelpers.findToolId(repeating.tool, page.name)

                let newObject = new ToolProficiency(page.name, existing.id)
                page.data["toolbonus_base"] ? newObject.attributes.toolbonus_base = "(@{pb}*2)" : false;
                assignUpdate(dropFunctions.updateSheetAttributes(newObject));

                existing = dropHelpers.updateRepeatingTools(newObject, existing)
                repeating.tool[newObject.reprowid] = existing
                repeating.prof_names.push(page.name.toLowerCase());

                //Updates the displays for the tool...
                callbacks.push(() => {
                    update_tool(newObject.reprowid);
                });
            } else if (type === 'skill') {
                let newObject = new Skill(page.name)
                assignUpdate(dropFunctions.updateSheetAttributes(newObject));
            } else {
                warningMessage(`${page.data["Type"]}`, `No an approved type. Accepted types are skill, ${proficiencies.concat(tools).join(' ,')}. Update compendium "Type".`);
            }
        } catch (error) {
            errorMessage(page.name, error);
        }      
    }

    const processClass = () => {
        try {
            if (page.data.multiclass) {
                if(page.name && page.name !== "") { update[page.data.multiclass] = page.name; }
                update[page.data.multiclass + "_flag"] = "1";
                classlevel = parseInt(currentData[page.data.multiclass + "_lvl"]);
            } else {
                let newObject = new Class(page.name);
     
                if (page.data["Hit Die"] && page.data["Hit Die"] !== "") {
                    currentData.base_level ? newObject.attributes.base_level = currentData.base_level : false;
                    newObject.attributes.hit_dice_max = newObject.attributes.base_level + page.data["Hit Die"];
                    newObject.attributes.hitdietype = page.data["Hit Die"].replace(/[^0-9]/g, '');
                    newObject.attributes.hit_dice = newObject.attributes.base_level;
                }

                const spellcastingAbility = page.data["Spellcasting Ability"] ? page.data["Spellcasting Ability"].toLowerCase() : false;
                if (spellcastingAbility && globalAttributesByCategory.abilities.includes(spellcastingAbility)) {
                    newObject.attributes.spellcasting_ability = newObject.buildSpellcastingAbility(spellcastingAbility);
                }

                assignUpdate(dropFunctions.updateSheetAttributes(newObject));
            }

            if (page.data["data-Saving Throws"] && !page.data.multiclass) {
                const saves = dropFunctions.jsonParse(page.data["data-Saving Throws"]);
                saves.forEach(value => {
                    const save = new SavingThrow(value);
                    assignUpdate(dropFunctions.updateSheetAttributes(save));
                });
            }

            if(!looped) {
                callbacks.push(update_class);
            }
        } catch (error) {
            errorMessage(page.name, error);
        }    
    }

    const processSubclasses = () => {
        try {
            const lowercaseClass = page.data.Class.toLowerCase();
            if (page.data.multiclass) {
                update[`${page.data.multiclass}_subclass`] = page.name;
                classlevel = parseInt(currentData[`${page.data.multiclass}_lvl`]);
                if (page.data["Spellcasting Ability"] && (lowercaseClass === 'fighter' || lowercaseClass === 'rogue')) {
                    update[`"arcane_${lowercaseClass}`] = "1";
                }
            } else {
                let newObject = new Subclass(page.name);
                const spellcastingAbility = page.data["Spellcasting Ability"] ? page.data["Spellcasting Ability"].toLowerCase() : false;
                if (spellcastingAbility && globalAttributesByCategory.abilities.includes(spellcastingAbility)) {
                    newObject.attributes.spellcasting_ability = newObject.buildSpellcastingAbility(spellcastingAbility);
                    if(newObject.checkArcane(lowercaseClass)) newObject.attributes[`arcane_${lowercaseClass}`] = 1;
                }

                assignUpdate(dropFunctions.updateSheetAttributes(newObject));
            }

            if (!looped) {
                callbacks.push(update_class);
            };
        } catch (error) {
            errorMessage(page.name, error);
        }
    }

    const processRaces = () => {
        try {
            let newObject = new Race(page.name)

            page.data['Size'] && page.data['Size'] != 'Medium' ? newObject.attributes.size = page.data['Size'] : false
            page.data['Speed'] && page.data['Speed'] != 30 ? newObject.attributes.speed = page.data['Speed'] : false
            assignUpdate(dropFunctions.updateSheetAttributes(newObject));

            if (!looped) {
                callbacks.push(update_race_display);
            }
        } catch (error) {
            errorMessage(page.name, error);
        }
    }

    const processSubraces = () => {
        try {
            let newObject = new Subrace(page.name) 
            page.data['Size'] && page.data['Size'] ? newObject.attributes.size = page.data['Size'] : false
            page.data['Speed'] && page.data['Speed'] ? newObject.attributes.speed = page.data['Speed'] : false
            assignUpdate(dropFunctions.updateSheetAttributes(newObject));

            if (!looped) {
                callbacks.push(update_race_display);
            }
        } catch (error) {
            errorMessage(page.name, error);
        }
    }

    const processOtherOptionsAndFeatures = () => {
        //Do nothing...
    }

    const processBackgrounds = () => {
        try {
            update["background"] = page.name;
        } catch (errorMessage) {
            errorMessage(page.name, error);
        }
    }

    console.log(category)

    switch(category) {
        case "Backgrounds":
            processBackgrounds();
            break;
        case "Classes":
            processClass();
            break;
        case "Feats":
            processFeats();
            break;
        case "Items":
            processItems();
            break;
        case "Monsters":
            processMonsters();
            break;
        case "Proficiencies":
            processProficiencies();
            break;
        case "Spells":
            processSpells();
            break;
        case "Subclasses":
            processSubclasses();
            break;
        case "Races":
            processRaces();
            break
        case "Subraces":
            processSubraces();
            break;
        case "Other Options and Features":
            processOtherOptionsAndFeatures();
            break;
        default:
            errorMessage(category, `category does not match one of the drop functions conditions.`);
    }

    if (page.data.theseblobs) {
        _.each(page.data.theseblobs, function(blobname) {
            if(page.data.blobs[blobname]) blobs[blobname] = page.data.blobs[blobname];
        });
    } else {
        if(category === "Other Options and Features") {
            blobs = page.data.blobs;
        } else {
            blobs = filterBlobs(page.data.blobs, {"Level": "1"});
        }        
    }

    for (let [blobName, blob] of Object.entries(blobs)) {
        if (blob["Traits"]) {
            try {
                const traitArray = dropFunctions.jsonParse(blob["Traits"]);
                if (traitArray && traitArray.length) {
                    traitArray.forEach(trait => {
                        if (!trait.Input) {
                            let match = {name: trait["Name"], type: page.name};
                            if (trait["Replace"]) {
                                match = {name: trait["Replace"]};
                            }
                            let existing = _.findWhere(repeating.traits, match);
                            existing = existing ? existing : {};

                            let newObject = new Trait(trait["Name"].replace(/{{Input}}/g, ""), existing.id || false);
                            newObject.attributes.source = newObject.determineSource(category)
                            trait["Desc"] ? newObject.attributes.description = trait["Desc"].replace(/{{Input}}/g, "") : false
                            page.name ? newObject.attributes.source_type = removeExpansionInfo(page.name) : false
                            assignUpdate(dropFunctions.updateSheetAttributes(newObject));
                            
                            existing = dropHelpers.updateRepeatingTraits(newObject, existing)
                            existing ? false : repeating.traits.push(existing);

                            if (trait["Name"] === "Reliable Talent") {
                                update["reliable_talent"] = "10";
                            }

                            else if (trait["Name"] === "Powerful Build") {
                                update["powerful_build"] = "1";
                            };
                        }
                    });
                };
            } catch (error) {
                errorMessage(trait.Name, error)
            }
        }

        ["Language Proficiency", "Weapon Proficiency", "Armor Proficiency"].forEach(proficiencyType => {
            try {
                const proficiencyArray = blob[`${proficiencyType}`] ? dropFunctions.jsonParse(blob[`${proficiencyType}`]) : false
                if (proficiencyArray && proficiencyArray["Proficiencies"]) {
                    proficiencyArray["Proficiencies"].forEach(proficiency => {
                        if (repeating.prof_names.indexOf(proficiency.toLowerCase()) == -1) {
                            let newObject = new Proficiency(proficiency)
                            newObject.attributes.prof_type = proficiencyType.split(" Proficiency")[0].toUpperCase()
                            repeating.prof_names.push(proficiency.toLowerCase());
                            assignUpdate(dropFunctions.updateSheetAttributes(newObject));
                        }
                    })
                }
            } catch (error) {
                errorMessage(proficiencyType, error)
            }
        })

        if (blob["Tool Proficiency"]) {
            try {
                const toolArray = dropFunctions.jsonParse(blob["Tool Proficiency"]);
                if(toolArray["Proficiencies"] && toolArray["Proficiencies"].length) {
                    toolArray["Proficiencies"].forEach(proficiency => {
                        let existing = {id: false}
                        existing.id = dropHelpers.findToolId(repeating.tool, proficiency)

                        let newObject = new ToolProficiency(proficiency, existing.id)
                        assignUpdate(dropFunctions.updateSheetAttributes(newObject));

                        existing = dropHelpers.updateRepeatingTools(newObject, existing)
                        repeating.tool[newObject.reprowid] = existing
                        repeating.prof_names.push(page.name.toLowerCase());

                        //Updates the displays for the tool...
                        callbacks.push(() => {
                            update_tool(newObject.reprowid);
                        });
                    })
                }
            } catch (error) {
                errorMessage("Tool Proficiency", error)
            }
        }

        if (blob["Skill Proficiency"]) {
            try {
                const skillArray = dropFunctions.jsonParse(blob["Skill Proficiency"]);
                if (skillArray["Proficiencies"] && skillArray["Proficiencies"].length) {
                    skillArray["Proficiencies"].forEach(proficiency => {
                        let newObject = new Skill(proficiency);
                        assignUpdate(dropFunctions.updateSheetAttributes(newObject));
                    });
                    callbacks.push(() => { 
                        update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion"]);
                    });
                };
            } catch (error) {
                errorMessage("Skill Proficiency", error)
            }
        }
        
        if (blob["Global Damage"]) {
            try {
                const dmgmod = dropFunctions.jsonParse(blob["Global Damage"])
                let existing = {}

                for (let [key, value] of Object.entries(repeating.damagemod)) {
                    value.toLowerCase() === dmgmod["Name"].toLowerCase() ? existing.id = key : false
                }

                let newObject = new GlobalDamage(dmgmod["Name"], existing.id || false)
                newObject.attributes.global_damage_damage = `${parseValues(dmgmod["Damage"])}`
                dmgmod["Active"] == "true" ? newObject.attributes.global_damage_active_flag = 1 : false
                newObject.attributes.global_damage_type = dmgmod["Type"] ? dmgmod["Type"] : dmgmod["Name"];
                assignUpdate(dropFunctions.updateSheetAttributes(newObject));

                update["global_damage_mod_flag"] = "1";

                repeating.damagemod[newObject.reprowid] = dmgmod["Name"];
            } catch (error) {
                errorMessage("Global Damage", error)
            }
        }

        if (blob["Actions"]) {
            try {
                let actionsObject = {}
                dropFunctions.jsonParse(blob["Actions"]).forEach(value => actionsObject[value.Name] = value)

                for (let [actionName, action] of Object.entries(actionsObject)) {
                    let existing = {}

                    for (let [key, value] of Object.entries(repeating.attack)) {
                        value.atkname === actionName ? existing.id = key : false
                    }

                    let newObject = new Attack(actionName, existing.id || false)
                    action["Desc"] ? newObject.attributes.atk_desc = action["Desc"] : false

                    if (action["Type Attack"]) {
                        if (action["Type"] === "Spell") {
                            newObject.attributes.atkflag = 0
                            newObject.addSaveFlag()
                        }

                        action["Reach"] ? newObject.attributes.atkrange = action["Reach"] : false
                        action["Damage"] ? newObject.attributes.dmgbase = action["Damage"] : false
                        !action["Damage"] ? newObject.attributes.dmgflag = 0 : false;
                        action["Damage Type"] ? newObject.attributes.dmgtype = action["Damage Type"] : false

                        if (action["Modifier"]) {
                            if (action["Modifier"] === "FIN") {
                                 newObject.checkFinesse(parseInt(currentData.strength_base), parseInt(currentData.dexterity_base))
                            } else {
                                const actionModifier = dropFunctions.convertAbbreviationToAttribute(action["Modifier"])
                                actionModifier && actionModifier != newObject.attributes.dmgattr ? newObject.attributes.dmgattr = actionModifier : false
                                actionModifier && actionModifier != newObject.attributes.atkattr_base ? newObject.attributes.atkattr_base = actionModifier : false
                            }
                        } else {
                            newObject.attributes.dmgattr = 0;
                        }

                        action["Save"] ? newObject.attributes.saveattr = action["Save"] : false
                        action["Save Effect"] ? newObject.attributes.saveeffect = action["Save Effect"] : false

                        if (action["Save DC"]) {
                            const saveDCModifier = dropFunctions.convertAbbreviationToAttribute(action["Save DC"])
                            newObject.attributes.savedc = `(@{saveflat})`;
                            newObject.attributes.saveflat = `(8+@{pb}+${saveDCModifier})`;
                        }

                        if (action["Damage 2"] && action["Damage 2 Type"]) {
                            newObject.attributes.dmg2flag = '{{damage=1}} {{dmg2flag=1}}'
                            newObject.attributes.atk_dmg2base = action["Damage 2"]
                            newObject.attributes.attack_damagetype2 = action["Damage 2 Type"]

                            if (action["Modifier 2"]) {
                                newObject.attributes.dmg2attr = dropFunctions.convertAbbreviationToAttribute(action["Modifier 2"])
                            } else {
                                newObject.attributes.dmgattr = 0
                            }
                        }
                    }

                    assignUpdate(dropFunctions.updateSheetAttributes(newObject));

                    repeating.attack[`${newObject.reprowid}`] = {atkname: newObject.attributes.atkname}

                    callbacks.push(() => { 
                        do_update_attack([`${newObject.reprowid}`]); 
                    });
                }
            } catch (error) {
                errorMessage("Actions", error)
            }
        }

        if (blob["Resources"]) {
            try {
                const resourcesArray = dropFunctions.jsonParse(blob["Resources"])
                resourcesArray.forEach(resource => {
                    let section = undefined;

                    const findCurrentResource = resourceName => {
                        if (currentData["class_resource_name"] === resourceName) {
                            return "class_resource"
                        } else if (currentData["other_resource_name"] === resourceName) {
                            return "other_resource"
                        } else {
                             for (let [repeatingIDKey, repeatingValue] of Object.entries(repeating.resource)) {
                                return Object.values(repeatingValue).includes(resourceName) ? repeatingIDKey : false
                            }
                        }
                    }

                    //Testing this funtion to find an empty resource
                    const findEmptyResource = () => {
                        if (currentData["class_resource_name"].length === 0) {
                            return "class_resource"
                        } else if (currentData["other_resource_name"].length === 0) {
                            return "other_resource"
                        } else {
                            let foundEmptyString = false
                            for (let [repeatingIDKey, repeatingValue] of Object.entries(repeating.resource)) {
                                if (repeatingValue.left.length === 0) {
                                    return `repeating_resource_${repeatingIDKey}_resource_left`
                                } else if (repeatingValue.right.length === 0) {
                                    return `repeating_resource_${repeatingIDKey}_resource_right`
                                } else {
                                    foundEmptyString = false
                                }
                            }

                            return foundEmptyString
                        }
                    }

                    let matchResource = findCurrentResource(resource.Name)

                    if (matchResource) {
                        if (matchResource === "class_resource" || matchResource === "other_resource") {
                            section = matchResource
                        } else {
                            const repeatingSide = repeating.resource[matchResource].left === resource.Name ? "left" : "right"
                            section = `repeating_resource_${matchResource}_resource_${repeatingSide}`
                        }
                    } else {
                        section = findEmptyResource()
                    }

                    //Section will be true if a repeating entry matches resource.Name or is has an empty side ||
                    //class/other_resource match the resource.Name or are empty
                    if (section) {
                        update[`${section}_name`] = resource.Name
                        if (resource.Uses) update[section] = numUses(resource.Uses)
                        update[`${section}_max`] = resource.Max ? numUses(resource.Max) : numUses(resource.Uses)

                        if (section === "class_resource" || section === "other_resource") {
                            currentData[`${section}_name`] = resource.Name
                        } else {
                            const sectionRepeatingId = section.split('_resource_')[1]
                            const sectionSide = section.includes('left') ? 'left' : 'right'
                            repeating.resource[`${sectionRepeatingId}`][sectionSide] = resource.Name
                        }
                    } else {
                        const newResource = new Resource(resource.Name)
                        newResource.attributes.resource_left = resource.Uses ? numUses(resource.Uses) : 0
                        newResource.attributes.resource_left_max = resource.Max ? numUses(resource.Max) : newResource.attributes.resource_left
                        assignUpdate(dropFunctions.updateSheetAttributes(newResource))

                        const addRepeating = {
                            [`${newResource.reprowid}`]: {
                                left: resource.Name, 
                                right: ''
                            }
                        }
                        Object.assign(repeating.resource, addRepeating)
                    }
                })
            } catch (error) {
                errorMessage("Resources", error)
            }
        }

        if (blob["Custom AC"]) {
            try {
                const parsedKey = dropFunctions.jsonParse(blob["Custom AC"]);
                update["custom_ac_flag"] = "1";
                update["custom_ac_base"] = parsedKey.Base;
                update["custom_ac_part1"] = parsedKey["Attribute 1"];
                update["custom_ac_part2"] = parsedKey["Attribute 2"] ? parsedKey["Attribute 2"] : "";
                update["custom_ac_shield"] = parsedKey.Shields;
                if(!looped) {
                    callbacks.push( function() {update_ac();} )
                }
            } catch (error) {
                errorMessage("Custom AC", error)
            }
        }

        if (blob["Hit Points Per Level"]) {
            try {
                const parsedKey = dropFunctions.jsonParse(blob["Hit Points Per Level"])
                let existing = {}
                for (let [key, value] of Object.entries(repeating.hpmod)) {
                    value.source === blobName ? existing.id = key : false
                }

                let newObject = new HPMod(blobName, existing.id || false)
                newObject.attributes.mod = blob["Hit Points Per Level"]
                newObject.attributes.source = blobName
                newObject.attributes.levels = category === "Races" || category === "Subraces" ? 'total' : 'base'
                assignUpdate(dropFunctions.updateSheetAttributes(newObject));
            } catch (error) {
                errorMessage("Hit Points Per Level", error)
            }
        }

        if (blob["Hit Points Bonus"]) {
            let prevHp = update["hp"] || currentData["hp"];
            let prevHpMax = update["hp_max"] || currentData["hp_max"];
            prevHp = prevHp && !isNaN(parseInt(prevHp)) ? parseInt(prevHp) : 0;
            prevHpMax = prevHpMax && !isNaN(parseInt(prevHpMax)) ? parseInt(prevHpMax) : 0;
            update["hp"] = prevHp + parseInt(blob["Hit Points Bonus"]);
            update["hp_max"] = prevHpMax + parseInt(blob["Hit Points Bonus"]);
        }

        ["Global AC Mod", "Global Save", "Global Attack"].forEach(globalType => {
            try {
                if (blob[globalType]) {
                    const globalShortName = globalType.includes("Attack") ? "attack" : globalType.includes("Save") ? "save" : "ac";
                    const repeatingKey = globalShortName === "attack" ? "tohitmod" : globalShortName === "save" ? "savemod" : "acmod";

                    const parsedKey = dropFunctions.jsonParse(blob[`${globalType}`]);
                    let existing = {id: false}
                    for (let [key, value] of Object.entries(repeating[`${repeatingKey}`])) {
                       value.includes(blobName) ? existing.id = key : false
                    }

                    let newObject = {};
                    if (globalType === "Global AC Mod") {
                        newObject = new GlobalACMod(parsedKey.Name, existing.id)
                        newObject.attributes.global_ac_val = parsedKey.Bonus
                    } else if (globalType === "Global Save") {
                        newObject = new GlobalSave(parsedKey.Name, existing.id)
                        newObject.attributes.global_save_roll = parsedKey.Bonus
                    } else {
                        newObject = new GlobalAttack(parsedKey.Name, existing.id)
                        newObject.addRoll(parsedKey.Bonus)
                    }

                    parsedKey.Active !== "false" ? newObject.attributes[`global_${globalShortName}_active_flag`] = 1 : false
                    assignUpdate(dropFunctions.updateSheetAttributes(newObject))

                    update[`global_${globalShortName}_mod_flag`] = "1"
                }
            } catch (error) {
                errorMessage(`${globalType}`, error)
            }
        })

        if (blob["Initiative"]) {
            if (blob["Initiative"].toLowerCase() === "advantage") {
                update["initiative_style"] = "{@{d20},@{d20}}kh1";
            } else if (blob["Initiative"].toLowerCase() === "disadvantage") {
                update["initiative_style"] = "{@{d20},@{d20}}kl1";
            } else {
                update.initmod = numUses(blob["Initiative"]);
            }         
        }

        if (blob["Carry Multiplier"]) {
            update["carrying_capacity_mod"] = `*${blob["Carry Multiplier"]}`
        }

        if (blob["Speed"]) {
            try {
                if (blob["Speed"][0] === "+") {
                    let prevspeed = update["speed"] || currentData["speed"];
                    prevspeed = prevspeed && !isNaN(parseInt(prevspeed)) ? parseInt(prevspeed) : 0;
                    update["speed"] = prevspeed + parseInt(blob["Speed"]);
                } else {
                    update["speed"] = parseInt(blob["Speed"]);
                }
            } catch (error) {
                errorMessage("Speed", error)
            }
        }

        if (blob["Jack of All Trades"]) {
            update["jack_of_all_trades"] = "@{jack}";
        }

        if (blob["Global Save Mod"]) {
            update["globalsavemod"] = numUses(blob["Global Save Mod"]);
        }

        if (blob["Saving Throws"]) {
            try {
                const parsedArray = dropFunctions.jsonParse(blob["Saving Throws"])
                parsedArray.forEach(value => {
                    const save = new SavingThrow(value);
                    assignUpdate(dropFunctions.updateSheetAttributes(save));
                })
            } catch (error) {
                errorMessage("Saving Throws", error)
            }
        }

        if (blob["Proficiency Bonus"]) {
            try {
                const parsedBonus = dropFunctions.jsonParse(blob["Proficiency Bonus"])
                for (let [key, value] of Object.entries(parsedBonus)) {
                    update[`${key.replace(/ /g, "_").toLowerCase()}_flat`] = numUses(value);
                }
                update_skills(["athletics", "acrobatics", "sleight_of_hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal_handling", "insight", "medicine", "perception", "survival","deception", "intimidation", "performance", "persuasion"]);
            } catch (error) {
                errorMessage("Proficiency Bonus", error)
            }
        }
        
        if (blob["Spells"]) {
            try {
                let spells = dropFunctions.jsonParse(blob["Spells"]);
                let spellUpdate = {}, spellCallbacks = [];
                let spellPages = [];
                spells.forEach(spell => {
                    if(spell.Name) spellPages.push(spell.Name);
                    if(spell.Known) spellPages = spellPages.concat(spell.Known);
                });
                spellPages = Array.from(new Set(spellPages));

                getCompendiumPage(spellPages, spellData => {
                    var inSpellBook = function(name) {
                      let found = false;
                      const spellRepeating = ["cantrip", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                      spellRepeating.forEach(spellLevel => {
                        if(found) return;
                        if(repeating[`spell-${spellLevel}`]) {
                            Object.keys(repeating[`spell-${spellLevel}`]).forEach(entry => {
                                if(repeating[`spell-${spellLevel}`][entry]['spellname'] === name) {
                                    found = true;
                                    return;
                                }
                            });
                        }
                      });
                      return found;
                    };
                    spellData = removeDuplicatedPageData(spellData);
                    spells.forEach(spellInformation => {
                        if(spellInformation.Known) {
                            spellInformation.Known.forEach(s => {
                                if(!inSpellBook(s)) {
                                    const mockPage = {
                                      name: s,
                                      data: {
                                          "Category": "Spells"
                                      }
                                  }
                                  const pageData = (Array.isArray(spellData)) ? spellData.filter(entry => { return entry['name'] === s})[0] : spellData;
                                  if(pageData) {
                                    Object.assign(mockPage.data, pageData.data);
                                    Object.assign(mockPage.data, spellInformation);
                                    const processedSpell = processDrop(mockPage, currentData, repeating);
                                    Object.assign(spellUpdate, processedSpell.update);
                                    processedSpell.callbacks.forEach(callback => spellCallbacks.push(callback));
                                  }
                                }
                            });
                        } else {
                            if(!inSpellBook(spellInformation.Name)) {
                                const mockPage = {
                                  name: spellInformation.Name,
                                  data: {
                                      "Category": "Spells"
                                  }
                              }
                              const pageData = (Array.isArray(spellData))? spellData.filter(entry => { return entry['name'] === spellInformation.Name})[0] : spellData;
                              Object.assign(mockPage.data, pageData.data);
                              Object.assign(mockPage.data, spellInformation);
                              const processedSpell = processDrop(mockPage, currentData, repeating);
                              Object.assign(spellUpdate, processedSpell.update);
                              processedSpell.callbacks.forEach(callback => spellCallbacks.push(callback));
                            }
                        }
                    });
                    if(Object.keys(spellUpdate).length > 0) {
                        setAttrs(spellUpdate, {silent: true}, () => {
                            spellCallbacks.forEach(callback => {
                                callback();
                            });
                        });
                    }
                });
            } catch (error) {
                errorMessage("Spells", error)
            }
        }
        
        if (blob["Custom Spells"]) {
            try {
                let customSpells = dropFunctions.jsonParse(blob["Custom Spells"]);
                let spellUpdate = {}, spellCallbacks = [];
                customSpells.forEach(spellInformation => {
                    const mockPage = {
                        name: spellInformation.Name,
                        data: {
                            "Category": "Spells"
                        }
                    }
                    Object.assign(mockPage.data, spellInformation);
                    const processedSpell = processDrop(mockPage, currentData, repeating);
                    Object.assign(spellUpdate, processedSpell.update);
                    processedSpell.callbacks.forEach(callback => spellCallbacks.push(callback));
                });

                setAttrs(spellUpdate, {silent: true}, () => {
                    spellCallbacks.forEach(callback => {
                        callback();
                    });
                });
            } catch (error) {
                errorMessage("Custom Spells", error)
            }
        }
    }

    return {
        update: update,
        repeating: repeating,
        callbacks: callbacks
    };
};


