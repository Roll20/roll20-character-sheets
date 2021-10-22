
//current sheet version
const currentversion = "1.76";

const int = score => parseInt(score, 10) || 0;

const stats = ["str", "dex", "con", "wis", "int", "cha"];
const skillslist = ["acrobatics", "animalhandling", "athletics", "culture", "deception", "engineering", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "pilot", "science", "sleight", "stealth", "survival"];
const statmods = ["str_mod", "dex_mod", "con_mod", "wis_mod", "int_mod", "cha_mod", "prof"];

// Sheet Version
on("sheet:opened", function() {
    getAttrs(["version", "sheettype"], function(v) {
        const version = parseInt(v.version) || 0;
        var attrs = {};

        // get attribute updates for each version until the sheet has completed all steps
        // NOTE: to maintain backwards compatibility with sheets predating the version attribute, all steps will be performed for new sheets
        //if (version < currentversion) {
        //    attrs["version"] = currentversion;
        //}
        
        if (version < currentversion) {
             attrs["version"] = currentversion;
             console.log("Sheet updated to v." + currentversion);
        }

        if (Object.keys(attrs).length) {
            setAttrs(attrs);
        }
    });
});

// tabs

const buttonlist = ["character","background","npc","settings"];
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
    else if (sheetTab === "background"){
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
// Calculate Stat modifier

stats.forEach(stat => {
    on(`change:${stat}`, () => {
        getAttrs([stat], values => {
            const stat_base = int(values[stat]);
            console.log("stat changed");
            console.log(stat_base);
            let stat_mod = 0;
            if (stat_base >= 30) stat_mod = "+10";
            else if (stat_base >= 28) stat_mod = "+9";
            else if (stat_base >= 26) stat_mod = "+8";
            else if (stat_base >= 24) stat_mod = "+7";
            else if (stat_base >= 22) stat_mod = "+6";
            else if (stat_base >= 20) stat_mod = "+5";
            else if (stat_base >= 18) stat_mod = "+4";
            else if (stat_base >= 16) stat_mod = "+3";
            else if (stat_base >= 14) stat_mod = "+2";
            else if (stat_base >= 12) stat_mod = "+1";
            else if (stat_base >= 10) stat_mod = "+0";
            else if (stat_base >= 8) stat_mod = "-1";
            else if (stat_base >= 6) stat_mod = "-2";
            else if (stat_base >= 4) stat_mod = "-3";
            else if (stat_base >= 2) stat_mod = "-4";
            else if (stat_base <= 1) stat_mod = "-5";
            else stat_mod = "+0";
            
            setAttrs({
                [`${stat}_mod`]: stat_mod
            });
        });
    });
});


// skill prof check/uncheck

skillslist.forEach(skillcheckbox => {
    on(`change:${skillcheckbox}_c`, (eventInfo) => {
        console.log("skill prof toggle");
        console.log(skillcheckbox);
        let xbox = skillcheckbox + "_c";

        console.log("xbox defined");
        console.log("xbox is " + xbox);

        let getlist = [ xbox, "acrobatics", "animalhandling", "athletics", "culture", "deception", "engineering", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "pilot", "science", "sleight", "stealth", "survival", "acrobatics_c", "animalhandling_c", "athletics_c", "culture_c", "deception_c", "engineering_c", "history_c", "insight_c", "intimidation_c", "investigation_c", "medicine_c", "nature_c", "perception_c", "performance_c", "persuasion_c", "pilot_c", "science_c", "sleight_c", "stealth_c", "survival_c", "prof"];
        console.log("def getlist");

        getAttrs(getlist, values => {
            console.log("getatt done");
            let checkbox = int(values[xbox]);
            let skillnow = int(values[skillcheckbox]);
            let profval = int(values["prof"]);
            let skillnew = 0;
            console.log("checkbox " + checkbox + "skillnow " + skillnow);

            if (checkbox === 1){
                skillnew = skillnow + profval;
            }
            else{
               skillnew = skillnow - profval; 
            }
            console.log("skillew " + skillnew);

            setAttrs({
                [`${skillcheckbox}`]: skillnew
            });
            console.log("setAttr done");
        });
    });
});


// save prof check/uncheck

stats.forEach(savecheckbox => {
    on(`change:${savecheckbox}_save_c`, (eventInfo) => {
        console.log("save prof toggle");
        console.log(savecheckbox);
        let xbox = savecheckbox + "_save_c";

        console.log("xbox defined");
        console.log("xbox is " + xbox);

        let getlist = [ xbox, "str_save", "dex_save", "con_save", "wis_save", "int_save", "cha_save","str_save_c", "dex_save_c", "con_save_c", "wis_save_c", "int_save_c", "cha_save_c", "prof"];
        console.log("def getlist");

        getAttrs(getlist, values => {
            console.log("getatt done");
            let checkbox = int(values[xbox]);
            let savenow = int(values[`${savecheckbox}_save`]);
            let profval = int(values["prof"]);
            let savenew = 0;
            console.log("checkbox " + checkbox + "savenow " + savenow);

            if (checkbox === 1){
                savenew = savenow + profval;
            }
            else{
               savenew = savenow - profval; 
            }
            console.log("skillew " + savenew);

            setAttrs({
                [`${savecheckbox}_save`]: savenew
            });
            console.log("setAttr done");
        });
    });
});

// proficiency changed, updates skills/saves

on(`change:prof`, eventInfo => {
    console.log("prof change");
    let profold = int(eventInfo.previousValue);
    console.log("eventinfo: " + eventInfo.previousValue);
    let getlist = ["acrobatics", "animalhandling", "athletics", "culture", "deception", "engineering", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "pilot", "science", "sleight", "stealth", "survival", "acrobatics_c", "animalhandling_c", "athletics_c", "culture_c", "deception_c", "engineering_c", "history_c", "insight_c", "intimidation_c", "investigation_c", "medicine_c", "nature_c", "perception_c", "performance_c", "persuasion_c", "pilot_c", "science_c", "sleight_c", "stealth_c", "survival_c", "str_save", "dex_save", "con_save", "wis_save", "int_save", "cha_save","str_save_c", "dex_save_c", "con_save_c", "wis_save_c", "int_save_c", "cha_save_c", "prof", "determination", "determination_max"];

    getAttrs(getlist, values => {

        var update = {};
        let profnew = int(values["prof"]);
        let profdiff = profnew - profold;
        let determination = int(values["determination"]) + profdiff;
        let determination_max = int(values["determination_max"]) + profdiff;

        //manual fix for when you change proficiency for first time
        if (profnew === 3 && profold ===3)( profdiff = 1);

        determination = int(values["determination"]) + profdiff;
        determination_max = int(values["determination_max"]) + profdiff;
        update["determination"] = determination;
        console.log("det worked");
        update["determination_max"] = determination_max;
        console.log("det max worked");

        console.log("profold:" + profold + " profnew:" + profnew + " proffdiff: " + profdiff);

        let xboxlist = ["acrobatics", "animalhandling", "athletics", "culture", "deception", "engineering", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "pilot", "science", "sleight", "stealth", "survival","str_save", "dex_save", "con_save", "wis_save", "int_save", "cha_save"];

        xboxlist.forEach(number => {
            
            let checkbox = int(values[`${number}_c`]);

            if (checkbox === 1) {
                let oldval = int(values[`${number}`]);
                let newval = oldval + profdiff;

                update[number] = newval;
            }

        });

        console.log(update);


        setAttrs(update);

    });
});

// update skills & saves when attr mod changes

statmods.forEach(statmod => {
    on(`change:${statmod}`, eventInfo => {
        console.log("attr mod change");
        console.log("old mod: " + eventInfo.previousValue);
        let temp = eventInfo.previousValue;
        if (temp === undefined){
            temp = 0;
        }else{
            temp = temp.replace('+', '');
        }
        
        let oldstatmod = int(temp);

        console.log("old mod: " + oldstatmod);

        let getlist = ["str_mod", "dex_mod", "con_mod", "wis_mod", "int_mod", "cha_mod", "acrobatics", "animalhandling", "athletics", "culture", "deception", "engineering", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "pilot", "science", "sleight", "stealth", "survival", "str_save", "dex_save", "con_save", "wis_save", "int_save", "cha_save", "prof", "init", "moxie", "ac", "ac_extra", "determination","determination_max"];

        getAttrs(getlist, values => {

            var update = {};

            let modnew = int(values[`${statmod}`]);
            let moddiff = modnew - oldstatmod;

            switch (`${statmod}`) {
                case "str_mod":
                    console.log("oldstatmod: " + oldstatmod + " modnew:" + modnew + " moddiff: " + moddiff);
                    update["athletics"] = int(values["athletics"]) + moddiff;
                    update["str_save"] = int(values["str_save"]) + moddiff;
                    update["bulk"] = 8 + modnew;

                    setAttrs(update);
                    break;
                case "con_mod":
                    //let modnew = int(values[`${statmod}`]);
                    //let moddiff = modnew - oldstatmod;
                    update["con_save"] = int(values["con_save"]) + moddiff;
                    
                    setAttrs(update);
                    break;
                case "dex_mod":
                    update["acrobatics"] = int(values["acrobatics"]) + moddiff;
                    update["pilot"] = int(values["pilot"]) + moddiff;
                    update["sleight"] = int(values["sleight"]) + moddiff;
                    update["stealth"] = int(values["stealth"]) + moddiff;
                    update["ac"] = int(values["ac"]) + moddiff;
                    update["ac_extra"] = int(values["ac_extra"]) + moddiff;
                    update["init"] = int(values["init"]) + moddiff;
                    update["dex_save"] = int(values["dex_save"]) + moddiff;

                    setAttrs(update);
                    break;
                case "int_mod":
                    update["engineering"] = int(values["engineering"]) + moddiff;
                    update["investigation"] = int(values["investigation"]) + moddiff;
                    update["nature"] = int(values["nature"]) + moddiff;
                    update["science"] = int(values["science"]) + moddiff;
                    update["int_save"] = int(values["int_save"]) + moddiff;

                    setAttrs(update);
                    break;
                case "wis_mod":
                    update["animalhandling"] = int(values["animalhandling"]) + moddiff;
                    update["culture"] = int(values["culture"]) + moddiff;
                    update["insight"] = int(values["insight"]) + moddiff;
                    update["medicine"] = int(values["medicine"]) + moddiff;
                    update["perception"] = int(values["perception"]) + moddiff;
                    update["survival"] = int(values["survival"]) + moddiff;
                    update["wis_save"] = int(values["wis_save"]) + moddiff;

                    setAttrs(update);
                    break;
                case "cha_mod":
                    update["deception"] = int(values["deception"]) + moddiff;
                    update["intimidation"] = int(values["intimidation"]) + moddiff;
                    update["performance"] = int(values["performance"]) + moddiff;
                    update["persuasion"] = int(values["persuasion"]) + moddiff;
                    update["moxie"] = int(values["moxie"]) + moddiff;
                    update["cha_save"] = int(values["cha_save"]) + moddiff;

                    setAttrs(update);
                    break;
                default:
                    false;
            }
            console.log(update);

        });
    });
});

