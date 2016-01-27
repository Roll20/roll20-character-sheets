var capitalizeFirstLetter = function (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

on('change:cp change:sp change:ep change:gp change:pp', function () {
	getAttrs(['cp', 'copper_per_gold', 'sp', 'silver_per_gold', 'ep', 'electrum_per_gold', 'gp', 'pp', 'platinum_per_gold'], function (v) {
		var copperPieces = parseFloat(v.cp) || 0;
		var silverPieces = parseFloat(v.sp) || 0;
		var electrumPieces = parseFloat(v.ep) || 0;
		var goldPieces = parseFloat(v.gp) || 0;
		var platinumPieces = parseFloat(v.pp) || 0;
		var copperPerGold = parseFloat(v.copper_per_gold) || 100;
		var silverPerGold = parseFloat(v.silver_per_gold) || 10;
		var electrumPerGold = parseFloat(v.electrum_per_gold) || 2;
		var platinumPerGold = parseFloat(v.platinum_per_gold) || 10;
		var totalGold = (copperPieces / copperPerGold) + (silverPieces / silverPerGold) + (electrumPieces / electrumPerGold) + goldPieces + (platinumPieces * platinumPerGold);
		var coinWeight = (copperPieces + silverPieces + electrumPieces + goldPieces + platinumPieces) / 50;
		setAttrs({
			total_gp: totalGold.toFixed(2),
			weight_coinage: coinWeight
		});
	});
});

var updateAbilityModifier = function (ability) {
	var collectionArray = [ability, ability + '_bonus'];
	var finalSetAttrs = {};

	if(ability === 'strength') {
		collectionArray.push('dexterity_mod');
	} else if(ability === 'dexterity') {
		collectionArray.push('strength_mod');
	}

	getAttrs(collectionArray, function (v) {
		var calculatedAbilityMod = Math.floor((parseInt(v[ability], 10) - 10) / 2) + parseInt(v[ability + '_bonus'], 10);
		finalSetAttrs[ability + '_mod'] = calculatedAbilityMod;

		if(ability === 'strength') {
			finalSetAttrs.finesse_mod = Math.max(calculatedAbilityMod, parseInt(v.dexterity_mod, 10) || 0);
			var str = parseInt(v.strength, 10) || 0;
			finalSetAttrs.carrying_capacity = str * 15;
			finalSetAttrs.max_push_drag_lift = str * 30;
			finalSetAttrs.encumbered = str * 5;
			finalSetAttrs.heavily_encumbered = str * 10;
		} else if(ability === 'dexterity') {
			finalSetAttrs.finesse_mod = Math.max(calculatedAbilityMod, parseInt(v.strength_mod, 10) || 0);
		}

		console.log('updateAbilityModifier', finalSetAttrs);
		setAttrs(finalSetAttrs);
	});
};
on('change:strength', function () {
	updateAbilityModifier('strength');
});
on('change:dexterity', function () {
	updateAbilityModifier('dexterity');
});
on('change:constitution', function () {
	updateAbilityModifier('constitution');
});
on('change:intelligence', function () {
	updateAbilityModifier('intelligence');
});
on('change:wisdom', function () {
	updateAbilityModifier('wisdom');
});
on('change:charisma', function () {
	updateAbilityModifier('charisma');
});

var updateLevels = function () {
	var collectionArray = ['barbarian_level', 'bard_level', 'cleric_level', 'druid_level', 'fighter_level', 'monk_level', 'paladin_level', 'ranger_level', 'rogue_level', 'sorcerer_level', 'warlock_level', 'wizard_level', 'custom_class_level_0', 'custom_class_hd_0', 'custom_class_name_0', 'custom_class_level_1', 'custom_class_hd_1', 'custom_class_name_1', 'custom_class_level_2', 'custom_class_hd_2', 'custom_class_name_2', 'custom_class_level_3', 'custom_class_hd_3', 'custom_class_name_3', 'custom_class_level_4', 'custom_class_hd_4', 'custom_class_name_4', 'custom_class_level_5', 'custom_class_hd_5', 'custom_class_name_5'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var levels = {
			barbarian: parseInt(v['barbarian_level'], 10) || 0,
			bard: parseInt(v['bard_level'], 10) || 0,
			cleric: parseInt(v['cleric_level'], 10) || 0,
			druid: parseInt(v['druid_level'], 10) || 0,
			fighter: parseInt(v['fighter_level'], 10) || 0,
			monk: parseInt(v['monk_level'], 10) || 0,
			paladin: parseInt(v['paladin_level'], 10) || 0,
			ranger: parseInt(v['ranger_level'], 10) || 0,
			rogue: parseInt(v['rogue_level'], 10) || 0,
			sorcerer: parseInt(v['sorcerer_level'], 10) || 0,
			warlock: parseInt(v['warlock_level'], 10) || 0,
			wizard: parseInt(v['wizard_level'], 10) || 0
		};

		var hd = {
			'd20': 0,
			'd12': levels.barbarian,
			'd10': levels.fighter + levels.paladin + levels.ranger,
			'd8': levels.bard + levels.cleric + levels.druid + levels.monk + levels.rogue + levels.warlock,
			'd6': levels.sorcerer + levels.wizard,
			'd4': 0
		};
		var totalLevel = 0;
		var levelString = '';

		for (var key in levels) {
			if (levels.hasOwnProperty(key)) {
				if (levels[key]) {
					totalLevel += levels[key];
					if (levelString !== '') {
						levelString += ' ';
					}
					levelString += capitalizeFirstLetter(key) + ' ' + levels[key];
				}
			}
		}

		for(var i = 0; i < 6; i++) {
			var customClass = {
				hd: parseInt(v['custom_class_hd_'+i], 10) || 8,
				level: parseInt(v['custom_class_level_'+i], 10) || 0,
				name: v['custom_class_name_'+i]
			};

			if (customClass.level) {
				totalLevel += customClass.level;
				hd['d'+customClass.hd] += customClass.level;
				if (levelString !== '') {
					levelString += ' ';
				}
				if (!customClass.name || customClass.name === '') {
					customClass.name = 'Custom ' + i;
				}
				levelString += customClass.name + ' ' + customClass.level;
			}
		}

		if (hd.d20) {
			finalSetAttrs.hd_d20_max = hd.d20;
			finalSetAttrs.hd_d20_toggle = 'on';
		} else {
			finalSetAttrs.hd_d20_max = 0;
			finalSetAttrs.hd_d20_toggle = '';
		}
		if (hd.d12) {
			finalSetAttrs.hd_d12_max = hd.d12;
			finalSetAttrs.hd_d12_toggle = 'on';
		} else {
			finalSetAttrs.hd_d12_max = 0;
			finalSetAttrs.hd_d12_toggle = '';
		}
		if (hd.d10) {
			finalSetAttrs.hd_d10_max = hd.d10;
			finalSetAttrs.hd_d10_toggle = 'on';
		} else {
			finalSetAttrs.hd_d10_max = 0;
			finalSetAttrs.hd_d10_toggle = '';
		}
		if (hd.d8) {
			finalSetAttrs.hd_d8_max = hd.d8;
			finalSetAttrs.hd_d8_toggle = 'on';
		} else {
			finalSetAttrs.hd_d8_max = 0;
			finalSetAttrs.hd_d8_toggle = '';
		}
		if (hd.d6) {
			finalSetAttrs.hd_d6_max = hd.d6;
			finalSetAttrs.hd_d6_toggle = 'on';
		} else {
			finalSetAttrs.hd_d6_max = 0;
			finalSetAttrs.hd_d6_toggle = '';
		}
		if (hd.d4) {
			finalSetAttrs.hd_d4_max = hd.d4;
			finalSetAttrs.hd_d4_toggle = 'on';
		} else {
			finalSetAttrs.hd_d4_max = 0;
			finalSetAttrs.hd_d4_toggle = '';
		}

		var pb = 2 + Math.floor(Math.abs((totalLevel - 1)/4));

		finalSetAttrs.level = totalLevel;
		finalSetAttrs.class_and_level = levelString;
		finalSetAttrs.pb = pb;
		finalSetAttrs.exp = pb * 2;
		finalSetAttrs.h_PB = pb / 2;

		console.log('updateLevels', finalSetAttrs);
		setAttrs(finalSetAttrs);
	});
};

on('change:barbarian_level change:bard_level change:cleric_level change:druid_level change:fighter_level change:monk_level change:paladin_level change:ranger_level change:rogue_level change:sorcerer_level change:warlock_level change:wizard_level change:custom_class_level_0 change:custom_class_hd_0 change:custom_class_name_0 change:custom_class_level_1 change:custom_class_hd_1 change:custom_class_name_1 change:custom_class_level_2 change:custom_class_hd_2 change:custom_class_name_2 change:custom_class_level_3 change:custom_class_hd_3 change:custom_class_name_3 change:custom_class_level_4 change:custom_class_hd_4 change:custom_class_name_4 change:custom_class_level_5 change:custom_class_hd_5 change:custom_class_name_5', function () {
	updateLevels();
});

var sumRepeating = function (options) {
	var repeatingItem = 'repeating_' + options.collection;
	var collectionArray = [];
	var finalSetAttrs = {};
	finalSetAttrs[options.totalField] = 0;

	getSectionIDs(repeatingItem, function (ids) {

		for (var i = 0; i < ids.length; i++) {
			collectionArray.push(repeatingItem+'_' + ids[i] + '_' + options.toggle);
			if(options.qty) {
				collectionArray.push(repeatingItem + '_' + ids[i] + '_' + options.qty);
			}
			collectionArray.push(repeatingItem+'_' + ids[i] + '_' + options.fieldToAdd);
			if(options.bonus) {
				collectionArray.push(repeatingItem + '_' + ids[i] + '_' + options.bonus);
			}
			if(options.armor_type) {
				collectionArray.push(repeatingItem + '_' + ids[i] + '_' + options.armor_type);
			}
		}
		if(options.getExtraFields) {
			collectionArray = collectionArray.concat(options.getExtraFields);
		}

		getAttrs(collectionArray, function (v) {
			if (options.armor_type) {
				var dexMod = parseInt(v.dexterity_mod, 10);
			}

			for (var j = 0; j < ids.length; j++) {
				var qty = 1;
				if(options.qty) {
					qty = parseInt(v[repeatingItem+'_' + ids[j] + '_' + options.qty], 10) || 1;
				}
				var fieldToAdd = parseFloat(v[repeatingItem+'_' + ids[j] + '_' + options.fieldToAdd]) || 0;
				if(options.bonus) {
					fieldToAdd += parseFloat(v[repeatingItem+'_' + ids[j] + '_' + options.bonus]) || 0;
				}
				if(options.armor_type) {
					var armorType = v[repeatingItem+'_' + ids[j] + '_' + options.armor_type];
					var attributeBonus = 0;
					if(armorType === 'light') {
						attributeBonus = dexMod;
					} else if (armorType === 'medium') {
						var mediumArmorDexMod = parseInt(v.medium_armor_max_dex, 10) || 2;
						attributeBonus = Math.min(mediumArmorDexMod, dexMod);
					}
					fieldToAdd += attributeBonus;
				}
				var itemTotal = Math.round(qty * fieldToAdd * 100) / 100;

				if(options.itemTotal) {
					finalSetAttrs[repeatingItem+'_' + ids[j] + '_' + options.itemTotal] = itemTotal;
				}

				var toggle = v[repeatingItem+'_' + ids[j] + '_' + options.toggle];
				if (toggle !== 0 && toggle !== '0') {
					finalSetAttrs[options.totalField] += itemTotal;
				}
			}

			if(options.armor_type) {
				var unarmoredACAbility = parseFloat(v.ac_unarmored_ability_bonus) || 0;
				var unarmoredACBonus = parseFloat(v.ac_unarmored_bonus) || 0;

				finalSetAttrs.ac_unarmored_calc = 10 + dexMod + unarmoredACAbility + unarmoredACBonus;

				var acBonus = parseFloat(v.global_ac_bonus) || 0;

				finalSetAttrs.ac = Math.max(finalSetAttrs[options.totalField], finalSetAttrs.ac_unarmored_calc) + acBonus;
			}

			console.log('sumRepeating', finalSetAttrs);
			setAttrs(finalSetAttrs);
		});
	});
};

on('change:repeating_armor change:medium_armor_max_dex', function () {
	sumRepeating({
		collection: 'armor',
		toggle: 'worn',
		fieldToAdd: 'weight',
		totalField: 'weight_armor'
	});
	sumRepeating({
		collection: 'armor',
		getExtraFields: ['dexterity_mod', 'medium_armor_max_dex', 'ac_unarmored_ability_bonus', 'ac_unarmored_bonus', 'global_ac_bonus'],
		toggle: 'worn',
		fieldToAdd: 'ac_base',
		bonus: 'ac_bonus',
		armor_type: 'type',
		itemTotal: 'ac_total',
		totalField: 'ac_armored_calc'
	});
});

on('change:repeating_equipment', function () {
	sumRepeating({
		collection: 'equipment',
		toggle: 'carried',
		qty: 'qty',
		fieldToAdd: 'weight',
		itemTotal: 'weight_total',
		totalField: 'weight_equipment'
	});
});

on('change:repeating_attack', function () {
	updateAttack();

	sumRepeating({
		collection: 'attack',
		toggle: 'carried',
		fieldToAdd: 'weight',
		totalField: 'weight_weapons'
	});
});

var getAttributeValue = function (v, varName, defaultAttribute) {
	if (!varName) {
		if(defaultAttribute) {
			return parseInt(v[defaultAttribute], 10);
		}
	} else if (varName !== 0 && varName !== '0') {
		varName = varName.replace(/\W/g, '');
		return parseInt(v[varName], 10);
	}
	return 0;
};

var getNumericValue = function (value) {
	return parseInt(value, 10) || 0;
};

var concatenateIfExists = function (value, concatenator) {
	if (value === 0 || value === '0' || value === '' || !value) {
		return '';
	}
	if (concatenator) {
		value += concatenator;
	}
	return value;
};

var updateAttack = function () {
	var repeatingItem = 'repeating_attack';
	var collectionArray = ['pb', 'finesse_mod', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod'];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'proficient');
			collectionArray.push(repeatingString + 'attack_attribute');
			collectionArray.push(repeatingString + 'attack_bonus');
			collectionArray.push(repeatingString + 'saving_throw_attribute');
			collectionArray.push(repeatingString + 'saving_throw_bonus');
			collectionArray.push(repeatingString + 'damage');
			collectionArray.push(repeatingString + 'damage_attribute');
			collectionArray.push(repeatingString + 'damage_bonus');
			collectionArray.push(repeatingString + 'damage_type');
			collectionArray.push(repeatingString + 'second_damage');
			collectionArray.push(repeatingString + 'second_damage_attribute');
			collectionArray.push(repeatingString + 'second_damage_bonus');
			collectionArray.push(repeatingString + 'second_damage_type');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem+'_' + ids[j] + '_';

				var toHit = 0;
				var proficient = v[repeatingString + 'proficient'];
				if(!proficient || proficient === 'on') {
					toHit += v.pb;
				}
				var attackAttribute = v[repeatingString + 'attack_attribute'];
				toHit += getAttributeValue(v, attackAttribute, 'strength_mod');
				toHit += getNumericValue(v[repeatingString + 'attack_bonus']);
				finalSetAttrs[repeatingString + 'to_hit'] = toHit;

				var savingThrowDC = 8 + v.pb;
				var savingThrowAttribute = v[repeatingString + 'saving_throw_attribute'];
				savingThrowDC += getAttributeValue(v, savingThrowAttribute, 'strength_mod');
				savingThrowDC += getNumericValue(v[repeatingString + 'saving_throw_bonus']);
				finalSetAttrs[repeatingString + 'saving_throw_total'] = savingThrowDC;

				var damageString = '';
				var damageBonus = 0;
				if (v[repeatingString + 'damage']) {
					damageString += concatenateIfExists(v[repeatingString + 'damage']);

					if (v[repeatingString + 'damage_attribute']) {
						damageBonus += getAttributeValue(v, v[repeatingString + 'damage_attribute'], 'strength_mod');
					}
					damageBonus += getNumericValue(v[repeatingString + 'damage_bonus']);

					damageString += concatenateIfExists(damageBonus, ' + ');
					damageString += concatenateIfExists(v[repeatingString + 'damage_type'], ' ');
				}

				var secondDamageBonus = 0;
				if (v[repeatingString + 'second_damage']) {
					damageString += concatenateIfExists(v[repeatingString + 'second_damage'], ' + ');

					if (v[repeatingString + 'second_damage_attribute']) {
						secondDamageBonus += getAttributeValue(v, v[repeatingString + 'second_damage_attribute']);
					}
					secondDamageBonus += getNumericValue(v[repeatingString + 'second_damage_bonus']);

					damageString += concatenateIfExists(secondDamageBonus, ' + ');
					damageString += concatenateIfExists(v[repeatingString + 'second_damage_type'], ' ');
				}
				finalSetAttrs[repeatingString + 'damage_string'] = damageString;
			}

			console.log('updateAttack', finalSetAttrs);
			setAttrs(finalSetAttrs);
		});
	});
};