const wfrpModule = ( () => {

    // Global Variables

    const wfrp = {
        sheet_version: "1.0.3",

        characteristics: [
            "weapon_skill",
            "ballistic_skill",
            "strength",
            "toughness",
            "initiative",
            "agility",
            "dexterity",
            "intelligence",
            "willpower",
            "fellowship"
        ],

        characteristics_short: [
            "WS",
            "BS",
            "S",
            "T",
            "I",
            "Ag",
            "Dex",
            "Int",
            "WP",
            "Fel"
        ],

        skills: [
            "animal-care",
            "animal-training",
            "channelling",
            "evaluate",
            "heal",
            "language",
            "lore",
            "perform",
            "pick-lock",
            "play",
            "pray",
            "ranged",
            "research",
            "sail",
            "secret-signs",
            "set-trap",
            "sleight-of-hand",
            "swim",
            "track",
            "trade",
            "art",
            "athletics",
            "bribery",
            "charm",
            "charm-animal",
            "climb",
            "consume-alcohol",
            "cool",
            "dodge",
            "drive",
            "endurance",
            "entertain",
            "gamble",
            "gossip",
            "haggle",
            "intimidate",
            "intuition",
            "leadership",
            "melee",
            "navigation",
            "outdoor-survival",
            "perception",
            "ride",
            "row",
            "stealth"
        ],

        specialisations: [
            "basic",
            "brawling",
            "cavalry",
            "fencing",
            "flail",
            "parry",
            "polearm",
            "two-handed",
            "blackpowder",
            "bow",
            "crossbow",
            "engineering",
            "entangling",
            "explosives",
            "sling",
            "throwing",
            "aqshy",
            "chamon",
            "dhar",
            "ghur",
            "ghyran",
            "hysh",
            "shyish",
            "ulgu",
            "magick"
        ],

        repeating_skills: [
            "art",
            "entertain",
            "ride",
            "stealth",
            "animal-training",
            "language",
            "lore",
            "perform",
            "play",
            "sail",
            "secret-signs",
            "trade"
        ],

        repeating_sections: [
            "talent",
            "condition",
            "psychology",
            "corruption",
            "trappings",
            "armour",
            "weapons"
        ]
    }

    // Sheet Functions

    const initSheet = () => {

        wfrp.characteristics.forEach(char => calculateCharacteristic(char));

        wfrp.skills.forEach(skill => calculateSkill(skill));

        wfrp.specialisations.forEach(specialisation => calculateSpecialisation(specialisation));

        getAttrs(["sheet_version"], values => (values["sheet_version"] !== wfrp.sheet_version) ? updateSheet(values["sheet_version"]) : 0);

        recalculateEarnedXP();

        calculateArmour();

        getAttrs(["setting_init_option","setting_whisper","setting_bonus_option","setting_crit_option"], values => {

            toggleInitOption(values["setting_init_option"]);
    
            toggleWhisper(values["setting_whisper"]);
    
            toggleRollBonus(values["setting_bonus_option"]);
    
            toggleRollCrits(values["setting_crit_option"]);

        })
    }

    const updateSheet = (version) => {
        let updateAttrs = {};

        switch (version) {
            default:
                updateAttrs["sheet_version"] = wfrp.sheet_version;
            break; 
        }

        setAttrs(updateAttrs);
    }  

    const toggleRollDifficulty = (new_value) => {
        const difficulty = (new_value === "1") ? `?{Difficulty|Average (+20), 20|Very Easy (+60), 60|Easy (+40), 40|Average (+20), 20|Challenging (0), 0|Difficult (-10), -10|Hard (-20), -20|Very Hard (-30), -30}` :
                           0;
        
        setAttrs({
            difficulty_query:difficulty
        });
    }

    const toggleRollBonus = (new_value) => {
        let query = 0;
        let slbonus = "";

        if (new_value === "1") {
            query = "?{Bonus|0}";
            slbonus = "{{sl_bonus=?{SL Bonus|0}}}"
        }
        
        setAttrs({
            roll_query:query,
            roll_slbonus:slbonus
        });

    }

    const toggleRollCrits = (new_value) => {
        const cf = (new_value === "1") ? 95 :
                   (new_value === "2") ? 95 :
                   (new_value === "3") ? 99 :
                   95;

        const cs = (new_value === "1") ? 5 :
                   (new_value === "2") ? 1 :
                   (new_value === "3") ? 1 :
                   5;

        setAttrs({
            roll_cs:cs, 
            roll_cf:cf
        });
    }

    const toggleInitOption = (new_value) => {
        const init = (new_value === "1") ? `{{init=[[@{initiative} &{tracker}]]}}` :
                     (new_value === "2") ? `{{init=[[@{initiative}+1d10 &{tracker}]]}}` :
                     (new_value === "3") ? `{{init=[[@{agility_bonus}+@{initiative_bonus}+1d10 &{tracker}]]}}` :
                     `{{init=[[@{initiative}]]}}`;

        setAttrs({roll_init:init});
    }

    const toggleWhisper = (new_value) => {
        const whisper = (new_value === "2") ? `/w gm` : 
                                            ``;
        
        setAttrs({roll_whisper:whisper});
    }

    const parseModField = (new_value="", previous_value) => {
        const mods = new_value.toLowerCase().split(",").map(item=>item.trim());
        const prev_mods = (previous_value) ? previous_value.toLowerCase().split(",").map(item=>item.trim()) : [];

        [...mods, ...prev_mods].forEach(mod => applyMod(mod));
    }

    const applyMod = (mod) => {
        const parsed_name = mod.toLowerCase().replace(/[^a-z ]/g,"").trim().replace(/ /g,"_");

        wfrp.characteristics.forEach((char, index) => {
            const standard = new RegExp(`\\b${char.toLowerCase()}\\b`, "g");
            const short = new RegExp(`\\b${wfrp.characteristics_short[index].toLowerCase()}\\b`, "g");

            if (parsed_name.match(standard) || parsed_name.match(short)) recalculateAttribute(`${char}_modifier`, char);
        });
        wfrp.characteristics.forEach((char, index) => {
            const standard = `${char.toLowerCase()}_bonus`;
            const short = `${wfrp.characteristics_short[index].toLowerCase()}_bonus`;
            const tiny = `${wfrp.characteristics_short[index].toLowerCase()}b`;

            if (parsed_name === standard || parsed_name.match === short || parsed_name === tiny) recalculateAttribute(`${char}_bonusmod`, standard);
        });
        wfrp.skills.forEach(skill => (parsed_name.indexOf(skill) > -1) ? recalculateAttribute(`${skill}_modifier`, skill.replace(/_/g," ")) : false);
        if (parsed_name === "ranged damage") recalculateAttribute("ranged_damage_bonus","ranged damage");
        if (parsed_name === "melee damage") recalculateAttribute("melee_damage_bonus","melee damage");
        if (parsed_name === "movement") recalculateAttribute("movement_mod","movement");
        if (parsed_name === "walking" || parsed_name === "walk") recalculateAttribute("walk_mod","walking");
        if (parsed_name === "run" || parsed_name === "running") recalculateAttribute("run_mod","running");
        if (parsed_name === "wounds") recalculateAttribute("wound_mod","wounds");
        if (parsed_name === "encumbrance") recalculateAttribute("encumbrance_bonus","encumbrance");
    }

    const recalculateAttribute = (attribute, query) => {
        const attrs = [...wfrp.characteristics, ...wfrp.characteristics.map(item => `${item}_bonus`)];
        let match_array = [query];
        const parsed_query = query.replace(/ /g, "_");

        const synonyms = {
            "weapon_skill": ["ws","weapon_skill"],
            "ballistic_skill": ["bs","ballistic_skill"],
            "strength": ["s", "strength"],
            "toughness": ["t", "toughness"],
            "initiative": ["int", "initiative"],
            "agility": ["ag", "agility"],
            "dexterity": ["dex", "dexterity"],
            "intelligence": ["int", "intelligence"],
            "willpower": ["wp", "willpower"],
            "fellowship": ["fel", "fellowship"],
            "walking": ["walk", "walking"],
            "run": ["run", "run"],
            "wounds": ["wound", "wnds"],
            "weapon_skill_bonus": ["weapon_skill_bonus", "ws_bonus", "wsb"],
            "ballistic_skill_bonus": ["ballistic_skill_bonus", "bs_bonus", "bsb"],
            "strength_bonus": ["strength_bonus", "s_bonus", "sb"],
            "toughness_bonus": ["toughness_bonus", "t_bonus", "tb"],
            "initiative_bonus": ["initiative_bonus", "i_bonus", "isb"],
            "agility_bonus": ["agility_bonus", "ag_bonus", "agb"],
            "dexterity_bonus": ["dexterity_bonus", "dex_bonus", "dexb"],
            "intelligence_bonus": ["intelligence_bonus", "int_bonus", "intb"],
            "willpower_bonus": ["willpower_bonus", "wp_bonus", "wpb"],
            "fellowship_bonus": ["fellowship_bonus", "fel_bonus", "felb"],
        };

        Object.entries(synonyms).forEach(([key, array]) => {
            if (array.includes(parsed_query)) {
                query = query;
                match_array = array;
            }
        });

        wfrp.repeating_sections.forEach(section => {
            getSectionIDs(section, id_array => {
                id_array.forEach(id => attrs.push(`repeating_${section}_${id}_${section}_mods`));
                id_array.forEach(id => attrs.push(`repeating_${section}_${id}_${section}_ranks`));

                getAttrs(attrs, values => {
                    const mod_array = [];
                    const filtered_values = Object.entries(values).filter(([key, value]) => key.includes("_mods"));

                    filtered_values.forEach(([key, value]) => {
                        const modifiers = value.split(",");

                        if (modifiers[0] !== "") {
                            modifiers.forEach(mod => {

                                mod = mod.toLowerCase();

                                wfrp.characteristics.forEach((characteristic, index) => {      
                                    mod = mod.replace(`\[${characteristic.replace(/_/g, " ")}\]`, values[characteristic]);
                                    mod = mod.replace(`\[${characteristic.replace(/_/g, " ")} bonus\]`, values[`${characteristic}_bonus`]);
                                    mod = mod.replace(`\[${wfrp.characteristics_short[index].toLowerCase().replace(/_/g, " ")}\]`, values[characteristic]);
                                    mod = mod.replace(`\[${wfrp.characteristics_short[index].toLowerCase().replace(/_/g, " ")}b\]`, values[`${characteristic}_bonus`]);
                                });

                                const row_id = helperFunctions.extractRepeatingId(key,"talent");
                                const ranks = values[`${row_id}_talent_ranks`];
                                
                                mod = mod.replace(`\[rank\]`, ranks);

                                match_array.forEach(match => {
                                    const reg = new RegExp(`${match}\\b`, "g")
                                    mod = mod.replace(reg, query)
                                });

                                const mod_test = mod.toLowerCase().replace(/[^a-z _]/g, "").trim().replace(/ /g,"_");
                                const mod_value = parseInt(mod.toLowerCase().replace(/[^0-9\-]/g, "").trim());
                                
                                if (mod_test === query) mod_array.push(mod_value);
                            });

                        }
                    });

                    const new_value = mod_array.reduce((a,b) => a+b, 0);

                    setAttrs({[attribute]:new_value});
                });
            });
        });
    }

    // Species Controls

    const changeSpecies = (new_value) => {
        
        new_value = new_value.toLowerCase();

        const update = {
            fate: 0,
            resilience: 0,
            movement: 0,
            size: 0
        }

        if (new_value === "human") {
            update["fate"] = 2;
            update["resilience"] = 1;
            update["movement"] = 4;
            update["size"] = "average";
        }
        if (new_value === "dwarf") {
            update["fate"] = 0;
            update["resilience"] = 2;
            update["movement"] = 3;
            update["size"] = "average";
        }
        if (new_value === "halfling") {
            update["fate"] = 0;
            update["resilience"] = 2;
            update["movement"] = 3;
            update["size"] = "small";
        }
        if (new_value === "wood elf") {
            update["fate"] = 0;
            update["resilience"] = 0;
            update["movement"] = 4;
            update["size"] = "average";
        }
        if (new_value === "high elf") {
            update["fate"] = 0;
            update["resilience"] = 0;
            update["movement"] = 5;
            update["size"] = "average";
        }

        if (new_value !== "custom") {

            getCompendiumPage(`Species:${new_value}`, page => {
                const skills = helperFunctions.parseJSON(page.data.Skills);
                const talents = helperFunctions.parseJSON(page.data.Talents);
    
                const skills_fixed = skills.Fixed.split(",").map(item=>item.trim()) || [];
                const talents_fixed = talents.Fixed.split(",").map(item=>item.trim()) || [];
    
                let talents_choices = [];
    
                let skill_index = 1;
                let talent_index = 1;
                
                if (talents.Choices) talents.Choices.forEach(choice => talents_choices = [...talents_choices, ...choice]);
    
                for (let index = 1; index <= 12; index++) {
                    update[`species_skill_${index}_name`] = "";
                    update[`species_skill_${index}_advances`] = "0";
                }
    
                for (let index = 1; index <= 10; index++) {
                    update[`species_talent_${index}_name`] = "";
                    update[`species_talent_${index}_advances`] = "0";
                }
    
                for (const skill of skills_fixed) {
                    update[`species_skill_${skill_index}_name`] = skill;
                    update[`species_talent_${skill_index}_advances`] = "0";
                    skill_index++;
                }
    
                for (const talent of talents_fixed) {
                    update[`species_talent_${talent_index}_name`] = talent;
                    update[`species_talent_${talent_index}_advances`] = "1";
                    talent_index++;
                }
    
                for (const talent of talents_choices) {
                    update[`species_talent_${talent_index}_name`] = talent;
                    update[`species_talent_${talent_index}_advances`] = "0";
                    talent_index++;
                }
    
                setAttrs(update, {silent:true}, callback => calculateTalentAdvances());
            });

        } else {
            setAttrs(update);
        }
    }

    const checkSpeciesAdvances = () => {
        const attrs = [];

        for (let i = 1; i <= 12; i++) {
            attrs.push(`species_skill_${i}_advances`);
        }

        getAttrs(attrs, values => {
            let threes = 0;
            let fives = 0;

            Object.values(values).forEach(value => {
                if (value === "3") threes++;
                if (value === "5") fives++;
            });

            const update = {};

            update["species_disable3"] = (threes >= 3) ? 1 : 0;
            update["species_disable5"] = (fives >= 3) ? 1 : 0;

            setAttrs(update);
            
        });
        
    }

    // Characteristic Functions

    const calculateCharacteristic = (characteristic) => {
        
        const attrs = [
            `npc`,
            `${characteristic}`,
            `${characteristic}_initial`,
            `${characteristic}_advances`,
            `${characteristic}_modifier`,
            `${characteristic}_custom_mod`,
            `${characteristic}_bonusmod`,
        ];

        getAttrs(attrs, values => {
            const base = parseInt(values[`${characteristic}`]) || 0;
            const initial = parseInt(values[`${characteristic}_initial`]) || 0;
            const advances = parseInt(values[`${characteristic}_advances`]) || 0;
            const modifier = parseInt(values[`${characteristic}_modifier`]) || 0;
            const custom_mod = parseInt(values[`${characteristic}_custom_mod`]) || 0;
            const bonusmod = parseInt(values[`${characteristic}_bonusmod`]) || 0;

            if (values["npc"] === "on") {
    
                const updateAttrs = {};
                
                const bonus = Math.floor(base / 10) + bonusmod;

                updateAttrs[`${characteristic}_bonus`] = bonus;
    
                setAttrs(updateAttrs);
    
                return;
            } else {

                const current = initial + advances + modifier + custom_mod;
    
                const bonus = Math.floor(current / 10) + bonusmod;
    
                const updateAttrs = {};
    
                updateAttrs[`${characteristic}`] = current;
                updateAttrs[`${characteristic}_bonus`] = bonus;
    
                setAttrs(updateAttrs);

            }

        });
    }

    const cascadeAttributeChange = (characteristic) => {

        getAttrs(["npc"], check => {

            if (check["npc"] === "on") return;

            wfrp.skills.forEach(skill => {
                getAttrs([`${skill}_characteristic`], values => {
                    const skill_characteristic = values[`${skill}_characteristic`];

                    if (skill_characteristic === characteristic) calculateSkill(skill);
                });
            });

            wfrp.specialisations.forEach(specialisation => {
                getAttrs([`${specialisation}_characteristic`], values => {
                    const specialisation_characteristic = values[`${specialisation}_characteristic`];

                    if (specialisation_characteristic === characteristic) calculateSpecialisation(specialisation);
                });
            });

            wfrp.repeating_skills.forEach(section => {
                getSectionIDs(section, id_array => {
                    id_array.forEach(id => {
                        getAttrs([`repeating_${section}_${id}_specialisation_characteristic`], values => {
                            const repeating_characteristic = values[`repeating_${section}_${id}_specialisation_characteristic`];

                            if (repeating_characteristic === characteristic) recalculateRepeatingSkill(`repeating_${section}_${id}_specialisation_characteristic`, section);
                        });
                    });
                });
            });
        });
    }

    const updateMovementRates = (newValue) => {

        getAttrs(["npc"], check => {

            if (check["npc"] === "on") return;

            const movement = parseInt(newValue) || 0;
            const walk = movement * 2 || 0;
            const run = walk * 2 || 0;

            setAttrs({
                walk: walk,
                run: run
            });
        });
    }

    // Skill Functions

    const calculateSkill = (skill) => {

        getAttrs(["npc"], check => {

            if (check["npc"] === "on") return;
        
            const attrs = [
                `${skill}_characteristic`
            ];

            getAttrs(attrs, values => {
                const base = values[`${skill}_characteristic`];

                const attrs = [
                    `${base}`,
                    `${skill}_advances`,
                    `${skill}_bonus`,
                    `${skill}_modifier`
                ];

                getAttrs(attrs, values => {
                    const characteristic = parseInt(values[`${base}`]) || 0;
                    const advances = parseInt(values[`${skill}_advances`]) || 0;
                    const modifier = parseInt(values[`${skill}_modifier`]) || 0;
                    const bonus = parseInt(values[`${skill}_bonus`]) || 0;

                    const total = characteristic + advances + modifier + bonus;

                    const updateAttrs = {};

                    updateAttrs[`${skill}`] = total;

                    setAttrs(updateAttrs);
                });

            });

        });

    }

    const calculateSpecialisation = (specialisation) => {

        getAttrs(["npc"], check => {

            if (check["npc"] === "on") return;
        
            const attrs = [
                `${specialisation}_characteristic`,
                `npc`
            ];

            getAttrs(attrs, values => {
                const base = values[`${specialisation}_characteristic`];

                const attrs = [
                    `${base}`,
                    `${specialisation}_advances`,
                    `${specialisation}_modifier`,
                    `${specialisation}_bonus`
                ];

                getAttrs(attrs, values => {
                    const characteristic = parseInt(values[`${base}`]) || 0;
                    const advances = parseInt(values[`${specialisation}_advances`]) || 0;
                    const modifier = parseInt(values[`${specialisation}_modifier`]) || 0;
                    const bonus = parseInt(values[`${specialisation}_bonus`]) || 0;

                    const total = characteristic + advances + modifier + bonus;

                    const updateAttrs = {};

                    updateAttrs[`${specialisation}`] = total;

                    setAttrs(updateAttrs);

                });
            });
        });
    }

    const recalculateRepeatingSkill = (attribute, section) => {
        const repeating_id = helperFunctions.extractRepeatingId(attribute, section);

        const attrs = [`${repeating_id}_specialisation_characteristic`]

        getAttrs(attrs, values => {
        
            const attrs_2 = [
                `${values[`${repeating_id}_specialisation_characteristic`]}`,
                `${repeating_id}_specialisation_char`,
                `${repeating_id}_specialisation_advances`,
                `${repeating_id}_specialisation_modifier`,
            ];

            getAttrs(attrs_2, values_2 => {
                values = {...values, ...values_2};
                characteristic = values[values[`${repeating_id}_specialisation_characteristic`]] || 0;

                const updateAttrs = {};

                updateAttrs[`${repeating_id}_specialisation_char`] = characteristic;

                const advances = parseInt(values[`${repeating_id}_specialisation_advances`]) || 0;
                const modifier = parseInt(values[`${repeating_id}_specialisation_modifier`]) || 0;

                const total = characteristic + advances + modifier;

                updateAttrs[`${repeating_id}_specialisation`] = total;

                setAttrs(updateAttrs, {silent:true});
            });
        });
    }

    const cascadeSkillChanges = (attribute) => {

        const sections = ["spells","weapons"];

        helperFunctions.aggregateRepeatingIDs(sections, ids => {
                
            for (const id of ids["spells"]) {

                calculateSpellValue(`repeating_spells_${id}_spell_type`);

            }
                
            for (const id of ids["weapons"]) {

                updateWeaponTarget(`repeating_weapons_${id}_weapon_type`);

            }

        });

    }

    // Career Functions

    const updateCareerPath = () => {
        const attrs = [];

        helperFunctions.getSectionIDsOrdered("careers", id_array => {
            id_array.forEach(id => attrs.push(`repeating_careers_${id}_career_name`));

            getAttrs(attrs, values => {
                const updateAttrs = {};

                const names = Object.values(values).filter(value => value !== ""); 
                const career_path = names.join("⟶");
    
                updateAttrs[`career_path`] = career_path;
    
                setAttrs(updateAttrs);
            });
        });
    }

    const updateFirstCareer = () => {
        helperFunctions.getSectionIDsOrdered("careers", id_array => {

            if (id_array.length > 0) {

                const updateAttrs = {};
    
                const first = id_array.shift();
    
                updateAttrs [`repeating_careers_${first}_career_first`] = "on";
                id_array.forEach(id => updateAttrs[`repeating_careers_${id}_career_first`] = 0);
    
                setAttrs(updateAttrs);

            }

        });
    }

    const updateCurrentCareer = () => {
        const updateAttrs = {};

        helperFunctions.getSectionIDsOrdered("careers", id_array => {

            if (id_array.length > 0) {
                const current_id = id_array.pop();

                id_array.forEach(id => updateAttrs[`repeating_careers_${id}_career_current`] = 0);

                updateAttrs[`repeating_careers_${current_id}_career_current`] = "on";
            
                getAttrs([`repeating_careers_${current_id}_career_name`,`repeating_careers_${current_id}_career_level`,`repeating_careers_${current_id}_career_status`], values => {    
                    updateAttrs[`career`] = values[`repeating_careers_${current_id}_career_name`] || "";
                    updateAttrs[`career_level`] = values[`repeating_careers_${current_id}_career_level`] || "";
                    updateAttrs[`status`] = values[`repeating_careers_${current_id}_career_status`] || "";
        
                    setAttrs(updateAttrs);
                });
            }
        });
    }

    const updateCurrentCareerLevel = (attribute, new_value) => {
        const section = "careers";   
        const repeating_id = helperFunctions.extractRepeatingId(attribute, section);
        const updateAttrs = {};

        updateAttrs[`${repeating_id}_career_level_current`] = new_value;           

        setAttrs(updateAttrs);
    }

    const updateCareerNames = (attribute) => {
        const section = "careers";   
        const repeating_id = helperFunctions.extractRepeatingId(attribute, section);

        const attrs = [];

        [1,2,3,4].forEach(level => {
            attrs.push(`${repeating_id}_career_level${level}_name`)
            attrs.push(`${repeating_id}_career_level${level}_status`)
        });  

        attrs.push(`${repeating_id}_career_current`);        
        attrs.push(`${repeating_id}_career_level_current`);

        getAttrs(attrs, values => {
            const updateAttrs = {};
            const current_level = values[`${repeating_id}_career_level_current`];
            const current_career = values[`${repeating_id}_career_current`];

            updateAttrs[`${repeating_id}_career_level`] = values[`${repeating_id}_career_level${current_level}_name`] || "";
            updateAttrs[`${repeating_id}_career_status`] = values[`${repeating_id}_career_level${current_level}_status`] || "";

            if (current_career === "on") {
                updateAttrs[`career_level`] = values[`${repeating_id}_career_level${current_level}_name`] || "-";
                updateAttrs[`status`] = values[`${repeating_id}_career_level${current_level}_status`] || "-";
            }

            setAttrs(updateAttrs);
        });       
    }

    // Experience Functions    

    const calculateTotalAdvances = (attribute) => {
        const section = "careers";   
        const repeating_id = helperFunctions.extractRepeatingId(attribute, section);

        const attrs = [];

        wfrp.characteristics.forEach(characteristic => attrs.push(`${repeating_id}_career_${characteristic}_advances`));

        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 10; j++) {
                attrs.push(`${repeating_id}_career_skill_${i}_${j}_advances`); 
                attrs.push(`${repeating_id}_career_skill_${i}_${j}_init`); 
            }

            for (let k = 1; k <= 5; k++) {
                attrs.push(`${repeating_id}_career_talent_${i}_${k}_advances`);
                attrs.push(`${repeating_id}_career_talent_${i}_${k}_init`); 
            }
        }

        attrs.push(`${repeating_id}_career_first`);

        getAttrs(attrs, values => { 
            const skills_filtered = Object.entries(values).filter(([key,value]) => key.includes("career_skill"));
            const talents_filtered = Object.entries(values).filter(([key,value]) => key.includes("talent"));

            let skills_values = skills_filtered.map(item => parseInt(item[1]) || 0);
            let talents_values = talents_filtered.map(item => parseInt(item[1]) || 0);

            let total_skills_advances = skills_values.reduce((a,b) => a+b);
            let total_talents_advances = talents_values.reduce((a,b) => a+b);

            const abs_total = total_skills_advances + total_talents_advances || "";

            const updateAttrs = {};

            updateAttrs[`${repeating_id}_career_advances`] = (abs_total > 0) ? abs_total : "";

            setAttrs(updateAttrs, recalculateSpentXP());
        });
    }

    const calculateCharacteristicXP = (value, free) => {
        let int = parseInt(value) + parseInt(free);
        let countdown = parseInt(free);
        let accumulator = 0;

        while (int > 0) {
            if (int > countdown) {
                accumulator +=
                    (int <= 5) ? 25 :
                    (int <= 10) ? 30 :
                    (int <= 15) ? 40 :
                    (int <= 20) ? 50 :
                    (int <= 25) ? 70 :
                    (int <= 30) ? 90 :
                    (int <= 35) ? 120 :
                    (int <= 40) ? 150 :
                    (int <= 45) ? 190 :
                    (int <= 50) ? 230 :
                    (int <= 55) ? 280 :
                    (int <= 60) ? 330 :
                    (int <= 65) ? 390 :
                    (int <= 70) ? 450 :
                    520;
            }

            int--;
        }

        return accumulator;
    }

    const calculateSkillXP = (value, free) => {
        let int = parseInt(value) + parseInt(free);
        let countdown = parseInt(free);
        let accumulator = 0;

        while (int > 0) {
            if (int > countdown) {
                accumulator +=
                    (int <= 5) ? 10 :
                    (int <= 10) ? 15 :
                    (int <= 15) ? 20 :
                    (int <= 20) ? 30 :
                    (int <= 25) ? 40 :
                    (int <= 30) ? 60 :
                    (int <= 35) ? 80 :
                    (int <= 40) ? 110 :
                    (int <= 45) ? 140 :
                    (int <= 50) ? 180 :
                    (int <= 55) ? 220 :
                    (int <= 60) ? 270 :
                    (int <= 65) ? 320 :
                    (int <= 70) ? 380 :
                    440;
            }

            int--;
        }

        return accumulator;
    }

    const calculateTalentXP = (value, free) => {
        let int = parseInt(value) + parseInt(free);
        let countdown = parseInt(free);
        let accumulator = 0;

        while (int > 0) {

            if (int > countdown) accumulator += int * 100

            int--;
        }

        return accumulator;
    }

    const recalculateSpentXP = () => {

        helperFunctions.aggregateRepeatingIDs([`careers`, `experience`, `experiencespent`], ids => {

            const attrs = [];

            for (const id of ids.careers) {

                for (const characteristic of wfrp.characteristics) {
                    attrs.push(`repeating_careers_${id}_career_${characteristic}_advances`);
                    attrs.push(`repeating_careers_${id}_career_${characteristic}_init`);
                }

                for (let i = 1; i <= 4; i++) {
                    for (let j = 1; j <= 10; j++) {
                        attrs.push(`repeating_careers_${id}_career_skill_${i}_${j}_name`); 
                        attrs.push(`repeating_careers_${id}_career_skill_${i}_${j}_advances`); 
                        attrs.push(`repeating_careers_${id}_career_skill_${i}_${j}_init`); 
                    }
        
                    for (let k = 1; k <= 5; k++) {
                        attrs.push(`repeating_careers_${id}_career_talent_${i}_${k}_name`);
                        attrs.push(`repeating_careers_${id}_career_talent_${i}_${k}_advances`);
                        attrs.push(`repeating_careers_${id}_career_talent_${i}_${k}_init`);
                    }
                }
            }

            for (let i = 1; i <= 10; i++) {
                attrs.push(`species_talent_${i}_name`); 
                attrs.push(`species_talent_${i}_advances`);
            }

            for (let i = 1; i <= 12; i++) {
                attrs.push(`species_skill_${i}_name`); 
                attrs.push(`species_skill_${i}_advances`);
            }

            for (const id of ids.experience) {
                attrs.push(`repeating_experience_${id}_experience_amount`);
            }

            for (const id of ids.experiencespent) {
                attrs.push(`repeating_experiencespent_${id}_experience_amount`);

            }
            
            getAttrs(attrs, values => {
                const entries = Object.entries(values).filter(([key, value]) => value !== "");

                const characteristic_advances = new Map();
                const characteristic_advances_free = new Map();

                const skill_advances = new Map();
                const skill_advances_free = new Map();
                
                const talent_advances = new Map();
                const talent_advances_free = new Map();

                for (const id of ids.careers) {

                    wfrp.characteristics.forEach(characteristic => {
                        const value = parseInt(values[`repeating_careers_${id}_career_${characteristic}_advances`]) || 0;
                        const current = characteristic_advances.get(characteristic) || 0; 
                        const total = value + current;

                        const value_free = parseInt(values[`repeating_careers_${id}_career_${characteristic}_init`]) || 0;
                        const current_free = characteristic_advances_free.get(characteristic) || 0; 
                        const total_free = value_free + current_free;

                        characteristic_advances.set(characteristic, total);
                        characteristic_advances_free.set(characteristic, total_free);
                    });
    
                    for (let i = 1; i <= 4; i++) {
                        for (let j = 1; j <= 10; j++) {
                            const skill = values[`repeating_careers_${id}_career_skill_${i}_${j}_name`];

                            const value = parseInt(values[`repeating_careers_${id}_career_skill_${i}_${j}_advances`]) || 0;
                            const current = skill_advances.get(skill) || 0;
                            const total = current + value;

                            const value_free = parseInt(values[`repeating_careers_${id}_career_skill_${i}_${j}_init`]) || 0;
                            const current_free = skill_advances_free.get(skill) || 0;
                            const total_free = current_free + value_free;

                            skill_advances.set(skill, total);
                            skill_advances_free.set(skill, total_free);
                        }
            
                        for (let k = 1; k <= 5; k++) {
                            const talent = values[`repeating_careers_${id}_career_talent_${i}_${k}_name`];

                            const value = parseInt(values[`repeating_careers_${id}_career_talent_${i}_${k}_advances`]) || 0;
                            const current = talent_advances.get(talent) || 0;
                            const total = current + value;

                            const value_free = parseInt(values[`repeating_careers_${id}_career_talent_${i}_${k}_init`]) || 0;
                            const current_free = talent_advances_free.get(talent) || 0;
                            const total_free = current_free + value_free;

                            talent_advances.set(talent, total);
                            talent_advances_free.set(talent, total_free);
                        }
                    }
                }

                for (let i = 1; i <= 12; i++) {
                    const skill = values[`species_skill_${i}_name`];

                    const value_free = parseInt(values[`species_skill_${i}_advances`]) || 0;
                    const current_free = skill_advances_free.get(skill) || 0;
                    const total_free = current_free + value_free;

                    skill_advances_free.set(skill, total_free);
                }

                for (let i = 1; i <= 10; i++) {
                    const talent = values[`species_talent_${i}_name`];

                    const value_free = parseInt(values[`species_talent_${i}_advances`]) || 0;
                    const current_free = talent_advances_free.get(talent) || 0;
                    const total_free = current_free + value_free;
                }

                let xp = 0;

                characteristic_advances.forEach((value, key) => xp += calculateCharacteristicXP(value, characteristic_advances_free.get(key)));
                skill_advances.forEach((value, key) => xp += calculateSkillXP(value, skill_advances_free.get(key)));
                talent_advances.forEach((value, key) => xp += calculateTalentXP(value, talent_advances_free.get(key)));

                for (const id of ids.experiencespent) {
                    const value = parseInt(values[`repeating_experiencespent_${id}_experience_amount`]);

                    xp += value;
                }

                const updateAttrs = {};
    
                updateAttrs[`spent_xp`] = xp;
    
                setAttrs(updateAttrs, recalculateCurrentXP());

            });

        });

    }

    const recalculateEarnedXP = () => {
        const attrs = [];

        getSectionIDs("experience", id_array => {

            id_array.forEach(id => {
                attrs.push(`repeating_experience_${id}_experience_amount`);
            });

            attrs.push(`experience_mod`);

            getAttrs(attrs, values => {
                const int_values = Object.values(values).map(item => parseInt(item) || 0).filter(item => item > 0);
                const total_xp = int_values.reduce((a,b) => a+b, 0);

                setAttrs({total_xp: total_xp}, recalculateCurrentXP());
            });
        });
    }

    const recalculateCurrentXP = () => {
        getAttrs(["total_xp","spent_xp"], values => {
            const total = parseInt(values["total_xp"]) || 0;
            const spent = parseInt(values["spent_xp"]) || 0;
            const current = total - spent;

            setAttrs({current_xp:current});
        });
    }

    const consolidateXP = () => {
        
        let date = ( new Date() ).toLocaleDateString();
        
        getAttrs(["total_xp"], values => {

            getSectionIDs("experience", id_array => {

                id_array.forEach(id => removeRepeatingRow(`repeating_experience_${id}`));

            });

            const new_id = generateRowID();

            setAttrs({
                [`repeating_experience_${new_id}_experience_desc`]:`XP Consolidated (${date})`,
                [`repeating_experience_${new_id}_experience_amount`]:values.total_xp,
            });

        });
    }

    const calculateCharacteristicAdvances = (characteristic) => {
        getSectionIDs("careers", id_array => {
            const attrs = [];

            id_array.forEach(id => {
                attrs.push(`repeating_careers_${id}_career_${characteristic}_advances`); 
                attrs.push(`repeating_careers_${id}_career_${characteristic}_init`);     
            });

            attrs.push(`${characteristic}_noncareer`);

            getAttrs(attrs, values => {
                const int_values = Object.values(values).map(item => parseInt(item) || 0);
                const total_advances = int_values.reduce((a,b) => a+b);

                setAttrs({[`${characteristic}_advances`]:total_advances});
            });
        });   
    }

    const calculateSkillAdvances = (skill) => {
        getSectionIDs("careers", id_array => {

            getSectionIDs("noncareer-skills", id_array_2 => {
                const attrs = [];
                const skills = new Map();

                id_array.forEach((id, index) => {

                    for (let i = 1; i <= 4; i++) {
                        for (let j = 1; j <= 10; j++) {
                            attrs.push(`repeating_careers_${id}_career_skill_${i}_${j}_name`); 
                            attrs.push(`repeating_careers_${id}_career_skill_${i}_${j}_advances`); 
                            if (i === 1) attrs.push(`repeating_careers_${id}_career_skill_${i}_${j}_init`); 
                        }
                    }
                });

                id_array_2.forEach((id) => {
                    attrs.push(`repeating_noncareer-skills_${id}_advance_name`)
                    attrs.push(`repeating_noncareer-skills_${id}_advance_advances`)
                });

                for (let i = 1; i <= 12; i++) {
                    attrs.push(`species_skill_${i}_name`); 
                    attrs.push(`species_skill_${i}_advances`);
                }
        
                getAttrs(attrs, values => {
                    const skill_list = Object.entries(values);
                    const names = skill_list.filter(([key, value]) => key.match(/name/g) && value !== "");

                    names.forEach(([id, name]) => {
                        const value_addr = id.substring(0,id.length-4) + "advances";
                        const init_addr = id.substring(0,id.length-4) + "init";
                        const value = parseInt(values[value_addr]) || 0;
                        const init = parseInt(values[init_addr]) || 0;

                        const current = skills.get(name) || 0;

                        const set = current + value + init;

                        skills.set(name, set);
                    });

                    const updateAttrs = {};

                    skills.forEach((value, key) => {
                        let parsed_key = key.replace(/ /g,"-").toLowerCase();

                        if (wfrp.skills.includes(parsed_key)) {

                            updateAttrs[`${parsed_key}_advances`] = value;
                            
                        } else if (key.match(/\(/g)) {
                            const group = key.split("(")[0]
                                            .trim()
                                            .replace(/ /g,"-")
                                            .toLowerCase();
                                            
                            const specialisation = key.split("(")[1]
                                                      .trim()
                                                      .replace(/\)/g,"");
                                            
                            const specialisation_test = specialisation.toLowerCase();

                            if (wfrp.specialisations.includes(specialisation_test)) {

                                updateAttrs[`${specialisation}_advances`] = value;

                                if (value > 0) updateAttrs[`${specialisation}_control`] = "on";

                            } else if (wfrp.repeating_skills.includes(group)) {

                                modifyRepeatingSkill(group, specialisation, value);

                            }
                        }
                    });

                    setAttrs(updateAttrs);

                });

            });   

        });   
    }

    const modifyRepeatingSkill = (group, specialisation, value) => {

        getSectionIDs(group, id_array => {
            const attrs = [];
            const updateAttrs = {};

            id_array.forEach(id => {
                const addr = `repeating_${group}_${id}`;
                attrs.push(`${addr}_specialisation_name`);
            });

            getAttrs(attrs, values => {
                const value_array = Object.values(values).filter(item => item !== "");
                const value_array_test = value_array.map(item=>item.toLowerCase());
                const key_array = Object.keys(values).filter(item => item !== "");
                const specialisation_test = specialisation.toLowerCase();

                if (value_array_test.includes(specialisation_test)) {
                    const index = value_array_test.indexOf(specialisation_test);
                    const key = key_array[index];
                    const new_key = `${key.substring(0, key.length-5)}_advances`;
                    
                    updateAttrs[new_key] = value;
                } else if (value > 0) {
                    const new_id = generateRowID();
                    updateAttrs[`repeating_${group}_${new_id}_specialisation_name`] = specialisation;
                    updateAttrs[`repeating_${group}_${new_id}_specialisation_advances`] = value;
                }

                setAttrs(updateAttrs);
            });
        });
    };

    const calculateTalentAdvances = () => {
        getSectionIDs("careers", id_array => {
            const attrs = [];
            const talents = new Map();

            id_array.forEach((id, index) => {

                for (let i = 1; i <= 4; i++) {
                    for (let j = 1; j <= 5; j++) {
                        attrs.push(`repeating_careers_${id}_career_talent_${i}_${j}_name`); 
                        attrs.push(`repeating_careers_${id}_career_talent_${i}_${j}_advances`); 
                        if (index === 0) attrs.push(`repeating_careers_${id}_career_talent_${i}_${j}_init`); 
                    }
                }
            });

            for (let i = 1; i <= 10; i++) {
                attrs.push(`species_talent_${i}_name`); 
                attrs.push(`species_talent_${i}_advances`);
            }
    
            getAttrs(attrs, values => {
                const talent_list = Object.entries(values);
                const names = talent_list.filter(([key, value]) => key.match(/name/g) && value !== "");

                names.forEach(([id, name]) => {
                    const value_addr = id.substring(0,id.length-4) + "advances"; 
                    const init_addr = id.substring(0,id.length-4) + "init";
                    const value = parseInt(values[value_addr]) || 0;
                    const init = parseInt(values[init_addr]) || 0;

                    const current = talents.get(name) || 0;

                    const set = current + value + init;

                    talents.set(name, set);
                });

                talents.forEach((value, key) => {
                    if (value !== 0) {

                        getSectionIDs("talent", id_array => {
                            const attrs = [];
                            const updateAttrs = {};

                            id_array.forEach(id => {
                                const addr = `repeating_talent_${id}`;
                                attrs.push(`${addr}_talent_name`);
                            });

                            getAttrs(attrs, values => {
                                const value_array = Object.values(values).filter(item => item !== "");
                                const value_array_test = value_array.map(item => item.toLowerCase());

                                const key_array = Object.keys(values).filter(item => item !== "");

                                let page_name = key.split("(")[0].trim() || key;

                                if (value_array_test.includes(page_name.toLowerCase())) {
                                    const index = value_array_test.indexOf(page_name.toLowerCase());
                                    const array_key = key_array[index];
                                    const new_key = `${array_key.substring(0, array_key.length-5)}_ranks`;
                                    
                                    updateAttrs[new_key] = value;
                                } else if (value > 0) {

                                    getCompendiumPage(`Talents:${page_name}`, page => {
                                        
                                        if (page.expansion !== 0 && page.expansion) {

                                            wfrpDragAndDrop.handleDrop({drop_name:page.name, drop_content:page.content, drop_data:page.data}, key);
                                        
                                        } else {
                                            const new_id = generateRowID();

                                            updateAttrs[`repeating_talent_${new_id}_talent_name`] = key;
                                            updateAttrs[`repeating_talent_${new_id}_talent_ranks`] = value;

                                            setAttrs(updateAttrs);
                                        }

                                    });
                                }
                                
                            });
                        });

                    }

                });

            });

        });
    }

    const calculateInitColumns = (source_attribute, new_value) => {
        const attrs = [];
        const source_type = (source_attribute.match(/talent/g)) ? "talent" :
                            (source_attribute.match(/skill/g)) ? "skill" :
                            false;
        const source_id = helperFunctions.extractRepeatingId(source_attribute, "careers");
        const is_init = source_attribute.match(/init/);

        if (!source_type || !is_init) return;

        if (source_type === "talent") {
            for (let i = 1; i <= 5; i++) {
                attrs.push(`${source_id}_career_talent_1_${i}_init`); 
            }
        }

        if (source_type === "skill") {
            for (let i = 1; i <= 10; i++) {
                attrs.push(`${source_id}_career_skill_1_${i}_init`); 
            }
        }

        getAttrs(attrs, values => {
            const spent = Object.values(values).filter(item => item !== "").map(item => parseInt(item));
            const total = spent.reduce((a,b) => a+b) || 0;
            const maximum_allowed = (source_type === "skill") ? 40 : 1;
            
            if (total > maximum_allowed) {
                const difference = parseInt(new_value) - (total - maximum_allowed);

                setAttrs({[source_attribute]:difference});
            }

        });

    }

    // Trappings, Weapons & Armor Functions

    const calculateArmour = () => {
        
        getSectionIDs("armour", id_array=> {
            const attrs = []

            id_array.forEach(id => {
                attrs.push(`repeating_armour_${id}_armour_points`);
                attrs.push(`repeating_armour_${id}_armour_locations`);
                attrs.push(`repeating_armour_${id}_armour_worn`);
            });

            getAttrs(attrs, values => {
                let armour_head = 0;
                let armour_leftarm = 0;
                let armour_rightarm = 0;
                let armour_body = 0;
                let armour_leftleg = 0;
                let armour_rightleg = 0;
                let armour_shield = 0;
                let armour_all = 0;

                id_array.forEach(id => {
                    const points = parseInt(values[`repeating_armour_${id}_armour_points`]) || 0;
                    const locations = values[`repeating_armour_${id}_armour_locations`];
                    const worn = values[`repeating_armour_${id}_armour_worn`];

                    const locations_array = locations.split(",").map(location => location.trim().replace(" ",""));
                    const locations_array_test = locations_array.map(location => location.toLowerCase());

                    if (worn === "on") {

                        if (locations_array_test.includes("head") || locations_array.includes("H")) armour_head += points;
                        if (locations_array_test.includes("leftarm") || locations_array.includes("LA")) armour_leftarm += points;
                        if (locations_array_test.includes("rightarm") || locations_array.includes("RA")) armour_rightarm += points;
                        if (locations_array_test.includes("body") || locations_array.includes("B")) armour_body += points;
                        if (locations_array_test.includes("leftleg") || locations_array.includes("LL")) armour_leftleg += points;
                        if (locations_array_test.includes("rightleg") || locations_array.includes("RL")) armour_rightleg += points;
                        if (locations_array_test.includes("shield") || locations_array.includes("S")) armour_shield += points;
                        if (locations_array_test.includes("all") || locations_array.includes("ALL")) armour_all += points;

                    }

                    const location_out = locations_array.map(item => {
                        return (item.toLowerCase() === "head" || item === "H") ? "H" : 
                               (item.toLowerCase() === "leftarm" || item === "LA") ? "LA" : 
                               (item.toLowerCase() === "rightarm" || item === "RA") ? "RA" : 
                               (item.toLowerCase() === "body" || item === "B") ? "B" : 
                               (item.toLowerCase() === "leftleg" || item === "LL") ? "LL" : 
                               (item.toLowerCase() === "rightleg" || item === "RL") ? "RL" : 
                               (item.toLowerCase() === "shield" || item === "S") ? "S" :  
                               (item.toLowerCase() === "all" || item === "ALL") ? "ALL" : 
                               "";
                    }).filter(item => item !== "").join(", ");

                    setAttrs({
                        [`repeating_armour_${id}_armour_locations_display`]: location_out 
                    })
                });

                setAttrs({
                    armour_head:armour_head + armour_all,
                    armour_rightarm:armour_rightarm + armour_all,
                    armour_leftarm:armour_leftarm + armour_all,
                    armour_body:armour_body + armour_all,
                    armour_leftleg:armour_leftleg + armour_all,
                    armour_rightleg:armour_rightleg + armour_all,
                    armour_shield:armour_shield + armour_all,
                });

            });

        });
    }

    const calculateMaxEncumbrance = () => {
        const attrs = ["strength_bonus", "toughness_bonus", "encumbrance_bonus", "encumbrance_mod"];

        getAttrs(attrs, values => {
            const strength_bonus = parseInt(values["strength_bonus"]) || 0;
            const toughness_bonus = parseInt(values["toughness_bonus"]) || 0;
            const encumbrance_bonus = parseInt(values["encumbrance_bonus"]) || 0;
            const encumbrance_mod = parseInt(values["encumbrance_mod"]) || 0;

            const new_enc = strength_bonus + toughness_bonus + encumbrance_bonus + encumbrance_mod;

            const updateAttrs = {};

            updateAttrs["encumbrance_max"] = new_enc;
            
            setAttrs(updateAttrs);
        });
    }

    const calculateCurrentEncumbrance = () => {        
        
        getSectionIDs("trappings", trappings_array => {
            getSectionIDs("armour", armour_array => {
                getSectionIDs("weapons", weapons_array => {
                    const attrs = []
                    
                    armour_array.forEach(id => {
                        attrs.push(`repeating_armour_${id}_armour_enc`);
                        attrs.push(`repeating_armour_${id}_armour_worn`);
                    });
                    
                    weapons_array.forEach(id => {
                        attrs.push(`repeating_weapons_${id}_weapon_enc`);
                    });

                    trappings_array.forEach(id => { 
                        attrs.push(`repeating_trappings_${id}_trappings_enc`);
                        attrs.push(`repeating_trappings_${id}_trappings_amount`);
                        attrs.push(`repeating_trappings_${id}_trappings_inenc`);
                        attrs.push(`repeating_trappings_${id}_trappings_worn`);
                    });

                    getAttrs(attrs, values => {

                        let total_enc = 0;

                        armour_array.forEach(id => {
                            const worn = values[`repeating_armour_${id}_armour_worn`] || false;
                            const enc = parseInt(values[`repeating_armour_${id}_armour_enc`])
                            const total = (worn === "on") ? enc - 1 : enc || 0

                            total_enc += total;
                        });

                        weapons_array.forEach(id => {
                            const enc = parseInt(values[`repeating_weapons_${id}_weapon_enc`]) || 0;

                            total_enc += enc;
                        });
                        
                        trappings_array.forEach(id => {
                            const enc = parseInt(values[`repeating_trappings_${id}_trappings_enc`]) || 0;
                            const amount = parseInt(values[`repeating_trappings_${id}_trappings_amount`]) || 1;
                            const worn = values[`repeating_trappings_${id}_trappings_worn`] || false;
                            const inenc = values[`repeating_trappings_${id}_trappings_inenc`] || "0";

                            const total = (worn === "on") ? (enc - 1) * amount : enc * amount;

                            if (inenc === "on") total_enc += total;
                        });

                        setAttrs({encumbrance:total_enc})

                    });

                });

            });

        });

    }

    const calculateMaxWounds = () => {
        const attrs = ["strength_bonus", "toughness_bonus", "willpower_bonus", "size", "wound_mod"];

        getAttrs(attrs, values => {
            const strength_bonus = parseInt(values["strength_bonus"]) || 0;
            const toughness_bonus = parseInt(values["toughness_bonus"]) || 0;
            const willpower_bonus = parseInt(values["willpower_bonus"]) || 0;
            const size = values["size"] || "average";
            const size_test = size.toLowerCase();
            const wound_mod = parseInt(values["wound_mod"]) || 0;

            const new_wounds = (size_test === "tiny") ? 1 :
                               (size_test === "little") ? toughness_bonus : 
                               (size_test === "small") ? (toughness_bonus * 2) + willpower_bonus : 
                               (size_test === "average") ? strength_bonus + (toughness_bonus * 2) + willpower_bonus : 
                               (size_test === "large") ? (strength_bonus + (toughness_bonus * 2) + willpower_bonus) * 2 : 
                               (size_test === "enormous") ? (strength_bonus + (toughness_bonus * 2) + willpower_bonus) * 4 : 
                               (size_test === "monstrous") ? (strength_bonus + (toughness_bonus * 2) + willpower_bonus) * 8 : 
                               (strength_bonus + (toughness_bonus * 2) + willpower_bonus) * 2;

            const updateAttrs = {};

            updateAttrs["wounds_max"] = new_wounds + wound_mod;
            
            setAttrs(updateAttrs);
        });
        
    }  

    const incrementAdvantage = () => {
        getAttrs(["advantage", "setting_max_advantage"], values => {
            const maximum = (values.setting_max_advantage && parseInt(values.setting_max_advantage) > 0) ? parseInt(values.setting_max_advantage) : 9999;
            const advantage = (parseInt(values.advantage) < maximum) ? parseInt(values.advantage) + 1 : parseInt(values.advantage);
            
            setAttrs({advantage:advantage});
        });
    }

    const decrementAdvantage = () => {
        getAttrs(["advantage"], values => {
            const advantage = (parseInt(values.advantage) > 0) ? parseInt(values.advantage) - 1 : 0;
            
            setAttrs({advantage:advantage});
        });
    }

    const updateWeaponDamage = (attribute) => {
        const section = "weapons";   
        const repeating_id = helperFunctions.extractRepeatingId(attribute, section);

        const attrs = [];

        attrs.push(`${repeating_id}_weapon_damage_flat`); 
        attrs.push(`${repeating_id}_weapon_damage_bonus`); 

        getAttrs(attrs, values => {
            const string = (values[`${repeating_id}_weapon_damage_bonus`] === "on") ? `@{strength_bonus}+${values[`${repeating_id}_weapon_damage_flat`]}` : values[`${repeating_id}_weapon_damage_flat`];
            
            setAttrs({
                [`${repeating_id}_weapon_damage`]:string
            });
        })
    }

    const updateWeaponTarget = (attribute) => {
        const section = "weapons";   
        const repeating_id = helperFunctions.extractRepeatingId(attribute, section);

        getAttrs([`${repeating_id}_weapon_group`], values => {

            const name = values[`${repeating_id}_weapon_group`].toLowerCase();
    
            getAttrs([name], values => {
                const display = values[name];
                const target = `@{${name}}`;
                
                setAttrs({
                    [`${repeating_id}_weapon_target`]:target,
                    [`${repeating_id}_weapon_target_display`]:display,
                });
            });
        });
    }

    const currencyConversion = (conversion) => {

        getAttrs(["gold","silver","brass"], values => {

            const gold = parseInt(values.gold) || 0;
            const silver = parseInt(values.silver) || 0;
            const brass = parseInt(values.brass) || 0;

            if (conversion === "gold_to_silver") {
                if (gold >= 1) {                    
                    setAttrs({
                        gold: gold-1,
                        silver: silver+20
                    });
                }
            } else if (conversion === "silver_to_gold") {
                if (silver >= 20) {                    
                    setAttrs({
                        gold: gold+1,
                        silver: silver-20
                    });
                }
            } else if (conversion === "silver_to_brass") {
                if (silver >= 1) {                    
                    setAttrs({
                        silver: silver-1,
                        brass: brass+12
                    });
                }
            } else if (conversion === "brass_to_silver") {
                if (brass >= 12) {                    
                    setAttrs({
                        silver: silver+1,
                        brass: brass-12
                    });
                }
            }

        });

    };

    // Spells & Prayers Functions    

    const calculateSpellValue = (attribute) => {
        const section = "spells";   
        const repeating_id = helperFunctions.extractRepeatingId(attribute, section);
        
        getAttrs(["magick","pray",`${repeating_id}_spell_type`], values => {

            const new_value = values[`${repeating_id}_spell_type`];

            const target = (new_value === "Spell") ? "@{magick}" : 
                                                     "@{pray}";
            const clear = (new_value === "Spell") ? "deity" :
                                                    "lore";
            
            const display = (new_value === "Spell") ? values["magick"] : values["pray"];

            setAttrs({
                [`${repeating_id}_spell_total`]:target, 
                [`${repeating_id}_spell_display`]:display
            });

        });
    }

    // NPC Functions

    const getAttackValue = (attribute) => {
        const section = "attacks";
        const repeating_id = helperFunctions.extractRepeatingId(attribute, section);

        const request = [
            `${repeating_id}_attack_type`,
            "weapon_skill",
            "ballistic_skill",
            "basic",
            "brawling",
            "cavalry",
            "fencing",
            "flail",
            "parry",
            "polearm",
            "two-handed",
            "blackpowder",
            "bow",
            "crossbow",
            "engineering",
            "entangling",
            "explosives",
            "sling",
            "throwing"
        ];

        getAttrs(request, values => {
            const type = values[`${repeating_id}_attack_type`];
            
            if (type.toLowerCase() === "custom") {
                setAttrs({[`${repeating_id}_attack_target`]:0});
            } else {  
                const type_parsed = (!type.match(/\(/)) ? type.replace(/ /, "_")
                                                              .toLowerCase() :
                                                         type.split("(")[1]
                                                             .replace(/\)/g, "")
                                                             .replace(/ /, "_")
                                                             .toLowerCase();

                const value = values[type_parsed];

                const update = {};

                update[`${repeating_id}_attack_target`] = value;

                setAttrs(update);
            }
        });
    }

    const cascadeNPCAttacks = () => {

        getSectionIDs("attacks", ids => {
            const attrs = [
                "weapon_skill",
                "ballistic_skill",
                "basic",
                "brawling",
                "cavalry",
                "fencing",
                "flail",
                "parry",
                "polearm",
                "two-handed",
                "blackpowder",
                "bow",
                "crossbow",
                "engineering",
                "entangling",
                "explosives",
                "sling",
                "throwing"
            ];
            
            for (const id of ids) {
                attrs.push(`repeating_attacks_${id}_attack_type`);
            }

            getAttrs(attrs, values => {
                const update = [];

                for (const id of ids) {
                    const type = values[`repeating_attacks_${id}_attack_type`].toLowerCase();  
                    const type_parsed = (!type.match(/\(/)) ? type.replace(/ /, "_")
                                                                  .toLowerCase() :
                                                             type.split("(")[1]
                                                                 .replace(/\)/g, "")
                                                                 .replace(/ /, "_")
                                                                 .toLowerCase();
                    const target = `repeating_attacks_${id}_attack_target`; 
                    
                    if (type_parsed === "custom") return;
                    else update[target] = values[type_parsed];
                }

                setAttrs(update);

            });
        })
    }

    const updateNPCButtons = () => {

        const attrs = [
            "npc",
            "dodge",
            "endurance",
            "intuition",
            "perception",
            "cool",
            ...wfrp.characteristics
        ];

        getAttrs(attrs, values => {
            if (values[`NPC`] === "0") return;
            const update = {};

            if (!values[`dodge`]) update[`dodge`] = values[`agility`];
            if (!values[`endurance`]) update[`endurance`] = values[`toughness`];
            if (!values[`intuition`]) update[`intuition`] = values[`initiative`];
            if (!values[`perception`]) update[`perception`] = values[`initiative`];
            if (!values[`cool`]) update[`cool`] = values[`willpower`];

            setAttrs(update);

        });

    }

    // MODULE INTERFACE 

    return { 
        // Globals
        wfrp: wfrp,

        // Sheet Functions
        initSheet: initSheet,
        toggleRollDifficulty:toggleRollDifficulty,
        toggleRollBonus:toggleRollBonus,
        toggleRollCrits:toggleRollCrits,
        toggleInitOption:toggleInitOption,
        toggleWhisper:toggleWhisper,
        parseModField:parseModField,

        // Class and Species Controls
        changeSpecies:changeSpecies,
        checkSpeciesAdvances:checkSpeciesAdvances,

        // Characteristic Functions
        calculateCharacteristic: calculateCharacteristic,
        cascadeAttributeChange: cascadeAttributeChange,
        updateMovementRates: updateMovementRates,

        // Skill Functions
        calculateSkill: calculateSkill,
        calculateSpecialisation: calculateSpecialisation,
        //updateRepeatingSkillBase: updateRepeatingSkillBase,
        recalculateRepeatingSkill: recalculateRepeatingSkill,
        cascadeSkillChanges:cascadeSkillChanges,

        // Career Functions
        updateCareerPath: updateCareerPath,
        updateCurrentCareer: updateCurrentCareer,
        updateCurrentCareerLevel: updateCurrentCareerLevel,
        updateCareerNames: updateCareerNames,
        updateFirstCareer:updateFirstCareer,

        // Experience Functions
        calculateTotalAdvances:calculateTotalAdvances,
        recalculateEarnedXP:recalculateEarnedXP,
        recalculateCurrentXP:recalculateCurrentXP,
        recalculateSpentXP:recalculateSpentXP,
        calculateCharacteristicAdvances:calculateCharacteristicAdvances,
        calculateSkillAdvances:calculateSkillAdvances,
        calculateTalentAdvances:calculateTalentAdvances,
        calculateInitColumns:calculateInitColumns,
        consolidateXP:consolidateXP,

        // Trappings, Weapons & Armor Functions
        calculateArmour:calculateArmour,
        calculateCurrentEncumbrance:calculateCurrentEncumbrance,
        calculateMaxEncumbrance:calculateMaxEncumbrance,
        updateWeaponDamage:updateWeaponDamage,
        updateWeaponTarget:updateWeaponTarget,
        currencyConversion:currencyConversion,

        // Combat Functions
        incrementAdvantage:incrementAdvantage,
        decrementAdvantage:decrementAdvantage,
        calculateMaxWounds:calculateMaxWounds,

        // Spells & Prayers Functions
        calculateSpellValue:calculateSpellValue,

        // NPC Functions
        getAttackValue:getAttackValue,
        cascadeNPCAttacks:cascadeNPCAttacks,
        updateNPCButtons:updateNPCButtons,
    };

})();

// ===================== EVENT HANDLERS ====================== //

// SHEET OPENED

on(`sheet:opened`, eventInfo => wfrpModule.initSheet());

// SHEET FUNCTIONS

on(`change:setting_diff_option`, eventInfo => wfrpModule.toggleRollDifficulty(eventInfo.newValue));
on(`change:setting_bonus_option`, eventInfo => wfrpModule.toggleRollBonus(eventInfo.newValue));
on(`change:setting_crit_option`, eventInfo => wfrpModule.toggleRollCrits(eventInfo.newValue));
on(`change:setting_init_option`, eventInfo => wfrpModule.toggleInitOption(eventInfo.newValue));
on(`change:setting_whisper`, eventInfo => wfrpModule.toggleWhisper(eventInfo.newValue));

[
    "repeating_talent:talent_mods", 
    "repeating_condition:condition_mods", 
    "repeating_psychology:psychology_mods", 
    "repeating_corruption:corruption_mods",
    "repeating_trappings:trappings_mods",
    "repeating_weapon:weapon_mods",
    "repeating_armour:armour_mods",
].forEach(modifier => {
    on(`change:${modifier}`, eventInfo => wfrpModule.parseModField(eventInfo.newValue, eventInfo.previousValue))
});

// CLASS AND SPECIES CONTROLS

on(`clicked:remove_custom_class`, eventInfo => setAttrs({"class":""}));

on(`clicked:remove_custom_species`, eventInfo => setAttrs({"species":""}));

on(`change:species`, eventInfo => wfrpModule.changeSpecies(eventInfo.newValue));

for (let index = 1; index <= 12; index++) {
    on(`change:species_skill_${index}_advances`, eventInfo => wfrpModule.checkSpeciesAdvances());
} 

// CHARACTERISTIC CALCULATIONS

wfrpModule.wfrp.characteristics.forEach(characteristic => {
    on(`change:${characteristic} change:${characteristic}_initial change:${characteristic}_advances change:${characteristic}_modifier change:${characteristic}_custom_mod change:${characteristic}_bonusmod change:${characteristic}_bonus`, eventInfo => wfrpModule.calculateCharacteristic(characteristic));

    on(`change:${characteristic}`, eventInfo => wfrpModule.cascadeAttributeChange(characteristic));

    on(`change:${characteristic}_noncareer`, eventInfo => wfrpModule.calculateCharacteristicAdvances(characteristic));

    on(`change:repeating_careers:career_${characteristic}_advances`, eventInfo => wfrpModule.calculateCharacteristicAdvances(characteristic))
});

on(`change:movement`, eventInfo => wfrpModule.updateMovementRates(eventInfo.newValue));

// SKILL CALCULATIONS

wfrpModule.wfrp.skills.forEach(skill => {
    on(`change:${skill} change:${skill}_advances change:${skill}_modifier change:${skill}_bonus change:${skill}_characteristic`, eventInfo => {wfrpModule.calculateSkill(skill)});
});

wfrpModule.wfrp.specialisations.forEach(specialisation => {
    on(`change:${specialisation} change:${specialisation}_advances change:${specialisation}_bonus change:${specialisation}_characteristic`, eventInfo => {
        wfrpModule.calculateSpecialisation(specialisation);
        wfrpModule.cascadeNPCAttacks();
    });
});

wfrpModule.wfrp.repeating_skills.forEach(section => {
    //on(`change:repeating_${section}`, eventInfo => wfrpModule.updateRepeatingSkillBase(eventInfo.sourceAttribute, section, eventInfo.newValue));

    on(`change:repeating_${section}`, eventInfo => wfrpModule.recalculateRepeatingSkill(eventInfo.sourceAttribute, section));
});

[...wfrpModule.wfrp.specialisations, ...["magick", "pray"]].forEach(skill => on(`change:${skill}`, eventInfo => wfrpModule.cascadeSkillChanges(skill)));

// CAREERS CHANGES

on(`change:repeating_careers change:_reporder:careers`, eventInfo => {
    if (eventInfo.sourceType === "player" && !eventInfo.sourceAttribute.match(/reporder/g)) wfrpModule.calculateTotalAdvances(eventInfo.sourceAttribute);
    wfrpModule.updateCareerPath();
    wfrpModule.updateFirstCareer();
    wfrpModule.updateCurrentCareer();
});

on(`remove:repeating_careers`, eventInfo => {
    wfrpModule.updateCareerPath();
    wfrpModule.updateFirstCareer();
    wfrpModule.updateCurrentCareer();
});

on(`change:repeating_careers:career_current`, eventInfo => (eventInfo.sourceType === "player") ? wfrpModule.updateCurrentCareer(eventInfo.sourceAttribute) : false);

on(`change:repeating_careers:career_name change:repeating_careers:career_level_current`, eventInfo => wfrpModule.updateCareerNames(eventInfo.sourceAttribute));

[1,2,3,4].forEach(level => {
    on(`change:repeating_careers:career_level${level}_name change:repeating_careers:career_level${level}_status`, eventInfo => wfrpModule.updateCareerNames(eventInfo.sourceAttribute));
    on(`clicked:repeating_careers:newcareerlevel-${level}`, eventInfo => wfrpModule.updateCurrentCareerLevel(eventInfo.sourceAttribute, level));
});

on(`change:repeating_careers:career_level_current`, eventInfo => wfrpModule.updateCurrentCareerLevel(eventInfo.sourceAttribute, eventInfo.newValue));

// EXPERIENCE CHANGES

on(`change:repeating_experience change:repeating_experiencespent change:experience_mod remove:repeating_experiencespent remove:repeating_experience`, eventInfo => wfrpModule.recalculateEarnedXP());

on(`change:current_xp change:spent_xp change:total_xp remove:repeating_experience`, eventInfo => wfrpModule.recalculateCurrentXP());

on(`change:repeating_experience change:repeating_experiencespent change:experience_mod remove:repeating_experiencespent remove:repeating_experience`, eventInfo => wfrpModule.recalculateSpentXP());

wfrpModule.wfrp.characteristics.forEach(characteristic => {
    on(`change:repeating_careers:career_${characteristic}_advances change:repeating_careers:career_${characteristic}_init`, eventInfo => wfrpModule.calculateCharacteristicAdvances(characteristic))
});

[1,2,3,4].forEach(level => {
    [1,2,3,4,5].forEach(talent => {
        on(`change:repeating_careers:career_talent_${level}_${talent}_name 
            change:repeating_careers:career_talent_${level}_${talent}_init 
            change:repeating_careers:career_talent_${level}_${talent}_advances`, 
            eventInfo => wfrpModule.calculateTalentAdvances());
    });

    [1,2,3,4,5,6,7,8,9,10].forEach(skill => {
        on(`change:repeating_careers:career_skill_${level}_${skill}_name 
            change:repeating_careers:career_skill_${level}_${skill}_init 
            change:repeating_careers:career_skill_${level}_${skill}_advances`, 
            eventInfo => wfrpModule.calculateSkillAdvances());
    });
});

for (let index = 1; index <= 12; index++) {
    on(`clicked:remove_skill_${index}`, eventInfo => setAttrs({[`species_skill_${index}_advances`]:"0"}));

    on(`change:species_skill_${index}_advances`, eventInfo => wfrpModule.calculateSkillAdvances());
} 

for (let index = 1; index <= 10; index++) {
    on(`change:species_talent_${index}_advances`, eventInfo => wfrpModule.calculateTalentAdvances())
};

on(`clicked:combinexp`, eventInfo => wfrpModule.consolidateXP());

on(`clicked:advance`, eventInfo => wfrpModule.advanceXP());

on(`clicked:career_incomplete`, eventInfo => wfrpModule.incompleteCareerXP());

on(`clicked:career_complete`, eventInfo => wfrpModule.completeCareerXP());

on(`change:repeating_noncareer-skills delete:repeating_noncareer-skills`, eventInfo => wfrpModule.calculateSkillAdvances());

on(`change:repeating_careers`, eventInfo => wfrpModule.calculateInitColumns(eventInfo.sourceAttribute, eventInfo.newValue));

// TRAPPINGS, WEAPONS & ARMOR FUNCTIONS

on(`change:repeating_armour remove:repeating_armour`, eventInfo => wfrpModule.calculateArmour());

on(`change:repeating_trappings change:repeating_armour:armour_enc change:repeating_weapons:weapon_enc`, eventInfo => wfrpModule.calculateCurrentEncumbrance());

on(`change:repeating_weapons:weapon_damage_flat change:repeating_weapons:weapon_damage_bonus`, eventInfo => wfrpModule.updateWeaponDamage(eventInfo.sourceAttribute));

on(`change:repeating_weapons:weapon_group`, eventInfo => wfrpModule.updateWeaponTarget(eventInfo.sourceAttribute, eventInfo.newValue));

on(`change:strength_bonus change:toughness_bonus change:encumbrance_bonus change:encumbrance_mod`, eventInfo => wfrpModule.calculateMaxEncumbrance());

["gold_to_silver", "silver_to_gold", "silver_to_brass", "brass_to_silver"].forEach(conversion => on(`clicked:${conversion}`, eventInfo => wfrpModule.currencyConversion(conversion)));

// COMBAT FUNCTIONS 

on(`change:strength_bonus change:toughness_bonus change:willpower_bonus change:wound_mod change:size`, eventInfo => wfrpModule.calculateMaxWounds());

on(`change:strength_bonus change:toughness_bonus change:encumbrance_mod`, eventInfo => wfrpModule.calculateMaxEncumbrance());

on(`clicked:increment_advantage`, eventInfo => wfrpModule.incrementAdvantage());

on(`clicked:decrement_advantage`, eventInfo => wfrpModule.decrementAdvantage());

on(`clicked:reset_advantage`, eventInfo => setAttrs({advantage:0}));

// SPELL FUNCTIONS

on(`change:repeating_spells:spell_type change:repeating_spells:spell_lore change:repeating_spells:spell_deity`, eventInfo => wfrpModule.calculateSpellValue(eventInfo.sourceAttribute));

// NPC FUNCTIONS

on(`change:repeating_attacks:attack_name change:repeating_attacks:attack_type`, eventInfo => wfrpModule.getAttackValue(eventInfo.sourceAttribute));

on(`change:weapon_skill change:ballistic_skill`, eventInfo => wfrpModule.cascadeNPCAttacks());

wfrpModule.wfrp.characteristics.forEach(characteristic => {
    on(`change:${characteristic} change:${characteristic}_bonus`, eventInfo => wfrpModule.updateNPCButtons())
});

on(`change:npc sheet:opened`, eventInfo => wfrpModule.updateNPCButtons());

//# sourceURL=sheetworkers.js

