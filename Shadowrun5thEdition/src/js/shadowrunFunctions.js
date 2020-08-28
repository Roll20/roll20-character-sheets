
const shadowrunFunctions = {
  addRepRow: (repRowID, attributeList) => {
    let weaponAttributeWithRepeatingRow = []
    attributeList.forEach(weaponAttribute => weaponAttributeWithRepeatingRow.push(`${repRowID}_${weaponAttribute}`))
    return weaponAttributeWithRepeatingRow
  },

  attributeFactory: attrs => {
    attrs = shadowrunFunctions.findFlagInKeys(attrs) ? shadowrunFunctions.processTempFlags(attrs) : attrs
    attrs = processingFunctions.parseIntegers(attrs)
    attrs = shadowrunFunctions.calculateBonuses(attrs)
    attrs.total = processingFunctions.sumIntegers(Object.values(attrs))
    attrs.base = attrs.total - attrs.bonus
    return attrs
  },
  conditionFactory: attrs => {
    attrs.attribute = shadowrunFunctions.determineConditionAttribute(attrs)
    attrs.base = shadowrunFunctions.determineConditionBase(attrs.sheet_type, attrs.flag_drone)
    attrs.modifier = attrs[shadowrunFunctions.findModifierInKeys(attrs)]
    Object.keys(attrs).forEach(key => !['attribute', 'base', 'modifier'].includes(key) ? delete attrs[key] : false)
    attrs = processingFunctions.parseIntegers(attrs)
    return attrs
  },

  contructRepeatingWeaponAttributes: (repRowID, type) => {
    const attributeList = shadowrunFunctions.determineWeaponAttributesByType(type)
    const constructedWeaponAttributes = shadowrunFunctions.addRepRow(repRowID, attributeList)
    return constructedWeaponAttributes
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
  calculateConditionTracks: conditionInts => Math.ceil(conditionInts.attribute/2) + conditionInts.base + conditionInts.modifier,
  calculateLimitTotal: attrs => Math.ceil((attrs[0] + attrs[1] + (attrs[2] * 2))/3),
  calculateRunSpeed: (agility, modifier) => (agility * 4) + modifier,
  calculateWalkSpeed:(agility, modifier) => (agility * 2) + modifier,
  calculateWounds: attrs => {
    const divisor  = attrs.low_pain_tolerance === 2 ? attrs.low_pain_tolerance : 3;
    const highPain = attrs.high_pain_tolerance >= 1 ? attrs.high_pain_tolerance : 0;
    let sum = 0;

    ["stun", "physical"].forEach(attr => {
      const damageCompensator = attrs[`damage_compensators_${attr}`] || 0
      let dividend = Math.max(attrs[`${attr}`] - (highPain + damageCompensator), 0)
      sum -= Math.floor(dividend / divisor) || 0
    })
    return sum
  },

  convertSkillSelectToHiddenSkill: skillName => {
    let skill = skillName.toLowerCase()
    skill = skill.includes('group') ? skill.slice(0, -6) : skill
    skill = skill.includes(" ") ? skill.replace(/ /g,"") : skill
    return skill
  },

  determineConditionBase: (type, drone) => drone && drone === 'drone' ? 6 : type === 'vehicle' ? 12 : 8,
  determineConditionAttribute: attrs => attrs.willpower ? attrs.willpower : attrs.body ? attrs.body : attrs.device_rating ? attrs.device_rating : 0,
  determineExplodingEdge: newValue => newValue === `@{edge}` ?  "!" : "",
  determineWeaponAttributesByType: weaponType =>  weaponType === 'range' ? sheetAttributes.rangeAttributes : sheetAttributes.meleeAttributes,

  findFlagInKeys: attrs => Object.keys(attrs).find(key => key.includes('_flag')),
  findModifierInKeys: attrs => Object.keys(attrs).find(key => key.includes('_modifier')),
  
  processTempFlags: attrs => {
    try {
      const tempFlag = shadowrunFunctions.findFlagInKeys(attrs)
      const attrName = tempFlag.split('_temp_flag')[0]
      attrs[`${tempFlag}`] === 'on' ? false : delete attrs[`${attrName}_temp`];
      delete attrs[`${tempFlag}`];
      return attrs
    } catch (error) {
      console.error(error)
    }
  },

  resetRepeatingFieldsPrimaries: (repeatingSection, repRowID) => {
    getSectionIDs(repeatingSection, ids => {
      let attributesWithIDs = [];
      let update = {};
      ids.forEach(id => attributesWithIDs.push(`${repeatingSection}_${id}_primary`))
      attributesWithIDs.forEach(attribute => !attribute.includes(repRowID) ? update[attribute] = 0 : false)
      setAttrs(update);
    })
  },

  shotsFired: (shots, trigger) => shots > 0 && trigger.includes('remove') ? shots -= 1 : trigger.includes('add') ? shots += 1 : shots,
  
  //Reset will remove data in Primary entries on Core tab
  resetPrimaryArmor: () => {
    const resetPrimary = new PrimaryArmor()
    let update = {}
    for (let [key, value] of Object.entries(resetPrimary)) {
      update[key] = value
    }
    return update
  },
  resetPrimaryWeapon: type => {
    const resetPrimary = type === 'range' ? new PrimaryRangeWeapon(type) : new PrimaryMeleeWeapon(type)
    let update = {}
    for (let [key, value] of Object.entries(resetPrimary)) {
      update[key] = value
    }
    return update
  },

  updateLimitTotal: attrs => {
    attrs.essence ? Math.ceil(attrs.essence) || 0 : false;
    return shadowrunFunctions.calculateLimitTotal(Object.values(attrs))
  },

  //Update Functions take data from one place and applies it to other attributes
  updatePrimaryArmor: attrs => {
    let update = {}

    for (let [key, value] of Object.entries(attrs)) {
      const repRowID = processingFunctions.getReprowid(key)
      if (key.includes('name')) {
        update['armor_name'] = attrs[`${repRowID}_name`]
      } else if (key.includes('rating')) {
        update['armor_rating'] = value
      } else if (key.includes('dicepool_modifier')) {
        update['soak_modifier'] = value
      } else {
        const type = key.split('_')[3]
        update[`${type}_modifier`] = value
      }
    }

    return update
  },
  updatePrimaryWeapons: attrs => {
    let update = {}
    for (let [key, value] of Object.entries(attrs)) {
      const type = processingFunctions.findRepeatingField(key)
      const weaponAttribute = processingFunctions.getReprowAttribute(key)
      const primaryAttributeName = key.includes('weapon') ? `primary_${type}_weapon` : `primary_${type}_weapon_${weaponAttribute}`
      update[primaryAttributeName] = value

      if (key.includes('ammo')) {
        update[`${primaryAttributeName}_max`] = value
      }
    }
    return update
  },
  determineMatrixDice: attrs => {
    const diceCheck = dice => dice >= 5 ? 5 : dice <= 1 ? 1 : dice;

    if (attrs.edge) {
      return 5
    } else if (attrs.mode === 'cold') {
      return diceCheck(3 + attrs.modifer)
    } else {
      //Hot Sims is the default
      return diceCheck(4 + attrs.modifer)
    }
  }
}

