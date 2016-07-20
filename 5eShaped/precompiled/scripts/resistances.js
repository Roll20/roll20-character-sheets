/* global on:false */

import { getSetItems, lowercaseDamageTypes } from './utilities';

const updateDamageResistancesVar = () => {
  getSetItems('updateDamageResistancesVar', {
    collectionArray: ['damage_resistances_var', 'damage_vulnerabilities_exist', 'damage_resistances_exist', 'damage_immunities_exist', 'condition_immunities_exist'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.damage_resistances_var = '';

      if (v.damage_vulnerabilities_exist) {
        finalSetAttrs.damage_resistances_var += '{{Damage Vulnerabilities=@{damage_vulnerabilities}}}';
      }
      if (v.damage_resistances_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Damage Resistances=@{damage_resistances}}}';
      }
      if (v.damage_immunities_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Damage Immunities=@{damage_immunities}}}';
      }
      if (v.condition_immunities_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Condition Immunities=@{condition_immunities}}}';
      }
    },
  });
};
const updateDamageVulnerabilities = () => {
  getSetItems('updateDamageVulnerabilities', {
    collectionArray: ['damage_vulnerabilities'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_vulnerabilities) {
        finalSetAttrs.damage_vulnerabilities_exist = 1;
        finalSetAttrs.damage_vulnerabilities = lowercaseDamageTypes(v.damage_vulnerabilities);
      } else {
        finalSetAttrs.damage_vulnerabilities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
const updateDamageResistances = () => {
  getSetItems('updateDamageResistances', {
    collectionArray: ['damage_resistances'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_resistances) {
        finalSetAttrs.damage_resistances_exist = 1;
        finalSetAttrs.damage_resistances = lowercaseDamageTypes(v.damage_resistances);
      } else {
        finalSetAttrs.damage_resistances_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
const updateDamageImmunities = () => {
  getSetItems('updateDamageImmunities', {
    collectionArray: ['damage_immunities'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_immunities) {
        finalSetAttrs.damage_immunities_exist = 1;
        finalSetAttrs.damage_immunities = lowercaseDamageTypes(v.damage_immunities);
      } else {
        finalSetAttrs.damage_immunities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
const updateConditionImmunities = () => {
  getSetItems('updateConditionImmunities', {
    collectionArray: ['condition_immunities'],
    callback: (v, finalSetAttrs) => {
      if (v.condition_immunities) {
        finalSetAttrs.condition_immunities_exist = 1;
        finalSetAttrs.condition_immunities = lowercaseDamageTypes(v.condition_immunities);
      } else {
        finalSetAttrs.condition_immunities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};

const resistancesSetup = () => {
  on('change:damage_vulnerabilities', () => {
    updateDamageVulnerabilities();
  });
  on('change:damage_resistances', () => {
    updateDamageResistances();
  });
  on('change:damage_immunities', () => {
    updateDamageImmunities();
  });
  on('change:condition_immunities', () => {
    updateConditionImmunities();
  });
};


export { resistancesSetup, updateDamageResistancesVar, updateDamageVulnerabilities, updateDamageResistances, updateDamageImmunities, updateConditionImmunities };
