"use strict";

var selector = 'button.roll';
var sanity_selector = 'button.sanroll';
var _globalModifier = 0;
on('change:useKey', function () {
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
    console.log("use_global_modifier: ".concat(update['use_global_modifier']));
    setAttrs(update, {
      silent: true
    }, function () {
      console.log("Set global modifier ".concat(update.use_global_modifier));
    });
  });
});
on('change:global_modifier_number', function (eventInfo) {
  getAttrs(['global_modifier_number'], function (values) {
    var modifier = parseInt(values['global_modifier_number']) || '';
    console.log("Global modifier: ".concat(modifier));
  });
});
on('clicked:reset_global_modifier', function () {
  var update = {
    'global_modifier_number': ''
  };
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('Global modifier reset');
  });
});

usedModifier = function usedModifier(e, callback) {
  var queryModifier = 0;
  getAttrs(['useKey', 'global_modifier_number'], function (values) {
    var useKey = values['useKey'];
    console.log("useKey: ".concat(useKey));
    console.log("global_modifier_number: ".concat(values['global_modifier_number']));
    var globalModifier = parseInt(values['global_modifier_number']) || 0;

    if (useKey === 'global') {
      queryModifier = globalModifier;
    }

    if (e.altKey && useKey === 'alt') {
      queryModifier = _queryModifier;
    }

    if (e.ctrlKey && useKey === 'ctrl') {
      queryModifier = _queryModifier;
    }

    if (e.metaKey && useKey === 'meta') {
      queryModifier = _queryModifier;
    }

    if (e.shiftKey && useKey === 'shift') {
      queryModifier = _queryModifier;
    }

    if (useKey === 'none') {
      queryModifier = _queryModifier;
    }

    console.log("queryModifier: ".concat(queryModifier));
    callback(queryModifier);
  });
};

$20(selector).on('click', function (e) {
  console.log(e);
  var roll = e.htmlAttributes.name.match(/^attr_(.*)_r$/)[1];

  var _roll = roll === 'sanity_points' ? 'sanity' : roll;

  usedModifier(e, function (queryModifier) {
    console.log("queryModifier: ".concat(queryModifier));
    console.info("roll: ".concat(roll, " _roll: ").concat(_roll));
    var additionalParameters = {};

    if (arrays["_editable_skills"].includes(_roll)) {
      var prefix_skill = _roll.slice(0, -2);

      additionalParameters['editable_name'] = "".concat(_roll, "_name");
      additionalParameters['editable_type'] = prefix_skill.replace('_', ' ');
    } else {
      var caps = _roll === 'humint' || _roll === 'sigint' ? _roll.toUpperCase() : _roll.replace('_', ' ');
      additionalParameters['name'] = caps.replace('_', ' ');
    }

    var rollString = "".concat(prefix_skill_roll, " {{subheader=@{").concat(roll, "}}} ");
    rollwithmodifiers(rollString, roll, queryModifier, additionalParameters);
  });
});
$20(sanity_selector).on('click', function (e) {
  console.log(e);
  var _input_name = {};
  var _parameters = [];
  _input_name['success'] = 'sanity_success';

  _parameters.push(_input_name['success']);

  _input_name['failure'] = 'sanity_failure';

  _parameters.push(_input_name['failure']);

  getAttrs(['character_id', 'sanity_success', 'sanity_failure'], function (values) {
    var charid = values['character_id'];
    var sanity_success = values['sanity_success'] !== '' ? values['sanity_success'] : 0;
    var sanity_failure = values['sanity_failure'] !== '' ? values['sanity_failure'] : 1;
    var rollString = "".concat(prefix_sanity_roll, " {{header=@{character_name}}}");
    rollString += " {{sanity_type=@{sanity_type}}}";
    rollString += " {{description=@{npc_description}}}";
    rollString += " {{success_roll=[".concat(sanity_success, "](~").concat(charid, "|sanity_success)}}");
    rollString += " {{failure_roll=[".concat(sanity_failure, "](~").concat(charid, "|sanity_failure)}}");
    console.log("rollString: ".concat(rollString));
    console.info(sanity_success);
    console.info(sanity_failure);
    startRoll(rollString, function (results) {
      finishRoll(results.rollId);
    });
  });
});
$20('button.repeating_roll').on('click', function (e) {
  console.log(e);
  var id = e.htmlAttributes.value;

  var section = _repeating_sections[e.htmlAttributes.name.split('_')[1]];

  console.log("in button rep rolls section: ".concat(section, ")"));
  usedModifier(e, function (queryModifier) {
    var _input_names = {};
    var _parameters = [];
    setRepeatingParametersAndInputNames(section, id, _parameters, _input_names);
    console.info("parameters: ".concat(_parameters));
    console.info("input names: ".concat(_input_names));
    clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
  });
});