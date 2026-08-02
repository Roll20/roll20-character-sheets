import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSheet } from '../test-harness/mockSheet.mjs';

// The sheet:opened migration normalizes old free-text sorcery specialization/expertise
// values into fixed keys. "Antimagie" is the German term for counterspelling and
// "Rituale" is the German term for rituals (see translation.json), but the "anti"/"ritu"
// prefix checks in versionUpdater.js write the opposite key of what they detected.
test('sheet:opened migration maps German sorcery specializations to the right key', () => {
    const sheet = createSheet();
    sheet.setState({
        skill_sorcery_spec: 'Antimagie',
        skill_sorcery_exp: 'Rituale',
    });

    sheet.trigger('sheet:opened');

    assert.equal(
        sheet.get('skill_sorcery_spec'),
        'counterspelling',
        '"Antimagie" (counterspelling) got mapped to "rituals" instead',
    );
    assert.equal(
        sheet.get('skill_sorcery_exp'),
        'rituals',
        '"Rituale" (rituals) got mapped to "counterspelling" instead',
    );
});
