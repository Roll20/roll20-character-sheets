/* base_values start */
on(
	"change:safe-sheet-open " +
	"change:mu_basis change:mu_mod change:mu_mod_wounds " +
	"change:in_basis change:in_mod change:in_mod_wounds " +
	"change:kl_basis change:kl_mod change:kl_mod_wounds " +
	"change:ch_basis change:ch_mod " +
	"change:ff_basis change:ff_mod change:ff_mod_wounds " +
	"change:ge_basis change:ge_mod change:ge_mod_wounds " +
	"change:ko_basis change:ko_mod change:ko_mod_wounds " +
	"change:kk_basis change:kk_mod change:kk_mod_wounds " +
	"change:gs_basis change:gs_mod change:gs_mod_wounds " +
	"change:lezugek change:auszugek change:aspzugek " +
	"change:mrzugek change:inizugek change:erschoepfung_mod " +
	"change:eisern " +
	"change:sf_gefaess_der_sterne " +
	"change:sf_kampfgespur change:sf_kampfreflexe change:sf_klingentanzer " +
	"change:be " +
	"change:ib_mod_wounds ",
	function(eventInfo) {
	safeGetAttrs(["mu_basis", "mu_mod", "MU_mod_wounds",
		"in_basis", "in_mod", "IN_mod_wounds",
		"kl_basis", "kl_mod", "KL_mod_wounds",
		"ch_basis", "ch_mod",
		"ff_basis", "ff_mod", "FF_mod_wounds",
		"ge_basis", "ge_mod", "GE_mod_wounds",
		"ko_basis", "ko_mod", "KO_mod_wounds",
		"kk_basis", "kk_mod", "KK_mod_wounds",
		"gs_basis", "gs_mod", "GS_mod_wounds",
		"lezugek", "auszugek", "aspzugek",
		"mrzugek", "inizugek", "erschoepfung_mod",
		"eisern",
		"sf_gefaess_der_sterne",
		"sf_kampfgespur", "sf_kampfreflexe", "sf_klingentanzer",
		"BE",
		"IB_mod_wounds"], function(v) {
				let update = {
						'MU': Math.max(0, +v.mu_basis + +v.mu_mod + (v.MU_mod_wounds || 0)),
						'KL': Math.max(0, +v.kl_basis + +v.kl_mod + (v.KL_mod_wounds || 0)),
						'IN': Math.max(0, +v.in_basis + +v.in_mod + (v.IN_mod_wounds || 0)),
						'CH': +v.ch_basis + +v.ch_mod,
						'FF': Math.max(0, +v.ff_basis + +v.ff_mod + (v.FF_mod_wounds || 0)),
						'GE': Math.max(0, +v.ge_basis + +v.ge_mod + (v.GE_mod_wounds || 0)),
						'KO': Math.max(0, +v.ko_basis + +v.ko_mod + (v.KO_mod_wounds || 0)),
						'KK': Math.max(0, +v.kk_basis + +v.kk_mod + (v.KK_mod_wounds || 0)),
						'erschoepfung_basis': +v.ko_basis,
						'erschoepfung_max': +v.ko_basis + +v.erschoepfung_mod,
						'wundschwelle': Math.ceil((+v.ko_basis) / 2) + +v.eisern,
						'aspgrundw': calculateAEBase({"MU": v.mu_basis, "IN": v.in_basis, "CH": v.ch_basis, "sf_gefaess_der_sterne": v.sf_gefaess_der_sterne}),
						'AE_max': calculateAEBase({"MU": v.mu_basis, "IN": v.in_basis, "CH": v.ch_basis, "sf_gefaess_der_sterne": v.sf_gefaess_der_sterne}) + +v.aspzugek,
						'ausgrundw': Math.ceil((+v.mu_basis + +v.ko_basis + +v.ge_basis) / 2),
						'AU_max': Math.ceil((+v.mu_basis + +v.ko_basis + +v.ge_basis) / 2) + +v.auszugek,
						'legrundw': Math.ceil(+v.ko_basis + (+v.kk_basis / 2)),
						'LE_max': Math.ceil(+v.ko_basis + (+v.kk_basis / 2)) + +v.lezugek,
						'mrgrundw': Math.round((+v.mu_basis + +v.kl_basis + +v.ko_basis) / 5),
						'MR': Math.round((+v.mu_basis + +v.kl_basis + +v.ko_basis) / 5) + +v.mrzugek,
						'ueberanstrengung_max': +v.ko_basis,
						'inibasis': Math.round((+v.mu_basis + +v.mu_basis + +v.in_basis + +v.ge_basis) / 5),
						'atbasis': Math.round((+v.mu_basis + +v.ge_basis + +v.kk_basis) / 5),
						'pabasis': Math.round((+v.in_basis + +v.ge_basis + +v.kk_basis) / 5),
						'fkbasis': Math.round((+v.in_basis + +v.ff_basis + +v.kk_basis) / 5),
						// Old attributes kept for compatibility (used in token bars)
						'aus_max': Math.ceil((+v.mu_basis + +v.ko_basis + +v.ge_basis) / 2) + +v.auszugek,
						'asp_max': calculateAEBase({"MU": v.mu_basis, "IN": v.in_basis, "CH": v.ch_basis, "sf_gefaess_der_sterne": v.sf_gefaess_der_sterne}) + +v.aspzugek
				};

		/*
			Calculation of "real" base initiative (inibasis2)

			Hints regarding rule interpretation:
			* Kampfreflexe requires an armour with max. encumbrance of 4 (WdS, p. 75)
			** This is interpreted to mean a total encumbrance of 4 as well (due to high load)
			* Kampfgespür has no requirements per se, but required Kampfreflexe
			** Kampfreflexe needs to be active, so encumbrance rules of Kampfreflexe apply to Kampfgespür as well
			* Klingentänzer requires a total encumbrance of 2
			** This is the reason for also treating Kampfreflexe's encumbrance as total encumbrance, not as encumbrance from armour only.
		*/
		var inibasis2 = update['inibasis'] + +v.inizugek + (v.IB_mod_wounds || 0);

		// Kampfreflexe is a prerequisite for the others, so stop if not active
		var IBbonus = 0;
		var INIdicecount = "1";
		if (v.sf_kampfreflexe !== "0" && v.BE <= 4) {
			IBbonus += 4;
			if (v.sf_kampfgespur !== "0" && v.BE <= 4) {
				IBbonus += 2;
				if (v.sf_klingentanzer !== "0" && v.BE <= 2) {
					INIdicecount = "2";
				} else {
					INIdicecount = "1";
				}
			}
		}

		inibasis2 += IBbonus;
		inibasis2 = Math.max(0, inibasis2);

				update['inibasis2'] = inibasis2;
				update['INI_dice_count'] = INIdicecount;

				// Calculate Speed (GS)
				var speed;
				let GS = {
						'Basis': +v.gs_basis,
						'Mod': +v.gs_mod + (v.GS_mod_wounds || 0),
						'GE-Einfluss': 0
				};
				if (update['GE'] < 11) {
						GS['GE-Einfluss'] = -1;
				} else if (update['GE'] > 15) {
						GS['GE-Einfluss'] = 1;
				}
				// Speed (GS) cannot be lower than 1
				speed = Math.max(1, GS['Basis'] + GS['Mod'] + GS['GE-Einfluss'])
				update['GS'] = speed;
				safeSetAttrs(update);
		}); 
});

// Astral Energy: Base value
function calculateAEBase(values) {
	var func = "calculateAEBase";

	// Input Sanitation
	// Part 1: Check Requirements
	var requiredProperties = ["MU", "IN", "CH", "sf_gefaess_der_sterne"];
	var reqCheck = checkRequiredProperties(requiredProperties, values);

	if (reqCheck["errors"] > 0) {
		debugLog(func, "Error:", func, "stopped due to missing properties in input. Nothing returned. Missing properties:", reqCheck["missing"].toString());
		return;
	}

	// Input Sanitation
	// Part 2: Check Values
	if (!DSAsane(values["MU"], "stat")
	|| !DSAsane(values["IN"], "stat")
	|| !DSAsane(values["CH"], "stat")
	) {
		debugLog(func, "One or more stats are not sane. Stopping.");
		return;
	}

	// Preparation for calculation
	var MU = parseInt(values["MU"]);
	var IN = parseInt(values["IN"]);
	var CH = parseInt(values["CH"]);
	var GdS = 0;

	if (values["sf_gefaess_der_sterne"] === "0") {
		GdS = 0;
	} else {
		GdS = 1;
	}

	// AE calculation
	var AE = 0;
	if (GdS === 0) {
		AE = DSAround((MU + IN + CH) / 2);
	} else {
		AE = DSAround(CH + (MU + IN) / 2);
	}

		return AE;
}

on("change:kegrundw change:kezugek", function(eventInfo) {
		safeGetAttrs(["kegrundw", "kezugek"], function(v) {
				safeSetAttrs({
						"KE_max": +v.kegrundw + +v.kezugek
				});
		});
});

on("change:ap_gesamt change:ap_ausgegeben", function(eventInfo) {
		safeGetAttrs(["ap_gesamt", "ap_ausgegeben"], function(v) {
				safeSetAttrs({
						ap_verfuegbar: +v.ap_gesamt - +v.ap_ausgegeben
				});
		});
});
/* base_values end */
