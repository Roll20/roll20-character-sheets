/* constants start */
const statAttrs = [
	"MU",
	"KL",
	"IN",
	"CH",
	"FF",
	"GE",
	"KO",
	"KK"
];

const combatTechniques = {
		"anderthalbhander":    { type: "melee",  ebe: -2,        "at-only": false },
		"armbrust":            { type: "ranged", ebe: -5,        "at-only": true },
		"bastardstaebe":       { type: "melee",  ebe: -2,        "at-only": false },
		"belagerungswaffen":   { type: "ranged", ebe: undefined, "at-only": true },
		"blasrohr":            { type: "ranged", ebe: -5,        "at-only": true },
		"bogen":               { type: "ranged", ebe: -3,        "at-only": true },
		"diskus":              { type: "ranged", ebe: -2,        "at-only": true },
		"dolche":              { type: "melee",  ebe: -1,        "at-only": false },
		"fechtwaffen":         { type: "melee",  ebe: -1,        "at-only": false },
		"feuerwaffen":         { type: "ranged", ebe: -5,        "at-only": true },
		"hiebwaffen":          { type: "melee",  ebe: -4,        "at-only": false },
		"infanteriewaffen":    { type: "melee",  ebe: -3,        "at-only": false },
		"kettenstabe":         { type: "melee",  ebe: -1,        "at-only": false },
		"kettenwaffen":        { type: "melee",  ebe: -3,        "at-only": false },
		"lanzenreiten":        { type: "melee",  ebe: undefined, "at-only": false },
		"peitsche":            { type: "melee",  ebe: -1,        "at-only": true },
		"raufen":              { type: "melee",  ebe: 0,         "at-only": false },
		"ringen":              { type: "melee",  ebe: 0,         "at-only": false },
		"sabel":               { type: "melee",  ebe: -2,        "at-only": false },
		"schleuder":           { type: "ranged", ebe: -2,        "at-only": true },
		"schwerter":           { type: "melee",  ebe: -2,        "at-only": false },
		"speere":              { type: "melee",  ebe: -3,        "at-only": false },
		"stabe":               { type: "melee",  ebe: -2,        "at-only": false },
		"wurfbeile":           { type: "ranged", ebe: -2,        "at-only": true },
		"wurfmesser":          { type: "ranged", ebe: -3,        "at-only": true },
		"wurfspeere":          { type: "ranged", ebe: -2,        "at-only": true },
		"zweihandflegel":      { type: "melee",  ebe: -3,        "at-only": false },
		"zweihand-hiebwaffen": { type: "melee",  ebe: -3,        "at-only": false },
		"zweihandschwerter":   { type: "melee",  ebe: -2,        "at-only": false }
};

/*
	Default Values for Known Attributes

Using safe get/setAttrs the default value 0 is assumed, if nothing is in this object.
Currently, does not handle repeating sections.
*/
const defaultValues = {
	// Uninitialized Attributes
	// These attributes are not created automatically, because there are no <input>s or <span>s using them.
	// Even if players diligently fill out the sheet, some buttons might not work due to missing attributes.
	// Initializing these attributes to default values prevents this from happening.
	// Some attributes might be created automatically, but have been included for the sake of completeness.

	// Stats and derived values
	"MU": 8,
	"IN": 8,
	"KL": 8,
	"CH": 8,
	"FF": 8,
	"GE": 8,
	"KO": 8,
	"KK": 8,
	"GS": 8,

	"LE": 12,
	"legrundw": 12,
	"LE_max": 12,

	"AU": 12,
	"AU_max": 12,
	"ausgrundw": 12,
	"aus_max": 12, // Old attributes kept for compatibility (used in token bars)

	"erschoepfung_basis": 8,
	"erschoepfung_max": 8,

	"ueberanstrengung_max": 8,

	"mrgrundw": 5,
	"MR": 5,
	"wundschwelle": 4,

	"AE": 12,
	"AE_max": 12,
	"aspgrundw": 12,
	"asp_max": 12, // Old attributes kept for compatibility (used in token bars)
	"sf_meisterliche_regeneration_leiteigenschaft": "@{KL}",

	"KE": 0,
	"KE_max": 0,

	"ap_verfuegbar": 0,

	// Rolls
	"cs_kampf_at": 1,
	"cs_kampf_fk": 1,
	"cs_kampf_pa": 1,
	"cs_ritual": 1,
	"cs_talent": 1,
	"cs_zauber": 1,

	"cf_kampf_at": 20,
	"cf_kampf_fk": 20,
	"cf_kampf_pa": 20,
	"cf_ritual": 20,
	"cf_talent": 20,
	"cf_zauber": 20,

	// Combat
	/// Melee AT Values
	"AT_Aktiv": 5,
	"AT_Aktiv_TaW": "0",
	"atbasis": 5,

	"AT_Anderthalbhander": 5,
	"AT_bastardstaebe": 5,
	"AT_dolche": 5,
	"AT_fechtwaffen": 5,
	"AT_hiebwaffen": 5,
	"AT_infanteriewaffen": 5,
	"AT_kettenstabe": 5,
	"AT_kettenwaffen": 5,
	"AT_lanzenreiten": 5,
	"AT_peitsche": 5,
	"AT_raufen": 5,
	"AT_ringen": 5,
	"AT_sabel": 5,
	"AT_schwerter": 5,
	"AT_speere": 5,
	"AT_stabe": 5,
	"AT_zweihandflegel": 5,
	"AT_zweihand-hiebwaffen": 5,
	"AT_zweihandschwerter": 5,

	/// Melee PA Values
	"PA_Aktiv": 5,
	"PA_Aktiv_TaW": "0",
	"pabasis": 5,

	"PA_Anderthalbhander": 5,
	"PA_bastardstaebe": 5,
	"PA_dolche": 5,
	"PA_fechtwaffen": 5,
	"PA_hiebwaffen": 5,
	"PA_infanteriewaffen": 5,
	"PA_kettenstabe": 5,
	"PA_kettenwaffen": 5,
	"PA_lanzenreiten": 5,
	"PA_peitsche": "-",
	"PA_raufen": 5,
	"PA_ringen": 5,
	"PA_sabel": 5,
	"PA_schwerter": 5,
	"PA_speere": 5,
	"PA_stabe": 5,
	"PA_zweihandflegel": 5,
	"PA_zweihand-hiebwaffen": 5,
	"PA_zweihandschwerter": 5,

	/// Melee other
	"NKW_Aktiv1": 0,
	"NKW_Aktiv2": 0,
	"NKW_Aktiv3": 0,
	"NKW_Aktiv4": 0,
	"NKW1_SB": 0,
	"NKW2_SB": 0,
	"NKW3_SB": 0,
	"NKW4_SB": 0,

	"TP_W_Aktiv": 1,
	"TP_Bonus_Aktiv": 0,

	"k_mod_left_hand": 9,

	/// Ranged Combat
	"FK_Aktiv": 5,
	"fkbasis": 5,

	"AT_Armbrust": 5,
	"AT_Belagerungswaffen": 5,
	"AT_Blasrohr": 5,
	"AT_Bogen": 5,
	"AT_Diskus": 5,
	"AT_feuerwaffen": 5,
	"AT_Schleuder": 5,
	"AT_Wurfbeile": 5,
	"AT_Wurfmesser": 5,
	"AT_Wurfspeere": 5,

	"FKWFK1": 5,
	"FKWFK2": 5,
	"FKWFK3": 5,
	"FKWFK4": 5,

	"FKWtyp1": "0",
	"FKWtyp2": "0",
	"FKWtyp3": "0",
	"FKWtyp4": "0",

	/// Ranged Combat Calculator
	"fkr_aktiv": "on",
	"fkr_anvisieren_final_dauer": prettifyMod(0),
	"fkr_anvisieren_final": prettifyMod(0),
	"fkr_bewegung_final": prettifyMod(0),
	"fkr_bewegung_raw": "0",
	"fkr_dauer": "1 A",
	"fkr_deckung_final": "-",
	"fkr_entfernung_final": prettifyMod(0),
	"fkr_entfernung_final_TP": prettifyMod(0),
	"fkr_erschwernis_ansage_gesamt": "?{Ansage für Fernkampfangriff|0,0|1,1|2,2|3,3|4,4|5,5|6,6|7,7|8,8|9,9|10,10|11,11|12,12|13,13|14,14|15,15|16,16|17,17|18,18|19,19|20,20|21,21|22,22|23,23|24,24|25,25|26,26|27,27|28,28|29,29|30,30|31,31|32,32}",
	"fkr_erschwernis_ansage_gesamt_anzeige": " (" + prettifyMod(0) + ")",
	"fkr_erschwernis_gesamt_anzeige": prettifyMod(0),
	"fkr_erschwernis_gesamt": "?{Erleichterung (−) oder Erschwernis (+)|0} + ?{Ansage für Fernkampfangriff|0,0|1,1|2,2|3,3|4,4|5,5|6,6|7,7|8,8|9,9|10,10|11,11|12,12|13,13|14,14|15,15|16,16|17,17|18,18|19,19|20,20|21,21|22,22|23,23|24,24|25,25|26,26|27,27|28,28|29,29|30,30|31,31|32,32}",
	"fkr_erschwernis_ohne_kampfgetuemmel": 0,
	"fkr_erschwernis_ohne_kampfgetuemmel_anzeige": prettifyMod(0),
	"fkr_helligkeit_final": "-",
	"fkr_kampfgetuemmel_final": "-",
	"fkr_kampfgetuemmel_ziele": 0,
	"fkr_ort_final": prettifyMod(0),
	"fkr_schussart_final": "!",
	"fkr_schussart_final_dauer": "!",
	"fkr_schussart_final_TP": "!",
	"fkr_schussart_gezielter_schuss_vierbeiner": "off",
	"fkr_schussart_gezielter_schuss_vierbeiner_variabel": "off",
	"fkr_schussart_gezielter_schuss_zweibeiner": "off",
	"fkr_schussart_schussmitansage": "on",
	"fkr_schussnummer_final": prettifyMod(0),
	"fkr_sonstiges_final": "0",
	"fkr_steilschuss_final": prettifyMod(0),
	"fkr_steilschuss_final_TP": prettifyMod(0),
	"fkr_tp": "1W6 + 0",
	"fkr_warnung_kurzsichtig": "off",
	"fkr_wetterlage_final": "-",
	"fkr_zielgroesse_final": "-",
	"fk_tp_roll": "&{template:DSA-Kampf-Treffer} {{name=Fernkampf}} {{target=[[?{Tabelle für zufällige Trefferzone auswählen|Zweibeiner gegen unbeschwänzten Zweibeiner,0|Zweibeiner gegen beschwänzten Zweibeiner,1|Zweibeiner gegen Vierbeiner,3|Zweibeiner gegen Reiter,4|Reiter gegen Zweibeiner,2}]]}} {{TPArt=[[0]]}} {{zone=[[1d20]]}} {{damage=[[?{Anzahl W6 für Schadenswurf|1,1|2,2|3,3|4,4|5,5}d6 + (?{Bonus (+)/Malus (−) der Trefferpunkte|0})]]}}",
	"fkw_aktiv_schuetzentyp": "Normalschütze",
	"ftp_bonus_aktiv": 0,
	"ftp_w_aktiv": 1,

	/// Shields and Parry Weapons
	"parryweapon_at": 0,
	"parryweapon_pa": 0,
	"parryweapon_pa_available": "0",

	"shield_at": 0,
	"shield_at_available": "0",
	"shield_at_mod": 0,

	"shield_bf": 0,

	"shield_name": " ",

	"shield_pa": 0,
	"shield_pa_available": "0",

	"ShieldParryINI": 0,

	"shield_tp": "1W6 + 1",
	"shield_tpkk": "13/3",
	"shield_tp_roll": "1d6 + 1",

	/// 
	/// Encumbrance, Armour, Initiative
	"BE": 0,
	"be_at_mod": 0,
	"be_pa_mod": 0,
	"be_at_mod_hint": 0,
	"be_pa_mod_hint": 0,
	"BE_RG": 0,
	"BE_RG_INI": 0,

	"inibasis2": 6,
	"inibasis": 6,
	"INI_dice_count": 1,
	"INI_mod_hauptwaffe": 0,

	/// Wounds
	"AT_mod_wounds": 0,
	"PA_mod_wounds": 0,
	"FK_mod_wounds": 0,

	"MU_mod_wounds": 0,
	"IN_mod_wounds": 0,
	"KL_mod_wounds": 0,
	"FF_mod_wounds": 0,
	"GE_mod_wounds": 0,
	"KO_mod_wounds": 0,
	"KK_mod_wounds": 0,

	"GS_mod_wounds": 0,
	"IB_mod_wounds": 0,

	"wound_bauch": 0,
	"wound_brust": 0,
	"wound_kopf": 0,
	"wound_la": 0,
	"wound_lb": 0,
	"wound_ra": 0,
	"wound_rb": 0,

	// Regeneration
	/// Astral Meditation
	"reg_astralmeditation_conversion_target_auto": 1,
	"reg_astralmeditation_limit_life_energy_soft_auto": 9,
	"reg_astralmeditation_mod_skill_source": "Wert nicht ermittelbar",
	"reg_astralmeditation_mod_skill_value": 0,
	"reg_astralmeditation_roll": "&{template:reg-astralmeditation} {{setup=[[0]]}} {{conversiontarget=[[1]]}} {{impossible=[[0d1]]}}",
	"reg_astralmeditation_set_full_roll": "&{template:reg-astralmeditation-set-full} {{maxconv=[[0]]}}",

	/// Deep Breath
	"reg_deepbreath_roll": "&{template:reg-deepbreath} {{charactername=@{character_name}}} {{au=[[12]]}} {{xh=[[0]]}} {{ox=[[0]]}} {{nonerequired=[[1]]}}",

	/// Karmic Meditation
	"reg_karmicmeditation_roll": "&{template:reg-karmicmeditation} {{ke=[[0]]}} {{kemax=[[0]]}} {{notrequired=[[0]]}}",

	/// Relax
	"reg_relax_duration_auto": 1,
	"reg_relax_roll": "&{template:reg-relax} {{charactername=@{character_name}}} {{duration=[[1]]}} {{au=[[12]]}} {{ko=[[8]]}} {{nonerequired=[[1]]}}",

	/// Rest
	"reg_rest_duration_auto": 1,
	"reg_rest_roll": "&{template:reg-rest} {{charactername=@{character_name}}} {{au=[[12]]}} {{xh=[[0]]}} {{xhmax=[[8]]}} {{ox=[[0]]}} {{oxmax=[[8]]}} {{rt=[[0]]}} {{nonerequired=[[1]]}}",

	/// Sleep
	"reg_sleep_le_ko": "@{KO} - 1d20",
	"reg_sleep_le_fixed": -1,
	"reg_sleep_le_mod_advantages_disadvantages": 0,
	"reg_sleep_le_mod_food_restriction": 0,
	"reg_sleep_ae_base": "1d6",
	"reg_sleep_ae_in": "@{IN} - 1d20",
	"reg_sleep_ae_fixed": -1,
	"reg_sleep_ae_factor_metal_sensitive_conscious_contact": 1,
	"reg_sleep_ae_mod_special_skills": 0,
	"reg_sleep_ae_mod_cuffed": 0,
	"reg_sleep_ae_mod_food_restriction": 0,
	"reg_sleep_ae_mod_homesickness": 0,
	"reg_sleep_addiction_withdrawal_effect": 0,
	"reg_sleep_food_restriction_effect": 0,
	"reg_sleep_mod_somnambulism": "0",
	"reg_sleep_sleep_disorder_effect": "1d6 - 1",
	"reg_sleep_sleep_disorder_trigger": "1d0",
	"reg_sleep_roll": "&{template:reg-sleep} {{charactername=@{character_name}}} {{duration=[[6]]}} {{le=[[12]]}} {{au=[[12]]}} {{xh=[[0]]}} {{ox=[[0]]}} {{ae=[[12]]}} {{ke=[[0]]}} {{rt=[[0]]}} {{nonerequired=[[1]]}}",

	// Repeating sections
	"repeating_conjuration-spells-myranor": {
		"spell_action": '&{template:default} {{Hinweis=Attribut "spell_action" eines myranischen Beschwörungszaubers noch nicht gesetzt. Versuchen Sie den Charakterbogen zu schließen und wieder zu öffnen. Alternativ sollte eine Änderung an der Quelle, der Kategorie, der Repräsentation oder den Probeneigenschaften dazu führen, dass der Würfelknopf korrekt funktioniert.}}',
		"sphere": "Sphäre unbekannt",
		"stats": "MU/KL/CH",
		"value": 0,
		"source": "Quelle?",
		"type": "?",
		"representation_full": "??????",
		"representation_short": "???",
		"stat0": "MU",
		"stat1": "KL",
		"stat2": "CH",
		"name": "Quelle? (?), ???"
	}
};

/*
	Constants for internally used talent and spell names

t: Talent
	t_ka: Kampftechnik
	t_ko: Körpertalent
	t_ge: Gesellschaftstalent
	t_n: Naturtalent
	t_w: Wissenstalent
	t_sp: Sprache
	t_sc: Schrift
	t_h: Handwerk
	t_ga: Gabe
	t_m: Metatalent
z: Zauber
Individual spell names are generally based on a/the short name. One of the exceptions: Spells from Dark Ages have their full names.

*/
const talents = [
	't_ka_anderthalbhaender',
	't_ka_armbrust',
	't_ka_bastardstaebe',
	't_ka_belagerungswaffen',
	't_ka_blasrohr',
	't_ka_bogen',
	't_ka_diskus',
	't_ka_dolche',
	't_ka_fechtwaffen',
	't_ka_feuerwaffen',
	't_ka_hiebwaffen',
	't_ka_infanteriewaffen',
	't_ka_kettenstaebe',
	't_ka_kettenwaffen',
	't_ka_lanzenreiten',
	't_ka_peitsche',
	't_ka_raufen',
	't_ka_ringen',
	't_ka_saebel',
	't_ka_schleuder',
	't_ka_schwerter',
	't_ka_speere',
	't_ka_staebe',
	't_ka_wurfbeile',
	't_ka_wurfmesser',
	't_ka_wurfspeere',
	't_ka_zweihandflegel',
	't_ka_zweihandhiebwaffen',
	't_ka_zweihandschwerter',
	't_ko_akrobatik',
	't_ko_athletik',
	't_ko_fliegen',
	't_ko_freiesfliegen',
	't_ko_gaukeleien',
	't_ko_immanspiel',
	't_ko_klettern',
	't_ko_koerperbeherrschung',
	't_ko_reiten',
	't_ko_schleichen',
	't_ko_schwimmen',
	't_ko_selbstbeherrschung',
	't_ko_sichverstecken',
	't_ko_singen',
	't_ko_sinnenschaerfe',
	't_ko_skifahren',
	't_ko_stimmenimitieren',
	't_ko_tanzen',
	't_ko_taschendiebstahl',
	't_ko_zechen',
	't_ge_betoeren',
	't_ge_etikette',
	't_ge_gassenwissen',
	't_ge_lehren',
	't_ge_menschenkenntnis',
	't_ge_schauspielerei',
	't_ge_schriftlicherausdruck',
	't_ge_sichverkleiden',
	't_ge_ueberreden',
	't_ge_ueberzeugen',
	't_n_faehrtensuchen',
	't_n_fallenstellen',
	't_n_fesseln',
	't_n_fischenangeln',
	't_n_orientierung',
	't_n_wettervorhersage',
	't_n_wildnisleben',
	't_w_anatomie',
	't_w_baukunst',
	't_w_brettspiel',
	't_w_geographie',
	't_w_geschichtswissen',
	't_w_gesteinskunde',
	't_w_goetterkulte',
	't_w_heraldik',
	't_w_huettenkunde',
	't_w_kriegskunst',
	't_w_kryptographie',
	't_w_magiekunde',
	't_w_mechanik',
	't_w_pflanzenkunde',
	't_w_philosophie',
	't_w_rechnen',
	't_w_rechtskunde',
	't_w_sagenlegenden',
	't_w_schaetzen',
	't_w_sprachenkunde',
	't_w_staatskunst',
	't_w_sternkunde',
	't_w_tierkunde',
	't_sp_garethi',
	't_sp_bosparano',
	't_sp_aureliani',
	't_sp_zyklopaeisch',
	't_sp_tulamidya',
	't_sp_urtulamidya',
	't_sp_zelemja',
	't_sp_alaani',
	't_sp_zhulchammaqra',
	't_sp_ferkina',
	't_sp_ruuz',
	't_sp_alteskemi',
	't_sp_rabensprache',
	't_sp_thorwalsch',
	't_sp_hjaldingsch',
	't_sp_isdira',
	't_sp_asdharia',
	't_sp_rogolan',
	't_sp_angram',
	't_sp_ologhaijan',
	't_sp_oloarkh',
	't_sp_mahrisch',
	't_sp_rissoal',
	't_sp_drachisch',
	't_sp_goblinisch',
	't_sp_grolmisch',
	't_sp_koboldisch',
	't_sp_molochisch',
	't_sp_neckergesang',
	't_sp_nujuka',
	't_sp_rssahh',
	't_sp_sprachederblumen',
	't_sp_trollisch',
	't_sp_waldmenschensprachen',
	't_sp_zlit',
	't_sp_zhayad',
	't_sp_atak',
	't_sp_fuechsisch',
	't_sc_altesalaani',
	't_sc_alteskemi',
	't_sc_amulashtra',
	't_sc_angram',
	't_sc_arkanil',
	't_sc_chrmk',
	't_sc_chuchas',
	't_sc_drakhardzinken',
	't_sc_draknedglyphen',
	't_sc_geheiligteglyphenvonunau',
	't_sc_gimaril',
	't_sc_gjalskisch',
	't_sc_hjaldingscherunen',
	't_sc_imperialezeichen',
	't_sc_isdiraasdharia',
	't_sc_kuslikerzeichen',
	't_sc_mahrischeglyphen',
	't_sc_nanduria',
	't_sc_rogolan',
	't_sc_trollischeraumbilderschrift',
	't_sc_tulamidya',
	't_sc_urtulamidya',
	't_sc_zhayad',
	't_h_abrichten',
	't_h_ackerbau',
	't_h_alchimie',
	't_h_bergbau',
	't_h_bogenbau',
	't_h_bootefahren',
	't_h_brauer',
	't_h_drucker',
	't_h_fahrzeuglenken',
	't_h_falschspiel',
	't_h_feinmechanik',
	't_h_feuersteinbearbeitung',
	't_h_fleischer',
	't_h_fluggeraetesteuern',
	't_h_gerber',
	't_h_glaskunst',
	't_h_grobschmied',
	't_h_handel',
	't_h_hauswirtschaft',
	't_h_heilkundegift',
	't_h_heilkundekrankheiten',
	't_h_heilkundeseele',
	't_h_heilkundewunden',
	't_h_holzbearbeitung',
	't_h_instrumentenbauer',
	't_h_kartographie',
	't_h_kochen',
	't_h_kristallzucht',
	't_h_lederarbeiten',
	't_h_malenzeichnen',
	't_h_maurer',
	't_h_metallguss',
	't_h_musizieren',
	't_h_schloesserknacken',
	't_h_schnapsbrennen',
	't_h_schneidern',
	't_h_seefahrt',
	't_h_seiler',
	't_h_steinmetz',
	't_h_steinschneider',
	't_h_stellmacher',
	't_h_stoffefaerben',
	't_h_taetowieren',
	't_h_toepfern',
	't_h_viehzucht',
	't_h_webkunst',
	't_h_winzer',
	't_h_zimmermann',
	/* Myranor */
	't_sp_gemeinimperial',
	't_sp_hieroimperial',
	't_sp_fruehimperial',
	't_sp_dorinthisch',
	't_sp_kentorisch',
	't_sp_draydalanisch',
	't_sp_yachyach',
	't_sp_alamarasharielitisch',
	't_sp_ravesaran',
	't_sp_pristidial',
	't_sp_gemeinamaunal',
	't_sp_hieroamaunal',
	't_sp_leonal',
	't_sp_pardiral',
	't_sp_tighral',
	't_sp_lyncal',
	't_sp_sumurrisch',
	't_sp_altnarkramarisch',
	't_sp_alttesumurrisch',
	't_sp_narkramarisch',
	't_sp_mahapratisch',
	't_sp_kerrishitisch',
	't_sp_tesumurrisch',
	't_sp_vinshinisch',
	't_sp_boagorambanbarguinisch',
	't_sp_lishshioderwolfalbisch',
	't_sp_dagathimisch',
	't_sp_krakonisch',
	't_sp_mholurisch',
	't_sp_iaril',
	't_sp_loualilisch',
	't_sp_altneristal',
	't_sp_neristal',
	't_sp_gemeinvesayitisch',
	't_sp_altvesayitisch',
	't_sp_urvesayitisch',
	't_sp_abishant',
	't_sp_bashurisch',
	't_sp_bramscho',
	't_sp_eupherban',
	't_sp_grolmurisch',
	't_sp_hippocampir',
	't_sp_horngesang',
	't_sp_lieddergemeinschaft',
	't_sp_lutral',
	't_sp_myranisch',
	't_sp_myrmidal',
	't_sp_nequanerwasserschallcode',
	't_sp_nequanerzeichensprache',
	't_sp_norkoshal',
	't_sp_rhoglossa',
	't_sp_ruritin',
	't_sp_shingwanisch',
	't_sp_shinoq',
	't_sc_altetesumurrischeglyphen',
	't_sc_altnarkramarischebilderschrift',
	't_sc_alttauralsilbenzeichen',
	't_sc_amaunischekratzschrift',
	't_sc_anneristalyabilderschrift',
	't_sc_banshibilderschrift',
	't_sc_bramschoromk',
	't_sc_draydalanischeschriftzeichen',
	't_sc_eupherbancode',
	't_sc_fruehimperialeglyphen',
	't_sc_grolmurischesilbenzeichen',
	't_sc_imperialebuchstaben',
	't_sc_kalshinshi',
	't_sc_kerrishitischesilbenzeichen',
	't_sc_khorrzusymbole',
	't_sc_lahmarischeglyphen',
	't_sc_lyncilsymbole',
	't_sc_mahapratischesilbenzeichen',
	't_sc_narkramarischesilbenzeichen',
	't_sc_nequanischebuchstaben',
	't_sc_vesayitischesilbenzeichen',
	't_sc_vesayosilbenzeichen',
	't_sc_vorimperialepiktogramme',
	't_sc_wasserschallzeichen'
];

const talents_ebe = [
	't_ko_akrobatik',
	't_ko_athletik',
	't_ko_fliegen',
	't_ko_freiesfliegen',
	't_ko_gaukeleien',
	't_ko_klettern',
	't_ko_koerperbeherrschung',
	't_ko_reiten',
	't_ko_schleichen',
	't_ko_schwimmen',
	't_ko_sichverstecken',
	't_ko_singen',
	't_ko_skifahren',
	't_ko_stimmenimitieren',
	't_ko_tanzen',
	't_ko_taschendiebstahl'
];

const spells = [
	'z_abvenenum',
	'z_accuratum',
	'z_adamantium',
	'z_adlerauge',
	'z_adlerschwinge',
	'z_aeolitus',
	'z_aerofugo',
	'z_aerogelo',
	'z_aeropulvis',
	'z_alpgestalt',
	'z_analys',
	'z_aengstelindern',
	'z_animatio',
	'z_applicatus',
	'z_aquafaxius',
	'z_aquaqueris',
	'z_aquasphaero',
	'z_arachnea',
	'z_arcanovi',
	'z_archofaxius',
	'z_archosphaero',
	'z_armatrutz',
	'z_atemnot',
	'z_attributo',
	'z_aufgeblasen',
	'z_augedeslimbus',
	'z_aureolus',
	'z_aurisnasusoculus',
	'z_axxeleratus',
	'z_balsam',
	'z_bandundfessel',
	'z_bannbaladin',
	'z_baerenruhe',
	'z_beherrschungbrechen',
	'z_beschwoerungvereiteln',
	'z_bewegungstoeren',
	'z_blendwerk',
	'z_blickaufswesen',
	'z_blickdurchfremdeaugen',
	'z_blickindiegedanken',
	'z_blickindievergangenheit',
	'z_blitz',
	'z_boeserblick',
	'z_brenne',
	'z_caldofrigo',
	'z_chamaelioni',
	'z_chimaeroform',
	'z_chronoklassis',
	'z_chrononautos',
	'z_claudibus',
	'z_corpofesso',
	'z_corpofrigo',
	'z_cryptographo',
	'z_custodosigil',
	'z_daemonenbann',
	'z_delicioso',
	'z_desintegratus',
	'z_destructibo',
	'z_dichterunddenker',
	'z_dschinnenruf',
	'z_dunkelheit',
	'z_duplicatus',
	'z_dz_agrimothbann',
	'z_dz_belzhorashbann',
	'z_dz_bienenschwarm',
	'z_dz_entfesselungdesgetiers',
	'z_dz_gebieterdertiefe',
	'z_dz_geschossderniederhoellen',
	'z_dz_grolmenseele',
	'z_dz_hauchdertiefentochter',
	'z_dz_hexagrammadschinnenbann',
	'z_dz_hornissenruf',
	'z_dz_igniflumenflammenspur',
	'z_dz_igniquerisfeuerkragen',
	'z_dz_leibaustausendfliegen',
	'z_dz_schlangenruf',
	'z_dz_seelenfeuerlichterloh',
	'z_dz_sphaerovisioschreckensbild',
	'z_dz_spinnennetz',
	'z_dz_spinnenruf',
	'z_dz_tanzdererloesung',
	'z_dz_thargunitothbann',
	'z_dz_tierruf',
	'z_dz_unsichtbareglut',
	'z_dz_valetudolebenskraft',
	'z_dz_weisheitdersteine',
	'z_ecliptifactus',
	'z_eigenschaftwiederherstellen',
	'z_eigneaengste',
	'z_einflussbannen',
	'z_einsmitdernatur',
	'z_eisenrost',
	'z_eiseskaelte',
	'z_eiswirbel',
	'z_elementarbann',
	'z_elementarerdiener',
	'z_elfenstimme',
	'z_erinnerungverlassedich',
	'z_exposami',
	'z_falkenauge',
	'z_favilludo',
	'z_fesselranken',
	'z_feuermaehne',
	'z_feuersturm',
	'z_firnlauf',
	'z_flimflam',
	'z_fluchderpestilenz',
	'z_foramen',
	'z_fortifex',
	'z_frigifaxius',
	'z_frigisphaero',
	'z_fulminictus',
	'z_gardianum',
	'z_gedankenbilder',
	'z_gefaessderjahre',
	'z_gefunden',
	'z_geisterbann',
	'z_geisterruf',
	'z_glacoflumen',
	'z_gletscherwand',
	'z_granitundmarmor',
	'z_grossegier',
	'z_grosseverwirrung',
	'z_halluzination',
	'z_harmlosegestalt',
	'z_hartesschmelze',
	'z_haselbusch',
	'z_heilkraftbannen',
	'z_hellsichttrueben',
	'z_herbeirufungvereiteln',
	'z_herrueberdastierreich',
	'z_herzschlagruhe',
	'z_hexenblick',
	'z_hexengalle',
	'z_hexenholz',
	'z_hexenknoten',
	'z_hexenkrallen',
	'z_hexenspeichel',
	'z_hilfreichetatze',
	'z_hoellenpein',
	'z_holterdipolter',
	'z_horriphobus',
	'z_humofaxius',
	'z_humosphaero',
	'z_ignifaxius',
	'z_ignifugo',
	'z_ignimorpho',
	'z_igniplano',
	'z_ignisphaero',
	'z_ignorantia',
	'z_illusionaufloesen',
	'z_immortalis',
	'z_imperavi',
	'z_impersona',
	'z_infinitum',
	'z_invercano',
	'z_invocatiomaior',
	'z_invocatiominor',
	'z_iribaarshand',
	'z_juckreiz',
	'z_karnifilo',
	'z_katzenaugen',
	'z_klarumpurum',
	'z_klickeradomms',
	'z_koboldgeschenk',
	'z_koboldovision',
	'z_koerperlosereise',
	'z_kommkoboldkomm',
	'z_krabbelnderschrecken',
	'z_kraftdeserzes',
	'z_kraftdeshumus',
	'z_kraehenruf',
	'z_kroetensprung',
	'z_kulminatio',
	'z_kusch',
	'z_lachdichgesund',
	'z_lachkrampf',
	'z_langerlulatsch',
	'z_lastdesalters',
	'z_leibdererde',
	'z_leibderwogen',
	'z_leibdeseises',
	'z_leibdeserzes',
	'z_leibdesfeuers',
	'z_leibdeswindes',
	'z_leidensbund',
	'z_levthansfeuer',
	'z_limbusversiegeln',
	'z_lockruf',
	'z_lungedesleviatan',
	'z_madasspiegel',
	'z_magischerraub',
	'z_mahlstrom',
	'z_malmkreis',
	'z_manifesto',
	'z_meisterderelemente',
	'z_meisterminderergeister',
	'z_memorabia',
	'z_memorans',
	'z_menetekel',
	'z_metamagieneutralisieren',
	'z_metamorphogletscherform',
	'z_metamorphofelsenform',
	'z_motoricus',
	'z_movimento',
	'z_murksundpatz',
	'z_nackedei',
	'z_nebelleib',
	'z_nebelwand',
	'z_nekropathia',
	'z_nihilogravo',
	'z_nuntiovolo',
	'z_objectoobscuro',
	'z_objectofixo',
	'z_objectovoco',
	'z_objektentzaubern',
	'z_oculus',
	'z_odem',
	'z_orcanofaxius',
	'z_orcanosphaero',
	'z_pandaemonium',
	'z_panik',
	'z_papperlapapp',
	'z_paralysis',
	'z_pectetondo',
	'z_penetrizzel',
	'z_pentagramma',
	'z_pestilenzerspueren',
	'z_pfeilderluft',
	'z_pfeildeseises',
	'z_pfeildeserzes',
	'z_pfeildesfeuers',
	'z_pfeildeshumus',
	'z_pfeildeswassers',
	'z_planastrale',
	'z_plumbumbarum',
	'z_projektimago',
	'z_protectionis',
	'z_psychostabilis',
	'z_radau',
	'z_reflectimago',
	'z_reptilea',
	'z_respondami',
	'z_reversalis',
	'z_ruhekoerper',
	'z_salander',
	'z_sanftmut',
	'z_sapefacta',
	'z_satuariasherrlichkeit',
	'z_schabernack',
	'z_schadenszauberbannen',
	'z_schelmenkleister',
	'z_schelmenlaune',
	'z_schelmenmaske',
	'z_schelmenrausch',
	'z_schleierderunwissenheit',
	'z_schwarzerschrecken',
	'z_schwarzundrot',
	'z_seelentiererkennen',
	'z_seelenwanderung',
	'z_seidenweich',
	'z_seidenzunge',
	'z_sensattacco',
	'z_sensibar',
	'z_serpentialis',
	'z_silentium',
	'z_sinesigil',
	'z_skelettarius',
	'z_solidirid',
	'z_somnigravis',
	'z_spinnenlauf',
	'z_spurlos',
	'z_standfest',
	'z_staubwandle',
	'z_steinwandle',
	'z_steinmauer',
	'z_stillstand',
	'z_stimmendeswindes',
	'z_sumpfstrudel',
	'z_sumuselixiere',
	'z_tauschrausch',
	'z_tempusstasis',
	'z_tierebesprechen',
	'z_tiergedanken',
	'z_tlalucsodem',
	'z_toteshandle',
	'z_transformatio',
	'z_transmutare',
	'z_transversalis',
	'z_traumgestalt',
	'z_umbraporta',
	'z_unberuehrt',
	'z_unitatio',
	'z_unsichtbarerjaeger',
	'z_veraenderungaufheben',
	'z_verschwindibus',
	'z_verstaendigungstoeren',
	'z_verwandlungbeenden',
	'z_vipernblick',
	'z_visibili',
	'z_vocolimbo',
	'z_vogelzwitschern',
	'z_wandausdornen',
	'z_wandausflammen',
	'z_warmesblut',
	'z_warmesgefriere',
	'z_wasseratem',
	'z_wasserwall',
	'z_weicheserstarre',
	'z_weihrauchwolke',
	'z_weisheitderbaeume',
	'z_weissemaehn',
	'z_wellenlauf',
	'z_wettermeisterschaft',
	'z_widerwille',
	'z_windbarriere',
	'z_windgefluester',
	'z_windhose',
	'z_windstille',
	'z_wipfellauf',
	'z_xenographus',
	'z_zagibu',
	'z_zappenduster',
	'z_zauberklinge',
	'z_zaubernahrung',
	'z_zauberwesen',
	'z_zauberzwang',
	'z_zornderelemente',
	'z_zungelaehmen',
	'z_zwingtanz'
];

const melee = [
	'k_attacke_parierwaffe',
	'k_attacke_schild',
	'k_attacke_waffe',
	'k_ausfall',
	'k_ausweichen_gezielt',
	'k_ausweichen_ungezielt',
	'k_befreiungsschlag',
	'k_betaeubungsschlag',
	'k_binden',
	'k_doppelangriff',
	'k_entwaffnen_attacke',
	'k_entwaffnen_parade',
	'k_festnageln',
	'k_finte_msf',
	'k_finte_osf',
	'k_gegenhalten',
	'k_gezielter_stich',
	'k_hammerschlag',
	'k_klingensturm',
	'k_klingenwand',
	'k_meisterliches_entwaffnen_attacke',
	'k_meisterliches_entwaffnen_parade',
	'k_meisterparade',
	'k_niederwerfen_schild',
	'k_niederwerfen_waffe',
	'k_parade_parierwaffe',
	'k_parade_schild',
	'k_parade_waffe',
	'k_passierschlag',
	'k_schildspalter',
	'k_sturmangriff',
	'k_todesstoss',
	'k_tod_von_links',
	'k_umreissen',
	'k_waffe_zerbrechen',
	'k_windmuehle',
	'k_wuchtschlag_msf_schild',
	'k_wuchtschlag_msf_waffe',
	'k_wuchtschlag_osf_schild',
	'k_wuchtschlag_osf_waffe'
];

/*
	Constants for regeneration-related things
*/
// Regeneration buttons
const reg = [
	'reg_astralmeditation',
	'reg_astralmeditation_set_full',
	'reg_deepbreath',
	'reg_karmicmeditation',
	'reg_relax',
	'reg_rest',
	'reg_sleep'
];

// Minimum regeneration
const regLimitLower = {
	'le': 0,
	'au': 0,
	'ae': 0,
	'ke': 0
};

// Astral regeneration-related attributes
const astralRegenerationAttrs =
[
	"sf_regeneration_i",
	"sf_regeneration_i",
	"sf_regeneration_ii",
	"sf_meisterliche_regeneration",
	"sf_meisterliche_regeneration_leiteigenschaft"
];

/*
	Constants for translating (new) internal name to (old) internal name and UI name

In the long run, all attributes should be migrated to the new ones.
*/
const talentsData = {
	't_ka_anderthalbhaender': {'internal': "Anderthalbhander", 'ui': "Anderthalbhänder"},
	't_ka_armbrust': {'internal': "armbrust", 'ui': "Armbrust"},
	't_ka_bastardstaebe': {'internal': "bastardstaebe", 'ui': "Bastardstäbe"},
	't_ka_belagerungswaffen': {'internal': "belagerungswaffen", 'ui': "Belagerungswaffen"},
	't_ka_blasrohr': {'internal': "blasrohr", 'ui': "Blasrohr"},
	't_ka_bogen': {'internal': "bogen", 'ui': "Bogen"},
	't_ka_diskus': {'internal': "diskus", 'ui': "Diskus"},
	't_ka_dolche': {'internal': "dolche", 'ui': "Dolche"},
	't_ka_fechtwaffen': {'internal': "fechtwaffen", 'ui': "Fechtwaffen"},
	't_ka_feuerwaffen': {'internal': "feuerwaffen", 'ui': "Feuerwaffen"},
	't_ka_hiebwaffen': {'internal': "hiebwaffen", 'ui': "Hiebwaffen"},
	't_ka_infanteriewaffen': {'internal': "infanteriewaffen", 'ui': "Infanteriewaffen"},
	't_ka_kettenstaebe': {'internal': "kettenstabe", 'ui': "Kettenstäbe"},
	't_ka_kettenwaffen': {'internal': "kettenwaffen", 'ui': "Kettenwaffen"},
	't_ka_lanzenreiten': {'internal': "lanzenreiten", 'ui': "Lanzenreiten"},
	't_ka_peitsche': {'internal': "peitsche", 'ui': "Peitsche"},
	't_ka_raufen': {'internal': "raufen", 'ui': "Raufen"},
	't_ka_ringen': {'internal': "ringen", 'ui': "Ringen"},
	't_ka_saebel': {'internal': "sabel", 'ui': "Säbel"},
	't_ka_schleuder': {'internal': "schleuder", 'ui': "Schleuder"},
	't_ka_schwerter': {'internal': "schwerter", 'ui': "Schwerter"},
	't_ka_speere': {'internal': "speere", 'ui': "Speere"},
	't_ka_staebe': {'internal': "stabe", 'ui': "Stäbe"},
	't_ka_wurfbeile': {'internal': "wurfbeile", 'ui': "Wurfbeile"},
	't_ka_wurfmesser': {'internal': "wurfmesser", 'ui': "Wurfmesser"},
	't_ka_wurfspeere': {'internal': "wurfspeere", 'ui': "Wurfspeere"},
	't_ka_zweihandflegel': {'internal': "zweihandflegel", 'ui': "Zweihandflegel"},
	't_ka_zweihandhiebwaffen': {'internal': "zweihand-hiebwaffen", 'ui': "Zweihandhiebwaffen"},
	't_ka_zweihandschwerter': {'internal': "zweihandschwerter", 'ui': "Zweihandschwerter"},
	't_ko_akrobatik': {'internal': "akrobatik", 'ui': "Akrobatik"},
	't_ko_athletik': {'internal': "athletik", 'ui': "Athletik"},
	't_ko_fliegen': {'internal': "fliegen", 'ui': "Fliegen"},
	't_ko_freiesfliegen': {'internal': "freiesfliegen", 'ui': "Freies Fliegen"},
	't_ko_gaukeleien': {'internal': "gaukeleien", 'ui': "Gaukeleien"},
	't_ko_immanspiel': {'internal': "immanspiel", 'ui': "Immanspiel"},
	't_ko_klettern': {'internal': "klettern", 'ui': "Klettern"},
	't_ko_koerperbeherrschung': {'internal': "korperbeherrschung", 'ui': "Körperbeherrschung"},
	't_ko_reiten': {'internal': "reiten", 'ui': "Reiten"},
	't_ko_schleichen': {'internal': "schleichen", 'ui': "Schleichen"},
	't_ko_schwimmen': {'internal': "schwimmen", 'ui': "Schwimmen"},
	't_ko_selbstbeherrschung': {'internal': "selbstbeherrschung", 'ui': "Selbstbeherrschung"},
	't_ko_sichverstecken': {'internal': "sichverstecken", 'ui': "Sich verstecken"},
	't_ko_singen': {'internal': "singen", 'ui': "Singen"},
	't_ko_sinnenschaerfe': {'internal': "sinnesscharfe", 'ui': "Sinnenschärfe"},
	't_ko_skifahren': {'internal': "skifahren", 'ui': "Skifahren"},
	't_ko_stimmenimitieren': {'internal': "stimmenimmitieren", 'ui': "Stimmenimitieren"},
	't_ko_tanzen': {'internal': "tanzen", 'ui': "Tanzen"},
	't_ko_taschendiebstahl': {'internal': "taschendiebstahl", 'ui': "Taschendiebstahl"},
	't_ko_zechen': {'internal': "zechen", 'ui': "Zechen"},
	't_ge_betoeren': {'internal': "betoren", 'ui': "Betören"},
	't_ge_etikette': {'internal': "etikette", 'ui': "Etikette"},
	't_ge_gassenwissen': {'internal': "gassenwissen", 'ui': "Gassenwissen"},
	't_ge_lehren': {'internal': "lehren", 'ui': "Lehren"},
	't_ge_menschenkenntnis': {'internal': "menschenkenntnis", 'ui': "Menschenkenntnis"},
	't_ge_schauspielerei': {'internal': "schauspielerei", 'ui': "Schauspielerei"},
	't_ge_schriftlicherausdruck': {'internal': "schriftlicherausdruck", 'ui': "Schriftlicher Ausdruck"},
	't_ge_sichverkleiden': {'internal': "sichverkleiden", 'ui': "Sich verkleiden"},
	't_ge_ueberreden': {'internal': "uberreden", 'ui': "Überreden"},
	't_ge_ueberzeugen': {'internal': "uberzeugen", 'ui': "Überzeugen"},
	't_n_faehrtensuchen': {'internal': "fahrtensuchen", 'ui': "Fährtensuchen"},
	't_n_fallenstellen': {'internal': "fallenstellen", 'ui': "Fallenstellen"},
	't_n_fesseln': {'internal': "fesseln", 'ui': "Fesseln/Entfesseln"},
	't_n_fischenangeln': {'internal': "fischen", 'ui': "Fischen/Angeln"},
	't_n_orientierung': {'internal': "orientierung", 'ui': "Orientierung"},
	't_n_wettervorhersage': {'internal': "wettervorhersage", 'ui': "Wettervorhersage"},
	't_n_wildnisleben': {'internal': "wildnisleben", 'ui': "Wildnisleben"},
	't_w_anatomie': {'internal': "anatomie", 'ui': "Anatomie"},
	't_w_baukunst': {'internal': "baukunst", 'ui': "Baukunst"},
	't_w_brettspiel': {'internal': "brettspiel", 'ui': "Brett-/Kartenspiel"},
	't_w_geographie': {'internal': "geographie", 'ui': "Geographie"},
	't_w_geschichtswissen': {'internal': "geschichtswissen", 'ui': "Geschichtswissen"},
	't_w_gesteinskunde': {'internal': "gesteinskunde", 'ui': "Gesteinskunde"},
	't_w_goetterkulte': {'internal': "gotter", 'ui': "Götter/Kulte"},
	't_w_heraldik': {'internal': "heraldik", 'ui': "Heraldik"},
	't_w_huettenkunde': {'internal': "huttenkunde", 'ui': "Hüttenkunde"},
	't_w_kriegskunst': {'internal': "kriegskunst", 'ui': "Kriegskunst"},
	't_w_kryptographie': {'internal': "kryptographie", 'ui': "Kryptographie"},
	't_w_magiekunde': {'internal': "magiekunde", 'ui': "Magiekunde"},
	't_w_mechanik': {'internal': "mechanik", 'ui': "Mechanik"},
	't_w_pflanzenkunde': {'internal': "pflanzenkunde", 'ui': "Pflanzenkunde"},
	't_w_philosophie': {'internal': "philosophie", 'ui': "Philosophie"},
	't_w_rechnen': {'internal': "rechnen", 'ui': "Rechnen"},
	't_w_rechtskunde': {'internal': "rechtskunde", 'ui': "Rechtskunde"},
	't_w_sagenlegenden': {'internal': "sagenlegenden", 'ui': "Sagen/Legenden"},
	't_w_schaetzen': {'internal': "schatzen", 'ui': "Schätzen"},
	't_w_sprachenkunde': {'internal': "sprachenkunde", 'ui': "Sprachenkunde"},
	't_w_staatskunst': {'internal': "staatskunst", 'ui': "Staatskunst"},
	't_w_sternkunde': {'internal': "sternkunde", 'ui': "Sternkunde"},
	't_w_tierkunde': {'internal': "tierkunde", 'ui': "Tierkunde"},
	't_sp_garethi': {'internal': "garethi", 'ui': "Garethi"},
	't_sp_bosparano': {'internal': "bosparano", 'ui': "Bosparano"},
	't_sp_aureliani': {'internal': "aureliani", 'ui': "Aureliani/Alt-Imperial/Alt-Güldenländisch"},
	't_sp_zyklopaeisch': {'internal': "zyklopaisch", 'ui': "Zyklopäisch"},
	't_sp_tulamidya': {'internal': "tulamidya", 'ui': "Tulamidya"},
	't_sp_urtulamidya': {'internal': "urtulamidya", 'ui': "Urtulamidya"},
	't_sp_zelemja': {'internal': "zelemja", 'ui': "Zelemja"},
	't_sp_alaani': {'internal': "alaani", 'ui': "Alaani"},
	't_sp_zhulchammaqra': {'internal': "zhulchammaqra", 'ui': "Zhulchammaqra"},
	't_sp_ferkina': {'internal': "ferkina", 'ui': "Ferkina"},
	't_sp_ruuz': {'internal': "ruuz", 'ui': "Ruuz"},
	't_sp_alteskemi': {'internal': "alteskemi", 'ui': "Altes Kemi"},
	't_sp_rabensprache': {'internal': "rabensprache", 'ui': "Rabensprache"},
	't_sp_thorwalsch': {'internal': "thorwalsch", 'ui': "Thorwalsch"},
	't_sp_hjaldingsch': {'internal': "hjaldingsch", 'ui': "Hjaldingsch/Saga-Thorwalsch"},
	't_sp_isdira': {'internal': "isdira", 'ui': "Isdira"},
	't_sp_asdharia': {'internal': "asdharia", 'ui': "Asdharia"},
	't_sp_rogolan': {'internal': "rogolan", 'ui': "Rogolan"},
	't_sp_angram': {'internal': "angram", 'ui': "Angram"},
	't_sp_ologhaijan': {'internal': "ologhaijan", 'ui': "Ologhaijan"},
	't_sp_oloarkh': {'internal': "oloarkh", 'ui': "Oloarkh"},
	't_sp_mahrisch': {'internal': "mahrisch", 'ui': "Mahrisch"},
	't_sp_rissoal': {'internal': "rissoal", 'ui': "Rissoal"},
	't_sp_drachisch': {'internal': "drachisch", 'ui': "Drachisch"},
	't_sp_goblinisch': {'internal': "goblinisch", 'ui': "Goblinisch"},
	't_sp_grolmisch': {'internal': "grolmisch", 'ui': "Grolmisch"},
	't_sp_koboldisch': {'internal': "koboldisch", 'ui': "Koboldisch"},
	't_sp_molochisch': {'internal': "molochisch", 'ui': "Molochisch"},
	't_sp_neckergesang': {'internal': "neckergesang", 'ui': "Neckergesang"},
	't_sp_nujuka': {'internal': "nujuka", 'ui': "Nujuka"},
	't_sp_rssahh': {'internal': "rssahh", 'ui': "Rssahh"},
	't_sp_sprachederblumen': {'internal': "sprachederblumen", 'ui': "Sprache der Blumen"},
	't_sp_trollisch': {'internal': "trollisch", 'ui': "Trollisch"},
	't_sp_waldmenschensprachen': {'internal': "waldmenschensprache", 'ui': "Waldmenschensprachen"},
	't_sp_zlit': {'internal': "zlit", 'ui': "Z'Lit"},
	't_sp_zhayad': {'internal': "zhayad", 'ui': "Zhayad"},
	't_sp_atak': {'internal': "atak", 'ui': "Atak"},
	't_sp_fuechsisch': {'internal': "fuchsisch", 'ui': "Füchsisch"},
	't_sc_altesalaani': {'internal': "schrift_altesalaani", 'ui': "Altes Alaani"},
	't_sc_alteskemi': {'internal': "schrift_alteskemi", 'ui': "Altes Kemi"},
	't_sc_amulashtra': {'internal': "schrift_amulashtra", 'ui': "Amulashtra"},
	't_sc_angram': {'internal': "schrift_angram", 'ui': "Angram"},
	't_sc_arkanil': {'internal': "schrift_arkanil", 'ui': "Arkanil"},
	't_sc_chrmk': {'internal': "schrift_chrmk", 'ui': "Chrmk"},
	't_sc_chuchas': {'internal': "schrift_chuchas", 'ui': "Chuchas"},
	't_sc_drakhardzinken': {'internal': "schrift_drakhardzinken", 'ui': "Drakhard-Zinken"},
	't_sc_draknedglyphen': {'internal': "schrift_draknedglyphen", 'ui': "Drakned-Glyphen"},
	't_sc_geheiligteglyphenvonunau': {'internal': "schrift_glyphenvonunau", 'ui': "Geheiligte Glyphen von Unau"},
	't_sc_gimaril': {'internal': "schrift_gimaril", 'ui': "Gimaril"},
	't_sc_gjalskisch': {'internal': "schrift_gjalskisch", 'ui': "Gjalskisch"},
	't_sc_hjaldingscherunen': {'internal': "schrift_hjaldingscherunen", 'ui': "Hjaldingsche Runen/Runenzeichen"},
	't_sc_imperialezeichen': {'internal': "schrift_imperialezeichen", 'ui': "(Alt-)Imperiale Zeichen/Alt-Imperiale Buchstaben"},
	't_sc_isdiraasdharia': {'internal': "schrift_isdira", 'ui': "Isdira/Asdharia"},
	't_sc_kuslikerzeichen': {'internal': "schrift_kuslikerzeichen", 'ui': "Kusliker Zeichen"},
	't_sc_mahrischeglyphen': {'internal': "schrift_mahrischeglyphen", 'ui': "Mahrische Glyphen"},
	't_sc_nanduria': {'internal': "schrift_nanduria", 'ui': "Nanduria"},
	't_sc_rogolan': {'internal': "schrift_rogolan", 'ui': "Rogolan"},
	't_sc_trollischeraumbilderschrift': {'internal': "schrift_troll", 'ui': "Trollische 'Raumbilderschrift'"},
	't_sc_tulamidya': {'internal': "schrift_tulamidya", 'ui': "Tulamidya"},
	't_sc_urtulamidya': {'internal': "schrift_urtulamidya", 'ui': "Urtulamidya"},
	't_sc_zhayad': {'internal': "schrift_zhayad", 'ui': "Zhayad"},
	't_h_abrichten': {'internal': "abrichten", 'ui': "Abrichten"},
	't_h_ackerbau': {'internal': "ackerbau", 'ui': "Ackerbau"},
	't_h_alchimie': {'internal': "alchimie", 'ui': "Alchimie"},
	't_h_bergbau': {'internal': "bergbau", 'ui': "Bergbau"},
	't_h_bogenbau': {'internal': "bogenbau", 'ui': "Bogenbau"},
	't_h_bootefahren': {'internal': "bootefahren", 'ui': "Bootefahren"},
	't_h_brauer': {'internal': "brauer", 'ui': "Brauer"},
	't_h_drucker': {'internal': "drucker", 'ui': "Drucker"},
	't_h_fahrzeuglenken': {'internal': "fahrzeuglenken", 'ui': "Fahrzeuglenken"},
	't_h_falschspiel': {'internal': "falschspiel", 'ui': "Falschspiel"},
	't_h_feinmechanik': {'internal': "feinmechanik", 'ui': "Feinmechanik"},
	't_h_feuersteinbearbeitung': {'internal': "feuersteinbearbeitung", 'ui': "Feuersteinbearbeitung"},
	't_h_fleischer': {'internal': "fleischer", 'ui': "Fleischer"},
	't_h_fluggeraetesteuern': {'internal': "fluggeraetesteuern", 'ui': "Fluggerätesteuern"},
	't_h_gerber': {'internal': "gerber", 'ui': "Gerber/Kürschner"},
	't_h_glaskunst': {'internal': "glaskunst", 'ui': "Glaskunst"},
	't_h_grobschmied': {'internal': "grobschmied", 'ui': "Grobschmied"},
	't_h_handel': {'internal': "handel", 'ui': "Handel"},
	't_h_hauswirtschaft': {'internal': "hauswirtschaft", 'ui': "Hauswirtschaft"},
	't_h_heilkundegift': {'internal': "heilkundegift", 'ui': "Heilkunde Gift"},
	't_h_heilkundekrankheiten': {'internal': "heilkundekrankheiten", 'ui': "Heilkunde Krankheiten"},
	't_h_heilkundeseele': {'internal': "heilkundeseele", 'ui': "Heilkunde Seele"},
	't_h_heilkundewunden': {'internal': "heilkundewunden", 'ui': "Heilkunde Wunden"},
	't_h_holzbearbeitung': {'internal': "holzbearbeitung", 'ui': "Holzbearbeitung"},
	't_h_instrumentenbauer': {'internal': "instrumentenbauer", 'ui': "Instrumentenbauer"},
	't_h_kartographie': {'internal': "karthographie", 'ui': "Kartographie"},
	't_h_kochen': {'internal': "kochen", 'ui': "Kochen"},
	't_h_kristallzucht': {'internal': "kristallzucht", 'ui': "Kristallzucht"},
	't_h_lederarbeiten': {'internal': "lederarbeiten", 'ui': "Lederarbeiten"},
	't_h_malenzeichnen': {'internal': "malenzeichnen", 'ui': "Malen/Zeichnen"},
	't_h_maurer': {'internal': "maurer", 'ui': "Maurer"},
	't_h_metallguss': {'internal': "metallguss", 'ui': "Metallguss"},
	't_h_musizieren': {'internal': "musizieren", 'ui': "Musizieren"},
	't_h_schloesserknacken': {'internal': "schlosserknacken", 'ui': "Schlösserknacken"},
	't_h_schnapsbrennen': {'internal': "schnapsbrennen", 'ui': "Schnapsbrennen"},
	't_h_schneidern': {'internal': "schneidern", 'ui': "Schneidern"},
	't_h_seefahrt': {'internal': "seefahrt", 'ui': "Seefahrt"},
	't_h_seiler': {'internal': "seiler", 'ui': "Seiler"},
	't_h_steinmetz': {'internal': "steinmetz", 'ui': "Steinmetz"},
	't_h_steinschneider': {'internal': "steinschneider", 'ui': "Steinschneider/Juwelier"},
	't_h_stellmacher': {'internal': "stellmacher", 'ui': "Stellmacher"},
	't_h_stoffefaerben': {'internal': "stoffefarben", 'ui': "Stoffefärben"},
	't_h_taetowieren': {'internal': "tatowieren", 'ui': "Tätowieren"},
	't_h_toepfern': {'internal': "topfern", 'ui': "Töpfern"},
	't_h_viehzucht': {'internal': "viehzucht", 'ui': "Viehzucht"},
	't_h_webkunst': {'internal': "webkunst", 'ui': "Webkunst"},
	't_h_winzer': {'internal': "winzer", 'ui': "Winzer"},
	't_h_zimmermann': {'internal': "zimmermann", 'ui': "Zimmermann"},
	/* Myranor */
	't_sp_gemeinimperial': {'internal': "gemeinimperial", 'ui': "Gemein-Imperial"},
	't_sp_hieroimperial': {'internal': "hieroimperial", 'ui': "Hiero-Imperial"},
	't_sp_fruehimperial': {'internal': "fruehimperial", 'ui': "Früh-Imperial"},
	't_sp_dorinthisch': {'internal': "dorinthisch", 'ui': "Proto-Imperial/Dorinthisch"},
	't_sp_kentorisch': {'internal': "kentorisch", 'ui': "Kentorisch"},
	't_sp_draydalanisch': {'internal': "draydalanisch", 'ui': "Draydalanisch"},
	't_sp_yachyach': {'internal': "yachyach", 'ui': "Yachyach"},
	't_sp_alamarasharielitisch': {'internal': "alamarasharielitisch", 'ui': "Alamar-Asharielitisch"},
	't_sp_ravesaran': {'internal': "ravesaran", 'ui': "Ravesaran"},
	't_sp_pristidial': {'internal': "pristidial", 'ui': "Pristidial"},
	't_sp_gemeinamaunal': {'internal': "gemeinamaunal", 'ui': "Gemein-Amaunal/AhMa"},
	't_sp_hieroamaunal': {'internal': "hieroamaunal", 'ui': "Hiero-Amaunal/AhMaGao"},
	't_sp_leonal': {'internal': "leonal", 'ui': "Leonal/Khorrzu"},
	't_sp_pardiral': {'internal': "pardiral", 'ui': "Pardiral/Bhagrach"},
	't_sp_tighral': {'internal': "tighral", 'ui': "Tighral/Tharr'Orr"},
	't_sp_lyncal': {'internal': "lyncal", 'ui': "Lyncal/Fhi'ai"},
	't_sp_sumurrisch': {'internal': "sumurrisch", 'ui': "Sumurrisch/Ur-Bansumitisch"},
	't_sp_altnarkramarisch': {'internal': "altnarkramarisch", 'ui': "Alt-Narkramarisch"},
	't_sp_alttesumurrisch': {'internal': "alttesumurrisch", 'ui': "Alt-Tesumurrisch"},
	't_sp_narkramarisch': {'internal': "narkramarisch", 'ui': "Narkramarisch"},
	't_sp_mahapratisch': {'internal': "mahapratisch", 'ui': "Mahapratisch"},
	't_sp_kerrishitisch': {'internal': "kerrishitisch", 'ui': "Kerrishitisch"},
	't_sp_tesumurrisch': {'internal': "tesumurrisch", 'ui': "Tesumurrisch"},
	't_sp_vinshinisch': {'internal': "vinshinisch", 'ui': "Vinshinisch"},
	't_sp_boagorambanbarguinisch': {'internal': "boagorambanbarguinisch", 'ui': "Boa'goram Banbarguinisch"},
	't_sp_lishshioderwolfalbisch': {'internal': "lishshioderwolfalbisch", 'ui': "Lish'shioder Wolfalbisch"},
	't_sp_dagathimisch': {'internal': "dagathimisch", 'ui': "Dagathimisch"},
	't_sp_krakonisch': {'internal': "krakonisch", 'ui': "Krakonisch"},
	't_sp_mholurisch': {'internal': "mholurisch", 'ui': "Mholurisch"},
	't_sp_iaril': {'internal': "iaril", 'ui': "Iaril"},
	't_sp_loualilisch': {'internal': "loualilisch", 'ui': "Loualilisch"},
	't_sp_altneristal': {'internal': "altneristal", 'ui': "Alt-Neristal"},
	't_sp_neristal': {'internal': "neristal", 'ui': "Neristal"},
	't_sp_gemeinvesayitisch': {'internal': "gemeinvesayitisch", 'ui': "Gemein-Vesayitisch/Vesayo"},
	't_sp_altvesayitisch': {'internal': "altvesayitisch", 'ui': "Alt-Vesayitisch"},
	't_sp_urvesayitisch': {'internal': "urvesayitisch", 'ui': "Ur-Vesayitisch"},
	't_sp_abishant': {'internal': "abishant", 'ui': "Abishant"},
	't_sp_bashurisch': {'internal': "bashurisch", 'ui': "Archäisch/Bashurisch"},
	't_sp_bramscho': {'internal': "bramscho", 'ui': "Bramscho/Baramunisch"},
	't_sp_eupherban': {'internal': "eupherban", 'ui': "Eupherban-Haussprache"},
	't_sp_grolmurisch': {'internal': "grolmurisch", 'ui': "Grolmurisch"},
	't_sp_hippocampir': {'internal': "hippocampir", 'ui': "Hippocampir-Zeichensprache"},
	't_sp_horngesang': {'internal': "horngesang", 'ui': "Horngesang"},
	't_sp_lieddergemeinschaft': {'internal': "lieddergemeinschaft", 'ui': "Lied der Gemeinschaft"},
	't_sp_lutral': {'internal': "lutral", 'ui': "Lutral"},
	't_sp_myranisch': {'internal': "myranisch", 'ui': "Myranisch"},
	't_sp_myrmidal': {'internal': "myrmidal", 'ui': "Myrmidal"},
	't_sp_nequanerwasserschallcode': {'internal': "nequanerwasserschallcode", 'ui': "Nequaner-Wasserschall-Code"},
	't_sp_nequanerzeichensprache': {'internal': "nequanerzeichensprache", 'ui': "Nequaner-Zeichensprache"},
	't_sp_norkoshal': {'internal': "norkoshal", 'ui': "Norkoshal"},
	't_sp_rhoglossa': {'internal': "rhoglossa", 'ui': "Alt-Zwergisch/Rhoglossa"},
	't_sp_ruritin': {'internal': "ruritin", 'ui': "Ruritin"},
	't_sp_shingwanisch': {'internal': "shingwanisch", 'ui': "Shingwanisch"},
	't_sp_shinoq': {'internal': "shinoq", 'ui': "Shinoq"},
	't_sc_altetesumurrischeglyphen': {'internal': "schrift_altetesumurrischeglyphen", 'ui': "Alte Tesumurrische Glyphen"},
	't_sc_altnarkramarischebilderschrift': {'internal': "schrift_altnarkramarischebilderschrift", 'ui': "Alt-Narkramarische Bilderschrift"},
	't_sc_alttauralsilbenzeichen': {'internal': "schrift_alttauralsilbenzeichen", 'ui': "Alt-Taural-Silbenzeichen"},
	't_sc_amaunischekratzschrift': {'internal': "schrift_amaunischekratzschrift", 'ui': "Amaunische Kratzschrift"},
	't_sc_anneristalyabilderschrift': {'internal': "schrift_anneristalyabilderschrift", 'ui': "Anneristalya-Bilderschrift"},
	't_sc_banshibilderschrift': {'internal': "schrift_banshibilderschrift", 'ui': "Ban'shi-Bilderschrift"},
	't_sc_bramschoromk': {'internal': "schrift_bramschoromk", 'ui': "Bramschoromk"},
	't_sc_draydalanischeschriftzeichen': {'internal': "schrift_draydalanischeschriftzeichen", 'ui': "Draydalanische Schriftzeichen"},
	't_sc_eupherbancode': {'internal': "schrift_eupherbancode", 'ui': "Eupherban-Code"},
	't_sc_fruehimperialeglyphen': {'internal': "schrift_fruehimperialeglyphen", 'ui': "Früh-Imperiale Glyphen"},
	't_sc_grolmurischesilbenzeichen': {'internal': "schrift_grolmurischesilbenzeichen", 'ui': "Grolmurische Silbenzeichen"},
	't_sc_imperialebuchstaben': {'internal': "schrift_imperialebuchstaben", 'ui': "Imperiale Buchstaben"},
	't_sc_kalshinshi': {'internal': "schrift_kalshinshi", 'ui': "Kalshinshi"},
	't_sc_kerrishitischesilbenzeichen': {'internal': "schrift_kerrishitischesilbenzeichen", 'ui': "Kerrishitische Silbenzeichen"},
	't_sc_khorrzusymbole': {'internal': "schrift_khorrzusymbole", 'ui': "Khorrzu-Symbole"},
	't_sc_lahmarischeglyphen': {'internal': "schrift_lahmarischeglyphen", 'ui': "Lahmarische Glyphen"},
	't_sc_lyncilsymbole': {'internal': "schrift_lyncilsymbole", 'ui': "Lyncil-Symbole"},
	't_sc_mahapratischesilbenzeichen': {'internal': "schrift_mahapratischesilbenzeichen", 'ui': "Mahapratische Silbenzeichen"},
	't_sc_narkramarischesilbenzeichen': {'internal': "schrift_narkramarischesilbenzeichen", 'ui': "Narkramarische Silbenzeichen"},
	't_sc_nequanischebuchstaben': {'internal': "schrift_nequanischebuchstaben", 'ui': "Nequanische Buchstaben"},
	't_sc_vesayitischesilbenzeichen': {'internal': "schrift_vesayitischesilbenzeichen", 'ui': "Vesayitische Wort- und Silbenzeichen"},
	't_sc_vesayosilbenzeichen': {'internal': "schrift_vesayosilbenzeichen", 'ui': "Vesayo-Silbenzeichen"},
	't_sc_vorimperialepiktogramme': {'internal': "schrift_vorimperialepiktogramme", 'ui': "Vor-Imperiale Piktogramme"},
	't_sc_wasserschallzeichen': {'internal': "schrift_wasserschallzeichen", 'ui': "Wasserschallzeichen"}
};
const spellsData = {
	'z_abvenenum': {'internal': "abvenenum", 'ui': "Abvenenum Reine Speise", 'stats': ['KL', 'KL', 'FF']},
	'z_accuratum': {'internal': "accuratum", 'ui': "Accuratum Zaubernadel", 'stats': ['KL', 'CH', 'FF']},
	'z_adamantium': {'internal': "adamantium", 'ui': "Adamantium Erzstruktur", 'stats': ['KL', 'FF', 'KO']},
	'z_adlerauge': {'internal': "adlerauge", 'ui': "Adlerauge Luchsenohr", 'stats': ['KL', 'IN', 'FF']},
	'z_adlerschwinge': {'internal': "adlerschwinge", 'ui': "Adlerschwinge Wolfsgestalt", 'stats': ['MU', 'IN', 'GE']},
	'z_aengstelindern': {'internal': "angste", 'ui': "Ängste lindern", 'stats': ['MU', 'IN', 'CH']},
	'z_aeolitus': {'internal': "aeolitus", 'ui': "Aeolitus Windgebraus", 'stats': ['KL', 'CH', 'KO']},
	'z_aerofugo': {'internal': "aerofugo", 'ui': "Aerofugo Vakuum", 'stats': ['MU', 'KO', 'KK']},
	'z_aerogelo': {'internal': "aerogelo", 'ui': "Aerogelo Atemqual", 'stats': ['MU', 'IN', 'KO']},
	'z_aeropulvis': {'internal': "aeropulvis", 'ui': "Aeropulvis Sanfter Fall", 'stats': ['KL', 'IN', 'GE']},
	'z_dz_agrimothbann': {'internal': "agrimothbann", 'ui': "Agrimothbann", 'stats': ['MU', 'CH', 'KO']},
	'z_alpgestalt': {'internal': "alpgestalt", 'ui': "Alpgestalt", 'stats': ['MU', 'CH', 'GE']},
	'z_analys': {'internal': "analys", 'ui': "Analys Arcanstruktur", 'stats': ['KL', 'KL', 'IN']},
	'z_animatio': {'internal': "animato", 'ui': "Animatio Stummer Diener", 'stats': ['KL', 'FF', 'GE']},
	'z_applicatus': {'internal': "applicatus", 'ui': "Applicatus Zauberspeicher", 'stats': ['KL', 'FF', 'FF']},
	'z_aquafaxius': {'internal': "aquafaxius", 'ui': "Aquafaxius", 'stats': ['KL', 'FF', 'KO']},
	'z_aquaqueris': {'internal': "aquaqueris", 'ui': "Aquaqueris Wasserfluch", 'stats': ['MU', 'IN', 'KK']},
	'z_aquasphaero': {'internal': "aquasphaero", 'ui': "Aquasphaero", 'stats': ['MU', 'IN', 'KO']},
	'z_arachnea': {'internal': "arachnea", 'ui': "Arachnea Krabbeltier", 'stats': ['MU', 'IN', 'CH']},
	'z_arcanovi': {'internal': "arcanovi", 'ui': "Arcanovi Artefakt", 'stats': ['KL', 'KL', 'FF']},
	'z_archofaxius': {'internal': "archofaxius", 'ui': "Archofaxius", 'stats': ['KL', 'FF', 'KO']},
	'z_archosphaero': {'internal': "archosphaero", 'ui': "Archosphaero", 'stats': ['MU', 'IN', 'KO']},
	'z_armatrutz': {'internal': "armatrutz", 'ui': "Armatrutz", 'stats': ['IN', 'GE', 'KO']},
	'z_atemnot': {'internal': "atemnot", 'ui': "Atemnot", 'stats': ['MU', 'KO', 'KK']},
	'z_attributo': {'internal': "attributo", 'ui': "Attributo", 'stats': ['KL', 'CH', 'Eigenschaft_Attributo']},
	'z_aufgeblasen': {'internal': "aufgeblasen", 'ui': "Aufgeblasen Abgehoben", 'stats': ['CH', 'KO', 'KK']},
	'z_augedeslimbus': {'internal': "auge", 'ui': "Auge des Limbus", 'stats': ['MU', 'KO', 'KK']},
	'z_aureolus': {'internal': "aureolus", 'ui': "Aureolus Güldenglanz", 'stats': ['IN', 'CH', 'FF']},
	'z_aurisnasusoculus': {'internal': "auris", 'ui': "Auris Nasus Oculus", 'stats': ['KL', 'CH', 'FF']},
	'z_axxeleratus': {'internal': "axxeleratus", 'ui': "Axxeleratus Blitzgeschwind", 'stats': ['KL', 'GE', 'KO']},
	'z_baerenruhe': {'internal': "barenruhe", 'ui': "Bärenruhe Winterschlaf", 'stats': ['MU', 'KK', 'KO']},
	'z_balsam': {'internal': "balsam", 'ui': "Balsam Salabunde", 'stats': ['KL', 'IN', 'CH']},
	'z_bandundfessel': {'internal': "band", 'ui': "Band und Fessel", 'stats': ['KL', 'CH', 'KK']},
	'z_bannbaladin': {'internal': "bannbaladin", 'ui': "Bannbaladin", 'stats': ['IN', 'CH', 'CH']},
	'z_beherrschungbrechen': {'internal': "beherrschung", 'ui': "Beherrschung brechen", 'stats': ['KL', 'IN', 'CH']},
	'z_dz_belzhorashbann': {'internal': "belzhorashbann", 'ui': "Belzhorashbann", 'stats': ['MU', 'CH', 'KO']},
	'z_beschwoerungvereiteln': {'internal': "beschworung", 'ui': "Beschwörung vereiteln", 'stats': ['MU', 'IN', 'CH']},
	'z_bewegungstoeren': {'internal': "bewegung", 'ui': "Bewegung stören", 'stats': ['KL', 'IN', 'FF']},
	'z_dz_bienenschwarm': {'internal': "bienenschwarm", 'ui': "Bienenschwarm", 'stats': ['MU', 'CH', 'CH']},
	'z_blendwerk': {'internal': "blendwerk", 'ui': "Blendwerk", 'stats': ['IN', 'CH', 'GE']},
	'z_blickaufswesen': {'internal': "blickaufswesen", 'ui': "Blick auf's Wesen", 'stats': ['KL', 'IN', 'CH']},
	'z_blickdurchfremdeaugen': {'internal': "blickdurchfremdeaugen", 'ui': "Blick durch fremde Augen", 'stats': ['MU', 'IN', 'CH']},
	'z_blickindiegedanken': {'internal': "blickindiegedanken", 'ui': "Blick in die Gedanken", 'stats': ['KL', 'KL', 'CH']},
	'z_blickindievergangenheit': {'internal': "blickindievergangenheit", 'ui': "Blick in die Vergangenheit", 'stats': ['KL', 'KL', 'IN']},
	'z_blitz': {'internal': "blitz", 'ui': "Blitz dich find", 'stats': ['KL', 'IN', 'GE']},
	'z_boeserblick': {'internal': "boser", 'ui': "Böser Blick", 'stats': ['MU', 'CH', 'CH']},
	'z_brenne': {'internal': "brenne", 'ui': "Brenne, toter Stoff!", 'stats': ['MU', 'KL', 'KO']},
	'z_caldofrigo': {'internal': "caldofrigo", 'ui': "Caldofrigo Heiß und Kalt", 'stats': ['IN', 'CH', 'KO']},
	'z_chamaelioni': {'internal': "chamaelioni", 'ui': "Chamaelioni Mimikry", 'stats': ['IN', 'CH', 'GE']},
	'z_chimaeroform': {'internal': "chimaeroform", 'ui': "Chimaeroform Hybridgestalt", 'stats': ['KL', 'IN', 'KO']},
	'z_chronoklassis': {'internal': "chronoklassis", 'ui': "Chronoklassis Urfossil", 'stats': ['KL', 'IN', 'KO']},
	'z_chrononautos': {'internal': "chrononautos", 'ui': "Chrononautos Zeitenfahrt", 'stats': ['MU', 'CH', 'KO']},
	'z_claudibus': {'internal': "claudibus", 'ui': "Claudibus Clavistibor", 'stats': ['KL', 'FF', 'KK']},
	'z_corpofesso': {'internal': "corpofesso", 'ui': "Corpofesso Gliederschmerz", 'stats': ['KL', 'KO', 'KK']},
	'z_corpofrigo': {'internal': "corpofrigo", 'ui': "Corpofrigo Kälteschock", 'stats': ['CH', 'GE', 'KO']},
	'z_cryptographo': {'internal': "cryptographo", 'ui': "Cryptographo Zauberschrift", 'stats': ['KL', 'KL', 'IN']},
	'z_custodosigil': {'internal': "custodosigil", 'ui': "Custodosigil Diebesbann", 'stats': ['KL', 'FF', 'FF']},
	'z_daemonenbann': {'internal': "damonenbann", 'ui': "Dämonenbann", 'stats': ['MU', 'CH', 'KO']},
	'z_delicioso': {'internal': "delicioso", 'ui': "Delicioso Gaumenschmaus", 'stats': ['KL', 'CH', 'FF']},
	'z_desintegratus': {'internal': "desintegratus", 'ui': "Desintegratus Pulverstaub", 'stats': ['KL', 'KO', 'KK']},
	'z_destructibo': {'internal': "destructibo", 'ui': "Destructibo Arcanitas", 'stats': ['KL', 'KL', 'FF']},
	'z_dichterunddenker': {'internal': "dichter", 'ui': "Dichter und Denker", 'stats': ['KL', 'IN', 'CH']},
	'z_dschinnenruf': {'internal': "dschinnenruf", 'ui': "Dschinnenruf", 'stats': ['MU', 'KL', 'CH']},
	'z_dunkelheit': {'internal': "dunkelheit", 'ui': "Dunkelheit", 'stats': ['KL', 'KL', 'FF']},
	'z_duplicatus': {'internal': "duplicatus", 'ui': "Duplicatus Doppelbild", 'stats': ['KL', 'CH', 'GE']},
	'z_ecliptifactus': {'internal': "ecliptifactus", 'ui': "Ecliptifactus Schattenkraft", 'stats': ['MU', 'KL', 'KO']},
	'z_eigenschaftwiederherstellen': {'internal': "eigenschaft", 'ui': "Eigenschaft wiederherstellen", 'stats': ['KL', 'IN', 'CH']},
	'z_eigneaengste': {'internal': "eigne", 'ui': "Eigne Ängste quälen dich!", 'stats': ['MU', 'IN', 'CH']},
	'z_einflussbannen': {'internal': "einfluss", 'ui': "Einfluss bannen", 'stats': ['IN', 'CH', 'CH']},
	'z_einsmitdernatur': {'internal': "eins", 'ui': "Eins mit der Natur", 'stats': ['IN', 'GE', 'KO']},
	'z_eisenrost': {'internal': "eisenrost", 'ui': "Eisenrost und Patina", 'stats': ['KL', 'CH', 'GE']},
	'z_eiseskaelte': {'internal': "eiseskalte", 'ui': "Eiseskälte Kämpferherz", 'stats': ['MU', 'IN', 'KO']},
	'z_eiswirbel': {'internal': "eiswirbel", 'ui': "Eiswirbel", 'stats': ['MU', 'IN', 'KK']},
	'z_elementarbann': {'internal': "elementarbann", 'ui': "Elementarbann", 'stats': ['IN', 'CH', 'KO']},
	'z_elementarerdiener': {'internal': "elementarer", 'ui': "Elementarer Diener", 'stats': ['MU', 'KL', 'CH']},
	'z_elfenstimme': {'internal': "elfenstimme", 'ui': "Elfenstimme Flötenton", 'stats': ['IN', 'CH', 'KO']},
	'z_dz_entfesselungdesgetiers': {'internal': "Entfesselung_des_Getiers", 'ui': "Entfesselung des Getiers", 'stats': ['KL', 'CH', 'KO']},
	'z_erinnerungverlassedich': {'internal': "erinnerung", 'ui': "Erinnerung verlasse dich!", 'stats': ['MU', 'IN', 'CH']},
	'z_exposami': {'internal': "exposami", 'ui': "Exposami Lebenskraft", 'stats': ['KL', 'IN', 'IN']},
	'z_falkenauge': {'internal': "falkenauge", 'ui': "Falkenauge Meisterschuss", 'stats': ['IN', 'FF', 'GE']},
	'z_favilludo': {'internal': "favilludo", 'ui': "Favilludo Funkentanz", 'stats': ['IN', 'CH', 'FF']},
	'z_fesselranken': {'internal': "fesselranken", 'ui': "Fesselranken", 'stats': ['KL', 'IN', 'KK']},
	'z_feuermaehne': {'internal': "feuermaehne", 'ui': "Feuermähne Flammenhuf", 'stats': ['IN', 'CH', 'KO']},
	'z_feuersturm': {'internal': "feuersturm", 'ui': "Feuersturm", 'stats': ['MU', 'IN', 'KK']},
	'z_firnlauf': {'internal': "firnlauf", 'ui': "Firnlauf", 'stats': ['MU', 'KL', 'GE']},
	'z_flimflam': {'internal': "flim", 'ui': "Flim Flam Funkel", 'stats': ['KL', 'KL', 'FF']},
	'z_fluchderpestilenz': {'internal': "fluch", 'ui': "Fluch der Pestilenz", 'stats': ['MU', 'KL', 'CH']},
	'z_foramen': {'internal': "foramen", 'ui': "Foramen Foraminor", 'stats': ['KL', 'KL', 'FF']},
	'z_fortifex': {'internal': "fortifex", 'ui': "Fortifex Arkane Wand", 'stats': ['IN', 'KO', 'KK']},
	'z_frigifaxius': {'internal': "frigifaxius", 'ui': "Frigifaxius", 'stats': ['KL', 'FF', 'KO']},
	'z_frigisphaero': {'internal': "frigisphaero", 'ui': "Frigisphaero", 'stats': ['MU', 'IN', 'KO']},
	'z_fulminictus': {'internal': "fulminictus", 'ui': "Fulminictus Donnerkeil", 'stats': ['IN', 'GE', 'KO']},
	'z_gardianum': {'internal': "gardianum", 'ui': "Gardianum Zauberschild", 'stats': ['KL', 'IN', 'KO']},
	'z_dz_gebieterdertiefe': {'internal': "Gebieter_der_Tiefe", 'ui': "Gebieter der Tiefe", 'stats': ['MU', 'CH', 'KO']},
	'z_gedankenbilder': {'internal': "gedankenbilder", 'ui': "Gedankenbilder Elfenruf", 'stats': ['KL', 'IN', 'CH']},
	'z_gefaessderjahre': {'internal': "gefass", 'ui': "Gefäß der Jahre", 'stats': ['MU', 'KL', 'KO']},
	'z_gefunden': {'internal': "gefunden", 'ui': "Gefunden!", 'stats': ['KL', 'IN', 'GE']},
	'z_geisterbann': {'internal': "geisterbann", 'ui': "Geisterbann", 'stats': ['MU', 'MU', 'CH']},
	'z_geisterruf': {'internal': "geisterruf", 'ui': "Geisterruf", 'stats': ['MU', 'MU', 'CH']},
	'z_dz_geschossderniederhoellen': {'internal': "Geschoss_der_Niederhoellen", 'ui': "Geschoss der Niederhöllen", 'stats': ['CH', 'FF', 'KK']},
	'z_glacoflumen': {'internal': "glacoflumen", 'ui': "Glacoflumen Fluss aus Eis", 'stats': ['IN', 'GE', 'KO']},
	'z_gletscherwand': {'internal': "gletscherwand", 'ui': "Gletscherwand", 'stats': ['MU', 'KL', 'CH']},
	'z_granitundmarmor': {'internal': "granit", 'ui': "Granit und Marmor", 'stats': ['MU', 'CH', 'KO']},
	'z_dz_grolmenseele': {'internal': "Grolmenseele", 'ui': "Grolmenseele", 'stats': ['KL', 'CH', 'FF']},
	'z_grossegier': {'internal': "grossegier", 'ui': "Große Gier", 'stats': ['KL', 'KL', 'CH']},
	'z_grosseverwirrung': {'internal': "grosseverwirrung", 'ui': "Große Verwirrung", 'stats': ['KL', 'KL', 'CH']},
	'z_halluzination': {'internal': "halluzination", 'ui': "Halluzination", 'stats': ['KL', 'IN', 'CH']},
	'z_harmlosegestalt': {'internal': "harmlose", 'ui': "Harmlose Gestalt", 'stats': ['KL', 'CH', 'GE']},
	'z_hartesschmelze': {'internal': "hartes", 'ui': "Hartes schmelze!", 'stats': ['MU', 'KL', 'KK']},
	'z_haselbusch': {'internal': "haselbusch", 'ui': "Haselbusch und Ginsterkraut", 'stats': ['CH', 'FF', 'KO']},
	'z_dz_hauchdertiefentochter': {'internal': "Hauch_der_Tiefen_Tochter", 'ui': "Hauch der Tiefen Tochter", 'stats': ['KL', 'CH', 'KK']},
	'z_heilkraftbannen': {'internal': "heilkraft", 'ui': "Heilkraft bannen", 'stats': ['KL', 'CH', 'FF']},
	'z_hellsichttrueben': {'internal': "hellsicht", 'ui': "Hellsicht trüben", 'stats': ['KL', 'IN', 'CH']},
	'z_herbeirufungvereiteln': {'internal': "herbeirufung", 'ui': "Herbeirufung vereiteln", 'stats': ['MU', 'IN', 'CH']},
	'z_herrueberdastierreich': {'internal': "herr", 'ui': "Herr über das Tierreich", 'stats': ['MU', 'MU', 'CH']},
	'z_herzschlagruhe': {'internal': "herzschlag", 'ui': "Herzschlag ruhe!", 'stats': ['MU', 'CH', 'KK']},
	'z_dz_hexagrammadschinnenbann': {'internal': "Hexagramma_Dschinnenbann", 'ui': "Hexagramma Dschinnenbann", 'stats': ['MU', 'MU', 'IN']},
	'z_hexenblick': {'internal': "hexenblick", 'ui': "Hexenblick", 'stats': ['IN', 'IN', 'CH']},
	'z_hexengalle': {'internal': "hexengalle", 'ui': "Hexengalle", 'stats': ['MU', 'IN', 'CH']},
	'z_hexenholz': {'internal': "hexenholz", 'ui': "Hexenholz", 'stats': ['KL', 'FF', 'KK']},
	'z_hexenknoten': {'internal': "hexenknoten", 'ui': "Hexenknoten", 'stats': ['KL', 'IN', 'CH']},
	'z_hexenkrallen': {'internal': "hexenkrallen", 'ui': "Hexenkrallen", 'stats': ['MU', 'IN', 'KO']},
	'z_hexenspeichel': {'internal': "hexenspeichel", 'ui': "Hexenspeichel", 'stats': ['IN', 'CH', 'FF']},
	'z_hilfreichetatze': {'internal': "hilfreiche", 'ui': "Hilfreiche Tatze, rettende Schwinge", 'stats': ['MU', 'IN', 'CH']},
	'z_hoellenpein': {'internal': "hollenpein", 'ui': "Höllenpein zerreiße dich!", 'stats': ['KL', 'CH', 'KO']},
	'z_holterdipolter': {'internal': "holterdipolter", 'ui': "Holterdipolter", 'stats': ['IN', 'IN', 'FF']},
	'z_dz_hornissenruf': {'internal': "hornissenruf", 'ui': "Hornissenruf", 'stats': ['MU', 'CH', 'CH']},
	'z_horriphobus': {'internal': "horriphobus", 'ui': "Horriphobus Schreckgestalt", 'stats': ['MU', 'IN', 'CH']},
	'z_humofaxius': {'internal': "humofaxius", 'ui': "Humofaxius", 'stats': ['KL', 'FF', 'KO']},
	'z_humosphaero': {'internal': "humosphaero", 'ui': "Humosphaero", 'stats': ['MU', 'IN', 'KO']},
	'z_ignifaxius': {'internal': "ignifaxius", 'ui': "Ignifaxius Flammenstrahl", 'stats': ['KL', 'FF', 'KO']},
	'z_dz_igniflumenflammenspur': {'internal': "Igniflumen_Flammenspur", 'ui': "Igniflumen Flammenspur", 'stats': ['MU', 'KL', 'KO']},
	'z_ignifugo': {'internal': "ignifugo", 'ui': "Ignifugo Feuerbann", 'stats': ['MU', 'FF', 'KO']},
	'z_ignimorpho': {'internal': "ignimorpho", 'ui': "Ignimorpho Feuerform", 'stats': ['MU', 'FF', 'KO']},
	'z_igniplano': {'internal': "igniplano", 'ui': "Igniplano Flächenbrand", 'stats': ['MU', 'IN', 'KO']},
	'z_dz_igniquerisfeuerkragen': {'internal': "Igniqueris_Feuerkragen", 'ui': "Igniqueris Feuerkragen", 'stats': ['KL', 'CH', 'KK']},
	'z_ignisphaero': {'internal': "ignisphaero", 'ui': "Ignisphaero Feuerball", 'stats': ['MU', 'IN', 'KO']},
	'z_ignorantia': {'internal': "ignorantia", 'ui': "Ignorantia Ungesehn", 'stats': ['IN', 'CH', 'GE']},
	'z_illusionaufloesen': {'internal': "illusion", 'ui': "Illusion auflösen", 'stats': ['KL', 'IN', 'CH']},
	'z_immortalis': {'internal': "immortalis", 'ui': "Immortalis Lebenszeit", 'stats': ['MU', 'CH', 'KO']},
	'z_imperavi': {'internal': "imperavi", 'ui': "Imperavi Handlungszwang", 'stats': ['KL', 'CH', 'CH']},
	'z_impersona': {'internal': "impersona", 'ui': "Impersona Maskenbild", 'stats': ['KL', 'IN', 'FF']},
	'z_infinitum': {'internal': "infinitum", 'ui': "Infinitum Immerdar", 'stats': ['KL', 'CH', 'KO']},
	'z_invercano': {'internal': "invercano", 'ui': "Invercano Spiegeltrick", 'stats': ['MU', 'IN', 'FF']},
	'z_invocatiomaior': {'internal': "invocatiomaior", 'ui': "Invocatio Maior", 'stats': ['MU', 'MU', 'CH']},
	'z_invocatiominor': {'internal': "invocatiominor", 'ui': "Invocatio Minor", 'stats': ['MU', 'MU', 'CH']},
	'z_iribaarshand': {'internal': "iribaars", 'ui': "Iribaars Hand", 'stats': ['MU', 'MU', 'IN']},
	'z_juckreiz': {'internal': "juckreiz", 'ui': "Juckreiz, dämlicher!", 'stats': ['MU', 'IN', 'CH']},
	'z_karnifilo': {'internal': "karnifilo", 'ui': "Karnifilo Raserei", 'stats': ['MU', 'IN', 'CH']},
	'z_katzenaugen': {'internal': "katzenaugen", 'ui': "Katzenaugen", 'stats': ['KL', 'FF', 'KO']},
	'z_klarumpurum': {'internal': "klarum", 'ui': "Klarum Purum", 'stats': ['KL', 'KL', 'CH']},
	'z_klickeradomms': {'internal': "klickeradomms", 'ui': "Klickeradomms", 'stats': ['KL', 'FF', 'KK']},
	'z_koboldgeschenk': {'internal': "koboldgeschenk", 'ui': "Koboldgeschenk", 'stats': ['IN', 'CH', 'FF']},
	'z_koboldovision': {'internal': "koboldovision", 'ui': "Koboldovision", 'stats': ['MU', 'CH', 'CH']},
	'z_koerperlosereise': {'internal': "koerperlose", 'ui': "Körperlose Reise", 'stats': ['MU', 'KL', 'IN']},
	'z_kommkoboldkomm': {'internal': "komm", 'ui': "Komm Kobold komm", 'stats': ['IN', 'IN', 'CH']},
	'z_krabbelnderschrecken': {'internal': "krabbelnder", 'ui': "Krabbelnder Schrecken", 'stats': ['MU', 'MU', 'CH']},
	'z_kraehenruf': {'internal': "krahenruf", 'ui': "Krähenruf", 'stats': ['MU', 'CH', 'CH']},
	'z_kraftdeserzes': {'internal': "kraft", 'ui': "Kraft des Erzes", 'stats': ['KL', 'KO', 'KK']},
	'z_kraftdeshumus': {'internal': "kraft_humus", 'ui': "Kraft des Humus", 'stats': ['IN', 'CH', 'KO']},
	'z_kroetensprung': {'internal': "krotensprung", 'ui': "Krötensprung", 'stats': ['IN', 'GE', 'KK']},
	'z_kulminatio': {'internal': "kulminatio", 'ui': "Kulminatio Kugelblitz", 'stats': ['MU', 'IN', 'FF']},
	'z_kusch': {'internal': "kusch", 'ui': "Kusch!", 'stats': ['MU', 'IN', 'CH']},
	'z_lachdichgesund': {'internal': "lach", 'ui': "Lach dich gesund", 'stats': ['IN', 'CH', 'CH']},
	'z_lachkrampf': {'internal': "lachkrampf", 'ui': "Lachkrampf", 'stats': ['CH', 'CH', 'FF']},
	'z_langerlulatsch': {'internal': "langer", 'ui': "Langer Lulatsch", 'stats': ['CH', 'GE', 'KK']},
	'z_lastdesalters': {'internal': "last", 'ui': "Last des Alters", 'stats': ['IN', 'CH', 'KO']},
	'z_dz_leibaustausendfliegen': {'internal': "Leib_aus_tausend_Fliegen", 'ui': "Leib aus tausend Fliegen", 'stats': ['IN', 'CH', 'KO']},
	'z_leibdererde': {'internal': "leibdererde", 'ui': "Leib der Erde", 'stats': ['MU', 'IN', 'GE']},
	'z_leibderwogen': {'internal': "leibderwogen", 'ui': "Leib der Wogen", 'stats': ['MU', 'KL', 'GE']},
	'z_leibdeseises': {'internal': "leibdeseises", 'ui': "Leib des Eises", 'stats': ['MU', 'KL', 'GE']},
	'z_leibdeserzes': {'internal': "leibdeserzes", 'ui': "Leib des Erzes", 'stats': ['MU', 'GE', 'KK']},
	'z_leibdesfeuers': {'internal': "leibdesfeuers", 'ui': "Leib des Feuers", 'stats': ['MU', 'MU', 'GE']},
	'z_leibdeswindes': {'internal': "leibdeswindes", 'ui': "Leib des Windes", 'stats': ['MU', 'GE', 'KK']},
	'z_leidensbund': {'internal': "leidensbund", 'ui': "Leidensbund", 'stats': ['MU', 'IN', 'KO']},
	'z_levthansfeuer': {'internal': "levthans", 'ui': "Levthans Feuer", 'stats': ['IN', 'CH', 'CH']},
	'z_limbusversiegeln': {'internal': "limbus", 'ui': "Limbus versiegeln", 'stats': ['KL', 'IN', 'KO']},
	'z_lockruf': {'internal': "lockruf", 'ui': "Lockruf und Feenfüße", 'stats': ['IN', 'CH', 'FF']},
	'z_lungedesleviatan': {'internal': "lunge", 'ui': "Lunge des Leviatan", 'stats': ['IN', 'CH', 'KO']},
	'z_madasspiegel': {'internal': "madas", 'ui': "Madas Spiegel", 'stats': ['MU', 'KL', 'IN']},
	'z_magischerraub': {'internal': "magischer", 'ui': "Magischer Raub", 'stats': ['MU', 'KL', 'KO']},
	'z_mahlstrom': {'internal': "mahlstrom", 'ui': "Mahlstrom", 'stats': ['MU', 'IN', 'KK']},
	'z_malmkreis': {'internal': "malmkreis", 'ui': "Malmkreis", 'stats': ['MU', 'IN', 'KK']},
	'z_manifesto': {'internal': "manifesto", 'ui': "Manifesto Element", 'stats': ['KL', 'IN', 'CH']},
	'z_meisterderelemente': {'internal': "meisterderelemente", 'ui': "Meister der Elemente", 'stats': ['MU', 'KL', 'CH']},
	'z_meisterminderergeister': {'internal': "meisterminderergeister", 'ui': "Meister minderer Geister", 'stats': ['MU', 'CH', 'CH']},
	'z_memorabia': {'internal': "memorabia", 'ui': "Memorabia Falsifir", 'stats': ['KL', 'IN', 'CH']},
	'z_memorans': {'internal': "memorans", 'ui': "Memorans Gedächtniskraft", 'stats': ['KL', 'KL', 'IN']},
	'z_menetekel': {'internal': "menetekel", 'ui': "Menetekel Flammenschrift", 'stats': ['KL', 'CH', 'FF']},
	'z_metamagieneutralisieren': {'internal': "metamagie", 'ui': "Metamagie neutralisieren", 'stats': ['KL', 'KL', 'KO']},
	'z_metamorphofelsenform': {'internal': "metamorpho_felsenform", 'ui': "Metamorpho Felsenform", 'stats': ['KL', 'FF', 'KK']},
	'z_metamorphogletscherform': {'internal': "metamorpho", 'ui': "Metamorpho Gletscherform", 'stats': ['KL', 'FF', 'KK']},
	'z_motoricus': {'internal': "motoricus", 'ui': "Motoricus Geisterhand", 'stats': ['KL', 'FF', 'KK']},
	'z_movimento': {'internal': "movimento", 'ui': "Movimento Dauerlauf", 'stats': ['IN', 'GE', 'KO']},
	'z_murksundpatz': {'internal': "murks", 'ui': "Murks und Patz", 'stats': ['IN', 'IN', 'FF']},
	'z_nackedei': {'internal': "nackedei", 'ui': "Nackedei", 'stats': ['KL', 'IN', 'FF']},
	'z_nebelleib': {'internal': "nebelleib", 'ui': "Nebelleib", 'stats': ['MU', 'IN', 'KO']},
	'z_nebelwand': {'internal': "nebelwand", 'ui': "Nebelwand und Morgendunst", 'stats': ['KL', 'FF', 'KO']},
	'z_nekropathia': {'internal': "nekropathia", 'ui': "Nekropathia Seelenreise", 'stats': ['MU', 'KL', 'CH']},
	'z_nihilogravo': {'internal': "nihilogravo", 'ui': "Nihilogravo Schwerelos", 'stats': ['KL', 'KO', 'KK']},
	'z_nuntiovolo': {'internal': "nuntiovolo", 'ui': "Nuntiovolo Botenvogel", 'stats': ['MU', 'KL', 'CH']},
	'z_objectofixo': {'internal': "objectofixo", 'ui': "Objectofixo", 'stats': ['KL', 'KL', 'KK']},
	'z_objectoobscuro': {'internal': "objecto", 'ui': "Objecto obscuro", 'stats': ['KL', 'FF', 'KO']},
	'z_objectovoco': {'internal': "objectovoco", 'ui': "Objectovoco", 'stats': ['KL', 'IN', 'CH']},
	'z_objektentzaubern': {'internal': "objekt", 'ui': "Objekt entzaubern", 'stats': ['KL', 'IN', 'FF']},
	'z_oculus': {'internal': "oculus", 'ui': "Oculus Astralis", 'stats': ['KL', 'IN', 'CH']},
	'z_odem': {'internal': "odem", 'ui': "Odem Arcanum", 'stats': ['KL', 'IN', 'IN']},
	'z_orcanofaxius': {'internal': "orcanofaxius", 'ui': "Orcanofaxius", 'stats': ['KL', 'FF', 'KO']},
	'z_orcanosphaero': {'internal': "orcanosphaero", 'ui': "Orcanosphaero", 'stats': ['MU', 'IN', 'KO']},
	'z_pandaemonium': {'internal': "pandaemonium", 'ui': "Pandaemonium", 'stats': ['MU', 'MU', 'CH']},
	'z_panik': {'internal': "panik", 'ui': "Panik überkomme euch!", 'stats': ['MU', 'CH', 'CH']},
	'z_papperlapapp': {'internal': "papperlapapp", 'ui': "Papperlapapp", 'stats': ['IN', 'IN', 'FF']},
	'z_paralysis': {'internal': "paralys", 'ui': "Paralysis starr wie Stein", 'stats': ['IN', 'CH', 'KK']},
	'z_pectetondo': {'internal': "pectetondo", 'ui': "Pectetondo Zauberhaar", 'stats': ['KL', 'CH', 'FF']},
	'z_penetrizzel': {'internal': "penetrizzel", 'ui': "Penetrizzel Tiefenblick", 'stats': ['KL', 'KL', 'KO']},
	'z_pentagramma': {'internal': "pentagramma", 'ui': "Pentagramma Sphärenbann", 'stats': ['MU', 'MU', 'CH']},
	'z_pestilenzerspueren': {'internal': "pestilenz", 'ui': "Pestilenz erspüren", 'stats': ['KL', 'IN', 'CH']},
	'z_pfeilderluft': {'internal': "pfeilderluft", 'ui': "Pfeil der Luft", 'stats': ['KL', 'IN', 'CH']},
	'z_pfeildeseises': {'internal': "pfeildeseises", 'ui': "Pfeil des Eises", 'stats': ['KL', 'IN', 'CH']},
	'z_pfeildeserzes': {'internal': "pfeildeserzes", 'ui': "Pfeil des Erzes", 'stats': ['KL', 'IN', 'CH']},
	'z_pfeildesfeuers': {'internal': "pfeildesfeuers", 'ui': "Pfeil des Feuers", 'stats': ['KL', 'IN', 'CH']},
	'z_pfeildeshumus': {'internal': "pfeildeshumus", 'ui': "Pfeil des Humus", 'stats': ['KL', 'IN', 'CH']},
	'z_pfeildeswassers': {'internal': "pfeildeswassers", 'ui': "Pfeil des Wassers", 'stats': ['KL', 'IN', 'CH']},
	'z_planastrale': {'internal': "planastrale", 'ui': "Planastrale Anderwelt", 'stats': ['MU', 'MU', 'KO']},
	'z_plumbumbarum': {'internal': "plumbumbarum", 'ui': "Plumbumbarum schwerer Arm", 'stats': ['CH', 'GE', 'KK']},
	'z_projektimago': {'internal': "projektimago", 'ui': "Projektimago Ebenbild", 'stats': ['MU', 'IN', 'CH']},
	'z_protectionis': {'internal': "protectionis", 'ui': "Protectionis Kontrabann", 'stats': ['KL', 'CH', 'KO']},
	'z_psychostabilis': {'internal': "psychostabilis", 'ui': "Psychostabilis", 'stats': ['MU', 'KL', 'KO']},
	'z_radau': {'internal': "radau", 'ui': "Radau", 'stats': ['MU', 'CH', 'KO']},
	'z_reflectimago': {'internal': "reflectimago", 'ui': "Reflectimago Spiegelschein", 'stats': ['KL', 'CH', 'FF']},
	'z_reptilea': {'internal': "reptilea", 'ui': "Reptilea Natternnest", 'stats': ['MU', 'IN', 'CH']},
	'z_respondami': {'internal': "respondami", 'ui': "Respondami Wahrheitszwang", 'stats': ['MU', 'IN', 'CH']},
	'z_reversalis': {'internal': "reversalis", 'ui': "Reversalis Revidum", 'stats': ['KL', 'IN', 'CH']},
	'z_ruhekoerper': {'internal': "ruhe", 'ui': "Ruhe Körper, ruhe Geist", 'stats': ['KL', 'CH', 'KO']},
	'z_salander': {'internal': "salander", 'ui': "Salander Mutander", 'stats': ['KL', 'CH', 'KO']},
	'z_sanftmut': {'internal': "sanftmut", 'ui': "Sanftmut", 'stats': ['MU', 'CH', 'CH']},
	'z_sapefacta': {'internal': "sapefacta", 'ui': "Sapefacta Zauberschwamm", 'stats': ['KL', 'CH', 'FF']},
	'z_satuariasherrlichkeit': {'internal': "satuarias", 'ui': "Satuarias Herrlichkeit", 'stats': ['IN', 'CH', 'CH']},
	'z_schabernack': {'internal': "schabernack", 'ui': "Schabernack", 'stats': ['KL', 'IN', 'CH']},
	'z_schadenszauberbannen': {'internal': "schadenszauber", 'ui': "Schadenszauber bannen", 'stats': ['MU', 'IN', 'KO']},
	'z_schelmenkleister': {'internal': "schelmenkleister", 'ui': "Schelmenkleister", 'stats': ['IN', 'GE', 'FF']},
	'z_schelmenlaune': {'internal': "schelmenlaune", 'ui': "Schelmenlaune", 'stats': ['MU', 'IN', 'CH']},
	'z_schelmenmaske': {'internal': "schelmenmaske", 'ui': "Schelmenmaske", 'stats': ['IN', 'CH', 'GE']},
	'z_schelmenrausch': {'internal': "schelmenrausch", 'ui': "Schelmenrausch", 'stats': ['IN', 'CH', 'CH']},
	'z_dz_schlangenruf': {'internal': "schlangenruf", 'ui': "Schlangenruf", 'stats': ['MU', 'CH', 'CH']},
	'z_schleierderunwissenheit': {'internal': "schleier", 'ui': "Schleier der Unwissenheit", 'stats': ['KL', 'KL', 'FF']},
	'z_schwarzerschrecken': {'internal': "schwarzerschrecken", 'ui': "Schwarzer Schrecken", 'stats': ['MU', 'IN', 'CH']},
	'z_schwarzundrot': {'internal': "schwarzundrot", 'ui': "Schwarz und Rot", 'stats': ['MU', 'CH', 'KO']},
	'z_dz_seelenfeuerlichterloh': {'internal': "Seelenfeuer_Lichterloh", 'ui': "Seelenfeuer Lichterloh", 'stats': ['MU', 'MU', 'KO']},
	'z_seelentiererkennen': {'internal': "seelentier", 'ui': "Seelentier erkennen", 'stats': ['IN', 'IN', 'CH']},
	'z_seelenwanderung': {'internal': "seelenwanderung", 'ui': "Seelenwanderung", 'stats': ['MU', 'CH', 'KO']},
	'z_seidenweich': {'internal': "seidenweich", 'ui': "Seidenweich Schuppengleich", 'stats': ['IN', 'FF', 'FF']},
	'z_seidenzunge': {'internal': "seidenzunge", 'ui': "Seidenzunge Elfenwort", 'stats': ['KL', 'IN', 'CH']},
	'z_sensattacco': {'internal': "sensattacco", 'ui': "Sensattacco Meisterstreich", 'stats': ['MU', 'IN', 'GE']},
	'z_sensibar': {'internal': "sensibar", 'ui': "Sensibar Empathicus", 'stats': ['KL', 'IN', 'CH']},
	'z_serpentialis': {'internal': "serpentialis", 'ui': "Serpentialis Schlangenleib", 'stats': ['MU', 'CH', 'GE']},
	'z_silentium': {'internal': "silentium", 'ui': "Silentium Schweigekreis", 'stats': ['KL', 'IN', 'CH']},
	'z_sinesigil': {'internal': "sinesigil", 'ui': "Sinesigil Unerkannt", 'stats': ['KL', 'IN', 'FF']},
	'z_skelettarius': {'internal': "skelettarius", 'ui': "Skelettarius Totenherr", 'stats': ['MU', 'MU', 'CH']},
	'z_solidirid': {'internal': "solidirid", 'ui': "Solidirid Weg aus Licht", 'stats': ['IN', 'KO', 'KK']},
	'z_somnigravis': {'internal': "somnigravis", 'ui': "Somnigravis tiefer Schlaf", 'stats': ['KL', 'CH', 'CH']},
	'z_dz_sphaerovisioschreckensbild': {'internal': "Sphaerovisio_Schreckensbild", 'ui': "Sphärovisio Schreckensbild", 'stats': ['MU', 'KL', 'FF']},
	'z_spinnenlauf': {'internal': "spinnenlauf", 'ui': "Spinnenlauf", 'stats': ['IN', 'GE', 'KK']},
	'z_dz_spinnennetz': {'internal': "spinnennetz", 'ui': "Spinnennetz", 'stats': ['IN', 'FF', 'KO']},
	'z_dz_spinnenruf': {'internal': "spinnenruf", 'ui': "Spinnenruf", 'stats': ['MU', 'CH', 'CH']},
	'z_spurlos': {'internal': "spurlos", 'ui': "Spurlos Trittlos", 'stats': ['IN', 'GE', 'GE']},
	'z_standfest': {'internal': "standfest", 'ui': "Standfest Katzengleich", 'stats': ['IN', 'GE', 'FF']},
	'z_staubwandle': {'internal': "staub", 'ui': "Staub wandle!", 'stats': ['MU', 'KL', 'CH']},
	'z_steinmauer': {'internal': "steinmauer", 'ui': "Steinmauer", 'stats': ['MU', 'KL', 'CH']},
	'z_steinwandle': {'internal': "stein", 'ui': "Stein wandle!", 'stats': ['MU', 'CH', 'KK']},
	'z_stillstand': {'internal': "stillstand", 'ui': "Stillstand", 'stats': ['MU', 'IN', 'GE']},
	'z_stimmendeswindes': {'internal': "stimmen_des_windes", 'ui': "Stimmen des Windes", 'stats': ['MU', 'IN', 'IN']},
	'z_sumpfstrudel': {'internal': "sumpfstrudel", 'ui': "Sumpfstrudel", 'stats': ['MU', 'IN', 'KK']},
	'z_sumuselixiere': {'internal': "sumus", 'ui': "Sumus Elixiere", 'stats': ['IN', 'CH', 'FF']},
	'z_dz_tanzdererloesung': {'internal': "Tanz_der_Erloesung", 'ui': "Tanz der Erlösung", 'stats': ['MU', 'CH', 'CH']},
	'z_tauschrausch': {'internal': "tauschrausch", 'ui': "Tauschrausch", 'stats': ['IN', 'FF', 'KO']},
	'z_tempusstasis': {'internal': "tempus", 'ui': "Tempus Stasis", 'stats': ['MU', 'KL', 'KK']},
	'z_dz_thargunitothbann': {'internal': "Thargunitothbann", 'ui': "Thargunitothbann", 'stats': ['MU', 'CH', 'KO']},
	'z_tierebesprechen': {'internal': "tiere", 'ui': "Tiere besprechen", 'stats': ['MU', 'IN', 'CH']},
	'z_tiergedanken': {'internal': "tiergedanken", 'ui': "Tiergedanken", 'stats': ['MU', 'IN', 'CH']},
	'z_dz_tierruf': {'internal': "tierruf", 'ui': "Tierruf", 'stats': ['MU', 'CH', 'CH']},
	'z_tlalucsodem': {'internal': "tlalucs", 'ui': "Tlalucs Odem Pestgestank", 'stats': ['MU', 'IN', 'GE']},
	'z_toteshandle': {'internal': "totes", 'ui': "Totes handle!", 'stats': ['MU', 'CH', 'KO']},
	'z_transformatio': {'internal': "transformatio", 'ui': "Transformatio Formgestalt", 'stats': ['KL', 'FF', 'KK']},
	'z_transmutare': {'internal': "transmutare", 'ui': "Transmutare Körperform", 'stats': ['CH', 'GE', 'KO']},
	'z_transversalis': {'internal': "transversalis", 'ui': "Transversalis Teleport", 'stats': ['KL', 'IN', 'KO']},
	'z_traumgestalt': {'internal': "traumgestalt", 'ui': "Traumgestalt", 'stats': ['IN', 'CH', 'CH']},
	'z_umbraporta': {'internal': "umbraporta", 'ui': "Umbraporta Schattentür", 'stats': ['MU', 'IN', 'GE']},
	'z_unberuehrt': {'internal': "unberuhrt", 'ui': "Unberührt von Satinav", 'stats': ['KL', 'FF', 'KO']},
	'z_unitatio': {'internal': "unitatio", 'ui': "Unitatio Geistesbund", 'stats': ['IN', 'CH', 'KO']},
	'z_dz_unsichtbareglut': {'internal': "Unsichtbare_Glut", 'ui': "Unsichtbare Glut", 'stats': ['KL', 'IN', 'FF']},
	'z_unsichtbarerjaeger': {'internal': "unsichtbarer", 'ui': "Unsichtbarer Jäger", 'stats': ['IN', 'FF', 'GE']},
	'z_dz_valetudolebenskraft': {'internal': "Valetudo_Lebenskraft", 'ui': "Valetudo Lebenskraft", 'stats': ['IN', 'GE', 'KO']},
	'z_veraenderungaufheben': {'internal': "veranderung", 'ui': "Veränderung aufheben", 'stats': ['KL', 'IN', 'KO']},
	'z_verschwindibus': {'internal': "verschwindibus", 'ui': "Verschwindibus", 'stats': ['IN', 'CH', 'GE']},
	'z_verstaendigungstoeren': {'internal': "verstandigung", 'ui': "Verständigung stören", 'stats': ['KL', 'KL', 'IN']},
	'z_verwandlungbeenden': {'internal': "verwandlung", 'ui': "Verwandlung beenden", 'stats': ['KL', 'CH', 'FF']},
	'z_vipernblick': {'internal': "vipernblick", 'ui': "Vipernblick", 'stats': ['MU', 'MU', 'CH']},
	'z_visibili': {'internal': "visibili", 'ui': "Visibili Vanitar", 'stats': ['KL', 'IN', 'GE']},
	'z_vocolimbo': {'internal': "vocolimbo", 'ui': "Vocolimbo hohler Klang", 'stats': ['KL', 'CH', 'FF']},
	'z_vogelzwitschern': {'internal': "vogelzwitschern", 'ui': "Vogelzwitschern Glockenspiel", 'stats': ['MU', 'IN', 'GE']},
	'z_wandausdornen': {'internal': "wandausdornen", 'ui': "Wand aus Dornen", 'stats': ['MU', 'KL', 'CH']},
	'z_wandausflammen': {'internal': "wand_aus_flammen", 'ui': "Wand aus Flammen", 'stats': ['MU', 'KL', 'CH']},
	'z_warmesblut': {'internal': "warmes", 'ui': "Warmes Blut", 'stats': ['MU', 'IN', 'IN']},
	'z_warmesgefriere': {'internal': "warmes_gefriere", 'ui': "Warmes gefriere", 'stats': ['MU', 'KL', 'KK']},
	'z_wasseratem': {'internal': "wasseratem", 'ui': "Wasseratem", 'stats': ['MU', 'KL', 'KO']},
	'z_wasserwall': {'internal': "wasserwall", 'ui': "Wasserwall", 'stats': ['MU', 'KL', 'CH']},
	'z_weicheserstarre': {'internal': "weiches", 'ui': "Weiches erstarre!", 'stats': ['MU', 'KL', 'KK']},
	'z_weihrauchwolke': {'internal': "weihrauchwolke", 'ui': "Weihrauchwolke Wohlgeruch", 'stats': ['IN', 'CH', 'FF']},
	'z_weisheitderbaeume': {'internal': "weisheit", 'ui': "Weisheit der Bäume", 'stats': ['MU', 'IN', 'KO']},
	'z_dz_weisheitdersteine': {'internal': "Weisheit_der_Steine", 'ui': "Weisheit der Steine", 'stats': ['MU', 'IN', 'KO']},
	'z_weissemaehn': {'internal': "weisse", 'ui': "Weiße Mähn' und Gold'ner Huf", 'stats': ['KL', 'IN', 'CH']},
	'z_wellenlauf': {'internal': "wellenlauf", 'ui': "Wellenlauf", 'stats': ['MU', 'GE', 'GE']},
	'z_wettermeisterschaft': {'internal': "wettermeisterschaft", 'ui': "Wettermeisterschaft", 'stats': ['MU', 'CH', 'GE']},
	'z_widerwille': {'internal': "widerwille", 'ui': "Widerwille Ungemach", 'stats': ['MU', 'IN', 'GE']},
	'z_windbarriere': {'internal': "windbarriere", 'ui': "Windbarriere", 'stats': ['MU', 'KL', 'CH']},
	'z_windgefluester': {'internal': "windgefluester", 'ui': "Windgeflüster", 'stats': ['KL', 'IN', 'IN']},
	'z_windhose': {'internal': "windhose", 'ui': "Windhose", 'stats': ['MU', 'IN', 'KK']},
	'z_windstille': {'internal': "windstille", 'ui': "Windstille", 'stats': ['KL', 'CH', 'KK']},
	'z_wipfellauf': {'internal': "wipfellauf", 'ui': "Wipfellauf", 'stats': ['MU', 'IN', 'GE']},
	'z_xenographus': {'internal': "xenographus", 'ui': "Xenographus Schriftenkunde", 'stats': ['KL', 'KL', 'IN']},
	'z_zagibu': {'internal': "zagibu", 'ui': "Zagibu Ubigaz", 'stats': ['IN', 'CH', 'FF']},
	'z_zappenduster': {'internal': "zappenduster", 'ui': "Zappenduster", 'stats': ['IN', 'IN', 'FF']},
	'z_zauberklinge': {'internal': "zauberklinge", 'ui': "Zauberklinge Geisterspeer", 'stats': ['KL', 'FF', 'KO']},
	'z_zaubernahrung': {'internal': "zaubernahrung", 'ui': "Zaubernahrung Hungerbann", 'stats': ['MU', 'MU', 'KO']},
	'z_zauberwesen': {'internal': "zauberwesen", 'ui': "Zauberwesen der Natur", 'stats': ['MU', 'IN', 'CH']},
	'z_zauberzwang': {'internal': "zauberzwang", 'ui': "Zauberzwang", 'stats': ['MU', 'CH', 'CH']},
	'z_zornderelemente': {'internal': "zorn", 'ui': "Zorn der Elemente", 'stats': ['MU', 'CH', 'KO']},
	'z_zungelaehmen': {'internal': "zunge", 'ui': "Zunge lähmen", 'stats': ['MU', 'CH', 'FF']},
	'z_zwingtanz': {'internal': "zwingtanz", 'ui': "Zwingtanz", 'stats': ['MU', 'KL', 'CH']}
};
/*
	Myranor-only
	Map sources to spheres
 */
const sourcesSpheresData = {
	'Abgrund': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Aggari': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Aggression': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Avastada': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Begierde': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Carafai': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Darcalya': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Dya\'Khol': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Eis': { "internal": 'Elemente', "ui": 'Sphäre der Elemente' },
	'Endgültigkeit': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Erfolg': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Erkenntnis': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Erz': { "internal": 'Elemente', "ui": 'Sphäre der Elemente' },
	'Eskates': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Feenwesen': { "internal": 'Natur', "ui": 'Sphäre der Natur' },
	'Feuer': { "internal": 'Elemente', "ui": 'Sphäre der Elemente' },
	'Freiheit': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Galkuzul': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Ghorgumor': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Harmonie': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Humus': { "internal": 'Elemente', "ui": 'Sphäre der Elemente' },
	'Iryabaar': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Khalyanar': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Kraft': { "internal": 'Elemente', "ui": 'Sphäre der Elemente' },
	'Kreativität': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Luft': { "internal": 'Elemente', "ui": 'Sphäre der Elemente' },
	'Mishkarya': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Naggarach': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Thesephai': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Tiergeister': { "internal": 'Natur', "ui": 'Sphäre der Natur' },
	'Totenwesen': { "internal": 'Tod', "ui": 'Sphäre des Todes' },
	'Tyakaar': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Wahnsinn': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Wasser': { "internal": 'Elemente', "ui": 'Sphäre der Elemente' },
	'Xolovar': { "internal": 'Dämonen', "ui": 'Sphäre der Dämonen' },
	'Zauberei': { "internal": 'Stellare', "ui": 'Sphäre der Stellare' },
	'Zeit': { "internal": 'Zeit', "ui": 'Sphäre der Zeit' }
};

/*
	Myranor-only
	Map spheres to stats required for checks
*/
const spheresStatsData = {
	'Zeit': [ 'MU', 'KL', 'IN' ],
	'Elemente': [ 'MU', 'KL', 'CH' ],
	'Natur': [ 'MU', 'KL', 'IN' ],
	'Tod': [ 'MU', 'MU', 'CH' ],
	'Stellare': [ 'KL', 'IN', 'CH' ],
	'Dämonen': [ 'MU', 'MU', 'CH' ]
}

/*
	Constants for effective encumbrance for talent/spell checks
*/
const effectiveEncumbrance = {
	"t_ko_akrobatik":           { "value":  2, "type": "factor" },
	"t_ko_athletik":            { "value":  2, "type": "factor" },
	"t_ko_fliegen":             { "value":  1, "type": "factor" },
	"t_ko_freiesfliegen":       { "value":  2, "type": "factor" },
	"t_ko_gaukeleien":          { "value":  2, "type": "factor" },
	"t_ko_klettern":            { "value":  2, "type": "factor" },
	"t_ko_koerperbeherrschung": { "value":  2, "type": "factor" },
	"t_ko_reiten":              { "value": -2, "type": "summand" },
	"t_ko_schleichen":          { "value":  1, "type": "factor" },
	"t_ko_schwimmen":           { "value":  2, "type": "factor" },
	"t_ko_sichverstecken":      { "value": -2, "type": "summand" },
	"t_ko_singen":              { "value": -3, "type": "summand" },
	"t_ko_skifahren":           { "value": -2, "type": "summand" },
	"t_ko_stimmenimitieren":    { "value": -4, "type": "summand" },
	"t_ko_tanzen":              { "value":  2, "type": "factor" },
	"t_ko_taschendiebstahl":    { "value":  2, "type": "factor" }
};

/*
Erläuterungen zu "meleeData"
* pro Nahkampfmanöver (im weitesten Sinne) ein Eintrag
* Einträge bestehen aus
** ui: Anzeigename
** typ: Attacke, Parade, Ausweichen, Schildattacke, Schildparade, Parierwaffenattacke, Parierwaffenparade und "Parade und Parierwaffenparade"
** template: zu verwendendes Roll Template (Verwendung eines Standard-Roll-Templates bei fehlender Angabe)
** rollCount: Anzahl maximal benötigter Rolls (1 bis 3)
** mod: Modifikatoren (in der Regel ein Attribut)
** ansagen
*** manoever: beim Manöver standardmäßig angegebene Ansage(n) in einer Form, die in Würfelmakros genutzt werden kann
**** fest: feste Vorgabewerte
**** variabel: Berechnung für variable Werte
*** wahl: freiwillige Ansage möglich (true/false)
** attributes: zur Durchführung (NICHT Voraussetzungen!) zusätzlich benötigte Attribute
*/
const meleeData = {
	'k_attacke_parierwaffe': {
		'ui': 'Nahkampfangriff (Parierwaffe)',
		'typ': 'at-parierwaffe',
		'template': 'combat-at',
		'rollCount': 1,
		'mod': '@{k_mod_left_hand}',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': [
			'sf_linkhand',
			'sf_beidhandigerkampfI',
			'sf_beidhandigerkampfII',
			'vorteil_beidhaendig'
		]
		/*
		TODO: Kampftechnik für Parierwaffen/Schilde festlegen (Schilde auf "Raufen" fixieren)
		TODO: AT-Wert für Parierwaffe berechnen
		*/
	},
	'k_attacke_schild': {
		'ui': 'Raufen (Schildattacke)',
		'typ': 'at-schild',
		'template': 'combat-at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': '@{shield_at_mod}',
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': []
	},
	'k_attacke_waffe': {
		'ui': 'Nahkampfangriff',
		'typ': 'at',
		'template': 'combat-at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': []
	},
	'k_ausfall': {
		'ui': 'Ausfall',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': [
			'BE',
			'KO',
			'sf_finte',
			'sf_gezielter_stich',
			'sf_hammerschlag',
			'sf_niederwerfen',
			'sf_todesstoss',
			'sf_wuchtschlag'
		]
		// TODO: Attribut, das angibt, ob aktuell ein Schild getragen wird (aktuell nur Attribut, das angibt, ob Schild oder Parierwaffe getragen werden)
		/* pro KR zwei Attacken + 2 FA Schritt
		max. eBE 4
		INI höher als Gegner
		+2 bei Schildnutzung
		Wuchtschlag, Finte je bis +4 erlaubt
		Beenden mit Niederwerfen, Hammerschlag, Gezielter Stich, Todesstoß
		Anzahl Hiebe = KO/2
		Ende bei
			a: AT fail
			b: PA = gezieltes Ausweichen + DK +2 succ
			c: PA glücklich
			d: KO/2-Grenze erreicht
			e: Zurückdrängung des Verteidigers unmöglich
			f: Verteidiger bleibt einfach stehen (MU +4 +#Treffer während Ausfall)
			g: freiwilliger Abbruch
		Fall a - d: Angreifer - 1W6 INI, Verteidiger Passierschlag
		Fall e - g: Ausfall endet mit abschließender AT, PA um 4 erschwert
		*/
	},
	'k_ausweichen_gezielt': {
		'ui': 'Ausweichen (gezielt)',
		'typ': 'pa-ausweichen',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': [
			'BE',
			'sf_ausweichenI',
			'sf_ausweichenII',
			'sf_ausweicheniII',
			'k_ausweichen_akrobatikbonus'
			]
		// +DK, +#Gegner, +BE, -Ausweichen 1-3, -Akrobatikbonus, ggf. INI-Verlust
	},
	'k_ausweichen_ungezielt': {
		'ui': 'Ausweichen (ungezielt)',
		'typ': 'pa-ausweichen',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': [
			'BE',
			'sf_ausweichenI',
			'sf_ausweichenII',
			'sf_ausweicheniII',
			'k_ausweichen_akrobatikbonus'
			]
		// +DK, +#Gegner, +BE, -Ausweichen 1-3, -Akrobatikbonus, INI-Verlust
	},
	'k_befreiungsschlag': {
		'ui': 'Befreiungsschlag',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': '?{Anzahl zu treffender Gegner|1,4|2,8|3,12}'
			},
			'wahl': true
		},
		'attributes': []
		// +4 pro Gegner, bis zu drei Gegner
		// freiwillige Ansage für Wuchtschlag und/oder Finte nutzbar
		// TP für jeden Gegner einzeln
		// Treffer: -1W6 INI, immer auch Niederwerfen, DK +1 (falls nicht möglich TP + 1W6)
	},
	'k_betaeubungsschlag': {
		'ui': 'Betäubungsschlag',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': [
			'sf_finte',
			'sf_wuchtschlag'
		]
		// +2/+4/+8
		// freiwillige Ansage für Wuchtschlag und/oder Finte nutzbar
		// Erschwernis in komplizierter Weise waffenabhängig
		// erzeugt TP(A)
		// SP(A) > Wundschwelle: KO-Probe. Fail: 1W6 SR bewusstlos
		// SP(A) > 2. Wundschwelle: 1W6 SR bewusstlos
	},
	'k_binden_hauptwaffe': {
		'ui': 'Binden (Hauptwaffe)',
		'typ': 'pa',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel':
					'?{' +
						'Ansage der abgewehrten Attacke größer als 4?|' +
						'ja,' +
							nestRollMacro('?{Ansage der abgewehrten Attacke|5}|', 1) +
						'nein,4' +
					'}'
			},
			'wahl': true
		},
		'attributes': [ 'sf_meisterparade' ]
		/*
		abgewehrte AT Ansage > 4? Ansage entsprechend höher (Finte +5 wirkt doppelt, sodass insgesamt +10)
		Hauptwaffe: Wenn Meisterparade verfügbar, dann freiwillige Ansage zusätzlich möglich
			zusätzliche Ansage erleichtert nächste AT und gegnerische Reaktion
		*/
	},
	'k_binden_parierwaffe': {
		'ui': 'Binden (Parierwaffe)',
		'typ': 'pa-parierwaffe',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel':
					'?{' +
						'Ansage der abgewehrten Attacke größer als 4?|' +
						'ja,' +
							nestRollMacro('?{Ansage der abgewehrten Attacke|5}|', 1) +
						'nein,4' +
					'}'
			},
			'wahl': false
		},
		'attributes': []
		/*
		abgewehrte AT Ansage > 4? Ansage entsprechend höher (Finte +5 wirkt doppelt, sodass insgesamt +10)
		Parierwaffe: Erschwernis konstant (4)
		*/
	},
	'k_binden_hauptwaffe_und_parierwaffe': {
		'ui': 'Binden (Haupt- und Parierwaffe)',
		'typ': 'pa+pa-parierwaffe',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel':
					'?{' +
						'Ansage der abgewehrten Attacke größer als 4?|' +
						'ja,' +
							nestRollMacro('?{Ansage der abgewehrten Attacke|5}|', 1) +
						'nein,4' +
					'}'
			},
			'wahl': true
		},
		'attributes': [ 'sf_meisterparade' ]
		/*
		zusätzlich zu Waffen auch mit Parierwaffen (Parierwaffen I oder Meisterparade nötig)
		abgewehrte AT Ansage > 4? Ansage entsprechend höher (Finte +5 wirkt doppelt, sodass insgesamt +10)
		Binden mit beiden Waffen gemeinsam und Meisterparade und Parierwaffen I verfügbar
			Standarderschwernis UND freiwillige Zusatzansage erleichtern nächste eigene Attacke und erschweren darauf folgende Reaktion des Gegners um Gesamtansage
		ultrakompliziert
		*/
	},
	'k_doppelangriff': {
		'ui': 'Doppelangriff',
		'typ': 'at',
		'rollCount': 2,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 2,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': []
		// benötigt zwei Waffen, die in derselben DK ohne Abzüge verwendbar sind
		// zwei Attacken, jede um 2 erschwert
		// wenn Waffen nicht gleich: +4 für Waffe aus falscher Hand (Linkhand gilt, außer bei BHK2, da dieses überwiegt)
		// Nicht mit umgewandelter Abwehraktion, nicht in KR, in der Zusatzaktion aus BHK2 oder PW2 oder Tod von Links genutzt
		// ATs sind keine Manöver, einer Patzer = beide fail
		// zwei Paraden zur Abwehr nötig
	},
	'k_entwaffnen_attacke': {
		'ui': 'Entwaffnen (Attacke)',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': '@{k_entwaffnen_attacke_waffenmod}'	// TODO
			},
			'wahl': true
		},
		'attributes': [ 'sf_finte' ]
		/*
		freiwillige Ansage möglich, zählt als Finte und kann eingesetzt werden wie Finte oder zur Erschwerung der KK-Probe
		PA fail? KK+8, um Verlust der Waffe zu verhindern
		kein Schaden
		-2 bei Kampfstab, -4 bei Kettenstab oder Zweililien
		kein Schild erlaubt
		keine Entwaffnung zweihändig geführter Waffen (außer Anderthalbhänder ...)
		*/
	},
	'k_entwaffnen_parade_hauptwaffe': {
		'ui': 'Entwaffnen (Waffenparade)',
		'typ': 'pa',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': '@{k_entwaffnen_parade_hauptwaffe_waffenmod}'	// TODO
			},
			'wahl': true
		},
		'attributes': []
		/*
		freiwillige Ansage möglich zur Erschwerung der KK-Probe
		PA geschafft: KK+8, um Verlust der Waffe zu verhindern
		kein Schild erlaubt
		keine Entwaffnung zweihändig geführter Waffen (außer Anderthalbhänder ...)
		*/
	},
	'k_entwaffnen_parade_parierwaffe': {
		'ui': 'Entwaffnen (Parierwaffenparade)',
		'typ': 'pa-parierwaffe',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': '@{k_entwaffnen_parade_parierwaffe_waffenmod}'	// TODO
			},
			'wahl': true
		},
		'attributes': []
		/*
		freiwillige Ansage möglich zur Erschwerung der KK-Probe
		PA geschafft: KK+8, um Verlust der Waffe zu verhindern
		möglich mit Bock, Hakendolch, Linkhand, entsprechende Drachenklaue (braucht PW1), -2
		kein Schild erlaubt
		keine Entwaffnung zweihändig geführter Waffen (außer Anderthalbhänder ...)
		*/
	},
	'k_festnageln': {
		'ui': 'Festnageln',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': []
		/*
		nur mit Dreizack, Efferdbart, Elfischer Jagdspieß, Jagdspieß, Korspieß, Partisane, Stoßspeer, Wurmspieß
		freiwillige Ansage möglich
		normaler Schaden (nicht durch Ansage erhöhter Waffenschaden)
		vergleichende GE-Probe mit Verteidiger
			Verteidiger erfolgreich: Befreiung, +1W6 SP
			Angreifer erfolgreich: vergleichende KK-Probe (Angreifer kann doppelte Punkte aus freiwilliger Ansage nutzen, um Probenergebnis zu beeinflussen)
				Verteidiger erfolgreich (auch unentschieden): Angreifer verliert Waffe, Verteidiger darf Passierschlag
				Angreifer erfolgreich:
					Opfer am Boden, wird festgehalten
					folgende KRs
						Waffenschaden (ohne TP/KK, ohne Ansagen)
						vergleichen KK-Probe (halten mehrere fest, dann pro Kämpfer -1), für Opfer +2 (Angreifer kann noch unbenutzte Punkte aus obigem Vorrat nutzen)
		mehrere nageln gleichzeitig ein stehendes Opfer fest: GE/KK-Proben für jeden Kämpfer, dessen AT gelungen ist -2; Vergleiche aber für jeden Kämpfer einzeln
		Opfer bereits am Boden: GE-Probe entfällt
		Opfer bereits am Boden und festgenagelt: keine GE/KK-Proben nötig, Festnageln aber ±0
		verbraucht alle Aktionen des Festhaltenden
		*/
	},
	'k_finte': {
		'ui': 'Finte',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': '@{k_finte_schildmod}'	//TODO
			},
			'wahl': true
		},
		'attributes': [
			'sf_finte',
			'sf_wuchtschlag'
		]
		// Ansage abhängig von AT/TaW -> Auswahl autogenerieren
		// nur bei BE =< 4
		// Schildkämpfer: +2, außer bei kleinen Schilden
		// mit Wuchtschlag kombinierbar
	},
	'k_gegenhalten': {
		'ui': 'Gegenhalten',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': []
		/*
		Parademanöver, wird aber auf AT-Wert gewürfelt
		AT von Gegner, AT von Verteidiger
			beide fail: normal weiter
			nur einer succ: normal weiter
			beide succ: welche AT besser (weiter unter AT-Wert)?
				INI-Differenz auf AT-Wert des Kämpfers mit höherer INI addieren
				AT-Wert des Verteidigers durch Ansage immer -4
				bessere AT macht vollen Schaden, schlechtere halben Schaden und keine (positive) TP/KK und Ansagen
		AT DK- konterbar, AT DK+ nicht (wie sonst auch o.O)
			bessere AT erreicht Ziel (kürzere DK und ggf. halben Schaden oder DK gleich und vollen Schaden)
		Nutzung "Auflaufen lassen":
			wenn Gegner anstürmt (Sturmangriff)
			wenn DK Verteidigerwaffe höher
				Angreifer-AT +6 aus DK
				Angreifer-AT schlechter: zusätzliche TP aus Sturmangriff (+4 +GS/2), Verteidiger nur Hälfte davon
		Nutzung "Lanzenreiter auflaufen lassen":
			Erschwernisse gleich, aber Lanzenreiten-AT meist höher
			Verteidigung mit P notwendig
			sehr kompliziert
		*/
	},
	'k_gezielter_stich': {
		'ui': 'Gezielter Stich',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel':
					'[[ ceil(?{' +
						'Rüstschutz des Ziels|0' +
					'} / 2 ) + (?{' +
						'Gegner führt Schild?|' +
						'ja,' +
							nestRollMacro('?{Paradewaffenmodifikator des Schildes|3', 1) +
						'nein,0' +
					'})]]'
			},
			'wahl': true
		},
		'attributes': []
		// Ansage: 4 + RS/2 + freiwillig
		// Schild? + PA-WM
		// freiwilige Ansage erschwert gegnerische PA
		// Treffer ignoriert Rüstung, auch natürliche; Wundschwelle um 2 gesenkt, zusätzliche Wunde
		// als Ansage zählt nur 4 + freiwillig
	},
	'k_hammerschlag': {
		'ui': 'Hammerschlag',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': [ 'sf_finte' ]
		// Ansage: 8 + freiwillig, verbraucht alle Aktionen der KR
		// frewillige Ansage erhöht Schaden (wie Wuchtschlag)
		// Kombination mit Finte möglich
		// Verteidiger: normale Parade, ab freiwillige Ansage 2+ Bruchtest bei Gelingen
		// Schaden: 3 * (TP + Bonusschaden), TP/KK aber nur einmal
		// nicht gegen sehr große Gegner
		// nicht gegen Gegner mit großem oder sehr großem Schild
		// AT Fail: Passierschlag erlaubt
	},
	'k_klingensturm': {
		'ui': 'Klingensturm',
		'typ': 'at',
		'rollCount': 3,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': [ 'sf_kampfgespur' ]
		// Angreifer ohne Schild, eBE max. 4, ideale DK
		// 2 AT: Halber AT-Wert + 2 (bei Kampfgespür: frei verteilbar, Minimum 6)
		// 3 AT, nur Klingentänzer: AT-Wert + 4 frei verteilbar, Minimum 6
		// nur in "echten" Angriffsaktionen (nicht umgewandelt, nicht aus zweiter Waffe)
	},
	'k_klingenwand_hauptwaffe': {
		'ui': 'Klingenwand (Hauptwaffe)',
		'typ': 'pa',
		'rollCount': 3,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': [ 'sf_kampfgespur' ]
		// Verteidiger ohne Schild
		// Ansage zu Beginn der KR (außer bei Klingentänzer)
		// einsetzbar gegen zwei Gegner oder Doppelangriff
		// ignoriert Überzahl
		// 2 PA: Halber PA-Wert + 2 (bei Kampfgespür: frei verteilbar, Minimum 6)
		// 3 AT, nur Klingentänzer: PA-Wert + 4 frei verteilbar, Minimum 6 (erst wählen, wenn AT gewürfelt!)
		// nur in "echten" Abwehraktionen (nicht umgewandelt, nicht aus zweiter Waffe/Schild)
	},
	'k_klingenwand_schild': {
		'ui': 'Klingenwand (Schild)',
		'typ': 'pa-schild',
		'rollCount': 3,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': [ 'sf_kampfgespur' ]
		// Verteidiger mit Schild
		// Ansage zu Beginn der KR (außer bei Klingentänzer)
		// einsetzbar gegen zwei Gegner oder Doppelangriff
		// ignoriert Überzahl
		// 2 PA: Halber PA-Wert + 2 (bei Kampfgespür: frei verteilbar, Minimum 6)
		// 3 AT, nur Klingentänzer: PA-Wert + 4 frei verteilbar, Minimum 6 (erst wählen, wenn AT gewürfelt!)
		// nur in "echten" Abwehraktionen (nicht umgewandelt, nicht aus zweiter Waffe/Schild)
	},
	'k_meisterliches_entwaffnen_attacke': {
		'ui': 'Meisterliches Entwaffnen (Attacke)',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': '@{k_entwaffnen_attacke_waffenmod}'	// TODO
			},
			'wahl': true
		},
		'attributes': [ 'sf_finte' ]
		/*
		freiwillige Ansage möglich, zählt als Finte und kann eingesetzt werden wie Finte oder zur Erschwerung der KK-Probe
		PA fail? KK+10, um Verlust der Waffe zu verhindern
		kein Schaden
		-2 bei Kampfstab, -4 bei Kettenstab oder Zweililien
		kein Schild erlaubt
		Entwaffnung zweihändig geführter Waffen, nicht mit Säbeln
		*/
	},
	'k_meisterliches_entwaffnen_parade_hauptwaffe': {
		'ui': 'Meisterliches Entwaffnen (Hauptwaffenparade)',
		'typ': 'pa',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': '@{k_entwaffnen_parade_waffenmod}'	// TODO
			},
			'wahl': true
		},
		'attributes': [ 'sf_finte' ]
		/*
		freiwillige Ansage möglich zur Erschwerung der KK-Probe
		PA geschafft: KK+10, um Verlust der Waffe zu verhindern
		kein Schild erlaubt
		Entwaffnung zweihändig geführter Waffen (nicht mit Säbeln; PW nur Bock und Hakendolch)
		*/
	},
	'k_meisterliches_entwaffnen_parade_parierwaffe': {
		'ui': 'Meisterliches Entwaffnen (Parierwaffenparade)',
		'typ': 'pa-parierwaffe',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': '@{k_entwaffnen_parade_waffenmod}'	// TODO
			},
			'wahl': true
		},
		'attributes': [ 'sf_finte' ]
		/*
		freiwillige Ansage möglich zur Erschwerung der KK-Probe
		PA geschafft: KK+10, um Verlust der Waffe zu verhindern
		möglich mit Bock, Hakendolch, Linkhand, entsprechende Drachenklaue (braucht PW1), -2
		kein Schild erlaubt
		Entwaffnung zweihändig geführter Waffen (nicht mit Säbeln; PW nur Bock und Hakendolch)
		*/
	},
	'k_meisterparade_hauptwaffe': {
		'ui': 'Meisterparade',
		'typ': 'pa',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': []
		/*
		Ansage: max. TaW, max. PA der Waffe
		eBE <= 4
		nicht mit Kettenwaffen und Zweihandflegeln; PA muss grundsätzlich erlaubt sein
		Schild: SK2 nötig
		*/
	},
	'k_meisterparade_schild': {
		'ui': 'Meisterparade',
		'typ': 'pa-schild',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': []
		/*
		Ansage: max. TaW, max. PA der Waffe
		eBE <= 4
		nicht mit Kettenwaffen und Zweihandflegeln; PA muss grundsätzlich erlaubt sein
		Schild: SK2 nötig
		*/
	},
	'k_niederwerfen_schild': {
		'ui': 'Niederwerfen (Schild)',
		'typ': 'at-schild',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': [ 'sf_wuchtschlag' ]
		/*
		Ansage: wie Wuchtschlag
		PA fail: KK + freiwillige Ansage + max(0, TP - KK des Verteidigers), erleichtert um -1/-2/-4 für Standfest/Balance/Herausragende Balance
			KK-Probe gelungen: -1W6 INI
			KK-Probe misslungen: -2W6 INI, ein Feld weggeschleudert, stürzt/am Boden liegend
		nur mit Sturmangriff kombinierbar, Meisterparadepunkte nutzbar
		*/
	},
	'k_niederwerfen_hauptwaffe': {
		'ui': 'Niederwerfen (Hauptwaffe)',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': [ 'sf_wuchtschlag' ]
		/*
		Ansage: wie Wuchtschlag
		nur mit Anderthalbhänder, Hiebwaffen, Infanteriewaffen, Kettenstäbe, Kettenwaffen, Säbel (Arbach, Haumesser, Khunchomer, Sklaventod), Schwerter, Stäbe, Zweihandflegel, Zweihand-Hiebwaffen, Zweihandschwerter/-säbel
		PA fail: KK + freiwillige Ansage + max(0, TP - KK des Verteidigers), erleichtert um -1/-2/-4 für Standfest/Balance/Herausragende Balance
			KK-Probe gelungen: -1W6 INI
			KK-Probe misslungen: -2W6 INI, ein Feld weggeschleudert, stürzt/am Boden liegend
		nur mit Sturmangriff kombinierbar, Meisterparadepunkte nutzbar
		*/
	},
	'k_parade_parierwaffe': {
		'ui': 'Parierwaffenparade',
		'typ': 'pa-parierwaffe',
		'template': 'combat-at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': []
	},
	'k_parade_schild': {
		'ui': 'Schildparade',
		'typ': 'pa-schild',
		'template': 'combat-at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': []
	},
	'k_parade_waffe': {
		'ui': 'Waffenparade',
		'typ': 'pa',
		'template': 'combat-at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': []
	},
	'k_passierschlag': {
		'ui': 'Passierschlag',
		'typ': 'at',
		'template': 'combat-at',
		'rollCount': 1,
		'mod':
			'4 + ' +
			'((-1) * (@{INI_mod_hauptwaffe})) + ' +
			'?{' +
				'Sonderfertigkeiten des Zieles|' +
				'keine Aufmerksamkeit und kein Kampfgespür,0|' +
				'Aufmerksamkeit&#44; aber kein Kampfgespür,4|' +
				'Aufmerksamkeit und Kampfgespür,6' +
			'}',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': []
		/*
		freie Aktion
		nicht mit Manövern kombinierbar
		Treffer: TP und 1W6 INI-Verlust
		*/
	},
	'k_schildspalter': {
		'ui': 'Schildspalter',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel':
					'-(?{' +
						'Paradewaffenmodifikator des gegnerischen Schildes|0' +
					'})'
			},
			'wahl': true
		},
		'attributes': [ 'sf_finte' ]
		/*
		Ansage - Schild-PA-WM + freiwillige Ansage
		freiwillige Ansage: PA erschweren (nur, wenn SF Finte vorhanden ._.) oder Bruchtest erschweren (Mischung erlauben)
		nur mit Hiebwaffen, Kettenwaffen, Zweihandflegeln, Zweihandhiebwaffen, Zweihandschwertern/-säbeln
		AT gelungen, PA gescheitert
			Bruchtest 2W6 - 4 - Ansage zur Erschwerung des Bruchtests
		Bruchtest bestanden: Schild zerstört, kein Schaden
		Bruchtest nicht bestanden: Schild-BF steigt um 1, kein Bruchtest für Angreifer außer bei Höchstergebnis
		*/
	},
	'k_stumpfer_schlag': {
		'ui': 'Stumpfer Schlag',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': '@{k_stumpfer_schlag_waffenmod}'	// TODO
			},
			'wahl': false
		},
		'attributes': []
		/*
		nur mit Anderthalbhänder, Hiebwaffen, Kettenstäbe, Raufen (Handgemengewaffe oder Waffenknauf, wenn SF Betäubungsschlag bekannt), Säbel, Schwerter, Stäbe
		Erschwernis kompliziert:
			+2 bei Kampfstab und Knüppel
			+4 bei Hiebwaffe mit flacher Seite
			+8 sonst
			halbiert mit Betäubungsschlag
		TP(A) statt TP
		kleiner SF-loser Bruder des Betäubungsschlags, daher keine Kombination mit Wuchtschlag möglich und gleiche Waffeneinschränkungen
		*/
	},
	'k_sturmangriff': {
		'ui': 'Sturmangriff',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 4,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': [ 'sf_niederwerfen', 'sf_wuchtschlag' ]
		/*
		Ansage: 4 + freiwillige Ansage
		freiwillige Ansage wie Wuchtschlag
		verbraucht auch PA der KR
		nur mit Anderthalbhänder, Hiebwaffen, Infanteriewaffen, Kettenstäbe, Kettenwaffen, Säbel, Schwerter, Speere, Stäbe, Zweihandflegel, Zweihand-Hiebwaffen, Zweihandschwerter/-säbel
		min. GS 4, min. 4 m Anlauf
		TP: normal + Wuchtschlag + 4 + halbe GS
		gelungener Sturmangriff in optimaler Angreifer-DK (vorher ansagen!)
		misslungen: Passierschlag, DK vom Verteidiger wählbar, nicht näher als optimale Angreifer-DK gewesen wäre
		mit Niederwerfen kombinierbar, s. o.
		*/
	},
	'k_todesstoss': {
		'ui': 'Todesstoß',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel':
					'?{' +
						'Rüstschutz des Zieles|0' +
					'} + ' +
					'?{' +
						'Ziel verwendet Schild?|' +
						'ja,' +
							nestRollMacro('?{Paradewaffenmodifikator des Schildes|3}', 1) +
						'|' +
						'nein,0' +
					'}'
			},
			'wahl': true
		},
		'attributes': [
			'sf_finte',
			'sf_wuchtschlag'
		]
		/*
		Ansage: 8 + halber Ziel-RS + Schild-PA-WM + freiwillige Ansage
		freiwillige Ansage: Finte und/oder Wuchtschlag (auch bei Waffen, die keinen Wuchtschlag zulassen!)
		verbraucht auch PA der KR
		AT unpariert
			TP ohne Rüstschutz (aber mit natürlichem Rüstschutz) berechnen
			Wundschwelle -2
			zwei automatische Wunden
		AT misslungen
			Passierschlag
		nur mit Dolchen, Fechtwaffen, Schwertern (nur mit SF Halbschwert), Speere
		nur bei Zielgröße kleiner als sehr groß
		*/
	},
	'k_tod_von_links': {
		'ui': 'Tod von Links',
		'typ': 'at-parierwaffe',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': [ 'sf_finte' ]
		/*
		nur mit Parierwaffe in linker Hand, 8 Initiativphasen nach Hauptwaffen-AT
		zusätzliche AT, daher immer nach Hauptwaffen-AT
		freiwillige Ansage: Finte
		max. eBE 4
		Ansage in Initiativphase der Hauptwaffe
		*/
	},
	'k_umreissen': {
		'ui': 'Umreißen',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': [ 'sf_finte' ]
		/*
		Ansage: 8 + freiwillige Ansage
		freiwillige Ansage: Finte
		nur mit Infanteriewaffen, Peitschen, Speere, Stäbe, Zweihandschwerter/-säbel (nur mit SF Halbschwert)
		nur bei zweihändigem Griff um Waffe (keine Schilde/Parierwaffen)
		AT gelungen
			kein Schaden, Gegner aus Gleichgewicht bringen
			PA via
				gezieltes Ausweichen
				Waffen-PA +8 (Peitsche nicht parierbar)
				Raufen-/Ringen-PA mit Beinarbeit
			PA misslungen
				GE + TP -2/4/8 für Standfest/Balance/Herausragende Balance
				bei Misslingen -2W6 INI, am Boden liegend
		*/
	},
	'k_waffe_zerbrechen': {
		'ui': 'Waffe zerbrechen',
		'typ': 'pa-parierwaffe',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 8,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': []
		/*
		Ansage: 8 + freiwillige Ansage
		freiwillige Ansage als Erschwernis auf KK-Probe?
		nur mit Hakendolch, speziell angefertigtem Linkhanddolch, speziell angefertigter Drachenklaue
		nur gegen Klingenwaffen einsetzbar
		PA gelungen
			Gegner fragen, ob er Waffe fallen lassen möchte
			KK-Probe
				längere Fechtwaffen (Degen, Florett, etc.): +4
				andere einhändige Klingenwaffen inkl. Dolche: +6
				zweihändig geführte Klingenwaffen: +10
				BF: -BF
		*/
	},
	'k_windmuehle': {
		'ui': 'Windmühle',
		'typ': 'pa',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': []
		/*
		Ansage: 8 oder mehr
		nur mit Anderthalbhänder, Hiebwaffen, Infanteriewaffen, Kettenstäbe, Kettenwaffen, Säbel, Schwerter, Stäbe, Zweihandflegel, Zweihandhiebwaffen, Zweihandschwert/-säbel
		verbraucht eine freie Aktion Schritt
		max. Schildgröße klein
		nur bei Angriff mit Wuchtschlag, Sturmangriff, Hammerschlag, Befreiungsschlag
			Konter mit angesagter Parade in Höhe der Gesamtansage des Gegners, min. 8
		PA gelungen
			Wuchtschlag mit Ansage der vollen eigenen Erschwernis
			Angreifer darf PA machen, erschwert um ursprüngliche Gesamtansage
		PA misslungen: übliche Folgen misslungener PA
		*/
	},
	'k_wuchtschlag_schild': {
		'ui': 'Wuchtschlag (Schild)',
		'typ': 'at-schild',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': true
		},
		'attributes': [ 'sf_wuchtschlag' ]
		/*
		freiwillige Ansage erhöht Schaden
		Ansage max. TaW der Waffe, max. AT der Waffe
		ohne SF halbe Ansage als Bonusschaden
		mit SF volle Ansage als Bonusschaden
		*/
	},
	'k_wuchtschlag_waffe': {
		'ui': 'Wuchtschlag (Hauptwaffe)',
		'typ': 'at',
		'rollCount': 1,
		'mod': '0',
		'ansagen': {
			'manoever': {
				'fest': 0,
				'variabel': 0
			},
			'wahl': false
		},
		'attributes': [ 'sf_wuchtschlag' ]
	}
};
/* constants end */
