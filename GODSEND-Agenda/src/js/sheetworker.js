

const int = score => parseInt(score, 10) || 0;

// tabs

const buttonlist = ["character", "notes", "settings"];

buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {
      console.log(button + " was pressed");
      setAttrs({
          sheetTab: button
      });
    });
});
