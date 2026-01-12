/* melee start */
/*
Handle (de)activation of shields/parry weapons

There are two possible results: one and only one active shield; no active shield.
We need to make sure that the right thing™ is done
*/
on("change:repeating_shields:shield_active", function(eventInfo) {
	var caller = "Action Listener for Active Shields";
	// Get the source shield, its row ID and whether it was turned on or off
	var sourceShield = eventInfo.sourceAttribute;
	var sourceShieldId = extractRowId(sourceShield);
	var mode = eventInfo.newValue;

	// Get all the shields
	getSectionIDs("shields", function(idarray) {
		var prefix = "repeating_shields_";
		var suffix = "_shield_active";

		// Gather all the shield_active states (as attribute names)
		var attrsToGet = [];
		for(let id of idarray) {
			attrsToGet.push(prefix + id + suffix);
		}

		// Get the attributes
		safeGetAttrs( attrsToGet, function(shieldActiveStates) {
			var activeShields = [];
			var activeShieldRowId = "";

			for (let attr of attrsToGet) {
				if (shieldActiveStates[ attr ] === "on") {
					activeShields.push(attr);
				}
			}

			var attrsToChange = {};
			// 0 active shields? Deactivate shields, nothing to do.
			if (activeShields.length === 0) {
				// do something for deactivation
				debugLog(caller, "Deactivating shields/parry weapons ...");
				activeShieldRowId = "";
			} else if (activeShields.length === 1) {
				// this is the active shield
				var activeShield = activeShields[0];
				debugLog(caller, "Setting active shields/parry weapons to \"" + activeShield + "\"");
				activeShieldRowId = extractRowId(activeShield);
			} else {
				// If one shield got activated, deactivate all others.
				if (mode === "on") {
					activeShieldRowId = sourceShieldId;
					debugLog(caller, "Setting active shields/parry weapons to \"" + sourceShield + "\" and deactivating all others ...");
					for (let activeShield of activeShields) {
						if (activeShield !== sourceShield) {
							attrsToChange[ activeShield ] = 0;
						}
					}
				} else {
				// If one shield got deactivated and there is another active shield, keep one and only one shield. (This case should not happen.)
					debugLog(caller, "Impossible case triggered: One shield deactivated and more than one active shield remaining. Deactivating all but the first active shield.");
					activeShieldRowId = extractRowId(activeShields[0]);
					for (let i = 1; i < activeShields.length; i++) {
							attrsToChange[ activeShields[i] ] = 0;
					}
				}
			}
			attrsToChange[ "activeShieldRowId" ] = activeShieldRowId;
			safeSetAttrs( attrsToChange, { silent: true }, () => { calculateCombatValues() } );
		});
	});
});

/* Helper attributes "TP_W_Aktiv" and "TP_Bonus_Aktiv" for combat calculations

Better replacement for an autocalculating field with not-so-straightforward logic
*/
on(
"change:nkw_aktiv1 change:nkwschaden1_1 " +
"change:nkw_aktiv2 change:nkwschaden2_1  " +
"change:nkw_aktiv3 change:nkwschaden3_1  " +
"change:nkw_aktiv4 change:nkwschaden4_1  ",
function(eventInfos) {
	const func = "Action Listener for the Calculation of TP_W_Aktiv";
	const attrsToGet = [
		"NKW_Aktiv1", "NKW_Aktiv2", "NKW_Aktiv3", "NKW_Aktiv4",
		"NKWschaden1_1", "NKWschaden2_1", "NKWschaden3_1", "NKWschaden4_1"
	];
	safeGetAttrs(attrsToGet, function(values) {
		var attrsToChange = { "TP_W_Aktiv": 1 };

		var weapon = 0;
		if (values["NKW_Aktiv1"] === "1") {
			weapon = "1";
		} else if (values["NKW_Aktiv2"] === "1") {
			weapon = "2";
		} else if (values["NKW_Aktiv3"] === "1") {
			weapon = "3";
		} else if (values["NKW_Aktiv4"] === "1") {
			weapon = "4";
		}

		var diceCountAttr = "NKWschaden" + weapon + "_1";
		var diceCount = parseInt(values[diceCountAttr]);

		if (isNaN(diceCount)) {
			debugLog(func, "Invalid number gotten for attribute", diceCountAttr + ":", values[diceCountAttr] + ". Setting to 1.");
			diceCount = 1;
		}

		attrsToChange["TP_W_Aktiv"] = diceCount;
		safeSetAttrs(attrsToChange);
	});
});

on(
"change:nkw_aktiv1 change:nkwschaden1_2 change:nkw1_sb " +
"change:nkw_aktiv2 change:nkwschaden2_2 change:nkw2_sb " +
"change:nkw_aktiv3 change:nkwschaden3_2 change:nkw3_sb " +
"change:nkw_aktiv4 change:nkwschaden4_2 change:nkw4_sb ",
function(eventInfos) {
	const func = "Action Listener for the Calculation of TP_Bonus_Aktiv";
	const attrsToGet = [
		"NKW_Aktiv1", "NKW_Aktiv2", "NKW_Aktiv3", "NKW_Aktiv4",
		"NKWschaden1_2", "NKWschaden2_2", "NKWschaden3_2", "NKWschaden4_2",
		"NKW1_SB", "NKW2_SB", "NKW3_SB", "NKW4_SB"
	];
	safeGetAttrs(attrsToGet, function(values) {
		var attrsToChange = { "TP_Bonus_Aktiv": 0 };

		var weapon = 0;
		if (values["NKW_Aktiv1"] === "1") {
			weapon = "1";
		} else if (values["NKW_Aktiv2"] === "1") {
			weapon = "2";
		} else if (values["NKW_Aktiv3"] === "1") {
			weapon = "3";
		} else if (values["NKW_Aktiv4"] === "1") {
			weapon = "4";
		}

		var damageAttr = "NKWschaden" + weapon + "_2";
		var bonusAttr = "NKW" + weapon + "_SB";
		var damage = parseInt(values[damageAttr]);
		var bonus = parseInt(values[bonusAttr]);

		if (isNaN(damage)) {
			debugLog(func, "Invalid number gotten for attribute", damageAttr + ":", values[damageAttr] + ". Setting to 0.");
			damage = 0;
		}
		if (isNaN(bonus)) {
			debugLog(func, "Invalid number gotten for attribute", bonusAttr + ":", values[bonusAttr] + ". Setting to 0.");
			bonus = 0;
		}

		attrsToChange["TP_Bonus_Aktiv"] = damage + bonus;
		safeSetAttrs(attrsToChange);
	});
});

// Berechnet den Gesamt-AT-Wert inklusive Modifikation durch ein eventuell verwendetes Schild
// sowie den PA Wert sowohl für die aktive Waffe, als auch für die Schildparade
// Not working: Peitsche
on(
"change:kk change:kk_basis change:kk_mod "+
"change:taw_anderthalbhander change:taw_bastardstaebe change:taw_dolche " +
"change:taw_fechtwaffen " +
"change:taw_hiebwaffen change:taw_infanteriewaffen change:taw_kettenstabe " +
"change:taw_kettenwaffen change:taw_lanzenreiten change:taw_peitsche " +
"change:taw_raufen change:taw_ringen change:taw_sabel change:taw_schwerter " +
"change:taw_speere change:taw_stabe change:taw_zweihandflegel " +
"change:taw_zweihand-hiebwaffen change:taw_zweihandschwerter " +
"change:at_anderthalbhander change:at_bastardstaebe change:at_dolche change:at_fechtwaffen " +
"change:at_hiebwaffen " +
"change:at_infanteriewaffen change:at_kettenstabe change:at_kettenwaffen " +
"change:at_lanzenreiten change:at_peitsche change:at_raufen change:at_ringen change:at_sabel " +
"change:at_schwerter change:at_speere change:at_stabe change:at_zweihandflegel " +
"change:at_zweihand-hiebwaffen change:at_zweihandschwerter " +
"change:pabasis " +
"change:pa_anderthalbhander change: pa_bastardstaebe change:pa_dolche change:pa_fechtwaffen " +
"change:pa_hiebwaffen " +
"change:pa_infanteriewaffen change:pa_kettenstabe change:pa_kettenwaffen " +
"change:pa_lanzenreiten change:pa_peitsche change:pa_raufen change:pa_ringen change:pa_sabel " +
"change:pa_schwerter change:pa_speere change:pa_stabe change:pa_zweihandflegel " +
"change:pa_zweihand-hiebwaffen change:pa_zweihandschwerter " +
"change:nkw_at_typ1 change:nkw1atmod change:nkw_pa_typ1 change:nkw1pamod change:inimodnkw1 change:nkw1_spez change:nkw_aktiv1 change:nkw1_sb " +
"change:nkw_at_typ2 change:nkw2atmod change:nkw_pa_typ2 change:nkw2pamod change:inimodnkw2 change:nkw2_spez change:nkw_aktiv2 change:nkw2_sb " +
"change:nkw_at_typ3 change:nkw3atmod change:nkw_pa_typ3 change:nkw3pamod change:inimodnkw3 change:nkw3_spez change:nkw_aktiv3 change:nkw3_sb " +
"change:nkw_at_typ4 change:nkw4atmod change:nkw_pa_typ4 change:nkw4pamod change:inimodnkw4 change:nkw4_spez change:nkw_aktiv4 change:nkw4_sb " +
"change:repeating_shields change:be_at_mod change:be_pa_mod " +
"change:sf_schildkampfi change:sf_schildkampfii change:sf_linkhand " +
"change:sf_parierwaffeni change:sf_parierwaffenii " +
"change:sf_beidhandigerkampfi change:sf_beidhandigerkampfii change:vorteil_beidhaendig " +
"change:at_mod_wounds change:pa_mod_wounds ",
function(eventInfos) {
		calculateCombatValues();
});

function calculateCombatValues() {
	var caller = "calculateCombatValues";
	debugLog(caller, "calculating combat values");
	// Zunächst sammeln wir Infos über die aktiven Waffen und Schilde
	// "activeShieldRowId" can be the id of either a shield or a parry weapon
	safeGetAttrs([ "activeShieldRowId", "NKW_Aktiv1", "NKW_Aktiv2", "NKW_Aktiv3", "NKW_Aktiv4" ], function(rowIdValues) {
		var weapon = 0;
		if (rowIdValues["NKW_Aktiv1"] === "1") {
			weapon = 1;
		} else if (rowIdValues["NKW_Aktiv2"] === "1") {
			weapon = 2;
		} else if (rowIdValues["NKW_Aktiv3"] === "1") {
			weapon = 3;
		} else if (rowIdValues["NKW_Aktiv4"] === "1") {
			weapon = 4;
		} else {
			// didn't find an active weapon. setting values to 0;
			attrsToChange = {
				"AT_Aktiv": 0,
				"AT_Aktiv_TaW": "0",
				"PA_Aktiv": 0,
				"PA_Aktiv_TaW": "0",
				"shield_pa": 0,
				"parryweapon_at": 0,
				"parryweapon_pa": 0,
				"shield_pa_available": "0",
				"parryweapon_pa_available": "0"
			}
			safeSetAttrs(attrsToChange);
			return;
		}
		var variablesToGet = [
			"KK", "KK_Basis", "KK_mod",
			"NKW_AT_typ" + weapon, "NKW" + weapon + "ATMod",
			"NKW_PA_typ" + weapon, "NKW" + weapon + "PAMod",
			"INIModNKW" + weapon,
			"NKW" + weapon + "_Spez", "NKW" + weapon + "_SB",
			"TaW_anderthalbhander", "TaW_bastardstaebe", "TaW_dolche", "TaW_fechtwaffen", "TaW_hiebwaffen",
			"TaW_infanteriewaffen", "TaW_kettenstabe", "TaW_kettenwaffen", "TaW_lanzenreiten", "TaW_peitsche", "TaW_raufen", "TaW_ringen", "TaW_sabel",
			"TaW_schwerter", "TaW_speere", "TaW_stabe", "TaW_zweihandflegel", "TaW_zweihand-hiebwaffen", "TaW_zweihandschwerter",
			"AT_anderthalbhander", "AT_bastardstaebe", "AT_dolche", "AT_fechtwaffen", "AT_hiebwaffen",
			"AT_infanteriewaffen", "AT_kettenstabe", "AT_kettenwaffen", "AT_lanzenreiten", "AT_peitsche", "AT_raufen", "AT_ringen", "AT_sabel",
			"AT_schwerter", "AT_speere", "AT_stabe", "AT_zweihandflegel", "AT_zweihand-hiebwaffen", "AT_zweihandschwerter",
			"AT_mod_wounds",
			"PA_anderthalbhander", "PA_bastardstaebe", "PA_dolche", "PA_fechtwaffen", "PA_hiebwaffen",
			"PA_infanteriewaffen", "PA_kettenstabe", "PA_kettenwaffen", "PA_lanzenreiten", "PA_peitsche", "PA_raufen", "PA_ringen", "PA_sabel",
			"PA_schwerter", "PA_speere", "PA_stabe", "PA_zweihandflegel", "PA_zweihand-hiebwaffen", "PA_zweihandschwerter",
			"PA_mod_wounds",
			"PABasis", "sf_schildkampfI", "sf_schildkampfII", "sf_linkhand", "sf_parierwaffenI", "sf_parierwaffenII", "be_at_mod", "be_pa_mod",
			"sf_beidhandigerkampfI", "sf_beidhandigerkampfII", "vorteil_beidhaendig"
	 ];

		// Wurde dieses Event dadurch ausgelöst, dass sich die Aktivität eines Schildes geändert hat, dann müssen wir die activeShieldRowId noch manuell bearbeiten, da diese eventuell noch nicht korrekt gesetzt wurde
		var activeShieldRowId = rowIdValues["activeShieldRowId"];

		// Wenn es ein aktives Schild (oder Parierwaffe) gibt, möchten wir auch dessen Werte mit laden
		if (activeShieldRowId) {
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_at_mod");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_pa_mod");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_bf");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_ini_mod");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_name");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_tp");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_tpkk");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_type");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_combat_technique");
		}

		safeGetAttrs(variablesToGet, function(values) {
			var attrsToChange = {};

			// Prepare against NaN KK
			if (isNaN(values["KK"])) {
				values["KK"] = Math.max(0, parseInt(values["KK_Basis"]) + parseInt(values["KK_mod"]));
			}

			// Used for AT, PA and TP calc
			let tpkkMod = parseInt(values["NKW" + weapon + "_SB"]);

			// Berechne Waffen-AT
			var ATkampftechnikRaw = values["NKW_AT_typ" + weapon];
			// AT-Wert nur berechenbar, wenn dahinterstehende Kampftechnik bekannt
			if (ATkampftechnikRaw && ATkampftechnikRaw !== "0") {
				var AT = 0;
				var taw = 0;
				var ATkampftechnik = ATkampftechnikRaw.match("@{AT_(.*)}");

				// Suche nach der richtigen Schreibweise des Attributnamens ...
				// TODO: Attributbenennung vereinheitlichen (und dokumentieren)
				taw = parseInt(values["TaW_" + ATkampftechnik[1]]);
				if (isNaN(taw)) {
					taw = parseInt(values["TaW_" + ATkampftechnik[1].toLowerCase()]);
				}

				// Das Gleiche nochmal für den AT-Wert ...
				AT = parseInt(values["AT_" + ATkampftechnik[1]]);
				if (isNaN(AT)) {
					AT = parseInt(values["AT_" + ATkampftechnik[1].toLowerCase()]);
				}

				var atMod = parseInt(values["NKW" + weapon +"ATMod"]);
				var spec = parseInt(values["NKW" + weapon + "_Spez"]);
				var atValue = AT + atMod + spec + (values.AT_mod_wounds || 0);
				// bei aktivem Schild (nicht bei Parierwaffen), wird der AT Wert der Hauptwaffe um den AT-Mod des Schildes verändert
				if (activeShieldRowId && values["repeating_shields_" + activeShieldRowId + "_shield_type"] === "shield") {
					atValue = atValue + parseInt(values["repeating_shields_" + activeShieldRowId + "_shield_at_mod"]);
				}
				if (values["be_at_mod"]) {
					atValue -= parseInt(values["be_at_mod"]);
				}

				// Negative TP/KK reduziert auch AT
				if (tpkkMod && tpkkMod < 0) {
					atValue += tpkkMod;
				}
					attrsToChange["AT_Aktiv"] = Math.max(0, atValue);
					attrsToChange["AT_Aktiv_TaW"] = taw;
			}

			// Berechne Waffen-PA
			var PAkampftechnikRaw = values["NKW_PA_typ" + weapon];
			var paValue = 0;
			// Wir berechnen den PA Wert nur, wenn ein Talenttyp für den PA Wert der Waffe ausgewählt ist
			if (PAkampftechnikRaw && PAkampftechnikRaw !== "0" ) {
				var PA = 0;
				var taw = 0;
				var PAkampftechnik = PAkampftechnikRaw.match("@{PA_(.*)}");

				// Suche nach der richtigen Schreibweise des Attributnamens ...
				// TODO: Attributbenennung vereinheitlichen (und dokumentieren)
				taw = parseInt(values["TaW_" + PAkampftechnik[1]]);
				if (isNaN(taw)) {
					taw = parseInt(values["TaW_" + PAkampftechnik[1].toLowerCase()]);
				}

				// Das Gleiche nochmal für den AT-Wert ...
				PA = parseInt(values["PA_" + PAkampftechnik[1]]);
				if (isNaN(PA)) {
					PA = parseInt(values["PA_" + PAkampftechnik[1].toLowerCase()]);
				}

				var paMod = parseInt(values["NKW" + weapon +"PAMod"]);
				var spec = parseInt(values["NKW" + weapon + "_Spez"]);
				var wounds = isNaN(values['PA_mod_wounds']) ? 0 : values['PA_mod_wounds'];
				paValue = PA + paMod + spec + wounds;

				if (values["be_pa_mod"]) {
						paValue -= parseInt(values["be_pa_mod"]);
				}

				if (Number.isNaN(paValue) || paValue < 0) {
						paValue = 0;
				}
				if (tpkkMod && tpkkMod < 0) {
						paValue += tpkkMod;
				}
				attrsToChange["PA_Aktiv"] = Math.max(0, paValue);
				attrsToChange["PA_Aktiv_TaW"] = taw;
			}

			// Berechne Schild-PA und Parierwaffen-AT (Annahme: Kampf mit "falscher" Hand)
			var shieldPa = 0;
			var parryweaponAT = 0;
			var parryweaponPa = 0;
			// natürlich nur, wenn ein Schild aktiv ist (Siehe WdS S. 70)
			if (activeShieldRowId) {
				var linkhand = values["sf_linkhand"];
				if (values["repeating_shields_" + activeShieldRowId + "_shield_type"] === "shield") {
					// Lade die Werte der für Schildparaden relevanten SF
					var schildkampf1 = values["sf_schildkampfI"];
					var schildkampf2 = values["sf_schildkampfII"];
					// Wir starten mit dem PA Basiswert des Charakters
					shieldPa = parseInt(values["PABasis"]);
					// Für Schildkampf 2 werden 5 Punkte, für Schildkampf 1 3 Punkte und für Linkhand 1 Punkt addiert
					if (schildkampf2 === "1") {
						shieldPa += 5;
					} else if (schildkampf1 === "1") {
						shieldPa += 3;
					} else if (linkhand === "1") {
						shieldPa += 1;
					}

					// Ist der PA Wert der Waffe >= 21 werden 3 Punkte, >= 18 2 Punkte und >= 15 1 Punkt addiert
					if (paValue >= 21) {
						shieldPa += 3;
					} else if (paValue >= 18) {
						shieldPa += 2;
					} else if (paValue >= 15) {
						shieldPa += 1;
					}

					// berechne BE modifikator mit ein
					if (values["be_pa_mod"]) {
						shieldPa -= parseInt(values["be_pa_mod"]);
					}

					// Zuletzt: Addiere den PA-Modifikator des Schildes
					shieldPa += parseInt(values["repeating_shields_" + activeShieldRowId + "_shield_pa_mod"]);
				} else if (values["repeating_shields_" + activeShieldRowId + "_shield_type"] === "parryweapon") {
					// Parierwaffen-AT besteht aus: AT der Kampftechnik + AT-WM der Waffe + Wundmod. + BE-Mod
					// TODO: Spezialisierungen beachten
					var parryWeaponCombatTechnique = values["repeating_shields_" + activeShieldRowId + "_combat_technique"];
					if (DSAsane(parryWeaponCombatTechnique, "melee-combat-technique")) {
						var AT = 0;

						// Suche nach der richtigen Schreibweise des Attributnamens ...
						AT = parseInt(values["AT_" + parryWeaponCombatTechnique]);
						if (isNaN(AT)) {
							AT = parseInt(values["AT_" + parryWeaponCombatTechnique.toLowerCase()])
						}

						var atMod = parseInt(values["repeating_shields_" + activeShieldRowId + "_shield_at_mod"]);

						var atValue =
							AT + atMod
							+ values["AT_mod_wounds"]
							- parseInt(values["be_at_mod"]);
						attrsToChange["parryweapon_at"] = atValue;
					}

					var parierwaffen1 = values["sf_parierwaffenI"];
					var parierwaffen2 = values["sf_parierwaffenII"];
					// Basis für Parierwaffen-PA ist die PA der Hauptwaffe
					parryweaponPa = Math.max(0, paValue);

					// Dazu wird der PA-Mod der Parierwaffe addiert
					parryweaponPa += parseInt(values["repeating_shields_" + activeShieldRowId + "_shield_pa_mod"]);

					if (parierwaffen2 === "1") {
						parryweaponPa += 2;
					} else if (parierwaffen1 === "1") {
						parryweaponPa += -1;
					} else if (linkhand === "1") {
						parryweaponPa += -4;
					} else {
						// Ohne die SF Linkhand können Parierwaffen nicht verwendet werden
						parryweaponPa = 0;
					}
				}
				// Wundeinfluss (bei Parierwaffe über PA-Wert der Hauptwaffe bereits drin)
				shieldPa = Math.max(0, shieldPa + (isNaN(values['PA_mod_wounds']) ? 0 : values['PA_mod_wounds']));
			}

			if (shieldPa > 0) {
				attrsToChange["shield_pa_available"] = "on";
			} else {
				attrsToChange["shield_pa_available"] = "0";
			}
			if (parryweaponPa > 0) {
				attrsToChange["parryweapon_pa_available"] = "on";
			} else {
				attrsToChange["parryweapon_pa_available"] = "0";
			}
			attrsToChange["shield_pa"] = shieldPa;
			attrsToChange["parryweapon_pa"] = parryweaponPa;

			// Set INI modifier from (main) weapon
			var weaponini = 0;
			if (DSAsane(values["INIModNKW" + weapon], "ini-mod-weapon")) {
				debugLog(caller, "INIModNKW" + weapon, "is", values["INIModNKW" + weapon]);
				weaponini = parseInt(values["INIModNKW" + weapon]);
			}
			attrsToChange["INI_mod_hauptwaffe"] = weaponini;

			// Set INI modifier from shields/parry weapons
			var shieldparryini = 0;
			if (activeShieldRowId) {
				shieldparryini = parseInt(values["repeating_shields_" + activeShieldRowId + "_shield_ini_mod"]);
			}
			attrsToChange["ShieldParryINI"] = shieldparryini;

			// Set shield parry weapon BF (Bruchfaktor; lit. breaking factor -> fragility)
			var shieldparrybf = 0;
			if (activeShieldRowId) {
				shieldparrybf = values["repeating_shields_" + activeShieldRowId + "_shield_bf"];
				if (shieldparrybf === undefined || isNaN(parseInt(shieldparrybf))) {
					shieldparrybf = 0;
				}
			}
			attrsToChange["shield_bf"] = shieldparrybf;

			// Set shield parry weapon TP/KK (damage modifier based on low/high strength)
			var shieldparrytpkkdefault = "13/3";
			var shieldparrytpkk = shieldparrytpkkdefault;
			if (activeShieldRowId) {
				shieldparrytpkk = values["repeating_shields_" + activeShieldRowId + "_shield_tpkk"];

				// Check for correct TP/KK
				{
					var setdefault = 1;
					if (shieldparrytpkk === undefined) {
						debugLog(caller, 'Error: TP/KK for shield parry is undefined. Set to default value ("' + shieldparrytpkkdefault + '").');
					} else if (shieldparrytpkk === "") {
						debugLog(caller, 'Error: TP/KK for shield parry is empty. Set to default value ("' + shieldparrytpkkdefault + '").');
					} else if (shieldparrytpkk.match(/([^/]+)\/([^/]+)/) == null) {
						debugLog(caller, 'Error: Invalid TP/KK \'' + shieldparrytpkk + '\'. Set to default value ("' + shieldparrytpkkdefault + '").');
					} else {
						setdefault = 0;
					}
					if ( setdefault === 1 ) {
						attrsToChange["repeating_shields_" + activeShieldRowId + "_shield_tpkk"] = shieldparrytpkkdefault;
						shieldparrytpkk = shieldparrytpkkdefault;
					}
				}
				// We are misusing the TP/KK function a bit ...
				var TPKK = new Object();
				TPKK["Schwellenwert"] = parseInt(shieldparrytpkk.match(/([^/]+)\/([^/]+)/)[1]);
				TPKK["Schritt"] = parseInt(shieldparrytpkk.match(/([^/]+)\/([^/]+)/)[2]);
				shieldparrytpkk = calculateTpKKModFromValuesAndWeaponNumber(
					{
						"KK": values["KK"],
						"NKW-schild_SchwellenwertKK": TPKK["Schwellenwert"],
						"NKW-schild_Schwellenwert": TPKK["Schritt"]
					},
					"-schild"
				);
			}
			attrsToChange["shield_tpkk"] = shieldparrytpkk;

			// Set shield parry weapon TP (damage)
			// For now no calculations, just showing text
			var shieldparrytp = "";
			var shieldparrytproll = "";
			if (activeShieldRowId) {
				shieldparrytp = values["repeating_shields_" + activeShieldRowId + "_shield_tp"];
				if (shieldparrytp === undefined || shieldparrytp === "") {
					shieldparrytp = " ";
				} else {
					shieldparrytproll = shieldparrytp.replace("W", "d");
				}
			}
			attrsToChange["shield_tp"] = shieldparrytp;
			attrsToChange["shield_tp_roll"] = shieldparrytproll;

			// Set shield parry weapon name
			var shieldparryname = "";
			if (activeShieldRowId) {
				shieldparryname = values["repeating_shields_" + activeShieldRowId + "_shield_name"];
				if (shieldparryname === undefined || shieldparryname === "") {
					shieldparryname = " ";
				}
			}
			attrsToChange["shield_name"] = shieldparryname;

			safeSetAttrs(attrsToChange);
		});
	});
}

// Toggling hints for encumbrance affecting AT/PA
on([
		"be_at_mod",
		"be_pa_mod",
	].map(attr => `change:${attr}`).join(" "), function(eventInfo) {
		const caller = "Action Listener for Toggling Hints for Encumbrance Affecting AT/PA";
		const sourceAttr = eventInfo["sourceAttribute"];
		const hintAttr = sourceAttr + "_hint";
		let attrsToChange = {};

		switch (sourceAttr)
		{
			case "be_at_mod":
			case "be_pa_mod":
				if (eventInfo["newValue"] > 0)
				{
					attrsToChange[hintAttr] = 1;
				} else {
					attrsToChange[hintAttr] = 0;
				}
				break;
			default:
				debugLog(caller, "sourceAttribute not be_at_mod or be_pa_mod.");
				break;
		}
		safeSetAttrs(attrsToChange);
});

// Wird eine Nahkampfwaffe aktiviert, werden alle anderen deaktiviert. Auf diese Weise wird sichergestellt, dass immer maximal eine Nahkampfwaffe aktiv ist.
// Funktionsweise siehe Methode unten zum deaktivieren der Schilde
on("change:nkw_aktiv1 change:nkw_aktiv2 change:nkw_aktiv3 change:nkw_aktiv4", function(eventInfo) {
	if (eventInfo.newValue !== "1") {
		return;
	}
	var attrsToChange = {};
	for (let i = 1; i <= 4; i++) {
		if (eventInfo.sourceAttribute !== "nkw_aktiv" + i) {
			attrsToChange["NKW_Aktiv" + i] = 0;
		}
	}
	safeSetAttrs(attrsToChange);
});

on("change:atbasis change:taw_peitsche change:at_peitsche", function(eventInfo) {
	// do prevent infinite loop
	if (eventInfo.sourceType === "sheetworker" && eventInfo.sourceAttribute === "AT_peitsche") {
		return;
	}
	safeGetAttrs([ "ATbasis", "TaW_peitsche" ], function(values) {
		var peitscheAT = 0;
		if (values["TaW_peitsche"]) {
			peitscheAT = parseInt(values["ATbasis"]) + parseInt(values["TaW_peitsche"]);
		}
		safeSetAttrs({ "AT_peitsche": peitscheAT });
	});
});

on(
"change:sf_linkhand change:sf_beidhandigerkampfI change:sf_beidhandigerkampfII change:vorteil_beidhaendig " +
"change:sf_parierwaffeni change:sf_parierwaffenii " +
"change:sf_schildkampfi change:sf_schildkampfii ", function(eventInfo) {
	safeGetAttrs(["sf_linkhand", "sf_beidhandigerkampfI", "sf_beidhandigerkampfII", "vorteil_beidhaendig", "sf_parierwaffenI", "sf_parierwaffenII", "sf_schildkampfI", "sf_schildkampfII"], function(values) {
		var caller = "???";
		var attrsToChange = {};

		// Caution: This might cause trouble if some function other than this one changed these attributes.
		if (eventInfo.sourceType === "sheetworker")
		{
			debugLog(caller, "Suppressing setting LH/PW/SK (again) ...");
			return;
		}
		switch(eventInfo.sourceAttribute) {
			case "sf_linkhand":
				if (eventInfo.newValue === "0") {
						if (values["sf_parierwaffenII"] === "1") {
								attrsToChange["sf_parierwaffenII"] = "0";
						}
						if (values["sf_parierwaffenI"] === "1") {
								attrsToChange["sf_parierwaffenI"] = "0";
						}
						if (values["sf_schildkampfI"] === "1") {
								attrsToChange["sf_schildkampfI"] = "0";
						}
						if (values["sf_schildkampfII"] === "1") {
								attrsToChange["sf_schildkampfII"] = "0";
						}
				}
				break;
			case "sf_parierwaffeni":
				if (eventInfo.newValue === "1") {
						if (values["sf_linkhand"] === "0") {
								attrsToChange["sf_linkhand"] = "1";
						}
				} else {
						if (values["sf_parierwaffenII"] === "1") {
								attrsToChange["sf_parierwaffenII"] = "0";
						}
				}
				break;
			case "sf_parierwaffenii":
				if (eventInfo.newValue === "1") {
						if (values["sf_linkhand"] === "0") {
								attrsToChange["sf_linkhand"] = "1";
						}
						if (values["sf_parierwaffenI"] === "0") {
								attrsToChange["sf_parierwaffenI"] = "1";
						}
				}
				break;
			case "sf_schildkampfi":
				if (eventInfo.newValue === "1") {
						if (values["sf_linkhand"] === "0") {
								attrsToChange["sf_linkhand"] = "1";
						}
				} else {
						if (values["sf_schildkampfII"] === "1") {
								attrsToChange["sf_schildkampfII"] = "0";
						}
				}
				break;
			case "sf_schildkampfii":
				if (eventInfo.newValue === "1") {
						if (values["sf_linkhand"] === "0") {
								attrsToChange["sf_linkhand"] = "1";
						}
						if (values["sf_schildkampfI"] === "0") {
								attrsToChange["sf_schildkampfI"] = "1";
						}
				}
				break;
		}
		safeSetAttrs(attrsToChange, () => {
			calculateCombatValues(eventInfo);
		});
	});
});

on(
"change:kk " +
"change:nkw1_schwellenwertkk change:nkw1_schwellenwert " +
"change:nkw2_schwellenwertkk change:nkw2_schwellenwert " +
"change:nkw3_schwellenwertkk change:nkw3_schwellenwert " +
"change:nkw4_schwellenwertkk change:nkw4_schwellenwert", function(eventInfo) {

	var weaponsToCalculate = [];
	let attrsToGet = [ "KK", "KK_Basis", "KK_mod" ];

	// Gather all affected melee weapons (NKW)
	// Changes to KK (strength) can affect all weapons
	// Compare with lowercase as all attribute names are lowercase in eventInfo
	if (eventInfo.sourceAttribute === "kk") {
		for (let weapon = 1; weapon <= 4; weapon++) {
			weaponsToCalculate.push(weapon);
			attrsToGet.push("NKW" + weapon + "_Schwellenwert");
			attrsToGet.push("NKW" + weapon + "_SchwellenwertKK");
		}
	// Use the slot (number) of the weapon which just got changed
	} else {
		let matchResult = eventInfo.sourceAttribute.match(/nkw(\d)_.*/i);
		let weapon = matchResult[1];
		weaponsToCalculate.push(weapon);
		attrsToGet.push("NKW" + weapon + "_Schwellenwert");
		attrsToGet.push("NKW" + weapon + "_SchwellenwertKK");
	}

	safeGetAttrs(attrsToGet, function(values) {
		// Prepare against NaN KK
		if (isNaN(values["KK"])) {
			values["KK"] = Math.max(0, parseInt(values["KK_Basis"]) + parseInt(values["KK_mod"]));
		}
		let attrsToChange = {};
		for (let i = 0; i < weaponsToCalculate.length; i++) {
			let weapon = weaponsToCalculate[i];
			attrsToChange["NKW" + weapon +  "_SB"] = calculateTpKKModFromValuesAndWeaponNumber(values, weapon);
		}
		safeSetAttrs(attrsToChange);
	});
});

/* TP/KK modifies (usually only) TP, but sometimes also AT and PA
Pair of values separated by a slash.
First value (A): Strength required for optimal wielding of the weapon.
Second value (B): Damage steps (but complicated, see below) or threshold

How This Modifier Works
* Take first value.
* Subtract/add the second value: A - B, A, A + B
** If strength is A, the modifier is 0.
** If strength is A + B, the modifier is +1.
** If strength is A - B, the modifier is -1.
** If strength is between A - B and A + B (= not either of the values), the modifier is 0.
* Negative modifier gets applied to AT, PA and TP.
* Positive modifier gets applied to TP only.
* This goes on indefinitely for all further intervals A - n * B, A - (n - 1) * B, ... , A - 2 * B, A - B, A, A + B, A + 2 * B, ... , A + (n - 1) * B, A + n * B

Examples:
* TP/KK: 10/3
* Range for + 2 is 10 + 2 * 3 to 10 + 3 * 3 - 1 or 16 to 18
* Range for + 1 is 10 + 3 to 10 + 2 * 3 - 1 or 13 to 15
* Range for ± 0 is 10 - 3 + 1 to 10 + 3 - 1 or 8 to 12
* Range for - 1 is 10 - 2 * 3 + 1 to 10 - 3 or 5 to 7
* Range for - 2 is 10 - 3 * 3 + 1 to 10 - 2 * 3 or 2 to 4

Yes, it's a mess.

Note: TP/KK is just a shorthand, so "TP" does not correspond to the first and "KK" does not correspond to the second value. The first value actually is a "KK", the second a threshold.

Algorithm
* Difference between strength and threshold
* Round down the fraction of the absolute difference and the threshold
* If the difference was negative, the modifier also becomes negative.

Example TP/KK = 10/3
Str. Dif. Flo. Res.
	4   -6    2   -2
	5   -5    1   -1
	6   -4    1   -1
	7   -3    1   -1
	8   -2    0    0
	9   -1    0    0
 10    0    0    0
 11    1    0    0
 12    2    0    0
 13    3    1    1
 14    4    1    1
 15    5    1    1
 16    6    2    2

*/

// Special version
function calculateTpKKModFromValuesAndWeaponNumber(values, weapon) {
	const func = "calculateTpKKModFromValuesAndWeaponNumber";
	let KK = parseInt(values["KK"]);
	let threshold = parseInt(values["NKW" + weapon + "_SchwellenwertKK"]);
	let step = parseInt(values["NKW" + weapon + "_Schwellenwert"]);

	var tpkkMod = calculateTpKKMod(KK, threshold, step);
	return tpkkMod;
}

// General version
function calculateTpKKMod(KK, threshold, step) {
	const func = "calculateTpKKMod";
	var tpkkMod = 0;
	if (!DSAsane(KK, "stat")) {
		tpkkMod = 0;
		debugLog(func, "KK not sane. TP/KK modifier set to 0.");
	}
	if (!DSAsane(threshold, "stat")) {
		tpkkMod = 0;
		debugLog(func, "Weapon's KK requirement not sane. TP/KK modifier set to 0.");
	}
	if (isNaN(parseInt(step))) {
		tpkkMod = 0;
		debugLog(func, "Weapon's damage step not sane. TP/KK modifier set to 0.");
	}

	var kkDifference = KK - threshold;
	tpkkMod = Math.floor(Math.abs(kkDifference) / step);

	// Lower damage points if too weak
	if (kkDifference < 0) {
		tpkkMod = -tpkkMod;
	}
	return tpkkMod;
}

// calculate shield attack modifier
on("change:repeating_shields change:sf_schildkampfI change:sf_schildkampfII change:sf_knaufschlag change:sf_schmutzigetricks change:at_raufen change:at_mod_wounds", function(eventInfos) {
	safeGetAttrs(["activeShieldRowId"], function(rowIdValues) {
		var caller = "???";
		var activeShieldRowId = rowIdValues["activeShieldRowId"];
		if (eventInfos.sourceAttribute && eventInfos.sourceAttribute.endsWith("_shield_active")) {
				if (eventInfos.newValue === "on") {
						activeShieldRowId = extractRowId(eventInfos.sourceAttribute);
				} else if (eventInfos.sourceType === "player") {
						activeShieldRowId = undefined;
				}
		}

		let variablesToGet = [ "sf_schildkampfI", "sf_schildkampfII", "sf_schmutzigetricks", "sf_knaufschlag", "AT_raufen", "AT_mod_wounds"]

		// Wenn es ein aktives Schild (oder Parierwaffe) gibt, möchten wir auch dessen Werte mit laden
		if (activeShieldRowId) {
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_at_mod");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_pa_mod");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_type");
			variablesToGet.push("repeating_shields_" + activeShieldRowId + "_combat_technique");
		} else {
			debugLog(caller, "no active shield found");
			safeSetAttrs({
				"shield_at": 0,
				"shield_at_available": "0",
				"shield_at_mod": 0
			});
			return;
		}

		safeGetAttrs(variablesToGet, function(values) {
			let result = calculateShieldAttack(values, activeShieldRowId);
			debugLog(caller, 'calculated shield attack');
			debugLog(caller, result);
			safeSetAttrs(result);
		});
	});
});

function calculateShieldAttack(values, activeShieldRowId) {
	var caller = "calculateShieldAttack";

	debugLog(caller, "values", values);
	var atModShield = parseInt(values["repeating_shields_" + activeShieldRowId + "_shield_at_mod"]);
	var shieldType = values["repeating_shields_" + activeShieldRowId + "_shield_type"];
	var combatTechnique = values["repeating_shields_" + activeShieldRowId + "_combat_technique"];
	var schildkampfI = values["sf_schildkampfI"];
	var schildkampfII = values["sf_schildkampfII"];
	var knaufschlag = values["sf_knaufschlag"];
	var schmutzigeTricks = values["sf_schmutzigetricks"];
	var raufenAT = parseInt(values["AT_raufen"]);
	var atModWounds = parseInt(values["AT_mod_wounds"]);
	var shieldAt = Math.max(0, raufenAT + atModWounds);
	var result = { "shield_at": 0, "shield_at_mod": 3, "shield_at_available": "off" };

	// Continue only for shields
	if (shieldType === "shield") {
		// Do nothing in case no shield is active
		if (!activeShieldRowId) {
			result["shield_at_available"] = "off";
			result["shield_at"] = 0;
			debugLog(caller, "ping");
			return result;
		}

		// Shields' combat technique may only be 'Raufen', so set it accordingly
		if (combatTechnique !== "Raufen") {
			result["repeating_shields_" + activeShieldRowId + "_combat_technique"] = "Raufen";
		}

		// Without Shield Combat I, no Shield Attacks
		if (schildkampfI !== "1") {
			debugLog(caller, "schildkampfI:", schildkampfI);
			result["shield_at_available"] = "off";
			result["shield_at"] = 0;
			debugLog(caller, "pong");
			return result;
		} else {
			result["shield_at_available"] = "on";
			result["shield_at"] = shieldAt;
		}

		// Good to go, check for modifier reduction
		if (schildkampfII === "1" || knaufschlag === "1" || schmutzigeTricks === "1") {
			debugLog(caller, "schildkampfII:", schildkampfII, "knaufschlag:", knaufschlag, "schmutzigeTricks:", schmutzigeTricks);
			result["shield_at_mod"] = 0;
		}

		// Add AT modifier of the active shield
		// CAUTION: AT modifier != check modifier (i.e. signs have different meaning)
		if (atModShield) {
			result["shield_at_mod"] -= atModShield;
		}
	}
	return result;
}

// Calculate modifier from using the left/wrong hand
on(
	"change:vorteil_beidhaendig " +
	"change:sf_linkhand " +
	"change:sf_beidhandigerkampfI " +
	"change:sf_beidhandigerkampfII ",
	function(eventInfos) {
		const func = "Action Listener for calculating the modifier from using the left/wrong hand";
		debugLog(func, "eventInfos", eventInfos);

		const attrs = [
			"vorteil_beidhaendig",
			"sf_linkhand",
			"sf_beidhandigerkampfI",
			"sf_beidhandigerkampfII"
		];

		var attrsToChange = { "k_mod_left_hand": 0 };

		// Activation/Deactivation logic for ambidextrous fighting
		if (
				 eventInfos["sourceAttribute"] === "sf_beidhandigerkampfii"
			&& eventInfos["newValue"] === "1"
		) {
			attrsToChange["sf_linkhand"] = "1";
			attrsToChange["sf_beidhandigerkampfI"] = "1";
		}
		if (
				 eventInfos["sourceAttribute"] === "sf_beidhandigerkampfi"
			&& eventInfos["newValue"] === "1"
		) {
			attrsToChange["sf_linkhand"] = "1";
		}
		if (
				 eventInfos["sourceAttribute"] === "sf_linkhand"
			&& eventInfos["newValue"] === "0"
		) {
			attrsToChange["sf_beidhandigerkampfI"] = "0";
			attrsToChange["sf_beidhandigerkampfII"] = "0";
		}
		if (
				 eventInfos["sourceAttribute"] === "sf_beidhandigerkampfi"
			&& eventInfos["newValue"] === "0"
		) {
			attrsToChange["sf_beidhandigerkampfII"] = "0";
		}

		safeGetAttrs(attrs, function(values) {
			const ambidextrous = values["vorteil_beidhaendig"];
			const lefthandedFighting = values["sf_linkhand"];
			const ambidextrousFighting1 = values["sf_beidhandigerkampfI"];
			const ambidextrousFighting2 = values["sf_beidhandigerkampfII"];

			// Advantage trumps the two lower special skills and is on par with the highest special skill
			if (ambidextrous === "on") {
				attrsToChange["k_mod_left_hand"] = 0;
			} else {
				if (ambidextrousFighting2 === "1") {
					attrsToChange["k_mod_left_hand"] = 0;
				} else if (ambidextrousFighting1 === "1") {
					attrsToChange["k_mod_left_hand"] = 3;
				} else if (lefthandedFighting === "1") {
					attrsToChange["k_mod_left_hand"] = 6;
				} else {
					attrsToChange["k_mod_left_hand"] = 9;
				}
			}
			debugLog(func, "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
});

on(
	[
		"attacke_parierwaffe",
		"attacke_schild",
		"attacke_waffe",
		"passierschlag",
		"parade_parierwaffe",
		"parade_schild",
		"parade_waffe"
	].map(attack => "clicked:k_" + attack + "-action").join(" "), async (info) => {
	var func = "Action Listener for Melee Buttons";

	// Get trigger aka the name of the melee maneuver
	var trigger = info["triggerName"].replace(/clicked:([^-]+)-action/, '$1');
	// Get trigger-specific data
	var data = meleeData[trigger];

	// Fill rolls array to three elements
	const rollCountMax = 3;
	const critAttrsAT = [ 'cs_kampf_at', 'cf_kampf_at' ];
	const critAttrsPA = [ 'cs_kampf_pa', 'cf_kampf_pa' ];
	const critAttrsDict = {
		'at': critAttrsAT, 'pa': critAttrsPA,
		'pa-ausweichen': critAttrsPA,
		'at-parierwaffe': critAttrsAT, 'pa-parierwaffe': critAttrsPA,
		'pa+pa-parierwaffe': critAttrsPA,
		'at-schild': critAttrsAT, 'pa-schild': critAttrsPA
	};
	// Build Rolls Strings
	data["rolls"] = [];
	var cs = critAttrsDict[data["typ"]][0];
	var cf = critAttrsDict[data["typ"]][1];
	while (data["rolls"].length < rollCountMax) {
		if (data["rolls"].length < data["rollCount"]) {
			data["rolls"].push(`1d20cs<@{${cs}}cf>@{${cf}}`);
		} else {
			data["rolls"].push(0);
		}
	}
	debugLog(func, trigger, data);

	const wertDict = {
		'at': '@{AT_Aktiv}',
		'pa': '@{PA_Aktiv}',
		'pa-ausweichen': '@{PABasis}',
		'at-parierwaffe': '@{parryweapon_at}',
		'pa-parierwaffe': '@{parryweapon_pa}',
		'pa+pa-parierwaffe': '[[{@{PA_Aktiv}d1, @{parryweapon_pa}d1}kh1]]',
		'at-schild': '@{AT_Raufen}',
		'pa-schild': '@{shield_pa}'
	};
	const tawDict = {
		'at': '@{AT_Aktiv_TaW}',
		'pa': '@{PA_Aktiv_TaW}',
		'pa-ausweichen': '@{PABasis}',
		'at-parierwaffe': '@{parryweapon_at}',
		'pa-parierwaffe': '@{parryweapon_pa}',
		'pa+pa-parierwaffe': '[[{@{PA_Aktiv}d1, @{parryweapon_pa}d1}kh1]]',
		'at-schild': '@{AT_Raufen}',
		'pa-schild': '@{shield_pa}'
	};


	// Maneuver-specific Behaviour
	// Beware of an Ugly Hack
	/*
	Custom Roll Parsing gives you a results object.
	Unfortunately, is does not contain all variables declared in the roll.
	Why? Custom ROLL Parsing only allows customizing ROLLS.
	Anything not embraced by [[]] is not a roll. No roll -> no access.
	Using inline labels after bogus rolls (0d1, does not spawn 3D dice) solves this.
	Example: 0d1[hello]
	Instead of accessing the roll result, access the roll expression.
	Example: "0d1[hello]"
	It is a string and from this point it is quite straightforward to continue.
	*/
	var reuse = {
		"finte4": {
			"q": "Finte (max. +4)?",
			"a": [
				{ "desc": [ "Ja, +1." ], "val": [ "1d1[fi]" ] },
				{ "desc": [ "Ja, +2." ], "val": [ "2d1[fi]" ] },
				{ "desc": [ "Ja, +3." ], "val": [ "3d1[fi]" ] },
				{ "desc": [ "Ja, +4." ], "val": [ "4d1[fi]" ] },
				{ "desc": [ "Keine Finte." ], "val": [ "0d1[fi]" ] }
			]
		},
		"wuchtschlag4": {
			"q": "Wuchtschlag (max. +4)?",
			"a": [
				{ "desc": [ "Ja, +1." ], "val": [ "1d1[ws]" ] },
				{ "desc": [ "Ja, +2." ], "val": [ "2d1[ws]" ] },
				{ "desc": [ "Ja, +3." ], "val": [ "3d1[ws]" ] },
				{ "desc": [ "Ja, +4." ], "val": [ "4d1[ws]" ] },
				{ "desc": [ "Kein Wuchtschlag." ], "val": [ "0d1[ws]" ] }
			]
		}
	};
	var reuse_ausfall = {
		"einleitung": {
			"q": "Ist der Gegner noch zurückdrängbar und ist die Situation nicht beengt?",
			"a": [
				{ "desc": [ "Ja." ], "val": [ "1d1[ein]" ] },
				{ "desc": [ "Nein." ], "val": [ "0d1[ein]" ] }
			]
		},
		"ini": {
			"q": "Ist die Initiative höher als die des Ziels?",
			"a": [
				{ "desc": [ "Ja, sie ist höher." ], "val": [ "1d1[ini]" ] },
				{ "desc": [ "Nein, sie ist kleiner oder gleich." ], "val": [ "0d1[ini]" ] }
			]
		},
		"einleitung-dk": {
			"q": "Soll mit dieser Attacke die Distanzklasse verkürzt werden?",
			"a": [
				{ "desc": [ "Ja." ], "val": [ { "reuse": "einleitung-dk-auswahl" } ] },
				{ "desc": [ "Nein." ], "val": [ "0d1[dkintro]" ] }
			]
		},
		"einleitung-dk-auswahl": {
			"q": "Um wie viele Distanzklassen soll verkürzt werden?",
			"a": [
				{ "desc": [ "eine Distanzklasse (±0)" ], "val": [ "1d1[dkintro]" ] },
				{ "desc": [ "zwei Distanzklassen (+4)" ], "val": [ "2d1[dkintro]" ] },
				{ "desc": [ "Doch lieber nicht." ], "val": [ "0d1[dkintro]" ] }
			]
		},
		"ende?": {
			"q": "Ausfall beenden?",
			"a": [
				{ "desc": [ "Ja." ], "val": [ { "reuse": "endmanöver" } ] },
				{ "desc": [ "Nein." ], "val": [ "0d1[end]" ] }
			]
		},
		"endmanöver": {
			"q": "Beenden mit gewöhnlicher Attacke oder einem Manöver?",
			"a": [
				{ "desc": [ "Gewöhnliche Attacke" ], "val": [ "0d1[em]", { "reuse": "ende-dk" } ] },
				{ "desc": [ "Niederwerfen" ], "val": [ "0d1[em]", { "reuse": "ende-dk" } ] },
				{ "desc": [ "Hammerschlag" ], "val": [ "0d1[em]", { "reuse": "ende-dk" } ] },
				{ "desc": [ "Gezielter Stich" ], "val": [ "0d1[em]", { "reuse": "ende-dk" } ] },
				{ "desc": [ "Todesstoß" ], "val": [ "0d1[em]", { "reuse": "ende-dk" } ] }
			]
		},
		"ende-dk": {
			"q": "In welcher Distanzklasse soll ein erfolgreicher Ausfall enden?",
			"a": [
				{ "desc": [ "Handgemenge (H)" ], "val": [ "1d1[dkende]" ] },
				{ "desc": [ "Nahkampf (N)" ], "val": [ "2d1[dkende]" ] },
				{ "desc": [ "Stangenwaffe (S)" ], "val": [ "3d1[dkende]" ] },
				{ "desc": [ "Pike (P)" ], "val": [ "4d1[dkende]" ] }
			]
		}
	};
	var macros_ausfall = [
		{ "name": "einleitung", "reuse": "einleitung" },
		{ "name": "iniUnterschied", "reuse": "ini" },
		{ "name": "dkintro", "reuse": "einleitung-dk" },
		{ "name": "wuchtschlag", "reuse": "wuchtschlag4" },
		{ "name": "finte", "reuse": "finte4" }
	];

	/*
		transformElements
		The elements of a roll button macro code are divided into "prefix", "main" and "suffix".
		"prefix" and "suffix" are stored as plain strings only.
		"main" is stored as plain string or on a per roll variable basis as an object.
		The property name equals the roll variable name, the content is the macro code.
		The plain string version and the object version contain a concatenated form featuring the prefix and the suffix alongside "main".

		["string"]["full"] is directly usable roll button macro code.
		["object"]["full"] is the full object version of the roll button macro code.
	*/
	function transformElements(elements) {
		const func = "transformElements()";

		// Prepare results data structure
		var transformed = {
			// Prefix and suffix are always strings
			"common":
				{ "prefix": "", "suffix": "" },
			"string": 
				{ "main": "", "full": "" },
			"object":
				{ "main": {}, "full": {} }
			};

		// Add contents to the results data structure
		for (let macro of elements) {
			if (Object.hasOwn(macro, "prefix")) {
				transformed["common"]["prefix"] += macro["prefix"] + " ";
			} else if (Object.hasOwn(macro, "suffix")) {
				transformed["common"]["suffix"] += macro["suffix"] + " ";
			} else {
				transformed["string"]["main"] += '{{' + macro["name"] + '=' + macro["value"] + '}} ';
				transformed["object"]["main"][macro["name"]] = '{{' + macro["name"] + '=' + macro["value"] + '}}';
			}
		}
		transformed["string"]["full"] = transformed["common"]["prefix"] + transformed["string"]["main"] + transformed["common"]["suffix"];

		// "prefix" and "suffix" are reserved for this internal use case, so check against accidentally using them
		if (
			Object.hasOwn(transformed["object"]["main"], "prefix") === true
			||
			Object.hasOwn(transformed["object"]["main"], "suffix") === true
		) {
			debugLog(func, "Warning: 'prefix' and/or 'suffix' are used as actual roll variables and will be overwritten.");
		}
		transformed["object"]["full"]["prefix"] = transformed["common"]["prefix"];
		transformed["object"]["full"]["suffix"] = transformed["common"]["suffix"];
		transformed["object"]["full"] = { ... transformed["object"]["prefix"], ... transformed["object"]["suffix"], ... transformed["object"]["main"] };
		return transformed;
	}

	// Prepare required attributes
	var attrsToGet = [
		'character_id',
		'character_name',
		'k_option_autoroll_confirmation_rolls',
		... critAttrsDict[data["typ"]],
		... data["attributes"]
	];

	safeGetAttrs(attrsToGet,
		async function(v, missing, badDef)
		{
			// Build Roll Button Macro Code
			// Start with gathering all elements (prefix, template, roll variables with definitions) in objects
			// Put the objects in an array to preserve the order
			var defaultElements = [];

			// Build String
			// Prefixes
			{
			var template = Object.hasOwn(data, 'template') ? data["template"] : 'test';
			defaultElements.push(
				{ 'prefix':
					'@{gm_roll_opt} ' +
					// Not strictly required at the beginning, but conventionally done this way
					'&{template:' + template + '}'
				}
			);
			}

			// UI Name
			defaultElements.push( { 'name': 'name', 'value': data["ui"] } );

			// (Sub-)Rolls
			defaultElements.push( { 'name': 'roll0', 'value': `[[${data["rolls"][0]}]]` } );
			defaultElements.push( { 'name': 'roll1', 'value': `[[${data["rolls"][1]}]]` } );
			defaultElements.push( { 'name': 'roll2', 'value': `[[${data["rolls"][2]}]]` } );
			if (v["k_option_autoroll_confirmation_rolls"] !== "0") {
				defaultElements.push( { 'name': 'confirmationRoll0', 'value': `[[${data["rolls"][0]}]]` } );
				defaultElements.push( { 'name': 'confirmationRoll1', 'value': `[[${data["rolls"][1]}]]` } );
				defaultElements.push( { 'name': 'confirmationRoll2', 'value': `[[${data["rolls"][2]}]]` } );
			} else {
				defaultElements.push( { 'name': 'confirmationRoll0', 'value': "[[1d0]]" } );
				defaultElements.push( { 'name': 'confirmationRoll1', 'value': "[[1d0]]" } );
				defaultElements.push( { 'name': 'confirmationRoll2', 'value': "[[1d0]]" } );
			}

			// Roll Modifiers
			defaultElements.push( { 'name': 'mod', 'value': `[[${data["mod"]}]]` } );
			defaultElements.push( { 'name': 'ansage', 'value': `[[${data["ansagen"]["manoever"]["fest"]} + (${data["ansagen"]["manoever"]["variabel"]})]]` } );

			// Limit (upper, must not be exceeded by unmodified roll)
			// TODO: Rename "wert" to "limit_result"
			defaultElements.push( { 'name': 'wert', 'value': `[[${wertDict[data["typ"]]}]]` } );

			// Modification Limit
			// TODO: Rename "taw" to "limit_mods"
			defaultElements.push( { 'name': 'taw', 'value': `[[${tawDict[data["typ"]]}]]` } );

			// Custom Roll Parsing-related
			// Character ID and name for fetching attributes
			defaultElements.push( { 'name': 'characterid', 'value': '@{character_id}' } );
			defaultElements.push( { 'name': 'charactername', 'value': '@{character_name}' } );

			// Confirmation Rolls
			defaultElements.push( { 'name': 'isConfirmationRoll', 'value': '[[0]]' } );
			defaultElements.push( { 'name': 'showRollTag', 'value': '[[@{show_roll_tags}]]' } );
			defaultElements.push( { 'name': 'confirmationRollRequired', 'value': '[[0]]' } );

			// Anti-Cheat Measures
			// Cave: These identifiers are produced on the client side (= suspected cheater). With the right equipment and knowledge, it could be relatively simple to circumvent these measures.
			// Roll Time allows to compare the reaction roll's time with the original roll's time
			// If too much time passed between both rolls, a warning is emitted.
			defaultElements.push( { 'name': 'rollTime', 'value': `[[${Date.now()}]]` } );
			// Roll Tags are short identifiers based on the roll time that are printed in roll templates, if further rolls are possible.
			// Since every roll of that "chain" will have the same roll tag, all players can verify that the correct roll button was clicked.
			defaultElements.push( { 'name': 'rollTag', 'value': '[[0]]' } );

			// Result Code: -3 (triple 20) to +3 (triple 1)
			defaultElements.push( { 'name': 'result', 'value': '[[0]]' } );

			// Message Code: Messages depend on roll template
			defaultElements.push( { 'name': 'msg', 'value': '[[0]]' } );

			// Passthrough, used to carry all relevant information from one roll to the next
			defaultElements.push( { 'name': 'passthrough', 'value': '[[0]]' } );

			// Gather/Create case-specific elements
			// Currently unused
			var specialElements = []; //buildMacros(macros_ausfall, { ... reuse, ... reuse_ausfall }, 'structured')
			var specialRollButtonMacroCode = ""; //buildMacros(macros_ausfall, {... reuse, ... reuse_ausfall }, 'string')

			// Create different representations of the final roll button macro code
			var allElements = [ ... defaultElements, ... specialElements ];
			var allElementsObject = transformElements(allElements)["object"]["full"];
			var rollButtonMacroCode = transformElements(defaultElements)["string"]["full"] + ' ' + specialRollButtonMacroCode;

			debugLog(func, "rollButtonMacroCode", rollButtonMacroCode, "allElements", allElements, "objectified macro variables", allElementsObject);

			// Start the roll
			var results = await startRoll(rollButtonMacroCode);
			const rollID = results.rollId;
			results = results.results;
			debugLog("values/missing/badDef", v, missing, badDef, "allElementsObject", allElementsObject, "test: info:", info, "results:", results);

			var wert = results.wert.result;
			var taw = results.taw.result;
			var rolls = [
				results.roll0.result,
				results.roll1.result,
				results.roll2.result,
			];
			var roll = rolls[0];
			if (v["k_option_autoroll_confirmation_rolls"] !== "0") {
				var confirmationRolls = [
					results.confirmationRoll0.result,
					results.confirmationRoll1.result,
					results.confirmationRoll2.result,
				];
				var confirmationRoll = confirmationRolls[0];
			}
			var mod = results.mod.result;
			var ansage = results.ansage.result;
			var msg = allElementsObject["msg"];
			var result = 0;
			var confirmationRollRequired = 0;
			var passthrough = {};
			var cs = parseInt(v[critAttrsDict[data["typ"]][0]]);
			var cf = parseInt(v[critAttrsDict[data["typ"]][1]]);

			var effWert = wert - mod - ansage;
			console.log("effWert", effWert, "cs", cs, "cf", cf);
			// komplette _Ansage_ darf nicht höher als Kampftechnik-TaW und AT-Wert der aktiven Waffe (das jeweils niedrigere gilt)
			if (
				ansage > 0 &&
				(
					wert < ansage || taw < ansage
				)
			) {
				msg = 1;
			}

			// Auswertung des Wurfs
			if (roll >= cf) {
				result = -2;
				confirmationRollRequired = 1;
			} else if (roll > effWert) {
				result = -1;
			} else if (roll <= cs) {
				result = 2;
				confirmationRollRequired = 1;
			} else {
				result = 1;
			}

			if (confirmationRollRequired === 1) {
				if (v["k_option_autoroll_confirmation_rolls"] === "1"){
					if (result === -2) {
						if (confirmationRoll >= cf) {
							result = -3;
						} else if (confirmationRoll > effWert) {
							result = -3;
						}
					} else if (result === 2) {
						if (confirmationRoll <= cs) {
							result = 3;
						} else if (confirmationRoll <= effWert) {
							result = 3;
						}
					}
					confirmationRollRequired = 0;
					if (result === -3) {
						passthrough["rollTime"] = Date.now();
						passthrough["rollTag"] = generateShortRollTag(passthrough["rollTime"]);
						passthrough["rollMacro"] =
							"@{gm_roll_opt} " +
							"&{template:DSA-Nahkampf-Patzer} " +
							"{{name=Nahkampfpatzer}} " +
							"{{wurf=[[2d6cs1cf6]]}} " +
							"{{isOriginalRoll=[[0]]}} " +
							"{{showRollTag=[[@{show_roll_tags}]]}} " +
							"{{rollTag=[[0]]}} " +
							"{{rollTime=[[0]]}} " +
							"{{rollExpired=[[0]]}} " +
							"{{rollTimeHuman=[[0]]}} " +
							"{{passthrough=[[0]]}}";
						console.log(passthrough);
					}
				} else {
					passthrough["rollTime"] = Date.now();
					passthrough["rollTag"] = generateShortRollTag(passthrough["rollTime"]);
					passthrough["name"] = allElementsObject["name"];
					passthrough["wert"] = wert;
					passthrough["taw"] = taw;
					passthrough["effWert"] = effWert;
					passthrough["mod"] = mod;
					passthrough["ansage"] = ansage;
					passthrough["roll0"] = allElementsObject["roll0"];
					passthrough["roll1"] = allElementsObject["roll1"];
					passthrough["roll2"] = allElementsObject["roll2"];
					passthrough["confirmationRoll0"] = allElementsObject["confirmationRoll0"];
					passthrough["confirmationRoll1"] = allElementsObject["confirmationRoll1"];
					passthrough["confirmationRoll2"] = allElementsObject["confirmationRoll2"];
					passthrough["result"] = result;
					passthrough["cs"] = cs;
					passthrough["cf"] = cf;
					passthrough["isConfirmationRoll"] = 1;
					passthrough["confirmationRollRequired"] = 1;
					passthrough["showRollTag"] = allElementsObject["showRollTag"];
					passthrough["rollMacro"] = [
						allElements[0]["prefix"],
						"{{name=" + data["ui"] + "}}",
						"{{mod=[[" + mod + "]]}}",
						"{{ansage=[[" + ansage + "]]}}",
						"{{wert=[[" + wert + "]]}}",
						"{{taw=[[" + taw + "]]}}",
						allElementsObject["roll0"],
						allElementsObject["roll1"],
						allElementsObject["roll2"],
						allElementsObject["confirmationRoll0"],
						allElementsObject["confirmationRoll1"],
						allElementsObject["confirmationRoll2"],
						"{{msg=[[0]]}}",
						"{{characterid=" + v["character_id"] + "}}",
						"{{charactername=" + v["character_name"] + "}}",
						"{{result=[[0]]}}",
						"{{isConfirmationRoll=[[1]]}}",
						"{{confirmationRollRequired=[[1]]}}",
						"{{showRollTag=[[@{show_roll_tags}]]}}",
						"{{rollTag=[[0]]}}",
						"{{rollTime=[[0]]}}",
						"{{rollExpired=[[0]]}}",
						"{{rollTimeHuman=[[0]]}}",
						"{{passthrough=[[0]]}}"
					].join(" ");
					console.log("passthrough:", passthrough);
				}
			}

			finishRoll(
				rollID,
				{
					confirmationRollRequired: confirmationRollRequired,
					msg: msg,
					result: result,
					rollTag: passthrough["rollTag"],
					passthrough: packObject(passthrough)
				}
			);
		}
	);
});

on('clicked:combat_reaction', async (info) => {
	var received = unpackObject(info["originalRollId"]);

	/*
	Timing Check
	People may try to cheat by reacting to an old roll
	*/
	var rollTime = 0;
	results = await startRoll(received["rollMacro"]);
	console.log("combat_reaction: info:", info, "results:", results, "received:", received);

	// Time for triggering reaction before warning appears, in milliseconds
	var reactionTimeLimit = 15 * 60 * 1000;
	// One minute consists of 60 seconds of 1000 milliseconds each
	const minute = 60 * 1000;

	var timeDifference = Date.now() - received["rollTime"];

	if (timeDifference < 0) {
		console.log("Fishy time difference for roll and reaction roll gotten.", received);
		rollTime = -1
	} else if (timeDifference > reactionTimeLimit) {
		rollTime = 1;
	}

	var rolls = [
		results.results.roll0.result,
		results.results.roll1.result,
		results.results.roll2.result,
	];
	var roll = rolls[0];
	var originalResult = received["result"];
	var wert = received["wert"];
	var taw = received["taw"];
	var mod = received["mod"];
	var ansage = received["ansage"];
	var effWert = received["effWert"];
	var msg = 0;
	var result = 0;
	var isConfirmationRoll = received["isConfirmationRoll"];
	var cs = received["cs"];
	var cf = received["cf"];
	var passthrough = {};

	// komplette _Ansage_ darf nicht höher als Kampftechnik-TaW und AT-Wert der aktiven Waffe (das jeweils niedrigere gilt)
	if (
		ansage > 0 &&
		(
			wert < ansage || taw < ansage
		)
	) {
		msg = 1;
	}

	// Auswertung des Wurfs
	if (originalResult === -2) {
		if (roll >= cf || roll > effWert) {
			result = -3;
			passthrough["rollTime"] = received["rollTime"];
			passthrough["rollTag"] = received["rollTag"];
			passthrough["rollMacro"] =
				"@{gm_roll_opt} " +
				"&{template:DSA-Nahkampf-Patzer} " +
				"{{name=Nahkampfpatzer}} " +
				"{{wurf=[[2d6cs1cf6]]}} " +
				"{{isOriginalRoll=[[0]]}} " +
				"{{showRollTag=[[@{show_roll_tags}]]}} " +
				"{{rollTag=[[0]]}} " +
				"{{rollTime=[[0]]}} " +
				"{{rollExpired=[[0]]}} " +
				"{{rollTimeHuman=[[0]]}} " +
				"{{passthrough=[[0]]}}";
			console.log(passthrough);
		} else {
			result = -2;
		}
	} else if (originalResult === 2) {
		if (roll >= cf || roll > effWert) {
			result = 2;
		} else {
			result = 3;
		}
	}
	finishRoll(
		results.rollId,
		{
			msg: msg,
			result: result,
			rollExpired: rollTime,
			rollTag: received["rollTag"], // original roll's tag
			rollTime: received["rollTime"], // original roll's time
			rollTimeHuman: Math.floor(timeDifference / minute),
			passthrough: packObject(passthrough)
		}
	);
});
/* melee end */
