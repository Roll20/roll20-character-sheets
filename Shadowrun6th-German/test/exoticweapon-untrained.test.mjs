import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSheet } from '../test-harness/mockSheet.mjs';

// updateSkill's "cannot be used untrained" skill list checked skill == "exoticweapons",
// but the skills array only ever contains "exoticweapon1"/"exoticweapon2" (the plural
// name is a leftover from before that skill was split into two - a stale
// /*,"exoticweapons"*/ comment used to sit right next to the skills array as evidence).
// That typo meant Exotic Weapon skills fell through to the "can be defaulted" branch
// and got a nonzero (attribute - 1) pool at base 0, instead of being blocked like the
// other skills in that list (astral/biotech/conjuring/sorcery/task/enchanting).
test('exotic weapon skill total is 0 when untrained, not attribute - 1', () => {
    const sheet = createSheet();
    sheet.setState({
        skill_exoticweapon1_attribute: 'display_agility',
        display_agility: '5',
        skill_exoticweapon1_base: '0',
    });

    sheet.trigger('change:skill_exoticweapon1_base');

    assert.equal(
        sheet.get('skill_exoticweapon1_total'),
        0,
        'exotic weapon cannot be used untrained, so total should be forced to 0, not agility - 1',
    );
});
