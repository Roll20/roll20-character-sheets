
const updateWoundMod = () => {
    getSectionIDs('repeating_wounds', ids => {
        const rows = ids.map(id => section_name('wounds', id, 'malus'))
        getAttrs(rows, values => {
            let total = 0
            rows.forEach(row => {
                let malus = +Math.abs(values[row] || 0)
                total += malus
            })
console.warn(total)
            setAttrs({
                woundsMalus: total
            })
        })
    })
}

const woundsMalusFields = {
    wounds: ['malus']
}

on(`${section_changes(woundsMalusFields)} remove:repeating_wounds`, ev => {
    updateWoundMod()
})
