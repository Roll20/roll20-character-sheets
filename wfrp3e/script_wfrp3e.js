// name: script_wfrp
// author: omonubi (omonubi@hotmail.com)
// description: 
// This script rolls a certain number of WFRP 3rd Edition dice, and both displays and summarizes the result, in graphical format.
// The number of each type of WFRP 3e die to be rolled is specified by entering up to 7 digits, each digit representing one type of die.
// The order of the digits are:
//    B - Characteristic
//    R - Reckless
//	C - Conservative
//	E - Expertise
//	F - Fortune
//	X - Challenge
//	M - Misfortune
// E.G. '!wfrp 3021231'
// Typing '!wfrp' alone rolls a single Characteristic die.
// Typing '!wfrp ?' display a short-hand reminder of the dice types and expected order ('BRCWFXM').


// Styles
var STYLE_DICE = "height:15px; width:15px; ";
var STYLE_DICE_RESULTS = "height:30px; width:30px; ";


// Graphics source URLs
var WFRP_GRXURL_CHALLENGE_BLANK = "https://s3.amazonaws.com/files.d20.io/images/4321234/Bw0SBdlGvrgAm15Ht5hNnQ/thumb.gif?1402251734";
var WFRP_GRXURL_CHALLENGE_BANE = "https://s3.amazonaws.com/files.d20.io/images/4321237/mqPlZxexnLTzSAk0nd3FSA/thumb.gif?1402251741";
var WFRP_GRXURL_CHALLENGE_BANES = "https://s3.amazonaws.com/files.d20.io/images/4321239/b7Nbhoy5V92RUCdGQa1jiA/thumb.gif?1402251746";
var WFRP_GRXURL_CHALLENGE_STAR = "https://s3.amazonaws.com/files.d20.io/images/4321236/ihO2hE2NDmSHo3y_WM3uhQ/thumb.gif?1402251737";
var WFRP_GRXURL_CHALLENGE_FAILURE = "https://s3.amazonaws.com/files.d20.io/images/4321241/mdcwuEyiThLSh9XaLmy9sQ/thumb.gif?1402251751";
var WFRP_GRXURL_CHALLENGE_FAILURES = "https://s3.amazonaws.com/files.d20.io/images/4321242/ilE8MnH9o7qChMLsoyqMfA/thumb.gif?1402251755";
var WFRP_GRXURL_CHAR_BLANK = "https://s3.amazonaws.com/files.d20.io/images/4320431/k7EHhkNAK7Fuzi_wO-YRWw/thumb.gif?1402246289";
var WFRP_GRXURL_CHAR_BOON = "https://s3.amazonaws.com/files.d20.io/images/4320432/Cs-9vIOiKJRkunzKkM5xjQ/thumb.gif?1402246293";
var WFRP_GRXURL_CHAR_SUCCESS = "https://s3.amazonaws.com/files.d20.io/images/4320433/1kDEwavvDTJzeWSS1GqSpg/thumb.gif?1402246297";
var WFRP_GRXURL_CONSERVE_BLANK = "https://s3.amazonaws.com/files.d20.io/images/4320961/XFtB4Djk0XzdvX-SjvWpfw/thumb.gif?1402250080";
var WFRP_GRXURL_CONSERVE_BOON = "https://s3.amazonaws.com/files.d20.io/images/4320963/fPQ3vhtUgSVRhYAdNmoUDQ/thumb.gif?1402250084";
var WFRP_GRXURL_CONSERVE_BOONSUCCESS = "https://s3.amazonaws.com/files.d20.io/images/4320964/3XxfCPKnEMZlbHOtq1FmZg/thumb.gif?1402250088";
var WFRP_GRXURL_CONSERVE_DELAY = "https://s3.amazonaws.com/files.d20.io/images/4321758/vOmsyM7FH-a9yiOI1bJ3CQ/thumb.gif?1402255442";
var WFRP_GRXURL_CONSERVE_DELAYSUCCESS = "https://s3.amazonaws.com/files.d20.io/images/4320965/fa4yXF7NGCCo647sg0mSoQ/thumb.gif?1402250092";
var WFRP_GRXURL_CONSERVE_SUCCESS = "https://s3.amazonaws.com/files.d20.io/images/4320966/w2XWTcM6y2cq26G6GG6CNg/thumb.gif?1402250096";
var WFRP_GRXURL_EXPERT_BLANK = "https://s3.amazonaws.com/files.d20.io/images/4321072/0v4x0BgwG_iC-cH9wjYmzg/thumb.gif?1402250759";
var WFRP_GRXURL_EXPERT_BOON = "https://s3.amazonaws.com/files.d20.io/images/4321073/NJoYB0i_wpATtcWILq5NOQ/thumb.gif?1402250763";
var WFRP_GRXURL_EXPERT_COMET = "https://s3.amazonaws.com/files.d20.io/images/4321075/1O2_HEk0Lj0-LLWiUl07yA/thumb.gif?1402250767";
var WFRP_GRXURL_EXPERT_SUCCESS = "https://s3.amazonaws.com/files.d20.io/images/4321077/trEec1ILEjJ7wHmfjAXDtw/thumb.gif?1402250770";
var WFRP_GRXURL_EXPERT_SUCCESSPLUS = "https://s3.amazonaws.com/files.d20.io/images/4321599/vryNF_fn1VAemxrQ9IuSkQ/thumb.gif?1402254349";
var WFRP_GRXURL_FORTUNE_BLANK = "https://s3.amazonaws.com/files.d20.io/images/4320217/LR5kj1_cve-TN4JwCfiWwg/thumb.gif?1402244607";
var WFRP_GRXURL_FORTUNE_BOON = "https://s3.amazonaws.com/files.d20.io/images/4320219/LHvVt3vEM7bcvhHuR_kKMw/thumb.gif?1402244616";
var WFRP_GRXURL_FORTUNE_SUCCESS = "https://s3.amazonaws.com/files.d20.io/images/4320220/yVZAHjr8ZTEfnXQ38ooCZQ/thumb.gif?1402244621";
var WFRP_GRXURL_MISFORTUNE_BLANK = "https://s3.amazonaws.com/files.d20.io/images/4321358/MVGbNi-Idtk0ACvWdcs8PA/thumb.gif?1402252487";
var WFRP_GRXURL_MISFORTUNE_BANE = "https://s3.amazonaws.com/files.d20.io/images/4321359/4GR3fEcJOKYyYmhwsI859w/thumb.gif?1402252491";
var WFRP_GRXURL_MISFORTUNE_FAILURE = "https://s3.amazonaws.com/files.d20.io/images/4321360/bii4ffB3d8m_bSy1QqcnLA/thumb.gif?1402252494";
var WFRP_GRXURL_RECKLESS_BLANK = "https://s3.amazonaws.com/files.d20.io/images/4320811/Waq2OBme-YrAu_zkHtKQdw/thumb.gif?1402248995";
var WFRP_GRXURL_RECKLESS_BANE = "https://s3.amazonaws.com/files.d20.io/images/4320810/raRXwKkMyLAecqSHCD21pA/thumb.gif?1402248992";
var WFRP_GRXURL_RECKLESS_BOONS = "https://s3.amazonaws.com/files.d20.io/images/4320808/wSI0dXwcqmp0RI7zD5FEfQ/thumb.gif?1402248985";
var WFRP_GRXURL_RECKLESS_BOONSUCCESS = "https://s3.amazonaws.com/files.d20.io/images/4320813/HMJEaSv5rY3aKFm-5kMjdw/thumb.gif?1402248999";
var WFRP_GRXURL_RECKLESS_EXERT = "https://s3.amazonaws.com/files.d20.io/images/4321761/GbSMoA2KSPjcS8e0vX-v9g/thumb.gif?1402255446";
var WFRP_GRXURL_RECKLESS_EXERTSUCCESS = "https://s3.amazonaws.com/files.d20.io/images/4320814/BA5YNq3JPKtbgjd-Hn-tnA/thumb.gif?1402249003";
var WFRP_GRXURL_RECKLESS_SUCCESSES = "https://s3.amazonaws.com/files.d20.io/images/4320809/gz_ULSgaj_AGj81f-YnxPA/thumb.gif?1402248989";


// Global result counts
var gNumSuccesses = 0;
var gNumBoons = 0;
var gNumStars = 0;
var gNumComets = 0;
var gIsExerted = false;
var gIsDelayed = false;


// Main
on("chat:message", function (msg) {
    'use strict';


    // Exit if not an api command
    if (msg.type !== "api") {
        return;
    }


    // Get the API Chat Command
    //msg.who = msg.who.replace(" (GM)", "");
    //msg.content = msg.content.replace("(GM) ", "");
    var command = msg.content.split(/\s+/)[0];


    if (command === "!wfrp") {
        var strPool = msg.content.substring(6,13);
        var strOutput = "<div><u>Rolling (" + strPool + ")...</u></div>";


        if (strPool.substring(0,1) === "?") {
            sendChat("player|" + msg.playerid, "/direct !wfrp BRCEFXM");
            return;
        }


        ClearCounts(); //rest global variables


        // Loop through dice counts and make rolls
        strOutput += "<div>";


        var numCharacteristic = 0;
        if (msg.content.substring(6,7) === "") {
            numCharacteristic = 1;
        } else {
            numCharacteristic = msg.content.substring(6,7);
        }
        if (numCharacteristic > 0) {
            strOutput += RollCharacteristic(numCharacteristic);
        }


        var numReckless = msg.content.substring(7,8);
        if (numReckless > 0) strOutput += RollReckless(numReckless);


        var numConservative = msg.content.substring(8,9);
        if (numConservative > 0) strOutput += RollConservative(numConservative);


        var numExpertise = msg.content.substring(9,10);
        if (numExpertise > 0) strOutput += RollExpertise(numExpertise);


        var numFortune = msg.content.substring(10,11);
        if (numFortune > 0) strOutput += RollFortune(numFortune);


        var numChallenge = msg.content.substring(11,12);
        if (numChallenge > 0) strOutput += RollChallenge(numChallenge);


        var numMisfortune = msg.content.substring(12,13);
        if (numMisfortune > 0) strOutput += RollMisfortune(numMisfortune);


        strOutput += "</div>";


        sendChat("player|" + msg.playerid, "/direct " + strOutput + NetResults());
    }
});


// Resets global variable counts
function ClearCounts() {
    'use strict';


    gNumSuccesses = 0;
    gNumBoons = 0;
    gNumStars = 0;
    gNumComets = 0;
    gIsExerted = false;
    gIsDelayed = false;    
}


// Tabulates and displays cumulative results
function NetResults(){
    'use strict';


    var strOutput = "<div><u>Net Results:</u></div><div>";


    if (gNumSuccesses > 0) {
        for (var a = 0; a < gNumSuccesses; a++) {
            strOutput += "<img style='" + STYLE_DICE_RESULTS + "' src='" + WFRP_GRXURL_CHAR_SUCCESS + "'/>"
        }
    }
    if (gNumSuccesses < 0) {
        for (var a = 0; a < Math.abs(gNumSuccesses); a++) {
            strOutput += "<img style='" + STYLE_DICE_RESULTS + "' src='" + WFRP_GRXURL_CHALLENGE_FAILURE + "'/>"
        }
    }
    if (gNumBoons > 0) {
        for (var a = 0; a < gNumBoons; a++) {
            strOutput += "<img style='" + STYLE_DICE_RESULTS + "' src='" + WFRP_GRXURL_FORTUNE_BOON + "'/>"
        }
    }
    if (gNumBoons < 0) {
        for (var a = 0; a < Math.abs(gNumBoons); a++) {
            strOutput += "<img style='" + STYLE_DICE_RESULTS + "' src='" + WFRP_GRXURL_MISFORTUNE_BANE + "'/>"
        }
    }
    if (gNumStars > 0) {
        for (var a = 0; a < gNumStars; a++) {
            strOutput += "<img style='" + STYLE_DICE_RESULTS + "' src='" + WFRP_GRXURL_CHALLENGE_STAR + "'/>"
        }
    }
    if (gNumComets > 0) {
        for (var a = 0; a < gNumComets; a++) {
            strOutput += "<img style='" + STYLE_DICE_RESULTS + "' src='" + WFRP_GRXURL_EXPERT_COMET + "'/>"
        }
    }
    if (gIsExerted) 
        strOutput += "<img style='" + STYLE_DICE_RESULTS + "' src='" + WFRP_GRXURL_RECKLESS_EXERT + "'/>"
    if (gIsDelayed) 
        strOutput += "<img style='" + STYLE_DICE_RESULTS + "' src='" + WFRP_GRXURL_CONSERVE_DELAY + "'/>"


    strOutput += "</div>";


    return strOutput;
}


// Rolls challenge dice
function RollChallenge (numDice) {
    'use strict';


    var result = "";
    for (var a = 0; a < numDice; a++)
    {
        switch(randomInteger(8)) {
            case 1:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHALLENGE_BLANK + "'/>";
                break;
            case 2:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHALLENGE_BANE + "'/>";
                gNumBoons--;
                break;
            case 3:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHALLENGE_BANES + "'/>";
                gNumBoons -= 2;
                break;
            case 4:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHALLENGE_STAR + "'/>";
                gNumStars++;
                break;
            case 5: case 6:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHALLENGE_FAILURE + "'/>";
                gNumSuccesses--;
                break;
            case 7: case 8:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHALLENGE_FAILURES + "'/>";
                gNumSuccesses -= 2;
                break;
        }
    }
    return result;
}


// Rolls characteristic dice
function RollCharacteristic (numDice) {
    'use strict';


    var result = "";
    for (var a = 0; a < numDice; a++)
    {
        switch(randomInteger(8)) {
            case 1: case 2:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHAR_BLANK + "'/>";
                break;
            case 3: case 4:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHAR_BOON + "'/>";
                gNumBoons++;
                break;
            case 5: case 6: case 7: case 8:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CHAR_SUCCESS + "'/>";
                gNumSuccesses++;
                break;
        }
    }
    return result;
}


// Rolls conservative dice
function RollConservative (numDice) {
    'use strict';


    var result = "";
    for (var a = 0; a < numDice; a++)
    {
        switch(randomInteger(10)) {
            case 1:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CONSERVE_BLANK + "'/>";
                break;
            case 2: case 3:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CONSERVE_BOON + "'/>";
                gNumBoons++;
                break;
            case 4:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CONSERVE_BOONSUCCESS + "'/>";
                gNumBoons++;
                gNumSuccesses++;
                break;
            case 5: case 6:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CONSERVE_DELAYSUCCESS + "'/>";
                gIsDelayed = true;
                gNumSuccesses++;
                break;
            case 7: case 8: case 9: case 10:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_CONSERVE_SUCCESS + "'/>";
                gNumSuccesses++;
                break;
        }
    }
    return result;
}


// Rolls expertise dice
function RollExpertise (numDice) {
    'use strict';


    var result = "";
    for (var a = 0; a < numDice; a++)
    {
        switch(randomInteger(6)) {
            case 1:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_EXPERT_BLANK + "'/>";
                break;
            case 2: case 3:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_EXPERT_BOON + "'/>";
                gNumBoons++;
                break;
            case 4:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_EXPERT_SUCCESS + "'/>";
                gNumSuccesses++;
                break;
            case 5:
                a--;  // Exploding Success
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_EXPERT_SUCCESSPLUS + "'/>";
                gNumSuccesses++;
                break;
            case 6:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_EXPERT_COMET + "'/>";
                gNumComets++;
                break;
        }
    }
    return result;
}


// Rolls fortune dice
function RollFortune (numDice) {
    'use strict';


    var result = "";
    for (var a = 0; a < numDice; a++)
    {
        switch(randomInteger(6)) {
            case 1: case 2: case 3:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_FORTUNE_BLANK + "'/>";
                break;
            case 4:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_FORTUNE_BOON + "'/>";
                gNumBoons++;
                break;
            case 5: case 6:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_FORTUNE_SUCCESS + "'/>";
                gNumSuccesses++;
                break;
        }
    }
    return result;
}


// Rolls misfortune dice
function RollMisfortune (numDice) {
    'use strict';


    var result = "";
    for (var a = 0; a < numDice; a++)
    {
        switch(randomInteger(6)) {
            case 1: case 2: case 3:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_MISFORTUNE_BLANK + "'/>";
                break;
            case 4:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_MISFORTUNE_BANE + "'/>";
                gNumBoons--;
                break;
            case 5: case 6:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_MISFORTUNE_FAILURE + "'/>";
                gNumSuccesses--;
                break;
        }
    }
    return result;
}


// Rolls reckless dice
function RollReckless (numDice) {
    'use strict';


    var result = "";
    for (var a = 0; a < numDice; a++)
    {
        switch(randomInteger(10)) {
            case 1: case 2:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_RECKLESS_BLANK + "'/>";
                break;
            case 3: case 4:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_RECKLESS_BANE + "'/>";
                gNumBoons--;
                break;
            case 5:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_RECKLESS_BOONS + "'/>";
                gNumBoons += 2;
                break;
            case 6:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_RECKLESS_BOONSUCCESS + "'/>";
                gNumBoons++;
                gNumSuccesses++;
                break;
            case 7: case 8:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_RECKLESS_EXERTSUCCESS + "'/>";
                gIsExerted = true;
                gNumSuccesses++;
                break;
            case 9: case 10:
                result += "<img style='" + STYLE_DICE +"' src='" + WFRP_GRXURL_RECKLESS_SUCCESSES + "'/>";
                gNumSuccesses += 2;
                break;
        }
    }
    return result;
}
