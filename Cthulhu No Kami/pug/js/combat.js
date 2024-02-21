const wpn = ['contact', 'distance', 'sortilege', 'grenade', 'artillerie'];
const modki = ['positif', 'negatif', 'positifdgts', 'negatifdgts'];

wpn.forEach(c => {
    on(`clicked:show${c}`, async function() {
        let show = `show${c}`;

        const attrs = await getAttrsAsync([show]);
        const getShow = attrs[show];

        let update = {};
        update[show] = getShow === '1' ? '0' : '1';

        setAttrsAsync(update);
    });

    on(`clicked:repeating_wpn${c}:wpnshow`, async function(info) {
        const repeating = info.sourceAttribute.split('_')[2];
        const list = [
            `repeating_wpn${c}_${repeating}_wpnshow`,
        ];

        const attrs = await getAttrsAsync(list);
        const getShow = attrs[list[0]];

        let update = {};
        update[list[0]] = getShow === '1' ? '0' : '1';

        setAttrsAsync(update);
    });

    on(`clicked:repeating_wpn${c}:wpnroll`, async function(info) {
        const repeating = info.sourceAttribute.split('_')[2];
        const base = `repeating_wpn${c}_${repeating}`;
        const list = [
            `character_name`,
            `${base}_name`,
            `ki`,
            `dice-special`,
            `dice-atk`,
        ];

        let diceSpe = 0;
        let diceAtk = 0;
        let attrs;
        let update = {};

        update['popup-type'] = c;

        switch(c) {
            case 'contact':
                list.push(
                    `contact`,
                    `${base}_dm`,
                    `${base}_modatt`,
                    `${base}_moddgts`,
                    `${base}_modkipositif`,
                    `${base}_modkinegatif`,
                    `${base}_modkipositifdgts`,
                    `${base}_modkinegatifdgts`,
                    `${base}_description`
                );
                attrs = await getAttrsAsync(list);
                diceSpe = attrs['dice-special'];
                diceAtk = attrs['dice-atk'];
                update['popup-id'] = base;
                update['popup-stringify'] = JSON.stringify(attrs);
                update['popup-title'] = attrs[`${base}_name`];
                update['popup-dice-atk'] = Math.min(diceSpe, diceAtk);
                update['popup'] = 2;
                break;
            case 'grenade':
                list.push(
                    `distance`,
                    `${base}_dm`,
                    `${base}_portee`,
                    `${base}_modatt`,
                    `${base}_moddgts`,
                    `${base}_modkipositif`,
                    `${base}_modkinegatif`,
                    `${base}_modkipositifdgts`,
                    `${base}_modkinegatifdgts`,
                    `${base}_description`,
                );
                attrs = await getAttrsAsync(list);
                diceSpe = attrs['dice-special'];
                diceAtk = attrs['dice-atk'];
                update['popup-id'] = base;
                update['popup-stringify'] = JSON.stringify(attrs);
                update['popup-title'] = attrs[`${base}_name`];
                update['popup-dice-atk'] = Math.min(diceSpe, diceAtk);
                update['popup'] = 2;
                break;
            case 'artillerie':
                list.push(
                    `distance`,
                    `${base}_dm`,
                    `${base}_portee`,
                    `${base}_aire-effet`,
                    `${base}_modatt`,
                    `${base}_moddgts`,
                    `${base}_modkipositif`,
                    `${base}_modkinegatif`,
                    `${base}_modkipositifdgts`,
                    `${base}_modkinegatifdgts`,
                    `${base}_description`,
                );
                attrs = await getAttrsAsync(list);
                diceSpe = attrs['dice-special'];
                diceAtk = attrs['dice-atk'];
                update['popup-id'] = base;
                update['popup-stringify'] = JSON.stringify(attrs);
                update['popup-title'] = attrs[`${base}_name`];
                update['popup-dice-atk'] = Math.min(diceSpe, diceAtk);
                update['popup'] = 2;
                break;
            case 'distance':
                list.push(
                    `distance`,
                    `${base}_dm`,
                    `${base}_portee`,
                    `${base}_modatt`,
                    `${base}_moddgts`,
                    `${base}_modkipositif`,
                    `${base}_modkinegatif`,
                    `${base}_modkipositifdgts`,
                    `${base}_modkinegatifdgts`,
                    `${base}_description`,
                    `${base}_incident-tir`,
                );
                attrs = await getAttrsAsync(list);
                diceSpe = attrs['dice-special'];
                diceAtk = attrs['dice-atk'];
                update['popup-id'] = base;
                update['popup-stringify'] = JSON.stringify(attrs);
                update['popup-title'] = attrs[`${base}_name`];
                update['popup-dice-atk'] = Math.min(diceSpe, diceAtk);
                update['popup'] = 3;
                break;
            case 'sortilege':
                list.push(
                    `force-mod`,
                    `dexterite-mod`,
                    `constitution-mod`,
                    `intelligence-mod`,
                    `sagesse-mod`,
                    `charisme-mod`,
                    `${base}_type-magie`,
                    `${base}_forme-magie`,
                    `${base}_rang`,
                    `${base}_caracteristique`,
                    `${base}_description`,
                );
                attrs = await getAttrsAsync(list);
                diceSpe = attrs['dice-special'];
                diceAtk = attrs['dice-atk'];
                update['popup-id'] = base;
                update['popup-stringify'] = JSON.stringify(attrs);
                update['popup-title'] = attrs[`${base}_name`];
                update['popup-dice-atk'] = Math.min(diceSpe, diceAtk);
                update['popup'] = 5;
                break;
        }

        await setAttrsAsync(update);
    });

    switch(c) {
        case 'contact':
        case 'distance':
        case 'grenade':
        case 'artillerie':
            modki.forEach(m => {
                on(`clicked:repeating_wpn${c}:modki${m}`, async function(info) {
                    const repeating = info.sourceAttribute.split('_')[2];
                    const list = [
                        `repeating_wpn${c}_${repeating}_modki${m}`,
                    ];

                    const attrs = await getAttrsAsync(list);
                    const getShow = parseInt(attrs[list[0]]);

                    let update = {};
                    update[list[0]] = getShow === 1 ? 0 : 1;

                    setAttrsAsync(update);
                });
            });
            break;
        case 'sortilege':
            on(`clicked:repeating_wpn${c}:spellroll`, async function(info) {
                const repeating = info.sourceAttribute.split('_')[2];
                const base = `repeating_wpn${c}_${repeating}`;
                const list = [
                    `character_name`,
                    `${base}_name`,
                    `ki`,
                ];

                let attrs;
                let update = {};

                update['popup-type'] = `${c}-atk`;

                list.push(
                    `magique`,
                    `${base}_type-magie`,
                    `${base}_forme-magie`,
                    `${base}_rang`,
                    `${base}_difficulte`,
                    `${base}_description`,
                );
                attrs = await getAttrsAsync(list);
                update['popup-id'] = base;
                update['popup-stringify'] = JSON.stringify(attrs);
                update['popup-title'] = attrs[`${base}_name`];
                update['popup'] = 2;

                await setAttrsAsync(update);
            });
            break;
    }
});

on(`clicked:deux-armes`, async function() {
    let list = [
        'deux-armes'
    ];

    const attrs = await getAttrsAsync(list);
    const deuxarmes = parseInt(attrs['deux-armes']);
    const newR = deuxarmes === 1 ? 0 : 1;


    let update = {};
    update['deux-armes'] = newR;
    update['dice-atk'] = 0-newR;

    setAttrsAsync(update);
});