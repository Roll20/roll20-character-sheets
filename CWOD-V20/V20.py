from __future__ import print_function, division
from collections import OrderedDict
from jinja2 import Environment, FileSystemLoader

attributes = OrderedDict([
    ('physical', ['strength', 'dexterity', 'stamina']),
    ('social', ['charisma', 'manipulation', 'appearance']),
    ('mental', ['perception', 'intelligence', 'wits'])
])

abilities = OrderedDict([
    ('talents', ['alertness', 'athletics', 'awareness', 'brawl', 'empathy',
        'expression', 'intimidation', 'leadership', 'streetwise',
        'subterfuge']),
    ('skills', ['animal_ken', 'crafts', 'drive', 'etiquette', 'firearms',
        'larceny', 'melee', 'performance', 'stealth', 'survival']),
    ('knowledges', ['academics', 'computer', 'finance', 'investigation',
        'law', 'medicine', 'occult', 'politics', 'science', 'technology'])
])

clans = ['assamite', 'brujah', 'followers_of_set',
    'gangrel', 'giovanni', 'lasombra',
    'malkavian', 'nosferatu', 'ravnos',
    'toreador', 'tremere', 'tzimisce', 'ventrue',
    'caitiff', 'werewolf', 'human', 'mage', 'faerie', 'ghost', 'demon'
    ]

disciplines = ["discipline_{:d}".format(i + 1) for i in range(7)]
backgrounds = ["background_{:d}".format(i + 1) for i in range(7)]
virtues = ["conscience", "self_control", "courage"]
postfixes = ["base", "free", "xp"]

attributes_flat = [attr for attr_type in attributes.keys() for attr in attributes[attr_type]]
abilities_flat = [abil for abil_type in abilities.keys() for abil in abilities[abil_type]]

# base
base_math = {}
for val_dict in [attributes, abilities]:
    for val_type in val_dict.keys():
        base_terms = []
        for val in val_dict[val_type]:
            base_terms.append('@{%s_base}' % val)
        base_math[val_type] = ' + '.join(base_terms)

jinja_env = Environment(
    loader=FileSystemLoader('.'),
    extensions=['jinja2.ext.do']
)

with open('V20.html', 'w') as f:
    f.write(jinja_env.get_template('V20.jinja').render(d=locals()))
