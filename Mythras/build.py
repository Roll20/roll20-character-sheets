#!/usr/bin/env python3
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
import htmlmin
import rjsmin
import rcssmin
import keyring
import argparse
import getpass
import sys
import requests

SRCPATH = Path(__file__).resolve().parent

template_file_loader = FileSystemLoader(Path(SRCPATH, 'templates'))
template_env = Environment(loader=template_file_loader)

# Parse uploader arguments
parser = argparse.ArgumentParser(description='Build Mythras based character sheets from the source templates and optionally upload them to campaigns for testing.')
parser.add_argument("-u", "--username", action="store", help='Username to authenticate to Roll20 with')
parser.add_argument("-k", "--keyring", action="store_true", help="Use the desktop's keyring service to store the Roll20 password for future use")
parser.add_argument("--reset-keyring", action="store_true", dest="reset_keyring", help='Will replace the existing keyring password with the one provided at the prompt, should be used with --keyring')
parser.add_argument('--sheet', action='store', help='Name of the Roll20 sheet')
parser.add_argument('--campaign', action='store', help='Takes the Roll20 campaign ID to upload to')
args = parser.parse_args()

# Resolve destination paths
html_js_premin_path = Path(SRCPATH, "pre-minified", "{}.html".format(args.sheet))
css_premin_path = Path(SRCPATH, "pre-minified", "{}.css".format(args.sheet))
html_js_min_path = Path(SRCPATH, "{}.min.html".format(args.sheet))
css_min_path = Path(SRCPATH, "{}.min.css".format(args.sheet))

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

# Render minified content
html_min_content = htmlmin.minify(html_premin_content,
   remove_comments=True,
   remove_empty_space=True,
   remove_all_empty_space=False,
   reduce_empty_attributes=True,
   reduce_boolean_attributes=True,
   remove_optional_attribute_quotes=False,
   convert_charrefs=True,
   keep_pre=False,
   pre_tags=(u'pre', u'textarea'),
   pre_attr='pre'
)
js_min_content = rjsmin.jsmin(js_premin_content, keep_bang_comments=False)
css_min_content = rcssmin.cssmin(css_premin_content)
html_js_min_content = html_min_content + '<script type="text/worker">' + js_min_content + '</script>'

# Write minified files
with open(html_js_min_path, "w", encoding="utf-8") as html_js_min_f:
    html_js_min_f.write(html_js_min_content)

with open(css_min_path, "w", encoding="utf-8") as css_min_f:
    css_min_f.write(css_min_content)

if args.campaign:
    if args.username:
        roll20_user = args.username
    else:
        roll20_user = input("Roll20 username: ")

    if args.keyring:
        roll20_pass = keyring.get_password("mythras-Roll20", roll20_user)
        if roll20_pass == None or args.reset_keyring:
            roll20_pass = getpass.getpass("Roll20 password: ")
            keyring.set_password("mythras-Roll20", roll20_user, roll20_pass)
    else:
        roll20_pass = getpass.getpass("Roll20 password: ")


    html_js_min_path = Path(SRCPATH, "{}.min.html".format(args.sheet))
    css_min_path = Path(SRCPATH, "{}.min.css".format(args.sheet))

    login_data = {'email': roll20_user, 'password': roll20_pass}
    roll20session = requests.Session()
    login_result = roll20session.post('https://app.roll20.net/sessions/create', login_data)
    if login_result:
        print("Roll20 login successful.")
    else:
        print("Error logging into Roll20!", file=sys.stderr)
        exit(1)

    with open(html_js_min_path, 'r') as html_file:
        html_src = html_file.read()

    with open(css_min_path, 'r') as css_file:
        css_src = css_file.read()

    with open('translation.json', 'r') as translation_file:
        translation_src = translation_file.read()

    sheet_data = {
        'publicaccess': 'true',
        'bgimage': 'none',
        'allowcharacterimport': 'true',
        'scale_units': 'ft',
        'grid_type': 'square',
        'diagonaltype': 'foure',
        'bar_location': 'above',
        'barStyle': 'standard',
        'compendium_override': '',
        'sharecompendiums': 'false',
        'charsheettype': 'custom',
        'customcharsheet_layout': html_src,
        'customcharsheet_style': css_src,
        'customcharsheet_translation': translation_src
    }
    upload_result = roll20session.post("https://app.roll20.net/campaigns/savesettings/{}".format(args.campaign),
                                       sheet_data)
    if upload_result:
        print("{} uploaded successfully to campaign {}.".format(args.sheet, args.campaign))
    else:
        print("Error uploading {} to campaign {}!".format(args.sheet, args.campaign))
        exit(2)
