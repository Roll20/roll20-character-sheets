on("sheet:opened", function (eventinfo) {
  console.log('initialize');
  initialize();
});

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
    "rolling_du_wise"
  ];

  getAttrs(attrsToGet, function (values) {
    populateTraitOptions(values);
    populateWiseOptions(values);
  });
}
