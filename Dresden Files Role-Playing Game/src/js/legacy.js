const charButtonList = ["worksheet", "charsheet", "spellsheet", "city-high", "city-locs", "city-face", "config"];
const charSkillList = ["alertness", "athletics", "burglary", "contacts", "conviction", "craftsmanship", "deceit", "discipline", "driving", "empathy", "endurance", "fists", "guns", "intimidation", "investigation", "lore", "might", "performance", "presence", "rapport", "resources", "scholarship", "stealth", "survival", "weapons"];
const ladder = ["mediocre", "average", "fair", "good", "great", "superb", "fantastic", "epic", "legendary"];
charButtonList.forEach(button => {
    on(`clicked:${button}`, function () {
        setAttrs({
            sheetTab: button
        });
    });
});

on("clicked:refresh", function () {
    getAttrs(["current-fp", "adjusted-refresh"], function (values) {
        setAttrs({'current-fp': Math.max(values['current-fp'], values['adjusted-refresh'])});
    });
});

charSkillList.forEach(skill => {
    on(`change:${skill}`, function (eventInfo) {
        let newV = parseInt(eventInfo.newValue);
        let ladderCount = {}

        for (let i = 0; i < ladder.length; i++) {
            setAttrs({["view-" + ladder[i] + "-" + skill]: 0});
            ladderCount[ladder[i]] = 0;
        }

        setAttrs({["view-" + ladder[newV] + "-" + skill]: 1});

        getAttrs(charSkillList, function (values) {
            let x = 0;
            for (let skill in values) {
                x += parseInt(values[skill]);
                ladderCount[ladder[parseInt(values[skill])]]++;
            }

            setAttrs({"skill-points": [x]});

            for (let rung in ladderCount) {
                setAttrs({[rung + "-count"]: [ladderCount[rung]]});
            }
        });
    });
});

on("change:skill-cap", function (eventInfo) {
    let cap = eventInfo.newValue;

    //Change which skill tiers are visible
    for (let i = 1; i < ladder.length; i++) {
        if (i <= cap) {
            setAttrs({[ladder[i] + "_cap"]: ["1"]});
        } else {
            setAttrs({[ladder[i] + "_cap"]: ["0"]});
        }
    }

    //Reduce skills above cap to cap
    getAttrs(charSkillList, function (values) {
        for (let skill in values) {
            if (values[skill] > cap) {
                setAttrs({[skill]: [cap]})
            }
        }
    });
});

on("change:mediocreview", function (eventInfo) {
    setAttrs({'mediocre_cap': [eventInfo.newValue]});
});

on('change:repeating_powers remove:repeating_powers', function (eventInfo) {
    getSectionIDs('repeating_powers', function (idarray) {
        var costIds = idarray.map(function (rowid) {
            return 'repeating_powers_' + rowid + '_power-cost';
        });
        getAttrs(costIds, function (values) {
            var total = i = 0;
            for (; i < costIds.length; i++) {
                total += parseInt(values[costIds[i]]) || 0;
            }
            setAttrs({'total-refresh-adjustment': total});
        });
    });
});

on('change:repeating_focus-item:focus-item-slots remove:repeating_focus-item change:repeating_enchanted-item:enchanted-item-slots remove:repeating_enchanted-item', function (eventInfo) {
    var totalSlots = 0.0;
    getSectionIDs('repeating_focus-item', function (idarray) {
        var focusIds = idarray.map(function (rowid) {
            return 'repeating_focus-item_' + rowid + '_focus-item-slots';
        });
        getAttrs(focusIds, function (values) {
            for (let i = 0; i < focusIds.length; i++) {
                totalSlots += parseFloat(values[focusIds[i]]) || 0;
            }
        });
    });
    getSectionIDs('repeating_enchanted-item', function (idarray) {
        var enchantedIds = idarray.map(function (rowid) {
            return 'repeating_enchanted-item_' + rowid + '_enchanted-item-slots';
        });
        getAttrs(enchantedIds, function (values) {
            for (let i = 0; i < enchantedIds.length; i++) {
                totalSlots += parseFloat(values[enchantedIds[i]]) / 2 || 0;
            }
            setAttrs({'focus-used': totalSlots});
        });
    });
});

on('change:total-refresh-adjustment change:base-refresh', function (eventInfo) {
    //console.log("check one");
    getAttrs(['total-refresh-adjustment', 'base-refresh'], function (values) {
        //console.log("check two");
        setAttrs({'adjusted-refresh': [parseInt(values['base-refresh']) + parseInt(values['total-refresh-adjustment'])]});
    });
});

on("change:repeating_focus-item remove:repeating_focus-item", function () {
    getSectionIDs('repeating_focus-item', function (idarray) {

        var focusEvoArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-evothau';
        });
        var focusThauArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-evothau';
        });
        var focusElementsArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-elements';
        });
        var focusTypesArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-types';
        });
        var focusOCArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-oc';
        });
        var focusOPArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-op';
        });
        var focusDCArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-dc';
        });
        var focusDPArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-dp';
        });
        var focusComArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-com';
        });
        var focusConArr = idarray.map(function (rowid) {
            return 'repeating_focus-item' + rowid + '_focus-con';
        });

        var focusIDs = focusEvoArr.concat(focusThauArr).concat(focusElementsArr).concat(focusTypesArr).concat(focusOCArr).concat(focusOPArr).concat(focusDCArr).concat(focusDPArr).concat(focusComArr).concat(focusConArr);

        getAttrs(focusIDs, function (values) {

            for (let i = 0; i < focusEvoArr.length; i++) {
                let focusEvo = (values[focusEvoArr[i]] == "evocation");
                let focusThau = (values[focusThauArr[i]] == "thaumaturgy");
                let focusElements = (values[focusElementsArr[i]] != undefined) ? values[focusElementsArr[i]].split(",").length : 0;
                let focusTypes = (values[focusTypesArr[i]] != undefined) ? values[focusTypesArr[i]].split(",").length : 0;
                let focusOC = parseInt(values[focusOCArr[i]]) || 0;
                let focusOP = parseInt(values[focusOPArr[i]]) || 0;
                let focusDC = parseInt(values[focusDCArr[i]]) || 0;
                let focusDP = parseInt(values[focusDPArr[i]]) || 0;
                let focusCom = parseInt(values[focusComArr[i]]) || 0;
                let focusCon = parseInt(values[focusConArr[i]]) || 0;

                if (focusThau) {
                    setAttrs({['repeating_focus-item_focus-item-slots']: [focusTypes * (focusCom + focusCon)]});
                }
                if (focusEvo) {
                    setAttrs({['repeating_focus-item_focus-item-slots']: [focusElements * (focusOC + focusOP + focusDC + focusDP)]});
                }
            }
        });
    });
});
