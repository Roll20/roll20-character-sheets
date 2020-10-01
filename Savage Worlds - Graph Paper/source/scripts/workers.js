
/* #############################################################################
VARIABLES
############################################################################# */

const dice = ['', 'd4', 'd6', 'd8', 'd10', 'd12'];

const renamedAbbr = ['rename_agi', 'rename_sma', 'rename_spi', 'rename_str', 'rename_vig'];

var parseCodes = { agi: '@{agility}!', sma: '@{smarts}!', spi: '@{spirit}!',
                   str: '@{strength}!', vig: '@{vigor}!' };

const parseDieCodes = { d4: 'd4!', d6: 'd6!', d8: 'd8!', d10: 'd10!', d12: 'd12!' };

/* #############################################################################
TRANSLATION SETUP
############################################################################# */

on("sheet:opened", function(e){
  // Translations for query strings
  setAttrs({
    'query_rate_of_fire': getTranslationByKey('query-rate-of-fire'),
    'query_modifier': getTranslationByKey('query-modifier'),
    'query_wild_die': getTranslationByKey('query-wild-die'),
    'query_roll_result': getTranslationByKey('query-roll-result'),
    'query_target_number': getTranslationByKey('query-target-number'),
    'query_damage_modifier': getTranslationByKey('query-damage-modifier'),
    'none': getTranslationByKey('none')
  });

  // Include renamed Trait abbreviations
  getAttrs(renamedAbbr, (values) => {
    parseCodes = { agi: '@{agility}!', sma: '@{smarts}!', spi: '@{spirit}!',
                   str: '@{strength}!', vig: '@{vigor}!' };

    _.each(renamedAbbr, (a) => {
      // Skip if not defined
      if (_.isUndefined(values[a])) return;

      // Remove erroneous whitsapces
      let v = values[a].replaceAll(' ', '').toLowerCase();

      // Skip if empty string
      if (v.length < 1) return;

      parseCodes[v] = parseCodes[a.replace('rename_', '')];
    });
  });
});

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

    // Replace abbreviations with attribute references (naive)
    _.each(_.keys(parseCodes), (k) => {
      code = code.replaceAll(`+${k}`, `+${parseCodes[k]}`);
      code = code.replaceAll(`-${k}`, `-${parseCodes[k]}`);
      code = code.replaceAll(`${k}+`, `${parseCodes[k]}+`);
      code = code.replaceAll(`${k}-`, `${parseCodes[k]}-`);
    });

    // Add exclamation mark (!) to make dice explode (naive)
    _.each(_.keys(parseDieCodes), (k) => {
      code = code.replaceAll(`${k}`, `${parseDieCodes[k]}`);
    });

    return code;
  },

  // Update the roll queries for a trait
  updateTraitRoll = function(trait) {
    let traitAttributes = [trait, `${trait}_wd`, `${trait}_mod`];

    // Get trait values: die, Wild Die, and modifier
    getAttrs(traitAttributes, (values) => {
      let die = values[trait],
          wd = values[`${trait}_wd`],
          ewd = '-10000', // Extra Wild Die
          mod = values[`${trait}_mod`] || '+ 0',
          untrained = '',
          code = toInt(values[`${trait}_mod`]);

      // Set up Wild Die
      if (dice.includes(wd) && wd != '') {
        wd = `1${wd}!cs2 `;
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
        code = code > 0 ? `+${code}` : code.toString();
      } else {
        code = '';
      }

      code = die + code;

      // Die (Wild Die)
      code = ewd != '-10000' ? `${code} (${values[`${trait}_wd`]})` : code;

      // Set up trait die
      die = `1${die}!cs2 `;

      // Build roll queries (including Wild Die for extras)
      let traitQuery = die + untrained,
          wdQuery = wd != '' ? wd + untrained : '',
          ewdQuery = ewd != '-10000' ? ewd + untrained : '-10000';

      setAttrs({ [`${trait}_roll`]: traitQuery,
                 [`${trait}_wd_roll`]: wdQuery,
                 [`${trait}_extra_wd_roll`]: ewdQuery,
                 [`${trait}_code`]: code });
    });
  },

  // Apply custom function to attributes in all rows of repeating section
  doWithRepList = function(section, attributes, func = (v) => { return v }) {
    let fullSection = section.includes('repeating_') ? section : `repeating_${section}`;

    attributes = _.isArray(attributes) ? attributes : [attributes];

    function process(idArray, attributes) {
      let attributeArray = [];

      // List of all requested attributes from all rows
      _.each(idArray, (id) => {
        _.each(attributes, (a) => {
          attributeArray.push(`${fullSection}_${id}_${a}`);
        });
      });

      getAttrs(attributeArray, (values) => {
        func(values); // Pass all attribute values to custom function
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

const skills = ['academics', 'athletics', 'battle', 'boating', 'common_knowledge',
                'driving', 'electronics', 'fighting', 'healing', 'intimidation',
                'magic', 'notice', 'performance', 'persuasion', 'piloting',
                'repair', 'research', 'riding', 'science', 'shooting', 'stealth',
                'survival', 'taunt', 'thievery', 'gambling', 'hacking', 'faith',
                'focus', 'language', 'occult', 'psionics', 'spellcasting',
                'weird_science', 'custom_skill_1', 'custom_skill_2', 'unskilled'];

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

const wildTraits = ['soak'].concat(attributes).concat(skills).map((s) => { return `${s}_wd` });

on('change:' + wildTraits.join(' change:'), (e) => {
  // Derive target attribute and check if input value is a valid die
  let value = _.isUndefined(e.newValue) ? '' : e.newValue;
  value = dice.includes(value) ? value : 'n/a';

  // Set attributes to new value, silent to avoid triggering worker again
  // but with a callback to update the attribute's roll query
  setAttrs({ [e.sourceAttribute]: value },
           { silent: true },
           TETRA.updateTraitRoll(e.sourceAttribute.replace('_wd', '')));
});

/* #############################################################################
NATURAL DICE
############################################################################# */

const naturalTraits = attributes.map((s) => { return `${s}_natural` });

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
  setAttrs({ [e.sourceAttribute]: value, ['run_roll']: runRoll },
           { silent: true });
});

/* #############################################################################
MODIFIERS
############################################################################# */
const modifiers = ['soak'].concat(attributes).concat(skills).map((s) => { return `${s}_mod` });

on('change:' + modifiers.join(' change:'), (e) => {
  // Parse input value as integer
  let value = TETRA.toInt(e.newValue, '');

  // Set 0 to empty
  value = value == 0 ? '' : value;

  // Positive or negative prefix (required for roll query)
  if (value != '') {
    let s = String(value);
    value = value > -1 && s.charAt(0) != '+' ? `+${s}` : s;
  }

  // Set attribute to new value, silent to avoid triggering worker again
  setAttrs({ [e.sourceAttribute]: value },
           { silent: true },
           TETRA.updateTraitRoll(e.sourceAttribute.replace('_mod', '')));
});

/* #############################################################################
SIMPLE STATISTICS
############################################################################# */

const simple = ['pace', 'flight', 'rads', 'power', 'power_consumed',
                'power_maximum', 'armor_head', 'armor_torso', 'armor_arms',
                'armor_legs', 'parry', 'toughness', 'integrity_maximum',
                'carry_weight_maximum'];

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

const woundToggles = _.range(1, 7).map((n) => { return `wound_toggle_${n.toString()}` });

on('change:wounds change:wound_mitigation change:' + woundToggles.join(' change:'), (e) => {
  let attributes = ['wounds', 'wound_mitigation'].concat(woundToggles);

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
      setters[`wound_toggle_${i}`] = 'on';
    };

    // Limit active wounds to active wound boxes
    if (values['wounds'] >= firstInactiveNumber) {
      setters['wounds'] = firstInactiveNumber - 1;
    } else {
      setters['wounds'] = values['wounds'];
    };

    // Update wound-mitigation
    let wm = isNaN(parseInt(values['wound_mitigation'])) ? '' : parseInt(values['wound_mitigation']);

    if (wm != '') {
      wm = wm < 0 ? 0 : wm;
    }

    setters['wound_mitigation'] = wm;

    wm = isNaN(wm) ? 0 : wm;

    // Update wound_mod
    let wmod = setters['wounds'] - wm;

    setters['wound_mod'] = wmod < 0 ? 0 : wmod;

    setAttrs(setters, { silent: true });
  });
});

/* #############################################################################
FATIGUE BOXES
############################################################################# */

const fatigueToggles = _.range(2, 4).map((n) => { return `fatigue_toggle_${n.toString()}` });

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
      setters[`fatigue_toggle_${i}`] = 'on';
    };

    // Limit active fatigue to active boxes
    if (values['fatigue'] >= firstInactiveNumber) {
      setters['fatigue'] = firstInactiveNumber - 1;
    } else {
      setters['fatigue'] = values['fatigue'];
    };

    // Update fatigue_mod
    let fmod = TETRA.toInt(setters['fatigue']);

    setters['fatigue_mod'] = fmod;

    setAttrs(setters, { silent: true });
  });
});

/* #############################################################################
AUTO SIZE EDGES + HINDRANCES
############################################################################# */

// 10px Roboto
// Since Roll20 does not allow DOM access, yes, this BS is necessary.
// Don't take this as something to learn from! Stars above, no!
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

on('change:repeating_features:feature_name', (e) => {
  let target = e.sourceAttribute.replace('_feature_name', '_feature_size');

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
  setters['integrity_bar_size'] = progress;

  // Set corresponding psychological states
  setters['discord'] = value < 70 ? 'on' : 'off';
  setters['dissonance'] = value < 60 ? 'on' : 'off';
  setters['psychosis'] = value < 50 ? 'on' : 'off';
  setters['alienation'] = value < 40 ? 'on' : 'off';
  setters['seizures'] = value < 30 ? 'on' : 'off';
  setters['derealization'] = value < 20 ? 'on' : 'off';
  setters['depersonalization'] = value < 10 ? 'on' : 'off';
  setters['ego_death'] = value < 1 ? 'on' : 'off';

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

on('change:repeating_powers:power_damage', (e) => {
  let code = TETRA.parseDiceCode(e.newValue);
  setAttrs({ [`${e.sourceAttribute}_roll`]: code }, { silent: true });
});

on('change:repeating_weapons', (e) => {
  if (e.sourceAttribute.includes('damage')) {
    let code = TETRA.parseDiceCode(e.newValue);
    setAttrs({ [`${e.sourceAttribute}_roll`]: code }, { silent: true });
  }

  if (e.sourceAttribute.includes('weight')) {
    TETRA.doWithRepList('weapons',
                        ['weapon_weight', 'weapon_weight_toggle'],
                        (v) => { colSum(v, 'carry_weight_weapons') });
  }
});

on('remove:repeating_weapons', (e) => {
  TETRA.doWithRepList('weapons',
                      ['weapon_weight', 'weapon_weight_toggle'],
                      (v) => { colSum(v, 'carry_weight_weapons') });
});

on('change:repeating_apparel', (e) => {
  if (e.sourceAttribute.includes('weight')) {
    TETRA.doWithRepList('apparel',
                        ['apparel_weight', 'apparel_weight_toggle'],
                        (v) => { colSum(v, 'carry_weight_apparel') });
  }
});

on('remove:repeating_apparel', (e) => {
  TETRA.doWithRepList('apparel',
                      ['apparel_weight', 'apparel_weight_toggle'],
                      (v) => { colSum(v, 'carry_weight_apparel') });
});

on('change:repeating_inventory', (e) => {
  if (e.sourceAttribute.includes('weight') || e.sourceAttribute.includes('amount')) {
    TETRA.doWithRepList('inventory',
                        ['inventory_weight', 'inventory_weight_toggle', 'inventory_amount'],
                        (v) => { colSum(v, 'carry_weight_inventory', true) });
  }
});

on('remove:repeating_inventory', (e) => {
  TETRA.doWithRepList('inventory',
                      ['inventory_weight', 'inventory_weight_toggle', 'inventory_amount'],
                      (v) => { colSum(v, 'carry_weight_inventory', true) });
});

const carryWeights = ['carry_weight_apparel', 'carry_weight_weapons',
                      'carry_weight_inventory', 'carry_weight_maximum'];

on('change:' + carryWeights.join(' change:'), (e) => {
  getAttrs(carryWeights, (value) => {
    let weapons = TETRA.toFloat(value['carry_weight_weapons']),
        apparel = TETRA.toFloat(value['carry_weight_apparel']),
        inventory = TETRA.toFloat(value['carry_weight_inventory']),
        total = (weapons + apparel + inventory).toFixed(1);

    setAttrs({ ['carry_weight']: total }, { silent: true });
  });
});

/* #############################################################################
LOSS
############################################################################# */

on('change:repeating_augmentations remove:repeating_augmentations', (e) => {
  TETRA.doWithRepList('augmentations',
                      ['augmentation_loss', 'augmentation_loss_toggle'],
                      (v) => { colSum(v, 'augmentations_total_loss') });
});

/* #############################################################################
INTEGRITY MOD
############################################################################# */

on('change:integrity_mod', (e) => {
  setAttrs({ ['integrity_mod']: TETRA.toInt(e.newValue, '') });
});

/* #############################################################################
INTEGRITY CALCULATION
############################################################################# */

on('change:augmentations_total_loss change:integrity_maximum change:integrity_mod', (e) => {
  getAttrs(['augmentations_total_loss', 'integrity_maximum', 'integrity_mod'], (values) => {
    let loss = TETRA.toFloat(values['augmentations_total_loss']),
        max = TETRA.toFloat(values['integrity_maximum'], 80),
        mod = TETRA.toFloat(values['integrity_mod']);

    setAttrs({ integrity: (max - loss + mod).toFixed(1) });
  });
});

/* #############################################################################
REAPTING VEHICLES & POWER ARMOR
############################################################################# */

on('change:repeating_vehicles change:repeating_powerarmors', (e) => {
  // Weapon count was changed
  if (e.sourceAttribute.includes('weapons_count')) {
    let value = TETRA.toInt(e.newValue, 0);

    // Value must be between 0 and 10
    value = value < 0 ? 0 : value;
    value = value > 10 ? 10 : value;

    setAttrs({ [e.sourceAttribute]: value }, { silent: true });
  }

  // Silhouette was changed
  if (e.sourceAttribute.includes('silhouette')) {
    let target = e.sourceAttribute.replace('_vehicle_silhouette_cycle', '_vehicle_silhouette');

    getAttrs([target], (values) => {
      let silhouette = TETRA.toInt(_.values(values)[0], 0);

      setAttrs({ [target]: (silhouette + 1) % 17 }, { silent: true });
    });
  }
});

/* #############################################################################
AMMUNITION & BUTTONS
############################################################################# */

const ammoMods = ['1', '3', '5', '10'];

function changeAmmo(triggerName) {
  let mod = TETRA.toInt(triggerName.replace('clicked:ammunition_', '')),
      attributes = ['ammunition_select',
                    'ammunition_container_1',
                    'ammunition_container_2',
                    'ammunition_container_3'];

  getAttrs(attributes, (values) => {
    let target = values['ammunition_select'],
        current = TETRA.toInt(values[target]); // The selector value is the attribute name of the box

    // Add ammunition modifier
    updated = current + mod;

    // No negative ammunition
    updated = updated < 0 ? 0 : updated;

    setAttrs({ [target]: updated }, { silent: true });
  });
}

on(`clicked:${ammoMods.map((s) => { return `ammunition_+${s}` }).join(' clicked:')}`, (e) => {
  changeAmmo(e.triggerName);
});

on(`clicked:${ammoMods.map((s) => { return `ammunition_-${s}` }).join(' clicked:')}`, (e) => {
  changeAmmo(e.triggerName);
});

on(`clicked:ammunition_set`, (e) => {
  getAttrs(['ammunition_select'], (value) => {
    let target = `${value['ammunition_select']}_max`;

    getAttrs([value['ammunition_select']], (current) => {
      update = TETRA.toInt(current[value['ammunition_select']]);

      setAttrs({ [target]: update }, { silent: true });
    });
  });
});

on(`clicked:ammunition_reset`, (e) => {
  getAttrs(['ammunition_select'], (value) => {
    let target = value['ammunition_select'];

    getAttrs([`${target}_max`], (max) => {
      update = TETRA.toInt(max[`${target}_max`]);

      setAttrs({ [target]: update }, { silent: true });
    });
  });
});

/* #############################################################################
REPEATING LIST LINKED SKILL ROLLS
############################################################################# */

function changeSkillRoll(e) {
  let target = e.sourceAttribute.replace('_skill_name', '_skill'),
      array = skills.map((s) => { return `rename_${s}` }); // All rename_<skill> attributes

  getAttrs(array, (values) => {
    // Find corresponding attribute
    let renameAttribute = Object.keys(values).find(key => values[key] === e.newValue),
        update = {};

    if (_.isUndefined(renameAttribute)) {
      update[e.sourceAttribute] = e.previousValue; // Reset if input is invalid
    } else {
      update[target] = `@{roll_full_${renameAttribute.replace('rename_', '')}}`;
    }

    setAttrs(update, { silent: true });
  });
}

on(`change:repeating_powers:power_skill_name`, (e) => {
  changeSkillRoll(e);
});

on(`change:repeating_weapons:weapon_skill_name`, (e) => {
  changeSkillRoll(e);
});

on(`change:repeating_engrams:engram_skill_name`, (e) => {
  changeSkillRoll(e);
});
