on("chat:message", function(msg) {
    if (msg.type !== "api") return;

    const args = msg.content.split(" ");
    if (args[0] !== "!resilience-roll") return;

    // Get character ID from --charid argument
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Resilience Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Resilience Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    // Get die and bonus
    let dieAttr = getAttrByName(charId, "resilience_die");
    let bonus = parseInt(getAttrByName(charId, "resilience_bonus") || "0", 10);

    if (!dieAttr) {
        sendChat("Resilience Roll", `/w gm No Power Die set for character.`);
        return;
    }

    // Parse die string (e.g., "1d6", "1d12+1")
    let dieMatch = dieAttr.match(/(\d+)d(\d+)([+-]\d+)?/i);
    if (!dieMatch) {
        sendChat("Resilience Roll", `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);

    // Roll dice manually
    let rollTotal = 0;
    let rollResults = [];
    for (let i = 0; i < numDice; i++) {
        let roll = randomInteger(dieSize);
        rollResults.push(roll);
        rollTotal += roll;
    }
    rollTotal += bonus;

    // Halved & rounded up unless any roll is 1
let halved = (rollResults.includes(1)) ? 0 : Math.ceil(rollTotal / 2);

    sendChat("Resilience Roll", `/em Rolled: [${rollResults.join(", ")}] + Bonus ${bonus} = ${rollTotal} → Halved & Rounded Up: ${halved}`);
});

on("chat:message", function(msg) {
    if (msg.type !== "api") return;

    const args = msg.content.split(" ");

// --------- Strength Roll with Precision and Critical ---------
if (args[0] === "!strength-roll") {
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Strength Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Strength Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    let dieAttr = getAttrByName(charId, "strength_die");
    let bonus = parseInt(getAttrByName(charId, "strength_bonus") || "0", 10);
    let precision = parseInt(getAttrByName(charId, "precision") || "0", 10);

    if (!dieAttr) {
        sendChat("Strength Roll", `/w gm No Strength Die set for character.`);
        return;
    }

    let dieMatch = dieAttr.match(/(\d+)d(\d+)([+-]\d+)?/i);
    if (!dieMatch) {
        sendChat("Strength Roll", `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);
    let dieMod = dieMatch[3] ? parseInt(dieMatch[3]) : 0;

    let rollResults = [];
    let rollTotal = 0;

    // Roll the first die
    let firstRoll = randomInteger(dieSize);
    rollResults.push(firstRoll);

    if (precision === 1) {
        // Roll Precision die
        let secondRoll = randomInteger(dieSize);
        rollResults.push(secondRoll);

        if (firstRoll === secondRoll) {
            // Critical: sum both
            rollTotal = firstRoll + secondRoll;
        } else {
            // Take the higher
            rollTotal = Math.max(firstRoll, secondRoll);
        }
    } else {
        rollTotal = firstRoll;
    }

    // Add modifier and bonus
    rollTotal += dieMod + bonus;

    // Build chat message
    let chatMessage = "";
    if (precision === 1) {
        const [first, second] = rollResults;
        if (first === second) {
            chatMessage = `/em Rolled: [${first}, ${second}] + Bonus ${bonus} = ${rollTotal} ⚡ CRITICAL! ⚡`;
        } else {
            const higher = Math.max(first, second);
            const lower = Math.min(first, second);
            chatMessage = `/em Rolled: [${lower}, ${higher} ↑] + Bonus ${bonus} = ${rollTotal}`;
        }
    } else {
        chatMessage = `/em Rolled: [${rollResults[0]}] + Bonus ${bonus} = ${rollTotal}`;
    }

    sendChat("Strength Roll", chatMessage);
}


    // --------- Speed Roll with Precision and Critical ---------
if (args[0] === "!speed-roll") {
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Speed Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Speed Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    let dieAttr = getAttrByName(charId, "speed_die");
    let bonus = parseInt(getAttrByName(charId, "speed_bonus") || "0", 10);
    let precision = parseInt(getAttrByName(charId, "precision") || "0", 10);

    if (!dieAttr) {
        sendChat("Speed Roll", `/w gm No Speed Die set for character.`);
        return;
    }

    let dieMatch = dieAttr.match(/(\d+)d(\d+)([+-]\d+)?/i);
    if (!dieMatch) {
        sendChat("Speed Roll", `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);
    let dieMod = dieMatch[3] ? parseInt(dieMatch[3]) : 0;

    let rollResults = [];
    let rollTotal = 0;

    // Roll the first die
    let firstRoll = randomInteger(dieSize);
    rollResults.push(firstRoll);

    if (precision === 1) {
        // Roll Precision die
        let secondRoll = randomInteger(dieSize);
        rollResults.push(secondRoll);

        if (firstRoll === secondRoll) {
            // Critical: sum both
            rollTotal = firstRoll + secondRoll;
        } else {
            // Take the higher
            rollTotal = Math.max(firstRoll, secondRoll);
        }
    } else {
        rollTotal = firstRoll;
    }

    // Add modifier and bonus
    rollTotal += dieMod + bonus;

    // Build chat message
    let chatMessage = "";
    if (precision === 1) {
        const [first, second] = rollResults;
        if (first === second) {
            chatMessage = `/em Rolled: [${first}, ${second}] + Bonus ${bonus} = ${rollTotal} ⚡ CRITICAL! ⚡`;
        } else {
            const higher = Math.max(first, second);
            const lower = Math.min(first, second);
            chatMessage = `/em Rolled: [${lower}, ${higher} ↑] + Bonus ${bonus} = ${rollTotal}`;
        }
    } else {
        chatMessage = `/em Rolled: [${rollResults[0]}] + Bonus ${bonus} = ${rollTotal}`;
    }

    sendChat("Speed Roll", chatMessage);
}
});

// --------- Unique Power 1 Roll with Precision & Critical ---------
on("chat:message", function(msg) {
    if (msg.type !== "api") return;
    const args = msg.content.split(" ");
    if (args[0] !== "!unique1-roll") return;

    // Get character ID from --charid argument
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Unique Power 1 Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Unique Power 1 Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    // Get die, bonus, name, and Precision toggle
    let dieAttr = getAttrByName(charId, "unique_power_1_die");
    let bonus = parseInt(getAttrByName(charId, "unique_power_1_bonus") || "0", 10);
    let powerName = getAttrByName(charId, "unique_power_1_name") || "Unique Power 1";
    let precision = parseInt(getAttrByName(charId, "precision") || "0", 10);

    if (!dieAttr) {
        sendChat(powerName, `/w gm No Power Die set for ${powerName}.`);
        return;
    }

    let dieMatch = dieAttr.match(/(\d+)d(\d+)/i);
    if (!dieMatch) {
        sendChat(powerName, `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);

    // Roll dice manually
    let rollResults = [];
    let rollTotal = 0;

    // Roll the first die
    let firstRoll = randomInteger(dieSize);
    rollResults.push(firstRoll);

    if (precision === 1) {
        // Roll Precision die
        let secondRoll = randomInteger(dieSize);
        rollResults.push(secondRoll);

        if (firstRoll === secondRoll) {
            // Critical: sum both
            rollTotal = firstRoll + secondRoll;
        } else {
            // Take the higher
            rollTotal = Math.max(firstRoll, secondRoll);
        }
    } else {
        rollTotal = firstRoll;
    }

    // Add bonus
    rollTotal += bonus;

    // Build chat message
    let chatMessage = "";
    if (precision === 1) {
        const [first, second] = rollResults;
        if (first === second) {
            chatMessage = `/em Rolled: [${first}, ${second}] + Bonus ${bonus} = ${rollTotal} ⚡ CRITICAL! ⚡`;
        } else {
            const higher = Math.max(first, second);
            const lower = Math.min(first, second);
            chatMessage = `/em Rolled: [${lower}, ${higher} ↑] + Bonus ${bonus} = ${rollTotal}`;
        }
    } else {
        chatMessage = `/em Rolled: [${rollResults[0]}] + Bonus ${bonus} = ${rollTotal}`;
    }

    sendChat(powerName, chatMessage);
});

// --------- Unique Power 2 Roll ---------
on("chat:message", function(msg) {
    if (msg.type !== "api") return;
    const args = msg.content.split(" ");
    if (args[0] !== "!unique-power-2-roll") return;

    // Get character ID from --charid argument
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Unique Power 2 Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Unique Power 2 Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    // Get precision argument from button
    let precisionIndex = args.findIndex(a => a === "--precision");
    let precision = 0;
    if (precisionIndex !== -1 && args[precisionIndex + 1]) {
        precision = parseInt(args[precisionIndex + 1], 10) || 0;
    }

    // Get die, bonus, and name
    let dieAttr = getAttrByName(charId, "unique_power_2_die");
    let bonus = parseInt(getAttrByName(charId, "unique_power_2_bonus") || "0", 10);
    let powerName = getAttrByName(charId, "unique_power_2_name") || "Unique Power 2";

    if (!dieAttr) {
        sendChat(powerName, `/w gm No Power Die set for ${powerName}.`);
        return;
    }

    let dieMatch = dieAttr.match(/(\d+)d(\d+)/i);
    if (!dieMatch) {
        sendChat(powerName, `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);

    let rollResults = [];
    let rollTotal = 0;

    // Roll the first die
    let firstRoll = randomInteger(dieSize);
    rollResults.push(firstRoll);

    if (precision === 1) {
        let secondRoll = randomInteger(dieSize);
        rollResults.push(secondRoll);

        if (firstRoll === secondRoll) {
            rollTotal = firstRoll + secondRoll;
        } else {
            rollTotal = Math.max(firstRoll, secondRoll);
        }
    } else {
        rollTotal = firstRoll;
    }

    rollTotal += bonus;

    // Chat message
    let chatMessage = "";
    if (precision === 1) {
        const [first, second] = rollResults;
        if (first === second) {
            chatMessage = `/em Rolled: [${first}, ${second}] + Bonus ${bonus} = ${rollTotal} ⚡ CRITICAL! ⚡`;
        } else {
            const higher = Math.max(first, second);
            const lower = Math.min(first, second);
            chatMessage = `/em Rolled: [${lower}, ${higher} ↑] + Bonus ${bonus} = ${rollTotal}`;
        }
    } else {
        chatMessage = `/em Rolled: [${rollResults[0]}] + Bonus ${bonus} = ${rollTotal}`;
    }

    sendChat(powerName, chatMessage);
});

// --------- Unique Power 3 Roll ---------
on("chat:message", function(msg) {
    if (msg.type !== "api") return;
    const args = msg.content.split(" ");
    if (args[0] !== "!unique-power-3-roll") return;

    // Get character ID from --charid argument
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Unique Power 3 Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Unique Power 3 Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    // Get precision argument from button
    let precisionIndex = args.findIndex(a => a === "--precision");
    let precision = 0;
    if (precisionIndex !== -1 && args[precisionIndex + 1]) {
        precision = parseInt(args[precisionIndex + 1], 10) || 0;
    }

    // Get die, bonus, and name
    let dieAttr = getAttrByName(charId, "unique_power_3_die");
    let bonus = parseInt(getAttrByName(charId, "unique_power_3_bonus") || "0", 10);
    let powerName = getAttrByName(charId, "unique_power_3_name") || "Unique Power 3";

    if (!dieAttr) {
        sendChat(powerName, `/w gm No Power Die set for ${powerName}.`);
        return;
    }

    let dieMatch = dieAttr.match(/(\d+)d(\d+)/i);
    if (!dieMatch) {
        sendChat(powerName, `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);

    let rollResults = [];
    let rollTotal = 0;

    // Roll the first die
    let firstRoll = randomInteger(dieSize);
    rollResults.push(firstRoll);

    if (precision === 1) {
        let secondRoll = randomInteger(dieSize);
        rollResults.push(secondRoll);

        if (firstRoll === secondRoll) {
            rollTotal = firstRoll + secondRoll;
        } else {
            rollTotal = Math.max(firstRoll, secondRoll);
        }
    } else {
        rollTotal = firstRoll;
    }

    rollTotal += bonus;

    // Chat message
    let chatMessage = "";
    if (precision === 1) {
        const [first, second] = rollResults;
        if (first === second) {
            chatMessage = `/em Rolled: [${first}, ${second}] + Bonus ${bonus} = ${rollTotal} ⚡ CRITICAL! ⚡`;
        } else {
            const higher = Math.max(first, second);
            const lower = Math.min(first, second);
            chatMessage = `/em Rolled: [${lower}, ${higher} ↑] + Bonus ${bonus} = ${rollTotal}`;
        }
    } else {
        chatMessage = `/em Rolled: [${rollResults[0]}] + Bonus ${bonus} = ${rollTotal}`;
    }

    sendChat(powerName, chatMessage);
});

// --------- Unique Power 4 Roll ---------
on("chat:message", function(msg) {
    if (msg.type !== "api") return;
    const args = msg.content.split(" ");
    if (args[0] !== "!unique-power-4-roll") return;

    // Get character ID from --charid argument
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Unique Power 4 Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Unique Power 4 Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    // Get precision argument from button
    let precisionIndex = args.findIndex(a => a === "--precision");
    let precision = 0;
    if (precisionIndex !== -1 && args[precisionIndex + 1]) {
        precision = parseInt(args[precisionIndex + 1], 10) || 0;
    }

    // Get die, bonus, and name
    let dieAttr = getAttrByName(charId, "unique_power_4_die");
    let bonus = parseInt(getAttrByName(charId, "unique_power_4_bonus") || "0", 10);
    let powerName = getAttrByName(charId, "unique_power_4_name") || "Unique Power 4";

    if (!dieAttr) {
        sendChat(powerName, `/w gm No Power Die set for ${powerName}.`);
        return;
    }

    let dieMatch = dieAttr.match(/(\d+)d(\d+)/i);
    if (!dieMatch) {
        sendChat(powerName, `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);

    let rollResults = [];
    let rollTotal = 0;

    // Roll the first die
    let firstRoll = randomInteger(dieSize);
    rollResults.push(firstRoll);

    if (precision === 1) {
        let secondRoll = randomInteger(dieSize);
        rollResults.push(secondRoll);

        if (firstRoll === secondRoll) {
            rollTotal = firstRoll + secondRoll;
        } else {
            rollTotal = Math.max(firstRoll, secondRoll);
        }
    } else {
        rollTotal = firstRoll;
    }

    rollTotal += bonus;

    // Chat message
    let chatMessage = "";
    if (precision === 1) {
        const [first, second] = rollResults;
        if (first === second) {
            chatMessage = `/em Rolled: [${first}, ${second}] + Bonus ${bonus} = ${rollTotal} ⚡ CRITICAL! ⚡`;
        } else {
            const higher = Math.max(first, second);
            const lower = Math.min(first, second);
            chatMessage = `/em Rolled: [${lower}, ${higher} ↑] + Bonus ${bonus} = ${rollTotal}`;
        }
    } else {
        chatMessage = `/em Rolled: [${rollResults[0]}] + Bonus ${bonus} = ${rollTotal}`;
    }

    sendChat(powerName, chatMessage);
});

// --------- Unique Power 5 Roll ---------
on("chat:message", function(msg) {
    if (msg.type !== "api") return;
    const args = msg.content.split(" ");
    if (args[0] !== "!unique-power-5-roll") return;

    // Get character ID from --charid argument
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Unique Power 5 Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Unique Power 5 Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    // Get precision argument from button
    let precisionIndex = args.findIndex(a => a === "--precision");
    let precision = 0;
    if (precisionIndex !== -1 && args[precisionIndex + 1]) {
        precision = parseInt(args[precisionIndex + 1], 10) || 0;
    }

    // Get die, bonus, and name
    let dieAttr = getAttrByName(charId, "unique_power_5_die");
    let bonus = parseInt(getAttrByName(charId, "unique_power_5_bonus") || "0", 10);
    let powerName = getAttrByName(charId, "unique_power_5_name") || "Unique Power 5";

    if (!dieAttr) {
        sendChat(powerName, `/w gm No Power Die set for ${powerName}.`);
        return;
    }

    let dieMatch = dieAttr.match(/(\d+)d(\d+)/i);
    if (!dieMatch) {
        sendChat(powerName, `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);

    let rollResults = [];
    let rollTotal = 0;

    // Roll the first die
    let firstRoll = randomInteger(dieSize);
    rollResults.push(firstRoll);

    if (precision === 1) {
        let secondRoll = randomInteger(dieSize);
        rollResults.push(secondRoll);

        if (firstRoll === secondRoll) {
            rollTotal = firstRoll + secondRoll;
        } else {
            rollTotal = Math.max(firstRoll, secondRoll);
        }
    } else {
        rollTotal = firstRoll;
    }

    rollTotal += bonus;

    // Chat message
    let chatMessage = "";
    if (precision === 1) {
        const [first, second] = rollResults;
        if (first === second) {
            chatMessage = `/em Rolled: [${first}, ${second}] + Bonus ${bonus} = ${rollTotal} ⚡ CRITICAL! ⚡`;
        } else {
            const higher = Math.max(first, second);
            const lower = Math.min(first, second);
            chatMessage = `/em Rolled: [${lower}, ${higher} ↑] + Bonus ${bonus} = ${rollTotal}`;
        }
    } else {
        chatMessage = `/em Rolled: [${rollResults[0]}] + Bonus ${bonus} = ${rollTotal}`;
    }

    sendChat(powerName, chatMessage);
});

// --------- Unique Power 6 Roll ---------
on("chat:message", function(msg) {
    if (msg.type !== "api") return;
    const args = msg.content.split(" ");
    if (args[0] !== "!unique-power-6-roll") return;

    // Get character ID from --charid argument
    let charidArgIndex = args.findIndex(a => a === "--charid");
    if (charidArgIndex === -1 || !args[charidArgIndex + 1]) {
        sendChat("Unique Power 6 Roll", "/w gm No character ID provided!");
        return;
    }

    let charId = args[charidArgIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("Unique Power 6 Roll", `/w gm Character not found: ${charId}`);
        return;
    }

    // Get precision argument from button
    let precisionIndex = args.findIndex(a => a === "--precision");
    let precision = 0;
    if (precisionIndex !== -1 && args[precisionIndex + 1]) {
        precision = parseInt(args[precisionIndex + 1], 10) || 0;
    }

    // Get die, bonus, and name
    let dieAttr = getAttrByName(charId, "unique_power_6_die");
    let bonus = parseInt(getAttrByName(charId, "unique_power_6_bonus") || "0", 10);
    let powerName = getAttrByName(charId, "unique_power_6_name") || "Unique Power 6";

    if (!dieAttr) {
        sendChat(powerName, `/w gm No Power Die set for ${powerName}.`);
        return;
    }

    let dieMatch = dieAttr.match(/(\d+)d(\d+)/i);
    if (!dieMatch) {
        sendChat(powerName, `/w gm Could not parse die type: ${dieAttr}`);
        return;
    }

    let numDice = parseInt(dieMatch[1]);
    let dieSize = parseInt(dieMatch[2]);

    let rollResults = [];
    let rollTotal = 0;

    // Roll the first die
    let firstRoll = randomInteger(dieSize);
    rollResults.push(firstRoll);

    if (precision === 1) {
        let secondRoll = randomInteger(dieSize);
        rollResults.push(secondRoll);

        if (firstRoll === secondRoll) {
            rollTotal = firstRoll + secondRoll;
        } else {
            rollTotal = Math.max(firstRoll, secondRoll);
        }
    } else {
        rollTotal = firstRoll;
    }

    rollTotal += bonus;

    // Chat message
    let chatMessage = "";
    if (precision === 1) {
        const [first, second] = rollResults;
        if (first === second) {
            chatMessage = `/em Rolled: [${first}, ${second}] + Bonus ${bonus} = ${rollTotal} ⚡ CRITICAL! ⚡`;
        } else {
            const higher = Math.max(first, second);
            const lower = Math.min(first, second);
            chatMessage = `/em Rolled: [${lower}, ${higher} ↑] + Bonus ${bonus} = ${rollTotal}`;
        }
    } else {
        chatMessage = `/em Rolled: [${rollResults[0]}] + Bonus ${bonus} = ${rollTotal}`;
    }

    sendChat(powerName, chatMessage);
});

on("chat:message", function(msg) {
    if(msg.type === "api" && msg.content === "!clearBattleTracker") {
        let characterId = "-O_PfVdhW3EJ6uVZAsCK"; // your character's ID

        // Reset attributes in Roll20
        let attrs = findObjs({ type: "attribute", _characterid: characterId });
        attrs.forEach(attr => {
            if(attr.get("name") === "free_action") attr.set("current", 0);
            if(attr.get("name") === "phase1_choice") attr.set("current", "");
            if(attr.get("name") === "phase2_choice") attr.set("current", "");
            if(attr.get("name") === "phase3_choice") attr.set("current", "");
        });

        // VISUAL RESET: clear the HTML inputs on the sheet
        // Only works if the sheet inputs are in the same page context
        setTimeout(() => {
            let sheet = document.querySelector(".battle-tracker");
            if(sheet) {
                // Clear Free Action checkbox
                let freeAction = sheet.querySelector('input[name="attr_free_action"]');
                if(freeAction) freeAction.checked = false;

                // Clear radio buttons for each phase
                ["attr_phase1_choice", "attr_phase2_choice", "attr_phase3_choice"].forEach(phase => {
                    let radios = sheet.querySelectorAll(`input[name="${phase}"]`);
                    radios.forEach(r => r.checked = false);
                });
            }
        }, 50); // small delay to ensure the sheet HTML exists

        sendChat("System", `/w gm Battle Tracker cleared for character!`);
    }
});

// Function to calculate Energy Reserve totals
function updateEnergyReserve() {
    log("updateEnergyReserve fired"); // Debug check
    
    const powers = [
        {current: "strength_current_ep", max: "strength_max_ep"},
        {current: "speed_current_ep", max: "speed_max_ep"},
        {current: "resilience_current_ep", max: "resilience_max_ep"}
    ];

    getAttrs(
        powers.reduce((arr, p) => arr.concat([p.current, p.max]), []),
        function(values) {
            log("Fetched values: ", values); // Debug check

            let totalCurrent = 0;
            let totalMax = 0;

            powers.forEach(function(power) {
                totalCurrent += parseInt(values[power.current] || 0, 10);
                totalMax += parseInt(values[power.max] || 0, 10);
            });

            log("Totals:", totalCurrent, "/", totalMax); // Debug check

            setAttrs({
                energy_reserve: totalCurrent,
                energy_reserve_max: totalMax
            });
        }
    );
}
on("chat:message", function(msg) {
    if (msg.type !== "api") return;
    if (!msg.content.startsWith("!reset-phases")) return;

    const args = msg.content.split(" ");
    const charIdIndex = args.indexOf("--charid");
    if (charIdIndex === -1 || !args[charIdIndex + 1]) {
        sendChat("New Round Started!", "/w gm No character ID provided!");
        return;
    }

    const charId = args[charIdIndex + 1];
    const character = getObj("character", charId);
    if (!character) {
        sendChat("New Round Started!", "/w gm Character not found!");
        return;
    }

    // --- NEW PHASE CHECK ---
    const phaseAttrs = ["phase1_action", "phase2_action", "phase3_action"];
    const incomplete = phaseAttrs.some(attrName => {
        const attr = findObjs({ _type: "attribute", _characterid: charId, name: attrName })[0];
        return !attr || parseInt(attr.get("current") || "0", 10) === 0;
    });
    if (incomplete) {
        sendChat("System", `/w "${character.get("name")}" All phases must be completed before starting a new round!`);
        return; // stop execution
    }
    // --- END NEW PHASE CHECK ---

    // Fetch the current combat_round attribute
    let combatRoundAttr = findObjs({
        _type: "attribute",
        _characterid: charId,
        name: "combat_round"
    })[0];

    let round = 1; // default
    if (combatRoundAttr) {
        round = parseInt(combatRoundAttr.get("current") || "0", 10) + 1;
    }

    // Update all attributes
    const attrsToUpdate = {
        phase1_action: 0,
        phase2_action: 0,
        phase3_action: 0,
        free_action: 0,
        combat_round: round
    };

    // Make sure all attributes exist
    for (let name in attrsToUpdate) {
        let attr = findObjs({
            _type: "attribute",
            _characterid: charId,
            name: name
        })[0];
        if (!attr) {
            createObj("attribute", {
                _characterid: charId,
                name: name,
                current: attrsToUpdate[name]
            });
        } else {
            attr.set("current", attrsToUpdate[name]);
        }
    }

    sendChat("New Round Started", `/w "${character.get("name")}" New Round Started! Round is now ${round}`);
});
