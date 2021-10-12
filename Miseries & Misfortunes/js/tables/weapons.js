const weapons = {
  cudgel: {
    name: 'Cudgel',
    type: 'melee',
    damage: '1d4',
    rank: 1,
    initiative: '15th',
  },
  cutlass: {
    name: 'Cutlass',
    type: 'melee',
    damage: '1d6',
    rank: 1,
    initiative: '14th',
  },
  fist: {
    name: 'Fist',
    type: 'melee',
    damage: '1d2',
    rank: 1,
    initiative: '17th',
  },
  grenade: {
    name: 'Grenade',
    type: 'ranged',
    damage: '1d8',
    rank: 0,
    initiative: '18th',
    range: {
      short: {
        distance: '5sq',
        shot: 14,
        tough_shot: 18,
      },
      medium: {
        distance: '10sq',
        shot: 16,
        tough_shot: 20,
      },
      long: {
        distance: '20sq',
        shot: 18,
        tough_shot: '20n',
      },
    },
  },
  halberd: {
    name: 'Halberd',
    type: 'melee',
    damage: '1d6',
    rank: 2,
    initiative: '7th',
  },
  harquebus: {
    name: 'Harquebus',
    type: 'ranged',
    damage: '1d6',
    rank: 2,
    initiative: '2nd',
    range: {
      short: {
        distance: '50sq',
        shot: 12,
        tough_shot: 15,
      },
      medium: {
        distance: '200sq',
        shot: 15,
        tough_shot: 19,
      },
      long: {
        distance: '400sq',
        shot: 17,
        tough_shot: '20n',
      },
    },
  },
  long_sword: {
    name: 'Long Sword',
    type: 'melee',
    damage: '1d8',
    rank: 1,
    initiative: '10th',
  },
  musket: {
    name: 'Musket',
    type: 'ranged',
    damage: '2d4',
    rank: 2,
    initiative: '4th',
    range: {
      short: {
        distance: '20sq',
        shot: 12,
        tough_shot: 16,
      },
      medium: {
        distance: '100sq',
        shot: 16,
        tough_shot: 19,
      },
      long: {
        distance: '200sq',
        shot: 18,
        tough_shot: '20n',
      },
    },
  },
  mousqueton_ball: {
    name: 'Mousqueton(ball)',
    type: 'ranged',
    damage: '1d6+1',
    rank: 2,
    initiative: '2nd',
    range: {
      short: {
        distance: '10sq',
        shot: 14,
        tough_shot: 16,
      },
      medium: {
        distance: '50sq',
        shot: 16,
        tough_shot: 20,
      },
      long: {
        distance: '100sq',
        shot: 20,
        tough_shot: '20n',
      },
    },
  },
  mousqueton_shot: {
    name: 'Mousqueton(shot)',
    type: 'ranged',
    damage: '1d6+1',
    rank: 2,
    initiative: '2nd',
    range: {
      short: {
        distance: '5sq',
        shot: 10,
        tough_shot: 15,
      },
      medium: {
        distance: '10sq',
        shot: 15,
        tough_shot: 17,
      },
      long: {
        distance: '20sq',
        shot: 18,
        tough_shot: 20,
      },
    },
  },
  pike: {
    name: 'Pike',
    type: 'melee',
    damage: '1d6',
    rank: 3,
    initiative: '6th',
  },
  poignard: {
    name: 'Poignard',
    type: 'melee',
    damage: '1d3',
    rank: 1,
    initiative: '12th',
  },
  pistol: {
    name: 'Pistol',
    type: 'ranged',
    damage: '1d4',
    rank: 2,
    initiative: '1st',
    range: {
      short: {
        distance: '5sq',
        shot: 13,
        tough_shot: 17,
      },
      medium: {
        distance: '20sq',
        shot: 15,
        tough_shot: 19,
      },
      long: {
        distance: '30sq',
        shot: 17,
        tough_shot: '20n',
      },
    },
  },
  plug_bayonet: {
    name: 'Plug Bayonet',
    type: 'melee',
    damage: '1d4',
    rank: 2,
    initiative: '8th',
  },
  rapier: {
    name: 'Rapier',
    type: 'melee',
    damage: '1d4',
    rank: 1,
    initiative: '9th',
  },
  rifle: {
    name: 'Rifle',
    type: 'ranged',
    damage: '1d8',
    rank: 2,
    initiative: '3rd',
    range: {
      short: {
        distance: '50sq',
        shot: 12,
        tough_shot: 14,
      },
      medium: {
        distance: '200sq',
        shot: 14,
        tough_shot: 18,
      },
      long: {
        distance: '400sq',
        shot: 16,
        tough_shot: 20,
      },
    },
  },
  saber: {
    name: 'Saber',
    type: 'melee',
    damage: '2d3',
    rank: 1,
    initiative: '11th',
  },
  thrown_knife: {
    name: 'Thrown Knife',
    type: 'ranged',
    damage: '1d3',
    rank: 1,
    initiative: '16th',
    range: {
      short: {
        distance: '5sq',
        shot: 13,
        tough_shot: 17,
      },
      medium: {
        distance: '10sq',
        shot: 15,
        tough_shot: 19,
      },
      long: {
        distance: '20sq',
        shot: 17,
        tough_shot: '20n',
      },
    },
  },
};
