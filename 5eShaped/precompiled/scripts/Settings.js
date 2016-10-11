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
  updateWeightSystem() {
    getSetItems('settings.updateWeightSystem', {
      collectionArray: ['weight_system', 'weight_per_coin', 'carrying_capacity_multiplier', 'max_push_drag_lift_multiplier', 'encumbered_multiplier', 'heavily_encumbered_multiplier'],
      callback: (v, finalSetAttrs) => {
        console.log('updateWeightSystem', v);
        if (v.weight_system === 'pounds') {
          finalSetAttrs.weight_per_coin = .02;
          finalSetAttrs.carrying_capacity_multiplier = 15;
          finalSetAttrs.max_push_drag_lift_multiplier = 30;
          finalSetAttrs.encumbered_multiplier = 5;
          finalSetAttrs.heavily_encumbered_multiplier = 10;
        } else if (v.weight_system === 'kilograms') {
          finalSetAttrs.weight_per_coin = .00907;
          finalSetAttrs.carrying_capacity_multiplier = 6.8;
          finalSetAttrs.max_push_drag_lift_multiplier = 13.6;
          finalSetAttrs.encumbered_multiplier = 2.27;
          finalSetAttrs.heavily_encumbered_multiplier = 4.54;
        }
      },
    });
  }
  setup() {
    on('change:roll_setting', () => {
      this.updateShapedD20();
    });
    on('change:weight_system', () => {
      this.updateWeightSystem();
    });
  }
}
