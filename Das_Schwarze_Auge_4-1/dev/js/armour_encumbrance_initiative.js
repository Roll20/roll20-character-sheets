/* armour_encumbrance_initiative start */
on(
"change:rsname1 change:rs_gbe1 change:rsaktiv1 " +
"change:rsname2 change:rs_gbe2 change:rsaktiv2 " +
"change:rsname3 change:rs_gbe3 change:rsaktiv3 " +
"change:rsname4 change:rs_gbe4 change:rsaktiv4 " +
"change:sf_rustungsgewohnungi change:rustungsgewohnungi_rustungen " +
"change:sf_rustungsgewohnungii " +
"change:sf_rustungsgewohnungiii", function(eventInfo) {
		safeGetAttrs([ "RSName1", "RS_gBE1", "RSAktiv1", "RSName2", "RS_gBE2", "RSAktiv2", "RS_gBE3", "RSAktiv3", "RSName3", "RS_gBE4", "RSAktiv4", "RSName4", "sf_rustungsgewohnungI", "rustungsgewohnungI_rustungen", "sf_rustungsgewohnungII", "sf_rustungsgewohnungIII"], function(values) {
				var attrsToChange = calculateRuestungBE(values, eventInfo);
				safeSetAttrs(attrsToChange);
		});
});

// Berechnet die BE der aktiven Rüstungsteile
// benötigt "RS_gBE1", "RSAktiv1", "RS_gBE2", "RSAktiv2", "RS_gBE3", "RSAktiv3", "RS_gBE4", "RSAktiv4", "sf_rustungsgewohnungI", "rustungsgewohnungI_rustungen", "sf_rustungsgewohnungII", "sf_rustungsgewohnungIII"
// wenn bei dem übergebenen Event die aktive Rüstungsgewöhnung 1 geändert wurde, wird auch das übergeben
// Enthält auch die Berechnung der auf die Initiative wirksamen BE aus Rüstung (BE_RG_INI)
function calculateRuestungBE(values, eventInfo) {
	var caller = "calculateRuestungBE";
		var attrsToChange = {};

	// Determine old/previous degree of armour adaptation
	var RG = { '1': values["sf_rustungsgewohnungI"], '2': values["sf_rustungsgewohnungII"], '3': values["sf_rustungsgewohnungIII"] };

	if (RG['3'] === "1") {
		RG = 3;
	} else if (RG['2'] === "1") {
		RG = 2;
	} else if (RG['1'] === "1") {
		RG = 1;
	} else {
		RG = 0;
	}

	// Handle changes to degree of armour adaptation
	if (eventInfo.sourceType === "player") {
		if (eventInfo.sourceAttribute === "sf_rustungsgewohnungi" && eventInfo.newValue === "1") {
			RG = 1;
		} else if (eventInfo.sourceAttribute === "sf_rustungsgewohnungii" && eventInfo.newValue === "1") {
			RG = 2;
		} else if (eventInfo.sourceAttribute === "sf_rustungsgewohnungiii" && eventInfo.newValue === "1") {
			RG = 3;
		} else if (eventInfo.sourceAttribute === "sf_rustungsgewohnungiii" && eventInfo.newValue === "0") {
			RG = 2;
		} else if (eventInfo.sourceAttribute === "sf_rustungsgewohnungii" && eventInfo.newValue === "0") {
			RG = 1;
		} else if (eventInfo.sourceAttribute === "sf_rustungsgewohnungi" && eventInfo.newValue === "0") {
			RG = 0;
		}
	}
	// Populate attrsToChange so we don't forget later on
	switch(RG) {
		case 0:
			attrsToChange["sf_rustungsgewohnungI"] = "0";
			attrsToChange["sf_rustungsgewohnungII"] = "0";
			attrsToChange["sf_rustungsgewohnungIII"] = "0";
			break;
		case 1:
			attrsToChange["sf_rustungsgewohnungI"] = "1";
			attrsToChange["sf_rustungsgewohnungII"] = "0";
			attrsToChange["sf_rustungsgewohnungIII"] = "0";
			break;
		case 2:
			attrsToChange["sf_rustungsgewohnungI"] = "1";
			attrsToChange["sf_rustungsgewohnungII"] = "1";
			attrsToChange["sf_rustungsgewohnungIII"] = "0";
			break;
		case 3:
			attrsToChange["sf_rustungsgewohnungI"] = "1";
			attrsToChange["sf_rustungsgewohnungII"] = "1";
			attrsToChange["sf_rustungsgewohnungIII"] = "1";
			break;
	}

	// Encumbrance Reduction Through Armour Adaptation
	var RGBonus = 0;

	// Armour Adaptation I is complicated
	// The special skill can be acquired for different pieces of armour.
	// The user has a textarea to fill with the names of the armours.
	// If we find the same armour as mentioned in that field, apply the bonus.

	// Algorithm for the comparison of armour names with the armours given in Armour Adaptation I:
	// Armour name: Remove all characters except a-zA-Z (including German Umlaute and Eszett äöüÄÖÜß), lowercase the string
	// Armour Adaptation I names: Remove all "|", replace all commas, semicolons and linebreaks (\r and \n ...) with |, remove all characters except a-zA-Z| (including German Umlaute and Eszett äöüÄÖÜß), lowercase the string, split the string at |
	// See whether any of the active armour pieces matches with Armour Adaptation I armours ...

	if (RG === 1) {
		// Get armour names
		var armours = [];

		for (let name of [
			[ values["RSName1"], values["RSAktiv1"] ],
			[ values["RSName2"], values["RSAktiv2"] ],
			[ values["RSName3"], values["RSAktiv3"] ],
			[ values["RSName4"], values["RSAktiv4"] ] ]) {
			// We do not want to throw warnings for inactive armour pieces later on, so only add active ones
			if (typeof(name[0]) !== 'undefined' && typeof(name[1]) !== 'undefined' && name[1] === "1") {
				armours.push(name[0]);
			}
		}
		for (let name in armours) {
			armours[name] = armours[name]
				.replace(/[^a-zA-ZäöüÄÖÜß|]/g, "")
				.toLowerCase();
		}
		oldLen = armours.length;
		armours = armours.filter(Boolean);
		if (oldLen > armours.length) debugLog(caller, "Warnung: Mindestens ein Rüstungsname ist ungültig, da kein Zeichen aus dem folgenden Zeichenvorrat stammt: a-z, A-Z, ä, ö, ü, Ä, Ö, Ü, ß.");

		// Get names of armour with armour adaptation
		var RGarmours = values["rustungsgewohnungI_rustungen"]
		if (typeof(RGarmours) === 'undefined' || RGarmours === "") debugLog(caller, "Warnung: Keine Rüstungsnamen für Rüstungsgewöhnung I definiert.");
		RGarmours = RGarmours
			.replace(/\|/g, "")
			.replace(/[,;\r\n]/gm, "|")
			.replace(/[^a-zA-ZäöüÄÖÜß|]/gm, "")
			.toLowerCase()
			.split("|")
			.filter(Boolean);
		if (RGarmours.length === 0) debugLog(caller, "Warnung: Kein gültiger Rüstungsnamen für Rüstungsgewöhnung I gefunden, da kein Zeichen aus dem folgenden Zeichenvorrat stammt: a-z, A-Z, ä, ö, ü, Ä, Ö, Ü, ß.");

		// Find the first match and stop
		for (let armour of armours) {
			if (RGarmours.indexOf(armour) > -1) {
				RGBonus = 1;
				debugLog(caller, "Rüstungsgewöhnung I: \"" + armour + "\" erhält den Bonus.");
				break;
			}
		}

		if(RGBonus === 0) debugLog(caller, "Hinweis: Entweder ist keine Rüstung aktiv, für die eine Rüstungsgewöhnung I vorhanden ist, oder der Rüstungsname ist falsch geschrieben.");
	} else if (RG === 2) {
		RGBonus = 1;
	} else if (RG === 3) {
		RGBonus = 2;
	}

	// Encumbrance calculation
		var totalBe = 0;
		for (let i = 1; i <= 4; i++) {
				if (values["RSAktiv" + i] === "1") {
						totalBe += parseFloat(values["RS_gBE" + i]);
				}
		}

	totalBe -= RGBonus;
		if (totalBe < 0) {
				totalBe = 0;
		}

		totalBe = DSAround(roundDecimals(totalBe, 1));

		attrsToChange["BE_RG"] = totalBe;

	// Initiative reduction due to armour
	var BEINI = 0;

	BEINI = totalBe;

	if (RG === 3) {
		BEINI = DSAround(BEINI / 2);
	}
	attrsToChange["BE_RG_INI"] = BEINI;

		return attrsToChange;
}

// Berechne BE-Basis aus dem gesamten Rüstungs BE und der BE durch Last
on("change:be_rg change:be_last", function(eventInfo) {
		safeGetAttrs(["BE_RG", "BE_Last"], function(values) {
				var beTaw = calculateBEBasis(values);
				safeSetAttrs({ "BE": beTaw });
		});
});

// Berechnet beTaW Wert
// Benötigt GesBE und BE_Last
function calculateBEBasis(values) {
		var beTaw = 0;
		if (values["BE_RG"]) {
				beTaw += parseInt(values["BE_RG"]);
		}
		if (values["BE_Last"]) {
				beTaw += parseInt(values["BE_Last"]);
		}
		return beTaw;
}

// Berechne Waffenspezifische BE
on(
"change:be " +
"change:nkw_aktiv1 change:nkw_at_typ1 change:nkw_pa_typ1 " +
"change:nkw_aktiv2 change:nkw_at_typ2 change:nkw_pa_typ2 " +
"change:nkw_aktiv3 change:nkw_at_typ3 change:nkw_pa_typ3 " +
"change:nkw_aktiv4 change:nkw_at_typ4 change:nkw_pa_typ4", function(eventInfo) {
		safeGetAttrs([ "BE", "NKW_Aktiv1", "NKW_AT_typ1", "NKW_PA_typ1", "NKW_Aktiv2", "NKW_AT_typ2", "NKW_PA_typ2", "NKW_Aktiv3", "NKW_AT_typ3", "NKW_PA_typ3", "NKW_Aktiv4", "NKW_AT_typ4", "NKW_PA_typ4" ], function(values) {
				var weaponBE = calculateWeaponBE(values);

				safeSetAttrs({ be_at_mod: weaponBE.be_at, be_pa_mod: weaponBE.be_pa });
		});
});

/*
Input: string with combatTechnique (as defined in const), BE ("Behinderung"/encumbrance)
Output: Object with properties "be_at" and "be_pa"

This function takes into account the effective encumbrance (eBE) and returns the corresponding modifiers for the AT/PA values.
*/
function calculateWeaponBEModifiers(combatTechnique, BE) {
	var caller = "calculateWeaponBEModifiers";
	var eBE = 0;
	var BEModifiers = { "be_at": 0, "be_pa": 0 };
	combatTechnique = String(combatTechnique);

	// This should never happen, but in case the code gets edited in the wrong place ...
	if ( !Object.hasOwn(combatTechniques, combatTechnique) ) {
		debugLog(caller, "Warnung: Kampftechnik \"" + combatTechnique + "\" unbekannt. Berechnung der AT/PA-Modifikatoren aus BE nicht möglich. Standardwert \"0\" benutzt.");
		return BEModifiers;
	}

	// Checking BE ...
	if ( isNaN(parseInt(BE)) ) {
		debugLog(caller, "Warnung: Bei der BE \"" + String(BE) + "\" handelt es sich nicht um eine Ganzzahl. Berechnung der AT/PA-Modifikatoren aus BE nicht möglich. Standardwert \"0\" benutzt.");
		return BEModifiers;
	}

	// Calculate eBE
	// Set eBE to 0 if it's undefined or if it's greater than BE
	eBE = combatTechniques[combatTechnique][ "ebe" ];
	eBE = eBE === undefined ? 0 : Math.max(0, BE + eBE);

	// Melee AT/PA weapons: The remainder of odd eBEs goes to PA.
	// Melee AT-only and ranged weapons: AT is reduced.
	if (combatTechniques[combatTechnique][ "type" ] === "melee" && combatTechniques[combatTechnique][ "at-only" ] === false) {
		BEModifiers[ "be_at" ] = Math.floor(eBE / 2);
		BEModifiers[ "be_pa" ] = Math.ceil(eBE / 2);
	} else {
		BEModifiers[ "be_at" ] = eBE;
	}

	return BEModifiers;
}
/* 
		Methode die die waffenspezifische BE berechnet und nach AT und PA getrennt zurückgibt. 
		Benötigt
		NKW_Aktiv 1-4
		NKW_AT_typ 1-4
		NKW_PA_typ 1-4
		BE
*/
function calculateWeaponBE(values) {
		var weapon = 0;
		var BEModifiers = { "be_at": 0, "be_pa": 0 };

		if (values["NKW_Aktiv1"] === "1") {
				weapon = 1;
		} else if (values["NKW_Aktiv2"] === "1") {
				weapon = 2;
		} else if (values["NKW_Aktiv3"] === "1") {
				weapon = 3;
		} else if (values["NKW_Aktiv4"] === "1") {
				weapon = 4;
		} else {
				return BEModifiers;
		}
		var baseBE = values["BE"];
		var atTyp = values["NKW_AT_typ" + weapon];
		var paTyp = values["NKW_PA_typ" + weapon];
		var combatTechnique = {};

		if (atTyp && atTyp !== "0" && atTyp !== 0) {
				combatTechnique[ "AT" ] = atTyp.match("@\{AT_([^}]+)\}")[1].toLowerCase();
		} 
		if (paTyp && paTyp !== "0" && paTyp !== 0) {
				combatTechnique[ "PA" ] = paTyp.match("@\{PA_([^}]+)\}")[1].toLowerCase();
		}

		if (combatTechnique[ "AT" ] === combatTechnique[ "PA" ]) {
				BEModifiers = calculateWeaponBEModifiers(combatTechnique["AT"], baseBE);
		} else {
				BEModifiers[ "be_at" ] = calculateWeaponBEModifiers(combatTechnique["AT"], baseBE)["be_at"];
				BEModifiers[ "be_pa" ] = calculateWeaponBEModifiers(combatTechnique["PA"], baseBE)["be_pa"];
		}

		return BEModifiers;
}
/* armour_encumbrance_initiative end */
