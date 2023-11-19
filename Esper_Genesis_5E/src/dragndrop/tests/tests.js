//These unit tests are incomplete
//Lacks tests for inferSavingThrows, inferSkills, jsonParse, updateSheetAttributes

QUnit.module('dropFunctions tests', {
  before: () => maxAsyncDelay = 100, //Sets the mock delay for getAttrs and setAttrs to a maximum of 1000ms.
  beforeEach: () => {
    //Resets attributes before each test
    attributes = {}
    sectionIDS = {}
  }
})

QUnit.test('validateCantripScaling returns true if parameter is dice or beam', assert => {
  assert.equal(dropFunctions.validateCantripScaling('dice'), true)
  assert.equal(dropFunctions.validateCantripScaling('beam'), true)
})

QUnit.test('buildCantripScaling returns string', assert => {
  const actual = dropFunctions.buildCantripScaling('dice')
  assert.equal(typeof actual, 'string')
})

QUnit.test('buildCantripScaling should add "Cantrip"', assert => {
  const actual = dropFunctions.buildCantripScaling('dice')
  assert.equal(actual.includes('Cantrip'), true)
})

QUnit.test('buildCantripScaling returns capitalize the first letter of parameter', assert => {
  const actual = dropFunctions.buildCantripScaling('dice')
  assert.equal(actual.includes('Dice'), true)
})

QUnit.test('buildItemModString returns an empty string when invalid parameter is used', assert => {
  assert.equal(dropFunctions.buildItemModString(12345), '')
  assert.equal(dropFunctions.buildItemModString(null), '')
  assert.equal(dropFunctions.buildItemModString(undefined), '')
  assert.equal(dropFunctions.buildItemModString({}), '')
  assert.equal(dropFunctions.buildItemModString(), '')
  assert.equal(dropFunctions.buildItemModString([]), '')
})

QUnit.test('buildItemModString returns a string', assert => {
  const actual = dropFunctions.buildItemModString({data: {'Item Type': 'Weapon'}})
  assert.equal(typeof actual, 'string')
})

QUnit.test('buildItemModString add Item Type: ', assert => {
  const actual = dropFunctions.buildItemModString({data: {'Item Type': 'Weapon'}})
  assert.equal(actual.includes('Item Type: '), true)
})

QUnit.test('buildDamage return a roll string', assert => {
  const page = {data: {'Item Type': 'Melee Weapon', Properties: '', Damage: '1d8'}}
  const currentData = {strength_mod: -2}
  const actual = dropFunctions.buildDamage(page, currentData)
  assert.equal(actual, '1d8+-2')
})

QUnit.test('buildDamage if alternateDamage parameter is provided use it', assert => {
  const page = {data: {'Item Type': 'Melee Weapon', Properties: '', Damage: '1d8'}}
  const currentData = {strength_mod: -2}
  const actual = dropFunctions.buildDamage(page, currentData, '1d10')
  assert.equal(actual, '1d10+-2')
})

QUnit.test('buildDamage if Modifiers key is present add it to damage', assert => {
  const page = {data: {'Item Type': 'Melee Weapon', Properties: '', Damage: '1d8', Modifiers: 'Melee Attacks +1, Melee Damage +1'}}
  const currentData = {strength_mod: 2}
  const actual = dropFunctions.buildDamage(page, currentData)
  assert.equal(actual, '1d8+2+1')
})

QUnit.test('buildDamage returns an empty string when invalid parameter is used', assert => {
  assert.equal(dropFunctions.buildDamage(12345), '')
  assert.equal(dropFunctions.buildDamage(null), '')
  assert.equal(dropFunctions.buildDamage(undefined), '')
  assert.equal(dropFunctions.buildDamage({}), '')
  assert.equal(dropFunctions.buildDamage(), '')
  assert.equal(dropFunctions.buildDamage([]), '')
})

QUnit.test('buildItemModString add the "Item Type" key to the string', assert => {
  const actual = dropFunctions.buildItemModString({data: {'Item Type': 'Weapon', Category: 'Item'}})
  assert.equal(actual, 'Item Type: Weapon')
})

QUnit.test('buildItemModString if "Item Type" key is undefined use Category', assert => {
  const actual = dropFunctions.buildItemModString({data: {Category: 'Item'}})
  assert.equal(actual, 'Item Type: Item')
})

QUnit.test('buildItemModString if page.data for item includes AC & Damage add it to the mod string', assert => {
  const actual = dropFunctions.buildItemModString({data: {'Item Type': 'Armor', AC: '4', Damage: '1d4'}})
  assert.equal(actual, 'Item Type: Armor, AC: 4, Damage: 1d4')
})

QUnit.test('buildItemModString add entries from the Modifiers key to the mod string', assert => {
  const actual = dropFunctions.buildItemModString({data: {'Item Type': 'Armor', Modifiers: 'Ac +1, Saving Throws +1'}})
  assert.equal(actual, 'Item Type: Armor, Ac +1, Saving Throws +1')
})

QUnit.test('buildSpellQuery returns a roll template', assert => {
  const actual = dropFunctions.buildSpellQuery(3)
  const expected = '@{wtype}&{template:spell} {{level=@{spellschool} ?{Cast at what level?|Level 3,3|Level 4,4|Level 5,5|Level 6,6|Level 7,7|Level 8,8|Level 9,9}}} {{name=@{spellname}}} {{castingtime=@{spellcastingtime}}} {{range=@{spellrange}}} {{target=@{spelltarget}}} @{spellcomp_v} @{spellcomp_s} @{spellcomp_m} {{material=@{spellcomp_materials}}} {{duration=@{spellduration}}} {{description=@{spelldescription}}} {{athigherlevels=@{spellathigherlevels}}} @{spellritual} {{innate=@{innate}}} @{spellconcentration} @{charname_output}'
  assert.equal(actual, expected)
})

QUnit.test('buildToHit add ability modifier to hit', assert => {
  const page = {data: {'Item Type': 'Melee Weapon', Properties: '', Damage: '1d8'}}
  const currentData = {strength_mod: 2}
  const actual = dropFunctions.buildToHit(page, currentData)
  assert.equal(actual, '2')
})

QUnit.test('buildToHit if Modifiers key is present add it to hit modifier', assert => {
  const page = {data: {'Item Type': 'Melee Weapon', Properties: '', Damage: '1d8', Modifiers: 'Melee Attacks +1, Melee Damage +1'}}
  const currentData = {strength_mod: 2}
  const actual = dropFunctions.buildToHit(page, currentData)
  assert.equal(actual, '2+1')
})

QUnit.test('buildToHit returns an empty string when invalid parameter is used', assert => {
  assert.equal(dropFunctions.buildToHit(12345), '')
  assert.equal(dropFunctions.buildToHit(null), '')
  assert.equal(dropFunctions.buildToHit(undefined), '')
  assert.equal(dropFunctions.buildToHit({}), '')
  assert.equal(dropFunctions.buildToHit(), '')
  assert.equal(dropFunctions.buildToHit([]), '')
})

QUnit.test('buildSenses adds string with passive perception', assert => {
  const actual = dropFunctions.buildSenses(undefined, 19)
  assert.equal(typeof actual, 'string')
  assert.equal(actual, 'passive Perception 19')
})

QUnit.test('buildSenses adds senses if they are defined to passive perception', assert => {
  const actual = dropFunctions.buildSenses('truesight 120 ft.', 19)
  assert.equal(actual, 'truesight 120 ft., passive Perception 19')
})

QUnit.test('buildSpellList takes an object and returns an array of spells', assert => {
  const spells = '{"spells":{"cantrips":["mage hand","prestidigitation","ray of frost"]}}'
  const expected = ["mage hand", "prestidigitation", "ray of frost"]
  const actual = dropFunctions.buildSpellList(spells)
  assert.deepEqual(actual, expected)
})

QUnit.test('buildType takes size, type, and aligment then returns a string', assert => {
  const actual = dropFunctions.buildType('Medium', 'Monster', 'Lawful Evil')
  assert.deepEqual(actual, "Medium Monster, Lawful Evil")
})

QUnit.test('confirmFinesse returns a boolean of true if finesse is included', assert => {
  const actual = dropFunctions.confirmFinesse('thrown, finesse')
  assert.equal(typeof actual, 'boolean')
  assert.equal(actual, true)
})

QUnit.test('confirmFinesse returns a boolean of false if finesse is not included', assert => {
  const actual = dropFunctions.confirmFinesse('thrown')
  assert.equal(typeof actual, 'boolean')
  assert.equal(actual, false)
})

QUnit.test('confirmDexGreaterThanStr returns a boolean of true if dex is greater than str', assert => {
  const actual = dropFunctions.confirmDexGreaterThanStr(35, 20)
  assert.equal(typeof actual, 'boolean')
  assert.equal(actual, true)
})

QUnit.test('confirmDexGreaterThanStr returns a boolean of false if dex is less than str', assert => {
  const actual = dropFunctions.confirmDexGreaterThanStr(20, 35)
  assert.equal(typeof actual, 'boolean')
  assert.equal(actual, false)
})

QUnit.test('inferAbilityModifier type & properties are undefined return strength mod', assert => {
  const actual = dropFunctions.inferAbilityModifier(undefined, undefined, {strength_mod: 2, dexterity_mod: 5})
  assert.equal(actual, 2)
})

QUnit.test('inferAbilityModifier type incudes range return dex mod', assert => {
  const actual = dropFunctions.inferAbilityModifier('Ranged Weapon', undefined, {strength_mod: 2, dexterity_mod: 5})
  assert.equal(actual, 5)
})

QUnit.test('inferAbilityModifier properties incudes finesse return dex mod', assert => {
  const actual = dropFunctions.inferAbilityModifier('Melee Weapon', 'Finesse, Light, Range, Thrown', {strength_mod: 2, dexterity_mod: 5})
  assert.equal(actual, 5)
})

QUnit.test('inferBaseAttribute returns the number in NPC attribute', assert => {
  assert.equal(dropFunctions.inferBaseAttribute('17 (natural armor)'), '17')
  assert.equal(dropFunctions.inferBaseAttribute('17'), '17')
})

QUnit.test('inferCasterLevel returns a caster level from a description', assert => {
  const description = 'The lich is an 18th-level spellcaster.'
  const actual = dropFunctions.inferCasterLevel(description)
  assert.equal(actual, '18')
})

QUnit.test('inferFormulaAttribute returns the number in NPC attribute', assert => {
  assert.equal(dropFunctions.inferFormulaAttribute('135 (18d8 + 54)'), '18d8 + 54')
  assert.equal(dropFunctions.inferFormulaAttribute('135'), '')
})

QUnit.test('inferModifier returns type of modifier', assert => {
  const actual = dropFunctions.inferModifier('Melee Attacks +1, Melee Damage +1', 'damage')
  assert.equal(actual, 1)
})

QUnit.test('inferSpellcastingAbility returns the ability modifier from description', assert => {
  const description = 'The lich is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 20, +12 to hit with spell attacks).'
  const actual = dropFunctions.inferSpellcastingAbility(description)
  assert.equal(actual, '@{intelligence_mod}+')
})

QUnit.test('inferSpellcastingAbility returns default 0* on failure', assert => {
  const description = 'The lich is an 18th-level spellcaster.'
  const actual = dropFunctions.inferSpellcastingAbility(description)
  assert.equal(actual, '0*')
})

