// Vampire the Masquerade 5e Dice Mechanics by Momtahan K (Version 1.2).
//
// The following code is an adaptation of that produced by Roll20 user Konrad J. for "Hero Quest Dice Mechanics". 
// Many thanks for providing this code free to use.
//
// Legal
// Portions of the materials are the copyrights and trademarks of White Wolf Publishing AB, and are used with permission. All rights reserved. For more in formation please visit whitewolf.com
//
// With the exception of materials under the copyright of White Wolf all extra code should be considered under
// GNU General Public License v3 or later (GPL-3.0-or-later) Copyright 2018 held my Momtahan.K
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
// This license MUST be copied on to any derivative work.
// Effectively feel free to use, edit and modify the code to your hearts content. As I understand it this will only cause an issue if you 
// try to use it for commerical gain. This has been added to ensure the community benefits from it.

// Versions
// Version 1.2
// Updated images to a different location. Fixed bugs where players name would not appear for specific rolls. Fixed bug in which speech marks in a players name would cause issues.
// Version 1.1
// Bug fixes and updated images to a different location


// Guide to use the code
// The first two lines I am no longer sure if they work and require testing.
// !vtm log on|multi|single|off  // default:on and multi
// outputs dice rolled to the chat window if "on", only the result if "off"
// dice rolled will be on single line if "single" and on multiple lines if "multi"
// !vtm graphics on|off|s|m|l  //default:on and m
// shows dice rolled as graphic, small, medium, or large if "on" or as text if "off"
//
// !vtm test // this will output every side of every die to the chat window (currently does not work)
// !vtm hero // Only for true heroes
// !vtm lupine // When people ask for too much
//
// There are several different types of rolls. 
// In these rolls the first two arguments must be !vtm [type] all other numbers are optional and may be ignored depending on the type of roll

// !vtm atr a# r# m#	// Rolling for attributes a# is the number of dice associated with the attribute, r# number of dice associated with hunger, m# is a dice modifier to apply. Example !vtm atr a2 r2 m3 
// !vtm skill a# r# m#	// Rolling for skills a# is the number of dice associated with the attribute, s# the number of dice for the skill r# number of dice associated with hunger, m# is a dice modifier to apply. Example !vtm atr a2 s3 r2 m3 
// !vtm will w# a# m#	// Rolling for willpower w# is the number of willpower dice a# is the number of dice associated with an attribute, m# is a dice modifier to apply. Example !vtm atr a2 w2 m3 
// !vtm will p# a# m#	// Rolling for willpower p# is an odd number. By and large you should not use it unless you are creating your own multi-state health/willpower boxes. In such cases please look at the html to see how I have implemented it.
// !vtm roll w# r#      // Is a straight roll, the w# represents the number of black die, the r# represents the number of red die to roll Example !vtm roll w2 r2
// Note: For anyone reading the code, to make the frenzy roll work I had to invert the DC thus asking the play to roll less than 7 is instead interpretted as asking the player to roll 5 or higher (these are probabilistically equal statements).
// !vtm rouse          // Rolls one single rouse dice. Success on 6+
// !vtm reroll w#      // Used for will power re-roll # is the number of die to roll
// !vtm frenzy p# o# q# // Rolls for frenzy. This is used to add 1/3 humanity (rounded down) to willpower, to roll. As mentioned previously p# is a special case and the number of dice rolled is not equal to the number you enter. Unless you are looking at multistate boxes, don't use this. o# is similar but for humanity. q# Should be used to set the difficulty of the Frenzy roll
// !vtm remorse x# m# // Used for remorse roll. x# is under a similar constraint as p# and o# due to multistate checkbox issues once again.
// !vtm humanity o# m# // Used for humanity roll. 
//
// Optional Flags:
// An extra variable (c~custom name ~) may be added to any of these rolls to display a custom name in the roll template. Note: As a coding querk please have a space after the name but before the close in the tilde.
// Example !vtm roll w5 r1 c~Prince Wolf ~ will roll 5 black die, 1 red die and the character will have the name - Prince Wolf
// An extra variable (t~custom name~) may be added to any of these rolls to display the roll type. This is text below the custom name
// Adding b# to a skill roll will add the value/2.0 to the number of vampire dice. This is used for blood potency when handling disciplines
// If needs be both the Frenzy, Remorse and Humanity Roll can be updated to use real values. For now however I'm going to leave it.

var vtmCONSTANTS = {
	VTMCOMMAND: "!vtm",
	GRAPHICSIZE: {
		SMALL: 20,
		MEDIUM: 30,
		LARGE: 40,
		XLARGE: 50,
		XXLARGE: 60
	},
	VAMPIRE: {
		ONE: "https://i.imgur.com/BjURZvY.png",
		TWO: "https://i.imgur.com/MK6B9vM.png",
		THREE: "https://i.imgur.com/EiFDjZg.png",
		FOUR: "https://i.imgur.com/t7Lt0mx.png",
		FIVE: "https://i.imgur.com/UnW2Ao3.png",
		SIX: "https://i.imgur.com/7J9nx2w.png",
		SEVEN: "https://i.imgur.com/dVi0fZK.png",
		EIGHT: "https://i.imgur.com/4xBiXJM.png",
		NINE: "https://i.imgur.com/MMy0fJ1.png",
		TEN: "https://i.imgur.com/dPLPkMd.png"
	},
	HUNGER: {
		ONE: "https://i.imgur.com/Q9U10Zh.png",
		TWO: "https://i.imgur.com/YFrNSut.png",
		THREE: "https://i.imgur.com/mUPaTMj.png",
		FOUR: "https://i.imgur.com/TagrNvs.png",
		FIVE: "https://i.imgur.com/S5IMrAB.png",
		SIX: "https://i.imgur.com/ttQDDt5.png",
		SEVEN: "https://i.imgur.com/MIrvVQW.png",
		EIGHT: "https://i.imgur.com/fw0j5pN.png",
		NINE: "https://i.imgur.com/5RkL2Se.png",
		TEN: "https://i.imgur.com/w87YVKQ.png"
	}
};

var vtmGlobal = {
	diceLogChat: true,
	diceGraphicsChat: true,
	diceGraphicsChatSize: vtmCONSTANTS.GRAPHICSIZE.MEDIUM,
	diceTextResult: "",
	diceTextResultLog: "",
	diceGraphicResult: "",
	diceGraphicResultLog: "",
	diceTestEnabled: false,
	diceLogRolledOnOneLine: false,
	luckydice: false,
	reroll: ""
};

function rollVTMDice(diceQty, type, dc) {
	var roll = 0;
	var diceResult = {
		nilScore: 0,
		successScore: 0,
		critScore: 0,
		muddyCritScore: 0,
		failScore: 0,
		diceGraphicsLog: "",
		diceTextLog: ""
	};

	// Used to build images
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';

	if (vtmGlobal.diceTestEnabled === true) {
		diceQty = 10;
	}

	for (i = 1; i <= diceQty; i++) {

		if (vtmGlobal.diceTestEnabled === true) {
			roll = roll + 1;
		} else {
			roll = randomInteger(10);
		}

		let image = getDiceImage(type, roll);
		if (type === "v") {
			if (roll >= dc.critSuccess) {
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + roll + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + image + s2 + roll + s3 + vtmGlobal.diceGraphicsChatSize + s4 + vtmGlobal.diceGraphicsChatSize + s5;
				diceResult.successScore = diceResult.successScore + 1;
				diceResult.critScore = diceResult.critScore + 1;
			} else if (roll >= dc.success) {
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + roll + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + image + s2 + roll + s3 + vtmGlobal.diceGraphicsChatSize + s4 + vtmGlobal.diceGraphicsChatSize + s5;
				diceResult.successScore = diceResult.successScore + 1;
			} else if (roll >= dc.nil) {
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + roll + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + image + s2 + roll + s3 + vtmGlobal.diceGraphicsChatSize + s4 + vtmGlobal.diceGraphicsChatSize + s5;
				diceResult.nilScore = diceResult.nilScore + 1;
			} else if (roll >= dc.critFail) {
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + roll + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + image + s2 + roll + s3 + vtmGlobal.diceGraphicsChatSize + s4 + vtmGlobal.diceGraphicsChatSize + s5;
				diceResult.nilScore = diceResult.nilScore + 1;
			}
		} else if (type === "h") {
			if (roll >= dc.critSuccess) {
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + roll + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + image + s2 + roll + s3 + vtmGlobal.diceGraphicsChatSize + s4 + vtmGlobal.diceGraphicsChatSize + s5;
				diceResult.successScore = diceResult.successScore + 1;
				diceResult.muddyCritScore = diceResult.muddyCritScore + 1;
			} else if (roll >= dc.success) {
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + roll + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + image + s2 + roll + s3 + vtmGlobal.diceGraphicsChatSize + s4 + vtmGlobal.diceGraphicsChatSize + s5;
				diceResult.successScore = diceResult.successScore + 1;
			} else if (roll >= dc.nil) {
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + roll + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + image + s2 + roll + s3 + vtmGlobal.diceGraphicsChatSize + s4 + vtmGlobal.diceGraphicsChatSize + s5;
				diceResult.nilScore = diceResult.nilScore + 1;
			} else if (roll >= dc.critFail) {
				diceResult.diceTextLog = diceResult.diceTextLog + "(" + roll + ")";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + image + s2 + roll + s3 + vtmGlobal.diceGraphicsChatSize + s4 + vtmGlobal.diceGraphicsChatSize + s5;
				diceResult.failScore = diceResult.failScore + 1;
			}
		}
	}

	return diceResult;
}

/**
 * Get the image associated with the roll.
 * @param {*} type The type (V) Vampire or (H) Hunger.
 * @param {*} roll The roll value. Returns null if not 1 - 10
 */
function getDiceImage(type, roll) {
	if (type === "v") {
		switch (roll) {
			case 1:
				return vtmCONSTANTS.VAMPIRE.ONE;
			case 2:
				return vtmCONSTANTS.VAMPIRE.TWO;
			case 3:
				return vtmCONSTANTS.VAMPIRE.THREE;
			case 4:
				return vtmCONSTANTS.VAMPIRE.FOUR;
			case 5:
				return vtmCONSTANTS.VAMPIRE.FIVE;
			case 6:
				return vtmCONSTANTS.VAMPIRE.SIX;
			case 7:
				return vtmCONSTANTS.VAMPIRE.SEVEN;
			case 8:
				return vtmCONSTANTS.VAMPIRE.EIGHT;
			case 9:
				return vtmCONSTANTS.VAMPIRE.NINE;
			case 10:
				return vtmCONSTANTS.VAMPIRE.TEN;
			default:
				return null;
		}
	} else if (type === "h") {
		switch (roll) {
			case 1:
				return vtmCONSTANTS.HUNGER.ONE;
			case 2:
				return vtmCONSTANTS.HUNGER.TWO;
			case 3:
				return vtmCONSTANTS.HUNGER.THREE;
			case 4:
				return vtmCONSTANTS.HUNGER.FOUR;
			case 5:
				return vtmCONSTANTS.HUNGER.FIVE;
			case 6:
				return vtmCONSTANTS.HUNGER.SIX;
			case 7:
				return vtmCONSTANTS.HUNGER.SEVEN;
			case 8:
				return vtmCONSTANTS.HUNGER.EIGHT;
			case 9:
				return vtmCONSTANTS.HUNGER.NINE;
			case 10:
				return vtmCONSTANTS.HUNGER.TEN;
			default:
				return null;
		}
	}
}

function processVampireDiceScript(run, dc) {
	var attackDiceResults = {
		nilScore: 0,
		successScore: 0,
		critScore: 0,
		muddyCritScore: 0,
		failScore: 0,
		diceGraphicsLog: "",
		diceTextLog: ""
	};
	var defendDiceResults = {
		nilScore: 0,
		successScore: 0,
		critScore: 0,
		muddyCritScore: 0,
		failScore: 0,
		diceGraphicsLog: "",
		diceTextLog: "",
		hungerSustained: true
	};

	var diceTextRolled = "";
	var diceGraphicsRolled = "";

	log("Roll Variables");
	log(run);
	let user = run.user;

	attackDiceResults = rollVTMDice(run.blackDice, "v", dc);
	defendDiceResults = rollVTMDice(run.redDice, "h", dc);

	log(attackDiceResults);
	log(defendDiceResults);

	var diceTotals = {
		nilScore: attackDiceResults.nilScore + defendDiceResults.nilScore,
		successScore: attackDiceResults.successScore + defendDiceResults.successScore,
		critScore: attackDiceResults.critScore + defendDiceResults.critScore,
		muddyCritScore: attackDiceResults.muddyCritScore + defendDiceResults.muddyCritScore,
		failScore: attackDiceResults.failScore + defendDiceResults.failScore,
		diceGraphicsLog: attackDiceResults.diceGraphicsLog + defendDiceResults.diceGraphicsLog,
		diceTextLog: "Normal" + attackDiceResults.diceTextLog + "Hunger" + defendDiceResults.diceTextLog
	};

	if (vtmGlobal.diceTestEnabled === true) {
		sendChat("", "/desc " + user + ": v1 h1");
	}

	let endTemplateSection = "}} ";
	let outputMessage = "&{template:wod} {{name=" + user + endTemplateSection;

	if (run.rollname) {
		outputMessage += "{{Rollname=" + run.rollname + endTemplateSection;
	}

	if (vtmGlobal.diceLogChat === true) {
		if (vtmGlobal.diceLogRolledOnOneLine === true) {
			diceGraphicsRolled = diceTotals.diceGraphicsLog;
			diceTextRolled = diceTotals.diceTextLog;
			if (vtmGlobal.diceGraphicsChat === true) {
				outputMessage += "{{Roll=" + diceGraphicsRolled + endTemplateSection;
			} else {
				outputMessage += "{{Roll=" + diceTextRolled + endTemplateSection;
			}
		} else {
			if (vtmGlobal.diceGraphicsChat === true) {
				outputMessage += "{{Normal=" + attackDiceResults.diceGraphicsLog + endTemplateSection;
				outputMessage += "{{Hunger=" + defendDiceResults.diceGraphicsLog + endTemplateSection;
			} else {
				outputMessage += "{{Normal=" + attackDiceResults.diceTextLog + endTemplateSection;
				outputMessage += "{{Hunger=" + defendDiceResults.diceTextLog + endTemplateSection;
			}
		}
	}

	let thebeast = '<img src="https://raw.githubusercontent.com/Kirintale/roll20-character-sheets/master/vampire-v5/Banners/TheBeast.png" title="The Beast" height="20" width="228"/>';

	if (run.rouseStatRoll) {
		if (diceTotals.successScore > 0) {
			outputMessage += "{{Beast=" + '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/RousingSuccess.png" title="Rousing Success" height="20" width="228"/>' + endTemplateSection;
		} else {
			outputMessage += "{{Beast=" + '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/HungerGain.png" title="Hunger Gain" height="20" width="228"/>' + endTemplateSection;

		}
	} else if (run.frenzyRoll) {
		outputMessage += "{{Successes=" + diceTotals.successScore + endTemplateSection;
		if (diceTotals.successScore >= run.difficulty) {
			outputMessage += "{{Beast=" + '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/FrenzyRestrained.png" title="Frenzy Restrained" height="20" width="228"/>' + endTemplateSection;
		} else {
			outputMessage += "{{Beast=" + '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/Frenzy.png" title="Frenzy" height="20" width="228"/>' + endTemplateSection;
		}
	} else if (run.remorseRoll) {
		outputMessage += "{{Successes=" + diceTotals.successScore + endTemplateSection;
		if (diceTotals.successScore > 0) {
			outputMessage += "{{Beast=" + '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/HumanityPass.png" title="Guilty" height="20" width="228"/>' + endTemplateSection;
		} else {
			outputMessage += "{{Beast=" + '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/HumanityFail.png" title="Innocent" height="20" width="228"/>' + endTemplateSection;

		}

		if (vtmGlobal.luckydice) {
			let lastResort = '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/lastresort.png" title="Miss" height="20" width="228"/>';
			outputMessage += "{{Fate=" + lastResort + endTemplateSection;
		}
	} else {
		outputMessage = addRollDeclarations(diceTotals, outputMessage, endTemplateSection, thebeast);
	}

	vtmGlobal.luckydice = false;
	outputMessage += "{{Reroll=[Reroll](" + vtmGlobal.reroll + ")" + endTemplateSection;

	log("Output");
	log(outputMessage);
	if (vtmGlobal.diceTestEnabled != true) {
		sendChat(user, outputMessage);
	}
}

function addRollDeclarations(diceTotals, outputMessage, endTemplateSection, thebeast) {
	// Crit bonus is + 2 successes for each PAIR of crits. Thus 2 crits is + 2 successs, 3 crits is + 2 successes.
	let critBonus = Math.floor((diceTotals.critScore + diceTotals.muddyCritScore) / 2.0) * 2.0;
	outputMessage += "{{Successes=" + (diceTotals.successScore + critBonus) + endTemplateSection;


	if (diceTotals.successScore == 0 && vtmGlobal.luckydice) {
		let lastResort = '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/lastresort.png" title="Miss" height="20" width="228"/>';
		outputMessage += "{{Fate=" + lastResort + endTemplateSection;
		let miss = '<img src="https://raw.githubusercontent.com/Kirintale/roll20-character-sheets/master/vampire-v5/Banners/MissFail.png" title="Miss" height="20" width="228"/>';
		outputMessage += "{{Miss=" + miss + endTemplateSection;
	} else if (diceTotals.successScore == 0) {
		//outputMessage += "{{Fate=" + "Total failure" + endTemplateSection;
		let miss = '<img src="https://raw.githubusercontent.com/Kirintale/roll20-character-sheets/master/vampire-v5/Banners/MissFail.png" title="Miss" height="20" width="228"/>';
		outputMessage += "{{Miss=" + miss + endTemplateSection;
	} else if (vtmGlobal.luckydice) {
		let lastResort = '<img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/vampire-v5/Banners/lastresort.png" title="Miss" height="20" width="228"/>';
		outputMessage += "{{Fate=" + lastResort + endTemplateSection;
	}

	if ((diceTotals.muddyCritScore >= 2) || (diceTotals.muddyCritScore === 1 && (diceTotals.critScore >= 1))) {
		let messy = '<img src="https://raw.githubusercontent.com/Kirintale/roll20-character-sheets/master/vampire-v5/Banners/MessyCritical.png" title="Messy" height="20" width="228"/>';
		outputMessage += "{{Messy=" + messy + endTemplateSection;
	} else if (diceTotals.critScore >= 2) {
		let crit = '<img src="https://raw.githubusercontent.com/Kirintale/roll20-character-sheets/master/vampire-v5/Banners/CriticalHit.png" title="Crit" height="20" width="228"/>';
		outputMessage += "{{Crit=" + crit + endTemplateSection;
	}

	if (diceTotals.failScore >= 5) {
		outputMessage += "{{Beast=" + thebeast + endTemplateSection;
		//	outputMessage += "{{BeastTaunt=" + "I do say dear boy, I may be a mite bit peckish." + endTemplateSection;
	} else if (diceTotals.failScore >= 3) {
		outputMessage += "{{Beast=" + thebeast + endTemplateSection;
		//	outputMessage += "{{BeastTaunt=" + "BLOOD BLOOD GIVE ME BLOOD!! I MUST FEED!" + endTemplateSection;
	} else if (diceTotals.failScore >= 2) {
		outputMessage += "{{Beast=" + thebeast + endTemplateSection;
		//	outputMessage += "{{BeastTaunt=" + "Let the vitae flow!" + endTemplateSection;
	} else if (diceTotals.failScore >= 1) {
		outputMessage += "{{Beast=" + thebeast + endTemplateSection;
		//	outputMessage += "{{BeastTaunt=" + "Feed Me! (Hunger causes you to be distracted)" + endTemplateSection;
	}

	return outputMessage;
}

var processScriptTabs = function (argv, who, dc) {
	// this will run the various other scripts depending upon the chat
	// window command.  Just add another Case statement to add a new command.
	var tmpLogChat = false;
	var tmpGraphicsChat = false;
	var script = argv.shift();
	switch (script) {
		case vtmCONSTANTS.VTMCOMMAND:
			switch (argv[0]) {
				case "log":
					switch (argv[1]) {
						case "on":
							vtmGlobal.diceLogChat = true;
							break;
						case "off":
							vtmGlobal.diceLogChat = false;
							break;
						case "multi":
							vtmGlobal.diceLogRolledOnOneLine = false;
							break;
						case "single":
							vtmGlobal.diceLogRolledOnOneLine = true;
							break;

					}
					break;
				case "graphics":
					switch (argv[1]) {
						case "on":
							vtmGlobal.diceGraphicsChat = true;
							break;
						case "off":
							vtmGlobal.diceGraphicsChat = false;
							break;
						case "s":
							vtmGlobal.diceGraphicsChatSize = vtmCONSTANTS.GRAPHICSIZE.SMALL;
							break;
						case "m":
							vtmGlobal.diceGraphicsChatSize = vtmCONSTANTS.GRAPHICSIZE.MEDIUM;
							break;
						case "l":
							vtmGlobal.diceGraphicsChatSize = vtmCONSTANTS.GRAPHICSIZE.LARGE;
							break;
					}
					break;
				case "test":
					vtmGlobal.diceTestEnabled = true;
					tmpLogChat = vtmGlobal.diceLogChat;
					tmpGraphicsChat = vtmGlobal.diceGraphicsChat;
					vtmGlobal.diceLogChat = true;
					vtmGlobal.diceGraphicsChat = true;
					var run = {
						blackDice: 1,
						redDice: 1,
						user: who,
						roll: null
					};
					processVampireDiceScript(run, dc);
					vtmGlobal.diceTestEnabled = false;
					vtmGlobal.diceLogChat = tmpLogChat;
					vtmGlobal.diceGraphicsChat = tmpGraphicsChat;
					break;
				case "hero":
					sendChat("The best thing about Hero Quest!", "https://www.youtube.com/watch?v=Cx8sl2uC46A");
					break;
				case "lupine":
					//sendChat("Some players (and character sheet designers)...", "");
					break;
				default:
					processVampireDiceScript(argv[0], dc);
			}
			break;
	}
};

function performInlineRolls(msg) {
	log("Inline Roll");
	msg.content = _.chain(msg.inlinerolls)
		.reduce(function (m, v, k) {
			m['$[[' + k + ']]'] = v.results.total || 0;
			return m;
		}, {})
		.reduce(function (m, v, k) {
			return m.replace(k, v);
		}, msg.content)
		.value();

	return msg;
};

function handleSkillRoll(input) {
	log("Atr/Skill Roll");
	log(input);
	let hunger = input.hunger;
	let dicepool = input.attribute + input.modifier;
	if (input.type === "skill") {
		dicepool += input.skill;
	}

	var run = {
		blackDice: 0,
		redDice: 0,
		user: input.user,
		rollname: input.rollname
	};

	if (dicepool <= 0) {
		vtmGlobal.luckydice = true;
		if (hunger > 0) {
			run.redDice = 1;
			return ["!vtm", run];
		} else {
			run.blackDice = 1;
			return ["!vtm", run];
		}
	}

	run.blackDice = dicepool - hunger;
	run.redDice = ((dicepool + hunger) - Math.abs(dicepool - hunger)) / 2;

	return ["!vtm", run];
}

function handleWillpowerRoll(input) {
	let dicepool = input.willpower + input.attribute + input.modifier;

	var run = {
		blackDice: 0,
		redDice: 0,
		user: input.user,
		rollname: input.rollname
	};

	if (dicepool <= 0) {
		vtmGlobal.luckydice = true;
		dicepool = 1;
	}

	run.blackDice = dicepool;

	return ["!vtm", run];
}

function handleRouseRoll(input) {
	var run = {
		blackDice: 0,
		redDice: 1,
		user: input.user,
		rollname: input.rollname,
		rouseStatRoll: true
	};

	return ["!vtm", run];
}

function handleFrenzyRoll(input) {
	let dicepool = input.willpower + input.modifier + Math.floor(input.skill / 3.0);

	var run = {
		blackDice: 0,
		redDice: 0,
		user: input.user,
		rollname: input.rollname,
		frenzyRoll: true,
		difficulty: input.difficulty
	};

	if (dicepool <= 0) {
		vtmGlobal.luckydice = true;
		run.redDice = 1;
		return ["!vtm", run];
	}

	run.blackDice = 0;
	run.redDice = dicepool;

	return ["!vtm", run];
}

function handleSimpleRoll(input) {
	log("Simple Roll");
	log(input);
	var run = {
		blackDice: input.willpower,
		redDice: input.hunger,
		user: input.user,
		rollname: input.rollname
	};

	return ["!vtm", run];
}

function handleRemorseRoll(input) {
	log("Remorse Roll");
	log(input);
	let dice = input.willpower + input.modifier;
	if (dice <= 0) {
		vtmGlobal.luckydice = true;
		dice = 1;
	}

	var run = {
		blackDice: dice,
		redDice: 0,
		user: input.user,
		rollname: input.rollname,
		remorseRoll: true
	};

	return ["!vtm", run];
}

function handleHumanityRoll(input) {
	log("Humanity Roll")
	log(run);
	let dice = input.skill + input.modifier;
	if (dice <= 0) {
		vtmGlobal.luckydice = true;
		dice = 1;
	}

	var run = {
		blackDice: dice,
		redDice: 0,
		user: input.user,
		rollname: input.rollname
	};

	return ["!vtm", run];
}

function calculateVariables(argv, who) {
	var input = {
		type: argv[1],
		attribute: 0,
		skill: 0,
		hunger: 0,
		modifier: 0,
		willpower: 0,
		user: who,
		rollname: null,
		successDc: 6,
		difficulty: 1
	};

	for (i = 2; i < argv.length; i++) {
		let entry = argv[i];
		let identifier = entry.substring(0, 1);

		if (identifier === "a") {
			// Assign an int directly to an attribute
			let value = parseInt(entry.substring(1), 10);
			input.attribute = value;
		} else if (identifier === "s") {
			// Assign an int directly to a skill
			let value = parseInt(entry.substring(1), 10);
			input.skill = value;
		} else if (identifier === "o") {
			// Used to assign a trait much like "p", this is used in Willpower rolls to assign humanity
			let value = parseInt(entry.substring(1), 10);
			value = updateMultiboxValue(value);
			input.skill = value;
		} else if (identifier === "r") {
			// Red die. Used for assigning a value directly to hunger die.
			let value = parseInt(entry.substring(1), 10);
			input.hunger = value;
		} else if (identifier === "m") {
			// Adds a modifier value straight
			let value = parseInt(entry.substring(1), 10);
			input.modifier += value;
		} else if (identifier === "b") {
			// Adds half of value to modifier. Example Discipline
			let value = parseInt(entry.substring(1), 10);
			value = Math.floor(value / 2.0);
			input.modifier += value;
		} else if (identifier === "w") {
			// Used for willpower if you want to give it a value directly
			let value = parseInt(entry.substring(1), 10);
			input.willpower = value;
		} else if (identifier === "p") {
			// Used for traits which have 4 states such willpower and health
			let value = parseInt(entry.substring(1), 10);
			value = updateMultiboxValue(value);
			input.willpower = value;
		} else if (identifier === "d") {
			// Used for varying a difficulty
			let value = parseInt(entry.substring(1), 10);
			if (value < 1) {
				value = 1;
			} else if (value > 10) {
				value = 10;
			}
			input.successDc = value;
		} else if (identifier === "c") {
			// Used for assigning a character name
			i++;
			let value = argv[i];
			if (value != undefined && value.trim().length != 0) {
				input.user = value.trim();
			}
		} else if (identifier === "t") {
			// Used for assigning a rollname
			i++;
			let value = argv[i];
			if (value != undefined && value.trim().length != 0) {
				input.rollname = value.trim();
			}
		} else if (identifier === "q") {
			// The number of successes required (used for only certain rolls)
			let value = parseInt(entry.substring(1), 10);
			input.difficulty = value;
		} else if (input.type === "remorse") {
			log("remorse variable")
			// Used for remorse rolls
			let totalValue = parseInt(entry.substring(1), 10);
			let totalRemorse = updateMultiboxValue(totalValue);
			let missingRemorse = totalValue - totalRemorse;
			missingRemorse = updateMultiboxValue1(missingRemorse);
			input.willpower = missingRemorse / 16.0;
		}
	}

	return input;
}

// Used for multistate checkboxes
function updateMultiboxValue(totalValue) {
	let value = totalValue;
	value = scaleMultiboxValue(value, 3616);
	value = scaleMultiboxValue(value, 241);
	value = scaleMultiboxValue(value, 16);
	return value;
}

// Used for multistate checkboxes
function updateMultiboxValue1(totalValue) {
	let value = totalValue;
	value = scaleMultiboxValue(value, 3616);
	value = scaleMultiboxValue(value, 241);
	return value;
}

function scaleMultiboxValue(value, scaleNumber) {
	while (value > 0) {
		value -= scaleNumber;
	}

	if (value < 0) {
		value += scaleNumber
	}

	return value;
}

// Decides how to distribute dice based on the type of roll
function calculateRunScript(input) {
	if (input.type === "atr" || input.type === "skill") {
		return handleSkillRoll(input);
	} else if (input.type === "will") {
		return handleWillpowerRoll(input);
	} else if (input.type === "rouse") {
		return handleRouseRoll(input);
	} else if (input.type === "frenzy") {
		return handleFrenzyRoll(input);
	} else if (input.type === "remorse") {
		return handleRemorseRoll(input);
	} else if (input.type === "humanity") {
		return handleHumanityRoll(input);
	} else {
		return handleSimpleRoll(input);
	}
}

// Get the standard DC
function baseDc() {
	var dc = {
		// These DCs are set to be equal to or greater than their listed value
		critFail: 1,
		nil: 2,
		success: 6,
		critSuccess: 10
	}
	return dc;
}

// Calculates DC
function calculateDc(run) {
	let dc;
	if (run[1].rouseStatRoll === true) {
		dc = {
			// These DCs are set to be equal to or greater than their listed value
			critFail: 1,
			nil: 2,
			success: 6,
			// All DCs must be set, setting to a number >10 will mean it is effectively ignored
			critSuccess: 42
		}
	} else {
		dc = baseDc();
	}
	return dc;
}

on("chat:message", function (msg) {
	// returns the chat window command entered, all in lowercase.
	if (msg.type != 'api') {
		return;
	}

	log("New roll");
	log(msg);


	if (_.has(msg, 'inlinerolls')) {
		msg = performInlineRolls(msg);
	}


	log(msg);

	var chatCommand = msg.content;
	vtmGlobal.reroll = chatCommand.replace(/\"/g, '&quot;').replace(/\~/g, '&#126;');

	var argv = [].concat.apply([], chatCommand.split('~').map(function (v, i) {
		return i % 2 ? v : v.split(' ')
	})).filter(Boolean);
	log("Post Splitting");
	log(argv);

	try {
		if (argv[1] === "skill" || argv[1] === "atr" || argv[1] === "will" || argv[1] === "roll" || argv[1] === "rouse" || argv[1] === "frenzy" || argv[1] === "reroll" || argv[1] === "remorse" || argv[1] === "humanity") {
			let input = calculateVariables(argv, msg.who);
			let run = calculateRunScript(input);
			let dc = calculateDc(run);
			return processScriptTabs(run, msg.who, dc);
		} else if (argv[1] === "log" || argv[1] === "graphics" || argv[1] === "test" || argv[1] === "hero" || argv[1] === "lupine") {
			return processScriptTabs(argv, msg.who, baseDc());
		} else {
			sendChat("Error", "Invalid API call" + msg);
		}
	} catch (err) {
		sendChat("Error", "Invalid input" + err);
		return;
	}
});
