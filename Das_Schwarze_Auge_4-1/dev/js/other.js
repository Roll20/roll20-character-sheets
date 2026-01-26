/* other start */
/*
	calcCritLevels
Calculates the required d20 rolls for critical success/failure by check type
effects (object):
	Tollpatsch
	wilde Magie
	// effects below not yet used, added for completeness and later implementation
	Axxeleratus, Blitzgeschwind
	Murks und Patz
	Reversalis(Murks und Patz)
	Standfest Katzengleich
	Stillstand
	Reversalis(Stillstand)
	Thalionmels Schlachtgesang
	// effects below ignored and not added due to complex implementation
	Sensattaco
	Reversalis(Sensattaco)
	Reversalis(Standfest)
It outputs an object with one property per check type containing one object with
	maximum roll triggering critical success (default: 1)
	minimum roll triggering critical failure (default: 20)
Note: No critical success/failure for liturgies (see Wege der Götter, p. 242).
*/
function calcCritLevels (effects) {
	const caller = 'calcCritLevels';
	var result = {
		'talent': {'success': 1, 'failure': 20},
		'kampf_at': {'success': 1, 'failure': 20},
		'kampf_pa': {'success': 1, 'failure': 20},
		'kampf_fk': {'success': 1, 'failure': 20},
		'zauber': {'success': 1, 'failure': 20},
		'ritual': {'success': 1, 'failure': 20}
	};
	const types = [
		'talent',
		'kampf_at', 'kampf_pa', 'kampf_fk',
		'zauber', 'ritual'
	];
	const effectList = [
		'Tollpatsch',
		'wilde Magie',
		'Axxeleratus, Blitzgeschwind',
		'Murks und Patz',
		'Reversalis(Murks und Patz)',
		'Standfest Katzengleich',
		'Stillstand',
		'Reversalis(Stillstand)',
		'Thalionmels Schlachtgesang'
	];
	// Check type, per check type list influence on critical success/failure per effect
	// Higher values for critical success = good (+2 means 1, 2, 3 are success)
	// Lower values for critical failure = bad (-2 means 18, 19, 20 are failure)
	// Values outside of d20 results (< 1, > 20): critical not possible
	// Karmic effects trump magic effects
	const effectMatrix = {
		'talent': {
			'Tollpatsch': { 'success': 0, 'failure': -1 },
			'wilde Magie': { 'success': 0, 'failure': 0 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': 0 },
			'Murks und Patz': { 'success': 0, 'failure': 0 },
			'Reversalis(Murks und Patz)': { 'success': 0, 'failure': 0 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 0 },
			'Stillstand': { 'success': 0, 'failure': 0 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': 0 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 0 }
		},
		'kampf_at': {
			'Tollpatsch': { 'success': 0, 'failure': -1 },
			'wilde Magie': { 'success': 0, 'failure': 0 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': -2 },
			'Murks und Patz': { 'success': -50, 'failure': -50 },
			'Reversalis(Murks und Patz)': { 'success': 50, 'failure': 50 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 50 },
			'Stillstand': { 'success': 0, 'failure': 50 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': -2 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 100 }
		},
		'kampf_pa': {
			'Tollpatsch': { 'success': 0, 'failure': -1 },
			'wilde Magie': { 'success': 0, 'failure': 0 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': -2 },
			'Murks und Patz': { 'success': -50, 'failure': -50 },
			'Reversalis(Murks und Patz)': { 'success': 50, 'failure': 50 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 50 },
			'Stillstand': { 'success': 0, 'failure': 50 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': -2 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 100 }
		},
		'kampf_fk': {
			'Tollpatsch': { 'success': 0, 'failure': -1 },
			'wilde Magie': { 'success': 0, 'failure': 0 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': -2 },
			'Murks und Patz': { 'success': -50, 'failure': -50 },
			'Reversalis(Murks und Patz)': { 'success': 50, 'failure': 50 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 0 },
			'Stillstand': { 'success': 0, 'failure': 50 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': -2 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 0 }
		},
		'zauber': {
			'Tollpatsch': { 'success': 0, 'failure': 0 },
			'wilde Magie': { 'success': 0, 'failure': -1 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': 0 },
			'Murks und Patz': { 'success': 0, 'failure': 0 },
			'Reversalis(Murks und Patz)': { 'success': 0, 'failure': 0 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 0 },
			'Stillstand': { 'success': 0, 'failure': 0 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': 0 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 0 }
		},
		'ritual': {
			'Tollpatsch': { 'success': 0, 'failure': 0 },
			'wilde Magie': { 'success': 0, 'failure': -1 },
			'Axxeleratus, Blitzgeschwind': { 'success': 0, 'failure': 0 },
			'Murks und Patz': { 'success': 0, 'failure': 0 },
			'Reversalis(Murks und Patz)': { 'success': 0, 'failure': 0 },
			'Standfest Katzengleich': { 'success': 0, 'failure': 0 },
			'Stillstand': { 'success': 0, 'failure': 0 },
			'Reversalis(Stillstand)': { 'success': 0, 'failure': 0 },
			'Thalionmels Schlachtgesang': { 'success': 0, 'failure': 0 }
		}
	};
	/* Input Sanitation */
	// Effects
	var propertyCheck = checkRequiredProperties(effectList, effects);
	if (propertyCheck['errors'] >= 1)
	{
		debugLog(caller, 'Missing properties:', propertyCheck['missing'], '. Missing values added with default value 0.');
		for (let property of propertyCheck['missing'])
		{
			effects[property] = 0;
		}
	}

	// Assumption: safeGetAttrs() used, so no undefined or NaN
	// Correct values: 0 or 1
	for (let property of effectList)
	{
		if (isNaN(parseInt(effects[property])))
		{
			debugLog(caller, 'Property not a number:', property, 'with value', effects[property] + '. Assuming 0.');
			effects[property] = 0;
		} else {
			if (parseInt(effects[property]) < 0)
			{
				effects[property] = 0;
			} else if (parseInt(effects[property]) > 1) {
				effects[property] = 1;
			}
		}
	}
	debugLog(caller, 'Inputs sanitized: effects:', effects);

	/* Calculations */
	for (let type of types)
	{
		for (let effect of effectList)
		{
			for (let crit of ['success', 'failure'])
				result[type][crit] += effects[effect] * effectMatrix[type][effect][crit];
			}
		}

	debugLog(caller, 'Result:', result);
	return result;
}

on("sheet:opened change:character_name", function(eventInfo) {
	var func = "Action Listener for Updating Roll Button Actions on Character Name Updates";
	// Build list of attributes
	var attrsToGet = ["character_name"];
	var ebeTalents = []
	var repeatingTalents = [];

	getSectionIDs("conjuration-spells-myranor", function(ids) {
		for (let id of ids)
		{
			repeatingTalents.push("repeating_conjuration-spells-myranor_" + id + "_spell");
		}
		for (let talent of talents_ebe)
		{
			ebeTalents.push(talent + "-ebe");
		}
		for (let attr of [].concat(talents, ebeTalents, spells, melee, reg, repeatingTalents))
		{
			attrsToGet.push(attr + "_action");
		}
		safeGetAttrs(attrsToGet, function(v) {
			var attrsToChange = {};

			for (let attr of attrsToGet)
			{
				// No action buttons for character name and combat techniques required
				if (attr.match("t_ka_") || attr === "character_name") continue;
				attrsToChange[attr] = "%{" + v["character_name"] + "|" + attr.replace(/_action$/gm, "") + "-action}";
			}

			attrsToChange["rc_attack_action"] = "%{" + v["character_name"] + "|rc_attack-action}";
			attrsToChange["eidsegen_action"] = "%{" + v["character_name"] + "|eidsegen-action}";

			debugLog(func, attrsToChange);
			safeSetAttrs(attrsToChange);
		});
	});
});

on('clicked:patzer', async (info) => {
	var received = unpackObject(info["originalRollId"]);

	/*
	Timing Check
	People may try to cheat by reacting to an old roll
	*/
	var rollTime = 0;
	results = await startRoll(received["rollMacro"]);
	console.log("test: info:", info, "results:", results, "received:", received);

	// Time for triggering reaction before warning appears, in milliseconds
	var reactionTimeLimit = 15 * 60 * 1000;
	// One minute consists of 60 seconds of 1000 milliseconds each
	const minute = 60 * 1000;

	var timeDifference = Date.now() - received["rollTime"];

	if (timeDifference < 0) {
		console.log("Fishy time difference for roll and reaction roll gotten.", received);
		rollTime = -1
	} else if (timeDifference > reactionTimeLimit) {
		rollTime = 1;
	}

	finishRoll(
		results.rollId,
		{
			rollExpired: rollTime,
			rollTag: received["rollTag"], // original roll's tag
			rollTime: received["rollTime"], // original roll's time
			rollTimeHuman: Math.floor(timeDifference / minute)
		}
	);
});
/* other end */
