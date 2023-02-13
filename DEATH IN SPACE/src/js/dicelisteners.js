/**
 * Roll Abilities
 */
G_ABILITIES.forEach((ability) => {
  on(`clicked:${ability}`, async (eventInfo) => {
    rollAbility(ability);
  });
});
