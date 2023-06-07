// Save persistent data to the sheet
arm5.pug.sheet_data.updater = {
    references: {}
}

arm5.pug.updater = {
    version: null,
    references: {},

    addUpdateRef({ version, reference, args=null}) {
        const array = arm5.pug.updater.references[version] || [];
        array.push({ reference, args });
        arm5.pug.updater.references[version] = array;
    },

    generateVersion() {
        if (arm5.pug.updater.version === null) {
            throw new Error("The version was not set within the PUG of the sheet");
        }
        let version = JSON.stringify(arm5.pug.updater.version);
        if (!version.startsWith('"')) {
            version = `"${version}"`;
        }
        return `k.version = ${version};`;
    },

    generateSheetworkerRegistrations() {
        const flatten = [];
        for (const [version, references] of Object.entries(arm5.pug.updater.references)) {
            for (const obj of references) {
                flatten.push({ version, ...obj });
            }
        }
        return flatten.map(
            ({ version, reference, args }) => `arm5.sheet.updater.addUpdateFromRef({version:${JSON.stringify(version)}, reference:${JSON.stringify(reference)}, args:${JSON.stringify(args)}});`
        ).join("\n");
    }
}