# ADnD 2E Revised

### Usage

Please check the [character sheets documentation](https://wiki.roll20.net/ADnD_2nd_Edition_Character_sheet) in the Roll20 wiki.

### Preview

[View Interactive Sheet Preview](https://github.com/Roll20/roll20-character-sheets/blob/master/ADnD_2E_Revised/2EPreview.png)

### Bugs and Suggestions
Report bugs or suggestions to the [forum thread](https://app.roll20.net/forum/post/9311682/official-ad-and-d-2e-revised-update-thread).

## Development

This development setup was originally created for Windows and later ported to MacOS. Therefore the main bulk of the work is done with Powershell as it was designed to be able to be run without any dependencies. Later on more dependencies were added as helpful tools got discovered and learned.

There is a plan to move away from Powershell and only use pug for assembling the HTML.

### Dependencies
The sheet uses 3 tools to generate the final sheet.
* Node.js for running javascript
* Npm for installing packages
* pugjs to build HTML components
* sass to build the CSS
* powershell to combine HTML components to the sheet.

### Getting started
#### 1. Fork the Roll20 repository and clone the project onto your machine.
```bash
$ git clone https://github.com/your-tag/roll20-character-sheets.git
```

#### 2. Install Node.js globally on your machine
Validate the installation by the following command
```bash
$ node -v
v17.2.0.
```

#### 3. Install npm globally on your machine
Validate the installation by the following command
```bash
$ npm -v
0.39.0
```

#### 4. Install pugjs into the ADnD_2E_Revised folder
Navigate to the sub folder with the ADnD_2E_Revised character sheet 
```bash
$ npm install pug
```
It is important that pug is installed into the folder itself, and not installed globally on the machine, notice there is no `-g` flag. The pug code just won't work when installed globally.

#### 5. Install SASS globally
Validate the installation by the following command
```bash
$ sass --version
1.54.3
```

#### 6. Run combine.ps1 from powershell
```powershell
PS /Users/me> combine.ps1
---- Sanitize Javascript files ----
abilityScores.js
...

---- Generating HTML files ----
schools-overview.html
...

---- Sanitize HTML files ----
2ESheet-base.html
...

---- Generating CSS files ----
rolltemplates.scss

---- Sanitize CSS files ----
2EStyle-base.css
...

---- Combining 2ESheet-base.html ----
insert_changelog.html
...

---- Combining 2EStyle-base.css ----
insert_announcements.css
...

Combine complete 11:09:50
```