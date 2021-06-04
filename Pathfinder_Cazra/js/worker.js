/**
 * Forces an update on a list of numerical fields, also making sure that
 * any undefined fields are set to 0.
 * @param {string[]} attrs
 * @param {function} cb
 */
function forceUpdate(attrs, cb) {
  parseAttrs(attrs, values => {
    let tempValues = {};
    _.each(attrs, attr => {
      tempValues[attr] = -9999;
    });
    setAttrs(tempValues);
    setAttrs(values);
  });
}


function onChange(attrs, cb) {
  attrs = _.map(attrs, attr => {
    return 'change:' + attr;
  }).join(' ');
  on(attrs, cb);
}

function onChangeParse(attrs, cb) {
  onChange(attrs, () => {
    parseAttrs(attrs, cb);
  });
}

/**
 * Gets the specified attributes and parses them as an integer or 0.
 */
function parseAttrs(attrs, cb) {
  getAttrs(attrs, function(values) {
    _.each(attrs, function(attr) {
      if(_.isUndefined(values[attr]))
        values[attr] = 0;
      else if(!isNaN(values[attr]))
        values[attr] = parseInt(values[attr]);
    });
    cb(values);
  });
}


// Update funcs

function updateAbilityMod(attr, values) {
  var mod = Math.floor((values[attr]+ values[attr + '_temp'] - 10)/2);
  setAttrs({
    [attr + '_mod']: mod
  });
}

function updateSkill(skill, ability, hasArmorPen, values) {
  var total = values[ability + '_mod'] + values[skill + '_ranks'] + values[skill + '_misc'];
  if(values[skill + '_class'] && values[skill + '_ranks'] > 0)
    total += 3;
  if(hasArmorPen)
    total += values.armor_penalty;
  setAttrs({
    [skill]: total
  });
}


// Change events

// Ability modifiers

onChangeParse(['str', 'str_temp'], values => {
  updateAbilityMod('str', values);
});

onChangeParse(['dex', 'dex_temp'], values => {
  updateAbilityMod('dex', values);
});

onChangeParse(['con', 'con_temp'], values => {
  updateAbilityMod('con', values);
});

onChangeParse(['int', 'int_temp'], values => {
  updateAbilityMod('int', values);
});

onChangeParse(['wis', 'wis_temp'], values => {
  updateAbilityMod('wis', values);
});

onChangeParse(['cha', 'cha_temp'], values => {
  updateAbilityMod('cha', values);
});

// Initiative

onChangeParse(['dex_mod', 'init_misc'], values => {
  setAttrs({
    init: values.dex_mod + values.init_misc
  });
});

// AC

onChangeParse(['ac_equipment', 'dex_mod', 'size', 'ac_misc', 'ac_temp'], values => {
  setAttrs({
    ac: 10 + values.ac_equipment + values.dex_mod + values.size + values.ac_misc + values.ac_temp,
    ac_touch: 10 + values.dex_mod + values.size + values.ac_misc + values.ac_temp,
    ac_flatfoot: 10 + values.ac_equipment + values.size + values.ac_misc + values.ac_temp,
  });
});

// Saving throws

onChangeParse(['fort_base', 'con_mod', 'fort_equipment', 'fort_misc', 'fort_temp'], values => {
  setAttrs({
    fort: values.fort_base + values.con_mod + values.fort_equipment + values.fort_misc + values.fort_temp
  });
});

onChangeParse(['ref_base', 'dex_mod', 'ref_equipment', 'ref_misc', 'ref_temp'], values => {
  setAttrs({
    ref: values.ref_base + values.dex_mod + values.ref_equipment + values.ref_misc + values.ref_temp
  });
});

onChangeParse(['will_base', 'wis_mod', 'will_equipment', 'will_misc', 'will_temp'], values => {
  setAttrs({
    will: values.will_base + values.wis_mod + values.will_equipment + values.will_misc + values.will_temp
  });
});


// Attacks
onChangeParse(['bab', 'size'], values => {
  getSectionIDs('repeating_attacks', ids => {
    _.each(ids, id => {
      var prefix = 'repeating_attacks_' + id + '_';

      setAttrs({
        [prefix + 'attack_bab']: values.bab,
        [prefix + 'attack_size']: values.size
      });
    });
  });
});

onChangeParse(['str_mod', 'dex_mod', 'con_mod', 'int_mod', 'wis_mod', 'cha_mod'], values => {
  getSectionIDs('repeating_attacks', ids => {
    _.each(ids, id => {
      var prefix = 'repeating_attacks_' + id + '_attack';
      var repAbility = 'repeating_attacks_' + id + '_attack_ability';

      var attrNames = _.map(['ability'], name => {
        return prefix + '_' + name;
      });
      parseAttrs(attrNames, attackValues => {
        var abilityModName = attackValues[repAbility] + '_mod';

        setAttrs({
          [prefix + '_ability_mod']: values[abilityModName]
        });
      });
    });
  });
});

var testCounter = 0;

on('change:repeating_attacks', (evt) => {
  forceUpdate(['bab', 'size']);
  testCounter++;
  setAttrs({debug: testCounter})

  getSectionIDs('repeating_attacks', ids => {
    _.each(ids, id => {
      var prefix = 'repeating_attacks_' + id + '_attack';
      var repAbility = 'repeating_attacks_' + id + '_attack_ability';

      var attrNames = _.map(['ability', 'bab', 'ability_mod', 'size', 'equipment', 'misc', 'temp'], name => {
        return prefix + '_' + name;
      });
      attrNames = attrNames.concat(['str_mod', 'dex_mod', 'con_mod', 'int_mod', 'wis_mod', 'cha_mod']);
      parseAttrs(attrNames, values => {
        var abilityModName = values[repAbility] + '_mod';

        setAttrs({
          [prefix]: values[prefix + '_bab'] + values[abilityModName] + values[prefix + '_size'] + values[prefix + '_equipment'] + values[prefix + '_misc'] + values[prefix + '_temp'],
          [prefix + '_ability_mod']: values[abilityModName]
        }, { silent: true });
      });
    });
  });
});


// CMB/CMD

onChangeParse(['size'], values => {
  setAttrs({
    cmb_size: -values.size,
    cmd_size: -values.size
  });
});

onChangeParse(['bab', 'str_mod', 'cmb_size', 'cmb_misc', 'cmb_temp'], values => {
  setAttrs({
    cmb: values.bab + values.str_mod + values.cmb_size + values.cmb_misc + values.cmb_temp
  });
});

onChangeParse(['bab', 'str_mod', 'dex_mod', 'cmd_size', 'cmd_misc', 'cmd_temp'], values => {
  setAttrs({
    cmd: 10 + values.bab + values.str_mod + values.dex_mod + values.cmd_size + values.cmd_misc + values.cmd_temp
  });
});

// Skills

var skills = [
  { skill: 'acrobatics', ability: 'dex', armorPenalty: true },
  { skill: 'appraise', ability: 'int', armorPenalty: false },
  { skill: 'bluff', ability: 'cha', armorPenalty: false },
  { skill: 'climb', ability: 'str', armorPenalty: true },
  { skill: 'craft1', ability: 'int', armorPenalty: false },
  { skill: 'craft2', ability: 'int', armorPenalty: false },
  { skill: 'craft3', ability: 'int', armorPenalty: false },
  { skill: 'craft4', ability: 'int', armorPenalty: false },
  { skill: 'craft5', ability: 'int', armorPenalty: false },
  { skill: 'diplomacy', ability: 'cha', armorPenalty: false },
  { skill: 'disable_device', ability: 'dex', armorPenalty: true },
  { skill: 'disguise', ability: 'cha', armorPenalty: false },
  { skill: 'escape_artist', ability: 'dex', armorPenalty: true },
  { skill: 'fly', ability: 'dex', armorPenalty: true },
  { skill: 'handle_animal', ability: 'cha', armorPenalty: false },
  { skill: 'heal', ability: 'wis', armorPenalty: false },
  { skill: 'intimidate', ability: 'cha', armorPenalty: false },
  { skill: 'knowledge_arcana', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_dungeoneering', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_engineering', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_geography', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_history', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_local', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_nature', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_nobility', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_planes', ability: 'int', armorPenalty: false },
  { skill: 'knowledge_religion', ability: 'int', armorPenalty: false },
  { skill: 'linguistics', ability: 'int', armorPenalty: false },
  { skill: 'perception', ability: 'wis', armorPenalty: false },
  { skill: 'perform1', ability: 'cha', armorPenalty: false },
  { skill: 'perform2', ability: 'cha', armorPenalty: false },
  { skill: 'perform3', ability: 'cha', armorPenalty: false },
  { skill: 'perform4', ability: 'cha', armorPenalty: false },
  { skill: 'perform5', ability: 'cha', armorPenalty: false },
  { skill: 'profession1', ability: 'wis', armorPenalty: false },
  { skill: 'profession2', ability: 'wis', armorPenalty: false },
  { skill: 'profession3', ability: 'wis', armorPenalty: false },
  { skill: 'profession4', ability: 'wis', armorPenalty: false },
  { skill: 'profession5', ability: 'wis', armorPenalty: false },
  { skill: 'ride', ability: 'dex', armorPenalty: true },
  { skill: 'sense_motive', ability: 'wis', armorPenalty: false },
  { skill: 'sleight_of_hand', ability: 'dex', armorPenalty: true },
  { skill: 'spellcraft', ability: 'int', armorPenalty: false },
  { skill: 'stealth', ability: 'dex', armorPenalty: true },
  { skill: 'survival', ability: 'wis', armorPenalty: false },
  { skill: 'swim', ability: 'str', armorPenalty: true },
  { skill: 'use_magic_device', ability: 'cha', armorPenalty: false }
];
_.each(skills, skillTuple => {
  var skill = skillTuple.skill
  var ability = skillTuple.ability;
  var hasArmorPen = skillTuple.armorPenalty;
  onChangeParse([skill + '_class', ability + '_mod', skill + '_ranks', skill + '_misc', 'armor_penalty'], values => {
    updateSkill(skill, ability, hasArmorPen, values);
  });
});


onChange(['caster_ability'], () => {
  getAttrs(['caster_ability'], values => {
    var caster_ability = values.caster_ability;
    parseAttrs([caster_ability + '_mod'], values => {
      setAttrs({
        spell_dc_ability_mod: values[caster_ability + '_mod']
      });
    });
  });
});

onChangeParse(['spell_dc_ability_mod', 'spell_dc_misc'], values => {
  setAttrs({
    spell_dc_base: 10 + values.spell_dc_ability_mod + values.spell_dc_misc
  });
});

onChangeParse(['spell_dc_base'], values => {
  setAttrs({
    spell_level_0_dc: values.spell_dc_base,
    spell_level_1_dc: values.spell_dc_base + 1,
    spell_level_2_dc: values.spell_dc_base + 2,
    spell_level_3_dc: values.spell_dc_base + 3,
    spell_level_4_dc: values.spell_dc_base + 4,
    spell_level_5_dc: values.spell_dc_base + 5,
    spell_level_6_dc: values.spell_dc_base + 6,
    spell_level_7_dc: values.spell_dc_base + 7,
    spell_level_8_dc: values.spell_dc_base + 8,
    spell_level_9_dc: values.spell_dc_base + 9
  });
});

on('sheet:opened', () => {
  setAttrs({
    character_sheet: 'Pathfinder_Simple v1.6.0'
  });

  forceUpdate([
    'str', 'dex', 'con', 'int', 'wis', 'cha',
    'bab', 'size'
  ]);
});
