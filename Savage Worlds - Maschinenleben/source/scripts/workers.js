
/* #############################################################################
CONSTANTS
############################################################################# */

const dice = ['', 'd4', 'd6', 'd8', 'd10', 'd12'];

const parseCodes = { agi: '@{agility}!', sma: '@{smarts}!', spi: '@{spirit}!',
                     str: '@{strength}!', vig: '@{vigor}!', d4: 'd4!', d6: 'd6!',
                     d8: 'd8!', d10: 'd10!', d12: 'd12!' };

/* #############################################################################
CUSTOM SHEET FUNCTIONS
############################################################################# */

var TETRA = TETRA || ( function() {
  'use strict';
  var version = '1.0',

  // Parse and evaluate float number
  toFloat = function(number, old = 0.0) {
    let n = parseFloat(number);
    n = _.isUndefined(n) ? old : n;

    return isNaN(n) ? old : n;
  },

  // Parse and evaluate integer number
  toInt = function(number, old = 0) {
    let n = parseInt(number);
    n = _.isUndefined(n) ? old : n;

    return isNaN(n) ? old : n;
  },

  parseDiceCode = function(code) {
    code = code.toLowerCase();

    _.each(_.keys(parseCodes), (k) => {
      code = code.replace(k, parseCodes[k]);
    });

    return code;
  },

  // Update the roll queries for a trait
  updateTraitRoll = function(trait) {
    let traitAttributes = [trait, trait + '-wd', trait + '-mod'];

    // Get trait values: die, Wild Die, and modifier
    getAttrs(traitAttributes, (values) => {
      let die = values[trait],
          wd = values[trait + '-wd'],
          ewd = '-10000',
          mod = values[trait + '-mod'] || '+ 0',
          untrained = '',
          code = toInt(values[trait + '-mod']);

      // Set up Wild Die
      if (dice.includes(wd) && wd != '') {
        wd = '1' + wd + '!cs2 ';
        ewd = wd;
      } else if (wd == '') {
        wd = '1d6!cs2 ';
      } else {
        wd = '-10000'; // Rolltemplate will not show results below -1000
      }

      // Account for untrained skill
      if (die == 'd4-2') {
        die = 'd4';
        code -= 2;
        untrained = ' - 2 ';
      }

      if (code != 0) {
        code = code > 0 ? '+' + code : code.toString();
      } else {
        code = '';
      }

      code = die + code;

      code = ewd != '-10000' ? code + ' (' + values[trait + '-wd'] + ')' : code;

      // Set up trait die
      die = '1' + die + '!cs2 ';

      // Build roll queries (including Wild Die for extras)
      let traitQuery = die + untrained,
          wdQuery = wd != '' ? wd + untrained : '',
          ewdQuery = ewd != '-10000' ? ewd + untrained : '-10000';

      setAttrs({ [trait + '-roll']: traitQuery,
                 [trait + '-wd-roll']: wdQuery,
                 [trait + '-extra-wd-roll']: ewdQuery,
                 [trait + '-code']: code });
    });
  },

  // Apply custom function to attributes in all rows of repeating section
  doWithRepList = function(section, attributes, func = (v) => { return v }) {
    let fullSection = section.includes('repeating_') ? section : 'repeating_' + section;

    attributes = _.isArray(attributes) ? attributes : [attributes];

    function process(idArray, attributes) {
      let attributeArray = [];

      // List of all requested attributes from all rows
      _.each(idArray, (id) => {
        _.each(attributes, (a) => {
          attributeArray.push(fullSection + '_' + id + '_' + a);
        });
      });

      getAttrs(attributeArray, (values) => {
        func(values); // Pass all attributes values to custom function
      });
    }

    getSectionIDs(fullSection, (idArray) => {
      process(idArray, attributes);
    });
  };

  return {
    updateTraitRoll: updateTraitRoll,
    doWithRepList: doWithRepList,
    toFloat: toFloat,
    toInt: toInt,
    parseDiceCode: parseDiceCode
  };
}());

/* #############################################################################
ATTRIBUTE DICE (AND SOAK)
############################################################################# */

const attributes = ['agility', 'smarts', 'spirit', 'strength', 'vigor'];

on('change:soak change:' + attributes.join(' change:'), (e) => {
  // Derive target attribute and check if input value is a valid die
  let value = _.isUndefined(e.newValue) ? 'd4' : e.newValue;
  value = dice.includes(value) && value != '' ? value : 'd4';

  // Set attributes to new value, silent to avoid triggering worker again
  // but with a callback to update the attribute's roll query
  setAttrs({ [e.sourceAttribute]: value },
           { silent: true },
           TETRA.updateTraitRoll(e.sourceAttribute));
});

/* #############################################################################
SKILL DICE
############################################################################# */

const skills = ['academics', 'athletics', 'battle', 'boating', 'common-knowledge',
                'driving', 'electronics', 'fighting', 'healing', 'intimidation',
                'magic', 'notice', 'performance', 'persuasion', 'piloting',
                'repair', 'research', 'riding', 'science', 'shooting', 'stealth',
                'survival', 'taunt', 'thievery', 'gambling', 'hacking', 'faith',
                'focus', 'language', 'occult', 'psionics', 'spellcasting',
                'weird-science', 'custom-skill-1', 'custom-skill-2'];

const skillDice = ['d4-2', 'd4', 'd6', 'd8', 'd10', 'd12'];

on('change:' + skills.join(' change:'), (e) => {
  // Derive target attribute and check if input value is a valid die
  let value = _.isUndefined(e.newValue) ? 'd4-2' : e.newValue;
  value = skillDice.includes(value) ? value : 'd4-2';

  // Set attributes to new value, silent to avoid triggering worker again
  // but with a callback to update the attribute's roll query
  setAttrs({ [e.sourceAttribute]: value },
           { silent: true },
           TETRA.updateTraitRoll(e.sourceAttribute));
});

/* #############################################################################
WILD DICE
############################################################################# */

const wildTraits = ['soak'].concat(attributes).concat(skills).map((s) => { return s + '-wd' });

on('change:' + wildTraits.join(' change:'), (e) => {
  // Derive target attribute and check if input value is a valid die
  let value = _.isUndefined(e.newValue) ? '' : e.newValue;
  value = dice.includes(value) ? value : 'n/a';

  // Set attributes to new value, silent to avoid triggering worker again
  // but with a callback to update the attribute's roll query
  setAttrs({ [e.sourceAttribute]: value },
           { silent: true },
           TETRA.updateTraitRoll(e.sourceAttribute.replace('-wd', '')));
});

/* #############################################################################
NATURAL DICE
############################################################################# */

const naturalTraits = attributes.map((s) => { return s + '-natural' });

on('change:' + naturalTraits.join(' change:'), (e) => {
  // Check if new value is valid
  let value = dice.includes(e.newValue) ? e.newValue : '';
  value = _.isUndefined(e.newValue) ? 'd4' : value;

  // Set attributes to new value, silent to avoid triggering worker again
  setAttrs({ [e.sourceAttribute]: value }, { silent: true });
});

/* #############################################################################
RUN DIE
############################################################################# */

on('change:run', (e) => {
  // Check if run value is a valid die
  let value = dice.includes(e.newValue) ? e.newValue : '';

  // Update run die
  value = _.isUndefined(e.newValue) ? '' : value;

  // Update run roll
  let runRoll = value != '' ? value : 'd6';

  // Set attributes to new values, silent to avoid triggering worker again
  setAttrs({ [e.sourceAttribute]: value, ['run-roll']: runRoll },
           { silent: true });
});

/* #############################################################################
MODIFIERS
############################################################################# */
const modifiers = ['soak'].concat(attributes).concat(skills).map((s) => { return s + '-mod' });

on('change:' + modifiers.join(' change:'), (e) => {
  // Parse input value as integer
  let value = TETRA.toInt(e.newValue, '');

  // Set 0 to empty
  value = value == 0 ? '' : value;

  // Positive or negative prefix (required for roll query)
  if (value != '') {
    let s = String(value);
    value = value > -1 && s.charAt(0) != '+' ? '+' + s : s;
  }

  // Set attribute to new value, silent to avoid triggering worker again
  setAttrs({ [e.sourceAttribute]: value },
           { silent: true },
           TETRA.updateTraitRoll(e.sourceAttribute.replace('-mod', '')));
});

/* #############################################################################
SIMPLE STATISTICS
############################################################################# */

const simple = ['pace', 'flight', 'rads', 'power', 'power-consumed',
                'power-max', 'armor-head', 'armor-torso', 'armor-arms',
                'armor-legs', 'parry', 'toughness', 'integrity-max',
                'carry-weight-max'];

on('change:' + simple.join(' change:'), (e) => {
  // Parse input value as integer unless it is empty
  let value = TETRA.toInt(e.newValue, '');

  // Cannot be smaller than zero
  if (value != '') {
    value = value < 0 ? 0 : value;
  }

  // Set attribute to new value, silent to avoid triggering worker again
  setAttrs({ [e.sourceAttribute]: value }, { silent: true });
});

/* #############################################################################
WOUND BOXES
############################################################################# */

const woundToggles = _.range(1, 7).map((n) => { return 'wound-toggle-' + n });

on('change:wounds change:wound-mitigation change:' + woundToggles.join(' change:'), (e) => {
  let attributes = ['wounds', 'wound-mitigation'].concat(woundToggles);

  // Get all relevant attributes
  getAttrs(attributes, (values) => {
    let setters = {};

    // Get first inactive wound box
    let firstInactiveWound = _.find(woundToggles, (ws) => {
      return values[ws] == 'on';
    });

    // Get number of first inactive wound box
    let firstInactiveNumber = (() => {
      if (_.isUndefined(firstInactiveWound)) {
        return 100;
      }

      let number = parseInt(firstInactiveWound.split('').pop());
      return _.isUndefined(number) ? 100 : number;
    })();

    // Deactive all subsequent wound boxes
    for (var i = firstInactiveNumber + 1; i < 7; ++i) {
      setters['wound-toggle-' + i] = 'on';
    };

    // Limit active wounds to active wound boxes
    if (values['wounds'] >= firstInactiveNumber) {
      setters['wounds'] = firstInactiveNumber - 1;
    } else {
      setters['wounds'] = values['wounds'];
    };

    // Update wound-mitigation
    let wm = isNaN(parseInt(values['wound-mitigation'])) ? '' : parseInt(values['wound-mitigation']);

    if (wm != '') {
      wm = wm < 0 ? 0 : wm;
    }

    setters['wound-mitigation'] = wm;

    wm = isNaN(wm) ? 0 : wm;

    // Update wound-mod
    let wmod = setters['wounds'] - wm;

    setters['wound-mod'] = wmod < 0 ? 0 : wmod;

    setAttrs(setters, { silent: true });
  });
});

/* #############################################################################
FATIGUE BOXES
############################################################################# */

const fatigueToggles = _.range(2, 4).map((n) => { return 'fatigue-toggle-' + n.toString() });

on('change:fatigue change:' + fatigueToggles.join(' change:'), (e) => {
  let attributes = ['fatigue'].concat(fatigueToggles);

  // Get all relevant attributes
  getAttrs(attributes, (values) => {
    let setters = {};

    // Get first inactive box
    let firstInactiveBox = _.find(fatigueToggles, (fs) => {
      return values[fs] == 'on';
    });

    // Get number of first inactive box
    let firstInactiveNumber = (() => {
      if (_.isUndefined(firstInactiveBox)) {
        return 100;
      }

      let number = parseInt(firstInactiveBox.split('').pop());
      return _.isUndefined(number) ? 100 : number;
    })();

    // Deactive all subsequent boxes
    for (var i = firstInactiveNumber + 1; i < 4; ++i) {
      setters['fatigue-toggle-' + i] = 'on';
    };

    // Limit active fatigue to active boxes
    if (values['fatigue'] >= firstInactiveNumber) {
      setters['fatigue'] = firstInactiveNumber - 1;
    } else {
      setters['fatigue'] = values['fatigue'];
    };

    // Update fatigue-mod
    let fmod = TETRA.toInt(setters['fatigue']);

    setters['fatigue-mod'] = fmod;

    setAttrs(setters, { silent: true });
  });
});

/* #############################################################################
AUTO SIZE EDGES + HINDRANCES
############################################################################# */

// 10px Roboto
const letters = { 'A': 6.53, 'a': 5.45, 'B': 6.23, 'b': 5.63, 'C': 6.52,
                  'c': 5.23, 'D': 6.56, 'd': 5.64, 'E': 6.69, 'e': 5.31,
                  'F': 5.53, 'f': 3.48, 'G': 6.81, 'g': 5.63, 'H': 7.14,
                  'h': 5.52, 'I': 2.72, 'i': 2.44, 'J': 5.53, 'j': 2.39,
                  'K': 6.28, 'k': 5.08, 'L': 5.39, 'l': 2.44, 'M': 8.73,
                  'm': 8.77, 'N': 7.14, 'n': 5.53, 'O': 6.88, 'o': 5.70,
                  'P': 6.31, 'p': 5.63, 'Q': 6.88, 'q': 5.69, 'R': 6.17,
                  'r': 3.39, 'S': 5.94, 's': 5.16, 'T': 5.97, 't': 3.28,
                  'U': 6.48, 'u': 5.52, 'V': 6.38, 'v': 4.84, 'W': 8.88,
                  'w': 7.52, 'X': 6.28, 'x': 4.97, 'Y': 8.88, 'y': 7.52,
                  'Z': 6.28, 'z': 4.97, '#': 6.17, '&': 6.22, '(': 3.42,
                  ')': 3.48, '+': 5.67, '-': 2.77, '=': 5.50, '*': 4.31,
                  '!': 2.58, '.': 2.64, ',': 1.97, '@': 8.98, ' ': 2.48,
                  '?': 4.73, '_': 4.52, '%': 7.33, 'Ä': 6.53, 'ä': 5.45,
                  'Ö': 6.88, 'ö': 5.70, 'Ü': 6.48, 'ü': 5.52, 'ß': 5.95,
                  '°': 3.75, '<': 5.09, '>': 5.23, '[': 2.66, ']': 2.66,
                  '{': 3.39, '}': 3.39, '$': 5.63, '"': 3.20 };

on('change:repeating_features:feature-name', (e) => {
  let target = e.sourceAttribute.replace('_feature-name', '_feature-size');

  getAttrs([e.sourceAttribute], (value) => {
    // Split string into array
    let chars = value[Object.keys(value)[0]].split(''),
        stringWidth = 0.0;

    // Sum up the width of each character
    _.each(chars, (c) => {
      stringWidth += _.has(letters, c) ? letters[c] : 5.0;
    });

    // Remove decimal points by rounding up
    stringWidth = Math.ceil(stringWidth);

    let offset = 4 - (stringWidth % 4),
        elementWidth = stringWidth + offset;

    // Maximum/minimum width
    elementWidth = elementWidth > 180 ? 180 : elementWidth;
    elementWidth = elementWidth < 32 ? 32 : elementWidth;

    setAttrs({ [target]: elementWidth }, { silent: true });
  });
});

/* #############################################################################
LOSS PROGRESS
############################################################################# */

on('change:integrity', (e) => {
  // Parse as float or keep old value if invalid
  let value = TETRA.toFloat(e.newValue, e.previousValue),
      progress = Math.ceil(value),
      setters = { integrity: value.toFixed(1) };

  // Bar can only take numbers between 0 and 80
  progress = progress > 80 ? 80 : progress;
  progress = progress < 0 ? 0 : progress;
  setters['integrity-bar-size'] = progress;

  // Set corresponding psychological states
  setters['discord'] = value < 70 ? 'on' : 'off';
  setters['dissonance'] = value < 60 ? 'on' : 'off';
  setters['psychosis'] = value < 50 ? 'on' : 'off';
  setters['alienation'] = value < 40 ? 'on' : 'off';
  setters['seizures'] = value < 30 ? 'on' : 'off';
  setters['derealization'] = value < 20 ? 'on' : 'off';
  setters['depersonalization'] = value < 10 ? 'on' : 'off';
  setters['ego-death'] = value < 1 ? 'on' : 'off';

  setAttrs(setters, { silent: true });
});

/* #############################################################################
REPEATING WEIGHT & DAMAGE
############################################################################# */

function colSum(values, target, multi = false) {
  let sum = 0.0;

  // Turn into two-dimensional array
  values = Object.entries(values);

  // Continue to remove items from the array
  while (values.length > 0) {
    // Values must be in order of weight, toggle, multiplier!
    let value = TETRA.toFloat(values.shift()[1]),
        toggle = values.shift()[1],
        multiplier = 1;

    if (multi) {
      multiplier = TETRA.toInt(values.shift()[1]);
    }

    sum += toggle == 'on' ? value * multiplier : 0.0;
  }

  setAttrs({ [target]: sum.toFixed(1) });
}

on('change:repeating_weapons', (e) => {
  if (e.sourceAttribute.includes('damage')) {
    let code = TETRA.parseDiceCode(e.newValue);
    setAttrs({ [e.sourceAttribute + '-roll']: code }, { silent: true });
  }

  if (e.sourceAttribute.includes('weight')) {
    TETRA.doWithRepList('weapons',
                        ['weapon-weight', 'weapon-weight-toggle'],
                        (v) => { colSum(v, 'carry-weight-weapons') });
  }
});

on('remove:repeating_weapons', (e) => {
  TETRA.doWithRepList('weapons',
                      ['weapon-weight', 'weapon-weight-toggle'],
                      (v) => { colSum(v, 'carry-weight-weapons') });
});

on('change:repeating_apparel', (e) => {
  if (e.sourceAttribute.includes('weight')) {
    TETRA.doWithRepList('apparel',
                        ['apparel-weight', 'apparel-weight-toggle'],
                        (v) => { colSum(v, 'carry-weight-apparel') });
  }
});

on('remove:repeating_apparel', (e) => {
  TETRA.doWithRepList('apparel',
                      ['apparel-weight', 'apparel-weight-toggle'],
                      (v) => { colSum(v, 'carry-weight-apparel') });
});

on('change:repeating_inventory', (e) => {
  if (e.sourceAttribute.includes('weight') || e.sourceAttribute.includes('amount')) {
    TETRA.doWithRepList('inventory',
                        ['inventory-weight', 'inventory-weight-toggle', 'inventory-amount'],
                        (v) => { colSum(v, 'carry-weight-inventory', true) });
  }
});

on('remove:repeating_inventory', (e) => {
  TETRA.doWithRepList('inventory',
                      ['inventory-weight', 'inventory-weight-toggle', 'inventory-amount'],
                      (v) => { colSum(v, 'carry-weight-inventory', true) });
});

const carryWeights = ['carry-weight-apparel', 'carry-weight-weapons',
                      'carry-weight-inventory', 'carry-weight-max'];

on('change:' + carryWeights.join(' change:'), (e) => {
  getAttrs(carryWeights, (value) => {
    let weapons = TETRA.toFloat(value['carry-weight-weapons']),
        apparel = TETRA.toFloat(value['carry-weight-apparel']),
        inventory = TETRA.toFloat(value['carry-weight-inventory']),
        total = (weapons + apparel + inventory).toFixed(1);

    setAttrs({ ['carry-weight']: total }, { silent: true });
  });
});

/* #############################################################################
LOSS
############################################################################# */

on('change:repeating_augmentations remove:repeating_augmentations', (e) => {
  TETRA.doWithRepList('augmentations',
                      ['augmentation-loss', 'augmentation-loss-toggle'],
                      (v) => { colSum(v, 'augmentations-total-loss') });
});

/* #############################################################################
INTEGRITY MOD
############################################################################# */

on('change:integrity-mod', (e) => {
  setAttrs({ ['integrity-mod']: TETRA.toInt(e.newValue, '') });
});

/* #############################################################################
INTEGRITY CALCULATION
############################################################################# */

on('change:augmentations-total-loss change:integrity-max change:integrity-mod', (e) => {
  getAttrs(['augmentations-total-loss', 'integrity-max', 'integrity-mod'], (values) => {
    let loss = TETRA.toFloat(values['augmentations-total-loss']),
        max = TETRA.toFloat(values['integrity-max'], 80),
        mod = TETRA.toFloat(values['integrity-mod']);

    setAttrs({ integrity: (max - loss + mod).toFixed(1) });
  });
});

/* #############################################################################
REAPTING VEHICLES & POWER ARMOR
############################################################################# */

on('change:repeating_vehicles change:repeating_powerarmors', (e) => {
  // Weapon count was changed
  if (e.sourceAttribute.includes('weapons-count')) {
    let value = TETRA.toInt(e.newValue, 0);

    // Value must be between 0 and 10
    value = value < 0 ? 0 : value;
    value = value > 10 ? 10 : value;

    setAttrs({ [e.sourceAttribute]: value }, { silent: true });
  }

  // Silhouette was changed
  if (e.sourceAttribute.includes('silhouette')) {
    let target = e.sourceAttribute.replace('_vehicle-silhouette-cycle', '_vehicle-silhouette');

    getAttrs([target], (values) => {
      let silhouette = TETRA.toInt(_.values(values)[0], 0);

      setAttrs({ [target]: (silhouette + 1) % 17 }, { silent: true });
    });
  }
});
