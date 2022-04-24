on("sheet:opened", function() {
    var names=[];
    for(var i=1; i<77; i++)
    {
        var name='skillspec'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values) {
        for(var prop in values)
        {
            if(values[prop]=="0")
            {
                values[prop]="none";
            }
        }
        values.warningcheckbox=0;
        values.chummercheckbox=0;
        values.chummertext="In Chummer make sure to mark your character as created\nwith a created character go to File->Export->Export JSON\ncopy the file and paste it into this textfield overriding this text\nclick import and accept\nWhen using Chummer 5.213.95 or later the import is language independent\nIf you find bugs, please report them at https://github.com/Roll20/roll20-character-sheets/issues";
        values.experimental=0;
        values.nightly=0;
        setAttrs(values);
    });

    var armors=[];
    for(var i=1; i <9; i++) {
        armors.push('armorname'+i);
        armors.push('armorcapacity'+i);
        armors.push('armornotes'+i);
        armors.push('armorrating'+i);
    }
    armors.push('armormigration042021');
    getAttrs(armors, function(values) {
        var attributes={};
        keys = Object.keys(values);

        if(values.armormigration042021){
            return;
        }

        if(keys.includes('armorname1') && values.armorname1 !== null) {
            var newrowid=generateRowID()
            attributes["repeating_armors_"+newrowid+"_armorname"]=values.armorname1;
            attributes["repeating_armors_"+newrowid+"_armorrating"]=!!values.armorrating1 ? values.armorrating1 : "0";
            attributes["repeating_armors_"+newrowid+"_armornotes"]=!!values.armornotes1 ? values.armornotes1 : "";
            attributes["repeating_armors_"+newrowid+"_armorcapacity"]=!!values.armorcapacity1 ? values.armorcapacity1 : "0";
        }

        if(keys.includes('armorname2') && values.armorname2 !== null) {
            var newrowid=generateRowID()
            attributes["repeating_armors_"+newrowid+"_armorname"]=values.armorname2;
            attributes["repeating_armors_"+newrowid+"_armorrating"]=!!values.armorrating2 ? values.armorrating2 : "0";
            attributes["repeating_armors_"+newrowid+"_armornotes"]=!!values.armornotes2 ? values.armornotes2 : "";
            attributes["repeating_armors_"+newrowid+"_armorcapacity"]=!!values.armorcapacity2 ? values.armorcapacity2 : "0";
        }

        if(keys.includes('armorname3') && values.armorname3 !== null) {
            var newrowid=generateRowID()
            attributes["repeating_armors_"+newrowid+"_armorname"]=values.armorname3;
            attributes["repeating_armors_"+newrowid+"_armorrating"]=!!values.armorrating3 ? values.armorrating3 : "0";
            attributes["repeating_armors_"+newrowid+"_armornotes"]=!!values.armornotes3 ? values.armornotes3 : "";
            attributes["repeating_armors_"+newrowid+"_armorcapacity"]=!!values.armorcapacity3 ? values.armorcapacity3 : "0";
        }

        if(keys.includes('armorname4') && values.armorname4 !== null) {
            var newrowid=generateRowID()
            attributes["repeating_armors_"+newrowid+"_armorname"]=values.armorname4;
            attributes["repeating_armors_"+newrowid+"_armorrating"]=!!values.armorrating4 ? values.armorrating4 : "0";
            attributes["repeating_armors_"+newrowid+"_armornotes"]=!!values.armornotes4 ? values.armornotes4 : "";
            attributes["repeating_armors_"+newrowid+"_armorcapacity"]=!!values.armorcapacity4 ? values.armorcapacity4 : "0";
        }

        if(keys.includes('armorname5') && values.armorname5 !== null) {
            var newrowid=generateRowID()
            attributes["repeating_armors_"+newrowid+"_armorname"]=values.armorname5;
            attributes["repeating_armors_"+newrowid+"_armorrating"]=!!values.armorrating5 ? values.armorrating5 : "0";
            attributes["repeating_armors_"+newrowid+"_armornotes"]=!!values.armornotes5 ? values.armornotes5 : "";
            attributes["repeating_armors_"+newrowid+"_armorcapacity"]=!!values.armorcapacity5 ? values.armorcapacity5 : "0";
        }

        if(keys.includes('armorname6') && values.armorname6 !== null) {
            var newrowid=generateRowID()
            attributes["repeating_armors_"+newrowid+"_armorname"]=values.armorname6;
            attributes["repeating_armors_"+newrowid+"_armorrating"]=!!values.armorrating6 ? values.armorrating6 : "0";
            attributes["repeating_armors_"+newrowid+"_armornotes"]=!!values.armornotes6 ? values.armornotes6 : "";
            attributes["repeating_armors_"+newrowid+"_armorcapacity"]=!!values.armorcapacity6 ? values.armorcapacity6 : "0";
        }

        if(keys.includes('armorname7') && values.armorname7 !== null) {
            var newrowid=generateRowID()
            attributes["repeating_armors_"+newrowid+"_armorname"]=values.armorname7;
            attributes["repeating_armors_"+newrowid+"_armorrating"]=!!values.armorrating7 ? values.armorrating7 : "0";
            attributes["repeating_armors_"+newrowid+"_armornotes"]=!!values.armornotes7 ? values.armornotes7 : "";
            attributes["repeating_armors_"+newrowid+"_armorcapacity"]=!!values.armorcapacity7 ? values.armorcapacity7 : "0";
        }

        if(keys.includes('armorname8') && values.armorname8 !== null) {
            var newrowid=generateRowID()
            attributes["repeating_armors_"+newrowid+"_armorname"]=values.armorname8;
            attributes["repeating_armors_"+newrowid+"_armorrating"]=!!values.armorrating8 ? values.armorrating8 : "0";
            attributes["repeating_armors_"+newrowid+"_armornotes"]=!!values.armornotes8 ? values.armornotes8 : "";
            attributes["repeating_armors_"+newrowid+"_armorcapacity"]=!!values.armorcapacity8 ? values.armorcapacity8 : "0";
        }
        attributes["armormigration042021"] = true;
        setAttrs(attributes);
    });
});