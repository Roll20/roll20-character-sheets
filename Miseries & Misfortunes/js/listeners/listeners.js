on(
  'change:trigger_strength change:trigger_intelligence change:trigger_wisdom change:trigger_dexterity change:trigger_constitution change:trigger_charisma change:trigger_nationality change:trigger_religion change:trigger_politics change:trigger_poison_plague change:trigger_terror change:trigger_chance change:trigger_artillery change:trigger_break change:trigger_improvise change:trigger_listen change:trigger_parley change:trigger_sang-froid change:trigger_search change:trigger_sneak change:trigger_traverse',
  eventinfo => {
    activateRollModal(eventinfo.sourceAttribute);
    closeWitsModal();
    closeCombatModal();
  }
);

on('change:repeating_lifepath-skills:trigger_skill change:repeating_language-skills:trigger_skill', eventinfo => {
  activateRepeatingRollModal(eventinfo.sourceAttribute);
  closeWitsModal();
  closeCombatModal();
});

on('change:close_modal', eventinfo => {
  closeRollModal();
  closeWitsModal();
  closeCombatModal();
});

on(
  'change:strength change:intelligence change:wisdom change:dexterity change:constitution change:charisma',
  eventinfo => {
    updateModifier(eventinfo);
  }
);

on('change:roll_mod change:tn_mod', () => {
  updateRollModal();
});

on(
  'change:down_nationality change:down_religion change:down_politics change:up_nationality change:up_religion change:up_politics  change:up_break change:up_improvise change:up_listen change:up_parley change:up_sang-froid change:up_search change:up_sneak change:up_traverse  change:down_break change:down_improvise change:down_listen change:down_parley change:down_sang-froid change:down_search change:down_sneak change:down_traverse',
  eventinfo => {
    incrementSkill(eventinfo);
  }
);

on(
  'change:repeating_lifepath-skills:up_skill change:repeating_lifepath-skills:down_skill change:repeating_language-skills:up_skill change:repeating_language-skills:down_skill',
  eventinfo => {
    incrementRepeatingSkill(eventinfo);
  }
);

on('change:trigger_voice change:trigger_press', eventinfo => {
  activateWitsModal(eventinfo.sourceAttribute);
  closeRollModal();
  closeCombatModal();
});

on('change:wits_attack change:wits_distance change:wits_roll_mod change:wits_opponent_tn', eventinfo => {
  updateWitsModal();
});

on(
  'change:voice_to_hit_mod change:voice_damage_mod change:press_to_hit_mod change:press_damage_mod change:melee_to_hit_mod change:melee_damage_mod change:musketry_to_hit_mod change:musketry_damage_mod',
  eventinfo => {
    updateCombatStat(eventinfo.sourceAttribute);
  }
);

on('change:defend_defense_mod change:attack_defense_mod', () => {
  updateDefense();
});

on('change:repeating_arms:arm', eventinfo => {
  const id = eventinfo.sourceAttribute.split('_')[2];
  const weapon = eventinfo.newValue;
  updateArm(weapon, id);
});

on('change:repeating_arms:arm_trigger', eventinfo => {
  const id = eventinfo.sourceAttribute.split('_')[2];
  activateCombatModal(id);
  closeRollModal();
  closeWitsModal();
});

on(
  'change:combat_attack change:combat_distance change:combat_roll_mod change:combat_opponent_tn change:combat_shot',
  () => {
    updateCombatModal();
  }
);

on('change:trigger_melee', () => {
  const update = {
    show_combat_modal: 1,
    combat_attack: 'fist',
    trigger_melee: 0,
    combat_roll_mod = 0,
  };
  setAttrs(update, { silent: true }, () => updateCombatModal());
});

on('change:trigger_musketry', () => {
  const update = {
    show_combat_modal: 1,
    combat_attack: 'pistol',
    trigger_musketry: 0,
    combat_roll_mod = 0,
  };
  setAttrs(update, { silent: true }, () => updateCombatModal());
});

on('change:reputation_armor', e => {
  updateReputationArmor(e);
});

on('change:combat_armor', e => {
  updateCombatArmor(e);
});