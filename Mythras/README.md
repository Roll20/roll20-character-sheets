This is the development branch of the Mythras Roll20 sheet.  It represents what is to come in the next major release, v3.0.  It is not complete and we may still find bugs which need resolution.  
At the moment only the 'major character', 'creature', and 'spirit' character sheets are in a usable state.  Battle Units, Ships, Vehicles, etc will be added as additional milestones are met.  You may begin testing this sheet if you have a Pro subscription by following the steps below:
* Create a new game in Roll20
* For character sheet select `custom`
* Fill in other details as desired and click `Creat Game`
* In the game details page click `Settings -> Game Settings`
* Ensure `Legacy Sanitization` is NOT checked
* Copy and paste the contents of [Mythras.min.html](https://raw.githubusercontent.com/DigitalPagan/Mythras-Roll20-Sheet/v4/Mythras/Mythras.min.html) into `HTML Layout`
* Copy and paste the contents of [Mythras.min.css](https://raw.githubusercontent.com/DigitalPagan/Mythras-Roll20-Sheet/v4/Mythras/Mythras.min.css) into `CSS Styling`
* Copy and paste the contents of [translation.json](https://raw.githubusercontent.com/DigitalPagan/Mythras-Roll20-Sheet/v4/Mythras/translation.json) into `Translation`
* Click `Save Changes`
* Launch the game and enjoy the sheet

We are currently working on the conversion code for the three current sheet types.  This will automatically re-format the data on an existing sheet into the new forms in the v3.0 sheet.  As of 2023-Feb-27 all conversion functions are ready for testing except roughly half of the magic systems.  The core 5 systems from the CRB, M-Space and Odd Soot are ready however.  If you would like to test convering your existing sheets into v3.0 sheets follow these directions: 
* Create a new game with the development code as described above.
* Open your new game using the new development code.
* Click the setting gear icon in the upper-right, click `Miscellaneous` then `Transmogrifier`
* You will see a screen with two columns.  On the right the current game will be selected.  On the left you may select a game.  Choose the old game with your v2.7 sheets.
* Assets from the ame will be listed.  From here you may drag a character from the old game to the new one to copy it into the new game.
* Repeat for all characters you wish to import.
* When done close the Transmogrifier
* The first time you open a sheet in the new game it will run the conversion code and upgrade the sheet data.

Note: One of the big design goals of the v3 sheet was to improve performance.  The large number of input fields and toggable parts likely lead to some of the performance problems in v2.7 so we have consolidated a lot of things together.  Some skills have merged into Professional Skills, and magic system & traits have been combined into Abilities.  Unfortunately, that means for conversion we copy and duplicte a lot of data, and Roll20 doesn't have a way to delete the old data out.  This may cause performance problem of its own.  If you are still experiencing performance issues try starting with fresh sheets and manually reproduce the characters in the new game.  If you're still experiencing performance issues after that then please let me know.

Enjoy, and please let me know if you find anything wrong with the current functionality.
