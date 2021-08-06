// Impacts update Momentum MAX and RESET.

const impactsAttrs = [
  'impactWounded',
  'impactShaken',
  'impactUnprepared',
  'impactPermanentlyHarmed',
  'impactTraumatized',
  'impactDoomed',
  'impactTormented',
  'impactIndebted',
  'impactBattered',
  'impactCursed'
]

const momentumAttrs = [
  'momentum_max',
  'momentum_reset'
]

on(impactsAttrs.map(impact => `change:${impact}`).join(" "),
  function() {
    var numImpacts = 0;
    getAttrs(
      impactsAttrs.concat(momentumAttrs),
      function(values) {
        for (var attr in impactsAttrs) {
          if (values[impactsAttrs[attr]] === "on") {
            numImpacts += 1;
          }
        }
        const momentumReset = function() {
          if (numImpacts === 0) return 2;
          if (numImpacts === 1) return 1;
          if (numImpacts > 1) return 0;
        }
        setAttrs({
          momentum_max: 10 - numImpacts,
          momentum_reset: momentumReset()    
        });
      }
    );
  }
);
