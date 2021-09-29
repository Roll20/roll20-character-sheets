on(`clicked:distanceWizardBorealis`, function(info) {
    let roll = info.htmlAttributes.value;    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    let attributs = [
        "jetModifDes",
        "bonusCarac",
        "caracteristique1",
        "caracteristique2",
        "caracteristique3",
        "caracteristique4",
        "wizardBDmg",
        "wizardBViolence",
        "wizardBPortee",
        "wizardBTypeAttaque",
        "styleCombat",
        "atkDefensif",
        "atkCouvert",
        "atkAgressif",
        "atkAkimbo",
        "atkAmbidextre",
        "calODTir",
        "calODCom"
    ];

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

        let typeAttaque = value["wizardBTypeAttaque"];

        let diceDegats = Number(value["wizardBDmg"].split("D")[0]);
        let diceViolence = Number(value["wizardBViolence"].split("D")[0]);
        let portee = value["wizardBPortee"];
        
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

        let cRoll = [];
        let cNom1 = [];
        let cNom2 = [];

        let bonus = [];
        let OD = [];

        let ODMALWarrior = [];
        let ODMALShaman = [];

        let MALGoliath;
        let MALGhost;
        let MALShaman;
        let MALTypeSoldier;
        let MALTypeHunter;
        let MALTypeHerald;
        let MALTypeScholar;
        let MALTypeScout;

        exec.push(roll);

        if(hasArmure)
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

                if(MALGoliath != 0)
                    exec.push("{{MALGoliath=[["+MALGoliath+"]]}}");
                break;
    
            case "rogue":
                MALGhost = value["MALRogueGhost"];

                if(MALGhost != "")
                    exec.push("{{MALspecial2="+i18n_ghostActive+"}}");
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

        exec.push("{{cBase="+cNom1.join(" - ")+"}}");

        if(hasBonus > 0)
            exec.push("{{cBonus="+cNom2.join(" - ")+"}}");

        if(mod != 0) {
            cRoll.push(mod);
            exec.push("{{mod=[["+mod+"]]}}");
        }

        //GESTION DU STYLE
        
        let ODTir = value["calODTir"];
        let ODCombat = value["calODCom"];
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
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(modA);
                break;

            case "agressif":
                bName = "atkAgressif";
                modA = value[bName];

                exec.push("{{style="+i18n_style+" "+i18n_agressif+"}}");
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(modA);
                break;

            case "akimbo":
                bName = "atkAkimbo";
                modA = value[bName];
                let violenceB = Math.ceil(diceViolence/2);

                exec.push("{{style="+i18n_style+" "+i18n_akimbo+"}}");
                exec.push("{{vMStyleD=+"+diceDegats+"}}");
                exec.push("{{vMStyleV=+"+violenceB+"D6}}");
                diceDegats += diceDegats;
                diceViolence += violenceB;

                if(typeAttaque == "distance" && ODTir >= 3) {

                    exec.push("{{vMStyleA=-1D}}");
                    cRoll.push(-1);
                    
                } else if(typeAttaque == "contact" && ODCombat >= 3) {

                    exec.push("{{vMStyleA=-1D}}");
                    cRoll.push(-1);

                } else {

                    exec.push("{{vMStyleA="+modA+"D}}");
                    cRoll.push(modA);
                }

                break;

            case "ambidextre":
                bName = "atkAmbidextre";
                modA = value[bName];

                exec.push("{{style="+i18n_style+" "+i18n_ambidextre+"}}");

                if(typeAttaque == "distance" && ODTir >= 3) {

                    exec.push("{{vMStyleA=-1D}}");
                    cRoll.push(-1);
                    
                } else if(typeAttaque == "contact" && ODCombat >= 3) {

                    exec.push("{{vMStyleA=-1D}}");
                    cRoll.push(-1);

                } else {

                    exec.push("{{vMStyleA="+modA+"D}}");
                    cRoll.push(modA);
                    
                }
                break;

            case "defensif":
                bName = "atkDefensif";
                modA = value[bName];

                exec.push("{{style="+i18n_style+" "+i18n_defensif+"}}");
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(modA);
                break;
        }
        
        //FIN GESTION DU STYLE

        if(cRoll.length == 0)
            cRoll.push(0);

        bonus = bonus.concat(OD);

        bonus = bonus.concat(ODMALWarrior);
        bonus = bonus.concat(ODMALShaman);
    
        exec.push("{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}");
        exec.push("{{tBonus=[["+bonus.join("+")+"+0]]}}");
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

        exec.push("{{portee="+i18n_portee+" "+portee+"}}");
        exec.push("{{degats=[["+diceDegats+"D6]]}}");
        exec.push("{{violence=[["+diceViolence+"D6]]}}");
        exec.push("{{effets="+i18n_degatsContinus+" ([[1d6]] "+i18n_tours+")}}");

        exec.push("{{degatsConditionnel=true}}");
        exec.push("{{violenceConditionnel=true}}");
        exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}}");
        exec.push("{{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

        startRoll(exec.join(" "), (results) => {
            let tJet = results.results.jet.result;
            let tBonus = results.results.tBonus.result;
            let tExploit = results.results.Exploit.result;

            let tDegats = results.results.degats.result;
            let tViolence = results.results.violence.result;

            let total = tJet+tBonus;

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

on(`clicked:distanceWizardOriflamme`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];

    let attributs = [
        "wizardODmg",
        "wizardOViolence",
        "wizardOPortee"
    ];

    switch(armureL) {
        case "barbarian":
            attributs.push("MALBarbarianGoliath");
            break;

        case "rogue":
            attributs.push("MALRogueGhost");
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

        let degats = value["wizardODmg"];
        let violence = value["wizardOViolence"];
        let portee = value["wizardOPortee"];

        let MALGoliath;
        let MALGhost;
        let MALTypeSoldier;
        let MALTypeHunter;
        let MALTypeHerald;
        let MALTypeScholar;
        let MALTypeScout;

        exec.push(roll);

        switch(armureL) {
            case "barbarian":
                MALGoliath = Number(value["MALBarbarianGoliath"]);

                if(MALGoliath != 0)
                    exec.push("{{MALGoliath=[["+MALGoliath+"]]}}");
                break;
    
            case "rogue":
                MALGhost = value["MALRogueGhost"];

                if(MALGhost != "")
                    exec.push("{{MALspecial2="+i18n_ghostActive+"}}");
                break;
                
            case "warrior":
                MALTypeSoldier = value["MALWarriorSoldierA"];
                MALTypeHunter = value["MALWarriorHunterA"];
                MALTypeHerald = value["MALWarriorHeraldA"];
                MALTypeScholar = value["MALWarriorScholarA"];
                MALTypeScout = value["MALWarriorScoutA"];

                if(MALTypeSoldier != 0)
                    exec.push("{{MALspecial2="+i18n_typeSoldier+"}}");
                

                if(MALTypeHunter != 0)
                    exec.push("{{MALspecial2="+i18n_typeHunter+"}}");

                if(MALTypeHerald != 0)
                    exec.push("{{MALspecial2="+i18n_typeHerald+"}}");

                if(MALTypeScholar != 0)
                    exec.push("{{MALspecial2="+i18n_typeScholar+"}}");

                if(MALTypeScout != 0)
                    exec.push("{{MALspecial2="+i18n_typeScout+"}}");
                break;
        }

        exec.push("{{portee="+i18n_portee+" "+portee+"}}");
        exec.push("{{degats=[["+degats+"]]}}");
        exec.push("{{violence=[["+violence+"]]}}");

        exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}}");
        exec.push("{{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

        exec.push("{{succesConditionnel=true}}");

        exec.push("{{lumiere="+i18n_lumiere+" 2}}");
        exec.push("{{lumiereCondition="+i18n_affecteAnatheme+"}}");

        exec.push("{{degatsConditionnel=true}}");
        exec.push("{{violenceConditionnel=true}}");
        exec.push("{{affecteAnathemeD="+i18n_affecteAnatheme+"}}");
        exec.push("{{affecteAnathemeV="+i18n_affecteAnatheme+"}}");

        startRoll(exec.join(" "), (results) => {
            let tDegats = results.results.degats.result;
            let tViolence = results.results.violence.result;

            finishRoll(
                results.rollId, 
                {
                    degats:tDegats,
                    violence:tViolence
                }
            );
        });
    });
});

on(`clicked:distanceMALWizardOriflamme`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];

    let attributs = [
        "MALWizardODmg",
        "MALWizardOViolence",
        "MALWizardOPortee"
    ];

    switch(armureL) {
        case "barbarian":
            attributs.push("MALBarbarianGoliath");
            break;

        case "rogue":
            attributs.push("MALRogueGhost");
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

        let degats = value["MALWizardODmg"];
        let violence = value["MALWizardOViolence"];
        let portee = value["MALWizardOPortee"];

        let MALGoliath;
        let MALGhost;
        let MALTypeSoldier;
        let MALTypeHunter;
        let MALTypeHerald;
        let MALTypeScholar;
        let MALTypeScout;

        exec.push(roll);

        switch(armureL) {
            case "barbarian":
                MALGoliath = Number(value["MALBarbarianGoliath"]);

                if(MALGoliath != 0)
                    exec.push("{{MALGoliath=[["+MALGoliath+"]]}}");
                break;
    
            case "rogue":
                MALGhost = value["MALRogueGhost"];

                if(MALGhost != "")
                    exec.push("{{MALspecial2="+i18n_ghostActive+"}}");
                break;
                
            case "warrior":
                MALTypeSoldier = value["MALWarriorSoldierA"];
                MALTypeHunter = value["MALWarriorHunterA"];
                MALTypeHerald = value["MALWarriorHeraldA"];
                MALTypeScholar = value["MALWarriorScholarA"];
                MALTypeScout = value["MALWarriorScoutA"];

                if(MALTypeSoldier != 0)
                    exec.push("{{MALspecial2="+i18n_typeSoldier+"}}");
                

                if(MALTypeHunter != 0)
                    exec.push("{{MALspecial2="+i18n_typeHunter+"}}");

                if(MALTypeHerald != 0)
                    exec.push("{{MALspecial2="+i18n_typeHerald+"}}");

                if(MALTypeScholar != 0)
                    exec.push("{{MALspecial2="+i18n_typeScholar+"}}");

                if(MALTypeScout != 0)
                    exec.push("{{MALspecial2="+i18n_typeScout+"}}");
                break;
        }

        exec.push("{{portee="+i18n_portee+" "+portee+"}}");
        exec.push("{{degats=[["+degats+"]]}}");
        exec.push("{{violence=[["+violence+"]]}}");

        exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}}");
        exec.push("{{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

        exec.push("{{succesConditionnel=true}}");
        exec.push("{{lumiere="+i18n_lumiere+" 2}}");
        exec.push("{{lumiereCondition="+i18n_affecteAnatheme+"}}");
        exec.push("{{degatsConditionnel=true}}");
        exec.push("{{violenceConditionnel=true}}");
        exec.push("{{affecteAnathemeD="+i18n_affecteAnatheme+"}}");
        exec.push("{{affecteAnathemeV="+i18n_affecteAnatheme+"}}");

        startRoll(exec.join(" "), (results) => {
            let tDegats = results.results.degats.result;
            let tViolence = results.results.violence.result;

            finishRoll(
                results.rollId, 
                {
                    degats:tDegats,
                    violence:tViolence
                }
            );
        });
    });
});