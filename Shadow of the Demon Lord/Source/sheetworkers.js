"use strict";
// Utility
const setAttr = (attr, value) => {
	setAttrs({
		[attr]: value,
	});
};
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
			return Object.entries(o).reduce((m, [key, value]) => {
				m[`repeating_${sName}_${rowID}_${key}`] = String(value);
				return m;
			}, {});
		})
		.reduce((m, o) => Object.assign(m, o), {});
	setAttrs(setting, {}, callback);
};
// Spell filters
const removeSpellFilters = () => {
	getSectionIDs('repeating_traditions', tradIDs => {
		const attrs = tradIDs.reduce((m, id) => {
			m[`repeating_traditions_${id}_tradition_filter`] = '0';
			return m;
		}, {});
		setAttrs(attrs);
	});
};
const calcSpellFilters = () => {
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
};
on('change:repeating_traditions:tradition_filter change:repeating_traditions:tradition_name change:repeating_spells:spell_tradition', calcSpellFilters);
on('change:remove_spell_filters', event => {
	if (event.newValue === '0') removeSpellFilters();
});

// Calculate defense
const defenseAttrs = [
	'affliction_defenseless',
	'affliction_unconscious',
	'agility',
	'npc',
	'auto_defense',
	'defense_input',
	'setting_npc_afflictions',
];
const calcDefense = () => {
	getSectionIDs('repeating_defense', idArray => {
		const sourceAttrs = [
			...defenseAttrs,
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
			if ((v.affliction_defenseless === '1' || v.affliction_unconscious === '1') && (v.npc === '0' || v.setting_npc_afflictions === '1')) {
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
			else {
				attrs.defense = v.defense_input;
			}
			setAttrs(attrs);
		});
	});
};
on(defenseAttrs.map(x => `change:${x}`).join(' ') + ' change:repeating_defense:defense_bonus change:repeating_defense:defense_check change:repeating_defense:defense_base remove:repeating_defense', calcDefense);

// Calculate equipment totals, summary
const calcEquipment = () => {
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
};
on('change:repeating_items:item_check change:repeating_items:item_name change:repeating_items:item_amount remove:repeating_items', calcEquipment);

// Calculate stat mods
const stats = ['strength', 'agility', 'intellect', 'perception', 'will'];
const statMods = [...stats, 'finesse'].map(x => `${x}_mod`);
const calcStatBonus = stat => {
	getAttrs([stat], v => setAttr(`${stat}_mod`, (parseInt(v[stat]) - 10) || 0));
};
const calcFinesseBonus = () => {
	getAttrs(['strength', 'agility'], v => {
		setAttr('finesse_mod', (Math.max(parseInt(v.strength), parseInt(v.agility)) - 10) || 0);
	});
};
stats.forEach(stat => on(`change:${stat}`, () => calcStatBonus(stat)));
on('change:strength change:agility', calcFinesseBonus);

// Handle display attributes for weapons
const calcWeaponMod = prefix => {
	getAttrs([...statMods, `${prefix}_attribute`], v => {
		setAttr(`${prefix}_mod`, v[v[`${prefix}_attribute`] + '_mod']);
	});
};
on('change:repeating_weapons:weapon_attribute', () => calcWeaponMod('repeating_weapons_weapon'));
on(statMods.map(x => `change:${x}`).join(' '), () => {
	getSectionIDs('repeating_weapons', idArray => {
		idArray.forEach(id => calcWeaponMod(`repeating_weapons_${id}_weapon`));
	});
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
const spellBoonFormula = '[[@{boons_banes_query} + @{spell_boons} + @{global_attack_boons} + @{global_spell_attack_boons} - @{banes_from_afflictions}]]';
const spellAttackFormula = '@{die_attack} + @{spell_attack_mod} + @{spell_boons_formula}@{die_boon}k1[boons/banes]';
const updateSpellAttack = prefix => {
	getAttrs([`${prefix}_attack_mod`], v => {
		setAttrs({
			[`${prefix}_attack_formula`]: v[`${prefix}_attack_mod`] ? spellAttackFormula : '0',
			[`${prefix}_boons_formula`]: v[`${prefix}_attack_mod`] ? spellBoonFormula : '',
		});
	});
};
on('change:repeating_spells:spell_attack_mod', () => updateSpellAttack('repeating_spells_spell'));

// Handle talent attack rolls
const talentBoonFormula = '[[@{boons_banes_query} + @{talent_boons} + @{global_attack_boons} - @{banes_from_afflictions}]]';
const talentAttackFormula = '@{die_attack} + @{talent_attack_mod} + @{talent_boons_formula}@{die_boon}k1[boons/banes]';
const updateTalentAttack = prefix => {
	getAttrs([`${prefix}_attack_mod`], v => {
		setAttrs({
			[`${prefix}_attack_formula`]: v[`${prefix}_attack_mod`] ? talentAttackFormula : '0',
			[`${prefix}_boons_formula`]: v[`${prefix}_attack_mod`] ? talentBoonFormula : '',
		});
	});
};
on('change:repeating_talents:talent_attack_mod', () => updateTalentAttack('repeating_talents_talent'));

// Handle NPC attack rolls
const npcBoonFormula = '[[@{boons_banes_query} + @{attack_boons} + @{global_attack_boons} - @{banes_from_afflictions}]]';
const npcAttackFormula = '@{die_attack} + @{attack_mod} + @{attack_boons_formula}@{die_boon}k1[boons/banes]';
const updateNpcAttack = prefix => {
	getAttrs([`${prefix}_range`], v => {
		setAttrs({
			[`${prefix}_formula`]: v[`${prefix}_range`] ? npcAttackFormula : '0',
			[`${prefix}_boons_formula`]: v[`${prefix}_range`] ? npcBoonFormula : '',
		});
	});
};
on('change:repeating_attacks:attack_range', () => updateNpcAttack('repeating_attacks_attack'));

// Boon display
const calcBoonsDisplay = prefix => {
	getAttrs([`${prefix}_boons`], v => {
		if (v[`${prefix}_boons`] === '1') {
			setAttr(`${prefix}_boons_display`, '1 ' + getTranslationByKey('BOON').toLowerCase());
		}
		else if (v[`${prefix}_boons`] === '-1') {
			setAttr(`${prefix}_boons_display`, '1 ' + getTranslationByKey('BANE').toLowerCase());
		}
		else if (parseInt(v[`${prefix}_boons`]) <= -2) {
			setAttr(`${prefix}_boons_display`, -parseInt(v[`${prefix}_boons`]) + ' ' + getTranslationByKey('BANES').toLowerCase());
		}
		else {
			setAttr(`${prefix}_boons_display`, v[`${prefix}_boons`] + ' ' + getTranslationByKey('BOONS').toLowerCase());
		}
	});
};
['weapon', 'attack'].forEach(sName => {
	on(`change:repeating_${sName}s:${sName}_boons`, () => {
		calcBoonsDisplay(`repeating_${sName}s_${sName}`);
	});
});

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
		else if (power >= 2) return String(2 + expertise);
		else return String(1 + expertise);
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
on('change:repeating_spells:spell_rank', () => calcSpellCastings('repeating_spells_spell'));

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
const calcBaneAfflictions = () => {
	getAttrs([...baneAfflictions.map(x => `affliction_${x}`), 'npc', 'setting_npc_afflictions'], v => {
		if (v.npc === '0' || v.setting_npc_afflictions === '1') {
			setAttr('banes_from_afflictions', baneAfflictions.reduce((m, k) => (m + (parseInt(v[`affliction_${k}`]) || 0)), 0));
		}
		else {
			setAttr('banes_from_afflictions', '0');
		}
	});
};
on(baneAfflictions.map(x => `change:affliction_${x}`).join(' ') + ' change:setting_npc_afflictions change:npc', calcBaneAfflictions);
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
const speedAttrs = ['speed', 'affliction_blinded', 'affliction_immobilized', 'affliction_slowed', 'npc', 'setting_npc_afflictions'];
const calcDisplaySpeed = () => {
	getAttrs(speedAttrs, v => {
		const attrs = {};
		const active = v.npc === '0' || v.setting_npc_afflictions === '1';
		if (active && (v.affliction_blinded === '1' || v.affliction_immobilized === '1' || v.affliction_slowed === '1')) {
			attrs.auto_speed = '1';
		}
		else attrs.auto_speed = '0';

		if (active && v.affliction_immobilized === '1') attrs.speed_display = '0';
		else if (active && (v.affliction_blinded === '1' && v.affliction_slowed === '1')) {
			attrs.speed_display = (v.speed === '0' || v.speed === '1') ? '0' : '1';
		}
		else if (active && v.affliction_blinded === '1') {
			attrs.speed_display = String(Math.min(2, parseInt(v.speed) || 0));
		}
		else if (active && v.affliction_slowed === '1') {
			attrs.speed_display = String(Math.floor((parseInt(v.speed) || 0) / 2));
		}
		else attrs.speed_display = v.speed;
		setAttrs(attrs);
	});
};
on(speedAttrs.map(x => `change:${x}`).join(' '), calcDisplaySpeed);

// Weapon/attack against display
const updateAgainst = prefix => {
	getAttrs([`${prefix}_against`], v => {
		const dName = `${prefix}_against_display`;
		if (v[`${prefix}_against`].toLowerCase().indexOf('strength') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('STRENGTH')}`);
		}
		else if (v[`${prefix}_against`].toLowerCase().indexOf('agility') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('AGILITY')}`);
		}
		else if (v[`${prefix}_against`].toLowerCase().indexOf('intellect') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('INTELLECT')}`);
		}
		else if (v[`${prefix}_against`].toLowerCase().indexOf('will') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('WILL')}`);
		}
		else if (v[`${prefix}_against`].toLowerCase().indexOf('perception') >= 0) {
			setAttr(dName, `${getTranslationByKey('VS')} ${getTranslationByKey('PERCEPTION')}`);
		}
		else {
			setAttr(dName, '');
		}
	});
};
['weapon', 'attack'].forEach(sName => {
	on(`change:repeating_${sName}s:${sName}_against`, () => {
		updateAgainst(`repeating_${sName}s_${sName}`);
	});
});

// NPC hiding/showing sections
on('change:npc sheet:opened', () => getAttrs(['npc', 'tab'], v => {
	if (v.npc === '1' && !['npc', 'spells'].includes(v.tab)) setAttr('tab', 'npc');
	else if (v.npc === '0' && !['main', 'equipment_talents', 'spells', 'background'].includes(v.tab)) setAttr('tab', 'main');
}));
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

// Spellbook
const buildSpellBook = () => {
	getSectionIDs('repeating_spells', idArray => {
		const spellAttrs = [
			...idArray.map(id => `repeating_spells_${id}_spell_name`),
			...idArray.map(id => `repeating_spells_${id}_spell_tradition`),
			...idArray.map(id => `repeating_spells_${id}_spell_rank`),
			...idArray.map(id => `repeating_spells_${id}_spell_type`),
			...idArray.map(id => `repeating_spells_${id}_spell_castings`),
			...idArray.map(id => `repeating_spells_${id}_spell_castings_max`),
			'character_id',
		];
		getAttrs(spellAttrs, v => {
			const outputString = [...new Set(idArray
					.map(id => v[`repeating_spells_${id}_spell_tradition`] || '')
					.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
				)].sort()
				.map(tradition => {
					const spellIDs = idArray.filter(id => {
						return (v[`repeating_spells_${id}_spell_tradition`] || '').toLowerCase() === tradition.toLowerCase();
					});
					return `**${tradition}**\n` +
						spellIDs.sort((idA, idB) => {
							const nameA = (v[`repeating_spells_${idA}_spell_name`] || '').toLowerCase(),
								nameB = (v[`repeating_spells_${idB}_spell_name`] || '').toLowerCase();
							if (nameA < nameB) return -1;
							else if (nameA > nameB) return 1;
							else return 0;
						})
						.map(id => {
							return '[' + v[`repeating_spells_${id}_spell_name`] + ' (' +
								(getTranslationByKey(v[`repeating_spells_${id}_spell_type`]) || '') + ' ' +
								(v[`repeating_spells_${id}_spell_rank`] || 0) + ', ' +
								(v[`repeating_spells_${id}_spell_castings`] || 0) + '/' +
								(v[`repeating_spells_${id}_spell_castings_max`] || 0) + ')](~' +
								v.character_id + `|repeating_spells_${id}_cast)`;
						}).join(', ');
				}).filter(x => !!x).join('\n');
			setAttr('spells_macro_var', outputString);
		});
	});
};
on(['name', 'tradition', 'rank', 'type', 'castings'].map(x => `change:repeating_spells:spell_${x}`).join(' ') + ' remove:repeating_spells', buildSpellBook);

// Version upgrades
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
					switch (v[`repeating_spells_${id}_spell_attribute`]) {
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
			getAttrs(idArray.map(id => `repeating_weapons_${id}_weapon_mod`), v => {
				const attrs = {};
				idArray.forEach(id => {
					const oldMod = v[`repeating_weapons_${id}_weapon_mod`];
					if (oldMod && oldMod.indexOf('@') === 0) {
						attrs[`repeating_weapons_${id}_weapon_attribute`] = oldMod.slice(2, -5);
					}
				});
				setAttrs(attrs, {}, upgradeFunction);
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
		});
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
	// Upgrade to v4: calculate finesse, recalculate attacks & against
	else if (currentVersion < 4) {
		const convert = (obj, source, oldName, newName) => {
			if (source[oldName]) {
				obj[newName] = String(source[oldName]);
				obj[oldName] = '';
			}
		};
		const upgradeFunction = _.after(3, () => upgradeSheet(4));
		getAttrs([...stats, 'defense'], v => {
			const attrs = stats.reduce((m, stat) => {
				m[`${stat}_mod`] = (parseInt(v[stat]) - 10) || 0;
				return m;
			}, {});
			attrs.finesse_mod = (Math.max(parseInt(v.strength), parseInt(v.agility)) - 10) || 0;
			if (v.defense !== '10') attrs.defense_input = v.defense;
			calcDisplaySpeed();
			setAttrs(attrs, {}, () => {
				getSectionIDs('repeating_talents', idArray => {
					getAttrs(idArray.map(id => `repeating_talents_${id}_talent_boons_banes`), v => {
						const attrs = {};
						idArray.forEach(id => {
							convert(attrs, v, `repeating_talents_${id}_talent_boons_banes`,
								`repeating_talents_${id}_talent_boons`);
						});
						setAttrs(attrs, {}, () => {
							idArray.forEach(id => updateTalentAttack(`repeating_talents_${id}_talent`));
							upgradeFunction();
						});
					});
				});
				getSectionIDs('repeating_spells', idArray => {
					getAttrs(idArray.map(id => `repeating_spells_${id}_spell_boons_banes`), v => {
						const attrs = {};
						idArray.forEach(id => {
							convert(attrs, v, `repeating_spells_${id}_spell_boons_banes`,
								`repeating_spells_${id}_spell_boons`);
						});
						setAttrs(attrs, {}, () => {
							idArray.forEach(id => updateSpellAttack(`repeating_spells_${id}_spell`));
							upgradeFunction();
						});
					});
				});
				getSectionIDs('repeating_attacks', idArray => {
					idArray.forEach(id => updateAgainst(`repeating_attacks_${id}_attack`));
					idArray.forEach(id => updateNpcAttack(`repeating_attacks_${id}_attack`));
					idArray.forEach(id => calcBoonsDisplay(`repeating_attacks_${id}_attack`));
				});
				getSectionIDs('repeating_weapons', idArray => {
					idArray.forEach(id => calcWeaponMod(`repeating_weapons_${id}_weapon`));
					getAttrs(idArray.map(id => `repeating_weapons_${id}_weapon_boons_banes`), v => {
						const attrs = {};
						idArray.forEach(id => {
							convert(attrs, v, `repeating_weapons_${id}_weapon_boons_banes`,
								`repeating_weapons_${id}_weapon_boons`);
						});
						setAttrs(attrs, {}, () => {
							idArray.forEach(id => calcBoonsDisplay(`repeating_weapons_${id}_weapon`));
							upgradeFunction();
						});
					});
				});
			});
		});
	}
	// Upgrade to v5: Build spellbook
	else if (currentVersion < 5) {
		buildSpellBook();
		upgradeSheet(5);
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
				convert(attrs, v[`repeating_weapons_${id}_dboonsbanes`], `repeating_weapons_${id}_weapon_boons`);
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
			if (hasOldMax) setAttrs({
				setting_auto_spell_castings: '0',
			}, {}, () => fillRepeatingSectionFromData('spells', data, upgradeFunction));
			else fillRepeatingSectionFromData('spells', data, upgradeFunction);
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
	// Calculate healing rate
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
		setAttr('version', '5');
	});
	setBoonsBanesQuery();
	setWhisperQuery();
});
