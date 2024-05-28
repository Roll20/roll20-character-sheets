const versioningAttr = "latest_versioning_upgrade";

on("sheet:opened", () => {
  getAttrs([versioningAttr], (v) => {
    versioning(parseFloat(v[versioningAttr]) || 1);
  });
});

const versionTwoFour = () => {
  getAttrs(["halfed"], (values) => {
    if (values.halfed) {
      setAttrs({
        hafted: values.halfed,
      });
    }
  });
};

const versionTwoThree = () => {
  getAttrs(characteristics.brawlDamage, (values) => {
    //Brawl Damage =  (STR+SIZ)/6
    const damage = round(total(values) / 6);
    setAttrs({
      brawling_damage: `${damage}d6`,
      brawling_damage_open: `${round(damage / 2)}d6`,
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
    case version < 1:
      versioning(1);
      console.log(updateMessage(1));
      break;
    case version < 2.3:
      console.log(updateMessage(2.3));
      versionTwoThree();
      versioning(2.3);
      break;
    case version < 2.4:
      console.log(updateMessage(2.4));
      versionTwoThree();
      versionTwoFour();
      versioning(2.4);
      break;
    default:
      console.log(
        `%c Pendragon 6th Edition is update to date.`,
        "color: green; font-weight:bold"
      );
      setAttrs({ version, [`${versioningAttr}`]: version });
  }
};
