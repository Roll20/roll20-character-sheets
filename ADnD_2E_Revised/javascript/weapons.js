//#region Player's Handbook
const WEAPONS_TABLE = {};
WEAPONS_TABLE['arquebus'] = [];
WEAPONS_TABLE['arquebus'].push({
    'name': 'Arquebus',
    'size': 'M',
    'type': 'P',
    'speed': 15,
    'rof': '1/3',
    'range': '50/150/210',
    'small-medium': '1d10!',
    'large': '1d10!',
    'book': ['PHB', 'Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['battle axe'] = [];
WEAPONS_TABLE['battle axe'].push({
    'name': 'Battle axe',
    'size': 'M',
    'type': 'S',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['PHB', 'Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['blowgun, barbed dart'] = [];
WEAPONS_TABLE['blowgun, barbed dart'].push({
    'name': 'Blowgun, Barbed Dart',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '2/1',
    'range': '10/20/30',
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['PHB','Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['blowgun, needle'] = [];
WEAPONS_TABLE['blowgun, needle'].push({
    'name': 'Blowgun, Needle',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '2/1',
    'range': '10/20/30',
    'small-medium': '1',
    'large': '1',
    'book': ['PHB', 'Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['short bow, flight arrow'] = [];
WEAPONS_TABLE['short bow, flight arrow'].push({
    'name': 'Short bow, Flight arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, flight arrow'] = [];
WEAPONS_TABLE['long bow, flight arrow'].push({
    'name': 'Long bow, Flight arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 8,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, sheaf arrow'] = [];
WEAPONS_TABLE['long bow, sheaf arrow'].push({
    'name': 'Long bow, Sheaf arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 8,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['composite short bow, flight arrow'] = [];
WEAPONS_TABLE['composite short bow, flight arrow'].push({
    'name': 'Composite short bow, Flight arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '50/100/180',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, flight arrow'] = [];
WEAPONS_TABLE['composite long bow, flight arrow'].push({
    'name': 'Composite long bow, Flight arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '60/120/210',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, sheaf arrow'] = [];
WEAPONS_TABLE['composite long bow, sheaf arrow'].push({
    'name': 'Composite long bow, Sheaf arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '40/80/170',
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['club'] = [];
WEAPONS_TABLE['club'].push({
    'name': 'Club',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d3',
    'book': ['PHB', 'Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['hand crossbow, hand quarrel'] = [];
WEAPONS_TABLE['hand crossbow, hand quarrel'].push({
    'name': 'Hand crossbow, Hand quarrel',
    'size': 'S',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '1',
    'range': '20/40/60',
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['light crossbow, light quarrel'] = [];
WEAPONS_TABLE['light crossbow, light quarrel'].push({
    'name': 'Light crossbow, Light quarrel',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '60/120/180',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['PHB','The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['heavy crossbow, heavy quarrel'] = [];
WEAPONS_TABLE['heavy crossbow, heavy quarrel'].push({
    'name': 'Heavy crossbow, Heavy quarrel',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 10,
    'rof': '1/2',
    'range': '80/160/240',
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['dagger'] = [];
WEAPONS_TABLE['dagger'].push({
    'name': 'Dagger',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['PHB','Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['dirk'] = [];
WEAPONS_TABLE['dirk'].push({
    'name': 'Dirk',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['dart'] = [];
WEAPONS_TABLE['dart'].push({
    'name': 'Dart',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '3/1',
    'range': '10/20/40',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['PHB', 'Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['footman\'s flail'] = [];
WEAPONS_TABLE['footman\'s flail'].push({
    'name': 'Footman\'s flail',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d4',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['footman\'s mace'] = [];
WEAPONS_TABLE['footman\'s mace'].push({
    'name': 'Footman\'s mace',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '1d6',
    'book': ['PHB','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['footman\'s pick'] = [];
WEAPONS_TABLE['footman\'s pick'].push({
    'name': 'Footman\'s pick',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d4',
    'book': ['PHB','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['hand axe'] = [];
WEAPONS_TABLE['hand axe'].push({
    'name': 'Hand axe',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['PHB','Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['harpoon'] = [];
WEAPONS_TABLE['harpoon'].push({
    'name': 'Harpoon',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '2d4',
    'large': '2d6',
    'book': ['PHB'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['horseman\'s flail'] = [];
WEAPONS_TABLE['horseman\'s flail'].push({
    'name': 'Horseman\'s flail',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+1',
    'large': '1d4+1',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['horseman\'s mace'] = [];
WEAPONS_TABLE['horseman\'s mace'].push({
    'name': 'Horseman\'s mace',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['PHB'],
    'category': ['Melee']
});

WEAPONS_TABLE['horseman\'s pick'] = [];
WEAPONS_TABLE['horseman\'s pick'].push({
    'name': 'Horseman\'s pick',
    'size': 'M',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['PHB','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['javelin'] = [];
WEAPONS_TABLE['javelin'].push({
    'name': 'Javelin',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'rof': '1',
    'range': '20/40/60',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['PHB'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['knife'] = [];
WEAPONS_TABLE['knife'].push({
    'name': 'Knife',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['heavy horse lance'] = [];
WEAPONS_TABLE['heavy horse lance'].push({
    'name': 'Heavy horse lance',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d8+1',
    'large': '3d6',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['light horse lance'] = [];
WEAPONS_TABLE['light horse lance'].push({
    'name': 'Light horse lance',
    'size': 'L',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['PHB','Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['jousting lance'] = [];
WEAPONS_TABLE['jousting lance'].push({
    'name': 'Jousting lance',
    'size': 'L',
    'type': 'P',
    'speed': 10,
    'small-medium': '1d3-1',
    'large': '1d2-1',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['medium horse lance'] = [];
WEAPONS_TABLE['medium horse lance'].push({
    'name': 'Medium horse lance',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d6',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['mancatcher'] = [];
WEAPONS_TABLE['mancatcher'].push({
    'name': 'Mancatcher',
    'size': 'L',
    'type': '—',
    'speed': 7,
    'small-medium': '—',
    'large': '—',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['morning star'] = [];
WEAPONS_TABLE['morning star'].push({
    'name': 'Morning star',
    'size': 'M',
    'type': 'P/B',
    'speed': 7,
    'small-medium': '2d4',
    'large': '1d6+1',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['awl pike'] = [];
WEAPONS_TABLE['awl pike'].push({
    'name': 'Awl pike',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 13,
    'small-medium': '1d6',
    'large': '1d12',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['bardiche'] = [];
WEAPONS_TABLE['bardiche'].push({
    'name': 'Bardiche',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '2d6',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['bec de corbin'] = [];
WEAPONS_TABLE['bec de corbin'].push({
    'name': 'Bec de corbin',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['bill-guisarme'] = [];
WEAPONS_TABLE['bill-guisarme'].push({
    'name': 'Bill-guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '1d10',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['fauchard'] = [];
WEAPONS_TABLE['fauchard'].push({
    'name': 'Fauchard',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['fauchard-fork'] = [];
WEAPONS_TABLE['fauchard-fork'].push({
    'name': 'Fauchard-fork',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d10',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['glaive'] = [];
WEAPONS_TABLE['glaive'].push({
    'name': 'Glaive',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d10',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['glaive-guisarme'] = [];
WEAPONS_TABLE['glaive-guisarme'].push({
    'name': 'Glaive-guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '2d6',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['guisarme'] = [];
WEAPONS_TABLE['guisarme'].push({
    'name': 'Guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '1d8',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['guisarme-voulge'] = [];
WEAPONS_TABLE['guisarme-voulge'].push({
    'name': 'Guisarme-voulge',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '2d4',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['halberd'] = [];
WEAPONS_TABLE['halberd'].push({
    'name': 'Halberd',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'small-medium': '1d10',
    'large': '2d6',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['hook fauchard'] = [];
WEAPONS_TABLE['hook fauchard'].push({
    'name': 'Hook fauchard',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['lucern hammer'] = [];
WEAPONS_TABLE['lucern hammer'].push({
    'name': 'Lucern hammer',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'small-medium': '2d4',
    'large': '1d6',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['military fork'] = [];
WEAPONS_TABLE['military fork'].push({
    'name': 'Military fork',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '2d4',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['partisan'] = [];
WEAPONS_TABLE['partisan'].push({
    'name': 'Partisan',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 9,
    'small-medium': '1d6',
    'large': '1d6+1',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['ranseur'] = [];
WEAPONS_TABLE['ranseur'].push({
    'name': 'Ranseur',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d4',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['spetum'] = [];
WEAPONS_TABLE['spetum'].push({
    'name': 'Spetum',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d6+1',
    'large': '2d6',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['voulge'] = [];
WEAPONS_TABLE['voulge'].push({
    'name': 'Voulge',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '2d4',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['quarterstaff'] = [];
WEAPONS_TABLE['quarterstaff'].push({
    'name': 'Quarterstaff',
    'size': 'L',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['scourge'] = [];
WEAPONS_TABLE['scourge'].push({
    'name': 'Scourge',
    'size': 'S',
    'type': '—',
    'speed': 5,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['sickle'] = [];
WEAPONS_TABLE['sickle'].push({
    'name': 'Sickle',
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['sling, bullet'] = [];
WEAPONS_TABLE['sling, bullet'].push({
    'name': 'Sling, Bullet',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '50/100/200',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['sling, stone'] = [];
WEAPONS_TABLE['sling, stone'].push({
    'name': 'Sling, Stone',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '40/80/160',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['spear'] = [];
WEAPONS_TABLE['spear'].push({
    'name': 'Spear',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['PHB'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['staff sling, bullet'] = [];
WEAPONS_TABLE['staff sling, bullet'].push({
    'name': 'Staff sling, Bullet',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '2/1',
    'range': '—/30-60/90',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['staff sling, stone'] = [];
WEAPONS_TABLE['staff sling, stone'].push({
    'name': 'Staff sling, Stone',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '2/1',
    'range': '—/30-60/90',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['bastard sword, one-handed'] = [];
WEAPONS_TABLE['bastard sword, one-handed'].push({
    'name': 'Bastard sword, One-handed',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'small-medium': '1d8',
    'large': '1d12',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['bastard sword, two-handed'] = [];
WEAPONS_TABLE['bastard sword, two-handed'].push({
    'name': 'Bastard sword, Two-handed',
    'size': 'M',
    'type': 'S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d8',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['broad sword'] = [];
WEAPONS_TABLE['broad sword'].push({
    'name': 'Broad sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '2d4',
    'large': '1d6+1',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['khopesh'] = [];
WEAPONS_TABLE['khopesh'].push({
    'name': 'Khopesh',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '1d6',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['long sword'] = [];
WEAPONS_TABLE['long sword'].push({
    'name': 'Long sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d8',
    'large': '1d12',
    'book': ['PHB','Arms and Equipment Guide','The Complete Ninja\'s Handbook','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['scimitar'] = [];
WEAPONS_TABLE['scimitar'].push({
    'name': 'Scimitar',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['PHB','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['short sword'] = [];
WEAPONS_TABLE['short sword'].push({
    'name': 'Short sword',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['PHB','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['two-handed sword'] = [];
WEAPONS_TABLE['two-handed sword'].push({
    'name': 'Two-handed sword',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '1d10',
    'large': '3d6',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['acid'] = [];
WEAPONS_TABLE['acid'].push({
    'name': 'Acid',
    'group': 'Throw',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '2d4',
    'large': '1',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['holy water'] = [];
WEAPONS_TABLE['holy water'].push({
    'name': 'Holy water',
    'group': 'Throw',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6+1',
    'large': '2',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['oil, lit'] = [];
WEAPONS_TABLE['oil, lit'].push({
    'name': 'Oil, lit',
    'group': 'Throw',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '2d6',
    'large': '1d3',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['poison'] = [];
WEAPONS_TABLE['poison'].push({
    'name': 'Poison',
    'group': 'Throw',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '',
    'large': '',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['throw misc.'] = [];
WEAPONS_TABLE['throw misc.'].push({
    'name': 'Throw misc.',
    'group': 'Throw',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '',
    'large': '',
    'book': ['PHB'],
    'category': ['Range']
});

WEAPONS_TABLE['trident'] = [];
WEAPONS_TABLE['trident'].push({
    'name': 'Trident',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '3d4',
    'book': ['PHB'],
    'category': ['Melee']
});

WEAPONS_TABLE['warhammer'] = [];
WEAPONS_TABLE['warhammer'].push({
    'name': 'Warhammer',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['whip'] = [];
WEAPONS_TABLE['whip'].push({
    'name': 'Whip',
    'size': 'M',
    'type': '—',
    'speed': 8,
    'small-medium': '1d2',
    'large': '1',
    'book': ['PHB','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['punching, bare-handed'] = [];
WEAPONS_TABLE['punching, bare-handed'].push({
    'name': 'Punching, Bare-handed',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['PHB'],
    'category': ['Melee']
});

WEAPONS_TABLE['punching, gauntlets / knuckles'] = [];
WEAPONS_TABLE['punching, gauntlets / knuckles'].push({
    'name': 'Punching, Gauntlets / Knuckles',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d3',
    'large': '1d3',
    'book': ['PHB'],
    'category': ['Melee']
});

WEAPONS_TABLE['wrestling'] = [];
WEAPONS_TABLE['wrestling'].push({
    'name': 'Wrestling',
    'noProf': true,
    'size': '—',
    'type': 'B',
    'speed': 3,
    'small-medium': '1',
    'large': '1',
    'book': ['PHB'],
    'category': ['Melee']
});
//#endregion

//region The Complete Fighter's Handbook
WEAPONS_TABLE['belaying pin'] = [];
WEAPONS_TABLE['belaying pin'].push({
    'name': 'Belaying pin',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d3',
    'large': '1d3',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['bo stick'] = [];
WEAPONS_TABLE['bo stick'].push({
    'name': 'Bo stick',
    'size': 'L',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['bolas'] = [];
WEAPONS_TABLE['bolas'].push({
    'name': 'Bolas',
    'size': 'M',
    'type': 'B',
    'speed': 8,
    'rof': '1',
    'range': '30/60/90',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','The Complete Barbarian\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['short bow, stone flight arrow'] = [];
WEAPONS_TABLE['short bow, stone flight arrow'].push({
    'name': 'Short bow, Stone flight arrow',
    'size': 'M',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook', 'Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, stone flight arrow'] = [];
WEAPONS_TABLE['long bow, stone flight arrow'].push({
    'name': 'Long bow, Stone flight arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 8,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook', 'Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['composite short bow, stone flight arrow'] = [];
WEAPONS_TABLE['composite short bow, stone flight arrow'].push({
    'name': 'Composite short bow, Stone flight arrow',
    'size': 'M',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '50/100/180',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook', 'Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, stone flight arrow'] = [];
WEAPONS_TABLE['composite long bow, stone flight arrow'].push({
    'name': 'Composite long bow, Stone flight arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '60/120/210',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['cestus'] = [];
WEAPONS_TABLE['cestus'].push({
    'name': 'Cestus',
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Fighter\'s Handbook', 'Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['chain'] = [];
WEAPONS_TABLE['chain'].push({
    'name': 'Chain',
    'size': 'L',
    'type': 'B',
    'speed': 5,
    'rof': '*',
    'range': '5/10/20',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook', 'Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['bone dagger'] = [];
WEAPONS_TABLE['bone dagger'].push({
    'name': 'Bone dagger',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['stone dagger'] = [];
WEAPONS_TABLE['stone dagger'].push({
    'name': 'Stone dagger',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['daikyu, daikyu arrow'] = [];
WEAPONS_TABLE['daikyu, daikyu arrow'].push({
    'name': 'Daikyu, Daikyu arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['gaff/hook'] = [];
WEAPONS_TABLE['gaff/hook'].push({
    'name': 'Gaff/hook',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Fighter\'s Handbook', 'Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['harpoon, one-handed'] = [];
WEAPONS_TABLE['harpoon, one-handed'].push({
    'name': 'Harpoon, One-handed',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['harpoon, two-handed'] = [];
WEAPONS_TABLE['harpoon, two-handed'].push({
    'name': 'Harpoon, Two-handed',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '2d4',
    'large': '2d6',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['javelin, one-handed'] = [];
WEAPONS_TABLE['javelin, one-handed'].push({
    'name': 'Javelin, One-handed',
    'size': 'L',
    'type': 'P',
    'speed': 4,
    'rof': '1',
    'range': '20/40/60',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['javelin, two-handed'] = [];
WEAPONS_TABLE['javelin, two-handed'].push({
    'name': 'Javelin, Two-handed',
    'size': 'L',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['stone javelin, one-handed'] = [];
WEAPONS_TABLE['stone javelin, one-handed'].push({
    'name': 'Stone javelin, One-handed',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 4,
    'rof': '1',
    'range': '20/40/60',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['stone javelin, two-handed'] = [];
WEAPONS_TABLE['stone javelin, two-handed'].push({
    'name': 'Stone javelin, Two-handed',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d6',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['bone knife'] = [];
WEAPONS_TABLE['bone knife'].push({
    'name': 'Bone knife',
    'noProf': true,
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['stone knife'] = [];
WEAPONS_TABLE['stone knife'].push({
    'name': 'Stone knife',
    'noProf': true,
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['lasso'] = [];
WEAPONS_TABLE['lasso'].push({
    'name': 'Lasso',
    'size': 'L',
    'type': '—',
    'speed': 10,
    'rof': '*',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '',
    'large': '',
    'book': ['The Complete Fighter\'s Handbook', 'The Complete Priest\'s Handbook', 'Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['main-gauche'] = [];
WEAPONS_TABLE['main-gauche'].push({
    'name': 'Main-gauche',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['net'] = [];
WEAPONS_TABLE['net'].push({
    'name': 'Net',
    'size': 'M',
    'type': '—',
    'speed': 10,
    'rof': '*',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '',
    'large': '',
    'book': ['The Complete Fighter\'s Handbook','The Complete Priest\'s Handbook','Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['nunchaku'] = [];
WEAPONS_TABLE['nunchaku'].push({
    'name': 'Nunchaku',
    'size': 'M',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Fighter\'s Handbook','The Complete Priest\'s Handbook','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['naginata'] = [];
WEAPONS_TABLE['naginata'].push({
    'name': 'Naginata',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d10',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['tetsubo'] = [];
WEAPONS_TABLE['tetsubo'].push({
    'name': 'Tetsubo',
    'group': 'Polearm',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['The Complete Fighter\'s Handbook','The Complete Book of Humanoids','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['sai'] = [];
WEAPONS_TABLE['sai'].push({
    'name': 'Sai',
    'size': 'S',
    'type': 'P/B',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['shuriken'] = [];
WEAPONS_TABLE['shuriken'].push({
    'name': 'Shuriken',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '20/40/60',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['spear, one-handed'] = [];
WEAPONS_TABLE['spear, one-handed'].push({
    'name': 'Spear, One-handed',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['spear, two-handed'] = [];
WEAPONS_TABLE['spear, two-handed'].push({
    'name': 'Spear, Two-handed',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d8+1',
    'large': '2d6',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['stone spear, one-handed'] = [];
WEAPONS_TABLE['stone spear, one-handed'].push({
    'name': 'Stone spear, One-handed',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d6',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['stone spear, two-handed'] = [];
WEAPONS_TABLE['stone spear, two-handed'].push({
    'name': 'Stone spear, Two-handed',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '2d4',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['long spear, one-handed'] = [];
WEAPONS_TABLE['long spear, one-handed'].push({
    'name': 'Long spear, One-handed',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d8+1',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['long spear, two-handed'] = [];
WEAPONS_TABLE['long spear, two-handed'].push({
    'name': 'Long spear, Two-handed',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '2d6',
    'large': '3d6',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['stiletto'] = [];
WEAPONS_TABLE['stiletto'].push({
    'name': 'Stiletto',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','The Complete Ranger\'s Handbook'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['cutlass'] = [];
WEAPONS_TABLE['cutlass'].push({
    'name': 'Cutlass',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['drusus'] = [];
WEAPONS_TABLE['drusus'].push({
    'name': 'Drusus',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 3,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['katana, one-handed'] = [];
WEAPONS_TABLE['katana, one-handed'].push({
    'name': 'Katana, One-handed',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'small-medium': '1d10',
    'large': '1d12',
    'book': ['The Complete Fighter\'s Handbook','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['katana, two-handed'] = [];
WEAPONS_TABLE['katana, two-handed'].push({
    'name': 'Katana, Two-handed',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'small-medium': '2d6',
    'large': '2d6',
    'book': ['The Complete Fighter\'s Handbook','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['rapier'] = [];
WEAPONS_TABLE['rapier'].push({
    'name': 'Rapier',
    'group': 'Sword',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['sabre'] = [];
WEAPONS_TABLE['sabre'].push({
    'name': 'Sabre',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['wakizashi'] = [];
WEAPONS_TABLE['wakizashi'].push({
    'name': 'Wakizashi',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 3,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['The Complete Fighter\'s Handbook','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['trident, one-handed'] = [];
WEAPONS_TABLE['trident, one-handed'].push({
    'name': 'Trident, One-handed',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '0/10/20',
    'strength': true,
    'small-medium': '1d6+1',
    'large': '3d4',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['trident, two-handed'] = [];
WEAPONS_TABLE['trident, two-handed'].push({
    'name': 'Trident, Two-handed',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8+1',
    'large': '3d4',
    'book': ['The Complete Fighter\'s Handbook','Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['shield-punch'] = [];
WEAPONS_TABLE['shield-punch'].push({
    'name': 'Shield-Punch',
    'group': 'Buckler/Small/Medium Shield',
    'noProf': true,
    'size': 'S/M',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d3',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['shield-rush'] = [];
WEAPONS_TABLE['shield-rush'].push({
    'name': 'Shield-Rush',
    'group': 'Medium/Body Shield',
    'noProf': true,
    'size': 'M/L',
    'type': 'B',
    'speed': 0,
    'small-medium': '1d3',
    'large': '1d3',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['martial arts'] = [];
WEAPONS_TABLE['martial arts'].push({
    'name': 'Martial Arts',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '',
    'large': '',
    'book': ['The Complete Fighter\'s Handbook'],
    'category': ['Melee']
});
//endregion

//region The Complete Priest's Handbook
WEAPONS_TABLE['bill'] = [];
WEAPONS_TABLE['bill'].push({
    'name': 'Bill',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Priest\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['maul'] = [];
WEAPONS_TABLE['maul'].push({
    'name': 'Maul',
    'size': 'L',
    'type': 'B',
    'speed': 9,
    'small-medium': '2d4',
    'large': '1d10',
    'book': ['The Complete Priest\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['scythe'] = [];
WEAPONS_TABLE['scythe'].push({
    'name': 'Scythe',
    'size': 'M',
    'type': 'P/S',
    'speed': 8,
    'small-medium': '1d6+1',
    'large': '1d8',
    'book': ['The Complete Priest\'s Handbook','The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});
//endregion

//#region The Complete Wizard's Handbook
WEAPONS_TABLE['bo stick'].push({
    'name': 'Bo stick',
    'size': 'L',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Wizard\'s Handbook','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['boku-toh'] = [];
WEAPONS_TABLE['boku-toh'].push({
    'name': 'Boku-toh',
    'group': 'Sword',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Wizard\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['jitte'] = [];
WEAPONS_TABLE['jitte'].push({
    'name': 'Jitte',
    'size': 'M',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Wizard\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['shuriken'].push({
    'name': 'Shuriken',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '3/1',
    'range': '5/10/20',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Wizard\'s Handbook'],
    'category': ['Range']
});
//#endregion

//#region Arms and Equipment
WEAPONS_TABLE['short bow, flight arrow'].push({
    'name': 'Short bow, Flight arrow',
    'size': 'M',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, flight arrow'].push({
    'name': 'Long bow, Flight arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 8,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, sheaf arrow'].push({
    'name': 'Long bow, Sheaf arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 8,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['composite short bow, flight arrow'].push({
    'name': 'Composite short bow, Flight arrow',
    'size': 'M',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '50/100/180',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, flight arrow'].push({
    'name': 'Composite long bow, Flight arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '60/120/210',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, sheaf arrow'].push({
    'name': 'Composite long bow, Sheaf arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '40/80/170',
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['light crossbow, light quarrel'].push({
    'name': 'Light crossbow, Light quarrel',
    'size': 'S',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '60/120/180',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['parrying dagger'] = [];
WEAPONS_TABLE['parrying dagger'].push({
    'name': 'Parrying dagger',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d3',
    'book': ['Arms and Equipment Guide','Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});

WEAPONS_TABLE['stone javelin, one-handed'].push({
    'name': 'Stone javelin, One-handed',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'rof': '1',
    'range': '20/40/60',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Arms and Equipment Guide'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['stone javelin, two-handed'].push({
    'name': 'Stone javelin, Two-handed',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d6',
    'book': ['Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['sap'] = [];
WEAPONS_TABLE['sap'].push({
    'name': 'Sap',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['staff sling, stinkpot'] = [];
WEAPONS_TABLE['staff sling, stinkpot'].push({
    'name': 'Staff sling, Stinkpot',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '',
    'range': '—/20’-40’/60’',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d3',
    'book': ['Arms and Equipment Guide'],
    'category': ['Range']
});

WEAPONS_TABLE['claymore'] = [];
WEAPONS_TABLE['claymore'].push({
    'name': 'Claymore',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d8',
    'book': ['Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['falchion'] = [];
WEAPONS_TABLE['falchion'].push({
    'name': 'Falchion',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6+1',
    'large': '2d4',
    'book': ['Arms and Equipment Guide'],
    'category': ['Melee']
});

WEAPONS_TABLE['short sword'].push({
    'name': 'Short sword',
    'size': 'M',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['Arms and Equipment Guide','The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});
//#endregion

//#region The Complete Book of Dwarves
WEAPONS_TABLE['two-handed battle axe'] = [];
WEAPONS_TABLE['two-handed battle axe'].push({
    'name': 'Two-handed Battle axe',
    'size': 'M',
    'type': 'S',
    'speed': 9,
    'small-medium': '1d10',
    'large': '2d8',
    'book': ['The Complete Book of Dwarves'],
    'category': ['Melee']
});

WEAPONS_TABLE['head spike'] = [];
WEAPONS_TABLE['head spike'].push({
    'name': 'Head spike',
    'group': 'Close Combat',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['The Complete Book of Dwarves'],
    'category': ['Melee']
});

WEAPONS_TABLE['elbow spike'] = [];
WEAPONS_TABLE['elbow spike'].push({
    'name': 'Elbow spike',
    'group': 'Close Combat',
    'noProf': true,
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Book of Dwarves'],
    'category': ['Melee']
});

WEAPONS_TABLE['knee spike'] = [];
WEAPONS_TABLE['knee spike'].push({
    'name': 'Knee spike',
    'group': 'Close Combat',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 1,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Book of Dwarves'],
    'category': ['Melee']
});

WEAPONS_TABLE['glove nail'] = [];
WEAPONS_TABLE['glove nail'].push({
    'name': 'Glove Nail',
    'group': 'Close Combat',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['The Complete Book of Dwarves'],
    'category': ['Melee']
});

WEAPONS_TABLE['chain flail'] = [];
WEAPONS_TABLE['chain flail'].push({
    'name': 'Chain flail',
    'group': 'Close Combat',
    'size': 'L',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+2',
    'large': '1d4+1',
    'book': ['The Complete Book of Dwarves'],
    'category': ['Melee']
});
//#endregion

//#region The Complete Book of Elves
WEAPONS_TABLE['bow, melee'] = [];
WEAPONS_TABLE['bow, melee'].push({
    'name': 'Bow, Melee',
    'noProf': true,
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6-1',
    'large': '1d4',
    'book': ['The Complete Book of Elves'],
    'category': ['Melee']
});

WEAPONS_TABLE['elven bow, melee'] = [];
WEAPONS_TABLE['elven bow, melee'].push({
    'name': 'Elven Bow, Melee',
    'noProf': true,
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d3',
    'book': ['The Complete Book of Elves'],
    'category': ['Melee']
});
//#endregion

//#region The Complete Book of Humanoids
WEAPONS_TABLE['great club'] = [];
WEAPONS_TABLE['great club'].push({
    'name': 'Great Club',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '2d4',
    'large': '1d6+1',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['dart, barbed'] = [];
WEAPONS_TABLE['dart, barbed'].push({
    'name': 'Dart, barbed',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'rof': '3/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['flindbar'] = [];
WEAPONS_TABLE['flindbar'].push({
    'name': 'Flindbar',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['goblin stick'] = [];
WEAPONS_TABLE['goblin stick'].push({
    'name': 'Goblin stick',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d6',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['flight lance'] = [];
WEAPONS_TABLE['flight lance'].push({
    'name': 'Flight lance',
    'size': 'L',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6+1',
    'large': '2d6',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['body spikes'] = [];
WEAPONS_TABLE['body spikes'].push({
    'name': 'Body spikes',
    'group': 'Close-quarter',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '',
    'large': '',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['kick-slasher'] = [];
WEAPONS_TABLE['kick-slasher'].push({
    'name': 'Kick-slasher',
    'group': 'Close-quarter',
    'noProf': true,
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['punch-cutter'] = [];
WEAPONS_TABLE['punch-cutter'].push({
    'name': 'Punch-cutter',
    'group': 'Close-quarter',
    'noProf': true,
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['giant-kin long bow (voadkyn)'] = [];
WEAPONS_TABLE['giant-kin long bow (voadkyn)'].push({
    'name': 'Giant-kin Long bow (Voadkyn)',
    'size': 'G',
    'type': 'P',
    'speed': 10,
    'rof': '2/1',
    'range': '75/150/255',
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Range']
});

WEAPONS_TABLE['giant-kin dagger'] = [];
WEAPONS_TABLE['giant-kin dagger'].push({
    'name': 'Giant-kin Dagger',
    'size': 'G',
    'type': 'P',
    'speed': 3,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['giant-kin halberd'] = [];
WEAPONS_TABLE['giant-kin halberd'].push({
    'name': 'Giant-kin Halberd',
    'size': 'G',
    'type': 'P/S',
    'speed': 12,
    'small-medium': '1d12',
    'large': '2d8',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['giant-kin mace'] = [];
WEAPONS_TABLE['giant-kin mace'].push({
    'name': 'Giant-kin Mace',
    'size': 'G',
    'type': 'B',
    'speed': 8,
    'small-medium': '1d8*2',
    'large': '1d6*2',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['giant-kin two-handed sword'] = [];
WEAPONS_TABLE['giant-kin two-handed sword'].push({
    'name': 'Giant-kin Two-handed sword',
    'size': 'G',
    'type': 'S',
    'speed': 13,
    'small-medium': '1d10*2',
    'large': '3d6*2',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['daikyu, leaf head arrow'] = [];
WEAPONS_TABLE['daikyu, leaf head arrow'].push({
    'name': 'Daikyu, Leaf head arrow',
    'size': 'L',
    'ammo-size': 'L',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Range']
});

WEAPONS_TABLE['katana'] = [];
WEAPONS_TABLE['katana'].push({
    'name': 'Katana',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d10',
    'large': '1d12',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['naginata'].push({
    'name': 'Naginata',
    'size': 'L',
    'type': 'S',
    'speed': 7,
    'small-medium': '1d10',
    'large': '1d12',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['wakizashi'].push({
    'name': 'Wakizashi',
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['pixie bow, forget arrow'] = [];
WEAPONS_TABLE['pixie bow, forget arrow'].push({
    'name': 'Pixie Bow, Forget arrow',
    'size': 'T',
    'type': 'P',
    'speed': 4,
    'rof': '2/1',
    'range': '25/50/75',
    'small-medium': '',
    'large': '',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Range']
});

WEAPONS_TABLE['pixie bow, sleep arrow'] = [];
WEAPONS_TABLE['pixie bow, sleep arrow'].push({
    'name': 'Pixie Bow, Sleep arrow',
    'size': 'T',
    'type': 'P',
    'speed': 4,
    'rof': '2/1',
    'range': '25/50/75',
    'small-medium': '',
    'large': '',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Range']
});

WEAPONS_TABLE['pixie bow, war arrow'] = [];
WEAPONS_TABLE['pixie bow, war arrow'].push({
    'name': 'Pixie Bow, War arrow',
    'size': 'T',
    'type': 'P',
    'speed': 4,
    'rof': '2/1',
    'range': '25/50/75',
    'small-medium': '1d4+1',
    'large': '1d4+1',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Range']
});

WEAPONS_TABLE['pixie sword'] = [];
WEAPONS_TABLE['pixie sword'].push({
    'name': 'Pixie Sword',
    'size': 'T',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['bladeback flail'] = [];
WEAPONS_TABLE['bladeback flail'].push({
    'name': 'Bladeback flail',
    'group': 'Saurial Weapon',
    'size': 'L',
    'type': 'B',
    'speed': 9,
    'small-medium': '1d8+1',
    'large': '2d6',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['bladeback mace'] = [];
WEAPONS_TABLE['bladeback mace'].push({
    'name': 'Bladeback mace',
    'group': 'Saurial Weapon',
    'size': 'L',
    'type': 'B',
    'speed': 9,
    'small-medium': '1d8+1',
    'large': '1d8',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});

WEAPONS_TABLE['hornhead staff'] = [];
WEAPONS_TABLE['hornhead staff'].push({
    'name': 'Hornhead staff',
    'group': 'Saurial Weapon',
    'size': 'L',
    'type': 'B',
    'speed': 6,
    'small-medium': '2d6',
    'large': '2d6',
    'book': ['The Complete Book of Humanoids'],
    'category': ['Melee']
});
//#endregion

//#region The Complete Ranger's Handbook
WEAPONS_TABLE['grain flail'] = [];
WEAPONS_TABLE['grain flail'].push({
    'name': 'Grain flail',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['hatchet'] = [];
WEAPONS_TABLE['hatchet'].push({
    'name': 'Hatchet',
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4+1',
    'book': ['The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['ice pick'] = [];
WEAPONS_TABLE['ice pick'].push({
    'name': 'Ice Pick',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['harness knife'] = [];
WEAPONS_TABLE['harness knife'].push({
    'name': 'Harness knife',
    'noProf': true,
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'small-medium': '1d2',
    'large': '1',
    'book': ['The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['machete'] = [];
WEAPONS_TABLE['machete'].push({
    'name': 'Machete',
    'size': 'M',
    'type': 'S',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['ritiik'] = [];
WEAPONS_TABLE['ritiik'].push({
    'name': 'Ritiik',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': ['The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['snow blade (iuak)'] = [];
WEAPONS_TABLE['snow blade (iuak)'].push({
    'name': 'Snow Blade (Iuak)',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d6',
    'book': ['The Complete Ranger\'s Handbook','The Complete Barbarian\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['gaff/hook'].push({
    'name': 'Gaff/Hook',
    'size': 'S',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Ranger\'s Handbook'],
    'category': ['Melee']
});
//#endregion

//#region The Complete Barbarian's Handbook
WEAPONS_TABLE['atlatl'] = [];
WEAPONS_TABLE['atlatl'].push({
    'name': 'Atlatl',
    'size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '1',
    'range': '30/60/90',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['atlatl, dart'] = [];
WEAPONS_TABLE['atlatl, dart'].push({
    'name': 'Atlatl, Dart',
    'size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['artengak'] = [];
WEAPONS_TABLE['artengak'].push({
    'name': 'Artengak',
    'size': 'L',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['boomerang, nonreturning'] = [];
WEAPONS_TABLE['boomerang, nonreturning'].push({
    'name': 'Boomerang, Nonreturning',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '30/70/100',
    'strength': true,
    'small-medium': '1d3+1',
    'large': '1d4+1',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['boomerang, returning'] = [];
WEAPONS_TABLE['boomerang, returning'].push({
    'name': 'Boomerang, Returning',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '20/40/60',
    'strength': true,
    'small-medium': '1d3+1',
    'large': '1d4+1',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['celt'] = [];
WEAPONS_TABLE['celt'].push({
    'name': 'Celt',
    'size': 'S',
    'type': 'B/P',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['spiked club'] = [];
WEAPONS_TABLE['spiked club'].push({
    'name': 'Spiked club',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6+1',
    'large': '1d4+1',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['throwing club, melee'] = [];
WEAPONS_TABLE['throwing club, melee'].push({
    'name': 'Throwing club, Melee',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d2',
    'large': '1',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['throwing club, ranged'] = [];
WEAPONS_TABLE['throwing club, ranged'].push({
    'name': 'Throwing club, Ranged',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['forearm axe'] = [];
WEAPONS_TABLE['forearm axe'].push({
    'name': 'Forearm Axe',
    'size': 'S',
    'type': 'S/P',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['rabbit stick'] = [];
WEAPONS_TABLE['rabbit stick'].push({
    'name': 'Rabbit stick',
    'size': 'S',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['stick sling, flint disk'] = [];
WEAPONS_TABLE['stick sling, flint disk'].push({
    'name': 'Stick sling, Flint Disk',
    'size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '2/1',
    'range': '30/60/90',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['stick sling, grooved stone'] = [];
WEAPONS_TABLE['stick sling, grooved stone'].push({
    'name': 'Stick sling, Grooved Stone',
    'size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '2/1',
    'range': '30/60/90',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['string sling, flint disk'] = [];
WEAPONS_TABLE['string sling, flint disk'].push({
    'name': 'String sling, Flint disk',
    'size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '2/1',
    'range': '30/60/90',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['string sling, grooved stone'] = [];
WEAPONS_TABLE['string sling, grooved stone'].push({
    'name': 'String sling, Grooved stone',
    'size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '2/1',
    'range': '30/60/90',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Barbarian\'s Handbook'],
    'category': ['Range']
});
//#endregion

//#region The Complete Ninja's Handbook
WEAPONS_TABLE['bo (staff)'] = WEAPONS_TABLE['bo stick'];
WEAPONS_TABLE['bo (staff)'].push({
    'name': 'Bo (staff)',
    'size': 'L',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['daikyu (great bow), armor piercer arrow'] = [];
WEAPONS_TABLE['daikyu (great bow), armor piercer arrow'].push({
    'name': 'Daikyu (great bow), Armor piercer arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['daikyu (great bow), flight arrow'] = [];
WEAPONS_TABLE['daikyu (great bow), flight arrow'].push({
    'name': 'Daikyu (great bow), Flight arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['daikyu (great bow), frog crotch arrow'] = [];
WEAPONS_TABLE['daikyu (great bow), frog crotch arrow'].push({
    'name': 'Daikyu (great bow), Frog crotch arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'S',
    'speed': 7,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d6',
    'large': '1d3',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['daikyu (great bow), humming bulb arrow'] = [];
WEAPONS_TABLE['daikyu (great bow), humming bulb arrow'].push({
    'name': 'Daikyu (great bow), Humming bulb arrow',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['daikyu (great bow), sheaf arrow (leaf-head)'] = [];
WEAPONS_TABLE['daikyu (great bow), sheaf arrow (leaf-head)'].push({
    'name': 'Daikyu (great bow), Sheaf arrow (leaf-head)',
    'size': 'L',
    'ammo-size': 'M',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '70/140/210',
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['hankyu (half bow), armor piercer arrow'] = [];
WEAPONS_TABLE['hankyu (half bow), armor piercer arrow'].push({
    'name': 'Hankyu (half bow), Armor piercer arrow',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['hankyu (half bow), flight arrow'] = [];
WEAPONS_TABLE['hankyu (half bow), flight arrow'].push({
    'name': 'Hankyu (half bow), Flight arrow',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['hankyu (half bow), frog crotch arrow'] = [];
WEAPONS_TABLE['hankyu (half bow), frog crotch arrow'].push({
    'name': 'Hankyu (half bow), Frog crotch arrow',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d6',
    'large': '1d3',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['hankyu (half bow), humming bulb arrow'] = [];
WEAPONS_TABLE['hankyu (half bow), humming bulb arrow'].push({
    'name': 'Hankyu (half bow), Humming bulb arrow',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['hankyu (half bow), sheaf arrow (leaf-head)'] = [];
WEAPONS_TABLE['hankyu (half bow), sheaf arrow (leaf-head)'].push({
    'name': 'Hankyu (half bow), Sheaf arrow (leaf-head)',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '50/100/150',
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['pellet bow, bullet'] = [];
WEAPONS_TABLE['pellet bow, bullet'].push({
    'name': 'Pellet bow, Bullet',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '60/120/180',
    'small-medium': '1d4',
    'large': '1d6+1',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['pellet bow, stone'] = [];
WEAPONS_TABLE['pellet bow, stone'].push({
    'name': 'Pellet bow, Stone',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '60/120/180',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['chopsticks'] = [];
WEAPONS_TABLE['chopsticks'].push({
    'name': 'Chopsticks',
    'size': 'S',
    'type': 'P',
    'speed': 1,
    'small-medium': '1',
    'large': '1',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['chu-ko-nu (repeater), light quarrel'] = [];
WEAPONS_TABLE['chu-ko-nu (repeater), light quarrel'].push({
    'name': 'Chu-ko-nu (repeater), Light quarrel',
    'group': 'Crossbow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 10,
    'rof': '3/2',
    'range': '20/40/60',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['fang'] = [];
WEAPONS_TABLE['fang'].push({
    'name': 'Fang',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['fukimi-bari (mouth darts)'] = [];
WEAPONS_TABLE['fukimi-bari (mouth darts)'].push({
    'name': 'Fukimi-bari (mouth darts)',
    'rof': '1',
    'range': '3’/—/—',
    'size': 'S',
    'type': 'P',
    'speed': 1,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['gunsen (war fan)'] = [];
WEAPONS_TABLE['gunsen (war fan)'].push({
    'name': 'Gunsen (war fan)',
    'size': 'S',
    'type': 'B',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['hanbo (half staff)'] = [];
WEAPONS_TABLE['hanbo (half staff)'].push({
    'name': 'Hanbo (half staff)',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['jitte'].push({
    'name': 'Jitte',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['jo (stick)'] = [];
WEAPONS_TABLE['jo (stick)'].push({
    'name': 'Jo (stick)',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d3',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['kama (sickle)'] = [];
WEAPONS_TABLE['kama (sickle)'].push({
    'name': 'Kama (sickle)',
    'size': 'S',
    'type': 'S',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['kau sin ke (whipping chain)'] = [];
WEAPONS_TABLE['kau sin ke (whipping chain)'].push({
    'name': 'Kau sin ke (whipping chain)',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['kawanaga (grapnel)'] = [];
WEAPONS_TABLE['kawanaga (grapnel)'].push({
    'name': 'Kawanaga (grapnel)',
    'size': 'L',
    'type': 'B/P',
    'speed': 6,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['kiseru (pipe)'] = [];
WEAPONS_TABLE['kiseru (pipe)'].push({
    'name': 'Kiseru (pipe)',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['kusari-gama (chain-sickle)'] = [];
WEAPONS_TABLE['kusari-gama (chain-sickle)'].push({
    'name': 'Kusari-gama (chain-sickle)',
    'size': 'L',
    'type': 'B/S',
    'speed': 6,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['kyogetsu-shogi (cord-and-dagger)'] = [];
WEAPONS_TABLE['kyogetsu-shogi (cord-and-dagger)'].push({
    'name': 'Kyogetsu-shogi (cord-and-dagger)',
    'size': 'L',
    'type': 'B/S',
    'speed': 6,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['lasso'].push({
    'name': 'Lasso',
    'size': 'L',
    'type': '—',
    'speed': 7,
    'rof': '',
    'range': '',
    'strength': true,
    'small-medium': '',
    'large': '',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['manriki-gusari (chain)'] = [];
WEAPONS_TABLE['manriki-gusari (chain)'].push({
    'name': 'Manriki-gusari (chain)',
    'size': 'L',
    'type': 'B',
    'speed': 5,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['metsubishi (blinding powders)'] = [];
WEAPONS_TABLE['metsubishi (blinding powders)'].push({
    'name': 'Metsubishi (blinding powders)',
    'size': 'S',
    'type': '—',
    'speed': 3,
    'rof': '1/2',
    'range': '3’/—/—',
    'small-medium': '—',
    'large': '—',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['nage teppo (grenades)'] = [];
WEAPONS_TABLE['nage teppo (grenades)'].push({
    'name': 'Nage teppo (grenades)',
    'size': '—',
    'type': 'B',
    'speed': 9,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['needle'] = [];
WEAPONS_TABLE['needle'].push({
    'name': 'Needle',
    'size': 'S',
    'type': 'P',
    'speed': 1,
    'rof': '1',
    'range': '3’/—/—',
    'small-medium': '1',
    'large': '1',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['nekode (climbing claws)'] = [];
WEAPONS_TABLE['nekode (climbing claws)'].push({
    'name': 'Nekode (climbing claws)',
    'size': 'S',
    'type': 'S',
    'speed': 1,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['nunchaku (threshing flail)'] = WEAPONS_TABLE['nunchaku'];
WEAPONS_TABLE['nunchaku (threshing flail)'].push({
    'name': 'Nunchaku (threshing flail)',
    'size': 'M',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['kumade (rake)'] = [];
WEAPONS_TABLE['kumade (rake)'].push({
    'name': 'Kumade (rake)',
    'group': 'Polearm',
    'size': 'L',
    'type': 'B/P',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['lajatang'] = [];
WEAPONS_TABLE['lajatang'].push({
    'name': 'Lajatang',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S/P',
    'speed': 7,
    'small-medium': '1d10',
    'large': '1d10',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['man catcher'] = WEAPONS_TABLE['mancatcher'];
WEAPONS_TABLE['man catcher'].push({
    'name': 'Man catcher',
    'group': 'Polearm',
    'size': 'L',
    'type': '—',
    'speed': 7,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['nagimaki (horseman\'s halberd)'] = [];
WEAPONS_TABLE['nagimaki (horseman\'s halberd)'].push({
    'name': 'Nagimaki (horseman\'s halberd)',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S/P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['naginata (halberd)'] = WEAPONS_TABLE['naginata'];
WEAPONS_TABLE['naginata (halberd)'].push({
    'name': 'Naginata (halberd)',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S/P',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d10',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['sai (short trident)'] = WEAPONS_TABLE['sai'];
WEAPONS_TABLE['sai (short trident)'].push({
    'name': 'Sai (short trident)',
    'size': 'S',
    'type': 'P/B',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['spike shuriken (throwing star)'] = [];
WEAPONS_TABLE['spike shuriken (throwing star)'].push({
    'name': 'Spike shuriken (throwing star)',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '10/—/—',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['large star shuriken (throwing star)'] = [];
WEAPONS_TABLE['large star shuriken (throwing star)'].push({
    'name': 'Large star shuriken (throwing star)',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '3/1',
    'range': '5/10/20',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['small star shuriken (throwing star)'] = [];
WEAPONS_TABLE['small star shuriken (throwing star)'].push({
    'name': 'Small star shuriken (throwing star)',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '4/1',
    'range': '5/10/20',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['siangkam'] = [];
WEAPONS_TABLE['siangkam'].push({
    'name': 'Siangkam',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['sling, bullet'].push({
    'name': 'Sling, Bullet',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '50/100/200',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d6+1',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['sling, stone'].push({
    'name': 'Sling, Stone',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '40/80/1600',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['staff sling, bullet'].push({
    'name': 'Staff sling, Bullet',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '1/2',
    'range': '—/30-60/90',
    'strength': true,
    'small-medium': '2d4',
    'large': '1d6+2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['staff sling, stone'].push({
    'name': 'Staff sling, Stone',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '1/2',
    'range': '—/30-60/200',
    'strength': true,
    'small-medium': '1d8',
    'large': '2d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['sode garami (sleeve entangler)'] = [];
WEAPONS_TABLE['sode garami (sleeve entangler)'].push({
    'name': 'Sode garami (sleeve entangler)',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['chijiriki, one-handed (chain spear)'] = [];
WEAPONS_TABLE['chijiriki, one-handed (chain spear)'].push({
    'name': 'Chijiriki, One-handed (chain spear)',
    'size': 'L',
    'type': 'B/P',
    'speed': 7,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['chijiriki, two-handed (chain spear)'] = [];
WEAPONS_TABLE['chijiriki, two-handed (chain spear)'].push({
    'name': 'Chijiriki, Two-handed (chain spear)',
    'size': 'L',
    'type': 'B/P',
    'speed': 7,
    'small-medium': '1d8+1',
    'large': '2d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['sang kauw, one-handed (two-handed spear)'] = [];
WEAPONS_TABLE['sang kauw, one-handed (two-handed spear)'].push({
    'name': 'Sang kauw, One-handed (two-handed spear)',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['sang kauw, two-handed (two-handed spear)'] = [];
WEAPONS_TABLE['sang kauw, two-handed (two-handed spear)'].push({
    'name': 'Sang kauw, Two-handed (two-handed spear)',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '2d6',
    'large': '1d8+1',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['shakujo yari, one-handed (staff spear)'] = [];
WEAPONS_TABLE['shakujo yari, one-handed (staff spear)'].push({
    'name': 'Shakujo yari, One-handed (staff spear)',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['shakujo yari, two-handed (staff spear)'] = [];
WEAPONS_TABLE['shakujo yari, two-handed (staff spear)'].push({
    'name': 'Shakujo yari, Two-handed (staff spear)',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d8+1',
    'large': '2d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['trident, one-handed'].push({
    'name': 'Trident, One-handed',
    'group': 'Spear',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d6+1',
    'large': '3d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['trident, two-handed'].push({
    'name': 'Trident, Two-handed',
    'group': 'Spear',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '2d8',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['yari, one-handed (spear)'] = [];
WEAPONS_TABLE['yari, one-handed (spear)'].push({
    'name': 'Yari, One-handed (spear)',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d8',
    'large': '1d8+1',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['yari, two-handed (spear)'] = [];
WEAPONS_TABLE['yari, two-handed (spear)'].push({
    'name': 'Yari, Two-handed (spear)',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '2d6',
    'large': '3d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['bokken, one-handed (wooden sword)'] = [];
WEAPONS_TABLE['bokken, one-handed (wooden sword)'].push({
    'name': 'Bokken, One-handed (wooden sword)',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['bokken, two-handed (wooden sword)'] = [];
WEAPONS_TABLE['bokken, two-handed (wooden sword)'].push({
    'name': 'Bokken, Two-handed (wooden sword)',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '2d6',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['broad sword (darn den)'] = WEAPONS_TABLE['broad sword'];
WEAPONS_TABLE['broad sword (darn den)'].push({
    'name': 'Broad sword (darn den)',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '2d4',
    'large': '1d6+1',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['katana, one-handed (samurai long sword)'] = WEAPONS_TABLE['katana, one-handed']
WEAPONS_TABLE['katana, one-handed (samurai long sword)'].push({
    'name': 'Katana, One-handed (samurai long sword)',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'small-medium': '1d10',
    'large': '1d12',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['katana, two-handed (samurai long sword)'] = WEAPONS_TABLE['katana, two-handed']
WEAPONS_TABLE['katana, two-handed (samurai long sword)'].push({
    'name': 'Katana, Two-handed (samurai long sword)',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'small-medium': '2d6',
    'large': '2d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['ninja-to (ninja sword)'] = [];
WEAPONS_TABLE['ninja-to (ninja sword)'].push({
    'name': 'Ninja-to (ninja sword)',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['no-daichi (two-handed sword)'] = [];
WEAPONS_TABLE['no-daichi (two-handed sword)'].push({
    'name': 'No-daichi (two-handed sword)',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '1d10',
    'large': '3d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['parang (chopping blade)'] = [];
WEAPONS_TABLE['parang (chopping blade)'].push({
    'name': 'Parang (chopping blade)',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['tetsu-to (iron sword)'] = [];
WEAPONS_TABLE['tetsu-to (iron sword)'].push({
    'name': 'Tetsu-to (iron sword)',
    'size': 'L',
    'type': 'S',
    'speed': 15,
    'small-medium': '1d12',
    'large': '3d6',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['wakizashi (samurai short sword)'] = WEAPONS_TABLE['wakizashi'];
WEAPONS_TABLE['wakizashi (samurai short sword)'].push({
    'name': 'Wakizashi (samurai short sword)',
    'size': 'S',
    'type': 'S/P',
    'speed': 3,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['tanto (dagger)'] = [];
WEAPONS_TABLE['tanto (dagger)'].push({
    'name': 'Tanto (dagger)',
    'size': 'S',
    'type': 'S/P',
    'speed': 2,
    'rof': '2/1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['tetsu-bishi (caltrops)'] = [];
WEAPONS_TABLE['tetsu-bishi (caltrops)'].push({
    'name': 'Tetsu-bishi (caltrops)',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'rof': '1',
    'range': '5’/10’/20’',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Range']
});

WEAPONS_TABLE['tetsu-bo (iron staff)'] = WEAPONS_TABLE['tetsubo'];
WEAPONS_TABLE['tetsu-bo (iron staff)'].push({
    'name': 'Tetsu-bo (iron staff)',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['three-section staff'] = [];
WEAPONS_TABLE['three-section staff'].push({
    'name': 'Three-section staff',
    'size': 'L',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['tonfa (handle)'] = [];
WEAPONS_TABLE['tonfa (handle)'].push({
    'name': 'Tonfa (handle)',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee']
});

WEAPONS_TABLE['uchi-ne (short javelin)'] = [];
WEAPONS_TABLE['uchi-ne (short javelin)'].push({
    'name': 'Uchi-ne (short javelin)',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['yoroi-toshi'] = [];
WEAPONS_TABLE['yoroi-toshi'].push({
    'name': 'Yoroi-Toshi',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['The Complete Ninja\'s Handbook'],
    'category': ['Melee', 'Range']
});
//#endregion

//#region Player's Option: Combat & Tactics
WEAPONS_TABLE['adze'] = [];
WEAPONS_TABLE['adze'].push({
    'name': 'Adze',
    'size': 'S',
    'type': 'S/P',
    'speed': 4,
    'reach': '1',
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['ankus'] = [];
WEAPONS_TABLE['ankus'].push({
    'name': 'Ankus',
    'size': 'M',
    'type': 'P/B',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['battle axe'].push({
    'name': 'Battle axe',
    'size': 'M',
    'type': 'S',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['hand axe'].push({
    'name': 'Hand axe',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['stone axe'] = [];
WEAPONS_TABLE['stone axe'].push({
    'name': 'Stone axe',
    'size': 'M',
    'type': 'B/S',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['two-handed axe'] = WEAPONS_TABLE['two-handed battle axe']
WEAPONS_TABLE['two-handed axe'].push({
    'name': 'Two-handed axe',
    'noProf': true,
    'size': 'L',
    'type': 'S',
    'speed': 9,
    'reach': '1',
    'small-medium': '1d10',
    'large': '2d8',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['bagh nakh'] = [];
WEAPONS_TABLE['bagh nakh'].push({
    'name': 'Bagh nakh',
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d2',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['blowgun, barbed dart'].push({
    'name': 'Blowgun, Barbed Dart',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '2/1',
    'range': '2/4/6',
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['blowgun, needle'].push({
    'name': 'Blowgun, Needle',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '2/1',
    'range': '2/4/6',
    'small-medium': '1',
    'large': '1',
    'knockdown': '',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['bo stick'].push({
    'name': 'Bo stick',
    'size': 'L',
    'type': 'B',
    'speed': 3,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['bolas'].push({
    'name': 'Bolas',
    'size': 'M',
    'type': 'B',
    'speed': 8,
    'rof': '1',
    'range': '6/12/18',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['boomerang'] = [];
WEAPONS_TABLE['boomerang'].push({
    'name': 'Boomerang',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '4/8/12',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['bottle'] = [];
WEAPONS_TABLE['bottle'].push({
    'name': 'Bottle',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['composite long bow, flight arrow'].push({
    'name': 'Composite long bow, Flight arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '12/24/42',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, pile arrow'] = [];
WEAPONS_TABLE['composite long bow, pile arrow'].push({
    'name': 'Composite long bow, Pile arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/34',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, sheaf arrow'].push({
    'name': 'Composite long bow, Sheaf arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/34',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, stone arrow'] = WEAPONS_TABLE['composite long bow, stone flight arrow']
WEAPONS_TABLE['composite long bow, stone arrow'].push({
    'name': 'Composite long bow, Stone arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '12/24/42',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['composite short bow, flight arrow'].push({
    'name': 'Composite short bow, Flight arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '10/20/36',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['composite short bow, stone arrow'] = WEAPONS_TABLE['composite short bow, stone flight arrow'];
WEAPONS_TABLE['composite short bow, stone arrow'].push({
    'name': 'Composite short bow, Stone arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '10/20/36',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, flight arrow'].push({
    'name': 'Long bow, Flight arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '12/24/42',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, pile arrow'] = [];
WEAPONS_TABLE['long bow, pile arrow'].push({
    'name': 'Long bow, Pile arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/34',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, sheaf arrow'].push({
    'name': 'Long bow, Sheaf arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/34',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, stone arrow'] = WEAPONS_TABLE['long bow, stone flight arrow']
WEAPONS_TABLE['long bow, stone arrow'].push({
    'name': 'Long bow, Stone arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '12/24/42',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['short bow, flight arrow'].push({
    'name': 'Short bow, Flight arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '10/20/30',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['short bow, stone arrow'] = WEAPONS_TABLE['short bow, stone flight arrow']
WEAPONS_TABLE['short bow, stone arrow'].push({
    'name': 'Short bow, Stone arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '10/20/30',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['brandistock'] = [];
WEAPONS_TABLE['brandistock'].push({
    'name': 'Brandistock',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['caltrop'] = [];
WEAPONS_TABLE['caltrop'].push({
    'name': 'Caltrop',
    'size': 'S',
    'type': 'P',
    'speed': 0,
    'small-medium': '1',
    'large': '1d2',
    'knockdown': '—',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': []
});

WEAPONS_TABLE['cestus'].push({
    'name': 'Cestus',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['chain'].push({
    'name': 'Chain',
    'size': 'L',
    'type': 'B',
    'speed': 5,
    'reach': '2',
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['chakram'] = [];
WEAPONS_TABLE['chakram'].push({
    'name': 'Chakram',
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'rof': '2/1',
    'range': '4/8/12',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['chijikiri'] = [];
WEAPONS_TABLE['chijikiri'].push({
    'name': 'Chijikiri',
    'size': 'M',
    'type': 'P/B',
    'speed': 7,
    'reach': '1(2)',
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['club'].push({
    'name': 'Club',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['great club'].push({
    'name': 'Great club',
    'size': 'L',
    'type': 'B',
    'speed': 9,
    'reach': '1',
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['war club'] = [];
WEAPONS_TABLE['war club'].push({
    'name': 'War club',
    'size': 'M',
    'type': 'B/S',
    'speed': 7,
    'reach': '1',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d6+1',
    'large': '1d4+1',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['axe-pistol, melee'] = [];
WEAPONS_TABLE['axe-pistol, melee'].push({
    'name': 'Axe-pistol, Melee',
    'group': 'Combined Weapons',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['axe-pistol, ranged'] = [];
WEAPONS_TABLE['axe-pistol, ranged'].push({
    'name': 'Axe-pistol, Ranged',
    'group': 'Combined Weapons',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1/2',
    'range': '3/6/9',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['dagger-pistol, melee'] = [];
WEAPONS_TABLE['dagger-pistol, melee'].push({
    'name': 'Dagger-pistol, Melee',
    'group': 'Combined Weapons',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['dagger-pistol, ranged'] = [];
WEAPONS_TABLE['dagger-pistol, ranged'].push({
    'name': 'Dagger-pistol, Ranged',
    'group': 'Combined Weapons',
    'size': 'S',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1/2',
    'range': '3/6/9',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['hammer-pistol, melee'] = [];
WEAPONS_TABLE['hammer-pistol, melee'].push({
    'name': 'Hammer-pistol, Melee',
    'group': 'Combined Weapons',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'reach': '1',
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['hammer-pistol, ranged'] = [];
WEAPONS_TABLE['hammer-pistol, ranged'].push({
    'name': 'Hammer-pistol, Ranged',
    'group': 'Combined Weapons',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1/2',
    'range': '3/6/9',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['sword-pistol, melee'] = [];
WEAPONS_TABLE['sword-pistol, melee'].push({
    'name': 'Sword-pistol, Melee',
    'group': 'Combined Weapons',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['sword-pistol, ranged'] = [];
WEAPONS_TABLE['sword-pistol, ranged'].push({
    'name': 'Sword-pistol, Ranged',
    'group': 'Combined Weapons',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1/2',
    'range': '3/6/9',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['cho-ku-no, light quarrel'] = WEAPONS_TABLE['chu-ko-nu (repeater), light quarrel'];
WEAPONS_TABLE['cho-ku-no, light quarrel'].push({
    'name': 'Cho-ku-no, Light quarrel',
    'group': 'Crossbow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '10/20/30',
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['hand crossbow, hand quarrel'].push({
    'name': 'Hand crossbow, Hand quarrel',
    'size': 'S',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '1',
    'range': '4/8/12',
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['heavy crossbow, heavy quarrel'].push({
    'name': 'Heavy crossbow, Heavy quarrel',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 10,
    'rof': '1/2',
    'range': '16/32/48',
    'small-medium': '1d8+1',
    'large': '1d10+1',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['light crossbow, light quarrel'].push({
    'name': 'Light crossbow, Light quarrel',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '12/24/36',
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['pellet bow, pellet'] = [];
WEAPONS_TABLE['pellet bow, pellet'].push({
    'name': 'Pellet bow, Pellet',
    'group': 'Crossbow',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'rof': '1',
    'range': '8/16/24',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['dagger'].push({
    'name': 'Dagger',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'reach': '1',
    'rof': '2/1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['bone dagger'].push({
    'name': 'Bone dagger',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'reach': '1',
    'rof': '2/1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['jambiya'] = [];
WEAPONS_TABLE['jambiya'].push({
    'name': 'Jambiya',
    'group': 'Dagger',
    'size': 'S',
    'type': 'P/S',
    'speed': 3,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['katar'] = [];
WEAPONS_TABLE['katar'].push({
    'name': 'Katar',
    'group': 'Dagger',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d3+1',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['main-gauche'].push({
    'name': 'Main-gauche',
    'group': 'Dagger',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['parrying dagger'].push({
    'name': 'Parrying dagger',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d3',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['stiletto'].push({
    'name': 'Stiletto',
    'group': 'Dagger',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'reach': '1',
    'rof': '2/1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['stone dagger'].push({
    'name': 'Stone dagger',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'reach': '1',
    'rof': '2/1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['dart'].push({
    'name': 'Dart',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '3/1',
    'range': '2/4/8',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['footman\'s flail'].push({
    'name': 'Footman\'s flail',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['grain flail'].push({
    'name': 'Grain flail',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['horseman\'s flail'].push({
    'name': 'Horseman\'s flail',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d4+1',
    'large': '1d4+1',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});


WEAPONS_TABLE['flintlock belt pistol'] = [];
WEAPONS_TABLE['flintlock belt pistol'].push({
    'name': 'Flintlock Belt Pistol',
    'size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1/2',
    'range': '4/8/12',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['flintlock blunderbuss pistol'] = [];
WEAPONS_TABLE['flintlock blunderbuss pistol'].push({
    'name': 'Flintlock Blunderbuss Pistol',
    'size': 'S',
    'type': 'P',
    'speed': 9,
    'rof': '1/3',
    'range': '2/4/8',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['flintlock blunderbuss'] = [];
WEAPONS_TABLE['flintlock blunderbuss'].push({
    'name': 'Flintlock Blunderbuss',
    'size': 'M',
    'type': 'P',
    'speed': 10,
    'rof': '1/3',
    'range': '3/6/12',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['flintlock carbine'] = [];
WEAPONS_TABLE['flintlock carbine'].push({
    'name': 'Flintlock Carbine',
    'size': 'M',
    'type': 'P',
    'speed': 8,
    'rof': '1/2',
    'range': '10/20/55',
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['flintlock horse pistol'] = [];
WEAPONS_TABLE['flintlock horse pistol'].push({
    'name': 'Flintlock Horse Pistol',
    'size': 'S',
    'type': 'P',
    'speed': 8,
    'rof': '1/2',
    'range': '5/10/15',
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['flintlock musket'] = [];
WEAPONS_TABLE['flintlock musket'].push({
    'name': 'Flintlock Musket',
    'size': 'M',
    'type': 'P',
    'speed': 9,
    'rof': '1/2',
    'range': '15/30/80',
    'small-medium': '1d12',
    'large': '1d12',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['fork'] = [];
WEAPONS_TABLE['fork'].push({
    'name': 'Fork',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d6+1',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['gaff/hook'].push({
    'name': 'Gaff/hook',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['grapple'] = [];
WEAPONS_TABLE['grapple'].push({
    'name': 'Grapple',
    'size': 'S',
    'type': 'P/B',
    'speed': 7,
    'reach': '1',
    'rof': '1/2',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['gunsen'] = WEAPONS_TABLE['gunsen (war fan)'];
WEAPONS_TABLE['gunsen'].push({
    'name': 'Gunsen',
    'size': 'S',
    'type': 'B/P',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['hammer'] = [];
WEAPONS_TABLE['hammer'].push({
    'name': 'Hammer',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['hand match arquebus'] = [];
WEAPONS_TABLE['hand match arquebus'].push({
    'name': 'Hand Match Arquebus',
    'size': 'M',
    'type': 'P',
    'speed': 15,
    'rof': '1/3',
    'range': '10/30/42',
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['hand match handgunne'] = [];
WEAPONS_TABLE['hand match handgunne'].push({
    'name': 'Hand Match Handgunne',
    'size': 'L',
    'type': 'P',
    'speed': 18,
    'rof': '1/4',
    'range': '8/24/34',
    'small-medium': '1d8+2',
    'large': '2d6+2',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['harpoon'].push({
    'name': 'Harpoon',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'reach': '2',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['bone harpoon'] = [];
WEAPONS_TABLE['bone harpoon'].push({
    'name': 'Bone harpoon',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'reach': '2',
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d10',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['hatchet'].push({
    'name': 'Hatchet',
    'size': 'S',
    'type': 'S',
    'speed': 3,
    'reach': '1',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['big holy symbol'] = [];
WEAPONS_TABLE['big holy symbol'].push({
    'name': 'Big holy symbol',
    'size': 'S',
    'type': 'B',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d3',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['javelin'].push({
    'name': 'Javelin',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '4/8/12',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['stone javelin'] = [];
WEAPONS_TABLE['stone javelin'].push({
    'name': 'Stone javelin',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '3/6/9',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['jitte'].push({
    'name': 'Jitte',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['kama'] = WEAPONS_TABLE['kama (sickle)'];
WEAPONS_TABLE['kama'].push({
    'name': 'Kama',
    'size': 'S',
    'type': 'P/S',
    'speed': 4,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['kau sin ke'] = WEAPONS_TABLE['kau sin ke (whipping chain)'];
WEAPONS_TABLE['kau sin ke'].push({
    'name': 'Kau sin ke',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['kawanaga'] = WEAPONS_TABLE['kawanaga (grapnel)'];
WEAPONS_TABLE['kawanaga'].push({
    'name': 'Kawanaga',
    'size': 'S',
    'type': 'P/B',
    'speed': 7,
    'reach': '2',
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['knife'].push({
    'name': 'Knife',
    'size': 'S',
    'type': 'S/P',
    'speed': 2,
    'reach': '1',
    'rof': '2/1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['bone knife'].push({
    'name': 'Bone knife',
    'noProf': true,
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'reach': '1',
    'rof': '2/1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['stone knife'].push({
    'name': 'Stone knife',
    'noProf': true,
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'reach': '1',
    'rof': '2/1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['throwing knife'] = [];
WEAPONS_TABLE['throwing knife'].push({
    'name': 'Throwing knife',
    'noProf': true,
    'size': 'M',
    'type': 'S/P',
    'speed': 8,
    'reach': '1',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['kusari-gama'] = WEAPONS_TABLE['kusari-gama (chain-sickle)'];
WEAPONS_TABLE['kusari-gama'].push({
    'name': 'Kusari-gama',
    'size': 'M',
    'type': 'P/S/B',
    'speed': 6,
    'reach': '2',
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['light lance'] = WEAPONS_TABLE['light horse lance'];
WEAPONS_TABLE['light lance'].push({
    'name': 'Light lance',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 6,
    'reach': '2',
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['medium lance'] = WEAPONS_TABLE['medium horse lance'];
WEAPONS_TABLE['medium lance'].push({
    'name': 'Medium lance',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'reach': '2',
    'small-medium': '1d6+1',
    'large': '2d6',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['heavy lance'] = WEAPONS_TABLE['heavy horse lance'];
WEAPONS_TABLE['heavy lance'].push({
    'name': 'Heavy lance',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 10,
    'reach': '2',
    'small-medium': '1d8+1',
    'large': '3d6',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['jousting lance'].push({
    'name': 'Jousting lance',
    'size': 'L',
    'type': 'B',
    'speed': 10,
    'reach': '2',
    'small-medium': '1d3-1',
    'large': '1d2-1',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['lantern'] = [];
WEAPONS_TABLE['lantern'].push({
    'name': 'Lantern',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'reach': '1',
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['lasso'].push({
    'name': 'Lasso',
    'size': 'L',
    'type': '—',
    'speed': 10,
    'rof': '1/2',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '',
    'large': '',
    'knockdown': '',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['footman\'s mace'].push({
    'name': 'Footman\'s mace',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '1d6',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['horseman\'s mace'].push({
    'name': 'Horseman\'s mace',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'reach': '1',
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['mace-axe'] = [];
WEAPONS_TABLE['mace-axe'].push({
    'name': 'Mace-axe',
    'size': 'L',
    'type': 'B/S',
    'speed': 8,
    'reach': '1',
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['machete'].push({
    'name': 'Machete',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['mancatcher'].push({
    'name': 'Mancatcher',
    'size': 'L',
    'type': '—',
    'speed': 7,
    'reach': '1',
    'small-medium': '—',
    'large': '—',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['matchlock arquebus'] = [];
WEAPONS_TABLE['matchlock arquebus'].push({
    'name': 'Matchlock Arquebus',
    'size': 'M',
    'type': 'P',
    'speed': 10,
    'rof': '1/2',
    'range': '10/20/60',
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['matchlock caliver'] = [];
WEAPONS_TABLE['matchlock caliver'].push({
    'name': 'Matchlock Caliver',
    'size': 'M',
    'type': 'P',
    'speed': 9,
    'rof': '1/2',
    'range': '8/16/48',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['matchlock musket w/rest'] = [];
WEAPONS_TABLE['matchlock musket w/rest'].push({
    'name': 'Matchlock Musket w/rest',
    'size': 'L',
    'type': 'P',
    'speed': 12,
    'rof': '1/2',
    'range': '12/24/72',
    'small-medium': '1d12',
    'large': '1d12',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['maul'].push({
    'name': 'Maul',
    'size': 'L',
    'type': 'B',
    'speed': 8,
    'reach': '1',
    'small-medium': '2d4',
    'large': '1d10',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['morningstar'] = WEAPONS_TABLE['morning star'];
WEAPONS_TABLE['morningstar'].push({
    'name': 'Morningstar',
    'noProf': true,
    'size': 'M',
    'type': 'B/P',
    'speed': 7,
    'reach': '1',
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['net'].push({
    'name': 'Net',
    'size': 'M',
    'type': '—',
    'speed': 10,
    'reach': '1',
    'rof': '1/2',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '',
    'large': '',
    'knockdown': '',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['nunchaku'].push({
    'name': 'Nunchaku',
    'size': 'M',
    'type': 'B',
    'speed': 3,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['oil flask'] = [];
WEAPONS_TABLE['oil flask'].push({
    'name': 'Oil flask',
    'noProf': true,
    'size': 'S',
    'type': '',
    'speed': 15,
    'rof': '1/2',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '',
    'large': '',
    'knockdown': '—',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['parang'] = WEAPONS_TABLE['parang (chopping blade)'];
WEAPONS_TABLE['parang'].push({
    'name': 'Parang',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['farming pick'] = [];
WEAPONS_TABLE['farming pick'].push({
    'name': 'Farming pick',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d6+1',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['footman\'s pick'].push({
    'name': 'Footman\'s pick',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['horseman\'s pick'].push({
    'name': 'Horseman\'s pick',
    'size': 'M',
    'type': 'P',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['pike'] = [];
WEAPONS_TABLE['pike'].push({
    'name': 'Pike',
    'size': 'L',
    'type': 'P',
    'speed': 13,
    'reach': '3',
    'small-medium': '1d6',
    'large': '1d12',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['pilum'] = [];
WEAPONS_TABLE['pilum'].push({
    'name': 'Pilum',
    'size': 'M',
    'type': 'P',
    'speed': 5,
    'reach': '1',
    'rof': '1',
    'range': '3/6/9',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['awl pike'].push({
    'name': 'Awl Pike',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 13,
    'reach': '3',
    'small-medium': '1d6',
    'large': '1d12',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['bardiche'].push({
    'name': 'Bardiche',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 9,
    'reach': '2',
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['bec de corbin'].push({
    'name': 'Bec de Corbin',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'reach': '2',
    'small-medium': '1d8',
    'large': '1d6',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['bill-guisarme'].push({
    'name': 'Bill-Guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'reach': '2',
    'small-medium': '2d4',
    'large': '1d10',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['bill'].push({
    'name': 'Bill',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'reach': '2',
    'small-medium': '2d4',
    'large': '1d10',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['fauchard'].push({
    'name': 'Fauchard',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'reach': '2',
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['glaive'].push({
    'name': 'Glaive',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'reach': '2',
    'small-medium': '1d6',
    'large': '1d10',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['glaive-guisarme'].push({
    'name': 'Glaive-Guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'reach': '2',
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['guisarme'].push({
    'name': 'Guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'reach': '2',
    'small-medium': '2d4',
    'large': '1d8',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['halberd'].push({
    'name': 'Halberd',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'reach': '2',
    'small-medium': '1d10',
    'large': '2d6',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['lajatang'].push({
    'name': 'Lajatang',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['lucern hammer'].push({
    'name': 'Lucern hammer',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'reach': '2',
    'small-medium': '2d4',
    'large': '1d6',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['military fork'].push({
    'name': 'Military fork',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'reach': '2',
    'small-medium': '1d8',
    'large': '2d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['nagimaki'] = WEAPONS_TABLE['nagimaki (horseman\'s halberd)'];
WEAPONS_TABLE['nagimaki'].push({
    'name': 'Nagimaki',
    'group': 'Polearm',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'reach': '2',
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['naginata'].push({
    'name': 'Naginata',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 7,
    'reach': '2',
    'small-medium': '1d8',
    'large': '1d10',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['partisan'].push({
    'name': 'Partisan',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 9,
    'reach': '2',
    'small-medium': '1d6',
    'large': '1d6+1',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['ranseur'].push({
    'name': 'Ranseur',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'reach': '2',
    'small-medium': '2d4',
    'large': '2d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['spetum'].push({
    'name': 'Spetum',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'reach': '2',
    'small-medium': '1d6+1',
    'large': '2d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['tetsubo'].push({
    'name': 'Tetsubo',
    'group': 'Polearm',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['voulge'].push({
    'name': 'Voulge',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'reach': '2',
    'small-medium': '2d4',
    'large': '2d4',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['pry bar'] = [];
WEAPONS_TABLE['pry bar'].push({
    'name': 'Pry bar',
    'size': 'M',
    'type': 'B',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d3',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['quarterstaff'].push({
    'name': 'Quarterstaff',
    'size': 'L',
    'type': 'B',
    'speed': 4,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['rock'] = [];
WEAPONS_TABLE['rock'].push({
    'name': 'Rock',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'reach': '1',
    'rof': '2/1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['sai'].push({
    'name': 'Sai',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d2',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['sang kauw'] = [];
WEAPONS_TABLE['sang kauw'].push({
    'name': 'Sang kauw',
    'size': 'L',
    'type': 'P/S',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['sap'].push({
    'name': 'Sap',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d2',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['scourge'].push({
    'name': 'Scourge',
    'size': 'S',
    'type': '—',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d2',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['scythe'].push({
    'name': 'Scythe',
    'size': 'L',
    'type': 'P/S',
    'speed': 8,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '1d8',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['shuriken'].push({
    'name': 'Shuriken',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '3/6/9',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['sickle'].push({
    'name': 'Sickle',
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'reach': '1',
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['sledge hammer'] = [];
WEAPONS_TABLE['sledge hammer'].push({
    'name': 'Sledge hammer',
    'size': 'M',
    'type': 'B',
    'speed': 8,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '1d4+1',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['sling, bullet'].push({
    'name': 'Sling, Bullet',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '10/20/40',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['sling, stone'].push({
    'name': 'Sling, Stone',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '8/16/24',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['snaplock belt pistol'] = [];
WEAPONS_TABLE['snaplock belt pistol'].push({
    'name': 'Snaplock Belt Pistol',
    'size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1/2',
    'range': '3/6/9',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['snaplock horse pistol'] = [];
WEAPONS_TABLE['snaplock horse pistol'].push({
    'name': 'Snaplock Horse Pistol',
    'size': 'S',
    'type': 'P',
    'speed': 8,
    'rof': '1/2',
    'range': '4/8/12',
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['snaplock musket'] = [];
WEAPONS_TABLE['snaplock musket'].push({
    'name': 'Snaplock Musket',
    'size': 'M',
    'type': 'P',
    'speed': 9,
    'rof': '1/2',
    'range': '14/26/78',
    'small-medium': '1d12',
    'large': '1d12',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['spade'] = [];
WEAPONS_TABLE['spade'].push({
    'name': 'Spade',
    'size': 'M',
    'type': 'S/B',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['spear, one-handed'].push({
    'name': 'Spear, One-handed',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'reach': '1',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['spear, two-handed'].push({
    'name': 'Spear, Two-handed',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '2d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['long spear'] = [];
WEAPONS_TABLE['long spear'].push({
    'name': 'Long spear',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'reach': '2',
    'small-medium': '2d6',
    'large': '3d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['stone spear, one-handed'].push({
    'name': 'Stone spear, One-handed',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'reach': '1',
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['stone spear, two-handed'].push({
    'name': 'Stone spear, Two-handed',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d6',
    'large': '2d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['staff sling, stinkpot'].push({
    'name': 'Staff sling, Stinkpot',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '1',
    'range': '—/6-12/18',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['staff sling, stone'].push({
    'name': 'Staff sling, Stone',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '1',
    'range': '—/6-12/18',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['bastard sword, one-handed'].push({
    'name': 'Bastard sword, One-handed',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d12',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['bastard sword, two-handed'].push({
    'name': 'Bastard sword, Two-handed',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'reach': '1',
    'small-medium': '2d4',
    'large': '2d8',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['broad sword'].push({
    'name': 'Broad sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['claymore'].push({
    'name': 'Claymore',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 7,
    'reach': '1',
    'small-medium': '2d4',
    'large': '2d8',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['cutlass'].push({
    'name': 'Cutlass',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['drusus'].push({
    'name': 'Drusus',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 3,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['estoc'] = [];
WEAPONS_TABLE['estoc'].push({
    'name': 'Estoc',
    'group': 'Sword',
    'size': 'M',
    'type': 'P',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['falchion'].push({
    'name': 'Falchion',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['gladius'] = [];
WEAPONS_TABLE['gladius'].push({
    'name': 'Gladius',
    'group': 'Sword',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['katana, one-handed'].push({
    'name': 'Katana, One-handed',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'reach': '1',
    'small-medium': '1d10',
    'large': '1d12',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['katana, two-handed'].push({
    'name': 'Katana, Two-handed',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'reach': '1',
    'small-medium': '2d6',
    'large': '2d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['khopesh'].push({
    'name': 'Khopesh',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 9,
    'reach': '1',
    'small-medium': '2d4',
    'large': '1d6',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['long sword'].push({
    'name': 'Long sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d12',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});


WEAPONS_TABLE['ninja-to'] = WEAPONS_TABLE['ninja-to (ninja sword)'];
WEAPONS_TABLE['ninja-to'].push({
    'name': 'Ninja-to',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 3,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d6',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['no-dachi'] = WEAPONS_TABLE['no-daichi (two-handed sword)'];
WEAPONS_TABLE['no-dachi'].push({
    'name': 'No-dachi',
    'group': 'Sword',
    'size': 'L',
    'type': 'S/P',
    'speed': 8,
    'reach': '1',
    'small-medium': '1d10',
    'large': '1d20',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['rapier'].push({
    'name': 'Rapier',
    'group': 'Sword',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['sabre'].push({
    'name': 'Sabre',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['sapara'] = [];
WEAPONS_TABLE['sapara'].push({
    'name': 'Sapara',
    'group': 'Sword',
    'size': 'S',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '1d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['scimitar'].push({
    'name': 'Scimitar',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['great scimitar'] = [];
WEAPONS_TABLE['great scimitar'].push({
    'name': 'Great scimitar',
    'group': 'Sword',
    'size': 'L',
    'type': 'S',
    'speed': 9,
    'reach': '1',
    'small-medium': '2d6',
    'large': '4d4',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['short sword'].push({
    'name': 'Short sword',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['spatha'] = [];
WEAPONS_TABLE['spatha'].push({
    'name': 'Spatha',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d12',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['sword-axe'] = [];
WEAPONS_TABLE['sword-axe'].push({
    'name': 'Sword-axe',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'reach': '1',
    'small-medium': '1d8+1',
    'large': '1d12+1',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['tulwar'] = [];
WEAPONS_TABLE['tulwar'].push({
    'name': 'Tulwar',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'reach': '1',
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['two-handed sword'].push({
    'name': 'Two-handed sword',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'reach': '1',
    'small-medium': '1d10',
    'large': '3d6',
    'knockdown': 'd12',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['wakizashi'].push({
    'name': 'Wakizashi',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 3,
    'reach': '1',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['three-piece rod'] = WEAPONS_TABLE['three-section staff'];
WEAPONS_TABLE['three-piece rod'].push({
    'name': 'Three-piece rod',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['torch'] = [];
WEAPONS_TABLE['torch'].push({
    'name': 'Torch',
    'noProf': true,
    'size': 'M',
    'type': 'Bd',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['trident, one-handed'].push({
    'name': 'Trident, One-handed',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'reach': '1',
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee','Range']
});

WEAPONS_TABLE['trident, two-handed'].push({
    'name': 'Trident, Two-handed',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'reach': '1',
    'small-medium': '1d8+1',
    'large': '3d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});

WEAPONS_TABLE['vial'] = [];
WEAPONS_TABLE['vial'].push({
    'name': 'Vial',
    'noProf': true,
    'size': 'S',
    'type': '',
    'speed': 2,
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '',
    'large': '',
    'knockdown': '—',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['warhammer'].push({
    'name': 'Warhammer',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'reach': '1',
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['wheellock arquebus'] = [];
WEAPONS_TABLE['wheellock arquebus'].push({
    'name': 'Wheellock Arquebus',
    'size': 'M',
    'type': 'P',
    'speed': 8,
    'rof': '1/2',
    'range': '10/20/60',
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['wheellock belt pistol'] = [];
WEAPONS_TABLE['wheellock belt pistol'].push({
    'name': 'Wheellock Belt pistol',
    'size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1/2',
    'range': '3/6/9',
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});

WEAPONS_TABLE['wheellock horse pistol'] = [];
WEAPONS_TABLE['wheellock horse pistol'].push({
    'name': 'Wheellock Horse pistol',
    'size': 'S',
    'type': 'P',
    'speed': 8,
    'rof': '1/2',
    'range': '4/8/12',
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8cs>7!>7',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Range']
});
WEAPONS_TABLE['whip'].push({
    'name': 'Whip',
    'size': 'M',
    'type': '—',
    'speed': 8,
    'reach': '3',
    'small-medium': '1d2',
    'large': '1',
    'knockdown': '—',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});
WEAPONS_TABLE['shield-punch, small shield'] = [];
WEAPONS_TABLE['shield-punch, small shield'].push({
    'name': 'Shield-Punch, Small shield',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'reach': '1',
    'small-medium': '1d3',
    'large': '1d3',
    'knockdown': 'd6',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});
WEAPONS_TABLE['shield-punch, medium shield'] = [];
WEAPONS_TABLE['shield-punch, medium shield'].push({
    'name': 'Shield-Punch, Medium shield',
    'noProf': true,
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd8',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});
WEAPONS_TABLE['shield-punch, large shield'] = [];
WEAPONS_TABLE['shield-punch, large shield'].push({
    'name': 'Shield-Punch, Large shield',
    'noProf': true,
    'size': 'L',
    'type': 'B',
    'speed': 8,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd10',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});
WEAPONS_TABLE['shield-rush, small shield'] = [];
WEAPONS_TABLE['shield-rush, small shield'].push({
    'name': 'Shield-Rush, Small shield',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 0,
    'reach': '1',
    'small-medium': '1d3',
    'large': '1d3',
    'knockdown': '0',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});
WEAPONS_TABLE['shield-rush, medium shield'] = [];
WEAPONS_TABLE['shield-rush, medium shield'].push({
    'name': 'Shield-Rush, Medium shield',
    'noProf': true,
    'size': 'M',
    'type': 'B',
    'speed': 0,
    'reach': '1',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': '+1',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});
WEAPONS_TABLE['shield-rush, large shield'] = [];
WEAPONS_TABLE['shield-rush, large shield'].push({
    'name': 'Shield-Rush, Large shield',
    'noProf': true,
    'size': 'L',
    'type': 'B',
    'speed': 0,
    'reach': '1',
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': '+3',
    'book': ['Player\'s Option: Combat & Tactics'],
    'category': ['Melee']
});
//#endregion

//#region Player's Option: Skills & Powers
WEAPONS_TABLE['adze'].push({
    'name': 'Adze',
    'size': 'S',
    'type': 'S/P',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['ankus'].push({
    'name': 'Ankus',
    'size': 'M',
    'type': 'P/B',
    'speed': 6,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['stone axe'].push({
    'name': 'Stone axe',
    'size': 'M',
    'type': 'B/S',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['bagh nakh'].push({
    'name': 'Bagh nakh',
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '?',
    'large': '?',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['battle axe'].push({
    'name': 'Battle axe',
    'size': 'M',
    'type': 'S',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d10',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['blowgun, barbed dart'].push({
    'name': 'Blowgun, Barbed Dart',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '2/1',
    'range': '2/4/6',
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['blowgun, needle'].push({
    'name': 'Blowgun, Needle',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '2/1',
    'range': '2/4/6',
    'small-medium': '1',
    'large': '—',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['bolas'].push({
    'name': 'Bolas',
    'size': 'M',
    'type': 'B',
    'speed': 8,
    'rof': '1',
    'range': '6/12/18',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['boomerang'].push({
    'name': 'Boomerang',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'rof': '1',
    'range': '4/8/12',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee','Range']
});
WEAPONS_TABLE['composite long bow, flight arrow'].push({
    'name': 'Composite long bow, Flight arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/34',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, sheaf arrow'].push({
    'name': 'Composite long bow, Sheaf arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/34',
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, pile arrow'].push({
    'name': 'Composite long bow, Pile arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/34',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['composite long bow, stone arrow'].push({
    'name': 'Composite long bow, Stone arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/34',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['composite short bow, flight arrow'].push({
    'name': 'Composite short bow, Flight arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '10/20/36',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['composite short bow, stone arrow'].push({
    'name': 'Composite short bow, Stone arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '10/20/36',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, flight arrow'].push({
    'name': 'Long bow, Flight arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '14/28/42',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, sheaf arrow'].push({
    'name': 'Long bow, Sheaf arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '10/20/34',
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, pile arrow'].push({
    'name': 'Long bow, Pile arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '10/20/34',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['long bow, stone arrow'].push({
    'name': 'Long bow, Stone arrow',
    'size': 'L',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '14/28/42',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['short bow, flight arrow'].push({
    'name': 'Short bow, Flight arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '10/20/30',
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['short bow, stone arrow'].push({
    'name': 'Short bow, Stone arrow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '2/1',
    'range': '8/16/24',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['brandistock'].push({
    'name': 'Brandistock',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['caltrop'].push({
    'name': 'Caltrop',
    'size': 'S',
    'type': 'P',
    'speed': 0,
    'small-medium': '1',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': []
});
WEAPONS_TABLE['cestus'].push({
    'name': 'Cestus',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['chain'].push({
    'name': 'Chain',
    'size': 'L',
    'type': 'B',
    'speed': 5,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['chakram'].push({
    'name': 'Chakram',
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'rof': '2/1',
    'range': '4/8/12',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['chijikiri'].push({
    'name': 'Chijikiri',
    'size': 'M',
    'type': 'P/B',
    'speed': 7,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['club'].push({
    'name': 'Club',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['cho-ku-no, light quarrel'].push({
    'name': 'Cho-ku-no, Light quarrel',
    'group': 'Crossbow',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 6,
    'rof': '2/1',
    'range': '10/20/30',
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['hand crossbow, hand quarrel'].push({
    'name': 'Hand crossbow, Hand quarrel',
    'size': 'S',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 5,
    'rof': '1',
    'range': '4/8/12',
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['heavy crossbow, heavy quarrel'].push({
    'name': 'Heavy crossbow, Heavy quarrel',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 10,
    'rof': '1/2',
    'range': '16/32/48',
    'small-medium': '1d8+1',
    'large': '1d10+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['light crossbow, light quarrel'].push({
    'name': 'Light crossbow, Light quarrel',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '12/24/36',
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['pellet bow, pellet'].push({
    'name': 'Pellet bow, Pellet',
    'group': 'Crossbow',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'rof': '1',
    'range': '8/16/24',
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['dagger'].push({
    'name': 'Dagger',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['bone dagger'].push({
    'name': 'Bone dagger',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['jambiya'].push({
    'name': 'Jambiya',
    'group': 'Dagger',
    'size': 'S',
    'type': 'P/S',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['katar'].push({
    'name': 'Katar',
    'group': 'Dagger',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d3+1',
    'large': '1d3',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['main-gauche'].push({
    'name': 'Main-gauche',
    'group': 'Dagger',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['stiletto'].push({
    'name': 'Stiletto',
    'group': 'Dagger',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['stone dagger'].push({
    'name': 'Stone dagger',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['dart'].push({
    'name': 'Dart',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '3/1',
    'range': '2/4/8',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['footman\'s flail'].push({
    'name': 'Footman\'s flail',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['gunsen'].push({
    'name': 'Gunsen',
    'size': 'S',
    'type': 'B/P',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['hand axe'].push({
    'name': 'Hand axe',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee','Range']
});
WEAPONS_TABLE['harpoon'].push({
    'name': 'Harpoon',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '2d4',
    'large': '2d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['bone harpoon'].push({
    'name': 'Bone harpoon',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d10',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['javelin'].push({
    'name': 'Javelin',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'rof': '1',
    'range': '4/8/12',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['stone javelin'].push({
    'name': 'Stone javelin',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'rof': '1',
    'range': '3/6/9',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['jitte'].push({
    'name': 'Jitte',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['kama'].push({
    'name': 'Kama',
    'size': 'S',
    'type': 'P/S',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['kau sin ke'].push({
    'name': 'Kau sin ke',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['kawanaga'].push({
    'name': 'Kawanaga',
    'size': 'S',
    'type': 'P/B',
    'speed': 7,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['knife'].push({
    'name': 'Knife',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'rof': '2/1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['bone knife'].push({
    'name': 'Bone knife',
    'noProf': true,
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'rof': '2/1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['stone knife'].push({
    'name': 'Stone knife',
    'noProf': true,
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'rof': '2/1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d2',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});

WEAPONS_TABLE['throwing knife'].push({
    'name': 'Throwing knife',
    'noProf': true,
    'size': 'M',
    'type': 'P/S',
    'speed': 8,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '2d4',
    'large': '1d6+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['kusari-gama'].push({
    'name': 'Kusari-gama',
    'size': 'M',
    'type': 'S/P/B',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['light lance'].push({
    'name': 'Light lance',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 6,
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['medium lance'].push({
    'name': 'Medium lance',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['heavy lance'].push({
    'name': 'Heavy lance',
    'noProf': true,
    'size': 'L',
    'type': 'P',
    'speed': 10,
    'small-medium': '1d8+1',
    'large': '3d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['jousting lance'].push({
    'name': 'Jousting lance',
    'size': 'L',
    'type': 'B',
    'speed': 10,
    'small-medium': '1d3-1',
    'large': '1d2-1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['lasso'].push({
    'name': 'Lasso',
    'size': 'M',
    'type': '—',
    'speed': 10,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '',
    'large': '',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['horseman\'s mace'].push({
    'name': 'Horseman\'s mace',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['mace-axe'].push({
    'name': 'Mace-axe',
    'size': 'M',
    'type': 'B/S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '1d6+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['machete'].push({
    'name': 'Machete',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'small-medium': '1d8',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['maul'].push({
    'name': 'Maul',
    'size': 'L',
    'type': 'B',
    'speed': 8,
    'small-medium': '2d4',
    'large': '1d10',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['morningstar'].push({
    'name': 'Morningstar',
    'noProf': true,
    'size': 'M',
    'type': 'B/P',
    'speed': 7,
    'small-medium': '2d4',
    'large': '1d6+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['net'].push({
    'name': 'Net',
    'size': 'M',
    'type': '—',
    'speed': 10,
    'rof': '1/2',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '',
    'large': '',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee','Range']
});
WEAPONS_TABLE['pilum'].push({
    'name': 'Pilum',
    'size': 'M',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d6',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['pike'].push({
    'name': 'Pike',
    'size': 'L',
    'type': 'P',
    'speed': 13,
    'small-medium': '1d6',
    'large': '1d12',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['awl pike'].push({
    'name': 'Awl Pike',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 13,
    'small-medium': '1d6',
    'large': '1d12',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['bec de corbin'].push({
    'name': 'Bec de Corbin',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['bill'].push({
    'name': 'Bill',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '1d10',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['bill-guisarme'].push({
    'name': 'Bill-Guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '1d10',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['fauchard'].push({
    'name': 'Fauchard',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['glaive-guisarme'].push({
    'name': 'Glaive-Guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '2d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['lajatang'].push({
    'name': 'Lajatang',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 6,
    'small-medium': '1d10',
    'large': '1d10',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['nagimaki'].push({
    'name': 'Nagimaki',
    'group': 'Polearm',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['naginata'].push({
    'name': 'Naginata',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d10',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['rock'].push({
    'name': 'Rock',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'rof': '2/1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['sai'].push({
    'name': 'Sai',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d2',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['sang kauw'].push({
    'name': 'Sang Kauw',
    'size': 'L',
    'type': 'P/S',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['shuriken'].push({
    'name': 'Shuriken',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'rof': '2/1',
    'range': '3/6/9',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['sling, bullet'].push({
    'name': 'Sling, Bullet',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '10/20/30',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});

WEAPONS_TABLE['sling, stone'].push({
    'name': 'Sling, Stone',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'rof': '1',
    'range': '8/16/24',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['spear, one-handed'].push({
    'name': 'Spear, One-handed',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['long spear'].push({
    'name': 'Long spear',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '2d6',
    'large': '3d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['stone spear, one-handed'].push({
    'name': 'Stone spear, One-handed',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d4',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee','Range']
});
WEAPONS_TABLE['staff sling, stinkpot'].push({
    'name': 'Staff sling, Stinkpot',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '1',
    'range': '6/12/18',
    'strength': true,
    'small-medium': '1d3',
    'large': '1d3',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['staff sling, stone'].push({
    'name': 'Staff sling, Stone',
    'size': 'M',
    'ammo-size': 'S',
    'type': 'B',
    'speed': 11,
    'rof': '1',
    'range': '6/12/18',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Range']
});
WEAPONS_TABLE['bastard sword, two-handed'].push({
    'name': 'Bastard sword, Two-handed',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'small-medium': '2d4',
    'large': '2d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['claymore'].push({
    'name': 'Claymore',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 7,
    'small-medium': '2d4',
    'large': '2d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['cutlass'].push({
    'name': 'Cutlass',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['falchion'].push({
    'name': 'Falchion',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6+1',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['gladius'].push({
    'name': 'Gladius',
    'group': 'Sword',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['great scimitar'].push({
    'name': 'Great scimitar',
    'group': 'Sword',
    'size': 'L',
    'type': 'S',
    'speed': 9,
    'small-medium': '2d6',
    'large': '4d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['ninja-to'].push({
    'name': 'Ninja-to',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 3,
    'small-medium': '1d8',
    'large': '1d6',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['no-dachi'].push({
    'name': 'No-dachi',
    'group': 'Sword',
    'size': 'L',
    'type': 'S/P',
    'speed': 8,
    'small-medium': '1d10',
    'large': '1d20',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['rapier'].push({
    'name': 'Rapier',
    'group': 'Sword',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['sabre'].push({
    'name': 'Sabre',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['sapara'].push({
    'name': 'Sapara',
    'group': 'Sword',
    'size': 'S',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6+1',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['spatha'].push({
    'name': 'Spatha',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d8',
    'large': '1d12',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['sword-axe'].push({
    'name': 'Sword-axe',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '1d8+1',
    'large': '1d12+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['tulwar'].push({
    'name': 'Tulwar',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6+1',
    'large': '2d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['three-piece rod'].push({
    'name': 'Three-piece rod',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d6',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['trident, one-handed'].push({
    'name': 'Trident, One-handed',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'rof': '1',
    'range': '2/3/4',
    'strength': true,
    'small-medium': '1d6+1',
    'large': '2d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee','Range']
});
WEAPONS_TABLE['two-handed axe'].push({
    'name': 'Two-handed axe',
    'noProf': true,
    'size': 'L',
    'type': 'S',
    'speed': 9,
    'small-medium': '1d10',
    'large': '2d8',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee']
});
WEAPONS_TABLE['warhammer'].push({
    'name': 'Warhammer',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
WEAPONS_TABLE['war club'].push({
    'name': 'War club',
    'size': 'M',
    'type': 'B/S',
    'speed': 7,
    'rof': '1',
    'range': '2/4/6',
    'strength': true,
    'small-medium': '1d6+1',
    'large': '1d4+1',
    'book': ['Player\'s Option: Skills & Powers'],
    'category': ['Melee', 'Range']
});
//#endregion
module.exports = WEAPONS_TABLE;