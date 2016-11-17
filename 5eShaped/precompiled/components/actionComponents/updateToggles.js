import { TOGGLE_VARS } from './../../scripts/constants';
import { fromVOrFinalSetAttrs, getIntValue, getAbilityValue, addArithmeticOperator, getAbilityShortName, hasUpperCase, isUndefined, isUndefinedOrEmpty, exists, showSign } from './../../scripts/utilities';

const parseAttackComponent = (v, repeatingString, finalSetAttrs, options) => {
  let parsed = v[`${repeatingString}parsed`];

  if (isUndefinedOrEmpty(parsed)) {
    parsed = finalSetAttrs[`${repeatingString}parsed`];
  }

  if (isUndefinedOrEmpty(parsed) || parsed.indexOf(options.parseName) === -1) {
    let aTriggerFieldExists = false;

    if (options.triggerFields) {
      for (const triggerField of options.triggerFields) {
        if (!isUndefinedOrEmpty(v[`${repeatingString}${triggerField}`])) {
          aTriggerFieldExists = true;
        }
      }
    }
    if (aTriggerFieldExists && isUndefinedOrEmpty(v[repeatingString + options.toggleField])) {
      finalSetAttrs[repeatingString + options.toggleField] = options.toggleFieldSetTo;

      if (isUndefinedOrEmpty(finalSetAttrs[`${repeatingString}parsed`])) {
        finalSetAttrs[`${repeatingString}parsed`] = '';
      }
      finalSetAttrs[`${repeatingString}parsed`] += ` ${options.parseName}`;
    }
    if (options.attackAbility && isUndefined(v[`${repeatingString}attack_ability`])) {
      finalSetAttrs[`${repeatingString}attack_ability`] = getAbilityShortName(v.default_ability);
    }

    if (options.addCastingModifier) {
      if (!isUndefinedOrEmpty(v[`${repeatingString}damage`]) && isUndefined(v[`${repeatingString}damage_ability`])) {
        finalSetAttrs[`${repeatingString}damage_ability`] = getAbilityShortName(v.default_ability);
      }
      if (!isUndefinedOrEmpty(v[`${repeatingString}heal`]) && isUndefined(v[`${repeatingString}heal_ability`])) {
        finalSetAttrs[`${repeatingString}heal_ability`] = getAbilityShortName(v.default_ability);
      }
    }
    if (options.addSecondCastingModifier) {
      if (!isUndefinedOrEmpty(v[`${repeatingString}second_damage`]) && isUndefined(v[`${repeatingString}second_damage_ability`])) {
        finalSetAttrs[`${repeatingString}second_damage_ability`] = getAbilityShortName(v.default_ability);
      }
    }
  }
};
const updateAttackToggle = (v, finalSetAttrs, repeatingString, options) => {
  parseAttackComponent(v, repeatingString, finalSetAttrs, {
    attackAbility: options.attackAbility,
    parseName: 'attackToggle',
    toggleField: 'roll_toggle',
    toggleFieldSetTo: TOGGLE_VARS.roll,
    triggerFields: ['type', 'attack_bonus'],
  });

  let attackFormula = '';
  const attackToggle = v[`${repeatingString}roll_toggle`];

  let toHit = 0;
  if (attackToggle === TOGGLE_VARS.roll) {
    const proficiency = v[`${repeatingString}proficiency`];
    if (!proficiency || proficiency === 'on') {
      const pb = getIntValue(v.pb);
      toHit += pb;
      attackFormula += `${pb}[proficient]`;
    }

    let attackAbility = v[`${repeatingString}attack_ability`];

    if (isUndefined(attackAbility) && v[`${repeatingString}type`] === 'Melee Weapon') {
      attackAbility = 'strength';
      finalSetAttrs[`${repeatingString}attack_ability`] = attackAbility;
    } else if (isUndefined(attackAbility) && v[`${repeatingString}type`] === 'Ranged Weapon') {
      attackAbility = 'dexterity';
      finalSetAttrs[`${repeatingString}attack_ability`] = attackAbility;
    } else if (finalSetAttrs[`${repeatingString}attack_ability`]) {
      attackAbility = finalSetAttrs[`${repeatingString}attack_ability`];
    }
    attackAbility = getAbilityValue(v, attackAbility);
    if (exists(attackAbility)) {
      toHit += attackAbility;
      attackFormula += `${addArithmeticOperator(attackFormula, attackAbility)}[${getAbilityShortName(v[`${repeatingString}attack_ability`])}]`;
    }

    const attackBonus = getIntValue(v[`${repeatingString}attack_bonus`]);
    if (exists(attackBonus)) {
      toHit += attackBonus;
      attackFormula += `${addArithmeticOperator(attackFormula, attackBonus)}[bonus]`;
    }

    if (exists(options.globalAttackBonus)) {
      if (!isNaN(options.globalAttackBonus)) {
        toHit += getIntValue(options.globalAttackBonus);
      }
      attackFormula += `${addArithmeticOperator(attackFormula, options.globalAttackBonus)}[${options.globalAttackBonusLabel}]`;
    }

    if (v[`${repeatingString}type`] === 'Melee Weapon') {
      if (exists(options.globalMeleeAttackBonus)) {
        if (!isNaN(options.globalMeleeAttackBonus)) {
          toHit += getIntValue(options.globalMeleeAttackBonus);
        }
        attackFormula += `${addArithmeticOperator(attackFormula, options.globalMeleeAttackBonus)}[global melee attack bonus]`;
      }
    } else if (v[`${repeatingString}type`] === 'Ranged Weapon') {
      if (exists(options.globalRangedAttackBonus)) {
        if (!isNaN(options.globalRangedAttackBonus)) {
          toHit += getIntValue(options.globalRangedAttackBonus);
        }
        attackFormula += `${addArithmeticOperator(attackFormula, options.globalRangedAttackBonus)}[global ranged attack bonus]`;
      }
    }
    finalSetAttrs[`${repeatingString}attack_formula`] = attackFormula;
  }
  if (options.type === 'attack') {
    finalSetAttrs[`${repeatingString}to_hit`] = showSign(toHit);
  }
};
const updateSavingThrowToggle = (v, finalSetAttrs, repeatingString, options) => {
  parseAttackComponent(v, repeatingString, finalSetAttrs, {
    parseName: 'savingThrowToggle',
    toggleField: 'saving_throw_toggle',
    toggleFieldSetTo: TOGGLE_VARS.saving_throw,
    triggerFields: ['saving_throw_bonus', 'saving_throw_vs_ability'],
  });
  if (fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}saving_throw_toggle`) === TOGGLE_VARS.saving_throw) {
    let savingThrowDC = getIntValue(v.base_dc) + getIntValue(v.pb);
    let savingThrowAbility = v[`${repeatingString}saving_throw_ability`];
    if (isUndefined(savingThrowAbility) && v.default_ability) {
      savingThrowAbility = getAbilityShortName(v.default_ability);
      finalSetAttrs[`${repeatingString}saving_throw_ability`] = getAbilityShortName(v.default_ability);
    }

    savingThrowDC += getAbilityValue(v, savingThrowAbility);
    if (options && options.bonusDC) {
      savingThrowDC += getIntValue(options.bonusDC);
    }
    savingThrowDC += getIntValue(v[`${repeatingString}saving_throw_bonus`]);
    finalSetAttrs[`${repeatingString}saving_throw_dc`] = savingThrowDC;
  }
};
const updateDamageToggle = (v, finalSetAttrs, repeatingString, options) => {
  parseAttackComponent(v, repeatingString, finalSetAttrs, {
    addCastingModifier: exists(v[`${repeatingString}add_casting_modifier`]),
    parseName: 'damageToggle',
    toggleField: 'damage_toggle',
    toggleFieldSetTo: TOGGLE_VARS.damage,
    triggerFields: ['damage', 'damage_ability', 'damage_bonus', 'damage_type'],
  });

  let damageString = '';
  let damageFormula = '';
  const damageToggle = v[`${repeatingString}damage_toggle`];
  let damageAbility = v[`${repeatingString}damage_ability`];
  let damageType;

  if (!damageToggle || damageToggle === TOGGLE_VARS.damage) {
    let damageAddition = 0;

    const damage = v[`${repeatingString}damage`];
    if (exists(damage)) {
      damageString += damage;
      damageFormula += `${damage}[damage]`;
    }

    if (isUndefined(damageAbility) && v[`${repeatingString}type`] === 'Melee Weapon') {
      damageAbility = 'strength';
      finalSetAttrs[`${repeatingString}damage_ability`] = damageAbility;
    } else if (isUndefined(damageAbility) && v[`${repeatingString}type`] === 'Ranged Weapon') {
      damageAbility = 'dexterity';
      finalSetAttrs[`${repeatingString}damage_ability`] = damageAbility;
    }
    if (exists(damageAbility)) {
      const damageAbilityValue = getAbilityValue(v, damageAbility);
      if (exists(damageAbilityValue)) {
        damageAddition += damageAbilityValue;
        damageFormula += `${addArithmeticOperator(damageFormula, damageAbilityValue)}[${getAbilityShortName(v[`${repeatingString}damage_ability`])}]`;
      }
    }

    const damageBonus = getIntValue(v[`${repeatingString}damage_bonus`]);
    if (exists(damageBonus)) {
      damageAddition += damageBonus;
      damageFormula += `${addArithmeticOperator(damageFormula, damageBonus)}[bonus]`;
    }

    if (exists(options.globalDamageBonus)) {
      if (!isNaN(options.globalDamageBonus)) {
        damageAddition += getIntValue(options.globalDamageBonus);
      } else {
        damageString += `${addArithmeticOperator(damageString, options.globalDamageBonus)}`;
      }
      damageFormula += `${addArithmeticOperator(damageFormula, options.globalDamageBonus)}[global damage bonus]`;
    }

    if (options && exists(options.globalMeleeDamageBonus) && (v[`${repeatingString}type`] === 'Melee Weapon')) {
      if (!isNaN(options.globalMeleeDamageBonus)) {
        damageAddition += getIntValue(options.globalMeleeDamageBonus);
      } else {
        damageString += `${addArithmeticOperator(damageString, options.globalMeleeDamageBonus)}`;
      }
      damageFormula += `${addArithmeticOperator(damageFormula, options.globalMeleeDamageBonus)}[global melee damage bonus]`;
    } else if (options && exists(options.globalRangedDamageBonus) && v[`${repeatingString}type`] === 'Ranged Weapon') {
      if (!isNaN(options.globalRangedDamageBonus)) {
        damageAddition += getIntValue(options.globalRangedDamageBonus);
      } else {
        damageString += `${addArithmeticOperator(damageString, options.globalRangedDamageBonus)}`;
      }
      damageFormula += `${addArithmeticOperator(damageFormula, options.globalRangedDamageBonus)}[global ranged damage bonus]`;
    }

    if (exists(damageAddition)) {
      damageString += addArithmeticOperator(damageString, damageAddition);
    }

    damageType = v[`${repeatingString}damage_type`];
    if (exists(damageType)) {
      if (hasUpperCase(damageType)) {
        damageType = damageType.toLowerCase();
        finalSetAttrs[`${repeatingString}damage_type`] = damageType;
      }
      damageString += ` ${damageType}`;
    }
  }
  if (!exists(damageFormula)) {
    damageFormula = 0;
  }
  finalSetAttrs[`${repeatingString}damage_formula`] = damageFormula;

  parseAttackComponent(v, repeatingString, finalSetAttrs, {
    addSecondCastingModifier: exists(v[`${repeatingString}add_second_casting_modifier`]),
    parseName: 'secondDamageToggle',
    toggleField: 'second_damage_toggle',
    toggleFieldSetTo: TOGGLE_VARS.second_damage,
    triggerFields: ['second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type'],
  });

  let secondDamageFormula = '';

  const secondDamageToggle = fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}second_damage_toggle`);
  if (secondDamageToggle === TOGGLE_VARS.second_damage) {
    let secondDamageAddition = 0;
    const secondDamage = v[`${repeatingString}second_damage`];
    if (exists(secondDamage)) {
      damageString += ` + ${secondDamage}`;
      secondDamageFormula += `${secondDamage}[second damage]`;
    }

    let secondDamageAbility = v[`${repeatingString}second_damage_ability`];
    if (exists(secondDamageAbility)) {
      secondDamageAbility = getAbilityValue(v, secondDamageAbility);
      if (exists(secondDamageAbility)) {
        secondDamageAddition += secondDamageAbility;
        secondDamageFormula += `${addArithmeticOperator(secondDamageFormula, secondDamageAbility)}[${getAbilityShortName(v[`${repeatingString}second_damage_ability`])}]`;
      }
    }

    const secondDamageBonus = getIntValue(v[`${repeatingString}second_damage_bonus`]);
    if (exists(secondDamageBonus)) {
      secondDamageAddition += secondDamageBonus;
      secondDamageFormula += `${addArithmeticOperator(secondDamageFormula, secondDamageBonus)}[bonus]`;
    }

    if (exists(secondDamageAddition)) {
      damageString += addArithmeticOperator(damageString, secondDamageAddition);
    }

    let secondDamageType = v[`${repeatingString}second_damage_type`];
    if (exists(secondDamageType)) {
      if (hasUpperCase(secondDamageType)) {
        secondDamageType = secondDamageType.toLowerCase();
        finalSetAttrs[`${repeatingString}second_damage_type`] = secondDamageType;
      }
      damageString += ` ${secondDamageType}`;
    }

    if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('damageProperties') === -1) {
      const damageProperties = v[`${repeatingString}properties`];
      if (exists(damageProperties)) {
        if (damageProperties.indexOf('Versatile') !== -1) {
          if (!exists(damageAbility)) {
            damageAbility = 'strength';
          }
          finalSetAttrs[`${repeatingString}second_damage_ability`] = damageAbility;
          finalSetAttrs[`${repeatingString}second_damage_type`] = damageType;
        }
        if (!finalSetAttrs[`${repeatingString}parsed`]) {
          finalSetAttrs[`${repeatingString}parsed`] = '';
        }
        finalSetAttrs[`${repeatingString}parsed`] += ' damageProperties';
      }
    }
  }
  if (!exists(secondDamageFormula)) {
    secondDamageFormula = 0;
  }
  finalSetAttrs[`${repeatingString}second_damage_formula`] = secondDamageFormula;
  if (options.type === 'attack') {
    finalSetAttrs[`${repeatingString}damage_string`] = damageString;
  }
};
const updateHealToggle = (v, finalSetAttrs, repeatingString) => {
  parseAttackComponent(v, repeatingString, finalSetAttrs, {
    addCastingModifier: exists(v[`${repeatingString}add_casting_modifier`]),
    parseName: 'healToggle',
    toggleField: 'heal_toggle',
    toggleFieldSetTo: TOGGLE_VARS.heal,
    triggerFields: ['heal', 'heal_query_toggle'],
  });
  let healFormula = '';
  const healToggle = v[`${repeatingString}heal_toggle`];
  if (healToggle === TOGGLE_VARS.heal) {
    if (!isUndefined(v[`${repeatingString}heal`])) {
      healFormula = '@{heal}[heal]';
    }
    if (!isUndefined(v[`${repeatingString}heal_ability`])) {
      const healAbility = getAbilityValue(v, v[`${repeatingString}heal_ability`]);
      healFormula += `${addArithmeticOperator(healFormula, healAbility)}[${getAbilityShortName(v[`${repeatingString}heal_ability`])}]`;
    }
    if (!isUndefined(v[`${repeatingString}heal_bonus`])) {
      const healBonus = getIntValue(v[`${repeatingString}heal_bonus`]);
      healFormula += `${addArithmeticOperator(healFormula, healBonus)}[bonus]`;
    }

    if (!isUndefined(v.global_spell_heal_bonus)) {
      if (healFormula) {
        healFormula += ' + ';
      }
      healFormula += '@{global_spell_heal_bonus}[global spell heal bonus]';
    }
    if (v[`${repeatingString}heal_query_toggle`] === TOGGLE_VARS.heal_query) {
      if (healFormula) {
        healFormula += ' + ';
      }
      healFormula += '@{heal_query_toggle}[query amount]';
    }

    finalSetAttrs[`${repeatingString}heal_formula`] = healFormula;
  }
};
const updateHigherLevelToggle = (v, finalSetAttrs, repeatingString) => {
  parseAttackComponent(v, repeatingString, finalSetAttrs, {
    addCastingModifier: exists(v[`${repeatingString}add_casting_modifier`]),
    parseName: 'higherLevelToggle',
    toggleField: 'higher_level_toggle',
    toggleFieldSetTo: TOGGLE_VARS.higher_level,
    triggerFields: ['higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal'],
  });

  const higherLevelToggle = v[`${repeatingString}higher_level_toggle`];
  if (exists(higherLevelToggle) && higherLevelToggle === TOGGLE_VARS.higher_level) {
    const spellLevel = getIntValue(v[`${repeatingString}spell_level`]);
    finalSetAttrs[`${repeatingString}higher_level_query`] = `@{higher_level_query_${spellLevel}}`;

    const damageToggle = v[`${repeatingString}damage_toggle`];
    if (damageToggle && damageToggle === TOGGLE_VARS.damage) {
      const higherLevelDamage = `((@{higher_level_query} - ${spellLevel}) * @{higher_level_dice})@{higher_level_die}[higher lvl]`;
      finalSetAttrs[`${repeatingString}damage_formula`] += addArithmeticOperator(finalSetAttrs[`${repeatingString}damage_formula`], higherLevelDamage);
      finalSetAttrs[`${repeatingString}damage_crit_formula`] = higherLevelDamage;
    }

    const secondDamageToggle = v[`${repeatingString}second_damage_toggle`];
    if (secondDamageToggle && secondDamageToggle === TOGGLE_VARS.second_damage) {
      const higherLevelSecondDamage = `((@{higher_level_query} - ${spellLevel}) * @{second_higher_level_dice})@{second_higher_level_die}[higher lvl]`;
      finalSetAttrs[`${repeatingString}second_damage_formula`] += addArithmeticOperator(finalSetAttrs[`${repeatingString}second_damage_formula`], higherLevelSecondDamage);
      finalSetAttrs[`${repeatingString}second_damage_crit_formula`] = higherLevelSecondDamage;
    }

    const healToggle = v[`${repeatingString}heal_toggle`];
    if (healToggle && healToggle === TOGGLE_VARS.heal) {
      if (finalSetAttrs[`${repeatingString}heal_formula`]) {
        finalSetAttrs[`${repeatingString}heal_formula`] += ' + ';
      }
      finalSetAttrs[`${repeatingString}heal_formula`] += `((@{higher_level_query} - ${spellLevel}) * @{higher_level_dice})@{higher_level_die}[higher lvl] + (@{higher_level_heal} * (@{higher_level_query} - ${spellLevel}))[higher lvl flat amount]`;
    }
  }
};

export { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle, updateHealToggle, updateHigherLevelToggle };
