/* regeneration start */
/* Handle active regeneration tabs when deactivating magic/karma */
const attrsUIReg = [
	'ui_tab_reg',
	'MagieTab',
	'LiturgienTab',
];
Object.freeze(attrsUIReg);

on(attrsUIReg.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function(eventInfo) {
		// Boilerplate
		const caller = "Action Listener for Showing/Hiding Regeneration Tabs";
		debugLog(caller, "eventInfo", eventInfo);

		// Preparation
		const sourceType = eventInfo["sourceType"];
		const sourceAttr = eventInfo["sourceAttribute"];
		const newValue = eventInfo["newValue"];

		// Quick decision
		if (sourceType === "player")
		{
			safeGetAttrs(attrsUIReg, function(values) {
				// Preparation
				const currentTab = values["ui_tab_reg"];
				/// Regeneration type always available
				const fallback = "sleep";
				let attrsToChange = {};

				// Handling changes to showing/hiding regeneration tabs
				/// The user must always see a non-hidden regeneration tab
				/// When hiding e. g. the magic tab, astral meditation gets hidden.
				/// If the user goes back to the regeneration tab it would appear empty
				/// if not set to a non-hidden regeneration type.
				if (
					(newValue === "1")
					&&
					(
						(
							(sourceAttr === "magietab")
							&&
							(currentTab === "astralmeditation")
						)
						||
						(
							(sourceAttr === "liturgientab")
							&&
							(currentTab === "karmicmeditation")
						)
					)
				)
				{
					attrsToChange["ui_tab_reg"] = fallback;
				}

				// Finish
				debugLog(caller, "attrsToChange", attrsToChange);
				safeSetAttrs(attrsToChange);
			});
		}
});

/* handle activation/deactivation of advantages/disadvantages */
on(
	"change:nachteil_schlechte_regeneration " +
	"change:vorteil_schnelle_heilung_i " +
	"change:vorteil_schnelle_heilung_ii " +
	"change:vorteil_schnelle_heilung_iii ",
	function(eventInfo) {
		let attrsToChange = {};
		let regenerationLevel = 0; // -1 to +3
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
			attrsToChange["reg_sleep_le_mod_advantages_disadvantages"] = regenerationLevel; // regeneration, life energy, modifier, advantages/disadvantages (Vorteile/Nachteile)
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
	"change:reg_sleep_spoilt_satisfied ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_verwoehnt', 'nachteil_verwoehnt_wert',
				'nachteil_schlechte_regeneration', 
				'vorteil_schnelle_heilung_i',
				'vorteil_schnelle_heilung_ii',
				'vorteil_schnelle_heilung_iii',
				'reg_sleep_spoilt_satisfied'
			], function(values) {
			let attrsToChange = {};

			// Handle "spoilt"
			let spoilt = 0;
			if (
				values["nachteil_verwoehnt"] === "1" &&
				values["reg_sleep_spoilt_satisfied"] === "0"
			) {
				spoilt = parseInt(values["nachteil_verwoehnt_wert"]);
			} else {
				spoilt = 0;
			}

			let regLEKOMod = spoilt;
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

			attrsToChange["reg_sleep_le_ko"] = `@{KO} - (1d20cs1cf20 + (${regLEKOMod}))`;

			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_astraler_block " +
	"change:vorteil_astrale_regeneration_i " +
	"change:vorteil_astrale_regeneration_ii " +
	"change:vorteil_astrale_regeneration_iii ",
	function(eventInfo) {
		let attrsToChange = {};
		let regenerationLevel = 0; // -1 to +3
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
			attrsToChange["reg_sleep_ae_mod_advantages_disadvantages"] = regenerationLevel;
			safeSetAttrs(attrsToChange);
		}
});

on(
	"change:nachteil_heimwehkrank " +
	"change:reg_sleep_homesickness_away_from_home ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_heimwehkrank',
				'reg_sleep_homesickness_away_from_home'
			], function(values) {
			let attrsToChange = {};

			// Handle "homesickness"
			let homesick = 0;
			if (
				values["nachteil_heimwehkrank"] === "1" &&
				values["reg_sleep_homesickness_away_from_home"] === "1"
			) {
				homesick = -1;
			} else {
				homesick = 0;
			}

			attrsToChange["reg_sleep_ae_mod_homesickness"] = homesick;

			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_nahrungsrestriktion " +
	"change:reg_sleep_food_restriction_violated_duration ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_nahrungsrestriktion',
				'reg_sleep_food_restriction_violated_duration'
			], function(values) {
			let attrsToChange = {};

			// Handle "food restriction"
			let restriction = 0;
			if (values["nachteil_nahrungsrestriktion"] === "1")
			{
				if (
					values["reg_sleep_food_restriction_violated_duration"] > 0 &&
					values["reg_sleep_food_restriction_violated_duration"] <= 3
				) {
					restriction = -2;
				} else if (values["reg_sleep_food_restriction_violated_duration"] > 3) {
					restriction = "total";
				} else {
					restriction = 0;
				}
			} else {
				restriction = 0;
			}

			switch(restriction) {
				case 0:
					attrsToChange["reg_sleep_food_restriction_effect"] = 0;
					attrsToChange["reg_sleep_le_mod_food_restriction"] = 0;
					attrsToChange["reg_sleep_ae_mod_food_restriction"] = 0;
					break;
				case -2:
					attrsToChange["reg_sleep_food_restriction_effect"] = 1;
					attrsToChange["reg_sleep_le_mod_food_restriction"] = -2;
					attrsToChange["reg_sleep_ae_mod_food_restriction"] = -2;
					break;
				case "total":
					attrsToChange["reg_sleep_food_restriction_effect"] = 2;
					attrsToChange["reg_sleep_le_mod_food_restriction"] = 0;
					attrsToChange["reg_sleep_ae_mod_food_restriction"] = 0;
					break;
				default:
					attrsToChange["reg_sleep_food_restriction_effect"] = 0;
					attrsToChange["reg_sleep_le_mod_food_restriction"] = 0;
					attrsToChange["reg_sleep_ae_mod_food_restriction"] = 0;
			}
			safeSetAttrs(attrsToChange);
		});
});

on(
	[
		"nachteil_unvertraeglichkeit_mit_verarbeitetem_metall",
		"vorteil_eisenaffine_aura",
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
		const caller = "Action Listener for Iron Affinity Related Advantages/Disadvantages";
		debugLog(caller, "eventInfo", eventInfo);

		// Preparation
		const sourceType = eventInfo["sourceType"];
		const sourceAttr = eventInfo["sourceAttribute"];
		const newValue = eventInfo["newValue"];
		let attrsToChange = {};

		// Handling changes to iron affinity related advantages/disadvantages
		if (sourceType === "player") {
			if (sourceAttr === "nachteil_unvertraeglichkeit_mit_verarbeitetem_metall" && newValue === "1") {
				attrsToChange["vorteil_eisenaffine_aura"] = "0";
			} else if (sourceAttr === "vorteil_eisenaffine_aura" && newValue === "1") {
				attrsToChange["nachteil_unvertraeglichkeit_mit_verarbeitetem_metall"] = "0";
			}
		}

		// Finish
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
});

on(
	"change:nachteil_verwoehnt " +
	"change:nachteil_verwoehnt_wert " +
	"change:nachteil_astraler_block " +
	"change:vorteil_astrale_regeneration_i " +
	"change:vorteil_astrale_regeneration_ii " +
	"change:vorteil_astrale_regeneration_iii " +
	"change:reg_sleep_spoilt_satisfied ",
	function(eventInfo) {
		safeGetAttrs(
			[
				'nachteil_verwoehnt', 'nachteil_verwoehnt_wert',
				'nachteil_astraler_block', 
				'vorteil_astrale_regeneration_i',
				'vorteil_astrale_regeneration_ii',
				'vorteil_astrale_regeneration_iii',
				'reg_sleep_spoilt_satisfied'
			], function(values) {
			let attrsToChange = {};

			// Handle "spoilt"
			let spoilt = 0;
			if (
				values["nachteil_verwoehnt"] === "1" &&
				values["reg_sleep_spoilt_satisfied"] === "0"
			) {
				spoilt = parseInt(values["nachteil_verwoehnt_wert"]);
			} else {
				spoilt = 0;
			}

			let regAEINMod = spoilt;
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

			attrsToChange["reg_sleep_ae_in"] = `@{IN} - (1d20cs1cf20 + (${regAEINMod}))`;

			safeSetAttrs(attrsToChange);
		});
});

on(
	"change:nachteil_krankheitsanfaellig " +
	"change:vorteil_immunitaet_gegen_krankheiten_alle " +
	"change:vorteil_immunitaet_gegen_krankheiten_wundfieber " +
	"change:vorteil_resistenz_gegen_krankheiten_alle ",
	function(eventInfo) {
		let attrsToChange = {};
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
		let attrsToChange = {};
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;
		/*
		Sleep Disorder I has a 25% chance (4 on 1d4) to strike, Sleep Disorder II a 50% chance (2 on 1d2).
		Effect is is the same in both cases.
		*/
		let sleepDisorder = { "trigger": "1d0", "effect": "1d6 - 1" };

		if (sourceType === "player") {
			// Handle changes to degree of sleep disorder
			if (source === "nachteil_schlafstoerungen_i") {
				attrsToChange["nachteil_schlafstoerungen_ii"] = "0";
				if (eventInfo.newValue === "0") {
					sleepDisorder["trigger"] = "1d0";
				} else if (eventInfo.newValue === "1") {
					sleepDisorder["trigger"] = "1d4";
				}
			} else if (source === "nachteil_schlafstoerungen_ii") {
				if (eventInfo.newValue === "1") {
					attrsToChange["nachteil_schlafstoerungen_i"] = "1";
					sleepDisorder["trigger"] = "1d2";
				} else if (eventInfo.newValue === "0") {
					sleepDisorder["trigger"] = "1d4";
				}
			}

			attrsToChange["reg_sleep_sleep_disorder_trigger"] = sleepDisorder["trigger"];
			attrsToChange["reg_sleep_sleep_disorder_effect"] = sleepDisorder["effect"];
			safeSetAttrs(attrsToChange);
		}
});

on("change:nachteil_schlafwandler",
	function(eventInfo) {
		let attrsToChange = {};
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;
		let effect = "0";
		/*
		Somnambulism has a 25% chance (4 on 1d4) to strike.
		*/
		if (sourceType === "player") {
			// Handle changes to degree of sleep disorder
			if (source === "nachteil_schlafwandler") {
				if (eventInfo.newValue === "0") {
					effect = "0";
				} else if (eventInfo.newValue === "1") {
					effect = "(-1) * ({ 0d1, 1d4 - 3 }kh1)";
				}
			}
			attrsToChange["reg_sleep_mod_somnambulism"] = effect;
			safeSetAttrs(attrsToChange);
		}
});

on(
	[
		"nachteil_sucht",
		"nachteil_sucht_giftstufe",
		"reg_sleep_addiction_withdrawal_duration"
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
		const caller = "Action Listener for Handling Addiction Effects";
		safeGetAttrs(
			[
				'nachteil_sucht',
				'nachteil_sucht_giftstufe',
				'reg_sleep_addiction_withdrawal_duration'
			], function(values) {
			debugLog(caller, "head", "eventInfo", eventInfo, "values", values);
			let attrsToChange = {};

			// Handle "addiction"
			let addiction = 0;
			if (values["nachteil_sucht"] === "1")
			{
				let threshold = 15 - parseInt(values["nachteil_sucht_giftstufe"]);
				if (values["reg_sleep_addiction_withdrawal_duration"] < threshold)
				{
					addiction = 0;
				} else if (
					values["reg_sleep_addiction_withdrawal_duration"] >= threshold &&
					values["reg_sleep_addiction_withdrawal_duration"] < 2 * threshold
				) {
					addiction = 1;
				} else {
					addiction = 2;
				}
			} else {
				addiction = 0;
			}

			switch(addiction) {
				case 0:
					attrsToChange["reg_sleep_addiction_withdrawal_effect"] = 0;
					break;
				case 1:
					attrsToChange["reg_sleep_addiction_withdrawal_effect"] = 1;
					break;
				case 2:
					attrsToChange["reg_sleep_addiction_withdrawal_effect"] = 2;
					break;
				default:
					attrsToChange["reg_sleep_addiction_withdrawal_effect"] = 0;
			}
			debugLog(caller, "tail", "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
});

function generateAEBaseMasterlyRegenerationRoll (statValue) {
	const func = "generateAEBaseMasterlyRegenerationRoll";
	debugLog(func, "statValue", statValue);

	let roll = parseInt(statValue) / 3;
	if (isNaN(roll))
	{
		debugLog(func, "statValue cannot be parsed as integer. Using default value.");
		roll = getDefaultValue("reg_sleep_ae_base");
	} else {
		roll = DSAround(roll);
		roll = roll.toString() + "d1cs2cf0";
	}
	return roll;
}

on(statAttrs.map(attr => "change:" + attr.toLowerCase()).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			...statAttrs,
			"sf_meisterliche_regeneration",
			"sf_meisterliche_regeneration_leiteigenschaft"
		] , function(v) {
		const func = "Action Listener Masterly Regeneration Principal Stat";
		debugLog(func, eventInfo, v);

		if (v["sf_meisterliche_regeneration"] === "1")
		{
			const source = eventInfo.sourceAttribute.toUpperCase();
			if (v["sf_meisterliche_regeneration_leiteigenschaft"] === "@{" + source + "}")
			{
				const principalStatValue = eventInfo.newValue;
				let attrsToChange = {};
				attrsToChange["reg_sleep_ae_base"] = generateAEBaseMasterlyRegenerationRoll(principalStatValue);

				debugLog(func, "attrsToChange", attrsToChange);
				safeSetAttrs(attrsToChange);
			}
		}
	});
});

on(astralRegenerationAttrs.map(attr => "change:" + attr.toLowerCase()).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			...astralRegenerationAttrs,
			...statAttrs,
			"reg_sleep_ae_mod_special_skills"
		], function(v) {
		const func = "Action Listener Astral Regeneration";
		debugLog(func, eventInfo, v);
		let attrsToChange = {};
		let regenerationLevel = 0; // 0 to +3
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
		let AEBaseRegenerationRoll = "1d6";
		const source = eventInfo.sourceAttribute;
		const sourceType = eventInfo.sourceType;
		const mainStat = stats[v["sf_meisterliche_regeneration_leiteigenschaft"]];

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
			} else if (source === "sf_meisterliche_regeneration" && eventInfo.newValue === "0") {
				regenerationLevel = 2;
			} else {
				regenerationLevel = v["reg_sleep_ae_mod_special_skills"];
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
					AEBaseRegenerationRoll = generateAEBaseMasterlyRegenerationRoll(mainStat);
					break;
			}
			attrsToChange["reg_sleep_ae_base"] = AEBaseRegenerationRoll;

			// Regeneration mod from special skills
			attrsToChange["reg_sleep_ae_mod_special_skills"] = regenerationLevel;	// regeneration, astral energy, modifier, special skills (Sonderfertigkeiten)
			debugLog(func, "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		}
	});
});

// Handling all changes leading to fixed regeneration
on(
	[
		"vorteil_eisenaffine_aura",
		"reg_sleep_addiction_withdrawal_effect",
		"reg_sleep_ae_armour_metal",
		"reg_sleep_ae_cuffed_feet",
		"reg_sleep_ae_cuffed_forehead",
		"reg_sleep_ae_cuffed_hands",
		"reg_sleep_ae_cuffed_neck",
		"reg_sleep_food_restriction_effect",
		"reg_sleep_ae_kosch_basalt",
	].map(attr => "change:" + attr).join(" ").trim(),
	function(eventInfo) {
		const caller = "Action Listener for Fixed Regeneration (Sleep)";
		safeGetAttrs(
			[
				"vorteil_eisenaffine_aura",
				"reg_sleep_addiction_withdrawal_effect",
				"reg_sleep_ae_armour_metal",
				"reg_sleep_ae_cuffed_feet",
				"reg_sleep_ae_cuffed_forehead",
				"reg_sleep_ae_cuffed_hands",
				"reg_sleep_ae_cuffed_neck",
				"reg_sleep_food_restriction_effect",
				"reg_sleep_ae_kosch_basalt",
			], function(values) {
			debugLog(caller, "head", "eventInfo", eventInfo, "values", values);

			// Preparation
			let attrsToChange = {};
			const affine = values["vorteil_eisenaffine_aura"];
			const addiction = values["reg_sleep_addiction_withdrawal_effect"];
			const metalArmour = values["reg_sleep_ae_armour_metal"];
			const cuffed = parseInt(values["reg_sleep_ae_cuffed_feet"]) || parseInt(values["reg_sleep_ae_cuffed_forehead"]) || parseInt(values["reg_sleep_ae_cuffed_hands"]) || parseInt(values["reg_sleep_ae_cuffed_neck"]);
			const restriction = values["reg_sleep_food_restriction_effect"];
			const koschBasalt = values["reg_sleep_ae_kosch_basalt"];
			// -1 is interpreted as "not set to a fixed value"
			let lefixed = -1;
			let aefixed = -1;

			// Handle addiction and food restriction
			if (
				addiction === 1 ||
				addiction === 2 ||
				restriction === 2
			) {
				lefixed = 0;
				aefixed = 0;
			}

			// Handle curse of iron related effects (AE regeneration only)
			if (
				(cuffed > 0 && affine !== "1") ||
				metalArmour === "1" ||
				koschBasalt === "1"
			)
			{
				aefixed = 0;
			}

			// Finish
			attrsToChange["reg_sleep_le_fixed"] = lefixed;
			attrsToChange["reg_sleep_ae_fixed"] = aefixed;
			debugLog(caller, "tail", "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
});

// Handling all changes for the effects of metal cuffs on AE regeneration
on(
	[
		"vorteil_eisenaffine_aura",
		"reg_sleep_ae_cuffed_feet",
		"reg_sleep_ae_cuffed_forehead",
		"reg_sleep_ae_cuffed_hands",
		"reg_sleep_ae_cuffed_neck",
	].map(attr => "change:" + attr).join(" ").trim(),
	function(eventInfo) {
		const caller = "Action Listener for Determination of Mild Effect of Cuffs (Sleep)";
		safeGetAttrs(
			[
			"vorteil_eisenaffine_aura",
			"reg_sleep_ae_cuffed_feet",
			"reg_sleep_ae_cuffed_forehead",
			"reg_sleep_ae_cuffed_hands",
			"reg_sleep_ae_cuffed_neck",
			], function(values) {
			debugLog(caller, "head", "eventInfo", eventInfo, "values", values);

			// Preparation
			let attrsToChange = {};
			const affine = values["vorteil_eisenaffine_aura"];
			const cuffed = parseInt(values["reg_sleep_ae_cuffed_feet"]) || parseInt(values["reg_sleep_ae_cuffed_forehead"]) || parseInt(values["reg_sleep_ae_cuffed_hands"]) || parseInt(values["reg_sleep_ae_cuffed_neck"]);

			let modCuffed = 0;

			// Handle curse of iron related effects (AE regeneration only)
			if (
				(cuffed > 0)
				&&
				(affine === "1")
			)
			{
				modCuffed = -2;
			}

			// Finish
			attrsToChange["reg_sleep_ae_mod_cuffed"] = modCuffed;
			debugLog(caller, "tail", "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
});

// Handling all changes for the effects of prolonged metal contact for sensitive characters AE regeneration
on(
	[
		"nachteil_unvertraeglichkeit_mit_verarbeitetem_metall",
		"reg_sleep_ae_sensitive_too_long_contact",
	].map(attr => "change:" + attr).join(" ").trim(),
	function(eventInfo) {
		const caller = "Action Listener for Determination of the Effect of Prolonged Metal Contact (Sleep)";
		safeGetAttrs(
			[
				"nachteil_unvertraeglichkeit_mit_verarbeitetem_metall",
				"reg_sleep_ae_sensitive_too_long_contact",
			], function(values) {
			debugLog(caller, "head", "eventInfo", eventInfo, "values", values);

			// Preparation
			let attrsToChange = {};
			const sensitive = values["nachteil_unvertraeglichkeit_mit_verarbeitetem_metall"];
			const contact = values["reg_sleep_ae_sensitive_too_long_contact"];

			let factor = 1;

			// Handle curse of iron related effects (AE regeneration only)
			if (
				(sensitive === "1")
				&&
				(contact === "1")
			)
			{
				factor = 0.5;
			}

			// Finish
			attrsToChange["reg_sleep_ae_factor_metal_sensitive_conscious_contact"] = factor;
			debugLog(caller, "tail", "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
});

/* handle regeneration-related values */
on(
	"change:reg_sleep_le_mod_advantages_disadvantages " +
	"change:reg_sleep_ae_mod_advantages_disadvantages " +
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
		"reg_sleep_le_mod_advantages_disadvantages",
		"reg_sleep_ae_mod_advantages_disadvantages",
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

/*
	Change Exhaustion/Overexertion

DSA is a bit complicated regarding exhaustion/overexertion. The fact that the sheet allows to deactivate one or the other or both makes it even worse. Since several regeneration types require increases/decreases to exhaustion/overexertion, this function was created to implement the logic only once.

If one time effects are applied, use the default steps = 1.
*/

function changeExhaustionOverexertion (
	{
		xhEnabled = true,
		xh = 0,
		xhMax = 0,
		xhRate = 0,
		oxEnabled = true,
		ox = 0,
		oxMax = 0,
		oxRate = 0,
		steps = 1
	} = {}
) {
	// Boilerplate
	const caller = "changeExhaustionOverexertion";
	debugLog(caller, "xhEnabled", xhEnabled, "xh", xh, "xhMax", xhMax, "xhRate", xhRate, "oxEnabled", oxEnabled, "ox", ox, "oxMax", oxMax, "oxRate", oxRate, "steps", steps);

	// Preparation
	const curValues = { "xh": xh, "ox": ox };
	const minValues = { "xh": 0, "ox": 0 };
	const maxValues = { "xh": xhMax, "ox": oxMax };
	const rates = { "xh": xhRate, "ox": oxRate };
	let results = {
		"xhNew": 0,
		"xhChange": 0,
		"oxNew": 0,
		"oxChange": 0,
	};
	debugLog(caller, "curValues", curValues, "minValues", minValues, "maxValues", maxValues, "rates", rates, "results", results);

	/// Input Sanitation
	if (typeof xhEnabled !== 'boolean')
	{
		xhEnabled = true;
		debugLog(caller, "xhEnabled not boolean.");
	}
	if (isNaN(parseInt(xh)) === true)
	{
		curValues["xh"] = 0;
		debugLog(caller, "xh cannot be converted to an integer.");
	}
	if (isNaN(parseInt(xhMax)) === true)
	{
		maxValues["xh"] = 0;
		debugLog(caller, "xhMax cannot be converted to an integer.");
	}
	if (isNaN(parseInt(xhRate)) === true)
	{
		rates["xh"] = 0;
		debugLog(caller, "xhRate cannot be converted to an integer.");
	}
	if (typeof oxEnabled !== 'boolean')
	{
		oxEnabled = true;
		debugLog(caller, "oxEnabled not boolean.");
	}
	if (isNaN(parseInt(ox)) === true)
	{
		curValues["ox"] = 0;
		debugLog(caller, "ox cannot be converted to an integer.");
	}
	if (isNaN(parseInt(oxMax)) === true)
	{
		maxValues["ox"] = 0;
		debugLog(caller, "oxMax cannot be converted to an integer.");
	}
	if (isNaN(parseInt(oxRate)) === true)
	{
		rates["ox"] = 0;
		debugLog(caller, "oxRate cannot be converted to an integer.");
	}
	if (isNaN(parseInt(steps)) === true)
	{
		steps = 0;
		debugLog(caller, "steps cannot be converted to an integer.");
	}

	//// Max values must not be less than min values
	maxValues["xh"] = Math.max(maxValues["xh"], minValues["xh"]);
	maxValues["ox"] = Math.max(maxValues["ox"], minValues["ox"]);

	//// Rates must have the same sign, if non-zero
	if (xhEnabled === true && oxEnabled === true)
	{
		if (
			(rates["xh"] < 0 && rates["ox"] > 0)
			||
			(rates["xh"] > 0 && rates["ox"] < 0)
		)
		{
			debugLog(caller, "xhRate and oxRate do not have the same sign. Exiting ...");
			return;
		}
	}

	//// Build-up Case: Usually, only xhRate is used by the game. Excess exhaustion gets added to overexertion.
	if (rates["xh"] > 0 && rates["ox"] === 0)
	{
		rates["ox"] = rates["xh"];
	}

	//// Make all required values immune against accidental overwrite
	Object.freeze(curValues);
	Object.freeze(minValues);
	Object.freeze(maxValues);

	// Calculations
	/// Case Definition
	let variant = "both";
	if (xhEnabled === true && oxEnabled === true)
	{
		variant = "both";
	} else if (xhEnabled === true && oxEnabled === false) {
		variant = "xh-only";
	} else if (xhEnabled === false && oxEnabled === true) {
		variant = "ox-only";
	} else if (xhEnabled === false && oxEnabled === false) {
		variant = "none";
	}

	if (rates["xh"] > 0 || rates["ox"] > 0)
	{
		variant += "+";
	} else if (rates["xh"] < 0 || rates["ox"] < 0) {
		variant += "-";
	}

	/// Cases
	results["xhNew"] = curValues["xh"];
	results["oxNew"] = curValues["ox"];

	switch(variant)
	{
		case "both+":
			for (let step = 0; step < steps; step++)
			{
				if (results["xhNew"] < maxValues["xh"])
				{
					results["xhNew"] += rates["xh"];
					if (results["xhNew"] > maxValues["xh"])
					{
						let xhExcess = results["xhNew"] - maxValues["xh"];
						results["oxNew"] += xhExcess;
					}
				} else if (results["oxNew"] < maxValues["ox"]) {
					results["oxNew"] += rates["ox"];
				} else {
					break;
				}
			}
			break;
		case "both-":
			for (let step = 0; step < steps; step++)
			{
				if (results["oxNew"] > minValues["ox"])
				{
					results["oxNew"] += rates["ox"];
				} else if (results["xhNew"] > minValues["xh"]) {
					results["xhNew"] += rates["xh"];
				} else {
					break;
				}
			}
			break;
		case "xh-only+":
		case "xh-only-":
			results["xhNew"] += steps * rates["xh"];
			break;
		case "ox-only+":
		case "ox-only-":
			results["oxNew"] += steps * rates["ox"];
			break;
		case "none+":
		case "none-":
			break;
		default:
			debugLog(caller, "Default case of variant switch triggered. Should not happen.");
			break;
	}
	//// Limiting
	results["xhNew"] = Math.max(minValues["xh"], results["xhNew"]);
	results["oxNew"] = Math.max(minValues["ox"], results["oxNew"]);
	results["xhNew"] = Math.min(maxValues["xh"], results["xhNew"]);
	results["oxNew"] = Math.min(maxValues["ox"], results["oxNew"]);

	//// Changes
	results["xhChange"] = results["xhNew"] - curValues["xh"];
	results["oxChange"] = results["oxNew"] - curValues["ox"];

	return results;
}

// Generating Regeneration Roll (Sleep)
on(
	[
		"character_name",
		"gm_roll_opt",
		"le", "au", "ae", "ke", "entrueckung",
		"le_max", "au_max", "ae_max", "ke_max",
		"erschoepfung", "erschoepfung_max", "verstecke_erschoepfung",
		"ueberanstrengung", "ueberanstrengung_max", "verstecke_ueberanstrengung",
		"nachteil_sucht_suchtmittel",
		"nachteil_sucht_giftstufe",
		"nachteil_verwoehnt",
		"reg_sleep_le_fixed",
		"reg_sleep_ae_fixed",
		"reg_sleep_le_ko",
		"reg_sleep_le_mod_food_restriction",
		"reg_sleep_le_mod_advantages_disadvantages",
		"reg_sleep_ae_base",
		"reg_sleep_ae_in",
		"reg_sleep_ae_factor_metal_sensitive_conscious_contact",
		"reg_sleep_ae_mod_homesickness",
		"reg_sleep_ae_mod_food_restriction",
		"reg_sleep_ae_mod_special_skills",
		"reg_sleep_ae_mod_advantages_disadvantages",
		"reg_sleep_ae_mod_cuffed",
		"reg_sleep_duration",
		"reg_sleep_mod_general", "reg_sleep_ae_mod_general", "reg_sleep_ke_mod_general", "reg_sleep_le_mod_general",
		"reg_sleep_mod_somnambulism",
		"reg_sleep_food_restriction_effect",
		"reg_sleep_sleep_disorder_trigger",
		"reg_sleep_addiction_withdrawal_effect",
		"reg_sleep_spoilt_satisfied",
		"taw_selbstbeherrschung",
		"eigenschaft1selbstbeherrschung", "eigenschaft2selbstbeherrschung", "eigenschaft3selbstbeherrschung",
		"cs_talent", "cf_talent",
		// Comfort for choosing only relevant regeneration
		"magietab",
		"liturgientab"
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			'character_name',
			'gm_roll_opt',
			'LE', 'AU', 'AE', 'KE', 'Entrueckung',
			'LE_max', 'AU_max', 'AE_max', 'KE_max',
			'erschoepfung', 'erschoepfung_max', 'verstecke_erschoepfung',
			'ueberanstrengung', 'ueberanstrengung_max', 'verstecke_ueberanstrengung',
			'nachteil_sucht_suchtmittel',
			'nachteil_sucht_giftstufe',
			'nachteil_verwoehnt',
			'reg_sleep_le_fixed',
			'reg_sleep_ae_fixed',
			'reg_sleep_le_ko',
			'reg_sleep_le_mod_food_restriction',
			'reg_sleep_le_mod_advantages_disadvantages',
			'reg_sleep_ae_base',
			'reg_sleep_ae_in',
			'reg_sleep_ae_factor_metal_sensitive_conscious_contact',
			'reg_sleep_ae_mod_homesickness',
			'reg_sleep_ae_mod_food_restriction',
			'reg_sleep_ae_mod_special_skills',
			'reg_sleep_ae_mod_advantages_disadvantages',
			'reg_sleep_ae_mod_cuffed',
			'reg_sleep_duration',
			'reg_sleep_mod_general', 'reg_sleep_ae_mod_general', 'reg_sleep_ke_mod_general', 'reg_sleep_le_mod_general',
			'reg_sleep_mod_somnambulism',
			'reg_sleep_food_restriction_effect',
			'reg_sleep_sleep_disorder_trigger',
			'reg_sleep_addiction_withdrawal_effect',
			'reg_sleep_spoilt_satisfied',
			'TaW_selbstbeherrschung',
			'Eigenschaft1selbstbeherrschung', 'Eigenschaft2selbstbeherrschung', 'Eigenschaft3selbstbeherrschung',
			'cs_talent', 'cf_talent',
			'MagieTab',
			'LiturgienTab'
		], function(values) {
		const caller = "Action Listener for Generation of Regeneration Roll (Sleep)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);
		let attrsToChange = {};

		// Combined effect of having astral energy and karma energy
		let rapture = parseInt(values["Entrueckung"]);
		let AEKERoll = [ "{{aert=[[0]]}}" ];
		if (isNaN(rapture) === false)
		{
			let aert = -DSAround(rapture / 10);
			// Only add iff there is a visible effect
			if (aert !== 0)
			{
				AEKERoll = [ `{{aert=[[${aert}]]}}` ];
			}
		}

		const rollHead = [
			values["gm_roll_opt"],
			"&{template:reg-sleep}",
			`{{charactername=${values["character_name"]}}}`,
			`{{duration=[[${values["reg_sleep_duration"]}]]}}`,
			`{{le=[[${values["LE"]}]]}}`,
			`{{au=[[${values["AU"]}]]}}`,
			`{{xh=[[${values["erschoepfung"]}]]}}`,
			`{{ox=[[${values["ueberanstrengung"]}]]}}`,
			`{{ae=[[${values["AE"]}]]}}`,
			`{{ke=[[${values["KE"]}]]}}`,
			`{{rt=[[${values["Entrueckung"]}]]}}`,
		];
		const LERoll = [
			`{{lemax=[[${values["LE_max"]}]]}}`,
			`{{lefixed=[[${values["reg_sleep_le_fixed"]}]]}}`,
			`{{lebase=[[1d6 + [allgemeiner Modifikator](${values["reg_sleep_mod_general"]}) + [Modifikator für LE-Regeneration](${values["reg_sleep_le_mod_general"]})]]}}`,
			`{{lead=[[(${values["reg_sleep_le_mod_advantages_disadvantages"]})]]}}`,
			`{{leko=[[${values["reg_sleep_le_ko"]}]]}}`,
			"{{lenew=[[0]]}}",
			"{{lerequired=[[1]]}}",
		];
		const noLERoll = [ "{{lerequired=[[0]]}}" ];
		// sleepDisorderRoll incorporates part of AURoll, leaving out the last element (aurequired)
		const AURoll = [
			`{{aumax=[[${values["AU_max"]}]]}}`,
			`{{aunew=[[0]]}}`,
			"{{aurequired=[[1]]}}",
		];
		const noAURoll = [ "{{aurequired=[[0]]}}" ];
		const exhaustionRoll = [
			`{{xhmax=[[${values["erschoepfung_max"]}]]}}`,
			'{{xhloss=[[0]]}}',
			'{{xhnew=[[0]]}}',
			"{{xhrequired=[[1]]}}",
		];
		const noExhaustionRoll = [ "{{xhrequired=[[0]]}}" ];
		const overexertionRoll = [
			`{{oxmax=[[${values["ueberanstrengung_max"]}]]}}`,
			'{{oxloss=[[0]]}}',
			'{{oxnew=[[0]]}}',
			"{{oxrequired=[[1]]}}",
		]
		const noOverexertionRoll = [ "{{oxrequired=[[0]]}}" ];
		const AERoll = [
			`{{aemax=[[${values["AE_max"]}]]}}`,
			`{{aefixed=[[${values["reg_sleep_ae_fixed"]}]]}}`,
			`{{aebase=[[${values["reg_sleep_ae_base"]} + [allgemeiner Modifikator](${values["reg_sleep_mod_general"]}) + [Modifikator für AE-Regeneration](${values["reg_sleep_ae_mod_general"]})]]}}`,
			`{{aead=[[${values["reg_sleep_ae_mod_advantages_disadvantages"]}]]}}`,
			`{{aess=[[${values["reg_sleep_ae_mod_special_skills"]}]]}}`,
			`{{aein=[[${values["reg_sleep_ae_in"]}]]}}`,
			"{{aenew=[[0]]}}",
			"{{aerequired=[[1]]}}",
		];
		const AECuffedRoll = [ `{{aecuffed=[[${values["reg_sleep_ae_mod_cuffed"]}]]}}` ];
		const AEMetalContactRoll = [
			`{{aefactor=[[${values["reg_sleep_ae_factor_metal_sensitive_conscious_contact"]}]]}}`,
			"{{aemetal=[[0]]}}",
		];
		const noAERoll = [ "{{aerequired=[[0]]}}" ];
		const KERoll = [
			`{{kemax=[[${values["KE_max"]}]]}}`,
			`{{kebase=[[ 0 + [Basisregeneration] 1 + [Modifikator für KE-Regeneration](${values["reg_sleep_ke_mod_general"]})]]}}`,
			"{{kenew=[[0]]}}",
			"{{kerequired=[[1]]}}",
			`{{rtloss=[[0]]}}`,
			`{{rtgain=[[0]]}}`,
			"{{rtnew=[[0]]}}",
			"{{rtrequired=[[1]]}}",
		];
		const noKERoll = [
			"{{kerequired=[[0]]}}",
			"{{rtrequired=[[0]]}}",
		];
		const homesicknessRoll = `{{homesick=[[${values["reg_sleep_ae_mod_homesickness"]}]]}}`;
		const foodRestrictionRoll = [
			'{{foodrestriction=[[(@{reg_sleep_food_restriction_effect})]]}}',
			`{{lefr=[[${values["reg_sleep_le_mod_food_restriction"]}]]}}`,
			`{{aefr=[[${values["reg_sleep_ae_mod_food_restriction"]}]]}}`
		];
		// This incorporates AURoll, so be careful to changes to AURoll
		const sleepDisorderRoll = [
			// general decision for triggering sleep disorder or not
			`{{sleepdisorder=[[${values["reg_sleep_sleep_disorder_trigger"]}]]}}`,
			// effect of sleep disorder on life regeneration, "(-1) *", because Roll20 cannot parse the unary minus
			"{{lesd=[[(-1) * (@{reg_sleep_sleep_disorder_effect})]]}}",
			// effect of sleep disorder on astral regeneration, "(-1) *", because Roll20 cannot parse the unary minus
			"{{aesd=[[(-1) * (@{reg_sleep_sleep_disorder_effect})]]}}",
			// case for showing correct parts in roll template
			"{{sleepdisordercase=[[0]]}}",
			... AURoll.slice(0,-1),
		];
		const sleepDisorderIIRoll = [
			`{{taw=[[${values["TaW_selbstbeherrschung"]}]]}}`,
			"{{mod=[[7]]}}",
			"{{stats=[[ " +
				`[Eigenschaft 1:] [[${values["Eigenschaft1selbstbeherrschung"]}]]d1cs0cf2 + ` +
				`[Eigenschaft 2:] [[${values["Eigenschaft2selbstbeherrschung"]}]]d1cs0cf2 + ` +
				`[Eigenschaft 3:] [[${values["Eigenschaft3selbstbeherrschung"]}]]d1cs0cf2 + ` +
				"]]}}",
			`{{selfcontrol=[[3d20cs<${values["cs_talent"]}cf>${values["cf_talent"]}]]}}`,
			"{{selfcontrolresult=[[0]]}}",
			"{{selfcontrolcriticality=[[0]]}}",
			`{{critthresholds=[[[[${values["cs_talent"]}]]d1cs0cf2 + [[${values["cf_talent"]}]]d1cs0cf2]]}}`
		];
		const somnambulismRoll = "{{somnambulism=[[(@{reg_sleep_mod_somnambulism})]]}}";
		const addictionRoll = [
			`{{addictioneffect=[[${values["reg_sleep_addiction_withdrawal_effect"]}]]}}`,
			`{{addictionpoisonstrength=[[${values["nachteil_sucht_giftstufe"]}]]}}`,
			`{{addictiondrug=${values["nachteil_sucht_suchtmittel"]}}}`,
			'{{xhaddiction=[[0]]}}',
			'{{oxaddiction=[[0]]}}',
		];
		const spoiltRoll = [
			`{{spoilt=[[${values["nachteil_verwoehnt"]}]]}}`,
			`{{spoiltsatisfied=[[${values["reg_sleep_spoilt_satisfied"]}]]}}`,
		];
		const nonerequiredRoll = [
			"{{nonerequired=[[1]]}}"
		];

		// Build roll
		let roll = [];
		roll = roll.concat(rollHead);

		/// LE
		if (values["LE"] < values["LE_max"])
		{
			roll = roll.concat(LERoll);
		} else {
			roll = roll.concat(noLERoll);
		}

		/// AU
		if (values["AU"] < values["AU_max"])
		{
			roll = roll.concat(AURoll);
		} else {
			roll = roll.concat(noAURoll);
		}

		/// Exhaustion
		const exhaustionMin = 0;
		const overexertionMin = 0;
		if (
			(
				(values["erschoepfung"] > exhaustionMin)
				||
				(values["ueberanstrengung"] > overexertionMin)
				||
				(values["reg_sleep_addiction_withdrawal_effect"] !== 0)
			)
			&&
			(values["verstecke_erschoepfung"] !== "1")
		)
		{
			roll = roll.concat(exhaustionRoll);
		} else {
			roll = roll.concat(noExhaustionRoll);
		}

		/// Overexertion
		if (
			(
				(values["ueberanstrengung"] > overexertionMin)
				||
				(values["reg_sleep_addiction_withdrawal_effect"] !== 0)
			)
			&&
			(values["verstecke_ueberanstrengung"] !== "1")
		)
		{
			roll = roll.concat(overexertionRoll);
		} else {
			roll = roll.concat(noOverexertionRoll);
		}

		/// Additional properties for astral energy regeneration, "0" = not hidden
		if (
			(values["MagieTab"] === "0")
			&&
			(values["AE"] < values["AE_max"])
		)
		{
			roll = roll.concat(AERoll);
			if (values["reg_sleep_ae_mod_cuffed"] !== 0)
			{
				roll = roll.concat(AECuffedRoll);
			}
			if (values["reg_sleep_ae_factor_metal_sensitive_conscious_contact"] !== 1)
			{
				roll = roll.concat(AEMetalContactRoll);
			}
		} else {
			roll = roll.concat(noAERoll);
		}

		/// Additional properties for karma energy regeneration, "0" = not hidden
		const raptureMin = 0;
		if (
			(values["LiturgienTab"] === "0")
			&&
			(
				(values["KE"] < values["KE_max"])
				||
				(values["Entrueckung"] > raptureMin)
			)
		)
		{
			roll = roll.concat(KERoll);
		} else {
			roll = roll.concat(noKERoll);
		}

		/// Additional properties for astral energy and karma energy regeneration, "0" = not hidden
		if ( (values["MagieTab"] === "0") && (values["LiturgienTab"] === "0") )
		{
			roll = roll.concat(AEKERoll);
		}

		/// Additional property for homesickness
		if (values["reg_sleep_ae_mod_homesickness"] !== 0)
		{
			roll = roll.concat(homesicknessRoll);
		}

		/// Additional property for food restriction
		if (values["reg_sleep_food_restriction_effect"] !== 0)
		{
			roll = roll.concat(foodRestrictionRoll);
		}

		/// Additional properties for sleep disorder
		switch(values["reg_sleep_sleep_disorder_trigger"])
		{
			case "1d2":
				roll = roll.concat(sleepDisorderIIRoll);
				// break missing on purpose
			case "1d4":
				roll = roll.concat(sleepDisorderRoll);
				break;
		}

		/// Additional property for somnambulism
		if (values["reg_sleep_mod_somnambulism"] !== "0")
		{
			roll = roll.concat(somnambulismRoll);
		}

		/// Additional properties for addition
		if (values["reg_sleep_addiction_withdrawal_effect"] !== 0)
		{
			roll = roll.concat(addictionRoll);
		}

		/// Additional properties for spoilt
		if (values["nachteil_verwoehnt"] !== "0")
		{
			roll = roll.concat(spoiltRoll);
		}

		/// Modifications if fixed regeneration
		if (values["reg_sleep_le_fixed"] !== -1)
		{
			roll[roll.findIndex(value => /lebase=/.test(value))] = `{{lebase=[[${values["reg_sleep_le_fixed"]}]]}}`;
			roll[roll.findIndex(value => /leko=/.test(value))] = "{{leko=[[0]]}}";
		}
		if (values["reg_sleep_ae_fixed"] !== -1)
		{
			roll[roll.findIndex(value => /aebase=/.test(value))] = `{{aebase=[[${values["reg_sleep_ae_fixed"]}]]}}`;
			roll[roll.findIndex(value => /aein=/.test(value))] = "{{aein=[[0]]}}";
		}

		/// Regeneration required?
		if (
			(parseInt(values["LE"]) >= parseInt(values["LE_max"]))
			&&
			(parseInt(values["AU"]) >= parseInt(values["AU_max"]))
			&&
			(
				(parseInt(values["AE"]) >= parseInt(values["AE_max"]))
				||
				(values["MagieTab"] === "1")
			)
			&&
			(
				(parseInt(values["KE"]) >= parseInt(values["KE_max"]))
				||
				(values["LiturgienTab"] === "1")
			)
			&&
			(
				(parseInt(values["erschoepfung"]) === exhaustionMin)
				||
				(values["verstecke_erschoepfung"] === "1")
			)
			&&
			(
				(parseInt(values["ueberanstrengung"]) === overexertionMin)
				||
				(values["verstecke_ueberanstrengung"] === "1")
			)
			&&
			(
				(parseInt(values["Entrueckung"]) === raptureMin)
				||
				(values["LiturgienTab"] === "1")
			)
			&&
			(values["reg_sleep_sleep_disorder_trigger"] === "1d0")
			&&
			(parseInt(values["reg_sleep_addiction_withdrawal_effect"]) === 0)
		)
		{
			roll = [];
			roll = roll.concat(rollHead);
			roll = roll.concat(nonerequiredRoll);
		}

		// Finishing
		attrsToChange["reg_sleep_roll"] = roll.join(" ").trim();
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

on('clicked:reg_sleep-action', async (info) => {
	// Boilerplate
	const caller = "Action Listener for Regeneration Button (Sleep)";
	let computed = {};
	let attrsToChange = {};

	// Roll
	let results = await startRoll("@{reg_sleep_roll}");
	debugLog(caller, "head", "info:", info, "results:", results);

	// Convenience
	let rollID = results.rollId;

	// Convenience Object
	let resultsOnly = {};
	for (let property in results["results"])
	{
		resultsOnly[property] = results["results"][property].result;
	}
	if (Object.hasOwn(resultsOnly, "xhrequired"))
	{
		if (resultsOnly["xhrequired"] === 1)
		{
			resultsOnly["xhrequired"] = true;
		} else {
			resultsOnly["xhrequired"] = false;
		}
	}
	if (Object.hasOwn(resultsOnly, "oxrequired"))
	{
		if (resultsOnly["oxrequired"] === 1)
		{
			resultsOnly["oxrequired"] = true;
		} else {
			resultsOnly["oxrequired"] = false;
		}
	}
	Object.freeze(resultsOnly);

	// Fast Decision
	if (Object.hasOwn(resultsOnly, "nonerequired"))
	{
		debugLog(caller, "tail", "rollID", rollID, "attrsToChange", attrsToChange, "computed", computed);
		finishRoll(rollID);
	} else {
		// Sleep Disorder
		/* Sleep Disorder 2 can have convoluted consequences
		If the sleep disorder did not trigger, the character needs to roll a self-control check +7.
		If the check succeeds, normal regeneration takes place.
		If the check fails, reduced regeneration takes place.
		If the sleep disorder triggers, reduced regeneration takes place.

		Algorithm:
			Determine the sleep disorder level (0, 1 or 2)
			Determine the triggered state of the sleep disorder (based on the highest roll result)
			Evaluate the self-control check (if available)
			Apply the self-control results to sleep duration (and thereby also exhaustion and overexertion), LE, AU and AE regeneration
		*/
		/// Always relevant, because negative effects limit stamina to 3/4 (no constant, so it can be changed later)
		const sleepDisorderAULimitActive = 3/4
		const sleepDisorderAULimitInactive = 1;
		let sleepDisorderAULimit = sleepDisorderAULimitInactive;
		let sleepDisorderResult = 0;
		let sleepDisorder = {"level": 0, "triggered": -1};

		/// Level (of sleep disorder) and case (triggered)
		//// triggered
		//// 	-1 not triggered (no sleep disorder)
		//// 	0 not triggered (sleep disorder)
		//// 	1 (triggered)
		//// 	2 (triggered, but self-control check allowed; only sleep disorder 2)
		if (Object.hasOwn(resultsOnly, "sleepdisordercase"))
		{
			const sleepDisorderDice = { "1d0": 0, "1d4": 1, "1d2": 2 };
			let expression = results.results["sleepdisorder"]["expression"] ?? 0;
			let result = resultsOnly["sleepdisorder"] ?? 1;
			let level = 0;
			let triggered = -1;
			if (expression !== 0)
			{
				level = sleepDisorderDice[expression];
			} else {
				level = 0;
			}

			switch(level)
			{
				case 0:
					triggered = -1;
					sleepDisorderAULimit = sleepDisorderAULimitInactive;
					break;
				case 1:
					if (result === 4)
					{
						triggered = 1;
						sleepDisorderAULimit = sleepDisorderAULimitActive;
					} else {
						triggered = 0;
						sleepDisorderAULimit = sleepDisorderAULimitInactive;
					}
					break;
				case 2:
					if (result === 2)
					{
						triggered = 1;
						sleepDisorderAULimit = sleepDisorderAULimitActive;
					} else {
						triggered = 2;
					}
					break;
				default:
					triggered = -1;
					sleepDisorderAULimit = sleepDisorderAULimitInactive;
			}

			sleepDisorder["level"] = level;
			sleepDisorder["triggered"] = triggered;
			computed["sleepdisordercase"] = sleepDisorder["triggered"];
		}

		// Process potential self-control roll for sleep disorder
		if (
			(Object.hasOwn(resultsOnly, "selfcontrol"))
			&&
			(sleepDisorder["triggered"] === 2)
		)
		{
			let TaW = resultsOnly["taw"];
			let mod = resultsOnly["mod"];
			let stats = [
				results.results.stats.rolls[0].dice,
				results.results.stats.rolls[1].dice,
				results.results.stats.rolls[2].dice
			];
			let rolls = results.results.selfcontrol.rolls[0].results;
			let success = results.results.critthresholds.rolls[0].dice;
			let failure = results.results.critthresholds.rolls[1].dice;
			/* Result
			0	Failure
			1	Success
			*/
			let result = 0;
			/* Criticality
			-3	Triple 20
			-2	Double 20
			 0	no double 1/20
			+2	Double 1
			+3	Triple 1
			*/
			let criticality = 0;

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
			let effRolls = rolls;
			let effTaW = TaW - mod;
			let TaPstar = effTaW;

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
				TaPstar = Math.min(TaW, TaPstar);

				// Ergebnis an Doppel/Dreifach-20 anpassen
				if (Math.abs(criticality) <= 1)
				{
					result = TaPstar < 0 ? 0 : 1;
				} else if (criticality <= -2) {
					result = 0;
				}
			}

			// Finish
			sleepDisorderResult = result;
			if (sleepDisorderResult === 0)
			{
				sleepDisorderAULimit = sleepDisorderAULimitActive;
			} else {
				sleepDisorderAULimit = sleepDisorderAULimitInactive;
			}
			computed["selfcontrol"] = TaPstar;
			computed["selfcontrolresult"] = result;
			computed["selfcontrolcriticality"] = criticality;
			computed["stats"] = stats.toString().replaceAll(",", "/");
		}

		// Sleep Duration
		// Sleeping disorder reduces the sleep time, rules are not comprehensive
		// Default sleep duration: 6 h, shortened to 4 h (according to rules)
		// Apply that to longer durations as well (no rules)
		// What happens for sleep duration < 6 h? (no rules) -> 2/3, rounded down to full hours
		let duration = resultsOnly["duration"];
		if (
			Object.hasOwn(resultsOnly, "sleepdisordercase") &&
			(
				sleepDisorder["triggered"] === 1 ||
				(
					sleepDisorder["triggered"] === 2 &&
					computed["selfcontrolresult"] === 0
				)
			)
		)
		{
			if (resultsOnly["duration"] >= 6)
			{
				duration = 4;
			} else {
				duration = Math.floor(resultsOnly["duration"] * 2 / 3);
			}
		}
		computed["duration"] = duration;

		// LE
		/// Preparation
		let LERegTotal = 0;
		let LENew = resultsOnly["le"];
		let LEChanged = resultsOnly["lerequired"];

		if (LEChanged === 1 && duration > 0)
		{

			// No need for calculations in case the regeneration is fixed
			/// Calculate the total amount of regeneration from all sources
			if (resultsOnly["lefixed"] === -1)
			{
				// Base regeneration
				LERegTotal = resultsOnly["lebase"];

				// Regeneration from advantages/disadvantages
				LERegTotal += resultsOnly["lead"];

				// Additional regeneration from KO check
				/// It's usually 1 or 0 depending on the check result, except when your spoilt, then it can also be -1
				let LEKO = 0;
				if (resultsOnly["leko"] >= 0) {
					LEKO = 1;
				} else {
					if (resultsOnly["spoilt"] === 1 && resultsOnly["spoiltsatisfied"] === 0) {
						LEKO = -1;
					} else {
						LEKO = 0;
					}
				}
				LERegTotal += LEKO;

				// Regeneration from food restrction
				if (Object.hasOwn(resultsOnly, "lefr"))
				{
					LERegTotal += resultsOnly["lefr"];
				}

				// Sleep disorder
				if (
					Object.hasOwn(resultsOnly, "sleepdisordercase") &&
					(
						sleepDisorder["triggered"] === 1 ||
						(
							sleepDisorder["triggered"] === 2 &&
							computed["selfcontrolresult"] === 0
						)
					)
				)
				{
					LERegTotal += resultsOnly["lesd"];
				}

				// Somnambulism
				if (Object.hasOwn(resultsOnly, "somnambulism"))
				{
					LERegTotal += resultsOnly["somnambulism"];
				}

				// Finish
				computed["lebase"] = resultsOnly["lebase"];
				computed["lead"] = resultsOnly["lead"];
				computed["leko"] = LEKO;
			} else {
				// required for roll template
				computed["lebase"] = resultsOnly["lefixed"];
				computed["lead"] = 0;
				computed["leko"] = 0;
				LERegTotal = resultsOnly["lefixed"];
			}
			LERegTotal = Math.max(LERegTotal, regLimitLower["le"]);
		} else if (LEChanged === 1 && duration === 0) {
			// No sleep, no regeneration
			LERegTotal = 0;
			computed["lebase"] = 0;
			computed["lead"] = 0;
			computed["leko"] = 0;
			LEChanged = 0;
		}
		/// Finish
		LENew += LERegTotal;
		LENew = Math.min(LENew, resultsOnly["lemax"]);
		if (LEChanged === 1)
		{
			computed["lenew"] = LENew;
			attrsToChange["LE"] = LENew;
		}

		// AU
		/// Preparation
		const AU = resultsOnly["au"];
		const AUMax = resultsOnly["aumax"];
		let AUNew = AU;
		let AUChanged = 0;

		if (
			(
				(resultsOnly["aurequired"] === 1)
				||
				(Object.hasOwn(resultsOnly, "sleepdisordercase"))
			)
			&&
			(duration > 0)
		)
		{
			// Calculations
			AUNew = DSAround(sleepDisorderAULimit * AUMax);
			AUChanged = 1;
		} else if (
			(
				(resultsOnly["aurequired"] === 1)
				||
				(Object.hasOwn(resultsOnly, "sleepdisordercase"))
			)
			&&
			(duration === 0)
		)
		{
			AUNew = AU;
			AUChanged = 1;
		}
		/// Finish
		if (AUChanged === 1)
		{
			computed["aurequired"] = AUChanged;
			computed["aunew"] = AUNew;
			attrsToChange["AU"] = AUNew;
		}

		// Exhaustion or Overexertion
		/// Preparations
		const exhaustion = resultsOnly["xh"];
		const exhaustionMax = resultsOnly["xhmax"];
		const exhaustionMin = 0;
		const overexertion = resultsOnly["ox"];
		const overexertionMax = resultsOnly["oxmax"];
		const overexertionMin = 0;
		let exhaustionNew = 0;
		let exhaustionLoss = 0;
		let exhaustionAddiction = 0;
		let exhaustionChange = 0;
		let overexertionNew = 0;
		let overexertionLoss = 0;
		let overexertionAddiction = 0;
		let overexertionChange = 0;

		/// Regeneration can only take place if not under severe food restriction or even mild addiction withdrawal
		if (
			(duration > 0)
			&&
			(
				(resultsOnly["xhrequired"])
				||
				(resultsOnly["oxrequired"])
			)
		)
		{
			// Determine regeneration case
			// from good to bad: normal (reduction), foodrestricted (no reduction), withdrawal (buildup)
			/// Preparation
			let regCase = "normal";

			if (
				(Object.hasOwn(resultsOnly, "foodrestriction"))
				&&
				(resultsOnly["foodrestriction"] === 2)
			)
			{
				regCase = "foodrestricted";
			}

			if (
				(Object.hasOwn(resultsOnly, "addictioneffect"))
				&&
				(resultsOnly["addictioneffect"] !== 0)
			)
			{
				regCase = "withdrawal";
			}

			// Handle regeneration cases
			switch(regCase)
			{
				case "normal":
					{
						let result = changeExhaustionOverexertion(
							{
								"xhEnabled": resultsOnly["xhrequired"],
								"xh": resultsOnly["xh"],
								"xhMax": exhaustionMax,
								"xhRate": -4,
								"oxEnabled": resultsOnly["oxrequired"],
								"ox": resultsOnly["ox"],
								"oxMax": overexertionMax,
								"oxRate": -2,
								"steps": duration,
							}
						);
						// Finish
						exhaustionNew = result["xhNew"];
						overexertionNew = result["oxNew"];
						exhaustionLoss = result["xhChange"];
						overexertionLoss = result["oxChange"];
						exhaustionChange = result["xhChange"];
						overexertionChange = result["oxChange"];
					}
					break;
				case "foodrestricted":
					const foodRestrictionRegeneration = 0;
					exhaustionLoss = foodRestrictionRegeneration;
					overexertionLoss = foodRestrictionRegeneration;
					break;
				case "withdrawal":
					{
						// Preparations
						const withdrawalMild = 1/3;
						const withdrawalSevere = 1/2;
						const toxicity = resultsOnly["addictionpoisonstrength"];
						let exhaustionGain = 0;

						// Calculate addiction effect
						if (resultsOnly["addictioneffect"] === 1)
						{
							exhaustionGain = DSAround(toxicity * withdrawalMild);
						} else {
							exhaustionGain = DSAround(toxicity * withdrawalSevere);
						}

						// Apply addiction effect
						let result = changeExhaustionOverexertion(
							{
								"xhEnabled": resultsOnly["xhrequired"],
								"xh": resultsOnly["xh"],
								"xhMax": exhaustionMax,
								"xhRate": exhaustionGain,
								"oxEnabled": resultsOnly["oxrequired"],
								"ox": resultsOnly["ox"],
								"oxMax": overexertionMax,
								"oxRate": 0,
							}
						);

						// Finish
						exhaustionNew = result["xhNew"];
						overexertionNew = result["oxNew"];
						exhaustionAddiction = result["xhChange"];
						overexertionAddiction = result["oxChange"];
						exhaustionChange = result["xhChange"];
						overexertionChange = result["oxChange"];
					}
					break;
				default:
					debugLog(caller, "Default case of exhaustion/overexertion regCase triggered. Should not happen.");
					break;
			}
		} else if (
			(duration === 0)
			&&
			(
				(resultsOnly["xhrequired"])
				||
				(resultsOnly["oxrequired"])
			)
		)
		{
			exhaustionNew = exhaustion;
			overexertionNew = overexertion;
		}
		/// Finish
		/// Show exhaustion if there is overexertion even if no regeneration took place
		computed["xhnew"] = exhaustionNew;
		computed["xhloss"] = exhaustionLoss;
		computed["xhaddiction"] = exhaustionAddiction;
		computed["oxnew"] = overexertionNew;
		computed["oxloss"] = overexertionLoss;
		computed["oxaddiction"] = overexertionAddiction;
		if (exhaustionChange !== 0 && resultsOnly["xhrequired"])
		{
			attrsToChange["erschoepfung"] = exhaustionNew;
		}
		if (overexertionChange !== 0 && resultsOnly["oxrequired"])
		{
			attrsToChange["ueberanstrengung"] = overexertionNew;
		}

		// AE
		/// Preparation
		const AEMetalFactor = resultsOnly["aefactor"] ?? 1;
		let AERegTotal = 0;
		let AEBase = 0;
		let AEAD = 0;
		let AESS = 0;
		let AEIN = 0;
		let AERT = 0;
		let AEMetal = 0;
		let AENew = resultsOnly["ae"];

		if (resultsOnly["aerequired"] === 1 && duration > 0)
		{
			// No need for calculations in case the regeneration is fixed
			/// Calculate the total amount of regeneration from all sources
			if (resultsOnly["aefixed"] === -1)
			{
				// Base regeneration
				AEBase = resultsOnly["aebase"];
				AERegTotal = AEBase;

				// Regeneration from advantages/disadvantages
				AEAD = resultsOnly["aead"];
				AERegTotal += AEAD;

				// Regeneration from special skills
				AESS = resultsOnly["aess"];
				AERegTotal += AESS;

				// Additional regeneration from IN check
				/// It's usually 1 or 0 depending on the check result, except when your spoilt, then it can also be -1
				if (resultsOnly["aein"] >= 0) {
					AEIN = 1;
				} else {
					if (resultsOnly["spoilt"] === 1 && resultsOnly["spoiltsatisfied"] === 0) {
						AEIN = -1;
					} else {
						AEIN = 0;
					}
				}
				AERegTotal += AEIN;

				// Rapture reduces astral energy regeneration
				if (Object.hasOwn(resultsOnly, "aert"))
				{
					AERT = resultsOnly["aert"];
					AERegTotal += AERT;
				}

				// Regeneration from homesickness
				if (Object.hasOwn(resultsOnly, "homesick"))
				{
					AERegTotal += resultsOnly["homesick"];
				}

				// Regeneration from food restriction
				if (Object.hasOwn(resultsOnly, "aefr"))
				{
					AERegTotal += resultsOnly["aefr"];
				}

				// Sleep disorder
				if (
					Object.hasOwn(resultsOnly, "sleepdisordercase") &&
					(
						sleepDisorder["triggered"] === 1 ||
						(
							sleepDisorder["triggered"] === 2 &&
							computed["selfcontrolresult"] === 0
						)
					)
				)
				{
					AERegTotal += resultsOnly["aesd"];
				}

				// Somnambulism
				if (Object.hasOwn(resultsOnly, "somnambulism"))
				{
					AERegTotal += resultsOnly["somnambulism"];
				}

				// Sensitivity towards processed metals, prolonged contact
				/// Rules say "regeneration halved"
				/// Simple interpretation: Divide AERegTotal by 2, DSAround() the result
				/// Complex interpretation: Divide the sum of all positive contributions to AERegTotal by 2, DSAround() the result
				/// Decision: simple, because most users will expect it that way
				/// Only applicable if there would be a regeneration (aka > 0)
				if (Object.hasOwn(resultsOnly, "aemetal") && AERegTotal > 0)
				{
					// Careful: For odd numbers DSAround( something / 2) - something is not the same as -DSAround( something / 2)!
					let AERegRemaining = DSAround(AERegTotal * AEMetalFactor)
					// Since AEMetal is a modifier, it must be negative when reducing the regeneration
					AEMetal = AERegRemaining - AERegTotal;
					AERegTotal += AEMetal;
				}
			} else {
				// required for roll template
				AEBase = resultsOnly["aefixed"];
				AEAD = 0;
				AESS = 0;
				AEIN = 0;
				AERT = 0;
				AEMetal = 0;
				AERegTotal = resultsOnly["aefixed"];
			}
			AERegTotal = Math.max(AERegTotal, regLimitLower["ae"]);
		} else if (resultsOnly["aerequired"] === 1 && duration === 0)
		{
			// No sleep, no regeneration
			AERegTotal = 0;
			AEBase = 0;
			AEAD = 0;
			AESS = 0;
			AEIN = 0;
			AERT = 0;
			AEMetal = 0;
		}
		/// Finish
		if (resultsOnly["aerequired"] === 1)
		{
			AENew += AERegTotal;
			AENew = Math.min(AENew, resultsOnly["aemax"]);
			computed["aebase"] = AEBase;
			computed["aead"] = AEAD;
			computed["aess"] = AESS;
			computed["aein"] = AEIN;
			computed["aert"] = AERT;
			computed["aemetal"] = AEMetal;
			computed["aenew"] = AENew;
			attrsToChange["AE"] = AENew;
		}

		// KE and Rapture
		const KEOld = resultsOnly["ke"];
		let KERegTotal = 0;
		let KENew = KEOld;
		let raptureNew = resultsOnly["rt"];
		let raptureLoss = 0;
		let raptureGain = 0;

		if (
			(duration > 0)
			&&
			(resultsOnly["kerequired"] === 1)
			&&
			(resultsOnly["rtrequired"] === 1)
		)
		{
			// KE
			/// Calculations
			KERegTotal += resultsOnly["kebase"];
			KERegTotal = Math.max(0, KERegTotal);
			KENew += KERegTotal;
			KENew = Math.min(KENew, resultsOnly["kemax"]);
			let KEChange = KENew - KEOld;

			// Rapture
			/// Preparation
			const raptureMin = 0;

			/// Calculations
			raptureLoss = -Math.floor(computed["duration"] / 2);
			raptureGain = Math.abs(KEChange);
			raptureNew += raptureLoss + raptureGain;
			raptureNew = Math.max(raptureMin, raptureNew);
		} else if (
			(duration === 0)
			&&
			(resultsOnly["kerequired"] === 1)
			&&
			(resultsOnly["rtrequired"] === 1)
		)
		{
			KERegTotal = 0;
			KENew = resultsOnly["ke"];
			raptureGain = 0;
			raptureLoss = 0;
			raptureNew = resultsOnly["rt"];
		}
		/// Finish
		if (resultsOnly["kerequired"] === 1 && resultsOnly["rtrequired"] === 1)
		{
			computed["kebase"] = KERegTotal;
			computed["kenew"] = KENew;
			computed["rtgain"] = raptureGain;
			computed["rtloss"] = raptureLoss;
			computed["rtnew"] = raptureNew;
			attrsToChange["KE"] = KENew;
			attrsToChange["Entrueckung"] = raptureNew;
		}

		// Prettify certain output
		{
			let useComputed = [
				"lebase",
				"lead",
				"leko",
				"xhloss",
				"xhaddiction",
				"oxloss",
				"oxaddiction",
				"aebase",
				"aead",
				"aess",
				"aein",
				"aert",
				"aemetal",
				"kebase",
				"rtgain",
				"rtloss",
			];
			for (let part of useComputed)
			{
				if (Object.hasOwn(computed, part))
				{
					computed[part] = prettifyMod(computed[part]);
				}
			}
			let useResults = [
				"lefr",
				"homesick",
				"aefr",
				"aecuffed",
				"mod",
				"lesd",
				"aesd",
				"somnambulism"
			];
			for (let part of useResults)
			{
				if (Object.hasOwn(resultsOnly, part))
				{
					computed[part] = prettifyMod(parseInt(resultsOnly[part]));
				}
			}
			let resultUseComputed = [
				"selfcontrol",
			];
			for (let part of resultUseComputed)
			{
				if (Object.hasOwn(computed, part))
				{
					computed[part] = prettifyResult(computed[part]);
				}
			}
		}

		debugLog(caller, "tail", "rollID", rollID, "attrsToChange", attrsToChange, "computed", computed);
		safeSetAttrs(attrsToChange);

		finishRoll(
			rollID,
			computed
		);
	}
});


// Generating Regeneration Roll (Deep Breath)
on(
	[
		"character_name",
		"gm_roll_opt",
		"au", "erschoepfung", "ueberanstrengung",
		"au_max", "erschoepfung_max", "ueberanstrengung_max",
		"verstecke_erschoepfung", "verstecke_ueberanstrengung",
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			"character_name",
			"gm_roll_opt",
			"AU", "erschoepfung", "ueberanstrengung",
			"AU_max", "erschoepfung_max", "ueberanstrengung_max",
			"verstecke_erschoepfung", "verstecke_ueberanstrengung",
		], function(values) {
		// Boilerplate
		const caller = "Action Listener for Generation of Regeneration Roll (Deep Breath)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);
		let attrsToChange = {};

		// Rolls
		const rollHead = [
			values["gm_roll_opt"],
			"&{template:reg-deepbreath}",
			`{{charactername=${values["character_name"]}}}`,
			`{{au=[[${values["AU"]}]]}}`,
			`{{xh=[[${values["erschoepfung"]}]]}}`,
			`{{ox=[[${values["ueberanstrengung"]}]]}}`,
		];
		const AURoll = [
			`{{aumax=[[${values["AU_max"]}]]}}`,
			`{{aubase=[[@{KO}]]}}`,
			'{{aunew=[[0]]}}',
			"{{aurequired=[[1]]}}",
		];
		const noAURoll = [ "{{aurequired=[[0]]}}" ];
		const exhaustionRoll = [
			`{{xhmax=[[${values["erschoepfung_max"]}]]}}`,
			'{{xhnew=[[0]]}}',
			"{{xhrequired=[[1]]}}",
		];
		const noExhaustionRoll = [ "{{xhrequired=[[0]]}}" ];
		const overexertionRoll = [
			`{{oxmax=[[${values["ueberanstrengung_max"]}]]}}`,
			'{{oxnew=[[0]]}}',
			"{{oxrequired=[[1]]}}",
		]
		const overexertionMaxRoll = [
			`{{oxmax=[[${values["ueberanstrengung_max"]}]]}}`,
			"{{oxrequired=[[1]]}}",
			"{{impossible=[[1]]}}",
		]
		const noOverexertionRoll = [ "{{oxrequired=[[0]]}}" ];
		const nonerequiredRoll = [ "{{nonerequired=[[1]]}}" ];

		// Build roll
		let roll = [];
		roll = roll.concat(rollHead);

		if (parseInt(values["AU"]) < parseInt(values["AU_max"]))
		{
			roll = roll.concat(AURoll);
		} else {
			roll = roll.concat(noAURoll);
		}

		if (values["verstecke_erschoepfung"] === "0")
		{
			roll = roll.concat(exhaustionRoll);
		} else {
			roll = roll.concat(noExhaustionRoll);
		}

		if (values["verstecke_ueberanstrengung"] === "0")
		{
			roll = roll.concat(overexertionRoll);
		} else {
			roll = roll.concat(noOverexertionRoll);
		}

		/// Regeneration required?
		if (parseInt(values["AU"]) >= parseInt(values["AU_max"]))
		{
			roll = [];
			roll = roll.concat(rollHead);
			roll = roll.concat(nonerequiredRoll);
		}

		/// Regeneration impossible?
		if (
			(parseInt(values["ueberanstrengung"]) >= parseInt(values["ueberanstrengung_max"]))
			&&
			(values["verstecke_ueberanstrengung"] === "0")
		)
		{
			roll = [];
			roll = roll.concat(rollHead);
			roll = roll.concat(overexertionMaxRoll);
		}

		// Finish
		attrsToChange["reg_deepbreath_roll"] = roll.join(" ").trim();
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

on('clicked:reg_deepbreath-action', async (info) => {
	// Boilerplate
	const caller = "Action Listener for Regeneration Button (Deep Breath)";
	let computed = {};
	let attrsToChange = {};

	// Roll
	let results = await startRoll("@{reg_deepbreath_roll}");
	debugLog(caller, "head", "info:", info, "results:", results);

	// Convenience
	let rollID = results.rollId;

	// Convenience Object
	let resultsOnly = {};
	for (let property in results["results"])
	{
		resultsOnly[property] = results["results"][property].result;
	}
	if (Object.hasOwn(resultsOnly, "xhrequired"))
	{
		if (resultsOnly["xhrequired"] === 1)
		{
			resultsOnly["xhrequired"] = true;
		} else {
			resultsOnly["xhrequired"] = false;
		}
	}
	if (Object.hasOwn(resultsOnly, "oxrequired"))
		{
		if (resultsOnly["oxrequired"] === 1)
		{
			resultsOnly["oxrequired"] = true;
		} else {
			resultsOnly["oxrequired"] = false;
		}
	}
	Object.freeze(resultsOnly);

	// Fast Decision
	if (Object.hasOwn(resultsOnly, "nonerequired"))
	{
		debugLog(caller, "tail", "rollID", rollID, "attrsToChange", attrsToChange, "computed", computed);
		finishRoll(rollID);
	} else if (Object.hasOwn(resultsOnly, "impossible"))
	{
		debugLog(caller, "tail", "rollID", rollID, "attrsToChange", attrsToChange, "computed", computed);
		finishRoll(rollID);
	} else {
		// AU
		/// Preparation
		const AU = resultsOnly["au"];
		const AUMax = resultsOnly["aumax"];
		let AURegTotal = 0;
		let AUNew = AU;

		if (resultsOnly["aurequired"] === 1)
		{
			// Calculations
			AURegTotal += resultsOnly["aubase"];
			AUNew += AURegTotal;
		} else {
			AUNew = AU;
		}
		AUNew = Math.min(AUNew, AUMax);

		/// Finish
		computed["aunew"] = AUNew;
		if (AUNew !== AU)
		{
			attrsToChange["AU"] = AUNew;
		}

		// Exhaustion or Overexertion
		/// Preparations
		const exhaustion = resultsOnly["xh"];
		const exhaustionMax = resultsOnly["xhmax"];
		const exhaustionMin = 0;
		const overexertion = resultsOnly["ox"];
		const overexertionMax = resultsOnly["oxmax"];
		const overexertionMin = 0;
		let exhaustionNew = 0;
		let exhaustionChange = 0;
		let overexertionNew = 0;
		let overexertionChange = 0;

		/// Regeneration Order: Overexertion, Exhaustion
		/// As long as there is overexertion, there cannot be exhaustion regeneration
		//// Take into account that people can turn off exhaustion but keep overexertion turned on
		//// In case both are disabled, nothing happens (see checks below).
		//// If only overexertion is disabled, exhaustion changes accordingly, excess exhaustion will be lost.
		//// If only exhaustion is disabled, use overexertion like it's exhaustion.
		exhaustionNew = exhaustion;
		overexertionNew = overexertion;

		/// Build-up rate for exhaustion
		const buildUpRate = 1;

		/// Calculations
		{
			let result = changeExhaustionOverexertion(
				{
					"xhEnabled": resultsOnly["xhrequired"],
					"xh": resultsOnly["xh"],
					"xhMax": exhaustionMax,
					"xhRate": buildUpRate,
					"oxEnabled": resultsOnly["oxrequired"],
					"ox": resultsOnly["ox"],
					"oxMax": overexertionMax,
				}
			);
			// Finish
			exhaustionNew = result["xhNew"];
			overexertionNew = result["oxNew"];
			exhaustionChange = result["xhChange"];
			overexertionChange = result["oxChange"];
		}

		/// Finish
		/// Always show what's active/required
		computed["xhnew"] = exhaustionNew;
		computed["oxnew"] = overexertionNew;
		if (resultsOnly["xhrequired"])
		{
			attrsToChange["erschoepfung"] = exhaustionNew;
		}
		if (resultsOnly["oxrequired"])
		{
			attrsToChange["ueberanstrengung"] = overexertionNew;
		}

		// Prettify certain output
		{
			let useResults = [
				"aubase",
			];
			for (let part of useResults)
			{
				if (Object.hasOwn(resultsOnly, part))
				{
					computed[part] = prettifyMod(parseInt(resultsOnly[part]));
				}
			}
		}

		// Finish
		debugLog(caller, "tail", "rollID", rollID, "AURegTotal", AURegTotal, "attrsToChange", attrsToChange, "computed", computed);
		safeSetAttrs(attrsToChange);

		finishRoll(
			rollID,
			computed
		);
	}
});

// Generating Regeneration Roll (Relax)
on(
	[
		"character_name",
		"gm_roll_opt",
		"reg_relax_automode",
		"reg_relax_duration",
		"au", "au_max",
		"ko",
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			"character_name",
			"gm_roll_opt",
			"reg_relax_automode",
			"reg_relax_duration",
			"AU", "AU_max",
			"KO",
		], function(values) {
		// Boilerplate
		const caller = "Action Listener for Generation of Regeneration Roll (Relax)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);
		let attrsToChange = {};

		// Preparation
		let relaxDuration = parseInt(values["reg_relax_duration"]);
		if (relaxDuration <= 0)
		{
			relaxDuration = 1;
		}

		// Automode
		const auto = values["reg_relax_automode"];
		const AU = parseInt(values["AU"]);
		const AUMax = parseInt(values["AU_max"]);
		const KO = parseInt(values["KO"]);

		if (auto === "1")
		{
			const AURequired = AUMax - AU;
			// Average Regeneration at 90% probability per d20 from constitution roll
			/// capped between 1/3 (KO <= 3) and 6 (KO >= 20)
			const AURegenerationKO = Math.min(6, Math.max(1/3, (KO - 2) * 1/3));

			if (AURequired === 0)
			{
				relaxDuration = 0;
			} else if (AURequired === 1) {
				relaxDuration = 1;
			} else {
				// Estimation: Full recovery in ~90% of all cases
				/// Basic formula (heuristic) for just 3d6 rolls: 1 + Math.ceil(AURequired / 9)
				/// AURequired needs to be reduced by the additional regeneration from KO checks
				/// AURequired reduced by 1 + (AURequired / 9) * AURegenerationKO
				/// Accuracy of that formula is quite low due to the step size of 3d6
				relaxDuration = 1 + Math.ceil((AURequired - (1 + (AURequired / 9) * AURegenerationKO)) / 9);
			}
			attrsToChange["reg_relax_duration_auto"] = relaxDuration;
		}

		// Rolls
		const rollHead = [
			values["gm_roll_opt"],
			"&{template:reg-relax}",
			`{{charactername=${values["character_name"]}}}`,
			`{{duration=[[${relaxDuration}]]}}`,
			`{{au=[[${values["AU"]}]]}}`,
			`{{ko=[[${values["KO"]}]]}}`,
		];
		const AURoll = [
			`{{aumax=[[${values["AU_max"]}]]}}`,
			`{{aubase=[[[[${relaxDuration}*3]]d6cs0cf7]]}}`,
			`{{auko=[[${relaxDuration}d20cs0cf21]]}}`,
			'{{aunew=[[0]]}}',
			"{{aurequired=[[1]]}}",
		];
		const noAURoll = [ "{{aurequired=[[0]]}}" ];
		const nonerequiredRoll = [ "{{nonerequired=[[1]]}}" ];
		const automodeRoll = [ "{{automode=[[1]]}}" ];

		// Build roll
		let roll = [];
		roll = roll.concat(rollHead);

		if (AU < AUMax)
		{
			roll = roll.concat(AURoll);
		} else {
			roll = roll.concat(noAURoll);
		}

		/// Regeneration required?
		if (AU >= AUMax)
		{
			roll = [];
			roll = roll.concat(rollHead);
			roll = roll.concat(nonerequiredRoll);
		}

		if (auto === "1")
		{
			roll = roll.concat(automodeRoll);
		}

		// Finish
		attrsToChange["reg_relax_roll"] = roll.join(" ").trim();
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

on('clicked:reg_relax-action', async (info) => {
	// Boilerplate
	const caller = "Action Listener for Regeneration Button (Relax)";
	let computed = {};
	let attrsToChange = {};

	// Roll
	let results = await startRoll("@{reg_relax_roll}");
	debugLog(caller, "head", "info:", info, "results:", results);

	// Convenience
	let rollID = results.rollId;

	// Convenience Object
	let resultsOnly = {};
	for (let property in results["results"])
	{
		resultsOnly[property] = results["results"][property].result;
	}
	Object.freeze(resultsOnly);

	// Fast Decision
	if (Object.hasOwn(resultsOnly, "nonerequired"))
	{
		debugLog(caller, "tail", "rollID", rollID, "attrsToChange", attrsToChange, "computed", computed);
		finishRoll(rollID);
	} else {
		// AU
		/// Preparation
		const AU = resultsOnly["au"];
		const AUMax = resultsOnly["aumax"];
		let AURegTotal = 0;
		let AUNew = AU;

		// Calculations
		/// No condition required here as "aurequired" is the only resource to be regenerated and if that is already full, the "nonerequired" case will fire
		AURegTotal += resultsOnly["aubase"];

		/// KO Bonus
		let AUKO = 0;
		for (let die of results.results["auko"].dice)
		{
			if (die <= resultsOnly["ko"])
			{
				AUKO += 6;
			}
		}
		AURegTotal += AUKO;

		/// Add regeneration
		AUNew += AURegTotal;

		/// Cap regeneration
		AUNew = Math.min(AUNew, AUMax);

		// Finish
		computed["aubase"] = resultsOnly["aubase"];
		computed["auko"] = AUKO;

		/// Change only if regeneration actually changed something
		if (AUNew !== AU)
		{
			attrsToChange["AU"] = AUNew;
		}
		computed["aunew"] = AUNew;

		// Prettify certain output
		{

			let useComputed = [
				"auko",
			];
			for (let part of useComputed)
			{
				if (Object.hasOwn(computed, part))
				{
					computed[part] = prettifyMod(computed[part]);
				}
			}
			let useResults = [
				"aubase",
			];
			for (let part of useResults)
			{
				if (Object.hasOwn(resultsOnly, part))
				{
					computed[part] = prettifyMod(resultsOnly[part]);
				}
			}
		}

		// Finish
		debugLog(caller, "tail", "rollID", rollID, "AUKO", AUKO, "attrsToChange", attrsToChange, "computed", computed);
		safeSetAttrs(attrsToChange);

		finishRoll(
			rollID,
			computed
		);
	}
});

// Generating Regeneration Roll (Rest)
on(
	[
		"character_name",
		"gm_roll_opt",
		"reg_rest_duration",
		"reg_rest_duration_auto",
		"reg_rest_automode",
		"au", "erschoepfung", "ueberanstrengung", "entrueckung",
		"au_max", "erschoepfung_max", "ueberanstrengung_max",
		"verstecke_erschoepfung", "verstecke_ueberanstrengung",
		"reg_sleep_addiction_withdrawal_effect",
		"reg_sleep_food_restriction_effect",
		// Comfort for choosing only relevant regeneration
		"liturgientab"
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			"character_name",
			"gm_roll_opt",
			"reg_rest_duration",
			"reg_rest_duration_auto",
			"reg_rest_automode",
			"AU", "erschoepfung", "ueberanstrengung", "Entrueckung",
			"AU_max", "erschoepfung_max", "ueberanstrengung_max",
			"verstecke_erschoepfung", "verstecke_ueberanstrengung",
			"reg_sleep_addiction_withdrawal_effect",
			"reg_sleep_food_restriction_effect",
			"LiturgienTab",
		], function(values) {
		// Boilerplate
		const caller = "Action Listener for Generation of Regeneration Roll (Rest)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);
		let attrsToChange = {};

		// Constants (used more than once)
		const exhaustionMin = 0;
		const overexertionMin = 0;
		const withdrawal = parseInt(values["reg_sleep_addiction_withdrawal_effect"]);
		const foodRestriction = parseInt(values["reg_sleep_food_restriction_effect"]);

		// Preparation
		let restDuration = parseInt(values["reg_rest_duration"]);
		if (restDuration <= 0)
		{
			restDuration = 1;
		}

		// Rolls
		const rollHead = [
			values["gm_roll_opt"],
			"&{template:reg-rest}",
			`{{charactername=${values["character_name"]}}}`,
			`{{au=[[${values["AU"]}]]}}`,
			`{{xh=[[${values["erschoepfung"]}]]}}`,
			`{{xhmax=[[${values["erschoepfung_max"]}]]}}`,
			`{{ox=[[${values["ueberanstrengung"]}]]}}`,
			`{{oxmax=[[${values["ueberanstrengung_max"]}]]}}`,
			`{{rt=[[${values["Entrueckung"]}]]}}`,
		];
		if (values["reg_rest_automode"] === "1")
		{
			rollHead.push(`{{automode=[[${values["reg_rest_automode"]}]]}}`);
		}
		const durationRoll = [];
		if (values["reg_rest_automode"] === "1")
		{
			durationRoll.push(`{{duration=[[${values["reg_rest_duration_auto"]}]]}}`);
		} else {
			durationRoll.push(`{{duration=[[${restDuration}]]}}`);
		}
		const AURoll = [
			`{{aumax=[[${values["AU_max"]}]]}}`,
			'{{aunew=[[0]]}}',
			"{{aurequired=[[1]]}}",
		];
		const noAURoll = [ "{{aurequired=[[0]]}}" ];
		const exhaustionRoll = [
			'{{xhloss=[[0]]}}',
			'{{xhnew=[[0]]}}',
			"{{xhrequired=[[1]]}}",
		];
		const noExhaustionRoll = [ "{{xhrequired=[[0]]}}" ];
		const overexertionRoll = [
			'{{oxloss=[[0]]}}',
			'{{oxnew=[[0]]}}',
			"{{oxrequired=[[1]]}}",
		]
		const overexertionMaxRoll = [
			"{{oxrequired=[[1]]}}",
			"{{impossible=[[1]]}}",
		]
		const noOverexertionRoll = [ "{{oxrequired=[[0]]}}" ];
		const RTRoll = [
			`{{rtloss=[[0]]}}`,
			"{{rtnew=[[0]]}}",
			"{{rtrequired=[[1]]}}",
		];
		const noRTRoll = [
			"{{rtrequired=[[0]]}}",
		];
		const foodRestrictionRoll = [
			`{{foodrestriction=[[${values["reg_sleep_food_restriction_effect"]}]]}}`,
		];
		const addictionRoll = [
			`{{addictioneffect=[[${values["reg_sleep_addiction_withdrawal_effect"]}]]}}`,
			`{{addictiondrug=${values["nachteil_sucht_suchtmittel"]}}}`,
			`{{xhnew=[[${values["erschoepfung"]}]]}}`,
			`{{oxnew=[[${values["ueberanstrengung"]}]]}}`,
		];
		const nonerequiredRoll = [ "{{nonerequired=[[1]]}}" ];

		// Calculate automode duration
		const exhaustion = parseInt(values["erschoepfung"]);
		const overexertion = parseInt(values["ueberanstrengung"]);
		const exhaustionReg = -2;
		const overexertionReg = -1;
		const durationAutoCurrent = parseInt(values["reg_rest_duration_auto"]);
		let durationAuto = 0;
		let durationExhaustion = 0;
		let durationOverexertion = 0;
		if (values["reg_rest_automode"] === "1")
		{
			// Consider only exhaustion and overexertion
			if (
				(withdrawal === 0)
				&&
				(foodRestriction < 2)
			)
			{
				if (
					(values["verstecke_erschoepfung"] === "0")
					&&
					(exhaustion > exhaustionMin)
				)
				{
					durationExhaustion = Math.ceil(Math.abs(exhaustion / exhaustionReg));
				}

				if (
					(values["verstecke_ueberanstrengung"] === "0")
					&&
					(overexertion > overexertionMin)
				)
				{
					durationOverexertion = Math.ceil(Math.abs(overexertion / overexertionReg));
				}
				durationAuto = durationExhaustion + durationOverexertion;
			} else {
				durationAuto = 0;
			}
		}
		/// Only trigger attribute change if it really changed
		if (Math.abs(durationAutoCurrent - durationAuto) !== 0)
		{
			attrsToChange["reg_rest_duration_auto"] = durationAuto;
		}

		// Build roll
		let roll = [];
		roll = roll.concat(rollHead);
		roll = roll.concat(durationRoll);

		if (parseInt(values["AU"]) < parseInt(values["AU_max"]))
		{
			roll = roll.concat(AURoll);
		} else {
			roll = roll.concat(noAURoll);
		}

		/// No regeneration during withdrawal or severe food restriction (but also no build-up)
		if (
			(withdrawal === 0)
			&&
			(foodRestriction < 2)
		)
		{
			if (
				(values["verstecke_erschoepfung"] === "0")
				&&
				(
					(exhaustion > exhaustionMin)
					||
					(overexertion > overexertionMin)
				)
			)
			{
				roll = roll.concat(exhaustionRoll);
			} else {
				roll = roll.concat(noExhaustionRoll);
			}

			if (
				(values["verstecke_ueberanstrengung"] === "0")
				&&
				(overexertion > overexertionMin)
			)
			{
				roll = roll.concat(overexertionRoll);
			} else {
				roll = roll.concat(noOverexertionRoll);
			}
		} else {
			if (withdrawal !== 0)
			{
				roll = roll.concat(addictionRoll);
			}
			if (foodRestriction !== 0)
			{
				roll = roll.concat(foodRestrictionRoll);
			}
		}

		/// Additional properties for rapture loss "0" = not hidden
		const raptureMin = 0;
		if (
			(values["LiturgienTab"] === "0")
			&&
			(parseInt(values["Entrueckung"]) > raptureMin)
		)
		{
			roll = roll.concat(RTRoll);
		} else {
			roll = roll.concat(noRTRoll);
		}

		/// Regeneration required?
		if (
			(parseInt(values["AU"]) >= parseInt(values["AU_max"]))
			&&
			(
				(
					(values["verstecke_erschoepfung"] === "0")
					&&
					(exhaustion <= exhaustionMin)
				)
				||
				(values["verstecke_erschoepfung"] !== "0")
			)
			&&
			(
				(
					(values["verstecke_ueberanstrengung"] === "0")
					&&
					(overexertion <= overexertionMin)
				)
				||
				(values["verstecke_ueberanstrengung"] !== "0")
			)
		)
		{
			roll = [];
			roll = roll.concat(rollHead);
			roll = roll.concat(nonerequiredRoll);
		}

		// Finish
		attrsToChange["reg_rest_roll"] = roll.join(" ").trim();
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

on('clicked:reg_rest-action', async (info) => {
	// Boilerplate
	const caller = "Action Listener for Regeneration Button (Rest)";
	let computed = {};
	let attrsToChange = {};

	// Roll
	let results = await startRoll("@{reg_rest_roll}");
	debugLog(caller, "head", "info:", info, "results:", results);

	// Convenience Object
	let resultsOnly = {};
	for (let property in results["results"])
	{
		resultsOnly[property] = results["results"][property].result;
	}
	if (Object.hasOwn(resultsOnly, "xhrequired"))
	{
		if (resultsOnly["xhrequired"] === 1)
		{
			resultsOnly["xhrequired"] = true;
		} else {
			resultsOnly["xhrequired"] = false;
		}
	}
	if (Object.hasOwn(resultsOnly, "oxrequired"))
		{
		if (resultsOnly["oxrequired"] === 1)
		{
			resultsOnly["oxrequired"] = true;
		} else {
			resultsOnly["oxrequired"] = false;
		}
	}
	Object.freeze(resultsOnly);

	// Convenience
	const rollID = results.rollId;
	const duration = resultsOnly["duration"];

	// Fast Decision
	if (Object.hasOwn(resultsOnly, "nonerequired"))
	{
		debugLog(caller, "tail", "rollID", rollID, "attrsToChange", attrsToChange, "computed", computed);
		finishRoll(rollID);
	} else {
		// AU
		/// Preparation
		const AU = resultsOnly["au"];
		const AUMax = resultsOnly["aumax"];
		let AUNew = 0;

		if (resultsOnly["aurequired"] === 1)
		{
			AUNew = AUMax;
		} else {
			AUNew = AU;
		}

		/// Finish
		computed["aunew"] = AUNew;
		if (AUNew !== AU)
		{
			attrsToChange["AU"] = AUNew;
		}

		// Exhaustion or Overexertion
		/// Preparations
		const exhaustion = resultsOnly["xh"];
		const exhaustionMax = resultsOnly["xhmax"];
		const exhaustionMin = 0;
		const overexertion = resultsOnly["ox"];
		const overexertionMax = resultsOnly["oxmax"];
		const overexertionMin = 0;
		let exhaustionNew = 0;
		let exhaustionLoss = 0;
		let exhaustionChange = 0;
		let overexertionNew = 0;
		let overexertionLoss = 0;
		let overexertionChange = 0;

		let withdrawal = 0;
		let foodRestriction = 0;
		if (Object.hasOwn(resultsOnly, "addictioneffect"))
		{
			withdrawal = resultsOnly["addictioneffect"];
		}
		if (Object.hasOwn(resultsOnly, "foodrestriction"))
		{
			foodRestriction = resultsOnly["foodrestriction"];
		}

		/// Regeneration can only take place if not under severe food restriction or even mild addiction withdrawal
		if (
			(withdrawal === 0)
			&&
			(foodRestriction < 2)
			&&
			(duration > 0)
			&&
			(
				(resultsOnly["xhrequired"])
				||
				(resultsOnly["oxrequired"])
			)
		)
		{
			// Preparations
			const exhaustionReg = -2;
			const overexertionReg = -1;

			// Calculations
			exhaustionNew = exhaustion;
			overexertionNew = overexertion;

			{
				let result = changeExhaustionOverexertion(
					{
						"xhEnabled": resultsOnly["xhrequired"],
						"xh": resultsOnly["xh"],
						"xhMax": exhaustionMax,
						"xhRate": exhaustionReg,
						"oxEnabled": resultsOnly["oxrequired"],
						"ox": resultsOnly["ox"],
						"oxMax": overexertionMax,
						"oxRate": overexertionReg,
						"steps": duration,
					}
				);
				// Finish
				exhaustionNew = result["xhNew"];
				overexertionNew = result["oxNew"];
				exhaustionLoss = result["xhChange"];
				overexertionLoss = result["oxChange"];
				exhaustionChange = result["xhChange"];
				overexertionChange = result["oxChange"];
			}
		} else if (
			(
				(withdrawal !== 0)
				||
				(foodRestriction >= 2)
				||
				(duration === 0)
			)
			&&
			(!resultsOnly["xhrequired"])
			&&
			(!resultsOnly["oxrequired"])
		)
		{
			exhaustionNew = exhaustion;
			overexertionNew = overexertion;
			exhaustionLoss = 0;
			overexertionLoss = 0;
			overexertionChange = 0;
			exhaustionChange = 0;
		}
		/// Finish
		//// Show exhaustion if there is overexertion even if no regeneration took place
		//// But only show if it is also enabled

		let showResults = "both";
		if (resultsOnly["xhrequired"] && resultsOnly["oxrequired"])
		{
			showResults = "both";
		}
		if (!resultsOnly["xhrequired"] && resultsOnly["oxrequired"])
		{
			showResults = "ox";
		}
		if (resultsOnly["xhrequired"] && !resultsOnly["oxrequired"])
		{
			showResults = "xh";
		}
		if (!resultsOnly["xhrequired"] && !resultsOnly["oxrequired"])
		{
			showResults = "none";
		}

		switch(showResults)
		{
			case "both":
			case "ox":
				computed["oxnew"] = overexertionNew;
				computed["oxloss"] = overexertionLoss;
				computed["xhrequired"] = 1;
				if (overexertionChange !== 0)
				{
					attrsToChange["ueberanstrengung"] = overexertionNew;
				}
				// fallthrough
			case "xh":
				computed["xhnew"] = exhaustionNew;
				computed["xhloss"] = exhaustionLoss;
				if (exhaustionChange !== 0)
				{
					attrsToChange["erschoepfung"] = exhaustionNew;
				}
				break;
			case "none":
				break;
			default:
				debugLog(caller, `switch(showResults) default case (${showResults}) triggered. Should not happen.`);
				break;
		}

		//// Consider deactivation
		if (!resultsOnly["xhrequired"])
		{
			computed["xhrequired"] = 0;
		}
		if (!resultsOnly["oxrequired"])
		{
			computed["oxrequired"] = 0;
		}

		// Rapture
		let raptureNew = resultsOnly["rt"];
		let raptureLoss = 0;
		let raptureChange = 0;

		if (duration > 0 && resultsOnly["rtrequired"] === 1)
		{
			/// Preparation
			const raptureMin = 0;

			/// Calculations
			raptureLoss = -Math.floor(duration / 2);
			raptureNew += raptureLoss;
			raptureNew = Math.max(raptureMin, raptureNew);
			raptureChange = raptureNew - resultsOnly["rt"];
		} else if (duration === 0 && resultsOnly["rtrequired"] === 1)	{
			raptureLoss = 0;
			raptureNew = resultsOnly["rt"];
			raptureChange = 0;
		}
		/// Finish
		if (resultsOnly["rtrequired"] === 1)
		{
			computed["rtloss"] = raptureLoss;
			computed["rtnew"] = raptureNew;
			if (raptureChange !== 0)
			{
				attrsToChange["Entrueckung"] = raptureNew;
			}
		}

		// Prettify certain output
		{
			let useComputed = [
				"xhloss",
				"oxloss",
				"rtloss",
			];
			for (let part of useComputed)
			{
				if (Object.hasOwn(computed, part))
				{
					computed[part] = prettifyMod(computed[part]);
				}
			}
		}

		// Finish
		debugLog(caller, "tail", "rollID", rollID, "attrsToChange", attrsToChange, "computed", computed);
		safeSetAttrs(attrsToChange);

		finishRoll(
			rollID,
			computed
		);
	}
});

// Determine value and source of bonus on astral meditation roll
// reg_astralmeditation_mod_skill_source
// reg_astralmeditation_mod_skill_value
on(
	[ ...
		[
			"sf_representations",
			"ritualkenntnis", "ritualkenntniswert",
			"taw_musizieren", "talent_musizieren",
			"taw_selbstbeherrschung",
			"zauber_blendwerk",
			"zauber_koboldgeschenk",
			"zauber_komm",
			"zauber_lachkrampf",
			"zauber_schabernack",
			"repeating_magie-sonderfertigkeiten",
		].map(attr => "change:" + attr),
		"remove:repeating_magie-sonderfertigkeiten"
	].join(" "),
	function(eventInfo) {
	getSectionIDs(
		"Magie-Sonderfertigkeiten", function(IDs) {
		let magicSpecialSkillAttrs = [];
		for (let id of IDs)
		{
			magicSpecialSkillAttrs.push(`repeating_Magie-Sonderfertigkeiten_${id}_MagieSK`);
		}
		safeGetAttrs(
			[
				"sf_representations",
				"Ritualkenntnis", "RitualkenntnisWert",
				"TaW_musizieren", "talent_musizieren",
				"TaW_selbstbeherrschung",
				"zauber_blendwerk",
				"zauber_koboldgeschenk",
				"zauber_komm",
				"zauber_lachkrampf",
				"zauber_schabernack",
				...magicSpecialSkillAttrs,
			], function(values) {
			const caller = "Action Listener for the Determination of the Bonus for Astral Meditation";
			debugLog(caller, "eventInfo", eventInfo, "values", values, "magicSpecialSkillAttrs", magicSpecialSkillAttrs);

			let attrsToChange = {};
			/*
			Heuristic for the determination of the correct source
				Representations set
					If not "^(Elf|Sch)" -> use ritual knowledge
					Elf -> Use Music Making talent
					Sch -> Use Self-Control Talent
				Representations not set
					Ritual knowledge set -> use ritual knowledge
					Knows Rascal-only spells -> use self-control
					Knows Elf-only "Song of Friendship" and has "Music Making" -> use music-making
					else: inform user and use "0" as value
			*/

			let heuristicResult = "";
			if (values["sf_representations"] !== "")
			{
				const repRegex = /^(Elf|Sch)/;
				const repMatch = values["sf_representations"].match(repRegex);
				if (repMatch)
				{
					switch(repMatch[0])
					{
						case "Elf":
							heuristicResult = "Musizieren";
							break;
						case "Sch":
							heuristicResult = "Selbstbeherrschung";
							break;
						default:
							debugLog(caller, "Regex matched, but no appropriate case in switch statement found.", "repMatch", repMatch);
							break;
					}
				} else {
					heuristicResult = "Ritualkenntnis";
				}
			} else {
				if (values["Ritualkenntnis"] !== "")
				{
					heuristicResult = "Ritualkenntnis";
				} else if
				(
					values["zauber_blendwerk"] === "1" &&
					values["zauber_koboldgeschenk"] === "1" &&
					values["zauber_komm"] === "1" &&
					values["zauber_lachkrampf"] === "1" &&
					values["zauber_schabernack"] === "1"
				)
				{
					heuristicResult = "Selbstbeherrschung";
				} else {
					const songRegexp = /.*?Freundschaftslied.*/;
					for (let entry of magicSpecialSkillAttrs)
					{
						if (values[entry].match(songRegexp))
						{
							heuristicResult = "Musizieren";
							break;
						}
					}
				}
			}

			// Prepare attribute
			let skillSource = "Wert nicht ermittelbar";
			let skillValue = 0;
			let skillHint = "1";

			switch(heuristicResult)
			{
				case "Ritualkenntnis":
					let source = [ "Ritualkenntnis" ];
					if (values["Ritualkenntnis"] !== "")
					{
						source.push(values["Ritualkenntnis"]);
					}
					skillSource = source.join(" ").trim();
					skillValue = parseInt(values["RitualkenntnisWert"]);
					skillHint = "0";
					break;
				case "Musizieren":
					skillSource = "Musizieren";
					skillValue = parseInt(values["TaW_musizieren"]);
					skillHint = "0";
					break;
				case "Selbstbeherrschung":
					skillSource = "Selbstbeherrschung";
					skillValue = parseInt(values["TaW_selbstbeherrschung"]);
					skillHint = "0";
					break;
				default:
					skillSource = "Wert nicht ermittelbar";
					skillValue = 0;
					skillHint = "1";
					break;
			}

			attrsToChange["reg_astralmeditation_mod_skill_source"] = skillSource;
			attrsToChange["reg_astralmeditation_mod_skill_value"] = skillValue;
			attrsToChange["reg_astralmeditation_mod_skill_show_hint"] = skillHint;
			debugLog(caller, "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
	});
});

// Auto-Enable Checkboxes on Input Change
on(
	[
		"reg_astralmeditation_location_leyline_strength",
		"reg_astralmeditation_use_thonnys_amount",
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			"reg_astralmeditation_location_leyline",
			"reg_astralmeditation_use_thonnys",
		], function(values) {
		// Boilerplate
		const caller = "Action Listener for Auto-Enable Checkboxes (Karmic Meditation)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);
		const trigger = eventInfo["triggerName"];
		let attrsToChange = {};

		// Preparation
		const correspondingAttr = {
			"reg_astralmeditation_location_leyline_strength": "reg_astralmeditation_location_leyline",
			"reg_astralmeditation_use_thonnys_amount": "reg_astralmeditation_use_thonnys",
		};
		const checkboxAttr = correspondingAttr[trigger];
		const checkboxState = values[checkboxAttr];

		// Calculations
		if (checkboxState !== "1")
		{
			attrsToChange[checkboxAttr] = "1";
		}

		// Finish
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

// Generating Regeneration Roll (Astral Meditation)
on(
	[
		"character_name",
		"gm_roll_opt",
		"in", "ch", "ko",
		"le", "le_max", "ae", "ae_max",
		"eisern", "vorteil_zaeher_hund",
		"sf_astrale_meditation",
		"reg_astralmeditation_automode",
		"reg_astralmeditation_mod_skill_value",
		"reg_astralmeditation_mod_other",
		"reg_astralmeditation_use_thonnys",
		"reg_astralmeditation_use_thonnys_amount",
		"reg_astralmeditation_conversion_target",
		"reg_astralmeditation_location_limbo",
		"reg_astralmeditation_location_leyline",
		"reg_astralmeditation_location_leyline_strength",
		"reg_astralmeditation_limit_life_energy_soft",
		"reg_astralmeditation_mod_other",
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			"character_name",
			"gm_roll_opt",
			"IN", "CH", "KO",
			"LE", "LE_max", "AE", "AE_max",
			"Eisern", "vorteil_zaeher_hund",
			"sf_astrale_meditation",
			"reg_astralmeditation_automode",
			"reg_astralmeditation_mod_skill_value",
			"reg_astralmeditation_mod_other",
			"reg_astralmeditation_use_thonnys",
			"reg_astralmeditation_use_thonnys_amount",
			"reg_astralmeditation_conversion_target",
			"reg_astralmeditation_location_limbo",
			"reg_astralmeditation_location_leyline",
			"reg_astralmeditation_location_leyline_strength",
			"reg_astralmeditation_limit_life_energy_soft",
			"reg_astralmeditation_mod_other",
		], function(values) {
		const caller = "Action Listener for Generation of Regeneration Roll (Astral Meditation)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);

		/*
		Roll Code Generation
		Preparation
		*/
		const LE = parseInt(values["LE"]);
		const AE = parseInt(values["AE"]);
		const LEMax = values["LE_max"];
		const AEMax = values["AE_max"];
		const auto = values["reg_astralmeditation_automode"];
		const eisern = values["Eisern"];
		const tough = values["vorteil_zaeher_hund"];
		const specialSkill = parseInt(values["sf_astrale_meditation"]);
		const thonnysUse = parseInt(values["reg_astralmeditation_use_thonnys"]);
		const thonnysLeaves = parseInt(values["reg_astralmeditation_use_thonnys_amount"]);
		const thonnysLeavesMin = 1;
		// Combined with the special skill Thonnys grants reduced cost only at full dose
		const thonnysFullDoseLeaves = 7;
		const targetRaw = parseInt(values["reg_astralmeditation_conversion_target"]);
		const limbo = values["reg_astralmeditation_location_limbo"];
		const leyline = values["reg_astralmeditation_location_leyline"];
		const leylineStrength = values["reg_astralmeditation_location_leyline_strength"];
		const limitLifeEnergySoftRaw = parseInt(values["reg_astralmeditation_limit_life_energy_soft"]);
		const modOther = parseInt(values["reg_astralmeditation_mod_other"]);
		// Explanation for that magic number
		/// Character incapacitated at 5 LeP or below
		/// 1 LeP minimum conversion
		/// (1W3 - 1) LeP = 2 LeP additional LE loss
		const LEIncapacitatedMin = 1;
		const LEIncapacitatedDefault = 5;
		const LECostConversionMin = 1;
		const LECostAdditionalMax = 2;
		const limitLifeEnergyHardMaxDefault = LEIncapacitatedDefault + LECostConversionMin + LECostAdditionalMax;
		const AECostInitiationDefault = 1;
		const leylineBonusTime = 6; // unit: SR (5 min)
		let attrsToChange = {};

		// Determination of setup
		/// 	0: no special skill, no Thonnys
		/// 	1: Special skill Astral Meditation only
		/// 	2: Herb Thonnys used only
		/// 	3: Astral Meditation + Thonnys used
		let setup = 0;

		if (specialSkill === 1)
		{
			setup += 1;
		}
		if (
			(thonnysUse === 1)
			&&
			(
				(
					(specialSkill === 1)
					&&
					(thonnysLeaves >= thonnysFullDoseLeaves)
				)
				||
				(thonnysLeaves >= thonnysLeavesMin)
			)
		)
		{
			setup += 2;
		}

		// Determination of Maximum Required Life Points to Convert
		let maxConversionRequired = AEMax - AE;
		if (setup !== 3)
		{
			maxConversionRequired += AECostInitiationDefault;
		}

		// Determination of hard limit
		// Set hard limit to default value:
		let limitLifeEnergyHard = limitLifeEnergyHardMaxDefault;
		let LEIncapacitated = LEIncapacitatedDefault;
		if ( (eisern === "2") || (tough === "1"))
		{
			LEIncapacitated = LEIncapacitatedMin;
		}

		let LECostAdditional = LECostAdditionalMax;
		let AECostInitiation = AECostInitiationDefault;
		if (setup === 3)
		{
			LECostAdditional = 0;
			AECostInitiation = 0;
		}
		limitLifeEnergyHard = LECostConversionMin + LEIncapacitated + LECostAdditional;

		// Determination of soft limit
		// Must be >= hard limit
		let limitLifeEnergySoft = limitLifeEnergyHard;
		if (limitLifeEnergySoftRaw >= limitLifeEnergyHard)
		{
			limitLifeEnergySoft = limitLifeEnergySoftRaw;
		} else {
			debugLog(caller, `Soft limit (pre-roll) (${limitLifeEnergySoftRaw}) less than hard limit (pre-roll) (${limitLifeEnergyHard}). Setting soft limit to hard limit.`);
			attrsToChange["reg_astralmeditation_limit_life_energy_soft"] = limitLifeEnergyHard;
		}

		// Determination of conversion target (target and targetDice)
		// Limited by max. astral energy
		let target = targetRaw;
		let targetAdapted = false;
		let targetDice = "";

		if (targetRaw > maxConversionRequired)
		{
			target = maxConversionRequired;
			targetAdapted = true;
		}
		if (limbo === "1")
		{
			targetDice = `${target}d6`;
		}

		if (auto === "1")
		{
			const LELevelLimitRelaxed = 2/3;
			const LELevelLimitDesperate = 1/2;
			const AELevelLimitRelaxed = 90; //%
			const AELevelLimitDesperate = 50; //%
			const AEDeficitRelaxed = 3;
			const AEDeficitDesperate = 15;
			// Percentage of AE of AE_max
			let AELevel = 1;
			// Absolute AE required
			let AEDeficit = 0;
			// Minimum percentage of life energy to keep after meditation
			let LELevelLimit = 1;

			if (AE < AEMax)
			{
				// JS Math.round only rounds to integers, the "100" "converts" this to a "percent number"
				AELevel = Math.round(100 * AE / AEMax);
				AEDeficit = Math.max(0, AEMax - AE) + AECostInitiation;
			}
			// Nine cases in total, three are covered by the LELevelLimit default value defined above
			// Basic idea: The lower the AE (relatively) and the higher the demand for full AE (absolute), the more aggressively try to restore AE.
			if (
				(
					(AELevel >= AELevelLimitRelaxed)
					&&
					(AEDeficit > AEDeficitDesperate)
				)
				||
				(
					 (AELevel >= AELevelLimitDesperate) && (AELevel < AELevelLimitRelaxed)
					&&
					(AEDeficit > AEDeficitRelaxed) && (AEDeficit <= AEDeficitDesperate)
				)
				||
				(
					(AELevel < AELevelLimitDesperate)
					&&
					(AEDeficit <= AEDeficitRelaxed)
				)
			)
			{
				LELevelLimit = LELevelLimitRelaxed;
			} else if (
				(
					(AELevel < AELevelLimitDesperate)
					&&
					(AEDeficit > AEDeficitRelaxed) && (AEDeficit <= AEDeficitDesperate)
				)
				||
				(
					(AELevel >= AELevelLimitDesperate) && (AELevel < AELevelLimitRelaxed)
					&&
					(AEDeficit > AEDeficitDesperate)
				)
				||
				(
					(AELevel < AELevelLimitDesperate)
					&&
					(AEDeficit > AEDeficitDesperate)
				)
			)
			{
				LELevelLimit = LELevelLimitDesperate;
			}

			// Calculate actual absolute limit and available absolute LeP
			const LELimit = Math.ceil(LELevelLimit * LEMax);
			const LEAvailable = Math.max(0, LE - LELimit);

			// Calculate "target", i.e. the amount of LE to convert
			if (limbo === "1")
			{
				// Heuristic
				/// Estimates required life energy points to fill target astral energy points with 90% probability
				/// Underestimates the effect for large values (>100 AsP required)
				/// Regeneration slightly higher for these values
				let LERequired = 1 + Math.ceil(AEDeficit / 3);

				// Calculate target and targetDice
				if (LEAvailable - LECostAdditional >= LERequired)
				{
					target = LERequired;
				} else {
					target = Math.max(0, LEAvailable - LECostAdditional);
				}
			} else {
				// Calculate target
				if (LEAvailable - LECostAdditional >= AEDeficit)
				{
					target = AEDeficit;
				} else {
					target = Math.max(0, LEAvailable - LECostAdditional);
				}
			}
			// Adapt "target" to meditation conditions
			/// Limbo dice
			if (limbo === "1")
			{
				if (target === 0)
				{
					targetDice = '0d6';
				} else if (target === 1)
				{
					targetDice = '1d6';
				} else {
					let dice = 0;
					// Heuristic again
					dice = target.toFixed(0);
					targetDice = `${dice}d6`;
				}
			}
			/// Adaptation for additional AE from leylines
			//// Bruteforce algorithm in its simplicity beat every complicated other algorithm I could think of
			if (leyline === "1")
			{
				// Offset = reducedTarget's value
				let reducedTargetRegenerations = [];
				if (target > leylineBonusTime)
				{
					const leylineBonus = DSAround(leylineStrength / 2);
					for (let reducedTarget = target; reducedTarget >= leylineBonusTime; reducedTarget--)
					{
						let leylineBonusCount = Math.floor(reducedTarget / leylineBonusTime);
						let leylineBonusTotal = leylineBonusCount * leylineBonus;
						if (limbo === "1")
						{
							// Reverse heuristic
							let limboReg = 3 * reducedTarget - 3;
							reducedTargetRegenerations[reducedTarget] = limboReg + leylineBonusTotal;
						} else {
							reducedTargetRegenerations[reducedTarget] = reducedTarget + leylineBonusTotal;
						}
					}
					// target has already been limited so that using values up to and including target is still okay
					// this way we might be able to fully restore astral energy
					// using for ... in skips undefined offsets :) (for ... of does not!)
					let newTarget = target;
					for (let reducedTarget in reducedTargetRegenerations)
					{
						if (reducedTargetRegenerations[reducedTarget] >= target)
						{
							newTarget = reducedTarget;
						}
						if (reducedTargetRegenerations[reducedTarget] >= AEDeficit)
						{
							break;
						}
					}
					target = parseInt(newTarget);
				}
			}
			debugLog(caller, "AEDeficit", AEDeficit, "LEAvailable", LEAvailable);
			attrsToChange["reg_astralmeditation_conversion_target_auto"] = target;
			attrsToChange["reg_astralmeditation_limit_life_energy_soft_auto"] = LELimit;
		}

		// Determination of max. LE cost
		let LECostMax = 0;
		LECostMax += target + LECostAdditional;

		// Determination of Leyline Effect
		let AEGainLeyline = 0;
		let meditationDuration = target; // unit: SR (5 min)

		if (leyline === "1")
		{
			AEGainLeyline = DSAround(leylineStrength / 2) * Math.floor(meditationDuration / leylineBonusTime);
		}

		/*
		Three main outcomes must be distinguished:
			* Meditation impossible
			** no special skill AND no Thonnys
			** no astral energy for meditation initiation if required (not required if special skill AND Thonnys)
			** not enough life energy left for safely performing the ritual (regarding soft/hard limits)
			* Meditation not required
			** astral energy is full (auto: or close enough)
			* Meditation possible (all other cases)
		*/
		let outcome = "unset";
		// Meditation impossible
		if (
			// No special skill, no Thonnys ("setup")
			(setup === 0)
			||
			// no astral energy for meditation initiation if required
			( (AE < 1) && (setup < 3) )
			||
			// not enough life energy left for safely performing the ritual (regarding soft/hard limits)
			(limitLifeEnergySoft > LE - LECostMax)
		)
		{
			outcome = "impossible";
		} else if (
			(AE >= AEMax)
			||
			(target === 0)
		) {
			outcome = "not required";
		} else {
			outcome = "possible";
		}

		// Preparation for Main Outcomes
		let baseRoll = [
			values["gm_roll_opt"],
			"&{template:reg-astralmeditation}",
			`{{setup=[[${setup}]]}}`,
		];

		/// Limbo
		if (limbo === "1")
		{
			baseRoll = [
				... baseRoll,
				`{{conversiontarget=[[${targetDice}]]}}`,
				'{{limbo=[[0d1]]}}',
			];
		} else {
			baseRoll = [
				... baseRoll,
				`{{conversiontarget=[[${target}]]}}`,
			];
		}

		/// Leyline
		if (AEGainLeyline > 0)
		{
			baseRoll = [
				... baseRoll,
				`{{aegainleyline=[[${AEGainLeyline}d1]]}}`,
			];
		}
		/// Auto mode
		if (auto === "1")
		{
			baseRoll = [
				... baseRoll,
				`{{automode=[[0d1]]}}`,
			];
		}
		switch(outcome)
		{
			case "impossible":
				baseRoll = [
					... baseRoll,
					'{{impossible=[[0d1]]}}',
				];
				break;
			case "not required":
				baseRoll = [
					... baseRoll,
					'{{notrequired=[[0d1]]}}',
					`{{ae=[[${values["AE"]}]]}}`,
					`{{aemax=[[${values["AE_max"]}]]}}`,
				];
				break;
			case "possible":
				// Setup-independent parts
				/// Bonus is half of whatever was selected for reg_astralmeditation_mod_skill_value
				let mod = parseInt(values["reg_astralmeditation_mod_skill_value"]);
				mod = -DSAround(mod / 2);
				mod += modOther;

				let LELossAdditional = '1d3cs1cf3 - 1';
				if (LECostAdditional === 0)
				{
					LELossAdditional = '0d1';
				}
				let AELossInitiation = AECostInitiation.toFixed(0);

				// Adaptations of target
				if (targetAdapted === true)
				{
					debugLog(caller, `Conversion target (${targetRaw}) higher than necessary. Reducing to appropriate value (${target}).`);
					attrsToChange["reg_astralmeditation_conversion_target"] = target;
				}

				switch(setup)
				{
					case 1: // Special skill only
						break;
					case 2: // Thonnys only
						// Calculate full and fractional rolls
						const thonnysFullDoseRoll = '2 + 2d6';
						const thonnysFullDoses = Math.floor(thonnysLeaves / thonnysFullDoseLeaves);
						const thonnysLeavesRest = thonnysLeaves % thonnysFullDoseLeaves;
						let thonnysFractionalRoll = '';
						if (thonnysLeavesRest !== 0)
						{
							thonnysFractionalRoll = `( floor( (${thonnysLeavesRest} / ${thonnysFullDoseLeaves}) * (${thonnysFullDoseRoll}) ) )`;
						}

						// Build roll array
						let thonnysLimitRoll = [];

						for (let counter = 0; counter < thonnysFullDoses; counter++)
						{
							thonnysLimitRoll.push(thonnysFullDoseRoll);
						}

						if (thonnysFractionalRoll)
						{
							thonnysLimitRoll.push(thonnysFractionalRoll);
						}
						thonnysLimitRoll = thonnysLimitRoll.join(' + ');

						baseRoll = [
							... baseRoll,
							`{{thonnyslimit=[[${thonnysLimitRoll}]]}}`,
						];
						break;
					case 3: // Special skill + Thonnys
						const modThonnys = -3;
						mod += modThonnys;
						break;
					default:
						debugLog(caller, "switch(setup) default case triggered. Should not happen.");
						break;
				}
				baseRoll = [
					... baseRoll,
					`{{charactername=${values["character_name"]}}}`,
					'{{stats=[[ ' +
						`[IN] [[${values["IN"]}]]d1cs0cf2 + ` +
						`[CH] [[${values["CH"]}]]d1cs0cf2 + ` +
						`[KO] [[${values["KO"]}]]d1cs0cf2 + ` +
						']]}}',
					'{{checkrollresults=[[ [IN-Wurf:] 1d20cs1cf20 + [CH-Wurf:] 1d20cs1cf20 + [KO-Wurf:] 1d20cs1cf20]]}}',
					`{{mod=[[${mod}]]}}`,
					'{{checkresult=[[0d1]]}}',
					'{{criticality=[[0d1]]}}',
					`{{duration=[[${target}]]}}`,
					`{{le=[[${values["LE"]}]]}}`,
					'{{leneu=[[0d1]]}}',
					'{{lelossconversion=[[0d1]]}}',
					`{{lelossadditional=[[${LELossAdditional}]]}}`,
					`{{ae=[[${values["AE"]}]]}}`,
					`{{aemax=[[${values["AE_max"]}]]}}`,
					'{{aeneu=[[0d1]]}}',
					`{{aelossinitiation=[[${AELossInitiation}]]}}`,
					'{{aegainconversion=[[0d1]]}}',
				];
				break;
			default:
				debugLog(caller, `switch(outcome) default case (${outcome}) triggered. Should not happen.`);
				baseRoll = [
					... baseRoll,
					'{{unset=[[0d1]]}}',
				];
				break;
		}
		// Build roll
		var roll = [];
		roll = roll.concat(baseRoll);

		attrsToChange["reg_astralmeditation_roll"] = roll.join(" ");

		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

// Generating Set Full Roll (Astral Meditation)
on(
	[
		"ae", "ae_max",
		"sf_astrale_meditation",
		"reg_astralmeditation_use_thonnys",
		"reg_astralmeditation_use_thonnys_amount",
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			"AE", "AE_max",
			"sf_astrale_meditation",
			"reg_astralmeditation_use_thonnys",
			"reg_astralmeditation_use_thonnys_amount",
		], function(values) {
		const caller = "Action Listener for Generation of Set Full Roll (Astral Meditation)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);

		/*
		Roll Code Generation
		Preparation
		*/
		const AE = parseInt(values["AE"]);
		const AEMax = values["AE_max"];
		const specialSkill = parseInt(values["sf_astrale_meditation"]);
		const thonnysUse = parseInt(values["reg_astralmeditation_use_thonnys"]);
		const thonnysLeaves = parseInt(values["reg_astralmeditation_use_thonnys_amount"]);
		const thonnysLeavesMin = 1;
		const thonnysFullDoseLeaves = 7;
		const AECostInitiationDefault = 1;
		let attrsToChange = {};

		// Determination of setup
		/// 	0: no special skill, no Thonnys
		/// 	1: Special skill Astral Meditation only
		/// 	2: Herb Thonnys used only
		/// 	3: Astral Meditation + Thonnys used
		let setup = 0;

		if (specialSkill === 1)
		{
			setup += 1;
		}
		if (
			(thonnysUse === 1)
			&&
			(
				(
					(specialSkill === 1)
					&&
					(thonnysLeaves >= thonnysFullDoseLeaves)
				)
				||
				(thonnysLeaves >= thonnysLeavesMin)
			)
		)
		{
			setup += 2;
		}

		// Determination of Maximum Required Life Points to Convert
		let maxConversionRequired = AEMax - AE;
		if (setup !== 3)
		{
			maxConversionRequired += AECostInitiationDefault;
		}

		/// Nothing to do with AE = AEMax
		if (AE === AEMax)
		{
			maxConversionRequired = 0;
		}

		// Roll Setup
		const baseRoll = [
			"&{template:reg-astralmeditation-set-full}",
			`{{maxconv=[[${maxConversionRequired}]]}}`,
		];

		// Build roll
		let roll = [];
		roll = roll.concat(baseRoll);

		attrsToChange["reg_astralmeditation_set_full_roll"] = roll.join(" ").trim();

		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

on('clicked:reg_astralmeditation_set_full-action', async (info) => {
	// Boilerplate
	const caller = "Action Listener for Set Full Button (Astral Meditation)";
	let attrsToChange = {};

	// Roll
	let results = await startRoll("@{reg_astralmeditation_set_full_roll}");
	debugLog(caller, "head", "info:", info, "results:", results);
	let rollID = results.rollId;

	// Convenience Object
	let resultsOnly = {};
	for (let property in results.results)
	{
		resultsOnly[property] = results.results[property].result;
	}

	// Finish
	attrsToChange["reg_astralmeditation_conversion_target"] = resultsOnly["maxconv"];
	debugLog(caller, "tail", "rollID", rollID, "resultsOnly", resultsOnly, "attrsToChange", attrsToChange);
	safeSetAttrs(attrsToChange);

	finishRoll(rollID);
});

on('clicked:reg_astralmeditation-action', async (info) => {
	const caller = "Action Listener for Regeneration Button (Astral Meditation)";
	let results = await startRoll("@{reg_astralmeditation_roll}");
	debugLog(caller, "head", "info:", info, "results:", results);
	let rollID = results.rollId;
	results = results.results;
	let computed = {};

	// Convenience Object
	let resultsOnly = {};
	for (let property in results)
	{
		resultsOnly[property] = results[property].result;
	}

	const setup = resultsOnly["setup"];
	let attrsToChange = {};

	// Replicate structure of roll generator
	let outcome = "";
	if (Object.hasOwn(resultsOnly, "impossible"))
	{
		outcome = "impossible";
	} else if (Object.hasOwn(resultsOnly, "notrequired")) {
		outcome = "notrequired";
	} else if (Object.hasOwn(resultsOnly, "unset")) {
		outcome = "unset";
	} else {
		outcome = "possible";
	}

	switch(outcome)
	{
		case "notrequired":
		case "impossible":
			finishRoll(rollID);
			break;
		case "possible":
			// 3d20 Check
			let mod = resultsOnly["mod"];
			computed["mod"] = mod;
			let stats = [
				results.stats.rolls[0].dice,
				results.stats.rolls[1].dice,
				results.stats.rolls[2].dice
			];
			let rolls = [
				results["checkrollresults"]["rolls"][0].results[0],
				results["checkrollresults"]["rolls"][1].results[0],
				results["checkrollresults"]["rolls"][2].results[0],
			];
			const success = 1;
			const failure = 20;

			/* Result
			0	Failure
			1	Success
			*/
			let result = 0;

			/* Criticality
			-3	Triple 20
			-2	Double 20
			 0	no double 1/20
			+2	Double 1
			+3	Triple 1
			*/
			let criticality = 0;

			// Multi Crits Calculation
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

			// Check Result Calculation
			// This special check does not have a fixed value to counter unlucky rolls, so assume 0.
			// The only way to counter unlucky rolls is by using the bonus (aka "mod").
			// Reminder: A negative mod is a bonus.
			let modRequired = 0;
			for (let roll in rolls)
			{
				modRequired -= Math.max(0, rolls[roll] - stats[roll]);
			}

			if (mod <= modRequired)
			{
				result = 1;
			} else {
				result = 0;
			}

			computed["checkresult"] = result;
			computed["criticality"] = criticality;
			computed["checkrollresults"] = rolls.toString().replaceAll(",", "/");
			computed["stats"] = stats.toString().replaceAll(",", "/");

			// Regeneration
			let AELossInitiation = 0;
			if ( setup !== 3 )
			{
				AELossInitiation = 1;
			}

			if ( result === 1 )
			{
				let conversion = 0;
				if ( setup === 2 )
				{
					let thonnysLimit = 0;
					if ( Object.hasOwn(resultsOnly, "thonnyslimit") )
					{
						thonnysLimit = resultsOnly["thonnyslimit"];
					}
					conversion = Math.min(thonnysLimit, resultsOnly["conversiontarget"]);
					computed["conversiontarget"] = conversion;
					computed["duration"] = conversion;
				} else {
					conversion = resultsOnly["conversiontarget"];
				}
				// Life energy
				let LEneu = resultsOnly["le"];
				let LELossAdditional = resultsOnly["lelossadditional"];
				let LELossConversion = 0;
				if ( Object.hasOwn(resultsOnly, "limbo") )
				{
					LELossConversion = results["conversiontarget"]["dice"].length;
				} else {
					LELossConversion = conversion;
				}
				LEneu = LEneu - LELossAdditional - LELossConversion;
				computed["leneu"] = LEneu;
				computed["lelossconversion"] = -LELossConversion;
				computed["lelossadditional"] = -LELossAdditional;
				attrsToChange["LE"] = LEneu;

				// Astral energy
				let AEneu = resultsOnly["ae"];
				let AEGainLeyline = 0;
				if (Object.hasOwn(resultsOnly, "aegainleyline"))
				{
					AEGainLeyline = resultsOnly["aegainleyline"];
					computed["aegainleyline"] = AEGainLeyline;
				}
				AEneu = AEneu - AELossInitiation + conversion + AEGainLeyline;
				AEneu = Math.min(resultsOnly["aemax"], AEneu);
				computed["aeneu"] = AEneu;
				computed["aelossinitiation"] = -AELossInitiation;
				computed["aegainconversion"] = conversion;
				computed["conversiontarget"] = conversion;
				attrsToChange["AE"] = AEneu;
			} else {
				const AEmin = 0;
				let AEneu = resultsOnly["ae"];
				AEneu = AEneu - AELossInitiation;
				AEneu = Math.max(AEmin, AEneu);
				computed["aeneu"] = AEneu;
				computed["aelossinitiation"] = -AELossInitiation;
				attrsToChange["AE"] = AEneu;
			}

			// Prettify certain output
			{

				let useComputed = [
					"lelossconversion",
					"lelossadditional",
					"aelossinitiation",
					"aegainconversion",
					"aegainleyline",
					"conversiontarget",
					"mod"
				];
				for (let part of useComputed)
				{
					if (Object.hasOwn(computed, part))
					{
						computed[part] = prettifyMod(computed[part]);
					}
				}
			}

			debugLog(caller, "tail", "rollID", rollID, "resultsOnly", resultsOnly, "attrsToChange", attrsToChange, "computed", computed);
			safeSetAttrs(attrsToChange);

			finishRoll(rollID, computed);
			break;
		default:
			debugLog(caller, `switch(outcome) default case (${outcome}) triggered. Should not happen.`);
			finishRoll(rollID);
			break;
	}
});

// Auto-Enable Checkboxes on Input Change
on(
	[
		"reg_karmicmeditation_mod_motivation_mission_value",
		"reg_karmicmeditation_mod_motivation_selfish_value",
		"reg_karmicmeditation_mod_motivation_sinner_value",
		"reg_karmicmeditation_mod_location_other_world_value",
		"reg_karmicmeditation_mod_location_demonic_value",
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			"reg_karmicmeditation_mod_motivation_mission",
			"reg_karmicmeditation_mod_motivation_selfish",
			"reg_karmicmeditation_mod_motivation_sinner",
			"reg_karmicmeditation_mod_location_other_world",
			"reg_karmicmeditation_mod_location_demonic",
		], function(values) {
		// Boilerplate
		const caller = "Action Listener for Auto-Enable Checkboxes (Karmic Meditation)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);
		const trigger = eventInfo["triggerName"];
		let attrsToChange = {};

		// Preparation
		/// Function for getting corresponding checkbox attribute name
		function getCorrespondingAttr(attr)
		{
			const suffixLength = "_value".length;
			return attr.slice(0, -suffixLength);
		}
		/// Get corresponding checkbox attribute
		const checkboxAttr = getCorrespondingAttr(trigger);
		const checkboxState = values[checkboxAttr];

		// Calculations
		if (checkboxState !== "1")
		{
			attrsToChange[checkboxAttr] = "1";
		}

		// Finish
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

// Generating Regeneration Roll (Karmic Meditation)
on(
	[
		"gm_roll_opt",
		"mu", "in", "ch",
		"ke", "ke_max", "entrueckung",
		"liturgiekenntnis",
		"reg_karmicmeditation_mod_location_demonic",
		"reg_karmicmeditation_mod_location_demonic_value",
		"reg_karmicmeditation_mod_location_holy_ground_god",
		"reg_karmicmeditation_mod_location_holy_ground_pantheon",
		"reg_karmicmeditation_mod_location_nonbeliever_presence",
		"reg_karmicmeditation_mod_location_nonbeliever_territory",
		"reg_karmicmeditation_mod_location_other_world",
		"reg_karmicmeditation_mod_location_other_world_value",
		"reg_karmicmeditation_mod_location_sanctum_god",
		"reg_karmicmeditation_mod_location_temple_god",
		"reg_karmicmeditation_mod_motivation_controlled",
		"reg_karmicmeditation_mod_motivation_emergency",
		"reg_karmicmeditation_mod_motivation_freshman",
		"reg_karmicmeditation_mod_motivation_mission",
		"reg_karmicmeditation_mod_motivation_mission_value",
		"reg_karmicmeditation_mod_motivation_selfish",
		"reg_karmicmeditation_mod_motivation_selfish_value",
		"reg_karmicmeditation_mod_motivation_sinner",
		"reg_karmicmeditation_mod_motivation_sinner_value",
		"reg_karmicmeditation_mod_other",
		"reg_karmicmeditation_mod_time_holiday",
		"reg_karmicmeditation_mod_time_last_meditation",
		"reg_karmicmeditation_mod_time_month",
		"reg_karmicmeditation_mod_time_nameless",
	].map(attr => "change:" + attr).join(" "),
	function(eventInfo) {
	safeGetAttrs(
		[
			'gm_roll_opt',
			'MU', 'IN', 'CH',
			'KE', 'KE_max', 'Entrueckung',
			'Liturgiekenntnis',
			'reg_karmicmeditation_mod_location_demonic',
			'reg_karmicmeditation_mod_location_demonic_value',
			'reg_karmicmeditation_mod_location_holy_ground_god',
			'reg_karmicmeditation_mod_location_holy_ground_pantheon',
			'reg_karmicmeditation_mod_location_nonbeliever_presence',
			'reg_karmicmeditation_mod_location_nonbeliever_territory',
			'reg_karmicmeditation_mod_location_other_world',
			'reg_karmicmeditation_mod_location_other_world_value',
			'reg_karmicmeditation_mod_location_sanctum_god',
			'reg_karmicmeditation_mod_location_temple_god',
			'reg_karmicmeditation_mod_motivation_controlled',
			'reg_karmicmeditation_mod_motivation_emergency',
			'reg_karmicmeditation_mod_motivation_freshman',
			'reg_karmicmeditation_mod_motivation_mission',
			'reg_karmicmeditation_mod_motivation_mission_value',
			'reg_karmicmeditation_mod_motivation_selfish',
			'reg_karmicmeditation_mod_motivation_selfish_value',
			'reg_karmicmeditation_mod_motivation_sinner',
			'reg_karmicmeditation_mod_motivation_sinner_value',
			'reg_karmicmeditation_mod_other',
			'reg_karmicmeditation_mod_time_holiday',
			'reg_karmicmeditation_mod_time_last_meditation',
			'reg_karmicmeditation_mod_time_month',
			'reg_karmicmeditation_mod_time_nameless',
		], function(values) {
		const caller = "Action Listener for Generation of Regeneration Roll (Karmic Meditation)";
		debugLog(caller, "eventInfo", eventInfo, "values", values);
		let attrsToChange = {};

		const lkw = parseInt(values["Liturgiekenntnis"]);
		const entrueckung = parseInt(values["Entrueckung"]);
		const KE = parseInt(values["KE"]);
		const KEMax = parseInt(values["KE_max"]);

		const lastMeditation = parseInt(values["reg_karmicmeditation_mod_time_last_meditation"]);
		const emergency = values["reg_karmicmeditation_mod_motivation_emergency"];
		const mission = values["reg_karmicmeditation_mod_motivation_mission"];
		const missionValue = parseInt(values["reg_karmicmeditation_mod_motivation_mission_value"]);
		const selfish = values["reg_karmicmeditation_mod_motivation_selfish"];
		const selfishValue = parseInt(values["reg_karmicmeditation_mod_motivation_selfish_value"]);
		const controlled = values["reg_karmicmeditation_mod_motivation_controlled"];
		const freshman = values["reg_karmicmeditation_mod_motivation_freshman"];
		const sinner = values["reg_karmicmeditation_mod_motivation_sinner"];
		const sinnerValue = parseInt(values["reg_karmicmeditation_mod_motivation_sinner_value"]);
		const nonbelieverPresence = values["reg_karmicmeditation_mod_location_nonbeliever_presence"];
		const holyGroundPantheon = values["reg_karmicmeditation_mod_location_holy_ground_pantheon"];
		const holyGroundGod = values["reg_karmicmeditation_mod_location_holy_ground_god"];
		const templeGod = values["reg_karmicmeditation_mod_location_temple_god"];
		const sanctumGod = values["reg_karmicmeditation_mod_location_sanctum_god"];
		const nonbelieverTerritory = values["reg_karmicmeditation_mod_location_nonbeliever_territory"];
		const otherWorld = values["reg_karmicmeditation_mod_location_other_world"];
		const otherWorldValue = parseInt(values["reg_karmicmeditation_mod_location_other_world_value"]);
		const demonic = values["reg_karmicmeditation_mod_location_demonic"];
		const demonicValue = parseInt(values["reg_karmicmeditation_mod_location_demonic_value"]);
		const month = values["reg_karmicmeditation_mod_time_month"];
		const holiday = values["reg_karmicmeditation_mod_time_holiday"];
		const nameless = values["reg_karmicmeditation_mod_time_nameless"];
		const modOther = parseInt(values["reg_karmicmeditation_mod_other"]);

		// Constant modifiers
		const modEmergency = -3;
		const modControlled = 12;
		const modFreshman = 3;
		const modNonbelieverPresence = 3;
		const modHolyGroundPantheon = -1;
		const modHolyGroundGod = -2;
		const modTempleGod = -3;
		const modSanctumGod = -4;
		const modNonbelieverTerritory = 3;
		const modMonth = -1;
		const modHoliday = -3;
		const modNameless = 7;

		// Calculate modifier
		let mod = 0;

		mod += lastMeditation;

		if (emergency === "1") { mod += modEmergency; }
		if (mission === "1") { mod += missionValue; }
		if (selfish === "1") { mod += selfishValue; }
		if (controlled === "1") { mod += modControlled; }
		if (freshman === "1") { mod += modFreshman; }
		if (sinner === "1") { mod += sinnerValue; }
		if (nonbelieverPresence === "1") { mod += modNonbelieverPresence; }
		if (holyGroundPantheon === "1") { mod += modHolyGroundPantheon; }
		if (holyGroundGod === "1") { mod += modHolyGroundGod; }
		if (templeGod === "1") { mod += modTempleGod; }
		if (sanctumGod === "1") { mod += modSanctumGod; }
		if (nonbelieverTerritory === "1") { mod += modNonbelieverTerritory; }
		if (otherWorld === "1") { mod += otherWorldValue; }
		if (demonic === "1") { mod += demonicValue; }
		if (month === "1") { mod += modMonth; }
		if (holiday === "1") { mod += modHoliday; }
		if (nameless === "1") { mod += modNameless; }

		mod += modOther;

		// Build roll
		const baseRoll = [
			values["gm_roll_opt"],
			"&{template:reg-karmicmeditation}",
			`{{ke=[[${KE}]]}}`,
			`{{kemax=[[${KEMax}]]}}`,
		];

		const KERegenerationRoll = [
			"{{kegain=[[0]]}}",
			`{{entrueckung=[[${entrueckung}]]}}`,
			`{{entrueckunggain=[[0]]}}`,
			`{{wert=[[${lkw}]]}}`,
			`{{mod=[[${mod}]]}}`,
			`{{stats=[[ [MU:] [[${values["MU"]}]]d1cs0cf2 + [IN:] [[${values["IN"]}]]d1cs0cf2 + [CH:] [[${values["CH"]}]]d1cs0cf2]]}}`,
			'{{checkroll=[[ [MU-Wurf:] 1d20cs1cf20 + [IN-Wurf:] 1d20cs1cf20 + [CH-Wurf:] 1d20cs1cf20]]}}',
			"{{checkresult=[[0]]}}",
			"{{checkpoints=[[0]]}}",
		];

		const notRequiredRoll = [ "{{notrequired=[[0]]}}", ];

		let roll = [ ... baseRoll ];
		if (KE >= KEMax)
		{
			roll = [
				... roll,
				... notRequiredRoll,
			];
		} else {
			roll = [
				... roll,
				... KERegenerationRoll,
			];
		}

		attrsToChange["reg_karmicmeditation_roll"] = roll.join(" ").trim();
		debugLog(caller, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

on('clicked:reg_karmicmeditation-action', async (info) => {
	const caller = "Action Listener for Regeneration Button (Karmic Meditation)";
	let results = await startRoll("@{reg_karmicmeditation_roll}");
	debugLog(caller, "head", "info:", info, "results:", results);

	const rollID = results.rollId;
	results = results.results;
	let computed = {};
	let attrsToChange = {};

	// Convenience Object
	let resultsOnly = {};
	for (let property in results)
	{
		resultsOnly[property] = results[property].result;
	}

	// Roll required?
	if (Object.hasOwn(resultsOnly, "notrequired"))
	{
		finishRoll(rollID);
	} else {
		const stats = [
			results.stats.rolls[0].dice,
			results.stats.rolls[1].dice,
			results.stats.rolls[2].dice
		];
		const LkW = resultsOnly["wert"];
		const mod = resultsOnly["mod"];
		const rolls = [
			results["checkroll"]["rolls"][0].results[0],
			results["checkroll"]["rolls"][1].results[0],
			results["checkroll"]["rolls"][2].results[0],
		];
		let KE = resultsOnly["ke"];
		const KEMax = resultsOnly["kemax"];
		const regenerationMinimum = 1;
		let entrueckung = resultsOnly["entrueckung"];

		// Last meditation was right now
		attrsToChange["reg_karmicmeditation_mod_time_last_meditation"] = "12";

		// 3d20 Check (Liturgy rules apply)
		/// Result: 0 (Failure) or 1 (Success)
		let result = 0;

		/// Calculation of remaining skill points (= after check)
		let effRolls = rolls.slice(); // copying the array
		let effLkW = LkW - mod;
		let LkPstar = effLkW;

		//// Negative effective skill value: add |effLkW| to each individual roll
		if (effLkW < 0)
		{
			for (let roll in rolls)
			{
				effRolls[roll] = rolls[roll] + Math.abs(effLkW);
			}
			LkPstar = 0;
		}

		//// Skill point consumption for every roll
		for (let roll in effRolls)
		{
			LkPstar -= Math.max(0, effRolls[roll] - stats[roll]);
		}

		//// Limit result to skill value
		LkPstar = Math.min(LkW, LkPstar);
		computed["checkpoints"] = LkPstar;

		//// Liturgies: Result only dependent on remaining skill points
		result = LkPstar < 0 ? 0 : 1;
		computed["checkresult"] = result;

		// Effects of result
		if (result === 1)
		{
			// Results of 0 remaining skill points count as 1
			let KEGain = 0;
			if (LkPstar === 0)
			{
				KEGain = regenerationMinimum;
			} else {
				KEGain = LkPstar;
			}
			computed["kegain"] = KEGain;
			KE += KEGain;

			// Limit to maximum
			KE = Math.min(KEMax, KE);
			computed["ke"] = KE;
			attrsToChange["KE"] = KE;

			// Limit rapture gain to only those karma points which could be stored
			let entrueckungGain = KE - resultsOnly["ke"]
			entrueckung += entrueckungGain;
			computed["entrueckung"] = entrueckung;
			computed["entrueckunggain"] = entrueckungGain;
			attrsToChange["Entrueckung"] = entrueckung;
		}

		// Prepare output
		computed["stats"] = stats.toString().replaceAll(",", "/");
		computed["checkroll"] = rolls.toString().replaceAll(",", "/");
		computed["mod"] = mod;

		/// Prettify certain output
		{
			// "mod" and "result" correspond to the prettification function used
			let modUseComputed = [
				"kegain",
				"entrueckunggain",
				"mod"
			];
			for (let part of modUseComputed)
			{
				if (Object.hasOwn(computed, part))
				{
					computed[part] = prettifyMod(computed[part]);
				}
			}
			let resultUseComputed = [
				"wert",
				"checkpoints",
			];
			for (let part of resultUseComputed)
			{
				if (Object.hasOwn(computed, part))
				{
					computed[part] = prettifyResult(computed[part]);
				}
			}
		}

		// Finishing
		debugLog(caller, "tail", "rollID", rollID, "resultsOnly", resultsOnly, "attrsToChange", attrsToChange, "computed", computed);
		safeSetAttrs(attrsToChange);
		finishRoll(rollID, computed);
	}
});
/* regeneration end */
