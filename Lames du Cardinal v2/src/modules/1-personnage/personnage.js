
on('change:arcane1 change:arcane2', ev => {
    let attrName = ev['sourceAttribute']
    setCursedArcana(attrName)
})