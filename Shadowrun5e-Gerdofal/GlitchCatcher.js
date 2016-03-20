on('chat:message', function (msg) {
    
    if((msg.type == 'general' && (msg.rolltemplate == 'sr1' || msg.rolltemplate == 'sr2')) || msg.type == 'rollresult') { //todo JSON.parse(msg.content) to get the rollresult obj
        //log(msg);
        
        if(msg.type == 'rollresult') {
            var rollResult = JSON.parse(msg.content);
            //log(rollResult);
            var poolSize = rollResult.rolls[0].dice;
            var dice = rollResult.rolls[0].results;
        } else {
            //log(msg.inlinerolls);
            var poolSize = msg.inlinerolls[1].results.rolls[0].dice;
            var dice = msg.inlinerolls[1].results.rolls[0].results;
        }
        //log(poolSize + " dice rolled");
        //log(dice);
        if(poolSize == null || poolSize <= 1) {
            return;
        }
        var oneCount = 0;
        var hitCount = 0;
        var i = 0;
        var r;
        
        
        for(i=0; i<dice.length; i++) {
            if(dice[i].v == 1) {
                oneCount++;
            }
            if(dice[i].v == 5 || dice[i].v == 6) {
                hitCount++;
            }
        }
        log(msg.who + " rolled " + oneCount +" out of " + poolSize);
        if(oneCount > poolSize/2 && hitCount == 0) {
            //log(msg.who + " critically glitched");
            sendChat("player|"+msg.playerid, "/direct <big><strong>CRIT GLITCH!</strong></big>");
        } else if(oneCount > poolSize/2){
            //log(msg.who + " glitched");
            sendChat("player|"+msg.playerid, "/direct <big><strong>GLITCH!</strong></big>");
        }
    }
    
});