var FF5ECoreAutomation = FF5ECoreAutomation || (function() {
  'use strict';

  var VERSION = '1.7.0';
  var STATE_NAME = 'FF5E_CoreAutomation';

  var CONFIG = {
    autoFindLinkedTokenForInitiative: true
  };

  var STATUS_MARKERS = {
    Poison: 'poison',
    Silence: 'interdiction',
    Blind: 'bleeding-eye',
    Berserk: 'fist',
    Doom: 'death-zone',
    Slow: 'snail',
    Stop: 'frozen-orb',
    Petrify: 'stone-skull',
    Sleep: 'sleepy',
    Confuse: 'screaming',
    Protect: 'shield',
    Shell: 'aura',
    Haste: 'wingfoot',
    Regen: 'green',
    Reflect: 'back-pain',
    Float: 'fluffy-wing',
    Brave: 'strong',
    Faith: 'angel-outfit',
    Burning: 'half-haze',
    Frozen: 'frozen-orb',
    Stunned: 'pummeled',
    Marked: 'target',
    Prone: 'back-pain'
  };

  var SCALE_RANK = {
    personal: 1,
    armor: 2,
    ship: 3
  };

  function assureState() {
    state[STATE_NAME] = state[STATE_NAME] || {
      statusTimers: {},
      summonTimers: {},
      autoRoundTick: true,
      lastTurnId: null,
      round: 1
    };
  }

  function clean(text) {
    return String(text === undefined || text === null ? '' : text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;');
  }

  function signed(num) {
    num = parseInt(num || 0, 10);
    return num >= 0 ? '+' + num : String(num);
  }

  function whisper(message) {
    sendChat('FF5E', '/w gm ' + message);
  }

  function quotedArgs(content) {
    var re = /"([^"]*)"|'([^']*)'|(\S+)/g;
    var args = [];
    var match;

    while ((match = re.exec(content)) !== null) {
      args.push(match[1] || match[2] || match[3]);
    }

    return args;
  }

  function getAttr(characterId, attrName) {
    return findObjs({
      type: 'attribute',
      characterid: characterId,
      name: attrName
    })[0];
  }

  function getAttrValue(characterId, attrName, fallback) {
    var attr = getAttr(characterId, attrName);
    return attr ? attr.get('current') : fallback;
  }

  function getAttrMax(characterId, attrName, fallback) {
    var attr = getAttr(characterId, attrName);
    return attr ? attr.get('max') : fallback;
  }

  function setAttrValue(characterId, attrName, value, maxValue) {
    var attr = getAttr(characterId, attrName);

    if (!attr) {
      var data = {
        characterid: characterId,
        name: attrName,
        current: value
      };

      if (maxValue !== undefined && maxValue !== null) {
        data.max = maxValue;
      }

      createObj('attribute', data);
    } else {
      attr.set('current', value);

      if (maxValue !== undefined && maxValue !== null) {
        attr.set('max', maxValue);
      }
    }
  }

  function getCharacterFromToken(tokenId) {
    var token = getObj('graphic', tokenId);

    if (!token) {
      return null;
    }

    var characterId = token.get('represents');

    if (!characterId) {
      return null;
    }

    return {
      token: token,
      characterId: characterId
    };
  }

  function getSelectedToken(msg) {
    if (!msg.selected || !msg.selected.length) {
      return null;
    }

    return getObj('graphic', msg.selected[0]._id);
  }

  function findLinkedTokenOnCurrentPage(characterId) {
    if (!characterId || !CONFIG.autoFindLinkedTokenForInitiative) {
      return null;
    }

    var pageId = Campaign().get('playerpageid');

    if (pageId) {
      var pageMatches = findObjs({
        _type: 'graphic',
        _subtype: 'token',
        _pageid: pageId,
        represents: characterId
      });

      if (pageMatches.length === 1) {
        return pageMatches[0];
      }
    }

    var allMatches = findObjs({
      _type: 'graphic',
      _subtype: 'token',
      represents: characterId
    });

    if (allMatches.length === 1) {
      return allMatches[0];
    }

    return null;
  }

  function getInitiativeToken(msg, characterId) {
    return getSelectedToken(msg) || findLinkedTokenOnCurrentPage(characterId);
  }

  function normalizeStatusAttrName(statusName) {
    return 'status_' + String(statusName || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }

  function rollDiceFormula(formula) {
    var original = String(formula || '0').trim();

    if (!original) {
      original = '0';
    }

    var working = original.replace(/\s+/g, '');

    if (!/^[0-9dD+\-*/().]+$/.test(working)) {
      return {
        total: 0,
        formula: original,
        detail: 'Unsupported formula'
      };
    }

    var detailParts = [];

    working = working.replace(/(\d*)d(\d+)/gi, function(match, countText, sidesText) {
      var count = parseInt(countText || '1', 10);
      var sides = parseInt(sidesText || '20', 10);

      count = Math.max(1, Math.min(count, 100));
      sides = Math.max(2, Math.min(sides, 1000));

      var rolls = [];
      var total = 0;

      for (var i = 0; i < count; i++) {
        var roll = randomInteger(sides);
        rolls.push(roll);
        total += roll;
      }

      detailParts.push(match + '[' + rolls.join(',') + ']');
      return String(total);
    });

    var total = 0;

    try {
      if (/^[0-9+\-*/().]+$/.test(working)) {
        total = Math.floor(Function('"use strict"; return (' + working + ');')());
      }
    } catch (e) {
      total = 0;
    }

    if (!isFinite(total)) {
      total = 0;
    }

    return {
      total: total,
      formula: original,
      detail: detailParts.join(' ')
    };
  }

  function parseAttackModifier(input) {
    var text = String(input || '0').replace(/\s+/g, '');

    if (/^[+-]?\d+$/.test(text)) {
      return parseInt(text, 10);
    }

    var match = text.match(/^(?:1d20|d20)([+-]\d+)?$/i);

    if (match) {
      return parseInt(match[1] || '0', 10);
    }

    return 0;
  }

  function sendTemplate(templateName, fields) {
    var parts = ['&{template:' + templateName + '}'];

    Object.keys(fields).forEach(function(key) {
      if (fields[key] !== undefined && fields[key] !== null && fields[key] !== '') {
        parts.push('{{' + key + '=' + clean(fields[key]) + '}}');
      }
    });

    sendChat('FF5E', parts.join(' '));
  }

  function cardFlagsFromD20(d20) {
    if (d20 === 20) {
      return { crit: '1' };
    }

    if (d20 === 1) {
      return { fail: '1' };
    }

    return { normal: '1' };
  }

  function sendD20Card(actor, rollName, rollType, modifier, description) {
    modifier = parseInt(modifier || 0, 10);

    var d20 = randomInteger(20);
    var total = d20 + modifier;
    var flags = cardFlagsFromD20(d20);

    sendTemplate('ff5e_card_d20', {
      name: rollName,
      actor: actor,
      type: rollType,
      d20: d20,
      modifier: signed(modifier),
      total: total,
      formula: '1d20 ' + signed(modifier),
      description: description,
      crit: flags.crit,
      fail: flags.fail,
      normal: flags.normal
    });

    return {
      d20: d20,
      total: total
    };
  }

  function sendAttackCard(actor, attackName, attackType, attackModifierOrFormula, damageFormula, mpCost, description) {
    var attackMod = parseAttackModifier(attackModifierOrFormula);
    var d20 = randomInteger(20);
    var attackTotal = d20 + attackMod;
    var damage = rollDiceFormula(damageFormula);
    var flags = cardFlagsFromD20(d20);

    sendTemplate('ff5e_card_attack', {
      name: attackName,
      actor: actor,
      type: attackType,
      description: description,
      mpcost: mpCost,
      attackd20: d20,
      attackmodifier: signed(attackMod),
      attacktotal: attackTotal,
      attackformula: '1d20 ' + signed(attackMod),
      damage: damage.total,
      damageformula: damage.formula,
      crit: flags.crit,
      fail: flags.fail,
      normal: flags.normal
    });

    return {
      d20: d20,
      attackTotal: attackTotal,
      damageTotal: damage.total
    };
  }

  function sendPowerCard(actor, powerName, powerType, resultFormula, mpCost, detailLine, description) {
    var result = rollDiceFormula(resultFormula);

    sendTemplate('ff5e_card_power', {
      name: powerName,
      actor: actor,
      type: powerType,
      description: description,
      mpcost: mpCost,
      result: result.total,
      formula: result.formula,
      detail: detailLine
    });

    return result;
  }

  function sendResourceCard(name, actor, resourceType, before, after, description) {
    sendTemplate('ff5e_card_resource', {
      name: name,
      actor: actor,
      type: resourceType,
      before: before,
      after: after,
      description: description
    });
  }
    function addOrUpdateTurnOrder(tokenId, initiativeTotal, customName) {
    var raw = Campaign().get('turnorder');
    var turnorder = [];

    if (raw && raw !== '') {
      try {
        turnorder = JSON.parse(raw);
      } catch (e) {
        turnorder = [];
      }
    }

    var found = false;

    turnorder = turnorder.map(function(entry) {
      if (entry.id === tokenId) {
        found = true;
        entry.pr = initiativeTotal;
        entry.custom = customName || entry.custom || '';
      }

      return entry;
    });

    if (!found) {
      turnorder.push({
        id: tokenId,
        pr: initiativeTotal,
        custom: customName || ''
      });
    }

    turnorder.sort(function(a, b) {
      var av = parseFloat(a.pr) || 0;
      var bv = parseFloat(b.pr) || 0;
      return bv - av;
    });

    Campaign().set('initiativepage', true);
    Campaign().set('turnorder', JSON.stringify(turnorder));
  }

  function rollInitiativeCard(msg, characterId, actor, rollType, modifier) {
    var token = getInitiativeToken(msg, characterId);
    var tokenSource = 'No token selected or found. Rolled in chat only.';

    if (token) {
      tokenSource = 'Added token to the initiative tracker.';
    }

    var result = sendD20Card(
      actor,
      'Initiative',
      rollType + ' Initiative',
      modifier,
      tokenSource
    );

    if (token) {
      addOrUpdateTurnOrder(token.id, result.total, actor);
    }
  }

  function setTokenStatus(token, statusName, enabled) {
    var marker = STATUS_MARKERS[statusName];

    if (!marker) {
      return;
    }

    var current = token.get('statusmarkers') || '';
    var parts = current ? current.split(',').filter(Boolean) : [];

    parts = parts.filter(function(item) {
      return item.split('@')[0] !== marker;
    });

    if (enabled) {
      parts.push(marker);
    }

    token.set('statusmarkers', parts.join(','));
  }

  function addStatusTimer(tokenId, statusName, rounds) {
    assureState();

    var data = getCharacterFromToken(tokenId);

    if (!data) {
      whisper('Status failed: token is not linked to a character.');
      return;
    }

    statusName = String(statusName || '').trim();
    rounds = parseInt(rounds || 1, 10);

    if (!statusName) {
      whisper('Status failed: no status name provided.');
      return;
    }

    var key = tokenId + ':' + statusName;

    state[STATE_NAME].statusTimers[key] = {
      tokenId: tokenId,
      statusName: statusName,
      rounds: rounds
    };

    setTokenStatus(data.token, statusName, true);
    setAttrValue(data.characterId, normalizeStatusAttrName(statusName), 1);

    sendResourceCard(
      statusName,
      data.token.get('name'),
      'Status Applied',
      '0',
      rounds + ' rounds',
      statusName + ' was applied.'
    );
  }

  function removeStatusTimer(key) {
    assureState();

    var timer = state[STATE_NAME].statusTimers[key];

    if (!timer) {
      return;
    }

    var data = getCharacterFromToken(timer.tokenId);

    if (data) {
      setTokenStatus(data.token, timer.statusName, false);
      setAttrValue(data.characterId, normalizeStatusAttrName(timer.statusName), 0);

      sendResourceCard(
        timer.statusName,
        data.token.get('name'),
        'Status Expired',
        'Active',
        'Expired',
        timer.statusName + ' expired.'
      );
    }

    delete state[STATE_NAME].statusTimers[key];
  }

  function tickStatusTimers() {
    assureState();

    var expired = [];

    Object.keys(state[STATE_NAME].statusTimers).forEach(function(key) {
      state[STATE_NAME].statusTimers[key].rounds -= 1;

      if (state[STATE_NAME].statusTimers[key].rounds <= 0) {
        expired.push(key);
      }
    });

    expired.forEach(removeStatusTimer);

    if (!expired.length) {
      sendResourceCard(
        'Status Timers',
        'Round System',
        'Round Tick',
        'Active',
        'No Expirations',
        'Status timers ticked.'
      );
    }
  }

  function listStatusTimers() {
    assureState();

    var keys = Object.keys(state[STATE_NAME].statusTimers);

    if (!keys.length) {
      whisper('No active status timers.');
      return;
    }

    whisper(keys.map(function(key) {
      var timer = state[STATE_NAME].statusTimers[key];
      var token = getObj('graphic', timer.tokenId);
      var name = token ? token.get('name') : timer.tokenId;
      return name + ': ' + timer.statusName + ' — ' + timer.rounds + ' rounds';
    }).join('<br>'));
  }

  function addSummonTimer(tokenId, summonName, rounds) {
    assureState();

    var data = getCharacterFromToken(tokenId);

    if (!data) {
      whisper('Summon failed: token is not linked to a character.');
      return;
    }

    summonName = String(summonName || '').trim();
    rounds = parseInt(rounds || 3, 10);

    if (!summonName) {
      whisper('Summon failed: no summon name provided.');
      return;
    }

    var key = tokenId + ':' + summonName;

    state[STATE_NAME].summonTimers[key] = {
      tokenId: tokenId,
      summonName: summonName,
      rounds: rounds
    };

    sendResourceCard(
      summonName,
      data.token.get('name'),
      'Summon Timer',
      '0',
      rounds + ' rounds',
      summonName + ' was summoned.'
    );
  }

  function tickSummonTimers() {
    assureState();

    var expired = [];

    Object.keys(state[STATE_NAME].summonTimers).forEach(function(key) {
      state[STATE_NAME].summonTimers[key].rounds -= 1;

      if (state[STATE_NAME].summonTimers[key].rounds <= 0) {
        expired.push(key);
      }
    });

    expired.forEach(function(key) {
      var summon = state[STATE_NAME].summonTimers[key];
      var token = getObj('graphic', summon.tokenId);
      var caster = token ? token.get('name') : 'Unknown Caster';

      sendResourceCard(
        summon.summonName,
        caster,
        'Summon Expired',
        'Active',
        'Expired',
        summon.summonName + ' fades from the battlefield.'
      );

      delete state[STATE_NAME].summonTimers[key];
    });

    if (!expired.length) {
      sendResourceCard(
        'Summon Timers',
        'Round System',
        'Round Tick',
        'Active',
        'No Expirations',
        'Summon timers ticked.'
      );
    }
  }

  function listSummonTimers() {
    assureState();

    var keys = Object.keys(state[STATE_NAME].summonTimers);

    if (!keys.length) {
      whisper('No active summons.');
      return;
    }

    whisper(keys.map(function(key) {
      var summon = state[STATE_NAME].summonTimers[key];
      var token = getObj('graphic', summon.tokenId);
      var caster = token ? token.get('name') : summon.tokenId;
      return summon.summonName + ' by ' + caster + ' — ' + summon.rounds + ' rounds';
    }).join('<br>'));
  }

  function spendMP(characterId, amount) {
    var current = parseInt(getAttrValue(characterId, 'mp_current', 0), 10) || 0;
    amount = parseInt(amount || 0, 10);

    if (current < amount) {
      return {
        ok: false,
        current: current,
        updated: current
      };
    }

    var updated = Math.max(0, current - amount);
    setAttrValue(characterId, 'mp_current', updated);

    return {
      ok: true,
      current: current,
      updated: updated
    };
  }

  function restoreMP(characterId, amount) {
    var current = parseInt(getAttrValue(characterId, 'mp_current', 0), 10) || 0;
    var maxCurrent = parseInt(getAttrValue(characterId, 'mp_max', 0), 10) || 0;
    var maxBar = parseInt(getAttrMax(characterId, 'mp_current', 0), 10) || 0;
    var max = Math.max(maxCurrent, maxBar);

    amount = parseInt(amount || 0, 10);

    var updated = max > 0 ? Math.min(max, current + amount) : current + amount;
    setAttrValue(characterId, 'mp_current', updated);

    return {
      current: current,
      updated: updated
    };
  }

  function addLimit(characterId, amount) {
    var current = parseInt(getAttrValue(characterId, 'limit_current', 0), 10) || 0;
    var max = parseInt(getAttrValue(characterId, 'limit_max', 100), 10) || 100;

    amount = parseInt(amount || 0, 10);

    var updated = Math.min(max, current + amount);
    setAttrValue(characterId, 'limit_current', updated);
    setAttrValue(characterId, 'limit_ready', updated >= max ? 'Yes' : 'No');

    return {
      current: current,
      updated: updated
    };
  }

  function spendLimit(characterId, amount) {
    var current = parseInt(getAttrValue(characterId, 'limit_current', 0), 10) || 0;
    var max = parseInt(getAttrValue(characterId, 'limit_max', 100), 10) || 100;

    amount = parseInt(amount || 100, 10);

    if (current < amount) {
      return {
        ok: false,
        current: current,
        updated: current
      };
    }

    var updated = Math.max(0, current - amount);
    setAttrValue(characterId, 'limit_current', updated);
    setAttrValue(characterId, 'limit_ready', updated >= max ? 'Yes' : 'No');

    return {
      ok: true,
      current: current,
      updated: updated
    };
  }

  function addExp(characterId, amount) {
    var current = parseInt(getAttrValue(characterId, 'exp_current', 0), 10) || 0;
    var next = parseInt(getAttrValue(characterId, 'exp_next', 0), 10) || 0;

    amount = parseInt(amount || 0, 10);

    var updated = Math.max(0, current + amount);
    var remaining = next > 0 ? Math.max(0, next - updated) : 0;
    var status = next > 0 && updated >= next ? 'Ready to Level' : remaining + ' EXP needed';

    if (next <= 0) {
      status = 'Max Level / Manual';
    }

    setAttrValue(characterId, 'exp_current', updated);
    setAttrValue(characterId, 'exp_remaining', remaining);
    setAttrValue(characterId, 'exp_status', status);

    return {
      current: current,
      updated: updated,
      remaining: remaining,
      status: status
    };
  }

  function scaleDamage(baseDamage, attackerScale, targetScale) {
    var attacker = SCALE_RANK[attackerScale] || 1;
    var target = SCALE_RANK[targetScale] || 1;
    var multiplier = 1;

    if (attacker < target) {
      multiplier = 0.1;
    }

    if (attacker > target) {
      multiplier = 10;
    }

    return Math.max(0, Math.floor((parseInt(baseDamage || 0, 10)) * multiplier));
  }

  function affinityDamage(baseDamage, affinity) {
    var damage = parseInt(baseDamage || 0, 10);
    var result = 'Normal damage.';

    if (affinity === 'Weak') {
      damage = Math.floor(damage * 1.5);
      result = 'Weak: damage x1.5.';
    }

    if (affinity === 'Resist') {
      damage = Math.floor(damage / 2);
      result = 'Resist: half damage.';
    }

    if (affinity === 'Null') {
      damage = 0;
      result = 'Null: no damage.';
    }

    if (affinity === 'Absorb') {
      damage = damage * -1;
      result = 'Absorb: target heals instead.';
    }

    return {
      damage: damage,
      result: result
    };
  }

  function parseRecharge(text) {
    if (!text) return null;

    var cleanText = String(text).trim();

    if (cleanText === '6') return 6;
    if (cleanText === '5-6') return 5;
    if (cleanText === '4-6') return 4;
    if (cleanText === '3-6') return 3;

    return null;
  }

  function rollRecharge(rechargeText) {
    var target = parseRecharge(rechargeText);

    if (!target) {
      whisper('Use recharge values like 6, 5-6, 4-6, or 3-6.');
      return;
    }

    var roll = randomInteger(6);
    var ready = roll >= target;

    sendTemplate('ff5e_card_resource', {
      name: 'Recharge ' + rechargeText,
      actor: 'Recharge Check',
      type: ready ? 'Ready' : 'Not Ready',
      before: 'd6 roll',
      after: roll,
      description: ready ? 'The ability recharges.' : 'The ability does not recharge.'
    });
  }

  function evaluateBossPhase(characterId) {
    var current = parseInt(getAttrValue(characterId, 'npc_hp_current', 0), 10) || 0;
    var max = parseInt(getAttrValue(characterId, 'npc_hp_max', 1), 10) || 1;
    var pct = Math.floor((current / max) * 100);

    var phase = 1;

    if (pct <= 50) phase = 2;
    if (pct <= 25) phase = 3;
    if (pct <= 10) phase = 4;

    setAttrValue(characterId, 'boss_phase', phase);
    setAttrValue(characterId, 'npc_hp_percent', pct);

    return {
      phase: phase,
      pct: pct
    };
  }

  function linkBarToAttr(token, characterId, barNumber, attrName, visibleToPlayers, editableByPlayers) {
    var attr = getAttr(characterId, attrName);

    if (!attr) {
      attr = createObj('attribute', {
        characterid: characterId,
        name: attrName,
        current: 0
      });
    }

    var data = {};

    data['bar' + barNumber + '_link'] = attr.id;
    data['showplayers_bar' + barNumber] = !!visibleToPlayers;
    data['playersedit_bar' + barNumber] = !!editableByPlayers;

    token.set(data);
  }

  function setupToken(tokenId, mode) {
    var data = getCharacterFromToken(tokenId);

    if (!data) {
      whisper('Token setup failed: token is not linked to a character.');
      return;
    }

    if (mode === 'character') {
      linkBarToAttr(data.token, data.characterId, 1, 'hp_current', true, true);
      linkBarToAttr(data.token, data.characterId, 2, 'mp_current', true, true);
      linkBarToAttr(data.token, data.characterId, 3, 'limit_current', true, false);
    }

    if (mode === 'monster') {
      linkBarToAttr(data.token, data.characterId, 1, 'npc_hp_current', true, false);
      linkBarToAttr(data.token, data.characterId, 2, 'npc_mp_current', false, false);
      linkBarToAttr(data.token, data.characterId, 3, 'npc_limit_current', false, false);
    }

    if (mode === 'vehicle') {
      linkBarToAttr(data.token, data.characterId, 1, 'vehicle_hp_current', true, false);
      linkBarToAttr(data.token, data.characterId, 2, 'vehicle_shield_current', true, false);
      linkBarToAttr(data.token, data.characterId, 3, 'vehicle_limit_current', true, false);
    }

    sendResourceCard(
      'Token Setup',
      data.token.get('name'),
      mode,
      'Unlinked',
      'Linked',
      'Token bars were linked.'
    );
  }

  function tickRoundSystems() {
    assureState();

    state[STATE_NAME].round += 1;

    tickStatusTimers();
    tickSummonTimers();

    sendResourceCard(
      'Round Tick',
      'Automation',
      'Round',
      state[STATE_NAME].round - 1,
      state[STATE_NAME].round,
      'Round automation tick complete.'
    );
  }

  function handleTurnOrderChange() {
    assureState();

    if (!state[STATE_NAME].autoRoundTick) {
      return;
    }

    var raw = Campaign().get('turnorder');

    if (!raw || raw === '') {
      return;
    }

    var turnorder;

    try {
      turnorder = JSON.parse(raw);
    } catch (e) {
      return;
    }

    if (!turnorder || !turnorder.length) {
      return;
    }

    var firstTurnId = turnorder[0].id || turnorder[0]._id || '';

    if (!state[STATE_NAME].lastTurnId) {
      state[STATE_NAME].lastTurnId = firstTurnId;
      return;
    }

    if (firstTurnId !== state[STATE_NAME].lastTurnId) {
      state[STATE_NAME].lastTurnId = firstTurnId;
      return;
    }

    tickRoundSystems();
  }
    function handleInput(msg) {
    if (msg.type !== 'api') return;

    assureState();

    var args = quotedArgs(msg.content);
    var command = args.shift();

    if (command === '!ff5e-help') {
      whisper(
        '<b>FF5E Commands</b><br>' +
        '!ff5e-card-d20 "Actor" "Roll Name" "Roll Type" MOD "Description"<br>' +
        '!ff5e-card-init CHARACTER_ID "Actor" "Type" MOD<br>' +
        '!ff5e-card-attack "Actor" "Attack Name" "Attack Type" MOD "Damage Formula" MP "Description"<br>' +
        '!ff5e-card-attack-formula "Actor" "Attack Name" "Attack Type" "Attack Formula" "Damage Formula" MP "Description"<br>' +
        '!ff5e-card-power "Actor" "Power Name" "Power Type" "Result Formula" MP "Detail" "Description"<br>' +
        '!ff5e-token character|monster|vehicle<br>' +
        '!ff5e-exp add TOKEN AMOUNT<br>' +
        '!ff5e-exp subtract TOKEN AMOUNT<br>' +
        '!ff5e-mp spend TOKEN AMOUNT<br>' +
        '!ff5e-mp restore TOKEN AMOUNT<br>' +
        '!ff5e-cast TOKEN "Spell Name" MP "Element" "Roll"<br>' +
        '!ff5e-limit add TOKEN AMOUNT<br>' +
        '!ff5e-limit spend TOKEN AMOUNT<br>' +
        '!ff5e-limit-use TOKEN "Limit Name" COST<br>' +
        '!ff5e-summon-cast TOKEN "Summon Name" MP ROUNDS<br>' +
        '!ff5e-status add TOKEN Status Rounds<br>' +
        '!ff5e-status list<br>' +
        '!ff5e-status tick<br>' +
        '!ff5e-summon add TOKEN "Summon Name" Rounds<br>' +
        '!ff5e-summon list<br>' +
        '!ff5e-summon tick<br>' +
        '!ff5e-scale-damage DAMAGE attackerScale targetScale<br>' +
        '!ff5e-affinity-damage DAMAGE Affinity<br>' +
        '!ff5e-boss check TOKEN<br>' +
        '!ff5e-boss set TOKEN PHASE<br>' +
        '!ff5e-recharge 5-6<br>' +
        '!ff5e-round tick<br>' +
        '!ff5e-round auto on|off'
      );
      return;
    }

    if (command === '!ff5e-card-d20') {
      sendD20Card(
        args.shift() || 'Actor',
        args.shift() || 'Check',
        args.shift() || 'D20 Roll',
        args.shift() || 0,
        args.shift() || ''
      );
      return;
    }

    if (command === '!ff5e-card-init') {
      rollInitiativeCard(
        msg,
        args.shift() || '',
        args.shift() || 'Actor',
        args.shift() || 'Character',
        args.shift() || 0
      );
      return;
    }

    if (command === '!ff5e-card-attack') {
      sendAttackCard(
        args.shift() || 'Actor',
        args.shift() || 'Attack',
        args.shift() || 'Attack Roll',
        args.shift() || 0,
        args.shift() || '0',
        args.shift() || 0,
        args.shift() || ''
      );
      return;
    }

    if (command === '!ff5e-card-attack-formula') {
      sendAttackCard(
        args.shift() || 'Actor',
        args.shift() || 'Attack',
        args.shift() || 'Attack Roll',
        args.shift() || '0',
        args.shift() || '0',
        args.shift() || 0,
        args.shift() || ''
      );
      return;
    }

    if (command === '!ff5e-card-power') {
      sendPowerCard(
        args.shift() || 'Actor',
        args.shift() || 'Power',
        args.shift() || 'Power Roll',
        args.shift() || '0',
        args.shift() || 0,
        args.shift() || '',
        args.shift() || ''
      );
      return;
    }

    if (command === '!ff5e-token') {
      var tokenMode = args.shift();
      var tokenForSetup = getSelectedToken(msg);

      if (!tokenForSetup) {
        whisper('Select a token first.');
        return;
      }

      setupToken(tokenForSetup.id, tokenMode);
      return;
    }

    if (command === '!ff5e-exp') {
      var expMode = args.shift();
      var expTokenId = args.shift();
      var expAmount = parseInt(args.shift() || 0, 10);
      var expData = getCharacterFromToken(expTokenId);

      if (!expData) {
        whisper('EXP command failed: token is not linked to a character.');
        return;
      }

      if (expMode === 'subtract') {
        expAmount = expAmount * -1;
      }

      var expResult = addExp(expData.characterId, expAmount);

      sendResourceCard(
        'EXP Updated',
        expData.token.get('name'),
        'Experience',
        expResult.current,
        expResult.updated,
        expResult.status
      );

      return;
    }

    if (command === '!ff5e-mp') {
      var mpMode = args.shift();
      var mpTokenId = args.shift();
      var mpAmount = parseInt(args.shift() || 0, 10);
      var mpData = getCharacterFromToken(mpTokenId);

      if (!mpData) {
        whisper('MP command failed: token is not linked to a character.');
        return;
      }

      if (mpMode === 'spend') {
        var spent = spendMP(mpData.characterId, mpAmount);

        if (!spent.ok) {
          whisper('Not enough MP. Current MP: ' + spent.current + ', cost: ' + mpAmount + '.');
        } else {
          sendResourceCard('MP Spent', mpData.token.get('name'), 'MP', spent.current, spent.updated, mpAmount + ' MP was spent.');
        }
      }

      if (mpMode === 'restore') {
        var restored = restoreMP(mpData.characterId, mpAmount);
        sendResourceCard('MP Restored', mpData.token.get('name'), 'MP', restored.current, restored.updated, mpAmount + ' MP was restored.');
      }

      return;
    }

    if (command === '!ff5e-cast') {
      var castTokenId = args.shift();
      var spellName = args.shift() || 'Spell';
      var spellCost = parseInt(args.shift() || 0, 10);
      var spellElement = args.shift() || '';
      var spellRoll = args.shift() || '0';
      var castData = getCharacterFromToken(castTokenId);

      if (!castData) {
        whisper('Cast failed: token is not linked to a character.');
        return;
      }

      var mpSpend = spendMP(castData.characterId, spellCost);

      if (!mpSpend.ok) {
        whisper('Not enough MP to cast ' + spellName + '. Current MP: ' + mpSpend.current + ', cost: ' + spellCost + '.');
        return;
      }

      sendPowerCard(
        castData.token.get('name'),
        spellName,
        'Spell',
        spellRoll,
        spellCost,
        spellElement,
        'MP spent automatically. Remaining MP: ' + mpSpend.updated + '.'
      );
      return;
    }

    if (command === '!ff5e-limit') {
      var limitMode = args.shift();
      var limitTokenId = args.shift();
      var limitAmount = parseInt(args.shift() || 0, 10);
      var limitData = getCharacterFromToken(limitTokenId);

      if (!limitData) {
        whisper('Limit command failed: token is not linked to a character.');
        return;
      }

      if (limitMode === 'add') {
        var newLimit = addLimit(limitData.characterId, limitAmount);
        sendResourceCard('Limit Increased', limitData.token.get('name'), 'Limit', newLimit.current, newLimit.updated, limitAmount + ' Limit was gained.');
      }

      if (limitMode === 'spend') {
        var spentLimit = spendLimit(limitData.characterId, limitAmount);

        if (!spentLimit.ok) {
          whisper('Not enough Limit. Current Limit: ' + spentLimit.current + ', cost: ' + limitAmount + '.');
        } else {
          sendResourceCard('Limit Spent', limitData.token.get('name'), 'Limit', spentLimit.current, spentLimit.updated, limitAmount + ' Limit was spent.');
        }
      }

      return;
    }

    if (command === '!ff5e-limit-use') {
      var limitUseTokenId = args.shift();
      var limitName = args.shift() || 'Limit Break';
      var limitCost = parseInt(args.shift() || 100, 10);
      var limitUseData = getCharacterFromToken(limitUseTokenId);

      if (!limitUseData) {
        whisper('Limit use failed: token is not linked to a character.');
        return;
      }

      var result = spendLimit(limitUseData.characterId, limitCost);

      if (!result.ok) {
        whisper('Not enough Limit to use ' + limitName + '. Current Limit: ' + result.current + ', cost: ' + limitCost + '.');
        return;
      }

      sendResourceCard(limitName, limitUseData.token.get('name'), 'Limit Break', result.current, result.updated, 'Limit spent: ' + limitCost + '.');
      return;
    }

    if (command === '!ff5e-summon-cast') {
      var summonTokenId = args.shift();
      var summonName = args.shift() || 'Summon';
      var summonCost = parseInt(args.shift() || 0, 10);
      var summonRounds = parseInt(args.shift() || 3, 10);
      var summonData = getCharacterFromToken(summonTokenId);

      if (!summonData) {
        whisper('Summon failed: token is not linked to a character.');
        return;
      }

      var summonSpend = spendMP(summonData.characterId, summonCost);

      if (!summonSpend.ok) {
        whisper('Not enough MP to summon ' + summonName + '. Current MP: ' + summonSpend.current + ', cost: ' + summonCost + '.');
        return;
      }

      addSummonTimer(summonTokenId, summonName, summonRounds);

      sendResourceCard(
        summonName,
        summonData.token.get('name'),
        'Summon Cast',
        summonSpend.current,
        summonSpend.updated,
        'MP spent: ' + summonCost + '. Duration: ' + summonRounds + ' rounds.'
      );
      return;
    }

    if (command === '!ff5e-status') {
      var statusMode = args.shift();

      if (statusMode === 'add') {
        addStatusTimer(args.shift(), args.shift(), args.shift());
      }

      if (statusMode === 'tick') {
        tickStatusTimers();
      }

      if (statusMode === 'list') {
        listStatusTimers();
      }

      return;
    }

    if (command === '!ff5e-summon') {
      var summonMode = args.shift();

      if (summonMode === 'add') {
        addSummonTimer(args.shift(), args.shift(), args.shift());
      }

      if (summonMode === 'tick') {
        tickSummonTimers();
      }

      if (summonMode === 'list') {
        listSummonTimers();
      }

      return;
    }

    if (command === '!ff5e-scale-damage') {
      var baseDamage = parseInt(args.shift() || 0, 10);
      var attackerScale = args.shift() || 'personal';
      var targetScale = args.shift() || 'personal';
      var scaled = scaleDamage(baseDamage, attackerScale, targetScale);

      sendResourceCard(
        'Scale Damage',
        attackerScale + ' → ' + targetScale,
        'Scale',
        baseDamage,
        scaled,
        'Scale damage was calculated.'
      );
      return;
    }

    if (command === '!ff5e-affinity-damage') {
      var affinityBaseDamage = parseInt(args.shift() || 0, 10);
      var affinity = args.shift() || 'Normal';
      var affinityResult = affinityDamage(affinityBaseDamage, affinity);

      sendResourceCard(
        'Affinity Damage',
        affinity,
        'Elemental Affinity',
        affinityBaseDamage,
        affinityResult.damage,
        affinityResult.result
      );
      return;
    }

    if (command === '!ff5e-boss') {
      var bossMode = args.shift();
      var bossTokenId = args.shift();
      var bossData = getCharacterFromToken(bossTokenId);

      if (!bossData) {
        whisper('Boss command failed: token is not linked to a character.');
        return;
      }

      if (bossMode === 'check') {
        var bossResult = evaluateBossPhase(bossData.characterId);

        sendResourceCard(
          'Boss Phase Check',
          bossData.token.get('name'),
          'Boss Phase',
          bossResult.pct + '% HP',
          'Phase ' + bossResult.phase,
          'Suggested boss phase was calculated.'
        );
      }

      if (bossMode === 'set') {
        var phase = parseInt(args.shift() || 1, 10);
        setAttrValue(bossData.characterId, 'boss_phase', phase);

        sendResourceCard(
          'Boss Phase Set',
          bossData.token.get('name'),
          'Boss Phase',
          'Manual',
          'Phase ' + phase,
          'Boss phase was manually updated.'
        );
      }

      return;
    }

    if (command === '!ff5e-recharge') {
      rollRecharge(args.shift());
      return;
    }

    if (command === '!ff5e-round') {
      var roundMode = args.shift();

      if (roundMode === 'tick') {
        tickRoundSystems();
      }

      if (roundMode === 'auto') {
        var setting = args.shift();

        if (setting === 'on') {
          state[STATE_NAME].autoRoundTick = true;
          whisper('Auto round ticking enabled.');
        }

        if (setting === 'off') {
          state[STATE_NAME].autoRoundTick = false;
          whisper('Auto round ticking disabled.');
        }
      }

      return;
    }
  }

  function registerEventHandlers() {
    on('chat:message', handleInput);
    on('change:campaign:turnorder', handleTurnOrderChange);
    log('FF5E Core Automation v' + VERSION + ' ready.');
  }

  return {
    RegisterEventHandlers: registerEventHandlers
  };
})();

on('ready', function() {
  FF5ECoreAutomation.RegisterEventHandlers();
});