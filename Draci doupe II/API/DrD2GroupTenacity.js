/* Use ChatSetAttr mod to set attributes from chat https://github.com/Roll20/roll20-api-scripts/tree/master/ChatSetAttr#readme */

/* Listen for attribute _current changes */
on('change:attribute:current', function(obj, prev) {
    if(obj.get('name') === 'tenacity_current') {
        setTenacity(obj, prev, false);
    }
});
/* Listen for attribute _max changes */
on('change:attribute:max', function(obj, prev) {
    if(obj.get('name') === 'tenacity_current') {
        setTenacity(obj, prev, true);
    }
});

/* When 'tenacity' attribute of NPC or PC changes, update this value in all sheets connected by 'npc_owner') */
function setTenacity(obj, prev, isMax) {
    var prevVal, newVal = 0;
    if(isMax){
        prevVal = parseInt(prev.max)||0;
        newVal = parseInt(obj.get('max'))||0;
    }else {
        prevVal = parseInt(prev.current)||0;
        newVal = parseInt(obj.get('current'))||0;
    }
    if(newVal !== prevVal) {
        var targetChars = [];
        var allCharacters = findObjs({
            _type: 'character',
            archived: false
        }, {caseInsensitive: true});
        var originChar = getObj('character', obj.get('_characterid'));
        var originCharName = originChar.get('name');
        var sheetType = getAttrByName(originChar.id, 'sheet_type');
        var npcOwner = getAttrByName(originChar.id, 'npc_owner');
        
        log(`sheet_type = \'${sheetType}\', npc_owner = \'${npcOwner}\'`);
        if(isMax) {
            log(`\'${obj.get('name')}\' (max) of character \'${originCharName}\' changed from ${prevVal} to ${newVal}`);
        }else {
            log(`\'${obj.get('name')}\' of character \'${originCharName}\' changed from ${prevVal} to ${newVal}`);
        }

        if((sheetType === 'pc') && originCharName) {
            /* If PC, add ID of every character owned by this PC to array */
            allCharacters.forEach(char => {
                if(getAttrByName(char.id, 'npc_owner') === originCharName){
                    targetChars.push(char.id);
                }
            });
        }else if ((sheetType === 'npc') && npcOwner) {
            /* If NPC, add ID of every character with same owner to array */
            allCharacters.forEach(char => {
                if(getAttrByName(char.id, 'npc_owner') === npcOwner){
                    targetChars.push(char.id);
                }
            });
            /* 
             * If character sheet with same name as 'npc_owner' exists, add its ID to array
             * If there are multiple sheets with the same name, add their IDs too just in case
             */
            _.each(allCharacters, function(obj) {
                if(obj.get('name') === npcOwner) {
                    targetChars.push(obj.id);
                }
            });
        }
        
        if(Array.isArray(targetChars) && targetChars.length){
            if(isMax){
                log(`!setattr --charid ${targetChars} --tenacity_current||${newVal} --silent --nocreate`);
                sendChat('API', `!setattr --charid ${targetChars} --tenacity_current||${newVal} --silent --nocreate`, null, {noarchive:true} );
            }else {
                log(`!setattr --charid ${targetChars} --tenacity_current|${newVal} --silent --nocreate`);
                sendChat('API', `!setattr --charid ${targetChars} --tenacity_current|${newVal} --silent --nocreate`, null, {noarchive:true} );
            }
        }
    }
}