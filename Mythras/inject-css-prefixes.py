#!/usr/bin/env python3

import re
import argparse
import os
import fileinput

parser = argparse.ArgumentParser(description="Adds the 'sheet-' prefix to all class tags.")
parser.add_argument('filename', help='html source file to process')

args = parser.parse_args()

filepath = os.path.abspath(args.filename)

src = fileinput.FileInput(filepath, inplace=True)
def classprefix(matchobj):
    replacement = 'class="'
    for htmlclass in matchobj.group(1).split():
        if htmlclass.startswith("sheet-"):
            replacement = replacement + htmlclass + ' '
        else:
            replacement = replacement + 'sheet-' + htmlclass + ' '
    replacement = replacement.rstrip()
    return replacement + '"'

for line in src:
    newline = re.sub(r"class=\"(.*)\"", classprefix, line.rstrip())
    print(newline)



