//Cannot increase Health while Wounded
//Health reaching 0 marks Wounded
on('change:health', function(eventinfo) {
    getAttrs(["impactWounded"], function(values) {
        if(values.impactWounded == "on") {
            if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
                setAttrs({health: eventinfo.previousValue});
            }
        }
    });
});

//Cannot increase Spirit while Shaken
//Spirit reaching 0 marks Shaken
on('change:spirit', function(eventinfo) {
    getAttrs(["impactShaken"], function(values) {
        if(values.impactShaken == "on") {
            if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
                setAttrs({spirit: eventinfo.previousValue});
            }
        }
    });
});

//Cannot increase Supply while Unprepared
//Supply reaching 0 marks Unprepared
on('change:supply', function(eventinfo) {
    getAttrs(["impactUnprepared"], function(values) {
        if(values.unprepared == "on") {
            if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
                setAttrs({supply: eventinfo.previousValue});
            }
        }
    });
    if (parseInt(eventinfo.newValue) === 0) setAttrs({impactUnprepared: "on"});
});
