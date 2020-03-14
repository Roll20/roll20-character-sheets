const sheetAttribues = {
	attributes: ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition', 'charisma', 'edge'],
	translationsAttributes: ['attribute', 'body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition', 'charisma', 'edge', 'none'],
	calculatedAttributes: ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition','charisma','magic', 'resonance'],
	repeating: ['quality', 'martial', 'items', 'range', 'melee', 'armor', 'spell', 'preps', 'ritual', 'powers', 'forms', 'vehicle', 'augementations', 'lifestyle', 'contacts', 'programs'],
	repeatingSkills: ['active', 'knowledge', 'language'],
  tabs: [`core`, `arms`, `augs`, `gear`, `magic`, `matrix`, `social`, `vehicle`, `options`],
	woundCalculation: ['high_pain_tolerance', 'low_pain_tolerance', 'damage_compensators_physical', 'damage_compensators_stun', 'stun', 'physical'],
  attributeLimits: ['mental_limit', 'physical_limit', 'social_limit'],
	mental_limit: ['intuition', 'willpower', 'logic'],
	physical_limit: ['body', 'reaction', 'strength'],
	social_limit: ['essence', 'willpower', 'charisma'],
  lift_carry: ['body', 'strength', 'lift_carry_modifier'],
  overflow: ['body', 'overflow_modifier'],
  soak: ['body', 'armor_rating', 'soak_modifier', 'soak_temp', `soak_temp_flag`],
  defense: ['reaction', 'intuition', 'defense_modifier', 'defense_temp', `defense_temp_flag`],
  judge_intentions: ['charisma', 'intuition', 'judge_intentions_modifier'],
  composure: ['charisma', 'willpower', 'composure_modifier'],
  memory: ['logic', 'willpower', 'memory_modifier'],
  conditionTracks: ['stun', 'physical'],
  physical: ['physical_modifier', 'body', 'sheet_type', 'flag_drone'],
  stun: ['stun_modifier', 'willpower'],
  derivedAttributes: ['memory', 'composure', 'defense', 'soak', 'overflow', 'judge_intentions', 'lift_carry']
}

const errorMessage = error => console.error(`%c ${error}`, 'color: maroon; font-weight:14px; font-weight:bold;');
const warningMessage = error => console.warn(`%c ${error}`, 'color: darkorange; font-weight:14px; font-weight:bold;');

const functions = {
  convertIntegerNegative: number => number > 0 ? -Math.abs(number) : number,
	convertIntegersNegatives: numbers => {
		for (let [key, value] of Object.entries(numbers)) {
			numbers[key] = functions.convertIntegerNegative(value);
		}
		return numbers
	},
  //Roll20 does not allow for Promises
  //getAttributes: array => new Promise((resolve, reject) => array ? getAttrs(array, v => resolve(v)) : reject(errorMessage('Function failed'))),
	getReprowid: trigger => {
		const split = trigger.split('_');
		return `${split[0]}_${split[1]}_${split[2]}`
	},
  getTranslations: translationKeys => {
    let translations = {}
    translationKeys.forEach(key => translations[`${key}`] = getTranslationByKey(key))
    return translations
  },
  parseInteger: string => parseInt(string) || 0,
	parseIntegers: numbers => {
		for (let [key, value] of Object.entries(numbers)) {
		    numbers[key] = parseInt(value) || 0;
		}
		return numbers	
	},
  setAttributes: (update, silent) => silent && typeof update === 'object' ? setAttrs(update, {silent:true}) : typeof update === 'object' ? setAttrs(update) : errorMessage(`${update} is not an object`),
	sumIntegers: numbers => numbers.reduce((a,b) => a + b, 0),

  shadowrun: {
    attributeFactory: attrs => {
      attrs = functions.shadowrun.findFlagInKeys(attrs) ? functions.shadowrun.processTempFlags(attrs) : attrs
      attrs = functions.parseIntegers(attrs)
      attrs = functions.shadowrun.calculateBonuses(attrs)
      return attrs
    },
    buildDisplay: (base, bonus) => bonus === 0 ? base : `${base} (${base + bonus})`,
    calculateBonuses: attrs => {
      attrs.bonus = 0
      for (let [key, value] of Object.entries(attrs)) { 
        if (key.includes('modifier') || key.includes('temp')) {
          attrs.bonus += value
          delete attrs[key]
        }
      }
      return attrs
    },
    calculateConditionTracks: attrs => Math.ceil(attrs.attribute/2) + attrs.base + attrs.modifier,
    calculateLimitTotal: attrs => Math.ceil((attrs[0] + attrs[1] + (attrs[2] * 2))/3),
    calculateRunSpeed: (agility, modifier) => (agility * 4) + modifier,
    calculateWalkSpeed:(agility, modifier) => (agility * 2) + modifier,
    findFlagInKeys: attrs => Object.keys(attrs).find(key => key.includes('_flag')),
    processTempFlags: attrs => {
      try {
        const tempFlag = functions.shadowrun.findFlagInKeys(attrs)
        const attrName = tempFlag.split('_temp_flag')[0]
        attrs[`${tempFlag}`] === 'on' ? false : delete attrs[`${attrName}_temp`];
        delete attrs[`${tempFlag}`];
        return attrs
      } catch (error) {
        errorMessage(error)
      }
    },
    shotsFired: (shots, trigger) => shots > 0 && trigger.includes('remove') ? shots -= 1 : trigger.includes('add') ? shots += 1 : shots,
    updateLimitTotal: attrs => {
      attrs.essence ? Math.ceil(attrs.essence) || 0 : false;
      return functions.shadowrun.calculateLimitTotal(Object.values(attrs))
    }
  }
}

//for Mocha Unit Texting
//module.exports = functions;

const translations = () => {
  try {
    const attributes = sheetAttribues.translationsAttributes
    const translations = functions.getTranslations(attributes)
    let attribute_roll = `?{${translations.attribute}`
    delete translations.attribute
    for (let [key, value] of Object.entries(translations)) {
        attribute_roll += key !== 'none' ? `|${value},@{${key}}` : `|${value},0}`
    }
    functions.setAttributes({attribute_roll: attribute_roll})
  } catch (error) {
    errorMessage(error)
  }
} 

const updateShotsFired = trigger => {
  try {
    getAttrs([`shots_fired`], attrs => {   
      attrs = functions.parseIntegers(attrs)
      const shots = functions.shadowrun.shotsFired(attrs.shots_fired, trigger)
      functions.setAttributes({shots_fired: shots})
    });
  } catch (error) {
    errorMessage(error)
  }
}

const updateAmmoWithShotsFired = () => {
  try {
    getAttrs([`primary_range_weapon_ammo`, `shots_fired`], attrs => {
      attrs = functions.parseIntegers(attrs)
      attrs.shots_fired = functions.convertIntegerNegative(attrs.shots_fired)
      functions.setAttributes({primary_range_weapon_ammo: functions.sumIntegers(Object.values(attrs))})
    });
  } catch (error) {
    errorMessage(error)
  }
}

const updateAmmoWithMax = () => {
  try {
    getAttrs([`primary_range_weapon_ammo_max`], attrs => {
      attrs = functions.parseIntegers(attrs)
      functions.setAttributes({primary_range_weapon_ammo: attrs.primary_range_weapon_ammo_max})
    });
  } catch (error) {
    errorMessage(error)
  }
}

const updateTab = attr => functions.setAttributes({tab: attr})

const updateAttributes = (array, attribute) => {
  try {
    getAttrs(array, attrs => {
      attrs = functions.shadowrun.attributeFactory(attrs)
      const base = attrs[`${attribute}_base`]
      functions.setAttributes({
        [attribute]: functions.sumIntegers([base, attrs.bonus]),
        [`display_${attribute}`]: functions.shadowrun.buildDisplay(base, attrs.bonus)
      })
    })
  } catch (error) {
    errorMessage(error)
  }
}

const updateLimitTotal = attrs => {
  attrs.essence ? Math.ceil(attrs.essence) || 0 : false;
  return functions.shadowrun.calculateLimitTotal(Object.values(attrs))
}

const updateLimits = attributeLimit => {
  try {
    const array = sheetAttribues[attributeLimit].concat([`${attributeLimit}_modifier`, `${attributeLimit}_temp`, `${attributeLimit}_temp_flag`])
    getAttrs(array, attrs => {
        attrs = functions.shadowrun.attributeFactory(attrs)
        const bonus = attrs.bonus
        delete attrs.bonus
        const base = functions.shadowrun.updateLimitTotal(attrs)
        functions.setAttributes({
          [attributeLimit]: functions.sumIntegers([base, bonus])
        })
    })
  } catch (error) {
    errorMessage(error)
  }
}

const updateMovement = () => {
  try {
    getAttrs(['agility', 'walk_modifier', 'run_modifier'], attrs => {
      attrs = functions.parseIntegers(attrs)
      functions.setAttributes({
        walk: functions.shadowrun.calculateWalkSpeed(attrs.agility, attrs.walk_modifier),
        run: functions.shadowrun.calculateRunSpeed(attrs.agility, attrs.run_modifier)
      })
    })
  } catch (error) {
     errorMessage(error)
  }
}

const updateDerivedAttribute = derivedAttribute => {
  try {
    getAttrs(sheetAttribues[derivedAttribute], attrs => {
      attrs = functions.shadowrun.attributeFactory(attrs)
      const sum = functions.sumIntegers(Object.values(attrs))
      functions.setAttributes({[derivedAttribute]: sum})
    })
  } catch (error) {
    errorMessage(error)
  }
}

const updateConditionTracks = derivedAttribute => {
  try {
    getAttrs(sheetAttribues[derivedAttribute], attrs => {
      attrs = functions.shadowrun.attributeFactory(attrs)
    })
  } catch (error) {
    errorMessage(error)
  }
}

