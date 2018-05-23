/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on ,removeRepeatingRow, _, getTranslationByKey */
(function () {
	"use strict";
	// Data constants
	const sheetName = "Stars Without Number (revised)";
	const sheetVersion = "2.1.0";
	const translate = getTranslationByKey;
	const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
	const effortAttributes = ["wisdom_mod", "constitution_mod", "psionics_extra_effort",
		"skill_biopsionics", "skill_precognition", "skill_telepathy", "skill_teleportation",
		"skill_telekinesis", "skill_metapsionics"
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
		"skill_shoot", "skill_punch", "skill_stab", "skill_combat_energy",
		"skill_combat_gunnery", "skill_combat_primitive", "skill_combat_projectile",
		"skill_combat_psitech", "skill_combat_unarmed", "skill_telekinesis"
	];
	const weaponDisplayEvent = [
		...["attack", "name", "skill_bonus", "attribute_mod", "damage", "shock","shock_damage",
		"shock_ac", "skill_to_damage"].map(x => `change:repeating_weapons:weapon_${x}`),
		"remove:repeating_weapons", "change:attack_bonus",
		...weaponSkills.map(name => `change:${name}`),
	].join(" ");
	const skills = {
		revised: ["administer", "connect", "exert", "fix", "heal", "know", "lead",
			"notice", "perform", "pilot", "program", "punch", "shoot", "sneak", "stab",
			"survive", "talk", "trade", "work"],
		first: ["artist", "athletics", "bureaucracy", "business", "combat_energy", "combat_gunnery",
			"combat_primitive", "combat_projectile", "combat_psitech", "combat_unarmed", "computer",
			"culture_alien", "culture_criminal", "culture_spacer", "culture_traveller", "culture_one",
			"culture_two", "culture_three", "exosuit", "gambling", "history", "instructor", "language",
			"leadership", "navigation", "perception", "persuade", "profession", "religion", "science",
			"security", "stealth", "steward", "survival", "tactics", "tech_astronautic", "tech_maltech",
			"tech_medical", "tech_postech", "tech_pretech", "tech_psitech", "vehicle_air", "vehicle_grav",
			"vehicle_land", "vehicle_space", "vehicle_water"],
		psionic: ["biopsionics", "metapsionics", "precognition", "telekinesis", "telepathy", "teleportation"],
	};
	// HD AC AB Damage #attacks move morale skills saves armor_type
	const statblockData = {
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
	};
	const shipData = {
		defenses: {
			ablative_hull_compartments: {
				class: "CAPITAL",
				effect: `+1 ${translate("AC")}, +20 ${translate("MAXIMUM_HIT_POINTS").toLowerCase()}.`,
				mass: "2#",
				name: translate("ABLATIVE_HULL_COMPARTMENTS"),
				power: "5",
			},
			augmented_plating: {
				class: "FIGHTER",
				effect: `+2 ${translate("AC")}, -1 ${translate("SPEED")}.`,
				mass: "1#",
				name: translate("AUGMENTED_PLATING"),
				power: "0",
			},
			boarding_countermeasures: {
				class: "FRIGATE",
				effect: translate("BOARDING_COUNTERMEASURES_DESC"),
				mass: "1#",
				name: translate("BOARDING_COUNTERMEASURES"),
				power: "2",
			},
			burst_ecm_generator: {
				class: "FRIGATE",
				effect: translate("BURST_ECM_GENERATOR_DESC"),
				mass: "1#",
				name: translate("BURST_ECM_GENERATOR"),
				power: "2",
			},
			foxer_drones: {
				class: "CRUISER",
				effect: translate("FOXER_DRONES_DESC"),
				mass: "1#",
				name: translate("FOXER_DRONES"),
				power: "2",
			},
			grav_eddy_displacer: {
				class: "FRIGATE",
				effect: translate("GRAV_EDDY_DISPLACER_DESC"),
				mass: "2#",
				name: translate("GRAV_EDDY_DISPLACER"),
				power: "5",
			},
			hardened_polyceramic_overlay: {
				class: "FIGHTER",
				effect: translate("HARDENED_POLYCERAMIC_OVERLAY_DESC"),
				mass: "1#",
				name: translate("HARDENED_POLYCERAMIC_OVERLAY"),
				power: "0",
			},
			planetary_defense_array: {
				class: "FRIGATE",
				effect: translate("PLANETARY_DEFENSE_ARRAY_DESC"),
				mass: "2#",
				name: translate("PLANETARY_DEFENSE_ARRAY"),
				power: "4",
			},
			point_defense_lasers: {
				class: "FRIGATE",
				effect: translate("POINT_DEFENSE_LASERS_DESC"),
				mass: "2#",
				name: translate("POINT_DEFENSE_LASERS"),
				power: "3",
			},
		},
		fittings: {
			advanced_lab: {
				class: "FRIGATE",
				effect: translate("ADVANCED_LAB_DESC"),
				mass: "2",
				name: translate("ADVANCED_LAB"),
				power: "1#",
			},
			advanced_nav_computer: {
				class: "FRIGATE",
				effect: translate("ADVANCED_NAV_COMPUTER_DESC"),
				mass: "0",
				name: translate("ADVANCED_NAV_COMPUTER"),
				power: "1#",
			},
			amphibious_operation: {
				class: "FIGHTER",
				effect: translate("AMPHIBIOUS_OPERATION_DESC"),
				mass: "1#",
				name: translate("AMPHIBIOUS_OPERATION"),
				power: "1",
			},
			armory: {
				class: "FRIGATE",
				effect: translate("ARMORY_DESC"),
				mass: "0",
				name: translate("ARMORY"),
				power: "0",
			},
			atmospheric_configuration: {
				class: "FIGHTER",
				effect: translate("ATMOSPHERIC_CONFIGURATION_DESC"),
				mass: "1#",
				name: translate("ATMOSPHERIC_CONFIGURATION"),
				power: "0",
			},
			auto_targeting_system: {
				class: "FIGHTER",
				effect: translate("AUTO_TARGETING_SYSTEM_DESC"),
				mass: "0",
				name: translate("AUTO_TARGETING_SYSTEM"),
				power: "1",
			},
			automation_support: {
				class: "FIGHTER",
				effect: translate("AUTOMATION_SUPPORT_DESC"),
				mass: "1",
				name: translate("AUTOMATION_SUPPORT"),
				power: "2",
			},
			boarding_tubes: {
				class: "FRIGATE",
				effect: translate("BOARDING_TUBES_DESC"),
				mass: "1",
				name: translate("BOARDING_TUBES"),
				power: "0",
			},
			cargo_lighter: {
				class: "FRIGATE",
				effect: translate("CARGO_LIGHTER_DESC"),
				mass: "2",
				name: translate("CARGO_LIGHTER"),
				power: "0",
			},
			cargo_space: {
				class: "FIGHTER",
				effect: translate("CARGO_SPACE_DESC"),
				mass: "1",
				name: translate("CARGO_SPACE"),
				power: "0",
			},
			cold_sleep_pods: {
				class: "FRIGATE",
				effect: translate("COLD_SLEEP_PODS_DESC"),
				mass: "1",
				name: translate("COLD_SLEEP_PODS"),
				power: "1",
			},
			colony_core: {
				class: "FRIGATE",
				effect: translate("COLONY_CORE_DESC"),
				mass: "2#",
				name: translate("COLONY_CORE"),
				power: "4",
			},
			drill_course_regulator: {
				class: "FRIGATE",
				effect: translate("DRILL_COURSE_REGULATOR_DESC"),
				mass: "1",
				name: translate("DRILL_COURSE_REGULATOR"),
				power: "1#",
			},
			spike_drive_2: {
				class: "FIGHTER",
				effect: translate("SPIKE_DRIVE_2_DESC"),
				mass: "1#",
				name: translate("SPIKE_DRIVE_2"),
				power: "1#",
			},
			spike_drive_3: {
				class: "FIGHTER",
				effect: translate("SPIKE_DRIVE_3_DESC"),
				mass: "2#",
				name: translate("SPIKE_DRIVE_3"),
				power: "2#",
			},
			spike_drive_4: {
				class: "FRIGATE",
				effect: translate("SPIKE_DRIVE_4_DESC"),
				mass: "3#",
				name: translate("SPIKE_DRIVE_4"),
				power: "2#",
			},
			spike_drive_5: {
				class: "FRIGATE",
				effect: translate("SPIKE_DRIVE_5_DESC"),
				mass: "3#",
				name: translate("SPIKE_DRIVE_5"),
				power: "3#",
			},
			spike_drive_6: {
				class: "CRUISER",
				effect: translate("SPIKE_DRIVE_6_DESC"),
				mass: "4#",
				name: translate("SPIKE_DRIVE_6"),
				power: "3#",
			},
			drop_pod: {
				class: "FRIGATE",
				effect: translate("DROP_POD_DESC"),
				mass: "2",
				name: translate("DROP_POD"),
				power: "0",
			},
			emissions_dampers: {
				class: "FIGHTER",
				effect: translate("EMISSIONS_DAMPERS_DESC"),
				mass: "1#",
				name: translate("EMISSIONS_DAMPERS"),
				power: "1#",
			},
			exodus_bay: {
				class: "CRUISER",
				effect: translate("EXODUS_BAY_DESC"),
				mass: "2#",
				name: translate("EXODUS_BAY"),
				power: "1#",
			},
			extended_life_support: {
				class: "FIGHTER",
				effect: translate("EXTENDED_LIFE_SUPPORT_DESC"),
				mass: "1#",
				name: translate("EXTENDED_LIFE_SUPPORT"),
				power: "1#",
			},
			extended_medbay: {
				class: "FRIGATE",
				effect: translate("EXTENDED_MEDBAY_DESC"),
				mass: "1",
				name: translate("EXTENDED_MEDBAY"),
				power: "1",
			},
			extended_store: {
				class: "FIGHTER",
				effect: translate("EXTENDED_STORE_DESC"),
				mass: "1#",
				name: translate("EXTENDED_STORE"),
				power: "0",
			},
			fuel_bunkers: {
				class: "FIGHTER",
				effect: translate("FUEL_BUNKERS_DESC"),
				mass: "1",
				name: translate("FUEL_BUNKERS"),
				power: "0",
			},
			fuel_scoops: {
				class: "FRIGATE",
				effect: translate("FUEL_SCOOPS_DESC"),
				mass: "1#",
				name: translate("FUEL_SCOOPS"),
				power: "2",
			},
			hydroponic_production: {
				class: "CRUISER",
				effect: translate("HYDROPONIC_PRODUCTION_DESC"),
				mass: "2#",
				name: translate("HYDROPONIC_PRODUCTION"),
				power: "1#",
			},
			lifeboats: {
				class: "FRIGATE",
				effect: translate("LIFEBOATS_DESC"),
				mass: "1",
				name: translate("LIFEBOATS"),
				power: "0",
			},
			luxury_cabins: {
				class: "FRIGATE",
				effect: translate("LUXURY_CABINS_DESC"),
				mass: "1#",
				name: translate("LUXURY_CABINS"),
				power: "1",
			},
			mobile_extractor: {
				class: "FRIGATE",
				effect: translate("MOBILE_EXTRACTOR_DESC"),
				mass: "1",
				name: translate("MOBILE_EXTRACTOR"),
				power: "2",
			},
			mobile_factory: {
				class: "CRUISER",
				effect: translate("MOBILE_FACTORY_DESC"),
				mass: "2#",
				name: translate("MOBILE_FACTORY"),
				power: "3",
			},
			precognitive_nav_chamber: {
				class: "FRIGATE",
				effect: translate("PRECOGNITIVE_NAV_CHAMBER_DESC"),
				mass: "0",
				name: translate("PRECOGNITIVE_NAV_CHAMBER"),
				power: "1",
			},
			psionic_anchorpoint: {
				class: "FRIGATE",
				effect: translate("PSIONIC_ANCHORPOINT_DESC"),
				mass: "0",
				name: translate("PSIONIC_ANCHORPOINT"),
				power: "3",
			},
			sensor_mask: {
				class: "FRIGATE",
				effect: translate("SENSOR_MASK_DESC"),
				mass: "0",
				name: translate("SENSOR_MASK"),
				power: "1#",
			},
			ship_bay_fighter: {
				class: "CRUISER",
				effect: translate("SHIP_BAY_FIGHTER_DESC"),
				mass: "2",
				name: translate("SHIP_BAY_FIGHTER"),
				power: "0",
			},
			ship_bay_frigate: {
				class: "CAPITAL",
				effect: translate("SHIP_BAY_FRIGATE_DESC"),
				mass: "4",
				name: translate("SHIP_BAY_FRIGATE"),
				power: "1",
			},
			ships_locker: {
				class: "FRIGATE",
				effect: translate("SHIPS_LOCKER_DESC"),
				mass: "0",
				name: translate("SHIPS_LOCKER"),
				power: "0",
			},
			shiptender_mount: {
				class: "FRIGATE",
				effect: translate("SHIPTENDER_MOUNT_DESC"),
				mass: "1",
				name: translate("SHIPTENDER_MOUNT"),
				power: "1",
			},
			smugglers_hold: {
				class: "FIGHTER",
				effect: translate("SMUGGLERS_HOLD_DESC"),
				mass: "1",
				name: translate("SMUGGLERS_HOLD"),
				power: "0",
			},
			survey_sensor_array: {
				class: "FRIGATE",
				effect: translate("SURVEY_SENSOR_ARRAY_DESC"),
				mass: "1",
				name: translate("SURVEY_SENSOR_ARRAY"),
				power: "2",
			},
			system_drive: {
				class: "FIGHTER",
				effect: translate("SYSTEM_DRIVE_DESC"),
				mass: "-2#",
				name: translate("SYSTEM_DRIVE"),
				power: "-1#",
			},
			teleportation_pads: {
				class: "FRIGATE",
				effect: translate("TELEPORTATION_PADS_DESC"),
				mass: "1",
				name: translate("TELEPORTATION_PADS"),
				power: "1",
			},
			tractor_beams: {
				class: "FRIGATE",
				effect: translate("TRACTOR_BEAMS_DESC"),
				mass: "1",
				name: translate("TRACTOR_BEAMS"),
				power: "2",
			},
			vehicle_transport_fittings: {
				class: "FRIGATE",
				effect: translate("VEHICLE_TRANSPORT_FITTINGS_DESC"),
				mass: "1#",
				name: translate("VEHICLE_TRANSPORT_FITTINGS"),
				power: "0",
			},
			workshop: {
				class: "FRIGATE",
				effect: translate("WORKSHOP_DESC"),
				mass: "0.5#",
				name: translate("WORKSHOP"),
				power: "1",
			},
		},
		hulltypes: {
			battleship: {
				ship_ac: "16",
				ship_armor: "20",
				ship_class: "CAPITAL",
				ship_crew_max: "1000",
				ship_crew_min: "200",
				ship_hardpoints_max: "15",
				ship_hp_max: "100",
				ship_mass_max: "50",
				ship_power_max: "75",
				ship_speed: "0",
			},
			bulk_freighter: {
				ship_ac: "11",
				ship_armor: "0",
				ship_class: "CRUISER",
				ship_crew_max: "40",
				ship_crew_min: "10",
				ship_hardpoints_max: "2",
				ship_hp_max: "40",
				ship_mass_max: "25",
				ship_power_max: "15",
				ship_speed: "0",
			},
			carrier: {
				ship_ac: "14",
				ship_armor: "10",
				ship_class: "CAPITAL",
				ship_crew_max: "1500",
				ship_crew_min: "300",
				ship_hardpoints_max: "4",
				ship_hp_max: "75",
				ship_mass_max: "100",
				ship_power_max: "50",
				ship_speed: "0",
			},
			corvette: {
				ship_ac: "13",
				ship_armor: "10",
				ship_class: "FRIGATE",
				ship_crew_max: "40",
				ship_crew_min: "10",
				ship_hardpoints_max: "6",
				ship_hp_max: "40",
				ship_mass_max: "15",
				ship_power_max: "15",
				ship_speed: "2",
			},
			fleet_cruiser: {
				ship_ac: "14",
				ship_armor: "15",
				ship_class: "CRUISER",
				ship_crew_max: "200",
				ship_crew_min: "50",
				ship_hardpoints_max: "10",
				ship_hp_max: "60",
				ship_mass_max: "30",
				ship_power_max: "50",
				ship_speed: "1",
			},
			free_merchant: {
				ship_ac: "14",
				ship_armor: "2",
				ship_class: "FRIGATE",
				ship_crew_max: "6",
				ship_crew_min: "1",
				ship_hardpoints_max: "2",
				ship_hp_max: "20",
				ship_mass_max: "15",
				ship_power_max: "10",
				ship_speed: "3",
			},
			heavy_frigate: {
				ship_ac: "15",
				ship_armor: "10",
				ship_class: "FRIGATE",
				ship_crew_max: "120",
				ship_crew_min: "30",
				ship_hardpoints_max: "8",
				ship_hp_max: "50",
				ship_mass_max: "20",
				ship_power_max: "25",
				ship_speed: "1",
			},
			large_station: {
				ship_ac: "17",
				ship_armor: "20",
				ship_class: "CAPITAL",
				ship_crew_max: "1000",
				ship_crew_min: "100",
				ship_hardpoints_max: "30",
				ship_hp_max: "120",
				ship_mass_max: "75",
				ship_power_max: "125",
				ship_speed: "",
			},
			patrol_boat: {
				ship_ac: "14",
				ship_armor: "5",
				ship_class: "FRIGATE",
				ship_crew_max: "20",
				ship_crew_min: "5",
				ship_hardpoints_max: "4",
				ship_hp_max: "25",
				ship_mass_max: "10",
				ship_power_max: "15",
				ship_speed: "4",
			},
			small_station: {
				ship_ac: "11",
				ship_armor: "5",
				ship_class: "CRUISER",
				ship_crew_max: "200",
				ship_crew_min: "20",
				ship_hardpoints_max: "10",
				ship_hp_max: "120",
				ship_mass_max: "40",
				ship_power_max: "50",
				ship_speed: "",
			},
			strike_fighter: {
				ship_ac: "16",
				ship_armor: "5",
				ship_class: "FIGHTER",
				ship_crew_max: "1",
				ship_crew_min: "1",
				ship_hardpoints_max: "1",
				ship_hp_max: "8",
				ship_mass_max: "2",
				ship_power_max: "5",
				ship_speed: "5",
			},
			shuttle: {
				ship_ac: "11",
				ship_armor: "0",
				ship_class: "FIGHTER",
				ship_crew_max: "10",
				ship_crew_min: "1",
				ship_hardpoints_max: "1",
				ship_hp_max: "15",
				ship_mass_max: "5",
				ship_power_max: "3",
				ship_speed: "3",
			},
		},
		weapons: {
			charged_particle_caster: {
				class: "FRIGATE",
				damage: "3d6",
				hardpoints: "2",
				name: translate("CHARGED_PARTICLE_CASTER"),
				mass: "1",
				power: "10",
				qualities: `${translate("AP")} 15, ${translate("CLUMSY")}`,
			},
			flak_emitter_battery: {
				class: "FRIGATE",
				damage: "2d6",
				hardpoints: "1",
				name: translate("FLAK_EMITTER_BATTERY"),
				mass: "3",
				power: "5",
				qualities: `${translate("AP")} 10, ${translate("FLAK")}`,
			},
			fractal_impact_charge: {
				ammo: "4",
				class: "FIGHTER",
				damage: "2d6",
				hardpoints: "1",
				name: translate("FRACTAL_IMPACT_CHARGE"),
				mass: "1",
				power: "5",
				qualities: `${translate("AP")} 15`,
			},
			gravcannon: {
				class: "CRUISER",
				damage: "4d6",
				hardpoints: "3",
				name: translate("GRAVCANNON"),
				mass: "4",
				power: "15",
				qualities: `${translate("AP")} 20`,
			},
			lightning_charge_mantle: {
				class: "CAPITAL",
				damage: "1d20",
				hardpoints: "2",
				name: translate("LIGHTNING_CHARGE_MANTLE"),
				mass: "5",
				power: "15",
				qualities: `${translate("AP")} 5, ${translate("CLOUD")}`,
			},
			mag_spike_array: {
				ammo: "5",
				class: "FRIGATE",
				damage: "2d6+2",
				hardpoints: "2",
				name: translate("MAG_SPIKE_ARRAY"),
				mass: "2",
				power: "5",
				qualities: `${translate("AP")} 10, ${translate("FLAK")}`,
			},
			mass_cannon: {
				ammo: "4",
				class: "CAPITAL",
				damage: "2d20",
				hardpoints: "4",
				name: translate("MASS_CANNON"),
				mass: "5",
				power: "10",
				qualities: `${translate("AP")} 20`,
			},
			multifocal_laser: {
				class: "FIGHTER",
				damage: "1d4",
				hardpoints: "1",
				name: translate("MULTIFOCAL_LASER"),
				mass: "1",
				power: "5",
				qualities: `${translate("AP")} 20`,
			},
			nuclear_missiles: {
				ammo: "5",
				class: "FRIGATE",
				damage: "",
				hardpoints: "2",
				name: translate("NUCLEAR_MISSILES"),
				mass: "1",
				power: "5",
				qualities: "",
			},
			plasma_beam: {
				class: "FRIGATE",
				damage: "3d6",
				hardpoints: "2",
				name: translate("PLASMA_BEAM"),
				mass: "2",
				power: "5",
				qualities: `${translate("AP")} 10`,
			},
			polyspectral_mes_beam: {
				class: "FIGHTER",
				damage: "2d4",
				hardpoints: "1",
				name: translate("POLYSPECTRAL_MES_BEAM"),
				mass: "1",
				power: "5",
				qualities: `${translate("AP")} 25`,
			},
			reaper_battery: {
				class: "FIGHTER",
				damage: "3d4",
				hardpoints: "1",
				name: translate("REAPER_BATTERY"),
				mass: "1",
				power: "4",
				qualities: translate("CLUMSY"),
			},
			sandthrower: {
				class: "FIGHTER",
				damage: "2d4",
				hardpoints: "1",
				name: translate("SANDTHROWER"),
				mass: "1",
				power: "3",
				qualities: translate("FLAK"),
			},
			singularity_gun: {
				class: "CAPITAL",
				damage: "5d20",
				hardpoints: "5",
				name: translate("SINGULARITY_GUN"),
				mass: "10",
				power: "25",
				qualities: `${translate("AP")} 25`,
			},
			smart_cloud: {
				class: "CRUISER",
				damage: "3d10",
				hardpoints: "2",
				name: translate("SMART_CLOUD"),
				mass: "5",
				power: "10",
				qualities: `${translate("CLOUD")}, ${translate("CLUMSY")}`,
			},
			spike_inversion_projector: {
				class: "CRUISER",
				damage: "3d8",
				hardpoints: "3",
				name: translate("SPIKE_INVERSION_PROJECTOR"),
				mass: "3",
				power: "10",
				qualities: `${translate("AP")} 15`,
			},
			spinal_beam_cannon: {
				class: "CRUISER",
				damage: "3d10",
				hardpoints: "3",
				name: translate("SPINAL_BEAM_CANNON"),
				mass: "5",
				power: "10",
				qualities: `${translate("AP")} 15, ${translate("CLUMSY")}`,
			},
			torpedo_launcher: {
				ammo: "4",
				class: "FRIGATE",
				damage: "3d8",
				hardpoints: "1",
				name: translate("TORPEDO_LAUNCHER"),
				mass: "3",
				power: "10",
				qualities: `${translate("AP")} 20`,
			},
			vortex_tunnel_inductor: {
				class: "CAPITAL",
				damage: "3d20",
				hardpoints: "4",
				name: translate("VORTEX_TUNNEL_INDUCTOR"),
				mass: "10",
				power: "20",
				qualities: `${translate("AP")} 20, ${translate("CLUMSY")}`,
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
			if (String(values[k]) === String(setting[k])) delete setting[k];
		});
		setAttrs(setting, ...rest);
	};
	const fillRepeatingSectionFromData = (sName, data, callback) => {
		// Populates the repeating section repeating_${SName} with new
		// rows from the data array. Every entry of the array is expected
		// to be an object, and its key/value pairs will be written into
		// the repeating section as a new row.
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
		const setting = data.map(o => {
				const newID = getRowID();
				return Object.entries(o).reduce((m, [key, value]) => {
					m[`repeating_${sName}_${newID}_${key}`] = String(value);
					return m;
				}, {});
			}).reduce((m, o) => Object.assign(m, o), {});
		setAttrs(setting, {}, callback);
	};

	/* Calculations */
	const calculateSaves = () => {
		getAttrs([...attributes.map(attr => `${attr}_mod`), "level",
			"homebrew_luck_save", "save_physical", "save_mental", "save_evasion", "save_luck"], v => {
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
		getAttrs([...effortAttributes, "psionics_total_effort"], v => {
			const attrBonus = Math.max(parseInt(v.wisdom_mod), parseInt(v.constitution_mod)) || 0,
				skillBonus = Math.max(...skills.psionic.map(x => parseInt(v[`skill_${x}`]) || 0));
			const psionics_total_effort = 1 + attrBonus + skillBonus + (parseInt(v.psionics_extra_effort) || 0);
			mySetAttrs({ psionics_total_effort }, v);
		});
	};

	const calculateAC = () => {
		getAttrs(["dexterity_mod", "armor_ac", "innate_ac", "npc", "AC"], v => {
			const AC = Math.max(parseInt(v.armor_ac) || 0, parseInt(v.innate_ac) || 0) +
				(parseInt(v.dexterity_mod) || 0);
			if (v.npc != "1") mySetAttrs({AC}, v);
		});
	};

	const calculateMaxStrain = () => {
		getAttrs(["constitution", "strain_max"], v => {
			mySetAttrs({
				strain_max: v.constitution
			}, v);
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
				[`${attr}_mod`]: String(mod + (parseInt(v[`${attr}_bonus`]) || 0))
			};

			mySetAttrs(setting, v, {
				silent: false
			}, () => {
				calculateSaves();
				generateWeaponDisplay();
				if (attr === "dexterity") calculateAC();
			});
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
				}
				else {
					setAttrs({
						xp_next: 93 + ((v.level - 9) * 24)
					});
				}
			}
			else if (v.setting_xp_scheme === "money") {
				setAttrs({
					xp_next: 2500 * (2 * v.level)
				});
			}
		});
	};

	const calculateGearReadiedStowed = () => {
		getSectionIDs("repeating_gear", gearIDs => {
			getSectionIDs("repeating_weapons", weaponIDs => {
				const attrs = [
					...gearIDs.map(id => `repeating_gear_${id}_gear_encumbrance`),
					...gearIDs.map(id => `repeating_gear_${id}_gear_status`),
					...weaponIDs.map(id => `repeating_weapons_${id}_weapon_encumbrance`),
					...weaponIDs.map(id => `repeating_weapons_${id}_weapon_status`),
					"armor_encumbrance",
					"gear_readied", "gear_readied_max", "gear_readied_over",
					"gear_stowed", "gear_stowed_max", "gear_stowed_over",
				];
				getAttrs(attrs, v => {
					const [gear_readied, gear_stowed] = weaponIDs.reduce((m, id) => {
						if (v[`repeating_weapons_${id}_weapon_status`] === "READIED")
							m[0] += parseInt(v[`repeating_weapons_${id}_weapon_encumbrance`]) || 0;
						else if (v[`repeating_weapons_${id}_weapon_status`] === "STOWED")
							m[1] += parseInt(v[`repeating_weapons_${id}_weapon_encumbrance`]) || 0;
						return m;
					}, gearIDs.reduce((m, id) => {
						if (v[`repeating_gear_${id}_gear_status`] === "READIED")
							m[0] += parseInt(v[`repeating_gear_${id}_gear_encumbrance`]) || 0;
						else if (v[`repeating_gear_${id}_gear_status`] === "STOWED")
							m[1] += parseInt(v[`repeating_gear_${id}_gear_encumbrance`]) || 0;
						return m;
					}, [parseInt(v.armor_encumbrance) || 0, 0]));
					const gear_readied_over = (gear_readied > parseInt(v.gear_readied_max)) ? "1" : "0";
					const gear_stowed_over = (gear_stowed > parseInt(v.gear_stowed_max)) ? "1" : "0";
					const setting = {gear_readied, gear_stowed, gear_readied_over, gear_stowed_over};

					mySetAttrs(setting, v, {silent: true});
				});
			});
		});
	};

	const calculateGearReadiedStowedMax = () => {
		getAttrs(["strength", "gear_readied_max", "gear_stowed_max"], v => {
			if (v.strength)
				mySetAttrs({
					gear_readied_max: Math.floor((parseInt(v.strength) || 0) / 2),
					gear_stowed_max: v.strength,
				}, v);
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
		const formula = (sName === "weapons") ? "[[-1 - @{weapon_burst}]]" : "-1" ;
		getSectionIDs(`repeating_${sName}`, idArray => {
			getAttrs([
				"setting_use_ammo",
				...idArray.map(id => `repeating_${sName}_${id}_weapon_use_ammo`),
				...idArray.map(id => `repeating_${sName}_${id}_weapon_api`)
				], v => {
				const setting = idArray.reduce((m, id) => {
					m[`repeating_${sName}_${id}_weapon_api`] =
						(v.setting_use_ammo === "1" && v[`repeating_${sName}_${id}_weapon_use_ammo`] !== "0") ?
						`\n!modattr --mute --charid @{character_id} --repeating_${sName}_${id}_weapon_ammo|${formula}`
						: "";
					return m;
				}, {});
				mySetAttrs(setting, v, { silent: true });
			});
		});
	};

	/**
	 * Validations
	 */
	const validateTab = () => {
		getAttrs(["tab", "npc"], v => {
			if (v.tab === "character" && v.npc === "1") setAttrs({tab: "npc"});
			if (v.tab === "npc" && v.npc === "0") setAttrs({tab: "character"});
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

			if (strain !== currentStrain) setAttrs({ strain });
		});
	};

	const validateWeaponSkills = (ids) => {
		// Makes sure that the select for the weapon skill is never in an invalid state.
		const prefixes = (ids && ids.map(id => `repeating_weapons_${id}`)) || ["repeating_weapons"];
		getAttrs(["homebrew_skill_list", ...prefixes.map(p => `${p}_weapon_skill_bonus`)], v => {
			const revisedList = ["@{skill_shoot}", "@{skill_punch}", "@{skill_stab}", "@{skill_telekinesis}", "0"],
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
			if (v.npc_stat_block && statblockData[v.npc_stat_block]) {
				const [
					HD, AC, npc_attack_bonus, damage, attacks, npc_move,
					npc_morale, npc_skills, npc_saves, armor_type
				] = statblockData[v.npc_stat_block];

				const setting = { AC, npc_attack_bonus, npc_move, npc_morale, npc_skills, npc_saves};

				if (armor_type) setting.npc_armor_type = armor_type;
				if (HD.includes("hp")) setting.HP = HD.replace("hp", "");
				else setting.npc_hd = HD;

				setAttrs(setting);

				if(damage !== "Unarmed") {
					const newAttack = {
						attack_ab: npc_attack_bonus,
						attack_damage: damage,
						attack_name: translate("ATTACK"),
						attack_number: attacks
					};
					fillRepeatingSectionFromData("npc-attacks", [ newAttack ]);
				}
			}
		});
	};
	const addNPCAttackBonus = () => {
		getAttrs(["repeating_npc-attacks_attack_ab", "npc_attack_bonus"], v => {
			if (String(v["repeating_npc-attacks_attack_ab"]) === "0") {
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
						const macro = [2,3,4].map(n => {
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

	/* Menu builder */
	const buildSaveMenu = () => {
		getAttrs(["homebrew_luck_save", "macro_saves"], v => {
			const macro_saves = buildLink(`^{PHYSICAL} (v@{save_physical})`, ("save_physical")) + " " +
				buildLink(`^{MENTAL} (v@{save_mental})`, ("save_mental")) + " " +
				buildLink(`^{EVASION} (v@{save_evasion})`, ("save_evasion"), v.homebrew_luck_save !== "1") +
				((v.homebrew_luck_save === "1") ?
					(" " + buildLink(`^{LUCK} (v@{save_luck})`, ("save_luck"), true)) : "");
			mySetAttrs({ macro_saves }, v);
		});
	};
	const buildSkillMenu = () => {
		getSectionIDs("repeating_skills", idArray => {
			const namedSkills = [
				"culture_one",
				"culture_two",
				"culture_three",
				"culture_alien",
				"profession"
			];
			const sourceAttrs = [
				...skills.revised.map(sk => `skill_${sk}`),
				...skills.first.map(sk => `skill_${sk}`),
				"homebrew_skill_list",
				"macro_skills",
				...idArray.map(id => `repeating_skills_${id}_skill_name`),
				...idArray.map(id => `repeating_skills_${id}_skill`),
			];
			getAttrs(sourceAttrs, v => {
				const skillList = (v.homebrew_skill_list === "revised") ? skills.revised :
					((v.homebrew_skill_list === "first") ? skills.first : []);

				const macro_skills = [
					...skillList.map((skill, index) => {
						if (namedSkills.includes(skill))
							return buildLink(`@{skill_${skill}_name} (${sign(v[`skill_${skill}`])})`, `skill_${skill}`);
						else return buildLink(`^{${skill.toUpperCase()}} (${sign(v[`skill_${skill}`])})`,
							`skill_${skill}`, (index + 1 === skillList.length) && idArray.length === 0);
					}),
					...idArray.map((id, index) => {
						const prefix = `repeating_skills_${id}_skill`;
						return buildLink(`${v[`${prefix}_name`]} (${sign(v[prefix])})`, prefix, index + 1 === idArray.length);
					})
				].join(" ");
				mySetAttrs({ macro_skills }, v);
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
					const macro_psionics = [
							...skills.psionic.map((skill, index) => {
								return buildLink(`^{${skill.toUpperCase()}} (${sign(v[`skill_${skill}`])})`, `skill_${skill}`, index === 5 && skillIDs.length === 0);
							}),
							...skillIDs.map(id => {
								const prefix = `repeating_psychic-skills_${id}_skill`;
								return buildLink(`${v[`${prefix}_name`]} (${sign(v[prefix])})`, prefix);
							})
						].join(" ") + (techniqueIDs.length ? "\n\n" : "") +
						techniqueIDs.map(id => buildLink(v[`repeating_techniques_${id}_technique_name`],
							`repeating_techniques_${id}_technique`)).join(" ");
					mySetAttrs({ macro_psionics }, v);
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
					const macro_magic = [
							buildLink(`^{MAGIC} (${sign(v.skill_magic)})`, ("skill_magic"), skillIDs.length === 0 && !v.skill_magic2_name),
							(v.skill_magic2_name ? buildLink(`@{skill_magic2_name} (${sign(v.skill_magic2)})`, ("skill_magic2"), skillIDs.length === 0) : ""),
							...skillIDs.map(id => {
								const prefix = `repeating_magic-skills_${id}_skill`;
								return buildLink(`${v[`${prefix}_name`]} (${sign(v[prefix])})`, prefix);
							})
						].join(" ") + (spellIDs.length ? "\n\n" : "") +
						spellIDs.map(id => buildLink(v[`repeating_spells_${id}_spell_name`], `repeating_spells_${id}_spell`)).join(" ");
					mySetAttrs({ macro_magic }, v);
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
				mySetAttrs({ macro_ship_weapons }, v);
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
				mySetAttrs({ macro_npc_attacks }, v);
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
						`repeating_npc-abilities_${id}_ability`,index + 1 === idArray.length);
				}).join(" ");
				mySetAttrs({ macro_npc_abilities }, v);
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
				`[**^{SAVES}** v@{npc_saves},](~npc_save) [**^{SKILLS}** +@{npc_skills},](~npc_skill) `,
				`[**^{MORALE}** v@{npc_morale}](~npc_morale)\n`,
				`[**^{INITIATIVE}** d8,](~npc_initiative) [**^{REACTION}** 2d6,](~npc_reaction) `,
				`**Move** @{npc_move}\n`
			];
		if (v.macro_npc_attacks) macroList.push("\n**Attacks:** @{macro_npc_attacks}");
		if (v.macro_npc_abilities) macroList.push("\n**Abilities:** @{macro_npc_abilities}");
		mySetAttrs({ macro_statblock: macroList.join("")}, v);
		});
	};


	/* Translations */
	const setTranslatedDefaults = () => {
		const specialSkills = {
			skill_culture_alien_name: { trans: `${translate("CULTURE_ALIEN")}/`, default: "Culture/Alien/" },
			skill_culture_one_name: { trans: `${translate("CULTURE")}/`, default: "Culture/" },
			skill_culture_two_name: { trans: `${translate("CULTURE")}/`, default: "Culture/" },
			skill_culture_three_name: { trans: `${translate("CULTURE")}/`, default: "Culture/" },
			skill_profession_name: { trans: `${translate("PROFESSION")}/`, default: "Profession/"},
		};
		getAttrs([...Object.keys(specialSkills), "homebrew_skill_list"], v => {
			if (v.homebrew_skill_list === "first") {
				const setting = {};
				Object.entries(specialSkills).forEach(([name, data]) => {
					if (v[name] === data.default && v[name] !== data.trans) setting[name] = data.trans;
				});
				setAttrs(setting);
			}
		});
	};
	const handleAttributeQueries = () => {
		// Attribute query magic to set the global query variables according to
		// translations and the state of the setting_skill_query attribute.
		const attrQueries = attributes.map(attr => {
			const translated = translate(attr.toUpperCase());
			return `${translated},+ @{${attr}_mod}[${translated}]]]&#125;&#125; ` +
				`{{attribute= + ${translate(`${attr.toUpperCase()}_SHORT`)}&#125;&#125;`;
		}).concat([`${translate("NONE")},]]&#125;&#125;`]);

		getAttrs(["attribute_query_none", "setting_skill_query",
			...attributes.map(a => `attribute_query_${a.slice(0,3)}`)], v => {

			if (v.setting_skill_query === "hover" || v.setting_skill_query === "hide") {
				mySetAttrs({
					attribute_query_str: `+ @{strength_mod}[${translate("STRENGTH")}]]]}} {{attribute= + ${translate(`STRENGTH_SHORT`)}}}`,
					attribute_query_dex: `+ @{dexterity_mod}[${translate("DEXTERITY")}]]]}} {{attribute= + ${translate(`DEXTERITY_SHORT`)}}}`,
					attribute_query_con: `+ @{constitution_mod}[${translate("CONSTITUTION")}]]]}} {{attribute= + ${translate(`CONSTITUTION_SHORT`)}}}`,
					attribute_query_int: `+ @{intelligence_mod}[${translate("INTELLIGENCE")}]]]}} {{attribute= + ${translate(`INTELLIGENCE_SHORT`)}}}`,
					attribute_query_wis: `+ @{wisdom_mod}[${translate("WISDOM")}]]]}} {{attribute= + ${translate(`WISDOM_SHORT`)}}}`,
					attribute_query_cha: `+ @{charisma_mod}[${translate("CHARISMA")}]]]}} {{attribute= + ${translate(`CHARISMA_SHORT`)}}}`,
					attribute_query_none: `]]}}`,
				}, v);
			}
			else if (v.setting_skill_query === "query") {
				mySetAttrs({
					attribute_query_str: `?{${translate("ATTRIBUTE")}|${[attrQueries[0], ...attrQueries.slice(1)].join("|")}}`,
					attribute_query_dex: `?{${translate("ATTRIBUTE")}|${[attrQueries[1], attrQueries[0], ...attrQueries.slice(2)].join("|")}}`,
					attribute_query_con: `?{${translate("ATTRIBUTE")}|${[attrQueries[2], ...attrQueries.slice(0,2), ...attrQueries.slice(3)].join("|")}}`,
					attribute_query_int: `?{${translate("ATTRIBUTE")}|${[attrQueries[3], ...attrQueries.slice(0,3), ...attrQueries.slice(4)].join("|")}}`,
					attribute_query_wis: `?{${translate("ATTRIBUTE")}|${[attrQueries[4], ...attrQueries.slice(0,4), ...attrQueries.slice(5)].join("|")}}`,
					attribute_query_cha: `?{${translate("ATTRIBUTE")}|${[attrQueries[5], ...attrQueries.slice(0,5), attrQueries[6]].join("|")}}`,
					attribute_query_none: `?{${translate("ATTRIBUTE")}|${[attrQueries[6], ...attrQueries.slice(0,6)].join("|")}}`,
				}, v);
			}

		});
	};
	const handleModifierQuery = () => {
		getAttrs(["modifier_query", "setting_modifier_query"], v => {
			if (String(v.setting_modifier_query) === "1") {
				mySetAttrs({
					modifier_query: `+ ?{${translate("MODIFIER")}|0}[${translate("MODIFIER_SHORT")}]`,
				}, v);
			}
			else mySetAttrs({modifier_query: " "}, v);
		});
	};
	const setTranslatedQueries = () => {
		getAttrs(["burst_query", "extra_hp_query", "translation_numdice", "proficient_query", "skill_name_query"], v => {
			const setting = {
				burst_query: `?{${translate("BURST")}|${translate("YES")},+ 2[${translate("BURST")}]|${translate("NO")},&` + `#` + `32;}`,
				extra_hp_query: `?{${translate("EXTRA_HP_QUERY")}|0}[${translate("BONUS")}]`,
				proficient_query: `?{${translate("PROFICIENT")}|${translate("YES")}, @{npc_skills}|${translate("NO")}, 0}[${translate("SKILL")}]`,
				skill_name_query: `?{${translate("SKILL_NAME")}|${translate("SKILL")}}`,
				translation_numdice: translate("NUMBER_OF_DICE")
			};
			mySetAttrs(setting, v);
		});
	};

	/* Ship Code */
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

	/**
	 * Migrations
	 */
	const handleUpgrade = () => {
		getAttrs(["character_sheet"], v => {
			if (!v.character_sheet || v.character_sheet.indexOf(sheetName) !== 0)
				upgradeFrom162();
			else if (v.character_sheet.slice(32) !== sheetVersion)
				upgradeSheet(v.character_sheet.slice(32), true);
		});
	};

	const upgradeSheet = (version, firstTime = false, finalTime = false) => {
		// Any version upgrade code should go here
		const performUpgrade = (version) => {
			const [major, minor] = version.split(".").map(x => parseInt(x));
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
					buildSkillMenu();
					buildPsionicsMenu();
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
							if (v[`repeating_weapons_${id}_weapon_ammo`] &&
									v[`repeating_weapons_${id}_weapon_ammo`] !== "0")
								m[`repeating_weapons_${id}_weapon_use_ammo`] = "{{ammo=[[0@{weapon_ammo} - (1 @{weapon_burst})]] / @{weapon_ammo|max}}}";
							return m;
						}, {});
						setAttrs(setting, {}, upgradeFunction);
					});
				});
				getSectionIDs("repeating_ship-weapons", idArray => {
					getAttrs(idArray.map(id => `repeating_ship-weapons_${id}_weapon_ammo_max`), v => {
						const setting = idArray.reduce((m, id) => {
							if (v[`repeating_ship-weapons_${id}_weapon_ammo_max`] &&
								v[`repeating_ship-weapons_${id}_weapon_ammo_max`] !== "0")
								m[`repeating_ship-weapons_${id}_weapon_use_ammo`] =
									"{{ammo=[[@{weapon_ammo} - 1]] / @{weapon_ammo_max}}}";
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
					console.log(`Migrating psionic technique #${i}: ${technique}.`);
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
					console.log(`Migrating cyberware #${i}: ${cyberware}.`);
				}
			}
			setAttrs(setting);
		});
		getAttrs(["languages"], v => {
			if (v.languages) {
				console.log("Language migration started.");
				const setting = {};

				v.languages.split(/\r?\n/).filter(l => !!l).forEach(language => {
					const newRowId = generateRowID();
					setting[`repeating_languages_${newRowId}_language`] = language;
					console.log(`Language migrated: ${language}.`);
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
				if (v[oldName] && v[oldName] !== "" && String(v[newName]) !== String(v[oldName]))
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
			if (String(v.tab) === "1" || String(v.tab) === "4") setting.tab = "character";
			if (String(v.tab) === "2") setting.tab = "ship";
			if (String(v.tab) === "3") {
				setting.tab = "character";
				setting.npc = "1";
			}

			// NPC attack
			if (v.damage) {
				const newAttack = [{
					attack_damage: v.damage,
					attack_name: translate("ATTACK"),
					attack_number: v.npc_attacks || "1"
				}];
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
				setAttrs(setting, {silent: false}, upgradeFunction);
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
				setAttrs(setting, {silent: false}, upgradeFunction);
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
				setAttrs(setting, {silent: false}, upgradeFunction);
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
				setAttrs(setting, {silent: false}, upgradeFunction);
			});
		});
		// convert gear status
		getSectionIDs("repeating_gear", idArray => {
			getAttrs(idArray.map(id => `repeating_gear_${id}_gear_readied`), v => {
				const setting = idArray.reduce((m, id) => {
					if (String(v[`repeating_gear_${id}_gear_readied`]) === "1")
						m[`repeating_gear_${id}_gear_status`] = "readied";
					else if (String(v[`repeating_gear_${id}_gear_readied`]) === "2")
						m[`repeating_gear_${id}_gear_status`] = "stowed";
					return m;
				}, {});
				setAttrs(setting, {silent: false}, upgradeFunction);
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
	attributes.forEach(attr => on(`change:${attr} change:${attr}_bonus`, () => calculateMod(attr)));

	on(weaponDisplayEvent, generateWeaponDisplay);

	on("change:repeating_weapons:weapon_name", () => validateWeaponSkills());
	on("change:homebrew_skill_list", () => getSectionIDs("repeating_weapons", validateWeaponSkills));

	on("change:strain change:strain_perm", validateStrain);
	on("change:constitution", calculateMaxStrain);

	on("change:level", calculateSaves);

	on(effortAttributes.map(x => `change:${x}`).join(" "), calculateEffort);

	on("change:armor_ac change:innate_ac", calculateAC);

	on("change:strength", calculateGearReadiedStowedMax);
	on("change:repeating_gear remove:repeating_gear change:armor_encumbrance change:repeating_weapons" +
		" remove:repeating_weapons change:gear_readied change:gear_stowed", calculateGearReadiedStowed);

	on("change:level change:setting_xp_scheme", calculateNextLevelXP);

	on("change:setting_super_type", validateSuperTab);

	/* Character chat macros */
	on("change:homebrew_luck_save", buildSaveMenu);

	on([
		...skills.revised.map(x => `change:skill_${x}`),
		...skills.first.map(x => `change:skill_${x}`),
		"change:homebrew_skill_list",
		"change:repeating_skills",
		"remove:repeating_skills",
	].join(" "), buildSkillMenu);

	on([...skills.psionic.map(x => `change:skill_${x}`),
		"change:setting_super_type change:repeating_techniques remove:repeating_techniques",
		"change:repeating_psychic-skills remove:repeating_psychic-skills"
	].join(" "), buildPsionicsMenu);

	on("change:setting_super_type change:repeating_spells remove:repeating_spells " +
		"change:repeating_magic-skills remove:repeating_magic-skills " +
		"change:skill_magic change:skill_magic2_name change:skill_magic2", buildMagicMenu);


	/* Ship sheet */
	on(shipStatEvent, calculateShipStats);
	on("change:repeating_ship-weapons:weapon_name change:repeating_ship-weapons:weapon_attack_bonus " +
		"remove:repeating_ship-weapons", buildShipWeaponsMenu);


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
