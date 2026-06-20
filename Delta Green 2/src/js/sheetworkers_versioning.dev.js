"use strict";

var versioning = function versioning(version) {
  console.log("%c Versioning, ".concat(version), 'color: green; font-weight:bold');

  if (version < 1.05) {
    version_0_105();
  } else if (version < 1.5) {
    version_105_150();
  } else if (version < 1.7) {
    version_150_170();
  } else if (version < 2.0) {
    version_170_200();
  } else if (version < 2.01) {
    version_200_201();
  } else if (version < 2.02) {
    version_201_202();
  } else if (version < 2.03) {
    version_202_203();
  } else if (version < 2.04) {
    version_203_204();
  } else if (version < 2.05) {
    version_204_205();
  } else if (version < 2.06) {
    version_205_206();
  }
}; // UPDATE TO VERSION 1.05


var version_0_105 = function version_0_105() {
  getAttrs(['version'], function (v) {
    var codeversion = 1.05;
    var update = {
      version: codeversion,
      initial_san: 0,
      initial_hp: 0,
      initial_str: 0,
      initial_con: 0
    };
    setAttrs(update, //Update attributes
    {
      silent: true
    }, // will not trigger sheet workers
    versioning(codeversion)); // call versioning again
  });
}; // UPDATE TO VERSION 1.5


var version_105_150 = function version_105_150() {
  var codeversion = 1.5;
  var update = {};
  getSectionIDs("weapons", function (idarray) {
    console.log("%c idarray", 'color: green; font-weight:bold');
    console.info(idarray);
    var fieldnames = ['sheet_type', 'version'];
    console.log("%c did I found weapons?", 'color: green; font-weight:bold');
    idarray.forEach(function (id) {
      console.log("%c ".concat(id), 'color: green; font-weight:bold');
      fieldnames.push("repeating_weapons_".concat(id, "_damage"), "repeating_weapons_".concat(id, "_lethality_percent"), "repeating_weapons_".concat(id, "_attack"));
    });
    getAttrs(fieldnames, function (v) {
      console.log("%c v", 'color: green; font-weight:bold');
      console.info(v);
      update['version'] = codeversion;
      idarray.forEach(function (id) {
        console.log("%c ".concat(id), 'color: green; font-weight:bold');

        if (v["repeating_weapons_".concat(id, "_damage")] === "") {
          update["repeating_weapons_" + id + "_hasDamage"] = "0";
        } else {
          update["repeating_weapons_" + id + "_hasDamage"] = "1";
        }

        if (v["repeating_weapons_".concat(id, "_lethality_percent")] > 0) {
          update["repeating_weapons_" + id + "_hasLethality"] = "1";
        } else {
          update["repeating_weapons_" + id + "_hasLethality"] = "0";
        }

        if (v['sheet_type'] === 'npc') {
          update["repeating_weapons_" + id + "_weapons"] = v["repeating_weapons_".concat(id, "_attack")];
        }
      });
      console.log("%c update", 'color: green; font-weight:bold');
      setAttrs(update, //Update attributes
      {
        silent: true
      }, // will not trigger sheet workers
      versioning(codeversion)); // call versioning again
    });
  });
}; // UPDATE TO VERSION 1.7


var version_150_170 = function version_150_170() {
  var codeversion = 1.7;
  var update = {};
  update['version'] = codeversion;
  update['luck'] = 50;
  update['luck_max'] = 50;
  console.log("%c update", 'color: green; font-weight:bold');
  setAttrs(update, //Update attributes
  {
    silent: true
  }, // will not trigger sheet workers
  versioning(codeversion)); // call versioning again
}; // UPDATE TO VERSION 2.0


var version_170_200 = function version_170_200() {
  var codeversion = 2.0;
  var update = {};
  update['version'] = codeversion;
  getAttrs(["motivations", "character_name", "name", "sanity_points", "violence_3", "helplessness_3", "violence_2", "helplessness_2", "sanity_points_old", "sanity_points", "breaking_point_old", "breaking_point_old"], function (v) {
    var motivations = v["motivations"];

    if (v["name"] !== "") {
      _name = v["name"];
    } else {
      _name = v["character_name"];
    }

    update["character_name"] = _name;
    update["old_motivations"] = motivations.replace(/<br>/g, "\n");

    var _violence_adapted = v["violence_2"] === 'on';

    var _helplessness_adapted = v["helplessness_2"] === 'on';

    if (v["violence_2"] === 'on') {
      update["violence_1"] = 'on';
    }

    if (v["helplessness_2"] === 'on') {
      update["helplessness_1"] = 'on';
    }

    if (_violence_adapted) {
      update["violence_adapted"] = 1;
      update["violence_2"] = 'on';
      update["violence_1"] = 'on';
    }

    if (_helplessness_adapted) {
      update["helplessness_adapted"] = 1;
      update["helplessness_2"] = 'on';
      update["helplessness_1"] = 'on';
    }

    update['sanity_points_old'] = v['sanity_points'];
    update['breaking_point_old'] = v['breaking_point'];
    console.log("%c update", 'color: green; font-weight:bold');
    setAttrs(update, //Update attributes
    {
      silent: true
    }, // will not trigger sheet workers
    versioning(codeversion)); // call versioning again
  });
}; // UPDATE TO VERSION 2.0


var version_200_201 = function version_200_201() {
  var codeversion = 2.01;
  var update = {};
  console.log('version:', codeversion);
  update['version'] = codeversion; // UPDATE NAMES FOR SPECIAL TRAINING AND WEAPONS AND TRIGGER TEST

  var _sectionDetails = [{
    section: 'special',
    fields: ['name', 'special_training', 'skill_or_stat_used', 'skill_span']
  }, {
    section: 'weapons',
    fields: ['name', 'weapons', 'rank', 'skill_percent', 'skill_span', 'ammo', 'hasammo', 'ammo_total', 'lethality_percent']
  }, {
    section: 'bonds',
    fields: ['flag', 'setScore', 'score', 'score_old']
  }];

  _sectionDetails.forEach(function (_group) {
    var section = _group.section;
    var fields = _group.fields;
    getSectionIDs(section, function (ids) {
      console.log('in getSectionIDs section', section);
      console.log('in getSectionIDs ids', ids);
      var repfields = [];
      ids.forEach(function (id) {
        fields.forEach(function (field) {
          repfields.push("repeating_".concat(section, "_").concat(id, "_").concat(field));
        });
      });
      getAttrs(repfields, function (values) {
        console.info('fullarray', values);
        ids.forEach(function (id) {
          var repsecid = "repeating_".concat(section, "_").concat(id, "_"); /// bond update

          if (section === 'bonds') {
            if (values.hasOwnProperty("".concat(repsecid, "flag"))) {
              update["".concat(repsecid, "setScore")] = 1;
              update["".concat(repsecid, "flag")] = '';
            }

            update["".concat(repsecid, "score_old")] = values["".concat(repsecid, "score")];
            update["".concat(repsecid, "test")] = 'editable';
          }

          if (section === 'weapons') {
            if (values["".concat(repsecid, "lethality_percent")] !== '') {
              var number = setMinMax(values["".concat(repsecid, "lethality_percent")]);
              update["".concat(repsecid, "lethality_percent")] = number;
              console.log("%c update name ".concat(repsecid, "lethality_percent to empty"), 'color: green; font-weight:bold');
            }
          }

          if (section === 'special') {
            if (values.hasOwnProperty("".concat(repsecid, "special_training"))) {
              update["".concat(repsecid, "name")] = values["".concat(repsecid, "special_training")];
              update["".concat(repsecid, "special_training")] = '';
              console.log("%c update name ".concat(repsecid, "special_training to ").concat(repsecid, "name"), 'color: green; font-weight:bold');
            }
          }

          ;

          if (section === 'weapons') {
            if (values.hasOwnProperty("".concat(repsecid, "weapons"))) {
              update["".concat(repsecid, "name")] = values["".concat(repsecid, "weapons")];
              update["".concat(repsecid, "weapons")] = '';
              update["".concat(repsecid, "test")] = 'editable';
            }

            var _number = setMinMax(values["".concat(repsecid, "skill_percent")]);

            update["".concat(repsecid, "skill_span")] = _number;
            update["".concat(repsecid, "skill_percent")] = _number;
            var value_ammo = Math.max(parseInt(values["".concat(repsecid, "ammo")], 10) || 0, 0);

            if (value_ammo > 0) {
              update["".concat(repsecid, "ammo_total")] = value_ammo;
              update["".concat(repsecid, "hasammo")] = 'active';
              update["".concat(repsecid, "ammo")] = value_ammo;
            } else {
              update["".concat(repsecid, "hasammo")] = 0;
              update["".concat(repsecid, "ammo_total")] = '';
              update["".concat(repsecid, "ammo")] = '';
            }

            console.log("%c update name ".concat(repsecid, "weapons to ").concat(repsecid, "name"), 'color: green; font-weight:bold');
          }

          ;

          if (section === 'special') {
            var value_stat = setMinMax(values["".concat(repsecid, "skill_or_stat_used")]);
            update["".concat(repsecid, "skill_span")] = value_stat;
            update["".concat(repsecid, "skill_or_stat_used")] = value_stat;
            console.log("%c update skill_span for ".concat(repsecid), 'color: green; font-weight:bold');
          }

          ;

          if (values.hasOwnProperty("".concat(repsecid, "skill_percent"))) {
            var value_skill = setMinMax(values["".concat(repsecid, "skill_percent")]);
            update["".concat(repsecid, "skill_span")] = value_skill;
            update["".concat(repsecid, "skill_percent")] = value_skill;
            console.log("%c update skill_span for ".concat(repsecid), 'color: green; font-weight:bold');
          }

          ;
        });
        console.log("%c update", 'color: green; font-weight:bold');
        console.info('versioning', update);
        setAttrs(update, //Update attributes
        {
          silent: true
        }, // will not trigger sheet workers
        versioning(codeversion)); // call versioning again
      });
    });
  });
};

var version_201_202 = function version_201_202() {
  var codeversion = 2.02;
  var update = {};
  console.log('verion:', codeversion);
  update['version'] = codeversion;
  getAttrs(["sheet_type"], function (values) {
    var names = [];
    var rank = [];

    if (values.sheet_type === 'npc') {
      update['sheet_type'] = 'npc';
      getSectionIDs("skills", function (ids) {
        ids.forEach(function (id) {
          names.push("repeating_skills_".concat(id, "_name"));
          rank.push("repeating_skills_".concat(id, "_rank"));
        });
      });
    }

    ; // make it into an object with keys = names and values = ran

    getAttrs(names.concat(rank), function (values) {
      var ids_to_remove = []; // for the ids that I copy in the named skills

      names.forEach(function (name, idx) {
        var skillname = values[name].toLowerCase().replace(/ /g, "_");
        var rankvalue = values[rank[idx]];
        var id_value = name.split('_')[2];

        if (arrays['_skills'].includes(skillname)) {
          update["".concat(skillname)] = rankvalue;
          update["".concat(skillname, "_visible")] = 'visible';
          ids_to_remove.push(id_value);
        }
      });
      console.info('update npc skills', update);
      setAttrs(update, {
        silent: true
      }, function () {
        console.log('updated skills');
        ids_to_remove.forEach(function (id) {
          removeRepeatingRow("repeating_skills_".concat(id));
        });
        console.log('removed repeating skills');
        versioning(codeversion);
      });
    });
  });
};

var version_202_203 = function version_202_203() {
  var codeversion = 2.03;
  var update = {};
  console.log('verion:', codeversion);
  update['version'] = codeversion;
  var old_named_skills = ['art', 'craft', 'pilot', 'military_science', 'science'];
  var old_adaptation = ['violence_1', 'violence_2', 'violence_3', 'helplessness_1', 'helplessness_2', 'helplessness_3'];
  var old_named_skills_names = old_named_skills.map(function (x) {
    return "".concat(x, "_name");
  });
  getAttrs(old_adaptation.concat(old_named_skills_names).concat(old_named_skills).concat(['willpower_points_max', 'charisma_score']), function (values) {
    if (values.hasOwnProperty('art_name')) {
      var art_value = setMinMax(values["art"]);
      var art_name = values["art_name"];
      update["art_1"] = art_value;
      update["art_1_name"] = art_name;
    }

    if (values.hasOwnProperty('craft_name')) {
      var craft_value = setMinMax(values["craft"]);
      var craft_name = values["craft_name"];
      update["craft_1"] = craft_value;
      update["craft_1_name"] = craft_name;
    } // complete for pilot, military_science, science


    if (values.hasOwnProperty('pilot')) {
      var pilot_value = setMinMax(values["pilot"]);
      var pilot_name = values["pilot_name"];
      update["pilot_1"] = pilot_value;
      update["pilot_1_name"] = pilot_name;
    }

    if (values.hasOwnProperty('military_science')) {
      var military_science_value = setMinMax(values["military_science"]);
      var military_science_name = values["military_science_name"];
      update["military_science_1"] = military_science_value;
      update["military_science_1_name"] = military_science_name;
    }

    if (values.hasOwnProperty('science')) {
      var science_value = setMinMax(values["science"]);
      var science_name = values["science_name"];
      update["science_1"] = science_value;
      update["science_1_name"] = science_name;
    }

    if (values.hasOwnProperty('violence_1')) {
      var violence_1 = values["violence_1"];
      var violence_2 = values["violence_2"];
      var violence_3 = values["violence_3"];
      var violence = -1;

      if (violence_1 == 1) {
        violence = 0;
      }

      if (violence_2 == 2) {
        violence = 1;
      }

      if (violence_3 == 3) {
        violence = 2;
      }

      update["violence"] = violence;

      if (violence == 2) {
        update["violence_adapted"] == 1;
      }
    }

    if (values.hasOwnProperty('helplessness_1')) {
      var helplessness_1 = values["helplessness_1"];
      var helplessness_2 = values["helplessness_2"];
      var helplessness_3 = values["helplessness_3"];
      var helplessness = -1;

      if (helplessness_1 == 1) {
        helplessness = 0;
      }

      if (helplessness_2 == 2) {
        helplessness = 1;
      }

      if (helplessness_3 == 3) {
        helplessness = 2;
      }

      update["helplessness"] = helplessness;

      if (helplessness == 2) {
        update["helplessness_adapted"] == 1;
      }
    }

    setAttrs(update, {
      silent: true
    }, function () {
      console.log('updated named skills and adaptations');
      console.info(update);
      versioning(codeversion);
    });
  });
};

var version_203_204 = function version_203_204() {
  var codeversion = 2.04;
  var update = {};
  console.log('verion:', codeversion);
  update['version'] = codeversion;
  getAttrs(['willpower_points_max', 'charisma_score'], function (values) {
    getSectionIDs('bonds', function (ids) {
      var repfields = [];
      ids.forEach(function (id) {
        repfields.push("repeating_bonds_".concat(id, "_score"));
      });
      getAttrs(repfields, function (bond_values) {
        var willpower_points_max = values['willpower_points_max'];
        var charisma_score = values['charisma_score'];
        repfields.forEach(function (field) {
          if ((parseInt(bond_values[field]) || 0) >= willpower_points_max) {
            update[field] = charisma_score;
            update["".concat(field, "_old")] = charisma_score;
          }
        });
        setAttrs(update, {
          silent: true
        }, function () {
          console.log('updated named skills and adaptations');
          console.info(update);
          versioning(codeversion);
        });
      });
    });
  });
};

var version_204_205 = function version_204_205() {
  var codeversion = 2.05;
  var update = {};
  console.log('verion:', codeversion);
  update['version'] = codeversion;
  getAttrs(['sheet_type', 'breaking_point', 'breaking_point_max'], function (values) {
    if (values["sheet_type"] !== 'handler') {
      current_bp = parseInt(values["breaking_point"]) || 0;
      max_bp = parseInt(values["breaking_point_max"]) || 0;
      update["reached_breaking_point"] = current_bp < max_bp ? 1 : 0;
    }

    setAttrs(update, {
      silent: true
    }, function () {
      console.log('updated reached breaking point');
      console.info(update);
      versioning(codeversion);
    });
  });
};

var version_205_206 = function version_205_206() {
  var codeversion = 2.06;
  var update = {};
  console.log('verion:', codeversion);
  update['version'] = codeversion;
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('now repeating section will update when you level up failed skills');
    console.info(update);
    versioning(codeversion);
  });
};