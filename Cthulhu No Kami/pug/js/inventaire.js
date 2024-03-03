on(`clicked:repeating_armures:equip`, async function(info) {
    const repeating = info.sourceAttribute.split('_')[2];
    const list = [
        `repeating_armures_${repeating}_equip`,
    ];
    const attrs = await getAttrsAsync(list);
    const vEquip = parseInt(attrs[`repeating_armures_${repeating}_equip`]);
    let update = {};

    if(vEquip === 1) update[`repeating_armures_${repeating}_equip`] = 0;
    else update[`repeating_armures_${repeating}_equip`] = 1;

    setAttrsAsync(update);
});

on(`clicked:repeating_armures:equip change:repeating_armures:defense change:repeating_armures:reduction remove:repeating_armures`, async function() {
    getSectionIDs("repeating_armures", async function(idarray) {
        const lRepeat = [];

        for(var i=0; i < idarray.length; i++) {
            lRepeat.push(
                `repeating_armures_${idarray[i]}_equip`,
                `repeating_armures_${idarray[i]}_defense`,
                `repeating_armures_${idarray[i]}_reduction`,
            );
        }

        const lArmure = await getAttrsAsync(lRepeat);
        let e = 0;
        let d = 0;
        let r = 0;
        let update = {};

        _.each(lArmure, (value, key) => {
            const val = parseInt(value);
            const name = key.split('_')[3];

            switch(name) {
                case 'equip':
                    if(val === 1) e = 1;
                    else e = 0;
                    break;

                case 'defense':
                    if(e === 1) d += val;
                    break;

                case 'reduction':
                    if(e === 1) r += val;
                    break;
            }
        });

        update['defense-armure'] = d;
        update['reduction-armure'] = r;
        update['initiative-armure'] = d === 0 ? d : `-${d}`;
        setAttrsAsync(update);
    });
});