QUnit.module('Shadowrun 5th Edition tests', {
  before: () => maxAsyncDelay = 100, //Sets the mock delay for getAttrs and setAttrs to a maximum of 1000ms.
  beforeEach: () => {
    //Resets attributes before each test
    attributes = {}
    sectionIDS = {}
  }
})

QUnit.test('setAttributes returns error if update is not an object', assert => assert.throws(processingFunctions.setAttributes(6)))

QUnit.test('parseIntegers returns a number', assert => {
  const actual = processingFunctions.parseIntegers({newValue: '6'})
  assert.ok(actual.newValue, 'number')
})

QUnit.test('sumIntegers adds an array of numbers together', assert => assert.strictEqual(processingFunctions.sumIntegers([5, 10, 20]), 35))

QUnit.test('convertInteger converts a string to number', assert => assert.strictEqual(typeof processingFunctions.parseInteger('6'), 'number'))

QUnit.test('getReprowid splQUnit.tests triggerName to get the repeating row id', assert => {
  const expected = 'repeating_advancement_-m1czg68yzicwhfdpyys'
  const actual = processingFunctions.getReprowid('repeating_advancement_-m1czg68yzicwhfdpyys_earned_xp')
  assert.strictEqual(actual, expected)
})

QUnit.test('convertIntegerNegative turns posQUnit.testive integar into negative', assert => assert.strictEqual(processingFunctions.convertIntegerNegative(6), -6))

QUnit.test('sliceAttr removes the @{} from a value', assert => assert.ok(processingFunctions.sliceAttr('@{strength}'), 'strength'))

QUnit.test('The repeating name from the trigger', assert => {
  const actual = processingFunctions.findRepeatingField('repeating_range_-m1czg68yzicwhfdpyys')
  assert.ok(actual, 'range')
})

QUnit.test('Get the attribute name from the trigger', assert => {
  const actual = processingFunctions.getReprowAttribute('repeating_range_-m1czg68yzicwhfdpyys_attrName')
  assert.ok(actual, 'attrName')
})

QUnit.test('convertSkillSelectToHiddenSkill removes " Group" in skill groups ', assert => {
  const actual = shadowrunFunctions.convertSkillSelectToHiddenSkill('Firearms Group')
  assert.ok(actual, 'firearms')
})

QUnit.test('convertSkillSelectToHiddenSkill removes all " " in skill groups ', assert => {
  const actual = shadowrunFunctions.convertSkillSelectToHiddenSkill('Close Combat Group')
  assert.ok(actual, 'closecombat')
})

QUnit.test('shots_fired attribute are not greater than 0 && trigger "remove" there is no change', assert => assert.strictEqual(shadowrunFunctions.shotsFired(-1, "shots_remove"), -1))

QUnit.test('trigger was "add" increment shots by 1', assert => assert.strictEqual(shadowrunFunctions.shotsFired(5, "shots_add"), 6))

QUnit.test('return an object wQUnit.testh a only a base and bonus key', assert => {
  const expected = {strength: 20, bonus: 5}
  const actual = shadowrunFunctions.calculateBonuses({strength: 20, strength_modifier: 2, strength_temp: 3})
  assert.deepEqual(actual, expected)
})

QUnit.test('add the value if the key contains "modifier" || "temp"', assert => {
  const expected = 5;
  const actual = shadowrunFunctions.calculateBonuses({strength: 20, strength_modifier: 2, strength_temp: 3})
  assert.strictEqual(actual.bonus, expected)
})

QUnit.test('removes the flag property', assert => {
  const expected = {reaction_base: 1, reaction_modifier: 2, reaction_temp: 0}
  const actual = shadowrunFunctions.processTempFlags({reaction_base: 1, reaction_modifier: 2, reaction_temp: 0, reaction_temp_flag: "on"})
  assert.deepEqual(actual, expected)
})

QUnit.test('removes temp if flag is not "on"', assert => {
  const expected = {reaction_base: 1, reaction_modifier: 2}
  const actual = shadowrunFunctions.processTempFlags({reaction_base: 1, reaction_modifier: 2, reaction_temp: 10, reaction_temp_flag: "off"})
  assert.deepEqual(actual, expected)
})

QUnit.test('returns the only base if bonus is 0', assert => assert.strictEqual(shadowrunFunctions.buildDisplay(5, 0), 5))
QUnit.test('returns a string of "base (base+bonus)"', assert => assert.ok(shadowrunFunctions.buildDisplay(5, 1), '5 (6)'))

QUnit.test('calculates total of (z + y (x * 2))/3', assert => assert.strictEqual(shadowrunFunctions.calculateLimitTotal([1, 3, 4]), 4))

QUnit.test('walk speed is agilQUnit.testy * 2 then add modifier', assert => assert.strictEqual(shadowrunFunctions.calculateWalkSpeed(2, 20), 24))

QUnit.test('run speed is agilQUnit.testy * 4 then add modifier', assert => assert.strictEqual(shadowrunFunctions.calculateRunSpeed(2, 20), 28))

QUnit.test('searchs an array of keys for any containing "_flag"', assert => {
  const actual = shadowrunFunctions.findFlagInKeys({body: "5", soak_modifier: "6", soak_temp_flag: 'on'})
  assert.ok(actual, "soak_temp_flag")
})

QUnit.test('searchs an array of keys for any containing modifier', assert => {
  const actual = shadowrunFunctions.findModifierInKeys({body: "5", soak_modifier: "6", soak_temp_flag: 'on'})
  assert.ok(actual, "soak_modifier")
})

QUnit.test('should return an object', assert => {
  const actual = shadowrunFunctions.conditionFactory({})
  assert.ok(actual, 'object')
})

QUnit.test('should contain an attribute key', assert => {
  const actual = shadowrunFunctions.conditionFactory({body: 3})
  assert.ok(actual.attribute, true) 
})

QUnit.test('should return attribute key wQUnit.testh the value of willpower', assert => {
  const actual = shadowrunFunctions.conditionFactory({body: 3, willpower: 5})
  assert.strictEqual(actual.attribute, 5) 
})

QUnit.test('should return base key', assert => {
  const actual = shadowrunFunctions.conditionFactory({})
  assert.ok(actual.base, true) 
})

QUnit.test('should return modifier key', assert => {
  const actual = shadowrunFunctions.conditionFactory({stun_modifier: 6})
  assert.ok(actual.modifier, true) 
})

QUnit.test('should convert the attrs object into condQUnit.testion object', assert => {
  const expected = {modifier: 7, attribute: 10, base: 8}
  const actual = shadowrunFunctions.conditionFactory({stun_modifier: 7, willpower: 10})
  assert.deepEqual(actual, expected)
})

QUnit.test('divide attribute by 2 then add base and modiifer', assert => {
  const actual = shadowrunFunctions.calculateConditionTracks({attribute: 3, base: 8, modifier: 2})
  assert.strictEqual(actual, 12)
})

QUnit.test('default base is 8', assert => {
  const actual = shadowrunFunctions.determineConditionBase()
  assert.strictEqual(actual, 8)
})

QUnit.test('sheet is a vehicle and is a drone return 10', assert => {
  const actual = shadowrunFunctions.determineConditionBase('vehicle', 'drone')
  assert.strictEqual(actual, 6)
})

QUnit.test('sheet is a vehicle but not a drone return 10', assert => {
  const actual = shadowrunFunctions.determineConditionBase('vehicle')
  assert.strictEqual(actual, 12)
})

QUnit.test('default attribute should be 0', assert => {
  const actual = shadowrunFunctions.determineConditionAttribute({})
  assert.strictEqual(actual, 0)
})

QUnit.test('stun will return willpower attribute', assert => {
  const actual = shadowrunFunctions.determineConditionAttribute({willpower: 8}, 'stun')
  assert.strictEqual(actual, 8)
})

QUnit.test('physical will return body attribute', assert => {
  const actual = shadowrunFunctions.determineConditionAttribute({body: 18}, 'physical')
  assert.strictEqual(actual, 18)
})

QUnit.test('matrix will return device rating attribute', assert => {
  const actual = shadowrunFunctions.determineConditionAttribute({device_rating: 5}, 'matrix')
  assert.strictEqual(actual, 5)
})

QUnit.test('default is 0', assert => {
  const actual = shadowrunFunctions.calculateWounds({})
  assert.strictEqual(actual, 0)
})

QUnit.test('low pain tolerance is false then divide by 3', assert => {
  const actual = shadowrunFunctions.calculateWounds({physical: 6})
  assert.strictEqual(actual, -2)
})

QUnit.test('low pain tolerance is equal 2 then divide by 2', assert => {
  const actual = shadowrunFunctions.calculateWounds({low_pain_tolerance: 2, physical: 6})
  assert.strictEqual(actual, -3)
})

QUnit.test('add physical & stun wounds together', assert => {
  const actual = shadowrunFunctions.calculateWounds({physical: 6, stun: 9})
  assert.strictEqual(actual, -5)
})

QUnit.test('high pain tolerance should subtract from the divisor', assert => {
  const actual = shadowrunFunctions.calculateWounds({high_pain_tolerance: 2, physical: 6, stun: 9})
  assert.strictEqual(actual, -3)
})

QUnit.test('damage compensator should subtract from condition type', assert => {
  const actual = shadowrunFunctions.calculateWounds({physical: 6, stun: 9, damage_compensators_physical: 3})
  assert.strictEqual(actual, -4)
})

QUnit.test('damage compensator and high paintolerance stack', assert => {
  const actual = shadowrunFunctions.calculateWounds({high_pain_tolerance: 2, physical: 6, damage_compensators_physical: 3})
  assert.strictEqual(actual, 0)
})

QUnit.test('minimum of 0', assert => {
  const actual = shadowrunFunctions.calculateWounds({physical: 6, damage_compensators_physical: 13})
  assert.strictEqual(actual, 0)
})

QUnit.test('should return an object', assert => {
  const actual = shadowrunFunctions.attributeFactory({})
  assert.ok(actual, 'object')
})

QUnit.test('should remove temp keys if flag is "on" and return bonus wQUnit.testh temp value', assert => {
  const actual = shadowrunFunctions.attributeFactory({reaction_temp: 123, reaction_temp_flag: "on"})
  assert.deepEqual(actual, {total: 123, base: 0, bonus: 123})
})

QUnit.test('should return base values', assert => {
  const actual = shadowrunFunctions.attributeFactory({intuition: 1, reaction: 3})
  assert.deepEqual(actual.base, 4)
})

QUnit.test('should return modifier + temp as bonus if flag is "on"', assert => {
  const actual = shadowrunFunctions.attributeFactory({reaction_modifier: 20, reaction_temp: 1, reaction_temp_flag: "on"})
  assert.equal(actual.total, 21)
})

QUnit.test('returns attribute name by splQUnit.testting the flag', assert => {
  const actual = shadowrunFunctions.processTempFlags({physical_limit_temp_flag: "off"})
  assert.ok(actual, "physical_limQUnit.test")
})

QUnit.test('should return modifier + temp as bonus if flag is "on"', assert => {
  const actual = shadowrunFunctions.attributeFactory({reaction_modifier: 20, reaction_temp: 1, reaction_temp_flag: "on"})
  assert.equal(actual.total, 21)
})

QUnit.test('should return total values', assert => {
  const actual = shadowrunFunctions.attributeFactory({intuition: 1, reaction: 3, initiative_modifier: 6, initiative_temp: 10, initiative_temp_flag: 'on'})
  assert.deepEqual(actual.base, 4)
})

QUnit.test('Shadowrun should return an array', assert => {
  const actual = shadowrunFunctions.addRepRow('repeating_range_-m1czg68yzicwhfdpyys', ['ammo'])
  assert.ok(typeof actual, 'array')
})

QUnit.test('Shadowrun should entries with the reprowid added to the attribute name', assert => {
  const actual = shadowrunFunctions.addRepRow('repeating_range_-m1czg68yzicwhfdpyys', ['ammo'])
  assert.ok(actual, ['repeating_range_-m1czg68yzicwhfdpyys_ammo'])
})

QUnit.test('Shadowrun should entries with the reprowid added to the attribute name', assert => {
  const actual = shadowrunFunctions.addRepRow('repeating_range_-m1czg68yzicwhfdpyys', ['ammo'])
  assert.ok(actual, ['repeating_range_-m1czg68yzicwhfdpyys_ammo'])
})

QUnit.test('determineMatrixDice should return 5 if edge toggle is on', assert => {
  const actual = shadowrunFunctions.determineMatrixDice({edge: true})
  assert.equal(actual, 5)
})

QUnit.test('determineMatrixDice should return 5 if edge toggle is on', assert => {
  const actual = shadowrunFunctions.determineMatrixDice({edge: true})
  assert.equal(actual, 5)
})

QUnit.test('determineMatrixDice should return hot sim dice as default', assert => {
  const actual = shadowrunFunctions.determineMatrixDice({modifer: 0})
  assert.equal(actual, 4)
})

QUnit.test('determineMatrixDice should return cold sim dice if mode is set to cold', assert => {
  const actual = shadowrunFunctions.determineMatrixDice({mode: 'cold', modifer: 0})
  assert.equal(actual, 3)
})

QUnit.test('determineMatrixDice should return cold sim dice + modifier', assert => {
  const actual = shadowrunFunctions.determineMatrixDice({mode: 'cold', modifer: 1})
  assert.equal(actual, 4)
})

QUnit.test('determineMatrixDice should return 5 if modifier is higher than 5', assert => {
  const actual = shadowrunFunctions.determineMatrixDice({dice: 1, modifer: 105 })
  assert.equal(actual, 5)
})

QUnit.test('determineMatrixDice should return 1 if modifier is lower than 1', assert => {
  const actual = shadowrunFunctions.determineMatrixDice({dice: 1, modifer: -105 })
  assert.equal(actual, 1)
})
