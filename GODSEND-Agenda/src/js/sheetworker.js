
//current sheet version
const currentversion = "1.3.0";

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


// game system

/*
on("change:gametype", function(game) {

  getAttrs("gametype", values => {

    let gametype = values["gametype"];
    console.log("Game System set to: " + gametype);

    let gamedice = "2d10cf0cs0";

    if (gametype === "godsend"){
      gamedice = "2d10cf0cs0";
    }
    else if (gametype === "hellas") {
      gamedice = "1d20";
    }
    else if (gametype === "atlantis") {
      gamedice = "1d20";
    }
    else if (gametype === "talislanta") {
      gamedice = "1d20";
    }
    setAttrs({
        dice: gamedice
    });
  });
}); */

