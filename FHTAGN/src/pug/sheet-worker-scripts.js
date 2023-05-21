const skills = {
  Anthropologie: { value: 0, type: "geistig" },
  Archäologie: { value: 0, type: "geistig" },
  Artillerie: { value: 0, type: "körperlich" },
  Athletik: { value: 30, type: "körperlich" },
  Buchführung: { value: 10, type: "geistig" },
  Bürokratie: { value: 10, type: "sozial" },
  "Erste Hilfe": { value: 10, type: "körperlich" },
  Fahren: { value: 20, type: "körperlich" },
  Forensik: { value: 0, type: "geistig" },
  Fremdsprache: { value: 0, type: "geistig", specialisation: 2 },
  Geschichte: { value: 0, type: "geistig" },
  Handwerk: { value: 0, type: "geistig", specialisation: 2 },
  Heimlichkeit: { value: 10, type: "körperlich" },
  Informatik: { value: 0, type: "geistig" },
  Kriminologie: { value: 10, type: "geistig" },
  Kunst: { value: 0, type: "geistig", specialisation: 2 },
  Mathematik: { value: 0, type: "geistig" },
  Medizin: { value: 0, type: "geistig" },
  Militärwissenschaft: { value: 0, type: "geistig" },
  Nahkampfwaffen: { value: 30, type: "körperlich" },
  Naturwissenschaft: {
    value: 0,
    type: "geistig",
    specialisation: 2,
  },
  Navigation: { value: 10, type: "körperlich" },
  Okkultismus: { value: 10, type: "geistig" },
  Pharmazie: { value: 0, type: "geistig" },
  Psychologie: { value: 10, type: "sozial" },
  Psychotherapie: { value: 10, type: "sozial" },
  Rechtswesen: { value: 0, type: "geistig" },
  Reiten: { value: 10, type: "körperlich" },
  Religion: { value: 10, type: "geistig" },
  Schusswaffen: { value: 20, type: "körperlich" },
  Schwimmen: { value: 20, type: "körperlich" },
  Sprengstoffe: { value: 0, type: "geistig" },
  Steuern: { value: 0, type: "körperlich", specialisation: 1 },
  Suchen: { value: 20, type: "körperlich" },
  Träumen: { value: "EN", type: "geistig" },
  Traumlandwissen: {
    value: "0",
    type: "geistig",
    isMythos: true,
  },
  Überlebenskunst: { value: 10, type: "körperlich" },
  Überwachen: { value: 0, type: "geistig" },
  Überzeugen: { value: 20, type: "sozial" },
  "Unnatürliches Wissen": { value: 0, type: "geistig", isMythos: true },
  Verkleiden: { value: 10, type: "sozial" },
  Wachsamkeit: { value: 20, type: "körperlich" },
  "Waffenloser Kampf": { value: 40, type: "körperlich" },
};

function buildRolltemplate(templateObject) {
  let templateString = "&{template:fhtagn} ";
  Object.keys(templateObject).forEach((item) => {
    const string = templateObject[item];
    templateString += `{{${item}=${string}}} `;
  });
  return templateString;
}

//
// Tabs
// -----------------------------------

const buttonlist = ["front", "back"];
buttonlist.forEach((button) => {
  on(`clicked:${button}`, () => {
    setAttrs({
      sheetTab: button,
    });
  });
});

//
// Handle sheet opening
// -----------------------------------

on("sheet:opened", (e) => {
  getAttrs(
    [
      "waffe-unbewaffnet-fert-wert",
      "Waffenloser_Kampf-wert",
      "Waffenloser_Kampf-basiswert",
    ],
    (values) => {
      if (!values["waffe-unbewaffnet-fert-wert"]) {
        setAttrs({
          "waffe-unbewaffnet-fert-wert":
            values["Waffenloser_Kampf-wert"] ||
            values["Waffenloser_Kampf-basiswert"],
        });
      }
    }
  );
});

//
// Derived Values
// -----------------------------------

// Attribute * 5
const attributeList = [
  "staerke",
  "konstitution",
  "geschicklichkeit",
  "intelligenz",
  "entschlossenheit",
  "charisma",
];
attributeList.forEach((attribute) => {
  on(`change:${attribute}`, (e) => {
    setAttrs({
      [`${attribute}-x5`]: parseInt(e.newValue) * 5,
    });
  });
});

// Trefferpunkte
on(`change:staerke change:konstitution`, () => {
  getAttrs(["staerke", "konstitution", "trefferpunkte-aktuell"], (values) => {
    const tp = Math.ceil(
      (parseInt(values.staerke) + parseInt(values.konstitution)) / 2
    );
    const setObject = { "trefferpunkte-max": tp };

    if (!values["trefferpunkte-aktuell"])
      setObject["trefferpunkte-aktuell"] = tp;
    setAttrs(setObject);
  });
});

on(`change:entschlossenheit`, function () {
  getAttrs(["entschlossenheit", "willenskraftpunkte-aktuell"], (values) => {
    const wp = parseInt(values.entschlossenheit);
    const setObject = { "willenskraftpunkte-max": wp };
    if (!values["willenskraftpunkte-aktuell"])
      setObject["willenskraftpunkte-aktuell"] = wp;
    setAttrs(setObject);
  });
});

on(`change:entschlossenheit change:Unnatürliches_Wissen-wert`, () => {
  getAttrs(
    [
      "entschlossenheit",
      "Unnatürliches_Wissen-wert",
      "stabilitaetspunkte-aktuell",
    ],
    (values) => {
      const enx5 = parseInt(values.entschlossenheit) * 5;
      const uwCalculated = 99 - parseInt(values["Unnatürliches_Wissen-wert"]);
      const stabi = uwCalculated < enx5 ? uwCalculated : enx5;
      const setObject = { "stabilitaetspunkte-max": stabi };

      if (!values["stabilitaetspunkte-aktuell"])
        setObject["stabilitaetspunkte-aktuell"] = stabi;
      setAttrs(setObject);
    }
  );
});

//
// Skills
// -----------------------------------

function createSkillHandler(
  skillnameClean,
  attributeIdentifier,
  templateObject
) {
  on(`change:${attributeIdentifier}-wert`, (e) => {
    const newObject = { ...templateObject };
    if (!e.newValue) newObject.basiswert = `@{${skillnameClean}-basiswert`;
    setAttrs({
      [`${attributeIdentifier}-rollcontent`]: buildRolltemplate(newObject),
    });
  });
}

function createWeaponSkillHandler(skillname, skillnameClean) {
  on(`change:${skillnameClean}-wert`, (e) => {
    const weaponKeys = [0, 1, 2, 3, "unbewaffnet"];
    const weaponTypes = weaponKeys.map((index) => `waffe-${index}-fert`);
    const weaponSkillValues = weaponKeys.map(
      (index) => `waffe-${index}-fert-wert`
    );
    const basiswertKey = e.sourceAttribute.replace("-wert", "-basiswert");
    getAttrs([...weaponTypes, ...weaponSkillValues, basiswertKey], (values) => {
      weaponKeys.forEach((key) => {
        const currentWeaponType = values[`waffe-${key}-fert`];
        const currentWeaponValue = values[`waffe-${key}-fert-wert`];

        const isWeaponOfType = currentWeaponType === skillname;
        const isUsingSkillValue =
          parseInt(currentWeaponValue) === parseInt(e.previousValue);
        const isBothEmpty =
          currentWeaponValue === "" && typeof e.previousValue === "undefined";
        const isUsingBaseValue =
          parseInt(currentWeaponValue) === parseInt(values[basiswertKey]);
        const isMatcheable =
          isWeaponOfType &&
          (isUsingSkillValue || isBothEmpty || isUsingBaseValue);

        if (isMatcheable) {
          console.log(`waffe-${key}-fert-wert`);
          console.log(e.newValue || values[basiswertKey]);
          setAttrs(
            {
              [`waffe-${key}-fert-wert`]: e.newValue || values[basiswertKey],
            },
            {},
            console.log
          );
        }
      });
    });
  });
}

Object.keys(skills).forEach((skillname) => {
  const skillnameClean = skillname.replace(/ /g, "_");
  const specialisations = skills[skillname].specialisation;
  const probe = "[[1d100cf101cs0]]";

  if (specialisations) {
    for (let i = 0; i < specialisations; i++) {
      const specialisationName = `${skillnameClean}-custom-${i}`;
      const templateObject = {
        rollname: `Probe vs. ${skillname}: @{${specialisationName}}`,
        probe,
        grundwert: `@{${specialisationName}-wert}`,
      };

      createSkillHandler(skillnameClean, specialisationName, templateObject);
    }
  } else {
    const templateObject = {
      rollname: `Probe vs. ${skillname}`,
      probe,
      grundwert: `@{${skillnameClean}-wert}`,
    };

    createSkillHandler(skillnameClean, skillnameClean, templateObject);

    if (
      ["Nahkampfwaffen", "Schusswaffen", "Waffenloser Kampf"].indexOf(
        skillname
      ) > -1
    ) {
      createWeaponSkillHandler(skillname, skillnameClean);
    }
  }
});

//
// Waffen
// -----------------------------------
[0, 1, 2, 3].forEach((index) => {
  on(`change:waffe-${index}-fert`, (e) => {
    const templateObject = {
      rollname: `Angriff mit @{waffe-${index}-name}`,
      probe: `[[1d100cf101cs0]]`,
      grundwert: `@{waffe-${index}-fert-wert}`,
    };

    if (e.newValue === "null") {
      setAttrs({
        [`waffe-${index}-fert-wert`]: "",
        [`waffe-${index}-attack-roll`]: buildRolltemplate(templateObject),
      });
    } else {
      const skillnameClean = e.newValue.replace(/ /g, "_");
      getAttrs(
        [`${skillnameClean}-wert`, `${skillnameClean}-basiswert`],
        (values) => {
          const skillValue = values[`${skillnameClean}-wert`];
          const skillBasevalue = values[`${skillnameClean}-basiswert`];

          setAttrs({
            [`waffe-${index}-fert-wert`]: skillValue || skillBasevalue,
            [`waffe-${index}-attack-roll`]: buildRolltemplate(templateObject),
          });
        }
      );
    }
  });
});

[0, 1, 2, 3, "unbewaffnet"].forEach((key) => {
  on(`change:waffe-${key}-schaden`, (e) => {
    const templateObject = {
      rollname:
        key === "unbewaffnet"
          ? "Unbewaffneter Schaden"
          : `Schaden mit @{waffe-${key}-name}`,
      probe: `[[${e.newValue.replace("w", "d")}]]`,
    };

    setAttrs({
      [`waffe-${key}-schaden-rollcontent`]: buildRolltemplate(templateObject),
    });
  });
});
