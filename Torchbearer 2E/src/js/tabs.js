const tablist = ["anatomy", "kit", "magic", "relationships", "levels", "roll"];
tablist.forEach(button => {
  on(`clicked:${button}`, function () {
    setAttrs({
      tab: button
    });
  });
});

const modeList = ["editing", "playing"];
modeList.forEach(button => {
  on(`clicked:${button}`, function () {
    setAttrs({
      edit: button
    });
  });
});
