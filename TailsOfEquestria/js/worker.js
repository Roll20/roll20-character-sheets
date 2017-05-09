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

function updateTalents() {
  updateCutieMarkTalent();

  getSectionIDs('repeating_talents', ids => {
    _.each(ids, id => {
      var prefix = 'repeating_talents_' + id;
      _updateTalents(prefix);
    });
  });
}

function _updateTalents(prefix) {
  parseAttrs([prefix + '_dice', prefix + '_trait', 'body', 'mind', 'charm'], values => {
    var talentDice = values[prefix + '_dice'];
    var trait = values[prefix + '_trait'];
    var traitDice = values[trait];

    if(talentDice === 'null' || !traitDice)
      setAttrs({
        [prefix + '_equation']: 0
      });
    else {
      var traitDice = values[trait];
      setAttrs({
        [prefix + '_equation']: talentDice + ' + ' + traitDice
      });
    }
  });
}

// Change events

on('change:repeating_talents', evt => {
  updateTalents();
});

onChange(['talent_cutieMark_dice', 'talent_cutieMark_trait'], () => {
  updateCutieMarkTalent();
});

onChange(['body', 'mind', 'charm'], () => {
  updateTalents();
});

on('sheet:opened', () => {
  setAttrs({
    character_sheet: 'TailsOfEquestria v1.0.0'
  });
  updateTalents();
});
