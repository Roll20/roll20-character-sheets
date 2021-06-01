// --- Version change start --- //

const sheetName = 'AD&D 2E Revised';
const sheetVersion = '4.1.0';

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
            
            
        }
    });
});

// --- Version change end --- //