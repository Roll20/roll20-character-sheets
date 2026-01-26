{% include 'sheet_types/character/character_characteristics.js' %}
{% include 'sheet_types/character/character_attributes.js' %}
{% include 'sheet_types/character/character_skills.js' %}
{% include 'sheet_types/character/character_weapons.js' %}
{% include 'sheet_types/character/character_abilities.js' %}
{% include 'sheet_types/character/character_encumbrance.js' %}

/* Repeating IDs */
on("change:repeating_standardskill change:repeating_combatstyle change:repeating_professionalskill change:repeating_affiliation change:repeating_passion change:repeating_dependency change:repeating_peculiarity change:repeating_equipment change:repeating_currency change:repeating_tradition change:repeating_ability change:repeating_skilledability change:repeating_feature", function(event) {
    if (event.sourceType === "sheetworker") {return;}
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];

    /* seems we can get change that aren't for a particular item this checks to ensure we have an id to parse */
    if (id.startsWith("-")) {
        setAttrs({[`repeating_${type}_${id}_id`]: `repeating_${type}_${id}`});
    }
});
