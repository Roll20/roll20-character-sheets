/**
 * Migration Notes

Current / Max (HP, DC, ISP, PPE) - In all cases, Max is migrated to the sheet and Current is dropped.
(S/M)DC assumes SDC and populates that field.
Hunger isn't a thing, so isn't migrated.
IQ Bonus to Skill, Trust/Intimidate, and Charm/Impress are not migrated because they're auto-calculated.

 */

/**
 *
 * @param {string} repeater
 * @param {string} category
 */
async function migrateSkills(repeater, category) {
  console.log("migrateSkills", repeater, category);
  const oldRowIds = await getSectionIDsOrderedAsync(repeater);
  const skillKeys = oldRowIds.reduce((acc, cur) => {
    const pre = `repeating_${repeater}_${cur}`;
    return [
      `${pre}_${repeater}`,
      `${pre}_${repeater}P`,
      `${pre}_${repeater}PL`,
      ...acc,
    ];
  }, []);
  skillKeys.push("character_level");
  const a = await getAttrsAsync(skillKeys);
  const newRowIds = [];
  const attrs = oldRowIds.reduce((acc, cur) => {
    const rowId = generateRowID();
    newRowIds.push(rowId);
    const oldPre = `repeating_${repeater}_${cur}`;
    const newPre = `repeating_skills_${rowId}`;
    acc[`${newPre}_name`] = a[`${oldPre}_${repeater}`];
    acc[`${newPre}_category`] = category;
    acc[`${newPre}_base`] = a[`${oldPre}_${repeater}P`];
    acc[`${newPre}_perlevel`] = a[`${oldPre}_${repeater}PL`];
    acc[`${newPre}_level`] = a[`character_level`];
    return acc;
  }, {});
  await setAttrsAsync(attrs);
  for (const rowId of newRowIds) {
    await updateSkill(rowId);
  }
}

async function oldSheetProfile() {}

async function migrateFromOldSheet() {
  console.log("migrateFromOldSheet");
  const oldKeys = ["PsionicLevel"];
  const a = await getAttrsAsync(oldKeys);
  const attrs = {};
  attrs["psionic_ability"] = +a["PsionicLevel"] + 10;
  await setAttrsAsync(attrs);
  await migrateSkills("OCCSK", "occ");
  await migrateSkills("OCRCSK", "related");
  await migrateSkills("SECSK", "secondary");
}

async function migrateAddRowIds() {
  // @todo Loop through all h2h,wp,wpmodern,skills IDs and create/populate rowid wherever it's empty.
  console.log("migrateAddRowIds");
  const sections = ["skills", "h2h", "wp", "wpmodern"];
  for (const section of sections) {
    const ids = await getSectionIDsOrderedAsync(section);
    const attrKeys = ids.map((id) => `repeating_${section}_${id}_rowid`);
    const a = await getAttrsAsync(attrKeys);
    const attrs = ids.reduce((acc, id) => {
      const key = `repeating_${section}_${id}`;
      if (!a[`${key}_rowid`]) {
        acc[`${key}_rowid`] = key;
      }
      return acc;
    }, {});
    console.log(attrs);
    await setAttrsAsync(attrs);
  }
}

async function migrateAttributes() {
  const lcOpts = [undefined, { numeric: true, sensitivity: "base" }];

  const versions = [
    {
      version: "1.0.0",
      attributes: [
        {
          from: [
            "Name",
            "Gender",
            "OCC",
            "Level",
            "XP",
            "Alignment",
            "IQ",
            "ME",
            "MA",
            "PS",
            "PP",
            "PE",
            "PB",
            "Spd",
            "HP_max",
            "DamageCapacity_max",
            "ISP_max",
            "PPE_max",
          ],
          to: [
            "character_name",
            "character_gender",
            "occ",
            "character_level",
            "experience",
            "alignment",
            "iq",
            "me",
            "ma",
            "ps",
            "pp",
            "pe",
            "pb",
            "spd",
            "character_hp",
            "character_sdc",
            "character_isp",
            "character_ppe",
          ],
        },
      ],
    },
    {
      version: "1.1.0",
      attributes: [
        {
          repeating: ["modifiers", "magic", "psionics", "powersabilities"],
          from: "trustintimidate",
          to: ["trust", "intimidate"],
        },
      ],
    },
    {
      version: "1.2.0",
      attributes: [
        {
          repeating: ["armor"],
          from: "currentmdc",
          to: ["mdc"],
        },
        {
          repeating: ["armor"],
          from: "basemdc",
          to: ["mdc_max"],
        },
      ],
    },
    {
      version: "1.3.0",
    },
    {
      version: "1.4.0",
    },
    {
      version: "1.5.0",
      function: migrateAddRowIds,
    },
  ];

  const { version, migrated } = await getAttrsAsync(["version", "migrated"]);
  console.log(version, migrated);
  const [latest] = versions.slice(-1);
  if (!version || !Boolean(+migrated)) {
    migrateFromOldSheet();
  } else {
    // https://stackoverflow.com/a/65687141/177943
    if (
      latest.version.localeCompare(version, ...lcOpts) < 1 &&
      Boolean(+migrated)
    ) {
      return;
    }
  }

  for (const v of versions) {
    if (v.attributes) {
      for (const attribute of v.attributes) {
        if (attribute.repeating) {
          for (const section of attribute.repeating) {
            const ids = await getSectionIDsAsync(section);
            const attrKeys = ids.map(
              (id) => `repeating_${section}_${id}_${attribute.from}`
            );
            const a = await getAttrsAsync(attrKeys);
            const attrs = ids.reduce((acc, id) => {
              for (const to of attribute.to) {
                const fromKey = `repeating_${section}_${id}_${attribute.from}`;
                if (a[fromKey]) {
                  acc[`repeating_${section}_${id}_${to}`] = a[fromKey];
                }
                return acc;
              }
            }, {});
            if (Object.keys(attrs).length > 0) {
              await setAttrsAsync(attrs);
            }
          }
        } else {
          if (Array.isArray(attribute.from) && Array.isArray(attribute.to)) {
            const a = await getAttrsAsync(attribute.from);
            const attrs = attribute.from.reduce((acc, cur, idx) => {
              if (a[cur]) {
                acc[attribute.to[idx]] = a[cur];
              }
              return acc;
            }, {});
            await setAttrsAsync(attrs);
          }
        }
      }
    }
    if (v.function) {
      v.function();
    }
  }
  await setAttrsAsync({ version: latest.version, migrated: 1 });
}
