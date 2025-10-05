const updateCriticalRange = (attributes: Attributes) => {
  getAttrs(attributes, (values) => {
    const { luck, critical_range_base, critical_range } = parseIntegers(values);

    if (luck < 0) {
      //Luck < 0 never Critically Hit
      setAttrs({
        critical_range: 0, // Reset to default
      });
      return;
    }

    let range = critical_range_base;

    if (luck >= 12) {
      range = critical_range_base - 2;
    } else if (luck >= 6 && luck <= 11) {
      range = critical_range_base - 1;
    }

    const cr = range < 16 ? 16 : range;

    if (cr !== critical_range) {
      setAttrs({
        critical_range: cr,
      });
    }
  });
};
