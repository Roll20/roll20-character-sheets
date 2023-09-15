on('clicked:menu', async (menu) => {
    const data = menu.htmlAttributes.value;

    await setAttrsAsync({ tab: data });
});

const qualite = ['costaud', 'malin', 'mignon'];

qualite.forEach(stat => {
    on(`clicked:${stat}`, async (base) => {
        const listAttrs = [
            `character_name`,
            stat,
            `jets`
        ];
        const attrs = await getAttrsAsync(listAttrs);
        const name = attrs['character_name'];
        const jet = attrs[`jets`];
        const value = +attrs[stat];

        let relance = '';

        switch(stat) {
            case 'costaud':
                relance = 'relance_costaud';
                break;

            case 'malin':
                relance = 'relance_malin';
                break;

            case 'mignon':
                relance = 'relance_mignon';
                break;
        }

        console.log(relance);

        const finalRoll = await startRoll(`${jet} &{template:simple} {{name=${name}}} {{subname=${getTranslationByKey(stat)}}} {{type=[[?{Type ?|Jet Standard, 3|Jet avec Avantage, 4|Jet avec Désavantage, 2}]]}} {{roll=[[?{Type ?|Jet Standard, 3|Jet avec Avantage, 4|Jet avec Désavantage, 2}D6<${value}]]}} {{button=[${getTranslationByKey('relance')}](~${relance})}}`);

        const computed = {};
        finishRoll(finalRoll.rollId, computed);
    });
});

const talents = [
    'bougerpopotin', 'bricolertruc', 'connaitrelois', 'convaincrebaratiner', 'cueillirchasser', 'cuisiner', 'dessinerpeindre', 'fairemusique',
    'fairepoches', 'feulermenacer', 'griffer', 'herboriser', 'lireecrire', 'lireciel', 'observerfouiller', 'restercalme',
    'soccuperbetes', 'cacherombres', 'deplacerensilence', 'seduirecharmer', 'soignerblessures', 'trouverchemin', 'trouverinformation'
];

talents.forEach(talent => {
    on(`clicked:${talent}`, async (base) => {
        const listAttrs = [
            `character_name`,
            `${talent}_select`,
            `jets`
        ];
        const attrs = await getAttrsAsync(listAttrs);
        const name = attrs['character_name'];
        const attribut = attrs[`${talent}_select`];
        const jet = attrs[`jets`];
        const value = await getAttrsAsync([attribut]);

        let relance = '';

        switch(attribut) {
            case 'costaud':
                relance = 'relance_costaud';
                break;

            case 'malin':
                relance = 'relance_malin';
                break;

            case 'mignon':
                relance = 'relance_mignon';
                break;
        }

        const finalRoll = await startRoll(`${jet} &{template:simple} {{name=${name}}} {{subname=${getTranslationByKey(talent)} - ${getTranslationByKey(attribut)}}} {{roll=[[4D6<${value[attribut]}]]}} {{button=[${getTranslationByKey('relance')}](~${relance})}}`);

        const computed = {};
        finishRoll(finalRoll.rollId, computed);
    });
});

const score = [
    'amitie',
    'coeur'
];

score.forEach(valeur => {
    on(`change:${valeur} change:costaud change:malin change:mignon sheet:opened`, async (base) => {
        const listAttrs = [
            `${valeur}`,
            'costaud',
            'malin',
            'mignon'
        ];
        const attrs = await getAttrsAsync(listAttrs);

        const costaud = +attrs['costaud'];
        const malin = +attrs['malin'];
        const mignon = +attrs['mignon'];
        const value = +attrs[`${valeur}`];

        let max = 0;

        switch(valeur) {
            case 'amitie':
                max = mignon;
                break;

            case 'coeur':
                max = costaud+malin;
                break;
        }

        const update = {};
        update[`${valeur}_max`] = max;

        if(value > max) update[`${valeur}`] = max;

        await setAttrsAsync(update);
    });
});