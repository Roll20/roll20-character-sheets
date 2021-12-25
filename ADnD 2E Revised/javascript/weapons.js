//region Player's Handbook
const weapons = {};
weapons['arquebus'] = {
    'name': 'Arquebus',
    'rof': '1/3',
    'range': '50/150/210',
    'size': 'M',
    'type': 'P',
    'speed': 15,
    'small-medium': '1d10',
    'large': '1d10',
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
//endregion

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
}
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
module.exports = weapons;