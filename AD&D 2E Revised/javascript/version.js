// --- Version change start --- //

const sheetName = 'AD&D 2E Revised';
const sheetVersion = '4.1.0';

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