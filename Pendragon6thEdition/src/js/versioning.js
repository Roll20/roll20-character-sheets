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

const versionTwoFive = () => {
  getSectionIDs(`repeating_passion`, (ids) => {
    const map = ids.map((id) => `repeating_passion_${id}_passion`);

    getAttrs(map, (v) => {
      let update = {};
      map.forEach((e) => {
        const rowId = getReprowid(e);
        u[`${rowId}_target_value`] = v[`${e}`] ? v[`${e}`] : 0;
      });
      setAttrs(update);
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
      updateMessage(1);
      break;
    case version < 2.4:
      updateMessage(2.4);
      versionTwoFour();
      versioning(2.4);
      break;
    case version < 2.41:
      updateMessage(2.41);
      updateBrawling();
      versioning(2.41);
      break;
    case version < 2.5:
      updateMessage(2.5);
      versionTwoFive();
      versioning(2.5);
      break;
    default:
      console.log(
        `%c Pendragon 6th Edition is update to date.`,
        "color: green; font-weight:bold"
      );
      setAttrs({ version, [`${versioningAttr}`]: version });
  }
};
