 
on('sheet:opened', () => {
  getAttrs(['latest_version_upgrade'], v => { versioning(parseFloat(v.version) || 1); });
});

const versioning = version => {
  const updateMessage = version => console.log(`%c Pendragon 5th Edition is updating to ${version}`, "color: orange; font-weight:bold");

  switch(true) {
      case version < 1.1:
        onepointone()
        setAttrs({version: 1.1}, () => versioning(1.1))
        break;
      default:
          console.log(`%c Pendragon 5th Edition is update to date.`, "color: green; font-weight:bold");
  }
};

const onepointone = () => {
  const attributes = ['sheet_type', 'character_type']

  getAttrs(attributes, value => {
    let update = {};
    update.settings_toggle = 0

    if (value.sheet_type === 'feast') {
      update.sheet_type = 'feast record'
      update.sheet_select = value.sheet_type
    } else if (value.sheet_type === 'character') {
      update.sheet_select = value.character_type 
    } else {
      update.sheet_type = value.sheet_type
    }

    setAttrs(update)
  });
}