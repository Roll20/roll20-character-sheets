/* global on:false, getSetItems:false */

import { getSetItems } from './../../scripts/utilities';

export class Processing {
  close() {
    getSetItems('Processing.close', {
      collectionArray: ['processing'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.processing = '';
      },
    });
  }
  setup() {
    on('change:close_processing', () => {
      this.close();
    });
  }
}
