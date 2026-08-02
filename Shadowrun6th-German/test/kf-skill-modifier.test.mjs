import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSheet } from '../test-harness/mockSheet.mjs';

// repeating_kf ("Komplexe Formen") rolls combine an attribute (kf_at1) with a skill
// (kf_at2, one of skill_electronics/skill_cracking/skill_piloting). The skill side
// should include base + modifier + statusmodifier, same as the skill's own total
// shown elsewhere on the sheet (see e.g. matrix_actions.ejs mh_as_pool, which adds
// @{skill_electronics_modifier} explicitly).
test('repeating_kf total includes the skill modifier field', () => {
    const sheet = createSheet();

    sheet.setState({
        repeating_kf_kf_at1: 'display_resonance',
        repeating_kf_kf_at2: 'skill_electronics',
        repeating_kf_kf_mod: '0',
        display_resonance: '6',
        skill_electronics_base: '3',
        skill_electronics_modifier: '2',
        skill_electronics_statusmodifier: '0',
    });

    sheet.trigger('change:repeating_kf:kf_at2');

    const expected = 6 /* RES */ + 3 /* base */ + 2 /* modifier */ + 0 /* statusmodifier */ + 0 /* kf_mod */;
    assert.equal(
        sheet.get('repeating_kf_kf_total'),
        expected,
        'kf_total should add skill_electronics_modifier, but the handler looks up ' +
            'skill_electronics_mod (a nonexistent attribute) instead of skill_electronics_modifier',
    );
});
