const wits_attacks = {
  accuse: {
    intimate: {
      tn: 'Intelligence',
      dmg: '1d6',
    },
    speaking: {
      tn: 12,
      dmg: '2d4',
    },
    shouting: {
      tn: 16,
      dmg: '1d4',
    },
    press: {
      tn: 12,
      dmg: '2d6; 1d6',
    },
    rof: '1 every 3 rounds',
    name: 'Accuse',
  },
  beg_pardon: {
    intimate: {
      tn: 'Charisma',
      dmg: '1d6',
    },
    speaking: {
      tn: 9,
      dmg: '1d4',
    },
    shouting: {
      tn: 18,
      dmg: '1d2',
    },
    press: {
      tn: 16,
      dmg: '1d4',
    },
    rof: '1 every other round',
    name: 'Beg Pardon',
  },
  bribe: {
    intimate: {
      tn: 'Wisdom',
      dmg: '1d4',
    },
    speaking: {
      tn: 14,
      dmg: '1d3',
    },
    shouting: {
      tn: 19,
      dmg: '1d2',
    },
    press: {
      tn: 20,
      dmg: '1d6',
    },
    rof: 'Once per combat',
    name: 'Bribe',
  },
  confess: {
    intimate: {
      tn: 'Wisdom',
      dmg: '2d4',
    },
    speaking: {
      tn: 14,
      dmg: '1d6',
    },
    shouting: {
      tn: 20,
      dmg: '1d3',
    },
    press: {
      tn: 16,
      dmg: '1d6; 1d8',
    },
    rof: 'Once per combat',
    name: 'Confess',
  },
  educate: {
    intimate: {
      tn: 'Intelligence',
      dmg: '2d3',
    },
    speaking: {
      tn: 16,
      dmg: '1d6',
    },
    shouting: {
      tn: '20n',
      dmg: '1d2',
    },
    press: {
      tn: 18,
      dmg: '1d3',
    },
    rof: '1 every other round',
    name: 'Educate',
  },
  flatter: {
    intimate: {
      tn: 'Wisdom',
      dmg: '1d6',
    },
    speaking: {
      tn: 13,
      dmg: '1d4',
    },
    shouting: {
      tn: 18,
      dmg: '1d2',
    },
    press: {
      tn: 14,
      dmg: '1d4',
    },
    rof: 'Once per round',
    name: 'Flatter',
  },
  implore: {
    intimate: {
      tn: 'Wisdom',
      dmg: '2d3',
    },
    speaking: {
      tn: 15,
      dmg: '1d6',
    },
    shouting: {
      tn: 20,
      dmg: '1d2',
    },
    press: {
      tn: '20n',
      dmg: '1d8',
    },
    rof: 'Once per round',
    name: 'Implore',
  },
  insult: {
    intimate: {
      tn: 'Intelligence',
      dmg: '1d4; 1d2-1',
    },
    speaking: {
      tn: 11,
      dmg: '1d8; 1d2',
    },
    shouting: {
      tn: 16,
      dmg: '1d6; 1d3',
    },
    press: {
      tn: 9,
      dmg: '1d6; 1d6',
    },
    rof: '1 every other round',
    name: 'Insult',
  },
  poison: {
    intimate: {
      tn: 'Intelligence',
      dmg: '1d8',
    },
    speaking: {
      tn: 15,
      dmg: '1d6',
    },
    shouting: {
      tn: 20,
      dmg: '1d2',
    },
    press: {
      tn: 10,
      dmg: '1d6; 1d6+1',
    },
    rof: '1 every other round',
    name: 'Poison',
  },
  seduce: {
    intimate: {
      tn: 'Charisma',
      dmg: '2d4',
    },
    speaking: {
      tn: 14,
      dmg: '1d4',
    },
    shouting: {
      tn: 19,
      dmg: '1d2',
    },
    press: {
      tn: '20n',
      dmg: '1d2',
    },
    rof: '1 every other round',
    name: 'Seduce',
  },
  shame: {
    intimate: {
      tn: 'Wisdom',
      dmg: '1d4',
    },
    speaking: {
      tn: 12,
      dmg: '2d4',
    },
    shouting: {
      tn: 17,
      dmg: '1d10',
    },
    press: {
      tn: 16,
      dmg: '1d4; 1d6',
    },
    rof: 'Once per round',
    name: 'Shame',
  },
  threaten: {
    intimate: {
      tn: 'Intelligence',
      dmg: '1d8+1',
    },
    speaking: {
      tn: 15,
      dmg: '1d6',
    },
    shouting: {
      tn: 20,
      dmg: '1d4',
    },
    press: {
      tn: 15,
      dmg: '1d6',
    },
    rof: '1 every other round',
    name: 'Threaten',
  },
};
