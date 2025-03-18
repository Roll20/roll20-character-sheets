var getReprowAttributeName = function (key) {
    var reprowid = getReprowid(key);
    return key.split("".concat(reprowid, "_"))[1];
};
