/* Use ChatSetAttr mod to set attributes from chat https://github.com/Roll20/roll20-api-scripts/tree/master/ChatSetAttr#readme */

/* Listen for attribute _current changes */
on('change:attribute:current', function(obj, prev) {
    if(obj.get('name') == 'tenacity_current') {
        setTenacity(obj, prev, false);
    }
});
/* Listen for attribute _max changes */
on('change:attribute:max', function(obj, prev) {
    if(obj.get('name') == 'tenacity_current') {
        setTenacity(obj, prev, true);
    }
});

/* When 'tenacity' attribute changes, set new value for every character with common owner */
function setTenacity(obj, prev, isMax) {
    let prevVal, newVal = 0;
    if(isMax){
        prevVal = parseInt(prev.max)||0;
        newVal = parseInt(obj.get('max'))||0;
    }else {
        prevVal = parseInt(prev.current)||0;
        newVal = parseInt(obj.get('current'))||0;
    }
    if(newVal !== prevVal) {
        let targetChars = [];
        let allCharacters = findObjs({
            _type: 'character',
            archived: false
        }, {caseInsensitive: true});
        let originChar = getObj('character', obj.get('_characterid'));
        let originCharName = originChar.get('name');
        let npcOwner = getAttrByName(originChar.id, 'npc_owner');
        let sheetType = getAttrByName(originChar.id, 'sheet_type');
        
        log(`sheet_type = \'${sheetType}\', npc_owner = \'${npcOwner}\'`);
        if(isMax) {
            log(`\'${obj.get('name')}\' (max) of character \'${originCharName}\' changed from ${prevVal} to ${newVal}`);
        }else {
            log(`\'${obj.get('name')}\' of character \'${originCharName}\' changed from ${prevVal} to ${newVal}`);
        }

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
                targetChars.push(npcOwner);
            }
        }
        
        if(Array.isArray(targetChars) && targetChars.length){
            if(isMax){
                log(`!setattr --name ${targetChars} --tenacity_current||${newVal} --silent --nocreate`);
                sendChat('API', `!setattr --name ${targetChars} --tenacity_current||${newVal} --silent --nocreate`, null, {noarchive:true} );
            }else {
                log(`!setattr --name ${targetChars} --tenacity_current|${newVal} --silent --nocreate`);
                sendChat('API', `!setattr --name ${targetChars} --tenacity_current|${newVal} --silent --nocreate`, null, {noarchive:true} );
            }
        }
    }
}