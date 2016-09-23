(() => {
  'use strict';

  function _debug(msg) {
    return _setAttrs({
      debug: msg
    });
  }

  /**
   * Promise-wrapped getAttrs.
   */
  function _getAttrs(attrs) {
    return new Promise((resolve, reject) => {
      getAttrs(attrs, resolve);
    });
  }

  /**
   * Promise-wrapped getSectionIDs.
   */
  function _getSectionIds(sectionName) {
    return new Promise((resolve, reject) => {
      getSectionIDs(sectionName, resolve);
    });
  }

  function _onChange(attrNames, cb) {
    let list = _.chain(attrNames)
    .map(name => {
      return 'change:' + name
    })
    .value();

    on(list.join(' '), cb);
  }

  /**
   * Promise-wrapped setAttrs.
   */
  function _setAttrs(values) {
    return new Promise((resolve, reject) => {
      log(values);
      setAttrs(values, undefined, resolve);
    });
  }

  function updateAbilityMod(abilityName) {
    return _getAttrs([abilityName, abilityName + '_temp'])
    .then(values => {
      let base = values[abilityName];
      let temp = values[abilityName + '_temp'];
      return _setAttrs({
        [abilityName] + '_mod': Math.floor((base + temp - 10)/2)
      }});
    });
  }

  function updateChaMod() {
    return updateAbilityMod('cha');
  }

  function updateConMod() {
    return updateAbilityMod('con');
  }

  function updateDexMod() {
    return updateAbilityMod('dex');
  }

  function updateIntMod() {
    return updateAbilityMod('int');
  }

  function updateStrMod() {
    return updateAbilityMod('str');
  }

  function updateWisMod() {
    return updateAbilityMod('wis');
  }



  _onChange(['cha', 'cha_temp'], () => {
    return updateChaMod();
  });

  _onChange(['con', 'con_temp'], () => {
    return updateConMod();
  });

  _onChange(['dex', 'dex_temp'], () => {
    return updateDexMod();
  });

  _onChange(['int', 'int_temp'], () => {
    return updateIntMod();
  });

  _onChange(['str', 'str_temp'], () => {
    return updateStrMod();
  });

  _onChange(['wis', 'wis_temp'], () => {
    return updateWisMod();
  });


  on('sheet:opened', () => {
    updateAll();
  });
})();
