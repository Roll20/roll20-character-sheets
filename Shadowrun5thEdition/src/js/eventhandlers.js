	
   	on("sheet:opened", () => {
		getAttrs(["version"], v => { versioning(parseFloat(v.version) || 1); });

		translations();
	});

    on("clicked:shots_remove clicked:shots_add", eventinfo => {
    	getAttrs([`shots_fired`], v => {
    		v = parseIntegers(v);
    		const trigger = eventinfo.triggerName;
    		let shots = v[`shots_fired`];
			setAttrs({
				shots_fired: shots > 0 && trigger.includes("remove") ? shots -= 1 : trigger.includes("add") ? shots += 1 : shots
			});
		});
	});

	on("clicked:primary_ammo", eventinfo => {
    	getAttrs([`primary_range_weapon_ammo`, `shots_fired`], v => {
    		v = parseIntegers(v);
			setAttrs({
				primary_range_weapon_ammo: v[`primary_range_weapon_ammo`] - v[`shots_fired`]
			});
		});
	});

   on("clicked:reload", eventinfo=> {
    	getAttrs([`primary_range_weapon_ammo_max`], (v) => {
    		v = parseIntegers(v);
			setAttrs({
				primary_range_weapon_ammo: v[`primary_range_weapon_ammo_max`]
			});
		});
	});

	sheetAttribues.repeatingSkills.forEach(attr => {
		on(`clicked:repeating_${attr}:skill`, eventinfo=> {
			settingsToggle(eventinfo);
		}); 
	});

	sheetAttribues.repeating.forEach(attr => {
		on(`clicked:repeating_${attr}:${attr}`, eventinfo=> {
			settingsToggle(eventinfo);
		}); 
	});

	sheetAttribues.tabs.forEach(attr => {
   		on(`clicked:tab_${attr}`, () => {
   			setAttrs({ tab: attr });
   		});
   });


	on("change:agility change:walk_modifier change:run_modifier", () => {
		update_movement();
	});

	on("change:body change:strength change:lift_carry_modifier", eventinfo=> {
		const source = eventinfo.sourceAttribute;
		update_common_rolls(["body", "strength", "lift_carry_modifier"]);
		//STRENGTH & BODY RUN THIS
		source.includes("strength") || source.includes("body") ? update_limit("physical") : false;
		//ONLY RUN ON BODY CHANGE
		if (source.includes("body")) {
			update_common_rolls(["body", "overflow_modifier"]);
			update_common_rolls(["body", "armor_rating", "soak_modifier", "soak_temp", `soak_temp_flag`]);
			update_track("physical");
		};
	});

	on("change:reaction change:intuition", eventinfo=> {
		const source = eventinfo.sourceAttribute;
		update_common_rolls(["reaction", "intuition", "defense_modifier", "defense_temp", `defense_temp_flag`]);
		update_initiative();
		//REACTION UPDATES PHYSICAL, INTUITION UPDATES MENTAL
		(source.includes("reaction")) ? update_limit("physical") : update_limit("mental");
		//ONLY RUN ON INTUITION CHANGE
		(source.includes("intuition")) ? update_common_rolls(["charisma", "intuition", "judge_intentions_modifier"]) : false;
	});

	on("change:willpower", () => {
		update_common_rolls(["charisma", "willpower", "composure_modifier"]);
		update_common_rolls(["logic", "willpower", "memory_modifier"]);
		update_track("stun");
		update_limit("social");
		update_limit("mental");
	});

	on("change:logic change:memory_modifier", eventinfo=> {
		const source = eventinfo.sourceAttribute;
		update_common_rolls(["logic", "willpower", "memory_modifier"]);
		//LOGIC UPDATES LIMIT
		(source.includes("logic")) ? update_limit("mental") : false;
	});

	on("change:charisma change:composure_modifier change:judge_intentions_modifier", eventinfo=> {
		const source = eventinfo.sourceAttribute;
		//CHARISMA & COMPOSURE UPDATE COMPOSURE
		(source.includes("charisma") || source.includes("composure")) ? update_common_rolls(["charisma", "willpower", "composure_modifier"]) : false;
		//CHARISMA & JUDGE INTENTIONS UPDATE JUDGE INTENTIONS
		(source.includes("charisma") || source.includes("judge")) ? update_common_rolls(["charisma", "intuition", "judge_intentions_modifier"]) : false;
		//ONLY CHARISMA UPDATES SOCIAL LIMIT
		(source.includes("charisma")) ? update_limit("social") : false;
	});

	on("change:essence", () => {
		update_limit("social");
	});

	on("change:physical_modifier change:flag_drone", () => {
		update_track("physical");
	});

	on("change:stun_modifier", () => {
		 update_track("stun");
	});

	on("change:initiative_modifier change:initiative_temp change:initiative_temp_flag", () => {
		update_initiative();
	});

	on("change:defense_modifier change:defense_temp change:defense_temp_flag", () => {
		update_common_rolls(["reaction", "intuition", "defense_modifier", "defense_temp", `defense_temp_flag`]);
	});

	on("change:armor_rating change:soak_modifier change:soak_temp change:soak_temp_flag", () => {
		update_common_rolls(["body", "armor_rating", "soak_modifier", "soak_temp", `soak_temp_flag`]);
	});

	on("change:mental_limit_modifier change:mental_limit_temp change:mental_limit_temp_flag change:physical_limit_modifier change:physical_limit_temp change:physical_limit_temp_flag change:social_limit_modifier change:social_limit_temp change:social_limit_temp_flag",  eventinfo=> {
		const type = eventinfo.sourceAttribute.split("_")[0]; 
		update_limit(type);
	});

	sheetAttribues.woundCalculation.forEach(attr => {
		on(`change:${attr}`, () => {
			update_wounds();
		});
	});

	on("clicked:cond_reset_physical clicked:cond_reset_stun", (eventinfo) => {
		resetConditionTrack(eventinfo)
	});

	on("change:edge_toggle", eventinfo => {
		edgeToggle(eventinfo)
	});

	on("change:device_rating change:matrix_modifier", () => {
		updateMatrixMaximum()
	});

	on("change:intuition change:astral_mod_modifier", () => {
		updateAstralInitiative()
	});

	on("change:initiative_dice_modifier change:edge_toggle change:initiative_dice_temp change:initiative_dice_temp_flag", () => {
		updateInitiative()
	});

	on("change:astral_dice_modifier change:edge_toggle", () => {
		updateAstralInitiativeDice()
	});

	on("change:host_rating change:data_processing change:pilot change:intuition change:matrix_mod_modifier change:level change:matrix_dice_modifier change:edge_toggle", () => {
		updateMatrixInitiative()
	});

//	sheetAttribues.repeatingSkills.forEach(field => {
//		on(`change:repeating_${field}`, eventinfo => { 
//			const id = eventinfo.sourceAttribute.split(`_`)[2];
//		});
//    }); 
