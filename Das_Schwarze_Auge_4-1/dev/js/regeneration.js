/* regeneration begin */
/* handle activation/deactivation of advantages/disadvantages */
on(
	"change:nachteil_schlechte_regeneration " +
	"change:vorteil_schnelle_heilung_i " +
	"change:vorteil_schnelle_heilung_ii " +
	"change:vorteil_schnelle_heilung_iii ",
	function(eventInfo) {
		var attrsToChange = {};
		var regenerationLevel = 0; // -1 to +3
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of life regeneration
			if (source === "nachteil_schlechte_regeneration" && eventInfo.newValue === "1") {
				regenerationLevel = -1;
			} else if (source === "nachteil_schlechte_regeneration" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (source === "vorteil_schnelle_heilung_i" && eventInfo.newValue === "1") {
				regenerationLevel = 1;
			} else if (source === "vorteil_schnelle_heilung_i" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (source === "vorteil_schnelle_heilung_ii" && eventInfo.newValue === "1") {
				regenerationLevel = 2;
			} else if (source === "vorteil_schnelle_heilung_ii" && eventInfo.newValue === "0") {
				regenerationLevel = 1;
			} else if (source === "vorteil_schnelle_heilung_iii" && eventInfo.newValue === "1") {
				regenerationLevel = 3;
			} else if (source === "vorteil_schnelle_heilung_iii" && eventInfo.newValue === "0") {
				regenerationLevel = 2;
			}

			switch(regenerationLevel) {
				case -1:
					attrsToChange["nachteil_schlechte_regeneration"] = "1";
					attrsToChange["vorteil_schnelle_heilung_i"] = "0";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "0";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "0";
					break;
				case 0:
					attrsToChange["nachteil_schlechte_regeneration"] = "0";
					attrsToChange["vorteil_schnelle_heilung_i"] = "0";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "0";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "0";
					break;
				case 1:
					attrsToChange["nachteil_schlechte_regeneration"] = "0";
					attrsToChange["vorteil_schnelle_heilung_i"] = "1";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "0";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "0";
					break;
				case 2:
					attrsToChange["nachteil_schlechte_regeneration"] = "0";
					attrsToChange["vorteil_schnelle_heilung_i"] = "1";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "1";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "0";
					break;
				case 3:
					attrsToChange["nachteil_schlechte_regeneration"] = "0";
					attrsToChange["vorteil_schnelle_heilung_i"] = "1";
					attrsToChange["vorteil_schnelle_heilung_ii"] = "1";
					attrsToChange["vorteil_schnelle_heilung_iii"] = "1";
					break;
			}

			// Regeneration mod from advantages/disadvantages
			attrsToChange["reg_le_mod_vn"] = regenerationLevel; // regeneration, life energy, modifier, advantages/disadvantages (Vorteile/Nachteile)
			safeSetAttrs(attrsToChange);
		}
});

on(
	"change:nachteil_verwoehnt " +
	"change:nachteil_verwoehnt_wert " +
	"change:nachteil_schlechte_regeneration " +
	"change:vorteil_schnelle_heilung_i " +
	"change:vorteil_schnelle_heilung_ii " +
	"change:vorteil_schnelle_heilung_iii " +
	"change:reg_schlaf_verwoehnt_zufrieden ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_verwoehnt', 'nachteil_verwoehnt_wert',
				'nachteil_schlechte_regeneration', 
				'vorteil_schnelle_heilung_i',
				'vorteil_schnelle_heilung_ii',
				'vorteil_schnelle_heilung_iii',
				'reg_schlaf_verwoehnt_zufrieden'
			], function(values) {
			var attrsToChange = {};

			// Handle "spoilt"
			var spoilt = 0;
			if (
				values["nachteil_verwoehnt"] === "1" &&
				values["reg_schlaf_verwoehnt_zufrieden"] === "0"
			) {
				spoilt = parseInt(values["nachteil_verwoehnt_wert"]);
			} else {
				spoilt = 0;
			}

			var regLEKOMod = spoilt;
			// Handle changes to degree of life regeneration
			if (values["nachteil_schlechte_regeneration"] === "1") {
				regLEKOMod += 2;
			} else if (values["vorteil_schnelle_heilung_iii"] === "1") {
				regLEKOMod -= 3;
			} else if (values["vorteil_schnelle_heilung_ii"] === "1") {
				regLEKOMod -= 2;
			} else if (values["vorteil_schnelle_heilung_i"] === "1") {
				regLEKOMod -= 1;
			} else {
				regLEKOMod += 0;
			}

			attrsToChange["reg_le_ko"] = `@{KO} - (1d20 + (${regLEKOMod}))`;

			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_astraler_block " +
	"change:vorteil_astrale_regeneration_i " +
	"change:vorteil_astrale_regeneration_ii " +
	"change:vorteil_astrale_regeneration_iii ",
	function(eventInfo) {
		var attrsToChange = {};
		var regenerationLevel = 0; // -1 to +3
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of astral regeneration
			if (eventInfo.sourceAttribute === "nachteil_astraler_block" && eventInfo.newValue === "1") {
				regenerationLevel = -1;
			} else if (eventInfo.sourceAttribute === "nachteil_astraler_block" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_i" && eventInfo.newValue === "1") {
				regenerationLevel = 1;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_i" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_ii" && eventInfo.newValue === "1") {
				regenerationLevel = 2;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_ii" && eventInfo.newValue === "0") {
				regenerationLevel = 1;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_iii" && eventInfo.newValue === "1") {
				regenerationLevel = 3;
			} else if (eventInfo.sourceAttribute === "vorteil_astrale_regeneration_iii" && eventInfo.newValue === "0") {
				regenerationLevel = 2;
			}

			// Populate attrsToChange so we don't forget later on
			switch(regenerationLevel) {
				case -1:
					attrsToChange["nachteil_astraler_block"] = "1";
					attrsToChange["vorteil_astrale_regeneration_i"] = "0";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "0";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "0";
					break;
				case 0:
					attrsToChange["nachteil_astraler_block"] = "0";
					attrsToChange["vorteil_astrale_regeneration_i"] = "0";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "0";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "0";
					break;
				case 1:
					attrsToChange["nachteil_astraler_block"] = "0";
					attrsToChange["vorteil_astrale_regeneration_i"] = "1";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "0";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "0";
					break;
				case 2:
					attrsToChange["nachteil_astraler_block"] = "0";
					attrsToChange["vorteil_astrale_regeneration_i"] = "1";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "1";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "0";
					break;
				case 3:
					attrsToChange["nachteil_astraler_block"] = "0";
					attrsToChange["vorteil_astrale_regeneration_i"] = "1";
					attrsToChange["vorteil_astrale_regeneration_ii"] = "1";
					attrsToChange["vorteil_astrale_regeneration_iii"] = "1";
					break;
			}

			// Regeneration mod from advantages/disadvantages
			attrsToChange["reg_ae_mod_vn"] = regenerationLevel;	// regeneration, astral energy, modifier, advantages/disadvantages (Vorteile/Nachteile)
			safeSetAttrs(attrsToChange);
		}
});

on(
	"change:nachteil_verwoehnt " +
	"change:nachteil_verwoehnt_wert " +
	"change:nachteil_astraler_block " +
	"change:vorteil_astrale_regeneration_i " +
	"change:vorteil_astrale_regeneration_ii " +
	"change:vorteil_astrale_regeneration_iii " +
	"change:reg_schlaf_verwoehnt_zufrieden ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_verwoehnt', 'nachteil_verwoehnt_wert',
				'nachteil_astraler_block', 
				'vorteil_astrale_regeneration_i',
				'vorteil_astrale_regeneration_ii',
				'vorteil_astrale_regeneration_iii',
				'reg_schlaf_verwoehnt_zufrieden'
			], function(values) {
			var attrsToChange = {};

			// Handle "spoilt"
			var spoilt = 0;
			if (
				values["nachteil_verwoehnt"] === "1" &&
				values["reg_schlaf_verwoehnt_zufrieden"] === "0"
			) {
				spoilt = parseInt(values["nachteil_verwoehnt_wert"]);
			} else {
				spoilt = 0;
			}

			var regAEINMod = spoilt;
			// Handle changes to degree of life regeneration
			if (values["nachteil_astraler_block"] === "1") {
				regAEINMod += 2;
			} else if (values["vorteil_astrale_regeneration_iii"] === "1") {
				regAEINMod -= 3;
			} else if (values["vorteil_astrale_regeneration_ii"] === "1") {
				regAEINMod -= 2;
			} else if (values["vorteil_astrale_regeneration_i"] === "1") {
				regAEINMod -= 1;
			} else {
				regAEINMod += 0;
			}

			attrsToChange["reg_ae_in"] = `@{IN} - (1d20 + (${regAEINMod}))`;

			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_krankheitsanfaellig " +
	"change:vorteil_immunitaet_gegen_krankheiten_alle " +
	"change:vorteil_immunitaet_gegen_krankheiten_wundfieber " +
	"change:vorteil_resistenz_gegen_krankheiten_alle ",
	function(eventInfo) {
		var attrsToChange = {};
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of astral regeneration
			if (eventInfo.sourceAttribute === "nachteil_krankheitsanfaellig" && eventInfo.newValue === "1") {
				attrsToChange["vorteil_immunitaet_gegen_krankheiten_alle"] = "0";
				attrsToChange["vorteil_immunitaet_gegen_krankheiten_wundfieber"] = "0";
				attrsToChange["vorteil_resistenz_gegen_krankheiten_alle"] = "0";
			} else if (eventInfo.sourceAttribute === "vorteil_resistenz_gegen_krankheiten_alle" && eventInfo.newValue === "1") {
				attrsToChange["vorteil_immunitaet_gegen_krankheiten_alle"] = "0";
				// immunity against a specific disease possible with resistence against all diseases
				attrsToChange["nachteil_krankheitsanfaellig"] = "0";
			} else if (eventInfo.sourceAttribute === "vorteil_immunitaet_gegen_krankheiten_wundfieber" && eventInfo.newValue === "1") {
				attrsToChange["nachteil_krankheitsanfaellig"] = "0";
			} else if (eventInfo.sourceAttribute === "vorteil_immunitaet_gegen_krankheiten_alle" && eventInfo.newValue === "1") {
				attrsToChange["vorteil_immunitaet_gegen_krankheiten_wundfieber"] = "0";
				attrsToChange["vorteil_resistenz_gegen_krankheiten_alle"] = "0";
				attrsToChange["nachteil_krankheitsanfaellig"] = "0";
			}
			safeSetAttrs(attrsToChange);
		}
});

on(
	"change:nachteil_schlafstoerungen_i " +
	"change:nachteil_schlafstoerungen_ii ",
	function(eventInfo) {
		var attrsToChange = {};
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of astral regeneration
			// No matter whether it's "0" or "1", deactivate the second level
			if (eventInfo.sourceAttribute === "nachteil_schlafstoerungen_i") {
				attrsToChange["nachteil_schlafstoerungen_ii"] = "0";
			} else if (eventInfo.sourceAttribute === "nachteil_schlafstoerungen_ii" && eventInfo.newValue === "1") {
				attrsToChange["nachteil_schlafstoerungen_i"] = "1";
			}

			safeSetAttrs(attrsToChange);
		}
});

on(
	"change:sf_regeneration_i " +
	"change:sf_regeneration_ii " +
	"change:sf_meisterliche_regeneration ",
	function(eventInfo) {
	safeGetAttrs([
		"sf_meisterliche_regeneration_leiteigenschaft",
		"MU", "KL", "IN", "CH", "FF", "GE", "KO", "KK"
	], function(v) {
		var attrsToChange = {};
		var regenerationLevel = 0; // 0 to +3
		const stats = {
			"@{MU}": v["MU"], 
			"@{KL}": v["KL"], 
			"@{IN}": v["IN"], 
			"@{CH}": v["CH"], 
			"@{FF}": v["FF"], 
			"@{GE}": v["GE"], 
			"@{KO}": v["KO"], 
			"@{KK}": v["KK"]
		};
		const mainStat = stats[v["sf_meisterliche_regeneration_leiteigenschaft"]];
		var AEBaseRegenerationRoll = "1d6";
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;

		if (sourceType === "player") {
			// Handle changes to degree of astral regeneration
			if (source === "sf_regeneration_i" && eventInfo.newValue === "1") {
				regenerationLevel = 1;
			} else if (source === "sf_regeneration_i" && eventInfo.newValue === "0") {
				regenerationLevel = 0;
			} else if (source === "sf_regeneration_ii" && eventInfo.newValue === "1") {
				regenerationLevel = 2;
			} else if (source === "sf_regeneration_ii" && eventInfo.newValue === "0") {
				regenerationLevel = 1;
			} else if (source === "sf_meisterliche_regeneration" && eventInfo.newValue === "1") {
				regenerationLevel = 3;
				AEBaseRegenerationRoll = parseInt(mainStat) / 3;
				AEBaseRegenerationRoll = DSAround(AEBaseRegenerationRoll).toString() + "d1";
			} else if (source === "sf_meisterliche_regeneration" && eventInfo.newValue === "0") {
				regenerationLevel = 2;
			}

			// Populate attrsToChange so we don't forget later on
			switch(regenerationLevel) {
				case 0:
					attrsToChange["sf_regeneration_i"] = "0";
					attrsToChange["sf_regeneration_ii"] = "0";
					attrsToChange["sf_meisterliche_regeneration"] = "0";
					break;
				case 1:
					attrsToChange["sf_regeneration_i"] = "1";
					attrsToChange["sf_regeneration_ii"] = "0";
					attrsToChange["sf_meisterliche_regeneration"] = "0";
					break;
				case 2:
					attrsToChange["sf_regeneration_i"] = "1";
					attrsToChange["sf_regeneration_ii"] = "1";
					attrsToChange["sf_meisterliche_regeneration"] = "0";
					break;
				case 3:
					attrsToChange["sf_regeneration_i"] = "1";
					attrsToChange["sf_regeneration_ii"] = "1";
					attrsToChange["sf_meisterliche_regeneration"] = "1";
					break;
			}
			attrsToChange["reg_ae_base"] = AEBaseRegenerationRoll;

			// Regeneration mod from special skills
			attrsToChange["reg_ae_mod_sf"] = regenerationLevel;	// regeneration, astral energy, modifier, special skills (Sonderfertigkeiten)
			safeSetAttrs(attrsToChange);
		}
	});
});

/* handle regeneration-related values */
on(
	"change:reg_le_mod_vn " +
	"change:reg_ae_mod_vn " +
	"change:nachteil_heimwehkrank " +
	"change:nachteil_nahrungsrestriktion " +
	"change:nachteil_schlafstoerungen_i " +
	"change:nachteil_schlafstoerungen_ii " +
	"change:nachteil_schlafwandler " +
	"change:nachteil_sucht " +
	"change:nachteil_sucht_giftstufe " +
	"change:nachteil_verwoehnt " +
	"change:nachteil_verwoehnt_wert ",
	function() {
	safeGetAttrs([
		"reg_le_mod_vn",
		"reg_ae_mod_vn",
		"nachteil_heimwehkrank",
		"nachteil_nahrungsrestriktion",
		"nachteil_schlafstoerungen_i",
		"nachteil_schlafstoerungen_ii",
		"nachteil_schlafwandler",
		"nachteil_sucht",
		"nachteil_sucht_giftstufe",
		"nachteil_verwoehnt",
		"nachteil_verwoehnt_wert"
	], function(v) {
		/* brauchen noch mehr UI
		heimwehkrank -> "außerhalb der Heimat" -> ja -> ae reg -1
		nahrungsrestriktion -> "Tage seit letzter Einhaltung der Restriktion" -> >0 und <=3 -> le/ae reg -2; >3 le/ae reg = 0, KO fällt (wird erst mal nur mitgeteilt, nicht berücksichtigt)
		schlafstoerungen_i -> 4 auf 1W4 -> le/ae reg nur 1w6-1, schlafdauer wie 4 h, Status "unausgeschlafen" -> AU auf 3/4 des max. cappen, Schlechte Eigenschaften +2, Talent/Zauberproben +3
		schlafstoerungen_ii -> 2 auf 1W2 -> wie schlafstoerungen_i; sonst: Einschlafprobe (Selbstbeherrschung +7) bei Scheitern wie schlafstoerungen_i
		schlafwandler -> 4 auf W4 -> le/ae reg -1
		sucht -> tage seit letztem Konsum -> Wert >= (15 - Giftstufe) -> le/ae reg = 0, pro Tag +Erschöpfung Giftstufe/3, schlechte Eigenschaften +Giftstufe/3, Talent- und Zauberproben +Giftstufe/3; Wert >= 2 * (15 - Giftstufe) -> erschöpfung, schlechte Eigenschaften, Probenmod +Giftstufe/2; Warnung bei Überanstrengung auf Max. -> KO-Senkung nicht implementiert; KO = 0 -> Giftstufe/2 SP pro Tag; vollständige (!?) Wiederherstellung durch eine Dosis möglich (Überanstrengung, Wiederaufbau KO "normal")
		*/
		/*
		Wundheilung aufnehmen
			mehr als 5 SP unbehandelt seit letzter Regeneration? -> Wundfieber möglich (bei gescheiterter oder ausgebliebener HKW-Probe) -> weitere Vor- und Nachteile beachten: Immunität gegen Krankheiten (alle/Wundfieber), Resistenz gegen Krankheiten (Wechselwirkung mit "Heimwehkrank" berücksichtigen), Krankheitsanfällig
			Abfrage im Roll: Erstversorgung oder Nachbehandlung -> TaP* entsprechend verrechnen
			Reihenfolge für Wundheilung festlegen: Kopf, Brust/Rücken, Bauch, RA, LA, RB, LB
			Schlechte Regeneration: +2 auf Wundheil-KO!
		*/
		/* Astrale Meditation: Thonnys mit/ohne SF */
		//safeSetAttrs(attrsToChange);
	});
});


on('clicked:reg_schlaf-action', async (info) => {
	const caller = "Action Listener for Regeneration Button (Sleep)";
	results = await startRoll(
		"@{gm_roll_opt} " +
		"&{template:default} " +
		"{{name=Gute Nacht!}} " +
		"{{le=[[@{LE}d1]]}} " +
		"{{lebase=[[1d6 + (@{reg_le_mod_vn}) + (@{reg_schlaf_mod_general}) + (@{reg_schlaf_mod_le})]]}} " +
		"{{leko=[[@{reg_le_ko}]]}} " +
		"{{wound=[[2d1]]}} " +
		"{{ae=[[@{AE}d1]]}} " +
		"{{aebase=[[@{reg_ae_base} + (@{reg_ae_mod_vn}) + (@{reg_ae_mod_sf}) + (@{reg_schlaf_mod_general}) + (@{reg_schlaf_mod_ae})]]}} " +
		"{{aein=[[@{reg_ae_in}]]}} " +
		"{{ke=[[@{KE}d1]]}} " +
		"{{kereg=[[0]]}} "
	);
	debugLog(caller, "head", "info:", info, "results:", results);
	var rollID = results.rollId;
	var results = results.results;

	safeGetAttrs(
		[
			'LE', 'AE', 'KE',
			'LE_max', 'AE_max', 'KE_max',
			'nachteil_verwoehnt',
			'reg_schlaf_verwoehnt_zufrieden'
		], function(values) {
		var attrsToChange = {};

		// LE Regeneration
		var LERegTotal = 0;
		// Additional regeneration from KO check
		var LEKO = 0;
		if (results["leko"].result >= 0) {
			LEKO = 1;
		} else {
			if (values["nachteil_verwoehnt"] === "1" && values["reg_schlaf_verwoehnt_zufrieden"] === "0") {
				LEKO = -1;
			} else {
				LEKO = 0;
			}
		}
		LERegTotal = results["lebase"].result + LEKO;
		LERegTotal = Math.max(LERegTotal, regLimitLower["le"]);
		attrsToChange["LE"] = parseInt(values["LE"]) + LERegTotal;
		attrsToChange["LE"] = Math.min(attrsToChange["LE"], values["LE_max"]);

		// AE Regeneration
		var AERegTotal = 0;
		// Additional regeneration from KO check
		var AEIN = 0;
		if (results["aein"].result >= 0) {
			AEIN = 1;
		} else {
			if (values["nachteil_verwoehnt"] === "1" && values["reg_schlaf_verwoehnt_zufrieden"] === "0") {
				AEIN = -1;
			} else {
				AEIN = 0;
			}
		}
		AERegTotal = results["aebase"].result + AEIN;
		AERegTotal = Math.max(AERegTotal, regLimitLower["ae"]);
		attrsToChange["AE"] = parseInt(values["AE"]) + AERegTotal;
		attrsToChange["AE"] = Math.min(attrsToChange["AE"], values["AE_max"]);
		console.log("values", values, "LERegTotal", LERegTotal, "AERegTotal", AERegTotal, "attrsToChange", attrsToChange);

		var KERegTotal = 0;
		safeSetAttrs(attrsToChange);
	});
			

	finishRoll(
		rollID,
		{	}
	);
});


/* regeneration end */
