on('change:cp change:sp change:ep change:gp change:pp', function () {
	getAttrs(['cp', 'copper_per_gold', 'sp', 'silver_per_gold', 'ep', 'electrum_per_gold', 'gp', 'pp', 'platinum_per_gold'], function (v) {
		var copperPieces = parseInt(v.cp, 10) || 0;
		var silverPieces = parseInt(v.sp, 10) || 0;
		var electrumPieces = parseInt(v.ep, 10) || 0;
		var goldPieces = parseInt(v.gp, 10) || 0;
		var platinumPieces = parseInt(v.pp, 10) || 0;
		var copperPerGold = parseInt(v.copper_per_gold, 10) || 100;
		var silverPerGold = parseInt(v.copper_per_gold, 10) || 10;
		var electrumPerGold = parseInt(v.copper_per_gold, 10) || 2;
		var platinumPerGold = parseInt(v.platinum_per_gold, 10) || 10;
		var totalGold = (copperPieces / copperPerGold) + (silverPieces / silverPerGold) + (electrumPieces / electrumPerGold) + goldPieces + (platinumPieces * platinumPerGold);
		var coinWeight = (copperPieces + silverPieces + electrumPieces + goldPieces + platinumPieces) / 50;
		setAttrs({
			total_gp: totalGold.toFixed(2),
			coin_weight: coinWeight
		});
	});
});
