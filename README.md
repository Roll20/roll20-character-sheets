Roll20 Character Sheets
=======================

This repository is the collection of all the community-contributed character sheets that are available for use on Roll20. 

Contributing
============

Full Character Sheet documentation can be found on the [Roll20 Wiki: Building Character Sheets](https://wiki.roll20.net/Building_Character_Sheets).

Pull requests are processed weekly and should be **submitted no later than 6am PST Mondays**, roughly 13:00-14:00 UTC. Earlier submissions are encouraged to allow for peer review from other contributors. On Monday, a Roll20 staff member will review the content to ensure it meets the standards documented on the [Roll20 Wiki](https://wiki.roll20.net/Building_Character_Sheets#Roll20_Character_Sheets_Repository). Comments, concerns, and changes as a result of review will need to be addressed before the pull request can be merged into the repository.

## Internationalization &amp; Translations

Help us make these sheets accessible in as many languages as possible. We use [Crowdin](https://crowdin.com/) to crowdsource translations.

**The best way to translate an existing character sheet is to become a translator by emailing a request to team@roll20.net.** 

Character Sheet authors have a number of controls over how the sheet is translated and how the translation is displayed. Full documentation can be found in the [Roll20 Wiki](https://wiki.roll20.net/Character_Sheet_i18n). Sheets that are duplicated and translated manually rather than using this translation process will not be accept.

## Improving Existing Character Sheets

If you want to help improve an existing sheet, just clone this repository. Make your changes, test them in app using the Custom accessible with a Roll20 Pro account, and submit a pull request.

## Creating your own

If you would like to contribute a new sheet for the community to use, just clone this repository and follow the [directions for GitHub](https://wiki.roll20.net/Beginner%27s_Guide_to_GitHub). New sheets will need to meet the minimum required standards located in the [Roll20 Wiki](https://wiki.roll20.net/Building_Character_Sheets#Roll20_Character_Sheets_Repository). 

**Creating a sheet.json File**

When you are ready to submit your template for **public use**, create a `sheet.json` file in your sheet's folder (see the kitchensink folder for an example sheet.json file). This file is required to be named `sheet.json`. The file has the following fields:

* `html`: The **exact** name, including capitzation, of the HTML file for the sheet (e.g. `kitchensink.html`).
* `css`: The **exact** name, including capitzation, of the CSS file for the sheet (e.g. `kitchensink.css`).
* `authors`: A simple string telling who contributed toward the sheet (e.g. `Riley Dutton`)
* `roll20userid`: A simple string telling the Roll20 User ID's of the authors (e.g. `1` or `45672,145678`). Just used so we know who to credit internally, won't be shown publicly on the site.
* `patreon`: Place the URL for a Patreon campaign here, and it will appear under your sheet's description when selected.  (e.g. `"https://www.patreon.com/<name>"`)
* `tipeee`: Place the URL for a Tipeee here, and it will appear under your sheet's description when selected.  (e.g. `"https://www.tipeee.com/<name>"`)
* `preview`: The **exact** name, including capitzation, of an image file which included in your sheet folder showing a preview/screenshot of the sheet (will be displayed in-app at 500x500 resolution) (e.g. `kitchensink.png`).
* `instructions`: Markdown-formatted instructions for using the sheet. If there are any particular setup steps, special rolls you want to make the player aware of, etc., this is the place to put that info. Try to be succinct.

After we have reviewed your sheet if we approve it we will add it to the `approved.yaml` file in the root directory which will cause it to be available to everyone on the main Roll20 site. If we reject your sheet, we will comment on your Github commit and let you know what changes need to be made before it can be accepted. 

PLEASE VERIFY YOUR SHEET.JSON IS VALID JSON at http://jsonlint.com before you submit it!

Guidelines
==========

The former guidelines found here have been moved and expanded on in the [Roll20 Wiki: Building Character Sheets](https://wiki.roll20.net/Building_Character_Sheets#Roll20_Character_Sheets_Repository).


License
=======

All of the code (HTML/CSS) of the sheets in this repository is released under the MIT license (see LICENSE file for details). If you contribute a new sheet or help improve an existing sheet, you agree that your contribution is released under the MIT License as well.
