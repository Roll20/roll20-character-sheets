"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      setAttrs(update, {
        silent: false
      }, function () {
        console.log('Vitality color updated');
      });
    });
  });
});

var BondButtonColor = function BondButtonColor(bondvalue) {
  var score = parseInt(bondvalue) || 0;
  var color = score > 0 ? 'on' : 'off';
  return color;
};

var changeBondButtonColorOnOpen = function changeBondButtonColorOnOpen() {
  getSectionIDs("repeating_bonds", function (idarray) {
    var allbonds = idarray.map(function (id) {
      return "repeating_bonds_".concat(id, "_score");
    });
    getAttrs(allbonds, function (value) {
      var update = {};
      Object.entries(value).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var id = key.split('_')[2];
        var score = parseInt(value) || 0;
        update['repeating_bonds_' + id + '_color'] = BondButtonColor(score);
      });
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Bond color updated');
      });
    });
  });
};

on('change:repeating_bonds:score', function (eventInfo) {
  var update = {};
  var value = parseInt(eventInfo.newValue) || 0;
  update['repeating_bonds_color'] = BondButtonColor(value);
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('Bond color updated');
  });
});
on("change:repeating_weapons:skill_percent change:repeating_special:skill_or_stat_used change:repeating_rituals:skill_percent", function (eventInfo) {
  console.log(eventInfo);
  var newValue = eventInfo.newValue;
  var field = eventInfo.triggerName;
  var id = field.split('_')[2];
  var skillspan = "repeating_".concat(field.split('_')[1], "_").concat(id, "_skill_span");
  var isMinority = isMinorityReport(eventInfo);
  var isValid = isStringInForm(newValue) && isValidSkill(newValue) && !isMinority;
  var isNumber = isSkillNumber(newValue);
  var update = {};

  if (isNumber) {
    var number = parseInt(newValue) || 0;
    update[field] = number;
    update[skillspan] = number;
    setAttrs(update, {
      silent: true
    }, function () {});
  } else if (isValid) {
    var skill = cleanedSkill(newValue);
    getAttrs(["".concat(skill)], function (v) {
      update[skillspan] = v["".concat(skill)];
      setAttrs(update, {
        silent: true
      }, function () {});
    });
  } else if (isMinority) {
    console.log("Right now the Precogs can't see a thing.");
  } else {
    update[field] = 0;
    update[skillspan] = 0;
    setAttrs(update, {
      silent: true
    }, function () {});
  }
});