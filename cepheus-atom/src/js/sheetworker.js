

const int = score => parseInt(score, 10) || 0;

const list = ["str", "dex"];

// tabs

const buttonlist = ["notes","settings","npc","character"];
buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {

        setAttrs({
            sheetTab: button
        });
    });
});

on("sheet:opened", function() {

  getAttrs(["npc", "sheetTab"], values => {

    let npc = int(values["npc"]);
    let sheetTab = values["sheetTab"];
    console.log("sheetTab: ", sheetTab);
    //let page = "character";

    if (sheetTab === "character"){
      npc = 0;
      console.log("sheetTab was char, set NPC=0: ", npc);
    }
    else if (sheetTab === "npc"){
      npc = 1;
      console.log("sheetTab was npc, set NPC=1: ", npc);
    }
    else if (sheetTab === "notes"){
      console.log("sheetTab was note");
    }
    else if (sheetTab === "settings"){
      console.log("sheetTab was settings");
    }
    setAttrs({
        npc: npc
    });
  });
});

on("sheet:opened", function(eventInfo){
    setAttrs({
        fumble_i18n: getTranslationByKey("critical-fumble"),
        success_i18n: getTranslationByKey("critical-success")
    });     
});
