    // ==UserScript==
    // @name         Genesys dice calculator
    // @namespace    http://tampermonkey.net/
    // @version      0.1
    // @description  Set dice results for the Genesys sheet's roll templates
    // @author       You
    // @match        https://app.roll20.net/*
    // @grant        none
    // ==/UserScript==


    document.getElementById("textchat").addEventListener("scroll", event=>{
        var toHide = document.getElementsByClassName("sheet-findAndHide")

        var toDo=document.getElementsByClassName("sheet-uncalculated")
        if(toHide.length>0) {toHide[0].hidden=true}
        console.log("scrolled",toDo,toHide)
        for (let i = 0; i < toDo.length; i++) {
            let element = toDo.item(i);
            element.classList.remove("sheet-uncalculated")
            let roll= element.parentElement.parentElement.parentElement
            let rolls= Array.from(roll.getElementsByClassName("inlinerollresult")).map( x=>x.innerHTML).join("").trim()
            let sf =0
            let ah =0
            let td =0
            if(rolls.length==0){return}
            for(let k=0;k<rolls.length;k++){
                switch (rolls.charAt(k)) {
                    case "s": sf++; break;
                    case "a": ah++; break;
                    case "t": sf++;td++; break;
                    case "f": sf--; break;
                    case "h": ah--; break;
                    case "d": sf--;td--; break;
                    default:
                        break;
                }
            }
            let sfStr=""
            let ahStr=""
            let tdStr=""
            let preStr=""

            if (sf!=0){
                sfStr = Math.abs(sf) + (sf>0?" s ": " f " )
                preStr=(sf>0?" Success! :": "Failure... :" )
            }else{
                preStr= "Tie :"
            }
            if (ah!=0){
                ahStr = Math.abs(ah) + (ah>0?" a ": " h " )
            }else{
                ahStr=""
            }
            if (td!=0){
                tdStr = Math.abs(td) + (td>0?" t ": " d " )
            }else{
                tdStr=""
            }

            let resultStr= sfStr+ahStr + tdStr
            let result = null
            let last = 0
            for (let j = 0; j < roll.childNodes.length; j++) {
                let node =roll.childNodes.item(j)
                if(node.hidden==true){
                    result=node;
                    last = j-1
                }
            }
            if(result==null){}else{
                let out = result.firstChild.lastChild;
                let pre=result.firstChild.firstChild;
                pre.innerHTML = preStr
                out.innerHTML= resultStr;
                result.hidden=false

            }
            element.classList.remove("sheet-uncalculated")
        }
    });