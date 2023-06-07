// Sheet update system built on top of k-scaffold
// This supports having multiple update functions per version
arm5.sheet.updater = {
    updates: {},
    did_register_updates: false,

    addUpdate({version, callback}) {
        if (arm5.sheet.updater.did_register_updates) {
            k.log(`Updates where already registered in k-scaffold, cannot register ${callback} for version ${version}.`);
            return;
        }
        const updates = arm5.sheet.updater.updates[version] || [];
        updates.push(callback);
        arm5.sheet.updater.updates[version] = updates;
    },

    addUpdateFromRef({version, reference, args=null}) {
        let obj = arm5;
        for (const attrib of reference.split(".")) {
            obj = obj[attrib];
            if (typeof object === "undefined" || object === null) {
                k.log(`Invalid reference ${reference}: arm5 object has no such attribute.`);
                return;
            }
        }
        let callback;
        if (args) {
            callback = (k_scaffold_obj) => { return obj(k_scaffold_obj, args); };
        } else {
            callback = obj;
        }
        arm5.sheet.updater.addUpdate({version, callback});
    },

    addAllUpdateRef() {
        for (const [version, data] of Object.entries(arm5.sheet.data.updater.references)) {
            for (const { reference, args } of data) {
                arm5.sheet.updater.addUpdateFromRef({version, reference, args});
            }
        }
    },

    registerAllUpdates() {
        if (arm5.sheet.updater.did_register_updates) {
            k.log(`Updates where already registered in k-scaffold, cannot register them again !`);
            return;
        }
        const updates = {};
        for (const [version, callbacks] of Object.entries(arm5.sheet.updater.updates)) {
            const updater = (k_scaffold_obj) => {
                callbacks.forEach(callback => callback(k_scaffold_obj));
            };
            updates[version] = updater;
        }
        k.registerFuncs(updates, { types: ["updater"] });
        arm5.sheet.updater.did_register_updates = true;
    }
}
