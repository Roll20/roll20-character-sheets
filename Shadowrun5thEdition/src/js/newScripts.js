

const updateWounds = () => {
  try {
    getAttrs(sheetAttribues.woundCalculation, attrs => {
      attrs = processingFunctions.parseIntegers(attrs)
      const sum = processingFunctions.shadowrun.calculateWounds(attrs)
      processingFunctions.setAttributes({wounds: sum})
    })
  } catch (error) {
    console.log(error)
  }
}

const updateConditionTracks= conditionTrack => {
  try {
    getAttrs(sheetAttribues[conditionTrack], attrs => {
      attrs = processingFunctions.shadowrun.conditionFactor(attrs)
      const conditionTotal = processingFunctions.shadowrun.calculateConditionTracks(attrs)
      processingFunctions.setAttributes({[`${conditionTrack}_max`]: conditionTotal}, true)
    })
  } catch (error) {
    console.log(error)
  }
}

const translations = () => {
  try {
    const attributes = sheetAttribues.translationsAttributes
    const translations = processingFunctions.getTranslations(attributes)
    let attribute_roll = `?{${translations.attribute}`
    delete translations.attribute
    for (let [key, value] of Object.entries(translations)) {
        attribute_roll += key !== 'none' ? `|${value},@{${key}}` : `|${value},0}`
    }
    processingFunctions.setAttributes({attribute_roll: attribute_roll})
  } catch (error) {
    console.log(error)
  }
} 

const updateShotsFired = trigger => {
  try {
    getAttrs([`shots_fired`], attrs => {   
      attrs = processingFunctions.parseIntegers(attrs)
      const shots = processingFunctions.shadowrun.shotsFired(attrs.shots_fired, trigger)
      processingFunctions.setAttributes({shots_fired: shots})
    });
  } catch (error) {
    console.log(error)
  }
}

const updateAmmoWithShotsFired = () => {
  try {
    getAttrs([`primary_range_weapon_ammo`, `shots_fired`], attrs => {
      attrs = processingFunctions.parseIntegers(attrs)
      attrs.shots_fired = processingFunctions.convertIntegerNegative(attrs.shots_fired)
      processingFunctions.setAttributes({primary_range_weapon_ammo: processingFunctions.sumIntegers(Object.values(attrs))})
    });
  } catch (error) {
    console.log(error)
  }
}

const updateAmmoWithMax = () => {
  try {
    getAttrs([`primary_range_weapon_ammo_max`], attrs => {
      attrs = processingFunctions.parseIntegers(attrs)
      processingFunctions.setAttributes({primary_range_weapon_ammo: attrs.primary_range_weapon_ammo_max})
    });
  } catch (error) {
    console.log(error)
  }
}

const updateTab = attr => processingFunctions.setAttributes({tab: attr})

const updateAttributes = (array, attribute) => {
  try {
    getAttrs(array, attrs => {
      attrs = processingFunctions.shadowrun.attributeFactory(attrs)
      const base = attrs[`${attribute}_base`]
      processingFunctions.setAttributes({
        [attribute]: processingFunctions.sumIntegers([base, attrs.bonus]),
        [`display_${attribute}`]: processingFunctions.shadowrun.buildDisplay(base, attrs.bonus)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const updateLimitTotal = attrs => {
  attrs.essence ? Math.ceil(attrs.essence) || 0 : false;
  return processingFunctions.shadowrun.calculateLimitTotal(Object.values(attrs))
}

const updateLimits = attributeLimit => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

const updateMovement = () => {
  try {
    getAttrs(['agility', 'walk_modifier', 'run_modifier'], attrs => {
      attrs = processingFunctions.parseIntegers(attrs)
      processingFunctions.setAttributes({
        walk: processingFunctions.shadowrun.calculateWalkSpeed(attrs.agility, attrs.walk_modifier),
        run: processingFunctions.shadowrun.calculateRunSpeed(attrs.agility, attrs.run_modifier)
      })
    })
  } catch (error) {
     console.log(error)
  }
}

const updateDerivedAttribute = derivedAttribute => {
  try {
    getAttrs(sheetAttribues[derivedAttribute], attrs => {
      attrs = processingFunctions.shadowrun.attributeFactory(attrs)
      const sum = processingFunctions.sumIntegers(Object.values(attrs))
      processingFunctions.setAttributes({[derivedAttribute]: sum})
    })
  } catch (error) {
    console.log(error)
  }
}

//for Mocha Unit Texting
//module.exports = updateFunctions;

