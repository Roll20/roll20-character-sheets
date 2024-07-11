"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var updateRepeatingRollsonOpen = function updateRepeatingRollsonOpen() {
  getAttrs(['character_id'], function (values) {
    var charid = values.character_id;
    console.info('Repeating Sections', _repeating_sections);
    Object.entries(_repeating_sections).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          element = _ref2[0],
          section = _ref2[1];

      getSectionIDs(section, function (idarray) {
        var update = {};
        console.log('section: ' + section + ' element: ' + element + ' idarray: ' + idarray);
        idarray.forEach(function (id) {
          update["repeating_".concat(section, "_").concat(id, "_").concat(element, "_action")] = "%{".concat(charid, "|repeating_").concat(section, "_").concat(id, "_").concat(element, "-action}");
          update["repeating_".concat(section, "_").concat(id, "_").concat(element, "_r")] = id;
        });
        console.info('Value of update inside repeating rollUpdate', update);
        setAttrs(update, {
          silent: true
        }, function () {
          console.log('Repeating Rolls updated');
          console.info('update', update);
        });
        getAttrs(Object.keys(update), function (v) {
          Object.entries(v).forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            console.log("key: ".concat(key, " value: ").concat(value));
          });
        });
      });
    });
  });
};

var updateRollsOnOpen = function updateRollsOnOpen() {
  console.log('===update rolls===');
  var fullrolls = _allrolls;
  console.info("all rolls", _allrolls);
  getAttrs(['character_id'], function (values) {
    var update = {};
    var charid = values.character_id;
    console.log('character id: ' + charid);
    fullrolls.forEach(function (roll) {
      update["".concat(roll, "_action")] = "%{".concat(charid, "|").concat(roll, "-action}");
    });
    console.info('Value of update inside rollUpdate', update);
    setAttrs(update, {
      silent: false
    }, function () {
      console.log('Rolls updated');
      console.log('update:', update);
    });
  });
}; //='roll' value=`@{gm_toggle} &{template:rolls} {{header=^{${val}}}} {{subheader=@{${attrName}}}} {{rating=[[@{${attrName}}+?{Modifier|,0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}]]}}  {{modifier=[[?{Modifier|,0|+20%,20|+40%,40|-20%,-20|-40%,-40|custom (%),?{custom (%)}}]]}}  {{dice=[[1d100]]}}`)


var changeRepeatingRolls = function changeRepeatingRolls(section, element, id) {
  var attrName = "repeating_".concat(section, "_").concat(id, "_").concat(element);
  getAttrs(['character_id'], function (values) {
    var character_id = values.character_id;
    var update = {};
    update["".concat(attrName, "_action")] = "%{".concat(character_id, "|").concat(attrName, "-action}");
    update["".concat(attrName, "_r")] = id;
    console.info(update);
    setAttrs(update, {
      silent: true
    }, function () {
      console.log("Update repeating ".concat(element, " rolls"));
    });
  });
};

var rollwithmodifiers = function rollwithmodifiers(rollString, roll, queryModifier) {
  getAttrs(arrays['_derived_modifiers'], function (values) {
    console.log('wp: ' + values['willpower_points']);
    console.log('low wp: ' + values['low_will_power']);
    console.log('zero wp: ' + values['zero_will_power']); ///////////////////////////////////////////////////////////

    var wp_modifiers = check_for_wp_modifiers(values, roll);
    var _zero_will_power = wp_modifiers.zero_will_power;
    var _low_will_power = wp_modifiers.low_will_power;
    var rollValue = "".concat(rollString, " {{rating=[[@{").concat(roll, "}]]}}  {{zero_will_power=").concat(_zero_will_power, "}} {{low_will_power=").concat(_low_will_power, "}}}  {{modifier=[[").concat(queryModifier, "]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}");

    if (_zero_will_power != '[[1]]') {
      rollValue = "".concat(rollValue);
    }

    console.log(rollValue);
    var isSkill = arrays["_skills"].concat(["unnatural"]).includes(roll) ? 1 : 0;
    console.log("isSkill: ".concat(isSkill));
    var rollFail = "".concat(roll, "_fail");
    rollSkillAndStats(rollValue, roll, rollFail, isSkill);
  });
};

var check_for_wp_modifiers = function check_for_wp_modifiers(values, roll) {
  console.log('wp: ' + values['willpower_points']);
  console.log('low wp: ' + values['low_will_power']);
  console.log('zero wp: ' + values['zero_will_power']);

  var _willpower_points = parseInt(values["willpower_points"]) || 0;

  var _zero_will_power = values["zero_will_power"] == 1 && _willpower_points == 0 && roll !== 'luck' ? '[[1]]' : '[[0]]';

  var _low_will_power = values["low_will_power"] == 1 && _willpower_points <= 2 && _willpower_points > 0 && roll !== 'luck' && roll !== 'sanity_points' ? '[[1]]' : '[[0]]';

  console.log("zero will power: ".concat(_zero_will_power));
  console.log("low will power: ".concat(_low_will_power));
  return {
    zero_will_power: _zero_will_power,
    low_will_power: _low_will_power
  };
};

var rollSkillAndStats = function rollSkillAndStats(rollValue, rollName, rollFail, _isSkill) {
  startRoll("".concat(rollValue, " {{isSkill=[[").concat(_isSkill, "]]}}"), function (results) {
    console.log(results);
    var isSkill = results.results.isSkill.result == 0 ? false : true;
    var modifier = results.results.modifier.result;
    var zero_will_power = results.results.zero_will_power.result;
    var low_will_power = results.results.low_will_power.result;
    var rating = results.results.rating.result;
    var fullmodifier = modifier - 20 * low_will_power > 40 ? 40 : modifier - 20 * low_will_power;
    var dice = results.results.dice.result;
    var rating_check = rating + fullmodifier < 0 ? 0 : rating + fullmodifier > 99 ? 99 : rating + fullmodifier;
    var newroll = {
      a: 15,
      b: -2
    };
    console.log("full modifier: ".concat(fullmodifier));
    console.log("rating: ".concat(rating));
    console.log("rating check: ".concat(rating_check));
    console.log("dice: ".concat(dice));
    var isSuccess = 0;
    var isCritical = 0;

    if (rating < 100) {
      isSuccess = dice <= rating_check ? 1 : 0;
      isCritical = criticals.includes(dice) ? 1 : 0;
    } else {
      var score = Math.round(rating / 5);
      isSuccess = dice != 99 ? 1 : 0;
      isCritical = criticals.includes(dice) || dice <= score ? 1 : 0;
    }

    if (isSkill && isSuccess == 0) {
      var failure = {};
      failure["".concat(rollFail)] = 'on';
      console.info("Skill ".concat(rollName, " failed"));
      console.info("failure", failure);
      setAttrs(failure, function () {
        console.info("Skill ".concat(rollName, " failed"));
      });
    }

    newroll = {
      rating: rating_check,
      dice: dice,
      modifier: fullmodifier,
      isSuccess: isSuccess,
      isCritical: isCritical,
      zero_will_power: zero_will_power,
      low_will_power: low_will_power
    };
    console.log(newroll);
    finishRoll(results.rollId, newroll);
  });
};

var rollBonds = function rollBonds(rollValue, _value, _names, _parameters) {
  startRoll("".concat(rollValue), function (results) {
    console.log(results); ///////////////////////////////////////////////////////////

    var dice = results.results.dice.result;
    var local_wp = Math.max(0, parseInt(results.results.local_wp.result) - dice);
    var score = Math.max(0, parseInt(results.results.score.result) - dice);
    var zerowp = local_wp == 0 ? 1 : 0;
    console.log("local_wp: ".concat(local_wp));
    console.log("score: ".concat(score));
    console.log("dice: ".concat(dice));
    console.log("zerowp: ".concat(zerowp));
    var update = {};
    console.info('parameters', _parameters);
    console.info('names', _names);
    update[_names['local_wp_points']] = local_wp;
    update["willpower_points"] = local_wp;
    update[_names["score"]] = score;
    newroll = {
      dice: dice,
      local_wp: local_wp,
      score: score,
      zerowp: zerowp
    };
    finishRoll(results.rollId, newroll);
    setAttrs(update, {
      silent: false
    }, function () {
      console.info("Bonds updated", update);
    });
  });
};

var rollWeaponsAndRituals = function rollWeaponsAndRituals(rollValue, rollName, isLethal, hasAmmo) {};

var clicked_repeating_weapons = function clicked_repeating_weapons(parameters) {
  console.info("parameters:", parameters);
  getAttrs(parameters, function (values) {});
};

var clicked_repeating_actions = function clicked_repeating_actions(type, parameters, names, queryModifier) {
  if (type === 'weapons') {
    clicked_repeating_weapons(parameters, names, queryModifier);
  }

  if (type === 'bonds') {
    clicked_repeating_bonds(parameters, names, queryModifier);
  }

  if (type === 'special') {
    clicked_repeating_skills(parameters, names, queryModifier);
  }

  if (type === 'skills') {
    clicked_repeating_skills(parameters, names, queryModifier);
  }
};

var clicked_repeating_skills = function clicked_repeating_skills(parameters, names, queryModifier) {
  getAttrs(parameters, function (values) {
    var skillname = values[names['name']];
    var skillfail = names['fail'];
    var skillrank = parseInt(values[names['rank']]) || 0;
    console.log("skillname: ".concat(skillname, " name: ").concat(names['name']));
    console.log("skillrank: ".concat(skillrank, " rank: ").concat(names['rank']));
    console.info('values', values);
    var rollString = "".concat(prefix_skill_roll, " {{header=").concat(skillname, "}} {{subheader=").concat(skillrank, "}} "); ///////////////////////////////////////////////////////////

    var wp_modifiers = check_for_wp_modifiers(values);
    var _zero_will_power = wp_modifiers.zero_will_power;
    var _low_will_power = wp_modifiers.low_will_power;
    var rating = parseInt(values[parameters[names['rank']]]) || 0;
    var rollValue = "".concat(rollString, " {{rating=[[").concat(skillrank, "]]}}  {{zero_will_power=").concat(_zero_will_power, "}} {{low_will_power=").concat(_low_will_power, "}}}  {{modifier=[[").concat(queryModifier, "]]}} {{isCritical=[[0]]}} {{isSuccess=[[0]]}}");

    if (_zero_will_power != '[[1]]') {
      rollValue = "".concat(rollValue);
    }

    console.log(rollValue);
    rollSkillAndStats(rollValue, skillname, skillfail, 1);
  });
};

var clicked_repeating_bonds = function clicked_repeating_bonds(parameters, names) {
  getAttrs(parameters, function (values) {
    var bondname = values[names['name']];
    var bondscore = parseInt(values[names['score']]) || 0;
    var local_wp_points = parseInt(values[names['local_wp_points']]) || 0;
    var local_san_points = parseInt(values[names['local_san_points']]) || 0;
    var charid = values['character_id'];
    console.log("bondname: ".concat(bondname, " name: ").concat(names['name']));
    console.log("bondscore: ".concat(bondscore, " score: ").concat(names['score']));
    console.log("local_wp_points: ".concat(local_wp_points, " wp_points: ").concat(parameters["willpower_points"]));
    console.log("local_san_points: ".concat(local_san_points, " san_points: ").concat(parameters["sanity_points"]));
    console.info('values', values);
    var rollString = "".concat(prefix_bond_roll, " {{header=").concat(bondname, "}} {{subheader=").concat(bondscore, "}} "); ///////////////////////////////////////////////////////////

    var rollValue = "".concat(rollString, " {{zerowp=[[0]]}} {{score=[[").concat(bondscore, "]]}} {{local_wp=[[").concat(local_wp_points, "]]}} {{local_sanity=[[").concat(local_san_points, "}]]}} {{repress= [^{repress}](~").concat(charid, "|sanity_points)}}");
    rollValue = "".concat(rollValue, " {{projection=1}} {{repression=1}}");
    console.info('rollValue', rollValue);
    console.log(rollValue);
    rollBonds(rollValue, values, names, parameters);
  });
}; // Important functions


var _allrolls = arrays['_derived_rolls'].concat(arrays["_stats"], arrays["_skills"], ['unnatural']);

_allrolls.forEach(function (roll) {
  var _roll = roll === 'sanity_points' ? 'sanity' : roll;

  var queryModifier = _queryModifier;
  on("clicked:".concat(roll, "-action"), function (eventInfo) {
    console.log(eventInfo);
    var _header = "";

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
});

on('clicked:repeating_weapons:weapon-action', function (eventInfo) {
  console.log(eventInfo);
  var id = eventInfo.sourceAttribute.split('_')[2];
  var weaponRollValue = "@{gm_toggle} &{template:fancy-attack} {{dice=[[1d100]]}}";
  var weaponsAttrs = arrays["_weapon"];
  var _header = "";
  var _rank = "";
  var _input_names = {};

  var _parameters = weaponAttrs.map(function (el) {
    return "repeating_weapons_".concat(id, "_").concat(el);
  }); // Common for all rolls, modifiers


  _parameters.push("willpower_points");

  _parameters.push("low_will_power");

  _parameters.push("zero_will_power");

  clicked_repeating_weapons(_parameters);
});
Object.entries(_repeating_sections).forEach(function (_ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      element = _ref6[0],
      section = _ref6[1];

  on("clicked:repeating_".concat(section, ":").concat(element, "-action"), function (eventInfo) {
    console.log(eventInfo);
    var id = eventInfo.sourceAttribute.split('_')[2];
    var queryModifier = _queryModifier;
    var _header = "";
    var _rank = "";
    var _input_names = {};
    var _parameters = ["repeating_".concat(section, "_").concat(id, "_name")]; // Common for all rolls, modifiers

    _parameters.push("willpower_points");

    _parameters.push("low_will_power");

    _parameters.push("zero_will_power");

    _input_names["name"] = "repeating_".concat(section, "_").concat(id, "_name"); //skill dependent parameters

    if (section === 'skills') {
      _input_names["rank"] = "repeating_".concat(section, "_").concat(id, "_rank");
      _input_names["fail"] = "repeating_".concat(section, "_").concat(id, "_fail");

      _parameters.push("repeating_".concat(section, "_").concat(id, "_rank"));

      _parameters.push("repeating_".concat(section, "_").concat(id, "_fail"));

      clicked_repeating_skills(_parameters, _input_names, queryModifier); //bond dependent parameters
    } else if (section === 'bonds') {
      _parameters.push("repeating_".concat(section, "_").concat(id, "_score"));

      _parameters.push("repeating_".concat(section, "_").concat(id, "_wp_points"));

      _parameters.push("repeating_".concat(section, "_").concat(id, "_san_points")); //special training dependent parameters

    } else if (section === 'special') {
      _parameters.push("repeating_".concat(section, "_").concat(id, "_skill_or_stat_used"));
    } else {
      console.error("Section ".concat(section, " not found"));
    }

    console.log("parameters: ".concat(_parameters)); //getAttrs(_parameters, (values) => {
    //	Object.entries(values).forEach(([key,value]) => {
    //		console.log(`key: ${key} value: ${value}`);
    //	});
    //});
  });
}); //levelup character

on("clicked:levelup", function () {
  var update = {};
  var copyarray = arrays['_skills']; // copy of the array containing all skills ranks

  var len = copyarray.length; // length of the original copyarray

  var getarray = []; // used only to update the values

  var summary = {}; // information in the log for the users

  var var_rnd = 0; // random variable of 1d4

  var block_to_insert;
  var container_block;
  var newrowid;
  var newrowattrs = {};
  var oldval = 0;
  var newval = 0;
  var name;
  var addskill = [];
  getSectionIDs('skills', function (idarray) {
    addskills = idarray.map(function (id) {
      return "repeating_skills_".concat(id);
    });
    console.log(addskills); //log of debugging to be sure

    copyarray = copyarray.concat(addskills); // concatenate skill array with repeating skill array

    console.dir(copyarray);
    getSectionIDs("summary", function (idarray) {
      for (var i = 0; i < idarray.length; i++) {
        removeRepeatingRow("repeating_summary_" + idarray[i]);
      }
    });
    copyarray.forEach(function (sk, idx) {
      //console.log(idx);
      if (idx < len) {
        // if the idx<len it means I an in the skill array part
        getAttrs(["".concat(sk), "".concat(sk, "_name"), "".concat(sk, "_fail")], function (val) {
          getarray.push("".concat(sk)); //console.log(val[`${sk}_fail`]);
          //    console.log(`${sk}`);

          if (val["".concat(sk, "_fail")] == 'on') {
            //if the checkbox is checked
            var_rnd = Math.ceil(Math.random() * 4); // generate a random number for each checked value (less number generated)
            //console.log(`${idx}`);

            oldval = parseInt(val["".concat(sk)]) || 0;
            newval = oldval + var_rnd;
            name = val["".concat(sk, "_name")];
            summary["".concat(sk)] = var_rnd; // how much the skill has changed 0-3

            update["".concat(sk)] = newval; // new value of the skill

            update["".concat(sk, "_fail")] = 'off'; // uncheck checkbox
            //block_to_insert = document.createElement( 'div' );
            //block_to_insert.innerHTML = 'This demo DIV block was inserted into the page using JavaScript.' ;
            //container_block = document.getElementById( 'summary' );
            //container_block.appendChild( block_to_insert );

            newrowid = generateRowID();
            newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
            newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
            newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
          }
        });
      } else {
        // if the idx>=len it means I an in the  repeating skill array part
        getAttrs(["".concat(sk, "_name"), "".concat(sk, "_rank"), "".concat(sk, "_fail")], function (val) {
          getarray.push("".concat(sk, "_rank")); //console.log(val[`${sk}_fail`]);
          //    console.log(`${sk}`);

          if (val["".concat(sk, "_fail")] == 'on') {
            var_rnd = Math.ceil(Math.random() * 4); // generate a random number for each checked value (less number generated)
            //console.log(`${idx}`);

            summary["".concat(idx - len, "_rank")] = var_rnd; // since the repeating skill don't have a name, they are identified by number 0-N
            //

            oldval = parseInt(val["".concat(sk, "_rank")]) || 0;
            newval = oldval + var_rnd;
            name = val["".concat(sk, "_name")]; //

            update["".concat(sk, "_rank")] = (parseInt(val["".concat(sk, "_rank")]) || 0) + var_rnd;
            update["".concat(sk, "_fail")] = 'off';
            newrowid = generateRowID();
            newrowattrs['repeating_summary_' + newrowid + '_skillname'] = name;
            newrowattrs['repeating_summary_' + newrowid + '_oldval'] = oldval;
            newrowattrs['repeating_summary_' + newrowid + '_newval'] = newval;
          }
        });
      }
    }); //console.log(getarray);

    console.log(newrowattrs); // summary in console for the user
    //setAttrs(newrowattrs);

    console.log(summary); // summary in console for the user

    getAttrs(getarray, function () {
      // update fields
      setAttributes(update, false);
      setAttributes(newrowattrs, false);
    }); //console.dir(update);
  });
});