// GIST: https://gist.github.com/shdwjk/4064a6b2e12bcfc46f49
// Aaron's updated version.
// Fixed: character update to only do one findObjs() call, instead of
//   (((15*5)+1)*NUM Characters) times (that's 2280 times for 30 characters).
//
// Edge of the Empire RPG Dice Mechanics
//
// copyright pug games 2014
// please feel free to use this script, change it, add to it in any way you feel
// Script created by Roll20 user Konrad J.
// help with Dice specs by Roll20 users Alicia G. and Blake the Lake
// dice graphics hosted by Roll20 user Alicia G. at galacticcampaigns.com
// dice graphics borrowed from the awesome google+ hangouts EotE Dice App
// changed to randomInteger()
//
// !eed log on|multi|single|off  	// default:on and single
									// outputs dice rolled to the chat window if "on", only the result if "off"
									// dice rolled will be on single line if "single" and on multiple lines if "multi"
// !eed graphics on|off|s|m|l  		// default:on and m
									// shows dice rolled as graphic, small, medium, or large if "on" or as text if "off"
// !eed #b #g #y #blk #p #r #w
//
// !eed w #b #g #y #blk #p #r #w  	// whisper not really working very well right now, please ignore this option for now
									// will roll the dice and whisper them only to the GM, gm can't whisper dice rolls to other players
									// due to the way the API currently works we can only send a whisper dice roll via text output, even if you have graphics rolling turned on
//
// !eed test // this will output every side of every die to the chat window
//

// !eed npcinit #b #g #y #blk #p #r #w  //Will roll for a NPC initiative slot in the form of "SUCCESS:ADVANTAGE".  Auto sorts baed on rules in the CRB.
// !eed pcinit #b #g #y #blk #p #r #w  	//Will roll for a PC initiative slot in the form of "SUCCESS:ADVANTAGE". Auto sorts baed on rules in the CRB.

// you only need to specify the dice to roll, in any order
// b is blue, g is green, y is yellow, blk is black, p is purple, r is red, w is white
// currently no error checking so you can break it if you type in unsupported arguments

var eedCONSTANTS = {
	EEDCOMMAND : "!eed",
	GRAPHICSIZE : {
    	SMALL : 20,
		MEDIUM : 30,
		LARGE : 40
	},
	ABILITY : {
		BLANK : "http://galacticcampaigns.com/images/EotE/Ability/abilityBlank.png",
		A : "http://galacticcampaigns.com/images/EotE/Ability/abilityA.png",
		AA : "http://galacticcampaigns.com/images/EotE/Ability/abilityAA.png",
		S : "http://galacticcampaigns.com/images/EotE/Ability/abilityS.png",
		SA : "http://galacticcampaigns.com/images/EotE/Ability/abilitySA.png",
		SS : "http://galacticcampaigns.com/images/EotE/Ability/abilitySS.png"
	},
	BOOST : {
		BLANK : "http://galacticcampaigns.com/images/EotE/Boost/boostBlank.png",
		A : "http://galacticcampaigns.com/images/EotE/Boost/boostA.png",
		AA : "http://galacticcampaigns.com/images/EotE/Boost/boostAA.png",
		S : "http://galacticcampaigns.com/images/EotE/Boost/boostS.png",
		SA : "http://galacticcampaigns.com/images/EotE/Boost/boostSA.png"
	},
	CHALLENGE : {
		BLANK : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeBlank.png",
		F : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeF.png",
		FF : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeFF.png",
		FT : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeFT.png",
		T : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeT.png",
		TT : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeTT.png",
		DESPAIR : "http://galacticcampaigns.com/images/EotE/Challenge/ChallengeDespair.png"
	},
	DIFFICULTY : {
		BLANK : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyBlank.png",
		F : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyF.png",
		FF : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyFF.png",
		FT : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyFT.png",
		T : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyT.png",
		TT : "http://galacticcampaigns.com/images/EotE/Difficulty/DifficultyTT.png"
	},
	FORCE : {
		D : "http://galacticcampaigns.com/images/EotE/Force/ForceD.png",
		DD : "http://galacticcampaigns.com/images/EotE/Force/ForceDD.png",
		L : "http://galacticcampaigns.com/images/EotE/Force/ForceL.png",
		LL : "http://galacticcampaigns.com/images/EotE/Force/ForceLL.png"
	},
	PROFICIENCY : {
		BLANK : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyBlank.png",
		A : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyA.png",
		S : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyS.png",
		SA : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencySA.png",
		SS : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencySS.png",
		AA : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyAA.png",
		TRIUMPH : "http://galacticcampaigns.com/images/EotE/Proficiency/ProficiencyTriumph.png"
	},
	SETBACK : {
		BLANK : "http://galacticcampaigns.com/images/EotE/Setback/SetBackBlank.png",
		F : "http://galacticcampaigns.com/images/EotE/Setback/SetBackF.png",
		T : "http://galacticcampaigns.com/images/EotE/Setback/SetBackT.png"
	},
	SYMBOLS : {
		A : "http://galacticcampaigns.com/images/EotE/Symbols/A.png",
		S : "http://galacticcampaigns.com/images/EotE/Symbols/S.png",
		T : "http://galacticcampaigns.com/images/EotE/Symbols/T.png",
		F : "http://galacticcampaigns.com/images/EotE/Symbols/F.png",
		TRIUMPH : "http://galacticcampaigns.com/images/EotE/Symbols/Triumph.png",
		DESPAIR: "http://galacticcampaigns.com/images/EotE/Symbols/Despair.png",
		L : "http://galacticcampaigns.com/images/EotE/Symbols/L.png",
		D : "http://galacticcampaigns.com/images/EotE/Symbols/D.png"		
	}
};

var eedGlobal = {
    diceLogChat : true,
	diceLogChatWhisper : false,
	diceGraphicsChat : true,
	diceGraphicsChatSize : eedCONSTANTS.GRAPHICSIZE.SMALL,
	diceTextResult : "",
	diceTextResultLog : "",
	diceGraphicResult : "",
	diceGraphicResultLog : "",
	diceTestEnabled : false,
	diceLogRolledOnOneLine : true,
    diceNPCInit : false,
    dicePCInit : false
};

function sendToTurnOrder(type, NumSuccess, NumAdvantage) {
    var turnorder;
   if(Campaign().get("turnorder") == "") turnorder = []; //NOTE: We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
    else turnorder = JSON.parse(Campaign().get("turnorder"));
 
    //Add a new custom entry to the end of the turn order.
    
    turnorder.push({
        id: "-1",
        pr: NumSuccess + ":" + NumAdvantage,
        custom: type
    });
    
    turnorder.sort(function(x,y) {
        var a = x.pr.split(":");
        var b = y.pr.split(":");
        
        //First rank on successes
        if (b[0] - a[0] != 0)
        {
            return b[0] - a[0];
        }
        //Then rank on Advantage
        else if (b[1] - a[1] != 0)
        {
            return b[1] - a[1];
        }
        else
        {
            //If they are still tied, PC goes first
            if (x.custom == y.custom)
            {
                return 0;
            }
            else if (x.custom =="NPC")
            {
                return 1;
            }
            else
            {
                return -1;
            }
        }
    });
    
    Campaign().set("turnorder", JSON.stringify(turnorder));
}

function rollBoost(diceQty, who){
	//Blue "Boost" die (d6)
	//1 Blank
	//2 Blank
	//3 Success
	//4 Advantage
	//5 Advantage + Advantage
	//6 Success + Advantage
	var roll = 0;
	var diceResult = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	
	if (eedGlobal.diceTestEnabled === true) {
		diceQty = 6;
	}
	
	for (i=1;i<=diceQty;i++) {
	if (eedGlobal.diceTestEnabled === true) {
		roll = roll + 1;
	}
	else {
		roll = randomInteger(6);
	}

	switch(roll) {
        case 1:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.BOOST.BLANK + s2 + "Boost Blank" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			break;
		case 2:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.BOOST.BLANK + s2 + "Boost Blank" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			break;
		case 3:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.BOOST.S + s2 + "Boost Success" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			break;
		case 4:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.BOOST.A + s2 + "Boost Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.advantage = diceResult.advantage + 1;
			break;
		case 5:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.BOOST.AA + s2 + "Boost Advantage x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.advantage = diceResult.advantage + 2;
			break;
		case 6:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.BOOST.SA + s2 + "Boost Success + Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			diceResult.advantage = diceResult.advantage + 1;
			break;
    }
	}
	return diceResult;
}

function rollAbility(diceQty, who){
	//Green "Ability" die (d8)
	//1 Blank
	//2 Success
	//3 Success
	//4 Advantage
	//5 Advantage
	//6 Success + Advantage
	//7 Advantage + Advantage
	//8 Success + Success
	var roll = 0;
	var diceTextLog = "";
	var diceGraphicsLog = "";
	var diceResult = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	
	if (eedGlobal.diceTestEnabled === true) {
		diceQty = 8;
	}
	
	for (i=1;i<=diceQty;i++) {
	if (eedGlobal.diceTestEnabled === true) {
		roll = roll + 1;
	}
	else {
		roll = randomInteger(8);
	}
	
	switch(roll) {
        case 1:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.ABILITY.BLANK + s2 + "Ability Blank" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			break;
		case 2:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.ABILITY.S + s2 + "Ability Success" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			break;
		case 3:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.ABILITY.S + s2 + "Ability Success" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			break;
		case 4:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.ABILITY.A + s2 + "Ability Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.advantage = diceResult.advantage + 1;
			break;
		case 5:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.ABILITY.A + s2 + "Ability Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.advantage = diceResult.advantage + 1;
			break;
		case 6:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.ABILITY.SA + s2 + "Ability Success + Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			diceResult.advantage = diceResult.advantage + 1;
			break;
		case 7:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.ABILITY.AA + s2 + "Ability Advantage x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.advantage = diceResult.advantage + 2;
			break;
		case 8:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.ABILITY.SS + s2 + "Ability Success x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 2;
			break;
    }
	}
	return diceResult;
}

function rollProficiency(diceQty, who){
	//Yellow "Proficiency" die (d12)
	//1 Blank
	//2 Triumph
	//3 Success
	//4 Success
	//5 Advantage
	//6 Success + Advantage
	//7 Success + Advantage
	//8 Success + Advantage
	//9 Success + Success
	//10 Success + Success
	//11 Advantage + Advantage
	//12 Advantage + Advantage
	var roll = 0;
	var diceTextLog = "";
	var diceGraphicsLog = "";
	var diceResult = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	
	if (eedGlobal.diceTestEnabled === true) {
		diceQty = 12;
	}
	
	for (i=1;i<=diceQty;i++) {
	if (eedGlobal.diceTestEnabled === true) {
		roll = roll + 1;
	}
	else {
		roll = randomInteger(12);
	}

	switch(roll) {
        case 1:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.BLANK + s2 + "Proficiency Blank" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			break;
		case 2:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Triumph(+Success))";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.TRIUMPH + s2 + "Proficiency Triumph(+Success)" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.triumph = diceResult.triumph + 1;
			diceResult.success = diceResult.success + 1;
			break;
		case 3:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.S + s2 + "Proficiency Success" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			break;
		case 4:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.S + s2 + "Proficiency Success" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			break;
		case 5:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.A + s2 + "Proficiency Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.advantage = diceResult.advantage + 1;
			break;
		case 6:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			diceResult.advantage = diceResult.advantage + 1;
			break;
		case 7:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			diceResult.advantage = diceResult.advantage + 1;
			break;
		case 8:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 1;
			diceResult.advantage = diceResult.advantage + 1;
			break;
		case 9:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.SS + s2 + "Proficiency Success x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 2;
			break;
		case 10:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.SS + s2 + "Proficiency Success x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.success = diceResult.success + 2;
			break;
		case 11:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.AA + s2 + "Proficiency Advantage x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.advantage = diceResult.advantage + 2;
			break;
		case 12:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.PROFICIENCY.AA + s2 + "Proficiency Advantage x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.advantage = diceResult.advantage + 2;
			break;
    }
	}
	return diceResult;
}

function rollSetBack(diceQty, who){
	//Black "Setback" die (d6)
	//1 Blank
	//2 Blank
	//3 Failure
	//4 Failure
	//5 Threat
	//6 Threat
	var roll = 0;
	var diceTextLog = "";
	var diceGraphicsLog = "";
	var diceResult = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
		
	if (eedGlobal.diceTestEnabled === true) {
		diceQty = 6;
	}
	
	for (i=1;i<=diceQty;i++) {
	if (eedGlobal.diceTestEnabled === true) {
		roll = roll + 1;
	}
	else {
		roll = randomInteger(6);
	}
	
	switch(roll) {
        case 1:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.SETBACK.BLANK + s2 + "Setback Blank" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			break;
		case 2:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.SETBACK.BLANK + s2 + "Setback Blank" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			break;
		case 3:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.SETBACK.F + s2 + "Setback Failure" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 1;
			break;
		case 4:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.SETBACK.F + s2 + "Setback Failure" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 1;
			break;
		case 5:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.SETBACK.T + s2 + "Setback Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 1;
			break;
		case 6:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.SETBACK.T + s2 + "Setback Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 1;
			break;
    }
	}
	return diceResult;
}

function rollDifficulty(diceQty, who){
	//Purple "Difficulty" die (d8)
	//1 Blank
	//2 Failure
	//3 Threat
	//4 Threat
	//5 Threat
	//6 Failure + Failure
	//7 Failure + Threat
	//8 Threat + Threat
	var roll = 0;
	var diceTextLog = "";
	var diceGraphicsLog = "";
	var diceResult = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
		
	if (eedGlobal.diceTestEnabled === true) {
		diceQty = 8;
	}
	
	for (i=1;i<=diceQty;i++) {
	if (eedGlobal.diceTestEnabled === true) {
		roll = roll + 1;
	}
	else {
		roll = randomInteger(8);
	}

	switch(roll) {
        case 1:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.DIFFICULTY.BLANK + s2 + "Difficulty Blank" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			break;
		case 2:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.DIFFICULTY.F + s2 + "Difficulty Failure" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 1;
			break;
		case 3:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 1;
			break;
		case 4:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 1;
			break;
		case 5:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 1;
			break;
		case 6:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.DIFFICULTY.FF + s2 + "Difficulty Failure x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 2;
			break;
		case 7:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.DIFFICULTY.FT + s2 + "Difficulty Failure + Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 1;
			diceResult.threat = diceResult.threat + 1;
			break;
		case 8:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.DIFFICULTY.TT + s2 + "Difficulty Threat x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 2;
			break;
    }
	}
	return diceResult;
}

function rollChallenge(diceQty, who){
	//Red "Challenge" die (d12)
	//1 Blank
	//2 Despair
	//3 Failure
	//4 Failure
	//5 Threat
	//6 Threat
	//7 Failure + Failure
	//8 Failure + Failure
	//9 Threat + Threat
	//10 Threat + Threat
	//11 Failure + Threat
	//12 Failure + Threat
	var roll = 0;
	var diceTextLog = "";
	var diceGraphicsLog = "";
	var diceResult = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
		
	if (eedGlobal.diceTestEnabled === true) {
		diceQty = 12;
	}
	
	for (i=1;i<=diceQty;i++) {
	if (eedGlobal.diceTestEnabled === true) {
		roll = roll + 1;
	}
	else {
		roll = randomInteger(12);
	}

	switch(roll) {
        case 1:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.BLANK + s2 + "Challenge Blank" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			break;
		case 2:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Despair)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.DESPAIR + s2 + "Challenge Despair" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.despair = diceResult.despair + 1;
			break;
		case 3:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.F + s2 + "Challenge Failure" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 1;
			break;
		case 4:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.F + s2 + "Challenge Failure" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 1;
			break;
		case 5:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.T + s2 + "Challenge Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 1;
			break;
		case 6:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.T + s2 + "Challenge Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 1;
			break;
		case 7:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.FF + s2 + "Challenge Failure x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 2;
			break;
		case 8:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.FF + s2 + "Challenge Failure x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 2;
			break;
		case 9:
			diceTextLog = diceTextLog + "(Threat x2)";
			diceGraphicsLog = diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.TT + s2 + "Challenge Threat x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 2;
			break;
		case 10:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Threat x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.TT + s2 + "Challenge Threat x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.threat = diceResult.threat + 2;
			break;
		case 11:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.FT + s2 + "Challenge Failure + Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 1;
			diceResult.threat = diceResult.threat + 1;
			break;
		case 12:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.CHALLENGE.FT + s2 + "Challenge Failure + Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.failure = diceResult.failure + 1;
			diceResult.threat = diceResult.threat + 1;
			break;
    }
	}
	return diceResult;
}

function rollForce(diceQty, who){
	//White "Force" die (d12)
	//1 Light
	//2 Light
	//3 Light + Light
	//4 Light + Light
	//5 Light + Light
	//6 Dark
	//7 Dark
	//8 Dark
	//9 Dark
	//10 Dark
	//11 Dark
	//12 Dark + Dark
	var roll = 0;
	var diceTextLog = "";
	var diceGraphicsLog = "";
	var diceResult = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
		
	if (eedGlobal.diceTestEnabled === true) {
		diceQty = 12;
	}
	
	for (i=1;i<=diceQty;i++) {
	if (eedGlobal.diceTestEnabled === true) {
		roll = roll + 1;
	}
	else {
		roll = randomInteger(12);
	}

	switch(roll) {
        case 1:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Light)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.L + s2 + "Force Light" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.light = diceResult.light + 1;
			break;
		case 2:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Light)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.L + s2 + "Force Light" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.light = diceResult.light + 1;
			break;
		case 3:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.LL + s2 + "Force Light x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.light = diceResult.light + 2;
			break;
		case 4:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.LL + s2 + "Force Light x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.light = diceResult.light + 2;
			break;
		case 5:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.LL + s2 + "Force Light x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.light = diceResult.light + 2;
			break;
		case 6:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.D + s2 + "Force Dark" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.dark = diceResult.dark + 1;
			break;
		case 7:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.D + s2 + "Force Dark" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.dark = diceResult.dark + 1;
			break;
		case 8:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.D + s2 + "Force Dark" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.dark = diceResult.dark + 1;
			break;
		case 9:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.D + s2 + "Force Dark" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.dark = diceResult.dark + 1;
			break;
		case 10:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.D + s2 + "Force Dark" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.dark = diceResult.dark + 1;
			break;
		case 11:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.D + s2 + "Force Dark" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.dark = diceResult.dark + 1;
			break;
		case 12:
			diceResult.diceTextLog = diceResult.diceTextLog + "(Dark x2)";
			diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eedCONSTANTS.FORCE.DD + s2 + "Force Dark x2" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
			diceResult.dark = diceResult.dark + 2;
			break;
    }
	}
	return diceResult;
}

function diceAddition(diceTotals, diceResult){
	diceTotals.success = diceTotals.success + diceResult.success;
	diceTotals.failure = diceTotals.failure + diceResult.failure;
	diceTotals.advantage = diceTotals.advantage + diceResult.advantage;
	diceTotals.threat = diceTotals.threat + diceResult.threat;
	diceTotals.triumph = diceTotals.triumph + diceResult.triumph;
	diceTotals.despair = diceTotals.despair + diceResult.despair;
	diceTotals.light = diceTotals.light + diceResult.light;
	diceTotals.dark = diceTotals.dark + diceResult.dark;
	return diceTotals;
}

function diceTotalsSummed(diceTotals) {
	var diceTS = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	
	i = diceTotals.success - diceTotals.failure;
	if (i >= 0) {
		diceTS.success = i;
	}
	else {
		diceTS.failure = Math.abs(i);
	}

	i = diceTotals.advantage - diceTotals.threat;
	if (i >= 0) {
		diceTS.advantage = i;
	}
	else {
		diceTS.threat = Math.abs(i);
	}
	diceTS.triumph = diceTotals.triumph;
	diceTS.despair = diceTotals.despair;
	diceTS.light = diceTotals.light;
	diceTS.dark = diceTotals.dark;
	return diceTS;
}

function processEdgeEmpireDiceScript(diceToRoll, who, label){
	var diceQty = "";
	var diceColor = "";
	var diceTotals = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0
	};
	var diceResults = {
		success : 0,
		failure : 0,
		advantage : 0,
		threat : 0,
		triumph : 0,
		despair : 0,
		light : 0,
		dark : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var diceRolledGraphicsLog = {
		Boost: "",
		Ability : "",
		Proficiency : "",
		SetBack : "",
		Difficulty : "",
		Challenge : "",
		Force : ""
	};
	var diceRolledTextLog = {
		Boost: "",
		Ability : "",
		Proficiency : "",
		SetBack : "",
		Difficulty : "",
		Challenge : "",
		Force : ""
	};
	var i = 0;
	var j = diceToRoll.length;
	var diceTextResults = "";
	var diceGraphicsResults = "";
	var diceTextRolled = "";
	var diceGraphicsRolled = "";
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	var chatGlobal = '';
	
	// won't work with >9 dice of one colour yet!
	for (i=0, j;i<j;i++){
		diceQty = diceToRoll[i].substring(0,1);
		diceColor=diceToRoll[i].substring(1);

		switch(diceColor) {
		//Blue "Boost" die (d6)
			case 'b':
				diceResults = rollBoost(diceQty,who);
				diceRolledGraphicsLog.Boost = diceResults.diceGraphicsLog;
				diceRolledTextLog.Boost = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);
				break;
		//Green "Ability" die (d8)
			case 'g':
				diceResults = rollAbility(diceQty,who);
				diceRolledGraphicsLog.Ability = diceResults.diceGraphicsLog;
				diceRolledTextLog.Ability = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);
				break;
		//Yellow "Proficiency" die (d12)
			case 'y':
				diceResults = rollProficiency(diceQty,who);
				diceRolledGraphicsLog.Proficiency = diceResults.diceGraphicsLog;
				diceRolledTextLog.Proficiency = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);
				break;
		//Black "SetBack" die (d6)
			case 'blk':
				diceResults = rollSetBack(diceQty,who);
				diceRolledGraphicsLog.SetBack = diceResults.diceGraphicsLog;
				diceRolledTextLog.SetBack = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);	
				break;
		//Purple "Difficulty" die (d8)
			case 'p':
				diceResults = rollDifficulty(diceQty,who);
				diceRolledGraphicsLog.Difficulty = diceResults.diceGraphicsLog;
				diceRolledTextLog.Difficulty = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);		
				break;
		//Red "Challenge" die (d12)
			case 'r':
				diceResults = rollChallenge(diceQty,who);
				diceRolledGraphicsLog.Challenge = diceResults.diceGraphicsLog;
				diceRolledTextLog.Challenge = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);	
				break;
		//White "Force" die (d12)
			case 'w':
				diceResults = rollForce(diceQty,who);
				diceRolledGraphicsLog.Force = diceResults.diceGraphicsLog;
				diceRolledTextLog.Force = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);	
				break;
		}
	}

	diceTotals = diceTotalsSummed(diceTotals);

    diceTextResults = diceTextResults + "[";
    if (diceTotals.success > 0) {
		diceTextResults = diceTextResults + " Success:" + diceTotals.success;
		for (i=1;i<=diceTotals.success;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + eedCONSTANTS.SYMBOLS.S + s2 + "Success" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.failure > 0) {
		diceTextResults = diceTextResults + " Fail:" + diceTotals.failure;
		for (i=1;i<=diceTotals.failure;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + eedCONSTANTS.SYMBOLS.F + s2 + "Failure" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.advantage > 0) {
		diceTextResults = diceTextResults + " Advant:" + diceTotals.advantage;
		for (i=1;i<=diceTotals.advantage;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + eedCONSTANTS.SYMBOLS.A + s2 + "Advantage" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.threat > 0) {
		diceTextResults = diceTextResults + " Threat:" + diceTotals.threat;
		for (i=1;i<=diceTotals.threat;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + eedCONSTANTS.SYMBOLS.T + s2 + "Threat" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.triumph > 0) {
		diceTextResults = diceTextResults + " Triumph:" + diceTotals.triumph;
		for (i=1;i<=diceTotals.triumph;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + eedCONSTANTS.SYMBOLS.TRIUMPH + s2 + "Triumph" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.despair > 0) {
		diceTextResults = diceTextResults + " Despair:" + diceTotals.despair;
		for (i=1;i<=diceTotals.despair;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + eedCONSTANTS.SYMBOLS.DESPAIR + s2 + "Despair" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.light > 0) {
		diceTextResults = diceTextResults + " Light:" + diceTotals.light;
		for (i=1;i<=diceTotals.light;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + eedCONSTANTS.SYMBOLS.L + s2 + "Light" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.dark > 0) {
		diceTextResults = diceTextResults + " Dark:" + diceTotals.dark;
		for (i=1;i<=diceTotals.dark;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + eedCONSTANTS.SYMBOLS.D + s2 + "Dark" + s3 + eedGlobal.diceGraphicsChatSize + s4 + eedGlobal.diceGraphicsChatSize + s5;
		}
	}

	diceTextResults = diceTextResults + "]";
	
	
		
	if (eedGlobal.diceTestEnabled === true) {
		sendChat("", "/desc " + who + ": 6b 8g 12y 6blk 8p 12r 12w");
	} else {
		if (eedGlobal.diceLogChatWhisper === true) {
			//sendChat(who, "/w gm " + diceToRoll);
			//sendChat(who, "/w " + who + " " + diceToRoll);
		}
		else {
			
			chatGlobal = "/direct <br><b>Skill:</b> " + label + '<br>';//+ diceToRoll;

		}
	}
	
	if (eedGlobal.diceLogChat === true) {
		if (eedGlobal.diceLogRolledOnOneLine === true) {
			diceGraphicsRolled = diceRolledGraphicsLog.Boost + diceRolledGraphicsLog.Ability + diceRolledGraphicsLog.Proficiency + diceRolledGraphicsLog.SetBack + diceRolledGraphicsLog.Difficulty + diceRolledGraphicsLog.Challenge + diceRolledGraphicsLog.Force;
			if (diceRolledTextLog.Boost !="") diceTextRolled = diceTextRolled + "Boost:"+diceRolledTextLog.Boost;
			if (diceRolledTextLog.Ability !="") diceTextRolled = diceTextRolled + "Ability:"+diceRolledTextLog.Ability;
			if (diceRolledTextLog.Proficiency !="") diceTextRolled = diceTextRolled + "Proficiency:"+diceRolledTextLog.Proficiency;
			if (diceRolledTextLog.SetBack !="") diceTextRolled = diceTextRolled + "SetBack:"+diceRolledTextLog.SetBack;
			if (diceRolledTextLog.Difficulty !="") diceTextRolled = diceTextRolled + "Difficulty:"+diceRolledTextLog.Difficulty;
			if (diceRolledTextLog.Challenge !="") diceTextRolled = diceTextRolled + "Challenge:"+diceRolledTextLog.Challenge;
			if (diceRolledTextLog.Force !="") diceTextRolled = diceTextRolled + "Force:"+diceRolledTextLog.Force;

			if (eedGlobal.diceGraphicsChat === true && eedGlobal.diceLogChatWhisper === false) {
				
				chatGlobal = chatGlobal + '<br>' + diceGraphicsRolled;
				//sendChat("", "/direct " + diceGraphicsRolled);
			}
			else {
				if (eedGlobal.diceLogChatWhisper === true) {
					//sendChat("", "/w gm " + diceTextRolled);
					//sendChat("", "/w " + who + " " + diceTextRolled);
				}
				else {
					sendChat("", diceTextRolled);
				}
			}			
		}
		else {
			if (eedGlobal.diceGraphicsChat === true && eedGlobal.diceLogChatWhisper === false) {
				if (diceRolledGraphicsLog.Boost !="") chatGlobal = sendChat("", "/direct " + diceRolledGraphicsLog.Boost);
				if (diceRolledGraphicsLog.Ability !="") chatGlobal = sendChat("", "/direct " + diceRolledGraphicsLog.Ability);
				if (diceRolledGraphicsLog.Proficiency !="") chatGlobal = sendChat("", "/direct " + diceRolledGraphicsLog.Proficiency);
				if (diceRolledGraphicsLog.SetBack !="") chatGlobal = sendChat("", "/direct " + diceRolledGraphicsLog.SetBack);
				if (diceRolledGraphicsLog.Difficulty !="") chatGlobal = sendChat("", "/direct " + diceRolledGraphicsLog.Difficulty);
				if (diceRolledGraphicsLog.Challenge !="") chatGlobal = sendChat("", "/direct " + diceRolledGraphicsLog.Challenge);
				if (diceRolledGraphicsLog.Force !="") chatGlobal = sendChat("", "/direct " + diceRolledGraphicsLog.Force);
			}
			else {
				if (eedGlobal.diceLogChatWhisper === true) {
					if (diceRolledTextLog.Boost !="") {
						//sendChat("", "/w gm " + diceRolledTextLog.Boost);
						//sendChat("", "/w " + who + " " + diceRolledTextLog.Boost);
					}
				}
				else {
					if (diceRolledTextLog.Boost !="") sendChat("", "Boost:"+diceRolledTextLog.Boost);
					if (diceRolledTextLog.Ability !="") sendChat("", "Ability:"+diceRolledTextLog.Ability);
					if (diceRolledTextLog.Proficiency !="") sendChat("", "Proficiency:"+diceRolledTextLog.Proficiency);
					if (diceRolledTextLog.SetBack !="") sendChat("", "SetBack:"+diceRolledTextLog.SetBack);
					if (diceRolledTextLog.Difficulty !="") sendChat("", "Difficulty:"+diceRolledTextLog.Difficulty);
					if (diceRolledTextLog.Challenge !="") sendChat("", "Challenge:"+diceRolledTextLog.Challenge);
					if (diceRolledTextLog.Force !="") sendChat("", "Force:"+diceRolledTextLog.Force);
				}
			}
		}
	}

	if (eedGlobal.diceGraphicsChat === true && eedGlobal.diceLogChatWhisper === false) {
		chatGlobal = chatGlobal + '<br>Roll:' + diceGraphicsResults;
		sendChat(who, chatGlobal );
		
		
        if (eedGlobal.diceNPCInit === true) {
            sendToTurnOrder("NPC", diceTotals.success, diceTotals.advantage)
        }
        else if (eedGlobal.dicePCInit === true) {
            sendToTurnOrder("PC", diceTotals.success, diceTotals.advantage)
        }
		
	}
	else {
		if (eedGlobal.diceLogChatWhisper === true) {
			//sendChat("Roll", "/w gm " + diceTextResults);
			//sendChat("Roll", "/w " + who + " " + diceTextResults);
		}
		else {
			sendChat("Roll", diceTextResults);
		}
	}
}

var processScriptTabs = function(argv, character, label) {
    // this will run the various other scripts depending upon the chat
    // window command.  Just add another Case statement to add a new command.
	var tmpLogChat = false;
	var tmpGraphicsChat = false;
	var	script = argv.shift();

    switch(script) {
    	case eedCONSTANTS.EEDCOMMAND:
			switch(argv[0]) {
				case "log":
					switch(argv[1]) {
						case "on":
							eedGlobal.diceLogChat = true;
							break;
						case "off":
							eedGlobal.diceLogChat = false;
							break;
						case "multi":
							eedGlobal.diceLogRolledOnOneLine = false;
							break;
						case "single":
							eedGlobal.diceLogRolledOnOneLine = true;
							break;

					}
					break;
				case "w":
					eedGlobal.diceLogChatWhisper = true;
					argv.shift();
					processEdgeEmpireDiceScript(argv, character, label);
					eedGlobal.diceLogChatWhisper = false;
					break;
				case "graphics":
					switch(argv[1]) {
						case "on":
							eedGlobal.diceGraphicsChat = true;
							break;
						case "off":
							eedGlobal.diceGraphicsChat = false;
							break;
						case "s":
							eedGlobal.diceGraphicsChatSize = eedCONSTANTS.GRAPHICSIZE.SMALL;
							break;
						case "m":
							eedGlobal.diceGraphicsChatSize = eedCONSTANTS.GRAPHICSIZE.MEDIUM;
							break;
						case "l":
							eedGlobal.diceGraphicsChatSize = eedCONSTANTS.GRAPHICSIZE.LARGE;
							break;
					}
					break;
				case "npcinit":
                    eedGlobal.diceNPCInit = true;
                    eedGlobal.dicePCInit = false;
                    break;
                case "pcinit":
                    eedGlobal.dicePCInit = true;
                    eedGlobal.diceNPCInit = false;
                    break;
				case "test":
					eedGlobal.diceTestEnabled = true;
					tmpLogChat = eedGlobal.diceLogChat;
					tmpGraphicsChat = eedGlobal.diceGraphicsChat;
					eedGlobal.diceLogChat = true;
					eedGlobal.diceGraphicsChat = true;
					processEdgeEmpireDiceScript(["1b", "1g", "1y", "1blk", "1p", "1r", "1w"], character, label);
					eedGlobal.diceTestEnabled = false;
					eedGlobal.diceLogChat = tmpLogChat;
					eedGlobal.diceGraphicsChat = tmpGraphicsChat;
					break;
				default:
					eedGlobal.dicePCInit = false;
                    eedGlobal.diceNPCInit = false;
					//argv.splice(1,2);
					//processEdgeEmpireDiceScript(argv, character, label);
					//eedGlobal.diceLogChatWhisper = false;
			}
			break;
    }
};

//--------------------------------- Vehicle Critical

var critShipTable = [
	{
		percent : '1 to 9',
		severity : 1,
		name : 'Mechanical Stress',
		Result : 'Ship or vehicle suffers 1 system strain.',
		effect : '',
	},
	{
		percent : '10 to 18',
		severity : 1,
		name : 'Jostled',
		Result : 'All crew members suffer 1 strain.',
		effect : '',
	},
	{
		percent : '19 to 27',
		severity : 1,
		name : 'Losing Power to Shields',
		Result : 'Decrease defense in affected defense zone by 1 until repaired. If ship or vehicle has no defense, suffer 1 system strain.',
		effect : '',
	},
	{
		percent : '28 to 36',
		severity : 1,
		name : 'Knocked Off Course',
		Result : 'On next turn, pilot cannot execute any maneuvers. Instead, must make a Piloting check to regain bearings and resume course. Difficulty depends on current speed.',
		effect : '',
	},
	{
		percent : '37 to 45',
		severity : 1,
		name : 'Tailspin',
		Result : 'All firing from ship or vehicle suffers 2 setback dice until end of pilot\'s next turn.',
		effect : '',
	},
	{
		percent : '46 to 54',
		severity : 1,
		name : 'Component Hit',
		Result : 'One component of the attacker\'s choice is knocked offline, and is rendered inoperable until the end of the following round. See page 245 CRB for Small/Large Vehicle and Ship Component tables. ',
		effect : '',
	},
	// --------------- severity : 2
	{
		percent : '55 to 63',
		severity : 2,
		name : 'Shields Failing',
		Result : 'Decrease defense in all defense zones by 1 until repaired. If ship or vehicle has no defense, suffer 2 system strain.',
		effect : '',
	},
	{
		percent : '64 to 72',
		severity : 2,
		name : 'Hyperdrive or Navicomputer Failure',
		Result : 'Cannot make any jump to hyperspace until repaired. If ship or vehicle has no hyperdrive, navigation systems fail leaving it unable to tell where it is or is going.',
		effect : '',
	},
	{
		percent : '73 to 81',
		severity : 2,
		name : 'Power Fluctuations',
		Result : 'Pilot cannot voluntarily inflict system strain on the ship until repaired.',
		effect : '',
	},
	// --------------- severity : 3
	{
		percent : '82 to 90',
		severity : 3,
		name : 'Shields Down',
		Result : 'Decrease defense in affected defense zone to 0 and all other defense zones by 1 point until repaired. If ship or vehicle has no defense, suffer 4 system strain.',
		effect : '',
	},
	{
		percent : '91 to 99',
		severity : 3,
		name : 'Engine Damaged',
		Result : 'Ship or vehicle\'s maximum speed reduced by 1, to a minimum of 1, until repaired.',
		effect : '',
	},
	{
		percent : '100 to 108',
		severity : 3,
		name : 'Shield Overload',
		Result : 'Decrease defense in all defense zones to 0 until repaired. In addition, suffer 2 system strain. Cannot be repaired until end of encounter. If ship or vehicle has no defense, reduce armor by 1 until repaired.',
		effect : '',
	},
	{
		percent : '109 to 117',
		severity : 3,
		name : 'Engines Down',
		Result : 'Ship or vehicle\'s maximum speed reduced to 0. In addition, ship or vehicle cannot execute maneuvers until repaired. Ship continues on course at current speed and cannot be stopped or course changed until repaired.',
		effect : '',
	},
	{
		percent : '118 to 126',
		severity : 3,
		name : 'Major System Failure',
		Result : 'One component of the attacker\'s choice is heavily damages, and is inoperable until the critical hit is repaired. See page 245 CRB for Small/Large Vehicle and Ship Component tables. ',
		effect : '',
	},
	// --------------- severity : 4
	{
		percent : '127 to 133',
		severity : 4,
		name : 'Major Hull Breach',
		Result : 'Ships and vehicles of silhouette 4 and smaller depressurize in a number of rounds equal to silhouette. Ships of silhouette 5 and larger don\'t completely depressurize, but parts do (specifics at GM discretion). Ships and vehicles operating in atmosphere instead suffer a Destabilized Critical.',
		effect : '',
	},
	{
		percent : '134 to 138',
		severity : 4,
		name : 'Destabilised',
		Result : 'Reduce ship or vehicle\'s hull integrity threshold and system strain threshold to half original values until repaired.',
		effect : '',
	},
	{
		percent : '139 to 144',
		severity : 4,
		name : 'Fire!',
		Result : 'Fire rages through ship or vehicle and it immediately takes 2 system strain. Fire can be extinguished with appropriate skill, Vigilance or Cool checks at GM\'s discretion. Takes one round per two silhouette to put out.',
		effect : '',
	},
	{
		percent : '145 to 153',
		severity : 4,
		name : 'Breaking Up',
		Result : 'At the end of next round, ship is completely destroyed. Anyone aboard has one round to reach escape pod or bail out before they are lost.',
		effect : '',
	},
	{
		percent : '154+',
		severity : 4,
		name : 'Vaporized',
		Result : 'The ship or Vehicle is completely destroyed.',
		effect : '',
	}
]

//--------------------------------- Critical Injury

var critTable = [
	{
		percent : '1 to 5',
		severity : 1,
		name : 'Minor Nick',
		Result : 'Suffer 1 strain.',
		effect : '',
	},
	{
		percent : '6 to 10',
		severity : 1,
		name : 'Slowed Down',
		Result : 'May only act during last allied Initiative slot on next turn.',
		effect : '',
	},
	{
		percent : '11 to 15',
		severity : 1,
		name : 'Sudden Jolt',
		Result : 'May only act during last hero Initiative slot on next turn.',
		effect : '',
	},
	{
		percent : '16 to 20',
		severity : 1,
		name : 'Distracted',
		Result : 'Cannot perform free maneuver on next turn.',
		effect : '',
	},
	{
		percent : '21 to 25',
		severity : 1,
		name : 'Off-Balance',
		Result : 'Add 1 Setback die to next skill check.',
		effect : '',
	},
	{
		percent : '26 to 30',
		severity : 1,
		name : 'Discouraging Wound',
		Result : 'Flip one light destiny to dark.',
		effect : '',
	},
	{
		percent : '31 to 35',
		severity : 1,
		name : 'Stunned',
		Result : 'Staggered, cannot perform action on next turn.',
		effect : '',
	},
	{
		percent : '36 to 40',
		severity : 1,
		name : 'Stinger',
		Result : 'Increase difficulty of next check by 1 Difficulty die.',
		effect : '',
	},
	//----------------------------- Severity 2
	{
		percent : '41 to 45',
		severity : 2,
		name : 'Bowled Over',
		Result : 'Knocked prone and suffer 1 strain.',
		effect : '',
	},
	{
		percent : '46 to 50',
		severity : 2,
		name : 'Head Ringer',
		Result : 'Increase difficulty of all Intellect and Cunning checks by 1 Difficulty die until end of encounter.',
		effect : '',
	},
	{
		percent : '51 to 55',
		severity : 2,
		name : 'Fearsome Wound',
		Result : 'Increase difficulty of all Presence and Willpower checks by 1 Difficulty die until end of encounter.',
		effect : '',
	},
	{
		percent : '56 to 60',
		severity : 2,
		name : 'Agonizing Wound',
		Result : 'Increase difficulty of all Brawn and Agility checks by 1 Difficulty die until end of encounter.',
		effect : '',
	},
	{
		percent : '61 to 65',
		severity : 2,
		name : 'Slightly Dazed',
		Result : 'Add 1 Setback die to all skill checks until end of encounter.',
		effect : '',
	},
	{
		percent : '66 to 70',
		severity : 2,
		name : 'Scattered Senses',
		Result : 'Remove all Boost dice from all skill checks until end of encounter.',
		effect : '',
	},
	{
		percent : '71 to 75',
		severity : 2,
		name : 'Hamstrung',
		Result : 'Lose free maneuver until end of encounter.',
		effect : '',
	},
	{
		percent : '76 to 80',
		severity : 2,
		name : 'Staggered',
		Result : 'Attacker may immediately attempt another free attack against you using same dice pool as original attack.',
		effect : '',
	},
	{
		percent : '81 to 85',
		severity : 2,
		name : 'Winded',
		Result : 'Cannot voluntarily suffer strain to activate abilities or gain additional maneuvers until end of encounter.',
		effect : '',
	},
	{
		percent : '86 to 90',
		severity : 2,
		name : 'Compromised',
		Result : 'Increase difficulty of all skill checks by 1 Difficulty die until end of encounter.',
		effect : '',
	},
	//---------------------------------------- Severity 3
	{
		percent : '91 to 95',
		severity : 3,
		name : 'At the Brink',
		Result : 'Suffer 1 strain each time you perform an action.',
		effect : '',
	},
	{
		percent : '96 to 100',
		severity : 3,
		name : 'Crippled',
		Result : 'Limb crippled until healed or replaced. Increase difficulty of all checks that use that limb by 1 Difficulty die.',
		effect : '',
	},
	{
		percent : '101 to 105',
		severity : 3,
		name : 'Maimed',
		Result : 'Limb permanently lost. Unless you have a cybernetic replacement, cannot perform actions that use that limb. Add 1 Setback to all other actions.',
		effect : '',
	},
	{
		percent : '106 to 110',
		severity : 3,
		name : 'Horrific Injury',
		Result : 'Roll 1d10 to determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Until Healed, treat characteristic as one point lower.',
		effect : '',
	},
	{
		percent : '111 to 115',
		severity : 3,
		name : 'Temporarily Lame',
		Result : 'Until healed, may not perform more than one maneuver each turn.',
		effect : '',
	},
	{
		percent : '116 to 120',
		severity : 3,
		name : 'Blinded',
		Result : 'Can no longer see. Upgrade the difficulty of Perception and Vigilance checks three times, and all other checks twice.',
		effect : '',
	},
	{
		percent : '121 to 125',
		severity : 3,
		name : 'Knocked Senseless',
		Result : 'You can no longer upgrade dice for checks.',
		effect : '',
	},
	//---------------------------------------- Severity 4
	{
		percent : '126 to 130',
		severity : 4,
		name : 'Gruesome Injury',
		Result : 'Roll 1d10 to determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Characteristic is permanently one point lower.',
		effect : '',
	},
	{
		percent : '131 to 140',
		severity : 4,
		name : 'Bleeding Out',
		Result : 'Suffer 1 wound and 1 strain every round at the beginning of turn. For every 5 wounds suffered beyond wound threshold, suffer one additional Critical Injury (ignore the details for any result below this result).',
		effect : '',
	},
	{
		percent : '141 to 150',
		severity : 4,
		name : 'The End is Nigh',
		Result : 'Die after the last Initiative slot during the next round.',
		effect : '',
	},
	{
		percent : '151',
		severity : 4,
		name : 'Dead',
		Result : 'Complete, absolute death.',
		effect : '',
	}
]

//--------------------------------- UPDATE
var createDicePool = function(msg, who, playerid) {
    

    //!eed skill(1|6)
    //!eed upgrade(ability|4)
    //!eed upgrade(difficulty|4)
    //!eed downgrade(proficiency|4)
    //!eed downgrade(challenge|4)
	
	

	if (!msg.match(/!eed/)) {
		return false;
	}
	
    Argv = {
            Boost: 0,
            Ability: 0,
            Proficiency: 0,
            SetBack: 0,
            Difficulty: 0,
            Challenge: 0,
            Force: 0
        };
    
	var characterId = '';
    var characterName = '';
	var rollLabel = '';
	
	var regexCharacterID = /characterID\((.*?)\)/;
	var regexLabel = /label\((.*?)\)/;
    var regexSkill = /skill\((.*?)\)/;
    var regexUpgrade = /upgrade\((.*?)\)/;
    var regexDowngrade = /downgrade\((.*?)\)/;
    var regexEncum = /encum\((.*?)\)/;
    var regexAlphaStr = /blk$|b$|g$|y$|p$|r$|w$/;
	var regexCrit = /crit\((.*?)\)/;
	var regexCritShip = /critship\((.*?)\)/;
    
    var skillDice = function(dice) {
        
        var diceArray = dice.split('|');
        var num1 = expr(diceArray[0]);
        var num2 = expr(diceArray[1]);
        var totalAbil = Math.abs(num1-num2);
        var totalProf = (num1 < num2 ? num1 : num2);
            
            Argv.Ability = Argv.Ability + totalAbil;
            Argv.Proficiency = Argv.Proficiency + totalProf;

    }
	
	//CritShip
	var getCritShipID = function() {
		
		return {
			1 : getAttrByName(characterId, 'critShipOn1'),
			2 : getAttrByName(characterId, 'critShipOn2'),
			3 : getAttrByName(characterId, 'critShipOn3'),
			4 : getAttrByName(characterId, 'critShipOn4'),
			5 : getAttrByName(characterId, 'critShipOn5'),
			6 : getAttrByName(characterId, 'critShipOn6'),
			7 : getAttrByName(characterId, 'critShipOn7'),
			8 : getAttrByName(characterId, 'critShipOn8'),
			9 : getAttrByName(characterId, 'critShipOn9'),
			10 : getAttrByName(characterId, 'critShipOn10'),
			11 : getAttrByName(characterId, 'critShipOn11'),
			12 : getAttrByName(characterId, 'critShipOn12'),
			13 : getAttrByName(characterId, 'critShipOn13'),
			14 : getAttrByName(characterId, 'critShipOn14'),
			15 : getAttrByName(characterId, 'critShipOn15')
		}
	}
	
	var critShipRoll = function(addCritNum) {
		
		// Check for criticals
		var critObj = getCritShipID();
        
		//add exsiting crits
		var totalcrits = 0;
		var openSlot = '';

		for (var key in critObj)  {
			
            if (parseInt(critObj[key]) > 0) {
				totalcrits = totalcrits + 1;
			} else {
				openSlot = key;
                //log(openSlot);
			}
		}
        
        if (!openSlot) {
            sendChat("Alert", "Why are you not dead!");
    		return false;
        }
        
		var diceRoll = '';
		var critMod = '';
		var rollTotal = '';
		
		//roll random
		if (!addCritNum) {
			diceRoll = randomInteger(100);
			critMod = (totalcrits * 10);
			rollTotal = diceRoll + critMod;
		} else {
			rollTotal = parseInt(addCritNum);
		}
        
        //log(rollTotal);
        
		//find crit in crital table
		for (var key in critShipTable)  {
			var percent = critShipTable[key].percent.split(' to ');
			var low = parseInt(percent[0]);
			var high = percent[1] ? parseInt(percent[1]) : 1000;
			
			if ((rollTotal >= low) && (rollTotal <= high)) {
				//openSlot
				log(critShipTable[key].name);
                
				var critNameObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipName'+openSlot,
				})[0];
				
				var critSeverityObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipSeverity'+openSlot,
				})[0];
				
				var critRangeObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipRange'+openSlot,
				})[0];
				
				var critSummaryObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipSummary'+openSlot,
				})[0];
				
				var critOnObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipOn'+openSlot,
				})[0];
				
				critNameObj.set({current : critShipTable[key].name});
				critSeverityObj.set({current : critShipTable[key].severity});
				critRangeObj.set({current : critShipTable[key].percent});
				critSummaryObj.set({current : critShipTable[key].Result});
				critOnObj.set({current : openSlot});
                
                var chat = '/direct <br><b>Rolls Vehicle Critical</b><br>';
                    chat = chat + '<img src="http://i.imgur.com/JO3pOr8.png" /><br>';//need new graphic
                    chat = chat + 'Current Criticals: (' + totalcrits + ' x 10)<br>';
                    chat = chat + 'Dice Roll: ' + diceRoll + '<br>';
                    chat = chat + 'Total: ' + rollTotal + '<br>';
                    chat = chat + '<br>';
                    chat = chat + '<b>' + critShipTable[key].name + '</b><br>';
                    chat = chat +  critShipTable[key].Result + '<br>';
                
                sendChat(characterName,  chat);
               
			}
		}
		
		//use sendChat /direct + html		
	}
	
	var critShipHeal = function(critID) {
		
		var critObj = getCritShipID();
		
		for (var key in critObj) {
			
			if (critObj[key] == critID) {
				
				var critNameObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipName'+key,
				})[0];
				
				var critSeverityObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipSeverity'+key,
				})[0];
				
				var critRangeObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipRange'+key,
				})[0];
				
				var critSummaryObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipSummary'+key,
				})[0];
				
				var critOnObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critShipOn'+key,
				})[0];

				critNameObj.set({current : null});
				critSeverityObj.set({current : null});
				critRangeObj.set({current : null});
				critSummaryObj.set({current : null});
				critOnObj.set({current : 0});
				
			}
		}
		
	}
	
	//Crit injury
	
	var getCritID = function() {
		
		return {
			1 : getAttrByName(characterId, 'critOn1'),
			2 : getAttrByName(characterId, 'critOn2'),
			3 : getAttrByName(characterId, 'critOn3'),
			4 : getAttrByName(characterId, 'critOn4'),
			5 : getAttrByName(characterId, 'critOn5'),
			6 : getAttrByName(characterId, 'critOn6'),
			7 : getAttrByName(characterId, 'critOn7'),
			8 : getAttrByName(characterId, 'critOn8'),
			9 : getAttrByName(characterId, 'critOn9'),
			10 : getAttrByName(characterId, 'critOn10'),
			11 : getAttrByName(characterId, 'critOn11'),
			12 : getAttrByName(characterId, 'critOn12'),
			13 : getAttrByName(characterId, 'critOn13'),
			14 : getAttrByName(characterId, 'critOn14'),
			15 : getAttrByName(characterId, 'critOn15')
		}
	}
	
	var critRoll = function(addCritNum) {
		
		// Check for criticals
		var critObj = getCritID();
        
		//add exsiting crits
		var totalcrits = 0;
		var openSlot = '';

		for (var key in critObj)  {
			
            if (parseInt(critObj[key]) > 0) {
				totalcrits = totalcrits + 1;
			} else {
				openSlot = key;
                log(openSlot);
			}
		}
        
        if (!openSlot) {
            sendChat("Alert", "Why are you not dead!");
    		return false;
        }
        
		var diceRoll = '';
		var critMod = '';
		var rollTotal = '';
		
		//roll random
		if (!addCritNum) {
			diceRoll = randomInteger(100);
			critMod = (totalcrits * 10);
			rollTotal = diceRoll + critMod;
		} else {
			rollTotal = parseInt(addCritNum);
		}
        
        //log(rollTotal);
        
		//find crit in crital table
		for (var key in critTable)  {
			var percent = critTable[key].percent.split(' to ');
			var low = parseInt(percent[0]);
			var high = percent[1] ? parseInt(percent[1]) : 1000;
			
			if ((rollTotal >= low) && (rollTotal <= high)) {
				//openSlot
				log(critTable[key].name);
                
				var critNameObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critName'+openSlot,
				})[0];
				
				var critSeverityObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critSeverity'+openSlot,
				})[0];
				
				var critRangeObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critRange'+openSlot,
				})[0];
				
				var critSummaryObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critSummary'+openSlot,
				})[0];
				
				var critOnObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critOn'+openSlot,
				})[0];
				
				critNameObj.set({current : critTable[key].name});
				critSeverityObj.set({current : critTable[key].severity});
				critRangeObj.set({current : critTable[key].percent});
				critSummaryObj.set({current : critTable[key].Result});
				critOnObj.set({current : openSlot});
                
                var chat = '/direct <br><b>Rolls Critical Injury</b><br>';
                    chat = chat + '<img src="http://i.imgur.com/z51hRwd.png" /><br/>'
                    chat = chat + 'Current Criticals: (' + totalcrits + ' x 10)<br>';
                    chat = chat + 'Dice Roll: ' + diceRoll + '<br>';
                    chat = chat + 'Total: ' + rollTotal + '<br>';
                    chat = chat + '<br>';
                    chat = chat + '<b>' + critTable[key].name + '</b><br>';
                    chat = chat +  critTable[key].Result + '<br>';
                
                sendChat(characterName,  chat);
               
			}
		}
		
		//use sendChat /direct + html		
	}
	
	var critHeal = function(critID) {
		
		var critObj = getCritID();
		
		for (var key in critObj) {
			
			if (critObj[key] == critID) {
				
				var critNameObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critName'+key,
				})[0];
				
				var critSeverityObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critSeverity'+key,
				})[0];
				
				var critRangeObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critRange'+key,
				})[0];
				
				var critSummaryObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critSummary'+key,
				})[0];
				
				var critOnObj = findObjs({
					type: 'attribute',
					characterid: characterId,
					name:'critOn'+key,
				})[0];

				critNameObj.set({current : null});
				critSeverityObj.set({current : null});
				critRangeObj.set({current : null});
				critSummaryObj.set({current : null});
				critOnObj.set({current : 0});
				
			}
		}
		
	}

	//Create Character ID
	var charMatch = msg.match(regexCharacterID);

    if (charMatch) {
		
		if (charMatch[1]) {
			characterId = charMatch[1];
            characterName = getObj("character", characterId).get('name');
           
            log(characterName);
            characterName = characterName;
		} else {
			characterId = false;
            characterName = false;
			sendChat("Alert", "Character sheet name doesn't match sheet name. Update and try again.");
			return false;
		}
	}
	
	//Create Character ID
	var labelMatch = msg.match(regexLabel);

    if (labelMatch) {
		
		rollLabel = labelMatch[1];
		
	}

	
	
	//Create Crit Ship

	var critShipMatch = msg.match(regexCritShip);
	
	if (critShipMatch) {
		// crit(heal|@critName1)
		// crit(add|@{critAddRangeNum})
		// crit(roll)
		var critArray = critShipMatch[1].split('|');
		var prop1 = critArray[0];
		var prop2 = critArray[1] ? critArray[1] : null;
		
		if (prop1 == 'heal') {
			critShipHeal(prop2);
		} else if (prop1 == 'add') {
			critShipRoll(prop2);
		} else { // crit(roll)
            critShipRoll();
		}
		
		return false;//
	} 
	
	//Create Crit

	var critMatch = msg.match(regexCrit);

	if (critMatch) {
		// crit(heal|@critName1)
		// crit(add|@{critAddRangeNum})
		// crit(roll)
		var critArray = critMatch[1].split('|');
		var prop1 = critArray[0];
		var prop2 = critArray[1] ? critArray[1] : null;
		
		if (prop1 == 'heal') {
			critHeal(prop2);
		} else if (prop1 == 'add') {
			critRoll(prop2);
		} else { // crit(roll)
            critRoll();
		}
		
		return false;//
	}
	
	//split message on spaces ------------------------------------------ old code split into array
	
	var chatCommand = msg.toLowerCase();
	var commandArgv = chatCommand.split(' ');
	
    commandArgv = commandArgv.filter(function(e){return e});//clean array of empty null undefined
	
	//Settings ------------------------------------------ old code
	
    
    
	processScriptTabs(commandArgv, characterName, rollLabel);
	
	//End Settings --------------------------------------
	
    //Create Encumbrance
    for (var i = 0; i < commandArgv.length; i++) {
        
        var encumMatch = commandArgv[i].match(regexEncum);
            encumMatch = (encumMatch ? encumMatch[1] : false);
        
        if (encumMatch) {
            
            var diceArray = encumMatch.split('|');
            var num1 = expr(diceArray[0]);
            var num2 = expr(diceArray[1]);
            
            if (num2 > num1) {
               Argv.SetBack = num2 - num1;
            }
        } 
    }
    
    //Create skills
    for (var i = 0; i < commandArgv.length; i++) {
        
        var skillMatch = commandArgv[i].match(regexSkill);
            skillMatch = (skillMatch ? skillMatch[1] : false);
        
        if (skillMatch) {
            skillDice(skillMatch);
        } 
    }
    
    //Evaluates a mathematical expression 4+2g and combine like dice so 2g 3g = 5g   
    for (var i = 0; i < commandArgv.length; i++) {
        
        var diceColor = commandArgv[i].match(regexAlphaStr);
        var diceQty = 0;
        
		//console.log(diceColor);
		
        if (diceColor) {
            diceQty  = expr(commandArgv[i].replace(diceColor[0],''));
            diceQty = (isNaN(diceQty) ? 0 : diceQty);

            switch(diceColor[0]) {
                case 'b' :
                    Argv.Boost = Argv.Boost + diceQty;
                    break;
                case 'g' :
                    Argv.Ability = Argv.Ability + diceQty;
                    break;
                case 'y' :
                    Argv.Proficiency = Argv.Proficiency + diceQty;
                    break;
                case 'blk' :
                    Argv.SetBack = Argv.SetBack + diceQty;
                    break;
                case 'p' :
                    Argv.Difficulty = Argv.Difficulty + diceQty;
                    break;
                case 'r' :
                    Argv.Challenge = Argv.Challenge + diceQty;
                    break;
                case 'w' :
                    Argv.Force = Argv.Force + diceQty;
                    break;
                default :
                    break;
                
            }
        } 
    }
    
    //upgrade dice  
    for (var i = 0; i < commandArgv.length; i++) {
        var upgradeMatch = commandArgv[i].match(regexUpgrade);
            upgradeMatch = (upgradeMatch ? upgradeMatch[1] : false);

        if (upgradeMatch) {
            var upgradeArray = upgradeMatch.split('|');
            var type = upgradeArray[0];
            var upgradeVal = Number(upgradeArray[1]);
            
            switch(type) {
                case 'ability':
                
                    var totalProf = (upgradeVal < Argv.Ability ? upgradeVal : Argv.Ability);    
                    var totalAbil = Math.abs(upgradeVal-Argv.Ability);
                    
                    if (upgradeVal > Argv.Ability) {
                        totalProf = totalProf + Math.floor(totalAbil / 2);
                        totalAbil = totalAbil % 2;   
                    }     

                    Argv.Ability = totalAbil;
                    Argv.Proficiency = Argv.Proficiency + totalProf;

                    break;
                case 'difficulty':
                    
                    var totalChall = (upgradeVal < Argv.Difficulty ? upgradeVal : Argv.Difficulty);    
                    var totalDiff = Math.abs(upgradeVal-Argv.Difficulty);
                    
                    if (upgradeVal > Argv.Difficulty) {
                        totalChall = totalChall + Math.floor(totalDiff / 2);
                        totalDiff = totalDiff % 2;   
                    }     

                    Argv.Difficulty = totalDiff;
                    Argv.Challenge = Argv.Challenge + totalChall;
                    
                    break;
            }
        } 
    }

    //Downgrade dice  
    for (var i = 0; i < commandArgv.length; i++) {
        var downgradeMatch = commandArgv[i].match(regexDowngrade);
            downgradeMatch = (downgradeMatch ? downgradeMatch[1] : false);

        if (downgradeMatch) {
            var downgradeArray = downgradeMatch.split('|');
            var type = downgradeArray[0];
            var downgradeVal = Number(downgradeArray[1]);
            
            switch(type) {
                case 'proficiency':
                    
                    var profConvertedToAbil = Argv.Proficiency * 2;
                    
                    //console.log('downgrade:'+downgradeVal);
                    //console.log('Before - Prof:'+Argv.Proficiency+' Abil:'+ Argv.Ability);

                    if (downgradeVal > (Argv.Ability + profConvertedToAbil)) {
                        Argv.Ability = 0;
                        Argv.Proficiency = 0;
                    } else if (downgradeVal > profConvertedToAbil) {
                        downgradeVal = Math.abs(downgradeVal - profConvertedToAbil);
                        Argv.Ability = Math.abs(downgradeVal - Argv.Ability);
                        Argv.Proficiency = 0;
                    } else {
                        Argv.Ability = Argv.Ability + (profConvertedToAbil - downgradeVal) % 2;
                        Argv.Proficiency = Math.floor((profConvertedToAbil - downgradeVal) / 2);
                    }
                    
                    //console.log('After - Prof:'+Argv.Proficiency+' Abil:'+ Argv.Ability);
                    
                    break;
                case 'challenge':

                    var challConvertedToDiff = Argv.Challenge * 2;
                    
                    //console.log('downgrade:'+downgradeVal);
                    //console.log('Before - Chall:'+Argv.Challenge+' Diff:'+ Argv.Difficulty);

                    if (downgradeVal > (Argv.Difficulty + challConvertedToDiff)) {
                        Argv.Difficulty = 0;
                        Argv.Challenge = 0;
                    } else if (downgradeVal > challConvertedToDiff) {
                        downgradeVal = Math.abs(downgradeVal - challConvertedToDiff);
                        Argv.Difficulty = Math.abs(downgradeVal - Argv.Difficulty);
                        Argv.Challenge = 0;
                    } else {
                        Argv.Difficulty = Argv.Difficulty + (challConvertedToDiff - downgradeVal) % 2;
                        Argv.Challenge = Math.floor((challConvertedToDiff - downgradeVal) / 2);
                    }
                    
                    //console.log('After - Chall:'+Argv.Challenge+' Diff:'+ Argv.Difficulty);
                    
                    break;
            }
        } 
    }
    
    //Output Argv object in array
	
    var diceRollArray = ['!eed', Argv.Boost+'b', Argv.Ability+'g', Argv.Proficiency+'y', Argv.SetBack+'blk', Argv.Difficulty+'p', Argv.Challenge+'r', Argv.Force+'w'];
    
	processEdgeEmpireDiceScript(diceRollArray, characterName, rollLabel);
	eedGlobal.diceLogChatWhisper = false;// old code but whisper not setup
}

//Evaluates a mathematical expression (as a string) and return the result
var expr = function (expr) {

    var chars = expr.split("");
    var n = [], op = [], index = 0, oplast = true;

    n[index] = "";

    // Parse the expression
    for (var c = 0; c < chars.length; c++) {

        if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
            op[index] = chars[c];
            index++;
            n[index] = "";
            oplast = true;
        } else {
            n[index] += chars[c];
            oplast = false;
        }
    }

    // Calculate the expression
    expr = parseFloat(n[0]);
    for (var o = 0; o < op.length; o++) {
        var num = parseFloat(n[o + 1]);
        switch (op[o]) {
            case "+":
                expr = expr + num;
                break;
            case "-":
                expr = expr - num;
                break;
            case "*":
                expr = expr * num;
                break;
            case "/":
                expr = expr / num;
                break;
        }
    }

    return expr;
}


// ------------------------------------ Reset Characters Attr

var setupCharacters = function(charObj) {
	
    var charactersObj = charObj;
    
    //---------------------------------- createObj bug fix for add attributes
        var oldCreateObj = createObj;
        createObj = function() {
            var obj = oldCreateObj.apply(this, arguments);
            var id = obj.id;
            var characterID = obj.get('characterid');
            var type = obj.get('type');

            if (obj && !obj.fbpath && obj.changed) {
                obj.fbpath = obj.changed._fbpath.replace(/([^\/]*\/){4}/, "/");
            } else if (obj && !obj.changed && type == 'attribute') { //fix for dynamic attribute after in character created in game
                obj.fbpath = '/char-attribs/char/'+ characterID +'/'+ id;
            }
            
            // /char-attribs/char/characterID/attributeID
            
            return obj;
        }

	//Create Default Attributes for each character
	//Attribute list
	var createAttributeList = [
		{name:'characterID', current: 'characterID', max: '', update: true},
        {
			index: 15,
			attributes: [
				//crit roll table
				{name:'critName', current: '', max: '', update: false},
				{name:'critSeverity', current: '', max: '', update: false},
				{name:'critRange', current: '', max: '', update: false},
				{name:'critSummary', current: '', max: '', update: false},
				{name:'critOn', current: '0', max: '', update: false},
				//ship crit roll table
				{name:'critShipName', current: '', max: '', update: false},
				{name:'critShipSeverity', current: '', max: '', update: false},
				{name:'critShipRange', current: '', max: '', update: false},
				{name:'critShipSummary', current: '', max: '', update: false},
				{name:'critShipOn', current: '0', max: '', update: false},
			]
		}//,
	];

	var charIDs=_.pluck(charactersObj,'id');
	//log(charIDs);
	var attrNames = _.pluck(createAttributeList[1].attributes, 'name');
	//log(attrNames);
	var attrMatcher = new RegExp('^'+createAttributeList[0].name+'$|^'+attrNames.join('|^') );
	//log(attrMatcher);
	
	var attrs = _.filter(findObjs({type: 'attribute'}), function(a) {
		return ( _.contains(charIDs, a.get('characterid')) && attrMatcher.test(a.get('name')));
	});
	
	//log(attrs);
	
	_.each(charactersObj, function(c) {
		log('Character: --------------------> ' + c.get('name'));
		//log('Character ID: --------------------> ' + c.id);
        
        createAttributeList[0].current = c.id; //Adds character id to the createAttributeList object, needed for dynamic created characters in game play
        
        var attr = _.find(attrs, function(a) {
			return (a.get('characterid')  === c.id && a.get('name') === createAttributeList[0].name);
		});
        
        //log(attr);
        
		if( attr ) {
			attr.set({current: c.id});
		} else {
			createObj('attribute', {
				characterid: c.id,
				name: createAttributeList[0].name,
				current: createAttributeList[0].current,
				max: createAttributeList[0].max
			});
		}

		_.each(createAttributeList[1].attributes, function(ap) {
			for(var i = 1; i <= createAttributeList[1].index; ++i) {
				attr = _.find(attrs, function(a) {
					return (a.get('characterid') === c.id && a.get('name') === ap.name+i);
				});
				if(attr) {
					if(ap.update) {
						a.set({current: ap.current});
					}
				}
				else {
					createObj('attribute', {
						characterid: c.id,
						name: ap.name+i,
						current: ap.current,
						max: ap.max
					});
				}
			}
		});
	});
}



//---------------------------------- END UPDATE




//Create new "-DicePool" character for GM
on('ready', function() {
	

	
	//create character dicepool
    if (findObjs({ _type: "character", name: "-DicePool" }).length == 0){
       
        createObj("character", {
            name: "-DicePool",
            bio: "GM Dice Pool"
        });
       
        Char_dicePoolObject = findObjs({ _type: "character", name: "-DicePool" });
        
        createObj("attribute", {
            name: "pcgm",
            current: 1,
            characterid: Char_dicePoolObject[0].id
        });

    };
    
    //Setup Characters
    var allCharacters = findObjs({ _type: "character"});
        setupCharacters(allCharacters);
    
    
    
    //EVENTS
    
    on("add:character", function(obj) {
       var character = [obj];
       setupCharacters(character);
    });
	
    on("chat:roll", function(roll) {
        log('chat:roll - '+ roll);
    });

    on("chat:message", function(msg) {
        // returns the chat window command entered, all in lowercase.
    	
    	if (msg.type != 'api') {
            return;
        }
		
		createDicePool(msg.content, msg.who, msg.playerid)
    });

    
});