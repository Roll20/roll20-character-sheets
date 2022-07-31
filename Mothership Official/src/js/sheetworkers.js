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
            
        setAttrs({sheet_skill_toggles:updateAttr}); 
    });

}

const addItem = (new_value, previous_value, source, source_type) => {
    if (new_value === previous_value || new_value !== "Weapon" || source_type !== "player") return;

    console.log(source_type)

    const repeating_length = "repeating_equipment_".length;
    const repeating_id_length = 20;
    const repeating_id = source.substring(repeating_length, repeating_length + repeating_id_length);
    const repeating_equipment_prefix = `repeating_equipment_${repeating_id}`;
    const new_repeating_id = generateRowID();
    const repeating_attacks_prefix = `repeating_attacks_${new_repeating_id}`;

    const requestAttrs = [`${repeating_equipment_prefix}_equipment_name`,`${repeating_equipment_prefix}_equipment_type`];

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

    update["level"] = 0;
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

        requestAttrs.forEach(attr => {
            if (values[attr] !== "") update[attr] = values[attr];
        })

        if (values["level"] === 0 || values["level"] === "") {

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

            setAttrs(updateAttrs);

        }

    });
}

const rollDice = (number_of_dice) => {
    let total = 0;

    for (let i = 0; i <= number_of_dice; i++) total += Math.ceil(Math.random()*10);

    return total;
}

const calculateRow = (row, new_value) => {

    if (!row) return console.warn("Tried to update a ship row, but there wasn't a row specified");

    const int_value = parseInt(new_value) || 0;

    if (row === "lifesupport") setAttrs({"ship_lifesupport_modules":Math.ceil(int_value/10), life_support_hull:Math.ceil(int_value/10), ship_galleys: Math.ceil(int_value/20)});
    if (row === "command") setAttrs({"ship_command_modules":Math.ceil(int_value/4), command_hull:Math.ceil(int_value/4), ship_livingquarters:int_value});
    if (row === "armor") setAttrs({armor:Math.floor(int_value*10), armor_hull:Math.floor(int_value*3)});
    if (row === "jumpdrives") {
        let hull = 0;
        for (let i = 1; i <= int_value; i++) hull += i;
        setAttrs({jump_drives_hull:hull, ship_computer_modules:int_value});
    }
    if (row === "computer") setAttrs({computer_hull:int_value});
    if (row === "galley") setAttrs({galley_hull:int_value});
    if (row === "weaponmount") setAttrs({ship_weapon_mounts:int_value, weapon_mount_hull:int_value});
    if (row === "medbays") setAttrs({ship_medint_bonus:Math.floor(int_value*5), medical_bay_hull:int_value});
    if (row === "cryochamber") setAttrs({ship_cryochambers:Math.ceil(int_value/4), cryochamber_hull:Math.ceil(int_value/4)});
    if (row === "livingquarters") {setAttrs({living_quarters_hull:int_value})};
    if (row === "barracks") setAttrs({ship_barracks:Math.ceil(int_value/12), barracks_hull:Math.ceil(int_value/12), crew_max:int_value});
    if (row === "cargoholds") setAttrs({ship_cargoholds:Math.ceil(int_value/10), cargo_hold_hull:Math.ceil(int_value/10), cargo_max: int_value});
    if (row === "sciencelabs") setAttrs({ship_resint_bonus:Math.floor(int_value*5), science_lab_hull:int_value});
    if (row === "thrusters") {
        getAttrs(["ship_thruster_hullreq","ship_thrusters"], values => {
            const hullreq = parseInt(values["ship_thruster_hullreq"]) || 0;
            const thrusters = parseInt(values["ship_thrusters"]) || 0;
            setAttrs({thrusters_hull : hullreq + thrusters, ship_engine_thrusterreq: thrusters});
        });
    } 
    if (row === "fuel") { 
        getAttrs(["ship_fuel_min","ship_fuel_extra"], values => {
            const min_fuel = parseInt(values["ship_fuel_min"]) || 0;
            const extra_fuel = parseInt(values["ship_fuel_extra"]) || 0;

            setAttrs({fuel_hull: min_fuel + extra_fuel});
        });
    }
    if (row === "engine") {
        getAttrs(["ship_engine_hullreq","ship_engine_thrusterreq","ship_jumpdrive_modules"], values => {
            const hullreq = parseInt(values["ship_engine_hullreq"]) || 0;
            const thrustreq = parseInt(values["ship_engine_thrusterreq"]) || 0;
            const jumpdrive = parseInt(values["ship_jumpdrive_modules"]) || 0;

            setAttrs({ship_engine:hullreq + thrustreq + jumpdrive, engine_hull: hullreq + thrustreq + jumpdrive, ship_fuel_min: (hullreq + thrustreq + jumpdrive) * 3})
        }); 
    }
    if (row === "frame") setAttrs({frame_hull:int_value});

}

const recalculateBaseHull = () => {
    const base_hull_array = [
        "jump_drives_hull",
        "life_support_hull",
        "command_hull",
        "armor_hull",
        "jump_drive_hull",
        "computer_hull",
        "galley_hull",
        "weapon_mount_hull",
        "medical_bay_hull",
        "cryochamber_hull",
        "living_quarters_hull",
        "barracks_hull",
        "cargo_hold_hull",
        "science_lab_hull"
    ];
    
    getAttrs(base_hull_array, values => {
        const base_hull_int = Object.values(values).map(value => parseInt(value) || 0);

        const base_hull = base_hull_int.reduce((total, value) => total + value);

        setAttrs({ship_base_hull: base_hull, ship_thruster_hullreq: Math.ceil(base_hull / 10), ship_engine_hullreq: Math.ceil(base_hull / 20), ship_frame: Math.ceil(base_hull / 10)});
    });
}

const recalculateTotalHull = () => {
    const total_hull_array = [
        "ship_base_hull", 
        "thrusters_hull", 
        "engine_hull", 
        "fuel_hull", 
        "frame_hull"
    ];

    getAttrs(total_hull_array, values => {
        const total_hull_int = Object.values(values).map(value => parseInt(value) || 0);
        const total_hull = total_hull_int.reduce((total, value) => total + value);

        setAttrs({ship_total_hull: total_hull});
    });
}

const calculateCombatIntelligence = (new_value) => {
    const value = parseInt(new_value) || 0;

    const combat = (value * 10) + 10;
    const intellect = (value * 10) + 30;

    setAttrs({combat:combat,intellect:intellect});
}

const calculateSpeed = (new_value) => {
    const value = parseInt(new_value) || 0;

    const speed = value * 10;

    setAttrs({speed:speed});
}

const calculateHullCost = (new_value) => {
    const value = parseInt(new_value) || 0;

    const hull = value;
    const cost = value * 10;

    setAttrs({ship_cost:cost, hull: hull, hull_max: hull});
}

const calculateFuel = (new_value) => {
    const value = parseInt(new_value) || 0;

    setAttrs({fuel:value, fuel_max:value});
}

const checkFuelValue = (new_value) => {
    const value = parseInt(new_value) || 0;

    getAttrs(["hull_25","hull_50","hull_75"], values => {
        const hull_25 = values.hull_25;
        const hull_50 = values.hull_50;
        const hull_75 = values.hull_75;

        let hull_toggle = "";

        if (value <= hull_75) hull_toggle = 75; 
        else if (value <= hull_50) hull_toggle = 50; 
        else if (value <= hull_25) hull_toggle = 25;
        
        setAttrs({hull_toggle: hull_toggle});
    });
}

const calculateHullValues = () => {
    getAttrs(["hull_max"], values => {
        const value = parseInt(values["hull_max"]) || 0;
    
        const n25 = Math.floor(value * 0.75);
        const n50 = Math.floor(value * 0.5);
        const n75 = Math.floor(value * 0.25);
        
        setAttrs({
            hull_25: n25,
            hull_50: n50,
            hull_75: n75,
        }, callback => checkFuelValue(value));
    });
}

const dropHandler = (values) => {
    const name = values.drop_name;
    const data = JSON.parse(values.drop_data) || {};
    const category = values.drop_category;

    console.log(data);

    if (name === ""|| typeof data === "" || typeof category === "") return console.warn("No drag and drop data found.");

    switch (category) {
        case "Classes": 
            handleClassDrop(name, data);
            break;
        case "Items":
            handleItemDrop(name, data);
            break;
        case "Mercenaries": 
            handleMercenaryDrop(name, data);
            break;
        case "Ships":
            handleShipDrop(name, data);
            break;
        case "Ship Weapons": 
            handleShipWeaponDrop(name, data);
            break;
        default:
            console.warn("Could not distinguish category from drop.")
            break;
    }

}

const handleItemDrop = (name, data) => {
    const id = generateRowID();        
    const address = `repeating_equipment_${id}_equipment`;

    let updateAttrs = {};

    updateAttrs[`${address}_name`] = name;
    updateAttrs[`${address}_notes`] = data.Description || "";

    if (data.Damage) {
        const attack_id = generateRowID();
        const attack_address = `repeating_attacks_${id}_attack`

        updateAttrs[`${address}_type`] = "Weapon";
        updateAttrs[`${address}_linkedid`] = attack_id;
        
        updateAttrs[`${attack_address}_linkedid`] = id;
        updateAttrs[`${attack_address}_name`] = name;
        updateAttrs[`${attack_address}_damage`] = data.Damage;
        updateAttrs[`${attack_address}_critical_damage`] = data["Critical Damage"] || "";
        updateAttrs[`${attack_address}_critical_effect`] = data["Critical Effect"] || "-";

        let combined_string = (data.Description) ? `${data.Description} ` : ``;
        combined_string += (data.Special) ? `${data.Special} ` : ``;

        updateAttrs[`${attack_address}_notes`] = combined_string;

        const range = JSON.parse(data.Range) || {};

        if (range && range.CQC !== "Yes") {
            updateAttrs[`${attack_address}_type`] = "Ranged";

            updateAttrs[`${attack_address}_shots`] = data.Shots;
            updateAttrs[`${attack_address}_ammunition`] = data.Ammunition;

            updateAttrs[`${attack_address}_range_s`] = range.Short;
            updateAttrs[`${attack_address}_range_m`] = range.Medium || "-";
            updateAttrs[`${attack_address}_range_l`] = range.Long || "-";

        } else {
            updateAttrs[`${attack_address}_type`] = "Melee";      
        }
    } else if (data["Armor Save"]) {
        updateAttrs[`${address}_type`] = "Armor";
        updateAttrs[`${address}_armor_bonus`] = data["Armor Save"];
    } else {
        updateAttrs[`${address}_type`] = "Gear";
    }

    setAttrs(updateAttrs);

}

const handleClassDrop = (name, data) => {
    setAttrs({class:name});
    if (name) toggleClass(name,"","player");
}

const handleMercenaryDrop = () => {
    console.warn("Mercenary drop not yet supported.");
}

const handleMonsterDrop = () => {
    console.warn("Monster drop not yet supported.");
}

const handleShipDrop = (name, data) => {
    const modules_raw = data["Required Modules"].split(",").map(item => item.trim());
    const modules_parsed = {};
    const updateAttrs = {};

    modules_raw.forEach(module => modules_parsed[module.toLowerCase().replace(/[^a-z ]/g,"").trim().replace(/ /g,"_")] = parseInt(module.replace(/[^0-9]/g,"")) || 0);

    console.log(modules_parsed);

    updateAttrs["ship_class"] = name;
    updateAttrs["ship_passengers"] = ((modules_parsed.barracks || 0) * 12) + modules_parsed.living_quarters || 1;
    updateAttrs["life_support"] = modules_parsed.life_support || 1;
    updateAttrs["ship_officers"] = modules_parsed.living_quarters || 0;
    updateAttrs["ship_armor_modules"] = modules_parsed.armor || 0;
    updateAttrs["ship_jumpdrive_modules"] = modules_parsed.jump_drive || 0;
    updateAttrs["ship_computer_modules"] = modules_parsed.computer || 0;
    updateAttrs["ship_galley"] = modules_parsed.galley || "";
    updateAttrs["ship_weapon_mounts"] = modules_parsed.weapon_mount || 0;
    updateAttrs["ship_medbays"] = modules_parsed.medical_bays || 0;
    updateAttrs["ship_cyropods"] = (modules_parsed.cryochamber * 4) || 0;
    updateAttrs["ship_living_quarters"] = modules_parsed.living_quarters || 0;
    updateAttrs["ship_barracks"] = modules_parsed.barracks || 0;
    updateAttrs["ship_cargoholds"] = modules_parsed.cargo_hold || 0;
    updateAttrs["ship_sciencelabs"] = modules_parsed.science_lab || 0;
    updateAttrs["ship_thrusters"] = modules_parsed.thrusters || 0;
    updateAttrs["ship_engine"] = modules_parsed.engine || 0;
    
    console.log(updateAttrs);
    setAttrs(updateAttrs);    
}

const handleShipWeaponDrop = () => {

}

// EVENT HANDLERS

skillArray.forEach(skill => on(`change:${skill}`, eventInfo => toggleSkill(skill, eventInfo.newValue)));

on(`change:repeating_equipment:equipment_type`, eventInfo => addItem(eventInfo.newValue, eventInfo.previousValue, eventInfo.sourceAttribute, eventInfo.sourceType));

on(`change:class`, eventInfo => toggleClass(eventInfo.newValue, eventInfo.previousValue, eventInfo.sourceType));

on(`change:ship_passengers`, eventInfo => calculateRow("lifesupport", eventInfo.newValue));
on(`change:ship_officers`, eventInfo => calculateRow("command", eventInfo.newValue));
on(`change:ship_armor_modules`, eventInfo => calculateRow("armor", eventInfo.newValue));
on(`change:ship_jumpdrive_modules`, eventInfo => calculateRow("jumpdrives", eventInfo.newValue));
on(`change:ship_computer_modules`, eventInfo => calculateRow("computer", eventInfo.newValue));
on(`change:ship_galleys`, eventInfo => calculateRow("galley", eventInfo.newValue));
on(`change:ship_weapons`, eventInfo => calculateRow("weaponmount", eventInfo.newValue));
on(`change:ship_medbays`, eventInfo => calculateRow("medbays", eventInfo.newValue));
on(`change:ship_cryopods`, eventInfo => calculateRow("cryochamber", eventInfo.newValue));
on(`change:ship_livingquarters`, eventInfo => calculateRow("livingquarters", eventInfo.newValue));
on(`change:ship_crew`, eventInfo => calculateRow("barracks", eventInfo.newValue));
on(`change:ship_cargo`, eventInfo => calculateRow("cargoholds", eventInfo.newValue)); 
on(`change:ship_sciencelabs`, eventInfo => calculateRow("sciencelabs", eventInfo.newValue)); 
on(`change:ship_thrusters change:ship_thruster_hullreq`, eventInfo => calculateRow("thrusters", eventInfo.newValue)); 
on(`change:ship_fuel_extra change:ship_fuel_min`, eventInfo => calculateRow("fuel", eventInfo.newValue));
on(`change:ship_engine_hullreq change:ship_engine_thrusterreq change:ship_jumpdrive_modules`, eventInfo => calculateRow("engine", eventInfo.newValue));
on(`change:ship_frame`, eventInfo => calculateRow("frame", eventInfo.newValue));

on(`change:ship_computer_modules`, eventInfo => calculateCombatIntelligence(eventInfo.newValue));
on(`change:ship_thrusters`, eventInfo => calculateSpeed(eventInfo.newValue));
on(`change:ship_total_hull`, eventInfo => calculateHullCost(eventInfo.newValue));
on(`change:fuel_hull`, eventInfo => calculateFuel(eventInfo.newValue));

on(`change:hull`, eventInfo => checkFuelValue(eventInfo.newValue));
on(`change:hull_max`, eventInfo => calculateHullValues());

on(`clicked:startship`, eventInfo => setAttrs({shipbuild:"on"}));
on(`clicked:completeship`, eventInfo => setAttrs({shipbuild:0}));

on(`clicked:editname_on`, eventInfo => setAttrs({npcname_toggle:"on"}));
on(`clicked:editname_off`, eventInfo => setAttrs({npcname_toggle:0}));

on("change:drop_name", (eventInfo) => {
    getAttrs(["drop_name", "drop_content", "drop_data", "drop_category"], (values) => {
        dropHandler(values);
    });
});

["life_support_hull","command_hull","armor_hull","jump_drives_hull","computer_hull","galley_hull",
"weapon_mount_hull","medical_bay_hull","cryochamber_hull","living_quarters_hull","barracks_hull",
"cargo_hold_hull", "science_lab_hull"].forEach(hull => on(`change:${hull}`, eventInfo => recalculateBaseHull()));

["base_hull", "thrusters_hull", "engine_hull", "fuel_hull", "frame_hull"].forEach(hull => on(`change:${hull}`, eventInfo => recalculateTotalHull()));