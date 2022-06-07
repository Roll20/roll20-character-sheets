// --- ALL SHEET WORKERS START --- //
const SUCCESS = 'success';
const INFO = 'info';
const WARNING = 'warning';
const ERROR = 'error';

const BOOK_FIELDS = [
    'book-phb', 'book-tcfhb', 'book-tcthb', 'book-tcprhb', 'book-tcwhb',
    'book-tom', 'book-aaeg',
    'book-dwarves', 'book-bards', 'book-elves', 'book-humanoids', 'book-rangers',
    'book-paladins', 'book-druids', 'book-barbarians', 'book-necromancers', 'book-ninjas'
];

const SCHOOL_FIELDS = ['school-spells&magic'];
const SPHERE_FIELDS = ['sphere-druids', 'sphere-necromancers', 'sphere-spells&magic'];

//#region Helper function
function capitalizeFirst(s) {
    if (typeof s !== 'string')
        return '';

    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const displaySize = function(size) {
    if (typeof size !== 'string')
        return '';

    size = size.toLowerCase();
    switch (size) {
        case 't': return 'Tiny';
        case 'tiny': return 'Tiny';
        case 's': return 'Small';
        case 'small': return 'Small';
        case 'm': return 'Medium';
        case 'medium': return 'Medium';
        case 'l': return 'Large';
        case 'large': return 'Large';
        case 'h': return 'Huge';
        case 'huge': return 'Huge';
        case 'g': return 'Gargantuan';
        case 'gargantuan': return 'Gargantuan';
        default: capitalizeFirst(size);
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
        default: capitalizeFirst(type);
    }
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
    return settingFields.map(bField => values[bField])
        .filter(Boolean)
        .filter(book => book !== '0')
}

const isBookInactive = function (books, obj) {
    let activeBooks = getActiveSettings(BOOK_FIELDS, books);
    return !activeBooks.includes(obj['book']);
}

const bookInactiveShowToast = function(books, obj) {
    let bookInactive = isBookInactive(books, obj);
    if (bookInactive)
        showToast(ERROR, 'Missing Book', `The book *${obj['book']}* is currently not active on your sheet.\nGo to the *Sheet Settings* and activate the book (if your DM allows for its usage)`);
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
function setupCalculateTotal(totalField, fieldsToSum, maxValue) {
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
                let rowId = eventInfo.sourceAttribute.split('_')[2];
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
           : ` {{checkvs=Open Locked/Barred/Magical Doors Check}}`;
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
    let sphere = spell['sphere'];
    sphereRules.forEach(rule => sphere += spell[rule] || '');
    return sphere;
}

function isSpellAvailable(spellName, spell, availableSpheres, elementalSpheres, activeBooks, optionalSpheres) {
    if (!activeBooks.includes(spell['book']))
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
                [`repeating_spells-${section}_spell-effect`]       : spell['effect']
            };
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
    setupCalculateTotal(`${prefix}-total`, [`${prefix}-castable`, `${prefix}-specialist`, `${prefix}-misc`]);
    setupRepeatingSpellSumming(spellLevel.sections, 'cast-value', 'spell-cast-value', `${prefix}-cast-value-sum`);
    setupRepeatingSpellSumming(spellLevel.sections, 'cast-max', 'spell-memorized', `${prefix}-cast-max-sum`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-max-sum`, `${prefix}-selected`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-value-sum`, `${prefix}-remaining`);

    // Auto set spell info function
    let lastSection = spellLevel.sections[spellLevel.sections.length - 1];
    if (isNewSpellSection(lastSection)) {
        setupAutoFillSpellInfo(lastSection, wizardSpells, wizardDisplayLevel, []);
    }
});
setupAutoFillSpellInfo("wizmonster", wizardSpells, wizardDisplayLevel, []);

priestSpellLevelsSections.forEach(spellLevel => {
    let prefix = `spell-priest-level${spellLevel.level}`;
    setupCalculateTotal(`${prefix}-total`, [`${prefix}-castable`, `${prefix}-wisdom`, `${prefix}-misc`]);
    setupRepeatingSpellSumming(spellLevel.sections, 'cast-value', 'spell-cast-value', `${prefix}-cast-value-sum`);
    setupRepeatingSpellSumming(spellLevel.sections, 'cast-max', 'spell-memorized', `${prefix}-cast-max-sum`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-max-sum`, `${prefix}-selected`);
    setupCalculateRemaining(`${prefix}-total`, `${prefix}-cast-value-sum`, `${prefix}-remaining`);

    // Auto set spell info function
    let lastSection = spellLevel.sections[spellLevel.sections.length - 1];
    if (isNewSpellSection(lastSection)) {
        setupAutoFillSpellInfo(lastSection, priestSpells, priestDisplayLevel, SPHERE_FIELDS);
        if (lastSection !== 'priq') {
            setupAddPriestSpell(lastSection);
        }
    }
});
setupAutoFillSpellInfo("primonster", priestSpells, priestDisplayLevel, SPHERE_FIELDS);
// --- End setup Spell Slots --- //

// --- Start setup Spell Points, Arc, and Wind --- //
let wizardSpellPoints = 'spell-points';
let arc = 'total-arc';
let allWizardSpellSections = wizardSpellLevelsSections.flatMap(sl => sl.sections);
setupCalculateTotal(`${wizardSpellPoints}-total`, [`${wizardSpellPoints}-lvl`, `${wizardSpellPoints}-spc`, `${wizardSpellPoints}-int`]);
setupRepeatingSpellSumming(allWizardSpellSections, wizardSpellPoints, 'spell-points', `${wizardSpellPoints}-sum`, true);
setupRepeatingSpellSumming(allWizardSpellSections, 'arc', 'spell-arc', `${arc}-sum`, true);
setupCalculateRemaining(`${wizardSpellPoints}-total`, `${wizardSpellPoints}-sum`, `${wizardSpellPoints}-remaining`);
setupCalculateRemaining(arc, `${arc}-sum`, `${arc}-remaining`);

let priestSpellPoints = 'spell-points-priest';
let wind = 'total-wind';
let allPriestSpellSections = priestSpellLevelsSections.flatMap(sl => sl.sections);
setupCalculateTotal(`${priestSpellPoints}-total`, [`${priestSpellPoints}-lvl`, `${priestSpellPoints}-wis`]);
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
    setupCalculateTotal(`${skill}t-hidden`, rogueStandardColumns.map(column => `${skill}${column}`));
    setupCalculateTotal(`${skill}t`, [`${skill}t-hidden`], 95);
    setupCalculateTotal(`${skill}noarmort`, [`${skill}t-hidden`, `${skill}noarmorb`], 95);
    setupCalculateTotal(`${skill}armort`, [`${skill}t-hidden`, `${skill}armorp`], 95);
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

//#region Weapons autofill
function setWeaponWithBonus(weaponName, setWeaponFunc, thac0Field, isMonster) {
    if (!weaponName)
        return;

    weaponName = weaponName.toLowerCase();
    let fields = [...BOOK_FIELDS, thac0Field].filter(x => x !== undefined);
    getAttrs(fields, function(values) {
        let thac0 = parseInt(values[thac0Field]);
        thac0 = isNaN(thac0) ? 20 : thac0;

        let baseWeapon = weapons[weaponName]
        if (baseWeapon) {
            if (bookInactiveShowToast(values, baseWeapon))
                return;

            setWeaponFunc({
                ...baseWeapon,
                'thac0' : thac0,
                'bonus' : '0'
            });
            return;
        }

        let match = weaponName.match(/\s*\+([0-9]+)\s*/);
        if (!match)
            return;

        let baseWeaponName = weaponName.replace(match[0], ' ').trim();
        baseWeapon = weapons[baseWeaponName];
        if (!baseWeapon)
            return;

        if (bookInactiveShowToast(values, baseWeapon))
            return;

        let bonusString = match[1];
        let bonus = parseInt(bonusString)
        if (isNaN(bonus))
            return;

        if (bonus < 1) {
            setWeaponFunc({
                ...baseWeapon,
                'thac0' : thac0,
                'bonus' : '0'
            });
            return;
        }

        let weaponWithBonus = {
            ...baseWeapon,
            'thac0' : thac0,
            'speed' : Math.max(baseWeapon['speed'] - bonus, 0),
            'bonus' : `+${bonus}`
        }
        if (isMonster) {
            weaponWithBonus['small-medium'] += `+${bonus}`;
            weaponWithBonus['large'] += `+${bonus}`;
            weaponWithBonus['thac0'] = thac0 - bonus;
        }

        setWeaponFunc(weaponWithBonus);
    });
}

//melee hit autofill
on('change:repeating_weapons:weaponname', function(eventInfo) {
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {
            'repeating_weapons_attackadj'      : weapon['bonus'],
            'repeating_weapons_ThAC0'          : weapon['thac0'],
            'repeating_weapons_range'          : 'Melee',
            'repeating_weapons_size'           : weapon['size'],
            'repeating_weapons_weapspeed'      : weapon['speed'],
            'repeating_weapons_weaptype-slash' : weapon['type'].includes('S') ? 1 : 0,
            'repeating_weapons_weaptype-pierce': weapon['type'].includes('P') ? 1 : 0,
            'repeating_weapons_weaptype-blunt' : weapon['type'].includes('B') ? 1 : 0,
        };

        setAttrs(weaponInfo);
    };
    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, 'thac0-base-calc');
});

//melee damage autofill
on('change:repeating_weapons-damage:weaponname1', function(eventInfo){
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {
            'repeating_weapons-damage_damadj'     : weapon['bonus'],
            'repeating_weapons-damage_damsm'      : weapon['small-medium'],
            'repeating_weapons-damage_daml'       : weapon['large'],
            'repeating_weapons-damage_knockdown1' : weapon['knockdown'] || ''
        };

        setAttrs(weaponInfo);
    };

    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc);
});

//range hit autofill
on('change:repeating_weapons2:weaponname2', function(eventInfo){
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {
            'repeating_weapons2_strbonus2'        : weapon['strength'] ? 1 : 0,
            'repeating_weapons2_attacknum2'       : weapon['rof'] || '',
            'repeating_weapons2_attackadj2'       : weapon['bonus'],
            'repeating_weapons2_ThAC02'           : weapon['thac0'],
            'repeating_weapons2_range2'           : weapon['range'] || '',
            'repeating_weapons2_size2'            : weapon['size'],
            'repeating_weapons2_weapspeed2'       : weapon['speed'],
            'repeating_weapons2_weaptype-slash2'  : weapon['type'].includes('S') ? 1 : 0,
            'repeating_weapons2_weaptype-pierce2' : weapon['type'].includes('P') ? 1 : 0,
            'repeating_weapons2_weaptype-blunt2'  : weapon['type'].includes('B') ? 1 : 0,
        };

        setAttrs(weaponInfo);
    };

    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, 'thac0-base-calc');
});

//range damage autofill
on('change:repeating_ammo:ammoname', function(eventInfo){
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {
            'repeating_weapons2_strbonus3'        : weapon['strength'] ? 1 : 0,
            'repeating_ammo_damadj2'              : weapon['bonus'],
            'repeating_ammo_damsm2'               : weapon['small-medium'],
            'repeating_ammo_daml2'                : weapon['large'],
            'repeating_weapons-damage_knockdown2' : weapon['knockdown'] || ''
        };

        setAttrs(weaponInfo);
    }
    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc);
});

//Follower weapons
function setupFollowerWeaponsAutoFill(repeating, sections) {
    let prefix = '';
    let onChange = '';
    if (repeating !== '') {
        prefix = `repeating_${repeating}_`
        onChange = `repeating_${repeating}:`
    }

    sections.forEach(section => {
        on(`change:${onChange}weaponnamehench${section}`, function(eventInfo) {
            let setWeaponFunc = function (weapon) {
                let weaponInfo = {
                    [`${prefix}attacknumhench${section}`]: weapon['rof'] || '1',
                    [`${prefix}attackadjhench${section}`]: weapon['bonus'],
                    [`${prefix}damadjhench${section}`]: weapon['bonus'],
                    [`${prefix}damsmhench${section}`]: weapon['small-medium'],
                    [`${prefix}damlhench${section}`]: weapon['large'],
                    [`${prefix}rangehench${section}`]: weapon['range'] || 'Melee',
                    [`${prefix}weaptypehench${section}`]: weapon['type'],
                    [`${prefix}weapspeedhench${section}`]: weapon['speed'],
                };

                setAttrs(weaponInfo);
            };
            setWeaponWithBonus(eventInfo.newValue, setWeaponFunc);
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
    setupFollowerWeaponsAutoFill(fw.repeating, fw.sections)
});

// Monster weapons
on('change:repeating_monsterweapons:weaponname', function(eventInfo){
    let setWeaponFunc = function (weapon) {
        let weaponInfo = {
            [`repeating_monsterweapons_attacknum`] : weapon['rof'] || '1',
            [`repeating_monsterweapons_ThAC0`]     : weapon['thac0'],
            [`repeating_monsterweapons_damsm`]     : weapon['small-medium'],
            [`repeating_monsterweapons_daml`]      : weapon['large'],
            [`repeating_monsterweapons_weapspeed`] : weapon['speed'],
        };

        setAttrs(weaponInfo);
    };

    setWeaponWithBonus(eventInfo.newValue, setWeaponFunc, 'monsterthac0', true);
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
    let nonweaponProficiency = nonweaponProficiencies[eventInfo.newValue];
    if (!nonweaponProficiency)
        return;

    getAttrs(BOOK_FIELDS, function (books) {
        if (bookInactiveShowToast(books, nonweaponProficiency))
            return;

        setAttrs({
            'repeating_profs_profslots'  : nonweaponProficiency['slots'],
            'repeating_profs_profstatnum': nonweaponProficiency['abilityScore'],
            'repeating_profs_profmod'    : nonweaponProficiency['modifier'],
        });
    });
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

        },{allgearweight:0,mountgearweight:0, desc: []},function(m,r,a){
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