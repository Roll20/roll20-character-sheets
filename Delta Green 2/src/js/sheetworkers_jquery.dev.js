"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var updateRepeatingRollsonOpenJQ = function updateRepeatingRollsonOpenJQ() {
  Object.entries(_repeating_sections).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        element = _ref2[0],
        section = _ref2[1];

    getSectionIDs(section, function (idarray) {
      var update = {};
      console.log('section: ' + section + ' element: ' + element + ' idarray: ' + idarray);
      idarray.forEach(function (id) {
        update["repeating_".concat(section, "_").concat(id, "_").concat(element, "_r")] = "".concat(id);
      });
      console.info('Value of update inside repeating rollUpdate', update);
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('Repeating Rolls updated');
        console.info('update', update);
      });
    });
  });
};

var selector = 'button.roll';
$20(selector).on('click', function (e) {
  var _header = "";
  console.log(e);
  var roll = e.htmlAttributes.name.match(/^attr_(.*)_r$/)[1];

  var _roll = roll === 'sanity_points' ? 'sanity' : roll;

  var hasmodifiers = e.shiftKey ? true : false;
  console.info("hasmodifiers:", hasmodifiers);
  var queryModifier = hasmodifiers ? _queryModifier : '0';
  console.info("roll: ".concat(roll, " _roll: ").concat(_roll));

  if (arrays["_editable_skills"].includes(_roll)) {
    console.log('editable skill');

    var prefix_skill = _roll.slice(0, -2);

    console.log("prefix: ".concat(prefix_skill));
    getAttrs(["".concat(_roll, "_name")], function (values) {
      _header = "{{header=^{".concat(prefix_skill.replace('_', ' '), "} (").concat(values["".concat(_roll, "_name")], ")}}");
      console.log("header: ".concat(_header));
      var rollString = "".concat(prefix_skill_roll, " ").concat(_header, " {{subheader=@{").concat(roll, "}}} ");
      rollwithmodifiers(rollString, roll, queryModifier);
    });
  } else {
    var caps = _roll === 'humint' || _roll === 'sigint' ? _roll.toUpperCase() : _roll.replace('_', ' ');
    _header = "{{header=^{".concat(caps.replace('_', ' '), "}}}");
    var rollString = "".concat(prefix_skill_roll, " ").concat(_header, " {{subheader=@{").concat(roll, "}}} ");
    rollwithmodifiers(rollString, roll, queryModifier);
  }
});
$20('button.repeating_roll').on('click', function (e) {
  console.log(e);
  var id = e.htmlAttributes.value;

  var section = _repeating_sections[e.htmlAttributes.name.split('_')[1]];

  var hasmodifiers = e.shiftKey ? true : false;
  console.info("hasmodifiers:", hasmodifiers);
  var queryModifier = hasmodifiers ? _queryModifier : '0';
  var _header = "";
  var _rank = "";
  var _input_names = {};
  var _parameters = ["repeating_".concat(section, "_").concat(id, "_name")]; // Common for all rolls, modifiers

  _parameters.push("willpower_points");

  _parameters.push("sanity_points");

  _parameters.push("low_will_power");

  _parameters.push("zero_will_power");

  _input_names["name"] = "repeating_".concat(section, "_").concat(id, "_name"); //skill dependent parameters

  _parameters.push("character_id");

  if (section === 'skills') {
    _input_names["rank"] = "repeating_".concat(section, "_").concat(id, "_rank");
    _input_names["fail"] = "repeating_".concat(section, "_").concat(id, "_fail");

    _parameters.push("repeating_".concat(section, "_").concat(id, "_rank"));

    _parameters.push("repeating_".concat(section, "_").concat(id, "_fail")); //bond dependent parameters

  } else if (section === 'bonds') {
    _input_names["local_wp_points"] = "repeating_".concat(section, "_").concat(id, "_wp_points");
    _input_names["local_san_points"] = "repeating_".concat(section, "_").concat(id, "_san_points");
    _input_names["score"] = "repeating_".concat(section, "_").concat(id, "_score");

    _parameters.push("repeating_".concat(section, "_").concat(id, "_score"));

    _parameters.push("repeating_".concat(section, "_").concat(id, "_wp_points"));

    _parameters.push("repeating_".concat(section, "_").concat(id, "_san_points")); //special training dependent parameters

  } else if (section === 'special') {
    _parameters.push("repeating_".concat(section, "_").concat(id, "_skill_or_stat_used"));
  } else {
    console.error("Section ".concat(section, " not found"));
  }

  console.log("parameters: ".concat(_parameters));
  clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
});