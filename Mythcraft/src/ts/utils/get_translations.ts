const getTranslations = (translationKeys: { [key: string]: string }[]) => {
  let translations: { [key: string]: string } = {};
  translationKeys.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      const translation = getTranslationByKey(key);
      if (typeof translation === "string") {
        translations[`${key}`] = translation;
      }
    });
  });
  return translations;
};
