# D&D 5e Character Sheet

This is a character sheet for use on Roll20.net with the latest (5th) edition of Dungeons & Dragons. The sheet is designed to be usable by all Roll20 users regardless of subscription level.

### Changelog

**1st April 2015**

* AC is now for PCs and npc_ac is for NPCs. AC still calculates the highest between armored and unarmored AC. See https://app.roll20.net/forum/post/1759669/target-and-ac-on-5e-character-sheet#post-1784957

**31st March 2015**

* NPC sheet now hides all the PC tabs except spellbook and the new "NPC Attacks"
* Started work on "NPC Attacks"

**30th March 2015**

* Fixed text scrunching on the spellbook

**29th March 2015**

* Merged Actoba's work

**29th March 2015**

* Merged Actoba's work

**27th March 2015**

* Attacks can now use target to display the target's AC. It's under the settings.

**24th March 2015**

* Quick Attacks are added for melee and ranged weapons
* Merged Actoba's subheaderright2 issue: https://github.com/Actoba/roll20-character-sheets/commit/36d300e4432ac61f83625675fc765d9e01f7feb6

**23rd March 2015**

* Resized shield and heart to make them smaller. See https://app.roll20.net/forum/post/1734923/new-d-and-d-5e-shaped-character-sheet#post-1748932
* Resized all of core to make it even more compact.
* Core now have 5 columns - 2/5, 1/5, 1/5, and 1/5.


**22nd March 2015**

* Merged changes from Actoba. See https://app.roll20.net/forum/post/1744887/dnd-5e-sheet-uoh-user-feedback-mini-update.
* Added back class actions as per above.
* Fixed alignment on ranged attacks' ranges.
* AC takes the highest of either the normal AC_Calc or NPC_AC
* Added Medicine back.
* Added a setting to determine who the sheet rolls to - public or DM. Applies to both PCs and NPCs.


**21st March 2015**

* Ranged Weapons now have Ranges
* NPC sheet is being depreciated. All of the items are put into the main sheet besides the attacks as of 22nd March version. For instance some items in the top header info switch, the AC field is editable, and the different forms of movement are shown for NPCs. I plan to disable Background, Class, Weapons, Armor, and Inventory for the NPC sheet. I'll make a NPC version of the Weapons tab for "standard attacks" which is a mix of standardized attacks and open ended attacks.
* Inventory expanded to 3 pages of 15 for a total of 45 (old was 40)
* Gray background added
* Updated the header info area to contain important info. Works for PCs and NPCs
* Resistances and Immunities are now viewable by PCs

**Initial release - 19th March 2015**
First release of the redesigned sheet.

**Notable changes:**

* Core page has been revamped based on the design of the official paper sheet (http://1.bp.blogspot.com/-SIz9DByDeZw/U6M51aKP-OI/AAAAAAAAAzM/OZ72wWzJMTA/s1600/sheet1.jpg). The core sheet is meant to present the information in a more concise, readable way so that users can find information quickly. I'm not fully satisfied with everything (The initiative box is funky, skills are too tall, etc), but it leaves plenty of room to expand if anyone has suggestions for things to put in the holes.
* Header part of the sheet now includes information such as Character Name, Race, Class, Background, Level, Alignment, Vision, XP
* Heart contains HP info.
* Shield Contains AC info.
* Skills
  * Skills have moved to the core sheet. The skill page has been removed.
  * Skill proficiency automatically adds "Jack of All Trades" if you are unproficient and it is checked. There are 3 states now (Unproficient, Proficient, and Expertise) which are displayed with a more visible token (—, +, or ++). The full description can be seen when clicking the select box.
  * Skill modifiers can be seen on hover.
* Initiative's modifier is hidden - it can be seen on hover. (Not satisfied with the positioning of this.
* Armor Class (AC) now calculates based on the greater of Unarmored AC and Armored AC.
* Removed old class features as it will be removed in the main version soon anyways.
* Realigned classes on the class page
* Optional Settings tab has been added with the following options:
  * Death saves can be whispered to the DM
  * Initiative can have a tiebreaker. This adds a modifier based on your initiative bonus. For instance rolling a 14 on a d20 with a initiative bonus of 3 would be 17.03.

### Future Changes

* The NPC sheet is my top priority after I fix any remaining issues with the PC sheet.
* I plan to use something similar to "Weapons" for NPC attacks. I'll include open ended actions for more complex attacks, but most are fairly straight forward. I'm also looking to have a field that is always whispered to the GM for information like the DC of a save.
* Custom settings: I'm willing to add custom options/variants as long as they are technically feasible and can be hidden away without effecting users who do not want it.

### Requests and issues

As mentioned above please include the "Shaped" term when posting about this sheet. I will do my best to respond to posts. You can also open issues on ​github or contact me by PM, Twitter (@mlenser), gchat, or skype. If you have ideas/suggestions or want to work together I'm quite open.

### ​Differences between this version and the current version

​I plan to watch the current version and port the changes to my version.
​
### Reason for a new sheet

​I was looking to add some custom options to the sheet (Whispering Death Saves to the GM), but it did not work out with the current developer. As a result I decided to create my own sheet. As a result I examined how the sheet is currently a bit hard to get information at a glance so I decided to redesign it as listed above.​

### Other resources

* The scripts used to auto generate the sections flagged as auto generated by the comments in the html file can be found here - [DnD5e helper scripts](https://github.com/Actoba/DnD-5e-helper-scripts)

---

Mark Lenser ([@mlenser](https://app.roll20.net/users/277007/mark) on roll20)

