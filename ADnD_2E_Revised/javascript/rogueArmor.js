const ROGUE_ARMOR = {};
// Thief armor
ROGUE_ARMOR['No Armor'] = {
    'Pick Pockets'     : '+5',
    'Open Locks'       : '0',
    'Find/Remove Traps': '0',
    'Move Silently'    : '+10',
    'Hide in Shadows'  : '5',
    'Detect Noise'     : '0',
    'Climb Walls'      : '+10',
    'Tunneling'        : '+10',
    'Escape bonds'     : '+5',
    'Bribe'            : '-10', // DM Options: High-Level Campaigns
}
ROGUE_ARMOR['Leather Armor'] = {
    'Pick Pockets'     : '0',
    'Open Locks'       : '0',
    'Find/Remove Traps': '0',
    'Move Silently'    : '0',
    'Hide in Shadows'  : '0',
    'Detect Noise'     : '0',
    'Climb Walls'      : '0',
    'Tunneling'        : '0',
    'Escape bonds'     : '0',
    'Bribe'            : '0', // DM Options: High-Level Campaigns
}
ROGUE_ARMOR['Padded Armor'] = ROGUE_ARMOR['Studded Leather'] = {
    'Pick Pockets'     : '-30',
    'Open Locks'       : '-10',
    'Find/Remove Traps': '-10',
    'Move Silently'    : '-20',
    'Hide in Shadows'  : '-20',
    'Detect Noise'     : '-10',
    'Climb Walls'      : '-30',
    'Tunneling'        : '-10',
    'Escape bonds'     : '-5',
    'Bribe'            : '-5', // DM Options: High-Level Campaigns
};
ROGUE_ARMOR['Elven Chain Mail'] = {
    'Pick Pockets'     : '-20',
    'Open Locks'       : '-5',
    'Find/Remove Traps': '-5',
    'Move Silently'    : '-10',
    'Hide in Shadows'  : '-10',
    'Detect Noise'     : '-5',
    'Climb Walls'      : '-20',
    'Tunneling'        : '-5',
    'Escape bonds'     : '-5',
    'Bribe'            : '+5', // DM Options: High-Level Campaigns
};
ROGUE_ARMOR['Silenced Elven Chain Mail'] = {
    'Pick Pockets'     : '-25',
    'Open Locks'       : '-5',
    'Find/Remove Traps': '-5',
    'Move Silently'    : '0',
    'Hide in Shadows'  : '-10',
    'Detect Noise'     : '0',
    'Climb Walls'      : '-25',
};
// Bard/Ranger Armor
ROGUE_ARMOR['Ring Mail'] = {
    'Pick Pockets'     : '-25', // Bard
    'Move Silently'    : '-30', // Ranger
    'Hide in Shadows'  : '-40', // Ranger
    'Detect Noise'     : '-10', // Bard
    'Climb Walls'      : '-25', // Bard
};
// Bard Armor
ROGUE_ARMOR['Chain Mail'] = {
    'Pick Pockets'     : '-25',
    'Detect Noise'     : '-10',
    'Climb Walls'      : '-25',
};
ROGUE_ARMOR['Hide Armor'] = {
    'Pick Pockets'     : '-30',
    'Detect Noise'     : '-5',
    'Climb Walls'      : '-30',
};
ROGUE_ARMOR['Brigandine Armor'] = {
    'Pick Pockets'     : '-20',
    'Detect Noise'     : '-10',
    'Climb Walls'      : '-25',
};
ROGUE_ARMOR['Scale Mail'] = {
    'Pick Pockets'     : '-25',
    'Detect Noise'     : '-15',
    'Climb Walls'      : '-40',
};
// Disguise armor
ROGUE_ARMOR['Hide Armor (Thief Disguise)'] = {
    'Pick Pockets'     : '-60',
    'Open Locks'       : '-50',
    'Find/Remove Traps': '-50',
    'Move Silently'    : '-30',
    'Hide in Shadows'  : '-20',
    'Detect Noise'     : '-10',
    'Climb Walls'      : '-60',
};
ROGUE_ARMOR['Ring Mail (Thief Disguise)'] = ROGUE_ARMOR['Chain Mail (Thief Disguise)'] = {
    'Pick Pockets'     : '-40',
    'Open Locks'       : '-15',
    'Find/Remove Traps': '-15',
    'Move Silently'    : '-40',
    'Hide in Shadows'  : '-30',
    'Detect Noise'     : '-20',
    'Climb Walls'      : '-40',
};
ROGUE_ARMOR['Brigandine (Thief Disguise)'] = ROGUE_ARMOR['Splint Mail (Disguise)'] = {
    'Pick Pockets'     : '-40',
    'Open Locks'       : '-15',
    'Find/Remove Traps': '-25',
    'Move Silently'    : '-40',
    'Hide in Shadows'  : '-30',
    'Detect Noise'     : '-25',
    'Climb Walls'      : '-50',
};
ROGUE_ARMOR['Scale Mail (Thief Disguise)'] = ROGUE_ARMOR['Banded Armor (Disguise)'] = {
    'Pick Pockets'     : '-50',
    'Open Locks'       : '-20',
    'Find/Remove Traps': '-20',
    'Move Silently'    : '-60',
    'Hide in Shadows'  : '-50',
    'Detect Noise'     : '-30',
    'Climb Walls'      : '-90',
};
ROGUE_ARMOR['Plate Mail (Disguise)'] = ROGUE_ARMOR['Bronze Plate Mail (Disguise)'] = {
    'Pick Pockets'     : '-75',
    'Open Locks'       : '-40',
    'Find/Remove Traps': '-40',
    'Move Silently'    : '-80',
    'Hide in Shadows'  : '-75',
    'Detect Noise'     : '-50',
    'Climb Walls'      : '-95',
};
ROGUE_ARMOR['Field Plate (Disguise)'] = ROGUE_ARMOR['Full Plate (Disguise)'] = {
    'Pick Pockets'     : '-95',
    'Open Locks'       : '-80',
    'Find/Remove Traps': '-80',
    'Move Silently'    : '-95',
    'Hide in Shadows'  : '-95',
    'Detect Noise'     : '-70',
    'Climb Walls'      : '-95',
};