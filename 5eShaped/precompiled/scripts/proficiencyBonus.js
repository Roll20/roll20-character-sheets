/* global on:false */

import { getSetItems, getIntValue, exists } from './utilities';

const getPB = (level, challenge) => {
  let pb = 2;

  level = getIntValue(level);
  if (challenge === '1/8' || challenge === '1/4' || challenge === '1/2') {
    challenge = 1;
  } else {
    getIntValue(challenge);
  }
  const levelOrChallenge = Math.max(level, challenge);

  if (exists(levelOrChallenge)) {
    pb += Math.floor(Math.abs((levelOrChallenge - 1) / 4));
  }
  return pb;
};
const updatePb = () => {
  getSetItems('updatePb', {
    collectionArray: ['level', 'challenge', 'pb', 'exp', 'h_PB'],
    callback: (v, finalSetAttrs) => {
      const pb = getPB(v.level, v.challenge);
      finalSetAttrs.pb = pb;
      finalSetAttrs.exp = pb * 2;
      finalSetAttrs.h_PB = pb / 2;
    },
  });
};

const proficiencyBonusSetup = () => {
  on('change:level', () => {
    updatePb();
  });
};

export { proficiencyBonusSetup, getPB, updatePb };
