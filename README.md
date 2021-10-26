<div align="center">
    <a href="https://roll20.net">
        <img src="https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Roll20%20Logo.png" alt="Roll20 logo" title="Roll20" height="60" />
    </a>

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Roll20/roll20-character-sheets/master?color=ff0066&label=last%20updated) ![GitHub contributors](https://img.shields.io/github/contributors/Roll20/roll20-character-sheets?color=ff0066) ![Lines of code](https://img.shields.io/tokei/lines/github/Roll20/roll20-character-sheets?color=ff0066&label=lines%20of%20code) ![GitHub repo size](https://img.shields.io/github/repo-size/Roll20/roll20-character-sheets?color=ff0066)
    
</div>

# Roll20 Character Sheets

Roll20.net is the easy-to-use virtual tabletop that brings pen and paper gaming to the web the right way. Built on a powerful platform of tools, yet elegantly simple, it focuses on enhancing what makes tabletop gaming great: storytelling and camaraderie.

This repository is the collection of all the community-contributed character sheets that are available for use on [Roll20](https://roll20.net). These are, mostly, created for free, for use by the community, and represent dozens, if not hundreds of hours of effort on the parts of their creators. 

This repository consists of over 📜 **800 community contributed sheets**, from over 🧑 **300 contributors**, who have written over ⌨️ **400,000 lines of code**. This is an 🦦 **otter**.

## Community Conduct

The [Roll20 Code of Conduct](https://help.roll20.net/hc/en-us/articles/360037254334-Community-Code-of-Conduct) applies to your participation on this repository.

**tl;dr**

Following the Roll20 Code of Conduct means **no racism, no sexism, no hate speech, no backseat gaming, no personal attacks, no transphobia, no misgendering, no ableism, no anti-LGBTQIA+ sentiments (and so on) are allowed.**

## Table of Contents

- [Roll20 Character Sheets](#roll20-character-sheets)
  - [Community Conduct](#community-conduct)
  - [Table of Contents](#table-of-contents)
  - [Contributing](#contributing)
    - [Getting Started](#getting-started)
    - [Improving Existing Character Sheets](#improving-existing-character-sheets)
    - [Starting a New Character Sheet](#starting-a-new-character-sheet)
    - [Submission Guidelines](#submission-guidelines)
    - [Release Cadence](#release-cadence)
    - [Internationalization & Translations](#internationalization--translations)
  - [License](#license)
  - [Contact](#contact)

## Contributing

There are many ways in which you can contribute to these sheets, and to the health of the space: 

* [Report issues and bugs](https://github.com/Roll20/roll20-character-sheets/issues) you encounter when using the sheets.
* [Review sheet code changes](https://github.com/Roll20/roll20-character-sheets/pulls)
* Review and contribute to the documentation on the [community wiki](https://wiki.roll20.net/Building_Character_Sheets).
* Write or contribute to a new or existing character sheet!

### Getting Started

If you are interested in contributing code, fixing issues, or adding content, the [Roll20 Wiki: Building Character Sheets](https://wiki.roll20.net/Building_Character_Sheets) documentation is a great place to start familiarizing yourself with the space.

### Improving Existing Character Sheets

Before you submit work to the repository, please ensure that there is not already a sheet that covers the game you are intending to create a sheet for. If there is already one, fear not! Be bold and suggest some changes. 

In general, this should look something like this:

* Fork the repository. 
* Make your changes to the sheet in question.
* Make the Pull Request.
* Invite previous contributors to review your changes.
* Once everyone is satisfied with the changes, we can merge the changes into the existing sheet.

 We have learned from experience that it is better to have a single sheet that is contributed to by a number of people, rather than perpetuating the cycle of a contributing a sheet, losing interest, moving on, and then the next contributor creating an entirely new sheet. This is a collaborative community, please feel empowered to collaborate!

[Beginner's Guide to GitHub](https://wiki.roll20.net/Github) - for Roll20 character sheets

### Starting a New Character Sheet

If you have a burning desire to start from scratch, and there isn't already an existing sheet for a game or system, then it's time to embark upon a voyage of discovery. ⛵ There is plenty of documentation available on the [Roll20 Help Center](https://help.roll20.net/hc/en-us/articles/360037773413) and on the [community wiki](https://wiki.roll20.net/Building_Character_Sheets), but here's a quick primer to get you started. 

A character sheet, at a minimum requires four files in an appropriately named subfolder of the repo:

* **\<sheetname>.html** - This HTML file describes the structure and functionality of your character sheet. It might consist of [inputs to store user data](https://wiki.roll20.net/Building_Character_Sheets#Text_.26_Numbers), [buttons to make rolls](https://wiki.roll20.net/Button#Roll_Button) to the VTT, [repeating sections](https://wiki.roll20.net/Repeating_Sections) to store lists of information (like inventory items), or more advanced elements such as [roll templates](https://wiki.roll20.net/Building_Character_Sheets/Roll_Templates) or [sheet workers](https://wiki.roll20.net/Sheet_Worker_Scripts).
* **\<sheetname>.css** - This CSS file is primarily responsible for adding styles to your character sheet. However, CSS can be very versatile and such is used for [much](https://wiki.roll20.net/CSS_Wizardry#Tabs), [much](https://wiki.roll20.net/CSS_Wizardry#Custom_Progress_Bar), [much](https://wiki.roll20.net/CSS_Wizardry#Clocks) more. 
* **preview.(jpg/png/gif)** - This image file is what users will see as a preview, before selecting your sheet.
* **sheet.json** - This JSON file includes metadata about the sheet, including the filenames for your sheet, your credit as author(s), and much more. It's integral to your sheet being implemented correctly that this format is followed. Please see [this document](https://wiki.roll20.net/Sheet.json) for more information.

### Submission Guidelines

All contributions to this repository must meet the minimum requirements outlined in [this article](https://help.roll20.net/hc/en-us/articles/360037773453).

### Release Cadence

Pull Requests are reviewed *at least* weekly by 00:00 UTC on Thursdays, although cadence is often more frequent. 

Once a Pull Request has been merged, changes should be served on [Roll20.net](https://roll20.net) within approximately ten minutes. Contributors are encouraged to open a GitHub issue if their changes haven't appeared 24 hours after the Pull Request has been merged.

### Internationalization & Translations

We use [Crowdin](https://crowdin.com/) to crowdsource and manage translations for various aspects of our site. 

Check out the Help Center articles and Community Wiki documentation below to learn about translations and to help us make Roll20 accessible in as many languages as possible!

* [How to Become a Translation Volunteer](https://roll20.zendesk.com/hc/en-us/articles/360058423993-How-to-Become-a-Translation-Volunteer)
* [How to Translate Content on Crowdin](https://roll20.zendesk.com/hc/en-us/articles/360057432414-How-to-Translate-Content-on-Crowdin)
* [Roll20 Community Wiki](https://wiki.roll20.net/Character_Sheet_i18n)

**Sheet translations submitted outside of Crowdin will not be accepted and/or will be overwritten by Crowdin.**

## License

All of the code (HTML/CSS) of the sheets in this repository is released under the MIT license (see [LICENSE](https://github.com/Roll20/roll20-character-sheets/blob/master/LICENSE) file for details). If you contribute a new sheet or help improve an existing sheet, you agree that your contribution is released under the MIT License as well.

## Contact

For urgent concerns, problems, or hotfixes, please submit a ticket at [https://roll20.net/help](https://roll20.net/help)
