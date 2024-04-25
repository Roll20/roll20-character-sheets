"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// === ATTRIBUTE ARRAYS
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
  _bonds_local: ['willpower_points', 'sanity_points'],
  _derived_modifiers: ['willpower_points', 'low_will_power', 'zero_will_power'],
  _settings_wp: ["mod_will_power_check"],
  _adaptation: ['violence', 'helplessness'],
  _editable_skills: ['art_1', 'art_2', 'craft_1', 'craft_2', 'military_science_1', 'military_science_2', 'pilot_1', 'pilot_2', 'science_1', 'science_2']
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
Object.entries(_repeating_sections).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      element = _ref2[0],
      section = _ref2[1];

  on("change:repeating_".concat(section), function (eventInfo) {
    var id = eventInfo.sourceAttribute.split('_')[2];
    changeRepeatingRolls(section, element, id);
  });
}); // === SHARED FUNCTIONS

var setAttributes = function setAttributes(update, silent) {
  silent === true ? setAttrs(update, {
    silent: true
  }) : setAttrs(update);
}; // === HIT POINTS
// First time player set you


arrays['_hit_points'].forEach(function (attr) {
  on("change:".concat(attr), function (eventInfo) {
    // Check if STR or CON has been changed, if changed the relative initial flag is set to 0
    if (eventInfo.sourceAttribute === 'strength_score') {
      setAttributes({
        initial_str: 0
      }, true);
    } else if (eventInfo.sourceAttribute === 'constitution_score') {
      setAttributes({
        initial_con: 0
      }, true);
    }

    getAttrs(['initial_str', 'initial_con', 'initial_hp'], function (v) {
      var flag1 = parseInt(v.initial_con) || 0;
      var flag2 = parseInt(v.initial_str) || 0; // This flag is 0 if both CON and STR has been initialized, otherwise it is 1

      var flag_stats = flag1 + flag2; // This flag is 0 if the initial value for current hp has already been initialized, otherwise it is 1

      var flag_hp = parseInt(v.initial_hp) || 0;

      if (flag_stats == 0) {
        var attributes = arrays['_hit_points'].concat(['hit_points']);

        if (flag_hp == 1) {
          getAttrs(attributes, function (values) {
            var strength = parseInt(values.strength_score) || 0,
                constitution = parseInt(values.constitution_score) || 0;
            var calculated = Math.ceil((strength + constitution) / 2);
            var update = {
              hit_points_max: calculated,
              hit_points: calculated,
              initial_hp: 0
            };
            setAttributes(update, true);
          });
        } else {
          getAttrs(attributes, function (values) {
            var strength = parseInt(values.strength_score) || 0,
                constitution = parseInt(values.constitution_score) || 0;
            var calculated = Math.ceil((strength + constitution) / 2);
            var update = {
              hit_points_max: calculated
            };
            setAttributes(update, true);
          });
        }
      }
    });
  });
}); // === WILLPOWER POINTS

arrays['_willpower_points'].forEach(function (attr) {
  on("change:".concat(attr), function (eventInfo) {
    var attributes = arrays['_willpower_points'].concat(['willpower_points']);
    getAttrs(attributes, function (values) {
      var calculated = parseInt(values.power_score) || 0;
      var update = {
        willpower_points_max: calculated
      };
      setAttributes(update, true);
    });
  });
}); // === SANITY POINTS & BREAKING POINT

arrays['_sanity_points'].forEach(function (attr) {
  on("change:".concat(attr), function (eventInfo) {
    var attributes = arrays['_sanity_points'].concat(['sanity_points', 'breaking_point', 'initial_san']);
    getAttrs(attributes, function (values) {
      var flag_initial_san = parseInt(values.initial_san) || 0,
          zero = 0; // Only updated the BP and Current Sanity if it is a new character

      if (flag_initial_san == 1) {
        var power = parseInt(values.power_score) || 0,
            calculatedSanity = power * 5,
            calculatedBreakingPoint = power * 4;
        calculatedWillPower = power;
        var _update = {
          willpower_points: calculatedWillPower,
          sanity_points: calculatedSanity,
          breaking_point: calculatedBreakingPoint,
          breaking_point_max: calculatedBreakingPoint,
          initial_san: zero
        };
        setAttributes(_update, true);
      }
    });
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
});

var setMinMax = function setMinMax(skill, min, max) {
  var Iskill = parseInt(skill) || 0;
  return Iskill < min ? min : Iskill > max ? max : Iskill;
};

var setRepeatingskills = function setRepeatingskills() {
  getSectionIDs("skills", function (idarray) {
    var _additional_skills = [];
    idarray.forEach(function (id) {
      console.info(idarray);

      _additional_skills.push("repeating_skills_".concat(id, "_rank"));
    });
    getAttrs(_additional_skills, function (v) {
      var update = {};

      for (i = 0; i < _additional_skills.length; i++) {
        var _value = parseInt(v[_additional_skills[i]]) || 0;

        if (_value < 0 || _value > 99) {
          update[_additional_skills[i]] = setMinMax(_value, 0, 99);
        }
      }

      console.info('update skills for set additional skills', update);
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Repeating Skills updated on open');
      });
    });
    getAttrs(_additional_skills, function (v) {
      Object.entries(v).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        console.log("key: ".concat(key, " value: ").concat(value));
      });
    });
  });
};

var setAllSkills = function setAllSkills() {
  var _allskills = arrays['_skills'].concat(['unnatural']);

  getAttrs(_allskills, function (v) {
    var update = {};

    for (i = 0; i < _allskills.length; i++) {
      var _value = parseInt(v[_allskills[i]]) || 0;

      if (_value < 0 || _value > 99) {
        update[_allskills[i]] = setMinMax(_value, 0, 99);

        if (_allskills[i] === 'unnatural') {
          update['sanity_points_max'] = 99 - Math.floor(update[_allskills[i]]);
        }
      }
    }

    console.info('update skills for set all skills', update);
    setAttrs(update, {
      silent: true
    }, function () {
      console.log('Skills updated on open');
    });
  });
};

var setAllStats = function setAllStats() {
  var _stats = arrays['_stats'];
  var hidden = [];
  var score = [];
  var value = [];
  var update = {};

  _stats.forEach(function (stat) {
    hidden.push("".concat(stat, "_hidden"));
    score.push("".concat(stat, "_score"));
    value.push("".concat(stat));
  });

  getAttrs(value.concat(score, hidden), function (v) {
    console.log(v);

    for (i = 0; i < _stats.length; i++) {
      if (hidden[i] == 1) {
        var _score = parseInt(v[score[i]]) || 0;

        update[value[i]] = _score[i] * 5;
        update[score[i]] = _score[i];
      }
    }

    console.info('update stats', update);
    setAttrs(update, {
      silent: true
    }, function () {
      console.log('Stats updated on open');
    });
  });
};

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
}; //= force the stats to be positive and the skills to be between 0 and 99


on("sheet:opened", function (eventInfo) {
  // For testing
  setAttrs({
    version: 1.9
  }, {
    silent: true
  }, function () {
    console.log('Debug Version downgraded');
  }); // === Versioning

  getAttrs(['version'], function (values) {
    versioning(parseFloat(values.version) || 1);
  });
  setAllSkills();
  updateRollsOnOpen(); // === Set all stats to be positive

  setAllStats();
  setBondsLocalVariables(); //setRepeatingskills();

  updateRepeatingRollsonOpen();
}); // === debug note: need to change repeating_special_training and repeating_weapons for visulization purposes
// === Update stats on change

arrays['_stats'].forEach(function (stat) {
  var stat_score = "".concat(stat, "_score");
  var stat_hidden = "".concat(stat, "_hidden");
  on("change:".concat(stat_score), function (eventInfo) {
    var value = parseInt(eventInfo.newValue) || 0;
    var update = {};
    getAttrs([stat, stat_hidden], function (v) {
      if (stat_hidden == 0) {
        update[stat_hidden] = 1;
      }

      update[stat] = value * 5;
      update[stat_score] = value;
      console.info(update);
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Stats updated on change');
      });
    });
  });
}); // === Update skills on change

arrays['_skills'].forEach(function (attr) {
  on("change:".concat(attr), function (eventInfo) {
    console.log(eventInfo);
    console.log(eventInfo.newValue);
    var value = parseInt(eventInfo.newValue) || 0;

    if (value < 0) {
      setAttributes(_defineProperty({}, attr, 0), false);
    }

    if (value > 99) {
      setAttributes(_defineProperty({}, attr, 99), false);
    }
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
}); //===================================================================
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
}); // === TOGGLE INPUT SETTINGS

arrays['_toggles'].forEach(function (attr) {
  on("clicked:toggle_".concat(attr), function () {
    getAttrs(['toggles'], function (values) {
      var string = toggleBuilder(attr, v['toggles']);
      setAttributes({
        toggles: string
      }, true);
    });
  });
}); // === UPDATE TOGGLE STRING

var toggleBuilder = function toggleBuilder(attr, oldString) {
  var newString = oldString.includes("".concat(attr)) ? oldString.replace("".concat(attr, ","), '') : "".concat(oldString).concat(attr, ",");
  return newString;
}; // UPDATE THE VALUE OF THE BOND IN THE REPEATING SECTION WHEN CREATED


on("change:repeating_bonds", function () {
  getAttrs(["repeating_bonds_flag", "charisma_score"], function (value) {
    if (value["repeating_bonds_flag"] == 0) {
      var _update2 = {
        repeating_bond_score: value["charisma_score"],
        repeating_bond_flag: 1
      };
      setAttributes(_update2, true);
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
    getSectionIDs("bonds", function (idarray) {
      idarray.forEach(function (id) {
        update["repeating_bonds_" + id + "_" + _prefix + "_points"] = newvalue;
      });
      console.info(update);
      ;
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Bonds updated on change');
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

/*
on("sheet:opened change:san_success change:san_failure",function(){
	   getAttrs(['san_success', 'san_failure'], function(v) {
			let maxsan=v.san_failure;
			let minsan=v.san_success;
			let update={};
			maxsan="("+maxsan+")";
			minsan="("+minsan+")";
			var m1 = minsan.toLowerCase().replace(/[\\+\\-\\*\\/]/gi,"$&").replace(/[dD](\s?\d+[.,]?\d*)/gi,'').replace(/[\\+\\-\\*\\/]/gi,")$&(");
			var m2 = maxsan.toLowerCase().replace(/[\\+\\-\\*\\/]/gi,")$&(").replace(/[dD]/gi,'*');
			update['maxsanloss']=Function('"use strict";return (' + m2 + ')')();
			update['minsanloss']=Function('"use strict";return (' + m1 + ')')();
			console.log(m1);
			console.log(m2);
			setAttributes(update,true);
		});
});
// Create array with list of repeating skills
var addskills=[];	//name of the array
// function to populate the array
on('sheet:opened change:repeating_skills remove:repeating_skills', () => {
  addskills=[];
  getSectionIDs('skills', (idarray) => {
    addskills=idarray.map(id =>`repeating_skills_${id}`) ; 
    console.log(addskills);  //log of debugging to be sure
  });
});
*/

arrays['_colored_derivative'].forEach(function (vitality) {
  on("change:".concat(vitality, "_points"), function (eventInfo) {
    console.log('changed ' + vitality + '_points');
    console.log(eventInfo);
    console.log(eventInfo.newValue);
    var value = parseInt(eventInfo.newValue) || 0;
    value = value < 0 ? 0 : value;
    var maxval = "".concat(vitality, "_points_max");
    getAttrs([maxval], function (v) {
      console.log('maxval:' + v[maxval]);
      var max_val = parseInt(v[maxval]) || 0;
      var low_val = 2;
      var update = {};
      console.log('maxval:' + v[maxval] + ' value:' + value + ' low_val:' + low_val);
      update["color_".concat(vitality)] = 'normal';
      update["".concat(vitality, "_modifier")] = 0;

      if (value > max_val) {
        update["color_".concat(vitality)] = 'extra';
      }

      if (value <= low_val) {
        update["color_".concat(vitality)] = 'low';
        update["".concat(vitality, "_modifier")] = 1;
      }

      if (value == 0) {
        update["color_".concat(vitality)] = 'zero';
        update["".concat(vitality, "_modifier")] = 2;
      }

      update["".concat(vitality, "_points")] = value;
      console.log('maxval:' + v[maxval] + ' value:' + value + ' low_val:' + low_val);
      console.info(update);
      setAttributes(update, false);
    });
  });
});