function updateDefense() {
  getAttrs(['strength_mod', 'dexterity_mod', 'attack_defense_mod', 'defend_defense_mod'], attributes => {
    const { strength_mod, dexterity_mod, attack_defense_mod, defend_defense_mod } = attributes;
    const update = {
      attack_defense: parseInt(strength_mod, 10) + parseInt(attack_defense_mod, 10),
      defend_defense: parseInt(dexterity_mod, 10) + parseInt(defend_defense_mod, 10),
    };
    setAttrs(update, { silent: true });
  });
}
