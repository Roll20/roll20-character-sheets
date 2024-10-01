/**
 * Migrations
 */
/* Upgrade event handler */
const handleUpgrade = () => {
  getAttrs(["character_sheet"], (v) => {
    if (!v.character_sheet || v.character_sheet.indexOf(sheetName) !== 0)
      console.log("Unknown sheet version.");
    else if (v.character_sheet.slice(32) !== sheetVersion)
      upgradeSheet(v.character_sheet.slice(32), true);
  });
};

/* Versioned upgrade */
const upgradeSheet = (
  version: string,
  firstTime = false,
  finalTime = false
) => {
  // Any version upgrade code should go here
  const performUpgrade = (version: string) => {
    const [major, minor, patch] = version.split(".").map((x) => parseInt(x));
    console.log(`Upgrading from version ${version}.`);

    /** v2.1.0
     *  convert old format for burst settings for weapons and attacks
     *  set ammo and shock checkboxes to reasonable values
     *  convert old format for gear readied/stowed
     **/
    upgradeSheet(sheetVersion, false, true);

    /** Final upgrade clause, always leave this around */
  };

  if (firstTime) performUpgrade(version);
  else
    setAttrs(
      {
        character_sheet: `${sheetName} v${version}`,
      },
      {},
      () => {
        if (!finalTime) performUpgrade(version);
      }
    );
};
