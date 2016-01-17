on('change:cp change:sp change:ep change:gp change:pp', function () {
	getAttrs(['cp', 'copper_per_gold', 'sp', 'silver_per_gold', 'ep', 'electrum_per_gold', 'gp', 'pp', 'platinum_per_gold'], function (v) {
		var copperPieces = parseFloat(v.cp) || 0;
		var silverPieces = parseFloat(v.sp) || 0;
		var electrumPieces = parseFloat(v.ep) || 0;
		var goldPieces = parseFloat(v.gp) || 0;
		var platinumPieces = parseFloat(v.pp) || 0;
		var copperPerGold = parseFloat(v.copper_per_gold) || 100;
		var silverPerGold = parseFloat(v.copper_per_gold) || 10;
		var electrumPerGold = parseFloat(v.copper_per_gold) || 2;
		var platinumPerGold = parseFloat(v.platinum_per_gold) || 10;
		var totalGold = (copperPieces / copperPerGold) + (silverPieces / silverPerGold) + (electrumPieces / electrumPerGold) + goldPieces + (platinumPieces * platinumPerGold);
		var coinWeight = (copperPieces + silverPieces + electrumPieces + goldPieces + platinumPieces) / 50;
		setAttrs({
			total_gp: totalGold.toFixed(2),
			weight_coinage: coinWeight
		});
	});
});

on('change:repeating_inventory', function () {
	setAttrs({
		'weight_inventory': 0
	});

	getSectionIDs('repeating_inventory', function (ids) {
		var inventoryArray = [];
		var finalSetAttrs = {};

		for (var i = 0; i < ids.length; i++) {
			inventoryArray.push('repeating_inventory_' + ids[i] + '_carried');
			inventoryArray.push('repeating_inventory_' + ids[i] + '_qty');
			inventoryArray.push('repeating_inventory_' + ids[i] + '_weight');
		}

		getAttrs(inventoryArray, function (v) {
			var sum = 0;
			for (var j = 0; j < ids.length; j++) {
				var carried = v['repeating_inventory_' + ids[j] + '_carried'] || true;
				if(carried) {
					var qty = parseInt(v['repeating_inventory_' + ids[j] + '_qty'], 10) || 1;
					var weight = parseFloat(v['repeating_inventory_' + ids[j] + '_weight']) || 0;
					var totalWeight = qty * weight;

					finalSetAttrs['repeating_inventory_' + ids[j] + '_weight_total'] = totalWeight;

					sum += totalWeight;
				}
			}

			finalSetAttrs.weight_inventory = sum;
			setAttrs(finalSetAttrs);
		});
	});
});