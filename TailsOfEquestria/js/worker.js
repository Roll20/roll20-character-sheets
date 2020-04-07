(() => {
  'use strict';

  // A list of the dice, in descending order.
  let DICE_DESCENDING = ['D20', 'D12', 'D10', 'D8', 'D6', 'D4'];

  // Constant for a normal upgrade/downgrade. No special rules apply.
  let NORMAL_UPDOWNGRADE = 0;

  // Constant for when a D20 is upgraded. The player can choose to reroll the
  // D20 and use the new result.
  let SUPER_UPGRADE = 1;

  // Constant for when a D4 is downgraded. The player must reroll the D4 and
  // use the worst result.
  let SUPER_DOWNGRADE = 2;

  // Map upgrade/downgrade type constants to an upgrade/downgrade note.
  let UPDOWNGRADE_NOTES = {
    [NORMAL_UPDOWNGRADE]: '',
    [SUPER_UPGRADE]: 'Can choose to reroll D20. Must use new result.',
    [SUPER_DOWNGRADE]: 'Must reroll D4 and use lowest result.'
  };

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
    _.each(DICE_DESCENDING, die => {
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
   * @typedef {object} UpdownResult
   * @property {string} roll
   *           The modified roll expression.
   * @property {int} resultType
   *           One of SUPER_UPGRADE, SUPER_DOWNGRADE, or NORMAL_UPDOWNGRADE.
   */

  /**
   * Gets the upgraded/downgraded dice for a roll.
   * @param {string} roll
   *        The roll expression.
   * @param {int} steps
   *        Positive for upgrade, negative for downgrade.
   * @return {string}
   *        The dice expression for the upgraded/downgraded roll.
   */
  function getUpDowngradedRoll(roll, steps) {
    if (steps === 0)
      return roll;

    // Map each die to the number of times it is normally rolled.
    let diceCount = getRollDiceCount(roll);

    // Apply the upgrade or downgrade a number of times equal to the
    // unsigned steps. Stop early if we reach a rerollGood or rerollBad case.
    let rerollGood = false;
    let rerollBad = false;
    _.find(_.range(Math.abs(steps)), () => {
      // Determine the highest die in the roll.
      let highestDie = _.find(DICE_DESCENDING, die => {
        let count = diceCount[die];
        if (count > 0)
          return true;
      }) || 'D4';

      // Upgrade the highest die.
      if (steps > 0) {
        // If we're upgrading a D20, the player can choose to reroll.
        if (highestDie === 'D20') {
          rerollGood = true;
          return true;
        }

        // Otherwise, decrement the highest die's count and increment the count
        // for the die ranking above it.
        else {
          let nextIndex = DICE_DESCENDING.indexOf(highestDie) - 1;
          let nextDie = DICE_DESCENDING[nextIndex];

          diceCount[highestDie]--;
          diceCount[nextDie]++;
        }
      }

      // Downgrade the highest die.
      else {
        if (highestDie === 'D4') {
          // Drop a D4 if we have more than 1.
          if (diceCount['D4'] > 1)
            diceCount['D4']--;

          // If we're downgrading a lone D4, the player must reroll and use
          // the lowest result.
          else {
            rerollBad = true;
            return true;
          }
        }

        // If the highest die is not a D4, decrement its count and increment
        // the count of the die ranking below it.
        else {
          let nextIndex = DICE_DESCENDING.indexOf(highestDie) + 1;
          let nextDie = DICE_DESCENDING[nextIndex];

          diceCount[highestDie]--;
          diceCount[nextDie]++;
        }
      }
    });

    // Compose a new roll based on the modified dice count.
    let newDice = [];
    _.each(DICE_DESCENDING, die => {
      let count = diceCount[die];
      if (count) {
        _.each(_.range(count), () => {
          newDice.push(die);
        });
      }
    });

    if (rerollGood)
      return {
        roll: `{${newDice.join(',')}}k1`,
        type: SUPER_UPGRADE
      };
    else if (rerollBad)
      return {
        roll: `D4`,
        type: SUPER_DOWNGRADE
      };
    else
      return {
        roll: `{${newDice.join(',')}}k1`,
        type: NORMAL_UPDOWNGRADE
      };
  }

  // Migrate sheet data from prior versions to the most recent version.
  function migrateVersion(cb) {
    _migrate1_5(cb);
  }

  /**
   * Migrate from v1.5 to 1.6.
   * @param {func} cb   Callback
   */
  function _migrate1_5(cb) {
    _migrate1_5_hardcodedTalent('talent_cutieMark_', 'Cutie Mark', () => {
      _migrate1_5_hardcodedTalent('talent_racial_', 'Race', () => {
        _migrate1_5_mainQuirk(() => {
          _migrate1_5_equipment(cb);
        });
      });
    });
  }

  /**
   * Migrate a hardcoded talent from v1.5 to repeating talents section.
   * @param {string} prefix   The attribute prefix for the talent.
   * @param {string} source   The new value for the talent's source property.
   * @param {func} cb         Callback.
   */
  function _migrate1_5_hardcodedTalent(prefix, source, cb) {
    let attrList = [prefix + 'name', prefix + 'dice', prefix + 'trait', prefix + 'updowngrade', prefix + 'equation', prefix + 'readOnlyView', prefix + 'notes'];
    parseAttrs(attrList, values => {
      if (values[prefix + 'name']) {
        let nextRowID = generateRowID();
        let repPrefix = `repeating_talents_${nextRowID}_`;
        setAttrs({
          // Void the hard-coded talent's name.
          [prefix + 'name']: '',

          // Copy the hard-coded talent's values to a new repeating talent.
          [repPrefix + 'name']: values[prefix + 'name'],
          [repPrefix + 'source']: source,
          [repPrefix + 'dice']: values[prefix + 'dice'],
          [repPrefix + 'trait']: values[prefix + 'trait'],
          [repPrefix + 'updowngrade']: values[prefix + 'updowngrade'],
          [repPrefix + 'equation']: values[prefix + 'equation'],
          [repPrefix + 'readOnlyView']: values[prefix + 'readOnlyView'],
          [repPrefix + 'notes']: values[prefix + 'notes']
        }, { silent: true }, cb);
      }
      else
        cb();
    });
  }

  /**
   * Migrate main quirk from v1.5 to repeating quirks section.
   * @param {func} cb   Callback.
   */
  function _migrate1_5_mainQuirk(cb) {
    let prefix = 'quirk_main_';
    let attrList = [prefix + 'name', prefix + 'notes'];
    parseAttrs(attrList, values => {
      if (values[prefix + 'name']) {
        let nextRowID = generateRowID();
        let repPrefix = `repeating_quirks_${nextRowID}_`;
        setAttrs({
          // Void the hard-coded quirk.
          [prefix + 'name']: '',

          // Copy the hard-coded quirk's values to a new repeating quirk.
          [repPrefix + 'name']: values[prefix + 'name'],
          [repPrefix + 'notes']: values[prefix + 'notes']
        }, { silent: true }, cb);
      }
      else
        cb();
    });
  }

  /**
   * Migrate equipment from v1.5 to v1.6.
   * @param {func} cb   Callback.
   */
  function _migrate1_5_equipment(cb) {
    getAttrs(['equipment'], values => {
      let equipmentRaw = values['equipment'] || '';

      // Transfer equipment from the 1.5 textarea to the 1.6 repeating section.
      if (equipmentRaw) {
        let equipmentList = equipmentRaw.split('\n');

        _.each(equipmentList, item => {
          let nextRowID = generateRowID();
          let repPrefix = `repeating_equipment_${nextRowID}_`;
          setAttrs({
            [repPrefix + 'name']: item,
            'equipment': ''
          }, { silent: true }, cb);
        });
      }
    });
  }

  // Registers an event listener for attribute changes.
  // @param {string[]} attrs    A list of attribute names.
  // @param {fn} cb             Callback with one parameter for a received event.
  function onChange(attrs, cb) {
    attrs = _.map(attrs, attr => {
      return 'change:' + attr;
    }).join(' ');
    on(attrs, cb);
  }

  // Registers an event listener for attribute changes, and parses them to more
  // useful forms.
  // @param {string[]} attrs    A list of attribute names.
  // @param {fn} cb             Callback with one parameter for a mapping of
  //                            attribute names to their parsed values.
  function onChangeParse(attrs, cb) {
    onChange(attrs, () => {
      parseAttrs(attrs, cb);
    });
  }

  /**
   * Gets the specified attributes and parses them as an integer or 0.
   */
  function parseAttrs(attrs, cb) {
    try {
      getAttrs(attrs, values => {
        try {
          _.each(attrs, attr => {
            if(_.isUndefined(values[attr]))
              values[attr] = 0;
            else if(!isNaN(values[attr]))
              values[attr] = parseInt(values[attr]);
          });
          cb(values);
        }
        catch (err) {
          setAttrs({
            "debug": `parseAttrs error: ${err.message}`
          });
        }
      });
    }
    catch (err) {
      setAttrs({
        "debug": `parseAttrs error: ${err.message}`
      });
    }
  }

  // Update the equations and views for all talents.
  function updateTalents(cb) {
    cb = cb || _.noop;

    getSectionIDs('repeating_talents', ids => {
      // Create a semaphore that will invoke our callback once all the
      // talents have been processed.
      var idsLeft = ids.length;
      var semaphore = () => {
        idsLeft--;
        if (!idsLeft)
          cb();
      };

      // Process each talent in the repeating section.
      _.each(ids, id => {
        var prefix = 'repeating_talents_' + id;
        _updateTalents(prefix, semaphore);
      });
    });
  }

  // Update the equations and views for all talents with the given prefix.
  function _updateTalents(prefix, cb) {
    cb = cb || _.noop;

    // If we just up-ticked or down-ticked the up/downgrade, then quit early
    // after handling that.
    if(_tickDowngrade(prefix) || _tickUpgrade(prefix)) {
      cb();
      return;
    }

    parseAttrs([prefix + '_name', prefix + '_dice', prefix + '_trait', prefix + '_updowngrade', 'body_equation', 'mind_equation', 'charm_equation'], values => {
      var talentName = values[prefix + '_name'];
      var talentDice = values[prefix + '_dice'];
      var talentDiceView = getRollView(talentDice);

      var trait = values[prefix + '_trait'];
      var traitDice = values[trait + '_equation'] || 'D0';

      // Apply upgrades/downgrades to talent dice.
      var updown = parseInt(values[prefix + '_updowngrade']) || 0;
      var talentDiceModified = talentDice;
      var updowngrade_note = '';
      if(talentDice && updown) {
        let {roll, type} = getUpDowngradedRoll(talentDice, updown, 'talent');
        talentDiceModified = roll;
        updowngrade_note = UPDOWNGRADE_NOTES[type];
      }

      // Update the attributes.
      if(talentDiceModified === 'null')
        setAttrs({
          [prefix + '_equation']: 0,
          [prefix + '_readOnlyView']: `${talentName}(n/a)`,
          [prefix + '_updowngrade_note']: ''
        }, {}, cb);
      else {
        //var traitDice = values[trait];
        setAttrs({
          [prefix + '_equation']: `{${talentDiceModified} [talent],${traitDice} [trait]}k1`,
          [prefix + '_readOnlyView']: `${talentName}(${talentDiceView})`,
          [prefix + '_updowngrade_note']: updowngrade_note
        }, {}, cb);
      }
    });
  }

  // Update the equation values for all traits.
  function updateTraits(cb) {
    _updateTrait('body', () => {
      _updateTrait('mind', () => {
        _updateTrait('charm', cb);
      });
    });
  }

  // Updates the equation value for a single trait.
  function _updateTrait(trait, cb) {
    parseAttrs([trait, trait + '_updowngrade'], values => {
      var traitDice = values[trait];
      var updowngrade_note = '';

      if(traitDice === 'null')
        setAttrs({
          [trait + '_equation']: 0,
          [trait + '_updowngrade_note']: ''
        }, {}, cb);
      else {
        // Apply upgrades/downgrades to the trait dice.
        var updown = values[trait + '_updowngrade'] || 0;
        if(updown) {
          let {roll, type} = getUpDowngradedRoll(traitDice, updown, 'trait');
          traitDice = roll;
          updowngrade_note = UPDOWNGRADE_NOTES[type];
        }

        setAttrs({
          [trait + '_equation']: traitDice,
          [trait + '_updowngrade_note']: updowngrade_note
        }, {}, cb);
      }
    });
  }

  // Process a downtick for an upgrade/downgrade field.
  function _tickDowngrade(prefix) {
    parseAttrs([prefix + '_tickdown', prefix + '_updowngrade'], values => {
      let checked = !!values[prefix + '_tickdown'];
      if(checked) {
        var updown = parseInt(values[prefix + '_updowngrade']) || 0;

        setAttrs({
          [prefix + '_updowngrade']: updown - 1,
          [prefix + '_tickdown']: 0
        });
        return true;
      }
      return false;
    });
  }

  // Process an uptick for an upgrade/downgrade field.
  function _tickUpgrade(prefix) {
    parseAttrs([prefix + '_tickup', prefix + '_updowngrade'], values => {
      let checked = !!values[prefix + '_tickup'];
      if(checked) {
        var updown = parseInt(values[prefix + '_updowngrade']) || 0;

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

  onChange(['body_equation', 'mind_equation', 'charm_equation'], () => {
    updateTalents();
  });

  on('sheet:opened', () => {
    setAttrs({
      "debug": "Opening sheet"
    });

    setAttrs({
      character_sheet: 'TailsOfEquestria vSCRIPT_VERSION'
    });

    // Migrate from v1.5 to 1.6
    migrateVersion(() => {
      setAttrs({
        "debug": "Migration SUCCESS"
      });

      updateTraits(() => {
        setAttrs({
          "debug": "Update traits SUCCESS"
        });

        updateTalents(() => {
          setAttrs({
            "debug": "Update talents SUCCESS"
          });
        });
      });
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

})();
