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
var rollcharacteristic40k = rollcharacteristic40k || (function(){

    var rollResultForRoll40k = function (token, attribute, unAttribute, modifier) {
        var roll = randomInteger(100);
        var modTarget = parseInt(attribute) + parseInt(modifier);
        var output1, output2, degOfSuc;
        //Form output message based on result
        if (roll === 1) {
            output1 = token + ' has a modified target of <B>' + modTarget + '</B> and rolled a <B>' + roll + '</B>. ';
			output2 = '<span style="color:green">' + token + ' rolled a 1 and automatically succeeds by <B>1 degree</B>.</span>';
        }
        else if (roll === 100) {
            output1 = token + ' has a modified target of <B>' + modTarget + '</B> and rolled a <B>' + roll + '</B>. ';
			output2 = '<span style="color:red">' + token + ' rolled a 100 and automatically fails by <B>1 degree</B>.</span>';
        }
        else if (roll <= modTarget) {
			degOfSuc = (Math.floor(modTarget / 10) - Math.floor(roll / 10)) + 1 + parseInt(unAttribute);
			output1 = token + ' has a modified target of <B>' + modTarget + '</B> and rolled a <B>' + roll + '</B>. ';
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
        var cmdName = '!rollcharacteristic40k ';
        if (msg.type === 'api' && msg.content.indexOf(cmdName) !== -1) {
            let content = processInlinerolls(msg);
            var paramArray = content.slice(cmdName.length).split(',');
            if (paramArray.length !== 4) {
                sendChat(msg.who, '/w ' + msg.who + ' You must specify four comma-separated ' +
                'parameters for the !rollcharacteristic40k command. Do not use commas in the input zones.');
            }
            else {
                var result = rollResultForRoll40k(paramArray[0].trim(), paramArray[1].trim(), paramArray[2].trim(), paramArray[3].trim());
                sendChat(msg.who, result);
            }
        }
    });
}())