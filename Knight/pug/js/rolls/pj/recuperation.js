on(`clicked:recuperation`, function(info) {
    let roll = info.htmlAttributes.value;

    getAttrs(["espoir", "espoir_max"], function(value)
    {
        let espoir = Number(value["espoir"]);
        let max = Number(value["espoir_max"]);

        startRoll(roll+" {{oldE=[["+espoir+"]]}}", (results) => {

            let result = Number(results.results.jet.result);
            let total = espoir+result;

            if(results.results.gainBonus != undefined)
                total += results.results.gainBonus.result;

            if(total > max)
                total = max;

            var newAttr = {};
            newAttr["espoir"] = total;
            
            setAttrs(newAttr);
            finishRoll(
                results.rollId, {
                    oldE:total
                }
            );
        });
    });
});