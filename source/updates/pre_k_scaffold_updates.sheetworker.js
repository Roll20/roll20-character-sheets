const preKScaffoldUpdates = {
    updateWeaponAttributeNames: function ({ attributes, sections }) {
        console.log("sections:");
        console.log(sections);
    },

    updateSpellTechniquesAndForms: function ({ attributes, sections }) {

    },


    handler: function (obj) {
        console.log(`attributes.notNew = ${obj.attributes.notNew}`);
        if (typeof obj.attributes.notNew !== "undefined") {
            updateWeaponAttributeNames(obj);
            updateSpellTechniquesAndForms(obj);
        }

    }

};

k.registerFuncs({ "preKScaffoldUpdates.handler": preKScaffoldUpdates.handler }, { type: ["new"] });
