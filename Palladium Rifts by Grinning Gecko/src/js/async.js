function setActiveCharacterId(charId) {
  var oldAcid = getActiveCharacterId();
  var ev = new CustomEvent("message");
  ev.data = { id: "0", type: "setActiveCharacter", data: charId };
  self.dispatchEvent(ev);
  return oldAcid;
}
var _sIn = setInterval;
setInterval = function (callback, timeout) {
  var acid = getActiveCharacterId();
  _sIn(function () {
    var prevAcid = setActiveCharacterId(acid);
    callback();
    setActiveCharacterId(prevAcid);
  }, timeout);
};
var _sto = setTimeout;
setTimeout = function (callback, timeout) {
  var acid = getActiveCharacterId();
  _sto(function () {
    var prevAcid = setActiveCharacterId(acid);
    callback();
    setActiveCharacterId(prevAcid);
  }, timeout);
};
function getAttrsAsync(props) {
  var acid = getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs
  var prevAcid = null; //local variable defined here, because it needs to be shared across the promise callbacks defined below
  return new Promise((resolve, reject) => {
    prevAcid = setActiveCharacterId(acid); //in case the activeCharacterId has changed, restore it to what we were expecting and save the current value to restore later
    try {
      getAttrs(props, (values) => {
        resolve(values);
      });
    } catch {
      reject();
    }
  }).finally(() => {
    setActiveCharacterId(prevAcid); //restore activeCharcterId to what it was when the promise first ran
  });
}
//use the same pattern for each of the following...
function setAttrsAsync(propObj, options) {
  var acid = getActiveCharacterId();
  var prevAcid = null;
  return new Promise((resolve, reject) => {
    prevAcid = setActiveCharacterId(acid);
    try {
      setAttrs(propObj, options, (values) => {
        resolve(values);
      });
    } catch {
      reject();
    }
  }).finally(() => {
    setActiveCharacterId(prevAcid);
  });
}

function getSectionIDsAsync(sectionName) {
  var acid = getActiveCharacterId();
  var prevAcid = null;
  return new Promise((resolve, reject) => {
    prevAcid = setActiveCharacterId(acid);
    try {
      getSectionIDs(sectionName, (values) => {
        resolve(values);
      });
    } catch {
      reject();
    }
  }).finally(() => {
    setActiveCharacterId(prevAcid);
  });
}
function getSingleAttrAsync(prop) {
  var acid = getActiveCharacterId();
  var prevAcid = null;
  return new Promise((resolve, reject) => {
    prevAcid = setActiveCharacterId(acid);
    try {
      getAttrs([prop], (values) => {
        resolve(values[prop]);
      });
    } catch {
      reject();
    }
  }).finally(() => {
    setActiveCharacterId(prevAcid);
  });
}
