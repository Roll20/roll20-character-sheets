const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sheet = fs.readFileSync(path.join(__dirname, '..', 'charsheet_3-5.html'), 'utf8');
const migrationStart = sheet.indexOf('/*  ======================================\n            VERSION MANAGEMENT');
const migrationEnd = sheet.indexOf('// ======================================', migrationStart);

assert.notEqual(migrationStart, -1, 'migration block start was not found');
assert.notEqual(migrationEnd, -1, 'migration block end was not found');

const legacySection = sheet.match(/<div class="legacy-repeating-spells-migration"[\s\S]*?<fieldset class="repeating_spells">([\s\S]*?)<\/fieldset>[\s\S]*?<\/div>/);
assert.ok(legacySection, 'the retired repeating_spells section must remain registered for migration');
[
    'spellused11',
    'spellprep11',
    'spellname11',
    'spelllevel11',
    'spellmacro11'
].forEach(field => {
    assert.match(legacySection[1], new RegExp(`name="attr_${field}"`), `legacy field ${field} must remain registered`);
});

const migrationSource = sheet.slice(migrationStart, migrationEnd) + `
globalThis.migrationTestApi = {
    parseSheetSchemaVersion,
    runSheetMigrations,
    migrateLegacyRepeatingSpells
};`;

const createHarness = ({attrs = {}, legacyRowIds = [], targetRowIds = [], missingAttrValue} = {}) => {
    const handlers = {};
    const writes = [];
    const errors = [];
    const targetIds = new Set(targetRowIds);
    const context = {
        console: {
            log() {},
            error(message) {
                errors.push(message);
            }
        },
        on(event, handler) {
            handlers[event] = handler;
        },
        getAttrs(names, callback) {
            callback(Object.fromEntries(names.map(name => [
                name,
                Object.prototype.hasOwnProperty.call(attrs, name) ? attrs[name] : missingAttrValue
            ])));
        },
        getSectionIDs(section, callback) {
            if(section === 'repeating_spells'){
                callback([...legacyRowIds]);
            }else if(section === 'repeating_spells11'){
                callback([...targetIds]);
            }else{
                callback([]);
            }
        },
        setAttrs(update, options, callback) {
            if(typeof options === 'function'){
                callback = options;
            }
            writes.push({...update});
            Object.assign(attrs, update);
            Object.keys(update).forEach(name => {
                const match = name.match(/^repeating_spells11_(.+)_(?:spellused11|spellprep11|spellname11|spelllevel11|spellmacro11)$/);
                if(match){
                    targetIds.add(match[1]);
                }
            });
            if(callback){
                callback();
            }
        }
    };

    vm.createContext(context);
    vm.runInContext(migrationSource, context);

    return {
        attrs,
        errors,
        handlers,
        writes,
        api: context.migrationTestApi,
        openSheet() {
            handlers['sheet:opened']();
        }
    };
};

{
    const harness = createHarness();
    const pendingMigrations = [];
    const events = [];
    const migrations = new Map([
        [1, done => {
            events.push('migration 1 started');
            pendingMigrations.push(() => {
                events.push('migration 1 completed');
                done();
            });
        }],
        [2, done => {
            events.push('migration 2 started');
            pendingMigrations.push(() => {
                events.push('migration 2 completed');
                done();
            });
        }]
    ]);

    harness.api.runSheetMigrations(0, 2, migrations);

    assert.deepEqual(events, ['migration 1 started']);
    assert.deepEqual(harness.writes, [], 'a pending migration must not update the schema version');

    pendingMigrations.shift()();

    assert.deepEqual(events, [
        'migration 1 started',
        'migration 1 completed',
        'migration 2 started'
    ]);
    assert.deepEqual(harness.writes, [{sheet_schema_version: 1, code_version: 0.1}]);

    pendingMigrations.shift()();

    assert.deepEqual(events, [
        'migration 1 started',
        'migration 1 completed',
        'migration 2 started',
        'migration 2 completed'
    ]);
    assert.deepEqual(harness.writes, [
        {sheet_schema_version: 1, code_version: 0.1},
        {sheet_schema_version: 2}
    ]);
}

{
    const harness = createHarness();
    let secondMigrationStarted = false;
    const migrations = new Map([
        [1, done => done(new Error('migration failed'))],
        [2, done => {
            secondMigrationStarted = true;
            done();
        }]
    ]);

    harness.api.runSheetMigrations(0, 2, migrations);

    assert.deepEqual(harness.writes, [], 'a failed migration must not update the schema version');
    assert.equal(secondMigrationStarted, false, 'later migrations must not run after a failure');
    assert.match(harness.errors[0], /schema version 1 failed: Error: migration failed/);
}

{
    const harness = createHarness();
    assert.equal(harness.api.parseSheetSchemaVersion('2'), 2);
    assert.equal(harness.api.parseSheetSchemaVersion('0.1'), 0);
    assert.equal(harness.api.parseSheetSchemaVersion('-1'), 0);
    assert.equal(harness.api.parseSheetSchemaVersion('invalid'), 0);
}

{
    const harness = createHarness({
        attrs: {
            sheet_schema_version: '0',
            code_version: '0',
            repeating_spells_rowA_spellname11: 'Magic Missile',
            repeating_spells_rowA_spellprep11: '2'
        },
        legacyRowIds: ['rowA'],
        missingAttrValue: ''
    });

    harness.openSheet();

    assert.equal(harness.attrs.repeating_spells11_rowA_spellname11, 'Magic Missile');
    assert.equal(harness.attrs.repeating_spells11_rowA_spellprep11, '2');
    assert.equal(harness.attrs.sheet_schema_version, 1);
    assert.equal(harness.attrs.code_version, 0.1);
    assert.equal(harness.writes.length, 2);
    assert.equal(harness.writes[0].sheet_schema_version, undefined, 'data must be written before the schema version');
    assert.equal(harness.writes[1].sheet_schema_version, 1);
}

{
    const harness = createHarness({
        attrs: {
            sheet_schema_version: '0',
            code_version: '0.1',
            repeating_spells_rowA_spellname11: 'Already migrated'
        },
        legacyRowIds: ['rowA']
    });

    harness.openSheet();

    assert.equal(harness.attrs.sheet_schema_version, 1);
    assert.equal(harness.attrs.repeating_spells11_rowA_spellname11, undefined);
    assert.deepEqual(harness.writes, [{sheet_schema_version: 1}]);
}

{
    const harness = createHarness({
        attrs: {
            sheet_schema_version: '0',
            code_version: '0'
        }
    });

    harness.openSheet();

    assert.equal(harness.attrs.sheet_schema_version, 1);
    assert.equal(harness.attrs.code_version, 0.1);
    assert.deepEqual(harness.writes, [{sheet_schema_version: 1, code_version: 0.1}]);
}

{
    const harness = createHarness({
        attrs: {
            sheet_schema_version: '0',
            code_version: '0',
            repeating_spells_rowA_spellname11: 'Old name',
            repeating_spells_rowA_spellprep11: '3',
            repeating_spells11_rowa_spellname11: 'Customized name'
        },
        legacyRowIds: ['rowA'],
        targetRowIds: ['rowa']
    });

    harness.openSheet();

    assert.equal(harness.attrs.repeating_spells11_rowa_spellname11, 'Customized name');
    assert.equal(harness.attrs.repeating_spells11_rowa_spellprep11, undefined);
    const migratedKeys = Object.keys(harness.attrs).filter(name => name.startsWith('repeating_spells11_'));
    assert.deepEqual(migratedKeys, [
        'repeating_spells11_rowa_spellname11'
    ]);

    harness.attrs.sheet_schema_version = '0';
    harness.attrs.code_version = '0';
    harness.openSheet();

    assert.equal(harness.attrs.repeating_spells11_rowa_spellname11, 'Customized name');
    assert.equal(harness.attrs.repeating_spells11_rowa_spellprep11, undefined);
    assert.deepEqual(
        Object.keys(harness.attrs).filter(name => name.startsWith('repeating_spells11_')),
        migratedKeys,
        'rerunning the migration must not create duplicate rows'
    );
}

{
    const harness = createHarness({
        attrs: {
            sheet_schema_version: '1',
            code_version: '0.1'
        }
    });

    harness.openSheet();

    assert.deepEqual(harness.writes, [], 'an up-to-date sheet must not be migrated again');
}

{
    const harness = createHarness({
        attrs: {
            sheet_schema_version: '2',
            code_version: '0.1'
        }
    });

    harness.openSheet();

    assert.deepEqual(harness.writes, [], 'a newer schema version must never be downgraded');
}

console.log('D&D 3.5 migration tests passed.');
