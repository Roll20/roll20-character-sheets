const weapons = {};
weapons['Arquebus'] = {
    'rof': '1/3',
    'range': '50/150/210',
    'size': 'M',
    'type': 'P',
    'speed': 15,
    'small-medium': '1d10',
    'large': '1d10',
    'knockdown': 'd8'
};
weapons['Battle axe'] = {
    'size': 'M',
    'type': 'S',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd10'
};
weapons['Blowgun (Barbed Dart)'] = {
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4'
};
weapons['Blowgun (Needle)'] = {
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'P',
    'speed': 5,
    'small-medium': '1',
    'large': '1',
};
weapons['Short bow (Flight arrow)'] = {
    'rof': '2/1',
    'range': '50/100/150',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6'
};
weapons['Long bow (Flight arrow)'] = {
    'rof': '2/1',
    'range': '70/140/210',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6'
};
weapons['Long bow (Sheaf arrow)'] = {
    'rof': '2/1',
    'range': '50/100/150',
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6'
};
weapons['Composite short bow (Flight arrow)'] = {
    'rof': '2/1',
    'range': '50/100/180',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6'
};
weapons['Composite long bow (Flight arrow)'] = {
    'rof': '2/1',
    'range': '60/120/210',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6'
};
weapons['Composite long bow (Sheaf arrow)'] = {
    'rof': '2/1',
    'range': '40/80/170',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd6'
};
weapons['Club'] = {
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': ' 1d6',
    'large': '1d3',
    'knockdown': 'd8'
};
weapons['Hand crossbow'] = {
    'rof': '1',
    'range': '20/40/60',
    'size': 'S',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4'
};
weapons['Light crossbow'] = {
    'rof': '1',
    'range': '60/120/180',
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6'
};
weapons['Heavy crossbow'] = {
    'rof': '1/2',
    'range': '80/160/240',
    'size': 'M',
    'type': 'P',
    'speed': 10,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'knockdown': 'd6'
};
weapons['Dagger'] = {
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6'
};
weapons['Dirk'] = {
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d4',
    'large': '1d3',
    'knockdown': 'd6'
};
weapons['Dart'] = {
    'strength': true,
    'rof': '3/1',
    'range': '10/20/40',
    'size': 'S',
    'type': 'P',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4'
};
weapons['Footman\'s flail'] = {
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd12'
};
weapons['Footman\'s mace'] = {
    'size': 'M',
    'type': 'B',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '1d6',
    'knockdown': 'd10'
};
weapons['Footman\'s pick'] = {
    'size': 'M',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d4',
    'knockdown': 'd8'
};
weapons['Hand axe'] = {
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd10'
};
weapons['Harpoon'] = {
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd8'
};
weapons['Horseman\'s flail'] = {
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+1',
    'large': '1d4+1',
    'knockdown': 'd10'
};
weapons['Horseman\'s mace'] = {
    'size': 'M',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d4',
    'knockdown': 'd8'
};
weapons['Horseman\'s pick'] = {
    'size': 'M',
    'type': 'P',
    'speed': 5,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd6'
};
weapons['Javelin'] = {
    'strength': true,
    'rof': '1',
    'range': '20/40/60',
    'size': 'M',
    'type': 'P',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd6'
};
weapons['Knife'] = {
    'strength': true,
    'rof': '2/1',
    'range': '10/20/30',
    'size': 'S',
    'type': 'P/S',
    'speed': 2,
    'small-medium': '1d3',
    'large': '1d2',
    'knockdown': 'd4'
};
weapons['Heavy horse lance'] = {
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d8+1',
    'large': '3d6',
    'knockdown': 'd12'
};
weapons['Light horse lance'] = {
    'size': 'L',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd8'
};
weapons['Jousting lance'] = {
    'size': 'L',
    'type': 'P',
    'speed': 10,
    'small-medium': '1d3-1',
    'large': '1d2-1',
    'knockdown': 'd6'
};
weapons['Medium horse lance'] = {
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '2d6',
    'knockdown': 'd10'
};
weapons['Mancatcher'] = {
    'size': 'L',
    'type': '',
    'speed': 7,
    'small-medium': '—',
    'large': '—',
    'knockdown': 'd6'
};
weapons['Morning star'] = {
    'size': 'M',
    'type': 'P/B',
    'speed': 7,
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd10'
};
weapons['Awl pike'] = {
    'size': 'L',
    'type': 'P',
    'speed': 13,
    'small-medium': '1d6',
    'large': '1d12',
    'knockdown': 'd8'
};
weapons['Bardiche'] = {
    'size': 'L',
    'type': 'S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd12'
};
weapons['Bec de corbin'] = {
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'small-medium': '1d8',
    'large': '1d6',
    'knockdown': 'd10'
};
weapons['Bill-guisarme'] = {
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '1d10',
    'knockdown': 'd10'
};
weapons['Fauchard'] = {
    'size': 'L',
    'type': 'P/S',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd8'
};
weapons['Fauchard-fork'] = {
    'size': 'L',
    'type': 'P/S',
    'speed': 8,
    'small-medium': '1d8',
    'large': '1d10',
};
weapons['Glaive'] = {
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'small-medium': '1d6',
    'large': '1d10',
    'knockdown': 'd10'
};
weapons['Glaive-guisarme'] = {
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '2d6',
    'knockdown': 'd10'
};
weapons['Guisarme'] = {
    'size': 'L',
    'type': 'S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '1d8',
    'knockdown': 'd10'
};
weapons['Guisarme-voulge'] = {
    'size': 'L',
    'type': 'P/S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '2d4',
};
weapons['Halberd'] = {
    'size': 'L',
    'type': 'P/S',
    'speed': 9,
    'small-medium': '1d10',
    'large': '2d6',
    'knockdown': 'd12'
};
weapons['Hook fauchard'] = {
    'size': 'L',
    'type': 'P',
    'speed': 9,
    'small-medium': '1d4',
    'large': '1d4',
};
weapons['Lucern hammer'] = {
    'size': 'L',
    'type': 'P/B',
    'speed': 9,
    'small-medium': '2d4',
    'large': '1d6',
    'knockdown': 'd10'
};
weapons['Military fork'] = {
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d8',
    'large': '2d4',
    'knockdown': 'd8'
};
weapons['Partisan'] = {
    'size': 'L',
    'type': 'P',
    'speed': 9,
    'small-medium': '1d6',
    'large': '1d6+1',
    'knockdown': 'd8'
};
weapons['Ranseur'] = {
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d4',
    'knockdown': 'd8'
};
weapons['Spetum'] = {
    'size': 'L',
    'type': 'P',
    'speed': 8,
    'small-medium': '1d6+1',
    'large': '2d6',
    'knockdown': 'd8'
};
weapons['Voulge'] = {
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '2d4',
    'large': '2d4',
    'knockdown': 'd12'
};
weapons['Quarterstaff'] = {
    'size': 'L',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d6',
    'large': '1d6',
    'knockdown': 'd10'
};
weapons['Scourge'] = {
    'size': 'S',
    'type': '',
    'speed': 5,
    'small-medium': '1d4',
    'large': '1d2',
    'knockdown': 'd4'
};
weapons['Sickle'] = {
    'size': 'S',
    'type': 'S',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd4'
};
weapons['Sling (Bullet)'] = {
    'strength': true,
    'rof': '1',
    'range': '50/100/200',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4+1',
    'large': '1d6+1',
    'knockdown': 'd4'
};
weapons['Sling (Stone)'] = {
    'strength': true,
    'rof': '1',
    'range': '40/80/160',
    'size': 'S',
    'type': 'B',
    'speed': 6,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd4'
};
weapons['Spear'] = {
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'P',
    'speed': 6,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6'
};
weapons['Staff sling (Bullet)'] = {
    'strength': true,
    'rof': '2/1',
    'range': '—/30-60/90',
    'size': 'M',
    'type': 'B',
    'speed': 11,
    'small-medium': '1d4+1',
    'large': '1d6+1',
};
weapons['Staff sling (Stone)'] = {
    'strength': true,
    'rof': '2/1',
    'range': '—/30-60/90',
    'size': 'M',
    'type': 'B',
    'speed': 11,
    'small-medium': '1d4',
    'large': '1d4',
    'knockdown': 'd6'
};
weapons['Bastard sword (One-handed)'] = {
    'size': 'M',
    'type': 'S',
    'speed': 6,
    'small-medium': '1d8',
    'large': '1d12',
    'knockdown': 'd8'
};
weapons['Bastard sword (Two-handed)'] = {
    'size': 'M',
    'type': 'S',
    'speed': 8,
    'small-medium': '2d4',
    'large': '2d8',
    'knockdown': 'd10'
};
weapons['Broad sword'] = {
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '2d4',
    'large': '1d6+1',
    'knockdown': 'd8'
};
weapons['Khopesh'] = {
    'size': 'M',
    'type': 'S',
    'speed': 9,
    'small-medium': '2d4',
    'large': '1d6',
    'knockdown': 'd8'
};
weapons['Long sword'] = {
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d8',
    'large': '1d12',
    'knockdown': 'd8'
};
weapons['Scimitar'] = {
    'size': 'M',
    'type': 'S',
    'speed': 5,
    'small-medium': '1d8',
    'large': '1d8',
    'knockdown': 'd8'
};
weapons['Short sword'] = {
    'size': 'S',
    'type': 'P',
    'speed': 3,
    'small-medium': '1d6',
    'large': '1d8',
    'knockdown': 'd6'
};
weapons['Two-handed sword'] = {
    'size': 'L',
    'type': 'S',
    'speed': 10,
    'small-medium': '1d10',
    'large': '3d6',
    'knockdown': 'd12'
};
weapons['Trident'] = {
    'size': 'L',
    'type': 'P',
    'speed': 7,
    'small-medium': '1d6+1',
    'large': '3d4',
    'knockdown': 'd8'
};
weapons['Warhammer'] = {
    'strength': true,
    'rof': '1',
    'range': '10/20/30',
    'size': 'M',
    'type': 'B',
    'speed': 4,
    'small-medium': '1d4+1',
    'large': '1d4',
    'knockdown': 'd8'
};
weapons['Whip'] = {
    'size': 'M',
    'type': '',
    'speed': 8,
    'small-medium': '1d2',
    'large': '1',
};