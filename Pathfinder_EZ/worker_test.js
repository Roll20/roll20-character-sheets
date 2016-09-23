(() => {
  'use strict';

  /**
   * Promise-wrapped getAttrs.
   */
  function _getAttrs(attrs) {
    return new Promise((resolve, reject) => {
      getAttrs(attrs, resolve);
    });
  }

  /**
   * Promise-wrapped setAttrs.
   */
  function _setAttrs(values) {
    return new Promise(resolve, reject => {
      setAttrs(values, undefined, () => {
        resolve();
      });
    });
  }

  on('sheet:opened', () => {
    (new Promise((resolve, reject) => {
      resolve(42);
    }))
    .then(value => {
      return _setAttrs({
        debug: value
      });
    })
    .then(() => {
      setAttrs({
        debug: 11
      });
    });
  });
})();
