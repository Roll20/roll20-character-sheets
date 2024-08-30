"use strict";

on('change:repeating_skills remove:repeating_skills', function () {
  update_additionalskills();
});

var update_armor_piercing = function update_armor_piercing(value, update) {
  var armor_piercing_text = value;
  var armor_piercing_number = parseInt(armor_piercing_text) || 0;

  if (armor_piercing_text !== '') {
    update["repeating_weapons_armor_piercing"] = armor_piercing_number;
  }
};

on('change:repeating_weapons:armor_piercing', function () {
  getAttrs(['repeating_weapons_armor_piercing'], function (values) {
    var update = {};
    update_armor_piercing(values.repeating_weapons_armor_piercing, update);
    setAttrs(update, {
      silent: true
    }, function () {});
  });
});
on('change:repeating_weapons:ammo_total remove:repeating_weapons', function (values) {
  var ammo_total = Math.max(0, parseInt(values.newValue) || 0);
  var update = {};
  update["repeating_weapons_ammo_total"] = ammo_total;
  update["repeating_weapons_ammo"] = ammo_total;
  update["repeating_weapons_hasammo"] = ammo_total > 0 ? 'active' : '0';
  setAttrs(update, {
    silent: true
  }, function () {});
});
on('change:repeating_weapons:ammo', function (values) {
  var ammo = Math.max(0, parseInt(values.newValue) || 0);
  var update = {};
  update["repeating_weapons_ammo"] = ammo;
  setAttrs(update, {
    silent: true
  }, function () {});
}); //= force the stats to be positive and the skills to be between 0 and 99

on("sheet:opened", function () {
  // === Versioning
  getAttrs(['version'], function (values) {
    versioning(parseFloat(values.version) || 1);
  });
  changeBondButtonColorOnOpen();
  initializeRolls();
});