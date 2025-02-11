const rangs = [1, 2, 3, 4, 5];

on(`change:profil-capacite change:niveau`, async function() {
    const list = [
        `profil-capacite`,
        `niveau`,
    ];
    const attrs = await getAttrsAsync(list);
    const capacite = parseInt(attrs['profil-capacite']);
    const niveau = parseInt(attrs['niveau']);

    let update = {};
    update['ptscapacites_max'] = 2+capacite+(niveau*2);

    setAttrsAsync(update);
});

on(`change:ptscapacites change:ptscapacites_max sheet:opened`, async function() {
    const list = [
        `ptscapacites`,
        `ptscapacites_max`,
    ];
    const attrs = await getAttrsAsync(list);
    const value = parseInt(attrs['ptscapacites']);
    const max = parseInt(attrs['ptscapacites_max']);

    if(value > max) $20('div.voies div.ptsCapacites').addClass('red');
    else  $20('div.voies div.ptsCapacites').removeClass('red');
});

rangs.forEach(r => {
    on(`clicked:repeating_voies:rang${r}`, async function(info) {
        const repeating = info.sourceAttribute.split('_')[2];
        const rang = r;
        const list = [
            `repeating_voies_${repeating}_rang${rang}`,
        ];
        const attrs = await getAttrsAsync(list);
        const vRang = parseInt(attrs[`repeating_voies_${repeating}_rang${rang}`]);
        let update = {};

        if(vRang === 1) update[`repeating_voies_${repeating}_rang${rang}`] = 0;
        else update[`repeating_voies_${repeating}_rang${rang}`] = 1;

        setAttrsAsync(update);
    });

    on(`clicked:repeating_voies:rang${r} change:repeating_voies:type remove:repeating_voies`, async function() {
        getSectionIDs("repeating_voies", async function(idarray) {
            const lRepeat = [];

            for(var i=0; i < idarray.length; i++) {
                lRepeat.push(
                    `repeating_voies_${idarray[i]}_type`,
                    `repeating_voies_${idarray[i]}_rang1`,
                    `repeating_voies_${idarray[i]}_rang2`,
                    `repeating_voies_${idarray[i]}_rang3`,
                    `repeating_voies_${idarray[i]}_rang4`,
                    `repeating_voies_${idarray[i]}_rang5`,
                );
            }

            const lRangs = await getAttrsAsync(lRepeat);
            let type = '';
            let v = 0;
            let update = {};

            _.each(lRangs, (value, key) => {
                const val = value;
                const name = key.split('_')[3];

                switch(name) {
                    case 'type':
                        type = val;
                        break;

                    case 'rang1':
                    case 'rang2':
                        if((type === 'predilection' || type === 'memefamille') && val === 1) v += 1;
                        else if((type === 'horsfamille' || type === 'horsprofil' || type === 'prestige') && val === 1) v += 2;
                        break;

                    case 'rang3':
                    case 'rang4':
                    case 'rang5':
                        if((type === 'predilection' || type === 'memefamille') && val === 1) v += 2;
                        else if((type === 'horsfamille' || type === 'horsprofil' || type === 'prestige') && val === 1) v += 2;
                        break;
                }
            });

            update['ptscapacites'] = v;
            setAttrsAsync(update);
        });
    });
});