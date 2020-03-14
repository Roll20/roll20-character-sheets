
  on('sheet:opened', () => {
		getAttrs(['version'], v => { versioning(parseFloat(v.version) || 1); });
		translations();
	});

  on('clicked:shots_remove clicked:shots_add', eventinfo => updateShotsFired(eventinfo.triggerName))

	on('clicked:primary_ammo', () => updateAmmoWithShotsFired())

  on('clicked:reload', () => updateAmmoWithMax())

	sheetAttribues.tabs.forEach(attr => on(`clicked:tab_${attr}`, () => updateTab(attr)))

	on('change:agility change:walk_modifier change:run_modifier', () => updateMovement())

  on('change:body change:strength change:lift_carry_modifier', () => updateDerivedAttribute('lift_carry'))

  on('change:body change:strength', () => updateLimits('physical_limit'))

	on('change:body', () => {
      updateDerivedAttribute('overflow')
      updateDerivedAttribute('soak')
			update_track('physical')
	})

  on('change:reaction change:intuition', () => {
    updateDerivedAttribute('defense')
    update_initiative()
  })

  on('change:reaction', () => updateLimits('physical_limit'))

  on('change:intuition', () => {
    updateLimits('mental_limit')
    updateDerivedAttribute('judge_intentions')
  })

	on('change:willpower', () => {
    updateDerivedAttribute('composure')
    updateDerivedAttribute('memory')
		update_track('stun')
		updateLimits('social_limit')
		updateLimits('mental_limit')
	})

  on('change:logic change:memory_modifier', () => updateDerivedAttribute('memory'))

	on('change:logic', () => updateLimits('mental_limit')) 

  on('change:charisma change:composure_modifier', eventinfo => updateDerivedAttribute('composure'))

  on('change:charisma change:judge_intentions_modifier', eventinfo => updateDerivedAttribute('judge_intentions'))

  on('change:charisma change:essence', eventinfo => updateLimits('social_limit'))

	on('change:physical_modifier change:flag_drone', () => update_track('physical'))

	on('change:stun_modifier', () => update_track('stun'))

	on('change:initiative_modifier change:initiative_temp change:initiative_temp_flag', () => update_initiative())

	on('change:defense_modifier change:defense_temp change:defense_temp_flag', () => updateDerivedAttribute('defense'))

	on('change:armor_rating change:soak_modifier change:soak_temp change:soak_temp_flag', () => updateDerivedAttribute('soak'))

  sheetAttribues.attributeLimits.forEach(attr => on(`change:${attr}_modifier change:${attr}_temp change:${attr}_temp_flag`, () => updateLimits([`${attr}`])))

	sheetAttribues.woundCalculation.forEach(attr => on(`change:${attr}`, () => update_wounds()))

	on('clicked:cond_reset_physical clicked:cond_reset_stun', eventinfo => resetConditionTrack(eventinfo))

	on('change:edge_toggle', eventinfo => edgeToggle(eventinfo))

	on('change:device_rating change:matrix_modifier', () => updateMatrixMaximum())

	on('change:intuition change:astral_mod_modifier', () => updateAstralInitiative())

	on('change:initiative_dice_modifier change:edge_toggle change:initiative_dice_temp change:initiative_dice_temp_flag', () => updateInitiative())

	on('change:astral_dice_modifier change:edge_toggle', () => updateAstralInitiativeDice())

	on('change:host_rating change:data_processing change:pilot change:intuition change:matrix_mod_modifier change:level change:matrix_dice_modifier change:edge_toggle', () => updateMatrixInitiative())

  sheetAttribues.calculatedAttributes.forEach(attribute => {
      const attributeArray = [`${attribute}_base`, `${attribute}_modifier`, `${attribute}_temp`, `${attribute}_temp_flag`]
      attributeArray.forEach(attr => on(`change:${attr}`, () => updateAttributes(attributeArray, attribute)))
  });
