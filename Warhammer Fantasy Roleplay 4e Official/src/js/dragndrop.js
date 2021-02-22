
const wfrpDragAndDrop = ( () => {

    const handleDrop = (values, name) => {

        const {drop_name, drop_content, drop_data} = values;

        const page_name = (name) ? name : drop_name;

        if (drop_name === ""|| typeof drop_data === "") return;
    
        let parsed_data = helperFunctions.parseJSON(drop_data);

        if (parsed_data.Category === "Careers") handleCareer(page_name, parsed_data);
        else if (parsed_data.Category === "Blessings" || parsed_data.Category === "Spells" || parsed_data.Category === "Miracles" ) handleSpell(page_name, parsed_data, drop_content);
        else if (parsed_data.Category === "Items") handleItem(page_name, parsed_data);
        else if (parsed_data.Category === "Monsters") handleMonster(page_name, parsed_data, drop_content);
        else if (parsed_data.Category === "Talents") handleTalent(page_name, parsed_data);
        else if (parsed_data.Category === "Conditions") handleCondition(page_name, parsed_data);
        else if (parsed_data.Category === "Creature Traits") handleCreatureTrait(page_name, parsed_data);
        else console.warn(`${parsed_data.Category} drop is not supported by the sheet`);

        setAttrs({drop_name: "", drop_content: "", drop_data: ""});
    
    }

    const handleCareer = (name, data) => {
        const updateAttrs = {};
        const repeating_id = generateRowID();
        const row = `repeating_careers_${repeating_id}`;

        updateAttrs[`class`] = data.Class;
        updateAttrs[`${row}_career_name`] = name;

        Object.entries(data.blobs).forEach(([key, values], index) => {

            const level = values.Level

            updateAttrs[`${row}_career_level${level}_name`] = key;
            updateAttrs[`${row}_career_level${level}_status`] = `${values.Tier} ${values.Standing}`;
            updateAttrs[`${row}_career_${level}_trappings`] = values.Trappings;

            const talents = values.Talents.split(",").map(item => item.trim());

            talents.forEach((talent, index) => {

                updateAttrs[`${row}_career_talent_${level}_${index+1}_name`] = talent;

            });

            const skills = values.Skills.split(",").map(item => item.trim());

            skills.forEach((skill, index) => {

                updateAttrs[`${row}_career_skill_${level}_${index+1}_name`] = skill;

            });

            const characteristics = helperFunctions.parseJSON(values["Characteristic Advances"]);

            Object.entries(characteristics).forEach(([key,value]) => {

                if (value.toLowerCase() === "true") {
                    const characteristic = key.toLowerCase().replace(/ /g,"_");

                    updateAttrs[`${row}_career_${characteristic}`] = level;
                }

            });

            setAttrs(updateAttrs);
        });

    }

    const handleSpell = (name, data) => {

        const updateAttrs = {};
        const repeating_id = generateRowID();
        const row = `repeating_spells_${repeating_id}`;
        
        updateAttrs[`${row}_spell_name`] = name;
        updateAttrs[`${row}_spell_type`] = (data.Category.toLowerCase() === "spells") ? "Spell" : "Prayer";
        updateAttrs[`${row}_spell_cn`] = data["Casting Number"] || 0;
        updateAttrs[`${row}_spell_range`] = data.Range || 0;
        updateAttrs[`${row}_spell_target`] = data.Target || 0;
        updateAttrs[`${row}_spell_duration`] = data.Duration || 0;
        updateAttrs[`${row}_spell_description`] = data.Description || 0;
        updateAttrs[`${row}_spell_lore`] = data.Lore || "";
        updateAttrs[`${row}_spell_diety`] = data.Deity || "";

        setAttrs(updateAttrs);

    }

    const handleItem = (name, data) => {
        const updateAttrs = {};

        if (data.Subcategory === "Armour") {
            const repeating_id = generateRowID();
            const row = `repeating_armour_${repeating_id}`;

            const armour = helperFunctions.parseJSON(data.Armor);
            const points = armour.Points || 0;
            const locations = [];

            Object.entries(armour).forEach(([key, value]) => {
                if (value === "Yes") locations.push(key);
            });

            updateAttrs[`${row}_armour_name`] = name;
            updateAttrs[`${row}_armour_points`] = points;
            updateAttrs[`${row}_armour_qualities`] = data.Traits || "";
            updateAttrs[`${row}_armour_locations`] = locations.join(", ").replace(/Torso/g,"Body");
            updateAttrs[`${row}_armour_enc`] = data.Encumbrance;
            updateAttrs[`${row}_armour_mods`] = data.Modifiers || "";
            updateAttrs[`${row}_armour_desc`] = data.Notes || "";

        } else if (data.Subcategory === "Weapons") {

            const repeating_id = generateRowID();
            const row = `repeating_weapons_${repeating_id}`;

            updateAttrs[`${row}_weapon_name`] = name;
            updateAttrs[`${row}_weapon_group`] = data.Group;
            updateAttrs[`${row}_weapon_range`] = (data.Range) ? data.Range : data.Reach || "";
            updateAttrs[`${row}_weapon_damage_flat`] = data.Damage.replace(/[^0-9]/g,"");
            updateAttrs[`${row}_weapon_damage_bonus`] = (data.Damage.match(/SB/)) ? "on" : "0";
            updateAttrs[`${row}_weapon_qualities`] = data.Traits || "";
            updateAttrs[`${row}_weapon_enc`] = data.Encumbrance || "0";
            updateAttrs[`${row}_weapon_notes`] = data.Notes || "";   
            updateAttrs[`${row}_weapon_mods`] = data.Modifiers || "";

        } else {
            const repeating_id = generateRowID();
            const row = `repeating_trappings_${repeating_id}`;

            const modifiers = [];

            if (data.Modifiers) modifiers.push(data.Modifiers);
            if (data.Carries) modifiers.push(`Encumbrance +${data.Carries}`);

            updateAttrs[`${row}_trappings_name`] = name;
            updateAttrs[`${row}_trappings_amount`] = data["Number"] || 1;
            updateAttrs[`${row}_trappings_enc`] = data.Encumbrance || 1;
            updateAttrs[`${row}_trappings_inenc`] = "on";
            updateAttrs[`${row}_trappings_mods`] = modifiers.join(", ") || "";
            updateAttrs[`${row}_trappings_traits`] = data.Traits || "";
            updateAttrs[`${row}_trappings_description`] = data.Notes || "";
            updateAttrs[`${row}_trappings_type`] = (data.Subcategory === "Ammunition") ? 1 : 
                                                   (data.Subcategory === "Packs and Containers") ? 2 : 
                                                   (data.Subcategory === "Clothing and Accessories") ? 3 : 
                                                   (data.Subcategory === "Tools and Kits") ? 4 : 
                                                   (data.Subcategory === "Books and Documents") ? 5 : 
                                                   (data.Subcategory === "Trade Tools and Workshops") ? 6 : 
                                                   (data.Subcategory === "Animals and Vehicles") ? 7 : 
                                                   (data.Subcategory === "Drugs and Poisons") ? 8 : 
                                                   (data.Subcategory === "Herbs and Draughts") ? 9 : 
                                                   (data.Subcategory === "Prosthetics") ? 10 : 
                                                   11;
        } 

        setAttrs(updateAttrs);

    }

    const handleMonster = (name, data, content) => {
        let updateAttrs = {};
        const characteristics = helperFunctions.parseJSON(data.Characteristics);
        const traits = data["Traits"].split(/, (?![^\(]*\))/).map(item => item.trim());
        const optional = (data["Optional Traits"]) ? data["Optional Traits"].split(/, (?![^\(]*\))/).map(item => item.trim()) : [];

        updateAttrs[`character_name`] = name;
        updateAttrs[`npc_description`] = data.Description || "";
        updateAttrs[`npc`] = "on";

        if (!data.Trappings) updateAttrs[`npc_trappings_flag`] = 0;
        if (!data.Skills) updateAttrs[`npc_skills_flag`] = 0;

        for (const characteristic in characteristics) {
            updateAttrs[characteristic.replace(/ /g,"_")] = characteristics[characteristic];
            updateAttrs[`${characteristic.replace(/ /g,"_")}_bonus`] = Math.floor(characteristics[characteristic]/10);
        } 

        console.log(updateAttrs);

        const trait_map = new Map();

        for (const trait of traits) {
            trait_map.set(
                parseTrait(trait.trim()),
                trait.trim()
            );
        }

        const trait_map_opt = new Map();

        for (const trait of optional) {
            trait_map_opt.set(
                parseTrait(trait.trim()),
                trait.trim()
            );
        }

        const request = [...trait_map.keys(), ...trait_map_opt.keys()].map(item => `Creature Traits:${item}`);

        getCompendiumPage(request, compendium_pages => {
            
            for (const page in compendium_pages) {
                const repeating_id = generateRowID();

                const trait = compendium_pages[page];

                if (trait_map.get(trait.name)) {
                    const trait_name = trait_map.get(trait.name);

                    if (trait_name.match(/(weapon|ranged|tentacle|bite|horn|tail|tongue)/gi)) {

                        const attack = parseAttack(trait_map.get(trait.name), trait.data.Description);
    
                        updateAttrs = {...updateAttrs, ...attack};

                    } else {

                        const row = `repeating_traits_${repeating_id}`;
    
                        updateAttrs[`${row}_trait_name`] = trait_map.get(trait.name);
                        updateAttrs[`${row}_trait_enabled`] = "on";
                        updateAttrs[`${row}_trait_settings`] = 0;
                        updateAttrs[`${row}_trait_description`] = trait.data.Description;

                    }

                } else if (trait_map_opt.get(trait.name)) {
                    const trait_name = trait_map_opt.get(trait.name);

                    if (trait_name.match(/(weapon|ranged|tentacle|bite|horn|tail|tongue)/gi)) {
                        const attack = parseAttack(trait_map_opt.get(trait.name), trait.data.Description, "(Optional)");
    

                        updateAttrs = {...updateAttrs, ...attack};

                    } else {
                        const row = `repeating_optional-traits_${repeating_id}`;
    
                        updateAttrs[`${row}_trait_name`] = trait_map_opt.get(trait.name);
                        updateAttrs[`${row}_trait_settings`] = 0;
                        updateAttrs[`${row}_trait_description`] = trait.data.Description;
                    }

                }
            }

            getSectionIDs("repeating_traits", idarray => {

                for (const id of idarray) removeRepeatingRow(`repeating_traits_${id}`);

                getSectionIDs("repeating_optional-traits", idarray => {
    
                    for (const id of idarray)  removeRepeatingRow(`repeating_optional-traits_${id}`); 

                    getSectionIDs("repeating_attacks", idarray => {
    
                        for (const id of idarray)  removeRepeatingRow(`repeating_attacks_${id}`);
                        
                        for (const key in updateAttrs) { 
                            if (updateAttrs[key] === null || updateAttrs[key] === undefined) delete updateAttrs[key];
                        }
                        
                        setAttrs(updateAttrs, callback => setTokenValues())
                        
                    });
                    
                });

            });

        });
    }

    const parseTrait = (trait) => {
        trait = (trait.match(/Tentacles/gi)) ? "# Tentacles (Rating)" :
                (trait.match(/Afraid/gi)) ? "Afraid (Target)" :
                (trait.match(/Animosity/gi)) ? "Animosity (Target)" :
                (trait.match(/Armour/gi)) ? "Armour (Rating)" :
                (trait.match(/Bite/gi)) ? "Bite (Rating)" :
                (trait.match(/Blessed/gi)) ? "Blessed (Various)" :
                (trait.match(/Breath (.*?) (Cold)/gi)) ? "Breath Rating (Cold)" :
                (trait.match(/Breath (.*?) (Corrosion)/gi)) ? "Breath Rating (Corrosion)" :
                (trait.match(/Breath (.*?) (Fire)/gi)) ? "Breath Rating (Fire)" :
                (trait.match(/Breath (.*?) (Electricity)/gi)) ? "Breath Rating (Electricity)" :
                (trait.match(/Breath (.*?) (Poison)/gi)) ? "Breath Rating (Poison)" :
                (trait.match(/Breath (.*?) (Smoke)/gi)) ? "Breath Rating (Smoke)" :
                (trait.match(/Breath/gi)) ? "Breath Rating (Type)" :
                (trait.match(/Corruption/gi)) ? "Corruption (Strength)" :
                (trait.match(/Daemonic/gi)) ? "Daemonic (Target)" :
                (trait.match(/Disease/gi)) ? "Disease (Type)" :
                (trait.match(/Fear/gi)) ? "Fear (Rating)" :
                (trait.match(/Flight/gi)) ? "Flight (Rating)" :
                (trait.match(/Hatred/gi)) ? "Hatred (Target)" :
                (trait.match(/Horns/gi)) ? "Horns Rating (Feature)" :
                (trait.match(/Immunity/gi)) ? "Immunity (Type)" :
                (trait.match(/Magic Resistance/gi)) ? "Magic Resistance (Rating)" :
                (trait.match(/Miracles/gi)) ? "Miracles (Various)" :
                (trait.match(/Night Vision/gi)) ? "Night Vision" :
                (trait.match(/Prejudice/gi)) ? "Prejudice (Target)" :
                (trait.match(/Ranged/gi)) ? "Ranged Rating (Range)" :
                (trait.match(/Spellcaster/gi)) ? "Spellcaster (Various)" :
                (trait.match(/Tail/gi)) ? "Tail Attack (Rating)" :
                (trait.match(/Terror/gi)) ? "Terror (Rating)" :
                (trait.match(/Tongue Attack/gi)) ? "Tongue Attack (Rating) (Range)" :
                (trait.match(/Trained/gi)) ? "Trained (Trained Skills)" :
                (trait.match(/Venom/gi)) ? "Venom (Rating)" :
                (trait.match(/Terror/gi)) ? "Terror (Rating)" :
                (trait.match(/Ward/gi)) ? "Ward (Rating)" :
                (trait.match(/Weapon/gi)) ? "Weapon (Rating)" :
                (trait.match(/Web/gi)) ? "Web (Rating)" :
                (trait.match(/Tiny/gi)) ? "Tiny" :
                (trait.match(/Little/gi)) ? "Little" :
                (trait.match(/Small/gi)) ? "Small" :
                (trait.match(/Average/gi)) ? "Average" :
                (trait.match(/Large/gi)) ? "Large" :
                (trait.match(/Enormous/gi)) ? "Enormous" :
                (trait.match(/Monstrous/gi)) ? "Monstrous" :
                `${trait}`;

        return trait;
    }

    const parseAttack = (trait, description, append = "") => {
        const attacks = ["weapon","ranged","tentacle","bite","horn","tail","tongue"];
        const updateAttrs = {};

        const repeating_id = generateRowID();
        const row = `repeating_attacks_${repeating_id}`;

        for (const attack of attacks) {
            const expression = new RegExp(attack,"gi");

            let name = trait;
            let damage = "";
            let type = "Weapon Skill";
            let range = "Touch";
            let attacks = "1";

            if (trait.match(expression)) {
                
                if (trait.match(/range/gi) && trait.match(/\(/)) {
                    [trait, range] = trait.split("(");
                    range = range.substr(0,range.length-1);
                    type = "Ballistic Skill";
                }
                
                if (trait.match(/[0-9]+X/)) {
                    attacks = trait.match(/([0-9]+)X/)[1];
                }
                
                if (trait.match(/\+/)) {
                    [name, damage] = trait.split("+");
                }     

                updateAttrs[`${row}_attack_settings`] = "0";          
                updateAttrs[`${row}_attack_name`] = `${name} ${append}`;          
                updateAttrs[`${row}_attack_damage`] = damage;
                updateAttrs[`${row}_attack_type`] = type;
                updateAttrs[`${row}_attack_range`] = range; 
                updateAttrs[`${row}_attack_attacks`] = attacks; 
                updateAttrs[`${row}_attack_description`] = description; 
            } 
        }

        return updateAttrs;
    }

    const handleTalent = (name, data) => {
        const updateAttrs = {};
        const repeating_id = generateRowID();
        const row = `repeating_talent_${repeating_id}`;

        updateAttrs[`${row}_talent_name`] = name;
        updateAttrs[`${row}_talent_ranks`] = 1;
        updateAttrs[`${row}_talent_description`] = data.Description || "";
        updateAttrs[`${row}_talent_modifiers`] = data.Modifiers || "";
        
        const attrs = [];

        wfrpModule.wfrp.characteristics.forEach(characteristic => {
            attrs.push(characteristic);
            attrs.push(`${characteristic}_bonus`);
        });

        getAttrs(attrs, values => {
            const key_array = Object.keys(values);
            let total = 0;

            key_array.forEach(key => {
                const parsed = helperFunctions.capitalizeString(key.replace(/_/g, " "));
                if (data.Max.trim() === parsed) total += parseInt(values[key]);

            });

            const max = (!isNaN(parseInt(data.Max))) ? data.Max :
                        (data.Max === "None") ? "-" :
                        total;
            
            updateAttrs[`${row}_talent_ranks_max`] = max;

            setAttrs(updateAttrs);
        });

    }

    const handleCondition = (name, data) => {
        const updateAttrs = {};
        const attrs = [];

        getSectionIDs("conditions", id_array => {
            id_array.forEach(id => {
                attrs.push(`repeating_conditions_${id}_condition_name`);                
            });

            getAttrs(attrs, values => {
                const values_array = Object.entries(values);
                const values_test = Object.values(values);
                
                if (values_test.indexOf(name) > -1) {

                    if (data.Stackable === "TRUE") {

                        const key = values_array[values_test.indexOf(name)][0];
                        const rank_attr = key.substring(0, key.length-4) + "ranks";
    
                        getAttrs([rank_attr], values => {
                            const rank = parseInt(values[rank_attr]) + 1 || 1;
    
                            setAttrs({[rank_attr]:rank});
                        });
                    }

                } else {
                    
                    const repeating_id = generateRowID();
                    const row = `repeating_conditions_${repeating_id}`;
                    updateAttrs[`${row}_condition_name`] = name;
                    updateAttrs[`${row}_condition_ranks`] = 1;
                    updateAttrs[`${row}_condition_gpenalty`] = data["Global Test Modifier"] || "";
                    updateAttrs[`${row}_condition_description`] = data.Description || "";

                    setAttrs(updateAttrs);
                }
            });
        });

    }

    const handleCreatureTrait = (name, data) => {
        let updateAttrs = {};
        const attrs = [];

        const request = `Creature Traits:${parseTrait(name)}`;

        getCompendiumPage(request, compendium_pages => {

            const trait = compendium_pages;
    
            if (trait.name.match(/(weapon|ranged|tentacle|bite|horn|tail|tongue|claw)/gi)) {
    
                const attack = parseAttack(name, trait.data.Description);
    
                updateAttrs = {...updateAttrs, ...attack};
    
            } else if (trait) {
                const repeating_id = generateRowID();    
                const row = `repeating_traits_${repeating_id}`;
    
                updateAttrs[`${row}_trait_name`] = name;
                updateAttrs[`${row}_trait_enabled`] = "on";
                updateAttrs[`${row}_trait_settings`] = 0;
                updateAttrs[`${row}_trait_description`] = trait.data.Description;    
            }
            
            setAttrs(updateAttrs);

        });
    }

    const setTokenValues = () => {
        
        const token_values = [];

        for (const index of [1,2,3]) {
            token_values.push(`bar${index}_v`);
            token_values.push(`bar${index}_m`);
            token_values.push(`bar${index}_l`);
        }

        getAttrs(token_values, settings => {

            console.log(settings)
            
            const default_attr = {
                width: 70,
                height: 70
            };

            const attrs = [];

            for (const item in settings) {
                attrs.push(settings[item]);
            }

            getAttrs(attrs, values => {

                console.log(values)

                for (const item in settings) {    
                    if (settings[item] !== "") {
                        default_attr[item] = settings[item];
                    }
    
                    if (values[settings[item]]) {
                        default_attr[item] = values[settings[item]];
                    }
                }

                for (const item in default_attr) {
                    if (item.match("_v")) {
                        default_attr[`${item}alue`] = default_attr[item];
                        delete default_attr[item]
                    }
                    if (item.match("_m")) {
                        default_attr[`${item}ax`] = default_attr[item];
                        delete default_attr[item]
                    }
                    if (item.match("_l")) {
                        default_attr[`${item}ink`] = default_attr[item];
                        delete default_attr[item]
                    }
                }
    
                setDefaultToken(default_attr);

            });

        });

    }

    return {
        handleDrop:handleDrop
    }

})();

on("change:drop_name", (eventInfo) => {
    getAttrs(["drop_name", "drop_content", "drop_data"], (values) => {
        wfrpDragAndDrop.handleDrop(values);        
    });
});