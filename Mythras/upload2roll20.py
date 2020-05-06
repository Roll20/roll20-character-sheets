import json
import requests
from pathlib import Path

home = str(Path.home())
with open("{}/.roll20/config.json".format(home)) as config_file:
    configs = json.load(config_file)

login_data = {'email': configs['email'], 'password': configs['password']}

roll20session = requests.Session()
login_result = roll20session.post('https://app.roll20.net/sessions/create', login_data)
if login_result:
    print("Roll20 login successful.")
else:
    print("Error logging into Roll20!")
    exit(1)

with open('Mythras.html', 'r') as html_file:
    html_src = html_file.read()

with open('Mythras.css', 'r') as css_file:
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
upload_result = roll20session.post("https://app.roll20.net/campaigns/savesettings/{}".format(configs['campaign']), sheet_data)
if upload_result:
    print("Sheet uploaded successfully.")
else:
    print("Error uploading sheet content!")
    exit(2)
