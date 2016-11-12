/* global on:false, generateRowID:false, removeRepeatingRow:false */

import { Abilities } from './Abilities';
const abilities = new Abilities();
import { AbilityChecks } from './AbilityChecks';
const abilityChecks = new AbilityChecks();
import { Actions } from './Actions';
const actions = new Actions();
import { Attachers } from './Attachers';
const attachers = new Attachers();
import { Attacks } from './Attacks';
const attacks = new Attacks();
import { Character } from './Character';
const character = new Character();
import { ClassFeatures } from './ClassFeatures';
const classFeatures = new ClassFeatures();
import { TOGGLE_VARS } from './constants';
import { Equipment } from './Equipment';
const equipment = new Equipment();
import { Npc } from './Npc';
const npc = new Npc();
import { Resistances } from './Resistances';
const resistances = new Resistances();
import { SavingThrows } from './SavingThrows';
const savingThrows = new SavingThrows();
import { Settings } from './Settings';
const settings = new Settings();
import { Spells } from './Spells';
const spells = new Spells();
import { Psionics } from './Psionics';
const psionics = new Psionics();
import { isUndefined, isUndefinedOrEmpty, getAbilityName, getIntValue, getSetItems, getSetRepeatingItems, ordinalSpellLevel } from './utilities';
import { currentVersion } from './version';

export class Upgrade {
  extasToExtrasFix(repeatingSection) {
    getSetRepeatingItems('upgrade.extasToExtrasFix', {
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
  }
  attackToggle(repeatingSection) {
    getSetRepeatingItems('upgrade.attackToggle', {
      repeatingItems: [repeatingSection],
      collectionArrayAddItems: ['roll_toggle'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          if (!isUndefinedOrEmpty(v[`${repeatingString}roll_toggle`])) {
            finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
          }
        }
      },
    });
  }
  armorPlusDexRemoval() {
    getSetRepeatingItems('upgrade.armorPlusDexRemoval', {
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
  }
  fixRollTwo() {
    getSetItems('upgrade.fixRollTwo', {
      collectionArray: ['roll_setting'],
      callback: (v, finalSetAttrs) => {
        if (v.roll_setting === '@{attr_roll_2}') {
          finalSetAttrs.roll_setting = '{{roll2=[[d20@{d20_mod}';
        }
      },
    });
  }
  defaultAbility() {
    getSetItems('upgrade.defaultAbility', {
      collectionArray: ['default_ability'],
      callback: (v, finalSetAttrs) => {
        if (!isUndefinedOrEmpty(v.default_ability)) {
          finalSetAttrs.default_ability = getAbilityName(v.default_ability);
        }
      },
    });
  }
  hideFreetext() {
    getSetItems('upgrade.hideFreetext', {
      collectionArray: ['hide_freetext', 'hide_action_freetext'],
      callback: (v, finalSetAttrs) => {
        if (!isUndefinedOrEmpty(v.hide_action_freetext)) {
          finalSetAttrs.hide_freetext = v.hide_action_freetext;
        }
      },
    });
  }
  atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, field) {
    if (v[`${repeatingString}${field}`]) {
      finalSetAttrs[`${repeatingString}${field}`] = getAbilityName(v[`${repeatingString}${field}`]);
    }
  }
  skillAbility() {
    getSetRepeatingItems('upgrade.skillAbility', {
      repeatingItems: ['repeating_skill'],
      collectionArrayAddItems: ['ability'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          this.atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'ability');
        }
      },
    });
  }
  armorAbility() {
    getSetItems('upgrade.armorAbility', {
      collectionArray: ['ac_unarmored_ability'],
      callback: (v, finalSetAttrs) => {
        if (!isUndefinedOrEmpty(v.ac_unarmored_ability)) {
          finalSetAttrs.ac_unarmored_ability = getAbilityName(v.ac_unarmored_ability);
        }
      },
    });
  }
  actionComponents() {
    getSetRepeatingItems('upgrade.actionComponents', {
      repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
      collectionArrayAddItems: ['attack_ability', 'damage_ability', 'second_damage_ability', 'heal_ability', 'saving_throw_ability', 'saving_throw_vs_ability'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          this.atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'attack_ability');
          this.atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'damage_ability');
          this.atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'second_damage_ability');
          this.atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'heal_ability');
          this.atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'saving_throw_ability');

          if (v[`${repeatingString}saving_throw_vs_ability`]) {
            finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = v[`${repeatingString}saving_throw_vs_ability`].toUpperCase();
          }
        }
      },
    });
  }
  newAttackToggle() {
    getSetRepeatingItems('upgrade.newAttackToggle', {
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
  }
  newAttackToggleTwo() {
    getSetRepeatingItems('upgrade.newAttackToggleTwo', {
      repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
      collectionArrayAddItems: ['roll_toggle'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          if (v[`${repeatingString}roll_toggle`].indexOf('vs_saving_throw') !== -1) {
            finalSetAttrs[`${repeatingString}roll_toggle`] = TOGGLE_VARS.roll;
          }
        }
      },
    });
  }
  newAbilityDefaults() {
    getSetRepeatingItems('upgrade.newAbilityDefaults', {
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
  }
  changeOldToggleToNew(v, finalSetAttrs, field, oldValue, newValue) {
    if (v[field] === `@{${oldValue}}`) {
      finalSetAttrs[field] = newValue;
    }
  }
  removeToggleVar() {
    getSetItems('upgrade.removeToggleVar', {
      collectionArray: ['careful_spell_toggle', 'distant_spell_toggle', 'empowered_spell_toggle', 'extended_spell_toggle', 'heightened_spell_toggle', 'quickened_spell_toggle', 'subtle_spell_toggle', 'twinned_spell_toggle', 'initiative_tie_breaker', 'ammo_auto_use', 'hide_attack', 'hide_damage', 'hide_saving_throw_dc', 'hide_spell_content', 'hide_action_freetext', 'hide_saving_throw_failure', 'hide_saving_throw_success', 'hide_recharge', 'initiative_output_option', 'output_option', 'death_save_output_option', 'hit_dice_output_option', 'roll_setting', 'show_character_name', 'attacks_vs_target_ac', 'attacks_vs_target_name', 'initiative_roll', 'initiative_to_tracker'],
      callback: (v, finalSetAttrs) => {
        this.changeOldToggleToNew(v, finalSetAttrs, 'careful_spell_toggle', 'careful_spell_toggle_var', '1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'distant_spell_toggle', 'distant_spell_toggle_var', '1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'empowered_spell_toggle', 'empowered_spell_toggle_var', '1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'extended_spell_toggle', 'extended_spell_toggle_var', '1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'heightened_spell_toggle', 'heightened_spell_toggle_var', '1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'quickened_spell_toggle', 'quickened_spell_toggle_var', '1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'subtle_spell_toggle', 'subtle_spell_toggle_var', '1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'twinned_spell_toggle', 'twinned_spell_toggle_var', '1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'initiative_tie_breaker', 'initiative_tie_breaker_var', '[[@{initiative} / 100]][tie breaker]');
        this.changeOldToggleToNew(v, finalSetAttrs, 'ammo_auto_use', 'ammo_auto_use_var', '1');

        this.changeOldToggleToNew(v, finalSetAttrs, 'hide_attack', 'hide_attack_var', '{{hide_attack=1}}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hide_damage', 'hide_damage_var', '{{hide_damage=1}}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_dc', 'hide_saving_throw_dc_var', '{{hide_saving_throw_dc=1}}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hide_spell_content', 'hide_spell_content_var', '{{hide_spell_content=1}}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hide_action_freetext', 'hide_action_freetext_var', '{{hide_freetext=1}}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_failure', 'hide_saving_throw_failure_var', '{{hide_saving_throw_failure=1}}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_success', 'hide_saving_throw_success_var', '{{hide_saving_throw_success=1}}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hide_recharge', 'hide_recharge_var', '{{hide_recharge=1}}');

        this.changeOldToggleToNew(v, finalSetAttrs, 'initiative_output_option', 'output_to_all', '');
        this.changeOldToggleToNew(v, finalSetAttrs, 'initiative_output_option', 'output_to_gm', '/w GM');
        this.changeOldToggleToNew(v, finalSetAttrs, 'output_option', 'output_to_all', '');
        this.changeOldToggleToNew(v, finalSetAttrs, 'output_option', 'output_to_gm', '/w GM');
        this.changeOldToggleToNew(v, finalSetAttrs, 'death_save_output_option', 'output_to_all', '');
        this.changeOldToggleToNew(v, finalSetAttrs, 'death_save_output_option', 'output_to_gm', '/w GM');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hit_dice_output_option', 'output_to_all', '');
        this.changeOldToggleToNew(v, finalSetAttrs, 'hit_dice_output_option', 'output_to_gm', '/w GM');

        this.changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_advantage', 'adv {{ignore=[[0');
        this.changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_disadvantage', 'dis {{ignore=[[0');
        this.changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_1', '{{ignore=[[0');
        this.changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_2', '{{roll2=[[d20@{d20_mod}');

        this.changeOldToggleToNew(v, finalSetAttrs, 'show_character_name', 'show_character_name_no', '');
        this.changeOldToggleToNew(v, finalSetAttrs, 'show_character_name', 'show_character_name_yes', '{{show_character_name=1}}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_ac', 'attacks_vs_target_ac_no', '');
        this.changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_ac', 'attacks_vs_target_ac_yes', '[[@{target|AC}]]');
        this.changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_name', 'attacks_vs_target_name_no', '');
        this.changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_name', 'attacks_vs_target_name_yes', '@{target|token_name}');

        this.changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'normal_initiative', '@{shaped_d20}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'advantage_on_initiative', '2d20@{d20_mod}kh1');
        this.changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'disadvantage_on_initiative', '2d20@{d20_mod}kl1');

        this.changeOldToggleToNew(v, finalSetAttrs, 'initiative_to_tracker', 'initiative_to_tracker_yes', '@{selected|initiative_formula} &{tracker}');
        this.changeOldToggleToNew(v, finalSetAttrs, 'initiative_to_tracker', 'initiative_to_tracker_no', '@{initiative_formula}');
      },
    });
  }
  changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, field, oldValue, newValue) {
    if (v[`${repeatingString}${field}`] === `@{${oldValue}}`) {
      finalSetAttrs[`${repeatingString}${field}`] = newValue;
    }
  }
  actionComponentsToRemoveExtraFields() {
    getSetRepeatingItems('upgrade.actionComponentsToRemoveExtraFields', {
      repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
      collectionArrayAddItems: ['roll_toggle', 'content_toggle', 'saving_throw_toggle', 'damage_toggle', 'second_damage_toggle', 'extras_toggle', 'heal_toggle', 'heal_query_toggle', 'higher_level_toggle', 'special_effects_toggle'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'roll_toggle', 'roll_toggle_var', '{{vs_ac=1}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'content_toggle', 'content_toggle_var', '{{content=@{content}}}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'saving_throw_toggle', 'saving_throw_toggle_var', '{{saving_throw_condition=@{saving_throw_condition}}} {{saving_throw_dc=@{saving_throw_dc}}} {{saving_throw_vs_ability=@{saving_throw_vs_ability}}} {{saving_throw_failure=@{saving_throw_failure}}} {{saving_throw_success=@{saving_throw_success}}} {{targetName=@{attacks_vs_target_name}}}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'damage_toggle', 'damage_toggle_var', '{{damage=[[@{damage_formula}]]}} {{damage_type=@{damage_type}}} {{crit_damage=[[0d0 + @{damage_crit}[crit damage] @{damage_crit_formula}]]}}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'second_damage_toggle', 'second_damage_toggle_var', '{{second_damage=[[@{second_damage_formula}]]}} {{second_damage_type=@{second_damage_type}}} {{second_crit_damage=[[0d0 + @{second_damage_crit}[crit damage] @{second_damage_crit_formula}]]}}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'extras_toggle', 'extras_var', '{{emote=@{emote}}} {{freetext=@{freetext}}} @{freeform}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'heal_toggle', 'heal_toggle_var', '{{heal=[[@{heal_formula}]]}}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'heal_query_toggle', 'heal_query', '?{Heal Bonus Amount|}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'higher_level_toggle', 'higher_level_toggle_var', '{{cast_as_level=@{higher_level_query}}}');
          this.changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'special_effects_toggle', 'special_effects_var', '{{fx=@{type}-@{color} @{points_of_origin}}}');
        }
      },
    });
  }
  displayTextForTraits() {
    getSetRepeatingItems('upgrade.displayTextForTraits', {
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
  }
  spellToTranslations() {
    getSetRepeatingItems('upgrade.spellToTranslations', {
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
  }
  spellLevelForCantrips() {
    getSetRepeatingItems('upgrade.spellLevelForCantrips', {
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
  }
  spellEffectsNaming() {
    getSetRepeatingItems('upgrade.spellEffectsNaming', {
      repeatingItems: ['repeating_spell'],
      collectionArrayAddItems: ['special_effects_toggle', 'type', 'color', 'points_of_origin'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          if (!isUndefinedOrEmpty(v[`${repeatingString}special_effects_toggle`])) {
            finalSetAttrs[`${repeatingString}special_effects_toggle`] = '{{fx=@{special_effects_type}-@{special_effects_color} @{special_effects_points_of_origin}}}';

            if (!isUndefinedOrEmpty(v[`${repeatingString}type`]) && v[`${repeatingString}type`] !== 'Ranged' && v[`${repeatingString}type`] !== 'Melee') {
              finalSetAttrs[`${repeatingString}special_effects_type`] = v[`${repeatingString}type`];
            }
            if (!isUndefinedOrEmpty(v[`${repeatingString}color`])) {
              finalSetAttrs[`${repeatingString}special_effects_color`] = v[`${repeatingString}color`];
            }
            if (!isUndefinedOrEmpty(v[`${repeatingString}points_of_origin`])) {
              finalSetAttrs[`${repeatingString}special_effects_points_of_origin`] = v[`${repeatingString}points_of_origin`];
            }
          }
        }
      },
    });
  }
  critDamage() {
    getSetRepeatingItems('upgrade.critDamage', {
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
  }
  oldValueToNew(v, finalSetAttrs, repeatingString, newRepeatingString, field) {
    if (typeof v[`${repeatingString}${field}`] !== 'undefined') {
      finalSetAttrs[`${newRepeatingString}${field}`] = v[`${repeatingString}${field}`];
    }
  }
  resourcesToTraits() {
    getSetRepeatingItems('upgrade.resourcesToTraits', {
      repeatingItems: ['repeating_resource'],
      collectionArrayAddItems: ['name', 'uses', 'uses_max', 'toggle_details', 'recharge', 'extras_toggle', 'freetext', 'freeform'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        const fieldsToSwap = ['name', 'uses', 'uses_max', 'toggle_details', 'recharge', 'extras_toggle', 'freetext', 'freeform'];
        for (const id of ids) {
          for (const field of fieldsToSwap) {
            this.oldValueToNew(v, finalSetAttrs, `${repeatingItem}_${id}_`, `repeating_trait_${generateRowID()}_`, field);
          }
        }
      },
    });
  }
  classFeaturesToTraits() {
    getSetRepeatingItems('upgrade.classFeaturesToTraits', {
      repeatingItems: ['repeating_classfeature'],
      collectionArrayAddItems: ['name', 'uses', 'uses_max', 'recharge', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'extras_toggle', 'emote', 'freetext', 'freeform'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        const fieldsToSwap = ['name', 'uses', 'uses_max', 'recharge', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'extras_toggle', 'emote', 'freetext', 'display_text', 'freeform'];

        for (const id of ids) {
          for (const field of fieldsToSwap) {
            this.oldValueToNew(v, finalSetAttrs, `${repeatingItem}_${id}_`, `repeating_trait_${generateRowID()}_`, field);
          }
        }
      },
    });
  }
  updateWarlockMaxLevelOrdinal() {
    getSetItems('upgrade.updateWarlockMaxLevelOrdinal', {
      collectionArray: ['warlock_spells_max_level'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.warlock_spells_max_level = ordinalSpellLevel(getIntValue(v.warlock_spells_max_level));
      },
    });
  }
  spellsToRepeatingSectionsForEachLevel() {
    const collectionArrayAddItems = spells.conversionArray;
    getSetRepeatingItems('upgrade.spellsToRepeatingSectionsForEachLevel', {
      repeatingItems: ['repeating_spell'],
      collectionArrayAddItems,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const spellName = v[`${repeatingString}name`];
          if (!spellName) {
            removeRepeatingRow(`${repeatingItem}_${id}`);
            continue;
          }
          const newLevel = getIntValue(v[`${repeatingString}spell_level`]);
          const newRepeatingString = `repeating_spell${newLevel}_${generateRowID()}_`;
          for (const field of collectionArrayAddItems) {
            if (field === 'is_prepared') {
              if (v[`${repeatingString}is_prepared`] === 'on') {
                finalSetAttrs[`${newRepeatingString}is_prepared`] = 'Yes';
              } else {
                finalSetAttrs[`${newRepeatingString}is_prepared`] = 0;
              }
            } else {
              this.oldValueToNew(v, finalSetAttrs, repeatingString, newRepeatingString, field);
            }
          }
          removeRepeatingRow(`${repeatingItem}_${id}`);
        }
      },
    });
  }
  psionicsToRepeatingSectionsForEachLevel() {
    const collectionArrayAddItems = psionics.conversionArray;
    getSetRepeatingItems('upgrade.psionicsToRepeatingSectionsForEachLevel', {
      repeatingItems: ['repeating_psionics'],
      collectionArrayAddItems,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const psionicName = v[`${repeatingString}name`];
          if (!psionicName) {
            removeRepeatingRow(`${repeatingItem}_${id}`);
            continue;
          }
          const newLevel = getIntValue(v[`${repeatingString}power_level`]);
          const newRepeatingString = `repeating_psionic${newLevel}_${generateRowID()}_`;
          for (const field of collectionArrayAddItems) {
            this.oldValueToNew(v, finalSetAttrs, repeatingString, newRepeatingString, field);
          }
          removeRepeatingRow(`${repeatingItem}_${id}`);
        }
      },
    });
  }
  isPositiveInteger(x) {
    return /^\d+$/.test(x);
  }
  validateParts(parts) {
    for (let i = 0; i < parts.length; ++i) {
      if (!this.isPositiveInteger(parts[i])) {
        return false;
      }
    }
    return true;
  }
  versionCompare(v1, v2) {
    const v1parts = v1.split('.');
    const v2parts = v2.split('.');

    if (!this.validateParts(v1parts) || !this.validateParts(v2parts)) {
      return NaN;
    }
    for (let i = 0; i < v1parts.length; ++i) {
      if (v2parts.length === i) {
        return 1;
      }

      if (v1parts[i] === v2parts[i]) {
        continue;
      }
      if (v1parts[i] > v2parts[i]) {
        return 1;
      }
      return -1;
    }
    if (v1parts.length !== v2parts.length) {
      return -1;
    }
    return 0;
  }
  upgrade() {
    if (this.versionCompare(currentVersion, '2.1.0') < 0) {
      npc.updateChallenge();
      resistances.updateDamageVulnerabilities();
      resistances.updateDamageResistances();
      resistances.updateDamageImmunities();
      resistances.updateConditionImmunities();
      npc.updateLanguages();
      npc.updateSenses();
    }
    if (this.versionCompare(currentVersion, '2.1.3') < 0) {
      npc.updateType();
      character.updateAlignment();
    }
    if (this.versionCompare(currentVersion, '2.1.5') < 0) {
      npc.updateAC();
    }
    if (this.versionCompare(currentVersion, '2.1.10') < 0) {
      savingThrows.update();
    }
    if (this.versionCompare(currentVersion, '2.1.13') < 0) {
      equipment.weigh();
    }
    if (this.versionCompare(currentVersion, '2.1.15') < 0) {
      this.displayTextForTraits();
    }
    if (this.versionCompare(currentVersion, '2.2.2') < 0) {
      this.resourcesToTraits();
    }
    if (this.versionCompare(currentVersion, '2.2.5') < 0) {
      equipment.weighAmmo();
    }
    if (this.versionCompare(currentVersion, '2.2.6') < 0) {
      this.extasToExtrasFix('repeating_attack');
      this.extasToExtrasFix('repeating_action');
      this.extasToExtrasFix('repeating_spell');
    }
    if (this.versionCompare(currentVersion, '2.3.3') < 0) {
      attachers.update();
    }
    if (this.versionCompare(currentVersion, '2.4.2') < 0) {
      abilities.updateModifiers();
      actions.updateChatMacro('trait');
      actions.updateChatMacro('action');
      actions.updateChatMacro('reaction');
      actions.updateChatMacro('legendaryaction');
    }
    if (this.versionCompare(currentVersion, '2.4.3') < 0) {
      classFeatures.set();
    }
    if (this.versionCompare(currentVersion, '2.4.7') < 0) {
      this.classFeaturesToTraits();
    }
    if (this.versionCompare(currentVersion, '2.4.8') < 0) {
      this.fixRollTwo();
    }
    if (this.versionCompare(currentVersion, '2.4.12') < 0) {
      this.armorPlusDexRemoval();
      equipment.updateArmor();
    }
    if (this.versionCompare(currentVersion, '3.1.0') < 0) {
      attacks.updateChatMacro();
    }
    if (this.versionCompare(currentVersion, '3.2.1') < 0) {
      this.critDamage();
    }
    if (this.versionCompare(currentVersion, '3.2.3') < 0) {
      resistances.updateDamageResistancesVar();
    }
    if (this.versionCompare(currentVersion, '3.5.1') < 0) {
      spells.updateSlots();
    }
    if (this.versionCompare(currentVersion, '3.6.1') < 0) {
      npc.updateHD();
      npc.switchTo();
    }
    if (this.versionCompare(currentVersion, '4.1.4') < 0) {
      this.armorAbility();
      this.actionComponents();
      this.skillAbility();
    }
    if (this.versionCompare(currentVersion, '4.1.5') < 0) {
      abilityChecks.updateSkill();
    }
    if (this.versionCompare(currentVersion, '4.2.0') < 0) {
      character.updateD20Mod();
    }
    if (this.versionCompare(currentVersion, '4.2.1') < 0) {
      this.actionComponentsToRemoveExtraFields();
      abilityChecks.updateMacro();
      this.removeToggleVar();
    }
    if (this.versionCompare(currentVersion, '4.2.3') < 0) {
      equipment.updateArmor();
    }
    if (this.versionCompare(currentVersion, '4.4.0') < 0) {
      savingThrows.updateCustomSavingThrows();
      this.newAttackToggle();
      spells.generateHigherLevelQueries();
    }
    if (this.versionCompare(currentVersion, '4.4.1') < 0) {
      this.newAbilityDefaults();
    }
    if (this.versionCompare(currentVersion, '4.4.2') < 0) {
      spells.updateShowHide();
    }
    if (this.versionCompare(currentVersion, '5.0.0') < 0) {
      this.spellToTranslations();
    }
    if (this.versionCompare(currentVersion, '5.0.3') < 0) {
      savingThrows.updateCustomSavingThrowToggle();
    }
    if (this.versionCompare(currentVersion, '5.0.4') < 0) {
      this.defaultAbility();
    }
    if (this.versionCompare(currentVersion, '5.0.6') < 0) {
      this.spellLevelForCantrips();
    }
    if (this.versionCompare(currentVersion, '5.2.3') < 0) {
      this.hideFreetext();
    }
    if (this.versionCompare(currentVersion, '6.0.1') < 0) {
      this.newAttackToggleTwo();
      spells.update();
      actions.updateAll();
    }
    if (this.versionCompare(currentVersion, '6.0.4') < 0) {
      this.spellEffectsNaming();
    }
    if (this.versionCompare(currentVersion, '6.1.1') < 0) {
      settings.updateShapedD20();
    }
    if (this.versionCompare(currentVersion, '6.1.3') < 0) {
      abilities.updateModifier('strength');
    }
    if (this.versionCompare(currentVersion, '6.11.6') < 0) {
      spells.updateWarlockSlots();
      spells.updateHasSpellSlots();
      spells.updateHasSpellPoints();
      this.updateWarlockMaxLevelOrdinal();
      psionics.updateShowHide();
      attacks.update();
      abilityChecks.updateInitiative();
      this.attackToggle('repeating_attack');
      this.attackToggle('repeating_action');
      this.attackToggle('repeating_reaction');
      this.attackToggle('repeating_legendaryaction');
    }
    if (this.versionCompare(currentVersion, '7.0.1') < 0) {
      this.spellsToRepeatingSectionsForEachLevel();
      this.psionicsToRepeatingSectionsForEachLevel();
      character.updateLevels();
    }
  }
}
