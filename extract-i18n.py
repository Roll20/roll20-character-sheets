

import re

html = open("masks.html", "rb").read()

machin = re.findall(r"data-i18n=\"(.+?)\".*?>(.+?)</label>", html)

#print machin

sortie = "{\n"
for (truc, bidule) in machin:
    addone = "    \""+truc+"\": \""+bidule+"\",\n"
    if not addone in sortie:
        sortie += addone


machin = re.findall(r"placeholder=\"(.+?)\" data-i18n-placeholder=\"(.+?)\"", html)

for (bidule, truc) in machin:
    addone = "    \""+truc+"\": \""+bidule+"\",\n"
    if not addone in sortie:
        sortie += addone

if sortie[-2:] == ",\n":
    sortie = sortie[:-2] + "\n"

sortie += "}"

print sortie