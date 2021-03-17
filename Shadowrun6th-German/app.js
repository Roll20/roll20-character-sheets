import ejs from "ejs";
import { writeFileSync,readFileSync } from 'fs';


ejs.renderFile("views/sheet.ejs",function(err,str){
    if (str){
        writeFileSync("sheet-compiled.html",str);
        console.log("File Written");
    }
    else 
    console.log(err);
    
});


