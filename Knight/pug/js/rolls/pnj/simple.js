on(`clicked:simplePNJ`, async function(info) {
    let roll = info.htmlAttributes.value;

    let listAttrs = [
        "jetModifDes",
        "aspectPNJ",
    ];

    let attrs = await getAttrsAsync(listAttrs);
    let attrsAspect = [];

    let exec = [];
    let isConditionnel = false;

    let mod = +attrs["jetModifDes"];
    let aspect = attrs["aspectPNJ"];

    let aspectNom = aspect.slice(2, -1);

    let aRoll = [];
    let aNom = "";

    let bonus = [];
    let AE = 0;

    exec.push(roll);

    if(aspect != "0") {
        attrsAspect = await getAttrsAsync([
            aspectNom,
            `${aspectNom}PNJAE`,
            `${aspectNom}PNJAEMaj`,
        ]);

        let tAE = totalAspect(attrsAspect, aspectNom)

        aNom = AspectNom[aspectNom];
        aRoll.push(attrsAspect[aspectNom]);
        AE += tAE;

        exec.push("{{vAE="+tAE+"}}");
    };

    exec.push("{{cBase="+aNom+"}}");

    if(mod != 0) {
        aRoll.push(mod);
        exec.push("{{mod=[["+mod+"]]}}");
    }

    if(aRoll.length == 0)
        aRoll.push(0);

    bonus.push(AE);        

    exec.push("{{jet=[[ {[[{"+aRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{tBonus=[["+bonus.join("+")+"+0]]}} {{Exploit=[["+aRoll.join("+")+"]]}}");

    if(isConditionnel == true)
        exec.push("{{conditionnel=true}}");

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
            startRoll(roll+"@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1="+i18n_exploit+"}} {{jet=[[ {[[{"+aRoll.join("+")+", 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}", (exploit) => {
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