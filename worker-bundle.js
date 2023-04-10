(function () {
              'use strict';

              const baseStats = ["kkr", "ath", "ges", "sin", "wis", "wil"];

              const bonusStats = ["bonus_init", "bonus_hp", "bonus_coups", "bonus_ideas"];

              const skills = ["acrobatics", "perception", "identify", "first_aid", "sleight_of_hands",
                            "mind", "craft", "stealth", "people", "speech", "flex", "reflex", "ride",
                            "imperviousness", "knowledge", "witchcraft"];

              const weapons = ["weapon_fist_skill", "weapon_dagger_skill", "weapon_fencing_skill",
                             "weapon_swords_skill", "weapon_saber_skill", "weapon_saber_mounted_skill",
                             "weapon_bludgeoning_skill", "weapon_polearms_skill", "weapon_polearms_vs_m_skill",
                             "weapon_lance_skill", "weapon_lance_mounted_skill", "weapon_sling_skill",
                             "weapon_pistol_skill", "weapon_crossbow_skill", "weapon_musket_skill",
                             "weapon_dodge_skill", "weapon_shield_skill"];

              const resources = ["ambition", "blessings", "corruption", "rage"];

              var migrate = (migrations, attributes) => {
                getAttrs(attributes, (values) => {
                  console.log("migrating character sheet...");

                  if(values.sheet_version === undefined) {
                    values.sheet_version = "v0.0.0";
                  }

                  let lastIndex = migrations.findIndex((migration) => migration.key === values.sheet_version);
                  let migrationsToPerform = migrations.slice(lastIndex + 1);

                  migrationsToPerform.forEach((migration) => {
                    console.log("performing migration to version " + migration.key);
                    console.log(migration);
                    migration.method(values);
                  });

                  setAttrs({
                    "sheet_version": migrationsToPerform.pop().key
                  });
                });
              };

              let attributes = baseStats.concat(skills, weapons, resources, "sheet_version");

              // migration steps
              var migrate100 = (values) => {
                console.log(values);
                setAttrs({
                  "para_damage": 0,
                  "malus_damage": 0,
                  "ext_damage": 0,
                  "int_damage": 0
                });
              };

              var migrate103 = (values) => {
                setAttrs({
                  "hp_max": values.kkr + values.wil + values.imperviousness + values.bonus_hp + 7,
                  "init": values.sin + values.ges + values.reflex,
                  "blessings_max": 5
                });
              };

              // migration binding
              let migrations = [{
                "key": "v0.0.0",
                "method": (values ) => console.log(values)
              }, {
                "key": "v1.0.0",
                "method": migrate100,

              }, {
                "key": "v1.0.3",
                "method": migrate103
              }];

              var runMigrations = () => {
                migrate(migrations, attributes);
              };

              var addResource = (resource, max) => {
                return Math.min(resource + 1, max);
              };

              var subResource = (resource, min) => {
                return Math.max(resource - 1, min);
              };

              var addCorruption = () => {
                getAttrs(["blessings", "corruption"], values => {
                  var corruption = addResource(values.corruption, 5);
                  var blessings = values.blessings;
                  if(values.blessings >= 5 - values.corruption) {
                    blessings = subResource(values.blessings, 0);
                  }
                  setAttrs({
                    "blessings": blessings,
                    "corruption": corruption
                  });
                });
              };

              var addBlessings = () => {
                getAttrs(["blessings", "corruption", "rage"], values => {
                  var rage = values.rage;
                  var blessings = values.blessings;
                  if(values.rage > 0) {
                    rage = subResource(values.rage, 0);
                  } else {
                    blessings = addResource(values.blessings, 5 - values.corruption);
                  }
                  setAttrs({
                    "blessings": blessings,
                    "rage": rage
                  });
                });
              };

              var addRage = () => {
                getAttrs(["blessings", "rage"], values => {
                  var blessings = values.blessings;
                  var rage = values.rage;
                  if(values.blessings > 0) {
                    blessings = subResource(values.blessings, 0);
                  } else {
                    rage = addResource(values.rage, 5);
                  }
                  setAttrs({
                    "blessings": blessings,
                    "rage": rage
                  });
                });
              };

              var addAmbition = () => {
                getAttrs(["ambition"], values => {
                  setAttrs({
                    "ambition": addResource(values.ambition, 5)
                  });
                });
              };

              var subAmbition = () => {
                getAttrs(["ambition"], values => {
                  setAttrs({
                    "ambition": subResource(values.ambition, 0)
                  });
                });
              };

              var subBlessings = () => {
                getAttrs(["blessings"], values => {
                  setAttrs({
                    "blessings": subResource(values.blessings, 0)
                  });
                });
              };

              var subCorruption = () => {
                getAttrs(["corruption"], values => {
                  setAttrs({
                    "corruption": subResource(values.corruption, 0)
                  });
                });
              };

              var subRage = () => {
                getAttrs(["rage"], values => {
                  setAttrs({
                    "rage": subResource(values.rage, 0)
                  });
                });
              };

              var sumArgs = (...args) => {
                return args.reduce((a, b) => {
                    let aInt = parseInt(a) || 0;
                    let bInt = parseInt(b) || 0;
                    return aInt + bInt;
                });
              };

              var updateAp = () => {
                getAttrs(["armor", "para_damage"], (values) => {
                  let armor = parseInt(values.armor) * (-1);
                  let paraDamage = parseInt(values.para_damage) * (-1);
                  setAttrs({
                    ap_max: Math.max(sumArgs(6, armor, paraDamage), 0)
                  });
                });
              };

              var updateBaseStats = () => {
                let updateStats = baseStats;
                updateStats.push("imperviousness");
                updateStats.push("reflex");
                updateStats.push("bonus_hp");
                updateStats.push("bonus_init");
                updateStats.push("bonus_coups");
                updateStats.push("bonus_ideas");

                getAttrs(updateStats, (values) => {
                  setAttrs({
                    coups_max: sumArgs(values.ath, values.bonus_coups),
                    ideas_max: sumArgs(values.wis, values.bonus_ideas),
                    hp_max: sumArgs(values.kkr, values.wil, values.imperviousness, values.bonus_hp, 7),
                    init: sumArgs(values.sin, values.ges, values.reflex, values.bonus_init),
                  });
                });
              };

              var updateAttacks = () => {
                getAttrs(baseStats.concat(weapons), (values) => {
                  setAttrs({
                    weapon_fist_sum: sumArgs(values.weapon_fist_skill, values.ath),
                    weapon_dagger_sum: sumArgs(values.weapon_dagger_skill, values.ges),
                    weapon_fencing_sum: sumArgs(values.weapon_fencing_skill, values.ath),
                    weapon_swords_sum: sumArgs(values.weapon_swords_skill, values.kkr),
                    weapon_saber_sum: sumArgs(values.weapon_saber_skill, values.kkr),
                    weapon_saber_mounted_sum: sumArgs(values.weapon_saber_mounted_skill, values.kkr),
                    weapon_bludgeoning_sum: sumArgs(values.weapon_bludgeoning_skill, values.kkr),
                    weapon_polearms_sum: sumArgs(values.weapon_polearms_skill, values.kkr),
                    weapon_polearms_vs_m_sum: sumArgs(values.weapon_polearms_vs_m_skill, values.kkr),
                    weapon_lance_sum: sumArgs(values.weapon_lance_skill, values.kkr),
                    weapon_lance_mounted_sum: sumArgs(values.weapon_lance_mounted_skill, values.kkr),
                    weapon_sling_sum: sumArgs(values.weapon_sling_skill, values.ges),
                    weapon_pistol_sum: sumArgs(values.weapon_pistol_skill, values.sin),
                    weapon_crossbow_sum: sumArgs(values.weapon_crossbow_skill, values.sin),
                    weapon_musket_sum: sumArgs(values.weapon_musket_skill, values.sin),
                    weapon_dodge_sum: sumArgs(values.weapon_dodge_skill, values.ath),
                    weapon_shield_sum: sumArgs(values.weapon_shield_skill, values.kkr),
                  });
                });
              };

              var updateSkills = () => {
                getAttrs(baseStats.concat(skills), (values) => {
                  setAttrs({
                    acrobatics_sum: sumArgs(values.acrobatics, values.ath),
                    perception_sum: sumArgs(values.perception,values.sin),
                    identify_sum: sumArgs(values.identify, values.sin),
                    first_aid_sum: sumArgs(values.first_aid, values.wis),
                    sleight_of_hands_sum: sumArgs(values.sleight_of_hands, values.ges),
                    mind_sum: sumArgs(values.mind, values.wil),
                    craft_sum: sumArgs(values.craft, values.ges),
                    stealth_sum: sumArgs(values.stealth, values.ath),
                    people_sum: sumArgs(values.people, values.wis),
                    speech_sum: sumArgs(values.speech, values.wil),
                    flex_sum: sumArgs(values.flex, values.kkr),
                    reflex_sum: sumArgs(values.reflex, values.sin),
                    ride_sum: sumArgs(values.ride, values.ath),
                    imperviousness_sum: sumArgs(values.imperviousness, values.kkr),
                    knowledge_sum: sumArgs(values.knowledge, values.wis),
                    witchcraft_sum: sumArgs(values.witchcraft, values.wis)
                  });
                });
              };

              on("sheet:opened", runMigrations);

              var baseStatsListener = baseStats.concat(bonusStats).map(stat => "change:" + stat).join(" ");
              on(baseStatsListener, () => {
                updateBaseStats();
                updateSkills();
                updateAttacks();
              });

              on(skills.map(skill => "change:" + skill).join(" "), () => {
                updateSkills();
                updateBaseStats();
              });

              on(weapons.map(weapon => "change:" + weapon).join(" "), updateAttacks);
              on("change:armor change:para_damage", updateAp);
              on("change:bonus_hp change:bonus_init", updateBaseStats);

              // click handlers for resources
              on("clicked:ambition_add", addAmbition);
              on("clicked:ambition_sub", subAmbition);
              on("clicked:blessings_add", addBlessings);
              on("clicked:blessings_sub", subBlessings);
              on("clicked:corruption_add", addCorruption);
              on("clicked:corruption_sub", subCorruption);
              on("clicked:rage_add", addRage);
              on("clicked:rage_sub", subRage);

}());
