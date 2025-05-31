function updateModifier(eventinfo) {
  const update = {};
  const attribute = eventinfo.sourceAttribute;
  const mod_value = mod_table[eventinfo.newValue] || 0;
  update[attribute + '_mod'] = mod_value;
  setAttrs(update, { silent: true });

  if (attribute === 'charisma') {
    updateCombatStat('voice_to_hit_mod');
    updateCombatStat('voice_damage_mod');
  }
  if (attribute === 'intelligence') {
    updateCombatStat('press_to_hit_mod');
    updateCombatStat('press_damage_mod');
  }
  if (attribute === 'strength') {
    updateCombatStat('melee_to_hit_mod');
    updateCombatStat('melee_damage_mod');
    updateDefense();
  }
  if (attribute === 'dexterity') {
    updateCombatStat('musketry_to_hit_mod');
    updateCombatStat('musketry_damage_mod');
    updateDefense();
  }
}
