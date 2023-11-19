(function () {
  async function getRepeatingSectionArrayAsync(section, rowIds, attrNames) {
    let sectionArray = [];
    const attrs = await getAttrsAsync(attrNames);
    rowIds.forEach((rowId) => {
      const wpObj = Object.keys(attrs).reduce((acc, attr) => {
        if (attr.includes(rowId)) {
          acc[attr.replace(`repeating_${section}_${rowId}_`, "")] = attrs[attr];
        }
        return acc;
      }, {});
      sectionArray.push(wpObj);
    });
    return sectionArray;
  }

  async function getRepeatingRowsAsync(section) {
    const ids = await getSectionIDsOrderedAsync(section);
    const attrNames = ids.reduce((acc, id) => {
      SECTIONS[section].forEach((key) => {
        acc.push(`repeating_${section}_${id}_${key}`);
      });
      return acc;
    }, []);
    const repeatingSectionArray = await getRepeatingSectionArrayAsync(
      section,
      ids,
      attrNames
    );
    return repeatingSectionArray;
  }

  on("clicked:export", async (e) => {
    console.log("export", e);
    const attrs = {};
    attrs.h2h = await getRepeatingRowsAsync("h2h");
    attrs.wp = await getRepeatingRowsAsync("wp");
    attrs.wpmodern = await getRepeatingRowsAsync("wpmodern");
    attrs.skills = await getRepeatingRowsAsync("skills");
    attrs.magic = await getRepeatingRowsAsync("magic");
    attrs.psionics = await getRepeatingRowsAsync("psionics");
    attrs.movement = await getRepeatingRowsAsync("movement");
    attrs.powersabilities = await getRepeatingRowsAsync("powersabilities");
    attrs.modifiers = await getRepeatingRowsAsync("modifiers");
    attrs.armor = await getRepeatingRowsAsync("armor");
    attrs.equipment = await getRepeatingRowsAsync("equipment");
    // Profiles are tricky to export because IDs that they refer to won't line up
    // attrs.profiles = await getRepeatingRowsAsync("profiles");
    attrs.core = await getAttrsAsync(CORE_KEYS);
    await setAttrsAsync({ importexport: JSON.stringify(attrs, null, 2) });
  });

  async function setRepeatingRowsAsync(section, data) {
    await setAttrsAsync({ importexportstatus: `Importing ${section}...` });
    console.log("setRepeatingRows", section, data);
    if (!data) return;
    console.log("continuing setRepeatingRows", section);
    const attrs = data.reduce((acc, row) => {
      const rowId = generateRowID();
      Object.entries(row).forEach(([key, val]) => {
        if (parseInt(val) == 0) {
          return;
        }
        acc[`repeating_${section}_${rowId}_${key}`] = val;
      });
      return acc;
    }, {});
    attrs.importexportstatus = `Done importing ${section}...`;
    await setAttrsAsync(attrs);
  }

  function importAll(data) {
    let attrs = data.core || {};
    Object.keys(SECTIONS).forEach((section) => {
      if (!data[section]) {
        return;
      }
      console.log(section, data[section]);
      const sectionAttrs = data[section].reduce((acc, row) => {
        const rowId = generateRowID();
        Object.entries(row).forEach(([key, val]) => {
          acc[`repeating_${section}_${rowId}_${key}`] = val;
        });
        return acc;
      }, {});
      attrs = Object.assign(attrs, sectionAttrs);
    });
    setAttrs(attrs, {}, () => {
      setAttrs({ importexport: "Done" });
    });
  }

  on("clicked:import", async (e) => {
    console.log("import", e);
    await setAttrsAsync({ importexportstatus: "Importing core..." });
    const a = await getAttrsAsync(["importexport"]);
    const data = JSON.parse(a.importexport);
    console.log(data);
    // importAll(data);
    // return;
    await setAttrsAsync(data.core);
    await setRepeatingRowsAsync("h2h", data.h2h);
    await setRepeatingRowsAsync("wp", data.wp);
    await setRepeatingRowsAsync("wpmodern", data.wpmodern);
    await setRepeatingRowsAsync("skills", data.skills);
    await setRepeatingRowsAsync("magic", data.magic);
    await setRepeatingRowsAsync("psionics", data.psionics);
    await setRepeatingRowsAsync("movement", data.movement);
    await setRepeatingRowsAsync("powersabilities", data.powersabilities);
    await setRepeatingRowsAsync("modifiers", data.modifiers);
    await setRepeatingRowsAsync("armor", data.armor);
    await setRepeatingRowsAsync("equipment", data.equipment);
    await setAttrsAsync({
      importexportstatus:
        "Done importing, but triggered events are probably still running. To be sure open your browser console and when the logging stops, the import is really done.",
    });
  });
})();

on("sheet:opened", async (e) => {
  console.log("sheet:opened", e);
  await setAttrsAsync({ debug: "0" });
  // await migrateAttributes();
});

on("clicked:migrate", async (e) => {
  console.log("clicked:migrate", e);
  await migrateAttributes();
});

// $20("button.test").on("mouseenter", (e) => {
//   console.log(e);
// });

// on("clicked:test", async (e) => {
//   console.log("test");
//   const acid = getActiveCharacterId();
//   const attrs = findObjs({
//     _type: "attribute",
//     _characterid: acid,
//   });
//   console.log(acid, attrs);
// });
