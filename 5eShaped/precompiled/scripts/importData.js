/* global on:false, generateRowID:false */

import { getSetItems } from './utilities';
import { initialize } from './initialize';

export class importData {
  import() {
    getSetItems('importData.import', {
      collectionArray: ['import_data', 'version'],
      callback: (v, finalSetAttrs) => {
        if (v.import_data) {
          const importObject = JSON.parse(v.import_data);

          if (importObject.npc) {
            if (!v.version) {
              initialize.sheetOpened();
            }
            for (const prop in importObject.npc) {
              if (importObject.npc.hasOwnProperty(prop)) {
                finalSetAttrs[prop] = importObject.npc[prop];
              }
            }
          }
          if (importObject.spells) {
            importObject.spells.forEach(spell => {
              const repeatingString = `repeating_spell_${generateRowID()}_`;
              for (const prop in spell) {
                if (spell.hasOwnProperty(prop)) {
                  finalSetAttrs[`${repeatingString}${prop}`] = spell[prop];
                }
              }
            });
          }
          finalSetAttrs.import_data = '';
          finalSetAttrs.import_data_present = 'off';
        }
      },
    });
  }
  delete() {
    getSetItems('importData.delete', {
      collectionArray: ['import_data', 'version'],
      callback: (v, finalSetAttrs) => {
        const importObject = JSON.parse(v.import_data);
        if (importObject.npc && !v.version) {
          initialize.sheetOpened(); // NPC import will have wiped all the existing attributes
        }
        finalSetAttrs.import_data = '';
        finalSetAttrs.import_data_present = 'off';
      },
    });
  }
  setup() {
    on('change:accept_import', this.import);
    on('change:reject_import', this.delete);
  }
}
