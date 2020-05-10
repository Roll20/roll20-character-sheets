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
    getAttrs(["unprepared"], function(values) {
        if(values.unprepared == "on") {
            if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
                setAttrs({supply: eventinfo.previousValue});
            }
        }
    });
    if (parseInt(eventinfo.newValue) === 0) setAttrs({unprepared_button: "on"});
});

// Edge sets Speed value
on('change:edge', function(eventinfo) {
  setAttrs({speed: speedValues[eventinfo.newValue].full});
});

const speedValues = {
  '8': { full: '40ft/20ft. 12m/6m. 8/4', imperial: '40ft/20ft', metric: '12 m/6 m. ', units: '8/4' },
  '7': { full: '40ft/20ft. 12m/6m. 8/4', imperial: '40ft/20ft',metric: '12m/6m. ', units: '8/4' },
  '6': { full: '35ft/15ft. 10.5m/4.5m. 7/3', imperial: '35ft/15ft',metric: '10.5m/4.5m.', units: '7/3' },
  '5': { full: '35ft/15ft. 10.5m/4.5m. 7/3', imperial: '35ft/15ft',metric: '10.5m/4.5m.', units: '7/3' },
  '4': { full: '30ft/15ft. 9m/4.5m. 6/3', imperial: '30ft/15ft',metric: '9m/4.5m.', units: '6/3' },
  '3': { full: '30ft/15ft. 9m/4.5m. 6/3', imperial: '30ft/15ft',metric: '9m/4.5m.', units: '6/3' },
  '2': { full: '25ft/10ft. 7.5m/3m. 5/2', imperial: '25ft/10ft',metric: '7.5m/3m.', units: '5/2' },
  '1': { full: '25ft/10ft. 7.5m/3m. 5/2', imperial: '25ft/10ft',metric: '7.5m/3m.', units: '5/2' },
  '0': { full: '25ft/10ft. 7.5m/3m. 5/2', imperial: '25ft/10ft',metric: '7.5m/3m.', units: '5/2' }
}

// Heart sets Resilience value
on('change:heart', function(eventinfo) {
  let resValue = parseInt(eventinfo.newValue) + 1
  setAttrs({resilience: resValue});
});

// Iron sets Max Load value
on('change:iron', function(eventinfo) {
  let loadValue = parseInt(eventinfo.newValue) + 4
  setAttrs({max_load: loadValue});
});

// Setting Encumbered if load is over max
on('change:load', function(eventinfo) {
  getAttrs(['max_load'], function(values) {
    if (parseInt(eventinfo.newValue) > parseInt(values.max_load)) {
      setAttrs({encumbered: 'on'});
    }
  });
});