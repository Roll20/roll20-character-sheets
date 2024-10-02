const menu = ['traits-mental', 'combat', 'inventaire', 'vehicules', 'voies', 'profil'];
const combat = ['initiative', 'contact', 'distance', 'magique', 'defense', 'reduction'];
const combatData = {
    'initiative':['armure', 'etat'],
    'contact':['profil', 'niveau', 'etat'],
    'distance':['profil', 'niveau', 'etat'],
    'defense':['armure', 'action', 'etat'],
    'magique':['niveau', 'etat']
};
const combatWithCarac = ['initiative', 'contact', 'distance', 'defense', 'magique'];
const car = ['force', 'dexterite', 'constitution', 'perception', 'intelligence', 'charisme'];
const derived = ['pv', 'maho', 'serenite', 'volonte', 'chance'];
const std = ['mod', 'temp', 'etat'];

//MODE EDITION
on(`clicked:edition`, async function() {
    const attrs = await getAttrsAsync(['edition']);
    const getEdit = attrs.edition;

    let update = {};
    update['edition'] = getEdit === '1' ? '0' : '1';

    setAttrsAsync(update);
});

//OPTIONS
on(`clicked:options`, async function() {
    const attrs = await getAttrsAsync(['options']);
    const getEdit = attrs.options;

    let update = {};
    update['options'] = getEdit === '1' ? '0' : '1';

    setAttrsAsync(update);
});

car.forEach(c => {
    let changes = `change:${c}-base change:${c}-temp change:${c}-divers`;

    for(let w of combatWithCarac) {
        changes += ` change:${w}-carac`;
    }

    on(changes, async function() {
        const list = [
            `${c}-base`,
            `${c}-temp`,
            `${c}-divers`,
            `initiative-carac`,
            `contact-carac`,
            `distance-carac`,
            `defense-carac`,
            `magique-carac`,
        ];

        if(c === 'intelligence') {
            list.push(
                `perception-mod`,
                `profil-serenite`,
                `mythos`
            );
        } else if(c === 'constitution') {
            list.push(
                'niveau',
                'ki',
            )
        } else if(c === 'perception') {
            list.push(
                `intelligence-mod`,
                `profil-serenite`,
                `mythos`
            );
        } else if(c === 'charisme') {
            list.push(
                `profil-chance`
            );
        }

        const attrs = await getAttrsAsync(list);
        const caracList = ['initiative', 'contact', 'distance', 'magique', 'defense'];
        const base = parseInt(attrs[`${c}-base`]);
        const temp = parseInt(attrs[`${c}-temp`]);
        const mod = parseInt(attrs[`${c}-divers`]);
        const total = base+temp+mod;
        const cMod = Math.floor((total-10)/2);

        let update = {};

        update[`${c}-total`] = total;
        update[`${c}-mod`] = cMod

        if(c === 'dexterite') {
            getSectionIDs("repeating_vehicules", async function(idarray) {
                let vehicule = {}

                for(var i=0; i < idarray.length; i++) {
                    vehicule[`repeating_vehicules_${idarray[i]}_defense-vehicule-dexterite`] = cMod;
                }

                setAttrsAsync(vehicule);
            });

        } else if(c === 'intelligence') {
            const mod_perception = parseInt(attrs[`perception-mod`]);
            const serenite = parseInt(attrs[`profil-serenite`]);
            const mythos = parseInt(attrs['mythos']);

            update['volonte-base'] = Math.floor((cMod+mod_perception)/2);
            update['serenite-base'] = cMod+mod_perception+serenite+2-mythos;
        } else if(c === 'constitution') {
            const niveau = parseInt(attrs[`niveau`]);
            const ki = parseInt(attrs[`ki`]);

            if(niveau === 1) {
                update['pv-con'] = Math.floor(((base+mod)-10)/2);
            }

            update['maho-base'] = cMod+niveau+ki;

        } else if(c === 'perception') {
            const mod_intelligence = parseInt(attrs[`intelligence-mod`]);
            const serenite = parseInt(attrs[`profil-serenite`]);
            const mythos = parseInt(attrs[`mythos`]);

            update['volonte-base'] = Math.floor((cMod+mod_intelligence)/2);
            update['serenite-base'] = cMod+mod_intelligence+serenite+2-mythos;
        } else if(c === 'charisme') {
            const chance = parseInt(attrs[`profil-chance`]);

            update['chance-base'] = cMod+chance+2;
        }

        for(let l of caracList) {
            const car = attrs[`${l}-carac`];

            if(car === c) update[`${l}-carac-value`] = cMod;

            console.warn(car, l, c, update);
        }

        setAttrsAsync(update);
    });

    on(`clicked:roll${c}`, async function() {
        const list = [
            `dice-special`,
            `character_name`,
            `${c}-mod`,
            `roll-type`,
        ];

        const attrs = await getAttrsAsync(list);
        let update = {};
        update['popup-type'] = 'caracteristique';
        update['popup-stringify'] = JSON.stringify(attrs);
        update['popup-title'] =  getTranslationByKey(c).charAt(0).toUpperCase() + getTranslationByKey(c).slice(1);
        update['popup-id'] =  c;
        update['popup-dice'] = attrs[`dice-special`];
        update['popup'] = 4;
        await setAttrsAsync(update);

        /*const rollType = attrs[`rollType`];
        const name = attrs[`character_name`];
        const mod = parseInt(attrs[`${c}-mod`]);
        const dice = getDice(attrs[`dice-special`]);
        let roll = `${rollType} &{template:std} {{name=${name}}} {{title=^{${c}}}} {{result=[[1${dice}cf4cs7cs20+${mod}]]}} {{echec=[[0]]}} {{critique=[[0]]}} {{destin=[[0]]}}`;
        let stRoll = await startRoll(roll);
        const diceResult = stRoll.results.result.dice[0];
        let computed = {};

        switch(diceResult) {
            case 4:
                computed.echec = 1;
            break;
            case 7:
                computed.destin = 1;
            break;
            case 20:
                computed.critique = 1;
            break;
        }
        finishRoll(stRoll.rollId, computed);*/
    });
});

//ATTRIBUTS DERIVES
derived.forEach(d => {
    let change = `change:${d}-mod change:${d}-temp change:${d}-base`;

    on(change, async function() {
        const list = [
            `${d}-base`,
            `${d}-temp`,
            `${d}-mod`,
        ];

        if(d === 'pv') {
            list.push(`${d}-dv`);
            list.push(`${d}-con`);
        }

        const attrs = await getAttrsAsync(list);
        const base = parseInt(attrs[`${d}-base`]);
        const temp = parseInt(attrs[`${d}-temp`]);
        const mod = parseInt(attrs[`${d}-mod`]);
        let update = {};
        let total = base+temp+mod;

        if(d === 'volonte') update[`${d}`] = Math.max(total, 0);
        else update[`${d}_max`] = Math.max(total, 0);

        setAttrsAsync(update);
    });

    if(d === 'maho') {
        on(`change:niveau change:ki`, async function() {
            const list = [
                `ki`,
                `niveau`,
                `constitution-mod`
            ];

            const attrs = await getAttrsAsync(list);
            const ki = parseInt(attrs[`ki`]);
            const niveau = parseInt(attrs[`niveau`]);
            const con = parseInt(attrs[`constitution-mod`]);

            let total = ki+niveau+con;
            let update = {};

            update[`${d}-base`] = total;

            setAttrsAsync(update);
        });
    }

    if(d === 'pv') {
        on(`change:${d}-dv change:${d}-con`, async function() {
            const list = [
                `${d}-dv`,
                `${d}-con`,
            ];

            const attrs = await getAttrsAsync(list);
            const dv = parseInt(attrs[`${d}-dv`]);
            const con = parseInt(attrs[`${d}-con`]);

            let total = dv+con;
            let update = {};

            update[`${d}-base`] = total;

            setAttrsAsync(update);
        });
    }

    if(d !== 'volonte') {
        on(`change:${d} change:${d}_max`, async function() {
            const list = [
                `${d}`,
                `${d}_max`,
            ];

            const attrs = await getAttrsAsync(list);
            const base = parseInt(attrs[`${d}`]);
            const max = parseInt(attrs[`${d}_max`]);
            let update = {};

            if(base > max) {
                update[d] = max;
                setAttrsAsync(update);
            }
        });
    }
});

//MENU
menu.forEach(m => {
    on(`clicked:${m}`, function() {
        let update = {};
        update['menu'] = m;

        setAttrsAsync(update);
    });
});

//mythos
on(`change:mythos`, async function() {
    const list = [
        `perception-mod`,
        `intelligence-mod`,
        `profil-serenite`,
        `mythos`
    ];

    const attrs = await getAttrsAsync(list);
    const mod_perception = parseInt(attrs[`perception-mod`]);
    const mod_intelligence = parseInt(attrs[`intelligence-mod`]);
    const serenite = parseInt(attrs[`profil-serenite`]);
    const mythos = parseInt(attrs[`mythos`]);
    let update = {}
    update['serenite-base'] = mod_perception+mod_intelligence+serenite+2-mythos;

    setAttrsAsync(update);
});

//resistance-mentale
on(`clicked:resistance-mentale`, async function() {
    const list = [
        `character_name`,
        `volonte`,
    ];

    let attrs = await getAttrsAsync(list);
    let update = {};

    let title = getTranslationByKey('resistance-mentale');
    title = title[0].toUpperCase() + title.slice(1);

    update['popup-type'] = 'resistancementale';
    update['popup-id'] = '';
    update['popup-stringify'] = JSON.stringify(attrs);
    update['popup-title'] =  title;
    update['popup'] = 4;

    await setAttrsAsync(update);
});

//STATS DE COMBATS - MODE EDITION
combat.forEach(c => {

    if(combatWithCarac.includes(c)) {
        let changes = `change:${c}-temp change:${c}-mod change:${c}-carac-value`;
        let list = [`${c}-temp`, `${c}-mod`, `${c}-carac-value`];

        for(let t of combatData[c]) {
            changes += ` change:${c}-${t}`;
            list.push(`${c}-${t}`);
        }

        on(changes, async function() {
            const attrs = await getAttrsAsync(list);
            const temp = parseInt(attrs[`${c}-temp`]);
            const mod = parseInt(attrs[`${c}-mod`]);
            const carac = parseInt(attrs[`${c}-carac-value`]) || 0;
            let update = {};
            let total = 0;
            let second = 0;
            total += temp;
            total += mod;
            total += carac;

            if(c === 'defense') total += 10;

            for(let t of combatData[c]) {
                const v = parseInt(attrs[`${c}-${t}`]);

                if(c === 'defense' && t === 'action') second += v;
                else total += v;
            }

            if(second !== 0) second += total;

            update[c] = second !== 0 ? `${total} / ${second}` : total;

            setAttrsAsync(update);
        });
    }


    on(`clicked:${c}-edit`, async function() {
        const list = [
            `${c}-edit`,
        ];

        const attrs = await getAttrsAsync(list);
        const value = parseInt(attrs[`${c}-edit`]);

        let update = {};
        update[`${c}-edit`] = value === 1 ? 0 : 1;

        setAttrsAsync(update);
    });

    if(c !== 'defense' && c !== 'reduction') {
        on(`clicked:${c}`, async function() {
            const list = [
                `character_name`,
                `${c}`,
                `dice-special`,
                `roll-type`,
            ];

            const attrs = await getAttrsAsync(list);
            let update = {};
            update['popup-type'] = 'combat';
            update['popup-id'] = c;
            update['popup-stringify'] = JSON.stringify(attrs);
            update['popup-title'] =  getTranslationByKey(c).charAt(0).toUpperCase() + getTranslationByKey(c).slice(1);;
            update['popup'] = 4;
            setAttrsAsync(update);
        });
    }

    if(!combatWithCarac.includes(c)) {

        std.forEach(s => {
            let change = `change:${c}-${s}`;

            if(c === 'reduction') change += ` change:reduction-armure`;

            on(change, async function() {
                const list = [
                    `${c}-temp`,
                    `${c}-mod`,
                    `${c}-etat`,
                ];

                if(c === 'reduction') {
                    list.push(
                        `reduction-armure`,
                    );
                }

                const attrs = await getAttrsAsync(list);
                const temp = parseInt(attrs[`${c}-temp`]);
                const mod = parseInt(attrs[`${c}-mod`]);
                const etat = c !== 'reduction' ? parseInt(attrs[`${c}-etat`]) : 0;

                let reductionArmure = 0;
                let total = temp+mod+etat;
                let update = {};

                if(c === 'reduction') {
                    reductionArmure = parseInt(attrs[`reduction-armure`]);

                    total += reductionArmure;
                }

                update[`${c}`] = total;

                setAttrsAsync(update);
            });
        });
    }
});

on(`change:action-defensive`, async function() {
    const list = [
        'action-defensive'
    ];

    const attrs = await getAttrsAsync(list);
    const ad = attrs[`action-defensive`];
    let update = {}

    switch(ad) {
        case 'simple':
            update['defense-action'] = 2;
            break;

        case 'totale':
            update['defense-action'] = 4;
            break;

        default:
            update['defense-action'] = 0;
            break;
    }

    setAttrsAsync(update);
});

etats.forEach(e => {
    on(`clicked:${e}`, async function() {
        const list = etats;

        const attrs = await getAttrsAsync(list);
        const clicked = attrs[e] === 1 ? 0 : 1;
        const allMod = getFinalMod(attrs, e, clicked);

        let update = {};
        update[e] = clicked;
        update['dice-special'] = allMod.dice;
        update['initiative-etat'] = allMod.init;
        update['defense-etat'] = allMod.def;
        update['contact-etat'] = allMod.con;
        update['distance-etat'] = allMod.dis;
        update['magique-etat'] = allMod.mag;

        setAttrsAsync(update);
    });
});

//NIVEAUX
const populateSelectNiveau = async () => {
    const list = [
        `contact-niveau`,
        `distance-niveau`,
        `magique-niveau`,
    ];
    const options = [{
        label:'choisir',
        value:'choisir',
        i18n:'choisir',
        selected:true
    }];

    const attrs = await getAttrsAsync(list);
    const contact = parseInt(attrs['contact-niveau']);
    const distance = parseInt(attrs['distance-niveau']);
    const magique = parseInt(attrs['magique-niveau']);

    if(contact < 6) options.push({
        label:'contact',
        value:'contact',
        i18n:'attaque-contact'
    });

    if(distance < 6) options.push({
        label:'distance',
        value:'distance',
        i18n:'attaque-distance'
    });

    if(magique < 6) options.push({
        label:'magique',
        value:'magique',
        i18n:'attaque-magique'
    });

    populateListOptions({
        elemSelector: '.popupniveau-select',
        optionsArray: options,
    });
};

on(`clicked:uplvl`, async function() {
    const list = [
        `niveau`,
    ];
    const attrs = await getAttrsAsync(list);
    const niveau = parseInt(attrs['niveau']);
    let nivSup = niveau+1;
    let update = {};

    update['popup'] = 1;
    setAttrsAsync(update);

    if(nivSup%2 === 0) {
        populateSelectNiveau();
        $20('.popup .lvlup label').removeClass('hidden');
    } else {
        $20('.popup .lvlup label').addClass('hidden');
    }
});

on(`clicked:popup-annuler`, async function() {
    let update = {};
    update['popup'] = 0;

    setAttrsAsync(update);
});

on(`clicked:popupniveau-confirmer`, async function() {
    const list = [
        `character_name`,
        `niveau`,
        `popupniveau`,
        `contact-niveau`,
        `distance-niveau`,
        `magique-niveau`,
        `historique`,
        `pv-base`,
        `pv-mod`,
        `pv-temp`,
        `pv-dv`,
        `pv-con`,
        `profil-dv`,
        `ptscapacites_max`,
        `constitution-mod`,
        `roll-type`,
    ];
    const attrs = await getAttrsAsync(list);
    const rollType = attrs['roll-type'];
    const name = attrs['character_name'];
    const niveau = parseInt(attrs['niveau']);
    const dv = attrs['profil-dv'];
    const pvDv = parseInt(attrs['pv-dv']);
    const pvCon = parseInt(attrs['pv-con']);
    const pvMod = parseInt(attrs['pv-mod']);
    const pvTemp = parseInt(attrs['pv-temp']);
    const pvMax = pvDv+pvCon+pvMod+pvTemp;
    const historique = attrs['historique'];
    const attaque = attrs['popupniveau'];
    const contact = parseInt(attrs['contact-niveau']);
    const distance = parseInt(attrs['distance-niveau']);
    const magique = parseInt(attrs['magique-niveau']);
    const ptsCapacites = parseInt(attrs['ptscapacites_max']);
    const constitution = parseInt(attrs['constitution-mod']);
    let toAdd = ``;
    let nivSup = niveau+1;
    let nivContact = contact;
    let nivDistance = distance;
    let nivMagique = magique;
    let nivDv = pvDv;
    let nivCon = pvCon;
    let rollPv;
    let update = {};
    let roll = `${rollType} &{template:niveau} {{name=${name}}} {{title=^{passage-niveau}}} {{oldniveau=[[${niveau}]]}} {{newniveau=[[${nivSup}]]}} {{oldpv=[[${pvMax}]]}} {{oldcapacite=[[${ptsCapacites}]]}} {{newcapacite=[[${ptsCapacites+2}]]}}`;
    update['popup'] = 0;
    update['niveau'] = nivSup;

    if(nivSup > 10) {
        if(dv === 6 || dv === 8) {
            update['pv-dv'] = nivDv += 1;
            roll += ` {{newpv=[[${pvMax}+1]]}}`;

            rollPv = await startRoll(roll);
        }
        else if(dv === 10) {
            update['pv-dv'] = nivDv += 2;
            roll += ` {{newpv=[[${pvMax}+2]]}}`;

            rollPv = await startRoll(roll);
        }
    } else {
        if(nivSup%2 === 0) {
            switch(attaque) {
                case 'contact':
                    nivContact += 1;
                    roll += ` {{oldcontact=[[${contact}]]}} {{newcontact=[[${nivContact}]]}}`;
                    break;

                case 'distance':
                    nivDistance += 1;
                    roll += ` {{olddistance=[[${distance}]]}} {{newdistance=[[${nivDistance}]]}}`;
                    break;

                case 'magique':
                    nivMagique += 1;
                    roll += ` {{oldmagique=[[${magique}]]}} {{newmagique=[[${nivMagique}]]}}`;
                    break;
            }

            if(constitution < 0) {
                roll += ` {{newpv=[[${pvMax}+[[{1d${dv}${constitution}, 1d0}kh1]]]]}}`;
            } else {
                roll += ` {{newpv=[[${pvMax}+1d${dv}]]}}`;
            }

            rollPv = await startRoll(roll);
            nivDv += rollPv.results.newpv.result-pvMax;
            update['pv-dv'] = nivDv;
        } else if(constitution >= 0) {
            roll += ` {{newpv=[[${pvMax}+${constitution}]]}}`;

            rollPv = await startRoll(roll);
            nivCon += constitution;
            update['pv-con'] = nivCon;
        } else {
            roll += ` {{newpv=[[${pvMax}]]}}`;

            rollPv = await startRoll(roll);
        }
    }

    finishRoll(rollPv.rollId);

    update['contact-niveau'] = nivContact;
    update['distance-niveau'] = nivDistance;
    update['magique-niveau'] = nivMagique;

    toAdd = `{"contact":"${contact}","distance":"${distance}","magique":"${magique}","dv":"${pvDv}","con":"${pvCon}"}`;

    update['historique'] = historique.length === 0 ? toAdd : historique+`;${toAdd}`;

    setAttrsAsync(update);
});

on(`clicked:popupniveaudown-confirmer`, async function() {
    const list = [
        `character_name`,
        `niveau`,
        `historique`,
        `contact-niveau`,
        `distance-niveau`,
        `magique-niveau`,
        `pv-base`,
        `pv-mod`,
        `pv-temp`,
        `pv-dv`,
        `pv-con`,
        `profil-dv`,
        `ptscapacites_max`,
        `roll-type`,
    ];

    const attrs = await getAttrsAsync(list);
    const rollType = attrs['roll-type'];
    const historique = attrs['historique'];
    const lvl = parseInt(attrs.niveau);
    let newLvl = lvl-1;
    let historiqueSplit = historique.split(';');
    let historiqueActuel = JSON.parse(`${historiqueSplit[newLvl-1]}`);
    const name = attrs['character_name'];
    const pvDv = parseInt(attrs['pv-dv']);
    const pvCon = parseInt(attrs['pv-con']);
    const pvMod = parseInt(attrs['pv-mod']);
    const pvTemp = parseInt(attrs['pv-temp']);
    const pvMax = pvDv+pvCon+pvMod+pvTemp;
    const oldContact = parseInt(attrs['contact-niveau']);
    const oldDistance = parseInt(attrs['distance-niveau']);
    const oldMagique = parseInt(attrs['magique-niveau']);
    const ptsCapacites = parseInt(attrs['ptscapacites_max']);
    let contact = parseInt(historiqueActuel.contact);
    let distance = parseInt(historiqueActuel.distance);
    let magique = parseInt(historiqueActuel.magique);
    let pv = pvMod+pvTemp;
    let dv = parseInt(historiqueActuel.dv);
    let con = parseInt(historiqueActuel.con);
    let update = {};
    update['popup'] = 0;

    if(newLvl >= 10) {
        pv = dv+pvCon;
    } else {
        if(newLvl%2 === 0) pv += con+pvDv
        else pv += dv+pvCon;
    }

    let roll = `${rollType} &{template:niveau} {{name=${name}}} {{title=^{diminution-niveau}}} {{oldniveau=[[${lvl}]]}} {{newniveau=[[${newLvl}]]}} {{oldpv=[[${pvMax}]]}} {{newpv=[[${pv}]]}} {{oldcapacite=[[${ptsCapacites}]]}} {{newcapacite=[[${ptsCapacites-2}]]}}`;
    if(contact != oldContact) roll += ` {{oldcontact=[[${oldContact}]]}} {{newcontact=[[${contact}]]}}`;
    if(distance != oldDistance) roll += ` {{olddistance=[[${oldDistance}]]}} {{newdistance=[[${distance}]]}}`;
    if(magique != oldMagique) roll += ` {{olddistance=[[${oldMagique}]]}} {{newdistance=[[${magique}]]}}`;

    update['niveau'] = newLvl;
    update['contact-niveau'] = contact;
    update['distance-niveau'] = distance;
    update['magique-niveau'] = magique;
    update['pv-con'] = con;
    update['pv-dv'] = dv;
    historiqueSplit.pop();
    let newHistorique = historiqueSplit.join(';');

    update['historique'] = newHistorique === "" ? "" : newHistorique;

    let getRoll = await startRoll(roll);
    finishRoll(getRoll.rollId);

    setAttrsAsync(update);
});

on(`clicked:downlvl`, async function() {
    let update = {};

    update['popup'] = 6;
    setAttrsAsync(update);
});

on(`sheet:opened`, async function() {
    const list = [
        `niveau`,
    ];
    const attrs = await getAttrsAsync(list);
    const niveau = parseInt(attrs['niveau']);
    const nivSup = niveau+1;

    if(nivSup%2 === 0) {
        populateSelectNiveau();
        $20('.popup .lvlup label').removeClass('hidden');
    } else {
        $20('.popup .lvlup label').addClass('hidden');
    }
});