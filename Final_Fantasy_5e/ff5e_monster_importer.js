var FF5EMonsterImporter = FF5EMonsterImporter || (function() {
  'use strict';

  var VERSION = '1.6.0';

  /* =========================
     COMMANDS

     !ff5e-monster-list
     !ff5e-monster-show guard_scorpion
     !ff5e-import-monster @{selected|token_id} guard_scorpion
     !ff5e-import-json @{selected|token_id}
  ========================= */

  var MONSTER_DB = {
    guard_scorpion: {
      name: 'Guard Scorpion',
      type: 'Machina',
      level: 5,
      scale: 'armor',
      hp: 180,
      mp: 20,
      limit: 0,
      limit_max: 100,
      ac: 16,
      initiative: 2,
      speed: '30 ft.',
      senses: 'darkvision 60 ft.',
      saves: 'STR +6, CON +5',
      skills: 'Perception +4',
      resistances: 'Lightning Resist unless tail is raised',
      immunities: 'Poison',
      condition_immunities: 'Poisoned, Exhaustion',
      phase_2_trigger: '50% HP',
      phase_3_trigger: '25% HP',
      enrage_trigger: 'Tail raised or 10% HP',
      ai_state: 'Normal',
      boss_notes: 'Classic opener boss. When tail is raised, punish attackers with Tail Laser.',

      quick_rolls: {
        str: 6,
        dex: 2,
        con: 5,
        int: 1,
        wis: 2,
        cha: 0
      },

      affinities: {
        fire: 'Normal',
        ice: 'Normal',
        lightning: 'Weak',
        water: 'Normal',
        wind: 'Normal',
        earth: 'Resist',
        holy: 'Normal',
        dark: 'Normal',
        poison: 'Null'
      },

      actions: [
        {
          name: 'Claw Swipe',
          category: 'Action',
          type: 'Melee Weapon Attack',
          recharge: '',
          mp_cost: 0,
          attack: '1d20+6',
          damage: '2d8+4',
          damage_type: 'Slashing',
          element: 'None',
          range: 'Melee 10 ft.',
          save: '',
          scale: 'armor',
          status: '',
          status_rounds: 0,
          desc: 'A heavy mechanical claw strike.'
        },
        {
          name: 'Search Scope',
          category: 'Action',
          type: 'Targeting',
          recharge: '5-6',
          mp_cost: 0,
          attack: '1d20+4',
          damage: '0',
          damage_type: 'None',
          element: 'None',
          range: '60 ft.',
          save: 'WIS DC 14',
          scale: 'armor',
          status: 'Marked',
          status_rounds: 2,
          desc: 'Marks one target. The next attack against that target has advantage.'
        },
        {
          name: 'Tail Laser',
          category: 'Reaction',
          type: 'Counter',
          recharge: '5-6',
          mp_cost: 0,
          attack: '0',
          damage: '4d8',
          damage_type: 'Lightning',
          element: 'Lightning',
          range: '60 ft. line',
          save: 'DEX DC 15 half',
          scale: 'armor',
          status: '',
          status_rounds: 0,
          desc: 'Triggered when attacked while tail is raised. All creatures in a line take lightning damage.'
        }
      ],

      legendary: [
        {
          name: 'Tail Raise',
          cost: 1,
          roll: '0',
          element: 'None',
          range: 'Self',
          save: '',
          desc: 'Raises tail and enters counter stance until the start of its next turn.'
        }
      ],

      ai: [
        {
          round: 1,
          phase: '1',
          action: 'Claw Swipe',
          notes: 'Open with a direct melee attack.'
        },
        {
          round: 2,
          phase: '1',
          action: 'Search Scope',
          notes: 'Mark the highest-damage target.'
        },
        {
          round: 3,
          phase: '2+',
          action: 'Tail Raise',
          notes: 'Enter counter stance if pressured.'
        }
      ]
    },

    bomb: {
      name: 'Bomb',
      type: 'Fiend',
      level: 3,
      scale: 'personal',
      hp: 45,
      mp: 10,
      limit: 0,
      limit_max: 100,
      ac: 13,
      initiative: 2,
      speed: 'Fly 30 ft.',
      senses: 'darkvision 60 ft.',
      saves: 'DEX +4',
      skills: 'Perception +2',
      resistances: 'Fire',
      immunities: '',
      condition_immunities: '',
      phase_2_trigger: 'Inflates after taking fire damage',
      phase_3_trigger: '25% HP',
      enrage_trigger: 'If ignored for 3 rounds',
      ai_state: 'Aggressive',
      boss_notes: 'Explodes when defeated or after charging.',

      quick_rolls: {
        str: 1,
        dex: 4,
        con: 3,
        int: -2,
        wis: 2,
        cha: 0
      },

      affinities: {
        fire: 'Absorb',
        ice: 'Weak',
        lightning: 'Normal',
        water: 'Weak',
        wind: 'Normal',
        earth: 'Resist',
        holy: 'Normal',
        dark: 'Normal',
        poison: 'Normal'
      },

      actions: [
        {
          name: 'Fireball Bite',
          category: 'Action',
          type: 'Melee Spell Attack',
          recharge: '',
          mp_cost: 0,
          attack: '1d20+5',
          damage: '2d6',
          damage_type: 'Fire',
          element: 'Fire',
          range: 'Melee 5 ft.',
          save: '',
          scale: 'personal',
          status: '',
          status_rounds: 0,
          desc: 'A burning bite attack.'
        },
        {
          name: 'Inflate',
          category: 'Bonus Action',
          type: 'Charge',
          recharge: '',
          mp_cost: 0,
          attack: '0',
          damage: '0',
          damage_type: 'None',
          element: 'Fire',
          range: 'Self',
          save: '',
          scale: 'personal',
          status: '',
          status_rounds: 0,
          desc: 'The Bomb swells with unstable heat. Its next Self-Destruct deals extra damage.'
        },
        {
          name: 'Self-Destruct',
          category: 'Enrage Action',
          type: 'Explosion',
          recharge: '',
          mp_cost: 0,
          attack: '0',
          damage: '6d6',
          damage_type: 'Fire',
          element: 'Fire',
          range: '15 ft. radius',
          save: 'DEX DC 14 half',
          scale: 'personal',
          status: '',
          status_rounds: 0,
          desc: 'Explodes in a 15-foot radius. Bomb is reduced to 0 HP.'
        }
      ],

      legendary: [],

      ai: [
        {
          round: 1,
          phase: '1',
          action: 'Fireball Bite',
          notes: 'Attack the closest target.'
        },
        {
          round: 2,
          phase: '2',
          action: 'Inflate',
          notes: 'Charge up if damaged by fire or ignored.'
        },
        {
          round: 3,
          phase: 'Enrage',
          action: 'Self-Destruct',
          notes: 'Explode when low HP or after charging.'
        }
      ]
    },

    behemoth: {
      name: 'Behemoth',
      type: 'Beast',
      level: 12,
      scale: 'armor',
      hp: 260,
      mp: 40,
      limit: 0,
      limit_max: 100,
      ac: 18,
      initiative: 3,
      speed: '50 ft.',
      senses: 'darkvision 120 ft.',
      saves: 'STR +10, CON +9, WIS +6',
      skills: 'Athletics +10, Perception +6',
      resistances: 'Nonmagical weapon damage',
      immunities: '',
      condition_immunities: 'Frightened',
      phase_2_trigger: '50% HP',
      phase_3_trigger: '25% HP',
      enrage_trigger: '10% HP',
      ai_state: 'Aggressive',
      boss_notes: 'Brutal physical boss. Uses Meteor as a death or enrage mechanic.',

      quick_rolls: {
        str: 10,
        dex: 3,
        con: 9,
        int: 1,
        wis: 6,
        cha: 4
      },

      affinities: {
        fire: 'Normal',
        ice: 'Normal',
        lightning: 'Normal',
        water: 'Normal',
        wind: 'Normal',
        earth: 'Resist',
        holy: 'Normal',
        dark: 'Normal',
        poison: 'Resist'
      },

      actions: [
        {
          name: 'Horn Gore',
          category: 'Action',
          type: 'Melee Weapon Attack',
          recharge: '',
          mp_cost: 0,
          attack: '1d20+10',
          damage: '3d10+6',
          damage_type: 'Piercing',
          element: 'None',
          range: 'Melee 10 ft.',
          save: '',
          scale: 'armor',
          status: '',
          status_rounds: 0,
          desc: 'A brutal horn attack.'
        },
        {
          name: 'Thunderous Stomp',
          category: 'Action',
          type: 'Area Attack',
          recharge: '5-6',
          mp_cost: 0,
          attack: '0',
          damage: '4d8',
          damage_type: 'Bludgeoning / Earth',
          element: 'Earth',
          range: '20 ft. radius',
          save: 'STR DC 17 or prone',
          scale: 'armor',
          status: 'Prone',
          status_rounds: 1,
          desc: 'Creatures in 20 ft. must save or fall prone and take earth damage.'
        },
        {
          name: 'Meteor',
          category: 'Enrage Action',
          type: 'Ultimate',
          recharge: '',
          mp_cost: 20,
          attack: '0',
          damage: '10d10',
          damage_type: 'Force',
          element: 'None',
          range: '120 ft. / large area',
          save: 'DEX DC 18 half',
          scale: 'armor',
          status: '',
          status_rounds: 0,
          desc: 'Massive area damage. Usually used at enrage or as a death trigger.'
        }
      ],

      legendary: [
        {
          name: 'Savage Counter',
          cost: 1,
          roll: '1d20+10',
          element: 'None',
          range: 'Melee 10 ft.',
          save: '',
          desc: 'Makes one melee attack against a creature that hit it this round.'
        }
      ],

      ai: [
        {
          round: 1,
          phase: '1',
          action: 'Horn Gore',
          notes: 'Focus the closest frontliner.'
        },
        {
          round: 2,
          phase: '2',
          action: 'Thunderous Stomp',
          notes: 'Use if surrounded.'
        },
        {
          round: 3,
          phase: 'Enrage',
          action: 'Meteor',
          notes: 'Use as enrage or death trigger.'
        }
      ]
    },

    ifrit: {
      name: 'Ifrit',
      type: 'Eidolon',
      level: 10,
      scale: 'armor',
      hp: 220,
      mp: 120,
      limit: 0,
      limit_max: 100,
      ac: 17,
      initiative: 4,
      speed: '40 ft.',
      senses: 'truesight 60 ft.',
      saves: 'STR +8, CON +8, CHA +7',
      skills: 'Intimidation +7, Perception +6',
      resistances: 'Physical damage from nonmagical weapons',
      immunities: 'Fire',
      condition_immunities: 'Burning, Frightened',
      phase_2_trigger: '50% HP',
      phase_3_trigger: '25% HP',
      enrage_trigger: 'Hellfire at 10% HP',
      ai_state: 'Aggressive',
      boss_notes: 'Fire primal. Absorbs fire and punishes clustered parties.',

      quick_rolls: {
        str: 8,
        dex: 4,
        con: 8,
        int: 3,
        wis: 6,
        cha: 7
      },

      affinities: {
        fire: 'Absorb',
        ice: 'Weak',
        lightning: 'Normal',
        water: 'Weak',
        wind: 'Normal',
        earth: 'Normal',
        holy: 'Normal',
        dark: 'Normal',
        poison: 'Null'
      },

      actions: [
        {
          name: 'Flaming Claw',
          category: 'Action',
          type: 'Melee Spell Attack',
          recharge: '',
          mp_cost: 0,
          attack: '1d20+8',
          damage: '3d8+5',
          damage_type: 'Slashing / Fire',
          element: 'Fire',
          range: 'Melee 10 ft.',
          save: '',
          scale: 'armor',
          status: 'Burning',
          status_rounds: 2,
          desc: 'Hit: fire damage and Burning.'
        },
        {
          name: 'Eruption',
          category: 'Phase Action',
          type: 'Area Spell',
          recharge: '5-6',
          mp_cost: 10,
          attack: '0',
          damage: '5d8',
          damage_type: 'Fire',
          element: 'Fire',
          range: '30 ft. radius point',
          save: 'DEX DC 16 half',
          scale: 'armor',
          status: 'Burning',
          status_rounds: 2,
          desc: 'A pillar of fire erupts under a target area.'
        },
        {
          name: 'Hellfire',
          category: 'Enrage Action',
          type: 'Ultimate',
          recharge: '',
          mp_cost: 30,
          attack: '0',
          damage: '10d8',
          damage_type: 'Fire',
          element: 'Fire',
          range: 'Battlefield',
          save: 'DEX DC 18 half',
          scale: 'armor',
          status: 'Burning',
          status_rounds: 3,
          desc: 'Massive battlefield-wide fire damage.'
        }
      ],

      legendary: [
        {
          name: 'Infernal Step',
          cost: 1,
          roll: '0',
          element: 'Fire',
          range: 'Self / 30 ft.',
          save: '',
          desc: 'Ifrit teleports up to 30 feet and leaves fire behind.'
        }
      ],

      ai: [
        {
          round: 1,
          phase: '1',
          action: 'Flaming Claw',
          notes: 'Attack with burning melee pressure.'
        },
        {
          round: 2,
          phase: '2',
          action: 'Eruption',
          notes: 'Punish grouped targets.'
        },
        {
          round: 3,
          phase: 'Enrage',
          action: 'Hellfire',
          notes: 'Use as ultimate pressure.'
        }
      ]
    },

    tonberry: {
      name: 'Tonberry',
      type: 'Fiend',
      level: 8,
      scale: 'personal',
      hp: 120,
      mp: 30,
      limit: 0,
      limit_max: 100,
      ac: 16,
      initiative: 1,
      speed: '20 ft.',
      senses: 'darkvision 60 ft.',
      saves: 'WIS +6',
      skills: 'Stealth +6, Perception +6',
      resistances: 'Dark',
      immunities: '',
      condition_immunities: 'Frightened',
      phase_2_trigger: '50% HP',
      phase_3_trigger: '25% HP',
      enrage_trigger: '10% HP',
      ai_state: 'Staggered',
      boss_notes: 'Slow-moving executioner enemy. Builds dread over time.',

      quick_rolls: {
        str: 2,
        dex: 3,
        con: 4,
        int: 2,
        wis: 6,
        cha: 3
      },

      affinities: {
        fire: 'Normal',
        ice: 'Normal',
        lightning: 'Normal',
        water: 'Normal',
        wind: 'Normal',
        earth: 'Normal',
        holy: 'Weak',
        dark: 'Absorb',
        poison: 'Resist'
      },

      actions: [
        {
          name: "Chef's Knife",
          category: 'Action',
          type: 'Melee Weapon Attack',
          recharge: '',
          mp_cost: 0,
          attack: '1d20+8',
          damage: '4d8+4',
          damage_type: 'Piercing',
          element: 'None',
          range: 'Melee 5 ft.',
          save: 'WIS DC 15 vs Doom',
          scale: 'personal',
          status: 'Doom',
          status_rounds: 3,
          desc: 'A terrifying knife attack. On hit, applies Doom.'
        },
        {
          name: "Everyone's Grudge",
          category: 'Enrage Action',
          type: 'Dark Magic',
          recharge: '5-6',
          mp_cost: 10,
          attack: '0',
          damage: '8d8',
          damage_type: 'Dark',
          element: 'Dark',
          range: '60 ft.',
          save: 'WIS DC 16 half',
          scale: 'personal',
          status: '',
          status_rounds: 0,
          desc: "Deals dark damage based on the party's violence."
        }
      ],

      legendary: [
        {
          name: 'Step Forward',
          cost: 1,
          roll: '0',
          element: 'None',
          range: '10 ft.',
          save: '',
          desc: 'Tonberry moves 10 feet toward its marked target.'
        }
      ],

      ai: [
        {
          round: 1,
          phase: '1',
          action: 'Step Forward',
          notes: 'Move slowly toward the marked target.'
        },
        {
          round: 2,
          phase: '1',
          action: "Chef's Knife",
          notes: 'Attack when in range.'
        },
        {
          round: 3,
          phase: 'Enrage',
          action: "Everyone's Grudge",
          notes: 'Use when party has dealt heavy damage.'
        }
      ]
    }
  };

  /* =========================
     HELPERS
  ========================= */

  function clean(text) {
    return String(text === undefined || text === null ? '' : text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;');
  }

  function whisper(message) {
    sendChat('FF5E Importer', '/w gm ' + message);
  }

  function sendTemplate(templateName, fields) {
    var parts = ['&{template:' + templateName + '}'];

    Object.keys(fields).forEach(function(key) {
      if (fields[key] !== undefined && fields[key] !== null && fields[key] !== '') {
        parts.push('{{' + key + '=' + clean(fields[key]) + '}}');
      }
    });

    sendChat('FF5E Importer', parts.join(' '));
  }

  function sendResourceCard(name, actor, type, before, after, description) {
    sendTemplate('ff5e_card_resource', {
      name: name,
      actor: actor,
      type: type,
      before: before,
      after: after,
      description: description
    });
  }

  function getAttr(characterId, attrName) {
    return findObjs({
      type: 'attribute',
      characterid: characterId,
      name: attrName
    })[0];
  }

  function getAttrValue(characterId, attrName, fallback) {
    var attr = getAttr(characterId, attrName);
    return attr ? attr.get('current') : fallback;
  }

  function setAttrValue(characterId, attrName, value, maxValue) {
    var attr = getAttr(characterId, attrName);

    if (!attr) {
      var data = {
        characterid: characterId,
        name: attrName,
        current: value
      };

      if (maxValue !== undefined && maxValue !== null) {
        data.max = maxValue;
      }

      createObj('attribute', data);
    } else {
      attr.set('current', value);

      if (maxValue !== undefined && maxValue !== null) {
        attr.set('max', maxValue);
      }
    }
  }

  function getCharacterFromToken(tokenId) {
    var token = getObj('graphic', tokenId);

    if (!token) {
      return null;
    }

    var characterId = token.get('represents');

    if (!characterId) {
      return null;
    }

    return {
      token: token,
      characterId: characterId
    };
  }

  function makeRowID() {
    return (
      '-' +
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10)
    );
  }

  function normalizeKey(key) {
    return String(key || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }

  function clearRepeatingSection(characterId, sectionName) {
    var prefix = 'repeating_' + sectionName + '_';

    findObjs({
      type: 'attribute',
      characterid: characterId
    }).forEach(function(attr) {
      var name = attr.get('name');

      if (name.indexOf(prefix) === 0) {
        attr.remove();
      }
    });
  }

  function setRepeatingAttr(characterId, sectionName, rowId, fieldName, value) {
    setAttrValue(
      characterId,
      'repeating_' + sectionName + '_' + rowId + '_' + fieldName,
      value
    );
  }

  function importAction(characterId, action) {
    var rowId = makeRowID();

    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_name', action.name || '');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_category', action.category || 'Action');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_type', action.type || '');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_recharge', action.recharge || '');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_mp_cost', action.mp_cost || 0);

    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_attack', action.attack || '0');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_roll', action.damage || action.roll || '0');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_damage_type', action.damage_type || '');

    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_element', action.element || 'None');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_range', action.range || '');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_save', action.save || '');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_scale', action.scale || 'personal');

    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_status', action.status || '');
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_status_rounds', action.status_rounds || 0);
    setRepeatingAttr(characterId, 'npcactions', rowId, 'npc_action_desc', action.desc || '');
  }

  function importLegendary(characterId, action) {
    var rowId = makeRowID();

    setRepeatingAttr(characterId, 'legendaryactions', rowId, 'legendary_name', action.name || '');
    setRepeatingAttr(characterId, 'legendaryactions', rowId, 'legendary_cost', action.cost || 1);
    setRepeatingAttr(characterId, 'legendaryactions', rowId, 'legendary_roll', action.roll || '0');
    setRepeatingAttr(characterId, 'legendaryactions', rowId, 'legendary_element', action.element || 'None');
    setRepeatingAttr(characterId, 'legendaryactions', rowId, 'legendary_range', action.range || '');
    setRepeatingAttr(characterId, 'legendaryactions', rowId, 'legendary_save', action.save || '');
    setRepeatingAttr(characterId, 'legendaryactions', rowId, 'legendary_desc', action.desc || '');
  }

  function importAI(characterId, ai) {
    var rowId = makeRowID();

    setRepeatingAttr(characterId, 'aipattern', rowId, 'ai_round', ai.round || '');
    setRepeatingAttr(characterId, 'aipattern', rowId, 'ai_phase', ai.phase || '');
    setRepeatingAttr(characterId, 'aipattern', rowId, 'ai_action', ai.action || '');
    setRepeatingAttr(characterId, 'aipattern', rowId, 'ai_notes', ai.notes || '');
  }

  function importMonsterData(tokenId, monster) {
    var data = getCharacterFromToken(tokenId);

    if (!data) {
      whisper('Import failed: selected token is not linked to a character.');
      return;
    }

    var token = data.token;
    var characterId = data.characterId;

    token.set('name', monster.name || 'Imported Monster');

    setAttrValue(characterId, 'sheet_mode', 'monster');
    setAttrValue(characterId, 'sheet_tab', 'monster-core');

    setAttrValue(characterId, 'npc_name', monster.name || '');
    setAttrValue(characterId, 'character_name', monster.name || '');
    setAttrValue(characterId, 'npc_type', monster.type || 'Other');
    setAttrValue(characterId, 'npc_level', monster.level || 1);
    setAttrValue(characterId, 'npc_scale', monster.scale || 'personal');

    setAttrValue(characterId, 'npc_hp_current', monster.hp || 1, monster.hp || 1);
    setAttrValue(characterId, 'npc_hp_max', monster.hp || 1, monster.hp || 1);

    setAttrValue(characterId, 'npc_mp_current', monster.mp || 0, monster.mp || 0);
    setAttrValue(characterId, 'npc_mp_max', monster.mp || 0, monster.mp || 0);

    setAttrValue(characterId, 'npc_limit_current', monster.limit || 0, monster.limit_max || 100);
    setAttrValue(characterId, 'npc_limit_max', monster.limit_max || 100, monster.limit_max || 100);

    setAttrValue(characterId, 'npc_ac', monster.ac || 10);
    setAttrValue(characterId, 'npc_initiative', monster.initiative || 0);
    setAttrValue(characterId, 'npc_speed', monster.speed || '');
    setAttrValue(characterId, 'npc_senses', monster.senses || '');

    setAttrValue(characterId, 'npc_saves', monster.saves || '');
    setAttrValue(characterId, 'npc_skills', monster.skills || '');
    setAttrValue(characterId, 'npc_resistances', monster.resistances || '');
    setAttrValue(characterId, 'npc_immunities', monster.immunities || '');
    setAttrValue(characterId, 'npc_condition_immunities', monster.condition_immunities || '');

    setAttrValue(characterId, 'phase_2_trigger', monster.phase_2_trigger || '50% HP');
    setAttrValue(characterId, 'phase_3_trigger', monster.phase_3_trigger || '25% HP');
    setAttrValue(characterId, 'enrage_trigger', monster.enrage_trigger || '10% HP');
    setAttrValue(characterId, 'npc_ai_state', monster.ai_state || 'Normal');
    setAttrValue(characterId, 'boss_notes', monster.boss_notes || '');

    setAttrValue(characterId, 'boss_phase', 1);
    setAttrValue(characterId, 'npc_hp_percent', 100);

    var quick = monster.quick_rolls || {};

    setAttrValue(characterId, 'npc_str_bonus', quick.str || 0);
    setAttrValue(characterId, 'npc_dex_bonus', quick.dex || 0);
    setAttrValue(characterId, 'npc_con_bonus', quick.con || 0);
    setAttrValue(characterId, 'npc_int_bonus', quick.int || 0);
    setAttrValue(characterId, 'npc_wis_bonus', quick.wis || 0);
    setAttrValue(characterId, 'npc_cha_bonus', quick.cha || 0);

    var aff = monster.affinities || {};

    setAttrValue(characterId, 'npc_affinity_fire', aff.fire || 'Normal');
    setAttrValue(characterId, 'npc_affinity_ice', aff.ice || 'Normal');
    setAttrValue(characterId, 'npc_affinity_lightning', aff.lightning || 'Normal');
    setAttrValue(characterId, 'npc_affinity_water', aff.water || 'Normal');
    setAttrValue(characterId, 'npc_affinity_wind', aff.wind || 'Normal');
    setAttrValue(characterId, 'npc_affinity_earth', aff.earth || 'Normal');
    setAttrValue(characterId, 'npc_affinity_holy', aff.holy || 'Normal');
    setAttrValue(characterId, 'npc_affinity_dark', aff.dark || 'Normal');
    setAttrValue(characterId, 'npc_affinity_poison', aff.poison || 'Normal');

    clearRepeatingSection(characterId, 'npcactions');
    clearRepeatingSection(characterId, 'legendaryactions');
    clearRepeatingSection(characterId, 'aipattern');

    (monster.actions || []).forEach(function(action) {
      importAction(characterId, action);
    });

    (monster.legendary || []).forEach(function(action) {
      importLegendary(characterId, action);
    });

    (monster.ai || []).forEach(function(ai) {
      importAI(characterId, ai);
    });

    sendResourceCard(
      monster.name || 'Monster',
      'Monster Importer',
      'Monster Imported',
      'Blank Sheet',
      'Ready',
      'Imported ' + (monster.name || 'Unnamed Monster') + ' with updated card-ready action fields.'
    );
  }

  function listMonsters() {
    var keys = Object.keys(MONSTER_DB).sort();

    whisper(
      '<b>Available Monsters</b><br>' +
      keys.map(function(key) {
        return key + ' — ' + MONSTER_DB[key].name;
      }).join('<br>')
    );
  }

  function showMonster(key) {
    key = normalizeKey(key);

    var monster = MONSTER_DB[key];

    if (!monster) {
      whisper('Monster not found: ' + key + '. Use !ff5e-monster-list.');
      return;
    }

    whisper(
      '<b>' + monster.name + '</b><br>' +
      'Type: ' + monster.type + '<br>' +
      'Level: ' + monster.level + '<br>' +
      'Scale: ' + monster.scale + '<br>' +
      'HP: ' + monster.hp + '<br>' +
      'MP: ' + monster.mp + '<br>' +
      'AC: ' + monster.ac + '<br>' +
      'Initiative: +' + monster.initiative + '<br>' +
      'Actions: ' + (monster.actions || []).length + '<br>' +
      'Legendary/Lair Actions: ' + (monster.legendary || []).length + '<br>' +
      'AI Rows: ' + (monster.ai || []).length
    );
  }

  function importMonsterByKey(tokenId, key) {
    key = normalizeKey(key);

    var monster = MONSTER_DB[key];

    if (!monster) {
      whisper('Monster not found: ' + key + '. Use !ff5e-monster-list.');
      return;
    }

    importMonsterData(tokenId, monster);
  }

  function importMonsterFromJsonAttribute(tokenId) {
    var data = getCharacterFromToken(tokenId);

    if (!data) {
      whisper('JSON import failed: token is not linked to a character.');
      return;
    }

    var raw = getAttrValue(data.characterId, 'npc_import_json', '');

    if (!raw) {
      whisper('No JSON found in npc_import_json field.');
      return;
    }

    var parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      whisper('Invalid JSON. Check commas, quotation marks, and braces.');
      return;
    }

    importMonsterData(tokenId, parsed);
  }

  function quotedArgs(content) {
    var re = /"([^"]*)"|'([^']*)'|(\S+)/g;
    var args = [];
    var match;

    while ((match = re.exec(content)) !== null) {
      args.push(match[1] || match[2] || match[3]);
    }

    return args;
  }

  function handleInput(msg) {
    if (msg.type !== 'api') return;

    var args = quotedArgs(msg.content);
    var command = args.shift();

    if (command === '!ff5e-monster-list') {
      listMonsters();
      return;
    }

    if (command === '!ff5e-monster-show') {
      showMonster(args.shift());
      return;
    }

    if (command === '!ff5e-import-monster') {
      var tokenId = args.shift();
      var monsterKey = args.shift();

      importMonsterByKey(tokenId, monsterKey);
      return;
    }

    if (command === '!ff5e-import-json') {
      var jsonTokenId = args.shift();

      importMonsterFromJsonAttribute(jsonTokenId);
      return;
    }
  }

  function registerEventHandlers() {
    on('chat:message', handleInput);
    log('FF5E Monster Importer v' + VERSION + ' ready.');
  }

  return {
    RegisterEventHandlers: registerEventHandlers
  };
})();

on('ready', function() {
  FF5EMonsterImporter.RegisterEventHandlers();
});