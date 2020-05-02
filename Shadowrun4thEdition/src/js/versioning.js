const versioning = version => {
  const versionLog = version => console.log(`%c Shadowrun 4th Edition versioning, ${version}`, "color: darkblue; font-weight:bold");

  switch(true) {
    case version < 1.01:
      versionLog(version)
      onepointone()
      setAttrs({ version: 1.01 }, () => versioning(1.01))
      break;
    default:
        console.log(`%c Shadowrun 4th Edition is update to date. Version ${version}`, "color: green; font-weight:bold");
  }
};

const onepointone = () => {
  getSectionIDs('active', idarray => {
    let attributes = [];
    let update = {};

    idarray.forEach(id => attributes.push(`repeating_forms_${id}_specialization`))

    getAttrs(attributes, value => {
      idarray.forEach(id => update[`repeating_forms_${id}_specialization`] = value[`repeating_forms_${id}_spec`])
      setAttrs(update);
    });
  });
}