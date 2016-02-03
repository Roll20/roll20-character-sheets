var currentVersion = '2.0.1';

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
  } else if (exists(varName)) {
    varName = varName.replace(/\W/g, '');
    return getIntValue(v[varName]);
  }
  return 0;
};
var getAbilityShortName = function (varName, capital) {
	if (!varName) {
		return 'Str';
	}
	varName = varName.replace(/\W/g, '');
	if (capital) {
		varName = capitalizeFirstLetter(varName);
	}
	return firstThreeChars(varName);
};
var exists = function (value) {
	if (!value || value === '' || value === '0' || value === 0) {
		return false;
	}
	return true;
};


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
	var collectionArray = [ability, ability + '_bonus'];
	var finalSetAttrs = {};

	if(ability === 'strength') {
		collectionArray.push('dexterity_mod');
	} else if(ability === 'dexterity') {
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

		if(ability === 'strength') {
			finalSetAttrs.finesse_mod = Math.max(abilityMod, getIntValue(v.dexterity_mod));
			var str = getIntValue(v.strength);
			finalSetAttrs.carrying_capacity = str * 15;
			finalSetAttrs.max_push_drag_lift = str * 30;
			finalSetAttrs.encumbered = str * 5;
			finalSetAttrs.heavily_encumbered = str * 10;
		} else if(ability === 'dexterity') {
			finalSetAttrs.finesse_mod = Math.max(abilityMod, getIntValue(v.strength_mod));
		}

		console.log('updateAbilityModifier', finalSetAttrs);
		setAttrs(finalSetAttrs);
	});
	if(ability === 'dexterity') {
		updateArmor();
	}
	updateAttack();
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
						levelString += SPACE;
					}
					levelString += capitalizeFirstLetter(key) + SPACE + levels[key];
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
					levelString += SPACE;
				}
				if (!customClass.name || customClass.name === '') {
					customClass.name = 'Custom ' + i;
				}
				levelString += customClass.name + SPACE + customClass.level;
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
				if (sumItems[x].totalFieldSecondary) {
					finalSetAttrs[sumItems[x].totalFieldSecondary] = 0;
				}
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
						if(v[repeatingString + sumItems[x].armorType] === 'Light Armor') {
							fieldToAdd += dexMod;
						} else if (v[repeatingString + sumItems[x].armorType] === 'Medium Armor') {
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
							if (v[repeatingString + sumItems[x].armorType] === 'Shield') {
								addToSecondary = true;
							} else if (v[repeatingString + sumItems[x].armorType] === 'Unarmored') {
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
			for (var x = 0; x < sumItems.length; x++) {
				if (sumItems[x].totalField && !exists(finalSetAttrs[sumItems[x].totalField])) {
					finalSetAttrs[sumItems[x].totalField] = 0;
				}
				if (sumItems[x].totalFieldSecondary && !exists(finalSetAttrs[sumItems[x].totalFieldSecondary])) {
					finalSetAttrs[sumItems[x].totalFieldSecondary] = 0;
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

on('change:repeating_armor change:medium_armor_max_dex change:ac_unarmored_ability remove:repeating_armor', function () {
	updateArmor();
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
  updateAttack();
	updateSpell();
	updateJackOfAllTrades();
});

var updateJackOfAllTrades = function () {
	var collectionArray = ['pb'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);

		setAttrs(finalSetAttrs);
	});
};
on('change:jack_of_all_trades_toggle', function () {
	updateJackOfAllTrades();
});

var updateInitiative = function () {
	var collectionArray = ['dexterity_mod', 'initiative_bonus', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'global_check_bonus'];
	var finalSetAttrs = {};

	finalSetAttrs.initiative = 0;
	finalSetAttrs.initiative_formula = '';
	getAttrs(collectionArray, function (v) {

		var dexMod = getIntValue(v.dexterity_mod);
		if (exists(dexMod)) {
			finalSetAttrs.initiative += dexMod;
			finalSetAttrs.initiative_formula += dexMod + '[dex]';
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
		setAttrs(finalSetAttrs);
	});
};
on('change:dexterity_mod change:initiative_bonus change:jack_of_all_trades_toggle change:jack_of_all_trades change:global_check_bonus', function () {
	updateInitiative();
});

on('change:repeating_attack remove:repeating_attack', function () {
	updateAttack();

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
  if (!exists(v[repeatingString + 'parsed'])) {
    if (exists(v[repeatingString + 'type'])) {
      finalSetAttrs[repeatingString + 'attack_ability'] = v.default_ability;
      finalSetAttrs[repeatingString + 'roll_toggle'] = '@{roll_toggle_var}';
    }
  }

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

		if (!v[repeatingString + 'type'] || v[repeatingString + 'type'] === 'melee') {
			if (exists(options.globalMeleeAttackBonus)) {
				toHit += options.globalMeleeAttackBonus;
				attackFormula += ADD + options.globalMeleeAttackBonus + '[global melee attack bonus]';
			}
		} else if (v[repeatingString + 'type'] === 'ranged') {
			if (exists(options.globalRangedAttackBonus)) {
				toHit += options.globalRangedAttackBonus;
				attackFormula += ADD + options.globalRangedAttackBonus + '[global ranged attack bonus]';
			}
		}
	}
	if (!exists(toHit)) {
		toHit = 0;
	}
	finalSetAttrs[repeatingString + 'to_hit'] = toHit;
	finalSetAttrs[repeatingString + 'attack_formula'] = attackFormula;
};

var updateSavingThrowToggle = function (v, finalSetAttrs, repeatingString, options) {
  if (!exists(v[repeatingString + 'parsed'])) {
    if (exists(v[repeatingString + 'saving_throw_vs_ability'])) {
      finalSetAttrs[repeatingString + 'saving_throw_ability'] = v.default_ability;
      finalSetAttrs[repeatingString + 'saving_throw_toggle'] = '@{saving_throw_toggle_var}';
    }
  }

	var savingThrowToggle = v[repeatingString + 'saving_throw_toggle'];
	if (savingThrowToggle === '@{saving_throw_toggle_var}') {
		var savingThrowDC = 8 + getIntValue(v.pb);
		var savingThrowAbility = v[repeatingString + 'saving_throw_ability'];
    if (finalSetAttrs[repeatingString + 'saving_throw_ability']) {
      savingThrowAbility = finalSetAttrs[repeatingString + 'saving_throw_ability'];
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
  if (!exists(v[repeatingString + 'parsed'])) {
    if (exists(v[repeatingString + 'damage'])) {
      finalSetAttrs[repeatingString + 'damage_toggle'] = '@{damage_toggle_var}';
    }
    if (exists(v[repeatingString + 'second_damage'])) {
      finalSetAttrs[repeatingString + 'second_damage_toggle'] = '@{second_damage_toggle_var}';
    }
  }

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

		var damageAbility = getAbilityValue(v, v[repeatingString + 'damage_ability'], options.defaultDamageAbility);
		if (exists(damageAbility)) {
			damageAddition += damageAbility;
			if (damageFormula !== '') {
				damageFormula += ADD;
			}
			damageFormula += damageAbility + '[' + getAbilityShortName(v[repeatingString + 'damage_ability']) + ']';
		}

		var damageBonus = getIntValue(v[repeatingString + 'damage_bonus']);
		if (exists(damageBonus)) {
			damageAddition += damageBonus;
			if (damageFormula !== '') {
				damageFormula += ADD;
			}
			damageFormula += damageBonus + '[bonus]';
		}

		damageAddition += options.globalDamageBonus;
		damageFormula += ADD + options.globalDamageBonus + '[global damage bonus]';

		if(options && options.globalMeleeDamageBonus && !v[repeatingString + 'type'] || v[repeatingString + 'type'] === 'melee') {
			damageAddition += options.globalMeleeDamageBonus;
			if (damageFormula !== '') {
				damageFormula += ADD;
			}
			damageFormula += options.globalMeleeDamageBonus + '[global melee damage bonus]';
		} else if (options && options.globalRangedDamageBonus && v[repeatingString + 'type'] === 'ranged') {
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
			damageString += SPACE + damageType;
		}
	}
	if (!exists(damageFormula)) {
		damageFormula = 0;
	}
	finalSetAttrs[repeatingString + 'damage_formula'] = damageFormula;

	var secondDamageFormula = '';

	var secondDamageToggle = v[repeatingString + 'second_damage_toggle'];
	if (secondDamageToggle === '@{second_damage_toggle_var}') {
		var secondDamageAddition = 0;
		var secondDamage = v[repeatingString + 'second_damage'];
		if (exists(secondDamage)) {
			damageString += ADD + secondDamage;
			secondDamageFormula += secondDamage + '[second damage]';
		}

		var secondDamageAbility = getAbilityValue(v, v[repeatingString + 'second_damage_ability']);
		if (exists(secondDamageAbility)) {
			secondDamageAddition += secondDamageAbility;
			if (secondDamageFormula !== '') {
				secondDamageFormula += ADD;
			}
			secondDamageFormula += secondDamageAbility + '[' + getAbilityShortName(v[repeatingString + 'second_damage_ability']) + ']';
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
	finalSetAttrs[repeatingString + 'damage_string'] = damageString;
};

updateHealToggle = function (v, finalSetAttrs, repeatingString) {
	console.log('updateHealToggle');
	if (!exists(v[repeatingString + 'parsed'])) {
		console.log('not parsed');
		if (exists(v[repeatingString + 'heal'])) {
			console.log('heal exists');
			finalSetAttrs[repeatingString + 'heal_ability'] = v.default_ability;
			finalSetAttrs[repeatingString + 'heal_toggle'] = '@{heal_var}';
		}
	}
};

var updateAttack = function () {
	var repeatingItem = 'repeating_attack';
	var collectionArray = ['pb', 'finesse_mod', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'type');
			collectionArray.push(repeatingString + 'roll_toggle');
			collectionArray.push(repeatingString + 'proficiency');
			collectionArray.push(repeatingString + 'attack_ability');
			collectionArray.push(repeatingString + 'attack_bonus');
			collectionArray.push(repeatingString + 'saving_throw_toggle');
			collectionArray.push(repeatingString + 'saving_throw_ability');
			collectionArray.push(repeatingString + 'saving_throw_bonus');
			collectionArray.push(repeatingString + 'damage_toggle');
			collectionArray.push(repeatingString + 'damage');
			collectionArray.push(repeatingString + 'damage_ability');
			collectionArray.push(repeatingString + 'damage_bonus');
			collectionArray.push(repeatingString + 'damage_type');
			collectionArray.push(repeatingString + 'second_damage_toggle');
			collectionArray.push(repeatingString + 'second_damage');
			collectionArray.push(repeatingString + 'second_damage_ability');
			collectionArray.push(repeatingString + 'second_damage_bonus');
			collectionArray.push(repeatingString + 'second_damage_type');
			collectionArray.push(repeatingString + 'parsed');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem+'_' + ids[j] + '_';

				var attackOptions = {
          defaultAbility: 'strength_mod',
					globalAttackBonus: getIntValue(v.global_attack_bonus),
					globalAttackBonusLabel: 'global attack bonus',
					globalMeleeAttackBonus: getIntValue(v.global_melee_attack_bonus),
					globalRangedAttackBonus: getIntValue(v.global_ranged_attack_bonus)
				};
				updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

				updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

				var damageOptions = {
					defaultDamageAbility: 'strength_mod',
					globalDamageBonus: getIntValue(v.global_damage_bonus),
					globalMeleeDamageBonus: getIntValue(v.global_melee_damage_bonus),
					globalRangedDamageBonus: getIntValue(v.global_ranged_damage_bonus)
				};
				updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
				finalSetAttrs[repeatingString + 'parsed'] = true;
			}

			console.log('updateAttack', finalSetAttrs);
			setAttrs(finalSetAttrs);
		});
	});
};

var updateSpell = function () {
	var repeatingItem = 'repeating_spell';
	var collectionArray = ['pb', 'finesse_mod', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod', 'global_spell_attack_bonus', 'global_spell_damage_bonus', 'global_spell_dc_bonus', 'global_spell_heal_bonus', 'default_ability'];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'type');
			collectionArray.push(repeatingString + 'roll_toggle');
			collectionArray.push(repeatingString + 'proficiency');
			collectionArray.push(repeatingString + 'attack_ability');
			collectionArray.push(repeatingString + 'attack_bonus');
			collectionArray.push(repeatingString + 'saving_throw_toggle');
			collectionArray.push(repeatingString + 'saving_throw_ability');
			collectionArray.push(repeatingString + 'saving_throw_vs_ability');
			collectionArray.push(repeatingString + 'saving_throw_bonus');
			collectionArray.push(repeatingString + 'damage_toggle');
			collectionArray.push(repeatingString + 'damage');
			collectionArray.push(repeatingString + 'damage_ability');
			collectionArray.push(repeatingString + 'damage_bonus');
			collectionArray.push(repeatingString + 'damage_type');
			collectionArray.push(repeatingString + 'second_damage_toggle');
			collectionArray.push(repeatingString + 'second_damage');
			collectionArray.push(repeatingString + 'second_damage_ability');
			collectionArray.push(repeatingString + 'second_damage_bonus');
			collectionArray.push(repeatingString + 'second_damage_type');
			collectionArray.push(repeatingString + 'parsed');
      collectionArray.push(repeatingString + 'casting_time');
      collectionArray.push(repeatingString + 'components');
			collectionArray.push(repeatingString + 'heal');
			collectionArray.push(repeatingString + 'add_casting_modifier');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem+'_' + ids[j] + '_';

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
				var addCastingModifier = v[repeatingString + 'add_casting_modifier'];
				if (exists(addCastingModifier)) {
					if (exists(v[repeatingString + 'damage'])) {
						finalSetAttrs[repeatingString + 'damage_ability'] = v.default_ability;
					}
					if (exists(v[repeatingString + 'heal'])) {
						finalSetAttrs[repeatingString + 'heal_ability'] = v.default_ability;
					}
				}

				var attackOptions = {
					globalAttackBonus: getIntValue(v.global_spell_attack_bonus)
				};
				updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

				var savingThrowOptions = {
					bonusDC: v.global_spell_dc_bonus
				};
				updateSavingThrowToggle(v, finalSetAttrs, repeatingString, savingThrowOptions);

				var damageOptions = {
					globalDamageBonus: getIntValue(v.global_spell_damage_bonus)
				};
				updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);

				updateHealToggle(v, finalSetAttrs, repeatingString);

				if (!exists(v[repeatingString + 'parsed'])) {
					finalSetAttrs[repeatingString + 'parsed'] = true;
				}

			}

			console.log('updateSpell', finalSetAttrs);
			setAttrs(finalSetAttrs);
		});
	});
};


on('change:repeating_spell remove:repeating_spell', function () {
	updateSpell();
});
on('change:global_spell_attack_bonus change:global_spell_damage_bonus change:global_spell_dc_bonus change:global_spell_heal_bonus', function () {
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
		setAttrs(finalSetAttrs);
	});
};

on('change:halfling_luck', function () {
	updateD20Mod();
});

var updateSkill = function () {
	var repeatingItem = 'repeating_skill';
	var collectionArray = ['jack_of_all_trades_toggle', 'jack_of_all_trades', 'pb', 'exp', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod', 'global_check_bonus'];
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

				var skillAbility = getAbilityValue(v, v[repeatingString + 'ability'], 'strength_mod');
				total += skillAbility;
				totalFormula += ADD + skillAbility + '[' + getAbilityShortName(v[repeatingString + 'ability']) + ']';

				var skillBonus = getIntValue(v[repeatingString + 'bonus']);
				total += skillBonus;
				totalFormula += ADD + skillBonus + '[bonus]';

				var globalCheckBonus = getIntValue(v.global_check_bonus);
				total += globalCheckBonus;
				totalFormula += ADD + globalCheckBonus + '[global check bonus]';

				finalSetAttrs[repeatingString + 'total'] = total;
				finalSetAttrs[repeatingString + 'formula'] = totalFormula;
			}

			console.log('updateSkill', finalSetAttrs);
			setAttrs(finalSetAttrs);
		});
	});
};

on('change:repeating_skill change:jack_of_all_trades_toggle change:jack_of_all_trades', function () {
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
			}

			finalSetAttrs.version = currentVersion;
		}

		setAttrs(finalSetAttrs);
		updateSkill();
	});
};

on('sheet:opened', function () {
	sheetOpened();
});
