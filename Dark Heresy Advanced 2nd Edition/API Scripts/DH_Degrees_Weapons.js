/**
 * This script rolls a d100 and computes and outputs the success results based
 * on Dark Heresy Second Edition RPG criteria.
 *
 * The following commands is used:
 * !roll40k [tokenName], [attributeValue], [ModifierValue]
 *
 * This script was written by Jack D on Roll20 Forums at https://app.roll20.net/forum/post/4607859/help-dark-heresy-2nd-edition-api
 *
**/

//Rolls a d100 and calculates the success or fail results to the chat window.
var Roll40k = Roll40k || (function(){
    
    //Addition of tracking for used Psy Rating to use in flavor text and for Psy Damage roll if needed.  Created by Oosh.
	on('ready', () => {
        const rxRoll = /^!roll40k\s/i;
        const rxLabel = /(\d+)\[mymod\]/i;
        
		on('chat:message', (msg) => {
            if (rxRoll.test(msg.content) && msg.inlinerolls) {
                let sender = msg.who.replace(/\(gm\)/i, '');
                
				// Grab and verify data proceeding [mymod] is added.
				reqRoll = msg.inlinerolls.find(r => rxLabel.test(r.expression));
                if (!reqRoll) return /*sendChat('modifierBot', `/w "${sender}" Something went horribly wrong in reqRoll. Please reinstall universe.`)*/;
                
				// Grab the query value and set to a variable.
				psyU = reqRoll.expression.match(rxLabel)[1];
				if (!psyU) return /*sendChat('modifierBot', `/w "${sender}" Something went horribly wrong in psyU. Please reinstall universe.`)*/;
                
				// Grab the @{character_name} reference from the roll expression
                let charName = msg.content.match(/^!roll40k\s+([^,]+)/i)[1];
                let char = (findObjs({type: 'character', name: charName})||[])[0]
                if (!char) return sendChat('modifierBot', `/w "${sender}" Something went horribly wrong. Please reinstall universe.`);
                let charId = char.id;
                
				// Update the attribute if it exists, or create it if it doesn't
                let attr = (findObjs({type: 'attribute', characterid: charId, name: 'psyuse'})||[])[0];
                if (!attr) createObj('attribute', {characterid: charId, name:'psyuse', current: psyU});
                else attr.set({current: psyU});
            }
        });
		
        var rollResultForRoll40k = function (token, attribute, modifier) {
            var roll = randomInteger(100);
            var modTarget = parseInt(attribute) + parseInt(modifier);
            var output2 = token + ' has a modified target of <B>' + modTarget + '</B> and rolled a <B>' + roll + '</B>. ';
            var output3, degOfSuc;
            //Form output message based on result
            if (roll === 1) {
                degOfSuc = Math.floor((modTarget - roll) / 10) + 1;
                output3 = '<span style="color:green">' + token + ' rolled a 1 and critically succeeds with <B>' + degOfSuc + ' degree(s)</B>!</span>';
            }
            else if (roll === 100) {
                degOfSuc = Math.floor((roll - modTarget) / 10) + 1;
                output3 = '<span style="color:red">' + token + ' rolled a 100 and critically fails with <B>' + degOfSuc + ' degree(s)</B>!</span>';
            }
            else if (roll <= modTarget) {
                degOfSuc = Math.floor((modTarget - roll) / 10) + 1;
                output3 = '<span style="color:#002e00">' + token + ' succeeds by <B>' + degOfSuc + ' degree(s)</B>.</span>';
            }
            else {
                degOfSuc = Math.floor((roll - modTarget) / 10) + 1;
                output3 = '<span style="color:#570000">' + token + ' fails by <B>' + degOfSuc + ' degree(s)</B></span>.';
            }
            //Return output: modified to have psy and non-psy output.
            if (!reqRoll) {
                log("weapon output");
                return output2 + '<br><br>' + output3;
            }else {
                log("psy output");
                var output1 = '<span style="color:#ad00ad">Psy Rating: ' + psyU + '</span>';
                return output1 + '<br><br>' + output2 + '<br><br>' + output3;
            }
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
                if (paramArray.length !== 3) {
                    sendChat(msg.who, '/w ' + msg.who + ' You must specify three comma-separated ' +
                    'parameters for the !roll40k command.');
                }
                else {
                    log("Success!");
                    var result = rollResultForRoll40k(paramArray[0].trim(),
                    paramArray[1].trim(), paramArray[2].trim());
                    sendChat(msg.who, result);
                }
            }
        });
    });
}())