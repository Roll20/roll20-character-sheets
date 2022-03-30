// Register the old attributes into k-scaffold so that they are
// available in the 'attributes' parameter fof update functions
// but not saved on the sheet anymore
const preKScaffoldData = {
    attributes: [
        { name: "notNew", type: "number" },
        { name: "repeating_weapons_$X_Wounds_Load", type: "number" },
        { name: "repeating_weapons_$X_Wounds_Range", type: "string" },
        { name: "repeating_weapons_$X_Weapon_Load", type: "number" },
        { name: "repeating_weapons_$X_Weapon_Range", type: "string" },
        { name: "repeating_spell_$X_Technique_select", type: "number" },
        { name: "repeating_spell_$X_Form_select", type: "number" },
        { name: "repeating_spell_$X_spell_tech_name", type: "string" },
        { name: "repeating_spell_$X_spell_form_name", type: "string" },
    ],

    sections: [
        { section: 'repeating_weapons', fields: ["Wounds_Load", "Wounds_Range", "Weapon_Load", "Weapon_Range"] },
        { section: 'repeating_spell', fields: ["Technique_select", "Form_select", "spell_tech_name", "spell_form_name"] },
    ]
};

preKScaffoldData.attributes.forEach(obj => {
    varObjects.cascades[`attr_${obj.name}`] =
    {
        ...obj,
        affects: [],
        triggeredFuncs: []
    };
});
preKScaffoldData.sections.forEach(obj => { varObjects.repeatingSectionDetails.push(obj); })