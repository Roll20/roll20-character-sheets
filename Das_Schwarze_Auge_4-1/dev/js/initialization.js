/* initialization start */
function initializeSheet(migrationChain) {
	var caller = "initializeSheet";
	debugLog(caller, "Initializing sheet ...");
	var attrsToInit = [
		// Stats and derived values
		"MU", "IN", "KL", "CH", "FF", "GE", "KO", "KK", "GS",
		"LE", "legrundw", "LE_max",
		"AU", "AU_max", "ausgrundw", "aus_max",
		"erschoepfung_basis", "erschoepfung_max",
		"ueberanstrengung_max",
		"mrgrundw", "MR", "wundschwelle",
		"AE", "AE_max", "aspgrundw", "asp_max", "sf_meisterliche_regeneration_leiteigenschaft",
		"KE", "KE_max",
		"ap_verfuegbar",

		// Rolls
		"cs_kampf_at", "cs_kampf_fk", "cs_kampf_pa", "cs_ritual", "cs_talent", "cs_zauber",
		"cf_kampf_at", "cf_kampf_fk", "cf_kampf_pa", "cf_ritual", "cf_talent", "cf_zauber",

		// Combat
		/// Melee AT Values
		"AT_Aktiv", "AT_Aktiv_TaW", "atbasis",
		"AT_Anderthalbhander", "AT_bastardstaebe", "AT_dolche", "AT_fechtwaffen", "AT_hiebwaffen", "AT_infanteriewaffen", "AT_kettenstabe", "AT_kettenwaffen", "AT_lanzenreiten", "AT_peitsche", "AT_raufen", "AT_ringen", "AT_sabel", "AT_schwerter", "AT_speere", "AT_stabe", "AT_zweihandflegel", "AT_zweihand-hiebwaffen", "AT_zweihandschwerter",

		/// Melee PA Values
		"PA_Aktiv", "PA_Aktiv_TaW", "pabasis",
		"PA_Anderthalbhander", "PA_bastardstaebe", "PA_dolche", "PA_fechtwaffen", "PA_hiebwaffen", "PA_infanteriewaffen", "PA_kettenstabe", "PA_kettenwaffen", "PA_lanzenreiten", "PA_peitsche", "PA_raufen", "PA_ringen", "PA_sabel", "PA_schwerter", "PA_speere", "PA_stabe", "PA_zweihandflegel", "PA_zweihand-hiebwaffen", "PA_zweihandschwerter",

		/// Melee other
		"NKW_Aktiv1", "NKW_Aktiv2", "NKW_Aktiv3", "NKW_Aktiv4",
		"NKW1_SB", "NKW2_SB", "NKW3_SB", "NKW4_SB",
		"TP_W_Aktiv", "TP_Bonus_Aktiv",
		"k_mod_left_hand",

		/// Ranged Combat
		"FK_Aktiv", "fkbasis",
		"AT_Armbrust", "AT_Belagerungswaffen", "AT_Blasrohr", "AT_Bogen", "AT_Diskus", "AT_feuerwaffen", "AT_Schleuder", "AT_Wurfbeile", "AT_Wurfmesser", "AT_Wurfspeere",
		"FKWFK1", "FKWFK2", "FKWFK3", "FKWFK4",
		"FKWtyp1", "FKWtyp2", "FKWtyp3", "FKWtyp4",

		/// Ranged Combat Calculator
		"fkr_aktiv", "fkr_anvisieren_final_dauer", "fkr_anvisieren_final", "fkr_bewegung_final", "fkr_bewegung_raw", "fkr_dauer", "fkr_deckung_final", "fkr_entfernung_final", "fkr_entfernung_final_TP", "fkr_erschwernis_ansage_gesamt", "fkr_erschwernis_ansage_gesamt_anzeige", "fkr_erschwernis_gesamt_anzeige", "fkr_erschwernis_gesamt", "fkr_erschwernis_ohne_kampfgetuemmel", "fkr_erschwernis_ohne_kampfgetuemmel_anzeige", "fkr_helligkeit_final", "fkr_kampfgetuemmel_final", "fkr_kampfgetuemmel_ziele", "fkr_ort_final", "fkr_schussart_final", "fkr_schussart_final_dauer", "fkr_schussart_final_TP", "fkr_schussart_gezielter_schuss_vierbeiner", "fkr_schussart_gezielter_schuss_vierbeiner_variabel", "fkr_schussart_gezielter_schuss_zweibeiner", "fkr_schussart_schussmitansage", "fkr_schussnummer_final", "fkr_sonstiges_final", "fkr_steilschuss_final", "fkr_steilschuss_final_TP", "fkr_tp", "fkr_warnung_kurzsichtig", "fkr_wetterlage_final", "fkr_zielgroesse_final", "fk_tp_roll", "fkw_aktiv_schuetzentyp", "ftp_bonus_aktiv", "ftp_w_aktiv",

		/// Shields and Parry Weapons
		"parryweapon_at", "parryweapon_pa", "parryweapon_pa_available",
		"shield_at", "shield_at_available", "shield_at_mod",
		"shield_bf",
		"shield_name",
		"shield_pa", "shield_pa_available",
		"ShieldParryINI",
		"shield_tp", "shield_tpkk", "shield_tp_roll",

		/// Encumbrance, Armour, Initiative
		"BE", "be_at_mod", "be_pa_mod", "BE_RG", "BE_RG_INI",
		"inibasis2", "inibasis", "INI_dice_count", "INI_mod_hauptwaffe",

		/// Wounds
		"AT_mod_wounds", "PA_mod_wounds", "FK_mod_wounds",
		"MU_mod_wounds", "IN_mod_wounds", "KL_mod_wounds", "FF_mod_wounds", "GE_mod_wounds", "KO_mod_wounds", "KK_mod_wounds",
		"GS_mod_wounds", "IB_mod_wounds",
		"wound_bauch", "wound_brust", "wound_kopf", "wound_la", "wound_lb", "wound_ra", "wound_rb",

		// Regeneration
		"reg_deepbreath_roll",
		"reg_relax_roll",
		"reg_sleep_le_ko", "reg_sleep_le_fixed",
		"reg_sleep_le_mod_advantages_disadvantages", "reg_sleep_le_mod_food_restriction",
		"reg_sleep_ae_base", "reg_sleep_ae_in", "reg_sleep_ae_fixed",
		"reg_sleep_ae_mod_advantages_disadvantages", "reg_sleep_ae_mod_special_skills", "reg_sleep_ae_mod_food_restriction", "reg_sleep_ae_mod_homesickness",
		"reg_sleep_addiction_withdrawal_effect",
		"reg_sleep_food_restriction_effect",
		"reg_sleep_mod_somnambulism",
		"reg_sleep_sleep_disorder_effect", "reg_sleep_sleep_disorder_trigger",
		"reg_sleep_roll"
	];
	// Initialization Second Safeguard Check (function not called based on sixteen attributes and data_version)
	// These attributes have been picked, because no character generated according to the official rules will have all their attributes at 8, so comparing these attributes will almost guarantee that old sheets are correctly detected and no initialization will take place.
	// The mod attributes are also checked in case a player erroneously used the mod attributes to try to change their base values.
	const attrStems = [ "MU", "KL", "IN", "CH", "FF", "GE", "KO", "KK" ];
	const attrExtensions = [ "Basis", "Mod" ];
	defaults = { "Basis": 8, "Mod": 0 };

	safeguardAttrs = [];
	for ( let stem of attrStems )
	{
		for ( let ext of attrExtensions )
		{
			safeguardAttrs.push(stem + "_" + ext);
		}
	}

	safeGetAttrs(
		// .concat() returns a new array. This is important, because "data_version" is not part of the actual safeguard attributes and treated separately.
		safeguardAttrs.concat(["data_version"]),
		function(v, missing, badDef)
		{
			debugLog(caller, "Safeguard attributes:", v);
			var attrs = { "sheet_initialized": false };
			var dataVersionSet = true;

			if ( isNaN(v["data_version"]) || v["data_version"] === "")
			{
				debugLog(caller, "'data_version' not set, so we can proceed.");
				dataVersionSet = false;
			}
			if ( dataVersionSet === false )
			{
				for ( let attr of safeguardAttrs )
				{
					// None of the safeguard attributes should be undefined (missing) or have a bad value (NaN, undefined)
					if (
						missing.includes(attr) ||
						badDef.includes(attr)
					)
					{
						debugLog(caller, "Safeguard attributes are either missing or have bad value. An uninitialized sheet should not have such issues, i.e. we are likely not in an uninitialized sheet anymore. Therefore, stopping initialization to prevent accidental data loss.");
						attrs["sheet_initialized"] = true;
					}
				}
				if ( attrs["sheet_initialized"] === false )
				{
					// The safeguard attributes should all be at their default values
					debugLog(caller, "Checking safeguard attributes ...");
					for ( let attr of safeguardAttrs )
					{
						for ( let ext of attrExtensions )
						{
							if ( attr.search(ext) > -1 )
							{
								if (
									v[attr] === defaults[ext] ||
									v[attr] === defaults[ext].toFixed(0)
								)
								{
									break;
								} else {
									debugLog(caller, "Value of safeguard attribute '" + attr + "' is '" + v[attr] + "'; differs from uninitialized value ('" + defaults[ext].toFixed(0) + "'). Safety skipping initialization.");
									attrs["sheet_initialized"] = true;
								}
							}
						}
					}
				}
				if ( attrs["sheet_initialized"] === false )
				{
					for ( let attr of attrsToInit )
					{
						attrs[attr] = getDefaultValue(attr);
					}
					debugLog(caller, "Attributes after initialization: ", attrs);
				}
			} else {
				debugLog(caller, "'data_version' set, safety stopping initialization and preventing future initialization attempts ...");
				attrs["sheet_initialized"] = true;
			}
			safeSetAttrs(attrs, {}, function() {
					callNextMigration(migrationChain);
				}
			);
		}
	);
}
/* initialization end */
