"use strict";

var agent_info_to_get = ['character_id', 'hit_points', 'willpower_points', 'sanity_points', 'strength_score', 'constitution_score', 'dexterity_score', 'intelligence_score', 'power_score', 'charisma_score', 'violence_adapted', 'helplessness_adapted'];
on("change:repeating_agents:name", function (eventInfo) {
  var id = eventInfo.sourceAttribute.split("_")[2];
  var repsecid = "repeating_agents_".concat(id);
  getAttrs(["".concat(repsecid, "_name")], function (values) {
    var update = {};
    var character_identification = values["".concat(repsecid, "_name")] !== undefined ? values["".concat(repsecid, "_name")] : "";
    update_repeating_agents(repsecid, character_identification);
  });
});

var update_repeating_agents = function update_repeating_agents(repsecid, character_identification) {
  var string = "&{template:pass-values}";
  agent_info_to_get.forEach(function (field) {
    string += "{{".concat(field, "=[[@{").concat(character_identification, "|").concat(field, "}]]}} ");
  });
  string += "{{breaking_point=[[@{".concat(character_identification, "|breaking_point}]]}}");
  string += "{{breaking_point_max=[[@{".concat(character_identification, "|breaking_point_max}]]}}");

  if (string === "") {
    return;
  }

  startRoll(string, function (results) {
    agent_info_to_get.forEach(function (field) {
      update["".concat(repsecid, "_").concat(field)] = results.results[field].result;
    });
    var bp = parseInt(results.results.breaking_point.result) || 0;
    var bpmax = parseInt(results.results.breaking_point_max.result) || 0;
    update["".concat(repsecid, "_has_breaking_points")] = bp < bpmax;
    setAttrs(update, {
      silent: true
    }, function () {
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
          repsecids.push("repeating_agents_".concat(id, "_character_id"));
        });
        getAttrs(repsecids, function (values) {
          repsecids.forEach(function (repsecid) {
            var character_identification = values["".concat(repsecid, "_character_id")];

            if (character_identification !== "") {
              update_repeating_agents(repsecid, character_identification);
            }
          });
        });
      });
    }

    ;
  });
});