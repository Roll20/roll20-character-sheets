on(`clicked:mechaArmureARResilience`, function(info) {
    let roll = info.htmlAttributes.value;

    let attributs = [
        "mechaArmureSystemes",
        "mechaArmureResilience",
        "mechaArmureResilience_max",
    ];

    getAttrs(attributs, function(value)
    {
        let exec = [];

        let system = Number(value["mechaArmureSystemes"]);
        var resilience = Number(value["mechaArmureResilience"]);
        var resilienceMax = Number(value["mechaArmureResilience_max"]);
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
});

on(`clicked:mechaArmureARBlindage`, function(info) {
    let roll = info.htmlAttributes.value;

    let attributs = [
        "mechaArmureSystemes",
        "mechaArmureBlindage",
        "mechaArmureBlindage_max",
    ];

    getAttrs(attributs, function(value)
    {
        let exec = [];

        let system = Number(value["mechaArmureSystemes"]);
        var blindage = Number(value["mechaArmureBlindage"]);
        var blindageMax = Number(value["mechaArmureBlindage_max"]);
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
});

on(`clicked:manoeuvrabilite`, function(info) {
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

    getAttrs(attributs, function(value)
    {
        let exec = [];
        let isConditionnel = false;

        let type = Number(value["mechaArmureTypeJets"]);

        let manoeuvrabilite = Number(value["mechaArmureManoeuvrabilite"]);
        let puissance = Number(value["mechaArmurePuissance"]);
        let senseurs = Number(value["mechaArmureSenseurs"]);
        let systemes = Number(value["mechaArmureSystemes"]);

        let mod = Number(value["jetModifDes"]);
        let hasBonus = Number(value["bonusCarac"]);

        let C1 = value["caracteristique1MA"];
        let C2 = value["caracteristique2MA"];
        let C3 = value["caracteristique3MA"];
        let C4 = value["caracteristique4MA"];

        let C1Nom = C1.slice(2, -1);
        let C2Nom = C2.slice(2, -1);
        let C3Nom = C3.slice(2, -1);
        let C4Nom = C4.slice(2, -1);

        let cRoll = [];
        let cNom1 = [];
        let cNom2 = [];

        let bonus = [];
        let OD = [];

        exec.push(roll);

        exec.push("{{OD=true}}");

        if(C1 != "0") {
            cNom1.push(CaracNom[C1Nom]);
            cRoll.push(C1);

            OD.push("@{"+ODNom[C1Nom]+"}");
        };

        if(C2 != "0") {
            cNom1.push(CaracNom[C2Nom]);
            cRoll.push(C2);

            OD.push("@{"+ODNom[C2Nom]+"}");
        }

        if(hasBonus == 1 || hasBonus == 2) {
            if(C3 != "0") {
                cNom2.push(CaracNom[C3Nom]);
                cRoll.push(C3);

                OD.push("@{"+ODNom[C3Nom]+"}");
            }
        }

        if(hasBonus == 2) {
            if(C4 != "0") {
                cNom2.push(CaracNom[C4Nom]);
                cRoll.push(C4);

               OD.push("@{"+ODNom[C4Nom]+"}");
            }
        }

        if(OD.length == 0)
            exec.push("{{vOD=[[0]]}}");
        else
            exec.push("{{vOD=[["+OD.join("+")+"]]}}");

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

        bonus = bonus.concat(OD);    
    
        exec.push("{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}");
        exec.push("{{tBonus=[["+bonus.join("+")+"+0]]}}");
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

        if(isConditionnel == true)
            exec.push("{{conditionnel=true}}");

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
});

const rollMAImprovise = 14;

for(let i = 0;i < rollMAImprovise;i++) {
    let str = `MAAI${i}`;
    let strDgts = `dgts${i}`;
    let strViolence = `violence${i}`;

    on(`clicked:${str}`, function(info) {
        let roll = info.htmlAttributes.value;

        let attributs = [
            "MAUtilisationArmeAI",
            "jetModifDes",
            "bonusCarac",
            "caracteristique3ArmeImprovisee",
            "caracteristique4ArmeImprovisee"
        ];

        let arme = [];

        arme.push(strDgts);
        arme.push(strViolence);

        let style = [
            "styleCombat",
            "atkDefensif",
            "atkCouvert",
            "atkAgressif",
            "atkAkimbo",
            "atkAmbidextre"
        ];

        attributs = attributs.concat(arme);
        attributs = attributs.concat(style);

        getAttrs(attributs, function(value)
        {
            let exec = [];
            exec.push(roll);

            let isConditionnelA = false;
            let isConditionnelD = false;
            let isConditionnelV = false;

            let cBase = [];
            let cBonus = [];
            let cRoll = [];
            let bonus = [];

            let OD = [];
            
            let type = value["MAUtilisationArmeAI"];
            let mod = Number(value["jetModifDes"]);
            let hasBonus = Number(value["bonusCarac"]);

            let baseDegats = Number(value[strDgts].split("D")[0]);
            let baseViolence = Number(value[strViolence].split("D")[0]);

            let diceDegats = baseDegats;
            let diceViolence = baseDegats;

            let bDegats = [];
            let bViolence = [];

            let degats = [];
            let violence = [];

            let C1Nom;
            let C2Nom;

            let C3 = value[`caracteristique3ArmeImprovisee`];
            let C4 = value[`caracteristique4ArmeImprovisee`];
            
            if(type == "&{template:combat} {{portee=^{portee-contact}}}") {
                C1Nom = "force";
                C2Nom = "combat";
            } else {
                C1Nom = "force";
                C2Nom = "tir";
            }

            let C3Nom = C3.slice(2, -1);
            let C4Nom = C4.slice(2, -1);

            let attaquesSurprises = [];
            let attaquesSurprisesValue = [];
            let attaquesSurprisesCondition = "";

            let autresEffets = [];
            
            exec.push("{{OD=true}}");

            let C1Value = Number(CaracValue[C1Nom].value);
            let C1OD = Number(CaracValue[C1Nom].OD);

            cBase.push(CaracNom[C1Nom]);
            cRoll.push(C1Value);

            OD.push(C1OD);

            let C2Value = Number(CaracValue[C2Nom].value);
            let C2OD = Number(CaracValue[C2Nom].OD);

            cBase.push(CaracNom[C2Nom]);
            cRoll.push(C2Value);

            OD.push(C2OD);

            if(hasBonus == 1 || hasBonus == 2) {
                if(C3 != "0") {
                    let C3Value = Number(CaracValue[C3Nom].value);
                    let C3OD = Number(CaracValue[C3Nom].OD);

                    cBonus.push(CaracNom[C3Nom]);
                    cRoll.push(C3Value);

                    OD.push(C3OD);
                }

                if(hasBonus == 2) {
                    if(C4 != "0") {
                        let C4Value = Number(CaracValue[C4Nom].value);
                        let C4OD = Number(CaracValue[C4Nom].OD);

                        cBonus.push(CaracNom[C4Nom]);
                        cRoll.push(C4Value);

                        OD.push(C4OD);
                    }
                }
            }

            if(OD.length == 0)
                exec.push("{{vOD=0}}");
            else {
                let sumOD = _.reduce(OD, function(n1, n2){ return n1 + n2; }, 0);
                exec.push("{{vOD="+sumOD+"}}");
            }

            if(mod != 0) {
                cRoll.push(mod);
                exec.push("{{mod="+mod+"}}");
            }

            //GESTION DU STYLE
            let getStyle;

            if(type == "&{template:combat} {{portee=^{portee-contact}}}") {
                getStyle = getStyleContactMod(value, "", baseDegats, baseViolence, true, 0, false, false, false, false, false, false, false, false, false);
            } else {
                getStyle = getStyleDistanceMod(value, baseDegats, baseViolence, 0, true, 0, false, false, false, false);
            }

            exec = exec.concat(getStyle.exec);
            cRoll = cRoll.concat(getStyle.cRoll);
            diceDegats += getStyle.diceDegats;
            diceViolence += getStyle.diceViolence;

            console.log(bonus);

            //FIN GESTION DU STYLE

            if(cRoll.length == 0)
                cRoll.push(0);

            if(bonus.length == 0)
                bonus.push(0);

            bonus = bonus.concat(OD);

            degats.push(`${diceDegats}D6`);
            degats = degats.concat(bDegats);

            violence.push(`${diceViolence}D6`);
            violence = violence.concat(bViolence);

            if(cBase.length != 0)
                exec.push("{{cBase="+cBase.join(" - ")+"}}");

            if(cBonus.length != 0)
                exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

            cRoll.push(Number(MAData["mechaArmurePuissance"]));
            exec.push("{{vPuissance=+"+Number(MAData["mechaArmurePuissance"])+"D}}");

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

            console.log(exec);

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
    });
}

const rollArchangel = ["MAAGOffering", "MAAGCurse", "MAARMiracle", "MAACanonNoe"];

rollArchangel.forEach(button => {
    on(`clicked:${button}`, function(info) {
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
        
        switch(button) {
            case "MAAGOffering":
                noyaux = Number(MAData[roll[1]]);
                degats = roll[2];
                duree = roll[3];

                exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}} {{jDivers3F12=^{si-bonus-degats-violence}}} {{jDiver3F12V=[[${degats}]]}}`);
                
                if(noyaux >= 2)
                    exec.push(`{{jDivers2=^{noyaux-depenses}}} {{jDivers2V=${noyaux}}}`);
                else
                    exec.push(`{{jDivers2=^{noyau-depense}}} {{jDivers2V=${noyaux}}}`);
                break;

            case "MAAGCurse":
                noyaux = Number(MAData[roll[1]]);
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
                sante = MAData[roll[1]];
                armure = MAData[roll[2]];
                blindage = MAData[roll[3]];
                resilience = MAData[roll[4]];
                duree = roll[5];

                exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}} {{jDivers2F12=^{armure}}} {{jDivers2F12V=[[${armure}]]}} {{jDivers3F12=^{sante}}} {{jDiver3F12V=[[${sante}]]}} {{jDivers4F12=^{blindage}}} {{jDiver4F12V=[[${blindage}]]}} {{jDivers5F12=^{resilience}}} {{jDiver5F12V=${resilience}}}`);
                break;

            case "MAACanonNoe":
                armure = MAData[roll[1]];
                blindage = MAData[roll[2]];
                resilience = MAData[roll[3]];

                exec.push(`{{jDivers=^{armure}}} {{jDiversV=${armure}}} {{jDivers2=^{blindage}}} {{jDivers2V=${blindage}}} {{jDivers3=^{resilience}}} {{jDivers3V=[[${resilience}]]}}`);
                break;
        }

        console.log(exec);

        startRoll(exec.join(" "), (results) => {
            finishRoll(
                results.rollId, {}
            );            
        });
    });
});

const rollCombatArchangel = ["MAACanonMetatron"];

rollCombatArchangel.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value.split(";");

        const style = {
            "styleCombat":PJData["styleCombat"],
            "atkDefensif":PJData["atkDefensif"],
            "atkCouvert":PJData["atkCouvert"],
            "atkAgressif":PJData["atkAgressif"],
            "atkAkimbo":PJData["atkAkimbo"],
            "atkAmbidextre":PJData["atkAmbidextre"],
            "atkPilonnage":PJData["atkPilonnage"],
            "atkPuissant":PJData["atkPuissant"]
        }

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

        var jet;
        let cRoll = [];
        let rollBonus = [];
        let cBase = [];
        let cBonus = [];
        let cOD = [];

        let degats;
        let bDegats;
        let violence;
        let bViolence;

        let getStyle;

        exec.push(base);
        
        switch(button) {
            case "MAACanonMetatron":
                bCarac = PJData["bonusCarac"];
                mod = PJData["jetModifDes"];

                C1 = MAData["canonMetatronCaracteristique1"];
                C2 = MAData["canonMetatronCaracteristique2"];
                C3 = MAData["canonMetatronCaracteristique3"];
                C4 = MAData["canonMetatronCaracteristique4"];

                if(C1 != "0") {
                    C1Nom = C1.slice(2, -1);

                    cBase.push(CaracNom[C1Nom]);
                    cRoll.push(Number(CaracValue[C1Nom].value));
                    cOD.push(Number(CaracValue[C1Nom].OD));
                }

                if(C2 != "0") {
                    C2Nom = C2.slice(2, -1);

                    cBase.push(CaracNom[C2Nom]);
                    cRoll.push(Number(CaracValue[C2Nom].value));
                    cOD.push(Number(CaracValue[C2Nom].OD));
                }

                if(bCarac > 0) {
                    switch(bCarac) {
                        case 1:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }                        
                            break;

                        case 2:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }

                            if(C4 != "0") {
                                C4Nom = C4.slice(2, -1);

                                cBonus.push(CaracNom[C4Nom]);
                                cRoll.push(Number(CaracValue[C4Nom].value));
                                
                                cOD.push(Number(CaracValue[C4Nom].OD));
                            }
                            break;
                    }
                }

                degats = Number(MAData[roll[1]].split("D")[0]);
                bDegats = Number(MAData[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(MAData[roll[2]].split("D")[0]);
                bViolence = Number(MAData[roll[2]].split("D")[1].split("+")[1]) || 0;

                if(cBase.length > 0)
                    exec.push(cBase.join(" - "));

                if(cBonus.length > 0)
                    exec.push(cBonus.join(" - "));

                getStyle = getStyleDistanceMod(style, degats, violence, "", true, 0, false, false, false, false);

                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(MAData["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(MAData["mechaArmurePuissance"])+"D}}");

                rollBonus = rollBonus.concat(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(cOD.length == 0)
                    cOD.push(0);

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD=[["+cOD.join("+")+"]]}}");
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
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value.split(";");

        let exec = [];

        let base = roll[0];

        let duree;
        let tours;
        let degats;
        let violence;
        let effets = [];

        exec.push(base);
        
        switch(button) {
            case "MANOGInvulnerabilite":
                duree = MAData[roll[1]];

                exec.push(`{{jDivers=^{duree-en-tours}}} {{jDiversV=[[${duree}]]}}`);
                break;

            case "MANOGStationDebordement":
                tours = MAData[roll[1]];

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
                degats = MAData[roll[1]];
                violence = MAData[roll[2]];

                effets.push(i18n_antiVehicule);
                effets.push(i18n_demoralisant);
                effets.push(i18n_briserResilience);
                effets.sort();

                exec.push(`{{degats=[[${degats}]]}} {{degatsConditionnel=true}} {{meurtrier=${i18n_meurtrier}}} {{meurtrierValue=[[2D6]]}} {{meurtrierCondition=${i18n_meurtrierCondition}}} {{violence=[[${violence}]]}} {{violenceConditionnel=true}} {{fureur=${i18n_fureur}}} {{fureurValue=[[2D6]]}} {{fureurCondition=${i18n_fureurCondition}}} {{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}} {{effets=`+effets.join(" / ")+`}}`);
                break;
       }

        console.log(exec);

        startRoll(exec.join(" "), (results) => {
            finishRoll(
                results.rollId, {}
            );            
        });
    });
});

const rollCombatNephilim = ["MANCanonMagma", "MANMSurtur"];

rollCombatNephilim.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value.split(";");

        const style = {
            "styleCombat":PJData["styleCombat"],
            "atkDefensif":PJData["atkDefensif"],
            "atkCouvert":PJData["atkCouvert"],
            "atkAgressif":PJData["atkAgressif"],
            "atkAkimbo":PJData["atkAkimbo"],
            "atkAmbidextre":PJData["atkAmbidextre"],
            "atkPilonnage":PJData["atkPilonnage"],
            "atkPuissant":PJData["atkPuissant"]
        }

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

        var jet;
        let cRoll = [];
        let rollBonus = [];
        let cBase = [];
        let cBonus = [];
        let cOD = [];

        let degats;
        let bDegats;
        let violence;
        let bViolence;

        let getStyle;

        let autresEffets;

        exec.push(base);
        
        switch(button) {
            case "MANCanonMagma":
                bCarac = PJData["bonusCarac"];
                mod = PJData["jetModifDes"];

                C1 = MAData["canonMagmaCaracteristique1"];
                C2 = MAData["canonMagmaCaracteristique2"];
                C3 = MAData["canonMagmaCaracteristique3"];
                C4 = MAData["canonMagmaCaracteristique4"];

                if(C1 != "0") {
                    C1Nom = C1.slice(2, -1);

                    cBase.push(CaracNom[C1Nom]);
                    cRoll.push(Number(CaracValue[C1Nom].value));
                    cOD.push(Number(CaracValue[C1Nom].OD));
                }

                if(C2 != "0") {
                    C2Nom = C2.slice(2, -1);

                    cBase.push(CaracNom[C2Nom]);
                    cRoll.push(Number(CaracValue[C2Nom].value));
                    cOD.push(Number(CaracValue[C2Nom].OD));
                }

                if(bCarac > 0) {
                    switch(bCarac) {
                        case 1:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }                        
                            break;

                        case 2:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }

                            if(C4 != "0") {
                                C4Nom = C4.slice(2, -1);

                                cBonus.push(CaracNom[C4Nom]);
                                cRoll.push(Number(CaracValue[C4Nom].value));
                                
                                cOD.push(Number(CaracValue[C4Nom].OD));
                            }
                            break;
                    }
                }

                degats = Number(MAData[roll[1]].split("D")[0]);
                bDegats = Number(MAData[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(MAData[roll[2]].split("D")[0]);
                bViolence = Number(MAData[roll[2]].split("D")[1].split("+")[1]) || 0;

                getStyle = getStyleDistanceMod(style, degats, violence, "", true, 0, false, false, false, false);

                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(MAData["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(MAData["mechaArmurePuissance"])+"D}}");

                rollBonus = rollBonus.concat(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(cOD.length == 0)
                    cOD.push(0);

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD=[["+cOD.join("+")+"]]}}");
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
                bCarac = PJData["bonusCarac"];
                mod = PJData["jetModifDes"];

                C1 = MAData["MSurturCaracteristique1"];
                C2 = MAData["MSurturCaracteristique2"];
                C3 = MAData["MSurturCaracteristique3"];
                C4 = MAData["MSurturCaracteristique4"];

                if(C1 != "0") {
                    C1Nom = C1.slice(2, -1);

                    cBase.push(CaracNom[C1Nom]);
                    cRoll.push(Number(CaracValue[C1Nom].value));
                    cOD.push(Number(CaracValue[C1Nom].OD));
                }

                if(C2 != "0") {
                    C2Nom = C2.slice(2, -1);

                    cBase.push(CaracNom[C2Nom]);
                    cRoll.push(Number(CaracValue[C2Nom].value));
                    cOD.push(Number(CaracValue[C2Nom].OD));
                }

                if(bCarac > 0) {
                    switch(bCarac) {
                        case 1:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }                        
                            break;

                        case 2:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }

                            if(C4 != "0") {
                                C4Nom = C4.slice(2, -1);

                                cBonus.push(CaracNom[C4Nom]);
                                cRoll.push(Number(CaracValue[C4Nom].value));
                                
                                cOD.push(Number(CaracValue[C4Nom].OD));
                            }
                            break;
                    }
                }

                degats = Number(MAData[roll[1]].split("D")[0]);
                bDegats = Number(MAData[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(MAData[roll[2]].split("D")[0]);
                bViolence = Number(MAData[roll[2]].split("D")[1].split("+")[1]) || 0;

                getStyle = getStyleDistanceMod(style, degats, violence, "", true, 0, false, false, false, false);

                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(MAData["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(MAData["mechaArmurePuissance"])+"D}}");

                rollBonus = rollBonus.concat(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(cOD.length == 0)
                    cOD.push(0);

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD=[["+cOD.join("+")+"]]}}");
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

        console.log(exec);

        startRoll(exec.join(" "), (results) => {
            console.log(results);
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
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value.split(";");

        let exec = [];

        let base = roll[0];

        let degats;
        let violence;

        exec.push(base);
        
        switch(button) {
            case "MAAMI":
                degats = MAData[roll[1]];
                violence = MAData[roll[2]];

                exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}} {{effets=^{CDF-desactive-pendant} [[1D3]] ^{tours}}}`);
                break;

            case "MAATLA":
                degats = MAData[roll[1]];
                violence = MAData[roll[2]];

                exec.push(`{{degats=[[${degats}]]}} {{violence=[[${violence}]]}} {{degatsConditionnel=true}} {{violenceConditionnel=true}} {{antiAnatheme=${i18n_antiAnatheme}}} {{antiAnathemeCondition=${i18n_antiAnathemeCondition}}} {{effets=${i18n_antiVehicule}}}`);
                break;
       }

        console.log(exec);

        startRoll(exec.join(" "), (results) => {
            finishRoll(
                results.rollId, {}
            );            
        });
    });
});

const rollCombatDemon = ["MADSouffle", "MADjinnWraith", "MADPSoniques", "MADLCG"];

rollCombatDemon.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value.split(";");

        const style = {
            "styleCombat":PJData["styleCombat"],
            "atkDefensif":PJData["atkDefensif"],
            "atkCouvert":PJData["atkCouvert"],
            "atkAgressif":PJData["atkAgressif"],
            "atkAkimbo":PJData["atkAkimbo"],
            "atkAmbidextre":PJData["atkAmbidextre"],
            "atkPilonnage":PJData["atkPilonnage"],
            "atkPuissant":PJData["atkPuissant"]
        }

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

        let vDiscretion = CaracValue["discretion"].value;
        let oDiscretion = CaracValue["discretion"].VraiOD;
        let oTir = CaracValue["tir"].VraiOD;

        var jet;
        let cRoll = [];
        let rollBonus = [];
        let cBase = [];
        let cBonus = [];
        let cOD = [];

        let degats;
        let bDegats;
        let violence;
        let bViolence;

        let getStyle;

        let autresEffets;

        exec.push(base);
        
        switch(button) {
            case "MADSouffle":
                bCarac = PJData["bonusCarac"];
                mod = PJData["jetModifDes"];

                C1 = MAData["DSouffleCaracteristique1"];
                C2 = MAData["DSouffleCaracteristique2"];
                C3 = MAData["DSouffleCaracteristique3"];
                C4 = MAData["DSouffleCaracteristique4"];

                if(C1 != "0") {
                    C1Nom = C1.slice(2, -1);

                    cBase.push(CaracNom[C1Nom]);
                    cRoll.push(Number(CaracValue[C1Nom].value));
                    cOD.push(Number(CaracValue[C1Nom].OD));
                }

                if(C2 != "0") {
                    C2Nom = C2.slice(2, -1);

                    cBase.push(CaracNom[C2Nom]);
                    cRoll.push(Number(CaracValue[C2Nom].value));
                    cOD.push(Number(CaracValue[C2Nom].OD));
                }

                if(bCarac > 0) {
                    switch(bCarac) {
                        case 1:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }                        
                            break;

                        case 2:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }

                            if(C4 != "0") {
                                C4Nom = C4.slice(2, -1);

                                cBonus.push(CaracNom[C4Nom]);
                                cRoll.push(Number(CaracValue[C4Nom].value));
                                
                                cOD.push(Number(CaracValue[C4Nom].OD));
                            }
                            break;
                    }
                }

                degats = Number(MAData[roll[1]].split("D")[0]);
                bDegats = Number(MAData[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(MAData[roll[2]]);
                bViolence = 0;

                getStyle = getStyleDistanceMod(style, degats, violence, "", true, 0, false, false, false, false);

                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(MAData["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(MAData["mechaArmurePuissance"])+"D}}");

                rollBonus = rollBonus.concat(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(cOD.length == 0)
                    cOD.push(0);

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD=[["+cOD.join("+")+"]]}}");
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
                let active = MAData["MADDjinnWraithActive"];

                bCarac = PJData["bonusCarac"];
                mod = PJData["jetModifDes"];

                C1 = "@{discretion}";
                C2 = MAData["caracteristiqueWraith2"];
                C3 = MAData["caracteristiqueWraith3"];
                C4 = MAData["caracteristiqueWraith4"];

                console.log(C2);
                console.log(C3);
                console.log(C4);
                
                if(active != "0")
                    exec.push("{{special2=^{module-wraith} ^{active}}}");

                C1Nom = C1.slice(2, -1);

                cBase.push(CaracNom[C1Nom]);
                cRoll.push(Number(CaracValue[C1Nom].value));
                cOD.push(Number(CaracValue[C1Nom].OD));

                if(C2 != "0") {
                    C2Nom = C2.slice(2, -1);

                    cBase.push(CaracNom[C2Nom]);
                    cRoll.push(Number(CaracValue[C2Nom].value));
                    cOD.push(Number(CaracValue[C2Nom].OD));
                }

                if(bCarac > 0) {
                    switch(bCarac) {
                        case 1:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }                        
                            break;

                        case 2:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }

                            if(C4 != "0") {
                                C4Nom = C4.slice(2, -1);

                                cBonus.push(CaracNom[C4Nom]);
                                cRoll.push(Number(CaracValue[C4Nom].value));
                                
                                cOD.push(Number(CaracValue[C4Nom].OD));
                            }
                            break;
                    }
                }

                cRoll.push(Number(MAData["mechaArmureManoeuvrabilite"]));
                exec.push("{{vManoeuvrabilite=+"+Number(MAData["mechaArmureManoeuvrabilite"])+"D}}");

                rollBonus = rollBonus.concat(cOD);

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(cOD.length == 0)
                    cOD.push(0);

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD=[["+cOD.join("+")+"]]}}");
                exec.push("{{bonus=[["+rollBonus.join("+")+"]]}}");

                if(cBase.length > 0)
                    exec.push("{{cBase="+cBase.join(" - ")+"}}");

                if(cBonus.length > 0)
                    exec.push("{{cBonus="+cBonus.join(" - ")+"}}");
                break;
            
            case "MADPSoniques":
                bCarac = PJData["bonusCarac"];
                mod = PJData["jetModifDes"];

                C1 = MAData["APoingsCaracteristique1"];
                C2 = MAData["APoingsCaracteristique2"];
                C3 = MAData["APoingsCaracteristique3"];
                C4 = MAData["APoingsCaracteristique4"];

                if(C1 != "0") {
                    C1Nom = C1.slice(2, -1);

                    cBase.push(CaracNom[C1Nom]);
                    cRoll.push(Number(CaracValue[C1Nom].value));
                    cOD.push(Number(CaracValue[C1Nom].OD));
                }

                if(C2 != "0") {
                    C2Nom = C2.slice(2, -1);

                    cBase.push(CaracNom[C2Nom]);
                    cRoll.push(Number(CaracValue[C2Nom].value));
                    cOD.push(Number(CaracValue[C2Nom].OD));
                }

                if(bCarac > 0) {
                    switch(bCarac) {
                        case 1:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }                        
                            break;

                        case 2:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }

                            if(C4 != "0") {
                                C4Nom = C4.slice(2, -1);

                                cBonus.push(CaracNom[C4Nom]);
                                cRoll.push(Number(CaracValue[C4Nom].value));
                                
                                cOD.push(Number(CaracValue[C4Nom].OD));
                            }
                            break;
                    }
                }

                degats = Number(MAData[roll[1]].split("D")[0]);
                bDegats = Number(MAData[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(MAData[roll[2]].split("D")[0]);
                bViolence = Number(MAData[roll[2]].split("D")[1].split("+")[1]) || 0;

                getStyle = getStyleDistanceMod(style, degats, violence, "", true, 0, false, false, false, false);

                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(MAData["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(MAData["mechaArmurePuissance"])+"D}}");

                rollBonus = rollBonus.concat(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(cOD.length == 0)
                    cOD.push(0);

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD=[["+cOD.join("+")+"]]}}");
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
                bCarac = PJData["bonusCarac"];
                mod = PJData["jetModifDes"];

                C1 = MAData["LCGCaracteristique1"];
                C2 = MAData["LCGCaracteristique2"];
                C3 = MAData["LCGCaracteristique3"];
                C4 = MAData["LCGCaracteristique4"];

                if(C1 != "0") {
                    C1Nom = C1.slice(2, -1);

                    cBase.push(CaracNom[C1Nom]);
                    cRoll.push(Number(CaracValue[C1Nom].value));
                    cOD.push(Number(CaracValue[C1Nom].OD));
                }

                if(C2 != "0") {
                    C2Nom = C2.slice(2, -1);

                    cBase.push(CaracNom[C2Nom]);
                    cRoll.push(Number(CaracValue[C2Nom].value));
                    cOD.push(Number(CaracValue[C2Nom].OD));
                }

                if(bCarac > 0) {
                    switch(bCarac) {
                        case 1:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }                        
                            break;

                        case 2:
                            if(C3 != "0") {
                                C3Nom = C3.slice(2, -1);

                                cBonus.push(CaracNom[C3Nom]);
                                cRoll.push(Number(CaracValue[C3Nom].value));
                                cOD.push(Number(CaracValue[C3Nom].OD));
                            }

                            if(C4 != "0") {
                                C4Nom = C4.slice(2, -1);

                                cBonus.push(CaracNom[C4Nom]);
                                cRoll.push(Number(CaracValue[C4Nom].value));
                                
                                cOD.push(Number(CaracValue[C4Nom].OD));
                            }
                            break;
                    }
                }

                degats = Number(MAData[roll[1]].split("D")[0]);
                bDegats = Number(MAData[roll[1]].split("D")[1].split("+")[1]) || 0;

                violence = Number(MAData[roll[2]].split("D")[0]);
                bViolence = Number(MAData[roll[2]].split("D")[1].split("+")[1]) || 0;

                getStyle = getStyleDistanceMod(style, degats, violence, "", true, 0, false, false, false, false);

                cRoll = cRoll.concat(getStyle.cRoll);
                cRoll.push(Number(MAData["mechaArmurePuissance"]));
                exec.push("{{vPuissance=+"+Number(MAData["mechaArmurePuissance"])+"D}}");

                rollBonus = rollBonus.concat(cOD);

                degats += getStyle.diceDegats;
                violence += getStyle.diceViolence;

                jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

                exec.push(jet);
                exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

                if(cOD.length == 0)
                    cOD.push(0);

                if(rollBonus.length == 0)
                    rollBonus.push(0);

                exec.push("{{vOD=[["+cOD.join("+")+"]]}}");
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

        console.log(exec);

        startRoll(exec.join(" "), (results) => {
            console.log(results);
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