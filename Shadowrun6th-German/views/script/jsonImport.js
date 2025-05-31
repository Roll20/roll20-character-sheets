
on("sheet:opened change:json",function(){
    console.log("json changed");
    setAttrs({jsonerg: " "});
});

on("clicked:jsonimport",function(){
    console.log("Importjson");
    ;
        getAttrs(["json"], function (v) {
         importerror = false;
         let data;
         try{
              data   = JSON.parse(v.json);
         
            } catch(err){
                importerror = true;
            }
        if (!importerror && v.jsonimport != "") {
          //  clearSheet();
          try{ 
              writeToSheet(data);
              setAttrs({jsonerg: "import erfolgreich!"});
              
            } 
            catch(err){
                setAttrs({json: "Fehler beim importieren: " + err});
                setAttrs({jsonerg: ""})
            }
        } else {
            setAttrs({json: "Fehler beim Parsen des JSON-Strings!"});
            setAttrs({jsonerg: ""})
        }
          
        });
    });

function writeToSheet (data) {
    let c = {};


//c["character_name"]=data["streetName"]||"";
c["metatyp"]=data["metaType"]||"";
c["gender"]=data["gender"]||"";
c["age"]=data["age"]||"";
//c["heat"]=data["heat"]||"0";
c["karma"]=data["freeKarma"]||"0";
c["name"]=data["name"]||"";
c["magictype"]=data["metamagic"]||"";
c["size"]=data["size"]||"";
c["weigth"]=data["weigth"]||"";
//c["essenz"]=data["essenz"]||"";
//c["reputation"]=data["reputation"]||"";
c["karmatotal"]=data["karma"]||"0";


console.log("Body Base= " + data["attributes"][0]["points"]);
c["body_base"]=parseInt(data["attributes"][0]["points"])||0;
c["body_modifier"]=(parseInt(data["attributes"][0]["modifiedValue"])||0)-c["body_base"];


c["agility_base"]=parseInt(data["attributes"][1]["points"])||0;
c["agility_modifier"]=(parseInt(data["attributes"][1]["modifiedValue"])||0)-c["agility_base"];


c["reaction_base"]=parseInt(data["attributes"][2]["points"])||0;
c["reaction_modifier"]=(parseInt(data["attributes"][2]["modifiedValue"])||0)-c["reaction_base"];


c["strength_base"]=parseInt(data["attributes"][3]["points"])||0;
c["strength_modifier"]=(parseInt(data["attributes"][3]["modifiedValue"])||0)-c["strength_base"];


c["willpower_base"]=parseInt(data["attributes"][4]["points"])||0;
c["willpower_modifier"]=(parseInt(data["attributes"][4]["modifiedValue"])||0)-c["willpower_base"];


c["logic_base"]=parseInt(data["attributes"][5]["points"])||0;
c["logic_modifier"]=(parseInt(data["attributes"][5]["modifiedValue"])||0)-c["logic_base"];


c["intuition_base"]=parseInt(data["attributes"][6]["points"])||0;
c["intuition_modifier"]=(parseInt(data["attributes"][6]["modifiedValue"])||0)-c["intuition_base"];


c["charisma_base"]=parseInt(data["attributes"][7]["points"])||0;

c["charisma_modifier"]=(parseInt(data["attributes"][7]["modifiedValue"])||0)-c["charisma_base"];


c["edge_base"]=parseInt(data["attributes"][8]["points"])||0;
c["edge_modifier"]=(parseInt(data["attributes"][8]["modifiedValue"])||0)-c["edge_base"];

c["magic_base"]=parseInt(data["attributes"][9]["modifiedValue"])||0;
c["display_inigrade"]=parseInt(data["initiation"])||0;
c["display_resonance"]=parseInt(data["attributes"][10]["modifiedValue"])||0;

c["display_powerpoints"]=parseInt(data["attributes"][11]["modifiedValue"])||0;

let attrtranslate={};
attrtranslate["Geschicklichkeit"]="agility";
attrtranslate["Charisma"]="agility";
attrtranslate["Logik"]="logic";
attrtranslate["Intuition"]="intuition";
attrtranslate["Willenskraft"]="willpower";
attrtranslate["Stärke"]="strength";
attrtranslate["Reaktion"]="reaction";
attrtranslate["Magie"]="magic";
attrtranslate["Resonanze"]="resonance";

getSectionIDs("repeating_language", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_language_" + idarray[i]);
    }
  });
  getSectionIDs("repeating_knowledge", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_knowledge_" + idarray[i]);
    }
  });



console.log("Skills");
for (var i = 0; i < data["skills"].length; i++) {
    console.log("Skill= " + data["skills"][i].name);
    if(data["skills"][i].id=="knowledge"){
        console.log("Know= " + data["skills"][i].name);
        newrowid = generateRowID();
        c["repeating_knowledge_" + newrowid + "_knowledge_name"]=data["skills"][i].name||"";
        //c["repeating_knowledge_" + newrowid + "_knowledge_desc"]=data["knowledge_desc"];
    }
    if(data["skills"][i].id=="language"){
        console.log("Lang= " + data["skills"][i].name);
        newrowid = generateRowID();
        c["repeating_language_" + newrowid + "_language_name"]=data["skills"][i].name;
        c["repeating_language_" + newrowid + "_language_level"]=data["skills"][i].rating;
        if (c["repeating_language_" + newrowid + "_language_level"]==4) c["repeating_language_" + newrowid + "_language_level"]=99;
    }
    if(data["skills"][i].id!="language" && data["skills"][i].id!="knowledge"){

        if(data["skills"][i].id=="close_combat") data["skills"][i].id="melee";

        console.log("set skill_" + data["skills"][i].id + "_base=" + data["skills"][i].rating.toString());
        c["skill_" + data["skills"][i].id + "_base"]=data["skills"][i].rating;
         c["skill_" + data["skills"][i].id + "_attribute"]="display_" +attrtranslate[data["skills"][i].attribute];
          if (data["skills"][i].specializations.length>0)
           {
                c["skill_" + data["skills"][i].id + "_spec"]=data["skills"][i].specializations[0].name;
                if (data["skills"][i].specializations[0].expertise)  c["skill_" + data["skills"][i].id + "_exp"]=data["skills"][i].specializations[0].name;
          }
    }
    
}



getSectionIDs("repeating_sins", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_sins_" + idarray[i]);
    }
  });


getSectionIDs("repeating_perks", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_perks_" + idarray[i]);
    }
  });
getSectionIDs("repeating_contacts", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_contacts_" + idarray[i]);
    }
  });
getSectionIDs("repeating_armor", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_armor_" + idarray[i]);
    }
  });
  
getSectionIDs("repeating_cyberware", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_cyberware_" + idarray[i]);
    }
  });
getSectionIDs("repeating_gear", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_gear_" + idarray[i]);
    }
  });
getSectionIDs("repeating_spells", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_spells_" + idarray[i]);
    }
  });
  
  getSectionIDs("repeating_vehicle", function(idarray) {
      for(var i=0; i < idarray.length; i++) {
        removeRepeatingRow("repeating_vehicle_" + idarray[i]);
      }
    });
  getSectionIDs("repeating_adeptpowers", function(idarray) {
      for(var i=0; i < idarray.length; i++) {
        removeRepeatingRow("repeating_adeptpowers_" + idarray[i]);
      }
    });
  console.log("Adeptenkräfte");
  data["adeptPowers"].sort(function(a,b) {
    if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    
      // Namen müssen gleich sein
      return 0;
  });

  for (var i = 0; i < data["adeptPowers"].length; i++) {
      console.log(data["adeptPowers"][i].name||"");
      let rw="repeating_adeptpowers_";
      newrowid = generateRowID();
      c[rw + newrowid + "_" + "adept_power_name"]=   data["adeptPowers"][i].name||"";
      c[rw + newrowid + "_" + "adept_power_level"]=   parseInt(data["adeptPowers"][i].name[data["adeptPowers"][i].name.length-1])||0;
      c[rw + newrowid + "_" + "adept_power_cost"]=   data["adeptPowers"][i].cost||"0";
      c[rw + newrowid + "_" + "adept_power_rules"]=   data["adeptPowers"][i].page||"";
     
    if (c[rw + newrowid + "_" + "adept_power_level"]>0) 
        c[rw + newrowid + "_" + "adept_power_name"]=c[rw + newrowid + "_" + "adept_power_name"].substring(0,c[rw + newrowid + "_" + "adept_power_name"].length-1)
    console.log("NAME: " + c[rw + newrowid + "_" + "adept_power_name"]);
   
  
  }
  console.log("Dronen");
  data["drones"].sort(function(a,b) {
    if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    
      // Namen müssen gleich sein
      return 0;
  });

  for (var i = 0; i < data["drones"].length; i++) {
      console.log(data["drones"][i].name||"");
      let rw="repeating_vehicle_";
      newrowid = generateRowID();
      c[rw + newrowid + "_" + "vehicle_name"]=   data["drones"][i].name||"";
      c[rw + newrowid + "_" + "vehicle_art"]= "Drone";
      c[rw + newrowid + "_" + "vehicle_hand"]=   data["drones"][i].handling[0]||"";
      c[rw + newrowid + "_" + "vehicle_vel"]=   data["drones"][i].acceleration||"0";
      c[rw + newrowid + "_" + "vehicle_interv"]=   data["drones"][i].speed.split("/")[1]
      c[rw + newrowid + "_" + "vehicle_speedmax"]=   data["drones"][i].speed.split("/")[0]||"0";
      c[rw + newrowid + "_" + "vehicle_pilot"]=   data["drones"][i].pilot||"0";
      c[rw + newrowid + "_" + "vehicle_body"]=   data["drones"][i].body||"0";
      c[rw + newrowid + "_" + "vehicle_sensor"]=   data["drones"][i].sensor||"0";
      c[rw + newrowid + "_" + "vehicle_armor"]=   data["drones"][i].armor||"0";
      c[rw + newrowid + "_" + "vehicle_desc"]=   data["drones"][i].page||"";
      c[rw + newrowid + "_" + "vehicle_desc"]+="\r\nHandling: " +   data["vehicles"][i].handling||"";

    
   
  
  }




  
  console.log("Zauber");
  data["spells"].sort(function(a,b) {
    if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    
      // Namen müssen gleich sein
      return 0;
  });

  for (var i = 0; i < data["spells"].length; i++) {
      console.log(data["spells"][i].name||"");
      let rw="repeating_spells_";
      newrowid = generateRowID();
      c[rw + newrowid + "_" + "spell_name"]=   data["spells"][i].name||"";
      c[rw + newrowid + "_" + "spell_drain_base"]=   data["spells"][i].drain||"0";
      c[rw + newrowid + "_" + "spells_rules"]=   data["spells"][i].page||"";
      

    if(data["spells"][i].range.includes("Blickfeld")) c[rw + newrowid + "_" + "spellsrange"]="spells_range_bf";
    if(data["spells"][i].range.includes("Fläche")) c[rw + newrowid + "_" + "spellsrange"]="spells_range_bff";
    if(data["spells"][i].range.includes("Berührung")) c[rw + newrowid + "_" + "spellsrange"]="spells_range_b";

    if(data["spells"][i].category.includes("Kampfzauber")) c[rw + newrowid + "_" + "spellscategory"]="spells_combat_direct";
    if(data["spells"][i].category.includes("Wahrnehmungszauber")) c[rw + newrowid + "_" + "spellscategory"]="spells_detection";
    if(data["spells"][i].category.includes("Heilzauber")) c[rw + newrowid + "_" + "spellscategory"]="spells_health";
    if(data["spells"][i].category.includes("Illusionszauber")) c[rw + newrowid + "_" + "spellscategory"]="spells_illusion";
    if(data["spells"][i].category.includes("Manipulationszauber")) c[rw + newrowid + "_" + "spellscategory"]="spells_manipulation";
    
    
    if(data["spells"][i].duration.includes("Aufrechterhalten")) c[rw + newrowid + "_" + "spellsduration"]="spells_duration_s";
    if(data["spells"][i].duration.includes("Permanent")) c[rw + newrowid + "_" + "spellsduration"]="spells_duration_p";
    if(data["spells"][i].duration.includes("Sofort")) c[rw + newrowid + "_" + "spellsduration"]="spells_duration_i";
    
    if(data["spells"][i].type.includes("Physisch")) c[rw + newrowid + "_" + "spellstype"]="spells_type_p";
    if(data["spells"][i].type.includes("Mana")) c[rw + newrowid + "_" + "spellstype"]="spells_type_m";
    
  
  }
  console.log("Ausrüstung");
  for (var i = 0; i < data["items"].length; i++) {
      console.log(data["items"][i].name||"");
      let rw="repeating_gear_";
      newrowid = generateRowID();
      c[rw + newrowid + "_" + "gear_name"]=   data["items"][i].name||"";
      c[rw + newrowid + "_" + "gear_count"]=   data["items"][i].count||"0";
      c[rw + newrowid + "_" + "gear_ref"]=   data["items"][i].page||"";
      //c[rw + newrowid + "_" + "gear_desc"]=   data["items"][i].page||"";
  
  }



  console.log("Cyberware/bioware");
  for (var i = 0; i < data["augmentations"].length; i++) {
      console.log(data["augmentations"][i].name||"");
      let rw="repeating_cyberware_";
      newrowid = generateRowID();
      c[rw + newrowid + "_" + "cyberware_name"]=   data["augmentations"][i].name||"";
      c[rw + newrowid + "_" + "cyberware_level"]=   data["augmentations"][i].level||"0";
      c[rw + newrowid + "_" + "cyberware_ess"]=   data["augmentations"][i].essence||"0";
      c[rw + newrowid + "_" + "cyberware_desc"]=   data["augmentations"][i].page||"";
  
  }

  console.log("Rüstung");
  for (var i = 0; i < data["armors"].length; i++) {
      console.log(data["armors"][i].name||"");
      let rw="repeating_armor_";
      newrowid = generateRowID();
      c[rw + newrowid + "_" + "armor_name"]=   data["armors"][i].name||"";
      c[rw + newrowid + "_" + "armor_prot"]=   data["armors"][i].rating||"0";
    //  c[rw + newrowid + "_" + "armor_sozial"]=   data["armors"][i].type||"";
      c[rw + newrowid + "_" + "armor_desc"]= "";
      
      for(var j=0;j<data["armors"][i].accessories.length; j++) {
            c[rw + newrowid + "_" + "armor_desc"] += data["armors"][i].accessories[j].name+"\r\n";
      }
      c[rw + newrowid + "_" + "armor_desc"]+=  "\r\n" + data["armors"][i].page||"";
  
  }

console.log("Contackte");
for (var i = 0; i < data["contacts"].length; i++) {
    console.log(data["contacts"][i].name||"");
    let rw="repeating_contacts_";
    newrowid = generateRowID();
    c[rw + newrowid + "_" + "con_name"]=   data["contacts"][i].name||"";
    c[rw + newrowid + "_" + "con_desc"]=   data["contacts"][i].description||"";
    c[rw + newrowid + "_" + "con_type"]=   data["contacts"][i].type||"";
    c[rw + newrowid + "_" + "con_loyalty"]=   data["contacts"][i].loyalty||"";
    c[rw + newrowid + "_" + "con_influence"]=   data["contacts"][i].influence||"";
    c[rw + newrowid + "_" + "con_mod"]=   0;

}
console.log("Vor/nachteile");
for (var i = 0; i < data["qualities"].length; i++) {
    console.log(data["qualities"][i].name||"");
    let rw="repeating_perks_";
    newrowid = generateRowID();
    c[rw + newrowid + "_" + "perks_name"]=   data["qualities"][i].name||"";
    c[rw + newrowid + "_" + "perks_desc"]=   data["qualities"][i].page||"";
    if(( data["qualities"][i].positive||"")!=true)    c[rw + newrowid + "_" + "perks_type"]="nachteil"  ;
}

console.log("Sins");
for (var i = 0; i < data["sins"].length; i++) {
    console.log(data["sins"][i].name||"");
    let rw="repeating_sins_";
    newrowid = generateRowID();
    c[rw + newrowid + "_" + "sin_name"]=   data["sins"][i].name||"";
    c[rw + newrowid + "_" + "sin_level"]=   data["sins"][i].quality||"";
    c[rw + newrowid + "_" + "sin_desc"]=   data["sins"][i].description+"\r\n"||"";
    c[rw + newrowid + "_" + "sin_desc"]+="Lizenzen:\r\n";
    for(var j=0;j<data["licenses"].length; j++) {
        if (data["licenses"][j].sin==data["sins"][i].name) 
        c[rw + newrowid + "_" + "sin_desc"] += data["licenses"][j].name+"\r\n";
    }


}





getSectionIDs("repeating_rangeweapons", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_rangeweapons_" + idarray[i]);
    }
  });
getSectionIDs("repeating_meleeweapons", function(idarray) {
    for(var i=0; i < idarray.length; i++) {
      removeRepeatingRow("repeating_meleeweapons_" + idarray[i]);
    }
  });

  for (var i = 0; i < data["closeCombatWeapons"].length; i++) {
    console.log(data["closeCombatWeapons"][i].name||"");
    newrowid = generateRowID();
    let rw="repeating_meleeweapons_";
    c[rw + newrowid + "_rwskill"]="firearms";
    c[rw + newrowid + "_" + "melee_name"]=   data["closeCombatWeapons"][i].name||"";
    c[rw + newrowid + "_" + "melee_attack_pool"]=   data["closeCombatWeapons"][i].pool||"1";
    c[rw + newrowid + "_" + "meleeweapondamage"]=   data["closeCombatWeapons"][i].damage[0]||"0";
    if((data["closeCombatWeapons"][i].damage[data["closeCombatWeapons"][i].damage.length-1]||"k")=="K")         c[rw + newrowid + "_" + "mwtype"]= "phys" ;
    if((data["closeCombatWeapons"][i].damage[data["closeCombatWeapons"][i].damage.length-1]||"k")=="G")         c[rw + newrowid + "_" + "mwtype"]= "stun" ;
    if((data["closeCombatWeapons"][i].damage[data["closeCombatWeapons"][i].damage.length-1]||"k")==")")        c[rw + newrowid + "_" + "mwtype"]= "shock" ;
   
    let aws=data["closeCombatWeapons"][i].attackRating.split("/");
    c[rw + newrowid + "_" + "melee_attack_rating"]=  aws[0]||"0";
   
}



for (var i = 0; i < data["longRangeWeapons"].length; i++) {
    console.log(data["longRangeWeapons"][i].name||"");
    newrowid = generateRowID();
    let rw="repeating_rangeweapons_";
    c[rw + newrowid + "_rwskill"]="firearms";
    c[rw + newrowid + "_" + "range_name"]=   data["longRangeWeapons"][i].name||"";
    c[rw + newrowid + "_" + "range_attack_pool"]=   data["longRangeWeapons"][i].pool||"1";
    c[rw + newrowid + "_" + "rangeweapondamage"]=   data["longRangeWeapons"][i].damage[0]||"0";
    if((data["longRangeWeapons"][i].damage[data["longRangeWeapons"][i].damage.length-1]||"k")=="K")         c[rw + newrowid + "_" + "rwtype"]= "phys" ;
    if((data["longRangeWeapons"][i].damage[data["longRangeWeapons"][i].damage.length-1]||"k")=="G")         c[rw + newrowid + "_" + "rwtype"]= "stun" ;
    if((data["longRangeWeapons"][i].damage[data["longRangeWeapons"][i].damage.length-1]||"k")==")")        c[rw + newrowid + "_" + "rwtype"]= "shock" ;
    if (data["longRangeWeapons"][i].mode.includes("HM")) c[rw + newrowid + "_" + "firemode"]=1;
    if (data["longRangeWeapons"][i].mode.includes("SM")) c[rw + newrowid + "_" + "firemode"]=2;
    if (data["longRangeWeapons"][i].mode.includes("HM/SM")) c[rw + newrowid + "_" + "firemode"]=3;
    if (data["longRangeWeapons"][i].mode.includes("AM")) c[rw + newrowid + "_" + "firemode"]=4;
    if (data["longRangeWeapons"][i].mode.includes("HM/AM")) c[rw + newrowid + "_" + "firemode"]=5;
    if (data["longRangeWeapons"][i].mode.includes("SM/AM")) c[rw + newrowid + "_" + "firemode"]=6;
    if (data["longRangeWeapons"][i].mode.includes("HM/SM/AM")) c[rw + newrowid + "_" + "firemode"]=7;
    let aws=data["longRangeWeapons"][i].attackRating.split("/");
    c[rw + newrowid + "_" + "attack_rating_vclose"]=  aws[0]||"0";
    c[rw + newrowid + "_" + "attack_rating_close"]=  aws[1]||"0";
    c[rw + newrowid + "_" + "attack_rating_medium"]=  aws[2]||"0";
    c[rw + newrowid + "_" + "attack_rating_long"]=  aws[3]||"0";
    c[rw + newrowid + "_" + "attack_rating_vlong"]=  aws[4]||"0";
}




    console.log(Object.entries(c));
    setAttrs(c);
};