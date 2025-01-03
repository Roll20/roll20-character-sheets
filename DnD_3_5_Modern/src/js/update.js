const current_version = "1.0.0";

on("sheet:opened",(eventInfo) =>{
    getAttrs(["sheet_version"], function(attrs) {
        let version = attrs["sheet_version"];
        update(version);
    });
});

let update = (fromVersion) => {
    let newVersion
    switch (fromVersion){
        case "1.0.0":
            return;
        default:
            init();
    }
}

let init = () => {
    setAttrs({
        "sheet_version":current_version,
        "vit_base":0,
        "rd":0,
        "sheetTab":"character"
    },true,() => {
        updateAllCharacteristics([]);
    });

}