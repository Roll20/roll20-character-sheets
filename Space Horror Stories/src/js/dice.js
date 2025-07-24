
const baseRoll = "&{template:_TPL_} {{roll=[[3d_D_>_DIFF_]]}} {{mod=[[_MOD_dF]]}} {{label=_LABEL_}} {{totalSuccesses=[[0]]}} {{trueMod=[[0]]}} {{sides=[[0]]}} {{option=[[0]]}}"

const askForMod = "!{{template:default}}"
    + "{{option=![[?{Option ?|Jet normal, 0|Surpassement, 1|Sacrifice, 2}]]}}"
    + "{{ask=![[?{Bonus / Malus ?|0}]]}}"

const diceLetters = '0abcdefghij'
const fateLetters = '−0+'
const dicify = dice => dice.map(x => diceLetters[x])
const fatify = dice => dice.map(x => fateLetters[1+x])

const OPT_NORMAL = 0
const OPT_SURPASS = 1
const OPT_SACRIFICE = 2

/**
 * Performs a SHS standard attribute roll
 *
 * @param {string} attrName The roll20 attribute identifier to roll against
 * @param {boolean} isExpert Wether to roll 8 or 10 sided dice
 * @param {string} title What to display in the headerbar
 * @param {int} specificMod Some rolls require specific modifiers (fight, etc)
 * @param {string} template custom template name; default is «simple»
 * @param {string} sublabel Optional label to be displayed on specific templates
 */
var attributeRoll = async (attrName, isExpert=false, title='', specificMod=0, template='simple', sublabel='', conditions={}) => {
    let preroll = await startRoll(askForMod)

    getAttrs([attrName, 'woundsMalus', 'character_name'], async v => {
        let attrVal = parseInt(v[attrName])||8
        let woundsMod = Math.abs(parseInt(v.woundsMalus)||0)
        let totalMod = specificMod + preroll.results.ask.result - woundsMod
        let option = parseInt(preroll.results.option.result)||0
        if (option >= OPT_SURPASS) totalMod += 2
        let modIsMalus = (totalMod < 0)
        let sides = isExpert ? 10 : 8

        let rollString = baseRoll.replace('_TPL_', template)
            .replace('_D_', sides)
            .replace('_DIFF_', attrVal)
            .replace('_MOD_', Math.min(Math.abs(totalMod), 5))
            .replace('_LABEL_', title)

        if (template == 'attack') {
            rollString = rollString
                + attackVars
                + '{{charname=_CHARNAME_}}'
                    .replace('_CHARNAME_', v.character_name)
        }

        let roll = await startRoll(rollString)

        // Compute mod dice result
        let modSuccesses = 0;
        roll.results.mod.dice.forEach(die => {
            if (modIsMalus && die < 0) {
                modSuccesses--;
            } else if (!modIsMalus && die > 0) {
                modSuccesses++
            }
        })

        let successes = roll.results.roll.result + modSuccesses + (option == OPT_SACRIFICE ? 2 : 0)
        allDice = dicify(roll.results.roll.dice)

        let results = {
            totalSuccesses: successes,
            trueMod: modSuccesses,
            roll: dicify(roll.results.roll.dice).join(' '),
            mod: fatify(roll.results.mod.dice).join(' '),
            sides: sides,
            label: sublabel
        }

        finishRoll(roll.rollId, {...results, ...conditions})
    })
}
