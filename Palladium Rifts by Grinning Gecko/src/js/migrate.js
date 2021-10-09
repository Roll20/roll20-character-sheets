async function migrateAttributes() {
  const lcOpts = [undefined, { numeric: true, sensitivity: "base" }];

  const versions = [
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
  ];

  const { version, migrated } = await getAttrsAsync(["version", "migrated"]);
  // https://stackoverflow.com/a/65687141/177943
  const [latest] = versions.slice(-1);
  if (
    latest.version.localeCompare(version, ...lcOpts) < 1 &&
    Boolean(+migrated)
  ) {
    return;
  }

  for (const v of versions) {
    for (const attribute of v.attributes) {
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
    }
  }
  await setAttrsAsync({ version: latest.version, migrated: 1 });
}
