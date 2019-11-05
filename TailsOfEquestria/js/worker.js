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

function getRollDiceCount(roll) {
  // Extract each die type used in the roll.
  var regex = /{(.+?)}k1/;
  var match = regex.exec(roll);
  if(match)
    roll = match[1];
  var dice = roll.split(',');

  // Count the number of each die type.
  var diceCount = {
    'D20': 0,
    'D12': 0,
    'D10': 0,
    'D8': 0,
    'D6': 0,
    'D4': 0
  };
  _.each(dice, die => {
    diceCount[die]++;
  });
  return diceCount;
}

/**
 * Gets the view for some dice value.
 * @param {string} roll
 * @return {string}
 */
function getRollView(roll) {
  var diceCount = getRollDiceCount(roll);

  // Produce the appropriate view based on the dice counts.
  var view = '';
  _.each(['D20', 'D12', 'D10', 'D8', 'D6', 'D4'], die => {
    var count = diceCount[die];
    if(view && count > 0)
      view += '+';

    if(count === 1)
      view += die;
    else if(count > 1)
      view += `${count}${die}`;
  });
  return view;
}

/**
 * Gets the upgraded/downgraded dice for a roll.
 * @param {string} roll
 *        The roll expression.
 * @param {int} steps
 *        Positive for upgrade, negative for downgrade.
 */
function getUpDowngradedRoll(roll, steps) {
  var diceCount = getRollDiceCount(roll);

  // Derive a numerical value for the dice that can be incremented up and down
  // by upgrades and downgrades.
  var diceValue = diceCount['D20']*6;
  var smallDice = ['', 'D4', 'D6', 'D8', 'D10', 'D12'];
  _.find(smallDice, (die, index) => {
    if(diceCount[die] > 0) {
      diceValue += index;
      return true;
    }
  });

  // Apply the upgrade/downgrade.
  diceValue = Math.max(1, diceValue + steps);

  // Change the value back into dice.
  var d20Count = Math.floor(diceValue/6);
  var smallDieIndex = diceValue%6;
  var smallDie = smallDice[smallDieIndex];

  // Compose the new roll string.
  var diceList = [];
  _.each(_.range(d20Count), i => {
    diceList.push('D20');
  });
  if(smallDie)
    diceList.push(smallDie);
  return `{${diceList.join(',')}}k1`;
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

  parseAttrs([prefix + '_name', prefix + '_dice', prefix + '_trait', prefix + '_updowngrade', 'body_equation', 'mind_equation', 'charm_equation'], values => {
    var talentName = values[prefix + '_name'];
    var talentDice = values[prefix + '_dice'];

    var trait = values[prefix + '_trait'];
    var traitDice = values[trait + '_equation'] || 'D0';

    var updown = parseInt(values[prefix + '_updowngrade']) || 0;

    // Apply upgrades/downgrades to talent dice.
    var talentDiceModified = talentDice;
    if(talentDice && updown)
      talentDiceModified = getUpDowngradedRoll(talentDice, updown);

    var talentDiceView = getRollView(talentDice);

    if(talentDiceModified === 'null')
      setAttrs({
        [prefix + '_equation']: 0,
        [prefix + '_readOnlyView']: `${talentName}(n/a)`
      });
    else {
      //var traitDice = values[trait];
      setAttrs({
        [prefix + '_equation']: `{${talentDiceModified},${traitDice}}k1`,
        [prefix + '_readOnlyView']: `${talentName}(${talentDiceView})`
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
    character_sheet: 'TailsOfEquestria v1.5'
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
