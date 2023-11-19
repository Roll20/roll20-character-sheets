function updateReputationArmor(e) {
  const { newValue } = e;
  reputation_armor_die = '0d0';
  reputation_armor_ablative = 0;

  if (newValue === 'highest') {
    reputation_armor_die = '1d3';
    reputation_armor_ablative = 5;
  } else if (newValue === 'second') {
    reputation_armor_die = '1d2';
    reputation_armor_ablative = 3;
  } else if (newValue === 'lowest') {
    reputation_armor_ablative = 1;
  }

  update = {
    reputation_armor_die,
    reputation_armor_ablative,
  };
  setAttrs(update, { silent: true });
}
