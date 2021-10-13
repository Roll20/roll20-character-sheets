const rollCombatPNJContact = ["pSContactPNJ", "mEContactPNJ", "repeating_armeCaC:armecontactpnj"];

rollCombatPNJContact.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value;

        let firstExec = [];
        let exec = [];

        let mod = PJData["jetModifDes"];
        let energie = PNJData["energiePNJ"];

        let name = "";
        let id = "";
        let data = false;
        
        let effets = [];
        let effetsValue = [];
        let AS = [];
        let AO = [];
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

        let vBeteD = 0;

        let diceDegats = 0;
        let bDegats = 0;

        let diceViolence = 0;
        let bViolence = 0;

        let portee = "";

        let aBase = "0";
        let aspect = "0";
        let aspectValue = 0;
        let AEValue = 0;
        
        let isConditionnelA = false;
        let isConditionnelD = false;
        let isConditionnelV = false;

        let cRoll = [];
        let bonus = [];
        let autresEffets = [];
        let autresAmeliorationsS = [];
        let autresAmeliorationsO = [];
        let autresSpecial = [];

        let eASAssassin = "";
        let eASAssassinValue = 0;

        let isObliteration = false;
        let isTenebricide = false;

        let isAntiAnatheme = false;
        let isAssistanceAttaque = false;
        let isChoc = false;
        let isDestructeur = false;
        let isLeste = false;
        let isMeurtrier = false;
        let isOrfevrerie = false;
        let isSilencieux = false;

        let isCadence = false;
        let rCadence = "0";
        let vCadence = 0;

        let isChromee = false;

        let isArmeAzurine = false;
        let vArmeAzurine = 0;

        let isArmeRougeSang = false;
        let vArmeRougeSang = 0;

        let isCheneSculpte = false;
        let vCheneSculpte = 0;

        let isGriffureGravee = false;
        let vGriffureGravee = 0;

        let isMasqueBrise = false;
        let vMasqueBrise = 0;

        let isRouagesCasses = false;
        let vRouagesCasses = 0;

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let capacitesFM = PNJData["capaciteFanMade"];
        let attaquesOmbres = PNJData["attaqueOmbre"];

        switch(button) {
            case "pSContactPNJ":            
                effets = wpnE["pSC"];
                effetsValue = wpnEValue["pSC"];
                AS = wpnAS["pSC"];
                AO = wpnAO["pSC"];
                special = wpnS["pSC"];
                specialValue = wpnSValue["pSC"];

                name = `{{special1=${i18n_couteauService}}}`;

                diceDegats = 1;

                bViolence = 1;

                portee = "{{portee=^{portee} ^{portee-contact}}}";

                aBase = PNJData["pSCAspectPNJ"];

                console.log(aBase);

                if(aBase != "0")
                    aspect = aBase.slice(2, -1);
                break;

            case "mEContactPNJ":
                effets = wpnE["mEC"];
                effetsValue = wpnEValue["mEC"];
                AS = wpnAS["mEC"];
                AO = wpnAO["mEC"];
                special = wpnS["mEC"];
                specialValue = wpnSValue["mEC"];

                name = `{{special1=${i18n_marteauEpieuC}}}`;

                diceDegats = 3;

                diceViolence = 1;

                portee = "{{portee=^{portee} ^{portee-contact}}}";

                aBase = PNJData["mECAspectPNJ"];

                if(aBase != "0")
                    aspect = aBase.slice(2, -1);
                break;

            case "repeating_armeCaC:armecontactpnj":
                id = info.triggerName.split("_")[2];

                data = wpnData[id] || [];
                effets = wpnE[id] || [];
                effetsValue = wpnEValue[id] || [];
                AS = wpnAS[id] || [];
                AO = wpnAO[id] || [];
                special = wpnS[id] || [];          
                specialValue = wpnSValue[id] || [];      

                let dName = data["ArmeCaC"] || "";
                name = `{{special1=${dName}}}`;

                diceDegats = Number(data["armeCaCDegat"]) || 0;
                bDegats = Number(data["armeCaCBDegat"]) || 0;

                diceViolence = Number(data["armeCaCViolence"]) || 0;
                bViolence = Number(data["armeCaCBViolence"]) || 0;

                let dPortee = data["armeCaCPortee"] || "^{portee-contact}";
                portee = `{{portee=^{portee} ${dPortee}}}`;

                aBase = data["aspectPNJ"] || "0";

                if(aBase != "0")
                    aspect = aBase.slice(2, -1);
                break;
        }

        firstExec.push(roll);
        exec.push(portee);
        exec.push(name);

        if(aspect != "0") {
            
            aspectValue = Number(AspectValue[aspect].value);
            AEValue = Number(AspectValue[aspect].AEMin)+Number(AspectValue[aspect].AEMaj);
            aspect = `{{cBase=${AspectNom[aspect]}}}`;

            cRoll.push(aspectValue);
            exec.push(aspect);
        }

        if(vChair > 0) {
            let vChairD = Math.ceil(vChair/2);

            bDegats += vChairD;
            exec.push(`{{vChair=${vChairD}}}`);
        }
        
        //GESTION DES ASPECTS EXCEPTIONNELS

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

        console.log(bDegats);

        if(vBeteD > 0)
            exec.push(`{{vBeteD=${vBeteD}}}`);

        //FIN GESTION DES ASPECTS EXCEPTIONNELS

        //GESTION DES EFFETS
                
        let rEffets = getWeaponsEffectsPNJ(effets, effetsValue, vChair, vMachine, vMachineAE, vMasque, vMasqueAE);

        firstExec = firstExec.concat(rEffets.firstExec);
        exec = exec.concat(rEffets.exec);

        eASAssassin = rEffets.eASAssassin;
        eASAssassinValue = rEffets.eASAssassinValue;

        isObliteration = rEffets.isObliteration;
        isTenebricide = rEffets.isTenebricide;

        isAntiAnatheme = rEffets.isAntiAnatheme;
        isAssistanceAttaque = rEffets.isAssistanceAttaque;
        isChoc = rEffets.isChoc;
        isDestructeur = rEffets.isDestructeur;
        isLeste = rEffets.isLeste;
        isMeurtrier = rEffets.isMeurtrier;
        isOrfevrerie = rEffets.isOrfevrerie;
        isSilencieux = rEffets.isSilencieux;

        isCadence = rEffets.isCadence;
        rCadence = rEffets.rCadence || "0";
        vCadence = rEffets.vCadence;

        attaquesSurprises = attaquesSurprises.concat(rEffets.attaquesSurprises);
        attaquesSurprisesValue = attaquesSurprisesValue.concat(rEffets.attaquesSurprisesValue);
        attaquesSurprisesCondition = rEffets.attaquesSurprisesCondition;

        bDegats += Number(rEffets.bDegats);

        autresEffets = autresEffets.concat(rEffets.autresEffets);

        if(rEffets.isConditionnelA)
            isConditionnelA = true;

        if(rEffets.isConditionnelD)
            isConditionnelD = true;

        if(rEffets.isConditionnelV)
            isConditionnelV = true;

        if(attaquesOmbres != "0" && capacitesFM != "0") {
            isConditionnelD = true;

            attaquesSurprises.push(i18n_attaquesOmbres);
            attaquesSurprisesValue.push(vMasque);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`;
        }

        //FIN GESTION DES EFFETS

        //GESTION DES AMELIORATIONS STRUCTURELLES

        let rAS = getWeaponsContactASPNJ(AS, isAssistanceAttaque, isChoc, isLeste, isMeurtrier, isOrfevrerie, isSilencieux, vBete, vChair, vMasque, vMasqueAE);

        exec = exec.concat(rAS.exec);

        bonus = bonus.concat(rAS.bAttaque);
        diceDegats += Number(rAS.diceDegats);
        bDegats += Number(rAS.bDegats);

        attaquesSurprises = attaquesSurprises.concat(rAS.attaquesSurprises);
        attaquesSurprisesValue = attaquesSurprisesValue.concat(rAS.attaquesSurprisesValue);

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = rAS.attaquesSurprisesCondition;

        autresAmeliorationsS = autresAmeliorationsS.concat(rAS.autresAmeliorations);

        if(rAS.isConditionnelA)
            isConditionnelA = true;

        if(rAS.isConditionnelD)
            isConditionnelD = true;

        if(rAS.isConditionnelV)
            isConditionnelV = true;

        //FIN GESTION DES AMELIORATIONS STRUCTURELLES

        //GESTION DES AMELIORATIONS ORNEMENTALLES
        let rAO = getWeaponsContactAOPNJ(AO, isCadence, vCadence, isObliteration, isAntiAnatheme);

        firstExec = firstExec.concat(rAO.firstExec);
        exec = exec.concat(rAO.exec);

        diceDegats += Number(rAO.diceDegats);
        bDegats += Number(rAO.bDegats);

        diceViolence += rAO.diceViolence;

        if(rAO.vCadence > 0) {
            isCadence = false;
            rCadence = rAO.rCadence;
            vCadence = rAO.vCadence;
        }

        if(rAO.isObliteration)
            isObliteration = true;

        isChromee = rAO.isChromee;
        isCraneRieur = rAO.isCraneRieur;

        isArmeAzurine = rAO.isArmeAzurine;
        vArmeAzurine = rAO.vArmeAzurine;

        isArmeRougeSang = rAO.isArmeRougeSang;
        vArmeRougeSang = rAO.vArmeRougeSang;

        isCheneSculpte = rAO.isCheneSculpte;
        vCheneSculpte = rAO.vCheneSculpte;

        isGriffureGravee = rAO.isGriffureGravee;
        vGriffureGravee = rAO.vGriffureGravee;

        isMasqueBrise = rAO.isMasqueBrise;
        vMasqueBrise = rAO.vMasqueBrise;

        isRouagesCasses = rAO.isRouagesCasses;
        vRouagesCasses = rAO.vRouagesCasses;

        autresAmeliorationsO = autresAmeliorationsO.concat(rAO.autresAmeliorations);

        if(rAO.isConditionnelA)
            isConditionnelA = true;

        if(rAO.isConditionnelD)
            isConditionnelD = true;

        if(rAO.isConditionnelV)
            isConditionnelV = true;

        //FIN GESTION DES AMELIORATIONS ORNEMENTALLES

        //GESTION DES BONUS SPECIAUX

        let sBonusDegats = special["BDDiversTotal"];
        let sBonusDegatsD6 = specialValue["BDDiversD6"];
        let sBonusDegatsFixe = specialValue["BDDiversFixe"];

        let sBonusViolence = special["BVDiversTotal"];
        let sBonusViolenceD6 = specialValue["BVDiversD6"];
        let sBonusViolenceFixe = specialValue["BVDiversFixe"];

        let sEnergie = special["energie"];
        let sEnergieValue = specialValue["energieValue"];
        let sEnergieText = "";
        let pasEnergie = false;

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

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+"-"+rCadence+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";
        firstExec.push(jet);

        bonus.push(AEValue);

        exec.push(`{{vAE=${AEValue}}}`);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        firstExec.push(`{{degats=[[${diceDegats}D6+${bDegats}]]}}`);
        firstExec.push(`{{violence=[[${diceViolence}D6+${bViolence}]]}}`);

        if(isCadence) {
            exec.push("{{rCadence="+i18n_cadence+" "+vCadence+" "+i18n_inclus+"}}");
            exec.push("{{vCadence="+sCadence+"D}}");
        }

        if(isChromee) {
            exec.push("{{rCadence="+i18n_chromee+" ("+i18n_cadence+" "+vCadence+") "+i18n_inclus+"}}");
            exec.push("{{vCadence="+rCadence+"D}}");
        }

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

            let diceDegatsObliteration = diceDegats*6;

            let vObliteration = diceDegatsObliteration+bDegats;
            
            exec.push("{{obliterationValue="+vObliteration+"}}");

            if(isMeurtrier)
                exec.push("{{obliterationMeurtrierValue="+2*6+"}}");

            if(isDestructeur)
                exec.push("{{obliterationDestructeurValue="+2*6+"}}");

            if(eASAssassinValue > 0) {
                let eAssassinObliterationValue = eASAssassinValue*6;

                ASObliteration.unshift(eASAssassin);
                ASValueObliteration.unshift(eAssassinObliterationValue);

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

            if(isArmeAzurine)
                exec.push("{{obliterationArmeAzurineValue="+vArmeAzurine*6+"}}");

            if(isArmeRougeSang)
                exec.push("{{obliterationArmeRougeSangValue="+vArmeRougeSang*6+"}}");

            if(isCheneSculpte)
                exec.push("{{obliterationCheneSculpteValue="+vCheneSculpte*6+"}}");

            if(isGriffureGravee)
                exec.push("{{obliterationGriffureGraveeValue="+vGriffureGravee*6+"}}");

            if(isMasqueBrise)
                exec.push("{{obliterationMasqueBriseValue="+vMasqueBrise*6+"}}");

            if(isRouagesCasses)
                exec.push("{{obliterationRouagesCassesValue="+vRouagesCasses*6+"}}");
        }

        if(eASAssassinValue > 0) {
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

        if(autresAmeliorationsS.length > 0) {
            autresAmeliorationsS.sort();
            exec.push("{{ameliorationsS="+autresAmeliorationsS.join(" / ")+"}}");
        }                

        if(autresAmeliorationsO.length > 0) {
            autresAmeliorationsO.sort();
            exec.push("{{ameliorationsO="+autresAmeliorationsO.join(" / ")+"}}");
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

        firstExec = firstExec.concat(exec);

        console.log(firstExec);

        if(pasEnergie == false) {
            startRoll(firstExec.join(" "), (results) => {
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

                let tCheneSculpte = results.results.cheneSculpteValue;
                let vTCheneSculpte = 0;

                if(tCheneSculpte != undefined)
                    vTCheneSculpte = tCheneSculpte.dice[0];

                finishRoll(
                    results.rollId, 
                    {
                        jet:tJet+tBonus,
                        meurtrierValue:vTMeurtrier,
                        destructeurValue:vTDestructeur,
                        fureurValue:vTFureur,
                        ultraviolenceValue:vTUltraviolence,
                        cheneSculpteValue:vTCheneSculpte,
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
                    setAttrs({
                        energiePNJ: newEnergie
                    });

                    if(newEnergie == 0) {
                        startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{text="+sEnergieText+"}}"+name, (exploit) => {    
                            finishRoll(
                                exploit.rollId,{}
                            );
                        });
                    }
                }
            });
        } else {
            if(button == "repeating_armeCaC:armecontactpnj") {
                startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{text="+sEnergieText+"}}"+name, (text) => {
                    finishRoll(
                        text.rollId,{}
                    );
                });
            } else {
                startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{text="+sEnergieText+"}}"+name, (text) => {
                    finishRoll(
                        text.rollId,{}
                    );
                });
            }
           
        }
    });
});