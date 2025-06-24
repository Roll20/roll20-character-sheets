const update_traits = (data) => {
  const parsedData = parseJSON(data);
  const update = {};

  parsedData.forEach(({ name, target_value }) => {
    const isStaticTrait = traits.includes(name?.toLowerCase());

    if (isStaticTrait) {
      update[attrName(name)] = target_value;
    } else {
      const custom = processDataArrays(
        [{ name, target_value }],
        updateSection("traits")
      );
      Object.assign(update, custom);
    }
  });

  return update;
};
