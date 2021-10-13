const rollCombatDistance = ["pSDistance", "mEDistance", "repeating_armeDist:armedistance", "repeating_armeDistVehicule:armedistance"];

rollCombatDistance.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value;
        let armure = donneesPJ["Armure"];
        let armureL = donneesPJ["ArmureLegende"];

        let firstExec = [];
        let exec = [];
        firstExec.push(roll);

        var hasArmure = true;

        var name = "";
        var portee = "";

        let data = [];
        let dEffets = [];
        let dEffetsValue = [];
        let AA = [];
        let AAValue = [];
        let special = [];
        let specialValue = [];

        let C1 = "0";
        let C2 = "0";
        let C3 = "0";
        let C4 = "0";

        let baseDegats = 0;
        let baseViolence = 0;

        let diceDegats = 0;
        let diceViolence = 0;

        let bDegats = [];
        let bViolence = [];

        let vPilonnage = 0;

        switch(button) {
            case "pSDistance":
                name = i18n_pistoletService;

                dEffets = wpnE["pS"];
                dEffetsValue = wpnEValue["pS"];
                AA = wpnAA["pS"] || [];
                AAValue = wpnAAValue["pS"] || [];
                special = wpnS["pS"];
                specialValue = wpnSValue["pS"];

                C1 = PJData["pScaracteristique1Equipement"] || "0";
                C2 = PJData["pScaracteristique2Equipement"] || "0";
                C3 = PJData["pScaracteristique3Equipement"] || "0";
                C4 = PJData["pScaracteristique4Equipement"] || "0";
                vPilonnage = PJData["pSpilonnage"] || "0";

                baseDegats = 2;
                baseViolence = 1;

                diceDegats = 2;
                bDegats.push(6);

                diceViolence = 1;
                bViolence.push(0);
                break;

            case "mEDistance":
                name = i18n_marteauEpieuD;

                dEffets = wpnE["mE"];
                dEffetsValue = wpnEValue["mE"];
                AA = wpnAA["mE"] || [];
                AAValue = wpnAAValue["mE"] || [];
                special = wpnS["mE"];
                specialValue = wpnSValue["mE"];

                C1 = PJData["mEcaracteristique1Equipement"] || "0";
                C2 = PJData["mEcaracteristique2Equipement"] || "0";
                C3 = PJData["mEcaracteristique3Equipement"] || "0";
                C4 = PJData["mEcaracteristique4Equipement"] || "0";
                vPilonnage = PJData["mEpilonnage"] || "0";

                baseDegats = 3;
                baseViolence = 3;

                diceDegats = 3;
                bDegats.push(12);

                diceViolence = 3;
                bViolence.push(12);
                break;

            case "repeating_armeDist:armedistance":
            case "repeating_armeDistVehicule:armedistance":
                let id = info.triggerName.split("_")[2];
                
                data = wpnData[id] || [];
                dEffets = wpnE[id] || [];
                dEffetsValue = wpnEValue[id] || [];
                AA = wpnAA[id] || [];
                AAValue = wpnAAValue[id] || [];
                special = wpnS[id] || [];          
                specialValue = wpnSValue[id] || []; 

                C1 = data["caracteristique1Equipement"] || "0";
                C2 = data["caracteristique2Equipement"] || "0";
                C3 = data["caracteristique3Equipement"] || "0";
                C4 = data["caracteristique4Equipement"] || "0";
                vPilonnage = PJData["pilonnage"] || "0";

                name = data["ArmeDist"] || "";
                portee = data["armeDistPortee"] || "^{portee-contact}";

                let dName = `{{special1=${dName}}}`;
                let dPortee = `{{portee=^{portee} ${dPortee}}}`;

                baseDegats = Number(data["armeDistDegat"]) || 0;
                baseViolence = Number(data["armeDistBDegat"]) || 0;

                diceDegats = Number(data["armeDistDegat"]) || 0;
                bDegats.push(Number(data["armeDistBDegat"]) || 0);

                diceViolence = Number(data["armeDistViolence"]) || 0;
                bViolence.push(Number(data["armeDistBViolence"]) || 0);

                exec.push(dPortee);
                exec.push(dName);
                break;
        }

        if(armure == "sans" || armure == "guardian")
            hasArmure = false;

        let isConditionnelA = false;
        let isConditionnelD = false;
        let isConditionnelV = false;

        let cBase = [];
        let cBonus = [];
        let cRoll = [];
        let bonus = [];

        let OD = 0;
        
        let mod = PJData["jetModifDes"];
        let hasBonus = PJData["bonusCarac"];

        let degats = [];
        let violence = [];
        
        let C1Nom = "";
        let C2Nom = "";
        let C3Nom = "";
        let C4Nom = "";

        let ODBarbarian = [];
        let ODMALBarbarian = [];
        let ODShaman = [];
        let ODMALShaman = [];
        let ODWarrior = [];
        let ODMALWarrior = [];

        let vForce = CaracValue["force"].value;
        let oForce = CaracValue["force"].VraiOD;
        let vDiscretion = CaracValue["discretion"].value;
        let oDiscretion = CaracValue["discretion"].VraiOD;
        let vDexterite = CaracValue["dexterite"].value;
        let oDexterite = CaracValue["dexterite"].VraiOD;
        let vTir = CaracValue["tir"].value;
        let oTir = CaracValue["tir"].VraiOD;
        let vCombat = CaracValue["combat"].value;
        let oCombat = CaracValue["combat"].VraiOD;

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let eASAssassin = "";
        let eASAssassinValue = 0; 

        let isAssistantAttaque = false;
        let isAntiAnatheme = false;
        let isCadence = false;
        let sCadence = 0;
        let vCadence = 0;
        let isChoc = false;
        let isDeuxMains = false;
        let isDestructeur = false;
        let vDestructeur = 0;
        let isLeste = false;     
        let isLourd = false;
        let isMeurtrier = false;
        let vMeurtrier = 0;
        let nowSilencieux = false;  
        let isObliteration = false;   
        let isOrfevrerie = false;  
        let isTenebricide = false;
        let isTirRafale = false;
        let isChambreDouble = false;

        let lumiere = "";
        let isELumiere = false
        let lumiereValue = 0;

        let isEAkimbo = false;
        let isEAmbidextrie = false;

        let pasEnergie = false;
        let sEnergieText = "";
        let energie = PJData["energiePJ"];
        let espoir = PJData["espoir"];

        let autresEffets = [];
        let autresAmeliorationsA = [];
        let autresSpecial = [];

        if(hasArmure)
            exec.push("{{OD=true}}");

        if(C1 != "0") {
            C1Nom = C1.slice(2, -1);

            let C1Value = Number(CaracValue[C1Nom].value);
            let C1OD = Number(CaracValue[C1Nom].OD);

            cBase.push(CaracNom[C1Nom]);
            cRoll.push(C1Value);

            if(hasArmure)
                OD += C1OD;
        };

        if(C2 != "0") {
            C2Nom = C2.slice(2, -1);

            let C2Value = Number(CaracValue[C2Nom].value);
            let C2OD = Number(CaracValue[C2Nom].OD);

            cBase.push(CaracNom[C2Nom]);
            cRoll.push(C2Value);

            if(hasArmure)
                OD += C2OD;
        }

        if(hasBonus == 1 || hasBonus == 2) {
            if(C3 != "0") {
                C3Nom = C3.slice(2, -1);

                let C3Value = Number(CaracValue[C3Nom].value);
                let C3OD = Number(CaracValue[C3Nom].OD);

                cBonus.push(CaracNom[C3Nom]);
                cRoll.push(C3Value);

                if(hasArmure)
                    OD += C3OD;
            }

            if(hasBonus == 2) {
                if(C4 != "0") {
                    C4Nom = C4.slice(2, -1);

                    let C4Value = Number(CaracValue[C4Nom].value);
                    let C4OD = Number(CaracValue[C4Nom].OD);

                    cBonus.push(CaracNom[C4Nom]);
                    cRoll.push(C4Value);
    
                    if(hasArmure)
                        OD += C4OD;
                }
            }
        }

        if(OD.length == 0)
            exec.push("{{vOD=0}}");
        else
            exec.push("{{vOD="+OD+"}}");

        if(mod != 0) {
            cRoll.push(mod);
            exec.push("{{mod="+mod+"}}");
        }

        //GESTION DES BONUS DES OD
        if(oDiscretion >= 2 && hasArmure) {
            let bODDiscretion = vDiscretion;
            attaquesSurprises.push(i18n_odDiscretion);

            if(oDiscretion >= 5)
                bODDiscretion += vDiscretion+oDiscretion;

            attaquesSurprisesValue.push(bODDiscretion);
            attaquesSurprisesCondition = `{{attaqueSurpriseCondition=`+i18n_attaqueSurpriseCondition+`}}`;
        }
        //FIN DE GESTION DES BONUS DES OD

        //GESTION DES EFFETS

        var effets = getWeaponsEffects(dEffets, dEffetsValue, hasArmure, armure, vForce, vDexterite, oDexterite, vDiscretion, oDiscretion, vTir, oTir);

        bDegats = bDegats.concat(effets.bDegats);
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

        isDeuxMains = effets.isDeuxMains;
        isLourd = effets.isLourd;

        isLeste = effets.isLeste;

        isMeurtrier = effets.isMeurtrier;
        vMeurtrier = effets.vMeurtrier;

        nowSilencieux = effets.nowSilencieux;

        isOrfevrerie = effets.isOrfevrerie;

        isTenebricide = effets.isTenebricide;

        isObliteration = effets.isObliteration;
        isTirRafale = effets.isTirRafale;

        lumiere = effets.eLumiere;
        isELumiere = effets.isELumiere;
        lumiereValue = Number(effets.eLumiereValue);

        isEAkimbo = effets.isAkimbo;
        isEAmbidextrie = effets.isAmbidextrie;

        if(effets.isConditionnelA)
            isConditionnelA = true;

        if(effets.isConditionnelD)
            isConditionnelD = true;

        if(effets.isConditionnelV)
            isConditionnelV = true;

        //FIN GESTION DES EFFETS

        //GESTION DES AMELIORATIONS D'ARMES

        var ameliorationsA = getWeaponsDistanceAA(AA, AAValue, vDiscretion, oDiscretion, isAssistantAttaque, eASAssassinValue, isCadence, vCadence, nowSilencieux, isTirRafale, isObliteration, isAntiAnatheme);
        
        exec = exec.concat(ameliorationsA.exec);

        bonus = bonus.concat(ameliorationsA.bonus);

        baseDegats += ameliorationsA.diceDegats;
        baseViolence += ameliorationsA.diceViolence;

        diceDegats += ameliorationsA.diceDegats;
        diceViolence += ameliorationsA.diceViolence;

        bDegats = bDegats.concat(ameliorationsA.bDegats);

        attaquesSurprises = attaquesSurprises.concat(ameliorationsA.attaquesSurprises);
        attaquesSurprisesValue = attaquesSurprisesValue.concat(ameliorationsA.attaquesSurprisesValue);

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = ameliorationsA.attaquesSurprisesCondition;

        if(ameliorationsA.isChambreDouble) {
            isCadence = false;
            isChambreDouble = ameliorationsA.isChambreDouble;
            sCadence = ameliorationsA.rChambreDouble;
        }

        if(ameliorationsA.isJAkimbo)
            isEAkimbo = ameliorationsA.isJAkimbo;
        
        if(ameliorationsA.isJAmbidextre)  
            isEAmbidextrie = ameliorationsA.isJAmbidextre;

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

        //GESTION DU STYLE

        let getStyle = getStyleDistanceMod(PJData, baseDegats, baseViolence, vPilonnage, hasArmure, oTir, isEAkimbo, isEAmbidextrie, isDeuxMains, isLourd);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        diceDegats += getStyle.diceDegats;
        diceViolence += getStyle.diceViolence;

        //FIN GESTION DU STYLE

        //GESTION DES BONUS SPECIAUX

        let sBonusDegats = special["BDDiversTotal"];
        let sBonusDegatsD6 = specialValue["BDDiversD6"];
        let sBonusDegatsFixe = specialValue["BDDiversFixe"];

        let sBonusViolence = special["BVDiversTotal"];
        let sBonusViolenceD6 = specialValue["BVDiversD6"];
        let sBonusViolenceFixe = specialValue["BVDiversFixe"];

        let sEnergie = special["energie"];
        let sEnergieValue = specialValue["energieValue"];

        if(sBonusDegats) {
            exec.push("{{vMSpecialD=+"+sBonusDegatsD6+"D6+"+sBonusDegatsFixe+"}}");
            diceDegats += Number(sBonusDegatsD6);
            bDegats.push(sBonusDegatsFixe);
        }

        if(sBonusViolence) {
            exec.push("{{vMSpecialV=+"+sBonusViolenceD6+"D6+"+sBonusViolenceFixe+"}}");
            diceViolence += Number(sBonusViolenceD6);
            bViolence.push(sBonusViolenceFixe);
        }

        if(sEnergie) {
            if(armure == "berserk") {
                let sEspoirValue = Math.floor((Number(sEnergieValue)/2)-1);

                if(sEspoirValue < 1)
                    sEspoirValue = 1;

                autresSpecial.push(i18n_espoirRetire+" ("+sEspoirValue+")");

                var newEnergie = Number(espoir)-Number(sEspoirValue);

                if(newEnergie == 0) {
                    sEnergieText = i18n_plusEspoir;
    
                } else if(newEnergie < 0) {
    
                    newEnergie = 0;
                    sEnergieText = i18n_pasEspoir;
                    pasEnergie = true;
                }
            } else {
                autresSpecial.push(i18n_energieRetiree+" ("+sEnergieValue+")");

                var newEnergie = Number(energie)-Number(sEnergieValue);
    
                if(newEnergie == 0) {
                    sEnergieText = i18n_plusEnergie;
    
                } else if(newEnergie < 0) {
    
                    newEnergie = 0;
                    sEnergieText = i18n_pasEnergie;
                    pasEnergie = true;
                }
            }
            
            exec.push("{{energieR="+newEnergie+"}}");
        }

        //FIN DE GESTION DES BONUS SPECIAUX

        //GESTION DES BONUS D'ARMURE

        let armorBonus = getArmorBonus(PJData, armure, isELumiere, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

        exec = exec.concat(armorBonus.exec);
        cRoll = cRoll.concat(armorBonus.cRoll);

        if(isConditionnelA == false)
            isConditionnelA = armorBonus.isConditionnelA;

        if(isConditionnelD == false)
            isConditionnelD = armorBonus.isConditionnelD;

        attaquesSurprises = armorBonus.attaquesSurprises.concat(attaquesSurprises);
        attaquesSurprisesValue = armorBonus.attaquesSurprisesValue.concat(attaquesSurprisesValue);

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = armorBonus.attaquesSurprisesCondition.concat(attaquesSurprisesCondition);

        diceDegats += Number(armorBonus.diceDegats);
        diceViolence += Number(armorBonus.diceViolence);

        ODBarbarian = ODBarbarian.concat(armorBonus.ODBarbarian);
        ODShaman = ODBarbarian.concat(armorBonus.ODShaman);
        ODWarrior = ODBarbarian.concat(armorBonus.ODWarrior);


        let MALBonus = getMALBonus(PJData, armureL, isELumiere, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

        exec = exec.concat(MALBonus.exec);
        cRoll = cRoll.concat(MALBonus.cRoll);

        if(isConditionnelA == false)
            isConditionnelA = MALBonus.isConditionnelA;

        if(isConditionnelD == false)
            isConditionnelD = MALBonus.isConditionnelD;

        attaquesSurprises = MALBonus.attaquesSurprises.concat(attaquesSurprises);
        attaquesSurprisesValue = MALBonus.attaquesSurprisesValue.concat(attaquesSurprisesValue);

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = MALBonus.attaquesSurprisesCondition.concat(attaquesSurprisesCondition);

        diceDegats += Number(MALBonus.diceDegats);
        diceViolence += Number(MALBonus.diceViolence);

        ODMALBarbarian = ODMALBarbarian.concat(MALBonus.ODMALBarbarian);
        ODMALShaman = ODBarbarian.concat(MALBonus.ODMALShaman);
        ODMALWarrior = ODBarbarian.concat(MALBonus.ODMALWarrior);

        //FIN GESTION DES BONUS D'ARMURE

        if(cRoll.length == 0)
            cRoll.push(0);

        if(bonus.length == 0)
            bonus.push(0);

        bonus = bonus.concat(OD);
        bonus = bonus.concat(ODBarbarian);
        bonus = bonus.concat(ODMALBarbarian);
        bonus = bonus.concat(ODShaman);
        bonus = bonus.concat(ODMALShaman);
        bonus = bonus.concat(ODWarrior);
        bonus = bonus.concat(ODMALWarrior);

        degats.push(`${diceDegats}D6`);
        degats = degats.concat(bDegats);

        violence.push(`${diceViolence}D6`);
        violence = violence.concat(bViolence);

        if(cBase.length != 0)
            exec.push("{{cBase="+cBase.join(" - ")+"}}");

        if(cBonus.length != 0)
            exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+"-"+sCadence+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

        firstExec.push(jet);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        exec.push("{{degats=[["+degats.join("+")+"]]}}");
        exec.push("{{violence=[["+violence.join("+")+"]]}}");

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
            
            degatsFObliteration = _.reduce(bDegats, function(n1, n2){return Number(n1) + Number(n2);});

            let vObliteration = diceDegatsObliteration+degatsFObliteration;
            
            exec.push("{{obliterationValue="+vObliteration+"}}");

            if(isMeurtrier)
                exec.push("{{obliterationMeurtrierValue="+vMeurtrier*6+"}}");

            if(isDestructeur)
                exec.push("{{obliterationDestructeurValue="+vDestructeur*6+"}}");

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

        if(isELumiere)
            autresEffets.push(i18n_lumiere+" "+lumiereValue);

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

        console.log(exec);

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
                    if(armure == "berserk") {
                        setAttrs({
                            espoir: newEnergie
                        });
                    } else {
                        setAttrs({
                            energiePJ: newEnergie
                        });
                    }

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
            if(button == "repeating_armeCaC:armecontact") {
                startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+name+"}} {{text="+sEnergieText+"}}", (text) => {
                    finishRoll(
                        text.rollId,{}
                    );
                });
            } else {
                startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+name+"}} {{text="+sEnergieText+"}}", (text) => {
                    finishRoll(
                        text.rollId,{}
                    );
                });
            }
            
        }
        
    });
});
