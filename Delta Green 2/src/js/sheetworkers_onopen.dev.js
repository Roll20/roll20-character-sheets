"use strict";

var update_armor_piercing = function update_armor_piercing(value, update) {
  var armor_piercing_text = value;
  var armor_piercing_number = parseInt(armor_piercing_text) || 0;

  if (armor_piercing_text !== '') {
    update["repeating_weapons_armor_piercing"] = armor_piercing_number;
  }
}; //= force the stats to be positive and the skills to be between 0 and 99


on("sheet:opened", function () {
  // === Versioning
  getAttrs(['version'], function (values) {
    versioning(parseFloat(values.version) || 1);
  });
  changeBondButtonColorOnOpen();
  initializeRolls();
});