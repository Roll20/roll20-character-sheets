#!/usr/bin/env python3

import json
import re
import sys

with open(file='translation.json', mode="r") as translation_file:
    translation_data = json.load(translation_file)
    i18n_keys = list(translation_data.keys())

with open(file=sys.argv[1], mode="r") as old_translation_file:
    old_translation_data = json.load(old_translation_file)

new_translations = {}
for key, value in old_translation_data.items():
    if key in i18n_keys:
        new_translations[key] = value

with open('new-' + sys.argv[1], 'w', encoding='utf-8') as f:
    json.dump(new_translations, f, ensure_ascii=False, indent=4, sort_keys=True)
