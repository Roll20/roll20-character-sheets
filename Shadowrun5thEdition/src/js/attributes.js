
const sheetAttributes = {
  attributes: ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition', 'charisma', 'edge'],
  translationsAttributes: ['attribute', 'body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition', 'charisma', 'edge', 'none'],
  repeating: ['quality', 'martial', 'items', 'range', 'melee', 'armor', 'spell', 'preps', 'ritual', 'powers', 'forms', 'vehicle', 'augementations', 'lifestyle', 'contacts', 'programs'],
  repeatingSkills: ['active', 'knowledge', 'language'],
  tabs: [`core`, `arms`, `augs`, `gear`, `magic`, `matrix`, `social`, `vehicle`, `options`],
  woundCalculation: ['high_pain_tolerance', 'low_pain_tolerance', 'damage_compensators_physical', 'damage_compensators_stun', 'stun', 'physical'],
  
  attributeLimits: ['mental_limit', 'physical_limit', 'social_limit'],
  mental_limit: ['intuition', 'willpower', 'logic'],
  physical_limit: ['body', 'reaction', 'strength'],
  social_limit: ['essence', 'willpower', 'charisma'],

  calculatedAttributes: ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition','charisma','magic', 'resonance', 'attack', 'sleaze', 'data_processing', 'firewall'],

  initiative_mod: ['reaction', 'intuition', 'initiative_mod_modifier', 'initiative_mod_temp', 'initiative_mod_temp_flag'],
  astral_mod: ['intuition', 'astral_mod_modifier'],
  matrix_mod: [],

  derivedAttributes: ['memory', 'composure', 'defense', 'soak', 'overflow', 'judge_intentions', 'lift_carry'],
  lift_carry: ['body', 'strength', 'lift_carry_modifier'],
  overflow: ['body', 'overflow_modifier'],
  soak: ['body', 'armor_rating', 'soak_modifier', 'soak_temp', `soak_temp_flag`],
  defense: ['reaction', 'intuition', 'defense_modifier', 'defense_temp', `defense_temp_flag`],
  judge_intentions: ['charisma', 'intuition', 'judge_intentions_modifier'],
  composure: ['charisma', 'willpower', 'composure_modifier'],
  memory: ['logic', 'willpower', 'memory_modifier'],

  conditionTracks: ['stun', 'physical', 'matrix'],
  physical: ['physical_modifier', 'body', 'sheet_type', 'flag_drone'],
  stun: ['stun_modifier', 'willpower'],
  matrix: ['matrix_modifier', 'device_rating'],

  stunCharacters: ['grunt', 'pc'],
  physicalCharacters: ['grunt', 'pc', 'vehicle'],
  matrixCharacters: ['vehicle', 'host', 'sprite'],
  matrixAttributes: ['attack', 'sleaze', 'data_processing', 'firewall'],

  weaponTypes: ['range', 'melee'],
  rangeAttributes: ['dicepool', 'weapon', 'damage', 'acc', 'ap', 'skill', 'ammo', 'mode', 'recoil'],
  meleeAttributes: ['dicepool', 'weapon', 'damage', 'acc', 'ap', 'skill', 'reach'],

  spellTypes: ['spell', 'preps', 'ritual', 'forms'],

  armorAttributes: ['name', 'rating', 'acid_modifier', 'electrical_modifier', 'cold_modifier', 'fire_modifier', 'radiation_modifier', 'dicepool_modifier'],
  armorSoak: ['dicepool_modifier', 'rating'],
  armorProtections: ['acid', 'electrical', 'cold', 'fire', 'radiation']
}

