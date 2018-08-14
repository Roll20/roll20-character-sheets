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
  // If we just up-ticked or down-ticked the up/downgrade, then quit early
  // after handling that.
  if(_tickDowngrade(prefix) || _tickUpgrade(prefix))
    return;

  parseAttrs([prefix + '_dice', prefix + '_trait', prefix + '_updowngrade', 'body_equation', 'mind_equation', 'charm_equation'], values => {
    var talentDice = values[prefix + '_dice'];

    var trait = values[prefix + '_trait'];
    var traitDice = values[trait + '_equation'] || 'D0';

    var updown = parseInt(values[prefix + '_updowngrade']) || 0;

    // Apply upgrades/downgrades to talent dice.
    if(talentDice && updown)
      talentDice = getUpDowngradedRoll(talentDice, updown);

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

function updateTraits(cb) {
  _updateTrait('body', () => {
    _updateTrait('mind', () => {
      _updateTrait('charm', cb);
    });
  });
}

function _updateTrait(trait, cb) {
  parseAttrs([trait, trait + '_updowngrade'], values => {
    var traitDice = values[trait];
    if(traitDice === 'null')
      setAttrs({
        [trait + '_equation']: 0
      }, {}, cb);
    else {
      var updown = values[trait + '_updowngrade'] || 0;
      if(updown)
        traitDice = getUpDowngradedRoll(traitDice, updown);
      setAttrs({
        [trait + '_equation']: traitDice
      }, {}, cb);
    }
  });
}

function _tickDowngrade(prefix) {
  parseAttrs([prefix + '_tickdown', prefix + '_updowngrade'], values => {
    let checked = !!values[prefix + '_tickdown'];
    if(checked) {
      updown = parseInt(values[prefix + '_updowngrade']) || 0;

      setAttrs({
        [prefix + '_updowngrade']: updown - 1,
        [prefix + '_tickdown']: 0
      });
      return true;
    }
    return false;
  });
}

function _tickUpgrade(prefix) {
  parseAttrs([prefix + '_tickup', prefix + '_updowngrade'], values => {
    let checked = !!values[prefix + '_tickup'];
    if(checked) {
      updown = parseInt(values[prefix + '_updowngrade']) || 0;

      setAttrs({
        [prefix + '_updowngrade']: updown + 1,
        [prefix + '_tickup']: 0
      });
      return true;
    }
    return false;
  });
}

// Change events

on('change:repeating_talents', evt => {
  updateTalents();
});

onChange(['talent_cutieMark_dice', 'talent_cutieMark_trait', 'talent_cutieMark_updowngrade', 'talent_cutieMark_tickup', 'talent_cutieMark_tickdown'], () => {
  updateCutieMarkTalent();
});

onChange(['talent_racial_dice', 'talent_racial_trait', 'talent_racial_updowngrade', 'talent_racial_tickup', 'talent_racial_tickdown'], () => {
  updateRacialTalent();
});

onChange(['body_equation', 'mind_equation', 'charm_equation'], () => {
  updateTalents();
});

on('sheet:opened', () => {
  setAttrs({
    character_sheet: 'TailsOfEquestria v1.4'
  });
  updateTraits(() => {
    updateTalents();
  });
});

// Up/downgrade tick events
onChange(['body_tickup'], () => {
  _tickUpgrade('body');
});

onChange(['body_tickdown'], () => {
  _tickDowngrade('body');
});

onChange(['body', 'body_updowngrade'], () => {
  _updateTrait('body');
});

onChange(['mind_tickup'], () => {
  _tickUpgrade('mind');
});

onChange(['mind_tickdown'], () => {
  _tickDowngrade('mind');
});

onChange(['mind', 'mind_updowngrade'], () => {
  _updateTrait('mind');
});

onChange(['charm_tickup'], () => {
  _tickUpgrade('charm');
});

onChange(['charm_tickdown'], () => {
  _tickDowngrade('charm');
});

onChange(['charm', 'charm_updowngrade'], () => {
  _updateTrait('charm');
});
