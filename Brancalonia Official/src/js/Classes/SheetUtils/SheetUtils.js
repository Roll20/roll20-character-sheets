class SheetUtils {
    static getUID(value) {
        const regexp = /-.{19}(?=_)|-.{19}$/g;
        const valueAsString = String(value);
        const match = valueAsString.match(regexp);
        return (match) ? match.join() : "";
    }
    static aOrAn(value) {
        if(['a','e','i','o','u'].indexOf(value.toLowerCase()[0]) > -1) return `an ${value}`;
        return `a ${value}`;
    }
    static toLowerCase(value) {
        if(Array.isArray(value)) {
            const lowerCaseArray = value.map(item => { return item.toLowerCase(); });
            return lowerCaseArray;
        }
        return String(value).toLowerCase();
    }
    static toCapitalCase(value) {
        if(Array.isArray(value)) {
            const capitalCaseArray = value.map(item => { return item[0].toUpperCase() + item.toLowerCase().slice(1); });
            return capitalCaseArray;
        }
        return String(value)[0].toUpperCase() + String(value).toLowerCase().slice(1);
    }
    static getSectionOrder(section, callback) {
        const sectionName = `repeating_${section}`;
        const attributeName = `_reporder_${sectionName}`;
        getAttrs([attributeName], attributes => {
            let values = new Array();
            Object.keys(attributes).some(() => {
                let results = SheetUtils.toLowerCase(attributes[attributeName].replace(/ /g, '').split(','));
                values = values.concat(results);
                return true;
            });
            getSectionIDs(sectionName, ids => {
                const filteredOrder = new Set();
                const order = values.concat(SheetUtils.toLowerCase(ids)).filter(entry => { return SheetUtils.toLowerCase(ids).indexOf(entry) > -1; });
                order.forEach(item => {
                    filteredOrder.add(item);
                });
                callback(Array.from(filteredOrder));
            });
        });
    }
    static deepReadAttribute(attr, callback, defaultValue) {
        if(/^(@{).+}$/.test(String(attr)) === true) { 
            const regExp = /@\{([^@\{\}]+)\}/;
            const reference = regExp.exec(attr)[1];
            var self = this;
            getAttrs([reference], function(v) {
                if(!v[reference]) { 
                    callback(defaultValue);
                } else {
                    self.deepReadAttribute(v[reference], callback, defaultValue);
                }
            });
        }
        else {
            callback(attr); 
        }
    }
    static sanitizeXP(value) {
        const trimmedValue = value.trim();
        if(!trimmedValue) return [];
        const valueWithDecimalsRemoved = trimmedValue.replace(/,|\.| +/g, '');
        const regex = /[0-9]+/g;
        let xp = valueWithDecimalsRemoved.match(regex);
        if(Array.isArray(xp)) xp = xp.map(entry => { return parseInt(entry) });
        return xp;
    }
    static checkPath(obj, path, returnFalseOnEmpty = false) {
        const sanitizedPath = path.replace(/\]\[|[\[,\]]/g, '.').replace(/\.+/g, '.').replace(/[",',]|\.$|^\./g, '');
        const properties = sanitizedPath.split('.');
        let level = obj;
        for(let property = 0; property < properties.length; property++) {
            if((returnFalseOnEmpty && !level[properties[property]]) || (!returnFalseOnEmpty && !(properties[property] in level))) return false;
            level = level[properties[property]];
        }
        return true;
    }
}