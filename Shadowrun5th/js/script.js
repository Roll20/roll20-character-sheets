
on("change:wil_base change:wil_aug", function() {
    getAttrs(["wil_base", "wil_aug"], function(value){
        var wil = parseInt(value.wil_base) + parseInt(value.wil_aug);
        var total = 8 + Math.ceil(wil / 2);
        setAttrs({stuntrack_max: total,
                  stunwoundstaken_max: total});
     });
});

on("change:stuntrack change:stuntrack_max", function() {
    getAttrs(["stuntrack", "stuntrack_max"], function(value){
        var wounds = Math.max(value.stuntrack_max - value.stuntrack, 0);
        setAttrs({stunwoundstaken: wounds}, {silent: true});
    });
});

on("change:stunwoundstaken change:stuntrack_max", function() {
    getAttrs(["stunwoundstaken", "stuntrack_max"], function(value){
        var track = Math.min(value.stuntrack_max - value.stunwoundstaken, value.stuntrack_max);
        setAttrs({stuntrack: track}, {silent: true});
    });
});

on("change:bod_base change:bod_aug", function() {
    getAttrs(["bod_base", "bod_aug"], function(value){
        var bod = parseInt(value.bod_base) + parseInt(value.bod_aug);
        var total = 8 + Math.ceil(bod / 2);
        setAttrs({physicaltrack_max: total,
                  physicalwoundstaken_max: total});
     });
});

on("change:physicaltrack change:physicaltrack_max", function() {
    getAttrs(["physicaltrack", "physicaltrack_max"], function(value){
        var wounds = Math.max(value.physicaltrack_max - value.physicaltrack, 0);
        setAttrs({physicalwoundstaken: wounds}, {silent: true});
    });
});

on("change:physicalwoundstaken change:physicaltrack_max", function() {
    getAttrs(["physicalwoundstaken", "physicaltrack_max"], function(value){
        var track = Math.min(value.physicaltrack_max - value.physicalwoundstaken, value.physicaltrack_max);
        setAttrs({physicaltrack: track}, {silent: true});
    });
});

on("change:hotsim", function(){
    getAttrs(["matrixinitiativedice", "hotsim"],function(value){
       var dice=value.matrixinitiativedice;
       if(value.hotsim==2)
        dice++;
       else
        dice--;
        setAttrs({matrixinitiativedice: dice});
    });
});

on("change:skillhideunusedcheckbox1", function() {
    var names=[];
    for(var i=1;i<14;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==13){
            hide.skillhideheader1='on';
        }
        hide.skillhideunusedcheckbox1=0;
        setAttrs(hide);
    });
});


on("change:skillhideunusedcheckbox2", function() {
    var names=[];
    for(var i=14;i<22;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==8){
            hide.skillhideheader2='on';
        }
        hide.skillhideunusedcheckbox2=0;
        setAttrs(hide);
    });
});


on("change:skillhideunusedcheckbox3", function() {
    var names=[];
    for(var i=22;i<32;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==10){
            hide.skillhideheader3='on';
        }
        hide.skillhideunusedcheckbox3=0;
        setAttrs(hide);
    });

});


on("change:skillhideunusedcheckbox4", function() {
    var names=[];
    for(var i=32;i<43;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==11){
            hide.skillhideheader4='on';
        }
        hide.skillhideunusedcheckbox4=0;
        setAttrs(hide);
    });

});


on("change:skillhideunusedcheckbox5", function() {
    var names=[];
    for(var i=43;i<52;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==9){
            hide.skillhideheader5='on';
        }
        hide.skillhideunusedcheckbox5=0;
        setAttrs(hide);
    });

});


on("change:skillhideunusedcheckbox6", function() {
    var names=[];
    for(var i=52;i<58;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==6){
            hide.skillhideheader6='on';
        }
        hide.skillhideunusedcheckbox6=0;
        setAttrs(hide);
    });

});


on("change:skillhideunusedcheckbox7", function() {
    var names=[];
    for(var i=58;i<70;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==12){
            hide.skillhideheader7='on';
        }
        hide.skillhideunusedcheckbox7=0;
        setAttrs(hide);
    });

});


on("change:skillhideunusedcheckbox8", function() {
    var names=[];
    for(var i=70;i<73;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==3){
            hide.skillhideheader8='on';
        }
        hide.skillhideunusedcheckbox8=0;
        setAttrs(hide);
    });

});


on("change:skillhideunusedcheckbox9", function() {
    var names=[];
    for(var i=73;i<77;i++)
    {
        var name='skillrating'+i;
        names[i-1]=name;
    }
    getAttrs(names, function(values){
        var hide={};
        for(var prop in values)
        {
            if(values[prop]=="-1"){
                var number=prop.match(/(\d*)$/);
                var hidename='skillshowcheckbox'+number[1];
                hide[hidename]='on';
            }
        }
        if(Object.keys(hide).length==4){
            hide.skillhideheader9='on';
        }
        hide.skillhideunusedcheckbox9=0;
        setAttrs(hide);
    });

});


on("change:edgeroll", function(){
    getAttrs(["edgeroll"], function(value){
        var multiplier;
        if(value.edgeroll==""){
            multiplier=0;
        }else{
            multiplier=1;
        }
        setAttrs({
            edgn:multiplier
        });
    })
});


on("change:repeating_spells:spellschool", function() {
    getAttrs(["repeating_spells_spellschool"], function(value) {
        var numb=value.repeating_spells_spellschool.match(/(\d*)}$/);
        var name='@{skillname'+numb[1]+'}';
        setAttrs({
            repeating_spells_spellschool_name: name
        });
    });
});


on("change:repeating_vehicles:vehicleskilltype", function() {
    getAttrs(["repeating_vehicles_vehicleskilltype"], function(value) {
        var numb=value.repeating_vehicles_vehicleskilltype.match(/(\d*)}$/);
        var name='@{skillname'+numb[1]+'}';
        setAttrs({
            repeating_vehicles_vehicleskillname: name
        });
    });
});


on("change:repeating_mskills:mskillrating", function() {
    getAttrs(["repeating_mskills_mskillrating"], function(value) {
        var numb=value.repeating_mskills_mskillrating.match(/(\d*)}$/);
        var name='skillspec'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                repeating_mskills_mskillspec: values[name]
            });
        });
    });
});



on("change:weaponcategory1", function() {
    getAttrs(["weaponcategory1"], function(value) {
        var numb=value.weaponcategory1.match(/(\d*)}$/);
        var name='skillname'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                weaponskillname1: values[name]
            });
        });
    });
});

on("change:weaponcategory2", function() {
    getAttrs(["weaponcategory2"], function(value) {
        var numb=value.weaponcategory2.match(/(\d*)}$/);
        var name='skillname'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                weaponskillname2: values[name]
            });
        });
    });
});

on("change:weaponcategory3", function() {
    getAttrs(["weaponcategory3"], function(value) {
        var numb=value.weaponcategory3.match(/(\d*)}$/);
        var name='skillname'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                weaponskillname3: values[name]
            });
        });
    });
});

on("change:weaponcategory4", function() {
    getAttrs(["weaponcategory4"], function(value) {
        var numb=value.weaponcategory4.match(/(\d*)}$/);
        var name='skillname'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                weaponskillname4: values[name]
            });
        });
    });
});

on("change:weaponcategory5", function() {
    getAttrs(["weaponcategory5"], function(value) {
        var numb=value.weaponcategory5.match(/(\d*)}$/);
        var name='skillname'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                weaponskillname5: values[name]
            });
        });
    });
});

on("change:weaponcategory6", function() {
    getAttrs(["weaponcategory6"], function(value) {
        var numb=value.weaponcategory6.match(/(\d*)}$/);
        var name='skillname'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                weaponskillname6: values[name]
            });
        });
    });
});

on("change:weaponcategory7", function() {
    getAttrs(["weaponcategory7"], function(value) {
        var numb=value.weaponcategory7.match(/(\d*)}$/);
        var name='skillname'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                weaponskillname7: values[name]
            });
        });
    });
});

on("change:weaponcategory8", function() {
    getAttrs(["weaponcategory8"], function(value) {
        var numb=value.weaponcategory8.match(/(\d*)}$/);
        var name='skillname'+numb[1];
        getAttrs([name], function(values) {
            setAttrs({
                weaponskillname8: values[name]
            });
        });
    });
});



on("change:skillshowallcheckbox1", function() {
    setAttrs({
      skillshowallcheckbox1: 0,
      skillhideheader1: 0,
      skillshowcheckbox1: 0,
      skillshowcheckbox2: 0,
      skillshowcheckbox3: 0,
      skillshowcheckbox4: 0,
      skillshowcheckbox5: 0,
      skillshowcheckbox6: 0,
      skillshowcheckbox7: 0,
      skillshowcheckbox8: 0,
      skillshowcheckbox9: 0,
      skillshowcheckbox10: 0,
      skillshowcheckbox11: 0,
      skillshowcheckbox12: 0,
      skillshowcheckbox13: 0
    });
});

on("change:skillshowallcheckbox2", function() {
    setAttrs({
      skillshowallcheckbox2: 0,
      skillhideheader2: 0,
      skillshowcheckbox14: 0,
      skillshowcheckbox15: 0,
      skillshowcheckbox16: 0,
      skillshowcheckbox17: 0,
      skillshowcheckbox18: 0,
      skillshowcheckbox19: 0,
      skillshowcheckbox20: 0,
      skillshowcheckbox21: 0
    });
});

on("change:skillshowallcheckbox3", function() {
    setAttrs({
      skillshowallcheckbox3: 0,
      skillhideheader3: 0,
      skillshowcheckbox22: 0,
      skillshowcheckbox23: 0,
      skillshowcheckbox24: 0,
      skillshowcheckbox25: 0,
      skillshowcheckbox26: 0,
      skillshowcheckbox27: 0,
      skillshowcheckbox28: 0,
      skillshowcheckbox29: 0,
      skillshowcheckbox30: 0,
      skillshowcheckbox31: 0
    });
});

on("change:skillshowallcheckbox4", function() {
    setAttrs({
      skillshowallcheckbox4: 0,
      skillhideheader4: 0,
      skillshowcheckbox32: 0,
      skillshowcheckbox33: 0,
      skillshowcheckbox34: 0,
      skillshowcheckbox35: 0,
      skillshowcheckbox36: 0,
      skillshowcheckbox37: 0,
      skillshowcheckbox38: 0,
      skillshowcheckbox39: 0,
      skillshowcheckbox40: 0,
      skillshowcheckbox41: 0,
      skillshowcheckbox42: 0
    });
});

on("change:skillshowallcheckbox5", function() {
    setAttrs({
      skillshowallcheckbox5: 0,
      skillhideheader5: 0,
      skillshowcheckbox43: 0,
      skillshowcheckbox44: 0,
      skillshowcheckbox45: 0,
      skillshowcheckbox46: 0,
      skillshowcheckbox47: 0,
      skillshowcheckbox48: 0,
      skillshowcheckbox49: 0,
      skillshowcheckbox50: 0,
      skillshowcheckbox51: 0
    });
});

on("change:skillshowallcheckbox6", function() {
    setAttrs({
      skillshowallcheckbox6: 0,
      skillhideheader6: 0,
      skillshowcheckbox52: 0,
      skillshowcheckbox53: 0,
      skillshowcheckbox54: 0,
      skillshowcheckbox55: 0,
      skillshowcheckbox56: 0,
      skillshowcheckbox57: 0
    });
});

on("change:skillshowallcheckbox7", function() {
    setAttrs({
      skillshowallcheckbox7: 0,
      skillhideheader7: 0,
      skillshowcheckbox58: 0,
      skillshowcheckbox59: 0,
      skillshowcheckbox60: 0,
      skillshowcheckbox61: 0,
      skillshowcheckbox62: 0,
      skillshowcheckbox63: 0,
      skillshowcheckbox64: 0,
      skillshowcheckbox65: 0,
      skillshowcheckbox66: 0,
      skillshowcheckbox67: 0,
      skillshowcheckbox68: 0,
      skillshowcheckbox69: 0
    });
});

on("change:skillshowallcheckbox8", function() {
    setAttrs({
      skillshowallcheckbox8: 0,
      skillhideheader8: 0,
      skillshowcheckbox70: 0,
      skillshowcheckbox71: 0,
      skillshowcheckbox72: 0
    });
});

on("change:skillshowallcheckbox9", function() {
    setAttrs({
      skillshowallcheckbox9: 0,
      skillhideheader9: 0,
      skillshowcheckbox73: 0,
      skillshowcheckbox74: 0,
      skillshowcheckbox75: 0,
      skillshowcheckbox76: 0
    });
});


on("change:skilllimit1", function() {
    getAttrs(["skilllimit1"], function(value) {
        setAttrs({
            skilllimit_name1: value.skilllimit1+"_name}",
            skilllimit_value1: value.skilllimit1+"_total}"
        });
    });
});

on("change:skillattr2", function() {
    getAttrs(["skillattr2"], function(value) {
        setAttrs({
            skillattr_name2: value.skillattr2+"_name}",
            skillattr_value2: value.skillattr2+"_total}"
        });
    });
});
on("change:skilllimit2", function() {
    getAttrs(["skilllimit2"], function(value) {
        setAttrs({
            skilllimit_name2: value.skilllimit2+"_name}",
            skilllimit_value2: value.skilllimit2+"_total}"
        });
    });
});

on("change:skillattr3", function() {
    getAttrs(["skillattr3"], function(value) {
        setAttrs({
            skillattr_name3: value.skillattr3+"_name}",
            skillattr_value3: value.skillattr3+"_total}"
        });
    });
});
on("change:skilllimit3", function() {
    getAttrs(["skilllimit3"], function(value) {
        setAttrs({
            skilllimit_name3: value.skilllimit3+"_name}",
            skilllimit_value3: value.skilllimit3+"_total}"
        });
    });
});

on("change:skillattr4", function() {
    getAttrs(["skillattr4"], function(value) {
        setAttrs({
            skillattr_name4: value.skillattr4+"_name}",
            skillattr_value4: value.skillattr4+"_total}"
        });
    });
});
on("change:skilllimit4", function() {
    getAttrs(["skilllimit4"], function(value) {
        setAttrs({
            skilllimit_name4: value.skilllimit4+"_name}",
            skilllimit_value4: value.skilllimit4+"_total}"
        });
    });
});

on("change:skillattr5", function() {
    getAttrs(["skillattr5"], function(value) {
        setAttrs({
            skillattr_name5: value.skillattr5+"_name}",
            skillattr_value5: value.skillattr5+"_total}"
        });
    });
});

on("change:skilllimit5", function() {
    getAttrs(["skilllimit5"], function(value) {
        setAttrs({
            skilllimit_name5: value.skilllimit5+"_name}",
            skilllimit_value5: value.skilllimit5+"_total}"
        });
    });
});

on("change:skillattr6", function() {
    getAttrs(["skillattr6"], function(value) {
        setAttrs({
            skillattr_name6: value.skillattr6+"_name}",
            skillattr_value6: value.skillattr6+"_total}"
        });
    });
});

on("change:skilllimit6", function() {
    getAttrs(["skilllimit6"], function(value) {
        setAttrs({
            skilllimit_name6: value.skilllimit6+"_name}",
            skilllimit_value6: value.skilllimit6+"_total}"
        });
    });
});

on("change:skillattr7", function() {
    getAttrs(["skillattr7"], function(value) {
        setAttrs({
            skillattr_name7: value.skillattr7+"_name}",
            skillattr_value7: value.skillattr7+"_total}"
        });
    });
});

on("change:skilllimit7", function() {
    getAttrs(["skilllimit7"], function(value) {
        setAttrs({
            skilllimit_name7: value.skilllimit7+"_name}",
            skilllimit_value7: value.skilllimit7+"_total}"
        });
    });
});

on("change:skillattr8", function() {
    getAttrs(["skillattr8"], function(value) {
        setAttrs({
            skillattr_name8: value.skillattr8+"_name}",
            skillattr_value8: value.skillattr8+"_total}"
        });
    });
});

on("change:skilllimit8", function() {
    getAttrs(["skilllimit8"], function(value) {
        setAttrs({
            skilllimit_name8: value.skilllimit8+"_name}",
            skilllimit_value8: value.skilllimit8+"_total}"
        });
    });
});

on("change:skillattr9", function() {
    getAttrs(["skillattr9"], function(value) {
        setAttrs({
            skillattr_name9: value.skillattr9+"_name}",
            skillattr_value9: value.skillattr9+"_total}"
        });
    });
});

on("change:skilllimit9", function() {
    getAttrs(["skilllimit9"], function(value) {
        setAttrs({
            skilllimit_name9: value.skilllimit9+"_name}",
            skilllimit_value9: value.skilllimit9+"_total}"
        });
    });
});

on("change:skillattr10", function() {
    getAttrs(["skillattr10"], function(value) {
        setAttrs({
            skillattr_name10: value.skillattr10+"_name}",
            skillattr_value10: value.skillattr10+"_total}"
        });
    });
});

on("change:skilllimit10", function() {
    getAttrs(["skilllimit10"], function(value) {
        setAttrs({
            skilllimit_name10: value.skilllimit10+"_name}",
            skilllimit_value10: value.skilllimit10+"_total}"
        });
    });
});

on("change:skillattr11", function() {
    getAttrs(["skillattr11"], function(value) {
        setAttrs({
            skillattr_name11: value.skillattr11+"_name}",
            skillattr_value11: value.skillattr11+"_total}"
        });
    });
});

on("change:skilllimit11", function() {
    getAttrs(["skilllimit11"], function(value) {
        setAttrs({
            skilllimit_name11: value.skilllimit11+"_name}",
            skilllimit_value11: value.skilllimit11+"_total}"
        });
    });
});
on("change:skillattr12", function() {
    getAttrs(["skillattr12"], function(value) {
        setAttrs({
            skillattr_name12: value.skillattr12+"_name}",
            skillattr_value12: value.skillattr12+"_total}"
        });
    });
});

on("change:skilllimit12", function() {
    getAttrs(["skilllimit12"], function(value) {
        setAttrs({
            skilllimit_name12: value.skilllimit12+"_name}",
            skilllimit_value12: value.skilllimit12+"_total}"
        });
    });
});

on("change:skillattr13", function() {
    getAttrs(["skillattr13"], function(value) {
        setAttrs({
            skillattr_name13: value.skillattr13+"_name}",
            skillattr_value13: value.skillattr13+"_total}"
        });
    });
});

on("change:skilllimit13", function() {
    getAttrs(["skilllimit13"], function(value) {
        setAttrs({
            skilllimit_name13: value.skilllimit13+"_name}",
            skilllimit_value13: value.skilllimit13+"_total}"
        });
    });
});

on("change:skillattr14", function() {
    getAttrs(["skillattr14"], function(value) {
        setAttrs({
            skillattr_name14: value.skillattr14+"_name}",
            skillattr_value14: value.skillattr14+"_total}"
        });
    });
});

on("change:skilllimit14", function() {
    getAttrs(["skilllimit14"], function(value) {
        setAttrs({
            skilllimit_name14: value.skilllimit14+"_name}",
            skilllimit_value14: value.skilllimit14+"_total}"
        });
    });
});

on("change:skillattr15", function() {
    getAttrs(["skillattr15"], function(value) {
        setAttrs({
            skillattr_name15: value.skillattr15+"_name}",
            skillattr_value15: value.skillattr15+"_total}"
        });
    });
});

on("change:skilllimit15", function() {
    getAttrs(["skilllimit15"], function(value) {
        setAttrs({
            skilllimit_name15: value.skilllimit15+"_name}",
            skilllimit_value15: value.skilllimit15+"_total}"
        });
    });
});

on("change:skillattr16", function() {
    getAttrs(["skillattr16"], function(value) {
        setAttrs({
            skillattr_name16: value.skillattr16+"_name}",
            skillattr_value16: value.skillattr16+"_total}"
        });
    });
});

on("change:skilllimit16", function() {
    getAttrs(["skilllimit16"], function(value) {
        setAttrs({
            skilllimit_name16: value.skilllimit16+"_name}",
            skilllimit_value16: value.skilllimit16+"_total}"
        });
    });
});

on("change:skillattr17", function() {
    getAttrs(["skillattr17"], function(value) {
        setAttrs({
            skillattr_name17: value.skillattr17+"_name}",
            skillattr_value17: value.skillattr17+"_total}"
        });
    });
});

on("change:skilllimit17", function() {
    getAttrs(["skilllimit17"], function(value) {
        setAttrs({
            skilllimit_name17: value.skilllimit17+"_name}",
            skilllimit_value17: value.skilllimit17+"_total}"
        });
    });
});

on("change:skillattr18", function() {
    getAttrs(["skillattr18"], function(value) {
        setAttrs({
            skillattr_name18: value.skillattr18+"_name}",
            skillattr_value18: value.skillattr18+"_total}"
        });
    });
});

on("change:skilllimit18", function() {
    getAttrs(["skilllimit18"], function(value) {
        setAttrs({
            skilllimit_name18: value.skilllimit18+"_name}",
            skilllimit_value18: value.skilllimit18+"_total}"
        });
    });
});

on("change:skillattr19", function() {
    getAttrs(["skillattr19"], function(value) {
        setAttrs({
            skillattr_name19: value.skillattr19+"_name}",
            skillattr_value19: value.skillattr19+"_total}"
        });
    });
});

on("change:skilllimit19", function() {
    getAttrs(["skilllimit19"], function(value) {
        setAttrs({
            skilllimit_name19: value.skilllimit19+"_name}",
            skilllimit_value19: value.skilllimit19+"_total}"
        });
    });
});

on("change:skillattr20", function() {
    getAttrs(["skillattr20"], function(value) {
        setAttrs({
            skillattr_name20: value.skillattr20+"_name}",
            skillattr_value20: value.skillattr20+"_total}"
        });
    });
});

on("change:skilllimit20", function() {
    getAttrs(["skilllimit20"], function(value) {
        setAttrs({
            skilllimit_name20: value.skilllimit20+"_name}",
            skilllimit_value20: value.skilllimit20+"_total}"
        });
    });
});

on("change:skillattr21", function() {
    getAttrs(["skillattr21"], function(value) {
        setAttrs({
            skillattr_name21: value.skillattr21+"_name}",
            skillattr_value21: value.skillattr21+"_total}"
        });
    });
});

on("change:skilllimit21", function() {
    getAttrs(["skilllimit21"], function(value) {
        setAttrs({
            skilllimit_name21: value.skilllimit21+"_name}",
            skilllimit_value21: value.skilllimit21+"_total}"
        });
    });
});
on("change:skillattr22", function() {
    getAttrs(["skillattr22"], function(value) {
        setAttrs({
            skillattr_name22: value.skillattr22+"_name}",
            skillattr_value22: value.skillattr22+"_total}"
        });
    });
});

on("change:skilllimit22", function() {
    getAttrs(["skilllimit22"], function(value) {
        setAttrs({
            skilllimit_name22: value.skilllimit22+"_name}",
            skilllimit_value22: value.skilllimit22+"_total}"
        });
    });
});

on("change:skillattr23", function() {
    getAttrs(["skillattr23"], function(value) {
        setAttrs({
            skillattr_name23: value.skillattr23+"_name}",
            skillattr_value23: value.skillattr23+"_total}"
        });
    });
});

on("change:skilllimit23", function() {
    getAttrs(["skilllimit23"], function(value) {
        setAttrs({
            skilllimit_name23: value.skilllimit23+"_name}",
            skilllimit_value23: value.skilllimit23+"_total}"
        });
    });
});

on("change:skillattr24", function() {
    getAttrs(["skillattr24"], function(value) {
        setAttrs({
            skillattr_name24: value.skillattr24+"_name}",
            skillattr_value24: value.skillattr24+"_total}"
        });
    });
});

on("change:skilllimit24", function() {
    getAttrs(["skilllimit24"], function(value) {
        setAttrs({
            skilllimit_name24: value.skilllimit24+"_name}",
            skilllimit_value24: value.skilllimit24+"_total}"
        });
    });
});

on("change:skillattr25", function() {
    getAttrs(["skillattr25"], function(value) {
        setAttrs({
            skillattr_name25: value.skillattr25+"_name}",
            skillattr_value25: value.skillattr25+"_total}"
        });
    });
});

on("change:skilllimit25", function() {
    getAttrs(["skilllimit25"], function(value) {
        setAttrs({
            skilllimit_name25: value.skilllimit25+"_name}",
            skilllimit_value25: value.skilllimit25+"_total}"
        });
    });
});

on("change:skillattr26", function() {
    getAttrs(["skillattr26"], function(value) {
        setAttrs({
            skillattr_name26: value.skillattr26+"_name}",
            skillattr_value26: value.skillattr26+"_total}"
        });
    });
});

on("change:skilllimit26", function() {
    getAttrs(["skilllimit26"], function(value) {
        setAttrs({
            skilllimit_name26: value.skilllimit26+"_name}",
            skilllimit_value26: value.skilllimit26+"_total}"
        });
    });
});

on("change:skillattr27", function() {
    getAttrs(["skillattr27"], function(value) {
        setAttrs({
            skillattr_name27: value.skillattr27+"_name}",
            skillattr_value27: value.skillattr27+"_total}"
        });
    });
});

on("change:skilllimit27", function() {
    getAttrs(["skilllimit27"], function(value) {
        setAttrs({
            skilllimit_name27: value.skilllimit27+"_name}",
            skilllimit_value27: value.skilllimit27+"_total}"
        });
    });
});

on("change:skillattr28", function() {
    getAttrs(["skillattr28"], function(value) {
        setAttrs({
            skillattr_name28: value.skillattr28+"_name}",
            skillattr_value28: value.skillattr28+"_total}"
        });
    });
});

on("change:skilllimit28", function() {
    getAttrs(["skilllimit28"], function(value) {
        setAttrs({
            skilllimit_name28: value.skilllimit28+"_name}",
            skilllimit_value28: value.skilllimit28+"_total}"
        });
    });
});

on("change:skillattr29", function() {
    getAttrs(["skillattr29"], function(value) {
        setAttrs({
            skillattr_name29: value.skillattr29+"_name}",
            skillattr_value29: value.skillattr29+"_total}"
        });
    });
});

on("change:skilllimit29", function() {
    getAttrs(["skilllimit29"], function(value) {
        setAttrs({
            skilllimit_name29: value.skilllimit29+"_name}",
            skilllimit_value29: value.skilllimit29+"_total}"
        });
    });
});

on("change:skillattr30", function() {
    getAttrs(["skillattr30"], function(value) {
        setAttrs({
            skillattr_name30: value.skillattr30+"_name}",
            skillattr_value30: value.skillattr30+"_total}"
        });
    });
});

on("change:skilllimit30", function() {
    getAttrs(["skilllimit30"], function(value) {
        setAttrs({
            skilllimit_name30: value.skilllimit30+"_name}",
            skilllimit_value30: value.skilllimit30+"_total}"
        });
    });
});

on("change:skillattr31", function() {
    getAttrs(["skillattr31"], function(value) {
        setAttrs({
            skillattr_name31: value.skillattr31+"_name}",
            skillattr_value31: value.skillattr31+"_total}"
        });
    });
});

on("change:skilllimit31", function() {
    getAttrs(["skilllimit31"], function(value) {
        setAttrs({
            skilllimit_name31: value.skilllimit31+"_name}",
            skilllimit_value31: value.skilllimit31+"_total}"
        });
    });
});
on("change:skillattr32", function() {
    getAttrs(["skillattr32"], function(value) {
        setAttrs({
            skillattr_name32: value.skillattr32+"_name}",
            skillattr_value32: value.skillattr32+"_total}"
        });
    });
});

on("change:skilllimit32", function() {
    getAttrs(["skilllimit32"], function(value) {
        setAttrs({
            skilllimit_name32: value.skilllimit32+"_name}",
            skilllimit_value32: value.skilllimit32+"_total}"
        });
    });
});

on("change:skillattr33", function() {
    getAttrs(["skillattr33"], function(value) {
        setAttrs({
            skillattr_name33: value.skillattr33+"_name}",
            skillattr_value33: value.skillattr33+"_total}"
        });
    });
});

on("change:skilllimit33", function() {
    getAttrs(["skilllimit33"], function(value) {
        setAttrs({
            skilllimit_name33: value.skilllimit33+"_name}",
            skilllimit_value33: value.skilllimit33+"_total}"
        });
    });
});

on("change:skillattr34", function() {
    getAttrs(["skillattr34"], function(value) {
        setAttrs({
            skillattr_name34: value.skillattr34+"_name}",
            skillattr_value34: value.skillattr34+"_total}"
        });
    });
});

on("change:skilllimit34", function() {
    getAttrs(["skilllimit34"], function(value) {
        setAttrs({
            skilllimit_name34: value.skilllimit34+"_name}",
            skilllimit_value34: value.skilllimit34+"_total}"
        });
    });
});

on("change:skillattr35", function() {
    getAttrs(["skillattr35"], function(value) {
        setAttrs({
            skillattr_name35: value.skillattr35+"_name}",
            skillattr_value35: value.skillattr35+"_total}"
        });
    });
});

on("change:skilllimit35", function() {
    getAttrs(["skilllimit35"], function(value) {
        setAttrs({
            skilllimit_name35: value.skilllimit35+"_name}",
            skilllimit_value35: value.skilllimit35+"_total}"
        });
    });
});

on("change:skillattr36", function() {
    getAttrs(["skillattr36"], function(value) {
        setAttrs({
            skillattr_name36: value.skillattr36+"_name}",
            skillattr_value36: value.skillattr36+"_total}"
        });
    });
});

on("change:skilllimit36", function() {
    getAttrs(["skilllimit36"], function(value) {
        setAttrs({
            skilllimit_name36: value.skilllimit36+"_name}",
            skilllimit_value36: value.skilllimit36+"_total}"
        });
    });
});

on("change:skillattr37", function() {
    getAttrs(["skillattr37"], function(value) {
        setAttrs({
            skillattr_name37: value.skillattr37+"_name}",
            skillattr_value37: value.skillattr37+"_total}"
        });
    });
});

on("change:skilllimit37", function() {
    getAttrs(["skilllimit37"], function(value) {
        setAttrs({
            skilllimit_name37: value.skilllimit37+"_name}",
            skilllimit_value37: value.skilllimit37+"_total}"
        });
    });
});

on("change:skillattr38", function() {
    getAttrs(["skillattr38"], function(value) {
        setAttrs({
            skillattr_name38: value.skillattr38+"_name}",
            skillattr_value38: value.skillattr38+"_total}"
        });
    });
});

on("change:skilllimit38", function() {
    getAttrs(["skilllimit38"], function(value) {
        setAttrs({
            skilllimit_name38: value.skilllimit38+"_name}",
            skilllimit_value38: value.skilllimit38+"_total}"
        });
    });
});

on("change:skillattr39", function() {
    getAttrs(["skillattr39"], function(value) {
        setAttrs({
            skillattr_name39: value.skillattr39+"_name}",
            skillattr_value39: value.skillattr39+"_total}"
        });
    });
});

on("change:skilllimit39", function() {
    getAttrs(["skilllimit39"], function(value) {
        setAttrs({
            skilllimit_name39: value.skilllimit39+"_name}",
            skilllimit_value39: value.skilllimit39+"_total}"
        });
    });
});

on("change:skillattr40", function() {
    getAttrs(["skillattr40"], function(value) {
        setAttrs({
            skillattr_name40: value.skillattr40+"_name}",
            skillattr_value40: value.skillattr40+"_total}"
        });
    });
});

on("change:skilllimit40", function() {
    getAttrs(["skilllimit40"], function(value) {
        setAttrs({
            skilllimit_name40: value.skilllimit40+"_name}",
            skilllimit_value40: value.skilllimit40+"_total}"
        });
    });
});

on("change:skillattr41", function() {
    getAttrs(["skillattr41"], function(value) {
        setAttrs({
            skillattr_name41: value.skillattr41+"_name}",
            skillattr_value41: value.skillattr41+"_total}"
        });
    });
});

on("change:skilllimit41", function() {
    getAttrs(["skilllimit41"], function(value) {
        setAttrs({
            skilllimit_name41: value.skilllimit41+"_name}",
            skilllimit_value41: value.skilllimit41+"_total}"
        });
    });
});
on("change:skillattr42", function() {
    getAttrs(["skillattr42"], function(value) {
        setAttrs({
            skillattr_name42: value.skillattr42+"_name}",
            skillattr_value42: value.skillattr42+"_total}"
        });
    });
});

on("change:skilllimit42", function() {
    getAttrs(["skilllimit42"], function(value) {
        setAttrs({
            skilllimit_name42: value.skilllimit42+"_name}",
            skilllimit_value42: value.skilllimit42+"_total}"
        });
    });
});

on("change:skillattr43", function() {
    getAttrs(["skillattr43"], function(value) {
        setAttrs({
            skillattr_name43: value.skillattr43+"_name}",
            skillattr_value43: value.skillattr43+"_total}"
        });
    });
});

on("change:skilllimit43", function() {
    getAttrs(["skilllimit43"], function(value) {
        setAttrs({
            skilllimit_name43: value.skilllimit43+"_name}",
            skilllimit_value43: value.skilllimit43+"_total}"
        });
    });
});

on("change:skillattr44", function() {
    getAttrs(["skillattr44"], function(value) {
        setAttrs({
            skillattr_name44: value.skillattr44+"_name}",
            skillattr_value44: value.skillattr44+"_total}"
        });
    });
});

on("change:skilllimit44", function() {
    getAttrs(["skilllimit44"], function(value) {
        setAttrs({
            skilllimit_name44: value.skilllimit44+"_name}",
            skilllimit_value44: value.skilllimit44+"_total}"
        });
    });
});

on("change:skillattr45", function() {
    getAttrs(["skillattr45"], function(value) {
        setAttrs({
            skillattr_name45: value.skillattr45+"_name}",
            skillattr_value45: value.skillattr45+"_total}"
        });
    });
});

on("change:skilllimit45", function() {
    getAttrs(["skilllimit45"], function(value) {
        setAttrs({
            skilllimit_name45: value.skilllimit45+"_name}",
            skilllimit_value45: value.skilllimit45+"_total}"
        });
    });
});

on("change:skillattr46", function() {
    getAttrs(["skillattr46"], function(value) {
        setAttrs({
            skillattr_name46: value.skillattr46+"_name}",
            skillattr_value46: value.skillattr46+"_total}"
        });
    });
});

on("change:skilllimit46", function() {
    getAttrs(["skilllimit46"], function(value) {
        setAttrs({
            skilllimit_name46: value.skilllimit46+"_name}",
            skilllimit_value46: value.skilllimit46+"_total}"
        });
    });
});

on("change:skillattr47", function() {
    getAttrs(["skillattr47"], function(value) {
        setAttrs({
            skillattr_name47: value.skillattr47+"_name}",
            skillattr_value47: value.skillattr47+"_total}"
        });
    });
});

on("change:skilllimit47", function() {
    getAttrs(["skilllimit47"], function(value) {
        setAttrs({
            skilllimit_name47: value.skilllimit47+"_name}",
            skilllimit_value47: value.skilllimit47+"_total}"
        });
    });
});

on("change:skillattr48", function() {
    getAttrs(["skillattr48"], function(value) {
        setAttrs({
            skillattr_name48: value.skillattr48+"_name}",
            skillattr_value48: value.skillattr48+"_total}"
        });
    });
});

on("change:skilllimit48", function() {
    getAttrs(["skilllimit48"], function(value) {
        setAttrs({
            skilllimit_name48: value.skilllimit48+"_name}",
            skilllimit_value48: value.skilllimit48+"_total}"
        });
    });
});

on("change:skillattr49", function() {
    getAttrs(["skillattr49"], function(value) {
        setAttrs({
            skillattr_name49: value.skillattr49+"_name}",
            skillattr_value49: value.skillattr49+"_total}"
        });
    });
});

on("change:skilllimit49", function() {
    getAttrs(["skilllimit49"], function(value) {
        setAttrs({
            skilllimit_name49: value.skilllimit49+"_name}",
            skilllimit_value49: value.skilllimit49+"_total}"
        });
    });
});

on("change:skillattr50", function() {
    getAttrs(["skillattr50"], function(value) {
        setAttrs({
            skillattr_name50: value.skillattr50+"_name}",
            skillattr_value50: value.skillattr50+"_total}"
        });
    });
});

on("change:skilllimit50", function() {
    getAttrs(["skilllimit50"], function(value) {
        setAttrs({
            skilllimit_name50: value.skilllimit50+"_name}",
            skilllimit_value50: value.skilllimit50+"_total}"
        });
    });
});

on("change:skillattr51", function() {
    getAttrs(["skillattr51"], function(value) {
        setAttrs({
            skillattr_name51: value.skillattr51+"_name}",
            skillattr_value51: value.skillattr51+"_total}"
        });
    });
});

on("change:skilllimit51", function() {
    getAttrs(["skilllimit51"], function(value) {
        setAttrs({
            skilllimit_name51: value.skilllimit51+"_name}",
            skilllimit_value51: value.skilllimit51+"_total}"
        });
    });
});
on("change:skillattr52", function() {
    getAttrs(["skillattr52"], function(value) {
        setAttrs({
            skillattr_name52: value.skillattr52+"_name}",
            skillattr_value52: value.skillattr52+"_total}"
        });
    });
});

on("change:skilllimit52", function() {
    getAttrs(["skilllimit52"], function(value) {
        setAttrs({
            skilllimit_name52: value.skilllimit52+"_name}",
            skilllimit_value52: value.skilllimit52+"_total}"
        });
    });
});

on("change:skillattr53", function() {
    getAttrs(["skillattr53"], function(value) {
        setAttrs({
            skillattr_name53: value.skillattr53+"_name}",
            skillattr_value53: value.skillattr53+"_total}"
        });
    });
});

on("change:skilllimit53", function() {
    getAttrs(["skilllimit53"], function(value) {
        setAttrs({
            skilllimit_name53: value.skilllimit53+"_name}",
            skilllimit_value53: value.skilllimit53+"_total}"
        });
    });
});

on("change:skillattr54", function() {
    getAttrs(["skillattr54"], function(value) {
        setAttrs({
            skillattr_name54: value.skillattr54+"_name}",
            skillattr_value54: value.skillattr54+"_total}"
        });
    });
});

on("change:skilllimit54", function() {
    getAttrs(["skilllimit54"], function(value) {
        setAttrs({
            skilllimit_name54: value.skilllimit54+"_name}",
            skilllimit_value54: value.skilllimit54+"_total}"
        });
    });
});

on("change:skillattr55", function() {
    getAttrs(["skillattr55"], function(value) {
        setAttrs({
            skillattr_name55: value.skillattr55+"_name}",
            skillattr_value55: value.skillattr55+"_total}"
        });
    });
});

on("change:skilllimit55", function() {
    getAttrs(["skilllimit55"], function(value) {
        setAttrs({
            skilllimit_name55: value.skilllimit55+"_name}",
            skilllimit_value55: value.skilllimit55+"_total}"
        });
    });
});

on("change:skillattr56", function() {
    getAttrs(["skillattr56"], function(value) {
        setAttrs({
            skillattr_name56: value.skillattr56+"_name}",
            skillattr_value56: value.skillattr56+"_total}"
        });
    });
});

on("change:skilllimit56", function() {
    getAttrs(["skilllimit56"], function(value) {
        setAttrs({
            skilllimit_name56: value.skilllimit56+"_name}",
            skilllimit_value56: value.skilllimit56+"_total}"
        });
    });
});

on("change:skillattr57", function() {
    getAttrs(["skillattr57"], function(value) {
        setAttrs({
            skillattr_name57: value.skillattr57+"_name}",
            skillattr_value57: value.skillattr57+"_total}"
        });
    });
});

on("change:skilllimit57", function() {
    getAttrs(["skilllimit57"], function(value) {
        setAttrs({
            skilllimit_name57: value.skilllimit57+"_name}",
            skilllimit_value57: value.skilllimit57+"_total}"
        });
    });
});

on("change:skillattr58", function() {
    getAttrs(["skillattr58"], function(value) {
        setAttrs({
            skillattr_name58: value.skillattr58+"_name}",
            skillattr_value58: value.skillattr58+"_total}"
        });
    });
});

on("change:skilllimit58", function() {
    getAttrs(["skilllimit58"], function(value) {
        setAttrs({
            skilllimit_name58: value.skilllimit58+"_name}",
            skilllimit_value58: value.skilllimit58+"_total}"
        });
    });
});

on("change:skillattr59", function() {
    getAttrs(["skillattr59"], function(value) {
        setAttrs({
            skillattr_name59: value.skillattr59+"_name}",
            skillattr_value59: value.skillattr59+"_total}"
        });
    });
});

on("change:skilllimit59", function() {
    getAttrs(["skilllimit59"], function(value) {
        setAttrs({
            skilllimit_name59: value.skilllimit59+"_name}",
            skilllimit_value59: value.skilllimit59+"_total}"
        });
    });
});

on("change:skillattr60", function() {
    getAttrs(["skillattr60"], function(value) {
        setAttrs({
            skillattr_name60: value.skillattr60+"_name}",
            skillattr_value60: value.skillattr60+"_total}"
        });
    });
});

on("change:skilllimit60", function() {
    getAttrs(["skilllimit60"], function(value) {
        setAttrs({
            skilllimit_name60: value.skilllimit60+"_name}",
            skilllimit_value60: value.skilllimit60+"_total}"
        });
    });
});

on("change:skillattr61", function() {
    getAttrs(["skillattr61"], function(value) {
        setAttrs({
            skillattr_name61: value.skillattr61+"_name}",
            skillattr_value61: value.skillattr61+"_total}"
        });
    });
});

on("change:skilllimit61", function() {
    getAttrs(["skilllimit61"], function(value) {
        setAttrs({
            skilllimit_name61: value.skilllimit61+"_name}",
            skilllimit_value61: value.skilllimit61+"_total}"
        });
    });
});
on("change:skillattr62", function() {
    getAttrs(["skillattr62"], function(value) {
        setAttrs({
            skillattr_name62: value.skillattr62+"_name}",
            skillattr_value62: value.skillattr62+"_total}"
        });
    });
});

on("change:skilllimit62", function() {
    getAttrs(["skilllimit62"], function(value) {
        setAttrs({
            skilllimit_name62: value.skilllimit62+"_name}",
            skilllimit_value62: value.skilllimit62+"_total}"
        });
    });
});

on("change:skillattr63", function() {
    getAttrs(["skillattr63"], function(value) {
        setAttrs({
            skillattr_name63: value.skillattr63+"_name}",
            skillattr_value63: value.skillattr63+"_total}"
        });
    });
});

on("change:skilllimit63", function() {
    getAttrs(["skilllimit63"], function(value) {
        setAttrs({
            skilllimit_name63: value.skilllimit63+"_name}",
            skilllimit_value63: value.skilllimit63+"_total}"
        });
    });
});

on("change:skillattr64", function() {
    getAttrs(["skillattr64"], function(value) {
        setAttrs({
            skillattr_name64: value.skillattr64+"_name}",
            skillattr_value64: value.skillattr64+"_total}"
        });
    });
});

on("change:skilllimit64", function() {
    getAttrs(["skilllimit64"], function(value) {
        setAttrs({
            skilllimit_name64: value.skilllimit64+"_name}",
            skilllimit_value64: value.skilllimit64+"_total}"
        });
    });
});

on("change:skillattr65", function() {
    getAttrs(["skillattr65"], function(value) {
        setAttrs({
            skillattr_name65: value.skillattr65+"_name}",
            skillattr_value65: value.skillattr65+"_total}"
        });
    });
});

on("change:skilllimit65", function() {
    getAttrs(["skilllimit65"], function(value) {
        setAttrs({
            skilllimit_name65: value.skilllimit65+"_name}",
            skilllimit_value65: value.skilllimit65+"_total}"
        });
    });
});

on("change:skillattr66", function() {
    getAttrs(["skillattr66"], function(value) {
        setAttrs({
            skillattr_name66: value.skillattr66+"_name}",
            skillattr_value66: value.skillattr66+"_total}"
        });
    });
});

on("change:skilllimit66", function() {
    getAttrs(["skilllimit66"], function(value) {
        setAttrs({
            skilllimit_name66: value.skilllimit66+"_name}",
            skilllimit_value66: value.skilllimit66+"_total}"
        });
    });
});

on("change:skillattr67", function() {
    getAttrs(["skillattr67"], function(value) {
        setAttrs({
            skillattr_name67: value.skillattr67+"_name}",
            skillattr_value67: value.skillattr67+"_total}"
        });
    });
});

on("change:skilllimit67", function() {
    getAttrs(["skilllimit67"], function(value) {
        setAttrs({
            skilllimit_name67: value.skilllimit67+"_name}",
            skilllimit_value67: value.skilllimit67+"_total}"
        });
    });
});

on("change:skillattr68", function() {
    getAttrs(["skillattr68"], function(value) {
        setAttrs({
            skillattr_name68: value.skillattr68+"_name}",
            skillattr_value68: value.skillattr68+"_total}"
        });
    });
});

on("change:skilllimit68", function() {
    getAttrs(["skilllimit68"], function(value) {
        setAttrs({
            skilllimit_name68: value.skilllimit68+"_name}",
            skilllimit_value68: value.skilllimit68+"_total}"
        });
    });
});

on("change:skillattr69", function() {
    getAttrs(["skillattr69"], function(value) {
        setAttrs({
            skillattr_name69: value.skillattr69+"_name}",
            skillattr_value69: value.skillattr69+"_total}"
        });
    });
});

on("change:skilllimit69", function() {
    getAttrs(["skilllimit69"], function(value) {
        setAttrs({
            skilllimit_name69: value.skilllimit69+"_name}",
            skilllimit_value69: value.skilllimit69+"_total}"
        });
    });
});

on("change:skillattr70", function() {
    getAttrs(["skillattr70"], function(value) {
        setAttrs({
            skillattr_name70: value.skillattr70+"_name}",
            skillattr_value70: value.skillattr70+"_total}"
        });
    });
});

on("change:skilllimit70", function() {
    getAttrs(["skilllimit70"], function(value) {
        setAttrs({
            skilllimit_name70: value.skilllimit70+"_name}",
            skilllimit_value70: value.skilllimit70+"_total}"
        });
    });
});

on("change:skillattr71", function() {
    getAttrs(["skillattr71"], function(value) {
        setAttrs({
            skillattr_name71: value.skillattr71+"_name}",
            skillattr_value71: value.skillattr71+"_total}"
        });
    });
});

on("change:skilllimit71", function() {
    getAttrs(["skilllimit71"], function(value) {
        setAttrs({
            skilllimit_name71: value.skilllimit71+"_name}",
            skilllimit_value71: value.skilllimit71+"_total}"
        });
    });
});
on("change:skillattr72", function() {
    getAttrs(["skillattr72"], function(value) {
        setAttrs({
            skillattr_name72: value.skillattr72+"_name}",
            skillattr_value72: value.skillattr72+"_total}"
        });
    });
});

on("change:skilllimit72", function() {
    getAttrs(["skilllimit72"], function(value) {
        setAttrs({
            skilllimit_name72: value.skilllimit72+"_name}",
            skilllimit_value72: value.skilllimit72+"_total}"
        });
    });
});

on("change:skillattr73", function() {
    getAttrs(["skillattr73"], function(value) {
        setAttrs({
            skillattr_name73: value.skillattr73+"_name}",
            skillattr_value73: value.skillattr73+"_total}"
        });
    });
});

on("change:skilllimit73", function() {
    getAttrs(["skilllimit73"], function(value) {
        setAttrs({
            skilllimit_name73: value.skilllimit73+"_name}",
            skilllimit_value73: value.skilllimit73+"_total}"
        });
    });
});

on("change:skillattr74", function() {
    getAttrs(["skillattr74"], function(value) {
        setAttrs({
            skillattr_name74: value.skillattr74+"_name}",
            skillattr_value74: value.skillattr74+"_total}"
        });
    });
});

on("change:skilllimit74", function() {
    getAttrs(["skilllimit74"], function(value) {
        setAttrs({
            skilllimit_name74: value.skilllimit74+"_name}",
            skilllimit_value74: value.skilllimit74+"_total}"
        });
    });
});

on("change:skillattr75", function() {
    getAttrs(["skillattr75"], function(value) {
        setAttrs({
            skillattr_name75: value.skillattr75+"_name}",
            skillattr_value75: value.skillattr75+"_total}"
        });
    });
});

on("change:skilllimit75", function() {
    getAttrs(["skilllimit75"], function(value) {
        setAttrs({
            skilllimit_name75: value.skilllimit75+"_name}",
            skilllimit_value75: value.skilllimit75+"_total}"
        });
    });
});

on("change:skillattr76", function() {
    getAttrs(["skillattr76"], function(value) {
        setAttrs({
            skillattr_name76: value.skillattr76+"_name}",
            skillattr_value76: value.skillattr76+"_total}"
        });
    });
});

on("change:skilllimit76", function() {
    getAttrs(["skilllimit76"], function(value) {
        setAttrs({
            skilllimit_name76: value.skilllimit76+"_name}",
            skilllimit_value76: value.skilllimit76+"_total}"
        });
    });
});

on("change:repeating_knowledge:knowledgeattr", function() {
    getAttrs(["repeating_knowledge_knowledgeattr"], function(value) {
        setAttrs({
            repeating_knowledge_knowledgeattr_name: value.repeating_knowledge_knowledgeattr+"_name}",
            repeating_knowledge_knowledgeattr_total: value.repeating_knowledge_knowledgeattr+"_total}"
        });
    });
});

on('change:repeating_armors remove:repeating_armors', function(){
    TAS.repeating('armors')
    .attrs('armor_total')
    .fields('armorrating', 'armorworn')
    .reduce(function(m,r){
        if(r.armorworn === "on") {
            m.armorrating += r.F.armorrating;
        }
        return m;
    },
    {armorrating:0,armorworn:0, desc: []}, function (m,r,a){
        a.armor_total=m.armorrating;
    })
    .execute();
});