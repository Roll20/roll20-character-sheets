// Sheet Variables

const skillList = {
    "linguistics":{
        unlocks: ["sophontology"]
    },
    "biology":{
        unlocks: ["genetics","psychology"]
    },
    "first_aid": {
        unlocks: ["pathology"]
    },
    "hydroponics": {
        unlocks: ["botany"]
    },
    "geology": {
        unlocks: ["planetology","asteroid_mining"]
    },
    "zero-g": {
        unlocks: ["asteroid_mining"]
    },
    "scavenging": {
        unlocks: ["asteroid_mining","jury_rigging"]
    },
    "heavy_machinery": {
        unlocks: ["asteroid_mining","engineering"]
    },
    "computers": {
        unlocks: ["engineering","hacking"]
    },
    "mechanical_repair": {
        unlocks: ["engineering", "jury_rigging", "vehicle_specialization"]
    },
    "driving": {
        unlocks: ["vehicle_specialization"]
    },
    "piloting": {
        unlocks: ["vehicle_specialization","astrogation"]
    },
    "mathematics": {
        unlocks: ["physics"]
    },
    "art": {
        unlocks: ["mysticism"]
    },
    "archaeology": {
        unlocks: ["mysticism"]
    },
    "theology": {
        unlocks: ["mysticism"]
    },
    "military_training": {
        unlocks: ["tactics","gunnery","firearms","explosives","close-quarters_combat"]
    },
    "rimwise": {
        unlocks: ["firearms","close-quarters_combat"]
    },
    "athletics": {
        unlocks: ["close-quarters_combat"]
    },
    "chemistry": {
        unlocks: ["explosives"]
    },
    "psychology": {
        unlocks: ["sophontology"]
    },
    "genetics": {
        unlocks: ["xenobiology"]
    },
    "pathology": {
        unlocks: ["xenobiology","surgery"]
    },
    "botany": {
        unlocks: ["xenobiology"]
    },
    "planetology": {
        unlocks: []
    },
    "asteroid_mining" : {
        unlocks: []
    },
    "jury_rigging": {
        unlocks: ["cybernetics"]
    },
    "engineering": {
        unlocks: ["cybernetics","robotics","artificial_intelligence"]
    },
    "hacking": {
        unlocks: ["artificial_intelligence"]
    },
    "vehicle_specialization": {
        unlocks: ["command"]
    },
    "astrogation": {
        unlocks: ["hyperspace"]
    },
    "physics": {
        unlocks: ["hyperspace"]
    },
    "mysticism": {
        unlocks: ["xenoesotericism", "hyperspace"]
    },
    "tactics": {
        unlocks: ["command"]
    },
    "gunnery": {
        unlocks: ["weapon_specialization"]
    },
    "firearms": {
        unlocks: ["weapon_specialization"]
    },
    "close-quarters_combat": {
        unlocks: ["weapon_specialization"]
    },
    "explosives": {
        unlocks: ["weapon_specialization"]
    },
    "sophontology": {},
    "xenobiology": {},
    "surgery": {},
    "cybernetics": {},
    "robotics": {},
    "artificial_intelligence": {},
    "command": {},
    "hyperspace": {},
    "xenoesotericism": {},
    "weapon_specialization": {}
};

const skillArray = Object.keys(skillList);

// FUNCTIONS

const advantageToggle = (newValue) => {

}

const toggleSkill = (source, newValue) => {

    getAttrs(["sheet_skill_toggles"], values => {

        const existingValue = values["sheet_skill_toggles"].trim();
        const valueList = existingValue.split(" ")
        const unlocks = skillList[source].unlocks || [];

        let updateAttr = "";
    
        if (newValue === "0") {

            unlocks.forEach(item => valueList.splice(valueList.indexOf(item), 1));

            updateAttr = valueList.join(" ");

        } else if (newValue === "on") {
    
            updateAttr = existingValue + " ";
    
            if (unlocks === []) return;
            
            unlocks.forEach(unlock => updateAttr += `${unlock} `);

        }

        console.log(updateAttr);
            
        setAttrs({sheet_skill_toggles:updateAttr}); 
    });

}

const addItem = (new_value, previous_value, source) => {
    console.log(`${new_value} ${previous_value} ${source}`)
    if (new_value === previous_value || new_value !== "Weapon") return;

    const repeating_length = "repeating_equipment_".length;
    const repeating_id_length = 20;
    const repeating_id = source.substring(repeating_length, repeating_length + repeating_id_length);
    const repeating_equipment_prefix = `repeating_equipment_${repeating_id}`;
    const new_repeating_id = generateRowID();
    const repeating_attacks_prefix = `repeating_attacks_${new_repeating_id}`;

    const requestAttrs = [`${repeating_equipment_prefix}_equipment_name`,`${repeating_equipment_prefix}_equipment_type`];

    console.log(requestAttrs);

    getAttrs(requestAttrs, values => {
        const updateAttrs = {};

        updateAttrs[`${repeating_attacks_prefix}_attack_name`] = values[`${repeating_equipment_prefix}_equipment_name`];
        updateAttrs[`${repeating_attacks_prefix}_attack_linkedid`] = repeating_id;

        setAttrs(updateAttrs);

    });
}

const toggleClass = (new_class, previous_class, source_type) => {
    const requestAttrs = [
        "init",
        "level",
        "sanity",
        "fear",
        "body",
        "armor",
        "strength",
        "speed",
        "intellect",
        "combat",
        "stress_panic",
    ];

    if (source_type !== "player") return;

    const update = {};

    update["level"] = 1;
    update["xp"] = 0;
    update["stress"] = 2;
    update["resolve"] = 0;
    update["init"] = 1;

    switch (new_class.toLowerCase()) {
        case "teamster":
            update["sanity"] = 30;
            update["fear"] = 35;
            update["body"] = 30;
            update["armor"] = 35;
            update["strength"] = rollDice(6) + 5;
            update["speed"] = rollDice(6) + 5;
            update["intellect"] = rollDice(6);
            update["combat"] = rollDice(6);
            update["skill_points"] = 4;
            update["stress_panic"] = getTranslationByKey(["Once per session, a Teamster may re-roll a roll on the Panic Effect Table."]);
            break;
        case "android":
            update["sanity"] = 20;
            update["fear"] = 85;
            update["body"] = 40;
            update["armor"] = 25;
            update["strength"] = rollDice(6);
            update["speed"] = rollDice(6) + 5;
            update["intellect"] = rollDice(6) + 5;
            update["combat"] =  rollDice(6);
            update["skill_points"] = 2;
            update["stress_panic"] = getTranslationByKey(["Fear Saves made in the presence of Androids have Disadvantage."]);
            break;
        case "scientist":
            update["sanity"] = 40;
            update["fear"] = 25;
            update["body"] = 25;
            update["armor"] = 30;
            update["strength"] = rollDice(6);
            update["speed"] = rollDice(6);
            update["intellect"] = rollDice(6) + 10;
            update["combat"] = rollDice(6);
            update["skill_points"] = 3;
            update["stress_panic"] = getTranslationByKey(["Whenever a Scientist fails a Sanity Save, every friendly player nearby gains 1 Stress."]);
            break;
        case "marine":
            update["sanity"] = 25;
            update["fear"] = 30;
            update["body"] = 35;
            update["armor"] = 40;
            update["strength"] = rollDice(6);
            update["speed"] = rollDice(6);
            update["intellect"] = rollDice(6);
            update["combat"] = rollDice(6) + 5;
            update["skill_points"] = 3;
            update["stress_panic"] = getTranslationByKey(["Whenever a Marine Panics, every friendly player nearby must make a Fear Save."]);
            break;
        default: 
            return;
    }

    getAttrs(requestAttrs, values => {

        if (previous_class === new_class && values["init"] === "1") return;

        console.log(values["level"]);

        if (values["level"] === 1 || values["level"] === "") {

            const fields = [
                "level",
                "sanity",
                "fear",
                "body",
                "armor",
                "stress_panic",
                "stress",
                "resolve",
                "strength",
                "speed",
                "intellect",
                "combat",
                "skill_points",
                "xp",
                "init"
            ];

            const updateAttrs = {};

            fields.forEach(field => {
                const fallback = values[field] || 0;
                updateAttrs[field] = (typeof field !== undefined) ? update[field] : fallback;
            });

            const hitpoints = parseInt(update["strength"]) * 2;

            updateAttrs["health"] = hitpoints;
            updateAttrs["health_max"] = hitpoints;

            console.log(updateAttrs);

            setAttrs(updateAttrs);

        }

    });
}

const rollDice = (number_of_dice) => {
    let total = 0;

    for (let i = 0; i <= number_of_dice; i++) total += Math.ceil(Math.random()*10);

    return total;
}

// EVENT HANDLERS

skillArray.forEach(skill => on(`change:${skill}`, eventInfo => toggleSkill(skill, eventInfo.newValue)));

on(`change:repeating_equipment:equipment_type`, eventInfo => addItem(eventInfo.newValue, eventInfo.previousValue, eventInfo.sourceAttribute));

on(`change:class`, eventInfo => toggleClass(eventInfo.newValue, eventInfo.previousValue, eventInfo.sourceType));