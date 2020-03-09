const assert = require('assert')
const Functions = require('../js/Scripts');

describe('Helper functions', () => {
	it('returns a number', () => {
		const expected = 'number'
		const actual = Functions.parseIntegers({newValue: '6'})
		assert.ok(typeof actual.newValue, expected)
	})

	it('adds an array of numbers together', () => {
		const expected = 35
		const actual = Functions.sumIntegers([5, 10, 20])
		assert.strictEqual(actual, expected)
	})

	it('converts a number', () => {
		const expected = 'number'
		const actual = Functions.convertInteger('6')
		assert.strictEqual(typeof actual, expected)
	})

	it('splits triggerName to get the repeating row id', () => {
		const expected = 'repeating_advancement_-m1czg68yzicwhfdpyys'
		const actual = Functions.getReprowid('repeating_advancement_-m1czg68yzicwhfdpyys_earned_xp')
		assert.strictEqual(actual, expected)
	})
})