
const rollCombatGrenade = ["grenade1", "grenade2", "grenade3", "grenade4", "grenade5"];

rollCombatGrenade.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value;
        let armure = donneesPJ["Armure"];
        let armureL = donneesPJ["ArmureLegende"];

        var hasArmure = true;
        var hasDgts = true;
        var hasLumiere = false;

        if(button == "grenade2" || button == "grenade4")
            hasDgts = false;

        if(button == "grenade2")
            hasLumiere = true;

        if(armure == "sans" || armure == "guardian")
            hasArmure = false;

        let firstExec = [];
        let exec = [];
        firstExec.push(roll);

        let isConditionnelA = false;
        let isConditionnelD = false;
        let isConditionnelV = false;

        let cBase = [];
        let cBonus = [];
        let cRoll = [];
        let bonus = [];

        let OD = 0;
        
        let ameliorations = false;

        if(PJData["grenadeAvancee"] != "0")
            ameliorations = true;
        
        let mod = PJData["jetModifDes"];
        let hasBonus = PJData["bonusCarac"];

        let diceDegats = 3;
        let diceViolence = 3;

        let bDegats = [];
        let bViolence = [];

        let degats = [];
        let violence = [];

        let listAttrs = [
            "caracteristique1Grenade",
            "caracteristique2Grenade",
            "caracteristique3Grenade",
            "caracteristique4Grenade"
        ]

        let attrs = await asw.getAttrs(listAttrs);

        let C1 = attrs[`caracteristique1Grenade`] || "0";
        let C2 = attrs[`caracteristique2Grenade`] || "0";
        let C3 = attrs[`caracteristique3Grenade`] || "0";
        let C4 = attrs[`caracteristique4Grenade`] || "0";
        
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

        let vDiscretion = CaracValue["discretion"].value;
        let oDiscretion = CaracValue["discretion"].VraiOD;
        let oTir = CaracValue["tir"].VraiOD;

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let isTenebricide = false;

        let autresEffets = [];

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
        if(ameliorations) {
            diceDegats += 2;
            diceViolence += 2;
            
            exec.push("{{vGrenadesAmeliorees=+2D}}");
        }

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

        //GESTION DES EFFETS

        switch(button) {
            case "grenade1":
                isConditionnelD = true;
                isConditionnelV = true;

                firstExec.push("{{ultraviolenceValue=[[2D6]]}} {{meurtrierValue=[[2D6]]}}");

                exec.push("{{ultraviolence="+i18n_ultraviolence+"}} {{ultraviolenceCondition="+i18n_ultraviolenceCondition+"}} {{meurtrier="+i18n_meurtrier+"}} {{meurtrierCondition="+i18n_meurtrierCondition+"}}");
                autresEffets.push(i18n_dispersion+" 6");
                break;
            case "grenade2":
                isConditionnelA = true;
        
                exec.push("{{choc="+i18n_choc+" 1}} {{chocCondition="+i18n_chocCondition+"}}");
                autresEffets.push(i18n_barrage+" 2");
                autresEffets.push(i18n_lumiere+" 2");
                autresEffets.push(i18n_dispersion+" 6");
                break;
            case "grenade3":
                isConditionnelD = true;

                firstExec.push("{{destructeurValue=[[2D6]]}}");

                exec.push("{{destructeur="+i18n_destructeur+"}} {{destructeurCondition="+i18n_destructeurCondition+"}}");
                autresEffets.push(i18n_perceArmure+" 20");
                autresEffets.push(i18n_penetrant+" 6");
                autresEffets.push(i18n_dispersion+" 6");
                break;
            case "grenade4":
                isConditionnelA = true;

                exec.push("{{parasitage="+i18n_parasitage+" 2"+"}} {{parasitageCondition="+i18n_parasitageCondition+"}}");
                autresEffets.push(i18n_dispersion+" 6");
                hasDgts = false;
                break;
            case "grenade5":
                isConditionnelA = true;
        
                exec.push("{{choc="+i18n_choc+" 1}} {{chocCondition="+i18n_chocCondition+"}} {{grenadeExplosive="+i18n_surVehicule+"}} {{grenadeExplosiveD=[[3D6]]}}");
                autresEffets.push(i18n_antiVehicule);
                autresEffets.push(i18n_dispersion+" 3");
                break;
        }

        //FIN GESTION DES EFFETS

        //GESTION DU STYLE

        let getStyle = getStyleDistanceMod(PJData, diceDegats, diceViolence, "", hasArmure, oTir, false, false, false, false);

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        diceDegats += getStyle.diceDegats;
        diceViolence += getStyle.diceViolence;

        //FIN GESTION DU STYLE

        //GESTION DES BONUS D'ARMURE

        let armorBonus = getArmorBonus(PJData, armure, hasLumiere, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

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
        ODShaman = ODShaman.concat(armorBonus.ODShaman);
        ODWarrior = ODWarrior.concat(armorBonus.ODWarrior);

        if(armure == "berserk") {
            isTenebricide = true;
            isConditionnelD = true;
            isConditionnelV = true;

            exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}} {{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");
        }

        let MALBonus = getMALBonus(PJData, armureL, hasLumiere, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

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

        if(hasDgts) {
            degats.push(`${diceDegats}D6`);
            degats = degats.concat(bDegats);

            violence.push(`${diceViolence}D6`);
            violence = violence.concat(bViolence);

            exec.push("{{degats=[["+degats.join("+")+"]]}}");
            exec.push("{{violence=[["+violence.join("+")+"]]}}");
        }

        if(cBase.length != 0)
            exec.push("{{cBase="+cBase.join(" - ")+"}}");

        if(cBonus.length != 0)
            exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

        firstExec.push(jet);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        if(isTenebricide && hasDgts) {
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

            if(attaquesSurprises.length > 0) {

                ASTenebricide = ASTenebricide.concat(attaquesSurprises);
                ASValueTenebricide = ASValueTenebricide.concat(attaquesSurprisesValue);

                exec.push("{{tenebricideAS="+ASTenebricide.join("\n+")+"}}");
                exec.push("{{tenebricideASValue=[["+ASValueTenebricide.join("+")+"]]}}");
            }
        }

        if(attaquesSurprises.length > 0 && hasDgts) {
            exec.push("{{attaqueSurprise="+attaquesSurprises.join("\n+")+"}}");
            exec.push("{{attaqueSurpriseValue=[["+attaquesSurprisesValue.join("+")+"]]}}");
            exec.push(`{{attaqueSurpriseCondition=${attaquesSurprisesCondition}}}`);
        }

        if(autresEffets.length > 0) {
            autresEffets.sort();
            exec.push("{{effets="+autresEffets.join(" / ")+"}}");
        }           

        if(isConditionnelA)
            exec.push("{{succesConditionnel=true}}");

        if(isConditionnelD && hasDgts)
            exec.push("{{degatsConditionnel=true}}");

        if(isConditionnelV && hasDgts)
            exec.push("{{violenceConditionnel=true}}");

        exec = firstExec.concat(exec);

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
        });
        
    });
});