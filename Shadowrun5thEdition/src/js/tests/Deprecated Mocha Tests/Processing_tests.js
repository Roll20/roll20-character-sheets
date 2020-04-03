const assert = require('assert')
const Functions = require('../js/processingFunctions');

describe('Roll20', () => {
  it('setAttributes returns error if update is not an object', () => assert.ifError(Functions.setAttributes(6)))
})

describe('processingFunctions are generic functions not specific to the sytem', () => {
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

  it('sliceAttr removes the @{} from a value', () => assert.ok(Functions.sliceAttr('@{strength}'), 'strength'))

  it('The repeating name from the trigger', () => {
    const actual = Functions.findRepeatingField('repeating_range_-m1czg68yzicwhfdpyys')
    assert.ok(actual, 'range')
  })

  it('Get the attribute name from the trigger', () => {
    const actual = Functions.getReprowAttribute('repeating_range_-m1czg68yzicwhfdpyys_attrName')
    assert.ok(actual, 'attrName')
  })
})
