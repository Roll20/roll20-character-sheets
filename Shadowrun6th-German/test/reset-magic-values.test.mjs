import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSheet } from '../test-harness/mockSheet.mjs';

// clicked:reset_magic_values should link each magical skill's base attribute back to
// its rulebook default: astral -> intuition, everything else (conjuring/sorcery/
// enchanting) -> magic. Two stacked bugs made this a no-op:
//   1) it wrote magic_<skill>_attribute, a dead attribute name that no view template
//      renders or reads (confirmed: the only other reference is versionUpdater.js's
//      one-time legacy migration, which copies it INTO the real field,
//      skill_<skill>_attribute - the one skill.ejs actually renders).
//   2) `if(skill = "astral")` is an assignment, not a comparison, so it's always
//      truthy and the else branch (which should wire the other three to
//      display_magic) was unreachable dead code.
test('reset_magic_values links conjuring/sorcery/enchanting to display_magic', () => {
    const sheet = createSheet();

    sheet.trigger('clicked:reset_magic_values');

    assert.equal(sheet.get('skill_astral_attribute'), 'display_intuition');
    assert.equal(
        sheet.get('skill_conjuring_attribute'),
        'display_magic',
        'conjuring should be linked to display_magic, not display_intuition',
    );
    assert.equal(
        sheet.get('skill_sorcery_attribute'),
        'display_magic',
        'sorcery should be linked to display_magic, not display_intuition',
    );
    assert.equal(
        sheet.get('skill_enchanting_attribute'),
        'display_magic',
        'enchanting should be linked to display_magic, not display_intuition',
    );
});
