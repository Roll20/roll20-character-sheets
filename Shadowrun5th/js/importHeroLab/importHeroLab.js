async function importHeroLabChar(attributes, herolabfile, text) {

    const character = herolabfile.public.character;

    var maintab = importMainTabHeroLab(character);
    var skilltab = importSkillsTabHeroLab(text.experimental, character);
<!--    var magictab = importMagicTabHeroLab(text.experimental, character);-->
    var enhancementtab = importEnhancementTabHeroLab(text, character);
<!--    var matrixtab = importMatrixTabHeroLab(text.experimental, character);-->
<!--    var vehiclestab = importVehiclesTabHeroLab(text.experimental, character);-->
<!--    var equipmentstab = importEquipmentTabHeroLab(text.experimental, character);-->
<!--    var socialtab = importSocialTabHeroLab(character);-->

    let results = await Promise.all([maintab, skilltab, enhancementtab]);
    let dependingResults = await Promise.all([]);
<!--    let results = await Promise.all([maintab, skilltab, enhancementtab, socialtab]);-->
<!--    let dependingResults = await Promise.all([magictab, matrixtab, vehiclestab, equipmentstab]);-->

    attributes.warningcheckbox="0";
    attributes.chummercheckbox="0";
    attributes.chummertext= results.join("") + dependingResults.join("") + "\nREMEMBER THIS IS ONLY A HELP AND YOU NEED TO DOUBLE CHECK EVERYTHING."

    return attributes;
}

async function importMainTabHeroLab(character) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    try{
        console.log("Character meta info");
        attributes.character_name = character.name;
        attributes.metatype = character.race.name;
        attributes.sex = character.personal.gender;
        attributes.age = character.personal.age;
        attributes.height = character.personal.charheight.text;
        attributes.weight = character.personal.charweight.text;

        attributes.player = character.playername;

        attributes.description = character.personal.description;
        attributes.background = character.personal.description;
        attributes.karma = character.karma.left;
        attributes.karmacareer = character.karma.total;

        attributes.initiativebonus = character.attributes[11].modified - character.attributes[11].base;
        attributes.astralinitiativebonus = character.attributes[11].modified - character.attributes[11].base;
        attributes.matrixinitiativebonus = character.attributes[11].modified - character.attributes[11].base;
        attributes.initiativedice = character.attributes[11].text.split('+')[1].charAt(0);
<!--            attributes.astralinitiativedice=character.astralinitdice;-->

<!--        if(character.cmthresholdoffset != null)-->
<!--            attributes.woundadditive=character.cmthresholdoffset;-->
<!--        if(character.cmthreshold != null)-->
<!--            attributes.woundmultiplikative=character.cmthreshold;-->
<!--        if(character.cmoverflow != null)-->
<!--            attributes.overflowmod=character.cmoverflow-character.attributes[1].attribute[0].total- 1;-->
<!--        if(character.physicalcm != null)-->
<!--            attributes.physicaltrackmod=character.physicalcm-Math.ceil(character.attributes[1].attribute[0].total/2)- 8;-->
<!--        if(character.stuncm != null)-->
<!--            attributes.stuntrackmod=character.stuncm-Math.ceil(character.attributes[1].attribute[7].total/2)- 8;-->

            attributes.streetcred = character.reputations[0].value;
            attributes.notoriety = character.reputations[2].value;
            attributes.pawareness = character.reputations[4].value;
            attributes.nuyen_total = character.cash.total;

<!--        if(character.magician == "True"){-->
<!--            // HeroLab 'chummer' export uses drainattribute property and a list, this is a workaround for that-->
<!--            try{-->
<!--              attributes.drainattribute="@{"+character.tradition.drainattributes.match(/[A-Z]+/g)[1].toLowerCase()+"_total}";-->
<!--            } catch(err)-->
<!--            {-->
<!--              attributes.drainattribute="@{"+character.tradition.drainattribute.attr[1]+"_total}";-->
<!--            }-->
<!--        }-->
    }catch(err){
        goodcode = false;
        error = "Error with Character Info " + err;
    }

    try{
        console.log("Importing Attributes");
        var attributesCharacter = character.attributes;
        attributes.bod_base = attributesCharacter[0].base;
        attributes.agi_base = attributesCharacter[1].base;
        attributes.rea_base = attributesCharacter[2].base;
        attributes.str_base = attributesCharacter[3].base;
        attributes.wil_base = attributesCharacter[4].base;
        attributes.log_base = attributesCharacter[5].base;
        attributes.int_base = attributesCharacter[6].base;
        attributes.cha_base = attributesCharacter[7].base;
        //essence attributesCharacter[8]
        attributes.edg_total = attributesCharacter[9].base;
        if(character.heritage.name === "Technomancer"){
            attributes.mag_base = character.attributes[10].base;
            attributes.istechnomancer = 1;
        }
<!--        else if(character.magician==="True" || character.adept==="True"){-->
<!--            attributes.mag_base=attributesCharacter.find(a => a.name_english === "MAG").total;-->
<!--            attributes.istechnomancer = 0;-->
<!--        }-->
        else {
            attributes.mag_base = 0;
            attributes.istechnomancer = 0;
        }
       attributes.bod_aug = attributesCharacter[0].modified - attributesCharacter[0].base;
       attributes.agi_aug = attributesCharacter[1].modified - attributesCharacter[1].base;
       attributes.rea_aug = attributesCharacter[2].modified - attributesCharacter[2].base;
       attributes.str_aug = attributesCharacter[3].modified - attributesCharacter[3].base;
       attributes.wil_aug = attributesCharacter[4].modified - attributesCharacter[4].base;
       attributes.log_aug = attributesCharacter[5].modified - attributesCharacter[5].base;
       attributes.int_aug = attributesCharacter[6].modified - attributesCharacter[6].base;
       attributes.cha_aug = attributesCharacter[7].modified - attributesCharacter[7].base;
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

async function importSkillsTabHeroLab(experimental, character) {

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

         character.skills.active.forEach(skill => {
             for(var j=1; j<73; j++){
                var compname='skillname'+j;
                if((names[compname] == skill.name)||(skill.name == "Locksmith" && j==29) || (skill.name == "Pilot Ground Craft" && j==55)){
                        attributes["skillrating"+j] = skill.modified;
                        attributes["skillbonus"+j] = skill.modified - skill.base;

                    if(skill.specialization != null) {
                        attributes["skillspec"+j] = skill.specialization.bonustext;
                    }
                    else {
                        attributes["skillspec"+j]="none";
                    }
                }
            }
         })

        //knowledge skills
        character.skills.knowledge.forEach(skill => {
            var newrowid = generateRowID();
            attributes["repeating_knowledge_"+newrowid+"_knowledgename"] = skill.name;
            if(skill.skillcategory_english != null){
              attributes["repeating_knowledge_"+newrowid+"_knowledgeattr"] = "@{"+skill.skillcategory_english.toLowerCase();
            }

            attributes["repeating_knowledge_"+newrowid+"_knowledgerating"] = skill.base;
            attributes["repeating_knowledge_"+newrowid+"_knowledgebonus"] = skill.modified - skill.base;

            if(skill.specialization != null) {
                attributes["repeating_knowledge_"+newrowid+"_knowledgespec"] = skill.specialization.bonustext;
            }
            else {
                attributes["repeating_knowledge_"+newrowid+"_knowledgespec"] = "none";
            }
        });

        //language skills
        character.skills.language.forEach(skill => {
            var newrowid = generateRowID();
            attributes["repeating_knowledge_"+newrowid+"_knowledgename"] = skill.name;
            if(skill.skillcategory_english != null){
              attributes["repeating_knowledge_"+newrowid+"_knowledgeattr"] = "@{"+skill.skillcategory_english.toLowerCase();
            }

            attributes["repeating_knowledge_"+newrowid+"_knowledgerating"] = skill.base;
            attributes["repeating_knowledge_"+newrowid+"_knowledgebonus"] = skill.modified - skill.base;

            if(skill.text === "N") {
                attributes["repeating_knowledge_"+newrowid+"_knowledgerating"] = 100;
                attributes["repeating_knowledge_"+newrowid+"_knowledgenotes"] = "Natural";

            }

            if(skill.specialization != null) {
                attributes["repeating_knowledge_"+newrowid+"_knowledgespec"] = skill.specialization.bonustext;
            }
            else {
                attributes["repeating_knowledge_"+newrowid+"_knowledgespec"] = "none";
            }
             attributes["repeating_knowledge_"+newrowid+"_knowledgeattr"]="@{language";
        });

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

async function importEnhancementTabHeroLab(text, character) {

    var goodcode = true;
    var error = "";
    var attributes = {};

    try{
        if(character.qualities != null){
            console.log("Importing qualities");
            if(character.qualities.positive != undefined){
                for(var i=0; i< character.qualities.positive.length; i++){
                    var newrowid=generateRowID();
                    attributes["repeating_posqualities_"+newrowid+"_posqualityname"] = character.qualities.positive[i].name;
                    attributes["repeating_posqualities_"+newrowid+"_posqualitykarma"] = character.qualities.positive[i].traitcost.bp;
                    attributes["repeating_posqualities_"+newrowid+"_posqualnotes"] = character.qualities.positive[i].description;
                    if( character.qualities.positive[i].rank != null) {
                        attributes["repeating_posqualities_"+newrowid+"_posqualitydescription"] =  character.qualities.positive[i].rank;
                    }
                }
            }
            if(character.qualities.positive != undefined){
                for(var i=0; i< character.qualities.negative.length; i++){
                    var newrowid=generateRowID();
                    attributes["repeating_negqualities_"+newrowid+"_negqualityname"] = character.qualities.negative[i].name;
                    attributes["repeating_negqualities_"+newrowid+"_negqualitykarma"] = character.qualities.negative[i].traitcost.bp;
                    attributes["repeating_negqualities_"+newrowid+"_negqualnotes"] = character.qualities.negative[i].description;
                    if(character.qualities.negative[i].rank != null) {
                        attributes["repeating_negqualities_"+newrowid+"_negqualitydescription"] = character.qualities.negative[i].rank
                    }
                }
            }
        }
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Qualities " +err
    }

    try{
<!--        if(character.powers != null){-->
<!--            console.log("Importing Adept Powers");-->
<!--            if(character.powers.power.length>1){-->
<!--                for(var i=0;i<character.powers.power.length;i++){-->
<!--                    var newrowid=generateRowID();-->
<!--                    attributes["repeating_powers_"+newrowid+"_poweryname"]=character.powers.power[i].name;-->
<!--                    attributes["repeating_powers_"+newrowid+"_powerdescription"]=character.powers.power[i].rating;-->
<!--                    attributes["repeating_powers_"+newrowid+"_powerpoints"]=character.powers.power[i].totalpoints;-->
<!--                    if(character.powers.power[i].notes != null) {-->
<!--                        attributes["repeating_powers_"+newrowid+"_powernotes"]=character.powers.power[i].notes;-->
<!--                    }-->

<!--                }-->
<!--            }else{-->
<!--                var newrowid=generateRowID();-->
<!--                attributes["repeating_powers_"+newrowid+"_poweryname"]=character.powers.power.name;-->
<!--                attributes["repeating_powers_"+newrowid+"_powerdescription"]=character.powers.power.rating;-->
<!--                attributes["repeating_powers_"+newrowid+"_powerpoints"]=character.powers.power.totalpoints;-->
<!--                if(character.powers.power.notes != null) {-->
<!--                        attributes["repeating_powers_"+newrowid+"_powernotes"]=character.powers.power.notes;-->
<!--                    }-->
<!--            }-->
<!--        }-->
    }catch(err){
        goodcode=false;
        error="Error with Powers " +err
    }

    try{
        var essence=0.0;
        console.log("Importing Cyberware");
        for(var i=0; i< character.gear.augmentations.cyberware.length; i++){
            let cyberware = character.gear.augmentations.cyberware[i];
            var newrowid=generateRowID();

            attributes["repeating_ware_"+newrowid+"_warename"] = cyberware.name;

            if(cyberware.rating !=null) {
                attributes["repeating_ware_"+newrowid+"_waredescription"] = cyberware.rating;
            }

            if(cyberware.description != null) {
                attributes["repeating_ware_"+newrowid+"_warenotes"] = cyberware.description;
            }

            if(cyberware.essencecost != null) {
                attributes["repeating_ware_"+newrowid+"_warekarma"] = cyberware.essencecost;
                essence += Number(cyberware.essencecost.replace(",","."));
            }
        }

        console.log("Importing Bioware");
        for(var i=0; i< character.gear.augmentations.bioware.length; i++){
            let bioware = character.gear.augmentations.bioware[i];
            var newrowid=generateRowID();

            attributes["repeating_ware_"+newrowid+"_warename"] = bioware.name;

            if(bioware.rating !=null) {
                attributes["repeating_ware_"+newrowid+"_waredescription"] = bioware.rating;
            }

            if(bioware.description != null) {
                attributes["repeating_ware_"+newrowid+"_warenotes"] = bioware.description;
            }

            if(bioware.essencecost != null) {
                attributes["repeating_ware_"+newrowid+"_warekarma"] = bioware.essencecost;
                essence += Number(bioware.essencecost.replace(",","."));
            }
        }
        attributes.ess_total = 6-essence;
    }catch(err){
        goodcode=false;
        error= error + "\n" + "Error with Ware " +err
    }

<!--    try{-->
<!--        if(character.martialarts != null){-->
<!--            console.log("Importing martialarts");-->
<!--            if(character.martialarts.martialart.length>1){-->
<!--                for(var i=0;i<character.martialarts.martialart.length;i++){-->
<!--                    if(character.martialarts.martialart[i].martialarttechniques != null){-->
<!--                        if(character.martialarts.martialart[i].martialarttechniques.length > 1){-->
<!--                            for(var j=0; j < character.martialarts.martialart[i].martialarttechniques.length; j++){-->
<!--                                var newrowid=generateRowID();-->
<!--                                attributes["repeating_martial_"+newrowid+"_martialname"] = character.martialarts.martialart[i].martialarttechniques.martialarttechnique[j].name;-->
<!--                                attributes["repeating_martial_"+newrowid+"_martialdescription"] = character.martialarts.martialart[i].name;-->
<!--                                if(character.martialarts.martialart[i].martialarttechniques.martialarttechnique[j].notes != undefined) {-->
<!--                                    attributes["repeating_martial_"+newrowid+"_martialnotes"] = character.martialarts.martialart[i].martialarttechniques.martialarttechnique[j].notes;-->
<!--                                }-->
<!--                            }-->
<!--                        }else{-->
<!--                            console.log(character.martialarts.martialart[i]);-->
<!--                            var newrowid=generateRowID();-->
<!--                            attributes["repeating_martial_"+newrowid+"_martialname"]=character.martialarts.martialart[i].martialarttechniques.martialarttechnique.name;-->
<!--                            attributes["repeating_martial_"+newrowid+"_martialdescription"]=character.martialarts.martialart[i].name;-->
<!--                            if(character.martialarts.martialart[i].martialarttechniques.martialarttechnique.notes != undefined) {-->
<!--                                attributes["repeating_martial_"+newrowid+"_martialnotes"] = character.martialarts.martialart[i].martialarttechniques.martialarttechnique.notes;-->
<!--                            }-->
<!--                        }-->
<!--                    }-->
<!--                }-->
<!--            }else{-->
<!--                if(character.martialarts.martialart.martialarttechniques != null){-->
<!--                    if(character.martialarts.martialart.martialarttechniques.martialarttechnique.length>1){-->
<!--                        for(var j=0;j<character.martialarts.martialart.martialarttechniques.martialarttechnique.length;j++){-->
<!--                            var newrowid=generateRowID();-->
<!--                            attributes["repeating_martial_"+newrowid+"_martialname"]=character.martialarts.martialart.martialarttechniques.martialarttechnique[j].name;-->
<!--                            attributes["repeating_martial_"+newrowid+"_martialdescription"]=character.martialarts.martialart.name;-->
<!--                            if(character.martialarts.martialart.martialarttechniques.martialarttechnique[j].notes != undefined) {-->
<!--                                attributes["repeating_martial_"+newrowid+"_martialnotes"] = character.martialarts.martialart.martialarttechniques.martialarttechnique[j].notes;-->
<!--                            }-->
<!--                        }-->
<!--                    }else{-->
<!--                        var newrowid=generateRowID();-->
<!--                        attributes["repeating_martial_"+newrowid+"_martialname"]=character.martialarts.martialart.martialarttechniques.martialarttechnique.name;-->
<!--                        attributes["repeating_martial_"+newrowid+"_martialdescription"]=character.martialarts.martialart.name;-->
<!--                        if(character.martialarts.martialart.martialarttechniques.martialarttechnique.notes != undefined) {-->
<!--                            attributes["repeating_martial_"+newrowid+"_martialnotes"] = character.martialarts.martialart.martialarttechniques.martialarttechnique.notes;-->
<!--                        }-->
<!--                    }-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    }catch(err){-->
<!--        goodcode=false;-->
<!--        error= error + "\n" + "Error with Martial Arts " +err-->
<!--    }-->

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