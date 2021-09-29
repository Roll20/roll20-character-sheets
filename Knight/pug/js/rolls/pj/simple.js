on(`clicked:simple clicked:simpleRogue`, function(info) {
    let roll = info.htmlAttributes.value;
    let armure = donneesPJ["Armure"];
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

    switch(armure) {
        case "barbarian":
            attributs.push("barbarianGoliath");
            break;

        case "rogue":
            attributs.push("rogueGhost");
            break;

        case "shaman":
            attributs.push("shamanNbreTotem");
            attributs.push("caracteristiqueTotem1");
            attributs.push("caracteristiqueTotem2");
            attributs.push("caracteristiqueTotem3");
            break;

        case "warrior":
            attributs.push("warriorSoldierA");
            attributs.push("warriorHunterA");
            attributs.push("warriorScholarA");
            attributs.push("warriorHeraldA");
            attributs.push("warriorScoutA");
            break;
    }

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

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    getAttrs(attributs, function(value)
    {
        let exec = [];
        let isConditionnel = false;

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
        let ODBarbarian = [];
        let ODShaman = [];
        let ODWarrior = [];        

        let ODMALBarbarian = [];
        let ODMALShaman = [];
        let ODMALWarrior = [];

        let goliath;
        let ghost;
        let shaman;
        let typeSoldier;
        let typeHunter;
        let typeHerald;
        let typeScholar;
        let typeScout;

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

        switch(armure) {
            case "barbarian":
                goliath = Number(value["barbarianGoliath"]);

                if(goliath != 0) {
                    exec.push("{{goliath=[["+goliath+"]]}}");

                    if(C1Nom == "force" || C1Nom == "endurance")
                        ODBarbarian.push(goliath);
    
                    if(C2Nom == "force" || C2Nom == "endurance")
                        ODBarbarian.push(goliath);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "force" || C3Nom == "endurance")
                            ODBarbarian.push(goliath);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "force" || C4Nom == "endurance")
                            ODBarbarian.push(goliath);
                    }

                    if(ODBarbarian.length == 0)
                        exec.push("{{vODBarbarian=[[0]]}}");
                    else
                        exec.push("{{vODBarbarian=[["+ODBarbarian.join("+")+"]]}}");
                }            
                break;

            case "rogue":
                ghost = value["rogueGhost"];

                if(ghost != "") {
                    exec.push("{{special2="+i18n_ghostActive+"}}");
                    exec.push("{{vODGhostDeplacement=[[3]]}}");
                    isConditionnel = true;
                }
                
                break;

            case "shaman":
                shaman = Number(value["shamanNbreTotem"]);
                let C5 = value["caracteristiqueTotem1"];
                let C6 = value["caracteristiqueTotem2"];
                let C7 = value["caracteristiqueTotem3"];

                let C5Nom = C5.slice(2, -1);
                let C6Nom = C6.slice(2, -1);
                let C7Nom = C7.slice(2, -1);

                if(shaman == 1 || shaman == 2 || shaman == 3) {
                    if(C5 != "0") {
                        exec.push("{{totem1="+CaracNom[C5Nom]+"}}");
                        cRoll.push(C5);
                        ODShaman.push("@{"+ODNom[C5Nom]+"}");
                    }
                }

                if(shaman == 2 || shaman == 3) {
                    if(C6 != "0") {
                        exec.push("{{totem2="+CaracNom[C6Nom]+"}}");
                        cRoll.push(C6);
                        ODShaman.push("@{"+ODNom[C6Nom]+"}");
                    }                    
                }

                if(shaman == 3) {
                    if(C7 != "0") {
                        exec.push("{{totem3="+CaracNom[C7Nom]+"}}");
                        cRoll.push(C7);
                        ODShaman.push("@{"+ODNom[C7Nom]+"}");
                    }                    
                }       

                if(shaman == 1 || shaman == 2 || shaman == 3) {
                    exec.push("{{totem=true}}");

                    if(ODShaman.length == 0)
                        exec.push("{{vODShaman=[[0]]}}");
                    else
                        exec.push("{{vODShaman=[["+ODShaman.join("+")+"]]}}");
                }
                break;

            case "warrior":
                typeSoldier = value["warriorSoldierA"];
                typeHunter = value["warriorHunterA"];
                typeHerald = value["warriorHeraldA"];
                typeScholar = value["warriorScholarA"];
                typeScout = value["warriorScoutA"];

                if(typeSoldier != 0) {
                    exec.push("{{special2="+i18n_typeSoldier+"}}");

                    if(C1Nom == "deplacement" || C1Nom == "force" || C1Nom == "endurance")
                        ODWarrior.push(typeSoldier);
    
                    if(C2Nom == "deplacement" || C2Nom == "force" || C2Nom == "endurance")
                        ODWarrior.push(typeSoldier);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "deplacement" || C3Nom == "force" || C3Nom == "endurance")
                            ODWarrior.push(typeSoldier);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "deplacement" || C4Nom == "force" || C4Nom == "endurance")
                            ODWarrior.push(typeSoldier);
                    }
                }                    

                if(typeHunter != 0) {
                    exec.push("{{special2="+i18n_typeHunter+"}}");

                    if(C1Nom == "hargne" || C1Nom == "combat" || C1Nom == "instinct")
                        ODWarrior.push(typeHunter);
    
                    if(C2Nom == "hargne" || C2Nom == "combat" || C2Nom == "instinct")
                        ODWarrior.push(typeHunter);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "hargne" || C3Nom == "combat" || C3Nom == "instinct")
                            ODWarrior.push(typeHunter);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "hargne" || C4Nom == "combat" || C4Nom == "instinct")
                            ODWarrior.push(typeHunter);
                    }
                }

                if(typeHerald != 0) {
                    exec.push("{{special2="+i18n_typeHerald+"}}");

                    if(C1Nom == "aura" || C1Nom == "parole" || C1Nom == "sf")
                        ODWarrior.push(typeHerald);
    
                    if(C2Nom == "aura" || C2Nom == "parole" || C2Nom == "sf")
                        ODWarrior.push(typeHerald);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "aura" || C3Nom == "parole" || C3Nom == "sf")
                            ODWarrior.push(typeHerald);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "aura" || C4Nom == "parole" || C4Nom == "sf")
                            ODWarrior.push(typeHerald);
                    }
                }

                if(typeScholar != 0) {
                    exec.push("{{special2="+i18n_typeScholar+"}}");

                    if(C1Nom == "tir" || C1Nom == "savoir" || C1Nom == "technique")
                        ODWarrior.push(typeScholar);
    
                    if(C2Nom == "tir" || C2Nom == "savoir" || C2Nom == "technique")
                        ODWarrior.push(typeScholar);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "tir" || C3Nom == "savoir" || C3Nom == "technique")
                            ODWarrior.push(typeScholar);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "tir" || C4Nom == "savoir" || C4Nom == "technique")
                            ODWarrior.push(typeScholar);
                    }
                }

                if(typeScout != 0) {
                    exec.push("{{special2="+i18n_typeScout+"}}");

                    if(C1Nom == "discretion" || C1Nom == "dexterite" || C1Nom == "perception")
                        ODWarrior.push(typeScout);
    
                    if(C2Nom == "discretion" || C2Nom == "dexterite" || C2Nom == "perception")
                        ODWarrior.push(typeScout);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "discretion" || C3Nom == "dexterite" || C3Nom == "perception")
                            ODWarrior.push(typeScout);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "discretion" || C4Nom == "dexterite" || C4Nom == "perception")
                            ODWarrior.push(typeScout);
                    }
                }

                if(ODWarrior.length != 0)
                    exec.push("{{vODWarrior=[["+ODWarrior.join("+")+"]]}}");
                break;
        }

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
        bonus = bonus.concat(ODBarbarian);
        bonus = bonus.concat(ODShaman);
        bonus = bonus.concat(ODWarrior);        

        bonus = bonus.concat(ODMALBarbarian);
        bonus = bonus.concat(ODMALShaman);
        bonus = bonus.concat(ODMALWarrior);        
    
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

on(`clicked:simplePriest`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    let attributs = [
        "jetModifDes",
        "bonusCarac",
        "caracteristique1Priest",
        "caracteristique2",
        "caracteristique3",
        "caracteristique4"
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

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    getAttrs(attributs, function(value)
    {
        let exec = [];
        
        let mod = Number(value["jetModifDes"]);
        let hasBonus = Number(value["bonusCarac"]);

        let C1 = value["caracteristique1Priest"];
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

        let ODMALBarbarian = [];
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

        bonus = bonus.concat(ODMALWarrior);
        bonus = bonus.concat(ODMALShaman);
    
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

on(`clicked:simplePsionPuppet clicked:simplePsionDiscord`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    let attributs = [
        "jetModifDes",
        "bonusCarac",
        "caracteristique1Psion",
        "caracteristique2",
        "caracteristique3",
        "caracteristique4"
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

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    getAttrs(attributs, function(value)
    {
        let exec = [];
        
        let mod = Number(value["jetModifDes"]);
        let hasBonus = Number(value["bonusCarac"]);

        let C1 = value["caracteristique1Psion"];
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

        bonus = bonus.concat(ODMALWarrior);
        bonus = bonus.concat(ODMALShaman);
    
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

on(`clicked:simpleRangerVision`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    let attributs = [
        "jetModifDes",
        "bonusCarac",
        "caracteristique1Ranger",
        "caracteristique2",
        "caracteristique3",
        "caracteristique4"
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

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    getAttrs(attributs, function(value)
    {
        let exec = [];
        
        let mod = Number(value["jetModifDes"]);
        let hasBonus = Number(value["bonusCarac"]);

        let C1 = value["caracteristique1Ranger"];
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

        bonus = bonus.concat(ODMALWarrior);
        bonus = bonus.concat(ODMALShaman);
    
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

on(`clicked:simpleShamanImpregnation`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    let attributs = [
        "bonusCarac",
        "caracteristique1ShamanImpregnation",
        "caracteristique2ShamanImpregnation",
        "caracteristique3",
        "caracteristique4"
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

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    getAttrs(attributs, function(value)
    {
        let exec = [];
        
        let hasBonus = Number(value["bonusCarac"]);

        let C1 = value["caracteristique1ShamanImpregnation"];
        let C2 = value["caracteristique2ShamanImpregnation"];
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

        let MALGoliath;
        let MALGhost;
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

        exec.push("{{cBase="+cNom1.join(" - ")+"}}");

        if(hasBonus > 0)
            exec.push("{{cBonus="+cNom2.join(" - ")+"}}");

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
                startRoll(roll+"@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+i18n_exploit+"}} {{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}", (exploit) => {
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

on(`clicked:simpleMALShamanImpregnation`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    let attributs = [
        "bonusCarac",
        "caracteristique1MALShamanImpregnation",
        "caracteristique2MALShamanImpregnation",
        "caracteristique3",
        "caracteristique4"
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

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    getAttrs(attributs, function(value)
    {
        let exec = [];
        
        let hasBonus = Number(value["bonusCarac"]);

        let C1 = value["caracteristique1MALShamanImpregnation"];
        let C2 = value["caracteristique2MALShamanImpregnation"];
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

        let MALGoliath;
        let MALGhost;
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

        exec.push("{{cBase="+cNom1.join(" - ")+"}}");

        if(hasBonus > 0)
            exec.push("{{cBonus="+cNom2.join(" - ")+"}}");

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

on(`clicked:simpleSorcererEtirement`, function(info) {
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

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    getAttrs(attributs, function(value)
    {
        let exec = [];
        
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
        bonus = bonus.concat(3);

        bonus = bonus.concat(ODMALWarrior);
        bonus = bonus.concat(ODMALShaman);
    
        exec.push("{{vODSorcerer=[[3]]}}");
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

on(`clicked:pilotage`, function(info) {
    let roll = info.htmlAttributes.value;
    let armure = donneesPJ["Armure"];
    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    let attributs = [
        "jetModifDes",
        "bonusCarac",
        "vehicule_manoeuvrabilite",
        "caracteristique1",
        "caracteristique2",
        "caracteristique3",
        "caracteristique4"
    ];

    switch(armure) {
        case "barbarian":
            attributs.push("barbarianGoliath");
            break;

        case "rogue":
            attributs.push("rogueGhost");
            break;

        case "shaman":
            attributs.push("shamanNbreTotem");
            attributs.push("caracteristiqueTotem1");
            attributs.push("caracteristiqueTotem2");
            attributs.push("caracteristiqueTotem3");
            break;

        case "warrior":
            attributs.push("warriorSoldierA");
            attributs.push("warriorHunterA");
            attributs.push("warriorScholarA");
            attributs.push("warriorHeraldA");
            attributs.push("warriorScoutA");
            break;
    }

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

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    getAttrs(attributs, function(value)
    {
        let exec = [];
        let isConditionnel = false;

        let manoeuvrabilite = Number(value["vehicule_manoeuvrabilite"]);
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
        let ODBarbarian = [];
        let ODShaman = [];
        let ODWarrior = [];        

        let ODMALBarbarian = [];
        let ODMALShaman = [];
        let ODMALWarrior = [];

        let goliath;
        let ghost;
        let shaman;
        let typeSoldier;
        let typeHunter;
        let typeHerald;
        let typeScholar;
        let typeScout;

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

        switch(armure) {
            case "barbarian":
                goliath = Number(value["barbarianGoliath"]);

                if(goliath != 0) {
                    exec.push("{{goliath=[["+goliath+"]]}}");

                    if(C1Nom == "force" || C1Nom == "endurance")
                        ODBarbarian.push(goliath);
    
                    if(C2Nom == "force" || C2Nom == "endurance")
                        ODBarbarian.push(goliath);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "force" || C3Nom == "endurance")
                            ODBarbarian.push(goliath);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "force" || C4Nom == "endurance")
                            ODBarbarian.push(goliath);
                    }

                    if(ODBarbarian.length == 0)
                        exec.push("{{vODBarbarian=[[0]]}}");
                    else
                        exec.push("{{vODBarbarian=[["+ODBarbarian.join("+")+"]]}}");
                }            
                break;

            case "rogue":
                ghost = value["rogueGhost"];

                if(ghost != "") {
                    exec.push("{{special2="+i18n_ghostActive+"}}");
                    exec.push("{{vODGhostDeplacement=[[3]]}}");
                    isConditionnel = true;
                }
                
                break;

            case "shaman":
                shaman = Number(value["shamanNbreTotem"]);
                let C5 = value["caracteristiqueTotem1"];
                let C6 = value["caracteristiqueTotem2"];
                let C7 = value["caracteristiqueTotem3"];

                let C5Nom = C5.slice(2, -1);
                let C6Nom = C6.slice(2, -1);
                let C7Nom = C7.slice(2, -1);

                if(shaman == 1 || shaman == 2 || shaman == 3) {
                    if(C5 != "0") {
                        exec.push("{{totem1="+CaracNom[C5Nom]+"}}");
                        cRoll.push(C5);
                        ODShaman.push("@{"+ODNom[C5Nom]+"}");
                    }
                }

                if(shaman == 2 || shaman == 3) {
                    if(C6 != "0") {
                        exec.push("{{totem2="+CaracNom[C6Nom]+"}}");
                        cRoll.push(C6);
                        ODShaman.push("@{"+ODNom[C6Nom]+"}");
                    }                    
                }

                if(shaman == 3) {
                    if(C7 != "0") {
                        exec.push("{{totem3="+CaracNom[C7Nom]+"}}");
                        cRoll.push(C7);
                        ODShaman.push("@{"+ODNom[C7Nom]+"}");
                    }                    
                }       

                if(shaman == 1 || shaman == 2 || shaman == 3) {
                    exec.push("{{totem=true}}");

                    if(ODShaman.length == 0)
                        exec.push("{{vODShaman=[[0]]}}");
                    else
                        exec.push("{{vODShaman=[["+ODShaman.join("+")+"]]}}");
                }
                break;

            case "warrior":
                typeSoldier = value["warriorSoldierA"];
                typeHunter = value["warriorHunterA"];
                typeHerald = value["warriorHeraldA"];
                typeScholar = value["warriorScholarA"];
                typeScout = value["warriorScoutA"];

                if(typeSoldier != 0) {
                    exec.push("{{special2="+i18n_typeSoldier+"}}");

                    if(C1Nom == "deplacement" || C1Nom == "force" || C1Nom == "endurance")
                        ODWarrior.push(typeSoldier);
    
                    if(C2Nom == "deplacement" || C2Nom == "force" || C2Nom == "endurance")
                        ODWarrior.push(typeSoldier);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "deplacement" || C3Nom == "force" || C3Nom == "endurance")
                            ODWarrior.push(typeSoldier);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "deplacement" || C4Nom == "force" || C4Nom == "endurance")
                            ODWarrior.push(typeSoldier);
                    }
                }                    

                if(typeHunter != 0) {
                    exec.push("{{special2="+i18n_typeHunter+"}}");

                    if(C1Nom == "hargne" || C1Nom == "combat" || C1Nom == "instinct")
                        ODWarrior.push(typeHunter);
    
                    if(C2Nom == "hargne" || C2Nom == "combat" || C2Nom == "instinct")
                        ODWarrior.push(typeHunter);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "hargne" || C3Nom == "combat" || C3Nom == "instinct")
                            ODWarrior.push(typeHunter);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "hargne" || C4Nom == "combat" || C4Nom == "instinct")
                            ODWarrior.push(typeHunter);
                    }
                }

                if(typeHerald != 0) {
                    exec.push("{{special2="+i18n_typeHerald+"}}");

                    if(C1Nom == "aura" || C1Nom == "parole" || C1Nom == "sf")
                        ODWarrior.push(typeHerald);
    
                    if(C2Nom == "aura" || C2Nom == "parole" || C2Nom == "sf")
                        ODWarrior.push(typeHerald);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "aura" || C3Nom == "parole" || C3Nom == "sf")
                            ODWarrior.push(typeHerald);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "aura" || C4Nom == "parole" || C4Nom == "sf")
                            ODWarrior.push(typeHerald);
                    }
                }

                if(typeScholar != 0) {
                    exec.push("{{special2="+i18n_typeScholar+"}}");

                    if(C1Nom == "tir" || C1Nom == "savoir" || C1Nom == "technique")
                        ODWarrior.push(typeScholar);
    
                    if(C2Nom == "tir" || C2Nom == "savoir" || C2Nom == "technique")
                        ODWarrior.push(typeScholar);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "tir" || C3Nom == "savoir" || C3Nom == "technique")
                            ODWarrior.push(typeScholar);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "tir" || C4Nom == "savoir" || C4Nom == "technique")
                            ODWarrior.push(typeScholar);
                    }
                }

                if(typeScout != 0) {
                    exec.push("{{special2="+i18n_typeScout+"}}");

                    if(C1Nom == "discretion" || C1Nom == "dexterite" || C1Nom == "perception")
                        ODWarrior.push(typeScout);
    
                    if(C2Nom == "discretion" || C2Nom == "dexterite" || C2Nom == "perception")
                        ODWarrior.push(typeScout);
    
                    if(hasBonus == 1 || hasBonus == 2) {
                        if(C3Nom == "discretion" || C3Nom == "dexterite" || C3Nom == "perception")
                            ODWarrior.push(typeScout);
                    }
    
                    if(hasBonus == 2) {
                        if(C4Nom == "discretion" || C4Nom == "dexterite" || C4Nom == "perception")
                            ODWarrior.push(typeScout);
                    }
                }

                if(ODWarrior.length != 0)
                    exec.push("{{vODWarrior=[["+ODWarrior.join("+")+"]]}}");
                break;
        }

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

        exec.push("{{cBase="+cNom1.join(" - ")+"}}");

        if(hasBonus > 0)
            exec.push("{{cBonus="+cNom2.join(" - ")+"}}");

        if(mod != 0) {
            cRoll.push(mod);
            exec.push("{{mod=[["+mod+"]]}}");
        }

        cRoll.push(manoeuvrabilite);
        exec.push("{{vManoeuvrabilite=+"+manoeuvrabilite+"D6}}");

        if(cRoll.length == 0)
            cRoll.push(0);

        bonus = bonus.concat(OD);
        bonus = bonus.concat(ODBarbarian);
        bonus = bonus.concat(ODShaman);
        bonus = bonus.concat(ODWarrior);        

        bonus = bonus.concat(ODMALBarbarian);
        bonus = bonus.concat(ODMALShaman);
        bonus = bonus.concat(ODMALWarrior);        
    
        exec.push("{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}");
        exec.push("{{tBonus=[["+bonus.join("+")+"+0]]}}");
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

        if(isConditionnel)
            exec.push("{{conditionnel=true}}");

        console.log(exec);

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

on(`clicked:initiative`, function(info) {
    let roll = info.htmlAttributes.value;
    let armure = donneesPJ["Armure"];
    let armureL = donneesPJ["ArmureLegende"];
    let hasArmure = true;

    if(armure == "sans" || armure == "guardian")
        hasArmure = false;

    let dice = PJData["diceInitiative"] || 3;
    let bonus = PJData["bonusInitiative"] || 0;
    let bonusP = PJData["bonusInitiativeP"] || 0;
    let malus = PJData["malusInitiative"] || 0;

    let str = "";

    let ODInstinct = CaracValue["instinct"].VraiOD;

    var result1 = 0;
    var result2 = 0;
    var resultF = 0;

    switch(armure) {
        case "barbarian":
            goliath = Number(PJData["barbarianGoliath"]);

            if(goliath != 0)
                str += `{{goliath=[[${goliath}]]}}`;      
            break;

        case "rogue":
            ghost = PJData["rogueGhost"];

            if(ghost != "")
                str += `{{special2=[[${i18n_ghostActive}]]}}`;       
            break;

        case "warrior":
            typeSoldier = PJData["warriorSoldierA"];
            typeHunter = PJData["warriorHunterA"];
            typeHerald = PJData["warriorHeraldA"];
            typeScholar = PJData["warriorScholarA"];
            typeScout = PJData["warriorScoutA"];

            if(typeSoldier != 0)
                str += `{{special2=[[${i18n_typeSoldier}]]}}`;       

            if(typeHunter != 0) 
                str += `{{special2=[[${i18n_typeHunter}]]}}`;

            if(typeHerald != 0) 
                str += `{{special2=[[${i18n_typeHerald}]]}}`;

            if(typeScholar != 0) 
                str += `{{special2=[[${i18n_typeScholar}]]}}`;

            if(typeScout != 0) 
                str += `{{special2=[[${i18n_typeScout}]]}}`;
            break;
    }

    switch(armureL) {
        case "barbarian":
            MALGoliath = Number(PJData["MALBarbarianGoliath"]);

            if(MALGoliath != 0)
                str += `{{MALGoliath=[[${MALGoliath}]]}}`;
            break;

        case "rogue":
            MALGhost = PJData["MALRogueGhost"];

            if(MALGhost != "") 
                str += `{{MALspecial2=[[${i18n_ghostActive}]]}}`;
            break;
            
        case "warrior":
            MALTypeSoldier = PJData["MALWarriorSoldierA"];
            MALTypeHunter = PJData["MALWarriorHunterA"];
            MALTypeHerald = PJData["MALWarriorHeraldA"];
            MALTypeScholar = PJData["MALWarriorScholarA"];
            MALTypeScout = PJData["MALWarriorScoutA"];

            if(MALTypeSoldier != 0)
                str += `{{MALspecial2=[[${i18n_typeSoldier}]]}}`;       

            if(MALTypeHunter != 0)
                str += `{{MALspecial2=[[${i18n_typeHunter}]]}}`;

            if(MALTypeHerald != 0)
                str += `{{MALspecial2=[[${i18n_typeHerald}]]}}`;

            if(MALTypeScholar != 0)
                str += `{{MALspecial2=[[${i18n_typeScholar}]]}}`;

            if(MALTypeScout != 0)
                str += `{{MALspecial2=[[${i18n_typeScout}]]}}`;
            break;
    }

    if(ODInstinct > 1 && hasArmure) {
        startRoll(`${roll} {{special1=^{initiative} 1}} {{jDivers=^{resultat}}} {{jDiversV=[[${dice}D6+${bonus}+${bonusP}-${malus}]]}}`, (results) => {
            result1 = results.results.jDiversV.result;

            finishRoll(
                results.rollId,{}
            );

            startRoll(`${roll} {{special1=^{initiative} 2}} {{jDivers=^{resultat}}} {{jDiversV=[[${dice}D6+${bonus}+${bonusP}-${malus}]]}}`, (results) => {
                result2 = results.results.jDiversV.result;
    
                finishRoll(
                    results.rollId,{}
                );            

                resultF = Math.max(result1, result2);

                startRoll(`${roll} {{special1=^{initiative-finale}}} {{jDivers=^{resultat}}} {{jDiversV=[[${resultF} &{tracker}]]}} ${str}`, (results) => {        
                    finishRoll(
                        results.rollId,{}
                    );            
                });
            });
        });
    } else {
        startRoll(`${roll} {{special1=^{initiative}}} {{jDivers=^{resultat}}} {{jDiversV=[[${dice}D6+${bonus}+${bonusP}-${malus} &{tracker}]]}} ${str}`, (results) => {        
            finishRoll(
                results.rollId,{}
            );            
        });
    }
});

const nods = ["nodsSoin", "nodsArmure", "nodsEnergie"]

nods.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value;

        let actuel = 0;
        let max = 0;

        switch(button) {
            case "nodsSoin":
                actuel = PJData["santepj"];
                max = PJData["santepj_max"];
                break;
            case "nodsArmure":
                actuel = PJData["armurePJ"];
                max = PJData["armurePJ_max"];
                break;
            case "nodsEnergie":
                actuel = PJData["energiePJ"];
                max = PJData["energiePJ_max"];
                break;
        }

        startRoll(`${roll} {{jDivers=^{recupere}}} {{jDiversV=[[3D6]]}}`, (results) => {        
            let recup = Number(results.results.jDiversV.result);
            let total = actuel+recup;

            if(total > max)
                total = max;

            switch(button) {
                case "nodsSoin":
                    setAttrs({
                        santepj: total
                    });
                    break;
                case "nodsArmure":
                    setAttrs({
                        armurePJ: total
                    });
                    break;
                case "nodsEnergie":
                    setAttrs({
                        energiePJ: total
                    });
                    break;
            }

            finishRoll(
                results.rollId,{}
            );            
        });
    });
});

on(`clicked:blessuresGraves`, function(info) {
    let roll = info.htmlAttributes.value;

    startRoll(`${roll} {{rollTitre=[[1D6]]}} {{rollText=[[1D6]]}}`, (results) => { 
        let D1 = Number(results.results.rollTitre.result);
        let D2 = Number(results.results.rollText.result);

        let titre = "";
        let text = "";
        
        switch(D1) {
            case 1:
                switch(D2) {
                    case 1:
                        titre = getTranslationByKey("blessures-mort");
                        text = getTranslationByKey("blessures-mort-description");
                        break;

                    case 2:
                        titre = getTranslationByKey("blessures-organes-internes");
                        text = getTranslationByKey("blessures-organes-internes-touches-description");
                        break;

                    case 3:
                        titre = getTranslationByKey("blessures-cerveau-touche");
                        text = getTranslationByKey("blessures-cerveau-touche-description");
                        break;

                    case 4:
                        titre = getTranslationByKey("blessures-colonne-vertebrale-touchee");
                        text = getTranslationByKey("blessures-colonne-vertebrale-touchee-description");
                        break;

                    case 5:
                        titre = getTranslationByKey("blessures-hemorragie-interne");
                        text = getTranslationByKey("blessures-hemorragie-interne-description");
                        break;

                    case 6:
                        titre = getTranslationByKey("blessures-poumons-perfores");
                        text = getTranslationByKey("blessures-poumons-perfores-description");
                        break;
                }
                break;

            case 2:
            case 3:
                switch(D2) {
                    case 1:
                        titre = getTranslationByKey("blessures-crane-brise");
                        text = getTranslationByKey("blessures-crane-brise-description");
                        break;

                    case 2:
                        titre = getTranslationByKey("blessures-yeux-detruits");
                        text = getTranslationByKey("blessures-yeux-detruits-description");
                        break;

                    case 3:
                        titre = getTranslationByKey("blessures-dos-brise");
                        text = getTranslationByKey("blessures-dos-brise-description");
                        break;

                    case 4:
                        titre = getTranslationByKey("blessures-main-brise");
                        text = getTranslationByKey("blessures-main-brise-description");
                        break;

                    case 5:
                        titre = getTranslationByKey("blessures-oreille-eclatee");
                        text = getTranslationByKey("blessures-oreille-eclatee-description");
                        break;

                    case 6:
                        titre = getTranslationByKey("blessures-cotes-brisees");
                        text = getTranslationByKey("blessures-cotes-brisees-description");
                        break;
                }
                break;
        
            case 4:
            case 5:
                switch(D2) {
                    case 1:
                        titre = getTranslationByKey("blessures-colonne-vertebrale-brisee");
                        text = getTranslationByKey("blessures-colonne-vertebrale-brisee-description");
                        break;

                    case 2:
                        titre = getTranslationByKey("blessures-machoire-langue-dents-detruites");
                        text = getTranslationByKey("blessures-machoire-langue-dents-detruites-description");
                        break;

                    case 3:
                        titre = getTranslationByKey("blessures-pied-brise");
                        text = getTranslationByKey("blessures-pied-brise-description");
                        break;

                    case 4:
                        titre = getTranslationByKey("blessures-dos-touche");
                        text = getTranslationByKey("blessures-dos-touche-description");
                        break;

                    case 5:
                        titre = getTranslationByKey("blessures-tempe-touchee");
                        text = getTranslationByKey("blessures-tempe-touchee-description");
                        break;

                    case 6:
                        titre = getTranslationByKey("blessures-blessure-mineure");
                        text = getTranslationByKey("blessures-blessure-mineure-description");
                        break;
                }
                break;

            case 6:
                switch(D2) {
                    case 1:
                        titre = getTranslationByKey("blessures-bras-mutile");
                        text = getTranslationByKey("blessures-bras-mutile-description");
                        break;

                    case 2:
                        titre = getTranslationByKey("blessures-jambe-mutilee");
                        text = getTranslationByKey("blessures-jambe-mutilee-description");
                        break;

                    case 3:
                        titre = getTranslationByKey("blessures-traumatisme-cranien");
                        text = getTranslationByKey("blessures-traumatisme-cranien-description");
                        break;

                    case 4:
                        titre = getTranslationByKey("blessures-borgne");
                        text = getTranslationByKey("blessures-borgne-description");
                        break;

                    case 5:
                        titre = getTranslationByKey("blessures-blessure-mineure");
                        text = getTranslationByKey("blessures-blessure-mineure-description");
                        break;

                    case 6:
                        titre = getTranslationByKey("blessures-rien");
                        text = getTranslationByKey("blessures-rien-description");
                        break;
                }
                break;
        }

        finishRoll(
            results.rollId,{
                rollTitre:titre,
                rollText:text
            }
        );            
    });
});

on(`clicked:traumas`, function(info) {
    let roll = info.htmlAttributes.value;

    startRoll(`${roll}`, (results) => { 
        let D1 = Number(results.results.rollTitre.result);
        let D2 = Number(results.results.rollText.result);

        let titre = "";
        let text = "";
        
        switch(D1) {
            case 0:
                switch(D2) {
                    case 1:
                        titre = getTranslationByKey("traumas-anxiete");
                        text = getTranslationByKey("traumas-anxiete-description");
                        break;

                    case 2:
                        titre = getTranslationByKey("traumas-tic");
                        text = getTranslationByKey("traumas-tic-description");
                        break;

                    case 3:
                        titre = getTranslationByKey("traumas-perte-confiance");
                        text = getTranslationByKey("traumas-perte-confiance-description");
                        break;

                    case 4:
                        titre = getTranslationByKey("traumas-peur-monstre");
                        text = getTranslationByKey("traumas-peur-monstre-description");
                        break;

                    case 5:
                        titre = getTranslationByKey("traumas-rituel");
                        text = getTranslationByKey("traumas-rituel-description");
                        break;

                    case 6:
                        titre = getTranslationByKey("traumas-collection");
                        text = getTranslationByKey("traumas-collection-description");
                        break;
                }
                break;

            case 1:
                switch(D2) {
                    case 1:
                        titre = getTranslationByKey("traumas-faiblesse");
                        text = getTranslationByKey("traumas-faiblesse-description");
                        break;

                    case 2:
                        titre = getTranslationByKey("traumas-somatisation");
                        text = getTranslationByKey("traumas-somatisation-description");
                        break;

                    case 3:
                        titre = getTranslationByKey("traumas-distanciation");
                        text = getTranslationByKey("traumas-distanciation-description");
                        break;

                    case 4:
                        titre = getTranslationByKey("traumas-reveries");
                        text = getTranslationByKey("traumas-reveries-description");
                        break;

                    case 5:
                        titre = getTranslationByKey("traumas-hypersensibilite");
                        text = getTranslationByKey("traumas-hypersensibilite-description");
                        break;

                    case 6:
                        titre = getTranslationByKey("traumas-trouble-sensitif");
                        text = getTranslationByKey("traumas-trouble-sensitif-description");
                        break;
                }
                break;

            case 2:
                switch(D2) {
                    case 1:
                        titre = getTranslationByKey("traumas-dissociation");
                        text = getTranslationByKey("traumas-dissociation-description");
                        break;

                    case 2:
                        titre = getTranslationByKey("traumas-depression");
                        text = getTranslationByKey("traumas-depression-description");
                        break;

                    case 3:
                        titre = getTranslationByKey("traumas-paranoia");
                        text = getTranslationByKey("traumas-paranoia-description");
                        break;

                    case 4:
                        titre = getTranslationByKey("traumas-trouble-memoriel");
                        text = getTranslationByKey("traumas-trouble-memoriel-description");
                        break;

                    case 5:
                        titre = getTranslationByKey("traumas-addiction");
                        text = getTranslationByKey("traumas-addiction-description");
                        break;

                    case 6:
                        titre = getTranslationByKey("traumas-hallucinations");
                        text = getTranslationByKey("traumas-hallucinations-description");
                        break;
                }
                break;

            case 3:
                switch(D2) {
                    case 1:
                        titre = getTranslationByKey("traumas-anatheme");
                        text = getTranslationByKey("traumas-anatheme-description");
                        break;

                    case 2:
                        titre = getTranslationByKey("traumas-abattement");
                        text = getTranslationByKey("traumas-abattement-description");
                        break;

                    case 3:
                        titre = getTranslationByKey("traumas-decouragement");
                        text = getTranslationByKey("traumas-decouragement-description");
                        break;

                    case 4:
                        titre = getTranslationByKey("traumas-oubli");
                        text = getTranslationByKey("traumas-oubli-description");
                        break;

                    case 5:
                        titre = getTranslationByKey("traumas-phobie-sociale");
                        text = getTranslationByKey("traumas-phobie-sociale-description");
                        break;

                    case 6:
                        titre = getTranslationByKey("traumas-perte-controle");
                        text = getTranslationByKey("traumas-perte-controle-description");
                        break;
                }
                break;
        }

        finishRoll(
            results.rollId,{
                rollTitre:titre,
                rollText:text
            }
        );            
    });
});