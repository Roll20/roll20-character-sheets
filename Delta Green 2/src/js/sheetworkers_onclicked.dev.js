"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

on("clicked:reset_global_modifier", function () {
  var update = {
    'global_modifier_number': ''
  };
  setAttrs(update, {
    silent: true
  }, function () {
    console.info('update', update);
  });
});
$20(selector).on("click", function (e) {
  var roll = e.htmlAttributes.name.match(/^attr_(.*)_r$/)[1];

  var _roll = roll === 'sanity_points' ? 'sanity' : roll;

  usedModifier(e, function (queryModifier) {
    console.log("queryModifier: ".concat(queryModifier));
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
$20(sanity_selector).on("click", function (e) {
  var _input_name = {};
  var _parameters = [];
  _input_name['success'] = 'sanity_loss_success';

  _parameters.push(_input_name['success']);

  _input_name['failure'] = 'sanity_loss_failure';

  _parameters.push(_input_name['failure']);

  getAttrs(['character_id', 'sanity_loss_success', 'sanity_loss_failure', 'sanity_type', 'violence_adapted', 'helplessness_adapted'], function (values) {
    var charid = values['character_id'];
    var sanity_loss_success = values['sanity_loss_success'] !== '' ? values['sanity_loss_success'] : 0;
    var sanity_loss_failure = values['sanity_loss_failure'] !== '' ? values['sanity_loss_failure'] : 1;
    var sanity_loss_type = values['sanity_type'];
    console.log(sanity_loss_type);
    var rollString = "".concat(prefix_sanity_roll, " {{header=@{character_name}}}");
    rollString += " {{sanity_type=^{@{sanity_type}}}}";
    rollString += " {{description=@{npc_description}}}";
    rollString += " {{success_roll=[".concat(sanity_loss_success, "](~").concat(charid, "|sanity_loss_success)}}");
    rollString += " {{failure_roll=[".concat(sanity_loss_failure, "](~").concat(charid, "|sanity_loss_failure)}}");
    console.info(sanity_loss_success);
    console.info(sanity_loss_failure);
    console.info('min roll:', minRoll(sanity_loss_success));
    console.info('max roll:', maxRoll(sanity_loss_failure));
    startRoll(rollString, function (results) {
      finishRoll(results.rollId);
    });
  });
});
$20('button.repeating_roll').on("click", function (e) {
  var id = e.htmlAttributes.value;

  var section = _repeating_sections[e.htmlAttributes.name.split('_')[1]];

  usedModifier(e, function (queryModifier) {
    var _input_names = {};
    var _parameters = [];
    setRepeatingParametersAndInputNames(section, id, _parameters, _input_names);
    clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
  });
});
arrays['_sanity_loss'].forEach(function (attrName) {
  on("clicked:".concat(attrName, "-action"), function (eventInfo) {
    getAttrs([attrName], function (values) {
      var sanloss = check_sanloss(values[attrName], attrName);
      rollSanityDamages(sanloss, attrName);
    });
  });
});

_allrolls.forEach(function (roll) {
  var _roll = roll === 'sanity_points' ? 'sanity' : roll;

  on("clicked:".concat(roll, "-action"), function (eventInfo) {
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
    rollwithmodifiers(rollString, roll, _queryModifier, additionalParameters);
  });
});

Object.entries(_repeating_sections).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      attrName = _ref2[0],
      section = _ref2[1];

  on("clicked:repeating_".concat(section, ":").concat(attrName, "-action"), function (eventInfo) {
    var id = eventInfo.sourceAttribute.split('_')[2];
    var queryModifier = _queryModifier;
    var _input_names = {};
    var _parameters = [];
    setRepeatingParametersAndInputNames(section, id, _parameters, _input_names);
    clicked_repeating_actions(section, _parameters, _input_names, queryModifier);
  });
});

_ritual_damages.forEach(function (attrName) {
  _type_damages.forEach(function (type) {
    on("clicked:repeating_rituals:".concat(attrName, "_").concat(type, "-action"), function (eventInfo) {
      var id = eventInfo.sourceAttribute.split('_')[2];
      var input_names = {};
      var parameters = [];
      input_names["ritual_type"] = attrName;
      parameters.push("repeating_rituals_".concat(id, "_ritual_type"));
      var repsecid = "repeating_rituals_".concat(id);
      input_names["repsecid"] = repsecid;
      input_names["name"] = "".concat(repsecid, "_name");
      input_names["damage_type"] = "".concat(type);
      input_names["attack_or_heal"] = "".concat(attrName);
      parameters.push(input_names["name"]);
      setDamageRitualParametersAndInputNames(id, parameters, input_names);
      clicked_repeating_damages(parameters, input_names, attrName);
    });
  });
});

_ritual_losses.forEach(function (attrName) {
  on("clicked:repeating_rituals:".concat(attrName, "-action"), function (eventInfo) {
    var id = eventInfo.sourceAttribute.split('_')[2];
    var input_names = {};
    var parameters = [];
    input_names["ritual_type"] = attrName;
    parameters.push("repeating_rituals_".concat(id, "_ritual_type"));
    var repsecid = "repeating_rituals_".concat(id);
    input_names["repsecid"] = repsecid;
    input_names["name"] = "".concat(repsecid, "_name");
    parameters.push(input_names["name"]);
    setRitualCostParametersAndInputNames(repsecid, parameters, input_names);
    CurrentValues.forEach(function (attrName) {
      input_names[attrName] = "".concat(attrName);
      parameters.push(attrName);
    });
    clicked_repeating_rituals_cost(parameters, input_names);
  });
});

_alldamages.forEach(function (attrName) {
  on("clicked:repeating_weapons:".concat(attrName, "-action"), function (eventInfo) {
    var id = eventInfo.sourceAttribute.split('_')[2];
    var _input_names = {};
    var _parameters = [];
    setDamageParametersAndInputNames(id, attrName, _parameters, _input_names);
    _input_names['rollName'] = attrName;
    clicked_repeating_damages(_parameters, _input_names);
  });
}); // levelup character


on("clicked:levelup", function () {
  var copyarray = arrays['_skills']; // copy of the array containing all skills ranks

  console.dir(copyarray);
  getSectionIDs("summary", function (idarray) {
    for (var i = 0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_summary_" + idarray[i]);
    }
  });
  var summary = {}; // object to store the summary of the changes

  var update = {}; // object to update the attributes

  var newrowattrs = {}; // object to create a new row in the repeating_summary section   

  var named_skills = copyarray.map(function (sk) {
    return "".concat(sk, "_name");
  });
  var failed_skills = copyarray.map(function (sk) {
    return "".concat(sk, "_fail");
  });
  getAttrs(copyarray.concat(named_skills, failed_skills), function (val) {
    var newrowid;
    var oldval = 0;
    var newval = 0;
    var name;
    var var_rnd = 0; // random variable of 1d4

    copyarray.forEach(function (sk) {
      if (val["".concat(sk, "_fail")] == 'on') {
        //if the checkbox is checked
        var_rnd = Math.ceil(Math.random() * 4); // generate a random number for each checked value (less number generated)

        oldval = parseInt(val["".concat(sk)]) || 0;
        newval = oldval + var_rnd;
        name = val["".concat(sk, "_name")];
        summary["".concat(sk)] = var_rnd; // how much the skill has changed 0-3

        update["".concat(sk)] = newval; // new value of the skill

        update["".concat(sk, "_fail")] = 'off'; // uncheck checkbox

        newrowid = generateRowID();
        newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
        newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
        newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
      }
    });
  });
  getSectionIDs("skills", function (idarray) {
    var rep_array = [];
    var rep_rank = [];
    var rep_name = [];
    var rep_fail = [];
    idarray.forEach(function (id) {
      rep_array.push("repeating_skills_".concat(id));
    });
    rep_rank = rep_array.map(function (sk) {
      return "".concat(sk, "_rank");
    });
    rep_name = rep_array.map(function (sk) {
      return "".concat(sk, "_name");
    });
    rep_fail = rep_array.map(function (sk) {
      return "".concat(sk, "_fail");
    });
    getAttrs(rep_rank.concat(rep_name, rep_fail), function (val) {
      var newrowid;
      var oldval = 0;
      var newval = 0;
      var name;
      var var_rnd = 0; // random variable of 1d4

      rep_array.forEach(function (sk) {
        if (val["".concat(sk, "_fail")] == 'on') {
          //if the checkbox is checked
          var_rnd = Math.ceil(Math.random() * 4); // generate a random number for each checked value (less number generated)

          oldval = parseInt(val["".concat(sk, "_rank")]) || 0;
          newval = oldval + var_rnd;
          name = val["".concat(sk, "_name")];
          summary["".concat(sk)] = var_rnd; // how much the skill has changed 0-3

          update["".concat(sk, "_rank")] = newval; // new value of the skill

          update["".concat(sk, "_fail")] = 'off'; // uncheck checkbox

          newrowid = generateRowID();
          newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
          newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
          newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
        }
      });
      setAttrs(Object.assign(update, newrowattrs), {
        silent: false
      }, function () {
        console.log('inside repeating section');
        console.info(newrowattrs);
        console.info(update);
      });
    });
  });
});