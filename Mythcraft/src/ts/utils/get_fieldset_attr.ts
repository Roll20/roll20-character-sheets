const getFieldsetAttr = (key: string) => {
  //Fieldset class will be repeating_groupname_reprowid_attrName
  //returns attrName
  const reprowid = getFieldsetRow(key);
  return key.split(`${reprowid}_`)[1];
};
