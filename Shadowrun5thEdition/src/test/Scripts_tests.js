const assert = require('assert')
const Functions = require('../js/newScripts');

describe('Roll20', () => {
  it('setAttributes returns error if update is not an object', () => assert.ifError(Functions.setAttributes(6)))
})

describe('Helper functions', () => {
	it('parseIntegers returns a number', () => {
		const actual = Functions.parseIntegers({newValue: '6'})
		assert.ok(actual.newValue, 'number')
	})

	it('sumIntegers adds an array of numbers together', () => assert.strictEqual(Functions.sumIntegers([5, 10, 20]), 35))

	it('convertInteger converts a string to number', () => assert.strictEqual(typeof Functions.parseInteger('6'), 'number'))

	it('getReprowid splits triggerName to get the repeating row id', () => {
		const expected = 'repeating_advancement_-m1czg68yzicwhfdpyys'
		const actual = Functions.getReprowid('repeating_advancement_-m1czg68yzicwhfdpyys_earned_xp')
		assert.strictEqual(actual, expected)
	})

  it('convertIntegerNegative turns positive integar into negative', () => assert.strictEqual(Functions.convertIntegerNegative(6), -6))
})

describe('Shadowrun shotsFired', () => {
  it('shots_fired attribute are not greater than 0 && trigger "remove" there is no change', () => assert.strictEqual(Functions.shadowrun.shotsFired(-1, "shots_remove"), -1))

  it('trigger was "add" increment shots by 1', () => assert.strictEqual(Functions.shadowrun.shotsFired(5, "shots_add"), 6))
})

describe('Shadowrun calculateBonuses', () => {
  it('return an object with a only a base and bonus key', () => {
    const expected = {strength: 20, bonus: 5}
    const actual = Functions.shadowrun.calculateBonuses({strength: 20, strength_modifier: 2, strength_temp: 3})
    assert.deepStrictEqual(actual, expected)
  })

  it('add the value if the key contains "modifier" || "temp"', () => {
    const expected = 5;
    const actual = Functions.shadowrun.calculateBonuses({strength: 20, strength_modifier: 2, strength_temp: 3})
    assert.strictEqual(actual.bonus, expected)
  })
})

describe('Shadowrun processTempFlags', () => {
    it('removes the flag property', () => {
    const expected = {reaction_base: 1, reaction_modifier: 2, reaction_temp: 0}
    const actual = Functions.shadowrun.processTempFlags({reaction_base: 1, reaction_modifier: 2, reaction_temp: 0, reaction_temp_flag: "on"})
    assert.deepStrictEqual(actual, expected)
  })

  it('removes temp if flag is not "on"', () => {
    const expected = {reaction_base: 1, reaction_modifier: 2}
    const actual = Functions.shadowrun.processTempFlags({reaction_base: 1, reaction_modifier: 2, reaction_temp: 10, reaction_temp_flag: "off"})
    assert.deepStrictEqual(actual, expected)
  })

  it('returns attribute name by splitting the flag', () => {
    const actual = Functions.shadowrun.processTempFlags({physical_limit_temp_flag: "off"})
    assert.ok(actual, "physical_limit")
  })
})

describe('Shadowrun buildDisplay', () => {
  it('returns the only base if bonus is 0', () => assert.strictEqual(Functions.shadowrun.buildDisplay(5, 0), 5))
  it('returns a string of "base (base+bonus)"', () => assert.ok(Functions.shadowrun.buildDisplay(5, 1), '5 (6)'))
})

describe('Shadowrun calculateLimitTotal', () => {
  it('calculates total of (z + y (x * 2))/3', () => assert.strictEqual(Functions.shadowrun.calculateLimitTotal([1, 3, 4]), 4))
})

describe('Shadowrun calculate condition tracks', () => {
  it('divide attribute by 2 then add base and modiifer', () => {
    const expected = 12
    const actual = Functions.shadowrun.calculateConditionTracks({attribute: 3, base: 8, modifier: 2})
    assert.strictEqual(actual, expected)
  })
})

describe('Shadowrun calculate walk & run', () => {
  it('walk speed is agility * 2 then add modifier', () => assert.strictEqual(Functions.shadowrun.calculateWalkSpeed(2, 20), 24))
  it('run speed is agility * 4 then add modifier', () => assert.strictEqual(Functions.shadowrun.calculateRunSpeed(2, 20), 28))
})

describe('Shadowrun findFlagInKeys', () => {
  it('searchs an array of keys for any containing "_flag"', () => {
    const actual = Functions.shadowrun.findFlagInKeys({body: "5", soak_modifier: "6", soak_temp_flag: 'on'})
    assert.ok(actual, "soak_temp_flag")
  })
})

describe('Shadowrun attribute factory', () => {
  it('attributeFactory should return an object', () => {
    const actual = Functions.shadowrun.attributeFactory({reaction_base: 1, reaction_modifier: 2, reaction_temp: 0, reaction_temp_flag: "on"})
    assert.ok(actual, 'object')
  })
  it('attributeFactory should have a bonue key with temps removed if flag is "on"', () => {
    const actual = Functions.shadowrun.attributeFactory({reaction_base: 1, reaction_modifier: 2, reaction_temp: 1, reaction_temp_flag: "on"})
    assert.deepStrictEqual(actual, {reaction_base: 1, bonus: 3})
  })

  it('attributeFactory should return just modifier as bonus if temp_flag is not "on"', () => {
    const actual = Functions.shadowrun.attributeFactory({reaction_base: 1, reaction_modifier: 2, reaction_temp: 1, reaction_temp_flag: 0})
    assert.deepStrictEqual(actual, {reaction_base: 1, bonus: 2})
  })

  it('attributeFactory should not throw an error if there are no flag key', () => {
    const actual = Functions.shadowrun.attributeFactory({reaction_base: 1, reaction_modifier: 2})
    assert.deepStrictEqual(actual, {reaction_base: 1, bonus: 2})
  })
})