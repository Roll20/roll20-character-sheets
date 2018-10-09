Roll20 Character Sheets
=======================

This repository is the collection of all the community-contributed character sheets that are available for use on Roll20. 

Contributing
============

Full Character Sheet documentation can be found on the [Roll20 Wiki](https://wiki.roll20.net/Building_Character_Sheets).

Pull requests are processed weekly and should be **submitted no later than 6am PST Mondays**, roughly 13:00-14:00 UTC. Earlier submissions are encouraged to allow for peer review from other contributors. On Monday, a Roll20 staff member will review the content to ensure it meets the standards documented here and on the Roll20 Wiki. Comments, concerns, and changes as a result of review will need to be addressed before the pull request can be merged into the repository. This schedule is a general best practice and is subject to changes or delays.

## Internationalization &amp; Translations

Help us make these sheets accessible in as many languages as possible. We use [Crowdin](https://crowdin.com/) to crowdsource translations. **The best way to translate an existing character sheet is to become a translator by emailing a request to team@roll20.net.** Character Sheet authors have a number of controls over how the sheet is translated and how the translation is displayed. Full documentation can be found in the [Roll20 Wiki](https://wiki.roll20.net/Character_Sheet_i18n).

## Improving Existing Character Sheets

If you want to help improve an existing sheet just clone this repository, make your changes, and submit a pull request. When updating existing character sheets if you are doing significant attribute name changes it is a best practice to write a sheet worker to migrate the existing input data over to the new attribute names so that players will not lose their data.

## Creating your own

If you would like to contribute a new sheet for the community to use, just clone this repository and create a new folder with the name of the game system that the sheet is for. Please use complete titles where possible for folder names and avoid acronyms or abbreviations. Add the necessary files to this folder then submit a pull request. If you have any questions, feel free to drop us a line at team@roll20.net and we can help you get set up.

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

Here are a few guidelines that you should follow when contributing sheets for the community:

### Make it Familiar

The sheet for each game type should be familiar to players who are used to seeing the paper version of that sheet. It need not be identical to the paper version and should avoid violating any copyright, but it also shouldn't be laid out in such a crazy way that players will have a hard time understanding how to use it. **Design for ease of use first and foremost.** Along those lines, keep your UI changes simple -- please don't change the basic functionality of how a checkbox works, for example.

### Add Rolls

The best sheets not only keep track of character stats, they have the most common rolls for the game system embedded in them. This makes it much easier for new players to play the game by adding intuitive functionality. While you don't have to include every roll in the whole system, including frequently used rolls where appropriate can really help elevate your sheet to the next level.

### Avoid Duplicating Work

As a general rule we only need one sheet for each system. For some major games like Pathfinder or D&D, we may allow more than one sheet if they offer different styles and functionality. Please contact us in advance before you spend a lot of time working on a new sheet for a game we already have a sheet for. We should focus on improving existing sheets where possible rather than creating totally new ones. Along those lines, this is a community effort, so if you want to help improve an existing sheet, just jump in and do so.

### Use Standard Attribute Names

Whenever possible, use standard names for attributes, spelled out. For example, "Intelligence", "Strength", and "Wisdom". This is important so that if a Character is imported into a game with a different sheet, most of the values will be able to transition. If the attribute names are all different, then nothing can be imported. Your best bet is to look at existing sheets and whenever possible use the same attribute names that are already in use.

### No Character Creation or Advancement

Due to copyright restrictions, please don't attempt to include functionality for advancing a character automatically to the next level or creating a new character from scratch automatically. It's fine to have attributes that auto-calculate based on other attributes (including the current level). We'll let you know if your submitted sheet violates this rule.

### APIs Cannot Be Required By Default

API companions are a welcome supplement for a character sheets but sheets are expected to have basic functionality without an API. This is to ensure accessible & functionality to community members at all of subscription levels.

### Don't Use Reserved HTML

Your HTML file must **not** have a `<head>` or `<body>` tag, or your character sheet may not load in the virtual tabletop.

### Do Use LF (Unix) Line Endings

All .css & .html files must use Unix line endings, LF.

### Indy and Homebrew Rules Must Be Readily Available

Sheets can be submitted for independent games and homebrew content. The latter will need to ensure they are not violating copyright for their respective game system. In both cases the rules need to be readily available to the public. 

License
=======

All of the code (HTML/CSS) of the sheets in this repository is released under the MIT license (see LICENSE file for details). If you contribute a new sheet or help improve an existing sheet, you agree that your contribution is released under the MIT License as well.
