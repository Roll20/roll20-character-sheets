# DH 40k Dark Heresy 2e custom sheets - 2021

The basis of these sheets were taken from the [Dark Heresy: 2nd Edition (Advanced API)](https://github.com/Roll20/roll20-character-sheets/tree/master/Dark%20Heresy%20Advanced%202nd%20Edition) sheets, although most of the code was completely rewritten it made a lot of stuff a lot quicker. This sheet is **NOT COMPATIBLE** with the [Dark Heresy: 2nd Edition (Advanced API)](https://github.com/Roll20/roll20-character-sheets/tree/master/Dark%20Heresy%20Advanced%202nd%20Edition) one, if you are in a currently running campaign and decide to switch to this sheet you will need to configure your sheets again.

All parts of this sheet was rewritten from the ground up, it features auto calculations for a lot of things and complete custom hit/damage boxes with detail breakdowns and ammo count. These sheets require an API script thats located in **scripts/main.js** in this repo, its required (so you need a PRO account), no other api script is needed.

## Features list
Sheetworker scripts are used wherever possible since the API can be laggy, the sandbox API is only used for handling of message events (hit, damage, skill checks etc.).

### Hit & Damage info
Weapons take into account mods and qualities from the dropdown selects that are available on them, whenever possible those are then added to the hit/damage checks.  

[![img](https://i.imgur.com/hUIuh1R.png)](https://i.imgur.com/hUIuh1R.png)  

If we take the shotgun above as an example it has the **Scatter** special and **Modified stock**, since the range was standard it doesn't add another +10 modifier from **Scatter** but it does add +2 from the **Modified stock** because of the half aim.
The hit roll also includes expended ammo, degrees of success/failure and hit location.
The damage roll again includes all relevant modifiers from the sheet, in this case it adds -3 damage for the **Scatter** (since the weapon was not fired in close or point blank range) but it also includes the Mighty Shot talent this char has taken, this is auto calculated from the advancment tab.  

[![img](https://i.imgur.com/AjWLBNO.png)](https://i.imgur.com/AjWLBNO.png)

Another example of an melee weapon
[![img](https://i.imgur.com/EmJS2bB.png)](https://i.imgur.com/EmJS2bB.png)  
[![img](https://i.imgur.com/Tr0TMPi.png)](https://i.imgur.com/Tr0TMPi.png)  

A thing to note here is the Damage value of Dice 1 in parantheses which indicates that it is ignored since this weapon has Tearing and that value is taken instead.

Psykana hit/damage as well as skill checks follow the same structure and add all relevant modifiers to their rolls, most modifiers are present and can be selected and they follow the rules as written in the book.

Some damage calculation rely on the user having performed a hit calculation with the weapon beforehand, for example the **Accurate** special modifier. In cases like this the script saves all the relevant information it needs from the weapons previous hit calc to use it latter when the user does a damage calc. In case this is missing the relevant modifiers will be missing. In some rare circumstances the API sandbox can restart in which case this saved data is lost, but this should almost never happen in a active session, if it does happen no real important data is lost.

### EXP auto calculation

Experience gets automatically calculated from accross the sheet, this includes Characteristics advancments, Skill advancments and of course Talent Advancements, in case anything is missing Custom advancements inputs are also available. All exp values get calculated from your set Aptitudes, if those change all the exp values get recalculated. 
NOTE: The **Free skill exp** field in the Advancements tab is used to offset all the free talents or skills a char might get at creation.  
[![img](https://i.imgur.com/1iSaazK.png)](https://i.imgur.com/1iSaazK.png)

### Use fate button

To make it easier for the user to reroll previous rolls (and only previous rolls), be it a hit or damage or even a skill check, a **Use fate** button was added which does just that. In the case of a weapon expending ammo it also returns the previously expended amount. Of course all other usages for fate points, like healing or adding a +10 modifier to the next roll, still needs to be done by hand.

### Other

As mentioned the sheet took the 40kdh2e advanced sheets as its basis but was completely rewritten, the HTML & CSS use flexboxes exclusively for the layout. All of the javascript code was written with optimization in mind. List of all sandbox API commands:
- **!dh2e2021roll**, displays the rolltemplate-dh2e2021roll template, used for characteristics/skill checks
- **!dh2e2021weaponhit**, displays the rolltemplate-dh2e2021roll template, used for weapon hit checks
- **!dh2e2021damage**, displays the rolltemplate-dh2e2021damage tempalte, used for all damage rolls
- **!dh2e2021fate**, displays a message indicating a char using a fate point as well as rerolling one of the previous commands used  
- **!dh2e2021focuspower**, displays the rolltemplate-dh2e2021roll template, used for focus power tests
- **!dh2e2021psyhit**, displays the rolltemplate-dh2e2021roll template, used for psykana hit checks
- **!dh2e2021toggle**, using either "!dh2e2021toggle 1" or "!dh2e2021toggle 0" you can enable or disable some more advanced calcuation used in the sandbox API incase they might cause any lag. These include stuff like checking Advancements to add to damage calculations, Mighty Shot etc... By default its enabled
