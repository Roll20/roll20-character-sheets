 
on('sheet:opened', () => {
  getAttrs(['latest_version_upgrade'], v => { versioning(parseFloat(v.latest_version_upgrade) || 1); });
});

const versioning = version => {
  const updateMessage = version => console.log(`%c Pendragon 5th Edition is updating to ${version}`, "color: orange; font-weight:bold");

  switch(true) {
    case version < 2.2:
      twopointtwo()
      versioning(2.2)
      console.log(updateMessage(version))
      break;
    default:
        console.log(`%c Pendragon 5th Edition is update to date.`, "color: green; font-weight:bold");
        setAttrs({"latest_versioning_upgrade": version})
  }
};

const twopointtwo = () => setAttrs( { book_entourage: 'entourage' } )
