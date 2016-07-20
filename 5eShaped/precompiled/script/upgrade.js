import { isUndefined, isUndefinedOrEmpty, getAbilityName, ordinalSpellLevel, getSetItems, getSetRepeatingItems } from './utilities';
import { TOGGLE_VARS } from './constants';

const extasToExtrasFix = (repeatingSection) => {
  getSetRepeatingItems('extasToExtrasFix', {
    repeatingItems: [repeatingSection],
    collectionArrayAddItems: ['extas_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        if (!isUndefinedOrEmpty(v[`${repeatingString}extas_toggle`])) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = v[`${repeatingString}extas_toggle`];
        }
      }
    },
  });
};
const armorPlusDexRemoval = () => {
  getSetRepeatingItems('armorPlusDexRemoval', {
    repeatingItems: ['repeating_armor'],
    collectionArrayAddItems: ['type'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        const armorType = v[`${repeatingString}type`];
        if (armorType === 'Armor + Dex') {
          finalSetAttrs[`${repeatingString}type`] = 'Light Armor';
        }
      }
    },
  });
};
const fixRollTwo = () => {
  getSetItems('fixRollTwo', {
    collectionArray: ['roll_setting'],
    callback: (v, finalSetAttrs) => {
      if (v.roll_setting === '@{attr_roll_2}') {
        finalSetAttrs.roll_setting = '{{roll2=[[d20@{d20_mod}';
      }
    },
  });
};
const updateDefaultAbility = () => {
  getSetItems('updateDefaultAbility', {
    collectionArray: ['default_ability'],
    callback: (v, finalSetAttrs) => {
      if (!isUndefinedOrEmpty(v.default_ability)) {
        finalSetAttrs.default_ability = getAbilityName(v.default_ability);
      }
    },
  });
};
const updateHideFreetext = () => {
  getSetItems('updateHideFreetext', {
    collectionArray: ['hide_freetext', 'hide_action_freetext'],
    callback: (v, finalSetAttrs) => {
      if (!isUndefinedOrEmpty(v.hide_action_freetext)) {
        finalSetAttrs.hide_freetext = v.hide_action_freetext;
      }
    },
  });
};
const updateSkillAbility = () => {
  getSetRepeatingItems('updateSkillAbility', {
    repeatingItems: ['repeating_skill'],
    collectionArrayAddItems: ['ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'ability');
      }
    },
  });
};
const updateArmorAbility = () => {
  getSetItems('updateArmorAbility', {
    collectionArray: ['ac_unarmored_ability'],
    callback: (v, finalSetAttrs) => {
      if (!isUndefinedOrEmpty(v.ac_unarmored_ability)) {
        finalSetAttrs.ac_unarmored_ability = getAbilityName(v.ac_unarmored_ability);
      }
    },
  });
};
const atSyntaxToAbilityName = (v, finalSetAttrs, repeatingString, field) => {
  if (v[`${repeatingString}${field}`]) {
    finalSetAttrs[`${repeatingString}${field}`] = getAbilityName(v[`${repeatingString}${field}`]);
  }
};

const updateActionComponents = () => {
  getSetRepeatingItems('updateActionComponents', {
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['attack_ability', 'damage_ability', 'second_damage_ability', 'heal_ability', 'saving_throw_ability', 'saving_throw_vs_ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'attack_ability');
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'damage_ability');
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'second_damage_ability');
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'heal_ability');
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'saving_throw_ability');

        if (v[`${repeatingString}saving_throw_vs_ability`]) {
          finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = v[`${repeatingString}saving_throw_vs_ability`].toUpperCase();
        }
      }
    },
  });
};

const newAttackToggle = () => {
  getSetRepeatingItems('newAttackToggle', {
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['roll_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}roll_toggle`] === '{{vs_ac=1}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}') {
          finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
        }
      }
    },
  });
};

const newAttackToggleTwo = () => {
  getSetRepeatingItems('newAttackToggleTwo', {
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['roll_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}roll_toggle`] === '{{vs_ac=1}} {{vs_saving_throw=@{attacks_vs_a_saving_throw}}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}') {
          finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
        }
      }
    },
  });
};

const newAbilityDefaults = () => {
  getSetRepeatingItems('newAbilityDefaults', {
    repeatingItems: ['repeating_attack', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['roll_toggle', 'roll_ability', 'damage_toggle', 'damage_ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (!isUndefinedOrEmpty(v[`${repeatingString}roll_toggle`]) && isUndefined(v[`${repeatingString}roll_ability`])) {
          finalSetAttrs[`${repeatingString}roll_ability`] = 'strength';
        }
        if (!isUndefinedOrEmpty(v[`${repeatingString}damage_toggle`]) && isUndefined(v[`${repeatingString}damage_ability`])) {
          finalSetAttrs[`${repeatingString}damage_ability`] = 'strength';
        }
      }
    },
  });
};

const changeOldToggleToNew = (v, finalSetAttrs, field, oldValue, newValue) => {
  if (v[field] === `@{${oldValue}}`) {
    finalSetAttrs[field] = newValue;
  }
};
const removeToggleVar = () => {
  getSetItems('removeToggleVar', {
    collectionArray: ['careful_spell_toggle', 'distant_spell_toggle', 'empowered_spell_toggle', 'extended_spell_toggle', 'heightened_spell_toggle', 'quickened_spell_toggle', 'subtle_spell_toggle', 'twinned_spell_toggle', 'initiative_tie_breaker', 'ammo_auto_use', 'hide_attack', 'hide_damage', 'hide_saving_throw_dc', 'hide_spell_content', 'hide_action_freetext', 'hide_saving_throw_failure', 'hide_saving_throw_success', 'hide_recharge', 'initiative_output_option', 'output_option', 'death_save_output_option', 'hit_dice_output_option', 'roll_setting', 'show_character_name', 'attacks_vs_target_ac', 'attacks_vs_target_name', 'initiative_roll', 'initiative_to_tracker'],
    callback: (v, finalSetAttrs) => {
      changeOldToggleToNew(v, finalSetAttrs, 'careful_spell_toggle', 'careful_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'distant_spell_toggle', 'distant_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'empowered_spell_toggle', 'empowered_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'extended_spell_toggle', 'extended_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'heightened_spell_toggle', 'heightened_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'quickened_spell_toggle', 'quickened_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'subtle_spell_toggle', 'subtle_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'twinned_spell_toggle', 'twinned_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_tie_breaker', 'initiative_tie_breaker_var', '[[@{initiative} / 100]][tie breaker]');
      changeOldToggleToNew(v, finalSetAttrs, 'ammo_auto_use', 'ammo_auto_use_var', '1');

      changeOldToggleToNew(v, finalSetAttrs, 'hide_attack', 'hide_attack_var', '{{hide_attack=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_damage', 'hide_damage_var', '{{hide_damage=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_dc', 'hide_saving_throw_dc_var', '{{hide_saving_throw_dc=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_spell_content', 'hide_spell_content_var', '{{hide_spell_content=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_action_freetext', 'hide_action_freetext_var', '{{hide_freetext=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_failure', 'hide_saving_throw_failure_var', '{{hide_saving_throw_failure=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_success', 'hide_saving_throw_success_var', '{{hide_saving_throw_success=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_recharge', 'hide_recharge_var', '{{hide_recharge=1}}');

      changeOldToggleToNew(v, finalSetAttrs, 'initiative_output_option', 'output_to_all', '');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_output_option', 'output_to_gm', '/w GM');
      changeOldToggleToNew(v, finalSetAttrs, 'output_option', 'output_to_all', '');
      changeOldToggleToNew(v, finalSetAttrs, 'output_option', 'output_to_gm', '/w GM');
      changeOldToggleToNew(v, finalSetAttrs, 'death_save_output_option', 'output_to_all', '');
      changeOldToggleToNew(v, finalSetAttrs, 'death_save_output_option', 'output_to_gm', '/w GM');
      changeOldToggleToNew(v, finalSetAttrs, 'hit_dice_output_option', 'output_to_all', '');
      changeOldToggleToNew(v, finalSetAttrs, 'hit_dice_output_option', 'output_to_gm', '/w GM');

      changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_advantage', 'adv {{ignore=[[0');
      changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_disadvantage', 'dis {{ignore=[[0');
      changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_1', '{{ignore=[[0');
      changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_2', '{{roll2=[[d20@{d20_mod}');

      changeOldToggleToNew(v, finalSetAttrs, 'show_character_name', 'show_character_name_no', '');
      changeOldToggleToNew(v, finalSetAttrs, 'show_character_name', 'show_character_name_yes', '{{show_character_name=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_ac', 'attacks_vs_target_ac_no', '');
      changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_ac', 'attacks_vs_target_ac_yes', '[[@{target|AC}]]');
      changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_name', 'attacks_vs_target_name_no', '');
      changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_name', 'attacks_vs_target_name_yes', '@{target|token_name}');

      changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'normal_initiative', '@{shaped_d20}');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'advantage_on_initiative', '2d20@{d20_mod}kh1');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'disadvantage_on_initiative', '2d20@{d20_mod}kl1');

      changeOldToggleToNew(v, finalSetAttrs, 'initiative_to_tracker', 'initiative_to_tracker_yes', '@{selected|initiative_formula} &{tracker}');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_to_tracker', 'initiative_to_tracker_no', '@{initiative_formula}');
    },
  });
};

const changeOldRepeatingToggleToNew = (v, finalSetAttrs, repeatingString, field, oldValue, newValue) => {
  if (v[`${repeatingString}${field}`] === `@{${oldValue}}`) {
    finalSetAttrs[`${repeatingString}${field}`] = newValue;
  }
};
const updateActionComponentsToRemoveExtraFields = () => {
  getSetRepeatingItems('updateActionComponentsToRemoveExtraFields', {
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['roll_toggle', 'content_toggle', 'saving_throw_toggle', 'damage_toggle', 'second_damage_toggle', 'extras_toggle', 'heal_toggle', 'heal_query_toggle', 'higher_level_toggle', 'special_effects_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'roll_toggle', 'roll_toggle_var', '{{vs_ac=1}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'content_toggle', 'content_toggle_var', '{{content=@{content}}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'saving_throw_toggle', 'saving_throw_toggle_var', '{{saving_throw_condition=@{saving_throw_condition}}} {{saving_throw_dc=@{saving_throw_dc}}} {{saving_throw_vs_ability=@{saving_throw_vs_ability}}} {{saving_throw_failure=@{saving_throw_failure}}} {{saving_throw_success=@{saving_throw_success}}} {{targetName=@{attacks_vs_target_name}}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'damage_toggle', 'damage_toggle_var', '{{damage=[[@{damage_formula}]]}} {{damage_type=@{damage_type}}} {{crit_damage=[[0d0 + @{damage_crit}[crit damage] @{damage_crit_formula}]]}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'second_damage_toggle', 'second_damage_toggle_var', '{{second_damage=[[@{second_damage_formula}]]}} {{second_damage_type=@{second_damage_type}}} {{second_crit_damage=[[0d0 + @{second_damage_crit}[crit damage] @{second_damage_crit_formula}]]}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'extras_toggle', 'extras_var', '{{emote=@{emote}}} {{freetext=@{freetext}}} @{freeform}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'heal_toggle', 'heal_toggle_var', '{{heal=[[@{heal_formula}]]}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'heal_query_toggle', 'heal_query', '?{Heal Bonus Amount|}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'higher_level_toggle', 'higher_level_toggle_var', '{{cast_as_level=@{higher_level_query}}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'special_effects_toggle', 'special_effects_var', '{{fx=@{type}-@{color} @{points_of_origin}}}');
      }
    },
  });
};
const displayTextForTraits = () => {
  getSetRepeatingItems('displayTextForTraits', {
    repeatingItems: ['repeating_trait'],
    collectionArrayAddItems: ['display_text', 'freetext'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        if (isUndefinedOrEmpty(v[`${repeatingString}display_text`])) {
          finalSetAttrs[`${repeatingString}display_text`] = v[`${repeatingString}freetext`];
        }
      }
    },
  });
};
const updateSpellToTranslations = () => {
  getSetRepeatingItems('updateSpellToTranslations', {
    repeatingItems: ['repeating_spell'],
    collectionArrayAddItems: ['spell_level', 'school', 'casting_time', 'components', 'duration', 'concentration', 'saving_throw_vs_ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}spell_level`]) {
          finalSetAttrs[`${repeatingString}spell_level`] = ordinalSpellLevel(v[`${repeatingString}spell_level`]);
        }
        if (v[`${repeatingString}school`]) {
          finalSetAttrs[`${repeatingString}school`] = v[`${repeatingString}school`].toUpperCase();
        }
        if (v[`${repeatingString}casting_time`]) {
          finalSetAttrs[`${repeatingString}casting_time`] = v[`${repeatingString}casting_time`].trim().toUpperCase().replace(/\s/g, '_');
        }
        if (v[`${repeatingString}components`]) {
          finalSetAttrs[`${repeatingString}components`] = `COMPONENTS_${v[`${repeatingString}components`].trim().toUpperCase().replace(/\s/g, '_')}`;
        }
        if (v[`${repeatingString}duration`]) {
          let duration = '';
          if (v[`${repeatingString}concentration`] === 'Yes') {
            duration += 'CONCENTRATION_';
          }
          duration += v[`${repeatingString}duration`].trim().toUpperCase().replace(/\s/g, '_');
          finalSetAttrs[`${repeatingString}duration`] = duration;
        }
        if (finalSetAttrs[`${repeatingString}saving_throw_vs_ability`]) {
          finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = v[`${repeatingString}saving_throw_vs_ability`].toUpperCase();
        }
      }
    },
  });
};
const updateSpellLevelForCantrips = () => {
  getSetRepeatingItems('updateSpellLevelForCantrips', {
    repeatingItems: ['repeating_spell'],
    collectionArrayAddItems: ['spell_level'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (isUndefinedOrEmpty(v[`${repeatingString}spell_level`]) || v[`${repeatingString}spell_level`] === '0' || v[`${repeatingString}spell_level`] === 0) {
          finalSetAttrs[`${repeatingString}spell_level`] = 'CANTRIP';
        }
      }
    },
  });
};

export { extasToExtrasFix, armorPlusDexRemoval, fixRollTwo, updateDefaultAbility, updateHideFreetext, updateSkillAbility, updateArmorAbility, atSyntaxToAbilityName, updateActionComponents, newAttackToggle, newAttackToggleTwo, newAbilityDefaults, changeOldToggleToNew, removeToggleVar, changeOldRepeatingToggleToNew, updateActionComponentsToRemoveExtraFields, displayTextForTraits, updateSpellToTranslations, updateSpellLevelForCantrips };
