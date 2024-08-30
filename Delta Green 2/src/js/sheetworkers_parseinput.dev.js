"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

arrays['_colored_derivative'].forEach(function (vitality) {
  on("change:".concat(vitality, "_points"), function (eventInfo) {
    var value = parseInt(eventInfo.newValue) || 0;
    value = value < 0 ? 0 : value;
    var maxval = "".concat(vitality, "_points_max");
    getAttrs([maxval], function (v) {
      var max_val = parseInt(v[maxval]) || 0;
      var low_val = 2;
      var update = {};
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
      setAttrs(update, {
        silent: false
      }, function () {});
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

_skill_percent.forEach(function (_skill_sec_percent) {
  var section = _skill_sec_percent.section;
  var field = _skill_sec_percent.field;
  var input = "repeating_".concat(section, "_").concat(field);
  var skillspan = "repeating_".concat(section, "_skill_span");
  on("change:repeating_".concat(section, ":").concat(field), function () {
    getAttrs([input], function (value) {
      var SkillPercent = value["repeating_".concat(section, "_").concat(field)];
      var isInLinkingForm = isValidLinkInput(SkillPercent);
      var isInNumericalForm = isSkillNumber(SkillPercent);
      var update = {};
      var skillname = '';

      if (isInLinkingForm === false && isInNumericalForm === false) {
        update[input] = 0;

        if (section !== 'skills') {
          update[skillspan] = update[input];
        }

        setAttrs(update, {
          silent: true
        }, function () {});
      }

      if (isInNumericalForm) {
        var number = setMinMax(SkillPercent);
        update[input] = number;

        if (section !== 'skills') {
          update[skillspan] = update[input];
        }

        setAttrs(update, {
          silent: true
        }, function () {});
      }

      if (isInLinkingForm) {
        var skill = cleanedSkill(SkillPercent);
        skillname = skill;
        getAttrs(["".concat(skillname)], function (values) {
          var number = setMinMax(values[skillname]);

          if (section !== 'skills') {
            update[skillspan] = number;
          }

          setAttrs(update, {
            silent: true
          }, function () {});
        });
      }

      ;
    });
  });
});

_only_number.forEach(function (_sect_object) {
  var section = _sect_object.section;
  var fields = _sect_object.fields;

  if (Array.isArray(fields)) {
    fields.forEach(function (field) {
      var input = "repeating_".concat(section, "_").concat(field);
      on("change:repeating_".concat(section, ":").concat(field), function () {
        getAttrs([input], function (value) {
          var update = {};
          var number = setMinMax(value[input]);
          update[input] = number;
          setAttrs(update, {
            silent: true
          }, function () {});
        });
      });
    });
  }

  ;
});

_number_or_roll.forEach(function (_sect_object) {
  var section = _sect_object.section;
  var fields = _sect_object.fields;

  if (Array.isArray(fields)) {
    fields.forEach(function (field) {
      var input = "repeating_".concat(section, "_").concat(field);
      on("change:repeating_".concat(section, ":").concat(field), function () {
        getAttrs([input], function (value) {
          var update = {};
          var number = parseRoll(value[input]);
          update[input] = number;
          setAttrs(update, {
            silent: true
          }, function () {});
        });
      });
    });
  }

  ;
});

arrays['_sanity_loss'].forEach(function (sanity) {
  on("change:".concat(sanity), function () {
    getAttrs(["".concat(sanity)], function (v) {
      var value = parseRoll(v[sanity]);
      var update = {};
      update[sanity] = value;
      setAttrs(update, {
        silent: true
      }, function () {
        console.info("Sanity points updated");
      });
    });
  });
});