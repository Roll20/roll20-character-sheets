/* Character Versioning */

/* Helper Functions */
function convertSkillToV3(id, v) {
    let newAttrs = {};
    let total;
    if (id.startsWith('repeating_')) {
        total = parseInt(v[`${id}_total`]) || 0;
    } else {
        total = parseInt(v[`${id}`]) || 0;
    }
    const aug = parseInt(v[`${id}_temp`]) || 0;
    const penalty = parseInt(v[`${id}_penalty`]) || 0;
    const xp = parseInt(v[`${id}_experience`]) || 0;
    const other = parseInt(v[`${id}_other`]) || 0;
    newAttrs[`${id}_other`] = xp + other;
    if (id.startsWith('repeating_')) {
        newAttrs[`${id}_total`] = total - penalty - aug;
    } else {
        newAttrs[`${id}`] = total - penalty - aug;
    }
    newAttrs[`${id}_id`] = id;

    return newAttrs;
}

function convertPassionToV3(id, v) {
    let newAttrs = {};
    const total = parseInt(v[`${id}_total`]) || 0;
    const aug = parseInt(v[`${id}_temp`]) || 0;
    const penalty = parseInt(v[`${id}_penalty`]) || 0;
    newAttrs[`${id}_total`] = total - penalty - aug;
    newAttrs[`${id}_id`] = id;

    return newAttrs;
}

function convertSkillToProSkill(oldSkillId, char1, char2, proSkillId, v) {
    let newAttrs = {};

    if (oldSkillId.startsWith('repeating_') || (v[oldSkillId] && v[oldSkillId] !== '0')) {
        let total;
        if (oldSkillId.startsWith('repeating_')) {
            total = parseInt(v[`${oldSkillId}_total`]) || 0;
        } else {
            total = parseInt(v[oldSkillId]) || 0;
        }
        const aug = parseInt(v[`${oldSkillId}_temp`]) || 0;
        const penalty = parseInt(v[`${oldSkillId}_penalty`]) || 0;
        const xp = parseInt(v[`${oldSkillId}_experience`]) || 0;
        const other = parseInt(v[`${oldSkillId}_other`]) || 0;
        if (oldSkillId.startsWith('repeating_')) {
            newAttrs[`${proSkillId}_name`] = !v[`${oldSkillId}_name`] ? "?" : v[`${oldSkillId}_name`];
        } else {
            newAttrs[`${proSkillId}_name`] = getTranslationByKey(oldSkillId);
        }
        newAttrs[`${proSkillId}_id`] = proSkillId;
        newAttrs[`${proSkillId}_fumbled`] = !v[`${oldSkillId}_fumbled`] ? "0" : v[`${oldSkillId}_fumbled`];
        newAttrs[`${proSkillId}_trained`] = !v[`${oldSkillId}_trained`] ? "0" : v[`${oldSkillId}_trained`];
        if (char1 === '@{str}' || char1 === '@{dex}' || char2 === '@{str}' || char2 === '@{dex}') {
            newAttrs[`${proSkillId}_encumbered`] = 1;
        }
        newAttrs[`${proSkillId}_notes`] = !v[`${oldSkillId}_notes`] ? '' : v[`${oldSkillId}_notes`];
        newAttrs[`${proSkillId}_char1`] = char1;
        newAttrs[`${proSkillId}_char2`] = char2;
        newAttrs[`${proSkillId}_other`] = xp + other;
        newAttrs[`${proSkillId}_total`] = total - penalty - aug;
    }

    return newAttrs;
}

function createNewTradition(traditionName, skill1Id, skill2Id) {
    const traditionId = 'repeating_tradition_' + generateRowID();
    let newAttrs = {};

    newAttrs[`${traditionId}_name`] = traditionName;
    newAttrs[`${traditionId}_id`] = traditionId;
    newAttrs[`${traditionId}_details`] = "0";
    newAttrs[`${traditionId}_skill1_id`] = skill1Id;
    newAttrs[`${traditionId}_skill1_name`] = `@{${skill1Id}_name}`;
    newAttrs[`${traditionId}_skill1_total`] = `@{${skill1Id}_total}`;
    newAttrs[`${traditionId}_skill1_notes`] = `@{${skill1Id}_notes}`;

    if (skill2Id !== null) {
        newAttrs[`${traditionId}_skill2_id`] = skill2Id;
        newAttrs[`${traditionId}_skill2_name`] = `@{${skill2Id}_name}`;
        newAttrs[`${traditionId}_skill2_total`] = `@{${skill2Id}_total}`;
        newAttrs[`${traditionId}_skill2_notes`] = `@{${skill2Id}_notes}`;
    }

    return newAttrs;
}

const v3TraitTranslations = {
    "^{brawn-u}": getTranslationByKey('brawn'),
    "^{endurance-u}": getTranslationByKey('endurance'),
    "^{evade-u}": getTranslationByKey('evade'),
    "^{special-u}": getTranslationByKey('special'),
    "^{willpower-u}": getTranslationByKey('willpower'),
}

/**
 * Make the changes needs to get a character sheet updated from 2.7 to 3.0
 */
function upgradeCharacter3Dot0() {
    if (debug) {console.log("Upgrading character to 3.0");}

    /* Collect all the repeating Ids we will need */
    getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
    getSectionIDs("repeating_language", function(languageIds) {
    getSectionIDs("repeating_affiliation", function(affiliationIds) {
    getSectionIDs("repeating_professionalskill", function(professionalSkillIds) {
    getSectionIDs("repeating_passion", function(passionIds) {
    getSectionIDs("repeating_dependency", function(dependencyIds) {
    getSectionIDs("repeating_peculiarity", function(peculiarityIds) {
    getSectionIDs("repeating_path", function(pathIds) {
    getSectionIDs("repeating_invocation", function(invocationIds) {
    getSectionIDs("repeating_devotion", function(devotionIds) {
    getSectionIDs("repeating_folkspell", function(folkSpellIds) {
    getSectionIDs("repeating_practicedtalent", function(practicedTalentIds) {
    getSectionIDs("repeating_sorceryspell", function(sorcerySpellIds) {
    getSectionIDs("repeating_miracle", function(miracleIds) {
    getSectionIDs("repeating_magicspell", function(magicSpellIds) {
    getSectionIDs("repeating_psionicpower", function(psionicPowerIds) {
    getSectionIDs("repeating_arcanemagicrank0spell", function(arcanemagicrank0spellIds) {
    getSectionIDs("repeating_arcanemagicrank1spell", function(arcanemagicrank1spellIds) {
    getSectionIDs("repeating_arcanemagicrank2spell", function(arcanemagicrank2spellIds) {
    getSectionIDs("repeating_arcanemagicrank3spell", function(arcanemagicrank3spellIds) {
    getSectionIDs("repeating_arcanemagicrank4spell", function(arcanemagicrank4spellIds) {
    getSectionIDs("repeating_arcanemagicrank5spell", function(arcanemagicrank5spellIds) {
    getSectionIDs("repeating_divinemagicrank1spell", function(divinemagicrank1spellIds) {
    getSectionIDs("repeating_divinemagicrank2spell", function(divinemagicrank2spellIds) {
    getSectionIDs("repeating_divinemagicrank3spell", function(divinemagicrank3spellIds) {
    getSectionIDs("repeating_divinemagicrank4spell", function(divinemagicrank4spellIds) {
    getSectionIDs("repeating_divinemagicrank5spell", function(divinemagicrank5spellIds) {
    getSectionIDs("repeating_superpower", function(superpowerIds) {
    getSectionIDs("repeating_superpowerboost", function(superpowerboostIds) {
    getSectionIDs("repeating_superpowerlimit", function(superpowerlimitIds) {
    getSectionIDs("repeating_faepower", function(faepowerIds) {
    getSectionIDs("repeating_alchemicaltradition", function(alchemicaltraditionIds) {
    getSectionIDs("repeating_alchemicalformula", function(alchemicalformulaIds) {
    getSectionIDs("repeating_artificespell", function(artificespellIds) {
    getSectionIDs("repeating_discipline", function(disciplineIds) {
    getSectionIDs("repeating_psionictalent", function(psionictalentIds) {
    getSectionIDs("repeating_trait", function(traitIds) {
    getSectionIDs("repeating_worksong", function(worksongIds) {

        let worksongGetAttrs = [];
        worksongIds.forEach(id => {
            worksongGetAttrs.push(`repeating_worksong_${id}_name`, `repeating_worksong_${id}_description`);
        });

        let traitGetAttrs = [];
        traitIds.forEach(id => {
            traitGetAttrs.push(`repeating_trait_${id}_trait`);
        });

        let psionictalentGetAttrs = [];
        psionictalentIds.forEach(id => {
            psionictalentGetAttrs.push(`repeating_psionictalent_${id}_name`, `repeating_psionictalent_${id}_duration`, `repeating_psionictalent_${id}_range`, `repeating_psionictalent_${id}_resist`, `repeating_psionictalent_${id}_cost`, `repeating_psionictalent_${id}_area`, `repeating_psionictalent_${id}_damage`, `repeating_psionictalent_${id}_description`);
        });

        let disciplineGetAttrs = [];
        disciplineIds.forEach(id => {
            disciplineGetAttrs.push(`repeating_discipline_${id}_name`, `repeating_discipline_${id}_fumbled`, `repeating_discipline_${id}_trained`, `repeating_discipline_${id}_temp`, `repeating_discipline_${id}_penalty`, `repeating_discipline_${id}_experience`, `repeating_discipline_${id}_other`, `repeating_discipline_${id}_total`, `repeating_discipline_${id}_notes`);
        });

        let artificespellGetAttrs = [];
        artificespellIds.forEach(id => {
            artificespellGetAttrs.push(`repeating_artificespell_${id}_name`, `repeating_artificespell_${id}_description`, `repeating_artificespell_${id}_memorized`);
        });

        let alchemicalformulaGetAttrs = [];
        alchemicalformulaIds.forEach(id => {
            alchemicalformulaGetAttrs.push(`repeating_alchemicalformula_${id}_name`, `repeating_alchemicalformula_${id}_description`, `repeating_alchemicalformula_${id}_formulatype`, `repeating_alchemicalformula_${id}_duration`, `repeating_alchemicalformula_${id}_resist`);
        });

        let alchemicaltraditionGetAttrs = [];
        alchemicaltraditionIds.forEach(id => {
            alchemicaltraditionGetAttrs.push(`repeating_alchemicaltradition_${id}_name`, `repeating_alchemicaltradition_${id}_fumbled`, `repeating_alchemicaltradition_${id}_trained`, `repeating_alchemicaltradition_${id}_temp`, `repeating_alchemicaltradition_${id}_penalty`, `repeating_alchemicaltradition_${id}_experience`, `repeating_alchemicaltradition_${id}_other`, `repeating_alchemicaltradition_${id}_total`, `repeating_alchemicaltradition_${id}_notes`);
        });

        let faepowerGetAttrs = [];
        faepowerIds.forEach(id => {
            faepowerGetAttrs.push(`repeating_faepower_${id}_name`, `repeating_faepower_${id}_duration`, `repeating_faepower_${id}_range`, `repeating_faepower_${id}_resist`, `repeating_faepower_${id}_cost`, `repeating_faepower_${id}_description`);
        });

        let superpowerGetAttrs = [];
        superpowerIds.forEach(id => {
            superpowerGetAttrs.push(`repeating_superpower_${id}_name`, `repeating_superpower_${id}_activation`, `repeating_superpower_${id}_description`);
        });

        let superpowerboostGetAttrs = [];
        superpowerboostIds.forEach(id => {
            superpowerboostGetAttrs.push(`repeating_superpowerboost_${id}_name`, `repeating_superpowerboost_${id}_cost`, `repeating_superpowerboost_${id}_description`);
        });

        let superpowerlimitGetAttrs = [];
        superpowerlimitIds.forEach(id => {
            superpowerlimitGetAttrs.push(`repeating_superpowerlimit_${id}_description`, );
        });

        let divinemagicrank1spellGetAttrs = [];
        divinemagicrank1spellIds.forEach(id => {
            divinemagicrank1spellGetAttrs.push(`repeating_divinemagicrank1spell_${id}_name`, `repeating_divinemagicrank1spell_${id}_description`, `repeating_divinemagicrank1spell_${id}_reversible`, `repeating_divinemagicrank1spell_${id}_mp_cost`, `repeating_divinemagicrank1spell_${id}_xp_cost`, `repeating_divinemagicrank1spell_${id}_area`, `repeating_divinemagicrank1spell_${id}_time`, `repeating_divinemagicrank1spell_${id}_time_unit`, `repeating_divinemagicrank1spell_${id}_duration`, `repeating_divinemagicrank1spell_${id}_range`, `repeating_divinemagicrank1spell_${id}_resist`, `repeating_divinemagicrank1spell_${id}_school`, `repeating_divinemagicrank1spell_${id}_memorized`);
        });
        let divinemagicrank2spellGetAttrs = [];
        divinemagicrank2spellIds.forEach(id => {
            divinemagicrank2spellGetAttrs.push(`repeating_divinemagicrank2spell_${id}_name`, `repeating_divinemagicrank2spell_${id}_description`, `repeating_divinemagicrank2spell_${id}_reversible`, `repeating_divinemagicrank2spell_${id}_mp_cost`, `repeating_divinemagicrank2spell_${id}_xp_cost`, `repeating_divinemagicrank2spell_${id}_area`, `repeating_divinemagicrank2spell_${id}_time`, `repeating_divinemagicrank2spell_${id}_time_unit`, `repeating_divinemagicrank2spell_${id}_duration`, `repeating_divinemagicrank2spell_${id}_range`, `repeating_divinemagicrank2spell_${id}_resist`, `repeating_divinemagicrank2spell_${id}_school`, `repeating_divinemagicrank2spell_${id}_memorized`);
        });
        let divinemagicrank3spellGetAttrs = [];
        divinemagicrank3spellIds.forEach(id => {
            divinemagicrank3spellGetAttrs.push(`repeating_divinemagicrank3spell_${id}_name`, `repeating_divinemagicrank3spell_${id}_description`, `repeating_divinemagicrank3spell_${id}_reversible`, `repeating_divinemagicrank3spell_${id}_mp_cost`, `repeating_divinemagicrank3spell_${id}_xp_cost`, `repeating_divinemagicrank3spell_${id}_area`, `repeating_divinemagicrank3spell_${id}_time`, `repeating_divinemagicrank3spell_${id}_time_unit`, `repeating_divinemagicrank3spell_${id}_duration`, `repeating_divinemagicrank3spell_${id}_range`, `repeating_divinemagicrank3spell_${id}_resist`, `repeating_divinemagicrank3spell_${id}_school`, `repeating_divinemagicrank3spell_${id}_memorized`);
        });
        let divinemagicrank4spellGetAttrs = [];
        divinemagicrank4spellIds.forEach(id => {
            divinemagicrank4spellGetAttrs.push(`repeating_divinemagicrank4spell_${id}_name`, `repeating_divinemagicrank4spell_${id}_description`, `repeating_divinemagicrank4spell_${id}_reversible`, `repeating_divinemagicrank4spell_${id}_mp_cost`, `repeating_divinemagicrank4spell_${id}_xp_cost`, `repeating_divinemagicrank4spell_${id}_area`, `repeating_divinemagicrank4spell_${id}_time`, `repeating_divinemagicrank4spell_${id}_time_unit`, `repeating_divinemagicrank4spell_${id}_duration`, `repeating_divinemagicrank4spell_${id}_range`, `repeating_divinemagicrank4spell_${id}_resist`, `repeating_divinemagicrank4spell_${id}_school`, `repeating_divinemagicrank4spell_${id}_memorized`);
        });
        let divinemagicrank5spellGetAttrs = [];
        divinemagicrank5spellIds.forEach(id => {
            divinemagicrank5spellGetAttrs.push(`repeating_divinemagicrank5spell_${id}_name`, `repeating_divinemagicrank5spell_${id}_description`, `repeating_divinemagicrank5spell_${id}_reversible`, `repeating_divinemagicrank5spell_${id}_mp_cost`, `repeating_divinemagicrank5spell_${id}_xp_cost`, `repeating_divinemagicrank5spell_${id}_area`, `repeating_divinemagicrank5spell_${id}_time`, `repeating_divinemagicrank5spell_${id}_time_unit`, `repeating_divinemagicrank5spell_${id}_duration`, `repeating_divinemagicrank5spell_${id}_range`, `repeating_divinemagicrank5spell_${id}_resist`, `repeating_divinemagicrank5spell_${id}_school`, `repeating_divinemagicrank5spell_${id}_memorized`);
        });
        let arcanemagicrank0spellGetAttrs = [];
        arcanemagicrank0spellIds.forEach(id => {
            arcanemagicrank0spellGetAttrs.push(`repeating_arcanemagicrank0spell_${id}_name`, `repeating_arcanemagicrank0spell_${id}_description`, `repeating_arcanemagicrank0spell_${id}_reversible`, `repeating_arcanemagicrank0spell_${id}_cost`, `repeating_arcanemagicrank0spell_${id}_area`, `repeating_arcanemagicrank0spell_${id}_time`, `repeating_arcanemagicrank0spell_${id}_duration`, `repeating_arcanemagicrank0spell_${id}_range`, `repeating_arcanemagicrank0spell_${id}_resist`);
        });
        let arcanemagicrank1spellGetAttrs = [];
        arcanemagicrank1spellIds.forEach(id => {
            arcanemagicrank1spellGetAttrs.push(`repeating_arcanemagicrank1spell_${id}_name`, `repeating_arcanemagicrank1spell_${id}_description`, `repeating_arcanemagicrank1spell_${id}_reversible`, `repeating_arcanemagicrank1spell_${id}_mp_cost`, `repeating_arcanemagicrank1spell_${id}_xp_cost`, `repeating_arcanemagicrank1spell_${id}_area`, `repeating_arcanemagicrank1spell_${id}_time`, `repeating_arcanemagicrank1spell_${id}_time_unit`, `repeating_arcanemagicrank1spell_${id}_duration`, `repeating_arcanemagicrank1spell_${id}_range`, `repeating_arcanemagicrank1spell_${id}_resist`, `repeating_arcanemagicrank1spell_${id}_school`, `repeating_arcanemagicrank1spell_${id}_memorized`);
        });
        let arcanemagicrank2spellGetAttrs = [];
        arcanemagicrank2spellIds.forEach(id => {
            arcanemagicrank2spellGetAttrs.push(`repeating_arcanemagicrank2spell_${id}_name`, `repeating_arcanemagicrank2spell_${id}_description`, `repeating_arcanemagicrank2spell_${id}_reversible`, `repeating_arcanemagicrank2spell_${id}_mp_cost`, `repeating_arcanemagicrank2spell_${id}_xp_cost`, `repeating_arcanemagicrank2spell_${id}_area`, `repeating_arcanemagicrank2spell_${id}_time`, `repeating_arcanemagicrank2spell_${id}_time_unit`, `repeating_arcanemagicrank2spell_${id}_duration`, `repeating_arcanemagicrank2spell_${id}_range`, `repeating_arcanemagicrank2spell_${id}_resist`, `repeating_arcanemagicrank2spell_${id}_school`, `repeating_arcanemagicrank2spell_${id}_memorized`);
        });
        let arcanemagicrank3spellGetAttrs = [];
        arcanemagicrank3spellIds.forEach(id => {
            arcanemagicrank3spellGetAttrs.push(`repeating_arcanemagicrank3spell_${id}_name`, `repeating_arcanemagicrank3spell_${id}_description`, `repeating_arcanemagicrank3spell_${id}_reversible`, `repeating_arcanemagicrank3spell_${id}_mp_cost`, `repeating_arcanemagicrank3spell_${id}_xp_cost`, `repeating_arcanemagicrank3spell_${id}_area`, `repeating_arcanemagicrank3spell_${id}_time`, `repeating_arcanemagicrank3spell_${id}_time_unit`, `repeating_arcanemagicrank3spell_${id}_duration`, `repeating_arcanemagicrank3spell_${id}_range`, `repeating_arcanemagicrank3spell_${id}_resist`, `repeating_arcanemagicrank3spell_${id}_school`, `repeating_arcanemagicrank3spell_${id}_memorized`);
        });
        let arcanemagicrank4spellGetAttrs = [];
        arcanemagicrank4spellIds.forEach(id => {
            arcanemagicrank4spellGetAttrs.push(`repeating_arcanemagicrank4spell_${id}_name`, `repeating_arcanemagicrank4spell_${id}_description`, `repeating_arcanemagicrank4spell_${id}_reversible`, `repeating_arcanemagicrank4spell_${id}_mp_cost`, `repeating_arcanemagicrank4spell_${id}_xp_cost`, `repeating_arcanemagicrank4spell_${id}_area`, `repeating_arcanemagicrank4spell_${id}_time`, `repeating_arcanemagicrank4spell_${id}_time_unit`, `repeating_arcanemagicrank4spell_${id}_duration`, `repeating_arcanemagicrank4spell_${id}_range`, `repeating_arcanemagicrank4spell_${id}_resist`, `repeating_arcanemagicrank4spell_${id}_school`, `repeating_arcanemagicrank4spell_${id}_memorized`);
        });
        let arcanemagicrank5spellGetAttrs = [];
        arcanemagicrank5spellIds.forEach(id => {
            arcanemagicrank5spellGetAttrs.push(`repeating_arcanemagicrank5spell_${id}_name`, `repeating_arcanemagicrank5spell_${id}_description`, `repeating_arcanemagicrank5spell_${id}_reversible`, `repeating_arcanemagicrank5spell_${id}_mp_cost`, `repeating_arcanemagicrank5spell_${id}_xp_cost`, `repeating_arcanemagicrank5spell_${id}_area`, `repeating_arcanemagicrank5spell_${id}_time`, `repeating_arcanemagicrank5spell_${id}_time_unit`, `repeating_arcanemagicrank5spell_${id}_duration`, `repeating_arcanemagicrank5spell_${id}_range`, `repeating_arcanemagicrank5spell_${id}_resist`, `repeating_arcanemagicrank5spell_${id}_school`, `repeating_arcanemagicrank5spell_${id}_memorized`);
        });

        let psionicPowerGetAttrs = [];
        psionicPowerIds.forEach(id => {
            psionicPowerGetAttrs.push(`repeating_psionicpower_${id}_name`, `repeating_psionicpower_${id}_fumbled`, `repeating_psionicpower_${id}_trained`, `repeating_psionicpower_${id}_temp`, `repeating_psionicpower_${id}_penalty`, `repeating_psionicpower_${id}_other`, `repeating_psionicpower_${id}_experience`, `repeating_psionicpower_${id}_total`, `repeating_psionicpower_${id}_description`);
        });

        let magicSpellGetAttrs = [];
        magicSpellIds.forEach(id => {
            magicSpellGetAttrs.push(`repeating_magicspell_${id}_name`, `repeating_magicspell_${id}_fumbled`, `repeating_magicspell_${id}_trained`, `repeating_magicspell_${id}_temp`, `repeating_magicspell_${id}_penalty`, `repeating_magicspell_${id}_other`, `repeating_magicspell_${id}_experience`, `repeating_magicspell_${id}_total`, `repeating_magicspell_${id}_description`, `repeating_magicspell_${id}_cost`, `repeating_magicspell_${id}_range`, `repeating_magicspell_${id}_duration`);
        });
    
        let combatStyleGetAttrs = [];
        combatStyleIds.forEach(combatStyleId => {
            combatStyleGetAttrs.push(`repeating_combatstyle_${combatStyleId}_total`, `repeating_combatstyle_${combatStyleId}_penalty`, `repeating_combatstyle_${combatStyleId}_temp`, `repeating_combatstyle_${combatStyleId}_traits`, `repeating_combatstyle_${combatStyleId}_weapons`, `repeating_combatstyle_${combatStyleId}_notes`);
        });

        let languageGetAttrs = [];
        languageIds.forEach(languageId => {
            languageGetAttrs.push(`repeating_language_${languageId}_name`, `repeating_language_${languageId}_fumbled`, `repeating_language_${languageId}_trained`, `repeating_language_${languageId}_temp`, `repeating_language_${languageId}_penalty`, `repeating_language_${languageId}_experience`, `repeating_language_${languageId}_other`, `repeating_language_${languageId}_total`, `repeating_language_${languageId}_notes`);
        });

        let affiliationGetAttrs = [];
        affiliationIds.forEach(affiliationId => {
            affiliationGetAttrs.push(`repeating_affiliation_${affiliationId}_temp`, `repeating_affiliation_${affiliationId}_experience`, `repeating_affiliation_${affiliationId}_other`, `repeating_affiliation_${affiliationId}_penalty`, `repeating_affiliation_${affiliationId}_total`);
        });

        let professionalSkillGetAttrs = [];
        professionalSkillIds.forEach(professionalSkillId => {
            professionalSkillGetAttrs.push(`repeating_professionalskill_${professionalSkillId}_temp`, `repeating_professionalskill_${professionalSkillId}_penalty`, `repeating_professionalskill_${professionalSkillId}_experience`,`repeating_professionalskill_${professionalSkillId}_other`, `repeating_professionalskill_${professionalSkillId}_total`);
        });

        let passionGetAttrs = [];
        passionIds.forEach(id => {
            passionGetAttrs.push(`repeating_passion_${id}_temp`, `repeating_passion_${id}_penalty`, `repeating_passion_${id}_total`);
        });

        let dependencyGetAttrs = [];
        dependencyIds.forEach(id => {
            dependencyGetAttrs.push(`repeating_dependency_${id}_temp`, `repeating_dependency_${id}_penalty`, `repeating_dependency_${id}_total`);
        });

        let peculiarityGetAttrs = [];
        peculiarityIds.forEach(id => {
            peculiarityGetAttrs.push(`repeating_peculiarity_${id}_temp`, `repeating_peculiarity_${id}_penalty`, `repeating_peculiarity_${id}_total`);
        });

        const v2ShapingComponents = ['duration_component', 'magnitude_component', 'range_component', 'targets_component', 'ablation_component', 'focus_component', 'fortune_component', 'precision_component', 'swiftness_subquery'];

        const v2StandardSkillIds = ['athletics', 'boating', 'brawn', 'conceal', 'customs', 'dance', 'deceit', 'drive', 'endurance', 'evade', 'first_aid', 'home_parallel', 'influence', 'insight', 'locale', 'native_tongue', 'perception', 'ride', 'sing', 'status', 'stealth', 'superstition', 'swim', 'unarmed', 'willpower'];
        let staticSkillGetAttrs = [];
        v2StandardSkillIds.forEach(id => {
            staticSkillGetAttrs.push(`${id}_temp`, `${id}_penalty`, `${id}_experience`, `${id}_other`, `${id}`);
        });
        staticSkillGetAttrs.push(`linguistics_fumbled`, `linguistics_trained`, `linguistics_temp`, `linguistics_penalty`, `linguistics_experience`, `linguistics_other`, `linguistics`, `linguistics_notes`, "known_languages");

        /* Magic skill fetch attrs */
        const v2StaticMagicSkillIds = ['folk_magic', 'trance', 'binding', 'meditation', 'shaping', 'exhort', 'cursing', 'divination', 'necromancy', 'pharmacy', 'shape_shifting', 'theology', 'arcane_knowledge', 'arcane_casting', 'channel', 'piety', 'fata', 'artifice', 'gnosis', 'craft_alchemy'];
        let staticMagicSkillGetAttrs = [];
        v2StaticMagicSkillIds.forEach(id => {
            staticMagicSkillGetAttrs.push(`${id}_fumbled`, `${id}_trained`, `${id}_temp`, `${id}_penalty`, `${id}_experience`, `${id}_other`, `${id}`, `${id}_notes`);
        });
        let folkSpellGetAttrs = [];
        folkSpellIds.forEach(id => {
            folkSpellGetAttrs.push(`repeating_folkspell_${id}_name`, `repeating_folkspell_${id}_description`, `repeating_folkspell_${id}_concentration`, `repeating_folkspell_${id}_resist`, `repeating_folkspell_${id}_duration`, `repeating_folkspell_${id}_range`);
        });

        let pathGetAttrs = [];
        pathIds.forEach(id => {
            pathGetAttrs.push(`repeating_path_${id}_name`, `repeating_path_${id}_fumbled`, `repeating_path_${id}_trained`, `repeating_path_${id}_temp`, `repeating_path_${id}_penalty`, `repeating_path_${id}_experience`, `repeating_path_${id}_other`, `repeating_path_${id}_total`, `repeating_path_${id}_notes`);
        });
        let practicedTalentGetAttrs = [];
        practicedTalentIds.forEach(id => {
            practicedTalentGetAttrs.push(`repeating_practicedtalent_${id}_name`, `repeating_practicedtalent_${id}_description`);
        });

        let invocationGetAttrs = [];
        invocationIds.forEach(id => {
            invocationGetAttrs.push(`repeating_invocation_${id}_name`, `repeating_invocation_${id}_fumbled`, `repeating_invocation_${id}_trained`, `repeating_invocation_${id}_temp`, `repeating_invocation_${id}_penalty`, `repeating_invocation_${id}_experience`, `repeating_invocation_${id}_other`, `repeating_invocation_${id}_total`, `repeating_invocation_${id}_notes`);
        });
        let sorcerySpellGetAttrs = [];
        sorcerySpellIds.forEach(id => {
            sorcerySpellGetAttrs.push(`repeating_sorceryspell_${id}_memorized`, `repeating_sorceryspell_${id}_name`, `repeating_sorceryspell_${id}_description`, `repeating_sorceryspell_${id}_concentration`, `repeating_sorceryspell_${id}_resist`);
        });

        let devotionGetAttrs = [];
        devotionIds.forEach(id => {
            devotionGetAttrs.push(`repeating_devotion_${id}_name`, `repeating_devotion_${id}_fumbled`, `repeating_devotion_${id}_trained`, `repeating_devotion_${id}_temp`, `repeating_devotion_${id}_penalty`, `repeating_devotion_${id}_experience`, `repeating_devotion_${id}_other`, `repeating_devotion_${id}_total`, `repeating_devotion_${id}_notes`, `repeating_devotion_${id}_rank_devotion_pool_limit`, `repeating_devotion_${id}_devotional_pool`);
        });
        let miracleGetAttrs = [];
        miracleIds.forEach(id => {
            miracleGetAttrs.push(`repeating_miracle_${id}_name`, `repeating_miracle_${id}_description`, `repeating_miracle_${id}_miracle_rank`, `repeating_miracle_${id}_damage`, `repeating_miracle_${id}_resist`, `repeating_miracle_${id}_area`, `repeating_miracle_${id}_duration`, `repeating_miracle_${id}_range`);
        });

        let charGetAttrs = [];
        characteristicAttrs.forEach(char => {
            charGetAttrs.push(`${char}`, `${char}_temp`);
        });

        /* Fetch attrs */
        getAttrs(charGetAttrs.concat(hpGetAttrs, combatStyleGetAttrs, languageGetAttrs, staticSkillGetAttrs, affiliationGetAttrs,
            professionalSkillGetAttrs, passionGetAttrs, dependencyGetAttrs, peculiarityGetAttrs, staticMagicSkillGetAttrs,
            pathGetAttrs, invocationGetAttrs, devotionGetAttrs, practicedTalentGetAttrs, sorcerySpellGetAttrs, v2ShapingComponents,
            folkSpellGetAttrs, miracleGetAttrs, magicSpellGetAttrs, psionicPowerGetAttrs, arcanemagicrank0spellGetAttrs,
            arcanemagicrank1spellGetAttrs, arcanemagicrank2spellGetAttrs, arcanemagicrank3spellGetAttrs, arcanemagicrank4spellGetAttrs, arcanemagicrank5spellGetAttrs,
            divinemagicrank1spellGetAttrs, divinemagicrank2spellGetAttrs, divinemagicrank3spellGetAttrs, divinemagicrank4spellGetAttrs, divinemagicrank5spellGetAttrs,
            superpowerGetAttrs, superpowerboostGetAttrs, superpowerlimitGetAttrs, faepowerGetAttrs, alchemicaltraditionGetAttrs, alchemicalformulaGetAttrs,
            artificespellGetAttrs, psionictalentGetAttrs, disciplineGetAttrs, traitGetAttrs, worksongGetAttrs,
            ['spirit', 'action_points_other', 'action_points_add_one', 'notes', "location2_display", "income_day", "setting_option",
                "income_month", "income_season", "income_year", "type", "prana_points_temp", "prana_points", "prana_points_max",
                "prana_points_other", "power_points_temp", "power_points", "power_points_max", "power_points_other", "linguistics_enabled"
            ]), function (v) {
            let newAttrs = {'version': '3.0'};
            
            /* Set the ability system */
            if ((v['setting_option'] in campaginSettingDefaults) && ('ability_system' in campaginSettingDefaults[v['setting_option']])) {
                newAttrs['ability_system'] = campaginSettingDefaults[v['setting_option']]['ability_system'];
            } else {
                newAttrs['ability_system'] = campaginSettingDefaults['default']['ability_system'];
            }

            /* If a spirit set the attribute mode to spiritual and sheet type to spirit */
            if (v['spirit'] === '1') {
                newAttrs['sheet_type'] = 'spirit';
                newAttrs['attribute_mode'] = 'spiritual'; /* init and ap will already be spirit calc so no need to force it */
                newAttrs['hit_location_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_low_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_high_roll'] = '@{none_hit_location_roll}';
            }

            /* Convert Characteristics base values */
            characteristicAttrs.forEach(char => {
                const charCurr = parseInt(v[`${char}`]) || 0;
                const charTemp = parseInt(v[`${char}_temp`]) || 0;
                newAttrs[`${char}_base`] = charCurr - charTemp;
            });

            /* Convert action_points_add_one to just +1 in other */
            if (v['action_points_add_one'] === '1') {
                const actionPointsOther = parseInt(v['action_points_other']) || 0;
                newAttrs['action_points_other'] = actionPointsOther + 1;
            }

            /* Relabel magic points to magic points */
            if (v['setting_option'] === 'luther_arkwright') {
                newAttrs['magic_points_other'] = parseInt(v['prana_points_other']) || 0 ;
                newAttrs['magic_points_temp'] = parseInt(v['prana_points_temp']) || 0;
                newAttrs['magic_points'] = parseInt(v['prana_points']) || 0;
                newAttrs['magic_points_max'] = parseInt(v['prana_points_max']) || 0;
            } else if (v['setting_option'] === 'm-space' || v['setting_option'] === 'agony_and_ecstasy') {
                newAttrs['magic_points_other'] = parseInt(v['power_points_other']) || 0;
                newAttrs['magic_points_temp'] = parseInt(v['power_points_temp']) || 0;
                newAttrs['magic_points'] = parseInt(v['power_points']) || 0;
                newAttrs['magic_points_max'] = parseInt(v['power_points_max']) || 0;
            }

            /* Convert Hit Locations Display*/
            if (v['location2_display'] === '1') {
                newAttrs['location2to7_display'] = '1';
            }
            /* Convert HP for simplified combat */
            let newHpAttrs = {}
            if (v['simplified_combat_enabled'] === '1') {
                newHpAttrs = {
                    ...hitLocationTable['simplified'],
                    ...calcLocationHP('1', {...v, ...hitLocationTable['simplified']})
                };
            }

            /* Move style traits/weapons into notes value */
            combatStyleIds.forEach(combatStyleId => {
                const total = parseInt(v[`repeating_combatstyle_${combatStyleId}_total`]) || 0;
                const aug = parseInt(v[`repeating_combatstyle_${combatStyleId}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_combatstyle_${combatStyleId}_penalty`]) || 0;
                newAttrs[`repeating_combatstyle_${combatStyleId}_total`] = total - penalty - aug;
                newAttrs[`repeating_combatstyle_${combatStyleId}_id`] = `repeating_combatstyle_${combatStyleId}`;
                let csTraits = !v[`repeating_combatstyle_${combatStyleId}_traits`] ? '' : v[`repeating_combatstyle_${combatStyleId}_traits`];
                let csWeapons = !v[`repeating_combatstyle_${combatStyleId}_weapons`] ? '' : v[`repeating_combatstyle_${combatStyleId}_weapons`];
                if (csTraits !== '' && csWeapons !== '') {
                    newAttrs[`repeating_combatstyle_${combatStyleId}_notes`] =
                        getTranslationByKey('traits') + ": " + v[`repeating_combatstyle_${combatStyleId}_traits`] + "\r\n" +
                        getTranslationByKey('weapons') + ": " + v[`repeating_combatstyle_${combatStyleId}_weapons`] + "\r\n" +
                        v[`repeating_combatstyle_${combatStyleId}_notes`];
                } else if (csTraits !== '' && csWeapons === '') {
                    newAttrs[`repeating_combatstyle_${combatStyleId}_notes`] = getTranslationByKey('traits') + ": " + v[`repeating_combatstyle_${combatStyleId}_traits`] + "\r\n" + v[`repeating_combatstyle_${combatStyleId}_notes`];
                } else if (csTraits === '' && csWeapons !== '') {
                    newAttrs[`repeating_combatstyle_${combatStyleId}_notes`] = getTranslationByKey('weapons') + ": " + v[`repeating_combatstyle_${combatStyleId}_weapons`] + "\r\n" + v[`repeating_combatstyle_${combatStyleId}_notes`];
                }
            });

            /* Move languages to professional skills */
            if (debug) {console.log("Converting languages");}
            if (v['linguistics_enabled'] === "1" && v['linguistics'] !== "0") {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                newAttrs = {...newAttrs, ...convertSkillToProSkill('linguistics', '@{int}', '@{cha}', skillId, v)};
                newAttrs[`${skillId}_notes`] = !v['known_languages'] ? '' : v['known_languages'];
            } else {
                languageIds.forEach(languageId => {
                    const skillId = 'repeating_professionalskill_' + generateRowID();
                    newAttrs = {...newAttrs, ...convertSkillToProSkill(`repeating_language_${languageId}`, '@{int}', '@{cha}', skillId, v)};
                });
            }

            /* Migration affiliations */
            if (debug) {console.log("Converting Affiliations");}
            affiliationIds.forEach(affiliationId => {
                newAttrs = {...newAttrs, ...convertSkillToV3(`repeating_affiliation_${affiliationId}`, v)};
            });

            /* Migration proSkills */
            if (debug) {console.log("Converting Professional Skills");}
            professionalSkillIds.forEach(id => {
                newAttrs = {...newAttrs, ...convertSkillToV3(`repeating_professionalskill_${id}`, v)};
            });

            /* Migration passions */
            if (debug) {console.log("Converting passions");}
            passionIds.forEach(id => {
                newAttrs = {...newAttrs, ...convertPassionToV3(`repeating_passion_${id}`, v)};
            });

            /* Migration dependencies */
            if (debug) {console.log("Converting dependencies");}
            dependencyIds.forEach(id => {
                newAttrs = {...newAttrs, ...convertPassionToV3(`repeating_dependency_${id}`, v)};
            });

            /* Migration peculiarity */
            if (debug) {console.log("Converting peculiatities");}
            peculiarityIds.forEach(id => {
                newAttrs = {...newAttrs, ...convertPassionToV3(`repeating_peculiarity_${id}`, v)};
            });

            /* Convert standard skill values */
            if (debug) {console.log("Converting standard skills");}
            v2StandardSkillIds.forEach(id => {
                newAttrs = {...newAttrs, ...convertSkillToV3(id, v)};
            });

            /* Magic skills conversion */
            /* Folk Magic */
            if (debug) {console.log("Converting Folk Magic");}
            if (debug) {console.log("Converting Folk Magic Skill");}
            const folkMagicId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('folk_magic', '@{pow}', '@{cha}', folkMagicId, v)};
            if (debug) {console.log("Converting Folk Magic Tradition");}
            if (v['folk_magic'] && v['folk_magic'] !== '0') {
                newAttrs = {...newAttrs, ...createNewTradition(getTranslationByKey('folk_magic'), folkMagicId, null)};
            }
            if (debug) {console.log("Converting Folk Magic Spells");}
            folkSpellIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_folkspell_${id}_name`] ? '' : v[`repeating_folkspell_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'folk_magic';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';
                let traits = [];
                if (v[`repeating_folkspell_${id}_concentration`] === "1") {
                    traits.push(getTranslationByKey('concentration'));
                }
                switch(v[`repeating_folkspell_${id}_resist`]) {
                    case "^{brawn-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('brawn') + ')'); break;
                    case "^{endurance-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('endurance') + ')'); break;
                    case "^{evade-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('evade') + ')'); break;
                    case "^{willpower-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('willpower') + ')'); break;
                    case "^{special-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('special') + ')'); break;
                }
                switch(v[`repeating_folkspell_${id}_duration`]) {
                    case "^{instant-u}": traits.push(getTranslationByKey('instant')); break;
                    case "^{special-u}": traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('special') + ')'); break;
                }
                switch(v[`repeating_folkspell_${id}_range`]) {
                    case "^{touch-u}": traits.push(getTranslationByKey('touch')); break;
                    case "^{special-u}": traits.push(getTranslationByKey('range') + '(' + getTranslationByKey('special') + ')'); break;
                    default: traits.push(getTranslationByKey('ranged'));
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_description`] = !v[`repeating_folkspell_${id}_description`] ? '' : v[`repeating_folkspell_${id}_description`];
            });

            /* Work Songs */
            worksongIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_worksong_${id}_name`] ? '' : v[`repeating_worksong_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'work_song';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';
                newAttrs[`${abilityId}_description`] = !v[`repeating_worksong_${id}_description`] ? '' : v[`repeating_worksong_${id}_description`];
            });
            
            /* Animism */
            if (debug) {console.log("Converting Animism");}
            const tranceId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('trance', '@{con}', '@{pow}', tranceId, v)};
            const bindingId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('binding', '@{pow}', '@{cha}', bindingId, v)};

            if ((v['trance'] && v['trance'] !== '0') && (v['binding'] && v['binding'] !== '0')) {
                newAttrs = {...newAttrs, ...createNewTradition(getTranslationByKey('animism'), tranceId, bindingId)};
            }

            /* Mysticism */
            if (debug) {console.log("Converting Mysticism");}
            const meditationId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('meditation', '@{int}', '@{con}', meditationId, v)};

            pathIds.forEach(id => {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                newAttrs = {...newAttrs, ...convertSkillToProSkill(`repeating_path_${id}`, '@{pow}', '@{con}', skillId, v)};

                const pathName = !v[`repeating_path_${id}_name`] ? "0" : v[`repeating_path_${id}_name`];
                newAttrs = {...newAttrs, ...createNewTradition(pathName, meditationId, skillId)};
            });
            practicedTalentIds.forEach(id => {
                const talentId = "repeating_ability_" + generateRowID();
                newAttrs[`${talentId}_name`] = !v[`repeating_practicedtalent_${id}_name`] ? '' : v[`repeating_practicedtalent_${id}_name`];
                newAttrs[`${talentId}_id`] = talentId;
                newAttrs[`${talentId}_type`] = 'mysticism';
                newAttrs[`${talentId}_traited`] = '1';
                newAttrs[`${talentId}_details`] = '0';
                newAttrs[`${talentId}_advanced_traits`] = '^{intensity}: @{dynamic_intensity}';
                newAttrs[`${talentId}_description`] = !v[`repeating_practicedtalent_${id}_description`] ? '' : v[`repeating_practicedtalent_${id}_description`];
            });

            /* Sorcery */
            if (debug) {console.log("Converting Sorcery");}
            const shapingId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('shaping', '@{int}', '@{pow}', shapingId, v)};
            invocationIds.forEach(id => {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                newAttrs = {...newAttrs, ...convertSkillToProSkill(`repeating_invocation_${id}`, '@{int}', '@{int}', skillId, v)};

                const traditionName = !v[`repeating_invocation_${id}_name`] ? "0" : v[`repeating_invocation_${id}_name`];
                newAttrs = {...newAttrs, ...createNewTradition(traditionName, shapingId, skillId)};
            });

            let shaping_traits = ['^{combine}: @{shaped_combine}'];
            if (!v['duration_component'] || v['duration_component'] === '@{duration_standard_query}') {
                shaping_traits.push('^{duration}: @{shaped_duration}');
            }
            if (!v['magnitude_component'] || v['magnitude_component'] === '@{magnitude_query}') {
                shaping_traits.push('^{magnitude}: @{shaped_magnitude}');
            }
            if (!v['range_component'] || v['range_component'] === '@{range_query}') {
                shaping_traits.push('^{range}: @{shaped_range}');
            }
            if (!v['targets_component'] || v['targets_component'] === '@{targets_query}') {
                shaping_traits.push('^{targets}: @{shaped_targets}');
            }
            if (v['ablation_component'] === '@{ablation_query}') {
                shaping_traits.push('^{ablation}: @{shaped_ablation}');
            }
            if (v['focus_component'] === '@{focus_query}') {
                shaping_traits.push('^{focus}: @{shaped_focus}');
            }
            if (v['fortune_component'] === '@{fortune_query}') {
                shaping_traits.push('^{fortune}: @{shaped_fortune}');
            }
            if (v['precision_component'] === '@{precision_query}') {
                shaping_traits.push('^{precision}: @{shaped_precision}');
            }
            if (v['swiftness_subquery'] === '@{swiftness_query}') {
                shaping_traits.push('^{swiftness}: @{shaped_swiftness}');
            }
            newAttrs['shaping_traits'] = shaping_traits.join('\r\n');

            sorcerySpellIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_sorceryspell_${id}_name`] ? '' : v[`repeating_sorceryspell_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'sorcery';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';
                if (v[`repeating_sorceryspell_${id}_memorized`] !== "1") {
                    newAttrs[`${abilityId}_favored`] = "0";
                }
                let traits = [];
                if (v[`repeating_sorceryspell_${id}_concentration`] === "1") {
                    traits.push(getTranslationByKey('concentration'));
                }
                switch(v[`repeating_sorceryspell_${id}_resist`]) {
                    case "^{brawn-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('brawn') + ')'); break;
                    case "^{endurance-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('endurance') + ')'); break;
                    case "^{evade-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('evade') + ')'); break;
                    case "^{willpower-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('willpower') + ')'); break;
                    case "^{special-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('special') + ')'); break;
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_advanced_traits`] = '@{shaping_traits}';
                newAttrs[`${abilityId}_description`] = !v[`repeating_sorceryspell_${id}_description`] ? '' : v[`repeating_sorceryspell_${id}_description`];
            });

            /* Theism */
            if (debug) {console.log("Converting Theism");}
            const exhortId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('exhort', '@{int}', '@{cha}', exhortId, v)};
            devotionIds.forEach(id => {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                newAttrs = {...newAttrs, ...convertSkillToProSkill(`repeating_devotion_${id}`, '@{pow}', '@{cha}', skillId, v)};

                /* We don't use the creteNewTradition func here because of the devotion poolextras */
                const traditionId = "repeating_tradition_" + generateRowID();
                newAttrs[`${traditionId}_name`] = !v[`repeating_devotion_${id}_name`] ? "0" : v[`repeating_devotion_${id}_name`];
                newAttrs[`${traditionId}_id`] = traditionId;
                newAttrs[`${traditionId}_details`] = "0";
                newAttrs[`${traditionId}_skill1_id`] = exhortId;
                newAttrs[`${traditionId}_skill1_name`] = `@{${exhortId}_name}`;
                newAttrs[`${traditionId}_skill1_total`] = `@{${exhortId}_total}`;
                newAttrs[`${traditionId}_skill1_notes`] = `@{${exhortId}_notes}`;
                newAttrs[`${traditionId}_skill2_id`] = skillId;
                newAttrs[`${traditionId}_skill2_name`] = `@{${skillId}_name}`;
                newAttrs[`${traditionId}_skill2_total`] = `@{${skillId}_total}`;
                newAttrs[`${traditionId}_skill2_notes`] = `@{${skillId}_notes}`;
                newAttrs[`${traditionId}_pool_limit`] = !v[`repeating_devotion_${id}_rank_devotion_pool_limit`] ? "0" : v[`repeating_devotion_${id}_rank_devotion_pool_limit`];
                newAttrs[`${traditionId}_pool`] = !v[`repeating_devotion_${id}_devotional_pool`] ? "0" : v[`repeating_devotion_${id}_devotional_pool`];
                if (v[`repeating_devotion_${id}_rank_devotion_pool_limit`] === 'ceil(@{pow}*.25)') {
                    newAttrs[`${traditionId}_tradition_rank`] = 2;
                } else if (v[`repeating_devotion_${id}_rank_devotion_pool_limit`] === 'ceil(@{pow}*.5)') {
                    newAttrs[`${traditionId}_tradition_rank`] = 3;
                } else if (v[`repeating_devotion_${id}_rank_devotion_pool_limit`] === 'ceil(@{pow}*.75)') {
                    newAttrs[`${traditionId}_tradition_rank`] = 4;
                } else if (v[`repeating_devotion_${id}_rank_devotion_pool_limit`] === '@{pow}') {
                    newAttrs[`${traditionId}_tradition_rank`] = 5;
                }
            });
            miracleIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_miracle_${id}_name`] ? '' : v[`repeating_miracle_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'theism';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                let traits = [];
                if (!v[`repeating_miracle_${id}_miracle_rank`] || v[`repeating_miracle_${id}_miracle_rank`] === "1") {
                    traits.push(getTranslationByKey('rank') + '(' + getTranslationByKey('initiate') + ')');
                } else if (v[`repeating_miracle_${id}_miracle_rank`] === "2") {
                    traits.push(getTranslationByKey('rank') + '(' + getTranslationByKey('acolyte') + ')');
                } else if (v[`repeating_miracle_${id}_miracle_rank`] === "3") {
                    traits.push(getTranslationByKey('rank') + '(' + getTranslationByKey('priest') + ')');
                }
                switch(v[`repeating_miracle_${id}_resist`]) {
                    case "^{brawn-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('brawn') + ')'); break;
                    case "^{endurance-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('endurance') + ')'); break;
                    case "^{evade-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('evade') + ')'); break;
                    case "^{willpower-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('willpower') + ')'); break;
                    case "^{special-u}": traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('special') + ')'); break;
                }
                if (v[`repeating_miracle_${id}_damage`] && v[`repeating_miracle_${id}_damage`] !== "0") {
                    newAttrs[`${abilityId}_advanced_traits`] = '^{damage}: [' + v[`repeating_miracle_${id}_damage`] + '](`/r ' + v[`repeating_miracle_${id}_damage`] + ')';
                }
                switch(v[`repeating_miracle_${id}_area`]) {
                    case "[[@{intensity_magnitude}]] ^{metres-u}": traits.push(getTranslationByKey('area') + '(' + getTranslationByKey('meters') + ')'); break;
                    case "[[@{intensity_magnitude}]] ^{decametres-u}": traits.push(getTranslationByKey('area') + '(10 X ' + getTranslationByKey('meters') + ')'); break;
                    case "[[@{intensity_magnitude}]] ^{kilometres-u}": traits.push(getTranslationByKey('area') + '(' + getTranslationByKey('kilometers') + ')'); break;
                    case "^{special-u}": traits.push(getTranslationByKey('area') + '(' + getTranslationByKey('special') + ')'); break;
                }
                switch(v[`repeating_miracle_${id}_duration`]) {
                    case "^{instant-u}": traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('instant') + ')'); break;
                    case "[[@{intensity_magnitude}]] ^{minutes-u}": traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('minutes') + ')'); break;
                    case "[[@{intensity_magnitude}]] ^{hours-u}": traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('hours') + ')'); break;
                    case "[[@{intensity_magnitude}]] ^{days-u}": traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('days') + ')'); break;
                    case "[[@{intensity_magnitude}]] ^{months-u}": traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('months') + ')'); break;
                    case "^{special-u}": traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('special') + ')'); break;
                }
                switch(v[`repeating_miracle_${id}_range`]) {
                    case "^{touch-u}": traits.push(getTranslationByKey('range') + '(' + getTranslationByKey('touch') + ')'); break;
                    case "[[@{intensity_magnitude}]] ^{metres-u}": traits.push(getTranslationByKey('range') + '(' + getTranslationByKey('meters') + ')'); break;
                    case "[[@{intensity_magnitude}]] ^{decametres-u}": traits.push(getTranslationByKey('range') + '(10 X ' + getTranslationByKey('meters') + ')'); break;
                    case "^{special-u}": traits.push(getTranslationByKey('range') + '(' + getTranslationByKey('special') + ')'); break;
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_description`] = !v[`repeating_miracle_${id}_description`] ? '' : v[`repeating_miracle_${id}_description`];
            });

            /* M-Space psionics conversion */
            if (debug) {console.log("Converting M-Space Psionics");}
            psionicPowerIds.forEach(id => {
                const abilityId = 'repeating_skilledability_' + generateRowID();
                const total = parseInt(v[`repeating_psionicpower_${id}_total`]) || 0;
                const temp = parseInt(v[`repeating_psionicpower_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_psionicpower_${id}_temp`]) || 0;
                const xp = parseInt(v[`repeating_psionicpower_${id}_experience`]) || 0;
                const other = parseInt(v[`repeating_psionicpower_${id}_other`]) || 0;
                newAttrs[`${abilityId}_name`] = !v[`repeating_psionicpower_${id}_name`] ? '' : v[`repeating_psionicpower_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_details`] = '0';
                newAttrs[`${abilityId}_description`] = !v[`repeating_psionicpower_${id}_description`] ? '' : v[`repeating_psionicpower_${id}_description`];
                newAttrs[`${abilityId}_summary`] = !v[`repeating_psionicpower_${id}_description`] ? '' : v[`repeating_psionicpower_${id}_description`];
                newAttrs[`${abilityId}_fumbled`] = !v[`repeating_psionicpower_${id}_fumbled`] ? "0" : v[`repeating_psionicpower_${id}_fumbled`];
                newAttrs[`${abilityId}_trained`] = !v[`repeating_psionicpower_${id}_trained`] ? "0" : v[`repeating_psionicpower_${id}_trained`];
                newAttrs[`${abilityId}_char1`] = '@{pow}';
                newAttrs[`${abilityId}_char2`] = '@{pow}';
                newAttrs[`${abilityId}_other`] = xp + other;
                newAttrs[`${abilityId}_total`] = total - penalty - temp;
            });

            /* Odd Soot Magic Conversion */
            if (debug) {console.log("Converting Odd Soot Magic");}
            magicSpellIds.forEach(id => {
                const abilityId = 'repeating_skilledability_' + generateRowID();
                const total = parseInt(v[`repeating_magicspell_${id}_total`]) || 0;
                const temp = parseInt(v[`repeating_magicspell_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_magicspell_${id}_temp`]) || 0;
                const xp = parseInt(v[`repeating_magicspell_${id}_experience`]) || 0;
                const other = parseInt(v[`repeating_magicspell_${id}_other`]) || 0;
                newAttrs[`${abilityId}_name`] = !v[`repeating_magicspell_${id}_name`] ? '' : v[`repeating_magicspell_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_details`] = '0';
                newAttrs[`${abilityId}_description`] = !v[`repeating_magicspell_${id}_description`] ? '' : v[`repeating_magicspell_${id}_description`];
                newAttrs[`${abilityId}_summary`] = !v[`repeating_magicspell_${id}_description`] ? '' : v[`repeating_magicspell_${id}_description`];
                newAttrs[`${abilityId}_fumbled`] = !v[`repeating_magicspell_${id}_fumbled`] ? "0" : v[`repeating_magicspell_${id}_fumbled`];
                newAttrs[`${abilityId}_trained`] = !v[`repeating_magicspell_${id}_trained`] ? "0" : v[`repeating_magicspell_${id}_trained`];
                newAttrs[`${abilityId}_char1`] = '@{pow}';
                newAttrs[`${abilityId}_char2`] = '@{pow}';
                newAttrs[`${abilityId}_other`] = xp + other;
                newAttrs[`${abilityId}_total`] = total - penalty - temp;
                let traits = [];
                if (v[`repeating_magicspell_${id}_cost`]) {
                    traits.push(getTranslationByKey("cost") + ": " + v[`repeating_magicspell_${id}_cost`]);
                }
                if (v[`repeating_magicspell_${id}_duration`]) {
                    traits.push(getTranslationByKey("duration") + ": " + v[`repeating_magicspell_${id}_duration`]);
                }
                if (v[`repeating_magicspell_${id}_range`]) {
                    traits.push(getTranslationByKey("range") + ": " + v[`repeating_magicspell_${id}_range`]);
                }
                newAttrs[`${abilityId}_traits`] = traits.join("\r\n");
            });

            /* Roman Magic skills */
            if (debug) {console.log("Converting Roman Magic");}
            const cursingId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('cursing', '@{pow}', '@{cha}', cursingId, v)};
            const divinationId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('divination', '@{pow}', '@{int}', divinationId, v)};
            const necromancyId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('necromancy', '@{int}', '@{cha}', necromancyId, v)};
            const pharmacyId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('pharmacy', '@{int}', '@{int}', pharmacyId, v)};
            const shiftingId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('shifting', '@{con}', '@{pow}', shiftingId, v)};
            const theologyId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('theology', '@{pow}', '@{pow}', theologyId, v)};

            /* Classic Fantasy Helper Functions */
            function convertClassicFantasyAbility(id, abilityRank, abilityType, v) {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`${id}_name`] ? '' : v[`${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = `${abilityType}_magic`;
                newAttrs[`${abilityId}_rank`] = abilityRank;
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';
                if (v[`${id}_memorized`] === "1") {
                    newAttrs[`${abilityId}_favored`] = '1';
                }

                let traits = [];
                if (v[`${id}_school`]) {
                    traits.push('(' + v[`${id}_school`] + ')');
                }
                if (v[`${id}_reversible`]) {
                    traits.push(getTranslationByKey('reversible'));
                }
                let cost = '';
                switch(v[`${id}_mp_cost`]) {
                    case `[[1+@{${abilityType}_rank_${abilityRank}_cost_reduction}]]`: cost = '1 ' + getTranslationByKey('magic_points-a'); break;
                    case `[[(1*?{Intensity|1})+@{${abilityType}_rank_${abilityRank}_cost_reduction}]]`: cost = '1/+1 ' + getTranslationByKey('magic_points-a'); break;
                    case `[[3+@{${abilityType}_rank_${abilityRank}_cost_reduction}]]`: cost = '3 ' + getTranslationByKey('magic_points-a'); break;
                    case `[[(3+(?{Intensity|1}-1))+@{${abilityType}_rank_${abilityRank}_cost_reduction}]]`: cost = '3/+1 ' + getTranslationByKey('magic_points-a'); break;
                    case `[[(3*?{Intensity|1})+@{${abilityType}_rank_${abilityRank}_cost_reduction}]]`: cost = '3/+3 ' + getTranslationByKey('magic_points-a'); break;
                    default: cost = '1';
                }
                const xpCost = parseInt(v[`${id}_xp_cost`]) || 0;
                if (xpCost !== 0) {cost = cost + ` + ${xpCost} ` + getTranslationByKey('experience-a');}
                traits.push(getTranslationByKey('cost') + ': ' + cost);
                if (v[`${id}_area`]) {
                    traits.push(getTranslationByKey('area') + ': ' + v[`${id}_area`]);
                }
                const time = parseInt(v[`${id}_time`]) || 1;
                if (v[`${id}_time_unit`]) {
                    traits.push(getTranslationByKey('casting_time') + ': ' + time + ' ' + v[`${id}_time_unit`]);
                } else {
                    traits.push(getTranslationByKey('casting_time') + ': ' + time + ' ' + getTranslationByKey('actions'));
                }
                if (v[`${id}_duration`]) {
                    traits.push(getTranslationByKey('duration') + ': ' + v[`${id}_duration`]);
                }
                if (v[`${id}_range`]) {
                    traits.push(getTranslationByKey('range') + ': ' + v[`${id}_range`]);
                }
                if (v[`${id}_resist`]) {
                    traits.push(getTranslationByKey('resist') + ': ' + v[`${id}_resist`]);
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_advanced_traits`] = '^{intensity}: @{dynamic_intensity}';
                newAttrs[`${abilityId}_description`] = !v[`${id}_description`] ? '' : v[`${id}_description`];
            }

            /* Arcane magic Conversion */
            if (debug) {console.log("Converting Arcane Magic");}
            const arcaneCastingId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('arcane_casting', '@{int}', '@{pow}', arcaneCastingId, v)};
            const arcaneKnowledgeId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('arcane_knowledge', '@{int}', '@{int}', arcaneKnowledgeId, v)};
            if ((v['arcane_casting'] && v['arcane_casting'] !== '0') && (v['arcane_knowledge'] && v['arcane_knowledge'] !== '0')) {
                newAttrs = {...newAttrs, ...createNewTradition(getTranslationByKey('arcane_magic'), arcaneCastingId, arcaneKnowledgeId)};
            }
            arcanemagicrank0spellIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_arcanemagicrank0spell_${id}_name`] ? '' : v[`repeating_arcanemagicrank0spell_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'arcane_magic';
                newAttrs[`${abilityId}_rank`] = '0';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                let traits = ['(' + getTranslationByKey('cantrip') + ')'];
                if (v[`repeating_arcanemagicrank0spell_${id}_reversible`]) {
                    traits.push(getTranslationByKey('reversible'));
                }
                traits.push(getTranslationByKey('cost') + ': 1');
                if (v[`repeating_arcanemagicrank0spell_${id}_area`]) {
                    traits.push(getTranslationByKey('area') + ': ' + v[`repeating_arcanemagicrank0spell_${id}_area`]);
                }
                traits.push(getTranslationByKey('casting_time') + ': 1 ' + getTranslationByKey('action'));
                if (v[`repeating_arcanemagicrank0spell_${id}_duration`]) {
                    traits.push(getTranslationByKey('duration') + ': ' + v[`repeating_arcanemagicrank0spell_${id}_duration`]);
                }
                if (v[`repeating_arcanemagicrank0spell_${id}_range`] === '^{touch-u}') {
                    traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('touch'));
                } else if (v[`repeating_arcanemagicrank0spell_${id}_range`] === '[[@{pow}*1.5]] ^{metres-u}') {
                    traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('pow-u') + ' X 1.5 ' + getTranslationByKey('meters'));
                }
                if (v[`repeating_arcanemagicrank0spell_${id}_resist`]) {
                    traits.push(getTranslationByKey('resist') + ': ' + v[`repeating_arcanemagicrank0spell_${id}_resist`]);
                }

                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_description`] = !v[`repeating_arcanemagicrank0spell_${id}_description`] ? '' : v[`repeating_arcanemagicrank0spell_${id}_description`];
            });
            arcanemagicrank1spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_arcanemagicrank1spell_${id}`, '1', 'arcane', v); });
            arcanemagicrank2spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_arcanemagicrank2spell_${id}`, '2', 'arcane', v); });
            arcanemagicrank3spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_arcanemagicrank3spell_${id}`, '3', 'arcane', v); });
            arcanemagicrank4spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_arcanemagicrank4spell_${id}`, '4', 'arcane', v); });
            arcanemagicrank5spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_arcanemagicrank5spell_${id}`, '5', 'arcane', v); });

            /* Divine magic Conversion */
            if (debug) {console.log("Converting Arcane Magic");}
            const channelId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('channel', '@{int}', '@{cha}', channelId, v)};
            const pietyId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('piety', '@{cha}', '@{pow}', pietyId, v)};
            if ((v['channel'] && v['channel'] !== '0') && (v['piety'] && v['piety'] !== '0')) {
                newAttrs = {...newAttrs, ...createNewTradition(getTranslationByKey('divine_magic'), channelId, pietyId)};
            }
            divinemagicrank1spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_divinemagicrank1spell_${id}`, '1', 'divine', v); });
            divinemagicrank2spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_divinemagicrank2spell_${id}`, '2', 'divine', v); });
            divinemagicrank3spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_divinemagicrank3spell_${id}`, '3', 'divine', v); });
            divinemagicrank4spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_divinemagicrank4spell_${id}`, '4', 'divine', v); });
            divinemagicrank5spellIds.forEach(id => { convertClassicFantasyAbility(`repeating_divinemagicrank5spell_${id}`, '5', 'divine', v); });

            /* Superpower conversions */
            if (debug) {console.log("Converting super powers");}
            superpowerIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_superpower_${id}_name`] ? '?' : v[`repeating_superpower_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'superpower';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                if (v[`repeating_superpower_${id}_activation`]) {
                    newAttrs[`${abilityId}_traits`] = getTranslationByKey('activation_cost') + ': ' + v[`repeating_superpower_${id}_activation`];
                    newAttrs[`${abilityId}_summary`] = getTranslationByKey('activation_cost') + ': ' + v[`repeating_superpower_${id}_activation`];
                }
                newAttrs[`${abilityId}_description`] = !v[`repeating_superpower_${id}_description`] ? '' : v[`repeating_superpower_${id}_description`];
            });
            if (debug) {console.log("Converting super power boosts");}
            superpowerboostIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_superpowerboost_${id}_name`] ? '?' : v[`repeating_superpowerboost_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'superpower';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                if (v[`repeating_superpowerboost_${id}_cost`]) {
                    newAttrs[`${abilityId}_traits`] = getTranslationByKey('cost') + ': ' + v[`repeating_superpowerboost_${id}_cost`];
                    newAttrs[`${abilityId}_summary`] = getTranslationByKey('cost') + ': ' + v[`repeating_superpowerboost_${id}_cost`];
                }
                newAttrs[`${abilityId}_description`] = !v[`repeating_superpowerboost_${id}_description`] ? '' : v[`repeating_superpowerboost_${id}_description`];
            });
            if (debug) {console.log("Converting limitation");}
            superpowerlimitIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = '?';
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'limitation';
                newAttrs[`${abilityId}_traited`] = '0';
                newAttrs[`${abilityId}_details`] = '0';
                newAttrs[`${abilityId}_summary`] = !v[`repeating_superpowerlimit_${id}_description`] ? '' : v[`repeating_superpowerlimit_${id}_description`];
                newAttrs[`${abilityId}_description`] = !v[`repeating_superpowerlimit_${id}_description`] ? '' : v[`repeating_superpowerlimit_${id}_description`];
            });

            /* Fae Powers Conversion */
            if (debug) {console.log("Converting Fae Powers");}
            const fataId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('fata', '@{pow}', '@{cha}', fataId, v)};
            if (v['fata'] && v['fata'] !== '0') {
                newAttrs = {...newAttrs, ...createNewTradition(getTranslationByKey('fae_powers'), fataId, null)};
            }
            faepowerIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_faepower_${id}_name`] ? '?' : v[`repeating_faepower_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'fae_power';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                let traits = [];
                switch(v[`repeating_faepower_${id}_range`]) {
                    case "^{touch-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('touch')); break;
                    case "[[@{pow}]] ^{metres-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('pow-u') + ' ' + getTranslationByKey('meters')); break;
                    case "[[(@{pow}*10)]] ^{metres-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('pow-u') + ' x 10 ' + getTranslationByKey('meters')); break;
                    case "^{special-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('special')); break;
                }
                switch(v[`repeating_faepower_${id}_duration`]) {
                    case "^{one-minute-u}": traits.push(getTranslationByKey('duration') + ': 1 ' + getTranslationByKey('minute')); break;
                    case "[[@{fata_intensity}]] ^{minutes-u}": traits.push(getTranslationByKey('duration') + ': ' + getTranslationByKey('intensity') + ' x ' + getTranslationByKey('minutes')); break;
                    case "[[@{fata_intensity}*5]] ^{minutes-u}": traits.push(getTranslationByKey('duration') + ': ' + getTranslationByKey('intensity') + ' x 5 ' + getTranslationByKey('minutes')); break;
                    case "[[@{fata_intensity}*10]] ^{minutes-u}": traits.push(getTranslationByKey('duration') + ': ' + getTranslationByKey('intensity') + ' x 10 ' + getTranslationByKey('minutes')); break;
                    case "[[@{fata_intensity}]] ^{hours-u}": traits.push(getTranslationByKey('duration') + ': ' + getTranslationByKey('intensity') + ' x ' + getTranslationByKey('hours')); break;
                    case "^{special-u}": traits.push(getTranslationByKey('duration') + ': ' + getTranslationByKey('special')); break;
                }
                if (v[`repeating_faepower_${id}_cost`]) {
                    traits.push(getTranslationByKey('cost') + ': ' + v[`repeating_miracle_${id}_cost`]);
                } else {
                    traits.push(getTranslationByKey('cost') + ': 1 ' + getTranslationByKey('magic_point'));
                }
                switch(v[`repeating_faepower_${id}_resist`]) {
                    case "^{brawn-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('brawn')); break;
                    case "^{endurance-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('endurance')); break;
                    case "^{evade-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('evade')); break;
                    case "^{willpower-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('willpower')); break;
                    case "^{special-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('special')); break;
                    default: traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('none'));
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_description`] = !v[`repeating_faepower_${id}_description`] ? '' : v[`repeating_faepower_${id}_description`];
            });

            /* Alchemy conversion */
            if (debug) {console.log("Converting Alchemy");}
            const craftAlchemyId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('craft_alchemy', '@{dex}', '@{int}', craftAlchemyId, v)};
            alchemicaltraditionIds.forEach(id => {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                newAttrs = {...newAttrs, ...convertSkillToProSkill(`repeating_alchemicaltradition_${id}`, '@{int}', '@{int}', skillId, v)};

                const traditionName = !v[`repeating_alchemicaltradition_${id}_name`] ? "?" : v[`repeating_alchemicaltradition_${id}_name`];
                newAttrs = {...newAttrs, ...createNewTradition(traditionName, craftAlchemyId, skillId)};
            });
            alchemicalformulaIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_alchemicalformula_${id}_name`] ? '?' : v[`repeating_alchemicalformula_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'alchemy';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                let traits = [];
                if (v[`repeating_alchemicalformula_${id}_formulatype`] === '.5') {
                    traits.push(getTranslationByKey('mundane'));
                }
                switch(v[`repeating_alchemicalformula_${id}_duration`]) {
                    case "^{instant-u}": traits.push(getTranslationByKey('duration') + ' (' + getTranslationByKey('instant') + ')'); break;
                    case "[[(@{intensity}*@{formulatype})]] ^{minutes-u}": traits.push(getTranslationByKey('duration') + ' (' + getTranslationByKey('minutes') + ')'); break;
                    case "[[(@{intensity}*@{formulatype})]] ^{hours-u}": traits.push(getTranslationByKey('duration') + ' (' + getTranslationByKey('hours') + ')'); break;
                    case "[[(@{intensity}*@{formulatype})]] ^{days-u}": traits.push(getTranslationByKey('duration') + ' (' + getTranslationByKey('days') + ')'); break;
                    case "[[(@{intensity}*@{formulatype})]] ^{months-u}": traits.push(getTranslationByKey('duration') + ' (' + getTranslationByKey('months') + ')'); break;
                    case "^{special-u}": traits.push(getTranslationByKey('duration') + ' (' + getTranslationByKey('special') + ')'); break;
                }
                switch(v[`repeating_alchemicalformula_${id}_resist`]) {
                    case "^{endurance-u}": traits.push(getTranslationByKey('resist') + ' (' + getTranslationByKey('endurance') + ')'); break;
                    case "^{willpower-u}": traits.push(getTranslationByKey('resist') + ' (' + getTranslationByKey('willpower') + ')'); break;
                    case "^{special-u}": traits.push(getTranslationByKey('resist') + ' (' + getTranslationByKey('special') + ')'); break;
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_description`] = !v[`repeating_alchemicalformula_${id}_description`] ? '' : v[`repeating_alchemicalformula_${id}_description`];
            });


            /* Artifice conversion */
            if (debug) {console.log("Converting Artifice");}
            const artificeId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('artifice', '@{int}', '@{dex}', artificeId, v)};
            const gnosisId = 'repeating_professionalskill_' + generateRowID();
            newAttrs = {...newAttrs, ...convertSkillToProSkill('gnosis', '@{int}', '@{pow}', gnosisId, v)};
            if (v['artifice'] && v['artifice'] !== '0') {
                newAttrs = {...newAttrs, ...createNewTradition(getTranslationByKey('artifice'), artificeId, gnosisId)};
            }
            artificespellIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_artificespell_${id}_name`] ? '?' : v[`repeating_artificespell_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'sorcery';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                if (v[`repeating_artificespell_${id}_memorized`] === '0') {
                    newAttrs[`${abilityId}_favored`] = '0';
                }
                newAttrs[`${abilityId}_description`] = !v[`repeating_alchemicalformula_${id}_description`] ? '' : v[`repeating_alchemicalformula_${id}_description`];
            });

            /* Psychic Powers/psionics conversion */
            if (debug) {console.log("Converting Psychic Powers");}
            disciplineIds.forEach(id => {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                newAttrs = {...newAttrs, ...convertSkillToProSkill(`repeating_discipline_${id}`, '@{pow}', '@{pow}', skillId, v)};

                const traditionName = !v[`repeating_discipline_${id}_name`] ? "?" : v[`repeating_discipline_${id}_name`];
                newAttrs = {...newAttrs, ...createNewTradition(traditionName, skillId, null)};
            });
            psionictalentIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_psionictalent_${id}_name`] ? '?' : v[`repeating_psionictalent_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                if (v['setting_option'] === 'luther_arkwright' || v['setting_option'] === 'classic_fantasy') {
                    newAttrs[`${abilityId}_type`] = 'psionics';
                } else {
                    newAttrs[`${abilityId}_type`] = 'psychic_power';
                }
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                let traits = [];
                switch(v[`repeating_psionictalent_${id}_range`]) {
                    case "^{self-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('personal')); break;
                    case "[[@{pow}]] ^{metres-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('short')); break;
                    case "^{line-of-sight-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('medium')); break;
                    case "^{same-paralell-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('long')); break;
                    case "^{any-paralell-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('multiversal')); break;
                    case "^{special-u}": traits.push(getTranslationByKey('range') + ': ' + getTranslationByKey('special')); break;
                }
                switch(v[`repeating_psionictalent_${id}_duration`]) {
                    case "^{instant-u}": traits.push(getTranslationByKey('duration') + ': ' + getTranslationByKey('instantaneous')); break;
                    case "^{focus-u}": traits.push(getTranslationByKey('duration') + ': ' + getTranslationByKey('focus')); break;
                    case "^{lasting-u}": traits.push(getTranslationByKey('duration') + ': ' + getTranslationByKey('lasting')); break;
                }
                if (v[`repeating_psionictalent_${id}_area`]) {
                    traits.push(getTranslationByKey('area') + ': ' + v[`repeating_miracle_${id}_area`]);
                }
                if (v[`repeating_psionictalent_${id}_cost`]) {
                    traits.push(getTranslationByKey('cost') + ': ' + v[`repeating_miracle_${id}_cost`]);
                } else {
                    traits.push(getTranslationByKey('cost') + ': 1');
                }
                switch(v[`repeating_psionictalent_${id}_resist`]) {
                    case "^{brawn-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('brawn')); break;
                    case "^{endurance-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('endurance')); break;
                    case "^{evade-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('evade')); break;
                    case "^{willpower-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('willpower')); break;
                    case "^{special-u}": traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('special')); break;
                    default: traits.push(getTranslationByKey('resist') + ': ' + getTranslationByKey('none'));
                }
                if (v[`repeating_psionictalent_${id}_damage`]) {
                    newAttrs[`${abilityId}_advanced_traits`] = '^{damage}: [' + v[`repeating_psionictalent_${id}_damage`] + '](`/r ' + v[`repeating_psionictalent_${id}_damage`] + ')';
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_description`] = !v[`repeating_psionictalent_${id}_description`] ? '' : v[`repeating_psionictalent_${id}_description`];
            });

            /* Traits Conversion */
            traitIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = '?';
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'ability';
                newAttrs[`${abilityId}_traited`] = '0';
                newAttrs[`${abilityId}_details`] = '0';
                newAttrs[`${abilityId}_summary`] = !v[`repeating_trait_${id}_trait`] ? '' : v[`repeating_trait_${id}_trait`];
                newAttrs[`${abilityId}_description`] = !v[`repeating_trait_${id}_trait`] ? '' : v[`repeating_trait_${id}_trait`];
            });

            /* Convert income */
            let newIncome = "";
            const incomeDay = parseFloat(v['income_day']) || 0;
            const incomeMonth = parseFloat(v['income_month']) || 0;
            const incomeSeason = parseFloat(v['income_season']) || 0;
            const incomeYear = parseFloat(v['income_year']) || 0;
            if (v['income_day']) {
                newIncome = newIncome + getTranslationByKey('day') + ':' + incomeDay.toFixed(2) + ' ';
            }
            if (v['income_month']) {
                newIncome = newIncome + getTranslationByKey('month') + ':' + incomeMonth.toFixed(2) + ' ';
            }
            if (v['income_season']) {
                newIncome = newIncome + getTranslationByKey('season') + ':' + incomeSeason.toFixed(2) + ' ';
            }
            if (v['income_year']) {
                newIncome = newIncome + getTranslationByKey('year') + ':' + incomeYear.toFixed(2);
            }
            newAttrs['income'] = newIncome;

            /* Convert Notes */
            if (v['notes']) {
                newAttrs['sheet_notes'] = v['notes'];
            }

            /* Delete json import data due to size and not needing it anymore, v3 does this for us after import */
            newAttrs['encounter_generator_json'] = '';

            if (debug) {console.log(newAttrs);}
            setAttrs({
                ...newAttrs,
                ...newHpAttrs
            });
        });
    /* Get IDs end */
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
}

/**
 * Make the changes needs to get a character sheet updated from 3.0 to 3.1
 */
function upgradeCharacter3Dot1() {
    if (debug) {
        console.log("Upgrading character to 3.1");
    }

    getSectionIDs("repeating_standardskill", function(customstdskillIds) {
        let customstdskillGetAttrs = [];
        customstdskillIds.forEach(id => {
            customstdskillGetAttrs.push(`repeating_standardskill_${id}_name`, `repeating_standardskill_${id}_fumbled`, `repeating_standardskill_${id}_trained`, `repeating_standardskill_${id}_temp`, `repeating_standardskill_${id}_penalty`, `repeating_standardskill_${id}_experience`, `repeating_standardskill_${id}_other`, `repeating_standardskill_${id}_total`, `repeating_standardskill_${id}_notes`, `repeating_standardskill_${id}_char1`, `repeating_standardskill_${id}_char2`);
        });

        /* Fetch attrs */
        getAttrs(customstdskillGetAttrs.concat(['sheet_notes']), function (v) {
            let newAttrs = {'version': '3.1'};

            /* Migration custom standard skills */
            if (debug) {console.log("Converting Custom Standard Skills");}
            customstdskillIds.forEach(id => {
                newAttrs = {...newAttrs, ...convertSkillToV3(`repeating_standardskill_${id}`, v)};
            });

            /* Move shet_notes to sheetnotes to avoid conflicts with repating items using _notes */
            if (v['sheet_notes']) {
                newAttrs['sheetnotes'] = v['sheet_notes'];
                newAttrs['sheet_notes'] = "";
            }

            setAttrs(newAttrs);
        });
    });
}