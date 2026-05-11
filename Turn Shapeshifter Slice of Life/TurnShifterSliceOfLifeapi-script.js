// TURN RPG — Roll Banner API Script v10

var TURN_BANNERS = {
  1:  'https://files.d20.io/images/486058023/gKbwiBmDlQmbHjlPuMjMHg/max.png?1778112004',
  2:  'https://files.d20.io/images/486058024/MHv5K9XnIccGXva_AhdB9w/max.png?1778112004',
  3:  'https://files.d20.io/images/486058025/4YmcHs7G6HuOmBO5ccr2RQ/max.png?1778112004',
  4:  'https://files.d20.io/images/486058031/olGlF3dUAlvBrB1QrPuIkQ/max.png?1778112005',
  5:  'https://files.d20.io/images/486057979/Lk37RS9O_jFoXz2CM7OYNA/max.png?1778111998',
  6:  'https://files.d20.io/images/486057980/0R_F8YGsKRLs5uetIr_zjg/max.png?1778111998',
  7:  'https://files.d20.io/images/486057982/SExufyTOQWoFesmiexo8Xw/max.png?1778111999',
  8:  'https://files.d20.io/images/486057981/z4bJhLJ9zlrXQh0vfG-hzQ/max.png?1778111999',
  9:  'https://files.d20.io/images/486057983/oMv42rzYJbLCWYGfvEQcPg/max.png?1778111999',
  10: 'https://files.d20.io/images/486058000/dIZvoYkB7X_f60izQmfHaA/max.png?1778112001',
  11: 'https://files.d20.io/images/486057999/APXrwJVstGB_N7OSFxXZUA/max.png?1778112001',
  12: 'https://files.d20.io/images/486058001/lITWH7nHlclgVJXyX2oL7w/max.png?1778112001',
  13: 'https://files.d20.io/images/486058017/QLY0EUg72V3LmAdm1r33cg/max.png?1778112003',
  14: 'https://files.d20.io/images/486058012/e4yvJmkAZQr9xSO7iQMalA/max.png?1778112002',
  15: 'https://files.d20.io/images/486058013/DtHvE6_nzkudG6kndor2pg/max.png?1778112002',
  16: 'https://files.d20.io/images/486058014/HSwHUJBQB9etZJ_VLoK41Q/max.png?1778112002',
};

var TURN_DIE_BANNERS = {
  1: 'https://files.d20.io/images/486388213/WRvGftNR4FU0OD7M9LCvkg/max.png?1778358228',
  2: 'https://files.d20.io/images/486388203/1UcMlBr7KkrjM4JwGrNLTg/max.png?1778358226',
  3: 'https://files.d20.io/images/486388204/g-GJWDNQVdNReh8uxdsN7A/max.png?1778358226',
  4: 'https://files.d20.io/images/486388205/_e7JCX51nc_Xd-wHBDgXDA/max.png?1778358226',
  5: 'https://files.d20.io/images/486388206/WKv4-RMkerJOB6mxvDq9Sw/max.png?1778358226',
  6: 'https://files.d20.io/images/486388207/dCh4uENBm-RtN55uoaxplw/max.png?1778358226',
};

function getTier(total) {
  if (total >= 10) return { label: 'Full Success (10+)',       color: '#46b34d' };
  if (total >= 7)  return { label: 'Partial Success (7-9)',    color: '#b38a1a' };
  return                  { label: 'Miss / Complication (6-)', color: '#440202' };
}

function getBanner(total) {
  return TURN_BANNERS[Math.min(Math.max(total, 1), 16)];
}

function buildTurnDieCard(charName, dieFace, bannerUrl) {
  return '<div style="border-radius:8px;overflow:hidden;border:2px solid #214f24;' +
    'background:#1a1a1a;font-family:Arial,sans-serif;">' +
    '<img src="' + bannerUrl + '" style="display:block;width:100%;height:auto;margin:0;padding:0;">' +
    '<div style="padding:8px 10px;text-align:center;">' +
    '<p style="margin:2px 0;font-size:13px;font-weight:bold;color:#fff;text-transform:uppercase;' +
    'letter-spacing:1px;">Turn Die</p>' +
    '<p style="margin:2px 0;font-size:10px;color:#aaaaaa;">' + charName + '</p>' +
    '<p style="margin:4px 0;font-size:32px;font-weight:900;color:#fff;line-height:1;">' + dieFace + '</p>' +
    '<p style="margin:6px 0 2px;font-size:12px;font-weight:bold;color:#46b34d;' +
    'text-transform:uppercase;letter-spacing:1px;">Mark Stress!</p>' +
    '</div></div>';
}

function buildCard(charName, statLabel, rollType, dieResult, statVal, total, tier, bannerUrl) {
  var typeLabel = rollType ? ('<p style="margin:2px 0;font-size:10px;font-weight:bold;color:#cccccc;' +
    'text-transform:uppercase;letter-spacing:1px;">' + rollType + '</p>') : '';
  var operator  = (rollType === 'Struggles') ? ' - ' : ' + ';
  var breakdown = '<p style="margin:2px 0;font-size:11px;color:#aaaaaa;">2d6: ' +
    dieResult + operator + statVal + ' (' + statLabel + ')</p>';

  return '<div style="border-radius:8px;overflow:hidden;border:2px solid #214f24;' +
    'background:#1a1a1a;font-family:Arial,sans-serif;">' +
    '<img src="' + bannerUrl + '" style="display:block;width:100%;height:auto;margin:0;padding:0;">' +
    '<div style="background:' + tier.color + ';color:#fff;font-size:10px;font-weight:bold;' +
    'text-transform:uppercase;letter-spacing:1px;text-align:center;padding:3px 8px;">' +
    tier.label + '</div>' +
    '<div style="padding:8px 10px;text-align:center;">' +
    '<p style="margin:2px 0;font-size:13px;font-weight:bold;color:#fff;text-transform:uppercase;' +
    'letter-spacing:1px;">' + statLabel + '</p>' +
    typeLabel +
    '<p style="margin:2px 0;font-size:10px;color:#aaaaaa;">' + charName + '</p>' +
    '<p style="margin:4px 0;font-size:32px;font-weight:900;color:#fff;line-height:1;">' + total + '</p>' +
    breakdown +
    '</div></div>';
}

on('chat:message', function(msg) {

  // Health check
  if (msg.type === 'api' && msg.content.trim() === '!turn-test') {
    sendChat('Turn API', '/w gm Turn API v10 is running.');
    return;
  }

  // Only handle Turn roll results
  if (msg.type !== 'rollresult') return;

  var origRoll   = msg.origRoll || '';
  var labelMatch = origRoll.match(/\[Turn:([^\]|]+)(?:\|([^\]]+))?\]/);
  if (!labelMatch) return;

  var statLabel = labelMatch[1].trim();
  var rollType  = labelMatch[2] ? labelMatch[2].trim() : '';

  // Parse roll data
  var rollData;
  try {
    rollData = JSON.parse(msg.content);
  } catch(e) {
    log('TURN: JSON parse failed — ' + e);
    return;
  }

  // Get total
  var total = 0;
  if (typeof rollData.total === 'number') {
    total = rollData.total;
  } else {
    rollData.rolls.forEach(function(r) {
      if (r.type === 'R') {
        r.results.forEach(function(res) { total += res.v; });
      } else if (r.type === 'M') {
        total += parseInt(r.expr, 10) || 0;
      }
    });
  }

  // Extract individual die results and stat modifier
  var diceResults = [];
  var statVal     = 0;
  rollData.rolls.forEach(function(r) {
    if (r.type === 'R') {
      r.results.forEach(function(res) { diceResults.push(res.v); });
    } else if (r.type === 'M') {
      statVal = parseInt(r.expr.replace('+', ''), 10) || 0;
    }
  });
  var dieResult = diceResults.join(', ');

  var charName = msg.who ? msg.who.replace(' (GM)', '') : 'Unknown';

  // Route Turn Die rolls to their own card
  if (statLabel === 'Turn Die') {
    var dieFace   = diceResults[0] || total;
    var bannerUrl = TURN_DIE_BANNERS[Math.min(Math.max(dieFace, 1), 6)];
    sendChat(charName, buildTurnDieCard(charName, dieFace, bannerUrl), null, {noarchive: false});
    return;
  }

  var tier = getTier(total);
  var card = buildCard(charName, statLabel, rollType, dieResult, statVal, total, tier, getBanner(total));
  sendChat(charName, card, null, {noarchive: false});
});
