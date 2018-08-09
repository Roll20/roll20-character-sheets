from __future__ import print_function, division
import json
from collections import OrderedDict
from jinja2 import Environment, FileSystemLoader

def flatten_tree(tree, props=None):
    # flatten properties in json tree
    if props is None:
        props = tree.keys()
        if "fields" in props:
            props.remove("fields")
    if "fields" not in tree.keys():
        return
    for field_name, field in tree["fields"].iteritems():
        for prop in props:
            if prop in tree.keys() and not prop in field.keys():
                field[prop] = tree[prop]
        flatten_tree(field, props)

with open('data.json', 'r') as f:
    json_txt = f.read()
    data = json.loads(json_txt, object_pairs_hook=OrderedDict)
    # flatten properties to make rendering easier and json non-cluttered
    flatten_tree(data["sections"])
    # print, removing all white space
    data['json_txt'] = json.dumps(data, separators=(',',':'))

with open('worker.js', 'r') as f:
    data['worker_js'] = f.read()

jinja_env = Environment(
    loader=FileSystemLoader('.'),
    extensions=['jinja2.ext.do']
)

with open('V5e.html', 'w') as f:
    f.write(jinja_env.get_template('V5e.jinja').render(d=data))
