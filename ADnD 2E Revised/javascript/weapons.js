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
    'name': 'Blowgun (Needle)',
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'P',
    'speed': 5,
    'small-medium': '1',
    'large': '1',
    'book': 'PHB',
    'category': ['Range']
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
    'name': 'Long bow (Sheaf arrow)',
    'rof': '2/1',
    'range': '50/100/150',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
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
    'name': 'Composite long bow (Sheaf arrow)',
    'rof': '2/1',
    'range': '40/80/170',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
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
    'type': '',
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
    'type': '',
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
    'name': 'Sling (Stone)',
    'strength': true,
    'rof': '1',
    'range': '40/80/160',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4',
    'book': 'PHB',
    'category': ['Range']
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
    'name': 'Staff sling (Stone)',
    'strength': true,
    'rof': '2/1',
    'range': '—/30-60/90',
    'size': 'M',
    'type': 'B',
    'speed': 11,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6',
    'book': 'PHB',
    'category': ['Range']
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
    'name': 'Bastard sword (Two-handed)',
    'size': 'M',
    'type': 'S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d8',
    'knockdown': 'd10',
    'book': 'PHB',
    'category': ['Melee']
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
    'type': '',
    'speed': 8,
    'small-medium': '1d2',
    'large': '1',
    'book': 'PHB',
    'category': ['Melee']
};
module.exports = weapons;