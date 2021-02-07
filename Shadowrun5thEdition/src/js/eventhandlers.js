
  on('sheet:opened', () => {
		getAttrs(['version'], v => { versioning(parseFloat(v.version) || 1); });
		translations();
	});

  on('clicked:shots_remove clicked:shots_add', eventinfo => updateShotsFired(eventinfo.triggerName))

	on('clicked:primary_ammo', () => updateAmmoWithShotsFired())

  on('clicked:reload', () => updateAmmoWithMax())

	sheetAttributes.tabs.forEach(attr => on(`clicked:tab_${attr}`, () => updateTab(attr)))

	on('change:agility change:walk_modifier change:run_modifier', () => updateMovement())

  sheetAttributes.calculatedAttributes.forEach(attribute => {
      const attributeArray = [`${attribute}_base`, `${attribute}_modifier`, `${attribute}_temp`, `${attribute}_temp_flag`]
      attributeArray.forEach(attr => on(`change:${attr}`, () => updateAttributes(attributeArray, attribute)))
  });

  sheetAttributes.initiative_mod.forEach(attr => on(`change:${attr}`, () => updateAttributes(sheetAttributes.initiative_mod, 'initiative_mod')))

  sheetAttributes.astral_mod.forEach(attr => on(`change:${attr}`, () => updateAstralInitiative()))

  sheetAttributes.derivedAttributes.forEach(derivedAttribute => {
    sheetAttributes[derivedAttribute].forEach(attr => on(`change:${attr}`, () => updateDerivedAttribute(derivedAttribute)))
  })

  sheetAttributes.attributeLimits.forEach(attributeLimit => {
    sheetAttributes[attributeLimit].forEach(attr => on(`change:${attr}`, () => updateLimits(attributeLimit)))
    on(`change:${attributeLimit}_modifier change:${attributeLimit}_temp change:${attributeLimit}_temp_flag`, () => updateLimits([`${attributeLimit}`]))
  })

  sheetAttributes.conditionTracks.forEach(conditionTrack => {
    sheetAttributes[conditionTrack].forEach(attr => on(`change:${attr}`, () => updateConditionTracks(conditionTrack)))
  })

	sheetAttributes.woundCalculation.forEach(attr => on(`change:${attr}`, () => updateWounds()))

  sheetAttributes.repeatingSkills.forEach(field => {
    on(`change:repeating_${field}:rating change:repeating_${field}:rating_modifier`, eventinfo => updateRepeatingSkillRating(eventinfo.triggerName))
    on(`change:repeating_${field}:attribute`, eventinfo => updateRepeatingSkillAttribute(eventinfo))
    on(`change:repeating_${field}:limit`, eventinfo => updateRepeatingSkillLimit(eventinfo))
    on(`change:repeating_${field}:dicepool`, eventinfo => updateRepeatingSkillDicepool(eventinfo))
  })

  sheetAttributes.weaponTypes.forEach(type => {
    on(`change:repeating_${type}:dicepool_modifier change:repeating_${type}:specialization`, eventinfo => updateRepeatingWeaponDicepool(eventinfo.triggerName))
    on(`change:repeating_${type}:primary`, eventinfo => updateRepeatingPrimary(eventinfo, type))
  })

  sheetAttributes.rangeAttributes.forEach(attr => on(`change:repeating_range:${attr}`, eventinfo => updatePrimary(eventinfo)))

  sheetAttributes.meleeAttributes.forEach(attr => on(`change:repeating_melee:${attr}`, eventinfo => updatePrimary(eventinfo)))

  sheetAttributes.armorAttributes.forEach(attr => on(`change:repeating_armor:${attr}`, eventinfo => updatePrimary(eventinfo)))

  on("change:repeating_armor:primary", eventinfo => updateRepeatingPrimary(eventinfo, 'armor'))

  on(`change:repeating_active:skill`, eventinfo => updateRepeatingSkillName(eventinfo))

	on('clicked:cond_reset_physical clicked:cond_reset_stun', eventinfo => resetConditionTrack(eventinfo))

	on('change:edge_toggle', eventinfo => edgeToggle(eventinfo.newValue))

	on('change:device_rating change:matrix_modifier', () => updateMatrixMaximum())

	on('change:intuition change:astral_mod_modifier', () => updateAstralInitiative())

	on('change:initiative_dice_modifier change:edge_toggle change:initiative_dice_temp change:initiative_dice_temp_flag', () => updateInitiativeDice())

	on('change:astral_dice_modifier change:edge_toggle', () => updateAstralInitiativeDice())

	on('change:host_rating change:data_processing change:pilot change:intuition change:matrix_mod_modifier change:level', () => {
		updateMatrixInitiative()
	})

  on('change:matrix_dice_modifier change:edge_toggle change:matrix_mode_toggle', () => updateMatrixInitiativeDice())
  
  on('change:matrix_mode_toggle', () => updateHotSimsBonus())

  on("clicked:cond_reset", () => resetNpcCondition()); 

  sheetAttributes.spellTypes.forEach(type => on(`change:repeating_${type}:dicepool_modifier change:repeating_${type}:specialization`, eventinfo => updateSpellsDicepool(eventinfo)))

  on("change:level", eventinfo => updateSpriteConditionTrack(eventinfo.newValue))

  on("change:host_rating", eventinfo => updateHostAttributes(eventinfo.newValue))

  on("change:default_attribute", eventinfo => updateDefaultAttribute(eventinfo.newValue))
