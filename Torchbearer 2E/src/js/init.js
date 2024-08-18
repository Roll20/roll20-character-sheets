on("sheet:opened", function (eventinfo) {
  initialize();
});

function initialize() {
  const attrsToGet = [
    "trait1_name",
    "trait2_name",
    "trait3_name",
    "trait4_name",
    "rolling_trait",
  ];

  getAttrs(attrsToGet, function (values) {
    populateTraitOptions(values);
  });
}