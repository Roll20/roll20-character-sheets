function updateCombatArmor(e) {
  const { newValue } = e;
  combat_armor_die = '0d0';
  combat_armor_ablative = 0;

  if (newValue === 'helmet_gorget') {
    combat_armor_die = '1d3';
    combat_armor_ablative = 5;
  } else if (newValue === 'helmet_breastplate') {
    combat_armor_die = '1d3';
    combat_armor_ablative = 4;
  } else if (newValue === 'breastplate') {
    combat_armor_die = '1d3';
    combat_armor_ablative = 3;
  } else if (newValue === 'mail') {
    combat_armor_die = '1d2';
    combat_armor_ablative = 4;
  } else if (newValue === 'buff') {
    combat_armor_die = '1d1';
    combat_armor_ablative = 10;
  } else if (newValue === 'helmet') {
    combat_armor_die = '1d1';
    combat_armor_ablative = 1;
  }

  update = {
    combat_armor_die,
    combat_armor_ablative,
  };
  setAttrs(update, { silent: true });
}
