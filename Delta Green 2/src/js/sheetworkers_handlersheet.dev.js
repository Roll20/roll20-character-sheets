"use strict";

var agent_info_to_get = ['character_name', 'character_id', 'hit_points', 'willpower_points', 'sanity_points', 'strength_score', 'constitution_score', 'dexterity_score', 'intelligence_score', 'power_score', 'charisma_score', 'violence_adapted', 'helplessness_adapted', 'reached_breaking_point'];
on("change:repeating_agents:name", function (eventInfo) {
  var id = eventInfo.sourceAttribute.split("_")[2];
  var repsecid = "repeating_agents_".concat(id);
  getAttrs(["".concat(repsecid, "_name")], function (values) {
    var update = {};
    var character_identification = values["".concat(repsecid, "_name")] !== undefined ? values["".concat(repsecid, "_name")] : "";
    update_repeating_agents(update, repsecid, character_identification);
  });
});
var not_numeric_pass = ['character_name', 'character_id'];
var adaptation_fields = ['violence_adapted', 'helplessness_adapted'];

var update_repeating_agents = function update_repeating_agents(update, repsecid, character_identification) {
  var string = "&{template:pass-values}"; //var string = `!`;

  var rxGrab = /^0\[(.*)\]\s*$/;
  agent_info_to_get.forEach(function (field) {
    if (not_numeric_pass.includes(field)) {
      string += "{{".concat(field, "=[[0[@{").concat(character_identification, "|").concat(field, "}] ]]}}");
    } else {
      string += "{{".concat(field, "=[[@{").concat(character_identification, "|").concat(field, "}]]}} ");
    }
  });
  string += "{{breaking_point=[[@{".concat(character_identification, "|breaking_point}]]}}");
  string += "{{breaking_point_max=[[@{".concat(character_identification, "|breaking_point_max}]]}}");

  if (string === "") {
    return;
  }

  startRoll(string, function (results) {
    agent_info_to_get.forEach(function (field) {
      if (not_numeric_pass.includes(field)) {
        update["".concat(repsecid, "_").concat(field)] = results.results[field].expression.match(rxGrab)[1];
      } else if (field === "reached_breaking_point") {
        update["".concat(repsecid, "_").concat(field)] = results.results[field].result == 1 ? "yes" : "no";
      } else if (adaptation_fields.includes(field)) {
        update["".concat(repsecid, "_").concat(field)] = results.results[field].result == 1 ? "adapted" : "not adapted";
      } else {
        update["".concat(repsecid, "_").concat(field)] = results.results[field].result;
      }
    });
    setAttrs(update, {
      silent: true
    }, function () {
      console.info('update', update);
      console.log("Updated ".concat(repsecid, " with ").concat(character_identification));
    });
    finishRoll(results.rollId);
  });
};

on("sheet:opened clicked:update_agents", function () {
  getAttrs(["sheet_type"], function (values) {
    if (values.sheet_type === "handler") {
      getSectionIDs("agents", function (ids) {
        var repsecids = [];
        ids.forEach(function (id) {
          repsecids.push("repeating_agents_".concat(id));
        }); // map repsecids to make it into an array containing for each repsecid <repsecid>_character_id and <repsecid>_name

        getAttrs(repsecids.flatMap(function (repsecid) {
          return ["".concat(repsecid, "_name"), "".concat(repsecid, "_character_id")];
        }), function (values) {
          repsecids.forEach(function (repsecid) {
            var update = {};
            var character_identification = get_character_identification(values, repsecid);

            if (character_identification !== "") {
              update_repeating_agents(update, repsecid, character_identification);
            }
          });
        });
      });
    }

    ;
  });
});

var get_character_identification = function get_character_identification(values, repsecid) {
  // FUTURE: Cannot use character_id as a key for an attribute only for abilities in roll20
  var char_id = ""; // values[`${repsecid}_character_id`];

  var char_name = values["".concat(repsecid, "_name")];
  return char_id !== "" ? char_id : char_name;
};