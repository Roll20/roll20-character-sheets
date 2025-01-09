const versioningAttr = "latest_versioning_upgrade";

on("sheet:opened", () => {
  // setAttrs({ latest_versioning_upgrade: 3.2 }); //used for testing versioning
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

const renameSectionAttrTargetValue = (section, attribute) => {
  getSectionIDs(section, (ids) => {
    const map = ids.map((id) => `${section}_${id}_${attribute}`);

    getAttrs(map, (v) => {
      let update = {};
      map.forEach((e) => {
        const rowId = getReprowid(e);

        if (v[`${e}`]) {
          update[`${rowId}_target_value`] = v[`${e}`];
        }
      });
      setAttrs(update);
    });
  });
};

const versionTwoFive = () => {
  renameSectionAttrTargetValue("repeating_passion", "passion");
  renameSectionAttrTargetValue("repeating_directed-trait", "trait");
  renameSectionAttrTargetValue("repeating_skills", "skill");
};

const versionTwoFiveTwo = () => {
  getAttrs(["play", "sing"], (v) => {
    const update = {};

    if (v.play) {
      update["play instrument"] = v.play;
    }

    if (v.sing) {
      update.singing = v.sing;
    }

    setAttrs(update);
  });
};

const versionTwoFiveThree = () => {
  const renameSectionAttr = (section, attribute) => {
    getSectionIDs(section, (ids) => {
      const map = ids.map((id) => `${section}_${id}_${attribute}`);
      getAttrs(map, (v) => {
        let update = {};
        map.forEach((e) => {
          const rowId = getReprowid(e);
          update[`${rowId}_name`] = v[`${e}`] ? v[`${e}`] : "";
          update[`${rowId}_flag`] = false;
        });
        setAttrs(update);
      });
    });
  };

  renameSectionAttr("repeating_equipment", "equipment");
  renameSectionAttr("repeating_arms", "equipment");
};

const versionThreeTwoOne = () => {
  const section = "repeating_passions";
  getSectionIDs(section, (ids) => {
    const map = ids.map((id) =>
      ["name", "target_value"].map((e) => `${section}_${id}_${e}`)
    );

    map.forEach((e) => {
      getAttrs(e, (v) => {
        const name = v[`${e[0]}`];
        const targetValue = v[`${e[1]}`];
        if (targetValue === 0) {
          getSectionIDs("repeating_passion", (oldIds) => {
            const oldMap = oldIds.map((id) =>
              ["name", "passion"].map((e) => `repeating_passion_${id}_${e}`)
            );

            oldMap.forEach((oldE) => {
              getAttrs(oldE, (oldV) => {
                if (oldV[`${oldE[0]}`] === name) {
                  setAttrs({
                    [`${e[1]}`]: oldV[`${oldE[1]}`],
                  });
                }
              });
            });
          });
        }
      });
    });
  });
};

const versionThreeZero = () => {
  const renameRepeatingSectionName = (section, newName, targetValue) => {
    const attrs = ["name", "target_value", "check"];

    getSectionIDs(section, (ids) => {
      const map = ids.map((id) =>
        [...attrs, targetValue].map((e) => `repeating_${section}_${id}_${e}`)
      );

      map.forEach((e) => {
        getAttrs(e, (v) => {
          const newSection = getRow(newName);
          let update = {};
          Object.entries(v).forEach(([key, value]) => {
            const attr = getReprowAttribute(key);

            if (attr === targetValue) {
              update[`${newSection}_target_value`] = value;
              return;
            }

            update[`${newSection}_${attr}`] = value;
          });
          setAttrs(update);
        });
      });
    });
  };

  renameRepeatingSectionName("passion", "passions", "passion");
  renameRepeatingSectionName("direct-trait", "traits", "trait");

  const setNPCAbilityFlagFalse = () => {
    getSectionIDs("repeating_abilities", (ids) => {
      const map = ids.map((id) => `repeating_abilities_${id}_flag`);
      let update = {};
      map.forEach((e) => (update[e] = false));
      setAttrs(update);
    });
  };

  setNPCAbilityFlagFalse();
};

const versionThreeTwo = () => {
  renameSectionAttrTargetValue("repeating_attacks", "other_skill");
  renameSectionAttrTargetValue("repeating_skills", "skill");
  renameSectionAttrTargetValue("repeating_traits", "traits");
  renameSectionAttrTargetValue("repeating_passions", "passion");

  getAttrs(["glory_won", "armor"], (v) => {
    const update = {};
    if (v["glory_won"]) {
      update["glory_award"] = v["glory_won"];
    }
    if (v["armor"]) {
      update["armor_points"] = v["armor"];
    }

    setAttrs(update);
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
    case version < 2.52:
      updateMessage(2.52);
      versionTwoFiveTwo();
      versioning(2.52);
      break;
    case version < 2.53:
      updateMessage(2.53);
      versionTwoFiveThree();
      versioning(2.53);
      break;
    case version < 3:
      updateMessage(3);
      versionThreeZero();
      versioning(3);
      break;
    case version < 3.2:
      updateMessage(3.2);
      versionThreeTwo();
      versioning(3.2);
      break;
    case version < 3.21:
      updateMessage(3.21);
      versionThreeTwoOne();
      versioning(3.21);
      break;
    default:
      console.log(
        `%c Pendragon 6th Edition is update to date.`,
        "color: green; font-weight:bold"
      );
      setAttrs({ version, [`${versioningAttr}`]: version });
  }
};
