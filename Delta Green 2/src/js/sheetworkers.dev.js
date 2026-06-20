"use strict";

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
      }, function () {
        console.log("Skill span updated for ".concat(skill));
        console.info(update);
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
    console.info('update', update);
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
        console.info('update', update);
        console.log('Bonds updated on open');
      });
    });
  });
}; // === debug note: need to change repeating_special_training and repeating_weapons for visulization purposes
// === Update stats on change


var skill_in_bounds = function skill_in_bounds(skill) {
  var skill_value = parseInt(skill) || 0;
  return Math.min(99, Math.max(0, skill_value));
};

var updateadvancedweapons = function updateadvancedweapons() {
  getAttrs(['advanced_weapons'], function (v) {
    var advanced_weapons = v['advanced_weapons'];
    getSectionIDs("weapons", function (ids) {
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