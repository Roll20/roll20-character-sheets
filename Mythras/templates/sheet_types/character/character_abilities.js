/* Traditions */
on(`change:repeating_tradition:skill1_id change:repeating_tradition:skill2_id`, function(event) {
    if (event.sourceType === "sheetworker") {return {};}
    const traditionId = event.sourceAttribute.split('_')[2];
    const traditionSkill = event.sourceAttribute.split('_')[3];
    const skillId = event.newValue;

    let newAttrs = {};
    if (!event.newValue) { /* If unset */
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_name`] = '';
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_total`] = '0';
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_notes`] = '';
    } else if (skillId.startsWith("repeating_")) { /* Repeating skills */
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_name`] = `@{${skillId}_name}`;
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_total`] = `@{${skillId}_total}`;
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_notes`] = `@{${skillId}_notes}`;
    } else { /* Standard Skills */
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_name`] = getTranslationByKey(skillId);
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_total`] = `@{${skillId}}`;
        newAttrs[`repeating_tradition_${traditionId}_${traditionSkill}_notes`] = `@{${skillId}_notes}`;
    }

    setAttrs(newAttrs);
});

/* Abilities */
on('change:ability_filter_favored change:ability_filter_type change:ability_filter_rank', function(event) {
    getSectionIDs("repeating_ability", function(abilityIds) {
        let abilityGetAttrs = [];
        abilityIds.forEach(id => {
            abilityGetAttrs.push(`repeating_ability_${id}_favored`, `repeating_ability_${id}_type`, `repeating_ability_${id}_rank`);
        });

        getAttrs(['ability_filter_favored', 'ability_filter_type', 'ability_filter_rank'].concat(abilityGetAttrs), function(v) {
            let newAttrs = {}
            abilityIds.forEach(id => {
                if ((v['ability_filter_favored'] === v[`repeating_ability_${id}_favored`] || v['ability_filter_favored'] === '0')
                    && (v['ability_filter_type'] === v[`repeating_ability_${id}_type`] || v['ability_filter_type'] === 'all')
                    && (v['ability_filter_rank'] === v[`repeating_ability_${id}_rank`] || v['ability_filter_rank'] === 'all')
                ) {
                    newAttrs[`repeating_ability_${id}_show`] = 1;
                } else {
                    newAttrs[`repeating_ability_${id}_show`] = 0;
                }
            });

            setAttrs(newAttrs);
        });
    });
});
on('change:repeating_ability:type', function(event) {
    if (event.sourceType === "sheetworker") {return {};}
    const abilityId = event.sourceAttribute.split('_')[2];

    getAttrs(['shaping_traits', 'sheet_type', 'ability_filter_favored', 'ability_filter_type', 'ability_filter_rank', `repeating_ability_${abilityId}_favored`, `repeating_ability_${abilityId}_type`,`repeating_ability_${abilityId}_rank`], function(v) {
        let newAttrs = {}
        /* Advanced Traits */
        if (event.newValue === 'mysticism' || event.newValue === 'arcane_magic' || event.newValue === 'divine_magic') {
            newAttrs[`repeating_ability_${abilityId}_advanced_traits`] = '^{intensity}: @{dynamic_intensity}';
        } else if (event.newValue === 'sorcery') {
            newAttrs[`repeating_ability_${abilityId}_advanced_traits`] = '@{shaping_traits}';
        } else if (event.newValue === 'sandestin_magic') {
            newAttrs[`repeating_ability_${abilityId}_advanced_traits`] = '^{area}: @{sandestin_area}\n^{combine}: @{sandestin_combine}\n^{fortune}: @{sandestin_fortune}\n^{services}: @{sandestin_services}\n^{swiftness}: @{sandestin_swiftness}\n^{terms}: @{sandestin_terms}';
        } else if (event.newValue === 'assabian_alchemy') {
            newAttrs[`repeating_ability_${abilityId}_advanced_traits`] = '^{combine}: @{shaped_combine}\n^{conditions}: @{shaped_conditions}\n^{doses}: @{shaped_doses}\n^{magnitude}: @{shaped_magnitude}\n^{shelf_life}: @{shaped_shelf_life}';
        } else if (event.newValue === 'ability' && v['sheet_type'] === 'spirit') {
            newAttrs[`repeating_ability_${abilityId}_advanced_traits`] = '^{spirit_intensity}: @{spirit_intensity}';
        } else {
            newAttrs[`repeating_ability_${abilityId}_advanced_traits`] = '';
        }

        /* Traited */
        if (event.newValue === 'ability' || event.newValue === 'gift' || event.newValue === 'limitation' || event.newValue === 'other' || event.newValue === 'trait') {
            newAttrs[`repeating_ability_${abilityId}_traited`] = 0;
            newAttrs[`repeating_ability_${abilityId}_traits`] = '';
            newAttrs[`repeating_ability_${abilityId}_tradition_id`] = '';
            newAttrs[`repeating_ability_${abilityId}_skill1_name`] = '';
            newAttrs[`repeating_ability_${abilityId}_skill1_total`] = '';
            newAttrs[`repeating_ability_${abilityId}_skill2_name`] = '';
            newAttrs[`repeating_ability_${abilityId}_skill2_total`] = '';
        } else {
            newAttrs[`repeating_ability_${abilityId}_traited`] = 1;
        }

        /* Filter */
        if ((v['ability_filter_favored'] === v[`repeating_ability_${abilityId}_favored`] || v['ability_filter_favored'] === '0')
            && (v['ability_filter_type'] === v[`repeating_ability_${abilityId}_type`] || v['ability_filter_type'] === 'all')
            && (v['ability_filter_rank'] === v[`repeating_ability_${abilityId}_rank`] || v['ability_filter_rank'] === 'all')
        ) {
            newAttrs[`repeating_ability_${abilityId}_show`] = 1;
        } else {
            newAttrs[`repeating_ability_${abilityId}_show`] = 0;
        }

        setAttrs(newAttrs);
    });
});
on('change:repeating_ability:favored change:repeating_ability:rank', function(event) {
    const abilityId = event.sourceAttribute.split('_')[2];
    getAttrs(['ability_filter_favored', 'ability_filter_type', 'ability_filter_rank', `repeating_ability_${abilityId}_favored`, `repeating_ability_${abilityId}_type`,`repeating_ability_${abilityId}_rank`], function(v) {
        /* Filter */
        if ((v['ability_filter_favored'] === v[`repeating_ability_${abilityId}_favored`] || v['ability_filter_favored'] === '0')
            && (v['ability_filter_type'] === v[`repeating_ability_${abilityId}_type`] || v['ability_filter_type'] === 'all')
            && (v['ability_filter_rank'] === v[`repeating_ability_${abilityId}_rank`] || v['ability_filter_rank'] === 'all')
        ) {
            setAttrs({[`repeating_ability_${abilityId}_show`]: 1});
        } else {
            setAttrs({[`repeating_ability_${abilityId}_show`]: 0});
        }
    });
});
on('change:repeating_ability:traits', function(event) {
    const id = event.sourceAttribute.split('_')[2];
    if (event.newValue === undefined || event.newValue === '') {
        setAttrs({[`repeating_ability_${id}_summary`]: ""});
    } else {
        setAttrs({[`repeating_ability_${id}_summary`]: event.newValue.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ",\xa0")});
    }
});
on('change:repeating_ability:tradition_id', function(event) {
    const abilityId = event.sourceAttribute.split('_')[2];
    const traditionId = event.newValue;

    if (event.newValue === undefined || event.newValue === '') {
        setAttrs({
            [`repeating_ability_${abilityId}_skill1_name`]: '',
            [`repeating_ability_${abilityId}_skill1_total`]: '',
            [`repeating_ability_${abilityId}_skill2_name`]: '',
            [`repeating_ability_${abilityId}_skill2_total`]: ''
        });
    } else {
        setAttrs({
            [`repeating_ability_${abilityId}_skill1_name`]: `@{${traditionId}_skill1_name}`,
            [`repeating_ability_${abilityId}_skill1_total`]: `@{${traditionId}_skill1_total}`,
            [`repeating_ability_${abilityId}_skill2_name`]: `@{${traditionId}_skill2_name}`,
            [`repeating_ability_${abilityId}_skill2_total`]: `@{${traditionId}_skill2_total}`
        });
    }

});

/* Allied Spirits */
on('change:repeating_fetish:fetish_pow change:repeating_fetish:fetish_cha', function(event) {
    if (event.sourceType === "sheetworker") {return;}

    const spiritId = 'repeating_fetish_' + event.sourceAttribute.split('_')[2];

    getAttrs([`${spiritId}_fetish_pow`, `${spiritId}_fetish_cha`], function(v) {
        const pow = parseInt(v[`${spiritId}_fetish_pow`]) || 0;
        const cha = parseInt(v[`${spiritId}_fetish_cha`]) || 0;
        const spiritDamageSteps = Math.ceil((pow + cha + 50)/20);
        setAttrs({
            [`${spiritId}_fetish_spirit_damage`]: damageTable(spiritDamageSteps)
        })
    });
});

/* SKilled Abilities */
function calcSkilledAbility(skillId, v, sourceAttribute) {
    let newAttrs = {};
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

    return {
        ...newAttrs
    }
}
on('change:repeating_skilledability:total change:repeating_skilledability:name change:repeating_skilledability:char1 change:repeating_skilledability:char2', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_total`, `repeating_${type}_${id}_other`, `repeating_${type}_${id}_name`,
        `repeating_${type}_${id}_char1`, `repeating_${type}_${id}_char2`].concat(characteristicAttrs), function(v) {
        setAttrs(calcSkilledAbility(`repeating_${type}_${id}`, v, event.sourceAttribute));
    });
});
on('change:repeating_skilledability:traits', function(event) {
    const id = event.sourceAttribute.split('_')[2];
    if (event.newValue === undefined || event.newValue === '') {
        setAttrs({[`repeating_skilledability_${id}_summary`]: ""});
    } else {
        setAttrs({[`repeating_skilledability_${id}_summary`]: event.newValue.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ",\xa0")});
    }
});