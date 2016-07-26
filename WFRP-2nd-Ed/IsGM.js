// Github:   https://github.com/shdwjk/Roll20API/blob/master/IsGM/IsGM.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron

var IsGMModule = IsGMModule || (function() {
    'use strict';

    var version = 0.7,
        schemaVersion = 0.6,
        active = true,
        reset_password = "swordfish",
        hasPlayerIsGM = ("undefined" !== typeof playerIsGM && _.isFunction(playerIsGM)),

    checkInstall = function() {
        var players = findObjs({_type:"player"});

        if( ! _.has(state,'IsGM') || ! _.has(state.IsGM,'version') || state.IsGM.version !== schemaVersion ) {
            state.IsGM={
                version: schemaVersion,
                gms: [],
                players: [],
                unknown: []                
            };
        }
        state.IsGM.unknown=_.difference(
            _.pluck(players,'id'),
            state.IsGM.gms,
            state.IsGM.players
        );
        active = (state.IsGM.unknown.length>0);
    },

    isGM = (hasPlayerIsGM ? playerIsGM : function(id) {
        return _.contains(state.IsGM.gms,id);
    }),

    handleMessages = function(msg) {
        var player, tokenized, who;

        if(msg.type !== "api") {
            if(active && msg.playerid !== 'API') {
                if(_.contains(state.IsGM.unknown, msg.playerid)) {
                    player=getObj('player',msg.playerid);

                    if("" === player.get('speakingas') || 'player|'+msg.playerid === player.get('speakingas')) {
                        if(msg.who === player.get('_displayname')) {
                            state.IsGM.players.push(msg.playerid);
                        } else {
                            state.IsGM.gms.push(msg.playerid);
                            sendChat('IsGM','/w gm '+player.get('_displayname')+' is now flagged as a GM.');
                        }
                        state.IsGM.unknown=_.without(state.IsGM.unknown,msg.playerid);
                        active = (state.IsGM.unknown.length>0);
                    }
                }
            }
        } else {
            tokenized = msg.content.split(/\s+/);

            switch(tokenized[0]) {
                case '!reset-isgm':
                    if(isGM(msg.playerid) || (tokenized.length>1 && tokenized[1] === reset_password)) {
                        delete state.IsGM;
                        checkInstall();
                        sendChat('IsGM','/w gm IsGM data reset.');
                    } else {
                        who=getObj('player',msg.playerid).get('_displayname').split(' ')[0];
                        sendChat('IsGM','/w '+who+' ('+who+')Only GMs may reset the IsGM data.'
                        +'If you are a GM you can reset by specifying the reset password from'
                        +'the top of the IsGM script as an argument to !reset-isgm');
                    }
                    break;
            }
        }
    },

    registerEventHandlers = function() {
        if(! hasPlayerIsGM ) {
            on('chat:message',handleMessages);
        }
    };

    return {
       CheckInstall: checkInstall,
       RegisterEventHandlers: registerEventHandlers,
       IsGM: isGM
    };
}());

on('ready',function() {
    'use strict';

    IsGMModule.CheckInstall();
    IsGMModule.RegisterEventHandlers();
});
      
var isGM = isGM || IsGMModule.IsGM;
      