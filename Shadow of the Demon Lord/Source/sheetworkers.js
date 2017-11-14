"use strict";
// Utility
const setAttr = (attr, value) => {
	const attrs = {};
	attrs[attr] = value;
	setAttrs(attrs);
};
// Spell filters
on('change:repeating_traditions:tradition_filter change:repeating_traditions:tradition_name change:repeating_spells:spell_tradition', () => {
	getSectionIDs('repeating_traditions', tradIDs => {
		getSectionIDs('repeating_spells', spellIDs => {
			const sourceAttrs = [
				...tradIDs.map(id => `repeating_traditions_${id}_tradition_name`),
				...tradIDs.map(id => `repeating_traditions_${id}_tradition_filter`),
				...spellIDs.map(id => `repeating_spells_${id}_spell_tradition`)
			];
			getAttrs(sourceAttrs, v => {
				const activeTraditions = tradIDs
					.filter(id => (v[`repeating_traditions_${id}_tradition_filter`] === '1'))
					.map(id => v[`repeating_traditions_${id}_tradition_name`].toLowerCase());
				const attrs = spellIDs.reduce((m, id) => {
					if (!activeTraditions.length || activeTraditions.includes(v[`repeating_spells_${id}_spell_tradition`].toLowerCase())) {
						m[`repeating_spells_${id}_spell_hide`] = '0';
					}
					else {
						m[`repeating_spells_${id}_spell_hide`] = '1';
					}
					return m;
				}, {});
				if (activeTraditions.length) attrs.remove_spell_filters = '1';
				else attrs.remove_spell_filters = '0';
				setAttrs(attrs);
			});
		});
	});
});
on('change:remove_spell_filters', event => {
	if(event.newValue === '0') {
		getSectionIDs('repeating_traditions', tradIDs => {
			const attrs = tradIDs.reduce((m, id) => {
				m[`repeating_traditions_${id}_tradition_filter`] = '0';
				return m;
			}, {});
			setAttrs(attrs);
		});
	}
});

// Calculate defense
on('change:agility change:auto_defense change:repeating_defense remove:repeating_defense change:affliction_defenseless change:affliction_unconscious', () => {
	getSectionIDs('repeating_defense', idArray => {
		const sourceAttrs = [
			'affliction_defenseless',
			'affliction_unconscious',
			'agility',
			'auto_defense',
			'npc',
			...idArray.map(id => `repeating_defense_${id}_defense_check`),
			...idArray.map(id => `repeating_defense_${id}_defense_base`),
			...idArray.map(id => `repeating_defense_${id}_defense_bonus`),
		];
		getAttrs(sourceAttrs, v => {
			const autoDefense = (v.auto_defense === '1') && (v.npc === '0');
			const attrs = idArray.reduce((m, id) => {
				const base = (v[`repeating_defense_${id}_defense_base`] === 'AGILITY') ? (parseInt(v.agility) || 0) : 0;
				const bonus = parseInt(v[`repeating_defense_${id}_defense_bonus`]) || 0;
				m[`repeating_defense_${id}_defense_total`] = base + bonus;
				return m;
			}, {});
			if (autoDefense && (v.affliction_defenseless === '1' || v.affliction_unconscious === '1')) {
				attrs.defense = '5';
			}
			else if (autoDefense && idArray.filter(id => (v[`repeating_defense_${id}_defense_check`] === '1')).length === 0) {
				attrs.defense = v.agility;
			}
			else if (autoDefense) {
				const totalDefense = Math.min(idArray.reduce((m, id) => {
						if (v[`repeating_defense_${id}_defense_check`] === '1') m += attrs[`repeating_defense_${id}_defense_total`];
						return m;
					}, 0), 25);
				attrs.defense = String(totalDefense);
			}
			setAttrs(attrs);
		});
	});
});

// Calculate equipment totals, summary
on('change:repeating_items remove:repeating_items', () => {
	getSectionIDs('repeating_items', idArray => {
		const sectionAttrs = [
			...idArray.map(id => `repeating_items_${id}_item_check`),
			...idArray.map(id => `repeating_items_${id}_item_amount`),
			...idArray.map(id => `repeating_items_${id}_item_name`),
			];
		getAttrs(sectionAttrs, v => {
			const total = idArray.filter(id => (v[`repeating_items_${id}_item_check`] === '1'))
				.map(id => `repeating_items_${id}_item_amount`)
				.reduce((m, n) => (m + (parseInt(v[n]) || 0)), 0);
			const summary = idArray.map(id => {
				const prefix = `repeating_items_${id}_item`,
					number = (v[`${prefix}_amount`] === '1') ? '' : v[`${prefix}_amount`] + ' ';
				return number + v[`${prefix}_name`];
			}).join(', ');
			setAttrs({
				items_total: total,
				equipment_summary: summary,
			});
		});
	});
});

// Calculate stat mods
const stats = ['strength', 'agility', 'intellect', 'perception', 'will'];
const calculateStatBonus = stat => {
	getAttrs([stat], v => {
		const mod = (parseInt(v[stat]) - 10) || 0;
		setAttr(`${stat}_mod`, (mod >= 0) ? `+${mod}` : mod);
	});
};
stats.forEach(stat => on(`change:${stat}`, () => calculateStatBonus(stat)));

// Handle display attributes for weapons
const calcWeaponMod = prefix => {
	getAttrs(['strength_mod', 'agility_mod', 'intellect_mod', 'will_mod', `${prefix}_weapon_attribute`], v => {
		setAttr(`${prefix}_weapon_mod`, v[v[`${prefix}_weapon_attribute`] + '_mod']);
	});
};
on('change:repeating_weapons', () => calcWeaponMod('repeating_weapons'));
on('change:strength_mod change:agility_mod change:intellect_mod change:will_mod', () => {
	getSectionIDs('repeating_weapons', idArray => idArray.forEach(id => calcWeaponMod(`repeating_weapons_${id}`)));
});

// Sacrifice query
on('change:repeating_spells:spell_sacrifice', () => {
	getAttrs(['repeating_spells_spell_sacrifice'], v => {
		const query = v.repeating_spells_spell_sacrifice ? `{{?{${getTranslationByKey('SACRIFICE_SPELL')}|${getTranslationByKey('NO')},` +
			`sacrifice=|${getTranslationByKey('YES')},sacrifice=@{spell_sacrifice}}}}` : '';
		setAttr('repeating_spells_spell_sacrifice_query', query);
	});
});

// Handle spell attack rolls
const spellBoonFormula = '[[@{boons_banes_query} + @{spell_boons_banes} + @{global_attack_boons} + @{global_spell_attack_boons} - @{banes_from_afflictions}]]';
const spellAttackFormula = '@{die_attack} + (@{spell_attack_mod}) + @{spell_boons_formula}@{die_boon}k1[boons/banes]';
const updateSpellAttack = prefix => {
	getAttrs([`${prefix}_attack_mod`], v => {
		setAttr(`${prefix}_attack_formula`, v[`${prefix}_attack_mod`] ? spellAttackFormula : '0');
		setAttr(`${prefix}_boons_formula`, v[`${prefix}_attack_mod`] ? spellBoonFormula : '');
	});
};
on('change:repeating_spells', () => updateSpellAttack('repeating_spells_spell'));

// Handle talent attack rolls
const talentBoonFormula = '[[@{boons_banes_query} + @{talent_boons_banes} + @{global_attack_boons} - @{banes_from_afflictions}]]';
const talentAttackFormula = '@{die_attack} + (@{talent_attack_mod}) + @{talent_boons_formula}@{die_boon}k1[boons/banes]';
const updateTalentAttack = prefix => {
	getAttrs([`${prefix}_attack_mod`], v => {
		setAttr(`${prefix}_attack_formula`, v[`${prefix}_attack_mod`] ? talentAttackFormula : '0');
		setAttr(`${prefix}_boons_formula`, v[`${prefix}_attack_mod`] ? talentBoonFormula : '');
	});
};
on('change:repeating_talents', () => updateTalentAttack('repeating_talents_talent'));

// Handle NPC attack rolls
const npcBoonFormula = '[[@{boons_banes_query} + @{attack_boons} + @{global_attack_boons}]]';
const npcAttackFormula = '@{die_attack} + (@{attack_mod}) + @{attack_boons_formula}@{die_boon}k1[boons/banes]';
const updateNpcAttack = prefix => {
	getAttrs([`${prefix}_range`], v => {
		setAttr(`${prefix}_formula`, v[`${prefix}_range`] ? npcAttackFormula : '0');
		setAttr(`${prefix}_boons_formula`, v[`${prefix}_range`] ? npcBoonFormula : '');
	});
};
on('change:repeating_attacks', () => updateNpcAttack('repeating_attacks_attack'));

// Calculate spell max castings
const getSpellCastings = (rk, pwr, exp) => {
	const rank = parseInt(rk) || 0,
		power = parseInt(pwr) || 0,
		expertise = parseInt(exp) || 0;

	if (power < rank) return '0';
	else if (rank >= 6) return '1';
	else if (rank === 5) {
		if (power >= 8) return '2';
		else return '1';
	}
	else if (rank >= 2) {
		if ((power - rank) >= 6) return '3';
		else if ((power - rank) >= 2) return '2';
		else return '1';
	}
	else if (rank === 1) {
		if (power >= 5) return String(3 + expertise);
		else if (power >= 2) return  String(2 + expertise);
		else return  String(1 + expertise);
	}
	else if (rank === 0) return String(power + expertise + 1);
};
const calcSpellCastings = prefix => {
	getAttrs([`${prefix}_rank`, 'power', 'setting_auto_spell_castings', 'setting_spell_expertise'], v => {
		if (v.setting_auto_spell_castings === '1') {
			setAttr(`${prefix}_castings_max`, getSpellCastings(v[`${prefix}_rank`], v.power, v.setting_spell_expertise));
		}
	});
};
on('change:power change:setting_auto_spell_castings change:setting_spell_expertise', () => {
	getSectionIDs('repeating_spells', idArray => {
		idArray.forEach(id => calcSpellCastings(`repeating_spells_${id}_spell`));
	});
});
on('change:repeating_spells:spell_rank', () => {
	calcSpellCastings('repeating_spells_spell');
});

// Handle reset of spell castings
const resetSpellCastings = () => {
	getSectionIDs('repeating_spells', idArray => {
		getAttrs(idArray.map(id => `repeating_spells_${id}_spell_castings_max`), v => {
			const attrs = idArray.reduce((m, id) => {
				m[`repeating_spells_${id}_spell_castings`] = v[`repeating_spells_${id}_spell_castings_max`] || '1';
				return m;
			}, {});
			setAttrs(attrs);
		});
	});
};
on('change:reset_spell_castings', resetSpellCastings);

// Handle reset of talent uses
const resetTalentUses = () => {
	getSectionIDs('repeating_talents', idArray => {
		getAttrs(idArray.map(id => `repeating_talents_${id}_talent_uses_max`), v => {
			const attrs = idArray.reduce((m, id) => {
				if (v[`repeating_talents_${id}_talent_uses_max`] && v[`repeating_talents_${id}_talent_uses_max`] !== '0') {
					m[`repeating_talents_${id}_talent_uses`] = v[`repeating_talents_${id}_talent_uses_max`] || '0';
				}
				return m;
			}, {});
			setAttrs(attrs);
		});
	});
};
on('change:reset_talent_uses', resetTalentUses);

// Set max damage and healing rate
const handleHealthChange = () => {
	getAttrs(['health', 'setting_healing_rate_divisor'], v => {
		setAttrs({
			damage_max: v.health,
			healing_rate: (Math.floor((parseInt(v.health)) / v.setting_healing_rate_divisor)) || 0,
		});
	});
};
on('change:health change:setting_healing_rate_divisor', handleHealthChange);

// Handle banes from afflictions
const baneAfflictions = ['diseased', 'fatigued', 'frightened', 'impaired', 'poisoned'];
on(baneAfflictions.map(x => `change:affliction_${x}`).join(' '), () => {
	getAttrs(baneAfflictions.map(x => `affliction_${x}`), v => {
		setAttr('banes_from_afflictions', Object.values(v).reduce((m, k) => (m + (parseInt(k) || 0)), 0));
	});
});
// Asleep: set prone and unconscious
on('change:affliction_asleep', event => {
	if (event.newValue === '1') {
		setAttrs({
			affliction_prone: '1',
			affliction_unconscious: '1'
		});
	}
});
// Blinded, slowed, immobilized: modify speed
const speedAttrs = ['speed', 'affliction_blinded', 'affliction_immobilized', 'affliction_slowed'];
on(speedAttrs.map(x => `change:${x}`).join(' '), () => {
	getAttrs(speedAttrs, v => {
		const attrs = {};
		if (v.affliction_blinded === '1' || v.affliction_immobilized === '1' || v.affliction_slowed === '1') {
			attrs.auto_speed = '1';
		}
		else attrs.auto_speed = '0';

		if (v.affliction_immobilized === '1') attrs.speed_display = '0';
		else if (v.affliction_blinded === '1' && v.affliction_slowed === '1') {
			attrs.speed_display = (v.speed === '0' || v.speed === '1') ? '0' : '1';
		}
		else if (v.affliction_blinded === '1') {
			attrs.speed_display = String(Math.min(2, parseInt(v.speed) || 0));
		}
		else if (v.affliction_slowed === '1') {
			attrs.speed_display = String(Math.floor((parseInt(v.speed) || 0) / 2));
		}
		else attrs.speed_display = v.speed;
		setAttrs(attrs);
	});
});

// Weapon/attack against display
['weapon', 'attack'].forEach(name => {
	on(`change:repeating_${name}s:${name}_against`, event => {
		const dName = `repeating_${name}s_${name}_against_display`,
			newValue = event.newValue.toLowerCase(),
			dot = (name === 'attack') ? "." : "";
		if (newValue.indexOf('strength') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('STRENGTH')}${dot}`);
		} else if (newValue.indexOf('agility') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('AGILITY')}${dot}`);
		} else if (newValue.indexOf('intellect') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('INTELLECT')}${dot}`);
		} else if (newValue.indexOf('will') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('WILL')}${dot}`);
		} else if (newValue.indexOf('perception') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('PERCEPTION')}${dot}`);
		} else {
			setAttr(dName, '');
		}
	});
});

// NPC hiding/showing sections
on('change:npc', () => getAttrs(['npc'], v => setAttr('tab', (v.npc === '1') ? 'npc' : 'main')));
['specialactions', 'specialattacks', 'npcmagic', 'endofround'].forEach(sName => {
	on(`change:repeating_${sName} remove:repeating_${sName}`, () => {
		getSectionIDs(`repeating_${sName}`, idArray => {
			setAttr(`has_${sName}`, idArray.length ? '1' : '0');
		});
	});
});

// Basic equipment: turn off auto-defense
on('change:setting_basic_equipment', () => {
	getAttrs(['setting_basic_equipment', 'auto_defense'], v => {
		if (v.setting_basic_equipment === '1' && v.auto_defense === '1') setAttr('auto_defense', '0');
	});
});

// Version upgrades
const fillRepeatingSectionFromData = (sName, data, callback) => {
	callback = callback || (() => {});
	const createdIDs = [],
		setting = data.map(o => {
			let rowID;
			while (!rowID) {
				let newID = generateRowID();
				if (!createdIDs.includes(newID)) {
					rowID = newID;
					createdIDs.push(rowID);
				}
			}
			return Object.keys(o).reduce((m, key) => {
				m[`repeating_${sName}_${rowID}_${key}`] = String(o[key]);
				return m;
			}, {});
		})
		.reduce((m, o) => Object.assign(m, o), {});
	setAttrs(setting, {}, callback);
};
const upgradeSheet = currentVersion => {
	// Upgradee to v2: convert different standards for spell attributes
	if (currentVersion < 2) {
		const upgradeFunction = _.after(2, () => upgradeSheet(2));
		// Update repeating_spells_spell_attribute
		getSectionIDs('repeating_spells', idArray => {
			const oldAttrs = [
				...idArray.map(id => `repeating_spells_${id}_spell_attribute`),
				...idArray.map(id => `repeating_spells_${id}_spell_sacrifice`),
				...idArray.map(id => `repeating_spells_${id}_spell_against`),
			];
			getAttrs(oldAttrs, v => {
				const attrs = {};
				idArray.forEach(id => {
					switch(v[`repeating_spells_${id}_spell_attribute`]) {
					case 'INTELLECT':
						attrs[`repeating_spells_${id}_spell_attribute`] = ' (^{INTELLECT})';
						break;
					case 'WILL':
						attrs[`repeating_spells_${id}_spell_attribute`] = ' (^{WILL})';
					}
					if (v[`repeating_spells_${id}_spell_sacrifice`]) {
						attrs[`repeating_spells_${id}_spell_sacrifice_query`] = `{{?{${getTranslationByKey('SACRIFICE_SPELL')}|${getTranslationByKey('NO')},` +
							`sacrifice=|${getTranslationByKey('YES')},sacrifice=@{spell_sacrifice}}}}`;
					}
					if (v[`repeating_spells_${id}_spell_against`] && String(v[`repeating_spells_${id}_spell_against`]).indexOf('^') !== 0) {
						attrs[`repeating_spells_${id}_spell_against`] = '^{' + v[`repeating_spells_${id}_spell_against`] + '}';
					}
				});
				setAttrs(attrs, {}, upgradeFunction);
			});
		});
		getSectionIDs('repeating_weapons', idArray => {
			const oldAttrs = [
				...idArray.map(id => `repeating_weapons_${id}_weapon_mod`),
				...idArray.map(id => `repeating_weapons_${id}_weapon_properties`),
				...idArray.map(id => `repeating_weapons_${id}_weapon_boons_banes`),
			];
			getAttrs(oldAttrs, v => {
				const attrs = {};
				idArray.forEach(id => {
					const oldMod = v[`repeating_weapons_${id}_weapon_mod`];
					if (oldMod && oldMod.indexOf('@') === 0) {
						attrs[`repeating_weapons_${id}_weapon_attribute`] = oldMod.slice(2, -5);
					}
				});
				setAttrs(attrs, {}, () => {
					upgradeFunction();
					idArray.forEach(id => calcWeaponMod(`repeating_weapons_${id}`));
				});
			});
		});
	}
	// Upgrade to v3: convert NPC attacks plus field
	else if (currentVersion < 3) {
		const upgradeFunction = _.after(2, () => upgradeSheet(3));
		getSectionIDs('repeating_attacks', idArray => {
			getAttrs(idArray.map(id => `repeating_attacks_${id}_attack_plus`), v => {
				const attrs = idArray.reduce((m, id) => {
					if (v[`repeating_attacks_${id}_attack_plus`]) {
						m[`repeating_attacks_${id}_attack_plus`] = 'plus ' + v[`repeating_attacks_${id}_attack_plus`];
					}
					return m;
				}, {});
				setAttrs(attrs, {}, upgradeFunction);
			});
			idArray.forEach(id => updateNpcAttack(`repeating_attacks_${id}_attack`));
		});
		getSectionIDs('repeating_spells', idArray => {
			idArray.forEach(id => updateSpellAttack(`repeating_spells_${id}_spell`));
		});
		getSectionIDs('repeating_talents'), idArray => {
			idArray.forEach(id => updateTalentAttack(`repeating_talents_${id}_talent`));
		}
		getAttrs(['agility', 'defense', 'npc', 'setting_basic_equipment'], v => {
			if (v.npc === '1' || v.setting_basic_equipment === '1' || v.agility === v.defense) upgradeFunction();
			else {
				fillRepeatingSectionFromData('defense', [{
					defense_name: 'Defense',
					defense_bonus: v.defense,
				}], upgradeFunction);
			}
		});
	}
};
const initialiseSheet = () => {
	// Convert from pre-sheet workers version below
	const convert = (obj, oldValue, newName) => {
		if (oldValue) obj[newName] = String(oldValue);
	};
	const upgradeFunction = _.after(4, () => upgradeSheet(1));
	// Convert non-repeating attributes
	const simpleConversion = {
		desc: "description",
		lvl: "level",
		prof: "professions",
		talents: "notes",
		equipment: "equipment_notes",
		dboonsbanes: "fortune_points",
	};
	getAttrs(Object.keys(simpleConversion), v => {
		const attrs = {};
		Object.keys(simpleConversion).forEach(oldName => {
			convert(attrs, v[oldName], simpleConversion[oldName]);
		});
		attrs.tab = 'main';
		setAttrs(attrs, {}, upgradeFunction);
	});
	// Convert attributes in repeating sections
	getSectionIDs('repeating_weapons', idArray => {
		const oldAttrs = [
			...idArray.map(id => `repeating_weapons_${id}_attrtype`),
			...idArray.map(id => `repeating_weapons_${id}_ddamage`),
			...idArray.map(id => `repeating_weapons_${id}_dboonsbanes`),
		];
		getAttrs(oldAttrs, v => {
			const attrs = {};
			idArray.forEach(id => {
				convert(attrs, v[`repeating_weapons_${id}_ddamage`], `repeating_weapons_${id}_weapon_damage`);
				convert(attrs, v[`repeating_weapons_${id}_dboonsbanes`], `repeating_weapons_${id}_weapon_boons_banes`);
				switch (v[`repeating_weapons_${id}_attrtype`]) {
				case '@{agility}':
					attrs[`repeating_weapons_${id}_weapon_mod`] = '@{agility_mod}';
					break;
				default:
					attrs[`repeating_weapons_${id}_weapon_mod`] = '@{strength_mod}';
				}
			});
			setAttrs(attrs, {}, upgradeFunction);
		});
	});
	getSectionIDs('repeating_magic', idArray => {
		const convData = {
			spell: "spell_name",
			stradition: "spell_tradition",
			sduration: "spell_duration",
			sreq: "spell_requirement",
			srank: "spell_rank",
			suses: "spell_castings",
			smax: "spell_castings_max",
			starget: "spell_target",
			sdescription: "spell_description",
			striggered: "spell_triggered",
			srollagainsttype: "spell_against",
			sdamage: "spell_damage",
			sbonus: "spell_roll20plus",
		};
		const oldAttrs = idArray.reduce((m, id) => {
			return m.concat(Object.keys(convData).map(x => `repeating_magic_${id}_${x}`));
		}, []).concat(idArray.map(id => `repeating_magic_${id}_srolltype`));
		getAttrs(oldAttrs, v => {
			let hasOldMax = false;
			const data = idArray.map(id => {
				const row = {};
				if (v[`repeating_magic_${id}_smax`]) hasOldMax = true;
				Object.keys(convData).forEach(oldName => {
					convert(row, v[`repeating_magic_${id}_${oldName}`], convData[oldName]);
				});
				switch (v[`repeating_magic_${id}_srolltype`]) {
				case '@{strength}':
					row.spell_attack_mod = '@{strength_mod}';
					break;
				case '@{agility}':
					row.spell_attack_mod = '@{agility_mod}';
					break;
				case '@{intellect}':
					row.spell_attack_mod = '@{intellect_mod}';
					break;
				case '@{will}':
					row.spell_attack_mod = '@{will_mod}';
					break;
				default:
					row.spell_attack_mod = '';
				}
				if (row.spell_against) row.spell_against = row.spell_against.toUpperCase();
				row.spell_attack_formula = row.spell_attack_mod ? spellAttackFormula : '0';
				return row;
			});
			setAttrs({
				setting_auto_spell_castings: (hasOldMax) ? '0' : '1'
			}, {}, () => fillRepeatingSectionFromData('spells', data, upgradeFunction));
			idArray.forEach(id => removeRepeatingRow(`repeating_magic_${id}`));
		});
	});
	getSectionIDs('repeating_talents', idArray => {
		const convData = {
			talent: "talent_name",
			tuses: "talent_uses",
			tmax: "talent_uses_max",
			tdescription: "talent_description",
		};
		const oldAttrs = idArray.reduce((m, id) => {
			return m.concat(Object.keys(convData).map(x => `repeating_talents_${id}_${x}`));
		}, []);
		getAttrs(oldAttrs, v => {
			const attrs = {};
			idArray.forEach(id => {
				Object.keys(convData).forEach(oldName => {
					convert(attrs, v[`repeating_talents_${id}_${oldName}`], `repeating_talents_${id}_${convData[oldName]}`);
				});
			});
			setAttrs(attrs, {}, upgradeFunction);
		});
	});
	// Re-calculate mods
	stats.forEach(calculateStatBonus);
	handleHealthChange();
};
const setBoonsBanesQuery = () => {
	getAttrs(['boons_banes_query'], v => {
		const newValue = `?{#(${getTranslationByKey('BOONS_BANES')})|0}`;
		if (newValue !== v.boons_banes_query) setAttr('boons_banes_query', newValue);
	});
};
const setWhisperQuery = () => {
	getAttrs(['whisper_query'], v => {
		const newValue = `?{${getTranslationByKey('OUTPUT')}|${getTranslationByKey('PUBLIC')}, |${getTranslationByKey('WHISPERED_TO_GM')},/w GM}`;
		if (newValue !== v.whisper_query) setAttr('whisper_query', newValue);
	});
};

on('sheet:opened', () => {
	getAttrs(['version'], v => {
		const version = parseInt(v.version) || 0;
		if (!version) initialiseSheet();
		else upgradeSheet(version);
		setAttr('version', '3');
	});
	setBoonsBanesQuery();
	setWhisperQuery();
});
