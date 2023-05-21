
const ancestries = {
  'construct': { 
    stats: { edge: 2, heart: 0, iron: 4, shadow: 3, wits: 2 }, 
    aspects: [ 'Gifted', 'Fated', 'Martially trained', 'Versatile', 'Burdened', 'Immune', 'Resistant', 'Valorous' ],
    age: { young: null, mature: null }
  },
  'dark dwarf': {
    stats: { edge: 1, heart: 1, iron: 4, shadow: 5, wits: 2 },
    aspects: [ 'Adaptable', 'Immune', 'Dark vision', 'Strong', 'Depths denizen', 'Brutal', 'Crafty', 'Resistant' ],
    age: { young: 55, mature: 120 }
  },
  'dark elf': { 
    stats: { edge: 3, heart: 0, iron: 2, shadow: 6, wits: 2 }, 
    aspects: [ 'Martially trained', 'Adaptable', 'Immune', 'Dark vision', 'Keen senses', 'Tricky', 'Depths denizen', 'Conniving' ],
    age: { young: 153, mature: 330 }
  },
  'deep gnome': { 
    stats: { edge: 1, heart: 1, iron: 3, shadow: 4, wits: 4 },
    aspects: [ 'Lucky', 'Striver', 'Dark vision', 'Keen senses', 'Smart', 'Depths denizen', 'Resistant' ],
    age: { young: 55, mature: 120 }
  },
  'dwarf': {
    stats: { edge: 1, heart: 2, iron: 4, shadow: 3, wits: 3 },
    aspects: [ 'Martially trained', 'Adaptable', 'Dark vision', 'Strong', 'Depths denizen', 'Crafty', 'Forager', 'Resistant' ],
    age: { young: 55, mature: 120 }
  },
  'ebu gogo': {
    stats: { edge: 5, heart: 1, iron: 3, shadow: 4, wits: 0 },
    aspects: [ 'Dark vision', 'Keen senses', 'Light-footed', 'Tricky', 'Depths denizen', 'Brutal', 'Forager', 'Valorous' ],
    age: { young: 20, mature: 45 }
  },
  'elf': {
    stats: { edge: 4, heart: 2, iron: 1, shadow: 3, wits: 3 },
    aspects: [ 'Martially trained', 'Adaptable', 'Immune', 'Keen senses', 'Light-footed', 'Intuitive traveller', 'Sensitive', 'Survivalist' ],
    age: { young: 153, mature: 330 }
  },
  'gnome': {
    stats: { edge: 0, heart: 4, iron: 2, shadow: 3, wits: 4 },
    aspects: [ 'Lucky', 'Striver', 'Keen senses', 'Smart', 'Inquisitive', 'Charming', 'Cheerful', 'Crafty', 'Resistant' ],
    age: { young: 55, mature: 120 }
  },
  'goblin': {
    stats: { edge: 4, heart: 1, iron: 1, shadow: 5, wits: 2 },
    aspects: [ 'Martially trained', 'Striver', 'Dark vision', 'Keen senses', 'Light-footed', 'Tricky', 'Conniving', 'Forager', 'Survivalist' ],
    age: { young: 15, mature: 36 }
  },
  'half elf': {
    stats: { edge: 3, heart: 3, iron: 1, shadow: 3, wits: 3 },
    aspects: [ 'Versatile', 'Keen senses', 'Smart', 'Charming', 'Intuitive traveler', 'Congenial', 'Survivalist' ],
    age: { young: 27, mature: 60 }
  },
  'half-ogre': {
    stats: { edge: 1, heart: 2, iron: 5, shadow: 4, wits: 1 },
    aspects: [ 'Striver', 'Dark vision', 'Rampager', 'Strong', 'Intimidating', 'Brutal', 'Resistant', 'Valorous' ],
    age: { young: 18, mature: 42 }
  },
  'half-orc': {
    stats: { edge: 2, heart: 2, iron: 4, shadow: 3, wits: 2 },
    aspects: [ 'Martially trained', 'Adaptable', 'Dark vision', 'Strong', 'Intimidating', 'Brutal', 'Hard to die' ],
    age: { young: 18, mature: 42 }
  },
  'half-troll': {
    stats: { edge: 2, heart: 3, iron: 4, shadow: 3, wits: 1 },
    aspects: [ 'Naturally armed', 'Striver', 'Dark vision', 'Strong', 'Regenerative', 'Forager', 'Survivalist', 'Resistant', 'Valorous' ],
    age: { young: 15, mature: 36 }
  },
  'halfling': {
    stats: { edge: 3, heart: 5, iron: 0, shadow: 3, wits: 2 },
    aspects: [ 'Lucky', 'Adaptable', 'Keen senses', 'Light-footed', 'Brave', 'Valorous' ],
    age: { young: 27, mature: 60 }
  },
  'hobgoblin': {
    stats: { edge: 3, heart: 1, iron: 3, shadow: 4, wits: 2 },
    aspects: [ 'Martially trained', 'Striver', 'Dark vision', 'Keen senses', 'Strong', 'Tricky', 'Intimidating', 'Brutal', 'Resistant' ],
    age: { young: 15, mature: 36 }
  },
  'human': {
    stats: { edge: 2, heart: 2, iron: 2, shadow: 2, wits: 2 },
    aspects: [ 'High potential', 'Gifted', 'Specialized', 'Fated', 'Versatile', 'Inquisitive', 'Congenial' ],
    age: { young: 20, mature: 45 }
  },
  'menehune': {
    stats: { edge: 2, heart: 3, iron: 0, shadow: 3, wits: 5 },
    aspects: [ 'Adaptable', 'Dark vision', 'Keen senses', 'Light-footed', 'Smart', 'Intuitive traveller' ],
    age: { young: 55, mature: 120 }
  },
  'samsaran': {
    stats: { edge: 2, heart: 3, iron: 0, shadow: 3, wits: 5 },
    aspects: [ 'Specialized', 'Fated', 'Striver', 'Smart', 'Hard to die' ],
    age: { young: 83, mature: 180 }
  },
  'undead': {
    stats: { edge: 2, heart: 1, iron: 2, shadow: 6, wits: 2 },
    aspects: [ 'Fated', 'Striver', 'Burdened', 'Immune', 'Depths denizen', 'Resistant', 'Valorous', 'Hard to die' ],
    age: { young: null, mature: null }
  },
  'air sprite': {
    stats: {edge: 4, heart: 2, iron: 0, shadow: 5, wits: 2},
    aspects: ['Martially trained', 'Striver', 'Immune', 'Light-footed', 'Tricky', 'Charming', 'Conniving', 'Inquisitive', 'Intuitive traveller', 'Cheerful'],
    age: { young: 83, mature: 180 }
  },
  'airborn': {
    stats: {edge: 4, heart: 2, iron: 1, shadow: 4, wits: 2},
    aspects: ['Martially trained', 'Striver', 'Immune', 'Light-footed', 'Tricky', 'Elemental kin', 'Intuitive traveller', 'Conniving '],
    age: { young: 20, mature: 45 }
  },
  'earth sprite': {
    stats: {edge: 2, heart: 2, iron: 4, shadow: 5, wits: 0 },
    aspects: ['Martially trained', 'Immune', 'Crewed', 'Strong', 'Tricky ', 'Intimidating', 'Valorous', 'Hard to die'],
    age: { young: 83, mature: 180 }
  },
  'earthborn': {
    stats: {edge: 1, heart: 2, iron: 5, shadow: 3, wits: 2},
    aspects: ['Martially trained', 'Striver', 'Immune', 'Strong', 'Elemental kin', 'Resistant', 'Hard to die'],
    age: { young: 20, mature: 45 }
  },
  'fire sprite': {
    stats: {edge: 2, heart: 4, iron: 2, shadow: 3, wits: 2 },
    aspects: ['Martially trained', 'Immune', 'Crewed', 'Strong', 'Tricky ', 'Intimidating', 'Valorous', 'Hard to die'],
    age: { young: 83, mature: 180 }
  },
  'fireborn': {
    stats: {edge: 2, heart: 5, iron: 2, shadow: 2, wits: 2 },
    aspects: ['Fated ', 'Immune ', 'Rampager ', 'Brave ', 'Elemental kin', 'Intimidating', 'Brutal'],
    age: { young: 20, mature: 45 }
  },
  'water sprite': {
    stats: {edge: 3, heart: 2, iron: 1, shadow: 3, wits: 3 },
    aspects: ['Fated ', 'Versatile ', 'Immune ', 'Smart ', 'Charming', 'Conniving', 'Sensitive'],
    age: { young: 83, mature: 180 }
  },
  'waterborn': {
    stats: {edge: 2, heart: 1, iron: 2, shadow: 3, wits: 5},
    aspects: ['Fated ', 'Versatile ', 'Immune ', 'Smart ', 'Elemental kin'],
    age: { young: 20, mature: 45 }
  },
  'amphibian': {
    stats: {edge: 3, heart: 2, iron: 2, shadow: 4, wits: 2 },
    aspects: ['Adaptable ','Immune ','Dark vision ','Keen senses ','Tricky','Animal kin','Regenerative'],
    age: { young: 15, mature: 36 }
  },
  'apefolk': {
    stats: {edge: 3, heart: 2, iron: 4, shadow: 1, wits: 3 },
    aspects: ['Martially trained','Rampager','Light-footed','Strong ','Animal kin','Intimidating','Brutal','Valorous'],
    age: { young: 15, mature: 36 }
  },
  'chiropteran': {
    stats: {edge: 3, heart: 1, iron: 1, shadow: 6, wits: 2 },
    aspects: ['Naturally armed ','Dark vision ','Keen senses ','Crewed ','Light-footed','Tricky','Animal kin','Valorous'],
    age: { young: 20, mature: 45 }
  },
  'elephantine': {
    stats: {edge: 0, heart: 3, iron: 4, shadow: 2, wits: 4 },
    aspects: ['Naturally armed ','Rampager ','Keen senses ','Brave ','Strong ','Intuitive traveller ','Animal kin ','Resistant'],
    age: { young: 27, mature: 60 }
  },
  'faun': {
    stats: {edge: 2, heart: 5, iron: 1, shadow: 2, wits: 3},
    aspects: ['Naturally armed ','Brave ','Smart ','Intuitive traveler ','Animal kin','Charming','Sensitive','Cheerful ','Survivalist'],
    age: { young: 20, mature: 45 }
  },
  'feline': {
    stats: {edge: 5, heart: 1, iron: 1, shadow: 4, wits: 2},
    aspects: ['Naturally armed ','Dark vision ','Keen senses', 'Light-footed','Tricky','Inquisitive','Intuitive traveller ','Animal kin','Predator','Survivalist'],
    age: { young: 20, mature: 45 }
  },
  'hogfolk': {
    stats: {edge: 2, heart: 1, iron: 3, shadow: 2, wits: 5 },
    aspects: ['Rampager ','Keen senses ','Strong ','Smart ','Inquisitive ','Animal kin','Forager','Survivalist'],
    age: { young: 20, mature: 45 }
  },
  'houndfolk': {
    stats: {edge: 2, heart: 4, iron: 2, shadow: 2, wits: 3},
    aspects: ['Naturally armed ','Striver ','Keen senses ','Brave ','Smart','Animal kin','Charming','Intimidating ','Congenial','Cheerful'],
    age: { young: 20, mature: 45 }
  },
  'kitsune': {
    stats: {edge: 3, heart: 2, iron: 0, shadow: 6, wits: 2 },
    aspects: ['Naturally armed ','Keen senses ','Light-footed ','Tricky ','Animal kin','Conniving','Cheerful','Forager'],
    age: { young: 20, mature: 45 }
  },
  'leporine': {
    stats: {edge: 3, heart: 5, iron: 1, shadow: 2, wits: 2 },
    aspects: ['Lucky ','Dark vision ','Keen senses ','Light-footed ','Brave','Animal kin','Valorous'],
    age: { young: 20, mature: 45 }
  },
  'lizardfolk': {
    stats: {edge: 3, heart: 2, iron: 4, shadow: 4, wits: 0},
    aspects: ['Naturally armed ','Immune ','Dark vision', 'Light-footed','Tricky','Animal kin','Regenerative ','Resistant'],
    age: { young: 20, mature: 45 }
  },
  'lupine': {
    stats: {edge: 5, heart: 0, iron: 3, shadow: 3, wits: 2},
    aspects: ['Naturally armed ','Dark vision ','Keen senses', 'Light-footed','Animal kin','Intimidating','Brutal ','Predator','Valorous'],
    age: { young: 20, mature: 45 }
  },
  'minotaur': {
    stats: {edge: 2, heart: 0, iron: 5, shadow: 3, wits: 3},
    aspects: ['Naturally armed ','Dark vision ','Rampager ','Strong ','Depths denizen','Animal kin','Intimidating','Brutal ','Hard to die'],
    age: { young: 20, mature: 45 }
  },
  'ophidian': {
    stats: {edge: 3, heart: 1, iron: 2, shadow: 6, wits: 1 },
    aspects: ['Immune ','Dark vision ','Keen senses ','Light-footed ','Tricky','Animal kin','Conniving','Brutal','Predator'],
    age: { young: 27, mature: 60 }
  },
  'owlfolk': {
    stats: {edge: 2, heart: 0, iron: 2, shadow: 4, wits: 5 },
    aspects: ['Dark vision ','Keen senses ','Tricky ','Smart', 'Animal kin','Predator','Valorous','Hard to die'],
    age: { young: 15, mature: 36 }
  },
  'pantherine': {
    stats: {edge: 3, heart: 0, iron: 4, shadow: 4, wits: 2},
    aspects: ['Martially trained ','Dark vision ','Keen senses ','Strong ','Tricky','Animal king','Intimidating','Brutal', 'Predator'],
    age: { young: 20, mature: 45 }
  },
  'raccoonian': {
    stats: {edge: 3, heart: 2, iron: 0, shadow: 4, wits: 4},
    aspects: ['Immune ','Dark vision ','Light-footed ','Tricky ','Smart ','Inquisitive','Animal kin','Charming','Forager', 'Survivalist'],
    age: { young: 20, mature: 45 }
  },
  'raptorfolk': {
    stats: {edge: 4, heart: 2, iron: 2, shadow: 1, wits: 4},
    aspects: ['Martially trained ','Keen senses ','Light-footed ','Smart ','Inquisitive','Intuitive traveller','Animal kin ','Charming','Predator','Survivalist'],
    age: { young: 15, mature: 36 }
  },
  'rhinofolk': {
    stats: {edge: 1, heart: 3, iron: 5, shadow: 2, wits: 2},
    aspects: ['Naturally armed ','Keen senses ','Brave ','Strong ','Animal kin','Brutal','Survivalist','Resistant'],
    age: { young: 27, mature: 60 }
  },
  'rodentfolk': {
    stats: {edge: 3, heart: 0, iron: 2, shadow: 5, wits: 3},
    aspects: ['Naturally armed ','Dark vision ','Keen senses ','Tricky ','Smart','Inquisitive','Depths denizen','Animal kin ','Forager','Survivalist'],
    age: { young: 20, mature: 45 }
  },
  'tengu': {
    stats: {edge: 3, heart: 1, iron: 1, shadow: 5, wits: 3},
    aspects: ['Naturally armed ','Light-footed ','Tricky ','Inquisitive ','Animal kin ','Conniving ','Forager ','Survivalist ','Hard to die'],
    age: { young: 20, mature: 45 }
  },
  'testudine': {
    stats: {edge: 0, heart: 3, iron: 2, shadow: 3, wits: 5},
    aspects: ['Striver ','Brave ','Smart ','Inquisitive ','Animal kin ','Charming','Sensitive','Resistant','Hard to die'],
    age: { young: 27, mature: 60 }
  },
  'ursine': {
    stats: {edge: 0, heart: 3, iron: 5, shadow: 3, wits: 2},
    aspects: ['Naturally armed ','Immune ','Dark vision ','Keen senses ','Brave ','Strong ','Animal kin ','Intimidating','Resistant'],
    age: { young: 20, mature: 45 }
  },
  'vanara': {
    stats: {edge: 5, heart: 2, iron: 1, shadow: 3, wits: 2},
    aspects: ['Lucky ','Light-footed ','Tricky','Animal kin ','Charming ','Conniving ','Congenial ','Cheerful ','Valorous'],
    age: { young: 20, mature: 45 }
  },
}

on('change:ancestry', function(values) {
  try {
    let selectedAncestry = ancestries[values.newValue.toLowerCase()]
    setAttrs({
      'edge': selectedAncestry.stats.edge,
      'heart': selectedAncestry.stats.heart,
      'iron': selectedAncestry.stats.iron,
      'shadow': selectedAncestry.stats.shadow,
      'wits': selectedAncestry.stats.wits
    });
  } catch (e) {
    console.error('Ancestry does not exist.')
  }
});

const ageModifiers = {
  'young': { edge: 3, heart: 1, iron: 3, shadow: 2, wits: 1 },
  'adult': { edge: 2, heart: 2, iron: 2, shadow: 2, wits: 2 },
  'mature': { edge: 1, heart: 3, iron: 1, shadow: 2, wits: 3 }
}

on('change:age', function(values) {
  try {
    const ageValue = values.newValue.toLowerCase()
    let selectedAge
    if (ageValue  == 'young' || ageValue  == 'adult' || ageValue  == 'mature') {
      selectedAge = ageModifiers[values.newValue.toLowerCase()]
      updateStats(selectedAge)
    } else {
      getAttrs(['ancestry'], function(ancestryValue) {
        let selectedAncestry = ancestries[ancestryValue.ancestry.toLowerCase()]
        if (parseInt(ageValue) <= selectedAncestry.age.young) {
          selectedAge = ageModifiers['young']
          updateStats(selectedAge)
        } else if (parseInt(ageValue) > selectedAncestry.age.young && parseInt(ageValue) < selectedAncestry.age.mature) {
          selectedAge = ageModifiers['adult']
          updateStats(selectedAge)
        } else if (parseInt(ageValue) >= selectedAncestry.age.mature) {
          selectedAge = ageModifiers['mature']
          updateStats(selectedAge)
        } else {
          console.error('Age value is not a number.')
        }
      }) 
    }

    function updateStats (selectedAge) {
      getAttrs(['edge','heart','iron','shadow','wits'], function(values) {
        const maxEdge = parseInt(values.edge) + parseInt(selectedAge.edge)
        const maxHeart = parseInt(values.heart) + parseInt(selectedAge.heart)
        const maxIron = parseInt(values.iron) + parseInt(selectedAge.iron)
        const maxShadow = parseInt(values.shadow) + parseInt(selectedAge.shadow)
        const maxWits = parseInt(values.wits) + parseInt(selectedAge.wits)
        setAttrs({ 
          'max_edge': maxEdge,
          'max_heart': maxHeart,
          'max_iron': maxIron,
          'max_shadow': maxShadow,
          'max_wits': maxWits
        });
      });
    }
  } catch (e) {
    console.error('Age value is not supported.')
  }
});