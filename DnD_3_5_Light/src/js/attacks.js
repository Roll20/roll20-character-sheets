/*Update attaques*/
on("change:bba", ()=>{
    getSectionIDs("repeating_attaques",(idArray)=> {
        for (let id of idArray) {
            updateAtq("repeating_attaques_"+id);
        }
    });
});

on("change:repeating_attaques", function(eventInfo) {
    let atqId= eventInfo.triggerName;
    if(eventInfo.sourceAttribute.includes("options-flag")){
        return;
    }
    updateAtq(atqId);
});

function updateAtq(atqId){
    /*A Récup */
    const bbaAttr = "bba";
    const atqCaracAttr = atqId+"_atq-carac";
    const atqModAttr = atqId+"_atq-bonus";
    const atqMod2Attr = atqId+"_atq-bonus-2";
    const dgtBaseAttr = atqId+"_dgt-base";
    const dgtCaracAttr = atqId+"_dgt-carac";
    const dgtBonusAttr = atqId+"_dgt-bonus";
    /* A Set */
    const atqCaracValAttr = atqId+"_atq-carac-val";
    const dgtCaracValAttr = atqId+"_dgt-carac-val";
    const dgtTotalAttk = atqId+"_degats";
    const atqTotalAttk = atqId+"_atq-total";
    getAttrs([bbaAttr,atqCaracAttr,atqModAttr,atqMod2Attr,dgtBaseAttr,dgtCaracAttr,dgtBonusAttr,"for_mod","dex_mod"],function (values){
        const bba = parseInt(values[bbaAttr])||0;
        const atqCarac = values[atqCaracAttr];
        const atqMod = parseInt(values[atqModAttr])||0;
        const atqMod2 = parseInt(values[atqMod2Attr])||0;
        const dgtBase = values[dgtBaseAttr];
        const dgtCarac = values[dgtCaracAttr];
        const dgtBonus = parseInt(values[dgtBonusAttr])||0;
        const formod = parseInt(values.for_mod)||0;
        const dexmod = parseInt(values.dex_mod)||0;
        let caracAtk = 0;
        if("FOR" == atqCarac){
            caracAtk = formod;
        }
        else if("DEX" == atqCarac){
            caracAtk = dexmod
        }
        let caracDgt = 0;
        if("FOR" == dgtCarac){
            caracDgt = formod;
        }
        else if("DEX" == dgtCarac){
            caracDgt = dexmod;
        }
        else if("1,5FOR" == dgtCarac){
            caracDgt = Math.floor(1.5*formod);
        }
        else if("1/2FOR" == dgtCarac){
            caracDgt = Math.floor(formod/2);
        }
        let degatsBonus = caracDgt + dgtBonus;
        let atqBonus = bba + caracAtk + atqMod + atqMod2;
        if(atqBonus > 0){
            atqBonus = "+" + atqBonus;
        }
        else if(atqBonus < 0){
            atqBonus = "-" + atqBonus;
        }
        let degats = dgtBase + " + " +  degatsBonus;
        let update = {};
        update[dgtTotalAttk] = degats;
        update[atqTotalAttk] = atqBonus;
        update[atqCaracValAttr] = caracAtk;
        update[dgtCaracValAttr] = caracDgt;
        setAttrs(update,{silent:true});
    });
}