import {
    STRENGTH_LINK,
    BODY_LINK,
    REFLEX_LINK,
    DEXTERITY_LINK,
    INTELLIGENCE_LINK,
    WILL_LINK,
    CHARISMA_LINK
} from '../../attributes'

export const skillsList = {
    "acrobatics": {
        "linkedAttributes": [REFLEX_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "acrobatics_free_fall": "Acrobatics/Free-Fall",
            "acrobatics_gymnastics": "Acrobatics/Gymnastics",
        },
    },
    "acting": {
        "linkedAttributes": [CHARISMA_LINK, ],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "acting": "Acting",
        },
    },
    "administration": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "administration": "Administration",
        },
    },
    "animal": {
        "linkedAttributes": [WILL_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "animal_handling_herding": "Animal Handling/Herding",
            "animal_handling_riding": "Animal Handling/Riding",
            "animal_handling_training": "Animal Handling/Training",
        },
    },
    "appraisal": {
        "linkedAttributes": [INTELLIGENCE_LINK, ],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "appraisal": "Appraisal",
        },
    },
    "archery": {
        "linkedAttributes": [DEXTERITY_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "archery": "Archery",
        },
    },
    "artillery": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "artillery": "Artillery",
        },
    },
    "career": {
        "linkedAttributes": [INTELLIGENCE_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": true,
        "displayName": {
            "career": "Career",
        },
    },
    "climbing": {
        "linkedAttributes": [DEXTERITY_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "climbing": "Climbing",
        },
    },
    "communications": {
        "linkedAttributes": [INTELLIGENCE_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "communications_black_box": "Communications/Black Box",
            "communications_conventional_em": "Communications/Conventional (EM)",
            "communications_hyperpulse_generator": "Communications/Hyperpulse Generator",
        },
    },
    "cryptography": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "cryptography": "Cryptography",
        },
    },
    "demolitions": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "demolitions": "Demolitions",
        },
    },
    "disguise": {
        "linkedAttributes": [CHARISMA_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "disguise": "Disguise",
        },
    },
    "driving": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "driving_ground_vehicles": "Driving/Ground Vehicles",
            "driving_rail_vehicles": "Driving/Rail Vehicles",
            "driving_sea_vehicles": "Driving/Sea Vehicles",
        },
    },
    "escape": {
        "linkedAttributes": [STRENGTH_LINK, DEXTERITY_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "escape_artist": "Escape Artist",
        },
    },
    "forgery": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "forgery": "Forgery",
        },
    },
    "gunnery": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK, ],
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
            "gunnery_turret": "Gunnery/Turret",
        },
    },
    "interrogation": {
        "linkedAttributes": [WILL_LINK, CHARISMA_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "interrogation": "Interrogation",
        },
    },
    "investigation": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "investigation": "Investigation",
        },
    },
    "language": {
        "linkedAttributes": [INTELLIGENCE_LINK, CHARISMA_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": true,
        "displayName": {
            "language": "Language",
        },
    },
    "leadership": {
        "linkedAttributes": [WILL_LINK, CHARISMA_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "leadership": "Leadership",
        },
    },
    "medtech": {
        "linkedAttributes": [INTELLIGENCE_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "medtech_general": "MedTech/General",
            "medtech_veterinary": "MedTech/Veterinary",
        },
    },
    "navigation": {
        "linkedAttributes": [INTELLIGENCE_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "navigation_air": "Navigation/Air",
            "navigation_ground": "Navigation/Ground",
            "navigation_kf_jump": "Navigation/K-F Jump",
            "navigation_sea": "Navigation/Sea",
            "navigation_space": "Navigation/Space",
        },
    },
    "negotiation": {
        "linkedAttributes": [CHARISMA_LINK, ],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "negotiation": "Negotiation",
        },
    },
    "perception": {
        "linkedAttributes": [INTELLIGENCE_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "perception": "Perception",
        },
    },
    "piloting": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK, ],
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
            "piloting_spacecraft": "Piloting/Spacecraft",
        },
    },
    "protocol": {
        "linkedAttributes": [WILL_LINK, CHARISMA_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "protocol": "Protocol",
        },
    },
    "running": {
        "linkedAttributes": [REFLEX_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "running": "Running",
        },
    },
    "science": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "science": "Science",
        },
    },
    "security": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "security_systems_electronic": "Security Systems/Electronic",
            "security_systems_mechanical": "Security Systems/Mechanical",
        },
    },
    "sensor": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "sensor_operations": "Sensor Operations",
        },
    },
    "small": {
        "linkedAttributes": [DEXTERITY_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "small_arms": "Small Arms",
        },
    },
    "stealth": {
        "linkedAttributes": [REFLEX_LINK, INTELLIGENCE_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "stealth": "Stealth",
        },
    },
    "strategy": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "strategy": "Strategy",
        },
    },
    "streetwise": {
        "linkedAttributes": [CHARISMA_LINK, ],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": true,
        "displayName": {
            "streetwise": "Streetwise",
        },
    },
    "support": {
        "linkedAttributes": [DEXTERITY_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "support_weapons": "Support Weapons",
        },
    },
    "surgery": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "surgery_general": "Surgery/General",
            "surgery_veterinary": "Surgery/Veterinary",
        },
    },
    "survival": {
        "linkedAttributes": [BODY_LINK, INTELLIGENCE_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "survival": "Survival",
        },
    },
    "swimming": {
        "linkedAttributes": [STRENGTH_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "swimming": "Swimming",
        },
    },
    "tactics": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "tactics_air": "Tactics/Air",
            "tactics_infantry": "Tactics/Infantry",
            "tactics_land": "Tactics/Land",
            "tactics_sea": "Tactics/Sea",
            "tactics_space": "Tactics/Space",
        },
    },
    "technician": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK, ],
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
            "technician_weapons": "Technician/Weapons",
        },
    },
    "thrown": {
        "linkedAttributes": [DEXTERITY_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "thrown_weapons_blades": "Thrown Weapons/Blades",
            "thrown_weapons_blunt_weapons": "Thrown Weapons/Blunt Weapons",
        },
    },
    "tracking": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "tracking_urban": "Tracking/Urban",
            "tracking_wilds": "Tracking/Wilds",
        },
    },
    "training": {
        "linkedAttributes": [INTELLIGENCE_LINK, CHARISMA_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "training": "Training",
        },
    },
    "zero": {
        "linkedAttributes": [REFLEX_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "zero_g_operations": "Zero-G Operations",
        },
    },
}

export const tieredSkillsBasic = {
    "art": {
        "linkedAttributes": [DEXTERITY_LINK, ],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": true,
        "displayName": {
            "art": "Art",
        },
    },
    "computers": {
        "linkedAttributes": [INTELLIGENCE_LINK, ],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "computers": "Computers",
        },
    },
    "interest": {
        "linkedAttributes": [INTELLIGENCE_LINK, ],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": true,
        "displayName": {
            "interest": "Interest",
        },
    },
    "martial": {
        "linkedAttributes": [REFLEX_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "martial_arts": "Martial Arts",
        },
    },
    "melee": {
        "linkedAttributes": [DEXTERITY_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "melee_weapons": "Melee Weapons",
        },
    },
    "prestidigitation": {
        "linkedAttributes": [DEXTERITY_LINK, ],
        "targetNumber": 7,
        "complexity": "SB",
        "subSkills": false,
        "displayName": {
            "prestidigitation_pick_pocket": "Prestidigitation/Pick Pocket",
            "prestidigitation_quickdraw": "Prestidigitation/Quickdraw",
            "prestidigitation_sleight_of_hand": "Prestidigitation/Sleight of Hand",
        },
    },
}

export const tieredSkillsAdvanced = {
    "art": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "art": "Art",
        },
    },
    "computers": {
        "linkedAttributes": [DEXTERITY_LINK, INTELLIGENCE_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": false,
        "displayName": {
            "computers": "Computers",
        },
    },
    "interest": {
        "linkedAttributes": [INTELLIGENCE_LINK, WILL_LINK, ],
        "targetNumber": 9,
        "complexity": "CA",
        "subSkills": true,
        "displayName": {
            "interest": "Interest",
        },
    },
    "martial": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "martial_arts": "Martial Arts",
        },
    },
    "melee": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "melee_weapons": "Melee Weapons",
        },
    },
    "prestidigitation": {
        "linkedAttributes": [REFLEX_LINK, DEXTERITY_LINK, ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "prestidigitation_pick_pocket": "Prestidigitation/Pick Pocket",
            "prestidigitation_quickdraw": "Prestidigitation/Quickdraw",
            "prestidigitation_sleight_of_hand": "Prestidigitation/Sleight of Hand",
        },
    },
}

export const tieredSkills = [
    "art",
    "computers",
    "interest",
    "martial",
    "melee",
    "prestidigitation",
]