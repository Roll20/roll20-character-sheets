/* global getAttrs, setAttrs, getSectionIDs, generateRowID, on ,removeRepeatingRow, _, getTranslationByKey */
(function () {
	const sheetVersion = "2.0.0";
	const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
	const effortAttributes = ["wisdom_mod", "constitution_mod", "psionics_extra_effort",
		"skill_biopsionics", "skill_precognition", "skill_telepathy", "skill_teleportation",
		"skill_telekinesis", "skill_metapsionics"
	];
	const weaponSkills = [
		"skill_shoot", "skill_punch", "skill_stab", "skill_combat_energy",
		"skill_combat_gunnery", "skill_combat_primitive", "skill_combat_projectile",
		"skill_combat_psitech", "skill_combat_unarmed", "skill_telekinesis"
	];
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
		"barbarian_hero": ["6", "16", "8", "Weapon+3", "1", "10m", "11", "3", "12", "PRIMITIVE"],
		"barbarian_tribal": ["1", "12", "2", "Weapon", "1", "10m", "8", "1", "15", "PRIMITIVE"],
		"civilian_security_bot": ["1", "15", "1", "1d8[Stun]", "1", "10m", "12", "1", "15"],
		"companion_bot": ["1", "12", "0", "1d2[Unarmed]", "1", "10m", "6", "1", "15"],
		"elite_fighter": ["3", "16", "4", "Weapon+1", "1", "10m", "10", "2", "14", "COMBAT"],
		"gang_boss": ["3", "14", "4", "Weapon+1", "1", "10m", "9", "2", "15"],
		"gang_member": ["1", "12", "1", "Weapon", "1", "10m", "7", "1", "15"],
		"geneengineered_killer": ["4", "16", "5", "Weapon+1", "1", "15m", "10", "2", "13"],
		"geneengineered_murder_beast": ["10", "18", "10", "1d10", "4", "20m", "12", "3", "10"],
		"greater_lone_predator": ["5", "16", "6", "1d10", "2", "10m", "9", "2", "12"],
		"heavy_warbot": ["6", "18", "8", "2d8[Plasma]", "2", "15m", "10", "2", "12"],
		"heroic_fighter": ["6", "16", "8", "Weapon+3", "1", "10m", "11", "3", "12", "COMBAT"],
		"industrial_work_bot": ["2", "15", "0", "1d10[Crush]", "1", "5", "8", "1", "14"],
		"janitor_bot": ["1", "14", "0", "Unarmed", "1", "5m", "8", "1", "15"],
		"large_aggressive_prey_animal": ["5", "13", "4", "1d10", "1", "15m", "8", "1", "12"],
		"large_pack_hunter": ["2", "14", "2", "1d6", "1", "15m", "9", "1", "14"],
		"legendary_fighter": ["10", "20", "12", "Weapon+4", "2", "10m", "12", "5", "10", "POWERED"],
		"lesser_lone_predator": ["3", "14", "4", "1d8", "2", "15m", "8", "2", "14"],
		"martial_human": ["1", "10", "1", "Weapon", "1", "10m", "8", "1", "15"],
		"military_elite": ["3", "16", "4", "Weapon+1", "1", "10m", "10", "2", "14", "COMBAT"],
		"military_soldier": ["1", "16", "1", "Weapon", "1", "10m", "9", "1", "15", "COMBAT"],
		"normal_human": ["1", "10", "0", "Unarmed", "1", "10m", "6", "1", "15"],
		"peaceful_human": ["1", "10", "0", "Unarmed", "1", "10m", "6", "1", "15"],
		"pirate_king": ["7", "18", "9", "Weapon+2", "1", "10m", "11", "3", "12", "POWERED"],
		"police_officer": ["1", "14", "1", "Weapon", "1", "10m", "8", "1", "15"],
		"repair_bot": ["1", "14", "0", "1d6[Tool]", "1", "10m", "8", "1", "15"],
		"serial_killer": ["6", "12", "8", "Weapon+3", "1", "10m", "12", "3", "12"],
		"skilled_professional": ["1", "10", "0", "Weapon", "1", "10m", "6", "2", "15"],
		"small_pack_hunter": ["1", "13", "1", "1d4", "1", "15m", "8", "1", "15"],
		"small_vicious_beast": ["1hp", "14", "1", "1d2", "1", "10m", "7", "1", "15"],
		"soldier_bot": ["2", "16", "1", "Weapon", "1", "10m", "10", "1", "14"],
		"terrifying_apex_predator": ["8", "16", "8", "1d10", "2", "20m", "9", "2", "11"],
		"veteran_fighter": ["2", "14", "2", "Weapon+1", "1", "10m", "9", "1", "14"],
		"warrior_tyrant": ["8", "20", "10", "Weapon+3", "1", "10m", "11", "3", "11", "POWERED"]
	};
	/* Utility */
	const translate = getTranslationByKey;
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
		// from their current value on the sheet.
		Object.keys(setting).forEach(k => {
			if (values[k] === setting[k]) delete setting[k];
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
		getSectionIDs("repeating_gear", (idArray) => {
			const attrs = [
				...idArray.map(id => `repeating_gear_${id}_gear_encumbrance`),
				...idArray.map(id => `repeating_gear_${id}_gear_status`),
				"armor_encumbrance",
				"gear_readied", "gear_readied_max", "gear_readied_over",
				"gear_stowed", "gear_stowed_max", "gear_stowed_over",
			];
			getAttrs(attrs, v => {
				const [gear_readied, gear_stowed] = idArray.reduce((m, id) => {
					if (v[`repeating_gear_${id}_gear_status`] === "readied")
						m[0] += parseInt(v[`repeating_gear_${id}_gear_encumbrance`]) || 0;
					else if (v[`repeating_gear_${id}_gear_status`] === "stowed")
						m[1] += parseInt(v[`repeating_gear_${id}_gear_encumbrance`]) || 0;
					return m;
				}, [parseInt(v.armor_encumbrance) || 0, 0]);
				const gear_readied_over = (gear_readied > parseInt(v.gear_readied_max)) ? "1" : "0";
				const gear_stowed_over = (gear_stowed > parseInt(v.gear_stowed_max)) ? "1" : "0";
				const setting = {gear_readied, gear_stowed, gear_readied_over, gear_stowed_over};

				mySetAttrs(setting, v, {silent: true});
			});
		});
	};

	const calculateStowedReadiedMax = () => {
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
				...prefixes.map(prefix => `${prefix}_weapon_shock_damage`),
				...prefixes.map(prefix => `${prefix}_weapon_shock_ac`),
				...prefixes.map(prefix => `${prefix}_weapon_skill_to_damage`),
				...attributes.map(attr => `${attr}_mod`),
				...weaponSkills,
				"attack_bonus"
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
					const shockString = (v[`${prefix}_weapon_shock_damage`] !== "0") ? `, ${
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
				setAttrs(setting, {
					silent: true
				});
			});
		});
	};

	const handleSuperChange = () => {
		getAttrs(["setting_super_type", "tab_super"], v => {
			const setting = {};
			if (v.setting_super_type === "magic") setting.tab_super = "magic";
			if (v.setting_super_type === "psionics") setting.tab_super = "psionics";
			mySetAttrs(setting, v);
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
			if (!String(v["repeating_npc-attacks_attack_ab"])) {
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
								return `{{attack${n}=[[1d20 + @{attack_ab} + @{attack_burst} + @{modifier_query}]]}} ` +
									`{{damage${n}=[[@{attack_damage} + @{attack_burst}]]}} `;
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
		getAttrs(["save_physical", "save_mental", "save_evasion", "save_luck", "homebrew_luck_save", "macro_saves"], v => {
			const macro_saves = buildLink(`${translate("PHYSICAL")} (v${v.save_physical})`, ("save_physical")) + " " +
				buildLink(`${translate("MENTAL")} (v${v.save_mental})`, ("save_mental")) + " " +
				buildLink(`${translate("EVASION")} (v${v.save_evasion})`, ("save_evasion"), v.homebrew_luck_save !== "1") +
				((v.homebrew_luck_save === "1") ?
					(" " + buildLink(`${translate("LUCK")} (v${v.save_luck})`, ("save_luck"), true)) : "");
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
				...namedSkills.map(x => `skill_${x}_name`),
				...idArray.map(id => `repeating_skills_${id}_skill_name`),
				...idArray.map(id => `repeating_skills_${id}_skill`),
			];
			getAttrs(sourceAttrs, v => {
				const skillList = (v.homebrew_skill_list === "revised") ? skills.revised :
					((v.homebrew_skill_list === "first") ? skills.first : []);

				const macro_skills = [
					...skillList.map((skill, index) => {
						if (namedSkills.includes(skill))
							return buildLink(`${v[`skill_${skill}_name`]} (${sign(v[`skill_${skill}`])})`, `skill_${skill}`);
						else return buildLink(`${translate(skill.toUpperCase())} (${sign(v[`skill_${skill}`])})`,
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
								return buildLink(`${translate(skill.toUpperCase())} (${sign(v[`skill_${skill}`])})`, `skill_${skill}`, index === 5 && skillIDs.length === 0);
							}),
							...skillIDs.map(id => {
								const prefix = `repeating_psychic-skills_${id}_skill`;
								return buildLink(`${v[`${prefix}_name`]} (${sign(v[prefix])})`, prefix);
							})
						].join(" ") + "\n\n" +
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
							buildLink(`${translate("MAGIC")} (${v.skill_magic})`, ("skill_magic"), skillIDs.length === 0 && !v.skill_magic2_name),
							(v.skill_magic2_name ? buildLink(`${v.skill_magic2_name} (${v.skill_magic2})`, ("skill_magic2"), skillIDs.length === 0) : ""),
							...skillIDs.map(id => {
								const prefix = `repeating_magic-skills_${id}_skill`;
								return buildLink(`${v[`${prefix}_name`]} (${sign(v[prefix])})`, prefix);
							})
						].join(" ") + "\n\n" +
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
			if (v.npc !== '1') return;
			const macroList = [
				`[**^{SAVES}** v@{npc_saves},](~npc_save) [**^{SKILLS}** +@{npc_skills},](~npc_skill) `,
				`[**^{MORALE}** v@{npc_morale}](~npc_morale)\n`,
				`[**^{INITIATIVE}** d8,](~npc_initiative) [**^{REACTION}** 2d6,](~npc_reaction) `,
				`**Move**\xa0@{npc_move}\n`
			];
		if (v.macro_npc_attacks) macroList.push("\n**Attacks:** @{macro_npc_attacks}");
		if (v.macro_npc_abilities) macroList.push("\n**Abilities:** @{macro_npc_abilities}");
		mySetAttrs({ macro_statblock: macroList.join("")}, v);
		});
	};


	/* Translations */
	const setTranslatedDefaults = () => {
		const specialSkills = {
			"skill_culture_alien_name": { trans: `${translate("CULTURE_ALIEN")}/`, default: "Culture/Alien/" },
			"skill_culture_one_name": { trans: `${translate("CULTURE")}/`, default: "Culture/" },
			"skill_culture_two_name": { trans: `${translate("CULTURE")}/`, default: "Culture/" },
			"skill_culture_three_name": { trans: `${translate("CULTURE")}/`, default: "Culture/" },
			"skill_profession_name": { trans: `${translate("PROFESSION")}/`, default: "Profession/"},
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
	const setTranslatedQueries = () => {
		getAttrs(["burst_query", "translation_numdice",
			"modifier_query", "proficient_query", "skill_name_query"], v => {
			const setting = {
				burst_query: `?{${translate("BURST")}|${translate("YES")}, 2|${translate("NO")}, 0}[${translate("BURST")}]`,
				modifier_query: `?{${translate("MODIFIER")}|0}[${translate("MODIFIER")}]`,
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
	const handleVersioning = () => {
		getAttrs(["character_sheet"], v => {
			if (!v.character_sheet ||
				v.character_sheet.indexOf("Stars Without Number (revised)") !== 0) upgradeFrom162();
			else upgradeSheet(v.character_sheet.slice(32));
		});
	};

	const upgradeSheet = () => {
		// Any version upgrade code should go here and set a new sheetVersion
		setAttrs({
			character_sheet: `Stars Without Number (revised) v${sheetVersion}`
		});
	};

	/* Main upgrade from pre-worker versioning */
	const upgradeFrom162 = () => {
		console.log("Upgrading from versionless sheet (assumed to be fresh or v1.6.2).");
		const upgradeFunction = _.after(13, () => {
			buildSaveMenu();
			upgradeSheet("2.0.0");
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

			setAttrs(setting, {silent: false}, upgradeFunction);
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
	on("sheet:opened change:npc", validateTab);
	on("sheet:opened", setTranslatedQueries);
	on("sheet:opened change:setting_skill_query", handleAttributeQueries);
	on("change:homebrew_skill_list", setTranslatedDefaults);

	on("sheet:opened", handleVersioning);

	/* Character sheet */
	attributes.forEach(attr => on(`change:${attr} change:${attr}_bonus`, () => calculateMod(attr)));

	on("change:repeating_weapons", () => {
		validateWeaponSkills();
		generateWeaponDisplay();
	});
	on(["attack_bonus", ...weaponSkills].map(name => `change:${name}`).join(" "), generateWeaponDisplay);

	on("change:homebrew_skill_list", () => getSectionIDs("repeating_weapons", validateWeaponSkills));

	on("change:strain change:strain_perm", validateStrain);
	on("change:constitution", calculateMaxStrain);

	on("change:level", calculateSaves);

	on(effortAttributes.map(x => `change:${x}`).join(" "), calculateEffort);

	on("change:armor_ac change:innate_ac", calculateAC);

	on("change:strength", calculateStowedReadiedMax);
	on("change:repeating_gear remove:repeating_gear change:armor_encumbrance " +
		"change:gear_readied change:gear_stowed", calculateGearReadiedStowed);

	on("change:level change:setting_xp_scheme", calculateNextLevelXP);

	on("change:setting_super_type", handleSuperChange);

	/* Ship sheet */
	on("change:repeating_ship-weapons change:repeating_ship-defenses change:repeating_ship-fittings " +
		"change:ship_power change:ship_mass change:ship_hardpoints", calculateShipStats);
	on("change:repeating_ship-weapons", buildShipWeaponsMenu);

	/* NPC sheet */
	on("change:npc_stat_block", fillNPC);
	on("change:repeating_npc-abilities", buildAbilitiesMenu);
	on("change:repeating_npc-attacks", () => {
		addNPCAttackBonus();
		buildAttacksMenu();
	});
	on("change:npc_roll_full_attack change:repeating_npc-attacks:attack_number", setNPCMultiAttacks);
	on("change:npc change:npc_armor_type change:macro_npc_attacks change:macro_npc_abilities", buildStatblock);
	on("change:npc_rolls_hidden", handleNPCRollHide);

	/* Chat macros */
	on("change:homebrew_luck_save change:save_physical change:save_mental change:save_evasion", buildSaveMenu);

	on([
		...skills.revised.map(x => `change:skill_${x}`),
		...skills.first.map(x => `change:skill_${x}`),
		"change:homebrew_skill_list",
		"change:repeating_skills",
		"remove:repeating_skills",
		"change:skill_culture_one_name",
		"change:skill_culture_two_name",
		"change:skill_culture_three_name",
		"change:skill_culture_alien_name",
		"change:skill_profession_name",
	].join(" "), buildSkillMenu);

	on([...skills.psionic.map(x => `change:skill_${x}`),
		"change:setting_super_type change:repeating_techniques remove:repeating_techniques " +
		"change:repeating_psychic-skills remove:repeating_psychic-skills"
	].join(" "), buildPsionicsMenu);

	on("change:setting_super_type change:repeating_spells remove:repeating_spells " +
		"change:repeating_magic-skills remove:repeating_magic-skills " +
		"change:skill_magic change:skill_magic2_name change:skill_magic2", buildMagicMenu);
})();
