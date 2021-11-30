function clearSheet(attributes, experimental) {
    console.log("Removing old data");
    getSectionIDs("repeating_contacts", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_contacts_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_posqualities", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_posqualities_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_negqualities", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_negqualities_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_powers", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_powers_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_ware", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_ware_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_martial", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_martial_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_spells", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_spells_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_rituals", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_rituals_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_alchemy", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_alchemy_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_critterpowers", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_critterpowers_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_initiation", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_initiation_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_programs", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_programs_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_equipment", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_equipment_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_knowledge", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_knowledge_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_vehicles", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_vehicles_"+idarray[i]);
        }
    });
        getSectionIDs("repeating_drones", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_drones_"+idarray[i]);
        }
    });
    getSectionIDs("repeating_armors", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            removeRepeatingRow("repeating_armors_"+idarray[i]);
        }
    });

    //removing repeating weapons
    getSectionIDs("repeating_weapons", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_weapons_"+idarray[j]);
        }
    });

    //removing ammo
    getSectionIDs("repeating_ammotype1", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_ammotype1_"+idarray[j]);
        }
    });
    getSectionIDs("repeating_ammotype2", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_ammotype2_"+idarray[j]);
        }
    });
    getSectionIDs("repeating_ammotype3", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_ammotype3_"+idarray[j]);
        }
    });
    getSectionIDs("repeating_ammotype4", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_ammotype4_"+idarray[j]);
        }
    });
    getSectionIDs("repeating_ammotype5", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_ammotype5_"+idarray[j]);
        }
    });
    getSectionIDs("repeating_ammotype6", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_ammotype6_"+idarray[j]);
        }
    });
    getSectionIDs("repeating_ammotype7", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_ammotype7_"+idarray[j]);
        }
    });
    getSectionIDs("repeating_ammotype8", function(idarray) {
        for(var j=0; j < idarray.length; j++) {
            removeRepeatingRow("repeating_ammotype8_"+idarray[j]);
        }
    });
}


on("change:chummercheckbox", async function(){
    let text = await asw.getAttrs(["chummertext","chummercheckbox", "experimental", "nightly"]);
        if(text.chummercheckbox=="on"){
            var goodcode = true;
            var error="";
            var attributes={};
            try{
                var chummerfile=JSON.parse(text.chummertext);
            }catch(err){
                goodcode = false;
                error = err;
            }
            if(goodcode){

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
                    goodcode=false;
                    error="Error with Character Info " +err
                }
                try{
                    console.log("Importing Attributes");
                    var attributesChummer = chummerfile.characters.character.attributes[1].attribute;
                    attributes.bod_base=attributesChummer.find(a => a.name_english === "BOD").base;
                    attributes.agi_base=attributesChummer.find(a => a.name_english === "AGI").base;
                    attributes.rea_base=attributesChummer.find(a => a.name_english === "REA").base;
                    attributes.str_base=attributesChummer.find(a => a.name_english === "STR").base;
                    attributes.cha_base=attributesChummer.find(a => a.name_english === "CHA").base;
                    attributes.int_base=attributesChummer.find(a => a.name_english === "INT").base;
                    attributes.log_base=attributesChummer.find(a => a.name_english === "LOG").base;
                    attributes.wil_base=attributesChummer.find(a => a.name_english === "WIL").base;
                    attributes.edg_total=attributesChummer.find(a => a.name_english === "EDG").base;
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
                    attributes.bod_aug=attributesChummer.find(a => a.name_english === "BOD").total-attributesChummer.find(a => a.name_english === "BOD").base;
                    attributes.agi_aug=attributesChummer.find(a => a.name_english === "AGI").total-attributesChummer.find(a => a.name_english === "AGI").base;
                    attributes.rea_aug=attributesChummer.find(a => a.name_english === "REA").total-attributesChummer.find(a => a.name_english === "REA").base;
                    attributes.str_aug=attributesChummer.find(a => a.name_english === "STR").total-attributesChummer.find(a => a.name_english === "STR").base;
                    attributes.cha_aug=attributesChummer.find(a => a.name_english === "CHA").total-attributesChummer.find(a => a.name_english === "CHA").base;
                    attributes.int_aug=attributesChummer.find(a => a.name_english === "INT").total-attributesChummer.find(a => a.name_english === "INT").base;
                    attributes.log_aug=attributesChummer.find(a => a.name_english === "LOG").total-attributesChummer.find(a => a.name_english === "LOG").base;
                    attributes.wil_aug=attributesChummer.find(a => a.name_english === "WIL").total-attributesChummer.find(a => a.name_english === "WIL").base;
                }catch(err){
                    goodcode=false;
                    error= error + "\n" + "Error with Attributes " +err
                }
                try{
                    if(chummerfile.characters.character.powers!=null){
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
                    if(chummerfile.characters.character.initiategrade != null && chummerfile.characters.character.initiategrade != 0) {
                        console.log("Importing initiategrade and metamagic");
                        attributes.initiationgrade=chummerfile.characters.character.initiategrade;
                        if(chummerfile.characters.character.metamagics != null){
                            if(chummerfile.characters.character.metamagics.metamagic.length>1){
                                for(var i=0;i<chummerfile.characters.character.metamagics.metamagic.length;i++){
                                    var newrowid=generateRowID();
                                    attributes["repeating_initiation_"+newrowid+"_metamagicname"]=chummerfile.characters.character.metamagics.metamagic[i].name;
                                    if(chummerfile.characters.character.metamagics.metamagic[i].notes != null) {
                                        attributes["repeating_initiation_"+newrowid+"_metamagicdescription"]=chummerfile.characters.character.metamagics.metamagic[i].notes
                                    }
                                }
                            }else{
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
                try{
                    if(chummerfile.characters.character.martialarts != null){
                        console.log("Importing martialarts");
                        if(chummerfile.characters.character.martialarts.martialart.length>1){
                            for(var i=0;i<chummerfile.characters.character.martialarts.martialart.length;i++){
                                if(chummerfile.characters.character.martialarts.martialart[i].martialarttechniques!=null){
                                    if(chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechniques.length>1){
                                        for(var j=0;j<chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechniques.length;j++){
                                            var newrowid=generateRowID();
                                            attributes["repeating_martial_"+newrowid+"_martialname"]=chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechnique[j].name;
                                            attributes["repeating_martial_"+newrowid+"_martialdescription"]=chummerfile.characters.character.martialarts.martialart[i].name;
                                        }
                                    }else{
                                        var newrowid=generateRowID();
                                        attributes["repeating_martial_"+newrowid+"_martialname"]=chummerfile.characters.character.martialarts.martialart[i].martialarttechniques.martialarttechnique.name;
                                        attributes["repeating_martial_"+newrowid+"_martialdescription"]=chummerfile.characters.character.martialarts.martialart[i].name;
                                    }
                                }
                            }
                        }else{
                            if(chummerfile.characters.character.martialarts.martialart.martialarttechniques!=null){
                                if(chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique.length>1){
                                    for(var j=0;j<chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique.length;j++){
                                        var newrowid=generateRowID();
                                        attributes["repeating_martial_"+newrowid+"_martialname"]=chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique[j].name;
                                        attributes["repeating_martial_"+newrowid+"_martialdescription"]=chummerfile.characters.character.martialarts.martialart.name;
                                    }
                                }else{
                                    var newrowid=generateRowID();
                                    attributes["repeating_martial_"+newrowid+"_martialname"]=chummerfile.characters.character.martialarts.martialart.martialarttechniques.martialarttechnique.name;
                                    attributes["repeating_martial_"+newrowid+"_martialdescription"]=chummerfile.characters.character.martialarts.martialart.name;
                                }
                            }
                        }
                    }
                }catch(err){
                    goodcode=false;
                    error= error + "\n" + "Error with Martial Arts " +err
                }
                try{
                    if(chummerfile.characters.character.qualities!=null){
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
                    var essence=0.0;
                    if(chummerfile.characters.character.cyberwares!=null){
                        console.log("Importing Cyberware");
                        if(chummerfile.characters.character.cyberwares.cyberware.length>1){
                            for(var i=0;i<chummerfile.characters.character.cyberwares.cyberware.length;i++){
                                var newrowid=generateRowID();
                                attributes["repeating_ware_"+newrowid+"_warename"]=chummerfile.characters.character.cyberwares.cyberware[i].name;
                                attributes["repeating_ware_"+newrowid+"_waredescription"]=chummerfile.characters.character.cyberwares.cyberware[i].rating;
                                attributes["repeating_ware_"+newrowid+"_waregrade"]=chummerfile.characters.character.cyberwares.cyberware[i].grade;
                                attributes["repeating_ware_"+newrowid+"_warekarma"]=chummerfile.characters.character.cyberwares.cyberware[i].ess;
                                essence+=Number(chummerfile.characters.character.cyberwares.cyberware[i].ess.replace(",","."));
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

                if(chummerfile.characters.character.armors != null){
                    console.log("Importing armors");
                    if(chummerfile.characters.character.armors.armor.length>1){
                        for(var i=0;i<chummerfile.characters.character.armors.armor.length;i++){
                            try{
                                importSingleArmor(chummerfile.characters.character.armors.armor[i], attributes);
                            }catch(err){
                                goodcode=false;
                                error= error + "\n" + "Error with Armor " + chummerfile.characters.character.armors.armor[i].name + ": " + err
                            }
                        }
                    }else{
                        try{
                            importSingleArmor(chummerfile.characters.character.armors.armor, attributes);
                        }catch(err){
                            goodcode=false;
                            error= error + "\n" + "Error with Armor " + chummerfile.characters.character.armors.armor.name + ": " + err
                        }
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
                            if(chummerfile.characters.character.gears.gear[j].category_english == "Ammunition" ||
                                chummerfile.characters.character.gears.gear[j].name_english == "Micro Flares"
                            ){
                                ammunition.push(chummerfile.characters.character.gears.gear[j]);
                            }
                        }
                    }

                    if(chummerfile.characters.character.weapons.weapon.length > 1){
                        for(var i=1; i<chummerfile.characters.character.weapons.weapon.length+1; i++){
                            try{
                                if(i < 9) {
                                    importSingleWeapon(text, chummerfile.characters.character.weapons.weapon[i-1], i, ammunition, attributes);
                                } else {
                                    await importSingleRepeatingWeapon(text, chummerfile.characters.character.weapons.weapon[i-1], ammunition, attributes);
                                }
                            }
                            catch(err) {
                                goodcode=false;
                                error= error + "\n" + "Error with Weapon " + chummerfile.characters.character.weapons.weapon[i-1].name + ": " +err
                            }
                        }

                    }else{
                        try{
                            importSingleWeapon(text, chummerfile.characters.character.weapons.weapon, 1, ammunition, attributes);
                        }
                        catch(err) {
                                goodcode=false;
                                error= error + "\n" + "Error with Weapon " + chummerfile.characters.character.weapons.weapon.name + ": " +err
                        }
                    }
                }

                try{
                    if(chummerfile.characters.character.complexforms != null){
                        console.log("Importing complexforms");
                        if(chummerfile.characters.character.complexforms.complexform.length>1){
                            for(var i=0;i<chummerfile.characters.character.complexforms.complexform.length;i++){
                                var newrowid=generateRowID();
                                attributes["repeating_spells_"+newrowid+"_spellname"]=chummerfile.characters.character.complexforms.complexform[i].name;
                                attributes["repeating_spells_"+newrowid+"_spellschool"]="@{skilldicepool42}";
                                attributes["repeating_spells_"+newrowid+"_spellduration"]=chummerfile.characters.character.complexforms.complexform[i].duration;
                                if(chummerfile.characters.character.complexforms.complexform[i].fv.match(/(\-|\+)\d/)!=null){
                                    attributes["repeating_spells_"+newrowid+"_spelldrain"]=chummerfile.characters.character.complexforms.complexform[i].fv.match(/(\-|\+)\d/);
                                }else{
                                    attributes["repeating_spells_"+newrowid+"_spelldrain"]="-0";
                                }
                            }
                        }else{
                            var newrowid=generateRowID();
                            attributes["repeating_spells_"+newrowid+"_spellname"]=chummerfile.characters.character.complexforms.complexform.name;
                            attributes["repeating_spells_"+newrowid+"_spellschool"]="@{skilldicepool42}";
                            attributes["repeating_spells_"+newrowid+"_spellduration"]=chummerfile.characters.character.complexforms.complexform.duration;
                            if(chummerfile.characters.character.complexforms.complexform.fv.match(/(\-|\+)\d/)!=null)
                                attributes["repeating_spells_"+newrowid+"_spelldrain"]=chummerfile.characters.character.complexforms.complexform.fv.match(/(\-|\+)\d/);
                            else
                                attributes["repeating_spells_"+newrowid+"_spelldrain"]="-0";
                        }
                    }
                }catch(err){
                    goodcode=false;
                    error= error + "\n" + "Error with Complex-Forms " +err
                }
                try{
                    if(chummerfile.characters.character.gears != null){
                        console.log("Importing gear");
                        if(chummerfile.characters.character.gears.gear.length>1){
                            for(var i=0;i<chummerfile.characters.character.gears.gear.length;i++){
                                var newrowid=generateRowID();
                                if((chummerfile.characters.character.gears.gear[i].category_english=="Common Programs")||(chummerfile.characters.character.gears.gear[i].category_english=="Hacking Programs")){
                                    attributes["repeating_programs_"+newrowid+"_programname"]=chummerfile.characters.character.gears.gear[i].name;
                                }else if(chummerfile.characters.character.gears.gear[i].name!=null){
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
                                                if(chummerfile.characters.character.gears.gear[i].children.gear[j].category_english=="Common Programs"||chummerfile.characters.character.gears.gear[i].children.gear[j].category_english=="Hacking Programs"){
                                                    var newrowidb=generateRowID();
                                                    attributes["repeating_programs_"+newrowidb+"_programname"]=chummerfile.characters.character.gears.gear[i].children.gear[j].name;
                                                }else{
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
                                            if(chummerfile.characters.character.gears.gear[i].children.gear.category_english=="Common Programs"||chummerfile.characters.character.gears.gear[i].children.gear.category_english=="Hacking Programs"){
                                                var newrowidb=generateRowID();
                                                attributes["repeating_programs_"+newrowidb+"_programname"]=chummerfile.characters.character.gears.gear[i].children.gear.name;
                                            }else{
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
                }catch(err){
                    goodcode=false;
                    error= error + "\n" + "Error with Gear " +err
                }

                try {
                    //import ai programs
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
                            attributes["repeating_programs_"+newrowid+"_programname"]=chummerfile.characters.character.aiprograms.aiprogram.name;
                        }
                    }
                }catch(err){
                       goodcode=false;
                       error= error + "\n" + "Error with AI programs " +err
                }

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
                var index=[];
                for(var i=1;i<73;i++)
                {
                    var name='skillname'+i;
                    index[i-1]=name;
                }
                getAttrs(index, function(names){
                    var exotics=73;
                    var alchemy=0;
                    var spellcasting=0;
                    var ritual=0;
                    try{
                        console.log("Importing Skills");
						if(chummerfile.characters.character.skills.skill[0].name_english !== undefined) {
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
                                if(chummerfile.characters.character.skills.skill[i].knowledge=="True"){
                                    var newrowid=generateRowID();
                                    attributes["repeating_knowledge_"+newrowid+"_knowledgename"]=chummerfile.characters.character.skills.skill[i].name;
                                    if(chummerfile.characters.character.skills.skill[i].skillcategory_english!=null){
                                      attributes["repeating_knowledge_"+newrowid+"_knowledgeattr"]="@{"+chummerfile.characters.character.skills.skill[i].skillcategory_english.toLowerCase();
                                    }
                                    if(chummerfile.characters.character.skills.skill[i].rating>0){
                                        attributes["repeating_knowledge_"+newrowid+"_knowledgerating"]=chummerfile.characters.character.skills.skill[i].rating;
                                        attributes["repeating_knowledge_"+newrowid+"_knowledgebonus"]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod;
                                    }else{
                                        attributes["repeating_knowledge_"+newrowid+"_knowledgerating"]="-1";
                                        attributes["repeating_knowledge_"+newrowid+"_knowledgebonus"]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod+1;
                                    }
                                    if(chummerfile.characters.character.skills.skill[i].skillspecializations!=null) {
                                        attributes["repeating_knowledge_"+newrowid+"_knowledgespec"]=chummerfile.characters.character.skills.skill[i].skillspecializations.skillspecialization.name;
                                    }
                                    else
                                        attributes["repeating_knowledge_"+newrowid+"_knowledgespec"]="none";
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
                                    if(chummerfile.characters.character.skills.skill[i].skillspecializations!=null)
                                        attributes["skillspec"+exotics]=chummerfile.characters.character.skills.skill[i].skillspecializations.skillspecialization.name;
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
                                        if(chummerfile.characters.character.skills.skill[i].skillspecializations != null && chummerfile.characters.character.skills.skill[i].skillspecializations.skillspecialization.name != null)
                                            attributes["skillspec"+j]=chummerfile.characters.character.skills.skill[i].skillspecializations.skillspecialization.name;
                                        else
                                            attributes["skillspec"+j]="none";
                                        if(chummerfile.characters.character.weapons!=null){
                                            if(chummerfile.characters.character.weapons.weapon.length>1){
                                                for(var h=1;h<chummerfile.characters.character.weapons.weapon.length+1&&h<9;h++){
                                                    if(chummerfile.characters.character.weapons.weapon[h-1].category!="Gear"){
                                                        if(names[compname] == chummerfile.characters.character.weapons.weapon[h-1].skill){
                                                            attributes["weaponcategory"+h]="@{skilldicepool"+j+"}";
                                                            attributes["weaponbonus"+h]=chummerfile.characters.character.weapons.weapon[h-1].dicepool-chummerfile.characters.character.skills.skill[i].total;
                                                        }
                                                    }
                                                }
                                            }else{
                                                if(chummerfile.characters.character.weapons.weapon.category!="Gear"){
                                                    if(names[compname] == chummerfile.characters.character.weapons.weapon.skill){
                                                        attributes["weaponcategory1"]="@{skilldicepool"+j+"}";
                                                        attributes["weaponbonus1"]=chummerfile.characters.character.weapons.weapon.dicepool-chummerfile.characters.character.skills.skill[i].total;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
						}
						else {

						for(var i=0;i<chummerfile.characters.character.skills.skill.length;i++){
                            if(chummerfile.characters.character.skills.skill[i].name=="Alchemy"){
                                alchemy=i;
                            }
                            if(chummerfile.characters.character.skills.skill[i].name=="Spellcasting"){
                                spellcasting=i;
                            }
                            if(chummerfile.characters.character.skills.skill[i].name=="Ritual Spellcasting"){
                                ritual=i;
                            }
                            if(chummerfile.characters.character.skills.skill[i].knowledge=="True"){
                                var newrowid=generateRowID();
                                attributes["repeating_knowledge_"+newrowid+"_knowledgename"]=chummerfile.characters.character.skills.skill[i].name;
                                if(chummerfile.characters.character.skills.skill[i].skillcategory_english!=null)
                                    attributes["repeating_knowledge_"+newrowid+"_knowledgeattr"]="@{"+chummerfile.characters.character.skills.skill[i].skillcategory_english.toLowerCase();
                                if(chummerfile.characters.character.skills.skill[i].rating>0){
                                    attributes["repeating_knowledge_"+newrowid+"_knowledgerating"]=chummerfile.characters.character.skills.skill[i].rating;
                                    attributes["repeating_knowledge_"+newrowid+"_knowledgebonus"]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod;
                                }else{
                                    attributes["repeating_knowledge_"+newrowid+"_knowledgerating"]="-1";
                                    attributes["repeating_knowledge_"+newrowid+"_knowledgebonus"]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod+1;
                                }
                                if(chummerfile.characters.character.skills.skill[i].skillspecializations!=null)
                                    attributes["repeating_knowledge_"+newrowid+"_knowledgespec"]=chummerfile.characters.character.skills.skill[i].skillspecializations.skillspecialization.name;
                                else
                                    attributes["repeating_knowledge_"+newrowid+"_knowledgespec"]="none";
                            }
                            if(chummerfile.characters.character.skills.skill[i].exotic=="True"){
                                attributes["skillname"+exotics]=chummerfile.characters.character.skills.skill[i].name;
                                if(chummerfile.characters.character.skills.skill[i].rating>0){
                                    attributes["skillbonus"+exotics]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod;
                                    attributes["skillrating"+exotics]=chummerfile.characters.character.skills.skill[i].rating;
                                }else{
                                    attributes["skillrating"+exotics]="-1";
                                    attributes["skillbonus"+exotics]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod+1;
                                }
                                attributes["skillattr"+exotics]="@{"+chummerfile.characters.character.skills.skill[i].attribute.toLowerCase();
                                if(chummerfile.characters.character.skills.skill[i].skillspecializations!=null)
                                    attributes["skillspec"+exotics]=chummerfile.characters.character.skills.skill[i].skillspecializations.skillspecialization.name;
                                else
                                    attributes["skillspec"+exotics]="none";
                                exotics++;
                            }
                            for(var j=1;j<73;j++){
                                var compname='skillname'+j;
                                if((names[compname]==chummerfile.characters.character.skills.skill[i].name)||(chummerfile.characters.character.skills.skill[i].name=="Locksmith"&&j==29)||(chummerfile.characters.character.skills.skill[i].name=="Pilot Ground Craft"&&j==55)){
                                    attributes["skillattr"+j]="@{"+chummerfile.characters.character.skills.skill[i].attribute.toLowerCase();
                                    if(chummerfile.characters.character.skills.skill[i].rating>0){
                                        attributes["skillrating"+j]=chummerfile.characters.character.skills.skill[i].rating;
                                        attributes["skillbonus"+j]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod;
                                    }else{
                                        attributes["skillrating"+j]="-1";
                                        attributes["skillbonus"+j]=chummerfile.characters.character.skills.skill[i].total-chummerfile.characters.character.skills.skill[i].rating-chummerfile.characters.character.skills.skill[i].attributemod+1;
                                    }
                                    if(chummerfile.characters.character.skills.skill[i].skillspecializations != null && chummerfile.characters.character.skills.skill[i].skillspecializations.skillspecialization.name != null)
                                        attributes["skillspec"+j]=chummerfile.characters.character.skills.skill[i].skillspecializations.skillspecialization.name;
                                    else
                                        attributes["skillspec"+j]="none";
                                    if(chummerfile.characters.character.weapons!=null){
                                        if(chummerfile.characters.character.weapons.weapon.length>1){
                                            for(var h=1;h<chummerfile.characters.character.weapons.weapon.length+1&&h<=6;h++){
                                                if(chummerfile.characters.character.weapons.weapon[h-1].category!="Gear"){
                                                    if(names[compname]==chummerfile.characters.character.weapons.weapon[h-1].skill){
                                                        attributes["weaponcategory"+h]="@{skilldicepool"+j+"}";
                                                        attributes["weaponbonus"+h]=chummerfile.characters.character.weapons.weapon[h-1].dicepool-chummerfile.characters.character.skills.skill[i].total;
                                                    }
                                                }
                                            }
                                        }else{
                                            if(chummerfile.characters.character.weapons.weapon.category!="Gear"){
                                                if(names[compname]==chummerfile.characters.character.weapons.weapon.skill){
                                                    attributes["weaponcategory1"]="@{skilldicepool"+j+"}";
                                                    attributes["weaponbonus1"]=chummerfile.characters.character.weapons.weapon.dicepool-chummerfile.characters.character.skills.skill[i].total;
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
                        error= error + "\n" + "Error with Skills: "+ err;
                    }
                    try{
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
                       if(chummerfile.characters.character.contacts!=null){
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
                     //import cyberdeck
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

                    attributes.warningcheckbox="0";
                    attributes.chummercheckbox="0";
                    attributes.chummertext="Import successful\nREMEMBER THIS IS ONLY A HELP AND YOU NEED TO DOUBLE CHECK EVERYTHING.\nSpecifically check the following values manually:\n-Character Name\n-Limitmodifiers global or applying to single skills\n-Cyberdeck and Matrix Actions\n-Vehicle and Drone Autosofts\n-SINs + Lifestyles\nWeapon AP, Acc, RC"
                    if(goodcode){
                        try{
                            clearSheet(attributes, text.experimental);
                            console.log("Writing new data");
                            setAttrs(attributes);
                        }catch(err){
                            setAttrs({
                                chummertext:"Error setting Attributes: " + err,
                                chummercheckbox:"0",
                                warningcheckbox:"0"
                            });
                        }
                    }else{
                        setAttrs({
                            chummertext:error,
                            chummercheckbox:"0",
                            warningcheckbox:"0"
                        });
                    }
                });
            }else{
                setAttrs({
                    chummertext:"Error invalid Structure: " + error,
                    chummercheckbox:"0",
                    warningcheckbox:"0"
                });
            }
        }
});