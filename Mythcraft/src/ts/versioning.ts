const versioningAttr = "latest_versioning_upgrade";

on("sheet:opened", () => {
  // setAttrs({ latest_versioning_upgrade: 3.2 }); //used for testing versioning
  getAttrs([versioningAttr], (v) => {
    versioning(parseFloat(v[versioningAttr]) || 1);
  });
});

const versionOneOne = () => {
  //placeholder for version 1.1
};

const versioning = async (version: number) => {
  const updateMessage = (v: number) =>
    console.log(
      `%c Sheet is updating to ${v}`,
      "color: orange; font-weight:bold"
    );

  switch (true) {
    case version < 1:
      versioning(1);
      updateMessage(1);
      break;
    case version < 1.1:
      updateMessage(1.1);
      versionOneOne();
      versioning(1.1);
      break;
    default:
      console.log(
        `%c Sheet is update to date.`,
        "color: green; font-weight:bold"
      );
      setAttrs({ version, [`${versioningAttr}`]: version });
  }
};
