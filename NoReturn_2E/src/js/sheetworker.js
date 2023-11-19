/*
    CREATED by          Gorthian
    Letzte Änderung		2023-10-05
*/

/* TAB MENU */
const buttonlist = ["page-one","page-two","page-three",,"page-four"]; //Bei Änderungen auch die globale Variable in noreturn.pug anpassen
buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        console.log(button);
        setAttrs({
            sheetTab: button
        });
    });
});

/* Konstanten */

// Die Attribute
const attributeslist = [
    "geschick","staerke","konstitution","beweglichkeit","wahrnehmung","wissen","charisma","handwerk"
];

// Die Fertigkeiten. Anpassungen müssen auch in noreturn.pug übernommen werden
const skilllist = [
    ['akrobatik','beweglichkeit'],
    ['astronomie','wissen'],
    ['ausdauer','konstitution'],
    ['ausweichen','beweglichkeit'],
    ['basteln','handwerk'],
    ['blocken','konstitution'],
    ['bodenfahrzeuge','geschick'],
    ['chemie','wissen'],
    ['computer','wissen'],
    ['dressieren','charisma'],
    ['einschuechtern_ch','charisma'],
    ['einschuechtern_st','staerke'],
    ['elektronik','handwerk'],
    ['feuerwaffenbau','handwerk'],
    ['fluggeraete','geschick'],
    ['gassenwissen','wissen'],
    ['geschuetze','geschick'],
    ['grossraumschiff','wissen'],
    ['heimlichkeit','wahrnehmung'],
    ['inspiration','charisma'],
    ['klettern','beweglichkeit'],
    ['kunst','handwerk'],
    ['mechanik','handwerk'],
    ['medizin','wissen'],
    ['menschenkenntnis','charisma'],
    ['nachforschen','wahrnehmung'],
    ['nahkampf','beweglichkeit'],
    ['naturkunde','wissen'],
    ['orientierung','wahrnehmung'],
    ['projektilwaffen','geschick'],
    ['raumjaeger','geschick'],
    ['raumschiff','geschick'],
    ['reaktion','wahrnehmung'],
    ['reiten','beweglichkeit'],
    ['rennen','beweglichkeit'],
    ['robotik','handwerk'],
    ['ruestungsbau','handwerk'],
    ['sagen-mythen','wissen'],
    ['saufen','konstitution'],
    ['schaetzen','wahrnehmung'],
    ['schauspiel','charisma'],
    ['schiessen','geschick'],
    ['schwere-waffen','geschick'],
    ['schwimmen','beweglichkeit'],
    ['sicherheitstechnik','handwerk'],
    ['spezies','wissen'],
    ['springen','beweglichkeit'],
    ['spruehwaffen','geschick'],
    ['stemmen','staerke'],
    ['taschendiebstahl','geschick'],
    ['ueberreden','charisma'],
    ['verhandeln','charisma'],
    ['waffenbau','handwerk'],
    ['waffenkampf','beweglichkeit'],
    ['wasserfahrzeuge','geschick'],
    ['willenskraft','wissen'],
    ['wurfwaffen','geschick'],
    ['zero-g','beweglichkeit'],
];

/* Hilfsfunktionen */

//Befüllen des Dicebots
function setDicebot(skill,attribut,summe,skillNotiz,hazard=1,biomechanik=0) {
    if (summe < 1) {summe = 1} // Man hat immer mindestens einen Würfel

    setAttrs({
        "probe_skill"                       : skill,
        "probe_attribut"                    : attribut,
        "probe_summe_wuerfel"               : summe,
        "probe_skill_notiz"                 : skillNotiz,
        "probe_original_hazard_wuerfel"     : hazard,
        "probe_hazard_wuerfel"              : hazard,
        "probe_original_standard_wuerfel"   : summe-hazard,
        "probe_standard_wuerfel"            : summe-hazard,               
        "probe_bonus_wuerfel"               : 0,
        "probe_bonus"                       : 0,
        "probe_biomechanik"                 : biomechanik,        
    });
}

//Trefferpunkte setzen
function setTrefferpunkte() {
    getAttrs(["trefferpunkte","trefferpunkte-old","trefferpunkte-zone-2","trefferpunkte-zone-3","trefferpunkte-zone-4","trefferpunkte-zone-5","trefferpunkte-zone-6","trefferpunkte-zone-7","trefferpunkte-zone-8","trefferpunkte-zone-9","trefferpunkte-zone-10","trefferpunkte-zone-11","trefferpunkte-zone-12"], function(values) {
        let trefferpunkte = parseInt(values["trefferpunkte"]||30); //Standardwert ist 30
        let trefferpunkte_old = parseInt(values["trefferpunkte-old"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone2 = parseInt(values["trefferpunkte-zone-2"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone3 = parseInt(values["trefferpunkte-zone-3"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone4 = parseInt(values["trefferpunkte-zone-4"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone5 = parseInt(values["trefferpunkte-zone-5"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone6 = parseInt(values["trefferpunkte-zone-6"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone7 = parseInt(values["trefferpunkte-zone-7"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone8 = parseInt(values["trefferpunkte-zone-8"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone9 = parseInt(values["trefferpunkte-zone-9"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone10 = parseInt(values["trefferpunkte-zone-10"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone11 = parseInt(values["trefferpunkte-zone-11"]||trefferpunkte); //Standardwert sind die allgemeinen TP
        let zone12 = parseInt(values["trefferpunkte-zone-12"]||trefferpunkte); //Standardwert sind die allgemeinen TP

        setAttrs({
            "trefferpunkte"             : trefferpunkte,
            "trefferpunkte-zone-2"      : zone2==trefferpunkte_old?trefferpunkte:zone2,
            "trefferpunkte-zone-3"      : zone3==trefferpunkte_old?trefferpunkte:zone3,
            "trefferpunkte-zone-4"      : zone4==trefferpunkte_old?trefferpunkte:zone4,
            "trefferpunkte-zone-5"      : zone5==trefferpunkte_old?trefferpunkte:zone5,
            "trefferpunkte-zone-6"      : zone6==trefferpunkte_old?trefferpunkte:zone6,
            "trefferpunkte-zone-7"      : zone7==trefferpunkte_old?trefferpunkte:zone7,
            "trefferpunkte-zone-8"      : zone8==trefferpunkte_old?trefferpunkte:zone8,
            "trefferpunkte-zone-9"      : zone9==trefferpunkte_old?trefferpunkte:zone9,
            "trefferpunkte-zone-10"     : zone10==trefferpunkte_old?trefferpunkte:zone10,
            "trefferpunkte-zone-11"     : zone11==trefferpunkte_old?trefferpunkte:zone11,
            "trefferpunkte-zone-12"     : zone12==trefferpunkte_old?trefferpunkte:zone12,
            "trefferpunkte-old"         : trefferpunkte
        });
    });
}

//Werte für eine Sprachprobe im Dicebot setzen
function setzeSprachprobe(name, stufe) {
    let hazard = 1;
    let summe = stufe;

    if (stufe==0) {summe = summe -2} //Ist die Fertigkeitsstufe 0, bekommt die Probe einen Malus von 2
    setDicebot(name,getTranslationByKey("sprachprobe"),summe,"",hazard,0);
}

// DMG Schwellwert setzen
function setDMGSchwellwert() {
    getAttrs(["trefferpunkte","schmerztoleranz"], function(values) {
        let trefferpunkte = parseInt(values["trefferpunkte"]||30);
        let schmerztoleranz = parseInt(values["schmerztoleranz"]||3);
        let DMGSchwellwert = (trefferpunkte/10)*schmerztoleranz;

        setAttrs({
            "dmg_schwellwert"           : DMGSchwellwert
        });
    });
}

/* Rolltemplates */

// Skillproben
skilllist.forEach(skills => {
    let skill = skills[0];
    let attribut = skills[1];
    on(`clicked:probe-${skill}-${attribut}`, function() {        
        getAttrs([skill, skill+"_mod", skill+"_biomechanik",  attribut, attribut+"-biomechanik"], function(values) {
            let summeSkill = 0;
            let summeAttribut = 0;
            let summe = 0;
            let hazard = 0;
            let skillNotiz = values[skill+"_mod"];
            let biomechanik_skill = parseInt(values[skill+"_biomechanik"]||0);
            let biomechanik_attribut = parseInt(values[attribut+"-biomechanik"]||0);
            let attributWert = parseInt(values[attribut]||0);            
    
            summeSkill = parseInt(values[skill]);
            summeAttribut = attributWert;
            summe = summeSkill + summeAttribut;

            if (summeSkill==0) {summe = summe -2} //Ist die Fertigkeitsstufe 0, bekommt die Probe einen Malus von 2

            if(biomechanik_skill==1) { //Hat die Fertigkeit Biomechanik werden alle Fertigkeits-Würfel zu Hazard-Di
                hazard = hazard+summeSkill;
            }
            if(biomechanik_attribut==1) { //Hat das Attribut Biomechanik werden alle Attributs-Würfel zu Hazard-Di
                hazard = hazard+summeAttribut;
            }
            if (hazard==0) { //Man hat immer mindestens einen Hazard-Di
                hazard=1;
            }

            setDicebot(getTranslationByKey(skill),getTranslationByKey(attribut),summe,skillNotiz,hazard,biomechanik_skill||biomechanik_attribut);
        });
    });
});

// Attributsproben
// ...ohne Modifikatoren
attributeslist.forEach(attribut => {    
    on(`clicked:probe-ohne-mod-${attribut}`, function() {        
        getAttrs([attribut, attribut+"-biomechanik"], function(values) {
            let summe = parseInt(values[attribut]||0);
            let hazard = 0;
            let biomechanik = parseInt(values[attribut+"-biomechanik"]||0);
     
            if(biomechanik==1) { //Hat das Attribut Biomechanik werden alle Fertigkeits-Würfel zu Hazard-Di
                hazard = summe;
            }
            setDicebot(getTranslationByKey("attributsprobe"),getTranslationByKey(attribut),summe," ",hazard);
        });
    });
});

// Proben auf Besondere Fertigkeiten
on("clicked:repeating_besondere-fertigkeiten:probe", function(eventInfo) {
    getAttrs(["repeating_besondere-fertigkeiten_besondere-fertigkeit-name", "repeating_besondere-fertigkeiten_besondere-fertigkeit-stufe", "repeating_besondere-fertigkeiten_besondere-fertigkeit-attribut"], function(values) {
        let skillName = values["repeating_besondere-fertigkeiten_besondere-fertigkeit-name"];
        let skillStufe = parseInt(values["repeating_besondere-fertigkeiten_besondere-fertigkeit-stufe"]||0);
        let attributName = values["repeating_besondere-fertigkeiten_besondere-fertigkeit-attribut"];

        getAttrs([attributName, attributName+"-mod1", attributName+"-mod2",attributName+"-biomechanik"], function(values) {
            let summeAttribut = 0;
            let summe = 0;
            let hazard = 0;
            let biomechanik_attribut = parseInt(values[attributName+"-biomechanik"]||0);

            summeAttribut = parseInt(values[attributName]||0) + parseInt(values[attributName+"-mod1"]||0) + parseInt(values[attributName+"-mod2"]||0);
            summe = skillStufe + summeAttribut;
            if (skillStufe==0) {summe = summe -2} //Ist die Fertigkeitsstufe 0, bekommt die Probe einen Malus von 2
            if(biomechanik_attribut==1) { //Hat das Attribut Biomechanik werden alle Attributs-Würfel zu Hazard-Di
                hazard = hazard+summeAttribut;
            }
            if (hazard==0) { //Man hat immer mindestens einen Hazard-Di
                hazard=1;
            }

            setDicebot(skillName,getTranslationByKey(attributName),summe," ",hazard,biomechanik_attribut);
        });
    });
});

// Probe auf Infektionsresistenz
on("clicked:infektionsresistenz",function(){
    getAttrs(["character_name","infektionsresistenz_wuerfel","infektionsresistenz_bonus"], function(values) {
        let wuerfel = parseInt(values["infektionsresistenz_wuerfel"]);
        let bonus = parseInt(values["infektionsresistenz_bonus"]);
        let charaktername = values["character_name"];
        let roll = ""

        roll = "&{template:infektionsresistenz}"; //Das Rolltemplate festlegen
        roll = roll + "{{charaktername="+charaktername+"}}"; //Den Charakternamen mitgeben
        roll = roll + "{{wurf=[["+wuerfel+"d6]]}}"; 
        roll = roll + "{{bonus=[["+bonus+"]]}}";
        roll = roll + "{{summe=[[0]]}}";
        
        startRoll(roll, (results) => {
            const wurf = results.results.wurf.result;  
            const bonus = results.results.bonus.result;

            let summe = wurf + bonus;
            console.log(wurf + " " + bonus + " " + summe);
            let wurf_wuerfel = "";
            for (const n of results.results.wurf.dice) {
                wurf_wuerfel = wurf_wuerfel + ""+n+"";
            }
            
            finishRoll(
                results.rollId,
                {
                    summe: summe,
                    wurf: wurf_wuerfel
                }
            );
        });
    });
});

// Proben auf Sprachkenntnisse
on("clicked:repeating_sprachkenntnisse:probe", function(eventInfo) {
    getAttrs(["repeating_sprachkenntnisse_sprachkenntnisse-sprache", "repeating_sprachkenntnisse_sprachkenntnisse-stufe"], function(values) {
        let spracheName = values["repeating_sprachkenntnisse_sprachkenntnisse-sprache"];
        let spracheStufe = parseInt(values["repeating_sprachkenntnisse_sprachkenntnisse-stufe"]||0);

        setzeSprachprobe(spracheName,spracheStufe);        
    });
});

// Probe speziell auf Babel
on("clicked:sprachprobe_babel", function(eventInfo) {
    getAttrs(["babel-stufe"], function(values) {
        let spracheName = "Babel"
        let spracheStufe = parseInt(values["babel-stufe"]||0);

        setzeSprachprobe(spracheName,spracheStufe);
    });
});

on("clicked:wirf-probe",function(){
    getAttrs(["character_name","probe_summe_wuerfel","probe_standard_wuerfel","probe_original_standard_wuerfel","probe_hazard_wuerfel","probe_original_hazard_wuerfel","probe_bonus_wuerfel","probe_bonus","probe_skill","probe_attribut","probe_biomechanik"], function(values) {
        let summe = parseInt(values["probe_summe_wuerfel"]);
        let standard = parseInt(values["probe_standard_wuerfel"]);
        let standard_orig = parseInt(values["probe_original_standard_wuerfel"]);
        let hazard = parseInt(values["probe_hazard_wuerfel"]);
        let hazard_orig = parseInt(values["probe_original_hazard_wuerfel"]);
        let bonuswuerfel = parseInt(values["probe_bonus_wuerfel"]||0);
        let bonus = parseInt(values["probe_bonus"]||0);
        let skill = values["probe_skill"];
        let attribut = values["probe_attribut"];
        let charaktername = values["character_name"];
        let roll = "";
        let modifiziert = "";
        let biomechanik = parseInt(values["probe_biomechanik"]);
        if (biomechanik==0) {biomechanik=""};

        //Bei negativen Bonuswürfeln die Anzahl an Würfeln reduzieren
        if (bonuswuerfel <0)
        {
            //Bei negativen Bonuswürfeln zunächst die Standard-Würfel und dann die Hazard-Würfel reduzieren
            standard = standard + bonuswuerfel;
            if(standard <0)
            {
                hazard = hazard + standard;
                standard = 0;
            }                
            if (hazard<1) {hazard=1} //Mindestens ein Hazard-würfel bleibt immer übrig            
        }

        if(standard_orig != standard || hazard_orig != hazard) {modifiziert=1;}
        if(skill == "Undefined") {skill="";}
        if(attribut == "Undefined") {attribut="";}

        roll = "&{template:probe_offen}"; //Das Rolltemplate festlegen
        roll = roll + "{{charaktername="+charaktername+"}}"; //Den Charakternamen mitgeben
        roll = roll + "{{fertigkeit="+skill+"}}"; //Die Fertigkeit auf die gewürfelt wird
        roll = roll + "{{attribut="+attribut+"}}"; //Das Attribut auf das gewürfelt wird
        roll = roll + "{{hazard=[["+hazard+"d6!6]]}}"; //Der Hazard-Wurf            
        roll = roll + "{{wurf=[["+standard+"d6]]}}"; //Der normale Wurf
        roll = roll + "{{bonuswurf=[["+bonuswuerfel+"d6]]}}"; //Die Bonuswürfel
        roll = roll + "{{bonus=[["+bonus+"]]}}"; //Bonus abfragen
        roll = roll + "{{summe=[["+summe+"]]}}"; //Platzhalter für die Summe
        roll = roll + "{{modifiziert="+modifiziert+"}}"; //Schalter um modifizierte Würfe anzuzeigen
        roll = roll + "{{biomechanik="+biomechanik+"}}"; //Schalter um Biomechanikürfe anzuzeigen

        startRoll(roll, (results) => {
            const hazard = parseInt(results.results.hazard.result);                
            const wurf = parseInt(results.results.wurf.result);  
            const bonuswurf = parseInt(results.results.bonuswurf.result);              
            const bonus = parseInt(results.results.bonus.result);
            let summe = 0;

            console.log(bonuswurf);
            if(bonuswurf<1)
            {
                summe = hazard+wurf+bonus;
            } else {
                summe = hazard+wurf+bonuswurf+bonus;
            }

            let hazard_wuerfel = "";
            for (const n of results.results.hazard.dice) {
                hazard_wuerfel = hazard_wuerfel + ""+n+"";
            }

            let wurf_wuerfel = "";
            for (const n of results.results.wurf.dice) {
                wurf_wuerfel = wurf_wuerfel + ""+n+"";
            }

            let wurf_bonus = "";
            for (const n of results.results.bonuswurf.dice) {
                wurf_bonus = wurf_bonus + ""+n+"";
            }

            finishRoll(
                results.rollId,
                {
                    summe: summe,
                    hazard: hazard_wuerfel,                
                    wurf: wurf_wuerfel,
                    bonuswurf: wurf_bonus
                }
            );                
        });
    });        
});

on("clicked:trefferzone",function(){
    roll = "&{template:trefferzone}"; //Das Rolltemplate festlegen
    roll = roll + "{{zone=[[2d6]]}}"; //Die Zone auswürfeln    

    startRoll(roll, (results) => {
        const zone=results.results.zone.result;
        let zoneText=getTranslationByKey("trefferzone-"+zone);
        
        finishRoll(
            results.rollId,
            {
                zone: zoneText,                
            }
        );                
    });
});

on("change:probe_hazard_wuerfel", function(){
    getAttrs(["probe_summe_wuerfel","probe_standard_wuerfel","probe_hazard_wuerfel"], function(values) {
        let summe = parseInt(values["probe_summe_wuerfel"]);
        let standard = parseInt(values["probe_standard_wuerfel"]);
        let hazard = parseInt(values["probe_hazard_wuerfel"]);

        standard = summe - hazard;
        if(hazard < 1) {hazard = 1}
        if(standard < 0) {standard = 0}        
        
        setAttrs({
            "probe_summe_wuerfel"       : summe,
            "probe_standard_wuerfel"    : standard,
            "probe_hazard_wuerfel"      : hazard
        });
    });
});

on("sheet:opened", function() {
    //Standardwerte setzen
    setTrefferpunkte();
    getAttrs(["organismus","psyche","schmerztoleranz"], function(values) {
        let organismus = parseInt(values["organismus"]||100);
        let psyche = parseInt(values["psyche"]||100);
        let schmerztoleranz = parseInt(values["schmerztoleranz"]||3);

        setAttrs({
            "organismus"        : organismus,
            "psyche"            : psyche,
            "schmerztoleranz"   : schmerztoleranz
        });
    });
});

on("change:trefferpunkte", function() {
    setTrefferpunkte();
    setDMGSchwellwert();
});

on("change:schmerztoleranz", function() {
    setDMGSchwellwert();
});