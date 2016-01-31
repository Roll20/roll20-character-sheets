var capitalizeFirstLetter = function (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

var firstThreeChars = function (string) {
	return string.substring(0, 3);
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

var getAbilityValue = function (v, varName, defaultAbility) {
  if (!varName) {
    if(defaultAbility) {
      return getIntValue(v[defaultAbility]);
    }
  } else if (varName !== 0 && varName !== '0') {
    varName = varName.replace(/\W/g, '');
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
		updateAttack();
	});
};

on('change:barbarian_level change:bard_level change:cleric_level change:druid_level change:fighter_level change:monk_level change:paladin_level change:ranger_level change:rogue_level change:sorcerer_level change:warlock_level change:wizard_level change:custom_class_level_0 change:custom_class_hd_0 change:custom_class_name_0 change:custom_class_level_1 change:custom_class_hd_1 change:custom_class_name_1 change:custom_class_level_2 change:custom_class_hd_2 change:custom_class_name_2 change:custom_class_level_3 change:custom_class_hd_3 change:custom_class_name_3 change:custom_class_level_4 change:custom_class_hd_4 change:custom_class_name_4 change:custom_class_level_5 change:custom_class_hd_5 change:custom_class_name_5', function () {
	updateLevels();
});


var sumRepeating = function (options, sumItems) {
	var repeatingItem = 'repeating_' + options.collection;
	var collectionArray = [];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + options.toggle);
			if(options.qty) {
				collectionArray.push(repeatingString + options.qty);
			}

			for (var x = 0; x < sumItems.length; x++) {
				finalSetAttrs[sumItems[x].totalField] = 0;
				finalSetAttrs[sumItems[x].totalFieldSecondary] = 0;
				collectionArray.push(repeatingString + sumItems[x].fieldToAdd);
				if(sumItems[x].bonus) {
					collectionArray.push(repeatingString + sumItems[x].bonus);
				}
				if(sumItems[x].armorType) {
					collectionArray.push(repeatingString + sumItems[x].armorType);
				}
			}
		}
		if(options.getExtraFields) {
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
					var fieldToAdd = getFloatValue(v[repeatingString + sumItems[x].fieldToAdd]);
					if(sumItems[x].bonus) {
						fieldToAdd += getFloatValue(v[repeatingString + sumItems[x].bonus]);
					}
					if(sumItems[x].armorType) {
						if(v[repeatingString + sumItems[x].armorType] === 'light') {
							fieldToAdd += dexMod;
						} else if (v[repeatingString + sumItems[x].armorType] === 'medium') {
							var mediumArmorDexMod = getIntValue(v.medium_armor_max_dex, 2);
							fieldToAdd += Math.min(mediumArmorDexMod, dexMod);
						}
					}

					var itemTotal = Math.round(qty * fieldToAdd * 100) / 100;

					if(sumItems[x].itemTotal) {
						finalSetAttrs[repeatingString + sumItems[x].itemTotal] = itemTotal;
					}

					var toggle = v[repeatingString + options.toggle];
					if (toggle !== 0 && toggle !== '0') {
						var addToPrimary = true;
						var addToSecondary = false;

						if(sumItems[x].armorType) {
							if (v[repeatingString + sumItems[x].armorType] === 'shield') {
								addToSecondary = true;
							} else if (v[repeatingString + sumItems[x].armorType] === 'unarmored') {
								addToPrimary = false;
								addToSecondary = true;
							}
						}

						if (addToPrimary) {
							finalSetAttrs[sumItems[x].totalField] += itemTotal;
						}
						if (addToSecondary) {
							finalSetAttrs[sumItems[x].totalFieldSecondary] += itemTotal;
						}
					}
				}
			}

			if (options.collection === 'armor') {
				finalSetAttrs.ac_unarmored_calc += 10 + getIntValue(v.dexterity_mod) + getAbilityValue(v, v.ac_unarmored_ability);

				finalSetAttrs.ac = Math.max(finalSetAttrs.ac_armored_calc, finalSetAttrs.ac_unarmored_calc);
			}

			console.log('sumRepeating', finalSetAttrs);
			setAttrs(finalSetAttrs);
		});
	});
};

var updateArmor = function () {
	var options = {
		collection: 'armor',
		getExtraFields: ['dexterity_mod', 'medium_armor_max_dex', 'ac_unarmored_ability', 'ac_unarmored_bonus', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod'],
		toggle: 'worn'
	};
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

on('change:repeating_armor change:medium_armor_max_dex change:ac_unarmored_ability', function () {
	updateArmor();
});

on('change:repeating_equipment', function () {
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
  updateAttack();
});

on('change:repeating_attack', function () {
	updateAttack();


	var options = {
		collection: 'attack',
		toggle: 'carried'
	};
	var sumItems = [
		{
			fieldToAdd: 'weight',
			totalField: 'weight_weapons'
		}
	];
	sumRepeating(options, sumItems);
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
			collectionArray.push(repeatingString + 'type');
			collectionArray.push(repeatingString + 'proficiency');
			collectionArray.push(repeatingString + 'attack_ability');
			collectionArray.push(repeatingString + 'attack_bonus');
			collectionArray.push(repeatingString + 'saving_throw_ability');
			collectionArray.push(repeatingString + 'saving_throw_bonus');
			collectionArray.push(repeatingString + 'damage');
			collectionArray.push(repeatingString + 'damage_ability');
			collectionArray.push(repeatingString + 'damage_bonus');
			collectionArray.push(repeatingString + 'damage_type');
			collectionArray.push(repeatingString + 'second_damage');
			collectionArray.push(repeatingString + 'second_damage_ability');
			collectionArray.push(repeatingString + 'second_damage_bonus');
			collectionArray.push(repeatingString + 'second_damage_type');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem+'_' + ids[j] + '_';

				if(!v[repeatingString + 'type'] || v[repeatingString + 'type'] === 'melee') {
					finalSetAttrs[repeatingString + 'local_attack_bonus'] = '@{global_melee_attack_bonus}';
					finalSetAttrs[repeatingString + 'local_damage_bonus'] = '@{global_melee_damage_bonus}';
				} else if(v[repeatingString + 'type'] === 'ranged') {
					finalSetAttrs[repeatingString + 'local_attack_bonus'] = '@{global_ranged_attack_bonus}';
					finalSetAttrs[repeatingString + 'local_damage_bonus'] = '@{global_ranged_damage_bonus}';
				} else {
					finalSetAttrs[repeatingString + 'local_attack_bonus'] = 0;
					finalSetAttrs[repeatingString + 'local_damage_bonus'] = 0;
				}

				var toHit = 0;
				var proficiency = v[repeatingString + 'proficiency'];
				if(!proficiency || proficiency === 'on') {
					var pb = getIntValue(v.pb);
					toHit += pb;
					finalSetAttrs[repeatingString + 'proficiency_toggled'] = pb;
				}
				var attackAbility = v[repeatingString + 'attack_ability'];
				toHit += getAbilityValue(v, attackAbility, 'strength_mod');
				toHit += getIntValue(v[repeatingString + 'attack_bonus']);
				finalSetAttrs[repeatingString + 'to_hit'] = toHit;

				var savingThrowDC = 8 + getIntValue(v.pb);
				var savingThrowAbility = v[repeatingString + 'saving_throw_ability'];
				savingThrowDC += getAbilityValue(v, savingThrowAbility, 'strength_mod');
				savingThrowDC += getIntValue(v[repeatingString + 'saving_throw_bonus']);
				finalSetAttrs[repeatingString + 'saving_throw_dc'] = savingThrowDC;

				var damageString = '';
				var damageBonus = 0;
				if (v[repeatingString + 'damage'] || v[repeatingString + 'damage_ability'] || v[repeatingString + 'damage_bonus'] || v[repeatingString + 'damage_type']) {
					damageString += concatenateIfExists(v[repeatingString + 'damage']);

					damageBonus += getAbilityValue(v, v[repeatingString + 'damage_ability'], 'strength_mod');
					damageBonus += getIntValue(v[repeatingString + 'damage_bonus'], ' + ');

					damageString += concatenateIfExists(damageBonus, ' + ');
					damageString += concatenateIfExists(v[repeatingString + 'damage_type'], ' ');
				}

				var secondDamageBonus = 0;
				if (v[repeatingString + 'second_damage'] || v[repeatingString + 'second_damage_ability'] || v[repeatingString + 'second_damage_bonus'] || v[repeatingString + 'second_damage_type']) {
					damageString += concatenateIfExists(v[repeatingString + 'second_damage'], ' + ');

					secondDamageBonus += getAbilityValue(v, v[repeatingString + 'second_damage_ability']);
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

var updateD20Mod = function () {
	var collectionArray = ['halfling_luck'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (!v.halfling_luck || v.halfling_luck === 'on') {
			finalSetAttrs.d20_mod = 'ro<1';
		} else {
			finalSetAttrs.d20_mod = '';
		}

		console.log('updateD20Mod', finalSetAttrs);
		setAttrs(finalSetAttrs);
	});
};

on('change:halfling_luck', function () {
	updateD20Mod();
});

var updateSkill = function () {
	var repeatingItem = 'repeating_skill';
	var collectionArray = ['pb', 'exp', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod'];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'proficiency');
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'ability');
			collectionArray.push(repeatingString + 'bonus');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem+'_' + ids[j] + '_';

				var ability = v[repeatingString + 'ability'].replace(/\W/g, '');
				if (!ability) {
					ability = 'strength';
				}
				finalSetAttrs[repeatingString + 'ability_short_name'] = capitalizeFirstLetter(firstThreeChars(ability));

				var total = 0;
				var proficiency = v[repeatingString + 'proficiency'];
				if (proficiency === 'proficient') {
					var pb = getIntValue(v.pb);
					total += pb;
					finalSetAttrs[repeatingString + 'proficiency_toggled'] = pb;
				} else if (proficiency === 'expertise') {
					var exp = getIntValue(v.exp);
					total += exp;
					finalSetAttrs[repeatingString + 'proficiency_toggled'] = exp;
				}
				var skillAbility = v[repeatingString + 'ability'];
				total += getAbilityValue(v, skillAbility, 'strength_mod');
				total += getIntValue(v[repeatingString + 'bonus']);
				finalSetAttrs[repeatingString + 'total'] = total;
			}

			console.log('updateSkill', finalSetAttrs);
			setAttrs(finalSetAttrs);
		});
	});
};

on('change:repeating_skill', function () {
	updateSkill();
});
