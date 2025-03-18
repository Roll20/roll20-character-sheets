var getTranslations = function (translationKeys) {
    var translations = {};
    translationKeys.forEach(function (obj) {
        Object.keys(obj).forEach(function (key) {
            var translation = getTranslationByKey(key);
            if (typeof translation === "string") {
                translations["".concat(key)] = translation;
            }
        });
    });
    return translations;
};
