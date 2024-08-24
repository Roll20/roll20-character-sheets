"use strict";

on('change:repeating_skills remove:repeating_skills', function () {
  update_additionalskills();
});
on('change:repeating_weapons:ammo_max remove:repeating_weapons', function (values) {
  var ammo_max = Math.max(0, parseInt(values.newValue) || 0);
  var update = {};
  update["repeating_weapons_ammo_max"] = ammo_max;
  update["repeating_weapons_ammo"] = ammo_max;
  update["repeating_weapons_hasammo"] = ammo_max > 0 ? '1' : '0';
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('Ammo updated', update);
  });
});
on('change:repeating_weapons:ammo', function (values) {
  var ammo = Math.max(0, parseInt(values.newValue) || 0);
  var update = {};
  update["repeating_weapons_ammo"] = ammo;
  setAttrs(update, {
    silent: true
  }, function () {
    console.log('Ammo updated', update);
  });
}); //= force the stats to be positive and the skills to be between 0 and 99

on("sheet:opened", function (eventInfo) {
  // === Versioning
  getAttrs(['version'], function (values) {
    versioning(parseFloat(values.version) || 1);
  });
  initializeRolls();
});