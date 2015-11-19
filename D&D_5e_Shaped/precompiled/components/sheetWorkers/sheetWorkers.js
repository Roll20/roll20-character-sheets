var updateSpell = function () {
	console.log('updateSpell');
};

var updateAttribute = function (attribute) {
	console.log('attribute2');
	console.log(attribute);
	getAttrs([attribute + '_bonus'], function (v) {
		attributeBonus = v;

		var attributeBonus = 0;
		var attributeMod = Math.floor((attribute - 10)/2) + attributeBonus;
		var attributeModField = attribute + '_mod';

		var setAttrsObj = {};
		setAttrsObj[attributeModField] = attributeMod;
		setAttrs(setAttrsObj);
	});
};

on("change:strength", function() {
	getAttrs(["strength", "strength_bonus"], function(values) {
		console.log(values);
		setAttrs({
			strength_mod: Math.floor((values.strength - 10) / 2) + values.strength_bonus
		});
	});
});


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

