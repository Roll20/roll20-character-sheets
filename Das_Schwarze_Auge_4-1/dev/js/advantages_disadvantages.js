/* advantages_disadvantages start */
on("change:nachteil_nachtblind",
	function() {
		safeGetAttrs(
			['nachteil_nachtblind', 'vorteil_daemmerungssicht', 'vorteil_nachtsicht'],
			function(v) {
				if(v.nachteil_nachtblind != "0")
				{
					safeSetAttrs({
							vorteil_daemmerungssicht: "0",
							vorteil_nachtsicht: "0"
						});
				}
		});
});

on("change:vorteil_daemmerungssicht change:vorteil_nachtsicht",
	function() {
		safeGetAttrs(
			['nachteil_nachtblind', 'vorteil_daemmerungssicht', 'vorteil_nachtsicht'],
			function(v) {
				if(v.vorteil_daemmerungssicht != "0" || v.vorteil_nachtsicht != "0")
				{
					safeSetAttrs({nachteil_nachtblind: "0"});
				}
		});
});

on(
"change:safe-sheet-open " +
"change:n_tollpatsch " +
"change:n_wildemagie", function(eventInfo) {
	var caller = "Action Listener (Crit Level Updater)";
	var trigger = eventInfo["triggerName"];
	var newValue = eventInfo["newValue"];
	const attrsToGet = [
		"n_tollpatsch",
		"n_wildemagie"
	];
	safeGetAttrs(attrsToGet, function(v) {
		var results = calcCritLevels({'Tollpatsch': v['n_tollpatsch'], 'wilde Magie': v['n_wildemagie']});
		var attrsToChange = {
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

on(
"change:safe-sheet-open " +
"change:v_festematrix " +
"change:n_spruchhemmung " +
"change:n_wildemagie", function(eventInfo) {
	var caller = "Action Listener (Firm Matrix/Spell Inhibition/Clumsy Fellow/Wild Magic)";
	const attrsToGet = [
		"v_festematrix",
		"n_spruchhemmung",
		"n_wildemagie"
	];

	safeGetAttrs(attrsToGet, function(v) {
		var trigger = eventInfo["sourceAttribute"];
		var newValue = eventInfo["newValue"];
		var festeMatrix = v["v_festematrix"];
		var spruchhemmung = v["n_spruchhemmung"];
		var wildeMagie = v["n_wildemagie"];

		var attrsToChange = {};
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
		if (trigger === "safe-sheet-open" && festeMatrix === "1")
		{
			if (
				(spruchhemmung === "1" && wildeMagie === "0") ||
				(spruchhemmung === "0" && wildeMagie === "1")
			)
			{
				attrsToChange["n_spruchhemmung"] = "0";
				attrsToChange["n_wildemagie"] = "0";
			} else if (spruchhemmung === "1" && wildeMagie === "1")
			{
				attrsToChange["v_festematrix"] = "0";
			}
		}

		if (
			!(
				Object.keys(attrsToChange).length === 0 &&
				Object.getPrototypeOf(attrsToChange) === Object.prototype
			)
		)
		{
			safeSetAttrs(attrsToChange);
		}
	});
});
/* advantages_disadvantages end */
