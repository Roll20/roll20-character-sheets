var updateAttribute = function (attribute) {
	updateMod(attribute);
	updateSave(attribute, mod);
	updateCheck(attribute, mod);
};

var setData = function (key, value) {
	var setAttrsObj = {};
	setAttrsObj[key] = value;
	setAttrs(setAttrsObj);
};

var getData = function (arr, cb) {
	getAttrs(arr, function (values) {
		arr.forEach(function (field) {
			if (values[field] === '-1') {
				values[field] = null;
			} else if (!isNaN(values[field])) {
				values[field] = Number(values[field]);
			} else if (values[field] === '@{PB}') {
				values[field] = 2;
				//TODO replace
			} else if (values[field] === 'floor(@{PB} / 2)') {
				values[field] = 1;
				//TODO replace
			}
		});
		cb(values);
	});
};

var sumValues = function (fieldNames, key) {
	getData(fieldNames, function (values) {
		var sum = 0;
		fieldNames.forEach(function (field) {
			console.log(field);
			console.log(values[field]);
			sum += values[field];
		});
		setData(key, sum);
	});
};

var updateMod = function (attribute) {
	getData([attribute, attribute + '_bonus'], function (values) {
		var value = Math.floor(((values[attribute] || 0) - 10) / 2) + values[attribute + '_bonus'];
		setData(attribute + '_mod', value);
	});
};
var updateSave = function (attribute) {
	sumValues([attribute + '_mod', attribute + '_save_prof', attribute + '_save_bonus', 'global_saving_bonus'], attribute + '_save_mod');
};
var updateCheck = function (attribute) {
	sumValues([attribute + '_mod', 'basic_' + attribute + '_bonus', 'global_check_bonus', 'jack_of_all_trades'], 'basic_' + attribute + '_check_mod');
};

on('change:strength change:strength_bonus change:strength_save_prof change:strength_save_bonus change:basic_strength_bonus', function () {
	updateAttribute('strength');
});
on('change:dexterity change:dexterity_bonus change:dexterity_save_prof change:dexterity_save_bonus change:basic_dexterity_bonus', function () {
	updateAttribute('dexterity');
});
on('change:constitution change:constitution_bonus change:constitution_save_prof change:constitution_save_bonus change:basic_constitution_bonus', function () {
	updateAttribute('constitution');
});
on('change:intelligence change:intelligence_bonus change:intelligence_save_prof change:intelligence_save_bonus change:basic_intelligence_bonus', function () {
	updateAttribute('intelligence');
});
on('change:wisdom change:wisdom_bonus change:wisdom_save_prof change:wisdom_save_bonus change:basic_wisdom_bonus', function () {
	updateAttribute('wisdom');
});
on('change:charisma change:charisma_bonus change:charisma_save_prof change:charisma_save_bonus change:basic_charisma_bonus', function () {
	updateAttribute('charisma');
});
on('change:global_save_bonus change:global_check_bonus change:jack_of_all_trades', function () {
	updateAttribute('strength');
	updateAttribute('dexterity');
	updateAttribute('constitution');
	updateAttribute('intelligence');
	updateAttribute('wisdom');
	updateAttribute('charisma');
});


/*
 var updateSpell = function () {
 console.log('updateSpell');
 };

 on('change:repeating_spellbookcantrip:spellconcentration', function () {
 updateSpell();
 });

 on('change:strength change:dexterity change:constitution change:intelligence change:wisdom change:charisma', function (attribute) {
 console.log('attribute');
 console.log(attribute);
 updateAttribute(attribute);
 });

 getAttrs(['damage_resistance'], function (v) {
 setAttrs({
 damage_vulnerability: v.damage_resistance,
 damage_resistance: ''
 });
 });
 */