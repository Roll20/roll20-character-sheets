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

async function recalculateMovement(manualFeetPerMelee) {
  console.log("Recalculating Speed Values");
  let feetPerMelee = manualFeetPerMelee;
  let attacksPerMelee = 2;

  const orderedSectionIds = await getSectionIDsOrderedAsync("profiles");
  /**
   * @todo short-term - this should use Default profile
   * @todo long-term - movement section should be incorporated into each profile
   */
  const attacksAttrName = `repeating_profiles_${orderedSectionIds[0]}_attacks`;

  if (!manualFeetPerMelee) {
    const ids = await getSectionIDsOrderedAsync("armor");
    const {
      spd,
      [attacksAttrName]: perMelee,
      ...penalties
    } = await getAttrsAsync([
      "spd",
      attacksAttrName,
      ...ids.map((id) => `repeating_armor_${id}_is_active`),
      ...ids.map((id) => `repeating_armor_${id}_movementpenalty`),
    ]);
    attacksPerMelee = perMelee;

    const activeArmorIds = ids.reduce((acc, id) => {
      if (!!Number(penalties[`repeating_armor_${id}_is_active`])) {
        acc.push(id);
      }
      return acc;
    }, []);

    const speedPenalty = activeArmorIds.reduce((penalty, id) => {
      const p = +penalties[`repeating_armor_${id}_movementpenalty`];
      return penalty + p;
    }, 0);

    feetPerMelee = spd * 15;
    feetPerMelee = Math.round(
      feetPerMelee + feetPerMelee * (speedPenalty / 100.0)
    );
  } else {
    // To save a network call, pull only attacks on a manual override
    const { [attacksAttrName]: perMelee } = await getAttrsAsync([
      attacksAttrName,
    ]);
    attacksPerMelee = perMelee;
  }
  const attrs = {
    run_mph: ((feetPerMelee * 4 * 60) / 5280).toFixed(1),
    run_ft_melee: feetPerMelee,
    run_ft_attack: Math.round(feetPerMelee / attacksPerMelee),
  };
  await setAttrsAsync(attrs);
}
