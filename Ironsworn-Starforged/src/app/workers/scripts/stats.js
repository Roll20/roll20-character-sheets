//Cannot increase Health while Wounded
//Health 0 does not automatically mark an Impact in SF
on('change:health', function(eventinfo) {
  getAttrs(['impactWounded'], function(values) {
    if (values.impactWounded == 'on') {
      if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
        setAttrs({ health: eventinfo.previousValue });
      }
    }
  });
});

//Cannot increase Spirit while Shaken
//Spirit 0 does not automatically mark an Impact in SF
on('change:spirit', function(eventinfo) {
  getAttrs(['impactShaken'], function(values) {
    if (values.impactShaken == 'on') {
      if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
        setAttrs({ spirit: eventinfo.previousValue });
      }
    }
  });
});

//Cannot increase Supply while Unprepared
//Supply reaching 0 marks Unprepared
on('change:supply', function(eventinfo) {
  getAttrs(['impactUnprepared'], function(values) {
    if (values.unprepared == 'on') {
      if (parseInt(eventinfo.newValue) > parseInt(eventinfo.previousValue)) {
        setAttrs({ supply: eventinfo.previousValue });
      }
    }
  });
  if (parseInt(eventinfo.newValue) === 0) setAttrs({ impactUnprepared: 'on' });
});
