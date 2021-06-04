
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

on("sheet:opened", (e) => {
  // System & Updates
  getAttrs(['sheet_update'], (values) => {
    let updateNumber = values['sheet_update'];

    if (updateNumber == '0') {
      // Apply new macros and fields to Traits
      _.each(['soak'].concat(traitAttributes).concat(skills), (trait) => {
        TETRA.updateTraitRoll(trait);
      });

      function updateListSkills(values) {
        let references = [];

        _.each(Object.entries(values), (item) => {
          references.push(item[0].replace('skill_name', 'skill_mod'));
        });

        getAttrs(references, (vals) => {
          _.each(references, (item) => {
            let code = vals[item].replace('_mod', '_code');

            setAttrs({ [item.replace('skill_mod', 'skill_code')]: code }, { silent: true });
          });
        });
      }

      TETRA.doWithRepList('engrams', ['skill_name'], (v) => { updateListSkills(v) });
      TETRA.doWithRepList('powers', ['skill_name'], (v) => { updateListSkills(v) });
      TETRA.doWithRepList('weapons', ['skill_name'], (v) => { updateListSkills(v) });

      setAttrs({ ['sheet_update']: '1' });
    }
  });

  // Translations for query strings
  setAttrs({
    'query_rate_of_fire': getTranslationByKey('rate-of-fire'),
    'query_modifier': getTranslationByKey('modifier'),
    'query_wild_die': getTranslationByKey('wild-die'),
    'query_roll_result': getTranslationByKey('roll-result'),
    'query_target_number': getTranslationByKey('target-number'),
    'query_damage_modifier': getTranslationByKey('damage-modifier'),
    'query_bonus_wild_die': getTranslationByKey('bonus-wild-die'),
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
    if (_.isUndefined(code)) return '';

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
    let attributes = [trait, `${trait}_wd`, `${trait}_mod`, 'adjust_untrained'];

    // Get trait values: die, Wild Die, and modifier
    getAttrs(attributes, (values) => {
      let die = values[trait],
          wd = values[`${trait}_wd`],
          ewd = '-10000', // Extra Wild Die
          mod = values[`${trait}_mod`] || '0',
          untrained = '0',
          untrainedAdjust = toInt(values['adjust_untrained']),
          code = toInt(mod),
          full_code = ''; // Includes WD

      // Set up Wild Die
      if (dice.includes(wd) && wd != '') {
        ewd = wd;
      } else if (wd == '') {
        wd = 'd6';
      } else {
        wd = '-10000'; // Rolltemplate will not show results below -1000
      }

      // Account for untrained skill
      if (die == 'd4-2') {
        die = 'd4';
        code = code - (2 - untrainedAdjust);
        untrained = '-2@{adjust_untrained}';
      }

      // Stringify code
      if (code != 0) {
        code = code > 0 ? `+${code}` : code.toString();
      } else {
        code = '';
      }

      // Build base code
      code = die + code;

      // Add custom Wild Die to code
      full_code = ewd != '-10000' ? `${code} [${wd}]` : code;

      setAttrs({ [`${trait}_roll`]: die,
                 [`${trait}_wd_roll`]: wd,
                 [`${trait}_extra_wd_roll`]: ewd,
                 [`${trait}_untrained_mod`]: untrained,
                 [`${trait}_code`]: code,
                 [`${trait}_full_code`]: full_code });
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

const traitAttributes = ['agility', 'smarts', 'spirit', 'strength', 'vigor'];

on('change:soak change:' + traitAttributes.join(' change:'), (e) => {
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
                'weird_science', 'custom_skill_1', 'custom_skill_2', 'custom_skill_3',
                'custom_skill_4', 'custom_skill_5', 'custom_skill_6', 'unskilled'];

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

on('change:adjust_untrained', (e) => {
  _.each(skills, (skill) => {
    TETRA.updateTraitRoll(skill);
  });
});

/* #############################################################################
WILD DICE
############################################################################# */

const wildTraits = ['soak'].concat(traitAttributes).concat(skills).map((s) => { return `${s}_wd` });

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

const naturalTraits = traitAttributes.map((s) => { return `${s}_natural` });

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
const modifiers = ['soak'].concat(traitAttributes).concat(skills).map((s) => { return `${s}_mod` });

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
REPEATING WEIGHT
############################################################################# */

function twoColSum(values, target, multi = false) {
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
      multiplier = TETRA.toFloat(values.shift()[1]);
    }

    sum += toggle == 'on' ? value * multiplier : 0.0;
  }

  setAttrs({ [target]: sum.toFixed(1) });
}

on('remove:repeating_weapons change:repeating_weapons:weapon_weight change:repeating_weapons:weapon_weight_toggle', (e) => {
  TETRA.doWithRepList('weapons',
                      ['weapon_weight', 'weapon_weight_toggle'],
                      (v) => { twoColSum(v, 'carry_weight_weapons') });
});

on('remove:repeating_apparel change:repeating_apparel:apparel_weight change:repeating_apparel:apparel_weight_toggle', (e) => {
  TETRA.doWithRepList('apparel',
                      ['apparel_weight', 'apparel_weight_toggle'],
                      (v) => { twoColSum(v, 'carry_weight_apparel') });
});

on('remove:repeating_inventory change:repeating_inventory:inventory_weight change:repeating_inventory:inventory_weight_toggle change:repeating_inventory:inventory_amount', (e) => {
  TETRA.doWithRepList('inventory',
                      ['inventory_weight', 'inventory_weight_toggle', 'inventory_amount'],
                      (v) => { twoColSum(v, 'carry_weight_inventory', true) });
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
                      ['augmentation_loss', 'augmentation_loss_toggle', 'augmentation_multiplier'],
                      (v) => { twoColSum(v, 'augmentations_total_loss', true) });
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
REAPTING VEHICLE WEAPONS & SILHOUETTES
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
REPEATING LISTS & OPTIONS
############################################################################# */

const listItems = ['engram', 'power', 'weapon'];

on(listItems.map(s => `change:repeating_${s}s:${s}_damage`).join(' '), (e) => {
  let code = TETRA.parseDiceCode(e.newValue);

  code = code.replaceAll('!', '@{explode_damage}'); // Toggle exploding damage dice
  code = code == '' ? '0' : code;

  setAttrs({ [`${e.sourceAttribute}_roll`]: code }, { silent: true });
});

on(listItems.map(s => `change:repeating_${s}s:skill_name`).join(' '), (e) => {
  let array = skills.map((s) => { return `rename_${s}` }), // All rename_<skill> attributes
      id = e.sourceAttribute.replace('skill_name', '');

  getAttrs(array, (values) => {
    // Find corresponding attribute
    let renameAttribute = Object.keys(values).find(key => values[key] === e.newValue),
        update = {};

    if (_.isUndefined(renameAttribute)) {
      update[e.sourceAttribute] = e.previousValue; // Reset if input is invalid
    } else {
      update[`${id}skill_wd`] = `@{${renameAttribute.replace('rename_', '')}_wd}`;
      update[`${id}skill_mod`] = `@{${renameAttribute.replace('rename_', '')}_mod}`;
      update[`${id}skill_untrained_mod`] = `@{${renameAttribute.replace('rename_', '')}_untrained_mod}`;
      update[`${id}skill_roll`] = `@{${renameAttribute.replace('rename_', '')}_roll}`;
      update[`${id}skill_wd_roll`] = `@{${renameAttribute.replace('rename_', '')}_wd_roll}`;
      update[`${id}skill_extra_wd_roll`] = `@{${renameAttribute.replace('rename_', '')}_extra_wd_roll}`;
      update[`${id}skill_code`] = `@{${renameAttribute.replace('rename_', '')}_code}`;
    }

    setAttrs(update, { silent: true });
  });
});

on(listItems.map(s => `change:repeating_${s}s:skill_bonus`).join(' '), (e) => {
  let update = TETRA.toInt(e.newValue);

  update = update == 0 ? '' : update > 0 ? `+${update}` : update;

  setAttrs({ [e.sourceAttribute]: update }, { silent: true });
});

on(listItems.map(s => `change:repeating_${s}s:rof_override_toggle`).join(' '), (e) => {
  let d = e.sourceAttribute.includes('weapon') ? '@{weapon_rof}' : '1',
      update = e.newValue == 'on' ? `?{@{query_rate_of_fire}|${d}}` : '1',
      target = e.sourceAttribute.replace('_toggle', '');

  setAttrs({ [target]: update }, { silent: true });
});

on(listItems.map(s => `change:repeating_${s}s:wd_override_toggle`).join(' '), (e) => {
  let update = e.newValue == 'on' ? `{{wd=@{wd_override_die}}} {{wdroll=[[ @{wd_override_die}!cs2 + (@{skill_untrained_mod})[Untrained] + (@{skill_mod}+0)[Flat] + (@{skill_bonus}+0)[Bonus] - (@{fatigue_mod})[Fatigue] - (@{wound_mod})[Wounds] + (?{@{query_modifier}|0})[Modifier] ]]}}` : '',
      target = e.sourceAttribute.replace('_toggle', '');

  setAttrs({ [target]: update }, { silent: true });
});

on(listItems.map(s => `change:repeating_${s}s:roll_description_toggle`).join(' '), (e) => {
  let update = e.newValue == 'on' ? `@{roll_description_input}` : '',
      target = e.sourceAttribute.replace('_toggle', '');

  setAttrs({ [target]: update }, { silent: true });
});

on(listItems.map(s => `change:repeating_${s}s:roll_injection_toggle`).join(' '), (e) => {
  let update = e.newValue == 'on' ? `@{roll_injection_input}` : '',
      target = e.sourceAttribute.replace('_toggle', '');

  setAttrs({ [target]: update }, { silent: true });
});

on(listItems.map(s => `change:repeating_${s}s:explode_damage_toggle`).join(' '), (e) => {
  let update = e.newValue == 'on' ? '!' : ' ',
      target = e.sourceAttribute.replace('_toggle', '');

  setAttrs({ [target]: update }, { silent: true });
});

/* #############################################################################
HELPER BUTTONS
############################################################################# */

on('change:dice_roller_input', (e) => {
  let code = TETRA.parseDiceCode(e.newValue);

  setAttrs({ ['dice_roller_code']: code }, { silent: true });
});

/* #############################################################################
SETTINGS
############################################################################# */

on('change:toggle_global_rof', (e) => {
  let update = e.newValue == 'on' ? '?{@{query_rate_of_fire}|1}' : '1';

  setAttrs({ ['query_global_rof']: update }, { silent: true });
});

on('change:toggle_global_wd', (e) => {
  let update = e.newValue == 'on' ? '?{@{query_wild_die}|d8|d4|d6|d10|d12|@{none},-10000-d20}' : '-10000-d20';

  setAttrs({ ['query_global_wd']: update }, { silent: true });
});

on('change:toggle_global_bonus_wd', (e) => {
  let update = e.newValue == 'on' ? '?{@{query_bonus_wild_die}|d4|d6|d8|d10|d12|@{none},-10000-d20}' : '-10000-d20';

  setAttrs({ ['query_global_bonus_wd']: update }, { silent: true });
});

on('change:toggle_run_wounds', (e) => {
  let update = e.newValue == 'on' ? '0' : '@{wound_mod}';

  setAttrs({ ['run_wounds']: update }, { silent: true });
});

on('change:toggle_run_fatigue', (e) => {
  let update = e.newValue == 'on' ? '@{fatigue_mod}' : '0';

  setAttrs({ ['run_fatigue']: update }, { silent: true });
});

on('change:toggle_run_explode', (e) => {
  let update = e.newValue == 'on' ? '@{run_roll}!' : '@{run_roll}';

  setAttrs({ ['run_code']: update }, { silent: true });
});

on('change:toggle_halve_untrained', (e) => {
  let update = e.newValue == 'on' ? '+1' : '';

  setAttrs({ ['adjust_untrained']: update });
});
