/* magic_myranor start */

/*
	isNameAutomatic
	Helper function to determine whether the name of a Myranor conjuration spell appears to have been created automatically
	name: name to be checked
	source: full string of the source
	type: full string of the type
	representation: shorthand string
*/
function isNameAutomatic(name, source, type, representation) {
	const func = "isNameAutomatic";
	debugLog(func, "name", name, "source", source, "type", type, "representation", representation);
	if (
		name === "" ||
		(
			(
				name.replace(/^([^ ]+) \([A-Z?]\), [A-Za-z?]+$/, '$1') === source ||
				name.replace(/^([^ ]+) \([A-Z?]\), [A-Za-z?]+$/, '$1') === "Quelle?"
			) && (
				name.replace(/^[^ ]+ \(([A-Z?])\), [A-Za-z?]+$/, '$1') === type[0] ||
				name.replace(/^[^ ]+ \(([A-Z?])\), [A-Za-z?]+$/, '$1') === "?"
			) && (
				name.replace(/^[^ ]+ \([A-Z?]\), ([A-Za-z?]+)$/, '$1') === representation ||
				name.replace(/^[^ ]+ \([A-Z?]\), ([A-Za-z?]+)$/, '$1') === "???"
			)
		)
	)
	{
		return true;
	} else {
		return false;
	}
}

/*
	generateAutomaticName
	Helper function to generate a name for Myranor conjuration spells
*/
function generateAutomaticName(source, type, representation) {
	const func = "generateAutomaticName";
	var name = "";
	if (source.length === 0)
	{
		source = "Quelle?"
		debugLog(func, "source length is zero.");
	}
	if (type.length === 0)
	{
		type = "?";
		debugLog(func, "type length is zero.");
	}
	if (representation.length === 0)
	{
		representation = "???";
		debugLog(func, "representation length is zero.");
	}
	name = `${source} (${type[0]}), ${representation}`;
	return name;
}

on("change:repeating_conjuration-spells-myranor", function(info) {
	var func = "Action Listener for Updating Conjuration Spells Myranor Repeating Section";
	const repeatingAttrs = [
		"name",
		"source",
		"type",
		"spell_action",
		"stat0",
		"stat1",
		"stat2",
		"stats",
		"representation_full",
		"representation_short",
		"value"
	]

	// Expand info to protect downstream from hassle
	if (!Object.hasOwn(info, "newValue") && Object.hasOwn(info, "previousValue"))
	{
		info["newValue"] = "";
	}
	if (Object.hasOwn(info, "newValue") && !Object.hasOwn(info, "previousValue"))
	{
		info["previousValue"] = "";
	}

	// Trigger Information: Row ID, attribute
	/// Make sure that the input string meets the expectation
	const srcAttrRegEx = /^repeating_conjuration-spells-myranor_(?<rowID>[^_]+)_(?<attr>.*)$/;
	var matches = info["sourceAttribute"].match(srcAttrRegEx);
	if (matches && matches.length === 3)
	{
		const trigger = {
			"rowID": matches.groups["rowID"],
			"attr": matches.groups["attr"]
		};
		debugLog(func, "info", info, "trigger", trigger);

		// Build list of attributes
		var attrsToGet = [
			"character_name",
			"sf_representations_myranor"
		];

		var prefix = "repeating_conjuration-spells-myranor_" + trigger["rowID"] + "_";
		for (let attr of repeatingAttrs)
		{
			attrsToGet.push(prefix + attr);
		}

		safeGetAttrs(attrsToGet, function(v) {

			var attrsToChange = {};

			// Always update spell_action
			attrsToChange[prefix + "spell_action"] = `%{${v["character_name"]}|${prefix}spell-action}`;

			// Fill representation
			/// Get first representation from special skills list disregarding leading/trailing whitespace
			const spellRepSplitRegEx = /[^a-zäöüßA-ZÄÖÜ\/']+/;
			let firstRepShort = v["sf_representations_myranor"].trim().split(spellRepSplitRegEx)[0];
			/// Assume that several representations are separated by [.,;]
			let firstRepFull = v["sf_representations_myranor"].trim().split(/[.,;]/)[0];

			/// Spell representation: use specific value given for each spell, fall back: first representation
			let spellRep = String(v[prefix + "representation_full"]).trim().split(spellRepSplitRegEx)[0];
			if (
				( spellRep === "" ) ||
				( spellRep === 0 )
			)
			{
				if ( firstRepShort !== "" ) {
					spellRep = firstRepShort;
					v[prefix + "representation_short"] = spellRep;
					attrsToChange[prefix + "representation_short"] = spellRep;
					attrsToChange[prefix + "representation_full"] = firstRepFull;
				}
			}

			switch(trigger["attr"]){
				case "source":
					// Adapt name according to the source
					/// Act only on empty or supposedly previously automatically edited fields
					if (isNameAutomatic(v[prefix + "name"], info["previousValue"], v[prefix + "type"], v[prefix + "representation_short"]))
					{
						let name = generateAutomaticName(info["newValue"], v[prefix + "type"], v[prefix + "representation_short"]);
						attrsToChange[prefix + "name"] = name;
					}

					// Adapt stats according to sphere of the source
					/// Act only if stats still default (new row) or previous sphere default
					const defaultStats = [ "MU", "KL", "CH" ];
					const currentStats = extractStats(
								[ v[prefix + "stat0"], v[prefix + "stat1"], v[prefix + "stat2"] ]
							);

					/// Get previous sphere
					var previousSphereStats = [];
					if (info["previousValue"])
					{
						if (Object.hasOwn(sourcesSpheresData, info["previousValue"]))
						{
							let previousSphere = sourcesSpheresData[info["previousValue"]]["internal"];
							previousSphereStats = spheresStatsData[previousSphere];
						}
					}

					/// Find sphere corresponding to source
					var doNothing = false;
					if (Object.hasOwn(sourcesSpheresData, v[prefix + "source"]))
					{
						var sphere = sourcesSpheresData[v[prefix + "source"]]["internal"];
						var sphereUI = sourcesSpheresData[v[prefix + "source"]]["ui"];
						attrsToChange[prefix + "sphere"] = sphereUI;
					} else {
						attrsToChange[prefix + "sphere"] = "Sphäre unbekannt";
						doNothing = true;
					}

					/// Get default stats to the sphere
					stats = spheresStatsData[sphere];

					/// Adapt stats only if they are still at their default values
					if (
						arraysEqual(defaultStats, currentStats) === false &&
						arraysEqual(previousSphereStats, currentStats) === false
					)
					{
						doNothing = true;
					}

					if (doNothing === false)
					{
						for (let statIndex in stats)
						{
							attrsToChange[prefix + "stat" + statIndex] = stats[statIndex];
						}
						attrsToChange[prefix + "stats"] = stats.join("/");
					}
					break;
				case "type":
					// Adapt name according to the source
					/// Act only on empty or supposedly previously automatically edited fields
					if (isNameAutomatic(v[prefix + "name"], v[prefix + "source"], info["previousValue"], v[prefix + "representation_short"]))
					{
						let name = generateAutomaticName(v[prefix + "source"], info["newValue"], v[prefix + "representation_short"]);
						attrsToChange[prefix + "name"] = name;
					}
					break;
				case "representation_full":
					// Adapt name according to the source
					/// Act only on empty or supposedly previously automatically edited fields
					previousRep = String(info["previousValue"]).trim().split(spellRepSplitRegEx)[0];
					newRep = String(info["newValue"]).trim().split(spellRepSplitRegEx)[0];
					/// Always update short version
					attrsToChange[prefix + "representation_short"] = newRep;
					if (isNameAutomatic(v[prefix + "name"], v[prefix + "source"], v[prefix + "type"], previousRep))
					{
						let name = generateAutomaticName(v[prefix + "source"], v[prefix + "type"], newRep);
						attrsToChange[prefix + "name"] = name;
					}
					break;
				case "stat0":
				case "stat1":
				case "stat2":
					// Adapt name (stat changes can induce using the first representation)
					/// Act only on empty or supposedly previously automatically edited fields
					if (isNameAutomatic(v[prefix + "name"], v[prefix + "source"], v[prefix + "type"], v[prefix + "representation_short"]))
					{
						let name = generateAutomaticName(v[prefix + "source"], v[prefix + "type"], v[prefix + "representation_short"]);
						attrsToChange[prefix + "name"] = name;
					}
					// Update summarized stats
					var stats = extractStats(
						[ v[prefix + "stat0"], v[prefix + "stat1"], v[prefix + "stat2"] ]
					);
					attrsToChange[prefix + "stats"] = stats.join("/");
					break;
				default:
			}

			debugLog(func, attrsToChange, "v", v);
			safeSetAttrs(attrsToChange);
		});
	}
});

on("clicked:repeating_conjuration-spells-myranor:spell-action", (info) => {
	const func = "Action Listener for Myranor Conjuration Spell Roll Buttons";

	const triggerRow = info["sourceAttribute"].match(/^repeating_conjuration-spells-myranor_(?<rowID>-[^_]+)/).groups["rowID"];
	const attrPrefix = "repeating_conjuration-spells-myranor";
	const rowAttrs = [
		"name", "sphere", "source", "representation_full", "representation_short", "value",
		"type", "stats", "stat0", "stat1", "stat2",
	];
	debugLog(func, triggerRow);

	var attrsToGet = [
		"sf_representations_myranor",
		"MU", "IN", "KL", "CH", "FF", "GE", "KO", "KK",
		"v_festematrix",
		"n_spruchhemmung"
	];
	for (let attr of rowAttrs)
	{
		attrsToGet.push(
			[
				attrPrefix,
				triggerRow,
				attr
			].join("_")
		);
	}

	safeGetAttrs(attrsToGet, function (v) {
		// Shortening of result properties
		const repeatingRegex = new RegExp(`${attrPrefix}_${triggerRow}_`);
		var shortResults = {};
		for (let attr of attrsToGet)
		{
			// attrs from outside the repeating section are already short
			if (!attr.match(repeatingRegex))
			{
				shortResults[attr] = v[attr];
				continue;
			}
			shortAttr = attr.replace(repeatingRegex, '');
			shortResults[shortAttr] = v[attr];
		}

		// Replacements
		const relevantRepresentations = new Set([ "Ach", "Elf", "Kop", "Ner" ]);
		let characterStats = { "MU": v["MU"], "KL": v["KL"], "IN": v["IN"], "CH": v["CH"], "FF": v["FF"] };
		let spellData = {};
		spellData["stats"] = [ shortResults["stat0"], shortResults["stat1"], shortResults["stat2"] ];

		// Regex matches everything that is known to not be included in the (German) representations strings
		// firstRep = first result element
		const spellRepSplitRegEx = /[^a-zäöüßA-ZÄÖÜ\/']+/;
		let firstRep = v["sf_representations_myranor"].trim().split(spellRepSplitRegEx)[0];
		// Spell representation: use specific value given for each spell, fall back: first representation
		spellData["representation"] = shortResults["representation_short"];
		if (
			( spellData["representation"] === "" ) ||
			( spellData["representation"] === 0 )
		)
		{
			if ( firstRep !== "" ) {
				spellData["representation"] = firstRep;
			}
		}

		let replacementResult = { "modified": false, "replacementInfo": "", "stats": [ ...spellData["stats"] ] };
		if ( relevantRepresentations.has(spellData["representation"]) )
		{
			replacementResult = replaceSpellStats(spellData, characterStats);
		}

		// Build Roll Macro
		var rollMacro = "";
		rollMacro = [
			"@{gm_roll_opt}",
			"&{template:zauber}",
			`{{name=${shortResults["name"]}}}`,
			`{{wert=[[${shortResults["value"]}d1]]}}`,
			"{{mod=[[?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2]]}}",
			"{{stats=[[",
				`[Eigenschaft 1:] [[@{${replacementResult["stats"][0]}}]]d1cs0cf2 +`,
				`[Eigenschaft 2:] [[@{${replacementResult["stats"][1]}}]]d1cs0cf2 +`,
				`[Eigenschaft 3:] [[@{${replacementResult["stats"][2]}}]]d1cs0cf2`,
			"]]}}",
			"{{roll=[[3d20cs<@{cs_zauber}cf>@{cf_zauber}]]}}",
			"{{result=[[0]]}}",
			"{{criticality=[[0]]}}",
			"{{critThresholds=[[[[@{cs_zauber}]]d1cs0cf2 + [[@{cf_zauber}]]d1cs0cf2]]}}",
			"{{repmod=" + (replacementResult["modified"] ? replacementResult["replacementInfo"] : "") + "}}"
		].join(" ");
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
/* magic_myranor end */
