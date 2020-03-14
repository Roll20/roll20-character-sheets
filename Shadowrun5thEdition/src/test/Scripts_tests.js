const assert = require('assert')
const Functions = require('../js/newScripts');

describe('Roll20 functions', () => {
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

describe('Shadowrun specific functions', () => {
  it('shotsFired not greater than 0 && trigger "remove" there is no change', () => assert.strictEqual(Functions.shadowrun.shotsFired(-1, "shots_remove"), -1))

  it('shotsFired trigger was "add" increment shots by 1', () => assert.strictEqual(Functions.shadowrun.shotsFired(5, "shots_add"), 6))

  it('calculateBonuses will return an object with a only a base and bonus key', () => {
    const expected = {strength: 20, bonus: 5}
    const actual = Functions.shadowrun.calculateBonuses({strength: 20, strength_modifier: 2, strength_temp: 3})
    assert.deepStrictEqual(actual, expected)
  })

  it('calculateBonuses will add the value if the key contains "modifier" || "temp"', () => {
    const expected = 5;
    const actual = Functions.shadowrun.calculateBonuses({strength: 20, strength_modifier: 2, strength_temp: 3})
    assert.strictEqual(actual.bonus, expected)
  })

  it('processTempFlags removes the flag property', () => {
    const expected = {reaction_base: 1, reaction_modifier: 2, reaction_temp: 0}
    const actual = Functions.shadowrun.processTempFlags({reaction_base: 1, reaction_modifier: 2, reaction_temp: 0, reaction_temp_flag: "on"})
    assert.deepStrictEqual(actual, expected)
  })

  it('processTempFlags removes temp if flag is not "on"', () => {
    const expected = {reaction_base: 1, reaction_modifier: 2}
    const actual = Functions.shadowrun.processTempFlags({reaction_base: 1, reaction_modifier: 2, reaction_temp: 10, reaction_temp_flag: "off"})
    assert.deepStrictEqual(actual, expected)
  })

  it('processTempFlags returns attribute name by splitting the flag', () => {
    const actual = Functions.shadowrun.processTempFlags({physical_limit_temp_flag: "off"})
    assert.ok(actual, "physical_limit")
  })

  it('buildDisplay returns the base if bonus is 0', () => assert.strictEqual(Functions.shadowrun.buildDisplay(5, 0), 5))
  it('buildDisplay returns a string of "base (base+bonus)"', () => assert.ok(Functions.shadowrun.buildDisplay(5, 1), '5 (6)'))

  it('calculateLimitTotal (z + y (x * 2))/3', () => assert.strictEqual(Functions.shadowrun.calculateLimitTotal([1, 3, 4]), 4))

  it('calculateWalkSpeed by multiplying agility * 2 then adding modifiers', () => assert.strictEqual(Functions.shadowrun.calculateWalkSpeed(2, 20), 24))
  it('calculateRunSpeed by multiplying agility * 4 then adding modifiers', () => assert.strictEqual(Functions.shadowrun.calculateRunSpeed(2, 20), 28))

  it('findFlagInKeys searchs an array of keys for any containing "_flag"', () => {
    const actual = Functions.shadowrun.findFlagInKeys({body: "5", soak_modifier: "6", soak_temp_flag: 'on'})
    assert.ok(actual, "soak_temp_flag")
  })
})

describe('Shadowrun attribute factories', () => {
  it('attributeFactory should returns an object', () => {
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
})