// Minimal local mock of Roll20's sheet worker API (on/getAttrs/setAttrs/getSectionIDs/...)
// so the sheet worker scripts in views/script/*.js can be loaded and exercised outside
// of Roll20, e.g. from `node --test`.
//
// This is NOT a full Roll20 emulation: getAttrs/setAttrs are synchronous, setAttrs does
// not automatically re-trigger other "change:" handlers (call sheet.trigger(...) yourself
// to chain reactions the same way a real edit would), and repeating sections are modeled
// as a flat id list per section rather than real row objects. That's enough to unit-test
// individual sheet worker handlers in isolation.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHEET_ROOT = path.resolve(__dirname, '..');
const SCRIPT_DIR = path.join(SHEET_ROOT, 'views', 'script');

// Load order matters: helper.js defines pInt/repeatingSum/getAttributes that the later
// files call at the top level of their handlers. This mirrors the concatenation order
// used to produce sheet-compiled.html.
const DEFAULT_FILES = [
    'helper.js',
    'bonusmodifier.js',
    'sheetworker.js',
    'versionUpdater.js',
    'jsonImport.js',
];

let cachedTranslations = null;
function loadTranslations() {
    if (!cachedTranslations) {
        const p = path.join(SHEET_ROOT, 'translation.json');
        cachedTranslations = JSON.parse(fs.readFileSync(p, 'utf8'));
    }
    return cachedTranslations;
}

/**
 * Create a fresh, isolated sheet instance with its own attribute state and event
 * listeners. Each call re-runs the sheet worker source, so tests don't leak state
 * into one another.
 */
export function createSheet({ files = DEFAULT_FILES } = {}) {
    const state = {};
    const rows = {}; // section name (without "repeating_") -> array of row ids
    const listeners = new Map(); // event token -> handler[]
    const setAttrsCalls = [];
    const translations = loadTranslations();

    function on(eventString, handler) {
        eventString
            .split(' ')
            .map((s) => s.trim())
            .filter(Boolean)
            .forEach((evt) => {
                if (!listeners.has(evt)) listeners.set(evt, []);
                listeners.get(evt).push(handler);
            });
    }

    function getAttrs(names, callback) {
        const result = {};
        names.forEach((name) => {
            result[name] = Object.prototype.hasOwnProperty.call(state, name) ? state[name] : '';
        });
        callback(result);
    }

    function setAttrs(attrs, optionsOrCallback, maybeCallback) {
        setAttrsCalls.push(attrs);
        Object.assign(state, attrs);
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : maybeCallback;
        if (typeof callback === 'function') callback();
    }

    function getSectionIDs(section, callback) {
        const key = section.startsWith('repeating_') ? section.slice('repeating_'.length) : section;
        callback(rows[key] ? [...rows[key]] : []);
    }

    let rowCounter = 0;
    function generateRowID() {
        rowCounter += 1;
        return `mockrow${rowCounter}`;
    }

    function getTranslationByKey(key) {
        return translations[key] ?? key;
    }

    function log(...args) {
        // swallow by default; flip on for debugging a specific test
        if (process.env.SHEET_DEBUG) console.log('[sheet log]', ...args);
    }

    const sandbox = {
        on,
        getAttrs,
        setAttrs,
        getSectionIDs,
        generateRowID,
        getTranslationByKey,
        log,
        console,
        parseInt,
        parseFloat,
        Math,
        JSON,
        Object,
        Array,
        String,
        Number,
    };
    vm.createContext(sandbox);

    for (const file of files) {
        const code = fs.readFileSync(path.join(SCRIPT_DIR, file), 'utf8');
        vm.runInContext(code, sandbox, { filename: file });
    }

    return {
        /** Merge values directly into the attribute state (bypasses setAttrs bookkeeping). */
        setState(values) {
            Object.assign(state, values);
        },
        /** Read a single attribute's current value. */
        get(name) {
            return state[name];
        },
        /** Snapshot of the full attribute state. */
        getState() {
            return { ...state };
        },
        /** Define the row ids for a repeating section, e.g. setRows('kf', ['r1','r2']). */
        setRows(section, ids) {
            rows[section] = ids;
        },
        /** Fire all handlers registered for an exact event token, e.g. "change:foo". */
        trigger(eventToken, eventInfo = {}) {
            const handlers = listeners.get(eventToken) || [];
            if (handlers.length === 0) {
                throw new Error(`No handler registered for "${eventToken}"`);
            }
            handlers.forEach((h) => h(eventInfo));
        },
        /** All setAttrs payloads recorded so far, in call order. */
        setAttrsCalls,
        /** Raw list of event tokens that have at least one handler. */
        registeredEvents() {
            return [...listeners.keys()];
        },
    };
}
