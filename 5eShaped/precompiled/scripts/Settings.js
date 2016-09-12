/* global on:false */

import { getSetItems } from './utilities';

export class Settings {
  updateShapedD20() {
    getSetItems('settings.updateShapedD20', {
      collectionArray: ['roll_setting', 'roll_info', 'shaped_d20'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.roll_info = '';
        finalSetAttrs.shaped_d20 = 'd20@{d20_mod}';

        if (v.roll_setting === 'adv {{ignore=[[0') {
          finalSetAttrs.roll_info = '{{advantage=1}}';
          finalSetAttrs.shaped_d20 = '2d20@{d20_mod}kh1';
        } else if (v.roll_setting === 'dis {{ignore=[[0') {
          finalSetAttrs.roll_info = '{{disadvantage=1}}';
          finalSetAttrs.shaped_d20 = '2d20@{d20_mod}kl1';
        }
      },
    });
  }

  setup() {
    on('change:roll_setting', () => {
      this.updateShapedD20();
    });
  }
}
