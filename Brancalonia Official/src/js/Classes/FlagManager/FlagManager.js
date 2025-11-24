class RefereceSet extends Set {
  constructor(...args) {
    super(...args);
  }
  toggle(value) {
    const toggleLookup = {
      true: 'delete',
      false: 'add'
    };
    const hasValue = this.has(value);
    return this[toggleLookup[hasValue]](value);
  }
}
class FlagManager {
  constructor(reference) {
    this._reference = reference;
    this._delimiter = ' ';
    this._delimiterSafe = '_';
  }
  async getFlags() {
    const entries = await this._getReferenceSet();
    return entries;
  }
  async hasFlag(flag) {
    const entries = await this._getReferenceSet();
    return entries.has(flag);
  }
  async addFlag(flag) {
    const updatedReference = await this._updateReference(flag, 'add');
    return updatedReference;
  }
  async deleteFlag(flag) {
    const updatedReference = await this._updateReference(flag, 'delete');
    return updatedReference;
  }
  async toggleFlag(flag) {
    const updatedReference = await this._updateReference(flag, 'toggle');
    return updatedReference;
  }
  async _updateReference(flag, method) {
    const sanitizedFlag = this._sanitizeFlag(flag);
    const updatedReference = await this._setReference(sanitizedFlag, method);
    return updatedReference;
  }
  async syncFlagsWithRepeatingSection(section) {
    const flags = await this._syncFlagsWithRepeatingSection(section);
    return flags;
  }
  _syncFlagsWithRepeatingSection(section) {
    return new Promise(resolve => {
      SheetUtils.getSectionOrder(section, order => {
        getAttrs([this._reference], attributes => {
          let values = "";
          Object.keys(attributes).some(() => {
            values += attributes[this._reference];
            return true;
          });
          const flags = (values) ? values.split(' ') : [];
          const sectionName = `repeating_${section}`;
          const filteredArray = Array.from(flags).filter(flag => flag.includes(sectionName)).filter(flag => order.includes(SheetUtils.getUID(flag).toLowerCase()));
          filteredArray.forEach((flag, index) => {
            const newIndex = order.indexOf(SheetUtils.getUID(flag).toLowerCase());
            filteredArray[index] = flag.replace(this._getFlagIndex(flag), `_${newIndex}_`);
          });
          const updatedSet = Array.from(flags).filter(flag => !flag.includes(sectionName)).concat(filteredArray);
          let update = {};
          update[this._reference] = updatedSet.join(' ');
          setAttrs(update, () => {
            return resolve(new Set(updatedSet));
          });
        });
      });
    });
  }
  _getFlagIndex(flag) {
    const regexp = /_[0-9]+_/g;
    const valueAsString = String(flag);
    const match = valueAsString.match(regexp);
    return (match) ? match.join() : "";
  }
  _getReferenceSet() {
    return new Promise(resolve => {
      getAttrs([this._reference], attributes => {
        let values = "";
        Object.keys(attributes).some(() => {
          values += attributes[this._reference];
          return true;
        });
        const flags = values.split(this._delimiter).filter(e => {return e});
        return resolve(new RefereceSet(flags));
      });
    });
  }
  _setReference(sanitizedFlag, method) {
    return new Promise(resolve => {
      getAttrs([this._reference], attributes => {
        let values = "";
        Object.keys(attributes).some(() => {
          values += attributes[this._reference];
          return true;
        });
        const flags = new RefereceSet(values.split(this._delimiter).filter(e => {return e}));
        flags[method](sanitizedFlag);
        const flagAsString = Array.from(flags).join(this._delimiter);
        let update = {};
        update[this._reference] = flagAsString;
        setAttrs(update, () => {
          return resolve(flags);
        });
      });
    });
  }
  _sanitizeFlag(flag) {
    const regex = new RegExp(`${this._delimiter}`, 'g');
    const sanitizedFlag = flag.replace(regex, this._delimiterSafe);
    return sanitizedFlag;
  }
}
