"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      }, function () {
        console.info('update', update);
      });
    });
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
        }, function () {
          console.info('update', update);
        });
      }

      if (isInNumericalForm) {
        var number = setMinMax(SkillPercent);
        update[input] = number;

        if (section !== 'skills') {
          update[skillspan] = update[input];
        }

        setAttrs(update, {
          silent: true
        }, function () {
          console.info('update', update);
        });
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
          }, function () {
            console.info('update', update);
          });
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
          }, function () {
            console.info('update', update);
          });
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
          }, function () {
            console.info('update', update);
          });
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
        console.info('update', update);
        console.info("Sanity points updated");
      });
    });
  });
});

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
        console.info('update', update);
        console.log('Shotgun or Blast Radius updated');
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
        console.info('update', update);
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
    console.info('update', update);
    console.log('Repeating Skills updated on change');
  });
});
Object.entries(_repeating_sections).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      attrName = _ref2[0],
      section = _ref2[1];

  on("change:repeating_".concat(section), function (eventInfo) {
    var id = eventInfo.sourceAttribute.split('_')[2];
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
    console.info('update', update);
    console.log('Sanity points updated');
  });
});
arrays['_stats'].forEach(function (stat) {
  var stat_score = "".concat(stat, "_score");
  var _sanity_array = ['sanity_points', 'breaking_point', 'initial_san'];
  var _initial_hp = ['initial_str', 'initial_con', 'initial_hp'];
  on("change:".concat(stat_score), function () {
    var update = {};
    getAttrs(arrays['_stats'].concat(_sanity_array, _initial_hp, ['unnatural'], arrays['_stats'].map(function (el) {
      return "".concat(el, "_score");
    })), function (values) {
      var stat_score_value = parseInt(values[stat_score], 10) || 0;
      statInfo = setStatScore(stat_score_value, stat);
      InitializationFlags = getInitializationFlags(statInfo, values);
      setInitialPower(update, values, statInfo, InitializationFlags);
      setInitialHp(update, values, statInfo, InitializationFlags);
      update[stat] = statInfo["stat"];
      update[stat_score] = statInfo["score"];
      Object.assign(update, InitializationFlags);
      updateSkillSpanOnChange(statInfo["name"], statInfo["score"], update, 'Stats');
    });
  });
});
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

    if (value !== _initial_skills[skill]) {
      update["".concat(skill, "_visible")] = "visible";
    }

    updateSkillSpanOnChange(skill, value, update, 'Skills');
  });
});
on("change:sanity_points", function () {
  updatebreakingpoints();
});
on("change:breaking_point", function () {
  getAttrs(['breaking_point'], function (values) {
    var breaking_point = Math.max(0, parseInt(values.breaking_point, 10) || 0);
    var update = {};
    update['breaking_point_reset'] = breaking_point;
    update['breaking_point'] = breaking_point;
    setAttrs(update, {
      silent: true
    }, function () {});
  });
});
on("change:breaking_point_reset", function (eventInfo) {
  var breaking_point_reset = parseInt(eventInfo.newValue, 10) || 0;
  getAttrs(['breaking_point_reset'], function (values) {
    var breaking_point_reset = parseInt(values.breaking_point_reset, 10) || 0;
    var update = {};
    update['breaking_point_reset'] = Math.min(Math.max(0, breaking_point_reset), 99);
    setAttrs(update, {
      silent: true
    }, function () {
      console.info('update', update);
    });
  });
});
on("clicked:breaking_point_resets", function () {
  resetBreakingPoints();
});
on("change:global_modifier_number", function () {
  getAttrs(['global_modifier_number'], function (values) {
    var modifier = parseInt(values['global_modifier_number']) || 0;
    var update = {
      global_modifier_number: modifier
    };
    setAttrs(update, {
      silent: true
    }, function () {
      console.info('update', update);
    });
  });
});
on("change:repeating_skills remove:repeating_skills", function () {
  update_additionalskills();
});
on("change:repeating_weapons:armor_piercing", function () {
  getAttrs(['repeating_weapons_armor_piercing'], function (values) {
    var update = {};
    update_armor_piercing(values.repeating_weapons_armor_piercing, update);
    setAttrs(update, {
      silent: true
    }, function () {
      console.info('update', update);
    });
  });
});
on("change:repeating_weapons:ammo_total remove:repeating_weapons", function (values) {
  var ammo_total = Math.max(0, parseInt(values.newValue) || 0);
  var update = {};
  update["repeating_weapons_ammo_total"] = ammo_total;
  update["repeating_weapons_ammo"] = ammo_total;
  update["repeating_weapons_hasammo"] = ammo_total > 0 ? 'active' : '0';
  setAttrs(update, {
    silent: true
  }, function () {
    console.info('update', update);
  });
});
on("change:repeating_weapons:ammo", function (values) {
  var ammo = Math.max(0, parseInt(values.newValue) || 0);
  var update = {};
  update["repeating_weapons_ammo"] = ammo;
  setAttrs(update, {
    silent: true
  }, function () {
    console.info('update', update);
  });
});

_bond_attributes.forEach(function (attrName) {
  on("change:repeating_bonds:".concat(attrName), function (eventInfo) {
    var update = {};
    getAttrs(_score_info, function (values) {
      updatebondscore(values, update, attrName === 'score');
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Bond color updated');
        console.info(update);
      });
    });
  });
});

on("change:repeating_rituals", function (eventinfo) {
  var id = eventinfo.sourceAttribute.split('_')[2];
  ritual_rolls_info("repeating_rituals_".concat(id));
});
arrays['_adaptation'].forEach(function (adaptation) {
  on("change:".concat(adaptation), function () {
    getAttrs([adaptation], function (values) {
      console.log('values:', values);
      var value = parseInt(values[adaptation]) || 0;
      console.log('adaptation changed:' + value);
      var update = {};
      update["".concat(adaptation, "_adapted")] = value === 2 ? 1 : 0;
      setAttrs(update, {
        silent: true
      }, function () {
        console.info('update', update);
        update["".concat(adaptation, "_adapted")] == 1 ? console.log("".concat(adaptation, " adapted")) : console.log("".concat(adaptation, " not adapted"));
      });
    });
  });
});
on("change:advanced_weapons", function () {
  updateadvancedweapons();
});
on("change:useKey", function () {
  getAttrs(['useKey'], function (values) {
    var val = values['useKey'];
    var update = {
      use_global_modifier: 'inactive'
    };

    if (val === 'global') {
      update['use_global_modifier'] = 'active';
    }

    ;
    console.log("useKey: ".concat(val));
    setAttrs(update, {
      silent: true
    }, function () {
      console.info('update', update);
    });
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