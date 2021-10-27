on(`clicked:mechaArmureARResilience`, async function(info) {
    let roll = info.htmlAttributes.value;

    let attributs = [
        "mechaArmureSystemes",
        "mechaArmureResilience",
        "mechaArmureResilience_max",
    ];

    let attrs = await getAttrsAsync(attributs);

    let exec = [];

    let system = +attrs["mechaArmureSystemes"];
    var resilience = +attrs["mechaArmureResilience"];
    var resilienceMax = +attrs["mechaArmureResilience_max"];
    var difficulte = Math.floor((resilienceMax-resilience)/2);

    let cRoll = [system];
    
    exec.push(roll);

    if(cRoll.length == 0)
        cRoll.push(0);

    exec.push("{{jDivers=^{test-autoreparation}}} {{jDiversV=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{jDivers2=^{difficulte}}} {{jDivers2V="+difficulte+"}} {{rollText=[[0]]}}");

    startRoll(exec.join(" "), (results) => {
        let test = results.results.jDiversV.result;
        let text = "";

        if(test > difficulte) {
            let recup = (test-difficulte)+resilience;

            if(recup > resilienceMax)
                recup = resilienceMax;

            var newAttr = {};
            newAttr["mechaArmureResilience"] = recup;
            
            setAttrs(newAttr);

            text = i18n_resilienceRepare+" ("+(test-difficulte)+")";
        } else
            text = i18n_resilienceRepare+" (0)";

        finishRoll(
            results.rollId, 
            {
                rollText:text
            }
        );            
    });
});

on(`clicked:mechaArmureARBlindage`, async function(info) {
    let roll = info.htmlAttributes.value;

    let attributs = [
        "mechaArmureSystemes",
        "mechaArmureBlindage",
        "mechaArmureBlindage_max",
    ];

    let attrs = await getAttrsAsync(attributs);

    let exec = [];

    let system = +attrs["mechaArmureSystemes"];
    var blindage = +attrs["mechaArmureBlindage"];
    var blindageMax = +attrs["mechaArmureBlindage_max"];
    var difficulte75 = Math.floor(blindageMax*0.75);
    var difficulte50 = Math.floor(blindageMax*0.50);
    var difficulte25 = Math.floor(blindageMax*0.25);
    var difficulte;

    if(blindage >= difficulte75)
        difficulte = 4;
    else if(blindage >= difficulte50)
        difficulte = 7;
    else if(blindage >= difficulte25)
        difficulte = 10;
    else
        difficulte = 15;

    let cRoll = [system];
    
    exec.push(roll);

    if(cRoll.length == 0)
        cRoll.push(0);

    exec.push("{{jDivers=^{test-autoreparation}}} {{jDiversV=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{jDivers2=^{difficulte}}} {{jDivers2V="+difficulte+"}}");

    startRoll(exec.join(" "), (results) => {
        let test = results.results.jDiversV.result;
        

        if(test > difficulte) {

            startRoll(roll+" {{jDivers="+i18n_blindageRepare+"}} {{jDiversV=[[2D6+6]]}}", (results) => {

                let recup = blindage+Number(results.results.jDiversV.result);

                if(recup > blindageMax)
                    recup = blindageMax;

                var newAttr = {};
                newAttr["mechaArmureBlindage"] = recup;
                
                setAttrs(newAttr);


                finishRoll(
                    results.rollId,{}
                );
            });
        }

        finishRoll(
            results.rollId,{}
        );            
    });
});

on(`clicked:manoeuvrabilite`, async function(info) {
    let roll = info.htmlAttributes.value;

    let attributs = [
        "jetModifDes",
        "bonusCarac",
        "caracteristique1MA",
        "caracteristique2MA",
        "caracteristique3MA",
        "caracteristique4MA",
        "mechaArmureTypeJets",
        "mechaArmureManoeuvrabilite",
        "mechaArmurePuissance",
        "mechaArmureSenseurs",
        "mechaArmureSystemes"
    ];

    let attrs = await getAttrsAsync(attributs);
    
    let exec = [];
    let isConditionnel = false;

    let type = +attrs["mechaArmureTypeJets"];

    let manoeuvrabilite = +attrs["mechaArmureManoeuvrabilite"];
    let puissance = +attrs["mechaArmurePuissance"];
    let senseurs = +attrs["mechaArmureSenseurs"];
    let systemes = +attrs["mechaArmureSystemes"];

    let mod = +attrs["jetModifDes"];
    let hasBonus = +attrs["bonusCarac"];

    let C1 = attrs["caracteristique1MA"];
    let C2 = attrs["caracteristique2MA"];
    let C3 = attrs["caracteristique3MA"];
    let C4 = attrs["caracteristique4MA"];

    let C1Nom = "";
    let C2Nom = "";
    let C3Nom = "";
    let C4Nom = "";

    let cRoll = [];
    let cNom1 = [];
    let cNom2 = [];

    let bonus = [];
    let OD = 0;

    exec.push(roll);

    exec.push("{{OD=true}}");

    let attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

    if(attrsCarac["C1"]) {
        C1Nom = attrsCarac["C1Brut"];

        let C1Value = attrsCarac["C1Base"];
        let C1OD = attrsCarac["C1OD"];

        cNom1.push(attrsCarac["C1Nom"]);
        cRoll.push(C1Value);

        OD += C1OD;
    }

    if(attrsCarac["C2"]) {
        C2Nom = attrsCarac["C2Brut"];

        let C2Value = attrsCarac["C2Base"];
        let C2OD = attrsCarac["C2OD"];

        cNom1.push(attrsCarac["C2Nom"]);
        cRoll.push(C2Value);

        OD += C2OD;
    }

    if(attrsCarac["C3"]) {
        C3Nom = attrsCarac["C3Brut"];

        let C3Value = attrsCarac["C3Base"];
        let C3OD = attrsCarac["C3OD"];

        cNom2.push(attrsCarac["C3Nom"]);
        cRoll.push(C3Value);

        OD += C3OD;
    }

    if(attrsCarac["C4"]) {
        C4Nom = attrsCarac["C4Brut"];

        let C4Value = attrsCarac["C4Base"];
        let C4OD = attrsCarac["C4OD"];

        cNom2.push(attrsCarac["C4Nom"]);
        cRoll.push(C4Value);

        OD += C4OD;
    }

    exec.push("{{vOD="+OD+"}}");

    exec.push("{{cBase="+cNom1.join(" - ")+"}}");

    if(hasBonus > 0)
        exec.push("{{cBonus="+cNom2.join(" - ")+"}}");

    if(mod != 0) {
        cRoll.push(mod);
        exec.push("{{mod=[["+mod+"]]}}");
    }

    switch(type) {
        case 1:
            cRoll.push(manoeuvrabilite);
            exec.push(`{{vManoeuvrabilite=+${manoeuvrabilite}D6}}`);
            break;
        case 2:
            cRoll.push(puissance);
            exec.push(`{{vPuissance=+${puissance}D6}}`);
            break;
        case 3:
            cRoll.push(senseurs);
            exec.push(`{{vSenseurs=+${senseurs}D6}}`);
            break;
        case 4:
            cRoll.push(systemes);
            exec.push(`{{vSystemes=+${systemes}D6}}`);
            break;
    }

    if(cRoll.length == 0)
        cRoll.push(0);

    bonus.push(OD);

    exec.push("{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}");
    exec.push("{{tBonus=[["+bonus.join("+")+"+0]]}}");
    exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

    if(isConditionnel == true)
        exec.push("{{conditionnel=true}}");

    log(exec);

    startRoll(exec.join(" "), (results) => {
        let tJet = results.results.jet.result;
        let tBonus = results.results.tBonus.result;
        let tExploit = results.results.Exploit.result;

        let total = tJet+tBonus;

        finishRoll(
            results.rollId, 
            {
                jet:total
            }
        );

        if(tJet != 0 && tJet == tExploit)
            startRoll(roll+"@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+i18n_exploit+"}}{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}", (exploit) => {
                let tExploit = exploit.results.jet.result;

                finishRoll(
                    exploit.rollId, 
                    {
                        jet:tExploit
                    }
                );
        });
        
    });
});

const rollMAImprovise = 14;

for(let i = 0;i < rollMAImprovise;i++) {
    let str = `MAAI${i}`;
    let strDgts = `dgts${i}`;
    let strViolence = `violence${i}`;

    on(`clicked:${str}`, async function(info) {
        let roll = info.htmlAttributes.value;

        let attributs = [
            "mechaArmurePuissance",
            "MAUtilisationArmeAI",
            "jetModifDes",
            "bonusCarac",
            "caracteristique3ArmeImprovisee",
            "caracteristique4ArmeImprovisee",
            "force",
            `${ODValue["force"]}`,
            "discretion",
            `${ODValue["discretion"]}`,
            "tir",
            `${ODValue["tir"]}`,
            "combat",
            `${ODValue["combat"]}`,
        ];

        let arme = [];

        arme.push(strDgts);
        arme.push(strViolence);

        attributs = attributs.concat(arme, listStyle);

        let attrs = await getAttrsAsync(attributs);

        let exec = [];
        exec.push(roll);

        let isConditionnelD = false;
 
        let cBase = [];
        let cBonus = [];
        let cRoll = [];
        let bonus = [];

        let OD = 0;
        
        let type = attrs["MAUtilisationArmeAI"];
        let mod = +attrs["jetModifDes"];
        let hasBonus = +attrs["bonusCarac"];

        let baseDegats = +attrs[strDgts].split("D")[0];
        let baseViolence = +attrs[strViolence].split("D")[0];

        let diceDegats = baseDegats;
        let diceViolence = baseDegats;

        let bDegats = [];
        let bViolence = [];

        let degats = [];
        let violence = [];

        let C1Nom;
        let C2Nom;

        let C3 = attrs[`caracteristique3ArmeImprovisee`];
        let C4 = attrs[`caracteristique4ArmeImprovisee`];
        
        if(type == "&{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{portee=^{portee-contact}}}") {
            C1Nom = "force";
            C2Nom = "combat";
        } else {
            C1Nom = "force";
            C2Nom = "tir";
        }

        let C3Nom = "";
        let C4Nom = "";

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let autresEffets = [];
        
        exec.push("{{OD=true}}");

        let C1Value = +attrs[C1Nom];
        let C1OD = +attrs[ODValue[C1Nom]];

        cBase.push(CaracNom[C1Nom]);
        cRoll.push(C1Value);

        OD += C1OD;

        let C2Value = +attrs[C2Nom];
        let C2OD = +attrs[ODValue[C2Nom]];

        cBase.push(CaracNom[C2Nom]);
        cRoll.push(C2Value);

        OD += C2OD;

        let attrsCarac = await getCarac(hasBonus, "0", "0", C3, C4);

        if(attrsCarac["C3"]) {
            C3Nom = attrsCarac["C3Brut"];

            let C3Value = attrsCarac["C3Base"];
            let C3OD = attrsCarac["C3OD"];

            cBonus.push(attrsCarac["C3Nom"]);
            cRoll.push(C3Value);

            OD += C3OD;
        }

        if(attrsCarac["C4"]) {
            C4Nom = attrsCarac["C4Brut"];

            let C4Value = attrsCarac["C4Base"];
            let C4OD = attrsCarac["C4OD"];

            cBonus.push(attrsCarac["C4Nom"]);
            cRoll.push(C4Value);

            OD += C4OD;
        }

        exec.push("{{vOD="+OD+"}}");

        if(mod != 0) {
            cRoll.push(mod);
            exec.push("{{mod="+mod+"}}");
        }

        //GESTION DU STYLE
        let getStyle;

        if(type == "&{template:combat} {{portee=^{portee-contact}}}") {
            getStyle = getStyleContactMod(attrs, "", baseDegats, baseViolence, true, 0, false, false, false, false, false, false, false, false, false);
        } else {
            getStyle = getStyleDistanceMod(attrs, baseDegats, baseViolence, 0, true, 0, false, false, false, false);
        }

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        diceDegats += getStyle.diceDegats;
        diceViolence += getStyle.diceViolence;

        //FIN GESTION DU STYLE

        if(cRoll.length == 0)
            cRoll.push(0);

        if(bonus.length == 0)
            bonus.push(0);

        bonus.push(OD);

        degats.push(`${diceDegats}D6`);
        degats = degats.concat(bDegats);

        violence.push(`${diceViolence}D6`);
        violence = violence.concat(bViolence);

        if(cBase.length != 0)
            exec.push("{{cBase="+cBase.join(" - ")+"}}");

        if(cBonus.length != 0)
            exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

        cRoll.push(Number(attrs["mechaArmurePuissance"]));
        exec.push("{{vPuissance=+"+Number(attrs["mechaArmurePuissance"])+"D}}");

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

        exec.push(jet);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        exec.push("{{degats=[["+degats.join("+")+"]]}}");
        exec.push("{{violence=[["+violence.join("+")+"]]}}");

        autresEffets.push(i18n_antiVehicule);
        autresEffets.push(i18n_dispersion+" 9 (sur les ennemis de taille < 6m)");

        if(attaquesSurprises.length > 0) {
            exec.push("{{attaqueSurprise="+attaquesSurprises.join("\n+")+"}}");
            exec.push("{{attaqueSurpriseValue=[["+attaquesSurprisesValue.join("+")+"]]}}");
            exec.push(attaquesSurprisesCondition);
        }

        if(autresEffets.length > 0) {
            autresEffets.sort();
            exec.push("{{effets="+autresEffets.join(" / ")+"}}");
        }           

        if(isConditionnelD)
            exec.push("{{degatsConditionnel=true}}");

        startRoll(exec.join(" "), (results) => {
            let tJet = results.results.jet.result;

            let tBonus = results.results.bonus.result;
            let tExploit = results.results.Exploit.result;

            finishRoll(
                results.rollId, 
                {
                    jet:tJet+tBonus
                }
            );

            if(tJet != 0 && tJet == tExploit) {
                startRoll("@{jetGM} &{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{special1B="+i18n_exploit+"}}"+jet, (exploit) => {
                    let tExploit = exploit.results.jet.result;

                    finishRoll(
                        exploit.rollId, 
                        {
                            jet:tExploit
                        }
                    );
                });
            }
        });           
    });
}

const rollArchangel = ["MAAGOffering", "MAAGCurse", "MAARMiracle", "MAACanonNoe"];

rollArchangel.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value.split(";");

        let exec = [];

        let base = roll[0];

        let noyaux;
        let armure;
        let blindage;
        let sante;
        let duree;
        let resilience;
        let choc;

        exec.push(base);

        let attrs = [];
        
        switch(button) {
            case "MAAGOffering":
                attrs = await getAttrsAsync([roll[1]]);

                noyaux = +attrs[roll[1]];
                degats = roll[2];
                duree = roll[3];

                exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}} {{jDivers3F12=^{si-bonus-degats-violence}}} {{jDiver3F12V=[[${degats}]]}}`);
                
                if(noyaux >= 2)
                    exec.push(`{{jDivers2=^{noyaux-depenses}}} {{jDivers2V=${noyaux}}}`);
                else
                    exec.push(`{{jDivers2=^{noyau-depense}}} {{jDivers2V=${noyaux}}}`);
                break;

            case "MAAGCurse":
                attrs = await getAttrsAsync([roll[1]]);

                noyaux = +attrs[roll[1]];
                degats = roll[2];
                resilience = roll[3];
                choc = roll[4];

                exec.push(`{{jDivers3F12=^{si-malus-degats-violence}}} {{jDiver3F12V=[[${degats}]]}} {{jDivers4F12=^{si-baisse-resilience}}} {{jDiver4F12V=[[${resilience}]] / 3}}  {{jDivers5F12=^{si-choc}}} {{jDiver5F12V=[[${choc}]]}}`);
                
                if(noyaux >= 2)
                    exec.push(`{{jDivers2=^{noyaux-depenses}}} {{jDivers2V=${noyaux}}}`);
                else
                    exec.push(`{{jDivers2=^{noyau-depense}}} {{jDivers2V=${noyaux}}}`);
                break;

            case "MAARMiracle":
                attrs = await getAttrsAsync([
                    roll[1],
                    roll[2],
                    roll[3],
                    roll[4],
                ]);

                sante = attrs[roll[1]];
                armure = attrs[roll[2]];
                blindage = attrs[roll[3]];
                resilience = attrs[roll[4]];
                duree = roll[5];

                exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}} {{jDivers2F12=^{armure}}} {{jDivers2F12V=[[${armure}]]}} {{jDivers3F12=^{sante}}} {{jDiver3F12V=[[${sante}]]}} {{jDivers4F12=^{blindage}}} {{jDiver4F12V=[[${blindage}]]}} {{jDivers5F12=^{resilience}}} {{jDiver5F12V=${resilience}}}`);

                log(exec);
                break;

            case "MAACanonNoe":
                attrs = await getAttrsAsync([
                    roll[1],
                    roll[2],
                    roll[3],
                ]);

                armure = attrs[roll[1]];
                blindage = attrs[roll[2]];
                resilience = attrs[roll[3]];

                exec.push(`{{jDivers=^{armure}}} {{jDiversV=${armure}}} {{jDivers2=^{blindage}}} {{jDivers2V=${blindage}}} {{jDivers3=^{resilience}}} {{jDivers3V=[[${resilience}]]}}`);
                break;
        }

        startRoll(exec.join(" "), (results) => {
            finishRoll(
                results.rollId, {}
            );            
        });
    });
});

const rollCombatArchangel = ["MAACanonMetatron"];

rollCombatArchangel.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value.split(";");

        let exec = [];
        let listAttrs = [];
        let attrs = [];

        let base = roll[0];

        let mod;
        let C1;
        let C2;
        let C3;
        let C4;

        let C1Nom;
        let C2Nom;
        let C3Nom;
        let C4Nom;

        let bCarac;

        var jet;
        let cRoll = [];
        let rollBonus = [];
        let cBase = [];
        let cBonus = [];
        let cOD = 0;

        let degats;
        let bDegats;
        let violence;
        let bViolence;

        let getStyle;

        exec.push(base);
        
        switch(button) {
            case "MAACanonMetatron":
                listAttrs = [
                    "mechaArmurePuissance",
                    "bonusCarac",
                    "jetModifDes",
                    "canonMetatronCaracteristique1",
                    "canonMetatronCaracteristique2",
                    "canonMetatronCaracteristique3",
                    "canonMetatronCaracteristique4",
                    roll[1],
                    roll[2],
                ];

                listAttrs = listAttrs.concat(listStyle);
        
                attrs = await getAttrsAsync(listAttrs);

                bCarac = attrs["bonusCarac"];
                mod = attrs["jetModifDes"];

                C1 = attrs["canonMetatronCaracteristique1"];
                C2 = attrs["canonMetatronCaracteristique2"];
                C3 = attrs["canonMetatronCaracteristique3"];
                C4 = attrs["canonMetatronCaracteristique4"];

                let attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

                if(attrsCarac["C1"]) {
                    C1Nom = attrsCarac["C1Brut"];
        
                    let C1Value = attrsCarac["C1Base"];
                    let C1OD = attrsCarac["C1OD"];
        
                    cBase.push(attrsCarac["C1Nom"]);
                    cRoll.push(C1Value);
                    cOD += C1OD;
                }
        
                if(attrsCarac["C2"]) {
                    C2Nom = attrsCarac["C2Brut"];
        
                    let C2Value = attrsCarac["C2Base"];
                    let C2OD = attrsCarac["C2OD"];
        
                    cBase.push(attrsCarac["C2Nom"]);
                    cRoll.push(C2Value);
                    cOD += C2OD;
                }
        
                if(attrsCarac["C3"]) {
                    C3Nom = attrsCarac["C3Brut"];
        
                    let C3Value = attrsCarac["C3Base"];
                    let C3OD = attrsCarac["C3OD"];
        
                    cBonus.push(attrsCarac["C3Nom"]);
                    cRoll.push(C3Value);
                    cOD += C3OD;
                }
        
                if(attrsCarac["C4"]) {
                    C4Nom = attrsCarac["C4Brut"];
        
                    let C4Value = attrsCarac["C4Base"];
                    let C4OD = attrsCarac["C4OD"];
        
                    cBonus.push(attrsCarac["C4Nom"]);
                    cRoll.push(C4Value);
                    cOD += C4OD;
                }

                degats = Number(attrs[roll[1]].split("D")[0]);
                bDegats = Number(attrs[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(attrs[roll[2]].split("D")[0]);
                bViolence = Number(attrs[roll[2]].split("D")[1].split("+")[1]) || 0;

                if(cBase.length > 0)
                    exec.push(cBase.join(" - "));

                if(cBonus.length > 0)
                    exec.push(cBonus.join(" - "));

                getStyle = getStyleDistanceMod(attrs, degats, violence, "", true, 0, false, false, false, false);

                exec = exec.concat(getStyle.exec);
                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(attrs["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(attrs["mechaArmurePuissance"])+"D}}");

                rollBonus.push(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD="+cOD+"}}");
                exec.push("{{bonus=[["+rollBonus.join("+")+"]]}}");

                exec.push("{{degats=[["+degats+"D6+"+bDegats+"]]}}");
                exec.push("{{violence=[["+violence+"D6+"+bViolence+"]]}}");

                if(cBase.length > 0)
                    exec.push("{{cBase="+cBase.join(" - ")+"}}");

                if(cBonus.length > 0)
                    exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

                exec.push(`{{succesConditionnel=true}} {{parasitage=${i18n_parasitage} 2}} {{parasitageCondition=${i18n_parasitageCondition}}}`);

                let autresEffets = [
                    i18n_antiVehicule,
                    i18n_briserResilience,
                    i18n_degatsContinus+" 10 ([[1d6]] "+i18n_tours+")"
                ];

                autresEffets.sort();

                exec.push("{{effets="+autresEffets.join(" / ")+"}}");
                break;
        }

        startRoll(exec.join(" "), (results) => {
            let tJet = results.results.jet.result;

            let tBonus = results.results.bonus.result;
            let tExploit = results.results.Exploit.result;

            finishRoll(
                results.rollId, 
                {
                    jet:tJet+tBonus
                }
            );

            if(tJet != 0 && tJet == tExploit) {
                startRoll(roll+"@{jetGM} &{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{special1B="+i18n_exploit+"}}"+jet, (exploit) => {
                    let tExploit = exploit.results.jet.result;

                    finishRoll(
                        exploit.rollId, 
                        {
                            jet:tExploit
                        }
                    );
                });
            }
        });
    });
});

const rollNephilim = ["MANOGInvulnerabilite", "MANOGStationDebordement", "MANOGStationMissile", "MANOGStationRoquette", "MANMJ"];

rollNephilim.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value.split(";");

        let exec = [];
        let attrs = [];

        let base = roll[0];

        let duree;
        let tours;
        let degats;
        let violence;
        let effets = [];

        exec.push(base);
        
        switch(button) {
            case "MANOGInvulnerabilite":
                attrs = await getAttrsAsync([roll[1]]);

                duree = attrs[roll[1]];

                exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}}`);
                break;

            case "MANOGStationDebordement":
                attrs = await getAttrsAsync([roll[1]]);

                tours = attrs[roll[1]];

                exec.push(`{{jDivers=^{debordement}}} {{jDiversV=[[${tours}*10]]}}`);
                break;

            case "MANOGStationMissile":
                degats = roll[1];
                violence = roll[2];

                effets.push(i18n_antiVehicule);
                effets.push(i18n_artillerie);
                effets.sort();

                exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}} {{effets=`+effets.join(" / ")+`}}`);
                break;

            case "MANOGStationRoquette":
                degats = roll[1];
                violence = roll[2];

                exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}}`);
                break;

            case "MANMJ":
                attrs = await getAttrsAsync([
                    roll[1],
                    roll[2],
                ]);
                
                degats = attrs[roll[1]];
                violence = attrs[roll[2]];

                effets.push(i18n_antiVehicule);
                effets.push(i18n_demoralisant);
                effets.push(i18n_briserResilience);
                effets.sort();

                exec.push(`{{degats=[[${degats}]]}} {{degatsConditionnel=true}} {{meurtrier=${i18n_meurtrier}}} {{meurtrierValue=[[2D6]]}} {{meurtrierCondition=${i18n_meurtrierCondition}}} {{violence=[[${violence}]]}} {{violenceConditionnel=true}} {{fureur=${i18n_fureur}}} {{fureurValue=[[2D6]]}} {{fureurCondition=${i18n_fureurCondition}}} {{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}} {{effets=`+effets.join(" / ")+`}}`);
                break;
       }

       startRoll(exec.join(" "), (results) => {
            finishRoll(
                results.rollId, {}
            );            
        });
    });
});

const rollCombatNephilim = ["MANCanonMagma", "MANMSurtur"];

rollCombatNephilim.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value.split(";");

        let exec = [];
        let listAttrs = [];
        let attrs = [];
        let attrsCarac = [];

        let base = roll[0];

        let mod;
        let C1;
        let C2;
        let C3;
        let C4;

        let C1Nom;
        let C2Nom;
        let C3Nom;
        let C4Nom;

        let bCarac;

        var jet;
        let cRoll = [];
        let rollBonus = [];
        let cBase = [];
        let cBonus = [];
        let cOD = 0;

        let degats;
        let bDegats;
        let violence;
        let bViolence;

        let getStyle;

        let autresEffets;

        exec.push(base);
        
        switch(button) {
            case "MANCanonMagma":
                listAttrs = [
                    roll[1],
                    roll[2],
                    "mechaArmurePuissance",
                    "bonusCarac",
                    "jetModifDes",
                    "canonMagmaCaracteristique1",
                    "canonMagmaCaracteristique2",
                    "canonMagmaCaracteristique3",
                    "canonMagmaCaracteristique4"
                ];

                listAttrs = listAttrs.concat(listStyle);
        
                attrs = await getAttrsAsync(listAttrs);

                bCarac = attrs["bonusCarac"];
                mod = attrs["jetModifDes"];

                C1 = attrs["canonMagmaCaracteristique1"];
                C2 = attrs["canonMagmaCaracteristique2"];
                C3 = attrs["canonMagmaCaracteristique3"];
                C4 = attrs["canonMagmaCaracteristique4"];

                attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

                if(attrsCarac["C1"]) {
                    C1Nom = attrsCarac["C1Brut"];
        
                    let C1Value = attrsCarac["C1Base"];
                    let C1OD = attrsCarac["C1OD"];
        
                    cBase.push(attrsCarac["C1Nom"]);
                    cRoll.push(C1Value);
                    cOD += C1OD;
                }
        
                if(attrsCarac["C2"]) {
                    C2Nom = attrsCarac["C2Brut"];
        
                    let C2Value = attrsCarac["C2Base"];
                    let C2OD = attrsCarac["C2OD"];
        
                    cBase.push(attrsCarac["C2Nom"]);
                    cRoll.push(C2Value);
                    cOD += C2OD;
                }
        
                if(attrsCarac["C3"]) {
                    C3Nom = attrsCarac["C3Brut"];
        
                    let C3Value = attrsCarac["C3Base"];
                    let C3OD = attrsCarac["C3OD"];
        
                    cBonus.push(attrsCarac["C3Nom"]);
                    cRoll.push(C3Value);
                    cOD += C3OD;
                }
        
                if(attrsCarac["C4"]) {
                    C4Nom = attrsCarac["C4Brut"];
        
                    let C4Value = attrsCarac["C4Base"];
                    let C4OD = attrsCarac["C4OD"];
        
                    cBonus.push(attrsCarac["C4Nom"]);
                    cRoll.push(C4Value);
                    cOD += C4OD;
                }

                degats = Number(attrs[roll[1]].split("D")[0]);
                bDegats = Number(attrs[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(attrs[roll[2]].split("D")[0]);
                bViolence = Number(attrs[roll[2]].split("D")[1].split("+")[1]) || 0;

                getStyle = getStyleDistanceMod(attrs, degats, violence, "", true, 0, false, false, false, false);

                exec = exec.concat(getStyle.exec);
                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(attrs["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(attrs["mechaArmurePuissance"])+"D}}");

                rollBonus.push(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD="+cOD+"}}");
                exec.push("{{bonus=[["+rollBonus.join("+")+"]]}}");

                exec.push("{{degats=[["+degats+"D6+"+bDegats+"]]}}");
                exec.push("{{violence=[["+violence+"D6+"+bViolence+"]]}}");

                if(cBase.length > 0)
                    exec.push("{{cBase="+cBase.join(" - ")+"}}");

                if(cBonus.length > 0)
                    exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

                exec.push(`{{degatsConditionnel=true}} {{violenceConditionnel=true}} {{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}} {{fureur=${i18n_fureur}}} {{fureurValue=[[2D6]]}} {{fureurCondition=${i18n_fureurCondition}}}`);

                autresEffets = [
                    i18n_dispersion+" 12",
                    i18n_briserResilience,
                    i18n_antiVehicule
                ];

                autresEffets.sort();

                exec.push("{{effets="+autresEffets.join(" / ")+"}}");
                break;

            case "MANMSurtur":
                listAttrs = [
                    roll[1],
                    roll[2],
                    "mechaArmurePuissance",
                    "bonusCarac",
                    "jetModifDes",
                    "MSurturCaracteristique1",
                    "MSurturCaracteristique2",
                    "MSurturCaracteristique3",
                    "MSurturCaracteristique4"
                ]

                listAttrs = listAttrs.concat(listStyle);
        
                attrs = await getAttrsAsync(listAttrs);

                bCarac = attrs["bonusCarac"];
                mod = attrs["jetModifDes"];

                C1 = attrs["MSurturCaracteristique1"];
                C2 = attrs["MSurturCaracteristique2"];
                C3 = attrs["MSurturCaracteristique3"];
                C4 = attrs["MSurturCaracteristique4"];

                attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

                if(attrsCarac["C1"]) {
                    C1Nom = attrsCarac["C1Brut"];
        
                    let C1Value = attrsCarac["C1Base"];
                    let C1OD = attrsCarac["C1OD"];
        
                    cBase.push(attrsCarac["C1Nom"]);
                    cRoll.push(C1Value);
                    cOD += C1OD;
                }
        
                if(attrsCarac["C2"]) {
                    C2Nom = attrsCarac["C2Brut"];
        
                    let C2Value = attrsCarac["C2Base"];
                    let C2OD = attrsCarac["C2OD"];
        
                    cBase.push(attrsCarac["C2Nom"]);
                    cRoll.push(C2Value);
                    cOD += C2OD;
                }
        
                if(attrsCarac["C3"]) {
                    C3Nom = attrsCarac["C3Brut"];
        
                    let C3Value = attrsCarac["C3Base"];
                    let C3OD = attrsCarac["C3OD"];
        
                    cBonus.push(attrsCarac["C3Nom"]);
                    cRoll.push(C3Value);
                    cOD += C3OD;
                }
        
                if(attrsCarac["C4"]) {
                    C4Nom = attrsCarac["C4Brut"];
        
                    let C4Value = attrsCarac["C4Base"];
                    let C4OD = attrsCarac["C4OD"];
        
                    cBonus.push(attrsCarac["C4Nom"]);
                    cRoll.push(C4Value);
                    cOD += C4OD;
                }

                degats = Number(attrs[roll[1]].split("D")[0]);
                bDegats = Number(attrs[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(attrs[roll[2]].split("D")[0]);
                bViolence = Number(attrs[roll[2]].split("D")[1].split("+")[1]) || 0;

                getStyle = getStyleDistanceMod(attrs, degats, violence, "", true, 0, false, false, false, false);

                exec = exec.concat(getStyle.exec);
                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(attrs["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(attrs["mechaArmurePuissance"])+"D}}");

                rollBonus.push(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD="+cOD+"}}");
                exec.push("{{bonus=[["+rollBonus.join("+")+"]]}}");

                exec.push("{{degats=[["+degats+"D6+"+bDegats+"]]}}");
                exec.push("{{violence=[["+violence+"D6+"+bViolence+"]]}}");

                if(cBase.length > 0)
                    exec.push("{{cBase="+cBase.join(" - ")+"}}");

                if(cBonus.length > 0)
                    exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

                exec.push(`{{violenceConditionnel=true}} {{ultraviolence=${i18n_ultraviolence}}} {{ultraViolenceValue=[[2D6]]}} {{ultraviolenceCondition=${i18n_ultraviolenceCondition}}}`);

                autresEffets = [
                    i18n_demoralisant,
                    i18n_antiVehicule
                ];

                autresEffets.sort();

                exec.push("{{effets="+autresEffets.join(" / ")+"}}");
                break;
        }

        startRoll(exec.join(" "), (results) => {
            let tJet = results.results.jet.result;

            let tBonus = results.results.bonus.result;
            let tExploit = results.results.Exploit.result;

            finishRoll(
                results.rollId, 
                {
                    jet:tJet+tBonus
                }
            );

            if(tJet != 0 && tJet == tExploit) {
                startRoll(roll+"@{jetGM} &{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{special1B="+i18n_exploit+"}}"+jet, (exploit) => {
                    let tExploit = exploit.results.jet.result;

                    finishRoll(
                        exploit.rollId, 
                        {
                            jet:tExploit
                        }
                    );
                });
            }
        });
    });
});

const rollDemon = ["MAAMI", "MAATLA"];

rollDemon.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value.split(";");

        let exec = [];
        let attrs = [];

        let base = roll[0];

        let degats;
        let violence;

        exec.push(base);
        
        switch(button) {
            case "MAAMI":
                
                attrs = await getAttrsAsync([
                    roll[1],
                    roll[2],
                ]);

                degats = attrs[roll[1]];
                violence = attrs[roll[2]];

                exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}} {{effets=^{CDF-desactive-pendant} [[1D3]] ^{tours}}}`);
                break;

            case "MAATLA":
                attrs = await getAttrsAsync([
                    roll[1],
                    roll[2],
                ]);

                degats = attrs[roll[1]];
                violence = attrs[roll[2]];

                exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}} {{degatsConditionnel=true}} {{violenceConditionnel=true}} {{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}} {{effets=${i18n_antiVehicule}}}`);
                break;
       }

        startRoll(exec.join(" "), (results) => {
            finishRoll(
                results.rollId, {}
            );            
        });
    });
});

const rollCombatDemon = ["MADSouffle", "MADjinnWraith", "MADPSoniques", "MADLCG"];

rollCombatDemon.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value.split(";");

        let exec = [];

        let base = roll[0];

        let mod;
        let C1;
        let C2;
        let C3;
        let C4;

        let C1Nom;
        let C2Nom;
        let C3Nom;
        let C4Nom;

        let bCarac;

        let vDiscretion = 0;
        let oDiscretion = 0;
        let oTir = 0;

        let listAttrs = [];
        let attrs = [];
        let attrsCarac = [];

        var jet;
        let cRoll = [];
        let rollBonus = [];
        let cBase = [];
        let cBonus = [];
        let cOD = 0;

        let degats;
        let bDegats;
        let violence;
        let bViolence;

        let getStyle;

        let autresEffets;

        exec.push(base);
        
        switch(button) {
            case "MADSouffle":
                listAttrs = [
                    "bonusCarac",
                    "jetModifDes",
                    "mechaArmurePuissance",
                    "discretion",
                    ODValue["discretion"],
                    ODValue["tir"],
                    "DSouffleCaracteristique1",
                    "DSouffleCaracteristique2",
                    "DSouffleCaracteristique3",
                    "DSouffleCaracteristique4",
                    roll[1],
                    roll[2],
                ];

                listAttrs = listAttrs.concat(listStyle);
        
                attrs = await getAttrsAsync(listAttrs);

                bCarac = attrs["bonusCarac"];
                mod = attrs["jetModifDes"];

                vDiscretion = attrs["discretion"];
                oDiscretion = attrs[ODValue["discretion"]];
                oTir = attrs[ODValue["tir"]];
        
                C1 = attrs[`DSouffleCaracteristique1`];
                C2 = attrs[`DSouffleCaracteristique2`];
                C3 = attrs[`DSouffleCaracteristique3`];
                C4 = attrs[`DSouffleCaracteristique4`];

                attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

                if(attrsCarac["C1"]) {
                    C1Nom = attrsCarac["C1Brut"];
        
                    let C1Value = attrsCarac["C1Base"];
                    let C1OD = attrsCarac["C1OD"];
        
                    cBase.push(attrsCarac["C1Nom"]);
                    cRoll.push(C1Value);
                    cOD += C1OD;
                }
        
                if(attrsCarac["C2"]) {
                    C2Nom = attrsCarac["C2Brut"];
        
                    let C2Value = attrsCarac["C2Base"];
                    let C2OD = attrsCarac["C2OD"];
        
                    cBase.push(attrsCarac["C2Nom"]);
                    cRoll.push(C2Value);
                    cOD += C2OD;
                }
        
                if(attrsCarac["C3"]) {
                    C3Nom = attrsCarac["C3Brut"];
        
                    let C3Value = attrsCarac["C3Base"];
                    let C3OD = attrsCarac["C3OD"];
        
                    cBonus.push(attrsCarac["C3Nom"]);
                    cRoll.push(C3Value);
                    cOD += C3OD;
                }
        
                if(attrsCarac["C4"]) {
                    C4Nom = attrsCarac["C4Brut"];
        
                    let C4Value = attrsCarac["C4Base"];
                    let C4OD = attrsCarac["C4OD"];
        
                    cBonus.push(attrsCarac["C4Nom"]);
                    cRoll.push(C4Value);
                    cOD += C4OD;
                }

                degats = Number(attrs[roll[1]].split("D")[0]);
                bDegats = Number(attrs[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(attrs[roll[2]]);
                bViolence = 0;

                getStyle = getStyleDistanceMod(attrs, degats, violence, "", true, 0, false, false, false, false);

                exec = exec.concat(getStyle.exec);
                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(attrs["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(attrs["mechaArmurePuissance"])+"D}}");

                rollBonus.push(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD="+cOD+"}}");
                exec.push("{{bonus=[["+rollBonus.join("+")+"]]}}");

                exec.push("{{degats=[["+degats+"D6+"+bDegats+"]]}}");
                exec.push("{{violence=[["+violence+"D6+"+bViolence+"]]}}");

                if(cBase.length > 0)
                    exec.push("{{cBase="+cBase.join(" - ")+"}}");

                if(cBonus.length > 0)
                    exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

                autresEffets = [
                    i18n_parasitage+" 2",
                    i18n_briserResilience,
                    i18n_antiVehicule
                ];

                autresEffets.sort();

                exec.push("{{effets="+autresEffets.join(" / ")+"}}");
                break;

            case "MADjinnWraith":
                listAttrs = [
                    "jetModifDes",
                    "bonusCarac",
                    "mechaArmureManoeuvrabilite",
                    "MADDjinnWraithActive",
                    "discretion",
                    ODValue["discretion"],
                    ODValue["tir"],
                    "caracteristiqueWraith2",
                    "caracteristiqueWraith3",
                    "caracteristiqueWraith4",
                    roll[1],
                    roll[2],
                ];
        
                attrs = await getAttrsAsync(listAttrs);

                let active = attrs["MADDjinnWraithActive"];

                bCarac = attrs["bonusCarac"];
                mod = attrs["jetModifDes"];

                vDiscretion = attrs["discretion"];
                oDiscretion = attrs[ODValue["discretion"]];
                oTir = attrs[ODValue["tir"]];

                C1 = "@{discretion}";
                C2 = attrs["caracteristiqueWraith2"];
                C3 = attrs["caracteristiqueWraith3"];
                C4 = attrs["caracteristiqueWraith4"];
                
                if(active != "0")
                    exec.push("{{special2=^{module-wraith} ^{active}}}");

                attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

                if(attrsCarac["C1"]) {
                    C1Nom = attrsCarac["C1Brut"];
        
                    let C1Value = attrsCarac["C1Base"];
                    let C1OD = attrsCarac["C1OD"];
        
                    cBase.push(attrsCarac["C1Nom"]);
                    cRoll.push(C1Value);
                    cOD += C1OD;
                }
        
                if(attrsCarac["C2"]) {
                    C2Nom = attrsCarac["C2Brut"];
        
                    let C2Value = attrsCarac["C2Base"];
                    let C2OD = attrsCarac["C2OD"];
        
                    cBase.push(attrsCarac["C2Nom"]);
                    cRoll.push(C2Value);
                    cOD += C2OD;
                }
        
                if(attrsCarac["C3"]) {
                    C3Nom = attrsCarac["C3Brut"];
        
                    let C3Value = attrsCarac["C3Base"];
                    let C3OD = attrsCarac["C3OD"];
        
                    cBonus.push(attrsCarac["C3Nom"]);
                    cRoll.push(C3Value);
                    cOD += C3OD;
                }
        
                if(attrsCarac["C4"]) {
                    C4Nom = attrsCarac["C4Brut"];
        
                    let C4Value = attrsCarac["C4Base"];
                    let C4OD = attrsCarac["C4OD"];
        
                    cBonus.push(attrsCarac["C4Nom"]);
                    cRoll.push(C4Value);
                    cOD += C4OD;
                }

                cRoll.push(Number(attrs["mechaArmureManoeuvrabilite"]));
                exec.push("{{vManoeuvrabilite=+"+Number(attrs["mechaArmureManoeuvrabilite"])+"D}}");

                rollBonus.push(cOD);

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD="+cOD+"}}");
                exec.push("{{bonus=[["+rollBonus.join("+")+"]]}}");

                if(cBase.length > 0)
                    exec.push("{{cBase="+cBase.join(" - ")+"}}");

                if(cBonus.length > 0)
                    exec.push("{{cBonus="+cBonus.join(" - ")+"}}");
                break;
            
            case "MADPSoniques":
                listAttrs = [
                    "jetModifDes",
                    "bonusCarac",
                    "mechaArmurePuissance",
                    "discretion",
                    ODValue["discretion"],
                    ODValue["tir"],
                    "APoingsCaracteristique1",
                    "APoingsCaracteristique2",
                    "APoingsCaracteristique3",
                    "APoingsCaracteristique4",
                    roll[1],
                    roll[2],
                ];

                listAttrs = listAttrs.concat(listStyle);
        
                attrs = await getAttrsAsync(listAttrs);

                bCarac = attrs["bonusCarac"];
                mod = attrs["jetModifDes"];

                vDiscretion = attrs["discretion"];
                oDiscretion = attrs[ODValue["discretion"]];
                oTir = attrs[ODValue["tir"]];

                C1 = attrs["APoingsCaracteristique1"];
                C2 = attrs["APoingsCaracteristique2"];
                C3 = attrs["APoingsCaracteristique3"];
                C4 = attrs["APoingsCaracteristique4"];

                attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

                if(attrsCarac["C1"]) {
                    C1Nom = attrsCarac["C1Brut"];
        
                    let C1Value = attrsCarac["C1Base"];
                    let C1OD = attrsCarac["C1OD"];
        
                    cBase.push(attrsCarac["C1Nom"]);
                    cRoll.push(C1Value);
                    cOD += C1OD;
                }
        
                if(attrsCarac["C2"]) {
                    C2Nom = attrsCarac["C2Brut"];
        
                    let C2Value = attrsCarac["C2Base"];
                    let C2OD = attrsCarac["C2OD"];
        
                    cBase.push(attrsCarac["C2Nom"]);
                    cRoll.push(C2Value);
                    cOD += C2OD;
                }
        
                if(attrsCarac["C3"]) {
                    C3Nom = attrsCarac["C3Brut"];
        
                    let C3Value = attrsCarac["C3Base"];
                    let C3OD = attrsCarac["C3OD"];
        
                    cBonus.push(attrsCarac["C3Nom"]);
                    cRoll.push(C3Value);
                    cOD += C3OD;
                }
        
                if(attrsCarac["C4"]) {
                    C4Nom = attrsCarac["C4Brut"];
        
                    let C4Value = attrsCarac["C4Base"];
                    let C4OD = attrsCarac["C4OD"];
        
                    cBonus.push(attrsCarac["C4Nom"]);
                    cRoll.push(C4Value);
                    cOD += C4OD;
                }

                degats = Number(attrs[roll[1]].split("D")[0]);
                bDegats = Number(attrs[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(attrs[roll[2]].split("D")[0]);
                bViolence = Number(attrs[roll[2]].split("D")[1].split("+")[1]) || 0;

                getStyle = getStyleDistanceMod(attrs, degats, violence, "", true, 0, false, false, false, false);

                exec = exec.concat(getStyle.exec);
                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(attrs["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(attrs["mechaArmurePuissance"])+"D}}");

                rollBonus.push(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD="+cOD+"}}");
                exec.push("{{bonus=[["+rollBonus.join("+")+"]]}}");

                exec.push("{{degats=[["+degats+"D6+"+bDegats+"]]}}");
                exec.push("{{violence=[["+violence+"D6+"+bViolence+"]]}}");

                if(cBase.length > 0)
                    exec.push("{{cBase="+cBase.join(" - ")+"}}");

                if(cBonus.length > 0)
                    exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

                autresEffets = [
                    i18n_antiVehicule,
                    i18n_poingsSoniques
                ];

                autresEffets.sort();

                exec.push("{{effets="+autresEffets.join(" / ")+"}}");
                break;

            case "MADLCG":
                listAttrs = [
                    "jetModifDes",
                    "bonusCarac",
                    "mechaArmurePuissance",
                    "discretion",
                    ODValue["discretion"],
                    ODValue["tir"],
                    "LCGCaracteristique1",
                    "LCGCaracteristique2",
                    "LCGCaracteristique3",
                    "LCGCaracteristique4",
                    roll[1],
                    roll[2],
                ];

                listAttrs = listAttrs.concat(listStyle);        
                attrs = await getAttrsAsync(listAttrs);

                bCarac = attrs["bonusCarac"];
                mod = attrs["jetModifDes"];

                vDiscretion = attrs["discretion"];
                oDiscretion = attrs[ODValue["discretion"]];
                oTir = attrs[ODValue["tir"]];

                C1 = attrs["LCGCaracteristique1"];
                C2 = attrs["LCGCaracteristique2"];
                C3 = attrs["LCGCaracteristique3"];
                C4 = attrs["LCGCaracteristique4"];

                attrsCarac = await getCarac(bCarac, C1, C2, C3, C4);

                if(attrsCarac["C1"]) {
                    C1Nom = attrsCarac["C1Brut"];
        
                    let C1Value = attrsCarac["C1Base"];
                    let C1OD = attrsCarac["C1OD"];
        
                    cBase.push(attrsCarac["C1Nom"]);
                    cRoll.push(C1Value);
                    cOD += C1OD;
                }
        
                if(attrsCarac["C2"]) {
                    C2Nom = attrsCarac["C2Brut"];
        
                    let C2Value = attrsCarac["C2Base"];
                    let C2OD = attrsCarac["C2OD"];
        
                    cBase.push(attrsCarac["C2Nom"]);
                    cRoll.push(C2Value);
                    cOD += C2OD;
                }
        
                if(attrsCarac["C3"]) {
                    C3Nom = attrsCarac["C3Brut"];
        
                    let C3Value = attrsCarac["C3Base"];
                    let C3OD = attrsCarac["C3OD"];
        
                    cBonus.push(attrsCarac["C3Nom"]);
                    cRoll.push(C3Value);
                    cOD += C3OD;
                }
        
                if(attrsCarac["C4"]) {
                    C4Nom = attrsCarac["C4Brut"];
        
                    let C4Value = attrsCarac["C4Base"];
                    let C4OD = attrsCarac["C4OD"];
        
                    cBonus.push(attrsCarac["C4Nom"]);
                    cRoll.push(C4Value);
                    cOD += C4OD;
                }

                degats = Number(attrs[roll[1]].split("D")[0]);
                bDegats = Number(attrs[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(attrs[roll[2]].split("D")[0]);
                bViolence = Number(attrs[roll[2]].split("D")[1].split("+")[1]) || 0;

                getStyle = getStyleDistanceMod(attrs, degats, violence, "", true, 0, false, false, false, false);

                exec = exec.concat(getStyle.exec);
                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(attrs["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(attrs["mechaArmurePuissance"])+"D}}");

                rollBonus.push(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(cOD.length == 0)
                    cOD.push(0);

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD="+cOD+"}}");
                exec.push("{{bonus=[["+rollBonus.join("+")+"]]}}");

                exec.push("{{degats=[["+degats+"D6+"+bDegats+"]]}}");
                exec.push("{{violence=[["+violence+"D6+"+bViolence+"]]}}");

                if(cBase.length > 0)
                    exec.push("{{cBase="+cBase.join(" - ")+"}}");

                if(cBonus.length > 0)
                    exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

                autresEffets = [
                    "("+i18n_penetrant+" 10)",
                    i18n_antiVehicule,
                    "("+i18n_ignoreCDF+")"
                ];

                autresEffets.sort();

                exec.push("{{effets="+autresEffets.join(" / ")+"}}");
                break;

        }

        startRoll(exec.join(" "), (results) => {
            let tJet = results.results.jet.result;

            let tBonus = results.results.bonus.result;
            let tExploit = results.results.Exploit.result;

            finishRoll(
                results.rollId, 
                {
                    jet:tJet+tBonus
                }
            );

            if(tJet != 0 && tJet == tExploit) {
                startRoll(roll+"@{jetGM} &{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{special1B="+i18n_exploit+"}}"+jet, (exploit) => {
                    let tExploit = exploit.results.jet.result;

                    finishRoll(
                        exploit.rollId, 
                        {
                            jet:tExploit
                        }
                    );
                });
            }
        });
    });
});