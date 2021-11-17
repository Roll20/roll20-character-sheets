import os
from typing import List


def main():
    os.system("npm --prefix ../development/ run compile")

    output: List[str] = []

    with open('../BattleTech-A-Time-of-War.html', 'r') as character_sheet:
        for line in character_sheet:
            output.append(line)
            if line == '<script type="text/worker">\n':
                break

    with open('../development/output/sheet-worker.js') as sheet_worker:
        output.append(sheet_worker.read())
        output.append("\n</script>\n")

    with open('../BattleTech-A-Time-of-War.html', 'w') as character_sheet:
        character_sheet.write("".join(output))


if __name__ == "__main__":
    main()
