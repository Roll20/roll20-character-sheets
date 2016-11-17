/* global on:false */

import { ABILITIES, CUSTOM_SAVING_THROWS } from './../../scripts/constants';
import { getSetRepeatingItems, exists } from './../../scripts/utilities';

export class Attachers {
  update() {
    let collectionArray = ['initiative', 'death_saving_throw', 'hit_dice', 'attack', 'spell', 'psionic', 'skill', 'crit'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_check`);
      collectionArray.push(`${ability}_saving_throw`);
    }
    for (const customSavingThrow of CUSTOM_SAVING_THROWS) {
      collectionArray.push(`${customSavingThrow}_saving_throw`);
    }
    for (let level = 0; level <= 9; level++) {
      collectionArray.push(`spell_level_${level}`);
      collectionArray.push(`psionic_level_${level}`);
    }
    const itemsToPush = collectionArray.slice(0); // copy the array
    collectionArray = collectionArray.map((attacher) => {
      return `attacher_${attacher}`;
    });

    getSetRepeatingItems('attachers.update', {
      repeatingItems: ['repeating_attacher'],
      collectionArray,
      collectionArrayAddItems: ['name', 'freetext', 'freeform'],
      itemsToPush,
      itemToPushSuffix: 'attacher',
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const itemToPush of itemsToPush) {
          finalSetAttrs[`attacher_${itemToPush}`] = '';
        }
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          for (const itemToPush of itemsToPush) {
            const attacher = v[`${repeatingString}${itemToPush}_attacher`];
            if (exists(attacher) && attacher === 'on') {
              const attacherName = v[`${repeatingString}name`] || '';

              const freeText = v[`${repeatingString}freetext`];
              if (exists(attacherName) && exists(freeText)) {
                const critAttacher = v[`${repeatingString}crit_attacher`];
                if (critAttacher === 'on') {
                  finalSetAttrs[`attacher_${itemToPush}`] += `{{crit_name=${attacherName}}} `;
                  finalSetAttrs[`attacher_${itemToPush}`] += `{{crit_text=${freeText}}} `;
                } else {
                  finalSetAttrs[`attacher_${itemToPush}`] += `{{${attacherName}=${freeText}}} `;
                }
              }
              const freeForm = v[`${repeatingString}freeform`];
              if (exists(freeForm)) {
                finalSetAttrs[`attacher_${itemToPush}`] += `${freeForm} `;
              }
            }
          }
        }
      },
    });
  }
  setup() {
    on('change:repeating_attacher remove:repeating_attacher', () => {
      this.update();
    });
  }
}
