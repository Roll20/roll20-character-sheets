/* global on:false */

import { getSetItems, lowercaseDamageTypes } from './utilities';

export class resistances {
  updateDamageResistancesVar() {
    getSetItems('resistances.updateDamageResistancesVar', {
      collectionArray: ['damage_resistances_var', 'damage_vulnerabilities_exist', 'damage_resistances_exist', 'damage_immunities_exist', 'condition_immunities_exist'],
      callback: (v, finalSetAttrs) => {
        const resistancesVar = [];

        if (v.damage_vulnerabilities_exist) {
          resistancesVar.push('{{Damage Vulnerabilities=@{damage_vulnerabilities}}}');
        }
        if (v.damage_resistances_exist) {
          resistancesVar.push('{{Damage Resistances=@{damage_resistances}}}');
        }
        if (v.damage_immunities_exist) {
          resistancesVar.push('{{Damage Immunities=@{damage_immunities}}}');
        }
        if (v.condition_immunities_exist) {
          resistancesVar.push('{{Condition Immunities=@{condition_immunities}}}');
        }

        finalSetAttrs.damage_resistances_var = resistancesVar.join(' ');
      },
    });
  }
  updateDamageVulnerabilities() {
    getSetItems('resistances.updateDamageVulnerabilities', {
      collectionArray: ['damage_vulnerabilities'],
      callback: (v, finalSetAttrs) => {
        if (v.damage_vulnerabilities) {
          finalSetAttrs.damage_vulnerabilities_exist = 1;
          finalSetAttrs.damage_vulnerabilities = lowercaseDamageTypes(v.damage_vulnerabilities);
        } else {
          finalSetAttrs.damage_vulnerabilities_exist = 0;
        }
      },
    });
  }
  updateDamageResistances() {
    getSetItems('resistances.updateDamageResistances', {
      collectionArray: ['damage_resistances'],
      callback: (v, finalSetAttrs) => {
        if (v.damage_resistances) {
          finalSetAttrs.damage_resistances_exist = 1;
          finalSetAttrs.damage_resistances = lowercaseDamageTypes(v.damage_resistances);
        } else {
          finalSetAttrs.damage_resistances_exist = 0;
        }
      },
    });
  }
  updateDamageImmunities() {
    getSetItems('resistances.updateDamageImmunities', {
      collectionArray: ['damage_immunities'],
      callback: (v, finalSetAttrs) => {
        if (v.damage_immunities) {
          finalSetAttrs.damage_immunities_exist = 1;
          finalSetAttrs.damage_immunities = lowercaseDamageTypes(v.damage_immunities);
        } else {
          finalSetAttrs.damage_immunities_exist = 0;
        }
      },
    });
  }
  updateConditionImmunities() {
    getSetItems('resistances.updateConditionImmunities', {
      collectionArray: ['condition_immunities'],
      callback: (v, finalSetAttrs) => {
        if (v.condition_immunities) {
          finalSetAttrs.condition_immunities_exist = 1;
          finalSetAttrs.condition_immunities = lowercaseDamageTypes(v.condition_immunities);
        } else {
          finalSetAttrs.condition_immunities_exist = 0;
        }
      },
    });
  }
  setup() {
    on('change:damage_vulnerabilities change:damage_resistances change:damage_immunities change:condition_immunities', this.updateDamageResistancesVar());
    on('change:damage_vulnerabilities', this.updateDamageVulnerabilities());
    on('change:damage_resistances', this.updateDamageResistances());
    on('change:damage_immunities', this.updateDamageImmunities());
    on('change:condition_immunities', this.updateConditionImmunities());
  }
}
