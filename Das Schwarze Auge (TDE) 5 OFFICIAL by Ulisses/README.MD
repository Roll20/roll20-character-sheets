
# Official Das Schwarze Auge/The Dark Eye system for Roll20
![TDE_Roll20](https://user-images.githubusercontent.com/75448500/133844250-62f177c1-af3a-4f1c-bdc1-114162286011.jpg)
[Official feedback hub](https://github.com/Plushtoast/TDE-Roll20-Official) for the Roll 20 ulisses TDE character sheet & future compendium books


## Changelog
### v1.5.5 (03/20/2023)
* Preview ranged attack roll final die
  
### v1.5.4 (03/04/2023)
* Support for Patron
* Support for Demonmark
* Support for magical sign
* Grimorum Cantiones update
* Pact special abilities

### v1.5.0 (11/14/2022)
* LE, KE, AE section has been reworked and simplified (pain levels visible via hover on max LE or in the headerbar on LE)
* Advanced roll dialog (3d20) has now a dropdown for default difficulties
* Ranged combat roll template has now the right botch table attached
* Advanced roll dialog for regeneration now available, including all common modifiers
* Confirmation roll looks now slightly better
* The compendium data should now include hitzones. Those can be rolled on more easily with new roll buttons.
* Spell and liturgies can now include QS/QL in their roll formula. Spells with roll formulas show the roll in the chat card (can be disabled via the options)


### v1.4.3 (19/21/2022)
* Added new expansions
* Fixed a number conversion bug for 3d20 rolls

### v1.4.0 (10/1/2022)
* Armor zones, including calculation of encumbrance is now available. You can enable this optional rule in the options tab.
* Adventure points can now be spend to increase levels of special abilities, advantages and disadvantages
* Crits and botches of single d20 rolls should now show a button to do a confirmation roll. This can be turned off via the options.
* There is now a third option besides NPC and character for the sheet. The notes sheet only holds information, which can be placed on the map, so the players or gm can get easy information on locations or important places on maps.
* The modifiers for special abilities have been extended with modifiers for talent groups and modifiers for all talents at once.
* The implications of some conditions (modifiers) have been improved
* There is now an advanced roll dialog for 3d20 checks. This dialog provides some more typical modifiers for each roll. It can be disabled via the options.
* Diseases can now be added to the character sheet (e.g. via drag and drop from the compendium) and be rolled on
* A sheet can now be automatically updated via the "Migracle". You can find the new section in the options tab. The "Migracle" will compare the name of all available abilities, spells and liturgical chants with those contained in the compendium. If there is a match, it will link the item with the compendium entry and pull all data again on the sheet. Careful as this might overwrite manual data entries made by yourself.

### v1.3.0 (9/8/2022)
* Weight of single items can now be ignored (checkbox)
* Talent value now included in the roll template
* Initial support for hitzones
* Information and quick access for all available expansions
* Post combat special abilities also from combat tab
* Inventory item pictures can now be enlarged by hovering on the thumbnail
* Some sections can now be collapsed
* Support for weapon and armor damage (break point rating)
* Botch rolls now have a button to repeat the roll
* The NPC-sheet now profits from armor items
* Poison can now be rolled on

### 1.2.3 (11.8.2022)
* Movement speed should now be properly affected by conditions
* Ranged combat should not be affected by encumbrance anymore
* Off-hand modifiers should now work properly
* Skill specializations should now be calculated properly

### 1.2.1 (02.5.2022)
* Workaround for token image not changeable bug
* Minor layout fix

### 1.2.0 (28.3.2022)
* Changed botch descriptions from name to actual description
* Reworked offhand/mainhand switching and depiction
* Rolls now show a botch button in the rolltemplate if botched
* Critical attacks now show a reminder to half the parry check
* Meleeatacks show attack range (for the defender to setup the roll more easily)
* Combat special abilities can now be selected per level
* Talent sheet shows now all modifiers
* Special abilities can now be enabled to be shown on the talents tab
* Different rule elements and items can now be posted to the chat
* Some textarea fields should now extend their height automatically
* Post defense malus (e.g. Finte) to the chat
* Base/special maneuver icons for combat special abilities
* Multiply bonus/malus of special abilities with their level
* States and conditions now have a description
* Fixed inured to encumbrance caluclation
  
### 1.1.2
* Fixed "Entrückung" combat modifier
* Fixed critical success and botch inversion

### 1.1.1
* Advancement cost caluclation and payment of skills and attributes
* Improved rolltemplates for 3d20 checks
* QS/QL and FP/SP modifiers for effects
* Offhand botch table fixed
* Custom condition modifier fixed
* Compendium abilities adventure points are now payable
* Rolltemplate damage buttons

### 1.0.7
* Modifier "Wound Threshold" added
* Compendium now includes spell extensions
* Combatskills better defaults

### 1.0.6
* Fixed a bug with the skill rating calculation of talents

### 1.0.5
* Separated manual modifiers from modifiers caused through special abilities and effects to prevent race conditions between sheet worker updates and improve performance.
* Condensed combat techniques for upcoming character advancement buttons

### 1.0.2 Initial Release
This system is intended for usage with [Roll20](http://https://roll20.net//) to play "Das Schwarze Auge" / "The Dark Eye" 5th edition.

## Game setup
In Roll20 create a new game and select the NEW Das Schwarze Auge / The Dark Eye character sheet and start your game.

## Roadmap
Our current plans: [Roadmap](https://github.com/Plushtoast/TDE-Roll20-Official/milestones). This is subject to change.


## Current State
Aventuria awaits, as TDE 5 is also available on Roll20.
The system includes relevant mechanisms to play in the wonderous world of Aventuria and The Dark Eye and create your own adventures, characters and stories.

The character sheet includes TDE compendium integration and allows you to add your advantages, disadvantages, cultures, professions, special skill, spells, liturgies, rituals and equipment as you see fit.

## Discussion & Assistance
If you want to discuss TDE for roll20 or need some assistance you can also join the Discord Servers:
* [Ulisses](https://discord.gg/WXu4m8sc)

## Notable Features
* Skills, attributes, liturgies, ceremonies, spells, rituals, weapon tests and many more can be rolled.
* Integration of the TDE Roll20 compendium
* Management of inventory with drag and drop and in-depth information on all items through compendium expansions.

## Official Modules
* Core Expansion (EN/DE)
* Aventurian Bestiary (EN/DE)
* Aventurian Armory (EN/DE)

## Feedback and improvements
If there is a problem with the character sheet or any compendium books, please check the issue section [Issues](https://github.com/Plushtoast/TDE-Roll20-Official/issues) and open a new issue for us with as much detail as possible.
