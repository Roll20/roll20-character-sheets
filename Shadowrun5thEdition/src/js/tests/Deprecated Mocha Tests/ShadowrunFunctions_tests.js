const assert = require('assert')
const Functions = require('../js/shadowrunFunctions');

describe('Shadowrun skill selects handling', () => {
  it('convertSkillSelectToHiddenSkill removes " Group" in skill groups ', () => {
    const actual = Functions.convertSkillSelectToHiddenSkill('Firearms Group')
    assert.ok(actual, 'firearms')
  })

  it('convertSkillSelectToHiddenSkill removes all " " in skill groups ', () => {
    const actual = Functions.convertSkillSelectToHiddenSkill('Close Combat Group')
    assert.ok(actual, 'closecombat')
  })
})

describe('Shadowrun shotsFired', () => {
  it('shots_fired attribute are not greater than 0 && trigger "remove" there is no change', () => assert.strictEqual(Functions.shotsFired(-1, "shots_remove"), -1))

  it('trigger was "add" increment shots by 1', () => assert.strictEqual(Functions.shotsFired(5, "shots_add"), 6))
})

describe('Shadowrun calculateBonuses', () => {
  it('return an object with a only a base and bonus key', () => {
    const expected = {strength: 20, bonus: 5}
    const actual = Functions.calculateBonuses({strength: 20, strength_modifier: 2, strength_temp: 3})
    assert.deepStrictEqual(actual, expected)
  })

  it('add the value if the key contains "modifier" || "temp"', () => {
    const expected = 5;
    const actual = Functions.calculateBonuses({strength: 20, strength_modifier: 2, strength_temp: 3})
    assert.strictEqual(actual.bonus, expected)
  })
})

describe('Shadowrun processTempFlags', () => {
  it('removes the flag property', () => {
    const expected = {reaction_base: 1, reaction_modifier: 2, reaction_temp: 0}
    const actual = Functions.processTempFlags({reaction_base: 1, reaction_modifier: 2, reaction_temp: 0, reaction_temp_flag: "on"})
    assert.deepStrictEqual(actual, expected)
  })

  it('removes temp if flag is not "on"', () => {
    const expected = {reaction_base: 1, reaction_modifier: 2}
    const actual = Functions.processTempFlags({reaction_base: 1, reaction_modifier: 2, reaction_temp: 10, reaction_temp_flag: "off"})
    assert.deepStrictEqual(actual, expected)
  })

  it('returns attribute name by splitting the flag', () => {
    const actual = Functions.processTempFlags({physical_limit_temp_flag: "off"})
    assert.ok(actual, "physical_limit")
  })
})

describe('Shadowrun buildDisplay', () => {
  it('returns the only base if bonus is 0', () => assert.strictEqual(Functions.buildDisplay(5, 0), 5))
  it('returns a string of "base (base+bonus)"', () => assert.ok(Functions.buildDisplay(5, 1), '5 (6)'))
})

describe('Shadowrun calculateLimitTotal', () => {
  it('calculates total of (z + y (x * 2))/3', () => assert.strictEqual(Functions.calculateLimitTotal([1, 3, 4]), 4))
})

describe('Shadowrun calculate walk & run', () => {
  it('walk speed is agility * 2 then add modifier', () => assert.strictEqual(Functions.calculateWalkSpeed(2, 20), 24))

  it('run speed is agility * 4 then add modifier', () => assert.strictEqual(Functions.calculateRunSpeed(2, 20), 28))
})

describe('Shadowrun findFlagInKeys', () => {
  it('searchs an array of keys for any containing "_flag"', () => {
    const actual = Functions.findFlagInKeys({body: "5", soak_modifier: "6", soak_temp_flag: 'on'})
    assert.ok(actual, "soak_temp_flag")
  })
})

describe('Shadowrun findModifierInKeys', () => {
  it('searchs an array of keys for any containing modifier', () => {
    const actual = Functions.findModifierInKeys({body: "5", soak_modifier: "6", soak_temp_flag: 'on'})
    assert.ok(actual, "soak_modifier")
  })
})

describe('Shadowrun condition factory', () => {
  it('should return an object', () => {
    const actual = Functions.conditionFactory({})
    assert.ok(actual, 'object')
  })

  it('should contain an attribute key', () => {
    const actual = Functions.conditionFactory({body: 3})
    assert.ok(actual.attribute, true) 
  })

  it('should return attribute key with the value of willpower', () => {
    const actual = Functions.conditionFactory({body: 3, willpower: 5})
    assert.strictEqual(actual.attribute, 5) 
  })

  it('should return base key', () => {
    const actual = Functions.conditionFactory({})
    assert.ok(actual.base, true) 
  })

  it('should return modifier key', () => {
    const actual = Functions.conditionFactory({stun_modifier: 6})
    assert.ok(actual.modifier, true) 
  })

  it('should convert the attrs object into condition object', () => {
    const expected = {modifier: 7, attribute: 10, base: 8}
    const actual = Functions.conditionFactory({stun_modifier: 7, willpower: 10})
    assert.deepStrictEqual(actual, expected)
  })
})

describe('Shadowrun calculate condition tracks', () => {
  it('divide attribute by 2 then add base and modiifer', () => {
    const actual = Functions.calculateConditionTracks({attribute: 3, base: 8, modifier: 2})
    assert.strictEqual(actual, 12)
  })
})

describe('Shadowrun determine condition base', () => {
  it('default base is 8', () => {
    const actual = Functions.determineConditionBase()
    assert.strictEqual(actual, 8)
  })

  it('sheet is a vehicle and is a drone return 10', () => {
    const actual = Functions.determineConditionBase('vehicle', 'drone')
    assert.strictEqual(actual, 6)
  })

  it('sheet is a vehicle but not a drone return 10', () => {
    const actual = Functions.determineConditionBase('vehicle')
    assert.strictEqual(actual, 12)
  })
})

describe('Shadowrun determine condition attribute', () => {
  it('default attribute should be 0', () => {
    const actual = Functions.determineConditionAttribute({})
    assert.strictEqual(actual, 0)
  })

  it('stun will return willpower attribute', () => {
    const actual = Functions.determineConditionAttribute({willpower: 8}, 'stun')
    assert.strictEqual(actual, 8)
  })

  it('physical will return body attribute', () => {
    const actual = Functions.determineConditionAttribute({body: 18}, 'physical')
    assert.strictEqual(actual, 18)
  })

  it('matrix will return device rating attribute', () => {
    const actual = Functions.determineConditionAttribute({device_rating: 5}, 'matrix')
    assert.strictEqual(actual, 5)
  })
})

describe('Shadowrun calculate wounds', () => {
  it('default is 0', () => {
    const actual = Functions.calculateWounds({})
    assert.strictEqual(actual, 0)
  })

  it('low pain tolerance is false then divide by 3', () => {
    const actual = Functions.calculateWounds({physical: 6})
    assert.strictEqual(actual, -2)
  })

  it('low pain tolerance is equal 2 then divide by 2', () => {
    const actual = Functions.calculateWounds({low_pain_tolerance: 2, physical: 6})
    assert.strictEqual(actual, -3)
  })

  it('add physical & stun wounds together', () => {
    const actual = Functions.calculateWounds({physical: 6, stun: 9})
    assert.strictEqual(actual, -5)
  })

  it('high pain tolerance should subtract from the divisor', () => {
    const actual = Functions.calculateWounds({high_pain_tolerance: 2, physical: 6, stun: 9})
    assert.strictEqual(actual, -3)
  })

  it('damage compensator should subtract from its type', () => {
    const actual = Functions.calculateWounds({physical: 6, stun: 9, damage_compensators_physical: 3})
    assert.strictEqual(actual, -4)
  })

  it('damage compensator and high paintolerance stack', () => {
    const actual = Functions.calculateWounds({high_pain_tolerance: 2, physical: 6, damage_compensators_physical: 3})
    assert.strictEqual(actual, 0)
  })

  it('minimum of 0', () => {
    const actual = Functions.calculateWounds({physical: 6, damage_compensators_physical: 13})
    assert.strictEqual(actual, 0)
  })
})

describe('Shadowrun attribute factory', () => {
  it('should return an object', () => {
    const actual = Functions.attributeFactory({})
    assert.ok(actual, 'object')
  })

  it('should remove temp keys if flag is "on" and return bonus with temp value', () => {
    const actual = Functions.attributeFactory({reaction_temp: 123, reaction_temp_flag: "on"})
    assert.deepStrictEqual(actual, {total: 123, base: 0, bonus: 123})
  })

  it('should return base values', () => {
    const actual = Functions.attributeFactory({intuition: 1, reaction: 3})
    assert.deepStrictEqual(actual.base, 4)
  })

  it('should return modifier + temp as bonus if flag is "on"', () => {
    const actual = Functions.attributeFactory({reaction_modifier: 20, reaction_temp: 1, reaction_temp_flag: "on"})
    assert.equal(actual.total, 21)
  })

  it('should return total values', () => {
    const actual = Functions.attributeFactory({intuition: 1, reaction: 3, initiative_modifier: 6, initiative_temp: 10, initiative_temp_flag: 'on'})
    assert.deepStrictEqual(actual.base, 4)
  })
})

describe('Shadowrun addRepRow', () => {
  it('Shadowrun should return an array', () => {
    const actual = Functions.addRepRow('repeating_range_-m1czg68yzicwhfdpyys', ['ammo'])
    assert.ok(typeof actual, 'array')
  })

  it('Shadowrun should entries with the reprowid added to the attribute name', () => {
    const actual = Functions.addRepRow('repeating_range_-m1czg68yzicwhfdpyys', ['ammo'])
    assert.ok(actual, ['repeating_range_-m1czg68yzicwhfdpyys_ammo'])
  })
})

describe('Shadowrun updatePrimaryWeapons', () => {
  it('should return an object', () => {
    const actual = Functions.updatePrimaryWeapons({})
    assert.ok(typeof actual, 'object')
  })

  it('should return weapon with the string in weapon from the attrs', () => {
    const actual = Functions.updatePrimaryWeapons({"repeating_range_-m2wiegzcjb0w5vewbnj_weapon": "Test Name"})
    assert.ok(actual.primary_range_weapon, 'Test Name')
  })

  it('all other attributes should add weapon before the descritive attribute name', () => {
    const actual = Functions.updatePrimaryWeapons({"repeating_melee_-m2wiegzcjb0w5vewbnj_dicepool": 12})
    assert.deepStrictEqual(actual, {"primary_melee_weapon_dicepool":12})
  })

  it('if ammo is the key then ammo_maxs should also be in update', () => {
    const actual = Functions.updatePrimaryWeapons({"repeating_range_-m2wiegzcjb0w5vewbnj_ammo": 12})
    assert.deepStrictEqual(actual, {"primary_range_weapon_ammo": 12, "primary_range_weapon_ammo_max": 12})
  })
})


describe('Shadowrun determineExplodingEdge', () => {
  it('should return "!" if newValue is @{edge}', () => {
    const actual = Functions.determineExplodingEdge('@{edge}')
    assert.ok(actual, "!")
  })

  it('should return nothing if newValue is not @{edge}', () => {
    const actual = Functions.determineExplodingEdge('8')
    assert.ok(!actual, "!")
  })
})