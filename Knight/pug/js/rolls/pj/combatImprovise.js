const rollCombatImprovise = 14;

for(let i = 0;i < rollCombatImprovise;i++) {
    let str = `AI${i}`;

    on(`clicked:${str}`, function(info) {
        let roll = info.htmlAttributes.value;
        let armure = donneesPJ["Armure"];
        let armureL = donneesPJ["ArmureLegende"];

        var hasArmure = true;

        let dDgts = 0;
        let dViolence = 0;

        switch(i) {
            case 1:
                dDgts = 4;
                dViolence = 4;
                break;

            case 2:
                dDgts = 2;
                dViolence = 5;
                break;

            case 3:
                dDgts = 4;
                dViolence = 4;
                break;

            case 4:
                dDgts = 6;
                dViolence = 4;
                break;

            case 5:
                dDgts = 4;
                dViolence = 6;
                break;

            case 6:
                dDgts = 5;
                dViolence = 5;
                break;

            case 7:
                dDgts = 7;
                dViolence = 5;
                break;

            case 8:
                dDgts = 5;
                dViolence = 7;
                break;

            case 9:
                dDgts = 6;
                dViolence = 6;
                break;

            case 10:
                dDgts = 7;
                dViolence = 9;
                break;

            case 11:
                dDgts = 8;
                dViolence = 8;
                break;

            case 12:
                dDgts = 10;
                dViolence = 12;
                break;

            case 13:
                dDgts = 11;
                dViolence = 11;
                break;

            default:
                dDgts = 0;
                dViolence = 0;
                break;
        }

        if(armure == "sans" || armure == "guardian")
            hasArmure = false;

        let exec = [];
        exec.push(roll);

        let isConditionnelA = false;
        let isConditionnelD = false;
        let isConditionnelV = false;

        let cBase = [];
        let cBonus = [];
        let cRoll = [];
        let bonus = [];

        let OD = 0;
        
        let type = PJData["utilisationArmeAI"];
        let mod = PJData["jetModifDes"];
        let hasBonus = PJData["bonusCarac"];

        let baseDegats = dDgts;
        let baseViolence = dViolence;

        let diceDegats = baseDegats;
        let diceViolence = baseDegats;

        let bDegats = [];
        let bViolence = [];

        let degats = [];
        let violence = [];

        let C1Nom;
        let C2Nom;

        let C3 = PJData[`caracteristique3ArmeImprovisee`];
        let C4 = PJData[`caracteristique4ArmeImprovisee`];
        
        if(type == "&{template:combat} {{portee=^{portee-contact}}}") {
            C1Nom = "force";
            C2Nom = "combat";
        } else {
            C1Nom = "force";
            C2Nom = "tir";
        }

        let C3Nom = C3.slice(2, -1);
        let C4Nom = C4.slice(2, -1);

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
        let oTir = CaracValue["tir"].VraiOD;
        let oCombat = CaracValue["combat"].VraiOD;

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let autresEffets = [];
        if(hasArmure)
            exec.push("{{OD=true}}");

        let C1Value = Number(CaracValue[C1Nom].value);
        let C1OD = Number(CaracValue[C1Nom].OD);

        cBase.push(CaracNom[C1Nom]);
        cRoll.push(C1Value);

        if(hasArmure)
            OD += C1OD;

        let C2Value = Number(CaracValue[C2Nom].value);
        let C2OD = Number(CaracValue[C2Nom].OD);

        cBase.push(CaracNom[C2Nom]);
        cRoll.push(C2Value);

        if(hasArmure)
            OD += C2OD;

        if(hasBonus == 1 || hasBonus == 2) {
            if(C3 != "0") {
                let C3Value = Number(CaracValue[C3Nom].value);
                let C3OD = Number(CaracValue[C3Nom].OD);

                cBonus.push(CaracNom[C3Nom]);
                cRoll.push(C3Value);

                if(hasArmure)
                    OD += C3OD;
            }

            if(hasBonus == 2) {
                if(C4 != "0") {
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
        if(type == "&{template:combat} {{portee=^{portee-contact}}}") {
            let dForce = vForce;

            if(hasArmure)
                dForce += oForce*3;

            bDegats.push(dForce);
            exec.push("{{vForce="+dForce+"}}");
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

        //GESTION DU STYLE
        let getStyle;

        if(type == "&{template:combat} {{portee=^{portee-contact}}}") {
            getStyle = getStyleContactMod(PJData, "", baseDegats, baseViolence, hasArmure, oCombat, false, false, false, false, false, false, false, false, false);
        } else {
            getStyle = getStyleDistanceMod(PJData, baseDegats, baseViolence, 0, hasArmure, oTir, false, false, false, false);
        }

        exec = exec.concat(getStyle.exec);
        cRoll = cRoll.concat(getStyle.cRoll);
        diceDegats += getStyle.diceDegats;
        diceViolence += getStyle.diceViolence;

        //FIN GESTION DU STYLE

        //GESTION DES BONUS D'ARMURE

        let armorBonus = getArmorBonus(PJData, armure, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

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

        console.log(bonus);

        let MALBonus = getMALBonus(PJData, armureL, false, false, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom);

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

        console.log(bonus);

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

        console.log(armorBonus);
        console.log(MALBonus);

        degats.push(`${diceDegats}D6`);
        degats = degats.concat(bDegats);

        violence.push(`${diceViolence}D6`);
        violence = violence.concat(bViolence);

        if(cBase.length != 0)
            exec.push("{{cBase="+cBase.join(" - ")+"}}");

        if(cBonus.length != 0)
            exec.push("{{cBonus="+cBonus.join(" - ")+"}}");

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

        exec.push(jet);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        exec.push("{{degats=[["+degats.join("+")+"]]}}");
        exec.push("{{violence=[["+violence.join("+")+"]]}}");

        if(attaquesSurprises.length > 0) {
            exec.push("{{attaqueSurprise="+attaquesSurprises.join("\n+")+"}}");
            exec.push("{{attaqueSurpriseValue=[["+attaquesSurprisesValue.join("+")+"]]}}");
            exec.push(attaquesSurprisesCondition);
        }

        if(armure == "berserk") {
            isConditionnelD = true;
            isConditionnelV = true;
    
            exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}}");
            exec.push("{{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

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

            exec.push("{{tenebricide="+i18n_tenebricide+"}}");
            exec.push("{{tenebricideConditionD="+i18n_tenebricideConditionD+"}}");
            exec.push("{{tenebricideConditionV="+i18n_tenebricideConditionV+"}}");

            if(attaquesSurprises.length > 0) {

                ASTenebricide = ASTenebricide.concat(attaquesSurprises);
                ASValueTenebricide = ASValueTenebricide.concat(attaquesSurprisesValue);

                exec.push("{{tenebricideAS="+ASTenebricide.join("\n+")+"}}");
                exec.push("{{tenebricideASValue=[["+ASValueTenebricide.join("+")+"]]}}");
            }
        }

        if(autresEffets.length > 0) {
            autresEffets.sort();
            exec.push("{{effets="+autresEffets.join(" / ")+"}}");
        }           

        if(isConditionnelA)
            exec.push("{{succesConditionnel=true}}");

        if(isConditionnelD)
            exec.push("{{degatsConditionnel=true}}");

        if(isConditionnelV)
            exec.push("{{violenceConditionnel=true}}");

        console.log(exec);

        startRoll(exec.join(" "), (results) => {
            let tJet = results.results.jet.result;

            let tBonus = results.results.bonus.result;
            let tExploit = results.results.Exploit.result;

            finishRoll(
                results.rollId, 
                {
                    jet:tJet+tBonus
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
}
