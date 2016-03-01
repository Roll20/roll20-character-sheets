var currentVersion = '2.1.13';
var skills = {
	abilities: {
		'acrobatics': 'dexterity',
		'animalHandling': 'wisdom',
		'arcana': 'intelligence',
		'athletics': 'strength',
		'deception': 'charisma',
		'history': 'intelligence',
		'insight': 'wisdom',
		'intimidation': 'charisma',
		'investigation': 'intelligence',
		'medicine': 'wisdom',
		'nature': 'intelligence',
		'perception': 'wisdom',
		'performance': 'charisma',
		'persuasion': 'charisma',
		'religion': 'intelligence',
		'sleightOfHand': 'dexterity',
		'stealth': 'dexterity',
		'survival': 'wisdom'
	},
	names: {
		en: {
			'acrobatics': 'Acrobatics',
			'animalHandling': 'Animal Handling',
			'arcana': 'Arcana',
			'athletics': 'Athletics',
			'deception': 'Deception',
			'history': 'History',
			'insight': 'Insight',
			'intimidation': 'Intimidation',
			'investigation': 'Investigation',
			'medicine': 'Medicine',
			'nature': 'Nature',
			'perception': 'Perception',
			'performance': 'Performance',
			'persuasion': 'Persuasion',
			'religion': 'Religion',
			'sleightOfHand': 'Sleight of Hand',
			'stealth': 'Stealth',
			'survival': 'Survival'
		},
		de: {
			'acrobatics': 'Akrobatik',
			'animalHandling': 'Umgang mit Tieren',
			'arcana': 'Arkanes',
			'athletics': 'Athletik',
			'deception': 'Täuschung',
			'history': 'Geschichte',
			'insight': 'Einsicht',
			'intimidation': 'Einschüchterung',
			'investigation': 'Investigation',
			'medicine': 'Medizin',
			'nature': 'Natur',
			'perception': 'Entdecken',
			'performance': 'Auftreten',
			'persuasion': 'Überreden',
			'religion': 'Religion',
			'sleightOfHand': 'Taschendiebstahl',
			'stealth': 'Tarnung',
			'survival': 'Überleben'
		},
		fr: {
			'acrobatics': 'Acrobaties',
			'animalHandling': 'Dressage',
			'arcana': 'Arcanes',
			'athletics': 'Athlétisme',
			'deception': 'Tromperie',
			'history': 'Histoire',
			'insight': 'Intuition',
			'intimidation': 'Intimidation',
			'investigation': 'Investigation',
			'medicine': 'Médecine',
			'nature': 'Nature',
			'perception': 'Perception',
			'performance': 'Représentation',
			'persuasion': 'Persuasion',
			'religion': 'Religion',
			'sleightOfHand': 'Escamotage',
			'stealth': 'Discrétion',
			'survival': 'Survie'
		}
	}
};

String.prototype.capitalize = function () {
	return this.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1);
	});
};
String.prototype.firstThree = function () {
	return this.substring(0, 3);
};
Number.prototype.round = function(places) {
	return +(Math.round(this + 'e+' + places)  + 'e-' + places);
};
Object.prototype.getKeyByValue = function( value ) {
	for (var prop in this) {
		if (this.hasOwnProperty( prop )) {
			if (this[ prop ] === value) {
				return prop;
			}
		}
	}
};
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
	} else if (typeof varName === 'string') {
		varName = varName.replace(/\W/g, '');
	}
	return varName;
}
function getAbilityValue(v, varName, defaultAbility) {
	if (typeof varName === 'undefined') {
		if (defaultAbility) {
			return getIntValue(v[defaultAbility]);
		}
	} else if (exists(varName)) {
		varName = getAbilityModName(varName);
		return getIntValue(v[varName], 0);
	}
	return 0;
}
function getAbilityShortName(varName, capital) {
	if (!varName) {
		return 'Str';
	}
	varName = getAbilityModName(varName);
	if (capital) {
		varName = varName.capitalize();
	}
	return varName.firstThree();
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
		console.log('finalSetAttrs', finalSetAttrs);
		setAttrs(finalSetAttrs);
	}
}
function fromVOrFinalSetAttrs(v, finalSetAttrs, value) {
	if (exists(finalSetAttrs[value])) {
		return finalSetAttrs[value];
	}
	return v[value];
}
function parseAttackComponent(v, repeatingString, finalSetAttrs, options) {
	var parsed = v[repeatingString + 'parsed'];

	if (isUndefined(parsed)) {
		parsed = finalSetAttrs[repeatingString + 'parsed'];
	}

	if (isUndefined(parsed) || parsed.indexOf(options.parseName) === -1) {
		var aTriggerFieldExists = false;

		for (var i = 0; i < options.triggerFields.length; i++) {
			if (exists(v[repeatingString + options.triggerFields[i]])) {
				aTriggerFieldExists = true;
			}
		}

		if (aTriggerFieldExists && !exists(v[repeatingString + options.toggleField])) {
			finalSetAttrs[repeatingString + options.toggleField] = options.toggleFieldSetTo;

			if (isUndefined(finalSetAttrs[repeatingString + 'parsed'])) {
				finalSetAttrs[repeatingString + 'parsed'] = '';
			}
			finalSetAttrs[repeatingString + 'parsed'] += ' ' + options.parseName;
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
	}
}
function hasUpperCase(string) {
	return (/[A-Z]/.test(string));
}
function isUndefined(value) {
	if (typeof value === 'undefined' || value === ''){
		return true;
	}
	 return false;
}
function emptyIfUndefined(value) {
	if (!value) {
		return '';
	}
	return value;
}
function ordinalSpellLevel(level) {
	if (level === 0) {
		return 'Cantrip';
	} else {
		switch (level % 10) {
			case 1:
				return level + 'st-level';
			case 2:
				return level + 'nd-level';
			case 3:
				return level + 'rd-level';
			default:
				return level + 'th-level';
		}
	}
}
function versionCompare(v1, v2, options) {
	var lexicographical = options && options.lexicographical,
		zeroExtend = options && options.zeroExtend,
		v1parts = v1.split('.'),
		v2parts = v2.split('.');

	function isValidPart(x) {
		return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
	}

	if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
		return NaN;
	}

	if (zeroExtend) {
		while (v1parts.length < v2parts.length) v1parts.push('0');
		while (v2parts.length < v1parts.length) v2parts.push('0');
	}

	if (!lexicographical) {
		v1parts = v1parts.map(Number);
		v2parts = v2parts.map(Number);
	}

	for (var i = 0; i < v1parts.length; ++i) {
		if (v2parts.length == i) {
			return 1;
		}

		if (v1parts[i] == v2parts[i]) {
			continue;
		}
		else if (v1parts[i] > v2parts[i]) {
			return 1;
		}
		else {
			return -1;
		}
	}

	if (v1parts.length != v2parts.length) {
		return -1;
	}

	return 0;
}
function getAbilityMod (score) {
  return Math.floor((getIntValue(score) - 10) / 2);
}
function addOrSubtract (string, number) {
	var value = number;
	if (string && value) {
		if (value >= 0) {
			value = ADD + value;
		} else {
			value = SUBTRACT + Math.abs(value);
		}
	}
	return value;
}
function numberWithCommas(x) {
	if (x) {
		var parts = x.toString().split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return parts.join('.');
	}
}
function lowercaseWords (string) {
	if (!string) {
		return;
	}
	return string.toLowerCase();
}
function findClosest (array, goal) {
	return array.reduce(function (prev, curr) {
		return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
	});
}
function getCorrectAbilityBasedOnBonus (finalSetAttrs, repeatingString, fieldName, bonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod) {
	var closest;
	if (bonus) {
		if (spellAttack) {
			closest = findClosest(spellMods, bonus);
			bonus -= closest;
			if (closest === spellMods[0]) {
				finalSetAttrs[repeatingString + fieldName] = '@{intelligence_mod}';
			} else if (closest === spellMods[1]) {
				finalSetAttrs[repeatingString + fieldName] = '@{wisdom_mod}';
			} else if (closest === spellMods[2]) {
				finalSetAttrs[repeatingString + fieldName] = '@{charisma_mod}';
			}
		} else {
			if (rangedAttack) {
				finalSetAttrs[repeatingString + 'attack_ability'] = '@{dexterity_mod}';
				bonus -= dexMod;
			} else {
				closest = findClosest(meleeMods, bonus);
				bonus -= closest;
				if (closest === meleeMods[0]) {
					finalSetAttrs[repeatingString + fieldName] = '@{strength_mod}';
				} else if (closest === meleeMods[1]) {
					finalSetAttrs[repeatingString + fieldName] = '@{dexterity_mod}';
				}
			}
		}
	} else {
		finalSetAttrs[repeatingString + fieldName] = 0;
	}
	return bonus;
}
function getAnyCorrectAbilityBasedOnBonus (finalSetAttrs, repeatingString, fieldName, bonus, abilityMods) {
	var closest = findClosest(abilityMods, bonus);
	if (bonus) {
		bonus -= closest;

		if (closest === abilityMods[0]) {
			finalSetAttrs[repeatingString + fieldName] = '@{strength_mod}';
		} else if (closest === abilityMods[1]) {
			finalSetAttrs[repeatingString + fieldName] = '@{dexterity_mod}';
		} else if (closest === abilityMods[2]) {
			finalSetAttrs[repeatingString + fieldName] = '@{constitution_mod}';
		} else if (closest === abilityMods[3]) {
			finalSetAttrs[repeatingString + fieldName] = '@{intelligence_mod}';
		} else if (closest === abilityMods[4]) {
			finalSetAttrs[repeatingString + fieldName] = '@{wisdom_mod}';
		} else if (closest === abilityMods[5]) {
			finalSetAttrs[repeatingString + fieldName] = '@{charisma_mod}';
		}
	} else {
		finalSetAttrs[repeatingString + fieldName] = 0;
	}
	return bonus;
}

function lowercaseDamageTypes (string) {
	if (!string) {
		return;
	}
	return string
		.replace('Acid', 'acid')
		.replace('Cold', 'cold')
		.replace('Fire', 'fire')
		.replace('Force', 'force')
		.replace('Lightning', 'lightning')
		.replace('Necrotic', 'necrotic')
		.replace('Poison', 'poison')
		.replace('Psychic', 'psychic')
		.replace('Radiant', 'radiant')
		.replace('Thunder', 'thunder')
		.replace('Bludgeoning', 'bludgeoning')
		.replace('Piercing', 'piercing')
		.replace('Slashing', 'slashing')
		.replace('And', 'and')
		.replace('From', 'from')
		.replace('Nonmagical', 'nonmagical')
		.replace('Weapons', 'weapons')
		.replace('That', 'that')
		.replace('Aren\'t', 'aren\'t')
		.replace('Silvered', 'silvered')
		.replace('Adamantine', 'adamantine');
}

var ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
var ADD = ' + ';
var SUBTRACT = ' - ';
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

function updateAbilityModifiers () {
	updateAbilityModifier('strength');
	updateAbilityModifier('dexterity');
	updateAbilityModifier('constitution');
	updateAbilityModifier('intelligence');
	updateAbilityModifier('wisdom');
	updateAbilityModifier('charisma');
}
function updateAbilityModifier (ability) {
	var collectionArray = [ability, ability + '_bonus', ability + '_mod', ability + '_check_mod', 'global_ability_bonus', 'strength_mod', 'dexterity_mod', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var abilityScore = getIntValue(v[ability]);
		var abilityBonus = getIntValue(v[ability + '_bonus']);
		var globalAbilityBonus = getIntValue(v.global_ability_bonus);
		var abilityMod = getAbilityMod((abilityScore + abilityBonus + globalAbilityBonus));

		var abilityCheckFormula = abilityMod + '[' + ability.firstThree() + ' mod with bonus]';
		if ((ability === 'strength' || ability === 'dexterity' || ability === 'constitution') && v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
			var remarkableAthlete = getIntValue(v.remarkable_athlete);
			abilityCheckFormula += ADD + remarkableAthlete + '[remarkable athlete]';
		} else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
			var jackOfAllTrades = getIntValue(v.jack_of_all_trades);
			abilityCheckFormula += ADD + jackOfAllTrades + '[jack of all trades]';
		}
		abilityCheckFormula += ADD + '(@{global_check_bonus})[global check bonus]';

		var abilityModWithSign = abilityMod;
		if (abilityMod >= 0) {
			abilityModWithSign = '+' + abilityMod;
		}

		finalSetAttrs[ability + '_mod'] = abilityMod;
		finalSetAttrs[ability + '_mod_with_sign'] = abilityModWithSign;
		finalSetAttrs[ability + '_check_mod'] = abilityCheckFormula;

		if (ability === 'strength') {
			finalSetAttrs.finesse_mod = Math.max(abilityMod, getIntValue(v.dexterity_mod));
			finalSetAttrs.carrying_capacity = abilityScore * 15;
			finalSetAttrs.max_push_drag_lift = abilityScore * 30;
			finalSetAttrs.encumbered = abilityScore * 5;
			finalSetAttrs.heavily_encumbered = abilityScore * 10;
		} else if (ability === 'dexterity') {
			finalSetAttrs.finesse_mod = Math.max(abilityMod, getIntValue(v.strength_mod));
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:strength change:strength_bonus change:strength_check_mod change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_ability_bonus', function () {
	updateAbilityModifier('strength');
});
on('change:dexterity change:dexterity_bonus change:dexterity_check_mod change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_ability_bonus', function () {
	updateAbilityModifier('dexterity');
});
on('change:constitution change:constitution_bonus change:constitution_check_mod change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_ability_bonus', function () {
	updateAbilityModifier('constitution');
});
on('change:intelligence change:intelligence_bonus change:intelligence_check_mod change:jack_of_all_trades_toggle change:jack_of_all_trades change:global_ability_bonus', function () {
	updateAbilityModifier('intelligence');
});
on('change:wisdom change:wisdom_bonus change:wisdom_check_mod change:jack_of_all_trades_toggle change:jack_of_all_trades change:global_ability_bonus', function () {
	updateAbilityModifier('wisdom');
});
on('change:charisma change:charisma_bonus change:charisma_check_mod change:jack_of_all_trades_toggle change:jack_of_all_trades change:global_ability_bonus', function () {
	updateAbilityModifier('charisma');
});
on('change:dexterity_mod', function () {
	updateArmor();
});

function updateLevels () {
	var repeatingItem = 'repeating_class';
	var collectionArray = ['barbarian_level', 'bard_level', 'cleric_level', 'druid_level', 'fighter_level', 'monk_level', 'paladin_level', 'ranger_level', 'rogue_level', 'sorcerer_level', 'warlock_level', 'wizard_level'];
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
	var xpTable = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000, 385000, 405000, 435000, 465000, 495000, 525000, 555000, 585000, 605000, 635000, 665000];

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
      finalSetAttrs.barbarian_level = 0;
      finalSetAttrs.bard_level = 0;
      finalSetAttrs.cleric_level = 0;
      finalSetAttrs.druid_level = 0;
      finalSetAttrs.fighter_level = 0;
      finalSetAttrs.monk_level = 0;
      finalSetAttrs.paladin_level = 0;
      finalSetAttrs.ranger_level = 0;
      finalSetAttrs.rogue_level = 0;
      finalSetAttrs.sorcerer_level = 0;
      finalSetAttrs.warlock_level = 0;
      finalSetAttrs.wizard_level = 0;

			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				var className = v[repeatingString + 'name'];
				if (isUndefined(className)) {
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
				levelArray.push(className.capitalize() + ' ' + classLevel);

        if (v[className + '_level']) {
          finalSetAttrs[className + '_level'] += classLevel;
        } else {
          finalSetAttrs[className + '_level'] = classLevel;
        }

        var classHd = v[repeatingString + 'hd'];
				if (isUndefined(classHd)) {
					if (defaultClassDetails.hasOwnProperty(className)) {
						classHd = defaultClassDetails[className].hd;
						finalSetAttrs[repeatingString + 'hd'] = classHd;
					} else {
						classHd = 'd12';
					}
				}
				hd[classHd] += classLevel;

				var classSpellcasting = v[repeatingString + 'spellcasting'];
				if (isUndefined(classSpellcasting)) {
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
				finalSetAttrs.caster_type = 'full';
			} else if (spellcasting.half) {
				finalSetAttrs.caster_type = 'half';
			} else if (spellcasting.third) {
				finalSetAttrs.caster_type = 'third';
			} else {
				finalSetAttrs.caster_type = 'full';
			}

			finalSetAttrs.level = totalLevel;
			finalSetAttrs.class_and_level = levelArray.join(' ');

			var xpForNextLevel = 0;
			if (!totalLevel) {
				totalLevel = 0;
			}
			if (totalLevel > 30) {
				xpForNextLevel = xpTable[30];
			} else {
				xpForNextLevel = xpTable[totalLevel];
			}
			finalSetAttrs.xp_next_level = xpForNextLevel;

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
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}

on('change:repeating_class remove:repeating_class', function () {
	updateLevels();
	updateSpellSlots();
});

function updateSpellSlots () {
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
		if (isUndefined(casterType)) {
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
}

on('change:caster_level change:spell_slots_l1_bonus change:spell_slots_l2_bonus change:spell_slots_l3_bonus change:spell_slots_l4_bonus change:spell_slots_l5_bonus change:spell_slots_l6_bonus change:spell_slots_l7_bonus change:spell_slots_l8_bonus change:spell_slots_l9_bonus', function () {
	updateSpellSlots();
});

function getPB (level, challenge) {
  var pb = 2;

  level = getIntValue(level);
  if (challenge < 1) {
    challenge = 1;
  } else {
    getIntValue(challenge);
  }
  var levelOrChallenge = Math.max(level, challenge);

  if (exists(levelOrChallenge)) {
    pb += Math.floor(Math.abs((levelOrChallenge - 1) / 4));
  }
  return pb;
}
function updatePb () {
	var collectionArray = ['level', 'challenge'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var pb = getPB(v.level, v.challenge);

		finalSetAttrs.pb = pb;
		finalSetAttrs.exp = pb * 2;
		finalSetAttrs.h_PB = pb / 2;
		setFinalAttrs(v, finalSetAttrs);
	});
}

on('change:level', function () {
	updatePb();
});

function sumRepeating (options, sumItems) {
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
				if (sumItems[x].addOnAfterQty) {
					collectionArray.push(repeatingString + sumItems[x].addOnAfterQty);
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
						if (!v[repeatingString + sumItem.armorType] || v[repeatingString + sumItem.armorType] === 'Light Armor') {
							fieldToAdd += Math.min(5, dexMod);
						} else if (v[repeatingString + sumItem.armorType] === 'Medium Armor') {
							var mediumArmorDexMod = getIntValue(v.medium_armor_max_dex, 2);
							fieldToAdd += Math.min(mediumArmorDexMod, dexMod);
						} else if (v[repeatingString + sumItem.armorType] === 'Armor + Dex') {
							fieldToAdd += dexMod;
						}
					}

					var itemTotal = (qty * fieldToAdd).round(2);
					console.log('itemTotal', itemTotal);

					if (sumItem.addOnAfterQty) {
						itemTotal += getFloatValue(v[repeatingString + sumItem.addOnAfterQty]);
					}

					itemTotal = itemTotal.round(2);

					if (sumItem.itemTotal) {
						finalSetAttrs[repeatingString + sumItem.itemTotal] = itemTotal;
					}

					var toggle = v[repeatingString + options.toggle];
					if (toggle !== 0 && toggle !== '0') {
						var addToPrimary = true;
						var addToSecondary = false;

						if (sumItem.armorType) {
							if (v[repeatingString + sumItem.armorType] === 'Shield' || v[repeatingString + sumItem.armorType] === 'AC') {
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

			if (options.collection === 'armor' && !getIntValue(v.is_npc)) {
				finalSetAttrs.ac_unarmored_calc += 10 + dexMod + getAbilityValue(v, v.ac_unarmored_ability);

				finalSetAttrs.ac = Math.max(finalSetAttrs.ac_armored_calc, finalSetAttrs.ac_unarmored_calc);
			}
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}

function updateArmor (rowId) {
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

				if (isUndefined(v[repeatingString + 'parsed']) || v[repeatingString + 'parsed'].indexOf('acBonus') === -1) {
					var armorModifiers = v[repeatingString + 'modifiers'];
					if (exists(armorModifiers)) {
						var acBonus = armorModifiers.replace(/^\D+/g, '');

						finalSetAttrs[repeatingString + 'ac_bonus'] = acBonus;
					}
					if (isUndefined(finalSetAttrs[repeatingString + 'parsed'])) {
						finalSetAttrs[repeatingString + 'parsed'] = '';
					}
					finalSetAttrs[repeatingString + 'parsed'] += ' acBonus';
				}
			}
			setFinalAttrs(v, finalSetAttrs);
		});
	});

	var options = {
		collection: 'armor',
		getExtraFields: ['medium_armor_max_dex', 'dexterity_mod', 'ac_unarmored_ability', 'is_npc'],
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
}
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

function updateEquipment (rowId) {
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

				if (isUndefined(v[repeatingString + 'parsed']) || v[repeatingString + 'parsed'].indexOf('content') === -1) {
					var content = v[repeatingString + 'content'];
					if (exists(content)) {
						content = content.replace(/\s(\d+d\d+\s(?:\+|\-)\s\d+)\s/g, ' [[$1]] ')
							.replace(/\s(\d+d\d+)\s/g, ' [[$1]] ')
							.replace(/\s(\d+)\s/g, ' [[$1]] ');

						finalSetAttrs[repeatingString + 'content'] = content;
					}
					if (isUndefined(finalSetAttrs[repeatingString + 'parsed'])) {
						finalSetAttrs[repeatingString + 'parsed'] = '';
					}
					finalSetAttrs[repeatingString + 'parsed'] += ' content';
				}
			}
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}

on('change:repeating_equipment', function (eventInfo) {
	var rowId = getRowId('repeating_equipment', eventInfo);
	updateEquipment(rowId);
});
function weighEquipment () {
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
}
on('change:repeating_equipment:carried change:repeating_equipment:qty change:repeating_equipment:weight remove:repeating_equipment', function () {
	weighEquipment();
});

on('change:pb', function () {
	updateSkill();
	updateAttack();
	updateSpell();
	updateJackOfAllTrades();
	updateRemarkableAthlete();
	updateAction('trait');
	updateAction('action');
	updateAction('reaction');
	updateAction('legendaryaction');
	updateAction('lairaction');
});

function updateJackOfAllTrades () {
	var collectionArray = ['pb'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:jack_of_all_trades_toggle', function () {
	updateJackOfAllTrades();
});

function updateRemarkableAthlete () {
	var collectionArray = ['pb'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.remarkable_athlete = Math.ceil(getIntValue(v.pb) / 2);
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:remarkable_athlete_toggle', function () {
	updateRemarkableAthlete();
});

function updateInitiative () {
	var collectionArray = ['dexterity_mod', 'dexterity_check_bonus', 'initiative_bonus', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'global_check_bonus'];
	var finalSetAttrs = {};

	finalSetAttrs.initiative = 0;
	finalSetAttrs.initiative_formula = '';
	getAttrs(collectionArray, function (v) {

		var dexMod = getIntValue(v.dexterity_mod);
		if (exists(dexMod)) {
			finalSetAttrs.initiative += dexMod;
		}
		finalSetAttrs.initiative_formula += dexMod + '[dex]';

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

		if (v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
			var remarkableAthlete = getIntValue(v.remarkable_athlete);
			if (exists(remarkableAthlete)) {
				finalSetAttrs.initiative += remarkableAthlete;
				finalSetAttrs.initiative_formula += ADD + remarkableAthlete + '[remarkable athlete]';
			}
		} else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
			var jackOfAllTrades = getIntValue(v.jack_of_all_trades);
			if (exists(jackOfAllTrades)) {
				finalSetAttrs.initiative += jackOfAllTrades;
				finalSetAttrs.initiative_formula += ADD + jackOfAllTrades + '[jack of all trades]';
			}
		}

		var globalCheckBonus = v.global_check_bonus;
		if (exists(globalCheckBonus)) {
			finalSetAttrs.initiative_formula += ADD + globalCheckBonus + '[global check bonus]';
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:dexterity_mod change:dexterity_check_bonus change:initiative_bonus change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_check_bonus', function () {
	updateInitiative();
});

function updateWeight () {
	var collectionArray = ['weight_attacks', 'weight_armor', 'weight_equipment', 'weight_coinage', 'weight_misc'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.weight_total = (getFloatValue(v.weight_attacks) + getFloatValue(v.weight_armor) + getFloatValue(v.weight_equipment) + getFloatValue(v.weight_coinage) + getFloatValue(v.weight_misc)).round(2);
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:weight_attacks change:weight_armor change:weight_equipment change:weight_coinage change:weight_misc', function () {
	updateWeight();
});

on('change:repeating_attack', function (eventInfo) {
	var changedField = getRepeatingField('repeating_attack', eventInfo);
	if (changedField !== 'toggle_details' && changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'parsed') {
		var rowId = getRowId('repeating_attack', eventInfo);
		updateAttack(rowId);
	}
	/*updateAttackQuery();*/
});
on('change:repeating_attack:carried change:repeating_attack:weight change:repeating_attack:ammo change:repeating_attack:ammo_weight remove:repeating_attack', function () {
	var options = {
		collection: 'attack',
		toggle: 'carried',
		qty: 'ammo'
	};
	var sumItems = [
		{
			addOnAfterQty: 'weight',
			fieldToAdd: 'ammo_weight',
			itemTotal: 'weight_total',
			totalField: 'weight_attacks'
		}
	];
	sumRepeating(options, sumItems);
});
on('change:global_attack_bonus change:global_melee_attack_bonus change:global_ranged_attack_bonus change:global_damage_bonus change:global_melee_damage_bonus change:global_ranged_damage_bonus', function () {
	updateAttack();
});

function updateAttackToggle (v, finalSetAttrs, repeatingString, options) {
	var attackParse = {
		attackAbility: options.attackAbility,
		parseName: 'attack',
		toggleField: 'roll_toggle',
		toggleFieldSetTo: '@{roll_toggle_var}',
		triggerFields: ['type']
	};
	parseAttackComponent(v, repeatingString, finalSetAttrs, attackParse);

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

		if (isUndefined(v[repeatingString + 'ammo']) && isUndefined(finalSetAttrs[repeatingString + 'ammo_weight']) && v[repeatingString + 'type'] === 'Ranged Weapon') {
			finalSetAttrs[repeatingString + 'ammo'] = '1';
			finalSetAttrs[repeatingString + 'ammo_weight'] = '.02';
		}

		var attackAbility = v[repeatingString + 'attack_ability'];
		if (isUndefined(attackAbility) && v[repeatingString + 'type'] === 'Ranged Weapon') {
			attackAbility = '@{dexterity_mod}';
			finalSetAttrs[repeatingString + 'attack_ability'] = attackAbility;
		} else if (finalSetAttrs[repeatingString + 'attack_ability']) {
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
			if (!isNaN(options.globalAttackBonus)) {
				toHit += getIntValue(options.globalAttackBonus);
			}
			attackFormula += ADD + options.globalAttackBonus + '[' + options.globalAttackBonusLabel + ']';
		}

		if (!v[repeatingString + 'type'] || v[repeatingString + 'type'] === 'Melee Weapon') {
			if (exists(options.globalMeleeAttackBonus)) {
				if (!isNaN(options.globalMeleeAttackBonus)) {
					toHit += getIntValue(options.globalMeleeAttackBonus);
				}
				attackFormula += ADD + options.globalMeleeAttackBonus + '[global melee attack bonus]';
			}
		} else if (v[repeatingString + 'type'] === 'Ranged Weapon') {
			if (exists(options.globalRangedAttackBonus)) {
				if (!isNaN(options.globalRangedAttackBonus)) {
					toHit += getIntValue(options.globalRangedAttackBonus);
				}
				attackFormula += ADD + options.globalRangedAttackBonus + '[global ranged attack bonus]';
			}
		}
	}
	if (options.type === 'attack') {
		finalSetAttrs[repeatingString + 'to_hit'] = toHit;
	}
	finalSetAttrs[repeatingString + 'attack_formula'] = attackFormula;
}

function updateSavingThrowToggle (v, finalSetAttrs, repeatingString, options) {
	var savingThrowParse = {
		parseName: 'savingThrow',
		toggleField: 'saving_throw_toggle',
		toggleFieldSetTo: '@{saving_throw_toggle_var}',
		triggerFields: ['saving_throw_vs_ability']
	};
	parseAttackComponent(v, repeatingString, finalSetAttrs, savingThrowParse);

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
}

function updateDamageToggle (v, finalSetAttrs, repeatingString, options) {
	var damageParse = {
		addCastingModifier: exists(v[repeatingString + 'add_casting_modifier']),
		parseName: 'damage',
		toggleField: 'damage_toggle',
		toggleFieldSetTo: '@{damage_toggle_var}',
		triggerFields: ['damage']
	};
	parseAttackComponent(v, repeatingString, finalSetAttrs, damageParse);

	var damageString = '';
	var damageFormula = '';
	var damageToggle = v[repeatingString + 'damage_toggle'];
	var damageAbility;
	var damageType;

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

		damageAbility = v[repeatingString + 'damage_ability'];
		if (isUndefined(damageAbility) && v[repeatingString + 'type'] === 'Ranged Weapon') {
			damageAbility = '@{dexterity_mod}';
			finalSetAttrs[repeatingString + 'damage_ability'] = damageAbility;
		}
		if (exists(damageAbility) || options.defaultDamageAbility) {
			var damageAbilityValue = getAbilityValue(v, damageAbility, options.defaultDamageAbility);
			if (exists(damageAbilityValue)) {
				damageAddition += damageAbilityValue;
				damageFormula += addOrSubtract(damageFormula, damageAbilityValue) + '[' + getAbilityShortName(v[repeatingString + 'damage_ability']) + ']';
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
			if (!isNaN(options.globalDamageBonus)) {
				damageAddition += getIntValue(options.globalDamageBonus);
			} else {
				damageString += ADD + options.globalDamageBonus;
			}
			damageFormula += ADD + options.globalDamageBonus + '[global damage bonus]';
		}

		if (options && options.globalMeleeDamageBonus && !v[repeatingString + 'type'] || v[repeatingString + 'type'] === 'Melee Weapon') {
			if (!isNaN(options.globalMeleeDamageBonus)) {
				damageAddition += getIntValue(options.globalMeleeDamageBonus);
			} else {
				damageString += ADD + options.globalMeleeDamageBonus;
			}
			if (damageFormula !== '') {
				damageFormula += ADD;
			}
			damageFormula += options.globalMeleeDamageBonus + '[global melee damage bonus]';
		} else if (options && options.globalRangedDamageBonus && v[repeatingString + 'type'] === 'Ranged Weapon') {
			if (!isNaN(options.globalRangedDamageBonus)) {
				damageAddition += getIntValue(options.globalRangedDamageBonus);
			} else {
				damageString += ADD + options.globalRangedDamageBonus;
			}
			if (damageFormula !== '') {
				damageFormula += ADD;
			}
			damageFormula += options.globalRangedDamageBonus + '[global ranged damage bonus]';
		}

		if (exists(damageAddition)) {
			damageString += addOrSubtract(damageString, damageAddition);
		}

		damageType = v[repeatingString + 'damage_type'];
		if (exists(damageType)) {
			if (hasUpperCase(damageType)) {
				damageType = damageType.toLowerCase();
				finalSetAttrs[repeatingString + 'damage_type'] = damageType;
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
	parseAttackComponent(v, repeatingString, finalSetAttrs, secondDamageParse);

	var secondDamageFormula = '';

	var secondDamageToggle = fromVOrFinalSetAttrs(v, finalSetAttrs, repeatingString + 'second_damage_toggle');
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
				secondDamageFormula += addOrSubtract(secondDamageFormula, secondDamageAbility) + '[' + getAbilityShortName(v[repeatingString + 'second_damage_ability']) + ']';
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
			damageString += addOrSubtract(damageString, secondDamageAddition);
		}

		var secondDamageType = v[repeatingString + 'second_damage_type'];
		if (exists(secondDamageType)) {
			if (hasUpperCase(secondDamageType)) {
				secondDamageType = secondDamageType.toLowerCase();
				finalSetAttrs[repeatingString + 'second_damage_type'] = secondDamageType;
			}
			damageString += SPACE + secondDamageType;
		}

		if (isUndefined(v[repeatingString + 'parsed']) || v[repeatingString + 'parsed'].indexOf('damageProperties') === -1) {
			var damageProperties = v[repeatingString + 'properties'];
			if (exists(damageProperties)) {
				if (damageProperties.indexOf('Versatile') !== -1) {
					if (!exists(damageAbility)) {
						damageAbility = '@{strength_mod}';
					}
					finalSetAttrs[repeatingString + 'second_damage_ability'] = damageAbility;
					finalSetAttrs[repeatingString + 'second_damage_type'] = damageType;
				}
				if (!finalSetAttrs[repeatingString + 'parsed']) {
					finalSetAttrs[repeatingString + 'parsed'] = '';
				}
				finalSetAttrs[repeatingString + 'parsed'] += ' damageProperties';
			}
		}

	}
	if (!exists(secondDamageFormula)) {
		secondDamageFormula = 0;
	}
	finalSetAttrs[repeatingString + 'second_damage_formula'] = secondDamageFormula;
	if (options.type === 'attack') {
		finalSetAttrs[repeatingString + 'damage_string'] = damageString;
	}
}

function updateHealToggle (v, finalSetAttrs, repeatingString) {
	var healParse = {
		addCastingModifier: exists(v[repeatingString + 'add_casting_modifier']),
		parseName: 'heal',
		toggleField: 'heal_toggle',
		toggleFieldSetTo: '@{heal_toggle_var}',
		triggerFields: ['heal']
	};
	parseAttackComponent(v, repeatingString, finalSetAttrs, healParse);

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

		finalSetAttrs[repeatingString + 'heal_formula'] = healFormula;
	}
}

function updateHigherLevelToggle (v, finalSetAttrs, repeatingString) {
	var higherLevelParse = {
		addCastingModifier: exists(v[repeatingString + 'add_casting_modifier']),
		parseName: 'higherLevel',
		toggleField: 'higher_level_toggle',
		toggleFieldSetTo: '@{higher_level_toggle_var}',
		triggerFields: ['higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal']
	};
	parseAttackComponent(v, repeatingString, finalSetAttrs, higherLevelParse);

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
}

function updateAttackQuery () {
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
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}

function updateAttack (rowId) {
	var repeatingItem = 'repeating_attack';
	var collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
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
			collectionArray.push(repeatingString + 'name');
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
			collectionArray.push(repeatingString + 'properties');
			collectionArray.push(repeatingString + 'weight');
			collectionArray.push(repeatingString + 'ammo');
			collectionArray.push(repeatingString + 'ammo_weight');
			collectionArray.push(repeatingString + 'parsed');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				var attackName = v[repeatingString + 'name'];
				if (isUndefined(attackName)) {
					return;
				}

				if (isUndefined(v[repeatingString + 'parsed']) || v[repeatingString + 'parsed'].indexOf('modifiers') === -1) {
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
				if (isUndefined(v[repeatingString + 'parsed']) || v[repeatingString + 'parsed'].indexOf('attackProperties') === -1) {
					var attackProperties = v[repeatingString + 'properties'];
					if (exists(attackProperties)) {
						if (attackProperties.indexOf('Reach') !== -1) {
							finalSetAttrs[repeatingString + 'reach'] = '10 ft';
						} else if (v[repeatingString + 'type'] === 'Melee Weapon') {
							finalSetAttrs[repeatingString + 'reach'] = '5 ft';
						}
						if (attackProperties.indexOf('Finesse') !== -1) {
							finalSetAttrs[repeatingString + 'attack_ability'] = '@{finesse_mod}';
							finalSetAttrs[repeatingString + 'damage_ability'] = '@{finesse_mod}';
						}
						if (attackProperties.indexOf('Thrown') !== -1) {
							var ammoWeight = parseFloat(v[repeatingString + 'weight']);
							finalSetAttrs[repeatingString + 'ammo'] = 1;
							finalSetAttrs[repeatingString + 'ammo_weight'] = ammoWeight;
							finalSetAttrs[repeatingString + 'weight'] = 0;
						}
						if (!finalSetAttrs[repeatingString + 'parsed']) {
							finalSetAttrs[repeatingString + 'parsed'] = '';
						}
						finalSetAttrs[repeatingString + 'parsed'] += ' attackProperties';
					}
				}

				var attackOptions = {
					defaultAbility: 'strength_mod',
					globalAttackBonus: v.global_attack_bonus,
					globalAttackBonusLabel: 'global attack bonus',
					globalMeleeAttackBonus: v.global_melee_attack_bonus,
					globalRangedAttackBonus: v.global_ranged_attack_bonus,
					type: 'attack'
				};
				updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

				updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

				var damageOptions = {
					defaultDamageAbility: 'strength_mod',
					globalDamageBonus: v.global_damage_bonus,
					globalMeleeDamageBonus: v.global_melee_damage_bonus,
					globalRangedDamageBonus: v.global_ranged_damage_bonus,
					type: 'attack'
				};
				updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
			}
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}

function updateSpell (rowId) {
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
			collectionArray.push(repeatingString + 'name');
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
			collectionArray.push(repeatingString + 'components_verbal');
			collectionArray.push(repeatingString + 'components_somatic');
			collectionArray.push(repeatingString + 'components_material');
			collectionArray.push(repeatingString + 'duration');
			collectionArray.push(repeatingString + 'concentration');
			collectionArray.push(repeatingString + 'concentration_text');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				var spellLevel = getIntValue(v[repeatingString + 'spell_level']);
				if (spellLevel === 0) {
					finalSetAttrs[repeatingString + 'spell_level'] = spellLevel;
				}
				if (spellLevel === 0) {
					finalSetAttrs[repeatingString + 'is_prepared'] = 'on';
				}
				finalSetAttrs[repeatingString + 'friendly_level'] = ordinalSpellLevel(spellLevel);

				var concentration = v[repeatingString + 'concentration'];
				if (concentration === 'Yes') {
					finalSetAttrs[repeatingString + 'concentration_text'] = 'Concentration, ';
				} else {
					finalSetAttrs[repeatingString + 'concentration_text'] = '';
				}
				if (v.duration) {
					finalSetAttrs.duration = lowercaseWords(v.duration);
				}

				var spellComponents = v[repeatingString + 'components'];
				finalSetAttrs[repeatingString + 'components_verbal'] = 0;
				finalSetAttrs[repeatingString + 'components_somatic'] = 0;
				finalSetAttrs[repeatingString + 'components_material'] = 0;
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
					globalAttackBonus: v.global_spell_attack_bonus,
					type: 'spell'
				};
				updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

				var savingThrowOptions = {
					bonusDC: v.global_spell_dc_bonus
				};
				updateSavingThrowToggle(v, finalSetAttrs, repeatingString, savingThrowOptions);

				var damageOptions = {
					globalDamageBonus: v.global_spell_damage_bonus,
					type: 'spell'
				};
				updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);

				updateHealToggle(v, finalSetAttrs, repeatingString);

				updateHigherLevelToggle(v, finalSetAttrs, repeatingString);
			}
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}

on('change:repeating_spell', function (eventInfo) {
	var changedField = getRepeatingField('repeating_spell', eventInfo);
	if (changedField !== 'toggle_details' && changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'heal_formula' && changedField !== 'higher_level_query' && changedField !== 'parsed') {
		console.log('spell changedField', changedField);
		var rowId = getRowId('repeating_spell', eventInfo);
		updateSpell(rowId);
	}
});
on('change:global_spell_attack_bonus change:global_spell_damage_bonus change:global_spell_dc_bonus change:global_spell_heal_bonus', function () {
	updateSpell();
});

function updateD20Mod () {
	var collectionArray = ['halfling_luck'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.halfling_luck === 'on') {
			finalSetAttrs.d20_mod = 'ro<1[halfling luck]';
		} else {
			finalSetAttrs.d20_mod = '';
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}

on('change:halfling_luck', function () {
	updateD20Mod();
});

function updateAbilityChecksMacro () {
	var repeatingItem = 'repeating_skill';
	var collectionArray = ['ability_checks_query_var', 'ability_checks_macro_var'];
	var finalSetAttrs = {};

	finalSetAttrs.ability_checks_query_var = '?{Ability Check';
	finalSetAttrs.ability_checks_macro_var = '';

	for (var i = 0; i < ABILITIES.length; i++) {
		finalSetAttrs.ability_checks_query_var += '|' + ABILITIES[i].capitalize() + ', {{title=' + ABILITIES[i].capitalize() + '&#125;&#125; {{roll1=[[d20@{d20_mod} + @{' + ABILITIES[i] + '_check_mod}]]&#125;&#125; {{roll2=[[d20@{d20_mod} + @{' + ABILITIES[i] + '_check_mod}]]&#125;&#125;';
		finalSetAttrs.ability_checks_macro_var += '[' + ABILITIES[i].capitalize() + '](~' + ABILITIES[i] + '_check)';
		if (i < ABILITIES.length - 1) {
			finalSetAttrs.ability_checks_macro_var += ', ';
		}
	}

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'ability');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';
				finalSetAttrs.ability_checks_query_var += '|' + v[repeatingString + 'name'] + ', {{title=' + v[repeatingString + 'name'] + ' (' + getAbilityShortName(v[repeatingString + 'ability']).capitalize() + ')&#125;&#125; {{roll1=[[d20@{d20_mod} + @{' + repeatingString + 'formula' + '}]]&#125;&#125; {{roll2=[[d20@{d20_mod} + @{' + repeatingString + 'formula' + '}]]&#125;&#125;';
				finalSetAttrs.ability_checks_macro_var += ', ';
				finalSetAttrs.ability_checks_macro_var += '[' + v[repeatingString + 'name'] + '](~repeating_skill_' + ids[j] + '_skill)';
			}
			finalSetAttrs.ability_checks_query_var += '}';
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}

function updateSkill (rowId) {
	var repeatingItem = 'repeating_skill';
	var collectionArray = ['jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'pb', 'exp', 'global_check_bonus'];
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

				var skillName = v[repeatingString + 'name'];
				if (isUndefined(skillName)) {
					return;
				}

				var ability = getAbilityModName(v[repeatingString + 'ability']);
				var abilityName = getAbilityName(v[repeatingString + 'ability']);
				finalSetAttrs[repeatingString + 'ability_short_name'] = getAbilityShortName(ability, true);

				var total = 0;
				var totalFormula = '';
				var proficiency = v[repeatingString + 'proficiency'];
				if (!proficiency || proficiency === 'unproficient') {
					if ((abilityName === 'strength' || abilityName === 'dexterity' || abilityName === 'constitution') && v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
						var remarkableAthlete = getIntValue(v.remarkable_athlete);
						total += remarkableAthlete;
						totalFormula += remarkableAthlete + '[remarkable athlete]';
					} else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
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

				var globalCheckBonus = v.global_check_bonus;
				if (exists(globalCheckBonus)) {
					if (!isNaN(globalCheckBonus)) {
						total += getIntValue(globalCheckBonus);
					}
					totalFormula += ADD + globalCheckBonus + '[global check bonus]';
				}

				var totalWithSign = total;
				if (total >= 0) {
					totalWithSign = '+' + total;
				}

				finalSetAttrs[repeatingString + 'total'] = total;
				finalSetAttrs[repeatingString + 'total_with_sign'] = totalWithSign;
				finalSetAttrs[repeatingString + 'formula'] = totalFormula;
			}
			setFinalAttrs(v, finalSetAttrs);
			updateAbilityChecksMacro();
		});
	});
}

on('change:repeating_skill', function (eventInfo) {
	var changedField = getRepeatingField('repeating_skill', eventInfo);
	if (changedField !== 'ability_short_name' && changedField !== 'total' && changedField !== 'total_with_sign' && changedField !== 'formula') {
		var rowId = getRowId('repeating_skill', eventInfo);
		updateSkill(rowId);
	}
});
on('remove:repeating_skill', function () {
	updateAbilityChecksMacro();
});
on('change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_check_bonus change:strength_check_bonus change:dexterity_check_bonus change:constitution_check_bonus change:intelligence_check_bonus change:wisdom_check_bonus change:charisma_check_bonus', function () {
	updateSkill();
});

function updateSkillsFromSRD () {
	var repeatingItem = 'repeating_skill';
	var collectionArray = ['skills_srd', 'level', 'challenge', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod'];
	var finalSetAttrs = {};

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			var repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'ability');
		}
		getAttrs(collectionArray, function (v) {
			var skillsFromSRD = v.skills_srd;
			var skillsObj = {};
      var pb = getPB(v.level, v.challenge);
			var expertise = pb * 2;
      var skillName;
      var repeatingString;

			if (!isUndefined(skillsFromSRD)) {
				for (var j = 0; j < ids.length; j++) {
					repeatingString = repeatingItem + '_' + ids[j] + '_';
					skillName = v[repeatingString + 'name'];
					skillsObj[skillName] = ids[j];
				}

				var re = /(\w+)\s?((?:\+|\-)\d+)/gi;
				while (match = re.exec(skillsFromSRD)) {
					if (match && match[1] && match[2]) {
						skillName = match[1];
						if (skillsObj[skillName]) {
							var skillId = skillsObj[skillName];
              repeatingString = repeatingItem + '_' + skillId + '_';

              var skillAbility = v[repeatingString + 'ability'];
              var abilityValue = getAbilityValue(v, skillAbility);
              var skillBonus = getIntValue(match[2]) - abilityValue;

							if (skillBonus >= expertise) {
								finalSetAttrs[repeatingString + 'proficiency'] = 'expertise';
								if (skillBonus > expertise) {
									finalSetAttrs[repeatingString + 'bonus'] = skillBonus - expertise;
								}
							} else if (skillBonus >= pb) {
								finalSetAttrs[repeatingString + 'proficiency'] = 'proficient';
								if (skillBonus > pb) {
									finalSetAttrs[repeatingString + 'bonus'] = skillBonus - pb;
								}
							}
						} else {
							console.log(skillName + ' does not exist in the list of skills');
						}
					}
				}
			}
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}
on('change:skills_srd', function () {
	updateSkillsFromSRD();
});

function updateSavingThrows () {
	updateSavingThrow('strength');
	updateSavingThrow('dexterity');
	updateSavingThrow('constitution');
	updateSavingThrow('intelligence');
	updateSavingThrow('wisdom');
	updateSavingThrow('charisma');
}

function updateSavingThrow (ability) {
	var collectionArray = ['pb', ability + '_mod', ability + '_save_prof', ability + '_save_bonus', 'global_saving_throw_bonus'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var proficiency = v[ability + '_save_prof'];
		var abilityMod = getIntValue(v[ability + '_mod']);
		var total = abilityMod;
		var totalFormula = abilityMod + '[' + getAbilityShortName(ability) + ']';

		if (proficiency === '@{PB}') {
			var pb = getIntValue(v.pb);
			total += pb;
			totalFormula += ADD + pb + '[proficient]';
		}

		var abilitySavingThrowBonus = getIntValue(v[ability + '_save_bonus']);
		if (exists(abilitySavingThrowBonus)) {
			total += abilitySavingThrowBonus;
			totalFormula += ADD + abilitySavingThrowBonus + '[' + getAbilityShortName(ability) + 'saving throw bonus]';
		}

		var globalSavingThrowBonus = v.global_saving_throw_bonus;
		if (!isUndefined(globalSavingThrowBonus)) {
			if (!isNaN(globalSavingThrowBonus)) {
				total += getIntValue(globalSavingThrowBonus);
			}
			totalFormula += ADD + globalSavingThrowBonus + '[global saving throw bonus]';
		}

		var savingThrowWithSign = total;
		if (total >= 0) {
			savingThrowWithSign = '+' + total;
		}

		finalSetAttrs[ability + '_saving_throw_mod'] = totalFormula;
		finalSetAttrs[ability + '_saving_throw_mod_with_sign'] = savingThrowWithSign;
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:pb change:strength_mod change:strength_save_prof change:strength_save_bonus change:global_saving_throw_bonus', function () {
	updateSavingThrow('strength');
});
on('change:pb change:dexterity_mod change:dexterity_save_prof change:dexterity_save_bonus change:global_saving_throw_bonus', function () {
	updateSavingThrow('dexterity');
});
on('change:pb change:constitution_mod change:constitution_save_prof change:constitution_save_bonus change:global_saving_throw_bonus', function () {
	updateSavingThrow('constitution');
});
on('change:pb change:intelligence_mod change:intelligence_save_prof change:intelligence_save_bonus change:global_saving_throw_bonus', function () {
	updateSavingThrow('intelligence');
});
on('change:pb change:wisdom_mod change:wisdom_save_prof change:wisdom_save_bonus change:global_saving_throw_bonus', function () {
	updateSavingThrow('wisdom');
});
on('change:pb change:charisma_mod change:charisma_save_prof change:charisma_save_bonus change:global_saving_throw_bonus', function () {
	updateSavingThrow('charisma');
});

function updateSavingThrowsFromSRD () {
	var collectionArray = ['saving_throws_srd'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var savingThrowsFromSRD = v.saving_throws_srd;
		var pbVar = '@{PB}';

		if (savingThrowsFromSRD.indexOf('Str') !== -1) {
			finalSetAttrs.strength_save_prof = pbVar;
		}
		if (savingThrowsFromSRD.indexOf('Dex') !== -1) {
			finalSetAttrs.dexterity_save_prof = pbVar;
		}
		if (savingThrowsFromSRD.indexOf('Con') !== -1) {
			finalSetAttrs.constitution_save_prof = pbVar;
		}
		if (savingThrowsFromSRD.indexOf('Int') !== -1) {
			finalSetAttrs.intelligence_save_prof = pbVar;
		}
		if (savingThrowsFromSRD.indexOf('Wis') !== -1) {
			finalSetAttrs.wisdom_save_prof = pbVar;
		}
		if (savingThrowsFromSRD.indexOf('Cha') !== -1) {
			finalSetAttrs.charisma_save_prof = pbVar;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:saving_throws_srd', function () {
	updateSavingThrowsFromSRD();
});

function updateSpellsFromSRD () {
  var collectionArray = ['spells_srd'];
  var finalSetAttrs = {};

  getAttrs(collectionArray, function (v) {
    var spells = v.spells_srd.split(', ');

    for (var i = 0; i < spells.length; i++) {
      var newRowId = generateRowID();
      var repeatingString = 'repeating_spell_' + newRowId + '_';
      finalSetAttrs[repeatingString + 'name'] = spells[i];
    }
    setFinalAttrs(v, finalSetAttrs);
  });
}
on('change:spells_srd', function () {
  updateSpellsFromSRD();
});

function updateAttachers () {
	var repeatingItem = 'repeating_attacher';
	var collectionArray = ['attacher_initiative', 'attacher_death_saving_throw', 'attacher_hit_dice', 'attacher_attack', 'attacher_spell', 'attacher_skill'];
	var finalSetAttrs = {};
	var itemsToPush = ['initiative', 'death_saving_throw', 'hit_dice', 'attack', 'spell', 'skill'];

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
						if (exists(attacherName) && exists(freeText)) {
							finalSetAttrs['attacher_' + itemsToPush[x]] += '{{' + attacherName + '=' + freeText + '}}' + ' ';
						}
						var freeForm = v[repeatingString + 'freeform'];
						if (exists(freeForm)) {
							finalSetAttrs['attacher_' + itemsToPush[x]] += freeForm + ' ';
						}
					}
				}
			}
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}

on('change:repeating_attacher remove:repeating_attacher', function () {
	updateAttachers();
});

function updateNPCChallenge () {
	var collectionArray = ['challenge', 'xp'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var challenge = v.challenge;
		var xpPerChallenge = {
			0: 0,
			'1/8': 25,
			'1/4': 50,
			'1/2': 100,
			1: 200,
			2: 450,
			3: 700,
			4: 1100,
			5: 1800,
			6: 2300,
			7: 2900,
			8: 3900,
			9: 5000,
			10: 5900,
			11: 7200,
			12: 8400,
			13: 10000,
			14: 11500,
			15: 13000,
			16: 15000,
			17: 18000,
			18: 20000,
			19: 22000,
			20: 25000,
			21: 33000,
			22: 41000,
			23: 50000,
			24: 62000,
			25: 75000,
			26: 90000,
			27: 105000,
			28: 120000,
			29: 135000,
			30: 155000
		};

		finalSetAttrs.xp = xpPerChallenge[challenge];
		finalSetAttrs.xp_readable = numberWithCommas(finalSetAttrs.xp);

		finalSetAttrs.level = challenge;
		if (finalSetAttrs.level < 1) {
			finalSetAttrs.level = 1;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}

on('change:challenge', function () {
	updateNPCChallenge();
});

function updateNPCHPFromSRD () {
  var collectionArray = ['hp_srd', 'constitution', 'constitution_mod', 'constitution_bonus', 'global_ability_bonus'];
  var finalSetAttrs = {};

  getAttrs(collectionArray, function (v) {
    if (exists(v.hp_srd)) {
      var match = v.hp_srd.match(/\((\d+)d(\d+)(?:\s?(?:\+|\-)\s?(\d+))?\)/i);
      if (!match || !match[1] || !match[2]) {
        console.log('Character doesn\'t have valid HP/HD format');
      } else {
        var hdNum = getIntValue(match[1]);

        var conMod = getIntValue(v.constitution_mod);
        if (!conMod) {
          var conScore = getIntValue(v.constitution);
          var conBonus = getIntValue(v.constitution_bonus);
          var globalAbilityBonus = getIntValue(v.global_ability_bonus);

          conMod = getAbilityMod((conScore + conBonus + globalAbilityBonus));
        }

        finalSetAttrs.hit_dice = hdNum;
        finalSetAttrs.hit_die = 'd' + getIntValue(match[2]);

        var hpExpectedBonus = hdNum * conMod;
        var hpBonus = getIntValue(match[3]);
        if (hpBonus !== hpExpectedBonus) {
          finalSetAttrs.hp_extra = hpBonus - hpExpectedBonus;
        }
      }
    }
    setFinalAttrs(v, finalSetAttrs);
  });
}
on('change:hp_srd', function () {
  updateNPCHPFromSRD();
});

function updateNPCHP () {
	var collectionArray = ['hit_dice', 'hit_die', 'hp_extra', 'constitution_mod'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var hdNum = getIntValue(v.hit_dice);
		var hdSize = getIntValue(v.hit_die.replace('d', ''));
		var hdAverage = (hdSize / 2) + 0.5;
		var hpFormula = hdNum + 'd' + hdSize;
		var conMod = getIntValue(v.constitution_mod);
		var totalHP = Math.floor(hdNum * hdAverage);
		var amount;

		if (conMod !== 0) {
			var bonusHP = hdNum * conMod;
			totalHP += bonusHP;
			hpFormula += addOrSubtract(hpFormula, bonusHP);
		}

		if (exists(v.hp_extra)) {
			var regex = (/(?:(\+|\-)\s)?(\d+)(?:d(\d+))?/gi);
			var splitFormula;

			while (splitFormula = regex.exec(v.hp_extra)) {
				if (!splitFormula || !splitFormula[2]) {
					console.log('Character doesn\'t have valid hp formula');
				} else {
					amount = 0;

					if (!splitFormula[3]) {
						amount = getIntValue(splitFormula[2]);
					} else {
						var extraHdNum = getIntValue(splitFormula[2]);
						var extraHdSize = getIntValue(splitFormula[3]);
						var extraHdAverage = (extraHdSize / 2) + 0.5;
						amount = Math.floor(extraHdNum * extraHdAverage);
					}

					if (!splitFormula[1] || splitFormula[1] === '+') {
						totalHP += amount;
            hpFormula += ADD + amount;
					} else if (splitFormula[1] === '-') {
						totalHP -= amount;
            hpFormula += SUBTRACT + amount;
					}
				}
				v.hp_extra.replace(splitFormula[0], '');
			}
		}

		if (totalHP) {
			finalSetAttrs.hp = totalHP;
			finalSetAttrs.hp_max = totalHP;
			finalSetAttrs.hp_formula = hpFormula;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:hit_dice change:hit_die change:hp_extra change:constitution_mod', function () {
	updateNPCHP();
});

function updateNPCAC () {
	var collectionArray = ['ac_srd', 'ac', 'ac_note', 'dexterity_mod'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (exists(v.ac_srd)) {
			var match = v.ac_srd.match(/(\d+)\s?(.*)/);
			if (match && match[1]) {
				finalSetAttrs.ac = match[1];
			}
			if (match && match[2]) {
				finalSetAttrs.ac_note = match[2].replace(/\(|\)/g, '');
			}
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}

on('change:ac_srd', function () {
	updateNPCAC();
});

function setDefaultAbility (v, finalSetAttrs) {
	var abilityScores = [getIntValue(v.intelligence), getIntValue(v.wisdom), getIntValue(v.charisma)];
	var highestAbilityScore = Math.max.apply(Math, abilityScores);
	var highestAbilityName = 'intelligence';

	if (highestAbilityScore === abilityScores[1]) {
		highestAbilityName = 'wisdom';
	} else if (highestAbilityScore === abilityScores[2]) {
		highestAbilityName = 'charisma';
	}

	finalSetAttrs.default_ability = '@{' + highestAbilityName + '_mod}';
}

function updateNPCContent () {
	var collectionArray = ['content_srd'];
	var finalSetAttrs = {};

	for (var i = 0; i < ABILITIES.length; i++) {
		collectionArray.push(ABILITIES[i]);
	}

	getAttrs(collectionArray, function (v) {
		var content = v.content_srd;
		var legendaryActions;
		var reactions;
		var actions;
		var traits;
		var re = /\@(.*)\@:\s([^@]+)/gi;
		var match;
		var newRowId;
		var repeatingString;

		setDefaultAbility(v, finalSetAttrs);

		if (exists(content)) {
			if (content.indexOf('Legendary Actions') !== -1) {
				var legendaryActionsSplit = content.split(/Legendary Actions\n/);
				legendaryActions = legendaryActionsSplit[1];
				content = legendaryActionsSplit[0];
			}
			if (exists(legendaryActions)) {
				var legendaryActionAmount = 3;
				var legendaryActionsMatch = legendaryActions.match(/Can take (\d+) Legendary Actions/gi);

				if (legendaryActionsMatch && legendaryActionsMatch[1]) {
					legendaryActionAmount = legendaryActionAmount[1];
				}

				finalSetAttrs.legendary_action_amount = legendaryActionAmount;

				while (match = re.exec(legendaryActions.replace(/\*\*/g, '@'))) {
					if (match && match[1] && match[2]) {
						newRowId = generateRowID();
						repeatingString = 'repeating_legendaryaction_' + newRowId + '_';
						finalSetAttrs[repeatingString + 'name'] = match[1];
						finalSetAttrs[repeatingString + 'freetext'] = match[2].trim();
					} else {
						console.log('Character doesn\'t have a valid legendary action format');
					}
				}
			}
			if (content.indexOf('Reactions') !== -1) {
				var reactionsSplit = content.split(/Reactions\n/);
				reactions = reactionsSplit[1];
				content = reactionsSplit[0];
			}
			if (exists(reactions)) {
				while (match = re.exec(reactions.replace(/\*\*/g, '@'))) {
					if (match && match[1] && match[2]) {
						newRowId = generateRowID();
						repeatingString = 'repeating_reaction_' + newRowId + '_';
						finalSetAttrs[repeatingString + 'name'] = match[1];
						finalSetAttrs[repeatingString + 'freetext'] = match[2].trim();
					} else {
						console.log('Character doesn\'t have a valid reaction format');
					}
				}
			}
			if (content.indexOf('Actions') !== -1) {
				var actionsSplit = content.split(/Actions\n/);
				actions = actionsSplit[1];
				content = actionsSplit[0];
			}
			if (exists(actions)) {
				while (match = re.exec(actions.replace(/\*\*/g, '@'))) {
					if (match && match[1] && match[2]) {
						newRowId = generateRowID();
						repeatingString = 'repeating_action_' + newRowId + '_';
						finalSetAttrs[repeatingString + 'name'] = match[1];
						finalSetAttrs[repeatingString + 'freetext'] = match[2].trim();
					} else {
						console.log('Character doesn\'t have a valid action format');
					}
				}
			}

			if (content.indexOf('Traits') !== -1) {
				var traitsSplit = content.split(/Traits\n/);
				traits = traitsSplit[1];
				content = traitsSplit[0];
			}
			if (exists(traits)) {
				while (match = re.exec(traits.replace(/\*\*/g, '@'))) {
					if (match && match[1] && match[2]) {
						newRowId = generateRowID();
						repeatingString = 'repeating_trait_' + newRowId + '_';
						finalSetAttrs[repeatingString + 'name'] = match[1];
						finalSetAttrs[repeatingString + 'freetext'] = match[2].trim();
					} else {
						console.log('Character doesn\'t have a valid trait format');
					}
				}
			}
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:content_srd', function () {
	updateNPCContent();
});

function updateAction (type, rowId) {
	var repeatingItem = 'repeating_' + type;
	var collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
	var finalSetAttrs = {};

	var rechargeRegex = /\s*?\((?:Recharge\s*?(\d+\-\d+|\d+)|Recharges\safter\sa\s(.*))\)/gi;
	var rechargeDayRegex = /\s*?\((\d+\/Day)\)/gi;

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
			collectionArray.push(repeatingString + 'name');
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
			collectionArray.push(repeatingString + 'heal_toggle');
			collectionArray.push(repeatingString + 'heal');
			collectionArray.push(repeatingString + 'heal_ability');
			collectionArray.push(repeatingString + 'heal_bonus');
			collectionArray.push(repeatingString + 'parsed');
			collectionArray.push(repeatingString + 'recharge');
			collectionArray.push(repeatingString + 'recharge_display');
		}

		getAttrs(collectionArray, function (v) {
			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				var actionName = v[repeatingString + 'name'];
				if (isUndefined(actionName)) {
					return;
				} else {
					var rechargeResult = rechargeRegex.exec(actionName);
					if (rechargeResult) {
						finalSetAttrs[repeatingString + 'recharge'] = rechargeResult[1] || rechargeResult[2];
						finalSetAttrs[repeatingString + 'name'] = actionName.replace(rechargeRegex, '');
					}
					var rechargeDayResult = rechargeDayRegex.exec(actionName);
					if (rechargeDayResult) {
						finalSetAttrs[repeatingString + 'recharge'] = rechargeDayResult[1] || rechargeDayResult[2];
						finalSetAttrs[repeatingString + 'name'] = actionName.replace(rechargeDayRegex, '');
					}
				}
				var recharge = fromVOrFinalSetAttrs(v, finalSetAttrs, repeatingString + 'recharge');
				if (exists(recharge)) {
					if (recharge.indexOf('/Day') !== -1 || recharge.indexOf('/day') !== -1) {
						finalSetAttrs[repeatingString + 'recharge_display'] = ' (' + recharge + ')';
					} else {
						finalSetAttrs[repeatingString + 'recharge_display'] = ' (Recharge ' + recharge + ')';
					}
				} else if (exists(v[repeatingString + 'recharge_display'])) {
					finalSetAttrs[repeatingString + 'recharge_display'] = '';
				}

				var attackOptions = {};
				if (type !== 'trait') {
					attackOptions = {
						defaultAbility: 'strength_mod',
						globalAttackBonus: v.global_attack_bonus,
						globalAttackBonusLabel: 'global attack bonus',
						globalMeleeAttackBonus: v.global_melee_attack_bonus,
						globalRangedAttackBonus: v.global_ranged_attack_bonus,
						type: 'attack'
					};
				}
				updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

				updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

				var damageOptions = {};
				if (type !== 'trait') {
					damageOptions = {
						defaultDamageAbility: 'strength_mod',
						globalDamageBonus: v.global_damage_bonus,
						globalMeleeDamageBonus: v.global_melee_damage_bonus,
						globalRangedDamageBonus: v.global_ranged_damage_bonus,
						type: 'attack'
					};
				}
				updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);

				updateHealToggle(v, finalSetAttrs, repeatingString);
			}
			setFinalAttrs(v, finalSetAttrs);
		});
	});
}
on('change:repeating_trait', function (eventInfo) {
	var changedField = getRepeatingField('repeating_trait', eventInfo);
	if (changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'parsed' && changedField !== 'recharge_display') {
		console.log('trait changedField', changedField);
		var rowId = getRowId('repeating_trait', eventInfo);
		updateAction('trait', rowId);
	}
});
on('change:repeating_action', function (eventInfo) {
	var changedField = getRepeatingField('repeating_action', eventInfo);
	if (changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'parsed' && changedField !== 'recharge_display') {
		console.log('action changedField', changedField);
		var rowId = getRowId('repeating_action', eventInfo);
		updateAction('action', rowId);
	}
});
on('change:repeating_reaction', function (eventInfo) {
	var changedField = getRepeatingField('repeating_reaction', eventInfo);
	if (changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'parsed' && changedField !== 'recharge_display') {
		console.log('reaction changedField', changedField);
		var rowId = getRowId('repeating_reaction', eventInfo);
		updateAction('reaction', rowId);
	}
});
on('change:repeating_legendaryaction', function (eventInfo) {
	var changedField = getRepeatingField('repeating_legendaryaction', eventInfo);
	if (changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'parsed' && changedField !== 'recharge_display') {
		console.log('legendaryaction changedField', changedField);
		var rowId = getRowId('repeating_legendaryaction', eventInfo);
		updateAction('legendaryaction', rowId);
	}
});
on('change:repeating_lairaction', function (eventInfo) {
	var changedField = getRepeatingField('repeating_lairaction', eventInfo);
	if (changedField !== 'to_hit' && changedField !== 'attack_formula' && changedField !== 'damage_formula' && changedField !== 'second_damage_formula' && changedField !== 'damage_string' && changedField !== 'saving_throw_dc' && changedField !== 'parsed' && changedField !== 'recharge_display') {
		console.log('lairaction changedField', changedField);
		var rowId = getRowId('repeating_lairaction', eventInfo);
		updateAction('lairaction', rowId);
	}
});

function parseDamage (finalSetAttrs, repeatingString, freetext, regex, name, spellMods, meleeMods, spellAttack, rangedAttack, dexMod) {
	var damageParseRegex = /(\d+d?\d+)(?:\s?(?:\+|\-)\s?(\d+))?/gi;
	var damage = regex.exec(freetext);
	var damageBonus;
	if (damage) {
		/*
		 1 is damage without dice. Example '1'
		 2 is damage with dice. Example '2d6+4'
		 3 is damage type. Example 'slashing' or 'lightning or thunder'
		 */
		if (damage[1]) {
			damageBonus = damage[1];
		}
		if (damage[2]) {
			var damageParsed = damageParseRegex.exec(damage[2]);
			if (damageParsed) {
				if (damageParsed[1]) {
					finalSetAttrs[repeatingString + name] = damageParsed[1];
				}
				if (damageParsed[2]) {
					damageBonus = damageParsed[2];
				}
			}
		}
		damageBonus = getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, name + '_ability', damageBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
		if (damage[3]) {
			finalSetAttrs[repeatingString + name + '_type'] = damage[3];
		}
		if (damageBonus) {
			finalSetAttrs[repeatingString + name + '_bonus'] = damageBonus;
		}
		freetext = freetext.replace(regex, '');
		finalSetAttrs[repeatingString + name + '_toggle'] = '@{' + name + '_toggle_var}';
	} else {
		finalSetAttrs[repeatingString + name + '_toggle'] = 0;
	}
	return freetext;
}

function parseAction (rowId, type) {
	var repeatingItem = 'repeating_' + type;
	var collectionArray = ['level', 'challenge', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
	var finalSetAttrs = {};

	var damageType = /((?:[\w]+|[\w]+\s(?:or|and)\s[\w]+)(?:\s*?\([\w\s]+\))?)\s*?damage\s?(\([\w\'\s]+\))?/;
	var damageSyntax = /(?:(\d+)|.*?\(([\dd\s\+\-]*)\).*?)\s*?/;
	var altDamageSyntax = /(?:\,\s*?or\s*?)/;
	var plus = /\s*?plus\s*?/;
	var savingThrow = /(?:DC)\s*?(\d+)\s*?([a-zA-Z]*)\s*?(?:saving throw)/;
	var saveSuccess = /or\s(.*)?\son a successful one./;
	var damageRegex = new RegExp(damageSyntax.source + damageType.source, 'i');
	var damagePlusRegex = new RegExp(plus.source + damageSyntax.source + damageType.source, 'i');
	var altDamageRegex = new RegExp(altDamageSyntax.source + damageSyntax.source + damageType.source, 'i');
	var savingThrowRegex = new RegExp(savingThrow.source, 'i');
	var saveSuccessRegex = new RegExp(saveSuccess.source, 'i');

	var typeRegex = /(melee|ranged|melee or ranged)\s*(spell|weapon)\s*/gi;
	var toHitRegex = /:\s?\+\s?(\d+)\s*(?:to hit)/gi;
	var reachRegex = /(?:reach)\s?(\d+)\s?(?:ft)/gi;
	var rangeRegex = /(?:range)\s?(\d+)\/(\d+)\s?(ft)/gi;
	var spellcastingRegex = /(\d+)\w+\slevel\s\((\d+)\s?slot(?:s)?\)/gi;
	var spellcastingAbilityRegex = /spellcasting ability is (\w+)/i;

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
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'freetext');
		}

		getAttrs(collectionArray, function (v) {
			var pb = getPB(v.level, v.challenge);
			var strMod = getIntValue(v.strength_mod);
			var dexMod = getIntValue(v.dexterity_mod);
			var conMod = getIntValue(v.constitution_mod);
			var intMod = getIntValue(v.intelligence_mod);
			var wisMod = getIntValue(v.wisdom_mod);
			var chaMod = getIntValue(v.charisma_mod);
			var meleeMods = [strMod, dexMod];
			var spellMods = [intMod, wisMod, chaMod];
			var abilityMods = [strMod, dexMod, conMod, intMod, wisMod, chaMod];

			for (var j = 0; j < ids.length; j++) {
				var repeatingString = repeatingItem + '_' + ids[j] + '_';

				var rangedAttack = false;
				var spellAttack = false;

				var name = v[repeatingString + 'name'];
				var freetext = v[repeatingString + 'freetext'];

				if (name === 'Spellcasting') {
					var spellcastingSearch = spellcastingAbilityRegex.exec(freetext);
					if (spellcastingSearch && spellcastingSearch[1]) {
						var spellcastingAbility = spellcastingSearch[1].toLowerCase();
						finalSetAttrs.default_ability = '@{' + spellcastingAbility + '_mod}';
					}
					while (match = spellcastingRegex.exec(freetext)) {
						if (match && match[1] && match[2]) {
							finalSetAttrs['spell_slots_l' + match[1] + '_bonus'] = match[2];
						}
					}
				}

				var actionType = typeRegex.exec(freetext);
				if (actionType) {
					if (actionType[1]) {
						actionType[1] = type[1].toLowerCase();
						if (actionType[1] === 'melee') {
							finalSetAttrs[repeatingString + 'type'] = 'Melee Weapon';
						}
						if (actionType[1] === 'ranged') {
							finalSetAttrs[repeatingString + 'type'] = 'Ranged Weapon';
							rangedAttack = true;
						}
						if (actionType[1] === 'melee or ranged') {
							finalSetAttrs[repeatingString + 'type'] = 'Other';
						}
					}
					if (actionType[2]) {
						actionType[2] = type[2].toLowerCase();
						if (actionType[2] === 'spell') {
							spellAttack = true;
						}
					}
					freetext = freetext.replace(typeRegex, '');
				}

				var reach = reachRegex.exec(freetext);
				if (reach && reach[1]) {
					finalSetAttrs[repeatingString + 'reach'] = reach[1] + 'ft.';
					freetext = freetext.replace(reachRegex, '');
				}
				var range = rangeRegex.exec(freetext);
				if (range && range[1] && range[2]) {
					finalSetAttrs[repeatingString + 'range'] = range[1] + 'ft.';
					freetext = freetext.replace(rangeRegex, '');
				}

				var toHit = toHitRegex.exec(freetext);
				if (toHit && toHit[1]) {
					var hitBonus = toHit[1];
					hitBonus -= pb;

					hitBonus = getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'attack_ability', hitBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);

					if (hitBonus) {
						finalSetAttrs[repeatingString + 'attack_bonus'] = hitBonus;
					}
					freetext = freetext.replace(toHitRegex, '');
					finalSetAttrs[repeatingString + 'roll_toggle'] = '@{roll_toggle_var}';
				} else {
					finalSetAttrs[repeatingString + 'roll_toggle'] = '0';
				}

				var savingThrow = savingThrowRegex.exec(freetext);
				if (savingThrow) {
					if (savingThrow[1]) {
						var savingThrowTotal = savingThrow[1];
						savingThrowTotal -= 8;
						savingThrowTotal -= pb;

						savingThrowTotal = getAnyCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'saving_throw_ability', savingThrowTotal, abilityMods);

						if (savingThrowTotal) {
							finalSetAttrs[repeatingString + 'saving_throw_bonus'] = savingThrowTotal;
						}
						freetext = freetext.replace(savingThrowRegex, '');
						finalSetAttrs[repeatingString + 'saving_throw_toggle'] = '@{saving_throw_toggle_var}';
					}
					if (savingThrow[2]) {
						finalSetAttrs[repeatingString + 'saving_throw_vs_ability'] = savingThrow[2];
					}
					var halfDamage = saveSuccessRegex.exec(freetext);
					if (halfDamage && halfDamage[1]) {
						finalSetAttrs[repeatingString + 'saving_throw_success'] = halfDamage[1];
						freetext = freetext.replace(saveSuccessRegex, '');
					}
				} else {
					finalSetAttrs[repeatingString + 'saving_throw_toggle'] = '0';
				}

				freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
				freetext = parseDamage(finalSetAttrs, repeatingString, freetext, altDamageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
				freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damagePlusRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
				if (!exists(finalSetAttrs[repeatingString + 'second_damage'])) {
					freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
				}

				finalSetAttrs[repeatingString + 'extras_toggle'] = '@{extas_var}';
			}
			setFinalAttrs(v, finalSetAttrs);
			for (var x = 0; x < ids.length; x++) {
				updateAction(type, ids[x]);
			}
		});
	});
}
on('change:repeating_trait:freetext', function (eventInfo) {
	var rowId = getRowId('repeating_trait', eventInfo);
	parseAction(rowId, 'trait');
});
on('change:repeating_action:freetext', function (eventInfo) {
	var rowId = getRowId('repeating_action', eventInfo);
	parseAction(rowId, 'action');
});
on('change:repeating_reaction:freetext', function (eventInfo) {
	var rowId = getRowId('repeating_reaction', eventInfo);
	parseAction(rowId, 'reaction');
});
on('change:repeating_legendaryaction:freetext', function (eventInfo) {
	var rowId = getRowId('repeating_legendaryaction', eventInfo);
	parseAction(rowId, 'legendaryaction');
});
on('change:repeating_lairaction:freetext', function (eventInfo) {
	var rowId = getRowId('repeating_lairaction', eventInfo);
	parseAction(rowId, 'lairaction');
});

function countAction (type) {
	var repeatingItem = 'repeating_' + type;
	var finalSetAttrs = {};

	finalSetAttrs[type + 's_exist'] = 0;

	getSectionIDs(repeatingItem, function (ids) {
		if (ids.length > 0) {
			finalSetAttrs[type + 's_exist'] = 1;
		}
		setFinalAttrs({}, finalSetAttrs);
	});
}
on('change:repeating_trait remove:repeating_trait', function () {
	countAction('trait');
});
on('change:repeating_action remove:repeating_action', function () {
	countAction('action');
});
on('change:repeating_reaction remove:repeating_reaction', function () {
	countAction('reaction');
});
on('change:repeating_legendaryaction remove:repeating_legendaryaction', function () {
	countAction('legendaryaction');
});
on('change:repeating_lairaction remove:repeating_lairaction', function () {
	countAction('lairaction');
});


function switchToNPC () {
	var collectionArray = ['is_npc', 'size'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var isNPC = getIntValue(v.is_npc) === 1;

		if (isNPC && isUndefined(v.size)) {
			finalSetAttrs.size = 'Large';
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:is_npc', function () {
	switchToNPC();
});

function updateSize () {
	var collectionArray = ['size'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var creatureSize = v.size || 'Large';
		var sizeToHdSize = {
			Tiny: 4,
			Small: 6,
			Medium: 8,
			Large: 10,
			Huge: 12,
			Gargantuan: 20
		};
		finalSetAttrs.hit_die = 'd' + sizeToHdSize[creatureSize];
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:size', function () {
	updateSize();
});

function updateType () {
	var collectionArray = ['type'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.type) {
			finalSetAttrs.type = lowercaseWords(v.type);
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:type', function () {
	updateType();
});

function updateAlignment () {
	var collectionArray = ['alignment'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.alignment) {
			finalSetAttrs.alignment = lowercaseWords(v.alignment);
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:alignment', function () {
	updateAlignment();
});

function updateSenses () {
	var collectionArray = ['senses'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.senses) {
			finalSetAttrs.senses_exist = 1;
			finalSetAttrs.senses = lowercaseWords(v.senses);
		} else {
			finalSetAttrs.senses_exist = 0;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:senses', function () {
	updateSenses();
});

function updateLanguages () {
	var collectionArray = ['languages'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.languages) {
			finalSetAttrs.languages_exist = 1;
		} else {
			finalSetAttrs.languages_exist = 0;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:languages', function () {
	updateLanguages();
});

function updateSpeed () {
	var collectionArray = ['npc_speed'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.npc_speed = lowercaseWords(v.npc_speed);
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:npc_speed', function () {
	updateSpeed();
});

function updateACNote () {
	var collectionArray = ['ac_note'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		finalSetAttrs.ac_note = lowercaseWords(v.ac_note);
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:ac_note', function () {
	updateACNote();
});

function updateDamageVulnerabilities () {
	var collectionArray = ['damage_vulnerabilities'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.damage_vulnerabilities) {
			finalSetAttrs.damage_vulnerabilities_exist = 1;
			finalSetAttrs.damage_vulnerabilities = lowercaseDamageTypes(v.damage_vulnerabilities);
		} else {
			finalSetAttrs.damage_vulnerabilities_exist = 0;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:damage_vulnerabilities', function () {
	updateDamageVulnerabilities();
});
function updateDamageResistances () {
	var collectionArray = ['damage_resistances'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.damage_resistances) {
			finalSetAttrs.damage_resistances_exist = 1;
			finalSetAttrs.damage_resistances = lowercaseDamageTypes(v.damage_resistances);
		} else {
			finalSetAttrs.damage_resistances_exist = 0;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:damage_resistances', function () {
	updateDamageResistances();
});
function updateDamageImmunities () {
	var collectionArray = ['damage_immunities'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.damage_immunities) {
			finalSetAttrs.damage_immunities_exist = 1;
			finalSetAttrs.damage_immunities = lowercaseDamageTypes(v.damage_immunities);
		} else {
			finalSetAttrs.damage_immunities_exist = 0;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:damage_immunities', function () {
	updateDamageImmunities();
});
function updateConditionImmunities () {
	var collectionArray = ['condition_immunities'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		if (v.condition_immunities) {
			finalSetAttrs.condition_immunities_exist = 1;
			finalSetAttrs.condition_immunities = lowercaseDamageTypes(v.condition_immunities);
		} else {
			finalSetAttrs.condition_immunities_exist = 0;
		}
		setFinalAttrs(v, finalSetAttrs);
	});
}
on('change:condition_immunities', function () {
	updateConditionImmunities();
});

function updateLanguageSelection() {
  var collectionArray = ['lang'];
  var finalSetAttrs = {};

  getAttrs(collectionArray, function (v) {
    var language = v.lang;

    if (language) {
      if (language === 'English') {
        finalSetAttrs.lang = 'en';
      } else if (language === 'French') {
        finalSetAttrs.lang = 'fr';
      } else if (language === 'German') {
        finalSetAttrs.lang = 'de';
      } else if (language === 'Russian') {
        finalSetAttrs.lang = 'ru';
      }
    }
    setFinalAttrs(v, finalSetAttrs);
  });
}

function setSkillStorageNames () {
	var repeatingItem = 'repeating_skill';
	var collectionArray = ['lang'];
	var finalSetAttrs = {};

	var repeatingString;

	getSectionIDs(repeatingItem, function (ids) {
		for (var i = 0; i < ids.length; i++) {
			repeatingString = repeatingItem + '_' + ids[i] + '_';
			collectionArray.push(repeatingString + 'name');
			collectionArray.push(repeatingString + 'storage_name');
		}

		getAttrs(collectionArray, function (v) {
			var language = v.lang;
			if (!language || language === 'en') {
				for (var i = 0; i < ids.length; i++) {
					repeatingString = repeatingItem + '_' + ids[i] + '_';

					var name = v[repeatingString + 'name'];
					if (!isUndefined(name)) {
						var storageName = skills.names.en.getKeyByValue(name);

						if (storageName && isUndefined(v[repeatingString + 'storage_name'])) {
							finalSetAttrs[repeatingString + 'storage_name'] = storageName;
						}
					}
				}
				setFinalAttrs(v, finalSetAttrs);
			}
		});
	});
}
function generateSkills () {
  var repeatingItem = 'repeating_skill';
  var collectionArray = ['lang'];
  var finalSetAttrs = {};

  var repeatingString;

  getSectionIDs(repeatingItem, function (ids) {
    for (var i = 0; i < ids.length; i++) {
      repeatingString = repeatingItem + '_' + ids[i] + '_';
      collectionArray.push(repeatingString + 'name');
      collectionArray.push(repeatingString + 'ability');
    }

    getAttrs(collectionArray, function (v) {
      var language = v.lang;
      if (!language || !skills.names[language]) {
        language = 'en';
      }

      var x = 0;
      Object.keys(skills.abilities).forEach(function(key) {
        var name = skills.names[language][key];
        var ability = skills.abilities[key];
        var skillId;

        if (ids[x]) {
          skillId = ids[x];
        } else {
          skillId = generateRowID();
        }
        repeatingString = repeatingItem + '_' + skillId + '_';
        finalSetAttrs[repeatingString + 'name'] = name;
	      finalSetAttrs[repeatingString + 'storage_name'] = key;
        finalSetAttrs[repeatingString + 'ability'] = '@{' + ability + '_mod}';
        updateSkill(skillId);

        x++;
      });
      setFinalAttrs(v, finalSetAttrs);
    });
  });
}
on('change:lang', function () {
  generateSkills();
});
on('change:generate_skills', function () {
  generateSkills();
});

function sheetOpened () {
	var collectionArray = ['version', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
	var finalSetAttrs = {};

	getAttrs(collectionArray, function (v) {
		var version = v.version;

		if (!version) {
			updatePb();

			var setAbilities = {};
			if (isUndefined(v.strength)) {
				setAbilities.strength = 10;
				setAbilities.strength_mod = 0;
				setAbilities.strength_mod_with_sign = '+0';
			}
			if (isUndefined(v.dexterity)) {
				setAbilities.dexterity = 10;
				setAbilities.dexterity_mod = 0;
				setAbilities.dexterity_mod_with_sign = '+0';
			}
			if (isUndefined(v.constitution)) {
				setAbilities.constitution = 10;
				setAbilities.constitution_mod = 0;
				setAbilities.constitution_mod_with_sign = '+0';
			}
			if (isUndefined(v.intelligence)) {
				setAbilities.intelligence = 10;
				setAbilities.intelligence_mod = 0;
				setAbilities.intelligence_mod_with_sign = '+0';
			}
			if (isUndefined(v.wisdom)) {
				setAbilities.wisdom = 10;
				setAbilities.wisdom_mod = 0;
				setAbilities.wisdom_mod_with_sign = '+0';
			}
			if (isUndefined(v.charisma)) {
				setAbilities.charisma = 10;
				setAbilities.charisma_mod = 0;
				setAbilities.charisma_mod_with_sign = '+0';
			}
			setFinalAttrs(v, setAbilities);

			finalSetAttrs.edit_mode = 'on';

      generateSkills();
			updateSavingThrows();
			updateLevels();
			updateAbilityChecksMacro();
		}

		if (versionCompare(version, '2.0.10') < 0) {
			updateAbilityModifiers();
		}

		if (versionCompare(version, '2.0.14') < 0) {
			console.log('in if');
			updateSkill();
			updateSavingThrows();
		}
		if (versionCompare(version, '2.1.0') < 0) {
			updateNPCChallenge();
			updateDamageVulnerabilities();
			updateDamageResistances();
			updateDamageImmunities();
			updateConditionImmunities();
			updateLanguages();
			updateSenses();
		}
		if (versionCompare(version, '2.1.3') < 0) {
			updateType();
			updateAlignment();
		}
    if (versionCompare(version, '2.1.5') < 0) {
      updateLevels();
      updateNPCAC();
      updateLanguageSelection();
    }
		if (versionCompare(version, '2.1.7') < 0) {
			setSkillStorageNames();
		}
		if (versionCompare(version, '2.1.10') < 0) {
			updateSavingThrows();
			updateAttack();
		}
		if (versionCompare(version, '2.1.11') < 0) {
			updateLevels();
			updateAbilityChecksMacro();
		}
		if (versionCompare(version, '2.1.13') < 0) {
			weighEquipment();
			updateSpell();
		}

		if (!version || version !== currentVersion) {
			finalSetAttrs.version = currentVersion;
		}
		setFinalAttrs(v, finalSetAttrs);

		updateInitiative();
		updateArmor();
	});
}

on('sheet:opened', function () {
	sheetOpened();
});
