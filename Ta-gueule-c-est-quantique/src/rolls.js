const THE_ROLL = "&{template:tgcq} {{name=_NAME_}} {{carac=_CARAC_}} {{roll=[[_ROLL_]]}} {{chaos=[[0]]}}"

let doRoll = async (caracName, params={}) => {
    params = {
        ...{
            caracValue: 0,
            isBonusChecked: 0,
            aie: 0,
            deboussole: 0
        },
        ...params
    }

    let rollDice = (params.isBonusChecked ? '1d12+1d8' : '2d8') + `+${params.caracValue}`;
    rollDice += `+${params.aie}+${params.deboussole}`

    let rollString = THE_ROLL
        .replace('_NAME_', params.charName)
        .replace('_CARAC_', caracName)
        .replace('_ROLL_', rollDice)

    console.log(rollString)

    let roll = await startRoll(rollString)

    // Computes sources of chaos
    let chaosSources = 0
    roll.results.roll.dice.forEach(die => {
        if (die == 1 || (die == 8 && caracName == 'Pouvoir')) {
            chaosSources++
        }
    })

    finishRoll(roll.rollId, {chaos: chaosSources})

    let toSet = {d12: 0}
    if (caracName == 'Pouvoir') toSet.deboussole = 0
    setAttrs(toSet)
}

on('clicked:muscle clicked:neurone clicked:aplomb clicked:debrouille clicked:pouvoir', ev => {
    let carac = ev.htmlAttributes.value
    let attrName = ev.htmlAttributes.name.substr(4)
    let attributes = ['character_name', attrName, 'd12', 'aie']

    if (carac === 'Pouvoir') {
        attributes.push('deboussole')
    }

    getAttrs(attributes, vals => {
        console.log(vals)
    let caracValue = vals[attrName]

        let params = {
            charName: vals.character_name,
            caracValue: parseInt(caracValue)||0,
            isBonusChecked: parseInt(vals.d12)||0,
            aie: parseInt(vals.aie)||0,
            deboussole: parseInt(vals.deboussole)||0
        }

        doRoll(carac, params)
    })
})