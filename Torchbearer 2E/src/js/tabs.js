const tablist = ["anatomy", "kit", "magic", "relationships", "levels", "roll"];
tablist.forEach(button => {
  on(`clicked:${button}`, function () {
    console.log(`clicked:${button}`);
    setAttrs({
      tab: button
    });
  });
});

const modeList = ["editing", "playing"];
modeList.forEach(button => {
  on(`clicked:${button}`, function () {
    console.log(`clicked:${button}`);
    setAttrs({
      edit: button
    });
  });
});
