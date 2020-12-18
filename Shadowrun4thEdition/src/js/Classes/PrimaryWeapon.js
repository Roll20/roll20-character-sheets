class PrimaryWeapon {
  constructor(type) {
    this[`primary_${type}_weapon`] = 'select a Primary in Arms',
    this[`primary_${type}_weapon_skill`] = type === 'range' ?  '@{firearms}' : '@{closecombat}',
    this[`primary_${type}_weapon_damage`] = '',
    this[`primary_${type}_weapon_dicepool`] = '',
    this[`primary_${type}_weapon_ap`] = ''
  }
}

class PrimaryRangeWeapon extends PrimaryWeapon {
  constructor(type) {
    super(type)
    this[`primary_${type}_weapon_mode`] = '',
    this[`primary_${type}_weapon_recoil`] = '',
    this[`primary_${type}_weapon_ammo`] = '',
    this[`primary_${type}_weapon_ammo_max`] = ''
  }
}

class PrimaryMeleeWeapon extends PrimaryWeapon {
  constructor(type) {
    super(type)
    this[`primary_${type}_weapon_reach`] = ''
  }
}

