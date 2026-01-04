/* base_values start */
/* MU ('Mut', Courage) */
const attrsMU = [
	'MU_Basis',
	'MU_Mod',
	'MU_mod_wounds',
];
Object.freeze(attrsMU);

on(attrsMU.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for MU";
		safeGetAttrs(
			attrsMU, function(v) {
				let attrsToChange = { "MU": parseInt(v["MU_Basis"]) + parseInt(v["MU_Mod"]) + v["MU_mod_wounds"] };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* IN ('Intuition', Intuition) */
const attrsIN = [
	'IN_Basis',
	'IN_Mod',
	'IN_mod_wounds',
];
Object.freeze(attrsIN);

on(attrsIN.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for IN";
		safeGetAttrs(
			attrsIN, function(v) {
				let attrsToChange = { "IN": parseInt(v["IN_Basis"]) + parseInt(v["IN_Mod"]) + v["IN_mod_wounds"] };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* KL ('Klugheit', Sagacity) */
const attrsKL = [
	'KL_Basis',
	'KL_Mod',
	'KL_mod_wounds',
];
Object.freeze(attrsKL);

on(attrsKL.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for KL";
		safeGetAttrs(
			attrsKL, function(v) {
				let attrsToChange = { "KL": parseInt(v["KL_Basis"]) + parseInt(v["KL_Mod"]) + v["KL_mod_wounds"] };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* CH ('Charisma', Charisma) */
const attrsCH = [
	'CH_Basis',
	'CH_Mod',
];
Object.freeze(attrsCH);

on(attrsCH.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for CH";
		safeGetAttrs(
			attrsCH, function(v) {
				let attrsToChange = { "CH": parseInt(v["CH_Basis"]) + parseInt(v["CH_Mod"]) };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* FF ('Fingerfertigkeit', Dexterity) */
const attrsFF = [
	'FF_Basis',
	'FF_Mod',
	'FF_mod_wounds',
];
Object.freeze(attrsFF);

on(attrsFF.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for FF";
		safeGetAttrs(
			attrsFF, function(v) {
				let attrsToChange = { "FF": parseInt(v["FF_Basis"]) + parseInt(v["FF_Mod"]) + v["FF_mod_wounds"] };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* GE ('Gewandtheit', Agility) */
const attrsGE = [
	'GE_Basis',
	'GE_mod',
	'GE_mod_wounds',
	'GE_mod_advantages_disadvantages',
];
Object.freeze(attrsGE);

on(attrsGE.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for GE";
		safeGetAttrs(
			attrsGE, function(v) {
				// Boilerplate
				const limitLower = 0;
				let stat = 0;
				let attrsToChange = { "GE": getDefaultValue("GE") };

				// Calculate GE
				stat =
					parseInt(v["GE_Basis"])
					+ parseInt(v["GE_mod"])
					+ v["GE_mod_wounds"]
					+ v["GE_mod_advantages_disadvantages"];

				// Sanity checking
				stat = Math.max(limitLower, stat);

				attrsToChange["GE"] = stat;
				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* KO ('Konstitution', Constitution) */
const attrsKO = [
	'KO_Basis',
	'KO_Mod',
	'KO_mod_wounds',
];
Object.freeze(attrsKO);

on(attrsKO.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for KO";
		safeGetAttrs(
			attrsKO, function(v) {
				let attrsToChange = { "KO": parseInt(v["KO_Basis"]) + parseInt(v["KO_Mod"]) + v["KO_mod_wounds"] };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* KK ('Körperkraft', Strength) */
const attrsKK = [
	'KK_Basis',
	'KK_Mod',
	'KK_mod_wounds',
];
Object.freeze(attrsKK);

on(attrsKK.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for KK";
		safeGetAttrs(
			attrsKK, function(v) {
				let attrsToChange = { "KK": parseInt(v["KK_Basis"]) + parseInt(v["KK_Mod"]) + v["KK_mod_wounds"] };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* GS ('Geschwindigkeit', Movement) */
const attrsGS = [
	'GS_Basis',
	'GS_Mod',
	'GS_mod_wounds',
	'GS_mod_advantages_disadvantages',
	'GE',
];
Object.freeze(attrsGS);

on(attrsGS.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Movement (GS)";
		safeGetAttrs(
			attrsGS, function(v) {
				// Boilerplate
				let attrsToChange = { "GS": getDefaultValue("GS") };
				/// Movement (GS) cannot be lower than 1
				const GSMin = 1;

				// Calculate Movement (GS)
				let GS = {
					"base": parseInt(v["GS_Basis"]),
					"mod": parseInt(v["GS_Mod"]) + v["GS_mod_wounds"] + v["GS_mod_advantages_disadvantages"],
					"GE effect": 0,
				};

				/// High/low agility (GE) affect Movement (GS)
				if (v["GE"] < 11)
				{
					GS["GE effect"] = -1;
				} else if (v["GE"] > 15) {
					GS["GE effect"] = 1;
				}

				/// Add all parts up
				attrsToChange["GS"] = GS["base"] + GS["mod"] + GS["GE effect"];
				attrsToChange["GS"] = Math.max(GSMin, attrsToChange["GS"])

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-zero stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* LE ('Lebensenergie', Life energy) */
const attrsLE = [
	'KO_Basis',
	'KK_Basis',
	'LEZugeK',
];
Object.freeze(attrsLE);

on(attrsLE.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Life Energy";
		safeGetAttrs(
			attrsLE, function(v) {
				// Boilerplate
				let attrsToChange = {};

				// Calculation
				let LEBase = parseInt(v["KO_Basis"]) + ( parseInt(v["KK_Basis"]) / 2 );
				LEBase = Math.ceil(LEBase);

				/// Check sanity
				if (!DSAsane(LEBase, "non-negative int"))
				{
					debugLog(caller, `LEBase ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}. LEBase: "${LEBase}".`);
					return;
				}

				// Build on LEBase
				attrsToChange["LEGrundW"] = LEBase;
				attrsToChange["LE_max"] = LEBase + parseInt(v["LEZugeK"]);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* AU ('Ausdauer', Stamina) */
const attrsAU = [
	'MU_Basis',
	'KO_Basis',
	'GE_Basis',
	'AusZugeK',
];
Object.freeze(attrsAU);

on(attrsAU.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Stamina";
		safeGetAttrs(
			attrsAU, function(v) {
				// Boilerplate
				let attrsToChange = {};

				// Calculation
				let AUBase = parseInt(v["MU_Basis"]) + parseInt(v["KO_Basis"]) + parseInt(v["GE_Basis"]);
				AUBase = Math.ceil(AUBase / 2);

				/// Check sanity
				if (!DSAsane(AUBase, "non-negative int"))
				{
					debugLog(caller, `AUBase ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}. AUBase: "${AUBase}".`);
					return;
				}

				// Build on AUBase
				attrsToChange["AusGrundW"] = AUBase;
				attrsToChange["AU_max"] = AUBase + parseInt(v["AusZugeK"]);
				// Old attribute kept for compatibility (may still be used in token bars)
				attrsToChange["aus_max"] = AUBase + parseInt(v["AusZugeK"]);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* Xh ('Erschöpfung', Exhaustion) and Ox ('Überanstrengung', Overexertion) */
const attrsXhOx = [
	'KO_Basis',
	'erschoepfung_mod',
];
Object.freeze(attrsXhOx);

on(attrsXhOx.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Exhaustion and Overexertion";
		safeGetAttrs(
			attrsXhOx, function(v) {
				let attrsToChange = {};

				attrsToChange["erschoepfung_basis"] = parseInt(v["KO_Basis"]);
				attrsToChange["erschoepfung_max"] = parseInt(v["KO_Basis"]) + parseInt(v["erschoepfung_mod"]);
				attrsToChange["ueberanstrengung_max"] = parseInt(v["KO_Basis"]);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* AE ('Astralenergie', Astral Energy) */
const attrsAE = [
	'MU_Basis',
	'IN_Basis',
	'CH_Basis',
	'sf_gefaess_der_sterne',
	'ASPZugeK',
];
Object.freeze(attrsAE);

on(attrsAE.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Astral Energy";
		safeGetAttrs(
			attrsAE, function(v) {
				// Boilerplate
				let attrsToChange = {};

				// Calculation
				const AEBase = calculateAEBase(
					{
						"MU": parseInt(v["MU_Basis"]),
						"IN": parseInt(v["IN_Basis"]),
						"CH": parseInt(v["CH_Basis"]),
						"sf_gefaess_der_sterne": v["sf_gefaess_der_sterne"],
					}
				);

				/// Check sanity
				if (!DSAsane(AEBase, "non-negative int"))
				{
					debugLog(caller, `AEBase ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}. AEBase: "${AEBase}".`);
					return;
				}

				// Build on AEBase
				attrsToChange["ASPGrundW"] = AEBase;
				attrsToChange["AE_max"] = AEBase + parseInt(v["ASPZugeK"]);
				// Old attribute kept for compatibility (may still be used in token bars)
				attrsToChange["asp_max"] = AEBase + parseInt(v["ASPZugeK"]);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* KE ('Karmaenergie', Karmic Energy) */
const attrsKE = [
	'KEGrundW',
	'KEZugeK',
];
Object.freeze(attrsKE);

on(attrsKE.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Karmic Energy";
		safeGetAttrs(
			attrsKE, function(v) {
				let attrsToChange = { "KE_max": parseInt(v["KEGrundW"]) + parseInt(v["KEZugeK"]) };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* MR ('Magieresistenz', Resistance against Magic) */
const attrsMR = [
	'MU_Basis',
	'KL_Basis',
	'KO_Basis',
	'MRZugeK',
];
Object.freeze(attrsMR);

on(attrsMR.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Resistance against Magic";
		safeGetAttrs(
			attrsMR, function(v) {
				// Boilerplate
				let attrsToChange = {};

				// Calculation
				let MRBase = parseInt(v["MU_Basis"]) + parseInt(v["KL_Basis"]) + parseInt(v["KO_Basis"]);
				/// Note: Using Math.round() is okay due to the value being an integer, so fractions can only be .2/4/6/8
				MRBase = Math.round(MRBase / 5);

				/// Check sanity
				if (!DSAsane(MRBase, "non-negative int"))
				{
					debugLog(caller, `MRBase ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}. MRBase: "${MRBase}".`);
					return;
				}

				// Build on MRBase
				attrsToChange["MRGrundW"] = MRBase;
				attrsToChange["MR"] = MRBase + parseInt(v["MRZugeK"]);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* IB ('Initiative-Basiswert', Initiative base)

As for most attributes in this section, the naming scheme shows its historical roots.

* 'INIBasis' denotes the value which derives directly from the corresponding stats.
* 'INIBasis2'takes into account everything else required to get to the value players will actually use (see below for details).
*/
const attrsIB = [
	'MU_Basis',
	'IN_Basis',
	'GE_Basis',
	'INIZugeK',
	'IB_mod_wounds',
	'sf_kampfgespur',
	'sf_kampfreflexe',
	'sf_klingentanzer',
	'BE',
];
Object.freeze(attrsIB);

on(attrsIB.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Initiative Base";
		safeGetAttrs(
			attrsIB, function(v) {
				// Boilerplate
				let attrsToChange = {};

				// Calculation of INIBasis
				attrsToChange["INIBasis"] = parseInt(v["MU_Basis"]) + parseInt(v["MU_Basis"]) + parseInt(v["IN_Basis"]) + parseInt(v["GE_Basis"]);
				/// Note: Using Math.round() is okay due to the value being an integer, so fractions can only be .2/4/6/8
				attrsToChange["INIBasis"] = Math.round(attrsToChange["INIBasis"] / 5);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}

				// Calculation of INIBasis2
				/* Hints regarding rule interpretation
				* Kampfreflexe requires an armour with max. encumbrance of 4 (WdS, p. 75)
				** This is interpreted to mean a total encumbrance of 4 as well (due to high load)
				* Kampfgespür has no requirements per se, but requires Kampfreflexe
				** Kampfreflexe needs to be active (= prerequisites are fulfilled), so the encumbrance rules of Kampfreflexe apply to Kampfgespür as well
				* Klingentänzer requires a total encumbrance of at most 2
				** For a unified approach, the requirement of a max. _total_ encumbrance for Klingentänzer is seen as "what was really meant" for Kampfreflexe as well, so that the relevant encumbrance for Kampfreflexe is also the total encumbrance, not the encumbrance from armour alone.
				*/
				// Boilerplate
				const initiativeMinimum = 0;
				const initiativeSpecialSkills = {
					// The order of these entries is important!
					"sf_kampfreflexe": {
						"active": v["sf_kampfreflexe"],
						"bonus initiative": 4,
						"bonus dice": 0,
						"encumbrance threshold": 4,
					},
					"sf_kampfgespur": {
						"active": v["sf_kampfgespur"],
						"bonus initiative": 2,
						"bonus dice": 0,
						"encumbrance threshold": 4,
					},
					"sf_klingentanzer": {
						"active": v["sf_klingentanzer"],
						"bonus initiative": 0,
						"bonus dice": 1,
						"encumbrance threshold": 2,
					},
				};

				let IBBonus = 0;
				let initiativeDiceCount = 1;
				let activeSpecialSkills = [];

				// Effects of special skills
				for (specialSkill in initiativeSpecialSkills)
				{
					if (initiativeSpecialSkills[specialSkill]["active"] !== "0")
					{
						activeSpecialSkills.push(specialSkill);
					} else {
						break;
					}
				}
				/// Kampfreflexe is a prerequisite for Kampfgespür, Kampfgespür for Klingentänzer
				/// Since further skills were only checked if their prerequisite was active, it is safe to assume that all special skills in the activeSpecialSkills array can be iterated over
				for (specialSkill of activeSpecialSkills)
				{
					if (v["BE"] <= initiativeSpecialSkills[specialSkill]["encumbrance threshold"])
					{
						IBBonus += initiativeSpecialSkills[specialSkill]["bonus initiative"];
						initiativeDiceCount += initiativeSpecialSkills[specialSkill]["bonus dice"];
					}
				}

				// Actual calculation of INIBasis2
				attrsToChange["INIBasis2"] =
					attrsToChange["INIBasis"]
					+ parseInt(v["INIZugeK"])
					+ v["IB_mod_wounds"]
					+ IBBonus;
				attrsToChange["INIBasis2"] = Math.max(initiativeMinimum, attrsToChange["INIBasis2"]);

				// Dice count
				attrsToChange["INI_dice_count"] = initiativeDiceCount;

				// Final check
				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-zero stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* AT base ('Attacke-Basiswert', Attack base) */
const attrsATBase = [
	'MU_Basis',
	'GE_Basis',
	'KK_Basis',
];
Object.freeze(attrsATBase);

on(attrsATBase.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for AT base";
		safeGetAttrs(
			attrsATBase, function(v) {
				// Boilerplate
				let attrsToChange = {};

				// Calculation
				attrsToChange["ATBasis"] = parseInt(v["MU_Basis"]) + parseInt(v["GE_Basis"]) + parseInt(v["KK_Basis"]);
				/// Note: Using Math.round() is okay due to the value being an integer, so fractions can only be .2/4/6/8
				attrsToChange["ATBasis"] = Math.round(attrsToChange["ATBasis"] / 5);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* PA base ('Parade-Basiswert', Parry base) */
const attrsPABase = [
	'IN_Basis',
	'GE_Basis',
	'KK_Basis',
];
Object.freeze(attrsPABase);

on(attrsPABase.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for PA base";
		safeGetAttrs(
			attrsPABase, function(v) {
				// Boilerplate
				let attrsToChange = {};

				// Calculation
				attrsToChange["PABasis"] = parseInt(v["IN_Basis"]) + parseInt(v["GE_Basis"]) + parseInt(v["KK_Basis"]);
				/// Note: Using Math.round() is okay due to the value being an integer, so fractions can only be .2/4/6/8
				attrsToChange["PABasis"] = Math.round(attrsToChange["PABasis"] / 5);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* FK base ('Fernkampf-Basis', Ranged combat base) */
const attrsFKBase = [
	'IN_Basis',
	'FF_Basis',
	'KK_Basis',
];
Object.freeze(attrsFKBase);

on(attrsFKBase.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for FK base";
		safeGetAttrs(
			attrsFKBase, function(v) {
				// Boilerplate
				let attrsToChange = {};

				// Calculation
				attrsToChange["FKBasis"] = parseInt(v["IN_Basis"]) + parseInt(v["FF_Basis"]) + parseInt(v["KK_Basis"]);
				/// Note: Using Math.round() is okay due to the value being an integer, so fractions can only be .2/4/6/8
				attrsToChange["FKBasis"] = Math.round(attrsToChange["FKBasis"] / 5);

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-negative int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* WS ('Wundschwelle', Wound Threshold) */
const attrsWS = [
	'KO_Basis',
	'WS_mod_advantages_disadvantages',
];
Object.freeze(attrsWS);

on(attrsWS.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Wound Threshold";
		safeGetAttrs(
			attrsWS, function(v) {
				let attrsToChange = { "Wundschwelle": Math.ceil(parseInt(v["KO_Basis"]) / 2) + v["WS_mod_advantages_disadvantages"] };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "non-zero stat"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* AP ('Abenteuerpunkte', Adventure Points) */
const attrsAP = [
	'AP_gesamt',
	'AP_ausgegeben',
];
Object.freeze(attrsAP);

on(attrsAP.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		const caller = "Action Listener for Wound Threshold";
		safeGetAttrs(
			attrsAP, function(v) {
				let attrsToChange = { "AP_verfuegbar": parseInt(v["AP_gesamt"]) - parseInt(v["AP_ausgegeben"]) };

				for (attr in attrsToChange)
				{
					if (!DSAsane(attrsToChange[attr], "int"))
					{
						delete attrsToChange[attr];
						debugLog(caller, `${attr} ließ sich nicht berechnen. Erhaltene Attribute: ${JSON.stringify(v)}.`);
					}
				}
				safeSetAttrs(attrsToChange);
		});
});

/* Calculate Astral Energy base value
This function calculates the base amount of astral energy available just from the stats and a special skill ("Gefäß der Sterne", Vessel of the Stars).

* Input: Object with numerical stats and state of special skill
* Output: Nothing (= error) or number

*/
function calculateAEBase(values) {
	const caller = "calculateAEBase";

	// Boilerplate
	let AE = getDefaultValue("AE");

	// Input Sanitation
	/// Check Requirements
	const requiredProperties = ["MU", "IN", "CH", "sf_gefaess_der_sterne"];
	const reqCheck = checkRequiredProperties(requiredProperties, values);

	if (reqCheck["errors"] > 0) {
		debugLog(caller, `Error: Stopped due to missing properties in input. Nothing returned. Missing properties: ${reqCheck["missing"].join(", ")}.`);
		return;
	}

	/// Check Values
	if (
		!DSAsane(values["MU"], "stat")
		|| !DSAsane(values["IN"], "stat")
		|| !DSAsane(values["CH"], "stat")
	)
	{
		debugLog(caller, "One or more stats are not sane. Stopping.");
		return;
	}

	// Preparation for calculation
	const MU = parseInt(values["MU"]);
	const IN = parseInt(values["IN"]);
	const CH = parseInt(values["CH"]);
	let GdS = 0;

	if (values["sf_gefaess_der_sterne"] === "0") {
		GdS = 0;
	} else {
		GdS = 1;
	}

	// AE calculation
	if (GdS === 0) {
		AE = DSAround((MU + IN + CH) / 2);
	} else {
		AE = DSAround(((MU + IN) / 2) + CH);
	}

	return AE;
}
/* base_values end */
