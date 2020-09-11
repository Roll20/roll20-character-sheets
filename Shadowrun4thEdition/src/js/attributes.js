
const sheetAttributes = {
  attributes: ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition', 'charisma', 'edge'],
  translationsAttributes: ['attribute', 'body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition', 'charisma', 'edge', 'none'],
  repeating: ['quality', 'martial', 'items', 'range', 'melee', 'armor', 'spell', 'preps', 'ritual', 'powers', 'forms', 'vehicle', 'augementations', 'lifestyle', 'contacts', 'programs'],
  repeatingSkills: ['active', 'knowledge', 'language'],
  tabs: [`core`, `arms`, `augs`, `gear`, `magic`, `matrix`, `social`, `vehicle`, `options`],
  woundCalculation: ['high_pain_tolerance', 'low_pain_tolerance', 'damage_compensators_physical', 'damage_compensators_stun', 'stun', 'physical'],
  
  calculatedAttributes: ['body', 'agility', 'reaction', 'strength', 'willpower', 'logic', 'intuition','charisma','magic', 'resonance', 'attack', 'sleaze', 'data_processing', 'firewall'],

  initiative: ['reaction', 'intuition', 'initiative_modifier', 'initiative_temp', 'initiative_temp_flag'],
  initiative_passes: ['initiative_passes_base', 'initiative_passes_modifier', 'initiative_passes_temp', 'initiative_passes_temp_flag'],
  astral_initiative: ['intuition', 'astral_initiative_modifier'],
  matrix_initiative: [],

  derivedAttributes: ['memory', 'composure', 'defense', 'soak', 'overflow', 'judge_intentions', 'lift_carry'],
  lift_carry: ['body', 'strength', 'lift_carry_modifier'],
  overflow: ['body', 'overflow_modifier'],
  soak: ['body', 'soak_modifier', 'soak_temp', `soak_temp_flag`],
  defense: ['reaction', 'defense_modifier', 'defense_temp', `defense_temp_flag`],
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
  rangeAttributes: ['dicepool', 'weapon', 'damage', 'ap', 'skill', 'ammo', 'mode', 'recoil'],
  meleeAttributes: ['dicepool', 'weapon', 'damage', 'ap', 'skill', 'reach'],

  spellTypes: ['spell', 'preps', 'ritual', 'forms'],

  armorAttributes: ['name', 'impact', 'ballistic', 'modifier'],
  armorSoak: ['modifier', 'rating'],
  armorProtections: ['impact', 'acid', 'electrical', 'cold', 'fire', 'falling']
}

