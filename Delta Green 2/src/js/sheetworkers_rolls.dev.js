"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// update the rollDamage dice for the hidden buttons in the repeating sections
// it should only be used at creation of the field on in versioning
// since characterID and repeatingSectionID does not change
// if it does, using transmogrifer, I might have to add a reset button to reset the rolls
var updateRepeatingDamageRolls = function updateRepeatingDamageRolls(update, character_id, attrPrefix, nameRoll) {
  var hasCritical = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var fullAttrPrefix = attrPrefix === '' ? nameRoll : "".concat(attrPrefix, "_").concat(nameRoll);
  var dicePrefix = "%{".concat(character_id, "|").concat(fullAttrPrefix);
  update["".concat(fullAttrPrefix, "_action")] = "".concat(dicePrefix, "-action}");

  if (hasCritical) {
    update["".concat(fullAttrPrefix, "_critical_action")] = "".concat(dicePrefix, "_critical-action}");
  }
};

var updateRepeatingRolls = function updateRepeatingRolls(section, attrName, id, character_id) {
  var update = {};
  var attrPrefix = "repeating_".concat(section, "_").concat(id);
  var rep_attrName = "".concat(attrPrefix, "_").concat(attrName);
  var dicePrefix = "%{".concat(character_id, "|").concat(rep_attrName);
  update["".concat(rep_attrName, "_action")] = "".concat(dicePrefix, "-action}");
  update["".concat(rep_attrName, "_r")] = id;
  update["".concat(rep_attrName, "_initialized")] = "1";

  if (section === 'weapons') {
    arrays['_weapon_hidden_buttons'].forEach(function (buttonName) {
      updateRepeatingDamageRolls(update, character_id, attrPrefix, buttonName, true);
    });
  }

  if (section === 'rituals') {
    arrays['_ritual_hidden_buttons'].forEach(function (buttonName) {
      updateRepeatingDamageRolls(update, character_id, attrPrefix, buttonName);
    });
  }

  return update;
};

var updateAllRollsOnOpen = function updateAllRollsOnOpen() {
  var update = {};
  getAttrs(['character_id'], function (values) {
    var character_id = values.character_id;
    updateRollsOnOpen(update, character_id);
    updateRepeatingRollsonOpen(update, character_id);
  });
};

var updateRollsOnOpen = function updateRollsOnOpen(update, character_id) {
  console.log('===update rolls===');
  var fullrolls = _allrolls;
  fullrolls.forEach(function (roll) {
    var dicePrefix = "%{".concat(character_id, "|").concat(roll);
    update["".concat(roll, "_action")] = "".concat(dicePrefix, "-action}");

    if (roll.includes('sanity_loss')) {
      updateRepeatingDamageRolls(update, character_id, '', roll + '_success');
      updateRepeatingDamageRolls(update, character_id, '', roll + '_failure');
    }
  });
};

var updateRepeatingRollsonOpen = function updateRepeatingRollsonOpen(update, character_id) {
  Object.entries(_repeating_sections).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        attrName = _ref2[0],
        section = _ref2[1];

    getSectionIDs(section, function (idarray) {
      idarray.forEach(function (id) {
        Object.assign(update, updateRepeatingRolls(section, attrName, id, character_id));
      });
      setAttrs(update, {
        silent: true
      }, function () {
        console.info('update', update);
        console.log('Repeating and Normal Rolls updated');
      });
    });
  });
};

var changeRepeatingRolls = function changeRepeatingRolls(section, attrName, id) {
  getAttrs(['character_id', "repeating_".concat(section, "_").concat(id, "_initialized")], function (values) {
    var character_id = values.character_id;
    var isInitialized = parseInt(values["repeating_".concat(section, "_").concat(id, "_initialized")], 10) || 0;
    var update = {};

    if (isInitialized === 0) {
      console.log('===update rolls===');
      Object.assign(update, updateRepeatingRolls(section, attrName, id, character_id));
    } else {
      console.log('===no need to update===');
    }

    setAttrs(update, {
      silent: true
    }, function () {
      console.info('update', update);
    });
  });
};

var rollwithmodifiers = function rollwithmodifiers(rollString, rollName, queryModifier, additionalParameters) {
  var attr_to_get = arrays['_derived_modifiers'];

  if (additionalParameters.hasOwnProperty('editable_name')) {
    attr_to_get.push(additionalParameters['editable_name']);
  }

  getAttrs(attr_to_get, function (values) {
    var wp_mod = check_for_wp_modifiers(values, rollName);
    rollString += "{{rating=[[@{".concat(rollName, "}]]}}");
    rollString += "{{zero_willpower=[[".concat(wp_mod.zero_willpower, "]]}}");
    rollString += "{{low_willpower=[[".concat(wp_mod.low_willpower, "]]}}} ");
    rollString += "{{modifier=[[".concat(queryModifier, "]]}}");
    rollString += "{{isCritical=[[0]]}} {{isSuccess=[[0]]}}";
    rollString += get_header_skills(values, additionalParameters);
    rollFail = "".concat(rollName, "_fail");
    rollSkillAndStats(rollString, rollName, isSkillName(rollName));
  });
};

var rollAttacks = function rollAttacks(rollValue, options) {
  startRoll(rollValue, function (results) {
    var dice = results.results.dice.result;
    options.modifier = results.results.modifier.result;
    var modifier = check_weapon_modifiers(options);
    var rating = correct_rating(options.rating, modifier);
    var outcome = check_success(dice, rating, options.isSkill);
    newroll = {
      rating: rating,
      modifier: modifier,
      isSuccess: outcome.isSuccess,
      isCritical: outcome.isCritical,
      zero_willpower: options.zero_willpower,
      low_willpower: options.low_willpower,
      advanced_weapons: options.hasAdvancedWeapons
    };
    finishRoll(results.rollId, newroll);
  });
};

var rollSkillAndStats = function rollSkillAndStats(rollValue, rollName, isSkill) {
  // Input:
  // rollValue is the string to roll the dice
  // rollName is the name of the skill or stat
  // rollFail used only for stats to check for failure
  // limit_to_99 is the flag to limit the upper bound rating to 99% (0 for inhuman stats) [0,1]
  startRoll(rollValue, function (results) {
    // low and zero willpower flags only used if the setting is on
    var zero_willpower = results.results.zero_willpower.result;
    var low_willpower = results.results.low_willpower.result;

    var _modifier = correct_modifier(results.results.modifier.result, low_willpower);

    var _rating = correct_rating(results.results.rating.result, _modifier, isSkill);

    var dice = results.results.dice.result;
    var newroll = {};
    var outcome = check_success(dice, _rating, isSkill);
    newroll = {
      rating: _rating,
      modifier: _modifier,
      isSuccess: outcome.isSuccess,
      isCritical: outcome.isCritical,
      zero_willpower: zero_willpower,
      low_willpower: low_willpower
    };
    finishRoll(results.rollId, newroll);
    update = check_for_failed_skill(rollName, outcome.isSuccess, isSkill);
    setAttrs(update, {
      silent: false
    }, function () {
      console.info('update', update);
    });
  });
};

var rollBonds = function rollBonds(rollValue, _value, _names, _parameters) {
  startRoll("".concat(rollValue), function (results) {
    var dice = results.results.dice.result;
    var local_wp = Math.max(0, parseInt(results.results.local_wp.result) - dice);
    var score = Math.max(0, parseInt(results.results.score.result) - dice);
    var original_wp = parseInt(results.results.local_wp.result) || 0;
    var zerowp = local_wp == 0 ? 1 : 0;
    var update = {};
    update[_names['local_wp_points']] = local_wp;
    update["willpower_points"] = local_wp;
    update[_names["hurt"]] = 'hurt';

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
      console.info('update', update);
    });
  });
};

var clicked_repeating_rituals_cost = function clicked_repeating_rituals_cost(parameters, names) {
  getAttrs(parameters, function (values) {
    var ritual_type = names['ritual_type']; // cost of the ritual

    var other_costs = {};
    getOtherCosts(other_costs, values, names, RitualCosts);
    getOtherCosts(other_costs, values, names, CurrentValues);

    if (ritual_type === 'pay_cost') {
      paythecost(other_costs['sanity_loss_failure'], other_costs);
    }

    if (ritual_type === 'force_connection') {
      forceconnection(other_costs['sanity_loss_failure'], other_costs);
    }

    if (ritual_type === 'accept_failure') {
      acceptfailure(other_costs['sanity_loss_success'], other_costs);
    }
  });
};

var setDamageParametersAndInputNames = function setDamageParametersAndInputNames(id, attrName, _parameters, _input_names) {
  _input_names["name"] = "repeating_weapons_".concat(id, "_name");
  _input_names["repsecid"] = "repeating_weapons_".concat(id);

  _parameters.push(_input_names["name"]);

  _input_names["hasammo"] = "repeating_weapons_".concat(id, "_hasammo");

  _parameters.push(_input_names["hasammo"]);

  var flagCritical = false;
  flagCritical = flagCritical || attrName === 'damage_critical';
  flagCritical = flagCritical || attrName === 'double_barrel_critical';
  flagCritical = flagCritical || attrName === 'lethality_percent_critical';
  flagCritical = flagCritical || attrName === 'selective_fire_critical';
  _input_names["isCritical"] = flagCritical == true ? 1 : 0;
  var isCritical = _input_names["isCritical"];

  if (attrName === 'damage' || attrName === 'damage_critical') {
    if (isCritical == 1) {
      _input_names["header"] = "damage (\xD72)";
    } else {
      _input_names["header"] = "damage";
    }

    _input_names["damage"] = "repeating_weapons_".concat(id, "_damage");

    _parameters.push(_input_names["damage"]);

    _input_names["damage_type"] = 'damage';
  } else if (attrName === 'double_barrel' || attrName === 'double_barrel_critical') {
    _input_names["damage_type"] = 'damage';

    if (isCritical == 1) {
      _input_names["header"] = "damage (\xD72)";
    } else {
      _input_names["header"] = "damage";
    }

    _input_names["damage"] = "repeating_weapons_".concat(id, "_double_barrel");

    _parameters.push(_input_names["damage"]);
  } else if (attrName === 'lethality_percent' || attrName === 'lethality_percent_critical') {
    _input_names["damage_type"] = 'lethality_percent';

    if (isCritical == 1) {
      _input_names["header"] = "lethality (\xD72)";
    } else {
      _input_names["header"] = "lethality";
    }

    _input_names["damage"] = "repeating_weapons_".concat(id, "_lethality_percent");

    _parameters.push(_input_names["damage"]);
  } else if (attrName === 'selective_fire' || attrName === 'selective_fire_critical') {
    if (isCritical == 1) {
      _input_names["header"] = "_tmp_header_ (\xD72)";
    } else {
      _input_names["header"] = "_tmp_header_";
    }

    _input_names["damage_type"] = 'lethality_percent';
    _input_names["damage"] = "repeating_weapons_".concat(id, "_selfire_lethality_percent");

    _parameters.push(_input_names["damage"]);

    _input_names["selfire_type"] = "repeating_weapons_".concat(id, "_selfire_type");

    _parameters.push(_input_names["selfire_type"]);
  }

  _input_names["ammo"] = "repeating_weapons_".concat(id, "_ammo");

  _parameters.push(_input_names["ammo"]);

  _input_names["track_bullets"] = "track_bullets";

  _parameters.push(_input_names["track_bullets"]);
};

var addAttackHeader = function addAttackHeader(values, names) {
  if (names.hasOwnProperty('header')) {
    return "{{header=^{".concat(realDmgHeader(values, names), "}}}");
  }

  return '';
};

var realDmgHeader = function realDmgHeader(values, names) {
  if (names.hasOwnProperty) var header = names['header'];

  if (header.includes('_tmp_header_')) {
    // I can use it for other things
    //if (names['rollName']==='selective_fire'){
    return header.replace('_tmp_header_', values[names["selfire_type"]]); //}
  }

  return header;
};

var prefixDamageRoll = function prefixDamageRoll(type_prefix) {
  if (type_prefix === 'damage') {
    return prefix_damage_roll;
  }

  if (type_prefix === 'heal') {
    return prefix_health_roll;
  }

  if (type_prefix === 'attack') {
    return prefix_attack_roll;
  }
};

var clicked_repeating_damages = function clicked_repeating_damages(parameters, names) {
  var type_prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'damage';
  getAttrs(parameters, function (values) {
    var isCritical = names['isCritical'];
    var track_bullets = values[names['track_bullets']] === 'active' ? 1 : 0;
    var hasammo = values[names['hasammo']] === 'active' ? 1 : 0;
    var trackAmmo = track_bullets == 1 && hasammo == 1 ? 1 : 0;
    var currentAmmo = Math.max(0, parseInt(values[names['ammo']]) || 0);
    var selfire_type = values[names['selfire_type']] || '';
    var used_ammo = getUsedAmmo(selfire_type);
    var damage_type = names['damage_type'];
    var damage = values[names['damage']];
    var rollString = "";
    rollString += prefixDamageRoll(type_prefix);
    rollString += addAttackHeader(values, names);
    rollString += addTargetStat(values, names, type_prefix);
    var damageString = '';

    if (damage_type === 'damage') {
      if (isCritical == 1) {
        damageString = "{{damage=[[2*".concat(damage, "]]}}");
      } else {
        damageString = "{{damage=[[".concat(damage, "]]}}");
      }

      rollString = "".concat(rollString, "  ").concat(damageString);
      rollString = check_track_ammo(rollString, trackAmmo, currentAmmo, used_ammo);
    } else if (damage_type === 'lethality_percent') {
      if (isCritical == 1) {
        damage = 2 * damage;
      }

      damageString = "{{lethality_percent=[[".concat(damage, "]]}}");
      rollString = "".concat(rollString, " ").concat(damageString);
      rollString = "".concat(rollString, " {{roll=[[1d100]]}}");
      rollString = check_track_ammo(rollString, trackAmmo, currentAmmo, used_ammo);
    }

    rollString = "".concat(rollString, " {{isCritical=[[").concat(isCritical, "]]}}");
    startRoll(rollString, function (results) {
      var newroll = getRollDamage(results, trackAmmo, damage_type, isCritical);
      newroll['isCritical'] = isCritical;
      newroll['trackbullets'] = trackAmmo;
      finishRoll(results.rollId, newroll);

      if (trackAmmo == 1) {
        var _update = {};
        _update[names['ammo']] = newroll['current_ammo'];
        setAttrs(_update, function () {
          console.info('update', _update);
        });
      }
    });
  });
};

var setDamageRitualParametersAndInputNames = function setDamageRitualParametersAndInputNames(id, _parameters, _input_names) {
  _input_names["name"] = "repeating_rituals_".concat(id, "_name");
  _input_names["isCritical"] = 0;
  var damage_type = _input_names["damage_type"];
  var attack_or_heal = _input_names["attack_or_heal"];
  var repsecid = _input_names["repsecid"]; //

  _parameters.push(_input_names["name"]);

  var prefix_names = "".concat(repsecid, "_").concat(attack_or_heal);
  _input_names["repsecid"] = prefix_names;
  _input_names["damage"] = "".concat(prefix_names, "_").concat(damage_type, "_amount");

  _parameters.push(_input_names["damage"]);

  _input_names["target_stat"] = "".concat(prefix_names, "_target_stat");

  _parameters.push(_input_names["target_stat"]);
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

  if (damage_type === 'lethality_percent') {
    var lethality_percent = results.results.lethality_percent.result;
    var roll = results.results.roll.result;
    var computed_lethality_percent = lethality_percent;
    var computed_roll = DeltaGreenLethalityFail(roll);

    if (critical == 1) {
      computed_lethality_percent = lethality_percent * 2;
      computed_roll = computed_roll * 2;
    }

    newroll['roll'] = computed_roll;
    newroll['lethality_percent'] = computed_lethality_percent;
  }

  return newroll;
};

var clicked_repeating_weapons = function clicked_repeating_weapons(parameters, names, queryModifier) {
  getAttrs(parameters, function (values) {
    // used to set the roll string
    var character_id = values['character_id'];
    var repsecid = names['repsecid'];
    var skillname = values[names['name']];
    var skillrank = setMinMax(values[names['rank']]);
    var trackAmmo = need_to_track_ammo(values, names);
    var current_ammo = Math.max(0, parseInt(values[names['ammo']]) || 0);
    var hasAdvancedWeapons = values[names['advanced_weapons']] === 'active' ? 1 : 0;
    var isShotgun = values[names['shotgun']] === 'active' ? 1 : 0;
    var hasDoubleBarrel = values[names['hasDoubleBarrel']] === 'active' ? 1 : 0;
    var hasSelectiveFire = values[names['selfire']] === 'active' ? 1 : 0;
    var hasAccessories = values[names['accessories']] === 'active' ? 1 : 0;
    var hasBlastRadius = values[names['blast_radius']] === 'active' ? 1 : 0;
    var isAiming = values[names['aiming']] === 'active' ? 1 : 0;
    var lethality_percent = setMinMax(values[names['lethality_percent']]);
    var damage = parseRoll(values[names['damage']]);
    var armor_piercing = Math.min(parseInt(values[names['armor_piercing']], 10) || 0, 0);
    var base_range = values[names['range']];
    var kill_radius = values[names['kill_radius']];
    var _options = {};
    _options['rating'] = skillrank;
    _options['hasLethality'] = lethality_percent > 0 ? 1 : 0;
    _options['hasDamage'] = damage != 0 ? 1 : 0;
    _options['isAiming'] = isAiming;

    if (_options['hasDamage'] === 1) {
      _options['damage'] = damage;
    }

    if (_options['hasLethality'] === 1) {
      _options['lethality_percent'] = lethality_percent;
    }

    if (trackAmmo == 1) {
      _options['trackAmmo'] = 1;
      _options['current_ammo'] = current_ammo;
    }

    if (hasAdvancedWeapons === 1) {
      _options['hasAdvancedWeapons'] = 1;
    }

    if (isShotgun === 1) {
      _options['isShotgun'] = 1;
    }

    if (hasDoubleBarrel === 1) {
      _options['hasDoubleBarrel'] = 1;
      _options['double_barrel'] = parseRoll(values[names['double_barrel']]);
    }

    if (hasSelectiveFire === 1) {
      _options['hasSelectiveFire'] = 1;
      _options['selfire_lethality_percent'] = setMinMax(values[names['selfire_lethality_percent']]);
      _options['selfire_type'] = values[names['selfire_type']];
    }

    if (hasAccessories === 1) {
      _options['hasAccessories'] = 1;
      _options['accessory_modifier'] = values[names['accessory_modifier']];
      _options['accessory_name'] = values[names['accessory_name']];
    }

    if (hasBlastRadius === 1) {
      _options['hasBlastRadius'] = 1;
    }

    var wp_mod = check_for_wp_modifiers(values);
    _options['wp_mod'] = wp_mod;
    var rollString = "".concat(prefix_skill_roll, " {{header=").concat(skillname, "}} {{subheader=").concat(skillrank, "}}");
    var rollValue = "".concat(rollString, " {{rating=[[").concat(skillrank, "]]}} {{modifier=[[").concat(queryModifier, "]]}} ");
    rollValue += " {{low_willpower=[[".concat(wp_mod.low_willpower, "]]}}  {{zero_willpower=[[").concat(wp_mod.zero_willpower, "]]}}");
    rollValue += " {{isCritical=[[0]]}} {{isSuccess=[[0]]}}";
    rollValue += " {{advanced_weapons=[[".concat(hasAdvancedWeapons, "]]}}");

    if (base_range != "") {
      rollValue += '{{base_range=' + base_range + '}}';
    }

    if (armor_piercing != 0) {
      rollValue += '{{armor_piercing=' + armor_piercing + '}}';
    }

    if (kill_radius != "") {
      rollValue += '{{kill_radius=' + kill_radius + '}}';
    }

    var options = setWeaponOptions(_options);
    rollValue += setAdvancedWeaponsString(options, character_id, repsecid); //********************************************

    rollAttacks(rollValue, options);
  });
};

var clicked_repeating_actions = function clicked_repeating_actions(section, parameters, names, queryModifier) {
  initializeRolls(); // Initialize the rolls if flag is not set

  if (section === 'weapons') {
    clicked_repeating_weapons(parameters, names, queryModifier);
  }

  if (section === 'bonds') {
    clicked_repeating_bonds(parameters, names, queryModifier);
  }

  if (section === 'special') {
    clicked_repeating_skills(parameters, names, queryModifier, 0);
  }

  if (section === 'skills') {
    clicked_repeating_skills(parameters, names, queryModifier, 1);
  }

  if (section === 'rituals') {
    clicked_repeating_rituals(parameters, names, queryModifier);
  }
};

var clicked_repeating_skills = function clicked_repeating_skills(parameters, names, queryModifier, isRepSkill) {
  getAttrs(parameters, function (values) {
    var skillname = values[names['name']];
    var skillrank = parseInt(values[names['rank']]) || 0;
    var rollString = "".concat(prefix_skill_roll, " {{header=").concat(skillname, "}} {{subheader=").concat(skillrank, "}} ");
    var wp_modifiers = check_for_wp_modifiers(values);
    var _zero_willpower = wp_modifiers.zero_willpower;
    var _low_willpower = wp_modifiers.low_willpower;
    var rating = parseInt(values[parameters[names['rank']]]) || 0;
    var rollValue = "".concat(rollString, " {{rating=[[").concat(skillrank, "]]}}  {{zero_willpower=[[").concat(_zero_willpower, "]]}} {{low_willpower=[[").concat(_low_willpower, "]]}}}  {{modifier=[[").concat(queryModifier, "]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}");

    if (_zero_willpower != '[[1]]') {
      rollValue = "".concat(rollValue);
    }

    attrName = names['repsecid'];
    rollSkillAndStats(rollValue, attrName, isRepSkill);
  });
};

var clicked_repeating_bonds = function clicked_repeating_bonds(parameters, names) {
  getAttrs(parameters, function (values) {
    var bondname = values[names['name']];
    var bondscore = parseInt(values[names['score']]) || 0;
    var local_wp_points = parseInt(values[names['local_wp_points']]) || 0;
    var local_sanity_points = parseInt(values[names['local_sanity_points']]) || 0;
    var character_id = values['character_id'];

    if (bondscore <= 0) {
      return;
    } // No need to roll if the bond is already broken


    var rollString = "".concat(prefix_bond_roll, " {{header=").concat(bondname, "}} {{subheader=").concat(bondscore, "}} ");
    var rollValue = "".concat(rollString, " {{zerowp=[[0]]}} {{score=[[").concat(bondscore, "]]}} {{local_wp=[[").concat(local_wp_points, "]]}} {{local_sanity=[[").concat(local_sanity_points, "}]]}} {{repress= [^{repress}](~").concat(character_id, "|sanity_points)}}");
    rollValue = "".concat(rollValue, " {{projection=1}} {{repression=1}}");
    rollBonds(rollValue, values, names, parameters);
  });
}; // Important functions


var setCommonParametersAndInputNames = function setCommonParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["name"] = "".concat(repsecid, "_name");
  _input_names["repsecid"] = "".concat(repsecid);

  _parameters.push(_input_names["name"]);

  _input_names["willpower_points"] = "willpower_points";

  _parameters.push("willpower_points");

  _input_names["sanity_points"] = "sanity_points";

  _parameters.push("sanity_points");

  _input_names["low_willpower"] = "low_willpower";

  _parameters.push("low_willpower");

  _input_names["zero_willpower"] = "zero_willpower";

  _parameters.push("zero_willpower");

  _input_names["character_id"] = "character_id";

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
  _input_names["hurt"] = "".concat(repsecid, "_hurt");
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

  _input_names["lethality_percent"] = "".concat(repsecid, "_lethality_percent");

  _parameters.push(_input_names["lethality_percent"]);

  _input_names["kill_radius"] = "".concat(repsecid, "_kill_radius");

  _parameters.push(_input_names["kill_radius"]);
};

var setShotgunParametersAndInputNames = function setShotgunParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["shotgun"] = "".concat(repsecid, "_shotgun");

  _parameters.push(_input_names["shotgun"]);

  _input_names["hasDoubleBarrel"] = "".concat(repsecid, "_hasDoubleBarrel");

  _parameters.push(_input_names["hasDoubleBarrel"]);

  _input_names["double_barrel"] = "".concat(repsecid, "_double_barrel");

  _parameters.push(_input_names["double_barrel"]);
};

var setAccessoriesParametersAndInputNames = function setAccessoriesParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["accessories"] = "".concat(repsecid, "_hasAccessories");

  _parameters.push(_input_names["accessories"]);

  _input_names["accessory_name"] = "".concat(repsecid, "_accessory_name");

  _parameters.push(_input_names["accessory_name"]);

  _input_names["accessory_modifier"] = "".concat(repsecid, "_accessory_modifier");

  _parameters.push(_input_names["accessory_modifier"]);
};

var setBlastRadiusParametersAndInputNames = function setBlastRadiusParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["blast_radius"] = "".concat(repsecid, "_blast_radius");

  _parameters.push(_input_names["blast_radius"]);
};

var setSelectiveFireParametersAndInputNames = function setSelectiveFireParametersAndInputNames(repsecid, _parameters, _input_names) {
  _input_names["selfire"] = "".concat(repsecid, "_selfire");

  _parameters.push(_input_names["selfire"]);

  _input_names["selfire_lethality_percent"] = "".concat(repsecid, "_selfire_lethality_percent");

  _parameters.push(_input_names["selfire_lethality_percent"]);

  _input_names["selfire_type"] = "".concat(repsecid, "_selfire_type");

  _parameters.push(_input_names["selfire_type"]);
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

var initializeRolls = function initializeRolls() {
  if (!_isInitialized) {
    // Perform the necessary setup for rolls
    // Example setup code
    updateAllRollsOnOpen();
    setResetBreakingPointsOnOpen();
    updateRitualInfoOnOpen();
    updateadvancedweapons(); // Set the flag to true after initialization

    _isInitialized = true;
  }
};

var rollSanityDamages = function rollSanityDamages(sanloss) {
  var standard = "{{trackbullets=[[0]]}} {{isCritical=[[0]]}}";
  var rollString = "".concat(prefix_damage_roll, " {{header=^{sanity loss}}}");
  rollString += "{{subheader=".concat(sanloss, "}}  {{damage=[[").concat(sanloss, "]]}} ").concat(standard);
  startRoll(rollString, function (results) {
    var newroll = getRollDamage(results, 0, 'damage', 0);
    newroll['isCritical'] = 0;
    newroll['trackbullets'] = 0;
    finishRoll(results.rollId, newroll);
  });
};