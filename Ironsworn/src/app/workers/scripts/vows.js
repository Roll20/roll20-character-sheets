on("remove:repeating_vow remove:repeating_bonds remove:repeating_progress remove:repeating_sites remove:repeating_assets", function() {
  const timestamp = Number(new Date());
  setAttrs({ repeat_delete: timestamp });
});

on("change:repeating_vow:menace-show-button", function(eventinfo) {
  setAttrs({
    "repeating_vow_menace-show": eventinfo.newValue
  });
});

function fillRepeatingVow (vowNumber) {
  const repeatingAttrs = [
    "vow_name",
    "threat-name",
    `menace-show-button`,
    "menace-show",
    "menace-1",
    "menace-2",
    "menace-3",
    "menace-4",
    "menace-5",
    "menace-6",
    "menace-7",
    "menace-8",
    "menace-9",
    "menace-10",
    "rank",
    "progress_0",
    "progress_1",
    "progress_2",
    "progress_3",
    "progress_4",
    "progress_5",
    "progress_6",
    "progress_7",
    "progress_8",
    "progress_9"
  ];
  const legacyAttrs = [
    `vow${vowNumber}_name`,
    `vow${vowNumber}_threat-name`,
    `vow${vowNumber}_menace-show-button`,
    `vow${vowNumber}_menace-show`,
    `vow${vowNumber}-1-threat`,
    `vow${vowNumber}-2-threat`,
    `vow${vowNumber}-3-threat`,
    `vow${vowNumber}-4-threat`,
    `vow${vowNumber}-5-threat`,
    `vow${vowNumber}-6-threat`,
    `vow${vowNumber}-7-threat`,
    `vow${vowNumber}-8-threat`,
    `vow${vowNumber}-9-threat`,
    `vow${vowNumber}-10-threat`,
    `vow${vowNumber}_rank`,
    `vow${vowNumber}-0`,
    `vow${vowNumber}-1`,
    `vow${vowNumber}-2`,
    `vow${vowNumber}-3`,
    `vow${vowNumber}-4`,
    `vow${vowNumber}-5`,
    `vow${vowNumber}-6`,
    `vow${vowNumber}-7`,
    `vow${vowNumber}-8`,
    `vow${vowNumber}-9`
  ];
  getAttrs(legacyAttrs, function(vow) {
    const newrowid = generateRowID();
    var newAttrs = {};
    repeatingAttrs.forEach(function (attr, index) {
      newAttrs[`repeating_vow_${newrowid}_${attr}`] = vow[legacyAttrs[index]];
    })
    setAttrs(newAttrs);
  });
}

on("sheet:opened", function() {
  getAttrs(["vows_migrated"], function(migrationCheck) {
    if (migrationCheck.vows_migrated == true) {
      return true
    } else {
      for (currentVow = 1; currentVow <= 5; currentVow++) {
        fillRepeatingVow(currentVow);
      }
      setAttrs({vows_migrated: true});
    };
  });
});