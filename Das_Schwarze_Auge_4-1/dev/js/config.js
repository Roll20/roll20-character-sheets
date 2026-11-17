/* config start */
const attrsLameModSetting = [
	't_ko_akrobatik_mod_lame_setting',
	't_ko_athletik_mod_lame_setting',
	't_ko_fliegen_mod_lame_setting',
	't_ko_freiesfliegen_mod_lame_setting',
	't_ko_gaukeleien_mod_lame_setting',
	't_ko_immanspiel_mod_lame_setting',
	't_ko_klettern_mod_lame_setting',
	't_ko_koerperbeherrschung_mod_lame_setting',
	't_ko_reiten_mod_lame_setting',
	't_ko_schleichen_mod_lame_setting',
	't_ko_schwimmen_mod_lame_setting',
	't_ko_selbstbeherrschung_mod_lame_setting',
	't_ko_sichverstecken_mod_lame_setting',
	't_ko_singen_mod_lame_setting',
	't_ko_sinnenschaerfe_mod_lame_setting',
	't_ko_skifahren_mod_lame_setting',
	't_ko_stimmenimitieren_mod_lame_setting',
	't_ko_tanzen_mod_lame_setting',
	't_ko_taschendiebstahl_mod_lame_setting',
	't_ko_zechen_mod_lame_setting',
];
Object.freeze(attrsLameModSetting);

const actionButtonsConfigLameAll = [
	'config_lame_all_always',
	'config_lame_all_ask',
	'config_lame_all_never',
	'config_lame_all_reset',
];
Object.freeze(actionButtonsConfigLameAll);

/*
	Action Listener for 'All x' buttons of Lame Configuration

Set the corresponding value of all talents affected by 'Lame' to the same value.
*/
on(actionButtonsConfigLameAll.map(button => `clicked:${button}`).join(" ").toLowerCase(),
	async(info) =>
	{
		// Boilerplate
		const caller = "Action Listener for 'All x' buttons of Lame Configuration";
		const trigger = info["triggerName"].replace(/^clicked:([^-]+)/, '$1');
		let isReset = false;
		let oldValuesAllEqual = true;
		let newDefaultValue = "";
		const lameModSettingConversion = {
			'always': "Ja",
			'ask': "Fragen",
			'never': "Nein",
		};
		/// Defining all properties and changing them later is faster than adding new properties with the correct value iteratively
		const attrsToChange = {
			't_ko_akrobatik_mod_lame_setting': "",
			't_ko_athletik_mod_lame_setting': "",
			't_ko_fliegen_mod_lame_setting': "",
			't_ko_freiesfliegen_mod_lame_setting': "",
			't_ko_gaukeleien_mod_lame_setting': "",
			't_ko_immanspiel_mod_lame_setting': "",
			't_ko_klettern_mod_lame_setting': "",
			't_ko_koerperbeherrschung_mod_lame_setting': "",
			't_ko_reiten_mod_lame_setting': "",
			't_ko_schleichen_mod_lame_setting': "",
			't_ko_schwimmen_mod_lame_setting': "",
			't_ko_selbstbeherrschung_mod_lame_setting': "",
			't_ko_sichverstecken_mod_lame_setting': "",
			't_ko_singen_mod_lame_setting': "",
			't_ko_sinnenschaerfe_mod_lame_setting': "",
			't_ko_skifahren_mod_lame_setting': "",
			't_ko_stimmenimitieren_mod_lame_setting': "",
			't_ko_tanzen_mod_lame_setting': "",
			't_ko_taschendiebstahl_mod_lame_setting': "",
			't_ko_zechen_mod_lame_setting': "",
		};
		let backupMessage = [];

		// Prepare attribute updates
		switch(trigger)
		{
			case "config_lame_all_always":
			case "config_lame_all_ask":
			case "config_lame_all_never":
				/// Get new value (always, ask or never) from trigger/button name
				newDefaultValue = trigger.replace(/^.*_([^_]+)$/, '$1');
				break;
			case "config_lame_all_reset":
				isReset = true;
		}

		/// Get current values to be able to report them to the user via a chat message in case the reset was unintentional
		safeGetAttrs(attrsLameModSetting,
			async(attrs) => {

			// Boilerplate
			const lameModSettingConversion = {
				'always': "Ja",
				'ask': "Fragen",
				'never': "Nein",
			};

			// Change attributes
			let lastValue = undefined;
			for (const attr of attrsLameModSetting)
			{
				// Boilerplate
				const talent = attr.replace(/^(t_ko_[^_]+).*$/, '$1');
				const talentUIName = talentsData[talent]["ui"];
				const attrValue = attrs[attr];
				const settingUIName = lameModSettingConversion[attrValue];

				// Build backup message
				backupMessage.push(`${talentUIName}: *${settingUIName}*`);

				// Keep track of equality of values processed so far
				if (oldValuesAllEqual)
				{
					// Tricky: Initial lastValue is "undefined", so that it becomes attrValue in the first round (which is guaranteed by safeGetAttrs to not be undefined)
					// In subsequent rounds the value is not undefined and this line is effectively a no-op.
					lastValue = lastValue ?? attrValue;

					// Since lastValue is not set to attrValue in rounds 2+, inequality means that not all settings were the same before.
					// The outer if prevents additional checks in later rounds.
					if (lastValue !== attrValue)
					{
						oldValuesAllEqual = false;
					}
				}

				// Change attribute
				let newValue = "";
				if (isReset)
				{
					newValue = getDefaultValue(attr);
				} else {
					newValue = newDefaultValue;
				}
				attrsToChange[attr] = newValue;
			}

			// Finalize backup message
			/// Shorter message if all settings were the same before
			if (oldValuesAllEqual)
			{
				lastValue = lameModSettingConversion[lastValue];
				backupMessage = `&bdquo;*${lastValue}*&ldquo; für alle Talente`;
			} else {
				backupMessage = backupMessage.join(", ");
			}
			backupMessage = `**Einstellungen für &bdquo;Lahm&ldquo; vor der Änderung:** ${backupMessage}.`;

			// Send backup message
			results = await startRoll(backupMessage);
			finishRoll(results.rollId);

			// Set attributes
			debugLog(caller, "trigger", trigger, "newDefaultValue", newDefaultValue, "attrsToChange", attrsToChange);
			safeSetAttrs(attrsToChange);
		});
});

/*
	Action Listener for the Detect Gametype Button
*/
on(
	"clicked:detectgametype",
	async(info) =>
	{
		const caller = "Action Listener for detectGameType button";
		debugLog(caller, "Running function prone to crashes.");

		// Check Game Type
		const gameType = detectGameType();
		gameType.then(
			(value) => { console.log("value", value); safeSetAttrs(value); }
		);
});
/* config end */
