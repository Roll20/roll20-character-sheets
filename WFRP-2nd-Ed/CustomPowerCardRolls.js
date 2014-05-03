// VARIABLE & FUNCTION DECLARATIONS -- DO NOT ALTER!!
var PowerCardScript = PowerCardScript || {};
var getBrightness = getBrightness || {};
var hexDec = hexDec || {};

// USER CONFIGUATION
var POWERCARD_ROUNDED_CORNERS = true;
var POWERCARD_ROUNDED_INLINE_ROLLS = true;
var POWERCARD_BORDER_SIZE = 1;
var POWERCARD_BORDER_COLOR = "#000";
var POWERCARD_USE_PLAYER_COLOR = true;


on("chat:message", function(msg) {
	if (msg.type != "api") return;

	// Get the API Chat Command
	msg.who = msg.who.replace(" (GM)", "");
	msg.content = msg.content.replace("(GM) ", "");
	var command = msg.content.split(" ", 1);
	
	// !roll --versus|WeaponSkill --charactername|@{selected|character_name} --tokenname|@{selected|token_name} --modifier|?{Attack Modifier|0} --type|Attack --weapon|Primary
	
	// DEFINE VARIABLES
	var n = msg.content.split(" --");
	var parameters = {};
	var Tag = "";
	var Content = "";
	var RollObject = {};
	var operator = "<=";
	
	// CREATE OBJECT ARRAY
	var a = 1;
	while (n[a]) {
		Tag = n[a].substring(0, n[a].indexOf("|"));
		Content = n[a].substring(n[a].indexOf("|") + 1);
		parameters[Tag] = Content;
		a++;
	}

	// Define RollObject Variables
	RollObject.AttributeName = parameters.versus;
	RollObject.AttributeValue = "";
	RollObject.CharacterName = parameters.charactername;
	RollObject.DisplayName = parameters.tokenname;
	RollObject.TestModifier = parameters.modifier;
	RollObject.RollType = parameters.type;
	RollObject.DamageAdd = Number("3");
	RollObject.WeaponName = "Placeholder";
	RollObject.PrimaryWeapon = true; if (parameters.weapon == "Secondary") {RollObject.PrimaryWeapon = false};
	RollObject.ImpactWeapon = false;
	RollObject.RangedAttack = false; if ((RollObject.AttributeName == "BallisticSkill") && (RollObject.RollType == "Attack")) {RollObject.RangedAttack = true};
	RollObject.AmmoCount = 0;
	RollObject.AmmoMax = 0;
	RollObject.DiceRollExpression = "1d100";
	RollObject.DamageRollExpression = "1d10";
	RollObject.TestSuccess = "false";
	RollObject.HitLocation = "";
	RollObject.HitLocationToolTip = "";
	RollObject.DiceRollResultToolTip = "";
	RollObject.PowerCardContent = ""		

	if (RollObject.RollType == "Attack") {
		RollObject.PowerCardContent = "--desc --name|" + RollObject.DisplayName + " --leftsub|" + (RollObject.RangedAttack ? "Ranged Attack" : "Melee Attack") + " --rightsub|Half Action  --custom_diceroll|";
	} else if (RollObject.RollType == "Parry") {
		RollObject.PowerCardContent = "--desc --name|" + RollObject.DisplayName + " --leftsub|Parry" + " --rightsub|Reaction  --custom_diceroll|";
	} else if (RollObject.RollType == "Dodge") {
		RollObject.PowerCardContent = "--desc --name|" + RollObject.DisplayName + " --leftsub|Dodge" + " --rightsub|Reaction  --custom_diceroll|";
	} else if (RollObject.RollType == "Attribute") {
		RollObject.PowerCardContent = "--desc --name|" + RollObject.DisplayName + " --leftsub|"+ RollObject.AttributeName + "" + " --rightsub|Stat Test  --custom_diceroll|";
	} else if (rollType == "Skill") {
		msgContent = "--desc --name|" + tokenName + " --leftsub|"+ attribute + "" + " --rightsub|Test  --diceroll|";
	}
 
	
	var characters = findObjs({ _type: "character", name: RollObject.CharacterName });
	var character = characters.shift();

	var rollDice = function (){
		sendChat("", "[[" + RollObject.DiceRollExpression + " ]]", function (m) {
			var rolldata = m[0].inlinerolls[1];
			RollObject.RawDiceRoll = rolldata.results.rolls;
			
			sendChat("", "[[" + RollObject.DamageRollExpression + " ]]", function (d) {
				var rolldata = d[0].inlinerolls[1];
				RollObject.RawDamageRoll = rolldata.results.rolls;
							
				sendChat("", "[[" + RollObject.DamageRollExpression + " ]]", function (d) {
					var rolldata = d[0].inlinerolls[1];
					RollObject.RawImpactRoll = rolldata.results.rolls;
								
					rollResult();
									
				});								
			});
		});
		

	}
	
	if (command == "!roll") {
		rollDice();
	}
  
	var rollResult = function() {
		
		RollObject.DiceRollResult = getResult(RollObject.RawDiceRoll);
							
		if (character) {
			var attributes = findObjs({ _type: "attribute", _characterid: character.get('_id') });
						
			_.each(attributes, function(obj) {    
				var attributeName = obj.get("name");
				
				if (attributeName == RollObject.AttributeName) {
					RollObject.AttributeValue = obj.get("current");
				}				
				
				if (RollObject.RangedAttack == false) {
					if (RollObject.PrimaryWeapon) {
						if (attributeName == "MeleeWeapon") {
							RollObject.WeaponName = obj.get("current");
						}
						if (attributeName == "MeleeDamage") {
							RollObject.DamageAdd = Number(obj.get("current"));
						}
					} else {
						if (attributeName == "MeleeWeapon") {
							RollObject.WeaponName = obj.get("max");
						}
						if (attributeName == "MeleeDamage") {
							RollObject.DamageAdd = Number(obj.get("max"));
						}
					}
				} else {
					if (RollObject.PrimaryWeapon) {
						if (attributeName == "RangedWeapon") {
							RollObject.WeaponName = obj.get("current");
						}
						if (attributeName == "RangedDamage") {
							RollObject.DamageAdd = Number(obj.get("current"));
						}
					} else {
						if (attributeName == "RangedWeapon") {
							RollObject.WeaponName = obj.get("max");
						}
						if (attributeName == "RangedDamage") {
							RollObject.DamageAdd = Number(obj.get("max"));
						}
					}
					if (attributeName == "Ammo") {
						RollObject.AmmoCount = Number(obj.get("current"));
						RollObject.AmmoMax = Number(obj.get("max"));
					}
				}
			});
					
		}
		
		modifiedExpression = Number(RollObject.AttributeValue) + Number(RollObject.TestModifier);
		
		var result = null;
		var difference = 0;
		var degrees = 0;
		var new_expression = 'result = (' + RollObject.DiceRollResult + ' ' + operator + ' ' + modifiedExpression + ');';
		
		try {
			eval(new_expression);
		} catch (e) {
			//log(e);
		}
		
		try {
		   difference = Math.abs(RollObject.DiceRollResult - eval(modifiedExpression));
		} catch (e) {
			//log(e);
		}
		
		try {
			degrees = Math.floor(difference / 10);
		} catch (e) {
			//log(e);
		}
		
		if (result) {
			RollObject.TestSuccess = true;
			if(RollObject.RollType == "Attack") {
				
				var x = RollObject.DiceRollResult;
				var y = x.toString();
				if (y.length == 2) {
					var z = y.split("").reverse().join("");
				} else {
					var z = y + "0";
				}
				
				var reverseRoll = Number(z);
				
				if(reverseRoll < 11) {
					RollObject.HitLocation = "Head";
					RollObject.HitLocationToolTip = RollObject.DiceRollResult + " reversed is " + reverseRoll + "; 01-10 strikes Head location";
				} else if (reverseRoll < 26) {
					RollObject.HitLocation = "Right Arm";
					RollObject.HitLocationToolTip = RollObject.DiceRollResult + " reversed is " + reverseRoll + "; 11-25 strikes Right Arm location";					
				} else if (reverseRoll < 41) {
					RollObject.HitLocation = "Left Arm";
					RollObject.HitLocationToolTip = RollObject.DiceRollResult + " reversed is " + reverseRoll + "; 26-40 strikes Left Arm location";
				} else if (reverseRoll < 81) {
					RollObject.HitLocation = "Body";
					RollObject.HitLocationToolTip = RollObject.DiceRollResult + " reversed is " + reverseRoll + "; 41-80 strikes Body location";
				} else if (reverseRoll < 91) {
					RollObject.HitLocation = "Right Leg";
					RollObject.HitLocationToolTip = RollObject.DiceRollResult + " reversed is " + reverseRoll + "; 81-90 strikes Right Leg location";
				} else if (reverseRoll < 101) {
					RollObject.HitLocation = "Left Leg";
					RollObject.HitLocationToolTip = RollObject.DiceRollResult + " reversed is " + reverseRoll + "; 91-100 strikes Left Arm location";
				}
				
				if (RollObject.TestSuccess) {
					RollObject.PowerCardContent += " --custom_dmgroll| ";
				};				
			} 			
		}
		

		if(RollObject.RangedAttack == true) {  
			reduceAmmo(character);
		}		
		
		RollObject.DegreesOfSuccess = (degrees + 1);
		RollObject.DegreesOfSuccessToolTip = "Difference of " + difference;
		
		
		RollObject.DiceRollResultToolTip = "Rolling 1d100(" + RollObject.DiceRollResult + ") versus " + RollObject.AttributeName + " (" + RollObject.AttributeValue + ") " + ( (RollObject.TestModifier > -1) ? " + " : "") + RollObject.TestModifier;
		
		RollObject.DamageRollResult = getResult(RollObject.RawDamageRoll)
		RollObject.DamageRollTotal = RollObject.DamageRollResult + RollObject.DamageAdd;
		RollObject.DamageRollTotalToolTip = "Rolling 1d10(" + RollObject.DamageRollResult + ") " + ((RollObject.DamageAdd > -1) ? "+ " : "- ") + Math.abs(RollObject.DamageAdd) + " = (" + RollObject.DamageRollTotal + ")";
		
		if (RollObject.WeaponName == "Pistol") {RollObject.ImpactWeapon = true};
		RollObject.ImpactRollResult = getResult(RollObject.RawImpactRoll)
		RollObject.ImpactRollTotal = RollObject.ImpactRollResult + RollObject.DamageAdd;
		RollObject.ImpactRollTotalToolTip = "Rolling 1d10(" + RollObject.ImpactRollResult + ") " + ((RollObject.DamageAdd > -1) ? "+ " : "- ") + Math.abs(RollObject.DamageAdd) + " = (" + RollObject.ImpactRollTotal + ")";
					
		createPowerCard(msg, RollObject);
	}
});

var reduceAmmo = function(character) {

	var targetsMatched = findObjs({_type: "graphic", represents: character.get('_id')});
	if(targetsMatched.length === 0) {
		sendChat(msg.who, "target " + character + " not found.");
	}

	// Reduce the value of bar2 on the token by 1.
	for(var x in targetsMatched) {
		var target = targetsMatched[x];

		if(target.get("bar2_value") !== "") {
			target.set("bar2_value", (target.get("bar2_value") - 1));
		}

	}
};

PowerCardScript.buildInline = function (expression, rolls, crit) {
	var InlineBorderRadius = (POWERCARD_ROUNDED_INLINE_ROLLS) ? 5 : 0;
	var rollOut = '<span style="text-align: center; vertical-align: text-middle; display: inline-block; min-width: 1.75em; border-radius: ' + InlineBorderRadius + 'px; padding: 2px 0px 0px 0px;" title="Rolling ' + expression + ' = ';
	var failRoll = critRoll = false;
	var modTotal = 0;
	var math;
	
	for (var k in rolls) {
		var low = (String(rolls[rolls.length - 1].text).trim().toLowerCase().indexOf("lr") != -1) ? parseInt(String(rolls[rolls.length - 1].text).trim().substring(2)) : 1;
		if (rolls.hasOwnProperty(k)) {
			var r = rolls[k];
			var max = (crit !== undefined && r.sides == 20) ? crit : r.sides;
			// ROLL.TYPE Roll
			if (r.type == 'R') {
				rollOut += '(';
				for (var m = 0; m < r.results.length; m++) {
					var value = r.results[m].v;
					var drop = r.results[m].d;
					if (!drop) {
						switch (math) {
						default:
						case '+':
							modTotal += value;
							math = '';
							break;
						case '-':
							modTotal -= value;
							math = '';
							break;
						case '*':
							modTotal *= value;
							math = '';
							break;
						case '/':
							modTotal /= value;
							math = '';
							break;
						}
					}
					critRoll = critRoll || (value >= max);
					failRoll = failRoll || (value <= low);
					rollOut += '<span class=\'basicdiceroll' + (value == max ? ' critsuccess' : (value == low ? ' critfail' : '')) + '\'>';
					rollOut += value + '</span>+';
				}
				rollOut = rollOut.substring(0, rollOut.length - 1) + ')';
			}
            
			// ROLL.TYPE Math
			var operator, operand;
			if (r.type == 'M') {
				rollOut += r.expr;
				if (r.expr.length == 1) {
					math = r.expr;
				} else {
					operator = ('' + r.expr).substring(0, 1);
					operand = ('' + r.expr).substring(operator.search(/[\d(]/) === 0 ? 0 : 1);
				}
                
				if (operand.search(/([\d+\-*/() d]|floor\(|ceil\()+\)?/g) === 0) {
					operand = operand.split('floor').join('Math.floor');
					operand = operand.split('ceil').join('Math.ceil');
					operand = eval((operator == '-' ? '-' : '') + operand);
				} else {
					operand = parseInt(operand);
				}
                
				switch (operator) {
				default:
				case '+':
				case '-':
					modTotal += operand;
					break;
				case '*':
					modTotal *= operand;
					break;
				case '/':
					modTotal /= operand;
					break;
				}
			}
            
            if (r.type == 'G') {
                // Do nothing...
            }
		}
	}
	rollOut += '" class="a inlinerollresult showtip tipsy-n';
	rollOut += (critRoll && failRoll ? ' importantroll' : (critRoll ? ' fullcrit' : (failRoll ? ' fullfail' : ''))) + '">' + modTotal + '</span>';
	return rollOut;
};

// These functions determine the brightness of a html color hexcode.
// Copied from:	  http://blog.routydevelopment.com/2010/07/how-to-s...

function getBrightness(hex) {
	hex = hex.replace('#', '');
	var c_r = hexDec(hex.substr(0, 2));
	var c_g = hexDec(hex.substr(2, 2));
	var c_b = hexDec(hex.substr(4, 2));
	return ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
}


function hexDec(hex_string) {
	hex_string = (hex_string + '').replace(/[^a-f0-9]/gi, '');
	return parseInt(hex_string, 16);
}

function createPowerCard (msg, RollObject) {
	//Custom Variables 
	var critRoll = false;
	var failRoll = false;
	
	// DEFINE VARIABLES
	var n = RollObject.PowerCardContent.split(" --"); //Customised this line
	var PowerCard = {};
	var DisplayCard = "";
	var NumberOfAttacks = 1;
	var NumberOfDmgRolls = 1;
	var Tag = "";
	var Content = "";
	
	// CREATE POWERCARD OBJECT ARRAY
	var a = 1;
	while (n[a]) {
		Tag = n[a].substring(0, n[a].indexOf("|"));
		Content = n[a].substring(n[a].indexOf("|") + 1);
		if (Tag.substring(0, 6).toLowerCase() == "attack") {
			NumberOfAttacks = Tag.substring(6);
			if (NumberOfAttacks === 0 || !NumberOfAttacks) NumberOfAttacks = 1;
			Tag = "attack";
		}
		if (Tag.substring(0, 6).toLowerCase() == "damage") {
			NumberOfDmgRolls = Tag.substring(6);
			if (NumberOfDmgRolls === 0 || !NumberOfDmgRolls) NumberOfDmgRolls = 1;
			Tag = "damage";
		}
		PowerCard[Tag] = Content;
		a++;
	}
	
	// CREATE TITLE STYLE
	var TitleStyle = " font-family: Georgia; font-size: large; font-weight: normal; text-align: center; vertical-align: middle; padding: 5px 0px; margin-top: 0.2em; border: " + POWERCARD_BORDER_SIZE + "px solid " + POWERCARD_BORDER_COLOR + ";";
	
	// ROUNDED CORNERS ON TOP OF POWER CARD
	TitleStyle += (POWERCARD_ROUNDED_CORNERS) ? " border-radius: 10px 10px 0px 0px;" : "";
	
	// LIST OF PRE-SET TITLE TEXT & BACKGROUND COLORS
	var AtWill = " color: #FFF; background-color: #040;";
	var Encounter = " color: #FFF; background-color: #400;";
	var Daily = " color: #FFF; background-color: #444;";
	var Item = " color: #FFF; background-color: #e58900;";
	var Recharge = " color: #FFF; background-color: #004;";
	
	// CHECK FOR PRESET TITLE COLORS
	if (!POWERCARD_USE_PLAYER_COLOR) {
		if (PowerCard.usage !== undefined && PowerCard.txcolor === undefined && PowerCard.bgcolor === undefined) {
			// PRESET TITLE COLORS
			TitleStyle += AtWill;
			if (PowerCard.usage.toLowerCase() == "encounter") TitleStyle += Encounter;
			if (PowerCard.usage.toLowerCase() == "daily") TitleStyle += Daily;
			if (PowerCard.usage.toLowerCase() == "item") TitleStyle += Item;
			if (PowerCard.usage.toLowerCase().substring(0, 8) == "recharge") TitleStyle += Recharge;
		} else {
			// CUSTOM TITLECARD TEXT & BACKGROUND COLORS
			TitleStyle += (PowerCard.txcolor !== undefined) ? " color: " + PowerCard.txcolor + ";" : " color: #FFF;";
			TitleStyle += (PowerCard.bgcolor !== undefined) ? " background-color: " + PowerCard.bgcolor + ";" : " background-color: #040;";
		}
	} else {
		// SET TITLE BGCOLOR TO PLAYER COLOR --- OVERRIDES ALL OTHER COLOR OPTIONS ---
		var PlayerBGColor = getObj("player", msg.playerid).get("color");
		var PlayerTXColor = "#000";
		if (getBrightness(PlayerBGColor) < 50) {
			PlayerTXColor = "#FFF";
		}
		TitleStyle += " color: " + PlayerTXColor + "; background-color: " + PlayerBGColor + ";";
	}
	
	// DEFINE .leftsub and .rightsub
	if (PowerCard.leftsub === undefined) PowerCard.leftsub = (PowerCard.usage !== undefined) ? PowerCard.usage : "";
	if (PowerCard.rightsub === undefined) PowerCard.rightsub = (PowerCard.action !== undefined) ? PowerCard.action : "";
	var PowerCardDiamond = (PowerCard.leftsub == "" || PowerCard.rightsub == "") ? "" : " ♦ ";
	
	// BEGIN DISPLAYCARD CREATION
	DisplayCard += "<div style='" + TitleStyle + "'>" + PowerCard.name;
	DisplayCard += (PowerCard.leftsub !== "" || PowerCard.rightsub !== "") ? "<br><span style='font-family: Tahoma; font-size: small; font-weight: normal;'>" + PowerCard.leftsub + PowerCardDiamond + PowerCard.rightsub + "</span></div>" : "</div>";
	
	// ROW STYLE VARIABLES
	var OddRow = " background-color: #CEC7B6; color: #000;";
	var EvenRow = " background-color: #B6AB91; color: #000;";
	var RowStyle = " padding: 5px; border-left: " + POWERCARD_BORDER_SIZE + "px solid " + POWERCARD_BORDER_COLOR + "; border-right: " + POWERCARD_BORDER_SIZE + "px solid " + POWERCARD_BORDER_COLOR + "; border-radius: 0px;";
	var RowBackground = OddRow;
	var RowNumber = 1;
	var Indent = 0;
	var KeyCount = 0;
	
	// KEY LOOP
	var Keys = Object.keys(PowerCard);
	var ReservedTags = "attack, damage, custom_diceroll, custom_dmgroll"; //Note - Have to add in the custom tags here.
	var IgnoredTags = "emote, name, usage, action, defense, dmgtype, txcolor, bgcolor, leftsub, rightsub, ddn, desc, crit";
	while (KeyCount < Keys.length) {
		Tag = Keys[KeyCount];
		Content = PowerCard[Keys[KeyCount]];
		if (Tag.charAt(0) === "^") {
			Indent = (parseInt(Tag.charAt(1)) > 0) ? Tag.charAt(1) : 1;
			Tag = (parseInt(Tag.charAt(1)) > 0) ? Tag.substring(2) : Tag.substring(1);
			RowStyle += " padding-left: " + (Indent * 1.5) + "em;";
		}
		
		// CHECK FOR RESERVED & IGNORED TAGS
		if (ReservedTags.indexOf(Tag) != -1) {
			// ATTACK ROLLS
				if (Tag.toLowerCase() == "attack") {
					var AttackMessage = PowerCard.attack.substring(PowerCard.attack.indexOf("]]") + 2);
					var AttackNumber = parseInt(PowerCard.attack.slice(PowerCard.attack.indexOf("[[") + 2, PowerCard.attack.indexOf("]]")));

					for (var AttackCount = 0; AttackCount < NumberOfAttacks; AttackCount++) {
						RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
						RowNumber += 1;
						if (PowerCard.ddn === undefined) {
							DisplayCard += "<div style='" + RowStyle + RowBackground + "'>$[[" + AttackNumber + "]] vs " + PowerCard.defense + AttackMessage + "</div>";
						} else {
							DisplayCard += "<div style='" + RowStyle + RowBackground + "'>$[[" + AttackNumber + "]]" + AttackMessage + " vs Armor Class</div>";
						}
						if (NumberOfAttacks > 1 && PowerCard.ddn === undefined) AttackMessage = "";
					}
				}
			
			// Custom Dice Rolls
			if (Tag.toLowerCase() == "custom_diceroll") {
				critRoll = false;
				failRoll = false;
				if (RollObject.DiceRollResult > 95) {failRoll = true};
				if (RollObject.DiceRollResult < 6) {critRoll = true};
								
				if (RollObject.RollType == "Attack") {
					RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
					RowNumber += 1;
					DisplayCard += "<div style='" + RowStyle + RowBackground + "'><b>Weapon:</b> " + RollObject.WeaponName + "</div>";
				} else if (RollObject.RollType == "Attribute") {
					RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
					RowNumber += 1;
					DisplayCard += "<div style='" + RowStyle + RowBackground + "'><b>" + RollObject.AttributeName + ":</b> " + RollObject.AttributeValue + "</div>";
				}
				
				RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
				RowNumber += 1;
				DisplayCard += "<div style='" + RowStyle + RowBackground + "'><b>" + ((RollObject.RollType == "Attack") ? "Attack" : "Skill") + " Modifier:</b> " + ( (RollObject.TestModifier>0) ? "+" : "") + RollObject.TestModifier + "</div>";
				
				if (RollObject.RangedAttack == true) {
					RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
					RowNumber += 1;
					DisplayCard += "<div style='" + RowStyle + RowBackground + "'><b>Ammo:</b> " + RollObject.AmmoCount + "/" + RollObject.AmmoMax + " subtract 1</div>";	
				}
				
				RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
				RowNumber += 1;
				DisplayCard += "<div style='" + RowStyle + RowBackground + "'> Rolled a <span style=\"text-align: center; vertical-align: text-middle; display: inline-block; min-width: 1.75em; border-radius: 5px; padding: 2px 0px 0px 0px;\" title=\"" + RollObject.DiceRollResultToolTip + "\" class=\"a inlinerollresult showtip tipsy-n " + (critRoll && failRoll ? ' importantroll' : (critRoll ? ' fullcrit' : (failRoll ? ' fullfail' : ''))) + "\">" + RollObject.DiceRollResult + "</span> </div>";
				
				RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
				RowNumber += 1;
				DisplayCard += "<div style='" + RowStyle + RowBackground + "'>" + ((RollObject.RollType == "Attack") ? (RollObject.TestSuccess ? 'Hit' : 'Missed') : (RollObject.TestSuccess ? 'Succeeded' : 'Failed')) + " with <span style=\"text-align: center; vertical-align: text-middle; display: inline-block; min-width: 1.75em; border-radius: 5px; padding: 2px 0px 0px 0px;\" title=\"" + RollObject.DegreesOfSuccessToolTip + "\" class=\"a inlinerollresult showtip tipsy-n\">" + RollObject.DegreesOfSuccess + "</span> degrees of " + (RollObject.TestSuccess ? 'success' : 'failure') + "</div>";
				
			}
			
			// Custom Damage Roll
			if (Tag.toLowerCase() == "custom_dmgroll") {
				critRoll = false;
				failRoll = false;
				if (RollObject.DamageRollResult == 1) {failRoll = true};
				if (RollObject.DamageRollResult == 10) {critRoll = true};
				
				RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
				RowNumber += 1;
				DisplayCard += "<div style='" + RowStyle + RowBackground + "'><b>Damage:</b> " + "1d10 " + ((RollObject.DamageAdd > -1) ? "+ " : "- ") + Math.abs(RollObject.DamageAdd) + "</div>";				

				if (RollObject.ImpactWeapon == true) {
					RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
					RowNumber += 1;
					DisplayCard += "<div style='" + RowStyle + RowBackground + "'><b>Qualities:</b> " + "Impact" + "</div>";				
				}
				
				RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
				RowNumber += 1;
				DisplayCard += "<div style='" + RowStyle + RowBackground + "'>Target takes <span style=\"text-align: center; vertical-align: text-middle; display: inline-block; min-width: 1.75em; border-radius: 5px; padding: 2px 0px 0px 0px;\" title=\"" + RollObject.DamageRollTotalToolTip + "\" class=\"a inlinerollresult showtip tipsy-n" + (critRoll ? ' fullcrit' : (failRoll ? ' fullfail' : '')) + "\">" + RollObject.DamageRollTotal + "</span> damage to the <span style=\"text-align: center; vertical-align: text-middle; display: inline-block; min-width: 1.75em; border-radius: 5px; padding: 2px 0px 0px 0px;\" title=\"" + RollObject.HitLocationToolTip + "\" class=\"a inlinerollresult showtip tipsy-n\">" + RollObject.HitLocation + "</span>" + "</div>";
				
				if (RollObject.ImpactWeapon == true) {
					critRoll = false;
					failRoll = false;
					if (RollObject.ImpactRollResult == 1) {failRoll = true};
					if (RollObject.ImpactRollResult == 10) {critRoll = true};
				
					RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
					RowNumber += 1;
					DisplayCard += "<div style='" + RowStyle + RowBackground + "'>" + "- or - " + "</div>";				
					
					RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
					RowNumber += 1;
					DisplayCard += "<div style='" + RowStyle + RowBackground + "'>Target takes <span style=\"text-align: center; vertical-align: text-middle; display: inline-block; min-width: 1.75em; border-radius: 5px; padding: 2px 0px 0px 0px;\" title=\"" + RollObject.ImpactRollTotalToolTip + "\" class=\"a inlinerollresult showtip tipsy-n" + (critRoll ? ' fullcrit' : (failRoll ? ' fullfail' : '')) + "\">" + RollObject.ImpactRollTotal + "</span> damage to the <span style=\"text-align: center; vertical-align: text-middle; display: inline-block; min-width: 1.75em; border-radius: 5px; padding: 2px 0px 0px 0px;\" title=\"" + RollObject.HitLocationToolTip + "\" class=\"a inlinerollresult showtip tipsy-n\">" + RollObject.HitLocation + "</span>" + "</div>";
				}
				
			}
						   
			// DAMAGE ROLLS
			if (Tag.toLowerCase() == "damage") {
				var DamageMessage = PowerCard.damage.substring(PowerCard.damage.indexOf("]]") + 2);
				var DamageNumber = parseInt(PowerCard.damage.slice(PowerCard.damage.indexOf("[[") + 2, PowerCard.damage.indexOf("]]")));
				if (PowerCard.dmgtype === undefined) PowerCard.dmgtype = "";
				for (var DamageCount = 0; DamageCount < NumberOfDmgRolls; DamageCount++) {
					RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
					RowNumber += 1;
					DisplayCard += "<div style='" + RowStyle + RowBackground + "'>$[[" + DamageNumber + "]] " + PowerCard.dmgtype + " " + DamageMessage + "</div>";
				}
			}
		} else if (IgnoredTags.indexOf(Tag.toLowerCase()) != -1) {
			// Do nothing
		} else {
			RowBackground = (RowNumber % 2 == 1) ? OddRow : EvenRow;
			RowNumber += 1;
			DisplayCard += "<div style='" + RowStyle + RowBackground + "'><b>" + Tag + ":</b> " + Content + "</div>";
		}
		KeyCount++;
	}
	
	// ADD ROUNDED CORNERS & BORDER TO BOTTOM OF POWER CARD
	if (POWERCARD_ROUNDED_CORNERS && KeyCount == (Keys.length)) DisplayCard = DisplayCard.replace(/border-radius: 0px;(?!.*border-radius: 0px;)/g, "border-radius: 0px 0px 10px 10px; border-bottom: " + POWERCARD_BORDER_SIZE + "px solid " + POWERCARD_BORDER_COLOR + ";");
	if (!POWERCARD_ROUNDED_CORNERS && POWERCARD_BORDER_SIZE) DisplayCard = DisplayCard.replace(/border-radius: 0px;(?!.*border-radius: 0px;)/g, "border-bottom: " + POWERCARD_BORDER_SIZE + "px solid " + POWERCARD_BORDER_COLOR + ";");
	// INLINE ROLLS REPLACEMENT
	var Count = 0;
	if (msg.inlinerolls !== undefined) {
		while (Count < msg.inlinerolls.length) {
			// Replace inline roll placeholder in DisplayCard
			var numCopies = DisplayCard.split("$[[" + Count + "]]").length - 1;
			for (var i = 0; i < numCopies; i++) {
				sendChat("", Count + " [[" + msg.inlinerolls[Count].expression + " ]]", function (m) {
					var idx = parseInt(m[0].content.split(" ")[0]);
					var rolldata = m[0].inlinerolls[1];
					var inlineroll = PowerCardScript.buildInline(
						rolldata.expression, 
						rolldata.results.rolls, 
						PowerCard.crit
					);
					DisplayCard = DisplayCard.replace("$[[" + idx + "]]", inlineroll);
					if (DisplayCard.search(/\$\[\[\d+\]\]/g) == -1) {
						// SEND OUTPUT TO CHAT
						if (PowerCard.emote !== undefined) sendChat(msg.who, "/emas " + PowerCard.emote);
						if (PowerCard.desc !== undefined) sendChat("", "/desc ");
						sendChat("", "/direct " + DisplayCard);
					}
				});
			}
			Count += 1;
		}
	} else {
		if (PowerCard.emote !== undefined) sendChat(msg.who, "/emas " + PowerCard.emote);
		if (PowerCard.desc !== undefined) sendChat("", "/desc ");
		sendChat("", "/direct " + DisplayCard);
	}
	
}


var getResult = function (rolls) {
	var modTotal = 0;
	var math;
    
	for (var k in rolls) {
		if (rolls.hasOwnProperty(k)) {
			var r = rolls[k];
			// ROLL.TYPE Roll
			if (r.type == 'R') {
				for (var m = 0; m < r.results.length; m++) {
					var value = r.results[m].v;
					var drop = r.results[m].d;
					if (!drop) {
						switch (math) {
						default:
						case '+':
							modTotal += value;
							math = '';
							break;
						case '-':
							modTotal -= value;
							math = '';
							break;
						case '*':
							modTotal *= value;
							math = '';
							break;
						case '/':
							modTotal /= value;
							math = '';
							break;
						}
					}
				}
			}
            
			// ROLL.TYPE Math
			var operator, operand;
			if (r.type == 'M') {
				if (r.expr.length == 1) {
					math = r.expr;
				} else {
					operator = ('' + r.expr).substring(0, 1);
					operand = ('' + r.expr).substring(operator.search(/[\d(]/) === 0 ? 0 : 1);
				}
                
				if (operand.search(/([\d+\-*/() d]|floor\(|ceil\()+\)?/g) === 0) {
					operand = operand.split('floor').join('Math.floor');
					operand = operand.split('ceil').join('Math.ceil');
					operand = eval((operator == '-' ? '-' : '') + operand);
				} else {
					operand = parseInt(operand);
				}
                
				switch (operator) {
				default:
				case '+':
				case '-':
					modTotal += operand;
					break;
				case '*':
					modTotal *= operand;
					break;
				case '/':
					modTotal /= operand;
					break;
				}
			}
            
            if (r.type == 'G') {
                // Do nothing...
            }
			
			if (r.type == 'V') {
                // Do nothing...
            }
		}
	}
	return modTotal;
};
