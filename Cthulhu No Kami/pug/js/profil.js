const dFamille = {
    'action':{
        'dv':10,
        'attaque':2,
        'capacite':0,
        'serenite':0,
        'chance':0
    },
    'reflexion':{
        'dv':6,
        'attaque':0,
        'capacite':2,
        'serenite':2,
        'chance':0
    },
    'societe':{
        'dv':8,
        'attaque':1,
        'capacite':0,
        'serenite':0,
        'chance':2
    }
};

on(`change:profil-famille`, async function() {
    const list = [
        `profil-famille`,
    ];

    const attrs = await getAttrsAsync(list);
    const famille = attrs['profil-famille'];

    if(famille === '') return;

    const dataFamille = dFamille[famille];

    let update = {};
    update['profil-dv'] = dataFamille['dv'];
    update['profil-attaque'] = dataFamille['attaque'];
    update['profil-attaque-contact'] = 0;
    update['profil-attaque-distance'] = 0;
    update['profil-capacite'] = dataFamille['capacite'];
    update['profil-serenite'] = dataFamille['serenite'];
    update['profil-chance'] = dataFamille['chance'];

    setAttrsAsync(update);
});

on(`change:profil-attaque-contact`, async function() {
    const list = [
        `profil-attaque`,
        `profil-attaque-contact`,
        `profil-attaque-distance`,
    ];
    const attrs = await getAttrsAsync(list);
    const attaque = parseInt(attrs['profil-attaque']);
    const attaqueScore = parseInt(attrs['profil-attaque-contact']);
    const attaqueDistance = parseInt(attrs['profil-attaque-distance']);
    const diff = attaque-attaqueScore;

    let update = {};

    if(attaqueScore > attaque) {
        update['profil-attaque-contact'] = attaque;
        update['profil-attaque-distance'] = 0;
    } else if(attaqueDistance > diff) {
        update['profil-attaque-distance'] = diff;
    }

    update['distance-profil'] = attaqueScore;

    setAttrsAsync(update);
});

on(`change:profil-attaque-distance`, async function() {
    const list = [
        `profil-attaque`,
        `profil-attaque-contact`,
        `profil-attaque-distance`,
    ];
    const attrs = await getAttrsAsync(list);
    const attaque = parseInt(attrs['profil-attaque']);
    const attaqueContact = parseInt(attrs['profil-attaque-contact']);
    const attaqueScore = parseInt(attrs['profil-attaque-distance']);
    const diff = attaque-attaqueScore;

    let update = {};

    if(attaqueScore > attaque) {
        update['profil-attaque-contact'] = 0;
        update['profil-attaque-distance'] = attaque;
    } else if(attaqueContact > diff) {
        update['profil-attaque-contact'] = diff;
    }

    update['contact-profil'] = attaqueScore;

    setAttrsAsync(update);
});

on(`change:profil-dv`, async function() {
    const list = [
        `profil-dv`,
        `niveau`,
    ];
    const attrs = await getAttrsAsync(list);
    const dv = parseInt(attrs['profil-dv']);
    const niveau = parseInt(attrs['niveau']);

    let update = {};
    if(niveau === 1) update['pv-dv'] = dv;

    setAttrsAsync(update);
});

on(`change:profil-serenite`, async function() {
    const list = [
        `profil-serenite`,
        `intelligence-mod`,
        `perception-mod`,
        `mythos`
    ];
    const attrs = await getAttrsAsync(list);
    const serenite = parseInt(attrs['profil-serenite']);
    const intelligence = parseInt(attrs['intelligence-mod']);
    const perception = parseInt(attrs['perception-mod']);
    const mythos = parseInt(attrs['mythos']);

    let update = {};
    update['serenite-base'] = 2+serenite+intelligence+perception-mythos;

    setAttrsAsync(update);
});

on(`change:profil-chance`, async function() {
    const list = [
        `profil-chance`,
        `charisme-mod`,
    ];
    const attrs = await getAttrsAsync(list);
    const chance = parseInt(attrs['profil-chance']);
    const charisme = parseInt(attrs['charisme-mod']);

    let update = {};
    update['chance-base'] = 2+chance+charisme;

    setAttrsAsync(update);
});

on(`clicked:switchvoie`, async function() {
    let update = {};
    update['voie-selshow'] = 'voie';

    setAttrsAsync(update);
});

on(`clicked:switchcapacite`, async function() {
    let update = {};
    update['voie-selshow'] = 'capacite';

    setAttrsAsync(update);
});