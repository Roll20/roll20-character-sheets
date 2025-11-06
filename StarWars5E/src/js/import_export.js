//=require attributes.js

/* CLEANING */
let clean_attributes = (attributesToClean, callback) => {
    if(!attributesToClean?.length){
        return callback();
    }
    let update = {}
    for(let attribute of attributesToClean) {
        update[attribute] = "";
    }
    setAttrs(update, false,callback);
}

/* Recursive method, will clean repeating section at index i, then will call this method for index i + 1 */
let clean_sections = (sectionsToClean,index,callback) =>{
    if(index >= sectionsToClean.length){
        return callback();
    }
    getSectionIDs(sectionsToClean[index].section_name, (sectionIds) => {
        for(let id of sectionIds){
            const toRemove = `${sectionsToClean[index].section_name}_${id}`;
            removeRepeatingRow(toRemove);
        }
        clean_sections(sectionsToClean,index + 1,callback);
    });
}
/* IMPORT */
let import_legacy = (importDto) =>{
    let toUpdate = {};
    toUpdate["character_name"] = importDto.name;
    for (let attribute of importDto.attribs) {
        if (!attribute) {
            continue;
        }
        const name = attribute.name;
        toUpdate[name] = attribute.current;
        if (!!attribute.max) {
            toUpdate[`${name}_max`] = attribute.max;
        }
    }
    setAttrs(toUpdate, false, () => {
        update(toUpdate["version"]);
    });
}

let import_all = () => {
    getAttrs(["json_value"], (jsonValueContainer) => {
        const importDto = JSON.parse(jsonValueContainer["json_value"]);
        if(typeof importDto.schema_version !== 'string'){
            return import_legacy(importDto);
        }
        let toUpdate = {};
        toUpdate["character_name"] = importDto.name;
        for (let attribute of importDto.attribs) {
            if (!attribute) {
                continue;
            }
            const name = attribute.name;
            toUpdate[name] = attribute.current;
            if (!!attribute.max) {
                toUpdate[`${name}_max`] = attribute.max;
            }
        }
        for(let section of importDto.sections){
            let ids = []
            for(let row of section.rows){
                let id = getUniqueRowId(ids);
                ids.push(id);
                for(let attribute in row){
                    toUpdate[`${section.section_name}_${id}_${attribute}`] = row[attribute];
                }
            }
        }
        setAttrs(toUpdate, false, () => {
            update(toUpdate["version"]);
        });
    });
}

/* EXPORT */
let export_attributes = (attributesToExport,exportDto,callback) => {
    //Get the values of the attributes
    getAttrs(attributesToExport, (attributesValues) => {
        for (let attributeName of attributesToExport) {
            //Maximum Attributes handled already, should ignore
            if (attributeName.endsWith("_max")) {
                continue;
            }
            //Set name of export
            if (attributeName === "character_name" && !export_value.name) {
                exportDto.name = attributesValues[attributeName];
                continue;
            }
            if (attributeName === "npc_name") {
                exportDto.name = attributesValues[attributeName];
            }
            let exportedAttribute = {
                name: attributeName,
                current: attributesValues[attributeName],
                max: attributesValues[`${attributeName}_max`] ? attributesValues[`${attributeName}_max`] : "",
                id: ""
            }
            //Don't add empty ones
            if(!exportedAttribute.current && !exportedAttribute.max){
                continue;
            }
            exportDto.attribs.push(exportedAttribute);
        }
        callback();
    });
}

let export_sections = (sectionsToExport,index,exportDto, callback) =>{
    if(index >= sectionsToExport.length){
        return callback();
    }
    //Get all row for section
    getSectionIDs(sectionsToExport[index].section_name, (sectionIds) => {
        //Build the list of attributes to retrieve
        let attributesToRetrieve = [];
        for(let id of sectionIds) {
            for (let attr of sectionsToExport[index].attributes) {
                attributesToRetrieve.push(`${sectionsToExport[index].section_name}_${id}_${attr}`)
            }
        }

        getAttrs(attributesToRetrieve, (attributesValues) => {
            //Initialize the section Export
            let exportedSection = {
                section_name : sectionsToExport[index].section_name,
                rows:[]
            };
            //for each Id
            for(let id of sectionIds){
                //Calculate the prefix
                const prefix = `${sectionsToExport[index].section_name}_${id}_`;
                let exportedRow = {};
                //Filter Attributes for only this row
                let rowAttributes = Object.keys(attributesValues).filter( key => key.startsWith(prefix));
                for(let attributeName of rowAttributes){
                    const value = attributesValues[attributeName];
                    //Ignore unset attributes
                    if(!!value || typeof value === "number"){} {
                        exportedRow[attributeName.replace(prefix, "")] = value;
                    }
                }
                exportedSection.rows.push(exportedRow);
            }
            exportDto.sections.push(exportedSection);
            export_sections(sectionsToExport,index + 1,exportDto,callback);
        });
    });
}
/* NPC */
let clean_npc = (callback) => {
    clean_sections([...npc_repeating,...powerSections],0,() => {
        clean_attributes([...npc_attrs,...power_attrs], () => {
            console.log("NPC Sheet Cleaned");
            callback();
        });
    });
}

let import_npc = () => {
    //Import is quite easy, clean the npc sheet then do import.
    clean_npc(() => {
        import_all();
    });
}

let export_npc = () => {
    const exportDto = {
        "schema_version": "Sheet-3.1",
        "exportedBy": "Roll20 Sw5E Sheet",
        "name": "",
        "attribs": [],
        "sections": []
    };
    export_attributes([...npc_attrs,...power_attrs],exportDto, () => {
        export_sections([...npc_repeating,...powerSections],0,exportDto,() => {
            const export_string = JSON.stringify(exportDto, null, 3);
            setAttrs({"json_value":export_string});
        });
    });
}

on("clicked:import-json", import_npc);
on("clicked:export-json", export_npc);
on("clicked:clean-npc", clean_npc);
