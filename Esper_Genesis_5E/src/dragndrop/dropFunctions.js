const dropFunctions = {
    validateCantripScaling: scaling => scaling === 'dice' || scaling === 'beam' ? true : false,
    buildCantripScaling: scaling => `Cantrip ${scaling.charAt(0).toUpperCase()}${scaling.slice(1)}`,
    
    buildDamage: (page, currentData, alternateDamage) => {
        try {
            const modifiers = dropFunctions.inferAbilityModifier(page.data["Item Type"], page.data["Properties"], currentData)
            let damage = alternateDamage ? alternateDamage : page.data[`Damage`];
            damage += modifiers && modifiers != 0 ? `+${modifiers}` : ""
            damage += page.data["Modifiers"] ? dropFunctions.inferModifier(page.data["Modifiers"], 'damage') : ""
    
            return damage
        } catch (error) {
            console.error(error)
            return ''
        }
    },

    buildItemModString: page => {
        try {
            let mods = `Item Type: ${page.data["Item Type"] || page.data["Category"]}`;

            //Items with ac or attack related bonuses
            ["AC", "Damage", "Damage Type", "Secondary Damage", "Secondary Damage Type", "Alternate Damage", "Alternate Damage Type", "Alternate Secondary Damage", "Alternate Secondary Damage Type", "Critical Range", "Range"].forEach(attr => {
                mods += page.data[`${attr}`] && page.data[`${attr}`] != "" ? `, ${attr}: ${page.data[`${attr}`]}` : "";
                });

            //Items with modifiers such as Cloak of Protection
                mods += page.data["Modifiers"] && page.data["Modifiers"] != "" ? `, ${page.data["Modifiers"]}` : "";

            return mods   
        } catch (error) {
            console.error(error)
            return ''
        }
    },

    buildSpellQuery: spellLevel => {
        try {
            let spellQuery = ""
            for(i = 0; i < 10-spellLevel; i++) {
                const sum = (parseInt(i, 10) + parseInt(spellLevel, 10))
                spellQuery += `|Level ${sum},${sum}`
            };
    
            return `@{wtype}&{template:spell} {{level=@{spellschool} ?{Cast at what level?${spellQuery}}}} {{name=@{spellname}}} {{castingtime=@{spellcastingtime}}} {{range=@{spellrange}}} {{target=@{spelltarget}}} @{spellcomp_v} @{spellcomp_s} @{spellcomp_m} {{material=@{spellcomp_materials}}} {{duration=@{spellduration}}} {{description=@{spelldescription}}} {{athigherlevels=@{spellathigherlevels}}} @{spellritual} {{innate=@{innate}}} @{spellconcentration} @{charname_output}`
        } catch (error) {
            console.error(error)
        }
    },

    buildToHit: (page, currentData) => {
        try {
            let hit = dropFunctions.inferAbilityModifier(page.data["Item Type"], page.data["Properties"], currentData);
            hit += page.data["Modifiers"] ? dropFunctions.inferModifier(page.data["Modifiers"], 'attacks') : "";
            return hit
        } catch (error) {
            console.error(error)
            return ''
        }
    },

    buildSenses: (senses, passivePerception) => {
        try {
            return senses ? `${senses}, passive Perception ${passivePerception}` : `passive Perception ${passivePerception}`;
        } catch (error) {
            console.log(error)
            return ''
        }
    },

    buildSpellList: spells => {
        try {
            let spellList = []
            //Create an array of spells to get from the Comepndium
            const spellTypes = ["spells", "innate"]
            spellTypes.forEach(type => {
                const spellObject = dropFunctions.jsonParse(spells)[type]
                if (spellObject) {
                    for (let [key, value] of Object.entries(spellObject)) {
                        value.forEach(spell => spellList.push(spell))
                    }
                }
            })
            return spellList
        } catch (error) {
            console.log(error)
        }
    },

    buildType: (size, type, aligment) => {
        let string = size || "";
        type ? string += ` ${type}` : false;
        aligment ? string += `, ${aligment}`: false;
        return string
    },

    confirmFinesse: properties => properties.toLowerCase().includes("finesse") ? true : false,
    confirmRanged: itemType => itemType.toLowerCase().includes("ranged") ? true : false,
    confirmDexGreaterThanStr: (dex, str) => dex > str ? true : false,

    convertAbbreviationToAttribute: threeLetterString => {
        switch(threeLetterString.toLowerCase()) {
            case "str":
                return "@{strength_mod}";
                break;
            case "dex":
                return "@{dexterity_mod}";
                break;
            case "con":
                return "@{constitution_mod}";
                break;
            case "wis":
                return "@{wisdom_mod}";
                break;
            case "int":
                return "@{intelligence_mod}";
                break;
            case "cha":
                return "@{charisma_mod}";
                break;
            default:
                errorMessage("convertAbbreviationToAttribute", `${threeLetterString} did not match one of the expected types str, dex, con, wis, int, cha`)
                return false
        }           
    },

    determineComponent: (componentList, component) => componentList.toLowerCase().includes(component) ? `{{${component}=1}}` : false,

    inferAbilityModifier: (type, properties, currentData) => {
        try {
            const ranged = type ? dropFunctions.confirmRanged(type) : false;
            const finesse = properties ? dropFunctions.confirmFinesse(properties) : false;
            const dexGreaterThanStr = dropFunctions.confirmDexGreaterThanStr(currentData.dexterity_mod, currentData.strength_mod);
    
            return ranged || (finesse && dexGreaterThanStr) ? currentData.dexterity_mod : currentData.strength_mod
        } catch (error) {
            console.log(error)
        }
    },

    inferBaseAttribute: attribute => attribute.includes('(') ? attribute.split(" (")[0] : attribute,

    inferCasterLevel: description => parseInt(description.substring(description.indexOf("-level")-4, description.indexOf("-level")-2).trim(), 10) || 1,

    inferFormulaAttribute: attribute => attribute.includes('(') ? attribute.split(" (")[1].slice(0, -1) : "",

    inferModifier: (modifiers, type) => {
        try {
            let modifier = "";
            modifiers = modifiers.split(',');
            modifiers.forEach(value => {
                modifier += value.toLowerCase().includes(type) ? value.split(' ').pop() : ""
            });
            return modifier
        } catch (error) {
            console.log(error)
            return ''
        }
    },

    inferSpellcastingAbility: description => {
        let ability = description.match(/casting ability is (.*?) /);
        ability = ability && ability.length > 1 ? ability[1] : false;
        ability = ability ? `@{${ability.toLowerCase()}_mod}+` : "0*";
        return ability
    },

    inferSavingThrows: saves => {
        try {
            let object = {};
            if (saves) {
            saves = saves.includes(', ') ? saves.split(", ") : [saves]
            saves.forEach(saveValue => {
                    const split = saveValue.includes(' ') ? saveValue.split(' ') : errorMessage(`inferSavingThrows`, `${saveValue} does no include a space`)
                    const abbreviation = split[0].toLowerCase();
                    object[`npc_${abbreviation}_save_base`] = split.pop();
            });
            }
            return object
        } catch (error) {
            errorMessage('inferSavingThrows', error)
        }
    },

    inferSkills: skills => {
        try {
            let object = {};
            if (skills) {
               skills = skills.includes(', ') ? skills.split(", ") : [skills]
               skills.forEach(skillValue => {
                    const split = skillValue.includes(' ') ? skillValue.split(' ') : errorMessage(`inferSkills`, `${skillValue} does no include a space`)
                    const value = split.pop();
                    const name = split.length > 2 ? split.join("_").toLowerCase() : split.shift().toLowerCase();
                    object[`npc_${name}_base`] = value;
               });
            }
            return object
        } catch (error) {
            errorMessage('inferSkills', error)
        }
    },

    jsonParse: (data, defaultValue) => { 
        let result = null;
        try {
            result = JSON.parse(data);
        } catch (error) {
            switch(typeof defaultValue) {
                case 'boolean':
                case 'number':
                case 'string':
                case 'function':
                    result = (typeof data === typeof defaultValue) ? data : defaultValue;
                    break;
                case 'object':
                    result = (typeof data === typeof defaultValue && data.constructor.name === defaultValue.constructor.name) ? data : defaultValue;
                    break;
                default:
                    errorMessage('Invalid JSON', error);
            }
        }
        return result;
    },

    updateSheetAttributes: newObjectForSheet => {
        try {
            let update = {};

            for (let [key, value] of Object.entries(newObjectForSheet.attributes)) {
                //If repeating section, update key needs the repeating information
                const updateKey = newObjectForSheet.reprowid ? newObjectForSheet.addAttribute(key) : key;

                //This 'update' will be handed to a setAttrs function
                update[updateKey] = newObjectForSheet.attributes[key];
            }

            return update
        } catch (error) {
            errorMessage(`updateSheetAttributes`, error);
        }
    }
}

//These functions handle 'repeating' parameter of processDrop
const dropHelpers = {
    findToolId: (repeatingTools, toolName) => {
        let id = false
        for(let [key, value] of Object.entries(repeatingTools)) {
            value.toolname === toolName.toLowerCase() ? id = key : false;
        }
        return id
    },
    updateRepeatingTools: (newTool, existingTool) => {
        existingTool.id  = newTool.reprowid
        existingTool.toolname = newTool.attributes.toolname.toLowerCase()
        existingTool.base = newTool.attributes.toolbonus_base
        return existingTool
    },
    updateRepeatingTraits: (newTrait, existingTrait) => {
        existingTrait.id     = newTrait.reprowid;
        existingTrait.name   = newTrait.attributes.name;
        existingTrait.source = newTrait.attributes.source;
        existingTrait.type   = newTrait.attributes.source_type;

        return existingTrait
    }
}
