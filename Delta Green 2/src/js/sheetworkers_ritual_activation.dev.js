"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var RitualCosts = ['sanity_loss_low', 'sanity_loss_high', 'willpower_points_cost', 'power_score_cost', 'hit_points_cost', 'strength_score_cost', 'constitution_score_cost', 'dexterity_score_cost', 'intelligence_score_cost', 'charisma_score_cost'];
var CurrentValues = ['sanity_points', 'willpower_points', 'power_score', 'hit_points', 'strength_score', 'constitution_score', 'dexterity_score', 'intelligence_score', 'charisma_score'];
var RitualRolls = ['name', 'skill_span', 'unnatural_gain', 'study_time', 'sanity_loss_for_learning', 'activation_time', 'description', 'complexity', 'flawed_ritual'];
var RitualDamages = ['damage_target_stat', 'damage_amount', 'damage_isLethal'];
var RitualHeals = ['health_target_stat', 'health_amount', 'health_isLethal'];

var paythecost = function paythecost(sanity_loss, other_costs) {
  var fraction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  // lower sanity loss (not half)
  console.info('pay the cost', other_costs);
  rollSan = "".concat(prefix_ritualloss_roll); //used for before the roll

  var hasCosts = {};
  CurrentValues.forEach(function (attrName) {
    var current = parseInt(other_costs[attrName]) || 0;
    var price = other_costs[attrName + '_cost'];

    if (attrName !== 'sanity_points') {
      if (price === '1' && fraction === 2) {
        price = 0;
      }

      rollSan += " {{".concat(attrName, "_cost=[[").concat(price, "/").concat(fraction, "]]}}");
      rollSan += " {{".concat(attrName, "=").concat(current, "}}");

      if (price !== 0 && price !== '0') {
        rollSan += " {{has_".concat(attrName, "=1}}");
        hasCosts[attrName] = 1;
      } else {
        console.log('no cost for', attrName);
      }

      ;
    }
  });
  rollSan += " {{sanity_points_cost=[[".concat(sanity_loss, "]]}}");
  rollSan += " {{sanity_points=".concat(other_costs.sanity_points, "}}");
  rollSan += " {{has_sanity_points=1}}";
  hasCosts['sanity_points'] = 1;
  console.info('roll for san cost:', rollSan);
  startRoll(rollSan, function (results) {
    var newroll = {};
    var update = {};
    CurrentValues.forEach(function (attrName) {
      var attrCost = attrName + '_cost';
      var old_value = parseInt(other_costs[attrName]) || 0;
      var cost = parseInt(results.results[attrCost].result) || 0;
      console.log("".concat(attrCost, ": ").concat(cost));
      var new_value = Math.max(0, old_value - cost);
      newroll[attrCost] = new_value;

      if (hasCosts.hasOwnProperty(attrName)) {
        update[attrName] = new_value;
      }
    });
    finishRoll(results.rollId, newroll);
    console.info('update', update);
    console.info('newroll', update);
    setAttrs(update, {
      silent: true
    }, function () {
      updatebreakingpoints(); // I need to update the breaking points in the callback

      console.log('sanity points updated');
      console.info(update);
    });
  });
};

var acceptfailure = function acceptfailure(sanity_loss_low, other_costs) {
  paythecost(sanity_loss_low, other_costs, 2);
};

var forceconnection = function forceconnection(sanity_loss_high, other_costs) {
  other_costs['power_score'] = other_costs['power_score'] + 1;
  paythecost(sanity_loss_high, other_costs, 1);
};

var name_and_param = function name_and_param(repsecid, attrName, _parameters, _input_names) {
  _input_names[attrName] = "".concat(repsecid, "_").concat(attrName);
  console.log(_input_names[attrName]);

  _parameters.push(_input_names[attrName]);

  console.log(_parameters);
};

var general_manipulation = function general_manipulation(repsecid, _parameters, _input_names) {
  // general informations to manupulate results
  _input_names['charname'] = 'character_name';

  _parameters.push(_input_names['charname']);

  _input_names['charid'] = 'character_id';

  _parameters.push(_input_names['charid']);

  _input_names['ritualid'] = repsecid;
};

var setRitualCostParametersAndInputNames = function setRitualCostParametersAndInputNames(repsecid, _parameters, _input_names) {
  console.info('RitualCosts', RitualCosts);
  console.info('type of _parameters', _typeof(_parameters));
  console.info('parameters', _parameters);
  RitualCosts.forEach(function (attrName) {
    name_and_param(repsecid, attrName, _parameters, _input_names);
    console.log(attrName + ': ' + _parameters[_input_names[attrName]]);
  });
};

var setRitualDamageParametersAndInputNames = function setRitualDamageParametersAndInputNames(repsecid, _parameters, _input_names) {
  RitualDamages.forEach(function (attrName) {
    name_and_param(repsecid, attrName, _parameters, _input_names);
  });
  RitualHeals.forEach(function (attrName) {
    name_and_param(repsecid, attrName, _parameters, _input_names);
  });
};

var setRitualParametersAndInputNames = function setRitualParametersAndInputNames(repsecid, _parameters, _input_names) {
  console.info('Get general informations');
  general_manipulation(repsecid, _parameters, _input_names);
  console.info(_parameters); // general informations

  console.info('Get RitualRolls');
  RitualRolls.forEach(function (attrName) {
    name_and_param(repsecid, attrName, _parameters, _input_names);
  });
  console.info(_parameters);
  console.info('Get RitualCosts');
  setRitualCostParametersAndInputNames(repsecid, _parameters, _input_names);
  console.info(_parameters);
  console.info('Get RitualDamages');
  setRitualDamageParametersAndInputNames(repsecid, _parameters, _input_names);
  console.log(_parameters);
};

var getOtherCosts = function getOtherCosts(other_costs, values, names, array) {
  array.forEach(function (element) {
    other_costs[element] = values[names[element]] != '' ? values[names[element]] : 0;
    ;
  });
};

var name_to_shorthand = function name_to_shorthand(name) {
  if (name === 'willpower_points') {
    return 'WP';
  }

  if (name === 'hit_points') {
    return 'HP';
  }

  if (name === 'strength_score') {
    return 'STR';
  }

  if (name === 'constitution_score') {
    return 'CON';
  }

  if (name === 'dexterity_score') {
    return 'DEX';
  }

  if (name === 'intelligence_score') {
    return 'INT';
  }

  if (name === 'charisma_score') {
    return 'CHA';
  }

  if (name === 'power_score') {
    return 'POW';
  }
};

var prepare_ritual_rolls = function prepare_ritual_rolls(other_costs, values, names) {
  var localString = '';
  var damage_target_stat = name_to_shorthand(other_costs.damage_target_stat);
  var health_target_stat = name_to_shorthand(other_costs.health_target_stat);
  var damage_amount = other_costs.damage_amount;
  var health_amount = other_costs.health_amount;
  var isLethalAttack = (parseInt(damage_amount, 10) || 0 !== 0) && other_costs.damage_isLethal == 'lethal';
  var isNormalAttack = damage_amount !== '' && other_costs.damage_isLethal == 'normal';
  var isLethalHeal = (parseInt(health_amount, 10) || 0 !== 0) && other_costs.health_isLethal == 'lethal';
  var isNormalHeal = health_amount !== '' && other_costs.health_isLethal == 'normal;';
  var damage_button = '';
  var heal_button = '';
  var const_button_part = '](~' + values[names['charid']] + '|' + names['repsecid'] + '_';
  var prefix_damage_button = '{{damage_button=[';
  var prefix_heal_button = '{{heal_button=[';
  var prefix_power_reaction = '{{power_reaction=[';
  var suffix_damage_button = damage_target_stat + const_button_part + 'damage_button)}}';
  var suffix_heal_button = health_target_stat + const_button_part + 'heal_button)}}';
  var suffix_power_reaction = const_button_part + 'power_reaction)}}';
  var power_reaction_button = prefix_power_reaction + '^{POWER}' + suffix_power_reaction;

  if (isLethalAttack) {
    damage_button += prefix_damage_button;
    damage_button += parseInt(damage_amount, 10) + '% ';
    damage_button += suffix_damage_button;
  }

  if (isNormalAttack) {
    damage_button += prefix_damage_button;
    damage_button += damage_amount.toUpperCase() + ' ';
    damage_button += suffix_damage_button;
  }

  if (isLethalHeal) {
    heal_button += prefix_heal_button;
    heal_button += parseInt(health_amount, 10) + '% ';
    heal_button += suffix_heal_button;
  }

  if (isNormalHeal) {
    heal_button += prefix_heal_button;
    heal_button += health_amount.toUpperCase() + ' ';
    heal_button += suffix_heal_button;
  }

  localString += damage_button;
  localString += heal_button;
  var power_reaction = values[names['power_reaction']] === 'active' ? 1 : 0;

  if (power_reaction === 1) {
    localString += power_reaction_button;
  }

  console.log('localString', localString);
  return localString;
};

var clicked_repeating_rituals = function clicked_repeating_rituals(parameters, names, queryModifier) {
  getAttrs(parameters, function (values) {
    // cost of the ritual
    var other_costs = {};
    getOtherCosts(other_costs, values, names, RitualCosts);
    getOtherCosts(other_costs, values, names, RitualDamages);
    getOtherCosts(other_costs, values, names, RitualHeals); // what is needed to roll

    var rating = values[names['skill_span']];
    var sanity_loss_low = other_costs['sanity_loss_low'];
    var sanity_loss_high = other_costs['sanity_loss_high'];
    console.info('other_costs', other_costs); // info ritual

    var ritual_name = values[names['name']];
    var description = values[names['description']];
    var rollString = "".concat(prefix_ritual_roll, " {{header=").concat(ritual_name, "}}");
    rollString += " {{subheader=".concat(rating, "}}");
    rollString += " {{rating=[[".concat(rating, "]]}}");
    rollString += " {{queryModifier=".concat(queryModifier, "}}");

    if (description !== '') {
      rollString += "{{description=".concat(description, "}}");
    }

    rollString += "{{sanity_loss_low=".concat(sanity_loss_low, "}}");
    rollString += "{{sanity_loss_high=".concat(sanity_loss_high, "}}");
    var hasOtherCosts = false;
    var costString = '';
    Object.entries(other_costs).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      if (value != '' && value != '0') {
        costString += "{{".concat(key, "=").concat(value, "}}");
        hasOtherCosts = true;
      }
    });
    console.info('costString', costString);
    rollString += costString;
    rollString += "{{hasCost=[[0]]}}";
    rollString += prepare_ritual_rolls(other_costs, values, names);
    var flawed_ritual = values[names['flawed_ritual']] === 'active' ? 1 : 0;
    rollString += "{{flawed_ritual=[[".concat(flawed_ritual, "]]}}");
    rollString += "{{modifier=[[".concat(queryModifier, "]]}}");
    var charid = values[names['charid']];
    var ritualid = names['ritualid']; // ritualid is the repeating section id, not a parameter

    rollString += "{{pay_cost=[^{pay the cost}](~".concat(charid, "|").concat(ritualid, "_pay_cost)}}");
    rollString += "{{accept_failure=[^{accept}](~".concat(charid, "|").concat(ritualid, "_accept_failure)}}");
    rollString += "{{reject_failure=[^{reject}](~".concat(charid, "|").concat(ritualid, "_force_connection)}}"); /// This are the only quantities than I need to manupulate

    rollString += "{{isSuccess=[[0]]}}";
    console.info(rollString);
    console.info('parameters', parameters);
    console.info('names', names);
    startRoll(rollString, function (results) {
      var activation_rating = parseInt(results.results.rating.result) || 0;
      var dice = parseInt(results.results.dice.result) || 0;
      var flawed_ritual = results.results.flawed_ritual.result === 1 ? -20 : 0;
      var modifier = (parseInt(results.results.modifier.result) || 0) + flawed_ritual;
      var hasCost = hasOtherCosts ? 1 : 0;
      var isSuccess = dice <= activation_rating + modifier ? 1 : 0;
      newroll = {
        isSuccess: isSuccess,
        dice: dice,
        modifier: modifier,
        hasCost: hasCost
      };
      console.info('newroll', newroll);
      console.info('results', results);
      finishRoll(results.rollId, newroll);
    });
  });
};

var _ritualInfo = ['complexity', 'activation_time', 'activation_time_unit', 'study_time', 'study_time_unit', 'unnatural_gain', 'sanity_loss_for_learning', 'willpower_points_cost', 'power_score_cost', 'hit_points_cost', 'strength_score_cost', 'constitution_score_cost', 'dexterity_score_cost', 'intelligence_score_cost', 'charisma_score_cost', 'sanity_loss_low', 'sanity_loss_high'];

var empty_to_zero = function empty_to_zero(value) {
  return value !== '' || value !== '0' ? value : 0;
};

on('change:repeating_rituals', function (eventinfo) {
  console.info(eventinfo);
  console.log('ritual info to update');
  var id = eventinfo.sourceAttribute.split('_')[2];
  ritual_rolls_info("repeating_rituals_".concat(id));
});

var updateRitualInfoOnOpen = function updateRitualInfoOnOpen() {
  getSectionIDs('repeating_rituals', function (ids) {
    ids.forEach(function (id) {
      ritual_rolls_info("repeating_rituals_".concat(id));
    });
  });
};

var ritual_rolls_info = function ritual_rolls_info(repsecid) {
  var update = {};
  var _names = {};
  var _parameters = [];

  _ritualInfo.forEach(function (ritual_name) {
    _names[ritual_name] = "".concat(repsecid, "_").concat(ritual_name);

    _parameters.push(_names[ritual_name]);
  });

  getAttrs(_parameters, function (values) {
    console.info(_parameters);
    console.info(_names);
    console.info(values);
    var complexity = values[_names['complexity']];
    var sanity_loss_low = empty_to_zero(values[_names['sanity_loss_low']]);
    var sanity_loss_high = empty_to_zero(values[_names['sanity_loss_high']]);
    var activation_time = empty_to_zero(values[_names['activation_time']]) == 0 ? '' : empty_to_zero(values[_names['activation_time']]);
    var activation_time_unit = values[_names['activation_time_unit']];
    var study_time = empty_to_zero(values[_names['study_time']]) == 0 ? '' : empty_to_zero(values[_names['study_time']]);
    var study_time_unit = values[_names['study_time_unit']];
    var unnatural_gain = empty_to_zero(values[_names['unnatural_gain']]);
    var sanity_loss_for_learning = empty_to_zero(values[_names['sanity_loss_for_learning']]);
    var willpower_points_cost = empty_to_zero(values[_names['willpower_points_cost']]);
    var power_score_cost = empty_to_zero(values[_names['power_score_cost']]);
    var hit_points_cost = empty_to_zero(values[_names['hit_points_cost']]);
    var strength_score_cost = empty_to_zero(values[_names['strength_score_cost']]);
    var constitution_score_cost = empty_to_zero(values[_names['constitution_score_cost']]);
    var dexterity_score_cost = empty_to_zero(values[_names['dexterity_score_cost']]);
    var intelligence_score_cost = empty_to_zero(values[_names['intelligence_score_cost']]);
    var charisma_score_cost = empty_to_zero(values[_names['charisma_score_cost']]);
    console.log('ritual info to update');
    console.info(repsecid);
    console.info(values); // complexity text

    update["".concat(repsecid, "_complexity_text")] = "".concat(complexity, " ritual"); // study time text

    var study_time_text = '';

    if (study_time != '') {
      study_time_text = "".concat(study_time, " ").concat(study_time_unit);
    } else {
      study_time_text = study_time_unit;
    }

    update["".concat(repsecid, "_study_time_text")] = "".concat(study_time_text); // learning text

    var learning_cost_text = "".concat(String(sanity_loss_for_learning).toUpperCase(), "SAN");

    if (unnatural_gain != 0) {
      learning_cost_text += "; ".concat(unnatural_gain, " Unnatural");
    }

    update["".concat(repsecid, "_study_cost_text")] = "".concat(learning_cost_text); // activation time text

    var activation_time_text = '';

    if (activation_time != '') {
      activation_time_text = "".concat(activation_time, " ").concat(activation_time_unit);
    } else {
      activation_time_text = activation_time_unit;
    }

    update["".concat(repsecid, "_activation_time_text")] = "".concat(String(activation_time_text).toUpperCase()); // costs text

    var costs_text = '';

    if (willpower_points_cost != 0) {
      costs_text += "".concat(willpower_points_cost, "WP, ");
    }

    if (hit_points_cost != 0) {
      costs_text += "".concat(hit_points_cost, "HP, ");
    }

    if (power_score_cost != 0) {
      costs_text += "".concat(power_score_cost, "POW, ");
    }

    if (strength_score_cost != 0) {
      costs_text += "".concat(strength_score_cost, "STR, ");
    }

    if (constitution_score_cost != 0) {
      costs_text += "".concat(constitution_score_cost, "CON, ");
    }

    if (dexterity_score_cost != 0) {
      costs_text += "".concat(dexterity_score_cost, "DEX, ");
    }

    if (intelligence_score_cost != 0) {
      costs_text += "".concat(intelligence_score_cost, "INT, ");
    }

    if (charisma_score_cost != 0) {
      costs_text += "".concat(charisma_score_cost, "CHA, ");
    }

    if (sanity_loss_low != 0) {
      costs_text += "".concat(sanity_loss_low, "SAN/");
    }

    costs_text += "".concat(sanity_loss_high, "SAN");
    update["".concat(repsecid, "_cost_text")] = "".concat(String(costs_text).toUpperCase());
    console.log('ritual info updated');
    setAttrs(update, {
      silent: true
    }, function () {
      console.log('ritual info updated');
      console.info(update);
    });
  });
};