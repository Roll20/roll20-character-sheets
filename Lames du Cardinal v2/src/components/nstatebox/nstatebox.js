
/**
 * This functon make cycle a n-state widget over its possible values
 * 
 * @param {string} attrName The identifier of the attribute you want to cycle on
 * @param {int} maxVal The max value the attribute could take
 */
var cycleBoxState = (attrName, maxVal) => {
    getAttrs([attrName], v => {
        const curValue = parseInt(v[attrName]) || 0;
        let data = {}
        data[attrName] = (curValue + 1) % maxVal
        setAttrs(data)
    })
}