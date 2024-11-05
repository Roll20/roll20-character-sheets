
/**
 * Updates a cursed arcana according to a selected blessed arcana
 * 
 * @param {string} attrName The r20 attribute name
 */
var setCursedArcana = attrName => {
    getAttrs([attrName], v => {
        let selected = parseInt(v[attrName])
        if (selected === false || selected === -1) {
            selected = undefined
        }
        
        let data = {}
        data[`${attrName}_opp`] = (selected === undefined) ? -1 : (21 - selected);

        setAttrs(data)
    })
}