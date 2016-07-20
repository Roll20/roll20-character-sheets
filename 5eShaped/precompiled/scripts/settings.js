/* global on:false */

import { getSetItems } from './utilities';

const updateShapedD20 = () => {
  getSetItems('updateShapedD20', {
    collectionArray: ['roll_setting', 'roll_info', 'shaped_d20'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.roll_info = '';
      finalSetAttrs.shaped_d20 = 'd20';

      if (v.roll_setting === 'adv {{ignore=[[0') {
        finalSetAttrs.roll_info = '{{advantage=1}}';
        finalSetAttrs.shaped_d20 = '2d20@{d20_mod}kh1';
      } else if (v.roll_setting === 'dis {{ignore=[[0') {
        finalSetAttrs.roll_info = '{{disadvantage=1}}';
        finalSetAttrs.shaped_d20 = '2d20@{d20_mod}kl1';
      }
    },
  });
};

const settingsSetup = () => {
  on('change:roll_setting', () => {
    updateShapedD20();
  });
};

export { settingsSetup, updateShapedD20 };
