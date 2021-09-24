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