on('chat:message', function(msg) {
    if(msg.type == 'rollresult') {
        log(msg.rolltemplate);
        var rollResult = JSON.parse(msg.content);
        log(rollResult);
        var initValue = rollResult.rolls[0].results.v;
        sendChat("player|"+msg.playerid, "/direct rolled initiative of ");
    }
});