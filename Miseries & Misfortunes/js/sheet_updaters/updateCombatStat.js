function updateCombatStat(sourceAttribute) {
  const type = sourceAttribute.split('_')[0];
  const attribute = sourceAttribute.slice(0, -4);
  const mod_type = roll_table[type].mod + '_mod';
  getAttrs([mod_type, sourceAttribute], attributes => {
    const update = {};
    update[attribute] = parseInt(attributes[sourceAttribute], 10) + parseInt(attributes[mod_type], 10);
    setAttrs(update, { silent: true });
  });
}
