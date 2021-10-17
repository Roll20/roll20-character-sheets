const rollCombatContact = ["poingContact", "poingMAContact", "pSContact", "mEContact", "repeating_armeCaC:armecontact"];

rollCombatContact.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value;

        let firstExec = [];
        let exec = [];
        firstExec.push(roll);

        let armure = donneesPJ["Armure"];
        let armureL = donneesPJ["ArmureLegende"];

        var hasArmure = true;
        let hasOptions = true;
        let hasSpecial = true;

        var name = "";
        var portee = "";

        let data = [];
        let dEffets = [];
        let dEffetsValue = [];
        let AS = [];
        let AO = [];
        let special = [];
        let specialValue = [];

        let C1 = "0";
        let C2 = "0";
        let C3 = "0";
        let C4 = "0";
        let CPrecis = "0";

        let baseDegats = 0;
        let baseViolence = 0;

        let diceDegats = 0;
        let diceViolence = 0;

        let bDegats = [];
        let bViolence = [];

        switch(button) {
            case "poingContact":
                name = `{{special1=${i18n_coupPoing}}}`;

                C1 = PJData["poingCcaracteristique1Equipement"] || "0";
                C2 = PJData["poingCcaracteristique2Equipement"] || "0";
                C3 = PJData["poingCcaracteristique3Equipement"] || "0";
                C4 = PJData["poingCcaracteristique4Equipement"] || "0";

                baseDegats = 0;
                baseViolence = 0;

                diceDegats = 0;
                bDegats.push(0);

                diceViolence = 0;
                bViolence.push(1);

                hasOptions = false;
                hasSpecial = false;
                break;
        
            case "poingMAContact":
                name = `{{special1=${i18n_coupPoing}}}`;

                special = wpnS["poingMAC"];
                specialValue = wpnSValue["poingMAC"];

                C1 = PJData["poingMACcaracteristique1Equipement"] || "0";
                C2 = PJData["poingMACcaracteristique2Equipement"] || "0";
                C3 = PJData["poingMACcaracteristique3Equipement"] || "0";
                C4 = PJData["poingMACcaracteristique4Equipement"] || "0";

                baseDegats = 1;
                baseViolence = 0;

                diceDegats = 1;
                bDegats.push(0);

                diceViolence = 0;
                bViolence.push(1);

                hasOptions = false;
                break;
    
            case "pSContact":
                name = `{{special1=${i18n_couteauService}}}`;

                dEffets = wpnE["pSC"];
                dEffetsValue = wpnEValue["pSC"];
                AS = wpnAS["pSC"];
                AO = wpnAO["pSC"];
                special = wpnS["pSC"];
                specialValue = wpnSValue["pSC"];

                C1 = PJData["pSCcaracteristique1Equipement"] || "0";
                C2 = PJData["pSCcaracteristique2Equipement"] || "0";
                C3 = PJData["pSCcaracteristique3Equipement"] || "0";
                C4 = PJData["pSCcaracteristique4Equipement"] || "0";
                CPrecis = PJData["pSCcaracteristiqueSPrecis"] || "0";

                baseDegats = 1;
                baseViolence = 0;

                diceDegats = 1;
                bDegats.push(0);

                diceViolence = 0;
                bViolence.push(1);
                break;
    
            case "mEContact":
                name = `{{special1=${i18n_marteauEpieuC}}}`;

                dEffets = wpnE["mEC"];
                dEffetsValue = wpnEValue["mEC"];
                AS = wpnAS["mEC"];
                AO = wpnAO["mEC"];
                special = wpnS["mEC"];
                specialValue = wpnSValue["mEC"];

                C1 = PJData["mECcaracteristique1Equipement"] || "0";
                C2 = PJData["mECcaracteristique2Equipement"] || "0";
                C3 = PJData["mECcaracteristique3Equipement"] || "0";
                C4 = PJData["mECcaracteristique4Equipement"] || "0";
                CPrecis = PJData["mECcaracteristiqueSPrecis"] || "0";

                baseDegats = 3;
                baseViolence = 1;

                diceDegats = 3;
                bDegats.push(0);

                diceViolence = 1;
                bViolence.push(0);
                break;

            case "repeating_armeCaC:armecontact":
                let id = info.triggerName.split("_")[2];
                
                data = wpnData[id] || [];
                dEffets = wpnE[id] || [];
                dEffetsValue = wpnEValue[id] || [];
                AS = wpnAS[id] || [];
                AO = wpnAO[id] || [];
                special = wpnS[id] || [];          
                specialValue = wpnSValue[id] || []; 

                C1 = data["caracteristique1Equipement"] || "0";
                C2 = data["caracteristique2Equipement"] || "0";
                C3 = data["caracteristique3Equipement"] || "0";
                C4 = data["caracteristique4Equipement"] || "0";
                CPrecis = data["caracteristiqueSPrecis"] || "0";

                let dName = data["ArmeCaC"] || "";
                let dPortee = data["armeCaCPortee"] || "^{portee-contact}";

                name = `{{special1=${dName}}}`;
                portee = `{{portee=^{portee} ${dPortee}}}`;

                baseDegats = Number(data["armeCaCDegat"]) || 0;
                baseViolence = Number(data["armeCaCBDegat"]) || 0;

                diceDegats = Number(data["armeCaCDegat"]) || 0;
                bDegats.push(Number(data["armeCaCBDegat"]) || 0);

                diceViolence = Number(data["armeCaCViolence"]) || 0;
                bViolence.push(Number(data["armeCaCBViolence"]) || 0);

                exec.push(portee);
                exec.push(name);
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
        let isChromee = false;
        let sCadence = 0;
        let vCadence = 0;
        let isChoc = false;
        let isDestructeur = false;
        let vDestructeur = 0;
        let isLeste = false;     
        let isMeurtrier = false;
        let vMeurtrier = 0;
        let nowSilencieux = false;  
        let isObliteration = false;   
        let isOrfevrerie = false;  
        let isTenebricide = false;

        let ASTenebricide = [];

        let isCheneSculpte = false;
        let vCheneSculpte = 0;
        let isArmeAzurine = false;
        let vArmeAzurine = 0;
        let isArmeRougeSang = false;
        let vArmeRougeSang = 0;
        let isGriffureGravee = false;
        let vGriffureGravee = 0;
        let isMasqueBrise = false;
        let vMasqueBrise = 0;
        let isRouagesCasses = false;
        let vRouagesCasses = 0;

        let lumiere = "";
        let isELumiere = false
        let isASLumiere = false
        let lumiereValue = 0;

        let isEAkimbo = false;
        let isEAmbidextrie = false;
        let isELourd = false;
        let isEDeuxMains = false;
        
        let isAAgressive = false;
        let isASoeur = false;
        let isAJumelle = false;
        let isAProtectrice = false;
        let isAAllegee = false;

        let pasEnergie = false;
        let sEnergieText = "";
        let energie = PJData["energiePJ"];
        let espoir = PJData["espoir"];

        let autresEffets = [];
        let autresAmeliorationsS = [];
        let autresAmeliorationsO = [];
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

        //GESTION DES BONUS DE BASE
        let dForce = vForce;

        if(hasArmure)
            dForce += oForce*3;

        bDegats.push(dForce);
        exec.push("{{vForce="+dForce+"}}");

        //FIN GESTION DES BONUS DE BASE

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

        if(hasOptions) {
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

                isCadence = effets.isCadence;
                sCadence = effets.sCadence;
                vCadence = effets.vCadence;

                isChoc = effets.isChoc;

                isDestructeur = effets.isDestructeur;
                vDestructeur = effets.vDestructeur;    

                isEDeuxMains = effets.isDeuxMains;
                isELourd = effets.isLourd;

                isLeste = effets.isLeste;

                isMeurtrier = effets.isMeurtrier;
                vMeurtrier = effets.vMeurtrier;

                nowSilencieux = effets.nowSilencieux;

                isOrfevrerie = effets.isOrfevrerie;

                isTenebricide = effets.isTenebricide;

                isObliteration = effets.isObliteration;

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

                //GESTION DES AMELIORATIONS STRUCTURELLES

                var ameliorationsS = getWeaponsContactAS(AS, hasArmure, nowSilencieux, isMeurtrier, isAssistantAttaque, isChoc, isLeste, isOrfevrerie, vForce, vDexterite, oDexterite, vDiscretion, oDiscretion, vCombat, oCombat);

                autresAmeliorationsS = autresAmeliorationsS.concat(ameliorationsS.autresAmeliorations);

                bonus = bonus.concat(ameliorationsS.bAttaque);
                baseDegats += ameliorationsS.diceDegats;
                diceDegats += ameliorationsS.diceDegats;
                bDegats = bDegats.concat(ameliorationsS.bDegats);

                isAAgressive = ameliorationsS.isAgressive;
                isASoeur = ameliorationsS.isSoeur;
                isAProtectrice = ameliorationsS.isProtectrice;
                isAJumelle = ameliorationsS.isJumelle;
                isAAllegee = ameliorationsS.isAllegee;

                if(lumiereValue >= ameliorationsS.aLumiereValue)
                    autresAmeliorationsS.push(ameliorationsS.aLumiere);
                else if(ameliorationsS.aLumiereValue > 0) {
                    lumiere = ameliorationsS.aLumiere+" ("+i18n_lumiere+" "+ameliorationsS.aLumiereValue+")";
                    lumiereValue = ameliorationsS.aLumiereValue;
                    isASLumiere = true;
                    isELumiere = false;
                }                    

                if(attaquesSurprisesCondition == "" && ameliorationsS.attaquesSurprisesCondition != "")
                    attaquesSurprisesCondition = ameliorationsS.attaquesSurprisesCondition;

                attaquesSurprises = attaquesSurprises.concat(ameliorationsS.attaquesSurprises);
                attaquesSurprisesValue = attaquesSurprisesValue.concat(ameliorationsS.attaquesSurprisesValue);

                if(ameliorationsS.isConditionnelA)
                    isConditionnelA = true;

                if(ameliorationsS.isConditionnelD)
                    isConditionnelD = true;

                if(ameliorationsS.isConditionnelV)
                    isConditionnelV = true;

                //FIN GESTION DES AMELIORATIONS STRUCTURELLES

                //GESTION DES AMELIORATIONS ORNEMENTALES

                var ameliorationsO = getWeaponsContactAO(AO, isCadence, vCadence, isObliteration, isAntiAnatheme);

                if(ameliorationsO.isChromee) {
                    sCadence = ameliorationsO.rCadence;
                    isChromee = ameliorationsO.isChromee;
                    vCadence = ameliorationsO.vCadence;
                }

                if(lumiereValue >= ameliorationsO.aLumiereValue) {
                    lumiereValue += Number(ameliorationsO.aLumiereValue);
                    autresAmeliorationsO.push(ameliorationsO.aLumiere);
                }
                else {
                    lumiere = `${ameliorationsO.aLumiere} (${i18n_lumiere} ${ameliorationsO.aLumiereValue})`;
                    lumiereValue = ameliorationsO.aLumiereValue;
                }

                if(isObliteration == false)
                    isObliteration = ameliorationsO.isObliteration;
                    
                if(ameliorationsO.isConditionnelA)
                    isConditionnelA = true;

                if(ameliorationsO.isConditionnelD)
                    isConditionnelD = true;

                if(ameliorationsO.isConditionnelV)
                    isConditionnelV = true;

                isArmeAzurine = ameliorationsO.isArmeAzurine;
                vArmeAzurine = ameliorationsO.vArmeAzurine;
                isArmeRougeSang = ameliorationsO.isArmeRougeSang;
                vArmeRougeSang = ameliorationsO.vArmeRougeSang;
                isCheneSculpte = ameliorationsO.isCheneSculpte;
                vCheneSculpte = ameliorationsO.vCheneSculpte;
                isGriffureGravee = ameliorationsO.isGriffureGravee;
                vGriffureGravee = ameliorationsO.vGriffureGravee;
                isMasqueBrise = ameliorationsO.isMasqueBrise;
                vMasqueBrise = ameliorationsO.vMasqueBrise;
                isRouagesCasses = ameliorationsO.isRouagesCasses;
                vRouagesCasses = ameliorationsO.vRouagesCasses;

                autresAmeliorationsO = autresAmeliorationsO.concat(ameliorationsO.autresAmeliorations);

                baseDegats += ameliorationsO.diceDegats;
                baseViolence += ameliorationsO.diceViolence;

                diceDegats += ameliorationsO.diceDegats;
                bDegats = bDegats.concat(ameliorationsO.bDegats);
                diceViolence += ameliorationsO.diceViolence;

                //FIN GESTION DES AMELIORATIONS ORNEMENTALES
        }

        //GESTION DU STYLE

        let getStyle = getStyleContactMod(PJData, CPrecis, baseDegats, baseViolence, hasArmure, oCombat, isEAkimbo, isEAmbidextrie, isAAgressive, isAJumelle, isASoeur, isAProtectrice, isEDeuxMains, isAAllegee, isELourd);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        diceDegats += getStyle.diceDegats;
        diceViolence += getStyle.diceViolence;
        autresAmeliorationsS = autresAmeliorationsS.concat(getStyle.autresAmeliorationsS);

        //FIN GESTION DU STYLE

        if(hasSpecial) {
            //GESTION DES BONUS SPECIAUX

            let sBonusDegats = special["BDDiversTotal"];
            let sBonusDegatsD6 = specialValue["BDDiversD6"];
            let sBonusDegatsFixe = specialValue["BDDiversFixe"];

            let sBonusViolence = special["BVDiversTotal"];
            let sBonusViolenceD6 = specialValue["BVDiversD6"];
            let sBonusViolenceFixe = specialValue["BVDiversFixe"];

            var sEnergie = special["energie"];
            var sEnergieValue = specialValue["energieValue"];

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
        }

        

        //GESTION DES BONUS D'ARMURE

        let armorBonus = getArmorBonus(PJData, armure, isELumiere, isASLumiere, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

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


        let MALBonus = getMALBonus(PJData, armureL, isELumiere, isASLumiere, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

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

        if(isCadence) {
            exec.push("{{rCadence="+i18n_cadence+" "+vCadence+" "+i18n_inclus+"}}");
            exec.push("{{vCadence="+sCadence+"D}}");
        }

        if(isChromee) {
            exec.push("{{rCadence="+i18n_chromee+" ("+i18n_cadence+" "+vCadence+") "+i18n_inclus+"}}");
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
        else if(isASLumiere)
            autresAmeliorationsS.push(lumiere);

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

        if(hasOptions) {
            if(effets.exec)
            exec = exec.concat(effets.exec);
        
            if(effets.firstExec)
                firstExec = firstExec.concat(effets.firstExec); 
     
            if(ameliorationsS.exec)
                exec = exec.concat(ameliorationsS.exec);

            if(ameliorationsO.exec)
                exec = exec.concat(ameliorationsO.exec);
            
            if(ameliorationsO.firstExec)
                firstExec = firstExec.concat(ameliorationsO.firstExec);
        }
        
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
                        startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{text="+sEnergieText+"}}"+name, (exploit) => {    
                            finishRoll(
                                exploit.rollId,{}
                            );
                        });
                    }
                }
            });
        } else {
            if(button == "repeating_armeCaC:armecontact") {
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