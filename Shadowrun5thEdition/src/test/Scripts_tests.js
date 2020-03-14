const assert = require('assert')
const Functions = require('../js/newScripts');

describe('Roll20 functions', () => {
  it('setAttributes returns error if update is not an object', () => assert.ok(typeof Functions.setAttributes(6), 'string'))
})

describe('Helper functions', () => {
	it('parseIntegers returns a number', () => {
		const expected = 'number'
		const actual = Functions.parseIntegers({newValue: '6'})
		assert.ok(typeof actual.newValue, expected)
	})

	it('sumIntegers adds an array of numbers together', () => assert.strictEqual(Functions.sumIntegers([5, 10, 20]), 35))

	it('convertInteger converts a string to number', () => assert.strictEqual(typeof Functions.parseInteger('6'), 'number'))

	it('getReprowid splits triggerName to get the repeating row id', () => {
		const expected = 'repeating_advancement_-m1czg68yzicwhfdpyys'
		const actual = Functions.getReprowid('repeating_advancement_-m1czg68yzicwhfdpyys_earned_xp')
		assert.strictEqual(actual, expected)
	})
})

describe('Shadowrun specific functions', () => {
  it('shotsFired not greater than 0 && trigger "remove" there is no change', () => assert.strictEqual(Functions.shadowrun.shotsFired(-1, "shots_remove"), -1))

  it('shotsFired trigger was "add" increment shots by 1', () => assert.strictEqual(Functions.shadowrun.shotsFired(5, "shots_add"), 6))
}) 