/* Openended D10 roll script
This script attempts to check for any openended rolls and provide a calculated openended roll.
*/
on("chat:message", function(msg) {
	if (msg.type == 'rollresult' || msg.type == 'gmrollresult') {
		var content = JSON.parse(msg.content);
		var userwho = msg.who;
		var diesides = content.rolls[0].sides;
		if (diesides !== 10) {
			return;
		}
		var total = content.total - 10;
		if (total < 1) {
			total = 0;
		}
		var finalresult = 0;
		if (content.rolls[0].results[0]['v'] == 10) {
			var rerolls = 0;
			var finalroll = 0;
			while (rerolls < 4 && finalroll == 0) {
				rerolls++;
				roll = randomInteger(10);
				if (roll !== 10) {
					finalroll = roll;
				}
				if (rerolls == 4) {
					finalroll = roll;
				}
			}
			if (isEven(finalroll)) {
				finalresult = 10 + ((rerolls -1) * 10) + finalroll;
			}
			else
			{
				finalresult = 0 - ((rerolls -1) *10) - finalroll;
			}
			var overall = finalresult + total;
			sendChat(userwho, '<large><b>Open Ended Roll...</b></large> <i>' + rerolls + ' aditional rolls with a final roll of ' + finalroll +'.</i><br/>  The roll had a value of <huge><b>' + finalresult + '</huge></b> for a net roll of <huge><b>' + overall + '</huge></b>')
		}
	}
	function isEven(n) {
		return n == parseFloat(n)? !(n%2) : void 0;
	}
});
