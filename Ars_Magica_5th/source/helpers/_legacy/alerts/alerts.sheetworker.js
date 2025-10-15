

arm5.sheet = arm5.sheet || {};
arm5.sheet.alerts = {

    attributeName: "arm5_sheet_alerts_states",

    showAlert({ name, attributes }) {
        if (arm5.sheet.data.alerts.indexOf(name) === -1) {
            k.log(`Cannot show alert '${name}': undefined alert`);
        } else {
            k.log(`Showing alert '${name}'...`);
            $20(`.alert--${name}`).removeClass("hidden");
            const state = JSON.parse(attributes[arm5.sheet.alerts.attributeName]);
            state[name] = true;
            attributes[arm5.sheet.alerts.attributeName] = JSON.stringify(state);
            k.log(`Showing alert '${name}': done`);
        }
    },

    hideAlert({ name, attributes }) {
        if (arm5.sheet.data.alerts.indexOf(name) === -1) {
            k.log(`Cannot show alert '${name}': undefined alert`);
        } else {
            k.log(`Hidding alert '${name}'...`);
            $20(`.alert--${name}`).addClass("hidden");
            const state = JSON.parse(attributes[arm5.sheet.alerts.attributeName]);
            state[name] = false;
            attributes[arm5.sheet.alerts.attributeName] = JSON.stringify(state);
            k.log(`Hidding alert '${name}': done`);
        }
    },

    close({ trigger, attributes }) {
        const name = trigger.name.match(/alert-close-(.+)/)[1];
        arm5.sheet.alerts.hideAlert({ name, attributes });
    },

    onOpen({ attributes }) {
        const state = JSON.parse(attributes[arm5.sheet.alerts.attributeName]);
        arm5.sheet.data.alerts.forEach(name => {
            if (name in state && state[name]) {
                arm5.sheet.alerts.showAlert({ name, attributes });
            } else {
                state[name] = false;
            }
        });
        attributes[arm5.sheet.alerts.attributeName] = JSON.stringify(state);
    }
};

k.registerFuncs({ "arm5.sheet.alerts.close": arm5.sheet.alerts.close });
k.registerFuncs({ "arm5.sheet.alerts.onOpen": arm5.sheet.alerts.onOpen }, { type: ["opener"] });
