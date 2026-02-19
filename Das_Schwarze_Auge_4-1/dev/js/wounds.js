/* wounds start */
/*
Input: object with zonal wound numbers
Output: object with modifiers of AT, PA, FK, IB, MU, IN, KL, FF, GE, KO, KK and GS

Note: Effect of arm wounds assumes fighter with sword and shield
*/
function calculateWoundModifiers(values) {
	var func = "calculateWoundModifiers";
	var woundModifiers = {
		"AT": 0, "PA": 0, "FK": 0, "IB": 0,
		"MU": 0, "IN": 0, "KL": 0, "FF": 0, "GE": 0, "KO": 0, "KK": 0, "GS": 0
	};

	// Input Sanitation
	// Part 1: Check Requirements
	var requiredProperties = [
		"wound_kopf1", "wound_kopf2", "wound_kopf3",
		"wound_brust1", "wound_brust2", "wound_brust3",
		"wound_bauch1", "wound_bauch2", "wound_bauch3",
		"wound_RA1", "wound_RA2", "wound_RA3",
		"wound_LA1", "wound_LA2", "wound_LA3",
		"wound_RB1", "wound_RB2", "wound_RB3",
		"wound_LB1", "wound_LB2", "wound_LB3"
	];

	var reqCheck = checkRequiredProperties(requiredProperties, values);
	if (reqCheck["errors"] > 0) {
		debugLog(func, "Error:", func, "stopped due to", reqCheck["errors"], "missing properties in input. Nothing returned. Missing properties:", reqCheck["missing"].toString());
		return;
	}

	// Input Sanitation
	// Part 2: Check Values
	var errors = 0;
	for (let property of requiredProperties) {
		if (!DSAsane(values[property], "wound-box")) {
			errors += 1;
		}
	}

	if (errors > 0) {
		debugLog(func, "One or more wounds are not sane. Stopping.");
		return;
	}

	// Preparation for calculation
	// Wound effects for each affected value
	var woundEffects = {
		"AT": {"kopf":  0, "brust": -1, "bauch": -1, "RA": -2, "LA": -2, "RB": -2, "LB": -2},
		"PA": {"kopf":  0, "brust": -1, "bauch": -1, "RA": -2, "LA": -2, "RB": -2, "LB": -2},
		"FK": {"kopf":  0, "brust": -1, "bauch": -1, "RA": -2, "LA": -2, "RB": -2, "LB": -2},
		"IB": {"kopf": -2, "brust":  0, "bauch": -1, "RA":  0, "LA":  0, "RB": -2, "LB": -2},
		"MU": {"kopf": -2, "brust":  0, "bauch":  0, "RA":  0, "LA":  0, "RB":  0, "LB":  0},
		"IN": {"kopf": -2, "brust":  0, "bauch":  0, "RA":  0, "LA":  0, "RB":  0, "LB":  0},
		"KL": {"kopf": -2, "brust":  0, "bauch":  0, "RA":  0, "LA":  0, "RB":  0, "LB":  0},
		"FF": {"kopf":  0, "brust":  0, "bauch":  0, "RA": -2, "LA": -2, "RB":  0, "LB":  0},
		"GE": {"kopf":  0, "brust":  0, "bauch":  0, "RA":  0, "LA":  0, "RB": -2, "LB": -2},
		"KO": {"kopf":  0, "brust": -1, "bauch": -1, "RA":  0, "LA":  0, "RB":  0, "LB":  0},
		"KK": {"kopf":  0, "brust": -1, "bauch": -1, "RA": -2, "LA": -2, "RB":  0, "LB":  0},
		"GS": {"kopf":  0, "brust":  0, "bauch": -1, "RA":  0, "LA":  0, "RB": -1, "LB": -1},
	};

	var zones = ["kopf", "brust", "bauch", "RA", "LA", "RB", "LB"];
	var affectedParameters = ["AT", "PA", "FK", "IB", "MU", "IN", "KL", "FF", "GE", "KO", "KK", "GS"];
	var wounds = {};

	for (let zone of zones) {
		wounds[zone] = 0;
		for (let woundCount of [1, 2, 3]) {
			wounds[zone] += parseInt(values["wound_" + zone + woundCount]);
		}
	}

	// Calculate final wound modifiers
	for (let param of affectedParameters) {
		for (let zone of zones) {
			woundModifiers[param] += wounds[zone] * woundEffects[param][zone];
		}
	}

	return woundModifiers;
}

on(
	"change:wound_kopf1 change:wound_kopf2 change:wound_kopf3 " +
	"change:wound_brust1 change:wound_brust2 change:wound_brust3 " +
	"change:wound_bauch1 change:wound_bauch2 change:wound_bauch3 " +
	"change:wound_ra1 change:wound_ra2 change:wound_ra3 " +
	"change:wound_la1 change:wound_la2 change:wound_la3 " +
	"change:wound_rb1 change:wound_rb2 change:wound_rb3 " +
	"change:wound_lb1 change:wound_lb2 change:wound_lb3",
	function(eventInfo) {
	safeGetAttrs(["wound_kopf1", "wound_kopf2", "wound_kopf3",
		"wound_brust1", "wound_brust2", "wound_brust3",
		"wound_bauch1", "wound_bauch2", "wound_bauch3",
		"wound_RA1", "wound_RA2", "wound_RA3",
		"wound_LA1", "wound_LA2", "wound_LA3",
		"wound_RB1", "wound_RB2", "wound_RB3",
		"wound_LB1", "wound_LB2", "wound_LB3"], function(values) {
		var mods = calculateWoundModifiers(values);
		safeSetAttrs({
			"AT_mod_wounds": mods["AT"],
			"PA_mod_wounds": mods["PA"],
			"FK_mod_wounds": mods["FK"],
			"IB_mod_wounds": mods["IB"],
			"GS_mod_wounds": mods["GS"],
			"MU_mod_wounds": mods["MU"],
			"IN_mod_wounds": mods["IN"],
			"KL_mod_wounds": mods["KL"],
			"FF_mod_wounds": mods["FF"],
			"GE_mod_wounds": mods["GE"],
			"KO_mod_wounds": mods["KO"],
			"KK_mod_wounds": mods["KK"]
		});
	});
});
/* wounds end */
