/* global on:false generateRowID:false */

import { updateAbilityModifiers } from './abilities';
import { updateSkill, updateAbilityChecksMacro } from './abilityChecks';
import { updateActions, updateAction, updateActionChatMacro } from './actions';
import { updateAttachers } from './attachers';
import { updateAttack, updateAttackChatMacro } from './attacks';
import { updateLevels, updateAlignment, updateD20Mod } from './character';
import { setClassFeatures } from './classFeatures';
import { TOGGLE_VARS } from './constants';
import { updateArmor, weighEquipment, weighAmmo } from './equipment';
import { updateInitiative } from './initiative';
import { updateNPCChallenge, updateLanguages, updateSenses, updateType, updateNPCAC, updateNPCHD, switchToNPC } from './npc';
import { updateDamageResistancesVar, updateDamageVulnerabilities, updateDamageResistances, updateDamageImmunities, updateConditionImmunities } from './resistances';
import { updateSavingThrows, updateCustomSavingThrows, updateCustomSavingThrowToggle } from './savingThrows';
import { updateShapedD20 } from './settings';
import { updateSpell, updateSpellSlots, updateSpellShowHide, updateSpellChatMacro, generateHigherLevelQueries } from './spells';
import { isUndefined, isUndefinedOrEmpty, getAbilityName, ordinalSpellLevel, getSetItems, getSetRepeatingItems } from './utilities';

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
const updateCritDamage = () => {
  getSetRepeatingItems('updateCritDamage', {
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['damage', 'damage_crit', 'second_damage', 'second_damage_crit'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (!v[`${repeatingString}damage_crit`] && v[`${repeatingString}damage`]) {
          finalSetAttrs[`${repeatingString}damage_crit`] = v[`${repeatingString}damage`];
        } else if (v[`${repeatingString}damage`] && v[`${repeatingString}damage_crit`]) {
          finalSetAttrs[`${repeatingString}damage_crit`] = `${v[`${repeatingString}damage`]} + ${v[`${repeatingString}damage_crit`]}`;
        }
        if (!v[`${repeatingString}second_damage_crit`] && v[`${repeatingString}second_damage`]) {
          finalSetAttrs[`${repeatingString}second_damage_crit`] = v[`${repeatingString}second_damage`];
        } else if (v[`${repeatingString}second_damage`] && v[`${repeatingString}second_damage_crit`]) {
          finalSetAttrs[`${repeatingString}second_damage_crit`] = `${v[`${repeatingString}second_damage`]} + ${v[`${repeatingString}second_damage_crit`]}`;
        }
      }
    },
  });
};

const oldValueToNew = (v, finalSetAttrs, repeatingString, newRepeatingString, field) => {
  finalSetAttrs[`${newRepeatingString}${field}`] = v[`${repeatingString}${field}`];
};
const resourcesToTraits = () => {
  getSetRepeatingItems('resourcesToTraits', {
    repeatingItems: ['repeating_resource'],
    collectionArrayAddItems: ['name', 'uses', 'uses_max', 'toggle_details', 'recharge', 'extras_toggle', 'freetext', 'freeform'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const fieldsToSwap = ['name', 'uses', 'uses_max', 'toggle_details', 'recharge', 'extras_toggle', 'freetext', 'freeform'];
      for (const id of ids) {
        for (const field of fieldsToSwap) {
          oldValueToNew(v, finalSetAttrs, `${repeatingItem}_${id}_`, `repeating_trait_${generateRowID()}_`, field);
        }
      }
    },
  });
};
const classFeaturesToTraits = () => {
  getSetRepeatingItems('classFeaturesToTraits', {
    repeatingItems: ['repeating_classfeature'],
    collectionArrayAddItems: ['name', 'uses', 'uses_max', 'recharge', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'extras_toggle', 'emote', 'freetext', 'freeform'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const fieldsToSwap = ['name', 'uses', 'uses_max', 'recharge', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'extras_toggle', 'emote', 'freetext', 'display_text', 'freeform'];

      for (const id of ids) {
        for (const field of fieldsToSwap) {
          oldValueToNew(v, finalSetAttrs, `${repeatingItem}_${id}_`, `repeating_trait_${generateRowID()}_`, field);
        }
      }
    },
  });
};

const versionCompare = (v1, v2, options) => {
  const lexicographical = options && options.lexicographical;
  const zeroExtend = options && options.zeroExtend;
  let v1parts = v1.split('.');
  let v2parts = v2.split('.');

  const isValidPart = (x) => {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  };

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) {
      v1parts.push('0');
    }
    while (v2parts.length < v1parts.length) {
      v2parts.push('0');
    }
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length === i) {
      return 1;
    }

    if (v1parts[i] === v2parts[i]) {
      continue;
    } else if (v1parts[i] > v2parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }

  if (v1parts.length !== v2parts.length) {
    return -1;
  }

  return 0;
};
const upgrade = () => {
  if (versionCompare(version, '2.1.0') < 0) {
    updateNPCChallenge();
    updateDamageVulnerabilities();
    updateDamageResistances();
    updateDamageImmunities();
    updateConditionImmunities();
    updateLanguages();
    updateSenses();
  }
  if (versionCompare(version, '2.1.3') < 0) {
    updateType();
    updateAlignment();
  }
  if (versionCompare(version, '2.1.5') < 0) {
    updateNPCAC();
  }
  if (versionCompare(version, '2.1.10') < 0) {
    updateSavingThrows();
  }
  if (versionCompare(version, '2.1.13') < 0) {
    weighEquipment();
  }
  if (versionCompare(version, '2.1.15') < 0) {
    displayTextForTraits();
  }
  if (versionCompare(version, '2.2.2') < 0) {
    resourcesToTraits();
  }
  if (versionCompare(version, '2.2.4') < 0) {
    updateInitiative();
  }
  if (versionCompare(version, '2.2.5') < 0) {
    weighAmmo();
  }
  if (versionCompare(version, '2.2.6') < 0) {
    updateLevels();
    extasToExtrasFix('repeating_attack');
    extasToExtrasFix('repeating_action');
    extasToExtrasFix('repeating_spell');
  }
  if (versionCompare(version, '2.3.3') < 0) {
    updateAttachers();
  }
  if (versionCompare(version, '2.4.2') < 0) {
    updateAbilityModifiers();
    updateActionChatMacro('trait');
    updateActionChatMacro('action');
    updateActionChatMacro('reaction');
    updateActionChatMacro('legendaryaction');
  }
  if (versionCompare(version, '2.4.3') < 0) {
    setClassFeatures();
  }
  if (versionCompare(version, '2.4.7') < 0) {
    classFeaturesToTraits();
  }
  if (versionCompare(version, '2.4.8') < 0) {
    fixRollTwo();
  }
  if (versionCompare(version, '2.4.12') < 0) {
    armorPlusDexRemoval();
    updateArmor();
  }
  if (versionCompare(version, '3.1.0') < 0) {
    updateAttackChatMacro();
  }
  if (versionCompare(version, '3.2.1') < 0) {
    updateCritDamage();
  }
  if (versionCompare(version, '3.2.3') < 0) {
    updateDamageResistancesVar();
  }
  if (versionCompare(version, '3.5.0') < 0) {
    updateSpellChatMacro();
  }
  if (versionCompare(version, '3.5.1') < 0) {
    updateSpellSlots();
  }
  if (versionCompare(version, '3.6.1') < 0) {
    updateNPCHD();
    switchToNPC();
  }
  if (versionCompare(version, '4.1.4') < 0) {
    updateArmorAbility();
    updateActionComponents();
    updateSkillAbility();
  }
  if (versionCompare(version, '4.1.5') < 0) {
    updateSkill();
  }
  if (versionCompare(version, '4.2.0') < 0) {
    updateD20Mod();
    updateShapedD20();
  }
  if (versionCompare(version, '4.2.1') < 0) {
    updateActionComponentsToRemoveExtraFields();
    updateAbilityChecksMacro();
    removeToggleVar();
  }
  if (versionCompare(version, '4.2.3') < 0) {
    updateArmor();
  }
  if (versionCompare(version, '4.4.0') < 0) {
    updateCustomSavingThrows();
    newAttackToggle();
    generateHigherLevelQueries();
  }
  if (versionCompare(version, '4.4.1') < 0) {
    newAbilityDefaults();
  }
  if (versionCompare(version, '4.4.2') < 0) {
    updateSpellShowHide();
  }
  if (versionCompare(version, '5.0.0') < 0) {
    updateSpellToTranslations();
  }
  if (versionCompare(version, '5.0.3') < 0) {
    updateSpell();
    updateAttack();
    updateActions();
    updateCustomSavingThrowToggle();
  }
  if (versionCompare(version, '5.0.4') < 0) {
    updateDefaultAbility();
  }
  if (versionCompare(version, '5.0.6') < 0) {
    updateSpellLevelForCantrips();
  }
  if (versionCompare(version, '5.0.8') < 0) {
    newAttackToggleTwo();
  }
  if (versionCompare(version, '5.2.3') < 0) {
    updateHideFreetext();
  }
};

export { upgrade, extasToExtrasFix, armorPlusDexRemoval, fixRollTwo, updateDefaultAbility, updateHideFreetext, updateSkillAbility, updateArmorAbility, atSyntaxToAbilityName, updateActionComponents, newAttackToggle, newAttackToggleTwo, newAbilityDefaults, changeOldToggleToNew, removeToggleVar, changeOldRepeatingToggleToNew, updateActionComponentsToRemoveExtraFields, displayTextForTraits, updateSpellToTranslations, updateSpellLevelForCantrips, updateCritDamage, resourcesToTraits, classFeaturesToTraits };
