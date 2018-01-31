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

attributes_flat = [attr for attr_type in attributes.keys() for attr in attributes[attr_type]]
abilities_flat = [abil for abil_type in abilities.keys() for abil in abilities[abil_type]]

# declaration
attributes_quoted = ['"{:s}"'.format(attr) for attr in attributes_flat]
abilities_quoted = ['"{:s}"'.format(abil) for abil in abilities_flat]

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
