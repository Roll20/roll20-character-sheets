const sheetAttribues = {
	"attributes": ["body", "agility", "reaction", "strength", "willpower", "logic", "intuition", "charisma", "edge"],
	"translationsAttributes": ["attribute", "body", "agility", "reaction", "strength", "willpower", "logic", "intuition", "charisma", "edge", "none"],
	"calculatedAttributes": ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition','charisma','magic', 'resonance'],
	"repeating": ["quality", "martial", "items", "range", "melee", "armor", "spell", "preps", "ritual", "powers", "forms", "vehicle", "augementations", "lifestyle", "contacts", "programs"],
	"repeatingSkills": ["active", "knowledge", "language"],
	"tabs": [`core`, `arms`, `augs`, `gear`, `magic`, `matrix`, `social`, `vehicle`, `options`],
	"woundCalculation": ["high_pain_tolerance", "low_pain_tolerance", "damage_compensators_physical", "damage_compensators_stun", "stun", "physical"],
	"mentalLimits": ["intuition", "willpower", "logic"],
	"physicalLimits": ["body", "reaction", "strength"],
	"socialLimits": ["essence", "willpower", "charisma"],
}

const errorMessage = error => console.error(`%c ${error}`, "color: orange; font-weight:14px; font-weight:bold;");
const warningMessage = error => console.warn(`%c ${error}`, "color: yellow; font-weight:14px; font-weight:bold;");

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
    buildDisplay: (base, bonus) => bonus === 0 ? base : `${base} (${base + bonus})`,
    calculateBonuses: attrs => {
      let bonus = 0
      for (let [key, value] of Object.entries(attrs)) { key.includes('modifier') || key.includes('temp') ? bonus += value : 0 }
      return bonus
    },

    calculateLimitTotal: attrs => Math.ceil((attrs[0] + attrs[1] + (attrs[2] * 2))/3),
    processTempFlags: (attribute, attrs) => {
      try {
        attrs[`${attribute}_temp_flag`] === "on" ? false : delete attrs[`${attribute}_temp`];
        delete attrs[`${attribute}_temp_flag`];
        return attrs
      } catch (error) {
        errorMessage(error)
      }
    },
    shotsFired: (shots, trigger) => shots > 0 && trigger.includes("remove") ? shots -= 1 : trigger.includes("add") ? shots += 1 : shots,
    updateLimitTotal: attrs => {
      attrs.essence ? Math.ceil(attrs.essence) || 0 : false;
      return functions.shadowrun.calculateLimitTotal(Object.values(attrs))
    }
  }
}

//for Mocha Unit Texting
module.exports = functions;

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
      attrs = functions.shadowrun.processTempFlags(attribute, attrs)
      attrs = functions.parseIntegers(attrs)
      const base = attrs[`${attribute}_base`], bonus = functions.shadowrun.calculateBonuses(attrs)
      functions.setAttributes({
        [attribute]: base + bonus,
        [`display_${attribute}`]: functions.shadowrun.buildDisplay(base, bonus)
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

//physical, social, mental
const updateLimits = type => {
  try {
    const limitsAttributes = sheetAttribues[`${type}Limits`];
    let array = [`${type}_limit_modifier`, `${type}_limit_temp`, `${type}_limit_temp_flag`].concat(limitsAttributes);
    getAttrs(array, attrs => {
        attrs = functions.shadowrun.processTempFlags(`${type}_limit`, attrs)
        attrs = functions.parseIntegers(attrs)

        const bonus = functions.shadowrun.calculateBonuses(attrs)
        delete attrs[`${type}_limit_modifier`]
        delete attrs[`${type}_limit_temp`]

        const total = functions.shadowrun.updateLimitTotal(attrs)

        functions.setAttributes({[`${type}_limit`]: total + bonus})
    })
  } catch (error) {
    errorMessage(error)
  }
}


    var update_movement = () => {
      getAttrs(["agility", "walk_modifier", "run_modifier"], (v) => {
        const agi = parseInt(v.agility) || 0, wmod = parseInt(v.walk_modifier) || 0, rmod = parseInt(v.run_modifier) || 0;
        let update = {};
        update["walk"] = (agi * 2) + wmod;
        update["run"] = (agi * 4) + rmod;
        setAttrs(update);
      });
    };