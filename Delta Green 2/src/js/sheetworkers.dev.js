"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _isInitialized = false;

var setAttributes = function setAttributes(update, silent) {
  silent === true ? setAttrs(update, {
    silent: true
  }) : setAttrs(update);
}; // === ATTRIBUTE ARRAYS
// note: I had the underscore in front of the arrays key to distinguish it from the name of the attribute


var arrays = {
  _stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
  _derived_stats: ['hit_points', 'sanity_points', 'willpower_points', 'breaking_point'],
  _derived_stats_max: ['hit_points_max', 'willpower_points_max', 'breaking_point_max'],
  _hit_points: ['strength_score', 'constitution_score'],
  _sanity_points: ['power_score'],
  //ALSO USED FOR BREAKING POINTS
  _willpower_points: ['power_score'],
  _toggles: ['settings'],
  _sanity_loss: ['sanity_success', 'sanity_failure'],
  _skills: ['accounting', 'alertness', 'anthropology', 'archeology', 'art_1', 'art_2', 'artillery', 'athletics', 'bureaucracy', 'computer_science', 'craft_1', 'craft_2', 'criminology', 'demolitions', 'disguise', 'dodge', 'drive', 'firearms', 'first_aid', 'forensics', 'heavy_machinery', 'heavy_weapons', 'history', 'humint', 'law', 'medicine', 'melee_weapons', 'military_science_1', 'military_science_2', 'navigate', 'occult', 'persuade', 'pharmacy', 'pilot_1', 'pilot_2', 'psychotherapy', 'ride', 'science_1', 'science_2', 'search', 'sigint', 'stealth', 'surgery', 'survival', 'swim', 'unarmed_combat'],
  _colored_derivative: ['willpower', 'hit'],
  _derived_rolls: ['sanity_points', 'luck'],
  _disorder_related: ['sanity_points', 'breaking_point'],
  _derived_modifiers: ['willpower_points', 'low_willpower', 'zero_willpower'],
  _settings_wp: ["mod_willpower_check"],
  _adaptation: ['violence', 'helplessness'],
  _editable_skills: ['art_1', 'art_2', 'craft_1', 'craft_2', 'military_science_1', 'military_science_2', 'pilot_1', 'pilot_2', 'science_1', 'science_2'],
  _weapon: ["name", "skill_percent", "base_range", "damage", "armor_piercing", "lethality_percent", "ammo"],
  _rituals: ['name', 'skill_span', 'unnatural_gain', 'study_time', 'sanity_loss_for_learning', 'activation_time', 'description', 'complexity'],
  _personal_data: ['profession', 'employer', 'occupation', 'nationality_and_residence', 'sex', 'age', 'education', 'personal_details_and_notes', 'developments_which_affect_home_and_family', 'description', 'physical_description', 'npc_sources', 'npc_remarks']
};
var _initial_skills = {
  'accounting': 10,
  'alertness': 20,
  'anthropology': 0,
  'archeology': 0,
  'art_1': 0,
  'art_2': '0',
  'artillery': 0,
  'athletics': 30,
  'bureaucracy': 10,
  'computer_science': 0,
  'craft_1': 0,
  'craft_2': 0,
  'criminology': 10,
  'demolitions': 0,
  'disguise': 10,
  'dodge': 30,
  'drive': 20,
  'firearms': 20,
  'first_aid': 10,
  'forensics': 0,
  'heavy_machinery': 10,
  'heavy_weapons': 0,
  'history': 10,
  'humint': 10,
  'law': 0,
  'medicine': 0,
  'melee_weapons': 30,
  'military_science_1': 0,
  'military_science_2': 0,
  'navigate': 10,
  'occult': 10,
  'persuade': 20,
  'pharmacy': 0,
  'pilot_1': 0,
  'pilot_2': 0,
  'psychotherapy': 10,
  'ride': 10,
  'science_1': 0,
  'science_2': 0,
  'search': 20,
  'sigint': 0,
  'stealth': '10',
  'surgery': 0,
  'survival': 10,
  'swim': 20,
  'unarmed_combat': 40,
  'unnatural': 0
};
var _repeating_sections = {
  'skill': 'skills',
  'bond': 'bonds',
  'special': 'special',
  'weapons': 'weapons',
  'ritual': 'rituals'
};
var _additional_repeating_sections = {
  'pay_cost': 'rituals',
  'force_connection': 'rituals',
  'accept_failure': 'rituals'
};
var _repeating_damages = ['damage', 'damage_critical', 'lethality', 'lethality_critical', 'second_damage', 'second_damage_critical', 'selective_fire', 'selective_fire_critical'];
var _repeating_ammo = ['hasammo', 'ammo', 'ammo_total'];
var _rd100 = "[[1d100]]";
var _rd4 = "[[1d4]]";
var _rd6 = "[[1d6]]";
var _rd8 = "[[1d8]]";
var _rd10 = "[[1d10]]";
var _rd12 = "[[1d12]]";
var _rd20 = "[[1d20]]";
var _queryModifier = "?{Modifier|0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}";
var prefix_skill_roll = "@{gm_toggle} &{template:fancy-rolls} {{name=@{character_name}}} {{dice=[[".concat(_rd100, "]]}}");
var prefix_sanity_roll = "@{gm_toggle} &{template:fancy-sanloss} ";
var prefix_damage_roll = "@{gm_toggle} &{template:fancy-damages} {{name=@{character_name}}}";
var prefix_bond_roll = "@{gm_toggle} &{template:fancy-bonds} {{character_id=@{character_id}}}{{name=@{character_name}}} {{dice=[[".concat(_rd4, "]]}}");
var prefix_ritual_roll = "@{gm_toggle} &{template:fancy-rituals} {{name=@{character_name}}} {{dice=[[".concat(_rd100, "]]}}");
var prefix_ritualloss_roll = "@{gm_toggle} &{template:fancy-ritualloss} {{name=@{character_name}}} {{header=^{ritual cost}}}"; // check skill value for weapons and special training

var isSkillNumber = function isSkillNumber(str) {
  var num = Number(str);
  return !isNaN(num) && num >= 0 && num <= 99;
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

on("remove:repeating_skills", function (eventInfo) {});

var isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

var getSections = function getSections(sectionDetails, callback) {
  var queueClone = _.clone(sectionDetails);

  var worker = function worker(queue) {
    var repeatAttrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var sections = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var detail = queue.shift();
    console.log('in getSections', detail.section);
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
}; // Update span on change


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
    console.log(attr);
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
      }, function () {
        console.log("update ".concat(isWhat, " on change"));
        console.log("update ".concat(skill, "  on change"));
      });
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

var addskills = []; //name of the array

var update_additionalskills = function update_additionalskills() {
  addskills = [];
  var update = {};
  getSectionIDs('skills', function (idarray) {
    addskills = idarray.map(function (id) {
      return "repeating_skills_".concat(id);
    });
    console.log(addskills); //log of debugging to be sure

    idarray.forEach(function (id) {
      update["repeating_skills_".concat(id, "_").concat(element, "_action")] = "%{".concat(character_id, "|repeating_skills_").concat(id, "_").concat(element, "-action}");
      update["repeating_skills_".concat(id, "_skill_r")] = id;
    });
    setAttrs(update, {
      silent: true
    }, function () {});
  });
};

var setMinMax = function setMinMax(skill, min, max) {
  var Iskill = parseInt(skill) || 0;
  return Iskill < min ? min : Iskill > max ? max : Iskill;
};

var _shotgun_or_blast_radius = ["shotgun", "blast_radius"];

_shotgun_or_blast_radius.forEach(function (whichone) {
  other = _shotgun_or_blast_radius.filter(function (el) {
    return el != whichone;
  });
  on("change:repeating_weapons_".concat(whichone), function (eventInfo) {
    getAttrs(["repeating_weapons_".concat(whichone), "repeating_weapons_".concat(other)], function (values) {
      var whichone_value = values["repeating_weapons_".concat(whichone)] === 'active' ? 1 : 0;
      var other_value = values["repeating_weapons_".concat(other)] === 'active' ? 1 : 0;
      var update = {};
      update["repeating_weapons_".concat(whichone)] = whichone_value;
      update["repeating_weapons_".concat(other)] = other_value;

      if (whichone === 1 && other === 1) {
        update["repeating_weapons_".concat(other)] = 0;
      }

      if (whichone === 'shotgun' && whichone_value === 1) {
        update["repeating_weapons_second_damage"] = 1;
      }

      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Shotgun or Blast Radius updated');
        console.info(update);
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
      element = _ref6[0],
      section = _ref6[1];

  on("change:repeating_".concat(section), function (eventInfo) {
    var id = eventInfo.sourceAttribute.split('_')[2];
    changeRepeatingRolls(section, element, id);
  });
});
Object.entries(_additional_repeating_sections).forEach(function (_ref7) {
  var _ref8 = _slicedToArray(_ref7, 2),
      element = _ref8[0],
      section = _ref8[1];

  on("change:repeating_".concat(section), function (eventInfo) {
    var id = eventInfo.sourceAttribute.split('_')[2];
    changeRepeatingRolls(section, element, id);
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
    var value = parseInt(eventInfo.newValue) || 0;
    var update = {};
    getAttrs(arrays['_stats'].concat(_sanity_array, _initial_hp, ['unnatural'], arrays['_stats'].map(function (el) {
      return "".concat(el, "_score");
    })), function (v) {
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
}); // UPDATE THE VALUE OF THE BOND IN THE REPEATING SECTION WHEN CREATED

on("change:repeating_bonds", function () {
  getAttrs(["repeating_bonds_flag", "charisma_score"], function (value) {
    if (value["repeating_bonds_flag"] == 0) {
      var _update = {
        repeating_bond_score: value["charisma_score"],
        repeating_bond_flag: 1
      };
      setAttributes(_update, true);
    }
  });
}); // CHECK IF DAMAGE OR LETHALITY EXISTS

on("change:repeating_weapons", function () {
  getAttrs(['repeating_weapons_damage', 'repeating_weapons_lethality_percent'], function (value) {
    var update = {};

    if (value['repeating_weapons_damage'] === "") {
      update['repeating_weapons_hasdamage'] = 0;
    } else {
      update['repeating_weapons_hasdamage'] = 1;
    }

    if (value['repeating_weapons_lethality_percent'] > 0) {
      update['repeating_weapons_haslethality'] = 1;
    } else {
      update['repeating_weapons_haslethality'] = 0;
    }

    setAttributes(update, true);
  });
});
on("change:sanity_success change:sanity_failure", function () {
  getAttrs(['sanity_success', 'sanity_failure'], function (v) {
    var maxsan = v.sanity_failure;
    var minsan = v.sanity_success;
    var update = {};
    maxsan = "(" + maxsan + ")";
    minsan = "(" + minsan + ")";
    var m1 = minsan.toLowerCase().replace(/[\\+\\-\\*\\/]/gi, "$&").replace(/[dD](\s?\d+[.,]?\d*)/gi, '').replace(/[\\+\\-\\*\\/]/gi, ")$&(");
    var m2 = maxsan.toLowerCase().replace(/[\\+\\-\\*\\/]/gi, ")$&(").replace(/[dD]/gi, '*');
    update['maxsanloss'] = Function('"use strict";return (' + m2 + ')')();
    update['minsanloss'] = Function('"use strict";return (' + m1 + ')')();
    console.log(m1);
    console.log(m2);
    setAttributes(update, true);
  });
}); // Create array with list of repeating skills

var elementid_off = function elementid_off(element) {
  var element = document.getElementById(element);
  element.style.display = "none";
}; // Create array with list of repeating skills


var elementid_on = function elementid_on(element) {
  var element = document.getElementById(element);
  element.style.display = "block";
};

on("change:testjsid", function (eventInfo) {
  var value = eventInfo.newValue;

  if (value == 'on') {
    elementid_off("personal_data");
  } else {
    elementid_on("personal_data");
  }
});