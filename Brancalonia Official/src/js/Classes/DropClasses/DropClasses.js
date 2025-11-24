class RepeatingFieldset {
  constructor(groupname, id) {
    this.groupname = groupname;
    this.reprowid = id || generateRowID();
  }

  buildRowName() {
    return `repeating_${this.groupname}_${this.reprowid}`
  }

  addAttribute(attributesibuteName) {
    return `${this.buildRowName()}_${attributesibuteName}`
  }
}

class Attack extends RepeatingFieldset {
  constructor(name, id) {
    super('attack', id)
    this.attributes = {
      atkname: name,
      atkbonus: '', //Part of button display
      atkdmgtype: '', //Part of button display
      atkflag: '{{attack=1}}',
      atkattr_base: '@{strength_mod}',
      atkrange: '',
      atkmagic: '',
      atkcritrange: 20,
      dmgflag: '{{damage=1}} {{dmg1flag=1}}',
      dmgbase: '',
      dmgattr: '@{strength_mod}',
      dmgmod: '',
      dmgtype: '',
      dmgcustcrit: '',
      dmg2flag: 0,
      dmg2base: '',
      dmg2attr: 0,
      dmg2mod: '',
      dmg2type: '',
      dmg2custcrit: '',
      saveflag: 0,
      saveattr: 'Strength',
      savedc: '(@{spell_save_dc})',
      saveflat: '',
      saveeffect: '',
      atk_desc: '',
      "options-flag": 0,
    }
  }

  addSaveFlag() {
    this.attributes.saveflag = '{{save=1}} {{saveattr=@{saveattr}}} {{savedesc=@{saveeffect}}} {{savedc=[[[[@{savedc}]][SAVE]]]}}'
  }

  checkFinesse(strenght, dexterity) {
    const strengthGreaterThanDex = strenght > dexterity;
    this.attributes.dmgattr = strengthGreaterThanDex ? '@{strength_mod}' : '@{dexterity_mod}'
    this.attributes.atkattr_base = strengthGreaterThanDex ? '@{strength_mod}' : '@{dexterity_mod}'
  }
}

class GlobalACMod extends RepeatingFieldset {
  constructor(name, id) {
    super('acmod', id)
    name,
    this.attributes = {
      global_ac_name: name,
      global_ac_val: '',
      global_ac_active_flag: 0,
      "options-flag": 0,
    }
  }
}

class GlobalDamage extends RepeatingFieldset {
  constructor(name, id) {
    super('damagemod', id)
    name,
    this.attributes = {
      global_damage_name: name,
      global_damage_damage: '',
      global_damage_type: '',
      global_damage_active_flag: 0,
      "options-flag": 0
    }
  }
}

class GlobalSave extends RepeatingFieldset {
  constructor(name, id) {
    super('savemod', id)
    name,
    this.attributes = {
      global_save_name: name,
      global_save_roll: '',
      global_save_active_flag: 0,
      "options-flag": 0
    }
  }
}

class GlobalAttack extends RepeatingFieldset {
  constructor(name, id) {
    super('tohitmod', id)
    name,
    this.attributes = {
      global_attack_name: name,
      global_attack_roll: '',
      global_attack_rollstring: '',
      global_attack_active_flag: 0,
      "options-flag": 0
    }
  }

  addRoll(roll) {
     this.attributes.global_attack_roll = roll;
  }
}

class HPMod extends RepeatingFieldset {
  constructor(name, id) {
    super('hpmod', id)
    name,
    this.attributes = {
      mod: '',
      source: '',
      levels: 'total'
    }
  }
}

class Item extends RepeatingFieldset  {
  constructor(name, id) {
    super('inventory', id);
    name,
    this.attributes = {
      itemname: name,
      itemcount: 1,
      itemproperties: '',
      itemweight: 0,
      itemcontent: '',
      itemmodifiers: '',
      hasattack: 0,
      useasresource: 0
    }
  }
}

class Proficiency extends RepeatingFieldset {
  constructor(name, id) {
    super('proficiencies', id);
    this.attributes = {
        name,
        prof_type: 'OTHER',
        'options-flag': 0
    }
  }
}

class Resource extends RepeatingFieldset {
  constructor(name, id, side) {
    super('resource', id);
    this.side = side || 'left',
    this.attributes = {
      [`resource_${this.side}`]: '',
      [`resource_${this.side}_name`]: name,
      [`resource_${this.side}_max`]: '',
    }
  }
}

class Spell extends RepeatingFieldset {
  constructor(name, section, id) {
    super(section, id);
    this.attributes = {
      'details-flag': 0,
      'options-flag': 0,
      rollcontent: '',
      spell_ability: 'spell',
      innate: '',
      spell_damage_progression: '',
      spellathigherlevels: '',
      spellattack: '',
      spellcastingtime: '',
      spellclass: '',
      spellcomp_m: 0,
      spellcomp_materials: '',
      spellcomp_s: 0,
      spellcomp_v: 0,
      spellconcentration: '',
      spelldamage2: '',
      spelldamage: '',
      spelldamagetype2: '',
      spelldamagetype: '',
      spelldescription: '',
      spelldmgmod: '',
      spellduration: '',
      spellhealing: '',
      spellhlbonus: '',
      spellhldie: '',
      spellhldietype: '',
      spelllevel: 'cantrip',
      spellname: name,
      spelloutput: 'SPELLCARD',
      spellrange: '',
      spellritual: '',
      spellsave: '',
      spellsavesuccess: '',
      spellschool: 'abjuration',
      spellsource: '',
      spelltarget: ''
    }
  }
}

class Trait extends RepeatingFieldset {
  constructor(name, id) {
    super('traits', id);
    this.attributes = {
      name,
      description: '',
      source_type: '',
      source: '',
      edit: "0",
      display_flag: 'on'
    };
  }

  determineSource(category) {
    switch (category) {
        case "Backgrounds":
        case "Feats":
          return category.slice(0, -1)
          break;
        case "Races":
        case "Subraces":
          return "Racial"
          break;
        case "Classes":
        case "Subclasses":
          return "Class"
          break;
        default:
          return "Other"
    } 
  }
}

class ToolProficiency extends RepeatingFieldset {
  constructor(name, id) {
    super('tool', id);
    this.attributes = {
      toolname: name,
      toolbonus_base: '(@{pb})',
      toolattr_base: '?{Attribute?|Strength,@{strength_mod}|Dexterity,@{dexterity_mod}|Constitution,@{constitution_mod}|Intelligence,@{intelligence_mod}|Wisdom,@{wisdom_mod}|Charisma,@{charisma_mod}}',
      'options-flag': 0
    }
  }
}

//========== Non-Repeating

class Class {
  constructor(name) {
    name,
    this.attributes = {
        class: this.validateClassName(name) ? name : '',
        base_level: 1,
        hit_dice_max: 1,
        hit_dice: 1,
        hitdietype: 4,
        spellcasting_ability: '0*'
    }
  }

  validateClassName(name) {
    return globalAttributesByCategory.classes.includes(name.toLowerCase()) ? true : false;
  }

  buildSpellcastingAbility(attributeName) {
    return `@{${attributeName}_mod}+`
  }
}

class CustomAC {
  constructor(name) {
    name,
    this.attributes = {
      custom_ac_flag: 1,
      custom_ac_base: 10,
      custom_ac_part1: 'none',
      custom_ac_part2: 'none',
      custom_ac_shield: 'yes'
    }
  }
}

class Race {
  constructor(name) {
    name,
    this.attributes = {
      race: name,
      speed: 30,
      size: 'Medium',
      halflingluck_flag: this.checkHalfling(name) ? 1 : 0 
    }
  }

  checkHalfling(name) {
    return name === 'Halfling' ? true : false
  }
}

class Subrace {
  constructor(name) {
    name,
    this.attributes = {
      subrace: name
    }
  }
}

class SavingThrow {
  constructor(name) {
    name,
    this.attributes = {
        [`${this.attributesName(name)}_save_prof`]: `(@{pb})`
    }
  }

  attributesName(name) {
    return name.toLowerCase()
  }
}

class Skill {
  constructor(name) {
    name,
    this.attributes = {
        [`${this.attributesName(name)}_prof`]: `(@{pb}*@{${this.attributesName(name)}_type})`
    }
  }

  attributesName(name) {
    return name.toLowerCase().replace(/ /g, '_')
  }
}

class Subclass {
  constructor(name) {
    name,
    this.attributes = {
      subclass: name,
      arcane_fighter: 0,
      arcane_rogue: 0
    }
  }

  checkArcane(className) {
    return className === 'fighter' || className === 'rogue' ? true : false
  }

  buildSpellcastingAbility(attributeName) {
    return `@{${attributeName}_mod}+`
  }
}

//========== NPC AKA MONSTERS

class Npc  {
  constructor(name) {
    name,
    this.attributes = {
        npc_name: name,
        strength_base: 10,
        dexterity_base: 10,
        constitution_base: 10,
        intelligence_base: 10,
        wisdom_base: 10,
        charisma_base: 10,
        npc_condition_immunities: '',
        npc_immunities: '',
        npc_resistances: '',
        npc_languages: '',
        npc_speed: '',
        token_size: 1,
        npc_vulnerabilities: '',
        npc_challenge: '',
        npc_senses: '',
        npc_type: '',
        npc_ac: '',
        npc_actype: '',
        hp_max: '',
        npc_hpformula: '',
        npc_xp: '',
        npc_legendary_actions: 0,
        npc_legendary_actions_desc: '',
        npc_mythic_actions: 0,
        npc_mythic_actions_desc: '',
        npc: 1,
        'npc_options-flag': 0,
        npcreactionsflag: 0,
        npcspellcastingflag: 0,
        spellcasting_ability: '0*',
        globalmagicmod: 0,
        caster_level: 0,
        spell_dc_mod: 0
    }
  }

  addSkills(list) {
    list.forEach(value => this.attributes[`npc_${value.replace(/ /g, '_')}_base`] = "")
  }

  addSaves(list) {
    list.forEach(value => this.attributes[`npc_${value.slice(0, 3)}_save_base`] = "")
  }

  addSpellcaster(ability, casterLevels) {
    const spellcastrAttributes = {
      npcspellcastingflag: 1,
      base_level: casterLevels || 1,
      caster_level: casterLevels || 1,
      class: 'Wizard',
      level: casterLevels || 1,
      spellcasting_ability: ability
    }

    Object.assign(this.attributes, spellcastrAttributes);
  }

  addInnateCaster() {
    this.attributes.npcspellcastingflag = 1
  }
}

class NpcAction extends RepeatingFieldset {
  constructor(name, section, id) {
    super(section, id);
    name,
    this.attributes = {
      name,
      description: '',
      edit: "0",
    }
  }

  addAttack() {
    const attackAttributes = {
      attack_flag: 'on',
      attack_display_flag: '{{attack=1}}',
      attack_options: '{{attack=1}}',
      attack_type: '',
      attack_target: 'one target',
      attack_range: '5 ft',
      attack_tohit: '',
      attack_damage: '',
      attack_damagetype: '',
      attack_damage2: '',
      attack_damagetype2: ''
    }

    Object.assign(this.attributes, attackAttributes);
  }
}

class NpcReaction extends RepeatingFieldset {
  constructor(name, id) {
    super('npcreaction', id)
    name,
    this.attributes = {
      name,
      edit: "0",
      description: ''
    }
  }
}

class NpcTraits extends RepeatingFieldset {
  constructor(name, id) {
    super('npctrait', id)
    name,
    this.attributes = {
      name,
      edit_trait: "0",
      description: ''
    }
  }
}
