//------ Functions ---------

const update_ability = function (name) {
  console.log("update_ability: " + name);
  let update = {};
  getAttrs([name + "_rolled", name + "_advanced", name + "_tmp"], (v) => {
    console.log(v);
    update[name] =
      (parseInt(v[name + "_rolled"]) || 0) +
      (parseInt(v[name + "_advanced"]) || 0) +
      (parseInt(v[name + "_tmp"]) || 0);
    console.log(update);
    setAttrs(update, { silent: false });
  });
};
// @todo: this should probably just pick up equipped shields, rather than having a specific shield setting.
const getShieldCS = function (shield_size, shield_material) {
  console.log("getShieldCS");
  console.log(shield_size);
  console.log(shield_material);
  let CS_physical = 0,
    CS_energy = 0,
    CS_mental = 0;

  CS_physical =
    parseInt(shield_size) > 2 ? -2 : parseInt(shield_size) > 1 ? -1 : 0;

  CS_physical =
    parseInt(shield_material) === 1
      ? CS_physical
      : parseInt(shield_material) === 2
      ? CS_physical
      : parseInt(shield_material) === 3
      ? CS_physical - 1
      : parseInt(shield_material) === 4
      ? CS_physical - 1
      : parseInt(shield_material) === 5
      ? CS_physical - 2
      : parseInt(shield_material) === 6
      ? CS_physical
      : CS_physical;
  CS_energy = parseInt(shield_material) === 6 ? CS_physical - 3 : CS_physical;
  return { CS_physical, CS_energy, CS_mental };
};

const update_ac = function () {
  console.log("update_ac");
  let update = {};
  let dr_total = 0;
  let ac_total = 0;
  let count = 0;
  let enc_attrs = ["shield_CS"];
  getSectionIDs("repeating_armour", (armourIds) => {
    _.each(armourIds, (currentID, i) => {
      enc_attrs.push(`repeating_armour_${currentID}_weight`);
      enc_attrs.push(`repeating_armour_${currentID}_count`);
      enc_attrs.push(`repeating_armour_${currentID}_equipped`);
    });
    getAttrs(enc_attrs, (v) => {});
  });
};

const update_enc = function () {
  console.log("update_enc");
  let update = {};
  let wtotal = 0;
  let DR_physical = 0;
  let DR_energy = 0;
  let CS = {};
  let RFtotal = 0;
  let CS_physical = 0;
  let CS_mental = 0;
  let CS_energy = 0;
  let count = 0;
  let PSfactor = 1;
  let spdfactor = 1;
  let enc_attrs = [
    "DR_physical",
    "DR_energy",
    "coin_gp",
    "coin_nk",
    "coin_sp",
    "coin_dm",
    "PS",
    "PS_rolled",
    "PS_advanced",
    "PS_tmp",
    "encumbrance",
    "encumbrance_max",
    "speed",
    "speed_max",
    "burden",
    "burden_max",
  ];
  getSectionIDs("repeating_gear", (gearIds) => {
    _.each(gearIds, (currentID, i) => {
      enc_attrs.push(`repeating_gear_${currentID}_weight`);
      enc_attrs.push(`repeating_gear_${currentID}_count`);
      enc_attrs.push(`repeating_gear_${currentID}_equipped`);
    });

    getSectionIDs("repeating_armour", (armourIds) => {
      _.each(armourIds, (currentID, i) => {
        enc_attrs.push(`repeating_armour_${currentID}_weight`);
        enc_attrs.push(`repeating_armour_${currentID}_count`);
        enc_attrs.push(`repeating_armour_${currentID}_equipped`);
        enc_attrs.push(`repeating_armour_${currentID}_powered`);
        enc_attrs.push(`repeating_armour_${currentID}_enc_factor`);
        enc_attrs.push(`repeating_armour_${currentID}_spd_factor`);
        enc_attrs.push(`repeating_armour_${currentID}_PS_factor`);
        enc_attrs.push(`repeating_armour_${currentID}_shield_size`);
        enc_attrs.push(`repeating_armour_${currentID}_shield_material`);
        enc_attrs.push(`repeating_armour_${currentID}_CS_mental`);
        enc_attrs.push(`repeating_armour_${currentID}_DR_energy`);
        enc_attrs.push(`repeating_armour_${currentID}_DR_physical`);
        enc_attrs.push(`repeating_armour_${currentID}_RF_physical`);
      });
      getAttrs(enc_attrs, (v) => {
        console.log(v);
        if (v["speed_max"] === undefined) {
          v["speed_max"] = v["speed"];
          update["speed_max"] = v["speed"];
        }
        ["coin_gp", "coin_sp", "coin_nk", "coin_dm"].forEach((type) => {
          let coinweight =
            isNaN(parseInt(v[`${type}`], 10)) === false
              ? parseInt(v[`${type}`], 10)
              : 0;
          // use roughly correct weights for different materials as per g/cm3
          if (type === "coin_gp") {
            wtotal += coinweight / 100;
          }
          if (type === "coin_sp") {
            wtotal += coinweight / 200;
          }
          if (type === "coin_nk") {
            wtotal += coinweight / 250;
          }
          if (type === "coin_dm") {
            wtotal += coinweight / 1000;
          }
          if (type === "coin_dl") {
            wtotal += coinweight / 1000;
          }
          if (type === "coin_db") {
            wtotal += coinweight / 1000;
          }
        });

        _.each(gearIds, (currentID, i) => {
          if (
            v[`repeating_gear_${currentID}_weight`] &&
            v[`repeating_gear_${currentID}_equipped`] === "1" &&
            isNaN(parseInt(v[`repeating_gear_${currentID}_weight`], 10)) ===
              false
          ) {
            count =
              v[`repeating_gear_${currentID}_count`] &&
              isNaN(parseFloat(v[`repeating_gear_${currentID}_count`])) ===
                false
                ? parseFloat(v[`repeating_gear_${currentID}_count`])
                : 1;
            wtotal =
              wtotal +
              parseFloat(v[`repeating_gear_${currentID}_weight`]) * count;
          }
        });

        _.each(armourIds, (currentID, i) => {
          if (
            v[`repeating_armour_${currentID}_weight`] &&
            v[`repeating_armour_${currentID}_equipped`] === "1" &&
            isNaN(parseInt(v[`repeating_armour_${currentID}_weight`], 10)) ===
              false
          ) {
            count =
              v[`repeating_armour_${currentID}_count`] &&
              isNaN(parseFloat(v[`repeating_armour_${currentID}_count`])) ===
                false
                ? parseFloat(v[`repeating_armour_${currentID}_count`])
                : 1;
            wtotal =
              wtotal +
              parseFloat(v[`repeating_armour_${currentID}_weight`]) *
                count *
                (isNaN(
                  parseFloat(v[`repeating_armour_${currentID}_enc_factor`])
                ) === false
                  ? parseFloat(v[`repeating_armour_${currentID}_enc_factor`])
                  : 0.5);
            PSfactor =
              isNaN(
                parseFloat(v[`repeating_armour_${currentID}_PS_factor`])
              ) === false
                ? v[`repeating_armour_${currentID}_PS_factor`] > PSfactor
                  ? v[`repeating_armour_${currentID}_PS_factor`]
                  : PSfactor
                : PSfactor;
            spdfactor =
              isNaN(
                parseFloat(v[`repeating_armour_${currentID}_spd_factor`])
              ) === false
                ? v[`repeating_armour_${currentID}_spd_factor`] > spdfactor
                  ? v[`repeating_armour_${currentID}_spd_factor`]
                  : spdfactor
                : spdfactor;
          }
          // update DR_physical
          if (
            v[`repeating_armour_${currentID}_DR_physical`] &&
            v[`repeating_armour_${currentID}_equipped`] === "1" &&
            isNaN(
              parseInt(v[`repeating_armour_${currentID}_DR_physical`], 10)
            ) === false
          ) {
            DR_physical += parseInt(
              v[`repeating_armour_${currentID}_DR_physical`]
            );
          }
          // update DR_energy
          console.log(
            "DR_energy: ",
            v[`repeating_armour_${currentID}_DR_energy`]
          );
          if (
            v[`repeating_armour_${currentID}_DR_energy`] !== undefined &&
            v[`repeating_armour_${currentID}_equipped`] === "1" &&
            isNaN(
              parseInt(v[`repeating_armour_${currentID}_DR_energy`], 10)
            ) === false
          ) {
            DR_energy += parseInt(v[`repeating_armour_${currentID}_DR_energy`]);
          } else {
            DR_energy += DR_physical;
          }

          // update CS
          if (
            v[`repeating_armour_${currentID}_shield_size`] &&
            v[`repeating_armour_${currentID}_shield_material`] &&
            v[`repeating_armour_${currentID}_equipped`] === "1"
          ) {
            CS = getShieldCS(
              v[`repeating_armour_${currentID}_shield_size`],
              v[`repeating_armour_${currentID}_shield_material`]
            );
            CS_physical += CS.CS_physical;
            CS_mental += CS.CS_mental;
            CS_energy += CS.CS_energy;
          }
          if (
            v[`repeating_armour_${currentID}_CS_mental`] &&
            v[`repeating_armour_${currentID}_equipped`] === "1"
          ) {
            console.log(
              "HELMET: " + v[`repeating_armour_${currentID}_CS_mental`]
            );
            CS_mental += parseInt(v[`repeating_armour_${currentID}_CS_mental`]);
          }

          // update RF
          if (
            v[`repeating_armour_${currentID}_RF_physical`] &&
            v[`repeating_armour_${currentID}_equipped`] === "1" &&
            isNaN(
              parseInt(v[`repeating_armour_${currentID}_RF_physical`], 10)
            ) === false
          ) {
            RFtotal += parseInt(v[`repeating_armour_${currentID}_RF_physical`]);
            console.log(CS_physical);
          }
        });
        // console.log(CS_physical);
        update["RF_physical"] = RFtotal;
        update["RF_energy"] = RFtotal;
        update["CS_physical"] = CS_physical;
        update["CS_energy"] = CS_energy;
        update["CS_mental"] = CS_mental;
        update["DR_physical"] = DR_physical;
        update["DR_energy"] = DR_energy;
        update["encumbrance"] = Math.round(wtotal * 10) / 10;
        let PS =
          (parseInt(v["PS_rolled"]) +
            parseInt(v["PS_advanced"]) +
            parseInt(v["PS_tmp"])) *
          PSfactor;
        update["PS"] = PS;
        update["burden"] =
          wtotal > PS * 5
            ? "Crushing Weight"
            : wtotal > PS * 3
            ? "Immobile"
            : wtotal > PS * 2
            ? "Heavily Burdened"
            : wtotal > PS * 1
            ? "Burdened"
            : "Normal";
        update["speed"] =
          wtotal > PS * 3
            ? 0
            : wtotal > PS * 2
            ? Math.floor(parseInt(v["speed_max"]) / 3)
            : wtotal > PS * 1
            ? Math.floor((parseInt(v["speed_max"]) / 3) * 2)
            : parseInt(v["speed_max"]) * spdfactor;
        console.log(update);
        setAttrs(update, { silent: true });
        update_mod("PS");
      });
    });
  });
};

const update_mod = function (ability) {
  console.log("update_mod: " + ability);
  let update = {};
  let mod = 6;
  let total = 0;
  let ps_attrs = [ability];
  getAttrs(ps_attrs, (v) => {
    console.log(v);
    console.log(v[ability]);
    total += parseInt(v[ability]);
    if (total < 601) {
      mod = 5;
    }
    if (total < 121) {
      mod = 4;
    }
    if (total < 22) {
      mod = 3;
    }
    if (total < 19) {
      mod = 2;
    }
    if (total < 16) {
      mod = 1;
    }
    if (total < 12) {
      mod = 0;
    }
    if (total < 10) {
      mod = -1;
    }
    if (total < 7) {
      mod = -2;
    }
    if (total < 4) {
      mod = -3;
    }
    if (total < 0) {
      mod = -4;
    }
    if (total < -6) {
      mod = -5;
    }
    if (total < -26) {
      mod = -6;
    }
    update[ability + "_modifier"] = mod;
    setAttrs(update, { silent: true });
  });
};

//------ Events ---------

on("sheet:opened", function (eventinfo) {
  console.log("sheet:opened");
});

on("change:import", function (args) {
  console.log("sheet:import", args);
});

on("change:PS_rolled", function (args) {
  console.log("change:PS_rolled");
  update_ability("PS");
});

on("change:PS_advanced", function (args) {
  console.log("change:PS_advanced");
  update_ability("PS");
});

on("change:PS_tmp", function (args) {
  console.log("change:PS_tmp");
  update_ability("PS");
});

on("change:PS", function (args) {
  console.log("PS changed");
  update_mod("PS");
  update_enc();
});

on("change:DX_rolled", function (args) {
  console.log("change:DX_rolled");
  update_ability("DX");
});

on("change:DX_advanced", function (args) {
  console.log("change:DX_advanced");
  update_ability("DX");
});

on("change:DX_tmp", function (args) {
  console.log("change:DX_tmp");
  update_ability("DX");
});

on("change:DX", function (args) {
  console.log("DX changed");
  update_mod("DX");
});

on("change:CN_rolled", function (args) {
  console.log("change:CN_rolled");
  update_ability("CN");
});

on("change:CN_advanced", function (args) {
  console.log("change:CN_advanced");
  update_ability("CN");
});

on("change:CN_tmp", function (args) {
  console.log("change:CN_tmp");
  update_ability("CN");
});

on("change:CN", function (args) {
  console.log("CN changed");
  update_mod("CN");
});

on("change:IN_rolled", function (args) {
  console.log("change:IN_rolled");
  update_ability("IN");
});

on("change:IN_advanced", function (args) {
  console.log("change:IN_advanced");
  update_ability("IN");
});

on("change:IN_tmp", function (args) {
  console.log("change:IN_tmp");
  update_ability("IN");
});

on("change:IN", function (args) {
  console.log("IN changed");
  update_mod("IN");
});

on("change:MS_rolled", function (args) {
  console.log("change:MS_rolled");
  update_ability("MS");
});

on("change:MS_advanced", function (args) {
  console.log("change:MS_advanced");
  update_ability("MS");
});

on("change:MS_tmp", function (args) {
  console.log("change:MS_tmp");
  update_ability("MS");
});

on("change:MS", function (args) {
  console.log("MS changed");
  update_mod("MS");
});

on("change:CH_rolled", function (args) {
  console.log("change:CH_rolled");
  update_ability("CH");
});

on("change:CH_advanced", function (args) {
  console.log("change:CH_advanced");
  update_ability("CH");
});

on("change:CH_tmp", function (args) {
  console.log("change:CH_tmp");
  update_ability("CH");
});

on("change:CH", function (args) {
  console.log("CH changed");
  update_mod("CH");
});

on("change:repeating_gear", function (args) {
  update_enc();
});

on("change:repeating_armour", function (args) {
  console.log("change:repeating_armour");
  update_enc();
  // update_ac();
});

on("change:coin_gp", function (args) {
  update_enc();
});

on("change:coin_nk", function (args) {
  update_enc();
});

on("change:coin_dm", function (args) {
  update_enc();
});

on("change:coin_sp", function (args) {
  update_enc();
});

on("change:rollSwitch", function (args) {
  console.log(args);
  let update = {};
  if (args.newValue == "2") { return }
  if (args.newValue == "1") {
    update["PS_rolled"] = dices.roll("4d6", { dropLowest: 1 }).total;
    update["DX_rolled"] = dices.roll("4d6", { dropLowest: 1 }).total;
    update["CN_rolled"] = dices.roll("4d6", { dropLowest: 1 }).total;
    update["IN_rolled"] = dices.roll("4d6", { dropLowest: 1 }).total;
    update["MS_rolled"] = dices.roll("4d6", { dropLowest: 1 }).total;
    update["CH_rolled"] = dices.roll("4d6", { dropLowest: 1 }).total;
  } 
  
  if (args.newValue == "0") {
    update["PS_rolled"] = 0;
    update["DX_rolled"] = 0;
    update["IN_rolled"] = 0;
    update["CN_rolled"] = 0;
    update["IN_rolled"] = 0;
    update["MS_rolled"] = 0;
    update["CH_rolled"] = 0;
  }
  setAttrs(update, { silent: true });

  update_ability("PS");
  update_ability("DX");
  update_ability("CN");
  update_ability("IN");
  update_ability("MS");
  update_ability("CH");

  update_mod("PS");
  update_mod("DX");
  update_mod("CN");
  update_mod("IN");
  update_mod("MS");
  update_mod("CH");
});

on("change:hpRollSwitch", function (args) {
  console.log("change:hpRollSwitch");
  console.log(args);
  let update = {};
  if (args.newValue == "0") {
    console.log("set hp_max to zero");
    update["hp_max"] = 0;
    setAttrs(update, { silent: true });
  } else {
    let rank, CN;
    getAttrs(["character_rank", "CN"], (v) => {
      console.log("v", v);
      rank = v["character_rank"];
      CN = v["CN"];
      update["hp_max"] = dices.roll(`${CN}d6+${CN}`).total;
      setAttrs(update, { silent: true });
    });
  }
});
