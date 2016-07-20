import { isUndefinedOrEmpty } from './utilities';

const updateHD = (v, finalSetAttrs, hd) => {
  for (const key in hd) {
    if (hd.hasOwnProperty(key)) {
      if (hd[key] && hd[key] !== 0) {
        finalSetAttrs[`hd_${key}_max`] = hd[key];
        finalSetAttrs[`hd_${key}_query`] = '?{HD';
        for (let x = 1; x <= hd[key]; x++) {
          finalSetAttrs[`hd_${key}_query`] += `|${x}`;
        }
        finalSetAttrs[`hd_${key}_query`] += '}';
        finalSetAttrs[`hd_${key}_toggle`] = 1;
      } else {
        if (!isUndefinedOrEmpty(v[`hd_${key}_max`])) {
          finalSetAttrs[`hd_${key}_max`] = 0;
        }
        if (!isUndefinedOrEmpty(v[`hd_${key}_query`])) {
          finalSetAttrs[`hd_${key}_query`] = '';
        }
        if (exists(v[`hd_${key}_toggle`])) {
          finalSetAttrs[`hd_${key}_toggle`] = 0;
        }
      }
    }
  }
};

export { updateHD };
