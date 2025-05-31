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

   if (attributeName == "str" || attributeName == "siz") {
        setDamageBonusAndBuild(obj.get('_characterid'));
    }
});

// Handle actual changes
on("change:attribute", function(obj) {
    var attributeName = obj.get("name");

   if (attributeName == "str" || attributeName == "siz") {
        setDamageBonusAndBuild(obj.get('_characterid'));
    }
});

function setDamageBonusAndBuild(characterID) {
    var damageBonus = findObjs({_type: 'attribute', _characterid: characterID, name: 'damage_bonus'})[0];
    if (! damageBonus) {
        var damageBonus = createObjFix('attribute', {
            name: 'damage_bonus',
            characterid: characterID,
            current: '0'
        });
    }
    
    var build = findObjs({_type: 'attribute', _characterid: characterID, name: 'build'})[0];
    if (! build) {
        var build = createObjFix('attribute', {
            name: 'build',
            characterid: characterID,
            current: '0'
        });
    }
    
    var str = parseInt(getAttrByName(characterID, "str"));
    var siz = parseInt(getAttrByName(characterID, "siz"));
    var total = str + siz;
    
    
    if (total >= 525) {
        damageBonus.set({current: '10d6'});
        build.set({current: '+11'});
    } else if (total >= 485) {
        damageBonus.set({current: '9d6'});
        build.set({current: '+10'});
    } else if (total >= 445) {
        damageBonus.set({current: '8d6'});
        build.set({current: '+9'});
    } else if (total >= 405) {
        damageBonus.set({current: '7d6'});
        build.set({current: '+8'});
    } else if (total >= 365) {
        damageBonus.set({current: '6d6'});
        build.set({current: '+7'});
    } else if (total >= 325) {
        damageBonus.set({current: '5d6'});
        build.set({current: '+6'});
    } else if (total >= 285) {
        damageBonus.set({current: '4d6'});
        build.set({current: '+5'});
    } else if (total >= 245) {
        damageBonus.set({current: '3d6'});
        build.set({current: '+4'});
    } else if (total >= 205) {
        damageBonus.set({current: '2d6'});
        build.set({current: '+3'});
    } else if (total >= 165) {
        damageBonus.set({current: '1d6'});
        build.set({current: '+2'});
    } else if (total >= 125) {
        damageBonus.set({current: '1d4'});
        build.set({current: '+1'});
    } else if (total >= 85) {
        damageBonus.set({current: '0'});
        build.set({current: '0'});
    } else if (total >= 65) {
        damageBonus.set({current: '-2'});
        build.set({current: '-1'});
    } else {
        damageBonus.set({current: '-1'});
        build.set({current: '-2'});
    }
}
