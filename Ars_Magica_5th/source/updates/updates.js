// Register the old attributes into k-scaffold so that they are
// available in the 'attributes' parameter for update functions
// but not saved on the sheet anymore
const preKScaffoldData = {
    attributes: [
        // marker for new/not new sheets from before the kScaffold transition
        // Allows to detect if a sheet was created before kScaffold
        { name: "notNew", type: "number" },
        { name: "alert-161-spell-update", type: "number" },
        // Spell update
        { name: "repeating_spell_$X_Technique_select", type: "number" },
        { name: "repeating_spell_$X_Form_select", type: "number" },
        { name: "repeating_spell_$X_spell_tech_name", type: "string" },
        { name: "repeating_spell_$X_spell_form_name", type: "string" },
        // Fix of the attribute name fo weapon load & range
        { name: "repeating_weapons_$X_Wounds_Load", type: "number" },
        { name: "repeating_weapons_$X_Wounds_Range", type: "string" },
        { name: "repeating_weapons_$X_Weapon_Load", type: "number" },
        { name: "repeating_weapons_$X_Weapon_Range", type: "string" },

    ],

    sections: [
        // Spell update
        { section: 'repeating_spell', fields: ["Technique_select", "Form_select", "spell_tech_name", "spell_form_name"] },
        // Fix of the attribute name fo weapon load & range
        { section: 'repeating_weapons', fields: ["Wounds_Load", "Wounds_Range", "Weapon_Load", "Weapon_Range"] },
    ]
};

module.exports.preKScaffoldData = preKScaffoldData;