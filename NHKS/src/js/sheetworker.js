/*
    CREATED by      Gorthian
    Version		    v2.0 HF1
    Letzte Änderung	2023-10-14
    GitHub		    https://github.com/Gorthian/Roll20_NHKS_CharacterSheet
    Wiki            https://github.com/Gorthian/Roll20_NHKS_CharacterSheet/wiki
    Bugs & Issues   https://github.com/Gorthian/Roll20_NHKS_CharacterSheet/issues
*/ 

/* Globale Konstanten -- Start */
const iMinAttributeValue = 5;
const iMaxAttributeValue = 10;
const iMinSkillValue = 0;
const iMaxSkillValue = 10;
const aActorAttributes = ["strength","stamina","dexterity","knowledge","coolness","chi"];
const aActorSkills = ["acrobatic","athletic","dodge","boats","persuade","computers","firstaid","extremesport","slideofhand","aircrafts","vehicles","improvisation","climbing","contacts","mechanic","stealth","perception","languages","searching","hiding"];
const aActorWeaponSkills = ["melee-small","melee-medium","melee-big","pistols","rifles","heavy-weapons","melee-misc","ranged-misc","unarmed"];
const iBaseCriticalSuccess = 2;
const iBaseCriticalFailure = 19;
const sBaseRoll = "[[1d20cs<?{"+getTranslationByKey("critical-success-to")+"|"+iBaseCriticalSuccess+"}cf>?{"+getTranslationByKey("critical-failure-from")+"|"+iBaseCriticalFailure+"}]]";
/* Globale Konstanten -- Ende */	

/* Event-Listener -- Start */
on("sheet:opened", function () {
    recalcValues();
});

on("change:role-type", function () {
    recalcChipoints();
    recalcHitpoints();
});	

function getModifiedTarget(results,iSum) {
    let iModifier = parseInt(results.results.modifierValue.result);
    let modifiedTarget = iSum +  iModifier;

    return modifiedTarget;
}

function getRollResult(results,iSum) {
    let sExpression = results.results.roll1.expression;
    let iRoll = parseInt(results.results.roll1.result);
    let iModifier = parseInt(results.results.modifierValue.result);
    let sResult = "";
                
    let iCriticalSuccess = parseInt(sExpression.split("<")[1].split("cf")[0]);
    let iCriticalFailure = parseInt(sExpression.split(">")[1]);		
                
    if (iRoll <= iCriticalSuccess) {
        sResult = getTranslationByKey("critical-success");
    } else if (iRoll <= iSum + iModifier) {
        sResult = getTranslationByKey("success");
    } else if (iRoll < iCriticalFailure) {
        sResult = getTranslationByKey("failure");
    } else {
        sResult = getTranslationByKey("critical-failure");
    }
    
    return sResult;
}

/* Fertigkeitsproben (Schauspieler) */
aActorSkills.forEach(sSkill => {
    on(`clicked:skill-${sSkill}`, function() {			
        getAttrs(["character_name","role-name","skill-"+sSkill+"-attribute","skill-"+sSkill,"skill-"+sSkill+"-is-role-skill","skill-"+sSkill+"-role"], function (values){
            let sName = values["character_name"];
            let sRoleName = values["role-name"];
            let sAttribute = values["skill-"+sSkill+"-attribute"];
            let iSkillValue = parseInt(values["skill-"+sSkill]);
            let iSkillRole = parseInt(values["skill-"+sSkill+"-role"]);
            let iIsRoleSkill = parseInt(values["skill-" + sSkill + "-is-role-skill"]||0);
            
            getAttrs([sAttribute], function(values2) {
                let iAttributeValue = parseInt(values2[sAttribute]);
                let iSum = 0;
                let sRollQuery = "&{template:skill} {{name="+sName+"}}";
                
                if (iIsRoleSkill == 1) {
                    iSum = iSkillRole + iAttributeValue;
                    sRollQuery = sRollQuery + " {{type=role}} {{role-name=: "+sRoleName+"}} {{skillValue="+iSkillRole+"}}";
                } else {
                    iSum = iSkillValue + iAttributeValue;
                    sRollQuery = sRollQuery + " {{type=actor}} {{skillValue="+iSkillValue+"}}";
                }
                sRollQuery = sRollQuery + " {{skill="+getTranslationByKey(sSkill)+"}} {{attribute="+getTranslationByKey(sAttribute)+"}} {{attributeValue="+iAttributeValue+"}} {{target=[["+iSum+"]]}} {{modifier="+getTranslationByKey("modifier")+"}} {{modifierValue=[[?{"+getTranslationByKey("modifier")+"|0}]]}} {{roll1="+sBaseRoll+"}}";
                
                startRoll(sRollQuery, (results) => {
                    finishRoll(results.rollId,{
                        target: getModifiedTarget(results, iSum),
                        roll1: getRollResult(results, iSum),
                    });
                });
            });
        });
    });
});	

/* Proben auf Rollenfertigkeiten */
on("clicked:repeating_roleskills:roleskill", function() {			
    getAttrs(["character_name","role-name","repeating_roleskills_roleskills-name","repeating_roleskills_roleskills-attribute"], function (values){
        let sName = values["character_name"];
        let sRoleName = values["role-name"];
        let sSkill = values["repeating_roleskills_roleskills-name"];
        let sAttribute = values["repeating_roleskills_roleskills-attribute"];
        let iSkillValue = 0;
        let iSkillRole = 4;
        let iIsRoleSkill = 1;
        
        getAttrs([sAttribute], function(values2) {
            let iAttributeValue = parseInt(values2[sAttribute]);
            let iSum = 0;
            let sRollQuery = "&{template:skill} {{name="+sName+"}}";
            
            if (iIsRoleSkill == 1) {
                iSum = iSkillRole + iAttributeValue;
                sRollQuery = sRollQuery + " {{type=role}} {{role-name=: "+sRoleName+"}} {{skillValue="+iSkillRole+"}}";
            } else {
                iSum = iSkillValue + iAttributeValue;
                sRollQuery = sRollQuery + " {{type=actor}} {{skillValue="+iSkillValue+"}}";
            }
            sRollQuery = sRollQuery + " {{skill="+sSkill+"}} {{attribute="+getTranslationByKey(sAttribute)+"}} {{attributeValue="+iAttributeValue+"}} {{target=[["+iSum+"]]}} {{modifier="+getTranslationByKey("modifier")+"}} {{modifierValue=[[?{"+getTranslationByKey("modifier")+"|0}]]}} {{roll1="+sBaseRoll+"}}";
            
            startRoll(sRollQuery, (results) => {						
                finishRoll(results.rollId,{
                    target: getModifiedTarget(results, iSum),
                    roll1: getRollResult(results, iSum),
                });
            });
        });
    });
});

/* Attributssproben */
aActorAttributes.forEach(sAttribute => {
    on(`clicked:attribute-${sAttribute}`, function() {			
        getAttrs(["character_name",sAttribute], function (values){
            let sName = values["character_name"];
            let iAttributeValue = parseInt(values[sAttribute]);
            let iSum = iAttributeValue + 4;	
            
            let sRollQuery = "&{template:attribute} {{name="+sName+"}} {{attribute="+getTranslationByKey(sAttribute)+"}} {{attributeValue="+iAttributeValue+"}} {{target=[["+iSum+"]]}} {{modifier="+getTranslationByKey("modifier")+"}} {{modifierValue=[[?{"+getTranslationByKey("modifier")+"|0}]]}} {{roll1="+sBaseRoll+"}}";
                
            startRoll(sRollQuery, (results) => {					
                finishRoll(results.rollId,{
                    target: getModifiedTarget(results, iSum),
                    roll1: getRollResult(results, iSum),
                });
            });			
        });
    });
});

/* Waffenfertigkeitsproben */
aActorWeaponSkills.forEach(sSkill => {
    on(`clicked:combat-${sSkill}`, function() {			
        let sCombatAttribute = "";
        
        switch (sSkill) {
            case "melee-small":
            case "melee-medium":
            case "melee-big":
            case "melee-misc":
            case "unarmed":
                sCombatAttribute = "melee-attack";
                break;
            default:
                sCombatAttribute = "ranged-attack";
        }
        
        getAttrs(["character_name","role-name","skill-"+sSkill, sCombatAttribute, "skill-"+sSkill+"-is-role-skill", "skill-"+sSkill+"-role"], function (values){
            let sName = values["character_name"];
            let sRoleName = values["role-name"];
            let iAttributeValue = parseInt(values[sCombatAttribute]||0);
            let iSkillValue = parseInt(values["skill-"+sSkill]);
            let iSum = 0;
            let iSkillRole = parseInt(values["skill-"+sSkill+"-role"]);
            let iIsRoleSkill = parseInt(values["skill-" + sSkill + "-is-role-skill"]||0);
            let sRollQuery = "&{template:skill} {{name="+sName+"}}";
            
            if (iIsRoleSkill == 1) {
                iSum = iSkillRole + iAttributeValue;
                sRollQuery = sRollQuery + " {{type=role}} {{role-name=: "+sRoleName+"}} {{skillValue="+iSkillRole+"}}";
            } else {
                iSum = iSkillValue + iAttributeValue;
                sRollQuery = sRollQuery + " {{type=actor}} {{skillValue="+iSkillValue+"}}";
            }					
            sRollQuery = sRollQuery + " {{skill="+getTranslationByKey(sSkill)+"}} {{attribute="+getTranslationByKey(sCombatAttribute)+"}} {{attributeValue="+iAttributeValue+"}} {{target=[["+iSum+"]]}} {{modifier="+getTranslationByKey("modifier")+"}} {{modifierValue=[[?{"+getTranslationByKey("modifier")+"|0}]]}} {{roll1="+sBaseRoll+"}}";
                
            startRoll(sRollQuery, (results) => {					
                finishRoll(results.rollId,{
                    target: getModifiedTarget(results, iSum),
                    roll1: getRollResult(results, iSum),
                });
            });
        });
    });
    
    on(`clicked:combat-${sSkill}-parry`, function() {				
        getAttrs(["character_name","role-name","skill-"+sSkill, "melee-defense", "skill-"+sSkill+"-is-role-skill", "skill-"+sSkill+"-role"], function (values){
            let sName = values["character_name"];
            let sRoleName = values["role-name"];
            let iAttributeValue = parseInt(values["melee-defense"]||0);
            let iSkillValue = parseInt(values["skill-"+sSkill]);
            let iSum = 0;					
            let iSkillRole = parseInt(values["skill-"+sSkill+"-role"]);
            let iIsRoleSkill = parseInt(values["skill-" + sSkill + "-is-role-skill"]||0);
            let sRollQuery = "&{template:skill} {{name="+sName+"}}";
            
            if (iIsRoleSkill == 1) {
                iSum = iSkillRole + iAttributeValue;
                sRollQuery = sRollQuery + " {{type=role}} {{role-name=: "+sRoleName+"}} {{skillValue="+iSkillRole+"}}";
            } else {
                iSum = iSkillValue + iAttributeValue;
                sRollQuery = sRollQuery + " {{type=actor}} {{skillValue="+iSkillValue+"}}";
            }					
            sRollQuery = sRollQuery + " {{skill="+getTranslationByKey(sSkill)+"}} {{attribute="+getTranslationByKey("melee-defense")+"}} {{attributeValue="+iAttributeValue+"}} {{target=[["+iSum+"]]}} {{modifier="+getTranslationByKey("modifier")+"}} {{modifierValue=[[?{"+getTranslationByKey("modifier")+"|0}]]}} {{roll1="+sBaseRoll+"}}";
                
                
            startRoll(sRollQuery, (results) => {					
                finishRoll(results.rollId,{
                    target: getModifiedTarget(results, iSum),
                    roll1: getRollResult(results, iSum),
                });
            });
        });
    });
});

/* Initiative-Wurf */
on("clicked:initiative", function() {			
    getAttrs(["character_name","initiative"], function (values){
        let sName = values["character_name"];
        let iInitiative = parseInt(values["initiative"]);		
        
        let sRollQuery = "&{template:initiative} {{name="+sName+"}} {{initiative="+getTranslationByKey("initiative")+"}} {{roll1=[[1d10+"+iInitiative+"+?{"+getTranslationByKey("modifier")+"|0} &{tracker}]]}}";
            
        startRoll(sRollQuery, (results) => {
            finishRoll(results.rollId);
        });			
    });
});

/* Änderungen an Attributen */
aActorAttributes.forEach(sAttribute => {
    on(`change:${sAttribute}`, function() {
        console.log("[CHANGE] " + sAttribute);
        changedAttribute(sAttribute);
    });
});

/* Änderungen an Skills */
aActorSkills.forEach(sSkill => {
    on(`change:skill-${sSkill}`, function() {
        console.log("[CHANGE] " + sSkill);
        changedSkill(sSkill);
    });
    
    on(`change:skill-${sSkill}-is-role-skill`, function() {
        console.log("[CHANGE] " + sSkill + "is-role-skill");
        changedSkill(sSkill);
    });
});

/* Änderungen an Kampf-Skills */
aActorWeaponSkills.forEach(sSkill => {
    on(`change:skill-${sSkill}`, function() {
        console.log("[CHANGE] " + sSkill);
        changedSkill(sSkill);
    });
    
    on(`change:skill-${sSkill}-is-role-skill`, function() {
        console.log("[CHANGE] " + sSkill + "is-role-skill");
        changedSkill(sSkill);
    });
});

/* Event-Listener -- Ende */	
    
/* Funktionen -- Start */
function recalcValues() {
    console.log("[recalcValues]");
    aActorAttributes.forEach(sAttribute => {
        changedAttribute(sAttribute);
    });
    aActorSkills.forEach(sSkill => {
        changedSkill(sSkill);
    });
    aActorWeaponSkills.forEach(sSkill => {
        changedSkill(sSkill);
    });
}

function changedAttribute(sAttribute) {
    console.log("[changedAttribute] " + sAttribute);
    
    getAttrs([sAttribute], function (values){
        let iAttribute = parseInt(values[sAttribute]||iMinAttributeValue);
        let aAttributes = {};
        
        // Auf Min/Max prüfen
        if (iAttribute < iMinAttributeValue ) {
            iAttribute = iMinAttributeValue;
        } else if (iAttribute > iMaxAttributeValue ) {
            iAttribute = iMaxAttributeValue;
        }
        aAttributes[sAttribute] = iAttribute;
        setAttrs(aAttributes);
        
        switch (sAttribute) {
            case "strength":
                recalcMeleeAttack();
                recalcMeleeDamage();
                recalcMeleeDefense();
                break;
            case "stamina":
                recalcHitpoints();
                break;
            case "dexterity":
                recalcMeleeDefense();
                recalcRangedAttack();
                recalcRangedDamage();
                break;
            case "knowledge":
                //nothing
                break;
            case "coolness":
                recalcInitiative();
                break;
            case "chi":
                recalcMeleeAttack();
                recalcChipoints();
                recalcMeleeDefense();
                recalcRangedAttack();
                break;
            default:
        }			
    });
}

function changedSkill(sSkill) {
    console.log("[changedSkill] " + sSkill);
    
    getAttrs(["skill-" + sSkill,"skill-" + sSkill + "-is-role-skill"], function (values){
        let iSkill = parseInt(values["skill-" + sSkill]||iMinSkillValue);
        let iSkillRole = 0;
        let iIsRoleSkill = parseInt(values["skill-" + sSkill + "-is-role-skill"]||0);
        let aAttributes = {};
        console.log("[changedSkill] isRoleSkill" + iIsRoleSkill);
        
        // Auf Min/Max prüfen
        if (iSkill < iMinSkillValue ) {
            iSkill = iMinSkillValue;
        } else if (iSkill > iMaxSkillValue ) {
            iSkill = iMaxSkillValue;
        }
        
        //Rollenskill berechnen
        if (iIsRoleSkill == 1) {
            switch (iSkill) {
                case 0: case 1: case 2:
                    iSkillRole = 4;
                    break;
                case 3: case 4:
                    iSkillRole = 5;
                    break;
                case 5: case 6: case 7: case 8: case 9:
                    iSkillRole = iSkill+1;
                    break;		
                case 10:
                    iSkillRole = 10;
                    break;					
                default:
                    iSkillRole = 0;
            }			
        } else {
            iSkillRole = 0;
        }
        
        aAttributes["skill-" + sSkill] = iSkill;
        aAttributes["skill-" + sSkill + "-role"] = iSkillRole;
        setAttrs(aAttributes);			
    });
}

function recalcInitiative() {
    console.log("[recalcInitiative]");
    getAttrs(["coolness"], function (values){
        let iCoolness = parseInt(values["coolness"]||0);
        let iInitiative = iCoolness;
        let aAttributes = {};
        
        aAttributes["initiative"] = iInitiative;
        
        setAttrs(aAttributes);		
    });
}

function recalcRolepoints(iPoints,sType) {
    let iRolePoints = 0;
    
    if (sType == "main") {
        iRolePoints = iPoints + 20;
    } else {
        iRolePoints = iPoints + 10;
    }
    
    return iRolePoints;
}

function recalcHitpoints() {
    console.log("[recalcHitpoints]");
    getAttrs(["stamina","role-type"], function (values){
        let iStamina = parseInt(values["stamina"]||0);
        let sRoleType = values["role-type"]||"main";
        let iHitpoints = (iStamina + 4) * 10;
        let iRoleHitpoints = recalcRolepoints(iHitpoints,sRoleType);
        let aAttributes = {};
                    
        aAttributes["hitpoints_max"] = iHitpoints;
        aAttributes["role_hitpoints_max"] = iRoleHitpoints;
        
        setAttrs(aAttributes);		
    });
}

function recalcChipoints() {
    console.log("[recalcChipoints]");
    getAttrs(["chi","role-type"], function (values){
        let iChi = parseInt(values["chi"]||0);
        let sRoleType = values["role-type"]||"main";
        let iChipoints = iChi * 10;
        let iRoleChipoints = recalcRolepoints(iChipoints,sRoleType);
        let aAttributes = {};	
        
        aAttributes["chipoints_max"] = iChipoints;
        aAttributes["role_chipoints_max"] = iRoleChipoints;
        
        setAttrs(aAttributes);		
    });
}

function recalcMeleeAttack() {
    console.log("[recalcMeleeAttack]");
    getAttrs(["chi","strength"], function (values){
        let iChi = parseInt(values["chi"]||0);
        let iStrength = parseInt(values["strength"]||0);
        let iMeleeAttack = Math.round((iStrength * 2 + iChi) / 3);
        let aAttributes = {};
        
        aAttributes["melee-attack"] = iMeleeAttack;
        
        setAttrs(aAttributes);		
    });
}

function recalcMeleeDamage() {
    console.log("[recalcMeleeDamage]");
    getAttrs(["strength"], function (values){
        let iStrength = parseInt(values["strength"]||5);
        let iMeleeDamage = 0;
        let aAttributes = {};
        
        if (iStrength > 5) {
            iMeleeDamage = iStrength - 4;
        }

        aAttributes["melee-damage"] = iMeleeDamage;
        
        setAttrs(aAttributes);	
    });
}

function recalcRangedDamage() {
    console.log("[recalcRangedDamage]");
    getAttrs(["dexterity"], function (values){
        let iDexterity = parseInt(values["dexterity"]||5);
        let iRangedDamage = 0;
        let aAttributes = {};
        
        if (iDexterity > 5) {
            iRangedDamage = iDexterity - 4;
        }

        aAttributes["ranged-damage"] = iRangedDamage;
        
        setAttrs(aAttributes);		
    });
}

function recalcMeleeDefense() {
    console.log("[recalcMeleeDefense]");
    getAttrs(["chi","strength","dexterity"], function (values){
        let iChi = parseInt(values["chi"]||0);
        let iStrength = parseInt(values["strength"]||0);
        let iDexterity = parseInt(values["dexterity"]||0);
        let iMeleeDefense = Math.round((iStrength + iDexterity + iChi) / 3);
        let aAttributes = {};
        
        aAttributes["melee-defense"] = iMeleeDefense;
        
        setAttrs(aAttributes);		
    });
}

function recalcRangedAttack() {
    console.log("[recalcRangedAttack]");
    getAttrs(["chi","dexterity"], function (values){
        let iChi = parseInt(values["chi"]||0);
        let iDexterity = parseInt(values["dexterity"]||0);
        let iRangedAttack = Math.round((iDexterity * 2 + iChi) / 3);
        let aAttributes = {};
        
        aAttributes["ranged-attack"] = iRangedAttack;
        
        setAttrs(aAttributes);		
    });
}	
/* Funktionen -- Ende */

/* Tabs -- Start */
    const buttonlist = ["main","weapons"];
    buttonlist.forEach(button => {
        on(`clicked:${button}`, function() {
            setAttrs({
                sheetTab: button
            });
        });
    });
/* Tabs -- Ende */