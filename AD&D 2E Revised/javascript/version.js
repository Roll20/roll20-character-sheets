// --- Version change start --- //

var sheetName = 'AD&D 2E Revised';
var sheetVersion = '3.3.2';

function moveStaticToRepeating(section, fieldsToMove) {
    getAttrs(fieldsToMove, function (values) {
        if (values[fieldsToMove[0]]) {
            let newrowid = generateRowID();
            let newValue = {};

            for (const [key, value] of Object.entries(values)) {
                newValue[`repeating_${section}_${newrowid}_${key}`] = value;
                newValue[key] = '';
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

        if(sheet_name !== sheetName || (sheetVersion && (sheet_version !== sheetVersion))){
            console.log('Updating character sheet version');
            setAttrs({
                character_sheet: (sheetName||'AD&D 2E Revised')+(sheetVersion?(' v'+sheetVersion):'')
            },{silent:true});

            getAttrs(['spell-points', 'spell-points-priest'], function(values) {
                let sp = parseInt(values['spell-points']) || 0;
                let psp = parseInt(values['spell-points-priest']) || 0;

                console.log(`Old spell points: ${sp}`);
                console.log(`Old spell points priest: ${psp}`);

                let newValue = {};
                if (sp > 0) {
                    newValue['spell-points-lvl'] = sp;
                    newValue['spell-points'] = '';
                }

                if (psp > 0) {
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

            moveStaticToRepeating('weaponprofs', ['weapprofname', 'weapprofnum', 'expert', 'specialist', 'mastery', 'high-mastery', 'grand-mastery', 'chosen-weapon']);
            moveStaticToRepeating('profs', ['profname', 'profslots', 'profstatnum', 'profmod']);
            moveStaticToRepeating('langs', ['langname', 'lang-rw']);
            
        }
    });
});

// --- Version change end --- //