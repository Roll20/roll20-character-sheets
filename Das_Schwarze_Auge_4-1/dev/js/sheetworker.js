function FKWgetType(typeRaw)
{
	var caller = "FKWgetType";
	var FKWtype = 0;
	switch(typeRaw)
	{
		case '@{AT_Armbrust}':
			FKWtype = 'Armbrust';
			break;
		case '@{AT_Blasrohr}':
			FKWtype = 'Blasrohr';
			break;
		case '@{AT_Bogen}':
			FKWtype = 'Bogen';
			break;
		case '@{AT_Schleuder}':
			FKWtype = 'Schleuder';
			break;
		case '@{AT_Wurfbeile}':
			FKWtype = 'Wurfbeile';
			break;
		case '@{AT_Wurfmesser}':
			FKWtype = 'Wurfmesser';
			break;
		case '@{AT_Wurfspeere}':
			FKWtype = 'Wurfspeere';
			break;
		case 0:
		case "0":
			debugLog(caller, 'Kein FKW-Typ gewählt.');
			FKWtype = -1;
			break;
		case '@{AT_Belagerungswaffen}':
			debugLog(caller, 'Gewählter FKW-Typ kennt keine Scharf- und Meisterschützen.');
			FKWtype = 'Belagerungswaffen';
			break;
		case '@{AT_Diskus}':
			debugLog(caller, 'Gewählter FKW-Typ kennt keine Scharf- und Meisterschützen.');
			FKWtype = 'Diskus';
			break;
		default:
			debugLog(caller, 'Ungültiger FKW-Typ: "', typeRaw, '"');
	}
	return FKWtype;
}

function getTargetZoneMod(targetZone, legs) {
	var caller = "getTargetZoneMod";
	var zoneMod = 0;
	switch(targetZone)
	{
		case "rumpf":
			zoneMod = "4"; break;
		case "bauch":
		case "brust":
			zoneMod = "6"; break;
		case "arm":
		case "kopf":
			zoneMod = "10"; break;
		case "verwundbar":
			zoneMod = "12"; break;
		case "fuss":
		case "hand":
			zoneMod = "16"; break;
		case "auge":
		case "herz":
			zoneMod = "20"; break;
		case "nd":
			zoneMod = "nd"; break;
		case "bein":
			if(isNaN(parseInt(legs)) || (parseInt(legs) != 2 && parseInt(legs) != 4))
			{
				debugLog(caller, "Beinanzahl für getTargetZoneMod() nicht 2 oder 4.");
				return "!";
			}
			parseInt(legs) == 2 ? zoneMod = 8 : zoneMod = 10; break;
		case "variabel":
			zoneMod = "variabel"; break;
		default:
			debugLog(caller, "Zielzone unbekannt. getTargetZoneMod() veraltet?!");
			return "!";
	}
	return zoneMod;
}

function getTargetZoneName(targetZone) {
	var caller = "getTargetZoneName";
	var zoneName = 0;
	switch(targetZone)
	{
		case "arm":
			zoneName = "den Arm"; break;
		case "auge":
			zoneName = "das Auge"; break;
		case "bauch":
			zoneName = "den Bauch"; break;
		case "bein":
			zoneName = "das Bein"; break;
		case "brust":
			zoneName = "die Brust"; break;
		case "fuss":
			zoneName = "den Fuß"; break;
		case "hand":
			zoneName = "die Hand"; break;
		case "herz":
			zoneName = "das Herz"; break;
		case "kopf":
			zoneName = "den Kopf"; break;
		case "rumpf":
			zoneName = "den Rumpf"; break;
		case "variabel":
			zoneName = "das Sinnesorgan/den Schwanz"; break;
		case "verwundbar":
			zoneName = "eine verwundbare Stelle"; break;
		case "nd":
			zoneName = "nd"; break;
		default:
			debugLog(caller, "Zielzone unbekannt. getTargetZoneName() veraltet?!");
			return "!";
	}
	return zoneName;
}

function deactivateRCC() {
	safeSetAttrs({
		fkr_aktiv: "on",
		fkr_erschwernis_gesamt: "?{Erleichterung (−) oder Erschwernis (+)|0} + ?{Ansage für Fernkampfangriff|0,0|1,1|2,2|3,3|4,4|5,5|6,6|7,7|8,8|9,9|10,10|11,11|12,12|13,13|14,14|15,15|16,16|17,17|18,18|19,19|20,20|21,21|22,22|23,23|24,24|25,25|26,26|27,27|28,28|29,29|30,30|31,31|32,32}",
		fkr_erschwernis_ansage_gesamt: "?{Ansage für Fernkampfangriff|0,0|1,1|2,2|3,3|4,4|5,5|6,6|7,7|8,8|9,9|10,10|11,11|12,12|13,13|14,14|15,15|16,16|17,17|18,18|19,19|20,20|21,21|22,22|23,23|24,24|25,25|26,26|27,27|28,28|29,29|30,30|31,31|32,32}",
		fkr_erschwernis_ohne_kampfgetuemmel: 0,
		fkr_kampfgetuemmel_ziele: 0,
		fk_tp_roll: "&{template:DSA-Kampf-Treffer} {{name=Fernkampf}} {{target=[[?{Tabelle für zufällige Trefferzone auswählen|Zweibeiner gegen unbeschwänzten Zweibeiner,0|Zweibeiner gegen beschwänzten Zweibeiner,1|Zweibeiner gegen Vierbeiner,3|Zweibeiner gegen Reiter,4|Reiter gegen Zweibeiner,2}]]}} {{TPArt=[[0]]}} {{zone=[[1d20]]}} {{damage=[[?{Anzahl W6 für Schadenswurf|1,1|2,2|3,3|4,4|5,5}d6 + (?{Bonus (+)/Malus (−) der Trefferpunkte|0})]]}}"
	});
}

on("change:nachteil_nachtblind",
	function() {
		safeGetAttrs(
			['nachteil_nachtblind', 'vorteil_daemmerungssicht', 'vorteil_nachtsicht'],
			function(v) {
				if(v.nachteil_nachtblind != "0")
				{
					safeSetAttrs({
							vorteil_daemmerungssicht: "0",
							vorteil_nachtsicht: "0"
						});
				}
		});
});

on("change:vorteil_daemmerungssicht change:vorteil_nachtsicht",
	function() {
		safeGetAttrs(
			['nachteil_nachtblind', 'vorteil_daemmerungssicht', 'vorteil_nachtsicht'],
			function(v) {
				if(v.vorteil_daemmerungssicht != "0" || v.vorteil_nachtsicht != "0")
				{
					safeSetAttrs({nachteil_nachtblind: "0"});
				}
		});
});

on(
	"change:stand",
	function() {
		safeGetAttrs(
			['stand', 'show-developer'],
			function(v) {
				var results = {};
				if (v['stand'] === 'Entwickler-Isu')
				{
					results['show-developer'] = "1";
				} else {
					results['show-developer'] = "0";
				}
				safeSetAttrs(results);
			}
		);
	}
);

on(
	"change:safe-sheet-open " +
	"change:FKBasis " +
	"change:TaW_Armbrust change:TaW_Belagerungswaffen change:TaW_Blasrohr " +
	"change:TaW_Bogen change:TaW_Diskus change:TaW_Schleuder " +
	"change:TaW_Wurfbeile change:TaW_Wurfmesser change:TaW_Wurfspeere " +
	"change:FKWFK1 change:FKW_Aktiv1 change:FKW1_Spez change:FKWtyp1 " +
	"change:FKWFK2 change:FKW_Aktiv2 change:FKW2_Spez change:FKWtyp2 " +
	"change:FKWFK3 change:FKW_Aktiv3 change:FKW3_Spez change:FKWtyp3 " +
	"change:FKWFK4 change:FKW_Aktiv4 change:FKW4_Spez change:FKWtyp4 " +
	"change:FK_mod_wounds",
	function() {
	safeGetAttrs([
		"FKBasis",
		"TaW_Armbrust", "TaW_Belagerungswaffen", "TaW_Blasrohr",
		"TaW_Bogen", "TaW_Diskus", "TaW_Schleuder",
		"TaW_Wurfbeile", "TaW_Wurfmesser", "TaW_Wurfspeere",
		"FKWFK1", "FKW_Aktiv1", "FKW1_Spez", "FKWtyp1",
		"FKWFK2", "FKW_Aktiv2", "FKW2_Spez", "FKWtyp2",
		"FKWFK3", "FKW_Aktiv3", "FKW3_Spez", "FKWtyp3",
		"FKWFK4", "FKW_Aktiv4", "FKW4_Spez", "FKWtyp4",
		"FK_mod_wounds",
	], function(v) {
		var attrsToChange = {"FK_Aktiv": 0};
		var FKTalente = [
			"Armbrust", "Belagerungswaffen", "Blasrohr",
			"Bogen", "Diskus", "Schleuder",
			"Wurfbeile", "Wurfmesser", "Wurfspeere"
		];
		// Todo: Proper sanity checking of input data
		if (isNaN(v["FKBasis"])) {
			v["FKBasis"] = 0;
		}

		if (isNaN(v["FK_mod_wounds"])) {
			v["FK_mod_wounds"] = 0;
		}

		// Calculation of FK values
		for (FKTalent of FKTalente) {
			var TaW = "TaW_" + FKTalent;
			if (isNaN(v[TaW])) {
				v[TaW] = 0;
			}
			attrsToChange["AT_" + FKTalent] = parseInt(v["FKBasis"]) + parseInt(v[TaW]);
		}

		for (var i = 1; i <= 4; i++) {
			v["FKWtyp" + i] = v["FKWtyp" + i].replace(/[^_a-zA-ZäöüÄÖÜß|]/g, "");
			if (v["FKWtyp" + i] === "") {
				v["FKWtyp" + i] = "--";
				attrsToChange["FKWFK" + i] = 0;
				continue;
			}
			attrsToChange["FKWFK" + i] =
				attrsToChange[v["FKWtyp" + i]] +
				parseInt(v["FKW" + i + "_Spez"]) +
				parseInt(v["FK_mod_wounds"]);
			attrsToChange["FK_Aktiv"] += attrsToChange["FKWFK" + i] * parseInt(v["FKW_Aktiv" + i]);
		}
		safeSetAttrs(attrsToChange);
	});
});

on(
	"change:safe-sheet-open " +
	"change:fkw_aktiv1 change:fkw_aktiv2 change:fkw_aktiv3 change:fkw_aktiv4 " +
	"change:fkwname1 change:fkwname2 change:fkwname3 change:fkwname4 " +
	"change:fkwtyp1 change:fkwtyp2 change:fkwtyp3 change:fkwtyp4 " +
	"change:fkwladezeit1 change:fkwladezeit2 change:fkwladezeit3 change:fkwladezeit4 " +
	"change:fkwschaden1_1 change:fkwschaden2_1 change:fkwschaden3_1 change:fkwschaden4_1 " +
	"change:fkwschaden1_2 change:fkwschaden2_2 change:fkwschaden3_2 change:fkwschaden4_2 " +
	"change:fkw1_rw1 change:fkw1_rw2 change:fkw1_rw3 change:fkw1_rw4 change:fkw1_rw5 " +
	"change:fkw2_rw1 change:fkw2_rw2 change:fkw2_rw3 change:fkw2_rw4 change:fkw2_rw5 " +
	"change:fkw3_rw1 change:fkw3_rw2 change:fkw3_rw3 change:fkw3_rw4 change:fkw3_rw5 " +
	"change:fkw4_rw1 change:fkw4_rw2 change:fkw4_rw3 change:fkw4_rw4 change:fkw4_rw5 " +
	"change:fkw1_tprw1 change:fkw1_tprw2 change:fkw1_tprw3 change:fkw1_tprw4 change:fkw1_tprw5 " +
	"change:fkw2_tprw1 change:fkw2_tprw2 change:fkw2_tprw3 change:fkw2_tprw4 change:fkw2_tprw5 " +
	"change:fkw3_tprw1 change:fkw3_tprw2 change:fkw3_tprw3 change:fkw3_tprw4 change:fkw3_tprw5 " +
	"change:fkw4_tprw1 change:fkw4_tprw2 change:fkw4_tprw3 change:fkw4_tprw4 change:fkw4_tprw5 " +
	"change:fkw_aktiv_schuetzentyp change:sf_scharfschutze_armbrust change:sf_meisterschutze_armbrust " +
	"change:sf_scharfschutze_blasrohr change:sf_meisterschutze_blasrohr " +
	"change:sf_scharfschutze_bogen change:sf_meisterschutze_bogen " +
	"change:sf_scharfschutze_wurfbeile change:sf_meisterschutze_wurfbeile " +
	"change:sf_scharfschutze_wurfmesser change:sf_meisterschutze_wurfmesser " +
	"change:sf_scharfschutze_wurfspeere change:sf_meisterschutze_wurfspeere " +
	"change:sf_scharfschutze_schleuder change:sf_meisterschutze_schleuder " +
	"change:nachteil_einaeugig " +
	"change:nachteil_farbenblind " +
	"change:nachteil_eingeschraenkter_sinn_sicht " +
	"change:nachteil_nachtblind " +
	"change:vorteil_daemmerungssicht " +
	"change:vorteil_entfernungssinn " +
	"change:vorteil_nachtsicht " +
	"change:fkr_zielgroesse_raw " +
	"change:fkr_entfernung_raw " +
	"change:fkr_wetterlage_raw " +
	"change:fkr_helligkeit_raw " +
	"change:fkr_helligkeitssystem " +
	"change:fkr_deckung_raw " +
	"change:fkr_schussart_raw " +
	"change:fkr_schussmitansage_ansage_raw " +
	"change:fkr_gezielter_schuss_zweibeiner change:fkr_gezielter_schuss_vierbeiner change:fkr_gezielter_schuss_vierbeiner_variabel " +
	"change:fkr_anvisieren_raw " +
	"change:fkr_schussnummer_raw " +
	"change:fkr_steilschuss_raw " +
	"change:fkr_ort_raw " +
	"change:fkr_bewegung_raw " +
	"change:fkr_kampfgetuemmel change:fkr_kampfgetuemmel_beteiligte_h change:fkr_kampfgetuemmel_beteiligte_ns " +
	"change:fkr_sonstiges_raw " +
	"change:fkr_sonstiges_ansage_raw",
	function() {
		safeGetAttrs(
			[
				'fkw1_spez',
				'fkw2_spez',
				'fkw3_spez',
				'fkw4_spez',

				'fkw_aktiv1',
				'fkw_aktiv2',
				'fkw_aktiv3',
				'fkw_aktiv4',

				'fkwname1',
				'fkwname2',
				'fkwname3',
				'fkwname4',

				'fkwtyp1',
				'fkwtyp2',
				'fkwtyp3',
				'fkwtyp4',

				'fkwladezeit1',
				'fkwladezeit2',
				'fkwladezeit3',
				'fkwladezeit4',

				'fkwschaden1_1',
				'fkwschaden2_1',
				'fkwschaden3_1',
				'fkwschaden4_1',

				'fkwschaden1_2',
				'fkwschaden2_2',
				'fkwschaden3_2',
				'fkwschaden4_2',

				'fkw1_rw1', 'fkw1_rw2', 'fkw1_rw3', 'fkw1_rw4', 'fkw1_rw5',
				'fkw2_rw1', 'fkw2_rw2', 'fkw2_rw3', 'fkw2_rw4', 'fkw2_rw5',
				'fkw3_rw1', 'fkw3_rw2', 'fkw3_rw3', 'fkw3_rw4', 'fkw3_rw5',
				'fkw4_rw1', 'fkw4_rw2', 'fkw4_rw3', 'fkw4_rw4', 'fkw4_rw5',

				'fkw1_tprw1', 'fkw1_tprw2', 'fkw1_tprw3', 'fkw1_tprw4', 'fkw1_tprw5',
				'fkw2_tprw1', 'fkw2_tprw2', 'fkw2_tprw3', 'fkw2_tprw4', 'fkw2_tprw5',
				'fkw3_tprw1', 'fkw3_tprw2', 'fkw3_tprw3', 'fkw3_tprw4', 'fkw3_tprw5',
				'fkw4_tprw1', 'fkw4_tprw2', 'fkw4_tprw3', 'fkw4_tprw4', 'fkw4_tprw5',

				'sf_scharfschutze_armbrust',
				'sf_meisterschutze_armbrust',
				'sf_scharfschutze_blasrohr',
				'sf_meisterschutze_blasrohr',
				'sf_scharfschutze_bogen',
				'sf_meisterschutze_bogen',
				'sf_scharfschutze_schleuder',
				'sf_meisterschutze_schleuder',
				'sf_scharfschutze_wurfbeile',
				'sf_meisterschutze_wurfbeile',
				'sf_scharfschutze_wurfmesser',
				'sf_meisterschutze_wurfmesser',
				'sf_scharfschutze_wurfspeere',
				'sf_meisterschutze_wurfspeere',

				'nachteil_einaeugig',
				'nachteil_farbenblind',
				'nachteil_eingeschraenkter_sinn_sicht',
				'nachteil_nachtblind',

				'vorteil_daemmerungssicht',
				'vorteil_entfernungssinn',
				'vorteil_nachtsicht',

				'fkr_zielgroesse_raw',
				'fkr_entfernung_raw',
				'fkr_wetterlage_raw',
				'fkr_helligkeit_raw',
				'fkr_helligkeitssystem',
				'fkr_deckung_raw',
				'fkr_schussart_raw',
				'fkr_schussmitansage_ansage_raw',
				'fkr_gezielter_schuss_zweibeiner',
				'fkr_gezielter_schuss_vierbeiner',
				'fkr_gezielter_schuss_vierbeiner_variabel',
				'fkr_anvisieren_raw',
				'fkr_schussnummer_raw',
				'fkr_steilschuss_raw',
				'fkr_ort_raw',
				'fkr_bewegung_raw',
				'fkr_kampfgetuemmel',
				'fkr_kampfgetuemmel_beteiligte_h',
				'fkr_kampfgetuemmel_beteiligte_ns',
				'fkr_sonstiges_raw',
				'fkr_sonstiges_ansage_raw'
			],
			function(v) {
				var caller = "???";
				debugLog(caller, JSON.stringify(v));
				debugLog(caller, 'FKW_aktiv1: ', v.fkw_aktiv1, 
					'; FKW_aktiv2: ', v.fkw_aktiv2, 
					'; FKW_aktiv3: ', v.fkw_aktiv3, 
					'; FKW_aktiv4: ', v.fkw_aktiv4
				);
				var activeCount = parseInt(v.fkw_aktiv1) + parseInt(v.fkw_aktiv2) + parseInt(v.fkw_aktiv3) + parseInt(v.fkw_aktiv4);
				if(activeCount === 0)
				{
					debugLog(caller, 'Keine aktive Fernkampfwaffe gewählt. Fernkampfrechner deaktiviert.');
					deactivateRCC();

				} else if (activeCount === 1) {
					// Hauptteil
					// Definitionen
					// FKW: Fernkampfwaffe
					// FKR: Fernkampfrechner
					var FKW = {};
					FKW.spez = 0;
					FKW.aktiv = 0;
					FKW.name = "";
					FKW.typ = "";
					FKW.ladezeit = 0;
					FKW.TP = {Anzahl_W6: 0, Bonus: 0};
					FKW.RW1 = 0; FKW.RW2 = 0; FKW.RW3 = 0; FKW.RW4 = 0; FKW.RW5 = 0;
					FKW.TPRW1 = 0; FKW.TPRW2 = 0; FKW.TPRW3 = 0; FKW.TPRW4 = 0; FKW.TPRW5 = 0;
					FKW.schuetze = 0; // 0: Normal; 1: Scharf; 2: Meister

					var FKR = {};
					FKR.DS = v.vorteil_daemmerungssicht;
					FKR.ES = v.vorteil_entfernungssinn;
					FKR.NS = v.vorteil_nachtsicht;

					FKR.EA = v.nachteil_einaeugig;
					FKR.FB = v.nachteil_farbenblind;
					FKR.KS = v.nachteil_eingeschraenkter_sinn_sicht;
					FKR.NB = v.nachteil_nachtblind;

					FKR.groesse = v.fkr_zielgroesse_raw;
					FKR.abstand = parseInt(v.fkr_entfernung_raw);
					FKR.wetter = v.fkr_wetterlage_raw;
					FKR.licht = v.fkr_helligkeit_raw;
					FKR.lichtsys = v.fkr_helligkeitssystem;
					FKR.deckung = v.fkr_deckung_raw;
					FKR.schuss = {
						art: v.fkr_schussart_raw,
						ansage: v.fkr_schussmitansage_ansage_raw,
						gezielt2b: getTargetZoneMod(v.fkr_gezielter_schuss_zweibeiner, 2),
						gezielt2bzone: v.fkr_gezielter_schuss_zweibeiner,
						gezielt4b: getTargetZoneMod(v.fkr_gezielter_schuss_vierbeiner, 4),
						gezielt4bzone: v.fkr_gezielter_schuss_vierbeiner,
						gezielt4bvar: v.fkr_gezielter_schuss_vierbeiner_variabel
						};
					FKR.zielen = v.fkr_anvisieren_raw;
					FKR.nr =  v.fkr_schussnummer_raw;
					FKR.steil = v.fkr_steilschuss_raw;
					FKR.ort = v.fkr_ort_raw;
					FKR.bewegung = v.fkr_bewegung_raw;
					FKR.getuemmel = {
						aktiv: v.fkr_kampfgetuemmel,
						ziele_h: v.fkr_kampfgetuemmel_beteiligte_h,
						ziele_ns: v.fkr_kampfgetuemmel_beteiligte_ns
					};
					FKR.misc = v.fkr_sonstiges_raw;
					FKR.misc_ansage = v.fkr_sonstiges_ansage_raw;

					// Zeige FK-Rechner an
					debugLog(caller, 'Genau eine aktive Fernkampfwaffe gewählt. Fernkampfrechneraktivierung im Gange ...');
					safeSetAttrs({fkr_aktiv: "off"});

					// Finde die aktive Waffe heraus
					if(v.fkw_aktiv1 == "1") { FKW.aktiv = 1; }
					else if (v.fkw_aktiv2 == "1") { FKW.aktiv = 2; }
					else if (v.fkw_aktiv3 == "1") { FKW.aktiv = 3; }
					else if (v.fkw_aktiv4 == "1") { FKW.aktiv = 4; }

					// FKW-Daten zusammentragen, Teil 1
					switch(FKW.aktiv)
					{
						case 0:
							debugLog(caller, 'Keine aktive Fernkampfwaffe gefunden?! o.O Fernkampfrechneraktivierung eingestellt.');
							break;
						case 1:
							FKW.spez = parseInt(v.fkw1_spez);
							FKW.name = v.fkwname1;
							FKW.typ = FKWgetType(v.fkwtyp1);
							FKW.ladezeit = parseInt(v.fkwladezeit1);
							FKW.TP.Anzahl_W6 = parseInt(v.fkwschaden1_1);
							FKW.TP.Bonus = parseInt(v.fkwschaden1_2);
							FKW.RW1 = parseInt(v.fkw1_rw1);
							FKW.RW2 = parseInt(v.fkw1_rw2);
							FKW.RW3 = parseInt(v.fkw1_rw3);
							FKW.RW4 = parseInt(v.fkw1_rw4);
							FKW.RW5 = parseInt(v.fkw1_rw5);
							FKW.TPRW1 = parseInt(v.fkw1_tprw1);
							FKW.TPRW2 = parseInt(v.fkw1_tprw2);
							FKW.TPRW3 = parseInt(v.fkw1_tprw3);
							FKW.TPRW4 = parseInt(v.fkw1_tprw4);
							FKW.TPRW5 = parseInt(v.fkw1_tprw5);
							break;
						case 2:
							FKW.spez = parseInt(v.fkw2_spez);
							FKW.name = v.fkwname2;
							FKW.typ = FKWgetType(v.fkwtyp2);
							FKW.ladezeit = parseInt(v.fkwladezeit2);
							FKW.TP.Anzahl_W6 = parseInt(v.fkwschaden2_1);
							FKW.TP.Bonus = parseInt(v.fkwschaden2_2);
							FKW.RW1 = parseInt(v.fkw2_rw1);
							FKW.RW2 = parseInt(v.fkw2_rw2);
							FKW.RW3 = parseInt(v.fkw2_rw3);
							FKW.RW4 = parseInt(v.fkw2_rw4);
							FKW.RW5 = parseInt(v.fkw2_rw5);
							FKW.TPRW1 = parseInt(v.fkw2_tprw1);
							FKW.TPRW2 = parseInt(v.fkw2_tprw2);
							FKW.TPRW3 = parseInt(v.fkw2_tprw3);
							FKW.TPRW4 = parseInt(v.fkw2_tprw4);
							FKW.TPRW5 = parseInt(v.fkw2_tprw5);
							break;
						case 3:
							FKW.spez = parseInt(v.fkw3_spez);
							FKW.name = v.fkwname3;
							FKW.typ = FKWgetType(v.fkwtyp3);
							FKW.ladezeit = parseInt(v.fkwladezeit3);
							FKW.TP.Anzahl_W6 = parseInt(v.fkwschaden3_1);
							FKW.TP.Bonus = parseInt(v.fkwschaden3_2);
							FKW.RW1 = parseInt(v.fkw3_rw1);
							FKW.RW2 = parseInt(v.fkw3_rw2);
							FKW.RW3 = parseInt(v.fkw3_rw3);
							FKW.RW4 = parseInt(v.fkw3_rw4);
							FKW.RW5 = parseInt(v.fkw3_rw5);
							FKW.TPRW1 = parseInt(v.fkw3_tprw1);
							FKW.TPRW2 = parseInt(v.fkw3_tprw2);
							FKW.TPRW3 = parseInt(v.fkw3_tprw3);
							FKW.TPRW4 = parseInt(v.fkw3_tprw4);
							FKW.TPRW5 = parseInt(v.fkw3_tprw5);
							break;
						case 4:
							FKW.spez = parseInt(v.fkw4_spez);
							FKW.name = v.fkwname4;
							FKW.typ = FKWgetType(v.fkwtyp4);
							FKW.ladezeit = parseInt(v.fkwladezeit4);
							FKW.TP.Anzahl_W6 = parseInt(v.fkwschaden4_1);
							FKW.TP.Bonus = parseInt(v.fkwschaden4_2);
							FKW.RW1 = parseInt(v.fkw4_rw1);
							FKW.RW2 = parseInt(v.fkw4_rw2);
							FKW.RW3 = parseInt(v.fkw4_rw3);
							FKW.RW4 = parseInt(v.fkw4_rw4);
							FKW.RW5 = parseInt(v.fkw4_rw5);
							FKW.TPRW1 = parseInt(v.fkw4_tprw1);
							FKW.TPRW2 = parseInt(v.fkw4_tprw2);
							FKW.TPRW3 = parseInt(v.fkw4_tprw3);
							FKW.TPRW4 = parseInt(v.fkw4_tprw4);
							FKW.TPRW5 = parseInt(v.fkw4_tprw5);
							break;
					}

					// FKW-Daten zusammentragen, Teil 2 (hängt von Teil 1 ab :()
					switch(FKW.typ){
						case "Belagerungswaffen":
						case "Diskus":
							FKW.schuetze = 0;
							break;
						case "Armbrust":
							if(v.sf_scharfschutze_armbrust == "1") {FKW.schuetze = 1;}
							if(v.sf_meisterschutze_armbrust == "1") {FKW.schuetze = 2;}
							break;
						case "Blasrohr":
							if(v.sf_scharfschutze_blasrohr == "1") {FKW.schuetze = 1;}
							if(v.sf_meisterschutze_blasrohr == "1") {FKW.schuetze = 2;}
							break;
						case "Bogen":
							if(v.sf_scharfschutze_bogen == "1") {FKW.schuetze = 1;}
							if(v.sf_meisterschutze_bogen == "1") {FKW.schuetze = 2;}
							break;
						case "Schleuder":
							if(v.sf_scharfschutze_schleuder == "1") {FKW.schuetze = 1;}
							if(v.sf_meisterschutze_schleuder == "1") {FKW.schuetze = 2;}
							break;
						case "Wurfbeile":
							if(v.sf_scharfschutze_wurfbeile == "1") {FKW.schuetze = 1;}
							if(v.sf_meisterschutze_wurfbeile == "1") {FKW.schuetze = 2;}
							break;
						case "Wurfmesser":
							if(v.sf_scharfschutze_wurfmesser == "1") {FKW.schuetze = 1;}
							if(v.sf_meisterschutze_wurfmesser == "1") {FKW.schuetze = 2;}
							break;
						case "Wurfspeere":
							if(v.sf_scharfschutze_wurfspeere == "1") {FKW.schuetze = 1;}
							if(v.sf_meisterschutze_wurfspeere == "1") {FKW.schuetze = 2;}
							break;
						case -1:
						default:
							debugLog(caller, 'FKW-Typ unbekannt: ', FKW.typ);
							FKW.schuetze = -1;
							break;
					}
					debugLog(caller, JSON.stringify(FKW));

					// Rückmeldung an den Benutzer
					switch(FKW.schuetze)
					{
						case 0:
							safeSetAttrs({fkw_aktiv_schuetzentyp: "Normalschütze"});
							break;
						case 1:
							safeSetAttrs({fkw_aktiv_schuetzentyp: "Scharfschütze"});
							break;
						case 2:
							safeSetAttrs({fkw_aktiv_schuetzentyp: "Meisterschütze"});
							break;
					}

					/*
					   Herzstück des Rechners
					                          */
					// Definitionen
					var mod_gesamt = {};
					var dauer_gesamt = {};
					var TP_gesamt = {};

					// Startwerte
					dauer_gesamt.fkw = parseInt(FKW.ladezeit);
					TP_gesamt.fkw = FKW.TP;

					// Zielgröße
					if(FKR.groesse != "nd")
					{
						mod_gesamt.groesse = parseInt(FKR.groesse);
						safeSetAttrs({fkr_zielgroesse_final: prettifyMod(parseInt(FKR.groesse))});
					} else {
						mod_gesamt.groesse = "-";
						safeSetAttrs({fkr_zielgroesse_final: "-"});
					}

					// Entfernung
					// Input Sanitation ._.
					if(typeof(FKR.abstand) != "number" || typeof(FKW.RW1) != "number"
						|| typeof(FKW.RW2) != "number" || typeof(FKW.RW3) != "number"
						|| typeof(FKW.RW4) != "number" || typeof(FKW.RW5) != "number"
						|| typeof(FKW.TPRW1) != "number" || typeof(FKW.TPRW2) != "number"
						|| typeof(FKW.TPRW3) != "number" || typeof(FKW.TPRW4) != "number"
						|| typeof(FKW.TPRW5) != "number")
					{
						debugLog(caller, "Entfernung zum Ziel oder mindestens eine Reichweite der aktiven Fernkampfwaffe sind keine gültigen Zahlen. Berechnungen abgebrochen.");
						safeSetAttrs({fkr_entfernung_final: "!", fkr_entfernung_final_TP: "!"});
						return;
					}
					if(FKR.abstand < 0 || FKW.RW1 < 0 || FKW.RW2 < 0
						|| FKW.RW3 < 0 || FKW.RW4 < 0 || FKW.RW5 < 0)
					{
						debugLog(caller, "Entfernung zum Ziel oder mindestens eine Reichweite der aktiven Fernkampfwaffe negativ. Berechnungen abgebrochen.");
						safeSetAttrs({fkr_entfernung_final: "!", fkr_entfernung_final_TP: "!"});
						return;
					}
					if(FKW.RW1 >= FKW.RW2 || FKW.RW2 >= FKW.RW3
						|| FKW.RW3 >= FKW.RW4 | FKW.RW4 >= FKW.RW5)
					{
						debugLog(caller, "Mindestens eine Reichweite einer Entfernungsklasse ist größer als oder gleich groß wie die Reichweite einer höheren Entfernungsklasse. Berechnungen abgebrochen.");
						safeSetAttrs({fkr_entfernung_final: "!", fkr_entfernung_final_TP: "!"});
						return;
					}
					// Vor- und Nachteile einrechnen
					var mods = 0;
					if(FKR.abstand < 10 && FKR.EA != "0")
					{
						mods += 2;
					}
					if(FKR.ES != "0") { mods -= 2; }
					if(FKR.abstand > 50 && FKR.FB != "0")
					{
						mods += 4;
					}
					if(FKR.abstand > 100 && FKR.KS != "0")
					{
						// Hinweis anzeigen, Einrechnung via "Sonstiges"
						safeSetAttrs({fkr_warnung_kurzsichtig: "on"});
					} else {
						safeSetAttrs({fkr_warnung_kurzsichtig: "off"});
					}
					// Entfernungsklassen werden als Intervalle betrachtet:
					// 5/10/15 --> sehr nah: [0, 5], nah: (5, 10], mittel: (10, 15]
					if(FKR.abstand <= FKW.RW1)
					{
						mod_gesamt.abstand = -2 + mods;
						TP_gesamt.abstand = parseInt(FKW.TPRW1);
						safeSetAttrs({
							fkr_entfernung_final: prettifyMod(-2 + mods),
							fkr_entfernung_final_TP: prettifyMod(FKW.TPRW1)
						});
					} else if(FKR.abstand <= FKW.RW2) {
						mod_gesamt.abstand = 0 + mods;
						TP_gesamt.abstand = parseInt(FKW.TPRW2);
						safeSetAttrs({
							fkr_entfernung_final: prettifyMod(0 + mods),
							fkr_entfernung_final_TP: prettifyMod(FKW.TPRW2)
						});
					} else if(FKR.abstand <= FKW.RW3) {
						mod_gesamt.abstand = 4 + mods;
						TP_gesamt.abstand = parseInt(FKW.TPRW3);
						safeSetAttrs({
							fkr_entfernung_final: prettifyMod(4 + mods),
							fkr_entfernung_final_TP: prettifyMod(FKW.TPRW3)
						});
					} else if(FKR.abstand <= FKW.RW4) {
						mod_gesamt.abstand = 8 + mods;
						TP_gesamt.abstand = parseInt(FKW.TPRW4);
						safeSetAttrs({
							fkr_entfernung_final: prettifyMod(8 + mods),
							fkr_entfernung_final_TP: prettifyMod(FKW.TPRW4)
						});
					} else if(FKR.abstand <= FKW.RW5) {
						mod_gesamt.abstand = 12 + mods;
						TP_gesamt.abstand = parseInt(FKW.TPRW5);
						safeSetAttrs({
							fkr_entfernung_final: prettifyMod(12 + mods),
							fkr_entfernung_final_TP: prettifyMod(FKW.TPRW5)
						});
					} else {
						debugLog(caller, "Ziel außerhalb der Reichweite. Berechnungen abgebrochen.");
						safeSetAttrs({fkr_entfernung_final: "!", fkr_entfernung_final_TP: "!"});
						return;
					}

					// Wetterlage
					if(FKR.wetter != "nd")
					{
						mod_gesamt.wetter = parseInt(FKR.wetter);
						safeSetAttrs({fkr_wetterlage_final: prettifyMod(parseInt(FKR.wetter))});
					} else {
						mod_gesamt.wetter = "-";
						safeSetAttrs({fkr_wetterlage_final: "-"});
					}

					// Helligkeit
					// absolute Dunkelheit immer "finsternis"
					
					if(FKR.licht != "nd")
					{
						var finsternis = 8;
						debugLog(caller, "FKR.lichtsys: ", FKR.lichtsys);
						if(FKR.lichtsys == "on") { finsternis = 16; }

						if(FKR.DS == "0" && FKR.NS == "0")
						{
							mod_gesamt.licht = parseInt(FKR.licht);
							safeSetAttrs({fkr_helligkeit_final: prettifyMod(parseInt(FKR.licht))});
						} else if(FKR.DS != "0" && FKR.NS == "0") {
							var licht;
							if(parseInt(FKR.licht) == finsternis)
							{
								licht = finsternis;
							} else {
								licht = Math.ceil(parseInt(FKR.licht) / 2);
							}
							mod_gesamt.licht = parseInt(licht);
							safeSetAttrs({fkr_helligkeit_final: prettifyMod(licht)});
						} else if(
						(FKR.DS != "0" && FKR.NS != "0")
						|| (FKR.DS == "0" && FKR.NS != "0")) {
							var licht;
							if(parseInt(FKR.licht) == finsternis)
							{
								licht = finsternis;
							} else {
								if(FKR.lichtsys != "on")
								{
									// Mit WdS macht Erschwernisobergrenze keinen Sinn
									licht = Math.max((parseInt(FKR.licht) / 2) - 5, 0);
								} else if(FKR.lichtsys == "on") {
									// Mit WdE macht die Erschwernisobergrenze von 5 Sinn
									licht = Math.min(Math.ceil((parseInt(FKR.licht) / 2)), 5);
								}
							}
							mod_gesamt.licht = parseInt(licht);
							safeSetAttrs({fkr_helligkeit_final: prettifyMod(licht)});
						}
						if(FKR.NB != "0")
						{
							var licht = Math.min(finsternis, parseInt(FKR.licht) * 2);
							mod_gesamt.licht = licht;
							safeSetAttrs({fkr_helligkeit_final: prettifyMod(licht)});
						}
					} else {
						mod_gesamt.licht = "-";
						safeSetAttrs({fkr_helligkeit_final: "-"});
					}

					// Deckung
					if(FKR.deckung != "nd")
					{
						mod_gesamt.deckung = parseInt(FKR.deckung);
						safeSetAttrs({fkr_deckung_final: prettifyMod(parseInt(FKR.deckung))});
					} else {
						mod_gesamt.deckung = "-";
						safeSetAttrs({fkr_deckung_final: "-"});
					}

					// Schussart
					var mods = 0;
					var dauer = 0;
					var TP = 0;
					// Schuss mit Ansage, gezielte Schüsse benötigen Extraeingabefelder
					// "on" = verstecken, "off" = anzeigen
					var GUIansage = "on";
					var GUIgezielt2b = "on";
					var GUIgezielt4b = "on";
					// Variable Erschwernis bei gezielter Schuss auf Vierbeiner
					var GUIgezielt4bvar = "on";

					if(FKR.schuss.art != "nd")
					{
						switch(FKR.schuss.art)
						{
							case "schnellschuss":
								switch(FKW.schuetze)
								{
									case 0:
										mods = 2; dauer = 0; TP = 0;
										break;
									case 1:
										mods = 1; dauer = 0; TP = 0;
										break;
									case 2:
										mods = 0; dauer = 0; TP = 0;
										break;
								}
								break;
							case "normalschuss":
								// Meisterschützen kennen nur Schnellschüsse
								if(FKW.schuetze == 2)
								{
									mods = 0; dauer = 0; TP = 0;
								} else {
									mods = 0; dauer = 1; TP = 0;
								}
								break;
							case "schussmitansage":
								GUIansage = "off";
								if(isNaN(parseInt(FKR.schuss.ansage)))
								{
									debugLog(caller, "Ansage keine Zahl. Berechnungen abgebrochen.");
									safeSetAttrs({
										fkr_schussart_schussmitansage: GUIansage,
										fkr_schussart_final: "!",
										fkr_schussart_final_dauer: "!",
										fkr_schussart_final_TP: "!"
									});
									return;
								}
								if(parseInt(FKR.schuss.ansage) < 1)
								{
									debugLog(caller, "Ansage kleiner eins. Berechnungen abgebrochen.");
									safeSetAttrs({
										fkr_schussart_schussmitansage: GUIansage,
										fkr_schussart_final: "!",
										fkr_schussart_final_dauer: "!",
										fkr_schussart_final_TP: "!"
									});
									return;
								}
								mods = parseInt(FKR.schuss.ansage);
								switch(FKW.schuetze)
								{
									case 0:
										dauer = Math.ceil(mods / 2.0);
										TP = Math.round(mods / 2.0);
										break;
									case 1:
										dauer = Math.max(1, Math.ceil(mods / 2.0) - 2);
										TP = mods;
										break;
									case 2:
										dauer = 1;
										TP = mods;
										break;
								}
								break;
							case "gezieltzweibeiner":
								GUIgezielt2b = "off";
								TP = 0;
								if(FKR.schuss.gezielt2b != "nd")
								{
									mods = parseInt(FKR.schuss.gezielt2b);
									switch(FKW.schuetze)
									{
										case 0:
											dauer = Math.ceil(mods / 2.0);
											break;
										case 1:
											mods = Math.round(mods * 0.667);
											dauer = Math.max(1, Math.ceil(mods / 2.0));
											break;
										case 2:
											mods = Math.round(mods / 2.0);
											dauer = 1;
											break;
									}
								} else {
									mods = "-"; dauer = "-"; TP = "-";
								}
								break;
							case "gezieltvierbeiner":
								GUIgezielt4b = "off";
								TP = 0;
								switch(FKR.schuss.gezielt4b)
								{
									case "variabel":
										GUIgezielt4bvar = "off";
										safeSetAttrs({fkr_schussart_gezielter_schuss_vierbeiner_variabel: GUIgezielt4bvar});
										if(isNaN(parseInt(FKR.schuss.gezielt4bvar)))
										{
											debugLog(caller, "Angabe für Sinnesorgan/Schwanz keine Zahl. Berechnungen abgebrochen.");
											safeSetAttrs({
												fkr_schussart_final: "!",
												fkr_schussart_final_dauer: "!",
												fkr_schussart_final_TP: "!"
											});
											return;
										}
										if(parseInt(FKR.schuss.gezielt4bvar) < 1)
										{
											debugLog(caller, "Angabe für Sinnesorgan/Schwanz kleiner eins. Berechnungen abgebrochen.");
											safeSetAttrs({
												fkr_schussart_final: "!",
												fkr_schussart_final_dauer: "!",
												fkr_schussart_final_TP: "!"
											});
											return;
										}
										mods = parseInt(FKR.schuss.gezielt4bvar);
										switch(FKW.schuetze)
										{
											case 0:
												dauer = Math.ceil(mods / 2.0);
												break;
											case 1:
												mods = Math.round(mods * 0.667);
												dauer = Math.max(1, Math.ceil(mods / 2.0));
												break;
											case 2:
												mods = Math.round(mods / 2.0);
												dauer = 1;
												break;
										}
										break;
									default:
										mods = parseInt(FKR.schuss.gezielt4b);
										switch(FKW.schuetze)
										{
											case 0:
												dauer = Math.ceil(mods / 2.0);
												break;
											case 1:
												mods = Math.round(mods * 0.667);
												dauer = Math.max(1, Math.ceil(mods / 2.0) - 2);
												break;
											case 2:
												mods = Math.round(mods / 2.0);
												dauer = 1;
												break;
										}
										break;
									case "nd":
										mods = "-"; dauer = "-"; TP = "-";
										break;
								}
								break;
						}
						mod_gesamt.schuss = mods;
						dauer_gesamt.schuss = dauer;
						TP_gesamt.schuss = TP;
						safeSetAttrs({
								fkr_schussart_schussmitansage: GUIansage,
								fkr_schussart_gezielter_schuss_zweibeiner: GUIgezielt2b,
								fkr_schussart_gezielter_schuss_vierbeiner: GUIgezielt4b,
								fkr_schussart_gezielter_schuss_vierbeiner_variabel: GUIgezielt4bvar,
								fkr_schussart_final: prettifyMod(mods),
								fkr_schussart_final_dauer: prettifyMod(dauer),
								fkr_schussart_final_TP: prettifyMod(TP)
						});
					} else {
						mod_gesamt.schuss = "-";
						dauer_gesamt.schuss = "-";
						TP_gesamt.schuss = "-";
						safeSetAttrs({
								fkr_schussart_schussmitansage: GUIansage,
								fkr_schussart_gezielter_schuss_zweibeiner: GUIgezielt2b,
								fkr_schussart_gezielter_schuss_vierbeiner: GUIgezielt4b,
								fkr_schussart_gezielter_schuss_vierbeiner_variabel: GUIgezielt4bvar,
								fkr_schussart_final: "-",
								fkr_schussart_final_dauer: "-",
								fkr_schussart_final_TP: "-"
						});
					}

					// Anvisieren
					// Anvisieren kann keine Erschwernisse aus Ansagen/gezielten Schüssen abbauen,
					// wird allerdings hier nicht überprüft, da FK-Proben in 99% der Fälle andere
					// Erschwernisse größer 4 haben.
					if(FKR.zielen != "nd")
					{
						var dauer = 0;
						switch(FKW.schuetze)
						{
							case 0:
								dauer = Math.abs(FKR.zielen * 2);
								break;
							case 1:
								dauer = Math.abs(FKR.zielen);
								break;
							case 2:
								dauer = Math.abs(FKR.zielen);
								break;
						}
						mod_gesamt.zielen = parseInt(FKR.zielen);
						dauer_gesamt.zielen = dauer;
						safeSetAttrs({
								fkr_anvisieren_final: prettifyMod(parseInt(FKR.zielen)),
								fkr_anvisieren_final_dauer: prettifyMod(dauer)
						});
					} else {
						mod_gesamt.zielen = "-";
						dauer_gesamt.zielen = "-";
						safeSetAttrs({
								fkr_anvisieren_final: "-",
								fkr_anvisieren_final_dauer: "-"
						});
					}

					// Schussnummer
					var mods = 0;
					switch(parseInt(FKR.nr))
					{
						case 1:
							mods = 0;
							break;
						case 2:
							switch(FKW.typ)
							{
								case "Armbrust":
								case "Belagerungswaffen":
								case "Blasrohr":
								case "Bogen":
								case "Schleuder":
									mods = 4;
									break;
								case "Diskus":
								case "Wurfbeile":
								case "Wurfmesser":
								case "Wurfspeere":
									mods = 2;
									break;
							}
							break;
					}
					mod_gesamt.nr = mods;
					safeSetAttrs({fkr_schussnummer_final: prettifyMod(mods)});

					// Steilschüsse
					// Danke an die Redaktion für die vielen teils unscharf formulierten Sonderregeln -.-°
					var mods = 0;
					var TP = 0;
					switch(FKR.steil)
					{
						case "0":
							mods = 0;
							break;
						case "oben":
							switch(FKW.schuetze)
							{
								case 0:
								case 1:
									switch(FKW.typ)
									{
										case "Armbrust":
										case "Belagerungswaffen":
										case "Blasrohr":
										case "Bogen":
										case "Schleuder":
											mods = 4;
											break;
										case "Diskus":
										case "Wurfbeile":
										case "Wurfmesser":
										case "Wurfspeere":
											mods = 8;
											break;
									}
									break;
								case 2:
									mods = 0;
									break;
							}
							break;
						case "unten":
							switch(FKW.schuetze)
							{
								case 0:
								case 1:
									mods = 2;
									if(FKW.typ == "Wurfspeere") { TP = 1; }
									// Yep, falsch geschriebener Name = kein Abzug ¯\_(ツ)_/¯
									switch(FKW.name)
									{
										case "Schleuder":
										case "Speerschleuder":
										case "Stabschleuder":
											mods = 8;
											TP = 0;
											break;
									}
									break;
								case 2:
									mods = 0;
									break;
							}
							break;
					}
					mod_gesamt.steil = mods;
					TP_gesamt.steil = TP;
					safeSetAttrs({
							fkr_steilschuss_final: prettifyMod(mods),
							fkr_steilschuss_final_TP: prettifyMod(TP)
					});

					// Ort des Schützen
					var mods = 0;
					switch(FKR.ort)
					{
						case "0":
							mods = 0;
							break;
						case "wind_boeig":
							FKW.schuetze < 2 ? mods = 4 : mods = 0;
							if(FKW.typ == "Blasrohr")
							{
								mods = "!";
							}
							break;
						case "wind_boeig_stark":
							FKW.schuetze < 2 ? mods = 8 : mods = 0;
							if(FKW.typ == "Blasrohr")
							{
								mods = "!";
							}
							break;
						case "unterwasser":
							mods = 3;
							break;
						case "nd":
							mods = "-";
					}
					mod_gesamt.ort = mods;
					safeSetAttrs({fkr_ort_final: prettifyMod(mods)});

					// Zielbewegung
					if(FKR.bewegung != "nd" && FKR.getuemmel.aktiv == "0")
					{
						mod_gesamt.bewegung = parseInt(FKR.bewegung);
						safeSetAttrs({fkr_bewegung_final: prettifyMod(parseInt(FKR.bewegung))});
					} else if(FKR.bewegung != "nd" && FKR.getuemmel.aktiv != "0") {
						mod_gesamt.bewegung = 0;
						safeSetAttrs({
								fkr_bewegung_final: prettifyMod(0),
								fkr_bewegung_raw: "0"
						});
					} else {
						mod_gesamt.bewegung = "-";
						safeSetAttrs({fkr_bewegung_final: "-"});
					}

					// Kampfgetümmel
					// Zielbewegung -> 0 (s. o.)
					// pro Beteiligte auf DK H und DK NS erschwert
					var zielekampfgetuemmel = 0;
					if(FKR.getuemmel.aktiv != "0")
					{
						if(isNaN(parseInt(FKR.getuemmel.ziele_h)))
						{
							debugLog(caller, "Anzahl Ziele auf DK H keine gültige Zahl. Berechnungen abgebrochen.");
							safeSetAttrs({fkr_kampfgetuemmel_final: "!"});
							return;
						}
						if(isNaN(parseInt(FKR.getuemmel.ziele_ns)))
						{
							debugLog(caller, "Anzahl Ziele auf DK NS keine gültige Zahl. Berechnungen abgebrochen.");
							safeSetAttrs({fkr_kampfgetuemmel_final: "!"});
							return;
						}
						if(parseInt(FKR.getuemmel.ziele_h) < 0)
						{
							debugLog(caller, "Anzahl Ziele auf DK H kleiner null. Berechnungen abgebrochen.");
							safeSetAttrs({fkr_kampfgetuemmel_final: "!"});
							return;
						}
						if(parseInt(FKR.getuemmel.ziele_ns) < 0)
						{
							debugLog(caller, "Anzahl Ziele auf DK NS kleiner null. Berechnungen abgebrochen.");
							safeSetAttrs({fkr_kampfgetuemmel_final: "!"});
							return;
						}
						var dk_h = parseInt(FKR.getuemmel.ziele_h);
						var dk_ns = parseInt(FKR.getuemmel.ziele_ns);
						if((dk_ns + dk_h) < 2)
						{
							debugLog(caller, "Kampfgetümmel setzt mindestens zwei Beteiligte voraus. Berechnungen abgebrochen.");
							safeSetAttrs({fkr_kampfgetuemmel_final: "!"});
							return;
						}
						if(dk_ns < 2 && dk_h < 2)
						{
							debugLog(caller, "Mindestens zwei Beteiligte eines Kampfgetümmels müssen in derselben Distanzklasse kämpfen. Berechnungen abgebrochen.");
							safeSetAttrs({fkr_kampfgetuemmel_final: "!"});
							return;
						}
						zielekampfgetuemmel = dk_ns + dk_h;
						var mods = (2 * dk_ns) + (3 * dk_h);
						mod_gesamt.getuemmel = mods;
						safeSetAttrs({fkr_kampfgetuemmel_final: prettifyMod(mods)});
					} else {
						mod_gesamt.getuemmel = "-";
						safeSetAttrs({fkr_kampfgetuemmel_final: "-"});
					}

					// Freier/Sonstiger Modifikator
					if(isNaN(parseInt(FKR.misc)))
					{
						debugLog(caller, "Sonstiger Modifikator keine gültige Zahl. Berechnungen abgebrochen.");
						safeSetAttrs({fkr_sonstiges_final: "!"});
						return;
					}
					mod_gesamt.misc = parseInt(FKR.misc);
					if(isNaN(parseInt(FKR.misc_ansage)))
					{
						debugLog(caller, "Sonstige Ansage keine gültige Zahl. Berechnungen abgebrochen.");
						safeSetAttrs({fkr_sonstiges_final: "!"});
						return;
					}
					if(parseInt(FKR.misc_ansage) < 0)
					{
						debugLog(caller, "Sonstige Ansage kleiner null. Berechnungen abgebrochen.");
						safeSetAttrs({fkr_sonstiges_final: "!"});
						return;
					}
					mod_gesamt.misc_ansage = parseInt(FKR.misc_ansage);
					safeSetAttrs({fkr_sonstiges_final: prettifyMod(parseInt(FKR.misc) + parseInt(FKR.misc_ansage))});

					// Ergebnisse anzeigen
					debugLog(caller, "mod_gesamt: ", JSON.stringify(mod_gesamt));
					debugLog(caller, "dauer_gesamt: ", JSON.stringify(dauer_gesamt));
					debugLog(caller, "TP_gesamt: ", JSON.stringify(TP_gesamt));
					var ergebnis = {};
					ergebnis.mod = 0;
					if(mod_gesamt.groesse != "-") ergebnis.mod += mod_gesamt.groesse;
					if(mod_gesamt.abstand != "-") ergebnis.mod += mod_gesamt.abstand;
					if(mod_gesamt.wetter != "-") ergebnis.mod += mod_gesamt.wetter;
					if(mod_gesamt.licht != "-") ergebnis.mod += mod_gesamt.licht;
					if(mod_gesamt.deckung != "-") ergebnis.mod += mod_gesamt.deckung;
					if(mod_gesamt.schuss != "-") ergebnis.mod += mod_gesamt.schuss;
					if(mod_gesamt.zielen != "-") ergebnis.mod += mod_gesamt.zielen;
					if(mod_gesamt.nr != "-") ergebnis.mod += mod_gesamt.nr;
					if(mod_gesamt.steil != "-") ergebnis.mod += mod_gesamt.steil;
					if(mod_gesamt.ort != "-") ergebnis.mod += mod_gesamt.ort;
					if(mod_gesamt.bewegung != "-") ergebnis.mod += mod_gesamt.bewegung;
					if(mod_gesamt.getuemmel != "-") ergebnis.mod += mod_gesamt.getuemmel;
					if(mod_gesamt.misc != "-") ergebnis.mod += mod_gesamt.misc;
					if(mod_gesamt.misc_ansage != "-") ergebnis.mod += mod_gesamt.misc_ansage;
					ergebnis.mod_ohne_getuemmel = 0;
					if(mod_gesamt.getuemmel != "-")
					{
						ergebnis.mod_ohne_getuemmel = ergebnis.mod - mod_gesamt.getuemmel;
					} else {
						ergebnis.mod_ohne_getuemmel = ergebnis.mod;
					}

					ergebnis.ansage = 0;
					if(GUIansage == "off" || GUIgezielt2b == "off" || GUIgezielt4b == "off")
					{
						if(mod_gesamt.schuss != "-") ergebnis.ansage += mod_gesamt.schuss;
					}
					if(mod_gesamt.misc_ansage != "-") ergebnis.ansage += mod_gesamt.misc_ansage;

					ergebnis.dauer = 0;
					if(dauer_gesamt.fkw != "-") ergebnis.dauer += dauer_gesamt.fkw;
					if(dauer_gesamt.schuss != "-") ergebnis.dauer += dauer_gesamt.schuss;
					if(dauer_gesamt.zielen != "-") ergebnis.dauer += dauer_gesamt.zielen;

					ergebnis.tp = {w6: 0, mod: 0, modsign: "+"};
					ergebnis.tp.w6 = TP_gesamt.fkw.Anzahl_W6;
					ergebnis.tp.mod = TP_gesamt.fkw.Bonus;
					if(TP_gesamt.abstand != "-") ergebnis.tp.mod += TP_gesamt.abstand;
					if(TP_gesamt.schuss != "-") ergebnis.tp.mod += TP_gesamt.schuss;
					if(TP_gesamt.steil != "-") ergebnis.tp.mod += TP_gesamt.steil;
					// Vorzeichen, um "1W6 + -9" zu verhindern; echtes Minuszeichen benutzt
					ergebnis.tp.mod < 0 ? ergebnis.tp.modsign = "−" : ergebnis.tp.modsign = "+";

					if(GUIgezielt2b == "off")
					{
						ergebnis.tp.roll = "&{template:DSA-Kampf-Treffer-gezielt} {{name=Fernkampf}} {{target="
							 + getTargetZoneName(FKR.schuss.gezielt2bzone)
							 + "}} {{damage=[[[[(@{FTP_W_Aktiv})]]d6 + (@{FTP_Bonus_Aktiv})]]}}";
					} else if (GUIgezielt4b == "off") {
						ergebnis.tp.roll = "&{template:DSA-Kampf-Treffer-gezielt} {{name=Fernkampf}} {{target="
							 + getTargetZoneName(FKR.schuss.gezielt4bzone)
							 + "}} {{damage=[[[[(@{FTP_W_Aktiv})]]d6 + (@{FTP_Bonus_Aktiv})]]}}";
					} else {
						// Zufällige Trefferzone
						ergebnis.tp.roll = "&{template:DSA-Kampf-Treffer} {{name=Fernkampf}} {{target=[[?{Tabelle für zufällige Trefferzone auswählen|Zweibeiner gegen unbeschwänzten Zweibeiner,0|Zweibeiner gegen beschwänzten Zweibeiner,1|Zweibeiner gegen Vierbeiner,3|Zweibeiner gegen Reiter,4|Reiter gegen Zweibeiner,2}]]}} {{TPArt=[[0]]}} {{zone=[[1d20]]}} {{damage=[[[[(@{FTP_W_Aktiv})]]d6 + (@{FTP_Bonus_Aktiv})]]}}";
					}

					debugLog(caller, "ergebnis.mod: ", ergebnis.mod,
						"; ergebnis.mod_ohne_getuemmel: ", ergebnis.mod_ohne_getuemmel,
						"; ergebnis.dauer: ", ergebnis.dauer,
						"; ergebnis.tp.w6: ", ergebnis.tp.w6,
						"; ergebnis.tp.modsign: ", ergebnis.tp.modsign,
						"; ergebnis.tp.mod: ", ergebnis.tp.mod);
					safeSetAttrs({
							fkr_erschwernis_gesamt: ergebnis.mod,
							fkr_erschwernis_ansage_gesamt: ergebnis.ansage,
							fkr_erschwernis_ohne_kampfgetuemmel: ergebnis.mod_ohne_getuemmel,
							fkr_kampfgetuemmel_ziele: zielekampfgetuemmel,
							fk_tp_roll: ergebnis.tp.roll,
							ftp_w_aktiv: ergebnis.tp.w6,
							ftp_bonus_aktiv: ergebnis.tp.mod,

							fkr_erschwernis_gesamt_anzeige: prettifyMod(ergebnis.mod),
							fkr_erschwernis_ansage_gesamt_anzeige: " (" + prettifyMod(ergebnis.ansage) + ")",
							fkr_erschwernis_ohne_kampfgetuemmel_anzeige: prettifyMod(ergebnis.mod_ohne_getuemmel),
							fkr_dauer: String(ergebnis.dauer) + " A",
							fkr_tp: String(ergebnis.tp.w6) + "W6 " + String(ergebnis.tp.modsign) + " " + String(Math.abs(ergebnis.tp.mod)),
					});

				} else if (activeCount > 1) {
					debugLog(caller, 'Mehr als eine aktive Fernkampfwaffe gewählt. Fernkampfrechner deaktiviert.');
					deactivateRCC();
				} else {
					debugLog(caller, 'Dieser Fall sollte niemals eintreten. Weniger als keine oder mehr als vier aktive Fernkampfwaffen gewählt. Fernkampfrechner deaktiviert.');
					deactivateRCC();
				}
			}
		);
	}
);

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

on("change:repeating_gaben:name_gabe change:repeating_gaben:name_gabe_zusatz", function(eventInfo) {
    safeGetAttrs(["repeating_Gaben_Name_Gabe", "repeating_Gaben_Name_Gabe_Zusatz"], function(v) {
        let gabe = v.repeating_Gaben_Name_Gabe;
        let gabeZusatz = v.repeating_Gaben_Name_Gabe_Zusatz;
        let gaben = {
            "empathie": [ ["mu", "in", "in"], "Empathie" ],
            "gefahreninstinkt": [ ["kl", "in", "in"], "Gefahreninstinkt" ],
            "geraeuschhexerei": [ ["in", "ch", "ko"], "Geräuschhexerei" ],
            "kraefteschub/talentschub": [ ["mu", "in", "ko"], "Kräfteschub/Talentschub" ],
            "magiegespuer": [ ["mu", "in", "in"], "Magiegespür" ],
            "prophezeien": [ ["in", "in", "ch"], "Prophezeien" ],
            "tierempathie": [ ["mu", "in", "ch"], "Tierempathie" ],
            "zwergennase": [ ["in", "in", "ff"], "Zwergennase" ]
        };
        if (gabe != "nothing") {
            let update = {
                'repeating_Gaben_eigenschaft1': gaben[gabe][0][0],
                'repeating_Gaben_eigenschaft2': gaben[gabe][0][1],
                'repeating_Gaben_eigenschaft3': gaben[gabe][0][2],
                'repeating_Gaben_Name_Gabe_Anzeige': gaben[gabe][1]
            };
            if (gabeZusatz != "") {
                update['repeating_Gaben_Name_Gabe_Anzeige'] += " (" + gabeZusatz + ")";
            }
            safeSetAttrs(update);
        } else {
            let update = {};
            if(gabeZusatz !== "") {
                update['repeating_Gaben_Name_Gabe_Anzeige'] = gabeZusatz;
            } else {
                update['repeating_Gaben_Name_Gabe_Anzeige'] = "Eigene Gabe";
            }
            safeSetAttrs(update);
        }
    });
});

on("change:repeating_metatalente201904:name_metatalent change:repeating_metatalente201904:name_metatalent_eigen", function(eventInfo) {
    safeGetAttrs(["repeating_Metatalente201904_Name_Metatalent", "repeating_Metatalente201904_Name_Metatalent_Eigen"], function(v) {
        let metatalent = v.repeating_Metatalente201904_Name_Metatalent;
        let metatalentEigen = v.repeating_Metatalente201904_Name_Metatalent_Eigen;
        let metatalente = {
            "ansitzjagd": [ ["mu", "in", "ge"], "Ansitzjagd" ],
            "hetzjagd": [ ["mu", "in", "ge"], "Hetzjagd" ],
            "kraeutersuchen": [ ["mu", "in", "ff"], "Kräutersuchen" ],
            "nahrungsammeln": [ ["mu", "in", "ff"], "Nahrungsammeln" ],
            "pirschjagd": [ ["mu", "in", "ge"], "Pirschjagd" ],
            "speerfischen": [ ["mu", "in", "ge"], "Speerfischen" ],
            "tierfallenstellen": [ ["kl", "in", "ff"], "Tierfallenstellen" ],
            "wachehalten": [ ["mu", "in", "ko"], "Wachehalten" ]
        };
        if (metatalent != "nothing")  {
            safeSetAttrs({
                'repeating_Metatalente201904_eigenschaft1': metatalente[metatalent][0][0],
                'repeating_Metatalente201904_eigenschaft2': metatalente[metatalent][0][1],
                'repeating_Metatalente201904_eigenschaft3': metatalente[metatalent][0][2],
                'repeating_Metatalente201904_Name_Metatalent_Anzeige': metatalente[metatalent][1]
            });
        } else {
            let update = {};
            if (metatalentEigen != "") {
                update['repeating_metatalent_Name_Metatalent_Anzeige'] = metatalentEigen;
            } else {
                update['repeating_metatalent_Name_Metatalent_Anzeige'] = "Eigenes Metatalent";
            }
            safeSetAttrs(update);
        }
    });
});

on("change:repeating_gaben:eigenschaft1 change:repeating_gaben:eigenschaft2 change:repeating_gaben:eigenschaft3", function(eventInfo) {
    safeGetAttrs(["repeating_Gaben_eigenschaft1", "repeating_Gaben_eigenschaft2", "repeating_Gaben_eigenschaft3", "mu", "kl", "in", "ch", "ff", "ge", "ko", "kk"], function(v) {
            let attributes = {"mu": +v.mu, "kl": +v.kl, "in": +v.in, "ch": +v.ch, "ff": +v.ff, "ge": +v.ge, "ko": +v.ko, "kk": +v.kk};
            safeSetAttrs({
                'repeating_Gaben_hiddeneigenschaft1': attributes[v.repeating_Gaben_eigenschaft1] || 0,
                'repeating_Gaben_hiddeneigenschaft2': attributes[v.repeating_Gaben_eigenschaft2] || 0,
                'repeating_Gaben_hiddeneigenschaft3': attributes[v.repeating_Gaben_eigenschaft3] || 0
            });
    });
});

on("change:repeating_metatalente201904:eigenschaft1 change:repeating_metatalente201904:eigenschaft2 change:repeating_metatalente201904:eigenschaft3", function(eventInfo) {
    safeGetAttrs(["repeating_Metatalente201904_eigenschaft1", "repeating_Metatalente201904_eigenschaft2", "repeating_Metatalente201904_eigenschaft3", "mu", "kl", "in", "ch", "ff", "ge", "ko", "kk"], function(v) {
            let attributes = {"mu": +v.mu, "kl": +v.kl, "in": +v.in, "ch": +v.ch, "ff": +v.ff, "ge": +v.ge, "ko": +v.ko, "kk": +v.kk};
            safeSetAttrs({
                'repeating_Metatalente201904_hiddeneigenschaft1': attributes[v.repeating_Metatalente201904_eigenschaft1] || 0,
                'repeating_Metatalente201904_hiddeneigenschaft2': attributes[v.repeating_Metatalente201904_eigenschaft2] || 0,
                'repeating_Metatalente201904_hiddeneigenschaft3': attributes[v.repeating_Metatalente201904_eigenschaft3] || 0
            });
    });
});

on("change:mu change:kl change:in change:ch change:ff change:ge change:ko change:kk", function(eventInfo) {
    // Aktualisiere Talentwerte
    safeGetAttrs(["mu", "kl", "in", "ch", "ff", "ge", "ko", "kk"], function(v) {
        let attributes = {"mu": +v.mu, "kl": +v.kl, "in": +v.in, "ch": +v.ch, "ff": +v.ff, "ge": +v.ge, "ko": +v.ko, "kk": +v.kk};
        let update = {};

        // Aktualisiere Gaben
        getSectionIDs("gaben", function(idarray) {
             _.each(idarray, function(currentID, i) {
                safeGetAttrs(["repeating_Gaben_" + currentID + "_eigenschaft1", "repeating_Gaben_" + currentID + "_eigenschaft2", "repeating_Gaben_" + currentID + "_eigenschaft3"], function(v) {
                    update["repeating_Gaben_" + currentID + "_hiddeneigenschaft1"] = attributes[v["repeating_Gaben_" + currentID + "_eigenschaft1"]];
                    update["repeating_Gaben_" + currentID + "_hiddeneigenschaft2"] = attributes[v["repeating_Gaben_" + currentID + "_eigenschaft2"]];
                    update["repeating_Gaben_" + currentID + "_hiddeneigenschaft3"] = attributes[v["repeating_Gaben_" + currentID + "_eigenschaft3"]];
                    safeSetAttrs(update);
                });
            });
        });

        // Aktualisiere Metatalente
        getSectionIDs("metatalente201904", function(idarray) {
             _.each(idarray, function(currentID, i) {
                safeGetAttrs(["repeating_Metatalente201904_" + currentID + "_eigenschaft1", "repeating_Metatalente201904_" + currentID + "_eigenschaft2", "repeating_Metatalente201904_" + currentID + "_eigenschaft3"], function(v) {
                    update["repeating_Metatalente201904_" + currentID + "_hiddeneigenschaft1"] = attributes[v["repeating_Metatalente201904_" + currentID + "_eigenschaft1"]];
                    update["repeating_Metatalente201904_" + currentID + "_hiddeneigenschaft2"] = attributes[v["repeating_Metatalente201904_" + currentID + "_eigenschaft2"]];
                    update["repeating_Metatalente201904_" + currentID + "_hiddeneigenschaft3"] = attributes[v["repeating_Metatalente201904_" + currentID + "_eigenschaft3"]];
                    safeSetAttrs(update);
                });
            });
        });
    });
});

on(
"change:safe-sheet-open " +
"change:n_tollpatsch " +
"change:n_wildemagie", function(eventInfo) {
	var caller = "Action Listener (Crit Level Updater)";
	var trigger = eventInfo["triggerName"];
	var newValue = eventInfo["newValue"];
	const attrsToGet = [
		"n_tollpatsch",
		"n_wildemagie"
	];
	safeGetAttrs(attrsToGet, function(v) {
		var results = calcCritLevels({'Tollpatsch': v['n_tollpatsch'], 'wilde Magie': v['n_wildemagie']});
		var attrsToChange = {
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
		safeSetAttrs(attrsToChange);
	});
});

on(
"change:safe-sheet-open " +
"change:v_festematrix " +
"change:n_spruchhemmung " +
"change:n_wildemagie", function(eventInfo) {
	var caller = "Action Listener (Firm Matrix/Spell Inhibition/Clumsy Fellow/Wild Magic)";
	const attrsToGet = [
		"v_festematrix",
		"n_spruchhemmung",
		"n_wildemagie"
	];

	safeGetAttrs(attrsToGet, function(v) {
		var trigger = eventInfo["sourceAttribute"];
		var newValue = eventInfo["newValue"];
		var festeMatrix = v["v_festematrix"];
		var spruchhemmung = v["n_spruchhemmung"];
		var wildeMagie = v["n_wildemagie"];

		var attrsToChange = {};
		// Firm Matrix cannot be taken with either Spell Inhibition or Wild Magic
		if (trigger === "v_festematrix" && newValue === "1")
		{
			attrsToChange["n_spruchhemmung"] = "0";
			attrsToChange["n_wildemagie"] = "0";
		}
		if (
			(trigger === "n_spruchhemmung" || trigger === "n_wildemagie")
			&&
			newValue === "1"
		)
		{
			attrsToChange["v_festematrix"] = "0";
		}

		// If this is triggered by sheet opening and we find an impossible situation, rectify it.
		if (trigger === "safe-sheet-open" && festeMatrix === "1")
		{
			if (
				(spruchhemmung === "1" && wildeMagie === "0") ||
				(spruchhemmung === "0" && wildeMagie === "1")
			)
			{
				attrsToChange["n_spruchhemmung"] = "0";
				attrsToChange["n_wildemagie"] = "0";
			} else if (spruchhemmung === "1" && wildeMagie === "1")
			{
				attrsToChange["v_festematrix"] = "0";
			}
		}

		if (
			!(
				Object.keys(attrsToChange).length === 0 &&
				Object.getPrototypeOf(attrsToChange) === Object.prototype
			)
		)
		{
			safeSetAttrs(attrsToChange);
		}
	});
});

on("change:ap_gesamt change:ap_ausgegeben", function(eventInfo) {
    safeGetAttrs(["ap_gesamt", "ap_ausgegeben"], function(v) {
        safeSetAttrs({
            ap_verfuegbar: +v.ap_gesamt - +v.ap_ausgegeben
        });
    });
});

on("change:kegrundw change:kezugek", function(eventInfo) {
    safeGetAttrs(["kegrundw", "kezugek"], function(v) {
        safeSetAttrs({
            "KE_max": +v.kegrundw + +v.kezugek
        });
    });
});

/*
# Old Data Conversion
Always try to migrate as much data as possible

Relevant character sheet versions
* 20171014: last version before sheet worker scripts conversion
* 20200809: new repeating sections for meta-talents and gifts
*           shields and parry weapons. AT- and PA value calculation using sheet workers
*           migrates BE calculation to sheetworkers
*           weapon BE calculation: attack and parry values for weapons and shields are affected by the eBE
* 20210413: shield attack
*           INI mod from main weapon
*           wound mods
* 20210718: Reorganisation of encumbrance
* 20211010: Clearer attribute names for life energy, astral energy etc.
* 20220116: New roll buttons
* 20220604: Visibili Vanitar spelling fixes
* 20220821: Sheet Initialization
* 20230618: Confirmation/Reaction Buttons
*/
function migrationCheck() {
    safeGetAttrs(["character_sheet_version", "data_version", "sheet_initialized"], function(v) {
        var caller = "migrationCheck";
        debugLog(caller, "Sheet Initialization Status:", v["sheet_initialized"]);
        debugLog(caller, "Checking versions before attempting data migration: Character sheet version is", v["character_sheet_version"], "and data version is", v["data_version"]);

        let initialized = v["sheet_initialized"];
        let dataVersion = parseInt(v["data_version"]);
        let sheetVersion = parseInt(v["character_sheet_version"]);

        /*
        If the character is new, data_version (the attribute) is just an empty string and dataVersion (the variable declared in this function) is NaN.
        New characters do not need any migration, but sheet initialization to set up the sheet including setting data_version to the current sheet version.

        Why this is necessary
        * Sheet-defined attributes such as data_version will change automatically if they are different in a new sheet version.
        * Once a sheet-defined attribute is changed e. g. via setAttrs(), the value will not change with new sheet version.
        * If a character was not opened for a long time (before data_version was set via script), the character's data version will update when the value is changed in a new sheet
        * This would lead to no migrations being performed.
        * On the other hand data_version could be left at its initial value, but that would mean that every new character would get all migrations unnecessarily!
        */

        // Initialization First Safeguard Check (function not called based on one attribute)
        if (
            initialized === 0
            ||
            initialized === "0"
            ||
            initialized === "false"
            ||
            initialized === false
        ) {
            debugLog(caller, "initialized is false.");
            initialized = false;
        } else {
            debugLog(caller, "initialized is true. Skipping initialization.");
            initialized = true;
        }

        let functionsToCall = [];
        let firstFunction;

		if (initialized)
		{
            /*
                we run over the possible migrations and check if they are already applied.
                if not and it is the first migration, than the function name is saved as "firstFunction"
                if it is not the first migration to apply it is added to "functionsToCall" array
            */
            for (version of versionsWithMigrations) {
                if (dataVersion < version) {
                    var functionName = "migrateTo" + version;
                    debugLog(caller, "dataVersion " + dataVersion + " is older than version " + version + " which needs a migration. Invoking migration function: " + functionName);
                    if (firstFunction) {
                        functionsToCall.push(functionName);
                    } else {
                        firstFunction = functionName;
                    }
                };
            }
        } else {
			firstFunction = "initializeSheet";
        }

        // if there is at least one migration to do we add "setCurrentVersion" to the end of the function list which is responsible to set the current dataversion
        // then we call the function with name "firstFunction"
        if (firstFunction) {
            functionsToCall.push("setCurrentVersion");
            window[firstFunction](functionsToCall);
        }
    });
}

function setCurrentVersion() {
	var currentVersion = versionsWithMigrations.slice(-1).pop();
	safeSetAttrs({ "data_version": currentVersion });
}

function callNextMigration(migrationChain) {
    if (migrationChain && migrationChain.length > 0) {
        let nextMigration = migrationChain.shift();
        if (nextMigration) {
            window[nextMigration](migrationChain);
        }
    }
}

/*
 this list has to be always ordered ascending in order to apply the migration steps in the correct order
*/
var versionsWithMigrations = [
    20190427,
    20200809,
    20210413,
    20210718,
    20211010,
    20220116,
    20220604,
    20220821,
    20230618
];

function initializeSheet(migrationChain) {
	var caller = "initializeSheet";
	debugLog(caller, "Initializing sheet ...");
	var attrsToInit = [
		// Stats and derived values
		"MU", "IN", "KL", "CH", "FF", "GE", "KO", "KK", "GS",
		"legrundw", "LE_max",
		"AU_max", "ausgrundw", "aus_max",
		"erschoepfung_basis", "erschoepfung_max",
		"ueberanstrengung_max",
		"mrgrundw", "MR", "wundschwelle",
		"AE_max", "aspgrundw", "asp_max",
		"KE_max",
		"ap_verfuegbar",

		// Rolls
		"cs_kampf_at", "cs_kampf_fk", "cs_kampf_pa", "cs_ritual", "cs_talent", "cs_zauber",
		"cf_kampf_at", "cf_kampf_fk", "cf_kampf_pa", "cf_ritual", "cf_talent", "cf_zauber",

		// Combat
		/// Melee AT Values
		"AT_Aktiv", "AT_Aktiv_TaW", "atbasis",
		"AT_Anderthalbhander", "AT_dolche", "AT_fechtwaffen", "AT_hiebwaffen", "AT_infanteriewaffen", "AT_kettenstabe", "AT_kettenwaffen", "AT_lanzenreiten", "AT_peitsche", "AT_raufen", "AT_ringen", "AT_sabel", "AT_schwerter", "AT_speere", "AT_stabe", "AT_zweihandflegel", "AT_zweihand-hiebwaffen", "AT_zweihandschwerter",

		/// Melee PA Values
		"PA_Aktiv", "PA_Aktiv_TaW", "pabasis",
		"PA_Anderthalbhander", "PA_dolche", "PA_fechtwaffen", "PA_hiebwaffen", "PA_infanteriewaffen", "PA_kettenstabe", "PA_kettenwaffen", "PA_lanzenreiten", "PA_peitsche", "PA_raufen", "PA_ringen", "PA_sabel", "PA_schwerter", "PA_speere", "PA_stabe", "PA_zweihandflegel", "PA_zweihand-hiebwaffen", "PA_zweihandschwerter",

		/// Melee other
		"NKW_Aktiv1", "NKW_Aktiv2", "NKW_Aktiv3", "NKW_Aktiv4",
		"NKW1_SB", "NKW2_SB", "NKW3_SB", "NKW4_SB",
		"TP_W_Aktiv", "TP_Bonus_Aktiv",
		"k_mod_left_hand",

		/// Ranged Combat
		"FK_Aktiv", "fkbasis",
		"AT_Armbrust", "AT_Belagerungswaffen", "AT_Blasrohr", "AT_Bogen", "AT_Diskus", "AT_peitsche", "AT_Schleuder", "AT_Wurfbeile", "AT_Wurfmesser", "AT_Wurfspeere",
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
		"wound_bauch", "wound_brust", "wound_kopf", "wound_la", "wound_lb", "wound_ra", "wound_rb"
	];
	// Initialization Second Safeguard Check (function not called based on sixteen attributes and data_version)
	// These attributes have been picked, because no character generated according to the official rules will have all their attributes at 8, so comparing these attributes will almost guarantee that old sheets are correctly detected and no initialization will take place.
	// The mod attributes are also checked in case a player erroneously used the mod attributes to try to change their base values.
	const attrStems = [ "MU", "KL", "IN", "CH", "FF", "GE", "KO", "KK" ];
	const attrExtensions = [ "Basis", "Mod" ];
	defaults = { "Basis": 8, "Mod": 0 };

	safeguardAttrs = [];
	for ( stem of attrStems )
	{
		for ( ext of attrExtensions )
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
				for ( attr of safeguardAttrs )
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
					for ( attr of safeguardAttrs )
					{
						for ( ext of attrExtensions )
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
					for ( attr of attrsToInit )
					{
						attrs[attr] = defaultValues[attr];
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

/*
## From version 20171014 to 20190427
* Gifts and meta-talents were changed
*/
function migrateTo20190427 (migrationChain) {
	var caller = "migrateTo20190427";
    debugLog(caller, "migrateTo20190427 invoked");

    getSectionIDs("GabenTalente", function(gabenIDs) {
        getSectionIDs("MetaTalente", function(metatalenteIDs) {

            let giftsConversion = {
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

            let metaTalentConversion = {
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
                "Wachehalten": "wachehalten"
            };
                
            let gaben = {
                "nothing": [ ["---", "---", "---"], "nothing" ],
                "empathie": [ ["mu", "in", "in"], "Empathie" ],
                "gefahreninstinkt": [ ["kl", "in", "in"], "Gefahreninstinkt" ],
                "geraeuschhexerei": [ ["in", "ch", "ko"], "Geräuschhexerei" ],
                "kraefteschub/talentschub": [ ["mu", "in", "ko"], "Kräfteschub/Talentschub" ],
                "magiegespuer": [ ["mu", "in", "in"], "Magiegespür" ],
                "prophezeien": [ ["in", "in", "ch"], "Prophezeien" ],
                "tierempathie": [ ["mu", "in", "ch"], "Tierempathie" ],
                "zwergennase": [ ["in", "in", "ff"], "Zwergennase" ]
            };
                
            let metatalente = {
                "nothing": [ ["---", "---", "---"], "nothing" ],
                "ansitzjagd": [ ["mu", "in", "ge"], "Ansitzjagd" ],
                "hetzjagd": [ ["mu", "in", "ge"], "Hetzjagd" ],
                "kraeutersuchen": [ ["mu", "in", "ff"], "Kräutersuchen" ],
                "nahrungsammeln": [ ["mu", "in", "ff"], "Nahrungsammeln" ],
                "pirschjagd": [ ["mu", "in", "ge"], "Pirschjagd" ],
                "speerfischen": [ ["mu", "in", "ge"], "Speerfischen" ],
                "tierfallenstellen": [ ["kl", "in", "ff"], "Tierfallenstellen" ],
                "wachehalten": [ ["mu", "in", "ko"], "Wachehalten" ]
            };

            let attrsToGet = ["mu", "kl", "in", "ch", "ff", "ge", "ko", "kk"];
            // GIFTS MIGRATION
            if(gabenIDs.length == 0) {
                debugLog(caller, "Migration: No gifts found, nothing to migrate.");
            } else {
                debugLog(caller, "Migration: Found old gifts, continuing ...");
                for(var i=0; i < gabenIDs.length; i++) {
                    attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_TalentName");
                    attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_Eigenschaft1");
                    attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_Eigenschaft2");
                    attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_Eigenschaft3");
                    attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_TaW");
                    attrsToGet.push("repeating_GabenTalente_" + gabenIDs[i] + "_SE");
                }
            }

            // META-TALENTS MIGRATION
            if(metatalenteIDs.length == 0) {
                debugLog(caller, "Migration: No meta-talents found, nothing to migrate.");
            } else {
                debugLog(caller, "Migration: Found old meta-talents, continuing ...");
                for(var i=0; i < metatalenteIDs.length; i++) {
                    attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_TalentName");
                    attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_Eigenschaft1");
                    attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_Eigenschaft2");
                    attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_Eigenschaft3");
                    attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_TaW");
                    attrsToGet.push("repeating_MetaTalente_" + metatalenteIDs[i] + "_SE");
                }
            }

            // Gaben
            safeGetAttrs(
                attrsToGet, function(v) {
                    debugLog(caller, v);
                    let defaultGiftTaW = 3;
                    let defaultMetaTaW = 0;
                    let update = {};
                    for(var i=0; i < gabenIDs.length; i++) {
                        let newrow = generateRowID();
                        let current = gabenIDs[i];
                        let prefixNew = "repeating_Gaben_" + newrow;
                        let prefixOld = "repeating_GabenTalente_" + current;

                        // Gather data
                        // Updating the name will set the stats automatically
                        // To prevent overwriting of custom stats check that the RAW stats are used
                        // Need to check that the three correct ones are used, order irrelevant
                        // Comparison made easy by taking all three stats, sorting them alphabetically and then concatenating them into one string -> simple string comparison will reveal whether the same stats are used (order not important)
                        let gabeStats = gaben[giftsConversion[v[prefixOld + "_TalentName"]]][0].sort().join("");
                        let gabeStatsOld = [giftsConversion[v[prefixOld + "_Eigenschaft1"]], giftsConversion[v[prefixOld + "_Eigenschaft2"]], giftsConversion[v[prefixOld + "_Eigenschaft3"]]].sort().join("");
                        if(gabeStats == gabeStatsOld) {
                            update[prefixNew + "_Name_Gabe"] = giftsConversion[v[prefixOld + "_TalentName"]];
                            update[prefixNew + "_Name_Gabe_Zusatz"] = "";
                        } else {
                            update[prefixNew + "_Name_Gabe_Zusatz"] = "urspr. " + v[prefixOld + "_TalentName"] + "; Eigenschaften für Probe aber nicht Standard. ";
                            debugLog(caller, "Migration: Found old " + v[prefixOld + "_TalentName"] + " containing non-standard stats. No predefined gift set. Old data preserved.");
                        }
                        if(v[prefixOld + "_SE"] == "on") {
                            update[prefixNew + "_Name_Gabe_Zusatz"] += "[x] SE";
                            debugLog(caller, "Migration: Found old " + v[prefixOld + "_TalentName"] + " marked as having a special experience (SE). This data will no longer be kept in the character sheet as it is only relevant for character advancement. Old data preserved. Please move to notes.");
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
                        if(v[prefixOld + "_TaW"] === "") {
                            update[prefixNew + "_TaW"] = defaultGiftTaW;
                        } else {
                            update[prefixNew + "_TaW"] = parseInt(v[prefixOld + "_TaW"]);
                        }
                    }
                    debugLog(caller, update);

                    for(var i=0; i < metatalenteIDs.length; i++) {
                        let newrow = generateRowID();
                        let current = metatalenteIDs[i];
                        let prefixNew = "repeating_Metatalente201904_" + newrow;
                        let prefixOld = "repeating_MetaTalente_" + current;

                        // Gather data
                        // Updating the name will set the stats automatically
                        // To prevent overwriting of custom stats check that the RAW stats are used
                        // Need to check that the three correct ones are used, order irrelevant
                        // Comparison made easy by taking all three stats, sorting them alphabetically and then concatenating them into one string -> simple string comparison will reveal whether the same stats are used (order not important)
                        let metatalentStats = metatalente[metaTalentConversion[v[prefixOld + "_TalentName"]]][0].sort().join("");
                        let metatalentStatsOld = [metaTalentConversion[v[prefixOld + "_Eigenschaft1"]], metaTalentConversion[v[prefixOld + "_Eigenschaft2"]], metaTalentConversion[v[prefixOld + "_Eigenschaft3"]]].sort().join("");
                        if(metatalentStats == metatalentStatsOld) {
                            update[prefixNew + "_Name_Metatalent"] = metaTalentConversion[v[prefixOld + "_TalentName"]];
                            update[prefixNew + "_Name_Metatalent_Eigen"] = "";
                        } else {
                            update[prefixNew + "_Name_Metatalent_Eigen"] = "urspr. " + v[prefixOld + "_TalentName"] + "; Eigenschaften für Probe aber nicht Standard. ";
                            debugLog(caller, "Migration: Found old " + v[prefixOld + "_TalentName"] + " containing non-standard stats. No predefined meta-talent set. Old data preserved.");
                        }
                        if(v[prefixOld + "_SE"] == "on") {
                            update[prefixNew + "_Name_Metatalent_Eigen"] += "[x] SE";
                            debugLog(caller, "Migration: Found old " + v[prefixOld + "_TalentName"] + " marked as having a special experience (SE). This data will no longer be kept in the character sheet as SEs for metatalents are not RAW and they are only relevant for character advancement. Old data preserved. Please move to notes.");
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
                        if(v[prefixOld + "_TaW"] === "") {
                            update[prefixNew + "_TaW"] = defaultMetaTaW;
                        } else {
                            update[prefixNew + "_TaW"] = parseInt(v[prefixOld + "_TaW"]);
                        }
                    }

                    // Create new row
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
	var caller = "migrateTo20200809";
    debugLog(caller, "migrateTo20200809 invoked");

    safeGetAttrs([
            "NKW_Aktiv1", "NKW_Aktiv2", "NKW_Aktiv3", "NKW_Aktiv4", "TaW_peitsche", "ATbasis", 
            "RS_gBE1", "rs1_rg1", "RS_gBE2", "rs2_rg1", "RS_gBE3", "rs3_rg1", "RS_gBE4", "rs4_rg1", 
            "RS_Aktiv1", "RS_Aktiv2", "RS_Aktiv3", "RS_Aktiv4", "BE_RG", "BE_Last", "sf_rustungsgewohnungI", "sf_rustungsgewonungII", "sf_rustungsgewohnungIII",
            "BE_TaW", "NKW_AT_typ1", "NKW_PA_typ1", "NKW_AT_typ2", "NKW_PA_typ2",  
            "NKW_AT_typ3", "NKW_PA_typ3", "NKW_AT_typ4", "NKW_PA_typ4"], function(v) {
        
        var attrsToChange = {};
        var activeCount = 0;
        for (var i = 1; i <= 4; i++) {
            if (v["NKW_Aktiv" + i] === "1") {
                activeCount += 1;
            }
            if (activeCount > 1) {
                attrsToChange["NKW_Aktiv" + i] = "0";
            }
        }
        if (activeCount === 0) {
            attrsToChange["NKW_Aktiv1"] = "1";
        }

        var peitscheAT = 0;
        if (v["TaW_peitsche"]) {
            peitscheAT = parseInt(v["ATbasis"]) + parseInt(v["TaW_peitsche"]);
        }
        attrsToChange["AT_peitsche"] = peitscheAT;

        if (v["sf_rustungsgewonungII"] === "1") {
            attrsToChange["sf_rustungsgewohnungII"] = "1";
        }

        // take calculated values into "v" so that they are available to following computation steps
        Object.assign(v, attrsToChange);

        var calculatedRuestungBE = calculateRuestungBE(v, {});
        // apply calculated values to attrsToChange
        Object.assign(attrsToChange, calculatedRuestungBE);

        var beTaw = 0;
        // take BE_RG from calculated values
        if (calculatedRuestungBE["BE_RG"]) {
            beTaw += parseInt(calculatedRuestungBE["BE_RG"]);
        }
        if (v["BE_Last"]) {
            beTaw += parseInt(v["BE_Last"]);
        }
        attrsToChange["BE_TaW"] = beTaw;
        v["BE_TaW"] = beTaw;

        var weaponBE = calculateWeaponBE(v);
        attrsToChange["be_at_mod"] = weaponBE.be_at;
        attrsToChange["be_pa_mod"] = weaponBE.be_pa;

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
	var caller = "migrateTo20210413";
    debugLog(caller, "migrateTo20210413 invoked");

    safeGetAttrs(["activeShieldRowId"], function(values) {
		var variablesToGet = [
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
			"BE_TaW"
		];
		// Updates for shield attack
		var activeShieldRowId = values["activeShieldRowId"];
    
        // Wenn es ein aktives Schild (oder Parierwaffe) gibt, möchten wir auch dessen Werte mit laden
        if (activeShieldRowId) {
            variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_at_mod");
            variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_pa_mod");
            variablesToGet.push("repeating_shields_" + activeShieldRowId + "_shield_type");
        }

		safeGetAttrs(variablesToGet, function(values) {
			/*
				* KK might be ill-defined right now (NaN)
				* Reason: sheet:opened recalculates KK, but requires KK_mod_wounds
				* KK_mod_wounds is existing at that point
				* Make up our own little KK here for migration purposes
			*/
			values["KK"] = Math.max(0, parseInt(values["KK_Basis"]) + parseInt(values["KK_mod"]));
		    let attrsToChange = {};

		    for (var i = 1; i <= 4; i++) {
		        attrsToChange["NKW" + i + "_SB"] = calculateTpKKModFromValuesAndWeaponNumber(values, i);
		    }

		    let result = calculateShieldAttack(values, activeShieldRowId);

		    attrsToChange["shield_at_mod"] = result.shieldAtMod;
		    attrsToChange["shield_at_available"] = result.shieldAtAvailable;

			// Updates for wound modifiers
			var mods = calculateWoundModifiers(values);
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
			
		    attrsToChange["shield_at"] = Math.max(0, parseInt(values["AT_raufen"]) + parseInt(attrsToChange["AT_mod_wounds"]));

			// Updates for INI modifiers
			// Set INI modifier from (main) weapon
			var weaponini = 0;
			for (weapon = 1; weapon <= 4; weapon++) {
				if (DSAsane(values["INIModNKW" + weapon], "ini-mod-weapon")) {
					debugLog(caller, "INIModNKW" + weapon, "is", values["INIModNKW" + weapon]);
					weaponini = parseInt(values["INIModNKW" + weapon]);
				}
			}
			attrsToChange["INI_mod_hauptwaffe"] = weaponini;

			// Calculate initiative base considering special skills and encumbrance
			var inibasis2 = parseInt(values['inibasis']) + parseInt(values.inizugek) + parseInt(attrsToChange["IB_mod_wounds"]);

			// Kampfreflexe is a prerequisite for the others, so stop if not active
			var IBbonus = 0;
			var INIdicecount = "1";
			if (values.sf_kampfreflexe !== "0" && values.BE_TaW <= 4) {
				IBbonus += 4;
				if (values.sf_kampfgespur !== "0" && values.BE_TaW <= 4) {
					IBbonus += 2;
					if (values.sf_klingentanzer !== "0" && values.BE_TaW <= 2) {
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
	var caller = "migrateTo20210718";
	debugLog(caller, "migrateTo20210718 invoked");
	var func = "migrateTo20210718";

	var requirements = [
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

	var defaultValue = 0;

	safeGetAttrs(requirements, function(values) {
		results = checkRequiredProperties(requirements, values);
		if (results["errors"] >= 1) {
			debugLog(caller, "Missing properties: '" + results["missing"].toString() + "'. Using default values. 0 for 'Ges_BE', 'BE_Last', 'BE_TaW' and 'sf_rustungsgewohnungIII'.");
			for (req of requirements) {
				if (!values.hasOwnProperty(req)) {
					values[req] = defaultValue;
				}
			}
		}
		// Check sanity
		var reqsToCheck = requirements.slice(0,3);
		for (req of reqsToCheck) {
			if (!DSAsane(values[req], "encumbrance")) {
				debugLog(caller, "'" + req + "' not sane, set to default value (" + defaultValue + ").");
				values[req] = defaultValue;
			}
		}
		update = {};
		update["BE_RG"] = parseInt(values["Ges_BE"]);
		update["BE_Last"] = parseInt(values["BE_Last"]);
		update["BE"] = parseInt(values["Ges_BE"]) + parseInt(values["BE_Last"]);
		update["BE_RG_INI"] = calculateRuestungBE(values, {"sourceType": "migration"})["BE_RG_INI"];
		debugLog(caller, "Gathering new values complete:", update);
		safeSetAttrs(update, {}, function() {
			callNextMigration(migrationChain);
		});
	});
}

/*
	Migration steps:
	- Initialize "new" attributes LE to LEAktuell, AU to AusAktuell, AE to ASPAktuell, KE to KEAktuell
*/
function migrateTo20211010(migrationChain) {
	var caller = "migrateTo20211010";
	debugLog(caller, "migrateTo20211010 invoked");

	safeGetAttrs([
			"LEAktuell", "AusAktuell", "ASPAktuell", "KEAktuell"
			], function(v) {

		var attrsToChange = {};
		attrsToChange["LE"] = v["LEAktuell"];
		attrsToChange["AU"] = v["AusAktuell"];
		attrsToChange["AE"] = v["ASPAktuell"];
		attrsToChange["KE"] = v["KEAktuell"];

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
	var caller = "migrateTo20220116";
	debugLog(caller, "Invoked.");

	var results = calcCritLevels({'Tollpatsch': 0, 'wilde Magie': 0});
	var attrsToChange = {
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
	var attrsToGet = ["character_name"];
	var ebeTalents = []
	for(talent of talents_ebe)
	{
		ebeTalents.push(talent + "-ebe");
	}
	for(attr of [].concat(talents, ebeTalents, spells))
	{
		attrsToGet.push(attr + "_action");
	}
	safeGetAttrs(attrsToGet, function(v) {
		for (attr of attrsToGet)
		{
			// No action buttons for character name and combat techniques required
			if (attr.match("t_ka_") || attr === "character_name") continue;
			attrsToChange[attr] = "%{" + v["character_name"] + "|" + attr.replace(/_action$/gm, "") + "-action}";
		}

		attrsToChange["eidsegen_action"] = "%{" + v["character_name"] + "|eidsegen-action}";

		debugLog(caller, attrsToChange);
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
	var caller = "migrateTo20220604";
	debugLog(caller, "Invoked.");

	var attrsToGet = [
		"zauber_visibli",
		"z_visibli_action",
		"Spez_visibli",
		"ZfW_visibli"
	];

	var attrsToChange = {};

	safeGetAttrs(attrsToGet, function(v) {
		for (attr of attrsToGet)
		{
			if (attr.match("visibli"))
			{
				var newAttr = attr.replace(/visibli/gm, "visibili");
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

		debugLog(caller, attrsToChange);
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
	var caller = "migrateTo20220821";
	debugLog(caller, "Invoked.");

	var attrsToChange = { "sheet_initialized": true };
	safeSetAttrs(attrsToChange, {}, function(){
		callNextMigration(migrationChain);
	});
}

/*
	Migration steps:
	- Initialize attributes "AT_Aktiv_TaW", "PA_Aktiv_TaW", "k_mod_left_hand", "parryweapon_at", "TP_W_Aktiv", "TP_Bonus_Aktiv"
*/
function migrateTo20230618(migrationChain) {
	var caller = "migrateTo20230618";
	debugLog(caller, "Invoked.");

	var attrsToChange =	{ "AT_Aktiv_TaW": "0", "PA_Aktiv_TaW": "0", "k_mod_left_hand": 9, "parryweapon_at": 0, "TP_W_Aktiv": 1, "TP_Bonus_Aktiv": 0 };

	const outerAttrsToGet = [
		// Attribute nur für AT_Aktiv_TaW, PA_Aktiv_TaW und parryweapon_at
		"activeShieldRowId"
	];
	safeGetAttrs(outerAttrsToGet, function(outerValues) {
		var innerAttrsToGet = [
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
		var activeShieldRowId = outerValues["activeShieldRowId"];
		if (activeShieldRowId) {
			innerAttrsToGet.push("repeating_shields_" + activeShieldRowId + "_shield_at_mod");
			innerAttrsToGet.push("repeating_shields_" + activeShieldRowId + "_shield_type");
			attrsToChange["repeating_shields_" + activeShieldRowId + "_combat_technique"] = "Dolche";
		}

		safeGetAttrs(innerAttrsToGet, function(innerValues) {
			// AT_Aktiv_TaW, PA_Aktiv_TaW und parryweapon_at
			var weapon = 0;
			if (innerValues["NKW_Aktiv1"] === "1") {
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
				}
			}
			/// AT_Aktiv_TaW
			var ATkampftechnikRaw = innerValues["NKW_AT_typ" + weapon];
			//// AT-Wert nur berechenbar, wenn dahinterstehende Kampftechnik bekannt
			if (ATkampftechnikRaw && ATkampftechnikRaw !== "0") {
				var taw = 0;
				var ATkampftechnik = ATkampftechnikRaw.match("@{AT_(.*)}");

				// Suche nach der richtigen Schreibweise des Attributnamens ...
				taw = parseInt(innerValues["TaW_" + ATkampftechnik[1]]);
				if (isNaN(taw)) {
					taw = parseInt(innerValues["TaW_" + ATkampftechnik[1].toLowerCase()]);
				}
				attrsToChange["AT_Aktiv_TaW"] = taw;
			}

			/// PA_Aktiv_TaW
			var PAkampftechnikRaw = innerValues["NKW_PA_typ" + weapon];
			//// Wir berechnen den PA Wert nur, wenn ein Talenttyp für den PA Wert der Waffe ausgewählt ist
			if (PAkampftechnikRaw && PAkampftechnikRaw !== "0" ) {
				var taw = 0;
				var PAkampftechnik = PAkampftechnikRaw.match("@{PA_(.*)}");

				// Suche nach der richtigen Schreibweise des Attributnamens ...
				taw = parseInt(innerValues["TaW_" + PAkampftechnik[1]]);
				if (isNaN(taw)) {
					taw = parseInt(innerValues["TaW_" + PAkampftechnik[1].toLowerCase()]);
				}
				attrsToChange["PA_Aktiv_TaW"] = taw;
			}

			/// parryweapon_at
			if (activeShieldRowId) {
				var linkhand = innerValues["sf_linkhand"];
				if (innerValues["repeating_shields_" + activeShieldRowId + "_shield_type"] === "parryweapon") {
					// Parierwaffen-AT besteht aus: AT der Kampftechnik + AT-WM der Waffe + Wundmod. + BE-Mod
					var parryWeaponCombatTechnique = "Dolche";
					if (DSAsane(parryWeaponCombatTechnique, "melee-combat-technique")) {
						var AT = 0;

						// Suche nach der richtigen Schreibweise des Attributnamens ...
						AT = parseInt(innerValues["AT_" + parryWeaponCombatTechnique]);
						if (isNaN(AT)) {
							AT = parseInt(innerValues["AT_" + parryWeaponCombatTechnique.toLowerCase()])
						}

						var atMod = parseInt(innerValues["repeating_shields_" + activeShieldRowId + "_shield_at_mod"]);

						var atValue =
							AT + atMod
							+ innerValues["AT_mod_wounds"]
							- parseInt(innerValues["be_at_mod"]);
						attrsToChange["parryweapon_at"] = atValue;
					}
				}
			}

			// TP-Würfelattribute
			/// TP_W_Aktiv
			var weapon = 0;
			if (innerValues["NKW_Aktiv1"] === "1") {
				weapon = "1";
			} else if (innerValues["NKW_Aktiv2"] === "1") {
				weapon = "2";
			} else if (innerValues["NKW_Aktiv3"] === "1") {
				weapon = "3";
			} else if (innerValues["NKW_Aktiv4"] === "1") {
				weapon = "4";
			}

			var diceCountAttr = "NKWschaden" + weapon + "_1";
			var diceCount = parseInt(innerValues[diceCountAttr]);

			if (isNaN(diceCount)) {
				debugLog(func, "Invalid number gotten for attribute", diceCountAttr + ":", innerValues[diceCountAttr] + ". Setting to 1.");
				diceCount = 1;
			}

			attrsToChange["TP_W_Aktiv"] = diceCount;

			/// TP_Bonus_Aktiv
			var weapon = 0;
			if (innerValues["NKW_Aktiv1"] === "1") {
				weapon = "1";
			} else if (innerValues["NKW_Aktiv2"] === "1") {
				weapon = "2";
			} else if (innerValues["NKW_Aktiv3"] === "1") {
				weapon = "3";
			} else if (innerValues["NKW_Aktiv4"] === "1") {
				weapon = "4";
			}

			var damageAttr = "NKWschaden" + weapon + "_2";
			var bonusAttr = "NKW" + weapon + "_SB";
			var damage = parseInt(innerValues[damageAttr]);
			var bonus = parseInt(innerValues[bonusAttr]);

			if (isNaN(damage)) {
				debugLog(func, "Invalid number gotten for attribute", damageAttr + ":", innerValues[damageAttr] + ". Setting to 0.");
				damage = 0;
			}
			if (isNaN(bonus)) {
				debugLog(func, "Invalid number gotten for attribute", bonusAttr + ":", innerValues[bonusAttr] + ". Setting to 0.");
				bonus = 0;
			}

			attrsToChange["TP_Bonus_Aktiv"] = damage + bonus;

			// k_mod_left_hand
			const ambidextrous = innerValues["vorteil_beidhaendig"];
			const lefthandedFighting = innerValues["sf_linkhand"];
			const ambidextrousFighting1 = innerValues["sf_beidhandigerkampfI"];
			const ambidextrousFighting2 = innerValues["sf_beidhandigerkampfII"];

			/// Advantage trumps the two lower special skills and is on par with the highest special skill
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
			debugLog(caller, attrsToChange);
			safeSetAttrs(attrsToChange, {}, function(){
				callNextMigration(migrationChain);
			});
		});
	});
}

on("sheet:opened", function() {
    migrationCheck();
    safeSetAttrs({ "safe-sheet-open": Date.now() });
});

/*
Handle (de)activation of shields/parry weapons

There are two possible results: one and only one active shield; no active shield.
We need to make sure that the right thing™ is done
*/
on("change:repeating_shields:shield_active", function(eventInfo) {
	var caller = "???";
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
        for(id of idarray) {
            attrsToGet.push(prefix + id + suffix);
        }

        // Get the attributes
        safeGetAttrs( attrsToGet, function(shieldActiveStates) {
            var activeShields = [];
            var activeShieldRowId = "";

            for (attr of attrsToGet) {
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
                    for (activeShield of activeShields) {
                        if (activeShield !== sourceShield) {
                            attrsToChange[ activeShield ] = 0;
                        }
                    }
                } else {
                // If one shield got deactivated and there is another active shield, keep one and only one shield. (This case should not happen.)
                    debugLog(caller, "Impossible case triggered: One shield deactivated and more than one active shield remaining. Deactivating all but the first active shield.");
                    activeShieldRowId = extractRowId(activeShields[0]);
                    for (var i = 1; i < activeShields.length; i++) {
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
"change:taw_anderthalbhander change:taw_dolche change:taw_fechtwaffen " +
"change:taw_hiebwaffen change:taw_infanteriewaffen change:taw_kettenstabe " +
"change:taw_kettenwaffen change:taw_lanzenreiten change:taw_peitsche " +
"change:taw_raufen change:taw_ringen change:taw_sabel change:taw_schwerter " +
"change:taw_speere change:taw_stabe change:taw_zweihandflegel " +
"change:taw_zweihand-hiebwaffen change:taw_zweihandschwerter " +
"change:at_anderthalbhander change:at_dolche change:at_fechtwaffen change:at_hiebwaffen " +
"change:at_infanteriewaffen change:at_kettenstabe change:at_kettenwaffen " +
"change:at_lanzenreiten change:at_peitsche change:at_raufen change:at_ringen change:at_sabel " +
"change:at_schwerter change:at_speere change:at_stabe change:at_zweihandflegel " +
"change:at_zweihand-hiebwaffen change:at_zweihandschwerter " +
"change:pabasis " +
"change:pa_anderthalbhander change:pa_dolche change:pa_fechtwaffen change:pa_hiebwaffen " +
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

// Wird eine Nahkampfwaffe aktiviert, werden alle anderen deaktiviert. Auf diese Weise wird sichergestellt, dass immer maximal eine Nahkampfwaffe aktiv ist.
// Funktionsweise siehe Methode unten zum deaktivieren der Schilde
on("change:nkw_aktiv1 change:nkw_aktiv2 change:nkw_aktiv3 change:nkw_aktiv4", function(eventInfo) {
    if (eventInfo.newValue !== "1") {
        return;
    }
    var attrsToChange = {};
    for (var i = 1; i <= 4; i++) {
        if (eventInfo.sourceAttribute !== "nkw_aktiv" + i) {
            attrsToChange["NKW_Aktiv" + i] = 0;
        }
    }
    safeSetAttrs(attrsToChange);
});

// wird verwendet um aus dem Attributsnamen einer repeating section die Row-ID zu ermitteln
function extractRowId(attributeId) {
    return attributeId.match("repeating_[a-zA-Z]*_([-a-zA-Z0-9]*)_.*")[1];
}

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

		for (name of [
			[ values["RSName1"], values["RSAktiv1"] ],
			[ values["RSName2"], values["RSAktiv2"] ],
			[ values["RSName3"], values["RSAktiv3"] ],
			[ values["RSName4"], values["RSAktiv4"] ] ]) {
			// We do not want to throw warnings for inactive armour pieces later on, so only add active ones
			if (typeof(name[0]) !== 'undefined' && typeof(name[1]) !== 'undefined' && name[1] === "1") {
				armours.push(name[0]);
			}
		}
		for (name in armours) {
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
		for (armour of armours) {
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
    for (var i = 1; i <= 4; i++) {
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

const combatTechniques = {
    "anderthalbhander":    { type: "melee",  ebe: -2,        "at-only": false },
    "armbrust":            { type: "ranged", ebe: -5,        "at-only": true },
    "belagerungswaffen":   { type: "ranged", ebe: undefined, "at-only": true },
    "blasrohr":            { type: "ranged", ebe: -5,        "at-only": true },
    "bogen":               { type: "ranged", ebe: -3,        "at-only": true },
    "diskus":              { type: "ranged", ebe: -2,        "at-only": true },
    "dolche":              { type: "melee",  ebe: -1,        "at-only": false },
    "fechtwaffen":         { type: "melee",  ebe: -1,        "at-only": false },
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
}

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
	if ( !combatTechniques.hasOwnProperty(combatTechnique) ) {
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

/*
Input: object with zonal wound numbers
Output: object with modifiers of AT, PA, FK, IB, MU, IN, KL, FF, GE, KO, KK and GS

Note: Effect of arm wounds assumes fighter with sword and shield
*/
function calculateWoundModifiers(values) {
	var func = "calculateWoundModifiers";
	var woundModifiers = {
		"AT": 0, "PA": 0, "FK": 0, "IB": 0,
		"MU": 0, "IN": 0, "KL": 0, "FF": 0, "GE": 0, "KO": 0, "KK": 0, "GS": 0
	};

	// Input Sanitation
	// Part 1: Check Requirements
	var requiredProperties = [
		"wound_kopf1", "wound_kopf2", "wound_kopf3",
		"wound_brust1", "wound_brust2", "wound_brust3",
		"wound_bauch1", "wound_bauch2", "wound_bauch3",
		"wound_RA1", "wound_RA2", "wound_RA3",
		"wound_LA1", "wound_LA2", "wound_LA3",
		"wound_RB1", "wound_RB2", "wound_RB3",
		"wound_LB1", "wound_LB2", "wound_LB3"
	];

	var reqCheck = checkRequiredProperties(requiredProperties, values);
	if (reqCheck["errors"] > 0) {
		debugLog(func, "Error:", func, "stopped due to", reqCheck["errors"], "missing properties in input. Nothing returned. Missing properties:", reqCheck["missing"].toString());
		return;
	}

	// Input Sanitation
	// Part 2: Check Values
	var errors = 0;
	for (property of requiredProperties) {
		if (!DSAsane(values[property], "wound-box")) {
			errors += 1;
		}
	}

	if (errors > 0) {
		debugLog(func, "One or more wounds are not sane. Stopping.");
		return;
	}

	// Preparation for calculation
	// Wound effects for each affected value
	var woundEffects = {
		"AT": {"kopf":  0, "brust": -1, "bauch": -1, "RA": -2, "LA": -2, "RB": -2, "LB": -2},
		"PA": {"kopf":  0, "brust": -1, "bauch": -1, "RA": -2, "LA": -2, "RB": -2, "LB": -2},
		"FK": {"kopf":  0, "brust": -1, "bauch": -1, "RA": -2, "LA": -2, "RB": -2, "LB": -2},
		"IB": {"kopf": -2, "brust":  0, "bauch": -1, "RA":  0, "LA":  0, "RB": -2, "LB": -2},
		"MU": {"kopf": -2, "brust":  0, "bauch":  0, "RA":  0, "LA":  0, "RB":  0, "LB":  0},
		"IN": {"kopf": -2, "brust":  0, "bauch":  0, "RA":  0, "LA":  0, "RB":  0, "LB":  0},
		"KL": {"kopf": -2, "brust":  0, "bauch":  0, "RA":  0, "LA":  0, "RB":  0, "LB":  0},
		"FF": {"kopf":  0, "brust":  0, "bauch":  0, "RA": -2, "LA": -2, "RB":  0, "LB":  0},
		"GE": {"kopf":  0, "brust":  0, "bauch":  0, "RA":  0, "LA":  0, "RB": -2, "LB": -2},
		"KO": {"kopf":  0, "brust": -1, "bauch": -1, "RA":  0, "LA":  0, "RB":  0, "LB":  0},
		"KK": {"kopf":  0, "brust": -1, "bauch": -1, "RA": -2, "LA": -2, "RB":  0, "LB":  0},
		"GS": {"kopf":  0, "brust":  0, "bauch": -1, "RA":  0, "LA":  0, "RB": -1, "LB": -1},
	};

	var zones = ["kopf", "brust", "bauch", "RA", "LA", "RB", "LB"];
	var affectedParameters = ["AT", "PA", "FK", "IB", "MU", "IN", "KL", "FF", "GE", "KO", "KK", "GS"];
	var wounds = {};

	for (zone of zones) {
		wounds[zone] = 0;
		for (woundCount of [1, 2, 3]) {
			wounds[zone] += parseInt(values["wound_" + zone + woundCount]);
		}
	}

	// Calculate final wound modifiers
	for (param of affectedParameters) {
		for (zone of zones) {
			woundModifiers[param] += wounds[zone] * woundEffects[param][zone];
		}
	}

	return woundModifiers;
}

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
	"change:wound_kopf1 change:wound_kopf2 change:wound_kopf3 " +
	"change:wound_brust1 change:wound_brust2 change:wound_brust3 " +
	"change:wound_bauch1 change:wound_bauch2 change:wound_bauch3 " +
	"change:wound_ra1 change:wound_ra2 change:wound_ra3 " +
	"change:wound_la1 change:wound_la2 change:wound_la3 " +
	"change:wound_rb1 change:wound_rb2 change:wound_rb3 " +
	"change:wound_lb1 change:wound_lb2 change:wound_lb3",
	function(eventInfo) {
	safeGetAttrs(["wound_kopf1", "wound_kopf2", "wound_kopf3",
		"wound_brust1", "wound_brust2", "wound_brust3",
		"wound_bauch1", "wound_bauch2", "wound_bauch3",
		"wound_RA1", "wound_RA2", "wound_RA3",
		"wound_LA1", "wound_LA2", "wound_LA3",
		"wound_RB1", "wound_RB2", "wound_RB3",
		"wound_LB1", "wound_LB2", "wound_LB3"], function(values) {
		var mods = calculateWoundModifiers(values);
		safeSetAttrs({
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
        for (var weapon = 1; weapon <= 4; weapon++) {
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
        for (var i = 0; i < weaponsToCalculate.length; i++) {
            let weapon = weaponsToCalculate[i];
            attrsToChange["NKW" + weapon +  "_SB"] = calculateTpKKModFromValuesAndWeaponNumber(values, weapon);
        }
        safeSetAttrs(attrsToChange);
    })
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

/* 
	UTILITY FUNCTIONS AND CONSTANTS
*/
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

	"legrundw": 12,
	"LE_max": 12,

	"AU_max": 12,
	"ausgrundw": 12,
	"aus_max": 12, // Old attributes kept for compatibility (used in token bars)

	"erschoepfung_basis": 8,
	"erschoepfung_max": 8,

	"ueberanstrengung_max": 8,

	"mrgrundw": 5,
	"MR": 5,
	"wundschwelle": 4,

	"AE_max": 12,
	"aspgrundw": 12,
	"asp_max": 12, // Old attributes kept for compatibility (used in token bars)

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
	"AT_peitsche": 5,
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

	/// Encumbrance, Armour, Initiative
	"BE": 0,
	"be_at_mod": 0,
	"be_pa_mod": 0,
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
	"wound_rb": 0
};

/*
	Debug Log

Instead of spamming the console unnecessarily all the time, only show messages in debug mode.
*/
function debugLog(caller, ...args) {
	// Caller not optional, because of complicated handling of different amounts of parameters with console.log()
	if (arguments.length <= 1)
	{
		console.log("debugLog() call with insufficient arguments detected. Nothing done.");
		return;
	}

	safeGetAttrs(
		['debug-mode'],
		function(debugMode) {
			if (debugMode['debug-mode'] === "on") {
				console.log(caller + ":", ...args);
			}
		}
	);
	return;
}

/*
	Encode/Decode Unicode Strings to Base64

Base64 is compatible with Roll20's strings. In order to push data from one roll to the next, conversion to and from Base64 is used.
*/
function base64EncodeUTF8(str) {
  return btoa(encodeURIComponent(str));
}

function base64DecodeUTF8(str) {
  return decodeURIComponent(atob(str));
}

/*
	Pack/Unpack Objects (JSON)

In order to comfortably push data from one roll to the next, use JSON.
*/
function packObject(cargo) {
	var caller = "packObject()";
	var result = {};
	if (typeof(cargo) !== "object") {
		debugLog(caller, "Function input is not of type 'object'. Aborting ...");
		result = { "error": caller + ": Function input is not of type 'object'. Type was '" + typeof(cargo) + "'." };
		result = base64EncodeUTF8(JSON.stringify(result))
		return result;
	}

	result = base64EncodeUTF8(JSON.stringify(cargo));
	return result;
}

function unpackObject(cargo) {
	var caller = "unpackObject()";
	var result = {};
	if (typeof(cargo) !== "string") {
		debugLog(caller, "Function input is not of type 'string'. Aborting ...");
		result = { "error": caller + ": Function input is not of type 'string'. Type was '" + typeof(cargo) + "'." };
		return result;
	}

	result = JSON.parse(base64DecodeUTF8(cargo));
	return result;
}

/*
	Roll Macro Nester

Roll20 technically allows to nest roll macro, but requires every inner macro to replace the special characters '&', '|', '}' and ',' with HTML entities. This function takes a nesting level and an input string and returns an accordingly prepared string.

This only works with roll macros without attribute, ability or macro calls which can contain '|' and '}'.
*/
function nestRollMacro(rollMacro, level) {
	var caller = "nestRollMacro()";
	var result = '';

	// Sanity Checking
	if (typeof(rollMacro) !== "string") {
		debugLog(caller, "Function input is not of type 'string'. Aborting ...");
		result = { "error": caller + ": Function input is not of type 'string'. Type was '" + typeof(rollMacro) + "'." };
		return result;
	}

	if (typeof(level) !== "number") {
		debugLog(caller, "Function input is not of type 'number'. Aborting ...");
		result = { "error": caller + ": Function input is not of type 'number'. Type was '" + typeof(level) + "'." };
		return result;
	}

	level = parseInt(level);

	if (level < 0) {
		debugLog(caller, "Nesting level is negative. Aborting ...");
		result = { "error": caller + ": Nesting level is negative. Nesting level was '" + level + "'." };
		return result;
	}

	if (level < 1) {
		debugLog(caller, "No nesting requested. Aborting ...");
		result = { "error": caller + ": Nesting level is 0. Nesting level was '" + level + "'." };
		return rollMacro;
	}

	// Use an internal function
	function replacer (rollMacro, level) {
		rollMacro = rollMacro.replaceAll(/\&/g, '&amp;').replaceAll(/\|/g, '&#124;').replaceAll(/\}/g, '&#125;').replaceAll(/,/g, '&#44;');
		level -= 1;
		if (level > 0) {
			rollMacro = replacer(rollMacro, level);
        }
		return rollMacro;
     }

     result = replacer(rollMacro, level);
     return result;
}

/*
Roll Macro Generator

Writing roll macros for roll buttons by hand has many drawbacks: different nesting levels require different escaping even for the same macro, everything must be on the same line, no reuse of macros. Maintaining even slightly more complex rolls is no easy task.

The roll macro generator aims to alleviate most of these issues. You start with a JavaScript object representing the roll(s). Nested rolls are just nested JavaScript objects again. It is a bit more complex than that, but the result is at least readable by humans. While one object contains the rolls for your roll button, the other object contains reusable macros. The format is specified elsewhere.

The function 'buildMacros()' takes the macro(s) object and the reuse object. It calls the 'buildMacro()' function for each individual roll. Answers are produced by 'buildAnswers()' and escaping is done by 'escapeMacro()'. Escaping tries to not escape attribute, ability and macro calls, but the recognition might not be perfect.

By default, a string with all macros is returned. By setting 'resultType' to 'structured' an array of objects is returned. Each object contains two properties for each roll variable with its name and value as the content. {{test=[[?{Damage|much,2d6|little,1d3}]]}} becomes { 'name' : 'test', 'value': '[[?{Damage|much,2d6|little,1d3}]]' }.
*/

function buildMacros(macros, reuse, resultType) {
	/*
	isReuseValid

	This function takes a reuse object, an object of unnested or nested macro objects. Top-level properties define the reuse name, the value of the property follows the structure of ordinary macros. Reuse macros can be reused when defining roll macros, but can also reuse other reuse macros.

	Therefore, an uncareful user may create loops in the reuse object and this function checks for this.

	The algorithm works like this:
	* Build a list of called macros, an object containing properties for every (top-level) macro object in the reuse object. For every reuse property found within the macro at any level, the reuse name is added to the initially empty array. The nesting level is irrelevant, only the complete listing of all reuse macros referenced. This allows to search for loops.
	* Gather all reuse names referenced. This allows to check for correct references.
	* Check that all referenced reuse names are defined. Referencing undefined reuse macros makes the reuse object invalid. Nonetheless, undefined reuse macros are dropped and the next step starts.
	* Create a list of directed edges from the calling macro to the called macro.
	* Use the top-level properties of the list of called macros object as starting points of macro call graphs. Use the list of directed edges to build the path. After every step, check whether a given macro (vertex) has already been called (visited).
	*/
	function isReuseValid(reuse) {
		function questionIsValid(q) {
			var result = false;
			if (typeof(q) !== "string") {
				result = false;
			} else {
				result = true;
			}
			return result;
		}

		// Checks only "first" level (up to including desc/val and their value types)
		function answersIsValid(a) {
			function answerIsValid(answer) {
				var result = false;
				var descResult = false;
				var valResult = false;

				// Type checking
				if (typeof(answer) !== "object") {
					result = false;
					return result;
				}

				// Property existence checking
				if (
					(answer.hasOwnProperty("desc") === false)
					||
					(answer.hasOwnProperty("val") === false)
				) {
					result = false;
					return result;
				}

				// Checking the answer's description and value types
				if (Array.isArray(answer["desc"]) === false) {
					result = false;
					return result;
				}
				if (Array.isArray(answer["val"]) === false) {
					result = false;
					return result;
				}

				// Checking the answer's description and value (somewhat superficially)
				if (answer["desc"].length !== 1) {
					descResult = false;
				} else {
					if (typeof(answer["desc"][0]) === "string") {
						descResult = true;
					}
				}
				if (answer["val"].length < 1) {
					valResult = false;
				} else {
					for (item of answer["val"]) {
						if ( ["string", "object"].includes(typeof(item)) ) {
							valResult = true;
						} else {
							valResult = false;
						}
					}
				}

				// Reporting final result
				result = descResult && valResult;
				return result;
			}

			var result = false;

			// Type checking
			if (Array.isArray(a) === false) {
				result = false;
				return result;
			}

			// Array checking
			if (a.length === 0) {
				result = true;
			} else if (a.length > 0) {
				var numValidObjs = 0;
				for (answer of a) {
					if (answerIsValid(answer) === true) {
						numValidObjs += 1;
					}
				}
				if (a.length !== numValidObjs) {
					result = false;
				} else {
					result = true
				};
			}
			return result;
		}
		// macro: calling macro
		function analyseObject(obj, macro) {
			console.log("analyseObject Start", obj, "called by:", macro);
			macroCalls = [];
			if (obj.hasOwnProperty("reuse")) {
				console.log(macro, "reuses", obj["reuse"]);
				macroCalls.push(obj["reuse"]);
			} else if (
				(obj.hasOwnProperty("macro"))
				&&
				(typeof(obj["macro"]) === "object")
			) {
				if (answersIsValid(obj["macro"]["a"])) {
					// Arrays need to be iterated and each item checked (could be an object)
					for (answer of obj["macro"]["a"]) {
						for (item of answer["val"]) {
							if (typeof(item) === "object") {
								console.log("nestedEntry:", item);
								macroCalls = [...macroCalls, ...analyseObject(item, macro)];
							}
						}
					}
				} else {
					console.log("Invalid answers encountered for macro ", macro);
				}
			}
			console.log("analyseObject Stop");
			return macroCalls;
		}
		function buildCalledMacrosList(macros) {
			var calledMacrosList = {};
			for (macro in macros) {
				// Add empty entry for new reuse macro
				calledMacrosList[macro] = [];

				// Macros must have two properties: "q" and "a"
				// Care only about "a", no nesting in "q" allowed
				// TODO: Allow "q"-only (Roll20's default value for "a" is 0) objects
				// TODO: Allow "q" with default value for "a" objects
				console.log("macro:", macros[macro]);

				// Analyse answers
				// Referencing reuse macros is only possible within objects (property "reuse")
				// Objects are only allowed within the answers array
				if (answersIsValid(macros[macro]["a"])) {
					// Arrays need to be iterated and each item checked (could be an object)
					for (answer of macros[macro]["a"]) {
						for (item of answer["val"]) {
							if (typeof(item) === "object") {
								// Expand the calledMacrosList using a recursive function.
								// If analyseObject() does not return anything, that means that the current top-level reuse macro does not reference any other reuse macros.
								calledMacrosList[macro] = [...calledMacrosList[macro], ...analyseObject(item, macro)];
							}
						}
					}
				}
				// Remove duplicates
				calledMacrosList[macro] = [... new Set(calledMacrosList[macro])];
			}
			return calledMacrosList;
		}
		function buildReuseNamesList(macros) {
			var reuseNamesList = [];
			for (macro in macros) {
				// Add reuse name to the list of known reuse names
				reuseNamesList.push(macro);
			}
			return reuseNamesList;
		}
		function isMacroCallTreeValid(edges, reuseNamesList) {
			var caller = "isMacroTreeValid()";
			var result = false;
			var loops = 0;

			var paths = [];
			// Create starting points from the reuse names list
			for (name of reuseNamesList) {
				for (edge of edges) {
					if (name === edge[0]) {
						paths.push([ name, edge[1] ]);
					}
				}
			}
			// Iterate over all paths, including new ones added on the way
			for (path of paths) {
				// Next macro to call is the last macro of the path
				var nextRef = path.slice(-1)[0];

				// Iterate over all edges to find matching macros
				for (edge of edges) {
					if (nextRef === edge[0]) {
						// Matches lead to new paths
						// Optimizing this to create new paths only if there is more than one matching edge will give headaches for keeping the outer loop running; it's not worth the hassle
						var newPath = [ ...path, edge[1] ];
						paths.push(newPath);
						if (path.includes(edge[1])) {
							console.log("Loop detected:", newPath.join(" -> ") + ".", "Removing most recently added path (loop).");
							// Loops get removed, so they cannot be followed any further
							loops += 1;
							paths.pop();
							break;
						}
					}
				}
			}
			console.log(caller, "paths:", paths);
			if (loops === 0) {
				result = true;
			} else {
				result = false;
			}
			return result;
		}
		var results = { "reuseNotFound": [], "noLoopedEdges": false, "macroCallTreeValid": false, "result": false };
		var caller = "isReuseValid()";
		var calledMacrosValid = false;
		var calledMacrosList = {};
		var reuseNamesList = [];

		// Build called macros list
		calledMacrosList = buildCalledMacrosList(reuse);
		// Build reuse names list
		reuseNamesList  = buildReuseNamesList(reuse);

		// Report on reuse names and macro calls
		console.log("reuseNamesList:", reuseNamesList, "calledMacrosList:", calledMacrosList);

		// Remove references to undefined reuse names
		for (macro in calledMacrosList) {
			var toBeRemoved = [];
			if (calledMacrosList[macro].length > 0) {
				for (entry in calledMacrosList[macro]) {
					if (reuseNamesList.includes(calledMacrosList[macro][entry]) === false) {
						console.log("Reuse not found:", calledMacrosList[macro][entry]);
						toBeRemoved.push(entry);
						results["reuseNotFound"].push(calledMacrosList[macro][entry]);
					}
				}
			}
			console.log("calledMacrosList[macro]:", calledMacrosList[macro], "toBeRemoved:", toBeRemoved);
			if (toBeRemoved.length > 0) {
				for (entry in toBeRemoved.reverse()) {
					calledMacrosList[macro].splice(toBeRemoved[entry], 1);
				}
			}
			console.log("calledMacrosList[macro]:", calledMacrosList[macro]);
		}

		// Build tree
		// Start: Create edges
		var edges = [];
		for (macro in calledMacrosList) {
			if (calledMacrosList[macro].length > 0) {
				for (entry in calledMacrosList[macro]) {
					edges.push([ macro, calledMacrosList[macro][entry] ]);
				}
			}
		}
		console.log("edges:", edges);

		// Check edges to self
		{
		var toBeRemoved = [];
		for (edge in edges) {
			if (edges[edge][0] === edges[edge][1]) {
				console.log("Loop detected:", edges[edge].join(' -> '));
				results["noLoopedEdges"] = false;
				toBeRemoved.push(edge);
			}
		}
		for (entry in toBeRemoved.reverse()) {
			edges.splice(toBeRemoved[entry], 1);
		}
		if (toBeRemoved.length === 0) {
			results["noLoopedEdges"] = true;
		}

		}
		console.log("edges:", edges);

		// Check macro call tree
		results["macroCallTreeValid"] = isMacroCallTreeValid(edges, reuseNamesList);

		// Generate result
		results["result"] = (results["reuseNotFound"].length === 0) && results["noLoopedEdges"] && results["macroCallTreeValid"];
		console.log(results);

		return results["result"];
	}

	/*
	Ignore name property in nested objects.
	*/
	function buildMacro(macroObj, depth, reuse) {
		const prefix = "{{";
		const middle = "=[[";
		const suffix = "]]}}";
		const rmStart = "?{";
		const rmEnd = "}";
		const optSep = "|";

		var result = "";

		// Input validation
		if (typeof(macroObj) !== "object") {
			console.log("buildMacro: macroObj must be an object, but is of type ", typeof(macroObj));
			return "";
		}
		if (typeof(depth) !== "number") {
			console.log("buildMacro: depth must be a number, but is of type ", typeof(depth));
			return "";
		}
		if (depth < 0) {
			console.log("buildMacro: depth must be non-negative, but is", depth);
			return "";
		}
		if (isReuseValid(reuse) === false) {
			console.log("buildMacro: reuse not valid.")
			return "";
		}

		// Input type determination (macro or reuse)
		var type = "";
		if (
			(macroObj.hasOwnProperty("macro") === false)
			&&
			(macroObj.hasOwnProperty("reuse") === false)
		) {
			console.log("buildMacro: macroObj must contain one and only one of these two properties: macro, reuse. It does not contain any of them. No macro found.");
			return "";
		}
		if (
			(macroObj.hasOwnProperty("macro") === true)
			&&
			(macroObj.hasOwnProperty("reuse") === true)
		) {
			console.log("buildMacro: macroObj must contain one and only one of these two properties: macro, reuse. It contains both of them. No macro found.");
			return "";
		}
		if (
			(macroObj.hasOwnProperty("macro") === false)
			&&
			(macroObj.hasOwnProperty("reuse") === true)
		) {
			type = "reuse";
		}
		if (
			(macroObj.hasOwnProperty("macro") === true)
			&&
			(macroObj.hasOwnProperty("reuse") === false)
		) {
			type = "macro";
		}

		// Check validity of reuse name
		if (type === "reuse") {
			if (typeof(macroObj["reuse"]) !== "string") {
				console.log("buildMacro: macroObj's reuse property must be a string.");
				type = "";
				return "";
			} else {
				if (reuse.hasOwnProperty(macroObj["reuse"]) === false) {
					console.log("buildMacro: reuse macro not found in reuse data.");
					type = "";
					return "";
				}
			}
		}

		// Distinguish between top-level (depth = 0) and nested macros (depth > 0)
		if (depth === 0) {
			// Top-level macros must have a name and must be macro or reuse
			if (
				(macroObj.hasOwnProperty("name") === false)
				||
				(type !== "macro" && type !== "reuse")
			) {
				console.log("buildMacro: At top level (depth = 0), macroObj must contain both of these properties: name and either macro or reuse. At least one of them is missing.");
				return "";
			}

			// Build top-level of type "macro"
			if (type === "macro") {
				result +=
					prefix +
					macroObj["name"] +
					middle + rmStart +
					macroObj["macro"]["q"] +
					optSep +
					buildAnswers(macroObj["macro"]["a"], depth, reuse) +
					rmEnd + suffix;
			// Build top-level of type reuse
			} else if (type === "reuse") {
				result +=
					prefix +
					macroObj["name"] +
					middle + rmStart +
					reuse[macroObj["reuse"]]["q"] +
					optSep +
					buildAnswers(reuse[macroObj["reuse"]]["a"], depth, reuse) +
					rmEnd + suffix;
			}
		} else {
			// Nested macros can have a name, but it will not be used; nested macros are getting escaped
			if (type === "macro") {
				result +=
					escapeMacro(
						rmStart +
						macroObj["macro"]["q"] +
						optSep +
						buildAnswers(macroObj["macro"]["a"], depth, reuse) +
						rmEnd);
			} else if (type === "reuse") {
				result +=
					escapeMacro(
						rmStart +
						reuse[macroObj["reuse"]]["q"] +
						optSep +
						buildAnswers(reuse[macroObj["reuse"]]["a"], depth, reuse) +
						rmEnd);
			}
		}

		return result;
	}
	/*
	buildAnswers
	This function takes an answers array and transforms it into a string.

	In the simple case, each answer is made up of an array on its own containing only string items.
	If an answer array contains one and only one item, this item is used as value.
	If an answer array contains more than one item, all but the last items are concatenated to form the description, the value separator is added and the last value is added as value.

	In the more complicated case, one or more items are objects. These objects must fulfil certain conditions, but are interpreted by calling the buildMacro() function ultimately yielding a string again. The same rule concerning the answer array length as above applies. In general, this means that you want objects to be the last item of an answer array.

	This function is aware of the call depth and will stop at a nesting depth of 100 which will already exceed the maximum nesting depth supported by Roll20.

	TODO: empty answers "" given
	TODO: empty val "" given
	TODO: empty desc "" given
	*/

	function buildAnswers(answers, depth, reuse) {
		const optSep = "|";
		const varSep = ",";

		// Input validation
		if (Array.isArray(answers) === false) {
			console.log("buildAnswers: Input must be an array. Input is of type ", typeof(answers));
			return;
		}
		if (typeof(depth) !== "number") {
			console.log("buildAnswers: depth must be a number, but is of type ", typeof(depth));
			return "";
		}
		if (depth < 0) {
			console.log("buildAnswers: depth must be non-negative, but is", depth);
			return "";
		}
		// Build answers
		var result = "";
		var lastAnswerIndex = answers.length - 1;
		console.log("answers:", answers);
		for (answer in answers) {
			console.log("answer:", answer, "currentAnswer:", answers[answer]);
			answer = parseInt(answer);
			var currentAnswer = answers[answer];
			var desc = "";
			var val = "";

			// Input validation
			if (typeof(currentAnswer) !== "object") {
				console.log("buildAnswers: Answer must be an object, but is of type " + typeof(currentAnswer) + ".");
				return "";
			}
			if (
				(currentAnswer.hasOwnProperty("desc") === false)
				||
				(currentAnswer.hasOwnProperty("val") === false)
			) {
				console.log("buildAnswers: Answer object must have the properties 'desc' and 'val'.");
				return "";
			}

			// Description: Array, only string elements are considered
			if (Array.isArray(currentAnswer["desc"]) === true) {
				for (part of currentAnswer["desc"]) {
					if (typeof(part) === "string") {
						desc += part;
					} else {
						console.log("Description part not a string. Ignoring.");
					}
				}
				// Protect against commas and pipes in the description
				desc = escapeMacro(desc);
			} else {
				console.log("Description not an array. Ignoring.");
			}

			// Value: Array, strings or objects; objects are not checked for validity
			if (Array.isArray(currentAnswer["val"]) === true) {
				for (part of currentAnswer["val"]) {
					if (typeof(part) === "string") {
						val += part;
					} else if (typeof(part) === "object") {
						console.log("val:", val, "answer:", answer, "lastAnswerIndex:",  lastAnswerIndex);
						var protectAnswerVal = answer;
						val += buildMacro(part, depth + 1, reuse);
						answer = protectAnswerVal;
						console.log("val:", val, "answer:", answer, "lastAnswerIndex:",  lastAnswerIndex);
					} else {
						console.log("Value part neither string nor object. Ignoring.");
					}
				}
				// Contrary to the description, the value will not receive an extra round of escaping as it should only contain text directly consumable by Roll20's roll interpreter
			} else {
				console.log("Value not an array. Ignoring.");
			}

			// Piecing every together
			result += desc + varSep + val;

			// optSep not after the final answer
			if (answer < lastAnswerIndex) {
				result += optSep;
			}
		}
		return result;
	}

	function escapeMacro(macro) {
		console.log("escapeMacro() läuft mit", macro);
		var macroComplete = "";

		// The actual escaping function
		function escaper(macro) {
			return macro
				.replaceAll(/\&/g, '&amp;')
				.replaceAll(/\|/g, '&vert;')
				.replaceAll(/\{/g, '&lcub;')
				.replaceAll(/\}/g, '&rcub;')
				.replaceAll(/,/g, '&comma;');
		}

		/*
		Some parts must not be escaped. The pattern uses a non-capturing group (?:), because otherwise matches from the groups would also be included in the protected parts data. This was an unexpected JavaScript default.
		*/
		const protectPattern = /(?:#[^#@%|, \t]+|[@%]\{[^@%#}]+\})/g;
		var protectParts = [];

		// Create an array of all parts that need protection from escaping
		protectParts = macro.match(protectPattern);

		// Distinguish between the simple (no protected parts) and the complicated (protected parts) case
		if (protectParts === null) {
			macroComplete += escaper(macro);
		} else {
			// The algorithm:
			//  Split the macro at every protected part (empty string gets added at beginning/end of macro if match is there)
			//  Escape all the unprotected parts into macroEscaped
			//  Mix escaped and protected parts in an alternating fashion
			//  Add last escaped part at the end
			var protectCount = 0;
			var protectSplit = [];
			protectSplit = macro.split(protectPattern);
			protectCount = protectParts.length;
			console.log(protectCount, protectParts, protectSplit);

			var macroEscaped = [];
			for (part of protectSplit) {
				macroEscaped.push(escaper(part));
			}

			for (part in protectParts) {
				macroComplete += macroEscaped[part] + protectParts[part];
			}
			macroComplete += macroEscaped[macroEscaped.length -1];
		}

		return macroComplete;
	}

	// Build the macros
	var result = [];
	for (macro of macros) {
		result.push(buildMacro(macro, 0, reuse));
	}
	var structuredResult = [];

	for (macro of result) {
		// Get the name of the roll variable
		var rollVarName = macro.slice(2, macro.search('='));

		// Get the definition of the roll variable
		var rollVarValue = macro.slice(macro.search('=') + 1, macro.length - 2);

		// Create a new object with properties for the rollVarName and the rollVarValue
		structuredResult.push( { 'name': rollVarName, 'value': rollVarValue } );
	}
	if (resultType !== 'structured') {
		return result.join(" ");
	} else {
		return structuredResult;
	}
}

/*
	Generate Simple Roll Tag from Date.now()

In order to quickly see that a reaction/confirmation roll belongs to the correct original roll, we use roll tags.
(Originally, these should get called 'roll IDs', but this term is already used internally in custom roll parsing.)
These are not the Roll20 ones, but actually Date.now()'s output in a condensed form.

Since we need the actual Date.now() as well, this function just assumes to receive an integer >= 0.

The number is converted to a representation using a custom character set. Unfortunately, at least the upload of HTML files in the Custom Character Sheet does not work if literal emoji are present anywhere in the source. Therefore, all emoji had to be encoded with their hexadecimal code as HTML entities.
The reversal puts the most frequently changing characters at the front, so it's easier for people to find the corresponding rolls.
*/
function generateShortRollTag (integer) {
	const caller = "generateShortRollTag";
	const charset = [
		// grinning face with smiling eyes, face with tears of joy, melting face, winking face, face blowing a kiss
		"&#x1f604;", "&#x1f602;", "&#x1fae0;", "&#x1f609;", "&#x1f618;",
		// upside-down face, smiling face with halo, smiling face with hearts, kissing face, face savoring food
		"&#x1f643;", "&#x1f607;", "&#x1f970;", "&#x1f617;", "&#x1f60b;",
		// money-mouth face, face with hand over mouth, shushing face, thinking face, zipper-mouth face
		"&#x1f911;", "&#x1f92d;", "&#x1f92b;", "&#x1f914;", "&#x1f910;",
		// face with raised eyebrow, expressionless face, face without mouth, smirking face, unamused face
		"&#x1f928;", "&#x1f611;", "&#x1f636;", "&#x1f60f;", "&#x1f612;",
		// face with rolling eyes, grimacing face, sleepy face, drooling face, sleeping face
		"&#x1f644;", "&#x1f62c;", "&#x1f62a;", "&#x1f924;", "&#x1f634;",
		// face with medical mask, face with thermometer, face with head-bandage, nauseated face, face vomiting
		"&#x1f637;", "&#x1f912;", "&#x1f915;", "&#x1f922;", "&#x1f92e;",
		// sneezing face, hot face, cold face, face with crossed-out eyes, exploding head
		"&#x1f927;", "&#x1f975;", "&#x1f976;", "&#x1f635;", "&#x1f92f;",
		// cowboy hat face, partying face, disguised face, smiling face with sunglasses, nerd face
		"&#x1f920;", "&#x1f973;", "&#x1f978;", "&#x1f60e;", "&#x1f913;",
		// face with monocle, confused face, face with open mouth, astonished face, pleading face
		"&#x1f9d0;", "&#x1f615;", "&#x1f62e;", "&#x1f632;", "&#x1f97a;",
		// face holding back tears, fearful face, loudly crying face, face screaming in fear, confounded face
		"&#x1f979;", "&#x1f628;", "&#x1f62d;", "&#x1f631;", "&#x1f616;",
		// yawning face, enraged face, face with symbols on mouth, smiling face with horns, skull
		"&#x1f971;", "&#x1f621;", "&#x1f92c;", "&#x1f608;", "&#x1f480;",
		// hear-no-evil monkey, pile of poo, clown face, ogre, ghost
		"&#x1f649;", "&#x1f4a9;", "&#x1f921;", "&#x1f479;", "&#x1f47b;",
		// alien, alien monster, robot, grinning cat with smiling eyes, see-no-evil monkey
		"&#x1f47d;", "&#x1f47e;", "&#x1f916;", "&#x1f638;", "&#x1f648;",
		// white heart, broken heart, collision, sweat droplets, ZZZ
		"&#x1f90d;", "&#x1f494;", "&#x1f4a5;", "&#x1f4a6;", "&#x1f4a4;",
		// hand with fingers splayed, OK hand, eye, dog face, fox
		"&#x1f91a;", "&#x1f44c;", "&#x1f441;", "&#x1f436;", "&#x1f98a;",
		// raccoon, lion, tiger, horse face, unicorn
		"&#x1f99d;", "&#x1f981;", "&#x1f42f;", "&#x1f434;", "&#x1f984;",
		// zebra, deer, bison, cow face, ox
		"&#x1f993;", "&#x1f98c;", "&#x1f9ac;", "&#x1f42e;", "&#x1f402;",
		// pig face, boar, pig nose, ewe, goat
		"&#x1f437;", "&#x1f417;", "&#x1f43d;", "&#x1f411;", "&#x1f410;",
		// camel, llama, giraffe, elephant, mouse face
		"&#x1f42a;", "&#x1f999;", "&#x1f992;", "&#x1f418;", "&#x1f42d;",
		// rat, hamster, rabbit face, hippopotamus, hedgehog
		"&#x1f400;", "&#x1f439;", "&#x1f430;", "&#x1f99b;", "&#x1f994;",
		// 100 characters
		// bat, bear, koala, panda, sloth
		"&#x1f987;", "&#x1f43b;", "&#x1f428;", "&#x1f43c;", "&#x1f9a5;",
		// otter, skunk, kangaroo, badger, paw prints
		"&#x1f9a6;", "&#x1f9a8;", "&#x1f998;", "&#x1f9a1;", "&#x1f43e;",
		// turkey, chicken, hatching chick, baby chick, bird
		"&#x1f983;", "&#x1f414;", "&#x1f423;", "&#x1f424;", "&#x1f426;",
		// penguin, dove, eagle, duck, swan
		"&#x1f427;", "&#x1f54a;", "&#x1f985;", "&#x1f986;", "&#x1f9a2;",
		// owl, dodo, feather, flamingo, peacock
		"&#x1f989;", "&#x1f9a4;", "&#x1fab6;", "&#x1f9a9;", "&#x1f99a;",
		// parrot, frog, crocodile, turtle, lizard
		"&#x1f99c;", "&#x1f438;", "&#x1f40a;", "&#x1f422;", "&#x1f98e;",
		// snake, dragon face, sauropod, T-Rex, spouting whale
		"&#x1f40d;", "&#x1f432;", "&#x1f995;", "&#x1f996;", "&#x1f433;",
		// dolphin, seal, fish, tropical fish, blowfish
		"&#x1f42c;", "&#x1f9ad;", "&#x1f41f;", "&#x1f420;", "&#x1f421;",
		// shark, octopus, spiral shell, coral, snail
		"&#x1f988;", "&#x1f419;", "&#x1f41a;", "&#x1fab8;", "&#x1f40c;",
		// buttefly, bug, ant, honeybee, beetle
		"&#x1f98b;", "&#x1f41b;", "&#x1f41c;", "&#x1f41d;", "&#x1fab2;",
		// lady beetle, cricket, cockroach, spider, spider web
		"&#x1f41e;", "&#x1f997;", "&#x1fab3;", "&#x1f577;", "&#x1f578;",
		// scorpion, mosquito, fly, worm, microbe
		"&#x1f982;", "&#x1f99f;", "&#x1fab0;", "&#x1fab1;", "&#x1f9a0;",
		// bouquet, cherry blossom, lotus, rosette, rose
		"&#x1f490;", "&#x1f338;", "&#x1fab7;", "&#x1f3f5;", "&#x1f339;",
		// sunflower, seedling, potted plant, evergreen tree, deciduous tree
		"&#x1f33b;", "&#x1f331;", "&#x1fab4;", "&#x1f332;", "&#x1f333;",
		// palm tree, cactus, sheat of rice, herb, four leaf clover
		"&#x1f334;", "&#x1f335;", "&#x1f33e;", "&#x1f33f;", "&#x1f340;",
		// maple leaf, leaf fluttering in wind, nest with eggs, mushroom, grapes
		"&#x1f341;", "&#x1f343;", "&#x1faba;", "&#x1f344;", "&#x1f347;",
		// melon, watermelon, tangerine, lemon, banana
		"&#x1f348;", "&#x1f349;", "&#x1f34a;", "&#x1f34b;", "&#x1f34c;",
		// pineapple, mango, red apple, pear, peach
		"&#x1f34d;", "&#x1f96d;", "&#x1f34e;", "&#x1f350;", "&#x1f351;",
		// cherries, strawberry, blueberries, kiwi fruit, tomato
		"&#x1f352;", "&#x1f353;", "&#x1fad0;", "&#x1f95d;", "&#x1f345;",
		// coconut, avocado, eggplant, potato, carrot
		"&#x1f965;", "&#x1f951;", "&#x1f346;", "&#x1f954;", "&#x1f955;",
		// 200
		// ear of corn, hot pepper, bell pepper, cucumber, leafy green
		"&#x1f33d;", "&#x1f336;", "&#x1fad1;", "&#x1f952;", "&#x1f96c;",
		// broccoli, onion, peanuts, beans, chestnut
		"&#x1f966;", "&#x1f9c5;", "&#x1f95c;", "&#x1fad8;", "&#x1f330;",
		// bread, croissant, baguette bread, flatbread, pretzel
		"&#x1f35e;", "&#x1f950;", "&#x1f956;", "&#x1fad3;", "&#x1f968;",
		// bagel, pancackes, waffle, cheese wedge, meat on bone
		"&#x1f96f;", "&#x1f95e;", "&#x1f9c7;", "&#x1f9c0;", "&#x1f356;",
		// poultry leg, cut of meat, bacon, hamburger, french fries
		"&#x1f357;", "&#x1f969;", "&#x1f953;", "&#x1f354;", "&#x1f35f;",
		// pizza, hot dog, sandwich, taco, burrito
		"&#x1f355;", "&#x1f32d;", "&#x1f96a;", "&#x1f32e;", "&#x1f32f;",
		// stuffed flatbread, falafel, egg, cooking, pot of food
		"&#x1f959;", "&#x1f9c6;", "&#x1f95a;", "&#x1f373;", "&#x1f372;",
		// bowl with spoon, green salad, popcorn, butter, salt
		"&#x1f963;", "&#x1f957;", "&#x1f37f;", "&#x1f9c8;", "&#x1f9c2;",
		// bento box, rice ball, curry rice, steaming bowl, spaghetti
		"&#x1f371;", "&#x1f359;", "&#x1f35b;", "&#x1f35c;", "&#x1f35d;",
		// oden, sushi, fried shrimp, moon cake, dango
		"&#x1f362;", "&#x1f363;", "&#x1f364;", "&#x1f96e;", "&#x1f361;",
		// dumpling, fortune cookie, takeout box, crab, squid
		"&#x1f95f;", "&#x1f960;", "&#x1f961;", "&#x1f980;", "&#x1f991;",
		// oyster
		"&#x1f9aa;"
		// 256
	];
	const base = charset.length;

	// Input sanitation
	if (typeof(integer) !== "number") {
		debugLog(caller, "Input type not number, using default value '0'.");
		integer = 0;
	}

	if (parseInt(integer.toFixed(0)) < 0) {
		debugLog(caller, "Input negative, using default value '0'.");
		integer = 0;
	}

	// Drop decimals
	integer = parseInt(integer.toFixed(0));

	// Conversion to base charset
	function getBaseLog(base, number) {
		return Math.log(number) / Math.log(base);
	}
	// Get digits of new number
	const digits = Math.floor(getBaseLog(base, integer));
	var result = [];
	var rest = integer;

	for (n = digits; n >= 0; n--) {
		result.push(charset[Math.trunc(rest/Math.pow(base, n))]);
		rest = rest % Math.pow(base, n);
	}
	// Reverse
	result = result.reverse().join('');

	return result;
}

/*
	Safe getAttrs()

This function calls getAttrs(), but checks whether all attributes returned are actually there and are not NaN or undefined. Non-existing attributes are filled with the stored default value or 0.
*/
function safeGetAttrs( attrsToGet, callback ) {
	var caller = "safeGetAttrs";
	getAttrs(
		attrsToGet, function(attrs) {
			var missing = [];
			var badDef = [];
			var errors = [0, 0];

			for (req of attrsToGet) {
			// Check for missing attributes and try setting a default value
				if (!attrs.hasOwnProperty(req)) {
					errors[0] += 1;
					missing.push(req);
					attrs[req] = defaultValues[req] || 0;
				}
			// Check existing attributes for undefined or NaN
				if (
					typeof attrs[req] === 'undefined' ||
					Number.isNaN(attrs[req])
				) {
					errors[1] += 1;
					badDef.push(req);
					attrs[req] = defaultValues[req] || 0;
				}
			}
			if ( errors[0] > 0 ) {
				debugLog(caller, "Non-existing attributes gotten and set to default value:", missing.join(", "));
			}
			if ( errors[1] > 0 ) {
				debugLog(caller, "Attributes with values 'NaN' or 'undefined' gotten and set to default value:", badDef.join(", "));
			}
			callback(attrs, missing, badDef);
		}
	);
}

/*
	Safe setAttrs()

This function ultimately calls setAttrs(), but beforehand checks whether all attributes are are not NaN or undefined. Bad attributes are filled with the stored default value or 0.
*/
function safeSetAttrs( attrsToSet, options = "", callback = function() {}) {
	var caller = "safeSetAttrs";
	var badDef = [];
	var errors = 0;

	for (req in attrsToSet) {
	// Check existing attributes for undefined or NaN
		if (
			typeof attrsToSet[req] === 'undefined' ||
			Number.isNaN(attrsToSet[req])
		) {
			errors += 1;
			badDef.push(req);
			attrsToSet[req] = defaultValues[req] || 0;
		}
	}
	if ( errors > 0 ) {
		debugLog(caller, "Attributes with values 'NaN' or 'undefined' gotten and set to default value:", badDef.join(", "));
	}

	setAttrs( attrsToSet, options, callback );
}

/*
	General Sanity Check Function
*/
function DSAsane (value, type) {
	var func = "DSAsane";
	var sane = true;

	function limitedIntValid(value, minimum, maximum) {
		if (isNaN(value)
		|| isNaN(parseInt(value))
		|| parseInt(value) < minimum
		|| parseInt(value) > maximum) {
			return false;
		} else {
			return true;
		}
	}

	switch(type) {
		case "stat":
			// MU, KL, IN, ...
			// Must be number or parseInt()-able number
			// Must be integer in range [0, 99]
			if (!limitedIntValid(value, 0, 99)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "wound-box":
			// Checkbox with wound value (active: 1, inactive: 0)
			// Must be number or parseInt()-able number
			// Must be integer in range [0, 1]
			if (!limitedIntValid(value, 0, 1)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "ini-mod-weapon":
			// INI modifiers of weapons
			// Must be number or parseInt()-able number
			// Must be integer in range [-9, 9]
			if (!limitedIntValid(value, -9, 9)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "encumbrance":
			// Encumbrance from excessive equipment weight or armour
			// Must be number or parseInt()-able number
			// Must be integer in range [0, 99]
			if (!limitedIntValid(value, 0, 99)) {
				debugLog(func, "Value '" + value + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		case "melee-combat-technique":
			// Limited set of combat techniques to choose from
			// Must be within the set
			const meleeCombatTechniques = [
			    "anderthalbhander", "dolche",              "fechtwaffen",
			    "hiebwaffen",       "infanteriewaffen",    "kettenstabe",
			    "kettenwaffen",     "lanzenreiten",        "peitsche",
			    "raufen",           "ringen",              "sabel",
			    "schwerter",        "speere",              "stabe",
			    "zweihandflegel",   "zweihand-hiebwaffen", "zweihandschwerter"
			];
			const stringValue = String(value);
			if (meleeCombatTechniques.includes(stringValue.toLowerCase()) === false) {
				debugLog(func, "Value '" + stringValue + "' check against type '" + type + "' failed.");
				sane = false;
			}
			break;
		default:
			debugLog(func, "type '", type, "' not understood.");
	}
	return sane;
}

/*
	Property Checker
	Checks whether properties (given in an array of strings) are available in an object.
	Does not check whether the array contains strings only.
	Returns an object with the error count (missing properties) and a string array of missing properties.
*/
function checkRequiredProperties(properties, values) {
	var errors = 0;
	var missing = [];

	for (req of properties) {
		if (!values.hasOwnProperty(req)) {
			errors += 1;
			missing.push(req);
		}
	}
	return { "errors": errors, "missing": missing };
}

/*
	x.5 values are always rounded up in this system, so let's have a function for this.
*/
function DSAround (num) {
	var caller = "DSAround";
	num = parseFloat(num);

	if (isNaN(num)) {
		debugLog(caller, "NaN encountered.", "num is \"" + num + "\".");
		return NaN;
	}

	num = roundDecimals(num, 1);
	// Round down if fraction is less than 0.5; abs() to handle negative values correctly as well
	if (Math.abs(num) % 1 < 0.5) {
		num = Math.floor(num);
	} else {
		num = Math.ceil(num);
	}

	return num;
}

/*
	JavaScript's Math.round() only rounds to 0 decimal places.
	Using the toFixed() + parseFloat() method is cumbersome, so here we are with a new function.
*/
function roundDecimals (num, digits) {
	var caller = "roundDecimals";
	num = parseFloat(num);
	digits = parseInt(digits);

	if (isNaN(num) || isNaN(digits)) {
		debugLog(caller, "NaN encountered.", "num is \"" + num + "\" and digits is \"" + digits + "\".");
		return NaN;
	}

	num = parseFloat(num.toFixed(digits));
	return num;
}

/*
	When displaying modifiers, make use of real minus sign (U+2212) or ± (U+00B1).
*/
function prettifyMod(uglyModifier) {
	var prettyModifier;
	if(isNaN(parseInt(uglyModifier)))
	{
		return uglyModifier;
	}
	if(uglyModifier < 0)
	{
		prettyModifier = "−" + String(Math.abs(uglyModifier));
	} else if(uglyModifier === 0){
		prettyModifier = "±" + String(uglyModifier);
	} else {
		prettyModifier = "+" + String(uglyModifier);
	}
	return prettyModifier;
}

/*
	calcCritLevels
Calculates the required d20 rolls for critical success/failure by check type
effects (object):
	Tollpatsch
	wilde Magie
	// effects below not yet used, added for completeness and later implementation
	Axxeleratus, Blitzgeschwind
	Murks und Patz
	Reversalis(Murks und Patz)
	Standfest Katzengleich
	Stillstand
	Reversalis(Stillstand)
	Thalionmels Schlachtgesang
	// effects below ignored and not added due to complex implementation
	Sensattaco
	Reversalis(Sensattaco)
	Reversalis(Standfest)
It outputs an object with one property per check type containing one object with
	maximum roll triggering critical success (default: 1)
	minimum roll triggering critical failure (default: 20)
Note: No critical success/failure for liturgies (see Wege der Götter, p. 242).
*/
function calcCritLevels (effects) {
	const caller = 'calcCritLevels';
	var result = {
		'talent': {'success': 1, 'failure': 20},
		'kampf_at': {'success': 1, 'failure': 20},
		'kampf_pa': {'success': 1, 'failure': 20},
		'kampf_fk': {'success': 1, 'failure': 20},
		'zauber': {'success': 1, 'failure': 20},
		'ritual': {'success': 1, 'failure': 20}
	};
	const types = [
		'talent',
		'kampf_at', 'kampf_pa', 'kampf_fk',
		'zauber', 'ritual'
	];
	const effectList = [
		'Tollpatsch',
		'wilde Magie',
		'Axxeleratus, Blitzgeschwind',
		'Murks und Patz',
		'Reversalis(Murks und Patz)',
		'Standfest Katzengleich',
		'Stillstand',
		'Reversalis(Stillstand)',
		'Thalionmels Schlachtgesang'
	];
	// Check type, per check type list influence on critical success/failure per effect
	// Higher values for critical success = good (+2 means 1, 2, 3 are success)
	// Lower values for critical failure = bad (-2 means 18, 19, 20 are failure)
	// Values outside of d20 results (< 1, > 20): critical not possible
	// Karmic effects trump magic effects
	const effectMatrix = {
		'talent': {
			'Tollpatsch': { 'success': 0, 'failure': -1 },
			'wilde Magie': { 'success': 0, 'failure': 0 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': 0 },
			'Murks und Patz': { 'success': 0, 'failure': 0 },
			'Reversalis(Murks und Patz)': { 'success': 0, 'failure': 0 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 0 },
			'Stillstand': { 'success': 0, 'failure': 0 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': 0 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 0 }
		},
		'kampf_at': {
			'Tollpatsch': { 'success': 0, 'failure': -1 },
			'wilde Magie': { 'success': 0, 'failure': 0 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': -2 },
			'Murks und Patz': { 'success': -50, 'failure': -50 },
			'Reversalis(Murks und Patz)': { 'success': 50, 'failure': 50 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 50 },
			'Stillstand': { 'success': 0, 'failure': 50 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': -2 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 100 }
		},
		'kampf_pa': {
			'Tollpatsch': { 'success': 0, 'failure': -1 },
			'wilde Magie': { 'success': 0, 'failure': 0 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': -2 },
			'Murks und Patz': { 'success': -50, 'failure': -50 },
			'Reversalis(Murks und Patz)': { 'success': 50, 'failure': 50 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 50 },
			'Stillstand': { 'success': 0, 'failure': 50 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': -2 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 100 }
		},
		'kampf_fk': {
			'Tollpatsch': { 'success': 0, 'failure': -1 },
			'wilde Magie': { 'success': 0, 'failure': 0 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': -2 },
			'Murks und Patz': { 'success': -50, 'failure': -50 },
			'Reversalis(Murks und Patz)': { 'success': 50, 'failure': 50 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 0 },
			'Stillstand': { 'success': 0, 'failure': 50 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': -2 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 0 }
		},
		'zauber': {
			'Tollpatsch': { 'success': 0, 'failure': 0 },
			'wilde Magie': { 'success': 0, 'failure': -1 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': 0 },
			'Murks und Patz': { 'success': 0, 'failure': 0 },
			'Reversalis(Murks und Patz)': { 'success': 0, 'failure': 0 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 0 },
			'Stillstand': { 'success': 0, 'failure': 0 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': 0 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 0 }
		},
		'ritual': {
			'Tollpatsch': { 'success': 0, 'failure': 0 },
			'wilde Magie': { 'success': 0, 'failure': -1 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': 0 },
			'Murks und Patz': { 'success': 0, 'failure': 0 },
			'Reversalis(Murks und Patz)': { 'success': 0, 'failure': 0 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 0 },
			'Stillstand': { 'success': 0, 'failure': 0 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': 0 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 0 }
		}
	};
	/* Input Sanitation */
	// Effects
	var propertyCheck = checkRequiredProperties(effectList, effects);
	if (propertyCheck['errors'] >= 1)
	{
		debugLog(caller, 'Missing properties:', propertyCheck['missing'], '. Missing values added with default value 0.');
		for (property of propertyCheck['missing'])
		{
			effects[property] = 0;
		}
	}

	// Assumption: safeGetAttrs() used, so no undefined or NaN
	// Correct values: 0 or 1
	for (property of effectList)
	{
		if (isNaN(parseInt(effects[property])))
		{
			debugLog(caller, 'Property not a number:', property, 'with value', effects[property] + '. Assuming 0.');
			effects[property] = 0;
		} else {
			if (parseInt(effects[property]) < 0)
			{
				effects[property] = 0;
			} else if (parseInt(effects[property]) > 1) {
				effects[property] = 1;
			}
		}
	}
	debugLog(caller, 'Inputs sanitized: effects:', effects);

	/* Calculations */
	for (type of types)
	{
		for (effect of effectList)
		{
			for (crit of ['success', 'failure'])
				result[type][crit] += effects[effect] * effectMatrix[type][effect][crit];
			}
		}

	debugLog(caller, 'Result:', result);
	return result;
}

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
	't_ka_belagerungswaffen',
	't_ka_blasrohr',
	't_ka_bogen',
	't_ka_diskus',
	't_ka_dolche',
	't_ka_fechtwaffen',
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
	't_ko_gaukeleien',
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
	't_h_zimmermann'
];

const talents_ebe = [
	't_ko_akrobatik',
	't_ko_athletik',
	't_ko_fliegen',
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
	Constants for translating (new) internal name to (old) internal name and UI name

In the long run, all attributes should be migrated to the new ones.
*/
const talentsData = {
	't_ka_anderthalbhaender': {'internal': "Anderthalbhander", 'ui': "Anderthalbhänder"},
	't_ka_armbrust': {'internal': "armbrust", 'ui': "Armbrust"},
	't_ka_belagerungswaffen': {'internal': "belagerungswaffen", 'ui': "Belagerungswaffen"},
	't_ka_blasrohr': {'internal': "blasrohr", 'ui': "Blasrohr"},
	't_ka_bogen': {'internal': "bogen", 'ui': "Bogen"},
	't_ka_diskus': {'internal': "diskus", 'ui': "Diskus"},
	't_ka_dolche': {'internal': "dolche", 'ui': "Dolche"},
	't_ka_fechtwaffen': {'internal': "fechtwaffen", 'ui': "Fechtwaffen"},
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
	't_ko_gaukeleien': {'internal': "gaukeleien", 'ui': "Gaukeleien"},
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
	't_n_fesseln': {'internal': "fesseln", 'ui': "Fesseln"},
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
	't_sp_aureliani': {'internal': "aureliani", 'ui': "Aureliani"},
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
	't_sp_hjaldingsch': {'internal': "hjaldingsch", 'ui': "Hjaldingsch"},
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
	't_sc_hjaldingscherunen': {'internal': "schrift_hjaldingscherunen", 'ui': "Hjaldingsche Runen"},
	't_sc_imperialezeichen': {'internal': "schrift_imperialezeichen", 'ui': "Imperiale Zeichen"},
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
	't_h_gerber': {'internal': "gerber", 'ui': "Gerber"},
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
	't_h_steinschneider': {'internal': "steinschneider", 'ui': "Steinschneider"},
	't_h_stellmacher': {'internal': "stellmacher", 'ui': "Stellmacher"},
	't_h_stoffefaerben': {'internal': "stoffefarben", 'ui': "Stoffefärben"},
	't_h_taetowieren': {'internal': "tatowieren", 'ui': "Tätowieren"},
	't_h_toepfern': {'internal': "topfern", 'ui': "Töpfern"},
	't_h_viehzucht': {'internal': "viehzucht", 'ui': "Viehzucht"},
	't_h_webkunst': {'internal': "webkunst", 'ui': "Webkunst"},
	't_h_winzer': {'internal': "winzer", 'ui': "Winzer"},
	't_h_zimmermann': {'internal': "zimmermann", 'ui': "Zimmermann"}
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
	Constants for effective encumbrance for talent/spell checks
*/
const effectiveEncumbrance = {
	"t_ko_akrobatik":           { "value":  2, "type": "factor" },
	"t_ko_athletik":            { "value":  2, "type": "factor" },
	"t_ko_fliegen":             { "value":  1, "type": "factor" },
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
}

on("sheet:opened change:character_name", function(eventInfo) {
	var func = "Action Listener for Updating Roll Button Actions on Character Name Updates";
	// Build list of attributes
	var attrsToGet = ["character_name"];
	var ebeTalents = []
	for(talent of talents_ebe)
	{
		ebeTalents.push(talent + "-ebe");
	}
	for(attr of [].concat(talents, ebeTalents, spells, melee))
	{
		attrsToGet.push(attr + "_action");
	}
	safeGetAttrs(attrsToGet, function(v) {
		var attrsToChange = {};

		for (attr of attrsToGet)
		{
			// No action buttons for character name and combat techniques required
			if (attr.match("t_ka_") || attr === "character_name") continue;
			attrsToChange[attr] = "%{" + v["character_name"] + "|" + attr.replace(/_action$/gm, "") + "-action}";
		}

		attrsToChange["eidsegen_action"] = "%{" + v["character_name"] + "|eidsegen-action}";

		debugLog(func, attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

on(talents.map(talent => "clicked:" + talent + "-action").join(" "), async (info) => {
	var func = "Action Listener for Talent Roll Buttons";
	var trigger = info["triggerName"].replace(/clicked:([^-]+)-action/, '$1');
	var nameInternal = talentsData[trigger]["internal"];
	var nameUI = talentsData[trigger]["ui"];
	debugLog(func, trigger, talentsData[trigger]);

	// Build Roll Macro
	var rollMacro = "";

	rollMacro +=
		"@{gm_roll_opt} " +
		"&{template:talent} " +
		"{{name=" + nameUI + "}} " +
		"{{wert=[[@{TaW_" + nameInternal + "}d1cs0cf2]]}} " +
		"{{mod=[[?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2]]}} ";
	// All languages (sp) and scripts (sc) use the same attributes, so no layer of indirection via talent name required/possible.
	if (trigger.replace(/t_([^_]+)_.*/, '$1') === "sp")
	{
		rollMacro +=
		"{{stats=[[ " +
			"[Eigenschaft 1:] [[@{KL}]]d1cs0cf2 + " +
			"[Eigenschaft 2:] [[@{IN}]]d1cs0cf2 + " +
			"[Eigenschaft 3:] [[@{CH}]]d1cs0cf2" +
			"]]}} ";
	} else if (trigger.replace(/t_([^_]+)_.*/, '$1') === "sc") {
		rollMacro +=
		"{{stats=[[ " +
			"[Eigenschaft 1:] [[@{KL}]]d1cs0cf2 + " +
			"[Eigenschaft 2:] [[@{KL}]]d1cs0cf2 + " +
			"[Eigenschaft 3:] [[@{FF}]]d1cs0cf2" +
			"]]}} ";
	} else {
		rollMacro +=
		"{{stats=[[ " +
			"[Eigenschaft 1:] [[@{Eigenschaft1" + nameInternal + "}]]d1cs0cf2 + " +
			"[Eigenschaft 2:] [[@{Eigenschaft2" + nameInternal + "}]]d1cs0cf2 + " +
			"[Eigenschaft 3:] [[@{Eigenschaft3" + nameInternal + "}]]d1cs0cf2" +
			"]]}} ";
	}

	rollMacro +=
		"{{roll=[[3d20cs<@{cs_talent}cf>@{cf_talent}]]}} " +
		"{{result=[[0]]}} " +
		"{{criticality=[[0]]}} " +
		"{{critThresholds=[[[[@{cs_talent}]]d1cs0cf2 + [[@{cf_talent}]]d1cs0cf2]]}} ";
	debugLog(func, rollMacro);

	// Execute Roll
	results = await startRoll(rollMacro);
	debugLog(func, "test: info:", info, "results:", results);

	// Process Roll
	var rollID = results.rollId;
	results = results.results;
	var TaW = results.wert.result;
	var mod = results.mod.result;
	var stats = [
		results.stats.rolls[0].dice,
		results.stats.rolls[1].dice,
		results.stats.rolls[2].dice
	];
	var rolls = results.roll.rolls[0].results;
	var success = results.critThresholds.rolls[0].dice;
	var failure = results.critThresholds.rolls[1].dice;
	/* Result
	0	Failure
	1	Success
	*/
	var result = 0;
	/* Criticality
	-3	Triple 20
	-2	Double 20
	 0	no double 1/20
	+2	Double 1
	+3	Triple 1
	*/
	var criticality = 0;

	/*
		Doppel/Dreifach-1/20-Berechnung
		Vor der TaP*-Berechnung, da diese damit gegebenenfalls hinfällig wird
	*/
	{
		let successes = 0;
		let failures = 0;
		for (roll of rolls)
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
	var effRolls = rolls;
	var effTaW = TaW - mod;
	var TaPstar = effTaW;

	// Negativer TaW: |effTaW| zu Teilwürfen addieren
	if (criticality >= 2)
	{
		TaPstar = TaW;
		result = 1;
	} else {
		if (effTaW < 0)
		{
			for (roll in rolls)
			{
				effRolls[roll] = rolls[roll] + Math.abs(effTaW);
			}
			TaPstar = 0;
		}

		// TaP-Verbrauch für jeden Wurf
		for (roll in effRolls)
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

	finishRoll(
		rollID,
		{
			roll: TaPstar,
			result: result,
			criticality: criticality,
			stats: stats.toString().replaceAll(",", "/")
		}
	);
});

on(talents_ebe.map(talent => "clicked:" + talent + "-ebe-action").join(" "), async (info) => {
	var func = "Action Listener for Talent Roll Buttons With Encumbrance";
	var trigger = info["triggerName"].replace(/clicked:([^-]+)-ebe-action/, '$1');
	var nameInternal = talentsData[trigger]["internal"];
	var nameUI = talentsData[trigger]["ui"];
	debugLog(func, trigger, talentsData[trigger]);

	// Build Roll Macro
	var rollMacro = "";
	var ebeMacro = "@{BE}";
	var talentEbeData = effectiveEncumbrance[trigger];
	console.log(talentEbeData);
	if (talentEbeData["type"] === "factor")
	{
		ebeMacro = talentEbeData["value"].toString() + " * " + ebeMacro;
	} else if (talentEbeData["type"] === "summand") {
		ebeMacro += talentEbeData["value"].toString();
	}

	rollMacro +=
		"@{gm_roll_opt} " +
		"&{template:talent-ebe} " +
		"{{name=" + nameUI + "}} " +
		"{{wert=[[@{TaW_" + nameInternal + "}d1cs0cf2]]}} " +
		"{{mod=[[ 0d1 + ?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2 + [[{0d1 + " + ebeMacro + ", 0d1}kh1]]d1cs0cf2 ]]}} " +
		"{{stats=[[ " +
			"[Eigenschaft 1:] [[@{Eigenschaft1" + nameInternal + "}]]d1cs0cf2 + " +
			"[Eigenschaft 2:] [[@{Eigenschaft2" + nameInternal + "}]]d1cs0cf2 + " +
			"[Eigenschaft 3:] [[@{Eigenschaft3" + nameInternal + "}]]d1cs0cf2" +
			"]]}} " +
		"{{roll=[[3d20cs<@{cs_talent}cf>@{cf_talent}]]}} " +
		"{{result=[[0]]}} " +
		"{{criticality=[[0]]}} " +
		"{{critThresholds=[[[[@{cs_talent}]]d1cs0cf2 + [[@{cf_talent}]]d1cs0cf2]]}} " +
		"{{ebe=[[{0d1 + " + ebeMacro + ", 0d1}kh1]]}} ";
	debugLog(func, rollMacro);

	// Execute Roll
	results = await startRoll(rollMacro);
	debugLog(func, "test: info:", info, "results:", results);

	// Process Roll
	var rollID = results.rollId;
	results = results.results;
	var TaW = results.wert.result;
	var modTotal = results.mod.result;
	var ebe = results.ebe.result;
	var modOnly = modTotal - ebe;

	var stats = [
		results.stats.rolls[0].dice,
		results.stats.rolls[1].dice,
		results.stats.rolls[2].dice
	];
	var rolls = results.roll.rolls[0].results;
	var success = results.critThresholds.rolls[0].dice;
	var failure = results.critThresholds.rolls[1].dice;
	/* Result
	0	Failure
	1	Success
	*/
	var result = 0;
	/* Criticality
	-3	Triple 20
	-2	Double 20
	 0	no double 1/20
	+2	Double 1
	+3	Triple 1
	*/
	var criticality = 0;

	/*
		Doppel/Dreifach-1/20-Berechnung
		Vor der TaP*-Berechnung, da diese damit gegebenenfalls hinfällig wird
	*/
	{
		let successes = 0;
		let failures = 0;
		for (roll of rolls)
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
	var effRolls = rolls;
	var effTaW = TaW - modTotal;
	var TaPstar = effTaW;

	// Negativer TaW: |effTaW| zu Teilwürfen addieren
	if (criticality >= 2)
	{
		TaPstar = TaW;
		result = 1;
	} else {
		if (effTaW < 0)
		{
			for (roll in rolls)
			{
				effRolls[roll] = rolls[roll] + Math.abs(effTaW);
			}
			TaPstar = 0;
		}

		// TaP-Verbrauch für jeden Wurf
		for (roll in effRolls)
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

	finishRoll(
		rollID,
		{
			mod: modOnly,
			roll: TaPstar,
			result: result,
			criticality: criticality,
			stats: stats.toString().replaceAll(",", "/")
		}
	);
});

on(spells.map(spell => "clicked:" + spell + "-action").join(" "), async (info) => {
	var func = "Action Listener for Spell Roll Buttons";
	var trigger = info["triggerName"].replace(/clicked:([^-]+)-action/, '$1');
	var nameInternal = spellsData[trigger]["internal"];
	var nameUI = spellsData[trigger]["ui"];
	var stats = spellsData[trigger]["stats"];
	debugLog(func, trigger, spellsData[trigger]);

	// Build Roll Macro
	var rollMacro = "";

	rollMacro +=
		"@{gm_roll_opt} " +
		"&{template:zauber} " +
		"{{name=" + nameUI + "}} " +
		"{{wert=[[@{ZfW_" + nameInternal + "}d1cs0cf2]]}} " +
		"{{mod=[[?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2]]}} " +
		"{{stats=[[ " +
			"[Eigenschaft 1:] [[@{" + stats[0] + "}]]d1cs0cf2 + " +
			"[Eigenschaft 2:] [[@{" + stats[1] + "}]]d1cs0cf2 + " +
			"[Eigenschaft 3:] [[@{" + stats[2] + "}]]d1cs0cf2" +
			"]]}} " +
		"{{roll=[[3d20cs<@{cs_zauber}cf>@{cf_zauber}]]}} " +
		"{{result=[[0]]}} " +
		"{{criticality=[[0]]}} " +
		"{{critThresholds=[[[[@{cs_zauber}]]d1cs0cf2 + [[@{cf_zauber}]]d1cs0cf2]]}} ";
	debugLog(func, rollMacro);

	// Execute Roll
	results = await startRoll(rollMacro);
	console.log("test: info:", info, "results:", results);
	var rollID = results.rollId;
	results = results.results;
	var TaW = results.wert.result;
	var mod = results.mod.result;
	var stats = [
		results.stats.rolls[0].dice,
		results.stats.rolls[1].dice,
		results.stats.rolls[2].dice
	];
	var rolls = results.roll.rolls[0].results;
	var success = results.critThresholds.rolls[0].dice;
	var failure = results.critThresholds.rolls[1].dice;
	/* Result
	-1	Failure (due to Firm Matrix)
	 0	Failure
	 1	Success
	 2	Success (due to Firm Matrix)
	*/
	var result = 0;
	/* Criticality
	-4	Two or more dice same result (not 1, not 20); via Spell Stalling (Spruchhemmung)
	-3	Triple 20
	-2	Double 20
	 0	no double 1/20
	+2	Double 1
	+3	Triple 1
	*/
	var criticality = 0;

	safeGetAttrs(["v_festematrix", "n_spruchhemmung"], function(v) {
		/*
			Doppel/Dreifach-1/20-Berechnung
			Vor der TaP*-Berechnung, da diese damit gegebenenfalls hinfällig wird
		*/
		/*
		Variable, um festhalten zu können, dass ein
			* normal misslungenes Ergebnis ohne Feste Matrix automatisch misslungen wäre und
			* normal gelungenes Ergebnis ohne Feste Matrix automatisch misslungen wäre
		*/
		var festeMatrixSave = false;
		{
			let successes = 0;
			let failures = 0;
			let festeMatrix = v["v_festematrix"] === "0" ? false : true;
			let spruchhemmung = v["n_spruchhemmung"] === "0" ? false : true;

			for (roll of rolls)
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
			// feste Matrix
			if (festeMatrix && criticality === -2)
			{
				criticality = -1;
				festeMatrixSave = true;

				for (roll of rolls)
				{
					if (
						(roll > success) &&
						(roll < failure) &&
						(
							roll === 18 || roll === 19
						)
					)
					{
						criticality -= 1;
						festeMatrixSave = false;
					}
				}
			}
			// Spruchhemmung, soll nur auslösen, wenn eh nicht Doppel/Dreifach-1/20
			if (
				spruchhemmung &&
				criticality > -2 &&
				criticality < 2 &&
				(
					(rolls[0] === rolls[1]) ||
					(rolls[1] === rolls[2]) ||
					(rolls[2] === rolls[0])
				)
			)
			{
				criticality = -4;
			}
		}

		/*
			TaP*-Berechnung
		*/
		var effRolls = rolls;
		var effTaW = TaW - mod;
		var TaPstar = effTaW;

		// Negativer TaW: |effTaW| zu Teilwürfen addieren
		if (criticality >= 2)
		{
			TaPstar = TaW;
			result = 1;
		} else {
			if (effTaW < 0)
			{
				for (roll in rolls)
				{
					effRolls[roll] = rolls[roll] + Math.abs(effTaW);
				}
				TaPstar = 0;
			}

			// TaP-Verbrauch für jeden Wurf
			for (roll in effRolls)
			{
				TaPstar -= Math.max(0, effRolls[roll] - stats[roll]);
			}

			// Max. TaP* = TaW
			TaPstar = Math.min(TaW, TaPstar);

			// Ergebnis an Doppel/Dreifach-20 anpassen
			if (Math.abs(criticality) <= 1)
			{
				result = TaPstar < 0 ? 0 : 1;
				if (festeMatrixSave && result === 0)
				{
					result = -1;
				} else if (festeMatrixSave && result === 1)
				{
					result = 2;
				}
			} else if (criticality <= -2) {
				result = 0;
			}
		}

		finishRoll(
			rollID,
			{
				roll: TaPstar,
				result: result,
				criticality: criticality,
				stats: stats.toString().replaceAll(",", "/")
			}
		);
	});
});

on('clicked:eidsegen-action', async (info) => {
	results = await startRoll(
		"@{gm_roll_opt} " +
		"&{template:liturgie} " +
		"{{name=Eidsegen}} " +
		"{{wert=[[@{Liturgiekenntnis}d1cs0cf2]]}} " +
		"{{mod=[[ ?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2 ]]}} " +
		"{{stats=[[ [Eigenschaft 1:] [[@{MU}]]d1cs0cf2 + [Eigenschaft 2:] [[@{IN}]]d1cs0cf2 + [Eigenschaft 3:] [[@{CH}]]d1cs0cf2]]}} " +
		"{{roll=[[3d20cs<0cf>21]]}} " +
		"{{result=[[0]]}} "
	);
	console.log("test: info:", info, "results:", results);
	var rollID = results.rollId;
	results = results.results;
	var TaW = results.wert.result;
	var mod = results.mod.result;
	var stats = [
		results.stats.rolls[0].dice,
		results.stats.rolls[1].dice,
		results.stats.rolls[2].dice
	];
	var rolls = results.roll.rolls[0].results;
	/* Result
	0	Failure
	1	Success
	*/
	var result = 0;

	/*
		TaP*-Berechnung
	*/
	var effRolls = rolls;
	var effTaW = TaW - mod;
	var TaPstar = effTaW;

	// Negativer TaW: |effTaW| zu Teilwürfen addieren
	if (effTaW < 0)
	{
		for (roll in rolls)
		{
			effRolls[roll] = rolls[roll] + Math.abs(effTaW);
		}
		TaPstar = 0;
	}

	// TaP-Verbrauch für jeden Wurf
	for (roll in effRolls)
	{
		TaPstar -= Math.max(0, effRolls[roll] - stats[roll]);
	}

	// Max. TaP* = TaW
	TaPstar = Math.min(TaW, TaPstar);

	// Ergebnis hängt nur von TaP* ab
	result = TaPstar < 0 ? 0 : 1;

	finishRoll(
		rollID,
		{
			roll: TaPstar,
			result: result,
			stats: stats.toString().replaceAll(",", "/")
		}
	);
});

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
		'ui': 'Meisterliches Entwaffnen (Pairerwaffenparade)',
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
}

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
		for (macro of elements) {
			if (macro.hasOwnProperty("prefix")) {
				transformed["common"]["prefix"] += macro["prefix"] + " ";
			} else if (macro.hasOwnProperty("suffix")) {
				transformed["common"]["suffix"] += macro["suffix"] + " ";
			} else {
				transformed["string"]["main"] += '{{' + macro["name"] + '=' + macro["value"] + '}} ';
				transformed["object"]["main"][macro["name"]] = '{{' + macro["name"] + '=' + macro["value"] + '}}';
			}
		}
		transformed["string"]["full"] = transformed["common"]["prefix"] + transformed["string"]["main"] + transformed["common"]["suffix"];

		// "prefix" and "suffix" are reserved for this internal use case, so check against accidentally using them
		if (
			transformed["object"]["main"].hasOwnProperty("prefix") === true
			||
			transformed["object"]["main"].hasOwnProperty("suffix") === true
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
			var template = data.hasOwnProperty('template') ? data["template"] : 'test';
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
					passthrough["rollMacro"] =
						allElements[0]["prefix"] + " " +
						"{{name=" + data["ui"] + "}} " +
						"{{mod=[[" + mod + "]]}} " +
						"{{ansage=[[" + ansage + "]]}} " +
						"{{wert=[[" + wert + "]]}} " +
						"{{taw=[[" + taw + "]]}} " +
						allElementsObject["roll0"] +
						allElementsObject["roll1"] +
						allElementsObject["roll2"] +
						allElementsObject["confirmationRoll0"] +
						allElementsObject["confirmationRoll1"] +
						allElementsObject["confirmationRoll2"] +
						"{{msg=[[0]]}} " +
						"{{characterid=" + v["character_id"] + "}} " +
						"{{charactername=" + v["character_name"] + "}} " +
						"{{result=[[0]]}} " +
						"{{isConfirmationRoll=[[1]]}} " +
						"{{confirmationRollRequired=[[1]]}} " +
						"{{showRollTag=[[@{show_roll_tags}]]}} " +
						"{{rollTag=[[0]]}} " +
						"{{rollTime=[[0]]}} " +
						"{{rollExpired=[[0]]}} " +
						"{{rollTimeHuman=[[0]]}} " +
						"{{passthrough=[[0]]}}";
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

on('clicked:patzer', async (info) => {
	var received = unpackObject(info["originalRollId"]);

	/*
	Timing Check
	People may try to cheat by reacting to an old roll
	*/
	var rollTime = 0;
	results = await startRoll(received["rollMacro"]);
	console.log("test: info:", info, "results:", results, "received:", received);

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

	finishRoll(
		results.rollId,
		{
			rollExpired: rollTime,
			rollTag: received["rollTag"], // original roll's tag
			rollTime: received["rollTime"], // original roll's time
			rollTimeHuman: Math.floor(timeDifference / minute)
		}
	);
});
