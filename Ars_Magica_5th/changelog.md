## Changelog

+ **February 2022 - v1.7.1 - Fix**
    - Fixed accelerated abilities
+ **January 2022 - v1.7 - Magic & Armory update**
    - *General changes*:
        - Added Welcome message to the "Sheet" tab, and made that tab the default tab
        - Added tooltips to some elements of the sheet to provide info about them (e.g. XP fields)
        - Repeated items (such as items, abilities, spells...) start expanded for easier completion.
    - *Magic Update*:
        - Added a toggle to hide elements of the sheet that are specific to Magi (see Sheet tab)
        - Added deficiency toggles that halves casting totals
        - Added a roll button for non-fatiguing spontaneous casting
        - Separated the Artes Liberales and Philosophiae fields of ceremonial and ritual casting, to accomodate specialisation in either
        - Added Soak computations with Form bonuses
        - Added list for useful spontaneous spells in the "Spells" tab
    - *Armory Update*:
        - Added an armor list with togglable elements. Can store multiple armor (parts).
        - Burden and Encumbrance are now computed automatically
        - Added combat modifiers list that is applied to rolls
+ **October 2021 v1.6.5**
    - Fix to laboratory focus for characters with an affinity bonus to one of the arts used.
+ **March 2021, v1.6.4**
    - Added `lalign` and `ralign` to the `custom` rolltemplate
+ **March 2021, v1.6.3**
    - Added `roll-color` and `button-color` properties to the `custom` rolltemplate, with all CSSv3 colors
+ **February 2021, v1.6.2**
    - Fixed centering not working
    - Fixed translation of spellcasting words options
    - Added support for the `custom` rolltemplate from the forum, with all CSS colors. Can be useful for spell tables or similar chat menus
+ **February 2021, v1.6.1**
    - Fixed botch die botching on 1s instead of 10s
    - Fixed critical dice displaying 10s as exploding, instead of 1s
    - Fixed spell's arts value not being updated when the character's arts are modified
        + Completely changed how arts are handled inside spells
        + A script will be run to convert your data to the new format, but may fail for some spells
    - Added a critical roll for initiative that sets the turn tracker initiative (not visible in the sheet, use the chat button)
    - Added option to always ask which characteristic to use when rolling abilities
    - Centered the sheet in its tab
+ **February 2021, v1.6**
    - Added inline labels to all rolls, hover rolls in chat to see details
    - Fixed tabs not displaying properly *(tabs are again attached to an attribute)*
    - Added simple/stress die handling. See the "Help" tab for explanation, there's a catch
    - Support for focus in magic totals & rolls
    - Support for additional fatigue levels
    - Fixed ability rolltemplate being too wide in some cases
    - Added documentation direclty to the sheet, see the "Help" tab
+ **May 2020, v1.51**
    - Small change to the Ability roll template for legibility
+ **April 2020, v1.5**
    - Incorporated new fonts throughout the sheet!
    - Polished several roll templates and added new ones for Defending. Stylish!
    - Added an extra button for rerolling stress explosions, can be found next to the botch button. 
    - Fixed several missing translation tags and side-effects of having translations added into the sheet. In particular, Abilities should now have access to the Accelerated Ability option. 
    - Updated the sheet space and button for Soak/Armor Protection to use the combat roller templates. 
    - Relinked images from imgur to github asset folders. 
+ **October 2019, v1.4**
    - Initiatives now output to Roll20's Tracker while selecting a token. 
    - Character sheet tabs no longer attached to an attribute, so multiple players can view the same character sheet without wrestling over tab controls.