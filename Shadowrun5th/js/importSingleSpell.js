function importSingleSpell(spell, attributes, spellcasting, ritual, alchemy) {
    var category = "spells";
    if(spell.category_english == "Rituals") {
        category = "rituals"
    }
    if(spell.alchemy == "True"){
        category = "alchemy"
    }

    var row = "repeating_" + category + "_" + generateRowID();

    attributes[row + "_spellname"] = spell.name;
    attributes[row + "_spelltype"] = spell.type;
    attributes[row + "_spellcategory"] = spell.category;
    if(spell.notes != null){
        attributes[row + "_spelldescription"] = spell.notes;
    }
    if(spell.dv.match(/(\-|\+)\d/) != null) {
        attributes[row + "_spelldrain"] = spell.dv.match(/(\-|\+)\d/)[0];
    }
    else {
        attributes[row + "_spelldrain"] = "-0";
    }


    if(spell.category_english == "Rituals"){
        attributes[row + "_spellschool"] = "@{skilldicepool67}";
        attributes[row + "_spelldrain"] = "*2";
        attributes[row + "_spellbonus"] = spell.dicepool - ritual;
    } else {
        attributes[row + "_spellbonus"] = spell.dicepool - spellcasting;
        if(spell.alchemy == "True"){
            attributes[row + "_spellschool"] = "@{skilldicepool58}";
            attributes[row + "_spellbonus"] = spell.dicepool - alchemy;
        }
    }

    attributes[row + "_spellrange"] = spell.range;
    attributes[row + "_spellduration"] = spell.duration;
}