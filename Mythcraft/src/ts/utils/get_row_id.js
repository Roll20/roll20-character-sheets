var getReprowid = function (trigger) {
    var split = trigger.split("_");
    return "".concat(split[0], "_").concat(split[1], "_").concat(split[2]);
};
