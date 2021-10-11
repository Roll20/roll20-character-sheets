const priestRollMechanic = ["priestJetMechanicContact", "priestJetMechanicDistance", "rollMALPriestJetMechanicContact", "rollMALPriestJetMechanicDistance"];

priestRollMechanic.forEach(button => {
    on(`clicked:${button}`, function(info) {
        let roll = info.htmlAttributes.value;

        let attributs = [];

        getAttrs(attributs, function(value)
        {
            let exec = [];
            exec.push(roll);
            
            startRoll(exec.join(" "), (results) => {
                finishRoll(
                    results.rollId, 
                    {}
                );
            });
        });
    });
});