/*
 * Tests for the "create attack" checkboxes (create-attack-entry) of items, spells and abilities.
 *
 * Run from the dev folder:  npm test
 * Test another build:       SHEET_HTML=/path/to/pathfinder_community.html npm test
 *
 * The test loads the BUILT sheet (../pathfinder_community.html by default), runs its sheet-worker
 * code in a small fake of Roll20's sheet sandbox (on, getAttrs, setAttrs, getSectionIDs,
 * generateRowID, with underscore as the global `_`), fires change events and counts the
 * repeating_weapon rows the sheet creates.
 *
 * The event shapes below were captured in a live game (Roll20 editor, Chrome, October 2026) with
 *   on('change:repeating_item:create-attack-entry', e => console.log(JSON.stringify(e)))
 * typed in the sheetsandbox console:
 *   - a click on the checkbox:   {sourceType: "player", newValue: "1"}
 *   - the sheet resetting it:    {sourceType: "sheetworker", previousValue: "1"}
 *   - opening the settings of a token that represents the character, then resizing it, fired
 *     the same event with NO value at all: {sourceType: "player"}  (no newValue, no previousValue)
 * Before the fix, that last event made the sheet create another copy of the item's attack every
 * time it happened.
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const underscore = require('underscore');

const SHEET_HTML = process.env.SHEET_HTML || path.join(__dirname, '..', '..', 'pathfinder_community.html');

function workerCode() {
  const html = fs.readFileSync(SHEET_HTML, 'utf8');
  const m = /<script type="text\/worker"[^>]*>([\s\S]*?)<\/script>/.exec(html);
  assert.ok(m, 'no sheet-worker script found in ' + SHEET_HTML);
  return m[1];
}
const CODE = workerCode();

// Minimal fake of Roll20's sheet sandbox, backed by a plain attribute store.
function sandbox(attrs) {
  const handlers = [];
  const reads = [];
  let rowSeq = 0;
  const later = (fn) => Promise.resolve().then(fn);
  const ctx = {
    _: underscore,
    console: { log() {}, info() {}, warn() {}, error() {}, debug() {}, trace() {} },
    on(events, fn) {
      String(events).split(/\s+/).forEach((e) => handlers.push({ event: e.toLowerCase(), fn }));
    },
    getAttrs(names, cb) {
      reads.push(...names);
      const out = {};
      names.forEach((n) => {
        if (Object.prototype.hasOwnProperty.call(attrs, n)) out[n] = attrs[n];
      });
      later(() => cb(out));
    },
    setAttrs(values, options, cb) {
      if (typeof options === 'function') {
        cb = options;
      }
      Object.assign(attrs, values);
      later(() => typeof cb === 'function' && cb());
    },
    getSectionIDs(section, cb) {
      const re = new RegExp('^repeating_' + section.replace(/^repeating_/, '') + '_(-[^_]+)_');
      const ids = [...new Set(Object.keys(attrs).map((k) => (re.exec(k) || [])[1]).filter(Boolean))];
      later(() => cb(ids));
    },
    generateRowID() {
      rowSeq += 1;
      return '-TestRow' + String(rowSeq).padStart(12, '0');
    },
    removeRepeatingRow() {},
    getTranslationByKey: (k) => k,
    getTranslationLanguage: () => 'en',
    setDefaultToken() {},
    startRoll: () => Promise.resolve({ results: {} }),
    finishRoll() {},
    setTimeout,
    clearTimeout,
    Promise,
  };
  vm.createContext(ctx);
  vm.runInContext(CODE, ctx);
  return {
    reads,
    async fire(event, eventInfo) {
      const hs = handlers.filter((h) => h.event === event);
      assert.ok(hs.length > 0, 'no handler registered for ' + event);
      hs.forEach((h) => h.fn(eventInfo));
      for (let i = 0; i < 50; i += 1) {
        await new Promise((r) => setImmediate(r));
      }
    },
    attackRows() {
      return [...new Set(Object.keys(attrs).map((k) => (/^repeating_weapon_(-[^_]+)_/.exec(k) || [])[1]).filter(Boolean))];
    },
  };
}

const ITEM = '-TestItem0000000001';
const ITEM_FIELD = 'repeating_item_' + ITEM + '_create-attack-entry';
function itemAttrs() {
  return {
    ['repeating_item_' + ITEM + '_name']: 'Warhammer +3',
    ['repeating_item_' + ITEM + '_item-attack-type']: 'attk-melee',
    ['repeating_item_' + ITEM + '_item-damage-dice-num']: '1',
    ['repeating_item_' + ITEM + '_item-damage-die']: '8',
    [ITEM_FIELD]: '0',
  };
}
async function itemEvent(info) {
  const attrs = itemAttrs();
  const s = sandbox(attrs);
  await s.fire('change:repeating_item:create-attack-entry', Object.assign({ sourceAttribute: ITEM_FIELD, triggerName: ITEM_FIELD }, info));
  return { rows: s.attackRows(), attrs };
}

test('item: a click on "create attack" creates one linked attack', async () => {
  const { rows, attrs } = await itemEvent({ sourceType: 'player', newValue: '1' });
  assert.strictEqual(rows.length, 1);
  assert.strictEqual(attrs['repeating_weapon_' + rows[0] + '_source-item'], ITEM);
  assert.strictEqual(attrs['repeating_weapon_' + rows[0] + '_name'], 'Warhammer +3');
});

test('item: a click made by an API script (setWithWorker) still creates the attack', async () => {
  const { rows } = await itemEvent({ sourceType: 'api', newValue: '1', previousValue: '0' });
  assert.strictEqual(rows.length, 1);
});

test('item: an event with no value (sheet start-up, token settings) creates nothing', async () => {
  const { rows } = await itemEvent({ sourceType: 'player' });
  assert.strictEqual(rows.length, 0, 'a copy of the attack was created by an event that carries no value');
});

test('item: events that do not turn the box on create nothing', async () => {
  for (const info of [
    { sourceType: 'player', newValue: '0' },
    { sourceType: 'player', newValue: '0', previousValue: '1' },
    { sourceType: 'player', newValue: '1', previousValue: '1' },
    { sourceType: 'sheetworker', previousValue: '1' },
  ]) {
    const { rows } = await itemEvent(info);
    assert.strictEqual(rows.length, 0, 'attack created for ' + JSON.stringify(info));
  }
});

for (const section of ['spells', 'ability']) {
  const field = 'repeating_' + section + '_-TestSrc00000000001_create-attack-entry';
  const startsCreating = async (info) => {
    const s = sandbox({});
    await s.fire('change:repeating_' + section + ':create-attack-entry', Object.assign({ sourceAttribute: field, triggerName: field }, info));
    return s.reads.some((n) => n.indexOf('repeating_' + section + '_-TestSrc00000000001_') === 0);
  };
  test(section + ': a click starts creating the attack', async () => {
    assert.strictEqual(await startsCreating({ sourceType: 'player', newValue: '1' }), true);
  });
  test(section + ': an event with no value is ignored', async () => {
    assert.strictEqual(await startsCreating({ sourceType: 'player' }), false);
  });
}
