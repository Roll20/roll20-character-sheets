on(`clicked:arcdefeu`, async function() {
    const list = [
        'arcdefeu'
    ];

    const attrs = await getAttrsAsync(list);
    const clicked = attrs['arcdefeu'] === 1 ? 0 : 1;
    let update = {};
    update['arcdefeu'] = clicked;
    await setAttrsAsync(update);
});

on(`clicked:popupcombat-confirmer`, async function() {
    const list = [
        `popup-id`,
        `popup-stringify`,
        `popup-type`,
        `popup-luminosite`,
        `popup-portee`,
        `popup-dice-atk`,
        `nbre-dice`,
        `arcdefeu`,
        `rang-voie`,
        `divers`,
        `roll-type`,
    ];

    const attrs = await getAttrsAsync(list);
    const rollType = attrs['roll-type'];
    const type = attrs['popup-type'];
    const base = attrs['popup-id'];
    const json = JSON.parse(attrs['popup-stringify']);
    const cName = json[`character_name`];
    const name = json[`${base}_name`];
    const dm = json[`${base}_dm`] ? json[`${base}_dm`] : 0;
    const splitDm = dm === 0 ? [''] : dm.split('+');
    const ki = parseInt(json['ki']);
    const rang = parseInt(attrs['rang-voie']);
    const modDivers = parseInt(attrs['divers']);
    const nbreDice = parseInt(attrs['nbre-dice']);
    const dice = getDice(attrs['popup-dice-atk']);

    let attaque = 0;
    let diceDm = splitDm[0] === "" ? '1D6' : splitDm[0];
    let otherDm = 0;
    let modAtt = 0;
    let modDgt = 0;
    let description;
    let modKiAtt = 0;
    let modKiDgt = 0;
    let isModkiAttPos = 0;
    let isModkiAttNeg = 0;
    let isModkiDgtPos = 0;
    let isModkiDgtNeg = 0;
    let portee = 0;
    let luminosite = 0;
    let incidentTir = 0;
    let arcdefeu = parseInt(attrs['arcdefeu']);
    let empty = 1;
    let aireEffet = '';
    let difficulte = 0;
    let typeMagie = '';
    let formeMagie = '';
    let roll = type === 'sortilege' ? `${rollType} &{template:std} {{name=${cName}}} {{title=${name}}}` : `${rollType} &{template:combat} {{name=${cName}}} {{title=${name}}}`;
    roll += rang !== 0 ? `{{^{rang-voie}=[[${rang}]]}}` : '';
    roll += modDivers !== 0 ? `{{^{mod-divers}=[[${modDivers}]]}}` : '';

    splitDm.shift();
    otherDm = splitDm.reduce(
        (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue),
        0,
    );

    switch(type) {
        case 'contact':
            attaque += parseInt(json['contact']);
            modAtt += parseInt(json[`${base}_modatt`]);
            modDgt += parseInt(json[`${base}_moddgts`]);
            isModkiAttPos = parseInt(json[`${base}_modkipositif`]);
            isModkiAttNeg = parseInt(json[`${base}_modkinegatif`]);
            isModkiDgtPos = parseInt(json[`${base}_modkipositifdgts`]);
            isModkiDgtNeg = parseInt(json[`${base}_modkinegatifdgts`]);
            description = json[`${base}_description`];
            break;
        case 'grenade':
            attaque += parseInt(json['distance']);
            modAtt += parseInt(json[`${base}_modatt`]);
            modDgt += parseInt(json[`${base}_moddgts`]);
            isModkiAttPos = parseInt(json[`${base}_modkipositif`]);
            isModkiAttNeg = parseInt(json[`${base}_modkinegatif`]);
            isModkiDgtPos = parseInt(json[`${base}_modkipositifdgts`]);
            isModkiDgtNeg = parseInt(json[`${base}_modkinegatifdgts`]);
            description = json[`${base}_description`];
            break;
        case 'artillerie':
            attaque += parseInt(json['distance']);
            modAtt += parseInt(json[`${base}_modatt`]);
            modDgt += parseInt(json[`${base}_moddgts`]);
            aireEffet += parseInt(json[`${base}_aire-effet`]);
            isModkiAttPos = parseInt(json[`${base}_modkipositif`]);
            isModkiAttNeg = parseInt(json[`${base}_modkinegatif`]);
            isModkiDgtPos = parseInt(json[`${base}_modkipositifdgts`]);
            isModkiDgtNeg = parseInt(json[`${base}_modkinegatifdgts`]);
            description = json[`${base}_description`];

            roll += `{{aireeffet=[[${aireEffet}]]}}`;
            break;
        case 'distance':
            const getMDistance = getDistanceMod(attrs['popup-luminosite'], attrs['popup-portee']);

            attaque += parseInt(json['distance']);
            modAtt += parseInt(json[`${base}_modatt`]);
            modDgt += parseInt(json[`${base}_moddgts`]);
            isModkiAttPos = parseInt(json[`${base}_modkipositif`]);
            isModkiAttNeg = parseInt(json[`${base}_modkinegatif`]);
            isModkiDgtPos = parseInt(json[`${base}_modkipositifdgts`]);
            isModkiDgtNeg = parseInt(json[`${base}_modkinegatifdgts`]);
            incidentTir = parseInt(json[`${base}_incident-tir`]);
            description = json[`${base}_description`];

            if(getMDistance.luminosite.mod !== 0) {
                roll += getMDistance.luminosite.text;
                luminosite = getMDistance.luminosite.mod;
            }

            if(getMDistance.portee.mod !== 0) {
                roll += getMDistance.portee.text;
                portee = getMDistance.portee.mod;
            }

            if(arcdefeu !== 0) {
                roll += `{{^{arc-de-feu}=[[-3]]}}`;
                incidentTir += 1;
                empty = 0;
            }

            roll += `{{incident=[[0]]}}`;
            break;
        case 'sortilege':
            const rangSort = parseInt(json[`${base}_rang`]);
            typeMagie = json[`${base}_type-magie`];
            formeMagie = json[`${base}_forme-magie`];
            description = json[`${base}_description`];
            difficulte = rangSort*5;
            empty = 0;

            roll += `{{typemagie=${typeMagie}}}`;
            roll += `{{formemagie=${formeMagie}}}`;
            roll += `{{^{rang-sort}=[[${rangSort}]]}}`;
            roll += `{{^{difficulte}=[[${difficulte}]]}}`;
            roll += `{{difficulte=[[0]]}}`;
            roll += `{{result=[[${nbreDice}${dice}kh1cf4cs7cs20+${parseInt(json[`${json[`${base}_caracteristique`]}-mod`])+rang+modDivers}]]}}`;
            roll += `{{echec=[[0]]}} {{destin=[[0]]}} {{critique=[[0]]}}`;
            break;
        case 'sortilege-atk':
            attaque += parseInt(json['magique']);
            description = json[`${base}_description`];
            break;
    }
    let stRoll;
    let computed = {};

    if(rang !== 0 || modDivers !== 0) empty = 0;

    if(type === 'sortilege') {
        if(description !== '') {
            roll += `{{description=${description}}}`;
        }

        roll += `{{empty=[[${empty}]]}}`;

        stRoll = await startRoll(roll);
        const result = Math.max(...stRoll.results.result.dice);

        switch(result) {
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

        if(stRoll.results.result.result >= difficulte && result !== 4) computed.difficulte = 1;
        else computed.difficulte = 0;

        finishRoll(stRoll.rollId, computed);
    } else {
        attaque += modAtt;
        attaque += rang;
        attaque += modDivers;

        if(isModkiAttPos && ki > 0) modKiAtt += ki;
        if(isModkiAttNeg && ki < 0) modKiAtt += ki;
        if(isModkiDgtPos && ki > 0) modKiDgt += ki;
        if(isModkiDgtNeg && ki < 0) modKiDgt += ki;

        if(modAtt !== 0) {
            roll += `{{^{modificateur-attaque-short}=[[${modAtt}]]}}`;
            empty = 0;
        }
        if(modKiAtt !== 0) {
            roll += `{{^{modificateur-ki-attaque-short}=[[${modKiAtt}]]}}`;
            empty = 0;
        }
        if(modDgt !== 0) {
            roll += `{{^{modificateur-degats-short}=[[${modDgt}]]}}`;
            empty = 0;
        }
        if(modKiDgt !== 0) {
            roll += `{{^{modificateur-ki-degats-short}=[[${modKiDgt}]]}}`;
            empty = 0;
        }
        if(description !== '') {
            roll += `{{description=${description}}}`;
        }
        roll += `{{empty=[[${empty}]]}}`;

        attaque += modKiAtt;
        attaque += luminosite;
        attaque += portee;
        modDgt += modKiDgt;
        modDgt += otherDm;

        if(arcdefeu !== 0) {
            attaque -= 3;
            modDgt -= 3;
        }

        if(type === 'artillerie')
            roll += ` {{attaque=[[${nbreDice}${dice}kh1cf1cf2cf4cs7cs20+${attaque}]]}} {{degats=[[{${diceDm}!!}+${modDgt}]]}} {{destin=[[0]]}} {{echec=[[0]]}} {{critique=[[0]]}}`;
        else if(type === 'sortilege-atk') roll += ` {{attaque=[[${nbreDice}${dice}kh1cf4cs7cs20+${attaque}]]}} {{destin=[[0]]}} {{echec=[[0]]}} {{critique=[[0]]}}`;
        else roll += ` {{attaque=[[${nbreDice}${dice}kh1cf4cs7cs20+${attaque}]]}} {{degats=[[{${diceDm}!!}+${modDgt}]]}} {{destin=[[0]]}} {{echec=[[0]]}} {{critique=[[0]]}}`;

        stRoll = await startRoll(roll);
        const diceAttaque = Math.max(...stRoll.results.attaque.dice);
        let totalDgts = 0;
        if(type !== 'sortilege-atk') totalDgts = stRoll.results.degats.result;
        computed = {};

        if(diceAttaque >= 1 && diceAttaque <= incidentTir) {
            computed.incident = 1;
        }

        switch(diceAttaque) {
            case 1:
            case 2:
                if(type === 'artillerie') computed.echec = 1;
            break;
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

        if(totalDgts < 1) totalDgts = 1;

        if(diceAttaque === 20) computed.degats = totalDgts*2;
        else computed.degats = totalDgts;

        finishRoll(stRoll.rollId, computed);

        if(type === 'artillerie' && (diceAttaque === 1 || diceAttaque === 2 || diceAttaque === 4)) {
            let rollArtillerie = `${rollType} &{template:std} {{name=${cName}}} {{title=${name}}} {{subtitle=^{relance-echec-critique}}} {{result=[[${nbreDice}${dice}]]}} {{echec=[[0]]}}`;
            let artillerieRoll = await startRoll(rollArtillerie);
            const diceArtillerie = artillerieRoll.results.result.dice[0];
            let computedArtillerie = {};
            if(diceArtillerie === 1 || diceArtillerie === 2 || diceArtillerie === 4) computedArtillerie.echec = 1;
            finishRoll(artillerieRoll.rollId, computedArtillerie);
        }
    }

    let update = {};
    update['popup'] = 0;
    update['nbre-dice'] = 1;
    await setAttrsAsync(update);
});

on(`clicked:popupstd-confirmer`, async function() {
    const list = [
        `popup-id`,
        `popup-stringify`,
        `popup-type`,
        `popup-title`,
        `nbre-dice`,
        `rang-voie`,
        `divers`,
        `dice-special`,
        `roll-type`,
    ];

    const attrs = await getAttrsAsync(list);
    const rollType = attrs['roll-type'];
    const diceSpe = attrs['dice-special'];
    const nbreDice = attrs[`nbre-dice`];
    const type = attrs['popup-type'];
    const base = attrs['popup-id'];
    const json = JSON.parse(attrs['popup-stringify']);
    const cName = json[`character_name`];
    const title = attrs['popup-title'];
    const rang = parseInt(attrs['rang-voie']);
    const modDivers = parseInt(attrs['divers']);
    const dice = getDice(diceSpe);
    let name = '';
    let rollBase = 0;
    let empty = 1;
    let roll = `${rollType} &{template:std}`;
    roll += rang !== 0 ? `{{^{rang-voie}=[[${rang}]]}}` : '';
    roll += modDivers !== 0 ? `{{^{mod-divers}=[[${modDivers}]]}}` : '';

    switch(type) {
        case 'resistancementale':
            name = title;
            rollBase = parseInt(json[`volonte`]);
            break;
        case 'vehicule':
            let dexterite = parseInt(json[`dexterite-mod`]);
            let agilite = parseInt(json[`${base}_agilite-vehicule`]);

            name = title !== '' ? '' : title;
            rollBase = dexterite;
            rollBase += agilite;

            roll += `{{subtitle=^{pilotage-roll}}}`;
            roll += `{{^{dexterite}=[[${dexterite}]]}} {{^{agilite}=[[${agilite}]]}}`;
            break;
        case 'caracteristique':
            name = getTranslationByKey(base).charAt(0).toUpperCase() + getTranslationByKey(base).slice(1);
            let caracteristique = parseInt(json[`${base}-mod`]);
            rollBase += caracteristique;
            break;
        case 'combat':
            name = getTranslationByKey(base).charAt(0).toUpperCase() + getTranslationByKey(base).slice(1);
            rollBase += parseInt(json[base]);
            break;
    }

    roll += `{{name=${cName}}} {{title=${name}}}`;
    roll += `{{result=[[${nbreDice}${dice}kh1cf4cs7cs20+${parseInt(rollBase+rang+modDivers)}]]}}`;
    roll += `{{echec=[[0]]}} {{destin=[[0]]}} {{critique=[[0]]}}`;

    if(rang !== 0 || modDivers !== 0) empty = 0;

    roll += `{{empty=[[${empty}]]}}`;

    let stRoll = await startRoll(roll);
    let computed = {};
    const diceResult = Math.max(...stRoll.results.result.dice);

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

    finishRoll(stRoll.rollId, computed);
    let update = {};
    update['popup'] = 0;
    update['nbre-dice'] = 1;
    await setAttrsAsync(update);
});