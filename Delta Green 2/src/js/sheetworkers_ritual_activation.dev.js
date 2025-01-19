"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var paythecost = function paythecost(sanity_loss, other_costs) {
  var fraction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  // lower sanity loss (not half)
  rollSan = "".concat(prefix_ritualloss_roll); //used for before the roll

  var hasCosts = {};
  CurrentValues.forEach(function (attrName) {
    var current = parseInt(other_costs[attrName]) || 0;
    var price = other_costs[attrName + '_cost'];

    if (attrName !== 'sanity_points') {
      rollSan += " {{".concat(attrName, "_cost=[[floor(").concat(price, "/").concat(fraction, ")]]}}");
      rollSan += " {{".concat(attrName, "=").concat(current, "}}");

      if (price !== 0 && price !== '0') {
        rollSan += " {{has_".concat(attrName, "=1}}");
        hasCosts[attrName] = 1;
      } else {}

      ;
    }
  });
  rollSan += " {{sanity_points_cost=[[".concat(sanity_loss, "]]}}");
  rollSan += " {{sanity_points=".concat(other_costs.sanity_points, "}}");
  rollSan += " {{has_sanity_points=1}}";
  hasCosts['sanity_points'] = 1;
  startRoll(rollSan, function (results) {
    var newroll = {};
    var update = {};
    CurrentValues.forEach(function (attrName) {
      var attrCost = attrName + '_cost';
      var old_value = parseInt(other_costs[attrName]) || 0;
      var cost = parseInt(results.results[attrCost].result) || 0;
      var new_value = Math.max(0, old_value - cost);
      newroll[attrCost] = new_value;

      if (hasCosts.hasOwnProperty(attrName)) {
        update[attrName] = new_value;
      }
    });
    finishRoll(results.rollId, newroll);
    setAttrs(update, {
      silent: true
    }, function () {
      console.info('update', update);
      updatebreakingpoints(); // I need to update the breaking points in the callback
    });
  });
};

var acceptfailure = function acceptfailure(sanity_loss_success, other_costs) {
  paythecost(sanity_loss_success, other_costs, 2);
};

var forceconnection = function forceconnection(sanity_loss_failure, other_costs) {
  other_costs['power_score'] = other_costs['power_score'] + 1;
  paythecost(sanity_loss_failure, other_costs, 1);
};

var name_and_param = function name_and_param(repsecid, attrName, _parameters, _input_names) {
  _input_names[attrName] = "".concat(repsecid, "_").concat(attrName);

  _parameters.push(_input_names[attrName]);
};

var setRitualCostParametersAndInputNames = function setRitualCostParametersAndInputNames(repsecid, _parameters, _input_names) {
  RitualCosts.forEach(function (attrName) {
    name_and_param(repsecid, attrName, _parameters, _input_names);
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
  // general informations
  RitualRolls.forEach(function (attrName) {
    name_and_param(repsecid, attrName, _parameters, _input_names);
  });
  setRitualCostParametersAndInputNames(repsecid, _parameters, _input_names);
  setRitualDamageParametersAndInputNames(repsecid, _parameters, _input_names);
};

var getOtherCosts = function getOtherCosts(other_costs, values, names, array) {
  array.forEach(function (attrName) {
    other_costs[attrName] = values[names[attrName]] != '' ? values[names[attrName]] : 0;
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

var ritual_power_action = function ritual_power_action(character_id, repsecid, other_costs) {
  var const_button_part = '](~' + character_id + '|';
  var prefix_power_reaction = '{{power_button=[';
  var suffix_power_reaction = const_button_part + 'power)}}';
  return prefix_power_reaction + '^{power}' + suffix_power_reaction;
};
/*

const ritual_attack_or_heal_action = (character_id,repsecid,other_costs,heal_or_attack='attack') => {
    const value_target=heal_or_attack.replace('_damage','').replace('_lethality_percent','');
    const value = real_damage(other_costs,value_target);
    if (value === '') {return '';}
    const const_button_part = '](~'+character_id+'|'+repsecid+'_';
    const target_stat=name_to_shorthand(other_costs[`${value_target}_target_stat`]);
    
    const prefix_button = `{{${heal_or_attack}_button=[`;
    const suffix_button = target_stat+const_button_part+heal_or_attack+'-action)}}';
    return prefix_button+value+suffix_button;
};


const ritual_attack_action = (character_id,repsecid,other_costs) => {
    var ritual_rolls='';
    ritual_rolls+= ritual_attack_or_heal_action(character_id,repsecid,other_costs,'attack_damage');
    ritual_rolls+= ritual_attack_or_heal_action(character_id,repsecid,other_costs,'attack_lethality_percent');
    return ritual_rolls;
};
const ritual_heal_action = (character_id,repsecid,other_costs) => {
    var ritual_rolls='';
    ritual_rolls+= ritual_attack_or_heal_action(character_id,repsecid,other_costs,'heal_damage');
    ritual_rolls+= ritual_attack_or_heal_action(character_id,repsecid,other_costs,'heal_lethality_percent');
    return ritual_rolls;
};
*/


var real_damage = function real_damage(other_costs, heal_or_damage, damage_type) {
  if (damage_type === 'lethality_percent') {
    return "".concat(setMinMax(other_costs["".concat(heal_or_damage, "_").concat(damage_type, "_amount")]), "% ");
  } else if (damage_type === 'damage') {
    return parseRoll(other_costs["".concat(heal_or_damage, "_").concat(damage_type, "_amount")]);
  }

  return '';
};

var ritual_attack_or_heal_action = function ritual_attack_or_heal_action(character_id, repsecid, other_costs, heal_or_attack, damage_type) {
  var value = real_damage(other_costs, heal_or_attack, damage_type);

  if (value === 0) {
    return '';
  }

  var const_button_part = '](~' + character_id + '|' + repsecid + '_';
  var target_stat = name_to_shorthand(other_costs["".concat(heal_or_attack, "_target_stat")]);
  var prefix_button = "{{".concat(heal_or_attack, "_button=[");
  var suffix_button = " ".concat(target_stat).concat(const_button_part).concat(heal_or_attack, "_").concat(damage_type, "-action)}}");
  return prefix_button + value + suffix_button;
};

var ritual_attack_action = function ritual_attack_action(character_id, repsecid, other_costs, damage_type) {
  return ritual_attack_or_heal_action(character_id, repsecid, other_costs, 'attack', damage_type);
};

var ritual_heal_action = function ritual_heal_action(character_id, repsecid, other_costs, damage_type) {
  return ritual_attack_or_heal_action(character_id, repsecid, other_costs, 'heal', damage_type);
};

var prepare_ritual_rolls = function prepare_ritual_rolls(other_costs, values, names) {
  var localString = '';
  var attack_type = other_costs['attack_isLethal'];
  var heal_type = other_costs['heal_isLethal'];
  localString += ritual_attack_action(values[names['character_id']], names['repsecid'], other_costs, attack_type);
  localString += ritual_heal_action(values[names['character_id']], names['repsecid'], other_costs, heal_type);

  if (values[names['power_reaction']] === 'active') {
    localString += ritual_power_action(values[names['character_id']], names['repsecid']);
  }

  return localString;
};

var clicked_repeating_rituals = function clicked_repeating_rituals(parameters, names, queryModifier) {
  getAttrs(parameters, function (values) {
    // cost of the ritual
    var other_costs = {};
    getOtherCosts(other_costs, values, names, RitualCosts);
    getOtherCosts(other_costs, values, names, RitualDamages);
    getOtherCosts(other_costs, values, names, RitualHeals); //----------------------------------------------------------------------------------------------
    //---------Not used for the roll, they are always zero. Ask Shane if he wants it----------------
    //const wp_mod=check_for_wp_modifiers(values,rollName);

    var low_willpower = 0; //wp_mod.low_willpower;

    var zero_willpower = 0; //wp_mod.zero_willpower;
    //----------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------
    // what is needed to roll

    var rating = values[names['skill_span']];
    var sanity_loss_success = other_costs['sanity_loss_success'];
    var sanity_loss_failure = other_costs['sanity_loss_failure']; // info ritual

    var ritual_name = values[names['name']];
    var description = values[names['description']];
    var rollString = "".concat(prefix_ritual_roll, " {{header=").concat(ritual_name, "}}");
    rollString += " {{subheader=".concat(rating, "}}");
    rollString += " {{rating=[[".concat(rating, "]]}}");
    rollString += " {{queryModifier=".concat(queryModifier, "}}");

    if (description !== '') {
      rollString += "{{description=".concat(description, "}}");
    }

    rollString += "{{sanity_loss_success=".concat(sanity_loss_success, "}}");
    rollString += "{{sanity_loss_failure=".concat(sanity_loss_failure, "}}");
    rollString += "{{zero_willpower=[[".concat(zero_willpower, "]]}}");
    rollString += "{{low_willpower=[[".concat(low_willpower, "]]}}");
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
    rollString += costString;
    rollString += "{{hasCost=[[0]]}}";
    rollString += prepare_ritual_rolls(other_costs, values, names);
    var flawed_ritual = values[names['flawed_ritual']] === 'active' ? 1 : 0;

    if (flawed_ritual === 1) {
      rollString += "{{flawed_ritual=".concat(flawed_ritual, "}}");
    }

    rollString += "{{modifier=[[".concat(queryModifier, "]]}}");
    var character_id = values['character_id'];
    var repsecid = names['repsecid']; // ritualid is the repeating section id, not a parameter

    rollString += "{{pay_cost=[^{pay the cost}](~".concat(character_id, "|").concat(repsecid, "_pay_cost)}}");
    rollString += "{{accept_failure=[^{accept}](~".concat(character_id, "|").concat(repsecid, "_accept_failure)}}");
    rollString += "{{reject_failure=[^{reject}](~".concat(character_id, "|").concat(repsecid, "_force_connection)}}"); /// This are the only quantities than I need to manupulate

    rollString += "{{isSuccess=[[0]]}}";
    startRoll(rollString, function (results) {
      var activation_rating = parseInt(results.results.rating.result) || 0;
      var dice = parseInt(results.results.dice.result) || 0;

      var _flawed_ritual = flawed_ritual === 1 ? -20 : 0;

      var _modifier = correct_modifier((parseInt(results.results.modifier.result) || 0) + flawed_ritual, low_willpower);

      var _rating = correct_rating(activation_rating, _modifier);

      var hasCost = hasOtherCosts ? 1 : 0;
      var outcome = check_success(dice, _rating);
      newroll = {
        isSuccess: outcome.isSuccess,
        IsCritical: outcome.IsCritical,
        dice: dice,
        modifier: _modifier,
        hasCost: hasCost,
        flawed_ritual: _flawed_ritual,
        low_willpower: low_willpower,
        zero_willpower: zero_willpower
      };
      finishRoll(results.rollId, newroll);
    });
  });
};

var empty_to_zero = function empty_to_zero(value) {
  return value !== '' || value !== '0' ? value : 0;
};

var updateRitualInfoOnOpen = function updateRitualInfoOnOpen() {
  getSectionIDs("rituals", function (ids) {
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
    var complexity = values[_names['complexity']];
    var sanity_loss_success = empty_to_zero(values[_names['sanity_loss_success']]);
    var sanity_loss_failure = empty_to_zero(values[_names['sanity_loss_failure']]);
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
    var charisma_score_cost = empty_to_zero(values[_names['charisma_score_cost']]); // complexity text

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

    if (sanity_loss_success != 0) {
      costs_text += "".concat(sanity_loss_success, "SAN/");
    }

    costs_text += "".concat(sanity_loss_failure, "SAN");
    update["".concat(repsecid, "_cost_text")] = "".concat(String(costs_text).toUpperCase());
    setAttrs(update, {
      silent: true
    }, function () {
      console.info('update', update);
    });
  });
};