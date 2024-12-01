/* CARACTERISTICS UPDATE */
on("change:for_base change:for_bonus",function(){
    getAttrs(["for_base","for_bonus"], function(values) {
        let base = parseInt(values.for_base)||0;
        let bonus = parseInt(values.for_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"for_mod":mod});
    })
});

on("change:dex_base change:dex_bonus",function(){
    getAttrs(["dex_base","dex_bonus"], function(values) {
        let base = parseInt(values.dex_base)||0;
        let bonus = parseInt(values.dex_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"dex_mod":mod});
    })
});

on("change:con_base change:con_bonus",function(){
    getAttrs(["con_base","con_bonus"], function(values) {
        let base = parseInt(values.con_base)||0;
        let bonus = parseInt(values.con_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"con_mod":mod});
    })
});

on("change:int_base change:int_bonus",function(){
    getAttrs(["int_base","int_bonus"], function(values) {
        let base = parseInt(values.int_base)||0;
        let bonus = parseInt(values.int_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"int_mod":mod});
    })
});

on("change:sag_base change:sag_bonus",function(){
    getAttrs(["sag_base","sag_bonus"], function(values) {
        let base = parseInt(values.sag_base)||0;
        let bonus = parseInt(values.sag_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"sag_mod":mod});
    })
});

on("change:cha_base change:cha_bonus",function(){
    getAttrs(["cha_base","cha_bonus"], function(values) {
        let base = parseInt(values.cha_base)||0;
        let bonus = parseInt(values.cha_bonus)||0;
        let total = base+bonus;
        if(total % 2 == 1){
            total--;
        }
        let mod = (total-10)/2;
        setAttrs({"cha_mod":mod});
    })
});

on("change:for_mod change:dex_mod change:con_mod change:int_mod change:sag_mod change:cha_mod change:skills_malus",function(){
    getSectionIDs("skills", function (idarray) {
        for (var i = 0; i < idarray.length; i++) {
            updateSkill("repeating_skills_"+idarray[i]);
        }
    });
    getSectionIDs("attaques", function (idarray) {
        for (var i = 0; i < idarray.length; i++) {
            updateAtq("repeating_attaques_"+idarray[i]);
        }
    });
});