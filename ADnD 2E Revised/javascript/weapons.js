//#region Player's Handbook
const weapons = {};
weapons['arquebus'] = {
    'name': 'Arquebus',
    'rof': '1/3',
    'range': '50/150/210',
    'size': 'M',
    'type': 'P',
    'speed': 15,
    'small-medium': '1d10!',
    'large': '1d10!',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Range']
};
weapons['battle axe'] = {
    'name': 'Battle axe',
    'size': 'M',
    'type': 'S',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['blowgun (barbed dart)'] = {
    'name': 'Blowgun (Barbed Dart)',
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'PHB',
    'category': ['Range']
};
weapons['blowgun (needle)'] = {
    ...weapons['blowgun (barbed dart)'],
    'name': 'Blowgun (Needle)',
    'small-medium': '1',
    'large': '1',
};
weapons['short bow (flight arrow)'] = {
    'name': 'Short bow (Flight arrow)',
    'rof': '2/1',
    'range': '50/100/150',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
};
weapons['long bow (flight arrow)'] = {
    'name': 'Long bow (Flight arrow)',
    'rof': '2/1',
    'range': '70/140/210',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
};
weapons['long bow (sheaf arrow)'] = {
    ...weapons['long bow (flight arrow)'],
    'name': 'Long bow (Sheaf arrow)',
    'range': '50/100/150',
    'small-medium': '1d8',
    'large': '1d8',
};
weapons['composite short bow (flight arrow)'] = {
    'name': 'Composite short bow (Flight arrow)',
    'rof': '2/1',
    'range': '50/100/180',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
};
weapons['composite long bow (flight arrow)'] = {
    'name': 'Composite long bow (Flight arrow)',
    'rof': '2/1',
    'range': '60/120/210',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
};
weapons['composite long bow (sheaf arrow)'] = {
    ...weapons['composite long bow (flight arrow)'],
    'name': 'Composite long bow (Sheaf arrow)',
    'range': '40/80/170',
    'small-medium': '1d8',
    'large': '1d8',
};
weapons['club'] = {
    'name': 'Club',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d3',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['hand crossbow'] = {
    'name': 'Hand crossbow',
    'rof': '1',
    'range': '20/40/60',
    'size': 'S',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'PHB',
    'category': ['Range']
};
weapons['light crossbow'] = {
    'name': 'Light crossbow',
    'rof': '1',
    'range': '60/120/180',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
};
weapons['heavy crossbow'] = {
    'name': 'Heavy crossbow',
    'rof': '1/2',
    'range': '80/160/240',
    'size': 'M',
    'type': 'P',
    'speed': 10,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
};
weapons['dagger'] = {
    'name': 'Dagger',
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['dirk'] = {
    'name': 'Dirk',
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['dart'] = {
    'name': 'Dart',
    'strength': true,
    'rof': '3/1',
    'range': '10/20/40',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'PHB',
    'category': ['Range']
};
weapons['footman\'s flail'] = {
    'name': 'Footman\'s flail',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd12',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['footman\'s mace'] = {
    'name': 'Footman\'s mace',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '1d6',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['footman\'s pick'] = {
    'name': 'Footman\'s pick',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['hand axe'] = {
    'name': 'Hand axe',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['harpoon'] = {
    'name': 'Harpoon',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['horseman\'s flail'] = {
    'name': 'Horseman\'s flail',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+1',
    'large': '1d4+1',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['horseman\'s mace'] = {
    'name': 'Horseman\'s mace',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['horseman\'s pick'] = {
    'name': 'Horseman\'s pick',
    'size': 'M',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['javelin'] = {
    'name': 'Javelin',
    'strength': true,
    'rof': '1',
    'range': '20/40/60',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['knife'] = {
    'name': 'Knife',
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['heavy horse lance'] = {
    'name': 'Heavy horse lance',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d8+1',
    'large': '3d6',
    'knockdown': 'd12',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['light horse lance'] = {
    'name': 'Light horse lance',
    'size': 'L',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['jousting lance'] = {
    'name': 'Jousting lance',
    'size': 'L',
    'type': 'P',
    'speed': 10,
    'small-medium': '1d3-1',
    'large': '1d2-1',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['medium horse lance'] = {
    'name': 'Medium horse lance',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d6',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['mancatcher'] = {
    'name': 'Mancatcher',
    'size': 'L',
    'type': '—',
    'speed': 7,
    'small-medium': '—',
    'large': '—',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['morning star'] = {
    'name': 'Morning star',
    'size': 'M',
    'type': 'P/B',
    'speed': 7,
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['awl pike'] = {
    'name': 'Awl pike',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 13,
    'small-medium': '1d6',
    'large': '1d12',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['bardiche'] = {
    'name': 'Bardiche',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd12',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['bec de corbin'] = {
    'name': 'Bec de corbin',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'small-medium': '1d8',
    'large': '1d6',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['bill-guisarme'] = {
    'name': 'Bill-guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '1d10',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['fauchard'] = {
    'name': 'Fauchard',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['fauchard-fork'] = {
    'name': 'Fauchard-fork',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['glaive'] = {
    'name': 'Glaive',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d10',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['glaive-guisarme'] = {
    'name': 'Glaive-guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['guisarme'] = {
    'name': 'Guisarme',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '1d8',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['guisarme-voulge'] = {
    'name': 'Guisarme-voulge',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '2d4',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['halberd'] = {
    'name': 'Halberd',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'small-medium': '1d10',
    'large': '2d6',
    'knockdown': 'd12',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['hook fauchard'] = {
    'name': 'Hook fauchard',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 9,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['lucern hammer'] = {
    'name': 'Lucern hammer',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'small-medium': '2d4',
    'large': '1d6',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['military fork'] = {
    'name': 'Military fork',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '2d4',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['partisan'] = {
    'name': 'Partisan',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 9,
    'small-medium': '1d6',
    'large': '1d6+1',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['ranseur'] = {
    'name': 'Ranseur',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d4',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['spetum'] = {
    'name': 'Spetum',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d6+1',
    'large': '2d6',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['voulge'] = {
    'name': 'Voulge',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '2d4',
    'knockdown': 'd12',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['quarterstaff'] = {
    'name': 'Quarterstaff',
    'size': 'L',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['scourge'] = {
    'name': 'Scourge',
    'size': 'S',
    'type': '—',
    'speed': 5,
    'small-medium': '1d4',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['sickle'] = {
    'name': 'Sickle',
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd4',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['sling (bullet)'] = {
    'name': 'Sling (Bullet)',
    'strength': true,
    'rof': '1',
    'range': '50/100/200',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'knockdown': 'd4',
    'book': 'PHB',
    'category': ['Range']
};
weapons['sling (stone)'] = {
    ...weapons['sling (bullet)'],
    'name': 'Sling (Stone)',
    'range': '40/80/160',
    'small-medium': '1d4',
    'large': '1d4',
};
weapons['spear'] = {
    'name': 'Spear',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['staff sling (bullet)'] = {
    'name': 'Staff sling (Bullet)',
    'strength': true,
    'rof': '2/1',
    'range': '—/30-60/90',
    'size': 'M',
    'type': 'B',
    'speed': 11,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': 'PHB',
    'category': ['Range']
};
weapons['staff sling (stone)'] = {
    ...weapons['staff sling (bullet)'],
    'name': 'Staff sling (Stone)',
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
};
weapons['bastard sword (one-handed)'] = {
    'name': 'Bastard sword (One-handed)',
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'small-medium': '1d8',
    'large': '1d12',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['bastard sword (two-handed)'] = {
    ...weapons['bastard sword (one-handed)'],
    'name': 'Bastard sword (Two-handed)',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d8',
    'knockdown': 'd10',
};
weapons['broad sword'] = {
    'name': 'Broad sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['khopesh'] = {
    'name': 'Khopesh',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '1d6',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['long sword'] = {
    'name': 'Long sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d8',
    'large': '1d12',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['scimitar'] = {
    'name': 'Scimitar',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['short sword'] = {
    'name': 'Short sword',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['two-handed sword'] = {
    'name': 'Two-handed sword',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '1d10',
    'large': '3d6',
    'knockdown': 'd12',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['acid'] = {
    'name': 'Acid',
    'group': 'Throw',
    'noProf': true,
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '2d4',
    'large': '1',
    'book': 'PHB',
    'category': ['Range']
};
weapons['holy water'] = {
    'name': 'Holy water',
    'group': 'Throw',
    'noProf': true,
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d6+1',
    'large': '2',
    'book': 'PHB',
    'category': ['Range']
};
weapons['oil (lit)'] = {
    'name': 'Oil (lit)',
    'group': 'Throw',
    'noProf': true,
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '2d6',
    'large': '1d3',
    'book': 'PHB',
    'category': ['Range']
};
weapons['poison'] = {
    'name': 'Poison',
    'group': 'Throw',
    'noProf': true,
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '',
    'large': '',
    'book': 'PHB',
    'category': ['Range']
};
weapons['throw misc.'] = {
    'name': 'Throw misc.',
    'group': 'Throw',
    'noProf': true,
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '',
    'large': '',
    'book': 'PHB',
    'category': ['Range']
};
weapons['trident'] = {
    'name': 'Trident',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '3d4',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['warhammer'] = {
    'name': 'Warhammer',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd8',
    'book': 'PHB',
    'category': ['Melee','Range']
};
weapons['whip'] = {
    'name': 'Whip',
    'size': 'M',
    'type': '—',
    'speed': 8,
    'small-medium': '1d2',
    'large': '1',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['punching (bare-handed)'] = {
    'name': 'Punching (Bare-handed)',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d2',
    'large': '1d2',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['punching (gauntlets / knuckles)'] = {
    'name': 'Punching (Gauntlets / Knuckles)',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d3',
    'large': '1d3',
    'book': 'PHB',
    'category': ['Melee']
};
weapons['wrestling'] = {
    'name': 'Wrestling',
    'noProf': true,
    'size': '—',
    'type': 'B',
    'speed': 3,
    'small-medium': '1',
    'large': '1',
    'book': 'PHB',
    'category': ['Melee']
};
//#endregion

//region The Complete Fighter's Handbook
weapons['belaying pin'] = {
    'name': 'Belaying pin',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d3',
    'large': '1d3',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['bo stick'] = {
    'name': 'Bo stick',
    'size': 'L',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['bolas'] = {
    'name': 'Bolas',
    'strength': true,
    'rof': '1',
    'range': '30/60/90',
    'size': 'M',
    'type': 'B',
    'speed': 8,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd8',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Range']
};
weapons['cestus'] = {
    'name': 'Cestus',
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['chain'] = {
    'name': 'Chain',
    'strength': true,
    'rof': '*',
    'range': '5/10/20',
    'size': 'L',
    'type': 'B',
    'speed': 5,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['dagger, bone'] = {
    ...weapons['dagger'],
    'name': 'Dagger, Bone',
    'small-medium': '1d2',
    'large': '1d2',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['dagger, stone'] = {
    ...weapons['dagger'],
    'name': 'Dagger, Stone',
    'small-medium': '1d3',
    'large': '1d2',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['daikyu (daikyu arrow)'] = {
    'name': 'Daikyu (Daikyu arrow)',
    'rof': '2/1',
    'range': '70/140/210',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Range']
};
weapons['graff/hook'] = {
    'name': 'Graff/hook',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd4',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['harpoon (one-handed)'] = {
    ...weapons['harpoon'],
    'name': 'Harpoon (One-handed)',
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'knockdown': '',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['javelin, stone (one-handed)'] = {
    ...weapons['javelin'],
    'name': 'Javelin, Stone (One-handed)',
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Fighter\'s Handbook',
};
weapons['javelin, stone (two-handed)'] = {
    ...weapons['javelin'],
    'name': 'Javelin, Stone (Two-handed)',
    'small-medium': '1d4+1',
    'large': '1d6',
    'knockdown': '',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['knife, bone'] = {
    ...weapons['knife'],
    'name': 'Knife, Bone',
    'small-medium': '1d2',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['knife, stone'] = {
    ...weapons['knife, bone'],
    'name': 'Knife, Stone'
};
weapons['lasso'] = {
    'name': 'Lasso',
    'strength': true,
    'rof': '*',
    'range': '10/20/30',
    'size': 'L',
    'type': '—',
    'speed': 10,
    'small-medium': '',
    'large': '',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Range']
};
weapons['main-gauche'] = {
    'name': 'Main-gauche',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['net'] = {
    'name': 'Net',
    'strength': true,
    'rof': '*',
    'range': '10/20/30',
    'size': 'M',
    'type': '—',
    'speed': 10,
    'small-medium': '',
    'large': '',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Range']
};
weapons['nunchaku'] = {
    'name': 'Nunchaku',
    'size': 'M',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd8',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['naginata'] = {
    'name': 'Naginata',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d10',
    'knockdown': 'd8',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['tetsubo'] = {
    'name': 'Tetsubo',
    'group': 'Polearm',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd12',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['sai'] = {
    'name': 'Sai',
    'size': 'S',
    'type': 'P/B',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d2',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['shuriken'] = {
    'name': 'Shuriken',
    'strength': true,
    'rof': '2/1',
    'range': '20/40/60',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Range']
};
weapons['Spear (two-handed)'] = {
    ...weapons['spear'],
    'name': 'Spear (Two-handed)',
    'small-medium': '1d8+1',
    'large': '2d6',
    'knockdown': 'd8',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['spear, stone (one-handed)'] = {
    ...weapons['spear'],
    'name': 'Spear, Stone (One-handed)',
    'small-medium': '1d4',
    'large': '1d6',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['spear, stone (two-handed)'] = {
    ...weapons['spear'],
    'name': 'Spear, Stone (Two-handed)',
    'small-medium': '1d6',
    'large': '2d4',
    'knockdown': 'd8',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['long spear (one-handed)'] = {
    'name': 'Long spear (One-handed)',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d8+1',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['long spear (two-handed)'] = {
    ...weapons['long spear (one-handed)'],
    'name': 'Long spear (Two-handed)',
    'small-medium': '2d6',
    'large': '3d6',
    'knockdown': 'd8',
};
weapons['stiletto'] = {
    'name': 'Stiletto',
    'group': 'Knife',
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['cutlass'] = {
    'name': 'Cutlass',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd8',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['drusus'] = {
    'name': 'Drusus',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 3,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['katana (one-handed)'] = {
    'name': 'Katana (One-handed)',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'small-medium': '1d10',
    'large': '1d12',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['katana (two-handed)'] = {
    ...weapons['katana (one-handed)'],
    'name': 'Katana (Two-handed)',
    'small-medium': '2d6',
    'large': '2d6',
    'knockdown': 'd8',
};
weapons['rapier'] = {
    'name': 'Rapier',
    'group': 'Sword',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['sabre'] = {
    'name': 'Sabre',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'knockdown': 'd8',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['wakizashi'] = {
    'name': 'Wakizashi',
    'group': 'Sword',
    'size': 'M',
    'type': 'S/P',
    'speed': 3,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['trident (one-handed)'] = {
    ...weapons['trident'],
    'name': 'Trident (One-handed)',
    'strength': true,
    'rof': '1',
    'range': '0/10/20',
    'small-medium': '1d6+1',
    'large': '3d4',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee','Range']
};
weapons['trident (two-handed)'] = {
    ...weapons['trident'],
    'name': 'Trident (Two-handed)',
    'small-medium': '1d8+1',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['shield-punch'] = {
    'name': 'Shield-Punch',
    'group': 'Buckler/Small/Medium Shield',
    'noProf': true,
    'size': 'S/M',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d3',
    'knockdown': 'd6',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['shield-rush'] = {
    'name': 'Shield-Rush',
    'group': 'Medium/Body Shield',
    'noProf': true,
    'size': 'M/L',
    'type': 'B',
    'speed': 0,
    'small-medium': '1d3',
    'large': '1d3',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
weapons['martial arts'] = {
    'name': 'Martial Arts',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '',
    'large': '',
    'book': 'The Complete Fighter\'s Handbook',
    'category': ['Melee']
};
//endregion

//region The Complete Priest's Handbook
weapons['bill'] = {
    'name': 'Bill',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': '',
    'book': 'The Complete Priest\'s Handbook',
    'category': ['Melee']
};
weapons['maul'] = {
    'name': 'Maul',
    'size': 'L',
    'type': 'B',
    'speed': 9,
    'small-medium': '2d4',
    'large': '1d10',
    'knockdown': 'd12',
    'book': 'The Complete Priest\'s Handbook',
    'category': ['Melee']
};
weapons['scythe'] = {
    'name': 'Scythe',
    'size': 'M',
    'type': 'P/S',
    'speed': 8,
    'small-medium': '1d6+1',
    'large': '1d8',
    'knockdown': 'd8',
    'book': 'The Complete Priest\'s Handbook',
    'category': ['Melee']
};
//endregion

//#region Arms and Equipment
weapons['parrying dagger'] = {
    'name': 'Parrying dagger',
    'noProf': true,
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d3',
    'knockdown': 'd6',
    'book': 'Arms and Equipment Guide',
    'category': ['Melee']
};
weapons['renseur'] = {
    'name': 'Renseur',
    'group': 'Polearm',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d4',
    'knockdown': 'd8',
    'book': 'Arms and Equipment Guide',
    'category': ['Melee']
};
weapons['sap'] = {
    'name': 'Sap',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d2',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'Arms and Equipment Guide',
    'category': ['Melee']
};
weapons['staff sling (stinkpot)'] = {
    'name': 'Staff sling (Stinkpot)',
    'strength': true,
    'rof': '2/1',
    'range': '—/30-60/90',
    'size': 'M',
    'type': 'B',
    'speed': 11,
    'small-medium': '1d3',
    'large': '1d3',
    'knockdown': 'd6',
    'book': 'Arms and Equipment Guide',
    'category': ['Range']
};
weapons['claymore'] = {
    'name': 'Claymore',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d8',
    'knockdown': 'd10',
    'book': 'Arms and Equipment Guide',
    'category': ['Melee']
};
weapons['falchion'] = {
    'name': 'Falchion',
    'group': 'Sword',
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd8',
    'book': 'Arms and Equipment Guide',
    'category': ['Melee']
};
//#endregion

//#region The Complete Book of Dwarves
weapons['two-handed battle axe'] = {
    'name': 'Two-handed Battle axe',
    'size': 'M',
    'type': 'S',
    'speed': 9,
    'small-medium': '1d10',
    'large': '2d8',
    'knockdown': 'd12',
    'book': 'The Complete Book of Dwarves',
    'category': ['Melee']
};
weapons['head spike'] = {
    'name': 'Head spike',
    'group': 'Close Combat',
    'noProf': true,
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d8',
    'book': 'The Complete Book of Dwarves',
    'category': ['Melee']
};
weapons['elbow spike'] = {
    'name': 'Elbow spike',
    'group': 'Close Combat',
    'noProf': true,
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Book of Dwarves',
    'category': ['Melee']
};
weapons['knee spike'] = {
    'name': 'Knee spike',
    'group': 'Close Combat',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 1,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Book of Dwarves',
    'category': ['Melee']
};
weapons['glove nail'] = {
    'name': 'Glove Nail',
    'group': 'Close Combat',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': 'The Complete Book of Dwarves',
    'category': ['Melee']
};
weapons['chain flail'] = {
    'name': 'Chain flail',
    'group': 'Close Combat',
    'size': 'L',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+2',
    'large': '1d4+1',
    'book': 'The Complete Book of Dwarves',
    'category': ['Melee']
};
//#endregion

//#region The Complete Book of Elves
weapons['bow (melee)'] = {
    'name': 'Bow (Melee)',
    'noProf': true,
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6-1',
    'large': '1d4',
    'book': 'The Complete Book of Elves',
    'category': ['Melee']
};
weapons['elven bow (melee)'] = {
    'name': 'Elven Bow (Melee)',
    'noProf': true,
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d3',
    'book': 'The Complete Book of Elves',
    'category': ['Melee']
};
//#endregion

//#region The Complete Book of Humanoids
weapons['great club'] = {
    'name': 'Great Club',
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd12',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['dart, barbed '] = {
    'name': 'Dart, barbed',
    'strength': true,
    'rof': '3/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee', 'Range']
};
weapons['flindbar'] = {
    'name': 'Flindbar',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['goblin stick'] = {
    'name': 'Goblin stick',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d6',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['flight lance'] = {
    'name': 'Flight lance',
    'size': 'L',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6+1',
    'large': '2d6',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['body spikes'] = {
    'name': 'Body spikes',
    'group': 'Close-quarter',
    'noProf': true,
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '',
    'large': '',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['kick-slasher'] = {
    'name': 'Kick-slasher',
    'group': 'Close-quarter',
    'noProf': true,
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['punch-cutter'] = {
    'name': 'Punch-cutter',
    'group': 'Close-quarter',
    'noProf': true,
    'size': 'S',
    'type': 'S',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['giant-kin long bow (voadkyn)'] = {
    'name': 'Giant-kin Long bow (Voadkyn)',
    'rof': '2/1',
    'range': '75/150/255',
    'size': 'G',
    'type': 'P',
    'speed': 10,
    'small-medium': '1d8',
    'large': '1d8',
    'book': 'The Complete Book of Humanoids',
    'category': ['Range']
};
weapons['giant-kin dagger'] = {
    'name': 'Giant-kin Dagger',
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'G',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d8',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee', 'Range']
};
weapons['giant-kin halberd'] = {
    'name': 'Giant-kin Halberd',
    'size': 'G',
    'type': 'P/S',
    'speed': 12,
    'small-medium': '1d12',
    'large': '2d8',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['giant-kin mace'] = {
    'name': 'Giant-kin Mace',
    'size': 'G',
    'type': 'B',
    'speed': 8,
    'small-medium': '1d8*2',
    'large': '1d6*2',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['giant-kin two-handed sword'] = {
    'name': 'Giant-kin Two-handed sword',
    'size': 'G',
    'type': 'S',
    'speed': 13,
    'small-medium': '1d10*2',
    'large': '3d6*2',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['pixie bow (forget arrow)'] = {
    'name': 'Pixie Bow (Forget arrow)',
    'rof': '2/1',
    'range': '25/50/75',
    'size': 'T',
    'type': 'P',
    'speed': 4,
    'small-medium': '',
    'large': '',
    'book': 'The Complete Book of Humanoids',
    'category': ['Range']
};
weapons['pixie bow (sleep arrow)'] = {
    'name': 'Pixie Bow (Sleep arrow)',
    'rof': '2/1',
    'range': '25/50/75',
    'size': 'T',
    'type': 'P',
    'speed': 4,
    'small-medium': '',
    'large': '',
    'book': 'The Complete Book of Humanoids',
    'category': ['Range']
};
weapons['pixie bow (war arrow)'] = {
    'name': 'Pixie Bow (War arrow)',
    'rof': '2/1',
    'range': '25/50/75',
    'size': 'T',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4+1',
    'book': 'The Complete Book of Humanoids',
    'category': ['Range']
};
weapons['pixie sword'] = {
    'name': 'Pixie Sword',
    'size': 'T',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['bladeback flail'] = {
    'name': 'Bladeback flail',
    'group': 'Saurial Weapon',
    'size': 'L',
    'type': 'B',
    'speed': 9,
    'small-medium': '1d8+1',
    'large': '2d6',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['bladeback mace'] = {
    'name': 'Bladeback mace',
    'group': 'Saurial Weapon',
    'size': 'L',
    'type': 'B',
    'speed': 9,
    'small-medium': '1d8+1',
    'large': '1d8',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
weapons['hornhead staff'] = {
    'name': 'Hornhead staff',
    'group': 'Saurial Weapon',
    'size': 'L',
    'type': 'B',
    'speed': 6,
    'small-medium': '2d6',
    'large': '2d6',
    'book': 'The Complete Book of Humanoids',
    'category': ['Melee']
};
//#endregion

//#region The Complete Ranger's Handbook
weapons['grain flail'] = {
    'name': 'Grain flail',
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd8',
    'book': 'The Complete Ranger\'s Handbook',
    'category': ['Melee']
};
weapons['hatchet'] = {
    'name': 'Hatchet',
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4+1',
    'knockdown': 'd6',
    'book': 'The Complete Ranger\'s Handbook',
    'category': ['Melee']
};
weapons['ice pick'] = {
    'name': 'Ice Pick',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Ranger\'s Handbook',
    'category': ['Melee']
};
weapons['knife, harness'] = {
    'name': 'Knife, Harness',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'small-medium': '1d2',
    'large': '1',
    'book': 'The Complete Ranger\'s Handbook',
    'category': ['Melee']
};
weapons['machete'] = {
    'name': 'Machete',
    'size': 'M',
    'type': 'S',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': 'The Complete Ranger\'s Handbook',
    'category': ['Melee']
};
weapons['ritiik'] = {
    'name': 'Ritiik',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d6+1',
    'large': '1d8+1',
    'book': 'The Complete Ranger\'s Handbook',
    'category': ['Melee']
};
weapons['snow blade (iuak)'] = {
    'name': 'Snow Blade (Iuak)',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d6',
    'book': 'The Complete Ranger\'s Handbook',
    'category': ['Melee']
};
//#endregion

//#region The Complete Barbarians Handbook
weapons['artengak'] = {
    'name': 'Artengak',
    'size': 'L',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d6',
    'large': '1d8',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Melee']
};
weapons['atlatl'] = {
    'name': 'Atlatl',
    'rof': '1',
    'range': '30/60/90',
    'size': 'S',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d6',
    'large': '1d6',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Range']
};
weapons['atlatl, dart'] = {
    'name': 'Atlatl, Dart',
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Range']
};
weapons['boomerang, nonreturning'] = {
    'name': 'Boomerang, Nonreturning',
    'rof': '1',
    'range': '30/70/100',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d3+1',
    'large': '1d4+1',
    'knockdown': 'd8',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Range']
};
weapons['boomerang, returning'] = {
    'name': 'Boomerang, Returning',
    'rof': '1',
    'range': '20/40/60',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d3+1',
    'large': '1d4+1',
    'knockdown': 'd8',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Range']
};
weapons['celt'] = {
    'name': 'Celt',
    'size': 'S',
    'type': 'B/P',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Melee']
};
weapons['club, spiked'] = {
    'name': 'Club, Spiked',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6+1',
    'large': '1d4+1',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Melee']
};
weapons['club, throwing (melee)'] = {
    'name': 'Club, Throwing (Melee)',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d2',
    'large': '1',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Melee']
};
weapons['club, throwing (ranged)'] = {
    'name': 'Club, Throwing (Ranged)',
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d2',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Range']
};
weapons['forearm axe'] = {
    'name': 'Forearm Axe',
    'size': 'S',
    'type': 'S/P',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d6',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Melee']
};
weapons['rabbit stick'] = {
    'name': 'Rabbit stick',
    'size': 'S',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Melee']
};
weapons['stick sling (flint disk)'] = {
    'name': 'Stick sling (Flint Disk)',
    'rof': '2/1',
    'range': '30/60/90',
    'size': 'S',
    'type': 'B',
    'speed': 11,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Range']
};
weapons['stick sling (grooved stone)'] = {
    'name': 'Stick sling (Grooved Stone)',
    'rof': '2/1',
    'range': '30/60/90',
    'size': 'S',
    'type': 'B',
    'speed': 11,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Barbarian\'s Handbook',
    'category': ['Range']
};
weapons['sling, string (flint disk)'] = {
    ...weapons['stick sling (flint disk)'],
    'name': 'Sling, String (Flint Disk)',
};
weapons['sling, string (grooved stone)'] = {
    ...weapons['stick sling (grooved stone)'],
    'name': 'Sling, String (Grooved Stone)',
};
//#endregion

//#region The Complete Ninja's Handbook
weapons['bo (staff)'] = {
    'name': 'Bo (staff)',
    'size': 'L',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['daikyu (armor piercer arrow)'] = {
    'name': 'Daikyu (Armor piercer arrow)',
    'rof': '2/1',
    'range': '70/140/210',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['daikyu (flight arrow)'] = {
    ...weapons['daikyu (armor piercer arrow)'],
    'name': 'Daikyu (Flight arrow)',
    'small-medium': '1d6',
    'large': '1d6',
};
weapons['daikyu (frog crotch arrow)'] = {
    ...weapons['daikyu (armor piercer arrow)'],
    'name': 'Daikyu (Frog crotch arrow)',
    'type': 'S',
    'small-medium': '1d6',
    'large': '1d3',
};
weapons['daikyu (humming bulb arrow)'] = {
    ...weapons['daikyu (armor piercer arrow)'],
    'name': 'Daikyu (Humming bulb arrow)',
    'small-medium': '1d2',
    'large': '1d2',
};
weapons['daikyu (sheaf arrow)'] = {
    ...weapons['daikyu (armor piercer arrow)'],
    'name': 'Daikyu (Sheaf arrow)',
    'small-medium': '1d8',
    'large': '1d6',
};
weapons['hankyu (armor piercer arrow)'] = {
    'name': 'Hankyu (Armor piercer arrow)',
    'rof': '2/1',
    'range': '50/100/150',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['hankyu (flight arrow)'] = {
    ...weapons['hankyu (armor piercer arrow)'],
    'name': 'Hankyu (Flight arrow)',
    'small-medium': '1d6',
    'large': '1d6',
};
weapons['hankyu (frog crotch arrow)'] = {
    ...weapons['hankyu (armor piercer arrow)'],
    'name': 'Hankyu (Frog crotch arrow)',
    'type': 'S',
    'small-medium': '1d6',
    'large': '1d3',
};
weapons['hankyu (humming bulb arrow)'] = {
    ...weapons['hankyu (armor piercer arrow)'],
    'name': 'Hankyu (Humming bulb arrow)',
    'small-medium': '1d2',
    'large': '1d2',
};
weapons['hankyu (sheaf arrow)'] = {
    ...weapons['hankyu (armor piercer arrow)'],
    'name': 'Hankyu (Sheaf arrow)',
    'small-medium': '1d8',
    'large': '1d6',
};
weapons['pellet bow (pellet)'] = {
    'name': 'Pellet bow (Pellet)',
    'rof': '1',
    'range': '60/120/180',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['chopsticks'] = {
    'name': 'Chopsticks',
    'size': 'S',
    'type': 'P',
    'speed': 1,
    'small-medium': '1',
    'large': '1',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['chu-ko-nu (repeater)'] = {
    'name': 'Chu-ko-nu (repeater)',
    'group': 'Crossbow',
    'rof': '3/2',
    'range': '20/40/60',
    'size': 'M',
    'type': 'P',
    'speed': 10,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['fang'] = {
    'name': 'Fang',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['fukimi-bari (mouth darts)'] = {
    'name': 'Fukimi-bari (mouth darts)',
    'rof': '1',
    'range': '3’/—/—',
    'size': 'S',
    'type': 'P',
    'speed': 1,
    'small-medium': '1d2',
    'large': '1d2',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['gunsen (war fan)'] = {
    'name': 'Gunsen (war fan)',
    'size': 'S',
    'type': 'B',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['hanbo (half staff)'] = {
    'name': 'Hanbo (half staff)',
    'size': 'S',
    'type': 'B',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d2',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['jitter'] = {
    'name': 'Jitter',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d2',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['jo (stick)'] = {
    'name': 'Jo (stick)',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d3',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['kama (sickle)'] = {
    'name': 'Kama (sickle)',
    'size': 'S',
    'type': 'S',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['kau sin ke (whipping chain)'] = {
    'name': 'Kau sin ke (whipping chain)',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d6',
    'knockdown': 'd8',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['kawanaga (grapnel)'] = {
    'name': 'Kawanaga (grapnel)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'B/P',
    'speed': 6,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
weapons['kiseru (pipe)'] = {
    'name': 'Kiseru (pipe)',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d2',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['kusari-gama (chain-sickle)'] = {
    'name': 'Kusari-gama (chain-sickle)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'B/S',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
weapons['kyogetsu-shogi (cord-and-dagger)'] = {
    'name': 'Kyogetsu-shogi (cord-and-dagger)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'B/S',
    'speed': 6,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
weapons['manriki-gusari (chain)'] = {
    'name': 'Manriki-gusari (chain)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'B',
    'speed': 5,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
weapons['metsubishi (blinding powders)'] = {
    'name': 'Metsubishi (blinding powders)',
    'rof': '1/2',
    'range': '3’/—/—',
    'size': 'S',
    'type': '—',
    'speed': 3,
    'small-medium': '—',
    'large': '—',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['nage teppo (grenades)'] = {
    'name': 'Nage teppo (grenades)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': '—',
    'type': 'B',
    'speed': 9,
    'small-medium': '1d6',
    'large': '1d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['needle'] = {
    'name': 'Needle',
    'rof': '1',
    'range': '3’/—/—',
    'size': 'S',
    'type': 'P',
    'speed': 1,
    'small-medium': '1',
    'large': '1',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['nekode (climbing claws)'] = {
    'name': 'Nekode (climbing claws)',
    'size': 'S',
    'type': 'S',
    'speed': 1,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['kumade (rake)'] = {
    'name': 'Kumade (rake)',
    'group': 'Polearm',
    'size': 'L',
    'type': 'B/P',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['lajatang'] = {
    'name': 'Lajatang',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S/P',
    'speed': 7,
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['nagimaki (horseman\'s halberd)'] = {
    'name': 'Nagimaki (horseman\'s halberd)',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S/P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['naginata (halberd)'] = {
    'name': 'Naginata (halberd)',
    'group': 'Polearm',
    'size': 'L',
    'type': 'S/P',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d10',
    'knockdown': 'd8',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['sai (short trident)'] = {
    'name': 'Sai (short trident)',
    'size': 'S',
    'type': 'P/B',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d2',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['shuriken, spike (throwing star)'] = {
    'name': 'Shuriken, Spike (throwing star)',
    'strength': true,
    'rof': '2/1',
    'range': '10/—/—',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['shuriken, large star (throwing star)'] = {
    'name': 'Shuriken, Large star (throwing star)',
    'strength': true,
    'rof': '3/1',
    'range': '5/10/20',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d6',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee','Range']
};
weapons['shuriken, small star (throwing star)'] = {
    'name': 'Shuriken, Small star (throwing star)',
    'strength': true,
    'rof': '4/1',
    'range': '5/10/20',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['siangkam'] = {
    'name': 'Siangkam',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4+1',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['sling (bullet) (ninja)'] = {
    'name': 'Sling (Bullet) (ninja)',
    'strength': true,
    'rof': '1',
    'range': '50/100/200',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4',
    'large': '1d6+1',
    'knockdown': 'd4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['sling (stone) (ninja)'] = {
    'name': 'Sling (Stone) (ninja)',
    'strength': true,
    'rof': '1',
    'range': '40/80/1600',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['staff sling (bullet) (ninja)'] = {
    'name': 'Staff sling (Bullet) (ninja)',
    'strength': true,
    'rof': '1/2',
    'range': '—/30-60/90',
    'size': 'M',
    'type': 'B',
    'speed': 11,
    'small-medium': '2d4',
    'large': '1d6+2',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['staff sling (stone) (ninja)'] = {
    'name': 'Staff sling (Stone) (ninja)',
    'strength': true,
    'rof': '1',
    'range': '—/30-60/200',
    'size': 'S',
    'type': 'B',
    'speed': 11,
    'small-medium': '1d8',
    'large': '2d4',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['sode garami (sleeve entangler)'] = {
    'name': 'Sode garami (sleeve entangler)',
    'size': 'L',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['chijiriki (one-handed) (chain spear)'] = {
    'name': 'Chijiriki (One-handed) (chain spear)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'B/P',
    'speed': 7,
    'small-medium': '1d6',
    'large': '1d8',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
weapons['chijiriki (two-handed) (chain spear)'] = {
    'name': 'Chijiriki (Two-handed) (chain spear)',
    'size': 'L',
    'type': 'B/P',
    'speed': 7,
    'small-medium': '1d8+1',
    'large': '2d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['sang kauw (one-handed) (two-handed spear)'] = {
    'name': 'Sang kauw (One-handed) (two-handed spear)',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['sang kauw (two-handed) (two-handed spear)'] = {
    'name': 'Sang kauw (Two-handed) (two-handed spear)',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '2d6',
    'large': '1d8+1',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['trident (one-handed) (ninja)'] = {
    'name': 'Trident (One-handed) (ninja)',
    'group': 'Spear',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '3d4',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
weapons['trident (two-handed) (ninja)'] = {
    'name': 'Trident (Two-handed) (ninja)',
    'group': 'Spear',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '2d8',
    'knockdown': 'd8',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['shakujo yari (one-handed) (staff spear)'] = {
    'name': 'Shakujo yari (One-handed) (staff spear)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['shakujo yari (two-handed) (staff spear)'] = {
    'name': 'Shakujo yari (Two-handed) (staff spear)',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d8+1',
    'large': '2d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['yari (one-handed) (spear)'] = {
    'name': 'Yari (One-handed) (spear)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d8+1',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['yari (two-handed) (spear)'] = {
    'name': 'Yari (Two-handed) (spear)',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '2d6',
    'large': '3d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['bokken (one-handed) (wooden sword)'] = {
    'name': 'Bokken (One-handed) (spear)',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d4',
    'large': '1d2',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['bokken (two-handed) (wooden sword)'] = {
    'name': 'Bokken (Two-handed) (wooden sword)',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '2d6',
    'large': '1d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['ninja-to (ninja sword)'] = {
    'name': 'Ninja-to (ninja sword)',
    'size': 'M',
    'type': 'S/P',
    'speed': 4,
    'small-medium': '1d8',
    'large': '1d6',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['no-daichi (two-handed sword)'] = {
    'name': 'No-daichi (two-handed sword)',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '1d10',
    'large': '3d6',
    'knockdown': 'd10',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['parang (chopping blade)'] = {
    'name': 'Parang (chopping blade)',
    'group': 'Sword',
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '1d10',
    'large': '3d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['tetsu-to (iron sword)'] = {
    'name': 'Tetsu-to (iron sword)',
    'size': 'L',
    'type': 'S',
    'speed': 15,
    'small-medium': '1d12',
    'large': '3d6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['wakizashi (samurai short sword)'] = {
    'name': 'Wakizashi (samurai short sword)',
    'size': 'S',
    'type': 'S/P',
    'speed': 3,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['tanto (dagger)'] = {
    'name': 'Tanto (dagger)',
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'S/P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
weapons['tetsu-bishi (caltrops)'] = {
    'name': 'Tetsu-bishi (caltrops)',
    'strength': true,
    'rof': '1',
    'range': '5’/10’/20’',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Range']
};
weapons['three-section staff'] = {
    'name': 'Three-section staff',
    'size': 'L',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['tonfa (handle)'] = {
    'name': 'Tonfa (handle)',
    'size': 'S',
    'type': 'B',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee']
};
weapons['uchi-ne (short javelin)'] = {
    'name': 'Uchi-ne (short javelin)',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
weapons['yoroi-toshi'] = {
    'name': 'Yoroi-Toshi',
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d4',
    'book': 'The Complete Ninja\'s Handbook',
    'category': ['Melee', 'Range']
};
//#endregion
module.exports = weapons;