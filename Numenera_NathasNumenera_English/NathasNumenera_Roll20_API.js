//---------------------------------------------------------------------------------------------------------------------------------------------
function attrib(characterObj,attributeObjArray,newValue,tokenObj) {
        //Change the value of one character's attribute
        var attributeName = attributeObjArray[0].get("name");
    			var attributeValue = attributeObjArray[0].get("current");
				var characterName = characterObj.get("name");
        var maxValue = 0;
        var finalValue = 0;
        var attributeLib = "";
        var checkState = 0;
        // debug
        // sendChat("", "/desc " + attributeName + " " + newValue + ".");
		switch (attributeName) {
            case "might" :
                maxValue = parseInt(attributeObjArray[0].get("max"));
                finalValue = parseInt(attributeValue) + parseInt(newValue);
                attributeLib = "Might";
                checkState = 1;
                break;
            case "speed" :
                maxValue = parseInt(attributeObjArray[0].get("max"));
                finalValue = parseInt(attributeValue) + parseInt(newValue);
                attributeLib = "Speed";
                checkState = 1;
                break;            
            case "intellect" :
                maxValue = parseInt(attributeObjArray[0].get("max"));
                finalValue = parseInt(attributeValue) + parseInt(newValue);
                attributeLib = "Intellect";                
                checkState = 1;
                break;
            default:
                finalValue = newValue;
                maxValue = newValue;
                attributeLib = attributeName;
        }
        if (finalValue > maxValue) {
            finalValue = maxValue;
        }
        else {
            if (finalValue < 0) {
                finalValue = 0;
            };
        };		
        //set the attribute
        attributeObjArray[0].set("current", finalValue);
        //if attribute was one of the stats, call the function to check the damage track and token's markers
		if (checkState == 1) {
            checkCharStates(characterObj,tokenObj);
		};
		//output
		sendChat("character|"+characterObj.get("id"), "<span style='color:blue;'>" + attributeLib + "("+attributeName+")" + "</span> : " + attributeValue + " -> " + finalValue + ".");
};
//---------------------------------------------------------------------------------------------------------------------------------------------
function checkCharStates(characterObj,tokenObj) {
    // check and sets the damage track, and markers on the character's token, according to the stats
    var might = 0;
    var speed = 0;
    var intellect = 0;
    var damage = 0;
    var CurrentDamage = 0;
    // reading all relevant stats and attributes from the character
    might = parseInt(getAttrByName(characterObj.id, "might", "current"));
    speed = parseInt(getAttrByName(characterObj.id, "speed", "current"));
    intellect = parseInt(getAttrByName(characterObj.id, "intellect", "current"));
    // calculating the damage track depending on the stats
    // and setting the right markers depending on the damage track
    if (might <= 0) {damage = damage +1};
    if (speed <= 0) {damage = damage +1};
    if (intellect <= 0) {damage = damage +1};
    CurrentDamage = parseInt(getAttrByName(characterObj.id, "damage-track", "current"));
    //sendChat("character|"+characterObj.get("id"), "Debug : Might = " + might + ", Damage Track = " + CurrentDamage + ", Damage = " + damage);
    if (CurrentDamage != damage) {
        var attDmgArray = findObjs({
            _type: 'attribute',
            name: "damage-track",
            _characterid: characterObj.id
        });
        attDmgArray[0].set("current",damage);
        switch (damage) {
            case 0 : //hale / normal state
                tokenObj.set("status_yellow",false);
                tokenObj.set("status_red",false);
                tokenObj.set("status_dead",false);
                break;
            case 1 : // impaired
                tokenObj.set("status_yellow",true);
                tokenObj.set("status_red",false);
                tokenObj.set("status_dead",false);
                break;
            case 2 : // disabled
                tokenObj.set("status_yellow",true);
                tokenObj.set("status_red",true);
                tokenObj.set("status_dead",false);
                break; 
            case 3 : // dead
                tokenObj.set("status_yellow",false);
                tokenObj.set("status_red",false);
                tokenObj.set("status_dead",true);
                break;            
        }
    };
};
//---------------------------------------------------------------------------------------------------------------------------------------------
function restChar(characterObj,tokenObj) {
  //Total rest for the character/10 hours sleep
	var characterName = characterObj.get("name");    
    // MIGHT
    var attObjArray = findObjs({
                    _type: 'attribute',
                    name: "might",
                    _characterid: characterObj.id
                });
    attObjArray[0].set("current", attObjArray[0].get("max"));
    // SPEED, taking account of the armor speed reduction
    attObjArray = findObjs({
                    _type: 'attribute',
                    name: "speed",
                    _characterid: characterObj.id
                });
    var maxspeed = parseInt(attObjArray[0].get("max"));
    var speedreduction = parseInt(getAttrByName(characterObj.id, "armor-speed-reduction", "current"));
    attObjArray[0].set("current", maxspeed - speedreduction);
    // INTELLECT
    attObjArray = findObjs({
                    _type: 'attribute',
                    name: "intellect",
                    _characterid: characterObj.id
                });
    attObjArray[0].set("current",  attObjArray[0].get("max"));
    //Recovery rolls
    attObjArray = findObjs({
                    _type: 'attribute',
                    name: "recovery-rolls",
                    _characterid: characterObj.id
                });
    attObjArray[0].set("current", "0");
    //Markers & States & Damage track
    checkCharStates(characterObj,tokenObj);
    //output
	sendChat("character|"+characterObj.get("id"), "<span style='color:green;'>is completly rested.</span>");
};
//---------------------------------------------------------------------------------------------------------------------------------------------
function initRoll(characterObj,tokenObj,efforts,rollBonus,statexp) {
  // WARNING : 
  ///    - Not the standard Numenera initiative roll : Add the effort and rollbonus to the roll and add it to the tracker.
  //     - Meant to be sorted/compared to (Level*3) of the NPCs/Creatures
  //     - Works only for characters, not for NPCs. Use a macro using the NCP/Creature level to add it to the tracker (level*3)
  //     - If used twice without reseting the turn tracker, the character's added twice ...
    var charId = characterObj.get("id");
    var speedPool = 0;
    var speedEdge = 0;
    var attrEffort = 0;
    //getting the stats values
    var attributeObjArray = findObjs({
                    _type: 'attribute',
                    name: 'speed',
                    _characterid: characterObj.id
                });
    if (attributeObjArray == false) {
        sendChat("", "/desc  ERROR : initRoll() : attribute 'speed' unknown.");        
        return;
    } else {
        speedPool=parseInt(attributeObjArray[0].get("current"));
    };
    speedEdge = parseInt(getAttrByName(characterObj.id, "speededge", "current"));
    attrEffort = parseInt(getAttrByName(characterObj.id, "effort", "current"));
    var damagetrack=parseInt(getAttrByName(characterObj.id, "damage-track", "current"));
    var bonusToRoll = parseInt(rollBonus);
    // Rolling the dice
    var diceRoll = randomInteger(20);
    // checking for appliable effort 
    // and calculating statpool cost        
    var effortsUsed = 0;
    effortsUsed = parseInt(efforts);
    var statExpense = parseInt(statexp);
    var effortCost = 0;
    var totalCost = 0;
    if ((effortsUsed > 0) || (statExpense > 0)) {
        if (effortsUsed > 0) {
            if (effortsUsed > attrEffort) {
                sendChat("character|"+charId, "<span style='color:red;'>tries to apply more effort ("+effortsUsed+") than (s)he's able to ("+attrEffort+").</span>");
                return;        
            } else {
                effortCost = 1 + (effortsUsed * (2+damagetrack) );    
            };
        };
        // effort cost is spent if the roll is not 20
        if (diceRoll != 20) {
            totalCost = effortCost + statExpense - speedEdge;
            if (totalCost > speedPool) {
                sendChat("character|"+charId, "<span style='color:red;'>tries to spend more Speed points ("+totalCost+") than (s)he has left ("+speedPool+").</span>");
                return;                    
            } else {
                speedPool = speedPool - totalCost;
                attributeObjArray[0].set("current",speedPool);
                checkCharStates(characterObj,tokenObj);
            };
        };
    };
    // Calclating initiative
    var finalRoll = diceRoll + (effortsUsed*3) + bonusToRoll;
    var turnorder;
    if(Campaign().get("turnorder") == "") {
        turnorder = [];
    } else turnorder = JSON.parse(Campaign().get("turnorder"));
    turnorder.push({
        id: tokenObj.id,
        pr: finalRoll,
    });
    turnorder.sort(function(a,b) {
        first = a.pr;
        second = b.pr;
        
        return second - first;
    });
    Campaign().set("turnorder", JSON.stringify(turnorder));    
    //output
        // Checking result
    var success = "<b><span style='color:blue;'>Initiative roll : " + finalRoll + "</span> (" + diceRoll + ")</b><ul style='list-style-type : disc;'>";
    if ((effortsUsed > 0) || (statExpense > 0)) {
        success = success + "<li>Spending " + totalCost + " Speed points (" + effortCost + "+" + statExpense + "-" + speedEdge + ").</li>";
    };
    if (effortsUsed > 0) {
        success = success + "<li>Applying " + effortsUsed + " <u>Effort(s)</u>.</li>";
    };
    if (bonusToRoll != 0) {
        success = success + "<li>With a roll <u>Bonus</u> of " + bonusToRoll + ".</li>";
    };    
    sendChat("character|"+charId, ""+success+"</ul>");
};
//---------------------------------------------------------------------------------------------------------------------------------------------
function numeneRoll(characterObj,tokenObj,statName,difficulty,efforts,rollBonus,statexp,whoRolled) {
    // ROll D20 with eventual might, speed or intellect effort(s), versus a difficulty (optional),
    // with optional appiable effort, optional bonus to the roll, 
    // and optional more stat points expenditure (like a special ability cost and/or damage effort)
    // difficulty is the level of difficulty, not the target number. The target number is calculated by the function.
    // if difficulty is 0, the roll still happens, but is not confronted to any difficulty
    // stat pool is diminished except if it rolls 20
    // checkstate is called is stat pool is dimished
    
    var charId = characterObj.get("id");
    //checking the character damage track
    var damagetrack=parseInt(getAttrByName(characterObj.id, "damage-track", "current"));
    if (damagetrack > 1) {
        sendChat("character|"+charId, "<span style='color:red;'>can't take action (debilitated or dead).</span>");
        return;
    };
    // checking the stat
    var attributeName = "";
    var edgename = "";
    if(statName == "might" || statName == "speed" || statName == "intellect") {
        attributeName = statName;
        edgename = statName + "edge";
    	// Stat text to show in chat
        var attNameInChat = "";
        switch (statName) {
            case "might" :
                attNameInChat = "Might";
                break;
            case "speed" :
                attNameInChat = "Speed";
                break;
            case "intellect" :
                attNameInChat = "Intellect";
                break;
        }
    } else {
        sendChat("", "/desc ERROR : numeneRoll() : stat " + statName + " unknown.");
        return;        
    };
    
    //getting the stats values
    var attrPool = 0;
    var attrEdge = 0;
    var attrEffort = 0;
    var attributeObjArray = findObjs({
                    _type: 'attribute',
                    name: attributeName,
                    _characterid: characterObj.id
                });
    if (attributeObjArray == false) {
        sendChat("", "/desc ERROR : numeneRoll() : attribute " + attributeName + " unknown.");
        return;
    } else {
        attrPool=parseInt(attributeObjArray[0].get("current"));
    };
    attrEdge = parseInt(getAttrByName(characterObj.id, edgename, "current"));
    attrEffort = parseInt(getAttrByName(characterObj.id, "effort", "current"));

    //Checking the bonus to roll
    var bonusToRoll = parseInt(rollBonus);
    if( bonusToRoll >= 3 ) {
        sendChat("character|"+charId, "<span style='color:red;'>bonus of 3 or more ("+bonusToRoll+") are not authorized (lower the Level/Difficulty with an Asset instead)</span>.");
        return;
    };
    // Rolling the dice
    var diceRoll = randomInteger(20);
    var finalRoll = diceRoll + bonusToRoll;

    // checking for appliable effort 
    // and calculating statpool cost        
    var effortsUsed = 0;
    effortsUsed = parseInt(efforts);
    var statExpense = parseInt(statexp);
    var effortCost = 0;
    var totalCost = 0;
    if ((effortsUsed > 0) || (statExpense > 0)) {
        if (effortsUsed > 0) {
            if (effortsUsed > attrEffort) {
                sendChat("character|"+charId, "<span style='color:red;'>tries to apply more effort ("+effortsUsed+") than (s)he's able to ("+attrEffort+").</span>");
                return;        
            } else {
                effortCost = 1 + (effortsUsed * (2+damagetrack) );    
            };
        };
        // effort cost is spent if the roll is not 20
        if (diceRoll != 20) {
            totalCost = effortCost + statExpense - attrEdge;
            if (totalCost > attrPool) {
                sendChat("character|"+charId, "<span style='color:red;'>tries to spend more stat points ("+totalCost+") than (s)he has left ("+attrPool+").</span>");
                return;                    
            } else {
                attrPool = attrPool - totalCost;
                attributeObjArray[0].set("current",attrPool);
                checkCharStates(characterObj,tokenObj);
            };
        };
    };
    
    //computing target task
    var targetRoll = 0;
    if (parseInt(difficulty) > 0) {
        targetRoll = (parseInt(difficulty)-effortsUsed)*3;
    };
    
    // Checking result
    var success = "<b><span style='color:blue;'>" + attNameInChat + " roll</span></b><ul style='list-style-type : disc;'>";
    var specialEffect = "";
    if ((effortsUsed > 0) || (statExpense > 0)) {
        success = success + "<li>Spending " + totalCost + " point(s) (" + effortCost + "+" + statExpense + "-" + attrEdge + ").</li>";
    };
    if (effortsUsed > 0) {
        success = success + "<li>Applying " + effortsUsed + " <u>Effort(s)</u>.</li>";
    };
    if (bonusToRoll != 0) {
        success = success + "<li>With a <u>Bonus</u> of " + bonusToRoll + ".</li>";
    };    
    // If not an automatic success or a known difficulty
    if (targetRoll > 0) {
        success = success + "<li>Against a <u>Difficulty</u> of " + difficulty + " (final target : " + targetRoll + ").</li>";
        if( finalRoll >= targetRoll) {
            success = success + "<li><strong><span style='color:green;'>Success (" + diceRoll+"+"+bonusToRoll+" = "+finalRoll + ")!</span></strong></li>";
        }
        else{
            success = success + "<li><strong><span style='color:red;'>Failure (" + diceRoll+"+"+bonusToRoll+" = "+finalRoll + ")!</span></strong></li>";
        };
        //special dice roll result treatment
        if (diceRoll == 1) {
                specialEffect = "<li><u>Effect</u> : <span style='color:red;'>+2 damage (Defense roll) or free GM Intrusion!</span></li>";
        } else {
            if (damagetrack == 0) {
                // if character is haled, special success is possible
                switch (diceRoll) {
                    case 17:
                        specialEffect = "<li><u>Effect</u>: <span style='color:green;'>+1 damage (Attack/Ability roll).</span></li>";
                        break;
                    case 18:
                        specialEffect = "<li><u>Effect</u>: <span style='color:green;'>+2 damage (Attack/Ability roll).</span></li>";
                        break;
                    case 19:
                        specialEffect = "<li><u>Effect</u>: <span style='color:green;'>+3 damage (Attack/Ability roll) or Minor Effect.</span></li>";
                        break;
                    case 20:
                        specialEffect = "<li><u>Effect</u>: <span style='color:green;'>+3 damage (Attack/Ability roll) or Major Effect. Stat pool points not spent.</span></li>";
                        break;
                     default:
                        specialEffect = "";
                }
            } else if (diceRoll == 20) {
                    // if character is impaired
                    specialEffect = "<li><u>Effect</u> : <span style='color:green;'>Stat pool points not spent.</span></li>";
            };
        };
    } else {     // automatic success or no known difficulty
        if (parseInt(difficulty) > 0) {
            success = success + "<li><strong><span style='color:green;'>And automatically succeeds (Difficulty " + difficulty + ")!</span></strong></li>";
        } else {
            success = success + "<li><u>Result</u> : <strong>" + finalRoll + ".</strong></li>";
        };
    };    
    //output
    sendChat("character|"+charId, ""+success+specialEffect+"</ul>");
};
//---------------------------------------------------------------------------------------------------------------------------------------------
function recoveryRoll(characterObj,tokenObj){
    var charId = characterObj.get("id");
    var recovObjArray = findObjs({
                    _type: 'attribute',
                    name: "recovery-rolls",
                    _characterid: charId
                });
    if (recovObjArray == false) {
        sendChat("", "ERROR : No attribute 'recovery-rolls' !");
        return;  
    };      
    var recrolls=parseInt(recovObjArray[0].get("current"));
    //Is a complete rest of 10 hours needed ?
    if (recrolls == 3) {
        sendChat("character|"+charId, "<span style='color:red;'>can't do a recovery roll (has to rest for 10 hours).</span>");
        return;  
    };
    var recovbonus = parseInt(getAttrByName(charId, "recoverybonus", "current"));
    var curRecLib = "";
    var nextRecLib = "";
    switch (recrolls) {
        case 0 :
            curRecLib = "1 action";
            nextRecLib = "10 minutes";
            break;
        case 1 :
            curRecLib = "10 minutes";
            nextRecLib = "1 hour";
            break;
        case 2 : 
            curRecLib = "1 hour";
            nextRecLib = "Long rest (10 hours)";
            break;
    }
    recrolls=recrolls+1;
    recovObjArray[0].set("current",recrolls);
    var recovery = randomInteger(6)+recovbonus;
    var output = "<b><span style='color:blue;'>Recovery roll </span></b> : <ul style='list-style-type : disc;'>";
    output = output + "<li>Rests for <b>" + curRecLib + "</b>.</li>"
    output = output + "<li><b><span style='color:green;'>" + recovery + " points</span></b> to allocate to Stats.</li>"
    output = output + "<li>Next rest will require : <b>" + nextRecLib + "</b>.</li>";
    sendChat("character|" + charId, "" + output +"</ul>");
};
//---------------------------------------------------------------------------------------------------------------------------------------------
on("chat:message", function(msg) {
    if (msg.type == "api") {
        // sendChat("", "/desc TEST API.");
        if(!msg.selected) {
    		sendChat("", "/desc Select a character token and try again...");
			return; //quit if nothing selected
		};
        if (msg.content.indexOf("!nathanum-") !== 0) {
        	// sendChat("", "/desc Fonction inconnue.");
            return;
        } else {
            var functionCalled = msg.content.split(" ")[0];
        };
        if (functionCalled == "!nathanum-numeneroll") {
            var Parameters = msg.content.split("!nathanum-numeneroll ")[1];
            var tokenId = Parameters.split("|")[0];
            var tokenObj=getObj("graphic", tokenId);
            var charId = tokenObj.get("represents");
            if(charId != "") {
                var characterObj = getObj("character", charId);
            } else {
                sendChat("","The selected token doesn't represent a character.");
                return false;
            };
            var statName = Parameters.split("|")[1];
            var difficulty = parseInt(Parameters.split("|")[2]);
            var effortsUsed = parseInt(Parameters.split("|")[3]);
            var rollbonus = parseInt(Parameters.split("|")[4]);
            var statexp = parseInt(Parameters.split("|")[5]);
			numeneRoll(characterObj,tokenObj,statName,difficulty,effortsUsed,rollbonus,statexp,msg.who);        
            return;
        };
        if (functionCalled == "!nathanum-attrib") {
            var Parameters = msg.content.split("!nathanum-attrib ")[1];
            var tokenId = Parameters.split("|")[0];
            var attributeName = Parameters.split("|")[1];
    		var newValue = Parameters.split("|")[2];
            var tokenObj=getObj("graphic", tokenId);
            var charId = tokenObj.get("represents");
            if(charId != "") {
                var characterObj = getObj("character", charId);
            } else {
                sendChat("","The selected token doesn't represent a character.");
                return false;
            };
            var attributeObjArray = findObjs({
                _type: 'attribute',
                name: attributeName,
                _characterid: characterObj.id
            });                    
			if (attributeObjArray == false) return;
			attrib(characterObj,attributeObjArray,newValue,tokenObj);
            return;
        }; 
        if (functionCalled == "!nathanum-recoveryroll") {
            var tokenId = msg.content.split("!nathanum-recoveryroll ")[1];
            var tokenObj=getObj("graphic", tokenId);
            var charId = tokenObj.get("represents");
            if(charId != "") {
                var characterObj = getObj("character", charId);
            } else {
                sendChat("","The selected token doesn't represent a character.");
                return false;
            };
    		recoveryRoll(characterObj,tokenObj);        
            return;
        };
        if (functionCalled == "!nathanum-initroll") {
            var Parameters = msg.content.split("!nathanum-initroll ")[1];
            var tokenId = Parameters.split("|")[0];
            var tokenObj=getObj("graphic", tokenId);
            var charId = tokenObj.get("represents");
            if(charId != "") {
                var characterObj = getObj("character", charId);
            } else {
                sendChat("","The selected token doesn't represent a character.");
                return false;
            };
            var effortsUsed = parseInt(Parameters.split("|")[1]);
            var rollbonus = parseInt(Parameters.split("|")[2]);
            var statexp = parseInt(Parameters.split("|")[3]);
			initRoll(characterObj,tokenObj,effortsUsed,rollbonus,statexp);        
            return;
        };
        if (functionCalled == "!nathanum-restchar") {
            var Parameters = msg.content.split("!nathanum-restchar ")[1];
            var tokenId = Parameters.split("|")[0];
            var tokenObj=getObj("graphic", tokenId);
            var charId = tokenObj.get("represents");
            if(charId != "") {
                var characterObj = getObj("character", charId);
            } else {
                sendChat("","The selected token doesn't represent a character.");
                return false;
            };
    		restChar(characterObj,tokenObj);
            return;
        }; 
    };
});
//---------------------------------------------------------------------------------------------------------------------------------------------
