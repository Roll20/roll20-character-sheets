#!/usr/bin/env python3

import json
import re

with open(file='old_translations.json', mode="r") as translation_file:
    translation_data = json.load(translation_file)

with open(file='./sheet.json', mode="r") as sheet_json_file:
    sheet_settings_data = json.load(sheet_json_file)

with open(file='./Mythras.min.html', mode="r") as sheet_code_file:
    sheet_code = sheet_code_file.read()

def is_in_settings(key: str) -> bool:
    for option in sheet_settings_data['useroptions']:
        if option['displaytranslationkey'] == key:
            return True
        if key in option["optiontranslationkeys"]:
            return True
        if option['descriptiontranslationkey'] == key:
            return True
    return False

def is_in_code(key: str) -> bool:
    if re.search(r'getTranslationByKey\([\'\"\`]' + key + r'[\'\"\`]\)', sheet_code, flags=re.IGNORECASE | re.MULTILINE):
        return True
    if re.search(r'data-i18n=[\'\"]' + key + r'[\'\"]', sheet_code, flags=re.IGNORECASE | re.MULTILINE):
        return True
    if re.search(r'data-i18n-list=[\'\"]' + key + r'[\'\"]', sheet_code, flags=re.IGNORECASE | re.MULTILINE):
        return True
    if re.search(r'data-i18n-list-item=[\'\"]' + key + r'[\'\"]', sheet_code, flags=re.IGNORECASE | re.MULTILINE):
        return True
    if re.search(r'data-i18n-title=[\'\"]' + key + r'[\'\"]', sheet_code, flags=re.IGNORECASE | re.MULTILINE):
        return True
    if re.search(r'\^\{' + key + r'}', sheet_code, flags=re.IGNORECASE | re.MULTILINE):
        return True
    if key in ['ablation', 'area', 'casting_time', 'combine', 'condition', 'conditions', 'days', 'dose', 'doses', 'duration', 'effects', 'enhance', "focus", 'fortune', 'hours', 'intensity', 'magnitude', 'months', 'none', 'precision', 'radius', 'range', 'rolls', 'rounds', 'service', 'services', 'shelf_life', 'spells', 'step', 'steps', 'swiftness', 'target', 'targets', 'term', 'terms', 'touch', 'turns', 'weeks', 'wonder', 'wonders', 'years', 'airlock', 'cargo_hold', 'cockpit', 'crew', 'engines', 'escape_pod', 'extra_sensors', 'environment', 'hangar_bay', 'hyperspace', 'lab', 'maneuvering', 'open_space', 'passengers', 'rescue_utilities', 'robot_arm', 'self_repair', 'sensors', 'sickbay', 'storage', 'weapons', 'alchemy_(assabian)']:
        return True
    return False

def main():
    new_translation_data = {}
    removed_keys = []
    for key, value in translation_data.items():
        if not is_in_settings(key) and not is_in_code(key):
            removed_keys.append(key)
        else:
            new_translation_data[key] = value

    with open('translation.json', 'w') as f:
        json.dump(new_translation_data, f, sort_keys=True, indent=4)

    with open('removed_i18n_keys.txt', 'w') as f:
        for key in removed_keys:
            f.write(key + '\n')


if __name__ == "__main__":
    main()


