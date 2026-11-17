// Run with: node --test tests/test_inventory.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'BDnDSheet.html'), 'utf8');
const worker = html.match(/<script type="text\/worker">([\s\S]*?)<\/script>/)[1];
const accessor = worker.match(/addProp = function\(obj,prop,value,fullname\)\{[\s\S]*?(?=,\s*repeating = function)/)[0];
const handlers = worker.slice(worker.indexOf('/* ---- END: TheAaronSheet.js ---- */'));

function inventory(page, items) {
    const attributes = { [`inventorycur${page}`]: '0' };
    const events = {};
    const context = {
        // Only the Underscore operations used by the original TAS accessors.
        _: {
            contains: (values, value) => values.includes(value),
            each: (values, callback) => values.forEach(callback),
            has: (object, key) => Object.hasOwn(object, key),
            reduce: (values, callback, initial) => values.reduce(callback, initial),
            range: (length) => Array.from({ length }, (_, index) => index),
        },
        prepareUpdate: (name, value) => { attributes[name] = String(value); },
        on: (names, callback) => {
            if (!names.split(' ').includes(`change:repeating_inventtab${page}`)) return;
            for (const name of names.split(' ')) events[name] = callback;
        },
    };
    vm.createContext(context);
    // Use the sheet's actual numeric/string accessors, including their rounding.
    vm.runInContext(accessor, context);
    let writes = 0;
    context.prepareUpdate = (name, value) => {
        attributes[name] = String(value);
        writes += 1;
    };
    context.TAS = {
        repeating(section) {
            assert.equal(section, `inventtab${page}`);
            let attrNames, fieldNames, reduce, initial, final;
            return {
                attrs(...names) { attrNames = names; return this; },
                fields(...names) { fieldNames = names; return this; },
                reduce(fn, memo, done) { reduce = fn; initial = memo; final = done; return this; },
                execute() {
                    const totals = {};
                    for (const name of attrNames) context.addProp(totals, name, attributes[name]);
                    let memo = initial;
                    items.forEach((item, index) => {
                        const row = {};
                        const values = {
                            [`itemquantity${page}`]: String(item.quantity),
                            [`itemenc${page}`]: String(item.weight),
                            [`itemtot${page}`]: attributes[`row${index}_total`] || '0',
                        };
                        for (const name of fieldNames) {
                            context.addProp(row, name, values[name], `row${index}_${name.startsWith('itemtot') ? 'total' : name}`);
                        }
                        memo = reduce(memo, row);
                    });
                    final(memo, {}, totals);
                },
            };
        },
    };
    vm.runInContext(handlers, context);
    return {
        attributes,
        run(event) { events[event](); },
        writes: () => writes,
    };
}

for (let page = 1; page <= 7; page += 1) {
    test(`inventory ${page}: preserves fractional row and container weights`, () => {
        const fixture = inventory(page, [{ quantity: 3, weight: 0.5 }, { quantity: 2, weight: 0.125 }]);
        fixture.run(`change:repeating_inventtab${page}`);
        assert.equal(fixture.attributes.row0_total, '1.5');
        assert.equal(fixture.attributes.row1_total, '0.25');
        assert.equal(fixture.attributes[`inventorycur${page}`], '1.75');
        const writes = fixture.writes();
        fixture.run(`change:repeating_inventtab${page}`);
        assert.equal(fixture.writes(), writes, 'unchanged totals must not trigger more updates');
    });

    test(`inventory ${page}: recalculates existing rows on opening`, () => {
        const fixture = inventory(page, [{ quantity: 1, weight: 0.001 }]);
        fixture.run('sheet:opened');
        assert.equal(fixture.attributes[`inventorycur${page}`], '0.001');
    });

    test(`inventory ${page}: resets total when the last row is removed`, () => {
        const fixture = inventory(page, []);
        fixture.attributes[`inventorycur${page}`] = '1.75';
        fixture.run(`remove:repeating_inventtab${page}`);
        assert.equal(fixture.attributes[`inventorycur${page}`], '0');
    });
}
