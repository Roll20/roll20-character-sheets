/* global on:false, generateRowID:false */
import { ABILITIES } from './../../scripts/constants';
import { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle } from './../../scripts/updateToggles';
import { Equipment } from './../equipment/Equipment';
const equipment = new Equipment();
import { getSetRepeatingItems, isUndefinedOrEmpty, setFinalAttrs, setCritDamage, sumRepeating, lowercaseDamageTypes, exists, getIntValue, getRepeatingInfo } from './../../scripts/utilities';

export class Attacks {
  findAmmo(name, callback) {
    let repeatingString;

    getSetRepeatingItems('attacks.findAmmo', {
      repeatingItems: ['repeating_ammo'],
      collectionArrayAddItems: ['name', 'qty'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          repeatingString = `${repeatingItem}_${id}_`;
          if (v[`${repeatingString}name`] === name) {
            callback(`@{${repeatingString}qty}`);
            return;
          }
        }
        console.warn(`cannot find ammo field by the name ${name}, adding it`);
        repeatingString = `${repeatingItem}_${generateRowID()}_`;
        finalSetAttrs[`${repeatingString}name`] = name;
        finalSetAttrs[`${repeatingString}qty`] = 20;
        callback(`@{${repeatingString}qty}`);
      },
    });
  }
  update(rowId) {
    const collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability', 'ammo_auto_use', 'base_dc', 'weight_system'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
    }

    getSetRepeatingItems('attacks.update', {
      repeatingItems: ['repeating_attack'],
      collectionArray,
      collectionArrayAddItems: ['name', 'type', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'ammo_toggle_var', 'ammo_field_name', 'ammo_used', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'modifiers', 'properties', 'weight', 'weight_system', 'parsed'],
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const attackName = v[`${repeatingString}name`];
          if (isUndefinedOrEmpty(attackName)) {
            return;
          }

          if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('modifiers') === -1) {
            const attackModifiers = v[`${repeatingString}modifiers`];
            if (exists(attackModifiers)) {
              const attackBonus = attackModifiers.replace(/.*(?:Melee|Ranged) Attacks \+(\d+).*/gi, '$1');
              const damageBonus = attackModifiers.replace(/.*(?:Melee|Ranged) Damage \+(\d+).*/gi, '$1');

              finalSetAttrs[`${repeatingString}attack_bonus`] = attackBonus;
              finalSetAttrs[`${repeatingString}damage_bonus`] = damageBonus;
              if (!finalSetAttrs[`${repeatingString}parsed`]) {
                finalSetAttrs[`${repeatingString}parsed`] = '';
              }
              finalSetAttrs[`${repeatingString}parsed`] += ' modifiers';
            }
          }
          if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('attackProperties') === -1) {
            const attackProperties = v[`${repeatingString}properties`];
            if (exists(attackProperties)) {
              if (attackProperties.indexOf('Reach') !== -1) {
                finalSetAttrs[`${repeatingString}reach`] = '10 ft';
              } else if (v[`${repeatingString}type`] === 'Melee Weapon') {
                finalSetAttrs[`${repeatingString}reach`] = '5 ft';
              }
              if (attackProperties.indexOf('Finesse') !== -1) {
                finalSetAttrs[`${repeatingString}attack_ability`] = 'finesse';
                finalSetAttrs[`${repeatingString}damage_ability`] = 'finesse';
              }
              if (!finalSetAttrs[`${repeatingString}parsed`]) {
                finalSetAttrs[`${repeatingString}parsed`] = '';
              }
              finalSetAttrs[`${repeatingString}parsed`] += ' attackProperties';
            }
          }

          const attackOptions = {
            globalAttackBonus: v.global_attack_bonus,
            globalAttackBonusLabel: 'global attack bonus',
            globalMeleeAttackBonus: v.global_melee_attack_bonus,
            globalRangedAttackBonus: v.global_ranged_attack_bonus,
            type: 'attack',
          };
          updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

          const ammoName = v[`${repeatingString}ammo_field_name`];
          const ammoUsed = getIntValue(v[`${repeatingString}ammo_used`], 1);
          if (!isUndefinedOrEmpty(ammoName)) {
            let ammoAutoUse;
            if (getIntValue(v.ammo_auto_use) === 1) {
              ammoAutoUse = 1;
            } else {
              ammoAutoUse = 0;
            }

            this.findAmmo(ammoName, (ammoQtyName) => {
              const setAmmo = {};
              setAmmo[`${repeatingString}ammo_toggle_var`] = `{{ammo=[[${ammoQtyName}-${ammoAutoUse * ammoUsed}]]}} {{ammo_name=${ammoName}}}`;
              setFinalAttrs(v, setAmmo, 'findAmmo');
            });
          }

          updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

          const damageOptions = {
            globalDamageBonus: v.global_damage_bonus,
            globalMeleeDamageBonus: v.global_melee_damage_bonus,
            globalRangedDamageBonus: v.global_ranged_damage_bonus,
            type: 'attack',
          };
          updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
          if (v.damage_type) {
            finalSetAttrs.damage_type = lowercaseDamageTypes(v.damage_type);
          }
          if (v.second_damage_type) {
            finalSetAttrs.second_damage_type = lowercaseDamageTypes(v.second_damage_type);
          }
          setCritDamage(v, finalSetAttrs, repeatingString);

          equipment.changeWeightSystem(v, finalSetAttrs, repeatingString);
        }
      },
    });
  }
  weigh() {
    const options = {
      collection: 'attack',
      toggle: 'carried',
      qty: 'qty',
    };
    const sumItems = [
      {
        fieldToAdd: 'weight',
        itemTotal: 'weight_total',
        totalField: 'weight_attacks',
      },
    ];
    sumRepeating(options, sumItems);
  }
  updateChatMacro() {
    getSetRepeatingItems('attacks.updateChatMacro', {
      repeatingItems: ['repeating_attack'],
      collectionArray: ['attacks_macro_var'],
      collectionArrayAddItems: ['name'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        finalSetAttrs.attacks_macro_var = '';

        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          let actionName = v[`${repeatingString}name`];
          if (actionName && actionName.length > 50) {
            actionName = `${actionName.substring(0, 50)}...`;
          }

          if (id !== ids[0]) {
            finalSetAttrs.attacks_macro_var += ', ';
          }

          finalSetAttrs.attacks_macro_var += `[${actionName}](~repeating_attack_${id}_attack)`;
        }
      },
    });
  }
  setup() {
    on('change:repeating_attack', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_attack', eventInfo);
      if (repeatingInfo && repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'qty' && repeatingInfo.field !== 'weight' && repeatingInfo.field !== 'parsed') {
        this.update(repeatingInfo.row);
      }
    });
    on('change:pb, change:global_attack_bonus change:global_melee_attack_bonus change:global_ranged_attack_bonus change:global_damage_bonus change:global_melee_damage_bonus change:global_ranged_damage_bonus change:ammo_auto_use change:weight_system', () => {
      this.update();
    });
    on('change:repeating_attack:carried change:repeating_attack:qty change:repeating_attack:weight remove:repeating_attack', () => {
      this.weigh();
    });
    on('change:repeating_attack remove:repeating_attack', () => {
      this.updateChatMacro();
    });
  }
}
