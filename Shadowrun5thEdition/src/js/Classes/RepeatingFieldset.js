class RepeatingFieldset {
  constructor(groupname, id) {
    this.groupname = groupname;
    this.reprowid = id || generateRowID();
  }

  buildRowName() {
    return `repeating_${this.groupname}_${this.reprowid}`
  }

  addAttribute(attributesibuteName) {
    return `${this.buildRowName()}_${attributesibuteName}`
  }
}