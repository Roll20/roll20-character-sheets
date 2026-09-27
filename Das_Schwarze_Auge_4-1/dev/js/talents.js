/* talents start */
/*
	generateTalentRollMacro
	Generate a string containing a roll macro for talent checks.

	Parameters:
	* template: string, the roll template to use.
	* nameInternal: string, the internal name of the talent.
	* nameUI: string, the UI name of the talent.
	* statAttrs: An array of at least three attributes (called "Eigenschaftn + nameInternal", e. g. "Eigenschaft1akrobatik") carrying strings with stats attributes ("@{MU}" etc.).
	* optional: object, pre-filled with default values to be overwritten when called for special cases. Special cases handled: macro to use for the calculation of the effective encumbrance ("eBE").
*/
function generateTalentRollMacro(template, nameInternal, nameUI, statAttrs, optional = { "ebeMacro": "" } ) {
	const caller = "generateTalentRollMacro";
	const prefix = "@{gm_roll_opt}";
	const suffix = "";
	const nameInternalNew = talentsDataOldToNew[nameInternal];

	// Boilerplate
	const args = {
		template,
		nameInternal,
		nameUI,
		statAttrs,
		optional,
	};
	const emptyRollMacro = "";

	// Input sanitation
	const inputTypes = {
		"template": "string",
		"nameInternal": "string",
		"nameUI": "string",
		"statAttrs": "object",
		"optional": "object",
	};

	/// Data types
	for (arg in args)
	{
		if (typeof(args[arg]) !== inputTypes[arg])
		{
			debugLog(caller, `Error: ${arg} is not of type '${inputTypes[arg]}'. Exiting ...`);
			return emptyMacro;
		}
	}

	/// Additional checks
	//// nameInternalNew
	if (talents.includes(nameInternalNew) === false)
	{
		debugLog(caller, "Error: nameInternalNew not found in talents. Exiting ...");
		return emptyRollMacro;
	}

	//// statAttrs
	if (!Array.isArray(args["statAttrs"]))
	{
		debugLog(caller, "Error: statAttrs not an array. Exiting ...");
		return emptyRollMacro;
	}

	///// Only check for data type string
	const statAttrsLengthMin = 3;
	const statAttrType = "string";

	if (args["statAttrs"].length < statAttrsLengthMin)
	{
		debugLog(caller, `Error: statAttrs does not contain at least ${statAttrsLengthMin} items. Exiting ...`);
		return emptyRollMacro;
	}

	for (statAttr of args["statAttrs"])
	{
		if (typeof(statAttr) !== statAttrType)
		{
			debugLog(caller, "Error: At least one item of statAttrs is not of type 'string'. Exiting ...");
			return emptyRollMacro;
		}
	}

	//// optional
	///// Check for expected/minimal properties
	const optionalMinimumProperties = [ "ebeMacro" ];
	const optionalPropertiesDefaults = {
		"ebeMacro": "",
	};

	for (let property of optionalMinimumProperties)
	{
		if (!Object.hasOwn(args["optional"], property))
		{
			debugLog(caller, `Info: Filling argument 'optional' with default value for property ${property} ...`);
			args["optional"][property] = optionalPropertiesDefaults[property];
		}
	}

	// Generation of the roll macro
	/// Boilerplate
	//// Name property
	const nameProperty = new RollProperty(
		"name",
		nameUI
	);

	//// Talent value property
	const talentValueProperty = new RollProperty(
		"wert",
		`[[@{TaW_${nameInternal}}d1cs0cf2]]`
	);

	//// stats roll
	const statsRoll = new RollProperty(
		"stats",
		[
			"[[",
				[
					`[Eigenschaft 1:] [[@{${statAttrs[0]}}]]d1cs0cf2`,
					`[Eigenschaft 2:] [[@{${statAttrs[1]}}]]d1cs0cf2`,
					`[Eigenschaft 3:] [[@{${statAttrs[2]}}]]d1cs0cf2`,
				].join(" + "),
			"]]"
		].join(" ")
	);

	//// 3d20 roll
	const diceRoll = new RollProperty(
		"roll",
		"[[3d20cs<@{cs_talent}cf>@{cf_talent}]]"
	);

	//// Result roll (for CRP), is just enough of a roll to be usable with CRP
	const resultRoll = new RollProperty(
		"result",
		"[[0]]"
	);

	//// Criticality roll (for CRP), is just enough of a roll to be usable with CRP
	const criticalityRoll = new RollProperty(
		"criticality",
		"[[0]]"
	);

	//// Critical success/fail roll (for CRP), makes cs_talent and cf_talent available to CRP
	const critThresholdsRoll = new RollProperty(
		"critThresholds",
		"[[[[@{cs_talent}]]d1cs0cf2 + [[@{cf_talent}]]d1cs0cf2]]"
	);

	/// Rolls specific to certain talents
	let talentSpecificRolls = [];

	//// Rolls related to Movement (GS)
	if (nameInternal === "athletik")
	{
		talentSpecificRolls
		.push(
			new RollProperty("athletics", "1"),
			new RollProperty("athleticsbonus", "[[@{t_ko_athletik_gsbonus}]]"),
		);
	}

	/// Modifier rolls depending on effective encumbrance (eBE)
	const modRolls = [];

	if (args["optional"]["ebeMacro"] === "")
	{
		modRolls
		.push(
			new RollProperty("mod", "[[?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2]]"),
		);
	} else {
		modRolls
		.push(
			new RollProperty("ebe", `[[{0d1 + (${args["optional"]["ebeMacro"]}), 0d1}kh1]]`),
			new RollProperty("mod", `[[ 0d1 + (?{Erleichterung (−) oder Erschwernis (+)|0}d1cs0cf2) + [[{0d1 + (${args["optional"]["ebeMacro"]}), 0d1}kh1]]d1cs0cf2 ]]`),
		);
	}

	// Build Roll Macro
	const body = new RollPropertyArray(
		nameProperty,
		talentValueProperty,
		...talentSpecificRolls,
		...modRolls,
		statsRoll,
		diceRoll,
		resultRoll,
		criticalityRoll,
		critThresholdsRoll,
	);

	const rollMacro = new RollMacro(
		prefix,
		args["template"],
		body,
		suffix
	);

	debugLog(caller, "rollMacro", rollMacro.toString());
	return rollMacro.toString();
}

/*
	getTalentRollResults
	Generate an object with the calculated/processed results from a 3d20 talent roll.

	Parameters:
	* results: object, 'inner'/'real' results object from a startRoll() call.

	Return value:
	* object with the general result (success/failure), the points after the check ('TaP*' in DSA speak; the general quality of the result), the criticality (triple/double 1/20 or "normal" success/failure), stats (array of the stat values used to calculate the result; for display in the results)

*/
function getTalentRollResults(results) {
	const caller = "getTalentRollResults";

	// Boilerplate
	/// Values of the three stats
	const stats = [
		results.stats.rolls[0].dice,
		results.stats.rolls[1].dice,
		results.stats.rolls[2].dice
	];

	/// Value of the talent
	const TaW = results.wert.result;

	/// Modifier of the check (sum of all modifiers)
	const mod = results.mod.result;

	/// Results of the 3d20 roll
	const rolls = results.roll.rolls[0].results;

	/// Thresholds for automatic success/failure
	const successThreshold = results.critThresholds.rolls[0].dice;
	const failureThreshold = results.critThresholds.rolls[1].dice;

	/// Result
	//// 0 Failure
	//// 1 Success
	let result = 0;

	/// Criticality
	//// -3 Triple 20
	//// -2 Double 20
	////  0 no double 1/20
	//// +2 Double 1
	//// +3 Triple 1
	let criticality = 0;

	// Processing
	/// Calculation of Double/Triple 1/20
	//// This calculation is placed before the TaP* calculation, because the TaP* are not required in the special cases handled here.
	{
		let criticalSuccesses = 0;
		let criticalFailures = 0;

		// Count all critical successes and failures and set the criticality accordingly.
		for (let roll of rolls)
		{
			if (roll <= successThreshold)
			{
				criticalSuccesses += 1;
			} else if (roll >= failureThreshold) {
				criticalFailures += 1;
			}
			if (criticalSuccesses >= 2)
			{
				criticality = criticalSuccesses;
			} else if (criticalFailures >= 2) {
				criticality = -criticalFailures;
			}
		}
		// Clamp criticality to the range of [-3, 3]
		const criticalityMin = -3;
		const criticalityMax = 3;

		criticality = Math.min(criticality, criticalityMax);
		criticality = Math.max(criticality, criticalityMin);
	}

	/// Calculation of TaP*
	//// Effective rolls: For negative effective TaW rolls are increased by the absolute value of the effective TaW (it is way harder to do something that is beyond your abilities). This variable holds these modified rolls. This does not trigger critical failures.
	const effRolls = rolls;

	//// Effective TaW: Negative modifiers make checks easier (effective TaW increases), positive modifiers make checks harder (effective TaW decreases). This is one of the rare parts in the code where a modifier value gets subtracted.
	const effTaW = TaW - mod;

	//// The result cannot exceed the effective TaW.
	let TaPstar = effTaW;

	//// Calculate TaPstar and result
	let criticalFail = false;

	switch(criticality)
	{
		case 3:
		case 2:
			TaPstar = TaW;
			result = 1;
			break;
		case -2:
		case -3:
			criticalFail = true;
			result = 0;
			// Intentionally no break.
		case 1:
		case 0:
		case -1:
			// Handle effects of negative effective TaWs
			if (effTaW < 0)
			{
				for (let roll in rolls)
				{
					effRolls[roll] = rolls[roll] + Math.abs(effTaW);
				}
				const TaPstarSuccessMin = 0;
				TaPstar = TaPstarSuccessMin;
			}

			// TaP consumption for all rolls
			const TaPConsumptionMin = 0;
			for (let roll in effRolls)
			{
				const TaPConsumption = Math.max(0, effRolls[roll] - stats[roll]);
				TaPstar -= TaPConsumption;
			}

			// Safeguard: Limit TaPstar to TaW (you cannot be better than you actually are)
			TaPstar = Math.min(Math.max(0, TaW), TaPstar);

			// Do not touch result in case of critical failures
			if (criticalFail === false)
			{
				result = TaPstar < 0 ? 0 : 1;
			}
			break;
	}

	return {
		"result" : result,
		"TaPstar": TaPstar,
		"criticality": criticality,
		"stats": stats,
	};
}

/*
	Action Listener for Physical Talents Lame Settings
*/
const attrsTalentsPhysicalLame = talents.filter(talent => talent.startsWith("t_ko_"));
Object.freeze(attrsTalentsPhysicalLame);

on(attrsTalentsPhysicalLame.map(talent => `change:${talent}_mod_lame_setting`).join(" ").toLowerCase(),
	function (info) {

	// Boilerplate
	const caller = "Action Listener for Physical Talents Lame Settings";
	const sourceAttr = info["sourceAttribute"];
	const newValue = info["newValue"];
	const talent = info["triggerName"].replace(/^(t_ko_[^-]+)_mod_lame_setting$/, '$1');
	const modAttr = `${talent}_mod_lame`;

	/// Conversion from easier-to-comprehend settings to the actual roll macro content
	const settingsDictionary = {
		"always": "3",
		"ask": "(?{Nachteil &bdquo;Lahm&ldquo;: Benötigt diese Probe Beinarbeit?|Ja,3|Nein,0})",
		"never": "0",
	};
	const attrsToChange = {};

	// Conversion
	let lameMod = "0";
	if (Object.hasOwn(settingsDictionary, newValue))
	{
		lameMod = settingsDictionary[newValue];
	} else {
		debugLog(caller, "Unexpected new lame setting. Using default value for lame mod.");
		lameMod = getDefaultValue(modAttr);
	}
	attrsToChange[modAttr] = lameMod;

	// Setting attrs
	debugLog(caller, "attrsToChange", attrsToChange);
	safeSetAttrs(attrsToChange);
});

/*
	Action Listener for Gifts
*/
const attrsGifts = [
	[ 'repeating_Gaben', 'Name_Gabe' ],
	[ 'repeating_Gaben', 'Name_Gabe_Zusatz' ],
];
Object.freeze(attrsGifts);

on(attrsGifts.map(talent => `change:${talent.join(":")}`).join(" ").toLowerCase(),
	function(eventInfo) {

	// Boilerplate
	const caller = "Action Listener for Gifts";
	const rowID = extractRowId(eventInfo["sourceAttribute"]);
	const attrsGiftsRow = attrsGifts.map(talent => [ talent[0], rowID, talent[1] ].join("_"));
	const attrPrefix = `repeating_Gaben_${rowID}`;
	let attrsToChange = {};

	safeGetAttrs(attrsGiftsRow,
		function(attrs) {

		// Boilerplate
		const gift = attrs[`${attrPrefix}_Name_Gabe`];
		const giftNote = attrs[`${attrPrefix}_Name_Gabe_Zusatz`];
		const giftNameUIDefault = "Eigene Gabe";

		// Pre-defined or custom ("nothing") gift
		if (gift !== "nothing")
		{
			// Assign stats of pre-defined gifts
			for (let index of [0, 1, 2])
			{
				attrsToChange[`${attrPrefix}_eigenschaft${index + 1}`] = giftsData[gift]["stats"][index].toLowerCase();
			}
			// Assign UI name for roll templates of pre-defined gifts
			attrsToChange[`${attrPrefix}_Name_Gabe_Anzeige`] = giftsData[gift]["ui"];

			// Handle additions to the name
			if (giftNote !== "")
			{
				attrsToChange[`${attrPrefix}_Name_Gabe_Anzeige`] += ` (${giftNote})`;
			}
		} else {
			if (giftNote !== "")
			{
				attrsToChange[`${attrPrefix}_Name_Gabe_Anzeige`] = giftNote;
			} else {
				attrsToChange[`${attrPrefix}_Name_Gabe_Anzeige`] = giftNameUIDefault;
			}
		}

		// Setting attrs
		debugLog(caller, "eventInfo", eventInfo, "attrs", attrs, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

/*
	Action Listener for Gifts Stats

Update hidden stats values on changes to the actual stats.
*/
const attrsGiftsStats = [
	[ 'repeating_Gaben', 'eigenschaft1' ],
	[ 'repeating_Gaben', 'eigenschaft2' ],
	[ 'repeating_Gaben', 'eigenschaft3' ],
];
Object.freeze(attrsGiftsStats);

on(attrsGiftsStats.map(talent => `change:${talent.join(":")}`).join(" ").toLowerCase(),
	function(eventInfo) {

	// Boilerplate
	const caller = "Action Listener for Gifts Stats";
	const rowID = extractRowId(eventInfo["sourceAttribute"]);
	const attrsGiftsStatsRow = attrsGiftsStats.map(talent => [ talent[0], rowID, talent[1] ].join("_"));
	const attrPrefix = `repeating_Gaben_${rowID}`;
	const attrsToGet = [ ...attrsGiftsStatsRow, ...statAttrs ];
	let attrsToChange = {};

	safeGetAttrs(attrsToGet,
		function(attrs) {

		// Assign stats
		for (let index of [0, 1, 2])
		{
			let statAttr = attrs[`${attrPrefix}_eigenschaft${index + 1}`].toUpperCase();
			attrsToChange[`${attrPrefix}_hiddeneigenschaft${index + 1}`] = attrs[statAttr];
		}

		// Setting attrs
		debugLog(caller, "eventInfo", eventInfo, "attrs", attrs, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

/*
	Action Listener for Metatalents (2019-04)

The original metatalents repeating section has been moved to legacy data for users to manually check the correct migration.
*/
const attrsMetatalents = [
	[ 'repeating_Metatalente201904', 'Name_Metatalent' ],
	[ 'repeating_Metatalente201904', 'Name_Metatalent_Eigen' ],
];
Object.freeze(attrsMetatalents);

on(attrsMetatalents.map(talent => `change:${talent.join(":")}`).join(" ").toLowerCase(),
	function(eventInfo) {

	// Boilerplate
	const caller = "Action Listener for Metatalents (2019-04)";
	const rowID = extractRowId(eventInfo["sourceAttribute"]);
	const attrsMetatalentsRow = attrsMetatalents.map(talent => [ talent[0], rowID, talent[1] ].join("_"));
	const attrPrefix = `repeating_Metatalente201904_${rowID}`;
	let attrsToChange = {};

	safeGetAttrs(attrsMetatalentsRow,
		function(attrs) {

		// Boilerplate
		const metatalent = attrs[`${attrPrefix}_Name_Metatalent`];
		const metatalentCustom = attrs[`${attrPrefix}_Name_Metatalent_Eigen`];
		const metatalentNameUIDefault = "Eigenes Metatalent";

		// Pre-defined or custom ("nothing") metatalent
		if (metatalent !== "nothing")
		{
			// Assign stats of pre-defined metatalents
			for (let index of [0, 1, 2])
			{
				attrsToChange[`${attrPrefix}_eigenschaft${index + 1}`] = metatalentsData[metatalent]["stats"][index].toLowerCase();
			}
			// Assign UI name for roll templates of pre-defined metatalents
			attrsToChange[`${attrPrefix}_Name_Metatalent_Anzeige`] = metatalentsData[metatalent]["ui"];
		} else {
			if (metatalentCustom !== "")
			{
				attrsToChange[`${attrPrefix}_Name_Metatalent_Anzeige`] = metatalentCustom;
			} else {
				attrsToChange[`${attrPrefix}_Name_Metatalent_Anzeige`] = metatalentNameUIDefault;
			}
		}

		// Setting attrs
		debugLog(caller, "eventInfo", eventInfo, "attrs", attrs, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

/*
	Action Listener for Metatalents (2019-04) Stats

Update hidden stats values on changes to the actual stats.
*/
const attrsMetatalentsStats = [
	[ 'repeating_Metatalente201904', 'eigenschaft1' ],
	[ 'repeating_Metatalente201904', 'eigenschaft2' ],
	[ 'repeating_Metatalente201904', 'eigenschaft3' ],
];
Object.freeze(attrsMetatalentsStats);

on(attrsMetatalentsStats.map(talent => `change:${talent.join(":")}`).join(" ").toLowerCase(),
	function(eventInfo) {

	// Boilerplate
	const caller = "Action Listener for Metatalents (2019-04) Stats";
	const rowID = extractRowId(eventInfo["sourceAttribute"]);
	const attrsMetatalentsStatsRow = attrsMetatalentsStats.map(talent => [ talent[0], rowID, talent[1] ].join("_"));
	const attrPrefix = `repeating_Metatalente201904_${rowID}`;
	const attrsToGet = [ ...attrsMetatalentsStatsRow, ...statAttrs ];
	let attrsToChange = {};

	safeGetAttrs(attrsToGet,
		function(attrs) {

		// Assign stats
		for (let index of [0, 1, 2])
		{
			let statAttr = attrs[`${attrPrefix}_eigenschaft${index + 1}`].toUpperCase();
			attrsToChange[`${attrPrefix}_hiddeneigenschaft${index + 1}`] = attrs[statAttr];
		}

		// Setting attrs
		debugLog(caller, "eventInfo", eventInfo, "attrs", attrs, "attrsToChange", attrsToChange);
		safeSetAttrs(attrsToChange);
	});
});

/*
	Action Listener for Updating Gifts/Metatalents Hidden Stats

Gifts/metatalents use hidden stats in their rolls. These need updating when the actual stat changes.
*/
on(statAttrs.map(talent => `change:${talent}`).join(" ").toLowerCase(),
	function(eventInfo) {

	// Boilerplate
	const caller = "Action Listener for Updating Gifts/Metatalents Hidden Stats";

	safeGetAttrs(statAttrs,
		function(attrsOuter) {

		// Boilerplate
		const sections = [
			"gaben",
			"metatalente201904",
		];
		const prefixes = {
			"gaben": "repeating_Gaben_",
			"metatalente201904": "repeating_Metatalente201904_",
		}
		const statAttrSuffix = "_eigenschaft";
		const hiddenStatAttrSuffix = "_hiddeneigenschaft";

		// Update Sections
		for (let section of sections)
		{
			getSectionIDs(
				section,
				function(IDs) {

				const attrsToChange = {};

				// Gather all stat attrs of the section
				/// Note: flatMap() turned out be roughly 2 x the speed of a for loop pushing new elements to the array (e. g. attrs not even nicely ordered); el cheapo tested on Firefox 156.0.1
				const attrsSection = IDs
					.map(ID => `${prefixes[section]}${ID}${statAttrSuffix}`)
					.flatMap(attr => [`${attr}1`, `${attr}2`, `${attr}3`])
				;

				// Use the stat attrs of the section
				safeGetAttrs(attrsSection,
					function(attrsInner) {
					for (let attr in attrsInner)
					{
						const ID = extractRowId(attr);
						// Get the number of the stat (i. e., the last character of the string)
						const statNumber = attr.at(-1);

						// Attribute holding the (hidden) stat name (not its value)
						const rowStatAttr = `${prefixes[section]}${ID}${statAttrSuffix}${statNumber}`;
						const rowHiddenStatAttr = `${prefixes[section]}${ID}${hiddenStatAttrSuffix}${statNumber}`;

						// Get the stat name and convert to uppercase for further consumption
						const rowStatName = attrsInner[rowStatAttr].toUpperCase();

						// Get the value of the stat
						const rowStatValue = attrsOuter[rowStatName];

						// Set the hidden stat to the value of the stat
						attrsToChange[rowHiddenStatAttr] = rowStatValue;
					}

					// Setting attrs
					debugLog(caller, `section: ${section}`, "attrsToChange", attrsToChange);
					safeSetAttrs(attrsToChange);
				});
			});
		}
	});
});

/*
	Action Listener for Talent Roll Button Clicks (with and without Encumbrance)
*/
on(
	[
		...talents.map(talent => `clicked:${talent}-action`),
		...talents_ebe.map(talent => `clicked:${talent}-ebe-action`),
	].join(" "),
	async (info) => {

	// Boilerplate
	const caller = "Action Listener for Talent Roll Buttons (Without and With Encumbrance)";
	const ebeRelevant = info["triggerName"].endsWith("-ebe-action");
	const trigger = info["triggerName"].replace(/^clicked:([^-]+)-(?:ebe-)?action/, '$1');
	const nameInternal = talentsData[trigger]["internal"];
	const nameUI = talentsData[trigger]["ui"];
	const rollOptions = {};
	let rollTemplate = "talent";
	let ebeMacro = "@{BE}";
	debugLog(caller, `trigger: ${trigger}`);

	// Set attributes for stats
	const attrsStatsDefault = [
		`Eigenschaft1${nameInternal}`,
		`Eigenschaft2${nameInternal}`,
		`Eigenschaft3${nameInternal}`,
	];
	let attrsStats = [];

	/// Special Case: No stats attributes for languages and scripts
	if (
		trigger.startsWith("t_sp_") ||
		trigger.startsWith("t_sc_")
	)
	{
		const talentGroupRegex = /^t_(?<group>[^_]+)_/;
		const talentGroup = trigger.match(talentGroupRegex).groups["group"];
		const talentGroupStats = {
			"sp": ["KL", "IN", "CH"],
			"sc": ["KL", "KL", "FF"],
		};
		attrsStats = talentGroupStats["talentGroup"];
	} else {
		attrsStats = attrsStatsDefault;
	}

	// Effective encumbrance (eBE)
	if (ebeRelevant)
	{
		// Get eBE data from global
		const talentEbeData = effectiveEncumbrance[trigger];

		// Set correct roll template
		rollTemplate = "talent-ebe";

		// Create roll macro for eBE
		if (talentEbeData["type"] === "factor")
		{
			ebeMacro = `${talentEbeData["value"]} * ${ebeMacro}`;
		} else if (talentEbeData["type"] === "summand") {
			ebeMacro = `${ebeMacro}${talentEbeData["value"]}`;
		}
		rollOptions["ebeMacro"] = ebeMacro;
	}

	// Generate roll macro
	const rollMacro = generateTalentRollMacro(
		rollTemplate,
		nameInternal,
		nameUI,
		attrsStats,
		rollOptions
	);
	debugLog(caller, rollMacro);

	// Execute the roll
	const roll = await startRoll(rollMacro);
	debugLog(caller, "info:", info, "roll results:", roll);

	// Process the roll
	const rollID = roll.rollId;
	const resultComputed = {};

	/// Process results
	const resultProcessed = getTalentRollResults(roll.results);

	/// Formatting
	resultProcessed["stats"] = resultProcessed["stats"].toString().replaceAll(",", "/");

	/// Consider effective encumbrance
	let modOnly = roll.results.mod.result;
	if (ebeRelevant)
	{
		modOnly = roll.results.mod.result - roll.results.ebe.result;
	}

	/// Talent-specific Processing
	//// Athletics
	switch(trigger)
	{
		case "t_ko_athletik":
			// Additional GS can only be generated in successful checks (result = 1)
			if (resultProcessed.result === 1)
			{
				// Calculate bonus GS
				let athleticsGSBonus = parseInt(roll.results["athleticsbonus"].result);
				let TaPstarEffective = resultProcessed.TaPstar;
				const TaW = roll.results.wert.result;
				const successfulCheckMinEffectiveTaPstar = 1;

				/// Handle negative TaW, critical success and 0 TaP*
				//// In all cases, a successful check must give at least 1 TaP*
				//// Critical successes give max. TaP*
				if (resultProcessed.criticality >= 2)
				{
					TaPstarEffective = TaW;
				}

				//// Handle 0 TaP*: It is a success, but counts the same as 1.
				//// Also considers criticial successes with negative TaW.
				if (TaPstarEffective <= 0)
				{
					TaPstarEffective = successfulCheckMinEffectiveTaPstar;
				}
				athleticsGSBonus = TaPstarEffective * athleticsGSBonus / 10;
				athleticsGSBonus = athleticsGSBonus.toFixed(1);
				athleticsGSBonus = athleticsGSBonus.replace("\.", ",");
				resultComputed["athleticsbonus"] = athleticsGSBonus;
			}
			break;
	}

	/// Build computed results
	resultComputed["roll"] = prettifyResult(resultProcessed.TaPstar);
	resultComputed["result"] = resultProcessed.result;
	resultComputed["criticality"] = resultProcessed.criticality;
	resultComputed["stats"] = resultProcessed.stats;

	/// Consider effective encumbrance
	if (ebeRelevant)
	{
		resultComputed["mod"] = modOnly;
	}

	// Finish roll
	debugLog(caller, "resultComputed", resultComputed);
	finishRoll(
		rollID,
		resultComputed
	);
});
/* talents end */
