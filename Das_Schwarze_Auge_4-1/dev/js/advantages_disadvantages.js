/* advantages_disadvantages start */
/* Nightblind */
const attrsNightblind = [
	'nachteil_nachtblind',
];
Object.freeze(attrsNightblind);

on(attrsNightblind.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		safeGetAttrs(
			attrsNightblind, function(v) {
				if(v.nachteil_nachtblind != "0")
				{
					safeSetAttrs({
							vorteil_daemmerungssicht: "0",
							vorteil_nachtsicht: "0"
						});
				}
		});
});

/* Enhanced vision */
const attrsEnhancedVision = [
	'vorteil_daemmerungssicht',
	'vorteil_nachtsicht',
];
Object.freeze(attrsEnhancedVision);

on(attrsEnhancedVision.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function() {
		safeGetAttrs(
			attrsEnhancedVision, function(v) {
				if(v.vorteil_daemmerungssicht != "0" || v.vorteil_nachtsicht != "0")
				{
					safeSetAttrs({nachteil_nachtblind: "0"});
				}
		});
});

/* Crit-level affecting advantages/disadvantages */
const attrsCritLevel = [
	'n_tollpatsch',
	'n_wildemagie',
];
Object.freeze(attrsCritLevel);

on( [ 'safe-sheet-open', ...attrsCritLevel ].map(attr => "change:" + attr).join(" ").toLowerCase(),
	function(eventInfo) {
		const caller = "Action Listener (Crit Level Updater, Advantages/Disadvantages)";
		const trigger = eventInfo["triggerName"];
		const newValue = eventInfo["newValue"];

		safeGetAttrs(
			attrsCritLevel, function(v) {
				const results = calcCritLevels({'Tollpatsch': v['n_tollpatsch'], 'wilde Magie': v['n_wildemagie']});
				let attrsToChange = {
					'cs_talent': results['talent']['success'],
					'cf_talent': results['talent']['failure'],
					'cs_kampf_at': results['kampf_at']['success'],
					'cf_kampf_at': results['kampf_at']['failure'],
					'cs_kampf_pa': results['kampf_pa']['success'],
					'cf_kampf_pa': results['kampf_pa']['failure'],
					'cs_kampf_fk': results['kampf_fk']['success'],
					'cf_kampf_fk': results['kampf_fk']['failure'],
					'cs_zauber': results['zauber']['success'],
					'cf_zauber': results['zauber']['failure'],
					'cs_ritual': results['ritual']['success'],
					'cf_ritual': results['ritual']['failure']
				}
				safeSetAttrs(attrsToChange);
		});
});

/* Magical advantages/disadvantages of the Firm Matrix block (some are mutually exclusive) */
const attrsFirmMatrixBlock = [
	'v_festematrix',
	'n_spruchhemmung',
	'n_wildemagie',
];
Object.freeze(attrsFirmMatrixBlock);

on( [ 'safe-sheet-open', ...attrsFirmMatrixBlock ].map(attr => "change:" + attr).join(" ").toLowerCase(),
	function(eventInfo) {
		const caller = "Action Listener (Firm Matrix block)";

		safeGetAttrs(
			attrsFirmMatrixBlock, function(v) {
				// Boilerplate
				const trigger = eventInfo["sourceAttribute"];
				const newValue = eventInfo["newValue"];
				const firmMatrix = v["v_festematrix"];
				const spellInhibition = v["n_spruchhemmung"];
				const wildMagic = v["n_wildemagie"];

				let attrsToChange = {};

				// Firm Matrix cannot be taken with either Spell Inhibition or Wild Magic
				if (trigger === "v_festematrix" && newValue === "1")
				{
					attrsToChange["n_spruchhemmung"] = "0";
					attrsToChange["n_wildemagie"] = "0";
				}
				if (
					(trigger === "n_spruchhemmung" || trigger === "n_wildemagie")
					&&
					newValue === "1"
				)
				{
					attrsToChange["v_festematrix"] = "0";
				}

				// If this is triggered by sheet opening and we find an impossible situation, rectify it.
				// This is a heuristic with the following assumptions:
				// * If only either Spell Inhibition or Wild Magic is found Firm Matrix overrules this.
				// * If both Spell Inhibition and Wild Magic are found Firm Matrix gets overruled.
				if (trigger === "safe-sheet-open" && firmMatrix === "1")
				{
					if (
						(spellInhibition === "1" && wildMagic === "0") ||
						(spellInhibition === "0" && wildMagic === "1")
					)
					{
						attrsToChange["n_spruchhemmung"] = "0";
						attrsToChange["n_wildemagie"] = "0";
					} else if (spellInhibition === "1" && wildMagic === "1")
					{
						attrsToChange["v_festematrix"] = "0";
					}
				}

				// Apply changes only if there are any
				if (
					!(
						Object.keys(attrsToChange).length === 0
						&&
						Object.getPrototypeOf(attrsToChange) === Object.prototype
					)
				)
				{
					safeSetAttrs(attrsToChange);
				}
		});
});

/* Agility (GE) and Movement (GS) affecting advantages/disadvantages

Several advantages/disadvantages affect Movement (GS). There are pairs of mutually exclusive ones and one corner case regarding "Swift" (Flink).

"Swift" may be taken twice if the first level of this advantage comes with the race, the culture or the profession. Goblins always have the first level of this advantage naturally.

The mutually exclusive pairs are:
* Swift (Flink) and Unhurried (Behäbig)
* One-legged (Einbeinig) and Lame (Lahm)

"Short Stature" (Kleinwüchsig) and "Dwarven Stature" (Zwergenwuchs) are not mutually exclusive, but would make for a very short dwarf (below ~1.1 m).

*/
const attrsMovementAffecting = [
	'vorteil_flink_i',
	'vorteil_flink_ii',
	'nachteil_behaebig',
	'nachteil_einbeinig',
	'nachteil_kleinwuechsig',
	'nachteil_lahm',
	'nachteil_zwergenwuchs',
	'BE',
];
Object.freeze(attrsMovementAffecting);

on(attrsMovementAffecting.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function(eventInfo) {
		const caller = "Action Listener Movement (GS) affecting advantages/disadvantages";

		safeGetAttrs(
			attrsMovementAffecting, function(v) {
				// Boilerplate
				const trigger = eventInfo["sourceAttribute"];
				const newValue = eventInfo["newValue"];
				const encumbrance = v["BE"];
				const defaultAgilityMod = 0;
				const defaultMovementMod = 0;
				const defaultEvadeMod = 0;
				const swiftEncumbranceThresholds = {
					"vorteil_flink_i": 5,
					"vorteil_flink_ii": 7,
				};
				const agilityEffects = {
					"vorteil_flink_i": 0,
					"vorteil_flink_ii": 0,
					"nachteil_behaebig": 0,
					"nachteil_einbeinig": -5,
					"nachteil_kleinwuechsig": 0,
					"nachteil_lahm": -2,
					"nachteil_zwergenwuchs": 0,
					"BE": 0,
				};
				const movementEffects = {
					"vorteil_flink_i": 1,
					"vorteil_flink_ii": 1,
					"nachteil_behaebig": -1,
					"nachteil_einbeinig": -3,
					"nachteil_kleinwuechsig": -1,
					"nachteil_lahm": -1,
					"nachteil_zwergenwuchs": -2,
					"BE": -encumbrance,
				};
				const evadeMods = {
					"vorteil_flink_i": -1,
					"vorteil_flink_ii": -1,
					"nachteil_behaebig": 1,
					"nachteil_einbeinig": 0,
					"nachteil_kleinwuechsig": 0,
					"nachteil_lahm": 0,
					"nachteil_zwergenwuchs": 1,
					"BE": 0,
				};

				let attrsToChange = {};

				// The advantages/disadvantages are mutually exclusive
				/// Swift/Unhurried group
				if (
					trigger === "nachteil_behaebig"
					&&
					newValue === "1"
				)
				{
					attrsToChange["vorteil_flink_i"] = "0";
					attrsToChange["vorteil_flink_ii"] = "0";
				}
				if (
					trigger === "vorteil_flink_i"
					&&
					newValue === "1"
				)
				{
					attrsToChange["nachteil_behaebig"] = "0";
				}
				if (
					trigger === "vorteil_flink_i"
					&&
					newValue === "0"
				)
				{
					attrsToChange["vorteil_flink_ii"] = "0";
				}
				if (
					trigger === "vorteil_flink_ii"
					&&
					newValue === "1"
				)
				{
					attrsToChange["vorteil_flink_i"] = "1";
					attrsToChange["nachteil_behaebig"] = "0";
				}

				/// One-legged/Lame group
				if (
					trigger === "nachteil_einbeinig"
					&&
					newValue === "1"
				)
				{
					attrsToChange["nachteil_lahm"] = "0";
				}
				if (
					trigger === "nachteil_lahm"
					&&
					newValue === "1"
				)
				{
					attrsToChange["nachteil_einbeinig"] = "0";
				}

				// Calculate GE and GS mods based on new attribute states
				let agilityMod = 0;
				let movementMod = 0;
				let evadeMod = 0;
				let swiftEncumbranceHint = false;

				const updatedAttrs = Object.assign(v, attrsToChange);
				/// Special case: Always consider encumbrance
				updatedAttrs["BE"] = "1";

				for (attr in updatedAttrs)
				{
					if (updatedAttrs[attr] === "1")
					{
						// Consider encumbrance for Swift I/II
						if (attr in swiftEncumbranceThresholds)
						{
							if (encumbrance >= swiftEncumbranceThresholds[attr])
							{
								swiftEncumbranceHint = true;
								continue;
							}
						}
						agilityMod += agilityEffects[attr];
						movementMod += movementEffects[attr];
						evadeMod += evadeMods[attr];
					}
				}
				attrsToChange["GE_mod_advantages_disadvantages"] = agilityMod;
				attrsToChange["GS_mod_advantages_disadvantages"] = movementMod;
				attrsToChange["k_ausweichen_mod_vorteile_nachteile"] = evadeMod;

				if (swiftEncumbranceHint)
				{
					attrsToChange["BE_GS_mod_hint_swift"] = 1;
				} else {
					attrsToChange["BE_GS_mod_hint_swift"] = 0;
				}

				// Apply changes
				safeSetAttrs(attrsToChange);
		});
});

/* Wound threshold (WS) affecting advantages/disadvantages */
const attrsWoundThresholdAffecting = [
	'Eisern',
	'nachteil_glasknochen',
];
Object.freeze(attrsWoundThresholdAffecting);

on(attrsWoundThresholdAffecting.map(attr => "change:" + attr).join(" ").toLowerCase(),
	function(eventInfo) {
		const caller = "Action Listener Wound threshold affecting advantages/disadvantages";

		safeGetAttrs(
			attrsWoundThresholdAffecting, function(v) {
				// Boilerplate
				const trigger = eventInfo["sourceAttribute"];
				const newValue = eventInfo["newValue"];
				const defaultMod = 0;
				const adamant = v["Eisern"];
				const adamantMod = 2;
				const glassBones = v["nachteil_glasknochen"];
				const glassBonesMod = -2;

				let attrsToChange = {};


				// The advantages/disadvantages are mutually exclusive
				if (
					trigger === "eisern"
					&&
					newValue !== "0"
				)
				{
					attrsToChange["nachteil_glasknochen"] = "0";
				}
				if (
					trigger === "nachteil_glasknochen"
					&&
					newValue !== "0"
				)
				{
					attrsToChange["Eisern"] = "0";
				}

				// Calculate WS mod based on new attribute states
				if (adamant !== "0")
				{
					attrsToChange["WS_mod_advantages_disadvantages"] = adamantMod;
				} else if (glassBones !== "0") {
					attrsToChange["WS_mod_advantages_disadvantages"] = glassBonesMod;
				} else {
					attrsToChange["WS_mod_advantages_disadvantages"] = defaultMod;
				}

				// Apply changes
				safeSetAttrs(attrsToChange);
		});
});
/* advantages_disadvantages end */
