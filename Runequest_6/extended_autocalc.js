// Fix buggy issues, thanks Steve D., https://app.roll20.net/forum/post/1462045/help-with-setting-attribute-values
createObjFix = function() {
    //Create Object Fix - Firebase.set failed
        
	var obj = createObj.apply(this, arguments);
    var id = obj.id;
    var characterID = obj.get('characterid');
    var type = obj.get('type');
        
	if (obj && !obj.fbpath && obj.changed) {
        obj.fbpath = obj.changed._fbpath.replace(/([^\/]*\/){4}/, "/");
    } else if (obj && !obj.changed && type == 'attribute') { 
		//fix for dynamic attribute after character created in game
		// /char-attribs/char/characterID/attributeID
        obj.fbpath = '/char-attribs/char/'+ characterID +'/'+ id;	
    }
    return obj;
}

// Addes don't count as changes so we need to handle the first change here
on("add:attribute", function(obj) {
    var attributeName = obj.get("name");
    var attributeNameLastFour = attributeName.slice(-4);
    var attributeNameLastFive = attributeName.slice(-5);

    if (attributeName == "fatigue") {
        setFatigueEffects(obj.get('_characterid'), obj.get('current'));
    }  else if (attributeName == "pow_std" || attributeName == "pow_temp" || attributeName == "cha_std" || attributeName == "cha_temp" || attributeName == "binding_points" || attributeName == "binding_temp" || attributeName == "binding_diff") {
        setSpiritDamage(obj.get('_characterid'));
    }  else if (attributeName == "str_std" || attributeName == "str_temp" || attributeName == "siz_std" || attributeName == "siz_temp") {
        setStdDamageModifier(obj.get('_characterid'));
    } else if (attributeNameLastFour == '_enc' || attributeNameLastFive == '_qnty') {
        setLoadEffects(obj.get('_characterid'));
    }
});

// Handle all other changes to key values
on("change:attribute", function(obj) {
    var attributeName = obj.get("name");
    var attributeNameLastFour = attributeName.slice(-4);
    var attributeNameLastFive = attributeName.slice(-5);

    if (attributeName == "fatigue") {
        setFatigueEffects(obj.get('_characterid'), obj.get('current'));
    }  else if (attributeName == "pow_std" || attributeName == "pow_temp" || attributeName == "cha_std" || attributeName == "cha_temp" || attributeName == "binding_points" || attributeName == "binding_temp" || attributeName == "binding_diff") {
        setSpiritDamage(obj.get('_characterid'));
    }  else if (attributeName == "str_std" || attributeName == "str_temp" || attributeName == "siz_std" || attributeName == "siz_temp") {
        setStdDamageModifier(obj.get('_characterid'));
    } else if (attributeNameLastFour == '_enc' || attributeNameLastFive == '_qnty') {
        setLoadEffects(obj.get('_characterid'));
    }
});

function setLoadEffects(characterID) {
    var encSkillMod = findObjs({_type: 'attribute', _characterid: characterID, name: 'enc_skill_mod'})[0];
    if (! encSkillMod) {
        var encSkillMod = createObjFix('attribute', {
            name: 'enc_skill_mod',
            characterid: characterID,
            current: 'Standard'
        });
    }
    
    var encMoveRateMod = findObjs({_type: 'attribute', _characterid: characterID, name: 'enc_move_rate_mod'})[0];
    if (! encMoveRateMod) {
        var encMoveRateMod = createObjFix('attribute', {
            name: 'enc_move_rate_mod',
            characterid: characterID,
            current: '-0'
        });
    }
    
    var encCarryingLoad = findObjs({_type: 'attribute', _characterid: characterID, name: 'enc_carrying_load'})[0];
    if (! encCarryingLoad) {
        var encCarryingLoad = createObjFix('attribute', {
            name: 'enc_carrying_load',
            characterid: characterID,
            current: 'Light'
        });
    }
    
    var encTotal = 0;
    
    // Add up hit location enc
    for (i = 1; i <= 11; i++) {
        iValue = parseInt(getAttrByName(characterID, "hitloc"+i+"_enc"));
        encTotal = encTotal + iValue;
    }
    
    // Add shield enc
    encTotal = encTotal + parseInt(getAttrByName(characterID, "shield_enc"));
    
    // Add up weapon enc
    for (i = 1; i <= 8; i++) {
        iValue = parseInt(getAttrByName(characterID, "weapon"+i+"_enc"));
        encTotal = encTotal + iValue;
    }
    
    // Add up item enc
    for (i = 1; i <= 20; i++) {
        iValue = parseInt(getAttrByName(characterID, "item"+i+"_enc")) * parseInt(getAttrByName(characterID, "item"+i+"_qnty"));
        encTotal = encTotal + iValue;
    }
    
    var strStd = parseInt(getAttrByName(characterID, "str_std"));
    var strTemp = parseInt(getAttrByName(characterID, "str_temp"));
    var str = strStd + strTemp;
    var encBurdened =  str * 2;
    var encOverloaded =  str * 3;
    var encMax =  str * 4;
    
    if (encTotal >= encMax) {
        encSkillMod.set({current: 'Impossible'});
        encMoveRateMod.set({current: '*0'});
        encCarryingLoad.set({current: 'Too Much'});
    } else if (encTotal >= encOverloaded) {
        encSkillMod.set({current: '2 Grades Harder'});
        encMoveRateMod.set({current: '*.5'});
        encCarryingLoad.set({current: 'Strenuous'});
    } else if (encTotal >= encBurdened) {
        encSkillMod.set({current: '1 Grade Harder'});
        encMoveRateMod.set({current: '-2'});
        encCarryingLoad.set({current: 'Medium'});
    } else {
        encSkillMod.set({current: 'Standard'});
        encMoveRateMod.set({current: '-0'});
        encCarryingLoad.set({current: 'Light'});
    }
}

function setFatigueEffects(characterID, currentFatigueValue) {
    var fatigueSkillGrade = findObjs({_type: 'attribute', _characterid: characterID, name: 'fatigue_skillgrade'})[0];
    if (! fatigueSkillGrade) {
        var fatigueSkillGrade = createObjFix('attribute', {
            name: 'fatigue_skillgrade',
            characterid: characterID,
            current: 'Standard'
        });
    }
    
    var fatigueMovement = findObjs({_type: 'attribute', _characterid: characterID, name: 'fatigue_movement'})[0];
    if (! fatigueMovement) {
        var fatigueMovement = createObjFix('attribute', {
            name: 'fatigue_movement',
            characterid: characterID,
            current: '+0'
        });
    }
    
    var fatigueStrikeRank = findObjs({_type: 'attribute', _characterid: characterID, name: 'fatigue_strike_rank'})[0];
    if (! fatigueStrikeRank) {
        var fatigueStrikeRank = createObjFix('attribute', {
            name: 'fatigue_strike_rank',
            characterid: characterID,
            current: '0'
        });
    }
    
    var fatigueActionPoints = findObjs({_type: 'attribute', _characterid: characterID, name: 'fatigue_action_points'})[0];
    if (! fatigueActionPoints) {
        var fatigueActionPoints = createObjFix('attribute', {
            name: 'fatigue_action_points',
            characterid: characterID,
            current: '+0'
        });
    }
    
    var fatigueRecoveryPeroid = findObjs({_type: 'attribute', _characterid: characterID, name: 'fatigue_recovery_peroid'})[0];
    if (! fatigueRecoveryPeroid) {
        var fatigueRecoveryPeroid = createObjFix('attribute', {
            name: 'fatigue_recovery_peroid',
            characterid: characterID,
            current: '0'
        });
    }
    
    if (currentFatigueValue == 'Fresh') {
        fatigueSkillGrade.set({current: 'Standard'});
        fatigueMovement.set({current: '+0'});
        fatigueStrikeRank.set({current: '0'});
        fatigueActionPoints.set({current: '+0'});
        fatigueRecoveryPeroid.set({current: '0'});
    } else if (currentFatigueValue == 'Winded') {
        fatigueSkillGrade.set({current: 'Hard'});
        fatigueMovement.set({current: '+0'});
        fatigueStrikeRank.set({current: '0'});
        fatigueActionPoints.set({current: '+0'});
        fatigueRecoveryPeroid.set({current: '.25'});
    } else if (currentFatigueValue == 'Tired') {
        fatigueSkillGrade.set({current: 'Hard'});
        fatigueMovement.set({current: '-1'});
        fatigueStrikeRank.set({current: '0'});
        fatigueActionPoints.set({current: '+0'});
        fatigueRecoveryPeroid.set({current: '3'});
    } else if (currentFatigueValue == 'Wearied') {
        fatigueSkillGrade.set({current: 'Formidable'});
        fatigueMovement.set({current: '-2'});
        fatigueStrikeRank.set({current: '-2'});
        fatigueActionPoints.set({current: '+0'});
        fatigueRecoveryPeroid.set({current: '6'});
    } else if (currentFatigueValue == 'Exhausted') {
        fatigueSkillGrade.set({current: 'Formidable'});
        fatigueMovement.set({current: '*.5'});
        fatigueStrikeRank.set({current: '-4'});
        fatigueActionPoints.set({current: '-1'});
        fatigueRecoveryPeroid.set({current: '12'});
    } else if (currentFatigueValue == 'Debilitated') {
        fatigueSkillGrade.set({current: 'Herculean'});
        fatigueMovement.set({current: '*.5'});
        fatigueStrikeRank.set({current: '-6'});
        fatigueActionPoints.set({current: '-2'});
        fatigueRecoveryPeroid.set({current: '18'});
    } else if (currentFatigueValue == 'Incapacitated') {
        fatigueSkillGrade.set({current: 'Herculean'});
        fatigueMovement.set({current: '*0'});
        fatigueStrikeRank.set({current: '-8'});
        fatigueActionPoints.set({current: '-3'});
        fatigueRecoveryPeroid.set({current: '24'});
    } else if (currentFatigueValue == 'Semi-Conscious') {
        fatigueSkillGrade.set({current: 'Hopeless'});
        fatigueMovement.set({current: '*0'});
        fatigueStrikeRank.set({current: '-99'});
        fatigueActionPoints.set({current: '*0'});
        fatigueRecoveryPeroid.set({current: '36'});
    } else if (currentFatigueValue == 'Comatose') {
        fatigueSkillGrade.set({current: 'No activity possible'});
        fatigueMovement.set({current: '*0'});
        fatigueStrikeRank.set({current: '-99'});
        fatigueActionPoints.set({current: '*0'});
        fatigueRecoveryPeroid.set({current: '48'});
    } else if (currentFatigueValue == 'Dead') {
        fatigueSkillGrade.set({current: 'Dead'});
        fatigueMovement.set({current: '*0'});
        fatigueStrikeRank.set({current: '-99'});
        fatigueActionPoints.set({current: '*0'});
        fatigueRecoveryPeroid.set({current: 'Never'});
    } else {
        log("Unknown value for fatigue, setting effects to default values.");
        fatigueSkillGrade.set({current: 'Standard'});
        fatigueMovement.set({current: '+0'});
        fatigueStrikeRank.set({current: '0'});
        fatigueActionPoints.set({current: '+0'});
        fatigueRecoveryPeroid.set({current: '0'});
    }
}

function setSpiritDamage(characterID) {
    var spiritDamage = findObjs({_type: 'attribute', _characterid: characterID, name: 'spirit_damage'})[0];
    if (! spiritDamage) {
        var spiritDamage = createObjFix('attribute', {
            name: 'spirit_damage',
            characterid: characterID,
            current: '1d2'
        });
    }
    
    var bindingDiff = findObjs({_type: 'attribute', _characterid: characterID, name: 'binding_diff'})[0];
    if (! bindingDiff) {
        var bindingDiff = createObjFix('attribute', {
            name: 'binding_diff',
            characterid: characterID,
            current: '1'
        });
    }
    
    var powStd = parseInt(getAttrByName(characterID, "pow_std"));
    var powTemp = parseInt(getAttrByName(characterID, "pow_temp"));
    var chaStd = parseInt(getAttrByName(characterID, "cha_std"));
    var chaTemp = parseInt(getAttrByName(characterID, "cha_temp"));
    var bindingPoints = parseInt(getAttrByName(characterID, "binding_points"));
    var bindingTemp = parseInt(getAttrByName(characterID, "binding_temp"));
    var bindingDiff = parseFloat(getAttrByName(characterID, "binding_diff"));
    var bindingTotal = Math.round((powStd + powTemp + chaStd + chaTemp + bindingPoints + bindingTemp) * bindingDiff);
    
    if (bindingTotal >= 301) {
        spiritDamage.set({current: '2d10+2d6'});
    } else if (bindingTotal >= 281) {
        spiritDamage.set({current: '3d10'});
    } else if (bindingTotal >= 261) {
        spiritDamage.set({current: '2d10+1d8'});
    } else if (bindingTotal >= 241) {
        spiritDamage.set({current: '2d10+1d6'});
    } else if (bindingTotal >= 221) {
        spiritDamage.set({current: '2d10+1d4'});
    } else if (bindingTotal >= 201) {
        spiritDamage.set({current: '2d10+1d2'});
    } else if (bindingTotal >= 181) {
        spiritDamage.set({current: '2d10'});
    } else if (bindingTotal >= 161) {
        spiritDamage.set({current: '1d10+1d8'});
    } else if (bindingTotal >= 141) {
        spiritDamage.set({current: '2d8'});
    } else if (bindingTotal >= 121) {
        spiritDamage.set({current: '1d8+1d6'});
    } else if (bindingTotal >= 101) {
        spiritDamage.set({current: '2d6'});
    } else if (bindingTotal >= 81) {
        spiritDamage.set({current: '1d10'});
    } else if (bindingTotal >= 61) {
        spiritDamage.set({current: '1d8'});
    } else if (bindingTotal >= 41) {
        spiritDamage.set({current: '1d6'});
    } else if (bindingTotal >= 21) {
        spiritDamage.set({current: '1d4'});
    } else {
        spiritDamage.set({current: '1d2'});
    }
}

function setStdDamageModifier(characterID) {
    var stdDamageModifier = findObjs({_type: 'attribute', _characterid: characterID, name: 'damage_mod_std'})[0];
    if (! stdDamageModifier) {
        var stdDamageModifier = createObjFix('attribute', {
            name: 'damage_mod_std',
            characterid: characterID,
            current: '0'
        });
    }
    
    var strStd = parseInt(getAttrByName(characterID, "str_std"));
    var strTemp = parseInt(getAttrByName(characterID, "str_temp"));
    var sizStd = parseInt(getAttrByName(characterID, "siz_std"));
    var sizTemp = parseInt(getAttrByName(characterID, "siz_temp"));
    var total = strStd + strTemp + sizStd + sizTemp;
    
    if (total >= 171) {
        stdDamageModifier.set({current: '2d10+2d6'});
    } else if (total >= 161) {
        stdDamageModifier.set({current: '2d10+1d12'});
    }  else if (total >= 151) {
        stdDamageModifier.set({current: '3d10'});
    } else if (total >= 141) {
        stdDamageModifier.set({current: '2d10+1d8'});
    } else if (total >= 131) {
        stdDamageModifier.set({current: '2d10+1d6'});
    } else if (total >= 121) {
        stdDamageModifier.set({current: '2d10+1d4'});
    } else if (total >= 111) {
        stdDamageModifier.set({current: '2d10+1d2'});
    } else if (total >= 101) {
        stdDamageModifier.set({current: '2d10'});
    } else if (total >= 91) {
        stdDamageModifier.set({current: '1d10+1d8'});
    } else if (total >= 81) {
        stdDamageModifier.set({current: '2d8'});
    } else if (total >= 71) {
        stdDamageModifier.set({current: '1d8+1d6'});
    } else if (total >= 61) {
        stdDamageModifier.set({current: '2d6'});
    } else if (total >= 51) {
        stdDamageModifier.set({current: '1d12'});
    } else if (total >= 46) {
        stdDamageModifier.set({current: '1d10'});
    } else if (total >= 41) {
        stdDamageModifier.set({current: '1d8'});
    } else if (total >= 36) {
        stdDamageModifier.set({current: '1d6'});
    } else if (total >= 31) {
        stdDamageModifier.set({current: '1d4'});
    } else if (total >= 26) {
        stdDamageModifier.set({current: '1d2'});
    } else if (total >= 21) {
        stdDamageModifier.set({current: '0'});
    } else if (total >= 16) {
        stdDamageModifier.set({current: '-1d2'});
    } else if (total >= 11) {
        stdDamageModifier.set({current: '-1d4'});
    } else if (total >= 6) {
        stdDamageModifier.set({current: '-1d6'});
    } else {
        stdDamageModifier.set({current: '-1d8'});
    }
}
