#!/usr/bin/env python3

from jinja2 import Environment, FileSystemLoader, select_autoescape

env = Environment(
    loader=FileSystemLoader('./templates'),
    autoescape=select_autoescape(['html', 'xml'])
)

html_template = env.get_template('base.html')

with open('./Mythras.html', 'w') as f:
    f.write(html_template.render())
f.closed
