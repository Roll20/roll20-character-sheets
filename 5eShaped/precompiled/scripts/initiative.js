import { getSetItems, getIntValue, isUndefined, addArithmeticOperator, getAbilityValue, getAbilityShortName } from './utilities';
import { ABILITIES } from './constants';

const updateInitiative = () => {
  const collectionArray = ['initiative', 'initiative_ability', 'initiative_formula', 'initiative_bonus', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'global_check_bonus'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
    collectionArray.push(`${ability}_check_bonus`);
  }

  getSetItems('updateInitiative', {
    collectionArray,
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.initiative = 0;

      let initiativeAbility = v.initiative_ability;

      if (isUndefined(initiativeAbility)) {
        initiativeAbility = 'dexterity';
      }

      const abilityMod = getAbilityValue(v, initiativeAbility);
      if (exists(abilityMod)) {
        finalSetAttrs.initiative += abilityMod;
      }
      finalSetAttrs.initiative_formula = `${abilityMod}[${getAbilityShortName(initiativeAbility)}]`;

      const abilityCheckBonus = getIntValue(v[`${initiativeAbility}_check_bonus`]);
      if (exists(abilityCheckBonus)) {
        finalSetAttrs.initiative += abilityCheckBonus;
        finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, abilityCheckBonus)}[${getAbilityShortName(initiativeAbility)} check bonus]`;
      }

      const initiativeBonus = v.initiative_bonus;
      if (exists(initiativeBonus)) {
        if (!isNaN(initiativeBonus)) {
          finalSetAttrs.initiative += getIntValue(initiativeBonus);
        }
        finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, initiativeBonus)}[initiative bonus]`;
      }

      if (v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
        const remarkableAthlete = getIntValue(v.remarkable_athlete);
        if (exists(remarkableAthlete)) {
          finalSetAttrs.initiative += remarkableAthlete;
          finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, remarkableAthlete)}[remarkable athlete]`;
        }
      } else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
        const jackOfAllTrades = getIntValue(v.jack_of_all_trades);
        if (exists(jackOfAllTrades)) {
          finalSetAttrs.initiative += jackOfAllTrades;
          finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, jackOfAllTrades)}[jack of all trades]`;
        }
      }

      const globalCheckBonus = v.global_check_bonus;
      if (exists(globalCheckBonus)) {
        if (finalSetAttrs.initiative_formula) {
          finalSetAttrs.initiative_formula += ' + ';
        }
        finalSetAttrs.initiative_formula += '(@{global_check_bonus})[global check bonus]';
      }
    },
  });
};
const initiativeSetup = () => {
  const initiativeWatch = ['change:initiative_ability', 'change:initiative_bonus', 'change:jack_of_all_trades_toggle', 'change:jack_of_all_trades', 'change:remarkable_athlete_toggle', 'change:remarkable_athlete', 'change:global_check_bonus'];
  for (const ability of ABILITIES) {
    initiativeWatch.push(`change:${ability}_mod`);
    initiativeWatch.push(`change:${ability}_check_bonus`);
  }
  on(initiativeWatch.join(' '), () => {
    updateInitiative();
  });
};

export { updateInitiative, initiativeSetup };
