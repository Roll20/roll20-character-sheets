# BattleTech - A Time of War Character Sheet

## Development Notes

The character sheet for BattleTech - A Time of War is not as straightforward as other character sheets. However, it is hopefully easier to develop.

Since the majority of IDEs recognise a file based on its file extension, having the sheet worker JavaScript in the same HTML file as the character sheet results in the IDE not being able to give you any help with your JavaScript code. To rectify this problem, the sheet worker code has been pulled out into multiple separate JavaScript files. The main file is the [sheet-worker.js](https://github.com/Roll20/roll20-character-sheets/blob/master/BattleTech-A-Time-of-War/development/src/sheet-worker.js) file, with other separate files for the different pieces of functionality. All changes to the sheet worker code should be made to these files.

Once your changes have been made, there are two steps you need to do before committing. You'll need a few programs as well.

1. [npm](https://www.npmjs.com/get-npm)
2. [Python](https://www.python.org/downloads/)

Once npm is installed, run `npm -i` in the development directory to install the libraries needed.

After making your code changes:
1. Run `npm test` in the development directory to automatically run the unit tests. If any of the tests fail, check your changes; you must have made a mistake in your code.
2. Run `python3 main.py` in the pre-commit-script directory. This will combine all the JavaScript into a single file, then insert the JavaScript into the character sheet HTML file.