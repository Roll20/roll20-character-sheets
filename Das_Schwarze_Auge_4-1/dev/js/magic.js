/* magic start */

/*
	Adapt Spell Stats Based on Spell Representation
	Four representations offer the special feature of exchanging stats of spell checks.
	Returns object with boolean property "modified" and exchange info string "replacementInfo".

	Elvish Representation (Elf)
		IN can replace KL
		Check must not be IN/IN/IN after exchange
	Crystallomantic Representation (Ach)
		IN can replace KL and vice versa
		Check must contain at least two times KL or IN
	Kophtanic Representation (Kop)
		CH can replace KL
		Check must not be CH/CH/CH after exchange

	Myranor
	Neristic Representation (Ner)
		FF can replace MU or CH

	Arguments
		spellData: Object with "representation" (shorthand) and "stats" (array of spell stats)
		stats: Stats of the caster (object with two-letter stat properties and the corresponding values)
*/
function replaceSpellStats(spellData, stats) {
	const func = "replaceSpellStats";
	debugLog(func, spellData, stats);

	const replacementUIString = {
		"AchKL": `Kristallomantische Repräsentation hat KL (${stats['KL']}) einmal durch IN (${stats['IN']}) ersetzt.`,
		"AchIN": `Kristallomantische Repräsentation hat IN (${stats['IN']}) einmal durch KL (${stats['KL']}) ersetzt.`,
		"Elf": `Elfische Repräsentation hat KL (${stats['KL']}) einmal durch IN (${stats['IN']}) ersetzt.`,
		"Kop": `Kophtanische Repräsentation hat KL (${stats['KL']}) einmal durch CH (${stats['CH']}) ersetzt.`,
		"NerMU": `Neristische Repräsentation hat MU (${stats['MU']}) einmal durch FF (${stats['FF']}) ersetzt.`,
		"NerCH": `Neristische Repräsentation hat CH (${stats['CH']}) einmal durch FF (${stats['FF']}) ersetzt.`
	};

	let result = { "modified": false, "replacementInfo": "", "stats": [ ...spellData["stats"] ] };
	let replacement = { "replaceable": "", "replacer": "" };
	switch (spellData["representation"]) {
		case "Ach":
		// Block required to encapsulate consts
		{
			debugLog(func, "Attempting replacement for Crystallomantic representation (Ach)");
			// Replacement is not improving anything, so break
			if (stats['KL'] === stats['IN']) break;

			// Stat occurring at least twice
			var multiStat = "";
			// Stat occuring once or zero times, the stat that shall be checked for replacing one instance of the multiStat
			var otherStat = "";

			const relevantStats = [ "KL", "IN" ];
			const spellStatFreq = countStats(spellData["stats"]);

			// Determine whether spell has potentially beneficial stat situation
			for (let stat of relevantStats) {
				if (spellStatFreq[stat] >= 2)
				{
					multiStat = stat;
				} else {
					otherStat = stat;
				}
			}

			// No stat occurring at least twice? No replacement possible, so break
			if (multiStat === "") break;

			// KL = IN case can be excluded, see check above
			var betterStat = stats["KL"] > stats["IN"] ? "KL" : "IN";

			// Act only if the other stat is also better than the multi stat
			if (otherStat === betterStat)
			{
				for (let i in spellData["stats"])
				{
					if (spellData["stats"][i] === multiStat)
					{
						result["stats"][i] = otherStat;
						result["modified"] = true;
						result["replacementInfo"] = replacementUIString[spellData["representation"] + multiStat];
						break;
					}
				}
			}
			break;
		}
		case "Elf":
			debugLog(func, "Attempting replacement for Elvish representation (Elf)");
			replacement["replaceable"] = "KL";
			replacement["replacer"] = "IN";
		case "Kop":
		// Block required to encapsulate consts
		{
			// Prevent replacing replacement in "Elf" case
			if (replacement["replaceable"] === "" && replacement["replacer"] === "")
			{
				debugLog(func, "Attempting replacement for Kophtanic representation (Kop)");
				replacement["replaceable"] = "KL";
				replacement["replacer"] = "CH";
			}
			if (stats[replacement["replaceable"]] >= stats[replacement["replacer"]])
			{
				break;
			}
			const spellStatFreq = countStats(spellData["stats"]);

			// Nothing to replace
			if (spellStatFreq[replacement["replaceable"]] === 0)
			{
				break;
			}

			// Already two IN, third would not be allowed
			// If it were 3, the previous check would have fired already
			if (spellStatFreq[replacement["replacer"]] === 2)
			{
				break;
			}

			// Replacement
			for (let stat in spellData["stats"])
			{
				if (spellData["stats"][stat] === replacement["replaceable"])
				{
					result["stats"][stat] = replacement["replacer"];
					result["modified"] = true;
					result["replacementInfo"] = replacementUIString[spellData["representation"]];
					break;
				}
			}
			break;
		}
		case "Ner":
		// Block required to encapsulate consts
		{
			debugLog(func, "Attempting replacement for Neristic representation (Ner)");
			// Replacement is not improving anything, so break
			if (
				(stats['FF'] <= stats['MU']) &&
				(stats['FF'] <= stats['CH'])
			) break;

			replacement["replacer"] = "FF";
			replacement["replaceable"] = [ "MU", "CH" ];
			const spellStatFreq = countStats(spellData["stats"]);
			let replaceablesFreq = spellStatFreq[replacement["replaceable"][0]] + spellStatFreq[replacement["replaceable"][1]]

			// Nothing to replace
			if (replaceablesFreq === 0)
			{
				break;
			}

			// Replacement
			// Up to three stats might match, but only one can be replaced -> determine index to replace after iterating over all stats
			let lowestStat = { "value": Infinity, "index": null };
			for (let stat in spellData["stats"])
			{
				// Get values of replaceable stats at the index of the replaceable stat
				if (replacement["replaceable"].includes(spellData["stats"][stat]))
				{
					currentStat = spellData["stats"][stat];
					statValue = stats[currentStat];
					if (lowestStat["value"] > statValue)
					{
						lowestStat["value"] = statValue;
						lowestStat["index"] = stat;
					}
				}
			}
			let replacedStat = spellData["stats"][lowestStat["index"]];
			result["stats"][lowestStat["index"]] = replacement["replacer"];
			result["modified"] = true;
			result["replacementInfo"] = replacementUIString[spellData["representation"] + replacedStat];
			break;
		}
		default:
			debugLog(func, "No representation suitable for replacements found:", spellData["representation"]);
			break;
	}
	return result;
}

on(spells.map(spell => "clicked:" + spell + "-action").join(" "), (info) => {
	const func = "Action Listener for Spell Roll Buttons";
	var trigger = info["triggerName"].replace(/clicked:([^-]+)-action/, '$1');
	var nameInternal = spellsData[trigger]["internal"];
	var nameUI = spellsData[trigger]["ui"];
	//Copy array, or we get a reference and modify the database
	var stats = [...spellsData[trigger]["stats"]];
	var spellRep = "z_" + nameInternal + "_representation";
	debugLog(func, trigger, spellsData[trigger]);

	var attrsToGet = [
		"sf_representations",
		spellRep,
		"v_festematrix",
		"n_spruchhemmung",
		"MU",
		"KL",
		"IN",
		"CH",
		"FF"
	];
	// Special treatment for Attributo (user-selectable third stat)
	if (trigger === "z_attributo")
	{
		attrsToGet.push("Eigenschaft_Attributo");
	}
	safeGetAttrs(attrsToGet, function (v) {
		const relevantRepresentations = new Set([ "Ach", "Elf", "Kop", "Ner" ]);
		if (Object.hasOwn(v, "Eigenschaft_Attributo"))
		{
			// Resolve the stat
			let attributoVariableStat = v["Eigenschaft_Attributo"].replace(/^@\{([a-zA-Z]+)\}$/, "$1");
			stats[stats.indexOf("Eigenschaft_Attributo")] = attributoVariableStat;
			debugLog(func, "Attributo special case, stats after resolution:", stats);
		}
		let characterStats = { "MU": v["MU"], "KL": v["KL"], "IN": v["IN"], "CH": v["CH"], "FF": v["FF"] };
		let spellData = {};
		spellData["stats"] = stats;

		// Regex matches everything that is known to not be included in the (German) representations strings
		// firstRep = first result element
		const spellRepSplitRegEx = /[^a-zäöüßA-ZÄÖÜ\/']+/;
		let firstRep = v["sf_representations"].trim().split(spellRepSplitRegEx)[0];
		// Spell representation: use specific value given for each spell, fall back: first representation
		spellData["representation"] = String(v[spellRep]).trim().split(spellRepSplitRegEx)[0];
		if (
			( spellData["representation"] === "" ) ||
			( spellData["representation"] === 0 )
		)
		{
			if ( firstRep !== "" ) {
				spellData["representation"] = firstRep;
			}
		}

		let replacementResult = { "modified": false, "replacementInfo": "", "stats": [ ...stats ] };
		if ( relevantRepresentations.has(spellData["representation"]) )
		{
			replacementResult = replaceSpellStats(spellData, characterStats);
		}
		// Build Roll Macro
		var rollMacro = "";

		rollMacro +=
			"@{gm_roll_opt} " +
			"&{template:zauber} " +
			"{{name=" + nameUI + "}} " +
			"{{wert=[[@{ZfW_" + nameInternal + "}d1cs0cf2]]}} " +
			"{{mod=[[?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2]]}} " +
			"{{stats=[[ " +
				"[Eigenschaft 1:] [[@{" + replacementResult["stats"][0] + "}]]d1cs0cf2 + " +
				"[Eigenschaft 2:] [[@{" + replacementResult["stats"][1] + "}]]d1cs0cf2 + " +
				"[Eigenschaft 3:] [[@{" + replacementResult["stats"][2] + "}]]d1cs0cf2" +
				"]]}} " +
			"{{roll=[[3d20cs<@{cs_zauber}cf>@{cf_zauber}]]}} " +
			"{{result=[[0]]}} " +
			"{{criticality=[[0]]}} " +
			"{{critThresholds=[[[[@{cs_zauber}]]d1cs0cf2 + [[@{cf_zauber}]]d1cs0cf2]]}} " + 
			"{{repmod=" + (replacementResult["modified"] ? replacementResult["replacementInfo"] : "") + "}} ";
		debugLog(func, rollMacro);

		// Execute Roll
		startRoll(rollMacro).then((results) => {
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
			var success = results.critThresholds.rolls[0].dice;
			var failure = results.critThresholds.rolls[1].dice;
			/* Result
			-1	Failure (due to Firm Matrix)
			0	Failure
			1	Success
			2	Success (due to Firm Matrix)
			*/
			var result = 0;
			/* Criticality
			-4	Two or more dice same result (not 1, not 20); via Spell Stalling (Spruchhemmung)
			-3	Triple 20
			-2	Double 20
			0	no double 1/20
			+2	Double 1
			+3	Triple 1
			*/
			var criticality = 0;


			/*
				Doppel/Dreifach-1/20-Berechnung
				Vor der TaP*-Berechnung, da diese damit gegebenenfalls hinfällig wird
			*/
			/*
			Variable, um festhalten zu können, dass ein
				* normal misslungenes Ergebnis ohne Feste Matrix automatisch misslungen wäre und
				* normal gelungenes Ergebnis ohne Feste Matrix automatisch misslungen wäre
			*/
			var festeMatrixSave = false;
			{
				let successes = 0;
				let failures = 0;
				let festeMatrix = v["v_festematrix"] === "0" ? false : true;
				let spruchhemmung = v["n_spruchhemmung"] === "0" ? false : true;

				for (let roll of rolls)
				{
					if (roll <= success)
					{
						successes += 1;
					} else if (roll >= failure) {
						failures += 1;
					}
					if (successes >= 2)
					{
						criticality = successes;
					} else if (failures >= 2) {
						criticality = -failures;
					}
				}
				// feste Matrix
				if (festeMatrix && criticality === -2)
				{
					criticality = -1;
					festeMatrixSave = true;

					for (let roll of rolls)
					{
						if (
							(roll > success) &&
							(roll < failure) &&
							(
								roll === 18 || roll === 19
							)
						)
						{
							criticality -= 1;
							festeMatrixSave = false;
						}
					}
				}
				// Spruchhemmung, soll nur auslösen, wenn eh nicht Doppel/Dreifach-1/20
				if (
					spruchhemmung &&
					criticality > -2 &&
					criticality < 2 &&
					(
						(rolls[0] === rolls[1]) ||
						(rolls[1] === rolls[2]) ||
						(rolls[2] === rolls[0])
					)
				)
				{
					criticality = -4;
				}
			}

			/*
				TaP*-Berechnung
			*/
			var effRolls = rolls;
			var effTaW = TaW - mod;
			var TaPstar = effTaW;

			// Negativer TaW: |effTaW| zu Teilwürfen addieren
			if (criticality >= 2)
			{
				TaPstar = TaW;
				result = 1;
			} else {
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

				// Max. TaP* = TaW, mindestens aber 0
				TaPstar = Math.min(Math.max(TaW, 0), TaPstar);

				// Ergebnis an Doppel/Dreifach-20 anpassen
				if (Math.abs(criticality) <= 1)
				{
					result = TaPstar < 0 ? 0 : 1;
					if (festeMatrixSave && result === 0)
					{
						result = -1;
					} else if (festeMatrixSave && result === 1)
					{
						result = 2;
					}
				} else if (criticality <= -2) {
					result = 0;
				}
			}

			finishRoll(
				rollID,
				{
					roll: TaPstar,
					result: result,
					criticality: criticality,
					stats: stats.toString().replaceAll(",", "/")
				}
			);
		});
	});
});
/* magic end */
