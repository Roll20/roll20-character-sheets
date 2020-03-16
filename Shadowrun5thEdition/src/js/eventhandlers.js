
  on('sheet:opened', () => {
		getAttrs(['version'], v => { versioning(parseFloat(v.version) || 1); });
		translations();
	});

  on('clicked:shots_remove clicked:shots_add', eventinfo => updateShotsFired(eventinfo.triggerName))

	on('clicked:primary_ammo', () => updateAmmoWithShotsFired())

  on('clicked:reload', () => updateAmmoWithMax())

	sheetAttribues.tabs.forEach(attr => on(`clicked:tab_${attr}`, () => updateTab(attr)))

	on('change:agility change:walk_modifier change:run_modifier', () => updateMovement())

  sheetAttribues.calculatedAttributes.forEach(attribute => {
      const attributeArray = [`${attribute}_base`, `${attribute}_modifier`, `${attribute}_temp`, `${attribute}_temp_flag`]
      attributeArray.forEach(attr => on(`change:${attr}`, () => updateAttributes(attributeArray, attribute)))
  });

  sheetAttribues.initiative_mod.forEach(attr => on(`change:${attr}`, () => updateAttributes(sheetAttribues.initiative_mod, 'initiative_mod')))

  sheetAttribues.astral_mod.forEach(attr => on(`change:${attr}`, () => updateAstralInitiative()))

  sheetAttribues.derivedAttributes.forEach(derivedAttribute => {
    sheetAttribues[derivedAttribute].forEach(attr => on(`change:${attr}`, () => updateDerivedAttribute(derivedAttribute)))
  })

  sheetAttribues.attributeLimits.forEach(attributeLimit => {
    sheetAttribues[attributeLimit].forEach(attr => on(`change:${attr}`, () => updateLimits(attributeLimit)))
    on(`change:${attributeLimit}_modifier change:${attributeLimit}_temp change:${attributeLimit}_temp_flag`, () => updateLimits([`${attributeLimit}`]))
  })

  sheetAttribues.conditionTracks.forEach(conditionTrack => {
    sheetAttribues[conditionTrack].forEach(attr => on(`change:${attr}`, () => updateConditionTracks(conditionTrack)))
  })

	sheetAttribues.woundCalculation.forEach(attr => on(`change:${attr}`, () => updateWounds()))

  sheetAttribues.repeatingSkills.forEach(field => {
    on(`change:repeating_${field}:rating change:repeating_${field}:rating_modifier`, eventinfo => updateRepeatingSkillRating(eventinfo.triggerName))
    on(`change:repeating_${field}:attribute`, eventinfo => updateRepeatingSkillAttribute(eventinfo))
    on(`change:repeating_${field}:skill`, eventinfo => updateRepeatingSkillName(eventinfo))
    on(`change:repeating_${field}:limit`, eventinfo => updateRepeatingSkillLimit(eventinfo))
    on(`change:repeating_${field}:dicepool`, eventinfo => updateRepeatingSkillDicepool(eventinfo))
  })

	on('clicked:cond_reset_physical clicked:cond_reset_stun', eventinfo => resetConditionTrack(eventinfo))

	on('change:edge_toggle', eventinfo => edgeToggle(eventinfo))

	on('change:device_rating change:matrix_modifier', () => updateMatrixMaximum())

	on('change:intuition change:astral_mod_modifier', () => updateAstralInitiative())

	on('change:initiative_dice_modifier change:edge_toggle change:initiative_dice_temp change:initiative_dice_temp_flag', () => updateInitiative())

	on('change:astral_dice_modifier change:edge_toggle', () => updateAstralInitiativeDice())

	on('change:host_rating change:data_processing change:pilot change:intuition change:matrix_mod_modifier change:level change:matrix_dice_modifier change:edge_toggle', () => updateMatrixInitiative())

