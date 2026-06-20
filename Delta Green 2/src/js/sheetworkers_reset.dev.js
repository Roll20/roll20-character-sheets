"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

on('clicked:reset_all', function () {
  var update = {};
  resetStats(update, false);
  resetBonds(update);
  resetAdaptations(update);
  resetEquipment(update);
  resetSkills(update);
  resetHistory(update); // write all the reset functions here

  setAttrs(update, {
    silent: true
  }, function () {
    console.log('reset all');
    console.info(update);
  });
});
on('clicked:reset_stats', function () {
  var update = {};
  resetStats(update);
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('reset stats');
    console.info(update);
  });
});
on('clicked:reset_skills', function () {
  var update = {};
  resetSkills(update);
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('reset skills');
    console.info(update);
  });
});
on('clicked:reset_equipment', function () {
  var update = {};
  resetEquipment(update);
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('reset equipment');
    console.info(update);
  });
});
on('clicked:reset_breaking_point', function () {
  var update = {};
  resetBreakingPoints(update);
  console.info(update);
});

var resetBreakingPoints = function resetBreakingPoints(update) {
  getAttrs(['breaking_point_max', 'breaking_point', 'breaking_point_reset'], function (values) {
    console.log('breaking_point_reset:', values);
    var breaking_point_reset = parseInt(values.breaking_point_reset, 10) || 0;
    update['breaking_point_max'] = breaking_point_reset;
    update['breaking_point'] = breaking_point_reset;
    update['breaking_point_reset'] = breaking_point_reset;
    setAttrs(update, {
      silent: true
    }, function () {
      console.log('reset breaking points');
      console.info(update);
    });
  });
};

var resetStats = function resetStats(update) {
  var reset_bonds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var array_to_reset = arrays['_stats'];
  var stat_score = arrays['_stats'].map(function (stat) {
    return stat + '_score';
  });
  array_to_reset = array_to_reset.concat(stat_score);
  array_to_reset = array_to_reset.concat(arrays['_derived_stats']);
  array_to_reset = array_to_reset.concat(arrays['_derived_stats_max']);
  array_to_reset = array_to_reset;
  array_to_reset.forEach(function (stat) {
    update[stat] = '';
  });
  var old_values = ['sanity_points_old', 'breaking_point_old'];
  old_values.forEach(function (stat) {
    update[stat] = '';
  });
  var initial_flags = ['initial_san', 'initial_con', 'initial_str', 'initial_hp'];
  initial_flags.forEach(function (flag) {
    update[flag] = '1';
  });

  if (reset_bonds) {
    getSectionIDs("bonds", function (ids) {
      ids.forEach(function (id) {
        update["repeating_bonds_".concat(id, "_test")] = 'editable';
        update["repeating_bonds_".concat(id, "_score")] = '';
      });
    });
  }
};

var resetSkills = function resetSkills(update) {
  Object.entries(_initial_skills).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        skill = _ref2[0],
        value = _ref2[1];

    update[skill] = value;
    update["".concat(skill, "_fail")] = value;
  });
  arrays['_editable_skills'].forEach(function (skill) {
    update["".concat(skill, "_name")] = '';
    update["".concat(skill, "_test")] = 0;
  });
  resetAllRepeatingSkills(update);
  resetAllSpecialAbilities(update);
};

var resetBonds = function resetBonds(update) {
  getSectionIDs("bonds", function (ids) {
    ids.forEach(function (id) {
      removeRepeatingRow('repeating_bonds_' + id);
      console.log('removing repeating_bonds_' + id);
    });
  });
};

var resetAdaptations = function resetAdaptations(update) {
  update['motivations'] = '';
  console.log(arrays['_adaptation']);
  arrays['_adaptation'].forEach(function (adaptation) {
    update[adaptation] = -1;
    update["".concat(adaptation, "_adapted")] = 0;
  });
};

var resetAllWeapons = function resetAllWeapons(update) {
  getSectionIDs("weapons", function (ids) {
    ids.forEach(function (id) {
      removeRepeatingRow('repeating_weapons_' + id);
      console.log('removing repeating_weapons_' + id);
    });
  });
};

var resetAllRituals = function resetAllRituals(update) {
  getSectionIDs("rituals", function (ids) {
    ids.forEach(function (id) {
      removeRepeatingRow('repeating_rituals_' + id);
      console.log('removing repeating_rituals_' + id);
    });
  });
};

var resetEquipment = function resetEquipment(update) {
  resetAllWeapons(update);
  resetAllRituals(update);
  update['armor_and_gear'] = '';
};

var resetAllRepeatingSkills = function resetAllRepeatingSkills(update) {
  getSectionIDs("skills", function (ids) {
    ids.forEach(function (id) {
      removeRepeatingRow('repeating_skills_' + id);
      console.log('removing repeating_skills_' + id);
    });
  });
};

var resetAllSpecialAbilities = function resetAllSpecialAbilities(update) {
  getSectionIDs("special", function (ids) {
    console.log('special:' + ids);
    ids.forEach(function (id) {
      removeRepeatingRow('repeating_special_' + id);
      console.log('removing repeating_special_' + id);
    });
  });
};

var resetHistory = function resetHistory(update) {
  console.log(arrays['_personal_data']);
  arrays['_personal_data'].forEach(function (data) {
    update[data] = '';
  });
  resetInjuries(update);
};

var resetInjuries = function resetInjuries(update) {
  update['injuries'] = '';
  update['injuries_first_aid'] = 0;
};