/* Skills */
/* Standard Skills */
const stdSkillChars = {
    /* standard skill chrs */
    'athletics': ['str', 'dex'],
    'brawn': ['str', 'siz'],
    'boating': ['str', 'con'],
    'commerce': ['int', 'cha'],
    'common_tongue': ['int', 'cha'],
    'conceal': ['dex', 'pow'],
    'customs': ['int', 'int'],
    'dance': ['dex', 'cha'],
    'deceit': ['int', 'cha'],
    'drive': ['dex', 'pow'],
    'eloquence': ['cha', 'cha'],
    'endurance': ['con', 'con'],
    'evade': ['dex', 'dex'],
    'first_aid': ['dex', 'int'],
    'folk_lore': ['int', 'int'],
    'gaming': ['int', 'pow'],
    'home_parallel': ['int', 'int'],
    'influence': ['cha', 'cha'],
    'insight': ['int', 'pow'],
    'locale': ['int', 'int'],
    'native_tongue': ['int', 'cha'],
    'perception': ['int', 'pow'],
    'purity': ['pow', 'cha'],
    'ride': ['dex', 'pow'],
    'research': ['int', 'pow'],
    'sing': ['pow', 'cha'],
    'spectral_combat': ['pow', 'cha'],
    'status': [0, 0],
    'stealth': ['dex', 'int'],
    'streetwise': ['pow', 'cha'],
    'superstition': ['21-int', 'pow'],
    'swim': ['str', 'con'],
    'unarmed': ['str', 'dex'],
    'willpower': ['pow', 'pow']
}
const stdSkillIds = Object.keys(stdSkillChars);
function calcStdSkill(skillId, v, sourceAttribute) {
    let newAttrs = {};
    const int = parseInt(v['int']) || 0;
    v['21-int'] = 21 - int;
    const char1 = parseInt(v[stdSkillChars[`${skillId}`][0]]) || 0;
    const char2 = parseInt(v[stdSkillChars[`${skillId}`][1]]) || 0;

    if (sourceAttribute === skillId) {
        const skill = parseInt(v[`${skillId}`]) || 0;
        newAttrs[`${skillId}_other`] = skill - char1 - char2;
    } else {
        const skillOther = parseInt(v[`${skillId}_other`]) || 0;
        newAttrs[`${skillId}`] = char1 + char2 + skillOther;
        /* for spirit and social skills we set the new value in v so those calcs may use the new value */
        v[`${skillId}`] = newAttrs[`${skillId}`];
    }

    let newInitAttrs = {};
    let newMoveAttrs = {};
    if ('athletics' === skillId) {
        if (v['initiative_add_one_tenth_athletics'] === '1') {
            newInitAttrs = calcInitiativeBonus(v);
        }
        newMoveAttrs = calcMoveRate(v);
    }

    let newSpiritDamageAttrs = {};
    if (v['spirit_combat_skill_id'] === skillId) {
        newAttrs['spirit_combat_skill_name'] =  getTranslationByKey(skillId);
        newAttrs['spirit_combat_skill_total'] = v[`${skillId}`];
        newAttrs['spirit_combat_skill_notes'] = v[`${skillId}_notes`];

        newSpiritDamageAttrs = calcSpiritDamage({...v, ...newAttrs});
    }

    let newSocialDamageAttrs = {};
    if (v['social_offense_id'] === skillId) {
        newAttrs['social_offense_name'] =  getTranslationByKey(skillId);
        newAttrs['social_offense_total'] = v[`${skillId}`];
        newAttrs['social_offense_notes'] = v[`${skillId}_notes`];

        newSocialDamageAttrs = calcSocialDamage({...v, ...newAttrs});
    }

    if (v['social_defense_id'] === skillId) {
        newAttrs['social_defense_name'] =  getTranslationByKey(skillId);
        newAttrs['social_defense_total'] = v[`${skillId}`];
        newAttrs['social_defense_notes'] = v[`${skillId}_notes`];
    }

    return {
        ...newAttrs,
        ...newInitAttrs,
        ...newMoveAttrs,
        ...newSpiritDamageAttrs,
        ...newSocialDamageAttrs
    }
}
stdSkillIds.forEach(skillId => {
    on(`change:${skillId} change:${skillId}_notes`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        getAttrs([`${skillId}`, `${skillId}_other`, `${skillId}_notes`, 'social_defense_id'].concat(characteristicAttrs,
            initGetAttrs, moveRateGetAttrs, spiritDamageGetAttrs, socialDamageGetAttrs), function(v) {
            setAttrs(calcStdSkill(`${skillId}`, v, event.sourceAttribute));
        });
    });
});
/* Standard Skill Action Buttons */
stdSkillIds.forEach(skillId => {
    on(`clicked:${skillId}-augment`, function(event) {
        getAttrs([`${skillId}`], function(v) {
            const skillValue = parseInt(v[`${skillId}`]) || 0;
            const augmentValue = Math.ceil(skillValue / 5);

            setAttrs({
                augmentation: "@{set_augmentation}",
                set_augmentation: augmentValue
            });
        });
    });
    on(`clicked:${skillId}-set-social-offense`, function(event) {
        getAttrs([`${skillId}`, `${skillId}_notes`].concat(socialDamageGetAttrs), function(v) {
            const newAttrs = {
                social_offense_id: skillId,
                social_offense_name: getTranslationByKey(skillId),
                social_offense_total: v[skillId],
                social_offense_notes: v[`${skillId}_notes`]
            };

            setAttrs({
                ...newAttrs,
                ...calcSocialDamage({...v, ...newAttrs})
            });
        });
    });
    on(`clicked:${skillId}-set-social-defense`, function(event) {
        getAttrs([`${skillId}`, `${skillId}_notes`], function(v) {
            const newAttrs = {
                social_defense_id: skillId,
                social_defense_name: getTranslationByKey(skillId),
                social_defense_total: v[skillId],
                social_defense_notes: v[`${skillId}_notes`]
            };

            setAttrs(newAttrs);
        });
    });
});
on(`clicked:willpower-set-spirit-combat`, function(event) {
    getAttrs(['willpower', 'willpower_notes'].concat(spiritDamageGetAttrs), function(v) {
        const newAttrs = {
            spirit_combat_skill_id: 'willpower',
            spirit_combat_skill_name: getTranslationByKey('willpower'),
            spirit_combat_skill_total: v['willpower'],
            spirit_combat_skill_notes: v['willpower_notes']
        };

        setAttrs({
            ...newAttrs,
            ...calcSpiritDamage({...v, ...newAttrs})
        });
    });
});

/* Professional Skills, Combat Styles & Passions */
const nonSpecialtyProSkillChars = {
    'acting': ['cha', 'cha'],
    'acrobatics': ['str', 'dex'],
    'arcane_casting': ['int', 'pow'],
    'arcane_knowledge': ['int', 'int'],
    'artifice': ['int', 'dex'],
    'astrogation': ['int', 'int'],
    'bureaucracy': ['int', 'int'],
    'channel': ['int', 'pow'],
    'command': ['int', 'cha'],
    'commerce': ['int', 'cha'],
    'comms': ['int', 'int'],
    'computers': ['int', 'int'],
    'courtesy': ['int', 'cha'],
    'cursing': ['cha', 'pow'],
    'demolitions': ['int', 'pow'],
    'disguise': ['int', 'cha'],
    'divination': ['int', 'pow'],
    'electronics': ['dex', 'int'],
    'engineering': ['int', 'int'],
    'exhort': ['int', 'cha'],
    'fata': ['pow', 'cha'],
    'folk_magic': ['pow', 'cha'],
    'forgery': ['int', 'pow'],
    'gambling': ['int', 'pow'],
    'gnosis': ['int', 'pow'],
    'healing': ['int', 'pow'],
    'law': ['int', 'cha'],
    'linguistics': ['int', 'cha'],
    'lockpicking': ['dex', 'dex'],
    'lycanthropy': ['con', 'pow'],
    'mechanisms': ['dex', 'int'],
    'meditation': ['con', 'int'],
    'medicine': ['int', 'pow'],
    'navigation': ['int', 'pow'],
    'necromancy': ['int', 'cha'],
    'oratory': ['pow', 'cha'],
    'pharmacy': ['int', 'int'],
    'pilot': ['dex', 'int'],
    'probabilities': ['int', 'int'],
    'politics': ['int', 'cha'],
    'research': ['int', 'pow'],
    'rhetoric': ['pow', 'cha'],
    'seamanship': ['int', 'con'],
    'seduction': ['int', 'cha'],
    'sensors': ['int', 'pow'],
    'shape_shifting': ['con', 'pow'],
    'shaping': ['int', 'pow'],
    'sleight': ['dex', 'cha'],
    'streetwise': ['pow', 'cha'],
    'survival': ['pow', 'con'],
    'teach': ['int', 'cha'],
    'theology': ['pow', 'pow'],
    'track': ['int', 'con'],
    'trance': ['pow', 'con']
}
const allNonSpecialtyProSkillIds = Object.keys(nonSpecialtyProSkillChars);
const specialtyProSkillChars = {
    'art': ['pow', 'cha'],
    'binding': ['pow', 'cha'],
    'craft': ['dex', 'int'],
    'culture': ['int', 'int'],
    'devotion': ['pow', 'cha'],
    'invocation': ['int', 'int'],
    'knowledge': ['int', 'int'],
    'language': ['int', 'cha'],
    'literacy': ['int', 'int'],
    'lore': ['int', 'int'],
    'musicianship': ['dex', 'cha'],
    'mysticism': ['con', 'pow'],
    'path': ['con', 'pow'],
    'pilot': ['dex', 'int'],
    'rites': ['pow', 'cha'],
    'science': ['int', 'int']
}
const allSpecialtyProSkillIds = Object.keys(specialtyProSkillChars);
/**
 * Will read the base char value selected for a skill and parse it into a value
 * @param charOption the char value still in autocalc format for historical compatibility
 * @param v the got attributes needed, characteristicAttrs
 * @returns {number|number|number}
 */
function parseBaseChar(charOption, v) {
    if (charOption === '@{str}') {
        return parseInt(v['str']) || 0;
    } else if (charOption === '@{con}') {
        return parseInt(v['con']) || 0;
    } else if (charOption === '@{siz}') {
        return parseInt(v['siz']) || 0;
    } else if (charOption === '@{dex}') {
        return parseInt(v['dex']) || 0;
    } else if (charOption === '@{int}') {
        return parseInt(v['int']) || 0;
    } else if (charOption === '@{pow}') {
        return parseInt(v['pow']) || 0;
    } else if (charOption === '@{cha}') {
        return parseInt(v['cha']) || 0;
    } else {
        return 0;
    }
}
function calcProSkill(skillId, v, sourceAttribute) {
    let newAttrs = {};
    /* If a str or dex skill then it is affected by encumbrance */
    if (v['${skillId}_char1'] === '@{str}' || v['${skillId}_char1'] === '@{dex}' ||
        v['${skillId}_char2'] === '@{str}' || v['${skillId}_char2'] === '@{dex}') {
        newAttrs[`${skillId}_encumbered`] = 1;
    } else {
        newAttrs[`${skillId}_encumbered`] = 0;
    }
    const char1 = parseBaseChar(v[`${skillId}_char1`], v);
    const char2 = parseBaseChar(v[`${skillId}_char2`], v);
    if (sourceAttribute === `${skillId}_total`) {
        const skill = parseInt(v[`${skillId}_total`]) || 0;
        newAttrs[`${skillId}_other`] = skill - char1 - char2;
    } else {
        const skillOther = parseInt(v[`${skillId}_other`]) || 0;
        newAttrs[`${skillId}_total`] = char1 + char2 + skillOther;
        /* for spirit and social skills we set the new value in v so those calcs may use the new value */
        v[`${skillId}_total`] = newAttrs[`${skillId}_total`];
    }

    let newSpiritDamageAttrs = {};
    /* We loose case as we copy skillIds into the spirit/social associated fields, so we need to normalize the checks */
    if (v['spirit_combat_skill_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['spirit_combat_skill_name'] = v[`${skillId}_name`];
        newAttrs['spirit_combat_skill_total'] = v[`${skillId}_total`];
        newAttrs['spirit_combat_skill_notes'] = v[`${skillId}_notes`];

        newSpiritDamageAttrs = calcSpiritDamage({...v, ...newAttrs});
    }

    let newSocialDamageAttrs = {};
    if (v['social_offense_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['social_offense_name'] =  v[`${skillId}_name`];
        newAttrs['social_offense_total'] = v[`${skillId}_total`];
        newAttrs['social_offense_notes'] = v[`${skillId}_notes`];

        newSocialDamageAttrs = calcSocialDamage({...v, ...newAttrs});
    }

    if (v['social_defense_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['social_defense_name'] =  v[`${skillId}_name`];
        newAttrs['social_defense_total'] = v[`${skillId}_total`];
        newAttrs['social_defense_notes'] = v[`${skillId}_notes`];
    }

    return {
        ...newAttrs,
        ...newSpiritDamageAttrs,
        ...newSocialDamageAttrs
    }
}
on('change:repeating_standardskill:total change:repeating_standardskill:notes change:repeating_standardskill:name change:repeating_standardskill:char1 change:repeating_standardskill:char2 change:repeating_professionalskill:total change:repeating_professionalskill:notes change:repeating_professionalskill:name change:repeating_professionalskill:char1 change:repeating_professionalskill:char2 change:repeating_combatstyle:total change:repeating_combatstyle:notes change:repeating_combatstyle:name change:repeating_combatstyle:char1 change:repeating_combatstyle:char2', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_total`, `repeating_${type}_${id}_other`, `repeating_${type}_${id}_notes`, `repeating_${type}_${id}_name`,
        `repeating_${type}_${id}_char1`, `repeating_${type}_${id}_char2`,  'social_defense_id'].concat(
        characteristicAttrs, spiritDamageGetAttrs, socialDamageGetAttrs), function(v) {
        setAttrs(calcProSkill(`repeating_${type}_${id}`, v, event.sourceAttribute));
    });
});
function calcPassion(skillId, v) {
    let newAttrs = {};
    let newSpiritDamageAttrs = {};
    /* We loose case as we copy skillIds into the spirit/social associated fields, so we need to normalize the checks */
    if (v['spirit_combat_skill_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['spirit_combat_skill_name'] = v[`${skillId}_name`];
        newAttrs['spirit_combat_skill_total'] = v[`${skillId}_total`];
        newAttrs['spirit_combat_skill_notes'] = v[`${skillId}_notes`];

        newSpiritDamageAttrs = calcSpiritDamage({...v, ...newAttrs});
    }

    let newSocialDamageAttrs = {};
    if (v['social_offense_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['social_offense_name'] =  v[`${skillId}_name`];
        newAttrs['social_offense_total'] = v[`${skillId}_total`];
        newAttrs['social_offense_notes'] = v[`${skillId}_notes`];

        newSocialDamageAttrs = calcSocialDamage({...v, ...newAttrs});
    }

    if (v['social_defense_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['social_defense_name'] =  v[`${skillId}_name`];
        newAttrs['social_defense_total'] = v[`${skillId}_total`];
        newAttrs['social_defense_notes'] = v[`${skillId}_notes`];
    }

    return {
        ...newAttrs,
        ...newSpiritDamageAttrs,
        ...newSocialDamageAttrs
    }
}
on('change:repeating_passion:total change:repeating_passion:notes change:repeating_passion:name', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_passion_${id}_total`, `repeating_passion_${id}_notes`, `repeating_passion_${id}_name`,
        'social_defense_id'].concat(spiritDamageGetAttrs, socialDamageGetAttrs), function(v) {
        setAttrs(calcPassion(`repeating_passion_${id}`, v));
    });
});
on('clicked:repeating_standardskill:augment clicked:repeating_combatstyle:augment clicked:repeating_professionalskill:augment clicked:repeating_affiliation:augment clicked:repeating_passion:augment clicked:repeating_dependency:augment clicked:repeating_peculiarity:augment', function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_total`], function(v) {
        const skillValue = parseInt(v[`repeating_${type}_${id}_total`]) || 0;
        const augmentValue = Math.ceil(skillValue / 5);

        setAttrs({
            augmentation: "@{set_augmentation}",
            set_augmentation: augmentValue
        });
    });
});
on('clicked:repeating_standardskill:set-social-offense clicked:repeating_professionalskill:set-social-offense clicked:repeating_passion:set-social-offense', function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_name`, `repeating_${type}_${id}_total`, `repeating_${type}_${id}_notes`].concat(socialDamageGetAttrs), function(v) {
        const newAttrs = {
            social_offense_id: `repeating_${type}_${id}`,
            social_offense_name: v[`repeating_${type}_${id}_name`],
            social_offense_total: v[`repeating_${type}_${id}_total`],
            social_offense_notes: v[`repeating_${type}_${id}_notes`],
        };

        setAttrs({
            ...newAttrs,
            ...calcSocialDamage({...v, ...newAttrs})
        });
    });
});
on('clicked:repeating_standardskill:set-social-defense clicked:repeating_professionalskill:set-social-defense clicked:repeating_passion:set-social-defense', function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_name`, `repeating_${type}_${id}_total`, `repeating_${type}_${id}_notes`], function(v) {
        const newAttrs = {
            social_defense_id: `repeating_${type}_${id}`,
            social_defense_name: v[`repeating_${type}_${id}_name`],
            social_defense_total: v[`repeating_${type}_${id}_total`],
            social_defense_notes: v[`repeating_${type}_${id}_notes`]
        };

        setAttrs(newAttrs);
    });
});
on(`clicked:repeating_standardskill:set-spirit-combat clicked:repeating_professionalskill:set-spirit-combat clicked:repeating_passion:set-spirit-combat`, function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_name`, `repeating_${type}_${id}_total`,
        `repeating_${type}_${id}_notes`].concat(spiritDamageGetAttrs), function(v) {
        const newAttrs = {
            spirit_combat_skill_id: `repeating_${type}_${id}`,
            spirit_combat_skill_name: v[`repeating_${type}_${id}_name`],
            spirit_combat_skill_total: v[`repeating_${type}_${id}_total`],
            spirit_combat_skill_notes: v[`repeating_${type}_${id}_notes`]
        };

        setAttrs({
            ...newAttrs,
            ...calcSpiritDamage({...v, ...newAttrs})
        });
    });
});

/* Dependency Penalty to Tenacity */
on(`change:repeating_dependency:total remove:repeating_dependency`, function(event) {
    getSectionIDs("repeating_dependency", function(dependencyIds) {
        let fetchAttrs = [];
        dependencyIds.forEach(id => {
            fetchAttrs.push(`repeating_dependency_${id}_total`);
        });
        getAttrs(fetchAttrs.concat(tenacityGetAttrs), function(v) {
            let newAttrs = {tenacity_dependencies: 0};
            dependencyIds.forEach(id => {
                const depTotal = parseInt(v[`repeating_dependency_${id}_total`]) || 0;
                const depPenalty = Math.floor(depTotal/20);
                newAttrs['tenacity_dependencies'] = newAttrs['tenacity_dependencies'] - depPenalty;
            });
            setAttrs({
                ...newAttrs,
                ...calcTenacity({...v, ...newAttrs})
            });
        });
    });
});