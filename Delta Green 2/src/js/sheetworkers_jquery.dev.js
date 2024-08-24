"use strict";

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

  console.log("in button rep rolls section: ".concat(section, ")"));
  var hasmodifiers = e.shiftKey ? true : false;
  console.info("hasmodifiers:", hasmodifiers);
  var queryModifier = hasmodifiers ? _queryModifier : '0';
  var _input_names = {};
  var _parameters = [];
  setRepeatingParametersAndInputNames(section, id, _parameters, _input_names);
  console.info("parameters: ".concat(_parameters));
  console.info("input names: ".concat(_input_names));
  clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
});