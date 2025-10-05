# Grimwild Roll20 Character Sheet

A custom character sheet for the **Grimwild** tabletop RPG, designed for use with Roll20. <br>
<img src="https://i.imgur.com/PkLZkH1.jpeg" align="center" width="400" style="margin-left: 20px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px;">
<img src="https://imgur.com/to4sLbv.jpg" align="top-center" width="250" style="margin-left: 20px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px;">
<div style="center: 430px;"></div>

## Features
<img src="https://imgur.com/pi6xORZ.jpg" align="right" width="300" style="margin-left: 20px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px;">
<div style="margin-right: 430px;">
  
- **Attribute Rolling**: Click attribute names (Brawn, Agility, Wits, Presence) to roll dice for action/defense rolls
- **Thorn System**: Auto handling of difficulty and mark/harm thorns
- **Pool Rolling**: Build and roll custom dice pools while the sheet automatically determines drops
- **Other Rolls**: Dice can be added manually for Story, Montage, or Assist rolls  
- **Mark Tracking**: Clickable fields with each attribute for mark tracking, which auto remove when used 
- **Condition Management**: Bloodied and Rattled condition tracking
- **Custom Roll Templates**: Styled roll outputs
- **Grimwild Roll20 API**: Accompanying optional API allows for autocalculations and enhanced results 

</div>

## Installation

### For Roll20 Game Creators:

1. In your Roll20 game, go to **Settings > Game Settings**
2. Scroll down to **Character Sheet Template**
3. Select **"Custom"**
4. Copy and paste the contents of `grimwild_r20_v1.3.html` into the **HTML Layout** tab and save.
5. Copy and paste the contents of `grimwild_r20_v1.3.css` into the **CSS Styling** tab and save.
6. If using the Grimwild Roll20 API, install `grimwild-r20_v1.3api.js` as an API script by heading to the **Settings > Game Settings** > **Mod (API Scripts)**, creating a new API with any name you'd like, then paste in the API script, Save, and Enable.

### Optional Rollable Table Integration (when not using API):

Note that if you are unable to use the API (not a pro subscriber) you will have two options for how dice display: 
- Simple dice # outputs.
- Enable the Rollable Table option to output the dice results (Grim, Messy, Perfect, etc.) instead.

To use Rollable Tables, create the following two tables in Roll20 (it takes <1 minute to do so). 
- Name: GWRoll | Table Items: Grim (Weight 3); Messy (Weight 2); Perfect (Weight 1)
- Name: Thorn | Table Items: __ (Weight 6); Cut (Weight 2) 

### API Commands (Pro Subscription Required):

- `!grimwild [dice] [thorns] [attribute]` - Roll attribute dice with thorns, can roll without attribute as well for story/montage/assist rolls. 
- `!grimpool [size]` - Roll a dice pool and calculate drops

## Current Files
Head to the latest release for the most recent files. 
- `grimwild_r20_v1.3.html` - Character sheet HTML layout and JavaScript
- `grimwild_r20_v1.3.css` - Styling and roll template formatting
- `grimwild-r20_v1.3api.js` - API script for enhanced rolling features

## Game System

This sheet is designed for **Grimwild** (v1.4), a tabletop RPG by Oddity Press. Find the free edition here: https://www.drivethrurpg.com/en/product/507201/grimwild-free-edition, or the full edition with extra chapters here: https://www.drivethrurpg.com/en/product/508618/grimwild-cinematic-fantasy-roleplaying. 

## Contributing

Would love to collaborate, feel free to submit issues or pull requests if you find bugs or want to suggest improvements! You can reach me (as Dedalus) on the Oddity Press discord: https://discord.com/invite/bNr5wXFmSk. There is a thread for this project in Crafted Projects.

## Update Ideas 

Other aspirational features I might add in the future (or would appreciate others assisting with):
- ~~Saving the height of resiazable text entry fields in talent section (Roll20 has been fighting me on this if anyone has a solution)~~
- ~~Second tab of the sheet for tracking addition elements (arcana, treasure, etc.)~~
- ~~Proper integration for those without API support~~
- ~~More GM support in terms of managing multiple pools over time~~
- More GM support in terms of managing suspense (could just be a macro tied to a resource item?)  
- API update to give players more guidance on Critical options
- Hardcoded specific path abiltiies (e.g., Weapon Mastery's extra die effects)
- Add in all talent/path options to select (that are freely available) 
- And of course fine-tuning layout/features as feedback comes in

## Credits

This character sheet has been designed and created for the Grimwild RPG system based on the work of J.D. Maxwell and his collaborators at Oddity Press. The design of the sheet and the API were inspired by the original character sheet and book layout. 

## License

This project is licensed under the MIT License, see the license file for details. I have no affilitation with Oddity Press.
