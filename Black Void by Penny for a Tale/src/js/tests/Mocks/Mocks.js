let attributes = {};
let sectionIDS = {};
const maxAsyncDelay = 2000;
const getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};
const getAttrs = function(attrs, callback) {
  let values = {};
  setTimeout(() => {
      attrs.forEach(i => {
        if(i in attributes) values[i] = attributes[i];
      });
      callback(values);
  }, getRandomInt(maxAsyncDelay));
};
const setAttrs = function(attrs, callback) {
  let values = {};
  setTimeout(() => {
      Object.keys(attrs).forEach(key => {
        attributes[key] = attrs[key];
        //Notify all components
        let components =  document.querySelectorAll(`[name|="attr_${key}"]`);
        components.forEach(c => {
          c.value = attrs[key];
        });
      });
      callback(attributes);
  }, getRandomInt(maxAsyncDelay));
};
const getSectionIDs = function(section, callback) {
  setTimeout(() => {
      let ids = sectionIDS[section] || [];
      callback(ids);
  }, getRandomInt(maxAsyncDelay));
};