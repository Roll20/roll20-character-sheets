
on("sheet:opened",(eventInfo) =>{
    getAttrs(["version"], function(attrs) {
        let version = attrs["version"];
        update(version);
    });
});


/* Update method, will call itself asynchronously to do upgrade of the sheet if needed
   Logic is the following :
      - Execute the
 */
let update = (fromVersion) => {
    let newVersion
    switch (fromVersion){
        case "2.5":
        case "3.0b":
        case "3.0-beta":
            //Upgrade from 2.5 to 3.0
            setAttrs({version:"3.0"},false,update("3.0"))
            return;
        case "3.0":
        default:
            console.log("Sw5e sheet updated itself");
            return;
    }
}