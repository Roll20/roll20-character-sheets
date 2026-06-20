
/**
 * Updates the half value of a skill for display
 * 
 * @param {string} attrName The r20 attribute name of the skill
 */
var updateHalfSkill = (attrName) => {
    getAttrs([attrName], v => {
        let skillVal = parseInt(v[attrName])||0
        let data = {}
        data[`${attrName}_half`] = Math.floor(skillVal / 2)
        setAttrs(data)
    })
}