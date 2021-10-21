on(`clicked:domaineArtistique`, function(info) {
    let roll = info.htmlAttributes.value;

    let attributs = [
        "jetModifDes",
        "bonusCarac",
        "caracteristique1Art",
        "caracteristique2Art",
        "caracteristique3Art",
        "caracteristique4Art"
    ];

    getAttrs(attributs, function(value)
    {
        let exec = [];

        let mod = Number(value["jetModifDes"]);
        let hasBonus = Number(value["bonusCarac"]);

        let C1 = value["caracteristique1Art"];
        let C2 = value["caracteristique2Art"];
        let C3 = value["caracteristique3Art"];
        let C4 = value["caracteristique4Art"];

        let C1Nom = C1.slice(2, -1);
        let C2Nom = C2.slice(2, -1);
        let C3Nom = C3.slice(2, -1);
        let C4Nom = C4.slice(2, -1);

        let cRoll = [];
        let cNom1 = [];
        let cNom2 = [];

        let bonus = [];

        exec.push(roll);

        if(C1 != "0") {
            cNom1.push(CaracNom[C1Nom]);
            cRoll.push(C1);
        };

        if(C2 != "0") {
            cNom1.push(CaracNom[C2Nom]);
            cRoll.push(C2);
        }

        if(hasBonus == 1 || hasBonus == 2) {
            if(C3 != "0") {
                cNom2.push(CaracNom[C3Nom]);
                cRoll.push(C3);
            }
        }

        if(hasBonus == 2) {
            if(C4 != "0") {
                cNom2.push(CaracNom[C4Nom]);
                cRoll.push(C4);
            }
        }

        exec.push("{{cBase="+cNom1.join(" - ")+"}}");

        if(hasBonus > 0)
            exec.push("{{cBonus="+cNom2.join(" - ")+"}}");

        if(mod != 0) {
            cRoll.push(mod);
            exec.push("{{mod=[["+mod+"]]}}");
        }

        if(cRoll.length == 0)
            cRoll.push(0);  
    
        exec.push("{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}");
        exec.push("{{tBonus=[["+bonus.join("+")+"+0]]}}");
        exec.push("{{Exploit=[["+cRoll.join("+")+"]]}}");

        startRoll(exec.join(" "), (results) => {
            let tJet = results.results.jet.result;
            let tBonus = results.results.tBonus.result;
            let tExploit = results.results.Exploit.result;

            let total = tJet+tBonus;

            finishRoll(
                results.rollId, 
                {
                    jet:total
                }
            );

            if(tJet != 0 && tJet == tExploit)
                startRoll(roll+"@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+i18n_exploit+"}}{{jet=[[ {[[{"+cRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}", (exploit) => {
                    let tExploit = exploit.results.jet.result;

                    finishRoll(
                        exploit.rollId, 
                        {
                            jet:tExploit
                        }
                    );
            });
            
        });
    });
});
