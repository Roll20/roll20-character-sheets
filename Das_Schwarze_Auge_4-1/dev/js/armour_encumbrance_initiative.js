/* armour_encumbrance_initiative start */
/* Encumbrance from armour */
const attrsEncumbranceArmour = [
	'RSName1',
	'RS_gBE1',
	'RSAktiv1',
	'RSName2',
	'RS_gBE2',
	'RSAktiv2',
	'RS_gBE3',
	'RSAktiv3',
	'RSName3',
	'RS_gBE4',
	'RSAktiv4',
	'RSName4',
	'sf_rustungsgewohnungI',
	'rustungsgewohnungI_rustungen',
	'sf_rustungsgewohnungII',
	'sf_rustungsgewohnungIII',
];
Object.freeze(attrsEncumbranceArmour);

on(attrsEncumbranceArmour.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function(eventInfo) {
		safeGetAttrs(
			attrsEncumbranceArmour,
			function(values) {
				let attrsToChange = calculateArmourEncumbranceFX(values, eventInfo);
				safeSetAttrs(attrsToChange);
		});
});

/* Armour effects
* Calculates encumbrance (BE) from active armour pieces (BE_RG)
* Calculates initiative modifier from encumbrance from active armour pieces (BE_RG_INI)
* Takes Armour Adaptation (RG) into account
* Always outputs values for BE_RG and BE_RG_INI, optionally also for Armour Adaptation special skill attributes

Required attributes: see attrsEncumbranceArmour (global const) and attrsEventInfo (local const)

*/
function calculateArmourEncumbranceFX(values, eventInfo) {
	const caller = "calculateArmourEncumbranceFX";

	// Boilerplate
	let attrsToChange = {
		"BE_RG": 0,
		"BE_RG_INI": 0,
	};

	// Sanity checks
	const attrsEventInfo = [
		'sourceType',
		'sourceAttribute',
		'newValue',
	];
	const valuesSanity = checkRequiredProperties(attrsEncumbranceArmour, values);
	const eventInfoSanity = checkRequiredProperties(attrsEventInfo, eventInfo);
	const errors = valuesSanity["errors"] + eventInfoSanity["errors"];

	if (valuesSanity["errors"] > 0)
	{
		debugLog(caller, "Error: 'values' missing required properties:", valuesSanity["missing"].join(", "));
	}

	if (eventInfoSanity["errors"] > 0)
	{
		debugLog(caller, "Error: 'eventInfo' missing required properties:", eventInfoSanity["missing"].join(", "));
	}

	if (errors > 0)
	{
		return attrsToChange;
	}

	// Structure armour data
	const RGStates = { '1': values["sf_rustungsgewohnungI"], '2': values["sf_rustungsgewohnungII"], '3': values["sf_rustungsgewohnungIII"] }
	const armourSlots = [
		{
			'active': values["RSAktiv1"],
			'name': values["RSName1"],
			'encumbrance': values["RS_gBE1"],
		},
		{
			'active': values["RSAktiv2"],
			'name': values["RSName2"],
			'encumbrance': values["RS_gBE2"],
		},
		{
			'active': values["RSAktiv3"],
			'name': values["RSName3"],
			'encumbrance': values["RS_gBE3"],
		},
		{
			'active': values["RSAktiv4"],
			'name': values["RSName4"],
			'encumbrance': values["RS_gBE4"],
		}
	];

	// Determine old/previous level of Armour Adaptation
	let RG = 0;

	if (RGStates['3'] === "1") {
		RG = 3;
	} else if (RGStates['2'] === "1") {
		RG = 2;
	} else if (RGStates['1'] === "1") {
		RG = 1;
	} else {
		RG = 0;
	}

	// Handle changes to level of Armour Adaptation
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
	let RGBonus = 0;

	/// Starting from the highest level of Armour Adaptation to make the code more readable
	if (RG === 3) {
		RGBonus = 2;
	} else if (RG === 2) {
		RGBonus = 1;
	} else if (RG === 1) {
		// Armour Adaptation I is complicated
		// The special skill can be acquired for different pieces of armour.
		// The user has a textarea to fill with the names of the armours.
		// If we find the same armour as mentioned in that field, apply the bonus.

		// Algorithm for the comparison of armour names with the armours given in Armour Adaptation I:
		// Armour name: Remove all characters except a-zA-Z (these ranges are meant to include German Umlaute and Eszett äöüÄÖÜß), lowercase the string
		// Armour Adaptation I names: Remove all "|", replace all commas, semicolons and linebreaks (\r and \n ...) with |, remove all characters except a-zA-Z| (these ranges are meant to include German Umlaute and Eszett äöüÄÖÜß), lowercase the string, split the string at |
		// See whether any of the active armour pieces matches with Armour Adaptation I armours ...

		// Get armour names
		const armourInvalidCharacters = /[^a-zA-ZäöüÄÖÜß]/g;
		let activeArmourNames = [];

		/// Filter for active armours
		for (let slot of armourSlots) {
			if (slot["active"] === "1")
			{
				activeArmourNames.push(slot["name"]);
			}
		}

		/// Filter for valid characters, lowercase everything
		for (let name in activeArmourNames) {
			activeArmourNames[name] = activeArmourNames[name]
				.replace(armourInvalidCharacters, "")
				.toLowerCase();
		}

		/// Filter invalid names and warn about them
		{
			let unfilteredNamesCount = activeArmourNames.length;
			activeArmourNames = activeArmourNames.filter(Boolean);
			if (unfilteredNamesCount > activeArmourNames.length)
			{
				debugLog(caller, "Warnung: Mindestens ein Rüstungsname ist ungültig, da kein Zeichen aus dem folgenden Zeichenvorrat stammt: a-z, A-Z, ä, ö, ü, Ä, Ö, Ü, ß.");
			}
		}

		// Get names listed under Armour Adaptation I
		const armourAdaptationInvalidCharacters = /[^a-zA-ZäöüÄÖÜß|]/gm;
		const armourAdaptationFieldSeparators = /[,;\r\n]/gm;
		let RGarmours = values["rustungsgewohnungI_rustungen"];

		/// Filter for empty string
		if (RGarmours === "")
		{
			debugLog(caller, "Warnung: Keine Rüstungsnamen für Rüstungsgewöhnung I definiert.");
		}

		/// Remove pipe characters, replace separators with pipe characters, filter for valid characters, lowercase everything, split all names removing empty strings
		RGarmours = RGarmours
			.replace(/\|/g, "")
			.replace(armourAdaptationFieldSeparators, "|")
			.replace(armourAdaptationInvalidCharacters, "")
			.toLowerCase()
			.split("|")
			.filter(Boolean);

		/// Check for "only invalid armour names"
		if (RGarmours.length === 0)
		{
			debugLog(caller, "Warnung: Kein gültiger Rüstungsname für Rüstungsgewöhnung I gefunden, da kein Zeichen aus dem folgenden Zeichenvorrat stammt: a-z, A-Z, ä, ö, ü, Ä, Ö, Ü, ß.");
		}

		// Compare active armours with armours with Armour Adaptation I
		for (let armour of activeArmourNames) {
			if (RGarmours.includes(armour)) {
				RGBonus = 1;
				debugLog(caller, "Rüstungsgewöhnung I: \"" + armour + "\" erhält den Bonus.");
				break;
			}
		}

		if (RGBonus === 0)
		{
			debugLog(caller, "Hinweis: Entweder ist keine Rüstung aktiv, für die eine Rüstungsgewöhnung I vorhanden ist, oder die Rüstungsnamen im Inventar und unter Rüstungsgewöhnung I sind nicht gleich.");
		}
	}

	// Encumbrance calculation
	let encumbrance = 0;
	for (let slot of armourSlots)
	{
		if (slot["active"] === "1")
		{
			encumbrance += parseFloat(slot["encumbrance"]);
		}
	}
	encumbrance = DSAround(roundDecimals(encumbrance, 1));

	/// Encumbrance reduction due to Armour Adaptation
	encumbrance -= RGBonus;
	if (encumbrance < 0)
	{
		encumbrance = 0;
	}
	attrsToChange["BE_RG"] = encumbrance;

	// Initiative reduction due to armour
	let BEINI = encumbrance;

	/// Consider Armour Adaptation 3's special effect
	if (RG === 3)
	{
		BEINI = DSAround(BEINI / 2);
	}
	attrsToChange["BE_RG_INI"] = BEINI;

	return attrsToChange;
}

/* Encumbrance from armour and weight */
const attrsEncumbranceSources = [
	'BE_RG',
	'BE_Last',
	'BE_mod_advantages_disadvantages',
];
Object.freeze(attrsEncumbranceSources);

on(attrsEncumbranceSources.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function(eventInfo) {
		safeGetAttrs(
			attrsEncumbranceSources,
			function(values) {
				// Boilerplate
				const encumbranceMinimum = 0;
				let encumbranceTotal = 0;

				// Calculating the total
				encumbranceTotal += values["BE_RG"];
				encumbranceTotal += parseInt(values["BE_Last"]) | 0;
				encumbranceTotal += values["BE_mod_advantages_disadvantages"];

				let attrsToChange = { "BE": encumbranceTotal };

				safeSetAttrs(attrsToChange);
		});
});

/* Effective encumbrance effects per weapon (type) */
const attrsEffectiveEncumbranceWeapons = [
	'BE',
	'NKW_Aktiv1',
	'NKW_AT_typ1',
	'NKW_PA_typ1',
	'NKW_Aktiv2',
	'NKW_AT_typ2',
	'NKW_PA_typ2',
	'NKW_Aktiv3',
	'NKW_AT_typ3',
	'NKW_PA_typ3',
	'NKW_Aktiv4',
	'NKW_AT_typ4',
	'NKW_PA_typ4',
];
Object.freeze(attrsEffectiveEncumbranceWeapons);

on(attrsEffectiveEncumbranceWeapons.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function(eventInfo) {
		safeGetAttrs(
			attrsEffectiveEncumbranceWeapons,
			function(values) {
				let attrsToChange = {};

				const results = calculateWeaponEncumbranceModifiers(values);
				attrsToChange["be_at_mod"] = results["be_at"];
				attrsToChange["be_pa_mod"] = results["be_pa"];

				safeSetAttrs(attrsToChange);
		});
});

/*
Effective encumbrance effects for the active weapon
This function takes into account the effective encumbrance (eBE) and returns the corresponding modifiers for the AT/PA values based on the active weapon.

Most of the calculation is done within another function, see the comments there.

Input: Object with attribute values for "close combat weapon active" (NKW_Aktiv), "close combat weapon attack combat technique" (NKW_AT_typ), "close combat weapon parry combat technique" (NKW_PA_typ), encumbrance (BE)
Output: Object with attack/parry modifiers "be_at" and "be_pa"

*/
function calculateWeaponEncumbranceModifiers(values) {
	const caller = "calculateWeaponEncumbranceModifiers";

	// Boilerplate
	let weapon = 0;
	let modifiersEncumbrance = {
		"be_at": getDefaultValue("be_at"),
		"be_pa": getDefaultValue("be_pa"),
	};
	const encumbrance = values["BE"];
	const combatWeapons = [
		{
			"active": values["NKW_Aktiv1"],
			"actionTypes": {
				"AT": values["NKW_AT_typ1"],
				"PA": values["NKW_PA_typ1"],
			},
		},
		{
			"active": values["NKW_Aktiv2"],
			"actionTypes": {
				"AT": values["NKW_AT_typ2"],
				"PA": values["NKW_PA_typ2"],
			},
		},
		{
			"active": values["NKW_Aktiv3"],
			"actionTypes": {
				"AT": values["NKW_AT_typ3"],
				"PA": values["NKW_PA_typ3"],
			},
		},
		{
			"active": values["NKW_Aktiv4"],
			"actionTypes": {
				"AT": values["NKW_AT_typ4"],
				"PA": values["NKW_PA_typ4"],
			},
		},
	];

	// Check for active weapon
	for (slot of combatWeapons)
	{
		if (slot["active"] === "1")
		{
			weapon = slot;
			break;
		}
	}

	if (weapon === 0)
	{
		debugLog(caller, `Keine aktive Waffe gefunden. AT/PA-Modifikatoren aus effektiver Behinderung auf Standardwerte gesetzt (${getDefaultValue("be_at")}/${getDefaultValue("be_pa")}).`);
		return modifiersEncumbrance;
	}

	// Input sanitation for active weapon only
	/// In this case, if the input is sane we also grab some data from it we need later on.
	let techniques = {};
	const actionTypes = [
		"AT",
		"PA"
	];
	const patternCombatTechnique = /^@\{(?:AT|PA)_(?<combatTechnique>[^}]+)\}/;

	for (action of actionTypes)
	{
		const attr = "be_" + action.toLowerCase();
		techniques[action] = weapon["actionTypes"][action].match(patternCombatTechnique);
		if (Object.hasOwn(techniques[action], "groups"))
		{
			techniques[action] = techniques[action].groups["combatTechnique"].toLowerCase();
		} else {
			debugLog(caller, `${action}-Kampftechnik der aktiven Waffe nicht gesetzt oder unbekannt: ${weapon["actionTypes"][action]}. ${action}-Modifikator aus effektiver Behinderung auf Standardwert gesetzt (${getDefaultValue(attr)}).`);
			techniques[action] = undefined;
		}
	}

	// Get effective encumbrance values of the combat techniques used for AT/PA
	/// It is possible to wield two weapons with different combat techniques.
	/// This directly leads to the AT value being from another combat technique than the PA value.
	for (action of actionTypes)
	{
		const attr = "be_" + action.toLowerCase();
		if (techniques[action] !== undefined)
		{
			modifiersEncumbrance[attr] = calculateCombatTechniqueEncumbranceModifiers(techniques[action], encumbrance, action);
		}
	}

	/*
	Effective encumbrance effects per combat technique
	This function takes into account the effective encumbrance (eBE) and returns the corresponding modifiers for the AT/PA values.

	Every weapon can be used with at least one combat technique. Most combat techniques have an encumbrance threshold.
	The encumbrance above this threshold is called the effective encumbrance (eBE).
	Each point of effective encumbrance increases first the parry, then the attack penalty.

	Input: string with combatTechnique (as defined in global const), encumbrance (BE)
	Output: Object with attack/parry modifiers "be_at" and "be_pa" (default) or value for either "be_at" or "be_pa"

	*/
	function calculateCombatTechniqueEncumbranceModifiers(combatTechnique, BE, types = "both") {
		const caller = "calculateCombatTechniqueEncumbranceModifiers";

		// Boilerplate
		let eBE = 0;
		let modifiersEncumbrance = {
			"be_at": 0,
			"be_pa": 0,
		};
		combatTechnique = String(combatTechnique);

		// Input sanitation
		/// combatTechnique
		/// This should never happen, but in case the code gets edited in the wrong place ...
		if ( !Object.hasOwn(combatTechniques, combatTechnique) )
		{
			debugLog(caller, `Warnung: Kampftechnik "${combatTechnique}" unbekannt. Berechnung der AT/PA-Modifikatoren aus BE nicht möglich. Standardwert "0" benutzt.`);
			return modifiersEncumbrance;
		}

		/// BE
		/// This should never happen.
		if (
			isNaN(parseInt(BE))
		)
		{
			debugLog(caller, `Warnung: Bei der BE "${String(BE)}" handelt es sich nicht um eine Ganzzahl. Berechnung der AT/PA-Modifikatoren aus BE nicht möglich. Standardwert 0 benutzt.`);
			return modifiersEncumbrance;
		}

		/// Types
		//// Must be either of "AT", "PA" or "both" (default)
		{
			const legalTypes = [
				"AT",
				"PA",
				"both",
			];
			if (!legalTypes.includes(types))
			{
				debugLog(caller, `Angabe der zu berechnenden Aktionstypen ungültig (${types}), Standard verwendet.`);
				types = "both";
			}
		}
		// Calculate eBE
		/// Set eBE to 0 if it's undefined or if it's greater than BE
		/// The undefined check is important, because some weapons have no eBE value
		eBE = combatTechniques[combatTechnique]["ebe"];
		eBE = eBE === undefined ? 0 : Math.max(0, BE + eBE);

		/// Melee AT/PA weapons
		if (
			combatTechniques[combatTechnique]["type"] === "melee"
			&&
			combatTechniques[combatTechnique]["at-only"] === false
		)
		{
			// Since the parry penalty is higher for odd effective encumbrances, using floor/ceil automatically gives the correct values.
			modifiersEncumbrance["be_at"] = -Math.floor(eBE / 2);
			modifiersEncumbrance["be_pa"] = -Math.ceil(eBE / 2);
		} else {
			// Melee AT-only and ranged weapons: AT is reduced.
			modifiersEncumbrance["be_at"] = -eBE;
		}

		// Prepare output according to "types"
		if (types === "AT")
		{
			modifiersEncumbrance = modifiersEncumbrance["be_at"];
		} else if (types === "PA") {
			modifiersEncumbrance = modifiersEncumbrance["be_pa"];
		}

		return modifiersEncumbrance;
	}

	return modifiersEncumbrance;
}
/* armour_encumbrance_initiative end */
