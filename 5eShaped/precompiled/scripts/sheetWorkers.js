/* global setAttrs:false, getAttrs:false, on:false, getSectionIDs:false, generateRowID:false, getTranslationByKey:false */

import { abilitiesSetup } from './abilities';
import { abilityChecksSetup } from './abilityChecks';
import { actionsSetup } from './actions';
import { attachersSetup } from './attachers';
import { attacksSetup } from './attacks';
import { characterSetup } from './character';
import { equipmentSetup } from './equipment';
import { importSetup } from './import';
import { initializeSetup } from './initialize';
import { initiativeSetup } from './initiative';
import { npcSetup } from './npc';
import { proficiencyBonusSetup } from './proficiencyBonus';
import { resistancesSetup, } from './resistances';
import { savingThrowsSetup } from './savingThrows';
import { settingsSetup } from './settings';
import { spellsSetup } from './spells';

abilitiesSetup();
abilityChecksSetup();
actionsSetup();
attachersSetup();
attacksSetup();
characterSetup();
equipmentSetup();
importSetup();
initializeSetup();
initiativeSetup();
npcSetup();
proficiencyBonusSetup();
resistancesSetup();
savingThrowsSetup();
settingsSetup();
spellsSetup();
