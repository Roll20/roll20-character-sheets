/* Use ChatSetAttr mod to set attributes from chat https://github.com/Roll20/roll20-api-scripts/tree/master/ChatSetAttr#readme */
/* Track attribute _current changes */
on('change:attribute:current', function(obj, prev) {
    let prevVal = prev.current;
    let newVal = parseInt(obj.get('current'));
    if(newVal != prevVal) {
        let targetChars = [];
        let allCharacters = findObjs({
            _type: 'character',
            archived: false
        }, {caseInsensitive: true});
        let originChar = getObj('character', obj.get('_characterid'));
        let originCharName = originChar.get('name');
        let npcOwner = getAttrByName(originChar.id, 'npc_owner');
        let sheetType = getAttrByName(originChar.id, 'sheet_type');
        
        /* In case of tenacity_current attribute, set the same value to every character with common owner */
        if(obj.get('name') == 'tenacity_current') {
            log(`sheet_type = ${sheetType}, npc_owner = ${npcOwner}`);
            log(`\'${obj.get('name')}\' of character \'${originChar.get('name')}\' changed from ${prevVal} to ${newVal}`);
            if(sheetType == 'pc') {
                if(originCharName) {
                    allCharacters.forEach(char => {
                        if(getAttrByName(char.id, 'npc_owner') == originCharName){
                            targetChars.push(char.get('name'));
                        }
                    });
                }
            }else if (sheetType == 'npc') {
                if(npcOwner) {
                    allCharacters.forEach(char => {
                        if(getAttrByName(char.id, 'npc_owner') == npcOwner){
                            targetChars.push(char.get('name'));
                        }
                    });
                    if(findObjs({ type: 'character', name: npcOwner })[0]) {
                        targetChars.push(npcOwner);
                    }
                }
            }
            
            if(Array.isArray(targetChars) && targetChars.length){
                sendChat('API', `!setattr --name ${targetChars} --tenacity_current|${newVal} --silent --nocreate`, null, {noarchive:true} );
                log(`!setattr --name ${targetChars} --tenacity_current|${newVal} --silent --nocreate`);
            }
        }
    }
});

/* Track attribute _max changes */
on('change:attribute:max', function(obj, prev) {
    let prevVal = prev.max;
    let newVal = parseInt(obj.get('max'));
    if(newVal != prevVal) {
        let targetChars = [];
        let allCharacters = findObjs({
            _type: 'character',
            archived: false
        }, {caseInsensitive: true});
        let originChar = getObj('character', obj.get('_characterid'));
        let originCharName = originChar.get('name');
        let npcOwner = getAttrByName(originChar.id, 'npc_owner');
        let sheetType = getAttrByName(originChar.id, 'sheet_type');
        
        /* In case of tenacity_current_max attribute, set the same value to every character with common owner */
        if(obj.get('name') == 'tenacity_current') {
            log(`sheet_type = ${sheetType}, npc_owner = ${npcOwner}`);
            log(`\'${obj.get('name')}\' (max) of character \'${originChar.get('name')}\' changed from ${prevVal} to ${newVal}`);
            if(sheetType == 'pc') {
                if(originCharName) {
                    allCharacters.forEach(char => {
                        if(getAttrByName(char.id, 'npc_owner') == originCharName){
                            targetChars.push(char.get('name'));
                        }
                    });
                }
            }else if (sheetType == 'npc') {
                if(npcOwner) {
                    allCharacters.forEach(char => {
                        if(getAttrByName(char.id, 'npc_owner') == npcOwner){
                            targetChars.push(char.get('name'));
                        }
                    });
                    if(findObjs({ type: 'character', name: npcOwner })[0]) {
                        targetChars.push(npcOwner);
                    }
                }
            }
            
            if(Array.isArray(targetChars) && targetChars.length){
                sendChat('API', `!setattr --name ${targetChars} --tenacity_current||${newVal} --silent --nocreate`, null, {noarchive:true} );
                log(`!setattr --name ${targetChars} --tenacity_current||${newVal} --silent --nocreate`);
            }
        }
    }
});