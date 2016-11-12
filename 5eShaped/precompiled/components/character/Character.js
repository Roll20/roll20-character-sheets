/* global on:false */

import { ABILITIES } from './../../scripts/constants';
import { Spells } from './../spells/Spells';
const spells = new Spells();
import { getSetItems, getSetRepeatingItems, isUndefinedOrEmpty, getIntValue, exists, capitalize, getRepeatingInfo, ordinalSpellLevel, updateHD } from './../../scripts/utilities';

export class Character {
  updateJackOfAllTrades() {
    getSetItems('character.updateJackOfAllTrades', {
      collectionArray: ['pb', 'jack_of_all_trades'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);
      },
    });
  }
  updateRemarkableAthlete() {
    getSetItems('character.updateRemarkableAthlete', {
      collectionArray: ['pb', 'remarkable_athlete'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.remarkable_athlete = Math.ceil(getIntValue(v.pb) / 2);
      },
    });
  }
  updateD20Mod() {
    getSetItems('character.updateD20Mod', {
      collectionArray: ['halfling_luck'],
      callback: (v, finalSetAttrs) => {
        if (v.halfling_luck === 'on') {
          finalSetAttrs.d20_mod = 'ro<1';
        } else {
          finalSetAttrs.d20_mod = '';
        }
      },
    });
  }
  updateAlignment() {
    getSetItems('character.updateAlignment', {
      collectionArray: ['alignment', 'is_npc'],
      callback: (v, finalSetAttrs) => {
        if (v.alignment && getIntValue(v.is_npc) === 1) {
          finalSetAttrs.alignment = v.alignment.toLowerCase();
        }
      },
    });
  }
  setup() {
    on('change:halfling_luck', () => {
      this.updateD20Mod();
    });
    on('change:alignment', () => {
      this.updateAlignment();
    });
    on('change:pb change:remarkable_athlete_toggle', () => {
      this.updateRemarkableAthlete();
    });
    on('change:pb change:jack_of_all_trades_toggle', () => {
      this.updateJackOfAllTrades();
    });
    this.watchForClassLevelChanges();
  }
}
