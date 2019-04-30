# Character sheet for Vampire The Maquerade, 5th Edition (v2.2)

## Known Bugs

When running with the API script, errors may occur if the player enters a name with tilde (\~), this is because the tilde is symbol I've used to identify names. There are no plans to fix this as this was introduce to enable full names.

## User Guide and Installation Instructions (Please read)

While this sheet is designed to be as intuitive as possible and to aid in stream lining your game there are several key features which are worth being aware of. As such we highly recommend you read the [VtM 5th Edition Sheet Guide](https://wiki.roll20.net/Vampire_The_Masquerade_5th_edition#Welcome_to_The_World_of_Darkness). The [VtM 5th Edition Sheet Guide](https://wiki.roll20.net/Vampire_The_Masquerade_5th_edition#Welcome_to_The_World_of_Darkness) also contains installation instructions and details about the API script.

## About Us and Thanks

Author: Momtahan K. | UserID: 117780  
Design: Martinez A. | UserID: 143652  
Design Contributor: Obi | UserID: 95940  
Kudos to: Andreas J. (UserID: 1223200), Matt Zaldivar, Brian Shields, Benjamin Bandelow, for their stirling work which provided a basis for this sheet, and espcially to Konrad J. (UserID: 77736), who's Hero Quest Dice Roller has been invaluable. Special thanks to Beta testers Chros G.(326614) and Jordan L.(46186). Many thanks to BigWhoop (UserID: 2124413) for his work on the first version of Obi's sheet. Massive thanks to Barry Snyder (UserID: 399162) for helping us with API-to-Non-API Toggling through explication and use of his code examples.

A very special thank to https://game-icons.net The below icons were used and are licensed under a Creative Commons Attribution 3.0 Unported License. Water fountain icon - by Delapouite under CC BY 3.0 Oppression icon - by Lorc under CC BY 3.0 Prayer icon - by Lorc under CC BY 3.0 Ent Mouth icon - by Lorc under CC BY 3.0 Spattericon - by Lorc under CC BY 3.0 Wolverine claws icon - by Lorc under CC BY 3.0 Half heart icon - by Lorc under CC BY 3.0 Embraced energy iconby Lorc under CC BY 3.0

If your name doesn't appear here I apologies, the Thank you section on the sheet should be kept up to date.

## Installation instructions.
If you have access to Roll20
1. Select the Vampire the Masquerade 5th Edition character sheet.
2. Go to Settings -> API Settings
3. If the "Vampire The Masquerade 5th Edition Dice Mechanics" API is available and uploaded to Roll20, select it in the dropdown menu. You are now good to go. If not, go to step 4.
4. Click New Script and call it hq.js (any name will do, but its a nice nod to Konrad's work)
5. Copy the contents VTM Dice Mechanics.js in the hq.js window and press save.
7. You are now good to go ^_^!


In the event you only have access to these files and need to do so manually.  

1. Create your new Roll20.
2. Go to Settings -> Game Settings
3. Copy the HTML file in the HTML Layout, the CSS file in the CSS Stlying and the translation.json into the Translation section. Press Save.
4. Go to Settings -> API Settings
5. Click New Script and call it hq.js (any name will do, but its a nice nod to Konrad's work)
6. Copy the contents VTM Dice Mechanics.js in the hq.js window and press save.
7. You are now good to go ^_^!

Notes: 
The Banners folder contains many of the images made (in part) by Martinez A. with use of the sterling work available at https://game-icons.net  (See Kudos)

## Bugs and Updates

If you think anything is missing or you see any bugs, please message me via my [Roll20 Account](https://app.roll20.net/users/117780/)

## Versions

### Version 2.1
Bug fix where the Willpower button for non-api sheet would not work as intended

### Version 2.1
Major bug fix. The last build was broken. Included bug fix.
Also made it so Powers can now be Attribute, Attribute. Added ----- as divider.
Added Warning about upgrading to Version 2 from Version 1

### Version 2.0
Updated so Powers is now displayed by click the arrow next to it, rather than it merely being written in. The Powers now have a "Details" next to each so you can trigger a description.
Attributes now go up to 7 to enable the pre-gen characters in the book to be made. Note "Exceptional Skills" in the book are complete dicepools.
Bug fix that adding new Coterie Members added Shared Background

### Version 1.2.1
Bug fixes

### Version 1.2
Fixed inline rolls so they now display hunger and vampire dice correctly if hunger dice pool is greater than the initial dice pool.
Fixed Predator Rolls
Fixed bug where the character name would not always appear.
Fixed bug where if a player had speech marks in the name and ran in API mode it would not work properly.

### Version 1.1
Bug fixing to ensure the names are correctly displayed. 
Added the capacity to roll humanity.
Attribute has been renamed to traits.
Some images have been linked to the Roll20 archieve
Updated user guide.