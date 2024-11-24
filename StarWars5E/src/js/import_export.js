
let do_import_json = () => {
    getAttrs(["json_value"], (attrs) => {
        const jsonObject = JSON.parse(attrs["json_value"]);
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
    });
}

let do_export_json = () => {
    getAttrs(["character_name"], (attrs)=> {
        const name = attrs.character_name;
        if (!name) {
            return;
        }
        const characters = findObjs({_type: "character", name: characterName});
        if(!characters?.length){
            return;
        }
        const attributes = findObjs({
            _type: "attribute",
            _characterid: characters[0].id,
        });
        const export_value = {
            "schema_version": 2,
            "avatar": "",
            "bio": "",
            "exportedBy": "www.sw5e.com",
            "gmnotes": "",
            "defaulttoken": "",
            "tags": "[]",
            "controlledby": "",
            "inplayerjournals": "",
            "attribs": [],
            "abilities": []
        };
        for(let attribute in attributes){
            console.log(attribute);
        }
        const export_string = JSON.stringify(export_value);
        setAttrs({"json_value":export_string});
    });
}

on("clicked:import-json", do_import_json);
on("clicked:export-json", do_export_json);