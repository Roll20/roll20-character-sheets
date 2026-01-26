/* ranged_combat_calculator start */
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
		case '@{AT_feuerwaffen}':
			FKWtype = 'Feuerwaffen';
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
	"change:sf_scharfschutze_feuerwaffen change:sf_meisterschutze_feuerwaffen " +
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
				'sf_scharfschutze_feuerwaffen',
				'sf_meisterschutze_feuerwaffen',
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
						case "Feuerwaffen":
							if(v.sf_scharfschutze_feuerwaffen == "1") {FKW.schuetze = 1;}
							if(v.sf_meisterschutze_feuerwaffen == "1") {FKW.schuetze = 2;}
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
								case "Feuerwaffen":
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
										case "Feuerwaffen":
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

/* CRP for projectile subtraction */
on("clicked:rc_attack-action", async (info) => {
	var func = "Action Listener for Ranged Combat Roll Button";
	var trigger = info["triggerName"].replace(/clicked:([^-]+)-action/, '$1');

	let rollMacro = [
		'@{gm_roll_opt}',
		'&{template:DSA-Fernkampf-AT}',
		'{{name=Fernkampfangriff}}',
		'{{mod=[[(@{fkr_erschwernis_gesamt}) - (@{fkr_erschwernis_ansage_gesamt})]]}}',
		'{{ansage=[[@{fkr_erschwernis_ansage_gesamt}]]}}',
		'{{modansage=[[@{fkr_erschwernis_gesamt}]]}} {{wert=[[(@{FK_Aktiv})]]}}',
		'{{eff_wert=[[(@{FK_Aktiv}) - (@{fkr_erschwernis_gesamt})]]}}',
		'{{eff_wert_ohne_kampfgetuemmel=[[(@{FK_Aktiv}) - (@{fkr_erschwernis_ohne_kampfgetuemmel})]]}}',
		'{{ZieleKampfgetuemmel=[[@{fkr_kampfgetuemmel_ziele}]]}}',
		'{{wurf=[[1d20cs<@{cs_kampf_fk}cf>@{cf_kampf_fk}]]}}',
		'{{pruefwurf=[[1d20cs<@{cs_kampf_fk}cf>@{cf_kampf_fk}]]}}'
	];

	safeGetAttrs(
		[
			'FKW_Aktiv1', 'FKWMunition1Anzahl',
			'FKW_Aktiv2', 'FKWMunition2Anzahl',
			'FKW_Aktiv3', 'FKWMunition3Anzahl',
			'FKW_Aktiv4', 'FKWMunition4Anzahl'
		], async function(values) {
		let attrsToChange = {};

		// Projectile subtraction
		// rcw: ranged combat weapon
		let rcwActive = 0;
		let rcwAmmo = 0;

		// Get active ranged combat weapon
		if(values.FKW_Aktiv1 == "1") { rcwActive = 1; }
		else if (values.FKW_Aktiv2 == "1") { rcwActive = 2; }
		else if (values.FKW_Aktiv3 == "1") { rcwActive = 3; }
		else if (values.FKW_Aktiv4 == "1") { rcwActive = 4; }

		// Get ammo of active ranged combat weapon
		switch(rcwActive)
		{
			case 0:
				debugLog(func, 'Keine aktive Fernkampfwaffe gefunden, automatischer Munitionsverbrauch nicht möglich.');
				break;
			case 1:
			case 2:
			case 3:
			case 4:
				rcwAmmo = parseInt(values[`FKWMunition${rcwActive}Anzahl`]);
				break;
		}

		if (DSAsane(rcwAmmo, "non-negative int"))
		{
			if (rcwAmmo > 0)
			{
				rollMacro.push(`{{ammoRemaining=[[${rcwAmmo - 1}]]}}`);
				rollMacro.push(`{{ammohint=[[0]]}}`);
				attrsToChange[`FKWMunition${rcwActive}Anzahl`] = rcwAmmo - 1;
			} else {
				rollMacro.push(`{{ammoRemaining=[[0]]}}`);
				rollMacro.push(`{{ammohint=[[1]]}}`);
			}
		} else {
			debugLog(func, `'FKWMunition${rcwActive}Anzahl' enthält keinen gültigen Wert.`);
			rollMacro.push(`{{ammohint=[[2]]}}`);
		}

		debugLog(func, rollMacro, attrsToChange);
		safeSetAttrs(attrsToChange);

		// Execute Roll
		results = await startRoll(rollMacro.join(" "));
		debugLog(func, "test: info:", info, "results:", results);

		// Process Roll
		let rollID = results.rollId;

		finishRoll(
			rollID,
			{}
		);
	});
});

/* ranged_combat_calculator end */
