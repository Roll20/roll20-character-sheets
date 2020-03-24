  //Edge toggle to include ! for exploding dice
  const edgeToggle = eventinfo => {
    processingFunctions.setAttributes({
      explode_toggle: eventinfo.newValue != 0 ? "!" : ""
    })
  }

const updateHostAttributes = newValue => {
  newValue = processingFunctions.parseInteger(newValue)
  processingFunctions.setAttributes({
    matrix_max: 8 + Math.ceil(newValue/2),
    ic_attack: Math.min(newValue + newValue)
  })
}

const updateSpriteConditionTrack = newValue => {
  newValue = processingFunctions.parseInteger(newValue)
  processingFunctions.setAttributes({
    matrix_max: 8 + Math.ceil(newValue/2)
  })
}

//ALSO COVER COMPLEX FORMS
const updateSpellsDicepool = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  getAttrs([`${repRowID}_specialization`, `${repRowID}_dicepool_modifier`], attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    processingFunctions.setAttributes({
      [`${repRowID}_dicepool`]: processingFunctions.sumIntegers(Object.values(attrs))
    })
  })
}

const resetNpcCondition = () => setAttributes({physical: 0, stun: 0, matrix: 0})

const updatePrimaryWeapon = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  getAttrs([`${repRowID}_primary`], attrs => {
    if (attrs[`${repRowID}_primary`] === 'primary') {
      let update = processingFunctions.shadowrun.updatePrimaryWeapons({[eventinfo.triggerName]: eventinfo.newValue})
      processingFunctions.setAttributes(update)
    }
  })
}

const updateRepeatingWeaponPrimary = (eventinfo, type) => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  if (eventinfo.newValue === 'primary') {
    const constructedWeaponAttributes = processingFunctions.shadowrun.contructRepeatingWeaponAttributes(repRowID, type)
    getAttrs(constructedWeaponAttributes, attrs => { 
      const update = processingFunctions.shadowrun.updatePrimaryWeapons(attrs)
      processingFunctions.setAttributes(update)
    })
    processingFunctions.shadowrun.resetRepeatingFieldsPrimaries(`repeating_${type}`, repRowID)
  } else {
    const update = processingFunctions.shadowrun.resetPrimaryWeapon(type)
    processingFunctions.setAttributes(update)
  }
}

const updateRepeatingWeaponDicepool = trigger => {
  const repRowID = processingFunctions.getReprowid(trigger)
  getAttrs([`${repRowID}_dicepool_modifier`, `${repRowID}_specialization`], attrs => {   
    attrs = processingFunctions.parseIntegers(attrs)
    processingFunctions.setAttributes({
      [`${repRowID}_dicepool`]: processingFunctions.sumIntegers(Object.values(attrs))
    })
  })
}

const updateRepeatingSkillDicepool = eventinfo => {
   const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
    getAttrs([`${repRowID}_skill`], attrs => {
      let skill = processingFunctions.shadowrun.convertSkillSelectToHiddenSkill(attrs[`${repRowID}_skill`])
      processingFunctions.setAttributes({
        [`${skill}`]: eventinfo.newValue
      })
    })
}

const updateRepeatingSkillLimit = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  if (eventinfo.newValue === "none") {
    processingFunctions.setAttributes({[`${repRowID}_display_limit`]: ' '})
  } else {
    const translationKey = processingFunctions.sliceAttr(eventinfo.newValue)
    const translation = getTranslationByKey(translationKey);
    getAttrs([translationKey], attrs => {
      const limitDisplay = `${translation} ${attrs[translationKey]}`
      processingFunctions.setAttributes({[`${repRowID}_display_limit`]: limitDisplay})
    })
  }
}

const updateRepeatingSkillName = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  const translationKey = eventinfo.newValue.replace(/ /g, '').toLowerCase()
  console.log(translationKey)
  const translation = getTranslationByKey(translationKey);
  processingFunctions.setAttributes({
    [`${repRowID}_display_skill`]: translation
  })
}

const updateRepeatingSkillAttribute = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  const translationKey = processingFunctions.sliceAttr(eventinfo.newValue)
  const translation = getTranslationByKey(translationKey);
  processingFunctions.setAttributes({
    [`${repRowID}_display_attribute`]: translation
  })
}

const updateRepeatingSkillRating = trigger => {
  const repRowID = processingFunctions.getReprowid(trigger)
  getAttrs([`${repRowID}_rating`, `${repRowID}_rating_modifier`], attrs => {   
    attrs = processingFunctions.shadowrun.attributeFactory(attrs)
    processingFunctions.setAttributes({
      [`${repRowID}_dicepool`]: attrs.total,
      [`${repRowID}_display_rating`]: processingFunctions.shadowrun.buildDisplay(attrs.base, attrs.bonus)
    })
  })
}

const updateWounds = () => {
  getAttrs(sheetAttributes.woundCalculation, attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    const sum = processingFunctions.shadowrun.calculateWounds(attrs)
    processingFunctions.setAttributes({wounds: sum})
  })
}

const updateConditionTracks= conditionTrack => {
  getAttrs(sheetAttributes[conditionTrack], attrs => {
    attrs = processingFunctions.shadowrun.conditionFactory(attrs)
    const conditionTotal = processingFunctions.shadowrun.calculateConditionTracks(attrs)
    processingFunctions.setAttributes({[`${conditionTrack}_max`]: conditionTotal}, true)
  })
}

const translations = () => {
  const attributes = sheetAttributes.translationsAttributes
  const translations = processingFunctions.getTranslations(attributes)
  let attribute_roll = `?{${translations.attribute}`
  delete translations.attribute
  for (let [key, value] of Object.entries(translations)) {
      attribute_roll += key !== 'none' ? `|${value},@{${key}}` : `|${value},0}`
  }
  processingFunctions.setAttributes({attribute_roll: attribute_roll})
} 

const updateShotsFired = trigger => {
  getAttrs([`shots_fired`], attrs => {   
    attrs = processingFunctions.parseIntegers(attrs)
    const shots = processingFunctions.shadowrun.shotsFired(attrs.shots_fired, trigger)
    processingFunctions.setAttributes({shots_fired: shots})
  });
}

const updateAmmoWithShotsFired = () => {
  getAttrs([`primary_range_weapon_ammo`, `shots_fired`], attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    attrs.shots_fired = processingFunctions.convertIntegerNegative(attrs.shots_fired)
    processingFunctions.setAttributes({primary_range_weapon_ammo: processingFunctions.sumIntegers(Object.values(attrs))})
  });
}

const updateAmmoWithMax = () => {
  getAttrs([`primary_range_weapon_ammo_max`], attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    processingFunctions.setAttributes({primary_range_weapon_ammo: attrs.primary_range_weapon_ammo_max})
  });
}

const updateTab = attr => processingFunctions.setAttributes({tab: attr})

const updateAttributes = (array, attribute) => {
  getAttrs(array, attrs => {
    attrs = processingFunctions.shadowrun.attributeFactory(attrs)
    processingFunctions.setAttributes({
      [attribute]: attrs.total,
      [`display_${attribute}`]: attrs.base === attrs.total ? attrs.base : `${attrs.base} (${attrs.total})`
    })
  })
}

const updateLimitTotal = attrs => {
  attrs.essence ? Math.ceil(attrs.essence) || 0 : false;
  return processingFunctions.shadowrun.calculateLimitTotal(Object.values(attrs))
}

const updateLimits = attributeLimit => {
  const array = sheetAttributes[attributeLimit].concat([`${attributeLimit}_modifier`, `${attributeLimit}_temp`, `${attributeLimit}_temp_flag`])
  getAttrs(array, attrs => {
      attrs = processingFunctions.shadowrun.attributeFactory(attrs)
      const bonus = attrs.bonus
      delete attrs.bonus
      const base = processingFunctions.shadowrun.updateLimitTotal(attrs)
      processingFunctions.setAttributes({
        [attributeLimit]: processingFunctions.sumIntegers([base, bonus])
      })
  })
}

const updateMovement = () => {
  getAttrs(['agility', 'walk_modifier', 'run_modifier'], attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    processingFunctions.setAttributes({
      walk: processingFunctions.shadowrun.calculateWalkSpeed(attrs.agility, attrs.walk_modifier),
      run: processingFunctions.shadowrun.calculateRunSpeed(attrs.agility, attrs.run_modifier)
    })
  })
}

const updateDerivedAttribute = derivedAttribute => {
  getAttrs(sheetAttributes[derivedAttribute], attrs => {
    attrs = processingFunctions.shadowrun.attributeFactory(attrs)
    processingFunctions.setAttributes({[derivedAttribute]: attrs.total})
  })
}


