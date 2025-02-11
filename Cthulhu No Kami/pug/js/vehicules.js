const carVehicule = ['force', 'agilite', 'defense'];

on(`clicked:repeating_vehicules:vehicule-edit`, async function(info) {
    const repeating = info.sourceAttribute.split('_')[2];
    const list = [
        `repeating_vehicules_${repeating}_edit`,
    ];
    const attrs = await getAttrsAsync(list);
    const edit = parseInt(attrs[`repeating_vehicules_${repeating}_edit`]);

    let update = {};
    update[`repeating_vehicules_${repeating}_edit`] = edit === 1 ? 0 : 1;

    setAttrsAsync(update);
});

on(`clicked:repeating_vehicules:vehicule-roll`, async function(info) {
    const repeating = info.sourceAttribute.split('_')[2];
    const base = `repeating_vehicules_${repeating}`;
    const list = [
        `character_name`,
        `${base}_agilite-vehicule`,
        `dexterite-mod`,
        `${base}_vehicule-name`
    ];
    let attrs = await getAttrsAsync(list);
    let update = {};

    update['popup-type'] = 'vehicule';
    update['popup-id'] = base;
    update['popup-stringify'] = JSON.stringify(attrs);
    update['popup-title'] =  attrs[`${base}_vehicule-name`] !== '' ? attrs[`${base}_vehicule-name`] : '';
    update['popup'] = 4;

    await setAttrsAsync(update);
});

carVehicule.forEach(c => {
    let onChange = `change:repeating_vehicules:${c}-vehicule-base change:repeating_vehicules:${c}-vehicule-temp change:repeating_vehicules:${c}-vehicule-divers`;

    if(c === 'defense') onChange += ` change:repeating_vehicules:${c}-vehicule-dexterite`

    on(onChange, async function(info) {
        const repeating = info.sourceAttribute.split('_')[2];
        const list = [
            `repeating_vehicules_${repeating}_${c}-vehicule-base`,
            `repeating_vehicules_${repeating}_${c}-vehicule-temp`,
            `repeating_vehicules_${repeating}_${c}-vehicule-divers`,
        ];

        if(c === 'defense') list.push(`repeating_vehicules_${repeating}_${c}-vehicule-dexterite`);

        const attrs = await getAttrsAsync(list);
        const base = parseInt(attrs[`repeating_vehicules_${repeating}_${c}-vehicule-base`]);
        const temp = parseInt(attrs[`repeating_vehicules_${repeating}_${c}-vehicule-temp`]);
        const divers = parseInt(attrs[`repeating_vehicules_${repeating}_${c}-vehicule-divers`]);
        let total = base+temp+divers;

        if(c === 'defense') {
            const dex = parseInt(attrs[`repeating_vehicules_${repeating}_${c}-vehicule-dexterite`]);

            total += dex;
        }

        let update = {};
        update[`repeating_vehicules_${repeating}_${c}-vehicule`] = total;

        if(c === 'force') update[`repeating_vehicules_${repeating}_places-vehicule`] = Math.max(total+4, 1);

        setAttrsAsync(update);
    });
});

on(`change:repeating_vehicules:pv-vehicule change:repeating_vehicules:pv-vehicule_max`, async function(info) {
    const repeating = info.sourceAttribute.split('_')[2];
    const list = [
        `repeating_vehicules_${repeating}_pv-vehicule`,
        `repeating_vehicules_${repeating}_pv-vehicule_max`,
    ];

    const attrs = await getAttrsAsync(list);
    const base = parseInt(attrs[`repeating_vehicules_${repeating}_pv-vehicule`]);
    const max = parseInt(attrs[`repeating_vehicules_${repeating}_pv-vehicule_max`]);
    let update = {};

    if(base > max) {
        update[`repeating_vehicules_${repeating}_pv-vehicule`] = max;
        setAttrsAsync(update);
    }
});

on(`change:repeating_vehicules:pv-vehicule-mod change:repeating_vehicules:pv-vehicule-temp change:repeating_vehicules:pv-vehicule-base`, async function(info) {
    const repeating = info.sourceAttribute.split('_')[2];
    const list = [
        `repeating_vehicules_${repeating}_pv-vehicule-mod`,
        `repeating_vehicules_${repeating}_pv-vehicule-temp`,
        `repeating_vehicules_${repeating}_pv-vehicule-base`,
    ];

    const attrs = await getAttrsAsync(list);
    const base = parseInt(attrs[`repeating_vehicules_${repeating}_pv-vehicule-base`]);
    const mod = parseInt(attrs[`repeating_vehicules_${repeating}_pv-vehicule-mod`]);
    const temp = parseInt(attrs[`repeating_vehicules_${repeating}_pv-vehicule-temp`]);

    let update = {};
    update[`repeating_vehicules_${repeating}_pv-vehicule_max`] = base+mod+temp;

    setAttrsAsync(update);
});