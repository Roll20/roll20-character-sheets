function activateCombatModal(id) {
  const update = { show_combat_modal: 1 };
  update['repeating_arms_' + id + '_arm_trigger'] = 0;
  update.combat_roll_mod = 0;

  getAttrs(['repeating_arms_' + id + '_arm'], attributes => {
    update.combat_attack = attributes['repeating_arms_' + id + '_arm'];
    setAttrs(update, { silent: true }, () => updateCombatModal());
  });

  return true;
}

function updateCombatModal() {
  const attributes_to_get = [
    'combat_attack',
    'combat_distance',
    'combat_roll_mod',
    'strength_mod',
    'dexterity_mod',
    'melee_to_hit_mod',
    'musketry_to_hit_mod',
    'combat_opponent_tn',
    'melee_damage_mod',
    'combat_shot',
  ];
  getAttrs(attributes_to_get, attributes => {
    const {
      combat_attack,
      combat_roll_mod,
      strength_mod,
      dexterity_mod,
      melee_to_hit_mod,
      musketry_to_hit_mod,
      combat_opponent_tn,
      melee_damage_mod,
      combat_shot,
    } = attributes;
    let { combat_distance } = attributes;
    const weapon = weapons[combat_attack];
    const { damage, name, type } = weapon;
    const roll_data = type === 'ranged' ? roll_table['musketry'] : roll_table['melee'];

    validateRange();
    const distance_data = type === 'melee' ? {} : weapon.range[combat_distance];

    const ability_mod = type === 'melee' ? strength_mod : dexterity_mod;
    const lifepath_mod = type === 'melee' ? melee_to_hit_mod : musketry_to_hit_mod;
    const ability_damage_mod = type === 'melee' ? melee_damage_mod : 0;

    const base_mod = parseInt(ability_mod, 10) || 0;
    const base_damage_mod = parseInt(ability_damage_mod, 10) || 0;
    const lp_mod = parseInt(lifepath_mod, 10) || 0;
    const combat_mod = parseInt(combat_roll_mod, 10) || 0;

    const final_mod_display = base_mod + lp_mod + combat_mod;
    const final_mod_string = buildFinalModString();

    const ability_damage_modifier = buildAbilityDamageModifier();
    const final_damage_display = buildFinalDamageDisplay();
    const final_damage_string = buildFinalModString();
    const tn = calculateTN();

    const update = {
      combat_roll_base_mod: ability_mod || 0,
      combat_roll_base_type: roll_data.mod.substring(0, 3),
      combat_roll_lifepath_mod: lifepath_mod || 0,
      combat_roll_mod_display: final_mod_display,
      combat_roll_opponent_ability: combat_distance === 'melee' ? 'DEFENSE' : '',
      combat_distance,
      combat_short: type === 'melee' ? ' ' : ' - ' + weapon.range.short.distance,
      combat_medium: type === 'melee' ? ' ' : ' - ' + weapon.range.medium.distance,
      combat_long: type === 'melee' ? ' ' : ' - ' + weapon.range.long.distance,
      combat_initiative: weapon.initiative,
      combat_rank: formatRank(),
      roll_name: name.toUpperCase(),
      roll_die: 'd20',
      roll_tn: parseInt(tn, 10),
      roll_tn_display: tn,
      roll_damage: final_damage_string,
      roll_damage_display: final_damage_display,
      roll_final: buildRollFinal(),
    };

    setAttrs(update, { silent: true });

    return true;

    function formatRank() {
      if (weapon.rank === 0) {
        return 'any';
      }
      if (weapon.rank === 1) {
        return '1';
      }
      if (weapon.rank === 2) {
        return '1, 2';
      }
      if (weapon.rank === 3) {
        return '1, 2, 3';
      }
    }

    function calculateTN() {
      let tn = 0;
      if (combat_distance === 'melee') {
        tn = combat_opponent_tn;
      } else {
        if (combat_shot === 'shot') {
          tn = distance_data.shot;
        } else {
          tn = distance_data.tough_shot;
        }
      }
      return tn;
    }

    function validateRange() {
      if (type === 'melee') {
        combat_distance = 'melee';
      } else if (combat_distance === 'melee') {
        combat_distance = 'short';
      }
    }

    function buildRollFinal() {
      const requiresNaturalSuccess = tn === '20n' ? true : false;
      const mod = requiresNaturalSuccess ? '' : '+' + final_mod_string;

      let result = '&{template:attack}';
      result += ' {{roll=[[@{roll_die}' + mod + ']]}}';
      if (!requiresNaturalSuccess) {
        result += ' {{mod=[[' + final_mod_string + ']]}}';
      }
      if (requiresNaturalSuccess) {
        result += ' {{crit_none=true}}';
      } else if (combat_distance === 'melee') {
        const roll_max = ability_mod + lp_mod + combat_mod + 20;
        result += ' {{crit_exact=true}} {{roll_max=[[' + roll_max + ']]}}';
      } else {
        result += ' {{crit_greater=true}}';
      }
      result += buildFinalDamageString();
      result += ' {{combat_distance=' + combat_distance.charAt(0).toUpperCase() + combat_distance.slice(1) + '}}';
      result +=
        ' {{roll_tn=[[@{roll_tn}]]}} {{roll_tn_display=[[@{roll_tn_display}]]}} {{die_type=@{roll_die}}} {{roll_name=@{roll_name}}} {{character_name=@{character_name}}}';
      return result;
    }

    function buildFinalModString() {
      let mod_string = ability_mod + '[' + roll_data.mod + ' mod]';
      if (lp_mod && !isNaN(lp_mod) && lp_mod !== 0) {
        mod_string = mod_string + '+' + lp_mod + '[lifepath mod]';
      }
      if (combat_mod && !isNaN(combat_mod) && combat_mod !== 0) {
        mod_string = mod_string + '+' + combat_mod + '[other mod]';
      }
      return mod_string;
    }

    function buildFinalDamageString() {
      let string = ' {{combat_damage=[[' + damage + ability_damage_modifier + ']]}}';
      return string;
    }

    function buildAbilityDamageModifier() {
      if (combat_distance !== 'melee') {
        return '';
      }
      const final_damage_mod = base_mod + base_damage_mod;
      const operator = final_damage_mod < 0 ? '' : '+';
      return final_damage_mod !== 0 ? operator + final_damage_mod : '';
    }

    function buildFinalDamageDisplay() {
      return damage + ability_damage_modifier + ' HP';
    }
  });

  return true;
}

function closeCombatModal() {
  const update = {
    show_combat_modal: 0,
    roll_mod: 0,
  };
  setAttrs(update, { silent: true });
}
