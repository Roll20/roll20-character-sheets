const asw = (() => {
    const setActiveCharacterId = function(charId){
        let oldAcid=getActiveCharacterId();
        let ev = new CustomEvent("message");
        ev.data={"id":"0", "type":"setActiveCharacter", "data":charId};
        self.dispatchEvent(ev);
        return oldAcid;
    };
    const promisifyWorker = (worker, parameters) => {
        let acid=getActiveCharacterId(); 
        let prevAcid=null;               
        return new Promise((res,rej)=>{
            prevAcid=setActiveCharacterId(acid);  
            try {if (worker===0) getAttrs(parameters[0]||[],(v)=>res(v));
                else if (worker===1) setAttrs(parameters[0]||{}, parameters[1]||{},(v)=>res(v));
                else if (worker===2) getSectionIDs(parameters[0]||'',(v)=>res(v));
            } catch(err) {rej(console.error(err))}
        }).finally(()=>setActiveCharacterId(prevAcid));
    }
    return {
        getAttrs(attrArray) {return promisifyWorker(0, [attrArray])},
        setAttrs(attrObj, options) {return promisifyWorker(1, [attrObj, options])},
        getSectionIDs(section) {return promisifyWorker(2, [section])},
        setActiveCharacterId,
    }
})();

const wpnContactData = [
    "ArmeCaC",
    "armeCaCDegat", "armeCaCBDegat",
    "armeCaCViolence", "armeCaCBViolence",
    "armeCaCPortee", "aspectPNJ",
    "caracteristique1Equipement",
    "caracteristique2Equipement",
    "caracteristique3Equipement",
    "caracteristique4Equipement",
    "caracteristiqueSPrecis"
]

const wpnDistanceData = [
    "ArmeDist",
    "armeDistDegat", "armeDistBDegat",
    "armeDistViolence", "armeDistBViolence",
    "armeDistPortee", "aspectPNJ",
    "caracteristique1Equipement",
    "caracteristique2Equipement",
    "caracteristique3Equipement",
    "caracteristique4Equipement",
    "pilonnage"
]

const wpnAutreData = [
    "ArmeAutre",
    "armeAutreDegat", "armeAutreBDegat",
    "armeAutreViolence", "armeAutreBViolence",
    "armeAutrePortee",
    "armeAttaqueAutre",
    "armeODAutre",
]

const wpnEffects = [
    "akimbo", "ambidextrie", "anatheme", "antiAnatheme", "antiVehicule", "artillerie", "assassin", "assistanceAttaque", 
    "barrage", "cadence", "chargeur", "choc", "defense", "degatContinue", "deuxMains", "demoralisant",
    "designation", "destructeur", "dispersion", "enChaine", "esperance", "fureur", "ignoreArmure", 
    "ignoreCdF", "leste", "lestePNJ", "lourd", "lumiere", "meurtrier", "obliteration",
    "orfevrerie", "orfevreriePNJ", "parasitage", "penetrant", "perceArmure", "precision", "precisionPNJ", "reaction", "silencieux", "soumission", "tenebricite",
    "tirRafale", "tirSecurite", "ultraViolence"
];

const wpnEffectsValue = [
    "assassinValue", "barrageValue", "cadenceValue", "chargeurValue", "chocValue", 
    "defenseValue", "degatContinueValue", "dispersionValue", "lumiereValue", "parasitageValue",
    "penetrantValue", "perceArmureValue", "reactionValue"
];

const wpnAmeliorationS = [
    "agressive", "allegee", "assassine", "barbelee",
    "connectee", "electrifiee", "indestructible", "jumelle",
    "lumineuse", "massive", "protectrice", "soeur", "sournoise", "surmesure", 
    "sournoisePNJ", "surmesurePNJ"
];

const wpnAmeliorationO = [
    "arabesquesIridescentes", "armeAzurine", "armeRougeSang", "armureGravee",
    "blasonChevalier", "bouclierGrave", "cheneSculpte", "chromeeLignesLC", 
    "codeKnightGrave", "craneRieurGrave", "faucheuseGravee", "fauconsPlumesL",
    "flammesStylisees", "griffuresGravees", "masqueBriseSculpte", "rouagesCassesGraves",
    "sillonsFLF"
];

const wpnAmeliorationA = [
    "chargeurGrappes", "canonLong", "canonRaccourci", "chambreDouble", "interfaceGuidage",
    "jumelage", "lunetteIntelligente", "munitionsHyperVelocite", "munitionsDrone",
    "chargeurExplosives", "munitionsIEM", "munitionsNonLetales", "munitionsSubsoniques",
    "pointeurLaser", "protectionArme", "revetementOmega", "structureElement", "systemeRefroidissement"
]

const wpnAmeliorationAValue = [
    "jumelageValue", "jumelageType"
]

const wpnSpecial = [
    "BDDiversTotal", "BVDiversTotal", "energie"
];

const wpnSpecialValue = [
    "BDDiversD6", "BDDiversFixe", "BVDiversD6", "BVDiversFixe", "energieValue"
];

function isApplied(e) {
    let result = false;

    if(e != "0")
        result = e;

    return result;
}

function getWeaponsEffects(prefix, effet, hasArmure, armure, vForce, vDexterite, oDexterite, vDiscretion, oDiscretion, vTir, oTir) {
    let result = {};

    let exec = [];
    let firstExec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";

    let bDegats = [];
    let autresEffets = [];

    let rCadence = 0;
    let vCadence = 0;
    let eASAssassin = "";
    let eASAssassinValue = 0;

    let eLumiereS = "";
    let eLumiereValue = 0;

    let isAntiAnatheme = false;
    let isAssistantAttaque = false;
    let isAkimbo = false;
    let isAmbidextrie = false;
    let isCadence = false;
    let isChoc = false;
    let isDestructeur = false;
    let isDeuxMains = false;
    let isLeste = false;
    let isLourd = false;
    let isELumiere = false;
    let isMeurtrier = false;
    let isObliteration = false;
    let isOrfevrerie = false;
    let isSilencieux = false;
    let isTenebricide = false;
    let isTirRafale = false;

    let eAntiAnatheme = isApplied(effet[`${prefix}antiAnatheme`]);
    let eAntiVehicule = isApplied(effet[`${prefix}antiVehicule`]);
    let eArtillerie = isApplied(effet[`${prefix}artillerie`]);
    let eAssassin = isApplied(effet[`${prefix}assassin`]);
    let eAssassinV = effet[`${prefix}assassinValue`] || 0;
    let eAssistanceAttaque = isApplied(effet[`${prefix}assistanceAttaque`]);
    let eBarrage = isApplied(effet[`${prefix}barrage`]);
    let eBarrageV = effet[`${prefix}barrageValue`] || 0;
    let eCadence = isApplied(effet[`${prefix}cadence`]);
    let eCadenceV = effet[`${prefix}cadenceValue`] || 0;
    let eChargeur = isApplied(effet[`${prefix}eChargeur`]);
    let eChargeurV = effet[`${prefix}chargeurValue`] || 0;
    let eChoc = isApplied(effet[`${prefix}choc`]);
    let eChocV = effet[`${prefix}chocValue`] || 0;
    let eDefense = isApplied(effet[`${prefix}eDefense`]);
    let eDefenseV = effet[`${prefix}defenseValue`] || 0;
    let eDegatsContinus = isApplied(effet[`${prefix}degatContinue`]);
    let eDegatsContinusV = effet[`${prefix}degatContinueValue`] || 0;
    let eDeuxMains = isApplied(effet[`${prefix}deuxMains`]);
    let eDemoralisant = isApplied(effet[`${prefix}eDemoralisant`]);
    let eDesignation = isApplied(effet[`${prefix}designation`]);
    let eDestructeur = isApplied(effet[`${prefix}destructeur`]);
    let eDestructeurV = 2;
    let eDispersion = isApplied(effet[`${prefix}dispersion`]);
    let eDispersionV = effet[`${prefix}dispersionValue`] || 0;
    let eEnChaine = isApplied(effet[`${prefix}enChaine`]);
    let eEsperance = isApplied(effet[`${prefix}esperance`]);
    let eFureur = isApplied(effet[`${prefix}fureur`]);
    let eFureurV = 4;
    let eIgnoreArmure = isApplied(effet[`${prefix}ignoreArmure`]);
    let eIgnoreCDF = isApplied(effet[`${prefix}ignoreCdF`]);
    let eJAkimbo = isApplied(effet[`${prefix}akimbo`]);
    let eJAmbidextrie = isApplied(effet[`${prefix}ambidextrie`]);
    let eLeste = isApplied(effet[`${prefix}leste`]);
    let eLourd = isApplied(effet[`${prefix}lourd`]);
    let eLumiere = isApplied(effet[`${prefix}lumiere`]);
    let eLumiereV = effet[`${prefix}lumiereValue`] || 0;
    let eMeurtrier = isApplied(effet[`${prefix}meurtrier`]);
    let eMeurtrierV = 2;
    let eObliteration = isApplied(effet[`${prefix}obliteration`]);
    let eOrfevrerie = isApplied(effet[`${prefix}orfevrerie`]);
    let eParasitage = isApplied(effet[`${prefix}parasitage`]);
    let eParasitageV = effet[`${prefix}parasitageValue`] || 0;
    let ePenetrant = isApplied(effet[`${prefix}penetrant`]);
    let ePenetrantV = effet[`${prefix}penetrantValue`] || 0;
    let ePerceArmure = isApplied(effet[`${prefix}perceArmure`]);
    let ePerceArmureV = effet[`${prefix}perceArmureValue`] || 0;
    let ePrecision = isApplied(effet[`${prefix}precision`]);
    let eReaction = isApplied(effet[`${prefix}reaction`]);
    let eReactionV = effet[`${prefix}reactionValue`] || 0;
    let eSilencieux = isApplied(effet[`${prefix}silencieux`]);
    let eSoumission = isApplied(effet[`${prefix}soumission`]);
    let eTenebricide = isApplied(effet[`${prefix}tenebricite`]);
    let eTirRafale = isApplied(effet[`${prefix}tirRafale`]);
    let eTirSecurite = isApplied(effet[`${prefix}tirSecurite`]);
    let eUltraviolence = isApplied(effet[`${prefix}ultraViolence`]);
    let eUltraviolenceV = 2;


    if(eAntiAnatheme || armure == "berserk") {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}} {{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

        isAntiAnatheme = true;
    }
    
    if(eAssistanceAttaque) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{assistanceAttaque="+i18n_assistanceAttaque+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");

        isAssistantAttaque = true;
    }
    
    if(eArtillerie) {
        isConditionnelA = true;

        exec.push("{{artillerie="+i18n_artillerie+"}} {{artillerieCondition="+i18n_artillerieCondition+"}}");
    }
    
    if(eAssassin) {
        isConditionnelD = true;

        eASAssassin = i18n_assassin;
        eASAssassinValue = eAssassinV;

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
    }

    if(eCadence) { 
        rCadence = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
        isCadence = true;
        vCadence = eCadenceV;
    }

    if(eChoc) {
        isConditionnelA = true;

        exec.push("{{choc="+i18n_choc+" "+eChocV+"}} {{chocCondition="+i18n_chocCondition+"}}");
    }
                
    if(eDemoralisant) {
        isConditionnelA = true;

        exec.push("{{demoralisant="+i18n_demoralisant+"}} {{demoralisantCondition="+i18n_demoralisantCondition+"}}");
    }
                
    if(eDestructeur) {
        isConditionnelD = true;

        firstExec.push("{{destructeurValue=[["+eDestructeurV+"D6]]}}");

        exec.push("{{destructeur="+i18n_destructeur+"}} {{destructeurCondition="+i18n_destructeurCondition+"}}");

        isDestructeur = true;
    }
    
    if(eEnChaine) {
        isConditionnelD = true;

        exec.push("{{enChaine="+i18n_enChaine+"}} {{enChaineCondition="+i18n_enChaineCondition+"}}");
    }
    
    if(eEsperance) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{esperance="+i18n_esperance+"}} {{esperanceConditionD="+i18n_esperanceConditionD+"}} {{esperanceConditionV="+i18n_esperanceConditionV+"}}");
    }
            
    if(eFureur) {
        isConditionnelV = true;

        firstExec.push("{{fureurValue=[["+eFureurV+"D6]]}}");

        exec.push("{{fureur="+i18n_fureur+"}} {{fureurCondition="+i18n_fureurCondition+"}}");
    }
            
    if(eLeste) {
        bDegats.push(vForce);
        exec.push("{{vLeste="+vForce+"}}");
        isLeste = true;
    }
            
    if(eMeurtrier) {
        isConditionnelD = true;

        firstExec.push("{{meurtrierValue=[["+eMeurtrierV+"D6]]}}");

        exec.push("{{meurtrier="+i18n_meurtrier+"}} {{meurtrierCondition="+i18n_meurtrierCondition+"}}");        

        isMeurtrier = true;
    }
            
    if(eObliteration) {
        isConditionnelD = true;

        exec.push("{{obliteration="+i18n_obliteration+"}} {{obliterationCondition="+i18n_obliterationCondition+"}}");

        isObliteration = true;
    }
            
    if(eOrfevrerie) {
        let vOrfevrerie = vDexterite;

        if(hasArmure)
            vOrfevrerie += oDexterite;

        bDegats.push(vOrfevrerie);
        exec.push("{{vOrfevrerie="+vOrfevrerie+"}}");

        isOrfevrerie = true;
    }
            
    if(eParasitage) {
        isConditionnelA = true;

        exec.push("{{parasitage="+i18n_parasitage+" "+eParasitageV+"}} {{parasitageCondition="+i18n_parasitageCondition+"}}");
    }
            
    if(ePrecision) {
        isConditionnelD = true;

        let vPrecision = vTir;

        if(hasArmure)
            vPrecision += oTir;

        bDegats.push(vPrecision);
        exec.push("{{vPrecision="+vPrecision+"}}");
    }

    if(eSilencieux || prefix == "pS" || prefix == "pSC") {
        let totalSilencieux = vDiscretion;
        isConditionnelD = true;

        if(hasArmure)
            totalSilencieux += oDiscretion;

        attaquesSurprises.push(i18n_silencieux);
        attaquesSurprisesValue.push(totalSilencieux);
        isSilencieux = true;

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
    }

    if(eSoumission) {
        isConditionnelA = true;

        exec.push("{{soumission="+i18n_soumission+"}} {{soumissionCondition="+i18n_soumissionCondition+"}}");
    }
    
    if(eTenebricide || armure == "berserk") {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{tenebricide="+i18n_tenebricide+"}} {{tenebricideConditionD="+i18n_tenebricideConditionD+"}} {{tenebricideConditionV="+i18n_tenebricideConditionV+"}}");

        isTenebricide = true;
    }

    if(eTirRafale) {
        isConditionnelD = true;
        isTirRafale = true;

        exec.push("{{tirRafale="+i18n_tirRafale+"}} {{tirRafaleCondition="+i18n_tirRafaleCondition+"}}");
    }
    
    if(eUltraviolence) {
        isConditionnelV = true;

        firstExec.push("{{ultraviolenceValue=[["+eUltraviolenceV+"D6]]}}");

        exec.push("{{ultraviolence="+i18n_ultraviolence+"}} {{ultraviolenceCondition="+i18n_ultraviolenceCondition+"}}");
    }

    if(eAntiVehicule) 
        autresEffets.push(i18n_antiVehicule);

    if(eBarrage) 
        autresEffets.push(i18n_barrage+" "+eBarrageV);

    if(eChargeur) 
        autresEffets.push(i18n_chargeur+" "+eChargeurV);

    if(prefix == "mE")
        autresEffets.push(i18n_chargeur+" 1");

    if(eDefense) 
        autresEffets.push(i18n_defense+" "+eDefenseV);
    
    if(eDegatsContinus) 
        autresEffets.push(i18n_degatsContinus+" "+eDegatsContinusV+" ([[1d6]] "+i18n_tours+")");

    if(prefix == "mE")  
        autresEffets.push(i18n_degatsContinus+" 3 ([[1d6]] "+i18n_tours+")");
    
    if(eDeuxMains) {
        autresEffets.push(i18n_deuxMains);
        isDeuxMains = true;
    }        
    
    if(eDesignation) 
        autresEffets.push(i18n_designation);

    if(eDispersion) 
        autresEffets.push(i18n_dispersion+" "+eDispersionV);

    if(prefix == "mE")  
        autresEffets.push(i18n_dispersion+" 3");

    if(eIgnoreArmure) 
        autresEffets.push(i18n_ignoreArmure);

    if(eIgnoreCDF) 
        autresEffets.push(i18n_ignoreCDF);

    if(eJAkimbo)  {
        isAkimbo = true;
        autresEffets.push(i18n_jAkimbo);
    }
        
    if(eJAmbidextrie)  {
        isAmbidextrie = true;
        autresEffets.push(i18n_jAmbidextrie);
    }

    if(eLourd) {
        autresEffets.push(i18n_lourd);
        isLourd = true;
    }

    if(eLumiere) {
        eLumiereS = i18n_lumiere;
        eLumiereValue = eLumiereV;
        isELumiere = true;
    }

    if(prefix == "mE")  {
        eLumiereS = i18n_lumiere;
        eLumiereValue = 2;
        isELumiere = true;
    }
    
    if(ePenetrant) 
        autresEffets.push(i18n_penetrant+" "+ePenetrantV);
    
    if(ePerceArmure) 
        autresEffets.push(i18n_perceArmure+" "+ePerceArmureV);
    
    if(prefix == "mEC") 
        autresEffets.push(i18n_perceArmure+" 40");
    
    if(eReaction) 
        autresEffets.push(i18n_reaction+" "+eReactionV);
    
    if(eTirSecurite) 
        autresEffets.push(i18n_tirSecurite);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["eASAssassin"] = eASAssassin;
    result["eASAssassinValue"] = eASAssassinValue;
    result["isCadence"] = isCadence;
    result["sCadence"] = rCadence;
    result["vCadence"] = vCadence;
    result["isTenebricide"] = isTenebricide;
    result["isObliteration"] = isObliteration;
    result["isMeurtrier"] = isMeurtrier;
    result["vMeurtrier"] = eMeurtrierV;
    result["isDestructeur"] = isDestructeur;
    result["vDestructeur"] = eDestructeurV;
    result["nowSilencieux"] = isSilencieux;
    result["isChoc"] = isChoc;
    result["isLeste"] = isLeste;
    result["isOrfevrerie"] = isOrfevrerie;
    result["isAssistantAttaque"] = isAssistantAttaque;
    result["isAntiAnatheme"] = isAntiAnatheme;
    result["isTirRafale"] = isTirRafale;
 
    result["eLumiere"] = eLumiere;
    result["isELumiere"] = isELumiere;
    result["eLumiereValue"] = eLumiereValue;

    result["isAkimbo"] = isAkimbo;
    result["isAmbidextrie"] = isAmbidextrie;
    result["isDeuxMains"] = isDeuxMains;
    result["isLourd"] = isLourd;

    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["bDegats"] = bDegats;

    result["exec"] = exec;
    result["firstExec"] = firstExec;
    result["autresEffets"] = autresEffets;

    return result;
}

function getWeaponsEffectsPNJ(prefix, data, addChair, vChair, vMachine, vMachineAE, vMasque, vMasqueAE) {
    let result = {};

    let exec = [];
    let firstExec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";

    let eASAssassin;
    let eASAssassinValue = 0;

    let bDegats = 0;
    let autresEffets = [];

    let isCadence = false;
    let rCadence = 0;
    let vCadence = 0;

    let isObliteration = false;
    let isTenebricide = false;

    let isAntiAnatheme = false;
    let isAssistanceAttaque = false;
    let isDestructeur = false;
    let isChoc = false;
    let isLeste = false;
    let isMeurtrier = false;
    let isOrfevrerie = false;
    let isSilencieux = false;
    
    let eAnatheme = isApplied(data[`${prefix}anatheme`]);
    let eAntiAnatheme = isApplied(data[`${prefix}antiAnatheme`]);
    let eAntiVehicule = isApplied(data[`${prefix}antiVehicule`]);
    let eArtillerie = isApplied(data[`${prefix}artillerie`]);
    let eAssassin = isApplied(data[`${prefix}assassin`]);
    let eAssassinV = data[`${prefix}assassinValue`] || 0;
    let eAssistanceAttaque = isApplied(data[`${prefix}assistanceAttaque`]);
    let eBarrage = isApplied(data[`${prefix}barrage`]);
    let eBarrageV = data[`${prefix}barrageValue`] || 0;
    let eCadence = isApplied(data[`${prefix}cadence`]);
    let eCadenceV = data[`${prefix}cadenceValue`] || 0;
    let eChargeur = isApplied(data[`${prefix}eChargeur`]);
    let eChargeurV = data[`${prefix}chargeurValue`] || 0;
    let eChoc = isApplied(data[`${prefix}choc`]);
    let eChocV = data[`${prefix}chocValue`] || 0;
    let eDefense = isApplied(data[`${prefix}eDefense`]);
    let eDefenseV = data[`${prefix}defenseValue`] || 0;
    let eDegatsContinus = isApplied(data[`${prefix}degatContinue`]);
    let eDegatsContinusV = data[`${prefix}degatContinueValue`] || 0;
    let eDeuxMains = isApplied(data[`${prefix}deuxMains`]);
    let eDemoralisant = isApplied(data[`${prefix}eDemoralisant`]);
    let eDesignation = isApplied(data[`${prefix}designation`]);
    let eDestructeur = isApplied(data[`${prefix}destructeur`]);
    let eDestructeurV = 2;
    let eDispersion = isApplied(data[`${prefix}dispersion`]);
    let eDispersionV = data[`${prefix}dispersionValue`] || 0;
    let eEnChaine = isApplied(data[`${prefix}enChaine`]);
    let eEsperance = isApplied(data[`${prefix}esperance`]);
    let eFureur = isApplied(data[`${prefix}fureur`]);
    let eFureurV = 4;
    let eIgnoreArmure = isApplied(data[`${prefix}ignoreArmure`]);
    let eIgnoreCDF = isApplied(data[`${prefix}ignoreCdF`]);
    let eJAkimbo = isApplied(data[`${prefix}akimbo`]);
    let eJAmbidextrie = isApplied(data[`${prefix}ambidextrie`]);
    let eLeste = isApplied(data[`${prefix}lestePNJ`]);
    let eLourd = isApplied(data[`${prefix}lourd`]);
    let eLumiere = isApplied(data[`${prefix}lumiere`]);
    let eLumiereV = data[`${prefix}lumiereValue`] || 0;
    let eMeurtrier = isApplied(data[`${prefix}meurtrier`]);
    let eMeurtrierV = 2;
    let eObliteration = isApplied(data[`${prefix}obliteration`]);
    let eOrfevrerie = isApplied(data[`${prefix}orfevreriePNJ`]);
    let eParasitage = isApplied(data[`${prefix}parasitage`]);
    let eParasitageV = data[`${prefix}parasitageValue`] || 0;
    let ePenetrant = isApplied(data[`${prefix}penetrant`]);
    let ePenetrantV = data[`${prefix}penetrantValue`] || 0;
    let ePerceArmure = isApplied(data[`${prefix}perceArmure`]);
    let ePerceArmureV = data[`${prefix}perceArmureValue`] || 0;
    let ePrecision = isApplied(data[`${prefix}precisionPNJ`]);
    let eReaction = isApplied(data[`${prefix}reaction`]);
    let eReactionV = data[`${prefix}reactionValue`] || 0;
    let eSilencieux = isApplied(data[`${prefix}silencieux`]);
    let eSoumission = isApplied(data[`${prefix}soumission`]);
    let eTenebricide = isApplied(data[`${prefix}tenebricite`]);
    let eTirRafale = isApplied(data[`${prefix}tirRafale`]);
    let eTirSecurite = isApplied(data[`${prefix}tirSecurite`]);
    let eUltraviolence = isApplied(data[`${prefix}ultraViolence`]);
    let eUltraviolenceV = 2;


    if(eAntiAnatheme) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}} {{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

        isAntiAnatheme = true;
    }
    
    if(eAssistanceAttaque) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{assistanceAttaque="+i18n_assistanceAttaque+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");

        isAssistanceAttaque = true;
    }
    
    if(eArtillerie) {
        isConditionnelA = true;

        exec.push("{{artillerie="+i18n_artillerie+"}} {{artillerieCondition="+i18n_artillerieCondition+"}}");
    }
    
    if(eAssassin) {
        isConditionnelD = true;

        eASAssassin = i18n_assassin;
        eASAssassinValue = eAssassinV;

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
    }

    if(eCadence) { 
        rCadence = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
        vCadence = eCadenceV;
    }

    if(eChoc) {
        isConditionnelA = true;

        exec.push("{{choc="+i18n_choc+" "+eChocV+"}} {{chocCondition="+i18n_chocCondition+"}}");

        isChoc = true;
    }
                
    if(eDemoralisant) {
        isConditionnelA = true;

        exec.push("{{demoralisant="+i18n_demoralisant+"}} {{demoralisantCondition="+i18n_demoralisantCondition+"}}");
    }
                
    if(eDestructeur) {
        isConditionnelD = true;

        firstExec.push("{{destructeurValue=[["+eDestructeurV+"D6]]}}");

        exec.push("{{destructeur="+i18n_destructeur+"}} {{destructeurCondition="+i18n_destructeurCondition+"}}");

        isDestructeur = true;
    }
    
    if(eEnChaine) {
        isConditionnelD = true;

        exec.push("{{enChaine="+i18n_enChaine+"}} {{enChaineCondition="+i18n_enChaineCondition+"}}");
    }
    
    if(eEsperance) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{esperance="+i18n_esperance+"}} {{esperanceConditionD="+i18n_esperanceConditionD+"}} {{esperanceConditionV="+i18n_esperanceConditionV+"}}");
    }
            
    if(eFureur) {
        isConditionnelV = true;

        firstExec.push("{{fureurValue=[["+eFureurV+"D6]]}}");

        exec.push("{{fureur="+i18n_fureur+"}} {{fureurCondition="+i18n_fureurCondition+"}}");
    }
            
    if(eLeste) {
        bDegats += Math.floor(vChair/2);

        if(addChair)
            exec.push("{{vLeste="+Math.floor(vChair/2)+"}}");
        else
            exec.push("{{vLeste="+vChair+"}}");

        isLeste = true;
    }
            
    if(eMeurtrier) {
        isConditionnelD = true;

        firstExec.push("{{meurtrierValue=[["+eMeurtrierV+"D6]]}}");

        exec.push("{{meurtrier="+i18n_meurtrier+"}} {{meurtrierCondition="+i18n_meurtrierCondition+"}}");
        
        isMeurtrier = true;
    }
            
    if(eObliteration) {
        isConditionnelD = true;

        exec.push("{{obliteration="+i18n_obliteration+"}} {{obliterationCondition="+i18n_obliterationCondition+"}}");

        isObliteration = true;
    }
            
    if(eOrfevrerie) {
        let vOrfevrerie = Math.ceil(vMasque/2);

        bDegats += vOrfevrerie;
        exec.push("{{vOrfevrerie="+vOrfevrerie+"}}");

        isOrfevrerie = true;
    }
            
    if(eParasitage) {
        isConditionnelA = true;

        exec.push("{{parasitage="+i18n_parasitage+" "+eParasitageV+"}} {{parasitageCondition="+i18n_parasitageCondition+"}}");
    }
            
    if(ePrecision) {
        isConditionnelD = true;

        let vPrecision = Math.ceil(vMachine/2)+vMachineAE;

        bDegats += vPrecision;
        exec.push("{{vPrecision="+vPrecision+"}}");
    }

    if(eSilencieux || prefix == "pS" || prefix == "pSC") {
        let totalSilencieux = Math.ceil(vMasque/2)+vMasqueAE;

        isConditionnelD = true;

        attaquesSurprises.push(i18n_silencieux);
        attaquesSurprisesValue.push(totalSilencieux);

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";

        isSilencieux = true;
    }

    if(eSoumission) {
        isConditionnelA = true;

        exec.push("{{soumission="+i18n_soumission+"}} {{soumissionCondition="+i18n_soumissionCondition+"}}");
    }
    
    if(eTenebricide || armure == "berserk") {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{tenebricide="+i18n_tenebricide+"}} {{tenebricideConditionD="+i18n_tenebricideConditionD+"}} {{tenebricideConditionV="+i18n_tenebricideConditionV+"}}");

        isTenebricide = true;
    }

    if(eTirRafale) {
        isConditionnelD = true;

        exec.push("{{tirRafale="+i18n_tirRafale+"}} {{tirRafaleCondition="+i18n_tirRafaleCondition+"}}");
    }
    
    if(eUltraviolence) {
        isConditionnelV = true;

        firstExec.push("{{ultraviolenceValue=[["+eUltraviolenceV+"D6]]}}");

        exec.push("{{ultraviolence="+i18n_ultraviolence+"}} {{ultraviolenceCondition="+i18n_ultraviolenceCondition+"}}");
    }

    if(eAnatheme) 
        autresEffets.push(i18n_anatheme);

    if(eAntiVehicule) 
        autresEffets.push(i18n_antiVehicule);

    if(eBarrage) 
        autresEffets.push(i18n_barrage+" "+eBarrageV);

    if(eChargeur) 
        autresEffets.push(i18n_chargeur+" "+eChargeurV);

    if(prefix == "mE") 
        autresEffets.push(i18n_chargeur+" 1");

    if(eDefense) 
        autresEffets.push(i18n_defense+" "+eDefenseV);
    
    if(eDegatsContinus) 
        autresEffets.push(i18n_degatsContinus+" "+eDegatsContinusV+" ([[1d6]] "+i18n_tours+")");

    if(prefix == "mE")
        autresEffets.push(i18n_degatsContinus+" 3 ([[1d6]] "+i18n_tours+")");
    
    if(eDeuxMains)
        autresEffets.push(i18n_deuxMains);   
    
    if(eDesignation) 
        autresEffets.push(i18n_designation);

    if(eDispersion) 
        autresEffets.push(i18n_dispersion+" "+eDispersionV);

    if(prefix == "mE")
        autresEffets.push(i18n_dispersion+" 3");

    if(eIgnoreArmure) 
        autresEffets.push(i18n_ignoreArmure);

    if(eIgnoreCDF) 
        autresEffets.push(i18n_ignoreCDF);

    if(eJAkimbo)
        autresEffets.push(i18n_jAkimbo);
        
    if(eJAmbidextrie)
        autresEffets.push(i18n_jAmbidextrie);

    if(eLourd)
        autresEffets.push(i18n_lourd);

    if(eLumiere)
        autresEffets.push(i18n_lumiere+" "+eLumiereV);
    
    if(prefix == "mE")
        autresEffets.push(i18n_lumiere+" 2");
    
    if(ePenetrant) 
        autresEffets.push(i18n_penetrant+" "+ePenetrantV);
    
    if(ePerceArmure) 
        autresEffets.push(i18n_perceArmure+" "+ePerceArmureV);
    
    if(prefix == "mEC") 
        autresEffets.push(i18n_perceArmure+" 40");
    
    if(eReaction) 
        autresEffets.push(i18n_reaction+" "+eReactionV);
    
    if(eTirSecurite) 
        autresEffets.push(i18n_tirSecurite);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["eASAssassin"] = eASAssassin;
    result["eASAssassinValue"] = eASAssassinValue;

    result["isCadence"] = isCadence;
    result["sCadence"] = rCadence;
    result["vCadence"] = vCadence;
    result["isTenebricide"] = isTenebricide;
    result["isObliteration"] = isObliteration;
    result["isAntiAnatheme"] = isAntiAnatheme;
    result["isAssistanceAttaque"] = isAssistanceAttaque;
    result["isChoc"] = isChoc;
    result["isDestructeur"] = isDestructeur;
    result["isLeste"] = isLeste;
    result["isMeurtrier"] = isMeurtrier;
    result["isOrfevrerie"] = isOrfevrerie;
    result["isSilencieux"] = isSilencieux;

    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["bDegats"] = bDegats;

    result["exec"] = exec;
    result["firstExec"] = firstExec;
    result["autresEffets"] = autresEffets;

    return result;
}

function getWeaponsEffectsAutre(prefix, effet) {
    let result = {};

    let exec = [];
    let firstExec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";

    let bDegats = [];
    let autresEffets = [];

    let rCadence = 0;
    let vCadence = 0;
    let eASAssassin = "";
    let eASAssassinValue = 0;

    let eLumiereS = "";
    let eLumiereValue = 0;

    let isAntiAnatheme = false;
    let isAssistantAttaque = false;
    let isAkimbo = false;
    let isAmbidextrie = false;
    let isCadence = false;
    let isChoc = false;
    let isDestructeur = false;
    let isDeuxMains = false;
    let isLeste = false;
    let isLourd = false;
    let isELumiere = false;
    let isMeurtrier = false;
    let isObliteration = false;
    let isOrfevrerie = false;
    let isSilencieux = false;
    let isTenebricide = false;
    let isTirRafale = false;

    let eAntiAnatheme = isApplied(effet[`${prefix}antiAnatheme`]);
    let eAntiVehicule = isApplied(effet[`${prefix}antiVehicule`]);
    let eArtillerie = isApplied(effet[`${prefix}artillerie`]);
    let eAssassin = isApplied(effet[`${prefix}assassin`]);
    let eAssassinV = effet[`${prefix}assassinValue`] || 0;
    let eAssistanceAttaque = isApplied(effet[`${prefix}assistanceAttaque`]);
    let eBarrage = isApplied(effet[`${prefix}barrage`]);
    let eBarrageV = effet[`${prefix}barrageValue`] || 0;
    let eCadence = isApplied(effet[`${prefix}cadence`]);
    let eCadenceV = effet[`${prefix}cadenceValue`] || 0;
    let eChargeur = isApplied(effet[`${prefix}eChargeur`]);
    let eChargeurV = effet[`${prefix}chargeurValue`] || 0;
    let eChoc = isApplied(effet[`${prefix}choc`]);
    let eChocV = effet[`${prefix}chocValue`] || 0;
    let eDefense = isApplied(effet[`${prefix}eDefense`]);
    let eDefenseV = effet[`${prefix}defenseValue`] || 0;
    let eDegatsContinus = isApplied(effet[`${prefix}degatContinue`]);
    let eDegatsContinusV = effet[`${prefix}degatContinueValue`] || 0;
    let eDeuxMains = isApplied(effet[`${prefix}deuxMains`]);
    let eDemoralisant = isApplied(effet[`${prefix}eDemoralisant`]);
    let eDesignation = isApplied(effet[`${prefix}designation`]);
    let eDestructeur = isApplied(effet[`${prefix}destructeur`]);
    let eDestructeurV = 2;
    let eDispersion = isApplied(effet[`${prefix}dispersion`]);
    let eDispersionV = effet[`${prefix}dispersionValue`] || 0;
    let eEnChaine = isApplied(effet[`${prefix}enChaine`]);
    let eEsperance = isApplied(effet[`${prefix}esperance`]);
    let eFureur = isApplied(effet[`${prefix}fureur`]);
    let eFureurV = 4;
    let eIgnoreArmure = isApplied(effet[`${prefix}ignoreArmure`]);
    let eIgnoreCDF = isApplied(effet[`${prefix}ignoreCdF`]);
    let eJAkimbo = isApplied(effet[`${prefix}akimbo`]);
    let eJAmbidextrie = isApplied(effet[`${prefix}ambidextrie`]);
    let eLeste = isApplied(effet[`${prefix}leste`]);
    let eLourd = isApplied(effet[`${prefix}lourd`]);
    let eLumiere = isApplied(effet[`${prefix}lumiere`]);
    let eLumiereV = effet[`${prefix}lumiereValue`] || 0;
    let eMeurtrier = isApplied(effet[`${prefix}meurtrier`]);
    let eMeurtrierV = 2;
    let eObliteration = isApplied(effet[`${prefix}obliteration`]);
    let eOrfevrerie = isApplied(effet[`${prefix}orfevrerie`]);
    let eParasitage = isApplied(effet[`${prefix}parasitage`]);
    let eParasitageV = effet[`${prefix}parasitageValue`] || 0;
    let ePenetrant = isApplied(effet[`${prefix}penetrant`]);
    let ePenetrantV = effet[`${prefix}penetrantValue`] || 0;
    let ePerceArmure = isApplied(effet[`${prefix}perceArmure`]);
    let ePerceArmureV = effet[`${prefix}perceArmureValue`] || 0;
    let ePrecision = isApplied(effet[`${prefix}precision`]);
    let eReaction = isApplied(effet[`${prefix}reaction`]);
    let eReactionV = effet[`${prefix}reactionValue`] || 0;
    let eSilencieux = isApplied(effet[`${prefix}silencieux`]);
    let eSoumission = isApplied(effet[`${prefix}soumission`]);
    let eTenebricide = isApplied(effet[`${prefix}tenebricite`]);
    let eTirRafale = isApplied(effet[`${prefix}tirRafale`]);
    let eTirSecurite = isApplied(effet[`${prefix}tirSecurite`]);
    let eUltraviolence = isApplied(effet[`${prefix}ultraViolence`]);
    let eUltraviolenceV = 2;


    if(eAntiAnatheme || armure == "berserk") {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}} {{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

        isAntiAnatheme = true;
    }
    
    if(eAssistanceAttaque) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{assistanceAttaque="+i18n_assistanceAttaque+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");

        isAssistantAttaque = true;
    }
    
    if(eArtillerie) {
        isConditionnelA = true;

        exec.push("{{artillerie="+i18n_artillerie+"}} {{artillerieCondition="+i18n_artillerieCondition+"}}");
    }
    
    if(eAssassin) {
        isConditionnelD = true;

        eASAssassin = i18n_assassin;
        eASAssassinValue = eAssassinV;

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
    }

    if(eCadence) { 
        rCadence = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
        isCadence = true;
        vCadence = eCadenceV;
    }

    if(eChoc) {
        isConditionnelA = true;

        exec.push("{{choc="+i18n_choc+" "+eChocV+"}} {{chocCondition="+i18n_chocCondition+"}}");
    }
                
    if(eDemoralisant) {
        isConditionnelA = true;

        exec.push("{{demoralisant="+i18n_demoralisant+"}} {{demoralisantCondition="+i18n_demoralisantCondition+"}}");
    }
                
    if(eDestructeur) {
        isConditionnelD = true;

        firstExec.push("{{destructeurValue=[["+eDestructeurV+"D6]]}}");

        exec.push("{{destructeur="+i18n_destructeur+"}} {{destructeurCondition="+i18n_destructeurCondition+"}}");

        isDestructeur = true;
    }
    
    if(eEnChaine) {
        isConditionnelD = true;

        exec.push("{{enChaine="+i18n_enChaine+"}} {{enChaineCondition="+i18n_enChaineCondition+"}}");
    }
    
    if(eEsperance) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{esperance="+i18n_esperance+"}} {{esperanceConditionD="+i18n_esperanceConditionD+"}} {{esperanceConditionV="+i18n_esperanceConditionV+"}}");
    }
            
    if(eFureur) {
        isConditionnelV = true;

        firstExec.push("{{fureurValue=[["+eFureurV+"D6]]}}");

        exec.push("{{fureur="+i18n_fureur+"}} {{fureurCondition="+i18n_fureurCondition+"}}");
    }
            
    if(eLeste) {
        autresEffets.push(i18n_leste);
        isLeste = true;
    }
            
    if(eMeurtrier) {
        isConditionnelD = true;

        firstExec.push("{{meurtrierValue=[["+eMeurtrierV+"D6]]}}");

        exec.push("{{meurtrier="+i18n_meurtrier+"}} {{meurtrierCondition="+i18n_meurtrierCondition+"}}");

        isMeurtrier = true;
    }
            
    if(eObliteration) {
        isConditionnelD = true;

        exec.push("{{obliteration="+i18n_obliteration+"}} {{obliterationCondition="+i18n_obliterationCondition+"}}");

        isObliteration = true;
    }
            
    if(eOrfevrerie) {
        autresEffets.push(i18n_orfevrerie)

        isOrfevrerie = true;
    }
            
    if(eParasitage) {
        isConditionnelA = true;

        exec.push("{{parasitage="+i18n_parasitage+" "+eParasitageV+"}} {{parasitageCondition="+i18n_parasitageCondition+"}}");
    }
            
    if(ePrecision) {
        isConditionnelD = true;

        autresEffets.push(i18n_precision);
    }

    if(eSilencieux) {
        isConditionnelD = true;

        autresEffets.push(i18n_silencieux);

        isSilencieux = true;
    }

    if(eSoumission) {
        isConditionnelA = true;

        exec.push("{{soumission="+i18n_soumission+"}} {{soumissionCondition="+i18n_soumissionCondition+"}}");
    }
    
    if(eTenebricide) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{tenebricide="+i18n_tenebricide+"}} {{tenebricideConditionD="+i18n_tenebricideConditionD+"}} {{tenebricideConditionV="+i18n_tenebricideConditionV+"}}");

        isTenebricide = true;
    }

    if(eTirRafale) {
        isConditionnelD = true;
        isTirRafale = true;

        exec.push("{{tirRafale="+i18n_tirRafale+"}} {{tirRafaleCondition="+i18n_tirRafaleCondition+"}}");
    }
    
    if(eUltraviolence) {
        isConditionnelV = true;

        firstExec.push("{{ultraviolenceValue=[["+eUltraviolenceV+"D6]]}}");

        exec.push("{{ultraviolence="+i18n_ultraviolence+"}} {{ultraviolenceCondition="+i18n_ultraviolenceCondition+"}}");
    }

    if(eAntiVehicule) 
        autresEffets.push(i18n_antiVehicule);

    if(eBarrage) 
        autresEffets.push(i18n_barrage+" "+eBarrageV);

    if(eChargeur) 
        autresEffets.push(i18n_chargeur+" "+eChargeurV);

    if(eDefense) 
        autresEffets.push(i18n_defense+" "+eDefenseV);
    
    if(eDegatsContinus) 
        autresEffets.push(i18n_degatsContinus+" "+eDegatsContinusV+" ([[1d6]] "+i18n_tours+")");
    
    if(eDeuxMains) {
        autresEffets.push(i18n_deuxMains);
        isDeuxMains = true;
    }
        
    
    if(eDesignation) 
        autresEffets.push(i18n_designation);

    if(eDispersion) 
        autresEffets.push(i18n_dispersion+" "+eDispersionV);

    if(eIgnoreArmure) 
        autresEffets.push(i18n_ignoreArmure);

    if(eIgnoreCDF) 
        autresEffets.push(i18n_ignoreCDF);

    if(eJAkimbo)  {
        isAkimbo = true;
        autresEffets.push(i18n_jAkimbo);
    }
        
    if(eJAmbidextrie)  {
        isAmbidextrie = true;
        autresEffets.push(i18n_jAmbidextrie);
    }

    if(eLourd) {
        autresEffets.push(i18n_lourd);
        isLourd = true;
    }

    if(eLumiere) {
        eLumiereS = i18n_lumiere;
        eLumiereValue = eLumiereV;
        isELumiere = true;
    }
    
    if(ePenetrant) 
        autresEffets.push(i18n_penetrant+" "+ePenetrantV);
    
    if(ePerceArmure) 
        autresEffets.push(i18n_perceArmure+" "+ePerceArmureV);
    
    if(eReaction) 
        autresEffets.push(i18n_reaction+" "+eReactionV);
    
    if(eTirSecurite) 
        autresEffets.push(i18n_tirSecurite);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["eASAssassin"] = eASAssassin;
    result["eASAssassinValue"] = eASAssassinValue;
    result["isCadence"] = isCadence;
    result["sCadence"] = rCadence;
    result["vCadence"] = vCadence;
    result["isTenebricide"] = isTenebricide;
    result["isObliteration"] = isObliteration;
    result["isMeurtrier"] = isMeurtrier;
    result["vMeurtrier"] = eMeurtrierV;
    result["isDestructeur"] = isDestructeur;
    result["vDestructeur"] = eDestructeurV;
    result["nowSilencieux"] = isSilencieux;
    result["isChoc"] = isChoc;
    result["isLeste"] = isLeste;
    result["isOrfevrerie"] = isOrfevrerie;
    result["isAssistantAttaque"] = isAssistantAttaque;
    result["isAntiAnatheme"] = isAntiAnatheme;
    result["isTirRafale"] = isTirRafale;
 
    result["eLumiere"] = eLumiere;
    result["isELumiere"] = isELumiere;
    result["eLumiereValue"] = eLumiereValue;

    result["isAkimbo"] = isAkimbo;
    result["isAmbidextrie"] = isAmbidextrie;
    result["isDeuxMains"] = isDeuxMains;
    result["isLourd"] = isLourd;

    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["bDegats"] = bDegats;

    result["exec"] = exec;
    result["firstExec"] = firstExec;
    result["autresEffets"] = autresEffets;

    return result;
}

function getWeaponsEffectsAutrePNJ(prefix, effet) {
    let result = {};

    let exec = [];
    let firstExec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";

    let bDegats = [];
    let autresEffets = [];

    let rCadence = 0;
    let vCadence = 0;
    let eASAssassin = "";
    let eASAssassinValue = 0;

    let eLumiereS = "";
    let eLumiereValue = 0;

    let isAntiAnatheme = false;
    let isAssistantAttaque = false;
    let isAkimbo = false;
    let isAmbidextrie = false;
    let isCadence = false;
    let isChoc = false;
    let isDestructeur = false;
    let isDeuxMains = false;
    let isLeste = false;
    let isLourd = false;
    let isELumiere = false;
    let isMeurtrier = false;
    let isObliteration = false;
    let isOrfevrerie = false;
    let isSilencieux = false;
    let isTenebricide = false;
    let isTirRafale = false;

    let eAnatheme = isApplied(effet[`${prefix}anatheme`]);
    let eAntiAnatheme = isApplied(effet[`${prefix}antiAnatheme`]);
    let eAntiVehicule = isApplied(effet[`${prefix}antiVehicule`]);
    let eArtillerie = isApplied(effet[`${prefix}artillerie`]);
    let eAssassin = isApplied(effet[`${prefix}assassin`]);
    let eAssassinV = effet[`${prefix}assassinValue`] || 0;
    let eAssistanceAttaque = isApplied(effet[`${prefix}assistanceAttaque`]);
    let eBarrage = isApplied(effet[`${prefix}barrage`]);
    let eBarrageV = effet[`${prefix}barrageValue`] || 0;
    let eCadence = isApplied(effet[`${prefix}cadence`]);
    let eCadenceV = effet[`${prefix}cadenceValue`] || 0;
    let eChargeur = isApplied(effet[`${prefix}eChargeur`]);
    let eChargeurV = effet[`${prefix}chargeurValue`] || 0;
    let eChoc = isApplied(effet[`${prefix}choc`]);
    let eChocV = effet[`${prefix}chocValue`] || 0;
    let eDefense = isApplied(effet[`${prefix}eDefense`]);
    let eDefenseV = effet[`${prefix}defenseValue`] || 0;
    let eDegatsContinus = isApplied(effet[`${prefix}degatContinue`]);
    let eDegatsContinusV = effet[`${prefix}degatContinueValue`] || 0;
    let eDeuxMains = isApplied(effet[`${prefix}deuxMains`]);
    let eDemoralisant = isApplied(effet[`${prefix}eDemoralisant`]);
    let eDesignation = isApplied(effet[`${prefix}designation`]);
    let eDestructeur = isApplied(effet[`${prefix}destructeur`]);
    let eDestructeurV = 2;
    let eDispersion = isApplied(effet[`${prefix}dispersion`]);
    let eDispersionV = effet[`${prefix}dispersionValue`] || 0;
    let eEnChaine = isApplied(effet[`${prefix}enChaine`]);
    let eEsperance = isApplied(effet[`${prefix}esperance`]);
    let eFureur = isApplied(effet[`${prefix}fureur`]);
    let eFureurV = 4;
    let eIgnoreArmure = isApplied(effet[`${prefix}ignoreArmure`]);
    let eIgnoreCDF = isApplied(effet[`${prefix}ignoreCdF`]);
    let eJAkimbo = isApplied(effet[`${prefix}akimbo`]);
    let eJAmbidextrie = isApplied(effet[`${prefix}ambidextrie`]);
    let eLeste = isApplied(effet[`${prefix}leste`]);
    let eLourd = isApplied(effet[`${prefix}lourd`]);
    let eLumiere = isApplied(effet[`${prefix}lumiere`]);
    let eLumiereV = effet[`${prefix}lumiereValue`] || 0;
    let eMeurtrier = isApplied(effet[`${prefix}meurtrier`]);
    let eMeurtrierV = 2;
    let eObliteration = isApplied(effet[`${prefix}obliteration`]);
    let eOrfevrerie = isApplied(effet[`${prefix}orfevrerie`]);
    let eParasitage = isApplied(effet[`${prefix}parasitage`]);
    let eParasitageV = effet[`${prefix}parasitageValue`] || 0;
    let ePenetrant = isApplied(effet[`${prefix}penetrant`]);
    let ePenetrantV = effet[`${prefix}penetrantValue`] || 0;
    let ePerceArmure = isApplied(effet[`${prefix}perceArmure`]);
    let ePerceArmureV = effet[`${prefix}perceArmureValue`] || 0;
    let ePrecision = isApplied(effet[`${prefix}precision`]);
    let eReaction = isApplied(effet[`${prefix}reaction`]);
    let eReactionV = effet[`${prefix}reactionValue`] || 0;
    let eSilencieux = isApplied(effet[`${prefix}silencieux`]);
    let eSoumission = isApplied(effet[`${prefix}soumission`]);
    let eTenebricide = isApplied(effet[`${prefix}tenebricite`]);
    let eTirRafale = isApplied(effet[`${prefix}tirRafale`]);
    let eTirSecurite = isApplied(effet[`${prefix}tirSecurite`]);
    let eUltraviolence = isApplied(effet[`${prefix}ultraViolence`]);
    let eUltraviolenceV = 2;


    if(eAntiAnatheme || armure == "berserk") {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{antiAnatheme="+i18n_antiAnatheme+"}} {{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");

        isAntiAnatheme = true;
    }
    
    if(eAssistanceAttaque) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{assistanceAttaque="+i18n_assistanceAttaque+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");

        isAssistantAttaque = true;
    }
    
    if(eArtillerie) {
        isConditionnelA = true;

        exec.push("{{artillerie="+i18n_artillerie+"}} {{artillerieCondition="+i18n_artillerieCondition+"}}");
    }
    
    if(eAssassin) {
        isConditionnelD = true;

        eASAssassin = i18n_assassin;
        eASAssassinValue = eAssassinV;

        if(attaquesSurprisesCondition == "")
            attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
    }

    if(eCadence) { 
        rCadence = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
        isCadence = true;
        vCadence = eCadenceV;
    }

    if(eChoc) {
        isConditionnelA = true;

        exec.push("{{choc="+i18n_choc+" "+eChocV+"}} {{chocCondition="+i18n_chocCondition+"}}");
    }
                
    if(eDemoralisant) {
        isConditionnelA = true;

        exec.push("{{demoralisant="+i18n_demoralisant+"}} {{demoralisantCondition="+i18n_demoralisantCondition+"}}");
    }
                
    if(eDestructeur) {
        isConditionnelD = true;

        firstExec.push("{{destructeurValue=[["+eDestructeurV+"D6]]}}");

        exec.push("{{destructeur="+i18n_destructeur+"}} {{destructeurCondition="+i18n_destructeurCondition+"}}");

        isDestructeur = true;
    }
    
    if(eEnChaine) {
        isConditionnelD = true;

        exec.push("{{enChaine="+i18n_enChaine+"}} {{enChaineCondition="+i18n_enChaineCondition+"}}");
    }
    
    if(eEsperance) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{esperance="+i18n_esperance+"}} {{esperanceConditionD="+i18n_esperanceConditionD+"}} {{esperanceConditionV="+i18n_esperanceConditionV+"}}");
    }
            
    if(eFureur) {
        isConditionnelV = true;

        firstExec.push("{{fureurValue=[["+eFureurV+"D6]]}}");

        exec.push("{{fureur="+i18n_fureur+"}} {{fureurCondition="+i18n_fureurCondition+"}}");
    }
            
    if(eLeste) {
        autresEffets.push(i18n_leste);
        isLeste = true;
    }
            
    if(eMeurtrier) {
        isConditionnelD = true;

        firstExec.push("{{meurtrierValue=[["+eMeurtrierV+"D6]]}}");

        exec.push("{{meurtrier="+i18n_meurtrier+"}} {{meurtrierCondition="+i18n_meurtrierCondition+"}}");

        isMeurtrier = true;
    }
            
    if(eObliteration) {
        isConditionnelD = true;

        exec.push("{{obliteration="+i18n_obliteration+"}} {{obliterationCondition="+i18n_obliterationCondition+"}}");

        isObliteration = true;
    }
            
    if(eOrfevrerie) {
        autresEffets.push(i18n_orfevrerie)

        isOrfevrerie = true;
    }
            
    if(eParasitage) {
        isConditionnelA = true;

        exec.push("{{parasitage="+i18n_parasitage+" "+eParasitageV+"}} {{parasitageCondition="+i18n_parasitageCondition+"}}");
    }
            
    if(ePrecision) {
        isConditionnelD = true;

        autresEffets.push(i18n_precision);
    }

    if(eSilencieux) {
        isConditionnelD = true;

        autresEffets.push(i18n_silencieux);

        isSilencieux = true;
    }

    if(eSoumission) {
        isConditionnelA = true;

        exec.push("{{soumission="+i18n_soumission+"}} {{soumissionCondition="+i18n_soumissionCondition+"}}");
    }
    
    if(eTenebricide) {
        isConditionnelD = true;
        isConditionnelV = true;

        exec.push("{{tenebricide="+i18n_tenebricide+"}} {{tenebricideConditionD="+i18n_tenebricideConditionD+"}} {{tenebricideConditionV="+i18n_tenebricideConditionV+"}}");

        isTenebricide = true;
    }

    if(eTirRafale) {
        isConditionnelD = true;
        isTirRafale = true;

        exec.push("{{tirRafale="+i18n_tirRafale+"}} {{tirRafaleCondition="+i18n_tirRafaleCondition+"}}");
    }
    
    if(eUltraviolence) {
        isConditionnelV = true;

        firstExec.push("{{ultraviolenceValue=[["+eUltraviolenceV+"D6]]}}");

        exec.push("{{ultraviolence="+i18n_ultraviolence+"}} {{ultraviolenceCondition="+i18n_ultraviolenceCondition+"}}");
    }

    if(eAnatheme) 
        autresEffets.push(i18n_anatheme);

    if(eAntiVehicule) 
        autresEffets.push(i18n_antiVehicule);

    if(eBarrage) 
        autresEffets.push(i18n_barrage+" "+eBarrageV);

    if(eChargeur) 
        autresEffets.push(i18n_chargeur+" "+eChargeurV);

    if(eDefense) 
        autresEffets.push(i18n_defense+" "+eDefenseV);
    
    if(eDegatsContinus) 
        autresEffets.push(i18n_degatsContinus+" "+eDegatsContinusV+" ([[1d6]] "+i18n_tours+")");
    
    if(eDeuxMains) {
        autresEffets.push(i18n_deuxMains);
        isDeuxMains = true;
    }
        
    
    if(eDesignation) 
        autresEffets.push(i18n_designation);

    if(eDispersion) 
        autresEffets.push(i18n_dispersion+" "+eDispersionV);

    if(eIgnoreArmure) 
        autresEffets.push(i18n_ignoreArmure);

    if(eIgnoreCDF) 
        autresEffets.push(i18n_ignoreCDF);

    if(eJAkimbo)  {
        isAkimbo = true;
        autresEffets.push(i18n_jAkimbo);
    }
        
    if(eJAmbidextrie)  {
        isAmbidextrie = true;
        autresEffets.push(i18n_jAmbidextrie);
    }

    if(eLourd) {
        autresEffets.push(i18n_lourd);
        isLourd = true;
    }

    if(eLumiere) {
        eLumiereS = i18n_lumiere;
        eLumiereValue = eLumiereV;
        isELumiere = true;
    }
    
    if(ePenetrant) 
        autresEffets.push(i18n_penetrant+" "+ePenetrantV);
    
    if(ePerceArmure) 
        autresEffets.push(i18n_perceArmure+" "+ePerceArmureV);
    
    if(eReaction) 
        autresEffets.push(i18n_reaction+" "+eReactionV);
    
    if(eTirSecurite) 
        autresEffets.push(i18n_tirSecurite);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["eASAssassin"] = eASAssassin;
    result["eASAssassinValue"] = eASAssassinValue;
    result["isCadence"] = isCadence;
    result["sCadence"] = rCadence;
    result["vCadence"] = vCadence;
    result["isTenebricide"] = isTenebricide;
    result["isObliteration"] = isObliteration;
    result["isMeurtrier"] = isMeurtrier;
    result["vMeurtrier"] = eMeurtrierV;
    result["isDestructeur"] = isDestructeur;
    result["vDestructeur"] = eDestructeurV;
    result["nowSilencieux"] = isSilencieux;
    result["isChoc"] = isChoc;
    result["isLeste"] = isLeste;
    result["isOrfevrerie"] = isOrfevrerie;
    result["isAssistantAttaque"] = isAssistantAttaque;
    result["isAntiAnatheme"] = isAntiAnatheme;
    result["isTirRafale"] = isTirRafale;
 
    result["eLumiere"] = eLumiere;
    result["isELumiere"] = isELumiere;
    result["eLumiereValue"] = eLumiereValue;

    result["isAkimbo"] = isAkimbo;
    result["isAmbidextrie"] = isAmbidextrie;
    result["isDeuxMains"] = isDeuxMains;
    result["isLourd"] = isLourd;

    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["bDegats"] = bDegats;

    result["exec"] = exec;
    result["firstExec"] = firstExec;
    result["autresEffets"] = autresEffets;

    return result;
}

function getWeaponsContactAS(prefix, AS, hasArmure, isSilencieux, isMeurtrier, isAssistantAttaque, isChoc, isLeste, isOrfevrerie, vForce, vDexterite, oDexterite, vDiscretion, oDiscretion, vCombat, oCombat) {
    let result = {};
    let exec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";

    let aLumiere = "";
    let aLumiereValue = 0;

    let nowAgressive = false;
    let nowProtectrice = false;
    let nowSoeur = false;
    let nowJumelle = false;
    let nowAllegee = false;
    
    let bAttaque = [];
    let diceDegats = 0;
    let bDegats = [];
    let autresAmeliorations = [];

    let aAgressive = isApplied(AS[`${prefix}agressive`]);
    let aAllegee = isApplied(AS[`${prefix}allegee`]);
    let aAssassine = isApplied(AS[`${prefix}assassine`]);
    let aBarbelee = isApplied(AS[`${prefix}barbelee`]);
    let aBarbeleeV = 2;
    let aConnectee = isApplied(AS[`${prefix}connectee`]);
    let aElectrifiee = isApplied(AS[`${prefix}electrifiee`]);
    let aIndestructible = isApplied(AS[`${prefix}indestructible`]);
    let aJumelle = isApplied(AS[`${prefix}jumelle`]);
    let aLumineuse = isApplied(AS[`${prefix}lumineuse`]);
    let aMassive = isApplied(AS[`${prefix}massive`]);
    let aProtectrice = isApplied(AS[`${prefix}protectrice`]);
    let aSoeur = isApplied(AS[`${prefix}soeur`]);
    let aSournoise = isApplied(AS[`${prefix}sournoise`]);
    let aSurmesure = isApplied(AS[`${prefix}surmesure`]);

    if(aAgressive) {
        nowAgressive = true;
    }

    if(aAllegee) {
        exec.push("{{vAllegee=-1D6}}");
        diceDegats -= 1;
        nowAllegee = true;
    }

    if(aAssassine) {
        if(isSilencieux)
            autresAmeliorations.push(i18n_assassine);
        else {
            let totalAssassine = vDiscretion;

            if(hasArmure)
                totalAssassine += oDiscretion;

            isConditionnelD = true;
            attaquesSurprises.push(i18n_assassine);
            attaquesSurprisesValue.push(totalAssassine);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
        }
    }

    if(aBarbelee) {
        if(isMeurtrier) 
            autresAmeliorations.push(i18n_barbelee);
        else {
            isConditionnelD = true;

            exec.push("{{meurtrier="+i18n_barbelee+"}} {{meurtrierValue=[["+aBarbeleeV+"D6]]}} {{meurtrierCondition="+i18n_meurtrierCondition+"}}");
        }
    }    

    if(aConnectee) {
        if(isAssistantAttaque) 
            autresAmeliorations.push(i18n_connectee);
        else {
            isConditionnelD = true;
            isConditionnelV = true;

            exec.push("{{assistanceAttaque="+i18n_connectee+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");
        }
    }

    if(aElectrifiee) {
        if(isChoc) 
            autresAmeliorations.push(i18n_electrifiee);
        else {
            isConditionnelA = true;

            exec.push("{{choc="+i18n_electrifiee+" 1}} {{chocCondition="+i18n_chocCondition+"}}");
        }
    }

    if(aMassive) {
        if(isLeste)
            autresAmeliorations.push(i18n_massive);
        else {
            bDegats.push(vForce);
            exec.push("{{vMassive="+vForce+"}}");
        }
    }

    if(aProtectrice) {
        autresAmeliorations.push(i18n_protectrice);
        nowProtectrice = true;
    }

    if(aJumelle) {
        autresAmeliorations.push(i18n_jumelle);
        nowJumelle = true;
    }

    if(aSoeur) {
        autresAmeliorations.push(i18n_soeur);
        nowSoeur = true;
    }

    if(aSournoise) {
        if(isOrfevrerie)
            autresAmeliorations.push(i18n_sournoise);
        else {
            let vSournoise = vDexterite;

            if(hasArmure)
            vSournoise += oDexterite;
    
            bDegats.push(vSournoise);
            exec.push("{{vSournoise="+vSournoise+"}}");
        }    
    }

    if(aSurmesure) {
        let vSurMesure = vCombat;

        if(hasArmure)
            vSurMesure += oCombat;

        bAttaque.push(vSurMesure)
        exec.push("{{vSurMesure="+vSurMesure+"}}");
    }
    
    if(aIndestructible)
        autresAmeliorations.push(i18n_indestructible);

    if(aLumineuse) {
        aLumiere = i18n_lumineuse;
        aLumiereValue = 2;
    }
        
        
    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["isAgressive"] = nowAgressive;
    result["isSoeur"] = nowSoeur;
    result["isJumelle"] = nowJumelle;
    result["isProtectrice"] = nowProtectrice;
    result["isAllegee"] = nowAllegee;

    result["aLumiere"] = aLumiere;
    result["aLumiereValue"] = aLumiereValue;
    
    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["bAttaque"] = bAttaque;
    result["diceDegats"] = diceDegats;
    result["bDegats"] = bDegats;

    result["exec"] = exec;
    result["autresAmeliorations"] = autresAmeliorations;

    return result;
}

function getWeaponsContactASPNJ(prefix, data, isAssistanceAttaque, isChoc, isLeste, isMeurtrier, isOrfevrerie, isSilencieux, vBete, vChair, vMasque, vMasqueAE) {
    let result = {};
    let exec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";
    
    let bAttaque = [];
    let diceDegats = 0;
    let bDegats = 0;
    let autresAmeliorations = [];

    let aAgressive = isApplied(data[`${prefix}agressive`]);
    let aAllegee = isApplied(data[`${prefix}allegee`]);
    let aAssassine = isApplied(data[`${prefix}assassine`]);
    let aBarbelee = isApplied(data[`${prefix}barbelee`]);
    let aBarbeleeV = 2;
    let aConnectee = isApplied(data[`${prefix}connectee`]);
    let aElectrifiee = isApplied(data[`${prefix}electrifiee`]);
    let aIndestructible = isApplied(data[`${prefix}indestructible`]);
    let aJumelle = isApplied(data[`${prefix}jumelle`]);
    let aLumineuse = isApplied(data[`${prefix}lumineuse`]);
    let aMassive = isApplied(data[`${prefix}massive`]);
    let aProtectrice = isApplied(data[`${prefix}protectrice`]);
    let aSoeur = isApplied(data[`${prefix}soeur`]);
    let aSournoise = isApplied(data[`${prefix}sournoisePNJ`]);
    let aSurmesure = isApplied(data[`${prefix}surmesurePNJ`]);

    if(aAllegee) {
        exec.push("{{vAllegee=-1D6}}");
        diceDegats -= 1;
    }

    if(aAssassine) {
        if(isSilencieux)
            autresAmeliorations.push(i18n_assassine);
        else {
            let totalAssassine = Math.ceil(vMasque/2)+vMasqueAE;

            isConditionnelD = true;
            attaquesSurprises.push(i18n_assassine);
            attaquesSurprisesValue.push(totalAssassine);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
        }
    }

    if(aBarbelee) {
        if(isMeurtrier) 
            autresAmeliorations.push(i18n_barbelee);
        else {
            isConditionnelD = true;

            exec.push("{{meurtrier="+i18n_barbelee+"}} {{meurtrierValue=[["+aBarbeleeV+"D6]]}} {{meurtrierCondition="+i18n_meurtrierCondition+"}}");
        }
    }    

    if(aConnectee) {
        if(isAssistanceAttaque) 
            autresAmeliorations.push(i18n_connectee);
        else {
            isConditionnelD = true;
            isConditionnelV = true;

            exec.push("{{assistanceAttaque="+i18n_connectee+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");
        }
    }

    if(aElectrifiee) {
        if(isChoc) 
            autresAmeliorations.push(i18n_electrifiee);
        else {
            isConditionnelA = true;

            exec.push("{{choc="+i18n_electrifiee+" 1}} {{chocCondition="+i18n_chocCondition+"}}");
        }
    }

    if(aMassive) {
        if(isLeste)
            autresAmeliorations.push(i18n_massive);
        else {
            bDegats += Math.floor(vChair/2);
            exec.push("{{vMassive="+Math.floor(vChair/2)+"}}");
        }
    }

    if(aSournoise) {
        if(isOrfevrerie)
            autresAmeliorations.push(i18n_sournoise);
        else {
            let vSournoise = Math.ceil(vMasque/2);
    
            bDegats += vSournoise;
            exec.push("{{vSournoise="+vSournoise+"}}");
        }    
    }

    if(aSurmesure) {
        let vSurMesure = Math.ceil(vBete/2);

        bAttaque.push(vSurMesure)
        exec.push("{{vSurMesure="+vSurMesure+"}}");
    }
    
    if(aAgressive)
        autresAmeliorations.push(i18n_agressive);
    
    if(aIndestructible)
        autresAmeliorations.push(i18n_indestructible);
    
    if(aJumelle)
        autresAmeliorations.push(i18n_jumelle);
    
    if(aProtectrice)
        autresAmeliorations.push(i18n_protectrice);

    if(aSoeur)
        autresAmeliorations.push(i18n_soeur);

    if(aLumineuse)
        autresAmeliorations.push(`${i18n_lumineuse} (${i18n_lumiere} 2)`)
        
    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;
    
    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["bAttaque"] = bAttaque;
    result["diceDegats"] = diceDegats;
    result["bDegats"] = bDegats;

    result["exec"] = exec;
    result["autresAmeliorations"] = autresAmeliorations;

    return result;
}

function getWeaponsContactAO(prefix, AO, isCadence, vCadence, isObliteration, isAntiAnatheme) {
    let result = {};
    let exec = [];
    let firstExec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let aLumiere = "";
    let aLumiereValue = 0;

    let isChromee = false;
    let isCraneRieur = false;
    let isArmeAzurine = false;
    let vArmeAzurine = 0;
    let isArmeRougeSang = false;
    let vArmeRougeSang = 0;
    let isCheneSculpte = false;
    let vCheneSculpte = 0;
    let isGriffureGravee = false;
    let vGriffureGravee = 0;
    let isMasqueBrise = false;
    let vMasqueBrise = 0;
    let isRouagesCasses = false;
    let vRouagesCasses = 0;

    let rCadence = "";
    let CadenceValue = 0;    

    let diceDegats = 0;
    let diceViolence = 0;
    let bDegats = [];
    let autresAmeliorations = [];

    let aArabesques = isApplied(AO[`${prefix}arabesquesIridescentes`]);
    let aArmeAzurine = isApplied(AO[`${prefix}armeAzurine`]);
    let aArmeRougeSang = isApplied(AO[`${prefix}armeRougeSang`]);
    let aArmureGravee = isApplied(AO[`${prefix}armureGravee`]);
    let aBlasonChevalier = isApplied(AO[`${prefix}blasonChevalier`]);
    let aBouclierGrave = isApplied(AO[`${prefix}bouclierGrave`]);
    let aCheneSculpte = isApplied(AO[`${prefix}cheneSculpte`]);
    let aChromeeLignesLC = isApplied(AO[`${prefix}chromeeLignesLC`]);
    let aCodeKnightGrave = isApplied(AO[`${prefix}codeKnightGrave`]);
    let aCraneRieurGrave = isApplied(AO[`${prefix}craneRieurGrave`]);
    let aFaucheuseGravee = isApplied(AO[`${prefix}faucheuseGravee`]);
    let aFauconsPlumesL = isApplied(AO[`${prefix}fauconsPlumesL`]);
    let aFlammesStylisees = isApplied(AO[`${prefix}flammesStylisees`]);
    let aGriffuresGravees = isApplied(AO[`${prefix}griffuresGravees`]);
    let aMasqueBriseSculpte = isApplied(AO[`${prefix}masqueBriseSculpte`]);
    let aRouagesCassesGraves = isApplied(AO[`${prefix}rouagesCassesGraves`]);
    let aSillonsFLF = isApplied(AO[`${prefix}sillonsFLF`]);

    if(aArabesques) {
        aLumiere = i18n_arabesques;
        aLumiereValue = 1;
    }

    if(aArmeAzurine) {
        isConditionnelD = true;
        isConditionnelV = true;
        isArmeAzurine = true;
        vArmeAzurine = 1;

        exec.push("{{armeAzurine="+i18n_armeAzurine+"}} {{armeAzurineValueD=[[1D6]]}} {{armeAzurineValueV=[[1D6]]}} {{armeAzurineCondition="+i18n_armeAzurineCondition+"}}");
    }

    if(aArmeRougeSang) {
        isConditionnelD = true;
        isArmeRougeSang = true;
        vArmeRougeSang = 1;

        exec.push("{{armeRougeSang="+i18n_armeRougeSang+"}} {{armeRougeSangValueD=[[1D6]]}} {{armeRougeSangValueV=[[1D6]]}} {{armeRougeSangCondition="+i18n_armeRougeSangCondition+"}}");
    }

    if(aCheneSculpte) {
        isConditionnelD = true;
        isCheneSculpte = true;
        vCheneSculpte = 2;

        firstExec.push("{{cheneSculpteValue=[[2D6]]}}");

        exec.push("{{cheneSculpte="+i18n_cheneSculpte+"}} {{cheneSculpteCondition="+i18n_cheneSculpteCondition+"}}");
    }

    if(aChromeeLignesLC) { 
        if(isCadence == true && vCadence >= 2)
            autresAmeliorations.push(i18n_chromee);
        else {
            rCadence = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
            isChromee = true;
            CadenceValue = 2;
        }
    }

    if(aCraneRieurGrave) {
        if(isObliteration)
            autresAmeliorations.push(i18n_craneRieur);
        else {
            isConditionnelD = true;

            exec.push("{{obliteration="+i18n_craneRieur+"}} {{obliterationCondition="+i18n_obliterationCondition+"}}");

            isObliteration = true;
        }
    }

    if(aFaucheuseGravee) {
        diceDegats += 1;
        exec.push("{{vFaucheuse=+1D6}}");
    }

    if(aFauconsPlumesL) {
        if(isAntiAnatheme)
            autresAmeliorations.push(i18n_fauconPlumesL);
        else {
            isConditionnelD = true;
            isConditionnelV = true;
    
            exec.push("{{antiAnatheme="+i18n_fauconPlumesL+"}} {{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");
        }
    
    }
    
    if(aFlammesStylisees) {
        diceViolence += 1;
        exec.push("{{vFlammesStylisees=+1D6}}");
    }

    if(aGriffuresGravees) {
        isConditionnelD = true;
        isConditionnelV = true;
        isGriffureGravee = true;
        vGriffureGravee = 1;

        exec.push("{{griffuresGravees="+i18n_griffuresGravees+"}} {{griffuresGraveesValueD=[[1D6]]}} {{griffuresGraveesValueV=[[1D6]]}} {{griffuresGraveesCondition="+i18n_griffuresGraveesCondition+"}}");
    }

    if(aMasqueBriseSculpte) {
        isConditionnelD = true;
        isConditionnelV = true;
        isMasqueBrise = true;
        vMasqueBrise = 1;

        exec.push("{{masqueBrise="+i18n_masqueBrise+"}} {{masqueBriseValueD=[[1D6]]}} {{masqueBriseValueV=[[1D6]]}} {{masqueBriseCondition="+i18n_masqueBriseCondition+"}}");
    }

    if(aRouagesCassesGraves) {
        isConditionnelD = true;
        isConditionnelV = true;
        isRouagesCasses = true;
        vRouagesCasses = 1;

        exec.push("{{rouagesCasses="+i18n_rouagesCasses+"}} {{rouagesCassesValueD=[[1D6]]}} {{rouagesCassesValueV=[[1D6]]}} {{rouagesCassesCondition="+i18n_rouagesCassesCondition+"}}");
    }

    if(aSillonsFLF) {
        bDegats.push(3);
        exec.push("{{vSillonsFLF=+3}}");
    }

    if(aArmureGravee) 
        autresAmeliorations.push(i18n_armureGravee);

    if(aBlasonChevalier) 
        autresAmeliorations.push(i18n_blasonChevalier);

    if(aBouclierGrave) 
        autresAmeliorations.push(i18n_bouclierGrave);

    if(aCodeKnightGrave) 
        autresAmeliorations.push(i18n_codeKnight);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["isChromee"] = isChromee;
    result["isCraneRieur"] = isCraneRieur;
    result["isObliteration"] = isObliteration;

    result["isArmeAzurine"] = isArmeAzurine;
    result["vArmeAzurine"] = vArmeAzurine;

    result["isArmeRougeSang"] = isArmeRougeSang;
    result["vArmeRougeSang"] = vArmeRougeSang;

    result["isCheneSculpte"] = isCheneSculpte;
    result["vCheneSculpte"] = vCheneSculpte;

    result["isGriffureGravee"] = isGriffureGravee;
    result["vGriffureGravee"] = vGriffureGravee;

    result["isMasqueBrise"] = isMasqueBrise;
    result["vMasqueBrise"] = vMasqueBrise;

    result["isRouagesCasses"] = isRouagesCasses;
    result["vRouagesCasses"] = vRouagesCasses;

    result["aLumiere"] = aLumiere;
    result["aLumiereValue"] = aLumiereValue;
    
    result["rCadence"] = rCadence;
    result["vCadence"] = CadenceValue;

    result["diceDegats"] = diceDegats;
    result["bDegats"] = bDegats;
    result["diceViolence"] = diceViolence;

    result["exec"] = exec;
    result["firstExec"] = firstExec;
    result["autresAmeliorations"] = autresAmeliorations;

    return result;
}

function getWeaponsContactAOPNJ(prefix, data, isCadence, vCadence, isObliteration, isAntiAnatheme) {
    let result = {};
    let exec = [];
    let firstExec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let isChromee = false;
    let isCraneRieur = false;
    let isArmeAzurine = false;
    let vArmeAzurine = 0;
    let isArmeRougeSang = false;
    let vArmeRougeSang = 0;
    let isCheneSculpte = false;
    let vCheneSculpte = 0;
    let isGriffureGravee = false;
    let vGriffureGravee = 0;
    let isMasqueBrise = false;
    let vMasqueBrise = 0;
    let isRouagesCasses = false;
    let vRouagesCasses = 0;

    let rCadence = "0";
    let CadenceValue = 0;    

    let diceDegats = 0;
    let diceViolence = 0;
    let bDegats = 0;
    let autresAmeliorations = [];

    let aArabesques = isApplied(data[`${prefix}arabesquesIridescentes`]);
    let aArmeAzurine = isApplied(data[`${prefix}armeAzurine`]);
    let aArmeRougeSang = isApplied(data[`${prefix}armeRougeSang`]);
    let aArmureGravee = isApplied(data[`${prefix}armureGravee`]);
    let aBlasonChevalier = isApplied(data[`${prefix}blasonChevalier`]);
    let aBouclierGrave = isApplied(data[`${prefix}bouclierGrave`]);
    let aCheneSculpte = isApplied(data[`${prefix}cheneSculpte`]);
    let aChromeeLignesLC = isApplied(data[`${prefix}chromeeLignesLC`]);
    let aCodeKnightGrave = isApplied(data[`${prefix}codeKnightGrave`]);
    let aCraneRieurGrave = isApplied(data[`${prefix}craneRieurGrave`]);
    let aFaucheuseGravee = isApplied(data[`${prefix}faucheuseGravee`]);
    let aFauconsPlumesL = isApplied(data[`${prefix}fauconsPlumesL`]);
    let aFlammesStylisees = isApplied(data[`${prefix}flammesStylisees`]);
    let aGriffuresGravees = isApplied(data[`${prefix}griffuresGravees`]);
    let aMasqueBriseSculpte = isApplied(data[`${prefix}masqueBriseSculpte`]);
    let aRouagesCassesGraves = isApplied(data[`${prefix}rouagesCassesGraves`]);
    let aSillonsFLF = isApplied(data[`${prefix}sillonsFLF`]);

    if(aArmeAzurine) {
        isConditionnelD = true;
        isConditionnelV = true;
        isArmeAzurine = true;
        vArmeAzurine = 1;

        exec.push("{{armeAzurine="+i18n_armeAzurine+"}} {{armeAzurineValueD=[[1D6]]}} {{armeAzurineValueV=[[1D6]]}} {{armeAzurineCondition="+i18n_armeAzurineCondition+"}}");
    }

    if(aArmeRougeSang) {
        isConditionnelD = true;
        isArmeRougeSang = true;
        vArmeRougeSang = 1;

        exec.push("{{armeRougeSang="+i18n_armeRougeSang+"}} {{armeRougeSangValueD=[[1D6]]}} {{armeRougeSangValueV=[[1D6]]}} {{armeRougeSangCondition="+i18n_armeRougeSangCondition+"}}");
    }

    if(aCheneSculpte) {
        isConditionnelD = true;
        isCheneSculpte = true;
        vCheneSculpte = 2;

        firstExec.push("{{cheneSculpteValue=[[2D6]]}}");

        exec.push("{{cheneSculpte="+i18n_cheneSculpte+"}} {{cheneSculpteCondition="+i18n_cheneSculpteCondition+"}}");
    }

    if(aChromeeLignesLC) { 
        if(isCadence == true && vCadence >= 2)
            autresAmeliorations.push(i18n_chromee);
        else {
            rCadence = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
            isChromee = true;
            CadenceValue = 2;
        }
    }

    if(aCraneRieurGrave) {
        if(isObliteration)
            autresAmeliorations.push(i18n_craneRieur);
        else {
            isConditionnelD = true;

            exec.push(`{{obliteration=${i18n_craneRieur}}} {{obliterationCondition=${i18n_obliterationCondition}}}`);

            isObliteration = true;
        }
    }

    if(aFaucheuseGravee) {
        diceDegats += 1;
        exec.push("{{vFaucheuse=+1D6}}");
    }

    if(aFauconsPlumesL) {
        if(isAntiAnatheme)
            autresAmeliorations.push(i18n_fauconPlumesL);
        else {
            isConditionnelD = true;
            isConditionnelV = true;
    
            exec.push("{{antiAnatheme="+i18n_fauconPlumesL+"}} {{antiAnathemeCondition="+i18n_antiAnathemeCondition+"}}");
        }
    
    }
    
    if(aFlammesStylisees) {
        diceViolence += 1;
        exec.push("{{vFlammesStylisees=+1D6}}");
    }

    if(aGriffuresGravees) {
        isConditionnelD = true;
        isConditionnelV = true;
        isGriffureGravee = true;
        vGriffureGravee = 1;

        exec.push("{{griffuresGravees="+i18n_griffuresGravees+"}} {{griffuresGraveesValueD=[[1D6]]}} {{griffuresGraveesValueV=[[1D6]]}} {{griffuresGraveesCondition="+i18n_griffuresGraveesCondition+"}}");
    }

    if(aMasqueBriseSculpte) {
        isConditionnelD = true;
        isConditionnelV = true;
        isMasqueBrise = true;
        vMasqueBrise = 1;

        exec.push("{{masqueBrise="+i18n_masqueBrise+"}} {{masqueBriseValueD=[[1D6]]}} {{masqueBriseValueV=[[1D6]]}} {{masqueBriseCondition="+i18n_masqueBriseCondition+"}}");
    }

    if(aRouagesCassesGraves) {
        isConditionnelD = true;
        isConditionnelV = true;
        isRouagesCasses = true;
        vRouagesCasses = 1;

        exec.push("{{rouagesCasses="+i18n_rouagesCasses+"}} {{rouagesCassesValueD=[[1D6]]}} {{rouagesCassesValueV=[[1D6]]}} {{rouagesCassesCondition="+i18n_rouagesCassesCondition+"}}");
    }

    if(aSillonsFLF) {
        bDegats += 3;
        exec.push("{{vSillonsFLF=+3}}");
    }

    if(aArabesques)
        autresAmeliorations.push(`${i18n_arabesques} (${i18n_lumiere} 1)`);

    if(aArmureGravee) 
        autresAmeliorations.push(i18n_armureGravee);

    if(aBlasonChevalier) 
        autresAmeliorations.push(i18n_blasonChevalier);

    if(aBouclierGrave) 
        autresAmeliorations.push(i18n_bouclierGrave);

    if(aCodeKnightGrave) 
        autresAmeliorations.push(i18n_codeKnight);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["isChromee"] = isChromee;
    result["isCraneRieur"] = isCraneRieur;
    result["isObliteration"] = isObliteration;

    result["isArmeAzurine"] = isArmeAzurine;
    result["vArmeAzurine"] = vArmeAzurine;

    result["isArmeRougeSang"] = isArmeRougeSang;
    result["vArmeRougeSang"] = vArmeRougeSang;

    result["isCheneSculpte"] = isCheneSculpte;
    result["vCheneSculpte"] = vCheneSculpte;

    result["isGriffureGravee"] = isGriffureGravee;
    result["vGriffureGravee"] = vGriffureGravee;

    result["isMasqueBrise"] = isMasqueBrise;
    result["vMasqueBrise"] = vMasqueBrise;

    result["isRouagesCasses"] = isRouagesCasses;
    result["vRouagesCasses"] = vRouagesCasses;
    
    result["rCadence"] = rCadence;
    result["vCadence"] = CadenceValue;

    result["diceDegats"] = diceDegats;
    result["bDegats"] = bDegats;
    result["diceViolence"] = diceViolence;

    result["exec"] = exec;
    result["firstExec"] = firstExec;
    result["autresAmeliorations"] = autresAmeliorations;

    return result;
}

function getWeaponsDistanceAA(prefix, AA, vDiscretion, oDiscretion, eAssistanceAttaque, eASAssassinValue, isCadence, vCadence, eSilencieux, eTirRafale, isObliteration, isAntiAnatheme) {
    let result = {};
    let exec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let isChambreDouble = false;
    let rChambreDouble = "";

    let isInterfaceGuidage = false;

    let isJAmbidextre = false;
    let isJAkimbo = false;

    let aASAssassin = "";
    let aASAssassinValue = 0;

    let bonus = [];
    let diceDegats = 0;
    let diceViolence = 0;
    let bDegats = [];
    let attaquesSurprises = [];
    let attaquesSurprisesCondition = "";
    let attaquesSurprisesValue = [];
    let autresAmeliorations = [];
    let autresEffets = [];

    let aChargeurGrappes = isApplied(AA[`${prefix}chargeurGrappes`]);
    let aCanonLong = isApplied(AA[`${prefix}canonLong`]);
    let aCanonRaccourci = isApplied(AA[`${prefix}canonRaccourci`]);
    let aChambreDouble = isApplied(AA[`${prefix}chambreDouble`]);
    let aInterfaceGuidage = isApplied(AA[`${prefix}interfaceGuidage`]);
    let aJumelage = isApplied(AA[`${prefix}jumelage`]);
    let aJumelageV = AA[`${prefix}jumelageValue`];
    let aJumelageT = AA[`${prefix}jumelageType`];
    let aLunetteIntelligente = isApplied(AA[`${prefix}lunetteIntelligente`]);
    let aMunitionsHyperVelocite = isApplied(AA[`${prefix}munitionsHyperVelocite`]);
    let aMunitionsDrone = isApplied(AA[`${prefix}munitionsDrone`]);
    let aChargeurExplosives = isApplied(AA[`${prefix}chargeurExplosives`]);
    let aMunitionsIEM = isApplied(AA[`${prefix}munitionsIEM`]);
    let aMunitionsNonLetales = isApplied(AA[`${prefix}munitionsNonLetales`]);
    let aMunitionsSubsoniques = isApplied(AA[`${prefix}munitionsSubsoniques`]);
    let aPointeurLaser = isApplied(AA[`${prefix}pointeurLaser`]);
    let aProtectionArme = isApplied(AA[`${prefix}protectionArme`]);
    let aRevetementOmega = isApplied(AA[`${prefix}revetementOmega`]);
    let aStructureElement = isApplied(AA[`${prefix}structureElement`]);
    let aSystemeRefroidissement = isApplied(AA[`${prefix}systemeRefroidissement`]);

    if(aChargeurGrappes) {
        diceDegats -= 1;
        diceViolence += 1;

        exec.push("{{vMGrappeD=-1D}} {{vMGrappeV=+1D}}");
    }

    if(aCanonLong) {
        isConditionnelA = true;

        exec.push("{{canonLong="+i18n_canonLong+"}} {{canonLongCondition="+i18n_canonLongCondition+"}}");
    }

    if(aCanonRaccourci) {
        isConditionnelA = true;

        exec.push("{{canonRaccourci="+i18n_canonRaccourci+"}} {{canonRaccourciCondition="+i18n_canonRaccourciCondition+"}}");
    }

    if(aChambreDouble) {
        if(isCadence && vCadence >= 2)
            autresAmeliorations.push(i18n_chambreDouble);
        else if(isCadence) {
            autresEffets.push(i18n_cadence+" "+vCadence);
            rChambreDouble = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
            isChambreDouble = true;
        } else {
            rChambreDouble = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
            isChambreDouble = true;
        }
    }

    if(aInterfaceGuidage)  {
        autresAmeliorations.push(i18n_interfaceGuidage);
        isInterfaceGuidage = true;
    }

    if(aJumelage) {
        if(aJumelageT == "ambidextrie") {
            autresAmeliorations.push(i18n_jumelage+" "+i18n_ambidextrie+" ("+aJumelageV+")");
            isJAmbidextre = true;
        }            
        else if(aJumelageT == "akimbo") {
            autresAmeliorations.push(i18n_jumelage+" "+i18n_akimbo+" ("+aJumelageV+")");
            isJAkimbo = true;
        }
        else
            autresAmeliorations.push(i18n_jumelage+" ("+aJumelageV+")");
    }
        
    if(aLunetteIntelligente) {
        isConditionnelA = true;
        exec.push("{{lunetteIntelligente="+i18n_lunetteIntelligente+"}} {{lunetteIntelligenteCondition="+i18n_lunetteIntelligenteCondition+"}}");
    }

    if(aMunitionsHyperVelocite) {
        if(eAssistanceAttaque)
            autresAmeliorations.push(i18n_munitionsHyperVelocite);
        else {
            isConditionnelD = true;
            isConditionnelV = true;

            exec.push("{{assistanceAttaque="+i18n_munitionsHyperVelocite+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");
        }
    }

    if(aMunitionsDrone) {
        exec.push("{{vMDrone=+3}}");
        bonus.push(3);
    }

    if(aChargeurExplosives) {
        exec.push("{{vMExplosiveD=+1D6}} {{vMExplosiveV=-1D6}}");

        diceDegats += 1;
        diceViolence -= 1;
    }

    if(aMunitionsIEM) {
        exec.push("{{vMIEMD=-1D6}} {{vMIEMV=-1D6}}");

        diceDegats -= 1;
        diceViolence -= 1;
        autresAmeliorations.push(i18n_munitionsIEMParasitage);
    }

    if(aMunitionsSubsoniques) {
        if(eSilencieux)
            autresAmeliorations.push(i18n_munitionsSubsoniques);
        else {
            let totalSubsonique = vDiscretion+oDiscretion;

            attaquesSurprises.push(i18n_munitionsSubsoniques);
            attaquesSurprisesValue.push(totalSubsonique);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
        }
    }

    if(aPointeurLaser) {
        exec.push("{{vMPLaser=+1}}");
        bonus.push(1);
    }

    if(aRevetementOmega) {
        if(eASAssassinValue < 2) {
            aASAssassin = i18n_revetementOmega;
            aASAssassinValue = 2;

            if(eASAssassinValue != 0)
                autresEffets.push(i18n_assassin);

        } else if(eASAssassinValue > 2)
            autresAmeliorations.push(i18n_revetementOmega);
    }

    if(aSystemeRefroidissement) {
        if(!eTirRafale)
            autresAmeliorations.push(i18n_systemeRefroidissement+" ("+i18n_barrage+" 1)");
        else if(eTirRafale)
            exec.push("{{tirRafale="+i18n_systemeRefroidissement+" + "+i18n_barrage+" 1}} {{tirRafaleCondition="+i18n_tirRafaleCondition+"}}");
    }

    if(aMunitionsNonLetales) 
        autresAmeliorations.push(i18n_munitionsNonLetales);

    if(aProtectionArme) 
        autresAmeliorations.push(i18n_protectionArme);

    if(aStructureElement) 
        autresAmeliorations.push(i18n_structureElementAlpha);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["bonus"] = bonus;
    result["diceDegats"] = diceDegats;
    result["bDegats"] = bDegats;
    result["diceViolence"] = diceViolence;

    result["aASAssassin"] = aASAssassin;
    result["aASAssassinValue"] = aASAssassinValue;

    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["isChambreDouble"] = isChambreDouble;
    result["rChambreDouble"] = rChambreDouble;
    result["isJAmbidextre"] = isJAmbidextre;
    result["isJAkimbo"] = isJAkimbo;

    result["exec"] = exec;
    result["autresAmeliorations"] = autresAmeliorations;
    result["autresEffets"] = autresEffets;

    return result;
}

function getWeaponsDistanceAAPNJ(prefix, attrs, vMasque, vMasqueAE, eAssistanceAttaque, eASAssassinValue, isCadence, vCadence, eSilencieux, eTirRafale, isObliteration, isAntiAnatheme) {
    let result = {};
    let exec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let isChambreDouble = false;
    let rChambreDouble = "";

    let isInterfaceGuidage = false;

    let aASAssassin = "";
    let aASAssassinValue = 0;

    let bonus = [];
    let diceDegats = 0;
    let diceViolence = 0;
    let bDegats = [];
    let attaquesSurprises = [];
    let attaquesSurprisesCondition = "";
    let attaquesSurprisesValue = [];
    let autresAmeliorations = [];
    let autresEffets = [];

    let aChargeurGrappes = isApplied(attrs[`${prefix}chargeurGrappes`]);
    let aCanonLong = isApplied(attrs[`${prefix}canonLong`]);
    let aCanonRaccourci = isApplied(attrs[`${prefix}canonRaccourci`]);
    let aChambreDouble = isApplied(attrs[`${prefix}chambreDouble`]);
    let aInterfaceGuidage = isApplied(attrs[`${prefix}interfaceGuidage`]);
    let aJumelage = isApplied(attrs[`${prefix}jumelage`]);
    let aJumelageV = attrs[`${prefix}jumelageValue`];
    let aJumelageT = attrs[`${prefix}jumelageType`];
    let aLunetteIntelligente = isApplied(attrs[`${prefix}lunetteIntelligente`]);
    let aMunitionsHyperVelocite = isApplied(attrs[`${prefix}munitionsHyperVelocite`]);
    let aMunitionsDrone = isApplied(attrs[`${prefix}munitionsDrone`]);
    let aChargeurExplosives = isApplied(attrs[`${prefix}chargeurExplosives`]);
    let aMunitionsIEM = isApplied(attrs[`${prefix}munitionsIEM`]);
    let aMunitionsNonLetales = isApplied(attrs[`${prefix}munitionsNonLetales`]);
    let aMunitionsSubsoniques = isApplied(attrs[`${prefix}munitionsSubsoniques`]);
    let aPointeurLaser = isApplied(attrs[`${prefix}pointeurLaser`]);
    let aProtectionArme = isApplied(attrs[`${prefix}protectionArme`]);
    let aRevetementOmega = isApplied(attrs[`${prefix}revetementOmega`]);
    let aStructureElement = isApplied(attrs[`${prefix}structureElement`]);
    let aSystemeRefroidissement = isApplied(attrs[`${prefix}systemeRefroidissement`]);

    if(aChargeurGrappes) {
        diceDegats -= 1;
        diceViolence += 1;

        exec.push("{{vMGrappeD=-1D}} {{vMGrappeV=+1D}}");
    }

    if(aCanonLong) {
        isConditionnelA = true;

        exec.push("{{canonLong="+i18n_canonLong+"}} {{canonLongCondition="+i18n_canonLongCondition+"}}");
    }

    if(aCanonRaccourci) {
        isConditionnelA = true;

        exec.push("{{canonRaccourci="+i18n_canonRaccourci+"}} {{canonRaccourciCondition="+i18n_canonRaccourciCondition+"}}");
    }

    if(aChambreDouble) {
        if(isCadence && vCadence >= 2)
            autresAmeliorations.push(i18n_chambreDouble);
        else if(isCadence) {
            autresEffets.push(i18n_cadence+" "+vCadence);
            rChambreDouble = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
            isChambreDouble = true;
        } else {
            rChambreDouble = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
            isChambreDouble = true;
        }
    }

    if(aInterfaceGuidage)  {
        autresAmeliorations.push(i18n_interfaceGuidage);
        isInterfaceGuidage = true;
    }

    if(aJumelage) {
        if(aJumelageT == "ambidextrie")
            autresAmeliorations.push(i18n_jumelage+" "+i18n_ambidextrie+" ("+aJumelageV+")");        
        else if(aJumelageT == "akimbo")
            autresAmeliorations.push(i18n_jumelage+" "+i18n_akimbo+" ("+aJumelageV+")");
        else
            autresAmeliorations.push(i18n_jumelage+" ("+aJumelageV+")");
    }
        
    if(aLunetteIntelligente) {
        isConditionnelA = true;
        exec.push("{{lunetteIntelligente="+i18n_lunetteIntelligente+"}} {{lunetteIntelligenteCondition="+i18n_lunetteIntelligenteCondition+"}}");
    }

    if(aMunitionsHyperVelocite) {
        if(eAssistanceAttaque)
            autresAmeliorations.push(i18n_munitionsHyperVelocite);
        else {
            isConditionnelD = true;
            isConditionnelV = true;

            exec.push("{{assistanceAttaque="+i18n_munitionsHyperVelocite+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");
        }
    }

    if(aMunitionsDrone) {
        exec.push("{{vMDrone=+3}}");
        bonus.push(3);
    }

    if(aChargeurExplosives) {
        exec.push("{{vMExplosiveD=+1D6}} {{vMExplosiveV=-1D6}}");

        diceDegats += 1;
        diceViolence -= 1;
    }

    if(aMunitionsIEM) {
        exec.push("{{vMIEMD=-1D6}} {{vMIEMV=-1D6}}");

        diceDegats -= 1;
        diceViolence -= 1;
        autresAmeliorations.push(i18n_munitionsIEMParasitage);
    }

    if(aMunitionsSubsoniques) {
        if(eSilencieux)
            autresAmeliorations.push(i18n_munitionsSubsoniques);
        else {
            let totalSubsonique = Math.ceil(vMasque/2)+vMasqueAE;

            attaquesSurprises.push(i18n_munitionsSubsoniques);
            attaquesSurprisesValue.push(totalSubsonique);

            if(attaquesSurprisesCondition == "")
                attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
        }
    }

    if(aPointeurLaser) {
        exec.push("{{vMPLaser=+1}}");
        bonus.push(1);
    }

    if(aRevetementOmega) {
        if(eASAssassinValue < 2) {
            aASAssassin = i18n_revetementOmega;
            aASAssassinValue = 2;

            if(eASAssassinValue != 0)
                autresEffets.push(i18n_assassin);

        } else if(eASAssassinValue > 2)
            autresAmeliorations.push(i18n_revetementOmega);
    }

    if(aSystemeRefroidissement) {
        if(!eTirRafale)
            autresAmeliorations.push(i18n_systemeRefroidissement+" ("+i18n_barrage+" 1)");
        else if(eTirRafale)
            exec.push("{{tirRafale="+i18n_systemeRefroidissement+" + "+i18n_barrage+" 1}} {{tirRafaleCondition="+i18n_tirRafaleCondition+"}}");
    }

    if(aMunitionsNonLetales) 
        autresAmeliorations.push(i18n_munitionsNonLetales);

    if(aProtectionArme) 
        autresAmeliorations.push(i18n_protectionArme);

    if(aStructureElement) 
        autresAmeliorations.push(i18n_structureElementAlpha);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["bonus"] = bonus;
    result["diceDegats"] = diceDegats;
    result["bDegats"] = bDegats;
    result["diceViolence"] = diceViolence;

    result["aASAssassin"] = aASAssassin;
    result["aASAssassinValue"] = aASAssassinValue;

    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["isChambreDouble"] = isChambreDouble;
    result["rChambreDouble"] = rChambreDouble;

    result["exec"] = exec;
    result["autresAmeliorations"] = autresAmeliorations;
    result["autresEffets"] = autresEffets;

    return result;
}

function getWeaponsAutreAA(prefix, AA, eAssistanceAttaque, eASAssassinValue, isCadence, vCadence, eSilencieux, eTirRafale, isObliteration, isAntiAnatheme) {
    let result = {};
    let exec = [];
    
    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    let isChambreDouble = false;
    let rChambreDouble = "";

    let isInterfaceGuidage = false;

    let isJAmbidextre = false;
    let isJAkimbo = false;

    let aASAssassin = "";
    let aASAssassinValue = 0;

    let bonus = [];
    let diceDegats = 0;
    let diceViolence = 0;
    let bDegats = [];
    let attaquesSurprises = [];
    let attaquesSurprisesCondition = "";
    let attaquesSurprisesValue = [];
    let autresAmeliorations = [];
    let autresEffets = [];

    let aChargeurGrappes = isApplied(AA[`${prefix}chargeurGrappes`]);
    let aCanonLong = isApplied(AA[`${prefix}canonLong`]);
    let aCanonRaccourci = isApplied(AA[`${prefix}canonRaccourci`]);
    let aChambreDouble = isApplied(AA[`${prefix}chambreDouble`]);
    let aInterfaceGuidage = isApplied(AA[`${prefix}interfaceGuidage`]);
    let aJumelage = isApplied(AA[`${prefix}jumelage`]);
    let aJumelageV = AA[`${prefix}jumelageValue`];
    let aJumelageT = AA[`${prefix}jumelageType`];
    let aLunetteIntelligente = isApplied(AA[`${prefix}lunetteIntelligente`]);
    let aMunitionsHyperVelocite = isApplied(AA[`${prefix}munitionsHyperVelocite`]);
    let aMunitionsDrone = isApplied(AA[`${prefix}munitionsDrone`]);
    let aChargeurExplosives = isApplied(AA[`${prefix}chargeurExplosives`]);
    let aMunitionsIEM = isApplied(AA[`${prefix}munitionsIEM`]);
    let aMunitionsNonLetales = isApplied(AA[`${prefix}munitionsNonLetales`]);
    let aMunitionsSubsoniques = isApplied(AA[`${prefix}munitionsSubsoniques`]);
    let aPointeurLaser = isApplied(AA[`${prefix}pointeurLaser`]);
    let aProtectionArme = isApplied(AA[`${prefix}protectionArme`]);
    let aRevetementOmega = isApplied(AA[`${prefix}revetementOmega`]);
    let aStructureElement = isApplied(AA[`${prefix}structureElement`]);
    let aSystemeRefroidissement = isApplied(AA[`${prefix}systemeRefroidissement`]);

    if(aChargeurGrappes) {
        diceDegats -= 1;
        diceViolence += 1;

        exec.push("{{vMGrappeD=-1D}} {{vMGrappeV=+1D}}");
    }

    if(aCanonLong) {
        isConditionnelA = true;

        exec.push("{{canonLong="+i18n_canonLong+"}} {{canonLongCondition="+i18n_canonLongCondition+"}}");
    }

    if(aCanonRaccourci) {
        isConditionnelA = true;

        exec.push("{{canonRaccourci="+i18n_canonRaccourci+"}} {{canonRaccourciCondition="+i18n_canonRaccourciCondition+"}}");
    }

    if(aChambreDouble) {
        if(isCadence && vCadence >= 2)
            autresAmeliorations.push(i18n_chambreDouble);
        else if(isCadence) {
            autresEffets.push(i18n_cadence+" "+vCadence);
            rChambreDouble = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
            isChambreDouble = true;
        } else {
            rChambreDouble = "?{Plusieurs cibles ?|Oui, 3|Non, 0}";
            isChambreDouble = true;
        }
    }

    if(aInterfaceGuidage)  {
        autresAmeliorations.push(i18n_interfaceGuidage);
        isInterfaceGuidage = true;
    }

    if(aJumelage) {
        if(aJumelageT == "ambidextrie") {
            autresAmeliorations.push(i18n_jumelage+" "+i18n_ambidextrie+" ("+aJumelageV+")");
            isJAmbidextre = true;
        }            
        else if(aJumelageT == "akimbo") {
            autresAmeliorations.push(i18n_jumelage+" "+i18n_akimbo+" ("+aJumelageV+")");
            isJAkimbo = true;
        }
        else
            autresAmeliorations.push(i18n_jumelage+" ("+aJumelageV+")");
    }
        
    if(aLunetteIntelligente) {
        isConditionnelA = true;

        exec.push("{{lunetteIntelligente="+i18n_lunetteIntelligente+"}} {{lunetteIntelligenteCondition="+i18n_lunetteIntelligenteCondition+"}}");
    }

    if(aMunitionsHyperVelocite) {
        if(eAssistanceAttaque)
            autresAmeliorations.push(i18n_munitionsHyperVelocite);
        else {
            isConditionnelD = true;
            isConditionnelV = true;

            exec.push("{{assistanceAttaque="+i18n_munitionsHyperVelocite+"}} {{assistanceAttaqueCondition="+i18n_assistanceAttaqueCondition+"}}");
        }
    }

    if(aMunitionsDrone) {
        exec.push("{{vMDrone=+3}}");
        bonus.push(3);
    }

    if(aChargeurExplosives) {
        exec.push("{{vMExplosiveD=+1D6}} {{vMExplosiveV=-1D6}}");
        diceDegats += 1;
        diceViolence -= 1;
    }

    if(aMunitionsIEM) {
        exec.push("{{vMIEMD=-1D6}} {{vMIEMV=-1D6}}");

        diceDegats -= 1;
        diceViolence -= 1;
        autresAmeliorations.push(i18n_munitionsIEMParasitage);
    }

    if(aMunitionsSubsoniques)
        autresAmeliorations.push(i18n_munitionsSubsoniques);

    if(aPointeurLaser) {
        exec.push("{{vMPLaser=+1}}");
        bonus.push(1);
    }

    if(aRevetementOmega) {
        if(eASAssassinValue < 2) {
            aASAssassin = i18n_revetementOmega;
            aASAssassinValue = 2;

            if(eASAssassinValue != 0)
                autresEffets.push(i18n_assassin);

        } else if(eASAssassinValue > 2)
            autresAmeliorations.push(i18n_revetementOmega);
    }

    if(aSystemeRefroidissement) {
        if(!eTirRafale)
            autresAmeliorations.push(i18n_systemeRefroidissement+" ("+i18n_barrage+" 1)");
        else if(eTirRafale)
            exec.push("{{tirRafale="+i18n_systemeRefroidissement+" + "+i18n_barrage+" 1}} {{tirRafaleCondition="+i18n_tirRafaleCondition+"}}");
    }

    if(aMunitionsNonLetales) 
        autresAmeliorations.push(i18n_munitionsNonLetales);

    if(aProtectionArme) 
        autresAmeliorations.push(i18n_protectionArme);

    if(aStructureElement) 
        autresAmeliorations.push(i18n_structureElementAlpha);

    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["isConditionnelV"] = isConditionnelV;

    result["bonus"] = bonus;
    result["diceDegats"] = diceDegats;
    result["bDegats"] = bDegats;
    result["diceViolence"] = diceViolence;

    result["aASAssassin"] = aASAssassin;
    result["aASAssassinValue"] = aASAssassinValue;

    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;

    result["isChambreDouble"] = isChambreDouble;
    result["rChambreDouble"] = rChambreDouble;
    result["isJAmbidextre"] = isJAmbidextre;
    result["isJAkimbo"] = isJAkimbo;

    result["exec"] = exec;
    result["autresAmeliorations"] = autresAmeliorations;
    result["autresEffets"] = autresEffets;

    return result;
}

function getArmorBonus(value, armure, isELumiere, isASLumiere, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom) {
    let result = {};
    let exec = [];
    let cRoll = [];

    let isConditionnelA = false;
    let isConditionnelD = false;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";

    let diceDegats = 0;
    let diceViolence = 0;

    let ODBarbarian = [];
    let ODShaman = [];
    let ODWarrior = [];

    switch(armure) {
        case "barbarian":
            let goliath = Number(value["barbarianGoliath"]);

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

                diceDegats += goliath;
                diceViolence += goliath;

                exec.push(`{{vBarbarianD=+${goliath}D6}}`);
                exec.push(`{{vBarbarianV=+${goliath}D6}}`);
            }            
            break;

        case "rogue":
            let ghost = value["rogueGhost"];

            if(ghost != "") {                        
                exec.push("{{special2="+i18n_ghostActive+"}}");

                if(isELumiere == false && isASLumiere == false) {
                    let totalGhost = vDiscretion+oDiscretion;

                    isConditionnelA = true;
                    isConditionnelD = true;

                    exec.push("{{vODGhostA="+i18n_ghost+"}}");
                    exec.push("{{vODGhostAValue=[[{"+vDiscretion+"D6cs2cs4cs6cf1cf3cf5s%2}=0+"+oDiscretion+"]]}}");
                    exec.push("{{vODGhostCondition="+i18n_attaqueSurpriseCondition+"}}");

                    attaquesSurprises.unshift(i18n_ghost);
                    attaquesSurprisesValue.unshift(totalGhost);

                    if(attaquesSurprisesCondition == "")
                        attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
                }
            }
            
            break;

        case "shaman":
            let shaman = Number(value["shamanNbreTotem"]);
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
            let typeSoldier = value["warriorSoldierA"];
            let typeHunter = value["warriorHunterA"];
            let typeHerald = value["warriorHeraldA"];
            let typeScholar = value["warriorScholarA"];
            let typeScout = value["warriorScoutA"];

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

    result["exec"] = exec;
    result["cRoll"] = cRoll;
    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;
    result["diceDegats"] = diceDegats;
    result["diceViolence"] = diceViolence;
    result["ODBarbarian"] = ODBarbarian;
    result["ODShaman"] = ODShaman;
    result["ODWarrior"] = ODWarrior;

    return result;
}

function getMALBonus(value, armureL, isELumiere, isASLumiere, vDiscretion, oDiscretion, hasBonus, C1Nom, C2Nom, C3Nom, C4Nom) {
    let result = {};
    let exec = [];
    let cRoll = [];

    let isConditionnelA = false;
    let isConditionnelD = false;

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = "";

    let diceDegats = 0;
    let diceViolence = 0;

    let ODMALBarbarian = [];
    let ODMALShaman = [];
    let ODMALWarrior = [];

    switch(armureL) {
        case "barbarian":
            let MALGoliath = Number(value["MALBarbarianGoliath"]);

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

                diceDegats += MALGoliath;
                diceViolence += MALGoliath;

                exec.push(`{{vBarbarianD=+${MALGoliath}D6}}`);
                exec.push(`{{vBarbarianV=+${MALGoliath}D6}}`);
            }
            break;

        case "rogue":
            let MALGhost = value["MALRogueGhost"];

            if(MALGhost != "") {
                exec.push("{{MALspecial2="+i18n_ghostActive+"}}");

                if(isELumiere == false && isASLumiere == false) {
                    let totalMALGhost = vDiscretion+oDiscretion;

                    isConditionnelA = true;
                    isConditionnelD = true;

                    exec.push("{{vODGhostA="+i18n_ghost+"}}");
                    exec.push("{{vODGhostAValue=[["+vDiscretion+"D6+"+oDiscretion+"]]}}");
                    exec.push("{{vODGhostCondition="+i18n_attaqueSurpriseCondition+"}}");

                    attaquesSurprises.unshift(i18n_ghost);
                    attaquesSurprisesValue.unshift(totalMALGhost);

                    if(attaquesSurprisesCondition == "")
                        attaquesSurprisesCondition = "{{attaqueSurpriseCondition="+i18n_attaqueSurpriseCondition+"}}";
                }
            }
            break;

        case "shaman":
            let MALShaman = Number(value["MALShamanNbreTotem"]);
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

    result["exec"] = exec;
    result["cRoll"] = cRoll;
    result["isConditionnelA"] = isConditionnelA;
    result["isConditionnelD"] = isConditionnelD;
    result["attaquesSurprises"] = attaquesSurprises;
    result["attaquesSurprisesValue"] = attaquesSurprisesValue;
    result["attaquesSurprisesCondition"] = attaquesSurprisesCondition;
    result["diceDegats"] = diceDegats;
    result["diceViolence"] = diceViolence;
    result["ODMALBarbarian"] = ODMALBarbarian;
    result["ODMALShaman"] = ODMALShaman;
    result["ODMALWarrior"] = ODMALWarrior;

    return result;
}

function getStyleContactMod(value, cPrecis, diceDegats, diceViolence, hasArmure, oCombat, isEAkimbo, isEAmbidextrie, isAAgressive, isAJumelle, isASoeur, isAProtectrice, isEDeuxMains, isAAllegee, isELourd) {
    let result = {};

    let exec = [];
    let cRoll = [];
    let autresAmeliorationsS = [];

    let dDegats = 0;
    let dViolence = 0;

    let style = value["styleCombat"] || "standard";
    let bName = "";
    let modA = 0;

    log(isAProtectrice);

    switch(style) {
        case "standard": 
            exec.push("{{style="+i18n_style+" "+i18n_standard+"}}");
            
            if(isAAgressive)
                autresAmeliorationsS.push(i18n_agressive);
        break;

        case "couvert":
            bName = "atkCouvert";
            modA = value[bName];

            exec.push("{{style="+i18n_style+" "+i18n_couvert+"}}");
            exec.push("{{vMStyleA="+modA+"D}}");
            cRoll.push(Number(modA));
            
            if(isAAgressive)
                autresAmeliorationsS.push(i18n_agressive);
            break;

        case "agressif":
            bName = "atkAgressif";
            modA = value[bName];

            exec.push("{{style="+i18n_style+" "+i18n_agressif+"}}");
            exec.push("{{vMStyleA="+modA+"D}}");
            cRoll.push(Number(modA));

            if(isAAgressive) {
                exec.push("{{vAgressive=+1D6}}");
                diceDegats += 1;
            }                
            break;

        case "akimbo":
            bName = "atkAkimbo";
            modA = value[bName];

            exec.push("{{style="+i18n_style+" "+i18n_akimbo+"}}");

            if(hasArmure) {
                if(oCombat >= 3 || isEAkimbo || isAJumelle) {
                    exec.push("{{vMStyleA=-1D}}");
                    cRoll.push(-1);
                }
                else {
                    exec.push("{{vMStyleA="+modA+"D}}");
                    cRoll.push(Number(modA));
                }
            }
            else if(isEAkimbo || isAJumelle) {
                exec.push("{{vMStyleA=-1D}}");
                cRoll.push(-1);
            } else {
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
            }

            exec.push("{{vMStyleD=+"+diceDegats+"D6}}");
            dDegats += Number(diceDegats);

            exec.push("{{vMStyleV=+"+Math.ceil(Number(diceViolence)/2)+"D6}}");
            dViolence += Math.ceil(Number(diceViolence)/2);
            
            if(isAAgressive)
                autresAmeliorationsS.push(i18n_agressive);
            break;

        case "ambidextre":
            bName = "atkAmbidextre";
            modA = value[bName];

            exec.push("{{style="+i18n_style+" "+i18n_ambidextre+"}}");

            if(hasArmure) {
                if(oCombat >= 4 || isEAmbidextrie || isASoeur) {

                    exec.push("{{vMStyleA=-1D}}");
                    cRoll.push(-1);
                    
                } else {

                    exec.push("{{vMStyleA="+modA+"D}}");
                    cRoll.push(Number(modA));
                    
                }
            } else if(isEAmbidextrie || isASoeur) {

                exec.push("{{vMStyleA=-1D}}");
                cRoll.push(-1);
                
            } else {

                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
                
            }
            
            if(isAAgressive)
                autresAmeliorationsS.push(i18n_agressive);
            break;

        case "defensif":
            bName = "atkDefensif";
            modA = value[bName];

            exec.push("{{style="+i18n_style+" "+i18n_defensif+"}}");

            if(isAProtectrice) {
                exec.push("{{vMStyleA=-1D}}");
                cRoll.push(-1);
                
            } else {

                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
                
            }
            
            if(isAAgressive)
                autresAmeliorationsS.push(i18n_agressive);
            break;

        case "pilonnage":
            exec.push("{{style="+i18n_style+" "+i18n_pilonnage+"}}");
            
            if(isAAgressive)
                autresAmeliorationsS.push(i18n_agressive);
            break;

        case "suppression":
            exec.push("{{style="+i18n_style+" "+i18n_suppression+"}}");    
            
            if(isAAgressive)
                autresAmeliorationsS.push(i18n_agressive);
            break;
        
        case "precis":
            exec.push("{{style="+i18n_style+" "+i18n_precis+"}}");

            if(isEDeuxMains && !isAAllegee) {         
                if(cPrecis != "0") {
                    let CPNom = cPrecis.slice(2, -1);

                    exec.push("{{cPrecis="+CaracNom[CPNom]+"}}");

                    let CPValue = Number(CaracValue[CPNom].value);

                    cRoll.push(CPValue);

                    exec.push(`{{vMStyleA=${CPValue}D}}`);
                }
            }
            break;
        
        case "puissant":
            exec.push("{{style="+i18n_style+" "+i18n_puissant+"}}");

            if(isELourd) {
                let type = value[`stylePuissantType`];
                let bonus = Number(value[`stylePuissantBonus`]);
                let malus = 0-bonus;

                exec.push(`{{vMStyleA=${malus}D}}`);
                cRoll.push(malus);

                if(type.includes("stylePuissantD")) {
                    exec.push(`{{vMStyleD=+${bonus}D}}`);
                    dDegats += bonus;
                }

                if(type.includes("stylePuissantV")) {
                    exec.push(`{{vMStyleV=+${bonus}D}}`);
                    dViolence += bonus;
                }
            }
            break;
    }

    result["exec"] = exec;
    result["cRoll"] = cRoll;
    result["autresAmeliorationsS"] = autresAmeliorationsS;
    result["diceDegats"] = dDegats;
    result["diceViolence"] = dViolence;

    return result;
}

function getStyleDistanceMod(value, diceDegats, diceViolence, pilonnage, hasArmure, oTir, isEAkimbo, isEAmbidextrie, isDeuxMains, isLourd) {
    let result = {};

    let exec = [];
    let cRoll = [];

    let dDegats = 0;
    let dViolence = 0;

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
            cRoll.push(Number(modA));
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

            if(hasArmure) {
                if(oTir >= 3 || isEAkimbo) {
                    exec.push("{{vMStyleA=-1D}}");
                    cRoll.push(-1);
                }
                else {
                    exec.push("{{vMStyleA="+modA+"D}}");
                    cRoll.push(Number(modA));
                }
            }
            else if(isEAkimbo) {
                exec.push("{{vMStyleA=-1D}}");
                cRoll.push(-1);
            } else {
                exec.push("{{vMStyleA="+modA+"D}}");
                cRoll.push(Number(modA));
            }

            exec.push("{{vMStyleD=+"+diceDegats+"D6}}");
            diceDegats += Number(diceDegats);

            exec.push("{{vMStyleV=+"+Math.ceil(Number(diceViolence)/2)+"D6}}");
            diceViolence += Math.ceil(Number(diceViolence)/2);
            break;

        case "ambidextre":
            bName = "atkAmbidextre";
            modA = value[bName];

            exec.push("{{style="+i18n_style+" "+i18n_ambidextre+"}}");

            if(hasArmure) {
                if(oTir >= 4 || isEAmbidextrie) {

                    exec.push("{{vMStyleA=-1D}}");
                    cRoll.push(-1);
                    
                } else {

                    exec.push("{{vMStyleA="+modA+"D}}");
                    cRoll.push(Number(modA));
                    
                }
            } else if(isEAmbidextrie) {

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

            exec.push("{{style="+i18n_style+" "+i18n_pilonnage+"}}");

            exec.push("{{vMStyleA="+modA+"D}}");
            cRoll.push(Number(modA));

            if(isDeuxMains) {
                let bDegats = Number(pilonnage)-1;

                if(bDegats < 0)
                    bDegats = 0;
    
                exec.push("{{vMStyleD=+"+bDegats+"D6}}");
                    dDegats += Number(bDegats);
            }
            break;

        case "suppression":
            exec.push("{{style="+i18n_style+" "+i18n_suppression+"}}");

            if(isLourd) {
                let suppressionD = Math.floor(Number(value["styleSuppressionD"])/2);
                let suppressionV = Math.floor(Number(value["styleSuppressionV"])/2);

                if(suppressionD != 0) {
                    dDegats -= suppressionD;
                    exec.push("{{vMStyleD=-"+suppressionD+"D6}}");
                }

                if(suppressionV != 0) {
                    dViolence -= suppressionV;
                    exec.push("{{vMStyleV=-"+suppressionV+"D6}}");
                }
            }
            break;
        
        case "precis":
            exec.push("{{style="+i18n_style+" "+i18n_precis+"}}");
            break;
        
        case "puissant":
            exec.push("{{style="+i18n_style+" "+i18n_puissant+"}}");

            if(isLourd) {
                let bDegats = Number(value["styleSuppressionD"]);
                let bViolence = Number(value["styleSuppressionV"]);

                if(bDegats != 0) {
                    dDegats -= bDegats;
                    exec.push("{{vMStyleD=-"+bDegats+"D6}}");
                }
            
                if(bViolence != 0) {
                    dViolence -= bViolence;
                    exec.push("{{vMStyleV=-"+bViolence+"D6}}");
                }            
            }
            break;
    }

    result["exec"] = exec;
    result["cRoll"] = cRoll;
    result["diceDegats"] = dDegats;
    result["diceViolence"] = dViolence;

    return result;
}