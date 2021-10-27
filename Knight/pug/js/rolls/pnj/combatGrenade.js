
const rollCombatGrenadePNJ = ["grenade1PNJ", "grenade2PNJ", "grenade3PNJ", "grenade4PNJ", "grenade5PNJ"];

rollCombatGrenadePNJ.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value;

        var hasDgts = true;
        var hasLumiere = false;

        if(button == "grenade2" || button == "grenade4")
            hasDgts = false;

        if(button == "grenade2")
            hasLumiere = true;

        let firstExec = [];
        let exec = [];
        firstExec.push(roll);

        let isConditionnelA = false;
        let isConditionnelD = false;
        let isConditionnelV = false;

        let cBase = [];
        let cRoll = [];
        let bonus = [];

        let AE = 0;

        let vBeteD = 0;
        
        let ameliorations = false;
        
        let diceDegats = 3;
        let diceViolence = 3;

        let bDegats = 0;
        let bViolence = 0;

        let listAttrs = [
            `jetModifDes`,
            `aspectPNJGrenade`,
            `Masque`,
            `capaciteFanMade`,
            `attaqueOmbre`,
            `grenadeAvancee`,
        ];

        let attrs = await getAttrsAsync(listAttrs);
        let attrsAspect = [];

        let mod = +attrs["jetModifDes"];

        if(attrs["grenadeAvancee"] != "0")
            ameliorations = true;

        let vMasque = +attrs["Masque"];

        let aspect = attrs[`aspectPNJGrenade`] || "0";
        
        let aspectNom = "";

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let capacitesFM = attrs["capaciteFanMade"];
        let attaquesOmbres = attrs["attaqueOmbre"];

        let autresEffets = [];

        if(aspect != "0") {
            aspectNom = aspect.slice(2, -1);

            attrsAspect = await getAttrsAsync([
                aspectNom,
                `${aspectNom}PNJAE`,
                `${aspectNom}PNJAEMaj`,
            ]);

            let aspectValue = +attrsAspect[aspectNom];
            AE = totalAspect(attrsAspect, aspectNom);

            cBase.push(AspectNom[aspectNom]);
            cRoll.push(aspectValue);

            exec.push("{{vAE="+AE+"}}");
        };

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

        //GESTION DES EFFETS

        switch(button) {
            case "grenade1PNJ":
                isConditionnelD = true;
                isConditionnelV = true;

                firstExec.push("{{ultraviolenceValue=[[2D6]]}} {{meurtrierValue=[[2D6]]}}");

                exec.push("{{ultraviolence="+i18n_ultraviolence+"}} {{ultraviolenceCondition="+i18n_ultraviolenceCondition+"}} {{meurtrier="+i18n_meurtrier+"}} {{meurtrierCondition="+i18n_meurtrierCondition+"}}");
                autresEffets.push(i18n_dispersion+" 6");
                break;
            case "grenade2PNJ":
                isConditionnelA = true;
        
                exec.push("{{choc="+i18n_choc+" 1}} {{chocCondition="+i18n_chocCondition+"}}");
                autresEffets.push(i18n_barrage+" 2");
                autresEffets.push(i18n_lumiere+" 2");
                autresEffets.push(i18n_dispersion+" 6");
                break;
            case "grenade3PNJ":
                isConditionnelD = true;

                firstExec.push("{{destructeurValue=[[2D6]]}}");

                exec.push("{{destructeur="+i18n_destructeur+"}} {{destructeurCondition="+i18n_destructeurCondition+"}}");
                autresEffets.push(i18n_perceArmure+" 20");
                autresEffets.push(i18n_penetrant+" 6");
                autresEffets.push(i18n_dispersion+" 6");
                break;
            case "grenade4PNJ":
                isConditionnelA = true;

                exec.push("{{parasitage="+i18n_parasitage+" 2"+"}} {{parasitageCondition="+i18n_parasitageCondition+"}}");
                autresEffets.push(i18n_dispersion+" 6");
                hasDgts = false;
                break;
            case "grenade5PNJ":
                isConditionnelA = true;
        
                exec.push("{{choc="+i18n_choc+" 1}} {{chocCondition="+i18n_chocCondition+"}} {{grenadeExplosive="+i18n_surVehicule+"}} {{grenadeExplosiveD=[[3D6]]}}");
                autresEffets.push(i18n_antiVehicule);
                autresEffets.push(i18n_dispersion+" 3");
                break;
        }

        if(attaquesOmbres != "0" && capacitesFM != "0") {
            isConditionnelD = true;
            
            attaquesSurprises.push(i18n_attaquesOmbres);
            attaquesSurprisesValue.push(vMasque);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = `{{attaqueSurpriseCondition=${i18n_attaqueSurpriseCondition}}}`;
        }

        //FIN GESTION DES EFFETS

        if(cRoll.length == 0)
            cRoll.push(0);

        if(bonus.length == 0)
            bonus.push(0);

        bonus.push(AE);

        if(hasDgts) {
            if(diceDegats < 0)
                diceDegats = 0;

            if(diceViolence < 0)
                diceViolence = 0;
                
            exec.push(`{{degats=[[${diceDegats}D6+${bDegats}]]}}`);
            exec.push(`{{violence=[[${diceViolence}D6+${bViolence}]]}}`);
        }

        if(cBase.length != 0)
            exec.push("{{cBase="+cBase.join(" - ")+"}}");

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

        firstExec.push(jet);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        if(attaquesSurprises.length > 0 && hasDgts) {
            exec.push("{{attaqueSurprise="+attaquesSurprises.join("\n+")+"}}");
            exec.push("{{attaqueSurpriseValue=[["+attaquesSurprisesValue.join("+")+"]]}}");
            exec.push(`${attaquesSurprisesCondition}`);
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