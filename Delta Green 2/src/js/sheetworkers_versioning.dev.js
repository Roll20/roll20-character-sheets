"use strict";

var versioning = function versioning(version) {
  console.log("%c Versioning, ".concat(version), 'color: green; font-weight:bold');

  if (version < 1.05) {
    version_0_105();
  }

  if (version < 1.5) {
    version_105_150();
  }

  if (version < 1.7) {
    version_150_170();
  }

  if (version < 2.0) {
    version_170_200();
  }

  if (version < 2.01) {
    version_200_201();
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
  var update1 = {};
  console.log('verion:', codeversion);
  update1['version'] = codeversion; // UPDATE NAMES FOR SPECIAL TRAINING AND WEAPONS AND TRIGGER TEST

  var _sectionDetails = [{
    section: 'repeating_special',
    fields: ['name', 'special_training', 'skill_or_stat_used', 'skill_span']
  }, {
    section: 'repeating_weapons',
    fields: ['name', 'weapons', 'skill_percent', 'skill_span', 'ammo', 'hasammo', 'ammo_total', 'lethality_percent']
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
          repfields.push("repeating_special_".concat(id, "_").concat(field));
        });
      });
      getAttrs(repfields, function (values) {
        console.info('fullarray', values);
        var update = {};
        ids.forEach(function (id) {
          var repsecid = "repeating_".concat(section, "_").concat(id, "_");

          if (values.hasOwnProperty("".concat(repsecid, "lethality_percent"))) {
            if (values["".concat(repsecid, "lethality_percent")] === '') {
              var number = setMinMax(values["".concat(repsecid, "lethality_percent")]);
              update["".concat(repsecid, "lethality_percent")] = number;
              update["".concat(repsecid, "lethality_percent")] = '';
              console.log("%c update name ".concat(repsecid, "lethality_percent to empty"), 'color: green; font-weight:bold');
            }
          }

          if (values.hasOwnProperty("".concat(repsecid, "special_training"))) {
            if (values["".concat(repsecid, "special_training")] !== '') {
              update["".concat(repsecid, "name")] = values["".concat(repsecid, "special_training")];
              update["".concat(repsecid, "special_training")] = '';
              console.log("%c update name ".concat(repsecid, "special_training to ").concat(repsecid, "name"), 'color: green; font-weight:bold');
            }
          }

          ;

          if (values.hasOwnProperty("".concat(repsecid, "weapons"))) {
            if (values["".concat(repsecid, "weapons")] !== '') {
              update["".concat(repsecid, "name")] = values["".concat(repsecid, "weapons")];
              update["".concat(repsecid, "weapons")] = '';
              console.log("%c update name ".concat(repsecid, "weapons to ").concat(repsecid, "name"), 'color: green; font-weight:bold');
            }
          }

          ;

          if (values.hasOwnProperty("".concat(repsecid, "skill_or_stat_used"))) {
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

          if (values.hasOwnProperty("".concat(repsecid, "ammo"))) {
            var value_ammo = Math.max(parseInt(values["".concat(repsecid, "ammo")], 10) || 0, 0);

            if (value_ammo > 0) {
              update["".concat(repsecid, "ammo_total")] = value_ammo;
              update["".concat(repsecid, "hasammo")] = 1;
              update["".concat(repsecid, "ammo")] = value_ammo;
            } else {
              update["".concat(repsecid, "hasammo")] = 0;
              update["".concat(repsecid, "ammo_total")] = '';
              update["".concat(repsecid, "ammo")] = '';
            }

            console.log("%c update ammo for ".concat(repsecid, ": ammo_total=").concat(update["".concat(repsecid, "ammo_total")], " hasammo=").concat(update["".concat(repsecid, "hasammo")]), 'color: green; font-weight:bold');
          }
        });
        console.log("%c update", 'color: green; font-weight:bold');
        console.info('versioning', update1);
        setAttrs(update1, //Update attributes
        {
          silent: true
        }, // will not trigger sheet workers
        versioning(codeversion)); // call versioning again
      });
    });
  });
};