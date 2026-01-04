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
