var ENABLE_ROLL_PARSER = true;
var COMMANDS = ["roll vs", "r vs", "gmroll vs", "gmr vs", "roll", "r", "gmroll", "gmr"];

on("chat:message", function(message) {
    if (ENABLE_ROLL_PARSER && (message.type != "api")) {
        parse_chat(message);
        return;
    } else if (COMMANDS.length > 0 && (message.type == "api")) {
        parse_command(message);
        return;
    }
});


function parse_chat(message) {
    if (message.content.indexOf("vs:") == -1) {
        // The GURPS sheet will include the keyword "vs:" in all rolls that should use roll comparison. 
        // If the message doesn't include that word, we aren't interested.
        return;
    }

    if (message.inlinerolls != undefined && message.inlinerolls.length < 2) {
        // We need at least two numbers to make a comparison.
        return;
    }

    log("ROLLCOMP/ Received CHAT "+JSON.stringify(message));

    // We'll take the first number to be the user's roll.
    var roll = message.inlinerolls[0].results.total;
    // We'll take the second number to be the target value.
    var target = message.inlinerolls[1].results.total;

    // Has the loud flag been set? If so we'll want to print out some messages.
    var loud = (message.content.indexOf("--l") != -1);

    if (message.type == "whisper" && !loud) {
        roll_comparison(roll, target, "/w "+message.target_name);
        roll_comparison(roll, target, "/w "+message.who);
    } else {
        if (loud) {
            // Strip the original method of all inline rolls and print it to chat.
            strippedMessage = message.content.replace(/ \$\[\[\d*\]\]/g, "");
            strippedMessage = strippedMessage.replace(/--. /g, "");
            strippedMessage = strippedMessage.replace(/vs:/g, "vs.");
            sendChat("API", strippedMessage);
        }
        
        roll_comparison(roll, target);
    }
}

function parse_command(message) {
    var command;
    for (var i in COMMANDS) {
        if (message.content.indexOf("!"+COMMANDS[i]) == 0) {
            command = COMMANDS[i];
            break;
        }
    }

    if (command == undefined) {
        // No recognized command was found.
        return;
    }

    log("ROLLCOMP/ Received API "+JSON.stringify(message));

    var content = message.content.substring(command.length+1);
    content = content.trim();

    try {
        sendChat("", "[[3d6]] [["+content+"]]", function(results) {
            var roll = results[0].inlinerolls[1].results.total;
            var target = results[0].inlinerolls[2].results.total;

            if (command.indexOf("gm") == 0) {
                roll_comparison(roll, target, "/w gm Rolling [["+roll+"]] vs [["+target+"]]\n/w gm");
            } else {
                roll_comparison(roll, target, message.who+" rolls [["+roll+"]] vs [["+target+"]]\n");
            }
        });
    } catch (error) {
        log("ROLLCOMP/ Error: \""+error+"\"");
    }
}

function roll_comparison(roll, target, output) {
    log("ROLLCOMP/ Compare "+JSON.stringify(roll)+" vs "+JSON.stringify(target));

    if (output == undefined) {
        output = "/direct";
    }

    // Calculate the difference between the rolls.
    var difference = target - roll;

    var result;

    if (roll == 3 || roll == 4 || (roll == 5 && target >= 15) || (roll == 6 && target >= 16)) {
        // CRITICAL SUCCESS!
        // 3 and 4 are always critical success.
        // 5 is a critical success if your effective skill is 15 or higher.
        // 6 is a critical success if your effective skill is 16 or higher.
        result = "Critical Success!";
    } else if (roll == 18 || (target < 16 && roll == 17) || difference <= -10) {
        // CRITICAL FAILURE
        // 18 is always a critical failure.
        // 17 is a critical failure when your skill is 15 or less.
        // A roll of 10 over your effective skill is a critical failure.
        result = "Critical Failure!";
    } else if (roll == 17 || difference < 0) {
        // FAILURE
        // 17 is always a failure.
        // A roll that exceeds your skill is a failure.
        result = "Failure by "+Math.abs(difference);
    } else if (difference >= 0) {
        // A roll that is equal to or lower than your skill is a success.
        result = "Success by "+difference;
    }

    log("ROLLCOMP/ "+result);
    sendChat("API", output+" "+result);
}