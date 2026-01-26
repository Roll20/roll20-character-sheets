/* ranged_combat_other start */
on(
	"change:safe-sheet-open " +
	"change:FKBasis " +
	"change:TaW_Armbrust change:TaW_Belagerungswaffen change:TaW_Blasrohr " +
	"change:TaW_Bogen change:TaW_Diskus change:TaW_feuerwaffen " +
	"change:TaW_Schleuder " +
	"change:TaW_Wurfbeile change:TaW_Wurfmesser change:TaW_Wurfspeere " +
	"change:FKWFK1 change:FKW_Aktiv1 change:FKW1_Spez change:FKWtyp1 " +
	"change:FKWFK2 change:FKW_Aktiv2 change:FKW2_Spez change:FKWtyp2 " +
	"change:FKWFK3 change:FKW_Aktiv3 change:FKW3_Spez change:FKWtyp3 " +
	"change:FKWFK4 change:FKW_Aktiv4 change:FKW4_Spez change:FKWtyp4 " +
	"change:FK_mod_wounds",
	function() {
	safeGetAttrs([
		"FKBasis",
		"TaW_Armbrust", "TaW_Belagerungswaffen", "TaW_Blasrohr",
		"TaW_Bogen", "TaW_Diskus", "TaW_feuerwaffen",
		"TaW_Schleuder",
		"TaW_Wurfbeile", "TaW_Wurfmesser", "TaW_Wurfspeere",
		"FKWFK1", "FKW_Aktiv1", "FKW1_Spez", "FKWtyp1",
		"FKWFK2", "FKW_Aktiv2", "FKW2_Spez", "FKWtyp2",
		"FKWFK3", "FKW_Aktiv3", "FKW3_Spez", "FKWtyp3",
		"FKWFK4", "FKW_Aktiv4", "FKW4_Spez", "FKWtyp4",
		"FK_mod_wounds",
	], function(v) {
		var attrsToChange = {"FK_Aktiv": 0};
		var FKTalente = [
			"Armbrust", "Belagerungswaffen", "Blasrohr",
			"Bogen", "Diskus", "feuerwaffen",
			"Schleuder",
			"Wurfbeile", "Wurfmesser", "Wurfspeere"
		];
		// Todo: Proper sanity checking of input data
		if (isNaN(v["FKBasis"])) {
			v["FKBasis"] = 0;
		}

		if (isNaN(v["FK_mod_wounds"])) {
			v["FK_mod_wounds"] = 0;
		}

		// Calculation of FK values
		for (let FKTalent of FKTalente) {
			var TaW = "TaW_" + FKTalent;
			if (isNaN(v[TaW])) {
				v[TaW] = 0;
			}
			attrsToChange["AT_" + FKTalent] = parseInt(v["FKBasis"]) + parseInt(v[TaW]);
		}

		for (let i = 1; i <= 4; i++) {
			v["FKWtyp" + i] = v["FKWtyp" + i].replace(/[^_a-zA-ZäöüÄÖÜß|]/g, "");
			if (v["FKWtyp" + i] === "") {
				v["FKWtyp" + i] = "--";
				attrsToChange["FKWFK" + i] = 0;
				continue;
			}
			attrsToChange["FKWFK" + i] =
				attrsToChange[v["FKWtyp" + i]] +
				parseInt(v["FKW" + i + "_Spez"]) +
				parseInt(v["FK_mod_wounds"]);
			attrsToChange["FK_Aktiv"] += attrsToChange["FKWFK" + i] * parseInt(v["FKW_Aktiv" + i]);
		}
		safeSetAttrs(attrsToChange);
	});
});
/* ranged_combat_other end */
