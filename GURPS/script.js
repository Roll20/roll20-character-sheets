var ENABLE_ROLL_PARSER = true;
var COMMANDS = false; //["roll", "r"];

if (ENABLE_ROLL_PARSER) {
    on("chat:message", function(message) {
        if (message.type != "emote") {
            // The GURPS sheet sends out all rolls as emotes, if this isn't an emote, we aren't interested.
            return;
        }

        log("ROLLCOMP/ Received "+message);

        if (message.content.indexOf("rolls") == -1) {
            // The GURPS will include the keyword "rolls" at the beginning of each emote. 
            // If the message doesn't include that word, we aren't interested.
            return;
        }

        if (message.content.indexOf("vs.") == -1) {
            // The GURPS will include the keyword "vs." in all rolls that should use roll comparison. 
            // If the message doesn't include that word, we aren't interested.
            return;
        }

        if (message.inlinerolls.length < 2) {
            // We need at least two numbers to make a comparison.
            return;
        }

        // We'll take the first number to be the user's roll.
        var roll = message.inlinerolls[0].results.total;
        // We'll take the second number to be the target value.
        var target = message.inlinerolls[1].results.total;

        roll_comparison(roll, target)
    });
}

if (COMMANDS && COMMANDS.length > 0) {
    on("chat:message", function(message) {
        if (message.type != "api") {
            // This function is only interested in API calls.
            return;
        }

        log("ROLLCOMP/ Received "+message);

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

        var content = message.content.substring(command.length+1);
        content = content.trim();
        log(content);

        //var test = eval("3d6");
        // We'll take the first number to be the user's roll.
        var roll = 2;//eval("3d6").results.total;
        // We'll take the second number to be the target value.
        var target = 5;//eval(content).results.total;

        roll_comparison(roll, target);
    });
}

function roll_comparison(roll, target) {
    log("ROLLCOMP/ Compare "+roll+" vs "+target);

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
    sendChat("Roll Result", "/direct "+result);
}