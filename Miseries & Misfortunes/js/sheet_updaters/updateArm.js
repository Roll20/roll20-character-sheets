function updateArm(weapon, id) {
  const weapon_data = weapons[weapon];
  update = {};
  update['repeating_arms_' + id + '_arm_name'] = weapon_data.name;
  update['repeating_arms_' + id + '_arm_damage'] = weapon_data.damage;
  update['repeating_arms_' + id + '_arm_initiative'] = weapon_data.initiative;
  setAttrs(update, { silent: true });
}
