//=require attributes.js

/** NPC CLEANING */
/* Clean All attributes in npc_attrs */
let clean_npc_attr = (callback) => {
    let update = {}
    for(let attr of npc_attrs) {
        update[attr] = "";
    }
    setAttrs(update, false,callback);
}

/* Recursive method, will clean repeating section at index i, then will call this method for index i + 1 */
let clean_npc_repeating = (index,callback) =>{
    if(index >= npc_repeating.length){
        return clean_npc_attr(callback);
    }
    getSectionIDs(npc_repeating[index].section_name, (idArrays) => {
        let update = []
        for(let id of idArrays){
            const toRemove = `${npc_repeating[index].section_name}_${id}`;
            removeRepeatingRow(toRemove);
        }
        clean_npc_repeating(index + 1,callback);
    });
}

let clean_npc = () => {
    clean_npc_repeating(0,() => {
    });
}

/* NPC IMPORT - EXPORT */
let import_npc = () => {
    //Import is quite easy, clean the npc sheet then do import.
    clean_npc_repeating(0, () => {
        getAttrs(["json_value"], (attrs) => {
            const jsonObject = JSON.parse(attrs["json_value"]);
            if(typeof jsonObject.schema_version !== 'string'){
                return import_legacy(jsonObject);
            }
            let toUpdate = {};
            toUpdate["character_name"] = jsonObject.name;
            for (let attr of jsonObject.attribs) {
                if (!attr) {
                    continue;
                }
                const name = attr.name;
                toUpdate[name] = attr.current;
                if (attr.max && attr.max.length) {
                    toUpdate[`${name}_max`] = attr.max;
                }
            }
            for(let section of jsonObject.sections){
                let ids = []
                for(let row of section.rows){
                    let id = getUniqueRowId(ids);
                    ids.push(id);
                    for(let attr in row){
                        toUpdate[`${section.section_name}_${id}_${attr}`] = row[attr];
                    }
                }
            }
            setAttrs(toUpdate, false, () => {
                update(toUpdate["version"]);
            });
        });
    });
}

let import_legacy = (jsonObject) =>{
    let toUpdate = {};
    toUpdate["character_name"] = jsonObject.name;
    for (let attr of jsonObject.attribs) {
        if (!attr) {
            continue;
        }
        const name = attr.name;
        toUpdate[name] = attr.current;
        if (attr.max && attr.max.length) {
            toUpdate[`${name}_max`] = attr.max;
        }
    }
    setAttrs(toUpdate, false, () => {
        update(toUpdate["version"]);
    });
}
let export_npc_section = (index,export_value) =>{
    if(index >= npc_repeating.length){
        const export_string = JSON.stringify(export_value, null, 3);
        setAttrs({"json_value":export_string});
    }
    getSectionIDs(npc_repeating[index].section_name, (idArrays) => {
        let attrs = [];
        let ids = [];
        for(let id of idArrays) {
            ids.push(id);
            for (let attr of npc_repeating[index].attributes) {
                attrs.push(`${npc_repeating[index].section_name}_${id}_${attr}`)
            }
        }
        getAttrs(attrs, (section_attrs) => {
            let section_export = {
                section_name : npc_repeating[index].section_name,
                rows:[]
            };
            for(let id of ids){
                const prefix = `${npc_repeating[index].section_name}_${id}_`;
                let row_export = {};
                let row_attr = Object.keys(section_attrs).filter( key => key.startsWith(prefix));
                for(let attr of row_attr){
                    row_export[attr.replace(prefix,"")] = section_attrs[attr];
                }
                section_export.rows.push(row_export);
            }
            export_value.sections.push(section_export);
            export_npc_section(index + 1,export_value);
        });
    });
}

let export_npc = () => {
    const export_value = {
        "schema_version": "Sheet-3.1",
        "exportedBy": "Roll20 Sw5E Sheet",
        "name": "",
        "attribs": [],
        "sections": []
    };
    getAttrs(npc_attrs, (attrs) => {
        for (let attr of npc_attrs) {
            if (attr.endsWith("_max")) {
                continue;
            }
            if (attr === "character_name" && !export_value.name) {
                export_value.name = attrs[attr];
                continue;
            }
            if(attr === "npc_name"){
                export_value.name = attrs[attr];
            }
            let attrib = {
                name: attr,
                current: attrs[attr],
                max: attrs[`${attr}_max`] ? attrs[`${attr}_max`] : "",
                id: ""
            }
            export_value.attribs.push(attrib);
        }
        export_npc_section(0, export_value);
    });
}

on("clicked:import-json", import_npc);
on("clicked:export-json", export_npc);
on("clicked:clean-npc", clean_npc);