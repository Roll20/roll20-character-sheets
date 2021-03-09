QUnit.module('Basic Tests', {
  before: function() {
    maxAsyncDelay = 100; //Sets the mock delay for getAttrs and setAttrs to a maximum of 1000ms.
  },
  beforeEach: function() {
    //Resets attributes before each test
    attributes = {};
    sectionIDS = {};
    this.flagManager = new FlagManager('ui_flags');
  }
});
QUnit.test('Flag Manager was initiated with zero entries', function( assert ) {
  var done = assert.async();
  this.flagManager.getFlags().then(flags => {
    assert.equal(flags.size, 0);
    done();
  });
});

QUnit.test('One flag added to Flag Manager', function( assert ) {
  var done = assert.async();
  this.flagManager.addFlag('show_traits').then(flags => {
    assert.equal(flags.size, 1);
    assert.equal(flags.has('show_traits'), true);
    assert.strictEqual(attributes.ui_flags, 'show_traits');
    done();
  });
});

QUnit.test('Two flags added to Flag Manager', function( assert ) {
  var done = assert.async();
  this.flagManager.addFlag('show_traits').then(() => {
    this.flagManager.addFlag('show_spells').then(flags => {
      assert.equal(flags.size, 2);
      assert.equal(flags.has('show_traits'), true);
      assert.equal(flags.has('show_spells'), true);
      assert.strictEqual(attributes.ui_flags, 'show_traits show_spells');
      done();
    });
  });
});

QUnit.test('Flag Deleted from Flag Manager', function( assert ) {
  //Faking some attributes
  attributes['ui_flags'] = 'show_traits show_spells show_skills';

  var done = assert.async();
  this.flagManager.deleteFlag('show_spells').then(flags => {
    assert.equal(flags.size, 2);
    assert.equal(flags.has('show_traits'), true);
    assert.equal(flags.has('show_spells'), false);
    assert.equal(flags.has('show_skills'), true);
    assert.strictEqual(attributes.ui_flags, 'show_traits show_skills');
    done();
  });
});

QUnit.test('Flags correctly detected in Flag Manager', function( assert ) {
  //Faking some attributes
  attributes['ui_flags'] = 'show_traits show_spells show_skills';

  var done1 = assert.async();
  var done2 = assert.async();
  this.flagManager.hasFlag('show_spells').then(hasFlag => {
    assert.equal(hasFlag, true);
    done1();
  });
  this.flagManager.hasFlag('non_existing_flag').then(hasFlag => {
    assert.equal(hasFlag, false);
    done2();
  });
});

QUnit.test('Flags cant be added more than once', function( assert ) {
  //Faking some attributes
  attributes['ui_flags'] = 'show_traits show_spells show_skills';

  var done = assert.async();
  this.flagManager.addFlag('show_skills').then(flags => {
    assert.equal(flags.size, 3);
    assert.strictEqual(attributes.ui_flags, 'show_traits show_spells show_skills');
    done();
  });
});

QUnit.test('Order of stored flags are synced with source repeating section', function(assert) {
  attributes['ui_flags'] = 'a_flag another_flag repeating_traits_0_name_-LzbTrhcIwpDwRZxfvEn repeating_traits_1_name_-MzbTrhcIwpDwRZxfvEn';
  attributes['_reporder_repeating_traits'] = '-MzbTrhcIwpDwRZxfvEn,-LzbTrhcIwpDwRZxfvEn';
  sectionIDS['repeating_traits'] = ['-LzbTrhcIwpDwRZxfvEn', '-MzbTrhcIwpDwRZxfvEn'];
  var done = assert.async();
  this.flagManager.syncFlagsWithRepeatingSection('traits').then(flags => {
    var expectedTags = new Set([
      'a_flag',
      'another_flag',
      'repeating_traits_1_name_-LzbTrhcIwpDwRZxfvEn',
      'repeating_traits_0_name_-MzbTrhcIwpDwRZxfvEn'
    ]);
    assert.equal(Array.from(flags).join(' '), Array.from(expectedTags).join(' '));
    done();
  });
});

QUnit.test('Deleted flags are synced with source repeating section', function(assert) {
  attributes = {};
  attributes['ui_flags'] = 'a_flag another_flag repeating_traits_1_name_-LzbTrhcIwpDwRZxfvEn repeating_traits_0_name_-MzbTrhcIwpDwRZxfvEn';
  sectionIDS['repeating_traits'] = ['-MzbTrhcIwpDwRZxfvEn'];
  var done = assert.async();
  this.flagManager.syncFlagsWithRepeatingSection('traits').then(flags => {
    var expectedTags = new Set([
      'a_flag',
      'another_flag',
      'repeating_traits_0_name_-MzbTrhcIwpDwRZxfvEn'
    ]);
    assert.equal(Array.from(flags).join(' '), Array.from(expectedTags).join(' '));
    done();
  });
});