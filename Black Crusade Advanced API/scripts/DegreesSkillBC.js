/**
 * This script rolls a d100 and computes and outputs the success results based
 * originally on Dark Heresy Second Edition RPG criteria. It is intended to be used 
 * for skill checks.
 *
 * The following commands is used:
 * !skill40k [tokenName], [attributeValue], [unnaturalAttributeValue] [skillBonus1], [skillBonus2], [skillBonus3], [skillBonus4], [ModifierValue]
 *
 * It is expected that the following bonus are included based on the skill level of the character:
 * skillBonus1 = 20 or 0, if known or untrained
 * skillBonus2 = 10 or 0, if trained or less than trained
 * skillBonus3 = 10 or 0, if experienced or less than experienced
 * skillBonus4 = 10 or 0, if veteran or less than veteran
 *
 * Example:
 * /em @{character_name} makes a known Acrobatics skill check!
 * !skill40k @{character_name},@{Agility},@{UnAg},20,0,0,0,?{Total Modifiers|0}
 *
 * This script was written by Jack D on Roll20 Forums at https://app.roll20.net/forum/post/4607859/help-dark-heresy-2nd-edition-api and 
 * later modified by Pixizz for use in Black Crusade.
 *
 **/


//Rolls a d100 and calculates the success or fail results to the chat window.
var rollResultForSkill40k = function (token, attribute, unAttribute, skillBn1, skillBn2, skillBn3, skillBn4, modifier) {
	var roll = randomInteger(100);
	var skillBonus = parseInt(skillBn1) + parseInt(skillBn2) + parseInt(skillBn3) + parseInt(skillBn4) - 20;
	var modTarget = parseInt(attribute) + skillBonus + parseInt(modifier);
	var output1 = token,
		output2, degOfSuc;


	//Create output which includes skill level wording
	switch (skillBonus) {
	case 0:
		output1 += ' is known (0)';
		break;
	case 10:
		output1 += ' is trained (+10)';
		break;
	case 20:
		output1 += ' is experienced (+20)';
		break;
	case 30:
		output1 += ' is veteran (+30)';
		break;
	default:
		output1 += ' is untrained (-20)';
	}
	output1 += ' granting a modified target of <B>' + modTarget + '</B>. They ' +
		'rolled a <B>' + roll + '</B>.';


	//Form output message based on result
	if (roll === 1) {
		output2 = '<span style="color:green">' + token + ' rolled a 1 and automatically succeeds by <B>1 degree</B>.</span>';
	}
	else if (roll === 100) {
		output2 = '<span style="color:red">' + token + ' rolled a 100 and automatically fails by <B>1 degree</B>.</span>';
	}
	else if (roll <= modTarget) {
		degOfSuc = (Math.floor(modTarget / 10) - Math.floor(roll / 10)) + 1 + parseInt(unAttribute);
		output2 = '<span style="color:green">' + token + ' succeeds by <B>' + degOfSuc + ' degree(s)</B>.</span>';
	}
	else {
		degOfSuc = (Math.floor(roll / 10) - Math.floor(modTarget / 10)) + 1;
		output2 = '<span style="color:red">' + token + ' fails by <B>' + degOfSuc + ' degree(s)</B></span>.';
	}


	//Return output
	return output1 + '<br><br>' + output2;
};


/** Interpret the chat commands. **/
on('chat:message', function (msg) {
	'use strict';
	var cmdName = '!skill40k ';


	if (msg.type === 'api' && msg.content.indexOf(cmdName) !== -1) {
		var paramArray = msg.content.slice(cmdName.length).split(',');
		if (paramArray.length !== 8) {
			sendChat(msg.who, '/w ' + msg.who + ' must specify eight comma-separated ' +
				'parameters for the !skill40k command. Do not use commas in the input zones.');
		}
		else {
			var result = rollResultForSkill40k(paramArray[0].trim(),
				paramArray[1].trim(),
				paramArray[2].trim(),
				paramArray[3].trim(),
				paramArray[4].trim(),
				paramArray[5].trim(),
				paramArray[6].trim(),
				paramArray[7].trim());
			sendChat(msg.who, result);
		}
	}
});