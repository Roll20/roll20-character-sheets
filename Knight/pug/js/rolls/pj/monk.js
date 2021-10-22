const monkZenRoll = ["jetModeZen"];

monkZenRoll.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value;

        let attributs = [
            "jetModifDes"
        ];

        let armureL = donneesPJ["ArmureLegende"];

        switch(armureL) {
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

            let mod = Number(value["jetModifDes"]);

            let cRoll = [];
            let cNom1 = [];

            let bonus = [];
            let OD = [];      

            let ODMALWarrior = [];

            let MALTypeSoldier;
            let MALTypeHunter;
            let MALTypeHerald;
            let MALTypeScholar;
            let MALTypeScout;

            exec.push(roll);
            exec.push("{{OD=true}}");

            cNom1.push(CaracNom["hargne"]);
            cRoll.push("@{hargne}");
            OD.push("@{hargneOD}");

            cNom1.push(CaracNom["sf"]);
            cRoll.push("@{sf}");
            OD.push("@{sfOD}");

            exec.push("{{vOD=[["+OD.join("+")+"]]}}");

            switch(armureL) {    
                case "warrior":
                    MALTypeSoldier = value["MALWarriorSoldierA"];
                    MALTypeHunter = value["MALWarriorHunterA"];
                    MALTypeHerald = value["MALWarriorHeraldA"];
                    MALTypeScholar = value["MALWarriorScholarA"];
                    MALTypeScout = value["MALWarriorScoutA"];

                    if(MALTypeSoldier != 0) {
                        exec.push("{{MALspecial2="+i18n_typeSoldier+"}}");
                        exec.push("{{MALTypeWarrior=true}}");
                    }                    

                    if(MALTypeHunter != 0) {
                        exec.push("{{MALspecial2="+i18n_typeHunter+"}}");
                        exec.push("{{MALTypeWarrior=true}}");

                        ODMALWarrior.push(MALTypeHunter);
                    }

                    if(MALTypeHerald != 0) {
                        exec.push("{{MALspecial2="+i18n_typeHerald+"}}");
                        exec.push("{{MALTypeWarrior=true}}");
        
                        ODMALWarrior.push(MALTypeHerald);
                    }

                    if(MALTypeScholar != 0) {
                        exec.push("{{MALspecial2="+i18n_typeScholar+"}}");
                        exec.push("{{MALTypeWarrior=true}}");
                    }

                    if(MALTypeScout != 0) {
                        exec.push("{{MALspecial2="+i18n_typeScout+"}}");
                        exec.push("{{MALTypeWarrior=true}}");
                    }

                    if(ODMALWarrior.length != 0)
                        exec.push("{{vODMALWarrior=[["+ODMALWarrior.join("+")+"]]}}");

                    break;
            }

            exec.push("{{cBase="+cNom1.join(" - ")+"}}");

            if(mod != 0) {
                cRoll.push(mod);
                exec.push("{{mod=[["+mod+"]]}}");
            }

            if(cRoll.length == 0)
                cRoll.push(0);

            bonus = bonus.concat(OD);
            bonus = bonus.concat(ODMALWarrior);
        
            exec.push("{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}");
            exec.push("{{tBonus=[["+bonus.join("+")+"+0]]}}");
            exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

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
});

//A MODIFIER CEA

const monkCeaRoll = ["monkJetVague", "monkJetSalve", "monkJetRayonSpe"];

monkCeaRoll.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value;
        let armureL = donneesPJ["ArmureLegende"];
        let hasArmure = true;
    
        let attributs = [
            "jetModifDes",
            "bonusCarac",
            "caracteristique1Monk",
            "caracteristique2Monk",
            "caracteristique3",
            "caracteristique4",
            "monk250PG",
            "monkRayonTour"
        ];

        let styles = [
            "styleCombat",
            "atkDefensif",
            "atkCouvert",
            "atkAgressif",
            "atkAkimbo",
            "atkAmbidextre",
            "atkPilonnage",
            "styleSuppressionD",
            "styleSuppressionV"
        ]
        
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

        let attDegats = [];
        let attViolence = [];

        if(button == "monkJetVague") {
            attDegats.push("monkVagueDegat");
        }

        if(button == "monkJetSalve") {
            attDegats.push("monkSalveDegat");
        }

        if(button == "monkJetRayonSpe") {
            attDegats.push("monkRayonDegat");
            attViolence.push("monkRayonViolence");
        }

        attributs = attributs.concat(styles);
        attributs = attributs.concat(attDegats);
        attributs = attributs.concat(attViolence);
    
        getAttrs(attributs, function(value)
        {
            let exec = [];
            let isConditionnelA = false;
            let isConditionnelD = false;
            let isConditionnelV = false;
    
            let mod = Number(value["jetModifDes"]);
            let hasBonus = Number(value["bonusCarac"]);

            let PG250 = Number(value["monk250PG"]);
    
            let C1 = value["caracteristique1Monk"];
            let C2 = value["caracteristique2Monk"];
            let C3 = value["caracteristique3"];
            let C4 = value["caracteristique4"];
    
            let C1Nom = C1.slice(2, -1);
            let C2Nom = C2.slice(2, -1);
            let C3Nom = C3.slice(2, -1);
            let C4Nom = C4.slice(2, -1);
    
            let cRoll = [];
            let cNom1 = [];
            let cNom2 = [];
    
            let bonus = [];
            let OD = [];  
    
            let ODMALBarbarian = [];
            let ODMALShaman = [];
            let ODMALWarrior = [];
    
            let MALGoliath;
            let MALGhost;
            let MALShaman;
            let MALTypeSoldier;
            let MALTypeHunter;
            let MALTypeHerald;
            let MALTypeScholar;
            let MALTypeScout;
        
            let capaDgts = 0;
            let capaViolence = 0;
            let bonusRayonD = 0;

            let oTir = CaracValue["tir"].VraiOD;

            let diceDegats = [];
            let diceViolence = [];

            let bonusDegats = [];
            let bonusViolence = [];

            let degats = [];
            let violence = [];

            let autresEffets = [];
    
            exec.push(roll);
            exec.push("{{OD=true}}");
    
            if(C1 != "0") {
                cNom1.push(CaracNom[C1Nom]);
                cRoll.push(C1);
    
                if(hasArmure)
                    OD.push("@{"+ODNom[C1Nom]+"}");
            };
    
            if(C2 != "0") {
                cNom1.push(CaracNom[C2Nom]);
                cRoll.push(C2);
    
                if(hasArmure)
                    OD.push("@{"+ODNom[C2Nom]+"}");
            }
    
            if(hasBonus == 1 || hasBonus == 2) {
                if(C3 != "0") {
                    cNom2.push(CaracNom[C3Nom]);
                    cRoll.push(C3);
    
                    if(hasArmure)
                        OD.push("@{"+ODNom[C3Nom]+"}");
                }
            }
    
            if(hasBonus == 2) {
                if(C4 != "0") {
                    cNom2.push(CaracNom[C4Nom]);
                    cRoll.push(C4);
    
                    if(hasArmure)
                        OD.push("@{"+ODNom[C4Nom]+"}");
                }
            }
    
            if(OD.length == 0)
                exec.push("{{vOD=[[0]]}}");
            else
                exec.push("{{vOD=[["+OD.join("+")+"]]}}");
    
            switch(armureL) {
                case "barbarian":
                    MALGoliath = Number(value["MALBarbarianGoliath"]);
    
                    if(MALGoliath != 0) {
                        exec.push("{{MALGoliath=[["+MALGoliath+"]]}}");
    
                        if(C1Nom == "force" || C1Nom == "endurance")
                            ODMALBarbarian.push(MALGoliath);
        
                        if(C2Nom == "force" || C2Nom == "endurance")
                            ODMALBarbarian.push(MALGoliath);
        
                        if(hasBonus == 1 || hasBonus == 2) {
                            if(C3Nom == "force" || C3Nom == "endurance")
                                ODMALBarbarian.push(MALGoliath);
                        }
        
                        if(hasBonus == 2) {
                            if(C4Nom == "force" || C4Nom == "endurance")
                                ODMALBarbarian.push(MALGoliath);
                        }
    
                        if(ODMALBarbarian.length == 0)
                            exec.push("{{vODMALBarbarian=[[0]]}}");
                        else
                            exec.push("{{vODMALBarbarian=[["+ODMALBarbarian.join("+")+"]]}}");
                    }
                    break;
        
                case "rogue":
                    MALGhost = value["MALRogueGhost"];
    
                    if(MALGhost != "") {
                        exec.push("{{MALspecial2="+i18n_ghostActive+"}}");
                        exec.push("{{vODMALGhostDeplacement=[[3]]}}");
                        isConditionnel = true;
                    }
                    break;
        
                case "shaman":
                    MALShaman = Number(value["MALShamanNbreTotem"]);
                    let C5 = value["MALCaracteristiqueTotem1"];
                    let C6 = value["MALCaracteristiqueTotem2"];
    
                    let C5Nom = C5.slice(2, -1);
                    let C6Nom = C6.slice(2, -1);
    
                    if(MALShaman == 1 || MALShaman == 2) {
                        if(C5 != "0") {
                            exec.push("{{MALTotem1="+CaracNom[C5Nom]+"}}");
                            cRoll.push(C5);
                            ODMALShaman.push("@{"+ODNom[C5Nom]+"}");
                        }
                    }
    
                    if(MALShaman == 2) {
                        if(C6 != "0") {
                            exec.push("{{MALTotem2="+CaracNom[C6Nom]+"}}");
                            cRoll.push(C6);
                            ODMALShaman.push("@{"+ODNom[C6Nom]+"}");
                        }                    
                    }   
    
                    if(MALShaman == 1 || MALShaman == 2) {
                        exec.push("{{MALTotem=true}}");
    
                        if(ODMALShaman.length == 0)
                            exec.push("{{vODMALShaman=[[0]]}}");
                        else
                            exec.push("{{vODMALShaman=[["+ODMALShaman.join("+")+"]]}}");
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
                        exec.push("{{MALTypeWarrior=true}}");
    
                        if(C1Nom == "deplacement" || C1Nom == "force" || C1Nom == "endurance")
                            ODMALWarrior.push(MALTypeSoldier);
        
                        if(C2Nom == "deplacement" || C2Nom == "force" || C2Nom == "endurance")
                            ODMALWarrior.push(MALTypeSoldier);
        
                        if(hasBonus == 1 || hasBonus == 2) {
                            if(C3Nom == "deplacement" || C3Nom == "force" || C3Nom == "endurance")
                                ODMALWarrior.push(MALTypeSoldier);
                        }
        
                        if(hasBonus == 2) {
                            if(C4Nom == "deplacement" || C4Nom == "force" || C4Nom == "endurance")
                                ODMALWarrior.push(MALTypeSoldier);
                        }
                    }                    
    
                    if(MALTypeHunter != 0) {
                        exec.push("{{MALspecial2="+i18n_typeHunter+"}}");
                        exec.push("{{MALTypeWarrior=true}}");
    
                        if(C1Nom == "hargne" || C1Nom == "combat" || C1Nom == "instinct")
                            ODMALWarrior.push(MALTypeHunter);
        
                        if(C2Nom == "hargne" || C2Nom == "combat" || C2Nom == "instinct")
                            ODMALWarrior.push(MALTypeHunter);
        
                        if(hasBonus == 1 || hasBonus == 2) {
                            if(C3Nom == "hargne" || C3Nom == "combat" || C3Nom == "instinct")
                                ODMALWarrior.push(MALTypeHunter);
                        }
        
                        if(hasBonus == 2) {
                            if(C4Nom == "hargne" || C4Nom == "combat" || C4Nom == "instinct")
                                ODMALWarrior.push(MALTypeHunter);
                        }
                    }
    
                    if(MALTypeHerald != 0) {
                        exec.push("{{MALspecial2="+i18n_typeHerald+"}}");
                        exec.push("{{MALTypeWarrior=true}}");
    
                        if(C1Nom == "aura" || C1Nom == "parole" || C1Nom == "sf")
                            ODMALWarrior.push(MALTypeHerald);
        
                        if(C2Nom == "aura" || C2Nom == "parole" || C2Nom == "sf")
                            ODMALWarrior.push(MALTypeHerald);
        
                        if(hasBonus == 1 || hasBonus == 2) {
                            if(C3Nom == "aura" || C3Nom == "parole" || C3Nom == "sf")
                                ODMALWarrior.push(MALTypeHerald);
                        }
        
                        if(hasBonus == 2) {
                            if(C4Nom == "aura" || C4Nom == "parole" || C4Nom == "sf")
                                ODMALWarrior.push(MALTypeHerald);
                        }
                    }
    
                    if(MALTypeScholar != 0) {
                        exec.push("{{MALspecial2="+i18n_typeScholar+"}}");
                        exec.push("{{MALTypeWarrior=true}}");
    
                        if(C1Nom == "tir" || C1Nom == "savoir" || C1Nom == "technique")
                            ODMALWarrior.push(MALTypeScholar);
        
                        if(C2Nom == "tir" || C2Nom == "savoir" || C2Nom == "technique")
                            ODMALWarrior.push(MALTypeScholar);
        
                        if(hasBonus == 1 || hasBonus == 2) {
                            if(C3Nom == "tir" || C3Nom == "savoir" || C3Nom == "technique")
                                ODMALWarrior.push(MALTypeScholar);
                        }
        
                        if(hasBonus == 2) {
                            if(C4Nom == "tir" || C4Nom == "savoir" || C4Nom == "technique")
                                ODMALWarrior.push(MALTypeScholar);
                        }
                    }
    
                    if(MALTypeScout != 0) {
                        exec.push("{{MALspecial2="+i18n_typeScout+"}}");
                        exec.push("{{MALTypeWarrior=true}}");
    
                        if(C1Nom == "discretion" || C1Nom == "dexterite" || C1Nom == "perception")
                            ODMALWarrior.push(MALTypeScout);
        
                        if(C2Nom == "discretion" || C2Nom == "dexterite" || C2Nom == "perception")
                            ODMALWarrior.push(MALTypeScout);
        
                        if(hasBonus == 1 || hasBonus == 2) {
                            if(C3Nom == "discretion" || C3Nom == "dexterite" || C3Nom == "perception")
                                ODMALWarrior.push(MALTypeScout);
                        }
        
                        if(hasBonus == 2) {
                            if(C4Nom == "discretion" || C4Nom == "dexterite" || C4Nom == "perception")
                                ODMALWarrior.push(MALTypeScout);
                        }
                    }
    
                    if(ODMALWarrior.length != 0)
                        exec.push("{{vODMALWarrior=[["+ODMALWarrior.join("+")+"]]}}");
    
                    break;
            }

            
            //GESTION DES EFFETS DES DIFFERENTES ATTAQUES
            
            if(button == "monkJetVague") {
                capaDgts = Number(value["monkVagueDegat"].split("D")[0]);
                capaViolence = Number(value["monkVagueDegat"].split("D")[0]);

                exec.push("{{portee="+i18n_portee+" @{monkVaguePortee}}}");

                isConditionnelA = true;
                isConditionnelD = true;

                if(PG250 == 1)
                    exec.push("{{parasitage="+i18n_parasitage+" 4}}");
                else
                    exec.push("{{parasitage="+i18n_parasitage+" 2}}");

                exec.push("{{parasitageCondition="+i18n_parasitageCondition+"}}");

                autresEffets.push(i18n_dispersion+" 3");
                
                exec.push("{{destructeur="+i18n_destructeur+"}}");
                exec.push("{{destructeurValue=[[2D6]]}}");
                exec.push("{{destructeurCondition="+i18n_destructeurCondition+"}}");

                exec.push("{{choc="+i18n_choc+" 2}}");
                exec.push("{{chocCondition="+i18n_chocCondition+"}}");
            }

            if(button == "monkJetSalve") {
                capaDgts = Number(value["monkSalveDegat"].split("D")[0]);
                capaViolence = Number(value["monkSalveDegat"].split("D")[0]);

                exec.push("{{portee="+i18n_portee+" @{monkSalvePortee}}}");

                isConditionnelA = true;
                isConditionnelD = true;
                isConditionnelV = true;

                exec.push("{{parasitage="+i18n_parasitage+" 1}}");
                exec.push("{{parasitageCondition="+i18n_parasitageCondition+"}}");

                autresEffets.push(i18n_dispersion+" 3");

                exec.push("{{meurtrier="+i18n_meurtrier+"}}");
                exec.push("{{meurtrierValue=[[2D6]]}}");
                exec.push("{{meurtrierCondition="+i18n_meurtrierCondition+"}}");

                exec.push("{{ultraviolence="+i18n_ultraviolence+"}}");
                exec.push("{{ultraviolenceValue=[[2D6]]}}");
                exec.push("{{ultraviolenceCondition="+i18n_ultraviolenceCondition+"}}");
            }

            if(button == "monkJetRayonSpe") {
                bonusRayonD = Number(value["monkRayonTour"]);

                capaDgts = Number(value["monkRayonDegat"].split("D")[0]);
                capaViolence = Number(value["monkRayonViolence"].split("D")[0]);

                exec.push("{{portee="+i18n_portee+" @{monkRayonPortee}}}");

                isConditionnelA = true;
                isConditionnelD = true;

                exec.push("{{parasitage="+i18n_parasitage+" 1}}");
                exec.push("{{parasitageCondition="+i18n_parasitageCondition+"}}");

                if(PG250 == 1)
                    autresEffets.push(i18n_ignoreArmure);
                else
                    autresEffets.push(i18n_perceArmure+" 40");
            }

            //FIN GESTION DES EFFETS DES DIFFERENTES ATTAQUES

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

                    exec.push("{{vMStyleD=+"+capaDgts+"D}}");
                    exec.push("{{vMStyleV=+"+Math.ceil(capaViolence/2)+"D}}");

                    capaDgts += capaDgts;
                    capaViolence += Math.ceil(capaViolence/2);
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
                    modA = value[bName];

                    exec.push("{{style="+i18n_style+" "+i18n_pilonnage+"}}");
                    exec.push("{{vMStyleA="+modA+"D}}");
                    cRoll.push(Number(modA));
                    break;

                case "suppression":
                    exec.push("{{style="+i18n_style+" "+i18n_pilonnage+"}}");    
                    break;
            }
            
            //FIN GESTION DU STYLE
    
            exec.push("{{cBase="+cNom1.join(" - ")+"}}");
    
            if(hasBonus > 0)
                exec.push("{{cBonus="+cNom2.join(" - ")+"}}");
    
            if(mod != 0) {
                cRoll.push(mod);
                exec.push("{{mod=[["+mod+"]]}}");
            }
    
            if(cRoll.length == 0)
                cRoll.push(0);
    
            bonus = bonus.concat(OD);     
    
            bonus = bonus.concat(ODMALBarbarian);
            bonus = bonus.concat(ODMALShaman);
            bonus = bonus.concat(ODMALWarrior);

            if(bonusRayonD != 0) {
                capaDgts += bonusRayonD;

                exec.push("{{vRayonDegats="+bonusRayonD+"D}}");
            }                

            diceDegats.push(capaDgts+"D6");
            diceViolence.push(capaViolence+"D6");
            
            degats = degats.concat(diceDegats);
            degats = degats.concat(bonusDegats);

            violence = violence.concat(diceViolence);
            violence = violence.concat(bonusViolence);
        
            exec.push("{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}");
            exec.push("{{tBonus=[["+bonus.join("+")+"+0]]}}");
            exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

            exec.push("{{degats=[["+degats.join("+")+"]]}}");
            exec.push("{{violence=[["+violence.join("+")+"]]}}");
    
            if(isConditionnelA == true)
                exec.push("{{succesConditionnel=true}}");

            if(isConditionnelD == true)
                exec.push("{{degatsConditionnel=true}}");

            if(isConditionnelV == true)
                exec.push("{{violenceConditionnel=true}}");

            if(autresEffets.length > 0)
                exec.push("{{effets="+autresEffets.join(" / ")+"}}");
    
            startRoll(exec.join(" "), (results) => {
                let tJet = results.results.jet.result;
                let tBonus = results.results.tBonus.result;
                let tExploit = results.results.Exploit.result;
    
                let total = tJet+tBonus;

                let tDegats = results.results.degats.result;
                let tViolence = results.results.violence.result;
    
                finishRoll(
                    results.rollId, 
                    {
                        jet:total,
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
                
            });
        });
    });
});
