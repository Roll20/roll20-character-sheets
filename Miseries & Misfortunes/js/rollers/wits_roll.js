function activateWitsModal(sourceAttribute) {
  const attribute = getTrimmedAttribute(sourceAttribute);
  const update = { show_wits_modal: 1 };
  update[sourceAttribute] = 0;
  update.wits_roll_mod = 0;
  update.roll_type = attribute;
  update.wits_distance = attribute === 'voice' ? 'speaking' : 'press';

  setAttrs(update, { silent: true }, () => updateWitsModal());
  return true;
}

function updateWitsModal() {
  const attributes_to_get = [
    'wits_attack',
    'wits_distance',
    'roll_type',
    'wits_roll_mod',
    'charisma_mod',
    'intelligence_mod',
    'voice_to_hit_mod',
    'press_to_hit_mod',
    'wits_opponent_tn',
    'press_damage_mod',
    'voice_damage_mod',
  ];
  getAttrs(attributes_to_get, attributes => {
    const {
      wits_attack,
      wits_distance,
      roll_type,
      wits_roll_mod,
      charisma_mod,
      intelligence_mod,
      voice_to_hit_mod,
      press_to_hit_mod,
      wits_opponent_tn,
      press_damage_mod,
      voice_damage_mod,
    } = attributes;
    const roll_data = roll_table[roll_type];
    const attack_data = wits_attacks[wits_attack];
    const distance_data = attack_data[wits_distance];
    const ability_mod = wits_distance === 'press' ? intelligence_mod : charisma_mod;
    const lifepath_mod = wits_distance === 'press' ? press_to_hit_mod : voice_to_hit_mod;
    const ability_damage_mod = wits_distance === 'press' ? press_damage_mod : voice_damage_mod;
    const combat_distance = wits_distance.charAt(0).toUpperCase() + wits_distance.slice(1);

    const base_mod = parseInt(ability_mod, 10) || 0;
    const base_damage_mod = parseInt(ability_damage_mod, 10) || 0;
    const lp_mod = parseInt(lifepath_mod, 10) || 0;
    const wits_mod = parseInt(wits_roll_mod, 10) || 0;

    const final_mod_display = base_mod + lp_mod + wits_mod;
    const final_mod_string = buildFinalModString();

    const ability_damage_modifier = buildAbilityDamageModifier();
    const [will_damage_base, reputation_damage_base] = distance_data.dmg.split('; ');
    const final_damage_display = buildFinalDamageDisplay();
    const final_damage_string = buildFinalModString();
    const tn = wits_distance === 'intimate' ? wits_opponent_tn : distance_data.tn;

    const update = {
      wits_roll_base_mod: ability_mod || 0,
      wits_roll_base_type: roll_data.mod.substring(0, 3),
      wits_roll_lifepath_mod: lifepath_mod || 0,
      wits_roll_mod_display: final_mod_display,
      wits_roll_opponent_ability: wits_distance === 'intimate' ? distance_data.tn.toUpperCase() : '',
      combat_distance,
      roll_name: attack_data.name.toUpperCase(),
      roll_die: 'd20',
      roll_tn: parseInt(tn, 10),
      roll_tn_display: tn,
      roll_rof: attack_data.rof,
      roll_damage: final_damage_string,
      roll_damage_display: final_damage_display,
      roll_final: buildRollFinal(),
    };

    setAttrs(update, { silent: true });

    return true;

    function buildRollFinal() {
      const requiresNaturalSuccess = tn === '20n' ? true : false;
      const mod = requiresNaturalSuccess ? '' : final_mod_string;

      let result = '&{template:attack}';
      result += ' {{roll=[[@{roll_die}' + mod + ']]}}';
      if (!requiresNaturalSuccess) {
        result += ' {{mod=[[' + final_mod_string + ']]}}';
      }
      result += requiresNaturalSuccess ? ' {{crit_none=true}}' : ' {{crit_greater=true}}';
      result += buildFinalDamageString();
      result +=
        ' {{combat_distance=@{combat_distance}}} {{roll_tn=[[@{roll_tn}]]}} {{roll_tn_display=[[@{roll_tn_display}]]}} {{die_type=@{roll_die}}} {{roll_name=@{roll_name}}} {{character_name=@{character_name}}}';
      return result;
    }

    function buildFinalModString() {
      let mod_string = ability_mod + '[' + roll_data.mod + ' mod]';
      if (lp_mod && !isNaN(lp_mod) && lp_mod !== 0) {
        mod_string = mod_string + '+' + lp_mod + '[lifepath mod]';
      }
      if (wits_mod && !isNaN(wits_mod) && wits_mod !== 0) {
        mod_string = mod_string + '+' + wits_mod + '[other mod]';
      }
      return mod_string;
    }

    function buildFinalDamageDisplay() {
      let display = will_damage_base + ability_damage_modifier + ' Will';
      if (reputation_damage_base) {
        display = display + ' & ' + reputation_damage_base + ability_damage_modifier + ' Reputation';
      }
      return display;
    }

    function buildFinalDamageString() {
      let string = ' {{will_damage=[[' + will_damage_base + ability_damage_modifier + ']]}}';
      if (reputation_damage_base) {
        string = string + ' {{reputation_damage=[[' + reputation_damage_base + ability_damage_modifier + ']]}}';
      }
      return string;
    }

    function buildAbilityDamageModifier() {
      const final_damage_mod = base_mod + base_damage_mod;
      const operator = final_damage_mod < 0 ? '' : '+';
      return final_damage_mod !== 0 ? operator + final_damage_mod : '';
    }
  });

  return true;
}

function closeWitsModal() {
  const update = {
    show_wits_modal: 0,
    roll_mod: 0,
  };
  setAttrs(update, { silent: true });
}
