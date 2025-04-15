function attributsprobe(attribut) {
    // console.log("Starte Attributsprobe");
    getAttrs([attribut,attribut+"_bonus"], function(values) {
        let schwierigkeit = parseInt(values[attribut]||0);
        let bonus = parseInt(values[attribut+"_bonus"]||0);
        startRoll("&{template:attributsprobe} {{attribut="+getTranslationByKey(attribut)+"}} {{wurf=[[1d20]]}} {{schwierigkeit=[["+schwierigkeit+"]]}} {{bonus=[["+bonus+"]]}} {{beschreibung=[[0]]}}", (results) => {
            const wurf = results.results.wurf.result
            const schwierigkeit = results.results.schwierigkeit.result;
            const bonus = results.results.bonus.result;
            let ergebnis = schwierigkeit+bonus-wurf;
            let beschreibung = "";

            if (ergebnis < -10) {beschreibung = getTranslationByKey("info-katastrophaler_fehlschlag");} else
            if (ergebnis < -5 && ergebnis > -11) {beschreibung = getTranslationByKey("info-unangenehmer_fehlschlag");} else
            if (ergebnis < 0 && ergebnis > -6) {beschreibung = getTranslationByKey("info-einfacher_fehlschlag");} else
            if (ergebnis == 0) {beschreibung = getTranslationByKey("info-erfolg");} else
            if (ergebnis > 0 && ergebnis < 6) {beschreibung = getTranslationByKey("info-einfacher_erfolg");} else
            if (ergebnis > 5 && ergebnis < 11) {beschreibung = getTranslationByKey("info-besonderer_erfolg");} else
            if (ergebnis > 10) {beschreibung = getTranslationByKey("info-exzellenter_erfolg");}
            // console.log(beschreibung);

            finishRoll(
                results.rollId,
                {
                    wurf: wurf,
                    schwierigkeit: schwierigkeit,
                    bonus: bonus,
                    beschreibung: beschreibung
                }
            )
        });
    });
}

function angriff(waffe) {
    // console.log("Starte Angriffs");
    getAttrs([waffe,waffe+"_attribut",waffe+"_schaden",waffe+"_notiz"], function(values) {
        let name = values[waffe]||"";
        let attribut = values[waffe+"_attribut"]||"";
        let schaden = parseInt(values[waffe+"_schaden"]||1);
        let notiz = values[waffe+"_notiz"]||"";

        startRoll("&{template:angriff} {{waffe="+name+"}} {{attribut="+getTranslationByKey(attribut)+"}} {{wurf=[["+schaden+"d6]]}} {{notiz="+notiz+"}} {{fehlschlag=[[0]]}} {{leichter_treffer=[[0]]}} {{mittlerer_treffer=[[0]]}} {{kritischer_treffer=[[0]]}}", (results) => {
            const wuerfel = results.results.wurf.dice;
            const wurf = results.results.wurf.dice.toString()
            let fehlschlag = 0;
            let leichter_treffer = 0;
            let mittlerer_treffer = 0;
            let kritischer_treffer = 0;

            for (ergebnis of wuerfel) {
                if (ergebnis == 1) fehlschlag = fehlschlag +1;
                if (ergebnis == 2) leichter_treffer = leichter_treffer +1;
                if (ergebnis == 3) leichter_treffer = leichter_treffer +1;
                if (ergebnis == 4) mittlerer_treffer = mittlerer_treffer +1;
                if (ergebnis == 5) mittlerer_treffer = mittlerer_treffer +1;
                if (ergebnis == 6) kritischer_treffer = kritischer_treffer +1;
            }

            // console.log(fehlschlag+","+leichter_treffer+","+mittlerer_treffer+","+kritischer_treffer);

            finishRoll(
                results.rollId,
                {
                    wurf: wurf,
                    fehlschlag: fehlschlag,
                    leichter_treffer: leichter_treffer,
                    mittlerer_treffer: mittlerer_treffer,
                    kritischer_treffer: kritischer_treffer
                }
            )
        });
    });
}

['intelligenz', 'mut', 'koerperkraft', 'geschick', 'charisma'].forEach(attr => {
    on(`clicked:probe-${attr}`, function() {
        attributsprobe(attr);
    });
});

['linke-hand', 'rechte-hand'].forEach(waffe => {
    on(`clicked:angriff-${waffe}`, function() {
        angriff(waffe);
    });
});