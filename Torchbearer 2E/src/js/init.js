on("sheet:opened", function (eventinfo) {
  console.log('initialize');
  initialize();
});

function initializeTabs(values) {
  if (!(["anatomy", "kit", "magic", "relationships", "levels", "roll"].includes(values['tab']))) {
    setAttrs({ tab: "anatomy" });
  }
  if (!(["playing", "editing"].includes(values['edit']))) {
    setAttrs({ edit: "playing" });
  }
}

function initialize() {
  const attrsToGet = [
    "trait1_name",
    "trait2_name",
    "trait3_name",
    "trait4_name",
    "wise1_name",
    "wise2_name",
    "wise3_name",
    "wise4_name",
    "rolling_trait",
    "rolling_du_wise",
    "tab",
    "edit"
  ];

  getAttrs(attrsToGet, function (values) {
    populateTraitOptions(values);
    populateWiseOptions(values);
    initializeTabs(values);
  });
}
