const update_mix_section = (data, section, staticArray) => {
  if (data === undefined) {
    return;
  }

  const parsedData = parseJSON(data);
  const update = {};

  parsedData?.forEach(({ name, target_value }) => {
    const isStaticSkill = staticArray.includes(name?.toLowerCase());

    if (isStaticSkill) {
      update[attrName(name)] = target_value;
    } else {
      const custom = processDataArrays(
        [{ name, target_value }],
        updateSection(section)
      );
      Object.assign(update, custom);
    }
  });

  return update;
};
