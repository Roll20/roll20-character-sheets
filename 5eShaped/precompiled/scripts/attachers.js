/* on:false */

import { ABILITIES } from './constants';
import { getSetRepeatingItems } from './utilities';

const updateAttachers = () => {
  const collectionArray = ['attacher_initiative', 'attacher_death_saving_throw', 'attacher_hit_dice', 'attacher_attack', 'attacher_spell', 'attacher_skill', 'attacher_crit'];
  const itemsToPush = ['initiative', 'death_saving_throw', 'hit_dice', 'attack', 'spell', 'skill'];
  for (const ability of ABILITIES) {
    collectionArray.push(`attacher_${ability}_check`);
    collectionArray.push(`attacher_${ability}_saving_throw`);
    itemsToPush.push(`${ability}_check`);
    itemsToPush.push(`${ability}_saving_throw`);
  }

  getSetRepeatingItems('updateAttachers', {
    repeatingItems: ['repeating_attacher'],
    collectionArray,
    collectionArrayAddItems: ['name', 'freetext', 'freeform', 'crit_attacher'],
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
};

const attachersSetup = () => {
  on('change:repeating_attacher remove:repeating_attacher', () => {
    updateAttachers();
  });
};

export { attachersSetup, updateAttachers };
