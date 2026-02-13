# Draw Steel Character Sheet for Roll20

Welcome to the community-created Roll20 character sheet for [Draw Steel by MCDM](https://www.mcdmproductions.com/). This Draw Steel character sheet for Roll20 is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.

Want to help out or give feedback? Please join us on the [Draw Steel over Roll20 Discord](https://discord.com/channels/1264403896634445875/1264403896634445877).

**Happy adventuring. Draw Steel!**

## Getting Started

To use this sheet, select **Draw Steel** from the Character Sheet menu when setting up your game in Roll20.

## Hero Sheet

The Hero Sheet is broken up into collapsible panels to save space. Click the header of any section to expand or hide it. It has nine panels:

* **Basic Info:** Character basics (Name, Class, Level, Wealth, etc.). 
* **Characteristics:** Your core stats (MARIP) and for making power rolls.
* **Biography:** Your background details (Career, Upbringing, Complications).
* **Skills and Languages:** Your skills and languages.
* **Features:** Where you list Ancestry/Class features, Perks, Titles, and Kits/Modifiers.
* **Abilities:** Add your abilities here, with separate tabs for each ability type. 
* **Inventory:** Keep track of your trinkets, consumables, and leveled-gear.
* **Projects:** Dedicated space for tracking downtime projects.
* **Notes:** A free-form text area for session notes and reminders.

### Sheet Features

#### Shortcut Buttons (Top of the Sheet)

* **Initiative:** Rolls a d10 in chat.
* **Start Combat:** Sets your Heroic Resources equal to your current Victories.
* **End Combat:** Resets Heroic Resources, Surges, and temporary Stamina.
* **Respite:** Resets Stamina and Recoveries. Moves Victories to XP, and resets Victories to zero.

#### Characteristics Panel

The Characteristic panel stays visible at the top, even when you scroll, so you always see your important stats. When collapsed it will only show your hero's core characteristics, current and temporary Stamina, and current Recoveries, Heroic Resources, and Surges.

* **Power Rolls:** Clicking a Characteristic's label does a Power Roll. It asks if you have Edge, Bane, or a skill bonus.
* **Stamina - Winded & Dying:** The character sheet calculates your hero's Winded and Dying values when your Maximum Stamina is changed.
* **Recoveries:** Clicking Recoveries uses one up and adds the appropriate amount back to your current Stamina. 
* **Heroic Resources:** Clicking Heroic Resources rolls for your resource gain. 
* **Surge Damage:** Surge damage is calculated for you when your characteristics change. Click the Damage label to choose how many surges to use. It calculates the damage and removes the appropriate number of surges from your current total.
* **Potencies:** are calculated automatically from your greatest characteristic.
* **Conditions:** The conditions area has buttons to roll saves and bleeding damage .

#### Features Panel

You can send Ancestry Traits, Class Features, Perks, and Titles to the chat by clicking the Speech Bubble, or edit them with the Pencil icon.

#### Abilities

Abilities are grouped by type (Main Action, Maneuver, Trigger, No Action, Move). 

The player sheet tries to automatically calculate damage from ability rolls, but this feature can be turned off in the sheet options.

This feature is a work in progress and currently expects a format similar to the one found in the books. If the tier effect is not formatted properly, it will just send the plain text to chat instead of a calculated value. The format is as follows:

```<base damage> + <characteristic> <type> damage;<optional: other effects>```

Characteristic uses the single letter abbreviation to add the appropriate value ('M' for might, 'A' for Agility, and so on). Spaces are currently needed around the plus sign.

Will Calculate:
* 3 + M holy damage 
* 5 damage
* 3 + A damage; Push 2

Invalid:
* M + 3 holy damage
* 3+M holy damage
* Push 2; 3 + A damage

It automatically adds Kit Damage if the ability has the "Weapon" keyword and "Melee" or "Ranged".

## Monster Sheet Mode

GMs can toggle the Monster Sheet using the settings cog at the top. It’s a simpler layout for NPCs:

* Stat blocks for quick reference.
* Conditions tracking with buttons to roll saves and bleeding.
* Ability cards

You can edit Monster stats by clicking on the Pencil icon.

## Sheet Options

Click the Cog icon to open the options panel. Current options:


* Toggle between Hero and Monster sheets. 
* Choose if your Power Rolls go to chat, get whispered to the Director, or if you want to be prompted every time. 
* Import from Forge Steel. 


### Importing from Forge Steel
You can currently import characters or monsters from Forge Steel. 

How to import:
1. Export the character or monster from Forge Steel.
2. Open the file (.ds-hero or .ds-monster) in your favorite text editor.
3. Copy the contents of the file and paste it into the import box. 
4. Press the appropriate button. "Import Player" for heroes, "Import Monster" for monsters.

*Note:* This function is still a work in progress. Please double-check that everything was imported correctly. 

---
## Upcoming Changes
*To be added*
---
## Version History
 *To be added*