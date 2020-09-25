# Savage Worlds - Graph Paper (SWADE)
This character sheet was originally made for **Maschinenleben** (released later this year), a fan product for the **Savage Worlds Adventure Edition** (SWADE) about cyborgs struggling with their loss of self. Due to its extensive build and customization options, it can be used for many other settings as well. Join the [support game](https://app.roll20.net/join/8488284/oQJGfg) for bug reports and requests.

## Notable Features
* **Blocks:** Toggle various content blocks, such as Allies, Augmentations, Powers, Vehicles, and more.
* **Extra Sheet:** You can switch the main layout for a simplified and compact alternative. Good for non-player characters.
* **Setting Agnostic:** The GM can toggle/rename most of the labels and skills and add up to two custom skills.
* **Setting Rules:** Enable/Disable optional rules and functions, such as *No Power Points* or *Explode Run Die*
* **Roll Templates:** Rolls can display multiple dice (RoF 1-6) and have a custom (or no) Wild Die.
* **Failures/Botches:** Dice that show a [1] or [2] are colored in red or gray respectively.
* **Sleek:** The minimalist design is inspired by pencil-drawn sheets on graph paper.
* **Silhouettes:** They look fancy! You can also add color markers as indicators for any purpose.
* **Help:** The sheet features an extensive help section under the Settings tab.

## Previews
<details>
  <summary>Full Preview</summary>
  
  ![Full Preview](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Graph%20Paper/SavageWorldsGraphPaper.jpg)
</details>

<details>
  <summary>Extra Sheet</summary>
  
  ![Extra Sheet](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Graph%20Paper/SavageWorldsGraphPaper_Extra.png)
</details>

<details>
  <summary>Attributes</summary>
  
  ![Attributes](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Graph%20Paper/gifs/attributes.gif)
</details>

<details>
  <summary>Edges & Hindrances</summary>

  ![Edges & Hindrances](https://github.com/Tetrakern/roll20-character-sheets/blob/master/Savage%20Worlds%20-%20Graph%20Paper/gifs/features.gif)
</details>

<details>
  <summary>Skills</summary>

  ![Skills](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Graph%20Paper/gifs/skills.gif)
</details>

<details>
  <summary>Health</summary>

  ![Health](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Graph%20Paper/gifs/health.gif)
</details>

<details>
  <summary>Augmentations & Integrity</summary>

  ![Augmentations & Integrity](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Graph%20Paper/gifs/augmentations.gif)
</details>

<details>
  <summary>Vehicles</summary>

  ![Vehicles](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Graph%20Paper/gifs/vehicles.gif)
</details>

## Latest Changes
#### Version 1.0
* Initial release

## Development
The character sheet is compiled from [Pug](https://pugjs.org/api/getting-started.html) templates with [SCSS/SASS](https://sass-lang.com/guide) (LibSass). You need both in order to contribute; do not directly modify the compiled HTML and CSS files because these changes will be overwritten! Use the `browser_preview.html` to get a local preview without the need to open Roll20 (non-functional, of course).

### Contribution Guidelines
* Make sure to always delete `@charset "UTF-8";` from the compiled CSS! Roll20 will not load it otherwise.
* The default `font-size` is `10px` optimized for 1440p or better resolutions, but keep 1080p in mind.
* Follow the 8×8 pixel grid (starting top-left). The height of each block must be a multiple of 8!
* The devil is in the detail. Align and size all elements as precise as possible (Chrome leads).
* Use [Block Element Modifiers](http://getbem.com/naming/) to name CSS classes. Avoid redundancies as much as reasonable.
* Use sheetworkers instead of auto-calculating fields.
* Always go the "extra mile".

### Translations
Most of the sheet's strings can be changed via the translation.json. However, some strings need to be manually changed by the GM due to the renaming feature for Traits. Note that certain sheetworker scripts depend on English strings, such as the die codes (e.g. d4, d6, ...) for parsers. If you use [Roll20's translation generation](https://roll20.zendesk.com/hc/en-us/articles/360037773493-Character-Sheet-Translation#CharacterSheetTranslation-StepTwo,GeneratingtheTranslationFile) feature `i18nOutput`, make sure to add the following pairs afterward since they will not be automatically included. Order alphabetically and use `&nbsp;` for trailing whitespaces. Put CSS adjustments due to differing word lengths in `_translation_overrides.scss`.

<details>
  <summary>Pseudo-Element Labels</summary>

```
"settings-tab-styles": "Styles",
"settings-tab-setup": "Setup",
"settings-tab-blocks": "Blocks",
"settings-tab-skills": "Skills",
"settings-tab-help": "Help",
"tab-skills": "Skills",
"tab-advancements": "Advancements",
"tab-notebook": "Notebook",
"tab-settings": "Settings",
"skill-track-die-label-d4-2": "2",
"skill-track-die-label-d4": "4",
"skill-track-die-label-d6": "6",
"skill-track-die-label-d8": "8",
"skill-track-die-label-d10": "10",
"skill-track-die-label-d12": "12",
```
</details>

<details>
  <summary>Sheet Defaults Translations</summary>

```
"defaults-rule-no-power-points": "[Rule] No Power Points",
"defaults-rule-no-power-points-description": "Use the No Power Points Setting Rule (SWADE 140).",
"defaults-rule-augmentation-strain": "[Rule] Augmentation Strain",
"defaults-rule-augmentation-strain-description": "Use the Strain rules from the Science Fiction Companion (SFC 29).",
"defaults-function-query-skill-dice-rof": "[Function] Query Skill Dice/RoF",
"defaults-function-query-skill-dice-rof-description": "Skill rolls will always query the amount of skill dice.",
"defaults-function-explode-run-die": "[Function] Explode Run Die",
"defaults-function-explode-run-die-description": "Makes the run die Ace.",
"defaults-function-running-ignores-wounds": "[Function] Running Ignores Wounds",
"defaults-function-running-ignores-wounds-description": "Wound penalties are not subtracted from the run die.<h4 style='margin-top: 24px;'>Show/Hide Blocks</h4><p style='margin-bottom: 16px; max-width: 640px;'>You can show or hide content blocks in accordance with the played Game Setting. This can also be done manually for each individual sheet in its Settings tab. Some blocks that were designed for Maschinenleben, such as Augmentations and Engrams, can be adapted for other purposes as well.</p>",
"defaults-block-show-allies": "[Block] Show Allies",
"defaults-block-show-allies-description": "Keep track of allied characters with a barebone mini sheet.",
"defaults-block-show-augmentations": "[Block] Show Augmentations",
"defaults-block-show-augmentations-description": "Install augmentations/cyberware and keep track of the Loss/Strain.",
"defaults-block-show-engrams": "[Block] Show Engrams",
"defaults-block-show-engrams-description": "Special programs or hardware to execute Hacking actions.",
"defaults-block-show-integrity": "[Block] Show Integrity",
"defaults-block-show-integrity-description": "Quantifies mental health/sanity and keeps track of mental afflictions. Maschinenleben.",
"defaults-block-show-power": "[Block] Show Power/Energy",
"defaults-block-show-power-description": "The energy/mana/etc. reserves of a character.",
"defaults-block-show-powers": "[Block] Show Powers/Spells",
"defaults-block-show-powers-description": "The known powers/spells of a character.",
"defaults-block-show-powerarmors": "[Block] Show Power Armors",
"defaults-block-show-powerarmors-description": "Vehicles and their modifications/weapons.",
"defaults-block-show-vehicles": "[Block] Show Vehicles",
"defaults-block-show-vehicles-description": "Vehicles and their modifications/weapons.",
"defaults-block-show-walkers": "[Block] Show Walkers",
"defaults-block-show-walkers-description": "Walkers/Mechs and their modifications/weapons.<h4 style='margin-top: 24px;'>Show/Hide Skills</h4><p style='margin-bottom: 16px; max-width: 640px;'>You can show or hide skills from the list in accordance with the played Game Setting. This can also be done manually for each individual sheet in its Settings tab. There are two custom skills that can be renamed and modified within the sheet as well, for example to make specialized skills (e.g. specific weapons with custom bonus or Wild Die).</p>",
"defaults-skill-show-boating": "[Skill] Show Boating Skill",
"defaults-skill-show-boating-description": "Show the Boating (Agility) skill.",
"defaults-skill-show-driving": "[Skill] Show Driving Skill",
"defaults-skill-show-driving-description": "Show the Driving (Agility) skill.",
"defaults-skill-show-electronics": "[Skill] Show Electronics Skill",
"defaults-skill-show-electronics-description": "Show the Electronics (Smarts) skill.",
"defaults-skill-show-faith": "[Skill] Show Faith Skill",
"defaults-skill-show-faith-description": "Show the Faith (Spirit) skill.",
"defaults-skill-show-focus": "[Skill] Show Focus Skill",
"defaults-skill-show-focus-description": "Show the Focus (Spirit) skill.",
"defaults-skill-show-language": "[Skill] Show Language Skill",
"defaults-skill-show-language-description": "Show the Language (Smarts) skill.",
"defaults-skill-show-magic": "[Skill] Show MAGIC Skill",
"defaults-skill-show-magic-description": "Show the MAGIC (Smarts) skill. Maschinenleben.",
"defaults-skill-show-occult": "[Skill] Show Occult Skill",
"defaults-skill-show-occult-description": "Show the Occult (Smarts) skill.",
"defaults-skill-show-piloting": "[Skill] Show Piloting Skill",
"defaults-skill-show-piloting-description": "Show the Piloting (Agility) skill.",
"defaults-skill-show-psionics": "[Skill] Show Psionics Skill",
"defaults-skill-show-psionics-description": "Show the Psionics (Smarts) skill.",
"defaults-skill-show-riding": "[Skill] Show Riding Skill",
"defaults-skill-show-riding-description": "Show the Riding (Agility) skill.",
"defaults-skill-show-spellcasting": "[Skill] Show Spellcasting Skill",
"defaults-skill-show-spellcasting-description": "Show the Spellcasting (Smarts) skill.",
"defaults-skill-show-weird-science": "[Skill] Show Weird Science Skill",
"defaults-skill-show-weird-science-description": "Show the Weird Science (Smarts) skill.",
"defaults-skill-show-custom-skill-1": "[Skill] Show Custom Skill #1",
"defaults-skill-show-custom-skill-1-description": "Show the Custom Skill #1, which can be renamed further down.",
"defaults-skill-show-custom-skill-2": "[Skill] Show Custom Skill #2",
"defaults-skill-show-custom-skill-2-description": "Show the Custom Skill #2, which can be renamed further down.<h4 style='margin-top: 24px;'>Rename Attributes</h4><p style='margin-bottom: 16px; max-width: 640px;'>You can rename the labels of each attribute and its abbreviation (max. 3 characters). This can also be done manually with the <b style='font-family: monospace; white-space: nowrap;'>@{rename-attribute}</b> for each individual sheet. Note that changing the label does not affect the reference <b style='font-family: monospace;'>@{attribute}</b> for rolls. They will always be in English.</p>",
"defaults-rename-attribute-agility": "[Rename] Attribute: Agility to&nbsp;",
"defaults-rename-attribute-agility-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-agility</b>.",
"defaults-rename-attribute-agi": "[Rename] Attribute: AGI to&nbsp;",
"defaults-rename-attribute-agi-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-agi</b>.",
"defaults-rename-attribute-smarts": "[Rename] Attribute: Smarts to&nbsp;",
"defaults-rename-attribute-smarts-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-smarts</b>.",
"defaults-rename-attribute-sma": "[Rename] Attribute: SMA to&nbsp;",
"defaults-rename-attribute-sma-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-sma</b>.",
"defaults-rename-attribute-spirit": "[Rename] Attribute: Spirit to&nbsp;",
"defaults-rename-attribute-spirit-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-spirit</b>.",
"defaults-rename-attribute-spi": "[Rename] Attribute: SPI to&nbsp;",
"defaults-rename-attribute-spi-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-spi</b>.",
"defaults-rename-attribute-strength": "[Rename] Attribute: Strength to&nbsp;",
"defaults-rename-attribute-strength-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-strength</b>.",
"defaults-rename-attribute-str": "[Rename] Attribute: STR to&nbsp;",
"defaults-rename-attribute-str-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-str</b>.",
"defaults-rename-attribute-vigor": "[Rename] Attribute: Vigor to&nbsp;",
"defaults-rename-attribute-vigor-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-vigor</b>.",
"defaults-rename-attribute-vig": "[Rename] Attribute: VIG to&nbsp;",
"defaults-rename-attribute-vig-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-vig</b>.<h4 style='margin-top: 24px;'>Rename Skills</h4><p style='margin-bottom: 16px; max-width: 640px;'>You can rename the labels of each skill, best kept below 15 characters due to layout constrains. This can also be done manually with the <b style='font-family: monospace; white-space: nowrap;'>@{rename-attribute}</b> for each individual sheet. Note that changing the label does not affect the reference <b style='font-family: monospace;'>@{attribute}</b> for rolls. They will always be in English.</p>",
"defaults-rename-skill-academics": "[Rename] Skill: Academics to&nbsp;",
"defaults-rename-skill-academics-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-academics</b>.",
"defaults-rename-skill-athletics": "[Rename] Skill: Athletics to&nbsp;",
"defaults-rename-skill-athletics-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-athletics</b>.",
"defaults-rename-skill-boating": "[Rename] Skill: Boating to&nbsp;",
"defaults-rename-skill-boating-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-boating</b>.",
"defaults-rename-skill-common-knowledge": "[Rename] Skill: Common Knowl. to&nbsp;",
"defaults-rename-skill-common-knowledge-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-common-knowledge</b>.",
"defaults-rename-skill-driving": "[Rename] Skill: Driving to&nbsp;",
"defaults-rename-skill-driving-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-driving</b>.",
"defaults-rename-skill-electronics": "[Rename] Skill: Electronics to&nbsp;",
"defaults-rename-skill-electronics-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-electronics</b>.",
"defaults-rename-skill-faith": "[Rename] Skill: Faith to&nbsp;",
"defaults-rename-skill-faith-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-faith</b>.",
"defaults-rename-skill-fighting": "[Rename] Skill: Fighting to&nbsp;",
"defaults-rename-skill-fighting-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-fighting</b>.",
"defaults-rename-skill-focus": "[Rename] Skill: Focus to&nbsp;",
"defaults-rename-skill-focus-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-focus</b>.",
"defaults-rename-skill-gambling": "[Rename] Skill: Gambling to&nbsp;",
"defaults-rename-skill-gambling-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-gambling</b>.",
"defaults-rename-skill-hacking": "[Rename] Skill: Hacking to&nbsp;",
"defaults-rename-skill-hacking-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-hacking</b>.",
"defaults-rename-skill-healing": "[Rename] Skill: Healing to&nbsp;",
"defaults-rename-skill-healing-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-healing</b>.",
"defaults-rename-skill-intimidation": "[Rename] Skill: Intimidation to&nbsp;",
"defaults-rename-skill-intimidation-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-intimidation</b>.",
"defaults-rename-skill-language": "[Rename] Skill: Language to&nbsp;",
"defaults-rename-skill-language-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-language</b>.",
"defaults-rename-skill-magic": "[Rename] Skill: Magic to&nbsp;",
"defaults-rename-skill-magic-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-magic</b>.",
"defaults-rename-skill-notice": "[Rename] Skill: Notice to&nbsp;",
"defaults-rename-skill-notice-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-notice</b>.",
"defaults-rename-skill-occult": "[Rename] Skill: Occult to&nbsp;",
"defaults-rename-skill-occult-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-occult</b>.",
"defaults-rename-skill-performance": "[Rename] Skill: Performance to&nbsp;",
"defaults-rename-skill-performance-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-performance</b>.",
"defaults-rename-skill-persuasion": "[Rename] Skill: Persuasion to&nbsp;",
"defaults-rename-skill-persuasion-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-persuasion</b>.",
"defaults-rename-skill-piloting": "[Rename] Skill: Piloting to&nbsp;",
"defaults-rename-skill-piloting-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-piloting</b>.",
"defaults-rename-skill-psionics": "[Rename] Skill: Psionics to&nbsp;",
"defaults-rename-skill-psionics-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-psionics</b>.",
"defaults-rename-skill-repair": "[Rename] Skill: Repair to&nbsp;",
"defaults-rename-skill-repair-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-repair</b>.",
"defaults-rename-skill-research": "[Rename] Skill: Research to&nbsp;",
"defaults-rename-skill-research-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-research</b>.",
"defaults-rename-skill-riding": "[Rename] Skill: Riding to&nbsp;",
"defaults-rename-skill-riding-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-riding</b>.",
"defaults-rename-skill-science": "[Rename] Skill: Science to&nbsp;",
"defaults-rename-skill-science-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-science</b>.",
"defaults-rename-skill-shooting": "[Rename] Skill: Shooting to&nbsp;",
"defaults-rename-skill-shooting-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-shooting</b>.",
"defaults-rename-skill-spellcasting": "[Rename] Skill: Spellcasting to&nbsp;",
"defaults-rename-skill-spellcasting-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-spellcasting</b>.",
"defaults-rename-skill-stealth": "[Rename] Skill: Stealth to&nbsp;",
"defaults-rename-skill-stealth-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-stealth</b>.",
"defaults-rename-skill-survival": "[Rename] Skill: Survival to&nbsp;",
"defaults-rename-skill-survival-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-survival</b>.",
"defaults-rename-skill-taunt": "[Rename] Skill: Taunt to&nbsp;",
"defaults-rename-skill-taunt-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-taunt</b>.",
"defaults-rename-skill-thievery": "[Rename] Skill: Thievery to&nbsp;",
"defaults-rename-skill-thievery-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-thievery</b>.",
"defaults-rename-skill-weird-science": "[Rename] Skill: Weird Science to&nbsp;",
"defaults-rename-skill-weird-science-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-weird-science</b>.",
"defaults-rename-skill-custom-skill-1": "[Rename] Skill: Custom Skill #1 to&nbsp;",
"defaults-rename-skill-custom-skill-1-description": "Can be renamed directly in the sheet's Settings tab.",
"defaults-rename-skill-custom-skill-2": "[Rename] Skill: Custom Skill #2 to&nbsp;",
"defaults-rename-skill-custom-skill-2-description": "Can be renamed directly in the sheet's Settings tab.<h4 style='margin-top: 24px;'>Rename Labels</h4><p style='margin-bottom: 16px; max-width: 640px;'>You can rename the labels at the top of the sheet, such as \"Name\" to \"Alias\" or \"Origin\" to \"Race\". This can also be done manually with the <b style='font-family: monospace; white-space: nowrap;'>@{rename-label-attribute}</b> for each individual sheet. Note that the labels are separated from the actual fields and do not affect the references (e.g. <b style='font-family: monospace;'>@{name}</b>). They will always be in English.</p>",
"defaults-rename-label-name": "[Rename] Label: Name to&nbsp;",
"defaults-rename-label-name-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-name</b> (e.g. Alias or Codename).",
"defaults-rename-label-origin": "[Rename] Label: Origin to&nbsp;",
"defaults-rename-label-origin-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-origin</b> (e.g. Race or Species).",
"defaults-rename-label-rank": "[Rename] Label: Rank to&nbsp;",
"defaults-rename-label-rank-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-rank</b> (e.g. Grade or Titel).",
"defaults-rename-label-level": "[Rename] Label: Level to&nbsp;",
"defaults-rename-label-level-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-level</b> (e.g. Circle or Year).",
"defaults-rename-label-exp": "[Rename] Label: EXP to&nbsp;",
"defaults-rename-label-exp-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-exp</b> (e.g. Karma or Gems).",
"defaults-rename-label-gender": "[Rename] Label: Gender to&nbsp;",
"defaults-rename-label-gender-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-gender</b> (e.g. Sex or Version).",
"defaults-rename-label-age": "[Rename] Label: Age to&nbsp;",
"defaults-rename-label-age-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-age</b> (e.g. Number or Incarnation).",
"defaults-rename-label-hair": "[Rename] Label: Hair to&nbsp;",
"defaults-rename-label-hair-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-hair</b> (e.g. Horns or Mane).",
"defaults-rename-label-eyes": "[Rename] Label: Eyes to&nbsp;",
"defaults-rename-label-eyes-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-eyes</b> (e.g. Sensors or Optics).",
"defaults-rename-label-height": "[Rename] Label: Height to&nbsp;",
"defaults-rename-label-height-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-height</b> (e.g. Scale or Length).",
"defaults-rename-label-weight": "[Rename] Label: Weight to&nbsp;",
"defaults-rename-label-weight-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-weight</b> (e.g. Mass or Your Mom).",
"defaults-rename-label-bits": "[Rename] Label: #Bits to&nbsp;",
"defaults-rename-label-bits-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-label-bits</b> (e.g. Money or Gold).<h4 style='margin-top: 24px;'>Rename Blocks</h4><p style='margin-bottom: 16px; max-width: 640px;'>You can rename the blocks to better fit the Game Setting, such as \"Powers\" to \"Talismans\" or \"Walkers\" to \"Frames\". This can also be done manually with the <b style='font-family: monospace; white-space: nowrap;'>@{rename-block-attribute}</b> for each individual sheet.</p>",
"defaults-rename-block-allies": "[Rename] Block: Allies to&nbsp;",
"defaults-rename-block-allies-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-allies</b>.",
"defaults-rename-block-apparel": "[Rename] Block: Apparel to&nbsp;",
"defaults-rename-block-apparel-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-apparel</b>.",
"defaults-rename-block-augmentations": "[Rename] Block: Augmentations to&nbsp;",
"defaults-rename-block-augmentations-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-augmentations</b>.",
"defaults-rename-block-engrams": "[Rename] Block: Engrams to&nbsp;",
"defaults-rename-block-engrams-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-engrams</b>.",
"defaults-rename-block-integrity": "[Rename] Block: Integrity to&nbsp;",
"defaults-rename-block-integrity-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-integrity</b>.",
"defaults-rename-block-inventory": "[Rename] Block: Inventory to&nbsp;",
"defaults-rename-block-inventory-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-inventory</b>.",
"defaults-rename-block-power": "[Rename] Block: Power to&nbsp;",
"defaults-rename-block-power-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-power</b>.",
"defaults-rename-block-powers": "[Rename] Block: Powers to&nbsp;",
"defaults-rename-block-powers-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-powers</b>.",
"defaults-rename-block-powerarmors": "[Rename] Block: Power Armors to&nbsp;",
"defaults-rename-block-powerarmors-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-powerarmors</b>.",
"defaults-rename-block-quick-notes": "[Rename] Block: Quick Notes to&nbsp;",
"defaults-rename-block-quick-notes-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-quick-notes</b>.",
"defaults-rename-block-vehicles": "[Rename] Block: Vehicles to&nbsp;",
"defaults-rename-block-vehicles-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-vehicles</b>.",
"defaults-rename-block-walkers": "[Rename] Block: Walkers to&nbsp;",
"defaults-rename-block-walkers-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-walkers</b>.",
"defaults-rename-block-weapons": "[Rename] Block: Weapons to&nbsp;",
"defaults-rename-block-weapons-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-block-weapons</b>.<h4 style='margin-top: 24px;'>Rename Integrity Hindrances (Maschinenleben)</h4><p style='margin-bottom: 16px; max-width: 640px;'>You can rename the Hindrances caused by the loss of Integrity (Sanity, Purity, etc.). This can also be done manually with the <b style='font-family: monospace; white-space: nowrap;'>@{rename-integrity-attribute}</b> for each individual sheet. Note that they activate in intervals with each fraction of 10 below 70 — Discord triggers on 69.9 or lower, Dissonance on 59.9 or lower, and so forth.</p>",
"defaults-rename-integrity-discord": "[Rename] Integrity: Discord to&nbsp;",
"defaults-rename-integrity-discord-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-discord</b>.",
"defaults-rename-integrity-psychosis": "[Rename] Integrity: Psychosis to&nbsp;",
"defaults-rename-integrity-psychosis-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-psychosis</b>.",
"defaults-rename-integrity-seizures": "[Rename] Integrity: Seizures to&nbsp;",
"defaults-rename-integrity-seizures-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-seizures</b>.",
"defaults-rename-integrity-depersonalization": "[Rename] Integrity: Depersonalization to&nbsp;",
"defaults-rename-integrity-depersonalization-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-depersonalization</b>.",
"defaults-rename-integrity-dissonance": "[Rename] Integrity: Dissonance to&nbsp;",
"defaults-rename-integrity-dissonance-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-dissonance</b>.",
"defaults-rename-integrity-alienation": "[Rename] Integrity: Alienation to&nbsp;",
"defaults-rename-integrity-alienation-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-alienation</b>.",
"defaults-rename-integrity-derealization": "[Rename] Integrity: Derealization to&nbsp;",
"defaults-rename-integrity-derealization-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-derealization</b>.",
"defaults-rename-integrity-ego-death": "[Rename] Integrity: Ego Death to&nbsp;",
"defaults-rename-integrity-ego-death-description": "Renamed via the attribute <b style='user-select: all; font-family: monospace; white-space: nowrap;'>rename-ego-death</b>.",
```
</details>

### Legal
The silhouette images were made from purchased assets and are only licensed for this sheet. Do not take them for any other purposes! This does not go for the human silhouettes which were made with the [HeroMachine 3](http://www.heromachine.com/heromachine-3-lab/) and are therefore free.
