"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Update span on change
var updateSkillSpanOnChange = function updateSkillSpanOnChange(skill, value, update, isWhat) {
  var sectionDetails = [{
    section: 'repeating_special',
    fields: ['skill_or_stat_used']
  }, {
    section: 'repeating_weapons',
    fields: ['skill_percent']
  }, {
    section: 'repeating_rituals',
    fields: ['skill_percent']
  }];
  getSections(sectionDetails, function (attr) {
    var allskills1 = attr.filter(function (el) {
      return el.startsWith(sectionDetails[0]["section"]) && el.endsWith(sectionDetails[0]["fields"][0]);
    });
    var allskills2 = attr.filter(function (el) {
      return el.startsWith(sectionDetails[1]["section"]) && el.endsWith(sectionDetails[1]["fields"][0]);
    });
    var allskills3 = attr.filter(function (el) {
      return el.startsWith(sectionDetails[2]["section"]) && el.endsWith(sectionDetails[2]["fields"][0]);
    });
    var allids1 = allskills1.map(function (el) {
      return el.replace("_".concat(sectionDetails[0]["fields"][0]), '');
    });
    var allids2 = allskills2.map(function (el) {
      return el.replace("_".concat(sectionDetails[1]["fields"][0]), '');
    });
    var allids3 = allskills3.map(function (el) {
      return el.replace("_".concat(sectionDetails[2]["fields"][0]), '');
    });
    var len1 = allids1.length;
    var len2 = allids2.length;
    var len3 = allids3.length;
    getAttrs(allskills1.concat(allskills2).concat(allskills3), function (v) {
      for (i = 0; i < len1; i++) {
        if (cleanedSkill(v[allskills1[i]]) === skill) {
          update["".concat(allids1[i], "_skill_span")] = value;
        }
      }

      for (i = 0; i < len2; i++) {
        if (cleanedSkill(v[allskills2[i]]) === skill) {
          update["".concat(allids2[i], "_skill_span")] = value;
        }
      }

      for (i = 0; i < len3; i++) {
        if (cleanedSkill(v[allskills3[i]]) === skill) {
          update["".concat(allids3[i], "_skill_span")] = value;
        }
      }

      setAttrs(update, {
        silent: true
      }, function () {});
    });
  });
};

var saneffects = function saneffects(snew, sold, smax, bnew, bmax, bold, pow, trackbp) {
  var san = value_current(snew, sold, smax);
  var diffsan = san - sold;
  var flag_2san = diffsan >= 2 ? 1 : 0;
  var flag_temp = diffsan >= 5 ? 1 : 0;
  var flag_bp = san <= bnew && trackbp == 1 ? 1 : 0;
  return {
    san2: flag_2san,
    temp: flag_temp,
    bp: flag_bp
  };
};

var definesanroll = function definesanroll(san, sold, bnew, bold, sanflags, character_name) {
  var San2_disorder = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  var Temp_disorder = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
  var diffsan = san - sold;
  var flag_2san = sanflags.san2 && !isEmpty(San2_disorder);
  var flag_temp = sanflags.temp;
  var flag_bp = sanflags.bp;
  var rollString = "&{template:fancy-rolls} {{name=".concat(character_name, "}} {{header=^{sanity_loss}}} ");
  rollString = "".concat(rollString, " {{sanity_loss=[[").concat(diffsan, "]]}} {{sanity_new=[[").concat(san, "]]}}");
  rollString = "".concat(rollString, " {{sanity_old=[[").concat(sold, "]]}} {{bp_old=[[").concat(bold, "]]}} {{bp_new=[[").concat(bnew, "]]}}");

  if (flag_bp == 1) {
    rollString = "".concat(rollString, " {{flag_bp=1}} ");
  }

  if (flag_temp == 1) {
    rollString = "".concat(rollString, " {{flag_temp=1}}");

    if (!isEmpty(Temp_disorder)) {
      Object.entries(Temp_disorder).forEach(function (_ref, index) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        rollString = "".concat(rollString, " {{tdis_name").concat(index, "=").concat(key, "}} {{tdis_desc").concat(index, "=").concat(val, "}} ");
      });
    }
  }

  if (flag_2san == 1) {
    rollString = "".concat(rollString, " {{flag_2san=1}}");

    if (!isEmpty(Temp_disorder)) {
      Object.entries(Temp_disorder).forEach(function (_ref3, index) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            val = _ref4[1];

        rollString = "".concat(rollString, " {{tdis_name").concat(index, "=").concat(key, "}} {{tdis_desc").concat(index, "=").concat(val, "}} ");
      });
    }
  }

  var update = {};
  update['sanity_points'] = san;
  update['sanity_points_old'] = sold;

  if (flag_bp === 'on') {
    update['breaking_point'] = Math.max(0, san - pow);
    update['breaking_point_max'] = bold;
    update['breaking_point_old'] == Math.max(0, san - pow);
  }

  setAttrs(update, {
    silent: true
  }, function () {});
  startRoll("".concat(rollValue, " {{isSkill=[[").concat(_isSkill, "]]}}"), function (results) {
    var sanity_old = results.results.sanity_old.result;
    var sanity_new = results.results.sanity_new.result;
    var sanity_loss = results.results.sanity_loss.result;
    var bp_old = results.results.bp_old.result;
    var bp_new = results.results.bp_new.result;
    finishRoll(results.rollId, {});
  });
};

var value_current = function value_current(current, old, max) {
  if (current >= max) {
    return current <= old ? current : old;
  }

  return Math.max(current, 0);
};

_shotgun_or_blast_radius.forEach(function (main) {
  other = _shotgun_or_blast_radius.filter(function (el) {
    return el == main;
  });
  on("change:repeating_weapons:".concat(main), function (eventInfo) {
    id = eventInfo.sourceAttribute.split('_')[2];
    var main_name = "repeating_weapons_".concat(id, "_").concat(main);
    var other_name = "repeating_weapons_".concat(id, "_").concat(other);
    var double_barrel_name = "repeating_weapons_".concat(id, "_hasDoubleBarrel");
    getAttrs([main_name, other_name], function (values) {
      console.info(values);
      var main_value = values[main_name] === 'active' ? 1 : 0;
      var update = {};

      if (main_value === 1) {
        if (main === 'shotgun') {
          update["repeating_weapons_".concat(id, "_blast_radius")] = 0;
          update[double_barrel_name] = 'active';
        } else {
          update[double_barrel_name] = 0;
          update["repeating_weapons_".concat(id, "_shotgun")] = 0;
        }
      }

      if (main_value === 0) {
        update[double_barrel_name] = 0;
      }

      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Shotgun or Blast Radius updated');
      });
    });
  });
});

var setBondsLocalVariables = function setBondsLocalVariables() {
  getAttrs(["willpower_points", "sanity_points"], function (value) {
    var update = {};
    getSectionIDs("bonds", function (idarray) {
      idarray.forEach(function (id) {
        update["repeating_bonds_" + id + "_wp_points"] = value["willpower_points"];
        update["repeating_bonds_" + id + "_sanity_points"] = value["sanity_points"];
      });
      console.log('inside repeating section');
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Bonds updated on open');
      });
    });
  });
};

arrays['_adaptation'].forEach(function (adaptation) {
  console.log('adaptation:', adaptation);
  on('change:' + adaptation, function () {
    getAttrs([adaptation], function (values) {
      console.log('values:', values);
      var value = parseInt(values[adaptation]) || 0;
      console.log('adaptation changed:' + value);
      var update = {};
      update["".concat(adaptation, "_adapted")] = value === 2 ? 1 : 0;
      setAttrs(update, {
        silent: true
      }, function () {
        update["".concat(adaptation, "_adapted")] == 1 ? console.log("".concat(adaptation, " adapted")) : console.log("".concat(adaptation, " not adapted"));
      });
    });
  });
});
arrays['_settings_wp'].forEach(function (wp_setting) {
  on("change:".concat(wp_setting), function (eventInfo) {
    console.log('wp_setting changed:' + eventInfo.triggerName);
    getAttrs(arrays['_settings_wp'].concat(arrays['_derived_modifiers']), function (values) {
      var update = {};

      if (values['mod_willpower_check'] === 'none') {
        update["low_willpower"] = 0;
        update["zero_willpower"] = 0;
      }

      if (values['mod_willpower_check'] === 'lowonly') {
        update["zero_willpower"] = 0;
        update["low_willpower"] = 1;
      }

      if (values['mod_willpower_check'] === 'all') {
        update["low_willpower"] = 1;
        update["zero_willpower"] = 1;
      }

      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Willpower Settings updated');
      });
    });
  });
});
on("change:repeating_skills:rank", function (eventInfo) {
  var newValue = setMinMax(parseInt(eventInfo.newValue) || 0, 0, 99);
  update = {};
  update[eventInfo.sourceAttribute] = newValue;
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('Repeating Skills updated on change');
  });
});
Object.entries(_repeating_sections).forEach(function (_ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      attrName = _ref6[0],
      section = _ref6[1];

  on("change:repeating_".concat(section), function (eventInfo) {
    var id = eventInfo.sourceAttribute.split('_')[2];
    /*if (_repeating_exceptions.hasOwnProperty(section)){
    	const _array_to_check = _repeating_exceptions[section];
    	const _event_target = eventInfo.sourceAttribute;
    	const flag= _array_to_check.some(v=> _event_target.includes(v));
    	if (flag){
    		attrName= _repeating_exceptions[`weapons`].filter( v=>  eventInfo.sourceAttribute.includes(v))[0];
    		changeRepeatingExceptions(section,attrName);
    	} else {
    		console.log('no exceptions');
    		changeRepeatingRolls(section,attrName,id);
    	}
    } else {
    	changeRepeatingRolls(section,attrName,id);
    }*/

    changeRepeatingRolls(section, attrName, id);
  });
}); // new function to compute san point max

on("change:unnatural", function (eventInfo) {
  var newvalue = setMinMax(parseInt(eventInfo.newValue) || 0, 0, 99);
  update = {
    sanity_points_max: 99 - newvalue,
    unnatural: newvalue
  };
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('Sanity points updated');
  });
}); // === debug note: need to change repeating_special_training and repeating_weapons for visulization purposes
// === Update stats on change

arrays['_stats'].forEach(function (stat) {
  var stat_score = "".concat(stat, "_score");
  var _sanity_array = ['sanity_points', 'breaking_point', 'initial_san'];
  var _initial_hp = ['initial_str', 'initial_con', 'initial_hp'];
  on("change:".concat(stat_score), function (eventInfo) {
    var update = {};
    getAttrs(arrays['_stats'].concat(_sanity_array, _initial_hp, ['unnatural'], arrays['_stats'].map(function (el) {
      return "".concat(el, "_score");
    })), function (v) {
      var value = parseInt(stat[stat_score], 10) || 0;
      update[stat] = value * 5;
      update[stat_score] = value;

      if (stat === 'power') {
        var sanmax = 99 - parseInt(v['unnatural'] || 0);
        update["willpower_points_max"] = value;
        update['sanity_point_max'] = sanmax;
        var flag_initial_san = v.initial_san;

        if (flag_initial_san == 1) {
          var InitialSanity = value * 5;
          var InitialBreakingPoint = value * 4;
          var InitialWillPower = value;
          update['sanity_points'] = InitialSanity;
          update['sanity_points_old'] = InitialSanity;
          update['breaking_point'] = InitialBreakingPoint;
          update['breaking_point_max'] = InitialBreakingPoint;
          update['willpower_points'] = InitialWillPower;
          update['initial_san'] = 0;
        }
      }

      if (stat === 'strength' || stat === 'constitution') {
        // no matter what the flag will be trigger, I save the check for the initial hp
        var flag_initial_str = v.initial_str;
        var flag_initial_con = v.initial_con;
        var flag_initial_hp = v.initial_hp;
        var con = parseInt(v["constitution_score"] || 0);
        var str = parseInt(v["strength_score"] || 0);
        var new_flag_initial_hp = 1;

        if (stat === 'strength') {
          update["initial_str"] = 0;

          if (flag_initial_con === 0) {
            new_flag_initial_hp = 0;
          }
        } else {
          update["initial_con"] = 0;

          if (flag_initial_str === 0) {
            new_flag_initial_hp = 0;
          }
        }

        if (flag_initial_hp === 0 || new_flag_initial_hp === 0) {
          update["hit_points_max"] = Math.ceil((con + str) / 2);
        }

        if (new_flag_initial_hp === 0) {
          update["hit_points"] = update["hit_points_max"];
          update["initial_hp"] = 0;
        }
      }

      updateSkillSpanOnChange(stat, value * 5, update, 'Stats');
    });
  });
});

var skill_in_bounds = function skill_in_bounds(skill) {
  var skill_value = parseInt(skill) || 0;
  return Math.min(99, Math.max(0, skill_value));
};

on("change:ritual_skill", function (eventInfo) {
  var value = skill_in_bounds(eventInfo.newValue);
  var update = {};
  console.log('ritual_skill:', value);
  update['ritual_skill'] = value;
  updateSkillSpanOnChange('ritual_skill', value, update, 'Rituals');
}); // === Update skills on change

arrays['_skills'].forEach(function (skill) {
  on("change:".concat(skill), function (eventInfo) {
    var value = skill_in_bounds(eventInfo.newValue);
    var update = {};
    update[skill] = value;
    updateSkillSpanOnChange(skill, value, update, 'Skills');
  });
}); // === Update repeating skills on change

on("change:repeating_skills:rank", function (eventInfo) {
  var value = parseInt(eventInfo.newValue) || 0;

  if (value < 0) {
    setAttributes(_defineProperty({}, eventInfo.sourceAttribute, 0), false);
  }

  if (value > 99) {
    setAttributes(_defineProperty({}, eventInfo.sourceAttribute, 99), false);
  }
});
on('change:advanced_weapons', function () {
  updateadvancedweapons();
});

var updateadvancedweapons = function updateadvancedweapons() {
  getAttrs(['advanced_weapons'], function (v) {
    var advanced_weapons = v['advanced_weapons'];
    getSectionIDs('repeating_weapons', function (ids) {
      var update = {};
      var prefix = 'repeating_weapons_';
      ids.forEach(function (id) {
        update[prefix + id + '_hasAdvancedWeapons'] = advanced_weapons;
        arrays['_advanced_weapons_featurs'].forEach(function (feat) {
          update[prefix + id + '_' + feat] = 0;
        });
      });
      setAttrs(update, {
        silent: true
      });
    });
  });
};