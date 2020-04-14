// Debilities update Momentum MAX and RESET.
on('change:debilWounded change:debilShaken change:debilUnprepared change:debilEncumbered change:debilMarked change:debilHaunted change:debilMaimed change:debilCorrupted change:debilOathbreaker change:debilLeech change:debilCustom1 change:debilCustom2', function() {
  var numDebilities=0
  getAttrs(["debilWounded","debilShaken", "debilUnprepared", "debilEncumbered", "debilMarked", "debilHaunted", "debilMaimed", "debilCorrupted", "debilOathbreaker", "debilLeech", "debilCustom1", "debilCustom2", "momentum_max", "momentum_reset"], function(values) {
      if(values.debilWounded == "on") numDebilities=numDebilities+1;
      if(values.debilShaken == "on") numDebilities=numDebilities+1;
      if(values.debilUnprepared == "on") numDebilities=numDebilities+1;
      if(values.debilEncumbered == "on") numDebilities=numDebilities+1;
      if(values.debilMarked == "on") numDebilities=numDebilities+1;
      if(values.debilHaunted == "on") numDebilities=numDebilities+1;
      if(values.debilMaimed == "on") numDebilities=numDebilities+1;
      if(values.debilCorrupted == "on") numDebilities=numDebilities+1;
      if(values.debilOathbreaker == "on") numDebilities=numDebilities+1;
      if(values.debilLeech == "on") numDebilities=numDebilities+1;
      if(values.debilCustom1 == "on") numDebilities=numDebilities+1;
      if(values.debilCustom2 == "on") numDebilities=numDebilities+1;
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