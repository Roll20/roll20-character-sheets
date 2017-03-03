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

   if (attributeName == "str") {
        setStrBonus(obj.get('_characterid'));
    }
   if (attributeName == "dex") {
        setDexBonus(obj.get('_characterid'));
    }
    if (attributeName == "con") {
        setConBonus(obj.get('_characterid'));
    }
    if (attributeName == "int") {
        setIntBonus(obj.get('_characterid'));
    }
    if (attributeName == "cha") {
        setChaBonus(obj.get('_characterid'));
    }
    if (attributeName == "ep") {
        setLevel(obj.get('_characterid'));
    }
    if (attributeName == "occupacion") {
        setTPclassbon(obj.get('_characterid'));
        setMgEntAttr(obj.get('_characterid'));
        setGezSprAB(obj.get('_characterid'));
        setThiefArm(obj.get('_characterid'));
    }
    if (attributeName == "race") {
        setTPracebon(obj.get('_characterid'));
        setRaceArm(obj.get('_characterid'));
    }
/*    if (attributeName == "dicesystem") {
        setTPcurrent(obj.get('_characterid'));
    }
*/
    if (attributeName == "armorgiven") {
        setNoArm(obj.get('_characterid'));
    }
    
//    if (attributeName == "athletik") {
//        setAthlArm(obj.get('_characterid'));
//    }
/*
    if (attributeName == "repeating_armor_$0_armor_checkbox" 
    || attributeName == "repeating_armor_$1_armor_checkbox" 
    || attributeName == "repeating_armor_$2_armor_checkbox" 
    || attributeName == "repeating_armor_$3_armor_checkbox"
    || attributeName == "repeating_armor_$4_armor_checkbox"
    || attributeName == "repeating_armor_$5_armor_checkbox"
    || attributeName == "repeating_armor_$6_armor_checkbox"
    || attributeName == "repeating_armor_$7_armor_checkbox"
    || attributeName == "repeating_armor_$8_armor_checkbox"
    || attributeName == "repeating_armor_$9_armor_checkbox"
    || attributeName == "repeating_armor_$10_armor_checkbox"
    || attributeName == "repeating_armor_$11_armor_checkbox"
    || attributeName == "repeating_armor_$12_armor_checkbox"
    || attributeName == "repeating_armor_$13_armor_checkbox"
    || attributeName == "repeating_armor_$14_armor_checkbox"
    || attributeName == "repeating_armor_$15_armor_checkbox"
    || attributeName == "repeating_armor_$16_armor_checkbox"
    || attributeName == "repeating_armor_$17_armor_checkbox"
    || attributeName == "repeating_armor_$18_armor_checkbox"
    || attributeName == "repeating_armor_$19_armor_checkbox"
    ) {
        setNoArm(obj.get('_characterid'));
    }
*/
});

// Handle actual changes
on("change:attribute", function(obj) {
    var attributeName = obj.get("name");

   if (attributeName == "str") {
        setStrBonus(obj.get('_characterid'));
    }
   if (attributeName == "dex") {
        setDexBonus(obj.get('_characterid'));
    }
    if (attributeName == "con") {
        setConBonus(obj.get('_characterid'));
    }
    if (attributeName == "int") {
        setIntBonus(obj.get('_characterid'));
    }
    if (attributeName == "cha") {
        setChaBonus(obj.get('_characterid'));
    }
    if (attributeName == "ep") {
        setLevel(obj.get('_characterid'));
    }
    if (attributeName == "occupacion") {
        setTPclassbon(obj.get('_characterid'));
        setMgEntAttr(obj.get('_characterid'));
        setGezSprAB(obj.get('_characterid'));
        setThiefArm(obj.get('_characterid'));
    }
    if (attributeName == "race") {
        setTPracebon(obj.get('_characterid'));
        setRaceArm(obj.get('_characterid'));
    }
    if (attributeName == "dicesystem") {
        setTPcurrent(obj.get('_characterid'));
    }
    if (attributeName == "armorgiven") {
        setNoArm(obj.get('_characterid'));
    }
    
//    if (attributeName == "athletik") {
//        setAthlArm(obj.get('_characterid'));
//    }
    
/*
    if (attributeName == "repeating_armor_$0_armor_checkbox" 
    || attributeName == "repeating_armor_$1_armor_checkbox" 
    || attributeName == "repeating_armor_$2_armor_checkbox" 
    || attributeName == "repeating_armor_$3_armor_checkbox"
    || attributeName == "repeating_armor_$4_armor_checkbox"
    || attributeName == "repeating_armor_$5_armor_checkbox"
    || attributeName == "repeating_armor_$6_armor_checkbox"
    || attributeName == "repeating_armor_$7_armor_checkbox"
    || attributeName == "repeating_armor_$8_armor_checkbox"
    || attributeName == "repeating_armor_$9_armor_checkbox"
    || attributeName == "repeating_armor_$10_armor_checkbox"
    || attributeName == "repeating_armor_$11_armor_checkbox"
    || attributeName == "repeating_armor_$12_armor_checkbox"
    || attributeName == "repeating_armor_$13_armor_checkbox"
    || attributeName == "repeating_armor_$14_armor_checkbox"
    || attributeName == "repeating_armor_$15_armor_checkbox"
    || attributeName == "repeating_armor_$16_armor_checkbox"
    || attributeName == "repeating_armor_$17_armor_checkbox"
    || attributeName == "repeating_armor_$18_armor_checkbox"
    || attributeName == "repeating_armor_$19_armor_checkbox"
    ) {
        setNoArm(obj.get('_characterid'));
    }
*/
});

function setStrBonus(characterID) {
    var strBonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'strbon'})[0];
    if (! strBonus) {
        var strBonus = createObjFix('attribute', {
            name: 'strbon',
            characterid: characterID,
            current: '0'
        });
    }
    var str = parseInt(getAttrByName(characterID, "str"));

    
    if (str >= 14) {
        strBonus.set({current: '+5'});
    } else if (str >= 12) {
        strBonus.set({current: '+4'});
    } else if (str >= 10) {
        strBonus.set({current: '+3'});
    } else if (str >= 8) {
        strBonus.set({current: '+2'});
    } else if (str >= 6) {
        strBonus.set({current: '+1'});
    } else if (str >= 5) {
        strBonus.set({current: '+0'});
    } else if (str >= 3) {
        strBonus.set({current: '-1'});
    } else if (str >= 2) {
        strBonus.set({current: '-2'});
    } else if (str >= 1) {
        strBonus.set({current: '-3'});
    } else {
        strBonus.set({current: 'X'});
    }
}    
    
function setDexBonus(characterID) {
    var dexBonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'dexbon'})[0];
    if (! dexBonus) {
        var dexBonus = createObjFix('attribute', {
            name: 'dexbon',
            characterid: characterID,
            current: '0'
        });
    }
    var dex = parseInt(getAttrByName(characterID, "dex"));
    
    if (dex >= 14) {
        dexBonus.set({current: '+5'});
    } else if (dex >= 12) {
        dexBonus.set({current: '+4'});
    } else if (dex >= 10) {
        dexBonus.set({current: '+3'});
    } else if (dex >= 8) {
        dexBonus.set({current: '+2'});
    } else if (dex >= 6) {
        dexBonus.set({current: '+1'});
    } else if (dex >= 5) {
        dexBonus.set({current: '+0'});
    } else if (dex >= 3) {
        dexBonus.set({current: '-1'});
    } else if (dex >= 2) {
        dexBonus.set({current: '-2'});
    } else if (dex >= 1) {
        dexBonus.set({current: '-3'});
    } else {
        dexBonus.set({current: 'X'});
    }
}
    
function setConBonus(characterID) {
    var conBonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'conbon'})[0];
    if (! conBonus) {
        var conBonus = createObjFix('attribute', {
            name: 'conbon',
            characterid: characterID,
            current: '0'
        });
    }
    var con = parseInt(getAttrByName(characterID, "con"));
    
    if (con >= 14) {
        conBonus.set({current: '+5'});
    } else if (con >= 12) {
        conBonus.set({current: '+4'});
    } else if (con >= 10) {
        conBonus.set({current: '+3'});
    } else if (con >= 8) {
        conBonus.set({current: '+2'});
    } else if (con >= 6) {
        conBonus.set({current: '+1'});
    } else if (con >= 5) {
        conBonus.set({current: '+0'});
    } else if (con >= 3) {
        conBonus.set({current: '-1'});
    } else if (con >= 2) {
        conBonus.set({current: '-2'});
    } else if (con >= 1) {
        conBonus.set({current: '-3'});
    } else {
        conBonus.set({current: 'X'});
    }
}

function setIntBonus(characterID) {   
    var intBonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'intbon'})[0];
    if (! intBonus) {
        var intBonus = createObjFix('attribute', {
            name: 'intbon',
            characterid: characterID,
            current: '0'
        });
    }
    var int = parseInt(getAttrByName(characterID, "int"));
    
        if (int >= 14) {
        intBonus.set({current: '+5'});
    } else if (int >= 12) {
        intBonus.set({current: '+4'});
    } else if (int >= 10) {
        intBonus.set({current: '+3'});
    } else if (int >= 8) {
        intBonus.set({current: '+2'});
    } else if (int >= 6) {
        intBonus.set({current: '+1'});
    } else if (int >= 5) {
        intBonus.set({current: '+0'});
    } else if (int >= 3) {
        intBonus.set({current: '-1'});
    } else if (int >= 2) {
        intBonus.set({current: '-2'});
    } else if (int >= 1) {
        intBonus.set({current: '-3'});
    } else {
        intBonus.set({current: 'X'});
    }
}
    
function setChaBonus(characterID) {    
    var chaBonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'chabon'})[0];
    if (! chaBonus) {
        var chaBonus = createObjFix('attribute', {
            name: 'chabon',
            characterid: characterID,
            current: '0'
        });
    }
    var cha = parseInt(getAttrByName(characterID, "cha"));
    
        if (cha >= 14) {
        chaBonus.set({current: '+5'});
    } else if (cha >= 12) {
        chaBonus.set({current: '+4'});
    } else if (cha >= 10) {
        chaBonus.set({current: '+3'});
    } else if (cha >= 8) {
        chaBonus.set({current: '+2'});
    } else if (cha >= 6) {
        chaBonus.set({current: '+1'});
    } else if (cha >= 5) {
        chaBonus.set({current: '+0'});
    } else if (cha >= 3) {
        chaBonus.set({current: '-1'});
    } else if (cha >= 2) {
        chaBonus.set({current: '-2'});
    } else if (cha >= 1) {
        chaBonus.set({current: '-3'});
    } else {
        chaBonus.set({current: 'X'});
    }
}


function setLevel(characterID) {    
    var Level = findObjs({_type: 'attribute', _characterid: characterID, name: 'lvl'})[0];
    if (! Level) {
        var Level = createObjFix('attribute', {
            name: 'lvl',
            characterid: characterID,
            current: '0'
        });
    }
    var ep = parseInt(getAttrByName(characterID, "ep"));
    
        if (ep >= 208000) {
        Level.set({current: '20 (LC)'});
    } else if (ep >= 188000) {
        Level.set({current: '19'});
    } else if (ep >= 169000) {
        Level.set({current: '18'});
    } else if (ep >= 151000) {
        Level.set({current: '17'});
    } else if (ep >= 134000) {
        Level.set({current: '16'});
    } else if (ep >= 118000) {
        Level.set({current: '15'});
    } else if (ep >= 103000) {
        Level.set({current: '14'});
    } else if (ep >= 89000) {
        Level.set({current: '13'});
    } else if (ep >= 76000) {
        Level.set({current: '12'});
    } else if (ep >= 64000) {
        Level.set({current: '11'});
    } else if (ep >= 53000) {
        Level.set({current: '10'});
    } else if (ep >= 43000) {
        Level.set({current: '9'});
    } else if (ep >= 34000) {
        Level.set({current: '8'});
    } else if (ep >= 26000) {
        Level.set({current: '7'});
    } else if (ep >= 19000) {
        Level.set({current: '6'});
    } else if (ep >= 13000) {
        Level.set({current: '5'});
    } else if (ep >= 8000) {
        Level.set({current: '4'});
    } else if (ep >= 4000) {
        Level.set({current: '3'});
    } else if (ep >= 1000) {
        Level.set({current: '2'});
    } else {
        Level.set({current: '1'});
    }
}

function setTPracebon(characterID) {    
    var Rassenbonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'tpmax_racebon'})[0];
    if (! Rassenbonus) {
        var Rassenbonus = createObjFix('attribute', {
            name: 'tpmax_racebon',
            characterid: characterID,
            current: '0'
        });
    }
    var Volk = parseInt(getAttrByName(characterID, "race"));
    
        if (Volk == 3) {
        Rassenbonus.set({current: '2'});
    } else {
        Rassenbonus.set({current: '0'});
    }
}


function setTPclassbon(characterID) {    
    var Klassenbonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'tpmax_classbon'})[0];
    if (! Klassenbonus) {
        var Klassenbonus = createObjFix('attribute', {
            name: 'tpmax_classbon',
            characterid: characterID,
            current: '0'
        });
    }
    var Beruf = parseInt(getAttrByName(characterID, "occupacion"));
    
        if (Beruf == 3) {
        Klassenbonus.set({current: '10'});
    } else if (Beruf == 4) {
        Klassenbonus.set({current: '8'});
    } else if (Beruf == 6) {
        Klassenbonus.set({current: '8'});
    } else if (Beruf == 7) {
        Klassenbonus.set({current: '4'});
    } else {
        Klassenbonus.set({current: '6'});
    }
}


function setMgEntAttr(characterID) {    
    var MaEntAttrBonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'magie_entwickeln_attrbon'})[0];
    if (! MaEntAttrBonus) {
        var MaEntAttrBonus = createObjFix('attribute', {
            name: 'magie_entwickeln_attrbon',
            characterid: characterID,
            current: '0'
        });
    }
    var Beruf = parseInt(getAttrByName(characterID, "occupacion"));
    
        if (Beruf == 1) {
        MaEntAttrBonus.set({current: '@{chabon}'});
    } else if (Beruf == 4) {
        MaEntAttrBonus.set({current: '@{chabon}'});
    } else if (Beruf == 5) {
        MaEntAttrBonus.set({current: '@{chabon}'});
    } else {
        MaEntAttrBonus.set({current: '@{intbon}'});
    }
}


function setGezSprAB(characterID) {    
    var GezSprAttrBonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'gezielte_sprüche_attrbon'})[0];
    if (! GezSprAttrBonus) {
        var GezSprAttrBonus = createObjFix('attribute', {
            name: 'gezielte_sprüche_attrbon',
            characterid: characterID,
            current: '0'
        });
    }
    var Beruf = parseInt(getAttrByName(characterID, "occupacion"));
    
        if (Beruf == 1) {
        GezSprAttrBonus.set({current: '@{chabon}'});
    } else if (Beruf == 4) {
        GezSprAttrBonus.set({current: '@{chabon}'});
    } else if (Beruf == 5) {
        GezSprAttrBonus.set({current: '@{chabon}'});
    } else {
        GezSprAttrBonus.set({current: '@{intbon}'});
    }
}


function setRaceArm(characterID) {    
    var RaceArmor = findObjs({_type: 'attribute', _characterid: characterID, name: 'armor_racebool'})[0];
    if (! RaceArmor) {
        var RaceArmor = createObjFix('attribute', {
            name: 'armor_racebool',
            characterid: characterID,
            current: '0'
        });
    }
    var Volk = parseInt(getAttrByName(characterID, "race"));
    
        if (Volk >= 3) {
        RaceArmor.set({current: '1'});
        } else {
        RaceArmor.set({current: '0'});
    }
}




function setThiefArm(characterID) {    
    var ThiefArmor = findObjs({_type: 'attribute', _characterid: characterID, name: 'armor_thiefbool'})[0];
    if (! ThiefArmor) {
        var ThiefArmor = createObjFix('attribute', {
            name: 'armor_thiefbool',
            characterid: characterID,
            current: '0'
        });
    }
    var Beruf = parseInt(getAttrByName(characterID, "occupacion"));
    
        if (Beruf == 2) {
        ThiefArmor.set({current: '1'});
        } else {
        ThiefArmor.set({current: '0'});
    }
}

function setNoArm(characterID) {    
    var NoArmor = findObjs({_type: 'attribute', _characterid: characterID, name: 'noarmor_thief'})[0];
    if (! NoArmor) {
        var NoArmor = createObjFix('attribute', {
            name: 'noarmor_thief',
            characterid: characterID,
            current: '0'
        });
    }
    
    
    var getrRüst = parseInt(getAttrByName(characterID, "armorgiven"));   
    
    
        if (getrRüst == 0) {
        NoArmor.set({current: '1'});
        } else {
        NoArmor.set({current: '0'});
    }
}

/*
function setAthlArm(characterID) {    
    var AthlArmor = findObjs({_type: 'attribute', _characterid: characterID, name: 'athletik_bool'})[0];
    if (! AthlArmor) {
        var AthlArmor = createObjFix('attribute', {
            name: 'athletik_bool',
            characterid: characterID,
            current: '0'
        });
    }
    
    
    var aktAthletik = parseInt(getAttrByName(characterID, "athletik"));   
    
    
        if (aktAthletik <= 4) {
        AthlArmor.set({current: '1'});
        } else {
        AthlArmor.set({current: '0'});
    }
}
*/
/*
function setNoArm(characterID) {    
    var NoArmor = findObjs({_type: 'attribute', _characterid: characterID, name: 'noarmor_thief'})[0];
    if (! NoArmor) {
        var NoArmor = createObjFix('attribute', {
            name: 'noarmor_thief',
            characterid: characterID,
            current: '0'
        });
    }
    
    
    var Armor_0_checked = parseInt(getAttrByName(characterID, "repeating_armor_$0_armor_checkbox"));
    var Armor_1_checked = parseInt(getAttrByName(characterID, "repeating_armor_$1_armor_checkbox"));
    var Armor_2_checked = parseInt(getAttrByName(characterID, "repeating_armor_$2_armor_checkbox"));
    var Armor_3_checked = parseInt(getAttrByName(characterID, "repeating_armor_$3_armor_checkbox"));
    var Armor_4_checked = parseInt(getAttrByName(characterID, "repeating_armor_$4_armor_checkbox"));
    var Armor_5_checked = parseInt(getAttrByName(characterID, "repeating_armor_$5_armor_checkbox"));
    var Armor_6_checked = parseInt(getAttrByName(characterID, "repeating_armor_$6_armor_checkbox"));
    var Armor_7_checked = parseInt(getAttrByName(characterID, "repeating_armor_$7_armor_checkbox"));
    var Armor_8_checked = parseInt(getAttrByName(characterID, "repeating_armor_$8_armor_checkbox"));
    var Armor_9_checked = parseInt(getAttrByName(characterID, "repeating_armor_$9_armor_checkbox"));
    var Armor_10_checked = parseInt(getAttrByName(characterID, "repeating_armor_$10_armor_checkbox"));
    var Armor_11_checked = parseInt(getAttrByName(characterID, "repeating_armor_$11_armor_checkbox"));
    var Armor_12_checked = parseInt(getAttrByName(characterID, "repeating_armor_$12_armor_checkbox"));
    var Armor_13_checked = parseInt(getAttrByName(characterID, "repeating_armor_$13_armor_checkbox"));
    var Armor_14_checked = parseInt(getAttrByName(characterID, "repeating_armor_$14_armor_checkbox"));
    var Armor_15_checked = parseInt(getAttrByName(characterID, "repeating_armor_$15_armor_checkbox"));
    var Armor_16_checked = parseInt(getAttrByName(characterID, "repeating_armor_$16_armor_checkbox"));
    var Armor_17_checked = parseInt(getAttrByName(characterID, "repeating_armor_$17_armor_checkbox"));
    var Armor_18_checked = parseInt(getAttrByName(characterID, "repeating_armor_$18_armor_checkbox"));
    var Armor_19_checked = parseInt(getAttrByName(characterID, "repeating_armor_$19_armor_checkbox"));
    
    var Armor_0_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$0_armor_bon"));
    var Armor_1_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$1_armor_bon"));
    var Armor_2_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$2_armor_bon"));
    var Armor_3_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$3_armor_bon"));
    var Armor_4_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$4_armor_bon"));
    var Armor_5_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$5_armor_bon"));
    var Armor_6_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$6_armor_bon"));
    var Armor_7_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$7_armor_bon"));
    var Armor_8_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$8_armor_bon"));
    var Armor_9_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$9_armor_bon"));
    var Armor_10_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$10_armor_bon"));
    var Armor_11_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$11_armor_bon"));
    var Armor_12_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$12_armor_bon"));
    var Armor_13_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$13_armor_bon"));
    var Armor_14_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$14_armor_bon"));
    var Armor_15_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$15_armor_bon"));
    var Armor_16_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$16_armor_bon"));
    var Armor_17_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$17_armor_bon"));
    var Armor_18_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$18_armor_bon"));
    var Armor_19_Bonus = parseInt(getAttrByName(characterID, "repeating_armor_$19_armor_bon"));
    
    var getrRüst = Armor_0_checked*Armor_0_Bonus+Armor_1_checked*Armor_1_Bonus+Armor_2_checked*Armor_2_Bonus+Armor_3_checked*Armor_3_Bonus+Armor_4_checked*Armor_4_Bonus+Armor_5_checked*Armor_5_Bonus+Armor_6_checked*Armor_6_Bonus+Armor_7_checked*Armor_7_Bonus+Armor_8_checked*Armor_8_Bonus+Armor_9_checked*Armor_9_Bonus+Armor_10_checked*Armor_10_Bonus+Armor_11_checked*Armor_11_Bonus+Armor_12_checked*Armor_12_Bonus+Armor_13_checked*Armor_13_Bonus+Armor_14_checked*Armor_14_Bonus+Armor_15_checked*Armor_15_Bonus+Armor_16_checked*Armor_16_Bonus+Armor_17_checked*Armor_17_Bonus+Armor_18_checked*Armor_18_Bonus+Armor_19_checked*Armor_19_Bonus;
    
    
    
    
        if (getrRüst == 0) {
        NoArmor.set({current: '1'});
        } else {
        NoArmor.set({current: '0'});
    }
}
*/

function setTPcurrent(characterID) {    
    var aktTreffer = findObjs({_type: 'attribute', _characterid: characterID, name: 'Trefferpunkte'})[0];
    if (! aktTreffer) {
        var aktTreffer = createObjFix('attribute', {
            name: 'Trefferpunkte',
            characterid: characterID,
            current: '0'
        });
    }
    var WurfSystem = parseInt(getAttrByName(characterID, "dicesystem"));
    var VorTreffer = parseInt(getAttrByName(characterID, "Trefferpunkte"));
    var ABTreffer = VorTreffer/3;
    var RMTreffer = VorTreffer*3;
    
    
        if (WurfSystem == 10) {
        aktTreffer.set({current: ABTreffer});
        } else {
        aktTreffer.set({current: RMTreffer});
    }
}







