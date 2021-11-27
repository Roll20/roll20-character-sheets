/*
=========================================================
Name            :	libInline
GitHub          :	https://github.com/TimRohr22/Cauldron/tree/master/libInline
Roll20 Contact  :	timmaugh & The Aaron
Version         :	1.0.3
Last Update     :	5/10/2021
=========================================================
*/
var API_Meta = API_Meta || {};
API_Meta.libInline = { offset: Number.MAX_SAFE_INTEGER, lineCount: -1 };
{
    try { throw new Error(''); } catch (e) { API_Meta.libInline.offset = (parseInt(e.stack.split(/\n/)[1].replace(/^.*:(\d+):.*$/, '$1'), 10) - (13)); }
}

const libInline = (() => {
    // ==================================================
    //		VERSION
    // ==================================================
    const apiproject = 'libInline';
    API_Meta[apiproject].version = '1.0.3';
    const vd = new Date(1620699540738);
    const versionInfo = () => {
        log(`\u0166\u0166 ${apiproject} v${API_Meta[apiproject].version}, ${vd.getFullYear()}/${vd.getMonth() + 1}/${vd.getDate()} \u0166\u0166 -- offset ${API_Meta[apiproject].offset}`);
        return;
    };
    const logsig = () => {
        // initialize shared namespace for all signed projects, if needed
        state.torii = state.torii || {};
        // initialize siglogged check, if needed
        state.torii.siglogged = state.torii.siglogged || false;
        state.torii.sigtime = state.torii.sigtime || Date.now() - 3001;
        if (!state.torii.siglogged || Date.now() - state.torii.sigtime > 3000) {
            const logsig = '\n' +
                '  _____________________________________________   ' + '\n' +
                '   )_________________________________________(    ' + '\n' +
                '     )_____________________________________(      ' + '\n' +
                '           ___| |_______________| |___            ' + '\n' +
                '          |___   _______________   ___|           ' + '\n' +
                '              | |               | |               ' + '\n' +
                '              | |               | |               ' + '\n' +
                '              | |               | |               ' + '\n' +
                '              | |               | |               ' + '\n' +
                '              | |               | |               ' + '\n' +
                '______________|_|_______________|_|_______________' + '\n' +
                '                                                  ' + '\n';
            log(`${logsig}`);
            state.torii.siglogged = true;
            state.torii.sigtime = Date.now();
        }
        return;
    };
    // ==================================================
    //		MESSAGING / CHAT REPORTING
    // ==================================================
    const HE = (() => {
        const esRE = (s) => s.replace(/(\\|\/|\[|\]|\(|\)|\{|\}|\?|\+|\*|\||\.|\^|\$)/g, '\\$1');
        const e = (s) => `&${s};`;
        const entities = {
            '<': e('lt'),
            '>': e('gt'),
            "'": e('#39'),
            '@': e('#64'),
            '{': e('#123'),
            '|': e('#124'),
            '}': e('#125'),
            '[': e('#91'),
            ']': e('#93'),
            '"': e('quot'),
            '*': e('#42')
        };
        const re = new RegExp(`(${Object.keys(entities).map(esRE).join('|')})`, 'g');
        return (s) => s.replace(re, (c) => (entities[c] || c));
    })();

    // ==================================================
    //		PARSING OPERATIONS
    // ==================================================

    const conditionalPluck = (array, key, cobj = {}) => {
        // test array of objects to return a given property of each object if all conditions are met
        // cobj properties are functions testing that property (k) in the evaluated object (o)
        // to test if testedproperty equals a given value: { testedProperty: (k,o) => { return o[k] === 'given value'; } }
        // to test if testedproperty exists:               { testedProperty: (k,o) => { return o.hasOwnProperty(k); } }
        return array.map(o => {
            let b = true;
            if (cobj) {
                Object.keys(cobj).forEach(k => {
                    if (b && !cobj[k](k, o)) {
                        b = false;
                    }
                });
            }
            if (b) return o[key];
        }).filter(e => e);
    };
    const ops = {
        '==': (v, p) => v === p,
        '>=': (v, p) => v >= p,
        '<=': (v, p) => v <= p
    };

    const getQuantum = (roll) => {
        return (roll.dice.length || roll.total) ? true : false;
    };
    const fatedie = {
        [-2]: '=',
        [-1]: '-',
        [0]: '0',
        [1]: '+'
    };
    const typeLib = {
        all: {},
        included: { type: (k, o) => { return o[k] !== 'drop'; } },
        success: { type: (k, o) => { return o[k] === 'success'; } },
        crit: { type: (k, o) => { return o[k] === 'success'; } },
        fail: { type: (k, o) => { return o[k] === 'fail'; } },
        fumble: { type: (k, o) => { return o[k] === 'fail'; } },
        allcrit: { type: (k, o) => { return ['fail', 'success'].includes(o[k]); } },
        dropped: { type: (k, o) => { return o[k] === 'drop'; } }
    };

    const collectRollData = (r) => {
        const rollspancss1 = `<span class="basicdiceroll`;
        const rollspanend = `</span>`;
        const cssClassLib = {
            dropped: 'drop',
            critfail: 'fail',
            critsuccess: 'success',
            'critsuccess critfail': 'fail'
        };
        let matchFormatObj = {};
        let rollData = {
            parsed: '',
            tableReturns: [],
            display: '',
            dice: [],
        };
        let gRoll,
            cssclass = '',
            type = '';
        switch (r.type) {
            case 'R': // ROLL
                if (r.table) { // table roll
                    rollData.parsed = '(' + r.results.map(nr => nr.tableItem ? nr.tableItem.name : nr.v).join('+') + ')';
                    rollData.display = rollData.parsed;
                    rollData.tableReturns.push({ table: r.table, returns: r.results.map(nr => nr.tableItem ? nr.tableItem.name : nr.v) });
                } else { // standard roll (might include fate or matched dice)
                    // fate dice should be joined on empty string (no operator); normal rolls on +
                    rollData.parsed = !r.results ? '{}' : '(' + r.results.map(nr => r.fate ? fatedie[nr.v] : nr.v).join(r.fate ? '' : '+') + ')';
                    rollData.dice = !r.results ? [] : r.results.map(nr => {
                        cssclass = '';
                        if (nr.d) cssclass = 'dropped'; //dropped die
                        if (!cssclass) {
                            if (r.mods && r.mods.hasOwnProperty('customCrit')) {
                                if (r.mods.customCrit.reduce((m, o) => ops[o.comp](nr.v, o.point) || m, false)) cssclass = 'critsuccess';
                            } else if (!r.fate && nr.v === r.sides) { // standard success
                                cssclass = 'critsuccess';
                            } // fate has no default success threshold
                            if (r.mods && r.mods.hasOwnProperty('customFumble')) {
                                if (r.mods.customFumble.reduce((m, o) => ops[o.comp](nr.v, o.point) || m, false)) cssclass = cssclass ? cssclass + ' ': 'critfail';
                            } else if (!r.fate && nr.v === 1) { // standard fail
                                cssclass = cssclass ? cssclass + ' critfail' : 'critfail';
                            } // fate has no default fail threshold
                        }

                        type = cssClassLib[cssclass] || '';

                        // match (and drop) dice formatting
                        matchFormatObj = { drop: ` style="color: #888;"` }; // initialize with dropped-die coloration
                        if (r.mods && r.mods.match && r.mods.match.matches) {
                            matchFormatObj = { drop: ` style="color: #888;"` }; // initialize with dropped-die coloration
                            if (Array.isArray(r.mods.match.matches)) {
                                r.mods.match.matches.forEach((m, i) => {
                                    if (m) matchFormatObj[i] = ` style="color: ${m}"`;
                                });
                            } else {
                                Object.keys(r.mods.match.matches).forEach(k => matchFormatObj[k] = ` style="color: ${r.mods.match.matches[k]}"`);
                            }
                        }
                        return { v: nr.v, type: type, display: `${rollspancss1}${cssclass ? ' ' : ''}${cssclass}${/^crit/g.test(cssclass) ? ' ' : ''}"${matchFormatObj[type] || matchFormatObj[nr.v] || ''}>${r.fate ? fatedie[nr.v] : nr.v}${rollspanend}` };
                    });
                    // fate dice should be joined on empty string (no operator); normal rolls on +
                    rollData.display = '(' + conditionalPluck(rollData.dice, 'display').join(r.fate ? '' : '+') + ')';
                }
                break;
            case 'G': // ROLL
                gRoll = r.rolls.map(nr => {
                    return nr.map(collectRollData);
                });
                rollData.parsed = '{' + gRoll.map(nr => nr.map(nr2 => nr2.parsed).join('')).join(',') + '}';
                rollData.dice = [].concat(...gRoll.map(nr => [].concat(...nr.map(nr2 => nr2.dice))));
                rollData.tableReturns = [].concat(...gRoll.map(nr => [].concat(...nr.map(nr2 => nr2.tableReturns))));
                rollData.display = '{' + gRoll.map(nr => nr.map(nr2 => nr2.display).join('')).join(',') + '}';
                break;
            case 'M': // MODIFIER
                rollData.parsed = r.expr;
                rollData.display = r.expr;
                break;
            case 'L': // LABEL

                break;
            case 'C': // CATCH

                break;
            default: // UNKNOWN

                break;
        }
        return rollData;
    };

    const parseInlineRolls = (inlinerolls) => {
        let labelrx = /(?:\s*(\+|-|\\|\*)\s*)?(?<value>[^\]{}]+)(?<!\d+t)\[(?<key>.*?)]/g;
        const baseInlineCSS = `style="-webkit-tap-highlight-color: rgba(0,0,0,0);font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;color: #404040;line-height: 1.25em;` +
            `box-sizing: content-box; background-color: #FEF68E; padding: 0 3px 0 3px; font-weight: bold; cursor: help; font-size: 1.1em;border: 2px solid `;
        const bordercolors = {
            0: '#FEF68E;',
            1: '#B31515;',
            2: '#3FB315;',
            3: '#4A57ED;'
        };
        return inlinerolls.map(r => {
            let roll = {
                expression: HE(r.expression.replace(/</g,'&#xFF1C;')),
                parsed: '',
                resultType: r.results.resultType,
                total: r.results.total,
                value: r.results.total, // changed later, if necessary
                labels: [],
                tableReturns: [],
                display: '',
                dice: [],
            };
            // LABELS
            let m;
            labelrx.lastIndex = 0;
            while ((m = labelrx.exec(r.expression)) !== null) {
                if (m.index === labelrx.lastIndex) {
                    labelrx.lastIndex++;
                }
                roll.labels.push({ label: m.groups.key, value: m.groups.value });
            };
            let rollData = r.results.rolls.map(collectRollData);
            // PARSED
            roll.parsed = conditionalPluck(rollData, 'parsed').join('');
            // TABLE RETURNS
            roll.tableReturns = [].concat(...conditionalPluck(rollData, 'tableReturns'));
            // ALL DICE
            roll.dice = [].concat(...conditionalPluck(rollData, 'dice'));
            // CHAT VALUE
            roll.value = getQuantum(roll) || !roll.tableReturns.length ? roll.total : roll.tableReturns[0].returns[0];
            // DISPLAY
            roll.display = conditionalPluck(rollData, 'display').join('');

            // LATE EVAL METHODS
            roll.getDice = (type) => { return conditionalPluck(roll.dice, 'v', (typeLib[type] || typeLib.included)) };
            roll.getTableValues = () => {
                return roll.tableReturns.reduce((m, r) => {
                    m.push(...r.returns);
                    return m;
                }, []);
            };
            roll.getRollTip = () => {
                let parts = [];
                parts.push(`<span class="inlinerollresult showtip tipsy-n-right" ${baseInlineCSS}`);
                parts.push(`${bordercolors[(/basicdiceroll(?:\scritsuccess)?\scritfail/.test(roll.display) ? 1 : 0) + (/basicdiceroll\scritsuccess/.test(roll.display) ? 2 : 0)]}" `);
                parts.push(`title="${HE(HE(`Rolling ${roll.expression} = ${roll.display}`))}">${roll.value}</span>`);
                return parts.join('');
            };
            return roll;
        });
    };
    const getRollFromInline = (ira) => {
        if (Array.isArray(ira) && ira.length) {
            return parseInlineRolls([ira[0]])[0];
        } else if (typeof ira === 'object') {
            return parseInlineRolls([ira])[0];
        } else return;
    };

    // ==================================================
    //		EXPOSED INTERFACE FUNCTIONS
    // ==================================================
    const getRollData = (ira) => {
        let pir;
        if (typeof ira === 'object' && ira.hasOwnProperty('inlinerolls')) {
            pir = parseInlineRolls(ira.inlinerolls);
        } else if (Array.isArray(ira) && ira.length) {
            pir = parseInlineRolls(ira);
        }
        return pir;
    };
    const getDice = (inlinerolls, type = 'included') => {
        return conditionalPluck((getRollFromInline(inlinerolls) || { dice: [] }).dice, 'v', (typeLib[type] || typeLib.included));
    };
    const getValue = (inlinerolls) => {
        return (getRollFromInline(inlinerolls) || { value: '' }).value;
    };
    const getTables = (inlinerolls, reduce = true) => {
        if (reduce) {
            return (getRollFromInline(inlinerolls) || { getTableValues: () => { return ''; } }).getTableValues();
        } else {
            return (getRollFromInline(inlinerolls) || { tableReturns: [] }).tableReturns;
        }
    };
    const getParsed = (inlinerolls) => {
        return (getRollFromInline(inlinerolls) || { parsed: '' }).parsed;
    };
    const getRollTip = (inlinerolls) => {
        return (getRollFromInline(inlinerolls) || { display: '' }).getRollTip();
    };

    // ==================================================
    //		ON READY
    // ==================================================
    on('ready', () => {
        versionInfo();
        logsig();
    });

    return {
        getRollData: getRollData,
        getDice: getDice,
        getValue: getValue,
        getTables: getTables,
        getParsed: getParsed,
        getRollTip: getRollTip
    };

})();
{ try { throw new Error(''); } catch (e) { API_Meta.libInline.lineCount = (parseInt(e.stack.split(/\n/)[1].replace(/^.*:(\d+):.*$/, '$1'), 10) - API_Meta.libInline.offset); } }
