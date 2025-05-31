class SheetUpdater {
    constructor(listOfUpdates, versionAttribute = 'version', appliedUpdatesAttribute = 'appliedUpdates', delimiter = ',', reportInvalidUpdates = false) {
        this._listOfUpdates = (Array.isArray(listOfUpdates)) ? Array.from(new Set(listOfUpdates)) : [];
        this._versionAttribute = versionAttribute;
        this._appliedUpdatesAttribute = appliedUpdatesAttribute;
        this._delimiter = delimiter;
        this._reportInvalidUpdate = reportInvalidUpdates;
    }
    getAppliedUpdates(callback) {
        getAttrs([this._appliedUpdatesAttribute], values => {
            const performedUpdates = (values[this._appliedUpdatesAttribute]) ?  values[this._appliedUpdatesAttribute].split(this._delimiter) : [];
            callback(performedUpdates);
        });
    }
    setAppliedUpdates(updates, callback) {
        let set = {};
        set[this._appliedUpdatesAttribute] = Array.from(new Set(updates)).join(this._delimiter);
        setAttrs(set, () => {
            callback();
        });
    }
    checkUpdates(callback) {
        let log = {};
        this.getAppliedUpdates(appliedUpdates => {
            const existingUpdates = this._listOfUpdates.filter(entry => { return appliedUpdates.indexOf(entry.id) > -1 }).map(entry => { return entry.id; });
            existingUpdates.forEach(entry => {
                log[entry] = {success: false, error: SheetUpgrade.getStatusMsg('ALREADY_INSTALLED')};
            });
            this.processNextUpdate(log, callback);
        });
    }
    processNextUpdate(log = {}, callback) {
        this.getAppliedUpdates(appliedUpdates => {
            const missingUpdates = this._listOfUpdates.filter(entry => { return appliedUpdates.indexOf(entry.id) === -1 && Object.keys(log).indexOf(entry.id) === -1 });
            if(missingUpdates.length === 0) {
                this.finish(log);
                callback(log);
            } else {
                missingUpdates[0].apply(this._versionAttribute, this, log, callback);
            }
        });
    }
    finish(log) {
        getAttrs([this._versionAttribute], values => {
            console.log('---------------------------------------------');
            const updates = Object.keys(log);
            if(updates.length > 0) {
                console.groupCollapsed('%cINSTALLING UPDATES:', 'font-weight:bold');
                updates.forEach(update => {
                    if(log[update].error) {
                        console.log(`Applying ${update}... %c${log[update].error}`, 'color:#e66f00');
                    } else {
                        console.log(`Applying ${update}... %c${SheetUpgrade.getStatusMsg('DONE')}`, 'color: #22a05d');
                    }
                });
                console.groupEnd();
            }
            if(this._versionAttribute in values) console.log(`%cD&D 5th Edition by Roll20 Version ${values[this._versionAttribute]}`, 'color: green; font-weight:bold');
            console.log('---------------------------------------------');
        }); 
    }
    rejectUpdate(log, callback) {
        this.processNextUpdate(log, callback);
    }
    resolveUpdate(updateID, log, callback) {
        this.getAppliedUpdates(appliedUpdates => {
            const update = Array.from(new Set(appliedUpdates.concat([updateID])));
            const matches = this._listOfUpdates.filter(entry => {
                return update.indexOf(entry.id) > -1;
            }).map(entry => { return entry.id });
            this.setAppliedUpdates(matches, () => {
                this.processNextUpdate(log, callback);
            });
        });
    }
}

class SheetUpgrade {
    constructor(id, patch, setVersion = 0, minVersion = 0) {
        this.id = id;
        this._patch = patch;
        this._setVersion = setVersion;
        this._minVersion = minVersion;
        this._listener = null;
        this._versionAttribute = null;
        this._log = null;
        this._callback = null;
    }
    static getStatusMsg(errorCode, ...details) {
        switch (errorCode) {
            case 'DONE':
                return `Update completed!`
            case 'ALREADY_INSTALLED':
                return `Update already installed!`
            case 'INVALID_VERSION':
                return `The current version of your sheet is not compatible with this update!`
            default:
                return '';
        }
    }
    getCurrentVersion(callback) {
        getAttrs([this._versionAttribute], values => {
            const version = (values.version) ? parseFloat(values.version) : 0.0;
            callback(version);
        });
    }
    setCurrentVersion(version, callback) {
        if(version === 0) {
            callback();
        } else {
            let set = {};
            set[this._versionAttribute] = version;
            setAttrs(set, () => {
                callback()
            });
        }
    }
    apply(versionAttribute, listener, log, callback) {
        this._versionAttribute = versionAttribute;
        this._listener = listener;
        this._log = log;
        this._callback = callback;
        this.getCurrentVersion(currentVersion => {
            if(this.validateVersion(currentVersion)) {
                const statusMsg = SheetUpgrade.getStatusMsg('INVALID_VERSION');
                this._reject(statusMsg);
            } else {
                let newVersion = this._setVersion;
                let failed = false;
                let update = null;
                this._patch(this._resolve.bind(this), this._reject.bind(this));
            }
        });
    }
    _reject(error) {
        this._log[this.id] = { success : false, error: error }
        this._listener.rejectUpdate(this._log, this._callback);
    }
    _resolve() {
        this.setCurrentVersion(this._setVersion, () => {
            this._log[this.id] = { success: true };
            this._listener.resolveUpdate(this.id, this._log, this._callback);
        });  
    }
    validateVersion(currentVersion) {
        return (currentVersion >= this._setVersion || currentVersion < this._minVersion);
    }
}

class SheetUpdate extends SheetUpgrade {
    constructor(id, patch, minVersion = 0, maxVersion = Infinity) {
        super(id, patch, 0, minVersion);
        this._maxVersion = maxVersion;
    }
    validateVersion(currentVersion) {
        return (currentVersion > this._maxVersion || currentVersion < this._minVersion);
    }
}