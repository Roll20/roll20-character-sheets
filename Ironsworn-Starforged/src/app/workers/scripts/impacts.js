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
  'impactCursed',
  'impactOther1',
  'impactOther2'
]

const shipImpactAttrs = [
  'impactShipBattered',
  'impactShipCursed'
]

const momentumAttrs = [
  'momentum_max',
  'momentum_reset',
  'onboard_check_ship_button'
]

function buildImpactEvents (impacts) {
  return impacts.map(impact => `change:${impact}`).join(' ')
}

on(`${buildImpactEvents(impactsAttrs)} ${buildImpactEvents(shipImpactAttrs)} change:onboard_check_ship_button`,
  function() {
    var numImpacts = 0;
    getAttrs(
      impactsAttrs.concat(momentumAttrs).concat(shipImpactAttrs),
      function(values) {
        for (var attr in impactsAttrs) {
          if (values[impactsAttrs[attr]] === 'on') {
            numImpacts += 1;
          }
        }
        for (var attr in shipImpactAttrs) {
          if (values[shipImpactAttrs[attr]] === 'on' && values['onboard_check_ship_button'] === 'on') {
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
