/* liturgies start */
on('clicked:eidsegen-action', async (info) => {
	results = await startRoll(
		"@{gm_roll_opt} " +
		"&{template:liturgie} " +
		"{{name=Eidsegen}} " +
		"{{wert=[[@{Liturgiekenntnis}d1cs0cf2]]}} " +
		"{{mod=[[ ?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2 ]]}} " +
		"{{stats=[[ [Eigenschaft 1:] [[@{MU}]]d1cs0cf2 + [Eigenschaft 2:] [[@{IN}]]d1cs0cf2 + [Eigenschaft 3:] [[@{CH}]]d1cs0cf2]]}} " +
		"{{roll=[[3d20cs<0cf>21]]}} " +
		"{{result=[[0]]}} "
	);
	console.log("test: info:", info, "results:", results);
	var rollID = results.rollId;
	results = results.results;
	var TaW = results.wert.result;
	var mod = results.mod.result;
	var stats = [
		results.stats.rolls[0].dice,
		results.stats.rolls[1].dice,
		results.stats.rolls[2].dice
	];
	var rolls = results.roll.rolls[0].results;
	/* Result
	0	Failure
	1	Success
	*/
	var result = 0;

	/*
		TaP*-Berechnung
	*/
	var effRolls = rolls;
	var effTaW = TaW - mod;
	var TaPstar = effTaW;

	// Negativer TaW: |effTaW| zu Teilwürfen addieren
	if (effTaW < 0)
	{
		for (let roll in rolls)
		{
			effRolls[roll] = rolls[roll] + Math.abs(effTaW);
		}
		TaPstar = 0;
	}

	// TaP-Verbrauch für jeden Wurf
	for (let roll in effRolls)
	{
		TaPstar -= Math.max(0, effRolls[roll] - stats[roll]);
	}

	// Max. TaP* = TaW
	TaPstar = Math.min(TaW, TaPstar);

	// Ergebnis hängt nur von TaP* ab
	result = TaPstar < 0 ? 0 : 1;

	finishRoll(
		rollID,
		{
			roll: TaPstar,
			result: result,
			stats: stats.toString().replaceAll(",", "/")
		}
	);
});
/* liturgies end */
