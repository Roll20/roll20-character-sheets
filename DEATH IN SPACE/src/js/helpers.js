const helpers = (() => {
  /**
   * Batch translate multiple keys at once.
   * @param {Array} keys An array of keys to translate.
   * @returns An array of translated keys.
   */
  const getTranslationByArray = (keys) => keys.map((key) => getTranslationByKey(key));

  return {
    getTranslationByArray,
  };
})();
