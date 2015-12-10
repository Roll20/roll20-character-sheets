// Github:   https://github.com/shdwjk/Roll20API/blob/master/IsGM/IsGMModule.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron

var IsGMModule = IsGMModule || {
    version: 0.6,
    active: true,
    reset_password: "swordfish",
    
    CheckInstall: function() {
        var players = findObjs({_type:"player"});

        if( ! _.has(state,'IsGM') || ! _.has(state.IsGM,'version') || state.IsGM.version != IsGMModule.version )
        {
            state.IsGM={
                version: IsGMModule.version,
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
        IsGMModule.active = (state.IsGM.unknown.length>0);
    },
    IsGM: function(id) {
        return _.contains(state.IsGM.gms,id);
    },
    HandleMessages: function(msg)
    {
        if(msg.type != "api")
        {
            if(IsGMModule.active && msg.playerid != 'API')
            {
                if(_.contains(state.IsGM.unknown, msg.playerid))
                {
                    var player=getObj('player',msg.playerid);
                    if("" == player.get('speakingas') || 'player|'+msg.playerid == player.get('speakingas'))
                    {
                        if(msg.who == player.get('_displayname'))
                        {
                            state.IsGM.players.push(msg.playerid);
                        }
                        else
                        {
                            state.IsGM.gms.push(msg.playerid);
                            sendChat('IsGM','/w gm '+player.get('_displayname')+' is now flagged as a GM.')
                        }
                        state.IsGM.unknown=_.without(state.IsGM.unknown,msg.playerid);
                        IsGMModule.active = (state.IsGM.unknown.length>0);
                    }
                }
            }
        }
        else
        {
            var tokenized = msg.content.split(" ");
            var command = tokenized[0];
            switch(command)
            {
                case '!reset-isgm':
                    if(isGM(msg.playerid) || (tokenized.length>1 && tokenized[1] == IsGMModule.reset_password))
                    {
                        delete state.IsGM;
                        IsGMModule.CheckInstall();
                        sendChat('IsGM','/w gm IsGM data reset.');
                    }
                    else
                    {
                        var who=getObj('player',msg.playerid).get('_displayname').split(' ')[0];
                        sendChat('IsGM','/w '+who+' ('+who+')Only GMs may reset the IsGM data.'
                        +'If you are a GM you can reset by specifying the reset password from'
                        +'the top of the IsGM script as an argument to !reset-isgm')
                    }
                    break;
            }
        }
    },
    RegisterEventHandlers: function(){
        on('chat:message',IsGMModule.HandleMessages);
    },
    
};

on('ready',function(){
    IsGMModule.CheckInstall();
    IsGMModule.RegisterEventHandlers();
});
      
var isGM = isGM || function(id) {
    return IsGMModule.IsGM(id);
};
      