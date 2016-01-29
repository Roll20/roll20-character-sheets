var capitalizeFirstLetter = function (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

var getIntValue = function (value, defaultValue) {
  if (!defaultValue) {
    defaultValue = 0;
  }
  return parseInt(value, 10) || defaultValue;
};
var getFloatValue = function (value, defaultValue) {
  if (!defaultValue) {
    defaultValue = 0;
  }
  return parseFloat(value) || defaultValue;
};

var getAttributeValue = function (v, varName, defaultAttribute) {
  if (!varName) {
    if(defaultAttribute) {
      return getIntValue(v[defaultAttribute]);
    }
  } else if (varName !== 0 && varName !== '0') {
    console.log('varName', varName);
    varName = varName.replace(/\W/g, '');
    console.log('varName2', varName);
    return getIntValue(v[varName]);
  }
  return 0;
};

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

var updateAbilityModifier = function (ability) {
	var collectionArray = [ability, ability + '_bonus'];
	var finalSetAttrs = {};

	if(ability === 'strength') {
		collectionArray.push('dexterity_mod');
	} else if(ability === 'dexterity') {
		collectionArray.push('strength_mod');
	}

	getAttrs(collectionArray, function (v) {
		var calculatedAbilityMod = Math.floor((getIntValue(v[ability]) - 10) / 2) + getIntValue(v[ability + '_bonus']);
		finalSetAttrs[ability + '_mod'] = calculatedAbilityMod;

		if(ability === 'strength') {
			finalSetAttrs.finesse_mod = Math.max(calculatedAbilityMod, getIntValue(v.dexterity_mod));
			var str = getIntValue(v.strength);
			finalSetAttrs.carrying_capacity = str * 15;
			finalSetAttrs.max_push_drag_lift = str * 30;
			finalSetAttrs.encumbered = str * 5;
			finalSetAttrs.heavily_encumbered = str * 10;
		} else if(ability === 'dexterity') {
			finalSetAttrs.finesse_mod = Math.max(calculatedAbilityMod, getIntValue(v.strength_mod));
		}

		console.log('updateAbilityModifier', finalSetAttrs);
		setAttrs(finalSetAttrs);
	});
	if(ability === 'dexterity') {
		updateArmor();
	}
	updateAC();
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
			barbarian: getIntValue(v.barbarian_level),
			bard: getIntValue(v.bard_level),
			cleric: getIntValue(v.cleric_level),
			druid: getIntValue(v.druid_level),
			fighter: getIntValue(v.fighter_level),
			monk: getIntValue(v.monk_level),
			paladin: getIntValue(v.paladin_level),
			ranger: getIntValue(v.ranger_level),
			rogue: getIntValue(v.rogue_level),
			sorcerer: getIntValue(v.sorcerer_level),
			warlock: getIntValue(v.warlock_level),
			wizard: getIntValue(v.wizard_level)
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
				hd: getIntValue(v['custom_class_hd_'+i], 8),
				level: getIntValue(v['custom_class_level_'+i]),
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
			finalSetAttrs.hd_d20_toggle = 1;
		} else {
			finalSetAttrs.hd_d20_max = 0;
			finalSetAttrs.hd_d20_toggle = 0;
		}
		if (hd.d12) {
			finalSetAttrs.hd_d12_max = hd.d12;
			finalSetAttrs.hd_d12_toggle = 1;
		} else {
			finalSetAttrs.hd_d12_max = 0;
			finalSetAttrs.hd_d12_toggle = 0;
		}
		if (hd.d10) {
			finalSetAttrs.hd_d10_max = hd.d10;
			finalSetAttrs.hd_d10_toggle = 1;
		} else {
			finalSetAttrs.hd_d10_max = 0;
			finalSetAttrs.hd_d10_toggle = 0;
		}
		if (hd.d8) {
			finalSetAttrs.hd_d8_max = hd.d8;
			finalSetAttrs.hd_d8_toggle = 1;
		} else {
			finalSetAttrs.hd_d8_max = 0;
			finalSetAttrs.hd_d8_toggle = 0;
		}
		if (hd.d6) {
			finalSetAttrs.hd_d6_max = hd.d6;
			finalSetAttrs.hd_d6_toggle = 1;
		} else {
			finalSetAttrs.hd_d6_max = 0;
			finalSetAttrs.hd_d6_toggle = 0;
		}
		if (hd.d4) {
			finalSetAttrs.hd_d4_max = hd.d4;
			finalSetAttrs.hd_d4_toggle = 1;
		} else {
			finalSetAttrs.hd_d4_max = 0;
			finalSetAttrs.hd_d4_toggle = 0;
		}

		var pb = 2 + Math.floor(Math.abs((totalLevel - 1)/4));

		finalSetAttrs.level = totalLevel;
		finalSetAttrs.class_and_level = levelString;
		finalSetAttrs.pb = pb;
		finalSetAttrs.exp = pb * 2;
		finalSetAttrs.h_PB = pb / 2;

		if(levels.sorcerer > 0) {
			finalSetAttrs.spell_display_sorcery_points = 1;
		} else {
			finalSetAttrs.spell_display_sorcery_points = 0;
		}
		if(levels.warlock > 0) {
			finalSetAttrs.spell_display_warlock_slots = 1;
		} else {
			finalSetAttrs.spell_display_warlock_slots = 0;
		}

		console.log('updateLevels', finalSetAttrs);
		setAttrs(finalSetAttrs);
	});
};

on('change:barbarian_level change:bard_level change:cleric_level change:druid_level change:fighter_level change:monk_level change:paladin_level change:ranger_level change:rogue_level change:sorcerer_level change:warlock_level change:wizard_level change:custom_class_level_0 change:custom_class_hd_0 change:custom_class_name_0 change:custom_class_level_1 change:custom_class_hd_1 change:custom_class_name_1 change:custom_class_level_2 change:custom_class_hd_2 change:custom_class_name_2 change:custom_class_level_3 change:custom_class_hd_3 change:custom_class_name_3 change:custom_class_level_4 change:custom_class_hd_4 change:custom_class_name_4 change:custom_class_level_5 change:custom_class_hd_5 change:custom_class_name_5', function () {
	updateLevels();
});

var updateAC = function () {
	var collectionArray = ['ac_armored_calc', 'ac_unarmored_ability', 'ac_unarmored_bonus', 'global_ac_bonus', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.ac_unarmored_calc = 10 + getIntValue(v.dexterity_mod) + getAttributeValue(v, v.ac_unarmored_ability) + getFloatValue(v.ac_unarmored_bonus);

		finalSetAttrs.ac = Math.max(getFloatValue(v.ac_armored_calc), finalSetAttrs.ac_unarmored_calc) + getFloatValue(v.global_ac_bonus);

		console.log('updateAC', finalSetAttrs);
		setAttrs(finalSetAttrs);
	});
};

on('change:ac_armored_calc change:ac_unarmored_ability change:ac_unarmored_bonus change:global_ac_bonus', function () {
	updateAC();
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
      var dexMod = 0;
			if (options.armor_type) {
				dexMod = getIntValue(v.dexterity_mod);
			}

			for (var j = 0; j < ids.length; j++) {
				var qty = 1;
				if(options.qty) {
					qty = getIntValue(v[repeatingItem+'_' + ids[j] + '_' + options.qty], 1);
				}
				var fieldToAdd = getFloatValue(v[repeatingItem+'_' + ids[j] + '_' + options.fieldToAdd]);
				if(options.bonus) {
					fieldToAdd += getFloatValue(v[repeatingItem+'_' + ids[j] + '_' + options.bonus]);
				}
				if(options.armor_type) {
					var armorType = v[repeatingItem+'_' + ids[j] + '_' + options.armor_type];
					var attributeBonus = 0;
					if(armorType === 'light') {
						attributeBonus = dexMod;
					} else if (armorType === 'medium') {
						var mediumArmorDexMod = getIntValue(v.medium_armor_max_dex, 2);
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

			console.log('sumRepeating', finalSetAttrs);
			setAttrs(finalSetAttrs);
		});
	});
};

var updateArmor = function () {
	sumRepeating({
		collection: 'armor',
		toggle: 'worn',
		fieldToAdd: 'weight',
		totalField: 'weight_armor'
	});
	sumRepeating({
		collection: 'armor',
		getExtraFields: ['dexterity_mod', 'medium_armor_max_dex'],
		toggle: 'worn',
		fieldToAdd: 'ac_base',
		bonus: 'ac_bonus',
		armor_type: 'type',
		itemTotal: 'ac_total',
		totalField: 'ac_armored_calc'
	});
};

on('change:repeating_armor change:medium_armor_max_dex', function () {
	updateArmor();
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

on('change:pb', function () {
  updateAttack();
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

var concatenateIfExists = function (value, joiner) {
	if (value === 0 || value === '0' || value === '' || !value) {
		return '';
	}
	if (joiner) {
		value = joiner + value;
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
					toHit += getIntValue(v.pb);
				}
				var attackAttribute = v[repeatingString + 'attack_attribute'];
				toHit += getAttributeValue(v, attackAttribute, 'strength_mod');
				toHit += getIntValue(v[repeatingString + 'attack_bonus']);
				finalSetAttrs[repeatingString + 'to_hit'] = toHit;

				var savingThrowDC = 8 + getIntValue(v.pb);
				var savingThrowAttribute = v[repeatingString + 'saving_throw_attribute'];
				savingThrowDC += getAttributeValue(v, savingThrowAttribute, 'strength_mod');
				savingThrowDC += getIntValue(v[repeatingString + 'saving_throw_bonus']);
				finalSetAttrs[repeatingString + 'saving_throw_dc'] = savingThrowDC;

				var damageString = '';
				var damageBonus = 0;
				if (v[repeatingString + 'damage'] || v[repeatingString + 'damage_attribute'] || v[repeatingString + 'damage_bonus'] || v[repeatingString + 'damage_type']) {
					damageString += concatenateIfExists(v[repeatingString + 'damage']);

					damageBonus += getAttributeValue(v, v[repeatingString + 'damage_attribute'], 'strength_mod');
					damageBonus += getIntValue(v[repeatingString + 'damage_bonus'], ' + ');

					damageString += concatenateIfExists(damageBonus, ' + ');
					damageString += concatenateIfExists(v[repeatingString + 'damage_type'], ' ');
				}

				var secondDamageBonus = 0;
				if (v[repeatingString + 'second_damage'] || v[repeatingString + 'second_damage_attribute'] || v[repeatingString + 'second_damage_bonus'] || v[repeatingString + 'second_damage_type']) {
					damageString += concatenateIfExists(v[repeatingString + 'second_damage'], ' + ');

					secondDamageBonus += getAttributeValue(v, v[repeatingString + 'second_damage_attribute']);
					secondDamageBonus += getIntValue(v[repeatingString + 'second_damage_bonus']);

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