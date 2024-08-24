"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isInitialized = false;

var setAttributes = function setAttributes(update, silent) {
  silent === true ? setAttrs(update, {
    silent: true
  }) : setAttrs(update);
}; // === ATTRIBUTE ARRAYS
// note: I had the underscore in front of the arrays key to distinguish it from the name of the attribute


var arrays = {
  _stats: ['strength', 'constitution', 'dexterity', 'intelligence', 'power', 'charisma'],
  _hit_points: ['strength_score', 'constitution_score'],
  _sanity_points: ['power_score'],
  //ALSO USED FOR BREAKING POINTS
  _willpower_points: ['power_score'],
  _toggles: ['settings'],
  _sanity_loss: ['san_success', 'san_failure'],
  _skills: ['accounting', 'alertness', 'anthropology', 'archeology', 'art_1', 'art_2', 'artillery', 'athletics', 'bureaucracy', 'computer_science', 'craft_1', 'craft_2', 'criminology', 'demolitions', 'disguise', 'dodge', 'drive', 'firearms', 'first_aid', 'forensics', 'heavy_machinery', 'heavy_weapons', 'history', 'humint', 'law', 'medicine', 'melee_weapons', 'military_science_1', 'military_science_2', 'navigate', 'occult', 'persuade', 'pharmacy', 'pilot_1', 'pilot_2', 'psychotherapy', 'ride', 'science_1', 'science_2', 'search', 'sigint', 'stealth', 'surgery', 'survival', 'swim', 'unarmed_combat'],
  _colored_derivative: ['willpower', 'hit'],
  _derived_rolls: ['sanity_points', 'luck'],
  _disorder_related: ['sanity_points', 'breaking_point'],
  _bonds_local: ['willpower_points', 'sanity_points'],
  _derived_modifiers: ['willpower_points', 'low_will_power', 'zero_will_power'],
  _settings_wp: ["mod_will_power_check"],
  _adaptation: ['violence', 'helplessness'],
  _editable_skills: ['art_1', 'art_2', 'craft_1', 'craft_2', 'military_science_1', 'military_science_2', 'pilot_1', 'pilot_2', 'science_1', 'science_2'],
  _weapon: ["name", "skill_percent", "base_range", "damage", "armor_piercing", "lethality_percent", "ammo"]
};
var _repeating_sections = {
  'skill': 'skills',
  'bond': 'bonds',
  'special': 'special',
  'weapons': 'weapons'
};
var _repeating_damages = ['damage', 'damageCritical', 'lethality', 'lethalityCritical', 'damage_2', 'damage_2Critical', 'selective_fire', 'selective_fireCritical'];
var _rd100 = "[[1d100]]";
var _rd4 = "[[1d4]]";
var _rd6 = "[[1d6]]";
var _rd8 = "[[1d8]]";
var _rd10 = "[[1d10]]";
var _rd12 = "[[1d12]]";
var _rd20 = "[[1d20]]";
var _queryModifier = "?{Modifier|0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}";
var prefix_skill_roll = "@{gm_toggle} &{template:fancy-rolls} {{name=@{character_name}}} {{dice=[[".concat(_rd100, "]]}}");
var prefix_damage_roll = "@{gm_toggle} &{template:fancy-damages} {{name=@{character_name}}}";
var prefix_bond_roll = "@{gm_toggle} &{template:fancy-bonds} {{character_id=@{character_id}}}{{name=@{character_name}}} {{dice=[[".concat(_rd4, "]]}}"); // check skill value for weapons and special training

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
  console.info('input string:', str);
  var compar = cleanedSkill(String(str));
  console.info('output str:', compar);
  return arrays['_skills'].concat(arrays['_stats']).includes(compar);
};

on("remove:repeating_skills", function (eventInfo) {
  console.info('repeating remove skills removed', eventInfo);
});

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
  console.info('skill', skill);
  console.info('value', value);
  var rep_and_field = {
    'weapons': 'skill_percent',
    'special': 'skill_or_stat_used'
  };
  var sectionDetails = [{
    section: 'repeating_special',
    fields: ['skill_or_stat_used']
  }, {
    section: 'repeating_weapons',
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
    var allids1 = allskills1.map(function (el) {
      return el.replace("_".concat(sectionDetails[0]["fields"][0]), '');
    });
    var allids2 = allskills2.map(function (el) {
      return el.replace("_".concat(sectionDetails[1]["fields"][0]), '');
    });
    var len1 = allids1.length;
    var len2 = allids2.length;
    console.info("allids1:", allids1);
    console.info("allids2:", allids2);
    console.info("allskills1:", allskills1);
    console.info("allskills2:", allskills2);
    getAttrs(allskills1.concat(allskills2), function (v) {
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

      setAttrs(update, {
        silent: true
      }, function () {
        console.log("update ".concat(isWhat, " on change"));
        console.log("update ".concat(skill, "  on change"));
        console.info("update:", update);
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
  }, function () {
    console.info('Sanity loss roll finished', update);
  });
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
    }, function () {
      console.info('Repeating Skills updated', update);
    });
  });
};

var setMinMax = function setMinMax(skill, min, max) {
  var Iskill = parseInt(skill) || 0;
  return Iskill < min ? min : Iskill > max ? max : Iskill;
};

on("change:repeating_weapons:shotgun change:repeating_weapons:blast_radius", function (eventInfo) {
  var possibilities = ['shotgun', 'blast_radius'];
  var choice = eventInfo.newValue === 'active' ? 1 : 0;
  var whichone = eventInfo.triggerName.split('_')[3];
  var isMinority = isMinorityReport(eventInfo);

  if (!isMinority) {
    var other = possibilities.filter(function (el) {
      return el != whichone;
    });
    var update = {};

    if (choice == 0 && whichone === "shotgun" || choice == 1 && other === "shotgun") {
      update["repeating_weapons_double_damage"] = 0;
    }

    if (choice == 1 && whichone === 'shotgun') {
      update["repeating_weapons_double_damage"] = 'active';
    }

    if (choice == 1) {
      update["repeating_weapongs_".concat(other)] = 0;
    }

    setAttrs(update, {
      silent: true
    }, function () {
      console.info("update shotgun/blast_radius", update);
    });
  }
});

var setBondsLocalVariables = function setBondsLocalVariables() {
  getAttrs(["willpower_points", "sanity_points"], function (value) {
    var update = {};
    getSectionIDs("bonds", function (idarray) {
      idarray.forEach(function (id) {
        update["repeating_bonds_" + id + "_wp_points"] = value["willpower_points"];
        update["repeating_bonds_" + id + "_san_points"] = value["sanity_points"];
      });
      console.log('inside repeating section');
      console.info('update bonds', update);
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Bonds updated on open');
      });
    });
  });
};

arrays['_adaptation'].forEach(function (adaptation) {
  var adaptation_indexed = ["".concat(adaptation, "_1"), "".concat(adaptation, "_2"), "".concat(adaptation, "_3")];
  on("change:".concat(adaptation, "_1 change:").concat(adaptation, "_2 change:").concat(adaptation, "_3"), function (eventInfo) {
    var adaptation_idx = parseInt(eventInfo.sourceAttribute.split('_')[1]);
    var adaptation_value = eventInfo.newValue === 'on' ? 1 : 0;
    var adaptation_type = eventInfo.sourceAttribute.split('_')[0];
    console.log("adaptation changed: ".concat(adaptation_type, " with index ").concat(adaptation_idx, " and value ").concat(adaptation_value));
    var update = {};
    update["".concat(adaptation, "_adapted")] = 0;

    if (adaptation_idx == 1 && adaptation_value === 0) {
      update["".concat(adaptation_indexed[1])] = 0;
      update["".concat(adaptation_indexed[2])] = 0;
    }

    if (adaptation_idx == 2 && adaptation_value === 0) {
      update["".concat(adaptation_indexed[2])] = 0;
    }

    if (adaptation_idx == 2 && adaptation_value === 1) {
      update["".concat(adaptation_indexed[0])] = 'on';
    }

    if (adaptation_idx == 3 && adaptation_value === 1) {
      update["".concat(adaptation_indexed[0])] = 'on';
      update["".concat(adaptation_indexed[1])] = 'on';
      update["".concat(adaptation, "_adapted")] = 1;
    }

    console.info(update);
    setAttrs(update, {
      silent: true
    }, function () {
      console.log('Adaptation updated');
    });
  });
});
arrays['_settings_wp'].forEach(function (wp_setting) {
  on("change:".concat(wp_setting), function (eventInfo) {
    console.log('wp_setting changed:' + eventInfo.triggerName);
    getAttrs(arrays['_settings_wp'].concat(arrays['_derived_modifiers']), function (values) {
      var update = {};

      if (values['mod_will_power_check'] === 'none') {
        update["low_will_power"] = 0;
        update["zero_will_power"] = 0;
      }

      if (values['mod_will_power_check'] === 'lowonly') {
        update["zero_will_power"] = 0;
        update["low_will_power"] = 1;
      }

      if (values['mod_will_power_check'] === 'all') {
        update["low_will_power"] = 1;
        update["zero_will_power"] = 1;
      }

      console.info(update);
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
  console.info(update);
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
}); // new function to compute san point max

on("change:unnatural", function (eventInfo) {
  var newvalue = setMinMax(parseInt(eventInfo.newValue) || 0, 0, 99);
  update = {
    sanity_points_max: 99 - newvalue,
    unnatural: newvalue
  };
  console.info(update);
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('Sanity points updated');
  });
}); // === debug note: need to change repeating_special_training and repeating_weapons for visulization purposes
// === Update stats on change

arrays['_stats'].forEach(function (stat) {
  var stat_score = "".concat(stat, "_score");
  var stat_hidden = "".concat(stat, "_hidden");
  var _san_array = ['sanity_points', 'breaking_point', 'initial_san'];
  var _initial_hp = ['initial_str', 'initial_con', 'initial_hp'];
  on("change:".concat(stat_score), function (eventInfo) {
    var value = parseInt(eventInfo.newValue) || 0;
    var update = {};
    getAttrs(arrays['_stats'].concat(_san_array, _initial_hp, ['unnatural'], arrays['_stats'].map(function (el) {
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

      updateSkillSpanOnChange(stat, value * 5, update, 'Stats'); //console.info('update on change stats:',update);
      //setAttrs(update, {silent:true},()=>{
      //	console.log('Stats updated on change');
      //});
    });
  });
}); // === Update skills on change

arrays['_skills'].forEach(function (skill) {
  on("change:".concat(skill), function (eventInfo) {
    var tmpvalue = Math.abs(parseInt(eventInfo.newValue) || 0);
    var value = tmpvalue <= 99 ? tmpvalue : 99;
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
}); // UPDATE THE WP INSIDE EACH BOND

arrays['_bonds_local'].forEach(function (attr) {
  on("change:".concat(attr), function (eventInfo) {
    var update = {};
    var newvalue = parseInt(eventInfo.newValue) || 0;
    var wporsan = eventInfo.triggerName;

    var _prefix = wporsan === "willpower_points" ? "wp" : "san";

    console.log('prefix: ' + _prefix);
    var isMinority = isMinorityReport(eventInfo);
    var target = eventInfo.triggerName;
    getSectionIDs("bonds", function (idarray) {
      idarray.forEach(function (id) {
        update["repeating_bonds_" + id + "_" + _prefix + "_points"] = newvalue;
      });
      console.info(update);
      getAttrs(["sanity_points", "sanity_points_old", "sanity_points_max"], function (v) {
        var sold = parseInt(v["sanity_points_old"]) || 0;
        var smax = parseInt(v["sanity_points_max"]) || 0;
        var san = value_current(parseInt(v["sanity_points"]) || 0, sold, smax);
        update["sanity_points"] = san;
        update["sanity_points_old"] = san;
        setAttrs(update, {
          silent: true
        }, function () {
          console.log('Bonds updated on change');
        });
      });
    });
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
}); // Find max and min of a function
// === SAN LOSS Button

arrays['_sanity_loss'].forEach(function (attr) {
  on("change:".concat(attr), function (eventInfo) {
    var value = eventInfo.newValue;

    if (value === "") {
      setAttributes(_defineProperty({}, "has_".concat(attr), 0), true);
    } else {
      setAttributes(_defineProperty({}, "has_".concat(attr), 1), true);
    }
  });
});
on("sheet:opened change:san_success change:san_failure", function () {
  getAttrs(['san_success', 'san_failure'], function (v) {
    var maxsan = v.san_failure;
    var minsan = v.san_success;
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