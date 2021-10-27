
on(`clicked:distanceRangerLongbow`, async function(info) {
    let roll = info.htmlAttributes.value;
    let hasArmure = true;

    let attributs = [
        "pilonnageRanger",
        "energiePJ",
        "caracteristique1",
        "caracteristique2",
        "caracteristique3",
        "caracteristique4",
        "discretion",
        ODValue["discretion"],
        ODValue["tir"],
    ];

    let arme = [
        "rangerArmeDegat",
        "rangerArmeDegatEvol",
        "rangerArmeViolence",
        "rangerArmeViolenceEvol",
        "rangerArmePortee"
    ]

    let evolutions = [
        "ranger50PG3",
        "ranger50PG2",
        "ranger100PG",
    ]

    let effets = [
        "rangerChoc",
        "rangerChocValue",
        "rangerDegatContinue",
        "rangerDegatContinueValue",
        "rangerDesignation",
        "rangerSilencieux",
        "rangerPerceArmure",
        "rangerPerceArmureValue",
        "rangerUltraViolence",
        "rangerAntiVehicule",
        "rangerArtillerie",
        "rangerDispersion",
        "rangerDispersionValue",
        "rangerLumiere",
        "rangerLumiereValue",
        "rangerPenetrant",
        "rangerPenetrantValue",
        "rangerPerceArmure60",
        "rangerPerceArmure60Value",
        "rangerAntiAnatheme",
        "rangerDemoralisant",
        "rangerEnChaine",
        "rangerFureur",
        "rangerIgnoreArmure",
        "rangerPenetrant10",
        "rangerPenetrant10Value"
    ]

    let ameliorations = [
        "chargeurGrappesRanger",
        "canonLongRanger",
        "canonRaccourciRanger",
        "chambreDoubleRanger",
        "interfaceGuidageRanger",
        "lunetteIntelligenteRanger",
        "chargeurExplosivesRanger",
        "munitionsDroneRanger",
        "munitionsIEMRanger",
        "munitionsNonLetalesRanger",
        "munitionsSubsoniquesRanger",
        "pointeurLaserRanger",
        "protectionArmeRanger",
        "revetementOmegaRanger",
        "structureElementRanger"
    ]

    let special = [
        "bDDiversTotalRanger",
        "bDDiversD6",
        "bDDiversFixe",
        "bVDiversTotalRanger",
        "bVDiversD6",
        "bVDiversFixe"
    ]

    attributs = attributs.concat(arme, evolutions, effets, ameliorations, special, listBase, listArmureLegende, listStyle);

    let attrs = await getAttrsAsync(attributs);

    let armureL = attrs["armureLegende"];

    let exec = [];

    let isConditionnelA = false;
    let isConditionnelD = true;
    let isConditionnelV = true;

    let PG50_3 = attrs["ranger50PG3"];
    let PG50_2 = attrs["ranger50PG2"];
    let PG100 = attrs["ranger100PG"];

    let diceDegats = 0;
    let degats = [];
    let bonusDegats = [];

    let diceViolence = 0;
    let violence = [];
    let bonusViolence = [];

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";

    let portee = attrs["rangerArmePortee"];
    let autresEffets = [];
    let autresAmeliorations = [];
    let autresSpecial = [];

    let energie = attrs["energiePJ"];
    let energieDepense = 0;

    if(PG50_2 == "on") {
        diceDegats = Number(attrs["rangerArmeDegatEvol"].split("D")[0]);
        diceViolence = Number(attrs["rangerArmeViolenceEvol"].split("D")[0]);

        energieDepense += (diceDegats-5);
        energieDepense += (diceViolence-3);
    } else {
        diceDegats = Number(attrs["rangerArmeDegat"].split("D")[0]);
        diceViolence = Number(attrs["rangerArmeViolence"].split("D")[0]);

        energieDepense += (diceDegats-3);
        energieDepense += (diceViolence-1);
    }

    switch(portee) {
        case "^{portee-longue}":
            energieDepense += 1;
            break;

        case "^{portee-lointaine}":
            energieDepense += 2;
            break;
    }
    
    let mod = +attrs["jetModifDes"];
    let hasBonus = +attrs["bonusCarac"];

    let C1 = attrs["caracteristique1"];
    let C2 = attrs["caracteristique2"];
    let C3 = attrs["caracteristique3"];
    let C4 = attrs["caracteristique4"];

    let attrsCarac = await getCarac(hasBonus, C1, C2, C3, C4);

    let C1Nom = "";
    let C2Nom = "";
    let C3Nom = "";
    let C4Nom = "";

    let vDiscretion = attrs["discretion"];
    let oDiscretion = attrs[ODValue["discretion"]];
    let oTir = attrs[ODValue["tir"]];
    
    let E1 = 2;
    let E2 = 3;
    let E3 = 6;

    let cRoll = [];
    let cBase = [];
    let cBonus = [];

    let bonus = [];
    let OD = 0;

    let ODMALWarrior = [];
    let ODMALShaman = [];
    let ODMALBarbarian = [];

    let isELumiere = false;

    exec.push(roll);

    if(PG100 == "on") {
        E1 = 1;
        E2 = 1;
        E3 = 4;
    }

    if(hasArmure)
        exec.push("{{OD=true}}");

    if(attrsCarac["C1"]) {
        C1Nom = attrsCarac["C1Brut"];

        let C1Value = attrsCarac["C1Base"];
        let C1OD = attrsCarac["C1OD"];

        cBase.push(attrsCarac["C1Nom"]);
        cRoll.push(C1Value);

        if(hasArmure)
            OD += C1OD;
    }

    if(attrsCarac["C2"]) {
        C2Nom = attrsCarac["C2Brut"];

        let C2Value = attrsCarac["C2Base"];
        let C2OD = attrsCarac["C2OD"];

        cBase.push(attrsCarac["C2Nom"]);
        cRoll.push(C2Value);

        if(hasArmure)
            OD += C2OD;
    }

    if(attrsCarac["C3"]) {
        C3Nom = attrsCarac["C3Brut"];

        let C3Value = attrsCarac["C3Base"];
        let C3OD = attrsCarac["C3OD"];

        cBonus.push(attrsCarac["C3Nom"]);
        cRoll.push(C3Value);

        if(hasArmure)
            OD += C3OD;
    }

    if(attrsCarac["C4"]) {
        C4Nom = attrsCarac["C4Brut"];

        let C4Value = attrsCarac["C4Base"];
        let C4OD = attrsCarac["C4OD"];

        cBonus.push(attrsCarac["C4Nom"]);
        cRoll.push(C4Value);

        if(hasArmure)
            OD += C4OD;
    }

    exec.push("{{vOD="+OD+"}}");

    //GESTION DES BONUS DES OD
    if(oDiscretion >= 2) {
        let bODDiscretion = vDiscretion;
        attaquesSurprises.push(i18n_odDiscretion);

        if(oDiscretion >= 5)
            bODDiscretion += vDiscretion+oDiscretion;

        attaquesSurprisesValue.push(bODDiscretion);
    }
    //FIN DE GESTION DES BONUS DES OD            

    //GESTION DES EFFETS
    
    let eChoc = attrs["rangerChoc"];
    let eChocV = attrs["rangerChocValue"];
    let eDegatsContinus = attrs["rangerDegatContinue"];
    let eDegatsContinusV = attrs["rangerDegatContinueValue"];
    let eDesignation = attrs["rangerDesignation"];
    let eSilencieux = attrs["rangerSilencieux"];
    let ePerceArmure = attrs["rangerPerceArmure"];
    let ePerceArmureV = attrs["rangerPerceArmureValue"];
    let eUltraviolence = attrs["rangerUltraViolence"];
    let eAntiVehicule = attrs["rangerAntiVehicule"];
    let eArtillerie = attrs["rangerArtillerie"];
    let eDispersion = attrs["rangerDispersion"];
    let eDispersionV = attrs["rangerDispersionValue"];
    let eLumiere = attrs["rangerLumiere"];
    let eLumiereV = attrs["rangerLumiereValue"];
    let ePenetrant = attrs["rangerPenetrant"];
    let ePenetrantV = attrs["rangerPenetrantValue"];
    let ePerceArmure60 = attrs["rangerPerceArmure60"];
    let ePerceArmure60V = attrs["rangerPerceArmure60Value"];
    let eAntiAnatheme = attrs["rangerAntiAnatheme"];
    let eDemoralisant = attrs["rangerDemoralisant"];
    let eEnChaine = attrs["rangerEnChaine"];
    let eFureur = attrs["rangerFureur"];        
    let eIgnoreArmure = attrs["rangerIgnoreArmure"];
    let ePenetrant10 = attrs["rangerPenetrant10"];
    let ePenetrant10V = attrs["rangerPenetrant10Value"];
    
    exec.push("{{assistanceAttaque="+i18n_assistanceAttaque+"}}");
    exec.push("{{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");

    if(eChoc != "0") {
        isConditionnelA = true;
        exec.push("{{choc="+i18n_choc+" "+eChocV+"}}");
        exec.push("{{chocCondition="+i18n_chocCondition+"}}");

        energieDepense += E1;
    }
    
    if(eSilencieux != "0") {
        let totalSilencieux = vDiscretion+oDiscretion;

        attaquesSurprises.push(i18n_silencieux);
        attaquesSurprisesValue.push(totalSilencieux);
        attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";

        energieDepense += E1;
    }
    
    if(eUltraviolence != "0") {
        exec.push("{{ultraviolence="+i18n_ultraviolence+"}}");
        exec.push("{{ultraviolenceValue=[[2D6]]}}");
        exec.push("{{ultraviolenceCondition="+i18n_ultraviolenceCondition+"}}");

        energieDepense += E1;
    }
    
    if(eArtillerie != "0") {
        isConditionnelA = true;
        exec.push("{{artillerie="+i18n_artillerie+"}}");
        exec.push("{{artillerieCondition="+i18n_artillerieCondition+"}}");

        energieDepense += E2;
    }
    
    if(eAntiAnatheme != "0") {
        isConditionnelD = true;
        isConditionnelV = true;
        exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}}");
        exec.push("{{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

        energieDepense += E3;
    }
    
    if(eDemoralisant != "0") {
        isConditionnelA = true;
        exec.push("{{demoralisant="+i18n_demoralisant+"}}");
        exec.push("{{demoralisantCondition="+i18n_demoralisantCondition+"}}");

        energieDepense += E3;
    }
    
    if(eEnChaine != "0") {
        isConditionnelD = true;
        exec.push("{{enChaine="+i18n_enChaine+"}}");
        exec.push("{{enChaineCondition="+i18n_enChaineCondition+"}}");

        energieDepense += E3;
    }
    
    if(eFureur != "0") {
        isConditionnelV = true;
        exec.push("{{fureur="+i18n_fureur+"}}");
        exec.push("{{fureurValue=[[4D6]]}}");
        exec.push("{{fureurCondition="+i18n_fureurCondition+"}}");

        energieDepense += E3;
    }

    if(eAntiVehicule != "0") {
        autresEffets.push(i18n_antiVehicule);

        energieDepense += E2;
    }
    
    if(eDegatsContinus != "0") {
        autresEffets.push(i18n_degatsContinus+" "+eDegatsContinusV+" ([[1d6]] "+i18n_tours+")");

        energieDepense += E1;
    }            
        
    autresEffets.push(i18n_deuxMains);
    
    if(eDesignation != "0") {
        autresEffets.push(i18n_designation);

        energieDepense += E1;
    }            

    if(eDispersion != "0") {
        autresEffets.push(i18n_dispersion+" "+eDispersionV);

        energieDepense += E2;
    }            

    if(PG50_3 != "1") 
        autresEffets.push(i18n_lourd);

    if(eLumiere != "0") {
        autresEffets.push(i18n_lumiere+" "+eLumiereV);
        isELumiere = true;

        energieDepense += E2;
    }

    if(ePenetrant != "0") {
        autresEffets.push(i18n_penetrant+" "+ePenetrantV);

        energieDepense += E2;
    }
    
    if(ePerceArmure != "0") {
        autresEffets.push(i18n_perceArmure+" "+ePerceArmureV);

        energieDepense += E1;
    }

    if(ePerceArmure60 != "0") {
        autresEffets.push(i18n_perceArmure+" "+ePerceArmure60V);

        energieDepense += E2;
    }            

    if(eIgnoreArmure != "0") {
        autresEffets.push(i18n_ignoreArmure);

        energieDepense += E3;
    }
        
    if(ePenetrant10 != "0") {
        autresEffets.push(i18n_penetrant+" "+ePenetrant10V);

        energieDepense += E3;
    }
        

    //FIN GESTION DES EFFETS

    //GESTION DES AMELIORATIONS
    let rChambreDouble = 0;

    let aGrappe = attrs["chargeurGrappesRanger"];
    let aCLong = attrs["canonLongRanger"];
    let aCRaccourci = attrs["canonRaccourciRanger"];
    let aChambreDouble = attrs["chambreDoubleRanger"];
    let aIGuidage = attrs["interfaceGuidageRanger"];
    let aLIntelligente = attrs["lunetteIntelligenteRanger"];
    let aExplosive = attrs["chargeurExplosivesRanger"];
    let aMDrone = attrs["munitionsDroneRanger"];
    let aMIEM = attrs["munitionsIEMRanger"];
    let aMNLetales = attrs["munitionsNonLetalesRanger"];
    let aMSubsoniques = attrs["munitionsSubsoniquesRanger"];
    let aPLaser = attrs["pointeurLaserRanger"];
    let aPArme = attrs["protectionArmeRanger"];
    let aROmega = attrs["revetementOmegaRanger"];
    let aSElement = attrs["structureElementRanger"];

    if(aGrappe != "0") {
        exec.push("{{vMGrappeD=-1D6}}");
        exec.push("{{vMGrappeV=+1D6}}");
        diceDegats -= 1;
        bonusViolence.push("1D6");
    }

    if(aCLong != "0") {
        isConditionnelA = true;
        exec.push("{{canonLong="+i18n_canonLong+"}}");
        exec.push("{{canonLongCondition="+i18n_canonLongCondition+"}}");
    }

    if(aCRaccourci != "0") {
        isConditionnelA = true;
        exec.push("{{canonRaccourci="+i18n_canonRaccourci+"}}");
        exec.push("{{canonRaccourciCondition="+i18n_canonRaccourciCondition+"}}");
    }

    if(aChambreDouble != "0") { 
        rChambreDouble = "?{Plusieurs cibles ?|Oui, 3|Non, 0}"
    }

    if(aLIntelligente != "0") {
        isConditionnelA = true;
        exec.push("{{lunetteIntelligente="+i18n_lunetteIntelligente+"}}");
        exec.push("{{lunetteIntelligenteCondition="+i18n_lunetteIntelligenteCondition+"}}");
    }
    
    if(aExplosive != "0") {
        exec.push("{{vMExplosiveD=+1D6}}");
        exec.push("{{vMExplosiveV=-1D6}}");
        bonusDegats.push("1D6");
        diceViolence -= 1;
    }
    
    if(aMDrone != "0") {
        exec.push("{{vMDrone=+3}}");
        bonus.push(3);
    }
    
    if(aMIEM != "0") {
        exec.push("{{vMIEMD=-1D6}}");
        exec.push("{{vMIEMV=-1D6}}");
        diceDegats -= 1;
        diceViolence -= 1;
        autresAmeliorations.push(i18n_munitionsIEMParasitage);
    }
    
    if(aMSubsoniques != "0") {

        if(eSilencieux != "0")
            autresAmeliorations.push(i18n_munitionsSubsoniques);
        else if(eSilencieux == "0") {
            let totalSubsonique = vDiscretion+oDiscretion;

            attaquesSurprises.push(i18n_munitionsSubsoniques);
            attaquesSurprisesValue.push(totalSubsonique);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
        }
    }
    
    if(aPLaser != "0") {
        exec.push("{{vMPLaser=+1}}");
        bonus.push(1);
    }

    if(aROmega != "0") {
        attaquesSurprises.push(i18n_revetementOmega);
        attaquesSurprisesValue.push("2D6");

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
    }
    
    if(aIGuidage != "0") 
        autresAmeliorations.push(i18n_interfaceGuidage);
    
    if(aMNLetales != "0") 
        autresAmeliorations.push(i18n_munitionsNonLetales);

    if(aPArme != "0") 
        autresAmeliorations.push(i18n_protectionArme);

    if(aSElement != "0") 
        autresAmeliorations.push(i18n_structureElementAlpha);
    

    //FIN DE LA GESTION DES AMELIORATIONS

    //GESTION DES BONUS SPECIAUX
    let sBonusDegats = attrs["bDDiversTotalRanger"];
    let sBonusDegatsD6 = attrs["bDDiversD6"];
    let sBonusDegatsFixe = attrs["bDDiversFixe"];

    let sBonusViolence = attrs["bVDiversTotalRanger"];
    let sBonusViolenceD6 = attrs["bVDiversD6"];
    let sBonusViolenceFixe = attrs["bVDiversFixe"];

    if(sBonusDegats != "0") {
        exec.push("{{vMSpecialD=+"+sBonusDegatsD6+"D6+"+sBonusDegatsFixe+"}}");
        diceDegats += Number(sBonusDegatsD6);
        bonusDegats.push(sBonusDegatsFixe);
    }

    if(sBonusViolence != "0") {
        exec.push("{{vMSpecialV=+"+sBonusViolenceD6+"D6+"+sBonusViolenceFixe+"}}");
        diceViolence += Number(sBonusViolenceD6);
        bonusViolence.push(sBonusViolenceFixe);

    }
    //FIN DE GESTION DES BONUS SPECIAUX

    let MALBonus = getMALBonus(attrs, armureL, isELumiere, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

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
    ODMALShaman = ODMALShaman.concat(MALBonus.ODMALShaman);
    ODMALWarrior = ODMALWarrior.concat(MALBonus.ODMALWarrior);

    exec.push("{{cBase="+cBase.join(" - ")+"}}");

    if(hasBonus > 0)
        exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

    if(mod != 0) {
        cRoll.push(mod);
        exec.push("{{mod="+mod+"}}");
    }

    //GESTION DU STYLE

    let style = attrs["styleCombat"];
    let bName = "";
    let modA = 0;

    switch(style) {
        case "standard": 
            exec.push("{{style="+i18n_style+" "+i18n_standard+"}}");
        break;

        case "couvert":
            bName = "atkCouvert";
            modA = attrs[bName];

            exec.push("{{style="+i18n_style+" "+i18n_couvert+"}}");
            
            if(aIGuidage == 0) {
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
            }
            break;

        case "agressif":
            bName = "atkAgressif";
            modA = attrs[bName];

            exec.push("{{style="+i18n_style+" "+i18n_agressif+"}}");
            exec.push("{{vMStyleA="+modA+"D}}");
            cRoll.push(Number(modA));
            break;

        case "akimbo":
            bName = "atkAkimbo";
            modA = attrs[bName];

            exec.push("{{style="+i18n_style+" "+i18n_akimbo+"}}");

            if(oTir >= 3) {

                exec.push("{{vMStyleA=-1D}}");
                cRoll.push(-1);
                
            } else {

                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
            }
            break;

        case "ambidextre":
            bName = "atkAmbidextre";
            modA = attrs[bName];

            exec.push("{{style="+i18n_style+" "+i18n_ambidextre+"}}");

            if(oTir >= 3) {

                exec.push("{{vMStyleA=-1D}}");
                cRoll.push(-1);
                
            } else {

                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
                
            }
            break;

        case "defensif":
            bName = "atkDefensif";
            modA = attrs[bName];

            exec.push("{{style="+i18n_style+" "+i18n_defensif+"}}");
            exec.push("{{vMStyleA="+modA+"D}}");
            cRoll.push(Number(modA));
            break;

        case "pilonnage":
            bName = "atkPilonnage";
            modA = attrs[bName];
            let vPilonnage = Number(attrs["pilonnageRanger"])-1;

            exec.push("{{style="+i18n_style+" "+i18n_pilonnage+"}}");
            exec.push("{{vMStyleA="+modA+"D}}");
            cRoll.push(Number(modA));

            exec.push("{{vMStyleD=+"+vPilonnage+"D}}");
            bonusDegats.push(vPilonnage+"D6");
            break;

        case "suppression":
            exec.push("{{style="+i18n_style+" "+i18n_pilonnage+"}}");
            if(PG50_3 != "1") {
                let vSuppressionD = Math.floor(Number(attrs["styleSuppressionD"])/2);
                let vSuppressionV = Math.floor(Number(attrs["styleSuppressionV"])/2);

                if(vSuppressionD > 0) {
                    diceDegats -= vSuppressionD;
                    exec.push("{{vMStyleD=-"+vSuppressionD+"D}}");
                }

                if(vSuppressionV > 0) {
                    diceViolence -= vSuppressionV;
                    exec.push("{{vMStyleV=-"+vSuppressionV+"D}}");
                }
            }            
            break;
    }
    
    //FIN GESTION DU STYLE

    if(cRoll.length == 0)
        cRoll.push(0);

    bonus.push(OD);

    bonus = bonus.concat(ODMALBarbarian);
    bonus = bonus.concat(ODMALShaman);
    bonus = bonus.concat(ODMALWarrior);

    exec.push("{{jet=[[ {{[[{"+cRoll.join("+")+"-"+rChambreDouble+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}");
    exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
    exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

    degats.push(diceDegats+"D6");
    degats = degats.concat(bonusDegats);

    violence.push(diceViolence+"D6");
    violence = violence.concat(bonusViolence);

    exec.push("{{portee="+i18n_portee+" "+portee+"}}");
    exec.push("{{degats=[["+degats.join("+")+"]]}}");
    exec.push("{{violence=[["+violence.join("+")+"]]}}");

    var resultatEnergie = energie-energieDepense;
    let pasEnergie = false;

    if(resultatEnergie < 0)
        pasEnergie = true;

    autresSpecial.push(i18n_energieRetiree+" ("+energieDepense+")");

    if(autresEffets.length > 0)
        exec.push("{{effets="+autresEffets.join(" / ")+"}}");

    if(autresAmeliorations.length > 0)
        exec.push("{{ameliorations="+autresAmeliorations.join(" / ")+"}}");

    if(autresSpecial.length > 0)
        exec.push("{{special="+autresSpecial.join(" / ")+"}}");
    
    if(attaquesSurprises.length > 0) {
        exec.push("{{attaqueSurprise="+attaquesSurprises.join("\n+")+"}}");
        exec.push("{{attaqueSurpriseValue=[["+attaquesSurprisesValue.join("+")+"]]}}");
        exec.push(attaquesSurprisesCondition);
    }

    if(rChambreDouble != 0)
        exec.push("{{vChambreDouble="+rChambreDouble+"}}");

    if(isConditionnelA == true)
        exec.push("{{succesConditionnel=true}}");

    if(isConditionnelD == true)
        exec.push("{{degatsConditionnel=true}}");

    if(isConditionnelV == true)
        exec.push("{{violenceConditionnel=true}}");

    if(!pasEnergie) {
        startRoll(exec.join(" "), (results) => {
            let tJet = results.results.jet.result;
            let tBonus = results.results.bonus.result;
            let tExploit = results.results.Exploit.result;

            let tDegats = results.results.degats.result;
            let tViolence = results.results.violence.result;

            finishRoll(
                results.rollId, 
                {
                    jet:tJet+tBonus,
                    degats:tDegats,
                    violence:tViolence
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
            
            setAttrs({
                energiePJ: resultatEnergie
            });

            if(resultatEnergie == 0) {
                startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=^{ranger-fusil-longbow}}} {{text="+i18n_plusEnergie+"}}", (exploit) => {    
                    finishRoll(
                        exploit.rollId,{}
                    );
                });
            }
        });
    } else {
        startRoll("@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=^{ranger-fusil-longbow}}} {{text="+i18n_pasEnergie+"}}", (exploit) => {    
            finishRoll(
                exploit.rollId,{}
            );
        });
    }
});