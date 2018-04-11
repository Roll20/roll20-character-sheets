/**
 * Forces an update on a list of numerical fields, also making sure that
 * any undefined fields are set to 0.
 * @param {string[]} attrs
 * @param {function} cb
 */
function forceUpdate(attrs, cb) {
  parseAttrs(attrs, values => {
    let tempValues = {};
    _.each(attrs, attr => {
      tempValues[attr] = -9999;
    });
    setAttrs(tempValues);
    setAttrs(values);
  });
}

var rollSteps = [
  'D4',
  'D6',
  'D8',
  'D10',
  'D12',
  'D20',
  '{D20,D4}k1',
  '{D20,D6}k1',
  '{D20,D8}k1',
  '{D20,D10}k1',
  '{D20,D12}k1',
  '{D20,D20}k1',
  '{D20,D20,D4}k1',
  '{D20,D20,D6}k1',
  '{D20,D20,D8}k1',
  '{D20,D20,D10}k1',
  '{D20,D20,D12}k1',
  '{D20,D20,D20}k1'
];

/**
 * Gets the upgraded/downgraded dice for a roll.
 * @param {string} roll
 *        The roll expression.
 * @param {int} steps
 *        Positive for upgrade, negative for downgrade.
 */
function getUpDowngradedRoll(roll, steps) {
  let index = rollSteps.indexOf(roll) + steps;
  index = Math.max(0, Math.min(index, rollSteps.length-1));
  return rollSteps[index];
}

function onChange(attrs, cb) {
  attrs = _.map(attrs, attr => {
    return 'change:' + attr;
  }).join(' ');
  on(attrs, cb);
}

function onChangeParse(attrs, cb) {
  onChange(attrs, () => {
    parseAttrs(attrs, cb);
  });
}

/**
 * Gets the specified attributes and parses them as an integer or 0.
 */
function parseAttrs(attrs, cb) {
  getAttrs(attrs, function(values) {
    _.each(attrs, function(attr) {
      if(_.isUndefined(values[attr]))
        values[attr] = 0;
      else if(!isNaN(values[attr]))
        values[attr] = parseInt(values[attr]);
    });
    cb(values);
  });
}

function updateCutieMarkTalent() {
  var prefix = 'talent_cutieMark';
  _updateTalents(prefix);
}

function updateRacialTalent() {
  var prefix = 'talent_racial';
  _updateTalents(prefix);
}

function updateTalents() {
  updateCutieMarkTalent();
  updateRacialTalent();

  getSectionIDs('repeating_talents', ids => {
    _.each(ids, id => {
      var prefix = 'repeating_talents_' + id;
      _updateTalents(prefix);
    });
  });
}

function _updateTalents(prefix) {
  parseAttrs([prefix + '_dice', prefix + '_trait', prefix + '_upgrade', prefix + '_downgrade', 'body', 'mind', 'charm'], values => {
    var talentDice = values[prefix + '_dice'];

    var trait = values[prefix + '_trait'];
    var traitDice = values[trait] || 'D0';

    var upgrade = values[prefix + '_upgrade'] || 0;
    var downgrade = values[prefix + '_downgrade'] || 0;
    var updownSum = parseInt(upgrade) - parseInt(downgrade);

    // Apply upgrades/downgrades to talent dice.
    if(talentDice && updownSum)
      talentDice = getUpDowngradedRoll(talentDice, updownSum);
    if(traitDice && traitDice !== '0' && updownSum)
      traitDice = getUpDowngradedRoll(traitDice, updownSum);

    if(talentDice === 'null')
      setAttrs({
        [prefix + '_equation']: 0
      });
    else {
      //var traitDice = values[trait];
      setAttrs({
        [prefix + '_equation']: `{${talentDice},${traitDice}}k1`
      });
    }
  });
}

// Change events

on('change:repeating_talents', evt => {
  updateTalents();
});

onChange(['talent_cutieMark_dice', 'talent_cutieMark_trait', 'talent_cutieMark_upgrade', 'talent_cutieMark_upgrade', 'talent_cutieMark_downgrade'], () => {
  updateCutieMarkTalent();
});

onChange(['talent_racial_dice', 'talent_racial_trait', 'talent_racial_upgrade', 'talent_racial_upgrade', 'talent_racial_downgrade'], () => {
  updateRacialTalent();
});

onChange(['body', 'mind', 'charm'], () => {
  updateTalents();
});

on('sheet:opened', () => {
  setAttrs({
    character_sheet: 'TailsOfEquestria v1.2'
  });
  updateTalents();
});
