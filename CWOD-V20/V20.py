from __future__ import print_function, division
import json
from collections import OrderedDict
from jinja2 import Environment, FileSystemLoader

with open('data.json', 'r') as f:
    json_txt = f.read()
    data = json.loads(json_txt, object_pairs_hook=OrderedDict)
    # remove all white space
    data['json_txt'] = json.dumps(data, separators=(',',':'))

with open('worker.js', 'r') as f:
    data['worker_js'] = f.read()


jinja_env = Environment(
    loader=FileSystemLoader('.'),
    extensions=['jinja2.ext.do']
)


with open('V20.html', 'w') as f:
    f.write(jinja_env.get_template('V20.jinja').render(d=data))
