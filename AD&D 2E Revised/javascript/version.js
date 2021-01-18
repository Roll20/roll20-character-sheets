// --- Version change start --- //

const sheetName = 'AD&D 2E Revised';
const sheetVersion = '3.3.2';

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

on('sheet:opened', function(){
    getAttrs(['character_sheet'],function(attrs){
        let cs=_.rest((attrs.character_sheet||'').match(/(.*?)(?:\s+v(.*))?$/)),
            sheet_name=cs[0]||'',
            sheet_version=cs[1]||'';

        // do something with sheet_name and sheet_version, if you might be converting

        if(sheet_name !== sheetName || sheet_version !== sheetVersion) {
            console.log('Updating character sheet version');
            setAttrs({
                character_sheet: `${sheetName} v${sheetVersion}`,
                version: `v${sheetVersion}`,
                announcement: 1
            },{silent:true});

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
                    let spellPoints1 = r.I['spell-points1'];
                    if (spellPoints1) {
                        console.log('Updating repeating spells-points');
                        r['spell-points'] = spellPoints1;
                        r['spell-points1'] = '';
                    }
                    
                    let arc1 = r.I['arc1'];
                    if (arc1) {
                        console.log('Updating repeating arc');
                        r['arc'] = arc1;
                        r['arc1'] = '';
                    }
                })
                .execute();

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
    });
});

// --- Version change end --- //