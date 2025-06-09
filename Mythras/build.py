#!/usr/bin/env python3
from pathlib import Path
from jinja2 import Environment, FileSystemLoader

SRCPATH = Path(__file__).resolve().parent

template_file_loader = FileSystemLoader(Path(SRCPATH, 'templates'))
template_env = Environment(loader=template_file_loader)

# Resolve destination paths
html_js_premin_path = Path(SRCPATH, "pre-minified", "Mythras.html")
css_premin_path = Path(SRCPATH, "pre-minified", "Mythras.css")

# Render pre-minified content from templates
html_premin_content = template_env.get_template('sheet.html').render()
js_premin_content = template_env.get_template('sheet.js').render()
css_premin_content = template_env.get_template('sheet.css').render()
html_js_premin_content = html_premin_content + "<script type=\"text/worker\">\n" + js_premin_content + "\n</script>"

# Write the pre-minified files
with open(html_js_premin_path, "w", encoding="utf-8") as html_js_premin_f:
    html_js_premin_f.write(html_js_premin_content)

with open(css_premin_path, "w", encoding="utf-8") as css_premin_f:
    css_premin_f.write(css_premin_content)
