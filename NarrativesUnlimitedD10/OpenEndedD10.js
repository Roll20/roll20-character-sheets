/* Openended D10 roll script
This script attempts to check for any openended rolls and provide a calculated openended roll.
*/
on("chat:message", function(msg) {
    if (msg.type == 'rollresult' || msg.type == 'gmrollresult') {
        var content = JSON.parse(msg.content);
        var userwho = msg.who;
        var total = content.total -10;
        log(total);
        if (content.rolls[0].results[0]['v'] == 10) {
            sendChat(msg.who,'<large><b>Open Ended Roll...</b></large>')
            rerolls = 0;
            finalroll = 0;
            while (rerolls < 4 && finalroll == 0) {
                rerolls++;
                roll = randomInteger(10);
                if (roll !== 10){
                    finalroll = roll;
                }
            }
            sendChat(msg.who, '<i>' + rerolls + ' aditional rolls<br>final roll of ' + finalroll +'</i><br/>')
            if (isEven(finalroll)) {
                finalresult = 10 + (rerolls * 10) + finalroll;
                log(finalresult);
            }
            else
            {
                finalresult = 0 - ((rerolls -1) *10) - finalroll;
            }
            
            sendChat(userwho, 'The roll had a value of <huge><b>' + finalresult + '</huge></b>')
            overall = finalresult + total;
            sendChat(userwho, 'for a net roll of <huge><b>' + overall + '</huge></b>')
            
        }
    }
    function isEven(n) {
        return n == parseFloat(n)? !(n%2) : void 0;
    }
});
