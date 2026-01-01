/* talents start */

function generateTalentRollMacro(template, nameInternal, nameUI, statAttrs, ebeMacro = "") {
	const func = "generateTalentRollMacro";

	var ebeRoll = "";
	var modRoll = "";

	const statsRoll = [
		"{{stats=",
		[
			"[[",
			[
				"[Eigenschaft 1:] [[@{" + statAttrs[0] + "}]]d1cs0cf2",
				"[Eigenschaft 2:] [[@{" + statAttrs[1] + "}]]d1cs0cf2",
				"[Eigenschaft 3:] [[@{" + statAttrs[2] + "}]]d1cs0cf2",
			].join(" + "),
			"]]"
		].join(" "),
		"}}"
	].join("");

	if (ebeMacro === "")
	{
		ebeRoll = ebeMacro;
		modRoll = "{{mod=[[?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2]]}}";
	} else {
		ebeRoll = [
			"{{ebe=",
			"[[{0d1 + ",
			ebeMacro,
			", 0d1}kh1]]",
			"}}"
		].join("");
		modRoll = [
			"{{mod=",
			"[[ 0d1 + ?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2 + [[{0d1 + ",
			ebeMacro,
			", 0d1}kh1]]d1cs0cf2 ]]",
			"}}"
		].join("");
	}
	const rollMacro = [
		"@{gm_roll_opt}",
		"&{template:" + template + "}",
		"{{name=" + nameUI + "}}",
		"{{wert=[[@{TaW_" + nameInternal + "}d1cs0cf2]]}}",
		modRoll,
		ebeRoll,
		statsRoll,
		"{{roll=[[3d20cs<@{cs_talent}cf>@{cf_talent}]]}}",
		"{{result=[[0]]}}",
		"{{criticality=[[0]]}}",
		"{{critThresholds=[[[[@{cs_talent}]]d1cs0cf2 + [[@{cf_talent}]]d1cs0cf2]]}}"
	].join(" ");

	debugLog(func, "rollMacro", rollMacro);
	return rollMacro;
}

function getTalentRollResults(results) {
	var stats = [
		results.stats.rolls[0].dice,
		results.stats.rolls[1].dice,
		results.stats.rolls[2].dice
	];
	var TaW = results.wert.result;
	var mod = results.mod.result;
	var rolls = results.roll.rolls[0].results;
	var success = results.critThresholds.rolls[0].dice;
	var failure = results.critThresholds.rolls[1].dice;
	/* Result
	0	Failure
	1	Success
	*/
	var result = 0;
	/* Criticality
	-3	Triple 20
	-2	Double 20
	 0	no double 1/20
	+2	Double 1
	+3	Triple 1
	*/
	var criticality = 0;

	/*
		Doppel/Dreifach-1/20-Berechnung
		Vor der TaP*-Berechnung, da diese damit gegebenenfalls hinfällig wird
	*/
	{
		let successes = 0;
		let failures = 0;
		for (let roll of rolls)
		{
			if (roll <= success)
			{
				successes += 1;
			} else if (roll >= failure) {
				failures += 1;
			}
			if (successes >= 2)
			{
				criticality = successes;
			} else if (failures >= 2) {
				criticality = -failures;
			}
		}
	}

	/*
		TaP*-Berechnung
	*/
	var effRolls = rolls;
	var effTaW = TaW - mod;
	var TaPstar = effTaW;

	// Negativer TaW: |effTaW| zu Teilwürfen addieren
	if (criticality >= 2)
	{
		TaPstar = TaW;
		result = 1;
	} else {
		if (effTaW < 0)
		{
			for (let roll in rolls)
			{
				effRolls[roll] = rolls[roll] + Math.abs(effTaW);
			}
			TaPstar = 0;
		}

		// TaP-Verbrauch für jeden Wurf
		for (let roll in effRolls)
		{
			TaPstar -= Math.max(0, effRolls[roll] - stats[roll]);
		}

		// Max. TaP* = TaW
		TaPstar = Math.min(Math.max(0, TaW), TaPstar);

		// Ergebnis an Doppel/Dreifach-20 anpassen
		if (Math.abs(criticality) <= 1)
		{
			result = TaPstar < 0 ? 0 : 1;
		} else if (criticality <= -2) {
			result = 0;
		}
	}
	return {
		"result" : result,
		"TaPstar": TaPstar,
		"criticality": criticality,
		"stats": stats,
	};
}

on("change:repeating_gaben:name_gabe change:repeating_gaben:name_gabe_zusatz", function(eventInfo) {
		safeGetAttrs(["repeating_Gaben_Name_Gabe", "repeating_Gaben_Name_Gabe_Zusatz"], function(v) {
				let gabe = v.repeating_Gaben_Name_Gabe;
				let gabeZusatz = v.repeating_Gaben_Name_Gabe_Zusatz;
				let gaben = {
						"empathie": [ ["mu", "in", "in"], "Empathie" ],
						"gefahreninstinkt": [ ["kl", "in", "in"], "Gefahreninstinkt" ],
						"geraeuschhexerei": [ ["in", "ch", "ko"], "Geräuschhexerei" ],
						"kraefteschub/talentschub": [ ["mu", "in", "ko"], "Kräfteschub/Talentschub" ],
						"magiegespuer": [ ["mu", "in", "in"], "Magiegespür" ],
						"prophezeien": [ ["in", "in", "ch"], "Prophezeien" ],
						"tierempathie": [ ["mu", "in", "ch"], "Tierempathie" ],
						"zwergennase": [ ["in", "in", "ff"], "Zwergennase" ]
				};
				if (gabe != "nothing") {
						let update = {
								'repeating_Gaben_eigenschaft1': gaben[gabe][0][0],
								'repeating_Gaben_eigenschaft2': gaben[gabe][0][1],
								'repeating_Gaben_eigenschaft3': gaben[gabe][0][2],
								'repeating_Gaben_Name_Gabe_Anzeige': gaben[gabe][1]
						};
						if (gabeZusatz != "") {
								update['repeating_Gaben_Name_Gabe_Anzeige'] += " (" + gabeZusatz + ")";
						}
						safeSetAttrs(update);
				} else {
						let update = {};
						if(gabeZusatz !== "") {
								update['repeating_Gaben_Name_Gabe_Anzeige'] = gabeZusatz;
						} else {
								update['repeating_Gaben_Name_Gabe_Anzeige'] = "Eigene Gabe";
						}
						safeSetAttrs(update);
				}
		});
});

on("change:repeating_metatalente201904:name_metatalent change:repeating_metatalente201904:name_metatalent_eigen", function(eventInfo) {
		safeGetAttrs(["repeating_Metatalente201904_Name_Metatalent", "repeating_Metatalente201904_Name_Metatalent_Eigen"], function(v) {
				let metatalent = v.repeating_Metatalente201904_Name_Metatalent;
				let metatalentEigen = v.repeating_Metatalente201904_Name_Metatalent_Eigen;
				let metatalente = {
						"ansitzjagd": [ ["mu", "in", "ge"], "Ansitzjagd" ],
						"hetzjagd": [ ["mu", "in", "ge"], "Hetzjagd" ],
						"kraeutersuchen": [ ["mu", "in", "ff"], "Kräutersuchen" ],
						"nahrungsammeln": [ ["mu", "in", "ff"], "Nahrungsammeln" ],
						"pirschjagd": [ ["mu", "in", "ge"], "Pirschjagd" ],
						"speerfischen": [ ["mu", "in", "ge"], "Speerfischen" ],
						"tierfallenstellen": [ ["kl", "in", "ff"], "Tierfallenstellen" ],
						"wachehalten": [ ["mu", "in", "ko"], "Wachehalten" ]
				};
				if (metatalent != "nothing")  {
						safeSetAttrs({
								'repeating_Metatalente201904_eigenschaft1': metatalente[metatalent][0][0],
								'repeating_Metatalente201904_eigenschaft2': metatalente[metatalent][0][1],
								'repeating_Metatalente201904_eigenschaft3': metatalente[metatalent][0][2],
								'repeating_Metatalente201904_Name_Metatalent_Anzeige': metatalente[metatalent][1]
						});
				} else {
						let update = {};
						if (metatalentEigen != "") {
								update['repeating_metatalent_Name_Metatalent_Anzeige'] = metatalentEigen;
						} else {
								update['repeating_metatalent_Name_Metatalent_Anzeige'] = "Eigenes Metatalent";
						}
						safeSetAttrs(update);
				}
		});
});

on("change:repeating_gaben:eigenschaft1 change:repeating_gaben:eigenschaft2 change:repeating_gaben:eigenschaft3", function(eventInfo) {
		safeGetAttrs(["repeating_Gaben_eigenschaft1", "repeating_Gaben_eigenschaft2", "repeating_Gaben_eigenschaft3", "mu", "kl", "in", "ch", "ff", "ge", "ko", "kk"], function(v) {
						let attributes = {"mu": +v.mu, "kl": +v.kl, "in": +v.in, "ch": +v.ch, "ff": +v.ff, "ge": +v.ge, "ko": +v.ko, "kk": +v.kk};
						safeSetAttrs({
								'repeating_Gaben_hiddeneigenschaft1': attributes[v.repeating_Gaben_eigenschaft1] || 0,
								'repeating_Gaben_hiddeneigenschaft2': attributes[v.repeating_Gaben_eigenschaft2] || 0,
								'repeating_Gaben_hiddeneigenschaft3': attributes[v.repeating_Gaben_eigenschaft3] || 0
						});
		});
});

on("change:repeating_metatalente201904:eigenschaft1 change:repeating_metatalente201904:eigenschaft2 change:repeating_metatalente201904:eigenschaft3", function(eventInfo) {
		safeGetAttrs(["repeating_Metatalente201904_eigenschaft1", "repeating_Metatalente201904_eigenschaft2", "repeating_Metatalente201904_eigenschaft3", "mu", "kl", "in", "ch", "ff", "ge", "ko", "kk"], function(v) {
						let attributes = {"mu": +v.mu, "kl": +v.kl, "in": +v.in, "ch": +v.ch, "ff": +v.ff, "ge": +v.ge, "ko": +v.ko, "kk": +v.kk};
						safeSetAttrs({
								'repeating_Metatalente201904_hiddeneigenschaft1': attributes[v.repeating_Metatalente201904_eigenschaft1] || 0,
								'repeating_Metatalente201904_hiddeneigenschaft2': attributes[v.repeating_Metatalente201904_eigenschaft2] || 0,
								'repeating_Metatalente201904_hiddeneigenschaft3': attributes[v.repeating_Metatalente201904_eigenschaft3] || 0
						});
		});
});

on("change:mu change:kl change:in change:ch change:ff change:ge change:ko change:kk", function(eventInfo) {
		// Aktualisiere Talentwerte
		safeGetAttrs(["mu", "kl", "in", "ch", "ff", "ge", "ko", "kk"], function(v) {
				let attributes = {"mu": +v.mu, "kl": +v.kl, "in": +v.in, "ch": +v.ch, "ff": +v.ff, "ge": +v.ge, "ko": +v.ko, "kk": +v.kk};
				let update = {};

				// Aktualisiere Gaben
				getSectionIDs("gaben", function(idarray) {
						 _.each(idarray, function(currentID, i) {
								safeGetAttrs(["repeating_Gaben_" + currentID + "_eigenschaft1", "repeating_Gaben_" + currentID + "_eigenschaft2", "repeating_Gaben_" + currentID + "_eigenschaft3"], function(v) {
										update["repeating_Gaben_" + currentID + "_hiddeneigenschaft1"] = attributes[v["repeating_Gaben_" + currentID + "_eigenschaft1"]];
										update["repeating_Gaben_" + currentID + "_hiddeneigenschaft2"] = attributes[v["repeating_Gaben_" + currentID + "_eigenschaft2"]];
										update["repeating_Gaben_" + currentID + "_hiddeneigenschaft3"] = attributes[v["repeating_Gaben_" + currentID + "_eigenschaft3"]];
										safeSetAttrs(update);
								});
						});
				});

				// Aktualisiere Metatalente
				getSectionIDs("metatalente201904", function(idarray) {
						 _.each(idarray, function(currentID, i) {
								safeGetAttrs(["repeating_Metatalente201904_" + currentID + "_eigenschaft1", "repeating_Metatalente201904_" + currentID + "_eigenschaft2", "repeating_Metatalente201904_" + currentID + "_eigenschaft3"], function(v) {
										update["repeating_Metatalente201904_" + currentID + "_hiddeneigenschaft1"] = attributes[v["repeating_Metatalente201904_" + currentID + "_eigenschaft1"]];
										update["repeating_Metatalente201904_" + currentID + "_hiddeneigenschaft2"] = attributes[v["repeating_Metatalente201904_" + currentID + "_eigenschaft2"]];
										update["repeating_Metatalente201904_" + currentID + "_hiddeneigenschaft3"] = attributes[v["repeating_Metatalente201904_" + currentID + "_eigenschaft3"]];
										safeSetAttrs(update);
								});
						});
				});
		});
});

on(talents.map(talent => "clicked:" + talent + "-action").join(" "), async (info) => {
	var func = "Action Listener for Talent Roll Buttons";
	var trigger = info["triggerName"].replace(/clicked:([^-]+)-action/, '$1');
	var nameInternal = talentsData[trigger]["internal"];
	var nameUI = talentsData[trigger]["ui"];
	debugLog(func, trigger, talentsData[trigger]);
	let attributes = [];
	// All languages (sp) and scripts (sc) use the same attributes, so no layer of indirection via talent name required/possible.
	if (trigger.replace(/t_([^_]+)_.*/, '$1') === "sp")
	{
		attributes = ["KL", "IN", "CH"];
	} else if (trigger.replace(/t_([^_]+)_.*/, '$1') === "sc") {
		attributes = ["KL", "KL", "FF"];
	} else {
		attributes = ["Eigenschaft1" + nameInternal, "Eigenschaft2" + nameInternal, "Eigenschaft3" + nameInternal];

	}
	let rollMacro = generateTalentRollMacro("talent", nameInternal, nameUI, attributes);
	debugLog(func, rollMacro);

	// Execute Roll
	results = await startRoll(rollMacro);
	debugLog(func, "test: info:", info, "results:", results);

	// Process Roll
	let rollID = results.rollId;
	results = results.results;
	let processedResult = getTalentRollResults(results);

	finishRoll(
		rollID,
		{
			roll: processedResult.TaPstar,
			result: processedResult.result,
			criticality: processedResult.criticality,
			stats: processedResult.stats.toString().replaceAll(",", "/")
		}
	);
});

on(talents_ebe.map(talent => "clicked:" + talent + "-ebe-action").join(" "), async (info) => {
	var func = "Action Listener for Talent Roll Buttons With Encumbrance";
	var trigger = info["triggerName"].replace(/clicked:([^-]+)-ebe-action/, '$1');
	var nameInternal = talentsData[trigger]["internal"];
	var nameUI = talentsData[trigger]["ui"];
	debugLog(func, trigger, talentsData[trigger]);

	let attributes = ["Eigenschaft1" + nameInternal, "Eigenschaft2" + nameInternal, "Eigenschaft3" + nameInternal];

	var ebeMacro = "@{BE}";
	var talentEbeData = effectiveEncumbrance[trigger];
	if (talentEbeData["type"] === "factor")
	{
		ebeMacro = talentEbeData["value"].toString() + " * " + ebeMacro;
	} else if (talentEbeData["type"] === "summand") {
		ebeMacro += talentEbeData["value"].toString();
	}
	let rollMacro = generateTalentRollMacro("talent-ebe", nameInternal, nameUI, attributes, ebeMacro);

	debugLog(func, rollMacro);

	// Execute Roll
	results = await startRoll(rollMacro);
	debugLog(func, "test: info:", info, "results:", results);


	// Process Roll
	let rollID = results.rollId;
	results = results.results;
	var ebe = results.ebe.result;
	var modOnly = results.mod.result - ebe;
	let processedResult = getTalentRollResults(results);

	finishRoll(
		rollID,
		{
			mod: modOnly,
			roll: processedResult.TaPstar,
			result: processedResult.result,
			criticality: processedResult.criticality,
			stats: processedResult.stats.toString().replaceAll(",", "/")
		}
	);
});
/* talents end */
