# Pathfinder Community Sheet for Roll20.net
## Editing
Unlike most character sheets found on [Roll20's repo](https://github.com/Roll20/roll20-character-sheets), the [Pathfinder Community Sheet](https://github.com/Roll20/roll20-character-sheets/tree/master/Pathfinder%20Community) must be edited/developed utilizing npm/webpack from your local environment. Sheetworkers have been separated into various es modules based on their specific sheet sections or function(s). It is necessary to minimally install Git and Node/NPM. The html and js must be bundle using npm commands and webpack. More details below.

In order to edit the sheet locally, complete the following sections;

## Install Git or Desktop GUI
You will need to fork and clone the [Roll20 Repo](https://github.com/Roll20/roll20-character-sheets). Use Git cli and/or Github Desktop Gui.

 - Git for [Windows](https://gitforwindows.org/)
 - Git for [Linux](https://git-scm.com/download/linux)
 - Github [Desktop GUI](https://desktop.github.com/download/)

If you are going to setup with VScode [See specific instructions below](https://github.com/Roll20-Pathfinder-Character-Sheet/Roll20-Pathfinder-Character-Sheet?tab=readme-ov-file#specific-instructions-for-setting-up-with-vscode) you can skip these Limited Install steps.

## Limited Install using Node.js using NVM
This is a good option if you are not going to use VScode as your editor.
#### Windows
1. Download and install latest version of Node Version Manager(NVM):  https://github.com/coreybutler/nvm-windows/releases
2. Open a **NEW** shell (Right click -> Open Git Bash Here/Git GUI Here) You can not use one which was opened before NVM is installed.
3. Run `nvm install latest` to install the latest version of node.js
4. Run `nvm list available` and note the version you want to use. The latest version should be fine.
5. Run `nvm use node <version#>` include the proper version number as noted above.
#### Linux/Mac (adjust node version as needed)
1. Run `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`
2. Close and reopen your terminal
3. Run `nvm install 6.9.5`
4. Run `nvm alias default 6.9.5`
5. Run `nvm use 6.9.5`

#### Dependencies
**NPM** is distributed with Node.js - which means that when you download [Node](https://nodejs.org/en/download/package-manager), you automatically get NPM installed on your computer as well.

#### Install Curl executable (If you don't have it already)
**Curl** allows us to download [TheArronSheet.js](https://github.com/shdwjk/TheAaronSheet), instead of maintaining our own copy.
1. Go to https://curl.se/download.html and download the correct version for your OS.
2. Unzip and save to a directory on your computer ie on windows; `c:\curl` and copy curl.exe to `c:\windows\system32\`
3. You may need to add the .\Curl install directory or `curl.exe` to your windows environment PATH variable [More Info](https://www.computerhope.com/issues/ch000549.htm)

## VScode Installation
Here are some instructions for using VScode for editing the sheet.

#### Install git
1. Download the Github [Desktop GUI](https://desktop.github.com/download/) and/or install **Git** as noted above. You may also install both and use either one.
2. Add the "Github for Windows" install directory to your windows environment [PATH](https://windowsreport.com/edit-windows-path-environment-variable/) variable.
More specific instructions; there is only a 'cmd' directory, not a bin directory, contrary to the directions. [More info](https://www.answerlookup.com/how-add-git-windows-path-environment-variable).

#### VScode and Node.js integration
1. Download and install [VScode](https://code.visualstudio.com/download)
2. Install [Node](https://nodejs.org/) and NPM using vscode's integrated terminal. ie `npm install`
3. You may want to create a unique [Workspace](https://code.visualstudio.com/docs/editor/workspaces) specifically for editing the Pathfinder sheet.

#### Recommended Vscode Extensions
 - [NPM Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohlernpm-intellisense)
 - [Eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    (works with included ./eslint.config.mjs)
 - [Prettier Eslint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
    (works with included ./.prettierrc.json)
 - [GetLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
 - any other extensions that your might find useful.

#### Install Curl
**Curl** is required to copy and update TheAaronSheet code. [See above](https://github.com/Roll20-Pathfinder-Character-Sheet/Roll20-Pathfinder-Character-Sheet#install-curl-executable-if-you-dont-have-it-already).

### Fork and Clone Repo
1. [Fork](https://github.com/Roll20/roll20-character-sheets/fork) the Roll20 sheet repo code if you haven't already done so.
2. Clone the project from within VScode or [Github Desktop](https://desktop.github.com/)

### Editing and Submitting updates
1. It's highly recommended that you always create a new "working" branch(s) based on the Main/Master branch.
2. Running `npm run build` will watch for changed in the "./src" files and auto-bundle HTML and JS as index.html to the "./dist" folder. (see below)
3. Edit files in the "./src"
4. Submit commits to your working branch until you are done editing and then submit a pull request to Roll20's Origin/Main for approval.
5. Once the latest changes have been approved, they will be merged into Roll20's Origin/Master and propagate to the live servers.

## Build/Compile Script Commands
- Run `npm run postinstall` - downloads latest version of [TheArronSheet.js](https://github.com/shdwjk/TheAaronSheet) and saves it to the "./src" folder as TheAaronSheet.cjs "TAS" is used to handle custom logging/debugging as well as some common utility functions. To simplify bundling, the ./src/TheAaronSheet.js included in the repo is a slightly edited (ie adds module.exports) version of TAS to make it an es6 module as well.
- Run `npm run build` - Builds the project's index.html and watches for changes in the "./src" folder.Use Case: development/testing. Outputs bundled index.html, copies pathfinder.css and translation.json to "dist/" folder.
- Run `npm run prod` - Turns **debug off** automatically. Builds the project's index.html Use Case: roll20 production. Outputs bundled index.html, copies pathfinder.css and translation.json to "prod/" folder. Can be used for roll20's pathfinder.html in the root of the project.

## Viewing Edits on Roll20
* Option 1: (preferred) Sync a Custom Sandbox game to your local files using Scott C's Chrome browser extension [Roll20 API and Sheet Autouploader](https://chromewebstore.google.com/detail/roll20-api-and-sheet-auto/hboggmcfmaakkifgifjbccnpfmnegick) Use the in-game Custom Sandbox Tool to browse to your local "./dist" folder. The extension can "should" detect any local changes and update the sheet in-game.
* Option 2: Use the bundled index.html, pathfinder.css, and translation.json from the ./dist or ./prod folder accordingly. These files can be copied as raw text directly into a Custom game's, "Game Settings" editor (HTML|CSS|TRANSLATION|PREVIEW). Do not rely on the Preview tab. Always view the sheet in-game for an accurate load.

## Errors/Issues
- Webpack dependencies: use caution when updating webpack and/or dependencies. Incompatibilities between dependencies can break the building process. Always use `npm install` to verify and update webpack-lock.json

## Module Breakdown
Each "page" or section of the Pathfinder sheet has one or more modules associated with it. For instance, the core page has PFAbilityScores, PFInitiative, PFClassRaceGrid etc. The Defense page has PFDefense, PFSaves. The Attacks page has PFAttacks, spells page PFSpells, etc.

## Repeating sections
Pages with repeating sections will have a module for the repeating list, another module for the page-level variables (usually above it on the page), and a 3rd module for "roll options" the user has selected. For the attacks page it is :
* **PFAttacks:** the repeating_weapon list
* **PFAttackGrid:** the melee,ranged,cmb grid at the top
* **PFAttackOptions: ** the options checkboxes and how they affect macros

spells:
* **PFSpells:** the repeating_spells list
* **PFSpellCasterClasses:** The spell caster section, spells per day, spell points, etc
* **PFSpellOptions:** the spell options and updating of macros
