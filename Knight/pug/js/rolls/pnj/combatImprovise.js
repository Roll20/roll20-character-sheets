for(let i = 0;i < rollCombatImprovise;i++) {
    let str = `AIPNJ${i}`;

    on(`clicked:${str}`, function(info) {
        let roll = info.htmlAttributes.value;

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

        let exec = [];
        exec.push(roll);

        let isConditionnelA = false;
        let isConditionnelD = false;
        let isConditionnelV = false;

        let cBase = [];
        let cRoll = [];
        let bonus = [];
        
        let type = PNJData["utilisationArmeAIPNJ"];
        let mod = PJData["jetModifDes"];

        let baseDegats = dDgts;
        let baseViolence = dViolence;

        let diceDegats = baseDegats;
        let diceViolence = baseDegats;

        let bDegats = 0;
        let bViolence = 0;

        let aspectNom = "Chair";

        let vChair = Number(AspectValue["Chair"].value);
        let vBete = Number(AspectValue["Bete"].value);
        let vBeteAEMin = Number(AspectValue["Bete"].AEMin);
        let vBeteAEMaj = Number(AspectValue["Bete"].AEMaj);
        let vMasque = AspectValue["Masque"].value;

        let vBeteD = 0;

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let autresEffets = [];

        let aspectValue = Number(AspectValue[aspectNom].value);
        let AE = Number(AspectValue[aspectNom].AEMin)+Number(AspectValue[aspectNom].AEMaj);

        cBase.push(AspectNom[aspectNom]);
        cRoll.push(aspectValue);
        exec.push(`{{vAE=${AE}}}`);

        if(mod != 0) {
            cRoll.push(mod);
            exec.push("{{mod="+mod+"}}");
        }

        //GESTION DES BONUS DE BASE
        if(type == "&{template:combat} {{portee=^{portee-contact}}}") {
            if(vChair > 0) {
                let vChairD = Math.ceil(vChair/2);
    
                bDegats += vChairD;
                exec.push(`{{vChair=${vChairD}}}`);
            }
        }

        //FIN GESTION DES BONUS DE BASE

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

        if(vBeteD > 0)
            exec.push(`{{vBeteD=${vBeteD}}}`);

        //FIN GESTION DES ASPECTS EXCEPTIONNELS

        let capacitesFM = PNJData["capaciteFanMade"];
        let attaquesOmbres = PNJData["attaqueOmbre"];

        if(attaquesOmbres != "0" && capacitesFM != "0") {
            isConditionnelD = true;

            attaquesSurprises.push(i18n_attaquesOmbres);
            attaquesSurprisesValue.push(vMasque);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`;
        }

        if(cRoll.length == 0)
            cRoll.push(0);

        if(bonus.length == 0)
            bonus.push(0);

        bonus = bonus.concat(AE);

        if(cBase.length != 0)
            exec.push("{{cBase="+cBase.join(" - ")+"}}");

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

        exec.push(jet);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        exec.push(`{{degats=[[${diceDegats}D6+${bDegats}]]}}`);
        exec.push(`{{violence=[[${diceViolence}D6+${bViolence}]]}}`);

        if(attaquesSurprises.length > 0) {
            exec.push("{{attaqueSurprise="+attaquesSurprises.join("\n+")+"}}");
            exec.push("{{attaqueSurpriseValue=[["+attaquesSurprisesValue.join("+")+"]]}}");
            exec.push(attaquesSurprisesCondition);
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
