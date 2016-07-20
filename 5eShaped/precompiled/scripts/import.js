/* global on:false, generateRowID:false */

import { getSetItems } from './utilities';
import { sheetOpened } from './initialize.js';

const importData = () => {
  getSetItems('importData', {
    collectionArray: ['import_data', 'version'],
    callback: (v, finalSetAttrs) => {
      if (v.import_data) {
        const importObject = JSON.parse(v.import_data);

        if (importObject.npc) {
          if (!v.version) {
            sheetOpened();
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
};

const deleteImportData = () => {
  getSetItems('deleteImportData', {
    collectionArray: ['import_data', 'version'],
    callback: (v, finalSetAttrs) => {
      const importObject = JSON.parse(v.import_data);
      if (importObject.npc && !v.version) {
        sheetOpened(); // NPC import will have wiped all the existing attributes
      }
      finalSetAttrs.import_data = '';
      finalSetAttrs.import_data_present = 'off';
    },
  });
};

const importSetup = () => {
  on('change:accept_import', importData);
  on('change:reject_import', deleteImportData);
};

export { importSetup };