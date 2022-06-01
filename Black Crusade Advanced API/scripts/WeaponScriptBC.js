/**
 * This script rolls a d100 and computes and outputs the success results based
 * originally on Dark Heresy Second Edition RPG criteria and now Black Crusade RPG criteria.
 *
 * The following commands is used:
 * !roll40k [tokenName], [attributeValue], [unnaturalAttributeValue], [ModifierValue]
 *
 * This script was written by Jack D on Roll20 Forums at https://app.roll20.net/forum/post/4607859/help-dark-heresy-2nd-edition-api
 * and later modified by Pixizz for Black Crusade.
**/

//Rolls a d100 and calculates the success or fail results to the chat window.
var roll40k = roll40k || (function(){

	/** determine Hit Location from the roll value. **/
	determineLocation = function(roll) {
		var hitLocation;
		if (roll === 10 || roll === 20 || roll === 30 || roll === 40 || roll === 50 || roll === 60 || roll === 70 || roll === 80 || roll === 90) {
				hitLocation = ' (Head)';
			}
			else if (roll === 11 || roll === 21 || roll === 31 || roll === 41 || roll === 51 || roll === 61 || roll === 71 || roll === 81 || roll === 91 || roll === 2) {
				hitLocation = ' (Right Arm)';
			}
			else if (roll === 12 || roll === 22 || roll === 32 || roll === 42 || roll === 52 || roll === 62 || roll === 72 || roll === 82 || roll === 92 || roll === 3) {
				hitLocation = ' (Left Arm)';
			}
			else if (roll === 13 || roll === 23 || roll === 33 || roll === 43 || roll === 53 || roll === 63 || roll === 73 || roll === 83 || roll === 93 || roll === 4 || roll === 14 || roll === 24 || roll === 34 || roll === 44 || roll === 54 || roll === 64 || roll === 74 || roll === 84 || roll === 94 || roll === 5 || roll === 15 || roll === 25 || roll === 35 || roll === 45 || roll === 55 || roll === 65 || roll === 75 || roll === 85 || roll === 95 || roll === 6 || roll === 16 || roll === 26 || roll === 36 || roll === 46 || roll === 56 || roll === 66 || roll === 76 || roll === 86 || roll === 96 || roll === 7) {
				hitLocation =  ' (Body)';
			}
			else if (roll === 17 || roll === 27 || roll === 37 || roll === 47 || roll === 57 || roll === 67 || roll === 77 || roll === 87 || roll === 97 || roll === 8 || roll === 18 || roll === 28 || roll === 38 || roll === 48 || roll === 58) {
				hitLocation = ' (Right Leg)';
			}
			else {
				hitLocation =  ' (Left Leg)';
			}
			// return hit location.
			return hitLocation;
	};

    var rollResultForRoll40k = function (token, attribute, unAttribute, modifier) {
        var roll = randomInteger(100);
        var modTarget = parseInt(attribute) + parseInt(modifier);
        var output1, output2, degOfSuc;
        //Form output message based on result
        if (roll === 1) {
            output1 = token + ' has a modified target of <B>' + modTarget + '</B> and rolled a <B>' + roll + '</B>. ';
			output2 = '<span style="color:green">' + token + ' rolled a 1 (Head) and automatically succeeds by <B>1 degree</B>.</span>';
        }
        else if (roll === 100) {
            output1 = token + ' has a modified target of <B>' + modTarget + '</B> and rolled a <B>' + roll + '</B>. ';
			output2 = '<span style="color:red">' + token + ' rolled a 100 and automatically fails by <B>1 degree</B>.</span>';
        }
        else if (roll <= modTarget) {
			degOfSuc = (Math.floor(modTarget / 10) - Math.floor(roll / 10)) + 1 + parseInt(unAttribute);
			output1 = token + ' has a modified target of <B>' + modTarget + '</B> and rolled a <B>' + roll + determineLocation(roll) + '</B>. ';
            output2 = '<span style="color:green">' + token + ' succeeds by <B>' + degOfSuc + ' degree(s)</B>.</span>';
        }
        else {
            degOfSuc = (Math.floor(roll / 10) - Math.floor(modTarget / 10)) + 1;
			output1 = token + ' has a modified target of <B>' + modTarget + '</B> and rolled a <B>' + roll + '</B>. ';
            output2 = '<span style="color:red">' + token + ' fails by <B>' + degOfSuc + ' degree(s)</B></span>.';
        }
        //Return output
        return output1 + '<br><br>' + output2;
    },
	
    processInlinerolls = function(msg) {
        if (_.has(msg, 'inlinerolls')) {
            return _.chain(msg.inlinerolls)
                    .reduce(function(previous, current, index) {
                        previous['$[[' + index + ']]'] = current.results.total || 0;
                        return previous;
                    },{})
                    .reduce(function(previous, current, index) {
                        return previous.replace(index, current);
                    }, msg.content)
                    .value();
        } else {
            return msg.content;
        }
    };
	
    /** Interpret the chat commands. **/
    on('chat:message', function (msg) {
        'use strict';
        var cmdName = '!roll40k ';
        if (msg.type === 'api' && msg.content.indexOf(cmdName) !== -1) {
            let content = processInlinerolls(msg);
            var paramArray = content.slice(cmdName.length).split(',');
            if (paramArray.length !== 4) {
                sendChat(msg.who, '/w ' + msg.who + ' You must specify four comma-separated ' +
                'parameters for the !roll40k command. Do not use commas in the input zones.');
            }
            else {
                var result = rollResultForRoll40k(paramArray[0].trim(), paramArray[1].trim(), paramArray[2].trim(), paramArray[3].trim());
                sendChat(msg.who, result);
            }
        }
    });
}())