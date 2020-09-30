// run any data migrations
on("sheet:opened", () => {
    sheetMigration();

    getAttrs(["btatow_sheet_version"], ({
        btatow_sheet_version
    }) => {
        if (btatow_sheet_version >= 3) {
            recalculateSkills();
        }
    });
});

const recalculateSkills = () => {
    getSectionIDs("skills", ids => {
        ids.forEach(id => getAttrs(["repeating_skills_" + id + "_skill_xp"], values => {
            skillXPChanged({
                newValue: values["repeating_skills_" + id + "_skill_xp"],
                id
            })
        }));
    });
}

const STRENGTH_XP = "strength_xp";
const BODY_XP = "body_xp";
const REFLEX_XP = "reflex_xp";
const DEXTERITY_XP = "dexterity_xp";
const INTELLIGENCE_XP = "intelligence_xp";
const WILL_XP = "will_xp";
const CHARISMA_XP = "charisma_xp";
const EDGE_XP = "edge_xp";

const STRENGTH_LINK = "strength_link";
const BODY_LINK = "body_link";
const REFLEX_LINK = "reflex_link";
const DEXTERITY_LINK = "dexterity_link";
const INTELLIGENCE_LINK = "intelligence_link";
const WILL_LINK = "will_link";
const CHARISMA_LINK = "charisma_link";
const EDGE_LINK = "edge_link";

// calculate stat values when XP amount changes
on("change:strength_xp change:body_xp change:reflex_xp change:dexterity_xp change:intelligence_xp change:will_xp change:charisma_xp change:edge_xp", ({
    sourceAttribute,
    newValue
}) => {
    attributeValue = Math.floor(newValue / 100);
    attributeLinkedValue = calculateLinkedAttributeValue(attributeValue);

    let attributesToSet = {};

    switch (sourceAttribute) {
    case STRENGTH_XP:
        attributesToSet = {
            strength: attributeValue,
            strength_link: attributeLinkedValue
        };
        break;
    case BODY_XP:
        attributesToSet = {
            body: attributeValue,
            body_link: attributeLinkedValue
        };
        break;
    case REFLEX_XP:
        attributesToSet = {
            reflex: attributeValue,
            reflex_link: attributeLinkedValue
        };
        break;
    case DEXTERITY_XP:
        attributesToSet = {
            dexterity: attributeValue,
            dexterity_link: attributeLinkedValue
        };
        break;
    case INTELLIGENCE_XP:
        attributesToSet = {
            intelligence: attributeValue,
            intelligence_link: attributeLinkedValue
        };
        break;
    case WILL_XP:
        attributesToSet = {
            will: attributeValue,
            will_link: attributeLinkedValue
        };
        break;
    case CHARISMA_XP:
        attributesToSet = {
            charisma: attributeValue,
            charisma_link: attributeLinkedValue
        };
        break;
    case EDGE_XP:
        attributesToSet = {
            edge: attributeValue,
            edge_link: attributeLinkedValue
        };
        break;
    default:
        console.error("unknown attribute type passed in to basic attribute on change function");
        return;
    }

    setAttrs(attributesToSet, {}, recalculateSkills)
});

function calculateLinkedAttributeValue(attribute) {
    if (attribute > 10) {
        return Math.floor(attribute / 3);
    } else {
        if (attribute < 1)
            return -4;
        else if (attribute < 2)
            return -2;
        else if (attribute < 4)
            return -1;
        else if (attribute < 7)
            return 0;
        else if (attribute < 10)
            return 1;
        else
            return 2;
    }
}

on("change:repeating_skills:skill change:repeating_skills:sub_skill", _ => {
    getAttrs(["repeating_skills_skill_xp"], ({
        repeating_skills_skill_xp
    }) => {
        skillXPChanged({
            newValue: repeating_skills_skill_xp
        });
    });
});

// calculate skill modifiers when skill xp changes
on("change:repeating_skills:skill_xp", skillXPChanged)

// recalculate all skills when learning speed modifier changes
on("change:learning_speed", recalculateSkills)

function skillXPChanged({
    id,
    newValue
}) {
    const tieredSkills = [
        "art",
        "computers",
        "interest",
        "martial",
        "melee",
        "prestidigitation"
    ];

    // When the sheet is opened, or data migrations are run, the skills are retrieved via ID, and thus must have their
    // ID included in the attribute name when setting attributes.
    const skillId = id !== undefined ? id + "_" : ""

    const skill = "repeating_skills_" + skillId + "skill";
    const skillLevel = "repeating_skills_" + skillId + "skill_level";
    const subSkillAttrName = "repeating_skills_" + skillId + "sub_skill";

    getAttrs([skill, subSkillAttrName, "learning_speed"], values => {
        const skillName = values[skill]
        const skillNameLookupKey = skillName.split("_")[0]
        const subSkill = values[subSkillAttrName]

        let skillAttributesToSet = {};

        skillAttributesToSet[skillLevel] = calculateSkillLevel(Number(newValue), values.learning_speed);

        const skillData = getSkill(
            skillNameLookupKey,
            skillAttributesToSet[skillLevel],
            tieredSkills.includes(skillNameLookupKey)
        );

        skillAttributesToSet["repeating_skills_" + skillId + "skill_tnc"] = skillData.targetNumber + "/" + skillData.complexity;
        skillAttributesToSet["repeating_skills_" + skillId + "target_number"] = skillData.targetNumber;

        getAttrs(skillData.linkedAttributes, values => {
            skillAttributesToSet["repeating_skills_" + skillId + "skill_modifier"] = Object.values(values)
                .reduce((total, num) => Number(total) + Number(num)) + Number(skillAttributesToSet[skillLevel]);

            skillAttributesToSet["repeating_skills_" + skillId + "skill_linked_attributes"] = skillData.linkedAttributes
                .map(linkAtr => getLinkedAttributeDisplayName(linkAtr) + " (" + values[linkAtr] + ")")
                .join(" + ");

            skillAttributesToSet["repeating_skills_" + skillId + "skill_roll_value"] =
                getSkillDisplayName(skillData, skillName, subSkill) + " Skill Check:\n" +
                "Margin of Success: [[2d6 + @{skill_modifier}[MOD] - @{target_number}[TN]]]";

            setAttrs(skillAttributesToSet, {}, () => {});
        });
    });
}

function calculateSkillLevel(skillXP, learningSpeedModifier) {
    skillXP = Number(skillXP);
    learningSpeedModifier = Number(learningSpeedModifier);

    if (skillXP < (30 + (learningSpeedModifier * 3))) {
        return 0;
    }

    if (skillXP >= (570 + (learningSpeedModifier * 57))) {
        return 10;
    }

    let currentSkillXP = skillXP - (20 + (learningSpeedModifier * 2));

    for (i = 1; i < 11; i++) {
        if (currentSkillXP < i * (10 + learningSpeedModifier)) {
            return i - 1;
        }

        currentSkillXP -= (i * (10 + learningSpeedModifier));
    }

    console.error("should never hit this line, this means the skill XP is not less than level 1, not greater than level 10, but also not within a level range.");
    return undefined;
}

function getSkillDisplayName(skill, skillDisplayNameKey, subSkill) {
    if (skill.subSkills === true) {
        return skill.displayName[skillDisplayNameKey] + "/" + subSkill;
    }

    if (typeof subSkill === "string" && subSkill != "") {
        return skill.displayName[skillDisplayNameKey] + " (" + subSkill + ")";
    }

    return skill.displayName[skillDisplayNameKey];
}

const skillsList = {
    "acrobatics": {
        "linkedAttributes": [REFLEX_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "acrobatics_free_fall": "Acrobatics/Free-Fall",
            "acrobatics_gymnastics": "Acrobatics/Gymnastics"
        }
    },
    "acting": {
        "linkedAttributes": [CHARISMA_LINK],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "acting": "Acting"
        }
    },
    "administration": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "administration": "Administration"
        }
    },
    "animal": {
        "linkedAttributes": [WILL_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "animal_handling_herding": "Animal Handling/Herding",
            "animal_handling_riding": "Animal Handling/Riding",
            "animal_handling_training": "Animal Handling/Training"
        }
    },
    "appraisal": {
        "linkedAttributes": [INTELLIGENCE_LINK],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "appraisal": "Appraisal"
        }
    },
    "archery": {
        "linkedAttributes": [DEXTERITY_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "archery": "Archery"
        }
    },
    "artillery": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "artillery": "Artillery"
        }
    },
    "career": {
        "linkedAttributes": [INTELLIGENCE_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": true,
        "displayName": {
            "career": "Career"
        }
    },
    "climbing": {
        "linkedAttributes": [DEXTERITY_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "climbing": "Climbing"
        }
    },
    "communications": {
        "linkedAttributes": [INTELLIGENCE_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "communications_black_box": "Communications/Black Box",
            "communications_conventional_em": "Communications/Conventional (EM)",
            "communications_hyperpulse_generator": "Communications/Hyperpulse Generator"
        }
    },
    "cryptography": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "cryptography": "Cryptography"
        }
    },
    "demolitions": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "demolitions": "Demolitions"
        }
    },
    "disguise": {
        "linkedAttributes": [CHARISMA_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "disguise": "Disguise"
        }
    },
    "driving": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "driving_ground_vehicles": "Driving/Ground Vehicles",
            "driving_rail_vehicles": "Driving/Rail Vehicles",
            "driving_sea_vehicles": "Driving/Sea Vehicles"
        }
    },
    "escape": {
        "linkedAttributes": [STRENGTH_LINK, DEXTERITY_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "escape_artist": "Escape Artist"
        }
    },
    "forgery": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "forgery": "Forgery"
        }
    },
    "gunnery": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "gunnery_aerospace": "Gunnery/Aerospace",
            "gunnery_air_vehicle": "Gunnery/Air Vehicle",
            "gunnery_battlesuit": "Gunnery/Battlesuit",
            "gunnery_ground_vehicle": "Gunnery/Ground Vehicle",
            "gunnery_mech": "Gunnery/'Mech",
            "gunnery_protomech": "Gunnery/ProtoMech",
            "gunnery_sea_vehicle": "Gunnery/Sea Vehicle",
            "gunnery_spacecraft": "Gunnery/Spacecraft",
            "gunnery_turret": "Gunnery/Turret"
        }
    },
    "interrogation": {
        "linkedAttributes": [WILL_LINK, CHARISMA_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "interrogation": "Interrogation"
        }
    },
    "investigation": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "investigation": "Investigation"
        }
    },
    "language": {
        "linkedAttributes": [INTELLIGENCE_LINK, CHARISMA_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": true,
        "displayName": {
            "language": "Language"
        }
    },
    "leadership": {
        "linkedAttributes": [WILL_LINK, CHARISMA_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "leadership": "Leadership"
        }
    },
    "medtech": {
        "linkedAttributes": [INTELLIGENCE_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "medtech_general": "MedTech/General",
            "medtech_veterinary": "MedTech/Veterinary"
        }
    },
    "navigation": {
        "linkedAttributes": [INTELLIGENCE_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "navigation_air": "Navigation/Air",
            "navigation_ground": "Navigation/Ground",
            "navigation_kf_jump": "Navigation/K-F Jump",
            "navigation_sea": "Navigation/Sea",
            "navigation_space": "Navigation/Space"
        }
    },
    "negotiation": {
        "linkedAttributes": [CHARISMA_LINK],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "negotiation": "Negotiation"
        }
    },
    "perception": {
        "linkedAttributes": [INTELLIGENCE_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "perception": "Perception"
        }
    },
    "piloting": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "piloting_aerospace": "Piloting/Aerospace",
            "piloting_air_vehicle": "Piloting/Air Vehicle",
            "piloting_battlesuit": "Piloting/Battlesuit",
            "piloting_ground_vehicle": "Piloting/Ground Vehicle",
            "piloting_mech": "Piloting/'Mech",
            "piloting_protomech": "Piloting/ProtoMech",
            "piloting_rail_vehicle": "Piloting/Rail Vehicle",
            "piloting_sea_vehicle": "Piloting/Sea Vehicle",
            "piloting_spacecraft": "Piloting/Spacecraft"
        }
    },
    "protocol": {
        "linkedAttributes": [WILL_LINK, CHARISMA_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "protocol": "Protocol"
        }
    },
    "running": {
        "linkedAttributes": [REFLEX_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "running": "Running"
        }
    },
    "science": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "science": "Science"
        }
    },
    "security": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "security_systems_electronic": "Security Systems/Electronic",
            "security_systems_mechanical": "Security Systems/Mechanical"
        }
    },
    "sensor": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "sensor_operations": "Sensor Operations"
        }
    },
    "small": {
        "linkedAttributes": [DEXTERITY_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "small_arms": "Small Arms"
        }
    },
    "stealth": {
        "linkedAttributes": [REFLEX_LINK, INTELLIGENCE_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "stealth": "Stealth"
        }
    },
    "strategy": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "strategy": "Strategy"
        }
    },
    "streetwise": {
        "linkedAttributes": [CHARISMA_LINK],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": true,
        "displayName": {
            "streetwise": "Streetwise"
        }
    },
    "support": {
        "linkedAttributes": [DEXTERITY_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "support_weapons": "Support Weapons"
        }
    },
    "surgery": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "surgery_general": "Surgery/General",
            "surgery_veterinary": "Surgery/Veterinary"
        }
    },
    "survival": {
        "linkedAttributes": [BODY_LINK, INTELLIGENCE_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "survival": "Survival"
        }
    },
    "swimming": {
        "linkedAttributes": [STRENGTH_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "swimming": "Swimming"
        }
    },
    "tactics": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "tactics_air": "Tactics/Air",
            "tactics_infantry": "Tactics/Infantry",
            "tactics_land": "Tactics/Land",
            "tactics_sea": "Tactics/Sea",
            "tactics_space": "Tactics/Space"
        }
    },
    "technician": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "technician_aeronautics": "Technician/Aeronautics",
            "technician_cybernetics": "Technician/Cybernetics",
            "technician_electronic": "Technician/Electronic",
            "technician_jets": "Technician/Jets",
            "technician_mechanical": "Technician/Mechanical",
            "technician_myomer": "Technician/Myomer",
            "technician_nuclear": "Technician/Nuclear",
            "technician_weapons": "Technician/Weapons"
        }
    },
    "thrown": {
        "linkedAttributes": [DEXTERITY_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "thrown_weapons_blades": "Thrown Weapons/Blades",
            "thrown_weapons_blunt_weapons": "Thrown Weapons/Blunt Weapons"
        }
    },
    "tracking": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "tracking_urban": "Tracking/Urban",
            "tracking_wilds": "Tracking/Wilds"
        }
    },
    "training": {
        "linkedAttributes": [INTELLIGENCE_LINK, CHARISMA_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "training": "Training"
        }
    },
    "zero": {
        "linkedAttributes": [REFLEX_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "zero_g_operations": "Zero-G Operations"
        }
    }
};

const tieredSkillsBasic = {
    "art": {
        "linkedAttributes": [DEXTERITY_LINK],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": true,
        "displayName": {
            "art": "Art"
        }
    },
    "computers": {
        "linkedAttributes": [INTELLIGENCE_LINK],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "computers": "Computers"
        }
    },
    "interest": {
        "linkedAttributes": [INTELLIGENCE_LINK],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": true,
        "displayName": {
            "interest": "Interest"
        }
    },
    "martial": {
        "linkedAttributes": [REFLEX_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "martial_arts": "Martial Arts"
        }
    },
    "melee": {
        "linkedAttributes": [DEXTERITY_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "melee_weapons": "Melee Weapons"
        }
    },
    "prestidigitation": {
        "linkedAttributes": [DEXTERITY_LINK],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "prestidigitation_pick_pocket": "Prestidigitation/Pick Pocket",
            "prestidigitation_quickdraw": "Prestidigitation/Quickdraw",
            "prestidigitation_sleight_of_hand": "Prestidigitation/Sleight of Hand"
        }
    }
};

const tieredSkillsAdvanced = {
    "art": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "art": "Art"
        }
    },
    "computers": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "computers": "Computers"
        }
    },
    "interest": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "interest": "Interest"
        }
    },
    "martial": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "martial_arts": "Martial Arts"
        }
    },
    "melee": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "melee_weapons": "Melee Weapons"
        }
    },
    "prestidigitation": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "prestidigitation_pick_pocket": "Prestidigitation/Pick Pocket",
            "prestidigitation_quickdraw": "Prestidigitation/Quickdraw",
            "prestidigitation_sleight_of_hand": "Prestidigitation/Sleight of Hand"
        }
    }
};

function getSkill(skillName, skillLevel, tieredSkill) {
    skillName = String(skillName);
    skillLevel = Number(skillLevel);

    if (tieredSkill) {
        if (skillLevel <= 3) {
            return tieredSkillsBasic[skillName]
        } else {
            return tieredSkillsAdvanced[skillName]
        }
    } else {
        return skillsList[skillName]
    }
}

function getLinkedAttributeDisplayName(linkedAttributeName) {
    const linkedAttributeDisplayNames = {};
    linkedAttributeDisplayNames[STRENGTH_LINK] = "STR";
    linkedAttributeDisplayNames[BODY_LINK] = "BOD";
    linkedAttributeDisplayNames[REFLEX_LINK] = "RFL";
    linkedAttributeDisplayNames[DEXTERITY_LINK] = "DEX";
    linkedAttributeDisplayNames[INTELLIGENCE_LINK] = "INT";
    linkedAttributeDisplayNames[WILL_LINK] = "WIL";
    linkedAttributeDisplayNames[CHARISMA_LINK] = "CHA";
    linkedAttributeDisplayNames[EDGE_LINK] = "EDG";

    return linkedAttributeDisplayNames[linkedAttributeName];
}

function sheetMigration() {
    console.log("Running sheet data migration");

    let sheetVersionAttributeName = "btatow_sheet_version";
    let currentVersion = 3;

    getAttrs([sheetVersionAttributeName], sheetVersionAttribute => {
        let sheetVersion = Number(sheetVersionAttribute[sheetVersionAttributeName])
        // Check if we should do the migration
        if (isNaN(sheetVersion)) {
            console.error("No sheet version defined, unable to determine if sheet data needs to be migrated.");
            return;
        }

        if (sheetVersion === currentVersion) {
            console.log("No migration needed");
            return;
        }

        switch (sheetVersion) {
        case 1:
            migrateFrom1To2();
            break;
        case 2:
            migrateFrom2To3();
            break;
        default:
            break;
        }
    });
}

// Migrate attribute data from version 1 to version 2
function migrateFrom1To2() {
    const oldAttributeNames = [
        "STRXP",
        "BODXP",
        "RFLXP",
        "DEXXP",
        "INTXP",
        "WILXP",
        "CHAXP",
        "EDGXP"
    ];
    const newAttributeNames = [
        "strength_xp",
        "body_xp",
        "reflex_xp",
        "dexterity_xp",
        "intelligence_xp",
        "will_xp",
        "charisma_xp",
        "edge_xp"
    ];

    let newAttributes = {};

    console.log("Starting migration from version 1 to version 2.");

    getAttrs(oldAttributeNames, attributes => {
        console.debug("Attributes fetched: " + JSON.stringify(attributes));
        for (let i = 0; i < oldAttributeNames.length; i++) {
            if (attributes[oldAttributeNames[i]] !== undefined) {
                console.debug("Attributes[" + oldAttributeNames[i] + "]: " + attributes[oldAttributeNames[i]]);
                newAttributes[newAttributeNames[i]] = attributes[oldAttributeNames[i]];
            }
        }

        console.debug("New attributes: " + JSON.stringify(newAttributes));

        setAttrs(newAttributes, {}, () => {
            setAttrs({
                btatow_sheet_version: "2"
            }, {}, () => {
                console.log("Sheet data migration completed");
            });
        });
    });
}

// Migrate skills data from version 2 to version 3
function migrateFrom2To3() {
    console.log("Starting migration from version 2 to version 3.");

    getSectionIDs("skills", ids => {
        let skillsUpdated = 0;

        ids.forEach(id => {
            const oldSkillDataNames = {
                skill: "repeating_skills_" + id + "_skill",
                subSkill: "repeating_skills_" + id + "_skillNotes",
                xp: "repeating_skills_" + id + "_skillXP"
            };
            const newSkillDataNames = {
                skill: "repeating_skills_" + id + "_skill",
                subSkill: "repeating_skills_" + id + "_sub_skill",
                xp: "repeating_skills_" + id + "_skill_xp"
            };
            getAttrs(Object.values(oldSkillDataNames), oldSkillValues => {
                const oldSkillName = oldSkillValues[oldSkillDataNames.skill];
                const oldSkillSubSkillName = oldSkillValues[oldSkillDataNames.subSkill];

                if (oldSkillName === undefined || oldSkillValues[oldSkillDataNames.xp] === undefined) {
                    console.error("Old skill data is missing values, unable to migrate.\n" + JSON.stringify(oldSkillValues));
                    skillsUpdate++;
                    return;
                }

                let parsedSkillName = oldSkillName.toLowerCase()
                    .replace(" ", "_")
                    .replace("-", "_");

                const skillFirstName = parsedSkillName.split("_")[0];

                let skillData = {};
                const newSkillValues = {};

                if (skillFirstName in skillsList) {
                    skillData = skillsList[skillFirstName];
                } else if (skillFirstName in tieredSkillsBasic) {
                    skillData = tieredSkillsBasic[skillFirstName];
                } else if (skillFirstName.substring(0, skillFirstName.length - 1) in tieredSkillsBasic) {
                    skillData = tieredSkillsBasic[skillFirstName.substring(0, skillFirstName.length - 1)];
                    parsedSkillName = parsedSkillName.substring(0, parsedSkillName.length - 1);
                } else {
                    console.error("Unable to migrate skill data. Old values are: " + JSON.stringify(oldSkillValues));
                    skillsUpdated++;
                    return;
                }

                let skillName = "";
                let displaySubSkill = true;

                if (parsedSkillName in skillData.displayName) {
                    skillName = parsedSkillName;
                } else if (parsedSkillName.substring(0, parsedSkillName.length - 1) in skillData.displayName) {
                    skillName = parsedSkillName.substring(0, parsedSkillName.length - 1);
                } else if (oldSkillSubSkillName === undefined) {
                    console.error("Unable to identify skill. Old skill name: " + oldSkillName);
                    skillsUpdated++;
                    return;
                } else {
                    const parsedSubSkillName = oldSkillSubSkillName.trim()
                        .replace("\'", "")
                        .replace("`", "")
                        .replace("-", "_")
                        .replace("/", "_")
                        .toLowerCase();

                    const skillWithSubSkill = parsedSkillName + "_" + parsedSubSkillName;

                    if (skillWithSubSkill in skillData.displayName) {
                        skillName = skillWithSubSkill;
                        displaySubSkill = false;
                    } else {
                        console.error("Unable to identify skill. Old skill name and notes: " + oldSkillName + " " + oldSkillSubSkillName);
                        skillsUpdated++;
                        return;
                    }
                }

                newSkillValues[newSkillDataNames.skill] = skillName;
                if (displaySubSkill && oldSkillSubSkillName !== undefined) {
                    newSkillValues[newSkillDataNames.subSkill] = oldSkillSubSkillName;
                }
                newSkillValues[newSkillDataNames.xp] = oldSkillValues[oldSkillDataNames.xp];

                setAttrs(newSkillValues, {}, () => {
                    skillsUpdated++;

                    if (skillsUpdated === ids.length) {
                        setAttrs({
                            btatow_sheet_version: 3
                        }, {}, () => {
                            console.log("Sheet migrated from version 2 to version 3.");
                            recalculateSkills();
                        });
                    }
                });
            });
        });
    });
}