on("change:lifeblood", (eventInfo) => {
    let attrsName = ["lifeblood"];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("lifeblood_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let life = parseInt(attrs["lifeblood"],10) || 0;
        let toUpdate = {}
        for(let i = 1 ; i <= 18 ; i++) {
            let lifebloodI = attrs["lifeblood_"+i];
            if(lifebloodI == null || lifebloodI == undefined) {
                toUpdate["lifeblood_"+i] = (i <= life) ? 0 : -1;
            }
            let lifebloodINum = parseInt(lifebloodI,10) || 0;
            if(i <= life && lifebloodINum == -1) {
                lifebloodINum = 0;
            }
            else if(i > life && lifebloodINum != -1) {
                lifebloodINum = -1;
            }
            toUpdate["lifeblood_"+i] = lifebloodINum;
        }
        setAttrs(toUpdate);
    });
});

on("clicked:damage_fatigue", (eventInfo) => {
    let attrsName = [];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("lifeblood_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let toUpdate= {};
        for(let i = 18; i > 0 ; i--) {
            let lifebloodI = attrs["lifeblood_"+i];
            if(lifebloodI == null || lifebloodI == undefined) {
                toUpdate["lifeblood_"+i] = 1;
                setAttrs(toUpdate);
                return;
            }
            let lifebloodINum = parseInt(lifebloodI,10) || 0;
            if(lifebloodINum == -1 || lifebloodINum == 1)
            {
                continue;
            }
            if(lifebloodINum == 2 || lifebloodINum == 3)
            {
                return;
            }
            toUpdate["lifeblood_"+i] = 1;
            setAttrs(toUpdate);
            return;
        }
    });
});

on("clicked:damage_normal", (eventInfo) => {
    let attrsName = [];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("lifeblood_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let toUpdate= {};
        for(let i = 1; i <= 18 ; i++) {
            let lifebloodI = attrs["lifeblood_"+i];
            if(lifebloodI == null || lifebloodI == undefined) {
                toUpdate["lifeblood_"+i] = 2;
                setAttrs(toUpdate);
                return;
            }
            let lifebloodINum = parseInt(lifebloodI,10) || 0;
            if(lifebloodINum == 2 || lifebloodINum == 3)
            {
                continue;
            }
            if(lifebloodINum == -1 || lifebloodINum == 1)
            {
                return;
            }
            toUpdate["lifeblood_"+i] = 2;
            setAttrs(toUpdate);
            return;
        }
    });
});

on("clicked:damage_rest", (eventInfo) => {
    let attrsName = [];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("lifeblood_"+i);
    }
    getAttrs(attrsName, (attrs) => {
        let toUpdate = {};
        let normal_damage = 0;
        //First Pass, Heal Fatigue Damage and sanitize
        for(let i = 1; i <= 18 ; i++) {
            let lifebloodI = attrs["lifeblood_"+i];
            if(lifebloodI == null || lifebloodI == undefined) {
                toUpdate["lifeblood_"+i] = 0;
                continue;
            }
            let lifebloodINum = parseInt(lifebloodI,10) || 0;
            if(lifebloodINum == 1)
            {
                toUpdate["lifeblood_"+i] = 0;
                continue;
            }
            if(lifebloodINum == 2)
            {
                normal_damage++;
            }
        }
        //Second pass, Heal half normal damage, Agravate rest 
        normal_damage = Math.ceil(normal_damage / 2);
        for(let i = 18 ; i > 0; i--)
        {
            let lifebloodI = attrs["lifeblood_"+i];
            let lifebloodINum = parseInt(lifebloodI,10) || 0;
            
            if(lifebloodINum == 2 && normal_damage > 0)
            {
                toUpdate["lifeblood_"+i] = 0;
                normal_damage--;
            }
            else if(lifebloodINum == 2)
            {
                toUpdate["lifeblood_"+i] = 3;
            }
        }
        setAttrs(toUpdate);
    });
});

on("clicked:damage_heal", (eventInfo) => {
    let attrsName = [];
    for(let i = 1 ; i <= 18 ; i++ ) {
        attrsName.push("lifeblood_"+i);
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
            let lifebloodI = attrs["lifeblood_"+i];
            if(lifebloodI == null || lifebloodI == undefined) {
                toUpdate["lifeblood_"+i] = 0;
                continue;
            }
            let lifebloodINum = parseInt(lifebloodI,10) || 0;
            if(lifebloodINum == 1){
                toUpdate["lifeblood_"+i] = 0;
                continue;
            }
            if((lifebloodINum == 3 || lifebloodINum == 2) && !healed)
            {
                toUpdate["lifeblood_"+i] = 0;
                healed = true;
                continue;
            }
            if(lifebloodINum == 3)
            {
                toUpdate["lifeblood_"+i] = 0;
                lastingDamageLeft++;
                continue;
            }
            if(lifebloodINum == 2)
            {
                toUpdate["lifeblood_"+i] = 0;
                normalDamageLeft++;
                continue;
            }
        }
        for(let i = 1 ; i <=18 && normalDamageLeft > 0 && lastingDamageLeft > 0;i++)
        {
            if(lastingDamageLeft > 0)
            {
                toUpdate["lifeblood_"+i] = 3;
                lastingDamageLeft--;
                continue
            }
            toUpdate["lifeblood_"+i] = 2;
            normalDamageLeft--;
        }
        setAttrs(toUpdate);
        return;
    });
});