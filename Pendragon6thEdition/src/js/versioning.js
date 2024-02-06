const versioningAttr = "latest_versioning_upgrade";

on("sheet:opened", () => {
  getAttrs([versioningAttr], (v) => {
    versioning(parseFloat(v[versioningAttr]) || 1);
  });
});

const versionTwoThree = () => {
  getAttrs(characteristics.brawlDamage, (values) => {
    //Brawl Damage =  (STR+SIZ)/6
    const damage = round(total(values) / 6);
    setAttrs({
      brawling_damage: damage,
      brawling_damage_open: damage / 2,
    });
  });
};

const versioning = async (version) => {
  const updateMessage = (v) =>
    console.log(
      `%c Pendragon 6th Edition is updating to ${v}`,
      "color: orange; font-weight:bold"
    );

  switch (true) {
    case version < 2.3:
      const v = 2.3;
      console.log(updateMessage(v));
      versionTwoThree();
      versioning(v);
      break;
    case version < 1:
      versioning(1);
      console.log(updateMessage(version));
      break;
    default:
      console.log(
        `%c Pendragon 6th Edition is update to date.`,
        "color: green; font-weight:bold"
      );
      setAttrs({ version, [`${versioningAttr}`]: version });
  }
};
