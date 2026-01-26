/* migration start */
/*
 this list has to be always ordered ascending in order to apply the migration steps in the correct order
*/
const versionsWithMigrations = [
		20190427,
		20200809,
		20210413,
		20210718,
		20211010,
		20220116,
		20220604,
		20220821,
		20230618,
		20240414,
		20240510,
		20240519,
		20241002,
		20250122,
		20250413,
];

/*
## From version 20171014 to 20190427
* Gifts and meta-talents were changed
*/
function migrateTo20190427 (migrationChain) {
	const caller = "migrateTo20190427";
	debugLog(caller, "started");

	getSectionIDs("GabenTalente", function(gabenIDs) {
		getSectionIDs("MetaTalente", function(metatalenteIDs) {
			const giftsConversion = {
				"@{MU}": "mu",
				"@{KL}": "kl",
				"@{IN}": "in",
				"@{CH}": "ch",
				"@{FF}": "ff",
				"@{GE}": "ge",
				"@{KO}": "ko",
				"@{KK}": "kk",
				"---": "nothing",
				"Empathie": "empathie",
				"Gefahreninstinkt": "gefahreninstinkt",
				"Geräuschhexerei": "geraeuschhexerei",
				"Kräfteschub/Talentschub": "kraefteschub/talentschub",
				"Magiegespür": "magiegespuer",
				"Prophezeien": "prophezeien",
				"Tierempathie": "tierempathie",
				"Zwergennase": "zwergennase",
			};
			const metaTalentConversion = {
				"@{MU}": "mu",
				"@{KL}": "kl",
				"@{IN}": "in",
				"@{CH}": "ch",
				"@{FF}": "ff",
				"@{GE}": "ge",
				"@{KO}": "ko",
				"@{KK}": "kk",
				"---": "nothing",
				"Ansitzjagd": "ansitzjagd",
				"Hetzjagd": "hetzjagd",
				"Kräutersuchen": "kraeutersuchen",
				"Nahrungsammeln": "nahrungsammeln",
				"Pirschjagd": "pirschjagd",
				"Speerfischen": "speerfischen",
				"Tierfallenstellen": "tierfallenstellen",
				"Wachehalten": "wachehalten",
			};
			const gaben = {
				"nothing": [ ["---", "---", "---"], "nothing" ],
				"empathie": [ ["mu", "in", "in"], "Empathie" ],
				"gefahreninstinkt": [ ["kl", "in", "in"], "Gefahreninstinkt" ],
				"geraeuschhexerei": [ ["in", "ch", "ko"], "Geräuschhexerei" ],
				"kraefteschub/talentschub": [ ["mu", "in", "ko"], "Kräfteschub/Talentschub" ],
				"magiegespuer": [ ["mu", "in", "in"], "Magiegespür" ],
				"prophezeien": [ ["in", "in", "ch"], "Prophezeien" ],
				"tierempathie": [ ["mu", "in", "ch"], "Tierempathie" ],
				"zwergennase": [ ["in", "in", "ff"], "Zwergennase" ],
			};
			const metatalente = {
				"nothing": [ ["---", "---", "---"], "nothing" ],
				"ansitzjagd": [ ["mu", "in", "ge"], "Ansitzjagd" ],
				"hetzjagd": [ ["mu", "in", "ge"], "Hetzjagd" ],
				"kraeutersuchen": [ ["mu", "in", "ff"], "Kräutersuchen" ],
				"nahrungsammeln": [ ["mu", "in", "ff"], "Nahrungsammeln" ],
				"pirschjagd": [ ["mu", "in", "ge"], "Pirschjagd" ],
				"speerfischen": [ ["mu", "in", "ge"], "Speerfischen" ],
				"tierfallenstellen": [ ["kl", "in", "ff"], "Tierfallenstellen" ],
				"wachehalten": [ ["mu", "in", "ko"], "Wachehalten" ],
			};

			const attrsToGet = ["mu", "kl", "in", "ch", "ff", "ge", "ko", "kk"];
			// GIFTS MIGRATION
			if(gabenIDs.length === 0)
			{
				debugLog(caller, "No gifts found, nothing to migrate.");
			} else {
				debugLog(caller, "Found old gifts, continuing ...");
				for(let i = 0; i < gabenIDs.length; i++)
				{
					attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_TalentName");
					attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_Eigenschaft1");
					attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_Eigenschaft2");
					attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_Eigenschaft3");
					attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_TaW");
					attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_SE");
				}
			}

			// META-TALENTS MIGRATION
			if(metatalenteIDs.length === 0)
			{
				debugLog(caller, "No meta-talents found, nothing to migrate.");
			} else {
				debugLog(caller, "Found old meta-talents, continuing ...");
				for(let i = 0; i < metatalenteIDs.length; i++)
				{
					attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_TalentName");
					attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_Eigenschaft1");
					attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_Eigenschaft2");
					attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_Eigenschaft3");
					attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_TaW");
					attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_SE");
				}
			}

			safeGetAttrs(attrsToGet, function(v) {
				debugLog(caller, "Attributes gotten", v);

				// Gifts
				const defaultGiftTaW = 3;
				let update = {};

				for(let i = 0; i < gabenIDs.length; i++)
				{
					const newrow = generateRowID();
					const current = gabenIDs[i];
					const prefixNew = "repeating_Gaben_" + newrow;
					const prefixOld = "repeating_GabenTalente_" + current;

					// Gather data
					// Updating the name will set the stats automatically
					// To prevent overwriting of custom stats check that the RAW stats are used
					// Need to check that the three correct ones are used, order irrelevant
					// Comparison made easy by taking all three stats, sorting them alphabetically and then concatenating them into one string -> simple string comparison will reveal whether the same stats are used (order not important)
					const gabeStats = gaben[giftsConversion[v[prefixOld + "_TalentName"]]][0].sort().join("");
					const gabeStatsOld = [giftsConversion[v[prefixOld + "_Eigenschaft1"]], giftsConversion[v[prefixOld + "_Eigenschaft2"]], giftsConversion[v[prefixOld + "_Eigenschaft3"]]].sort().join("");

					if(gabeStats == gabeStatsOld)
					{
						update[prefixNew + "_Name_Gabe"] = giftsConversion[v[prefixOld + "_TalentName"]];
						update[prefixNew + "_Name_Gabe_Zusatz"] = "";
					} else {
						update[prefixNew + "_Name_Gabe_Zusatz"] = "urspr. " + v[prefixOld + "_TalentName"] + "; Eigenschaften für Probe aber nicht Standard. ";
						debugLog(caller, "Found old " + v[prefixOld + "_TalentName"] + " containing non-standard stats. No predefined gift set. Old data preserved.");
					}

					if(v[prefixOld + "_SE"] == "on")
					{
						update[prefixNew + "_Name_Gabe_Zusatz"] += "[x] SE";
						debugLog(caller, "Found old " + v[prefixOld + "_TalentName"] + " marked as having a special experience (SE). This data will no longer be kept in the character sheet as it is only relevant for character advancement. Old data preserved. Please move to notes.");
					} else {
						update[prefixNew + "_Name_Gabe_Zusatz"] += "[ ] SE";
					}

					update[prefixNew + "_Name_Gabe_Anzeige"] = giftsConversion[v[prefixOld + "_TalentName"]];
					update[prefixNew + "_Eigenschaft1"] = giftsConversion[v[prefixOld + "_Eigenschaft1"]];
					update[prefixNew + "_Eigenschaft2"] = giftsConversion[v[prefixOld + "_Eigenschaft2"]];
					update[prefixNew + "_Eigenschaft3"] = giftsConversion[v[prefixOld + "_Eigenschaft3"]];
					update[prefixNew + "_hiddenEigenschaft1"] = v[giftsConversion[v[prefixOld + "_Eigenschaft1"]]];
					update[prefixNew + "_hiddenEigenschaft2"] = v[giftsConversion[v[prefixOld + "_Eigenschaft2"]]];
					update[prefixNew + "_hiddenEigenschaft3"] = v[giftsConversion[v[prefixOld + "_Eigenschaft3"]]];

					if(v[prefixOld + "_TaW"] === "")
					{
						update[prefixNew + "_TaW"] = defaultGiftTaW;
					} else {
						update[prefixNew + "_TaW"] = parseInt(v[prefixOld + "_TaW"]);
					}
				}
				debugLog(caller, "Gifts completed.", update);

				// Metatalents
				const defaultMetaTaW = 0;

				for(let i = 0; i < metatalenteIDs.length; i++)
				{
					const newrow = generateRowID();
					const current = metatalenteIDs[i];
					const prefixNew = "repeating_Metatalente201904_" + newrow;
					const prefixOld = "repeating_MetaTalente_" + current;

					// Gather data
					// Updating the name will set the stats automatically
					// To prevent overwriting of custom stats check that the RAW stats are used
					// Need to check that the three correct ones are used, order irrelevant
					// Comparison made easy by taking all three stats, sorting them alphabetically and then concatenating them into one string -> simple string comparison will reveal whether the same stats are used (order not important)
					const metatalentStats = metatalente[metaTalentConversion[v[prefixOld + "_TalentName"]]][0].sort().join("");
					const metatalentStatsOld = [metaTalentConversion[v[prefixOld + "_Eigenschaft1"]], metaTalentConversion[v[prefixOld + "_Eigenschaft2"]], metaTalentConversion[v[prefixOld + "_Eigenschaft3"]]].sort().join("");

					if(metatalentStats == metatalentStatsOld)
					{
						update[prefixNew + "_Name_Metatalent"] = metaTalentConversion[v[prefixOld + "_TalentName"]];
						update[prefixNew + "_Name_Metatalent_Eigen"] = "";
					} else {
						update[prefixNew + "_Name_Metatalent_Eigen"] = "urspr. " + v[prefixOld + "_TalentName"] + "; Eigenschaften für Probe aber nicht Standard. ";
						debugLog(caller, "Found old " + v[prefixOld + "_TalentName"] + " containing non-standard stats. No predefined meta-talent set. Old data preserved.");
					}

					if(v[prefixOld + "_SE"] == "on")
					{
						update[prefixNew + "_Name_Metatalent_Eigen"] += "[x] SE";
						debugLog(caller, "Found old " + v[prefixOld + "_TalentName"] + " marked as having a special experience (SE). This data will no longer be kept in the character sheet as SEs for metatalents are not RAW and they are only relevant for character advancement. Old data preserved. Please move to notes.");
					} else {
						update[prefixNew + "_Name_Metatalent_Eigen"] += "[ ] SE";
					}

					update[prefixNew + "_Name_Metatalent_Anzeige"] = metaTalentConversion[v[prefixOld + "_TalentName"]];
					update[prefixNew + "_Eigenschaft1"] = metaTalentConversion[v[prefixOld + "_Eigenschaft1"]];
					update[prefixNew + "_Eigenschaft2"] = metaTalentConversion[v[prefixOld + "_Eigenschaft2"]];
					update[prefixNew + "_Eigenschaft3"] = metaTalentConversion[v[prefixOld + "_Eigenschaft3"]];
					update[prefixNew + "_hiddenEigenschaft1"] = v[metaTalentConversion[v[prefixOld + "_Eigenschaft1"]]];
					update[prefixNew + "_hiddenEigenschaft2"] = v[metaTalentConversion[v[prefixOld + "_Eigenschaft2"]]];
					update[prefixNew + "_hiddenEigenschaft3"] = v[metaTalentConversion[v[prefixOld + "_Eigenschaft3"]]];

					if(v[prefixOld + "_TaW"] === "")
					{
						update[prefixNew + "_TaW"] = defaultMetaTaW;
					} else {
						update[prefixNew + "_TaW"] = parseInt(v[prefixOld + "_TaW"]);
					}
				}
				debugLog(caller, "Metatalents completed.", update);

				// Create new row(s)
				safeSetAttrs(update, {}, function() {
					callNextMigration(migrationChain);
				});
			});
		});
	});
}

/*
	Migration steps:
	- if more than one close range weapon is active, only keep the first one of them as active
	- if no close range weapon is active, set the first one active
	- calculate attack value for "Peitsche" talent
	- calculate fighting values
	- set shield_pa and parryweapon_pa to 0
	- set shield_pa_available and parryweapon_pa_available to "0"
	- change name of sf Ruestungsgewoehnung II to correct "sf_rustungsgewohnungII" instead of "sf_rustungsgewonungII"
	- calculate BE from armor
	- calculate BE modifications for weapons
*/
function migrateTo20200809(migrationChain) {
	const caller = "migrateTo20200809";
	debugLog(caller, "started");

	safeGetAttrs(
		[
			"NKW_Aktiv1", "NKW_Aktiv2", "NKW_Aktiv3", "NKW_Aktiv4", "TaW_peitsche", "ATbasis",
			"RS_gBE1", "rs1_rg1", "RS_gBE2", "rs2_rg1", "RS_gBE3", "rs3_rg1", "RS_gBE4", "rs4_rg1",
			"RS_Aktiv1", "RS_Aktiv2", "RS_Aktiv3", "RS_Aktiv4", "BE_RG", "BE_Last", "sf_rustungsgewohnungI", "sf_rustungsgewonungII", "sf_rustungsgewohnungIII",
			"BE_TaW", "NKW_AT_typ1", "NKW_PA_typ1", "NKW_AT_typ2", "NKW_PA_typ2",
			"NKW_AT_typ3", "NKW_PA_typ3", "NKW_AT_typ4", "NKW_PA_typ4",
		], function(v) {
		debugLog(caller, "Attributes gotten", v);

		let attrsToChange = {};
		let activeCount = 0;
		for (let i = 1; i <= 4; i++)
		{
			if (v["NKW_Aktiv" + i] === "1")
			{
				activeCount += 1;
			}
			if (activeCount > 1)
			{
				attrsToChange["NKW_Aktiv" + i] = "0";
			}
		}
		if (activeCount === 0)
		{
			attrsToChange["NKW_Aktiv1"] = "1";
		}

		let peitscheAT = 0;
		if (v["TaW_peitsche"])
		{
			peitscheAT = parseInt(v["ATbasis"]) + parseInt(v["TaW_peitsche"]);
		}
		attrsToChange["AT_peitsche"] = peitscheAT;

		if (v["sf_rustungsgewonungII"] === "1")
		{
			attrsToChange["sf_rustungsgewohnungII"] = "1";
		}

		// take calculated values into "v" so that they are available to following computation steps
		Object.assign(v, attrsToChange);

		const calculatedRuestungBE = calculateRuestungBE(v, {});
		// apply calculated values to attrsToChange
		Object.assign(attrsToChange, calculatedRuestungBE);

		let beTaw = 0;
		// take BE_RG from calculated values
		if (calculatedRuestungBE["BE_RG"]) {
			beTaw += parseInt(calculatedRuestungBE["BE_RG"]);
		}
		if (v["BE_Last"]) {
			beTaw += parseInt(v["BE_Last"]);
		}
		attrsToChange["BE_TaW"] = beTaw;
		v["BE_TaW"] = beTaw;

		const weaponBE = calculateWeaponBE(v);
		attrsToChange["be_at_mod"] = weaponBE.be_at;
		attrsToChange["be_pa_mod"] = weaponBE.be_pa;

		debugLog(caller, "attrsToChange", attrsToChange);

		safeSetAttrs(attrsToChange, {}, function(){
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Check for shield attack availability
	- Update wound modifiers
	- Update initiative modifiers from the main (melee) weapon
	- Calculate initiative base and initiative dice based on three special skills (Kampfgespür, Kampfreflexe, Klingentänzer)
*/
function migrateTo20210413(migrationChain) {
	const caller = "migrateTo20210413";
	debugLog(caller, "started");

	safeGetAttrs(["activeShieldRowId"], function(outerValues) {
		debugLog(caller, "Attributes gotten (outer)", outerValues);
		const variablesToGet =
		[
			"sf_schildkampfI", "sf_schildkampfII", "sf_schmutzigetricks", "sf_knaufschlag",
			"KK_Basis", "KK_mod",
			"AT_raufen",
			"NKW_Aktiv1", "NKW1_Schwellenwert", "NKW1_SchwellenwertKK",
			"NKW_Aktiv2", "NKW2_Schwellenwert", "NKW2_SchwellenwertKK",
			"NKW_Aktiv3", "NKW3_Schwellenwert", "NKW3_SchwellenwertKK",
			"NKW_Aktiv4", "NKW4_Schwellenwert", "NKW4_SchwellenwertKK",

			"wound_kopf1", "wound_kopf2", "wound_kopf3",
			"wound_brust1", "wound_brust2", "wound_brust3",
			"wound_bauch1", "wound_bauch2", "wound_bauch3",
			"wound_RA1", "wound_RA2", "wound_RA3",
			"wound_LA1", "wound_LA2", "wound_LA3",
			"wound_RB1", "wound_RB2", "wound_RB3",
			"wound_LB1", "wound_LB2", "wound_LB3",

			"inibasis", "inizugek",
			"INIModNKW1", "INIModNKW2", "INIModNKW3", "INIModNKW4",
			"sf_kampfgespur", "sf_kampfreflexe", "sf_klingentanzer",
			"BE_TaW",
		];
		// Updates for shield attack
		const activeShieldRowId = outerValues["activeShieldRowId"];

		// Wenn es ein aktives Schild (oder Parierwaffe) gibt, möchten wir auch dessen Werte mit laden
		if (activeShieldRowId) {
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_at_mod");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_pa_mod");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_type");
		}

		safeGetAttrs(variablesToGet, function(innerValues) {
			debugLog(caller, "Attributes gotten (inner)", innerValues);
			/*
				* KK might be ill-defined right now (NaN)
				* Reason: sheet:opened recalculates KK, but requires KK_mod_wounds
				* KK_mod_wounds is existing at that point
				* Make up our own little KK here for migration purposes
			*/
			innerValues["KK"] = Math.max(0, parseInt(innerValues["KK_Basis"]) + parseInt(innerValues["KK_mod"]));
			let attrsToChange = {};

			for (let i = 1; i <= 4; i++)
			{
					attrsToChange["NKW" + i + "_SB"] = calculateTpKKModFromValuesAndWeaponNumber(innerValues, i);
			}

			const result = calculateShieldAttack(innerValues, activeShieldRowId);

			attrsToChange["shield_at_mod"] = result.shieldAtMod;
			attrsToChange["shield_at_available"] = result.shieldAtAvailable;

			// Updates for wound modifiers
			const mods = calculateWoundModifiers(innerValues);
			Object.assign(attrsToChange, {
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

			attrsToChange["shield_at"] = Math.max(0, parseInt(innerValues["AT_raufen"]) + parseInt(attrsToChange["AT_mod_wounds"]));

			// Updates for INI modifiers
			// Set INI modifier from (main) weapon
			let weaponini = 0;
			for (let weapon = 1; weapon <= 4; weapon++)
			{
				if (DSAsane(innerValues["INIModNKW" + weapon], "ini-mod-weapon"))
				{
					debugLog(caller, "INIModNKW" + weapon, "is", innerValues["INIModNKW" + weapon]);
					weaponini = parseInt(innerValues["INIModNKW" + weapon]);
				}
			}
			attrsToChange["INI_mod_hauptwaffe"] = weaponini;

			// Calculate initiative base considering special skills and encumbrance
			let inibasis2 = parseInt(innerValues['inibasis']) + parseInt(innerValues.inizugek) + parseInt(attrsToChange["IB_mod_wounds"]);

			// Kampfreflexe is a prerequisite for the others, so stop if not active
			let IBbonus = 0;
			let INIdicecount = "1";
			if (innerValues.sf_kampfreflexe !== "0" && innerValues.BE_TaW <= 4)
			{
				IBbonus += 4;
				if (innerValues.sf_kampfgespur !== "0" && innerValues.BE_TaW <= 4)
				{
					IBbonus += 2;
					if (innerValues.sf_klingentanzer !== "0" && innerValues.BE_TaW <= 2)
					{
						INIdicecount = "2";
					} else {
						INIdicecount = "1";
					}
				}
			}

			inibasis2 += IBbonus;
			inibasis2 = Math.max(0, inibasis2);

			attrsToChange["inibasis2"] = inibasis2;
			attrsToChange["INI_dice_count"] = INIdicecount;

			debugLog(caller, "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange, {}, function(){
				callNextMigration(migrationChain);
			});
		});
	});
}

/*
## From version 20210413 to 20210718
* Reorganisation of encumbrance

Old:
Encumbrance from armour
	Ges_BE
Encumbrance from equipment weight
	BE_Last
Sum of encumbrance from armor and encumbrance from equipment weight
	BE_TaW
Encumbrance for initiative calculation
	not existing

New:
Encumbrance from armour
	BE_RG
Encumbrance from equipment weight
	BE_Last
Sum of encumbrance from armor and encumbrance from equipment weight
	BE
Encumbrance from armour for initiative calculation
	BE_RG_INI

Dummy attribute for display of value is not used anymore, BE used instead
*/
function migrateTo20210718 (migrationChain) {
	const caller = "migrateTo20210718";
	debugLog(caller, "started");

	const requirements = [
		"Ges_BE",
		"BE_Last",
		"BE_TaW",
		"RSName1", "RS_gBE1", "RSAktiv1",
		"RSName2", "RS_gBE2", "RSAktiv2",
		"RSName3", "RS_gBE3", "RSAktiv3",
		"RSName4", "RS_gBE4", "RSAktiv4",
		"sf_rustungsgewohnungI", "rustungsgewohnungI_rustungen",
		"sf_rustungsgewohnungII",
		"sf_rustungsgewohnungIII"
	];

	const defaultValue = 0;

	safeGetAttrs(requirements, function(values) {
		results = checkRequiredProperties(requirements, values);
		if (results["errors"] >= 1)
		{
			debugLog(caller, "Missing properties: '" + results["missing"].toString() + "'. Using default values. 0 for 'Ges_BE', 'BE_Last', 'BE_TaW' and 'sf_rustungsgewohnungIII'.");
			for (let req of requirements)
			{
				if (!Object.hasOwn(values, req))
				{
					values[req] = defaultValue;
				}
			}
		}
		// Check sanity
		let reqsToCheck = requirements.slice(0,3);
		for (let req of reqsToCheck)
		{
			if (!DSAsane(values[req], "encumbrance"))
			{
				debugLog(caller, "'" + req + "' not sane, set to default value (" + defaultValue + ").");
				values[req] = defaultValue;
			}
		}

		let attrsToChange = {};
		attrsToChange["BE_RG"] = parseInt(values["Ges_BE"]);
		attrsToChange["BE_Last"] = parseInt(values["BE_Last"]);
		attrsToChange["BE"] = parseInt(values["Ges_BE"]) + parseInt(values["BE_Last"]);
		attrsToChange["BE_RG_INI"] = calculateRuestungBE(values, {"sourceType": "migration"})["BE_RG_INI"];

		debugLog(caller, "Gathering new values complete:", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function() {
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Initialize "new" attributes LE to LEAktuell, AU to AusAktuell, AE to ASPAktuell, KE to KEAktuell
*/
function migrateTo20211010(migrationChain) {
	const caller = "migrateTo20211010";
	debugLog(caller, "started");

	safeGetAttrs([
			"LEAktuell", "AusAktuell", "ASPAktuell", "KEAktuell"
			], function(v) {

		let attrsToChange = {};
		attrsToChange["LE"] = v["LEAktuell"];
		attrsToChange["AU"] = v["AusAktuell"];
		attrsToChange["AE"] = v["ASPAktuell"];
		attrsToChange["KE"] = v["KEAktuell"];

		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function(){
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Initialize new attributes for critical success/failure to default
	- Build beta roll button ability calls
*/
function migrateTo20220116(migrationChain) {
	const caller = "migrateTo20220116";
	debugLog(caller, "started");

	const results = calcCritLevels({'Tollpatsch': 0, 'wilde Magie': 0});
	let attrsToChange = {
		'cs_talent': results['talent']['success'],
		'cf_talent': results['talent']['failure'],
		'cs_kampf_at': results['kampf_at']['success'],
		'cf_kampf_at': results['kampf_at']['failure'],
		'cs_kampf_pa': results['kampf_pa']['success'],
		'cf_kampf_pa': results['kampf_pa']['failure'],
		'cs_kampf_fk': results['kampf_fk']['success'],
		'cf_kampf_fk': results['kampf_fk']['failure'],
		'cs_zauber': results['zauber']['success'],
		'cf_zauber': results['zauber']['failure'],
		'cs_ritual': results['ritual']['success'],
		'cf_ritual': results['ritual']['failure']
	}

	// Build list of attributes
	let attrsToGet = ["character_name"];
	let ebeTalents = []
	for(let talent of talents_ebe)
	{
		ebeTalents.push(talent + "-ebe");
	}
	for(let attr of [].concat(talents, ebeTalents, spells))
	{
		attrsToGet.push(attr + "_action");
	}
	safeGetAttrs(attrsToGet, function(v) {
		for (let attr of attrsToGet)
		{
			// No action buttons for character name and combat techniques required
			if (attr.match("t_ka_") || attr === "character_name") continue;
			attrsToChange[attr] = "%{" + v["character_name"] + "|" + attr.replace(/_action$/gm, "") + "-action}";
		}

		attrsToChange["eidsegen_action"] = "%{" + v["character_name"] + "|eidsegen-action}";

		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function(){
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Use new attributes for spell "Visibili Vanitar"
*/
function migrateTo20220604(migrationChain) {
	const caller = "migrateTo20220604";
	debugLog(caller, "started");

	const attrsToGet = [
		"zauber_visibli",
		"z_visibli_action",
		"Spez_visibli",
		"ZfW_visibli"
	];

	let attrsToChange = {};

	safeGetAttrs(attrsToGet, function(v, missingAttrs, badDefAttrs) {
		debugLog(caller, "values of safeGetAttrs", v, "missingAttrs", missingAttrs, "badDefAttrs", badDefAttrs);
		for (let attr of attrsToGet)
		{
			if (missingAttrs.includes(attr))
			{
				break;
			}
			if (attr.match("visibli"))
			{
				const newAttr = attr.replace(/visibli/gm, "visibili");
				if (attr.match("z_visibli_action"))
				{
					attrsToChange[newAttr] = v[attr].replace(/visibli/gm, "visibili");
				} else {
					attrsToChange[newAttr] = v[attr];
				}
				if (attr.match("Spez_visibli") && v[attr] === 0)
				{
					attrsToChange[newAttr] = "";
				}
			}
		}

		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function(){
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Initialize attribute "sheet_initialized"
*/
function migrateTo20220821(migrationChain) {
	const caller = "migrateTo20220821";
	debugLog(caller, "started");

	const attrsToChange = { "sheet_initialized": true };

	debugLog(caller, "attrsToChange", attrsToChange);
	safeSetAttrs(attrsToChange, {}, function(){
		callNextMigration(migrationChain);
	});
}

/*
	Migration steps:
	- Initialize attributes "AT_Aktiv_TaW", "PA_Aktiv_TaW", "k_mod_left_hand", "parryweapon_at", "TP_W_Aktiv", "TP_Bonus_Aktiv"
*/
function migrateTo20230618(migrationChain) {
	const caller = "migrateTo20230618";
	debugLog(caller, "started");

	let attrsToChange =	{ "AT_Aktiv_TaW": "0", "PA_Aktiv_TaW": "0", "k_mod_left_hand": 9, "parryweapon_at": 0, "TP_W_Aktiv": 1, "TP_Bonus_Aktiv": 0 };

	const outerAttrsToGet = [
		// Attribute nur für AT_Aktiv_TaW, PA_Aktiv_TaW und parryweapon_at
		"activeShieldRowId"
	];
	safeGetAttrs(outerAttrsToGet, function(outerValues) {
		let innerAttrsToGet = [
			// Attribute für mehrere Initialisierungen
			"NKW_Aktiv1", "NKW_Aktiv2", "NKW_Aktiv3", "NKW_Aktiv4",
			"sf_linkhand", "sf_beidhandigerkampfI", "sf_beidhandigerkampfII", "vorteil_beidhaendig",
			// Attribute nur für AT_Aktiv_TaW, PA_Aktiv_TaW und parryweapon_at
			"NKW_AT_typ1", "NKW_AT_typ2", "NKW_AT_typ3", "NKW_AT_typ4",
			"NKW_PA_typ1", "NKW_PA_typ2", "NKW_PA_typ3", "NKW_PA_typ4",
			"TaW_anderthalbhander", "TaW_dolche", "TaW_fechtwaffen", "TaW_hiebwaffen",
			"TaW_infanteriewaffen", "TaW_kettenstabe", "TaW_kettenwaffen", "TaW_lanzenreiten", "TaW_peitsche", "TaW_raufen", "TaW_ringen", "TaW_sabel",
			"TaW_schwerter", "TaW_speere", "TaW_stabe", "TaW_zweihandflegel", "TaW_zweihand-hiebwaffen", "TaW_zweihandschwerter",
			"AT_anderthalbhander", "AT_dolche", "AT_fechtwaffen", "AT_hiebwaffen",
			"AT_infanteriewaffen", "AT_kettenstabe", "AT_kettenwaffen", "AT_lanzenreiten", "AT_peitsche", "AT_raufen", "AT_ringen", "AT_sabel",
			"AT_schwerter", "AT_speere", "AT_stabe", "AT_zweihandflegel", "AT_zweihand-hiebwaffen", "AT_zweihandschwerter",
			"AT_mod_wounds",
			"PA_anderthalbhander", "PA_dolche", "PA_fechtwaffen", "PA_hiebwaffen",
			"PA_infanteriewaffen", "PA_kettenstabe", "PA_kettenwaffen", "PA_lanzenreiten", "PA_peitsche", "PA_raufen", "PA_ringen", "PA_sabel",
			"PA_schwerter", "PA_speere", "PA_stabe", "PA_zweihandflegel", "PA_zweihand-hiebwaffen", "PA_zweihandschwerter",
			"PA_mod_wounds",
			"PABasis", "be_at_mod", "be_pa_mod",
			// Attribute nur für TP-Würfel
			"NKWschaden1_1", "NKWschaden2_1", "NKWschaden3_1", "NKWschaden4_1",
			"NKWschaden1_2", "NKWschaden2_2", "NKWschaden3_2", "NKWschaden4_2",
			"NKW1_SB", "NKW2_SB", "NKW3_SB", "NKW4_SB"
		];
		// Wenn es ein aktives Schild (oder Parierwaffe) gibt, möchten wir auch dessen Werte mit laden
		// combat_technique ist neu und wird daher auf einen Standardwert gesetzt
		// Gibt es keine activeShieldRow, ist nichts zu tun
		let activeShieldRowId = outerValues["activeShieldRowId"];
		if (activeShieldRowId)
		{
			innerAttrsToGet.push("repeating_shields_" + activeShieldRowId + "_shield_at_mod");
			innerAttrsToGet.push("repeating_shields_" + activeShieldRowId + "_shield_type");
			attrsToChange["repeating_shields_" + activeShieldRowId + "_combat_technique"] = "Dolche";
		}

		safeGetAttrs(innerAttrsToGet, function(innerValues) {
			// AT_Aktiv_TaW, PA_Aktiv_TaW und parryweapon_at
			{
				let weapon = 0;
				if (innerValues["NKW_Aktiv1"] === "1")
				{
					weapon = 1;
				} else if (innerValues["NKW_Aktiv2"] === "1") {
					weapon = 2;
				} else if (innerValues["NKW_Aktiv3"] === "1") {
					weapon = 3;
				} else if (innerValues["NKW_Aktiv4"] === "1") {
					weapon = 4;
				} else {
					// didn't find an active weapon. setting innerValues to 0;
					attrsToChange = {
						"AT_Aktiv_TaW": "0",
						"PA_Aktiv_TaW": "0",
						"parryweapon_at": 0
					};
				}
				/// AT_Aktiv_TaW
				const ATkampftechnikRaw = innerValues["NKW_AT_typ" + weapon];
				//// AT-Wert nur berechenbar, wenn dahinterstehende Kampftechnik bekannt
				if (ATkampftechnikRaw && ATkampftechnikRaw !== "0")
				{
					let taw = 0;
					const ATkampftechnik = ATkampftechnikRaw.match("@{AT_(.*)}");

					// Suche nach der richtigen Schreibweise des Attributnamens ...
					taw = parseInt(innerValues["TaW_" + ATkampftechnik[1]]);
					if (isNaN(taw))
					{
						taw = parseInt(innerValues["TaW_" + ATkampftechnik[1].toLowerCase()]);
					}
					attrsToChange["AT_Aktiv_TaW"] = taw;
				}

				/// PA_Aktiv_TaW
				const PAkampftechnikRaw = innerValues["NKW_PA_typ" + weapon];
				//// Wir berechnen den PA Wert nur, wenn ein Talenttyp für den PA Wert der Waffe ausgewählt ist
				if (PAkampftechnikRaw && PAkampftechnikRaw !== "0" )
				{
					let taw = 0;
					const PAkampftechnik = PAkampftechnikRaw.match("@{PA_(.*)}");

					// Suche nach der richtigen Schreibweise des Attributnamens ...
					taw = parseInt(innerValues["TaW_" + PAkampftechnik[1]]);
					if (isNaN(taw)) {
						taw = parseInt(innerValues["TaW_" + PAkampftechnik[1].toLowerCase()]);
					}
					attrsToChange["PA_Aktiv_TaW"] = taw;
				}

				/// parryweapon_at
				if (activeShieldRowId) {
					if (innerValues["repeating_shields_" + activeShieldRowId + "_shield_type"] === "parryweapon")
					{
						// Parierwaffen-AT besteht aus: AT der Kampftechnik + AT-WM der Waffe + Wundmod. + BE-Mod
						const parryWeaponCombatTechnique = "Dolche";
						if (DSAsane(parryWeaponCombatTechnique, "melee-combat-technique"))
						{
							let AT = 0;

							// Suche nach der richtigen Schreibweise des Attributnamens ...
							AT = parseInt(innerValues["AT_" + parryWeaponCombatTechnique]);
							if (isNaN(AT))
							{
								AT = parseInt(innerValues["AT_" + parryWeaponCombatTechnique.toLowerCase()])
							}

							const atMod = parseInt(innerValues["repeating_shields_" + activeShieldRowId + "_shield_at_mod"]);

							const atValue =
								AT + atMod
								+ innerValues["AT_mod_wounds"]
								- parseInt(innerValues["be_at_mod"]);
							attrsToChange["parryweapon_at"] = atValue;
						}
					}
				}
			}

			// TP-Würfelattribute
			/// TP_W_Aktiv
			{
				let weapon = 0;
				if (innerValues["NKW_Aktiv1"] === "1")
				{
					weapon = "1";
				} else if (innerValues["NKW_Aktiv2"] === "1") {
					weapon = "2";
				} else if (innerValues["NKW_Aktiv3"] === "1") {
					weapon = "3";
				} else if (innerValues["NKW_Aktiv4"] === "1") {
					weapon = "4";
				}

				const diceCountAttr = "NKWschaden" + weapon + "_1";
				let diceCount = parseInt(innerValues[diceCountAttr]);

				if (isNaN(diceCount))
				{
					debugLog(caller, "Invalid number gotten for attribute", diceCountAttr + ":", innerValues[diceCountAttr] + ". Setting to 1.");
					diceCount = 1;
				}

				attrsToChange["TP_W_Aktiv"] = diceCount;
			}

			/// TP_Bonus_Aktiv
			{
				let weapon = 0;
				if (innerValues["NKW_Aktiv1"] === "1")
				{
					weapon = "1";
				} else if (innerValues["NKW_Aktiv2"] === "1") {
					weapon = "2";
				} else if (innerValues["NKW_Aktiv3"] === "1") {
					weapon = "3";
				} else if (innerValues["NKW_Aktiv4"] === "1") {
					weapon = "4";
				}

				const damageAttr = "NKWschaden" + weapon + "_2";
				const bonusAttr = "NKW" + weapon + "_SB";
				let damage = parseInt(innerValues[damageAttr]);
				let bonus = parseInt(innerValues[bonusAttr]);

				if (isNaN(damage))
				{
					debugLog(func, "Invalid number gotten for attribute", damageAttr + ":", innerValues[damageAttr] + ". Setting to 0.");
					damage = 0;
				}
				if (isNaN(bonus))
				{
					debugLog(func, "Invalid number gotten for attribute", bonusAttr + ":", innerValues[bonusAttr] + ". Setting to 0.");
					bonus = 0;
				}

				attrsToChange["TP_Bonus_Aktiv"] = damage + bonus;
			}

			// k_mod_left_hand
			const ambidextrous = innerValues["vorteil_beidhaendig"];
			const lefthandedFighting = innerValues["sf_linkhand"];
			const ambidextrousFighting1 = innerValues["sf_beidhandigerkampfI"];
			const ambidextrousFighting2 = innerValues["sf_beidhandigerkampfII"];

			/// Advantage trumps the two lower special skills and is on par with the highest special skill
			if (ambidextrous === "on")
			{
				attrsToChange["k_mod_left_hand"] = 0;
			} else {
				if (ambidextrousFighting2 === "1")
				{
					attrsToChange["k_mod_left_hand"] = 0;
				} else if (ambidextrousFighting1 === "1") {
					attrsToChange["k_mod_left_hand"] = 3;
				} else if (lefthandedFighting === "1") {
					attrsToChange["k_mod_left_hand"] = 6;
				} else {
					attrsToChange["k_mod_left_hand"] = 9;
				}
			}

			debugLog(caller, "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange, {}, function(){
				callNextMigration(migrationChain);
			});
		});
	});
}

/*
	Migration steps:
	- Initialize sleep regeneration attributes
*/
function migrateTo20240414(migrationChain) {
	const caller = "migrateTo20240414";
	debugLog(caller, "started");

	const attrsToGet = [
		'MagieTab',
		'LiturgienTab',
		'verstecke_erschoepfung',
		'verstecke_ueberanstrengung',
		'KE'
	];
	let attrsToChange = {
		"reg_sleep_le_ko": "@{KO} - 1d20",
		"reg_sleep_le_fixed": "-1",
		"reg_sleep_le_mod_advantages_disadvantages": 0,
		"reg_sleep_le_mod_food_restriction": 0,
		"reg_sleep_ae_base": "1d6",
		"reg_sleep_ae_in": "@{IN} - 1d20",
		"reg_sleep_ae_fixed": "-1",
		"reg_sleep_ae_mod_advantages_disadvantages": 0,
		"reg_sleep_ae_mod_special_skills": 0,
		"reg_sleep_ae_mod_food_restriction": 0,
		"reg_sleep_ae_mod_homesickness": 0,
		"reg_sleep_addiction_withdrawal_effect": 0,
		"reg_sleep_food_restriction_effect": 0,
		"reg_sleep_mod_somnambulism": "0",
		"reg_sleep_sleep_disorder_effect": "1d6 - 1",
		"reg_sleep_sleep_disorder_trigger": "1d0",
		"reg_sleep_roll": "&{template:reg-sleep} {{charactername=@{character_name}}} {{le=@{LE}}} {{lebase=[[1d6]]}} {{leko=[[@{KO} - 1d20]]}} {{leneu=[[0d1]]}} {{ae=@{AE}}} {{aebase=[[1d6]]}} {{aein=[[@{IN} - 1d20]]}} {{aeneu=[[0d1]]}} {{ke=@{KE}}} {{kebase=[[1d1]]}} {{keneu=[[0d1]]}}"
	};
	safeGetAttrs(attrsToGet, function(values) {
		// Migrate checkbox inputs which received a value="1" attribute
		if (values["MagieTab"] === "on")
		{
			attrsToChange["MagieTab"] = "1";
		} else if (values["MagieTab"] === "off") {
			attrsToChange["MagieTab"] = "0";
		}
		if (values["LiturgienTab"] === "on")
		{
			attrsToChange["LiturgienTab"] = "1";
		} else if (values["LiturgienTab"] === "off") {
			attrsToChange["LiturgienTab"] = "0";
		}
		if (values["verstecke_erschoepfung"] === "on")
		{
			attrsToChange["verstecke_erschoepfung"] = "1";
		} else if (values["verstecke_erschoepfung"] === "off") {
			attrsToChange["verstecke_erschoepfung"] = "0";
		}
		if (values["verstecke_ueberanstrengung"] === "on")
		{
			attrsToChange["verstecke_ueberanstrengung"] = "1";
		} else if (values["verstecke_ueberanstrengung"] === "off") {
			attrsToChange["verstecke_ueberanstrengung"] = "0";
		}

		// KE gets used for the first time and needs to be usable
		if (isNaN(parseInt(values["KE"])))
		{
			attrsToChange["KE"] = 0;
		}
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function(){
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Migrate "subtag1" to sf_representations
*/
function migrateTo20240510(migrationChain) {
	const caller = "migrateTo20240510";
	debugLog(caller, "started");

	const valueMap = {
		"---": "",
		"gildenmagisch": "Mag",
		"elfisch": "Elf",
		"druidisch": "Dru",
		"satuarisch": "Hex",
		"geodisch": "Geo",
		"schelmisch": "Sch",
		"scharlatanisch": "Srl",
		"borbaradianisch": "Bor",
		"kristallomantisch": "Ach"
	};

	safeGetAttrs(["subtag1"], function (v) {
		let attrsToChange = {};

		if (Object.hasOwn(valueMap, v["subtag1"]))
		{
			attrsToChange["sf_representations"] = valueMap[v["subtag1"]];
		}
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function () {
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Migrate attributes to old names (full clean-up of spell name attributes will follow in the future, if that should still be necessary)
*/
function migrateTo20240519(migrationChain) {
	const caller = "migrateTo20240519";
	debugLog(caller, "started");
	const attrMap = {
		"z_angste_representation": "z_aengstelindern_representation",
		"z_animato_representation": "z_animatio_representation",
		"z_Auge_representation": "z_augedeslimbus_representation",
		"z_Auris_representation": "z_aurisnasusoculus_representation",
		"z_band_representation": "z_bandundfessel_representation",
		"z_Barenruhe_representation": "z_baerenruhe_representation",
		"z_Beherrschung_representation": "z_beherrschungbrechen_representation",
		"z_Beschworung_representation": "z_beschwoerungvereiteln_representation",
		"z_Bewegung_representation": "z_bewegungstoeren_representation",
		"z_boser_representation": "z_boeserblick_representation",
		"z_damonenbann_representation": "z_daemonenbann_representation",
		"z_dichter_representation": "z_dichterunddenker_representation",
		"z_eigenschaft_representation": "z_eigenschaftwiederherstellen_representation",
		"z_eigne_representation": "z_eigneaengste_representation",
		"z_einfluss_representation": "z_einflussbannen_representation",
		"z_eins_representation": "z_einsmitdernatur_representation",
		"z_elementarer_representation": "z_elementarerdiener_representation",
		"z_erinnerung_representation": "z_erinnerungverlassedich_representation",
		"z_flim_representation": "z_flimflam_representation",
		"z_fluch_representation": "z_fluchderpestilenz_representation",
		"z_gefass_representation": "z_gefaessderjahre_representation",
		"z_granit_representation": "z_granitundmarmor_representation",
		"z_Harmlose_representation": "z_harmlosegestalt_representation",
		"z_hartes_representation": "z_hartesschmelze_representation",
		"z_heilkraft_representation": "z_heilkraftbannen_representation",
		"z_hellsicht_representation": "z_hellsichttrueben_representation",
		"z_herbeirufung_representation": "z_herbeirufungvereiteln_representation",
		"z_herr_representation": "z_herrueberdastierreich_representation",
		"z_herzschlag_representation": "z_herzschlagruhe_representation",
		"z_hilfreiche_representation": "z_hilfreichetatze_representation",
		"z_hollenpein_representation": "z_hoellenpein_representation",
		"z_illusion_representation": "z_illusionaufloesen_representation",
		"z_iribaars_representation": "z_iribaarshand_representation",
		"z_klarum_representation": "z_klarumpurum_representation",
		"z_komm_representation": "z_kommkoboldkomm_representation",
		"z_koerperlose_representation": "z_koerperlosereise_representation",
		"z_krabbelnder_representation": "z_krabbelnderschrecken_representation",
		"z_kraft_representation": "z_kraftdeserzes_representation",
		"z_kraft_humus_representation": "z_kraftdeshumus_representation",
		"z_krahenruf_representation": "z_kraehenruf_representation",
		"z_krotensprung_representation": "z_kroetensprung_representation",
		"z_lach_representation": "z_lachdichgesund_representation",
		"z_langer_representation": "z_langerlulatsch_representation",
		"z_last_representation": "z_lastdesalters_representation",
		"z_levthans_representation": "z_levthansfeuer_representation",
		"z_limbus_representation": "z_limbusversiegeln_representation",
		"z_lunge_representation": "z_lungedesleviatan_representation",
		"z_madas_representation": "z_madasspiegel_representation",
		"z_magischer_representation": "z_magischerraub_representation",
		"z_metamagie_representation": "z_metamagieneutralisieren_representation",
		"z_metamorpho_felsenform_representation": "z_metamorphofelsenform_representation",
		"z_metamorpho_representation": "z_metamorphogletscherform_representation",
		"z_murks_representation": "z_murksundpatz_representation",
		"z_objecto_representation": "z_objectoobscuro_representation",
		"z_objekt_representation": "z_objektentzaubern_representation",
		"z_paralys_representation": "z_paralysis_representation",
		"z_pestilenz_representation": "z_pestilenzerspueren_representation",
		"z_ruhe_representation": "z_ruhekoerper_representation",
		"z_satuarias_representation": "z_satuariasherrlichkeit_representation",
		"z_schadenszauber_representation": "z_schadenszauberbannen_representation",
		"z_schleier_representation": "z_schleierderunwissenheit_representation",
		"z_seelentier_representation": "z_seelentiererkennen_representation",
		"z_staub_representation": "z_staubwandle_representation",
		"z_stein_representation": "z_steinwandle_representation",
		"z_Stimmen_des_Windes_representation": "z_stimmendeswindes_representation",
		"z_sumus_representation": "z_sumuselixiere_representation",
		"z_tempus_representation": "z_tempusstasis_representation",
		"z_tiere_representation": "z_tierebesprechen_representation",
		"z_tlalucs_representation": "z_tlalucsodem_representation",
		"z_totes_representation": "z_toteshandle_representation",
		"z_unberuhrt_representation": "z_unberuehrt_representation",
		"z_unsichtbarer_representation": "z_unsichtbarerjaeger_representation",
		"z_veranderung_representation": "z_veraenderungaufheben_representation",
		"z_verstandigung_representation": "z_verstaendigungstoeren_representation",
		"z_verwandlung_representation": "z_verwandlungbeenden_representation",
		"z_Wand_aus_Flammen_representation": "z_wandausflammen_representation",
		"z_warmes_representation": "z_warmesblut_representation",
		"z_Warmes_gefriere_representation": "z_warmesgefriere_representation",
		"z_weiches_representation": "z_weicheserstarre_representation",
		"z_weisheit_representation": "z_weisheitderbaeume_representation",
		"z_zorn_representation": "z_zornderelemente_representation",
		"z_zunge_representation": "z_zungelaehmen_representation"
	}
	const attrsToGet = [
		"z_aengstelindern_representation",
		"z_animatio_representation",
		"z_augedeslimbus_representation",
		"z_aurisnasusoculus_representation",
		"z_bandundfessel_representation",
		"z_baerenruhe_representation",
		"z_beherrschungbrechen_representation",
		"z_beschwoerungvereiteln_representation",
		"z_bewegungstoeren_representation",
		"z_boeserblick_representation",
		"z_daemonenbann_representation",
		"z_dichterunddenker_representation",
		"z_eigenschaftwiederherstellen_representation",
		"z_eigneaengste_representation",
		"z_einflussbannen_representation",
		"z_einsmitdernatur_representation",
		"z_elementarerdiener_representation",
		"z_erinnerungverlassedich_representation",
		"z_flimflam_representation",
		"z_fluchderpestilenz_representation",
		"z_gefaessderjahre_representation",
		"z_granitundmarmor_representation",
		"z_harmlosegestalt_representation",
		"z_hartesschmelze_representation",
		"z_heilkraftbannen_representation",
		"z_hellsichttrueben_representation",
		"z_herbeirufungvereiteln_representation",
		"z_herrueberdastierreich_representation",
		"z_herzschlagruhe_representation",
		"z_hilfreichetatze_representation",
		"z_hoellenpein_representation",
		"z_illusionaufloesen_representation",
		"z_iribaarshand_representation",
		"z_klarumpurum_representation",
		"z_kommkoboldkomm_representation",
		"z_koerperlosereise_representation",
		"z_krabbelnderschrecken_representation",
		"z_kraftdeserzes_representation",
		"z_kraftdeshumus_representation",
		"z_kraehenruf_representation",
		"z_kroetensprung_representation",
		"z_lachdichgesund_representation",
		"z_langerlulatsch_representation",
		"z_lastdesalters_representation",
		"z_levthansfeuer_representation",
		"z_limbusversiegeln_representation",
		"z_lungedesleviatan_representation",
		"z_madasspiegel_representation",
		"z_magischerraub_representation",
		"z_metamagieneutralisieren_representation",
		"z_metamorphofelsenform_representation",
		"z_metamorphogletscherform_representation",
		"z_murksundpatz_representation",
		"z_objectoobscuro_representation",
		"z_objektentzaubern_representation",
		"z_paralysis_representation",
		"z_pestilenzerspueren_representation",
		"z_ruhekoerper_representation",
		"z_satuariasherrlichkeit_representation",
		"z_schadenszauberbannen_representation",
		"z_schleierderunwissenheit_representation",
		"z_seelentiererkennen_representation",
		"z_staubwandle_representation",
		"z_steinwandle_representation",
		"z_stimmendeswindes_representation",
		"z_sumuselixiere_representation",
		"z_tempusstasis_representation",
		"z_tierebesprechen_representation",
		"z_tlalucsodem_representation",
		"z_toteshandle_representation",
		"z_unberuehrt_representation",
		"z_unsichtbarerjaeger_representation",
		"z_veraenderungaufheben_representation",
		"z_verstaendigungstoeren_representation",
		"z_verwandlungbeenden_representation",
		"z_wandausflammen_representation",
		"z_warmesblut_representation",
		"z_warmesgefriere_representation",
		"z_weicheserstarre_representation",
		"z_weisheitderbaeume_representation",
		"z_zornderelemente_representation",
		"z_zungelaehmen_representation"
	];

	safeGetAttrs(attrsToGet, function (v) {
		let attrsToChange = {};

		for (let property in attrMap)
		{
			let oldAttr = attrMap[property];
			if (v[oldAttr] === 0)
			{
				v[oldAttr] = "";
			}
			attrsToChange[property] = v[oldAttr];
		}
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function () {
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Initialize newly added attributes (Bastardstäbe, Feuerwaffen, hints for mods from encumbrance)
*/
function migrateTo20241002(migrationChain) {
	const caller = "migrateTo20241002";
	debugLog(caller, "started");

	const attrsToGet = [ "be_at_mod", "be_pa_mod"];
	safeGetAttrs(attrsToGet, function(values) {
		let attrsToInit = {
			"AT_bastardstaebe": 5,
			"PA_bastardstaebe": 5,
			"AT_feuerwaffen": 5,
			"be_at_mod_hint": 0,
			"be_pa_mod_hint": 0
		};

		for (let attr of attrsToGet)
		{
			if (DSAsane(values[attr], "int"))
			{
				const value = values[attr];
				const hintAttr = attr + "_hint";
				if (value > 0)
				{
					attrsToInit[hintAttr] = 1;
				} else {
					attrsToInit[hintAttr] = 0;
				}
			}
		}

		debugLog(caller, "attrsToInit", attrsToInit);
		safeSetAttrs(attrsToInit, {}, function () {
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Initialize newly added attributes (regeneration-related)
	- Fix errors introduced with previous version of migrateTo20240414()
*/
function migrateTo20250122(migrationChain) {
	// Boilerplate
	const caller = "migrateTo20250122";
	debugLog(caller, "started");

	// Preparation
	/// New attributes in need of default values
	const attrsToInit = [
		"reg_astralmeditation_mod_skill_source",
		"reg_astralmeditation_mod_skill_value",
		"reg_rest_duration_auto",
		"reg_sleep_ae_factor_metal_sensitive_conscious_contact",
		"reg_sleep_ae_mod_cuffed",
	];
	/// Uninitialized attributes from pre-initialization times now needed and properly initialized (stored as integer, not as string)
	const attrsToModernize = [
		"LE",
		"LE_max",
		"AU",
		"AU_max",
		"erschoepfung",
		"ueberanstrengung",
		"AE",
		"AE_max",
		"KE",
		"KE_max",
		"RitualkenntnisWert",
	];
	/// Errors from migrateTo20240414()
	const attrsToCorrect = [
		"reg_sleep_le_fixed",
		"reg_sleep_ae_fixed",
		"reg_sleep_mod_somnambulism",
		"reg_sleep_sleep_disorder_effect",
		"reg_sleep_sleep_disorder_trigger",
	];
	const defaultCorrection = {
		"reg_sleep_le_fixed": { "correct": -1, "wrong": "off" },
		"reg_sleep_ae_fixed": { "correct": -1, "wrong": "off" },
		"reg_sleep_mod_somnambulism": { "correct": "0", "wrong": 0 },
		"reg_sleep_sleep_disorder_effect": { "correct": "1d6 - 1", "wrong": 0 },
		"reg_sleep_sleep_disorder_trigger": { "correct": "1d0", "wrong": 0 },
	}

	/// Sanitization
	/// List of triggering attributes
	/// Use these attributes to trigger a change to propagate through the sheet resetting them to the initial value afterwards
	const triggerAttrs = [ "AU", "CH", "RitualkenntnisWert" ];

	/// Reduction to one array
	const attrsToGet = [ ...attrsToInit, ...attrsToModernize, ...attrsToCorrect, ...triggerAttrs ];

	// Attribute operations
	safeGetAttrs(attrsToGet, function(outer) {
		debugLog(caller, "outer head: attributes", outer)
		// Boilerplate
		let attrsToChange = {};

		// New attribute initialization
		/// Uses the positive effect of safeGetAttrs() to add unknown attributes with their default value
		for (attr of attrsToInit)
		{
			attrsToChange[attr] = outer[attr];
		}

		// Modernization of pre-existing attributes
		for (attr of attrsToModernize)
		{
			let value = 0;
			// Handle non-parseable values
			if (isNaN(parseInt(outer[attr])))
			{
				if (Object.hasOwn(defaultValues, attr))
				{
					value = defaultValues[attr];
				} else {
					value = 0;
				}
				attrsToChange[attr] = value;
				// Also fix for later re-use
				outer[attr] = value;
			} else {
			// Handle parseable values stored as string
			/// At some point (2023 to 2024?) trying to save a stringified integer to
			/// an attribute backed by a number-type text box led to silently assigning
			/// an empty value to the attribute instead.
			/// This would in the next "round" of safeGetAttrs be detected and maybe
			/// even corrected, but not without losing the correct/actual value.
				if (parseInt(outer[attr]) !== outer[attr])
				{
					let parsedInteger = parseInt(outer[attr]);
					attrsToChange[attr] = parsedInteger;
					outer[attr] = parsedInteger;
				}
			}
		}

		// Repair erroneously initialized attributes
		for (let attr of attrsToCorrect)
		{
			// Only correct if (still) at wrong initialized value
			if (outer[attr] === defaultCorrection[attr]["wrong"])
			{
				attrsToChange[attr] = defaultCorrection[attr]["correct"];
			}
		}

		// Set triggers for automatic propagation through action listeners
		attrsToChange["AU"] = parseInt(outer["AU"]) + 1;
		attrsToChange["CH"] = parseInt(outer["CH"]) + 1;
		attrsToChange["RitualkenntnisWert"] = parseInt(outer["RitualkenntnisWert"]) + 1;

		debugLog(caller, "outer", outer, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function () {
			const attrsToRestore = { "AU": outer["AU"], "CH": outer["CH"], "RitualkenntnisWert": outer["RitualkenntnisWert"] };
			safeSetAttrs(attrsToRestore, {}, function() {
				callNextMigration(migrationChain);
			});
		});
	});
}

/*
	Migration steps:
	- Check and fix two integer attribute values saved as strings
*/
function migrateTo20250413(migrationChain) {
	// Boilerplate
	const caller = "migrateTo20250413";
	debugLog(caller, "started");

	// Preparation
	/// Existing attributes in need of checking for value types
	const attrsToGet = [
		"reg_sleep_addiction_withdrawal_effect",
		"reg_sleep_food_restriction_effect",
	];

	// Attribute operations
	safeGetAttrs(attrsToGet, function(values) {
		// Boilerplate
		let attrsToChange = {};

		// Checking and Sanitization
		for (attr of attrsToGet)
		{
			let value = values[attr];
			if (typeof(value) !== "numeric")
			{
				// Try converting to integer
				if (isNaN(parseInt(value)))
				{
					value = getDefaultValue(attr);
				} else {
					value = parseInt(value);
				}
				attrsToChange[attr] = value;
			}
		}

		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange, {}, function () {
			callNextMigration(migrationChain);
		});
	});
}
/* migration end */
