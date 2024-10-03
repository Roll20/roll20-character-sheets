// --- Version change start --- //

const SHEET_NAME = 'AD&D 2E Revised';
const SHEET_VERSION = '4.21.0';

on('sheet:opened', function(){
    getAttrs(['character_sheet'],function(attrs){
        let cs=(attrs.character_sheet||'').match(/(.*)\s+v(.*)/) || [];
        let sheet_name=cs[1] || '';
        let sheet_version=cs[2] || '0.0.0';

        if(sheet_name !== SHEET_NAME || sheet_version !== SHEET_VERSION) {
            console.log(`Updating character sheet from ${sheet_version} to ${SHEET_VERSION}`);
            setAttrs({
                character_sheet: `${SHEET_NAME} v${SHEET_VERSION}`,
                version: `v${SHEET_VERSION}`,
                announcement: 1
            },{silent:true});

            //#region Migrations

            let oldSheetVersion = new SheetVersion(sheet_version);

            // Starting with the oldest version, just in case some field has been moved from A -> B, B -> C
            if (oldSheetVersion.isBelowMigrate(3, 3, 0))
                migrate3_3_0();

            if (oldSheetVersion.isBelowMigrate(3, 3, 2))
                migrate3_3_2();

            if (oldSheetVersion.isBelowMigrate(4, 3, 0))
                migrate4_3_0();

            if (oldSheetVersion.isBelowMigrate(4, 16, 0))
                migrate4_16_0();

            if (oldSheetVersion.isBelowMigrate(4, 17, 0))
                migrate4_17_0();

            if (oldSheetVersion.isBelowMigrate(4, 18, 0))
                migrate4_18_0();
        }
    });
});

// --- Version change end --- //

//#region Helpers
function SheetVersion(sheetVersionString) {
    let splitVersions = sheetVersionString.match(/(\d+)\.(\d+)\.(\d+)/) || [];
    this.major = parseInt(splitVersions[1]) || 0;
    this.minor = parseInt(splitVersions[2]) || 0;
    this.bug   = parseInt(splitVersions[3]) || 0;
    this.isBelowMigrate = function (migrateMajor, migrateMinor, migrateBug) {
        if (this.major < migrateMajor)
            return true;
        if (this.major > migrateMajor)
            return false;

        if (this.minor < migrateMinor)
            return true;
        if (this.minor > migrateMinor)
            return false;

        return this.bug < migrateBug;
    }
}

function moveStaticToRepeating(section, fieldsToMove) {
    getAttrs(fieldsToMove, function (values) {
        if (values[fieldsToMove[0]]) {

            console.log(`${fieldsToMove[0]} has a value. Moving static to repeating`);

            let newrowid = generateRowID();
            let newValue = {};

            for (const [field, value] of Object.entries(values)) {
                newValue[`repeating_${section}_${newrowid}_${field}`] = value;
                newValue[field] = '';
            }

            setAttrs(newValue);
        }
    });
}
//#endregion

//#region verison 4.18.0
function migrate4_18_0() {
    console.log('Migrate to v4.18.0');
    TAS.repeating('hench5')
        .attrs('psionclai-science-macro527','psionclair-science-macro527')
        .fields('psiontelepathic-macro505','psiontelepathic-science-macro505')
        .each(function (row) {
            let macro = row.S['psiontelepathic-macro505'].trim();
            if (macro !== '') {
                console.log('Moved macro from psiontelepathic-macro505 to psiontelepathic-science-macro505');
                row.S['psiontelepathic-science-macro505'] = macro;
            }
        }, function (rowSet, attrSet) {
            let macro = attrSet.S['psionclai-science-macro527'].trim();
            if (macro !== '') {
                console.log('Moved macro from psionclai-science-macro527 to psionclair-science-macro527');
                attrSet.S['psionclair-science-macro527'] = macro;
            }
        }).execute();
}
//#endregion

//#region version 4.17.0
function migrate4_17_0() {
    console.log('Migrate to v4.17.0');
    calculateFormula('rogue-level-base', 'rogue-level-total');
    TAS.repeating('customrogue')
        .attrs(ROGUE_STANDARD_SKILLS.flatMap(skill => [`${skill}armorp`, `${skill}a`]))
        .fields('cra','crarmorp')
        .each(function (row) {
            let armorValue = row.I['crarmorp'];
            if (armorValue === 0)
                return

            console.log(`Moving value ${armorValue} from crarmorp to cra`);
            row.I['cra'] = armorValue;
        }, function (rowSet, attrSet) {
            ROGUE_STANDARD_SKILLS.forEach(skill => {
                let armorValue = attrSet.I[`${skill}armorp`];
                if (armorValue === 0)
                    return;

                attrSet.I[`${skill}a`] = armorValue;
                console.log(`Moving value ${armorValue} from ${skill}armorp to ${skill}a`);
            })
        })
        .execute(function () {
            let allRogueSkills = ROGUE_STANDARD_SKILLS.concat(ROGUE_EXTRA_SKILLS).flatMap(skill => ROGUE_SKILL_COLUMNS.map(c => `${skill}${c}`));

            getAttrs(allRogueSkills, function (values) {
                let newValue = {};

                ROGUE_STANDARD_SKILLS.concat(ROGUE_EXTRA_SKILLS).forEach(skill => {
                    let totalField = `${skill}t`;
                    let total = 0;
                    ROGUE_SKILL_COLUMNS.forEach(c => {
                        let skillNumber = parseInt(values[`${skill}${c}`]) || 0;
                        total += skillNumber;
                    });
                    if (total !== 0) {
                        console.log(`Updating ${totalField} to ${total}`);
                        newValue[totalField] = total;
                    }
                });

                setAttrs(newValue);
            });
        });
}
//#endregion

//#region version 4.16.0
function migrate4_16_0() {
    console.log('Migrating to v4.16.0');
    // Ensure the calculated psionic ability score value is set for existing sheets
    getAttrs(['constitution','intelligence','wisdom','psion-con-mod','psion-int-mod','psion-wis-mod'], function (values) {
        let newValue = {};
        newValue['constitution-psi'] = (parseInt(values['constitution']) || 0) + (parseInt(values['psion-con-mod']) || 0);
        newValue['intelligence-psi'] = (parseInt(values['intelligence']) || 0) + (parseInt(values['psion-int-mod']) || 0);
        newValue['wisdom-psi'] = (parseInt(values['wisdom']) || 0) + (parseInt(values['psion-wis-mod']) || 0);

        setAttrs(newValue, {silent: true});
    });
}

//#region version 4.3.0
let oldCurrencySections = [['2', 'Dragonlance'], ['3', 'Dark Sun'], ['4', 'Ravenloft'], ['5', 'Maztica'], ['6', 'BirthRight']];
let fieldArray = ['gemdesc', 'gemvalue', 'gemqty', 'gemsizecut'];
function migrate4_3_0() {
    console.log('Migrating to v4.3.0');
    migrateGems();
    migrateOtherValuables();
}

function migrateGems() {
    moveStaticToRepeating('gem', fieldArray) // Move Standard static gem
    oldCurrencySections.forEach(section => {
        let index = section[0];
        let name = section[1];
        let oldGemFields = fieldArray.map(s => `${s}${index}`);
        let sectionName = `gem${index}`;
        let gemdesc = `gemdesc${index}`;
        let gemsizecut = `gemsizecut${index}`;
        let gemvalue = `gemvalue${index}`;
        let gemqty = `gemqty${index}`;
        TAS.repeating(sectionName)
            .attrs(oldGemFields)
            .fields(oldGemFields)
            .reduce(function (memo, row) {
                if ((row.hasOwnProperty(gemdesc) && row.S[gemdesc]) ||
                    (row.hasOwnProperty(gemsizecut) && row.S[gemsizecut]) ||
                    (row.hasOwnProperty(gemvalue) && row.F[gemvalue]) ||
                    (row.hasOwnProperty(gemqty) && row.F[gemqty])) {
                    console.log(`Moving repeating gem: '${row[gemdesc]}'`)

                    memo.push(oldGemFields.map(field => row[field] || ''));
                    removeRepeatingRow(`repeating_${sectionName}_${row.id}`);
                }
                return memo;
            }, [], function (memo, rowSet, attrSet) {
                let newValue = {};
                if ((attrSet.hasOwnProperty(gemdesc) && attrSet.S[gemdesc]) ||
                    (attrSet.hasOwnProperty(gemsizecut) && attrSet.S[gemsizecut]) ||
                    (attrSet.hasOwnProperty(gemvalue) && attrSet.F[gemvalue]) ||
                    (attrSet.hasOwnProperty(gemqty) && attrSet.F[gemqty])) {
                    console.log(`Moving static gem: '${attrSet[gemdesc]}'`)

                    memo.splice(0, 0, oldGemFields.map(field => attrSet[field]));
                    newValue[gemdesc] = '';
                    newValue[gemvalue] = '';
                    newValue[gemqty] = '';
                    newValue[gemsizecut] = '';
                }
                if (memo.length > 0) {
                    memo.splice(0, 0, [`--${name}--`, '', '', '---------']);
                }
                memo.forEach(gem => {
                    let newrowid = generateRowID();
                    newValue[`repeating_gem_${newrowid}_gemdesc`] = gem[0];
                    newValue[`repeating_gem_${newrowid}_gemvalue`] = gem[1];
                    newValue[`repeating_gem_${newrowid}_gemqty`] = gem[2];
                    newValue[`repeating_gem_${newrowid}_gemsizecut`] = gem[3];
                })
                setAttrs(newValue);
            })
            .execute();
    })
}

function migrateOtherValuables() {
    let newValue = {};
    let allCurrencySections = [['']].concat(oldCurrencySections);
    let valuablesFields = allCurrencySections.map(s => `otherval${s[0]}`);
    let gpFields = allCurrencySections.map(s => `othervalue${s[0]}`);
    getAttrs(gpFields.concat(valuablesFields), function(values) {
        let total = 0;
        let valuablesString = '';
        gpFields.forEach(field => {
            if (values[field]) {
                total += parseInt(values[field]) || 0;
                newValue[field] = '';
            }
        });
        if (total !== 0)
            newValue['othervalue'] = total;

        valuablesFields.forEach(field => {
            let oldValue = values[field] || '';
            if (oldValue) {
                if (valuablesString) {
                    valuablesString += '\n\n';
                }

                if (field === 'otherval') { // Standard case, no name needed
                    valuablesString += oldValue;
                } else {
                    let index = field.slice(-1);
                    let array = oldCurrencySections.find(arr => arr[0] === index);
                    valuablesString += `--- ${array[1]} ---\n${oldValue}`;
                    newValue[field] = '';
                }
            }
        });
        if (valuablesString)
            newValue['otherval'] = valuablesString;

        if (!_.isEmpty(newValue))
            setAttrs(newValue);
    });
}
//#endregion

//#region version 3.3.2
function migrate3_3_2() {
    console.log('Migrating to v3.3.2');
    moveStaticToRepeating('weaponprofs', ['weapprofname', 'weapprofnum', 'expert', 'specialist', 'mastery', 'high-mastery', 'grand-mastery', 'chosen-weapon']);
    moveStaticToRepeating('profs', ['profname', 'profslots', 'profstatnum', 'profmod']);
    moveStaticToRepeating('langs', ['langname', 'lang-rw']);
    moveStaticToRepeating('gear', ['geardesc', 'gearweight', 'gearqty', 'gearloc']);
    moveStaticToRepeating('gear-stored', ['gear-stored-desc', 'gear-stored-weight', 'gear-stored-qty', 'gear-stored-loc', 'on-mount']);
    moveStaticToRepeating('magicres', ['magresname', 'magrestar', 'magresmod', 'magresnotes']);

    //ranged weapons
    moveStaticToRepeating('weapons2', ['weaponname2', 'strbonus2', 'dexbonus2', 'prof-level2', 'range-mod-attack', 'attacknum2', 'attackadj2', 'ThAC02', 'crit-thresh2', 'range2', 'size2', 'weaptype-slash2', 'weaptype-pierce2', 'weaptype-blunt2', 'weapspeed2']);
    moveStaticToRepeating('ammo', ['ammoname', 'strbonus3', 'dexbonus3', 'specialist-damage2', 'mastery-damage2', 'damadj2', 'damsm2', 'daml2', 'knockdown2', 'ammoremain']);

    //melee damage weapons
    moveStaticToRepeating('weapons', ['weaponname', 'strbonus', 'dexbonus', 'prof-level', 'attacknum', 'attackadj', 'ThAC0', 'crit-thresh', 'range', 'size', 'weaptype-slash', 'weaptype-pierce', 'weaptype-blunt', 'weapspeed']);
    moveStaticToRepeating('weapons-damage', ['weaponname1', 'strbonus1', 'dexbonus1', 'specialist-damage', 'mastery-damage', 'damadj', 'damsm', 'daml', 'knockdown1']);
}
//#endregion

//#region version 3.3.0
function migrate3_3_0() {
    console.log('Migrating to v3.3.0');
    getAttrs(['spell-points', 'spell-points-priest'], function(values) {
        let sp = parseInt(values['spell-points']) || 0;
        let psp = parseInt(values['spell-points-priest']) || 0;

        let newValue = {};
        if (sp > 0) {
            console.log(`Old spell points: ${sp}`);
            newValue['spell-points-lvl'] = sp;
            newValue['spell-points'] = '';
        }

        if (psp > 0) {
            console.log(`Old spell points priest: ${psp}`);
            newValue['spell-points-priest-lvl'] = psp;
            newValue['spell-points-priest'] = '';
        }

        setAttrs(newValue);
    });

    TAS.repeating('spells')
        .fields('spell-points', 'spell-points1', 'arc', 'arc1')
        .each(function (r) {
            console.log('Updating repeating spells-points and arc');
            r['spell-points'] = (r.I['spell-points1']);
            r['spell-points1'] = '';
            r['arc'] = (r.I['arc1']);
            r['arc1'] = '';
        })
        .execute();
}
//#endregion