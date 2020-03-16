const updateRepeatingWeaponDicepool = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  
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
  });
}

const updateWounds = () => {
  getAttrs(sheetAttribues.woundCalculation, attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    const sum = processingFunctions.shadowrun.calculateWounds(attrs)
    processingFunctions.setAttributes({wounds: sum})
  })
}

const updateConditionTracks= conditionTrack => {
  getAttrs(sheetAttribues[conditionTrack], attrs => {
    attrs = processingFunctions.shadowrun.conditionFactor(attrs)
    const conditionTotal = processingFunctions.shadowrun.calculateConditionTracks(attrs)
    processingFunctions.setAttributes({[`${conditionTrack}_max`]: conditionTotal}, true)
  })
}

const translations = () => {
  const attributes = sheetAttribues.translationsAttributes
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
      [`display_${attribute}`]: attrs.base === attrs.total ? attrs.base : `${attrs.base} (${attrs.total}}`
    })
  })
}

const updateLimitTotal = attrs => {
  attrs.essence ? Math.ceil(attrs.essence) || 0 : false;
  return processingFunctions.shadowrun.calculateLimitTotal(Object.values(attrs))
}

const updateLimits = attributeLimit => {
  const array = sheetAttribues[attributeLimit].concat([`${attributeLimit}_modifier`, `${attributeLimit}_temp`, `${attributeLimit}_temp_flag`])
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
  getAttrs(sheetAttribues[derivedAttribute], attrs => {
    attrs = processingFunctions.shadowrun.attributeFactory(attrs)
    const sum = processingFunctions.sumIntegers(Object.values(attrs))
    processingFunctions.setAttributes({[derivedAttribute]: sum})
  })
}

//for Mocha Unit Texting
//module.exports = updateFunctions;

