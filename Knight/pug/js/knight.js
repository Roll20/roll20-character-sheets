
on("change:armure change:armureLegende"
, function() 
{
    getAttrs(["armure", "armureLegende", "warmaster150PG", "warmaster250PG"], function(value)
    {
        const Arm = value["armure"];
        const ArmL = value["armureLegende"];

        donneesPJ["Armure"] = Arm;
        donneesPJ["ArmureLegende"] = ArmL;
    
        switch(Arm)
        {
            case "barbarian":					
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:5,
                    slotBG:5,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:5,
                    slotBDMax:5,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            case "bard":					
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:5,
                    slotBG:5,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:5,
                    slotBDMax:5,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            case "berserk":					
                    setAttrs({
                    slotTeteMax:6,
                    slotTete:6,
                    slotBGMax:6,
                    slotBG:6,
                    slotTorse:10,
                    slotTorseMax:10,
                    slotJG:6,
                    slotJGMax:6,
                    slotBD:6,
                    slotBDMax:6,
                    slotJDMax:6,
                    slotJD:6
                    });
                break;
            case "druid":						
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:5,
                    slotBG:5,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:5,
                    slotBDMax:5,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            case "monk":					
                    setAttrs({
                    slotTeteMax:7,
                    slotTete:7,
                    slotBGMax:8,
                    slotBG:8,
                    slotTorse:10,
                    slotTorseMax:10,
                    slotJG:6,
                    slotJGMax:6,
                    slotBD:8,
                    slotBDMax:8,
                    slotJDMax:6,
                    slotJD:6
                    });
                break;
            case "necromancer":					
                    setAttrs({
                    slotTeteMax:12,
                    slotTete:12,
                    slotBGMax:12,
                    slotBG:12,
                    slotTorse:12,
                    slotTorseMax:12,
                    slotJG:12,
                    slotJGMax:12,
                    slotBD:12,
                    slotBDMax:12,
                    slotJDMax:12,
                    slotJD:12
                    });
                break;
            case "paladin":					
                    setAttrs({
                    slotTeteMax:7,
                    slotTete:7,
                    slotBGMax:7,
                    slotBG:7,
                    slotTorse:10,
                    slotTorseMax:10,
                    slotJG:7,
                    slotJGMax:7,
                    slotBD:7,
                    slotBDMax:7,
                    slotJDMax:7,
                    slotJD:7
                    });
                break;
            case "priest":					
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:5,
                    slotBG:5,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:5,
                    slotBDMax:5,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            case "psion":					
                    setAttrs({
                    slotTeteMax:7,
                    slotTete:7,
                    slotBGMax:10,
                    slotBG:10,
                    slotTorse:12,
                    slotTorseMax:12,
                    slotJG:7,
                    slotJGMax:7,
                    slotBD:10,
                    slotBDMax:10,
                    slotJDMax:7,
                    slotJD:7
                    });
                break;
            case "ranger":					
                    setAttrs({
                    slotTeteMax:4,
                    slotTete:4,
                    slotBGMax:4,
                    slotBG:4,
                    slotTorse:6,
                    slotTorseMax:6,
                    slotJG:4,
                    slotJGMax:4,
                    slotBD:4,
                    slotBDMax:4,
                    slotJDMax:4,
                    slotJD:4
                    });
                break;
            case "rogue":					
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:5,
                    slotBG:5,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:5,
                    slotBDMax:5,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            case "shaman":					
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:5,
                    slotBG:5,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:5,
                    slotBDMax:5,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            case "sorcerer":					
                    setAttrs({
                    slotTeteMax:7,
                    slotTete:7,
                    slotBGMax:8,
                    slotBG:8,
                    slotTorse:10,
                    slotTorseMax:10,
                    slotJG:6,
                    slotJGMax:6,
                    slotBD:8,
                    slotBDMax:8,
                    slotJDMax:6,
                    slotJD:6
                    });
                break;
            case "warlock":					
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:8,
                    slotBG:8,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:8,
                    slotBDMax:8,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            case "warmaster":					
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:5,
                    slotBG:5,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:5,
                    slotBDMax:5,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            case "warrior":					
                    setAttrs({
                    slotTeteMax:7,
                    slotTete:7,
                    slotBGMax:10,
                    slotBG:10,
                    slotTorse:12,
                    slotTorseMax:12,
                    slotJG:7,
                    slotJGMax:7,
                    slotBD:10,
                    slotBDMax:10,
                    slotJDMax:7,
                    slotJD:7
                    });
                break;
            case "wizard":					
                    setAttrs({
                    slotTeteMax:5,
                    slotTete:5,
                    slotBGMax:5,
                    slotBG:5,
                    slotTorse:8,
                    slotTorseMax:8,
                    slotJG:5,
                    slotJGMax:5,
                    slotBD:5,
                    slotBDMax:5,
                    slotJDMax:5,
                    slotJD:5
                    });
                break;
            default:
                setAttrs({
                    slotTeteMax:0,
                    slotTete:0,
                    slotBGMax:0,
                    slotBG:0,
                    slotTorse:0,
                    slotTorseMax:0,
                    slotJG:0,
                    slotJGMax:0,
                    slotBD:0,
                    slotBDMax:0,
                    slotJDMax:0,
                    slotJD:0
                    });
                break;
        }
        
        const W150PG = parseInt(value["warmaster150PG"],10)||0;
        const W250PG = parseInt(value["warmaster250PG"],10)||0;
    
        const armModif = armure[Arm]["armureModif"];
        const eneModif = armure[Arm]["energieModif"];
        const cdfModif = armure[Arm]["cdfModif"];
        
        var totalEnergie = armure[Arm]["energieMax"]+eneModif;
        
        if(Arm == "warmaster")
        {
            if(W150PG != 0)
                totalEnergie = armure[Arm]["energieMax150"]+eneModif;
                
            if(W250PG != 0)
                totalEnergie = armure[Arm]["energieMax250"]+eneModif;
        }

        setAttrs({
            armurePJ:armure[Arm]["armure"],
            armurePJ_max:armure[Arm]["armureMax"]+armModif,
            armurePJModif:armure[Arm]["armureModif"],
            energiePJ:armure[Arm]["energie"],
            energiePJ_max:totalEnergie,
            energiePJModif:armure[Arm]["energieModif"],
            cdfPJ:armure[Arm]["cdf"]+cdfModif,
            cdfPJ_max:armure[Arm]["cdfMax"]+cdfModif,
            cdfPJModif:armure[Arm]["cdfModif"],
            barbarianGoliath:0,
            berserkIlluminationBeaconA:0,
            berserkIlluminationTorchA:0,
            berserkIlluminationProjectorA:0,
            berserkIlluminationLighthouseA:0,
            berserkIlluminationLanternA:0,
            berserkRageA:0,
            shamanNbreTotem:0,
            shamanAscension:0,
            sorcererMMVolNuee: 0,
            sorcererMMPhase: 0,
            sorcererMMEtirement: 0,
            sorcererMMCorpMetal: 0,
            sorcererMMCorpFluide: 0,
            sorcererMMPMGuerre: 0,
            sorcererMM250PG: 0,
            warlockForward: 0,
            warlockRecord: 0,
            warlockRewind: 0,
            warmasterImpFPersonnel:0,
            warmasterImpGPersonnel:0,
            warriorSoldierA:0,
            warriorHunterA:0,
            warriorScholarA:0,
            warriorHeraldA:0,
            warriorScoutA:0,
            MALWarriorSoldierA:0,
            MALWarriorHunterA:0,
            MALWarriorScholarA:0,
            MALWarriorHeraldA:0,
            MALWarriorScoutA:0,
            MALWarmasterImpFPersonnel:0,
            MALWarmasterImpGPersonnel:0,
            MALRogueGhost:0,
            rogueGhost:0,
            MALBarbarianGoliath:0,
        });
    });	
});

on("change:armurePJ sheet:opened"
, function() 
{
    getAttrs(["armure", "armurePJ"], function(value)
    {
        const Arm = value["armure"];
        const vArmure = parseInt(value["armurePJ"], 10)||0;
        
        armure[Arm]["armure"] = vArmure;
    });
});

on("change:energiePJ sheet:opened"
, function() 
{
    getAttrs(["armure", "energiePJ"], function(value)
    {
        const Arm = value["armure"];
        const vEnergie = parseInt(value["energiePJ"], 10)||0;
        
        armure[Arm]["energie"] = vEnergie;
    });
});
    
on("change:armurePJModif sheet:opened"
, function() 
{
    getAttrs(["armure", "armurePJModif"], function(value)
    {
        const Arm = value["armure"];
        const armModif = parseInt(value["armurePJModif"], 10)||0;
        
        armure[Arm]["armureModif"] = armModif;
        
        setAttrs({
            armurePJ_max:armure[Arm]["armureMax"]+armModif,
        });
    });
});

on("change:energiePJModif sheet:opened"
, function() 
{
    getAttrs(["armure", "warmaster150PG", "warmaster250PG", "energiePJModif"], function(value)
    {
        const Arm = value["armure"];
        const W150PG = parseInt(value["warmaster150PG"], 10)||0;
        const W250PG = parseInt(value["warmaster250PG"], 10)||0;
        const ene = armure[Arm]["energieMax"];
        const ene150 = armure[Arm]["energieMax150"];
        const ene250 = armure[Arm]["energieMax250"];
        const eneModif = parseInt(value["energiePJModif"], 10)||0;
        
        armure[Arm]["energieModif"] = eneModif;
        
        var total = ene;
        
        if(Arm == "warmaster")
        {
            if(W150PG != 0)
                total = ene150;
                
            if(W250PG != 0)
                total = ene250;
        }
            
        total += eneModif;
        
        setAttrs({
            energiePJ_max:total
        });
    });
});

//CDF
on("change:barbarianGoliath change:MALBarbarianGoliath change:MALWarmasterImpFPersonnel change:MALWarmasterImpForce change:warmasterImpFPersonnel change:warmasterImpForce change:cdfPJModif sheet:opened"
, function() 
{
    getAttrs(["armure", "armureLegende", "cdfPJModif", "MALBarbarianGoliath", "barbarianGoliath", "sorcererMMCorpMetal", "sorcerer150PG", "sorcererMM250PG", "MALWarmasterImpForce", "MALWarmasterImpFPersonnel", "warmasterImpFPersonnel", "warmasterImpForce"], function(value)
    {
        const Arm = value["armure"];
        const MAL = value["armureLegende"];
        const cdfModif = parseInt(value["cdfPJModif"], 10)||0;
        
        const goliath = parseInt(value["barbarianGoliath"], 10)||0;
        const goliathMAL = parseInt(value["MALBarbarianGoliath"], 10)||0;
        
        const CorpMetal = value["sorcererMMCorpMetal"];
        const CM150PG = value["sorcerer150PG"];
        const CM250PG = value["sorcererMM250PG"];
        
        const WIF = value["warmasterImpForce"];
        const WIFPers = parseInt(value["warmasterImpFPersonnel"], 10)||0;
        
        const WIFMAL = value["MALWarmasterImpForce"];
        const WIFPersMAL = parseInt(value["MALWarmasterImpFPersonnel"], 10)||0;
        
        armure[Arm]["cdfModif"] = cdfModif;
        
        var bonus = 0;
        
        if(Arm == "barbarian")
            bonus += goliath;
            
        if(Arm == "sorcerer")
        {
            if(CorpMetal != 0 || CM250PG != 0)
            {
                bonus += 2;
                
                if(CM150PG != 0)
                    bonus += 2;
            }
        }
        
        if(Arm == "warmaster" && WIFPers != 0 && WIF == "on")
            bonus += WIFPers;
        
        if(MAL == "barbarian")
            bonus += goliathMAL;
            
        if(MAL == "warmaster" && WIFPersMAL != 0 && WIFMAL == "on")
            bonus += WIFPersMAL;
        
        setAttrs({
            cdfPJ:armure[Arm]["cdf"]+cdfModif+bonus,
            cdfPJ_max:armure[Arm]["cdfMax"]+cdfModif+bonus
        });
    });
});

//ESPOIR
on("change:fichePNJ change:armure change:espoirModif change:berserk250PG sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "espoirModif", "berserk250PG", "espoirNecr", "espoirNecrModif", "MAJSheetworker"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        if(fichePNJ == 0)
        {
            const Arm = value["armure"];
            const majE = parseInt(value["MAJSheetworker"], 10)||0;
            const espoirBers = value["berserk250PG"];
            const espoirNecr = parseInt(value["espoirNecr"], 10)||0;
            const espoirNMod = parseInt(value["espoirNecrModif"], 10)||0;
            
            var bonusEspoir = 0;
            
            if(espoirNMod != 0 && majE != 1 && Arm == "necromancer")
            {
                setAttrs({
                    espoirModif: espoirNMod,
                    espoirNecrModif: 0
                });
            }
            
            if(espoirNecr != 10 && Arm == "necromancer" && majE != 1)
            {
                setAttrs({
                    espoir: espoirNecr,
                    espoirNecr: 10
                });
            }
            
            if(Arm == "berserk")
            {
                if(espoirBers == "on")
                    bonusEspoir = 25;
                else
                    bonusEspoir = 15;
            }
            
                            
            const espoir = parseInt(value["espoirModif"], 10)||0;
            
            switch(Arm)
            {
                case "berserk":
                    setAttrs({
                        espoir_max: 50+espoir+bonusEspoir
                    });
                    break;
                case "necromancer":
                    setAttrs({
                        espoir_max: 10+espoir+bonusEspoir
                    });
                    break;
                default:
                    setAttrs({
                        espoir_max: 50+espoir+bonusEspoir
                    });
                    break;
            }
        }
    });
});

//EGIDE
on("change:fichePNJ change:armure change:berserkNiveaux change:berserkRageN1Egide change:berserkRageN2Egide change:berserkRageN3Egide sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "berserkNiveaux", "berserkRageN1Egide", "berserkRageN2Egide", "berserkRageN3Egide"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        
        if(fichePNJ == 0)
        {
            const Arm = value["armure"];
            
            var bonusEgide = 0;
            
            if(Arm == "berserk")
            {
                const rage = parseInt(value["berserkNiveaux"], 10)||0;
                const egideN1 = parseInt(value["berserkRageN1Egide"], 10)||0;
                const egideN2 = parseInt(value["berserkRageN2Egide"], 10)||0;
                const egideN3 = parseInt(value["berserkRageN3Egide"], 10)||0;
            
                bonusEgide = 6;
                            
                switch(rage)
                {
                    case 1:
                        bonusEgide += egideN1;
                        break;
                    
                    case 2:
                        bonusEgide += egideN2;
                        break;
                        
                    case 3:
                        bonusEgide += egideN3;
                        break;
                }
            }
            
            setAttrs({
                egideBonus:bonusEgide
            });
        }
    });
});

//DEFENSE
on("change:fichePNJ change:armure change:armureLegende change:defense change:defBM change:bonusDefense change:defenseODBonus change:defenseModifPerso change:barbarianDef change:berserkNiveaux change:berserkRageN1DR change:berserkRageN2DR change:berserkRageN3DR change:sorcererMMCorpFluide change:sorcerer150PG change:sorcererMM250PG change:warmasterImpEPersonnel change:warmasterImpEsquive change:MALWarmasterImpEPersonnel change:MALWarmasterImpEsquive change:MALBarbarianDef change:MasquePNJAE change:MasquePNJAEMaj change:defensePNJ change:MADDjinnNanobrumeActive sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "armureLegende", "defense", "defBM", "bonusDefense", "defenseODBonus", "defenseModifPerso", "barbarianDef", "berserkNiveaux", "berserkRageN1DR", "berserkRageN2DR", "berserkRageN3DR", "sorcererMMCorpFluide", "sorcerer150PG", "sorcerer250PG", "sorcererMM250PG", "warmasterImpEPersonnel", "warmasterImpEsquive", "MALWarmasterImpEPersonnel", "MALWarmasterImpEsquive", "MALBarbarianDef", "MasquePNJAE", "MasquePNJAEMaj", "defensePNJ", "defenseModifPNJ", "MADDjinnNanobrumeActive"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        const bonusDefense = parseInt(value["bonusDefense"], 10)||0;
        const defenseModifPerso = parseInt(value["defenseModifPerso"], 10)||0;
        const AE = parseInt(value["MasquePNJAE"], 10)||0;
        const AEM = parseInt(value["MasquePNJAEMaj"], 10)||0;
        const defensePNJ = parseInt(value["defensePNJ"], 10)||0;
        
        var defenseM = 0;
        var defenseT = 0;
        var defenseMecha = 0;
        
        if(fichePNJ == 0)
        {				
            const armure = value["armure"];
            const MAL = value["armureLegende"];
            const defense = parseInt(value["defense"], 10)||0;
            const defBM = parseInt(value["defBM"], 10)||0;
            
            const defenseODBonus = parseInt(value["defenseODBonus"], 10)||0;
            
            const barbarianDef = parseInt(value["barbarianDef"], 10)||0;
            
            const berserkRage = parseInt(value["berserkNiveaux"], 10)||0;
            const berserkN1 = parseInt(value["berserkRageN1DR"], 10)||0;
            const berserkN2 = parseInt(value["berserkRageN2DR"], 10)||0;
            const berserkN3 = parseInt(value["berserkRageN3DR"], 10)||0;
            
            const CorpFluide = value["sorcererMMCorpFluide"];
            const sorcerer150PG = value["sorcerer150PG"];
            const sorcerer250PG = value["sorcerer250PG"];
            const sorcererMM250PG = value["sorcererMM250PG"];
            
            const warmasterEP = parseInt(value["warmasterImpEPersonnel"], 10)||0;
            const warmasterE = value["warmasterImpEsquive"];
            
            const MALWarmasterEP = parseInt(value["MALWarmasterImpEPersonnel"], 10)||0;
            const MALWarmasterE = value["MALWarmasterImpEsquive"];
            
            const MALBarbarianDef = parseInt(value["MALBarbarianDef"], 10)||0;
            
            const nanobrume = parseInt(value["MADDjinnNanobrumeActive"], 10)||0;
            
            var defenseMecha = defense+defBM+defenseODBonus;
            
            if(nanobrume == 1)
                defenseMecha += 3;
            
            switch(armure)
            {
                case "sans":
                case "guardian":
                    defenseM = defBM+bonusDefense;
                    break;
                    
                case "barbarian":
                    defenseM = defBM+bonusDefense+defenseODBonus-barbarianDef;
                    break;
                    
                case "berserk":
                    defenseM = defBM+bonusDefense+defenseODBonus;
                
                    if(berserkRage == 1)
                        defenseM -= berserkN1;
                    else if(berserkRage == 2)
                        defenseM -= berserkN2;
                    else if(berserkRage == 3)
                        defenseM -= berserkN3;
                    break;
                    
                case "sorcerer":
                        defenseM = defBM+bonusDefense+defenseODBonus;
                        
                        if(sorcerer250PG != "0")
                        {
                            if(sorcererMM250PG != "0")
                            {
                                defenseM += 3;
                            }
                        }
                        else
                        {
                            if(CorpFluide != "0")
                            {
                                defenseM += 2;
                                
                                if(sorcerer150PG != "0")
                                    defenseM += 1;
                            }
                        }
                    break;
                    
                case "warmaster":
                    defenseM = defBM+bonusDefense+defenseODBonus;
                        
                        if(warmasterEP != "0" && warmasterE != "0")
                            defenseM += 2;
                    break;
                    
                default:
                    defenseM = defBM+bonusDefense+defenseODBonus;
                    break;
            }
            
            if(MAL == "warmaster" && MALWarmasterEP != "0" && MALWarmasterE != "0")
                defenseM += 2;
                
            if(MAL == "barbarian")
                defenseM -= MALBarbarianDef;
            
            defenseT += Math.max(defense+defenseM+defenseModifPerso, 0)
        }
        if(fichePNJ == 1 || fichePNJ == 2)
        {
            defenseM += bonusDefense;
            defenseM += AE;
            defenseM += AEM;
            
            defenseT += Math.max(defensePNJ+defenseM+defenseModifPerso, 0);
        }
        if(fichePNJ == 3)
        {
            defenseM += AE;
            defenseM += AEM;
            
            defenseT += Math.max(defensePNJ+defenseM+defenseModifPerso, 0);
        }
        
        setAttrs({
            defenseModif: defenseM,
            defenseTotal: defenseT,
            mechaArmureDefense: defenseMecha
        });
    });
});

//REACTION
on("change:fichePNJ change:armure change:armureLegende change:reaction change:rctBM change:bonusReaction change:reactionODBonus change:reactionModifPerso change:barbarianRea change:berserkNiveaux change:berserkRageN1DR change:berserkRageN2DR change:berserkRageN3DR change:paladinWatchtower change:sorcererMMCorpFluide change:sorcerer150PG change:sorcererMM250PG change:warmasterImpEPersonnel change:warmasterImpEsquive change:MALWarmasterImpEsquive change:MALWarmasterImpEPersonnel change:MALBarbarianRea change:MachinePNJAE change:MachinePNJAEMaj change:reactionPNJ change:MADDjinnNanobrumeActive sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "armureLegende", "reaction", "rctBM", "bonusReaction", "reactionODBonus", "reactionModifPerso", "barbarianRea", "berserkNiveaux", "berserkRageN1DR", "berserkRageN2DR", "berserkRageN3DR", "paladinWatchtower", "sorcererMMCorpFluide", "sorcerer150PG", "sorcerer250PG", "sorcererMM250PG", "warmasterImpEPersonnel", "warmasterImpEsquive", "MALWarmasterImpEPersonnel", "MALWarmasterImpEsquive", "MALBarbarianRea", "MachinePNJAE", "MachinePNJAEMaj", "reactionPNJ", "MADDjinnNanobrumeActive"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        const bonusReaction = parseInt(value["bonusReaction"], 10)||0;
        const reactionModifPerso = parseInt(value["reactionModifPerso"], 10)||0;
        const AE = parseInt(value["MachinePNJAE"], 10)||0;
        const AEM = parseInt(value["MachinePNJAEMaj"], 10)||0;
        const reactionPNJ = parseInt(value["reactionPNJ"], 10)||0;
        
        var reactionM = 0;
        var reactionT = 0;
        var reactionMecha = 0;

        if(fichePNJ == 0)
        {				
            const armure = value["armure"];
            const MAL = value["armureLegende"];
            const reaction = parseInt(value["reaction"], 10)||0;
            const rctBM = parseInt(value["rctBM"], 10)||0;
            
            const reactionODBonus = parseInt(value["reactionODBonus"], 10)||0;
            
            const barbarianRea = parseInt(value["barbarianRea"], 10)||0;
            
            const berserkRage = parseInt(value["berserkNiveaux"], 10)||0;
            const berserkN1 = parseInt(value["berserkRageN1DR"], 10)||0;
            const berserkN2 = parseInt(value["berserkRageN2DR"], 10)||0;
            const berserkN3 = parseInt(value["berserkRageN3DR"], 10)||0;
            
            const paladinWatchtower = value["paladinWatchtower"];
            
            const CorpFluide = value["sorcererMMCorpFluide"];
            const sorcerer150PG = value["sorcerer150PG"];
            const sorcerer250PG = value["sorcerer250PG"];
            const sorcererMM250PG = value["sorcererMM250PG"];
            
            const warmasterEP = parseInt(value["warmasterImpEPersonnel"], 10)||0;
            const warmasterE = value["warmasterImpEsquive"];
            
            const MALWarmasterEP = parseInt(value["MALWarmasterImpEPersonnel"], 10)||0;
            const MALWarmasterE = value["MALWarmasterImpEsquive"];
            
            const MALBarbarianRea = parseInt(value["MALBarbarianRea"], 10)||0;
            
            const nanobrume = parseInt(value["MADDjinnNanobrumeActive"], 10)||0;
            
            var reactionMecha = reaction+rctBM+reactionODBonus;
            
            if(nanobrume == 1)
                reactionMecha += 3;
            
            switch(armure)
            {
                case "sans":
                case "guardian":
                    reactionM = rctBM+bonusReaction;
                    break;
                    
                case "barbarian":
                    reactionM = rctBM+bonusReaction+reactionODBonus-barbarianRea;
                    break;
                    
                case "berserk":
                    reactionM = rctBM+bonusReaction+reactionODBonus;
                
                    if(berserkRage == 1)
                        reactionM -= berserkN1;
                    else if(berserkRage == 2)
                        reactionM -= berserkN2;
                    else if(berserkRage == 3)
                        reactionM -= berserkN3;							
                    break;
                                        
                case "sorcerer":
                        reactionM = rctBM+bonusReaction+reactionODBonus;
                        
                        if(sorcerer250PG != "0")
                        {
                            if(sorcererMM250PG != "0")
                            {
                                reactionM += 3;
                            }
                        }
                        else
                        {
                            if(CorpFluide != "0")
                            {
                                reactionM += 2;
                                
                                if(sorcerer150PG != "0")
                                    reactionM += 1;
                            }
                        }
                    break;
                    
                case "warmaster":
                    reactionM = rctBM+bonusReaction+reactionODBonus;
                        
                        if(warmasterEP != "0" && warmasterE != "0")
                            reactionM += 2;
                    break;
                    
                default:
                    reactionM = rctBM+bonusReaction+reactionODBonus;
                    break;
            }
            
            if(MAL == "warmaster" && MALWarmasterEP != "0" && MALWarmasterE != "0")
                reactionM += 2;
                
            if(MAL == "barbarian")
                reactionM -= MALBarbarianRea;
            
            reactionT += Math.max(reaction+reactionM+reactionModifPerso, 0)

            if(armure == "paladin" && paladinWatchtower == "Activé")
            {
                reactionM += Math.ceil(0-(reactionT/2));
                reactionT = Math.max(reaction+reactionM+reactionModifPerso, 0);
            }
        }
        if(fichePNJ == 1 || fichePNJ == 2)
        {
            reactionM += bonusReaction;
            reactionM += AE;
            reactionM += AEM;
            
            reactionT += Math.max(reactionPNJ+reactionM+reactionModifPerso, 0);
        }
        if(fichePNJ == 3)
        {
            reactionM += AE;
            reactionM += AEM;
            
            reactionT += Math.max(reactionPNJ+reactionM+reactionModifPerso, 0);
        }

        setAttrs({
            reactionModif: reactionM,
            reactionTotal: reactionT,
            mechaArmureReaction: reactionMecha
        });
    });
});

//RESILIENCE
on("clicked:calculResilienceFinal"
, function() 
{
    getAttrs(["listeTypePNJ", "armurePNJ_max", "santePNJ_max"], function(value)
    {
        const type = parseInt(value["listeTypePNJ"], 10)||0;
        const armure = parseInt(value["armurePNJ_max"], 10)||0;
        const sante = parseInt(value["santePNJ_max"], 10)||0;
        
        var total = 0;
                    
        switch(type)
        {
            case 1:
                if(sante > 0)
                {
                    total = Math.floor(sante/10);
                }
                else
                {
                    total = Math.floor(armure/10);
                }
                break;
                
            case 2:
                if(sante > 0)
                {
                    total = Math.floor(sante/10)*2;
                }
                else
                {
                    total = Math.floor(armure/10)*2;
                }
                break;
                
            case 3:
                if(sante > 0)
                {
                    total = Math.floor(sante/10)*3;
                }
                else
                {
                    total = Math.floor(armure/10)*3;
                }
                break;
                
            case 4:
                if(sante > 0)
                {
                    total = Math.floor(sante/30);
                }
                else
                {
                    total = Math.floor(armure/30);
                }
                break;
                
            case 5:
                if(sante > 0)
                {
                    total = Math.floor(sante/20);
                }
                else
                {
                    total = Math.floor(armure/20);
                }
                break;
                
            case 6:
                if(sante > 0)
                {
                    total = Math.floor(sante/10);
                }
                else
                {
                    total = Math.floor(armure/10);
                }
                break;
        }
        
        
    
        setAttrs({
            popup: 0,
            resilience: total,
            resilience_max: total
        });
    });
});

on("clicked:calculerResilience"
, function() 
{
    setAttrs({
        popup: 2
    });			
});

on("change:fichePNJ change:berserk350PG sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "berserk350PG"], function(value)
    {
        const state = value["berserk350PG"];
        
        if(state == "on")
        {
            setAttrs({
                berserkIlluminationBlazeDgts: "4D6",
                berserkIlluminationBlazeViolence: "4D6",
                berserkIlluminationBeaconBonus: "4 "+getTranslationByKey("reussites-automatiques"),
                berserkIlluminationTorchEgide: "4"
            });
        }
        else
        {
            setAttrs({
                berserkIlluminationBlazeDgts: "2D6",
                berserkIlluminationBlazeViolence: "2D6",
                berserkIlluminationBeaconBonus: "2 "+getTranslationByKey("reussites-automatiques"),
                berserkIlluminationTorchEgide: "2"
            });
        }
    });
});
    
//BARBARIAN
on("change:fichePNJ change:barbarianNoMDefense change:barbarianGoliath sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "barbarianGoliath", "barbarianNoMDefense"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        if(fichePNJ == 0)
        {				
            const Arm = value["armure"];
            const goliath = parseInt(value["barbarianGoliath"], 10)||0;
            const barbarian200 = value["barbarianNoMDefense"];
            
            var totalGoliath = goliath;
            
            if(barbarian200 != "0")
                totalGoliath -= goliath;
                            
            setAttrs({
                barbarianDef: totalGoliath,
                barbarianRea: goliath*2,
                barbarianDegat: totalGoliath+"D6"
            });
        }
    });
});

//SHAMAN
on("change:fichePNJ change:shamanAscension change:shamanAscensionEnergie sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "shamanAscension", "shamanAscensionEnergie"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        
        if(fichePNJ == 0)
        {				
            const ascension = parseInt(value["shamanAscension"], 10)||0;;
            const energie = parseInt(value["shamanAscensionEnergie"], 10)||0;

            if(ascension == 1)
            {
                setAttrs({
                    energieAscension_max: energie
                });
            }
        }
    });
});

on("change:fichePNJ change:armurePJModif change:cdfPJModif sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armurePJModif", "cdfPJModif"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        
        if(fichePNJ == 0)
        {
            const armure = 60;
            const cdf = 10;
            
            const armureModif = parseInt(value["armurePJModif"], 10)||0;;
            const cdfModif = parseInt(value["cdfPJModif"], 10)||0;
                
            setAttrs({
                armureAscension_max: armure+armureModif,
                cdfAscension_max: cdf+cdfModif
            });
        }
    });
});

on("change:fichePNJ change:shaman150PG change:shamanNbreTotem"
, function() 
{
    getAttrs(["fichePNJ", "shaman150PG", "shamanNbreTotem"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        
        if(fichePNJ == 0)
        {				
            const shaman150PG = parseInt(value["shaman150PG"], 10)||0;;
            const totem = parseInt(value["shamanNbreTotem"], 10)||0;
            
            if(totem == 3)
            {
                if(shaman150PG == 0)
                {
                    setAttrs({
                        shamanNbreTotem: 2
                    });
                }
            }
        }
    });
});

//SORCERER
on("change:fichePNJ change:sorcererMMCorpMetal change:sorcererMM250PG change:sorcerer150PG sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "sorcererMMCorpMetal", "sorcererMM250PG", "sorcerer150PG"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        
        if(fichePNJ == 0)
        {				
            const Arm = value["armure"];
            const CorpMetal = value["sorcererMMCorpMetal"];
            const CM150PG = value["sorcerer150PG"];
            const CM250PG = value["sorcererMM250PG"];
            const cdf = armure[Arm]["cdfMax"];
            const cdfModif = armure[Arm]["cdfModif"];
            
            var bonus = 0;
            
            if(CorpMetal != 0 || CM250PG != 0)
            {
                bonus += 2;
                
                if(CM150PG != 0)
                    bonus += 2;
            }

            setAttrs({
                cdfPJ: cdf+cdfModif+bonus,
                cdfPJ_max: cdf+cdfModif+bonus
            });
        }
    });
});

//WARMASTER
on("change:fichePNJ change:warmaster150PG change:warmaster250PG sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "warmaster150PG", "warmaster250PG"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        
        if(fichePNJ == 0)
        {				
            const Arm = value["armure"];
            
            if(Arm == "warmaster")
            {					
                const W150PG = value["warmaster150PG"];
                const W250PG = value["warmaster250PG"];
                const ene = armure[Arm]["energieMax"];
                const ene150 = armure[Arm]["energieMax150"];
                const ene250 = armure[Arm]["energieMax250"];
                const eneModif = armure[Arm]["energieModif"];
                
                var total = ene;
                
                if(W150PG != 0)
                    total = ene150;
                    
                if(W250PG != 0)
                    total = ene250;
                    
                total += eneModif;
                                        
                setAttrs({
                    energiePJ_max: total
                });
            }
        }
    });
});

//GESTION DES ASPECTS ET CARACTERISTIQUES
on("change:fichePNJ change:armure change:chair change:deplacement change:force change:endurance change:calODDep change:calODFor change:calODEnd change:santeModif change:santeODBonus sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "chair", "deplacement", "force", "endurance", "calODDep", "calODFor", "calODEnd", "santeModif", "santeODBonus"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        if(fichePNJ == 0)
        {
            const armure = value["armure"];
            const chair = parseInt(value["chair"], 10)||0;
            const deplacement = parseInt(value["deplacement"], 10)||0;
            const force = parseInt(value["force"], 10)||0;
            const endurance = parseInt(value["endurance"], 10)||0;
            
            const calODDep = parseInt(value["calODDep"], 10)||0;
            const calODFor = parseInt(value["calODFor"], 10)||0;
            const calODEnd = parseInt(value["calODEnd"], 10)||0;
            
            const santepjModif = parseInt(value["santeModif"], 10)||0;
            const OD = parseInt(value["santeODBonus"], 10)||0;
            
            maxCar("deplacement", deplacement, chair);
            maxCar("force", force, chair);
            maxCar("endurance", endurance, chair);
                            
            /*SANTE*/
            setAttrs({
                santepj_max: 10+(Math.max(deplacement, force, endurance)*6)+santepjModif+OD
            });
        }
    });
});

on("change:fichePNJ change:armure change:bete change:hargne change:combat change:instinct change:calODHar change:calODCom change:calODIns sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "bete", "hargne", "combat", "instinct", "calODHar", "calODCom", "calODIns"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        if(fichePNJ == 0)
        {
            const armure = value["armure"];
            const bete = parseInt(value["bete"], 10)||0;
            const hargne = parseInt(value["hargne"], 10)||0;
            const combat = parseInt(value["combat"], 10)||0;
            const instinct = parseInt(value["instinct"], 10)||0;
            
            const calODHar = parseInt(value["calODHar"], 10)||0;
            const calODCom = parseInt(value["calODCom"], 10)||0;
            const calODIns = parseInt(value["calODIns"], 10)||0;
            
            maxCar("hargne", hargne, bete);
            maxCar("combat", combat, bete);
            maxCar("instinct", instinct, bete);
            
            var totalDefense = 0;
            
            switch(armure)
            {
                case "sans":
                case "guardian":
                    totalDefense = Math.max(hargne, combat, instinct);
                    break;
                    
                default:
                    totalDefense = Math.max(hargne+calODHar, combat+calODCom, instinct+calODIns);
                    break;
            }
            
            setAttrs({
                defense: totalDefense
            });
        }
    });
});

on("change:fichePNJ change:armure change:machine change:tir change:savoir change:technique change:calODTir change:calODSav change:calODTec sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "machine", "tir", "savoir", "technique", "calODTir", "calODSav", "calODTec"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        if(fichePNJ == 0)
        {
            const armure = value["armure"];
            const machine = parseInt(value["machine"], 10)||0;
            const tir = parseInt(value["tir"], 10)||0;
            const savoir = parseInt(value["savoir"], 10)||0;
            const technique = parseInt(value["technique"], 10)||0;
            
            const calODTir = parseInt(value["calODTir"], 10)||0;
            const calODSav = parseInt(value["calODSav"], 10)||0;
            const calODTec = parseInt(value["calODTec"], 10)||0;
            
            maxCar("tir", tir, machine);
            maxCar("savoir", savoir, machine);
            maxCar("technique", technique, machine);
            
            var totalReaction = 0;
            
            switch(armure)
            {
                case "sans":
                case "guardian":
                    totalReaction = Math.max(tir, savoir, technique);
                    break;
                    
                default:
                    totalReaction = Math.max(tir+calODTir, savoir+calODSav, technique+calODTec);
                    break;
            }
            
            setAttrs({
                reaction: totalReaction
            });
        }
    });
});

on("change:fichePNJ change:armure change:dame change:aura change:parole change:sf change:calODAur change:calODPar change:calODSFR sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "dame", "aura", "parole", "sf", "calODAur", "calODPar", "calODSFR"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        if(fichePNJ == 0)
        {
            const armure = value["armure"];
            const dame = parseInt(value["dame"], 10)||0;
            const aura = parseInt(value["aura"], 10)||0;
            const parole = parseInt(value["parole"], 10)||0;
            const sf = parseInt(value["sf"], 10)||0;
            
            const calODAur = parseInt(value["calODAur"], 10)||0;
            const calODPar = parseInt(value["calODPar"], 10)||0;
            const calODSFR = parseInt(value["calODSFR"], 10)||0;
            
            maxCar("aura", aura, dame);
            maxCar("parole", parole, dame);
            maxCar("sf", sf, dame);
        }
    });
});

on("change:fichePNJ change:armure change:masque change:discretion change:dexterite change:perception change:calODDis change:calODPer change:calODDex change:initiativeODBonus sheet:opened"
, function() 
{
    getAttrs(["fichePNJ", "armure", "masque", "discretion", "dexterite", "perception", "calODDis", "calODPer", "calODDex", "initiativeODBonus"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        if(fichePNJ == 0)
        {
            const armure = value["armure"];
            const masque = parseInt(value["masque"], 10)||0;
            const discretion = parseInt(value["discretion"], 10)||0;
            const dexterite = parseInt(value["dexterite"], 10)||0;
            const perception = parseInt(value["perception"], 10)||0;
            
            const calODDis = parseInt(value["calODDis"], 10)||0;
            const calODPer = parseInt(value["calODPer"], 10)||0;
            const calODDex = parseInt(value["calODDex"], 10)||0;
            
            const initiativeODBonus = parseInt(value["initiativeODBonus"], 10)||0;
            
            maxCar("discretion", discretion, masque);
            maxCar("dexterite", dexterite, masque);
            maxCar("perception", perception, masque);
            
            /*INITIATIVE*/
            var totalInitiative = 0;
            switch(armure)
            {
                case "sans":
                case "guardian":
                    totalInitiative = Math.max(discretion, dexterite, perception);
                    break;
                    
                default:
                    totalInitiative = Math.max(discretion+calODDis, dexterite+calODDex, perception+calODPer)+initiativeODBonus;
                    break;
            }
            
            setAttrs({
                bonusInitiative: totalInitiative
            });
        }
    });
});

on("change:sorcerer250PG sheet:opened"
, function() 
{
    getAttrs(["sorcerer250PG"], function(value)
    {
        var NV = value["sorcerer250PG"];;
    
        if(NV == "on")
        {
            setAttrs
            ({
                sorcererMMVolNuee: 0,
                sorcererMMPhase: 0,
                sorcererMMEtirement: 0,
                sorcererMMCorpMetal: 0,
                sorcererMMCorpFluide: 0,
                sorcererMMPMGuerre: 0
            });
        }
        else
        {
            setAttrs
            ({
                sorcererMM250PG: 0
            });
        }
    });
});

on("change:monk150PG sheet:opened"
, function() 
{
    getAttrs(["monk150PG"], function(value)
    {
        var NV = Number(value["monk150PG"]);
    
        if(NV == 2)
        {
            setAttrs
            ({
                monkSalveDegat: "5D6",
                monkVagueDegat: "5D6",
                monkRayonDegat: "6D6",
                monkRayonViolence: "4D6"
            });
        }
        else
        {
            setAttrs
            ({
                monkSalveDegat: "3D6",
                monkVagueDegat: "3D6",
                monkRayonDegat: "4D6",
                monkRayonViolence: "2D6"
            });
        }
    });
});

on("change:monk150PG change:monk250PG sheet:opened"
, function() 
{
    getAttrs(["monk250PG", "monk150PG"], function(v)
    {
        let PG250 = parseInt(v["monk250PG"], 10)||0;
        let PG150 = parseInt(v["monk150PG"], 10)||0;

        let salveDegats = 3;
        let vagueDegats = 3;
        let rayonDegats = 4;
        let rayonViolence = 2;
    
        if(PG150 == 2) {
            salveDegats += 2;
            vagueDegats += 2;
            rayonDegats += 2;
            rayonViolence += 2;
        }

        if(PG250 == 1) {
            salveDegats += 2;
            vagueDegats += 2;
            rayonDegats += 2;
            rayonViolence += 2;

            setAttrs({
                monkSalveEffets: getTranslationByKey("parasitage")+" 1 / "+getTranslationByKey("dispersion")+" 6 / "+getTranslationByKey("ultraviolence")+" / "+getTranslationByKey("meutrier"), 
                monkVagueEffets: getTranslationByKey("parasitage")+" 4 / "+getTranslationByKey("dispersion")+" 3 / "+getTranslationByKey("destructeur")+" / "+getTranslationByKey("choc")+" 2",
                monkRayonEffets: getTranslationByKey("parasitage")+" 1 / "+getTranslationByKey("ignore-armure")
            });
        } else {
            setAttrs({
                monkSalveEffets: getTranslationByKey("parasitage")+" 1 / "+getTranslationByKey("dispersion")+" 3 / "+getTranslationByKey("ultraviolence")+" / "+getTranslationByKey("meutrier"), 
                monkVagueEffets: getTranslationByKey("parasitage")+" 2 / "+getTranslationByKey("dispersion")+" 3 / "+getTranslationByKey("destructeur")+" / "+getTranslationByKey("choc")+" 2",
                monkRayonEffets: getTranslationByKey("parasitage")+" 1 / "+getTranslationByKey("perce-armure")+" 40"
            });
        }

        setAttrs({
            monkSalveDegat: salveDegats+"D6",
            monkVagueDegat: vagueDegats+"D6",
            monkRayonDegat: rayonDegats+"D6",
            monkRayonViolence: rayonViolence+"D6"
        });
    });
});

on("change:priest200PG sheet:opened"
, function(eventInfo) 
{
    getAttrs(["priest200PG"], function(value)
    {
        var NV = value["priest200PG"];
    
        if(NV == "on")
        {
            setAttrs
            ({
                priestMechanicContact: "4D6+12",
                priestMechanicDistance: "3D6+12"
            });
        }
        else
        {
            setAttrs
            ({
                priestMechanicContact: "3D6+6",
                priestMechanicDistance: "2D6+6"
            });
        }
    });
});

on("change:psion200PG sheet:opened"
, function() 
{
    getAttrs(["psion200PG"], function(value)
    {
        var NV = value["psion200PG"];
    
        if(NV == "on")
        {
            setAttrs
            ({
                psionMalusA: "3D",
                psionMalus: 3
            });
        }
        else
        {
            setAttrs
            ({
                psionMalusA: "2D",
                psionMalus: 2
            });
        }
    });
});

on("change:wizard150PG sheet:opened"
, function() 
{
    getAttrs(["wizard150PG"], function(v)
    {
        var W150 = v["wizard150PG"];
    
        if(W150 == "on")
        {
            setAttrs
            ({
                wizardBPortee: getTranslationByKey("portee-moyenne")
            });
        }
        else
        {
            setAttrs
            ({
                wizardBPortee: getTranslationByKey("portee-courte")
            });
        }
    });
});

on("change:wizard250PG sheet:opened"
, function() 
{
    getAttrs(["wizard250PG"], function(v)
    {
        var W150 = v["wizard250PG"];
    
        if(W150 == "on")
        {
            setAttrs
            ({
                wizardOPortee: getTranslationByKey("portee-moyenne")
            });
        }
        else
        {
            setAttrs
            ({
                wizardOPortee: getTranslationByKey("portee-courte")
            });
        }
    });
});

on("change:styleCombat sheet:opened"
, function() 
{
    getAttrs(["styleCombat"], function(value)
    {
        var Style = value["styleCombat"];

        switch(Style)
        {
            case "standard":				
                setAttrs
                ({
                    atkCouvert: "0",
                    atkAgressif: "0",
                    atkAkimbo: "0",
                    atkAmbidextre: "0",
                    atkDefensif: "0",
                    atkPilonnage: "0",
                    atkPuissant: "0",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "",
                    defBM: "",
                    styleCombatDescr: ""
                });
                break;
            case "couvert":				
                setAttrs
                ({
                    atkCouvert: "-3",
                    atkAgressif: "0",
                    atkAkimbo: "0",
                    atkAmbidextre: "0",
                    atkDefensif: "0",
                    atkPilonnage: "0",
                    atkPuissant: "0",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "+2",
                    defBM: "",
                    styleCombatDescr: getTranslationByKey("bonus-style-couvert")
                });
                break;
            case "agressif":				
                setAttrs
                ({
                    atkAgressif: "+3",
                    atkCouvert: "0",
                    atkAkimbo: "0",
                    atkAmbidextre: "0",
                    atkDefensif: "0",
                    atkPilonnage: "0",
                    atkPuissant: "0",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "-2",
                    defBM: "-2",
                    styleCombatDescr: getTranslationByKey("bonus-style-agressif")
                });
                break;
            case "akimbo":				
                setAttrs
                ({
                    atkAkimbo: "-3",
                    atkCouvert: "0",
                    atkAgressif: "0",
                    atkAmbidextre: "0",
                    atkDefensif: "0",
                    atkPilonnage: "0",
                    atkPuissant: "0",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "",
                    defBM: "",
                    styleCombatDescr: getTranslationByKey("bonus-style-akimbo")
                });
                break;
            case "ambidextre":
                setAttrs
                ({
                    atkAmbidextre: "-3",
                    atkCouvert: "0",
                    atkAgressif: "0",
                    atkAkimbo: "0",
                    atkDefensif: "0",
                    atkPilonnage: "0",
                    atkPuissant: "0",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "",
                    defBM: "",
                    styleCombatDescr: getTranslationByKey("bonus-style-ambidextre")
                });
                break;
            case "defensif":
                setAttrs
                ({
                    atkDefensif: "-3",
                    atkCouvert: "0",
                    atkAgressif: "0",
                    atkAkimbo: "0",
                    atkAmbidextre: "0",
                    atkPilonnage: "0",
                    atkPuissant: "0",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "",
                    defBM: "+2",
                    styleCombatDescr: getTranslationByKey("bonus-style-defensif")
                });
                break;
            case "precis":
                setAttrs
                ({
                    atkCouvert: "0",
                    atkAgressif: "0",
                    atkAkimbo: "0",
                    atkAmbidextre: "0",
                    atkDefensif: "0",
                    atkPilonnage: "0",
                    atkPuissant: "0",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "",
                    defBM: "",
                    styleCombatDescr: getTranslationByKey("bonus-style-precis")
                });
                break;
            case "pilonnage":
                setAttrs
                ({
                    atkCouvert: "0",
                    atkAgressif: "0",
                    atkAkimbo: "0",
                    atkAmbidextre: "0",
                    atkDefensif: "0",
                    atkPilonnage: "-2",
                    atkPuissant: "0",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "",
                    defBM: "",
                    styleCombatDescr: getTranslationByKey("bonus-style-pilonnage")
                });
                break;
            case "puissant":
                setAttrs
                ({
                    atkCouvert: "0",
                    atkAgressif: "0",
                    atkAkimbo: "0",
                    atkAmbidextre: "0",
                    atkDefensif: "0",
                    atkPilonnage: "0",
                    atkPuissant: "@{stylePuissantBonus}",
                    styleSuppressionD:0,
                    styleSuppressionV:0,
                    rctBM: "-2",
                    defBM: "-2",
                    styleCombatDescr: getTranslationByKey("bonus-style-puissant")
                });
                break;
            case "suppression":
                setAttrs
                ({
                    atkCouvert: "0",
                    atkAgressif: "0",
                    atkAkimbo: "0",
                    atkAmbidextre: "0",
                    atkDefensif: "0",
                    atkPilonnage: "0",
                    atkPuissant: "0",
                    rctBM: "0",
                    defBM: "0",
                    styleCombatDescr: getTranslationByKey("bonus-style-suppression")
                });
                break;
        }
    });
});
    
on("change:repeating_modules remove:repeating_modules"
, function() 
{
    TAS.repeatingSimpleSum("modules", "moduleSlotTete", "slotsOccupeTete");
    TAS.repeatingSimpleSum("modules", "moduleSlotTorse", "slotsOccupeTorse");
    TAS.repeatingSimpleSum("modules", "moduleSlotBG", "slotsOccupeBG");
    TAS.repeatingSimpleSum("modules", "moduleSlotBD", "slotsOccupeBD");
    TAS.repeatingSimpleSum("modules", "moduleSlotJG", "slotsOccupeJG");
    TAS.repeatingSimpleSum("modules", "moduleSlotJD", "slotsOccupeJD");
});

on("change:repeating_modulesDCLion remove:repeating_modulesDCLion"
, function() 
{
    TAS.repeatingSimpleSum("modulesDCLion", "moduleSlotDCLTete", "slotsUDCLTeteTot");
    TAS.repeatingSimpleSum("modulesDCLion", "moduleSlotDCLTorse", "slotsUDCLTorseTot");
    TAS.repeatingSimpleSum("modulesDCLion", "moduleSlotDCLBG", "slotsUDCLBGTot");
    TAS.repeatingSimpleSum("modulesDCLion", "moduleSlotDCLBD", "slotsUDCLBDTot");
    TAS.repeatingSimpleSum("modulesDCLion", "moduleSlotDCLJG", "slotsUDCLJGTot");
    TAS.repeatingSimpleSum("modulesDCLion", "moduleSlotDCLJD", "slotsUDCLJDTot");
});

on("change:slotsOccupeTete change:slotsOccupeTorse change:slotsOccupeBG change:slotsOccupeBD change:slotsOccupeJG change:slotsOccupeJD"
, function() 
{
    getAttrs(["slotsOccupeTete", "slotTeteMax", "slotsOccupeTorse", "slotTorseMax", "slotsOccupeBG", "slotBGMax", "slotsOccupeBD", "slotBDMax", "slotsOccupeJG", "slotJGMax", "slotsOccupeJD", "slotJDMax", "nomIA"], function(value)
    {
        const IA = value["nomIA"];
        const TeO = parseInt(value["slotsOccupeTete"], 10)||0;
        const TeM = parseInt(value["slotTeteMax"], 10)||0;
        
        const ToO = parseInt(value["slotsOccupeTorse"], 10)||0;
        const ToM = parseInt(value["slotTorseMax"], 10)||0;
        
        const BGO = parseInt(value["slotsOccupeBG"], 10)||0;
        const BGM = parseInt(value["slotBGMax"], 10)||0;
        
        const BDO = parseInt(value["slotsOccupeBD"], 10)||0;
        const BDM = parseInt(value["slotBDMax"], 10)||0;
        
        const JGO = parseInt(value["slotsOccupeJG"], 10)||0;
        const JGM = parseInt(value["slotJGMax"], 10)||0;
        
        const JDO = parseInt(value["slotsOccupeJD"], 10)||0;
        const JDM = parseInt(value["slotJDMax"], 10)||0;
        
        var totalTe = TeM-TeO;
        var totalTo = ToM-ToO;
        var totalBG = BGM-BGO;
        var totalBD = BDM-BDO;
        var totalJG = JGM-JGO;
        var totalJD = JDM-JDO;
        
        var msg = "";
        
        PI["msgSlot"] = 0;
        
        if(PI["msgEnergie"] == 1)
        {			
            msg += "Erreur. Energie Indisponible. ";
        }
        
        if(totalTe < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité de l'Armure dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau de la tête. ";
        }
        
        if(totalTo < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité de l'Armure dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du torse. ";
        }
        
        if(totalBG < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité de l'Armure dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du bras gauche. ";
        }
        
        if(totalBD < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité de l'Armure dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du bras droit. ";
        }
        
        if(totalJG < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité de l'Armure dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau de la jambe gauche. ";
        }
        
        if(totalJD < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité de l'Armure dépassée. ";
            }
                
            msg += "Trop de slots occupé au niveau de la jambe droite. ";
        }
        
        if(msg != "")
            setPanneauInformation(msg, true, true);
        else
            resetPanneauInformation();
    });
});

on("change:slotsUDCLTeteTot change:slotsUDCLTorseTot change:slotsUDCLBGTot change:slotsUDCLBDTot change:slotsUDCLJGTot change:slotsUDCLJDTot"
, function() 
{
    getAttrs(["slotsUDCLTeteTot", "slotsDCLTeteMax", "slotsUDCLTorseTot", "slotsDCLTorseMax", "slotsUDCLBGTot", "slotsDCLBGMax", "slotsUDCLBDTot", "slotsDCLBDMax", "slotsUDCLJGTot", "slotsDCLJGMax", "slotsUDCLJDTot", "slotsDCLJDMax"], function(value)
    {
        const IA = value["nomIA"];
        const TeO = parseInt(value["slotsUDCLTeteTot"], 10)||0;
        const TeM = parseInt(value["slotsDCLTeteMax"], 10)||0;

        const ToO = parseInt(value["slotsUDCLTorseTot"], 10)||0;
        const ToM = parseInt(value["slotsDCLTorseMax"], 10)||0;
        
        const BGO = parseInt(value["slotsUDCLBGTot"], 10)||0;
        const BGM = parseInt(value["slotsDCLBGMax"], 10)||0;
        
        const BDO = parseInt(value["slotsUDCLBDTot"], 10)||0;
        const BDM = parseInt(value["slotsDCLBDMax"], 10)||0;
        
        const JGO = parseInt(value["slotsUDCLJGTot"], 10)||0;
        const JGM = parseInt(value["slotsDCLJGMax"], 10)||0;
        
        const JDO = parseInt(value["slotsUDCLJDTot"], 10)||0;
        const JDM = parseInt(value["slotsDCLJDMax"], 10)||0;
        
        var totalTe = TeM-TeO;
        var totalTo = ToM-ToO;
        var totalBG = BGM-BGO;
        var totalBD = BDM-BDO;
        var totalJG = JGM-JGO;
        var totalJD = JDM-JDO;
        
        var msg = "";
        
        PI["msgSlot"] = 0;
        
        if(PI["msgEnergie"] == 1)
        {			
            msg += "Erreur. Energie Indisponible. ";
        }
        
        if(totalTe < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau de la tête. ";
        }
        
        if(totalTo < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du torse. ";
        }
        
        if(totalBG < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du bras gauche. ";
        }
        
        if(totalBD < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du bras droit. ";
        }
        
        if(totalJG < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau de la jambe gauche. ";
        }
        
        if(totalJD < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
                
            msg += "Trop de slots occupé au niveau de la jambe droite. ";
        }
        
        if(msg != "")
            setPanneauInformation(msg, true, true);
        else
            resetPanneauInformation();
    });
});
        
on("change:repeating_equipDefensif:porte change:repeating_equipDefensif:defenseBonus change:repeating_equipDefensif:reactionBonus"
, function() 
{
    getAttrs(["repeating_equipDefensif_defenseBonus", "repeating_equipDefensif_reactionBonus", "repeating_equipDefensif_porte"], function(vDef)
    {
        var vDefE = parseInt(vDef["repeating_equipDefensif_defenseBonus"]);
        var vReaE = parseInt(vDef["repeating_equipDefensif_reactionBonus"]);
        
        var vPorte = vDef["repeating_equipDefensif_porte"];
        
        if(vPorte == "1")
        {
            setAttrs
            ({
                repeating_equipDefensif_reaLigne: vReaE,
                repeating_equipDefensif_defLigne: vDefE
            });
        }
        else
        {
            setAttrs
            ({
                repeating_equipDefensif_reaLigne: 0,
                repeating_equipDefensif_defLigne: 0
            });
        }
    });
});

on("change:repeating_equipDefensif:reaLigne remove:repeating_equipDefensif:reaLigne"
, function() 
{
    TAS.repeatingSimpleSum("equipDefensif", "reaLigne", "bonusReaction");
});

on("change:repeating_equipDefensif:defLigne remove:repeating_equipDefensif:defLigne"
, function() 
{
    TAS.repeatingSimpleSum("equipDefensif", "defLigne", "bonusDefense");
});

on("change:calODEnd change:armure sheet:opened"
, function()
{
    getAttrs(["calODEnd", "armure"], function(value)
    {
        const armure = value["armure"];
    
        const OD = parseInt(value["calODEnd"], 10)||0;
        
        var bonus = 0;
        
        switch(armure)
        {
            case "sans":
            case "guardian":
                bonus = 0;
                break;
                
            default:
                if(OD >= 3)
                    bonus = 6;
                else
                    bonus = 0;
                break;
        }
        
        setAttrs({
                santeODBonus:bonus
        });
    });
});

on("change:calODCom change:armure sheet:opened"
, function()
{
    getAttrs(["calODCom", "armure"], function(value)
    {
        const armure = value["armure"];
    
        const OD = parseInt(value["calODCom"], 10)||0;
        
        var bonus = 0;
        var bonusAkimbo = 0;
        var bonusAmbidextrie = 0;
        
        switch(armure)
        {
            case "sans":
            case "guardian":
                bonus = 0;
                bonusAkimbo = 0;
                bonusAmbidextrie = 0;
                break;
                
            default:
                switch(OD)
                {
                    case 2:
                        bonus = 2;
                        bonusAkimbo = 0;
                        bonusAmbidextrie = 0;
                        break;
                    
                    case 3:
                        bonus = 2;
                        bonusAkimbo = 2;
                        bonusAmbidextrie = 0;
                        break;
                    
                    case 4:
                    case 5:
                        bonus = 2;
                        bonusAkimbo = 2;
                        bonusAmbidextrie = 2;
                        break;
                    
                    default:
                        bonus = 0;
                        bonusAkimbo = 0;
                        bonusAmbidextrie = 0;
                        break;
                }
                break;
        }
        
        setAttrs({
            reactionODBonus:bonus,
            akimboContactODBonus:bonusAkimbo,
            ambidextrieContactODBonus:bonusAmbidextrie
        });
    });
});

on("change:calODIns sheet:opened"
, function(value)
{
    getAttrs(["calODIns"], function(value)
    {
        var NV = parseInt(value["calODIns"], 10)||0;
        
        if(NV >= 3)
        {
            setAttrs({
                    initiativeODBonus:(3*NV)
            });
        }
        else
        {
            setAttrs({
                    initiativeODBonus:0
            });
        }
    });
});

on("change:calODTir change:armure sheet:opened"
, function()
{
    getAttrs(["calODTir", "armure"], function(value)
    {
        const armure = value["armure"];
    
        const OD = parseInt(value["calODTir"], 10)||0;
        
        var bonusAkimbo = 0;
        var bonusAmbidextrie = 0;
        
        switch(armure)
        {
            case "sans":
            case "guardian":
                bonusAkimbo = 0;
                bonusAmbidextrie = 0;
                break;
                
            default:
                switch(OD)
                {						
                    case 3:
                        bonusAkimbo = 2;
                        bonusAmbidextrie = 0;
                        break;
                    
                    case 4:
                    case 5:
                        bonusAkimbo = 2;
                        bonusAmbidextrie = 2;
                        break;
                    
                    default:
                        bonusAkimbo = 0;
                        bonusAmbidextrie = 0;
                        break;
                }
                break;
        }
        
        setAttrs({
            akimboDistanceODBonus:bonusAkimbo,
            ambidextrieDistanceODBonus:bonusAmbidextrie
        });
    });
});

on("change:calODAur change:aura sheet:opened"
, function(value)
{
    getAttrs(["calODAur", "aura", "armure"], function(value)
    {
        const armure = value["armure"];
    
        const OD = parseInt(value["calODAur"], 10)||0;
        const aura = parseInt(value["aura"], 10)||0;
        
        var bonus = 0;
        
        switch(armure)
        {
            case "sans":
            case "guardian":
                bonus = 0;
                break;
                
            default:
                switch(OD)
                {												
                    case 5:
                        bonus = aura;
                        break;
                    
                    default:
                        bonus = 0;
                        break;
                }
                break;
        }
        
        setAttrs({
            defenseODBonus:bonus
        });
    });
});

on("change:calODDis change:armure sheet:opened"
, function()
{
    getAttrs(["calODDis", "armure"], function(value)
    {
        const armure = value["armure"];
    
        const OD = parseInt(value["calODDis"], 10)||0;
        
        var bonus = "";
        
        switch(armure)
        {
            case "sans":
            case "guardian":
                bonus = "";
                break;
                
            default:
                switch(OD)
                {						
                    case 2:
                    case 3:
                    case 4:
                        bonus = "{{ODDiscretion=[[@{discretion}]]}}";
                        break;
                    
                    case 5:
                        bonus = "{{ODDiscretion=[[@{discretion}+@{calODDis}]]}}";
                        break;
                    
                    default:
                        bonus = "";
                        break;
                }
                break;
        }
        
        setAttrs({
            discretionDegatsBonus:bonus
        });
    });
});

on("change:warriorSoldierA change:deplOD change:forOD change:endOD sheet:opened"
, function() 
{		
    getAttrs(["warriorSoldierA", "warrior250PG", "deplOD", "forOD", "endOD"], function(value)
    {
        var mode = value["warriorSoldierA"];
    
        var WEvol = parseInt(value["warrior250PG"], 10)||0;
    
        var ODDep = parseInt(value["deplOD"], 10)||0;
        var ODFor = parseInt(value["forOD"], 10)||0;
        var ODEnd = parseInt(value["endOD"], 10)||0;
        
        var bonus = 0;
        
        if(mode != 0)
        {
            bonus = 1+WEvol;
            
            setAttrs({
                warriorHunterA:0,
                warriorScholarA:0,
                warriorHeraldA:0,
                warriorScoutA:0
            });
        }
        
        setAttrs({
            calODDep:ODDep+bonus,
            calODFor:ODFor+bonus,
            calODEnd:ODEnd+bonus
        });
    });
});

on("change:warriorHunterA change:hargneOD change:combOD change:instOD sheet:opened"
, function() 
{
    getAttrs(["warriorHunterA", "warrior250PG", "hargneOD", "combOD", "instOD"], function(value)
    {
        var mode = value["warriorHunterA"];
    
        var WEvol = parseInt(value["warrior250PG"], 10)||0;
    
        var ODHar = parseInt(value["hargneOD"], 10)||0;
        var ODCom = parseInt(value["combOD"], 10)||0;
        var ODIns = parseInt(value["instOD"], 10)||0;
        
        var bonus = 0;
        
        if(mode != 0)
        {
            bonus = 1+WEvol;
            
            setAttrs({
                    warriorSoldierA:0,
                    warriorScholarA:0,
                    warriorHeraldA:0,
                    warriorScoutA:0
            });
        }
        
        setAttrs({
            calODHar:ODHar+bonus,
            calODCom:ODCom+bonus,
            calODIns:ODIns+bonus
        });
    });
});

on("change:warriorScholarA change:tirOD change:savoirOD change:technOD sheet:opened"
, function()
{
    getAttrs(["warriorScholarA", "warrior250PG", "tirOD", "savoirOD", "technOD"], function(value)
    {
        var mode = value["warriorScholarA"];
    
        var WEvol = parseInt(value["warrior250PG"], 10)||0;
    
        var ODTir = parseInt(value["tirOD"], 10)||0;
        var ODSav = parseInt(value["savoirOD"], 10)||0;
        var ODTec = parseInt(value["technOD"], 10)||0;
        
        var bonus = 0;
    
        if(mode != 0)
        {
            bonus = 1+WEvol;
            
            setAttrs({
                warriorSoldierA:0,
                warriorHunterA:0,
                warriorHeraldA:0,
                warriorScoutA:0
            });
        }
        
        setAttrs({
            calODTir:ODTir+bonus,
            calODSav:ODSav+bonus,
            calODTec:ODTec+bonus
        });
    });
});

on("change:warriorHeraldA change:auraOD change:paroleOD change:sfOD sheet:opened"
, function() 
{
    getAttrs(["warriorHeraldA", "warrior250PG", "auraOD", "paroleOD", "sfOD"], function(value)
    {
        var mode = value["warriorHeraldA"];
    
        var WEvol = parseInt(value["warrior250PG"], 10)||0;
    
        var ODAur = parseInt(value["auraOD"], 10)||0;
        var ODPar = parseInt(value["paroleOD"], 10)||0;
        var ODSFR = parseInt(value["sfOD"], 10)||0;
                    
        var bonus = 0;
    
        if(mode != 0)
        {
            bonus = 1+WEvol;
            
            setAttrs({
                warriorSoldierA:0,
                warriorHunterA:0,
                warriorScholarA:0,
                warriorScoutA:0
            });
        }
        
        setAttrs({
            calODAur:ODAur+bonus,
            calODPar:ODPar+bonus,
            calODSFR:ODSFR+bonus
        });
    });
});

on("change:warriorScoutA change:discrOD change:percOD change:dextOD sheet:opened"
, function() 
{			
    getAttrs(["warriorScoutA", "warrior250PG", "discrOD", "percOD", "dextOD"], function(value)
    {
        var mode = value["warriorScoutA"];
    
        var WEvol = parseInt(value["warrior250PG"], 10)||0;
    
        var ODDis = parseInt(value["discrOD"], 10)||0;
        var ODPer = parseInt(value["percOD"], 10)||0;
        var ODDex = parseInt(value["dextOD"], 10)||0;
        
        var bonus = 0;

        if(mode != 0)
        {
            bonus = 1+WEvol;
            
            setAttrs({
                warriorSoldierA:0,
                warriorHunterA:0,
                warriorScholarA:0,
                warriorHeraldA:0
            });
        }
        
        setAttrs({
            calODDis:ODDis+bonus,
            calODPer:ODPer+bonus,
            calODDex:ODDex+bonus
        });
    });
});


//META-ARMURE DE LEGENDE
on("change:armureLegende",function(eventInfo)
{
    var mal = eventInfo.newValue;
    
    switch(mal)
    {
        case "warrior":
            setAttrs({
                popup:3
            });
            break;
        case "priest":
            setAttrs({
                popup:4
            });
            break;
        case "warmaster":
            setAttrs({
                popup:5
            });
            break;
        case "psion":
            setAttrs({
                popup:6
            });
            break;
        case "warlock":
            setAttrs({
                popup:7
            });
            break;
        case "druid":
            setAttrs({
                popup:8
            });
            break;
    }
});

on("clicked:selectionMALWarrior",function()
{
    getAttrs(["listeTypeMALWarrior"], function(value)
    {
        var choix = parseInt(value["listeTypeMALWarrior"], 10)||0;
        
        setAttrs({
            malwarriortype:choix,
            popup:0
        });
    });
});

on("clicked:selectionMALPriest",function()
{
    getAttrs(["listeTypeMALPriest"], function(value)
    {
        var choix = parseInt(value["listeTypeMALPriest"], 10)||0;
        
        setAttrs({
            malpriestmode:choix,
            popup:0
        });
    });
});

on("clicked:selectionMALWarmaster",function()
{
    getAttrs(["listeTypeMALWarmaster"], function(value)
    {
        var choix = parseInt(value["listeTypeMALWarmaster"], 10)||0;
        var popup = 0;
        
        if(choix == 1)
            popup = 9;
        
        setAttrs({
            malwarmastermode:choix,
            popup:popup
        });
    });
});

on("clicked:selectionMALWarmasterWarlord",function()
{
    getAttrs(["listeTypeMALWarmasterWarlord"], function(value)
    {
        var choix = parseInt(value["listeTypeMALWarmasterWarlord"], 10)||0;
        
        setAttrs({
            malwarmasterwarlord:choix,
            popup:0
        });
    });
});

on("clicked:selectionMALPsion",function()
{
    getAttrs(["listeModeMALPsion"], function(value)
    {
        var choix = parseInt(value["listeModeMALPsion"], 10)||0;
        
        setAttrs({
            malpsionmode:choix,
            popup:0
        });
    });
});

on("clicked:selectionMALWarlock",function()
{
    getAttrs(["listeModeMALWarlock"], function(value)
    {
        var choix = parseInt(value["listeModeMALWarlock"], 10)||0;
        
        setAttrs({
            malwarlockmode:choix,
            popup:0
        });
    });
});

on("clicked:selectionMALDruid",function()
{
    getAttrs(["listeModeMALDruid"], function(value)
    {
        var choix = parseInt(value["listeModeMALDruid"], 10)||0;
        
        setAttrs({
            maldruidmod:choix,
            popup:0
        });
    });
});

on("change:repeating_modulesMALDCLion remove:repeating_modulesMALDCLion", function() 
{
    TAS.repeatingSimpleSum("modulesMALDCLion", "moduleSlotMALDCLTete", "slotsMALUDCLTeteTot");
    TAS.repeatingSimpleSum("modulesMALDCLion", "moduleSlotMALDCLTorse", "slotsMALUDCLTorseTot");
    TAS.repeatingSimpleSum("modulesMALDCLion", "moduleSlotMALDCLBG", "slotsMALUDCLBGTot");
    TAS.repeatingSimpleSum("modulesMALDCLion", "moduleSlotMALDCLBD", "slotsMALUDCLBDTot");
    TAS.repeatingSimpleSum("modulesMALDCLion", "moduleSlotMALDCLJG", "slotsMALUDCLJGTot");
    TAS.repeatingSimpleSum("modulesMALDCLion", "moduleSlotMALDCLJD", "slotsMALUDCLJDTot");
});

on("change:slotsMALUDCLTeteTot change:slotsMALUDCLTorseTot change:slotsMALUDCLBGTot change:slotsMALUDCLBDTot change:slotsMALUDCLJGTot change:slotsMALUDCLJDTot", function() 
{
    getAttrs(["slotsMALUDCLTeteTot", "slotsMALDCLTeteMax", "slotsMALUDCLTorseTot", "slotsMALDCLTorseMax", "slotsMALUDCLBGTot", "slotsMALDCLBGMax", "slotsMALUDCLBDTot", "slotsMALDCLBDMax", "slotsMALUDCLJGTot", "slotsMALDCLJGMax", "slotsMALUDCLJDTot", "slotsMALDCLJDMax"], function(value)
    {
        const IA = value["nomIA"];
        const TeO = parseInt(value["slotsMALUDCLTeteTot"], 10)||0;
        const TeM = parseInt(value["slotsMALDCLTeteMax"], 10)||0;

        const ToO = parseInt(value["slotsMALUDCLTorseTot"], 10)||0;
        const ToM = parseInt(value["slotsMALDCLTorseMax"], 10)||0;
        
        const BGO = parseInt(value["slotsMALUDCLBGTot"], 10)||0;
        const BGM = parseInt(value["slotsMALDCLBGMax"], 10)||0;
        
        const BDO = parseInt(value["slotsMALUDCLBDTot"], 10)||0;
        const BDM = parseInt(value["slotsMALDCLBDMax"], 10)||0;
        
        const JGO = parseInt(value["slotsMALUDCLJGTot"], 10)||0;
        const JGM = parseInt(value["slotsMALDCLJGMax"], 10)||0;
        
        const JDO = parseInt(value["slotsMALUDCLJDTot"], 10)||0;
        const JDM = parseInt(value["slotsMALDCLJDMax"], 10)||0;
        
        var totalTe = TeM-TeO;
        var totalTo = ToM-ToO;
        var totalBG = BGM-BGO;
        var totalBD = BDM-BDO;
        var totalJG = JGM-JGO;
        var totalJD = JDM-JDO;
        
        var msg = "";
        
        PI["msgSlot"] = 0;
        
        if(PI["msgEnergie"] == 1)
        {			
            msg += "Erreur. Energie Indisponible. ";
        }
        
        if(totalTe < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau de la tête. ";
        }
        
        if(totalTo < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du torse. ";
        }
        
        if(totalBG < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du bras gauche. ";
        }
        
        if(totalBD < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau du bras droit. ";
        }
        
        if(totalJG < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
            
            msg += "Trop de slots occupé au niveau de la jambe gauche. ";
        }
        
        if(totalJD < 0)
        {
            msg += "Erreur. ";
            
            if(PI["msgSlot"] == 0)
            {
                PI["msgSlot"] = 1;
                msg += "Capacité du Compagnon dépassée. ";
            }
                
            msg += "Trop de slots occupé au niveau de la jambe droite. ";
        }
        
        if(msg != "")
            setPanneauInformation(msg, true, true);
        else
            resetPanneauInformation();
    });
});

on("clicked:repeating_modulesmaldclion:pemdlion",function()
{
    getAttrs(["repeating_modules_moduleEnergieMALDCLion", "MALDruidLionPEAct", "nomIA"], function(value)
    {
        const IA = value["nomIA"];
        const PEM = parseInt(value["repeating_modules_moduleEnergieMALDCLion"], 10)||0;
        const PE = parseInt(value["MALDruidLionPEAct"], 10)||0;
        
        var total = PE-PEM;

        if(total < 0)
        {				
            setPanneauInformation("Erreur. Energie Indisponible.", false, false, true);
            
            PI["msgEnergie"] = 1;
        }
        else
        {
            setAttrs({
                MALDruidLionPEAct:total
            });
        }
    });
});	

on("change:MALWarriorSoldierA change:deplOD change:forOD change:endOD sheet:opened", function() 
{		
    getAttrs(["MALWarriorSoldierA", "deplOD", "forOD", "endOD"], function(value)
    {			
        var mode = value["MALWarriorSoldierA"];
        
        var ODDep = parseInt(value["deplOD"], 10)||0;
        var ODFor = parseInt(value["forOD"], 10)||0;
        var ODEnd = parseInt(value["endOD"], 10)||0;
        
        var bonus = 0;
        
        if(mode != 0)
        {
            bonus = 1;
        }

        setAttrs({
            calODDep:ODDep+bonus,
            calODFor:ODFor+bonus,
            calODEnd:ODEnd+bonus
        });
    });
});

on("change:MALWarriorHunterA change:hargneOD change:combOD change:instOD sheet:opened", function() 
{
    getAttrs(["MALWarriorHunterA", "hargneOD", "combOD", "instOD"], function(value)
    {
        var mode = value["MALWarriorHunterA"];
    
        var ODHar = parseInt(value["hargneOD"], 10)||0;
        var ODCom = parseInt(value["combOD"], 10)||0;
        var ODIns = parseInt(value["instOD"], 10)||0;
        
        var bonus = 0;
        
        if(mode != 0)
        {
            bonus = 1;
        }
        
        setAttrs({
            calODHar:ODHar+bonus,
            calODCom:ODCom+bonus,
            calODIns:ODIns+bonus
        });
    });
});

on("change:MALWarriorScholarA change:tirOD change:savoirOD change:technOD sheet:opened", function()
{
    getAttrs(["MALWarriorScholarA", "tirOD", "savoirOD", "technOD"], function(value)
    {
        var mode = value["MALWarriorScholarA"];
        
        var ODTir = parseInt(value["tirOD"], 10)||0;
        var ODSav = parseInt(value["savoirOD"], 10)||0;
        var ODTec = parseInt(value["technOD"], 10)||0;
        
        var bonus = 0;
    
        if(mode != 0)
        {
            bonus = 1;
        }
        
        setAttrs({
            calODTir:ODTir+bonus,
            calODSav:ODSav+bonus,
            calODTec:ODTec+bonus
        });
    });
});

on("change:MALWarriorHeraldA change:auraOD change:paroleOD change:sfOD sheet:opened", function() 
{
    getAttrs(["MALWarriorHeraldA", "auraOD", "paroleOD", "sfOD"], function(value)
    {
        var mode = value["MALWarriorHeraldA"];
    
        var ODAur = parseInt(value["auraOD"], 10)||0;
        var ODPar = parseInt(value["paroleOD"], 10)||0;
        var ODSFR = parseInt(value["sfOD"], 10)||0;
                    
        var bonus = 0;
    
        if(mode != 0)
        {
            bonus = 1;
        }
        
        setAttrs({
            calODAur:ODAur+bonus,
            calODPar:ODPar+bonus,
            calODSFR:ODSFR+bonus
        });
    });
});

on("change:MALWarriorScoutA change:discrOD change:percOD change:dextOD sheet:opened", function() 
{			
    getAttrs(["MALWarriorScoutA", "discrOD", "percOD", "dextOD"], function(value)
    {
        var mode = value["MALWarriorScoutA"];
    
        var ODDis = parseInt(value["discrOD"], 10)||0;
        var ODPer = parseInt(value["percOD"], 10)||0;
        var ODDex = parseInt(value["dextOD"], 10)||0;
        
        var bonus = 0;

        if(mode != 0)
        {
            bonus = 1;
        }
        
        setAttrs({
            calODDis:ODDis+bonus,
            calODPer:ODPer+bonus,
            calODDex:ODDex+bonus
        });
    });
});
    
on("change:fichePNJ change:MALBarbarianGoliath sheet:opened", function() 
{
    getAttrs(["fichePNJ", "armure", "MALBarbarianGoliath"], function(value)
    {
        const fichePNJ = parseInt(value["fichePNJ"], 10)||0;
        if(fichePNJ == 0)
        
        {				
            const Arm = value["armure"];
            const goliath = parseInt(value["MALBarbarianGoliath"], 10)||0;
            
            var totalGoliath = goliath;
                                            
            setAttrs({
                MALBarbarianDef: totalGoliath,
                MALBarbarianRea: totalGoliath*2,
                MALBarbarianDegat: totalGoliath+"D6"
            });
        }
    });
});

on("change:MALDruidWolfConfiguration sheet:opened", function() 
{			
    getAttrs(["MALDruidWolfConfiguration"], function(value)
    {
        var mode = value["MALDruidWolfConfiguration"];
        var PE = 0;

        if(mode == "Labor" || mode == "Medic" || mode == "Recon")
        {
            PE = 1;
        }
        
        if(mode == "Tech" || mode == "Fighter")
        {
            PE = 2;
        }
        
        setAttrs({
            MAJDruidWolfConfigurationPE:PE
        });
    });
});


on("change:tabArmureLegende",function(eventInfo)
{
    var mal = eventInfo.newValue;

    if(mal == "0") {
        setAttrs({
            armureLegende:"sans"
        });
    }
});


//FIN META-ARMURE DE LEGENDE
on("change:druidWolfConfiguration sheet:opened", function() 
{			
    getAttrs(["druidWolfConfiguration"], function(value)
    {
        var mode = value["druidWolfConfiguration"];
        var PE = 0;

        if(mode == "Labor" || mode == "Medic" || mode == "Recon")
        {
            PE = 1;
        }
        
        if(mode == "Tech" || mode == "Fighter")
        {
            PE = 2;
        }
        
        setAttrs({
            druidWolfConfigurationPE:PE
        });
    });
});

on("change:bonusCarac sheet:opened", function() 
{
    getAttrs(["bonusCarac"], function(value)
    {
        const bonus = value["bonusCarac"];
        
        if(bonus == 1)
        {
            setAttrs({
                caracteristique4:""
            });
        }
        
        if(bonus != 2 && bonus != 1)
        {
            setAttrs({
                caracteristique3:"",
                caracteristique4:""
            });
        }
    });
});

on("clicked:capaciteUltime",function()
{
    getAttrs(["coutCapaciteUltime", "energiePJ"], function(value)
    {			
        var PE = parseInt(value["coutCapaciteUltime"], 10)||0;
        var energie = parseInt(value["energiePJ"], 10)||0;
        var total = energie-PE;

        if(total < 0)
        {				
            setPanneauInformation("Erreur. Energie Indisponible.", false, false, true);
            
            PI["msgEnergie"] = 1;
        }
        else
        {
            setAttrs({
                energiePJ:total
            });
        }
    });
});

on("change:fichePNJ change:diceInitiative change:bonusInitiativeP change:malusInitiative change:MasquePNJAEMaj sheet:opened", function() 
{
    getAttrs(["fichePNJ", "MasquePNJAEMaj"], function(value)
    {
        const TFiche = value["fichePNJ"];
        
        if(TFiche == 1 || TFiche == 2)
        {
            const MasqueMaj = value["MasquePNJAEMaj"];
            
            if(MasqueMaj > 0)
            {
                setAttrs({
                    diceInitiative:0,
                    bonusInitiativeP:30,
                    malusInitiative:0
                });
            }
        }
        
        if(TFiche == 3)
        {
            setAttrs({
                diceInitiative:0,
                bonusInitiativeP:1,
                malusInitiative:0
            });
        }
    });
});

on("clicked:resetArmure",function()
{
    getAttrs(["armurePJ_max", "energiePJ_max"], function(value)
    {			
        var armMax = parseInt(value["armurePJ_max"], 10)||0;
        var eneMax = parseInt(value["energiePJ_max"], 10)||0;
        
        setAttrs({
            armurePJ:armMax,
            energiePJ:eneMax
        });
    });
});

on("clicked:majV15",function()
{
    var newSheet = 0;
    getSectionIDs("repeating_slotsTete", function(idarray) 
    {
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsTete_' + currentID + '_slotsUTete',
                'repeating_slotsTete_' + currentID + '_slotsNTete',
                'repeating_slotsTete_' + currentID + '_slotsATete',
                'repeating_slotsTete_' + currentID + '_slotsETete',
                'repeating_slotsTete_' + currentID + '_slotsDureeTete',
                'repeating_slotsTete_' + currentID + '_slotsDTete'
                ], function(v) 
            {
                var u = v['repeating_slotsTete_' + currentID + '_slotsUTete'];
                var n = v['repeating_slotsTete_' + currentID + '_slotsNTete'];
                var a = v['repeating_slotsTete_' + currentID + '_slotsATete'];
                var e = v['repeating_slotsTete_' + currentID + '_slotsETete'];
                var duree = v['repeating_slotsTete_' + currentID + '_slotsDureeTete'];
                var d = v['repeating_slotsTete_' + currentID + '_slotsDTete'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modules_" + newrowid + "_moduleSlotTete"] = u;
                newrowattrs["repeating_modules_" + newrowid + "_moduleNom"] = n;
                newrowattrs["repeating_modules_" + newrowid + "_moduleActivation"] = a;
                newrowattrs["repeating_modules_" + newrowid + "_moduleEnergie"] = e;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDuree"] = duree;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDescription"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsTorse", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsTorse_' + currentID + '_slotsUTorse',
                'repeating_slotsTorse_' + currentID + '_slotsNTorse',
                'repeating_slotsTorse_' + currentID + '_slotsATorse',
                'repeating_slotsTorse_' + currentID + '_slotsETorse',
                'repeating_slotsTorse_' + currentID + '_slotsDureeTorse',
                'repeating_slotsTorse_' + currentID + '_slotsDTorse'
                ], function(v) 
            {
                var u = v['repeating_slotsTorse_' + currentID + '_slotsUTorse'];
                var n = v['repeating_slotsTorse_' + currentID + '_slotsNTorse'];
                var a = v['repeating_slotsTorse_' + currentID + '_slotsATorse'];
                var e = v['repeating_slotsTorse_' + currentID + '_slotsETorse'];
                var duree = v['repeating_slotsTorse_' + currentID + '_slotsDureeTorse'];
                var d = v['repeating_slotsTorse_' + currentID + '_slotsDTorse'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modules_" + newrowid + "_moduleSlotTorse"] = u;
                newrowattrs["repeating_modules_" + newrowid + "_moduleNom"] = n;
                newrowattrs["repeating_modules_" + newrowid + "_moduleActivation"] = a;
                newrowattrs["repeating_modules_" + newrowid + "_moduleEnergie"] = e;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDuree"] = duree;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDescription"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsBG", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsBG_' + currentID + '_slotsUBG',
                'repeating_slotsBG_' + currentID + '_slotsNBG',
                'repeating_slotsBG_' + currentID + '_slotsABG',
                'repeating_slotsBG_' + currentID + '_slotsEBG',
                'repeating_slotsBG_' + currentID + '_slotsDureeBG',
                'repeating_slotsBG_' + currentID + '_slotsDBG'
                ], function(v) 
            {
                var u = v['repeating_slotsBG_' + currentID + '_slotsUBG'];
                var n = v['repeating_slotsBG_' + currentID + '_slotsNBG'];
                var a = v['repeating_slotsBG_' + currentID + '_slotsABG'];
                var e = v['repeating_slotsBG_' + currentID + '_slotsEBG'];
                var duree = v['repeating_slotsBG_' + currentID + '_slotsDureeBG'];
                var d = v['repeating_slotsBG_' + currentID + '_slotsDBG'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modules_" + newrowid + "_moduleSlotBG"] = u;
                newrowattrs["repeating_modules_" + newrowid + "_moduleNom"] = n;
                newrowattrs["repeating_modules_" + newrowid + "_moduleActivation"] = a;
                newrowattrs["repeating_modules_" + newrowid + "_moduleEnergie"] = e;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDuree"] = duree;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDescription"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsBD", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsBD_' + currentID + '_slotsUBD',
                'repeating_slotsBD_' + currentID + '_slotsNBD',
                'repeating_slotsBD_' + currentID + '_slotsABD',
                'repeating_slotsBD_' + currentID + '_slotsEBD',
                'repeating_slotsBD_' + currentID + '_slotsDureeBD',
                'repeating_slotsBD_' + currentID + '_slotsDBD'
                ], function(v) 
            {
                var u = v['repeating_slotsBD_' + currentID + '_slotsUBD'];
                var n = v['repeating_slotsBD_' + currentID + '_slotsNBD'];
                var a = v['repeating_slotsBD_' + currentID + '_slotsABD'];
                var e = v['repeating_slotsBD_' + currentID + '_slotsEBD'];
                var duree = v['repeating_slotsBD_' + currentID + '_slotsDureeBD'];
                var d = v['repeating_slotsBD_' + currentID + '_slotsDBD'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modules_" + newrowid + "_moduleSlotBD"] = u;
                newrowattrs["repeating_modules_" + newrowid + "_moduleNom"] = n;
                newrowattrs["repeating_modules_" + newrowid + "_moduleActivation"] = a;
                newrowattrs["repeating_modules_" + newrowid + "_moduleEnergie"] = e;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDuree"] = duree;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDescription"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsJG", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsJG_' + currentID + '_slotsUJG',
                'repeating_slotsJG_' + currentID + '_slotsNJG',
                'repeating_slotsJG_' + currentID + '_slotsAJG',
                'repeating_slotsJG_' + currentID + '_slotsEJG',
                'repeating_slotsJG_' + currentID + '_slotsDureeJG',
                'repeating_slotsJG_' + currentID + '_slotsDJG'
                ], function(v) 
            {
                var u = v['repeating_slotsJG_' + currentID + '_slotsUJG'];
                var n = v['repeating_slotsJG_' + currentID + '_slotsNJG'];
                var a = v['repeating_slotsJG_' + currentID + '_slotsAJG'];
                var e = v['repeating_slotsJG_' + currentID + '_slotsEJG'];
                var duree = v['repeating_slotsJG_' + currentID + '_slotsDureeJG'];
                var d = v['repeating_slotsJG_' + currentID + '_slotsDJG'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modules_" + newrowid + "_moduleSlotJG"] = u;
                newrowattrs["repeating_modules_" + newrowid + "_moduleNom"] = n;
                newrowattrs["repeating_modules_" + newrowid + "_moduleActivation"] = a;
                newrowattrs["repeating_modules_" + newrowid + "_moduleEnergie"] = e;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDuree"] = duree;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDescription"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsJD", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsJD_' + currentID + '_slotsUJD',
                'repeating_slotsJD_' + currentID + '_slotsNJD',
                'repeating_slotsJD_' + currentID + '_slotsAJD',
                'repeating_slotsJD_' + currentID + '_slotsEJD',
                'repeating_slotsJD_' + currentID + '_slotsDureeJD',
                'repeating_slotsJD_' + currentID + '_slotsDJD'
                ], function(v) 
            {
                var u = v['repeating_slotsJD_' + currentID + '_slotsUJD'];
                var n = v['repeating_slotsJD_' + currentID + '_slotsNJD'];
                var a = v['repeating_slotsJD_' + currentID + '_slotsAJD'];
                var e = v['repeating_slotsJD_' + currentID + '_slotsEJD'];
                var duree = v['repeating_slotsJD_' + currentID + '_slotsDureeJD'];
                var d = v['repeating_slotsJD_' + currentID + '_slotsDJD'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modules_" + newrowid + "_moduleSlotJD"] = u;
                newrowattrs["repeating_modules_" + newrowid + "_moduleNom"] = n;
                newrowattrs["repeating_modules_" + newrowid + "_moduleActivation"] = a;
                newrowattrs["repeating_modules_" + newrowid + "_moduleEnergie"] = e;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDuree"] = duree;
                newrowattrs["repeating_modules_" + newrowid + "_moduleDescription"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsDCLTete", function(idarray) 
    {
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsDCLTete_' + currentID + '_slotsUDCLTete',
                'repeating_slotsDCLTete_' + currentID + '_slotsNDCLTete',
                'repeating_slotsDCLTete_' + currentID + '_slotsADCLTete',
                'repeating_slotsDCLTete_' + currentID + '_slotsEDCLTete',
                'repeating_slotsDCLTete_' + currentID + '_slotsDDCLTete',
                'repeating_slotsDCLTete_' + currentID + '_slotsUDCLDTete'
                ], function(v) 
            {
                var u = v['repeating_slotsDCLTete_' + currentID + '_slotsUDCLTete'];
                var n = v['repeating_slotsDCLTete_' + currentID + '_slotsNDCLTete'];
                var a = v['repeating_slotsDCLTete_' + currentID + '_slotsADCLTete'];
                var e = v['repeating_slotsDCLTete_' + currentID + '_slotsEDCLTete'];
                var duree = v['repeating_slotsDCLTete_' + currentID + '_slotsDDCLTete'];
                var d = v['repeating_slotsDCLTete_' + currentID + '_slotsUDCLDTete'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleSlotDCLTete"] = u;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleNomDCLion"] = n;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleActivationDCLion"] = a;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleEnergieDCLion"] = e;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDureeDCLion"] = duree;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDescriptionDCLion"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsDCLTorse", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsDCLTorse_' + currentID + '_slotsUDCLTorse',
                'repeating_slotsDCLTorse_' + currentID + '_slotsNDCLTorse',
                'repeating_slotsDCLTorse_' + currentID + '_slotsADCLTorse',
                'repeating_slotsDCLTorse_' + currentID + '_slotsEDCLTorse',
                'repeating_slotsDCLTorse_' + currentID + '_slotsDDCLTorse',
                'repeating_slotsDCLTorse_' + currentID + '_slotsUDCLDTorse'
                ], function(v) 
            {
                var u = v['repeating_slotsDCLTorse_' + currentID + '_slotsUDCLTorse'];
                var n = v['repeating_slotsDCLTorse_' + currentID + '_slotsNDCLTorse'];
                var a = v['repeating_slotsDCLTorse_' + currentID + '_slotsADCLTorse'];
                var e = v['repeating_slotsDCLTorse_' + currentID + '_slotsEDCLTorse'];
                var duree = v['repeating_slotsDCLTorse_' + currentID + '_slotsDDCLTorse'];
                var d = v['repeating_slotsDCLTorse_' + currentID + '_slotsUDCLDTorse'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleSlotDCLTorse"] = u;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleNomDCLion"] = n;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleActivationDCLion"] = a;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleEnergieDCLion"] = e;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDureeDCLion"] = duree;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDescriptionDCLion"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsDCLBG", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsDCLBG_' + currentID + '_slotsUDCLBG',
                'repeating_slotsDCLBG_' + currentID + '_slotsNDCLBG',
                'repeating_slotsDCLBG_' + currentID + '_slotsADCLBG',
                'repeating_slotsDCLBG_' + currentID + '_slotsEDCLBG',
                'repeating_slotsDCLBG_' + currentID + '_slotsDDCLBG',
                'repeating_slotsDCLBG_' + currentID + '_slotsUDCLDBG'
                ], function(v) 
            {
                var u = v['repeating_slotsDCLBG_' + currentID + '_slotsUDCLBG'];
                var n = v['repeating_slotsDCLBG_' + currentID + '_slotsNDCLBG'];
                var a = v['repeating_slotsDCLBG_' + currentID + '_slotsADCLBG'];
                var e = v['repeating_slotsDCLBG_' + currentID + '_slotsEDCLBG'];
                var duree = v['repeating_slotsDCLBG_' + currentID + '_slotsDDCLBG'];
                var d = v['repeating_slotsDCLBG_' + currentID + '_slotsUDCLDBG'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleSlotDCLBG"] = u;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleNomDCLion"] = n;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleActivationDCLion"] = a;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleEnergieDCLion"] = e;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDureeDCLion"] = duree;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDescriptionDCLion"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsDCLBD", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsDCLBD_' + currentID + '_slotsUDCLBD',
                'repeating_slotsDCLBD_' + currentID + '_slotsNDCLBD',
                'repeating_slotsDCLBD_' + currentID + '_slotsADCLBD',
                'repeating_slotsDCLBD_' + currentID + '_slotsEDCLBD',
                'repeating_slotsDCLBD_' + currentID + '_slotsDDCLBD',
                'repeating_slotsDCLBD_' + currentID + '_slotsUDCLDBD'
                ], function(v) 
            {
                var u = v['repeating_slotsDCLBD_' + currentID + '_slotsUDCLBD'];
                var n = v['repeating_slotsDCLBD_' + currentID + '_slotsNDCLBD'];
                var a = v['repeating_slotsDCLBD_' + currentID + '_slotsADCLBD'];
                var e = v['repeating_slotsDCLBD_' + currentID + '_slotsEDCLBD'];
                var duree = v['repeating_slotsDCLBD_' + currentID + '_slotsDDCLBD'];
                var d = v['repeating_slotsDCLBD_' + currentID + '_slotsUDCLDBD'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleSlotDCLBD"] = u;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleNomDCLion"] = n;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleActivationDCLion"] = a;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleEnergieDCLion"] = e;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDureeDCLion"] = duree;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDescriptionDCLion"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsDCLJG", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsDCLJG_' + currentID + '_slotsUDCLJG',
                'repeating_slotsDCLJG_' + currentID + '_slotsNDCLJG',
                'repeating_slotsDCLJG_' + currentID + '_slotsADCLJG',
                'repeating_slotsDCLJG_' + currentID + '_slotsEDCLJG',
                'repeating_slotsDCLJG_' + currentID + '_slotsDDCLJG',
                'repeating_slotsDCLJG_' + currentID + '_slotsUDCLDJG'
                ], function(v) 
            {
                var u = v['repeating_slotsDCLJG_' + currentID + '_slotsUDCLJG'];
                var n = v['repeating_slotsDCLJG_' + currentID + '_slotsNDCLJG'];
                var a = v['repeating_slotsDCLJG_' + currentID + '_slotsADCLJG'];
                var e = v['repeating_slotsDCLJG_' + currentID + '_slotsEDCLJG'];
                var duree = v['repeating_slotsDCLJG_' + currentID + '_slotsDDCLJG'];
                var d = v['repeating_slotsDCLJG_' + currentID + '_slotsUDCLDJG'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleSlotDCLJG"] = u;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleNomDCLion"] = n;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleActivationDCLion"] = a;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleEnergieDCLion"] = e;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDureeDCLion"] = duree;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDescriptionDCLion"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    getSectionIDs("repeating_slotsDCLJD", function(idarray) 
    {                    
        _.each(idarray, function(currentID, i)
        {
            getAttrs(
                [
                'repeating_slotsDCLJD_' + currentID + '_slotsUDCLJD',
                'repeating_slotsDCLJD_' + currentID + '_slotsNDCLJD',
                'repeating_slotsDCLJD_' + currentID + '_slotsADCLJD',
                'repeating_slotsDCLJD_' + currentID + '_slotsEDCLJD',
                'repeating_slotsDCLJD_' + currentID + '_slotsDDCLJD',
                'repeating_slotsDCLJD_' + currentID + '_slotsUDCLDJD'
                ], function(v) 
            {
                var u = v['repeating_slotsDCLJD_' + currentID + '_slotsUDCLJD'];
                var n = v['repeating_slotsDCLJD_' + currentID + '_slotsNDCLJD'];
                var a = v['repeating_slotsDCLJD_' + currentID + '_slotsADCLJD'];
                var e = v['repeating_slotsDCLJD_' + currentID + '_slotsEDCLJD'];
                var duree = v['repeating_slotsDCLJD_' + currentID + '_slotsDDCLJD'];
                var d = v['repeating_slotsDCLJD_' + currentID + '_slotsUDCLDJD'];
                
                var newrowid = generateRowID();
                var newrowattrs = {};
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleSlotDCLJD"] = u;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleNomDCLion"] = n;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleActivationDCLion"] = a;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleEnergieDCLion"] = e;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDureeDCLion"] = duree;
                newrowattrs["repeating_modulesDCLion_" + newrowid + "_moduleDescriptionDCLion"] = d;
                setAttrs(newrowattrs);
            });
        });
    });
    
    setAttrs({
        version:15
    });
});

on("clicked:repeating_modules:pem",function()
{
    getAttrs(["repeating_modules_moduleEnergie", "fichePNJ", "armure", "espoir", "energiePNJ", "energiePJ"], function(value)
    {
        const TFiche = value["fichePNJ"];

        if(TFiche == 0)
        {
            const armure = value["armure"];
            const PEM = parseInt(value["repeating_modules_moduleEnergie"], 10)||0;
            var PE = parseInt(value["energiePJ"], 10)||0;
            
            if(armure == "berserk")
                PE = parseInt(value["espoir"], 10)||0;
            
            var total = PE-PEM;

            if(total < 0)
            {
                if(armure != "berserk")
                    setPanneauInformation("Erreur. Energie Indisponible.", false, false, true);
                else
                    setPanneauInformation("Erreur. Espoir Indisponible.", false, false, true);
                
                PI["msgEnergie"] = 1;
            }
            else
            {
                if(armure == "berserk")
                {
                    setAttrs({
                        espoir:total
                    });
                }
                else
                {
                    setAttrs({
                        energiePJ:total
                    });
                }
            }
        }
        else if(TFiche == 1)
        {
            const PEM = parseInt(value["repeating_modules_moduleEnergie"], 10)||0;
            const PE = parseInt(value["energiePNJ"], 10)||0;
            
            var total = PE-PEM;

            if(total < 0)
            {				
                setPanneauInformation("Erreur. Energie Indisponible.", false, false, true);
                
                PI["msgEnergie"] = 1;
            }
            else
            {
                setAttrs({
                    energiePNJ:total
                });
            }
        }
    });
});

on("clicked:repeating_modulesdclion:pemdlion",function()
{
    getAttrs(["repeating_modules_moduleEnergieDCLion", "druidLionPEAct", "nomIA"], function(value)
    {
        const IA = value["nomIA"];
        const PEM = parseInt(value["repeating_modules_moduleEnergieDCLion"], 10)||0;
        const PE = parseInt(value["druidLionPEAct"], 10)||0;
        
        var total = PE-PEM;

        if(total < 0)
        {				
            setPanneauInformation("Erreur. Energie Indisponible.", false, false, true);
            
            PI["msgEnergie"] = 1;
        }
        else
        {
            setAttrs({
                druidLionPEAct:total
            });
        }
    });
});

on("change:tab change:fichePNJ",function()
{
    resetPanneauInformation();
});

on("change:fichePNJ",function(value)
{
    var fiche = value.newValue;

    if(fiche == 0 || fiche == 1 || fiche == 2 || fiche == 3)
    {
        setAttrs({
            tab:"dossier",
            armure:"sans"
        });
    }
    
    if(fiche == 4)
    {
        setAttrs({
            tab:"vehicule",
            armure:"sans"
        });
    }
});

//MECHAARMURE
var mechaArmure = {
    "0":{
        vitesse:0,
        manoeuvrabilite:0,
        puissance:0,
        senseurs:0,
        systemes:0,
        resilience:0,
        blindage:0,
        cdf:0,
        noyaux:0
    },
    "archangel":{
        vitesse:3,
        manoeuvrabilite:5,
        puissance:5,
        senseurs:6,
        systemes:8,
        resilience:30,
        blindage:70,
        cdf:30,
        noyaux:100
    },
    "nephilim":{
        vitesse:2,
        manoeuvrabilite:-4,
        puissance:10,
        senseurs:10,
        systemes:10,
        resilience:28,
        blindage:120,
        cdf:20,
        noyaux:100
    },
    "demon":{
        vitesse:2,
        manoeuvrabilite:4,
        puissance:12,
        senseurs:8,
        systemes:4,
        resilience:20,
        blindage:80,
        cdf:30,
        noyaux:100
    }
};

on("change:mechaArmure change:mechaArmureVitesseModif change:mechaArmureManoeuvrabiliteModif change:mechaArmurePuissanceModif change:mechaArmureSenseursModif change:mechaArmureSystemesModif change:mechaArmureResilienceModif change:MANOGSTActive change:mechaArmureBlindageModif change:mechaArmureCdfModif change:mechaArmureNoyauxEnergieModif sheet:opened",function()
{
    getAttrs(["mechaArmure", "mechaArmureVitesseModif", "mechaArmureManoeuvrabiliteModif", "mechaArmurePuissanceModif", "mechaArmureSenseursModif", "mechaArmureSystemesModif", "mechaArmureResilienceModif", "MANOGSTActive","mechaArmureBlindageModif", "mechaArmureCdfModif", "mechaArmureNoyauxEnergieModif"], function(value)
    {
        const MA = value["mechaArmure"];
        const type = mechaArmure[MA] || [];

        const vitesse = parseInt(type["vitesse"], 10)||0;
        const manoeuvrabilite = parseInt(type["manoeuvrabilite"], 10)||0;
        const puissance = parseInt(type["puissance"], 10)||0;
        const senseurs = parseInt(type["senseurs"], 10)||0;
        const systemes = parseInt(type["systemes"], 10)||0;
        const resilience = parseInt(type["resilience"], 10)||0;
        const blindage = parseInt(type["blindage"], 10)||0;
        const cdf = parseInt(type["cdf"], 10)||0;
        const noyaux = parseInt(type["noyaux"], 10)||0;
        
        const vitesseM = parseInt(value["mechaArmureVitesseModif"], 10)||0;
        const manoeuvrabiliteM = parseInt(value["mechaArmureManoeuvrabiliteModif"], 10)||0;
        const puissanceM = parseInt(value["mechaArmurePuissanceModif"], 10)||0;
        const senseursM = parseInt(value["mechaArmureSenseursModif"], 10)||0;
        const systemesM = parseInt(value["mechaArmureSystemesModif"], 10)||0;
        const resilienceM = parseInt(value["mechaArmureResilienceModif"], 10)||0;
        const blindageM = parseInt(value["mechaArmureBlindageModif"], 10)||0;
        const cdfM = parseInt(value["mechaArmureCdfModif"], 10)||0;
        const noyauxM = parseInt(value["mechaArmureNoyauxEnergieModif"], 10)||0;
        
        const MST = parseInt(value["MANOGSTActive"], 10)||0;
        
        var resilienceB = 0;
        
        if(MST == 1)
            resilienceB += 10;
        
        var vitesseTotal = vitesse+vitesseM;
        var manoeuvrabiliteTotal = manoeuvrabilite+manoeuvrabiliteM;
        var puissanceTotal = puissance+puissanceM;
        var senseursTotal = senseurs+senseursM;
        var systemesTotal = systemes+systemesM;
        var resilienceTotal = resilience+resilienceM+resilienceB;
        var blindageTotal = blindage+blindageM;
        var cdfTotal = cdf+cdfM;
        var noyauxTotal = noyaux+noyauxM;

        let translation;

        if(!MA)
            translation = "";
        else
            translation = getTranslationByKey(MA);
        
        setAttrs({
            mechaArmureNom: translation,
            mechaArmureVitesse: vitesseTotal,
            mechaArmureManoeuvrabilite: manoeuvrabiliteTotal,
            mechaArmurePuissance: puissanceTotal,
            mechaArmureSenseurs: senseursTotal,
            mechaArmureSystemes: systemesTotal,
            mechaArmureResilience_max: resilienceTotal,
            mechaArmureBlindage_max: blindageTotal,
            mechaArmureCdf_max: cdfTotal,
            mechaArmureNoyauxEnergie_max: noyauxTotal
        });
    });
});

on("change:mechaArmureTypeJets change:mechaArmureManoeuvrabilite change:mechaArmurePuissance change:mechaArmureSenseurs change:mechaArmureSystemes sheet:opened",function()
{
    getAttrs(["mechaArmureTypeJets", "mechaArmureManoeuvrabilite", "mechaArmurePuissance", "mechaArmureSenseurs", "mechaArmureSystemes"], function(value)
    {
        const type = parseInt(value["mechaArmureTypeJets"], 10)||0;
        const manoeuvrabilite = parseInt(value["mechaArmureManoeuvrabilite"], 10)||0;
        const puissance = parseInt(value["mechaArmurePuissance"], 10)||0;
        const senseurs = parseInt(value["mechaArmureSenseurs"], 10)||0;
        const systemes = parseInt(value["mechaArmureSystemes"], 10)||0;
        
        switch(type)
        {
            case 1:
                setAttrs({
                    mechaArmureJetBonus: manoeuvrabilite,
                    mechaArmureJetBonusType: "Manoeuvrabilité"
                });
                break;
            case 2:
                setAttrs({
                    mechaArmureJetBonus: puissance,
                    mechaArmureJetBonusType: "Puissance"
                });
                break;
            case 3:
                setAttrs({
                    mechaArmureJetBonus: senseurs,
                    mechaArmureJetBonusType: "Senseurs"
                });
                break;
            case 4:
                setAttrs({
                    mechaArmureJetBonus: systemes,
                    mechaArmureJetBonusType: "Systèmes"
                });
                break;
            case 5:
                setAttrs({
                    mechaArmureJetBonus: 0,
                    mechaArmureJetBonusType: ""
                });
                break;
        }
    });
});

on("change:mechaArmure change:mechaArmureArchangelConfiguration change:mechaArmureNephilimConfiguration change:mechaArmureDemonConfiguration",function()
{
    setAttrs({
            MADABAmritaActive: 0,
            MAAEvacuationActive: 0,
            MANOGStationActive:0,
            MANOGInvulnerabiliteActive:0,
            MANOGSTActive:0,
            MADDjinnWraithActive:0,
            MADDjinnNanobrumeActive:0,
            MADACSoniqueActive:0,
            MAArchangelVolActive:0,
            MANephilimSautActive:0,
            MANephilimEmblemActive:0,
            MADemonSautActive:0,
            MANephilimDronesAirainActive:0
        });
});
//FIN MECHAARMURE

//LONGBOW
on("change:rangerArmeDegatEvol change:rangerArmeDegat change:rangerArmeViolenceEvol change:rangerArmeViolence change:rangerArmePortee change:rangerChoc change:rangerDegatContinue change:rangerDesignation change:rangerSilencieux change:rangerPerceArmure change:rangerUltraViolence change:rangerAntiVehicule change:rangerArtillerie change:rangerDispersion change:rangerLumiere change:rangerPenetrant change:rangerPerceArmure60 change:rangerAntiAnatheme change:rangerDemoralisant change:rangerEnChaine change:rangerFureur change:rangerIgnoreArmure change:rangerPenetrant10 change:ranger100PG change:ranger50PG2 sheet:opened",function()
{
    getAttrs(["rangerArmeDegatEvol", "rangerArmeDegat", "rangerArmeViolenceEvol", "rangerArmeViolence", "rangerArmePortee", "rangerChoc", "rangerDegatContinue", "rangerDesignation", "rangerSilencieux", "rangerPerceArmure", "rangerUltraViolence", "rangerAntiVehicule", "rangerArtillerie", "rangerDispersion", "rangerLumiere", "rangerPenetrant", "rangerPerceArmure60", "rangerAntiAnatheme", "rangerDemoralisant", "rangerEnChaine", "rangerFureur", "rangerIgnoreArmure", "rangerPenetrant10", "ranger100PG" , "ranger50PG2"], function(value)
    {
        let PG50 = value["ranger50PG2"];
        let PG100 = value["ranger100PG"];

        let baseD = 3;
        let baseV = 1;

        let E1 = 2;
        let E2 = 3;
        let E3 = 6;

        let dgts = Number(value["rangerArmeDegat"]);
        let violence = Number(value["rangerArmeViolence"]);

        let portee = value["rangerArmePortee"];

        if(PG50 == "on") {
            baseD = 5;
            baseV = 3;

            dgts = Number(value["rangerArmeDegatEvol"]);
            violence = Number(value["rangerArmeViolenceEvol"]);
        }

        if(PG100 == "on") {
            E1 = 1;
            E2 = 1;
            E3 = 4;
        }

        let eChoc = value["rangerChoc"];
        let eDegatsContinus = value["rangerDegatContinue"];
        let eDesignation = value["rangerDesignation"];
        let eSilencieux = value["rangerSilencieux"];
        let ePerceArmure = value["rangerPerceArmure"];
        let eUltraviolence = value["rangerUltraViolence"];
        let eAntiVehicule = value["rangerAntiVehicule"];
        let eArtillerie = value["rangerArtillerie"];
        let eDispersion = value["rangerDispersion"];
        let eLumiere = value["rangerLumiere"];
        let ePenetrant = value["rangerPenetrant"];
        let ePerceArmure60 = value["rangerPerceArmure60"];
        let eAntiAnatheme = value["rangerAntiAnatheme"];
        let eDemoralisant = value["rangerDemoralisant"];
        let eEnChaine = value["rangerEnChaine"];
        let eFureur = value["rangerFureur"];        
        let eIgnoreArmure = value["rangerIgnoreArmure"];
        let ePenetrant10 = value["rangerPenetrant10"];

        let energie = 0;

        energie += (dgts-baseD);
        energie += (violence-baseV);

        switch(portee) {
            case "^{portee-longue}":
                energie += 1;
                break;

            case "^{portee-lointaine}":
                energie += 2;
                break;
        }

        if(eChoc != "0")
            energieDepense += E1;
        
        if(eSilencieux != "0")
            energieDepense += E1;
        
        if(eUltraviolence != "0")
            energieDepense += E1;
        
        if(eArtillerie != "0")
            energieDepense += E2;
        
        if(eAntiAnatheme != "0")
            energieDepense += E3;
        
        if(eDemoralisant != "0")
            energieDepense += E3;
        
        if(eEnChaine != "0")
            energieDepense += E3;
        
        if(eFureur != "0")
            energieDepense += E3;

        if(eAntiVehicule != "0")
            energieDepense += E2;
        
        if(eDegatsContinus != "0")
            energieDepense += E1;

        if(eDesignation != "0")
            energieDepense += E1;          

        if(eDispersion != "0")
            energieDepense += E2;

        if(eLumiere != "0")
            energieDepense += E2;

        if(ePenetrant != "0")
            energieDepense += E2;
        
        if(ePerceArmure != "0")
            energieDepense += E1;

        if(ePerceArmure60 != "0")
            energieDepense += E2;       

        if(eIgnoreArmure != "0")
            energieDepense += E3;
            
        if(ePenetrant10 != "0")
            energieDepense += E3;

        setAttrs({
                longbowEnergie: `(${getTranslationByKey("depense-energie-prevue")} : ${energie})`
            });
    });
});
//LONGBOW

//Import NPC
on("clicked:importKNPCG",function()
{
    getAttrs(["importKNPCG"], function(value)
    {
        const json = JSON.parse(value["importKNPCG"]);
        const aspects = json.aspects;
        const capacites = json.capacities;
        const weapons = json.weapons;
            
        let type = json.type.charAt(0).toUpperCase()+json.type.substr(1);
        let level = json.level.charAt(0).toUpperCase()+json.level.substr(1);
        
        let chair = {"score":0, "majeur":0, "mineur":0};
        let bete = {"score":0, "majeur":0, "mineur":0};
        let machine = {"score":0, "majeur":0, "mineur":0};
        let dame = {"score":0, "majeur":0, "mineur":0};
        let masque = {"score":0, "majeur":0, "mineur":0};
        let lAspects = {"chair":chair, "bête":bete, "machine":machine, "dame":dame, "masque":masque};
        
        let health = json.health || 0;
        let armor = json.armor || 0;
        let energy = json.energy || 0;
        let shield = json.shield || 0;
        let forcefield = json.forcefield || 0;
        let defense = json.defense || 0;
        let reaction = json.reaction || 0;

        let diceInitiative = 3;
        let initiative = json.initiative || 1;
        
        let tabResilience = 0;
        let resilience = json.resilience || 0;
        
        let debordement = json.outbreak || 0;
        
        let weakness = json.weakness || "";
        
        for (var key in aspects) {
            let result = aspects[key];
            lAspects[result.name].score = result.score;
            
            if(result.major == true)
                lAspects[result.name].majeur = result.exceptional;
            else
                lAspects[result.name].mineur = result.exceptional;
        }
                    
        getSectionIDs("repeating_capacites", function(idarray) {
            for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_capacites_" + idarray[i]);
            }
        });
        
        for (var key in capacites) {
            let result = capacites[key];
            
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs["repeating_capacites_" + newrowid + "_nomCapacite"] = result.name;
            newrowattrs["repeating_capacites_" + newrowid + "_descCapacite"] = result.description;
            setAttrs(newrowattrs);
        }
        
        getSectionIDs("repeating_armeCaC", function(idarray) {
            for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_armeCaC_" + idarray[i]);
            }
        });
        
        getSectionIDs("repeating_armedist", function(idarray) {
            for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_armedist_" + idarray[i]);
            }
        });
        
        let otherWPNEffects = [];
        
        for (var key in weapons) {
            let result = weapons[key];
            let contact = result.contact;
            let range = result.range;
            let path = "";
            let otherEffects = [];
                            
            const effects = result.effects;
            
            var newrowid = generateRowID();
            var newrowattrs = {};
            
            if(contact == true)
            {
                path = "repeating_armeCaC_";
                
                let raw = result.raw-lAspects.bête.mineur-lAspects.bête.majeur;
                
                if(raw < 0)
                    raw = 0;
                
                newrowattrs[path + newrowid + "_ArmeCaC"] = result.name;
                newrowattrs[path + newrowid + "_armeCaCDegat"] = result.dices;
                newrowattrs[path + newrowid + "_armeCaCBDegat"] = raw;
                newrowattrs[path + newrowid + "_armeCaCViolence"] = result.violenceDices;
                newrowattrs[path + newrowid + "_armeCaCBDegat"] = raw;
                newrowattrs[path + newrowid + "_armeCaCBViolence"] = result.violenceRaw
                newrowattrs[path + newrowid + "_armeCaCPortee"] = "^{portee-"+range+"}";
            }
            else
            {
                path = "repeating_armedist_";
            
                newrowattrs[path + newrowid + "_ArmeDist"] = result.name;
                newrowattrs[path + newrowid + "_armeDistDegat"] = result.dices;
                newrowattrs[path + newrowid + "_armeDistViolence"] = result.violenceDices;
                newrowattrs[path + newrowid + "_armeDistBDegat"] = result.raw;
                newrowattrs[path + newrowid + "_armeDistBViolence"] = result.violenceRaw
                newrowattrs[path + newrowid + "_armeDistPortee"] = "^{portee-"+range+"}";
            }
            
            for (var cle in effects) {
                let eff = effects[cle].name.split(" ");
                let length = eff.length;
                
                if(length > 1)
                    length = length-1;
                else
                    length = 1;
                    
                let name = effects[cle].name.split(" ", length).join(" ").toLowerCase();
                let value = eff[length] || 0;
                
                switch(name){
                    case "anathème":
                        newrowattrs[path + newrowid + "_anatheme"] = "{{anatheme=Anathème}}";
                    break;
                    
                    case "anti-anathème":
                        newrowattrs[path + newrowid + "_antiAnatheme"] = "{{antiAnathème=Anti Anathème}}";
                    break;
                    
                    case "anti-véhicule":
                        newrowattrs[path + newrowid + "_antiVehicule"] = "{{antiVehicule=Anti Véhicule}} ";
                    break;
                    
                    case "anti-véhicule":
                        newrowattrs[path + newrowid + "_artillerie"] = "{{artillerie=Artillerie}}";
                    break;
                    
                    case "assassin":
                        newrowattrs[path + newrowid + "_assassin"] = "{{assassin=[[@{assassinValue}d6]]}} ";
                        newrowattrs[path + newrowid + "_assassinValue"] = Number(value);
                    break;
                    
                    case "assistance à l'attaque":
                        newrowattrs[path + newrowid + "_assistanceAttaque"] = "{{assistanceAttaque=Assistance à l'attaque}}";
                    break;
                    
                    case "barrage":
                        newrowattrs[path + newrowid + "_barrage"] = "{{barrage=^{barrage} @{barrageValue}}} ";
                        newrowattrs[path + newrowid + "_barrageValue"] = Number(value);
                    break;
                    
                    case "cadence":
                        newrowattrs[path + newrowid + "_cadence"] = "[[?{Plusieurs cibles ?|Oui, 3.5|Non, 0.5}]]";
                        newrowattrs[path + newrowid + "_cadenceValue"] = Number(value);
                    break;
                    
                    case "chargeur":
                        newrowattrs[path + newrowid + "_chargeur"] = "{{chargeur=^{chargeur} @{chargeurValue}}} ";
                        newrowattrs[path + newrowid + "_chargeurValue"] = Number(value);
                    break;
                    
                    case "choc":
                        newrowattrs[path + newrowid + "_choc"] = "{{choc=^{choc} @{chocValue}}}";
                        newrowattrs[path + newrowid + "_chocValue"] = Number(value);
                    break;
                    
                    case "défense":
                        newrowattrs[path + newrowid + "_defense"] = "{{defense=^{defense} @{defenseValue}}}";
                        newrowattrs[path + newrowid + "_defenseValue"] = Number(value);
                    break;
                    
                    case "dégâts continus":
                        newrowattrs[path + newrowid + "_degatContinue"] = "{{degatContinus=^{degats-continus} @{degatContinueValue} ([[1D6]] ^{tours})}}";
                        newrowattrs[path + newrowid + "_degatContinueValue"] = Number(value);
                    break;
                    
                    case "deux mains":
                        newrowattrs[path + newrowid + "_deuxMains"] = "{{deuxMains=Deux Mains}}";
                    break;
                    
                    case "démoralisant":
                        newrowattrs[path + newrowid + "_demoralisant"] = "{{demoralisant=Démoralisant}}";
                    break;
                    
                    case "désignation":
                        newrowattrs[path + newrowid + "_designation"] = "{{designation=Désignation}}";
                    break;
                    
                    case "destructeur":
                        newrowattrs[path + newrowid + "_destructeur"] = "{{destructeur=[[2D6]]}}";
                    break;
                    
                    case "dispersion":
                        newrowattrs[path + newrowid + "_dispersion"] = "{{dispersion=^{dispersion} @{dispersionValue}}} ";
                        newrowattrs[path + newrowid + "_dispersionValue"] = Number(value);
                    break;
                    
                    case "en chaîne":
                        newrowattrs[path + newrowid + "_enChaine"] = "{{enChaine=En Chaîne}}";
                    break;
                    
                    case "espérance":
                        newrowattrs[path + newrowid + "_esperance"] = "{{esperance=Espérance}}";
                    break;
                    
                    case "fureur":
                        newrowattrs[path + newrowid + "_fureur"] = "{{fureur=[[4D6]]}}";
                    break;
                    
                    case "ignore armure":
                        newrowattrs[path + newrowid + "_ignoreArmure"] = "{{ignoreArmure=Ignore Armure}}";
                    break;
                    
                    case "ignore champ de force":
                        newrowattrs[path + newrowid + "_ignoreCdF"] = "{{ignoreCdF=Ignore Champs de Force}}";
                    break;
                    
                    case "jumelé (akimbo)":
                        newrowattrs[path + newrowid + "_akimbo"] = "2";
                    break;
                    
                    case "jumelé (ambidextrie)":
                        newrowattrs[path + newrowid + "_ambidextrie"] = "2";
                    break;
                    
                    case "lesté":
                        newrowattrs[path + newrowid + "_lestePNJ"] = "{{leste=[[@{Chair}]]}}";
                    break;
                    
                    case "lourd":
                        newrowattrs[path + newrowid + "_lourd"] = "1";
                    break;
                    
                    case "lumière":
                        newrowattrs[path + newrowid + "_lumiere"] = "{{lumiere=^{lumiere} @{lumiereValue}}}";
                        newrowattrs[path + newrowid + "_lumiereValue"] = Number(value);
                    break;
                    
                    case "meurtrier":
                        newrowattrs[path + newrowid + "_meurtrier"] = "{{meurtrier=[[2D6]]}}";
                    break;
                    
                    case "oblitération":
                        newrowattrs[path + newrowid + "_obliteration"] = "{{obliteration=Oblitération}}";
                    break;
                    
                    case "orfèvrerie":
                        newrowattrs[path + newrowid + "_orfevreriePNJ"] = "{{orfevrerie=[[ceil(@{masque}/2)]]}}";
                    break;
                    
                    case "parasitage":
                        newrowattrs[path + newrowid + "_parasitage"] = "{{parasitage=^{parasitage} @{parasitageValue}}}";
                        newrowattrs[path + newrowid + "_parasitageValue"] = Number(value);
                    break;
                    
                    case "pénétrant":
                        newrowattrs[path + newrowid + "_penetrant"] = "{{penetrant=^{penetrant} @{penetrantValue}}}";
                        newrowattrs[path + newrowid + "_penetrantValue"] = Number(value);
                    break;
                    
                    case "perce Armure":
                        newrowattrs[path + newrowid + "_perceArmure"] = "{{perceArmure=^{perce-armure} @{perceArmureValue}}}";
                        newrowattrs[path + newrowid + "_perceArmureValue"] = Number(value);
                    break;
                    
                    case "précision":
                        newrowattrs[path + newrowid + "_precisionPNJ"] = "{{precision=[[(ceil((@{machine})/2))]]}}";
                    break;
                    
                    case "réaction":
                        newrowattrs[path + newrowid + "_reaction"] = "{{reaction=^{reaction} @{reactionValue}}}";
                        newrowattrs[path + newrowid + "_reactionValue"] = Number(value);
                    break;
                    
                    case "silencieux":
                        newrowattrs[path + newrowid + "_silencieux"] = "{{silencieux=Silencieux}}";
                    break;
                    
                    case "soumission":
                        newrowattrs[path + newrowid + "_soumission"] = "{{soumission=Soumission}}";
                    break;
                    
                    case "ténébricide":
                        newrowattrs[path + newrowid + "_tenebricite"] = "{{tenebricide=Ténébricide}}";
                    break;
                    
                    case "tir en rafale":
                        newrowattrs[path + newrowid + "_tirRafale"] = "{{tirRafale=Tir en Rafale}}";
                    break;
                    
                    case "tir en sécurité":
                        newrowattrs[path + newrowid + "_tirSecurite"] = "3";
                    break;
                    
                    case "ultraviolence":
                        newrowattrs[path + newrowid + "_ultraViolence"] = "{{ultraviolence=[[2D6]]}}";
                    break;
                    
                    default:
                        otherEffects.push(effects[cle].name);
                    break;
                }
            }
            
            if(otherEffects.length > 0)
            {					
                otherWPNEffects.push(result.name+" : "+otherEffects.join(", "));
            }
            
            setAttrs(newrowattrs);
        }

        if(json.resilience > 0)
            tabResilience = 1;

        if(type == "Bande")
        {
            setAttrs({
                fichePNJ:3
            });
            
            diceInitiative = 0;
        }

        defense = defense-lAspects.masque.majeur-lAspects.masque.mineur;
        reaction = reaction-lAspects.machine.majeur-lAspects.machine.mineur;

        setAttrs({
            character_name:json.name,
            typePNJ:type+" ("+level+")",
            
            chair:lAspects["chair"].score,
            chairPNJAE:lAspects["chair"].mineur,
            chairPNJAEMaj:lAspects["chair"].majeur,
            bete:lAspects["bête"].score,
            betePNJAE:lAspects["bête"].mineur,
            betePNJAEMaj:lAspects["bête"].majeur,
            machine:lAspects["machine"].score,
            machinePNJAE:lAspects["machine"].mineur,
            machinePNJAEMaj:lAspects["machine"].majeur,
            dame:lAspects["dame"].score,
            damePNJAE:lAspects["dame"].mineur,
            damePNJAEMaj:lAspects["dame"].majeur,
            masque:lAspects["masque"].score,
            masquePNJAE:lAspects["masque"].mineur,
            masquePNJAEMaj:lAspects["masque"].majeur,
            
            santePNJ:health,
            santePNJ_max:health,
            
            armurePNJ:armor,
            armurePNJ_max:armor,
            
            energiePNJ:energy,
            energiePNJ_max:energy,
            
            bouclierPNJ:shield,
            bouclierPNJ_max:shield,
            
            cdfPNJ:forcefield,
            cdfPNJ_max:forcefield,
            
            defensePNJ:defense,
            reactionPNJ:reaction,
            
            diceInitiative:diceInitiative,
            bonusInitiativeP:initiative,
            
            ptsFaibles:weakness,
            
            pnjCapaciteNotes:otherWPNEffects.join("\r\n"),
            
            tabResilience:tabResilience,
            resilience:resilience,
            resilience_max:resilience,
            
            bandeDebordement:debordement
        });
    });
});

//TRADUCTIONS
on("sheet:opened",function()
{
    let bard = [i18n_ignoreArmure, i18n_ignoreCDF, i18n_dispersion+" 6", i18n_choc+" 1"];
    bard.sort();

    let wizardBorealis = [i18n_antiAnatheme, i18n_degatsContinus+" 3"];
    wizardBorealis.sort();

    let wizardOriflamme = [i18n_antiAnatheme, i18n_lumiere+" 2", i18n_affecteAnatheme];
    wizardOriflamme.sort();

    let MADSD = [i18n_antiVehicule, i18n_briserResilience, i18n_parasitage+" 2"];
    MADSD.sort();

    let MANMJ = [i18n_antiVehicule, i18n_antiAnatheme, i18n_demoralisant, i18n_briserResilience];
    MANMJ.sort();

    let MAACM = [i18n_antiVehicule, i18n_parasitage+" 2", i18n_degatsContinus+" 10", i18n_briserResilience];
    MAACM.sort();

    let MANCM = [i18n_antiVehicule, i18n_dispersion+" 12", i18n_antiAnatheme, i18n_briserResilience, i18n_fureur];
    MANCM.sort();

    let MANMS = [i18n_antiVehicule, i18n_demoralisant, i18n_ultraviolence];
    MANMS.sort();

    setAttrs({
        bardEffetAttSpe: bard.join(" / "),
        berserkIlluminationBlazePortee: getTranslationByKey("portee-contact"),
        berserkIlluminationBeaconPortee: getTranslationByKey("portee-contact"),
        berserkIlluminationProjectorPortee: getTranslationByKey("portee-courte"),
        berserkIlluminationLighthousePortee: getTranslationByKey("portee-courte"),
        berserkIlluminationLanternPortee: getTranslationByKey("portee-courte"),
        berserkIlluminationLanternEffets: getTranslationByKey("esperance"),
        monkVaguePortee: getTranslationByKey("portee-contact")+" / "+getTranslationByKey("portee-courte"),
        monkSalvePortee: getTranslationByKey("portee-moyenne"),
        monkRayonPortee: getTranslationByKey("portee-moyenne"),
        wizardBEffets: wizardBorealis.join(" / "),
        wizardOEffets: wizardOriflamme.join(" / "),
        MALWizardOEffets: wizardOriflamme.join(" / "),
        MALWizardOPortee: getTranslationByKey("portee-moyenne"),
        traumasInsignifiants: getTranslationByKey("traumas-insignifiants"),
        traumasLegers: getTranslationByKey("traumas-legers"),
        traumasGraves: getTranslationByKey("traumas-graves"),
        traumasLourds: getTranslationByKey("traumas-lourds"),
        MADSDPortee: getTranslationByKey("portee-contact"),
        MADSDEffetsListe: MADSD.join(" / "),
        MAAGOfferingDuree: "1D3 "+getTranslationByKey("tours"),
        MAAGOfferingPortee: getTranslationByKey("portee-moyenne"),
        MAAGCurseDuree: "1 "+getTranslationByKey("tour"),
        MAAGCursePortee: getTranslationByKey("portee-moyenne"),
        MAAGMiracleDuree: "2D6 "+getTranslationByKey("tours"),
        MAAGMiraclePortee: getTranslationByKey("portee-contact"),
        MAAGEvacuationDuree: "1 "+getTranslationByKey("tour"),
        MAAGEvacuationPortee: getTranslationByKey("zone-entiere"),
        MANOGInvulnerabilitePortee: getTranslationByKey("portee-courte"),
        MANOGInvulnerabiliteDuree: "2D6 "+getTranslationByKey("tours"),
        MANOGInvulnerabiliteEffets: getTranslationByKey("invulnerabilite"),
        MANOGStationPortee: getTranslationByKey("portee-moyenne"),
        MANOGStationDuree: getTranslationByKey("sans-limite"),
        MANMJEffetsL:MANMJ.join(" / "),
        MANMJPortee: getTranslationByKey("portee-lointaine"),
        MADAPSEffets: getTranslationByKey("poings-soniques-effets"),
        MADAPSPortee: getTranslationByKey("portee-contact"),
        MADACSPortee: getTranslationByKey("portee-courte"),
        MADACSEffets: getTranslationByKey("choc")+" 6 / "+getTranslationByKey("choc")+" 4 / "+getTranslationByKey("choc")+" 2",
        MANSautPortee: getTranslationByKey("portee-longue"),
        MANSautHauteur: getTranslationByKey("portee-longue"),
        MANSautDuree: "1 "+getTranslationByKey("tour"),
        MANEmblemPortee: getTranslationByKey("portee-longue"),
        MADSautPortee: getTranslationByKey("portee-longue"),
        MADSautHauteur: getTranslationByKey("portee-longue"),
        MADSautDuree: "1 "+getTranslationByKey("tour"),
        MAAVagueSoinPortee: getTranslationByKey("portee-moyenne"),
        MANDronesAirainDuree: getTranslationByKey("sans-limite"),
        MANDronesAirainPortee: getTranslationByKey("portee-longue"),
        MAAMIPortee: getTranslationByKey("portee-courte"),
        MAACanonMetatronEffets: MAACM.join(" / "),
        MAACanonMetatronPortee: getTranslationByKey("portee-moyenne"),
        MANCanonMagmaEffets: MANCM.join(" / "),
        MANCanonMagmaPortee: getTranslationByKey("portee-moyenne"),
        MADLCGEffets: getTranslationByKey("lames-cinetiques-geantes-effets"),
        MAACanonNoePortée: getTranslationByKey("portee-longue"),
        MANMSEffetsListe: MANMS.join(" / "),
        MANMSurturPortee: getTranslationByKey("portee-moyenne"),
        MAATLAPortee: getTranslationByKey("portee-courte"),
        MAATLAEffets: getTranslationByKey("anti-anatheme"),
        druidLionBaseNom: getTranslationByKey("coups"),
        MALDruidLionBaseNom: getTranslationByKey("coups"),
        pSCaC: getTranslationByKey("couteau-de-service"),
        mECaC: getTranslationByKey("marteau-epieu-contact"),
        pSDist: getTranslationByKey("pistolet-de-service"),
        mEDist: getTranslationByKey("marteau-epieu-distance"),
        poingCaC: getTranslationByKey("coup-poing-pied"),
        poingMACaC: getTranslationByKey("coup-poing-pied")
    });
});