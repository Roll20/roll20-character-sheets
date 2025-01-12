"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isJSONString = function isJSONString(string) {
  var json = {};

  try {
    json = JSON.parse(string);
  } catch (e) {
    console.info('it is not a JSON');
    return false;
  }

  console.info("string", json);
  return json;
};

var arrays_drop = {
  fields: ["employer", "profession", "accounting", "alertness", "anthropology", "archeology", "art_1", "art_1_name", "art_2", "art_2_name", "artillery", "athletics", "bureaucracy", "computer_science", "craft_1", "craft_1_name", "craft_2", "craft_2_name", "criminology", "demolitions", "disguise", "dodge", "drive", "firearms", "first_aid", "forensics", "heavy_machinery", "heavy_weapons", "history", "humint", "law", "medicine", "melee_weapons", "military_science_1", "military_science_1_name", "military_science_2", "military_science_2_name", "navigate", "occult", "persuade", "pharmacy", "pilot_1", "pilot_1_name", "pilot_2", "pilot_2_name", "psychotherapy", "ride", "science_1", "science_1_name", "science_1", "science_2_name", "search", "sigint", "stealth", "surgery", "survival", "swim", "unarmed_combat", "unnatural", "armor_and_gear", "personal_details_and_notes", "motivations", "bond_number"],
  visible: ["accounting", "alertness", "anthropology", "archeology", "art_1", "art_1_name", "art_2", "art_2_name", "artillery", "athletics", "bureaucracy", "computer_science", "craft_1", "craft_2", "criminology", "demolitions", "disguise", "dodge", "drive", "firearms", "first_aid", "forensics", "heavy_machinery", "heavy_weapons", "history", "humint", "law", "medicine", "melee_weapons", "military_science_1", "military_science_2", "navigate", "occult", "persuade", "pharmacy", "pilot_1", "pilot_2", "psychotherapy", "ride", "science_1", "science_1", "search", "sigint", "stealth", "surgery", "survival", "swim", "unarmed_combat", "unnatural"],
  bond: ["name", "bond_score"],
  skill: ["name", "rank"],
  special_training: ["name", "skill_or_stat_used"],
  weapon: ["name", "skill_percent", "base_range", "damage", "armor_piercing", "lethality_percent", "ammo", "ammo_total"],
  rep: {
    bond: "repeating_bonds_",
    special: "repeating_special_",
    skill: "repeating_skills_",
    ritual: "repeating_rituals_",
    weapon: "repeating_weapons_"
  }
};

var dropAgent = function dropAgent(data) {
  var updateAttrs = {};
  updateAttrs["sheet_type"] = "pc"; // First of all reset skills and repeating sections for skills and abilities

  resetBonds(updateAttrs);
  resetSkills(updateAttrs);
  resetAllRepeatingSkills(updateAttrs);
  resetAllSpecialAbilities(updateAttrs);
  console.log("Agent Reset:", updateAttrs); // bonds

  var special_trainings = isJSONString(data.repeated_special_trainings);
  var rituals = isJSONString(data.repeating_rituals);
  var weapons = isJSONString(data.repeating_weapons);
  var repSkills = isJSONString(data.repeating_skills);
  var dropfields = arrays_drop["fields"];
  var visible = arrays_drop['visible'];
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
  /*	
  	if (rituals){
  		for (const ritual of rituals){
  			let dRitual=dropRitual(ritual);
  			Object.keys(dRitual).forEach(key => updateAttrs[key] = dRitual[key]);
  		}
  	}
  */


  if (weapons) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      var _loop3 = function _loop3() {
        var weapon = _step3.value;
        var dWeapons = dropWeapon(weapon);
        Object.keys(dWeapons).forEach(function (key) {
          return updateAttrs[key] = dWeapons[key];
        });
      };

      for (var _iterator3 = weapons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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

  console.info('drop fields:', dropfields);
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = dropfields[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var field = _step4.value;
      console.log(field);
      console.log(data[field]);

      if (data[field]) {
        if (field === "bond_number") {
          for (i = 0; i < data[field]; i++) {
            var UIDD = generateRowID();
            var prefix = "".concat(arrays_drop["rep"]["bond"]).concat(UIDD);
            updateAttrs["".concat(prefix, "_name")] = "bond_".concat(i);
            updateAttrs["".concat(prefix, "_test")] = "editable";
          }
        } else if (data[field] === "name") {
          updateAttrs["profession"] = data[field];
        } else {
          updateAttrs[field] = data[field];
        }

        if (visible.includes(field)) {
          updateAttrs["".concat(field, "_visible")] = "visible";
        }
      }
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

  console.info("Agent:", updateAttrs);
  return updateAttrs;
};

var dropRepSkills = function dropRepSkills(data) {
  var updateAttrs = {};
  var UIDD = generateRowID();
  var prefix = "".concat(arrays_drop["rep"]["skill"]).concat(UIDD);
  var dropskillfields = arrays_drop["skill"];
  dropskillfields.forEach(function (field) {
    updateAttrs["".concat(prefix, "_").concat(field)] = data[field];
  });
  updateAttrs["".concat(prefix, "_test")] = "editable";
  console.info("repeating skills:", updateAttrs);
  return updateAttrs;
};

var dropSpecialTraining = function dropSpecialTraining(data) {
  var updateAttrs = {};
  var UIDD = generateRowID();
  var prefix = "".concat(arrays_drop["rep"]["special"]).concat(UIDD);
  var dropspecialtrainingfields = arrays_drop["special_training"];
  dropspecialtrainingfields.forEach(function (field) {
    if (data[field]) {
      if (field === "skill_or_stat_used") {
        var skillname = data["skill_or_stat_used"].toLowerCase().replace(/ /g, "_");
        updateAttrs["".concat(prefix, "_skill_or_stat_used")] = "@{".concat(skillname, "}");
      } else {
        updateAttrs["".concat(prefix, "_").concat(field)] = data[field];
      }
    }
  });
  updateAttrs["".concat(prefix, "_test")] = "editable";
  console.info("special training:", updateAttrs);
  return updateAttrs;
};
/*
const dropRitual = (data) => {
	const updateAttrs = {};
	const UIDD = generateRowID();
	const prefix=`repeating_rituals_${UIDD}`;
	// to be updated when the format is decided

	console.log(updateAttrs);
	return updateAttrs;
}

const dropMonster = (data) => {
	const updateAttrs = {};
	updateAttrs[`sheet_type`] = "npc";
	// to be updated when the format is decided
	console.log(updateAttrs);
	return updateAttrs;
}
*/


var dropWeapon = function dropWeapon(data) {
  var updateAttrs = {};
  var UIDD = generateRowID();
  var prefix = "".concat(arrays_drop["rep"]["weapon"]).concat(UIDD);
  var weaponfields = arrays_drop["weapon"];

  if (data.hasOwnProperty(weaponfields[2]) == false) {
    console.warn("weapon uses the repeating field format");
    data = isJSONString(data.repeating_weapons);
    console.log(data);
  }

  updateAttrs["".concat(prefix, "_test")] = 'editable';
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = weaponfields[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var field = _step5.value;

      if (data[field]) {
        if (field === "skill_percent") {
          var skillname = cleanedSkill(data[field]);
          console.info(skillname);

          if (isSkillNumber(skillname)) {
            updateAttrs["".concat(prefix, "_skill_percent")] = skillname;
          } else if (isValidSkill(skillname)) {
            updateAttrs["".concat(prefix, "_skill_percent")] = "@{".concat(skillname, "}");
          } else {
            console.error("skill not found: ".concat(skillname));
          }
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

  console.log("weapon:", updateAttrs);
  return updateAttrs;
};

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
    console.info("drop type:", dropType);
    console.info('data:', dropDataParsed);
    var updateAttrs = false;

    if (dropType === "Agents") {
      console.log("It's an Agent");
      updateAttrs = dropAgent(dropDataParsed);
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

    var updateAttrsTot = _objectSpread({}, updateAttrs, {}, {
      drop_name: "",
      drop_data: "",
      drop_category: ""
    });

    setAttrs(updateAttrsTot, {
      silent: false
    }, function () {
      console.info("Dropped Values:", updateAttrsTot);
    });
  });
};

on("change:drop_data", function (eventInfo) {
  var jsonData = JSON.parse(eventInfo.newValue);
  console.log(jsonData);
  handleDragandDrop(); // do something with data
});