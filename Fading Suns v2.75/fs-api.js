function sendError(who, error) {
    "use strict";

    let message = "&{template:fs-ApiError} {{error=" + error + "}}";
    sendChat(who, message);
}

function d20roll(playerId, who, characterName, bonus_malus, characteristicName, skillName, flag) {
    "use strict";

    // let indexC = character_pipe_characteristicName.indexOf("|");

    // if (indexC === -1) {
    //     sendError(who, "expecting '<characterName>|<characteristic>' as second parameter");
    //     return;
    // }

    // let characterName = character_pipe_characteristicName.substring(0,indexC);
    // let characteristicName = character_pipe_characteristicName.substring(indexC+1);

    let characterSearch = findObjs({
        _type: "character",
        _name: characterName
    });
    
    if (characterSearch.length != 1) {
        sendError(who, "character " + characterName + " not found");
        return;
    }
    let characterId = characterSearch[0].id;

    if (characteristicName == "attr_selected_characteristic") {
        characteristicName = getAttrByName(characterId, characteristicName);
        if (!characteristicName) {
            sendError(who, "characteristic not selected for " + characterName);
            return;
        }
        d20roll(playerId, who, characterName, bonus_malus, characteristicName, skillName);
        return;
    }

    let characteristic = parseInt(getAttrByName(characterId, characteristicName));
    if (isNaN(characteristic)) {
        sendError(who, "characteristic " + characteristicName + " not found for character " + characterName);
    } else {
        let skillNameToSearch;
        let skillName_i18n;
        if (skillName && skillName != "null") {
            
            // use case: repeating section (= player-defined) skill
            let REPEATING_PREFIX = "repeating_";
            if (skillName.startsWith(REPEATING_PREFIX)) {
                let rest = skillName.substring(REPEATING_PREFIX.length);
                let index = rest.indexOf('#');
                if (index == -1) {
                    sendError(who, "could not interpret skill name " + skillName);
                    return;
                }
                let sectionName = rest.substring(0, index);
                skillName_i18n = rest.substring(index+1);
                
                let repeatingAttrs = findObjs({ _characterid: characterId, _type: "attribute" }).filter(function(o) {
                     return o.get('name').startsWith(REPEATING_PREFIX + sectionName) &&
                            o.get('name').endsWith("_name") &&
                            o.get('current') == skillName_i18n;
                });

                if (repeatingAttrs.length != 1) {
                    sendError(who, "skill " + skillName + " not found for character " + characterName);
                    return;
                }
                let repeatingAttrName = repeatingAttrs[0].get('name');
                let indexSuffix = repeatingAttrName.lastIndexOf("_name");
                
                skillNameToSearch = repeatingAttrName.substring(0,indexSuffix) + "_value";
                skillName = skillName_i18n; // they are the same since the player entered it manually
            } else {
                skillNameToSearch = skillName;
                skillName_i18n = "^{" + skillName + "}";
            }
        }

        let skillValStr = !skillNameToSearch ? "0" : getAttrByName(characterId, skillNameToSearch);
        let skill = parseInt(skillValStr);
        if (isNaN(skill)) {
            sendError(who, "skill " + skillName + " not found for character " + characterName);
        } else {
            let goal = characteristic + skill + bonus_malus;
            if (goal < 1) {
              goal = 1;
            }

            let cappedgoal = goal;
            if (goal > 19) {
                cappedgoal = 19;
            }

            let message = "&{template:fs-GoalRoll-fromAPI} {{characterName=" + characterName + "}} {{characteristicName=" + characteristicName + "}} {{characteristicName-i18n=^{" + characteristicName + "}}}" + (skillName != "null" ? " {{skillName=" + skillName + "}} {{skillName-i18n=" + skillName_i18n + "}}" : "") + " {{goal=[[" + characteristic + "+" + skill + "+" + bonus_malus + "]]}} {{cappedgoal=[[" + cappedgoal + "]]}}" + " {{bonus_malus=[[" + bonus_malus + "]]}} {{roll=[[1d20cs" + cappedgoal + "cf20]]}} " + (flag ? " {{" + flag + "=1}}" : 0);
            log ("message = " + message);

            let sendAs;
            if (playerId != characterId) {
                sendAs = "character|" + characterId;
            } else {
                sendAs = who;
            }
            
            sendChat(sendAs, message, null, { use3d: true});
        }
    }
}

function parametersExpected(who, command, params, nb) {
    "use strict";
    
    if (params.length != nb) {
         sendError(who, command + " expects " + nb + " parameters. Found: " + params.length);
         return false;
    }
    return true;
}

on("chat:message", function(msg) {
    "use strict";
    
    // fs_cur_roll
    if (msg.type == "api") {
        if (msg.content.startsWith("!fs_")) {
            log("api command received: " + msg.content);
            
            let params = msg.content.splitArgs(','),
            command = params.shift();
    
            if (command == "!fs_roll" ||
                command == "!fs_critSuccessConfirm" ||
                command == "!fs_critFailureConfirm") {
                if (parametersExpected(msg.who, command, params, 4)) {
                    let characterName = params[0];
                    let bonus_malus_str = params[1];
                    let characteristicName = params[2];
                    let skillName = params[3];
                    
                    let bonus_malus = parseInt(bonus_malus_str);
                    if (isNaN(bonus_malus)) {
                        sendError(msg.who, "could not parse bonus/malus");
                    } else {
                        d20roll(msg.playerid, msg.who, characterName, bonus_malus, characteristicName, skillName, (command != "!fs_roll" ? command.substring(4) : null));
                    }
                }
            } else if (command == "!fs_whoami") {
                sendChat(msg.who, 'Your Player ID is <b>' + msg.playerid + '</b>');
            } else {
                sendError(msg.who, "unknown API command: " + msg.content);
            }
        }
    }
});
