on("change:resolve", (eventInfo) => {
    let attrsName = ["resolve"];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("resolve_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let life = parseInt(attrs["resolve"],10) || 0;
        let toUpdate = {}
        for(let i = 1 ; i <= 18 ; i++) {
            let resolveI = attrs["resolve_"+i];
            if(resolveI == null || resolveI == undefined) {
                toUpdate["resolve_"+i] = (i <= life) ? 0 : -1;
            }
            let resolveINum = parseInt(resolveI,10) || 0;
            if(i <= life && resolveINum == -1) {
                resolveINum = 0;
            }
            else if(i > life && resolveINum != -1) {
                resolveINum = -1;
            }
            toUpdate["resolve_"+i] = resolveINum;
        }
        setAttrs(toUpdate);
    });
});

on("clicked:resolve_fatigue", (eventInfo) => {
    let attrsName = [];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("resolve_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let toUpdate= {};
        for(let i = 18; i > 0 ; i--) {
            let resolveI = attrs["resolve_"+i];
            if(resolveI == null || resolveI == undefined) {
                toUpdate["resolve_"+i] = 1;
                setAttrs(toUpdate);
                return;
            }
            let resolveINum = parseInt(resolveI,10) || 0;
            if(resolveINum == -1 || resolveINum == 1)
            {
                continue;
            }
            if(resolveINum == 2 || resolveINum == 3)
            {
                return;
            }
            toUpdate["resolve_"+i] = 1;
            setAttrs(toUpdate);
            return;
        }
    });
});

on("clicked:resolve_normal", (eventInfo) => {
    let attrsName = [];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("resolve_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let toUpdate= {};
        for(let i = 1; i <= 18 ; i++) {
            let resolveI = attrs["resolve_"+i];
            if(resolveI == null || resolveI == undefined) {
                toUpdate["resolve_"+i] = 2;
                setAttrs(toUpdate);
                return;
            }
            let resolveINum = parseInt(resolveI,10) || 0;
            if(resolveINum == 2 || resolveINum == 3)
            {
                continue;
            }
            if(resolveINum == -1 || resolveINum == 1)
            {
                return;
            }
            toUpdate["resolve_"+i] = 2;
            setAttrs(toUpdate);
            return;
        }
    });
});

on("clicked:resolve_rest", (eventInfo) => {
    let attrsName = [];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("resolve_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let toUpdate = {};
        let normal_damage = 0;
        //First Pass, Heal Fatigue Damage and sanitize
        for(let i = 1; i <= 18 ; i++) {
            let resolveI = attrs["resolve_"+i];
            if(resolveI == null || resolveI == undefined) {
                toUpdate["resolve_"+i] = 0;
                continue;
            }
            let resolveINum = parseInt(resolveI,10) || 0;
            if(resolveINum == 1)
            {
                toUpdate["resolve_"+i] = 0;
                continue;
            }
            if(resolveINum == 2)
            {
                normal_damage++;
            }
        }
        //Second pass, Heal half normal damage, Agravate rest 
        normal_damage = Math.ceil(normal_damage / 2);
        for(let i = 18 ; i > 0; i--)
        {
            let resolveI = attrs["resolve_"+i];
            let resolveINum = parseInt(resolveI,10) || 0;
            
            if(resolveINum == 2 && normal_damage > 0)
            {
                toUpdate["resolve_"+i] = 0;
                normal_damage--;
            }
            else if(resolveINum == 2)
            {
                toUpdate["resolve_"+i] = 3;
            }
        }
        setAttrs(toUpdate);
    });
});

on("clicked:resolve_heal", (eventInfo) => {
    let attrsName = [];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("resolve_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let toUpdate = {};
        //Heal fatigue & one Normal/Lasting Damage
        let normalDamageLeft;
        let lastingDamageLeft;
        let healed = false;
        //First pass, Set the track clean and count how many normal/lasting damage are left
        for(let i = 18 ; i > 0 && !healed; i--)
        {
            let resolveI = attrs["resolve_"+i];
            if(resolveI == null || resolveI == undefined) {
                toUpdate["resolve_"+i] = 0;
                continue;
            }
            let resolveINum = parseInt(resolveI,10) || 0;
            if(resolveINum == 1){
                toUpdate["resolve_"+i] = 0;
                continue;
            }
            if((resolveINum == 3 || resolveINum == 2) && !healed)
            {
                toUpdate["resolve_"+i] = 0;
                healed = true;
                continue;
            }
            if(resolveINum == 3)
            {
                toUpdate["resolve_"+i] = 0;
                lastingDamageLeft++;
                continue;
            }
            if(resolveINum == 2)
            {
                toUpdate["resolve_"+i] = 0;
                normalDamageLeft++;
                continue;
            }
        }
        for(let i = 1 ; i <=18 && normalDamageLeft > 0 && lastingDamageLeft > 0;i++)
        {
            if(lastingDamageLeft > 0)
            {
                toUpdate["resolve_"+i] = 3;
                lastingDamageLeft--;
                continue
            }
            toUpdate["resolve_"+i] = 2;
            normalDamageLeft--;
        }
        setAttrs(toUpdate);
        return;
    });
});