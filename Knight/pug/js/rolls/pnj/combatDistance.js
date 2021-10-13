const rollCombatDistancePNJ = ["pSDistancePNJ", "mEDistancePNJ", "repeating_armeDist:armedistancepnj"];

rollCombatDistancePNJ.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value;

        let firstExec = [];
        let exec = [];
        firstExec.push(roll);

        var name = "";
        var portee = "";

        let data = [];
        let dEffets = [];
        let dEffetsValue = [];
        let AA = [];
        let AAValue = [];
        let special = [];
        let specialValue = [];

        let vChair = Number(AspectValue["Chair"].value);
        let vBete = Number(AspectValue["Bete"].value);
        let vBeteAEMin = Number(AspectValue["Bete"].AEMin);
        let vBeteAEMaj = Number(AspectValue["Bete"].AEMaj);
        let vMachine = AspectValue["Machine"].value;
        let vMachineAE = Number(AspectValue["Machine"].AEMin)+Number(AspectValue["Machine"].AEMaj);
        let vMasque = AspectValue["Masque"].value;
        let vMasqueAE = Number(AspectValue["Masque"].AEMin)+Number(AspectValue["Masque"].AEMaj);

        let aspect = "0";
        let AE = 0;

        let vBeteD = 0;

        let baseDegats = 0;
        let baseViolence = 0;

        let diceDegats = 0;
        let diceViolence = 0;

        let bDegats = 0;
        let bViolence = 0;

        switch(button) {
            case "pSDistancePNJ":
                name = i18n_pistoletService;

                dEffets = wpnE["pS"];
                dEffetsValue = wpnEValue["pS"];
                AA = wpnAA["pS"] || [];
                AAValue = wpnAAValue["pS"] || [];
                special = wpnS["pS"];
                specialValue = wpnSValue["pS"];

                aspect = PNJData["pSAspectPNJ"] || "0";

                baseDegats = 2;
                baseViolence = 1;

                diceDegats = 2;
                bDegats = 6;

                diceViolence = 1;
                break;

            case "mEDistancePNJ":
                name = i18n_marteauEpieuD;

                dEffets = wpnE["mE"];
                dEffetsValue = wpnEValue["mE"];
                AA = wpnAA["mE"] || [];
                AAValue = wpnAAValue["mE"] || [];
                special = wpnS["mE"];
                specialValue = wpnSValue["mE"];

                aspect = PNJData["mEDistancePNJ"] || "0";

                baseDegats = 3;
                baseViolence = 3;

                diceDegats = 3;
                bDegats = 12;

                diceViolence = 3;
                bViolence = 12;
                break;

            case "repeating_armeDist:armedistancepnj":
            case "repeating_armeDistVehicule:armedistancepnj":
                let id = info.triggerName.split("_")[2];
                
                data = wpnData[id] || [];
                dEffets = wpnE[id] || [];
                dEffetsValue = wpnEValue[id] || [];
                AA = wpnAA[id] || [];
                AAValue = wpnAAValue[id] || [];
                special = wpnS[id] || [];          
                specialValue = wpnSValue[id] || []; 

                aspect = data["aspectPNJ"] || "0";

                name = data["ArmeDist"] || "";
                portee = data["armeDistPortee"] || "^{portee-contact}";

                let dName = `{{special1=${name}}}`;
                let dPortee = `{{portee=^{portee} ${portee}}}`;

                baseDegats = Number(data["armeDistDegat"]) || 0;
                baseViolence = Number(data["armeDistBDegat"]) || 0;

                diceDegats = Number(data["armeDistDegat"]) || 0;
                bDegats = Number(data["armeDistBDegat"]) || 0;

                diceViolence = Number(data["armeDistViolence"]) || 0;
                bViolence = Number(data["armeDistBViolence"]) || 0;

                exec.push(dPortee);
                exec.push(dName);
                break;
        }

        let isConditionnelA = false;
        let isConditionnelD = false;
        let isConditionnelV = false;

        let cBase = [];
        let cRoll = [];
        let bonus = [];
        
        let mod = PJData["jetModifDes"];
        
        let aspectNom = "";

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let capacitesFM = PNJData["capaciteFanMade"];
        let attaquesOmbres = PNJData["attaqueOmbre"];

        let eASAssassin = "";
        let eASAssassinValue = 0; 

        let isAssistantAttaque = false;
        let isAntiAnatheme = false;
        let isCadence = false;
        let sCadence = 0;
        let vCadence = 0;
        let isChoc = false;
        let isDestructeur = false;
        let isMeurtrier = false;
        let nowSilencieux = false;  
        let isObliteration = false;   
        let isOrfevrerie = false;  
        let isTenebricide = false;
        let isTirRafale = false;
        let isChambreDouble = false;

        let pasEnergie = false;
        let sEnergieText = "";
        let energie = PNJData["energiePNJ"];

        let autresEffets = [];
        let autresAmeliorationsA = [];
        let autresSpecial = [];

        if(aspect != "0") {
            aspectNom = aspect.slice(2, -1);

            let aspectValue = Number(AspectValue[aspectNom].value);
            AE = Number(AspectValue[aspectNom].AEMin)+Number(AspectValue[aspectNom].AEMaj);

            cBase.push(AspectNom[aspectNom]);
            cRoll.push(aspectValue);

            exec.push("{{vAE="+AE+"}}");
        };

        if(mod != 0) {
            cRoll.push(mod);
            exec.push("{{mod="+mod+"}}");
        }

        //GESTION DES BONUS DES ASPECTS EXCEPTIONNELS
        if(vBeteAEMin > 0 || vBeteAEMaj > 0) {
            bDegats += vBeteAEMin;
            bDegats += vBeteAEMaj;

            vBeteD += vBeteAEMin;
            vBeteD += vBeteAEMaj;
        }

        if(vBeteAEMaj > 0) {
            bDegats += vBete;
            vBeteD += vBete;
        }

        if(vBeteD > 0)
            exec.push(`{{vBeteD=${vBeteD}}}`);
        //FIN DE GESTION DES BONUS DES ASPECTS EXCEPTIONNELS

        //GESTION DES EFFETS

        var effets = getWeaponsEffectsPNJ(dEffets, dEffetsValue, vChair, vMachine, vMachineAE, vMasque, vMasqueAE);

        bDegats = bDegats += Number(effets.bDegats);
        eASAssassin = effets.eASAssassin;
        eASAssassinValue = effets.eASAssassinValue;

        if(attaquesSurprisesCondition == "" && effets.attaquesSurprisesCondition != "")
            attaquesSurprisesCondition = effets.attaquesSurprisesCondition;

        attaquesSurprises = attaquesSurprises.concat(effets.attaquesSurprises);
        attaquesSurprisesValue = attaquesSurprisesValue.concat(effets.attaquesSurprisesValue);

        autresEffets = autresEffets.concat(effets.autresEffets);

        isAntiAnatheme = effets.isAntiAnatheme;

        isAssistantAttaque = effets.isAssistantAttaque;
        console.log(wpnE);

        isCadence = effets.isCadence;
        sCadence = effets.sCadence;
        vCadence = effets.vCadence;

        isChoc = effets.isChoc;

        isDestructeur = effets.isDestructeur;
        vDestructeur = effets.vDestructeur;    

        isLeste = effets.isLeste;

        isMeurtrier = effets.isMeurtrier;
        vMeurtrier = effets.vMeurtrier;

        nowSilencieux = effets.isSilencieux;

        isOrfevrerie = effets.isOrfevrerie;

        isTenebricide = effets.isTenebricide;

        isObliteration = effets.isObliteration;
        isTirRafale = effets.isTirRafale;

        if(isLeste) {
            bDegats += Math.ceil(vChair/2);
            exec.push("{{vLeste="+vChair+"}}");
        }

        if(effets.isConditionnelA)
            isConditionnelA = true;

        if(effets.isConditionnelD)
            isConditionnelD = true;

        if(effets.isConditionnelV)
            isConditionnelV = true;

        if(attaquesOmbres != "0" && capacitesFM != "0") {
            isConditionnelD = true;

            attaquesSurprises.push(i18n_attaquesOmbres);
            attaquesSurprisesValue.push(vMasque);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
        }

        //FIN GESTION DES EFFETS

        //GESTION DES AMELIORATIONS D'ARMES

        var ameliorationsA = getWeaponsDistanceAAPNJ(AA, AAValue, vMasque, vMasqueAE, isAssistantAttaque, eASAssassinValue, isCadence, vCadence, nowSilencieux, isTirRafale, isObliteration, isAntiAnatheme);
        
        exec = exec.concat(ameliorationsA.exec);

        bonus = bonus.concat(ameliorationsA.bonus);

        baseDegats += ameliorationsA.diceDegats;
        baseViolence += ameliorationsA.diceViolence;

        diceDegats += ameliorationsA.diceDegats;
        diceViolence += ameliorationsA.diceViolence;

        bDegats = bDegats += Number(ameliorationsA.bDegats);

        attaquesSurprises = attaquesSurprises.concat(ameliorationsA.attaquesSurprises);
        attaquesSurprisesValue = attaquesSurprisesValue.concat(ameliorationsA.attaquesSurprisesValue);

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = ameliorationsA.attaquesSurprisesCondition;

        if(ameliorationsA.isChambreDouble) {
            isCadence = false;
            isChambreDouble = ameliorationsA.isChambreDouble;
            sCadence = ameliorationsA.rChambreDouble;
        }

        autresEffets = autresEffets.concat(ameliorationsA.autresEffets);
        autresAmeliorationsA = autresAmeliorationsA.concat(ameliorationsA.autresAmeliorations);

        if(ameliorationsA.aASAssassin != "") {
            eASAssassin = ameliorationsA.aASAssassin;
            eASAssassinValue = ameliorationsA.aASAssassinValue;
        }
            
        if(ameliorationsA.isConditionnelA)
            isConditionnelA = true;

        if(ameliorationsA.isConditionnelD)
            isConditionnelD = true;

        if(ameliorationsA.isConditionnelV)
            isConditionnelV = true;

        //FIN GESTION DES AMELIORATIONS D'ARMES

        //GESTION DES BONUS SPECIAUX

        let sBonusDegats = special["BDDiversTotal"];
        let sBonusDegatsD6 = specialValue["BDDiversD6"];
        let sBonusDegatsFixe = specialValue["BDDiversFixe"];

        let sBonusViolence = special["BVDiversTotal"];
        let sBonusViolenceD6 = specialValue["BVDiversD6"];
        let sBonusViolenceFixe = specialValue["BVDiversFixe"];

        let sEnergie = special["energie"];
        let sEnergieValue = specialValue["energieValue"];

        console.log(energie);
        console.log(sEnergieValue);

        if(sBonusDegats) {
            exec.push("{{vMSpecialD=+"+sBonusDegatsD6+"D6+"+sBonusDegatsFixe+"}}");
            diceDegats += Number(sBonusDegatsD6);
            bDegats += Number(sBonusDegatsFixe);
        }

        if(sBonusViolence) {
            exec.push("{{vMSpecialV=+"+sBonusViolenceD6+"D6+"+sBonusViolenceFixe+"}}");
            diceViolence += Number(sBonusViolenceD6);
            bViolence += Number(sBonusViolenceFixe);
        }

        if(sEnergie) {
            autresSpecial.push(i18n_energieRetiree+" ("+sEnergieValue+")");

            var newEnergie = Number(energie)-Number(sEnergieValue);

            if(newEnergie == 0) {
                sEnergieText = i18n_plusEnergie;

            } else if(newEnergie < 0) {

                newEnergie = 0;
                sEnergieText = i18n_pasEnergie;
                pasEnergie = true;
            }
            
            exec.push("{{energieR="+newEnergie+"}}");
        }

        //FIN DE GESTION DES BONUS SPECIAUX

        if(cRoll.length == 0)
            cRoll.push(0);

        if(bonus.length == 0)
            bonus.push(0);

        bonus.push(AE);

        if(cBase.length != 0)
            exec.push("{{cBase="+cBase.join(" - ")+"}}");

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+"-"+sCadence+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

        firstExec.push(jet);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        exec.push(`{{degats=[[${diceDegats}D6+${bDegats}]]}}`);
        exec.push(`{{violence=[[${diceViolence}D6+${bViolence}]]}}`);

        if(isTenebricide) {
            let degatsTenebricide = [];
            let ASTenebricide = [];
            let ASValueTenebricide = [];

            let violenceTenebricide = [];

            let diceDegatsTenebricide = Math.floor(diceDegats/2);
            let diceViolenceTenebricide = Math.floor(diceViolence/2);

            degatsTenebricide.push(diceDegatsTenebricide+"D6");
            degatsTenebricide = degatsTenebricide.concat(bDegats);

            violenceTenebricide.push(diceViolenceTenebricide+"D6");
            violenceTenebricide = violenceTenebricide.concat(bViolence);
            
            exec.push("{{tenebricideValueD=[["+degatsTenebricide.join("+")+"]]}}");
            exec.push("{{tenebricideValueV=[["+violenceTenebricide.join("+")+"]]}}");

            if(eASAssassinValue > 0) {
                eAssassinTenebricideValue = Math.ceil(eASAssassinValue/2);

                ASTenebricide.unshift(eASAssassin);
                ASValueTenebricide.unshift(eAssassinTenebricideValue+"D6");

                if(attaquesSurprises.length > 0) {
                    ASTenebricide = ASTenebricide.concat(attaquesSurprises);
                    ASValueTenebricide = ASValueTenebricide.concat(attaquesSurprisesValue);
                }

                exec.push("{{tenebricideAS="+ASTenebricide.join("\n+")+"}}");
                exec.push("{{tenebricideASValue=[["+ASValueTenebricide.join("+")+"]]}}");
            } else if(attaquesSurprises.length > 0) {

                ASTenebricide = ASTenebricide.concat(attaquesSurprises);
                ASValueTenebricide = ASValueTenebricide.concat(attaquesSurprisesValue);

                exec.push("{{tenebricideAS="+ASTenebricide.join("\n+")+"}}");
                exec.push("{{tenebricideASValue=[["+ASValueTenebricide.join("+")+"]]}}");
            }
        }

        if(isObliteration) {
            let ASObliteration = [];
            let ASValueObliteration = [];

            diceDegatsObliteration = diceDegats*6;
            
            degatsFObliteration = bDegats;

            let vObliteration = diceDegatsObliteration+degatsFObliteration;
            
            exec.push("{{obliterationValue="+vObliteration+"}}");

            if(isMeurtrier)
                exec.push("{{obliterationMeurtrierValue="+2*6+"}}");

            if(isDestructeur)
                exec.push("{{obliterationDestructeurValue="+2*6+"}}");

            if(eASAssassinValue > 0) {
                eAssassinTenebricideValue = eASAssassinValue*6;

                ASObliteration.unshift(eASAssassin);
                ASValueObliteration.unshift(eAssassinTenebricideValue);

                if(attaquesSurprises.length > 0) {
                    ASObliteration = ASObliteration.concat(attaquesSurprises);
                    ASValueObliteration = ASValueObliteration.concat(attaquesSurprisesValue);
                }

                exec.push("{{obliterationAS="+ASObliteration.join("\n+")+"}}");
                exec.push("{{obliterationASValue="+_.reduce(ASValueObliteration, function(n1, n2){ return n1 + n2; }, 0)+"}}");
            } else if(attaquesSurprises.length > 0) {

                ASObliteration = ASObliteration.concat(attaquesSurprises);
                ASValueObliteration = ASValueObliteration.concat(attaquesSurprisesValue);

                exec.push("{{obliterationAS="+ASTenebricide.join("\n+")+"}}");
                exec.push("{{obliterationASValue="+_.reduce(ASValueObliteration, function(n1, n2){ return n1 + n2; }, 0)+"}}");
            }
        }

        if(isCadence) {
            exec.push("{{rCadence="+i18n_cadence+" "+vCadence+" "+i18n_inclus+"}}");
            exec.push("{{vCadence="+sCadence+"D}}");
        }

        if(isChambreDouble) {
            exec.push("{{rCadence="+i18n_chambreDouble+" ("+i18n_cadence+" 2) "+i18n_inclus+"}}");
            exec.push("{{vCadence="+sCadence+"D}}");
        }

        if(eASAssassinValue > 0)
        {
            attaquesSurprises.unshift(eASAssassin);
            attaquesSurprisesValue.unshift(eASAssassinValue+"D6");
        }

        if(attaquesSurprises.length > 0) {
            exec.push("{{attaqueSurprise="+attaquesSurprises.join("\n+")+"}}");
            exec.push("{{attaqueSurpriseValue=[["+attaquesSurprisesValue.join("+")+"]]}}");
            exec.push(attaquesSurprisesCondition);
        }

        if(autresEffets.length > 0) {
            autresEffets.sort();
            exec.push("{{effets="+autresEffets.join(" / ")+"}}");
        }

        if(autresAmeliorationsA.length > 0) {
            autresAmeliorationsA.sort();
            exec.push("{{ameliorations="+autresAmeliorationsA.join(" / ")+"}}");
        }                

        if(autresSpecial.length > 0) {
            autresSpecial.sort();
            exec.push("{{special="+autresSpecial.join(" / ")+"}}");
        }                

        if(isConditionnelA)
            exec.push("{{succesConditionnel=true}}");

        if(isConditionnelD)
            exec.push("{{degatsConditionnel=true}}");

        if(isConditionnelV)
            exec.push("{{violenceConditionnel=true}}");

        if(effets.exec)
            exec = exec.concat(effets.exec);
        
        if(effets.firstExec)
            firstExec = firstExec.concat(effets.firstExec); 

        exec = firstExec.concat(exec);

        if(pasEnergie == false) {
            startRoll(exec.join(" "), (results) => {
                let tJet = results.results.jet.result;

                let tBonus = results.results.bonus.result;
                let tExploit = results.results.Exploit.result;

                let tMeurtrier = results.results.meurtrierValue;
                let vTMeurtrier = 0;

                if(tMeurtrier != undefined)
                    vTMeurtrier = tMeurtrier.dice[0];

                let tDestructeur = results.results.destructeurValue;
                let vTDestructeur = 0;

                if(tDestructeur != undefined)
                    vTDestructeur = tDestructeur.dice[0];
                
                let tFureur = results.results.fureurValue;
                let vTFureur = 0;

                if(tFureur != undefined)
                    vTFureur = tFureur.dice[0]+tFureur.dice[1];
                
                let tUltraviolence = results.results.ultraviolenceValue;
                
                let vTUltraviolence = 0;

                if(tUltraviolence != undefined)
                    vTUltraviolence = tUltraviolence.dice[0];

                finishRoll(
                    results.rollId, 
                    {
                        jet:tJet+tBonus,
                        meurtrierValue:vTMeurtrier,
                        destructeurValue:vTDestructeur,
                        fureurValue:vTFureur,
                        ultraviolenceValue:vTUltraviolence,
                    }
                );

                if(tJet != 0 && tJet == tExploit) {
                    startRoll(roll+"@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+i18n_exploit+"}}"+jet, (exploit) => {
                        let tExploit = exploit.results.jet.result;

                        finishRoll(
                            exploit.rollId, 
                            {
                                jet:tExploit
                            }
                        );
                    });
                }
                
                if(sEnergie != "0") {
                    console.log(newEnergie);
                    setAttrs({
                        energiePNJ: newEnergie
                    });

                    if(newEnergie == 0) {
                        startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+name+"}} {{text="+sEnergieText+"}}", (exploit) => {    
                            finishRoll(
                                exploit.rollId,{}
                            );
                        });
                    }
                }
            });
        } else {
            startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+name+"}} {{text="+sEnergieText+"}}", (text) => {
                finishRoll(
                    text.rollId,{}
                );
            });
        }
        
    });
});
