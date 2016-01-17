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
			for (var j = 0; j < ids.length; j++) {
				var toggle = v[repeatingItem+'_' + ids[j] + '_' + options.toggle];
				if(toggle === 'undefined' || toggle === 'on') {
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
						var dexMod = parseInt(v.dexterity_mod, 10);
						if(armorType === 'light') {
							attributeBonus = dexMod;
						} else if (armorType === 'medium') {
							var mediumArmorDexMod = parseInt(v.medium_armor_max_dex, 10);
							attributeBonus = Math.min(mediumArmorDexMod, dexMod);
						} else {
							attributeBonus = 0;
						}
						console.log('attributeBonus', attributeBonus);
						fieldToAdd += attributeBonus;
					}
					var itemTotal = qty * fieldToAdd;

					if(options.itemTotal) {
						finalSetAttrs[repeatingItem+'_' + ids[j] + '_' + options.itemTotal] = itemTotal;
					}

					finalSetAttrs[options.totalField] += itemTotal;
				}
			}
			setAttrs(finalSetAttrs);
		});
	});
};

on('change:repeating_inventory', function () {
	sumRepeating({
		collection: 'inventory',
		toggle: 'carried',
		qty: 'qty',
		fieldToAdd: 'weight',
		itemTotal: 'weight_total',
		totalField: 'weight_inventory'
	});
});

on('change:repeating_armor change:medium_armor_max_dex', function () {
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
	updateAC();
});

var updateAC = function () {
	getAttrs(['dexterity_mod', 'ac_armored_calc', 'ac_unarmored_ability_bonus', 'ac_unarmored_bonus', 'global_ac_bonus'], function (v) {
		var finalSetAttrs = {};
		var dexMod = parseInt(v.dexterity_mod, 10);
		var armoredAC = parseFloat(v.ac_armored_calc) || 0;
		var unarmoredACAbility = parseFloat(v.ac_unarmored_ability_bonus) || 0;
		var unarmoredACBonus = parseFloat(v.ac_unarmored_bonus) || 0;
		var acBonus = parseFloat(v.global_ac_bonus) || 0;

		finalSetAttrs.ac_unarmored_calc = 10 + dexMod + unarmoredACAbility + unarmoredACBonus;

		finalSetAttrs.pc_ac = Math.max(armoredAC, finalSetAttrs.ac_unarmored_calc) + acBonus;
		setAttrs(finalSetAttrs);
	});
}