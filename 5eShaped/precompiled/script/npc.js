import { getSetItems } from './utilities';

const updateType = () => {
  getSetItems('updateType', {
    collectionArray: ['type'],
    callback: (v, finalSetAttrs) => {
      if (v.type) {
        finalSetAttrs.type = v.type.toLowerCase();
      }
    },
  });
};
const updateSize = () => {
  getSetItems('updateSize', {
    collectionArray: ['size'],
    callback: (v, finalSetAttrs) => {
      const creatureSize = v.size || 'Large';
      const sizeToHdSize = {
        Tiny: 4,
        Small: 6,
        Medium: 8,
        Large: 10,
        Huge: 12,
        Gargantuan: 20,
      };
      finalSetAttrs.hit_die = `d${sizeToHdSize[creatureSize]}`;
    },
  });
};

export { updateType, updateSize };
