var updateMaxHealth = function() {
  getAttrs(['iron'], function(v) {
    let max_health = (v.iron*4)+16
    setAttrs({
      max_health: max_health
    });
  });
};

//Calculate Max Health
on('change:iron', function() {
  updateMaxHealth();
});

//Reset Health if set above Max
on('change:health', function(healthChange) {
  getAttrs(["max_health"], function(values) {
    if (parseInt(healthChange.newValue) > parseInt(values.max_health)) {
      setAttrs({health: values.max_health});
    }
  });
});

on('change:health_reset', function() {
  getAttrs(["max_health"], function(values) {
      setAttrs({health: values.max_health});
  });
});

//Cannot increase Health while Wounded
//Health reaching 0 marks Wounded
on('change:health', function(eventinfo) {
    getAttrs(["debilWounded"], function(values) {
        if(values.debilWounded == "on") {
            if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
                setAttrs({health: eventinfo.previousValue});
            }
        }
    });
});

//Cannot increase Spirit while Shaken
//Spirit reaching 0 marks Shaken
on('change:spirit', function(eventinfo) {
    getAttrs(["debilShaken"], function(values) {
        if(values.debilShaken == "on") {
            if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
                setAttrs({spirit: eventinfo.previousValue});
            }
        }
    });
});

//Cannot increase Supply while Unprepared
//Supply reaching 0 marks Unprepared
on('change:supply', function(eventinfo) {
    getAttrs(["debilUnprepared"], function(values) {
        if(values.debilUnprepared == "on") {
            if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
                setAttrs({supply: eventinfo.previousValue});
            }
        }
    });
    if (parseInt(eventinfo.newValue) === 0) setAttrs({debilUnprepared: "on"});
});