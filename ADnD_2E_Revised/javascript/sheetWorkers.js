// --- ALL SHEET WORKERS START --- //
const PLAYER = 'player';
const SHEET_WORKER = 'sheetworker';

const SUCCESS = 'success';
const INFO = 'info';
const WARNING = 'warning';
const ERROR = 'error';

const BOOK_FIELDS = [
    'book-phb','book-tcfhb','book-tcthb','book-tcprhb','book-tcwhb',
    'book-tom','book-aaeg',
    'book-dwarves','book-bards','book-elves','book-humanoids','book-rangers',
    'book-paladins','book-druids','book-barbarians','book-necromancers','book-ninjas',
    'book-combat-and-tactics','book-skills-and-powers','book-spells-and-magic'
];

const SCHOOL_SPELLS_AND_MAGIC = 'school-spells-and-magic';
const SCHOOL_FIELDS = [SCHOOL_SPELLS_AND_MAGIC];

const SPHERE_SPELLS_AND_MAGIC = 'sphere-spells-and-magic';
const SPHERE_FIELDS = ['sphere-druids', 'sphere-necromancers', SPHERE_SPELLS_AND_MAGIC];

//#region Helper function
const isSheetWorkerUpdate = function (eventInfo) {
    return eventInfo.sourceType === SHEET_WORKER;
}

const isPlayerUpdate = function (eventInfo) {
    return eventInfo.sourceType === PLAYER;
}

const capitalizeFirst = function (s) {
    if (typeof s !== 'string')
        return '';

    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const displaySize = function(size) {
    if (typeof size !== 'string')
        return '';

    size = size.toLowerCase();
    switch (size) {
        case 't':
        case 'tiny': return 'Tiny';
        case 's':
        case 'small': return 'Small';
        case 'm':
        case 'medium': return 'Medium';
        case 'l':
        case 'large': return 'Large';
        case 'h':
        case 'huge': return 'Huge';
        case 'g':
        case 'gargantuan': return 'Gargantuan';
        default: return capitalizeFirst(size);
    }
}

const sizeToInt = function(size) {
    size = displaySize(size);
    switch (size) {
        case 'Tiny': return 0;
        case 'Small': return 1;
        case 'Medium': return 2;
        case 'Large': return 3;
        case 'Huge': return 4;
        case 'Gargantuan': return 5;
    }
}

const displayWeaponType = function (type) {
    if (typeof type !== 'string')
        return '';

    type = type.toLowerCase();
    switch (type) {
        case 's': return 'Slashing';
        case 'p': return 'Piercing';
        case 'b': return 'Bludgeoning';
        default: return capitalizeFirst(type);
    }
}

const parseSourceAttribute = function (eventInfo) {
    let parse = {};
    if (eventInfo.sourceAttribute.startsWith('repeating')) {
        let match = eventInfo.sourceAttribute.split('_');
        parse.section = match[1];
        parse.rowId = match[2];
        parse.attribute = match[3];
    } else {
        parse.attribute = eventInfo.sourceAttribute;
    }
    return parse;
}

const conditionalLog = function (bool, msg) {
    if (bool)
        console.log(msg);
}

const extractQueryResult = async function(query){//Sends a message to query the user for some behavior, returns the selected option.
    let queryRoll = await startRoll(`!{{query=[[0[response=${query}]]]}}`);
    finishRoll(queryRoll.rollId);
    return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};

const extractRoll = async function(rollExpression) {
    let queryRoll = await startRoll(`!{{roll=[[${rollExpression}]]}}`);
    finishRoll(queryRoll.rollId);
    return queryRoll.results.roll;
};

const extractRollResult = async function(rollExpression) {
    let roll = await extractRoll(rollExpression);
    return roll.result;
};

// Call this when an async function does not call the CRP to keep the reference to the character sheet.
const keepContextRoll = async function () {
    let dummyRoll = await startRoll('!{{roll=}}');
    finishRoll(dummyRoll.rollId);
}

const printRoll = async function(rollExpression) {
    let roll = await startRoll(rollExpression);
    finishRoll(roll.rollId);
}

const isRollValid = function (rollExpression, field) {
    let expression = rollExpression.trim();
    if (!expression)
        return false;

    let message = `In the field @{${field}} you have unmatched opening and closing`;

    let openPara = (expression.match(/\(/g) || []).length
    let closePara = (expression.match(/\)/g) || []).length
    if (openPara !== closePara) {
        showToast(ERROR, 'Unmatched Parenthesis', `${message} parenthesis. You have:\n${openPara}x '('\n${closePara}x ')'`);
        return false;
    }

    let openCurly = (expression.match(/{/g) || []).length
    let closeCurly = (expression.match(/}/g) || []).length
    if (openCurly !== closeCurly) {
        showToast(ERROR, 'Unmatched Curly brackets', `${message} curly brackets. You have:\n${openCurly}x '{'\n${closeCurly}x '}'`);
        return false;
    }

    let openSquare = (expression.match(/\[/g) || []).length
    let closeSquare = (expression.match(/]/g) || []).length
    if (openSquare !== closeSquare) {
        showToast(ERROR, 'Unmatched Square brackets', `${message} square brackets. You have:\n${openSquare}x '['\n${closeSquare}x ']'`);
        return false;
    }

    if (openSquare % 2 !== 0) {
        showToast(ERROR, 'Square brackets error', `The field @{${field}} have too few square brackets. Square brackets are used in pairs of two, ie. [[ ]].\nThe expression have an uneven number of bracket pairs: ${openSquare}`);
        return false;
    }

    return true;
}

const calculateFormula = async function(formulaField, calculatedField, silent = false) {
    getAttrs([formulaField], async function (values) {
        let rollExpression = values[formulaField];
        let valid = isRollValid(rollExpression, formulaField);
        if (!valid)
            return;

        setAttrs({
            [calculatedField]: await extractRollResult(rollExpression, formulaField)
        },{silent:silent});
    });
}

const getToastObject = function (type, title, message) {
    let content
    switch (type) {
        case SUCCESS: content = 1; break;
        case INFO:    content = 2; break;
        case WARNING: content = 3; break;
        case ERROR:   content = 4; break;
    }
    return {
        ['toast']: 1,
        ['toast-content']: content,
        [`toast-title-${type}`]: title,
        [`toast-message-${type}`]: message
    }
}

const showToast = function(type, title, message) {
    setAttrs(getToastObject(type, title, message));
}

const getActiveSettings = function (settingFields, values) {
    let settings = settingFields.map(bField => values[bField])
        .filter(Boolean)
        .filter(book => book !== '0');
    return new Set(settings);
}

const isBookInactive = function (books, obj) {
    let activeBooks = getActiveSettings(BOOK_FIELDS, books);
    if (Array.isArray(obj))
        return obj.every(b => !activeBooks.has(b));
    else
        return !activeBooks.has(obj['book']);
}

const bookInactiveShowToast = function(books, obj) {
    let bookInactive = isBookInactive(books, obj);
    if (bookInactive) {
        if (Array.isArray(obj)) {
            let booksString = obj.map(b => '\n* ' + b).join('')
            showToast(ERROR, 'Missing Book(s)', `The book(s):${booksString}\nAre currently not active on your sheet.\nGo to the *Sheet Settings* and activate any of the listed book(s) (if your DM allows for its usage)`);
        } else {
            showToast(ERROR, 'Missing Book', `The book *${obj['book']}* is currently not active on your sheet.\nGo to the *Sheet Settings* and activate the book (if your DM allows for its usage)`);
        }
    }
    return bookInactive;
};

const isRemoving0 = function(eventInfo, fieldNames) {
    return fieldNames.some(fieldName => !parseInt(eventInfo.removedInfo[`${eventInfo.sourceAttribute}_${fieldName}`]));
};

const isOverwriting0 = function(eventInfo) {
    return !parseInt(eventInfo.newValue) && !parseInt(eventInfo.previousValue);
};

const doEarlyReturn = function(eventInfo, fieldNames) {
    return eventInfo.removedInfo
        ? isRemoving0(eventInfo, fieldNames)
        : isOverwriting0(eventInfo);
};

const repeatingMultiplySum = function(section, valueField, multiplierField, destination, decimals) {
    TAS.repeating(section)
        .attr(destination)
        .field([valueField, multiplierField])
        .reduce(function(m, r) {
            return m + r.F[valueField] * r.F[multiplierField];
        }, 0, function(t,r,a) {
            let dec = parseInt(decimals);
            if (isNaN(dec)) {
                a[destination] = t;
            } else {
                a.D[dec][destination] = t;
            }
        })
        .execute();
};
const repeatingCalculateRemaining = function(repeatingName, repeatingFieldsToSum, totalField, remainingField) {
    TAS.repeating(repeatingName)
        .attrs([totalField, remainingField])
        .fields(repeatingFieldsToSum)
        .reduce(function (memo, row) {
            repeatingFieldsToSum.forEach(column => {
                memo += row.I[column];
            });
            return memo;
        }, 0, function (memo,_,attrSet) {
            attrSet.I[remainingField] = attrSet.I[totalField] - memo;
        }).execute();
};
//#endregion

//#region Generic Setup functions
function setupStaticCalculateTotal(totalField, fieldsToSum, maxValue) {
    let onChange = fieldsToSum.map(field => `change:${field}`).join(' ');
    on(onChange, function () {
        getAttrs(fieldsToSum, function (values) {
            let total = 0;
            fieldsToSum.forEach(field => {
                total += parseInt(values[field]) || 0;
            });

            if (!isNaN(maxValue))
                total = Math.min(total, maxValue);

            setAttrs({
                [totalField]: total
            });
        });
    });
}

function setupRepeatingRowCalculateTotal(repeatingTotalField, repeatingFieldsToSum, repeatingName, maxValue) {
    let onChange = repeatingFieldsToSum.map(field => `change:repeating_${repeatingName}:${field}`).join(' ');
    let allFields = [...repeatingFieldsToSum];
    allFields.push(repeatingTotalField);
    on(`${onChange} remove:repeating_${repeatingName}`, function(eventInfo){
        if (eventInfo.removedInfo)
            return;

        TAS.repeating(repeatingName)
            .fields(allFields)
            .tap(function(rowSet) {
                let rowId = parseSourceAttribute(eventInfo).rowId;
                let row = rowSet[rowId];
                let total = 0;
                repeatingFieldsToSum.forEach(column => {
                    total += row.I[column];
                });

                if (!isNaN(maxValue))
                    total = Math.min(total, maxValue);

                row[repeatingTotalField] = total;
            })
            .execute();
    });
}
//#endregion

on('clicked:hide-toast', function(eventInfo) {
    setAttrs({
        ['toast']: 0,
        ['toast-content']: 0,
    });
});

//#region Ability Scores logic
// Ability Score Parser function
const squareBracketsRegex = /18\[([0-9]{1,3})]/; // Ie. 18[65]
const parenthesisRegex = /18\(([0-9]{1,3})\)/; // Ie. 18(65)
function getLookupValue(abilityScoreString, defaultValue, isStrength = false) {
    if (abilityScoreString === '') {
        return defaultValue;
    }

    let abilityScoreNumber = parseInt(abilityScoreString);
    if (isNaN(abilityScoreNumber) || abilityScoreNumber < 1 || abilityScoreNumber > 25) {
        return 0; // Return error value
    }

    if (isStrength) {
        let exceptionalMatch = abilityScoreString.match(squareBracketsRegex) || abilityScoreString.match(parenthesisRegex);
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

on('clicked:opendoor-check', function (eventInfo){
   getAttrs(['opendoor'], async function (values){
       let match = values.opendoor.match(/(\d+)\((\d+)\)/);
       let rollTemplate = "&{template:2Echeck} {{character=@{character_name}}} {{checkroll=[[1d20cs1cf20]]}} {{color=blue}}"
       if (!match) {
           return printRoll(rollTemplate + "{{checkvs=Open Doors Check}} {{checktarget=[[@{opendoor}]]}}");
       }
       let target = await extractQueryResult(`?{What kind of door?|Normal door,${match[1]}|Locked / Barred / Magical door,${match[2]}}`);
       rollTemplate += ` {{checktarget=[[${target}]]}}`;
       rollTemplate += target === match[1]
           ? ` {{checkvs=Open Normal Doors Check}}`
           : ` {{checkvs=Open Locked/Barred/Magically Held Doors Check}}`;
       return printRoll(rollTemplate);
   });
});
//#endregion

//#region Wizard and Priest Spells slot counting
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

function setupRepeatingSpellSumming(sections, oldField, newField, resultFieldName) {
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
        on(onChange, function (eventInfo) {
            if (doEarlyReturn(eventInfo, [fieldName]))
                return;

            console.log(`Summing started by section ${repeatingName}. Fieldname ${fieldName}`);
            console.time('Summing time');
            let levelsCopy = [...sections];
            let accumulator = 0;

            recursiveSpellSum(levelsCopy, accumulator, oldField, newField, resultFieldName);
        });
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
//#endregion

//#region Priest Spells based on Spheres
const ELEMENTAL = 'Elemental';
const PRIEST_SPHERES = [
    // Player's Handbook
    'All','Animal','Astral','Charm','Combat','Creation','Divination',ELEMENTAL,'Guardian','Healing',
    'Necromantic','Plant','Protection','Summoning','Sun','Weather',
    // Tome of Magic Spheres
    'Chaos','Law','Numbers','Thought','Time','Travelers','War','Wards'
];

const primarySphereRegex = new RegExp(PRIEST_SPHERES.join('|'), 'gi');
const noElementalRegex = new RegExp(PRIEST_SPHERES.filter(s => s !== ELEMENTAL).join('|'), 'gi');
const elementalRegex = /Earth|Air|Fire|Water/gi

function parseSpheres(spheresStrings, regex) {
    let spheres = new Set();
    spheresStrings.map(s => s.match(regex))
        .flat()
        .filter(Boolean)
        .map(s => capitalizeFirst(s))
        .forEach(s => spheres.add(s));
    return spheres;
}

const getSpellSpheres = function (spell, sphereRules) {
    if (sphereRules.has(SPHERE_SPELLS_AND_MAGIC))
        return spell[SPHERE_SPELLS_AND_MAGIC] || spell['sphere'];

    let sphere = spell['sphere'];
    sphereRules.forEach(rule => sphere += spell[rule] || '');
    return sphere;
}

function isSpellAvailable(spellName, spell, availableSpheres, elementalSpheres, activeBooks, optionalSpheres) {
    if (!activeBooks.has(spell['book']))
        return false;

    let spheres = getSpellSpheres(spell, optionalSpheres);

    let primarySpellSpheres = spheres.match(noElementalRegex) || [];
    let isAvailable = primarySpellSpheres.some(sphere => availableSpheres.has(sphere));
    if (isAvailable)
        return true;

    if (!availableSpheres.has(ELEMENTAL))
        return false;

    if (!spheres.includes(ELEMENTAL))
        return false;

    if (spheres.includes(`${ELEMENTAL} (`))
        return spheres.match(elementalRegex).some((element) => elementalSpheres.has(element))

    // The player and the spell has the elemental sphere (without any sub elements)
    // Currently only 'Commune With Nature' in the revised Player's Handbook (1995) has this property
    return true;
}

function setupAddPriestSpell(postfix) {
    if (!priestSpells[postfix])
        return;

    on(`clicked:add-spells-${postfix}`, function () {
        const section = `spells-${postfix}`;
        const field = 'spell-name';
        let sphereFields = ['sphere-major'];
        if (postfix.match(/[123]/))
            sphereFields.push("sphere-minor");

        TAS.repeating(section)
            .attrs([...sphereFields, ...BOOK_FIELDS, ...SPHERE_FIELDS])
            .fields(field)
            .reduce(function(knownSpells, row){
                knownSpells.add(row.S[field]);
                return knownSpells;
            }, new Set(), function (knownSpells,_,attrSet){
                let primarySpheres = parseSpheres(sphereFields.map(aField => attrSet.S[aField]), primarySphereRegex);
                let elementalSpheres = parseSpheres(sphereFields.map(aField => attrSet.S[aField]), elementalRegex);

                if (primarySpheres.size < 1) {
                    showToast(WARNING, 'No spheres found', `No valid spheres found. Please write or select some spheres`);
                    return;
                }

                let activeBooks = getActiveSettings(BOOK_FIELDS, attrSet);
                let optionalSpheres = getActiveSettings(SPHERE_FIELDS, attrSet);

                let spellsToAdd = [];
                for (const [spellName, spell] of Object.entries(priestSpells[postfix])) {
                    let isAvailable = isSpellAvailable(spellName, spell, primarySpheres, elementalSpheres, activeBooks, optionalSpheres);
                    if (isAvailable) {
                        spellsToAdd.push({name: spellName, book: spell['book']});
                    }
                }

                console.log(spellsToAdd);
                if (spellsToAdd.length < 1) {
                    showToast(ERROR, 'No spells found', `No spells found for the selected spheres`);
                    return;
                }

                spellsToAdd = spellsToAdd.filter(spell => !knownSpells.has(spell.name));
                console.log(spellsToAdd);
                if (spellsToAdd.length < 1) {
                    showToast(INFO, 'All spells added', `Found no more spells to add based on spheres`);
                    return;
                }

                let books = [...new Set(spellsToAdd.map(s => `\n • ${s.book}`))].join('');
                let toastObject = getToastObject(SUCCESS, 'Added new spells!', `Spells was added from the following books:${books}`);

                let newValue = {...toastObject};
                spellsToAdd.forEach(spell => {
                    let newrowid = generateRowID();
                    newValue[`repeating_${section}_${newrowid}_${field}`] = spell.name;
                });

                setAttrs(newValue);

            })
            .execute();
    });
}
//#endregion

//#region Wizard and Priest reset buttons
function resetCastSlots(row, castField, memField) {
    row.I[castField] = 0;
}

function resetCastAndMemSlots(row, castField, memField) {
    row.I[castField] = 0;
    row.I[memField] = 0;
}

function resetSpentSlots(row, castField, memField) {
    row.I[memField] = row.I[memField] - row.I[castField];
    row.I[castField] = 0;
}

function setupSpellSlotsReset(buttonName, tab, spellLevels, allSections) {
    let isPowers = !spellLevels || !tab;
    let attributes = ['spell-slot-reset-sections', 'spell-slot-reset-function']
    if (!isPowers)
        attributes.push(tab);

    on(`clicked:${buttonName}`, function () {

        getAttrs(attributes, function (values) {
            let resetSection = values['spell-slot-reset-sections'];
            let resetFunction = values['spell-slot-reset-function'];

            let sections = [];
            if (resetSection === 'all' || isPowers)
                sections = allSections;
            else if (resetSection === 'level') {
                let level = values[tab];
                if (!level)
                    return;

                let spellLevel = spellLevels.find(spellLevel => spellLevel.level === level);
                if (!spellLevel)
                    return;

                sections = spellLevel.sections || [];
            }

            if (!sections.length)
                return

            let updateFunction;
            if (resetFunction === '1' || isPowers)
                updateFunction = resetCastSlots;
            else if (resetFunction === '2')
                updateFunction = resetCastAndMemSlots;
            else if (resetFunction === '3')
                updateFunction = resetSpentSlots;

            if (!updateFunction)
                return;

            sections.forEach(section => {
                let repSection;
                let castField;
                let memField;
                if (isNewSpellSection(section)) {
                    repSection = `spells-${section}`;
                    castField = 'spell-cast-value';
                    memField = 'spell-memorized';
                } else {
                    repSection = `spells${section}`;
                    castField = `cast-value${section}`;
                    memField = `cast-max${section}`;
                }

                TAS.repeating(repSection)
                    .fields(castField, memField)
                    .each(function(row) {
                        updateFunction(row, castField, memField);
                    })
                    .execute();
            });
        });
    });
}
//#endregion

//#region Wizard and Priest spells and Powers setup
function setupAutoFillSpellInfo(section, spellsTable, levelFunc, optionalRulesFields) {
    if (!spellsTable[section])
        return;

    on(`change:repeating_spells-${section}:spell-name`, function (eventInfo) {
        let spell = spellsTable[section][eventInfo.newValue];
        if (!spell)
            return;

        getAttrs([...BOOK_FIELDS, ...optionalRulesFields], function(books) {
            if (bookInactiveShowToast(books, spell))
                return;

            let spellInfo = {
                [`repeating_spells-${section}_spell-cast-time`]    : spell['cast-time'],
                [`repeating_spells-${section}_spell-level`]        : levelFunc(spell['level']),
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
                [`repeating_spells-${section}_spell-reference`]    : `${spell['reference']}, ${spell['book']}`,
                [`repeating_spells-${section}_spell-subtlety`]     : spell['subtlety'] || '',
                [`repeating_spells-${section}_spell-sensory`]      : spell['sensory'] || '',
                [`repeating_spells-${section}_spell-knockdown`]    : spell['knockdown'] || '',
                [`repeating_spells-${section}_spell-knockdown`]    : spell['knockdown'] || '',
                [`repeating_spells-${section}_spell-crit-size`]    : spell['crit-size'] || '',
                [`repeating_spells-${section}_spell-effect`]       : spell['effect']
            };
            if (section.startsWith('wiz')) {
                let schoolRules = getActiveSettings(SCHOOL_FIELDS, books);
                spellInfo[`repeating_spells-${section}_spell-school`] = schoolRules.has(SCHOOL_SPELLS_AND_MAGIC)
                    ? spell[SCHOOL_SPELLS_AND_MAGIC] || spell['school']
                    : spell['school'];
            }
            if (section.startsWith('pri')) {
                let sphereRules = getActiveSettings(SPHERE_FIELDS, books);
                spellInfo[`repeating_spells-${section}_spell-sphere`] = getSpellSpheres(spell, sphereRules);
            }

            setAttrs(spellInfo);
        });
    });
}


let wizardSpellLevelsSections = [
    {level: '1', sections: ['', '2', '3', 'wiz1']},
    {level: '2', sections: ['4', '5', '6', 'wiz2']},
    {level: '3', sections: ['7', '8', '9', 'wiz3']},
    {level: '4', sections: ['10', '11', '12', 'wiz4']},
    {level: '5', sections: ['70', '71', '72', 'wiz5']}, //... legacy naming convention
    {level: '6', sections: ['13', '14', '15', 'wiz6']},
    {level: '7', sections: ['16', '17', '18', 'wiz7']},
    {level: '8', sections: ['19', '20', '21', 'wiz8']},
    {level: '9', sections: ['22', '23', '24', 'wiz9']},
    {level: '10', sections: ['25', '26', '27', 'wiz10']},
    {level: '11', sections: ['52', '53', '54', 'wiz11']}, //... legacy naming convention
    {level: '12', sections: ['55', '56', '57', 'wiz12']},
    {level: '13', sections: ['58', '59', '60', 'wiz13']},
    {level: '14', sections: ['61', '62', '63', 'wiz14']},
    {level: '15', sections: ['64', '65', '66', 'wiz15']},
];

let priestSpellLevelsSections = [
    {level: '1', sections: ['28', '29', '30', 'pri1']},
    {level: '2', sections: ['31', '32', '33', 'pri2']},
    {level: '3', sections: ['34', '35', '36', 'pri3']},
    {level: '4', sections: ['37', '38', '39', 'pri4']},
    {level: '5', sections: ['40', '41', '42', 'pri5']},
    {level: '6', sections: ['43', '44', '45', 'pri6']},
    {level: '7', sections: ['46', '47', '48', 'pri7']},
    {level: 'q', sections: ['49', '50', '51', 'priq']},
];

function wizardDisplayLevel(s) {
    return `Level ${s} Wizard`;
}
function priestDisplayLevel(s) {
    return s === 'q' ? 'Quest Spell Priest' : `Level ${s} Priest`;
}

// --- Start setup Spell Slots --- //
wizardSpellLevelsSections.forEach(spellLevel => {
    let prefix = `spell-level${spellLevel.level}`;
    setupStaticCalculateTotal(`${prefix}-total`, [`${prefix}-castable`, `${prefix}-specialist`, `${prefix}-misc`]);
    setupRepeatingSpellSumming(spellLevel.sections, 'cast-value', 'spell-cast-value', `${prefix}-cast-value-sum`);
    setupRepeatingSpellSumming(spellLevel.sections, 'cast-max', 'spell-memorized', `${prefix}-cast-max-sum`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-max-sum`, `${prefix}-selected`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-value-sum`, `${prefix}-remaining`);

    // Auto set spell info function
    let lastSection = spellLevel.sections[spellLevel.sections.length - 1];
    if (isNewSpellSection(lastSection)) {
        setupAutoFillSpellInfo(lastSection, wizardSpells, wizardDisplayLevel, SCHOOL_FIELDS);
        setupSpellCrit(lastSection);
    }
});
setupAutoFillSpellInfo('wizmonster', wizardSpells, wizardDisplayLevel, SCHOOL_FIELDS);
setupSpellCrit('wizmonster');

priestSpellLevelsSections.forEach(spellLevel => {
    let prefix = `spell-priest-level${spellLevel.level}`;
    setupStaticCalculateTotal(`${prefix}-total`, [`${prefix}-castable`, `${prefix}-wisdom`, `${prefix}-misc`]);
    setupRepeatingSpellSumming(spellLevel.sections, 'cast-value', 'spell-cast-value', `${prefix}-cast-value-sum`);
    setupRepeatingSpellSumming(spellLevel.sections, 'cast-max', 'spell-memorized', `${prefix}-cast-max-sum`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-max-sum`, `${prefix}-selected`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-value-sum`, `${prefix}-remaining`);

    // Auto set spell info function
    let lastSection = spellLevel.sections[spellLevel.sections.length - 1];
    if (isNewSpellSection(lastSection)) {
        setupAutoFillSpellInfo(lastSection, priestSpells, priestDisplayLevel, SPHERE_FIELDS);
        setupSpellCrit(lastSection);
        if (lastSection !== 'priq') {
            setupAddPriestSpell(lastSection);
        }
    }
});
setupAutoFillSpellInfo('primonster', priestSpells, priestDisplayLevel, SPHERE_FIELDS);
setupSpellCrit('primonster');
// --- End setup Spell Slots --- //

// --- Start setup Spell Points, Arc, and Wind --- //
let wizardSpellPoints = 'spell-points';
let arc = 'total-arc';
let allWizardSpellSections = wizardSpellLevelsSections.flatMap(sl => sl.sections);
setupStaticCalculateTotal(`${wizardSpellPoints}-total`, [`${wizardSpellPoints}-lvl`, `${wizardSpellPoints}-spc`, `${wizardSpellPoints}-int`]);
setupRepeatingSpellSumming(allWizardSpellSections, wizardSpellPoints, 'spell-points', `${wizardSpellPoints}-sum`, true);
setupRepeatingSpellSumming(allWizardSpellSections, 'arc', 'spell-arc', `${arc}-sum`, true);
setupCalculateRemaining(`${wizardSpellPoints}-total`, `${wizardSpellPoints}-sum`, `${wizardSpellPoints}-remaining`);
setupCalculateRemaining(arc, `${arc}-sum`, `${arc}-remaining`);

let priestSpellPoints = 'spell-points-priest';
let wind = 'total-wind';
let allPriestSpellSections = priestSpellLevelsSections.flatMap(sl => sl.sections);
setupStaticCalculateTotal(`${priestSpellPoints}-total`, [`${priestSpellPoints}-lvl`, `${priestSpellPoints}-wis`]);
setupRepeatingSpellSumming(allPriestSpellSections, priestSpellPoints, 'spell-points', `${priestSpellPoints}-sum`, true);
setupRepeatingSpellSumming(allPriestSpellSections, 'wind', 'spell-wind', `${wind}-sum`, true);
setupCalculateRemaining(`${priestSpellPoints}-total`, `${priestSpellPoints}-sum`, `${priestSpellPoints}-remaining`);
setupCalculateRemaining(wind, `${wind}-sum`, `${wind}-remaining`);
// --- End setup Spell Points, Arc, and Wind --- //

// --- Start setup reset buttons --- //
//tab6 = wizard levels
//tab7 = priest levels
setupSpellSlotsReset('reset-spent-slots-wiz', 'tab6', wizardSpellLevelsSections, allWizardSpellSections);
let allPriestSectionsExceptQuest = priestSpellLevelsSections.slice(0, -1).flatMap(sl => sl.sections);
setupSpellSlotsReset('reset-spent-slots-pri', 'tab7', priestSpellLevelsSections, allPriestSectionsExceptQuest);
// --- End setup reset buttons --- //

// --- Start setup Granted Powers --- //
let powerSpellSections = ['67', '68', '69'];
let spellPower = 'spell-power';
setupRepeatingSpellSumming(powerSpellSections, 'cast-value', '', `${spellPower}-sum`);
setupRepeatingSpellSumming(powerSpellSections, 'cast-max', '', `${spellPower}-available`);
setupCalculateRemaining(`${spellPower}-available`, `${spellPower}-sum`, `${spellPower}-remaining`);
setupSpellSlotsReset('reset-spent-slots-pow', null, null, powerSpellSections)
// --- End setup Granted Powers --- //
//#endregion

//#region Rogue skills
// --- Start setup Rogue skills total --- //
let rogueStandardSkills = ['pp', 'ol', 'rt', 'ms', 'hs', 'dn', 'cw', 'rl', 'ib'];
let rogueStandardColumns = ['b', 'r', 'd', 'k', 'm', 'l'];
rogueStandardSkills.forEach(skill => {
    setupStaticCalculateTotal(`${skill}t-hidden`, rogueStandardColumns.map(column => `${skill}${column}`));
    setupStaticCalculateTotal(`${skill}t`, [`${skill}t-hidden`], 95);
    setupStaticCalculateTotal(`${skill}noarmort`, [`${skill}t-hidden`, `${skill}noarmorb`], 95);
    setupStaticCalculateTotal(`${skill}armort`, [`${skill}t-hidden`, `${skill}armorp`], 95);
});

// Setup custom rogue skills total
setupRepeatingRowCalculateTotal('crt-hidden', rogueStandardColumns.map(column => `cr${column}`), 'customrogue');
setupRepeatingRowCalculateTotal('crt', ['crt-hidden'], 'customrogue', 95);
setupRepeatingRowCalculateTotal('crnoarmort', ['crt-hidden', 'crnoarmorb'], 'customrogue', 95);
setupRepeatingRowCalculateTotal('crarmort', ['crt-hidden', 'crarmorp'], 'customrogue', 95);
// --- End setup Rogue skills total --- //

//Rogue armor modifier auto fill
on('change:armorname', function(eventInfo) {
    let armor = rogueArmor[eventInfo.newValue];
    if (armor === undefined)
        return;

    let armorModifiers = {
        'pparmorp': armor['Pick Pockets'],
        'olarmorp': armor['Open Locks'] || '-0',
        'rtarmorp': armor['Find/Remove Traps'] || '-0',
        'msarmorp': armor['Move Silently'] || '-0',
        'hsarmorp': armor['Hide in Shadows'] || '-0',
        'dnarmorp': armor['Detect Noise'],
        'cwarmorp': armor['Climb Walls'],
    };
    setAttrs(armorModifiers);
});
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
//#endregion

//#region Weapons tab logic and autofil
//Used in version.js
const updateNonprofPenalty = function () {
    getAttrs(['nonprof-penalty'], function(values) {
        let nonprof = Math.abs(parseInt(values['nonprof-penalty'])) * -1;
        let famil = Math.floor(nonprof / 2)
        setAttrs({
            ['nonprof-penalty']: nonprof,
            ['famil-penalty']: famil
        },{silent:true});
    });
}
on('change:nonprof-penalty', function (eventInfo){
    updateNonprofPenalty();
});

//Used in version.js
const updateThac0 = (silent) => calculateFormula('thac0-base', 'thac0-base-calc', silent);
on('change:thac0-base', function(eventInfo) {
    updateThac0(false);
});

on('change:thac0-base-calc', function(eventInfo) {
    TAS.repeating('weapons')
        .fields('ThAC0')
        .each(function (row) {
            if (`${row['ThAC0']}` === `${eventInfo.previousValue}`)
                row['ThAC0'] = eventInfo.newValue;
        })
        .execute();

    TAS.repeating('weapons2')
        .fields('ThAC02')
        .each(function (row) {
            if (`${row['ThAC02']}` === `${eventInfo.previousValue}`)
                row['ThAC02'] = eventInfo.newValue;
        })
        .execute();
});

async function selectVersion(foundObjects, values, comparer, objectName) {
    let activeBooks = getActiveSettings(BOOK_FIELDS, values);
    let activeObjects = foundObjects.filter(w => w['book'].some(b => activeBooks.has(b)));
    if (activeObjects.length === 0) {
        await keepContextRoll();
        let booksString = foundObjects.flatMap(w => w['book']).map(b => '\n* ' + b).join('');
        showToast(ERROR, 'Missing Book(s)', `The book(s):${booksString}\nAre currently not active on your sheet.\nGo to the *Sheet Settings* and activate any of the listed book(s) (if your DM allows for its usage)`);
        return;
    }

    let isPlayersOption = values[PLAYERS_OPTION_FIELD] === '2';
    let isAllEqual = activeObjects.every(o => comparer(o, activeObjects[0], isPlayersOption));
    if (isAllEqual) {
        await keepContextRoll();
        return activeObjects[0];
    } else {
        activeObjects = combineBooks(activeObjects, comparer, isPlayersOption);
        let options = activeObjects
            .map((o, i) => `${o.book.join('/')},${i}`)
            .join('|');
        let answer = await extractRollResult(`?{Multiple versions of this ${objectName} exists. Please select a version|${options}}`);
        return activeObjects[answer];
    }
}

function combineBooks(activeObjects, comparer, isPlayersOptions) {
    // Copying fields from active object to avoid side effects being saved permanently
    let copyActiveObjects = activeObjects.map(e => {
        return {...e}
    });
    let copyArray = [...copyActiveObjects];

    copyActiveObjects.forEach(activeObject => {
        copyArray.forEach((copyObject, i) => {
            if (activeObject === copyObject) {
                delete copyArray[i];
                return;
            }
            if (!comparer(activeObject, copyObject, isPlayersOptions))
                return;

            activeObject['book'] = activeObject['book'].concat(copyObject['book']);
            delete copyActiveObjects[i];
        });
    });

    return copyActiveObjects.filter(Boolean);
}

//#region Weapons autofill
const PLAYERS_OPTION_FIELD = 'tab81';
function setWeaponWithBonus(weaponName, setWeaponFunc, comparer, thac0Field, category) {
    if (!weaponName)
        return;

    weaponName = weaponName.toLowerCase();
    let fields = [...BOOK_FIELDS, PLAYERS_OPTION_FIELD, thac0Field].filter(Boolean);
    getAttrs(fields, async function (values) {
        let bonus = 0;
        let baseWeapons = WEAPONS_TABLE[weaponName]
        if (!baseWeapons) {
            let match = weaponName.match(/\s*\+([0-9]+)\s*/);
            if (!match)
                return;

            let baseWeaponName = weaponName.replace(match[0], ' ').trim();
            baseWeapons = WEAPONS_TABLE[baseWeaponName];
            if (!baseWeapons)
                return;

            bonus = parseInt(match[1]);
            if (isNaN(bonus))
                return;
        }
        let weaponsInCategory = baseWeapons;
        if (category)
            weaponsInCategory = weaponsInCategory.filter(w => w['category'].includes(category));

        let baseWeapon = await selectVersion(weaponsInCategory, values, comparer, 'weapon');
        console.log(baseWeapon);
        if (!baseWeapon)
            return;

        let thac0 = parseInt(values[thac0Field]);
        thac0 = isNaN(thac0) ? 20 : thac0;

        let weapon = {
            ...baseWeapon,
            'thac0' : thac0,
        };
        if (bonus < 1) {
            weapon['bonus'] = '0';
            weapon['bonusInt'] = 0;
        } else {
            weapon['bonus'] = `+${bonus}`;
            weapon['bonusInt'] = bonus;
            weapon['speed'] = Math.max(weapon['speed'] - bonus, 0)
        }
        setWeaponFunc(weapon);
    });
}

//melee hit autofill
on('change:repeating_weapons:weaponname', function(eventInfo) {
    let comparer = function (weapon1, weapon2, isPlayersOption) {
        let compareFields = ['size','speed'];
        if (isPlayersOption)
            compareFields.push('reach');
        return compareFields.every(f => weapon1[f] === weapon2[f]) && _.isEqual(new Set(weapon1['type'].split('/')), new Set(weapon2['type'].split('/')));
    }
    let rowId = parseSourceAttribute(eventInfo).rowId;
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {};
        weaponInfo[`repeating_weapons_${rowId}_attackadj`]       = weapon['bonus'];
        weaponInfo[`repeating_weapons_${rowId}_ThAC0`]           = weapon['thac0'];
        weaponInfo[`repeating_weapons_${rowId}_range`]           = weapon['reach'] || 'Melee';
        weaponInfo[`repeating_weapons_${rowId}_size`]            = weapon['size'];
        weaponInfo[`repeating_weapons_${rowId}_weapspeed`]       = weapon['speed'];
        weaponInfo[`repeating_weapons_${rowId}_weaptype-slash`]  = weapon['type'].includes('S') ? 1 : 0;
        weaponInfo[`repeating_weapons_${rowId}_weaptype-pierce`] = weapon['type'].includes('P') ? 1 : 0;
        weaponInfo[`repeating_weapons_${rowId}_weaptype-blunt`]  = weapon['type'].includes('B') ? 1 : 0;

        setAttrs(weaponInfo);
    };
    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, comparer, 'thac0-base-calc', 'Melee');
});

//melee damage autofill
on('change:repeating_weapons-damage:weaponname1', function(eventInfo) {
    let comparer = function (weapon1, weapon2, isPlayersOption) {
        let fisk = ['small-medium','large'];
        if (isPlayersOption) {
            fisk.push('size');
            fisk.push('type');
            fisk.push('knockdown');
        }
        return fisk.every(f => weapon1[f] === weapon2[f])
    }
    let rowId = parseSourceAttribute(eventInfo).rowId;
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {};
        weaponInfo[`repeating_weapons-damage_${rowId}_damadj`]     = weapon['bonus'];
        weaponInfo[`repeating_weapons-damage_${rowId}_damsm`]      = weapon['small-medium'];
        weaponInfo[`repeating_weapons-damage_${rowId}_daml`]       = weapon['large'];
        weaponInfo[`repeating_weapons-damage_${rowId}_knockdown1`] = weapon['knockdown'] || '';
        weaponInfo[`repeating_weapons-damage_${rowId}_size`]       = weapon['size'];
        weaponInfo[`repeating_weapons-damage_${rowId}_type`]       = weapon['type'];

        setAttrs(weaponInfo);
    };

    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, comparer, '', 'Melee');
});

//range hit autofill
on('change:repeating_weapons2:weaponname2', function(eventInfo) {
    let comparer = function (weapon1, weapon2, isPlayersOption) {
        return ['strength','rof','range','size','speed'].every(f => weapon1[f] === weapon2[f]) && _.isEqual(new Set(weapon1['type'].split('/')), new Set(weapon2['type'].split('/')));
    }
    let rowId = parseSourceAttribute(eventInfo).rowId;
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {};
        weaponInfo[`repeating_weapons2_${rowId}_strbonus2`]        = weapon['strength'] ? 1 : 0;
        weaponInfo[`repeating_weapons2_${rowId}_attacknum2`]       = weapon['rof'] || '';
        weaponInfo[`repeating_weapons2_${rowId}_attackadj2`]       = weapon['bonus'];
        weaponInfo[`repeating_weapons2_${rowId}_ThAC02`]           = weapon['thac0'];
        weaponInfo[`repeating_weapons2_${rowId}_range2`]           = weapon['range'] || '';
        weaponInfo[`repeating_weapons2_${rowId}_size2`]            = weapon['size'];
        weaponInfo[`repeating_weapons2_${rowId}_weapspeed2`]       = weapon['speed'];
        weaponInfo[`repeating_weapons2_${rowId}_weaptype-slash2`]  = weapon['type'].includes('S') ? 1 : 0;
        weaponInfo[`repeating_weapons2_${rowId}_weaptype-pierce2`] = weapon['type'].includes('P') ? 1 : 0;
        weaponInfo[`repeating_weapons2_${rowId}_weaptype-blunt2`]  = weapon['type'].includes('B') ? 1 : 0;

        setAttrs(weaponInfo);
    };

    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, comparer, 'thac0-base-calc', 'Range');
});

//range damage autofill
on('change:repeating_ammo:ammoname', function(eventInfo) {
    let comparer = function (weapon1, weapon2, isPlayersOption) {
        let comparerFields = ['strength','small-medium','large'];
        let equalSets = true;
        if (isPlayersOption) {
            comparerFields.push('knockdown');
            comparerFields.push('size');
            comparerFields.push('ammo-size');
            equalSets = _.isEqual(new Set(weapon1['type'].split('/')), new Set(weapon2['type'].split('/')));
        }
        return comparerFields.every(f => weapon1[f] === weapon2[f]) && equalSets;
    }
    let rowId = parseSourceAttribute(eventInfo).rowId;
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {};
        weaponInfo[`repeating_ammo_${rowId}_strbonus3`]  = weapon['strength'] ? 1 : 0;
        weaponInfo[`repeating_ammo_${rowId}_damadj2`]    = weapon['bonus'];
        weaponInfo[`repeating_ammo_${rowId}_damsm2`]     = weapon['small-medium'];
        weaponInfo[`repeating_ammo_${rowId}_daml2`]      = weapon['large'];
        weaponInfo[`repeating_ammo_${rowId}_knockdown2`] = weapon['knockdown'] || '';
        weaponInfo[`repeating_ammo_${rowId}_size`]       = weapon['ammo-size'] || weapon['size'];
        weaponInfo[`repeating_ammo_${rowId}_type`]       = weapon['type'];

        setAttrs(weaponInfo);
    }
    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, comparer, '', 'Range');
});

//Follower weapons
function setupFollowerWeaponsAutoFill(repeating, sections) {
    let comparer = function (weapon1, weapon2, isPlayersOption) {
        let comparerFields = ['rof','small-medium','large','range','speed'];
        if (isPlayersOption) {
            comparerFields.push('reach');
        }
        return comparerFields.every(f => weapon1[f] === weapon2[f]) && _.isEqual(new Set(weapon1['type'].split('/')), new Set(weapon2['type'].split('/')));
    }

    sections.forEach(section => {
        let changePrefix = repeating ? `repeating_${repeating}:` : '';
        on(`change:${changePrefix}weaponnamehench${section}`, function(eventInfo) {
            let repeatingRowPrefix = repeating ? `repeating_${repeating}_${parseSourceAttribute(eventInfo).rowId}_` : '';
            let setWeaponFunc = function (weapon) {
                let weaponInfo = {};
                weaponInfo[`${repeatingRowPrefix}attacknumhench${section}`] = weapon['rof'] || '1';
                weaponInfo[`${repeatingRowPrefix}attackadjhench${section}`] = weapon['bonus'];
                weaponInfo[`${repeatingRowPrefix}damadjhench${section}`]    = weapon['bonus'];
                weaponInfo[`${repeatingRowPrefix}damsmhench${section}`]     = weapon['small-medium'];
                weaponInfo[`${repeatingRowPrefix}damlhench${section}`]      = weapon['large'];
                weaponInfo[`${repeatingRowPrefix}rangehench${section}`]     = weapon['range'] || weapon['reach'] || 'Melee';
                weaponInfo[`${repeatingRowPrefix}weaptypehench${section}`]  = weapon['type'];
                weaponInfo[`${repeatingRowPrefix}weapspeedhench${section}`] = weapon['speed'];

                setAttrs(weaponInfo);
            };
            setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, comparer);
        });
    });
}

const followerWeapons = [
    {repeating: '',       sections: ['',    '001', '002']},
    {repeating: 'hench',  sections: ['003', '004', '005']},
    {repeating: '',       sections: ['006', '007', '008']},
    {repeating: 'hench2', sections: ['009', '010', '011']},
    {repeating: '',       sections: ['012', '013', '014']},
    {repeating: 'hench3', sections: ['015', '016', '017']},
    {repeating: '',       sections: ['018', '019', '020']},
    {repeating: 'hench4', sections: ['021', '022', '023']},
    {repeating: '',       sections: ['024', '025', '026']},
    {repeating: 'hench5', sections: ['027', '028', '029']},
    {repeating: '',       sections: ['030', '031', '032']},
    {repeating: 'hench6', sections: ['033', '034', '035']},
];

followerWeapons.forEach(fw => {
    setupFollowerWeaponsAutoFill(fw.repeating, fw.sections);
});

// Monster weapons
on('change:repeating_monsterweapons:weaponname', function(eventInfo) {
    let rowId = parseSourceAttribute(eventInfo).rowId;
    let comparer = function (weapon1, weapon2, isPlayersOption) {
        let comparerFields = ['rof','small-medium','large','speed'];
        return comparerFields.every(f => weapon1[f] === weapon2[f]);
    }
    let setWeaponFunc = function (weapon) {
        if (weapon['bonusInt'] > 1) {
            weapon['small-medium'] += weapon['bonus'];
            weapon['large'] += weapon['bonus'];
            weapon['thac0'] = weapon['thac0'] - weapon['bonusInt'];
        }
        let weaponInfo = {
            [`repeating_monsterweapons_${rowId}_attacknum`] : weapon['rof'] || '1',
            [`repeating_monsterweapons_${rowId}_ThAC0`]     : weapon['thac0'],
            [`repeating_monsterweapons_${rowId}_damsm`]     : weapon['small-medium'],
            [`repeating_monsterweapons_${rowId}_daml`]      : weapon['large'],
            [`repeating_monsterweapons_${rowId}_weapspeed`] : weapon['speed'],
        };

        setAttrs(weaponInfo);
    };

    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, comparer,'monsterthac0');
});
//#endregion

on('clicked:grenade-miss', async function (eventInfo) {
    getAttrs(['character_name'], async function(values) {
        let characterName = values['character_name'];
        let finalRollText = '&{template:2Egrenademiss} ';
        let grenade = await extractQueryResult('?{What grenade have been thrown?|Acid|Holy water|Oil (lit)|Poison|Other}');
        switch (grenade) {
            case 'Acid':       finalRollText += `{{name=Acid}} {{aoe=[[1]]}} {{aoesplash=[[1+6]]}} {{hitdmg=[Damage](~${characterName}|acid-hit)}} {{splashdmg=[Damage](~${characterName}|acid-splash)}}`; break;
            case 'Holy water': finalRollText += `{{name=Holy water}} {{aoe=[[1]]}} {{aoesplash=[[1+6]]}} {{hitdmg=[Damage](~${characterName}|holy-water-hit)}} {{splashdmg=[Damage](~${characterName}|holy-water-splash)}}`; break;
            case 'Oil (lit)':  finalRollText += `{{name=Oil (lit)}} {{aoe=[[3]]}} {{aoesplash=[[3+6]]}} {{hitdmg=[Round 1](~${characterName}|oil-lit-hit1) [Round 2](~${characterName}|oil-lit-hit2)}} {{splashdmg=[Damage](~${characterName}|oil-lit-splash)}}`; break;
            case 'Poison':     finalRollText += `{{name=Poison}} {{aoe=[[1]]}} {{aoesplash=[[1+6]]}} {{hitdmg=Special}} {{splashdmg=Special}}`; break;
            case 'Other': {
                let name   = await extractQueryResult('?{Grenade name}');
                let aoe    = await extractQueryResult('?{Area of effect (Diameter in feet)|1}');
                let damage = await extractQueryResult('?{Direct damage|1d6}');
                let splash = await extractQueryResult('?{Splash damage|1d3}');

                var customGrenade = {}
                customGrenade['custom-grenade-name'] = name;
                customGrenade['custom-grenade-hit'] = damage;
                customGrenade['custom-grenade-splash'] = splash;
                setAttrs(customGrenade);

                finalRollText += `{{name=${name}}} {{aoe=[[${aoe}]]}} {{aoesplash=[[${aoe}+6]]}} {{hitdmg=[Damage](~${characterName}|custom-grenade-hit)}} {{splashdmg=[Damage](~${characterName}|custom-grenade-splash)}}`;
            }
        }
        let distanceName = await extractQueryResult('?{How far was it thrown?|Short|Medium|Long}');
        finalRollText += `{{direction=[[1d10]]}} {{distancename=${distanceName}}} `;
        switch (distanceName) {
            case 'Short': finalRollText += '{{distance=[[1d6]]}} '; break;
            case 'Medium': finalRollText += '{{distance=[[1d10]]}} '; break;
            case 'Long': finalRollText += '{{distance=[[2d10]]}} '; break;
        }
        finalRollText += '{{hit=[[0]]}} {{splash=[[0]]}} ';
        console.log(finalRollText);
        startRoll(finalRollText, function (roll) {
            console.log(roll);
            let computedRolls = {
                hit: 0,
                splash: 0
            };

            // See if monster is within direct hit
            if (roll.results.distance.result <= roll.results.aoe.result / 2) {
                computedRolls.hit = 1;
            } else if (roll.results.distance.result <= roll.results.aoesplash.result / 2) {
                computedRolls.splash = 1;
            }
            console.log(computedRolls);
            finishRoll(roll.rollId, computedRolls);
        });
    });
});

const INJURY_REGEX = /Graze|Singed|Chilled|Struck|Injured|Burn|Frostbit|Broken|Crushed|Shattered|Frozen|(?<!Armor|Shield|Helm|is) Destroyed|Severed|Dissolved|Incinerated|(Minor|Major|Severe)(?: internal)? Bleeding/gmi

on('clicked:repeating_weapons-damage:crit2', function(eventInfo) {
    console.log(eventInfo);
    let prefix = 'repeating_weapons-damage_';
    let fields = [
        'strbonus1','dexbonus1','weaponname1',
        'specialist-damage','mastery-damage','damadj',
        'damsm','daml','size','type'
    ].map(s => prefix+s);

    let nameFunc = (values) => values[prefix+'weaponname1'];
    let baseDamageFunc = (targetSize, values) => sizeToInt(targetSize) < 3
        ? values[prefix+'damsm']
        : values[prefix+'daml'];
    let damageAdjFunc = (values) => [
        `(${values[prefix+'damadj']})`,
        `({${values[prefix+'specialist-damage']},${values[prefix+'mastery-damage']}}kh1)`,
        `((@{strengthdmg})*${values[prefix+'strbonus1']})`,
        `((@{dexmissile})*${values[prefix+'dexbonus1']})`,
        '(@{temp-damadj})',
        '(@{misc-mod})'
    ].join('+');

    weaponPoCritTemplate(prefix, fields, nameFunc, baseDamageFunc, damageAdjFunc)
});

on('clicked:repeating_ammo:crit2', function (eventInfo) {
    console.log(eventInfo);
    let prefix = 'repeating_ammo_';
    let fields = [
        `strbonus3`,`dexbonus3`,`ammoname`,
        'specialist-damage2','mastery-damage2','damadj2',
        'damsm2','daml2','size','type'
    ].map(s => prefix+s);

    let nameFunc = (values) => values[prefix+'ammoname'];
    let baseDamageFunc = (targetSize, values) => sizeToInt(targetSize) < 3
        ? values[prefix+'damsm2']
        : values[prefix+'daml2'];
    let damageAdjFunc = (values) => [
        `(${values[prefix+'damadj2']})`,
        `((@{strengthdmg})*${values[prefix+'strbonus3']})`,
        `((@{dexmissile})*${values[prefix+'dexbonus3']})`,
        `({${values[prefix+'specialist-damage2']},${values[prefix+'mastery-damage2']}}kh1)`,
        '(@{temp-damadj})',
        '(@{misc-mod})'
    ].join('+');

    weaponPoCritTemplate(prefix, fields, nameFunc, baseDamageFunc, damageAdjFunc)
});

const SPELL_HITS_REGEX = /\((\dd\d\+?\d?|\d) hit/i;

async function debugSeverity(severityDice) {
    return false
        ? parseInt(await extractQueryResult('?{Debug severity|1}'))
        : await extractRollResult(severityDice);
}

function lookupEffect(severityRoll, spellTypeTable, generalLocation, targetType, set) {
    let effect;
    let additionalHit = {};
    if (severityRoll < 4) {
        effect = 'No unusual effect';
    } else if (severityRoll < 13) {
        effect = spellTypeTable[generalLocation][severityRoll];
    } else {
        effect = spellTypeTable[generalLocation][12];
        if (spellTypeTable[generalLocation][13]) {
            effect += spellTypeTable[generalLocation][13];
        } else {
            additionalHit = SPELL_CRIT_13_EFFECT_TABLE[targetType][generalLocation];
            effect += additionalHit.description;
        }
    }

    critEffectExplanations(effect, set);
    effect = `[[${severityRoll}]]: ${effect}`;
    return {
        effect: effect,
        additionalLocations: additionalHit.locations
    };
}

async function recursiveAdditionalHit(additionalLocations, iteration, additionalString, severityDice, boolObj, spellTypeTable, targetType, rollBuilder, set) {
    if (!additionalLocations)
        return;

    let additionalLocationRoll = await extractRollResult('1d100');
    let additionalLocation = additionalLocations.find(l => additionalLocationRoll <= l.chance);
    let displayAdditionalLocationRoll = additionalLocations.length === 1
        ? ''
        :`(1d100:${additionalLocationRoll})`;
    let severityRoll = await debugSeverity(severityDice);
    let generalLocation = additionalLocation.general;
    let specificLocation = additionalLocation.specific;
    let locationNote = '';
    if (targetType !== 'Humanoid' && generalLocation === 'Legs' && !boolObj.isSnakeLike) {
        boolObj.isSnakeLike = await extractQueryResult('?{Is the target snake-like or fish-like?|No|Yes}');
    }
    if (targetType !== 'Humanoid' && generalLocation === 'Legs' && boolObj.isSnakeLike === 'Yes') {
        generalLocation = 'Tail';
        specificLocation = 'Tail';
        locationNote = SPELL_CRIT_13_EFFECT_TABLE[targetType]['Tail'].note;
    }
    let effectObj = lookupEffect(severityRoll, spellTypeTable, generalLocation, targetType, set);
    let displayAdditionalEffect = `Location ${iteration}, ${additionalString} hit, hitting **${specificLocation}** ${locationNote} ${displayAdditionalLocationRoll}=${effectObj.effect}`;
    rollBuilder.push(displayAdditionalEffect);

    return await recursiveAdditionalHit(effectObj.additionalLocations, iteration, additionalString+' additional', severityDice, boolObj, spellTypeTable, targetType, rollBuilder, set);
}

function setupSpellCrit(section) {
    let prefix = `repeating_spells-${section}_`;
    let fields = [
        'spell-name','spell-damage-type','spell-crit-size'
    ];
    on(`clicked:repeating_spells-${section}:spell-crit2`, function (eventInfo) {
        console.log(eventInfo);
        let attrFields = fields.map(s => prefix+s);
        getAttrs(attrFields, async function (values) {
            let rollBuilder = ['character=@{character_name}'];
            rollBuilder.push(`name=${values[prefix+'spell-name']}`);

            let errors = [];

            let lookupType;
            let displayType = values[prefix+'spell-damage-type'];
            switch (displayType.toLowerCase().trim()) {
                case 'acid':
                    lookupType = 'Acid';
                    break;
                case 'cold':
                    lookupType = 'Cold';
                    break;
                case 'construction':
                    lookupType = 'Constriction';
                    break;
                case 'crushing':
                    lookupType = 'Crushing';
                    break;
                case 'electricity':
                case 'lightning':
                    lookupType = 'Electricity';
                    break;
                case 'fire':
                    lookupType = 'Fire';
                    break;
                case 'impact':
                    lookupType = 'Impact';
                    break;
                case 'slashing':
                    lookupType = 'Slashing';
                    break;
                case 'vibration':
                    lookupType = 'Vibration';
                    break;
                case 'wounding':
                    lookupType = 'Wounding';
                    break;
                default:
                    lookupType = displayType = await extractQueryResult('?{What damage type does the magic inflict?' +
                        '|Acid' +
                        '|Cold' +
                        '|Crushing' +
                        '|Electricity/Lightning,Electricity' +
                        '|Fire' +
                        '|Impact' +
                        '|Slashing' +
                        '|Vibration' +
                        '|Wounding' +
                        '|Not viable}');
                    break;
            }

            let spellTypeTable = SPELL_CRIT_EFFECT_TABLE[lookupType];
            if (!spellTypeTable)
                errors.push('damage type');
            rollBuilder.push(`type=${displayType.trim()}`);

            let targetType = await extractQueryResult('?{What are you attacking?|Humanoid|Animal|Monster}');
            let targetSize = await extractQueryResult('?{Target size?|Medium|Tiny|Small|Medium|Large|Huge|Gargantuan}');
            rollBuilder.push(`target=${targetType}`);
            rollBuilder.push(`targetsize=${targetSize}`);

            let size = values[prefix+'spell-crit-size'];

            let spellSizeCategory;
            switch (size.split(' (')[0]) {
                case 'Medium':
                case 'Moderate':
                    spellSizeCategory = 2;
                    break;
                case 'Large':
                    spellSizeCategory = 3;
                    break;
                case 'Huge':
                    spellSizeCategory = 4;
                    break;
                case 'Gargantuan':
                    spellSizeCategory = 5;
                    break;
                case '':
                case 'None':
                    spellSizeCategory = 0;
                    size = 'None';
                    errors.push('size');
                    break;
                default:
                    let sizeString = await extractQueryResult('?{What size is the spell?' +
                        '|1 Target or 5´ sq. or 2´ rad = Medium (1 hit),2' +
                        '|2-9 Targets or 30´ sq. or 15´ rad = Large (1d3 hits),3' +
                        '|10+ Targets or 40´ sq. or 20´ rad = Huge (1d4 hits),4' +
                        '|40+ Targets or 100´ sq. or 40´ rad = Gargantuan (1d6+1 hits),5}');
                    spellSizeCategory = parseInt(sizeString);
            }
            rollBuilder.push(`size=${size}`);

            let hits = 0;
            let hitDice = '';
            let rollMatch = size.match(SPELL_HITS_REGEX); // roll
            let rangeMatch = size.match(/\((\d)-(\d) hit/i); // range
            let rollMatch2;
            if (SPELL_SIZE_MAP[spellSizeCategory])
                rollMatch2 = SPELL_SIZE_MAP[spellSizeCategory].match(SPELL_HITS_REGEX);

            async function sizeReduction(rollMatch) {
                if (targetSize === 'Huge') {
                    rollMatch = SPELL_SIZE_MAP[Math.max(spellSizeCategory - 1, 2)].match(SPELL_HITS_REGEX);
                    hitDice = `(${rollMatch[1]}) `;
                }
                if (targetSize === 'Gargantuan') {
                    rollMatch = SPELL_SIZE_MAP[Math.max(spellSizeCategory - 2, 2)].match(SPELL_HITS_REGEX);
                    hitDice = `(${rollMatch[1]}) `;
                }
                return await extractRollResult(rollMatch[1]);
            }

            if (rollMatch) {
                hits = await sizeReduction(rollMatch);
            } else if (rangeMatch) {
                let lower = parseInt(rangeMatch[1]);
                let higher = parseInt(rangeMatch[2]);
                let hitQuery = '';
                for (let i = lower; i <= higher; i++) {
                    hitQuery += `|${i}`
                }
                let hitsString = await extractQueryResult(`?{How many hits?${hitQuery}}`);
                hits = parseInt(hitsString);
            } else if (rollMatch2) {
                hits = await sizeReduction(rollMatch2)
            } else if (!size || size === 'None') {
                hits = 0;
            } else {
                let hitsString = await extractQueryResult(`?{How many hits?|1}`);
                hits = await extractRollResult(hitsString);
            }

            let attackType = await extractQueryResult(`?{How are you attacking?|Regular Attack|Low Attack|High Attack${spellSizeCategory === 2 ? '|Called Shot' : ''}}`);
            rollBuilder.push(`attack=${attackType}`);

            let locationDice;
            let locationRolls = [];
            let set = new Set();
            if (attackType === 'Called Shot' && hits === 1) {
                let locationList = [];
                for (const [key, value] of Object.entries(LOCATION_TABLE[targetType])) {
                    let specificLocation = value.specific;
                    if (!set.has(specificLocation)) {
                        set.add(specificLocation)
                        locationList.push(`${specificLocation},${key}`)
                    }
                }
                set.clear();
                locationRolls.push(await extractQueryResult(`?{Where are you hitting?|${locationList.join('|')}}`));
            } else {
                switch (attackType) {
                    case 'Regular Attack': locationDice = '1d10'; break;
                    case 'Low Attack': locationDice = '1d6'; break;
                    case 'High Attack': locationDice = '1d6+4'; break;
                }
                for (let i = 0; i < hits; i++) {
                    locationRolls.push(await extractRollResult(locationDice));
                }
            }

            let severityDice = await extractQueryResult('?{How severe is the effect?' +
                '|Minor 1d6 (Max. potential damage is less than ½ target max hp),1d6' +
                '|Major 2d4 (Max. potential damage is less than target max hp),2d4' +
                '|Severe 2d6 (Max. potential damage is less than twice target max hp),2d6' +
                '|Mortal 2d8 (Max. potential damage is twice or more target max hp),2d8}');
            switch (severityDice) { // optional to add this
                case '1d6': rollBuilder.push(`severity=Minor`); break;
                case '2d4': rollBuilder.push(`severity=Major`); break;
                case '2d6': rollBuilder.push(`severity=Severe`); break;
                case '2d8': rollBuilder.push(`severity=Mortal`); break;
            }

            if (hits > 0 && errors.length === 0)
                rollBuilder.push(`hits=Hitting ${hitDice}[[${hits}]] location${hits > 1 ? 's':''} and rolling ${severityDice} for effect`);
            else
                rollBuilder.push(`hits=Cannot show effects due to missing fields: ${errors.join(', ')}`);

            let boolObj = {};
            if (spellTypeTable) {
                for (let i = 0; i < locationRolls.length; i++) {
                    let locationRoll = locationRolls[i];
                    let locationObject = LOCATION_TABLE[targetType][locationRoll];
                    let locationNote = '';
                    if (targetType !== 'Humanoid' && locationObject.general === 'Legs' && !boolObj.isSnakeLike) {
                        boolObj.isSnakeLike = await extractQueryResult('?{Is the target snake-like or fish-like?|No|Yes}');
                    }
                    if (targetType !== 'Humanoid' && locationObject.general === 'Legs' && boolObj.isSnakeLike === 'Yes') {
                        locationObject = LOCATION_TABLE[targetType][5];
                        locationNote = locationObject.note;
                    }

                    let severityRoll = await debugSeverity(severityDice);
                    let displayLocationRoll = attackType === 'Called Shot'
                        ? ''
                        : `(${locationDice}:${locationRoll})`;
                    let {effect, additionalLocations} = lookupEffect(severityRoll, spellTypeTable, locationObject.general, targetType, set);
                    let displayEffect = `Location ${i+1} hitting the **${locationObject.specific}** ${locationNote} ${displayLocationRoll}=${effect}`;
                    rollBuilder.push(displayEffect);

                    await recursiveAdditionalHit(additionalLocations, i+1, 'additional', severityDice, boolObj, spellTypeTable, targetType, rollBuilder, set);
                }
            }

            let displayHits = rollBuilder.map(s => `{{${s}}}`).join(' ');
            let displayInjuries = Array.from(set).map(s => `{{${s}}}`).join(' ');
            let finalRollText = `&{template:2Epocrit} ${displayHits} ${displayInjuries}`;

            console.log(finalRollText);

            startRoll(finalRollText, function (roll) {
                console.log(roll);
                let computedRolls = {};
                finishRoll(roll.rollId, computedRolls);
            });
        });
    });
}

function critEffectExplanations(critEffect, set) {
    let injuryMatch = critEffect.match(INJURY_REGEX);
    if (!injuryMatch)
        return;

    injuryMatch = injuryMatch.map(s => s.toLowerCase().replace('internal ', '').trim())
        .filter((v, i, a) => a.indexOf(v) === i);
    injuryMatch.forEach(key => {
        switch (key) {
            case 'graze':
            case 'singed':
            case 'chilled':
                set.add('grazed=1');
                break;
            case 'struck':
                set.add('struck=1');
                break;
            case 'injured':
            case 'burn':
            case 'frostbit':
                set.add('injured=1');
                break;
            case 'broken':
                set.add('broken=1');
                break;
            case 'crushed':
            case 'shattered':
            case 'destroyed':
                set.add('crushed=1');
                break;
            case 'frozen':
                set.add('crushed=1');
                set.add('frozen=1');
                break;
            case 'severed':
            case 'dissolved':
            case 'incinerated':
                set.add('severed=1');
                break;
            case 'minor bleeding':
                set.add('minorbleeding=1');
                set.add('bleedingnote=1');
                break;
            case 'major bleeding':
                set.add('majorbleeding=1');
                set.add('bleedingnote=1');
                break;
            case 'severe bleeding':
                set.add('severebleeding=1');
                set.add('bleedingnote=1');
                break;
        }
    });
}

function weaponPoCritTemplate(prefix, fields, nameFunc, baseDamageFunc, damageAdjFunc) {
    getAttrs(fields, async function (values) {
        let rollBuilder = ['character=@{character_name}'];
        let errors = [];

        let weaponName = nameFunc(values);
        let weaponSize = displaySize(values[prefix+'size']);
        if (weaponName.match(/heavy (crossbow|quarrel|bolt)/i)) {
            weaponSize = 'Large';
        } else if (weaponName.match(/arrow|quarrel|bolt/i)) {
            weaponSize = 'Medium';
        }
        let weaponType = values[prefix+'type'];
        if (weaponType.includes('/')) {
            let displayTypes = weaponType.split('/')
                .map(s => displayWeaponType(s))
                .join('|');

            weaponType = await extractQueryResult(`?{How are your attack with your weapon?|${displayTypes}}`);
        } else {
            weaponType = displayWeaponType(weaponType);
        }
        rollBuilder.push(`name=${weaponName}`);
        rollBuilder.push(`size=${weaponSize}`);
        rollBuilder.push(`type=${weaponType}`);

        let targetType = await extractQueryResult('?{What are you attacking?|Humanoid|Animal|Monster}');
        let targetSize = await extractQueryResult('?{Target size?|Medium|Tiny|Small|Medium|Large|Huge|Gargantuan}');
        rollBuilder.push(`target=${targetType}`);
        rollBuilder.push(`targetsize=${targetSize}`);

        let attackType = await extractQueryResult('?{How are you attacking?|Regular Attack|Low Attack|High Attack|Called Shot}');
        rollBuilder.push(`attack=${attackType}`);

        let locationDice = '';
        let locationRoll;
        let set = new Set();
        if (attackType === 'Called Shot') {
            let locationList = [];
            for (const [key, value] of Object.entries(LOCATION_TABLE[targetType])) {
                let specificLocation = value.specific;
                if (!set.has(specificLocation)) {
                    set.add(specificLocation)
                    locationList.push(`${specificLocation},${key}`)
                }
            }
            set.clear();
            locationRoll = await extractQueryResult(`?{Where are you hitting?|${locationList.join('|')}}`);
        } else {
            switch (attackType) {
                case 'Regular Attack': locationDice = '1d10'; break;
                case 'Low Attack': locationDice = '1d6'; break;
                case 'High Attack': locationDice = '1d6+4'; break;
            }
            locationRoll = await extractRollResult(locationDice);
        }

        let locationObject = LOCATION_TABLE[targetType][locationRoll];
        let locationNote = '';
        if (locationRoll < 5 && targetType !== 'Humanoid') {
            let isSnakeLike = await extractQueryResult('?{Is the target snakelike or fishlike?|No|Yes}');
            if (isSnakeLike === "Yes") {
                locationObject = LOCATION_TABLE[targetType][5];
                locationNote = locationObject.note;
            }
        }

        let severityDice;
        const sizeDiff = sizeToInt(weaponSize) - sizeToInt(targetSize);
        if (sizeDiff < 0) {
            rollBuilder.push(`severity=Minor`);
            severityDice = '1d6';
        } else if (sizeDiff === 0) {
            rollBuilder.push(`severity=Major`);
            severityDice = '2d4';
        } else if (sizeDiff === 1) {
            rollBuilder.push(`severity=Severe`);
            severityDice = '2d6';
        } else if (sizeDiff > 1) {
            rollBuilder.push(`severity=Mortal`);
            severityDice = '2d8';
        }
        let severityRoll = await extractRollResult(severityDice);

        let critEffect = '';
        let weaponTypeTable = WEAPON_CRIT_EFFECT_TABLE[weaponType];
        if (weaponTypeTable) {
            if (severityRoll < 4) {
                critEffect = 'No unusual effect'
            } else if (locationObject) {
                let severityLookup = severityRoll > 12 ? 12 : severityRoll;
                critEffect = weaponTypeTable[targetType][locationObject.general][severityLookup];
            } else {
                critEffect = 'No unusual effect';
            }

            let displayLocationRoll = attackType === 'Called Shot'
                ? ''
                : `(${locationDice}:${locationRoll})`;
            rollBuilder.push(`Hitting the **${locationObject.specific}** ${locationNote} ${displayLocationRoll} and rolling ${severityDice} for effect=[[${severityRoll}]]: ${critEffect}`);
            critEffectExplanations(critEffect, set);
        } else {
            errors.push('weapon type');
        }

        let weaponDamage = baseDamageFunc(targetSize, values);
        if (weaponDamage.match(/\d/)) {
            let damage;
            if (severityRoll > 12) {
                rollBuilder.push(`multiplier=(Triple)`);
                damage = `(${weaponDamage})*3`;
            } else if (critEffect.includes('triple') && await extractQueryResult('?{Is the target wearing armor?|Yes|No}') === 'No') {
                rollBuilder.push(`multiplier=(Triple)`);
                damage = `(${weaponDamage})*3`;
            } else {
                rollBuilder.push(`multiplier=(Double)`);
                damage = `(${weaponDamage})*2`;
            }
            rollBuilder.push(`damage=[[${damage}+[[${damageAdjFunc(values)}]] ]]`);
        }

        if (errors.length > 0)
            rollBuilder.push(`hits=Cannot show effects due to missing fields: ${errors.join(', ')}`);

        let displayHits = rollBuilder.map(s => `{{${s}}}`).join(' ');
        let displayInjuries = Array.from(set).map(s => `{{${s}}}`).join(' ');
        let finalRollText = `&{template:2Epocrit} ${displayHits} ${displayInjuries}`;

        console.log(finalRollText);

        startRoll(finalRollText, function (roll) {
            console.log(roll);
            let computedRolls = {};
            finishRoll(roll.rollId, computedRolls);
        });
    });
}
//#endregion

//#region Proficiencies
//Weapon proficiency slots
//Used in version.js
const updateWeaponProfsTotal = () => calculateFormula('weapprof-slots-total', 'weapprof-slots-total-calc');
on('change:weapprof-slots-total', function (eventInfo) {
    updateWeaponProfsTotal();
});
const updateWeaponProfsRemaining = () => repeatingCalculateRemaining('weaponprofs', ['weapprofnum'], 'weapprof-slots-total-calc', 'weapprof-slots-remain');
on('change:repeating_weaponprofs:weapprofnum remove:repeating_weaponprofs change:weapprof-slots-total-calc', function(eventInfo) {
    if (doEarlyReturn(eventInfo, ['weapprofnum']))
        return;
    updateWeaponProfsRemaining();
});
//Weapon proficiency autofill
on('change:repeating_weaponprofs:weapprofname', function(eventInfo) {
    let weaponProficiency = weaponProficiencies[eventInfo.newValue];
    if (!weaponProficiency)
        return;

    getAttrs(BOOK_FIELDS, function (books) {
        if (bookInactiveShowToast(books, weaponProficiency))
            return;

        setAttrs({
            'repeating_weaponprofs_weapprofnum'  : weaponProficiency['slots'],
        });
    });
});

//Nonweapon proficiency slots
//Used in version.js
const updateNonWeaponProfsTotal = () => calculateFormula('prof-slots-total', 'prof-slots-total-calc');
on('change:prof-slots-total', function (eventInfo) {
    updateNonWeaponProfsTotal();
});
const updateNonWeaponProfsRemaining = () => repeatingCalculateRemaining('profs', ['profslots'], 'prof-slots-total-calc', 'prof-slots-remain');
on('change:repeating_profs:profslots remove:repeating_profs change:prof-slots-total-calc', function(eventInfo){
    if (doEarlyReturn(eventInfo, ['profslots']))
        return;
    updateNonWeaponProfsRemaining();
});
//Nonweapon proficiency autofill
on('change:repeating_profs:profname', function (eventInfo) {
    let nonweaponProficiencies = NONWEAPON_PROFICIENCIES_TABLE[eventInfo.newValue];
    if (!nonweaponProficiencies)
        return;

    let comparer = function (nonweaponProf1, nonweaponProf2, isPlayersOption) {
        return ['slots','abilityScore','modifier'].every(f => nonweaponProf1[f] === nonweaponProf2[f])
    }

    getAttrs(BOOK_FIELDS, async function (books) {
        let nonweaponProficiency = await selectVersion(nonweaponProficiencies, books, comparer, 'nonweapon proficiency');
        console.log(nonweaponProficiency);
        if (!nonweaponProficiency)
            return;

        let rowId = parseSourceAttribute(eventInfo).rowId;

        let nonweaponProfInfo = {};
        nonweaponProfInfo[`repeating_profs_${rowId}_profslots`]   = nonweaponProficiency['slots'];
        nonweaponProfInfo[`repeating_profs_${rowId}_profstatnum`] = nonweaponProficiency['abilityScore'];
        nonweaponProfInfo[`repeating_profs_${rowId}_profmod`]     = nonweaponProficiency['modifier'];
        setAttrs(nonweaponProfInfo);
    });
});

//#region Special Talents
on('change:repeating_talents:talentname', function (eventInfo) {
    let talent = TALENTS[eventInfo.newValue];
    if (!talent)
        return;
    let abilityField = talent['abilityScore'].replace(/[@{}]|N\/A/g, '').toLowerCase();
    let subAbilityField = talent['subAbilityScore'].replace(/[@{}]/g, '').toLowerCase();
    let fields = [abilityField, subAbilityField, ...BOOK_FIELDS].filter(Boolean);
    getAttrs(fields, function (values) {
        if (bookInactiveShowToast(values, talent))
            return;
        let abilityScore;
        let abilityScoreString;
        if (values[subAbilityField]) {
            abilityScore = parseInt(values[subAbilityField]) || 0;
            abilityScoreString = talent['subAbilityScore'];
        } else {
            abilityScore = parseInt(values[abilityField]) || 0;
            abilityScoreString = talent['abilityScore'];
        }

        let newValue = {};
        newValue['repeating_talents_talentslots'] = talent['slots'];
        newValue['repeating_talents_talentpoints'] = talent['points'];
        newValue['repeating_talents_talentstatnum'] = abilityScoreString;
        newValue['repeating_talents_talentmod'] = talent['modifier'];
        newValue['repeating_talents_talentrating'] = talent['rating'] || '';
        newValue['repeating_talents_talentratingmod'] = ABILITY_MODIFIERS[abilityScore] || 0;
        setAttrs(newValue);
    });
});

on('change:repeating_talents:talentslots change:repeating_talents:talentpoints remove:repeating_talents', function (eventInfo) {
    if (doEarlyReturn(eventInfo, ['talentslots']) && doEarlyReturn(eventInfo, ['talentpoints']))
        return;
    if (isSheetWorkerUpdate(eventInfo) && eventInfo.triggerName.includes('talentpoints'))
        return;

    TAS.repeating('talents')
        .attrs('talent-slots-spent','talent-spent')
        .fields('talentslots','talentpoints')
        .reduce(function(m,r){
            m.slots+=(r.I['talentslots']);
            m.points+=(r.I['talentpoints']);
            return m;

        },{slots:0,points:0},function(m,r,a){
            a.I['talent-slots-spent']=m.slots;
            a.I['talent-spent']=m.points;
        })
        .execute();
});

on('change:repeating_talents:talentstatnum', async function (eventInfo) {
    if (isSheetWorkerUpdate(eventInfo))
        return;

    let parse = parseSourceAttribute(eventInfo);
    getAttrs(['repeating_talents_talentstatnum'], async function (values) {
        let abilityScore = values['repeating_talents_talentstatnum'];
        if (!abilityScore.startsWith('@') && isNaN(parseInt(abilityScore)))
            return;

        let abilityScoreValue = await extractRollResult(abilityScore);

        let newValue = {};
        newValue[`repeating_talents_${parse.rowId}_talentratingmod`] = ABILITY_MODIFIERS[abilityScoreValue] || 0;
        setAttrs(newValue);
    });
});
//#endregion

//#region Traits
on('change:repeating_traits:traitname', function (eventInfo) {
    let trait = TRAITS[eventInfo.newValue];
    if (!trait)
        return;
    let subAbilityField = trait['subAbilityScore'].replace(/[@{}]|N\/A/g, '').toLowerCase();
    let fields = [subAbilityField, ...BOOK_FIELDS].filter(Boolean);
    getAttrs(fields, function (values) {
        if (bookInactiveShowToast(values, trait))
            return;
        let abilityScoreString = values[subAbilityField]
            ? trait['subAbilityScore']
            : trait['abilityScore'];

        let newValue = {};
        newValue['repeating_traits_traitpoints'] = trait['points'];
        newValue['repeating_traits_traitstatnum'] = abilityScoreString;
        setAttrs(newValue);
    });
});

on('change:repeating_traits:traitpoints remove:repeating_traits', function (eventInfo) {
    if (doEarlyReturn(eventInfo, ['traitpoints']))
        return;
    TAS.repeatingSimpleSum('traits', 'traitpoints', 'trait-spent');
});
//#endregion

//#region Disadvantages
on('change:repeating_disads:disadname', function (eventInfo) {
    let disadvantage = DISADVANTAGES[eventInfo.newValue];
    if (!disadvantage)
        return;
    let subAbilityField = disadvantage['subAbilityScore'].replace(/(ceil)?[\(\)@{}/2]/g, '').toLowerCase();
    let fields = [subAbilityField, ...BOOK_FIELDS].filter(Boolean);
    getAttrs(fields, async function (values) {
        if (bookInactiveShowToast(values, disadvantage))
            return;
        let abilityScoreString = values[subAbilityField]
            ? disadvantage['subAbilityScore']
            : disadvantage['abilityScore'];

        let newValue = {};
        newValue[`repeating_disads_disadpoints`] = disadvantage['points'];
        newValue[`repeating_disads_disadstatnum`] = abilityScoreString;
        setAttrs(newValue);
    });
});
on('change:repeating_disads:disadpoints remove:repeating_disads', function (eventInfo) {
    if (doEarlyReturn(eventInfo, ['disadpoints']))
        return;
    TAS.repeatingSimpleSum('disads', 'disadpoints', 'disadvantage-gained');
});
//#endregion

//#region Equipment
//Equipment Carried Section
on('change:repeating_gear:gearweight change:repeating_gear:gearqty remove:repeating_gear', function(eventInfo){
    if (doEarlyReturn(eventInfo, ['gearweight', 'gearqty']))
        return;
    repeatingMultiplySum('gear', 'gearweight', 'gearqty', 'gearweighttotal', 2);
});

//Equipment Stored Section
on('change:repeating_gear-stored:gear-stored-weight change:repeating_gear-stored:gear-stored-qty change:repeating_gear-stored:on-mount remove:repeating_gear-stored', function(eventInfo){
    if (doEarlyReturn(eventInfo, ['gear-stored-weight', 'gear-stored-qty']))
        return;

    TAS.repeating('gear-stored')
        .attrs('mount-gear-weight-total','stored-gear-weight-total')
        .fields('on-mount','gear-stored-weight','gear-stored-qty')
        .reduce(function(m,r){
            m.allgearweight+=(r.F['gear-stored-weight'] * r.I['gear-stored-qty']);
            m.mountgearweight+=(r.F['gear-stored-weight'] * r.I['gear-stored-qty'] * r.I['on-mount']);
            return m;

        },{allgearweight:0,mountgearweight:0},function(m,r,a){
            a.D[2]['mount-gear-weight-total']=m.mountgearweight;
            a.D[2]['stored-gear-weight-total']=(m.allgearweight-m.mountgearweight);
        })
        .execute();
})
//#endregion

on(`change:repeating_gem:gemvalue change:repeating_gem:gemqty remove:repeating_gem`, function(eventInfo) {
    if (doEarlyReturn(eventInfo, ['gemvalue', 'gemqty']))
        return;
    repeatingMultiplySum('gem', 'gemvalue', 'gemqty', 'gemstotalvalue');
})

// Psionic tabs, control hidden or visible options
const setPsionicDisciplineVisibility = function(newValue) {
    let elements = $20('.sheet-section-psionics .sheet-hidden');
    if (newValue === "1") {
        elements.addClass('sheet-show');
    } else {
        elements.removeClass('sheet-show');
    }
}
on('change:tab8', function (eventInfo) {
    setPsionicDisciplineVisibility(eventInfo.newValue);
});
on('sheet:opened', function () {
    getAttrs(['tab8'], function (values) {
        setPsionicDisciplineVisibility(values['tab8']);
    })
});

// Fix for Roll20 not handling quotes correctly from sheet.json
const fixQuotes = function (currentValue, attribute, event) {
    if (currentValue.includes('’')) {
        let newValue = {};
        newValue[attribute] = currentValue.replaceAll('’', '\'');
        console.log(`${attribute} was updated via ${event}`);
        setAttrs(newValue,{silent:true});
    }
}

on(BOOK_FIELDS.map(b => `change:${b}`).join(' '), function (eventInfo) {
    if (eventInfo.newValue) {
        fixQuotes(eventInfo.newValue, eventInfo.sourceAttribute, "eventInfo.newValue");
    } else {
        getAttrs([eventInfo.sourceAttribute], function (values) {
            fixQuotes(values[eventInfo.sourceAttribute], eventInfo.sourceAttribute, "getAttrs");
        });
    }
});

// --- ALL SHEET WORKERS END --- //