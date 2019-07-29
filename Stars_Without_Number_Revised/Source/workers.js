/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on, removeRepeatingRow, _, getTranslationByKey */
(function () {
	"use strict";
	/* Data constants */
	const sheetName = "Stars Without Number (revised)";
	const sheetVersion = "2.4.2";
	const translate = getTranslationByKey;
	const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
	const effortAttributes = ["wisdom_mod", "constitution_mod", "psionics_extra_effort",
		"skill_biopsionics", "skill_precognition", "skill_telepathy", "skill_teleportation",
		"skill_telekinesis", "skill_metapsionics", "psionics_committed_effort_current",
		"psionics_committed_effort_scene", "psionics_committed_effort_day"
	];
	const shipStatEvent = [
		...["hardpoints", "power", "mass"].map(x => `change:repeating_ship-weapons:weapon_${x}`),
		...["power", "mass"].map(x => `change:repeating_ship-defenses:defense_${x}`),
		...["power", "mass"].map(x => `change:repeating_ship-fittings:fitting_${x}`),
		"change:ship_power", "change:ship_mass", "change:ship_hardpoints",
		"remove:repeating_ship-weapons", "remove:repeating_ship-defenses",
		"remove:repeating_ship-fittings"
	].join(" ");
	const weaponSkills = [
		"skill_exert", "skill_punch", "skill_shoot", "skill_stab", "skill_combat_energy",
		"skill_combat_gunnery", "skill_combat_primitive", "skill_combat_projectile",
		"skill_combat_psitech", "skill_combat_unarmed", "skill_telekinesis"
	];
	const weaponDisplayEvent = [
		...["attack", "name", "skill_bonus", "attribute_mod", "damage", "shock", "shock_damage",
			"shock_ac", "skill_to_damage"
		].map(x => `change:repeating_weapons:weapon_${x}`),
		"remove:repeating_weapons", "change:attack_bonus",
		...weaponSkills.map(name => `change:${name}`),
	].join(" ");
	const skills = {
		revised: ["administer", "connect", "exert", "fix", "heal", "know", "lead",
			"notice", "perform", "pilot", "program", "punch", "shoot", "sneak", "stab",
			"survive", "talk", "trade", "work"
		],
		first: ["artist", "athletics", "bureaucracy", "business", "combat_energy", "combat_gunnery",
			"combat_primitive", "combat_projectile", "combat_psitech", "combat_unarmed", "computer",
			"culture_alien", "culture_criminal", "culture_spacer", "culture_traveller", "culture_one",
			"culture_two", "culture_three", "exosuit", "gambling", "history", "instructor", "language",
			"leadership", "navigation", "perception", "persuade", "profession", "religion", "science",
			"security", "stealth", "steward", "survival", "tactics", "tech_astronautic", "tech_maltech",
			"tech_medical", "tech_postech", "tech_pretech", "tech_psitech", "vehicle_air", "vehicle_grav",
			"vehicle_land", "vehicle_space", "vehicle_water"
		],
		psionic: ["biopsionics", "metapsionics", "precognition", "telekinesis", "telepathy", "teleportation"],
	};
	const shipStats = ["ship_ac", "ship_armor", "ship_class", "ship_crew_max", "ship_crew_min",
		"ship_hardpoints_max", "ship_hp", "ship_hp_max", "ship_mass_max", "ship_power_max", "ship_speed"
	];
	const reverseHullTypes = {
		[translate("BATTLESHIP").toLowerCase()]: "battleship",
		[translate("BULK_FREIGHTER").toLowerCase()]: "bulk_freighter",
		[translate("CARRIER").toLowerCase()]: "carrier",
		[translate("CORVETTE").toLowerCase()]: "corvette",
		[translate("FLEET_CRUISER").toLowerCase()]: "fleet_cruiser",
		[translate("FREE_MERCHANT").toLowerCase()]: "free_merchant",
		[translate("HEAVY_FRIGATE").toLowerCase()]: "heavy_frigate",
		[translate("LARGE_STATION").toLowerCase()]: "large_station",
		[translate("PATROL_BOAT").toLowerCase()]: "patrol_boat",
		[translate("SMALL_STATION").toLowerCase()]: "small station",
		[translate("STRIKE_FIGHTER").toLowerCase()]: "strike_fighter",
		[translate("SHUTTLE").toLowerCase()]: "shuttle",
	};
	const reverseClasses = {
		[translate("ADVENTURER").toLowerCase()]: "adventurer",
		[translate("EXPERT").toLowerCase()]: "expert",
		[translate("PSYCHIC").toLowerCase()]: "psychic",
		[translate("WARRIOR").toLowerCase()]: "warrior",
	};
	const autofillSections = ["armor", "cyberware", "foci", "gear", "ship-defenses", "ship-fittings", "ship-weapons", "techniques", "weapons"];
	const autofillData = {
		"classes": {
			adventurer: {
				class_ability: translate("ADVENTURER_CLASS_ABILITY"),
			},
			expert: {
				class_ability: translate("EXPERT_CLASS_ABILITY"),
			},
			psychic: {
				class_ability: translate("PSYCHIC_CLASS_ABILITY"),
			},
			warrior: {
				attack_bonus: "1",
				class_ability: translate("WARRIOR_CLASS_ABILITY"),
			},
		},
		"drones": {
			alecto: {
				drone_AC: "18",
				drone_enc: "4",
				drone_HP: "30",
				drone_num_fittings: "4",
				drone_range: "5000 km",
			},
			cuttlefish: {
				drone_AC: "13",
				drone_enc: "2",
				drone_HP: "10",
				drone_num_fittings: "5",
				drone_range: "1 km",
			},
			ghostwalker: {
				drone_AC: "15",
				drone_enc: "3",
				drone_fitting_1_desc: translate("SENSOR_TRANSPARENCY_DESC"),
				drone_fitting_1_name: translate("SENSOR_TRANSPARENCY"),
				drone_HP: "1",
				drone_num_fittings: "3",
				drone_range: "5 km",
			},
			pax: {
				drone_AC: "16",
				drone_enc: "4",
				drone_HP: "20",
				drone_num_fittings: "4",
				drone_range: "100 km",
			},
			primitve_drone: {
				drone_AC: "12",
				drone_enc: "2",
				drone_HP: "1",
				drone_num_fittings: "1",
				drone_range: "500 m",
			},
			sleeper: {
				drone_AC: "12",
				drone_enc: "2",
				drone_fitting_1_desc: translate("STATIONKEEPING_DESC"),
				drone_fitting_1_name: translate("STATIONKEEPING"),
				drone_HP: "8",
				drone_num_fittings: "5",
				drone_range: "100 km",
			},
			stalker: {
				drone_AC: "13",
				drone_enc: "2",
				drone_HP: "5",
				drone_num_fittings: "3",
				drone_range: "2 km",
			},
			void_hawk: {
				drone_AC: "14",
				drone_enc: "6",
				drone_HP: "15",
				drone_num_fittings: "4",
				drone_range: "100 km",
			},
		},
		"droneFittings": [
			"ammo_unit",
			"bomber",
			"environmental_power",
			"expert_system",
			"extended_flight",
			"grav_muffles",
			"heavy_lift",
			"holoskin",
			"medical_support",
			"observation_suite",
			"racing_gravitics",
			"reinforced_structure",
			"sensor_transparency",
			"stationkeeping",
			"suicide_charge",
			"weapon_fitting"
		],
		"hulltypes": {
			battleship: {
				ship_ac: "16",
				ship_armor: "20",
				ship_class: translate("CAPITAL"),
				ship_crew_max: "1000",
				ship_crew_min: "200",
				ship_hardpoints_max: "15",
				ship_hp: "100",
				ship_mass_max: "50",
				ship_power_max: "75",
				ship_speed: "0",
			},
			bulk_freighter: {
				ship_ac: "11",
				ship_armor: "0",
				ship_class: translate("CRUISER"),
				ship_crew_max: "40",
				ship_crew_min: "10",
				ship_hardpoints_max: "2",
				ship_hp: "40",
				ship_mass_max: "25",
				ship_power_max: "15",
				ship_speed: "0",
			},
			carrier: {
				ship_ac: "14",
				ship_armor: "10",
				ship_class: translate("CAPITAL"),
				ship_crew_max: "1500",
				ship_crew_min: "300",
				ship_hardpoints_max: "4",
				ship_hp: "75",
				ship_mass_max: "100",
				ship_power_max: "50",
				ship_speed: "0",
			},
			corvette: {
				ship_ac: "13",
				ship_armor: "10",
				ship_class: translate("FRIGATE"),
				ship_crew_max: "40",
				ship_crew_min: "10",
				ship_hardpoints_max: "6",
				ship_hp: "40",
				ship_mass_max: "15",
				ship_power_max: "15",
				ship_speed: "2",
			},
			fleet_cruiser: {
				ship_ac: "14",
				ship_armor: "15",
				ship_class: translate("CRUISER"),
				ship_crew_max: "200",
				ship_crew_min: "50",
				ship_hardpoints_max: "10",
				ship_hp: "60",
				ship_mass_max: "30",
				ship_power_max: "50",
				ship_speed: "1",
			},
			free_merchant: {
				ship_ac: "14",
				ship_armor: "2",
				ship_class: translate("FRIGATE"),
				ship_crew_max: "6",
				ship_crew_min: "1",
				ship_hardpoints_max: "2",
				ship_hp: "20",
				ship_mass_max: "15",
				ship_power_max: "10",
				ship_speed: "3",
			},
			heavy_frigate: {
				ship_ac: "15",
				ship_armor: "10",
				ship_class: translate("FRIGATE"),
				ship_crew_max: "120",
				ship_crew_min: "30",
				ship_hardpoints_max: "8",
				ship_hp: "50",
				ship_mass_max: "20",
				ship_power_max: "25",
				ship_speed: "1",
			},
			large_station: {
				ship_ac: "17",
				ship_armor: "20",
				ship_class: translate("CAPITAL"),
				ship_crew_max: "1000",
				ship_crew_min: "100",
				ship_hardpoints_max: "30",
				ship_hp: "120",
				ship_mass_max: "75",
				ship_power_max: "125",
				ship_speed: "",
			},
			patrol_boat: {
				ship_ac: "14",
				ship_armor: "5",
				ship_class: translate("FRIGATE"),
				ship_crew_max: "20",
				ship_crew_min: "5",
				ship_hardpoints_max: "4",
				ship_hp: "25",
				ship_mass_max: "10",
				ship_power_max: "15",
				ship_speed: "4",
			},
			small_station: {
				ship_ac: "11",
				ship_armor: "5",
				ship_class: translate("CRUISER"),
				ship_crew_max: "200",
				ship_crew_min: "20",
				ship_hardpoints_max: "10",
				ship_hp: "120",
				ship_mass_max: "40",
				ship_power_max: "50",
				ship_speed: "",
			},
			strike_fighter: {
				ship_ac: "16",
				ship_armor: "5",
				ship_class: translate("FIGHTER"),
				ship_crew_max: "1",
				ship_crew_min: "1",
				ship_hardpoints_max: "1",
				ship_hp: "8",
				ship_mass_max: "2",
				ship_power_max: "5",
				ship_speed: "5",
			},
			shuttle: {
				ship_ac: "11",
				ship_armor: "0",
				ship_class: translate("FIGHTER"),
				ship_crew_max: "10",
				ship_crew_min: "1",
				ship_hardpoints_max: "1",
				ship_hp: "15",
				ship_mass_max: "5",
				ship_power_max: "3",
				ship_speed: "3",
			},
		},
		// HD AC AB Damage #attacks move morale skills saves armor_type
		// TODO: Clean this up into a maintainable format
		"statblocks": {
			barbarian_hero: ["6", "16", "8", "Weapon+3", "1", "10m", "11", "3", "12", "PRIMITIVE"],
			barbarian_tribal: ["1", "12", "2", "Weapon", "1", "10m", "8", "1", "15", "PRIMITIVE"],
			civilian_security_bot: ["1", "15", "1", "1d8[Stun]", "1", "10m", "12", "1", "15"],
			companion_bot: ["1", "12", "0", "1d2[Unarmed]", "1", "10m", "6", "1", "15"],
			elite_fighter: ["3", "16", "4", "Weapon+1", "1", "10m", "10", "2", "14", "COMBAT"],
			gang_boss: ["3", "14", "4", "Weapon+1", "1", "10m", "9", "2", "15"],
			gang_member: ["1", "12", "1", "Weapon", "1", "10m", "7", "1", "15"],
			geneengineered_killer: ["4", "16", "5", "Weapon+1", "1", "15m", "10", "2", "13"],
			geneengineered_murder_beast: ["10", "18", "10", "1d10", "4", "20m", "12", "3", "10"],
			greater_lone_predator: ["5", "16", "6", "1d10", "2", "10m", "9", "2", "12"],
			heavy_warbot: ["6", "18", "8", "2d8[Plasma]", "2", "15m", "10", "2", "12"],
			heroic_fighter: ["6", "16", "8", "Weapon+3", "1", "10m", "11", "3", "12", "COMBAT"],
			industrial_work_bot: ["2", "15", "0", "1d10[Crush]", "1", "5", "8", "1", "14"],
			janitor_bot: ["1", "14", "0", "Unarmed", "1", "5m", "8", "1", "15"],
			large_aggressive_prey_animal: ["5", "13", "4", "1d10", "1", "15m", "8", "1", "12"],
			large_pack_hunter: ["2", "14", "2", "1d6", "1", "15m", "9", "1", "14"],
			legendary_fighter: ["10", "20", "12", "Weapon+4", "2", "10m", "12", "5", "10", "POWERED"],
			lesser_lone_predator: ["3", "14", "4", "1d8", "2", "15m", "8", "2", "14"],
			martial_human: ["1", "10", "1", "Weapon", "1", "10m", "8", "1", "15"],
			military_elite: ["3", "16", "4", "Weapon+1", "1", "10m", "10", "2", "14", "COMBAT"],
			military_soldier: ["1", "16", "1", "Weapon", "1", "10m", "9", "1", "15", "COMBAT"],
			normal_human: ["1", "10", "0", "Unarmed", "1", "10m", "6", "1", "15"],
			peaceful_human: ["1", "10", "0", "Unarmed", "1", "10m", "6", "1", "15"],
			pirate_king: ["7", "18", "9", "Weapon+2", "1", "10m", "11", "3", "12", "POWERED"],
			police_officer: ["1", "14", "1", "Weapon", "1", "10m", "8", "1", "15"],
			repair_bot: ["1", "14", "0", "1d6[Tool]", "1", "10m", "8", "1", "15"],
			serial_killer: ["6", "12", "8", "Weapon+3", "1", "10m", "12", "3", "12"],
			skilled_professional: ["1", "10", "0", "Weapon", "1", "10m", "6", "2", "15"],
			small_pack_hunter: ["1", "13", "1", "1d4", "1", "15m", "8", "1", "15"],
			small_vicious_beast: ["1hp", "14", "1", "1d2", "1", "10m", "7", "1", "15"],
			soldier_bot: ["2", "16", "1", "Weapon", "1", "10m", "10", "1", "14"],
			terrifying_apex_predator: ["8", "16", "8", "1d10", "2", "20m", "9", "2", "11"],
			veteran_fighter: ["2", "14", "2", "Weapon+1", "1", "10m", "9", "1", "14"],
			warrior_tyrant: ["8", "20", "10", "Weapon+3", "1", "10m", "11", "3", "11", "POWERED"]
		},
		"armor": {
			armored_undersuit: {
				armor_ac: "13",
				armor_encumbrance: "0",
				armor_type: "STREET",
			},
			armored_vacc_suit: {
				armor_ac: "13",
				armor_encumbrance: "2",
				armor_type: "STREET",
			},
			assault_suit: {
				armor_ac: "18",
				armor_encumbrance: "2",
				armor_type: "POWERED",
			},
			combat_field_uniform: {
				armor_ac: "16",
				armor_encumbrance: "1",
				armor_type: "COMBAT",
			},
			cuirass_brigandine_linothorax_half_plate: {
				armor_ac: "15",
				armor_encumbrance: "1",
				armor_type: "PRIMITIVE",
			},
			deflector_array: {
				armor_ac: "18",
				armor_encumbrance: "0",
				armor_type: "STREET",
			},
			executive_security_suit: {
				armor_ac: "15",
				armor_encumbrance: "0",
				armor_type: "ARTIFACT",
			},
			field_emitter_panoply: {
				armor_ac: "20",
				armor_encumbrance: "1",
				armor_encumbrance_bonus: "4",
				armor_type: "POWERED",
			},
			force_pavis: {
				armor_ac: "15",
				armor_ac_bonus: "1",
				armor_encumbrance: "1",
				armor_type: "SHIELD",
			},
			full_plate_layered_mail: {
				armor_ac: "17",
				armor_encumbrance: "2",
				armor_type: "PRIMITIVE",
			},
			ghost_mantle: {
				armor_ac: "15",
				armor_encumbrance: "0",
				armor_type: "ARTIFACT",
			},
			icarus_harness: {
				armor_ac: "16",
				armor_encumbrance: "1",
				armor_type: "COMBAT",
			},
			leather_jacks_thick_hides_quilted_armor: {
				armor_ac: "13",
				armor_encumbrance: "1",
				armor_type: "PRIMITIVE",
			},
			polyplast_carapace: {
				armor_ac: "18",
				armor_encumbrance: "1",
				armor_type: "ARTIFACT",
			},
			psitech_combat_suit: {
				armor_ac: "16",
				armor_encumbrance: "0",
				armor_type: "ARTIFACT",
			},
			secure_clothing: {
				armor_ac: "13",
				armor_encumbrance: "1",
				armor_type: "STREET",
			},
			security_armor: {
				armor_ac: "14",
				armor_encumbrance: "1",
				armor_type: "COMBAT",
			},
			shield: {
				armor_ac: "13",
				armor_ac_bonus: "1",
				armor_encumbrance: "1",
				armor_type: "SHIELD",
			},
			storm_armor: {
				armor_ac: "19",
				armor_encumbrance: "2",
				armor_encumbrance_bonus: "4",
				armor_type: "POWERED",
			},
			stutterjump_suit: {
				armor_ac: "18",
				armor_encumbrance: "0",
				armor_type: "ARTIFACT",
			},
			tempest_assault_array: {
				armor_ac: "20",
				armor_encumbrance: "1",
				armor_encumbrance_bonus: "4",
				armor_type: "ARTIFACT",
			},
			titan_powered_armor: {
				armor_ac: "21",
				armor_encumbrance: "2",
				armor_encumbrance_bonus: "4",
				armor_type: "ARTIFACT",
			},
			vestimentum: {
				armor_ac: "18",
				armor_encumbrance: "0",
				armor_type: "POWERED",
			},
			warpaint: {
				armor_ac: "12",
				armor_encumbrance: "0",
				armor_type: "STREET",
			},
			woven_body_armor: {
				armor_ac: "15",
				armor_encumbrance: "2",
				armor_type: "COMBAT",
			}
		},
		"cyberware": {
			adrenal_suppression_pump: {
				cyberware_strain: "1"
			},
			bioadaptation_augments: {
				cyberware_strain: "1"
			},
			body_arsenal_array: {
				cyberware_strain: "1"
			},
			body_sculpting: {
				cyberware_strain: "1"
			},
			dermal_armor: {
				cyberware_strain: "2"
			},
			drone_control_link: {
				cyberware_strain: "1"
			},
			eelskin_capacitor_mesh: {
				cyberware_strain: "1"
			},
			gecko_anchors: {
				cyberware_strain: "1"
			},
			ghost_talker_transceiver: {
				cyberware_strain: "1"
			},
			holdout_cavity: {
				cyberware_strain: "1"
			},
			holoskin_emitter: {
				cyberware_strain: "1"
			},
			identity_submersion_trigger: {
				cyberware_strain: "1"
			},
			immunofiltration_systems: {
				cyberware_strain: "2"
			},
			induced_coma_trigger: {
				cyberware_strain: "1"
			},
			neurointruder_alert: {
				cyberware_strain: "1"
			},
			panspectral_optics: {
				cyberware_strain: "1"
			},
			pressure_sheathing: {
				cyberware_strain: "1"
			},
			prosthetic_limb: {
				cyberware_strain: "1"
			},
			revenant_wiring: {
				cyberware_strain: "3"
			},
			slowtime_window: {
				cyberware_strain: "2"
			},
			stabilization_overrides: {
				cyberware_strain: "2"
			},
			tagger_nanites: {
				cyberware_strain: "1"
			},
			toxin_injector: {
				cyberware_strain: "2"
			},
			twitchlock_actuators: {
				cyberware_strain: "2"
			},
		},
		"foci": {
			alert: {},
			armsman: {},
			assassin: {},
			authority: {},
			close_combatant: {},
			connected: {},
			die_hard: {},
			diplomat: {},
			gunslinger: {},
			hacker: {},
			healer: {},
			henchkeeper: {},
			ironhide: {},
			psychic_training: {},
			savage_fray: {},
			shocking_assault: {},
			sniper: {},
			specialist: {},
			star_captain: {},
			starfarer: {},
			tinker: {},
			unarmed_combatant: {},
			unique_gift: {},
			wanderer: {},
			wild_psychic_talent: {},
		},
		"gear": {
			ai_companion: {
				gear_encumbrance: "0",
			},
			ammo_20_rounds: {
				gear_encumbrance: "1#",
			},
			ammo_missile: {
				gear_encumbrance: "1",
			},
			atmofilter: {
				gear_encumbrance: "1",
			},
			backpack: {
				gear_encumbrance: "1",
			},
			bezoar: {
				gear_encumbrance: "0",
			},
			binoculars: {
				gear_encumbrance: "1",
			},
			bioscanner: {
				gear_encumbrance: "1",
			},
			black_slab: {
				gear_encumbrance: "1",
			},
			brainwave: {
				gear_encumbrance: "0",
			},
			climbing_harness: {
				gear_encumbrance: "1",
			},
			comm_server: {
				gear_encumbrance: "3",
			},
			compad: {
				gear_encumbrance: "0",
			},
			data_phase_tab: {
				gear_encumbrance: "1",
			},
			data_protocol: {
				gear_encumbrance: "0",
			},
			dataslab: {
				gear_encumbrance: "1",
			},
			field_radio: {
				gear_encumbrance: "1",
			},
			glowbug: {
				gear_encumbrance: "0",
			},
			grapnel_launcher: {
				gear_encumbrance: "1",
			},
			grav_chute: {
				gear_encumbrance: "1",
			},
			grav_harness: {
				gear_encumbrance: "3",
			},
			hush: {
				gear_encumbrance: "0",
			},
			instapanel: {
				gear_encumbrance: "1#",
			},
			integrity_stims: {
				gear_encumbrance: "0",
			},
			juggernaut_stims: {
				gear_encumbrance: "0",
			},
			lazarus_patch: {
				gear_encumbrance: "1#",
			},
			lift: {
				gear_encumbrance: "0",
			},
			line_shunt: {
				gear_encumbrance: "0",
			},
			low_light_goggles: {
				gear_encumbrance: "1",
			},
			medkit: {
				gear_encumbrance: "2",
			},
			metatool: {
				gear_encumbrance: "1",
			},
			micropurgator_stims: {
				gear_encumbrance: "0",
			},
			mindwall_helmet: {
				gear_encumbrance: "0",
			},
			navcomp: {
				gear_encumbrance: "1",
			},
			polymorphic_nanites: {
				gear_encumbrance: "1",
			},
			portabox: {
				gear_encumbrance: "1",
			},
			pseudonuke: {
				gear_encumbrance: "1",
			},
			power_cell_type_a: {
				gear_encumbrance: "1#",
			},
			power_cell_type_b: {
				gear_encumbrance: "1",
			},
			pressure_tent: {
				gear_encumbrance: "4",
			},
			pretech_cosmetic: {
				gear_encumbrance: "0",
			},
			psych: {
				gear_encumbrance: "0",
			},
			rations_1_day: {
				gear_encumbrance: "1#",
			},
			redivivus_sheath: {
				gear_encumbrance: "1",
			},
			remote_link_unit: {
				gear_encumbrance: "1",
			},
			reverie: {
				gear_encumbrance: "0",
			},
			rope_20_meters: {
				gear_encumbrance: "2/1",
			},
			scout_report: {
				gear_encumbrance: "0",
			},
			solar_recharger: {
				gear_encumbrance: "3",
			},
			spare_parts: {
				gear_encumbrance: "1#",
			},
			squeal: {
				gear_encumbrance: "0",
			},
			stiletto_charge: {
				gear_encumbrance: "1",
			},
			storage_unit: {
				gear_encumbrance: "3",
			},
			survey_scanner: {
				gear_encumbrance: "1",
			},
			survival_kit: {
				gear_encumbrance: "1",
			},
			system_reset_inductor: {
				gear_encumbrance: "0",
			},
			tailored_antiallergens: {
				gear_encumbrance: "0",
			},
			telekinetic_generator: {
				gear_encumbrance: "2",
			},
			telescoping_pole: {
				gear_encumbrance: "0",
			},
			thermal_flare: {
				gear_encumbrance: "0",
			},
			tightbeam_link_unit: {
				gear_encumbrance: "1",
			},
			toolkit_postech: {
				gear_encumbrance: "3",
			},
			toolkit_pretech: {
				gear_encumbrance: "1",
			},
			trade_goods: {
				gear_encumbrance: "1#",
			},
			trade_metals: {
				gear_encumbrance: "1#",
			},
			translator_torc: {
				gear_encumbrance: "0",
			},
			tsunami: {
				gear_encumbrance: "0",
			},
			vacc_fresher: {
				gear_encumbrance: "1",
			},
			vacc_skin: {
				gear_encumbrance: "1",
			},
			vacc_suit: {
				gear_encumbrance: "2",
			},
			wideawake_serum: {
				gear_encumbrance: "0",
			},
		},
		"ship-defenses": {
			ablative_hull_compartments: {
				class: "CAPITAL",
				defense_effect: `+1 ${translate("AC")}, +20 ${translate("MAXIMUM_HIT_POINTS").toLowerCase()}.`,
				defense_mass: "2#",
				defense_power: "5",
			},
			augmented_plating: {
				class: "FIGHTER",
				defense_effect: `+2 ${translate("AC")}, -1 ${translate("SPEED")}.`,
				defense_mass: "1#",
				defense_power: "0",
			},
			boarding_countermeasures: {
				class: "FRIGATE",
				defense_effect: translate("BOARDING_COUNTERMEASURES_DESC"),
				defense_mass: "1#",
				defense_power: "2",
			},
			burst_ecm_generator: {
				class: "FRIGATE",
				defense_effect: translate("BURST_ECM_GENERATOR_DESC"),
				defense_mass: "1#",
				defense_power: "2",
			},
			foxer_drones: {
				class: "CRUISER",
				defense_effect: translate("FOXER_DRONES_DESC"),
				defense_mass: "1#",
				defense_power: "2",
			},
			grav_eddy_displacer: {
				class: "FRIGATE",
				defense_effect: translate("GRAV_EDDY_DISPLACER_DESC"),
				defense_mass: "2#",
				defense_power: "5",
			},
			hardened_polyceramic_overlay: {
				class: "FIGHTER",
				defense_effect: translate("HARDENED_POLYCERAMIC_OVERLAY_DESC"),
				defense_mass: "1#",
				defense_power: "0",
			},
			planetary_defense_array: {
				class: "FRIGATE",
				defense_effect: translate("PLANETARY_DEFENSE_ARRAY_DESC"),
				defense_mass: "2#",
				defense_power: "4",
			},
			point_defense_lasers: {
				class: "FRIGATE",
				defense_effect: translate("POINT_DEFENSE_LASERS_DESC"),
				defense_mass: "2#",
				defense_power: "3",
			},
		},
		"ship-fittings": {
			advanced_lab: {
				class: "FRIGATE",
				fitting_mass: "2",
				fitting_power: "1#",
			},
			advanced_nav_computer: {
				class: "FRIGATE",
				fitting_mass: "0",
				fitting_power: "1#",
			},
			amphibious_operation: {
				class: "FIGHTER",
				fitting_mass: "1#",
				fitting_power: "1",
			},
			armory: {
				class: "FRIGATE",
				fitting_mass: "0",
				fitting_power: "0",
			},
			atmospheric_configuration: {
				class: "FIGHTER",
				fitting_mass: "1#",
				fitting_power: "0",
			},
			auto_targeting_system: {
				class: "FIGHTER",
				fitting_mass: "0",
				fitting_power: "1",
			},
			automation_support: {
				class: "FIGHTER",
				fitting_mass: "1",
				fitting_power: "2",
			},
			boarding_tubes: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "0",
			},
			cargo_lighter: {
				class: "FRIGATE",
				fitting_mass: "2",
				fitting_power: "0",
			},
			cargo_space: {
				class: "FIGHTER",
				fitting_mass: "1",
				fitting_power: "0",
			},
			cold_sleep_pods: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "1",
			},
			colony_core: {
				class: "FRIGATE",
				fitting_mass: "2#",
				fitting_power: "4",
			},
			drill_course_regulator: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "1#",
			},
			spike_drive_2: {
				class: "FIGHTER",
				fitting_mass: "1#",
				fitting_power: "1#",
			},
			spike_drive_3: {
				class: "FIGHTER",
				fitting_mass: "2#",
				fitting_power: "2#",
			},
			spike_drive_4: {
				class: "FRIGATE",
				fitting_mass: "3#",
				fitting_power: "2#",
			},
			spike_drive_5: {
				class: "FRIGATE",
				fitting_mass: "3#",
				fitting_power: "3#",
			},
			spike_drive_6: {
				class: "CRUISER",
				fitting_mass: "4#",
				fitting_power: "3#",
			},
			drop_pod: {
				class: "FRIGATE",
				fitting_mass: "2",
				fitting_power: "0",
			},
			emissions_dampers: {
				class: "FIGHTER",
				fitting_mass: "1#",
				fitting_power: "1#",
			},
			exodus_bay: {
				class: "CRUISER",
				fitting_mass: "2#",
				fitting_power: "1#",
			},
			extended_life_support: {
				class: "FIGHTER",
				fitting_mass: "1#",
				fitting_power: "1#",
			},
			extended_medbay: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "1",
			},
			extended_store: {
				class: "FIGHTER",
				fitting_mass: "1#",
				fitting_power: "0",
			},
			fuel_bunkers: {
				class: "FIGHTER",
				fitting_mass: "1",
				fitting_power: "0",
			},
			fuel_scoops: {
				class: "FRIGATE",
				fitting_mass: "1#",
				fitting_power: "2",
			},
			hydroponic_production: {
				class: "CRUISER",
				fitting_mass: "2#",
				fitting_power: "1#",
			},
			lifeboats: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "0",
			},
			luxury_cabins: {
				class: "FRIGATE",
				fitting_mass: "1#",
				fitting_power: "1",
			},
			mobile_extractor: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "2",
			},
			mobile_factory: {
				class: "CRUISER",
				fitting_mass: "2#",
				fitting_power: "3",
			},
			precognitive_nav_chamber: {
				class: "FRIGATE",
				fitting_mass: "0",
				fitting_power: "1",
			},
			psionic_anchorpoint: {
				class: "FRIGATE",
				fitting_mass: "0",
				fitting_power: "3",
			},
			sensor_mask: {
				class: "FRIGATE",
				fitting_mass: "0",
				fitting_power: "1#",
			},
			ship_bay_fighter: {
				class: "CRUISER",
				fitting_mass: "2",
				fitting_power: "0",
			},
			ship_bay_frigate: {
				class: "CAPITAL",
				fitting_mass: "4",
				fitting_power: "1",
			},
			ships_locker: {
				class: "FRIGATE",
				fitting_mass: "0",
				fitting_power: "0",
			},
			shiptender_mount: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "1",
			},
			smugglers_hold: {
				class: "FIGHTER",
				fitting_mass: "1",
				fitting_power: "0",
			},
			survey_sensor_array: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "2",
			},
			system_drive: {
				class: "FIGHTER",
				fitting_mass: "-2#",
				fitting_power: "-1#",
			},
			teleportation_pads: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "1",
			},
			tractor_beams: {
				class: "FRIGATE",
				fitting_mass: "1",
				fitting_power: "2",
			},
			vehicle_transport_fittings: {
				class: "FRIGATE",
				fitting_mass: "1#",
				fitting_power: "0",
			},
			workshop: {
				class: "FRIGATE",
				fitting_mass: "0.5#",
				fitting_power: "1",
			},
		},
		"ship-weapons": {
			charged_particle_caster: {
				class: "FRIGATE",
				weapon_damage: "3d6",
				weapon_hardpoints: "2",
				weapon_mass: "1",
				weapon_power: "10",
				weapon_qualities: `${translate("AP")} 15, ${translate("CLUMSY")}`,
			},
			flak_emitter_battery: {
				class: "FRIGATE",
				weapon_damage: "2d6",
				weapon_hardpoints: "1",
				weapon_mass: "3",
				weapon_power: "5",
				weapon_qualities: `${translate("AP")} 10, ${translate("FLAK")}`,
			},
			fractal_impact_charge: {
				weapon_ammo: "4",
				class: "FIGHTER",
				weapon_damage: "2d6",
				weapon_hardpoints: "1",
				weapon_mass: "1",
				weapon_power: "5",
				weapon_qualities: `${translate("AP")} 15`,
			},
			gravcannon: {
				class: "CRUISER",
				weapon_damage: "4d6",
				weapon_hardpoints: "3",
				weapon_mass: "4",
				weapon_power: "15",
				weapon_qualities: `${translate("AP")} 20`,
			},
			lightning_charge_mantle: {
				class: "CAPITAL",
				weapon_damage: "1d20",
				weapon_hardpoints: "2",
				weapon_mass: "5",
				weapon_power: "15",
				weapon_qualities: `${translate("AP")} 5, ${translate("CLOUD")}`,
			},
			mag_spike_array: {
				weapon_ammo: "5",
				class: "FRIGATE",
				weapon_damage: "2d6+2",
				weapon_hardpoints: "2",
				weapon_mass: "2",
				weapon_power: "5",
				weapon_qualities: `${translate("AP")} 10, ${translate("FLAK")}`,
			},
			mass_cannon: {
				weapon_ammo: "4",
				class: "CAPITAL",
				weapon_damage: "2d20",
				weapon_hardpoints: "4",
				weapon_mass: "5",
				weapon_power: "10",
				weapon_qualities: `${translate("AP")} 20`,
			},
			multifocal_laser: {
				class: "FIGHTER",
				weapon_damage: "1d4",
				weapon_hardpoints: "1",
				weapon_mass: "1",
				weapon_power: "5",
				weapon_qualities: `${translate("AP")} 20`,
			},
			nuclear_missiles: {
				weapon_ammo: "5",
				class: "FRIGATE",
				weapon_damage: "",
				weapon_hardpoints: "2",
				weapon_mass: "1",
				weapon_power: "5",
				weapon_qualities: "",
			},
			plasma_beam: {
				class: "FRIGATE",
				weapon_damage: "3d6",
				weapon_hardpoints: "2",
				weapon_mass: "2",
				weapon_power: "5",
				weapon_qualities: `${translate("AP")} 10`,
			},
			polyspectral_mes_beam: {
				class: "FIGHTER",
				weapon_damage: "2d4",
				weapon_hardpoints: "1",
				weapon_mass: "1",
				weapon_power: "5",
				weapon_qualities: `${translate("AP")} 25`,
			},
			reaper_battery: {
				class: "FIGHTER",
				weapon_damage: "3d4",
				weapon_hardpoints: "1",
				weapon_mass: "1",
				weapon_power: "4",
				weapon_qualities: translate("CLUMSY"),
			},
			sandthrower: {
				class: "FIGHTER",
				weapon_damage: "2d4",
				weapon_hardpoints: "1",
				weapon_mass: "1",
				weapon_power: "3",
				weapon_qualities: translate("FLAK"),
			},
			singularity_gun: {
				class: "CAPITAL",
				weapon_damage: "5d20",
				weapon_hardpoints: "5",
				weapon_mass: "10",
				weapon_power: "25",
				weapon_qualities: `${translate("AP")} 25`,
			},
			smart_cloud: {
				class: "CRUISER",
				weapon_damage: "3d10",
				weapon_hardpoints: "2",
				weapon_mass: "5",
				weapon_power: "10",
				weapon_qualities: `${translate("CLOUD")}, ${translate("CLUMSY")}`,
			},
			spike_inversion_projector: {
				class: "CRUISER",
				weapon_damage: "3d8",
				weapon_hardpoints: "3",
				weapon_mass: "3",
				weapon_power: "10",
				weapon_qualities: `${translate("AP")} 15`,
			},
			spinal_beam_cannon: {
				class: "CRUISER",
				weapon_damage: "3d10",
				weapon_hardpoints: "3",
				weapon_mass: "5",
				weapon_power: "10",
				weapon_qualities: `${translate("AP")} 15, ${translate("CLUMSY")}`,
			},
			torpedo_launcher: {
				weapon_ammo: "4",
				class: "FRIGATE",
				weapon_damage: "3d8",
				weapon_hardpoints: "1",
				weapon_mass: "3",
				weapon_power: "10",
				weapon_qualities: `${translate("AP")} 20`,
			},
			vortex_tunnel_inductor: {
				class: "CAPITAL",
				weapon_damage: "3d20",
				weapon_hardpoints: "4",
				weapon_mass: "10",
				weapon_power: "20",
				weapon_qualities: `${translate("AP")} 20, ${translate("CLUMSY")}`,
			},
		},
		"techniques": {
			accelerated_succor: {
				level: "3",
				technique_discipline: translate("BIOPSIONICS"),
			},
			alternate_outcome: {
				level: "2",
				technique_discipline: translate("PRECOGNITION"),
			},
			anguished_vision: {
				level: "3",
				technique_discipline: translate("PRECOGNITION"),
			},
			burdened_apportation: {
				level: "2",
				technique_discipline: translate("TELEPORTATION"),
			},
			cloak_powers: {
				level: "1",
				technique_discipline: translate("METAPSIONICS"),
			},
			concert_of_minds: {
				level: "3",
				technique_discipline: translate("METAPSIONICS"),
			},
			cursed_luck: {
				level: "3",
				technique_discipline: translate("PRECOGNITION"),
			},
			deep_intrusion: {
				level: "4",
				technique_discipline: translate("TELEPORTATION"),
			},
			destinys_shield: {
				level: "2",
				technique_discipline: translate("PRECOGNITION"),
			},
			effortless_apportation: {
				level: "3",
				technique_discipline: translate("TELEPORTATION"),
			},
			facile_mind: {
				level: "1",
				technique_discipline: translate("TELEPATHY"),
			},
			far_thought: {
				level: "2",
				technique_discipline: translate("TELEPATHY"),
			},
			flawless_mastery: {
				level: "4",
				technique_discipline: translate("METAPSIONICS"),
			},
			force_puppetry: {
				level: "4",
				technique_discipline: translate("TELEKINESIS"),
			},
			forced_outcome: {
				level: "3",
				technique_discipline: translate("PRECOGNITION"),
			},
			holistic_optimization_patterning: {
				level: "4",
				technique_discipline: translate("BIOPSIONICS"),
			},
			impact_sump: {
				level: "2",
				technique_discipline: translate("TELEKINESIS"),
			},
			impervious_pavis_of_will: {
				level: "4",
				technique_discipline: translate("METAPSIONICS"),
			},
			intuitive_response: {
				level: "1",
				technique_discipline: translate("PRECOGNITION"),
			},
			invincible_stand: {
				level: "2",
				technique_discipline: translate("BIOPSIONICS"),
			},
			kinetic_transversal: {
				level: "1",
				technique_discipline: translate("TELEKINESIS"),
			},
			major_organ_restoration: {
				level: "2",
				technique_discipline: translate("BIOPSIONICS"),
			},
			mastered_succor: {
				level: "1",
				technique_discipline: translate("BIOPSIONICS"),
			},
			memory_editing: {
				level: "4",
				technique_discipline: translate("TELEPATHY"),
			},
			metadimensional_friction: {
				level: "3",
				technique_discipline: translate("METAPSIONICS"),
			},
			metamorph: {
				level: "3",
				technique_discipline: translate("BIOPSIONICS"),
			},
			mindtracing: {
				level: "1",
				technique_discipline: translate("METAPSIONICS"),
			},
			neural_trap: {
				level: "2",
				technique_discipline: translate("METAPSIONICS"),
			},
			not_my_time: {
				level: "4",
				technique_discipline: translate("PRECOGNITION"),
			},
			offensive_apportation: {
				level: "4",
				technique_discipline: translate("TELEPORTATION"),
			},
			oracle: {
				level: "0",
				technique_discipline: translate("PRECOGNITION"),
			},
			organic_purification_protocols: {
				level: "1",
				technique_discipline: translate("BIOPSIONICS"),
			},
			perceptive_dislocation: {
				level: "2",
				technique_discipline: translate("TELEPORTATION"),
			},
			personal_apportation: {
				level: "0",
				technique_discipline: translate("TELEPORTATION"),
			},
			pressure_field: {
				level: "1",
				technique_discipline: translate("TELEKINESIS"),
			},
			proficient_apportation: {
				level: "1",
				technique_discipline: translate("TELEPORTATION"),
			},
			prophecy: {
				level: "4",
				technique_discipline: translate("PRECOGNITION"),
			},
			psychic_refinement: {
				level: "0",
				technique_discipline: translate("METAPSIONICS"),
			},
			psychic_static: {
				level: "2",
				technique_discipline: translate("METAPSIONICS"),
			},
			psychic_succor: {
				level: "0",
				technique_discipline: translate("BIOPSIONICS"),
			},
			psychic_tutelage: {
				level: "3",
				technique_discipline: translate("METAPSIONICS"),
			},
			quintessential_reconstruction: {
				level: "4",
				technique_discipline: translate("BIOPSIONICS"),
			},
			reactive_telekinesis: {
				level: "3",
				technique_discipline: translate("TELEKINESIS"),
			},
			reflex_response: {
				level: "3",
				technique_discipline: translate("TELEPATHY"),
			},
			remote_repair: {
				level: "1",
				technique_discipline: translate("BIOPSIONICS"),
			},
			rift_reduplication: {
				level: "3",
				technique_discipline: translate("TELEPORTATION"),
			},
			sense_the_need: {
				level: "1",
				technique_discipline: translate("PRECOGNITION"),
			},
			slip_field: {
				level: "2",
				technique_discipline: translate("TELEKINESIS"),
			},
			spatial_awareness: {
				level: "1",
				technique_discipline: translate("TELEPORTATION"),
			},
			spatial_synchrony_mandala: {
				level: "2",
				technique_discipline: translate("TELEPORTATION"),
			},
			stutterjump: {
				level: "3",
				technique_discipline: translate("TELEPORTATION"),
			},
			suppress_cognition: {
				level: "2",
				technique_discipline: translate("TELEPATHY"),
			},
			surge_momentum: {
				level: "3",
				technique_discipline: translate("METAPSIONICS"),
			},
			suspended_manifestation: {
				level: "2",
				technique_discipline: translate("METAPSIONICS"),
			},
			synthetic_adaptation: {
				level: "1",
				technique_discipline: translate("METAPSIONICS"),
			},
			tangible_force_construct: {
				level: "3",
				technique_discipline: translate("TELEKINESIS"),
			},
			telekinetic_armory: {
				level: "1",
				technique_discipline: translate("TELEKINESIS"),
			},
			telekinetic_expertise: {
				level: "2",
				technique_discipline: translate("TELEKINESIS"),
			},
			telekinetic_flight: {
				level: "4",
				technique_discipline: translate("TELEKINESIS"),
			},
			telekinetic_manipulation: {
				level: "0",
				technique_discipline: translate("TELEKINESIS"),
			},
			telekinetic_ram: {
				level: "3",
				technique_discipline: translate("TELEKINESIS"),
			},
			telepathic_assault: {
				level: "3",
				technique_discipline: translate("TELEPATHY"),
			},
			telepathic_contact: {
				level: "0",
				technique_discipline: translate("TELEPATHY"),
			},
			teratic_overload: {
				level: "3",
				technique_discipline: translate("BIOPSIONICS"),
			},
			terminal_reflection: {
				level: "1",
				technique_discipline: translate("PRECOGNITION"),
			},
			thermokinesis: {
				level: "2",
				technique_discipline: translate("TELEKINESIS"),
			},
			tissue_integrity_field: {
				level: "2",
				technique_discipline: translate("BIOPSIONICS"),
			},
			transmit_thought: {
				level: "1",
				technique_discipline: translate("TELEPATHY"),
			},
			unity_of_thought: {
				level: "4",
				technique_discipline: translate("TELEPATHY"),
			},
		},
		"weapons": {
			advanced_bow: {
				weapon_ammo: "1",
				weapon_damage: "1d6",
				weapon_encumbrance: "2",
				weapon_range: "100/150",
			},
			anti_vehicle_laser: {
				weapon_ammo: "15",
				weapon_damage: "3d10",
				weapon_range: "2000/4000",
			},
			combat_rifle: {
				weapon_ammo: "30",
				weapon_burst: true,
				weapon_damage: "1d12",
				weapon_encumbrance: "2",
				weapon_range: "100/300",
			},
			combat_shotgun: {
				weapon_ammo: "12",
				weapon_burst: true,
				weapon_damage: "3d4",
				weapon_encumbrance: "2",
				weapon_range: "10/30",
			},
			conversion_bow: {
				weapon_ammo: "1",
				weapon_damage: "1d8",
				weapon_encumbrance: "2",
				weapon_range: "150/300",
			},
			crude_pistol: {
				weapon_ammo: "1",
				weapon_damage: "1d6",
				weapon_encumbrance: "1",
				weapon_range: "5/15",
			},
			demo_charge: {
				weapon_damage: "3d10",
				weapon_encumbrance: "1",
				weapon_range: "20/40",
			},
			distortion_cannon: {
				weapon_attack: "1",
				weapon_ammo: "6",
				weapon_damage: "2d12",
				weapon_encumbrance: "2",
				weapon_range: "100/300",
			},
			grenade: {
				weapon_damage: "2d6",
				weapon_encumbrance: "1",
				weapon_range: "10/30",
			},
			heavy_machine_gun: {
				weapon_ammo: "10",
				weapon_damage: "3d6",
				weapon_encumbrance: "3",
				weapon_range: "500/2000",
			},
			hydra_array: {
				weapon_ammo: "10",
				weapon_damage: "3d6",
				weapon_range: "4000/8000",
			},
			large_advanced_weapon: {
				weapon_attribute_mod: "@{strength_mod}",
				weapon_damage: "1d10+1",
				weapon_encumbrance: "2",
				weapon_shock_ac: "15",
				weapon_shock_damage: "2",
				weapon_skill_bonus: "@{skill_stab}",
			},
			large_primitive_weapon: {
				weapon_attribute_mod: "@{strength_mod}",
				weapon_damage: "1d8+1",
				weapon_encumbrance: "2",
				weapon_shock_ac: "15",
				weapon_shock_damage: "2",
				weapon_skill_bonus: "@{skill_stab}",
			},
			laser_pistol: {
				weapon_attack: "1",
				weapon_ammo: "10",
				weapon_damage: "1d6",
				weapon_encumbrance: "1",
				weapon_range: "100/300",
			},
			laser_rifle: {
				weapon_attack: "1",
				weapon_ammo: "20",
				weapon_burst: true,
				weapon_damage: "1d10",
				weapon_encumbrance: "2",
				weapon_range: "300/500",
			},
			mag_pistol: {
				weapon_ammo: "6",
				weapon_damage: "2d6+2",
				weapon_encumbrance: "1",
				weapon_range: "100/300",
			},
			mag_rifle: {
				weapon_ammo: "10",
				weapon_damage: "2d8+2",
				weapon_encumbrance: "2",
				weapon_range: "300/600",
			},
			medium_advanced_weapon: {
				weapon_attribute_mod: "@{str_dex_mod}",
				weapon_damage: "1d8+1",
				weapon_encumbrance: "1",
				weapon_shock_ac: "13",
				weapon_shock_damage: "2",
				weapon_skill_bonus: "@{skill_stab}",
			},
			medium_primitive_weapon: {
				weapon_attribute_mod: "@{str_dex_mod}",
				weapon_damage: "1d6+1",
				weapon_encumbrance: "1",
				weapon_shock_ac: "13",
				weapon_shock_damage: "2",
				weapon_skill_bonus: "@{skill_stab}",
			},
			musket: {
				weapon_ammo: "1",
				weapon_damage: "1d12",
				weapon_encumbrance: "2",
				weapon_range: "25/50",
			},
			plasma_projector: {
				weapon_attack: "1",
				weapon_ammo: "6",
				weapon_damage: "2d8",
				weapon_encumbrance: "2",
				weapon_range: "50/100",
			},
			primitive_bow: {
				weapon_ammo: "1",
				weapon_damage: "1d6",
				weapon_encumbrance: "2",
				weapon_range: "50/75",
			},
			punch: {
				weapon_attribute_mod: "@{str_dex_mod}",
				weapon_damage: "1d2",
				weapon_skill_bonus: "@{skill_punch}",
			},
			railgun: {
				weapon_ammo: "20",
				weapon_damage: "3d8",
				weapon_range: "4000/8000",
			},
			revolver: {
				weapon_ammo: "6",
				weapon_damage: "1d8",
				weapon_encumbrance: "1",
				weapon_range: "30/100",
			},
			rifle: {
				weapon_ammo: "6",
				weapon_damage: "1d10+2",
				weapon_encumbrance: "2",
				weapon_range: "200/400",
			},
			rocket_launcher: {
				weapon_ammo: "1",
				weapon_damage: "3d10",
				weapon_encumbrance: "2",
				weapon_range: "2000/4000",
			},
			semi_auto_pistol: {
				weapon_ammo: "12",
				weapon_damage: "1d6+1",
				weapon_encumbrance: "1",
				weapon_range: "30/100",
			},
			shear_rifle: {
				weapon_attack: "1",
				weapon_ammo: "10",
				weapon_burst: true,
				weapon_damage: "2d8",
				weapon_encumbrance: "2",
				weapon_range: "100/300",
			},
			shotgun: {
				weapon_ammo: "2",
				weapon_damage: "3d4",
				weapon_encumbrance: "2",
				weapon_range: "10/30",
			},
			small_advanced_weapon: {
				weapon_attribute_mod: "@{str_dex_mod}",
				weapon_damage: "1d6",
				weapon_encumbrance: "1",
				weapon_shock_ac: "15",
				weapon_shock_damage: "1",
				weapon_skill_bonus: "@{skill_stab}",
			},
			small_primitive_weapon: {
				weapon_attribute_mod: "@{str_dex_mod}",
				weapon_damage: "1d4",
				weapon_encumbrance: "1",
				weapon_shock_ac: "15",
				weapon_shock_damage: "1",
				weapon_skill_bonus: "@{skill_stab}",
			},
			sniper_rifle: {
				weapon_ammo: "1",
				weapon_damage: "2d8",
				weapon_encumbrance: "2",
				weapon_range: "1000/2000",
			},
			spike_thrower: {
				weapon_ammo: "15",
				weapon_burst: true,
				weapon_damage: "3d8",
				weapon_encumbrance: "2",
				weapon_range: "20/40",
			},
			stun_baton: {
				weapon_attribute_mod: "@{str_dex_mod}",
				weapon_damage: "1d8",
				weapon_encumbrance: "1",
				weapon_shock_ac: "15",
				weapon_shock_damage: "1",
				weapon_skill_bonus: "@{skill_stab}",
			},
			submachine_gun: {
				weapon_ammo: "20",
				weapon_burst: true,
				weapon_damage: "1d8",
				weapon_encumbrance: "1",
				weapon_range: "30/100",
			},
			suit_ripper: {
				weapon_attribute_mod: "@{str_dex_mod}",
				weapon_damage: "1d6",
				weapon_encumbrance: "1",
				weapon_skill_bonus: "@{skill_stab}",
			},
			thermal_pistol: {
				weapon_attack: "1",
				weapon_ammo: "5",
				weapon_damage: "2d6",
				weapon_encumbrance: "1",
				weapon_range: "25/50",
			},
			thunder_gun: {
				weapon_attack: "1",
				weapon_ammo: "6",
				weapon_damage: "2d10",
				weapon_encumbrance: "2",
				weapon_range: "100/300",
			},
			void_carbine: {
				weapon_ammo: "10",
				weapon_damage: "2d6",
				weapon_encumbrance: "2",
				weapon_range: "100/300",
			},
			vortex_cannon: {
				weapon_ammo: "5",
				weapon_damage: "5d12",
				weapon_range: "1000/2000",
			},
			wheatcutter_belt: {
				weapon_ammo: "5",
				weapon_damage: "2d12",
				weapon_range: "10/20",
			},
		},
	};

	/* Utility functions */
	const sign = (value) => {
		const val = parseInt(value) || 0;
		if (val >= 0) return `+${val}`;
		else return `${val}`;
	};
	const sum = (list) => list.reduce((m, c) => m + (parseInt(c) || 0), 0);
	const buildLink = (caption, ability, last) => `[${caption}${!last ? "," : ""}](~${ability})`;
	const mySetAttrs = (setting, values, ...rest) => {
		// This is a version of setAttrs that expects an extra values parameter
		// (as received from getAttrs). It will only set values in setting that differ
		// from their current value on the sheet. The intention is to not
		// set values unnecessarily (it's expensive) and to reduce bloat
		// in the Attributes & Abilities tab.
		Object.keys(setting).forEach(k => {
			if (`${values[k]}` === `${setting[k]}`) delete setting[k];
		});
		setAttrs(setting, ...rest);
	};
	const fillRepeatingSectionFromData = (sName, data, callback) => {
		// Populates the repeating section repeating_${SName} with new
		// rows from the data array. Every entry of the array is expected
		// to be an object, and its key/value pairs will be written into
		// the repeating section as a new row. If data is not an array
		// but a single object, it will be treated like an array with
		// a single element.
		callback = callback || (() => {});
		const createdIDs = [],
			getRowID = () => {
				while (true) {
					let newID = generateRowID();
					if (!createdIDs.includes(newID)) {
						createdIDs.push(newID);
						return newID;
					}
				}
			};
		const setting = (Array.isArray(data) ? data : [data]).map(o => {
			const newID = getRowID();
			return Object.entries(o).reduce((m, [key, value]) => {
				m[`repeating_${sName}_${newID}_${key}`] = `${value}`;
				return m;
			}, {});
		}).reduce((m, o) => Object.assign(m, o), {});
		setAttrs(setting, {}, callback);
	};

	/* Calculations */
	const calculateSaves = () => {
		getAttrs([...attributes.map(attr => `${attr}_mod`), "level",
			"homebrew_luck_save", "save_physical", "save_mental", "save_evasion", "save_luck"
		], v => {
			const base = 16 - (parseInt(v.level) || 1);
			const setting = {
				save_physical: base - (Math.max(parseInt(v.strength_mod), parseInt(v.constitution_mod)) || 0),
				save_mental: base - (Math.max(parseInt(v.charisma_mod), parseInt(v.wisdom_mod)) || 0),
				save_evasion: base - (Math.max(parseInt(v.intelligence_mod), parseInt(v.dexterity_mod)) || 0)
			};
			if (v.homebrew_luck_save === "1") setting.save_luck = base;
			mySetAttrs(setting, v);
		});
	};

	const calculateEffort = () => {
		getSectionIDs("repeating_psychic-skills", idArray => {
			getAttrs([...effortAttributes,
				"psionics_total_effort",
				...idArray.map(id => `repeating_psychic-skills_${id}_skill`)], v => {
				const attrBonus = Math.max(parseInt(v.wisdom_mod), parseInt(v.constitution_mod)) || 0,
					skillBonus = Math.max(
						...skills.psionic.map(x => parseInt(v[`skill_${x}`]) || 0),
						...idArray.map(id => parseInt(v[`repeating_psychic-skills_${id}_skill`]) || 0)
					);
				const psionics_total_effort = Math.max(1 + attrBonus + skillBonus, 1) + parseInt(v.psionics_extra_effort) -
					parseInt(v.psionics_committed_effort_current) - parseInt(v.psionics_committed_effort_scene) -
					parseInt(v.psionics_committed_effort_day);
				mySetAttrs({
					psionics_total_effort
				}, v);
			});
		});
	};

	const calculateMagicEffort = () => {
		getAttrs(["magic_total_effort", "magic_committed_effort_current", "magic_committed_effort_scene", "magic_committed_effort_day", "magic_uncommitted_effort"], function(v) {
			const magic_uncommitted_effort = parseInt(v.magic_total_effort) - (parseInt(v.magic_committed_effort_current) + parseInt(v.magic_committed_effort_scene) + parseInt(v.magic_committed_effort_day));
			mySetAttrs({
				magic_uncommitted_effort
			}, v);
		});
	};

	const calculateAC = () => {
		getSectionIDs("repeating_armor", idArray => {
			const sourceAttrs = [
				...idArray.map(id => `repeating_armor_${id}_armor_ac`),
				...idArray.map(id => `repeating_armor_${id}_armor_active`),
				...idArray.map(id => `repeating_armor_${id}_armor_type`),
				"npc", "AC", "innate_ac", "dexterity_mod",
			];
			getAttrs(sourceAttrs, v => {
				if (v.npc == "1") return;
				const baseAC = Math.max(
					parseInt(v.innate_ac) || 0,
					...idArray.filter(id => v[`repeating_armor_${id}_armor_active`] === "1")
						.filter(id => v[`repeating_armor_${id}_armor_type`] !== "SHIELD")
						.map(id => parseInt(v[`repeating_armor_${id}_armor_ac`]) || 0)
				);
				const shieldAC = Math.max(
					0,
					...idArray.filter(id => v[`repeating_armor_${id}_armor_active`] === "1")
						.filter(id => v[`repeating_armor_${id}_armor_type`] === "SHIELD")
						.map(id => parseInt(v[`repeating_armor_${id}_armor_ac`]) || 0)
				);
				const AC = (shieldAC > 0 ? shieldAC <= baseAC ? (baseAC + 1) : shieldAC : baseAC) +
					(parseInt(v.dexterity_mod) || 0);

				mySetAttrs({
					AC
				}, v);
			});
		});
	};

	const calculateMaxStrain = () => {
		getAttrs(["constitution", "strain_max"], v => {
			mySetAttrs({
				strain_max: v.constitution
			}, v);
		});
	};

	const calculatePermanentStrain = () => {
		getAttrs(["cyberware_strain_total", "strain_permanent_extra", "strain_permanent"], v => {
			const permStrain = parseInt(v.cyberware_strain_total) + parseInt(v.strain_permanent_extra);
			mySetAttrs({
				strain_permanent: permStrain
			}, v);
		});
	};

	const calculateCyberwareStrain = () => {
		//Loop through the cyberware and add up the strain.
		getSectionIDs("repeating_cyberware", idArray => {
			const sourceAttrs = [
				...idArray.map(id => `repeating_cyberware${id}_cyberware_strain`),
				"cyberware_strain_total"
			];
			getAttrs(sourceAttrs, v => {
				const cyberwareStrain = Math.max(
					...idArray.map(id => parseInt(v[`repeating_cyberware${id}_cyberware_strain`]) || 0)
				);
				mySetAttrs({
					cyberware_strain_total: cyberwareStrain
				}, v);
			});
		});
	};

	const calculateMod = (attr) => {
		getAttrs([attr, `${attr}_bonus`, `${attr}_mod`], v => {
			const mod = (value => {
				if (value >= 18) return 2;
				else if (value >= 14) return 1;
				else if (value >= 8) return 0;
				else if (value >= 4) return -1;
				else return -2;
			})(parseInt(v[attr]) || 10);

			const setting = {
				[`${attr}_mod`]: `${mod + (parseInt(v[`${attr}_bonus`]) || 0)}`
			};

			mySetAttrs(setting, v, null, () => {
				calculateSaves();
				generateWeaponDisplay();
				calculateStrDexMod();
				if (attr === "dexterity") calculateAC();
			});
		});
	};
	const calculateStrDexMod = () => {
		getAttrs(["str_dex_mod", "strength_mod", "dexterity_mod"], v => {
			const str_dex_mod = Math.max(parseInt(v.strength_mod), parseInt(v.dexterity_mod));
			mySetAttrs({
				str_dex_mod
			}, v);
		});
	};

	const calculateNextLevelXP = () => {
		var xp = [0, 3, 6, 12, 18, 27, 39, 54, 72, 93];
		getAttrs(["level", "setting_xp_scheme"], v => {
			if (v.setting_xp_scheme === "xp") {
				if (v.level < 10) {
					setAttrs({
						xp_next: xp[v.level]
					});
				} else {
					setAttrs({
						xp_next: 93 + ((v.level - 9) * 24)
					});
				}
			} else if (v.setting_xp_scheme === "money") {
				setAttrs({
					xp_next: 2500 * (2 * v.level)
				});
			}
		});
	};

	const calculateGearReadiedStowed = () => {
		const doCalc = (gearIDs, weaponIDs, armorIDs) => {
			const attrs = [
				...gearIDs.map(id => `repeating_gear_${id}_gear_amount`),
				...gearIDs.map(id => `repeating_gear_${id}_gear_encumbrance`),
				...gearIDs.map(id => `repeating_gear_${id}_gear_status`),
				...armorIDs.map(id => `repeating_armor_${id}_armor_encumbrance`),
				...armorIDs.map(id => `repeating_armor_${id}_armor_encumbrance_bonus`),
				...armorIDs.map(id => `repeating_armor_${id}_armor_status`),
				...weaponIDs.map(id => `repeating_weapons_${id}_weapon_encumbrance`),
				...weaponIDs.map(id => `repeating_weapons_${id}_weapon_status`),
				"gear_readied", "gear_stowed", "strength", "gear_readied_max",
				"gear_readied_over", "gear_stowed_over", "gear_stowed_max"
			];
			getAttrs(attrs, v => {
				const [gear_readied, gear_stowed] = armorIDs.reduce((m, id) => {
					if (v[`repeating_armor_${id}_armor_status`] === "READIED") {
						m[0] += parseInt(v[`repeating_armor_${id}_armor_encumbrance`]) || 0;
					} else if (v[`repeating_armor_${id}_armor_status`] === "STOWED")
						m[1] += parseInt(v[`repeating_armor_${id}_armor_encumbrance`]) || 0;
					return m;
				}, weaponIDs.reduce((m, id) => {
					if (v[`repeating_weapons_${id}_weapon_status`] === "READIED")
						m[0] += parseInt(v[`repeating_weapons_${id}_weapon_encumbrance`]) || 0;
					else if (v[`repeating_weapons_${id}_weapon_status`] === "STOWED")
						m[1] += parseInt(v[`repeating_weapons_${id}_weapon_encumbrance`]) || 0;
					return m;
				}, gearIDs.reduce((m, id) => {
					const amount = parseInt(v[`repeating_gear_${id}_gear_amount`]) || 0;
					if (v[`repeating_gear_${id}_gear_status`] === "READIED")
						m[0] += Math.ceil(amount * parseFloat(v[`repeating_gear_${id}_gear_encumbrance`])) || 0;
					else if (v[`repeating_gear_${id}_gear_status`] === "STOWED")
						m[1] += Math.ceil(amount * parseFloat(v[`repeating_gear_${id}_gear_encumbrance`])) || 0;
					return m;
				}, [0, 0])));

				const armor_encumbrance_bonus = Math.max(0,
					...armorIDs.filter(id => v[`repeating_armor_${id}_armor_status`] === "READIED")
						.map(id => parseInt(v[`repeating_armor_${id}_armor_encumbrance_bonus`]) || 0)
				);
				const gear_stowed_max = (parseInt(v.strength) || 0) + armor_encumbrance_bonus;
				const gear_readied_max = Math.floor(gear_stowed_max / 2);
				const setting = {
					gear_readied,
					gear_stowed,
					gear_readied_max,
					gear_stowed_max,
					gear_readied_over: (parseInt(v.gear_readied) > gear_readied_max) ? "1" : "0",
					gear_stowed_over: (parseInt(v.gear_stowed) > gear_stowed_max) ? "1" : "0",
				};

				mySetAttrs(setting, v, {
					silent: true
				});
			});
		};

		getSectionIDs("repeating_gear", gearIDs => {
			getSectionIDs("repeating_weapons", weaponIDs => {
				getSectionIDs("repeating_armor", armorIDs => doCalc(gearIDs, weaponIDs, armorIDs));
			});
		});
	};

	const generateWeaponDisplay = () => {
		// Generates the weapon menu and sets the display of weapons
		// in display mode in one go.
		getSectionIDs("repeating_weapons", idArray => {
			const prefixes = idArray.map(id => `repeating_weapons_${id}`);
			const sourceAttrs = [
				...prefixes.map(prefix => `${prefix}_weapon_attack`),
				...prefixes.map(prefix => `${prefix}_weapon_name`),
				...prefixes.map(prefix => `${prefix}_weapon_skill_bonus`),
				...prefixes.map(prefix => `${prefix}_weapon_attribute_mod`),
				...prefixes.map(prefix => `${prefix}_weapon_damage`),
				...prefixes.map(prefix => `${prefix}_weapon_shock`),
				...prefixes.map(prefix => `${prefix}_weapon_shock_damage`),
				...prefixes.map(prefix => `${prefix}_weapon_shock_ac`),
				...prefixes.map(prefix => `${prefix}_weapon_skill_to_damage`),
				...prefixes.map(prefix => `${prefix}_weapon_attack_display`),
				...prefixes.map(prefix => `${prefix}_weapon_damage_display`),
				...attributes.map(attr => `${attr}_mod`),
				...weaponSkills,
				"attack_bonus",
				"str_dex_mod",
				"macro_weapons"
			];
			getAttrs(sourceAttrs, v => {
				const setting = {};
				const baseAttackBonus = parseInt(v.attack_bonus) || 0;
				prefixes.forEach(prefix => {
					const attrBonus = parseInt(v[(v[`${prefix}_weapon_attribute_mod`] || "").slice(2, -1)]) || 0;
					const skillBonus = parseInt(v[(v[`${prefix}_weapon_skill_bonus`] || "").slice(2, -1)]) ||
						parseInt(v[`${prefix}_weapon_skill_bonus`]) || 0;
					const damageBonus = attrBonus +
						((v[`${prefix}_weapon_skill_to_damage`] === "@{weapon_skill_bonus}") ? skillBonus : 0);
					const weaponDamage = (v[`${prefix}_weapon_damage`] === "0") ? "" : v[`${prefix}_weapon_damage`];
					const shockString = (v[`${prefix}_weapon_shock`] !== "0") ? `, ${
						(parseInt(v[`${prefix}_weapon_shock_damage`])||0) + damageBonus
					}\xa0${translate("SHOCK").toLowerCase()}${
						v[`${prefix}_weapon_shock_ac`] ? ` ${translate("VS_AC_LEQ")} ${v[`${prefix}_weapon_shock_ac`]}` : ""
					}` : "";

					const attack = baseAttackBonus + (parseInt(v[`${prefix}_weapon_attack`]) || 0) +
						((skillBonus === -1) ? -2 : skillBonus) + attrBonus;
					const damage = weaponDamage + (weaponDamage ?
						((damageBonus === 0) ? "" : ((damageBonus > 0) ? ` + ${damageBonus}` : ` - ${-damageBonus}`)) :
						damageBonus);

					setting[`${prefix}_weapon_attack_display`] = (attack >= 0) ? `+${attack}` : attack;
					setting[`${prefix}_weapon_damage_display`] = `${damage || 0}\xa0${translate("DAMAGE").toLowerCase()}${shockString}`;
				});
				setting.macro_weapons = prefixes.map((prefix, index) => {
					const label = `${v[`${prefix}_weapon_name`]} (${setting[`${prefix}_weapon_attack_display`]})`;
					return buildLink(label, `${prefix}_attack`, index === prefixes.length - 1);
				}).join(" ");
				mySetAttrs(setting, v, {
					silent: true
				});
			});
		});
	};

	const handleAmmoAPI = (sName) => {
		const formula = (sName === "weapons") ? "[[-1 - @{weapon_burst}]]" : "-1";
		getSectionIDs(`repeating_${sName}`, idArray => {
			getAttrs([
				"setting_use_ammo",
				...idArray.map(id => `repeating_${sName}_${id}_weapon_use_ammo`),
				...idArray.map(id => `repeating_${sName}_${id}_weapon_api`)
			], v => {
				const setting = idArray.reduce((m, id) => {
					m[`repeating_${sName}_${id}_weapon_api`] =
						(v.setting_use_ammo === "1" && v[`repeating_${sName}_${id}_weapon_use_ammo`] !== "0") ?
							`\n!modattr --mute --charid @{character_id} --repeating_${sName}_${id}_weapon_ammo|${formula}` :
							"";
					return m;
				}, {});
				mySetAttrs(setting, v, {
					silent: true
				});
			});
		});
	};

	/**
	 * Validations
	 */
	const validateTab = () => {
		getAttrs(["tab", "npc"], v => {
			if (v.tab === "character" && v.npc === "1") setAttrs({
				tab: "npc"
			});
			if (v.tab === "npc" && v.npc === "0") setAttrs({
				tab: "character"
			});
		});
	};
	const validateSuperTab = () => {
		getAttrs(["setting_super_type", "tab_super"], v => {
			const setting = {};
			if (v.setting_super_type === "magic") setting.tab_super = "magic";
			if (v.setting_super_type === "psionics") setting.tab_super = "psionics";
			mySetAttrs(setting, v);
		});
	};
	const validateStrain = () => {
		getAttrs(["strain", "strain_permanent", "strain_max"], v => {
			const currentStrain = parseInt(v.strain) || 0,
				permanentStrain = parseInt(v.strain_permanent) || 0,
				strain = Math.min(parseInt(v.strain_max), Math.max(currentStrain, permanentStrain));

			if (strain !== currentStrain) setAttrs({
				strain
			});
		});
	};
	const validateWeaponSkills = (ids) => {
		// Makes sure that the select for the weapon skill is never in an invalid state.
		const prefixes = (ids && ids.map(id => `repeating_weapons_${id}`)) || ["repeating_weapons"];
		getAttrs(["homebrew_skill_list", ...prefixes.map(p => `${p}_weapon_skill_bonus`)], v => {
			const revisedList = ["@{skill_exert}", "@{skill_punch}", "@{skill_shoot}", "@{skill_stab}",
					"@{skill_telekinesis}", "0"
				],
				firstList = ["@{skill_combat_energy}", "@{skill_combat_gunnery}", "@{skill_combat_primitive}", "@{skill_combat_projectile}",
					"@{skill_combat_psitech}", "@{skill_combat_unarmed}", "@{skill_telekinesis}", "0"
				],
				type = v.homebrew_skill_list,
				setting = {};
			prefixes.forEach(prefix => {
				if (type === "revised" && !revisedList.includes(v[`${prefix}_weapon_skill_bonus`]))
					setting[`${prefix}_weapon_skill_bonus`] = "@{skill_shoot}";
				if (type === "first" && !firstList.includes(v[`${prefix}_weapon_skill_bonus`]))
					setting[`${prefix}_weapon_skill_bonus`] = "@{skill_combat_energy}";
			});
			setAttrs(setting);
		});
	};

	/* NPC */
	const fillNPC = () => {
		getAttrs(["npc_stat_block"], (v) => {
			if (v.npc_stat_block && autofillData.statblocks[v.npc_stat_block]) {
				const [
					HD, AC, npc_attack_bonus, damage, attacks, npc_move,
					npc_morale, npc_skills, npc_saves, armor_type
				] = autofillData.statblocks[v.npc_stat_block];

				const setting = {
					AC,
					npc_attack_bonus,
					npc_move,
					npc_morale,
					npc_skills,
					npc_saves
				};

				if (armor_type) setting.npc_armor_type = armor_type;
				if (HD.includes("hp")) setting.HP = HD.replace("hp", "");
				else setting.npc_hd = HD;

				setAttrs(setting);

				if (damage !== "Unarmed") {
					const newAttack = {
						attack_ab: npc_attack_bonus,
						attack_damage: damage,
						attack_name: translate("ATTACK"),
						attack_number: attacks
					};
					fillRepeatingSectionFromData("npc-attacks", newAttack);
				}
			}
		});
	};
	const addNPCAttackBonus = () => {
		getAttrs(["repeating_npc-attacks_attack_ab", "npc_attack_bonus"], v => {
			if (`${v["repeating_npc-attacks_attack_ab"]}` === "0") {
				setAttrs({
					["repeating_npc-attacks_attack_ab"]: v.npc_attack_bonus
				});
			}
		});
	};
	const setNPCMultiAttacks = () => {
		getSectionIDs("repeating_npc-attacks", idArray => {
			const sourceAttrs = [
				...idArray.map(id => `repeating_npc-attacks_${id}_attack_number`),
				"npc_roll_full_attack"
			];
			getAttrs(sourceAttrs, v => {
				const setting = idArray.reduce((m, id) => {
					if (v.npc_roll_full_attack === "1") {
						const num = parseInt(v[`repeating_npc-attacks_${id}_attack_number`]) || 1;
						const macro = [2, 3, 4, 5, 6, 7, 8].map(n => {
							if (n <= num)
								return `{{attack${n}=[[1d20 + @{attack_ab} @{attack_burst} @{modifier_query}]]}} ` +
									`{{damage${n}=[[@{attack_damage} @{attack_burst}]]}} `;
							else return "";
						}).join("");
						m[`repeating_npc-attacks_${id}_attack_extra_macro`] = macro;
					} else {
						m[`repeating_npc-attacks_${id}_attack_extra_macro`] = "";
					}
					return m;
				}, {});
				setAttrs(setting);
			});
		});
	};
	const handleNPCRollHide = () => {
		const types = ["hp", "initiative", "save", "skill", "morale", "reaction"];
		getAttrs(["npc_rolls_hidden", ...types.map(x => `npc_${x}_hidden`)], v => {
			const setting = types.reduce((m, n) => {
				m[`npc_${n}_hidden`] = v.npc_rolls_hidden;
				return m;
			}, {});
			mySetAttrs(setting, v);
		});
	};

	/* Menu builders */
	/* Helper functions for  producing skill chat menus */
	const skillToMacro = v => skill => {
		const namedSkills = [
			"culture_one", "culture_two", "culture_three",
			"culture_alien", "profession", "magic2"
		];
		if (namedSkills.includes(skill))
			return [`@{skill_${skill}_name} (${sign(v[`skill_${skill}`])})`, `skill_${skill}`];
		else
			return [`^{${skill.toUpperCase()}} (${sign(v[`skill_${skill}`])})`, `skill_${skill}`];
	};
	const idToSkillMacro = (v, sName) => id => {
		const prefix = `repeating_${sName}_${id}_skill`;
		return [`${v[`${prefix}_name`]} (${sign(v[prefix])})`, prefix];
	};
	const buildSkillMacro = ([name, command], index, allSkills) => {
		return buildLink(name, command, index + 1 === allSkills.length);
	};
	/* End helper functions */
	const buildSaveMenu = () => {
		getAttrs(["homebrew_luck_save", "macro_saves"], v => {
			const macro_saves = buildLink("^{PHYSICAL} (v@{save_physical})", ("save_physical")) + " " +
				buildLink("^{MENTAL} (v@{save_mental})", ("save_mental")) + " " +
				buildLink("^{EVASION} (v@{save_evasion})", ("save_evasion"), v.homebrew_luck_save !== "1") +
				((v.homebrew_luck_save === "1") ?
					(" " + buildLink("^{LUCK} (v@{save_luck})", ("save_luck"), true)) : "");
			mySetAttrs({
				macro_saves
			}, v);
		});
	};
	const buildSkillMenu = () => {
		getSectionIDs("repeating_skills", idArray => {
			const sourceAttrs = [
				...skills.revised.map(sk => `skill_${sk}`),
				...skills.first.map(sk => `skill_${sk}`),
				"homebrew_skill_list",
				"setting_show_untrained_skills",
				"macro_skills",
				...idArray.map(id => `repeating_skills_${id}_skill_name`),
				...idArray.map(id => `repeating_skills_${id}_skill`),
			];
			getAttrs(sourceAttrs, v => {
				const skillList = skills[v.homebrew_skill_list] || [];
				const hasSkills = skillList.filter(skill => v[`skill_${skill}`] !== "-1").length ||
					idArray.filter(id => v[`repeating_skills_${id}_skill`] !== "-1").length;

				const macro_skills = `${[
					...skillList.filter(skill => v[`skill_${skill}`] !== "-1").map(skillToMacro(v)),
					...idArray.filter(id => v[`repeating_skills_${id}_skill`] !== "-1").map(idToSkillMacro(v, "skills"))
				].map(buildSkillMacro).join(" ")}${v.setting_show_untrained_skills === "1" ? `${
					hasSkills ? "\n\n**^{UNTRAINED}**\n" : ""}${[
					...skillList.filter(skill => v[`skill_${skill}`] === "-1").map(skillToMacro(v)),
					...idArray.filter(id => v[`repeating_skills_${id}_skill`] === "-1").map(idToSkillMacro(v, "skills"))
				].map(buildSkillMacro).join(" ")}` : ""}`;
				mySetAttrs({
					macro_skills
				}, v);
			});
		});
	};
	const buildPsionicsMenu = () => {
		getSectionIDs("repeating_techniques", techniqueIDs => {
			getSectionIDs("repeating_psychic-skills", skillIDs => {
				const sourceAttrs = [
					...skills.psionic.map(sk => `skill_${sk}`),
					"setting_super_type",
					"macro_psionics",
					...skillIDs.map(id => `repeating_psychic-skills_${id}_skill_name`),
					...skillIDs.map(id => `repeating_psychic-skills_${id}_skill`),
					...techniqueIDs.map(id => `repeating_techniques_${id}_technique_name`),
				];
				getAttrs(sourceAttrs, v => {
					if (v.setting_super_type == "magic" || v.setting_super_type == "neither") return;
					const macro_psionics = `${[
						...skills.psionic.filter(skill => v[`skill_${skill}`] !== "-1").map(skillToMacro(v)),
						...skillIDs.filter(id => v[`repeating_psychic-skills_${id}_skill`] !== "-1")
							.map(idToSkillMacro(v, "psychic-skills"))
					].map(buildSkillMacro).join(" ")}${(techniqueIDs.length ? "\n\n" : "")}${
						techniqueIDs.map((id, index, allIDs) => buildLink(v[`repeating_techniques_${id}_technique_name`],
							`repeating_techniques_${id}_technique`, index + 1 === allIDs.length)).join(" ")}`;
					mySetAttrs({
						macro_psionics
					}, v);
				});
			});
		});
	};
	const buildMagicMenu = () => {
		getSectionIDs("repeating_spells", spellIDs => {
			getSectionIDs("repeating_magic-skills", skillIDs => {
				const sourceAttrs = [
					"skill_magic", "skill_magic2", "skill_magic2_name",
					"setting_super_type", "macro_magic",
					...skillIDs.map(id => `repeating_magic-skills_${id}_skill_name`),
					...skillIDs.map(id => `repeating_magic-skills_${id}_skill`),
					...spellIDs.map(id => `repeating_spells_${id}_spell_name`),
				];
				getAttrs(sourceAttrs, v => {
					if (v.setting_super_type == "psionics" || v.setting_super_type == "neither") return;
					const macro_magic = `${[
						...(v.skill_magic2_name ? ["magic", "magic2"] : ["magic"]).map(skillToMacro(v)),
						...skillIDs.map(idToSkillMacro(v, "magic-skills"))
					].map(buildSkillMacro).join(" ")}${spellIDs.length ? "\n\n" : ""}${
						spellIDs.map(id => buildLink(v[`repeating_spells_${id}_spell_name`], `repeating_spells_${id}_spell`))
							.join(" ")}`;
					mySetAttrs({
						macro_magic
					}, v);
				});
			});
		});
	};
	const buildShipWeaponsMenu = () => {
		getSectionIDs("repeating_ship-weapons", idArray => {
			const sourceAttrs = [
				...idArray.map(id => `repeating_ship-weapons_${id}_weapon_name`),
				...idArray.map(id => `repeating_ship-weapons_${id}_weapon_attack_bonus`),
				"macro_ship_weapons"
			];
			getAttrs(sourceAttrs, v => {
				const macro_ship_weapons = idArray.map((id, index) => {
					const title = v[`repeating_ship-weapons_${id}_weapon_name`] +
						` ${sign(v[`repeating_ship-weapons_${id}_weapon_attack_bonus`])}`;
					return buildLink(title, `repeating_ship-weapons_${id}_attack`, index + 1 === idArray.length);
				}).join(" ");
				mySetAttrs({
					macro_ship_weapons
				}, v);
			});
		});
	};
	const buildAttacksMenu = () => {
		getSectionIDs("repeating_npc-attacks", idArray => {
			const sourceAttrs = [
				...idArray.map(id => `repeating_npc-attacks_${id}_attack_name`),
				...idArray.map(id => `repeating_npc-attacks_${id}_attack_ab`),
				...idArray.map(id => `repeating_npc-attacks_${id}_attack_number`),
				"macro_npc_attacks"
			];
			getAttrs(sourceAttrs, v => {
				const macro_npc_attacks = idArray.map((id, index) => {
					const title = v[`repeating_npc-attacks_${id}_attack_name`] +
						` ${sign(v[`repeating_npc-attacks_${id}_attack_ab`])}` +
						((v[`repeating_npc-attacks_${id}_attack_number`] != "1") ?
							` (${v[`repeating_npc-attacks_${id}_attack_number`]} attacks)` : "");
					return buildLink(title, `repeating_npc-attacks_${id}_attack`, index + 1 === idArray.length);
				}).join(" ");
				mySetAttrs({
					macro_npc_attacks
				}, v);
			});
		});
	};
	const buildAbilitiesMenu = () => {
		getSectionIDs("repeating_npc-abilities", idArray => {
			const sourceAttrs = [
				...idArray.map(id => `repeating_npc-abilities_${id}_ability_name`),
				"macro_npc_abilities"
			];
			getAttrs(sourceAttrs, v => {
				const macro_npc_abilities = idArray.map((id, index) => {
					return buildLink(v[`repeating_npc-abilities_${id}_ability_name`],
						`repeating_npc-abilities_${id}_ability`, index + 1 === idArray.length);
				}).join(" ");
				mySetAttrs({
					macro_npc_abilities
				}, v);
			});
		});
	};
	const buildStatblock = () => {
		const sourceAttrs = [
			"npc",
			"macro_npc_abilities",
			"macro_npc_attacks",
			"macro_statblock",
		];
		getAttrs(sourceAttrs, v => {
			if (v.npc !== "1") return;
			const macroList = [
				"[**^{SAVES}** v@{npc_saves},](~npc_save) [**^{SKILLS}** +@{npc_skills},](~npc_skill) ",
				"[**^{MORALE}** v@{npc_morale}](~npc_morale)\n",
				"[**^{INITIATIVE}** d8,](~npc_initiative) [**^{REACTION}** 2d6,](~npc_reaction) ",
				"**Move** @{npc_move}\n"
			];
			if (v.macro_npc_attacks) macroList.push("\n**Attacks:** @{macro_npc_attacks}");
			if (v.macro_npc_abilities) macroList.push("\n**Abilities:** @{macro_npc_abilities}");
			mySetAttrs({
				macro_statblock: macroList.join("")
			}, v);
		});
	};

	/* Autofill stuff */
	const fillClassStats = () => {
		getAttrs(["class", "class_ability", "attack_bonus"], v => {
			const label = v.class && reverseClasses[v.class.toLowerCase()];
			if (label && autofillData.classes.hasOwnProperty(label)) {
				const data = Object.assign({}, autofillData.classes[label]);
				Object.keys(data).forEach(key => {
					if (!(["", "0"].includes(`${v[key]}`))) delete data[key];
				});
				mySetAttrs(data, v);
			}
		});
	};
	const getShipMultiplier = (shipClass) => {
		if ((shipClass || "").toLowerCase() === "frigate") return 2;
		else if ((shipClass || "").toLowerCase() === "cruiser") return 3;
		else if ((shipClass || "").toLowerCase() === "capital") return 4;
		else return 1;
	};
	const getAutofillData = (sName, v, data, label) => {
		// Transforms the stored data to be suitable for
		// inclusion into the sheet.
		const output = Object.assign({}, data);
		if (sName === "ship-defenses") {
			if (label) output.defense_name = translate(label.toUpperCase());
			if (output.defense_mass.includes("#")) {
				output.defense_mass = `${parseInt(output.defense_mass) * v.ship_multiplier}`;
			}
		}
		if (sName === "ship-fittings") {
			if (label) {
				output.fitting_name = translate(label.toUpperCase());
				output.fitting_effect = translate(`${label.toUpperCase()}_DESC`);
			}
			if (output.fitting_mass.includes("#")) {
				output.fitting_mass = `${Math.round(parseFloat(output.fitting_mass) * v.ship_multiplier)}`;
			}
			if (output.fitting_power.includes("#")) {
				output.fitting_power = `${parseInt(output.fitting_power) * v.ship_multiplier}`;
			}
		}
		if (sName === "ship-weapons") {
			if (label) output.weapon_name = translate(label.toUpperCase());
			if (output.weapon_ammo) {
				output.weapon_ammo_max = output.weapon_ammo;
				output.weapon_use_ammo = "{{ammo=[[@{weapon_ammo} - 1]] / @{weapon_ammo_max}}}";
			}
		}
		if (sName === "weapons") {
			if (label) {
				output.weapon_name = translate(label.toUpperCase());
				output.weapon_description = translate(`${label.toUpperCase()}_DESC`);
			}
			if (output.weapon_ammo) {
				output.weapon_ammo_max = output.weapon_ammo;
				output.weapon_use_ammo = "{{ammo=[[0@{weapon_ammo} - (1 @{weapon_burst})]] / @{weapon_ammo|max}}}";
			}
			if (output.weapon_shock_damage) {
				output.weapon_shock = "{{shock=[[@{weapon_shock_damage} + @{weapon_attribute_mod}[Attribute] + @{weapon_skill_to_damage}[Skill]]] ^{SHOCK_DAMAGE_AGAINST_AC_LEQ} @{weapon_shock_ac}!}}";
			}
			if (output.weapon_burst) {
				output.weapon_burst = "@{burst_query}";
			}
			if (!output.weapon_attribute_mod) {
				output.weapon_attribute_mod = "@{dexterity_mod}";
			}
		}
		if (sName === "armor") {
			if (label) {
				output.armor_name = translate(label.toUpperCase());
				output.armor_description = translate(`${label.toUpperCase()}_DESC`) || "";
			}
		}
		if (sName === "cyberware") {
			if (label) {
				output.cyberware_name = translate(label.toUpperCase());
				output.cyberware_description = translate(`${label.toUpperCase()}_DESC`);
			}
		}
		if (sName === "foci") {
			if (label) {
				output.focus_name = translate(label.toUpperCase());
				output.focus_level = "1";
				output.focus_description = translate(`${label.toUpperCase()}_DESC`);
			}
		}
		if (sName === "techniques") {
			if (label) {
				output.technique_name = translate(label.toUpperCase());
				output.technique_description = translate(`${label.toUpperCase()}_DESC`);
			}
		}
		if (sName === "gear") {
			if (label) {
				output.gear_name = translate(label.toUpperCase());
				output.gear_description = translate(`${label.toUpperCase()}_DESC`);
			}
			if (output.gear_encumbrance === "1#") {
				output.gear_encumbrance = ".33";
			}
		}
		return output;
	};
	const getAutofillInfo = (sName, v, inputData, label) => {
		const data = getAutofillData(sName, v, inputData, label);
		// Generates info text from the stored data
		if (sName === "ship-defenses") {
			return `${translate(data.class)}+. ${translate("POWER_INIT")}: ${data.defense_power}, ${
				translate("MASS_INIT")}: ${data.defense_mass}. ${data.defense_effect}`;
		}
		if (sName === "ship-fittings") {
			return `${translate(data.class)}+. ${translate("POWER_INIT")}: ${data.fitting_power}, ${
				translate("MASS_INIT")}: ${data.fitting_mass}. ${data.fitting_effect}`;
		}
		if (sName === "ship-weapons") {
			return `${translate(data.class)}+. ${
				translate("POWER_INIT")}: ${data.weapon_power}, ${
				translate("MASS_INIT")}: ${data.weapon_mass}, ${
				translate("HARDPOINTS_INIT")}: ${data.weapon_hardpoints}. ${
				translate("DAMAGE_SHORT")} ${data.weapon_damage}. ${
				data.weapon_qualities}${
				(data.weapon_ammo ? `, ${translate("AMMO")}: ${data.weapon_ammo}`: "")}.`;
		}
		if (sName === "weapons") {
			const getNamedAttrMod = expr => {
				if (expr === "@{dexterity_mod}") return translate("DEXTERITY_SHORT");
				else if (expr === "@{strength_mod}") return translate("STRENGTH_SHORT");
				else if (expr === "@{str_dex_mod}") return translate("STR_DEX");
			};
			return `${translate("DAMAGE_SHORT")} ${data.weapon_damage}${data.weapon_burst ? ` (${translate("BURST")})` : ""}${
				data.weapon_ab ? `, ${translate("ATTACK_BONUS_SHORT")} +${data.weapon_ab}` : ""}${
				data.weapon_range ? `, ${translate("RANGE")} ${data.weapon_range}` : ""}${
				data.weapon_ammo ? `, ${translate("AMMO")} ${data.weapon_ammo}` : ""}${
				data.weapon_shock ? `, ${data.weapon_shock_damage} ${translate("SHOCK_DAMAGE_AGAINST_AC_LEQ")} ${data.weapon_shock_ac}` : ""}${
				", +"}${getNamedAttrMod(data.weapon_attribute_mod)}${
				data.weapon_encumbrance ? `, ${translate("ENCUMBRANCE_SHORT")} ${data.weapon_encumbrance}` : ""}.`;
		}
		if (sName === "armor") {
			return `${translate("AC")} ${data.armor_ac}, ${translate(data.armor_type)
			}, ${translate("ENCUMBRANCE_SHORT")} ${data.armor_encumbrance}.`;
		}
		if (sName === "cyberware") {
			return `${translate("STRAIN")}: ${data.cyberware_strain}.`;
		}
		if (sName === "techniques") {
			if (data.level === "0") return `${translate("CORE_TECHNIQUE")}.`;
			else return `${translate("LEVEL")}-${data.level}.`;
		}
		if (sName === "gear") {
			return `${translate("ENCUMBRANCE_SHORT")} ${data.gear_encumbrance}.`;
		}
		return "";
	};
	const generateAutofillRow = (sName) => {
		// Event handler for generating a new row when button is pressed
		getAttrs([`generate_${sName}_source`, "ship_class"], v => {
			const label = v[`generate_${sName}_source`];
			v.ship_multiplier = getShipMultiplier(v.ship_class);
			if (label && autofillData[sName].hasOwnProperty(label)) {
				const data = getAutofillData(sName, v, autofillData[sName][label], label);
				delete data.class;
				delete data.level;
				fillRepeatingSectionFromData(sName, data);
			}
		});
	};
	const generateAutofillInfo = (sName) => {
		// Event handler for showing info about the selected item
		getAttrs([`generate_${sName}_source`, "ship_class"], v => {
			const label = v[`generate_${sName}_source`];
			v.ship_multiplier = getShipMultiplier(v.ship_class);
			if (label && autofillData[sName].hasOwnProperty(label)) {
				const info = getAutofillInfo(sName, v, autofillData[sName][label], label);
				if (info) setAttrs({
					[`generate_${sName}_info`]: info
				});
			} else setAttrs({
				[`generate_${sName}_info`]: " "
			});
		});
	};

	/* Translations */
	const setTranslatedDefaults = () => {
		const specialSkills = {
			skill_culture_alien_name: {
				trans: `${translate("CULTURE_ALIEN")}/`,
				default: "Culture/Alien/"
			},
			skill_culture_one_name: {
				trans: `${translate("CULTURE")}/`,
				default: "Culture/"
			},
			skill_culture_two_name: {
				trans: `${translate("CULTURE")}/`,
				default: "Culture/"
			},
			skill_culture_three_name: {
				trans: `${translate("CULTURE")}/`,
				default: "Culture/"
			},
			skill_profession_name: {
				trans: `${translate("PROFESSION")}/`,
				default: "Profession/"
			},
		};
		getAttrs([...Object.keys(specialSkills), "homebrew_skill_list", "innate_ac_name"], v => {
			const setting = {};
			if (v.homebrew_skill_list === "first") {
				Object.entries(specialSkills).forEach(([name, data]) => {
					if (v[name] === data.default && v[name] !== data.trans) setting[name] = data.trans;
				});
			}
			setting.innate_ac_name = translate("INNATE_AC");
			mySetAttrs(setting, v);
		});
	};
	const handleAttributeQueries = () => {
		// Attribute query magic to set the global query variables according to
		// translations and the state of the setting_skill_query attribute.
		const attrQueries = attributes.map(attr => {
			const translated = translate(attr.toUpperCase());
			return `${translated},+ @{${attr}_mod}[${translated}]]]&#125;&#125; ` +
				`{{attribute= + ${translate(`${attr.toUpperCase()}_SHORT`)}&#125;&#125;`;
		});

		getAttrs(["attribute_query", "setting_skill_query",
			...attributes.map(a => `attribute_query_${a.slice(0,3)}`)
		], v => {

			if (v.setting_skill_query === "hover" || v.setting_skill_query === "hide") {
				mySetAttrs({
					attribute_query: `?{${translate("ATTRIBUTE")}|${[attrQueries[0], ...attrQueries.slice(1)].join("|")}}`,
					attribute_query_str: `+ @{strength_mod}[${translate("STRENGTH")}]]]}} {{attribute= + ${translate("STRENGTH_SHORT")}}}`,
					attribute_query_dex: `+ @{dexterity_mod}[${translate("DEXTERITY")}]]]}} {{attribute= + ${translate("DEXTERITY_SHORT")}}}`,
					attribute_query_con: `+ @{constitution_mod}[${translate("CONSTITUTION")}]]]}} {{attribute= + ${translate("CONSTITUTION_SHORT")}}}`,
					attribute_query_int: `+ @{intelligence_mod}[${translate("INTELLIGENCE")}]]]}} {{attribute= + ${translate("INTELLIGENCE_SHORT")}}}`,
					attribute_query_wis: `+ @{wisdom_mod}[${translate("WISDOM")}]]]}} {{attribute= + ${translate("WISDOM_SHORT")}}}`,
					attribute_query_cha: `+ @{charisma_mod}[${translate("CHARISMA")}]]]}} {{attribute= + ${translate("CHARISMA_SHORT")}}}`,
				}, v);
			} else if (v.setting_skill_query === "query") {
				mySetAttrs({
					attribute_query: `?{${translate("ATTRIBUTE")}|${[attrQueries[0], ...attrQueries.slice(1)].join("|")}}`,
					attribute_query_str: `?{${translate("ATTRIBUTE")}|${[attrQueries[0], ...attrQueries.slice(1)].join("|")}}`,
					attribute_query_dex: `?{${translate("ATTRIBUTE")}|${[attrQueries[1], attrQueries[0], ...attrQueries.slice(2)].join("|")}}`,
					attribute_query_con: `?{${translate("ATTRIBUTE")}|${[attrQueries[2], ...attrQueries.slice(0,2), ...attrQueries.slice(3)].join("|")}}`,
					attribute_query_int: `?{${translate("ATTRIBUTE")}|${[attrQueries[3], ...attrQueries.slice(0,3), ...attrQueries.slice(4)].join("|")}}`,
					attribute_query_wis: `?{${translate("ATTRIBUTE")}|${[attrQueries[4], ...attrQueries.slice(0,4), ...attrQueries.slice(5)].join("|")}}`,
					attribute_query_cha: `?{${translate("ATTRIBUTE")}|${[attrQueries[5], ...attrQueries.slice(0,5)].join("|")}}`,
				}, v);
			}
		});
	};
	const handleModifierQuery = () => {
		getAttrs(["modifier_query", "setting_modifier_query"], v => {
			if (`${v.setting_modifier_query}` === "1") {
				mySetAttrs({
					modifier_query: `+ ?{${translate("MODIFIER")}|0}[${translate("MODIFIER_SHORT")}]`,
				}, v);
			} else mySetAttrs({
				modifier_query: " "
			}, v);
		});
	};
	const setTranslatedQueries = () => {
		getAttrs(["burst_query", "extra_hp_query", "translation_numdice", "proficient_query", "skill_name_query"], v => {
			const setting = {
				burst_query: `?{${translate("BURST")}|${translate("YES")},+ 2[${translate("BURST")}]|${translate("NO")},&` + "#" + "32;}",
				extra_hp_query: `?{${translate("EXTRA_HP_QUERY")}|0}[${translate("BONUS")}]`,
				proficient_query: `?{${translate("PROFICIENT")}|${translate("YES")}, @{npc_skills}|${translate("NO")}, 0}[${translate("SKILL")}]`,
				skill_name_query: `?{${translate("SKILL_NAME")}|${translate("SKILL")}}`,
				translation_numdice: translate("NUMBER_OF_DICE")
			};
			mySetAttrs(setting, v);
		});
	};

	/* Ship Code */
	const fillShipStats = () => {
		getAttrs(["ship_hulltype", ...shipStats], v => {
			const label = v.ship_hulltype && reverseHullTypes[v.ship_hulltype.toLowerCase()];
			if (label && autofillData.hulltypes.hasOwnProperty(label)) {
				const data = Object.assign({}, autofillData.hulltypes[label]);
				data.ship_hp_max = data.ship_hp;
				Object.keys(data).forEach(key => {
					if (!(["", 0, "0"].includes(v[key]))) delete data[key];
				});
				mySetAttrs(data, v);
			}
		});
	};
	const setShipClass = () => {
		// Sets the internal ship_class_normalised attribute responsible
		// for filtering ship modules according to class.
		getAttrs(["ship_class", "ship_class_normalised"], v => {
			if (["fighter", translate("FIGHTER").toLowerCase()].includes(v.ship_class.toLowerCase()))
				setAttrs({
					ship_class_normalised: "fighter"
				});
			else if (["frigate", translate("FRIGATE").toLowerCase()].includes(v.ship_class.toLowerCase()))
				setAttrs({
					ship_class_normalised: "frigate"
				});
			else if (["cruiser", translate("CRUISER").toLowerCase()].includes(v.ship_class.toLowerCase()))
				setAttrs({
					ship_class_normalised: "cruiser"
				});
			else mySetAttrs({
				ship_class_normalised: ""
			}, v);
		});
	};
	const calculateShipStats = () => {
		// Calculates power, mass, and hardpoints remaining.
		const doCalc = (weaponIDs, fittingIDs, defenseIDs) => {
			const oldAttrs = [
				...weaponIDs.map(id => `repeating_ship-weapons_${id}_weapon_power`),
				...weaponIDs.map(id => `repeating_ship-weapons_${id}_weapon_mass`),
				...weaponIDs.map(id => `repeating_ship-weapons_${id}_weapon_hardpoints`),
				...fittingIDs.map(id => `repeating_ship-fittings_${id}_fitting_power`),
				...fittingIDs.map(id => `repeating_ship-fittings_${id}_fitting_mass`),
				...defenseIDs.map(id => `repeating_ship-defenses_${id}_defense_power`),
				...defenseIDs.map(id => `repeating_ship-defenses_${id}_defense_mass`),
				"ship_power_max", "ship_mass_max", "ship_hardpoints_max",
				"ship_power", "ship_mass", "ship_hardpoints"
			];
			getAttrs(oldAttrs, v => {
				const ship_power = v.ship_power_max - sum([
					...weaponIDs.map(id => `repeating_ship-weapons_${id}_weapon_power`),
					...fittingIDs.map(id => `repeating_ship-fittings_${id}_fitting_power`),
					...defenseIDs.map(id => `repeating_ship-defenses_${id}_defense_power`),
				].map(x => v[x]));
				const ship_mass = v.ship_mass_max - sum([
					...weaponIDs.map(id => `repeating_ship-weapons_${id}_weapon_mass`),
					...fittingIDs.map(id => `repeating_ship-fittings_${id}_fitting_mass`),
					...defenseIDs.map(id => `repeating_ship-defenses_${id}_defense_mass`),
				].map(x => v[x]));
				const ship_hardpoints = v.ship_hardpoints_max -
					sum(weaponIDs.map(id => v[`repeating_ship-weapons_${id}_weapon_hardpoints`]));
				mySetAttrs({
					ship_power,
					ship_mass,
					ship_hardpoints
				}, v, {
					silent: true
				});
			});
		};
		getSectionIDs("repeating_ship-weapons", A => getSectionIDs("repeating_ship-fittings", B => {
			getSectionIDs("repeating_ship-defenses", C => doCalc(A, B, C));
		}));
	};

	/* Drones */
	const fillDroneStats = () => {
		// This must be run from a repeating event, otherwise it will not know where to draw the data from.
		getAttrs(["repeating_drones_drone_model"], v => {
			const model = (v.repeating_drones_drone_model || "").toLowerCase().trim().replace(/ /g, "_");
			if (autofillData.drones.hasOwnProperty(model)) {
				const setting = Object.entries(autofillData.drones[model]).reduce((m, [key, value]) => {
					m[`repeating_drones_${key}`] = value;
					return m;
				}, {});
				setting.repeating_drones_drone_HP_max = setting.repeating_drones_drone_HP;
				setAttrs(setting);
			}
		});
	};
	const fillDroneFitting = (num) => {
		const prefix = `repeating_drones_drone_fitting_${num}`;
		getAttrs([`${prefix}_desc`, `${prefix}_name`], v => {
			const fittingName = (v[`${prefix}_name`] || "").toLowerCase().trim().replace(/ /g, "_");
			if (v[`${prefix}_desc`] == "" && autofillData.droneFittings.includes(fittingName)) {
				setAttrs({
					[`${prefix}_desc`]: translate(`${fittingName.toUpperCase()}_DESC`)
				});
			}
		});
	};
	const calculateDroneAttack = (prefixes, callback) => {
		const sourceAttrs = prefixes.reduce((m, prefix) => {
			return m.concat([
				`${prefix}_drone_weapon1_ab`,
				`${prefix}_drone_weapon1_active`,
				`${prefix}_drone_weapon1_attack`,
				`${prefix}_drone_weapon2_ab`,
				`${prefix}_drone_weapon2_active`,
				`${prefix}_drone_weapon2_attack`,
				`${prefix}_drone_weapon3_ab`,
				`${prefix}_drone_weapon3_active`,
				`${prefix}_drone_weapon3_attack`,
			]);
		}, ["attack_bonus", "intelligence_mod", "skill_pilot", "skill_program"]);
		getAttrs(sourceAttrs, v => {
			const skillMod = Math.max(parseInt(v.skill_pilot), parseInt(v.skill_program)) || 0,
				intMod = parseInt(v.intelligence_mod) || 0,
				attackBonus = parseInt(v.attack_bonus) || 0;

			const setting = prefixes.reduce((m, prefix) => {
				[1, 2, 3].filter(num => v[`${prefix}_drone_weapon${num}_active`] === "1")
					.forEach(num => {
						m[`${prefix}_drone_weapon${num}_attack`] = intMod +
							((skillMod === -1) ? -2 : skillMod) + attackBonus +
							parseInt(v[[`${prefix}_drone_weapon${num}_ab`]] || 0);
					});
				return m;
			}, {});
			mySetAttrs(setting, v, callback);
		});
	};

	/**
	 * Migrations
	 */
	/* Upgrade event handler */
	const handleUpgrade = () => {
		getAttrs(["character_sheet"], v => {
			if (!v.character_sheet || v.character_sheet.indexOf(sheetName) !== 0)
				upgradeFrom162();
			else if (v.character_sheet.slice(32) !== sheetVersion)
				upgradeSheet(v.character_sheet.slice(32), true);
		});
	};

	/* Versioned upgrade */
	const upgradeSheet = (version, firstTime = false, finalTime = false) => {
		// Any version upgrade code should go here
		const performUpgrade = (version) => {
			const [major, minor, patch] = version.split(".").map(x => parseInt(x));
			console.log(`Upgrading from version ${version}.`);

			/** v2.1.0
			 *  convert old format for burst settings for weapons and attacks
			 *  set ammo and shock checkboxes to reasonable values
			 *  convert old format for gear readied/stowed
			 **/
			if (major == 2 && minor < 1) {
				const upgradeFunction = _.after(4, () => {
					// recalculate these things just to be sure, in case the v1.6.2 update
					// missed them.
					buildShipWeaponsMenu();
					buildAttacksMenu();
					buildMagicMenu();
					generateWeaponDisplay();
					attributes.forEach(calculateMod);

					upgradeSheet("2.1.0");
				});

				getSectionIDs("repeating_weapons", idArray => {
					const sourceAttrs = [
						...idArray.map(id => `repeating_weapons_${id}_weapon_burst`),
						...idArray.map(id => `repeating_weapons_${id}_weapon_shock_damage`),
						...idArray.map(id => `repeating_weapons_${id}_weapon_ammo`)
					];
					getAttrs(sourceAttrs, v => {
						const setting = idArray.reduce((m, id) => {
							if (v[`repeating_weapons_${id}_weapon_burst`] === "0")
								m[`repeating_weapons_${id}_weapon_burst`] = "";
							else if (v[`repeating_weapons_${id}_weapon_burst`] === "2")
								m[`repeating_weapons_${id}_weapon_burst`] = "+ 2[Burst]";
							if (v[`repeating_weapons_${id}_weapon_shock_damage`] !== "0")
								m[`repeating_weapons_${id}_weapon_shock`] = "{{shock=[[@{weapon_shock_damage} + @{weapon_attribute_mod}[Attribute] + @{weapon_skill_to_damage}[Skill]]] ^{SHOCK_DAMAGE_AGAINST_AC_LEQ} @{weapon_shock_ac}!}}";
							if (v[`repeating_weapons_${id}_weapon_ammo`] && v[`repeating_weapons_${id}_weapon_ammo`] !== "0") {
								m[`repeating_weapons_${id}_weapon_use_ammo`] = "{{ammo=[[0@{weapon_ammo} - (1 @{weapon_burst})]] / @{weapon_ammo|max}}}";
							}
							return m;
						}, {});
						setAttrs(setting, {}, upgradeFunction);
					});
				});
				getSectionIDs("repeating_ship-weapons", idArray => {
					getAttrs(idArray.map(id => `repeating_ship-weapons_${id}_weapon_ammo_max`), v => {
						const setting = idArray.reduce((m, id) => {
							if (v[`repeating_ship-weapons_${id}_weapon_ammo_max`] && v[`repeating_ship-weapons_${id}_weapon_ammo_max`] !== "0") {
								m[`repeating_ship-weapons_${id}_weapon_use_ammo`] = "{{ammo=[[@{weapon_ammo} - 1]] / @{weapon_ammo_max}}}";
							}
							return m;
						}, {});
						setAttrs(setting, {}, upgradeFunction);
					});
				});
				getSectionIDs("repeating_npc-attacks", idArray => {
					getAttrs(idArray.map(id => `repeating_npc-attacks_${id}_attack_burst`), v => {
						const setting = idArray.reduce((m, id) => {
							if (v[`repeating_npc-attacks_${id}_attack_burst`] === "0")
								m[`repeating_npc-attacks_${id}_attack_burst`] = "";
							else if (v[`repeating_npc-attacks_${id}_attack_burst`] === "2")
								m[`repeating_npc-attacks_${id}_attack_burst`] = "+ 2[Burst]";
							return m;
						}, {});
						setAttrs(setting, {}, upgradeFunction);
					});
				});
				getSectionIDs("repeating_gear", idArray => {
					getAttrs(idArray.map(id => `repeating_gear_${id}_gear_status`), v => {
						const setting = idArray.reduce((m, id) => {
							m[`repeating_gear_${id}_gear_status`] =
								(v[`repeating_gear_${id}_gear_status`] || "").toUpperCase();
							return m;
						}, {});
						mySetAttrs(setting, v, {}, upgradeFunction);
					});
				});
			}
			/** v2.2.0
			 *  convert single armor line to repeating armor
			 *  Change @{attribute_query_none} to @{attribute_query}
			 **/
			else if (major == 2 && minor < 2) {
				const upgradeFunction = _.after(2, () => {
					calculateStrDexMod();
					calculateEffort();
					buildPsionicsMenu();
					buildSkillMenu();

					upgradeSheet("2.2.0");
				});
				getAttrs(["armor_name", "armor_ac", "armor_encumbrance", "armor_type", "setting_ship_tab_name"], v => {
					if (v.armor_ac) {
						const data = {
							armor_active: "1",
							armor_ac: v.armor_ac,
							armor_encumbrance: v.armor_encumbrance || "0",
							armor_name: v.armor_name || "",
							armor_status: "READIED",
							armor_type: (v.armor_type || "").toUpperCase()
						};
						fillRepeatingSectionFromData("armor", data, upgradeFunction);
					} else upgradeFunction();
					if (v.setting_ship_tab_name === "MECH") setAttrs({
						ship_vehicle_type: "MECH"
					});
				});
				getSectionIDs("repeating_skills", skillIDs => getSectionIDs("repeating_magic-skills", magicIDs => {
					getSectionIDs("repeating_psychic-skills", psychicIDs => {
						const sourceAttrs = [
							...skillIDs.map(id => `repeating_skills_${id}_skill_query`),
							...magicIDs.map(id => `repeating_magic-skills_${id}_skill_query`),
							...psychicIDs.map(id => `repeating_psychic-skills_${id}_skill_query`),
							...skills.revised.map(skill => `skill_${skill}_query`),
							...skills.first.map(skill => `skill_${skill}_query`),
							...skills.psionic.map(skill => `skill_${skill}_query`),
							"skill_magic_query", "skill_magic2_query"
						];
						getAttrs(sourceAttrs, v => {
							const setting = sourceAttrs.reduce((m, attrName) => {
								if (v[attrName] === "@{attribute_query_none}") m[attrName] = "@{attribute_query}";
								return m;
							}, {});
							mySetAttrs(setting, v, {}, upgradeFunction);
						});
					});
				}));
			}
			/** v2.3.1
			 *  Regenerate drone and weapon ABs
			 **/
			else if (major == 2 && (minor < 3 || (minor == 3 && patch == 0))) {
				const upgradeFunction = _.after(1, () => {
					upgradeSheet("2.3.1");
				});
				generateWeaponDisplay();
				getSectionIDs("repeating_drones", idArray => {
					calculateDroneAttack(idArray.map(id => `repeating_drones_${id}`), upgradeFunction);
				});
			}
			/** Final upgrade clause, always leave this around */
			else upgradeSheet(sheetVersion, false, true);
		};

		if (firstTime) performUpgrade(version);
		else setAttrs({
			character_sheet: `${sheetName} v${version}`,
		}, {}, () => {
			if (!finalTime) performUpgrade(version);
		});
	};
	/* Main upgrade from pre-worker versioning */
	const upgradeFrom162 = () => {
		console.log("Upgrading from versionless sheet (assumed to be fresh or v1.6.2).");
		const upgradeFunction = _.after(13, () => {
			upgradeSheet("2.0.1");
		});

		// Legacy migration
		getAttrs([1, 2, 3, 4, 5, 6, 7, 8].map(i => `psionics_mastered_${i}`), v => {
			const setting = {};
			for (let i = 1; i < 9; i++) {
				const technique = v[`psionics_mastered_${i}`];
				if (technique) {
					const newRowId = generateRowID();
					setting[`repeating_techniques_${newRowId}_technique_name`] = technique;
				}
			}
			setAttrs(setting);
		});
		getAttrs([1, 2, 3, 4].map(i => `cyberware_${i}`), v => {
			const setting = {};
			for (let i = 1; i < 5; i++) {
				const cyberware = v[`cyberware_${i}`];
				if (cyberware) {
					const newRowId = generateRowID();
					setting[`repeating_cyberware_${newRowId}_cyberware_name`] = cyberware;
				}
			}
			setAttrs(setting);
		});
		getAttrs(["languages"], v => {
			if (v.languages) {
				const setting = {};

				v.languages.split(/\r?\n/).filter(l => !!l).forEach(language => {
					const newRowId = generateRowID();
					setting[`repeating_languages_${newRowId}_language`] = language;
				});
				setAttrs(setting);
			}
		});

		const attrConversionData = {
			armor_enc: "armor_encumbrance",
			cha: "charisma",
			cha_misc: "charisma_bonus",
			con: "constitution",
			con_misc: "constitution_bonus",
			dex: "dexterity",
			dex_misc: "dexterity_bonus",
			gender: "species_gender",
			hd: "npc_hd",
			int: "intelligence",
			int_misc: "intelligence_bonus",
			morale: "npc_morale",
			move: "npc_move",
			name: "npc_name",
			notes: "npc_notes",
			npc_ac: "AC",
			saves: "npc_saves",
			ship_hp_min: "ship_hp",
			ship_current_crew: "ship_crew",
			ship_last_maintenance_cost: "ship_last_maintenance",
			skills: "npc_skills",
			skill_biopsion: "skill_biopsionics",
			skill_metapsion: "skill_metapsionics",
			skill_points: "unspent_skill_points",
			str: "strength",
			strain_perm: "strain_permanent",
			str_misc: "strength_bonus",
			wis: "wisdom",
			wis_misc: "wisdom_bonus",
		};
		const attrsToConvertFromOnTo1 = [
			"homebrew_luck_save",
			"homebrew_extra_skills",
			"setting_heroic_enable",
		];
		const customConversionAttrs = [
			"damage",
			"homebrew_psionics_disable",
			"npc_attacks",
			"npc_attack_bonus",
			"setting_space_magic_enable",
			"ship_other_notes",
			"ship_free_hardpoints",
			"ship_free_mass",
			"ship_free_power",
			"skill_culture_alien_type",
			"skill_culture_one_value",
			"skill_culture_two_value",
			"skill_culture_three_value",
			"profession_type",
			"tab",
			...[1, 2, 3, 4].map(n => `homebrew_custom_counter_${n}_name`),
			...[1, 2, 3, 4].map(n => `homebrew_custom_counter_${n}_counter`),
		];
		// convert non-repeating attributes
		getAttrs([
			...Object.keys(attrConversionData),
			...Object.values(attrConversionData),
			...attrsToConvertFromOnTo1,
			...customConversionAttrs,
		], v => {
			const setting = Object.entries(attrConversionData).reduce((m, [oldName, newName]) => {
				if (v[oldName] && v[oldName] !== "" && `${v[newName]}` !== `${v[oldName]}`)
					m[newName] = v[oldName];
				return m;
			}, {});
			attrsToConvertFromOnTo1.forEach(name => {
				if (v[name] === "on") setting[name] = "1";
			});

			// convert skill name format
			["one", "two", "three"].forEach(num => {
				if (v[`skill_culture_${num}_value`])
					setting[`skill_culture_${num}_name`] = `Culture/${v[`skill_culture_${num}_value`]}`;
			});
			if (v.profession_type) setting.skill_profession_name = `Profession/${v.profession_type}`;
			if (v.skill_culture_alien_type)
				setting.skill_culture_alien_name = `Culture/Alien/${v.skill_culture_alien_type}`;

			// Write legacy ship data
			if (v.ship_free_hardpoints || v.ship_free_mass || v.ship_free_power) {
				setting.ship_other_notes = `\nLegacy attributes${
					v.ship_free_power ? `\nFree Power: ${v.ship_free_power}` : ""}${
					v.ship_free_mass ? `\nFree Mass: ${v.ship_free_mass}` : ""}${
					v.ship_free_hardpoints ? `\nFree Hardpoints: ${v.ship_free_hardpoints}` : ""}
					${v.ship_other_notes || ""}`;
			}
			// convert homebrew custom counter stuff
			const customCounterData = [1, 2, 3, 4].reduce((m, num) => {
				if (v[`homebrew_custom_counter_${num}_name`]) m.push({
					resource_name: v[`homebrew_custom_counter_${num}_name`],
					resource_count: v[`homebrew_custom_counter_${num}_counter`] || 0
				});
				return m;
			}, []);
			fillRepeatingSectionFromData("resources", customCounterData, upgradeFunction);

			// Tab
			if (`${v.tab}` === "1" || `${v.tab}` === "4") setting.tab = "character";
			if (`${v.tab}` === "2") setting.tab = "ship";
			if (`${v.tab}` === "3") {
				setting.tab = "character";
				setting.npc = "1";
			}

			// NPC attack
			if (v.damage) {
				const newAttack = {
					attack_damage: v.damage,
					attack_name: translate("ATTACK"),
					attack_number: v.npc_attacks || "1"
				};
				fillRepeatingSectionFromData("npc-attacks", newAttack, upgradeFunction);
			} else upgradeFunction();

			// Psionics/Space Magic toggle conversion
			if (v.setting_space_magic_enable === "on" && v.homebrew_psionics_disable !== "on")
				setting.setting_super_type = "both";
			else if (v.setting_space_magic_enable === "on")
				setting.setting_super_type = "magic";
			else if (v.homebrew_psionics_disable === "on")
				setting.setting_super_type = "neither";

			setAttrs(setting, {}, upgradeFunction);
		});
		// convert weapon attributes, and extract ship weapons
		getSectionIDs("repeating_weapons", idArray => {
			const oldAttrs = [
				...idArray.map(id => `repeating_weapons_${id}_attribute_mod`),
				...idArray.map(id => `repeating_weapons_${id}_add_skill`),
				...idArray.map(id => `repeating_weapons_${id}_weapon_shock`),
				...idArray.map(id => `repeating_weapons_${id}_ship_weapon_name`),
				...idArray.map(id => `repeating_weapons_${id}_ship_weapon_power`),
				...idArray.map(id => `repeating_weapons_${id}_ship_weapon_ab`),
				...idArray.map(id => `repeating_weapons_${id}_ship_weapon_damage`),
				...idArray.map(id => `repeating_weapons_${id}_ship_weapon_ammo`),
				...idArray.map(id => `repeating_weapons_${id}_ship_weapon_special_effects`),
				...idArray.map(id => `repeating_weapons_${id}_ship_weapon_broken`),
			];
			getAttrs(oldAttrs, v => {
				const setting = idArray.reduce((m, id) => {
					if (v[`repeating_weapons_${id}_add_skill`] === "@{weapon_skill_bonus}")
						m[`repeating_weapons_${id}_weapon_skill_to_damage`] = "@{weapon_skill_bonus}";
					if (v[`repeating_weapons_${id}_weapon_shock`])
						m[`repeating_weapons_${id}_weapon_shock_damage`] = v[`repeating_weapons_${id}_weapon_shock`];
					const modValue = v[`repeating_weapons_${id}_attribute_mod`];
					switch (modValue) {
					case "@{dex_bonus}":
						m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{dexterity_mod}";
						break;
					case "@{con_bonus}":
						m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{constitution_mod}";
						break;
					case "@{int_bonus}":
						m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{intelligence_mod}";
						break;
					case "@{wis_bonus}":
						m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{wisdom_mod}";
						break;
					case "@{cha_bonus}":
						m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{charisma_mod}";
						break;
					default:
						m[`repeating_weapons_${id}_weapon_attribute_mod`] = "@{strength_mod}";
					}
					return m;
				}, {});
				const data = idArray.filter(id => v[`repeating_weapons_${id}_ship_weapon_name`])
					.map(id => {
						const row = {};
						row.weapon_name = v[`repeating_weapons_${id}_ship_weapon_name`];
						if (v[`repeating_weapons_${id}_ship_weapon_power`])
							row.weapon_power = v[`repeating_weapons_${id}_ship_weapon_power`];
						if (v[`repeating_weapons_${id}_ship_weapon_ab`])
							row.weapon_attack_bonus = v[`repeating_weapons_${id}_ship_weapon_ab`];
						if (v[`repeating_weapons_${id}_ship_weapon_damage`])
							row.weapon_damage = v[`repeating_weapons_${id}_ship_weapon_damage`];
						if (v[`repeating_weapons_${id}_ship_weapon_ammo`])
							row.weapon_ammo = v[`repeating_weapons_${id}_ship_weapon_ammo`];
						if (v[`repeating_weapons_${id}_ship_weapon_special_effects`])
							row.weapon_qualities = v[`repeating_weapons_${id}_ship_weapon_special_effects`];
						if (v[`repeating_weapons_${id}_ship_weapon_broken`] === "on")
							row.weapon_broken = "1";
						return row;
					});
				fillRepeatingSectionFromData("ship-weapons", data, upgradeFunction);
				setAttrs(setting, null, upgradeFunction);
			});
		});
		// convert skills
		getSectionIDs("repeating_skills", idArray => {
			const oldAttrs = [
				...idArray.map(id => `repeating_skills_${id}_custom_skill_1_name`),
				...idArray.map(id => `repeating_skills_${id}_custom_skill_2_name`),
				...idArray.map(id => `repeating_skills_${id}_custom_skill_1_level`),
				...idArray.map(id => `repeating_skills_${id}_custom_skill_2_level`),
				...idArray.map(id => `repeating_skills_${id}_custom_skill_1_specialist`),
				...idArray.map(id => `repeating_skills_${id}_custom_skill_2_specialist`),
			];
			getAttrs(oldAttrs, v => {
				const data = idArray.reduce((m, id) => {
					[1, 2].forEach(i => {
						if (v[`repeating_skills_${id}_custom_skill_${i}_name`]) {
							const skillLevel = (typeof v[`repeating_skills_${id}_custom_skill_${i}_level`] === "undefined") ?
								"-1" : v[`repeating_skills_${id}_custom_skill_${i}_level`];
							m.push({
								skill_name: v[`repeating_skills_${id}_custom_skill_${i}_name`],
								skill: skillLevel,
								skill_specialist: v[`repeating_skills_${id}_custom_skill_${i}_specialist`] || "2d6"
							});
						}
					});
					return m;
				}, []);
				idArray.forEach(id => removeRepeatingRow(`repeating_skills_${id}`));
				fillRepeatingSectionFromData("skills", data, upgradeFunction);
			});
		});
		// convert techniques
		getSectionIDs("repeating_technique", idArray => {
			const oldAttrs = [
				...idArray.map(id => `repeating_technique_${id}_technique`),
				...idArray.map(id => `repeating_technique_${id}_technique_description`),
			];
			getAttrs(oldAttrs, v => {
				const data = idArray.reduce((m, id) => {
					if (v[`repeating_technique_${id}_technique`])
						m.push({
							technique_name: v[`repeating_technique_${id}_technique`],
							technique_description: v[`repeating_technique_${id}_technique_description`] || ""
						});
					return m;
				}, []);
				fillRepeatingSectionFromData("techniques", data, upgradeFunction);
				idArray.forEach(id => removeRepeatingRow(`repeating_technique_${id}`));
			});
		});
		// convert cyberware name
		getSectionIDs("repeating_cyberware", idArray => {
			getAttrs(idArray.map(id => `repeating_cyberware_${id}_cyberware`), v => {
				const setting = idArray.reduce((m, id) => {
					if (v[`repeating_cyberware_${id}_cyberware`])
						m[`repeating_cyberware_${id}_cyberware_name`] = v[`repeating_cyberware_${id}_cyberware`];
					return m;
				}, {});
				setAttrs(setting, null, upgradeFunction);
			});
		});
		// convert goals
		getSectionIDs("repeating_goals", idArray => {
			const oldAttrs = [
				...idArray.map(id => `repeating_goals_${id}_misc_goal`),
				...idArray.map(id => `repeating_goals_${id}_misc_goal_xp`),
			];
			getAttrs(oldAttrs, v => {
				const setting = idArray.reduce((m, id) => {
					if (v[`repeating_goals_${id}_misc_goal`])
						m[`repeating_goals_${id}_goal_name`] = v[`repeating_goals_${id}_misc_goal`];
					if (v[`repeating_goals_${id}_misc_goal_xp`])
						m[`repeating_goals_${id}_goal_xp`] = v[`repeating_goals_${id}_misc_goal_xp`];
					return m;
				}, {});
				setAttrs(setting, null, upgradeFunction);
			});
		});
		// convert languages
		getSectionIDs("repeating_languages", idArray => {
			getAttrs(idArray.map(id => `repeating_languages_${id}_languages`), v => {
				const setting = idArray.reduce((m, id) => {
					if (v[`repeating_languages_${id}_languages`])
						m[`repeating_languages_${id}_language`] = v[`repeating_languages_${id}_languages`];
					return m;
				}, {});
				setAttrs(setting, null, upgradeFunction);
			});
		});
		// convert gear status
		getSectionIDs("repeating_gear", idArray => {
			getAttrs(idArray.map(id => `repeating_gear_${id}_gear_readied`), v => {
				const setting = idArray.reduce((m, id) => {
					if (`${v[`repeating_gear_${id}_gear_readied`]}` === "1")
						m[`repeating_gear_${id}_gear_status`] = "readied";
					else if (`${v[`repeating_gear_${id}_gear_readied`]}` === "2")
						m[`repeating_gear_${id}_gear_status`] = "stowed";
					return m;
				}, {});
				setAttrs(setting, null, upgradeFunction);
			});
		});
		// convert defenses
		getSectionIDs("repeating_defenses", idArray => {
			const oldAttrs = [
				...idArray.map(id => `repeating_defenses_${id}_ship_defense_name`),
				...idArray.map(id => `repeating_defenses_${id}_ship_defense_special_effects`),
				...idArray.map(id => `repeating_defenses_${id}_ship_defense_broken`),
			];
			getAttrs(oldAttrs, v => {
				const data = idArray.map(id => {
					const row = {};
					if (v[`repeating_defenses_${id}_ship_defense_name`])
						row.defense_name = v[`repeating_defenses_${id}_ship_defense_name`];
					if (v[`repeating_defenses_${id}_ship_defense_special_effects`])
						row.defense_effect = v[`repeating_defenses_${id}_ship_defense_special_effects`];
					if (v[`repeating_defenses_${id}_ship_defense_broken`])
						row.defense_broken = "1";
					return row;
				});
				fillRepeatingSectionFromData("ship-defenses", data, upgradeFunction);
			});
		});
		// convert fittings
		getSectionIDs("repeating_fittings", idArray => {
			const oldAttrs = [
				...idArray.map(id => `repeating_fittings_${id}_ship_fitting_name`),
				...idArray.map(id => `repeating_fittings_${id}_ship_fitting_special_effects`),
				...idArray.map(id => `repeating_fittings_${id}_ship_fitting_broken`),
			];
			getAttrs(oldAttrs, v => {
				const data = idArray.map(id => {
					const row = {};
					if (v[`repeating_fittings_${id}_ship_fitting_name`])
						row.fitting_name = v[`repeating_fittings_${id}_ship_fitting_name`];
					if (v[`repeating_fittings_${id}_ship_fitting_special_effects`])
						row.fitting_effect = v[`repeating_fittings_${id}_ship_fitting_special_effects`];
					if (v[`repeating_fittings_${id}_ship_fitting_broken`])
						row.fitting_broken = "1";
					return row;
				});
				fillRepeatingSectionFromData("ship-fittings", data, upgradeFunction);
			});
		});
	};

	/**
	 * Register Event handlers
	 */

	on("sheet:opened", handleUpgrade);

	on("sheet:opened change:npc", validateTab);
	on("sheet:opened", setTranslatedQueries);
	on("sheet:opened change:setting_skill_query", handleAttributeQueries);
	on("sheet:opened change:setting_modifier_query", handleModifierQuery);
	on("change:homebrew_skill_list", setTranslatedDefaults);

	/* API use ammo boilerplate */
	["weapons", "ship-weapons"].forEach(sName => {
		on(`change:repeating_${sName}:weapon_use_ammo`, () => handleAmmoAPI(sName));
	});
	on("change:setting_use_ammo", () => {
		handleAmmoAPI("weapons");
		handleAmmoAPI("ship-weapons");
	});

	/* Character sheet */
	on("change:class", fillClassStats);
	attributes.forEach(attr => on(`change:${attr} change:${attr}_bonus`, () => calculateMod(attr)));

	on(weaponDisplayEvent, generateWeaponDisplay);

	on("change:repeating_weapons:weapon_name", () => validateWeaponSkills());
	on("change:homebrew_skill_list", () => getSectionIDs("repeating_weapons", validateWeaponSkills));

	on("change:strain change:strain_permanent", validateStrain);
	on("change:constitution", calculateMaxStrain);
	on("change:repeating_cyberware", calculateCyberwareStrain);
	on("change:strain_permanent_extra change:cyberware_strain_total", calculatePermanentStrain);

	on("change:level", calculateSaves);

	on([...effortAttributes, "repeating_psychic-skills:skill"].map(x => `change:${x}`).join(" "), calculateEffort);

	on("change:magic_committed_effort_current change:magic_committed_effort_scene change: magic_committed_effort_day change:magic_total_effort", calculateMagicEffort);

	on("change:repeating_armor change:innate_ac remove:repeating_armor", calculateAC);

	on("change:strength change:repeating_gear remove:repeating_gear change:repeating_weapons " +
		"remove:repeating_weapons change:repeating_armor remove:repeating_armor", calculateGearReadiedStowed);

	on("change:level change:setting_xp_scheme", calculateNextLevelXP);

	on("change:setting_super_type", validateSuperTab);

	/* Character chat macros */
	on("change:homebrew_luck_save", buildSaveMenu);

	on([
		...skills.revised.map(x => `change:skill_${x}`),
		...skills.first.map(x => `change:skill_${x}`),
		"change:homebrew_skill_list",
		"change:repeating_skills",
		"change:setting_show_untrained_skills",
		"remove:repeating_skills",
	].join(" "), buildSkillMenu);

	on([
		...skills.psionic.map(x => `change:skill_${x}`),
		"change:setting_super_type change:repeating_techniques remove:repeating_techniques",
		"change:repeating_psychic-skills remove:repeating_psychic-skills"
	].join(" "), buildPsionicsMenu);

	on("change:setting_super_type change:repeating_spells remove:repeating_spells " +
		"change:repeating_magic-skills remove:repeating_magic-skills " +
		"change:skill_magic change:skill_magic2_name change:skill_magic2", buildMagicMenu);

	/* Repeating autofill */
	autofillSections.forEach(sName => {
		on(`change:generate_${sName}_source`, () => generateAutofillInfo(sName));
		on(`change:generate_${sName}_button`, () => generateAutofillRow(sName));
	});


	/* Ship sheet */
	on("change:ship_hulltype", fillShipStats);
	on("change:ship_class", setShipClass);
	on(shipStatEvent, calculateShipStats);
	on("change:repeating_ship-weapons:weapon_name change:repeating_ship-weapons:weapon_attack_bonus " +
		"remove:repeating_ship-weapons", buildShipWeaponsMenu);

	/* Drones */
	[1,2,3,4,5].forEach(num => {
		on(`change:repeating_drones:drone_fitting_${num}_name`, () => fillDroneFitting(num));
	});
	on("change:repeating_drones:drone_model", fillDroneStats);
	on("change:attack_bonus change:intelligence_mod change:skill_pilot change:skill_program",
		() => getSectionIDs("repeating_drones", idArray => {
			calculateDroneAttack(idArray.map(id => `repeating_drones_${id}`));
		}));
	on([
		...[1, 2, 3].map(n => `change:repeating_drones:drone_weapon${n}_ab`),
		...[1, 2, 3].map(n => `change:repeating_drones:drone_weapon${n}_active`)
	].join(" "), () => calculateDroneAttack(["repeating_drones"]));

	/* NPC sheet */
	on("change:npc_stat_block", fillNPC);
	on("change:npc_rolls_hidden", handleNPCRollHide);
	on("change:repeating_npc-attacks:attack_name", addNPCAttackBonus);
	on("change:npc_roll_full_attack change:repeating_npc-attacks:attack_number", setNPCMultiAttacks);

	on("change:repeating_npc-abilities:ability_name remove:repeating_npc-abilities", buildAbilitiesMenu);
	on("change:repeating_npc-attacks:attack_name change:repeating_npc-attacks:attack_ab " +
		"change:repeating_npc-attacks:attack_number remove:repeating_npc-attacks", buildAttacksMenu);
	on("change:npc change:npc_armor_type change:macro_npc_attacks change:macro_npc_abilities", buildStatblock);

})();
