var currentVersion = '2.0.1';

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
function firstThreeChars(string) {
	return string.substring(0, 3);
}
function getIntValue(value, defaultValue) {
	if (!defaultValue) {
		defaultValue = 0;
	}
	return parseInt(value, 10) || defaultValue;
}
function getFloatValue(value, defaultValue) {
	if (!defaultValue) {
		defaultValue = 0;
	}
	return parseFloat(value) || defaultValue;
}
function getAbilityName(varName) {
	if (!varName) {
		return 'strength';
	}
	return getAbilityModName(varName).replace('_mod', '');
}
function getAbilityModName(varName) {
	if (!varName) {
		return 'strength_mod';
	}
	return varName.replace(/\W/g, '');
}
function getAbilityValue(v, varName, defaultAbility) {
	if (!varName) {
		if (defaultAbility) {
			return getIntValue(v[defaultAbility]);
		}
	} else if (exists(varName)) {
		varName = getAbilityModName(varName);
		return getIntValue(v[varName], -5);
	}
	return -5;
}
function getAbilityShortName(varName, capital) {
	if (!varName) {
		return 'Str';
	}
	varName = getAbilityModName(varName);
	if (capital) {
		varName = capitalizeFirstLetter(varName);
	}
	return firstThreeChars(varName);
}
function exists(value) {
	if (!value || value === '' || value === '0' || value === 0) {
		return false;
	}
	return true;
}
function getRowId(leadingString, eventInfo) {
	var re = new RegExp(leadingString + '_([a-zA-Z0-9\-]*)_.*');
	return eventInfo.sourceAttribute.replace(re, '$1');
}
function getRepeatingField(leadingString, eventInfo) {
	var re = new RegExp(leadingString + '_[a-zA-Z0-9\-]*_(.*)');

	return eventInfo.sourceAttribute.replace(re, '$1');
}
function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return false;
		}
	}
	return true;
}
function setFinalAttrs(v, finalSetAttrs) {
	if (!isEmpty(finalSetAttrs)) {
		for (var key in finalSetAttrs) {
			if (finalSetAttrs.hasOwnProperty(key)) {
				if (v[key] === finalSetAttrs[key]) {
					delete finalSetAttrs[key];
				}
			}
		}
		setAttrs(finalSetAttrs);
	}
}
function parseAttackComponents(v, repeatingString, finalSetAttrs, options) {
	var parsed = v[repeatingString + 'parsed'];

	if (!exists(parsed)) {
		parsed = finalSetAttrs[repeatingString + 'parsed'];
	}

	if (!exists(parsed) || parsed.indexOf(options.parseName) === -1) {
		var aTriggerFieldExists = false;

		for (var i = 0; i < options.triggerFields.length; i++) {
			if (exists(v[repeatingString + options.triggerFields[i]])) {
				aTriggerFieldExists = true;
			}
		}

		if (aTriggerFieldExists) {
			finalSetAttrs[repeatingString + options.toggleField] = options.toggleFieldSetTo;
		}
		if (options.attackAbility && !exists(v[repeatingString + 'attack_ability']) && v[repeatingString + 'attack_ability'] !== '0') {
			finalSetAttrs[repeatingString + 'attack_ability'] = v.default_ability;
		}

		if (options.addCastingModifier) {
			if (exists(v[repeatingString + 'damage']) && !exists(v[repeatingString + 'damage_ability']) && v[repeatingString + 'damage_ability'] !== '0') {
				finalSetAttrs[repeatingString + 'damage_ability'] = v.default_ability;
			}
			if (exists(v[repeatingString + 'heal']) && !exists(v[repeatingString + 'heal_ability']) && v[repeatingString + 'heal_ability'] !== '0') {
				finalSetAttrs[repeatingString + 'heal_ability'] = v.default_ability;
			}
		}

		if (!exists(finalSetAttrs[repeatingString + 'parsed'])) {
			finalSetAttrs[repeatingString + 'parsed'] = '';
		}
		finalSetAttrs[repeatingString + 'parsed'] += ' ' + options.parseName;
	}
}
function hasUpperCase(string) {
	return (/[A-Z]/.test(string));
}
function emptyIfUndefined(value) {
	if (!value) {
		return '';
	}
	return value;
}

var ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
var ADD = ' + ';
var SPACE = ' ';

on('change:cp change:sp change:ep change:gp change:pp', function () {
	getAttrs(['cp', 'copper_per_gold', 'sp', 'silver_per_gold', 'ep', 'electrum_per_gold', 'gp', 'pp', 'platinum_per_gold'], function (v) {
		var copperPieces = getFloatValue(v.cp);
		var silverPieces = getFloatValue(v.sp);
		var electrumPieces = getFloatValue(v.ep);
		var goldPieces = getFloatValue(v.gp);
		var platinumPieces = getFloatValue(v.pp);
		var copperPerGold = getFloatValue(v.copper_per_gold, 100);
		var silverPerGold = getFloatValue(v.silver_per_gold, 10);
		var electrumPerGold = getFloatValue(v.electrum_per_gold, 2);
		var platinumPerGold = getFloatValue(v.platinum_per_gold, 10);
		var totalGold = (copperPieces / copperPerGold) + (silverPieces / silverPerGold) + (electrumPieces / electrumPerGold) + goldPieces + (platinumPieces * platinumPerGold);
		var coinWeight = (copperPieces + silverPieces + electrumPieces + goldPieces + platinumPieces) / 50;
		setAttrs({
			total_gp: totalGold.toFixed(2),
			weight_coinage: coinWeight
		});
	});
});

var getAbilityMod = function (score) {
	return Math.floor((getIntValue(score) - 10) / 2);
};

var updateAbilityModifier = function (ability) {
	var collectionArray = [ability, ability + '_bonus', ability + '_mod', ability + '_check_mod'];
	var finalSetAttrs = {};

	if (ability === 'strength') {
		collectionArray.push('dexterity_mod');
	} else if (ability === 'dexterity') {
		collectionArray.push('strength_mod');
	}

	getAttrs(collectionArray, function (v) {
		var abilityScore = getIntValue(v[ability]);
		var abilityBonus = getIntValue(v[ability + '_bonus']);
		var abilityMod = getAbilityMod((abilityScore + abilityBonus));

		var abilityCheckFormula = abilityMod + '[' + firstThreeChars(ability) + ' mod with bonus]';
		abilityCheckFormula += ADD + '@{jack_of_all_trades_toggle}[jack of all trades]';
		abilityCheckFormula += ADD + '(@{global_check_bonus})[global check bonus]';

		finalSetAttrs[ability + '_mod'] = abilityMod;
		finalSetAttrs[ability + '_check_mod'] = abilityCheckFormula;

		if (ability === 'strength') {
			finalSetAttrs.finesse_mod = Math.max(abilityMod, getIntValue(v.dexterity_mod));
			var str = getIntValue(v.strength);
			finalSetAttrs.carrying_capacity = str * 15;
			finalSetAttrs.max_push_drag_lift = str * 30;
			finalSetAttrs.encumbered = str * 5;
			finalSetAttrs.heavily_encumbered = str * 10;
		} else if (ability === 'dexterity') {
			finalSetAttrs.finesse_mod = Math.max(abilityMod, getIntValue(v.strength_mod));
		}

		console.log('updateAbilityModifier', finalSetAttrs);
		setFinalAttrs(v, finalSetAttrs);
	});
};

on('change:strength change:strength_bonus', function () {
	updateAbilityModifier('strength');
});
on('change:dexterity change:dexterity_bonus', function () {
	updateAbilityModifier('dexterity');
});
on('change:constitution change:constitution_bonus', function () {
	updateAbilityModifier('constitution');
});
on('change:intelligence change:intelligence_bonus', function () {
	updateAbilityModifier('intelligence');
});
on('change:wisdom change:wisdom_bonus', function () {
	updateAbilityModifier('wisdom');
});
on('change:charisma change:charisma_bonus', function () {
	updateAbilityModifier('charisma');
});
on('change:dexterity_mod', function () {
	updateArmor();
});
on('change:strength_mod change:dexterity_mod change:constitution_mod change:intelligence_mod change:wisdom_mod change:charisma_mod', function () {
	console.log('---------------------mod adjusted------------------------');
	updateSkill();
	updateAttack();
	updateSpell();
});

var updateLevels = function () {
	var repeatingItem = 'repeating_class';
	var collectionArray = [];
	var finalSetAttrs = {};

	var defaultClassDetails = {
		barbarian: {
			hd: 'd12'
		},
		bard: {
			hd: 'd8',
			spellcasting: 'full'
		},
		cleric: {
			hd: 'd8',
			spellcasting: 'full'
		},
		druid: {
			hd: 'd8',
			spellcasting: 'full'
		},
		fighter: {
			hd: 'd10'
		},
		monk: {
			hd: 'd8'
		},
		paladin: {
			hd: 'd10',
			spellcasting: 'half'
		},
		ranger: {
			hd: 'd10',
			spellcasting: 'half'
		},
		rogue: {
			hd: 'd8'
		},
		sorcerer: {
			hd: 'd6',
			spellcasting: 'full'
		},
		warlock: {
			hd: 'd8',
			spellcasting: 'warlock'
		},
		wizard: {
			hd: 'd6',
			spellcasting: 'full'
		}
	};

	var hd = {
		d20: 0,
		d12: 0,
		d10: 0,
		d8: 0,
		d6: 0,
		d4: 0,
		d2: 0,
		d0: 0
	};

	var spellcasting = {
		full: 0,
		half: 0,
		third: 0,
		warlock: 0
	};
	var totalLevel = 0;
	var levelArray = [];
	var sorcererLevels = 0;
	var classesWithSpellcasting = 0;

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'level');
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'custom_name');
			collectionArray.push(repeatingString + 'hd');
			collectionArray.push(repeatingString + 'spellcasting');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				var className = v[repeatingString + 'name'];
				if (!exists(className)) {
					className = 'barbarian';
				}
				if (className === 'custom') {
					finalSetAttrs[repeatingString + 'custom_class_toggle'] = 'on';
					var customName = v[repeatingString + 'custom_name'];
					if (exists(customName)) {
						className = customName;
					} else {
						className = 'custom';
					}
				} else {
					finalSetAttrs[repeatingString + 'custom_class_toggle'] = 0;
				}

				var classLevel = getIntValue(v[repeatingString + 'level']);
				totalLevel += classLevel;
				levelArray.push(capitalizeFirstLetter(className) + ' ' + classLevel);

				var classHd = v[repeatingString + 'hd'];
				if (!exists(classHd)) {
					if (defaultClassDetails.hasOwnProperty(className)) {
						classHd = defaultClassDetails[className].hd;
						finalSetAttrs[repeatingString + 'hd'] = classHd;
					} else {
						classHd = 'd12';
					}
				}
				hd[classHd] += classLevel;

				var classSpellcasting = v[repeatingString + 'spellcasting'];
				if (!exists(classSpellcasting)) {
					if (defaultClassDetails.hasOwnProperty(className)) {
						classSpellcasting = defaultClassDetails[className].spellcasting;
						finalSetAttrs[repeatingString + 'spellcasting'] = classSpellcasting;
					}
				}
				if (exists(classSpellcasting)) {
					classesWithSpellcasting += 1;
					spellcasting[classSpellcasting] += classLevel;
				}

				if (className === 'sorcerer' || className === 'sorcerer') {
					sorcererLevels += classLevel;
				}
			}

			for (var key in hd) {
				if (hd.hasOwnProperty(key)) {
					if (hd[key] !== 0) {
						finalSetAttrs['hd_' + key + '_max'] = hd[key];
						finalSetAttrs['hd_' + key + '_toggle'] = 1;
					} else {
						finalSetAttrs['hd_' + key + '_max'] = 0;
						finalSetAttrs['hd_' + key + '_toggle'] = 0;
					}
				}
			}

			var casterLevel = 0;
			casterLevel += spellcasting.full;
			casterLevel += Math.floor(spellcasting.half / 2);
			casterLevel += Math.floor(spellcasting.third / 3);
			finalSetAttrs.caster_level = casterLevel;

			if (classesWithSpellcasting > 1 || spellcasting.full) {
				console.log('first if');
				finalSetAttrs.caster_type = 'full';
			} else if (spellcasting.half) {
				console.log('half');
				finalSetAttrs.caster_type = 'half';
			} else if (spellcasting.third) {
				console.log('third');
				finalSetAttrs.caster_type = 'third';
			} else {
				console.log('else');
				finalSetAttrs.caster_type = 'full';
			}

			console.log('finalSetAttrs.caster_type', finalSetAttrs.caster_type);

			finalSetAttrs.level = totalLevel;
			finalSetAttrs.class_and_level = levelArray.join(' ');

			if (sorcererLevels > 0) {
				finalSetAttrs.has_sorcerer_levels = 'on';
				if (sorcererLevels === 1) {
					finalSetAttrs.sorcery_points_max = 0;
				} else {
					finalSetAttrs.sorcery_points_max = sorcererLevels;
				}
			} else {
				finalSetAttrs.has_sorcerer_levels = 0;
			}
			if (spellcasting.warlock > 0) {
				finalSetAttrs.has_warlock_levels = 'on';

				if (spellcasting.warlock === 1) {
					finalSetAttrs.warlock_spell_slots_max = 1;
				} else if (spellcasting.warlock >= 2 && spellcasting.warlock < 11) {
					finalSetAttrs.warlock_spell_slots_max = 2;
				} else if (spellcasting.warlock >= 11 && spellcasting.warlock < 17) {
					finalSetAttrs.warlock_spell_slots_max = 3;
				} else {
					finalSetAttrs.warlock_spell_slots_max = 4;
				}
			} else {
				finalSetAttrs.has_warlock_levels = 0;
			}

			console.log('updateLevels', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});
};

on('change:repeating_class remove:repeating_class', function () {
	console.log('repeating_class');
	updateLevels();
});

var updateSpellSlots = function () {
	var collectionArray = ['level', 'caster_level', 'caster_type'];
	var finalSetAttrs = {};

	var spellSlots = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
		8: 0,
		9: 0
	};

	for (var i = 1; i <= 9; i++) {
		var repeatingString = 'spell_slots_l' + i + '_';
		collectionArray.push(repeatingString + 'calc');
		collectionArray.push(repeatingString + 'bonus');
		collectionArray.push(repeatingString + 'max');
	}
	getAttrs(collectionArray, function (v) {
		var casterLevel = getIntValue(v.level);
		var casterType = v.caster_type;
		if (!exists(casterType)) {
			casterType = 'full';
		}

		if (casterType === 'full') {
			casterLevel = getIntValue(v.caster_level);

			if (casterLevel >= 3) {
				spellSlots['1'] = 4;
			} else if (casterLevel === 2) {
				spellSlots['1'] = 3;
			} else if (casterLevel === 1) {
				spellSlots['1'] = 2;
			}
			if (casterLevel >= 4) {
				spellSlots['2'] = 3;
			} else if (casterLevel === 3) {
				spellSlots['2'] = 2;
			}
			if (casterLevel >= 6) {
				spellSlots['3'] = 3;
			} else if (casterLevel === 5) {
				spellSlots['3'] = 2;
			}
			if (casterLevel >= 9) {
				spellSlots['4'] = 3;
			} else if (casterLevel === 8) {
				spellSlots['4'] = 2;
			} else if (casterLevel === 7) {
				spellSlots['4'] = 1;
			}
			if (casterLevel >= 18) {
				spellSlots['5'] = 3;
			} else if (casterLevel >= 10) {
				spellSlots['5'] = 2;
			} else if (casterLevel === 9) {
				spellSlots['5'] = 1;
			}
			if (casterLevel >= 19) {
				spellSlots['6'] = 2;
			} else if (casterLevel >= 11) {
				spellSlots['6'] = 1;
			}
			if (casterLevel >= 20) {
				spellSlots['7'] = 2;
			} else if (casterLevel >= 13) {
				spellSlots['7'] = 1;
			}
			if (casterLevel >= 15) {
				spellSlots['8'] = 1;
			}
			if (casterLevel >= 17) {
				spellSlots['9'] = 1;
			}
		}

		if (casterType === 'half') {
			if (casterLevel >= 5) {
				spellSlots['1'] = 4;
			} else if (casterLevel >= 3) {
				spellSlots['1'] = 3;
			} else if (casterLevel === 2) {
				spellSlots['1'] = 2;
			}
			if (casterLevel >= 7) {
				spellSlots['2'] = 3;
			} else if (casterLevel >= 5) {
				spellSlots['2'] = 2;
			}
			if (casterLevel >= 11) {
				spellSlots['3'] = 3;
			} else if (casterLevel >= 9) {
				spellSlots['3'] = 2;
			}
			if (casterLevel >= 17) {
				spellSlots['4'] = 3;
			} else if (casterLevel >= 15) {
				spellSlots['4'] = 2;
			} else if (casterLevel >= 13) {
				spellSlots['4'] = 1;
			}
			if (casterLevel >= 19) {
				spellSlots['5'] = 2;
			} else if (casterLevel >= 17) {
				spellSlots['5'] = 1;
			}
		}

		if (casterType === 'third') {
			console.log('third casterLevel', casterLevel);
			if (casterLevel >= 7) {
				spellSlots['1'] = 4;
			} else if (casterLevel >= 4) {
				spellSlots['1'] = 3;
			} else if (casterLevel === 3) {
				spellSlots['1'] = 2;
			}
			if (casterLevel >= 10) {
				spellSlots['2'] = 3;
			} else if (casterLevel >= 7) {
				spellSlots['2'] = 2;
			}
			if (casterLevel >= 16) {
				spellSlots['3'] = 3;
			} else if (casterLevel >= 13) {
				spellSlots['3'] = 2;
			}
			if (casterLevel >= 19) {
				spellSlots['4'] = 1;
			}
		}

		for (var i = 1; i <= 9; i++) {
			var slotCalc = spellSlots[i];
			finalSetAttrs['spell_slots_l' + i + '_calc'] = slotCalc;

			var slotBonus = getIntValue(v['spell_slots_l' + i + '_bonus']);
			var spellSlotMax = slotCalc + slotBonus;
			finalSetAttrs['spell_slots_l' + i + '_max'] = spellSlotMax;

			if (spellSlotMax > 0) {
				finalSetAttrs['spell_slots_l' + i + '_toggle'] = 'on';
			} else {
				finalSetAttrs['spell_slots_l' + i + '_toggle'] = 0;
			}
		}

		setFinalAttrs(v, finalSetAttrs);
	});
};

on('change:caster_level change:spell_slots_l1_bonus change:spell_slots_l2_bonus change:spell_slots_l3_bonus change:spell_slots_l4_bonus change:spell_slots_l5_bonus change:spell_slots_l6_bonus change:spell_slots_l7_bonus change:spell_slots_l8_bonus change:spell_slots_l9_bonus', function () {
	updateSpellSlots();
});

var updatePb = function () {
	var collectionArray = ['level'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var level = getIntValue(v.level);
		var pb = 2 + Math.floor(Math.abs((level - 1) / 4));
		finalSetAttrs.pb = pb;
		finalSetAttrs.exp = pb * 2;
		finalSetAttrs.h_PB = pb / 2;

		console.log('updatePb', finalSetAttrs);
		setFinalAttrs(v, finalSetAttrs);
	});
};

on('change:level', function () {
	updatePb();
});

var sumRepeating = function (options, sumItems) {
	var repeatingItem = 'repeating_' + options.collection;
	var collectionArray = [];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + options.toggle);
			if (options.qty) {
				collectionArray.push(repeatingString + options.qty);
			}

			for (var x = 0; x < sumItems.length; x++) {
				finalSetAttrs[sumItems[x].totalField] = 0;
				if (sumItems[x].totalFieldSecondary) {
					finalSetAttrs[sumItems[x].totalFieldSecondary] = 0;
				}
				collectionArray.push(repeatingString + sumItems[x].fieldToAdd);
				if (sumItems[x].bonus) {
					collectionArray.push(repeatingString + sumItems[x].bonus);
				}
				if (sumItems[x].armorType) {
					collectionArray.push(repeatingString + sumItems[x].armorType);
				}
			}
		}
		if (options.getExtraFields) {
			collectionArray = collectionArray.concat(options.getExtraFields);
		}

		getAttrs(collectionArray, function (v) {
			var dexMod = 0;
			if (options.collection === 'armor') {
				dexMod = getIntValue(v.dexterity_mod);
			}

			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';
				var qty = getIntValue(v[repeatingString + options.qty], 1);

				for (var x = 0; x < sumItems.length; x++) {
					var sumItem = sumItems[x];
					var fieldToAdd = getFloatValue(v[repeatingString + sumItem.fieldToAdd]);
					if (sumItem.bonus) {
						fieldToAdd += getFloatValue(v[repeatingString + sumItem.bonus]);
					}
					if (sumItem.armorType) {
						if (v[repeatingString + sumItem.armorType] === 'Light Armor') {
							fieldToAdd += dexMod;
						} else if (v[repeatingString + sumItem.armorType] === 'Medium Armor') {
							var mediumArmorDexMod = getIntValue(v.medium_armor_max_dex, 2);
							fieldToAdd += Math.min(mediumArmorDexMod, dexMod);
						}
					}

					var itemTotal = Math.round(qty * fieldToAdd * 100) / 100;

					if (sumItem.itemTotal) {
						finalSetAttrs[repeatingString + sumItem.itemTotal] = itemTotal;
					}

					var toggle = v[repeatingString + options.toggle];
					if (toggle !== 0 && toggle !== '0') {
						var addToPrimary = true;
						var addToSecondary = false;

						if (sumItem.armorType) {
							if (v[repeatingString + sumItem.armorType] === 'Shield') {
								addToSecondary = true;
							} else if (v[repeatingString + sumItem.armorType] === 'Unarmored') {
								addToPrimary = false;
								addToSecondary = true;
							}
						}

						if (addToPrimary) {
							finalSetAttrs[sumItem.totalField] += itemTotal;
						}
						if (addToSecondary) {
							finalSetAttrs[sumItem.totalFieldSecondary] += itemTotal;
						}
					}
				}
			}
			for (var y = 0; y < sumItems.length; y++) {
				var item = sumItems[y];
				if (item.totalField && !exists(finalSetAttrs[item.totalField])) {
					finalSetAttrs[item.totalField] = 0;
				}
				if (item.totalFieldSecondary && !exists(finalSetAttrs[item.totalFieldSecondary])) {
					finalSetAttrs[item.totalFieldSecondary] = 0;
				}
			}


			if (options.collection === 'armor') {
				finalSetAttrs.ac_unarmored_calc += 10 + getIntValue(v.dexterity_mod) + getAbilityValue(v, v.ac_unarmored_ability);

				finalSetAttrs.ac = Math.max(finalSetAttrs.ac_armored_calc, finalSetAttrs.ac_unarmored_calc);
			}

			console.log('sumRepeating', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});
};

var updateArmor = function (rowId) {
	var repeatingItem = 'repeating_armor';
	var collectionArray = [];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		if (rowId) {
			ids = [];
			ids.push(rowId);
		}
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'modifiers');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				if (!exists(v[repeatingString + 'parsed']) || v[repeatingString + 'parsed'].indexOf('acBonus') === -1) {
					var armorModifiers = v[repeatingString + 'modifiers'];
					if (exists(armorModifiers)) {
						var acBonus = armorModifiers.replace(/^\D+/g, '');

						finalSetAttrs[repeatingString + 'ac_bonus'] = acBonus;
					}
					if (!exists(finalSetAttrs[repeatingString + 'parsed'])) {
						finalSetAttrs[repeatingString + 'parsed'] = '';
					}
					finalSetAttrs[repeatingString + 'parsed'] += ' acBonus';
				}
			}

			console.log('updateArmor', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});

	var options = {
		collection: 'armor',
		getExtraFields: ['medium_armor_max_dex', 'ac_unarmored_ability', 'ac_unarmored_bonus'],
		toggle: 'worn'
	};
	for (var i = 0; i < ABILITIES.length; i++) {
		options.getExtraFields.push(ABILITIES[i] + '_mod');
	}
	var sumItems = [
		{
			fieldToAdd: 'weight',
			totalField: 'weight_armor'
		},
		{
			fieldToAdd: 'ac_base',
			bonus: 'ac_bonus',
			armorType: 'type',
			itemTotal: 'ac_total',
			totalField: 'ac_armored_calc',
			totalFieldSecondary: 'ac_unarmored_calc'
		}
	];
	sumRepeating(options, sumItems);
};
on('change:repeating_armor', function (eventInfo) {
	var changedField = getRepeatingField('repeating_armor', eventInfo);
	if (changedField !== 'ac_total') {
		var rowId = getRowId('repeating_armor', eventInfo);
		updateArmor(rowId);
	}
});
on('change:medium_armor_max_dex change:ac_unarmored_ability remove:repeating_armor', function () {
	updateArmor();
});

var updateEquipment = function (rowId) {
	var repeatingItem = 'repeating_equipment';
	var collectionArray = [];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		if (rowId) {
			ids = [];
			ids.push(rowId);
		}
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'content');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				if (!exists(v[repeatingString + 'parsed']) || v[repeatingString + 'parsed'].indexOf('content') === -1) {
					var content = v[repeatingString + 'content'];
					if (exists(content)) {
						content = content.replace(/\s(\d+d\d+\s(?:\+|\-)\s\d+)\s/g, ' [[$1]] ')
							.replace(/\s(\d+d\d+)\s/g, ' [[$1]] ')
							.replace(/\s(\d+)\s/g, ' [[$1]] ');

						finalSetAttrs[repeatingString + 'content'] = content;
					}
					if (!exists(finalSetAttrs[repeatingString + 'parsed'])) {
						finalSetAttrs[repeatingString + 'parsed'] = '';
					}
					finalSetAttrs[repeatingString + 'parsed'] += ' content';
				}
			}

			console.log('updateEquipment', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});
};

on('change:repeating_equipment', function (eventInfo) {
	var rowId = getRowId('repeating_equipment', eventInfo);
	updateEquipment(rowId);
});
on('change:repeating_equipment remove:repeating_equipment', function () {
	var options = {
		collection: 'equipment',
		toggle: 'carried',
		qty: 'qty'
	};
	var sumItems = [
		{
			fieldToAdd: 'weight',
			itemTotal: 'weight_total',
			totalField: 'weight_equipment'
		}
	];
	sumRepeating(options, sumItems);
});

on('change:pb', function () {
	console.log('pb changed');
	updateAttack();
	updateSpell();
	updateJackOfAllTrades();
});

var updateJackOfAllTrades = function () {
	var collectionArray = ['pb'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);

		console.log('updateJackOfAllTrades', finalSetAttrs);
		setFinalAttrs(v, finalSetAttrs);
	});
};
on('change:jack_of_all_trades_toggle', function () {
	updateJackOfAllTrades();
});

var updateInitiative = function () {
	var collectionArray = ['dexterity_mod', 'dexterity_check_bonus', 'initiative_bonus', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'global_check_bonus'];
	var finalSetAttrs = {};

	finalSetAttrs.initiative = 0;
	finalSetAttrs.initiative_formula = '';
	getAttrs(collectionArray, function (v) {

		var dexMod = getIntValue(v.dexterity_mod);
		if (exists(dexMod)) {
			finalSetAttrs.initiative += dexMod;
			finalSetAttrs.initiative_formula += dexMod + '[dex]';
		}

		var dexCheckBonus = getIntValue(v.dexterity_check_bonus);
		if (exists(dexCheckBonus)) {
			finalSetAttrs.initiative += dexCheckBonus;
			finalSetAttrs.initiative_formula += dexCheckBonus + '[dex check bonus]';
		}

		var initiativeBonus = getIntValue(v.initiative_bonus);
		if (exists(initiativeBonus)) {
			finalSetAttrs.initiative += initiativeBonus;
			finalSetAttrs.initiative_formula += ADD + initiativeBonus + '[initiative bonus]';
		}

		if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
			var jackOfAllTrades = getIntValue(v.jack_of_all_trades);
			if (exists(jackOfAllTrades)) {
				finalSetAttrs.initiative += jackOfAllTrades;
				finalSetAttrs.initiative_formula += ADD + jackOfAllTrades + '[jack of all trades]';
			}
		}

		var globalCheckBonus = getIntValue(v.global_check_bonus);
		if (exists(globalCheckBonus)) {
			finalSetAttrs.initiative += globalCheckBonus;
			finalSetAttrs.initiative_formula += ADD + globalCheckBonus + '[global check bonus]';
		}

		console.log('updateInitiative', finalSetAttrs);
		setFinalAttrs(v, finalSetAttrs);
	});
};
on('change:dexterity_mod change:dexterity_check_bonus change:initiative_bonus change:jack_of_all_trades_toggle change:jack_of_all_trades change:global_check_bonus', function () {
	updateInitiative();
});

var updateWeight = function () {
	var collectionArray = ['weight_attacks', 'weight_armor', 'weight_equipment', 'weight_coinage', 'weight_misc'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.weight_total = Math.round((getFloatValue(v.weight_attacks) + getFloatValue(v.weight_armor) + getFloatValue(v.weight_equipment) + getFloatValue(v.weight_coinage) + getFloatValue(v.weight_misc)) * 100) / 100;

		console.log('updateWeight', finalSetAttrs);
		setFinalAttrs(v, finalSetAttrs);
	});
};
on('change:weight_attacks change:weight_armor change:weight_equipment change:weight_coinage change:weight_misc', function () {
	updateWeight();
});

on('change:repeating_attack', function (eventInfo) {
	var changedField = getRepeatingField('repeating_attack', eventInfo);
	if (changedField !== 'toggle_details' && changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'parsed') {
		var rowId = getRowId('repeating_attack', eventInfo);
		updateAttack(rowId);
	}
	updateAttackQuery();
});
on('change:repeating_attack remove:repeating_attack', function () {
	var options = {
		collection: 'attack',
		toggle: 'carried'
	};
	var sumItems = [
		{
			fieldToAdd: 'weight',
			totalField: 'weight_attacks'
		}
	];
	sumRepeating(options, sumItems);
});
on('change:global_attack_bonus change:global_melee_attack_bonus change:global_ranged_attack_bonus change:global_damage_bonus change:global_melee_damage_bonus change:global_ranged_damage_bonus', function () {
	updateAttack();
});

var updateAttackToggle = function (v, finalSetAttrs, repeatingString, options) {
	var attackParse = {
		attackAbility: options.attackAbility,
		parseName: 'attack',
		toggleField: 'roll_toggle',
		toggleFieldSetTo: '@{roll_toggle_var}',
		triggerFields: ['type']
	};
	parseAttackComponents(v, repeatingString, finalSetAttrs, attackParse);

	var attackFormula = '';
	var attackToggle = v[repeatingString + 'roll_toggle'];

	var toHit = 0;
	if (!attackToggle || attackToggle === '@{roll_toggle_var}') {
		var proficiency = v[repeatingString + 'proficiency'];
		if (!proficiency || proficiency === 'on') {
			var pb = getIntValue(v.pb);
			toHit += pb;
			attackFormula += pb + '[proficient]';
		} else {
			attackFormula += 0 + '[unproficient]';
		}

		var attackAbility = v[repeatingString + 'attack_ability'];
		if (finalSetAttrs[repeatingString + 'attack_ability']) {
			attackAbility = finalSetAttrs[repeatingString + 'attack_ability'];
		}
		attackAbility = getAbilityValue(v, attackAbility, options.defaultAbility);
		if (exists(attackAbility)) {
			toHit += attackAbility;
			attackFormula += ADD + attackAbility + '[' + getAbilityShortName(v[repeatingString + 'attack_ability']) + ']';
		}

		var attackBonus = getIntValue(v[repeatingString + 'attack_bonus']);
		if (exists(attackBonus)) {
			toHit += attackBonus;
			attackFormula += ADD + attackBonus + '[bonus]';
		}

		if (exists(options.globalAttackBonus)) {
			toHit += options.globalAttackBonus;
			attackFormula += ADD + options.globalAttackBonus + '[' + options.globalAttackBonusLabel + ']';
		}

		if (!v[repeatingString + 'type'] || v[repeatingString + 'type'] === 'Melee Weapon') {
			if (exists(options.globalMeleeAttackBonus)) {
				toHit += options.globalMeleeAttackBonus;
				attackFormula += ADD + options.globalMeleeAttackBonus + '[global melee attack bonus]';
			}
		} else if (v[repeatingString + 'type'] === 'Ranged Weapon') {
			if (exists(options.globalRangedAttackBonus)) {
				toHit += options.globalRangedAttackBonus;
				attackFormula += ADD + options.globalRangedAttackBonus + '[global ranged attack bonus]';
			}
		}
	}
	if (!exists(toHit)) {
		toHit = 0;
	}
	if (options.type === 'attack') {
		finalSetAttrs[repeatingString + 'to_hit'] = toHit;
	}
	finalSetAttrs[repeatingString + 'attack_formula'] = attackFormula;
};

var updateSavingThrowToggle = function (v, finalSetAttrs, repeatingString, options) {
	var savingThrowParse = {
		parseName: 'savingThrow',
		toggleField: 'saving_throw_toggle',
		toggleFieldSetTo: '@{saving_throw_toggle_var}',
		triggerFields: ['saving_throw_vs_ability']
	};
	parseAttackComponents(v, repeatingString, finalSetAttrs, savingThrowParse);

	var savingThrowToggle = v[repeatingString + 'saving_throw_toggle'];
	if (savingThrowToggle === '@{saving_throw_toggle_var}') {
		var savingThrowDC = 8 + getIntValue(v.pb);
		var savingThrowAbility = v[repeatingString + 'saving_throw_ability'];
		if (!savingThrowAbility && savingThrowAbility !== '0') {
			savingThrowAbility = v.default_ability;
			finalSetAttrs[repeatingString + 'saving_throw_ability'] = v.default_ability;
		}

		savingThrowDC += getAbilityValue(v, savingThrowAbility, 'strength_mod');
		if (options && options.bonusDC) {
			savingThrowDC += getIntValue(options.bonusDC);
		}
		savingThrowDC += getIntValue(v[repeatingString + 'saving_throw_bonus']);
		finalSetAttrs[repeatingString + 'saving_throw_dc'] = savingThrowDC;
	}
};

var updateDamageToggle = function (v, finalSetAttrs, repeatingString, options) {
	var damageParse = {
		addCastingModifier: exists(v[repeatingString + 'add_casting_modifier']),
		parseName: 'damage',
		toggleField: 'damage_toggle',
		toggleFieldSetTo: '@{damage_toggle_var}',
		triggerFields: ['damage']
	};
	parseAttackComponents(v, repeatingString, finalSetAttrs, damageParse);

	var damageString = '';
	var damageFormula = '';
	var damageToggle = v[repeatingString + 'damage_toggle'];

	if (!damageToggle || damageToggle === '@{damage_toggle_var}') {
		var damageAddition = 0;

		var damage = v[repeatingString + 'damage'];
		if (exists(damage)) {
			damageString += damage;
			damageFormula += damage + '[damage]';
		}

		if (!options.defaultDamageAbility) {
			options.defaultDamageAbility = 0;
		}

		var damageAbility = v[repeatingString + 'damage_ability'];
		if (exists(damageAbility) || options.defaultDamageAbility) {
			damageAbility = getAbilityValue(v, damageAbility, options.defaultDamageAbility);
			if (exists(damageAbility)) {
				damageAddition += damageAbility;
				if (damageFormula !== '') {
					damageFormula += ADD;
				}
				damageFormula += damageAbility + '[' + getAbilityShortName(v[repeatingString + 'damage_ability']) + ']';
			}
		}

		var damageBonus = getIntValue(v[repeatingString + 'damage_bonus']);
		if (exists(damageBonus)) {
			damageAddition += damageBonus;
			if (damageFormula !== '') {
				damageFormula += ADD;
			}
			damageFormula += damageBonus + '[bonus]';
		}

		if (exists(options.globalDamageBonus)) {
			damageAddition += options.globalDamageBonus;
			damageFormula += ADD + options.globalDamageBonus + '[global damage bonus]';
		}

		if (options && options.globalMeleeDamageBonus && !v[repeatingString + 'type'] || v[repeatingString + 'type'] === 'Melee Weapon') {
			damageAddition += options.globalMeleeDamageBonus;
			if (damageFormula !== '') {
				damageFormula += ADD;
			}
			damageFormula += options.globalMeleeDamageBonus + '[global melee damage bonus]';
		} else if (options && options.globalRangedDamageBonus && v[repeatingString + 'type'] === 'Ranged Weapon') {
			damageAddition += options.globalRangedDamageBonus;
			if (damageFormula !== '') {
				damageFormula += ADD;
			}
			damageFormula += options.globalRangedDamageBonus + '[global ranged damage bonus]';
		}

		if (exists(damageAddition)) {
			damageString += ADD + damageAddition;
		}

		var damageType = v[repeatingString + 'damage_type'];
		if (exists(damageType)) {
			if (hasUpperCase(damageType)) {
				finalSetAttrs[repeatingString + 'damage_type'] = damageType.toLowerCase();
			}
			damageString += SPACE + damageType;
		}
	}
	if (!exists(damageFormula)) {
		damageFormula = 0;
	}
	finalSetAttrs[repeatingString + 'damage_formula'] = damageFormula;

	var secondDamageParse = {
		parseName: 'secondDamage',
		toggleField: 'second_damage_toggle',
		toggleFieldSetTo: '@{second_damage_toggle_var}',
		triggerFields: ['second_damage']
	};
	parseAttackComponents(v, repeatingString, finalSetAttrs, secondDamageParse);

	var secondDamageFormula = '';

	var secondDamageToggle = v[repeatingString + 'second_damage_toggle'];
	if (secondDamageToggle === '@{second_damage_toggle_var}') {
		var secondDamageAddition = 0;
		var secondDamage = v[repeatingString + 'second_damage'];
		if (exists(secondDamage)) {
			damageString += ADD + secondDamage;
			secondDamageFormula += secondDamage + '[second damage]';
		}

		var secondDamageAbility = v[repeatingString + 'second_damage_ability'];
		if (exists(secondDamageAbility)) {
			secondDamageAbility = getAbilityValue(v, secondDamageAbility);
			if (exists(secondDamageAbility)) {
				secondDamageAddition += secondDamageAbility;
				if (secondDamageFormula !== '') {
					secondDamageFormula += ADD;
				}
				secondDamageFormula += secondDamageAbility + '[' + getAbilityShortName(v[repeatingString + 'second_damage_ability']) + ']';
			}
		}

		var secondDamageBonus = getIntValue(v[repeatingString + 'second_damage_bonus']);
		if (exists(secondDamageBonus)) {
			secondDamageAddition += secondDamageBonus;
			if (secondDamageFormula !== '') {
				secondDamageFormula += ADD;
			}
			secondDamageFormula += secondDamageBonus + '[bonus]';
		}

		if (exists(secondDamageAddition)) {
			damageString += ADD + secondDamageAddition;
		}

		var secondDamageType = v[repeatingString + 'second_damage_type'];
		if (exists(secondDamageType)) {
			if (hasUpperCase(secondDamageType)) {
				finalSetAttrs[repeatingString + 'second_damage_type'] = secondDamageType.toLowerCase();
			}
			damageString += SPACE + secondDamageType;
		}

	}
	if (!exists(secondDamageFormula)) {
		secondDamageFormula = 0;
	}
	if (!exists(damageString)) {
		damageString = ' ';
	}
	finalSetAttrs[repeatingString + 'second_damage_formula'] = secondDamageFormula;
	if (options.type === 'attack') {
		finalSetAttrs[repeatingString + 'damage_string'] = damageString;
	}
};

var updateHealToggle = function (v, finalSetAttrs, repeatingString) {
	var healParse = {
		addCastingModifier: exists(v[repeatingString + 'add_casting_modifier']),
		parseName: 'heal',
		toggleField: 'heal_toggle',
		toggleFieldSetTo: '@{heal_toggle_var}',
		triggerFields: ['heal']
	};
	parseAttackComponents(v, repeatingString, finalSetAttrs, healParse);

	var healFormula = '@{heal}[heal]';
	var healToggle = v[repeatingString + 'heal_toggle'];
	if (healToggle === '@{heal_toggle_var}') {
		var healAbility = v[repeatingString + 'heal_ability'];
		healAbility = getAbilityValue(v, healAbility);
		if (exists(healAbility)) {
			healFormula += ADD + healAbility + '[' + getAbilityShortName(v[repeatingString + 'heal_ability']) + ']';
		}

		var healBonus = getIntValue(v[repeatingString + 'heal_bonus']);
		if (exists(healBonus)) {
			healFormula += ADD + healBonus + '[bonus]';
		}

		if (exists(v.global_spell_heal_bonus)) {
			healFormula += ADD + '@{global_spell_heal_bonus}[global spell heal bonus]';
		}
	}

	finalSetAttrs[repeatingString + 'heal_formula'] = healFormula;
	console.log('updateHealToggle', finalSetAttrs);
};

var updateHigherLevelToggle = function (v, finalSetAttrs, repeatingString) {
	var higherLevelParse = {
		addCastingModifier: exists(v[repeatingString + 'add_casting_modifier']),
		parseName: 'higherLevel',
		toggleField: 'higher_level_toggle',
		toggleFieldSetTo: '@{higher_level_toggle_var}',
		triggerFields: ['higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal']
	};
	parseAttackComponents(v, repeatingString, finalSetAttrs, higherLevelParse);

	var higherLevelToggle = v[repeatingString + 'higher_level_toggle'];
	if (exists(higherLevelToggle) && higherLevelToggle === '@{higher_level_toggle_var}') {
		var spellLevelQuery = '?{Spell Level';

		var spellLevel = getIntValue(v[repeatingString + 'spell_level']);
		for (var i = spellLevel; i <= 9; i++) {
			spellLevelQuery += '|' + i;
		}
		spellLevelQuery += '}';
		finalSetAttrs[repeatingString + 'higher_level_query'] = spellLevelQuery;

		var damageToggle = v[repeatingString + 'damage_toggle'];
		if (damageToggle && damageToggle === '@{damage_toggle_var}') {
			finalSetAttrs[repeatingString + 'damage_formula'] += ADD + '((@{higher_level_query} - @{spell_level}) * @{higher_level_dice})@{higher_level_die}[higher lvl]';
		}

		var secondDamageToggle = v[repeatingString + 'second_damage_toggle'];
		if (secondDamageToggle && secondDamageToggle === '@{second_damage_toggle_var}') {
			finalSetAttrs[repeatingString + 'second_damage_formula'] += ADD + '((@{higher_level_query} - @{spell_level}) * @{second_higher_level_dice})@{second_higher_level_die}[higher lvl]';
		}

		var healToggle = v[repeatingString + 'heal_toggle'];
		if (healToggle && healToggle === '@{heal_toggle_var}') {
			finalSetAttrs[repeatingString + 'heal_formula'] += ADD + '((@{higher_level_query} - @{spell_level}) * @{higher_level_dice})@{higher_level_die}[higher lvl] + (@{higher_level_heal} * (@{higher_level_query} - @{spell_level}))[higher lvl flat amount]';
		}
	}
	console.log('updateHigherLevelToggle', finalSetAttrs);
};

var updateAttackQuery = function () {
	var repeatingItem = 'repeating_attack';
	var collectionArray = [];
	var finalSetAttrs = {};

	finalSetAttrs.attack_query_var = '?{Attack';

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'reach');
			collectionArray.push(repeatingString + 'range');
			collectionArray.push(repeatingString + 'ammo');
			collectionArray.push(repeatingString + 'to_hit');
			collectionArray.push(repeatingString + 'attack_formula');
			collectionArray.push(repeatingString + 'roll_toggle');
			collectionArray.push(repeatingString + 'saving_throw_toggle');
			collectionArray.push(repeatingString + 'damage_toggle');
			collectionArray.push(repeatingString + 'reach');
			collectionArray.push(repeatingString + 'second_damage_toggle');
			collectionArray.push(repeatingString + 'extras_toggle');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				finalSetAttrs.attack_query_var += '|' + v[repeatingString + 'name'] + ',';
				finalSetAttrs.attack_query_var += ' {{title=' + v[repeatingString + 'name'] + '&#125;&#125;';
				finalSetAttrs.attack_query_var += '{{reach=' + emptyIfUndefined(v[repeatingString + 'reach']) + '&#125;&#125;';
				finalSetAttrs.attack_query_var += '{{range=' + emptyIfUndefined(v[repeatingString + 'range']) + '&#125;&#125;';
				finalSetAttrs.attack_query_var += '{{ammo=' + emptyIfUndefined(v[repeatingString + 'ammo']) + '&#125;&#125;';
				finalSetAttrs.attack_query_var += '' + emptyIfUndefined(v[repeatingString + 'roll_toggle']);
				finalSetAttrs.attack_query_var += '' + emptyIfUndefined(v[repeatingString + 'saving_throw_toggle']);
				finalSetAttrs.attack_query_var += '' + emptyIfUndefined(v[repeatingString + 'damage_toggle']);
				finalSetAttrs.attack_query_var += '' + emptyIfUndefined(v[repeatingString + 'second_damage_toggle']);
				finalSetAttrs.attack_query_var += '' + emptyIfUndefined(v[repeatingString + 'extras_toggle']);
			}
			finalSetAttrs.attack_query_var += '}';

			console.log('updateAttackQuery', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});
};

var updateAttack = function (rowId) {
	var repeatingItem = 'repeating_attack';
	var collectionArray = ['pb', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
	var finalSetAttrs = {};

	for (var i = 0; i < ABILITIES.length; i++) {
		collectionArray.push(ABILITIES[i] + '_mod');
	}

	getSectionIDs(repeatingItem, function (ids) {
		if (rowId) {
			ids = [];
			ids.push(rowId);
		}
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'type');
			collectionArray.push(repeatingString + 'roll_toggle');
			collectionArray.push(repeatingString + 'to_hit');
			collectionArray.push(repeatingString + 'attack_formula');
			collectionArray.push(repeatingString + 'proficiency');
			collectionArray.push(repeatingString + 'attack_ability');
			collectionArray.push(repeatingString + 'attack_bonus');
			collectionArray.push(repeatingString + 'saving_throw_toggle');
			collectionArray.push(repeatingString + 'saving_throw_ability');
			collectionArray.push(repeatingString + 'saving_throw_bonus');
			collectionArray.push(repeatingString + 'saving_throw_dc');
			collectionArray.push(repeatingString + 'damage_toggle');
			collectionArray.push(repeatingString + 'damage_formula');
			collectionArray.push(repeatingString + 'damage');
			collectionArray.push(repeatingString + 'damage_ability');
			collectionArray.push(repeatingString + 'damage_bonus');
			collectionArray.push(repeatingString + 'damage_type');
			collectionArray.push(repeatingString + 'second_damage_toggle');
			collectionArray.push(repeatingString + 'second_damage_formula');
			collectionArray.push(repeatingString + 'second_damage');
			collectionArray.push(repeatingString + 'second_damage_ability');
			collectionArray.push(repeatingString + 'second_damage_bonus');
			collectionArray.push(repeatingString + 'second_damage_type');
			collectionArray.push(repeatingString + 'damage_string');
			collectionArray.push(repeatingString + 'modifiers');
			collectionArray.push(repeatingString + 'parsed');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				if (!exists(v[repeatingString + 'parsed']) || v[repeatingString + 'parsed'].indexOf('modifiers') === -1) {
					var attackModifiers = v[repeatingString + 'modifiers'];
					if (exists(attackModifiers)) {
						var attackBonus = attackModifiers.replace(/.*(?:Melee|Ranged) Attacks \+(\d+).*/gi, '$1');
						var damageBonus = attackModifiers.replace(/.*(?:Melee|Ranged) Damage \+(\d+).*/gi, '$1');

						finalSetAttrs[repeatingString + 'attack_bonus'] = attackBonus;
						finalSetAttrs[repeatingString + 'damage_bonus'] = damageBonus;
						if (!finalSetAttrs[repeatingString + 'parsed']) {
							finalSetAttrs[repeatingString + 'parsed'] = '';
						}
						finalSetAttrs[repeatingString + 'parsed'] += ' modifiers';
					}
				}

				var attackOptions = {
					defaultAbility: 'strength_mod',
					globalAttackBonus: getIntValue(v.global_attack_bonus),
					globalAttackBonusLabel: 'global attack bonus',
					globalMeleeAttackBonus: getIntValue(v.global_melee_attack_bonus),
					globalRangedAttackBonus: getIntValue(v.global_ranged_attack_bonus),
					type: 'attack'
				};
				updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

				updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

				var damageOptions = {
					defaultDamageAbility: 'strength_mod',
					globalDamageBonus: getIntValue(v.global_damage_bonus),
					globalMeleeDamageBonus: getIntValue(v.global_melee_damage_bonus),
					globalRangedDamageBonus: getIntValue(v.global_ranged_damage_bonus),
					type: 'attack'
				};
				updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
			}

			console.log('updateAttack', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});
};

var updateSpell = function (rowId) {
	var repeatingItem = 'repeating_spell';
	var collectionArray = ['pb', 'finesse_mod', 'global_spell_attack_bonus', 'global_spell_damage_bonus', 'global_spell_dc_bonus', 'global_spell_heal_bonus', 'default_ability'];
	var finalSetAttrs = {};

	for (var i = 0; i < ABILITIES.length; i++) {
		collectionArray.push(ABILITIES[i] + '_mod');
	}

	getSectionIDs(repeatingItem, function (ids) {
		if (rowId) {
			ids = [];
			ids.push(rowId);
		}
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'type');
			collectionArray.push(repeatingString + 'roll_toggle');
			collectionArray.push(repeatingString + 'to_hit');
			collectionArray.push(repeatingString + 'attack_formula');
			collectionArray.push(repeatingString + 'proficiency');
			collectionArray.push(repeatingString + 'attack_ability');
			collectionArray.push(repeatingString + 'attack_bonus');
			collectionArray.push(repeatingString + 'saving_throw_toggle');
			collectionArray.push(repeatingString + 'saving_throw_ability');
			collectionArray.push(repeatingString + 'saving_throw_vs_ability');
			collectionArray.push(repeatingString + 'saving_throw_bonus');
			collectionArray.push(repeatingString + 'saving_throw_dc');
			collectionArray.push(repeatingString + 'damage_toggle');
			collectionArray.push(repeatingString + 'damage_formula');
			collectionArray.push(repeatingString + 'damage');
			collectionArray.push(repeatingString + 'damage_ability');
			collectionArray.push(repeatingString + 'damage_bonus');
			collectionArray.push(repeatingString + 'damage_type');
			collectionArray.push(repeatingString + 'second_damage_toggle');
			collectionArray.push(repeatingString + 'second_damage_formula');
			collectionArray.push(repeatingString + 'second_damage');
			collectionArray.push(repeatingString + 'second_damage_ability');
			collectionArray.push(repeatingString + 'second_damage_bonus');
			collectionArray.push(repeatingString + 'second_damage_type');
			collectionArray.push(repeatingString + 'damage_string');
			collectionArray.push(repeatingString + 'parsed');
			collectionArray.push(repeatingString + 'spell_level');
			collectionArray.push(repeatingString + 'casting_time');
			collectionArray.push(repeatingString + 'components');
			collectionArray.push(repeatingString + 'heal_toggle');
			collectionArray.push(repeatingString + 'heal');
			collectionArray.push(repeatingString + 'heal_ability');
			collectionArray.push(repeatingString + 'heal_bonus');
			collectionArray.push(repeatingString + 'add_casting_modifier');
			collectionArray.push(repeatingString + 'higher_level_toggle');
			collectionArray.push(repeatingString + 'higher_level_dice');
			collectionArray.push(repeatingString + 'higher_level_die');
			collectionArray.push(repeatingString + 'second_higher_level_dice');
			collectionArray.push(repeatingString + 'second_higher_level_die');
			collectionArray.push(repeatingString + 'higher_level_heal');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				var spellLevel = v[repeatingString + 'spell_level'];
				if (!exists(spellLevel)) {
					finalSetAttrs[repeatingString + 'spell_level'] = 0;
				}

				var spellComponents = v[repeatingString + 'components'];
				if (exists(spellComponents)) {
					if (spellComponents.indexOf('V') !== -1) {
						finalSetAttrs[repeatingString + 'components_verbal'] = 1;
					}
					if (spellComponents.indexOf('S') !== -1) {
						finalSetAttrs[repeatingString + 'components_somatic'] = 1;
					}
					if (spellComponents.indexOf('M') !== -1) {
						finalSetAttrs[repeatingString + 'components_material'] = 1;
					}
				}

				var attackOptions = {
					attackAbility: true,
					globalAttackBonus: getIntValue(v.global_spell_attack_bonus),
					type: 'spell'
				};
				updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

				var savingThrowOptions = {
					bonusDC: v.global_spell_dc_bonus
				};
				updateSavingThrowToggle(v, finalSetAttrs, repeatingString, savingThrowOptions);

				var damageOptions = {
					globalDamageBonus: getIntValue(v.global_spell_damage_bonus),
					type: 'spell'
				};
				updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);

				updateHealToggle(v, finalSetAttrs, repeatingString);

				updateHigherLevelToggle(v, finalSetAttrs, repeatingString);
			}

			console.log('updateSpell', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});
};

on('change:repeating_spell', function (eventInfo) {
	var changedField = getRepeatingField('repeating_spell', eventInfo);
	if (changedField !== 'toggle_details' && changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'heal_formula' && changedField !== 'higher_level_query' && changedField !== 'parsed') {
		console.log('spell changedField', changedField);
		var rowId = getRowId('repeating_spell', eventInfo);
		updateSpell(rowId);
	}
});
on('change:global_spell_attack_bonus change:global_spell_damage_bonus change:global_spell_dc_bonus change:global_spell_heal_bonus', function () {
	console.log('updateSpell trigged by global');
	updateSpell();
});

var updateD20Mod = function () {
	var collectionArray = ['halfling_luck'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.halfling_luck === 'on') {
			finalSetAttrs.d20_mod = 'ro<1[halfling luck]';
		} else {
			finalSetAttrs.d20_mod = '';
		}

		console.log('updateD20Mod', finalSetAttrs);
		setFinalAttrs(v, finalSetAttrs);
	});
};

on('change:halfling_luck', function () {
	updateD20Mod();
});

var updateSkill = function (rowId) {
	console.log('updateSkill', rowId);
	var repeatingItem = 'repeating_skill';
	var collectionArray = ['jack_of_all_trades_toggle', 'jack_of_all_trades', 'pb', 'exp', 'global_check_bonus'];
	var finalSetAttrs = {};

	for (var i = 0; i < ABILITIES.length; i++) {
		collectionArray.push(ABILITIES[i] + '_mod');
		collectionArray.push(ABILITIES[i] + '_check_bonus');
	}

	getSectionIDs(repeatingItem, function (ids) {
		if (rowId) {
			ids = [];
			ids.push(rowId);
		}
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'proficiency');
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'ability');
			collectionArray.push(repeatingString + 'bonus');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				var ability = v[repeatingString + 'ability'];
				if (ability) {
					ability = ability.replace(/\W/g, '');
				} else {
					ability = 'strength';
				}
				finalSetAttrs[repeatingString + 'ability_short_name'] = capitalizeFirstLetter(firstThreeChars(ability));

				var total = 0;
				var totalFormula = '';

				var proficiency = v[repeatingString + 'proficiency'];
				if (!proficiency || proficiency === 'unproficient') {
					if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
						var jackOfAllTrades = getIntValue(v.jack_of_all_trades);
						total += jackOfAllTrades;
						totalFormula += jackOfAllTrades + '[jack of all trades]';
					} else {
						totalFormula += 0 + '[unproficient]';
					}
				} else if (proficiency === 'proficient') {
					var pb = getIntValue(v.pb);
					total += pb;
					totalFormula += pb + '[proficient]';
				} else if (proficiency === 'expertise') {
					var exp = getIntValue(v.exp);
					total += exp;
					totalFormula += exp + '[expertise]';
				}

				var skillAbility = getAbilityValue(v, ability, 'strength_mod');
				if (exists(skillAbility)) {
					total += skillAbility;
					totalFormula += ADD + skillAbility + '[' + getAbilityShortName(ability) + ']';
				}

				var skillBonus = getIntValue(v[repeatingString + 'bonus']);
				if (exists(skillBonus)) {
					total += skillBonus;
					totalFormula += ADD + skillBonus + '[bonus]';
				}

				var skillAbilityName = getAbilityName(ability);
				if (exists(skillAbilityName)) {
					var checkBonus = v[skillAbilityName + '_check_bonus'];
					if (exists(checkBonus)) {
						checkBonus = getIntValue(checkBonus);
						total += checkBonus;
						totalFormula += ADD + checkBonus + '[' + getAbilityShortName(ability) + ' check bonus]';
					}
				}

				var globalCheckBonus = getIntValue(v.global_check_bonus);
				if (exists(globalCheckBonus)) {
					total += globalCheckBonus;
					totalFormula += ADD + globalCheckBonus + '[global check bonus]';
				}

				finalSetAttrs[repeatingString + 'total'] = total;
				finalSetAttrs[repeatingString + 'formula'] = totalFormula;
			}

			console.log('updateSkill', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});
};

on('change:repeating_skill', function (eventInfo) {
	var changedField = getRepeatingField('repeating_skill', eventInfo);
	if (changedField !== 'ability_short_name' && changedField !== 'total' && changedField !== 'formula') {
		console.log('changedField', changedField);
		var rowId = getRowId('repeating_skill', eventInfo);
		console.log('change:repeating_skill', rowId);
		updateSkill(rowId);
	}
});
on('change:jack_of_all_trades_toggle change:jack_of_all_trades change:global_check_bonus change:strength_check_bonus change:dexterity_check_bonus change:constitution_check_bonus change:intelligence_check_bonus change:wisdom_check_bonus change:charisma_check_bonus', function () {
	updateSkill();
});

var sheetOpened = function () {
	var collectionArray = ['version'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var version = getFloatValue(v.version);

		if (!version) {
			var skills = [
				{
					'name': 'Acrobatics',
					'ability': 'dexterity'
				},
				{
					'name': 'Animal Handling',
					'ability': 'wisdom'
				},
				{
					'name': 'Arcana',
					'ability': 'intelligence'
				},
				{
					'name': 'Athletics',
					'ability': 'strength'
				},
				{
					'name': 'Deception',
					'ability': 'charisma'
				},
				{
					'name': 'History',
					'ability': 'intelligence'
				},
				{
					'name': 'Insight',
					'ability': 'wisdom'
				},
				{
					'name': 'Intimidation',
					'ability': 'charisma'
				},
				{
					'name': 'Investigation',
					'ability': 'intelligence'
				},
				{
					'name': 'Medicine',
					'ability': 'wisdom'
				},
				{
					'name': 'Nature',
					'ability': 'intelligence'
				},
				{
					'name': 'Perception',
					'ability': 'wisdom'
				},
				{
					'name': 'Performance',
					'ability': 'charisma'
				},
				{
					'name': 'Persuasion',
					'ability': 'charisma'
				},
				{
					'name': 'Religion',
					'ability': 'intelligence'
				},
				{
					'name': 'Sleight of Hand',
					'ability': 'dexterity'
				},
				{
					'name': 'Stealth',
					'ability': 'dexterity'
				},
				{
					'name': 'Survival',
					'ability': 'wisdom'
				}
			];

			for (var i = 0; i < skills.length; i++) {
				var newRowId = generateRowID();
				var repeatingString = 'repeating_skill_' + newRowId + '_';
				finalSetAttrs[repeatingString + 'name'] = skills[i].name;
				finalSetAttrs[repeatingString + 'ability'] = '@{' + skills[i].ability + '_mod}';
				updateSkill(newRowId);
			}
		}

		if (!version || version !== currentVersion) {
			finalSetAttrs.version = currentVersion;
		}

		console.log('sheetOpened', finalSetAttrs);
		setFinalAttrs(v, finalSetAttrs);
	});
};

on('sheet:opened', function () {
	sheetOpened();
});

var updateAttachers = function () {
	var repeatingItem = 'repeating_attacher';
	var collectionArray = ['attacher_initiative', 'attr_attacher_death_saving_throw', 'attacher_hit_dice', 'attacher_attack', 'attacher_spell'];
	var finalSetAttrs = {};
	var itemsToPush = ['initiative', 'death_saving_throw', 'hit_dice', 'attack', 'spell'];

	for (var i = 0; i < ABILITIES.length; i++) {
		collectionArray.push('attacher_' + ABILITIES[i] + '_check');
		collectionArray.push('attacher_' + ABILITIES[i] + '_saving_throw');
		itemsToPush.push(ABILITIES[i] + '_check');
		itemsToPush.push(ABILITIES[i] + '_saving_throw');
	}

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'freetext');
			collectionArray.push(repeatingString + 'freeform');

			for (var x = 0; x < itemsToPush.length; x++) {
				collectionArray.push(repeatingString + itemsToPush[x] + '_attacher');
				finalSetAttrs['attacher_' + itemsToPush[x]] = ' ';
			}
		}
		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				for (var x = 0; x < itemsToPush.length; x++) {
					var attacher = v[repeatingString + itemsToPush[x] + '_attacher'];
					if (exists(attacher) && attacher === 'on') {

						var attacherName = v[repeatingString + 'name'] || '';

						var freeText = v[repeatingString + 'freetext'];
						if(exists(attacherName) && exists(freeText)) {
							finalSetAttrs['attacher_' + itemsToPush[x]] += '{{' + attacherName + '=' + freeText + '}}' + ' ';
						}
						var freeForm = v[repeatingString + 'freeform'];
						if(exists(freeForm)) {
							finalSetAttrs['attacher_' + itemsToPush[x]] += freeForm + ' ';
						}
					}
				}
			}

			console.log('updateAttachers', finalSetAttrs);
			setFinalAttrs(v, finalSetAttrs);
		});
	});
};

on('change:repeating_attacher remove:repeating_attacher', function () {
	updateAttachers();
});
