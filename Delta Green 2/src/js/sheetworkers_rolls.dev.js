"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var updateRepeatingSection = function updateRepeatingSection(section, element, id, character_id) {
  var update = {};
  var attrPrefix = "repeating_".concat(section, "_").concat(id);
  var attrName = "".concat(attrPrefix, "_").concat(element);
  update["".concat(attrName, "_action")] = "%{".concat(character_id, "|").concat(attrName, "-action}");
  update["".concat(attrName, "_r")] = id;
  console.log(' in update repeating section', section);

  if (section === 'weapons') {
    update["".concat(attrPrefix, "_damage_action")] = "%{".concat(character_id, "|").concat(attrPrefix, "_damage-action}");
    update["".concat(attrPrefix, "_damage_critical_action")] = "%{".concat(character_id, "|").concat(attrPrefix, "_damage_critical-action}");
    update["".concat(attrPrefix, "_lethality_action")] = "%{".concat(character_id, "|").concat(attrPrefix, "_lethality-action}");
    update["".concat(attrPrefix, "_lethality_critical_action")] = "%{".concat(character_id, "|").concat(attrPrefix, "_lethality_critical-action}");
    update["".concat(attrPrefix, "_selective_fire_action")] = "%{".concat(character_id, "|").concat(attrPrefix, "_selective_fire-action}");
    update["".concat(attrPrefix, "_selective_fire_critical_action")] = "%{".concat(character_id, "|").concat(attrPrefix, "_selective_fire_critical-action}");
    update["".concat(attrPrefix, "_second_damage_action")] = "%{".concat(character_id, "|").concat(attrPrefix, "_second_damage-action}");
    update["".concat(attrPrefix, "_second_damage_critical_action")] = "%{".concat(character_id, "|").concat(attrPrefix, "_second_damage_critical-action}");
  }

  return update;
};

var updateRepeatingRollsonOpen = function updateRepeatingRollsonOpen() {
  getAttrs(['character_id'], function (values) {
    var character_id = values.character_id;
    console.info('Repeating Sections', _repeating_sections);
    Object.entries(_repeating_sections).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          element = _ref2[0],
          section = _ref2[1];

      console.log(' in update repeating rolls on open', section);
      getSectionIDs(section, function (idarray) {
        var update = {};
        console.log('section: ' + section + ' element: ' + element + ' idarray: ' + idarray);
        idarray.forEach(function (id) {
          Object.assign(update, updateRepeatingSection(section, element, id, character_id));
        });
        console.info('Value of update inside repeating rollUpdate', update);
        setAttrs(update, {
          silent: true
        }, function () {
          console.log('Repeating Rolls updated');
          console.info('update', update);
        });
      });
    });
    Object.entries(_additional_repeating_sections).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          element = _ref4[0],
          section = _ref4[1];

      console.log(' in update repeating rolls on open', section);
      getSectionIDs(section, function (idarray) {
        var update = {};
        console.log('section: ' + section + ' element: ' + element + ' idarray: ' + idarray);
        idarray.forEach(function (id) {
          Object.assign(update, updateRepeatingSection(section, element, id, character_id));
        });
        console.info('Value of update inside repeating rollUpdate', update);
        setAttrs(update, {
          silent: true
        }, function () {
          console.log('Repeating Rolls updated');
          console.info('update', update);
        });
      });
    });
    Object.entries(_repeating_damages).forEach(function (element) {
      getSectionIDs('weapons', function (idarray) {
        var update = {};
        console.log('section: weapons element: ' + element + ' idarray: ' + idarray);
        idarray.forEach(function (id) {
          update["repeating_weapons_".concat(id, "_").concat(element)] = "%{".concat(character_id, "|repeating_weapons_").concat(id, "_").concat(element);
        });
        console.info('Value for weapons damage', update);
        getAttrs(_repeating_ammo.map(function (element) {
          return "repeating_weapons_".concat(id, "_").concat(element);
        }), function (values) {
          var currentAmmo = Math.max(0, parseInt(values['ammo']) || 0);
          var hasammo = values['hasammo'] === 'active' ? 1 : 0;
          var ammo_total = Math.max(0, parseInt(values['ammo_total']) || 0);

          if (ammo_total >= 0) {
            update['hasammo'] = 'inactive';
          } else {
            update['hasammo'] = 'active';
          }

          setAttrs(update, {
            silent: true
          }, function () {
            console.log('Repeating weapon damage updated');
            console.info('update', update);
          });
        });
      });
    });
  });
};

var updateRollsOnOpen = function updateRollsOnOpen() {
  console.log('===update rolls===');
  var fullrolls = _allrolls;
  console.info("all rolls", _allrolls);
  getAttrs(['character_id'], function (values) {
    var update = {};
    var character_id = values.character_id;
    console.log('character id: ' + character_id);
    fullrolls.forEach(function (roll) {
      update["".concat(roll, "_action")] = "%{".concat(character_id, "|").concat(roll, "-action}");
    });
    console.info('Value of update inside rollUpdate', update);
    setAttrs(update, {
      silent: false
    }, function () {
      console.log('Rolls updated');
      console.log('update:', update);
    });
  });
};

var changeRepeatingRolls = function changeRepeatingRolls(section, element, id) {
  console.log(' in change repeating rolls', section);
  var attrName = "repeating_".concat(section, "_").concat(id, "_").concat(element);
  getAttrs(['character_id'], function (values) {
    var character_id = values.character_id;
    var update = updateRepeatingSection(section, element, id, character_id);
    console.info(update);
    setAttrs(update, {
      silent: true
    }, function () {
      console.log("Update repeating ".concat(element, " rolls"));
    });
  });
};

var rollwithmodifiers = function rollwithmodifiers(rollString, rollName, queryModifier, additionalParameters) {
  initializeRolls(); // Initialize the rolls if flag is not set

  var attr_to_get = arrays['_derived_modifiers'];

  if (additionalParameters.hasOwnProperty('editable_name')) {
    attr_to_get.push(additionalParameters['editable_name']);
  }

  getAttrs(attr_to_get, function (values) {
    console.log('wp: ' + values['willpower_points']);
    console.log('low wp: ' + values['low_willpower']);
    console.log('zero wp: ' + values['zero_willpower']); ///////////////////////////////////////////////////////////

    var wp_modifiers = check_for_wp_modifiers(values, rollName);
    var _zero_willpower = wp_modifiers.zero_willpower;
    var _low_willpower = wp_modifiers.low_willpower;
    var rollValue = "".concat(rollString, " {{rating=[[@{").concat(rollName, "}]]}}");
    rollValue = "".concat(rollValue, " {{zero_willpower=").concat(_zero_willpower, "}}");
    rollValue = "".concat(rollValue, " {{low_willpower=").concat(_low_willpower, "}}} ");
    rollValue = "".concat(rollValue, " {{modifier=[[").concat(queryModifier, "]]}}");
    rollValue = "".concat(rollValue, " {{isCritical=[[0]]}} {{isSuccess=[[0]]}}");
    var _header = "";

    if (values.hasOwnProperty(additionalParameters['editable_name'])) {
      _header = '{{header=^{' + additionalParameters['editable_type'] + '}';
      _header = _header + ' (' + values[additionalParameters['editable_name']] + ')}}';
    } else {
      _header = '{{header=^{' + additionalParameters['name'] + '} }}';
    }

    rollValue = "".concat(rollValue, " ").concat(_header);

    if (_zero_willpower != '[[1]]') {
      rollValue = "".concat(rollValue);
    }

    var isSkill = arrays["_skills"].includes(rollName) ? 1 : 0;
    var isStat = arrays["_stats"].includes(rollName) ? 1 : 0;
    var rollType = 0;

    if (isSkill == 1) {
      rollType = 1;
    } else if (isStat == 1) {
      rollType = 2;
    }

    rollFail = "".concat(rollName, "_fail");
    rollSkillAndStats(rollValue, rollName, rollFail, rollType);
  });
};

var check_for_wp_modifiers = function check_for_wp_modifiers(values, roll) {
  console.log('wp: ' + values['willpower_points']);
  console.log('low wp: ' + values['low_willpower']);
  console.log('zero wp: ' + values['zero_willpower']);

  var _willpower_points = parseInt(values["willpower_points"]) || 0;

  var _zero_willpower = values["zero_willpower"] == 1 && _willpower_points == 0 && roll !== 'luck' ? '[[1]]' : '[[0]]';

  var _low_willpower = values["low_willpower"] == 1 && _willpower_points <= 2 && _willpower_points > 0 && roll !== 'luck' && roll !== 'sanity_points' ? '[[1]]' : '[[0]]';

  console.log("zero willpower: ".concat(_zero_willpower));
  console.log("low willpower: ".concat(_low_willpower));
  return {
    zero_willpower: _zero_willpower,
    low_willpower: _low_willpower
  };
};

var check_success = function check_success(dice, rollName, rollFail, rating) {
  var typeRoll = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  // typeRoll=2 for stats -> can go above 100
  // typeRoll=1 for skill -> have to check for failure
  // typeRoll=0 for attacks and special
  var isSuccess = 0;
  var isCritical = 0;
  var criticals = [1, 11, 22, 33, 44, 55, 66, 77, 88, 99, 100];

  if (typeRoll < 2 || rating < 100) {
    // only stats can go above 100 
    isSuccess = dice <= rating ? 1 : 0;
    isCritical = criticals.includes(dice) ? 1 : 0;
  } else {
    var score = Math.round(rating / 5);
    isSuccess = dice != 99 ? 1 : 0;
    isCritical = criticals.includes(dice) || dice <= score ? 1 : 0;
  }

  if (typeRoll == 1 && isSuccess == 0) {
    // you need to check for failure when it's a skill
    var failure = {};
    failure["".concat(rollFail)] = 'on';
    console.info("Skill ".concat(rollName, " failed"));
    console.info("failure", failure);
    setAttrs(failure, function () {
      console.info("Skill ".concat(rollName, " failed"));
    });
  }

  return [isSuccess, isCritical];
};

var rollAttacks = function rollAttacks(rollValue, rollName, options) {
  startRoll("".concat(rollValue), function (results) {
    console.info(results.results);
    console.info(results.results.advanced_weapons.result);
    var dice = results.results.dice.result;
    var rating = results.results.rating.result;
    var modifier = results.results.modifier.result;
    var zero_willpower = results.results.zero_willpower.result;
    var low_willpower = results.results.low_willpower.result;
    var basemodifier = modifier - 20 * low_willpower;
    var advanced_weapons = results.results.advanced_weapons.result;
    console.info('options', options);

    if (options.hasBlastRadius == 1) {
      var blast_radius = results.results.blast_radius.result;
    }

    var full_modifier = basemodifier;

    if (options.advanced_weapons == 1) {
      if (options.isShotgun == 1) {
        full_modifier += 20;
      } else if (options.hasBlastRadius == 1) {
        full_modifier += 20;
      }

      if (options.hasAccessories == 1) {
        var accessoriesMod = parseInt(results.results.accessoriesMod.result) || 0;
        console.log('accessoriesMod: ', accessoriesMod);
        full_modifier += accessoriesMod;
      }
    }

    full_modifier = full_modifier > 40 ? 40 : full_modifier;
    var rating_check = rating + full_modifier < 0 ? 0 : rating + full_modifier > 99 ? 99 : rating + full_modifier;
    console.log('rating: ', rating);
    console.log('rating_check: ', rating_check);
    console.log('dice: ', dice);
    console.log('dice<rating:', dice < rating_check);
    console.log('dice<rating_check:', dice < rating_check);

    var _check_success = check_success(dice, rollName, '', rating_check, 0),
        _check_success2 = _slicedToArray(_check_success, 2),
        isSuccess = _check_success2[0],
        isCritical = _check_success2[1];

    console.log('isSuccess:', isSuccess);
    console.log('isCritical:', isCritical);
    newroll = {
      rating: rating_check,
      dice: dice,
      modifier: full_modifier,
      isSuccess: isSuccess,
      isCritical: isCritical,
      zero_willpower: zero_willpower,
      low_willpower: low_willpower,
      advanced_weapons: advanced_weapons
    };
    console.log(newroll);
    finishRoll(results.rollId, newroll);
  });
};

var rollSkillAndStats = function rollSkillAndStats(rollValue, rollName, rollFail, typeRoll) {
  console.log(rollValue);
  startRoll(rollValue, function (results) {
    console.log(results);
    var modifier = results.results.modifier.result;
    var zero_willpower = results.results.zero_willpower.result;
    var low_willpower = results.results.low_willpower.result;
    var rating = results.results.rating.result;
    var full_modifier = modifier - 20 * low_willpower > 40 ? 40 : modifier - 20 * low_willpower;
    var dice = results.results.dice.result;
    var rating_check = rating + full_modifier < 0 ? 0 : rating + full_modifier > 99 ? 99 : rating + full_modifier;
    var newroll = {
      a: 15,
      b: -2
    };
    console.log("full modifier: ".concat(full_modifier));
    console.log("rating: ".concat(rating));
    console.log("rating check: ".concat(rating_check));
    console.log("dice: ".concat(dice));
    console.log("typeRoll: ".concat(typeRoll));

    var _check_success3 = check_success(dice, rollName, rollFail, rating_check, typeRoll),
        _check_success4 = _slicedToArray(_check_success3, 2),
        isSuccess = _check_success4[0],
        isCritical = _check_success4[1];

    newroll = {
      rating: rating_check,
      dice: dice,
      modifier: full_modifier,
      isSuccess: isSuccess,
      isCritical: isCritical,
      zero_willpower: zero_willpower,
      low_willpower: low_willpower
    };
    console.log(newroll);
    finishRoll(results.rollId, newroll);
  });
};

var rollBonds = function rollBonds(rollValue, _value, _names, _parameters) {
  startRoll("".concat(rollValue), function (results) {
    console.log(results); ///////////////////////////////////////////////////////////

    var dice = results.results.dice.result;
    var local_wp = Math.max(0, parseInt(results.results.local_wp.result) - dice);
    var score = Math.max(0, parseInt(results.results.score.result) - dice);
    var original_wp = parseInt(results.results.local_wp.result) || 0;
    var zerowp = local_wp == 0 ? 1 : 0;
    console.log("local_wp: ".concat(local_wp));
    console.log("score: ".concat(score));
    console.log("dice: ".concat(dice));
    console.log("zerowp: ".concat(zerowp));
    var update = {};
    console.info('parameters', _parameters);
    console.info('names', _names);
    update[_names['local_wp_points']] = local_wp;
    update["willpower_points"] = local_wp;

    if (parseInt(results.results.local_wp.result) || 0 != 0) {
      update[_names["score"]] = score;
    } else {
      score = parseInt(results.results.score.result) || 0;
    }

    update[_names["color"]] = BondButtonColor(score);
    newroll = {
      dice: Math.min(dice, original_wp),
      local_wp: local_wp,
      score: score,
      zerowp: zerowp
    };
    finishRoll(results.rollId, newroll);
    setAttrs(update, {
      silent: false
    }, function () {
      console.info("Bonds updated", update);
    });
  });
};

var _alldamages = ['damage', 'damage_critical', 'second_damage', 'second_damage_critical', 'lethality', 'lethality_critical', 'selective_fire', 'selective_fire_critical'];

_alldamages.forEach(function (element) {
  console.log('element: ' + element);
  console.log("clicked:repeating_weapons:".concat(element, "-action"));
  on("clicked:repeating_weapons:".concat(element, "-action"), function (eventInfo) {
    console.log(eventInfo);
    var id = eventInfo.sourceAttribute.split('_')[2];
    var _input_names = {};
    var _parameters = [];
    setDamageParametersAndInputNames(id, element, _parameters, _input_names);
    clicked_repeating_damages(_parameters, _input_names);
  });
});

var check_sanloss = function check_sanloss(sanloss, element) {
  console.log('element: ' + element);
  console.log('sanloss: ' + sanloss);

  if (element === 'sanity_success') {
    console.log('sanity_success');
    return sanloss == '' ? 0 : sanloss;
  } else if (element === 'sanity_failure') {
    console.log('sanity_failure');
    return sanloss == '' ? 1 : sanloss;
  }
};

var _npc_san_losses = ['sanity_success', 'sanity_failure'];

_npc_san_losses.forEach(function (element) {
  console.log('element: ' + element);
  on("clicked:".concat(element, "-action"), function (eventInfo) {
    console.log(eventInfo);
    getAttrs([element], function (values) {
      var sanloss = check_sanloss(values[element], element);
      console.log(sanloss);
      rollSanityDamages(sanloss, element);
    });
  });
});

var _ritual_losses = ['pay_cost', 'force_connection', 'accept_failure'];

_ritual_losses.forEach(function (element) {
  console.log('element: ' + element);
  on("clicked:repeating_rituals:".concat(element, "-action"), function (eventInfo) {
    console.log(eventInfo);
    var id = eventInfo.sourceAttribute.split('_')[2];
    var input_names = {};
    var parameters = [];
    input_names["ritual_type"] = element;
    parameters.push("repeating_rituals_".concat(id, "_ritual_type"));
    console.log('ritual_type: ' + element);
    console.log('id: ' + id);
    var repsecid = "repeating_rituals_".concat(id);
    input_names["repsecid"] = repsecid;
    input_names["name"] = "".concat(repsecid, "_name");
    parameters.push(input_names["name"]);
    console.log('repsecid: ' + repsecid);
    console.info('parameters', parameters);
    setRitualCostParametersAndInputNames(repsecid, parameters, input_names);
    CurrentValues.forEach(function (element) {
      input_names[element] = "".concat(element);
      parameters.push(element);
    });
    console.log('log all parameters: ', parameters);
    clicked_repeating_rituals_cost(parameters, input_names);
  });
});

var clicked_repeating_rituals_cost = function clicked_repeating_rituals_cost(parameters, names) {
  getAttrs(parameters, function (values) {
    var ritual_type = names['ritual_type']; // cost of the ritual

    var other_costs = {};
    getOtherCosts(other_costs, values, names, RitualCosts);
    getOtherCosts(other_costs, values, names, CurrentValues);
    console.info('other costs: ', other_costs);

    if (ritual_type === 'pay_cost') {
      paythecost(other_costs['sanity_loss_high'], other_costs);
    }

    if (ritual_type === 'force_connection') {
      forceconnection(other_costs['sanity_loss_high'], other_costs);
    }

    if (ritual_type === 'accept_failure') {
      acceptfailure(other_costs['sanity_loss_low'], other_costs);
    }
  });
};

var setDamageParametersAndInputNames = function setDamageParametersAndInputNames(id, element, _parameters, _input_names) {
  _input_names["name"] = "repeating_weapons_".concat(id, "_name");
  _input_names["repsecid"] = "repeating_weapons_".concat(id);

  _parameters.push(_input_names["name"]);

  _input_names["hasammo"] = "repeating_weapons_".concat(id, "_hasammo");

  _parameters.push(_input_names["hasammo"]);

  var flagCritical = false;
  flagCritical = flagCritical || element === 'damage_critical';
  flagCritical = flagCritical || element === 'second_damage_critical';
  flagCritical = flagCritical || element === 'lethality_critical';
  flagCritical = flagCritical || element === 'selective_fire_critical';
  _input_names["isCritical"] = flagCritical == true ? 1 : 0;
  var isCritical = _input_names["isCritical"];
  console.log('isCritical: ' + isCritical);

  if (element === 'damage' || element === 'damage_critical') {
    console.log('damage');

    if (isCritical == 1) {
      _input_names["header"] = "damage (\xD72)";
    } else {
      _input_names["header"] = "damage";
    }

    _input_names["damage"] = "repeating_weapons_".concat(id, "_damage");

    _parameters.push(_input_names["damage"]);

    _input_names["damage_type"] = 'damage';
  } else if (element === 'second_damage' || element === 'second_damage_critical') {
    console.log('double damage');
    _input_names["damage_type"] = 'damage';

    if (isCritical == 1) {
      _input_names["header"] = "damage (\xD72)";
    } else {
      _input_names["header"] = "damage";
    }

    _input_names["damage"] = "repeating_weapons_".concat(id, "_second_damage_value");

    _parameters.push(_input_names["damage"]);
  } else if (element === 'lethality' || element === 'lethality_critical') {
    console.log('lethality');
    _input_names["damage_type"] = 'lethality';

    if (isCritical == 1) {
      _input_names["header"] = "lethality (\xD72)";
    } else {
      _input_names["header"] = "lethality";
    }

    _input_names["damage"] = "repeating_weapons_".concat(id, "_lethality_percent");

    _parameters.push(_input_names["damage"]);
  } else if (element === 'selective_fire' || element === 'selective_fire_critical') {
    if (isCritical == 1) {
      _input_names["header"] = "selective fire (\xD72)";
    } else {
      _input_names["header"] = "selective fire";
    }

    _input_names["damage_type"] = 'lethality';
    _input_names["header"] = "selective fire";
    _input_names["damage"] = "repeating_weapons_".concat(id, "_selfireLethality");

    _parameters.push(_input_names["damage"]);

    _input_names["selfireType"] = "repeating_weapons_".concat(id, "_selfireType");

    _parameters.push(_input_names["selfireType"]);
  }

  _input_names["ammo"] = "repeating_weapons_".concat(id, "_ammo");

  _parameters.push(_input_names["ammo"]);

  _input_names["track_bullets"] = "track_bullets";

  _parameters.push(_input_names["track_bullets"]);
};

var check_track_ammo = function check_track_ammo(rollString, trackAmmo, currentAmmo) {
  var used_ammo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  if (trackAmmo == 1) {
    rollString = "".concat(rollString, " {{trackbullets=[[1]]}} {{used_ammo=[[").concat(used_ammo, "]]}}");
    rollString = "".concat(rollString, " {{current_ammo=[[").concat(currentAmmo, "]]}}");
  } else {
    rollString = "".concat(rollString, " {{trackbullets=[[0]]}}");
  }

  return rollString;
};

var getUsedAmmo = function getUsedAmmo() {
  var selfireType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (selfireType === 'short burst') {
    return 3;
  }

  ;

  if (selfireType === 'long burst') {
    return 5;
  }

  ;

  if (selfireType === 'short spray') {
    return 10;
  }

  ;

  if (selfireType === 'long spray') {
    return 20;
  }

  ;
  return 1;
};

var clicked_repeating_damages = function clicked_repeating_damages(parameters, names) {
  getAttrs(parameters, function (values) {
    var isCritical = names['isCritical'];
    var track_bullets = values[names['track_bullets']] === 'active' ? 1 : 0;
    var hasammo = values[names['hasammo']] === 'active' ? 1 : 0;
    var trackAmmo = track_bullets == 1 && hasammo == 1 ? 1 : 0;
    var currentAmmo = Math.max(0, parseInt(values[names['ammo']]) || 0);
    var selfireType = values[names['selfireType']] || '';
    var usedAmmo = getUsedAmmo(selfireType);
    console.log('trackAmmo: ' + trackAmmo);
    console.log('hasammo: ' + hasammo);
    console.log('currentAmmo: ' + currentAmmo);
    console.log('selfireType: ' + selfireType);
    console.log('usedAmmo: ' + usedAmmo);
    var damage_type = names['damage_type'];
    var damage = values[names['damage']];
    var header = names['header'];
    var rollString = "".concat(prefix_damage_roll, " {{header=^{").concat(header, "}}}");
    var damageString = '';

    if (damage_type === 'damage') {
      if (isCritical == 1) {
        damageString = "{{damage=[[2*".concat(damage, "]]}}");
      } else {
        damageString = "{{damage=[[".concat(damage, "]]}}");
      }

      rollString = "".concat(rollString, "  ").concat(damageString);
      rollString = check_track_ammo(rollString, trackAmmo, currentAmmo, usedAmmo);
    } else if (damage_type === 'lethality') {
      if (isCritical == 1) {
        damage = 2 * damage;
      }

      damageString = "{{lethality=[[".concat(damage, "]]}}");
      rollString = "".concat(rollString, " ").concat(damageString);
      rollString = "".concat(rollString, " {{roll=[[1d100]]}}");
      rollString = check_track_ammo(rollString, trackAmmo, currentAmmo, usedAmmo);
    }

    rollString = "".concat(rollString, " {{isCritical=[[").concat(isCritical, "]]}}");
    console.info(rollString);
    startRoll(rollString, function (results) {
      var newroll = getRollDamage(results, trackAmmo, damage_type, isCritical);
      newroll['isCritical'] = isCritical;
      newroll['trackbullets'] = trackAmmo;
      finishRoll(results.rollId, newroll);

      if (trackAmmo == 1) {
        var update = {};
        update[names['ammo']] = newroll['current_ammo'];
        setAttrs(update, function () {
          console.log('Ammo updated', update);
        });
      }
    });
  });
};

var getRollDamage = function getRollDamage(results, trackammo, damage_type, critical) {
  var newroll = {};

  if (trackammo == 1) {
    var trackbullets = [[1]];
    newroll['trackbullets'] = trackbullets;
    var used_ammo = results.results.used_ammo.result;
    var current_ammo = results.results.current_ammo.result;
    var expended_ammo = current_ammo - used_ammo;
    newroll['current_ammo'] = expended_ammo;
  }

  if (damage_type === 'damage') {
    var damage = results.results.damage.result;
    newroll['damage'] = damage;
  }

  if (damage_type === 'lethality') {
    var lethality = results.results.lethality.result;
    var roll = results.results.roll.result;
    var quotient = Math.round(roll / 10);
    var remainder = Math.round(roll % 10);
    var computed_lethality = lethality;
    var computed_roll = quotient + (remainder > 0 ? remainder : 10);

    if (critical == 1) {
      computed_lethality = lethality * 2;
      computed_roll = computed_roll * 2;
    }

    newroll['roll'] = computed_roll;
    newroll['lethality'] = computed_lethality;
  }

  return newroll;
};

var clicked_repeating_weapons = function clicked_repeating_weapons(parameters, names, queryModifier) {
  getAttrs(parameters, function (values) {
    var character_id = values['character_id'];
    var repsecid = names['repsecid'];
    var skillname = values[names['name']];
    var skillrank = parseInt(values[names['rank']]) || 0;
    var track_bullets = values[names['track_bullets']] === 'active' ? 1 : 0;
    var hasammo = values[names['hasammo']] === 'active' ? 1 : 0;
    var current_ammo = Math.max(0, parseInt(values[names['ammo']]) || 0);
    var advanced_weapons = values[names['advanced_weapons']] === 'active' ? 1 : 0;
    var isShotgun = values[names['shotgun']] === 'active' ? 1 : 0;
    var hassecond_damage = values[names['second_damage']] === 'active' ? 1 : 0;
    var hasSelectiveFire = values[names['selfire']] === 'active' ? 1 : 0;
    var hasAccessories = values[names['accessories']] === 'active' ? 1 : 0;
    var hasBlastRadius = values[names['blast_radius']] === 'active' ? 1 : 0;
    var armor_piercing = values[names['armor_piercing']];
    var base_range = values[names['range']];
    var kill_radius = values[names['kill_radius']];
    console.info('values', values);
    var full_damage = values[names['damage']];
    var full_lethality = values[names['lethality']];
    var rollString = "".concat(prefix_skill_roll, " {{header=").concat(skillname, "}} {{subheader=").concat(skillrank, "}}");
    var wp_modifiers = check_for_wp_modifiers(values);
    var _zero_willpower = wp_modifiers.zero_willpower;
    var _low_willpower = wp_modifiers.low_willpower;
    console.log('queryModifier: ' + queryModifier);
    var rollValue = "".concat(rollString, " {{rating=[[").concat(skillrank, "]]}}  {{zero_willpower=").concat(_zero_willpower, "}} {{low_willpower=").concat(_low_willpower, "}}  {{modifier=[[").concat(queryModifier, "]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}");
    rollValue = "".concat(rollValue, " {{advanced_weapons=[[").concat(advanced_weapons, "]]}}");

    if (base_range != "") {
      rollValue = rollValue + '{{base_range=' + base_range + '}}';
    }

    if (armor_piercing != "" || parseInt(armor_piercing) == 0) {
      rollValue = rollValue + '{{armor_piercing=' + armor_piercing + '}}';
    }

    if (kill_radius != "") {
      rollValue = rollValue + '{{kill_radius=' + kill_radius + '}}';
    }

    var weaponWithAmmo = track_bullets == 1 && hasammo == 1 ? 1 : 0;
    console.log('weaponWithAmmo: ' + weaponWithAmmo);
    console.log('hasammo: ' + hasammo);
    console.log('track_bullets: ' + track_bullets);

    if (weaponWithAmmo == 1 && hasammo == 1) {
      rollValue = rollValue + '{{trackbullets=1}}';
      rollValue = rollValue + '{{current_ammo=' + values['ammo'] + '}}';
    }

    if (current_ammo == 0 && weaponWithAmmo == 1) {
      rollValue = rollValue + '{{noammo=1}}';
    } else {
      rollValue = rollValue + '{{wammo=0}}';
    }

    if (full_damage != "") {
      rollValue = rollValue + '{{damage= [' + full_damage + '](~' + character_id + '|' + repsecid + '_damage)}}';
      rollValue = rollValue + '{{voiddamage= [' + full_damage + '](~' + character_id + '|nothing)}}';
      rollValue = rollValue + '{{damage_critical= [(' + full_damage + ')×2](~' + character_id + '|' + repsecid + '_damage_critical)}}';
      rollValue = rollValue + '{{voiddamage_critical= [(' + full_damage + ')×2](~' + character_id + '|nothing)}}';
    }

    if (full_lethality > 0) {
      var critical_lethality = full_lethality * 2;
      rollValue = rollValue + '{{lethality= [' + full_lethality + '%](~' + character_id + '|' + repsecid + '_lethality)}}';
      rollValue = rollValue + '{{voidlethality= [' + full_lethality + '%](~' + character_id + '|nothing)}}';
      rollValue = rollValue + '{{lethality_critical= [' + critical_lethality + '%](~' + character_id + '|' + repsecid + '_lethality_critical)}}';
      rollValue = rollValue + '{{voidlethality_critical= [' + critical_lethality + '%](~' + character_id + '|nothing)}}';
    }

    if (advanced_weapons === 1) {
      if (isShotgun === 1) {
        rollValue = rollValue + '{{shotgun=[[1]]}}';

        if (hassecond_damage === 1) {
          var full_second_damage = values[names['second_damage']];

          if (full_second_damage != "") {
            rollValue = rollValue + '{{second_damage=[' + full_second_damage + '](~' + character_id + '|' + repsecid + '_second_damage)}}';
            rollValue = rollValue + '{{voidsecond_damage=[' + full_second_damage + '](~' + character_id + '|nothing)}}';
            rollValue = rollValue + '{{second_damage_critical=[(' + full_second_damage + ')×2](~' + character_id + '|' + repsecid + '_second_damage_critical)}}';
            rollValue = rollValue + '{{voidsecond_damage_critical=[(' + full_second_damage + ')×2](~' + character_id + '|nothing)}}';
          }
        }
      } //*********************


      if (hasSelectiveFire === 1) {
        var full_sellethality = Math.max(0, parseInt(values[names['selfireLethality']]) || 0);
        var selfireType = values[names['selfireType']];
        var selfireAmmos = getUsedAmmo(selfireType);
        console.log('full_sellethality: ' + full_sellethality);
        console.log('selfire type: ' + selfireType);

        if (full_sellethality > 0) {
          var critical_sellethality = full_sellethality * 2;
          rollValue = rollValue + '{{selective_fire=[' + selfireType;
          rollValue = rollValue + '(' + full_sellethality + '%)]';
          rollValue = rollValue + '(~' + character_id + '|' + repsecid + '_selective_fire)}}';
          rollValue = rollValue + '{{voidselective_fire=[' + selfireType;
          rollValue = rollValue + '(' + full_sellethality + '%)](~' + character_id + '|nothing)}}';
          rollValue = rollValue + '{{selective_fire_critical=[' + selfireType;
          rollValue = rollValue + '(' + critical_sellethality + '%)]';
          rollValue = rollValue + '(~' + character_id + '|' + repsecid + '_selective_fire_critical)}}';
          rollValue = rollValue + '{{voidselective_fire_critical=[' + selfireType;
          rollValue = rollValue + '(' + critical_sellethality + '%)](~' + character_id + '|nothing)}}';
        }

        if (selfireAmmos >= current_ammo && weaponWithAmmo == 1) {
          rollValue = rollValue + '{{selfire_noammo=1}}';
        } else {
          rollValue = rollValue + '{{selfire_wammo=0}}';
        }
      }

      if (hasAccessories === 1) {
        rollValue = rollValue + '{{accessories=[[1]]}}';
        var accessoriesName = values[names['accessoriesName']];
        accessoriesName = accessoriesName === '' ? '^{accessory}' : accessoriesName;
        rollValue = rollValue + '{{accessoriesName=' + accessoriesName + '}}';
        rollValue = rollValue + '{{accessoriesMod=[[' + (parseInt(values[names['accessoriesMod']]) || 0) + ']]}}';
      }

      if (hasBlastRadius === 1) {
        rollValue = rollValue + '{{blast_radius=[[1]]}}';
      }
    }

    var options = {
      isLethality: full_lethality > 0 ? 1 : 0,
      isShotgun: isShotgun,
      hassecond_damage: hassecond_damage,
      hasSelectiveFire: hasSelectiveFire,
      hasAccessories: hasAccessories,
      hasBlastRadius: hasBlastRadius,
      track_bullets: weaponWithAmmo,
      has_ammo: hasammo,
      advanced_weapons: advanced_weapons
    };
    console.log(rollValue);
    rollAttacks(rollValue, skillname, options);
  });
};

var clicked_repeating_actions = function clicked_repeating_actions(type, parameters, names, queryModifier) {
  initializeRolls(); // Initialize the rolls if flag is not set

  if (type === 'weapons') {
    clicked_repeating_weapons(parameters, names, queryModifier);
  }

  if (type === 'bonds') {
    clicked_repeating_bonds(parameters, names, queryModifier);
  }

  if (type === 'special') {
    clicked_repeating_skills(parameters, names, queryModifier, 0);
  }

  if (type === 'skills') {
    clicked_repeating_skills(parameters, names, queryModifier, 1);
  }

  if (type === 'rituals') {
    clicked_repeating_rituals(parameters, names, queryModifier);
  }
};

var clicked_repeating_skills = function clicked_repeating_skills(parameters, names, queryModifier, rollType) {
  getAttrs(parameters, function (values) {
    var skillname = values[names['name']];
    var skillfail = names['fail'];
    var skillrank = parseInt(values[names['rank']]) || 0;
    console.log("skillname: ".concat(skillname, " name: ").concat(names['name']));
    console.log("skillrank: ".concat(skillrank, " rank: ").concat(names['rank']));
    console.info('values', values);
    var rollString = "".concat(prefix_skill_roll, " {{header=").concat(skillname, "}} {{subheader=").concat(skillrank, "}} "); ///////////////////////////////////////////////////////////

    var wp_modifiers = check_for_wp_modifiers(values);
    var _zero_willpower = wp_modifiers.zero_willpower;
    var _low_willpower = wp_modifiers.low_willpower;
    var rating = parseInt(values[parameters[names['rank']]]) || 0;
    var rollValue = "".concat(rollString, " {{rating=[[").concat(skillrank, "]]}}  {{zero_willpower=").concat(_zero_willpower, "}} {{low_willpower=").concat(_low_willpower, "}}}  {{modifier=[[").concat(queryModifier, "]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}");

    if (_zero_willpower != '[[1]]') {
      rollValue = "".concat(rollValue);
    }

    console.log(rollValue);
    rollSkillAndStats(rollValue, skillname, skillfail, rollType);
  });
};

var clicked_repeating_bonds = function clicked_repeating_bonds(parameters, names) {
  getAttrs(parameters, function (values) {
    var bondname = values[names['name']];
    var bondscore = parseInt(values[names['score']]) || 0;
    var local_wp_points = parseInt(values[names['local_wp_points']]) || 0;
    var local_sanity_points = parseInt(values[names['local_sanity_points']]) || 0;
    var character_id = values['character_id'];
    console.log("bondname: ".concat(bondname, " name: ").concat(names['name']));
    console.log("bondscore: ".concat(bondscore, " score: ").concat(names['score']));
    console.log("local_wp_points: ".concat(local_wp_points, " wp_points: ").concat(parameters["willpower_points"]));
    console.log("local_sanity_points: ".concat(local_sanity_points, " sanity_points: ").concat(parameters["sanity_points"]));
    console.info('values', values); /////////////////////////////////////

    if (bondscore <= 0) {
      return;
    } // No need to roll if the bond is already broken
    ////////////////////////////////////


    var rollString = "".concat(prefix_bond_roll, " {{header=").concat(bondname, "}} {{subheader=").concat(bondscore, "}} "); ///////////////////////////////////////////////////////////

    var rollValue = "".concat(rollString, " {{zerowp=[[0]]}} {{score=[[").concat(bondscore, "]]}} {{local_wp=[[").concat(local_wp_points, "]]}} {{local_sanity=[[").concat(local_sanity_points, "}]]}} {{repress= [^{repress}](~").concat(character_id, "|sanity_points)}}");
    rollValue = "".concat(rollValue, " {{projection=1}} {{repression=1}}");
    console.info('rollValue', rollValue);
    console.log(rollValue);
    rollBonds(rollValue, values, names, parameters);
  });
}; // Important functions


var _allrolls = arrays['_derived_rolls'].concat(arrays["_stats"], arrays["_skills"], ['unnatural', 'sanity_loss']);

_allrolls.forEach(function (roll) {
  var _roll = roll === 'sanity_points' ? 'sanity' : roll;

  on("clicked:".concat(roll, "-action"), function (eventInfo) {
    var additionalParameters = {};

    if (arrays["_editable_skills"].includes(_roll)) {
      var prefix_skill = _roll.slice(0, -2);

      additionalParameters['editable_name'] = "".concat(_roll, "_name");
      additionalParameters['editable_type'] = prefix_skill.replace('_', ' ');
    } else {
      var caps = _roll === 'humint' || _roll === 'sigint' ? _roll.toUpperCase() : _roll.replace('_', ' ');
      additionalParameters['name'] = caps.replace('_', ' ');
    }

    var rollString = "".concat(prefix_skill_roll, " {{subheader=@{").concat(roll, "}}} ");
    rollwithmodifiers(rollString, roll, _queryModifier, additionalParameters);
  });
});

var setCommonParametersAndInputNames = function setCommonParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["name"] = "".concat(repsecid, "_name");
  _input_names["repsecid"] = "".concat(repsecid);

  _parameters.push(_input_names["name"]);

  _parameters.push("willpower_points");

  _parameters.push("sanity_points");

  _parameters.push("low_willpower");

  _parameters.push("zero_willpower");

  _parameters.push("character_id");
};

var setSkillsParametersAndInputNames = function setSkillsParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["rank"] = "".concat(repsecid, "_rank");
  _input_names["fail"] = "".concat(repsecid, "_fail");

  _parameters.push(_input_names["rank"]);

  _parameters.push(_input_names["fail"]);
};

var setBondsParametersAndInputNames = function setBondsParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["local_wp_points"] = "willpower_points";
  _input_names["local_sanity_points"] = "sanity_points";
  _input_names["score"] = "".concat(repsecid, "_score");
  _input_names["color"] = "".concat(repsecid, "_color");

  _parameters.push(_input_names["local_wp_points"]);

  _parameters.push(_input_names["local_sanity_points"]);

  _parameters.push(_input_names["score"]);

  _parameters.push(_input_names["color"]);
};

var setSpecialParametersAndInputNames = function setSpecialParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["rank"] = "".concat(repsecid, "_skill_span");

  _parameters.push(_input_names["rank"]);
};

var setGeneralWeaponParametersAndInputNames = function setGeneralWeaponParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["rank"] = "".concat(repsecid, "_skill_span");

  _parameters.push(_input_names["rank"]);

  _input_names["range"] = "".concat(repsecid, "_base_range");

  _parameters.push(_input_names["range"]);

  _input_names["damage"] = "".concat(repsecid, "_damage"); // write the push in function of the input name

  _parameters.push(_input_names["damage"]);

  _input_names["armor_piercing"] = "".concat(repsecid, "_armor_piercing");

  _parameters.push(_input_names["armor_piercing"]);

  _input_names["ammo"] = "".concat(repsecid, "_ammo");

  _parameters.push(_input_names["ammo"]);

  _input_names["hasammo"] = "".concat(repsecid, "_hasammo");

  _parameters.push(_input_names["hasammo"]);

  _input_names["lethality"] = "".concat(repsecid, "_lethality_percent");

  _parameters.push(_input_names["lethality"]);

  _input_names["kill_radius"] = "".concat(repsecid, "_kill_radius");

  _parameters.push(_input_names["kill_radius"]);
};

var setShotgunParametersAndInputNames = function setShotgunParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["shotgun"] = "".concat(repsecid, "_shotgun");

  _parameters.push(_input_names["shotgun"]);

  _input_names["second_damage"] = "".concat(repsecid, "_second_damage");

  _parameters.push(_input_names["second_damage"]);

  _input_names["second_damage"] = "".concat(repsecid, "_second_damage");

  _parameters.push(_input_names["second_damage"]);
};

var setAccessoriesParametersAndInputNames = function setAccessoriesParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["accessories"] = "".concat(repsecid, "_accessories");

  _parameters.push(_input_names["accessories"]);

  _input_names["accessoriesName"] = "".concat(repsecid, "_accessoriesName");

  _parameters.push(_input_names["accessoriesName"]);

  _input_names["accessoriesMod"] = "".concat(repsecid, "_accessoriesMod");

  _parameters.push(_input_names["accessoriesMod"]);
};

var setBlastRadiusParametersAndInputNames = function setBlastRadiusParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["blast_radius"] = "".concat(repsecid, "_blast_radius");

  _parameters.push(_input_names["blast_radius"]);
};

var setSelectiveFireParametersAndInputNames = function setSelectiveFireParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["selfire"] = "".concat(repsecid, "_selfire");

  _parameters.push(_input_names["selfire"]);

  _input_names["selfireLethality"] = "".concat(repsecid, "_selfireLethality");

  _parameters.push(_input_names["selfireLethality"]);

  _input_names["selfireType"] = "".concat(repsecid, "_selfireType");

  _parameters.push(_input_names["selfireType"]);
};

var setAdvancedWeaponParametersAndInputNames = function setAdvancedWeaponParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["advanced_weapons"] = "advanced_weapons";

  _parameters.push(_input_names["advanced_weapons"]);

  setShotgunParametersAndInputNames(repsecid, _parameters, _input_names);
  setAccessoriesParametersAndInputNames(repsecid, _parameters, _input_names);
  setBlastRadiusParametersAndInputNames(repsecid, _parameters, _input_names);
  setSelectiveFireParametersAndInputNames(repsecid, _parameters, _input_names);
};

var setRepeatingParametersAndInputNames = function setRepeatingParametersAndInputNames(section, id, _parameters, _input_names) {
  var repsecid = "repeating_".concat(section, "_").concat(id);
  _input_names["section"] = section;
  _input_names["id"] = id;
  setCommonParametersAndInputNames(repsecid, _parameters, _input_names);

  if (section === 'skills') {
    setSkillsParametersAndInputNames(repsecid, _parameters, _input_names);
  } else if (section === 'bonds') {
    setBondsParametersAndInputNames(repsecid, _parameters, _input_names);
  } else if (section === 'special') {
    setSpecialParametersAndInputNames(repsecid, _parameters, _input_names);
  } else if (section === 'rituals') {
    setRitualParametersAndInputNames(repsecid, _parameters, _input_names);
  } else if (section === 'weapons') {
    setGeneralWeaponParametersAndInputNames(repsecid, _parameters, _input_names);
    setAdvancedWeaponParametersAndInputNames(repsecid, _parameters, _input_names);
    _input_names["track_bullets"] = "track_bullets";

    _parameters.push(_input_names["track_bullets"]);
  } else {
    console.error("Section ".concat(section, " not found"));
  }
};

Object.entries(_repeating_sections).forEach(function (_ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      element = _ref6[0],
      section = _ref6[1];

  on("clicked:repeating_".concat(section, ":").concat(element, "-action"), function (eventInfo) {
    console.log(eventInfo);
    var id = eventInfo.sourceAttribute.split('_')[2];
    var queryModifier = _queryModifier;
    var _input_names = {};
    var _parameters = [];
    setRepeatingParametersAndInputNames(section, id, _parameters, _input_names);
    console.info("parameters: ".concat(_parameters));
    console.info("input names: ".concat(_input_names));
    clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
  });
}); //levelup character

on("clicked:levelup", function () {
  var update = {};
  var copyarray = arrays['_skills']; // copy of the array containing all skills ranks

  var len = copyarray.length; // length of the original copyarray

  var getarray = []; // used only to update the values

  var summary = {}; // information in the log for the users

  var var_rnd = 0; // random variable of 1d4

  var block_to_insert;
  var container_block;
  var newrowid;
  var newrowattrs = {};
  var oldval = 0;
  var newval = 0;
  var name;
  var addskill = [];
  getSectionIDs('skills', function (idarray) {
    addskills = idarray.map(function (id) {
      return "repeating_skills_".concat(id);
    });
    console.log(addskills); //log of debugging to be sure

    copyarray = copyarray.concat(addskills); // concatenate skill array with repeating skill array

    console.dir(copyarray);
    getSectionIDs("summary", function (idarray) {
      for (var i = 0; i < idarray.length; i++) {
        removeRepeatingRow("repeating_summary_" + idarray[i]);
      }
    });
    copyarray.forEach(function (sk, idx) {
      //console.log(idx);
      if (idx < len) {
        // if the idx<len it means I an in the skill array part
        getAttrs(["".concat(sk), "".concat(sk, "_name"), "".concat(sk, "_fail")], function (val) {
          getarray.push("".concat(sk)); //console.log(val[`${sk}_fail`]);
          //    console.log(`${sk}`);

          if (val["".concat(sk, "_fail")] == 'on') {
            //if the checkbox is checked
            var_rnd = Math.ceil(Math.random() * 4); // generate a random number for each checked value (less number generated)
            //console.log(`${idx}`);

            oldval = parseInt(val["".concat(sk)]) || 0;
            newval = oldval + var_rnd;
            name = val["".concat(sk, "_name")];
            summary["".concat(sk)] = var_rnd; // how much the skill has changed 0-3

            update["".concat(sk)] = newval; // new value of the skill

            update["".concat(sk, "_fail")] = 'off'; // uncheck checkbox
            //block_to_insert = document.createElement( 'div' );
            //block_to_insert.innerHTML = 'This demo DIV block was inserted into the page using JavaScript.' ;
            //container_block = document.getElementById( 'summary' );
            //container_block.appendChild( block_to_insert );

            newrowid = generateRowID();
            newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
            newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
            newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
          }
        });
      } else {
        // if the idx>=len it means I an in the  repeating skill array part
        getAttrs(["".concat(sk, "_name"), "".concat(sk, "_rank"), "".concat(sk, "_fail")], function (val) {
          getarray.push("".concat(sk, "_rank")); //console.log(val[`${sk}_fail`]);
          //    console.log(`${sk}`);

          if (val["".concat(sk, "_fail")] == 'on') {
            var_rnd = Math.ceil(Math.random() * 4); // generate a random number for each checked value (less number generated)
            //console.log(`${idx}`);

            summary["".concat(idx - len, "_rank")] = var_rnd; // since the repeating skill don't have a name, they are identified by number 0-N
            //

            oldval = parseInt(val["".concat(sk, "_rank")]) || 0;
            newval = oldval + var_rnd;
            name = val["".concat(sk, "_name")]; //

            update["".concat(sk, "_rank")] = (parseInt(val["".concat(sk, "_rank")]) || 0) + var_rnd;
            update["".concat(sk, "_fail")] = 'off';
            newrowid = generateRowID();
            newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
            newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
            newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
          }
        });
      }
    }); //console.log(getarray);

    console.log(newrowattrs); // summary in console for the user
    //setAttrs(newrowattrs);

    console.log(summary); // summary in console for the user

    getAttrs(getarray, function () {
      // update fields
      setAttributes(update, false);
      setAttributes(newrowattrs, false);
    }); //console.dir(update);
  });
});

var initializeRolls = function initializeRolls() {
  if (!_isInitialized) {
    // Perform the necessary setup for rolls
    console.info('Initializing rolls...'); // Example setup code

    updateRollsOnOpen();
    updateRepeatingRollsonOpen();
    setResetBreakingPointsOnOpen();
    updateRitualInfoOnOpen();
    console.log('Rolls initialized'); // Set the flag to true after initialization

    _isInitialized = true;
    updateritualskill();
  }
};

var rollSanityDamages = function rollSanityDamages(sanloss) {
  var standard = "{{trackbullets=[[0]]}} {{isCritical=[[0]]}}";
  console.log('Sanity loss: ' + sanloss);
  var rollString = "".concat(prefix_damage_roll, " {{header=^{sanity loss}}}");
  rollString += "{{subheader=".concat(sanloss, "}}  {{damage=[[").concat(sanloss, "]]}} ").concat(standard);
  console.log(rollString);
  startRoll(rollString, function (results) {
    var newroll = getRollDamage(results, 0, 'damage', 0);
    newroll['isCritical'] = 0;
    newroll['trackbullets'] = 0;
    finishRoll(results.rollId, newroll);
    console.log('Sanity loss updated', newroll);
    console.log(results);
  });
};