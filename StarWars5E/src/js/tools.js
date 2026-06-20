let flag_debug = 1;
let debug_msg = (msg) => {
    if(flag_debug){
        console.log(msg);
    }
}

let getUniqueRowId = (currentIds) =>{
    let id;
    do {
        id = generateRowID();
    }while(id in currentIds);
    return id;
}