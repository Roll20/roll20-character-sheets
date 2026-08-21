// TURN RPG — Roll Banner API Script v12

var TURN_BANNERS = {
  1:  'https://files.d20.io/images/487960941/4AIEjbxGlFlYiThCHnotMw/med.webp?1779492921',
  2:  'https://files.d20.io/images/487960942/RaF-djQpGeJT3VAUQ08t7w/max.webp?1779492362',
  3:  'https://files.d20.io/images/487960918/8Ha5OxLM5UDTihIgkmQoIA/max.webp?1779492360',
  4:  'https://files.d20.io/images/487960914/wVxDTQEahRHiZIty4sq2UQ/max.webp?1779492360',
  5:  'https://files.d20.io/images/487960917/6wVeQP5gtnP2DzOO760ipg/max.webp?1779492360',
  6:  'https://files.d20.io/images/487960913/ZhAAwMiwkBb0Cs7Lkbp_7g/max.webp?1779492360',
  7:  'https://files.d20.io/images/487960915/oS28HbAvisTjSMACiDw2fQ/max.webp?1779492360',
  8:  'https://files.d20.io/images/487960920/Oi0QljzqLOGHICD-VAb-WA/max.webp?1779492360',
  9:  'https://files.d20.io/images/487960922/U48cT6BgKW4KhbK0jBmx-A/max.webp?1779492361',
  10: 'https://files.d20.io/images/487960924/Uz_sgY8pqzZzrscMsJi4zw/max.webp?1779492361',
  11: 'https://files.d20.io/images/487960925/Waw780sLs1xkERr68SqdSA/max.webp?1779492361',
  12: 'https://files.d20.io/images/487960928/vXalYpZ9ZeLXyNugHxVnJg/max.webp?1779492361',
  13: 'https://files.d20.io/images/487960929/5TbXurKlheE4MR74VCgArA/max.webp?1779492361',
  14: 'https://files.d20.io/images/487960931/DDCmJ0HqaEoCsee1ZtV7Dg/max.webp?1779492361',
  15: 'https://files.d20.io/images/487960932/YVbYP5vT2BSVv7iqLcIoVw/max.webp?1779492361',
  16: 'https://files.d20.io/images/487960933/iuWoLeVibbdBgM5uMLPP0Q/max.webp?1779492361',
};

var TURN_DIE_BANNERS = {
  1: 'https://files.d20.io/images/487960934/ndaKhWBNg9CKZB_BTye60g/max.webp?1779492362',
  2: 'https://files.d20.io/images/487960935/eutRuRozclY9pOs1RhXcVQ/max.webp?1779492362',
  3: 'https://files.d20.io/images/487960937/hhopbNtWomcyrzDfY7SaTw/max.webp?1779492362',
  4: 'https://files.d20.io/images/487960938/Fv6iIOAbDhUyRwLziYRhDw/max.webp?1779492362',
  5: 'https://files.d20.io/images/487960939/2ApdbuiM4VjmOBanZSwHhw/max.webp?1779492362',
  6: 'https://files.d20.io/images/487960940/IN_Q-mHTfji7jdxRsif9kQ/max.webp?1779492362',
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
    sendChat('Turn API', '/w gm Turn API v12 is running.');
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
