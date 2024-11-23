
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
            //Upgrade from 2.5 to 3.0b
            setAttrs({version:"3.0-beta"},false,update("3.0-beta"))
            return;
        case "3.0-beta":
            //Upgrade while in 3.0b
            console.log("Sw5e sheet updated itself");
        default:
            setAttrs({version:"3.0-beta"},false)
            return;
    }
}