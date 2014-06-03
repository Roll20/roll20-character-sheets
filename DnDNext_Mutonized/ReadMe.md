Notes:
- Most action macros that can potentially involve an Advantage or Disadvantage (checks, saves, attacks, etc) have the option already in there via a Prompt when you use them.
	- First prompt will be "# of dice", defaulting to 1. Just put 2 or any other number of dice if needed, otherwise just press ENTER
	- Second prompt will be "Adv(dl1) or Disad(dh1)". These are the commands to put in the input field for Advantages and Disadvantages. Only relevant if you put more than 1 Dice in the first prompt
	- Third prompt will be "MiscMod". You can put flat bonus (4) or die (d4) or combinations (2d4+d6+5).
- Removed all "number" fields and replaced by "text" fields for ease of use.
- Used smaller font size for "Text Area"
- Focused on separating IC and OOC actions in macros so make sure you select your PC Sheet in the "AS" list (below chat box)
	- Made sure that most OOC text is properly using the /ooc command.
	- Only a couple macros use actual emote (via /em).

TAB: MAIN
- Initiative button will now Add you to the tracker automatically (if open by GM) but only whispers the GM, to save up on chat spam for other players.
- Nothing special otherwise though removed all automatic Prof and Stat Mod calculations to keep the tool-tips clear in the in-line macros.

TAB: ACTIONS
- First set of Actions will have a prompt "Action Emote" then the normal Advantage/Disadvantage prompts.
	- Leave as default, or type in your own emote to give some flavor.
	- The ATK result and DMG results are all in one and included in the emote, to save up chat space.
- Second set of Actions allow for in-line macro within the "Failed Save" and "Success Save" fields.
	- You can put things like "Drains [[d8+1]]" and even combinations of other attributes in there if you want.
- Third set is for things you might use at some point, like Healing Potions and whatnot. 
	- Removed any notion of Quantity from this (moved to Inventory). This is meant to be used for effect, not tracking.
	
	
TAB: INVENTORY
- Removed TOTAL AC field from here, was useless. 
	- Just list your armor/shield and depending on what you're wearing, update your AC on the MAIN TAB.
- Weight is NOT automatically calculated, not possible yet with repeating fields I believe.

TAB: SPELLBOOK
- Each SPELL entry now allows for
	- Emote field: This will be what your PC will emote when you press the "USE" button.
	- Description field: This will be an /ooc description of the spell effects
- Each SPELL entry now also has a USE button, for ease of use.
	- This is meant mainly for simple effects (invisibility, fly, etc) but can easily be used for more complicated stuff since the Description and Emote fields allow for full range of in-line rolling and whatnot.
	- For more direct spells (Fireball, Ray of Cold, Magic Missile) just make an entry in the ACTION TAB if you want.
	
TAB: VARIOUS
- This includes all non essential/relevant information. Basically this is what you put here, or in the Bio & Info page.