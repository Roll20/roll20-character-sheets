class PrimaryArmor {
  constructor(name) {
    this.armor_name = name || 'select a Primary in Arms',
    this.soak = 0,
    this.soak_modifier = 0,
    this.armor_rating = 0,
    this.acid_modifier = 0,
    this.cold_modifier = 0,
    this.fire_modifier = 0,
    this.radiation_modifier = 0,
    this.electrical_modifier = 0
  }
}