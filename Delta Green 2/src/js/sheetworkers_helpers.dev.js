"use strict";

var setWeaponOptions = function setWeaponOptions(_ref) {
  var _ref$isFlawed = _ref.isFlawed,
      isFlawed = _ref$isFlawed === void 0 ? 0 : _ref$isFlawed,
      _ref$isAiming = _ref.isAiming,
      isAiming = _ref$isAiming === void 0 ? 0 : _ref$isAiming,
      _ref$modifier = _ref.modifier,
      modifier = _ref$modifier === void 0 ? 0 : _ref$modifier,
      _ref$wp_mod = _ref.wp_mod,
      wp_mod = _ref$wp_mod === void 0 ? {
    low_willpower: 0,
    zero_willpower: 0
  } : _ref$wp_mod,
      _ref$hasLethality = _ref.hasLethality,
      hasLethality = _ref$hasLethality === void 0 ? 0 : _ref$hasLethality,
      _ref$hasDamage = _ref.hasDamage,
      hasDamage = _ref$hasDamage === void 0 ? 0 : _ref$hasDamage,
      _ref$damage = _ref.damage,
      damage = _ref$damage === void 0 ? '' : _ref$damage,
      _ref$rating = _ref.rating,
      rating = _ref$rating === void 0 ? 0 : _ref$rating,
      _ref$lethality_percen = _ref.lethality_percent,
      lethality_percent = _ref$lethality_percen === void 0 ? 0 : _ref$lethality_percen,
      _ref$hasAdvancedWeapo = _ref.hasAdvancedWeapons,
      hasAdvancedWeapons = _ref$hasAdvancedWeapo === void 0 ? 0 : _ref$hasAdvancedWeapo,
      _ref$isShotgun = _ref.isShotgun,
      isShotgun = _ref$isShotgun === void 0 ? 0 : _ref$isShotgun,
      _ref$hasDoubleBarrel = _ref.hasDoubleBarrel,
      hasDoubleBarrel = _ref$hasDoubleBarrel === void 0 ? 0 : _ref$hasDoubleBarrel,
      _ref$hasSelectiveFire = _ref.hasSelectiveFire,
      hasSelectiveFire = _ref$hasSelectiveFire === void 0 ? 0 : _ref$hasSelectiveFire,
      _ref$hasAccessories = _ref.hasAccessories,
      hasAccessories = _ref$hasAccessories === void 0 ? 0 : _ref$hasAccessories,
      _ref$hasBlastRadius = _ref.hasBlastRadius,
      hasBlastRadius = _ref$hasBlastRadius === void 0 ? 0 : _ref$hasBlastRadius,
      _ref$trackAmmo = _ref.trackAmmo,
      trackAmmo = _ref$trackAmmo === void 0 ? 0 : _ref$trackAmmo,
      _ref$current_ammo = _ref.current_ammo,
      current_ammo = _ref$current_ammo === void 0 ? 0 : _ref$current_ammo,
      _ref$double_barrel = _ref.double_barrel,
      double_barrel = _ref$double_barrel === void 0 ? '' : _ref$double_barrel,
      _ref$selfire_lethalit = _ref.selfire_lethality_percent,
      selfire_lethality_percent = _ref$selfire_lethalit === void 0 ? 0 : _ref$selfire_lethalit,
      _ref$selfire_type = _ref.selfire_type,
      selfire_type = _ref$selfire_type === void 0 ? '' : _ref$selfire_type,
      _ref$accessory_modifi = _ref.accessory_modifier,
      accessory_modifier = _ref$accessory_modifi === void 0 ? 0 : _ref$accessory_modifi,
      _ref$accessory_name = _ref.accessory_name,
      accessory_name = _ref$accessory_name === void 0 ? '' : _ref$accessory_name,
      _ref$isSkill = _ref.isSkill,
      isSkill = _ref$isSkill === void 0 ? 1 : _ref$isSkill;
  var _hasAdvancedWeapons = hasAdvancedWeapons;
  var _hasLethality = hasLethality;
  var _hasDamage = hasDamage;
  var _trackAmmo = trackAmmo;
  var _rating = rating;
  var _isSkill = isSkill;
  var _modifier = modifier;
  var _wp_mod = wp_mod;
  var _isFlawed = isFlawed;
  var _isAiming = isAiming;
  var _isShotgun = 0;
  var _hasDoubleBarrel = 0;
  var _hasSelectiveFire = 0;
  var _hasAccessories = 0;
  var _hasBlastRadius = 0;
  var _double_barrel = double_barrel;
  var _selfire_lethality_percent = selfire_lethality_percent;
  var _selfire_type = selfire_type;
  var _selfire_ammo = 0;
  var _current_ammo = current_ammo;

  var _has_ammo = _current_ammo > 0 ? 1 : 0;

  var _accessory_modifier = accessory_modifier;

  var _accessory_name = accessory_name === '' ? '^{accessory}' : accessory_name;

  var _damage = '';
  var _lethality_percent = 0;
  var _low_willpower = 0;
  var _zero_willpower = 0;

  if (_wp_mod.hasOwnProperty('low_willpower')) {
    _low_willpower = _wp_mod.low_willpower;
  }

  if (_wp_mod.hasOwnProperty('zero_willpower')) {
    _zero_willpower = _wp_mod.zero_willpower;
  }

  if (_hasDamage == 1) {
    _damage = damage;
  }

  if (_hasLethality == 1) {
    _lethality_percent = lethality_percent;
  }

  if (_hasAdvancedWeapons == 1) {
    _isShotgun = isShotgun;
    _hasDoubleBarrel = hasDoubleBarrel;
    _hasSelectiveFire = hasSelectiveFire;
    _hasAccessories = hasAccessories;
    _hasBlastRadius = hasBlastRadius;
  }

  if (hasDoubleBarrel == 1) {
    _double_barrel = double_barrel;
  }

  if (hasSelectiveFire == 1) {
    _selfire_lethality_percent = selfire_lethality_percent;
    _selfire_type = selfire_type;
    _selfire_ammo = getRollDamage(selfire_type);
  }

  return {
    hasLethality: _hasLethality,
    lethality_percent: _lethality_percent,
    isSkill: _isSkill,
    rating: _rating,
    hasDamage: _hasDamage,
    damage: _damage,
    isShotgun: _isShotgun,
    hasDoubleBarrel: _hasDoubleBarrel,
    hasSelectiveFire: _hasSelectiveFire,
    hasAccessories: _hasAccessories,
    hasBlastRadius: _hasBlastRadius,
    trackAmmo: _trackAmmo,
    current_ammo: _current_ammo,
    double_barrel: _double_barrel,
    selfire_lethality_percent: _selfire_lethality_percent,
    selfire_type: _selfire_type,
    selfire_ammo: _selfire_ammo,
    accessory_modifier: _accessory_modifier,
    accessory_name: _accessory_name,
    hasAdvancedWeapons: _hasAdvancedWeapons,
    zero_willpower: _zero_willpower,
    low_willpower: _low_willpower,
    modifier: _modifier,
    isFlawed: _isFlawed,
    isAiming: _isAiming
  };
};

var getInitializationFlags = function getInitializationFlags(statInfo, values) {
  // note: flags are INITIALLY set to 1, it was a mistake but now it's better to keep it that way
  var statName = statInfo['name'];
  var _stat_used = {
    strength: 'initial_str',
    constitution: 'initial_con'
  };
  var InitializationFlags = {
    'initial_hp': 1,
    'initial_str': 1,
    'initial_con': 1,
    'initial_san': 1
  };
  Object.keys(InitializationFlags).forEach(function (key) {
    if (values.hasOwnProperty(key) && values[key] == 0) {
      InitializationFlags[key] = 0;
    }
  });

  if (_stat_used.hasOwnProperty(statName)) {
    InitializationFlags[_stat_used[statName]] = 0;
  }

  console.info('InitializationFlags:', InitializationFlags);
  return InitializationFlags;
};

var setInitialHp = function setInitialHp(update, values, statInfo, InitializationFlags) {
  if (statInfo['name'] !== 'strength' && statInfo['name'] !== 'constitution') {
    return;
  } // check if the stat is strength or constitution


  if (statInfo['name'] == 'strength') {
    InitializationFlags["initial_str"] = 0;
  } // set the initial strength to 0


  if (statInfo['name'] == 'constitution') {
    InitializationFlags["initial_con"] = 0;
  } // set the initial constitution to 0	


  if (InitializationFlags['initial_str'] == 1 || InitializationFlags['initial_con'] == 1) {
    return;
  } // if either flag is set, I cannot set the initial hp
  ///////// Set Hp regardless of the initial hp


  var _strength_score = Math.max(0, parseInt(values['strength_score'], 10) || 0);

  var _constitution_score = Math.max(0, parseInt(values['constitution_score'], 10) || 0);

  var initial_hit_points = Math.ceil((_strength_score + _constitution_score) / 2); // update max hp regardless of the initial hp

  update['hit_points_max'] = initial_hit_points; //////// If the initial hp is not set yet, set it

  if (InitializationFlags['initial_hp'] == 0) {
    return;
  } // check if initial hp is already set


  update['hit_points'] = initial_hit_points;
  update['hit_points_old'] = initial_hit_points;
  InitializationFlags['initial_hp'] = 0;
};

var setInitialPower = function setInitialPower(update, values, statInfo, InitializationFlags) {
  if (statInfo['name'] !== 'power') {
    return;
  } // only power can change the sanity points


  var sanmax = setSanMax(values["unnatural"]);
  var InitialWillPower = statInfo.score;
  update["willpower_points_max"] = InitialWillPower; // only updates if the flag is set

  update['sanity_points_max'] = sanmax;

  if (InitializationFlags['initial_san'] == 0) {
    return;
  }

  var InitialSanity = statInfo.stat;
  var InitialBreakingPoint = statInfo.score * 4; //update['initial_san']=0;

  update['sanity_points'] = InitialSanity;
  update['sanity_points_old'] = InitialSanity;
  update['breaking_point'] = InitialBreakingPoint;
  update['breaking_point_max'] = InitialBreakingPoint;
  update['willpower_points'] = InitialWillPower;
  InitializationFlags['initial_san'] = 0;
};

var setStatScore = function setStatScore(score, statName) {
  var validNames = ['strength', 'constitution', 'dexterity', 'power', 'intelligence', 'charisma'];

  if (!validNames.includes(statName)) {
    return false;
  }

  var _score = Math.max(0, parseInt(score));

  return {
    name: statName,
    stat: _score * 5,
    score: _score
  };
};

var setSanMax = function setSanMax(unnatural) {
  // Input:
  // unnatural is the unnatural value
  // Output:
  // the maximum value for sanity points
  return 99 - setMinMax(unnatural, 0, 99);
};

var setDiceSection = function setDiceSection(character_id, repsecid) {
  var use_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // Input:
  // charid is the character id
  // repsecid is the repeating section id
  // Output:
  // ](~<charid>|<repsecid>_
  return '](~' + character_id + '|' + repsecid + (use_ ? '_' : '');
};

var setAdvancedWeaponsString = function setAdvancedWeaponsString(options, character_id, repsecid) {
  var advancedWeaponsString = '';
  var dice_section = setDiceSection(character_id, repsecid);
  var nothing_section = setDiceSection(character_id, 'nothing)}}', false);
  var rollEnding = '-action)}}';

  if (options.hasAdvancedWeapons === 1) {
    if (options.isShotgun === 1) {
      advancedWeaponsString += '{{shotgun=[[1]]}}';
    }

    if (options.hasDoubleBarrel === 1) {
      if (options.double_barrel != '') {
        advancedWeaponsString += '{{double_barrel=[' + options.double_barrel + dice_section + 'double_barrel' + rollEnding;
        advancedWeaponsString += '{{voiddouble_barrel=[' + options.double_barrel + nothing_section;
        advancedWeaponsString += '{{double_barrel_critical=[(' + options.double_barrel + ')×2' + dice_section + 'double_barrel_critical' + rollEnding;
        advancedWeaponsString += '{{voiddouble_barrel_critical=[(' + options.double_barrel + ')×2' + nothing_section;
      }
    }

    if (options.hasSelectiveFire === 1) {
      if (options.selfire_lethality_percent > 0) {
        var critical_selfire_lethality_percent = options.selfire_lethality_percent * 2;
        advancedWeaponsString += '{{selective_fire=[' + options.selfire_type;
        advancedWeaponsString += '(' + options.selfire_lethality_percent + '%)' + dice_section + 'selective_fire' + rollEnding;
        advancedWeaponsString += '{{voidselective_fire=[' + options.selfire_type;
        advancedWeaponsString += '(' + options.selfire_lethality_percent + '%)' + nothing_section;
        advancedWeaponsString += '{{selective_fire_critical=[' + options.selfire_type;
        advancedWeaponsString += '(' + critical_selfire_lethality_percent + '%)' + dice_section + 'selective_fire_critical' + rollEnding;
        advancedWeaponsString += '{{voidselective_fire_critical=[' + options.selfire_type;
        advancedWeaponsString += '(' + critical_selfire_lethality_percent + '%)' + nothing_section;
      }

      if (options.selfire_ammo >= options.current_ammo && options.trackAmmo == 1) {
        advancedWeaponsString += '{{selfire_noammo=1}}';
      } else {
        advancedWeaponsString += '{{selfire_wammo=0}}';
      }
    }

    if (options.hasAccessories === 1) {
      advancedWeaponsString += '{{accessories=[[1]]}}';
      advancedWeaponsString += '{{accessory_name=' + options.accessory_name + '}}';
      advancedWeaponsString += '{{accessory_modifier=[[' + options.accessory_modifier + ']]}}';
    }

    if (options.hasBlastRadius === 1) {
      advancedWeaponsString += '{{blast_radius=[[1]]}}';
    }
  }

  if (options.trackAmmo) {
    advancedWeaponsString += '{{trackbullets=1}}';
    advancedWeaponsString += '{{current_ammo=[[' + options.current_ammo + ']]}}';

    if (options.current_ammo == 0) {
      advancedWeaponsString += '{{noammo=1}}';
    } else {
      advancedWeaponsString += '{{wammo=0}}';
    }
  } else {
    advancedWeaponsString += '{{wammo=0}}';
  }

  if (options.hasDamage == 1) {
    advancedWeaponsString += '{{damage= [' + options.damage + dice_section + 'damage' + rollEnding;
    advancedWeaponsString += '{{voiddamage= [' + options.damage + nothing_section;
    advancedWeaponsString += '{{damage_critical= [(' + options.damage + ')×2' + dice_section + 'damage_critical' + rollEnding;
    advancedWeaponsString += '{{voiddamage_critical= [(' + options.damage + ')×2' + nothing_section;
  }

  if (options.hasLethality == 1) {
    var label_lethality = "^{Lethality}";
    advancedWeaponsString += '{{lethality_percent= [';
    advancedWeaponsString += label_lethality + ' (' + options.lethality_percent + '%)';
    advancedWeaponsString += dice_section + 'lethality_percent' + rollEnding;
    advancedWeaponsString += '{{voidlethality_percent= [';
    advancedWeaponsString += label_lethality + ' (' + options.lethality_percent + '%)' + nothing_section;
    advancedWeaponsString += '{{lethality_percent_critical= [';
    advancedWeaponsString += label_lethality + ' (2×' + options.lethality_percent + '%)';
    advancedWeaponsString += dice_section + 'lethality_percent_critical' + rollEnding;
    advancedWeaponsString += '{{voidlethality_percent_critical= [';
    advancedWeaponsString += label_lethality + ' (2×' + options.lethality_percent + '%)' + nothing_section;
  }

  return advancedWeaponsString;
};

var check_for_wp_modifiers = function check_for_wp_modifiers(values, roll) {
  var _willpower_points = parseInt(values["willpower_points"]) || 0;

  var flag_for_zero_willpower = values["zero_willpower"] == 1;
  flag_for_zero_willpower = flag_for_zero_willpower && _willpower_points == 0 && roll !== 'luck';

  var _zero_willpower = flag_for_zero_willpower ? 1 : 0;

  var flag_for_low_willpower = values["low_willpower"] == 1;
  flag_for_low_willpower = flag_for_low_willpower && _willpower_points <= 2;
  flag_for_low_willpower = flag_for_low_willpower && roll !== 'luck' && roll !== 'sanity_points'; /// important it is either one or the other

  flag_for_low_willpower = flag_for_low_willpower && flag_for_zero_willpower == false;

  var _low_willpower = flag_for_low_willpower ? 1 : 0;

  return {
    zero_willpower: _zero_willpower,
    low_willpower: _low_willpower
  };
};

var check_success = function check_success(dice, rating) {
  var isSkill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  // Input:
  // dice is the result of the roll
  // rollName is the name of the skill or stat
  // rollFail used only for stats to check for failure
  // rating is the rating of the skill or stat
  // isSkill is the flag to check if it's a skill or a stat [0,1]
  var isSuccess = 0;
  var isCritical = 0;

  if (dice == 100) {
    // 100 is always a fumble
    isCritical = 1;
    isSuccess = 0;
  } else {
    // check for criticals normally
    isSuccess = dice <= rating ? 1 : 0;
    isCritical = _criticals.includes(dice) ? 1 : 0;
  }

  var isInhuman = isSkill == 0 && rating >= _INHUMAN_STAT_;
  var isNormalSuccess = isSuccess == 1 && isCritical == 0;

  if (isInhuman && isNormalSuccess) {
    // special case for stats to evaluate criticals
    var score = Math.round(rating / 5);
    isCritical = dice <= score ? 1 : 0;
  }

  return {
    isSuccess: isSuccess,
    isCritical: isCritical
  };
};

var check_weapon_modifiers = function check_weapon_modifiers(options) {
  var advanced_weapons = options.hasAdvancedWeapons;
  var modifier = options.modifier;
  var low_willpower = options.low_willpower;

  if (advanced_weapons == 0) {
    return correct_modifier(modifier, low_willpower);
  }

  if (options.isShotgun == 1 || options.hasBlastRadius == 1) {
    modifier += 20;
  }

  if (options.hasAccessories == 1) {
    modifier += options.accessory_modifier;
  }

  if (options.isFlawed == 1) {
    modifier -= 20;
  }

  if (options.isAiming == 1) {
    modifier += 20;
  }

  return correct_modifier(modifier, low_willpower);
};

var correct_modifier = function correct_modifier(modifier, low_willpower) {
  var limit_to_40 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  // Input:
  // modifier is the base modifier provided by the used
  // low_willpowe is the  low willpower flag [0,1]
  // limit_to_40 is the flag to limit the upper bound modifier to 40% (not used but for future and debugging) [0,1]
  // Output:
  // the corrected modifier
  var corrected_modifier = modifier - 20 * low_willpower;
  return limit_to_40 == 1 ? Math.min(40, corrected_modifier) : corrected_modifier;
};

var correct_rating = function correct_rating(rating, modifier) {
  var limit_to_99 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  // Input:
  // rating is the base rating of the skill
  // modifier is the corrected modifier
  // limit_to_99 is the flag to limit the upper bound rating to 99% (0 for inhuman stats) [0,1]
  // Output:
  // the corrected rating
  var corrected_rating = rating + modifier;
  return limit_to_99 == 1 ? Math.min(99, corrected_rating) : corrected_rating;
};

var check_sanloss = function check_sanloss(sanloss, attrName) {
  if (attrName === 'sanity_loss_success') {
    return sanloss == '' ? 0 : sanloss;
  } else if (attrName === 'sanity_loss_failure') {
    return sanloss == '' ? 1 : sanloss;
  }
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
  var selfire_type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (selfire_type === 'short burst') {
    return 3;
  }

  ;

  if (selfire_type === 'long burst') {
    return 5;
  }

  ;

  if (selfire_type === 'short spray') {
    return 10;
  }

  ;

  if (selfire_type === 'long spray') {
    return 20;
  }

  ;
  return 1;
};

var need_to_track_ammo = function need_to_track_ammo(_values, _names) {
  var track_bullets = _values[_names['track_bullets']] === 'active' ? 1 : 0;
  var hasammo = _values[_names['hasammo']] === 'active' ? 1 : 0;
  return track_bullets == 1 && hasammo == 1 ? 1 : 0;
};

var setAttributes = function setAttributes(update, silent) {
  silent === true ? setAttrs(update, {
    silent: true
  }) : setAttrs(update);
}; // check skill value for weapons and special training


var isSkillNumber = function isSkillNumber(str) {
  var num = Number(str);
  return !isNaN(num) && num >= 0 && num <= 99;
};

var isSkillName = function isSkillName(rollName) {
  return arrays["_skills"].includes(rollName) ? 1 : 0;
}; // check if linking skill in in linking form


var isStringInForm = function isStringInForm(str) {
  var regex = /^@\{[\w\s]+\}$/;
  return regex.test(str);
}; // used for linking skills


var cleanedSkill = function cleanedSkill(str) {
  return String(str).toLowerCase().replace(' ', '_').replace('@{', '').replace('}', '');
}; // When the trigger comes from another call


var isMinorityReport = function isMinorityReport(eventInfo) {
  return !eventInfo.hasOwnProperty('newValue');
}; // check if the format is the one of a linking skill


var isValidSkill = function isValidSkill(str) {
  var compar = cleanedSkill(String(str));
  return arrays['_skills'].concat(arrays['_stats']).concat(['unnatural', 'ritual_skill']).includes(compar);
};

var isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

var getSections = function getSections(sectionDetails, callback) {
  var queueClone = _.clone(sectionDetails);

  var worker = function worker(queue) {
    var repeatAttrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var sections = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var detail = queue.shift();
    getSectionIDs(detail.section, function (IDs) {
      sections[detail.section] = IDs;
      IDs.forEach(function (id) {
        detail.fields.forEach(function (f) {
          repeatAttrs.push("".concat(detail.section, "_").concat(id, "_").concat(f));
        });
      });
      repeatAttrs.push("_reporder_".concat(detail.section));

      if (queue.length) {
        worker(queue, repeatAttrs, sections);
      } else {
        callback(repeatAttrs, sections);
      }
    });
  };

  if (!queueClone[0]) {
    callback([], {});
  } else {
    worker(queueClone);
  }
};

var get_header_skills = function get_header_skills(values, property) {
  var _header = "";

  if (values.hasOwnProperty(property['editable_name'])) {
    _header = '{{header=^{' + property['editable_type'] + '}';
    _header = _header + ' (' + values[property['editable_name']] + ')}}';
  } else {
    _header = '{{header=^{' + property['name'] + '} }}';
  }

  return _header;
};

var check_for_failed_skill = function check_for_failed_skill(rollName) {
  var isSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var isSkill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  // Input:
  // rollName is the name of the skill if it's a skill, if it's a repeating section, it's the name of the section
  // outcome is the result of the roll [0,1]
  // isSkill is the flag to check if it's a skill [0,1]
  var failure = {};

  if (isSkill == false) {
    return failure;
  }

  ; // if it's not a skill, return empty object

  if (isSuccess == 1) {
    return failure;
  }

  ; // if it's a success, return empty object

  failure["".concat(rollName, "_fail")] = 'on';
  return failure;
};

var setMinMax = function setMinMax(skill) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 99;
  var IntegerSkill = parseInt(skill) || 0;

  if (min > max) {
    return IntegerSkill;
  }

  return Math.min(Math.max(IntegerSkill, min), max);
};

var isValidLinkInput = function isValidLinkInput(newValue) {
  return isStringInForm(newValue) && isValidSkill(newValue);
};

var parseRoll = function parseRoll(roll) {
  var regex_int = /^(\s*[\+\-]?\d{1,100}\s*)$/;
  var regex_roll = /^((\s*[\+\-\(\)]\s*){0,4}?\d{0,10}[dD]?\d{1,10}((\s*[\+\-\*\/\(\)]\s*){0,4}?\d{0,10}[dD]?\d{1,10})*(\s*[\)]\s*){0,4}?)+$/;

  if (regex_int.test(roll)) {
    return parseInt(roll);
  }

  if (regex_roll.test(roll)) {
    return roll.replace(/\s/g, '').toUpperCase();
  }

  return 0;
};

var maxRoll = function maxRoll(roll) {
  if (isNaN(Number(roll)) == false) {
    return roll;
  }

  return parseRoll(roll).replace(/[dD]/g, '*');
};

var minRoll = function minRoll(roll) {
  if (isNaN(Number(roll)) == false) {
    return roll;
  }

  return parseRoll(roll).replace(/[dD]\d{1,100}/g, '');
};

var addTargetStat = function addTargetStat(values, names, attrName) {
  var target_stat = '';

  if (attrName === 'attack' || attrName === 'heal') {
    target_stat += "{{target_unit=".concat(name_to_shorthand(values[names['target_stat']]), "}}");
    target_stat += "{{target_stat=".concat(values[names['target_stat']].replace(/_/g, ' '), "}}");
  }

  return target_stat;
};

var updatebondscore = function updatebondscore(values, update) {
  var manualscore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var character_creation_bonds = values["character_creation_bonds"] === 'active' ? true : false;
  var charisma_score = parseInt(values["charisma_score"]) || 0;
  var bond_value = character_creation_bonds ? charisma_score : Math.floor(charisma_score / 2);
  var flag = manualscore ? 1 : parseInt(values["repeating_bonds_setScore"]) || 0;
  var bond_score_old = parseInt(values["repeating_bonds_score_old"]) || 0;
  var bond_score = 0;

  if (flag === 0) {
    bond_score = bond_value;
  } else {
    bond_score = parseInt(values["repeating_bonds_score"]) || 0;

    if (bond_score > charisma_score) {
      if (bond_score_old <= charisma_score) {
        bond_score = charisma_score;
      }
    }
  }

  update["repeating_bonds_score"] = bond_score;
  update["repeating_bonds_score_old"] = bond_score;
  update["repeating_bonds_setScore"] = 1;
  update["repeating_bonds_color"] = BondButtonColor(bond_score);
};

var DeltaGreenLethalityFail = function DeltaGreenLethalityFail(roll) {
  var quotient = Math.floor(roll / 10) == 0 ? 10 : Math.floor(roll / 10);
  var remainder = roll % 10 == 0 ? 10 : Math.floor(roll % 10);
  return quotient + remainder;
};