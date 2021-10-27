const rollCombatAutrePNJ = ["repeating_armeautre:armeautrepnj"];

rollCombatAutrePNJ.forEach(button => {
    on(`clicked:${button}`, async function(info) {
        let roll = info.htmlAttributes.value;

        let listAttrs = [];

        let id = info.triggerName.split("_")[2];

        let prefix = `repeating_armeautre_${id}_`;

        let effet = wpnEffects.map(a => `${prefix}${a}`);
        let effetValue = wpnEffectsValue.map(a => `${prefix}${a}`);
        let AA = wpnAmeliorationA.map(a => `${prefix}${a}`);
        let AAValue = wpnAmeliorationAValue.map(a => `${prefix}${a}`);
        let special = wpnSpecial.map(a => `${prefix}${a}`);
        let specialValue = wpnSpecialValue.map(a => `${prefix}${a}`);

        listAttrs.push(`${prefix}ArmeAutre`);
        listAttrs.push(`${prefix}armeAutrePortee`);

        listAttrs.push(`${prefix}armeODAutre`);
        listAttrs.push(`${prefix}armeAttaqueAutre`);

        listAttrs.push(`${prefix}armeAutreDegat`);
        listAttrs.push(`${prefix}armeAutreViolence`);

        listAttrs.push(`${prefix}armeAutreBDegat`);
        listAttrs.push(`${prefix}armeAutreBViolence`);

        listAttrs = listAttrs.concat(effet, effetValue, AA, AAValue, special, specialValue);

        let attrs = await getAttrsAsync(listAttrs);

        let name = attrs[`${prefix}ArmeAutre`] || ``;
        let portee = attrs[`${prefix}armeAutrePortee`] || `^{portee-contact}`;

        let firstExec = [];
        let exec = [];
        firstExec.push(roll);

        firstExec.push("{{special1="+name+"}}");
        firstExec.push("{{portee=^{portee} "+portee+"}}");

        let isConditionnelA = false;
        let isConditionnelD = false;
        let isConditionnelV = false;

        let OD = Number(attrs[`${prefix}armeODAutre`]) || 0;

        let cRoll = [
            Number(attrs[`${prefix}armeAttaqueAutre`]) || 0
        ];
        
        let bonus = [
            OD
        ];

        let baseDegats = 0;
        let baseViolence = 0;

        let diceDegats = 0;
        let diceViolence = 0;

        let bDegats = [];
        let bViolence = [];

        baseDegats += Number(attrs[`armeAutreDegat`]) || 0;
        baseViolence += Number(attrs[`armeAutreViolence`]) || 0;

        diceDegats += Number(attrs[`armeAutreDegat`]) || 0;
        diceViolence += Number(attrs[`armeAutreViolence`]) || 0;

        bDegats.push(Number(attrs[`armeAutreBDegat`]) || 0);
        bViolence.push(Number(attrs[`armeAutreBViolence`]) || 0);

        let degats = [];
        let violence = [];

        let attaquesSurprises = [];
        let attaquesSurprisesValue = [];
        let attaquesSurprisesCondition = "";

        let eASAssassin = "";
        let eASAssassinValue = 0; 

        let isAssistantAttaque = false;
        let isAntiAnatheme = false;
        let isCadence = false;
        let sCadence = 0;
        let vCadence = 0;
        let isChoc = false;
        let isDeuxMains = false;
        let isDestructeur = false;
        let vDestructeur = 0;
        let isLeste = false;     
        let isLourd = false;
        let isMeurtrier = false;
        let vMeurtrier = 0;
        let nowSilencieux = false;  
        let isObliteration = false;   
        let isOrfevrerie = false;  
        let isTenebricide = false;
        let isTirRafale = false;
        let isChambreDouble = false;

        let lumiere = "";
        let isELumiere = false
        let lumiereValue = 0;

        let isEAkimbo = false;
        let isEAmbidextrie = false;

        let autresEffets = [];
        let autresAmeliorationsA = [];
        let autresSpecial = [];

        //GESTION DES EFFETS

        var effets = getWeaponsEffectsAutrePNJ(prefix, attrs);

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

        isDeuxMains = effets.isDeuxMains;
        isLourd = effets.isLourd;

        isLeste = effets.isLeste;

        isMeurtrier = effets.isMeurtrier;
        vMeurtrier = effets.vMeurtrier;

        nowSilencieux = effets.nowSilencieux;

        isOrfevrerie = effets.isOrfevrerie;

        isTenebricide = effets.isTenebricide;

        isObliteration = effets.isObliteration;
        isTirRafale = effets.isTirRafale;

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

        //GESTION DES AMELIORATIONS D'ARMES

        var ameliorationsA = getWeaponsAutreAA(prefix, attrs, isAssistantAttaque, eASAssassinValue, isCadence, vCadence, nowSilencieux, isTirRafale, isObliteration, isAntiAnatheme);
        
        exec = exec.concat(ameliorationsA.exec);

        bonus = bonus.concat(ameliorationsA.bonus);

        baseDegats += ameliorationsA.diceDegats;
        baseViolence += ameliorationsA.diceViolence;

        diceDegats += ameliorationsA.diceDegats;
        diceViolence += ameliorationsA.diceViolence;

        bDegats = bDegats.concat(ameliorationsA.bDegats);

        attaquesSurprises = attaquesSurprises.concat(ameliorationsA.attaquesSurprises);
        attaquesSurprisesValue = attaquesSurprisesValue.concat(ameliorationsA.attaquesSurprisesValue);

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = ameliorationsA.attaquesSurprisesCondition;

        if(ameliorationsA.isChambreDouble) {
            isCadence = false;
            isChambreDouble = ameliorationsA.isChambreDouble;
            sCadence = ameliorationsA.rChambreDouble;
        }

        if(ameliorationsA.isJAkimbo)
            isEAkimbo = ameliorationsA.isJAkimbo;
        
        if(ameliorationsA.isJAmbidextre)  
            isEAmbidextrie = ameliorationsA.isJAmbidextre;

        autresEffets = autresEffets.concat(ameliorationsA.autresEffets);
        autresAmeliorationsA = autresAmeliorationsA.concat(ameliorationsA.autresAmeliorations);

        if(ameliorationsA.aASAssassin != "") {
            eASAssassin = ameliorationsA.aASAssassin;
            eASAssassinValue = ameliorationsA.aASAssassinValue;
        }
            
        if(ameliorationsA.isConditionnelA)
            isConditionnelA = true;

        if(ameliorationsA.isConditionnelD)
            isConditionnelD = true;

        if(ameliorationsA.isConditionnelV)
            isConditionnelV = true;

        //FIN GESTION DES AMELIORATIONS D'ARMES

        //GESTION DES BONUS SPECIAUX

        let sBonusDegats = isApplied(attrs[`${prefix}BDDiversTotal`]);
        let sBonusDegatsD6 = attrs[`${prefix}BDDiversD6`];
        let sBonusDegatsFixe = attrs[`${prefix}BDDiversFixe`];

        let sBonusViolence = isApplied(attrs[`${prefix}BVDiversTotal`]);
        let sBonusViolenceD6 = attrs[`${prefix}BVDiversD6`];
        let sBonusViolenceFixe = attrs[`${prefix}BVDiversFixe`];

        let sEnergie = isApplied(attrs[`${prefix}energie`]);
        let sEnergieValue = attrs[`${prefix}energieValue`];

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
            autresSpecial.push(`^{energie} (${sEnergieValue})`);
        }

        //FIN DE GESTION DES BONUS SPECIAUX

        if(cRoll.length == 0)
            cRoll.push(0);

        if(bonus.length == 0)
            bonus.push(0);
        
        exec.push(`{{OD=true}}`);
        exec.push(`{{vOD=${OD}}}`);

        if(diceDegats < 0)
            diceDegats = 0;

        if(diceViolence < 0)
            diceViolence = 0;

        degats.push(`${diceDegats}D6`);
        degats = degats.concat(bDegats);

        violence.push(`${diceViolence}D6`);
        violence = violence.concat(bViolence);

        var jet = "{{jet=[[ {{[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}";

        firstExec.push(jet);
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");
        exec.push("{{bonus=[["+bonus.join("+")+"]]}}");

        exec.push("{{degats=[["+degats.join("+")+"]]}}");
        exec.push("{{violence=[["+violence.join("+")+"]]}}");

        if(isTenebricide) {
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
        }

        if(isCadence) {
            exec.push("{{rCadence="+i18n_cadence+" "+vCadence+" "+i18n_inclus+"}}");
            exec.push("{{vCadence="+sCadence+"D}}");
        }

        if(isChambreDouble) {
            exec.push("{{rCadence="+i18n_chambreDouble+" ("+i18n_cadence+" 2) "+i18n_inclus+"}}");
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

        if(autresEffets.length > 0) {
            autresEffets.sort();
            exec.push("{{effets="+autresEffets.join(" / ")+"}}");
        }

        if(autresAmeliorationsA.length > 0) {
            autresAmeliorationsA.sort();
            exec.push("{{ameliorations="+autresAmeliorationsA.join(" / ")+"}}");
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

        if(effets.exec)
            exec = exec.concat(effets.exec);
        
        if(effets.firstExec)
            firstExec = firstExec.concat(effets.firstExec); 

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
            
            let tFureur = results.results.fureurValue;
            let vTFureur = 0;

            if(tFureur != undefined)
                vTFureur = tFureur.dice[0]+tFureur.dice[1];
            
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
                    fureurValue:vTFureur,
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