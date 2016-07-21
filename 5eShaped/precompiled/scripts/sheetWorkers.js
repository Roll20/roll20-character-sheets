/* global setAttrs:false, getAttrs:false, on:false, getSectionIDs:false, generateRowID:false, getTranslationByKey:false */

import { abilities } from './abilities';
import { abilityChecks } from './abilityChecks';
import { actions } from './actions';
import { attachers } from './attachers';
import { attacks } from './attacks';
import { character } from './character';
import { equipment } from './equipment';
import { importData } from './importData';
import { initialize } from './initialize';
import { npc } from './npc';
import { proficiencyBonus } from './proficiencyBonus';
import { resistances } from './resistances';
import { savingThrows } from './savingThrows';
import { settings } from './settings';
import { spells } from './spells';

abilities.setup();
abilityChecks.setup();
actions.setup();
attachers.setup();
attacks.setup();
character.setup();
equipment.setup();
importData.setup();
initialize.setup();
npc.setup();
proficiencyBonus.setup();
resistances.setup();
savingThrows.setup();
settings.setup();
spells.setup();
