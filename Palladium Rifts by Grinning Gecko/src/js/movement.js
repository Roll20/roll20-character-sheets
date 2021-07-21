on("change:repeating_movement:mph", async (e) => {
  console.log("change:repeating_movement:mph", e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const orderedSectionIds = await getSectionIDsOrderedAsync("profiles");
  const a = await getAttrsAsync([
    `repeating_profiles_${orderedSectionIds[0]}_attacks`,
  ]);
  const feetPerMelee = Math.round((e.newValue * 5280) / 60 / 4);
  const attrs = {
    [`repeating_movement_${rowId}_ft_melee`]: feetPerMelee,
    [`repeating_movement_${rowId}_ft_attack`]: Math.round(
      feetPerMelee / a[`repeating_profiles_${orderedSectionIds[0]}_attacks`]
    ),
  };
  await setAttrsAsync(attrs);
});

on("change:repeating_movement:ft_melee", async (e) => {
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const orderedSectionIds = await getSectionIDsOrderedAsync("profiles");
  const a = await getAttrsAsync([
    `repeating_profiles_${orderedSectionIds[0]}_attacks`,
  ]);
  const feetPerMelee = e.newValue;
  const mph = ((feetPerMelee * 4 * 60) / 5280).toFixed(1);
  const attrs = {
    [`repeating_movement_${rowId}_mph`]: mph,
    [`repeating_movement_${rowId}_ft_attack`]: Math.round(
      feetPerMelee / a[`repeating_profiles_${orderedSectionIds[0]}_attacks`]
    ),
  };
  await setAttrsAsync(attrs);
});
