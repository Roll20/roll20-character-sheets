async function importChummerChar(attributes, chummerfile, text) {
    var maintab = importMainTabChummer(chummerfile);
    var skilltab = importSkillsTabChummer(text.experimental, chummerfile);
    var magictab = importMagicTabChummer(text.experimental, chummerfile);
    var enhancementtab = importEnhancementTabChummer(text, chummerfile);
    var matrixtab = importMatrixTabChummer(text.experimental, chummerfile);
    var vehiclestab = importVehiclesTabChummer(text.experimental, chummerfile);
    var equipmentstab = importEquipmentTabChummer(text.experimental, chummerfile);
    var socialtab = importSocialTabChummer(chummerfile);

    let results = await Promise.all([maintab, skilltab, enhancementtab, socialtab]);
    let dependingResults = await Promise.all([magictab, matrixtab, vehiclestab, equipmentstab]);

    attributes.warningcheckbox="0";
    attributes.chummercheckbox="0";
    attributes.chummertext= results.join("") + dependingResults.join("") + "\nREMEMBER THIS IS ONLY A HELP AND YOU NEED TO DOUBLE CHECK EVERYTHING."

    return attributes;
}

async function importMainTabChummer(chummerfile) {

    var goodcode = true;
    var error = "";
    var attributes = {};


    try{
        console.log("Character meta info");
        if(chummerfile.characters.character.alias != null)
            attributes.character_name = chummerfile.characters.character.alias;

        if(chummerfile.characters.character.metatype != null)
            attributes.metatype=chummerfile.characters.character.metatype;

        if(chummerfile.characters.character.sex != null)
            attributes.sex=chummerfile.characters.character.sex;

        if(chummerfile.characters.character.age != null)
            attributes.age=chummerfile.characters.character.age;

        if(chummerfile.characters.character.height != null)
            attributes.height=chummerfile.characters.character.height;


        if(chummerfile.characters.character.weight != null)
            attributes.weight=chummerfile.characters.character.weight;
        if(chummerfile.characters.character.playername != null)
            attributes.player=chummerfile.characters.character.playername;
        if(chummerfile.characters.character.description != null)
            attributes.description=chummerfile.characters.character.description;
        if(chummerfile.characters.character.background != null)
            attributes.background=chummerfile.characters.character.background;
        if(chummerfile.characters.character.notes != null)
            attributes.notes=chummerfile.characters.character.notes;
        if(chummerfile.characters.character.gamenotes != null)
            attributes.generalnotes=chummerfile.characters.character.gamenotes;
        if(chummerfile.characters.character.karma != null)
            attributes.karma=chummerfile.characters.character.karma;
        if(chummerfile.characters.character.totalkarma != null)
            attributes.karmacareer=chummerfile.characters.character.totalkarma;
        if(chummerfile.characters.character.initbonus != null){
            attributes.initiativebonus=chummerfile.characters.character.initbonus;
            attributes.astralinitiativebonus=chummerfile.characters.character.initbonus;
            attributes.matrixinitiativebonus=chummerfile.characters.character.initbonus;
        }
        if(chummerfile.characters.character.initdice != null)
            attributes.initiativedice=chummerfile.characters.character.initdice;
        if(chummerfile.characters.character.astralinitdice != null)
            attributes.astralinitiativedice=chummerfile.characters.character.astralinitdice;
        if(chummerfile.characters.character.cmthresholdoffset != null)
            attributes.woundadditive=chummerfile.characters.character.cmthresholdoffset;
        if(chummerfile.characters.character.cmthreshold != null)
            attributes.woundmultiplikative=chummerfile.characters.character.cmthreshold;
        if(chummerfile.characters.character.cmoverflow != null)
            attributes.overflowmod=chummerfile.characters.character.cmoverflow-chummerfile.characters.character.attributes[1].attribute[0].total- 1;
        if(chummerfile.characters.character.physicalcm != null)
            attributes.physicaltrackmod=chummerfile.characters.character.physicalcm-Math.ceil(chummerfile.characters.character.attributes[1].attribute[0].total/2)- 8;
        if(chummerfile.characters.character.stuncm != null)
            attributes.stuntrackmod=chummerfile.characters.character.stuncm-Math.ceil(chummerfile.characters.character.attributes[1].attribute[7].total/2)- 8;
        if(chummerfile.characters.character.totalstreetcred != null)
            attributes.streetcred=chummerfile.characters.character.totalstreetcred;
        if(chummerfile.characters.character.totalnotoriety != null)
            attributes.notoriety=chummerfile.characters.character.totalnotoriety;
        if(chummerfile.characters.character.totalpublicawareness != null)
            attributes.pawareness=chummerfile.characters.character.totalpublicawareness;
        if(chummerfile.characters.character.nuyen != null)
            attributes.nuyen_total=chummerfile.characters.character.nuyen;
        if(chummerfile.characters.character.magician == "True"){
            // HeroLab 'chummer' export uses drainattribute property and a list, this is a workaround for that
            try{
              attributes.drainattribute="@{"+chummerfile.characters.character.tradition.drainattributes.match(/[A-Z]+/g)[1].toLowerCase()+"_total}";
            } catch(err)
            {
              attributes.drainattribute="@{"+chummerfile.characters.character.tradition.drainattribute.attr[1]+"_total}";
            }
        }
    }catch(err){
        goodcode = false;
        error = "Error with Character Info " + err;
    }

    try{
        console.log("Importing Attributes");
        var attributesChummer = chummerfile.characters.character.attributes[1].attribute;
        attributes.bod_base = attributesChummer.find(a => a.name_english === "BOD").base;
        attributes.agi_base = attributesChummer.find(a => a.name_english === "AGI").base;
        attributes.rea_base = attributesChummer.find(a => a.name_english === "REA").base;
        attributes.str_base = attributesChummer.find(a => a.name_english === "STR").base;
        attributes.cha_base = attributesChummer.find(a => a.name_english === "CHA").base;
        attributes.int_base = attributesChummer.find(a => a.name_english === "INT").base;
        attributes.log_base = attributesChummer.find(a => a.name_english === "LOG").base;
        attributes.wil_base = attributesChummer.find(a => a.name_english === "WIL").base;
        attributes.edg_total = attributesChummer.find(a => a.name_english === "EDG").base;
        if(chummerfile.characters.character.technomancer==="True"){
            attributes.mag_base=attributesChummer.find(a => a.name_english === "RES").total;
            attributes.istechnomancer = 1;
        }
        else if(chummerfile.characters.character.magician==="True" || chummerfile.characters.character.adept==="True"){
            attributes.mag_base=attributesChummer.find(a => a.name_english === "MAG").total;
            attributes.istechnomancer = 0;
        }
        else {
            attributes.mag_base = 0;
            attributes.istechnomancer = 0;
        }
        attributes.bod_aug = attributesChummer.find(a => a.name_english === "BOD").total-attributesChummer.find(a => a.name_english === "BOD").base;
        attributes.agi_aug = attributesChummer.find(a => a.name_english === "AGI").total-attributesChummer.find(a => a.name_english === "AGI").base;
        attributes.rea_aug = attributesChummer.find(a => a.name_english === "REA").total-attributesChummer.find(a => a.name_english === "REA").base;
        attributes.str_aug = attributesChummer.find(a => a.name_english === "STR").total-attributesChummer.find(a => a.name_english === "STR").base;
        attributes.cha_aug = attributesChummer.find(a => a.name_english === "CHA").total-attributesChummer.find(a => a.name_english === "CHA").base;
        attributes.int_aug = attributesChummer.find(a => a.name_english === "INT").total-attributesChummer.find(a => a.name_english === "INT").base;
        attributes.log_aug = attributesChummer.find(a => a.name_english === "LOG").total-attributesChummer.find(a => a.name_english === "LOG").base;
        attributes.wil_aug = attributesChummer.find(a => a.name_english === "WIL").total-attributesChummer.find(a => a.name_english === "WIL").base;
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Attributes " +err
    }

    if(goodcode){
        try{
            setAttrs(attributes);
            return "Main Tab import successfull\n";
        } catch(err){
            return "Error setting Attributes: " + err;
        }
    } else{
        return error;
    }
}

async function importSkillsTabChummer(experimental, chummerfile) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    var index=[];
    for(var i=1;i<73;i++)
    {
        var name='skillname'+i;
        index[i-1]=name;
    }

    var names = await asw.getAttrs(index);
    var exotics=73;
    try{
        console.log("Importing Skills");
        for(var i=0;i<chummerfile.characters.character.skills.skill.length;i++){
            if(chummerfile.characters.character.skills.skill[i].knowledge=="True"){
                var newrowid = generateRowID();
                attributes["repeating_knowledge_"+newrowid+"_knowledgename"]=chummerfile.characters.character.skills.skill[i].name;
                if(chummerfile.characters.character.skills.skill[i].skillcategory_english!=null){
                  attributes["repeating_knowledge_"+newrowid+"_knowledgeattr"]="@{"+chummerfile.characters.character.skills.skill[i].skillcategory_english.toLowerCase();
                }
                if(chummerfile.characters.character.skills.skill[i].rating > 0){
                    attributes["repeating_knowledge_"+newrowid+"_knowledgerating"] = chummerfile.characters.character.skills.skill[i].rating;
                    attributes["repeating_knowledge_"+newrowid+"_knowledgebonus"] = chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod;
                }else{
                    attributes["repeating_knowledge_"+newrowid+"_knowledgerating"] = "-1";
                    attributes["repeating_knowledge_"+newrowid+"_knowledgebonus"] = chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod+1;
                }
                if(chummerfile.characters.character.skills.skill[i].spec != null) {
                    attributes["repeating_knowledge_"+newrowid+"_knowledgespec"] = chummerfile.characters.character.skills.skill[i].spec;
                }
                else
                    attributes["repeating_knowledge_"+newrowid+"_knowledgespec"] = "none";
            }

            if(chummerfile.characters.character.skills.skill[i].exotic=="True"){
                attributes["skillname"+exotics]=chummerfile.characters.character.skills.skill[i].name_english;
                if(chummerfile.characters.character.skills.skill[i].rating>0){
                    attributes["skillbonus"+exotics]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod;
                    attributes["skillrating"+exotics]=chummerfile.characters.character.skills.skill[i].rating;
                }else{
                    attributes["skillrating"+exotics]="-1";
                    attributes["skillbonus"+exotics]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod+1;
                }
                attributes["skillattr"+exotics]="@{"+chummerfile.characters.character.skills.skill[i].attribute.toLowerCase();

                if(chummerfile.characters.character.skills.skill[i].spec != null)
                    attributes["skillspec"+exotics] = chummerfile.characters.character.skills.skill[i].spec;
                else
                    attributes["skillspec"+exotics]="none";
                exotics++;
            }

            for(var j=1;j<73;j++){
                var compname='skillname'+j;
                if((names[compname]==chummerfile.characters.character.skills.skill[i].name_english)||(chummerfile.characters.character.skills.skill[i].name_english=="Locksmith"&&j==29)||(chummerfile.characters.character.skills.skill[i].name_english=="Pilot Ground Craft"&&j==55)){
                    attributes["skillattr"+j]="@{"+chummerfile.characters.character.skills.skill[i].attribute.toLowerCase();
                    if(chummerfile.characters.character.skills.skill[i].rating>0){
                        attributes["skillrating"+j]=chummerfile.characters.character.skills.skill[i].rating;
                        attributes["skillbonus"+j]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod;
                    }else{
                        attributes["skillrating"+j]="-1";
                        attributes["skillbonus"+j]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod+1;
                    }

                    if(chummerfile.characters.character.skills.skill[i].spec != null) {
                        attributes["skillspec"+j] = chummerfile.characters.character.skills.skill[i].spec;
                    }
                    else {
                        attributes["skillspec"+j]="none";
                    }
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Skills: "+ err;
    }

    if(goodcode){
        try{
            clearSkills(experimental);
            setAttrs(attributes);
            return "Skill Tab import successfull\n";
        } catch(err){
            return "Error setting Attributes: " + err;
        }
    } else{
        return error;
    }
}

async function importMagicTabChummer(experimental, chummerfile) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    try{

        var alchemy = 0;
        var spellcasting = 0;
        var ritual = 0;

         for(var i=0;i<chummerfile.characters.character.skills.skill.length;i++){
            if(chummerfile.characters.character.skills.skill[i].name_english=="Alchemy"){
                alchemy=i;
            }
            if(chummerfile.characters.character.skills.skill[i].name_english=="Spellcasting"){
                spellcasting=i;
            }
            if(chummerfile.characters.character.skills.skill[i].name_english=="Ritual Spellcasting"){
                ritual=i;
            }
        }

        if(chummerfile.characters.character.spells != null){
            console.log("Importing spells");
            var spellcastingSkill = chummerfile.characters.character.skills.skill[spellcasting].total;
            var ritualSkill = chummerfile.characters.character.skills.skill[ritual].total;
            var alchemySkill = chummerfile.characters.character.skills.skill[alchemy].total;

            if(chummerfile.characters.character.spells.spell.length > 1){
                for(var i=0; i < chummerfile.characters.character.spells.spell.length; i++){
                    importSingleSpell(chummerfile.characters.character.spells.spell[i], attributes, spellcastingSkill, ritualSkill, alchemySkill);
                }
            }else{
                importSingleSpell(chummerfile.characters.character.spells.spell, attributes, spellcastingSkill, ritualSkill, alchemySkill);
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Spells: " + err;
    }

    try{
        if(chummerfile.characters.character.complexforms != null){
            console.log("Importing complexforms");
            if(chummerfile.characters.character.complexforms.complexform.length>1){
                for(var i=0; i<chummerfile.characters.character.complexforms.complexform.length; i++){
                    var newrowid=generateRowID();
                    attributes["repeating_complexforms_"+newrowid+"_spellname"]=chummerfile.characters.character.complexforms.complexform[i].name;
                    attributes["repeating_complexforms_"+newrowid+"_spellschool"]="@{skilldicepool42}";
                    attributes["repeating_complexforms_"+newrowid+"_spellduration"]=chummerfile.characters.character.complexforms.complexform[i].duration;
                    if(chummerfile.characters.character.complexforms.complexform[i].fv.match(/(\-|\+)\d/)!=null){
                        attributes["repeating_complexforms_"+newrowid+"_spelldrain"]=chummerfile.characters.character.complexforms.complexform[i].fv.match(/(\-|\+)\d/);
                    }else{
                        attributes["repeating_complexforms_"+newrowid+"_spelldrain"]="-0";
                    }
                }
            }else{
                var newrowid=generateRowID();
                attributes["repeating_complexforms_"+newrowid+"_spellname"]=chummerfile.characters.character.complexforms.complexform.name;
                attributes["repeating_complexforms_"+newrowid+"_spellschool"]="@{skilldicepool42}";
                attributes["repeating_complexforms_"+newrowid+"_spellduration"]=chummerfile.characters.character.complexforms.complexform.duration;
                if(chummerfile.characters.character.complexforms.complexform.fv.match(/(\-|\+)\d/)!=null)
                    attributes["repeating_complexforms_"+newrowid+"_spelldrain"]=chummerfile.characters.character.complexforms.complexform.fv.match(/(\-|\+)\d/);
                else
                    attributes["repeating_complexforms_"+newrowid+"_spelldrain"]="-0";
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Complex-Forms " +err
    }

    try{
        if(chummerfile.characters.character.critterpowers != null){
            console.log("Importing critter powers");
            if(chummerfile.characters.character.critterpowers.critterpower.length > 1){
                for(var i=0; i < chummerfile.characters.character.critterpowers.critterpower.length; i++){
                    var newrowid=generateRowID();
                    attributes["repeating_critterpowers_"+newrowid+"_spellname"]=chummerfile.characters.character.critterpowers.critterpower[i].fullname;
                    attributes["repeating_critterpowers_"+newrowid+"_spelltype"]=chummerfile.characters.character.critterpowers.critterpower[i].type;
                    if(chummerfile.characters.character.critterpowers.critterpower[i].notes != null){
                        attributes["repeating_critterpowers_"+newrowid+"_spelldescription"] = chummerfile.characters.character.critterpowers.critterpower[i].notes;
                    }
                    attributes["repeating_critterpowers_"+newrowid+"_spelldrain"]="-0";

                    attributes["repeating_critterpowers_"+newrowid+"_spellcategory"] = chummerfile.characters.character.critterpowers.critterpower[i].category;
                    attributes["repeating_critterpowers_"+newrowid+"_spellbonus"]=0;

                    if(chummerfile.characters.character.critterpowers.critterpower[i].range != null){
                        attributes["repeating_critterpowers_"+newrowid+"_spellrange"]=chummerfile.characters.character.critterpowers.critterpower[i].range;
                    } else {
                        attributes["repeating_critterpowers_"+newrowid+"_spellrange"]="N/A";
                    }

                    if(chummerfile.characters.character.critterpowers.critterpower[i].duration != null) {
                        attributes["repeating_critterpowers_"+newrowid+"_spellduration"] = chummerfile.characters.character.critterpowers.critterpower[i].duration;
                    } else {
                        attributes["repeating_critterpowers_"+newrowid+"_spellduration"] = "N/A";
                    }

                }
            }else{
                var newrowid=generateRowID();
                attributes["repeating_critterpowers_"+newrowid+"_spellname"]=chummerfile.characters.character.critterpowers.critterpower.fullname;
                attributes["repeating_critterpowers_"+newrowid+"_spelltype"]=chummerfile.characters.character.critterpowers.critterpower.type;
                if(chummerfile.characters.character.critterpowers.critterpower.notes!=null){
                        attributes["repeating_critterpowers_"+newrowid+"_spelldescription"]=chummerfile.characters.character.critterpowers.critterpower.notes;
                    }
                attributes["repeating_critterpowers_"+newrowid+"_spelldrain"]="-0";
                attributes["repeating_critterpowers_"+newrowid+"_spellcategory"]=chummerfile.characters.character.critterpowers.critterpower.category;
                attributes["repeating_critterpowers_"+newrowid+"_spellbonus"]=0;

                if(chummerfile.characters.character.critterpowers.critterpower.range != null){
                    attributes["repeating_critterpowers_"+newrowid+"_spellrange"]=chummerfile.characters.character.critterpowers.critterpower.range;
                } else {
                    attributes["repeating_critterpowers_"+newrowid+"_spellrange"]="N/A";
                }

                if(chummerfile.characters.character.critterpowers.critterpower.duration != null) {
                    attributes["repeating_critterpowers_"+newrowid+"_spellduration"]=chummerfile.characters.character.critterpowers.critterpower.duration;
                } else {
                    attributes["repeating_critterpowers_"+newrowid+"_spellduration"]="N/A";
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Critterpowers: " + err;
    }

    try{
        if(chummerfile.characters.character.initiategrade != null && chummerfile.characters.character.initiategrade != 0) {
            console.log("Importing initiategrade and metamagic");
            attributes.initiationgrade = chummerfile.characters.character.initiategrade;
            if(chummerfile.characters.character.metamagics != null){
                if(chummerfile.characters.character.metamagics.metamagic.length>1){
                    for(var i=0;i<chummerfile.characters.character.metamagics.metamagic.length;i++){
                        var newrowid=generateRowID();
                        attributes["repeating_initiation_"+newrowid+"_metamagicname"]=chummerfile.characters.character.metamagics.metamagic[i].name;
                        if(chummerfile.characters.character.metamagics.metamagic[i].notes != null) {
                            attributes["repeating_initiation_"+newrowid+"_metamagicdescription"]=chummerfile.characters.character.metamagics.metamagic[i].notes
                        }
                    }
                } else {
                    var newrowid=generateRowID();
                    attributes["repeating_initiation_"+newrowid+"_metamagicname"]=chummerfile.characters.character.metamagics.metamagic.name;
                    if(chummerfile.characters.character.metamagics.metamagic.notes != null) {
                            attributes["repeating_initiation_"+newrowid+"_metamagicdescription"]=chummerfile.characters.character.metamagics.metamagic.notes
                        }
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Initiations " +err
    }

    if(goodcode){
        try{
            clearMagic(experimental);
            setAttrs(attributes);
            return "Magic Tab import successfull\n";
        } catch(err){
            return "Error setting Attributes: " + err;
        }
    } else{
        return error;
    }
}

async function importEnhancementTabChummer(text, chummerfile) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    try{
        if(chummerfile.characters.character.qualities != null){
            console.log("Importing qualities");
            if(chummerfile.characters.character.qualities.quality.length>1){
                for(var i=0;i<chummerfile.characters.character.qualities.quality.length;i++){
                    var newrowid=generateRowID();
                    if(chummerfile.characters.character.qualities.quality[i].qualitytype_english == "Negative")
                    {
                        attributes["repeating_negqualities_"+newrowid+"_negqualityname"]=chummerfile.characters.character.qualities.quality[i].name;

                        if(chummerfile.characters.character.qualities.quality[i].extra != null) {
                            attributes["repeating_negqualities_"+newrowid+"_negqualitydescription"]=chummerfile.characters.character.qualities.quality[i].extra;
                        }

                        attributes["repeating_negqualities_"+newrowid+"_negqualitykarma"]=chummerfile.characters.character.qualities.quality[i].bp;

                        if(chummerfile.characters.character.qualities.quality[i].notes != null) {
                            attributes["repeating_negqualities_"+newrowid+"_negqualnotes"]=chummerfile.characters.character.qualities.quality[i].notes;
                        }
                        else {
                            attributes["repeating_negqualities_"+newrowid+"_negqualnotes"]="";
                        }
                    }
                    else
                    {
                        attributes["repeating_posqualities_"+newrowid+"_posqualityname"]=chummerfile.characters.character.qualities.quality[i].name;
                        if(chummerfile.characters.character.qualities.quality[i].extra != null) {
                            attributes["repeating_posqualities_"+newrowid+"_posqualitydescription"]=chummerfile.characters.character.qualities.quality[i].extra;
                        }
                        attributes["repeating_posqualities_"+newrowid+"_posqualitykarma"]=chummerfile.characters.character.qualities.quality[i].bp;
                        if(chummerfile.characters.character.qualities.quality[i].notes != null) {
                            attributes["repeating_posqualities_"+newrowid+"_posqualnotes"]=chummerfile.characters.character.qualities.quality[i].notes;
                        }
                        else {
                            attributes["repeating_posqualities_"+newrowid+"_posqualnotes"]="";
                        }
                    }
                }
            }else if(chummerfile.characters.character.qualities.quality != null){
                var newrowid=generateRowID();
                if(chummerfile.characters.character.qualities.quality.qualitytype_english=="Negative")
                {
                    attributes["repeating_negqualities_"+newrowid+"_negqualityname"]=chummerfile.characters.character.qualities.quality.name;
                    if(chummerfile.characters.character.qualities.quality.extra != null) {
                        attributes["repeating_negqualities_"+newrowid+"_negqualitydescription"]=chummerfile.characters.character.qualities.quality.extra;
                    }
                    attributes["repeating_negqualities_"+newrowid+"_negqualitykarma"]=chummerfile.characters.character.qualities.quality.bp;
                    if(chummerfile.characters.character.qualities.quality.notes != null) {
                        attributes["repeating_negqualities_"+newrowid+"_negqualnotes"]=chummerfile.characters.character.qualities.quality.notes;
                    }
                }
                else
                {
                    attributes["repeating_posqualities_"+newrowid+"_posqualityname"] = chummerfile.characters.character.qualities.quality.name;
                    if(chummerfile.characters.character.qualities.quality.extra != null) {
                        attributes["repeating_posqualities_"+newrowid+"_posqualitydescription"] = chummerfile.characters.character.qualities.quality.extra;
                    }
                    attributes["repeating_posqualities_"+newrowid+"_posqualitykarma"] = chummerfile.characters.character.qualities.quality.bp;
                    if(chummerfile.characters.character.qualities.quality.notes != null) {
                       attributes["repeating_posqualities_"+newrowid+"_posqualnotes"] = chummerfile.characters.character.qualities.quality.notes;
                    }
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Qualities " +err
    }

    try{
        if(chummerfile.characters.character.powers != null){
            console.log("Importing Adept Powers");
            if(chummerfile.characters.character.powers.power.length>1){
                for(var i=0;i<chummerfile.characters.character.powers.power.length;i++){
                    var newrowid=generateRowID();
                    attributes["repeating_powers_"+newrowid+"_poweryname"]=chummerfile.characters.character.powers.power[i].name;
                    attributes["repeating_powers_"+newrowid+"_powerdescription"]=chummerfile.characters.character.powers.power[i].rating;
                    attributes["repeating_powers_"+newrowid+"_powerpoints"]=chummerfile.characters.character.powers.power[i].totalpoints;
                    if(chummerfile.characters.character.powers.power[i].notes != null) {
                        attributes["repeating_powers_"+newrowid+"_powernotes"]=chummerfile.characters.character.powers.power[i].notes;
                    }

                }
            }else{
                var newrowid=generateRowID();
                attributes["repeating_powers_"+newrowid+"_poweryname"]=chummerfile.characters.character.powers.power.name;
                attributes["repeating_powers_"+newrowid+"_powerdescription"]=chummerfile.characters.character.powers.power.rating;
                attributes["repeating_powers_"+newrowid+"_powerpoints"]=chummerfile.characters.character.powers.power.totalpoints;
                if(chummerfile.characters.character.powers.power.notes != null) {
                        attributes["repeating_powers_"+newrowid+"_powernotes"]=chummerfile.characters.character.powers.power.notes;
                    }
            }
        }
    }catch(err){
        goodcode=false;
        error="Error with Powers " +err
    }

    try{
        var essence=0.0;
        if(chummerfile.characters.character.cyberwares != null){
            console.log("Importing Cyberware");
            if(chummerfile.characters.character.cyberwares.cyberware.length > 1){
                for(var i=0; i< chummerfile.characters.character.cyberwares.cyberware.length; i++){
                    var newrowid=generateRowID();
                    attributes["repeating_ware_"+newrowid+"_warename"]=chummerfile.characters.character.cyberwares.cyberware[i].name;
                    attributes["repeating_ware_"+newrowid+"_waredescription"]=chummerfile.characters.character.cyberwares.cyberware[i].rating;
                    attributes["repeating_ware_"+newrowid+"_waregrade"]=chummerfile.characters.character.cyberwares.cyberware[i].grade;
                    attributes["repeating_ware_"+newrowid+"_warekarma"]=chummerfile.characters.character.cyberwares.cyberware[i].ess;
                    essence += Number(chummerfile.characters.character.cyberwares.cyberware[i].ess.replace(",","."));
                }
            }else{
                var newrowid=generateRowID();
                attributes["repeating_ware_"+newrowid+"_warename"]=chummerfile.characters.character.cyberwares.cyberware.name;
                attributes["repeating_ware_"+newrowid+"_waredescription"]=chummerfile.characters.character.cyberwares.cyberware.rating;
                attributes["repeating_ware_"+newrowid+"_waregrade"]=chummerfile.characters.character.cyberwares.cyberware.grade;
                attributes["repeating_ware_"+newrowid+"_warekarma"]=chummerfile.characters.character.cyberwares.cyberware.ess;
                essence+=Number(chummerfile.characters.character.cyberwares.cyberware.ess.replace(",","."));
            }
        }
        attributes.ess_total=6-essence;
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Ware " +err
    }

    try{
        if(chummerfile.characters.character.martialarts != null){
            console.log("Importing martialarts");
            if(chummerfile.characters.character.martialarts.martialart.length>1){
                for(var i=0;i<chummerfile.characters.character.martialarts.martialart.length;i++){
                    if(chummerfile.characters.character.martialarts.martialart[i].martialarttechniques != null){
                        if(chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.length > 1){
                            for(var j=0; j < chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.length; j++){
                                var newrowid=generateRowID();
                                attributes["repeating_martial_"+newrowid+"_martialname"] = chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechnique[j].name;
                                attributes["repeating_martial_"+newrowid+"_martialdescription"] = chummerfile.characters.character.martialarts.martialart[i].name;
                                if(chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechnique[j].notes != undefined) {
                                    attributes["repeating_martial_"+newrowid+"_martialnotes"] = chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechnique[j].notes;
                                }
                            }
                        }else{
                            console.log(chummerfile.characters.character.martialarts.martialart[i]);
                            var newrowid=generateRowID();
                            attributes["repeating_martial_"+newrowid+"_martialname"]=chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechnique.name;
                            attributes["repeating_martial_"+newrowid+"_martialdescription"]=chummerfile.characters.character.martialarts.martialart[i].name;
                            if(chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechnique.notes != undefined) {
                                attributes["repeating_martial_"+newrowid+"_martialnotes"] = chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechnique.notes;
                            }
                        }
                    }
                }
            }else{
                if(chummerfile.characters.character.martialarts.martialart.martialarttechniques != null){
                    if(chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique.length>1){
                        for(var j=0;j<chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique.length;j++){
                            var newrowid=generateRowID();
                            attributes["repeating_martial_"+newrowid+"_martialname"]=chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique[j].name;
                            attributes["repeating_martial_"+newrowid+"_martialdescription"]=chummerfile.characters.character.martialarts.martialart.name;
                            if(chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique[j].notes != undefined) {
                                attributes["repeating_martial_"+newrowid+"_martialnotes"] = chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique[j].notes;
                            }
                        }
                    }else{
                        var newrowid=generateRowID();
                        attributes["repeating_martial_"+newrowid+"_martialname"]=chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique.name;
                        attributes["repeating_martial_"+newrowid+"_martialdescription"]=chummerfile.characters.character.martialarts.martialart.name;
                        if(chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique.notes != undefined) {
                            attributes["repeating_martial_"+newrowid+"_martialnotes"] = chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique.notes;
                        }
                    }
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Martial Arts " +err
    }

    if(goodcode){
        try{
            clearEnhancements(text.experimental);
            setAttrs(attributes);
            return "Enhancement Tab import successfull\n";
        } catch(err){
            return "Error setting Attributes: " + err;
        }
    } else{
        return error;
    }
}

async function importMatrixTabChummer(experimental, chummerfile) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    try{
       if(chummerfile.characters.character.gears != null){
            console.log("Importing Cyberdeck");
            let decks = chummerfile.characters.character.gears.gear.filter(gear => gear.category_english == "Cyberdecks" || gear.category_english == "Rigger Command Consoles").sort((g1,g2) => g1.devicerating < g2.devicerating);
            if(decks.length > 0) {
                cyberdeck = decks[0];
                attributes.attack_base = cyberdeck.attack;
                attributes.sleaze_base = cyberdeck.sleaze;
                attributes.datap_base = cyberdeck.dataprocessing;
                attributes.firewall_base = cyberdeck.firewall;
                attributes.devicertg_base = cyberdeck.devicerating;
            }
            else {
                let commlinks = chummerfile.characters.character.gears.gear.filter(gear => gear.category_english == "Commlinks").sort((g1,g2) => g1.devicerating < g2.devicerating);
                if(commlinks.length > 0) {
                    link = commlinks[0];
                    attributes.attack_base = link.attack;
                    attributes.sleaze_base = link.sleaze;
                    attributes.datap_base = link.dataprocessing;
                    attributes.firewall_base = link.firewall;
                    attributes.devicertg_base = link.devicerating;
                }
            }
        }
    }catch(err){
       goodcode=false;
       error= error + "\n" + "Error with Cyberdeck: " + err;
    }

    try {
        if(chummerfile.characters.character.aiprograms != null){
            console.log("Importing ai programs");
            if(chummerfile.characters.character.aiprograms.aiprogram.length > 1){
                for(var i=0; i < chummerfile.characters.character.aiprograms.aiprogram.length; i++){
                    var newrowid=generateRowID();
                    attributes["repeating_programs_"+newrowid+"_programname"]=chummerfile.characters.character.aiprograms.aiprogram[i].name;
                }
            }
            else {
                var newrowid=generateRowID();
                attributes["repeating_programs_"+newrowid+"_programname"] = chummerfile.characters.character.aiprograms.aiprogram.name;
            }
        }
    }catch(err){
           goodcode=false;
           error= error + "\n" + "Error with AI programs " +err
    }

    try{
        if(chummerfile.characters.character.gears != null){
            console.log("Importing programs");
            if(chummerfile.characters.character.gears.gear.length>1){
                for(var i=0;i<chummerfile.characters.character.gears.gear.length;i++){
                    var newrowid=generateRowID();
                    if((chummerfile.characters.character.gears.gear[i].category_english == "Common Programs")||(chummerfile.characters.character.gears.gear[i].category_english == "Hacking Programs")){
                        attributes["repeating_programs_"+newrowid+"_programname"]=chummerfile.characters.character.gears.gear[i].name;
                    } else {
                        if(chummerfile.characters.character.gears.gear[i].name != null){
                            if(chummerfile.characters.character.gears.gear[i].children != null){
                                if(chummerfile.characters.character.gears.gear[i].children.gear.length > 1){
                                    for(var j=0; j<chummerfile.characters.character.gears.gear[i].children.gear.length; j++){
                                        if(chummerfile.characters.character.gears.gear[i].children.gear[j].category_english == "Common Programs"||chummerfile.characters.character.gears.gear[i].children.gear[j].category_english == "Hacking Programs"){
                                            var newrowidb=generateRowID();
                                            attributes["repeating_programs_"+newrowidb+"_programname"] = chummerfile.characters.character.gears.gear[i].children.gear[j].name;
                                        }
                                    }
                                } else{
                                    if(chummerfile.characters.character.gears.gear[i].children.gear.category_english  ==  "Common Programs"||chummerfile.characters.character.gears.gear[i].children.gear.category_english == "Hacking Programs"){
                                        var newrowidb=generateRowID();
                                        attributes["repeating_programs_"+newrowidb+"_programname"]=chummerfile.characters.character.gears.gear[i].children.gear.name;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }catch(err){
        goodcode = false;
        error= error + "\n" + "Error with Gear " +err
    }

    if(goodcode){
        try{
            clearMatrix(experimental);
            setAttrs(attributes);
            return "Matrix Tab import successfull\n";
        } catch(err){
            return "Error setting Attributes: " + err;
        }
    } else{
        return error;
    }
}

async function importVehiclesTabChummer(experimental, chummerfile) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    try{
        if(chummerfile.characters.character.vehicles != null){
            console.log("Importing vehicles");
            if(chummerfile.characters.character.vehicles.vehicle.length > 1){
                let vehicles = chummerfile.characters.character.vehicles.vehicle.filter( vehicle => vehicle.seats > 0);
                for(var i=0; i < vehicles.length; i++){
                    importSingleVehicle(vehicles[i], attributes);
                }
            } else {
                if(chummerfile.characters.character.vehicles.vehicle.seats > 0) {
                    importSingleVehicle(chummerfile.characters.character.vehicles.vehicle, attributes);
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Vehicles: " + err;
    }

    try{
        if(chummerfile.characters.character.vehicles != null){
            console.log("Importing drones");
            if(chummerfile.characters.character.vehicles.vehicle.length > 1){
                let drones = chummerfile.characters.character.vehicles.vehicle.filter( vehicle => vehicle.seats == 0);
                for(var i=0; i < drones.length; i++){
                    importSingleDrone(drones[i], attributes);
                }
            } else {
                if(chummerfile.characters.character.vehicles.vehicle.seats == 0) {
                    importSingleDrone(chummerfile.characters.character.vehicles.vehicle, attributes);
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Vehicles: " + err;
    }

    if(goodcode){
        try{
            clearVehicles(experimental);
            setAttrs(attributes);
            return "Vehicles Tab import successfull\n";
        } catch(err){
            return "Error setting Attributes: " + err;
        }
    } else{
        return error;
    }
}

async function importEquipmentTabChummer(experimental, chummerfile) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    if(chummerfile.characters.character.armors != null){
        console.log("Importing armors");
        if(chummerfile.characters.character.armors.armor.length > 1){
            chummerfile.characters.character.armors.armor.forEach(async(armor) => {
                try{
                    importSingleArmor(armor, attributes);
                }catch(err){
                    goodcode = false;
                    error= error + "\n" + "Error with Armor " + armor.name + ": " + err
                }
            })
        }else{
            try{
                importSingleArmor(chummerfile.characters.character.armors.armor, attributes);
            }catch(err){
                goodcode = false;
                error= error + "\n" + "Error with Armor " + chummerfile.characters.character.armors.armor.name + ": " + err
            }
        }
    }

    if(chummerfile.characters.character.cyberwares != null){
        console.log("Importing Cyberware Armor");
        if(chummerfile.characters.character.cyberwares.cyberware.length > 1){
            chummerfile.characters.character.cyberwares.cyberware.forEach(cyberware =>  importCyberwareArmor(cyberware, attributes));
        }else{
            importCyberwareArmor(chummerfile.characters.character.cyberwares.cyberware, attributes);
        }
    }

    if(chummerfile.characters.character.otherarmors != null){
        console.log("Importing Other Armors");
        if(chummerfile.characters.character.otherarmors.otherarmor.length > 1){
            chummerfile.characters.character.otherarmors.otherarmor.forEach(armor =>  importOtherArmor(armor, attributes));
        }else{
            importOtherArmor(chummerfile.characters.character.otherarmors.otherarmor, attributes);
        }
    }

    if(chummerfile.characters.character.weapons != null){
        console.log("Importing weapons");
        for(var i=1; i<9; i++){
            attributes["weaponismelee"+i] = "on";
            attributes["weaponname"+i] = "";
            attributes["weaponcategory"+i] = "@{skilldicepool49}";
            attributes["weaponspec"+i] = "0";
            attributes["weaponbonus"+i] = "0";
            attributes["weaponaccuracy"+i] = "0";
            attributes["weapondv"+i] = "0";
            attributes["weapondmgtype"+i] = "P";
            attributes["weaponap"+i] = "0";
            attributes["weaponrc"+i] = "0";
            attributes["weaponmode"+i] = "11";
            attributes["weaponnotes"+i] = "";
        }
        ammunition = [];
        if(chummerfile.characters.character.gears != null) {
            for( var j = 0; j < chummerfile.characters.character.gears.gear.length; j++) {
                if(chummerfile.characters.character.gears.gear[j].category_english.includes("Ammunition") ||
                    chummerfile.characters.character.gears.gear[j].name_english == "Micro Flares"
                ){
                    ammunition.push(chummerfile.characters.character.gears.gear[j]);
                }
            }
        }

        //load agi + str for dice calculation
        let charAttributes = await asw.getAttrs(["agi_base", "agi_aug", "str_base", "str_aug"]);
        attributes = Object.assign(attributes, charAttributes);

        if(chummerfile.characters.character.weapons.weapon.length > 1){
            for(var i=1; i<chummerfile.characters.character.weapons.weapon.length+1; i++){
                try{
                    if(i < 9) {
                        importSingleWeapon(chummerfile.characters.character.weapons.weapon[i-1], i, ammunition, attributes);
                    }
                    await importSingleRepeatingWeapon(chummerfile.characters.character.weapons.weapon[i-1], ammunition, attributes);
                }
                catch(err) {
                    goodcode=false;
                    error= error + "\n" + "Error with Weapon " + chummerfile.characters.character.weapons.weapon[i-1].name + ": " +err
                }
            }
        }else{
            try{
                importSingleWeapon(chummerfile.characters.character.weapons.weapon, 1, ammunition, attributes);
            }
            catch(err) {
                goodcode=false;
                error= error + "\n" + "Error with Weapon " + chummerfile.characters.character.weapons.weapon.name + ": " +err
            }
        }
    }

    try{
        if(chummerfile.characters.character.gears != null){
            console.log("Importing gear");
            if(chummerfile.characters.character.gears.gear.length>1){
                for(var i=0;i<chummerfile.characters.character.gears.gear.length;i++){
                    var newrowid=generateRowID();
                    if((chummerfile.characters.character.gears.gear[i].category_english != "Common Programs")&&(chummerfile.characters.character.gears.gear[i].category_english != "Hacking Programs")){
                        if(chummerfile.characters.character.gears.gear[i].name!=null){
                            name = chummerfile.characters.character.gears.gear[i].name;
                            if(chummerfile.characters.character.gears.gear[i].rating > 0){
                                name += " " + chummerfile.characters.character.gears.gear[i].rating;
                            }
                            attributes["repeating_equipment_"+newrowid+"_equipmentname"]=name;
                            attributes["repeating_equipment_"+newrowid+"_equipmentnumber"]=chummerfile.characters.character.gears.gear[i].qty ? chummerfile.characters.character.gears.gear[i].qty : 1;
                            if(chummerfile.characters.character.gears.gear[i].extra != null) {
                                attributes["repeating_equipment_"+newrowid+"_equipmentdescription"]=chummerfile.characters.character.gears.gear[i].extra;
                            }
                            attributes["repeating_equipment_"+newrowid+"_equipmentnotes"]="";
                            if(chummerfile.characters.character.gears.gear[i].children!=null){
                                if(chummerfile.characters.character.gears.gear[i].children.gear.length>1){
                                    for(var j=0; j<chummerfile.characters.character.gears.gear[i].children.gear.length; j++){
                                        if(chummerfile.characters.character.gears.gear[i].children.gear[j].category_english !="Common Programs" && chummerfile.characters.character.gears.gear[i].children.gear[j].category_english !="Hacking Programs"){
                                            note = chummerfile.characters.character.gears.gear[i].children.gear[j].name;
                                            if(chummerfile.characters.character.gears.gear[i].children.gear[j].rating > 0){
                                                note += " " + chummerfile.characters.character.gears.gear[i].children.gear[j].rating;
                                            }
                                            if(chummerfile.characters.character.gears.gear[i].children.gear[j].extra != null) {
                                                note += " " + chummerfile.characters.character.gears.gear[i].children.gear[j].extra;
                                            }
                                            attributes["repeating_equipment_"+newrowid+"_equipmentnotes"]+= note +"\n";
                                        }
                                    }
                                }else{
                                    if(chummerfile.characters.character.gears.gear[i].children.gear.category_english !="Common Programs" && chummerfile.characters.character.gears.gear[i].children.gear.category_english !="Hacking Programs"){
                                        note = chummerfile.characters.character.gears.gear[i].children.gear.name;
                                        if(chummerfile.characters.character.gears.gear[i].children.gear.rating > 0){
                                            note += " " + chummerfile.characters.character.gears.gear[i].children.gear.rating;
                                        }
                                        if(chummerfile.characters.character.gears.gear[i].children.gear.extra != null) {
                                            note += " " + chummerfile.characters.character.gears.gear[i].children.gear.extra;
                                        }
                                        attributes["repeating_equipment_"+newrowid+"_equipmentnotes"]+= note +"\n";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Gear " +err
    }

    if(goodcode){
        try{
            clearEquipment(experimental);
            setAttrs(attributes);
            return "Equipment Tab import successfull\n";
        } catch(err){
            return "Error setting Attributes: " + err;
        }
    } else{
        console.log(error);
        return error;
    }
}

async function importSocialTabChummer(chummerfile) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    try{
       if(chummerfile.characters.character.contacts != null){
        console.log("Importing Contacts");
        if(chummerfile.characters.character.contacts.contact.length>1){
            for(var i=0; i<chummerfile.characters.character.contacts.contact.length; i++){
                var newrowid=generateRowID();
                if(chummerfile.characters.character.contacts.contact[i].name !== null) {
                     attributes["repeating_contacts_"+newrowid+"_contactname"]=chummerfile.characters.character.contacts.contact[i].name;
                }
                else {
                    attributes["repeating_contacts_"+newrowid+"_contactname"]="";
                }
                if(chummerfile.characters.character.contacts.contact[i].role !== null) {
                    attributes["repeating_contacts_"+newrowid+"_contactdescription"]=chummerfile.characters.character.contacts.contact[i].role;
                }
                attributes["repeating_contacts_"+newrowid+"_contactconnection"]=chummerfile.characters.character.contacts.contact[i].connection;
                attributes["repeating_contacts_"+newrowid+"_contactloyalty"]=chummerfile.characters.character.contacts.contact[i].loyalty;
            }
        }else{
            var newrowid=generateRowID();
            attributes["repeating_contacts_"+newrowid+"_contactname"]=chummerfile.characters.character.contacts.contact.name;
            if(chummerfile.characters.character.contacts.contact.role !== null) {
                    attributes["repeating_contacts_"+newrowid+"_contactdescription"]=chummerfile.characters.character.contacts.contact.role;
                }
            attributes["repeating_contacts_"+newrowid+"_contactconnection"]=chummerfile.characters.character.contacts.contact.connection;
            attributes["repeating_contacts_"+newrowid+"_contactloyalty"]=chummerfile.characters.character.contacts.contact.loyalty;
        }
       }
    }catch(err){
       goodcode=false;
       error= error + "\n" + "Error with Contacts: " + err;
    }

    if(goodcode){
        try{
            clearSocial();
            setAttrs(attributes);
            return "Character Tab import successfull\n";
        } catch(err){
            return "Error setting Attributes: " + err;
        }
    } else{
        return error;
    }
}

async function importSingleWeaponChummer(weapon, number,  ammunition, attributes) {
    if(weapon.type == "Ranged"){
        attributes["weaponismelee"+number] = 0;
        attributes["weaponrc"+number] = weapon.rc.match(/\d+/g).pop()-Math.ceil((parseInt(attributes.str_base) + parseInt(attributes.str_aug))/3)- 1;

        if(weapon.rawdamage.match(/\d+/) !== null && !weapon.rawdamage.includes("STR")) {
            attributes["weapondv"+number] = weapon.rawdamage.match(/\d+/)[0];
        }
        else if(weapon.rawdamage.includes("STR")) {
           attributes["weapondv"+number] = weapon.damage.match(/\d+/)[0];
        }
        else {
            attributes["weapondv"+number] = weapon.damage.match(/\d+/) != null ? weapon.damage.match(/\d+/)[0] : 0;
        }

        attributes["weapondmgtype"+number] = weapon.rawdamage.match(/S\(e\)|S\b|P|Special\b/) != null ? weapon.rawdamage.match(/S\(e\)|S\b|P|Special\b/)[0] : 0;
    }else{
        attributes["weaponismelee"+number] = "on";
        attributes["weaponreach"+number] = weapon.reach;
        attributes["weapondv"+number] = weapon.damage_english.match(/\d+/) != null ? weapon.damage_english.match(/\d+/)[0] : 0;
        attributes["weapondmgtype"+number] = weapon.damage_english.match(/S\(e\)|S\b|P|Special\b/) != null ? weapon.damage_english.match(/S\(e\)|S\b|P|Special\b/)[0] : 0;
    }

    attributes["weaponname"+number] = weapon.name;
    attributes["weaponaccuracy"+number] = weapon.accuracy.match(/\d+/g).pop();
    if(isNaN(weapon.ap)){
        attributes["weaponap"+number] = 0;
    }else{
        attributes["weaponap"+number] = weapon.ap;
        if(weapon.rawap != null) {
            attributes["weaponap"+number] = weapon.rawap;
        }
    }
    attributes["weaponnotes"+number] = "";

    let skills = [];
    for(var i=43;i<52;i++)
    {
        var name = 'skillname'+i;
        skills.push(name);
        var rating = 'skillrating'+i;
        skills.push(rating);
        var bonus = 'skillbonus'+i;
        skills.push(bonus);
        var attr = 'skillattr_value'+i;
        skills.push(attr);
    }
    skills = await asw.getAttrs(skills);
    for(var i=43; i<52; i++)
    {
        var compname = 'skillname'+i;
        var rating = 'skillrating'+i;
        var bonus = 'skillbonus'+i;
        var skillattr = 'skillattr_value'+i;

        if(skills[compname] == weapon.skill){
            attributes["weaponcategory" + number] = "@{skilldicepool"+i+"}";
            let attribute = await asw.getAttrs([skillattr]);
            let attrTotal = attribute[skillattr].replace(/[^a-zA-Z0-9_]/g, "");
            let attributeSum = await asw.getAttrs([attrTotal]);
            let targetAttributes = attributeSum[attrTotal].replace(/[+]/g, ",").replace(/[^a-zA-Z0-9_,]/g, "").split(",");
            let attributesValues = [attributes[targetAttributes[0]], attributes[targetAttributes[1]]]
            attributes["weaponbonus" + number] = weapon.dicepool - skills[rating] - skills[bonus] - attributesValues.reduce((a,b) => parseInt(a) + parseInt(b));
        }
    }

    if(typeof weapon.accessories != "undefined"){
        if(weapon.accessories.accessory.length>1){
            for(var j=0; j<weapon.accessories.accessory.length; j++){
                attributes["weaponnotes"+number] += weapon.accessories.accessory[j].name+"\n";
            }
        }else{
            attributes["weaponnotes"+number] += weapon.accessories.accessory.name+"\n";
        }
    }

    if(weapon.clips !== null){
        if(weapon.clips.clip.length>1){
            //make clips unique
            var clips = [...new Map(weapon.clips.clip.slice().reverse().map(v => [v.name, v])).values()].reverse()

            for(var j=0; j < clips.length; j++){

                var newrowid=generateRowID();
                //find ammo to get stats
                ammo = ammunition.find(clip => clip.guid === clips[j].id);
                if(ammo != null) {
                    importRepeatingAmmo(ammo, number, attributes);
                }
            }
        }else{
            var newrowid = generateRowID();
            //find ammo to get stats
            ammo = ammunition.find(clip => clip.guid === weapon.clips.clip.id);

            if(ammo != null) {
                importRepeatingAmmo(ammo, number, attributes);
            }
        }
    }
}

function importRepeatingAmmo(ammunition, number, attributes) {

    var newrowid = generateRowID();

    attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoname"] = ammo.name;

    attributes["repeating_ammotype"+number+"_"+newrowid+"_ammodv"] = ammo.weaponbonusdamage_english != null ? ammo.weaponbonusdamage_english.substring(0,2) : 0;
    if(ammo.weaponbonusdamage_english != null) {
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammodmgtype"] = ammo.weaponbonusdamage_english.substring(2);
    }

    if(ammo.name_english === "Ammo: Stick-n-Shock") {
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoap"] = -5 - attributes["weaponap"+number]
    }
    else {
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoap"] = ammo.weaponbonusap != null? ammo.weaponbonusap : 0;
    }

    if(ammo.name_english === "Arrow: Stick-n-Shock w/Static Shaft" || ammo.name_english === "Arrow: Stick-n-Shock") {
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoap"] = -5 - attributes["weaponap"+number];
        attributes["repeating_ammotype"+number+"_"+newrowid+"_ammodv"] = ammo.weaponbonusdamage_english.substring(0,2) - attributes["weapondv"+number];
    }

    attributes["repeating_ammotype"+number+"_"+newrowid+"_ammoacc"] = ammo.weaponbonusacc != null ? ammo.weaponbonusacc : 0;
}

function provideRepeatingWeaponRowName(weapon) {

    var weaponrow = "weapons";

    switch(weapon.skill) {
        case "Pistols":
            weaponrow = weapon.skill.replaceAll(' ', '').toLowerCase();
            break;
        case "Automatics":
            weaponrow = weapon.skill.replaceAll(' ', '').toLowerCase();
            break;
        case "Longarms":
            weaponrow = weapon.skill.replaceAll(' ', '').toLowerCase();
            break;
        case "Heavy Weapons":
            weaponrow = weapon.skill.replaceAll(' ', '').toLowerCase();
            break;
        case "Unarmed Combat":
            weaponrow = "closecombat"
            break;
        case "Blades":
            weaponrow = "closecombat"
            break;
        case "Clubs":
            weaponrow = "closecombat"
            break;
    }

    var row = "repeating_" + weaponrow + "_" + generateRowID() + "_";

    return row;
}

async function importSingleRepeatingWeapon(weapon, ammunition, attributes) {
    var row = provideRepeatingWeaponRowName(weapon);
    if(weapon.type == "Ranged"){
        attributes[row + "weaponismelee"] = 0;
        attributes[row + "weaponrc"] = weapon.rc.match(/\d+/g).pop()-Math.ceil((parseInt(attributes.str_base) + parseInt(attributes.str_aug))/3)- 1;
        if(!weapon.rawdamage.includes("STR") && weapon.rawdamage.match(/\d+/) !== null) {
            attributes[row + "weapondv"] = weapon.rawdamage.match(/\d+/)[0];
        }
        else {
            attributes[row + "weapondv"] = weapon.damage.match(/\d+/) != null ? weapon.damage.match(/\d+/)[0] : 0;
        }

        attributes[row + "weapondmgtype"] = weapon.rawdamage.match(/S\(e\)|S\b|P|Special\b/) != null ? weapon.rawdamage.match(/S\(e\)|S\b|P|Special\b/)[0] : 0;
    }else{
        attributes[row + "weaponismelee"] = "on";
        attributes[row + "weaponreach"] = weapon.reach;
        attributes[row + "weapondv"] = weapon.damage_english.match(/\d+/) != null ? weapon.damage_english.match(/\d+/)[0] : 0;
        attributes[row + "weapondmgtype"] = weapon.damage_english.match(/S\(e\)|S\b|P|Special\b/) != null ? weapon.damage_english.match(/S\(e\)|S\b|P|Special\b/)[0] : 0;
    }

    let skills = [];
    for(var i=43;i<52;i++)
    {
        var name = 'skillname'+i;
        skills.push(name);
        var rating = 'skillrating'+i;
        skills.push(rating);
        var bonus = 'skillbonus'+i;
        skills.push(bonus);
        var attr = 'skillattr_value'+i;
        skills.push(attr);
    }
    skills = await asw.getAttrs(skills);
    for(var i=43; i<52; i++)
    {
        var compname = 'skillname'+i;
        var rating = 'skillrating'+i;
        var bonus = 'skillbonus'+i;
        var skillattr = 'skillattr_value'+i;

        if(skills[compname] == weapon.skill){
            attributes[row + "weaponcategory"] = "@{skilldicepool"+i+"}";
            let attribute = await asw.getAttrs([skillattr]);
            let attrTotal = attribute[skillattr].replace(/[^a-zA-Z0-9_]/g, "");
            let attributeSum = await asw.getAttrs([attrTotal]);
            let targetAttributes = attributeSum[attrTotal].replace(/[+]/g, ",").replace(/[^a-zA-Z0-9_,]/g, "").split(",");
            let attributesValues = [attributes[targetAttributes[0]], attributes[targetAttributes[1]]]
            attributes[row + "weaponbonus"] = weapon.dicepool - skills[rating] - skills[bonus] - attributesValues.reduce((a,b) => parseInt(a) + parseInt(b));
        }
    }

    attributes[row + "weaponname"] = weapon.name;
    attributes[row + "weaponaccuracy"] = weapon.accuracy.match(/\d+/g).pop();
    if(weapon.ap == null || isNaN(weapon.ap)){
        attributes[row + "weaponap"] = 0;
    }else{
        attributes[row + "weaponap"] = weapon.ap;
        if(weapon.rawap != null) {
            attributes[row + "weaponap"] = weapon.rawap;
        }
    }
    attributes[row + "weaponnotes"] = "";

    if(typeof weapon.accessories != "undefined"){
        if(weapon.accessories.accessory.length>1){
            for(var j=0; j<weapon.accessories.accessory.length; j++){
                attributes[row + "weaponnotes"] += weapon.accessories.accessory[j].name+"\n";
            }
        }else{
            attributes[row + "weaponnotes"] += weapon.accessories.accessory.name+"\n";
        }
    }

    if(weapon.clips !== null){
        if(weapon.clips.clip.length > 1){
            let amountImported = 0;
            //make clips unique
            var clips = [...new Map(weapon.clips.clip.slice().reverse().map(v => [v.name, v])).values()].reverse()

            for(var j=0; j < clips.length && amountImported < 4; j++){

                var newrowid=generateRowID();
                //find ammo to get stats
                ammo = ammunition.find(clip => clip.guid === clips[j].id);

                if(ammo != null && !ammo.name_english.includes("Regular")) {
                    importRepeatingWeaponAmmo(row, ammo, amountImported, attributes);
                    amountImported++;
                }
            }
        }else{
            var newrowid = generateRowID();
            //find ammo to get stats
            ammo = ammunition.find(clip => clip.guid === weapon.clips.clip.id);

            if(ammo != null) {
                importRepeatingWeaponAmmo(row, ammo, 0, attributes);
            }
        }
    }
}

function importRepeatingWeaponAmmo(row, ammunition, number, attributes) {

    attributes[row + "ammoname"+number] = ammo.name;

    attributes[row + "ammodv" + number] = ammo.weaponbonusdamage_english != null ? ammo.weaponbonusdamage_english.substring(0,2) : 0;
    if(ammo.weaponbonusdamage_english != null) {
         attributes[row + "ammodmgtype" + number] = ammo.weaponbonusdamage_english.substring(2);
    }

    if(ammo.name_english === "Ammo: Stick-n-Shock") {
        attributes[row + "ammoap" + number] = -5 - attributes[row + "weaponap"]
    }
    else {
        attributes[row + "ammoap" + number] = ammo.weaponbonusap != null? ammo.weaponbonusap : 0;
    }

    if(ammo.name_english === "Arrow: Stick-n-Shock w/Static Shaft" || ammo.name_english === "Arrow: Stick-n-Shock") {
        attributes[row + "ammoap" + number] = -5 -  attributes[row + "weaponap"]
        attributes[row + "ammodv" + number] = ammo.weaponbonusdamage_english.substring(0,2) - attributes[row + "weapondv"]
    }

    attributes[row + "ammoacc" + number] = ammo.weaponbonusacc != null ? ammo.weaponbonusacc : 0;
}

async function importSingleArmor(armor, attributes) {

    if(armor.armor.includes("/")) {
        var armorValueArray = armor.armor.toString().split("/");

        var splitArmor = armor;
        splitArmor.armor = armorValueArray[0];
        importSingleArmor(splitArmor, attributes);

        armor.armor = armorValueArray[1];
    }

    var newrowid = generateRowID()
    attributes["repeating_armors_"+newrowid+"_armorname"] = armor.name;
    if(armor.equipped == "True") {
           attributes["repeating_armors_"+newrowid+"_armorworn"] = "on";
    }
    attributes["repeating_armors_"+newrowid+"_armorrating"] = armor.armor;
    attributes["repeating_armors_"+newrowid+"_armornotes"] = "";
    if(armor.armormods!=null){
        if(armor.armormods.armormod.length > 1){
            for(var j=0; j < armor.armormods.armormod.length; j++){
                if(Number(armor.armormods.armormod[j].rating) > 0){
                    attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.armormods.armormod[j].name + " " + armor.armormods.armormod[j].rating + "\n";
                }else{
                    attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.armormods.armormod[j].name + "\n";
                }
            }
        }else{
            if(Number(armor.armormods.armormod.rating)>0){
                attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.armormods.armormod.name + " " + armor.armormods.armormod.rating + "\n";
            }else{
                attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.armormods.armormod.name + "\n";
            }
        }
    }
    if(armor.gears!=null){
        if(armor.gears.gear.length > 1){
            for(var j=0; j < armor.gears.gear.length; j++){
                attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.gears.gear[j].name + "\n";
            }
        }else{
            attributes["repeating_armors_"+newrowid+"_armornotes"] += armor.gears.gear.name + "\n";
        }
    }
}

async function importCyberwareArmor(cyberware, attributes) {

    var cyberwareEnhancements = [];
    if(cyberware.children != null && cyberware.children.cyberware.length > 1) {
        cyberwareEnhancements = cyberware.children.cyberware;
    }

    cyberwareEnhancements.forEach(enhancement => importSingleCyberwareArmor(cyberware.name, enhancement, attributes));
}

function importSingleCyberwareArmor(parentname, cyberware, attributes) {

    if(cyberware.name_english === "Armor") {
        var newrowid = generateRowID()
        attributes["repeating_armors_"+newrowid+"_armorname"] = parentname;
        attributes["repeating_armors_"+newrowid+"_armorworn"] = "on";
        attributes["repeating_armors_"+newrowid+"_armorrating"] = cyberware.rating;
        attributes["repeating_armors_"+newrowid+"_armornotes"] = "";
    }
}

function importOtherArmor(armor, attributes) {
    var newrowid = generateRowID()
    attributes["repeating_armors_"+newrowid+"_armorname"] = armor.objectname;
    attributes["repeating_armors_"+newrowid+"_armorworn"] = "on";
    attributes["repeating_armors_"+newrowid+"_armorrating"] = armor.armor;
    attributes["repeating_armors_"+newrowid+"_armornotes"] = armor.improvesource;
}

async function importSingleSpell(spell, attributes, spellcasting, ritual, alchemy) {
    var category = "spells";
    if(spell.category_english == "Rituals") {
        category = "rituals"
    }
    else if(spell.alchemy == "True"){
        category = "alchemy"
    }

    var row = "repeating_" + category + "_" + generateRowID();

    attributes[row + "_spellname"] = spell.name;
    attributes[row + "_spelltype"] = spell.type;
    attributes[row + "_spellcategory"] = spell.category;

    attributes[row + "_spellrange"] = spell.range;
    attributes[row + "_spellduration"] = spell.duration;

    if(spell.notes != null){
        attributes[row + "_spelldescription"] = spell.notes;
    }

    if(spell.dv.match(/(\-|\+)\d/) != null) {
        attributes[row + "_spelldrain"] = spell.dv.match(/(\-|\+)\d/)[0];
    }
    else {
        attributes[row + "_spelldrain"] = "-0";
    }

    if(spell.category_english == "Rituals"){
        attributes[row + "_spellschool"] = "@{skilldicepool67}";
        attributes[row + "_spelldrain"] = "*2";
        attributes[row + "_spellbonus"] = spell.dicepool - ritual;
    } else {
        attributes[row + "_spellbonus"] = spell.dicepool - spellcasting;
        if(spell.alchemy == "True"){
            attributes[row + "_spellschool"] = "@{skilldicepool58}";
            attributes[row + "_spellbonus"] = spell.dicepool - alchemy;
        }
    }
}

async function importSingleVehicle(vehicle, attributes) {

    var newrowid = generateRowID();
    attributes["repeating_vehicles_"+newrowid+"_vehiclename"]= vehicle.name;
    attributes["repeating_vehicles_"+newrowid+"_vehiclehand"]= vehicle.handling.match(/\d+/).pop();
    attributes["repeating_vehicles_"+newrowid+"_vehiclespeed"]= vehicle.speed.match(/\d+/).pop();
    attributes["repeating_vehicles_"+newrowid+"_vehicleaccl"]= vehicle.accel.match(/\d+/).pop();
    attributes["repeating_vehicles_"+newrowid+"_vehiclepilot"]= vehicle.pilot;
    attributes["repeating_vehicles_"+newrowid+"_vehiclesens"]= vehicle.sensor;
    attributes["repeating_vehicles_"+newrowid+"_vehicleseats"]= vehicle.seats;
    attributes["repeating_vehicles_"+newrowid+"_vehicleprice"]= vehicle.cost;
    attributes["repeating_vehicles_"+newrowid+"_vehiclebody"]= vehicle.body;
    attributes["repeating_vehicles_"+newrowid+"_vehiclearmor"]= vehicle.armor;
    attributes["repeating_vehicles_"+newrowid+"_vehiclenotes"]="";

    if(vehicle.mods != null){
        if(vehicle.mods.mod.length > 1){
            var weaponnumber = 1;
            for(var j = 0; j < vehicle.mods.mod.length; j++){
                weaponnumber = importSingleVehicleMod(vehicle.mods.mod[j], newrowid, attributes, weaponnumber);
            }
        }else{
            attributes["repeating_vehicles_"+newrowid+"_vehiclenotes"] += vehicle.mods.mod.name + "\n";
            importSingleVehicleMod(vehicle.mods.mod, newrowid, attributes, weaponnumber);
        }
    }
}

const importSingleVehicleMod = (mod, newrowid, attributes, weaponnumber) => {
    attributes["repeating_vehicles_" + newrowid + "_vehiclenotes"] += mod.name + "\n";
    if(mod.weapons != null && mod.weapons.weapon != null){
        if(mod.weapons.length > 1){
           return importSingleVehicleWeapon(mod.weapons.weapon[0], newrowid, attributes, weaponnumber);
        }
        else {
           return importSingleVehicleWeapon(mod.weapons.weapon, newrowid, attributes, weaponnumber);
        }
    }
    return weaponnumber;
}

const importSingleVehicleWeapon = (weapon, newrowid, attributes, weaponnumber) => {
    attributes["repeating_vehicles_"+newrowid+"_vehicleweaponname" + weaponnumber] = weapon.name;
    attributes["repeating_vehicles_"+newrowid+"_vehicleweaponaccuracy"+ weaponnumber] = weapon.accuracy.match(/\d+/g).pop();
    if(weapon.type == "Ranged")
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponrc"+ weaponnumber] = weapon.rc.match(/\d+/g).pop();
    if(Number(weapon.ap) != "NaN"){
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponap"+ weaponnumber] = weapon.ap;
    }else{
        attributes["repeating_vehicles_"+newrowid+"_vehicleweaponap"+ weaponnumber] = 0;
    }
    attributes["repeating_vehicles_"+newrowid+"_vehicleweapondv"+ weaponnumber] = weapon.damage_english.match(/\d*/).pop();
    attributes["repeating_vehicles_"+newrowid+"_vehicleweapondmgtype"+ weaponnumber] = weapon.damage_english.match(/^\d*/).pop();
    attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"+ weaponnumber] = "";
    if(typeof weapon.accessories != "undefined"){
        if(weapon.accessories.accessory.length > 1){
            for(var h = 0; h < weapon.accessories.accessory.length; h++){
                attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"+ weaponnumber] += weapon.accessories.accessory[h].name+"\n";
            }
        }else{
            attributes["repeating_vehicles_"+newrowid+"_vehicleweaponnotes"+ weaponnumber] += weapon.accessories.accessory.name+"\n";
        }
    }
    return weaponnumber +1;
}

async function importSingleDrone(drone, attributes) {

    var newrowid = generateRowID();
    attributes["repeating_drones_"+newrowid+"_dronename"]= drone.name;
    attributes["repeating_drones_"+newrowid+"_dronehand"]= drone.handling.match(/\d+/).pop();
    attributes["repeating_drones_"+newrowid+"_dronespeed"]= drone.speed.match(/\d+/).pop();
    attributes["repeating_drones_"+newrowid+"_droneaccl"]= drone.accel.match(/\d+/).pop();
    attributes["repeating_drones_"+newrowid+"_dronepilot"]= drone.pilot;
    attributes["repeating_drones_"+newrowid+"_dronesens"]= drone.sensor;
    attributes["repeating_drones_"+newrowid+"_droneprice"]= drone.cost;
    attributes["repeating_drones_"+newrowid+"_dronebody"]= drone.body;
    attributes["repeating_drones_"+newrowid+"_dronearmor"]= drone.armor;
    attributes["repeating_drones_"+newrowid+"_dronenotes"]="";

    if(drone.gears != null) {
        importAutosofts(drone, newrowid, attributes);
    }

    if(drone.mods != null){
        if(drone.mods.mod.length > 1){
            var weaponnumber = 1;
            for(var j = 0; j < drone.mods.mod.length; j++){
                weaponnumber = importSingleDroneMod(drone.mods.mod[j], newrowid, attributes, weaponnumber);
            }
        }else{
            attributes["repeating_drones_"+newrowid+"_dronenotes"] += drone.mods.mod.name + "\n";
            importSingleDroneMod(drone.mods.mod, newrowid, attributes, weaponnumber);
        }
    }
}

const importSingleDroneMod = (mod, newrowid, attributes, weaponnumber) => {
    attributes["repeating_drones_" + newrowid + "_dronenotes"] += mod.name + "\n";

    if(mod.weapons != null && mod.weapons.weapon != null){
        if(mod.weapons.length > 1){
           return importSingleDroneWeapon(mod.weapons.weapon[0], newrowid, attributes, weaponnumber);
        }
        else {
           return importSingleDroneWeapon(mod.weapons.weapon, newrowid, attributes, weaponnumber);
        }
    }
    return weaponnumber;
}

const importSingleDroneWeapon = (weapon, newrowid, attributes, weaponnumber) => {
    attributes["repeating_drones_"+newrowid+"_droneweaponname" + weaponnumber] = weapon.name;
    attributes["repeating_drones_"+newrowid+"_droneweaponaccuracy"+ weaponnumber] = weapon.accuracy.match(/\d+/g).pop();
    if(weapon.type == "Ranged")
        attributes["repeating_drones_"+newrowid+"_droneweaponrc"+ weaponnumber] = weapon.rc.match(/\d+/g).pop();
    if(Number(weapon.ap) != "NaN"){
        attributes["repeating_drones_"+newrowid+"_droneweaponap"+ weaponnumber] = weapon.ap;
    }else{
        attributes["repeating_drones_"+newrowid+"_droneweaponap"+ weaponnumber] = 0;
    }
    attributes["repeating_drones_"+newrowid+"_droneweapondv"+ weaponnumber] = weapon.damage_english.match(/\d*/).pop();
    attributes["repeating_drones_"+newrowid+"_droneweapondmgtype"+ weaponnumber] = weapon.damage_english.match(/^\d*/).pop();
    attributes["repeating_drones_"+newrowid+"_droneweaponnotes"+ weaponnumber] = "";
    if(typeof weapon.accessories != "undefined"){
        if(weapon.accessories.accessory.length > 1){
            for(var h = 0; h < weapon.accessories.accessory.length; h++){
                attributes["repeating_drones_"+newrowid+"_droneweaponnotes"+ weaponnumber] += weapon.accessories.accessory[h].name+"\n";
            }
        }else{
            attributes["repeating_drones_"+newrowid+"_droneweaponnotes"+ weaponnumber] += weapon.accessories.accessory.name+"\n";
        }
    }
    return weaponnumber +1;
}

const importAutosofts = (drone, newrowid, attributes) => {

    let autosofts;
    if(drone.gears.gear.length > 1) {
        autosofts = drone.gears.gear.filter(gear => gear.category_english.includes("Autosofts"));
    }
    else {
        if(drone.gears.gear.category_english == "Autosofts") {
            autosofts = [drone.gears.gear];
        }
    }

    if(autosofts != null) {
        //search for clearsight
        let clearsight = autosofts.find(soft => soft.name_english.includes("Clearsight Autosoft"));
        if(clearsight != null) {
            attributes["repeating_drones_"+newrowid+"_droneperceptionsoft"] = clearsight.rating;
        }

        //Maneuvering
        let maneuvering = autosofts.find(soft => soft.name_english.includes("Maneuvering Autosoft"));
        if(maneuvering != null) {
            attributes["repeating_drones_"+newrowid+"_dronemaneuversoft"] = maneuvering.rating;
        }

        //stealth
        let stealth = autosofts.find(soft => soft.name_english.includes("Stealth Autosoft"));
        if(stealth != null) {
            attributes["repeating_drones_"+newrowid+"_dronesneaksoft"] = stealth.rating;
        }

        //evasion
        let evasion = autosofts.find(soft => soft.name_english.includes("Evasion Autosoft"));
        if(evasion != null) {
            attributes["repeating_drones_"+newrowid+"_dronedodgesoft"] = evasion.rating;
        }
    }

}