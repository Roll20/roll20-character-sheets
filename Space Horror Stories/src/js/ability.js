
/**
 * Computes the max HP according to carrure value
 */
const computeMaxHp = () => {
    getAttrs(['carrure'], v => {
        let hpMax = 17 - (parseInt(v.carrure)||5)
        setAttrs({
            hp_max: hpMax
        })
    })
}

on('change:carrure', ev => {
    computeMaxHp()
})

on('clicked:roll_carrure clicked:roll_motricite clicked:roll_science clicked:roll_relationnel '
    + 'clicked:roll_sangfroid clicked:exp_carrure clicked:exp_motricite clicked:exp_science '
    + 'clicked:exp_relationnel clicked:exp_sangfroid', ev => {
    let nameData = ev.htmlAttributes.name.split('_')
    let attrName = nameData[2];
    let isExpert = nameData[1] == 'exp' ? true : false
    let title = ev.htmlAttributes.value
    attributeRoll(attrName, isExpert, title)
})
