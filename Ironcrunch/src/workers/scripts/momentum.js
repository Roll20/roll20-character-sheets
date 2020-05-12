// Debilities update Momentum MAX and RESET.
on('change:corrupted change:cursed change:maimed change:shaken change:tormented change:unprepared change:wounded', function() {
  var numDebilities=0
  getAttrs(["corrupted","cursed", "maimed", "shaken", "tormented", "unprepared", "wounded", "momentum_max", "momentum_reset"], function(values) {
      if(values.corrupted == "on") numDebilities=numDebilities+1;
      if(values.cursed == "on") numDebilities=numDebilities+1;
      if(values.maimed == "on") numDebilities=numDebilities+1;
      if(values.shaken == "on") numDebilities=numDebilities+1;
      if(values.tormented == "on") numDebilities=numDebilities+1;
      if(values.unprepared == "on") numDebilities=numDebilities+1;
      if(values.wounded == "on") numDebilities=numDebilities+1;
      setAttrs({ momentum_max: (20 - numDebilities)});
      if (numDebilities===0) setAttrs({ momentum_reset: 2});
      if (numDebilities===1) setAttrs({ momentum_reset: 1});
      if (numDebilities>1) setAttrs({ momentum_reset: 0});
  });
});

// Do not allow Momentum to go over MAX.
on('change:momentum change:momentum_max', function() {
  getAttrs(["momentum","momentum_max"], function(values) {
      if(parseInt(values.momentum) > parseInt(values.momentum_max)) setAttrs({ momentum: parseInt(values.momentum_max)});
  });
});

on('change:momentumBurn', function() {
  getAttrs([ "momentum_reset" ], function(values) {
      setAttrs({
          momentum: parseInt(values.momentum_reset),
          momentumBurn: 'off'
      });
  });
});