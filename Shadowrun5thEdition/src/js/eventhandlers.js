
  on("sheet:opened", () => {
		getAttrs(["version"], v => { versioning(parseFloat(v.version) || 1); });
		translations();
	});


  on("clicked:shots_remove clicked:shots_add", eventinfo => updateShotsFired(eventinfo.triggerName))

	on("clicked:primary_ammo", () => updateAmmoWithShotsFired())

  on("clicked:reload", () => updateAmmoWithMax())

	sheetAttribues.tabs.forEach(attr => updateTab(attr))

	on("change:agility change:walk_modifier change:run_modifier", () => updateMovement())

  on("change:body change:strength change:lift_carry_modifier", () => update_common_rolls(["body", "strength", "lift_carry_modifier"]))

  on("change:body change:strength", () => update_limit("physical"))

	on("change:body", () => {
			update_common_rolls(["body", "overflow_modifier"])
			update_common_rolls(["body", "armor_rating", "soak_modifier", "soak_temp", `soak_temp_flag`])
			update_track("physical")
	})

  on("change:reaction change:intuition", () => {
    update_common_rolls(["reaction", "intuition", "defense_modifier", "defense_temp", `defense_temp_flag`])
    update_initiative()
  })

  on("change:reaction", () => update_limit("physical"))

  on("change:intuition", () => {
    update_limit("mental")
    update_common_rolls(["charisma", "intuition", "judge_intentions_modifier"])
  })

	on("change:willpower", () => {
		update_common_rolls(["charisma", "willpower", "composure_modifier"])
		update_common_rolls(["logic", "willpower", "memory_modifier"])
		update_track("stun")
		update_limit("social")
		update_limit("mental")
	})

  on("change:logic change:memory_modifier", () => update_common_rolls(["logic", "willpower", "memory_modifier"]))

	on("change:logic", () => update_limit("mental")) 

  on("change:charisma change:composure_modifier", eventinfo => update_common_rolls(["charisma", "willpower", "composure_modifier"]))

  on("change:charisma change:judge_intentions_modifier", eventinfo => update_common_rolls(["charisma", "intuition", "judge_intentions_modifier"]))

  on("change:charisma change:essence", eventinfo => update_limit("social"))

	on("change:physical_modifier change:flag_drone", () => update_track("physical"))

	on("change:stun_modifier", () => update_track("stun"))

	on("change:initiative_modifier change:initiative_temp change:initiative_temp_flag", () => update_initiative())

	on("change:defense_modifier change:defense_temp change:defense_temp_flag", () => update_common_rolls(["reaction", "intuition", "defense_modifier", "defense_temp", `defense_temp_flag`]))

	on("change:armor_rating change:soak_modifier change:soak_temp change:soak_temp_flag", () => update_common_rolls(["body", "armor_rating", "soak_modifier", "soak_temp", `soak_temp_flag`]))

	on("change:mental_limit_modifier change:mental_limit_temp change:mental_limit_temp_flag change:physical_limit_modifier change:physical_limit_temp change:physical_limit_temp_flag change:social_limit_modifier change:social_limit_temp change:social_limit_temp_flag", eventinfo => update_limit(eventinfo.sourceAttribute.split("_")[0]));

	sheetAttribues.woundCalculation.forEach(attr => on(`change:${attr}`, () => update_wounds()))

	on("clicked:cond_reset_physical clicked:cond_reset_stun", eventinfo => resetConditionTrack(eventinfo))

	on("change:edge_toggle", eventinfo => edgeToggle(eventinfo))

	on("change:device_rating change:matrix_modifier", () => updateMatrixMaximum())

	on("change:intuition change:astral_mod_modifier", () => updateAstralInitiative())

	on("change:initiative_dice_modifier change:edge_toggle change:initiative_dice_temp change:initiative_dice_temp_flag", () => updateInitiative())

	on("change:astral_dice_modifier change:edge_toggle", () => updateAstralInitiativeDice())

	on("change:host_rating change:data_processing change:pilot change:intuition change:matrix_mod_modifier change:level change:matrix_dice_modifier change:edge_toggle", () => updateMatrixInitiative())


