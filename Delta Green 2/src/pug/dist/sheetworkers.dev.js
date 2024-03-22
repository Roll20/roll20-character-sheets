"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _skills: ['accounting', 'alertness', 'anthropology', 'archeology', 'art', 'artillery', 'athletics', 'bureaucracy', 'computer_science', 'craft', 'criminology', 'demolitions', 'disguise', 'dodge', 'drive', 'firearms', 'first_aid', 'forensics', 'heavy_machinery', 'heavy_weapons', 'history', 'humint', 'law', 'medicine', 'melee_weapons', 'military_science', 'navigate', 'occult', 'persuade', 'pharmacy', 'pilot', 'psychotherapy', 'ride', 'science', 'search', 'sigint', 'stealth', 'surgery', 'survival', 'swim', 'unarmed_combat']
};
_additionalskills = []; // === SHARED FUNCTIONS

var setAttributes = function setAttributes(update, silent) {
  silent === true ? setAttrs(update, {
    silent: true
  }) : setAttrs(update);
}; // === STAT SCORES


arrays['_stats'].forEach(function (attr) {
  on("change:".concat(attr, "_score"), function (eventinfo) {
    var score = parseInt(eventinfo.newValue) || 0;
    setAttributes(_defineProperty({}, "".concat(attr), score * 5), true);
  });
}); // === HIT POINTS
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
  on("change:".concat(attr), function (eventinfo) {
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
  on("change:".concat(attr), function (eventinfo) {
    var attributes = arrays['_sanity_points'].concat(['sanity_points', 'breaking_point', 'initial_san']);
    getAttrs(attributes, function (values) {
      var flag_initial_san = parseInt(values.initial_san) || 0,
          zero = 0; // Only updated the BP and Current Sanity if it is a new character

      if (flag_initial_san == 1) {
        var power = parseInt(values.power_score) || 0,
            calculatedSanity = power * 5,
            calculatedBreakingPoint = power * 4;
        calculatedWillPower = power;
        var update = {
          willpower_points: calculatedWillPower,
          sanity_points: calculatedSanity,
          breaking_point: calculatedBreakingPoint,
          breaking_point_max: calculatedBreakingPoint,
          initial_san: zero
        };
        setAttributes(update, true);
      }
    });
  });
}); // new function to compute san point max

on("sheet:opened change:unnatural", function () {
  getAttrs(['unnatural'], function (values) {
    setAttrs({
      sanity_points_max: 99 - Math.floor(values.unnatural)
    });
  });
}); // === SAN LOSS Button

arrays['_sanity_loss'].forEach(function (attr) {
  on("change:".concat(attr), function (eventinfo) {
    var value = eventinfo.newValue;

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
}; // === SHEET VERSIONING


on('sheet:opened', function () {
  getAttrs(['version'], function (values) {
    versioning(parseFloat(values.version) || 1);
  });
});

var versioning = function versioning(version) {
  console.log("%c Versioning, ".concat(version), 'color: green; font-weight:bold');

  if (version < 1.05) {
    version_0_105();
  } else if (version < 1.5) {
    version_105_150();
  } else if (version < 1.7) {
    version_150_170();
  }
}; // UPDATE TO VERSION 1.05


var version_0_105 = function version_0_105() {
  getAttrs(['version'], function (v) {
    var codeversion = 1.05;
    var update = {
      version: codeversion,
      initial_san: 0,
      initial_hp: 0,
      initial_str: 0,
      initial_con: 0
    };
    setAttrs(update, //Update attributes
    {
      silent: true
    }, // will not trigger sheet workers
    versioning(codeversion)); // call versioning again
  });
}; // UPDATE TO VERSION 1.5
// UPDATE TO VERSION 1.5


var version_105_150 = function version_105_150() {
  var codeversion = 1.5;
  var update = {};
  getSectionIDs("weapons", function (idarray) {
    console.log("%c idarray", 'color: green; font-weight:bold');
    console.info(idarray);
    var fieldnames = ['sheet_type', 'version'];
    console.log("%c did I found weapons?", 'color: green; font-weight:bold');
    idarray.forEach(function (id) {
      console.log("%c ".concat(id), 'color: green; font-weight:bold');
      fieldnames.push("repeating_weapons_".concat(id, "_damage"), "repeating_weapons_".concat(id, "_lethality_percent"), "repeating_weapons_".concat(id, "_attack"));
    });
    getAttrs(fieldnames, function (v) {
      console.log("%c v", 'color: green; font-weight:bold');
      console.info(v);
      update['version'] = codeversion;
      console.info(update);
      idarray.forEach(function (id) {
        console.log("%c ".concat(id), 'color: green; font-weight:bold');

        if (v["repeating_weapons_".concat(id, "_damage")] === "") {
          update["repeating_weapons_" + id + "_hasdamage"] = "0";
          console.info(update);
        } else {
          update["repeating_weapons_" + id + "_hasdamage"] = "1";
          console.info(update);
        }

        if (v["repeating_weapons_".concat(id, "_lethality_percent")] > 0) {
          update["repeating_weapons_" + id + "_haslethality"] = "1";
          console.info(update);
        } else {
          update["repeating_weapons_" + id + "_haslethality"] = "0";
          console.info(update);
        }

        if (v['sheet_type'] === 'npc') {
          update["repeating_weapons_" + id + "_weapons"] = v["repeating_weapons_".concat(id, "_attack")];
        }
      });
      console.log("%c update", 'color: green; font-weight:bold');
      console.info(update);
      setAttrs(update, //Update attributes
      {
        silent: true
      }, // will not trigger sheet workers
      versioning(codeversion)); // call versioning again
    });
  });
}; // UPDATE TO VERSION 1.7


var version_150_170 = function version_150_170() {
  var codeversion = 1.7;
  var update = {};
  update['version'] = codeversion;
  update['luck'] = 50;
  update['luck_max'] = 50;
  console.log("%c update", 'color: green; font-weight:bold');
  console.info(update);
  setAttrs(update, //Update attributes
  {
    silent: true
  }, // will not trigger sheet workers
  versioning(codeversion)); // call versioning again
}; // UPDATE THE VALUE OF THE BOND IN THE REPEATING SECTION WHEN CREATED


on("change:repeating_bonds", function () {
  getAttrs(["repeating_bonds_flag", "charisma_score"], function (value) {
    if (value["repeating_bonds_flag"] == 0) {
      var update = {
        repeating_bond_score: value["charisma_score"],
        repeating_bond_flag: 1
      };
      setAttributes(update, true);
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
}); // Find max and min of a function

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

var addskills = []; //name of the array
// function to populate the array

on('sheet:opened change:repeating_skills remove:repeating_skills', function () {
  addskills = [];
  getSectionIDs('repeating_skills', function (idarray) {
    addskills = idarray.map(function (id) {
      return "repeating_skills_".concat(id);
    });
    console.log(addskills); //log of debugging to be sure
  });
}); // levelup character

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
  var name; //console.dir(copyarray);
  //getSectionIDs('repeating_skills', (idarray) => {
  //    for (i=0;i<idarray.length;i++){
  //       copyarray.push(`repeating_skills_${idarray[i]}`) ;
  //    }
  //});

  copyarray = copyarray.concat(addskills); // concatenate skill array with repeating skill array

  console.dir(copyarray);
  getSectionIDs("repeating_summary", function (idarray) {
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

var isJSONString = function isJSONString(string) {
  var json = {};

  try {
    json = JSON.parse(string);
  } catch (e) {
    return false;
  }

  return json;
};

var dropAgent = function dropAgent(data) {
  var updateAttrs = {};
  updateAttrs["sheet_type"] = "pc";
  var fields = [// general information
  "employer", "profession", //skills
  "accounting", "alertness", "anthropology", "archeology", "art", "art_name", "artillery", "athletics", "bureaucracy", "computer_science", "craft", "craft_name", "criminology", "demolitions", "disguise", "dodge", "drive", "firearms", "first_aid", "forensics", "heavy_machinery", "heavy_weapons", "history", "humint", "law", "medicine", "melee_weapons", "military_science", "military_science_name", "navigate", "occult", "persuade", "pharmacy", "pilot", "pilot_name", "psychotherapy", "ride", "science", "science_name", "search", "sigint", "stealth", "surgery", "survival", "swim", "unarmed_combat", "unnatural", //additional entries
  "armor_and_gear", "personal_details_and_notes", "motivations", "bond_number"]; // bonds

  var special_trainings = isJSONString(data.repeated_special_trainings);
  var rituals = isJSONString(data.repeating_rituals);
  var weapons = isJSONString(data.repeating_weapons);
  var repSkills = isJSONString(data.repeating_skills);
  console.log("special_trainings: ".concat(special_trainings));
  console.log("rituals: ".concat(rituals));
  console.log("weapons: ".concat(weapons));
  console.log("repSkills: ".concat(repSkills));

  if (repSkills) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var skill = _step.value;
        var dRepSkills = dropRepSkills(skill);
        Object.keys(dRepSkills).forEach(function (key) {
          return updateAttrs[key] = dRepSkills[key];
        });
      };

      for (var _iterator = repSkills[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  if (special_trainings) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop2 = function _loop2() {
        var special_training = _step2.value;
        var dSpecialTraining = dropSpecialTraining(special_training);
        Object.keys(dSpecialTraining).forEach(function (key) {
          return updateAttrs[key] = dSpecialTraining[key];
        });
      };

      for (var _iterator2 = special_trainings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop2();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  if (rituals) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      var _loop3 = function _loop3() {
        var ritual = _step3.value;
        var dRitual = dropRitual(ritual);
        Object.keys(dRitual).forEach(function (key) {
          return updateAttrs[key] = dRitual[key];
        });
      };

      for (var _iterator3 = rituals[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        _loop3();
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  if (weapons) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      var _loop4 = function _loop4() {
        var weapon = _step4.value;
        var dWeapons = dropWeapon(weapon);
        Object.keys(dWeapons).forEach(function (key) {
          return updateAttrs[key] = dWeapons[key];
        });
      };

      for (var _iterator4 = weapons[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        _loop4();
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

  console.log(fields);

  for (var _i = 0, _fields = fields; _i < _fields.length; _i++) {
    var field = _fields[_i];
    console.log(field);
    console.log(data[field]);

    if (data[field]) {
      if (field === "bond_number") {
        for (i = 0; i < data[field]; i++) {
          var UIDD = generateRowID();
          var prefix = "repeating_bonds_".concat(UIDD);
          updateAttrs["".concat(prefix, "_name")] = "bond_".concat(i);
        }
      } else {
        updateAttrs[field] = data[field];
      }
    }
  }

  console.log(updateAttrs);
  return updateAttrs;
};

var dropRepSkills = function dropRepSkills(data) {
  var updateAttrs = {};
  var UIDD = generateRowID();
  var prefix = "repeating_skills_".concat(UIDD);
  updateAttrs["".concat(prefix, "_name")] = data.name;
  updateAttrs["".concat(prefix, "_rank")] = data.rank;
  console.log("skills");
  console.log(updateAttrs);
  return updateAttrs;
};

var dropSpecialTraining = function dropSpecialTraining(data) {
  var updateAttrs = {};
  var UIDD = generateRowID();
  var prefix = "repeating_special_".concat(UIDD);
  fields = ["special_training", "skill_or_stat_used"];
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = fields[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var field = _step5.value;

      if (data[field]) {
        if (field === "skill_or_stat_used") {
          var skillname = data["skill_or_stat_used"].toLowerCase().replace(/ /g, "_");
          updateAttrs["".concat(prefix, "_skill_or_stat_used")] = "@{".concat(skillname, "}");
        } else {
          updateAttrs["".concat(prefix, "_").concat(field)] = data[field];
        }
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  console.log("special training");
  console.log(updateAttrs);
  return updateAttrs;
};

var dropRitual = function dropRitual(data) {
  var updateAttrs = {};
  var UIDD = generateRowID();
  var prefix = "repeating_rituals_".concat(UIDD); // to be updated when the format is decided

  console.log(updateAttrs);
  return updateAttrs;
};

var dropMonster = function dropMonster(data) {
  var updateAttrs = {};
  updateAttrs["sheet_type"] = "npc"; // to be updated when the format is decided

  console.log(updateAttrs);
  return updateAttrs;
};

var dropWeapon = function dropWeapon(data) {
  var updateAttrs = {};
  var fields = ["weapons", "skill_percent", "base_range", "damage", "armor_piercing", "lethality_percent", "ammo"];
  var UIDD = generateRowID();
  var prefix = "repeating_weapons_".concat(UIDD);

  for (var _i2 = 0, _fields2 = fields; _i2 < _fields2.length; _i2++) {
    var field = _fields2[_i2];

    if (data[field]) {
      if (field === "skill_percent") {
        var skillname = data[field].toLowerCase().replace(/ /g, "_");
        updateAttrs["".concat(prefix, "_").concat(field)] = "@{".concat(skillname, "}");
      } else {
        updateAttrs["".concat(prefix, "_").concat(field)] = data[field];
      }
    }
  }

  console.log(updateAttrs);
  return updateAttrs;
};
/*
const dropWeaponWrapper = (data) => {
	const updateAttrs = {};
	const weapon = isJSONString(data.repeating_weapons);
	let dWeapons=dropWeapon(weapon);
	Object.keys(dWeapons).forEach(key => updateAttrs[key] = dWeapons[key]);
	console.log("here the new weapon");
	console.log(updateAttrs);
	return updateAttrs;

}
*/


var getDropType = function getDropType(data) {
  return data.Category || false;
};

var handleDragandDrop = function handleDragandDrop() {
  getAttrs(["drop_name", "drop_data"], function (v) {
    var drop_name = v.drop_name,
        drop_data = v.drop_data;

    if (drop_name === "" || drop_data === "") {
      return;
    }

    var dropDataParsed = JSON.parse(drop_data);
    var dropType = getDropType(dropDataParsed);
    console.log(dropType);
    console.log(dropDataParsed);
    var updateAttrs = false;

    if (dropType === "Agents") {
      console.log("It's an Agent");
      updateAttrs = dropAgent(dropDataParsed);
    }

    if (dropType === "Monsters") {
      console.log("It's a Monster");
      updateAttrs = dropMonster(dropDataParsed);
    }

    if (dropType === "Rituals") {
      console.log("It's a ritual");
      updateAttrs = dropRitual(dropDataParsed);
    }

    if (dropType === "Bonds") {
      console.log("It's a Bond");
      updateAttrs = dropBond(dropDataParsed);
    }

    if (dropType === "SpecialTrainings") {
      console.log("It's an Special Training");
      updateAttrs = dropSpecialTraining(dropDataParsed);
    }

    if (dropType === "Weapons") {
      console.log("It's a Weapon");
      updateAttrs = dropWeapon(dropDataParsed);
    }

    if (updateAttrs === false) {
      updateAttrs = _objectSpread({}, {
        drop_name: "",
        drop_data: "",
        drop_category: ""
      });
      setAttrs(updateAttrs);
      return console.warn("Drag and drop could not identify the type of drop");
    }

    if (_typeof(updateAttrs) !== "object") {
      updateAttrs = _objectSpread({}, {
        drop_name: "",
        drop_data: "",
        drop_category: ""
      });
      setAttrs(updateAttrs);
      return console.warn("Drag and drop returned  broken value");
    }

    updateAttrs = _objectSpread({}, updateAttrs, {}, {
      drop_name: "",
      drop_data: "",
      drop_category: ""
    });
    console.log(updateAttrs);
    setAttrs(updateAttrs);
  });
};

on("change:drop_data", function (eventInfo) {
  var jsonData = JSON.parse(eventInfo.newValue);
  console.log(jsonData);
  handleDragandDrop(); // do something with data
});