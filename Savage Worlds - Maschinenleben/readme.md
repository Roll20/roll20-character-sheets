# Savage Worlds - Maschinenleben Character Sheet
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
  <summary>Attributes</summary>
  
  ![Attributes](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Maschinenleben/gifs/attributes.gif)
</details>

<details>
  <summary>Edges & Hindrances</summary>
  
  ![Edges & Hindrances](https://github.com/Tetrakern/roll20-character-sheets/blob/master/Savage%20Worlds%20-%20Maschinenleben/gifs/features.gif)
</details>

<details>
  <summary>Skills</summary>
  
  ![Skills](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Maschinenleben/gifs/skills.gif)
</details>

<details>
  <summary>Health</summary>
  
  ![Health](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Maschinenleben/gifs/health.gif)
</details>

<details>
  <summary>Augmentations & Integrity</summary>
  
  ![Augmentations & Integrity](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Maschinenleben/gifs/augmentations.gif)
</details>

<details>
  <summary>Vehicles</summary>
  
  ![Vehicles](https://raw.githubusercontent.com/Tetrakern/roll20-character-sheets/master/Savage%20Worlds%20-%20Maschinenleben/gifs/vehicles.gif)
</details>

## Latest Changes
#### Version 1.0
* Initial release

## Development
The character sheet is compiled from [Pug](https://pugjs.org/api/getting-started.html) templates with [SCSS/SASS](https://sass-lang.com/guide) (LibSass). You need both in order to contribute; do not directly modify the compiled HTML and CSS files because these changes will be overwritten! Use the `browser_preview.html` to get a local preview without the need to open Roll20 (non-functional, of course).

### Contribution Guidelines
* Make sure to always delete `@charset "UTF-8";` from the compiled CSS! Roll20 will not load it otherwise.
* Follow the 8×8 pixel grid (starting top-left). The height of each block must be a multiple of 8!
* The devil is in the detail. Align and size all elements as precise as possible, down to one pixel!
* Use [Block Element Modifiers](http://getbem.com/naming/) to name CSS classes.
* Use sheetworkers instead of auto-calculating fields.

### Legal
The silhouette images were made from purchased assets and are only licensed for this sheet. Do not take them for any other purposes! This does not go for the human silhouettes which were made with the [HeroMachine 3](http://www.heromachine.com/heromachine-3-lab/) and are therefore free.
