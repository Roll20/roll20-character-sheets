function localize(rootElement) {
  const supportedAttributes = ['placeholder', 'title'];
  const i18nSelector = '*[data-i18n],' + supportedAttributes.map(_ => `[data-i18n-${_}]`).join(',');
  rootElement.find(i18nSelector).each(function () {
    const element = $(this);

    const i18nKey = element.attr('data-i18n');
    if (i18nKey) {
      const i18nValue = i18next.t(i18nKey, '');
      if (i18nValue) {
        element.html(i18nValue);
      }
    }

    for (const attribute of supportedAttributes) {
      const i18nKey = element.attr('data-i18n-' + attribute);
      if (i18nKey) {
        const i18nValue = i18next.t(i18nKey, '');
        if (i18nValue) {
          element.attr(attribute, i18nValue);
        }
      }
    }
  });
}
