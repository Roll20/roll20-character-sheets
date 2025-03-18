var createAttributeName = function (name) {
    return name === null || name === void 0 ? void 0 : name.replace(/ /g, "_").toLowerCase();
};
