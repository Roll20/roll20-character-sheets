
on(`clicked:distanceRangerLongbow`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    let attributs = [
        "jetModifDes",
        "bonusCarac",
        "caracteristique1",
        "caracteristique2",
        "caracteristique3",
        "caracteristique4"
    ];

    let arme = [
        "rangerArmeDegat",
        "rangerArmeDegatEvol",
        "rangerArmeViolence",
        "rangerArmeViolenceEvol",
        "rangerArmePortee"
    ]

    let styles = [
        "styleCombat",
        "atkDefensif",
        "atkCouvert",
        "atkAgressif",
        "atkAkimbo",
        "atkAmbidextre",
        "atkPilonnage",
        "pilonnageRanger",
        "styleSuppressionD",
        "styleSuppressionV"
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

    attributs = attributs.concat(arme);
    attributs = attributs.concat(styles);
    attributs = attributs.concat(evolutions);
    attributs = attributs.concat(effets);
    attributs = attributs.concat(ameliorations);
    attributs = attributs.concat(special);

    switch(armureL) {
        case "barbarian":
            attributs.push("MALBarbarianGoliath");
            break;

        case "rogue":
            attributs.push("MALRogueGhost");
            break;

        case "shaman":
            attributs.push("MALShamanNbreTotem");
            attributs.push("MALCaracteristiqueTotem1");
            attributs.push("MALCaracteristiqueTotem2");
            break;
            
        case "warrior":
            attributs.push("MALWarriorSoldierA");
            attributs.push("MALWarriorHunterA");
            attributs.push("MALWarriorScholarA");
            attributs.push("MALWarriorHeraldA");
            attributs.push("MALWarriorScoutA");
            break;
    }

    getAttrs(attributs, function(value)
    {
        let exec = [];

        let isConditionnelA = false;
        let isConditionnelD = true;
        let isConditionnelV = true;

        let PG50_3 = value["ranger50PG3"];
        let PG50_2 = value["ranger50PG2"];
        let PG100 = value["ranger100PG"];

        let diceDegats = 0;
        let degats = [];
        let bonusDegats = [];

        let diceViolence = 0;
        let violence = [];
        let bonusViolence = [];

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let portee = value["rangerArmePortee"];
        let autresEffets = [];
        let autresAmeliorations = [];
        let autresSpecial = [];

        let energie = PJData["energiePJ"];
        let energieDepense = 0;

        if(PG50_2 == "on") {
            diceDegats = Number(value["rangerArmeDegatEvol"].split("D")[0]);
            diceViolence = Number(value["rangerArmeViolenceEvol"].split("D")[0]);

            energieDepense += (diceDegats-5);
            energieDepense += (diceViolence-3);
        } else {
            diceDegats = Number(value["rangerArmeDegat"].split("D")[0]);
            diceViolence = Number(value["rangerArmeViolence"].split("D")[0]);

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
        
        let mod = Number(value["jetModifDes"]);
        let hasBonus = Number(value["bonusCarac"]);

        let C1 = value["caracteristique1"];
        let C2 = value["caracteristique2"];
        let C3 = value["caracteristique3"];
        let C4 = value["caracteristique4"];

        let C1Nom = C1.slice(2, -1);
        let C2Nom = C2.slice(2, -1);
        let C3Nom = C3.slice(2, -1);
        let C4Nom = C4.slice(2, -1);

        let C1Value = CaracValue[C1Nom];
        let C2Value = CaracValue[C2Nom];
        let C3Value = CaracValue[C3Nom];
        let C4Value = CaracValue[C4Nom];

        let vDiscretion = CaracValue["discretion"].value;
        let oDiscretion = CaracValue["discretion"].VraiOD;
        let oTir = CaracValue["tir"].VraiOD;
        
        let E1 = 2;
        let E2 = 3;
        let E3 = 6;

        let cRoll = [];
        let cNom1 = [];
        let cNom2 = [];

        let bonus = [];
        let OD = [];

        let ODMALWarrior = [];
        let ODMALShaman = [];
        let ODMALGhost = [];

        let MALGoliath;
        let MALGhost;
        let MALShaman;
        let MALTypeSoldier;
        let MALTypeHunter;
        let MALTypeHerald;
        let MALTypeScholar;
        let MALTypeScout;

        exec.push(roll);

        if(PG100 == "on") {
            E1 = 1;
            E2 = 1;
            E3 = 4;
        }

        if(hasArmure)
            exec.push("{{OD=true}}");

        if(C1 != "0") {
            cNom1.push(CaracNom[C1Nom]);
            cRoll.push(C1);

            if(hasArmure)
                OD.push(C1Value.OD);
        };

        if(C2 != "0") {
            cNom1.push(CaracNom[C2Nom]);
            cRoll.push(C2);

            if(hasArmure)
                OD.push(C2Value.OD);
        }

        if(hasBonus == 1 || hasBonus == 2) {
            if(C3 != "0") {
                cNom2.push(CaracNom[C3Nom]);
                cRoll.push(C3);

                if(hasArmure)
                    OD.push(C3Value.OD);
            }

            if(hasBonus == 2) {
                if(C4 != "0") {
                    cNom2.push(CaracNom[C4Nom]);
                    cRoll.push(C4);
    
                    if(hasArmure)
                        OD.push(C4Value.OD);
                }
            }
        }

        if(OD.length == 0)
            exec.push("{{vOD=0}}");
        else {
            let sumOD = _.reduce(OD, function(n1, n2){ return n1 + n2; }, 0);
            exec.push("{{vOD="+sumOD+"}}");
        }

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
        
        let eChoc = value["rangerChoc"];
        let eChocV = value["rangerChocValue"];
        let eDegatsContinus = value["rangerDegatContinue"];
        let eDegatsContinusV = value["rangerDegatContinueValue"];
        let eDesignation = value["rangerDesignation"];
        let eSilencieux = value["rangerSilencieux"];
        let ePerceArmure = value["rangerPerceArmure"];
        let ePerceArmureV = value["rangerPerceArmureValue"];
        let eUltraviolence = value["rangerUltraViolence"];
        let eAntiVehicule = value["rangerAntiVehicule"];
        let eArtillerie = value["rangerArtillerie"];
        let eDispersion = value["rangerDispersion"];
        let eDispersionV = value["rangerDispersionValue"];
        let eLumiere = value["rangerLumiere"];
        let eLumiereV = value["rangerLumiereValue"];
        let ePenetrant = value["rangerPenetrant"];
        let ePenetrantV = value["rangerPenetrantValue"];
        let ePerceArmure60 = value["rangerPerceArmure60"];
        let ePerceArmure60V = value["rangerPerceArmure60Value"];
        let eAntiAnatheme = value["rangerAntiAnatheme"];
        let eDemoralisant = value["rangerDemoralisant"];
        let eEnChaine = value["rangerEnChaine"];
        let eFureur = value["rangerFureur"];        
        let eIgnoreArmure = value["rangerIgnoreArmure"];
        let ePenetrant10 = value["rangerPenetrant10"];
        let ePenetrant10V = value["rangerPenetrant10Value"];
        
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

        let aGrappe = value["chargeurGrappesRanger"];
        let aCLong = value["canonLongRanger"];
        let aCRaccourci = value["canonRaccourciRanger"];
        let aChambreDouble = value["chambreDoubleRanger"];
        let aIGuidage = value["interfaceGuidageRanger"];
        let aLIntelligente = value["lunetteIntelligenteRanger"];
        let aExplosive = value["chargeurExplosivesRanger"];
        let aMDrone = value["munitionsDroneRanger"];
        let aMIEM = value["munitionsIEMRanger"];
        let aMNLetales = value["munitionsNonLetalesRanger"];
        let aMSubsoniques = value["munitionsSubsoniquesRanger"];
        let aPLaser = value["pointeurLaserRanger"];
        let aPArme = value["protectionArmeRanger"];
        let aROmega = value["revetementOmegaRanger"];
        let aSElement = value["structureElementRanger"];

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
        let sBonusDegats = value["bDDiversTotalRanger"];
        let sBonusDegatsD6 = value["bDDiversD6"];
        let sBonusDegatsFixe = value["bDDiversFixe"];

        let sBonusViolence = value["bVDiversTotalRanger"];
        let sBonusViolenceD6 = value["bVDiversD6"];
        let sBonusViolenceFixe = value["bVDiversFixe"];

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

        switch(armureL) {
            case "barbarian":
                MALGoliath = Number(value["MALBarbarianGoliath"]);

                if(MALGoliath != 0)
                    exec.push("{{MALGoliath="+MALGoliath+"}}");
                break;
    
            case "rogue":
                MALGhost = value["MALRogueGhost"];

                if(MALGhost != "") {
                    exec.push("{{MALspecial2="+i18n_ghostActive+"}}");

                    if(eSilencieux != "0") {
                        let totalGhost = vDiscretion+oDiscretion;                        

                        isConditionnelA = true;
                        exec.push("{{vODMALGhostA="+i18n_ghost+"}}");
                        exec.push("{{vODMALGhostAValue=[["+vDiscretion+"D6+"+oDiscretion+"]]}}");
                        exec.push("{{vODMALGhostACondition="+i18n_attaqueSurpriseCondition+"}}");
                        
                        isConditionnelD = true;
                        attaquesSurprises.unshift(i18n_ghost);
                        attaquesSurprisesValue.unshift(totalGhost);
                        
                        if(attaquesSurprisesCondition == "")
                            attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
                    }
                }
                break;
    
            case "shaman":
                MALShaman = Number(value["MALShamanNbreTotem"]);
                let C5 = value["MALCaracteristiqueTotem1"];
                let C6 = value["MALCaracteristiqueTotem2"];

                let C5Nom = C5.slice(2, -1);
                let C6Nom = C6.slice(2, -1);

                let C5Value = CaracValue[C5Nom];
                let C6Value = CaracValue[C6Nom];

                if(MALShaman == 1 || MALShaman == 2) {
                    if(C5 != "0") {
                        exec.push("{{MALTotem1="+CaracNom[C5Nom]+"}}");
                        cRoll.push(C5);
                        ODMALShaman.push(C5Value.OD);
                    }
                }

                if(MALShaman == 2) {
                    if(C6 != "0") {
                        exec.push("{{MALTotem2="+CaracNom[C6Nom]+"}}");
                        cRoll.push(C6);
                        ODMALShaman.push(C6Value.OD);
                    }                    
                }   

                if(MALShaman == 1 || MALShaman == 2) {
                    exec.push("{{MALTotem=true}}");

                    if(ODMALShaman.length == 0)
                        exec.push("{{vODMALShaman=0}}");
                    else {
                        let sumSOD = _.reduce(ODMALShaman, function(n1, n2){ return n1 + n2; }, 0);
                        exec.push("{{vODMALShaman="+sumSOD+"}}");
                    }                        
                }

                break;
                
            case "warrior":
                MALTypeSoldier = value["MALWarriorSoldierA"];
                MALTypeHunter = value["MALWarriorHunterA"];
                MALTypeHerald = value["MALWarriorHeraldA"];
                MALTypeScholar = value["MALWarriorScholarA"];
                MALTypeScout = value["MALWarriorScoutA"];

                if(MALTypeSoldier != 0) {
                    exec.push("{{MALspecial2="+i18n_typeSoldier+"}}");

                    if(C1Nom == "deplacement" || C1Nom == "force" || C1Nom == "endurance")
                        ODMALWarrior.push(MALTypeSoldier);
    
                    if(C2Nom == "deplacement" || C2Nom == "force" || C2Nom == "endurance")
                        ODMALWarrior.push(MALTypeSoldier);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "deplacement" || C3Nom == "force" || C3Nom == "endurance")
                            ODMALWarrior.push(MALTypeSoldier);
                        
                        if(hasBonus == 2) {
                            if(C4Nom == "deplacement" || C4Nom == "force" || C4Nom == "endurance")
                                ODMALWarrior.push(MALTypeSoldier);
                        }
                    }
    
                }                    

                if(MALTypeHunter != 0) {
                    exec.push("{{MALspecial2="+i18n_typeHunter+"}}");

                    if(C1Nom == "hargne" || C1Nom == "combat" || C1Nom == "instinct")
                        ODMALWarrior.push(MALTypeHunter);
    
                    if(C2Nom == "hargne" || C2Nom == "combat" || C2Nom == "instinct")
                        ODMALWarrior.push(MALTypeHunter);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "hargne" || C3Nom == "combat" || C3Nom == "instinct")
                            ODMALWarrior.push(MALTypeHunter);
                        
                        if(hasBonus == 2) {
                            if(C4Nom == "hargne" || C4Nom == "combat" || C4Nom == "instinct")
                                ODMALWarrior.push(MALTypeHunter);
                        }
                    }
    
                }

                if(MALTypeHerald != 0) {
                    exec.push("{{MALspecial2="+i18n_typeHerald+"}}");

                    if(C1Nom == "aura" || C1Nom == "parole" || C1Nom == "sf")
                        ODMALWarrior.push(MALTypeHerald);
    
                    if(C2Nom == "aura" || C2Nom == "parole" || C2Nom == "sf")
                        ODMALWarrior.push(MALTypeHerald);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "aura" || C3Nom == "parole" || C3Nom == "sf")
                            ODMALWarrior.push(MALTypeHerald);

                        if(hasBonus == 2) {
                            if(C4Nom == "aura" || C4Nom == "parole" || C4Nom == "sf")
                                ODMALWarrior.push(MALTypeHerald);
                        }
                    }
    
                }

                if(MALTypeScholar != 0) {
                    exec.push("{{MALspecial2="+i18n_typeScholar+"}}");

                    if(C1Nom == "tir" || C1Nom == "savoir" || C1Nom == "technique")
                        ODMALWarrior.push(MALTypeScholar);
    
                    if(C2Nom == "tir" || C2Nom == "savoir" || C2Nom == "technique")
                        ODMALWarrior.push(MALTypeScholar);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "tir" || C3Nom == "savoir" || C3Nom == "technique")
                            ODMALWarrior.push(MALTypeScholar);
                            
                        if(hasBonus == 2) {
                            if(C4Nom == "tir" || C4Nom == "savoir" || C4Nom == "technique")
                                ODMALWarrior.push(MALTypeScholar);
                        }
                    }
    
                }

                if(MALTypeScout != 0) {
                    exec.push("{{MALspecial2="+i18n_typeScout+"}}");

                    if(C1Nom == "discretion" || C1Nom == "dexterite" || C1Nom == "perception")
                        ODMALWarrior.push(MALTypeScout);
    
                    if(C2Nom == "discretion" || C2Nom == "dexterite" || C2Nom == "perception")
                        ODMALWarrior.push(MALTypeScout);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "discretion" || C3Nom == "dexterite" || C3Nom == "perception")
                            ODMALWarrior.push(MALTypeScout);
                        
                        if(hasBonus == 2) {
                            if(C4Nom == "discretion" || C4Nom == "dexterite" || C4Nom == "perception")
                                ODMALWarrior.push(MALTypeScout);
                        }
                    }
    
                }

                if(ODMALWarrior.length != 0)
                    exec.push("{{vODMALWarrior=[["+ODMALWarrior.join("+")+"]]}}");

                break;
        }

        exec.push("{{cBase="+cNom1.join(" - ")+"}}");

        if(hasBonus > 0)
            exec.push("{{cBonus="+cNom2.join(" - ")+"}}");

        if(mod != 0) {
            cRoll.push(mod);
            exec.push("{{mod="+mod+"}}");
        }

        //GESTION DU STYLE

        let style = value["styleCombat"];
        let bName = "";
        let modA = 0;

        switch(style) {
            case "standard": 
                exec.push("{{style="+i18n_style+" "+i18n_standard+"}}");
            break;

            case "couvert":
                bName = "atkCouvert";
                modA = value[bName];

                exec.push("{{style="+i18n_style+" "+i18n_couvert+"}}");
                
                if(aIGuidage == 0) {
                    exec.push("{{vMStyleA="+modA+"D}}");
                    cRoll.push(Number(modA));
                }
                break;

            case "agressif":
                bName = "atkAgressif";
                modA = value[bName];

                exec.push("{{style="+i18n_style+" "+i18n_agressif+"}}");
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
                break;

            case "akimbo":
                bName = "atkAkimbo";
                modA = value[bName];

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
                modA = value[bName];

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
                modA = value[bName];

                exec.push("{{style="+i18n_style+" "+i18n_defensif+"}}");
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
                break;

            case "pilonnage":
                bName = "atkPilonnage";
                modA = value[bName];
                let vPilonnage = Number(value["pilonnageRanger"])-1;

                exec.push("{{style="+i18n_style+" "+i18n_pilonnage+"}}");
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));

                exec.push("{{vMStyleD=+"+vPilonnage+"D}}");
                bonusDegats.push(vPilonnage+"D6");
                break;

            case "suppression":
                exec.push("{{style="+i18n_style+" "+i18n_pilonnage+"}}");
                if(PG50_3 != "1") {
                    let vSuppressionD = Math.floor(Number(value["styleSuppressionD"])/2);
                    let vSuppressionV = Math.floor(Number(value["styleSuppressionV"])/2);

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

        bonus = bonus.concat(OD);

        bonus = bonus.concat(ODMALWarrior);
        bonus = bonus.concat(ODMALShaman);
        bonus = bonus.concat(ODMALGhost);
    
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
});