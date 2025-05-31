async function arm5roll({ trigger }) {
    // the arm5rolls value is created by the pug in arm5roller
    // and contains the rolls for the action button
    const roll = arm5rolls[trigger.name];
    const { rollId, results } = await startRoll("" + roll);
    finishRoll(rollId);
    const stress_names = [];
    const stress_dice = [];
    const stress_bonuses = [];
    for (const [key, rollObj] of Object.entries(results)) {
        if (key.startsWith("stress_")) {
            d10s = rollObj.rolls.filter(dice => dice.sides == 10 && dice.dice == 1);
            if (d10s.length == 1) {
                stress_names.push(key);
                stress_dice.push(d10s[0].results[0]);
                stress_bonuses.push(rollObj.result - d10s[0].results[0]);
            }
        }
    }
    // Handle botches
    const potential_botches = Array.from(_.zip(stress_names, stress_dice).entries())
        .filter(([index, [name, dice]]) => (dice == 10) && (!name.endsWith("_nobotch")))
        .map(([index, rest]) => index)
        ;
    // For each potential botch, query the number of botch die from the user
    // Use a single roll with many queries, and translation attributes on the sheet for display
    const botch_queries = potential_botches.map(index => "?{" + stress_names[index] + "|1}");
    const botch_query = botch_queries.join(" ");
    if (!(botch_query === "")) {
        const { rollId, results } = await startRoll("!" + botch_query);
    }


    console.log({
        trigger: trigger,
        arm5rolls: arm5rolls,
        roll: roll,
        rollId: rollId,
        results: results,
        stress_names: stress_names,
        stress_bonuses: stress_bonuses,
        stress_dice: stress_dice,
        potential_botches: potential_botches,
        botch_queries: botch_queries,
        botch_query: botch_query
    });
}

k.registerFuncs({ arm5roll });