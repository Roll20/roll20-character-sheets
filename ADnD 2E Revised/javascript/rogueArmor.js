const rogueArmor = {};
// Thief armor
rogueArmor['Padded Armor'] = rogueArmor['Studded Leather'] = {
    'Pick Pockets'     : '-30',
    'Open Locks'       : '-10',
    'Find/Remove Traps': '-10',
    'Move Silently'    : '-20',
    'Hide in Shadows'  : '-20',
    'Detect Noise'     : '-10',
    'Climb Walls'      : '-30',
};
rogueArmor['Elven Chain Mail'] = {
    'Pick Pockets'     : '-20',
    'Open Locks'       : '-5',
    'Find/Remove Traps': '-5',
    'Move Silently'    : '-10',
    'Hide in Shadows'  : '-10',
    'Detect Noise'     : '-5',
    'Climb Walls'      : '-20',
};
rogueArmor['Silenced Elven Chain Mail'] = {
    'Pick Pockets'     : '-25',
    'Open Locks'       : '-5',
    'Find/Remove Traps': '-5',
    'Move Silently'    : '',
    'Hide in Shadows'  : '-10',
    'Detect Noise'     : '',
    'Climb Walls'      : '-25',
};
// Bard Armor
rogueArmor['Ring Mail'] = rogueArmor['Chain Mail'] = {
    'Pick Pockets'     : '-25',
    'Detect Noise'     : '-10',
    'Climb Walls'      : '-25',
};
rogueArmor['Hide Armor'] = {
    'Pick Pockets'     : '-30',
    'Detect Noise'     : '-5',
    'Climb Walls'      : '-30',
};
rogueArmor['Brigandine Armor'] = {
    'Pick Pockets'     : '-20',
    'Detect Noise'     : '-10',
    'Climb Walls'      : '-25',
};
rogueArmor['Scale Mail'] = {
    'Pick Pockets'     : '-25',
    'Detect Noise'     : '-15',
    'Climb Walls'      : '-40',
};
// Disguise armor
rogueArmor['Hide Armor (Thief Disguise)'] = {
    'Pick Pockets'     : '-60',
    'Open Locks'       : '-50',
    'Find/Remove Traps': '-50',
    'Move Silently'    : '-30',
    'Hide in Shadows'  : '-20',
    'Detect Noise'     : '-10',
    'Climb Walls'      : '-60',
};
rogueArmor['Ring Mail (Thief Disguise)'] = rogueArmor['Chain Mail (Thief Disguise)'] = {
    'Pick Pockets'     : '-40',
    'Open Locks'       : '-15',
    'Find/Remove Traps': '-15',
    'Move Silently'    : '-40',
    'Hide in Shadows'  : '-30',
    'Detect Noise'     : '-20',
    'Climb Walls'      : '-40',
};
rogueArmor['Brigandine (Thief Disguise)'] = rogueArmor['Splint Mail (Disguise)'] = {
    'Pick Pockets'     : '-40',
    'Open Locks'       : '-15',
    'Find/Remove Traps': '-25',
    'Move Silently'    : '-40',
    'Hide in Shadows'  : '-30',
    'Detect Noise'     : '-25',
    'Climb Walls'      : '-50',
};
rogueArmor['Scale Mail (Thief Disguise)'] = rogueArmor['Banded Armor (Disguise)'] = {
    'Pick Pockets'     : '-50',
    'Open Locks'       : '-20',
    'Find/Remove Traps': '-20',
    'Move Silently'    : '-60',
    'Hide in Shadows'  : '-50',
    'Detect Noise'     : '-30',
    'Climb Walls'      : '-90',
};
rogueArmor['Plate Mail (Disguise)'] = rogueArmor['Bronze Plate Mail (Disguise)'] = {
    'Pick Pockets'     : '-75',
    'Open Locks'       : '-40',
    'Find/Remove Traps': '-40',
    'Move Silently'    : '-80',
    'Hide in Shadows'  : '-75',
    'Detect Noise'     : '-50',
    'Climb Walls'      : '-95',
};
rogueArmor['Field Plate (Disguise)'] = rogueArmor['Full Plate (Disguise)'] = {
    'Pick Pockets'     : '-95',
    'Open Locks'       : '-80',
    'Find/Remove Traps': '-80',
    'Move Silently'    : '-95',
    'Hide in Shadows'  : '-95',
    'Detect Noise'     : '-70',
    'Climb Walls'      : '-95',
};