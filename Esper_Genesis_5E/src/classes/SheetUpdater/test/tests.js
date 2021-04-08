QUnit.module('Basic Tests', {
  before: function() {
    maxAsyncDelay = 100; //Sets the mock delay for getAttrs and setAttrs to a maximum of 100ms.
  },
  beforeEach: function() {
    //Resets attributes before each test
    attributes = {};
    sectionIDS = {};
  }
});

QUnit.test('SheetUpdater applies single upgrade and set version to 2.0', function(assert) {
  attributes['version'] = '1.0';
  attributes['appliedUpdates'] = "";

  var done = assert.async();
  
  var sampleUpdates = [
    new SheetUpgrade(
      'upgrade_to_2_0',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      2.0
    ),
  ];

  this.sheetUpdater = new SheetUpdater(sampleUpdates, 'version', 'appliedUpdates');
  this.sheetUpdater.checkUpdates(result => {
    assert.equal(result['upgrade_to_2_0'].success, true);
    getAttrs(['version'], values => {
      assert.equal(values.version, 2.0);
      done();
    });
  });
});

QUnit.test('SheetUpdater applies two updates in a row and set version to 3.0', function(assert) {
  attributes['version'] = '1.0';
  attributes['appliedUpdates'] = "";
  var orderOfUpdates = [];

  var done = assert.async();
  
  var sampleUpdates = [
    new SheetUpgrade(
      'upgrade_to_2_0',
      (resolve, reject) => {
        getAttrs(['version'], () => {
          orderOfUpdates.push('upgrade_to_2_0');
          resolve();
        });
      },
      2.0
    ),
    new SheetUpgrade(
      'upgrade_to_3_0',
      (resolve, reject) => {
        getAttrs(['version'], () => {
          orderOfUpdates.push('upgrade_to_3_0');
          resolve();
        });
      },
      3.0
    ),
  ];

  this.sheetUpdater = new SheetUpdater(sampleUpdates, 'version', 'appliedUpdates');
  this.sheetUpdater.checkUpdates(result => {
    assert.equal(result['upgrade_to_2_0'].success, true);
    assert.equal(result['upgrade_to_3_0'].success, true);
    assert.equal(orderOfUpdates.join(','), 'upgrade_to_2_0,upgrade_to_3_0');
    getAttrs(['version'], values => {
      assert.equal(values.version, 3.0);
      done();
    });
  });
});

QUnit.test('SheetUpdater skips already installed update', function(assert) {
  attributes['version'] = '1.0';
  attributes['appliedUpdates'] = "existing_patch";
  var orderOfUpdates = [];

  var done = assert.async();
  
  var sampleUpdates = [
    new SheetUpgrade(
      'upgrade_to_2_0',
      (resolve, reject)  => {
        getAttrs(['version'], () => {
          orderOfUpdates.push('upgrade_to_2_0');
          resolve();
        });
      },
      2.0
    ),
    new SheetUpgrade(
      'existing_patch',
      (resolve, reject)  => {
        getAttrs(['version'], () => {
          orderOfUpdates.push('existing_patch');
          resolve();
        });
      },
    ),
    new SheetUpgrade(
      'upgrade_to_3_0',
      (resolve, reject)  => {
        getAttrs(['version'], () => {
          orderOfUpdates.push('upgrade_to_3_0');
          resolve();
        });
      },
      3.0
    ),
  ];

  this.sheetUpdater = new SheetUpdater(sampleUpdates, 'version', 'appliedUpdates');
  this.sheetUpdater.checkUpdates(result => {
    assert.equal(result['upgrade_to_2_0'].success, true);
    assert.equal(result['upgrade_to_3_0'].success, true);
    assert.equal(result['existing_patch'].success, false);
    assert.equal(result['existing_patch'].error, 'Update already installed!');
    assert.equal(orderOfUpdates.join(','), 'upgrade_to_2_0,upgrade_to_3_0');
    getAttrs(['version'], values => {
      assert.equal(values.version, 3.0);
      done();
    });
  });
});

QUnit.test('SheetUpdater refuses to install older upgrade', function(assert) {
  attributes['version'] = '3.0';
  attributes['appliedUpdates'] = "";

  var done = assert.async();
  
  var sampleUpdates = [
    new SheetUpgrade(
      'upgrade_to_2_0',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      2.0
    ),
    new SheetUpgrade(
      'upgrade_to_4_0',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      4.0
    ),
  ];

  this.sheetUpdater = new SheetUpdater(sampleUpdates, 'version', 'appliedUpdates');
  this.sheetUpdater.checkUpdates(result => {
    assert.equal(result['upgrade_to_2_0'].success, false);
    assert.equal(result['upgrade_to_2_0'].error, 'The current version of your sheet is not compatible with this update!');
    assert.equal(result['upgrade_to_4_0'].success, true);
    getAttrs(['version'], values => {
      assert.equal(values.version, 4.0);
      done();
    });
  });
});

QUnit.test('SheetUpdater correctly updates applied updates', function(assert) {
  attributes['version'] = '3.0';
  attributes['appliedUpdates'] = "upgrade_to_3_0";

  var done = assert.async();
  
  var sampleUpdates = [
    new SheetUpgrade(
      'upgrade_to_2_0',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      2.0
    ),
    new SheetUpgrade(
      'upgrade_to_3_0',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      3.0
    ),
    new SheetUpgrade(
      'upgrade_to_4_0',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      4.0
    ),
  ];

  this.sheetUpdater = new SheetUpdater(sampleUpdates, 'version', 'appliedUpdates');
  this.sheetUpdater.checkUpdates(result => {
    getAttrs(['appliedUpdates'], values => {
      assert.equal(values.appliedUpdates, 'upgrade_to_3_0,upgrade_to_4_0');
      done();
    });
  });
});

QUnit.test('SheetUpdater refuses to install incompatible update', function(assert) {
  attributes['version'] = '3.5';
  attributes['appliedUpdates'] = "";

  var done = assert.async();
  
  var sampleUpdates = [
    new SheetUpdate(
      'update_skills',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      3.8 //Min version
    ),
    new SheetUpdate(
      'update_attacks',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      2.0, //Min version
      4.0 //Max version
    ),
    new SheetUpgrade(
      'upgrade_to_3_6',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          resolve();
        });
      },
      3.6 //Min version
    ),
  ];

  this.sheetUpdater = new SheetUpdater(sampleUpdates, 'version', 'appliedUpdates');
  this.sheetUpdater.checkUpdates(result => {
    getAttrs(['version'], values => {
      assert.equal(values.version, 3.6);
      assert.equal(result['update_skills'].success, false);
      assert.equal(result['update_attacks'].success, true);
      done();
    });
  });
});

QUnit.test('Failed updates are logged', function(assert) {
  attributes['version'] = '3.5';
  attributes['appliedUpdates'] = "";

  var done = assert.async();
  
  var sampleUpdates = [
    new SheetUpgrade(
      'failed_update',
      (resolve, reject) => {
        getAttrs(['version'], values => {
          reject('Proposital failure');
        });
      },
      4.0
    )
  ];

  this.sheetUpdater = new SheetUpdater(sampleUpdates, 'version', 'appliedUpdates');
  this.sheetUpdater.checkUpdates(result => {
    getAttrs(['version'], values => {
      assert.equal(values.version, 3.5);
      assert.equal(result['failed_update'].success, false);
      assert.equal(result['failed_update'].error, 'Proposital failure');
      done();
    });
  });
});

