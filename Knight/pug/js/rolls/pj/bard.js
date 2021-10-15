on(`clicked:distanceBard`, function(info) {
    let roll = info.htmlAttributes.value;
    let armureL = donneesPJ["ArmureLegende"];

    let attributs = [
        "bardAttSpe"
    ];

    switch(armureL) {
        case "barbarian":
            attributs.push("MALBarbarianGoliath");
            break;

        case "rogue":
            attributs.push("MALRogueGhost");
            break;
            
        case "warrior":
            attributs.push("MALWarriorSoldierA");
            attributs.push("MALWarriorHunterA");
            attributs.push("MALWarriorScholarA");
            attributs.push("MALWarriorHeraldA");
            attributs.push("MALWarriorScoutA");
            break;
    }

    getAttrs(attributs, function(value)
    {
        let exec = [];

        let degats = value["bardAttSpe"];
        let violence = value["bardAttSpe"];

        let MALGoliath;
        let MALGhost;
        let MALTypeSoldier;
        let MALTypeHunter;
        let MALTypeHerald;
        let MALTypeScholar;
        let MALTypeScout;

        exec.push(roll);

        switch(armureL) {
            case "barbarian":
                MALGoliath = Number(value["MALBarbarianGoliath"]);

                if(MALGoliath != 0)
                    exec.push("{{MALGoliath=[["+MALGoliath+"]]}}");
                break;
    
            case "rogue":
                MALGhost = value["MALRogueGhost"];

                if(MALGhost != "")
                    exec.push("{{MALspecial2="+i18n_ghostActive+"}}");
                break;

            case "warrior":
                MALTypeSoldier = value["MALWarriorSoldierA"];
                MALTypeHunter = value["MALWarriorHunterA"];
                MALTypeHerald = value["MALWarriorHeraldA"];
                MALTypeScholar = value["MALWarriorScholarA"];
                MALTypeScout = value["MALWarriorScoutA"];

                if(MALTypeSoldier != 0)
                    exec.push("{{MALspecial2="+i18n_typeSoldier+"}}");         

                if(MALTypeHunter != 0)
                    exec.push("{{MALspecial2="+i18n_typeHunter+"}}");

                if(MALTypeHerald != 0)
                    exec.push("{{MALspecial2="+i18n_typeHerald+"}}");

                if(MALTypeScholar != 0)
                    exec.push("{{MALspecial2="+i18n_typeScholar+"}}");

                if(MALTypeScout != 0)
                    exec.push("{{MALspecial2="+i18n_typeScout+"}}");
                break;
        }

        exec.push("{{degats=[["+degats+"]]}}");
        exec.push("{{violence=[["+violence+"]]}}");
        exec.push("{{succesConditionnel=true}}");
        exec.push("{{chocAutomatique="+i18n_choc+" 1}}");
        exec.push("{{chocAutomatiqueCondition="+i18n_chocAutomatique+" < 12}}");
        exec.push("{{effets="+i18n_ignoreArmure+" / "+i18n_ignoreCDF+" / "+i18n_dispersion+" 6}}")

        startRoll(exec.join(" "), (results) => {
            let tDegats = results.results.degats.result;
            let tViolence = results.results.violence.result;

            finishRoll(
                results.rollId, 
                {
                    degats:tDegats,
                    violence:tViolence
                }
            );            
        });
    });
});
