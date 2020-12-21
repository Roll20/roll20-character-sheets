// --- ALL SHEET WORKERS START --- //

//Ability Score Parser function
function getLookupValue(abilityScoreString, defaultValue, isStrength = false) {
    if (abilityScoreString === '') {
        return defaultValue;
    }

    let abilityScoreNumber = parseInt(abilityScoreString);
    if (isNaN(abilityScoreNumber) || abilityScoreNumber < 1 || abilityScoreNumber > 25) {
        return 0; // Return error value
    }

    if (isStrength) {
        let exceptionalMatch = abilityScoreString.match(/18\[([0-9]{1,3})]/);
        if (exceptionalMatch !== null) {
            let exceptionalStrNumber = parseInt(exceptionalMatch[1]);
            if (1 <= exceptionalStrNumber && exceptionalStrNumber <= 50) {
                return '18[01-50]';
            }
            if (51 <= exceptionalStrNumber && exceptionalStrNumber <= 75) {
                return '18[51-75]'
            }
            if (76 <= exceptionalStrNumber && exceptionalStrNumber <= 90) {
                return '18[76-90]'
            }
            if (91 <= exceptionalStrNumber && exceptionalStrNumber <= 99) {
                return '18[91-99]'
            }
            // 100 can be written as [00] or [100]
            if (exceptionalStrNumber === 0 || exceptionalStrNumber === 100) {
                return '18[00]'
            }
        }
    }

    return abilityScoreNumber;
}

//Set sub-attributes based on Strength, Stamina, and Muscle
on('change:strength change:stamina change:muscle', function() {
    getAttrs(['strength','stamina','muscle'], function(values) {
        let strengthRaw = values.strength.replace(/\s+/g, '');
        let staminaRaw = values.stamina.replace(/\s+/g, '');
        let muscleRaw = values.muscle.replace(/\s+/g, '');

        let strength = getLookupValue(strengthRaw, '', true);
        if (strength === '') {
            return;
        }

        if (strength === 0) {
            assignStr(0,0, strengthTable['strnotes'][0], strengthTable['str2notes'][0]);
            return;
        }

        let stamina = getLookupValue(staminaRaw, strength, true);
        let muscle = getLookupValue(muscleRaw, strength, true);

        let strnotes;
        let str2notes;
        if (staminaRaw === '' && muscleRaw === '') {
            strnotes = [strengthTable['str2notes'][strength], strengthTable['strnotes'][strength]].filter(Boolean).join(', ');
            str2notes = '';
        } else {
            strnotes = stamina === 0 ? 'INVALID STAMINA' : strengthTable['strnotes'][strength];
            str2notes = muscle === 0 ? 'INVALID MUSCLE' : strengthTable['str2notes'][muscle];
        }

        assignStr(stamina, muscle, strnotes, str2notes);

        function assignStr(stamina, muscle, strnotes, str2notes) {
            setAttrs({
                strengthhit: strengthTable['strengthhit'][muscle],
                strengthdmg: strengthTable['strengthdmg'][muscle],
                carryweight: strengthTable['carryweight'][stamina],
                maxpress: strengthTable['maxpress'][muscle],
                opendoor: strengthTable['opendoor'][muscle],
                bendbar: strengthTable['bendbar'][muscle],
                strnotes: strnotes,
                str2notes: str2notes,
            });
        }
    });
});

// Set sub-attributes based on Dexterity, Aim, and Balance
on('change:dexterity change:aim change:balance', function() {
    getAttrs(['dexterity','aim','balance'], function(values) {
        let dexterityRaw = values.dexterity.replace(/\s+/g, '');
        let aimRaw = values.aim.replace(/\s+/g, '');
        let balanceRaw = values.balance.replace(/\s+/g, '');

        let dexterity = getLookupValue(dexterityRaw, '');
        if (dexterity === '') {
            return;
        }

        if (dexterity === 0) {
            assignAttributes(0, 0, 0, dexterityTable['dexnotes'][0], dexterityTable['dexnotes'][0], false);
            return;
        }

        let aim = getLookupValue(aimRaw, '');
        let balance = getLookupValue(balanceRaw, '');

        let dexnotes;
        let dex2notes;
        let standardRules = false;
        if (aimRaw === '' && balanceRaw === '') {
            dexnotes = '';
            dex2notes = '';
            standardRules = true;
        } else {
            dexnotes = aim === 0 ? 'INVALID AIM' : '';
            dex2notes = balance === 0 ? 'INVALID BALANCE' : '';
        }

        assignAttributes(dexterity, aim, balance, dexnotes, dex2notes, standardRules);

        function assignAttributes(dexterity, aim, balance, dexnotes, dex2notes, standardRules) {
            setAttrs({
                ppd: dexterityTable['aim-pickpocket'][aim] || dexterityTable['dex-pickpocket'][dexterity],
                old: dexterityTable['aim-openlocks'][aim] || dexterityTable['dex-openlocks'][dexterity],
                rtd: dexterityTable['dex-findtraps'][dexterity],
                msd: dexterityTable['balance-movesilently'][balance] || dexterityTable['dex-movesilently'][dexterity],
                hsd: dexterityTable['dex-hideinshadows'][dexterity],
                cwd: standardRules ? '0' : dexterityTable['balance-climbwalls'][balance] || dexterityTable['dex-climbwalls'][dexterity],
                tud: standardRules ? '0' : dexterityTable['dex-tunneling'][dexterity],
                ebd: standardRules ? '0' : dexterityTable['dex-escapebonds'][dexterity],
                dexreact: dexterityTable['dexreact'][getLookupValue(balance, dexterity)],
                dexmissile: dexterityTable['dexmissile'][getLookupValue(aim, dexterity)],
                dexdefense: dexterityTable['dexdefense'][getLookupValue(balance, dexterity)],
                dexnotes: dexnotes,
                dex2notes: dex2notes,
            });
        }
    });
});

// Set sub-attributes based on Constitution, Health, and Fitness
on('change:constitution change:health change:fitness', function() {
    getAttrs(['constitution','health','fitness'], function(values) {
        let constitutionRaw = values.constitution.replace(/\s+/g, '');
        let healthRaw = values.health.replace(/\s+/g, '');
        let fitnessRaw = values.fitness.replace(/\s+/g, '');

        let constitution = getLookupValue(constitutionRaw, '');
        if (constitution === '') {
            return;
        }

        if (constitution === 0) {
            assignAttributes(0,0, 0, constitutionTable['connotes'][0], constitutionTable['con2notes'][0]);
            return;
        }

        let health = getLookupValue(healthRaw, constitution);
        let fitness = getLookupValue(fitnessRaw, constitution);

        let connotes;
        let con2notes;
        if (healthRaw === '' && fitnessRaw === '') {
            connotes = [constitutionTable['con2notes'][constitution], constitutionTable['connotes'][constitution]].filter(Boolean).join(', ');
            con2notes = '';
        } else {
            connotes = health === 0 ? 'INVALID HEALTH' : constitutionTable['connotes'][constitution];
            con2notes = fitness === 0 ? 'INVALID FITNESS' : constitutionTable['con2notes'][fitness];
        }

        assignAttributes(constitution, health, fitness, connotes, con2notes);

        function assignAttributes(constitution, health, fitness, connotes, con2notes) {
            setAttrs({
                conadj: constitutionTable['conadj'][fitness],
                conshock: constitutionTable['conshock'][health],
                conres: constitutionTable['conres'][fitness],
                conpoisonsave: constitutionTable['conpoisonsave'][health],
                conregen: constitutionTable['conregen'][constitution],
                connotes: connotes,
                con2notes: con2notes,
            });
        }
    });
});

// Set sub-attributes based on Intelligence, Reason, and Knowledge
on('change:intelligence change:reason change:knowledge', function() {
    getAttrs(['intelligence','reason','knowledge'], function(values) {
        let intelligenceRaw = values.intelligence.replace(/\s+/g, '');
        let reasonRaw = values.reason.replace(/\s+/g, '');
        let knowledgeRaw = values.knowledge.replace(/\s+/g, '');

        let intelligence = getLookupValue(intelligenceRaw, '');
        if (intelligence === '') {
            return;
        }

        if (intelligence === 0) {
            assignAttributes(0, 0, 0, intelligenceTable['intnotes'][0], intelligenceTable['intnotes'][0]);
            return;
        }

        let reason = getLookupValue(reasonRaw, intelligence);
        let knowledge = getLookupValue(knowledgeRaw, intelligence);

        let intnotes;
        let int2notes;
        if (reasonRaw === '' && knowledgeRaw === '') {
            intnotes = intelligenceTable['intnotes'][intelligence];
            int2notes = '';
        } else {
            intnotes = reason === 0 ? 'INVALID REASON' : '';
            int2notes = knowledge === 0 ? 'INVALID KNOWLEDGE' : intelligenceTable['intnotes'][knowledge];
        }

        assignAttributes(intelligence, reason, knowledge, intnotes, int2notes);

        function assignAttributes(intelligence, reason, knowledge, intnotes, int2notes) {
            setAttrs({
                intlang: intelligenceTable['intlang'][knowledge],
                intlvl: intelligenceTable['intlvl'][reason],
                intchance: intelligenceTable['intchance'][knowledge],
                intmax: intelligenceTable['intmax'][reason],
                intimm1st: intelligenceTable['intimm1st'][reason],
                intimm2nd: intelligenceTable['intimm2nd'][reason],
                intimm3rd: intelligenceTable['intimm3rd'][reason],
                intimm4th: intelligenceTable['intimm4th'][reason],
                intimm5th: intelligenceTable['intimm5th'][reason],
                intimm6th: intelligenceTable['intimm6th'][reason],
                intimm7th: intelligenceTable['intimm7th'][reason],
                intnotes: intnotes,
                int2notes: int2notes,
            });
        }
    });
});

// Set sub-attributes based on Wisdom, Intuition, and Willpower
function parseWisBonus(abilityScore) {
    if (abilityScore < 13) {
        return {
            '1st': 0,
            '2nd': 0,
            '3rd': 0,
            '4th': 0,
            '5th': 0,
            '6th': 0,
            '7th': 0,
            'wisbonus': wisdomTable['wisbonus'][abilityScore],
            'wisbonus-prime': wisdomTable['wisbonus'][abilityScore],
            'wisbonus-extra': wisdomTable['wisbonus'][abilityScore],
        };
    }

    // Combine all spell levels into one string
    let bonusString = '';
    for (let i = 13; i <= abilityScore; i++) {
        bonusString += wisdomTable['wisbonus'][i];
    }

    // Count instances of each spell level
    let bonus = {
        '1st': (bonusString.match(/1st/g) || []).length,
        '2nd': (bonusString.match(/2nd/g) || []).length,
        '3rd': (bonusString.match(/3rd/g) || []).length,
        '4th': (bonusString.match(/4th/g) || []).length,
        '5th': (bonusString.match(/5th/g) || []).length,
        '6th': (bonusString.match(/6th/g) || []).length,
        '7th': (bonusString.match(/7th/g) || []).length,
    };

    // Generate bonus prime and bonus extra strings
    bonus['wisbonus-prime'] = wisdomTable['wisbonus-prime'][abilityScore];
    bonus['wisbonus-extra'] = wisdomTable['wisbonus-extra'][abilityScore];
    bonus['wisbonus'] = [bonus['wisbonus-prime'], bonus['wisbonus-extra']].filter(Boolean).join(', ');

    return bonus;
}

on('change:wisdom change:intuition change:willpower', function() {
    getAttrs(['wisdom','intuition','willpower'], function(values) {
        let wisdomRaw = values.wisdom.replace(/\s+/g, '');
        let intuitionRaw = values.intuition.replace(/\s+/g, '');
        let willpowerRaw = values.willpower.replace(/\s+/g, '');

        let wisdom = getLookupValue(wisdomRaw, '');
        if (wisdom === '') {
            return;
        }

        let bonusSpells;
        if (wisdom === 0) {
            bonusSpell = parseWisBonus(0);
            assignAttributes(0, 0, 0, bonusSpells, wisdomTable['wisimmune'][0], wisdomTable['wisimmune'][0], wisdomTable['wisnotes'][0], wisdomTable['wisnotes'][0]);
            return;
        }

        let intuition = getLookupValue(intuitionRaw, wisdom);
        let willpower = getLookupValue(willpowerRaw, wisdom);

        let wisimm1;
        let wisimm2;
        let wisnotes;
        let wis2notes;
        if (intuitionRaw === '' && willpowerRaw === '') {
            wisnotes = wisdomTable['wisnotes'][wisdom];
            wis2notes = '';
            wisimm2 = '';
            let wisImmuneArray = [];
            for (let i = wisdom; i > 18; i--) {
                wisImmuneArray.push(wisdomTable['wisimmune'][i]);
            }
            wisimm1 = wisImmuneArray.filter(Boolean).join(', ');
        } else {
            wisnotes = intuition === 0 ? 'INVALID INTUITION' : wisdomTable['wisnotes'][intuition];
            wis2notes = willpower === 0 ? 'INVALID WILLPOWER' : wisdomTable['wisnotes'][willpower];
            let wisImmuneArray = [];
            for (let i = willpower; i > 18; i--) {
                wisImmuneArray.push(wisdomTable['wisimmune'][i]);
            }
            let slicePoint = Math.round(wisImmuneArray.length/2);
            wisimm1 = wisImmuneArray.slice(0, slicePoint).filter(Boolean).join(', ');
            wisimm2 = wisImmuneArray.slice(slicePoint).filter(Boolean).join(', ');
        }
        bonusSpells = parseWisBonus(willpower);

        assignAttributes(wisdom, intuition, willpower, bonusSpells, wisimm1, wisimm2, wisnotes, wis2notes);

        function assignAttributes(wisdom, intuition, willpower, bonusSpells, wisimm1, wisimm2, wisnotes, wis2notes) {
            setAttrs({
                wisdef: wisdomTable['wisdef'][willpower],
                wisbonus: bonusSpells['wisbonus'],
                'wisbonus-prime': bonusSpells['wisbonus-prime'],
                'wisbonus-extra': bonusSpells['wisbonus-extra'],
                wisfail: wisdomTable['wisfail'][intuition],
                wisimm: wisimm1,
                wisimm1: wisimm1,
                wisimm2: wisimm2,
                wisnotes: wisnotes,
                wis2notes: wis2notes,
                'spell-priest-level1-wisdom': bonusSpells['1st'],
                'spell-priest-level2-wisdom': bonusSpells['2nd'],
                'spell-priest-level3-wisdom': bonusSpells['3rd'],
                'spell-priest-level4-wisdom': bonusSpells['4th'],
                'spell-priest-level5-wisdom': bonusSpells['5th'],
                'spell-priest-level6-wisdom': bonusSpells['6th'],
                'spell-priest-level7-wisdom': bonusSpells['7th'],
            });
        }
    });
});

// Set sub-attributes based on Charisma, Leadership, and Appearance
on('change:charisma change:leadership change:appearance', function() {
    getAttrs(['charisma','leadership','appearance'], function(values) {
        let charismaRaw = values.charisma.replace(/\s+/g, '');
        let leadershipRaw = values.leadership.replace(/\s+/g, '');
        let appearanceRaw = values.appearance.replace(/\s+/g, '');

        let charisma = getLookupValue(charismaRaw, '');
        if (charisma === '') {
            return;
        }

        if (charisma === 0) {
            assignAttributes(0,0, 0, charismaTable['chanotes'][0], charismaTable['chanotes'][0]);
            return;
        }

        let leadership = getLookupValue(leadershipRaw, charisma);
        let appearance = getLookupValue(appearanceRaw, charisma);

        let chanotes;
        let cha2notes;
        if (leadershipRaw === '' && appearanceRaw === '') {
            chanotes = charismaTable['chanotes'][charisma];
            cha2notes = '';
        } else {
            chanotes = leadership === 0 ? 'INVALID LEADERSHIP' : charismaTable['chanotes'][leadership];
            cha2notes = appearance === 0 ? 'INVALID APPEARANCE' : charismaTable['chanotes'][appearance];
        }

        assignAttributes(charisma, leadership, appearance, chanotes, cha2notes);

        function assignAttributes(charisma, leadership, appearance, chanotes, cha2notes) {
            setAttrs({
                chamax: charismaTable['chamax'][leadership],
                chaloy: charismaTable['chaloy'][leadership],
                chareact: charismaTable['chareact'][appearance],
                chanotes: chanotes,
                cha2notes: cha2notes,
            });
        }
    });
});

function isNewSpellSection(section) {
    return section.startsWith('wiz') || section.startsWith('pri');
}

// --- Start summing numbers from repeating spells for wizard and priest --- //
function recursiveSpellSum(tail, acc, oldField, newField, resultFieldName) {

    let head = tail.shift();
    if (head === undefined) {
        console.log(`Summing ended. Final sum is ${acc}`);
        console.timeEnd('Summing time');
        setAttrs({
            [resultFieldName] : acc
        });
        return;
    }

    let repeatingName;
    let fieldName;
    if (isNewSpellSection(head)) {
        repeatingName = `spells-${head}`
        fieldName = newField;
    } else {
        repeatingName = `spells${head}`
        fieldName = `${oldField}${head}`
    }

    console.timeLog('Summing time');

    TAS.repeating(repeatingName)
        .fields(fieldName)
        .each(function (r) {
            acc += (r.I[fieldName]);
            console.log(`Recursion ${repeatingName} updated sum to ${acc}`);
        })
        .execute(() => recursiveSpellSum(tail, acc, oldField, newField, resultFieldName)); // Fat arrow function to lazy load value.
}

function setupSpellSumming(sections, oldField, newField, resultFieldName) {
    sections.forEach(section => {
        let repeatingName;
        let fieldName;
        if (isNewSpellSection(section)) {
            repeatingName = `spells-${section}`
            fieldName = newField;
        } else {
            repeatingName = `spells${section}`
            fieldName = `${oldField}${section}`
        }

        let onChange = `change:repeating_${repeatingName}:${fieldName} remove:repeating_${repeatingName}`;
        console.log(onChange);
        on(onChange, function () {

            console.log(`Summing started by section ${repeatingName}`);
            console.time('Summing time');
            let levelsCopy = [...sections];
            let accumulator = 0;

            recursiveSpellSum(levelsCopy, accumulator, oldField, newField, resultFieldName);
        });
    });
}
// --- End summing numbers from repeating spells for wizard and priest --- //

function setupAutoFillSpellInfo(section, spellsTable) {
    on(`change:repeating_spells-${section}:spell-select`, function(eventInfo){

        let spell = spellsTable[section][eventInfo.newValue];
        if (spell === undefined)
            return;

        let spellInfo ={
            [`repeating_spells-${section}_spell-name`]         : spell['name'],
            [`repeating_spells-${section}_spell-cast-time`]    : spell['cast-time'],
            [`repeating_spells-${section}_spell-level`]        : spell['level'],
            [`repeating_spells-${section}_spell-school`]       : spell['school'],
            [`repeating_spells-${section}_spell-components`]   : spell['components'],
            [`repeating_spells-${section}_spell-range`]        : spell['range'],
            [`repeating_spells-${section}_spell-aoe`]          : spell['aoe'],
            [`repeating_spells-${section}_spell-duration`]     : spell['duration'],
            [`repeating_spells-${section}_spell-damage`]       : spell['damage'],
            [`repeating_spells-${section}_spell-damage-type`]  : spell['damage-type'],
            [`repeating_spells-${section}_spell-saving-throw`] : spell['saving-throw'],
            [`repeating_spells-${section}_spell-healing`]      : spell['healing'],
            [`repeating_spells-${section}_spell-materials`]    : spell['materials'],
            [`repeating_spells-${section}_spell-reference`]    : spell['reference'],
            [`repeating_spells-${section}_spell-effect`]       : spell['effect']
        }
        if (section.startsWith('pri')) {
            spellInfo[`repeating_spells-${section}_spell-sphere`] = spell['sphere'];
        }

        setAttrs(spellInfo);
    });
}

function setupCalculateRemaining(totalField, sumField, remainingField) {
    on(`change:${totalField} change:${sumField}`, function () {
        getAttrs([totalField, sumField], function (values) {
            let intTotal = parseInt(values[totalField]);
            let intSum = parseInt(values[sumField]);

            console.log(`Setting ${remainingField} with value from ${totalField}: ${intTotal} and ${sumField}: ${intSum}`);

            setAttrs({
                [remainingField]: intTotal - intSum
            });
        });
    });
}

function setupCalculateTotal(totalField, fieldsToSum) {
    let onChange = fieldsToSum.map(field => `change:${field}`).join(' ');
    on(onChange, function () {
        getAttrs(fieldsToSum, function (values) {
            let total = 0;
            fieldsToSum.forEach(field => {
                total += parseInt(values[field]) || 0;
            });

            console.log(total);

            setAttrs({
                [totalField]: total
            });
        });
    });
}

function setupRepeatingRowCalculateTotal(repeatingTotalField, repeatingFieldsToSum, repeatingName) {
    let onChange = repeatingFieldsToSum.map(field => `change:repeating_${repeatingName}:${field}`).join(' ');
    let allFields = [...repeatingFieldsToSum];
    allFields.push(repeatingTotalField);
    on(`${onChange} remove:repeating_${repeatingName}`, function(eventInfo){
        TAS.repeating(repeatingName)
            .fields(allFields)
            .tap(function(rowSet) {
                console.log(eventInfo);
                let rowId = eventInfo.sourceAttribute.split('_')[2];
                let row = rowSet[rowId];
                console.log(rowId);
                console.log(row);
                let total = 0;
                repeatingFieldsToSum.forEach(column => {
                    total += row.I[column];
                });
                row[repeatingTotalField] = total;
                console.log(total);
            })
            .execute();
    });
}

let wizardSpellLevelsSections = [
    {level: 1, sections: ['', '2', '3', 'wiz1']},
    {level: 2, sections: ['4', '5', '6', 'wiz2']},
    {level: 3, sections: ['7', '8', '9']},
    {level: 4, sections: ['10', '11', '12']},
    {level: 5, sections: ['70', '71', '72']}, //... legacy naming convention
    {level: 6, sections: ['13', '14', '15']},
    {level: 7, sections: ['16', '17', '18']},
    {level: 8, sections: ['19', '20', '21']},
    {level: 9, sections: ['22', '23', '24']},
    {level: 10, sections: ['25', '26', '27']},
    {level: 11, sections: ['52', '53', '54']}, //... legacy naming convention
    {level: 12, sections: ['55', '56', '57']},
    {level: 13, sections: ['58', '59', '60']},
    {level: 14, sections: ['61', '62', '63']},
    {level: 15, sections: ['64', '65', '66']},
];

let priestSpellLevelsSections = [
    {level: '1', sections: ['28', '29', '30', 'pri1']},
    {level: '2', sections: ['31', '32', '33']},
    {level: '3', sections: ['34', '35', '36']},
    {level: '4', sections: ['37', '38', '39']},
    {level: '5', sections: ['40', '41', '42']},
    {level: '6', sections: ['43', '44', '45']},
    {level: '7', sections: ['46', '47', '48']},
    {level: 'q', sections: ['49', '50', '51']},
];

// --- Start setup Spell Slots --- //
wizardSpellLevelsSections.forEach(spellLevel => {
    let prefix = `spell-level${spellLevel.level}`;
    setupCalculateTotal(`${prefix}-total`, [`${prefix}-castable`, `${prefix}-specialist`, `${prefix}-misc`]);
    setupSpellSumming(spellLevel.sections, 'cast-value', 'spell-cast-value', `${prefix}-cast-value-sum`);
    setupSpellSumming(spellLevel.sections, 'cast-max', 'spell-memorized', `${prefix}-cast-max-sum`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-max-sum`, `${prefix}-selected`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-value-sum`, `${prefix}-remaining`);

    // Auto set spell info function
    let lastSection = spellLevel.sections[spellLevel.sections.length - 1];
    if (isNewSpellSection(lastSection)) {
        setupAutoFillSpellInfo(lastSection, wizardSpells);
    }
});

priestSpellLevelsSections.forEach(spellLevel => {
    let prefix = `spell-priest-level${spellLevel.level}`;
    setupCalculateTotal(`${prefix}-total`, [`${prefix}-castable`, `${prefix}-wisdom`, `${prefix}-misc`]);
    setupSpellSumming(spellLevel.sections, 'cast-value', 'spell-cast-value', `${prefix}-cast-value-sum`);
    setupSpellSumming(spellLevel.sections, 'cast-max', 'spell-memorized', `${prefix}-cast-max-sum`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-max-sum`, `${prefix}-selected`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-value-sum`, `${prefix}-remaining`);

    // Auto set spell info function
    let lastSection = spellLevel.sections[spellLevel.sections.length - 1];
    if (isNewSpellSection(lastSection)) {
        setupAutoFillSpellInfo(lastSection, priestSpells);
    }
});
// --- End setup Spell Slots --- //

// --- Start setup Spell Points, Arc, and Wind --- //
let wizardSpellPoints = 'spell-points';
let arc = 'total-arc';
let allWizardSpellSections = wizardSpellLevelsSections.flatMap(sl => sl.sections);
setupCalculateTotal(`${wizardSpellPoints}-total`, [`${wizardSpellPoints}-lvl`, `${wizardSpellPoints}-spc`, `${wizardSpellPoints}-int`]);
setupSpellSumming(allWizardSpellSections, wizardSpellPoints, 'spell-points', `${wizardSpellPoints}-sum`);
setupSpellSumming(allWizardSpellSections, 'arc', 'spell-arc', `${arc}-sum`);
setupCalculateRemaining(`${wizardSpellPoints}-total`, `${wizardSpellPoints}-sum`, `${wizardSpellPoints}-remaining`);
setupCalculateRemaining(arc, `${arc}-sum`, `${arc}-remaining`);

let priestSpellPoints = 'spell-points-priest';
let wind = 'total-wind';
let allPriestSpellSections = priestSpellLevelsSections.flatMap(sl => sl.sections);
setupCalculateTotal(`${priestSpellPoints}-total`, [`${priestSpellPoints}-lvl`, `${priestSpellPoints}-wis`]);
setupSpellSumming(allPriestSpellSections, priestSpellPoints, 'spell-points', `${priestSpellPoints}-sum`);
setupSpellSumming(allPriestSpellSections, 'wind', 'spell-wind', `${wind}-sum`);
setupCalculateRemaining(`${priestSpellPoints}-total`, `${priestSpellPoints}-sum`, `${priestSpellPoints}-remaining`);
setupCalculateRemaining(wind, `${wind}-sum`, `${wind}-remaining`);
// --- End setup Spell Points, Arc, and Wind --- //

// --- Start setup Granted Powers --- //
let powerSpellSections = ['67', '68', '69'];
let spellPower = 'spell-power';
setupSpellSumming(powerSpellSections, 'cast-value', '', `${spellPower}-sum`);
setupSpellSumming(powerSpellSections, 'cast-max', '', `${spellPower}-available`);
setupCalculateRemaining(`${spellPower}-available`, `${spellPower}-sum`, `${spellPower}-remaining`);
// --- End setup Granted Powers --- //

// --- Start setup Rogue skills total --- //
let rogueStandardSkills = ['pp', 'ol', 'rt', 'ms', 'hs', 'dn', 'cw', 'rl', 'ib'];
let rogueStandardColumns = ['b', 'r', 'd', 'k', 'm', 'l'];
rogueStandardSkills.forEach(skill => {
    setupCalculateTotal(`${skill}t`, rogueStandardColumns.map(column => `${skill}${column}`));
    setupCalculateTotal(`${skill}noarmort`, [`${skill}t`, `${skill}noarmorb`]);
    setupCalculateTotal(`${skill}armort`, [`${skill}t`, `${skill}armorp`]);
});

// Setup custom rogue skills total
setupRepeatingRowCalculateTotal('crt', rogueStandardColumns.map(column => `cr${column}`), 'customrogue');
setupRepeatingRowCalculateTotal('crnoarmort', ['crt', 'crnoarmorb'], 'customrogue');
setupRepeatingRowCalculateTotal('crarmort', ['crt', 'crarmorp'], 'customrogue');
// --- End setup Rogue skills total --- //

//Rogue Custom Skills level sum
on('change:repeating_customrogue:crl remove:repeating_customrogue', function(){

    TAS.repeating('customrogue')
        .attrs('newskill')
        .fields('crl')
        .reduce(function(m,r){
            m.crl+=(r.I.crl);
            return m;

        },{crl:0},function(m,r,a){
            a.newskill=m.crl;
        })
        .execute();
});
// --- End setup Rogue skills total --- //

//Weapon proficiency slots
on('change:repeating_weaponprofs:weapprofnum remove:repeating_weaponprofs change:weapprofnum', function(){

    TAS.repeating('weaponprofs')
        .attrs('weapprofslotssum','weapprofnum')
        .fields('weapprofnum')
        .reduce(function(m,r){
            m.weapprofnum+=(r.I.weapprofnum);
            return m;

        },{weapprofnum:0, desc: []},function(m,r,a){
            m.weapprofnum+=(a.I.weapprofnum);
            a.I.weapprofslotssum=(m.weapprofnum);
        })
        .execute();
});

//Nonweapon proficiency slots
on('change:repeating_profs:profslots remove:repeating_profs change:profslots', function(){

    TAS.repeating('profs')
        .attrs('profslotssum','profslots')
        .fields('profslots')
        .reduce(function(m,r){
            m.profslots+=(r.I.profslots);
            return m;

        },{profslots:0, desc: []},function(m,r,a){
            m.profslots+=(a.I.profslots);
            a.I.profslotssum=(m.profslots);
        })
        .execute();
});

//Equipment Carried Section
on('change:repeating_gear:gearweight change:repeating_gear:gearqty remove:repeating_gear change:gearweight change:gearqty', function(){

    TAS.repeating('gear')
        .attrs('gearweighttotal','gearqty','gearweight')
        .fields('gearqty','gearweight')
        .reduce(function(m,r){
            m.gearweight+=(r.F.gearweight*r.I.gearqty);
            return m;

        },{gearweight:0, desc: []},function(m,r,a){
            m.gearweight+=(a.F.gearweight*a.I.gearqty);
            a.D[2].gearweighttotal=m.gearweight;
        })
        .execute();
});

//Equipment Stored Section
//Mount Equipment Carried Section Continued
on('change:repeating_gear-stored:gear-stored-weight change:repeating_gear-stored:gear-stored-qty change:repeating_gear-stored:on-mount remove:repeating_gear-stored change:on-mount change:gear-stored-weight change:gear-stored-qty', function(){

    TAS.repeating('gear-stored')
        .attrs('mount-gear-weight-total','stored-gear-weight-total','on-mount','gear-stored-weight','gear-stored-qty')
        .fields('on-mount','gear-stored-weight','gear-stored-qty')
        .reduce(function(m,r){
            m.allgearweight+=(r.F['gear-stored-weight']*r.I['gear-stored-qty']);
            m.mountgearweight+=(r.F['gear-stored-weight']*r.I['gear-stored-qty']*r.I['on-mount']);
            return m;

        },{allgearweight:0,mountgearweight:0, desc: []},function(m,r,a){
            m.allgearweight+=(a.F['gear-stored-weight']*a.I['gear-stored-qty']);
            m.mountgearweight+=(a.F['gear-stored-weight']*a.I['gear-stored-qty']*a.I['on-mount']);
            a.D[2]['mount-gear-weight-total']=m.mountgearweight;
            a.D[2]['stored-gear-weight-total']=(m.allgearweight-m.mountgearweight);
        })
        .execute();
})

function setupCalculateTotalGemsValue(totalField, valueField, multiplierField, repeatingSection) {
    let onChange = `change:${valueField} change:${multiplierField} change:${repeatingSection}:${valueField} change:${repeatingSection}:${multiplierField} remove:${repeatingSection}`
    on(onChange, function(){
        TAS.repeating(repeatingSection)
            .attrs(totalField, valueField, multiplierField)
            .fields(valueField, multiplierField)
            .reduce(function(m,r){
                m.total+=(r.F[valueField]*r.I[multiplierField]);
                return m;
            },{total:0},function(m,r,a){
                m.total+=(a.F[valueField]*a.I[multiplierField]);
                a[totalField]=m.total;
            })
            .execute();
    });
}

// --- Start setup gem total value calculation for all settings --- //
let gemSections = ['', '2', '3', '4', '5', '6'];
gemSections.forEach(i => {
    setupCalculateTotalGemsValue(`gemstotalvalue${i}`, `gemvalue${i}`, `gemqty${i}`, `gem${i}`);
});
// --- End setup gem total value calculation for all settings --- //

// --- ALL SHEET WORKERS END --- //