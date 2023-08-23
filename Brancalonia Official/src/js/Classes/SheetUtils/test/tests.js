QUnit.module('Basic Tests', {
  before: function() {
    maxAsyncDelay = 100; //Sets the mock delay for getAttrs and setAttrs to a maximum of 1000ms.
  },
  beforeEach: function() {
    //Resets attributes before each test
    attributes = {};
    sectionIDS = {};
  }
});
QUnit.test('Sheet Utils returns correct UID', function( assert ) {
  assert.equal(SheetUtils.getUID('repeating_npcreaction_-LzbTrhcIwpDwRZxfvEn_name'), '-LzbTrhcIwpDwRZxfvEn');
  assert.equal(SheetUtils.getUID('attr_wisdom'), '');
});

QUnit.test('Sheet Utils returns a blank string when an invalid parameter is used', function( assert ) {
  assert.equal(SheetUtils.getUID(12345), '');
  assert.equal(SheetUtils.getUID(null), '');
  assert.equal(SheetUtils.getUID(undefined), '');
  assert.equal(SheetUtils.getUID({}), '');
  assert.equal(SheetUtils.getUID(), '');
  assert.equal(SheetUtils.getUID([]), '');
});

QUnit.test('Sheet Utils return the order a repeating section.', function(assert) {
  attributes['_reporder_repeating_section'] = "-LzbTrhcIwpDwRZxfvEn,-MzbTrhcIwpDwRZxfvEn";
  sectionIDS['repeating_section'] = ['-MzbTrhcIwpDwRZxfvEn', '-LzbTrhcIwpDwRZxfvEn'];
  var done = assert.async();
  SheetUtils.getSectionOrder('section', ids => {
    assert.equal(ids.join(','), attributes['_reporder_repeating_section'].toLowerCase());
    done();
  });  
});

QUnit.test('Sheet Utils section IDs when no ordering is found', function(assert) {
  sectionIDS['repeating_section'] = ['-MzbTrhcIwpDwRZxfvEn', '-LzbTrhcIwpDwRZxfvEn'];
  var done = assert.async();
  SheetUtils.getSectionOrder('section', ids => {
    assert.equal(ids.join(','), sectionIDS['repeating_section'].join(',').toLowerCase());
    done();
  });  
});

QUnit.test('Sheet Utils returns correct lowered case array', function( assert ) {
  assert.equal(SheetUtils.toLowerCase(['Something', 'SOMETHINGELSE']).join(' '), 'something somethingelse');
});

QUnit.test('Sheet Utils returns correct capitalized case array', function( assert ) {
  assert.equal(SheetUtils.toCapitalCase(['something', 'SOMETHINGELSE']).join(' '), 'Something Somethingelse');
});

QUnit.test('Sheet Utils returns correct deep read attributes', function( assert ) {
  attributes['hitdie_1'] = '6';
  attributes['hitdie_2'] = '@{hitdie_2A}';
  attributes['hitdie_2A'] = '8';
  attributes['hitdie_3'] = 3;
  attributes['hitdie_4'] = '["something"]';
  attributes['hitdie_6'] = '6';
  var done_1 = assert.async();
  var done_2 = assert.async();
  var done_3 = assert.async();
  var done_4 = assert.async();
  var done_5 = assert.async();
  var done_6 = assert.async();
  var done_7 = assert.async();
  var done_8 = assert.async();
  SheetUtils.deepReadAttribute('@{hitdie_1}', value => {
    assert.equal(value, '6');
    done_1();
  }, '2');
  SheetUtils.deepReadAttribute('@{hitdie_2}', value => {
    assert.equal(value, '8');
    done_2();
  }, '2');
  SheetUtils.deepReadAttribute('@{hitdie_3}', value => {
    assert.equal(value, '3');
    done_3();
  }, '2');
  SheetUtils.deepReadAttribute('@{hitdie_4}', value => {
    assert.equal(value, '["something"]');
    done_4();
  }, '2');
  SheetUtils.deepReadAttribute('@{hitdie_5}', value => {
    assert.equal(value, '2');
    done_5();
  }, '2');
  SheetUtils.deepReadAttribute('@{hitdie_5}', value => {
    assert.equal(value, undefined);
    done_6();
  });
  SheetUtils.deepReadAttribute('{hitdie_6}', value => {
    assert.equal(value, '{hitdie_6}');
    done_7();
  });
  SheetUtils.deepReadAttribute('something@{hitdie_6}', value => {
    assert.equal(value, 'something@{hitdie_6}');
    done_8();
  });
});

QUnit.test('Invalid ordered itens are removed from result', function(assert) {
  attributes['ui_flags'] = 'a_flag another_flag repeating_traits_0_name_-LzbTrhcIwpDwRZxfvEn repeating_traits_1_name_-MzbTrhcIwpDwRZxfvEn';
  attributes['_reporder_repeating_traits'] = '-MzbTrhcIwpDwRZxfvEn,-LzbTrhcIwpDwRZxfvEn,-InvalidIwpDwRZxfvEn';
  sectionIDS['repeating_traits'] = ['-FirsThcIwpDwRZxfvEn', '-LzbTrhcIwpDwRZxfvEn', '-MzbTrhcIwpDwRZxfvEn'];
  var done = assert.async();
  SheetUtils.getSectionOrder('traits', order => {
    console.log(order);
    var expected = '-MzbTrhcIwpDwRZxfvEn,-LzbTrhcIwpDwRZxfvEn,-FirsThcIwpDwRZxfvEn';
    assert.equal(order.join(','), SheetUtils.toLowerCase(expected));
    done();
  });
});

QUnit.only('utils return valid experience points', function(assert) {
  var xp_char_1 = '10000';
  var xp_char_2 = '10,000';
  var xp_char_3 = '10.000';
  var xp_char_4 = '10000 / 30000';
  var xp_char_5 = '10,000 /30.000';
  var xp_char_6 = '10.000\\30.000';
  var xp_char_7 = '10,000 |30.000';
  var xp_char_8 = '10,000 : 30.000';
  var xp_char_9 = '1.010,000-2.030.000';
  var xp_char_10 = '1 010  000- 2.030.000';
  var xp_char_11 = '1 010  000 2.030.000';
  var xp_char_12 = 'abcde 10000 / 30000sdse';
  var invalidXP = 'abcdef';
  var blankXPField = '';
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_1)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_2)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_3)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_4)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_4)[1], 30000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_5)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_5)[1], 30000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_6)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_6)[1], 30000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_7)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_7)[1], 30000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_8)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_8)[1], 30000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_9)[0], 1010000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_9)[1], 2030000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_10)[0], 1010000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_10)[1], 2030000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_11)[0], 10100002030000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_12)[0], 10000);
  assert.strictEqual(SheetUtils.sanitizeXP(xp_char_12)[1], 30000);
  assert.strictEqual(SheetUtils.sanitizeXP(invalidXP), null);
  assert.strictEqual(SheetUtils.sanitizeXP(blankXPField).length, 0);
});

QUnit.test('Sheet Utils checks object path', function( assert ) {
  var my_obj = {
    ["teste teste"]: {
      another: {
        empty: ""
      }
    } 
  };
  var path_1 = "['teste teste']['another']['empty']";
  var path_2 = "['teste teste'].another.empty";
  var path_3 = "['teste teste'].another['empty']";
  var path_4 = "['teste teste'].noexisting['empty']";
  assert.equal(SheetUtils.checkPath(my_obj, path_1), true);
  assert.equal(SheetUtils.checkPath(my_obj, path_1, true), false);
  assert.equal(SheetUtils.checkPath(my_obj, path_2), true);
  assert.equal(SheetUtils.checkPath(my_obj, path_2, true), false);
  assert.equal(SheetUtils.checkPath(my_obj, path_3), true);
  assert.equal(SheetUtils.checkPath(my_obj, path_3, true), false);
  assert.equal(SheetUtils.checkPath(my_obj, path_4), false);
  assert.equal(SheetUtils.checkPath(my_obj, path_4, true), false);
});
